import { toast } from "sonner";

function Topbar() {
    return (
        <div onClick={() => {
            toast.success("Wallet selected. Please generate a wallet to continue.")
        }} className="w-full h-auto flex items-center justify-center bg-white text-black">
            <h2 className="text-base text-center p-1 capitalize">Learning Web3 📡 from Harkirat</h2>
        </div>
    )
}
export default Topbar;