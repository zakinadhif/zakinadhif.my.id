import Link from "next/link";
import { format, parseISO } from "date-fns";

import "@/styles/blog.scss";

import { allPosts, Post } from "contentlayer/generated";
import { Mdx } from "@/components/mdx";
import Footer from "@/components/footer";
import { Balancer } from "react-wrap-balancer";

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const getTags = () => {
    return post.tags?.map((tag, i, arr) => (
      <span key={i}>
        {" "}
        <Link
          href={`/tags/${tag}`}
          className='underline underline-offset-1'
        >{`#${tag}`}</Link>
        {i != arr.length - 1 ? "," : ""}
      </span>
    ));
  };

  const renderPostGroup = () => {
    return (
      <>
        {post.group ? (
          <Link
            href={`/groups/${post.group}`}
            className='font-bold uppercase hover:underline'
          >
            {post.group}
          </Link>
        ) : (
          <span className='font-bold uppercase'>zaki_nadhif.txt</span>
        )}
      </>
    );
  };

  const renderPostMetadata = () => {
    return (
      <>
        {renderPostGroup()}
        {` ${format(parseISO(post.date), 'yyyy-MM-dd')} | ${post.readingTime}`}
        {post.tags ? (
          <>
            {" | "}
            <i className='ri-price-tag-3-fill'></i>
            {getTags()}
          </>
        ) : null}
      </>
    );
  };

  return (
    <>
      <Link
        href='../'
        className='flex items-center gap-2 hover:text-bluemoon self-start'
      >
        <i className='ri-arrow-left-line text-2xl hover:no-underline' /> Go Back
      </Link>
      <main className='mt-8'>
        <article>
          <header>
            <h1 className='text-2xl font-extrabold text-bluemoon tracking-tight'>
              <Balancer>{post.title}</Balancer>
            </h1>
            <span className='text-whitesmoke text-sm font-medium'>
              {renderPostMetadata()}
            </span>
          </header>
          <Mdx code={post.body.code} />
        </article>
      </main>
      <Footer />
    </>
  );
}

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const {
    title,
    date: publishedTime,
    summary: description,
    slug
  } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://zakinadhif.my.id/posts/${slug}`
    }
  };
};