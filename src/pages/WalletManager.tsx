import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { ethers } from 'ethers';
import { Buffer } from "buffer";
import process from 'process';

window.Buffer = Buffer;
window.process = process;

function WalletManager() {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [privateKeys, setPrivateKeys] = useState<string>();
  const [publicKey, setPublicKey] = useState<string>('');
  const [blockchain, setBlockchain] = useState<string>('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const blockchainParam = searchParams.get('blockchain')
    console.log('blockchainParam:', blockchainParam)
    if (blockchainParam) {
      setBlockchain(blockchainParam);
    }
  }, [searchParams])

  const handleGenerateMnemonic = () => {
    console.log('blockchain:', blockchain)
    if (!blockchain) return;
    const mnemonicWords = generateMnemonic();
    setMnemonic(mnemonicWords);
    console.log("Generated Mnemonic:", mnemonicWords)
    const seed = mnemonicToSeedSync(mnemonicWords);

    if (blockchain === 'solana') {
      const path = "m/44'/501'/0'/0'";
      const derivedSeed = derivePath(path, seed.toString('hex')).key;
      const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secretKey);

      setPrivateKeys(Buffer.from(keypair.secretKey).toString('hex'))
      setPublicKey(keypair.publicKey.toBase58());
    } else if (blockchain === 'ethereum') {
      const path = "m/44'/60'/0'/0/0";
      const derivedSeed = derivePath(path, seed.toString('hex')).key;
      const privateKey = Buffer.from(derivedSeed).toString('hex')
      const wallet = new ethers.Wallet(privateKey)

      setPrivateKeys(privateKey);
      setPublicKey(wallet.address);
    }
  }
  return (
    <>
      <section className="px-3 py-4 md:max-w-[90%] mx-auto">
        <div className="flex flex-col gap-3 md:gap-10 mt-20">
          <div className="flex flex-col gap-3 text-black text-center">
            <h1 className="text-4xl md:text-5xl text-center font-bold md:font-semibold">
              Secret Recovery Phrase
            </h1>
            <p className="text-black font-semibold text-lg md:text-xl">Save these words in a safe place.</p>
          </div>
          <div className="flex items-center justify-center flex-col md:flex-row gap-3">
            <input className='shadow-2xl shadow-neutral-800 bg-white border border-black rounded-full py-3 px-[18px] 
            w-full text-black' type='password' placeholder='Enter your secret phrase (or leave blank to generate)' />
            <button onClick={handleGenerateMnemonic} className="shadow-2xl shadow-neutral-800 border text-base hover:bg-custom-gradient-none text-black 
            hover:bg-white font-bold hover:text-black rounded-full py-3 px-[18px] w-full md:w-64 uppercase text-center">
              Generate Wallet
            </button>
          </div>
          {/* Display mnemonic, public key, and private key */}
          {mnemonic && (
            <div className="mt-10 text-center">
              <h2 className="text-2xl font-semibold">Generated Mnemonic Phrase:</h2>
              <p className="text-lg mt-2 text-gray-800 bg-gray-100 p-3 rounded-md">{mnemonic}</p>
            </div>
          )}

          {publicKey && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-semibold">Public Key:</h2>
              <p className="text-lg mt-2 text-gray-800 bg-gray-100 p-3 rounded-md">{publicKey}</p>
            </div>
          )}

          {privateKeys && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-semibold">Private Key:</h2>
              <p className="text-lg mt-2 text-gray-800 bg-gray-100 p-3 rounded-md">{privateKeys}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
export default WalletManager;