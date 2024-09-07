import { useState } from 'react';
import { useParams } from 'react-router-dom';

function WalletManager() {
  const { blockchainParam: blockchain } = useParams();
  const [mnemonic, setMnemonic] = useState<string>('');
  const [seed, setSeed] = useState();
  const [privateKeys, setPrivateKeys] = useState();
  const [publicKey, setPublicKey] = useState();
  const [showMnemonic, setShowMnemonic] = useState();
  const [showPrivateKeys, setShowPrivateKeys] = useState();
  const [blockchain, setBlockchain] = useState<string>({blockchainParam});
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
            <button className="shadow-2xl shadow-neutral-800 border text-base hover:bg-custom-gradient-none text-black 
            hover:bg-white font-bold hover:text-black rounded-full py-3 px-[18px] w-full md:w-64 uppercase text-center">
              Generate Wallet
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
export default WalletManager;