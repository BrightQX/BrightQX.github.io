import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ===== 类型 =====
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  content: string;
}

interface SiteConfig {
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

// ===== 默认数据 =====
const defaultPosts: Post[] = [
  {
    id: '1',
    title: '开始我的写作之旅',
    slug: 'start-my-writing-journey',
    excerpt: '一直以来，我都想把自己的所思所想记录下来。今天，终于迈出了这一步——建了这个博客，开始认真写作。',
    date: '2026-03-20',
    readTime: 3,
    tags: ['随笔', '生活'],
    content: `# 开始我的写作之旅\n\n一直以来，我都想把自己的所思所想记录下来。今天，终于迈出了这一步——建了这个博客，开始认真写作。\n\n## 为什么写作？\n\n写作对我来说，是一种**整理思绪**的方式。\n\n> 写作不是为了展示聪明，而是为了理清思路。\n\n## 我打算写什么？\n\n- **技术分享**：编程、工具、效率方法\n- **读书笔记**：好书不能只读一遍\n- **生活随笔**：记录值得记录的瞬间\n\n感谢你找到这里。欢迎交流 :)`,
  },
  {
    id: '2',
    title: '我用了半年的效率工具清单',
    slug: 'productivity-tools',
    excerpt: '分享几个真正改变了我工作方式的效率工具，不是广告，是真实使用体验。',
    date: '2026-03-15',
    readTime: 6,
    tags: ['效率', '工具'],
    content: `# 我用了半年的效率工具清单\n\n分享几个真正改变了我工作方式的效率工具。\n\n## 笔记类\n\n### Obsidian\n\n双向链接笔记，适合构建个人知识图谱。\n\n**优点：**\n- 完全本地，数据在自己手里\n- 插件生态强大\n- Markdown 原生支持\n\n## 写作类\n\n### Typora\n\n最干净的 Markdown 编辑器，没有之一。\n\n---\n\n工具只是工具，最重要的还是养成**使用习惯**。`,
  },
  {
    id: '3',
    title: 'TypeScript 实用技巧',
    slug: 'typescript-practical-tips',
    excerpt: '这些 TypeScript 技巧是我在真实项目中反复用到的，实战中摸爬滚打出来的经验。',
    date: '2026-03-08',
    readTime: 8,
    tags: ['技术', 'TypeScript'],
    content: `# TypeScript 实用技巧\n\n这些 TypeScript 技巧是我在真实项目中反复用到的。\n\n## 1. 善用 \`satisfies\` 操作符\n\n\`\`\`typescript\nconst config = {\n  port: 3000,\n  host: 'localhost',\n} satisfies Record<string, string | number>;\n\`\`\`\n\n## 2. 使用 \`as const\` 锁定字面量类型\n\n\`\`\`typescript\nconst ROLES = ['admin', 'user', 'guest'] as const;\ntype Role = typeof ROLES[number];\n\`\`\`\n\nTypeScript 的类型系统深不见底，但掌握这些高频模式，应对日常开发绰绰有余。`,
  },
  {
    id: '4',
    title: '《深度工作》读书笔记',
    slug: 'deep-work-reading-notes',
    excerpt: '卡尔·纽波特的《深度工作》彻底改变了我对时间管理的认知。',
    date: '2026-02-28',
    readTime: 5,
    tags: ['读书', '效率'],
    content: `# 《深度工作》读书笔记\n\n卡尔·纽波特的《深度工作》彻底改变了我对时间管理的认知。\n\n## 核心观点\n\n> 深度工作：在无干扰的状态下专注进行职业活动，使个人的认知能力得到极致发挥。\n\n## 我的实践\n\n| 时间段 | 安排 |\n|--------|------|\n| 9:00-10:30 | 深度工作块 1 |\n| 11:00-12:30 | 深度工作块 2 |\n\n这本书值得反复读。推荐。`,
  },
  {
    id: '5',
    title: '用 React + Vite 搭建现代前端项目',
    slug: 'react-vite-modern-setup',
    excerpt: '从零开始搭建一个生产级的 React 项目，包含代码规范等配置。',
    date: '2026-02-18',
    readTime: 10,
    tags: ['技术', 'React'],
    content: `# 用 React + Vite 搭建现代前端项目\n\n从零开始搭建一个生产级的 React 项目。\n\n## 初始化项目\n\n\`\`\`bash\nnpm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install\n\`\`\`\n\n## 配置路径别名\n\n在 \`vite.config.ts\` 中配置 \`@\` 路径别名即可。\n\n---\n\n这套配置是我目前最顺手的 React 项目起始模板。`,
  },
];

const defaultConfig: SiteConfig = {
  blogName: '🌸 樱花博客',
  blogSlogan: '如花开落，文字自有其来去',
  heroTitle: '欢迎来到樱花博客',
  heroSubtitle: '记录技术探索、生活感悟与读书思考。\n如花开落，文字自有其来去。',
  authorName: '你好，我是博主',
  authorRole: '开发者 · 写作者 · 思考者',
  authorBio: '欢迎来到我的博客！这里是我记录技术学习、生活感悟和读书思考的地方。我相信写作是最好的学习方式——把脑子里模糊的想法变成清晰的文字，这个过程本身就是一种理解的加深。',
  authorEmail: 'hello@sakura-blog.com',
  authorGithub: 'github.com/sakura-blog',
  skills: ['TypeScript', 'React', 'Node.js', 'Python', 'Vite', 'Tailwind CSS'],
  labels: ['前端开发', '效率工具控', '读书爱好者'],
  timeline: [
    { year: '2026', event: '开始写这个博客，记录技术、生活与美好瞬间' },
    { year: '2024', event: '系统学习前端开发，爱上了 TypeScript 和组件化设计' },
    { year: '2022', event: '接触编程，写下人生第一行 Hello World' },
  ],
};

// ===== localStorage 持久化 =====
function loadPosts(): Post[] {
  try {
    const raw = localStorage.getItem('sakura_posts');
    if (raw) return JSON.parse(raw);
  } catch {}
  return defaultPosts;
}

function savePosts(posts: Post[]) {
  localStorage.setItem('sakura_posts', JSON.stringify(posts));
}

function loadConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem('sakura_config');
    if (raw) return { ...defaultConfig, ...JSON.parse(raw) };
  } catch {}
  return defaultConfig;
}

function saveConfig(config: SiteConfig) {
  localStorage.setItem('sakura_config', JSON.stringify(config));
}

// ===== 密码鉴权 =====
const DEFAULT_PASSWORD = '986080';
function getAdminPassword(): string {
  return localStorage.getItem('sakura_admin_pwd') || DEFAULT_PASSWORD;
}
function setAdminPassword(pwd: string) {
  localStorage.setItem('sakura_admin_pwd', pwd);
}

// ===== GitHub 发布配置 =====
function getGithubToken(): string {
  return localStorage.getItem('sakura_gh_token') || '';
}
function setGithubToken(token: string) {
  localStorage.setItem('sakura_gh_token', token);
}
function getGithubRepo(): string {
  return localStorage.getItem('sakura_gh_repo') || 'BrightQX/BrightQX.github.io';
}
function setGithubRepo(repo: string) {
  localStorage.setItem('sakura_gh_repo', repo);
}

// 通过 GitHub API 更新单个文件
async function githubPutFile(
  token: string,
  repo: string,
  filePath: string,
  content: string,
  message: string
): Promise<void> {
  const apiBase = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  // 先获取当前文件的 SHA（更新文件时必须提供）
  let sha: string | undefined;
  try {
    const getRes = await fetch(apiBase, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });
    if (getRes.ok) {
      const json = await getRes.json();
      sha = json.sha;
    }
  } catch {
    // 文件不存在时 sha 为 undefined，直接创建
  }

  // base64 编码内容
  const encoded = btoa(unescape(encodeURIComponent(content)));

  const body: Record<string, unknown> = { message, content: encoded };
  if (sha) body.sha = sha;

  const putRes = await fetch(apiBase, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    throw new Error(err.message || `GitHub API 错误 ${putRes.status}`);
  }
}
function isAuthed(): boolean {
  return sessionStorage.getItem('sakura_authed') === '1';
}
function setAuthed() {
  sessionStorage.setItem('sakura_authed', '1');
}
function clearAuthed() {
  sessionStorage.removeItem('sakura_authed');
}

