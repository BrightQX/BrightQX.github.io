const skills = ['TypeScript', 'React', 'Node.js', 'Python', 'Vite', 'Tailwind CSS'];

const timeline = [
  { year: '2026', event: '开始写这个博客，记录技术、生活与美好瞬间' },
  { year: '2024', event: '系统学习前端开发，爱上了 TypeScript 和组件化设计' },
  { year: '2022', event: '接触编程，写下人生第一行 Hello World' },
];

export default function About() {
  return (
    <main className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 z-10">
      {/* Profile Hero */}
      <section className="hero-gradient rounded-2xl p-8 mb-10 border border-border/40 shadow-sm relative overflow-hidden">
        {/* 装饰樱花 */}
        <div className="absolute right-6 top-6 opacity-10" aria-hidden="true">
          <svg width="100" height="100" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
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

        <div className="flex items-start gap-5 relative z-10">
          {/* 头像 */}
          <div
            className="w-18 h-18 rounded-full flex items-center justify-center text-3xl font-bold text-white shrink-0 shadow-sm"
            style={{
              background: 'linear-gradient(135deg, hsl(345, 65%, 68%), hsl(350, 70%, 75%))',
              width: '72px',
              height: '72px',
            }}
          >
            🌸
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'hsl(340, 30%, 18%)' }}>
              你好，我是博主
            </h1>
            <p className="text-muted-foreground text-sm mb-3">开发者 · 写作者 · 思考者</p>
            <div className="flex flex-wrap gap-1.5">
              {['前端开发', '效率工具控', '读书爱好者'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium sakura-tag"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'hsl(340, 30%, 18%)' }}>
          <span style={{ color: 'hsl(345, 65%, 68%)' }}>✦</span>
          关于我
        </h2>
        <div className="space-y-3 text-muted-foreground leading-7 text-sm">
          <p>
            欢迎来到我的博客！这里是我记录技术学习、生活感悟和读书思考的地方。
            我相信写作是最好的学习方式——把脑子里模糊的想法变成清晰的文字，这个过程本身就是一种理解的加深。
          </p>
          <p>
            平时喜欢钻研前端技术，对效率工具和个人知识管理也有浓厚的兴趣。
            偶尔读书，偶尔随笔，偶尔认真思考一些没什么用但很有意思的问题。
          </p>
          <p>
            这个博客没有固定的更新频率，但每一篇都是认真写的。如果你觉得某篇文章对你有帮助，
            或者有什么想法想交流，欢迎通过下方方式联系我。
          </p>
        </div>
      </section>

      {/* 技术栈 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'hsl(340, 30%, 18%)' }}>
          <span style={{ color: 'hsl(345, 65%, 68%)' }}>✦</span>
          技术栈
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="sakura-tag inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 联系方式 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'hsl(340, 30%, 18%)' }}>
          <span style={{ color: 'hsl(345, 65%, 68%)' }}>✦</span>
          联系方式
        </h2>
        <div className="space-y-3">
          {[
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              ),
              label: '邮箱',
              value: 'hello@sakura-blog.com',
              href: 'mailto:hello@sakura-blog.com',
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              ),
              label: 'GitHub',
              value: 'github.com/sakura-blog',
              href: 'https://github.com',
            },
          ].map(({ icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
                style={{
                  background: 'hsl(345, 70%, 95%)',
                  color: 'hsl(345, 55%, 58%)',
                  border: '1px solid hsl(345, 50%, 88%)',
                }}
              >
                {icon}
              </span>
              <span>
                <span className="text-xs text-muted-foreground/70 block">{label}</span>
                <span className="font-medium">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 时间轴 */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'hsl(340, 30%, 18%)' }}>
          <span style={{ color: 'hsl(345, 65%, 68%)' }}>✦</span>
          大事记
        </h2>
        <div className="relative pl-5 space-y-6"
          style={{ borderLeft: '2px dashed hsl(345, 50%, 82%)' }}>
          {timeline.map(({ year, event }) => (
            <div key={year} className="relative">
              {/* 时间点装饰 */}
              <div
                className="absolute -left-[1.45rem] top-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  background: 'hsl(345, 80%, 97%)',
                  border: '2px solid hsl(345, 65%, 72%)',
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(345, 65%, 68%)' }} />
              </div>
              <span className="text-xs font-bold block mb-1" style={{ color: 'hsl(345, 55%, 55%)' }}>
                {year}
              </span>
              <p className="text-sm text-muted-foreground">{event}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
