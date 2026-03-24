import { useParams, Link } from 'react-router-dom';
import { posts } from '@/data/posts';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function TagDetail() {
  const { tag } = useParams<{ tag: string }>();
  const decodedTag = decodeURIComponent(tag ?? '');
  const filtered = posts
    .filter((p) => p.tags.includes(decodedTag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 z-10">
      {/* Back */}
      <Link
        to="/tags"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className="group-hover:-translate-x-0.5 transition-transform">
          <path d="m15 18-6-6 6-6" />
        </svg>
        所有标签
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold" style={{ color: 'hsl(340, 30%, 18%)' }}>
            # {decodedTag}
          </h1>
          <span className="sakura-tag inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
            {filtered.length} 篇
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          标签「<span className="text-primary font-medium">{decodedTag}</span>」下的所有文章
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🌸</div>
          <p className="text-muted-foreground">该标签下暂无文章</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="post-card group bg-card rounded-2xl border border-border/50 p-6 shadow-xs hover:shadow-md hover:border-primary/30 transition-all"
            >
              <Link to={`/post/${post.slug}`} className="block">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span style={{ color: 'hsl(345, 60%, 75%)' }}>✿</span>
                  <span>{post.readTime} 分钟阅读</span>
                </div>
                <h2 className="text-lg font-bold mb-2 leading-snug group-hover:text-primary transition-colors"
                  style={{ color: 'hsl(340, 25%, 18%)' }}>
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
