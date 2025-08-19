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
}