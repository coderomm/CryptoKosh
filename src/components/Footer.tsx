import { Instagram, Linkedin, X } from "lucide-react";

function Footer() {
    return (
        <footer className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 p-3 md:p-5">
            <h3 className="text-center text-[#163300] spacing tracking-widest">
            Designed & Developed by <a className="underline font-bold" target="_blank" href="https://x.com/1omsharma" rel="noreferrer">Om Sharma</a>
            </h3>
            <div className="flex items-center justify-end gap-3">
                <a href="https://www.linkedin.com/in/1omsharma/"><Linkedin /></a>
                <a href="https://www.instagram.com/coder.om"><Instagram /></a>
                <a href="https://x.com/1omsharma"><X /></a>
            </div>
        </footer>
    )
}
export default Footer;