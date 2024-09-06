import { generateMnemonic, validateMnemonic } from "bip39";
import { useEffect, useState } from "react";

function Mnemonics() {
    const [loading, setLoading] = useState(false);
    const [mnemonicWords, setMnemonicWords] = useState<string[]>([
        ...Array(12).fill(""),
    ]);
    useEffect(() => {

    }, [])
    return (
        <>
            <section className="min-h-screen bg-mobile-bg md:bg-desktop-bg bg-cover bg-center">
                
            </section>
        </>
    )
}
export default Mnemonics;