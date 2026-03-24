export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  readTime: number;
  coverImage?: string;
}

export interface Tag {
  name: string;
  count: number;
}
