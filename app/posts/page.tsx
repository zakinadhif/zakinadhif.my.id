import Link from "next/link";
import { Metadata } from "next";

import {
  getPostTags,
  getPostGroups,
  getPostsSorted,
  groupPostsByYear,
} from "@/lib/posts";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { format, parseISO } from "date-fns";

export const metadata: Metadata = {
    title: "Zaki Nadhif's Posts"
}

export default function Posts() {
  const posts = getPostsSorted();
  const postsGroupedByYear = groupPostsByYear(posts);
  const postTags = getPostTags();
  const postGroups = getPostGroups();

  return (
    <>
      <Navbar />
      <main>
        <div className='p-4 bg-[#0e1018] border border-[#424964] rounded-md mt-3 mb-6'>
          <h2 className='font-medium'>Tags:</h2>
          <div className='flex flex-wrap text-bluemoon space-x-3 mb-2'>
            {postTags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>#{tag}</Link>
            ))}
          </div>
          <h2 className='font-medium'>Notebooks:</h2>
          <div className='flex flex-wrap text-bluemoon space-x-3'>
            {postGroups.map((group) => (
              <Link key={group} href={`/groups/${group}`}>@{group}</Link>
            ))}
          </div>
        </div>
        <ul>
          {postsGroupedByYear?.map(([year, posts]) => (
            <li key={year}>
              <h2 className='text-lg font-bold my-2'>{year}</h2>
              <ul>
                {posts.map((post) => (
                  <li
                    className='md:ml-4 flex flex-col md:flex-row mb-1'
                    key={post.slug}
                  >
                    <time
                      className='text-smoke mr-6 shrink-0'
                      dateTime={post.date}
                    >
                      {format(parseISO(post.date), "LLL dd, yyyy")}
                    </time>
                    <Link href={`/posts/${post.slug}`} className='hover:underline underline-offset-1'>
                        {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
