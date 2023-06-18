import { h } from "hastscript";
import { toc } from "mdast-util-toc";
import { visit } from "unist-util-visit";

// Prepend a markdown directive containing table of contents of the article
export function remarkPrependTocDirective() {
  return (tree: any) => {
    const tableOfContentsNode = [
      {
        type: "containerDirective",
        name: "toc",
        attributes: {},
        children: [
          {
            type: "heading",
            depth: 2,
            children: [
              {
                type: "text",
                value: "Table of Contents",
              },
            ],
          },
          toc(tree, { ordered: true }).map,
        ],
      },
    ];

    tree.children = tableOfContentsNode.concat(tree.children);
  };
}

// Convert the toc markdown directive to appropriate html element
export function remarkTocDirective() {
  return (tree: any) => {
    visit(tree, { type: "containerDirective", name: "toc" }, (node) => {
      const data = node.data || (node.data = {});
      const hast = h("div#toc-container");

      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    });
  };
}
