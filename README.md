# CryptoKosh

**CryptoKosh** (referring to a "vault" in Hindi) is a React functional component designed to generate and manage cryptocurrency wallets. It supports both the generation of new wallets and the entry of existing recovery phrases. It displays generated private and public keys, provides functionality to copy them to the clipboard, and includes features for showing or hiding sensitive information.

### Features

- **Generate Wallet**: Create a new wallet and view generated private and public keys.
- **Import Wallet**: Optionally enter an existing recovery phrase to generate keys.
- **Toggle Visibility**: Show or hide private keys and recovery phrases to enhance security.
- **Copy to Clipboard**: Easily copy private keys, public keys, and the recovery phrase.

### Installation

Ensure you have Node.js and npm installed on your machine.

1. Clone the repository or add the component to your existing React project.
2. Install the required dependencies:

    ```bash
    npm install tweetnacl bip39 ed25519-hd-key @solana/web3.js sonner lucide-react
    ```

3. Import and use the `WalletGenerator` component in your project.

### State Management

- `mnemonicWords`: Stores the words of the recovery phrase, initialized from `localStorage` if previously saved.

    ```tsx
    const [mnemonicWords, setMnemonicWords] = useState<string[]>(() => {
      const savedMnemonic = localStorage.getItem('mnemonicWords');
      return savedMnemonic ? JSON.parse(savedMnemonic) : [];
    });
    ```

- `mnemonicWordsInput`: Manages the input for the mnemonic recovery phrase.

    ```tsx
    const [mnemonicWordsInput, setMnemonicWordsInput] = useState<string>(() => localStorage.getItem('mnemonicWordsInput') || '');
    ```

- `wallets`: Stores generated wallets, initialized from `localStorage` if previously saved.

    ```tsx
    const [wallets, setWallets] = useState<Wallet[]>(() => {
      const savedWallets = localStorage.getItem('wallets');
      return savedWallets ? JSON.parse(savedWallets) : [];
    });
    ```

- `blockchain`: Stores the selected blockchain for wallet generation.

    ```tsx
    const [blockchain, setBlockchain] = useState<string>(() => localStorage.getItem('blockchain') || '');
    ```

- `isCopied`: Tracks whether the key information has been copied to the clipboard.

    ```tsx
    const [isCopied, setIsCopied] = useState(false);
    ```

- `showPrivateKey`: Toggles the visibility of private keys for security purposes.

    ```tsx
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    ```

### How It Works

- **Generating a Wallet**: Generates a new mnemonic phrase and derives the corresponding seed. The seed is used to generate private and public keys, which are then displayed along with the mnemonic.
- **Importing a Wallet**: Enter an existing recovery phrase to derive the corresponding private and public keys.
- **Visibility Toggle**: Private keys and recovery phrases can be toggled between visible and censored (asterisks) for enhanced security.
- **Clipboard Copy**: Easily copy private keys, public keys, and the recovery phrase to the clipboard.

### Contributing

Feel free to submit issues or pull requests. Contributions are always welcome!

### License

This project is licensed under the MIT License.