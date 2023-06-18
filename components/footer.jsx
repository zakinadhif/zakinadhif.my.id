import Link from "next/link"

export default function Footer() {
    return (
        <footer className="flex flex-col gap-1 md:flex-row items-center justify-center md:justify-between font-thin text-xs content-center absolute bottom-0 w-full mb-12">
            <div>
                <p>Copyright © 2022-2023 zakinadhif</p>
            </div>
            <nav>
                <ul className="flex divide-x divide-smoke divide-dotted underline underline-offset-1">
                    <li className="px-3 pl-0"><Link href="/">home</Link></li>
                    <li className="px-3"><Link href="/about">about</Link></li>
                    <li className="px-3"><Link href="/posts">posts</Link></li>
                    <li className="px-3 pr-0"><a href="https://github.com/zakinadhif">projects</a></li>
                </ul>
            </nav>
        </footer>
    )
}
