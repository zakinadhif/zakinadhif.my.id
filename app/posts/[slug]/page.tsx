import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Balancer } from "react-wrap-balancer";
import { allPosts, Post } from "contentlayer/generated";

import "@/styles/blog.scss";
import { Mdx } from "@/components/mdx";
import Footer from "@/components/footer";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const { title, date: publishedTime, summary: description, slug } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://zakinadhif.my.id/posts/${slug}`,
    },
  };
};

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

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
              <PostMetadata post={post} />
            </span>
          </header>
          <Mdx code={post.body.code} />
        </article>
      </main>
      <Footer />
    </>
  );
}

const PostTags = ({ tags }: { tags: string[] }) => {
  return (
    <>
      {tags.map((tag, idx, arr) => (
        <span key={idx}>
          {" "}
          <Link href={`/tags/${tag}`} className='underline underline-offset-1'>
            {`#${tag}`}
          </Link>
          {idx != arr.length - 1 ? "," : ""}
        </span>
      ))}
    </>
  );
};

const PostGroup = ({ group }: { group?: string }) => {
  return (
    <>
      {group ? (
        <Link
          href={`/groups/${group}`}
          className='font-bold uppercase hover:underline'
        >
          {group}
        </Link>
      ) : (
        <span className='font-bold uppercase'>zaki_nadhif.txt</span>
      )}
    </>
  );
};

const PostMetadata = (props: { post: Post }) => {
  const { post } = props;

  const date = format(parseISO(post.date), "yyyy-MM-dd");
  const readingTime = post.readingTime;

  return (
    <>
      <PostGroup group={post.group} />
      {` ${date} | ${readingTime}`}
      {post.tags && (
        <>
          {" | "}
          <i className='ri-price-tag-3-fill'></i>
          <PostTags tags={post.tags} />
        </>
      )}
    </>
  );
}
