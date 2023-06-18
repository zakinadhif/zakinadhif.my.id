import Link from "next/link";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getPostTags, getPostsWithTag, groupPostsByYear } from "@/lib/posts";
import { format, parseISO } from "date-fns";

export const generateStaticParams = async () =>
  getPostTags().map((tag) => ({ tag: tag }));

export const generateMetadata = ({ params }: { params: { tag: string } }) => {
  return { title: `${params.tag} Posts | Zaki Nadhif`};
};

export default function Post({ params }: { params: { tag: string } }) {
  const posts = getPostsWithTag(params.tag);
  const postsGroupedByYear = groupPostsByYear(posts);

  return (
    <>
      <Navbar />
      <main>
        <h1 className="text-xl font-medium mb-4 text-bluemoon">
          Posts with tag: <span className="underline">{params.tag}</span>
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