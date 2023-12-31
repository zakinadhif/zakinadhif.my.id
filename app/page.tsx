import { Metadata } from "next";
import { compareDesc, format, parseISO } from "date-fns";
import Link from "next/link";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { getPostsSorted } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Zaki Nadhif's Notes",
};

export default function Home() {
  const allPostsSorted = getPostsSorted();
  
  return (
    <>
      <Navbar />
      <main>
        <section id='about'>
          <p className='my-3'>
            I&apos;m Zaki Nadhif, a junior software developer from Indonesia.
            A fresh graduate from SMK Telkom Malang.
          </p>
        </section>
        <section id='writing'>
          <h2 className='h2 flex items-center gap-4'>
            <i className='ri-newspaper-fill font-medium' />
            Writing
          </h2>
          <ul className='space-y-3 md:space-y-1 font-medium my-4'>
            {allPostsSorted.map(({ _id, date, title, url }) => (
              <li className='flex md:flex-row flex-col' key={_id}>
                <time className='text-smoke mr-8 shrink-0' dateTime={date}>
                  {format(parseISO(date), "LLL dd, yyyy")}
                </time>
                <span className='underline underline-offset-1'>
                  <Link href={url}>{title}</Link>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section id='projects'>
          <h2 className='h2 flex items-center gap-4'>
            <i className='ri-code-s-slash-line font-medium' />
            Projects
          </h2>
          <ul className='space-y-1 font-medium'>
            <li>
              <a
                className='underline underline-offset-1'
                href='https://github.com/zakinadhif/SpaceShooter/tree/engine'
              >
                Egienx
              </a>
              : A WIP toy C++ game engine
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
