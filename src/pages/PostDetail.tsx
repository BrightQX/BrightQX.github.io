import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { posts } from '@/data/posts';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <Link
      to={`/tags/${encodeURIComponent(tag)}`}
      className="sakura-tag inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
    >
      # {tag}
    </Link>
  );
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center z-10 relative">
        <div className="text-6xl mb-4">🌸</div>
        <h1 className="text-2xl font-bold mb-4">文章不见了</h1>
        <p className="text-muted-foreground mb-6">就像飘落的樱花，这篇文章已不在此处。</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'hsl(345, 65%, 65%)' }}
        >
          返回首页
        </button>
      </main>
    );
  }

  // Find prev & next posts
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentIndex = sorted.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? sorted[currentIndex - 1] : null;

  return (
    <main className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 z-10">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className="group-hover:-translate-x-0.5 transition-transform">
          <path d="m15 18-6-6 6-6" />
        </svg>
        返回文章列表
      </Link>

      {/* Post Header */}
      <article>
        <header className="mb-8">
          {/* 标签 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
            style={{ color: 'hsl(340, 30%, 18%)' }}>
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span style={{ color: 'hsl(345, 60%, 75%)' }}>✿</span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              约 {post.readTime} 分钟阅读
            </span>
          </div>
        </header>

        {/* Divider with sakura */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, hsl(345, 50%, 78%), transparent)' }} />
          <svg width="16" height="16" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
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
                  fillOpacity="0.7"
                />
              ))}
              <circle cx="0" cy="0" r="3" fill="hsl(350, 70%, 85%)" />
            </g>
          </svg>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, hsl(345, 50%, 78%), transparent)' }} />
        </div>

        {/* Markdown Content */}
        <div className="prose max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const isBlock = className?.includes('language-');
                if (isBlock) {
                  return (
                    <pre className="bg-muted rounded-xl p-4 my-4 overflow-x-auto">
                      <code className={`text-sm font-mono text-foreground ${className ?? ''}`} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                }
                return (
                  <code
                    style={{ background: 'hsl(345, 70%, 95%)', color: 'hsl(345, 55%, 48%)' }}
                    className="px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              blockquote({ children }) {
                return (
                  <blockquote
                    className="pl-4 py-2 my-4 rounded-r-xl italic text-muted-foreground"
                    style={{
                      borderLeft: '3px solid hsl(345, 65%, 68%)',
                      background: 'hsl(345, 60%, 97%)',
                    }}
                  >
                    {children}
                  </blockquote>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Bottom divider */}
      <div className="flex items-center gap-3 mt-12 mb-8">
        <div className="h-px flex-1 border-t border-dashed border-border" />
        <span className="text-primary text-lg">🌸</span>
        <div className="h-px flex-1 border-t border-dashed border-border" />
      </div>

      {/* Prev/Next Navigation */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          {prevPost && (
            <Link
              to={`/post/${prevPost.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-xl border transition-all hover:shadow-sm"
              style={{ borderColor: 'hsl(345, 40%, 88%)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(345, 65%, 68%)';
                (e.currentTarget as HTMLElement).style.background = 'hsl(345, 80%, 98%)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(345, 40%, 88%)';
                (e.currentTarget as HTMLElement).style.background = '';
              }}
            >
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                上一篇
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          )}
        </div>
        <div>
          {nextPost && (
            <Link
              to={`/post/${nextPost.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-xl border transition-all hover:shadow-sm text-right"
              style={{ borderColor: 'hsl(345, 40%, 88%)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(345, 65%, 68%)';
                (e.currentTarget as HTMLElement).style.background = 'hsl(345, 80%, 98%)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(345, 40%, 88%)';
                (e.currentTarget as HTMLElement).style.background = '';
              }}
            >
              <span className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                下一篇
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
