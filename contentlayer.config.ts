import { defineDocumentType, makeSource } from "contentlayer/source-files";

import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { VisitableElement } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { remarkPrependTocDirective, remarkTocDirective } from "./lib/markdown";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    lastEdited: { type: "date", required: false },
    group: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    summary: { type: "string" }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath 
    },
    readingTime: {
      type: "string",
      resolve: (post) => readingTime(post.body.raw).text
    },
    structuredData: {
      type: "json",
      resolve: (post) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.date,
        dateModified: post.lastEdited ?? post.date,
        description: post.summary,
        url: `https://zakinadhif.my.id/posts/${post._raw.flattenedPath}`,
        author: {
          '@type': 'Person',
          name: 'Zaki Nadhif'
        }
      })
    }
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      remarkPrependTocDirective,
      remarkTocDirective
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          onVisitLine(node: VisitableElement) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node: VisitableElement) {
            node.properties.className?.push('line--highlighted');
          },
          onVisitHighlightedWord(node: VisitableElement) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor']
          }
        }
      ]
    ]
  }
});