// ===== CSS 样式 =====
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Noto Serif SC', 'Georgia', -apple-system, serif; background: hsl(350, 30%, 98%); color: hsl(340, 20%, 15%); min-height: 100vh; }
  a { text-decoration: none; color: inherit; }

  .nav { position: sticky; top: 0; z-index: 50; background: rgba(255, 248, 249, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid hsl(345, 40%, 90%); }
  .nav-inner { max-width: 720px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 56px; }
  .nav-logo { font-size: 17px; font-weight: 700; color: hsl(345, 55%, 50%); display: flex; align-items: center; gap: 6px; }
  .nav-links { display: flex; align-items: center; gap: 4px; }
  .nav-link { padding: 6px 14px; border-radius: 999px; font-size: 14px; font-weight: 500; color: hsl(340, 15%, 50%); transition: all 0.2s; }
  .nav-link:hover { color: hsl(340, 20%, 15%); }
  .nav-link.active { background: hsl(345, 65%, 65%); color: white; }
  .nav-admin-btn { padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 500; color: hsl(340, 15%, 55%); border: 1px solid hsl(345, 30%, 85%); transition: all 0.2s; margin-left: 8px; cursor: pointer; background: white; }
  .nav-admin-btn:hover { border-color: hsl(345, 60%, 70%); color: hsl(345, 55%, 50%); }

  .main { max-width: 720px; margin: 0 auto; padding: 40px 24px; }
  .hero { background: linear-gradient(135deg, hsl(345, 60%, 97%) 0%, hsl(350, 40%, 95%) 50%, hsl(20, 40%, 96%) 100%); border: 1px solid hsl(345, 40%, 90%); border-radius: 20px; padding: 40px; margin-bottom: 48px; position: relative; overflow: hidden; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 12px; border-radius: 999px; background: hsl(345, 80%, 95%); color: hsl(345, 55%, 52%); border: 1px solid hsl(345, 60%, 85%); margin-bottom: 16px; }
  .hero h1 { font-size: 32px; font-weight: 700; line-height: 1.3; margin-bottom: 12px; color: hsl(340, 35%, 20%); }
  .hero h1 span { color: hsl(345, 60%, 55%); }
  .hero p { font-size: 15px; color: hsl(340, 15%, 45%); line-height: 1.8; }
  .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
  .section-header h2 { font-size: 18px; font-weight: 700; }
  .section-divider { flex: 1; height: 1px; background: linear-gradient(to right, hsl(345, 50%, 75%), transparent); }
  .section-count { font-size: 13px; color: hsl(340, 15%, 55%); }
  .post-card { background: white; border: 1px solid hsl(345, 30%, 91%); border-radius: 18px; padding: 24px; margin-bottom: 18px; transition: all 0.25s; cursor: pointer; }
  .post-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(180, 80, 100, 0.1); border-color: hsl(345, 60%, 80%); }
  .post-meta { display: flex; align-items: center; gap: 8px; font-size: 12px; color: hsl(340, 15%, 55%); margin-bottom: 10px; }
  .post-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; color: hsl(340, 25%, 18%); line-height: 1.4; transition: color 0.2s; }
  .post-card:hover .post-title { color: hsl(345, 65%, 55%); }
  .post-excerpt { font-size: 14px; color: hsl(340, 15%, 50%); line-height: 1.7; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .post-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 500; background: hsl(345, 70%, 95%); color: hsl(345, 60%, 52%); border: 1px solid hsl(345, 55%, 87%); transition: all 0.2s; }
  .tag:hover { background: hsl(345, 70%, 90%); border-color: hsl(345, 60%, 75%); }
  .footer { border-top: 1px solid hsl(345, 30%, 91%); padding: 28px 24px; text-align: center; color: hsl(340, 15%, 55%); font-size: 13px; margin-top: 60px; }
  .footer-sakura { color: hsl(345, 65%, 68%); margin: 0 6px; }
  .prose { line-height: 1.8; }
  .prose h1 { font-size: 28px; font-weight: 700; margin: 28px 0 16px; color: hsl(340, 30%, 18%); }
  .prose h2 { font-size: 22px; font-weight: 600; margin: 24px 0 12px; color: hsl(340, 30%, 18%); border-bottom: 2px solid hsl(345, 50%, 88%); padding-bottom: 8px; }
  .prose h3 { font-size: 18px; font-weight: 600; margin: 20px 0 10px; color: hsl(340, 30%, 18%); }
  .prose p { margin-bottom: 16px; color: hsl(340, 15%, 40%); }
  .prose a { color: hsl(345, 65%, 55%); text-decoration: underline; }
  .prose strong { color: hsl(340, 25%, 20%); font-weight: 600; }
  .prose blockquote { border-left: 3px solid hsl(345, 65%, 72%); padding: 12px 16px; margin: 20px 0; background: hsl(345, 60%, 97%); border-radius: 0 10px 10px 0; color: hsl(340, 20%, 45%); font-style: italic; }
  .prose ul, .prose ol { padding-left: 24px; margin-bottom: 16px; color: hsl(340, 15%, 40%); }
  .prose li { margin-bottom: 6px; line-height: 1.7; }
  .prose code { background: hsl(345, 70%, 95%); color: hsl(345, 55%, 48%); padding: 2px 6px; border-radius: 5px; font-size: 13px; font-family: 'Fira Code', 'Consolas', monospace; }
  .prose pre { background: hsl(340, 15%, 13%); color: hsl(0, 0%, 90%); border-radius: 12px; padding: 20px; margin: 20px 0; overflow-x: auto; font-size: 13px; }
  .prose pre code { background: none; color: inherit; padding: 0; }
  .prose table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  .prose th { background: hsl(345, 50%, 95%); padding: 10px 14px; border: 1px solid hsl(345, 40%, 88%); font-weight: 600; text-align: left; }
  .prose td { padding: 10px 14px; border: 1px solid hsl(345, 40%, 88%); color: hsl(340, 15%, 45%); }
  .prose hr { border: none; border-top: 1px dashed hsl(345, 40%, 82%); margin: 28px 0; }
  @keyframes fall {
    0% { transform: translateY(-30px) rotate(0deg) translateX(0); opacity: 0.8; }
    33% { transform: translateY(30vh) rotate(60deg) translateX(20px); opacity: 0.7; }
    66% { transform: translateY(65vh) rotate(120deg) translateX(-10px); opacity: 0.5; }
    100% { transform: translateY(105vh) rotate(200deg) translateX(8px); opacity: 0; }
  }
  .petal { position: fixed; pointer-events: none; z-index: 0; animation: fall linear infinite; }
  .back-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; color: hsl(340, 15%, 55%); margin-bottom: 32px; transition: color 0.2s; }
  .back-btn:hover { color: hsl(345, 65%, 55%); }
  .page-title { font-size: 28px; font-weight: 700; color: hsl(340, 30%, 18%); margin-bottom: 8px; }
  .page-subtitle { font-size: 14px; color: hsl(340, 15%, 55%); margin-bottom: 36px; }
  .about-hero { background: linear-gradient(135deg, hsl(345, 60%, 97%), hsl(350, 40%, 95%)); border: 1px solid hsl(345, 40%, 90%); border-radius: 20px; padding: 36px; margin-bottom: 40px; display: flex; align-items: center; gap: 24px; }
  .avatar { width: 72px; height: 72px; border-radius: 50%; flex-shrink: 0; background: linear-gradient(135deg, hsl(345, 65%, 68%), hsl(350, 70%, 75%)); display: flex; align-items: center; justify-content: center; font-size: 28px; color: white; font-weight: 700; }
  .section-title { font-size: 18px; font-weight: 700; margin-bottom: 20px; color: hsl(340, 30%, 18%); display: flex; align-items: center; gap: 8px; }
  .section-title span { color: hsl(345, 65%, 68%); }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: hsl(345, 50%, 82%); border-radius: 3px; }

  /* ===== 控制面板样式 ===== */
  .admin-layout { display: flex; min-height: 100vh; background: hsl(220, 20%, 97%); }
  .admin-sidebar { width: 220px; flex-shrink: 0; background: white; border-right: 1px solid hsl(220, 15%, 91%); display: flex; flex-direction: column; }
  .admin-sidebar-logo { padding: 20px 20px 16px; border-bottom: 1px solid hsl(220, 15%, 91%); }
  .admin-sidebar-logo h2 { font-size: 15px; font-weight: 700; color: hsl(345, 55%, 50%); }
  .admin-sidebar-logo p { font-size: 11px; color: hsl(220, 10%, 55%); margin-top: 2px; }
  .admin-nav { padding: 12px 10px; flex: 1; }
  .admin-nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; font-size: 13px; font-weight: 500; color: hsl(220, 15%, 45%); cursor: pointer; transition: all 0.15s; margin-bottom: 2px; border: none; background: none; width: 100%; text-align: left; }
  .admin-nav-item:hover { background: hsl(345, 60%, 97%); color: hsl(345, 55%, 50%); }
  .admin-nav-item.active { background: hsl(345, 65%, 95%); color: hsl(345, 60%, 48%); font-weight: 600; }
  .admin-nav-icon { font-size: 16px; }
  .admin-sidebar-footer { padding: 14px 10px; border-top: 1px solid hsl(220, 15%, 91%); }
  .admin-content { flex: 1; overflow: auto; }
  .admin-header { background: white; border-bottom: 1px solid hsl(220, 15%, 91%); padding: 0 32px; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
  .admin-header h1 { font-size: 16px; font-weight: 700; color: hsl(220, 20%, 18%); }
  .admin-body { padding: 28px 32px; }

  /* 按钮 */
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; border: none; }
  .btn-primary { background: hsl(345, 65%, 62%); color: white; }
  .btn-primary:hover { background: hsl(345, 65%, 56%); }
  .btn-secondary { background: white; color: hsl(220, 15%, 40%); border: 1px solid hsl(220, 15%, 85%); }
  .btn-secondary:hover { border-color: hsl(220, 15%, 70%); }
  .btn-danger { background: hsl(0, 70%, 95%); color: hsl(0, 65%, 50%); border: 1px solid hsl(0, 60%, 88%); }
  .btn-danger:hover { background: hsl(0, 70%, 90%); }
  .btn-sm { padding: 5px 12px; font-size: 12px; }

  /* 统计卡片 */
  .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: white; border: 1px solid hsl(220, 15%, 91%); border-radius: 14px; padding: 20px 24px; }
  .stat-label { font-size: 12px; color: hsl(220, 10%, 55%); margin-bottom: 6px; }
  .stat-value { font-size: 28px; font-weight: 700; color: hsl(345, 55%, 50%); }
  .stat-sub { font-size: 12px; color: hsl(220, 10%, 65%); margin-top: 4px; }

  /* 文章表格 */
  .table-wrap { background: white; border: 1px solid hsl(220, 15%, 91%); border-radius: 14px; overflow: hidden; }
  .table-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid hsl(220, 15%, 93%); }
  .table-title { font-size: 14px; font-weight: 600; color: hsl(220, 20%, 18%); }
  table.post-table { width: 100%; border-collapse: collapse; }
  table.post-table th { font-size: 12px; font-weight: 600; color: hsl(220, 10%, 55%); padding: 10px 16px; text-align: left; background: hsl(220, 20%, 98%); border-bottom: 1px solid hsl(220, 15%, 92%); }
  table.post-table td { font-size: 13px; color: hsl(220, 15%, 30%); padding: 12px 16px; border-bottom: 1px solid hsl(220, 15%, 94%); vertical-align: middle; }
  table.post-table tr:last-child td { border-bottom: none; }
  table.post-table tr:hover td { background: hsl(345, 60%, 99%); }
  .table-post-title { font-weight: 500; color: hsl(220, 20%, 18%); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tag-sm { display: inline-flex; padding: 2px 8px; border-radius: 999px; font-size: 11px; background: hsl(345, 70%, 95%); color: hsl(345, 60%, 52%); border: 1px solid hsl(345, 55%, 87%); margin-right: 4px; }
  .actions { display: flex; gap: 6px; }

  /* 模态框 */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: white; border-radius: 18px; width: 100%; max-width: 680px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; }
  .modal-header { padding: 20px 24px 16px; border-bottom: 1px solid hsl(220, 15%, 92%); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
  .modal-title { font-size: 16px; font-weight: 700; color: hsl(220, 20%, 15%); }
  .modal-close { width: 30px; height: 30px; border-radius: 8px; border: none; background: hsl(220, 15%, 95%); cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; color: hsl(220, 15%, 50%); transition: all 0.15s; }
  .modal-close:hover { background: hsl(0, 60%, 93%); color: hsl(0, 60%, 50%); }
  .modal-body { padding: 20px 24px; overflow-y: auto; flex: 1; }
  .modal-footer { padding: 14px 24px; border-top: 1px solid hsl(220, 15%, 92%); display: flex; justify-content: flex-end; gap: 8px; flex-shrink: 0; }

  /* 表单 */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .form-group.full { grid-column: 1 / -1; }
  .form-label { font-size: 12px; font-weight: 600; color: hsl(220, 15%, 40%); }
  .form-input { padding: 9px 12px; border: 1px solid hsl(220, 15%, 85%); border-radius: 8px; font-size: 13px; color: hsl(220, 20%, 18%); outline: none; transition: border-color 0.15s; font-family: inherit; background: white; }
  .form-input:focus { border-color: hsl(345, 60%, 70%); box-shadow: 0 0 0 3px hsl(345, 70%, 94%); }
  .form-textarea { padding: 10px 12px; border: 1px solid hsl(220, 15%, 85%); border-radius: 8px; font-size: 13px; color: hsl(220, 20%, 18%); outline: none; transition: border-color 0.15s; font-family: 'Fira Code', 'Consolas', monospace; resize: vertical; min-height: 160px; background: white; line-height: 1.6; }
  .form-textarea:focus { border-color: hsl(345, 60%, 70%); box-shadow: 0 0 0 3px hsl(345, 70%, 94%); }
  .form-hint { font-size: 11px; color: hsl(220, 10%, 60%); }

  /* 设置页 */
  .settings-section { background: white; border: 1px solid hsl(220, 15%, 91%); border-radius: 14px; padding: 24px; margin-bottom: 20px; }
  .settings-section-title { font-size: 14px; font-weight: 700; color: hsl(220, 20%, 18%); margin-bottom: 4px; }
  .settings-section-desc { font-size: 12px; color: hsl(220, 10%, 55%); margin-bottom: 20px; }
  .settings-save-bar { position: sticky; bottom: 0; background: white; border-top: 1px solid hsl(220, 15%, 91%); padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; }
  .settings-save-hint { font-size: 12px; color: hsl(220, 10%, 55%); }
  .tag-input-wrap { display: flex; flex-wrap: wrap; gap: 8px; padding: 8px 12px; border: 1px solid hsl(220, 15%, 85%); border-radius: 8px; min-height: 40px; align-items: center; cursor: text; background: white; }
  .tag-input-wrap:focus-within { border-color: hsl(345, 60%, 70%); box-shadow: 0 0 0 3px hsl(345, 70%, 94%); }
  .tag-item { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 12px; background: hsl(345, 70%, 95%); color: hsl(345, 60%, 50%); border: 1px solid hsl(345, 55%, 87%); }
  .tag-remove { cursor: pointer; font-size: 14px; line-height: 1; opacity: 0.6; }
  .tag-remove:hover { opacity: 1; }
  .tag-input { border: none; outline: none; font-size: 12px; color: hsl(220, 20%, 25%); min-width: 80px; flex: 1; font-family: inherit; background: transparent; }
  .timeline-item { display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start; }
  .timeline-item input { flex: 1; }
  .toast { position: fixed; bottom: 24px; right: 24px; background: hsl(140, 50%, 45%); color: white; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 500; z-index: 999; box-shadow: 0 4px 16px rgba(0,0,0,0.15); animation: slideUp 0.2s ease; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .empty-state { text-align: center; padding: 48px 20px; color: hsl(220, 10%, 55%); }
  .empty-state-icon { font-size: 40px; margin-bottom: 12px; }
  .empty-state-text { font-size: 14px; }

  /* ===== 登录页 ===== */
  .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, hsl(345, 60%, 97%) 0%, hsl(350, 40%, 95%) 50%, hsl(20, 40%, 96%) 100%); }
  .login-card { background: white; border-radius: 24px; padding: 40px; width: 360px; box-shadow: 0 20px 60px rgba(180, 80, 100, 0.12); border: 1px solid hsl(345, 40%, 90%); }
  .login-logo { text-align: center; margin-bottom: 28px; }
  .login-logo h2 { font-size: 22px; font-weight: 700; color: hsl(345, 55%, 50%); margin-bottom: 6px; }
  .login-logo p { font-size: 13px; color: hsl(340, 15%, 55%); }
  .login-error { background: hsl(0, 70%, 97%); color: hsl(0, 65%, 50%); border: 1px solid hsl(0, 60%, 88%); border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 16px; }
  .btn-publish { background: linear-gradient(135deg, hsl(140, 55%, 45%), hsl(150, 60%, 40%)); color: white; }
  .btn-publish:hover { background: linear-gradient(135deg, hsl(140, 55%, 40%), hsl(150, 60%, 35%)); }
  .publish-status { font-size: 12px; color: hsl(220, 10%, 55%); display: flex; align-items: center; gap: 6px; }
  .publish-status.ok { color: hsl(140, 50%, 42%); }
  .publish-status.err { color: hsl(0, 60%, 50%); }
