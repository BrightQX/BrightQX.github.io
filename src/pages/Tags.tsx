import { Link } from 'react-router-dom';
import { posts } from '@/data/posts';

export default function Tags() {
  // 聚合所有标签
  const tagMap = new Map<string, number>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    });
  });

  const tags = Array.from(tagMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  // 根据文章数量决定标签大小
  const maxCount = Math.max(...tags.map((t) => t.count));
  const getTagSize = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.8) return 'text-base px-4 py-1.5';
    if (ratio > 0.5) return 'text-sm px-3.5 py-1.5';
    return 'text-xs px-3 py-1';
  };

  return (
    <main className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 z-10">
      {/* 页头 */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🏷️</span>
          <h1 className="text-3xl font-bold" style={{ color: 'hsl(340, 30%, 18%)' }}>
            标签分类
          </h1>
        </div>
        <p className="text-muted-foreground text-sm mt-2">
          共 <span className="font-medium text-primary">{tags.length}</span> 个标签，
          收录 <span className="font-medium text-primary">{posts.length}</span> 篇文章
        </p>
      </div>

      {/* 标签云 */}
      <section className="mb-12">
        <div className="p-6 rounded-2xl border border-border/50 bg-card"
          style={{ background: 'linear-gradient(135deg, hsl(345 60% 99%), hsl(350 40% 97%))' }}>
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            标签云
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {tags.map(({ name, count }) => (
              <Link
                key={name}
                to={`/tags/${encodeURIComponent(name)}`}
                className={`sakura-tag inline-flex items-center rounded-full font-medium ${getTagSize(count)}`}
              >
                # {name}
                <span className="ml-1.5 opacity-60 text-xs">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 分隔线 */}
      <div className="flex items-center gap-3 mb-10">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, hsl(345, 50%, 78%), transparent)' }} />
        <span className="text-primary">🌸</span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, hsl(345, 50%, 78%), transparent)' }} />
      </div>

      {/* 按标签分组的文章列表 */}
      <div className="space-y-10">
        {tags.map(({ name }) => {
          const tagPosts = posts
            .filter((p) => p.tags.includes(name))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

          return (
            <section key={name}>
              <div className="flex items-center gap-3 mb-4">
                <Link
                  to={`/tags/${encodeURIComponent(name)}`}
                  className="sakura-tag inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold"
                >
                  <svg width="12" height="12" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(20,20)">
                      {[0, 72, 144, 216, 288].map((angle, i) => (
                        <ellipse
                          key={i}
                          cx={Math.cos((angle * Math.PI) / 180) * 9}
                          cy={Math.sin((angle * Math.PI) / 180) * 9}
                          rx="6"
                          ry="9"
                          transform={`rotate(${angle + 90} ${Math.cos((angle * Math.PI) / 180) * 9} ${Math.sin((angle * Math.PI) / 180) * 9})`}
                          fill="currentColor"
                          fillOpacity="0.7"
                        />
                      ))}
                    </g>
                  </svg>
                  {name}
                </Link>
                <span className="text-xs text-muted-foreground">{tagPosts.length} 篇</span>
                <div className="h-px flex-1 border-t border-dashed border-border" />
              </div>
              <ul className="space-y-2 pl-2">
                {tagPosts.map((post) => (
                  <li key={post.id} className="group">
                    <Link
                      to={`/post/${post.slug}`}
                      className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm text-foreground group-hover:text-primary transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors shrink-0" />
                        {post.title}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0 ml-4 font-mono">
                        {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
