import { Metadata } from "next";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Special Thanks | Zaki Nadhif's Note",
};

export default function Credits() {
  return (
    <>
      <Navbar />
      <main>
        <h1 className='text-xl font-bold text-bluemoon mb-2 mt-3'>Special Thanks</h1>
        <p>
            I will write my thanks here to all who has contributed or helped me
            in some way towards providing a better learning experience and accuracy.
        </p>
      </main>
      <Footer />
    </>
  );
}