`;

// ===== 樱花飘落 =====
function SakuraPetals() {
  const petals = [
    { left: 5, size: 16, dur: 14, delay: 0 },
    { left: 15, size: 12, dur: 18, delay: 3 },
    { left: 25, size: 20, dur: 12, delay: 6 },
    { left: 35, size: 14, dur: 16, delay: 1 },
    { left: 45, size: 11, dur: 20, delay: 8 },
    { left: 55, size: 17, dur: 13, delay: 4 },
    { left: 65, size: 13, dur: 17, delay: 2 },
    { left: 75, size: 19, dur: 15, delay: 9 },
    { left: 85, size: 15, dur: 11, delay: 5 },
    { left: 92, size: 10, dur: 19, delay: 7 },
  ];
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {petals.map((p, i) => (
        <div key={i} className="petal" style={{ left: `${p.left}%`, top: '-30px', animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}>
          <svg width={p.size} height={p.size} viewBox="0 0 40 40">
            <g transform="translate(20,20)">
              {[0, 72, 144, 216, 288].map((angle, j) => (
                <ellipse key={j} cx={Math.cos((angle * Math.PI) / 180) * 9} cy={Math.sin((angle * Math.PI) / 180) * 9} rx="6" ry="9" transform={`rotate(${angle + 90} ${Math.cos((angle * Math.PI) / 180) * 9} ${Math.sin((angle * Math.PI) / 180) * 9})`} fill="hsl(345, 75%, 78%)" fillOpacity="0.75" />
              ))}
              <circle cx="0" cy="0" r="3" fill="hsl(350, 70%, 88%)" />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}

// ===== 导航 =====
function Navbar({ config }: { config: SiteConfig }) {
  const location = useLocation();
  const navigate = useNavigate();
  const links = [
    { label: '首页', path: '/' },
    { label: '标签', path: '/tags' },
    { label: '关于', path: '/about' },
  ];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">{config.blogName}</Link>
        <div className="nav-links">
          {links.map(l => (
            <Link key={l.path} to={l.path} className={`nav-link${location.pathname === l.path ? ' active' : ''}`}>{l.label}</Link>
          ))}
          <button className="nav-admin-btn" onClick={() => navigate('/admin')}>⚙ 管理</button>
        </div>
      </div>
    </nav>
  );
}

// ===== 页脚 =====
function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="footer">
      <span>{config.blogName}</span>
      <span className="footer-sakura">🌸</span>
      <span>{config.blogSlogan}</span>
    </footer>
  );
}

// ===== Toast =====
function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="toast">✓ {msg}</div>;
}

// ===== 管理员登录页 =====
function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleLogin = () => {
    if (pwd === getAdminPassword()) {
      setAuthed();
      onSuccess();
    } else {
      setError('密码错误，请重试');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPwd('');
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card" style={shake ? { animation: 'shake 0.4s ease' } : {}}>
        <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`}</style>
        <div className="login-logo">
          <div style={{ fontSize: 40, marginBottom: 8 }}>🌸</div>
          <h2>博客控制面板</h2>
          <p>请输入管理员密码</p>
        </div>
        {error && <div className="login-error">{error}</div>}
        <div className="form-group">
          <label className="form-label">管理员密码</label>
          <input
            className="form-input"
            type="password"
            value={pwd}
            onChange={e => { setPwd(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="请输入密码"
            autoFocus
          />
        </div>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={handleLogin}>
          进入控制面板
        </button>
      </div>
    </div>
  );
}

// ===== 标签输入 =====
function TagInputField({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setInput('');
  };
  return (
    <div className="tag-input-wrap" onClick={e => (e.currentTarget.querySelector('input') as HTMLInputElement)?.focus()}>
      {value.map(t => (
        <span key={t} className="tag-item">
          {t}
          <span className="tag-remove" onClick={() => onChange(value.filter(x => x !== t))}>×</span>
        </span>
      ))}
      <input
        className="tag-input"
        value={input}
        placeholder={placeholder || '输入后按回车添加'}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } if (e.key === 'Backspace' && !input && value.length) onChange(value.slice(0, -1)); }}
      />
    </div>
  );
}

