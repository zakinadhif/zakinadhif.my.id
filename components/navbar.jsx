import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <header className="relative mb-4">
            <div className="bg-[url('/assets/code.svg')] w-[78px] h-[55px] bg-contain bg-no-repeat bg-center float-left inline-block mr-6"/>
            <div className="font-bold text-2xl">zakinadhif.my.id</div>
            <nav className="font-light text-sm tracking-widest text-bluemoon hidden md:block">
                <ul className="flex divide-x divide-bluemoon divide-dotted tracking-tight">
                    <li className="px-4 pl-0"><Link href="/" className="hover:underline underline-offset-1">home</Link></li>
                    <li className="px-4"><Link href="/about" className="hover:underline underline-offset-1">about</Link></li>
                    <li className="px-4"><Link href="/archives" className="hover:underline underline-offset-1">writing</Link></li>
                    <li className="px-4 pr-0"><a href="https://github.com/zakinadhif" className="hover:underline underline-offset-1">projects</a></li>
                </ul>
            </nav>
        </header>
    )
}
