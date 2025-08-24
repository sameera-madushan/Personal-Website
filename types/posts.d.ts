export interface Post {
  metadata: PostMetadata;
  content: string;
}
export interface PostMetadata {
  title?: string;
  summary?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
  slug: string;
  tags?: string[];
  lang?: string;
}

export type Props = {
  params: Promise<{ slug: string; lang: string }>
}