// ===== 文章编辑模态框 =====
function PostModal({ post, onSave, onClose }: {
  post: Partial<Post> | null;
  onSave: (p: Post) => void;
  onClose: () => void;
}) {
  const isNew = !post?.id;
  const [form, setForm] = useState<Partial<Post>>(post || {
    title: '', slug: '', excerpt: '', date: new Date().toISOString().slice(0, 10),
    readTime: 5, tags: [], content: '',
  });

  const set = (k: keyof Post, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleTitleChange = (title: string) => {
    set('title', title);
    if (isNew) {
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '').slice(0, 50);
      set('slug', slug);
    }
  };

  const handleSave = () => {
    if (!form.title?.trim()) return alert('标题不能为空');
    if (!form.slug?.trim()) return alert('Slug 不能为空');
    onSave({
      id: form.id || Date.now().toString(),
      title: form.title || '',
      slug: form.slug || '',
      excerpt: form.excerpt || '',
      date: form.date || new Date().toISOString().slice(0, 10),
      readTime: Number(form.readTime) || 5,
      tags: form.tags || [],
      content: form.content || '',
    });
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{isNew ? '✦ 新建文章' : '✦ 编辑文章'}</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">文章标题 *</label>
              <input className="form-input" value={form.title || ''} onChange={e => handleTitleChange(e.target.value)} placeholder="文章标题" />
            </div>
            <div className="form-group">
              <label className="form-label">URL Slug *</label>
              <input className="form-input" value={form.slug || ''} onChange={e => set('slug', e.target.value)} placeholder="my-post-title" />
              <span className="form-hint">用于文章链接地址，建议英文</span>
            </div>
            <div className="form-group">
              <label className="form-label">发布日期</label>
              <input type="date" className="form-input" value={form.date || ''} onChange={e => set('date', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">预计阅读时间（分钟）</label>
              <input type="number" className="form-input" min={1} value={form.readTime || 5} onChange={e => set('readTime', Number(e.target.value))} />
            </div>
            <div className="form-group full">
              <label className="form-label">摘要</label>
              <input className="form-input" value={form.excerpt || ''} onChange={e => set('excerpt', e.target.value)} placeholder="简短描述这篇文章的内容" />
            </div>
            <div className="form-group full">
              <label className="form-label">标签</label>
              <TagInputField value={form.tags || []} onChange={v => set('tags', v)} placeholder="输入标签后按回车" />
            </div>
            <div className="form-group full">
              <label className="form-label">正文（Markdown）</label>
              <textarea className="form-textarea" style={{ minHeight: 260 }} value={form.content || ''} onChange={e => set('content', e.target.value)} placeholder="# 文章标题&#10;&#10;在这里写你的 Markdown 内容..." />
              <span className="form-hint">支持标准 Markdown + GFM（表格、任务列表等）</span>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>取消</button>
          <button className="btn btn-primary" onClick={handleSave}>{isNew ? '发布文章' : '保存修改'}</button>
        </div>
      </div>
    </div>
  );
}

// ===== 删除确认 =====
function ConfirmModal({ title, desc, onConfirm, onClose }: { title: string; desc: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 400 }}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: 14, color: 'hsl(220, 15%, 40%)', lineHeight: 1.7 }}>{desc}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>取消</button>
          <button className="btn btn-danger" onClick={onConfirm}>确认删除</button>
        </div>
      </div>
    </div>
  );
}

