'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface CollapsibleMnemonicWordsProps {
    mnemonicWords: string[]
}

export default function CollapsibleMnemonicWords({ mnemonicWords }: CollapsibleMnemonicWordsProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const toggleCollapsible = () => setIsOpen(!isOpen)
    const copyMnemonic = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(mnemonicWords.join(' '));
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } else {
            toast.error("Clipboard API not supported");
        }
    }
    return (
        <div className="w-full mx-auto mt-8 bg-transparent rounded-lg shadow-2xl border border-[#27272a]">
            <button
                onClick={toggleCollapsible}
                className="w-full flex items-center justify-between p-6 text-white transition duration-300 ease-in-out"
            >
                <span className="text-xl font-bold">Mnemonic Words</span>
                {isOpen ? (
                    <ChevronUpIcon className="h-6 w-6" />
                ) : (
                    <ChevronDownIcon className="h-6 w-6" />
                )}
            </button>
            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 block' : 'max-h-0 opacity-0 hidden'
                    }`}
            >
                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                        {mnemonicWords.map((word, index) => (
                            <div key={index} className="relative">
                                <span className="absolute top-1 left-2 text-xs text-gray-500">{index + 1}</span>
                                <p className="mnemonic-pill text-center text-base md:text-lg bg-white/30 text-white font-bold rounded-lg py-2 px-3 backdrop-blur-lg backdrop-saturate-150 shadow-lg">
                                    {word}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button onClick={copyMnemonic} className={`mx-auto border text-base rounded-lg py-2 px-[18px] w-full font-bold flex items-center justify-center gap-3 text-center transition-transform 
              duration-300 hover:bg-custom-gradient-none bg-white text-[#18181b] hover:bg-white hover:text-black md:w-56
              ${isCopied ? 'opacity-50 cursor-not-allowed bg-custom-gradient-none bg-white text-black scale-105' : 'hover:scale-105'} focus:outline-none`} disabled={isCopied}>
                            {isCopied ? 'Copied!' : (
                                <>
                                    <Copy />
                                    Click Here To Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}