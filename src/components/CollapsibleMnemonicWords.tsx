'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, CopyIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

interface CollapsibleMnemonicWordsProps {
  mnemonicWords: string[]
}

export default function CollapsibleMnemonicWords({ mnemonicWords }: CollapsibleMnemonicWordsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const toggleCollapsible = () => setIsOpen(!isOpen)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonicWords.join(' '))
      .then(() => alert('Mnemonic words copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl overflow-hidden">
      <button
        onClick={toggleCollapsible}
        className="w-full flex items-center justify-between p-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-gray-800"
      >
        <span className="text-xl font-bold">Mnemonic Words</span>
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6" />
        ) : (
          <ChevronDownIcon className="h-6 w-6" />
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 bg-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {mnemonicWords.map((word, index) => (
              <div key={index} className="relative">
                <span className="absolute top-1 left-2 text-xs text-gray-500">{index + 1}</span>
                <p className="mnemonic-pill text-center text-base md:text-lg bg-white/30 text-white font-bold rounded-lg py-2 px-3 backdrop-blur-lg backdrop-saturate-150 shadow-lg">
                  {isVisible ? word : '••••'}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleVisibility}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isVisible ? (
                <>
                  <EyeOffIcon className="h-5 w-5 mr-2" />
                  Hide Words
                </>
              ) : (
                <>
                  <EyeIcon className="h-5 w-5 mr-2" />
                  Show Words
                </>
              )}
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <CopyIcon className="h-5 w-5 mr-2" />
              Copy Words
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}