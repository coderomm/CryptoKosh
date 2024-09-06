import CryptoKoshLogo from '/CryptoKoshLogo.svg';

function Header() {
    const handleRedirect = () => {
        window.location.href = "https://github.com/coderomm";
    };
    return (
        <>
            <header className="flex items-center justify-between bg-red py-4 px-3">
                <div className="flex items-center justify-start gap-1">
                    <img src={CryptoKoshLogo} className='w-10 h-w-10' />
                    <h1 className="font-bold text-2xl">CryptoKosh</h1>
                </div>
                <div className="flex items-center justify-end">
                    <button
                        className="text-xl bg-custom-gradient hover:bg-white hover:text-black rounded-full"
                        onClick={handleRedirect}
                    >
                        GitHub
                    </button>
                </div>
            </header>
        </>
    )
}
export default Header;