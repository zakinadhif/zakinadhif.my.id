import { Metadata } from "next";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Balancer } from "react-wrap-balancer";

export const metadata: Metadata = {
  title: "Zaki Nadhif's About"
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <h1 className="text-xl font-bold text-bluemoon mb-2 mt-3">About Me</h1>
        <p>
          <Balancer>
            Hello everyone! I'm Zaki Nadhif. A passionate software developer that has a wide
            range of interest.<br />
            <br />
            Welcome to my learning notebook. Where I share the knowledge that I have 
            acquired throughout my learning process with others. I'm open to any
            positive or constructive criticisms and suggestions. Feel free to contact
            me at discord (@zakinadhif). <br />
            <br />
            Please do note that, I update this notebook in my free time. I'll always
            try to provide most accurate information regarding the subjects that I'll
            be writing on here. But, it'll probably take sometime. <br />
            <br />
            Bring some snacks and a cup of coffee. I hope you enjoy reading my articles! <br />
            <br />
          </Balancer>
        </p>
      </main>
      <Footer />
    </>
  );
}