// ===== 管理面板 - 文章管理 =====
function AdminPosts({ posts, onAdd, onEdit, onDelete }: {
  posts: Post[];
  onAdd: (p: Post) => void;
  onEdit: (p: Post) => void;
  onDelete: (id: string) => void;
}) {
  const [modal, setModal] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [target, setTarget] = useState<Post | null>(null);
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <div className="table-wrap">
        <div className="table-header">
          <div className="table-title">文章列表 <span style={{ fontSize: 12, fontWeight: 400, color: 'hsl(220, 10%, 55%)', marginLeft: 8 }}>{posts.length} 篇</span></div>
          <button className="btn btn-primary btn-sm" onClick={() => { setTarget(null); setModal('add'); }}>+ 新建文章</button>
        </div>
        {sorted.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🌸</div>
            <div className="empty-state-text">还没有文章，点击"新建文章"开始写作吧</div>
          </div>
        ) : (
          <table className="post-table">
            <thead>
              <tr>
                <th>标题</th>
                <th>标签</th>
                <th>日期</th>
                <th>阅读时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(post => (
                <tr key={post.id}>
                  <td><div className="table-post-title">{post.title}</div></td>
                  <td>{post.tags.map(t => <span key={t} className="tag-sm">{t}</span>)}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{post.date}</td>
                  <td>{post.readTime} 分钟</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => { setTarget(post); setModal('edit'); }}>编辑</button>
                      <button className="btn btn-danger btn-sm" onClick={() => { setTarget(post); setModal('delete'); }}>删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {(modal === 'add' || modal === 'edit') && (
        <PostModal
          post={modal === 'edit' ? target : null}
          onSave={p => { modal === 'add' ? onAdd(p) : onEdit(p); setModal(null); }}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'delete' && target && (
        <ConfirmModal
          title="删除文章"
          desc={`确定要删除《${target.title}》吗？删除后无法恢复。`}
          onConfirm={() => { onDelete(target.id); setModal(null); }}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

// ===== 管理面板 - 站点设置 =====
function AdminSettings({ config, onSave }: { config: SiteConfig; onSave: (c: SiteConfig) => void }) {
  const [form, setForm] = useState<SiteConfig>(config);
  const [dirty, setDirty] = useState(false);
  const [pwdForm, setPwdForm] = useState({ old: '', next: '', confirm: '' });
  const [pwdMsg, setPwdMsg] = useState('');
  const [publishStatus, setPublishStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [publishMsg, setPublishMsg] = useState('');

  // GitHub 发布配置
  const [ghToken, setGhTokenState] = useState(getGithubToken);
  const [ghRepo, setGhRepoState] = useState(getGithubRepo);
  const [tokenVisible, setTokenVisible] = useState(false);

  useEffect(() => { setForm(config); }, [config]);

  const set = (k: keyof SiteConfig, v: unknown) => { setForm(f => ({ ...f, [k]: v })); setDirty(true); };

  const handleSave = () => { onSave(form); setDirty(false); };

  const handleSaveGhConfig = () => {
    setGithubToken(ghToken.trim());
    setGithubRepo(ghRepo.trim());
    setPwdMsg(''); // 复用空间，用 publishMsg 提示
    setPublishMsg('✓ 发布配置已保存');
    setTimeout(() => setPublishMsg(''), 2500);
  };

  const updateTimeline = (i: number, field: 'year' | 'event', v: string) => {
    const t = [...form.timeline];
    t[i] = { ...t[i], [field]: v };
    set('timeline', t);
  };
  const addTimeline = () => set('timeline', [...form.timeline, { year: '', event: '' }]);
  const removeTimeline = (i: number) => set('timeline', form.timeline.filter((_, idx) => idx !== i));

  const handleChangePwd = () => {
    if (!pwdForm.old || !pwdForm.next || !pwdForm.confirm) return setPwdMsg('请填写所有字段');
    if (pwdForm.old !== getAdminPassword()) return setPwdMsg('当前密码错误');
    if (pwdForm.next.length < 4) return setPwdMsg('新密码不能少于 4 位');
    if (pwdForm.next !== pwdForm.confirm) return setPwdMsg('两次密码不一致');
    setAdminPassword(pwdForm.next);
    setPwdMsg('✓ 密码已修改');
    setPwdForm({ old: '', next: '', confirm: '' });
    setTimeout(() => setPwdMsg(''), 2500);
  };

  const handlePublish = async () => {
    setPublishStatus('loading');
    setPublishMsg('正在发布...');

    const posts = JSON.parse(localStorage.getItem('sakura_posts') || 'null');
    const cfg = JSON.parse(localStorage.getItem('sakura_config') || 'null');
    const token = getGithubToken();
    const repo = getGithubRepo();

    // ── 方案 A：GitHub API 直接推送 ──
    if (token) {
      try {
        const now = new Date().toLocaleString('zh-CN');
        const commitMsg = `content: 博客内容更新 ${now}`;

        if (posts) {
          const postsContent = `import type { Post } from '@/types';\n\nexport const posts: Post[] = ${JSON.stringify(posts, null, 2)};\n`;
          setPublishMsg('正在更新文章数据...');
          await githubPutFile(token, repo, 'src/data/posts.ts', postsContent, commitMsg);
        }

        if (cfg) {
          const configContent = `import type { SiteConfig } from '@/types';\n\nexport const defaultConfig: SiteConfig = ${JSON.stringify(cfg, null, 2)};\n`;
          setPublishMsg('正在更新站点配置...');
          await githubPutFile(token, repo, 'src/data/config.ts', configContent, commitMsg);
        }

        // 主动触发 GitHub Actions workflow_dispatch
        setPublishMsg('正在触发部署...');
        const dispatchRes = await fetch(
          `https://api.github.com/repos/${repo}/actions/workflows/deploy.yml/dispatches`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ref: 'main' }),
          }
        );
        // 204 = 成功，422 = 已有 push 触发了（也正常）
        if (!dispatchRes.ok && dispatchRes.status !== 422) {
          console.warn('[publish] workflow dispatch 返回:', dispatchRes.status);
        }

        setPublishStatus('ok');
        setPublishMsg('✓ 发布成功！约 2 分钟后生效');
      } catch (err: unknown) {
        setPublishStatus('err');
        const msg = err instanceof Error ? err.message : String(err);
        setPublishMsg('GitHub API 推送失败：' + msg);
      }
      setTimeout(() => { setPublishStatus('idle'); setPublishMsg(''); }, 6000);
      return;
    }

    // ── 方案 B：本地发布服务（fallback）──
    try {
      const res = await fetch('http://localhost:3721/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ posts, config: cfg }),
      });
      const data = await res.json();
      if (data.ok) {
        setPublishStatus('ok');
        setPublishMsg('✓ 发布成功！约 2 分钟后生效');
      } else {
        setPublishStatus('err');
        setPublishMsg('发布失败：' + (data.error || '未知错误'));
      }
    } catch {
      setPublishStatus('err');
      setPublishMsg('❌ 未配置 GitHub Token，且本地发布服务未运行。请在下方填写 Token 后再试。');
    }
    setTimeout(() => { setPublishStatus('idle'); setPublishMsg(''); }, 6000);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div className="settings-section">
        <div className="settings-section-title">基本信息</div>
        <div className="settings-section-desc">博客名称、口号等全局信息</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">博客名称</label>
            <input className="form-input" value={form.blogName} onChange={e => set('blogName', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">博客口号</label>
            <input className="form-input" value={form.blogSlogan} onChange={e => set('blogSlogan', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">首页标题</label>
            <input className="form-input" value={form.heroTitle} onChange={e => set('heroTitle', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">首页副标题</label>
            <input className="form-input" value={form.heroSubtitle} onChange={e => set('heroSubtitle', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">关于页面 - 个人信息</div>
        <div className="settings-section-desc">显示在关于页面的作者信息</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">姓名 / 称呼</label>
            <input className="form-input" value={form.authorName} onChange={e => set('authorName', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">身份标签</label>
            <input className="form-input" value={form.authorRole} onChange={e => set('authorRole', e.target.value)} placeholder="开发者 · 写作者 · 思考者" />
          </div>
          <div className="form-group">
            <label className="form-label">邮箱</label>
            <input className="form-input" value={form.authorEmail} onChange={e => set('authorEmail', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">GitHub</label>
            <input className="form-input" value={form.authorGithub} onChange={e => set('authorGithub', e.target.value)} />
          </div>
          <div className="form-group full">
            <label className="form-label">个人简介</label>
            <textarea className="form-textarea" style={{ minHeight: 90 }} value={form.authorBio} onChange={e => set('authorBio', e.target.value)} />
          </div>
          <div className="form-group full">
            <label className="form-label">兴趣标签</label>
            <TagInputField value={form.labels} onChange={v => set('labels', v)} />
          </div>
          <div className="form-group full">
            <label className="form-label">技术栈</label>
            <TagInputField value={form.skills} onChange={v => set('skills', v)} />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">关于页面 - 大事记</div>
        <div className="settings-section-desc">时间轴上显示的个人经历</div>
        {form.timeline.map((item, i) => (
          <div key={i} className="timeline-item">
            <input className="form-input" style={{ width: 90, flexShrink: 0 }} value={item.year} onChange={e => updateTimeline(i, 'year', e.target.value)} placeholder="年份" />
            <input className="form-input" value={item.event} onChange={e => updateTimeline(i, 'event', e.target.value)} placeholder="发生了什么..." />
            <button className="btn btn-danger btn-sm" onClick={() => removeTimeline(i)} style={{ flexShrink: 0 }}>删除</button>
          </div>
        ))}
        <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }} onClick={addTimeline}>+ 添加时间节点</button>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">安全设置</div>
        <div className="settings-section-desc">修改控制面板登录密码</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">当前密码</label>
            <input className="form-input" type="password" value={pwdForm.old} onChange={e => setPwdForm(f => ({ ...f, old: e.target.value }))} placeholder="输入当前密码" />
          </div>
          <div className="form-group" />
          <div className="form-group">
            <label className="form-label">新密码</label>
            <input className="form-input" type="password" value={pwdForm.next} onChange={e => setPwdForm(f => ({ ...f, next: e.target.value }))} placeholder="至少 4 位" />
          </div>
          <div className="form-group">
            <label className="form-label">确认新密码</label>
            <input className="form-input" type="password" value={pwdForm.confirm} onChange={e => setPwdForm(f => ({ ...f, confirm: e.target.value }))} placeholder="再次输入新密码" />
          </div>
        </div>
        {pwdMsg && <div style={{ fontSize: 13, color: pwdMsg.startsWith('✓') ? 'hsl(140,50%,42%)' : 'hsl(0,60%,50%)', marginBottom: 12 }}>{pwdMsg}</div>}
        <button className="btn btn-secondary btn-sm" onClick={handleChangePwd}>修改密码</button>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">发布配置</div>
        <div className="settings-section-desc">
          配置后可在任何设备上直接点击「导出并发布」推送到 GitHub，无需本地服务。
          Token 仅存储在本浏览器中，不会上传。
          <br />
          <a
            href="https://github.com/settings/tokens/new?scopes=repo&description=SakuraBlog"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'hsl(345,65%,60%)', textDecoration: 'underline', fontSize: 12 }}
          >
            → 点此生成 GitHub Personal Access Token（需勾选 repo 权限）
          </a>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">GitHub 仓库</label>
            <input
              className="form-input"
              value={ghRepo}
              onChange={e => setGhRepoState(e.target.value)}
              placeholder="用户名/仓库名，如 BrightQX/BrightQX.github.io"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Personal Access Token</label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={tokenVisible ? 'text' : 'password'}
                value={ghToken}
                onChange={e => setGhTokenState(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                style={{ paddingRight: 64 }}
              />
              <button
                onClick={() => setTokenVisible(v => !v)}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: 12,
                  color: 'hsl(345,40%,55%)', padding: '2px 4px',
                }}
              >
                {tokenVisible ? '隐藏' : '显示'}
              </button>
            </div>
          </div>
        </div>
        <button className="btn btn-secondary btn-sm" style={{ marginTop: 4 }} onClick={handleSaveGhConfig}>
          保存发布配置
        </button>
        {getGithubToken() && (
          <div style={{ fontSize: 12, color: 'hsl(140,45%,42%)', marginTop: 8 }}>
            ✓ 已配置 Token，点击「导出并发布」将直接推送到 GitHub
          </div>
        )}
      </div>

      <div className="settings-save-bar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="settings-save-hint">{dirty ? '有未保存的更改' : '所有设置已保存'}</span>
          {publishMsg && <span className={`publish-status ${publishStatus === 'ok' ? 'ok' : publishStatus === 'err' ? 'err' : ''}`}>{publishMsg}</span>}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={handleSave} disabled={!dirty} style={{ opacity: dirty ? 1 : 0.5 }}>保存设置</button>
          <button className="btn btn-publish" onClick={handlePublish} disabled={publishStatus === 'loading'}>
            {publishStatus === 'loading' ? '发布中...' : '🚀 导出并发布'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== 管理面板 - 概览 =====
function AdminOverview({ posts, config }: { posts: Post[]; config: SiteConfig }) {
  const navigate = useNavigate();
  const tagSet = new Set(posts.flatMap(p => p.tags));
  const recentPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  return (
    <div>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">文章总数</div>
          <div className="stat-value">{posts.length}</div>
          <div className="stat-sub">篇已发布</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">标签数量</div>
          <div className="stat-value">{tagSet.size}</div>
          <div className="stat-sub">个分类标签</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">博客名称</div>
          <div className="stat-value" style={{ fontSize: 18, paddingTop: 4 }}>{config.blogName}</div>
          <div className="stat-sub">{config.blogSlogan}</div>
        </div>
      </div>

      <div className="table-wrap">
        <div className="table-header">
          <div className="table-title">最近文章</div>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/admin/posts')}>查看全部</button>
        </div>
        {recentPosts.length === 0 ? (
          <div className="empty-state"><div className="empty-state-icon">🌸</div><div className="empty-state-text">还没有文章</div></div>
        ) : (
          <table className="post-table">
            <thead>
              <tr><th>标题</th><th>标签</th><th>日期</th></tr>
            </thead>
            <tbody>
              {recentPosts.map(post => (
                <tr key={post.id}>
                  <td><div className="table-post-title">{post.title}</div></td>
                  <td>{post.tags.map(t => <span key={t} className="tag-sm">{t}</span>)}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ===== 管理面板主布局 =====
function Admin({ posts, config, onPostAdd, onPostEdit, onPostDelete, onConfigSave }: {
  posts: Post[];
  config: SiteConfig;
  onPostAdd: (p: Post) => void;
  onPostEdit: (p: Post) => void;
  onPostDelete: (id: string) => void;
  onConfigSave: (c: SiteConfig) => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');
  const showToast = useCallback((msg: string) => setToast(msg), []);

  const handlePostAdd = (p: Post) => { onPostAdd(p); showToast('文章发布成功'); };
  const handlePostEdit = (p: Post) => { onPostEdit(p); showToast('文章已保存'); };
  const handlePostDelete = (id: string) => { onPostDelete(id); showToast('文章已删除'); };
  const handleConfigSave = (c: SiteConfig) => { onConfigSave(c); showToast('设置已保存'); };

  const navItems = [
    { icon: '📊', label: '概览', path: '/admin' },
    { icon: '📝', label: '文章管理', path: '/admin/posts' },
    { icon: '⚙️', label: '站点设置', path: '/admin/settings' },
  ];

  const activeLabel = navItems.find(n => n.path === location.pathname)?.label || '概览';

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <h2>🌸 博客控制面板</h2>
          <p>管理你的博客内容</p>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => (
            <button key={item.path} className={`admin-nav-item${location.pathname === item.path ? ' active' : ''}`} onClick={() => navigate(item.path)}>
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <button className="admin-nav-item" style={{ color: 'hsl(345, 55%, 50%)' }} onClick={() => navigate('/')}>
            <span className="admin-nav-icon">←</span>
            返回博客前台
          </button>
          <button className="admin-nav-item" style={{ color: 'hsl(220, 15%, 55%)', marginTop: 2 }} onClick={() => { clearAuthed(); window.location.reload(); }}>
            <span className="admin-nav-icon">🔒</span>
            退出登录
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h1>{activeLabel}</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="/" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">预览博客</a>
          </div>
        </div>
        <div className="admin-body">
          <Routes>
            <Route path="/" element={<AdminOverview posts={posts} config={config} />} />
            <Route path="/posts" element={<AdminPosts posts={posts} onAdd={handlePostAdd} onEdit={handlePostEdit} onDelete={handlePostDelete} />} />
            <Route path="/settings" element={<AdminSettings config={config} onSave={handleConfigSave} />} />
          </Routes>
        </div>
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast('')} />}
    </div>
  );
}

// ===== 博客前台页面 =====
function Home({ posts, config }: { posts: Post[]; config: SiteConfig }) {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="main" style={{ position: 'relative', zIndex: 1 }}>
      <div className="hero">
        <div className="hero-badge">🌸 花开时节，岁月静好</div>
        <h1>{config.heroTitle.split('樱花博客').length > 1
          ? <>{config.heroTitle.split('樱花博客')[0]}<br /><span>樱花博客</span></>
          : config.heroTitle}
        </h1>
        <p>{config.heroSubtitle.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</p>
      </div>
      <div className="section-header">
        <h2>最新文章</h2>
        <div className="section-divider" />
        <span className="section-count">{sorted.length} 篇</span>
      </div>
      <div>
        {sorted.map(post => (
          <Link key={post.id} to={`/post/${post.slug}`} style={{ display: 'block' }}>
            <div className="post-card">
              <div className="post-meta">
                <span>📅 {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>·</span>
                <span>⏱ {post.readTime} 分钟</span>
              </div>
              <div className="post-title">{post.title}</div>
              <div className="post-excerpt">{post.excerpt}</div>
              <div className="post-tags">{post.tags.map(tag => <span key={tag} className="tag"># {tag}</span>)}</div>
            </div>
          </Link>
        ))}
        {sorted.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'hsl(340, 15%, 55%)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🌸</div>
            <p>还没有文章，去控制面板发布第一篇吧</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PostDetail({ posts }: { posts: Post[] }) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="main" style={{ textAlign: 'center', paddingTop: 80, position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>🌸</div>
        <h2 style={{ marginBottom: 12, color: 'hsl(340, 30%, 18%)' }}>文章不见了</h2>
        <p style={{ color: 'hsl(340, 15%, 55%)', marginBottom: 24 }}>就像飘落的樱花，这篇文章已不在此处。</p>
        <button onClick={() => navigate('/')} style={{ padding: '10px 24px', borderRadius: 999, background: 'hsl(345, 65%, 65%)', color: 'white', border: 'none', cursor: 'pointer', fontSize: 14 }}>返回首页</button>
      </div>
    );
  }

  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const idx = sorted.findIndex(p => p.slug === slug);
  const prev = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const next = idx > 0 ? sorted[idx - 1] : null;

  return (
    <div className="main" style={{ position: 'relative', zIndex: 1 }}>
      <Link to="/" className="back-btn">← 返回文章列表</Link>
      <article>
        <div style={{ marginBottom: 16 }}>
          {post.tags.map(tag => <Link key={tag} to={`/tags/${encodeURIComponent(tag)}`} className="tag" style={{ marginRight: 6 }}># {tag}</Link>)}
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 16, lineHeight: 1.3, color: 'hsl(340, 30%, 18%)' }}>{post.title}</h1>
        <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'hsl(340, 15%, 55%)', marginBottom: 32, alignItems: 'center' }}>
          <span>📅 {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span style={{ color: 'hsl(345, 60%, 75%)' }}>✿</span>
          <span>⏱ 约 {post.readTime} 分钟</span>
        </div>
        <div style={{ borderTop: '1px solid hsl(345, 40%, 88%)', marginBottom: 32 }} />
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>
      <div style={{ borderTop: '1px dashed hsl(345, 40%, 85%)', margin: '48px 0 32px', textAlign: 'center', paddingTop: 16, color: 'hsl(345, 65%, 72%)' }}>🌸</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>{prev && <Link to={`/post/${prev.slug}`} style={{ display: 'block', padding: '14px 16px', borderRadius: 14, border: '1px solid hsl(345, 40%, 88%)', fontSize: 13 }}><div style={{ color: 'hsl(340, 15%, 55%)', marginBottom: 4, fontSize: 12 }}>← 上一篇</div><div style={{ color: 'hsl(340, 25%, 20%)', fontWeight: 500, lineHeight: 1.4 }}>{prev.title}</div></Link>}</div>
        <div>{next && <Link to={`/post/${next.slug}`} style={{ display: 'block', padding: '14px 16px', borderRadius: 14, border: '1px solid hsl(345, 40%, 88%)', fontSize: 13, textAlign: 'right' }}><div style={{ color: 'hsl(340, 15%, 55%)', marginBottom: 4, fontSize: 12 }}>下一篇 →</div><div style={{ color: 'hsl(340, 25%, 20%)', fontWeight: 500, lineHeight: 1.4 }}>{next.title}</div></Link>}</div>
      </div>
    </div>
  );
}

function Tags({ posts }: { posts: Post[] }) {
  const tagMap = new Map<string, number>();
  posts.forEach(post => post.tags.forEach(tag => tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)));
  const tags = Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);
  return (
    <div className="main" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ marginBottom: 36 }}>
        <div className="page-title">🏷️ 标签分类</div>
        <div className="page-subtitle">共 {tags.length} 个标签 · {posts.length} 篇文章</div>
      </div>
      <div style={{ padding: '24px', borderRadius: 18, background: 'linear-gradient(135deg, hsl(345, 60%, 99%), hsl(350, 40%, 97%))', border: '1px solid hsl(345, 40%, 90%)', marginBottom: 40 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'hsl(340, 15%, 55%)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>标签云</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {tags.map(([name, count]) => <Link key={name} to={`/tags/${encodeURIComponent(name)}`} className="tag" style={{ fontSize: count > 1 ? 14 : 12, padding: count > 1 ? '5px 14px' : '4px 12px' }}># {name} <span style={{ opacity: 0.6, marginLeft: 4, fontSize: 11 }}>{count}</span></Link>)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {tags.map(([name]) => {
          const tagPosts = posts.filter(p => p.tags.includes(name)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          return (
            <div key={name}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <Link to={`/tags/${encodeURIComponent(name)}`} className="tag" style={{ fontSize: 14, padding: '5px 14px' }}>🌸 {name}</Link>
                <span style={{ fontSize: 12, color: 'hsl(340, 15%, 55%)' }}>{tagPosts.length} 篇</span>
                <div style={{ flex: 1, borderTop: '1px dashed hsl(345, 40%, 86%)' }} />
              </div>
              <div style={{ paddingLeft: 8 }}>
                {tagPosts.map(post => (
                  <Link key={post.id} to={`/post/${post.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, fontSize: 14, color: 'hsl(340, 20%, 22%)', transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'hsl(345, 60%, 97%)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'hsl(345, 65%, 72%)', display: 'inline-block', flexShrink: 0 }} />{post.title}</span>
                    <span style={{ fontSize: 12, color: 'hsl(340, 15%, 55%)', fontFamily: 'monospace', flexShrink: 0 }}>{new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TagDetail({ posts }: { posts: Post[] }) {
  const { tag } = useParams<{ tag: string }>();
  const decodedTag = decodeURIComponent(tag ?? '');
  const tagPosts = posts.filter(p => p.tags.includes(decodedTag)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="main" style={{ position: 'relative', zIndex: 1 }}>
      <Link to="/tags" className="back-btn">← 返回标签列表</Link>
      <div className="page-title"># {decodedTag}</div>
      <div className="page-subtitle">{tagPosts.length} 篇文章</div>
      {tagPosts.map(post => (
        <Link key={post.id} to={`/post/${post.slug}`} style={{ display: 'block' }}>
          <div className="post-card">
            <div className="post-meta"><span>📅 {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span><span>·</span><span>⏱ {post.readTime} 分钟</span></div>
            <div className="post-title">{post.title}</div>
            <div className="post-excerpt">{post.excerpt}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function AboutPage({ config }: { config: SiteConfig }) {
  return (
    <div className="main" style={{ position: 'relative', zIndex: 1 }}>
      <div className="about-hero">
        <div className="avatar">🌸</div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: 'hsl(340, 30%, 18%)' }}>{config.authorName}</h1>
          <p style={{ fontSize: 14, color: 'hsl(340, 15%, 50%)', marginBottom: 12 }}>{config.authorRole}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {config.labels.map(l => <span key={l} className="tag">{l}</span>)}
          </div>
        </div>
      </div>
      <section style={{ marginBottom: 40 }}>
        <div className="section-title"><span>✦</span> 关于我</div>
        <p style={{ fontSize: 14, color: 'hsl(340, 15%, 45%)', lineHeight: 1.9 }}>{config.authorBio}</p>
      </section>
      <section style={{ marginBottom: 40 }}>
        <div className="section-title"><span>✦</span> 技术栈</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {config.skills.map(s => <span key={s} className="tag" style={{ fontSize: 13, padding: '5px 14px' }}>{s}</span>)}
        </div>
      </section>
      <section style={{ marginBottom: 40 }}>
        <div className="section-title"><span>✦</span> 联系方式</div>
        {[{ icon: '📧', label: '邮箱', value: config.authorEmail }, { icon: '🐙', label: 'GitHub', value: config.authorGithub }].map(({ icon, label, value }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, fontSize: 14 }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: 'hsl(345, 70%, 95%)', border: '1px solid hsl(345, 50%, 88%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</span>
            <div><div style={{ fontSize: 11, color: 'hsl(340, 15%, 58%)' }}>{label}</div><div style={{ fontWeight: 500, color: 'hsl(340, 20%, 22%)' }}>{value}</div></div>
          </div>
        ))}
      </section>
      <section>
        <div className="section-title"><span>✦</span> 大事记</div>
        <div style={{ borderLeft: '2px dashed hsl(345, 50%, 82%)', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {config.timeline.map(({ year, event }) => (
            <div key={year} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: -30, top: 2, width: 16, height: 16, borderRadius: '50%', background: 'white', border: '2px solid hsl(345, 65%, 72%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'hsl(345, 65%, 68%)' }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'hsl(345, 55%, 55%)', marginBottom: 4 }}>{year}</div>
              <div style={{ fontSize: 14, color: 'hsl(340, 15%, 45%)', lineHeight: 1.6 }}>{event}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="main" style={{ textAlign: 'center', paddingTop: 80, position: 'relative', zIndex: 1 }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>🌸</div>
      <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 12, color: 'hsl(340, 30%, 18%)' }}>404</h1>
      <p style={{ fontSize: 15, color: 'hsl(340, 15%, 55%)', marginBottom: 28 }}>这朵樱花已飘远，页面不存在</p>
      <button onClick={() => navigate('/')} style={{ padding: '10px 28px', borderRadius: 999, background: 'hsl(345, 65%, 65%)', color: 'white', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>返回首页</button>
    </div>
  );
}

// ===== 路由守卫（admin 需要登录） =====
function AdminRouteGuard({ authed, onAuth, children }: { authed: boolean; onAuth: () => void; children: React.ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  if (path.startsWith('/admin') && !authed) {
    return <AdminLogin onSuccess={onAuth} />;
  }
  return <>{children}</>;
}

// ===== 主应用 =====
export default function App() {
  const [posts, setPosts] = useState<Post[]>(loadPosts);
  const [config, setConfig] = useState<SiteConfig>(loadConfig);
  const [authed, setAuthed_] = useState(isAuthed);

  const handlePostAdd = (p: Post) => {
    const updated = [...posts, p];
    setPosts(updated);
    savePosts(updated);
  };

  const handlePostEdit = (p: Post) => {
    const updated = posts.map(x => x.id === p.id ? p : x);
    setPosts(updated);
    savePosts(updated);
  };

  const handlePostDelete = (id: string) => {
    const updated = posts.filter(x => x.id !== id);
    setPosts(updated);
    savePosts(updated);
  };

  const handleConfigSave = (c: SiteConfig) => {
    setConfig(c);
    saveConfig(c);
  };

  // 判断当前是否是 admin 路由（用于路由守卫）

  return (
    <>
      <style>{globalStyles}</style>
      <BrowserRouter>
        <AdminRouteGuard authed={authed} onAuth={() => setAuthed_(true)}>
          <Routes>
            {/* 控制面板路由（独立布局，无前台 Navbar） */}
            <Route path="/admin/*" element={
              <Admin
                posts={posts}
                config={config}
                onPostAdd={handlePostAdd}
                onPostEdit={handlePostEdit}
                onPostDelete={handlePostDelete}
                onConfigSave={handleConfigSave}
              />
            } />

            {/* 博客前台路由 */}
            <Route path="/*" element={
              <>
                <SakuraPetals />
                <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                  <Navbar config={config} />
                  <div style={{ flex: 1 }}>
                    <Routes>
                      <Route path="/" element={<Home posts={posts} config={config} />} />
                      <Route path="/post/:slug" element={<PostDetail posts={posts} />} />
                      <Route path="/tags" element={<Tags posts={posts} />} />
                      <Route path="/tags/:tag" element={<TagDetail posts={posts} />} />
                      <Route path="/about" element={<AboutPage config={config} />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                  <Footer config={config} />
                </div>
              </>
            } />
          </Routes>
        </AdminRouteGuard>
      </BrowserRouter>
    </>
  );
}
