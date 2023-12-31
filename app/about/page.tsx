import { Metadata } from "next";

import { Balancer } from "react-wrap-balancer";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Zaki Nadhif's About",
};

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <h1 className='text-xl font-bold text-bluemoon mb-2 mt-3'>About Me</h1>
        <p>
          Hello everyone! I&apos;m Zaki Nadhif. A passionate software developer
          that has a wide range of interest. <br />
          <br />
          Welcome to my (super personalized) learning notebook! Where I share
          the knowledge that I have acquired throughout my learning process
          with others. I&apos;m open to any positive or constructive criticisms and
          suggestions. Feel free to contact me at discord (@zakinadhif).{" "}
          <br />
          <br />
          Please do note that, I update this notebook in my free time. I&apos;ll
          always try to provide most accurate information regarding the
          subjects that I&apos;ll be writing on here. But, it&apos;ll probably take
          sometime. <br />
          <br />
          Bring some snacks and a cup of coffee. I hope you enjoy reading my
          articles! <br />
          <br />
        </p>
      </main>
      <Footer />
    </>
  );
}
