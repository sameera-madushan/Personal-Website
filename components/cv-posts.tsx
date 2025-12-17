import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { PostMetadata } from "@/types/posts";

export default async function CvPosts() {
  const posts: PostMetadata[] = await getPosts(4);

  return (
    <section className="mt-10 sm:mt-14 px-4 sm:px-0">
      <h2 className="title mb-8 sm:mb-12 text-xl sm:text-2xl font-semibold">
        Writings
      </h2>

      <ul className="space-y-10">
        {posts.map((post, idx) => (
          <li key={idx}>
            <p className="mb-2 text-sm text-gray-500 dark:text-neutral-500">
              {(post.publishedAt)}
            </p>

            <h5 className="font-medium text-sm text-gray-800 dark:text-neutral-200 text-justify">
              {post.title}
            </h5>

            <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500 text-justify">
              {post.summary}
            </p>

            <p className="mt-1">
              <Link
                href={`/posts/en/${post.slug}`}
                className="text-sm text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
              >
                Continue reading
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
