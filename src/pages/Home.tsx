import { Link } from 'react-router-dom';
import { posts } from '@/data/posts';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <Link
      to={`/tags/${encodeURIComponent(tag)}`}
      className="sakura-tag inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    >
      # {tag}
    </Link>
  );
}

export default function Home() {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 z-10">
      {/* Hero Banner */}
      <section className="hero-gradient rounded-2xl p-8 sm:p-10 mb-12 relative overflow-hidden border border-border/40 shadow-sm">
        {/* 装饰性樱花背景 */}
        <div className="absolute right-4 top-4 opacity-10" aria-hidden="true">
          <svg width="120" height="120" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(20,20)">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse
                  key={i}
                  cx={Math.cos((angle * Math.PI) / 180) * 9}
                  cy={Math.sin((angle * Math.PI) / 180) * 9}
                  rx="6"
                  ry="9"
                  transform={`rotate(${angle + 90} ${Math.cos((angle * Math.PI) / 180) * 9} ${Math.sin((angle * Math.PI) / 180) * 9})`}
                  fill="hsl(345, 70%, 60%)"
                />
              ))}
              <circle cx="0" cy="0" r="3" fill="hsl(345, 65%, 75%)" />
            </g>
          </svg>
        </div>

        {/* 樱花散落小图标 */}
        <div className="absolute left-8 bottom-6 opacity-8" aria-hidden="true">
          <svg width="60" height="60" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(20,20)">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse
                  key={i}
                  cx={Math.cos((angle * Math.PI) / 180) * 9}
                  cy={Math.sin((angle * Math.PI) / 180) * 9}
                  rx="6"
                  ry="9"
                  transform={`rotate(${angle + 90} ${Math.cos((angle * Math.PI) / 180) * 9} ${Math.sin((angle * Math.PI) / 180) * 9})`}
                  fill="hsl(345, 65%, 72%)"
                  fillOpacity="0.5"
                />
              ))}
            </g>
          </svg>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-4 border"
            style={{
              color: 'hsl(345, 55%, 52%)',
              background: 'hsl(345, 80%, 95%)',
              borderColor: 'hsl(345, 60%, 85%)',
            }}>
            <span>🌸</span>
            <span>花开时节，岁月静好</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight"
            style={{ color: 'hsl(340, 35%, 20%)' }}>
            欢迎来到<br />
            <span style={{ color: 'hsl(345, 60%, 55%)' }}>樱花博客</span>
          </h1>
          <p className="text-base leading-relaxed max-w-lg" style={{ color: 'hsl(340, 15%, 45%)' }}>
            记录技术探索、生活感悟与读书思考。<br />
            如花开落，文字自有其来去。
          </p>
        </div>
      </section>

      {/* Post List */}
      <section>
        <div className="flex items-center gap-3 mb-7">
          <h2 className="text-xl font-bold text-foreground">最新文章</h2>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, hsl(345, 50%, 75%), transparent)' }} />
          <span className="text-sm text-muted-foreground">{sorted.length} 篇</span>
        </div>

        <div className="space-y-5">
          {sorted.map((post) => (
            <article
              key={post.id}
              className="post-card group bg-card rounded-2xl border border-border/50 p-6 shadow-xs hover:shadow-md hover:border-primary/30 transition-all"
            >
              <Link to={`/post/${post.slug}`} className="block">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                  <span className="inline-flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {post.readTime} 分钟阅读
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-primary transition-colors"
                  style={{ color: 'hsl(340, 25%, 18%)' }}>
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed mb-3.5 line-clamp-2 text-muted-foreground">
                  {post.excerpt}
                </p>
              </Link>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
