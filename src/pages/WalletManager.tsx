import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { ethers } from 'ethers';
import { Buffer } from "buffer";
import process from 'process';
import { Plus, Trash } from 'lucide-react';

window.Buffer = Buffer;
window.process = process;
window.Crypto = Crypto;

interface Wallet {
  publicKey: string;
  privateKey: string;
  mnemonic: string;
  path: string;
}

function WalletManager() {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
  const [mnemonicWordsInput, setMnemonicWordsInput] = useState<string>('')
  const [wallets, setWallets] = useState<Wallet[]>([]);
  // const [privateKeys, setPrivateKeys] = useState<string>();
  // const [publicKey, setPublicKey] = useState<string>('');
  const [blockchain, setBlockchain] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false)

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const blockchainParam = searchParams.get('blockchain')
    console.log('blockchainParam:', blockchainParam)
    if (blockchainParam) {
      setBlockchain(blockchainParam);
    }
  }, [searchParams])

  const handleGenerateMnemonic = () => {
    const mnemonicInput = mnemonicWordsInput.trim();
    if (mnemonicInput && !validateMnemonic(mnemonicInput)) {
      alert('Invalid mnemonic. Try again.')
      return;
    }

    console.log('blockchain:', blockchain)
    if (!blockchain || !['solana', 'ethereum'].includes(blockchain)) {
      alert('Invalid or missing blockchain. Please select Solana or Ethereum.');
      return;
    }
    const mnemonic = mnemonicInput || generateMnemonic();
    const words = mnemonic.split(' ');
    setMnemonicWords(words);
    console.log("Generated Mnemonic:", words)
    const seedBuffer = mnemonicToSeedSync(mnemonic);

    if (blockchain === 'solana') {
      const path = "m/44'/501'/0'/0'";
      const { key: derivedSeed } = derivePath(path, seedBuffer.toString('hex'));
      const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
      const keypair = Keypair.fromSecretKey(secretKey);
      console.log('path:', path)
      console.log('derivedSeed:', derivedSeed)
      console.log('secretKey:', secretKey)
      // setPrivateKeys(Buffer.from(keypair.secretKey).toString('hex'))
      // setPublicKey(keypair.publicKey.toBase58());

      const newWallet: Wallet = {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: (Buffer.from(keypair.secretKey).toString('hex')),
        mnemonic,
        path
      }
      setWallets([...wallets, newWallet]);

    } else if (blockchain === 'ethereum') {
      const path = "m/44'/60'/0'/0'";
      const derivedSeed = derivePath(path, seedBuffer.toString('hex')).key;
      const privateKey = Buffer.from(derivedSeed).toString('hex')
      const wallet = new ethers.Wallet(privateKey)

      // setPrivateKeys(privateKey);
      // setPublicKey(wallet.address);

      const newWallet: Wallet = {
        publicKey: wallet.address,
        privateKey,
        mnemonic,
        path,
      };
      setWallets([...wallets, newWallet]);
    }
  }
  const copyMnemonic = () => {
    navigator.clipboard.writeText(mnemonicWords.join(' '));
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }
  console.log('mnemonicWords:', mnemonicWords)
  return (
    <>
      <section className="px-3 py-4 md:max-w-[90%] mx-auto">
        <div className="flex flex-col gap-3 md:gap-10">
          {!mnemonicWords.length &&
            <>
              <div className="flex flex-col gap-3 text-black text-center">
                <h1 className="text-4xl md:text-5xl text-center font-bold md:font-semibold">
                  Secret Recovery Phrase
                </h1>
                <p className="text-black font-semibold text-lg md:text-xl">Save these words in a safe place.</p>
              </div>
              <div className="flex items-center justify-center flex-col md:flex-row gap-3">
                <input className='shadow-2xl shadow-neutral-800 bg-white border border-black rounded-full py-3 px-[18px] 
            w-full text-black' type='password' placeholder='Enter your secret phrase (or leave blank to generate)'
                  onChange={(e) => setMnemonicWordsInput(e.target.value)}
                  value={mnemonicWordsInput} />

                <button onClick={handleGenerateMnemonic} className="shadow-2xl shadow-neutral-800 border text-base hover:bg-custom-gradient-none text-black 
            hover:bg-white font-bold hover:text-black rounded-full py-3 px-[18px] w-full md:w-64 uppercase text-center">
                  {mnemonicWordsInput ? 'Add Wallet' : 'Generate Wallet'}
                </button>
              </div>
            </>}

          {mnemonicWords.length > 0 && (
            <div className="mt-10 text-center flex items-center justify-center gap-2 flex-col">
              <h1 className="text-4xl md:text-5xl text-center font-bold md:font-semibold">
                Generated Mnemonic Phrase:
              </h1>
              <p className="text-black font-semibold text-lg md:text-xl">Save these words in a safe place.</p>
              <button onClick={copyMnemonic} className={`mx-auto shadow-2xl shadow-neutral-800 border text-base bg-custom-gradient text-white 
              rounded-full py-2 px-[18px] w-full font-bold flex items-center justify-center gap-3 text-center transition-transform 
              duration-300 hover:bg-custom-gradient-none hover:bg-white hover:text-black md:w-56
              ${isCopied ? 'bg-custom-gradient-none bg-white text-black scale-105' : 'hover:scale-105'} focus:outline-none`} disabled={isCopied}>
                {isCopied ? 'Copied!' : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy size-4">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                    </svg>
                    Click Here To Copy
                  </>
                )}
              </button>
              <div className="shadow-2xl shadow-neutral-800 p-5 rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full md:w-[70%] items-center mx-auto mt-3">
                {mnemonicWords.map((word, index) => (
                  <p key={index} className="text-base md:text-lg bg-white text-black font-bold rounded-lg py-2 px-3">{word}</p>
                ))}
              </div>
            </div>
          )}
          {wallets.length > 0 && (
            <div className="flex flex-col mt-5 gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-black text-4xl font-bold capitalize">{blockchain} Wallet</h2>
                <div className="flex items-center justify-center gap-3">
                  <button className='bg-gray-800 text-white rounded text-base px-4 py-2 hover:bg-gray-950
                  transition-all duration-200 ease-out flex items-center justify-center gap-2'><Plus /> Add Wallet</button>
                  <button className='bg-red-500 text-white rounded text-base px-4 py-2 hover:bg-red-700 
                  transition-all duration-200 ease-out flex items-center justify-center gap-2'><Trash className='w-5' /> Delete Wallet</button>
                </div>
              </div>
              {wallets.map((wallet, index) => (
                <div key={index} className="flex flex-col rounded-2xl border border-black mt-8">
                  <div className="flex justify-between px-8 py-6">
                    <h3 className="font-bold text-2xl md:text-3xl tracking-tighter">Wallet {index + 1}</h3>
                    <button className="text-red-500 px-4 py-2" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash size-4 text-destructive">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col gap-8 px-8 py-4 rounded-2xl bg-secondary/50">
                    <div className="flex flex-col w-full gap-2">
                      <span className="text-lg md:text-xl font-bold tracking-tighter">Public Key</span>
                      <p className="text-primary/80 font-medium cursor-pointer hover:text-primary transition-all duration-300 truncate 
                    overflow-hidden">{wallet.publicKey}</p>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <span className="text-lg md:text-xl font-bold tracking-tighter">Private Key</span>
                      <div className="flex justify-between w-full items-center gap-2">
                        <p className="text-primary/80 font-medium cursor-pointer hover:text-primary transition-all duration-300 truncate">
                          {wallet.privateKey}
                        </p>
                        <button className="px-4 py-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye size-4">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section >
    </>
  )
}
export default WalletManager;