import { allPosts, Post } from ".contentlayer/generated";
import { compareDesc } from "date-fns";

const comparePostByDate = (a: Post, b: Post) =>
  compareDesc(new Date(a.date), new Date(b.date));

export function getPostsSorted() {
  return allPosts.sort(comparePostByDate);
}

export function getPostTags() {
  const tags = new Set();

  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags) as string[];
}

export function getPostGroups() {
  const groups = new Set();

  allPosts.forEach((post) => {
    if (post.group) {
      groups.add(post.group);
    }
  });

  return Array.from(groups) as string[];
}

export function getPostsWithTag(tag: string) {
  return allPosts
    .filter((post) => post.tags?.includes(tag))
    .sort(comparePostByDate);
}

export function getPostsInGroup(group: string) {
  return allPosts
    .filter((post) => post.group === group)
    .sort(comparePostByDate);
}

export function groupPostsByYear(posts: Post[]) {
  const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    }, {} as Record<K, T[]>);

  const getYearOfPost = (post: Post) => post.date.slice(0, 4);

  const postsGroupedByYear = groupBy(posts, getYearOfPost);

  return Object.entries(postsGroupedByYear).sort(
    ([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA)
  );
}
