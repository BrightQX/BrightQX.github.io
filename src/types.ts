export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  content: string;
}

export interface SiteConfig {
  blogName: string;
  blogSlogan: string;
  heroTitle: string;
  heroSubtitle: string;
  authorName: string;
  authorRole: string;
  authorBio: string;
  authorEmail: string;
  authorGithub: string;
  skills: string[];
  labels: string[];
  timeline: { year: string; event: string }[];
}
