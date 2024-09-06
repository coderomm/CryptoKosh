function Landing() {
    return (
        <section className="min-h-screen bg-mobile-bg md:bg-desktop-bg bg-cover bg-center">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <h1 className="tracking-tighter text-4xl md:text-5xl font-black">Kosh supports multiple blockchains</h1>
                    <p className="text-primary/80 font-semibold text-lg md:text-xl">Choose a blockchain to get started.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-custom-gradient hover:bg-white hover:text-black rounded-full">
                        Solana
                    </button>
                </div>
            </div >
        </section>
    )
}
export default Landing;