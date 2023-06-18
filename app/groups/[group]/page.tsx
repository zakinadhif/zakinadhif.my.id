import Link from "next/link";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getPostGroups, getPostsInGroup, groupPostsByYear } from "@/lib/posts";
import { format, parseISO } from "date-fns";

export const generateStaticParams = async () =>
  getPostGroups().map((group) => ({ group: group }));

export const generateMetadata = ({ params }: { params: { group: string } }) => {
  return { title: `${params.group} | Zaki Nadhif`};
};

export default function Post({ params }: { params: { group: string } }) {
  const posts = getPostsInGroup(params.group);
  const postsGroupedByYear = groupPostsByYear(posts);

  return (
    <>
      <Navbar />
      <main>
        <h1 className="text-xl font-medium mb-4 text-bluemoon">
          Posts under group: <span className="underline">{params.group}</span>
        </h1>
        <ul>
          {postsGroupedByYear?.map(([year, posts]) => (
            <li key={year}>
              <h2 className="text-lg font-medium my-2">{year}</h2>
              <ul>
                {posts.map((post) => (
                  <li className="ml-4 flex" key={post.slug}>
                    <time className="text-smoke mr-6 shrink-0" dateTime={post.date}>
                      {format(parseISO(post.date), "LLL dd, yyyy")}
                    </time>
                    <Link href={`/posts/${post.slug}`} className="hover:underline underline-offset-1">
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