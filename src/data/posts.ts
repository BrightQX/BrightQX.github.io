import type { Post } from '@/types';

export const posts: Post[] = [
  {
    "id": "1",
    "title": "开始我的写作之旅",
    "slug": "start-my-writing-journey",
    "excerpt": "一直以来，我都想把自己的所思所想记录下来。今天，终于迈出了这一步——建了这个博客，开始认真写作。",
    "date": "2026-03-20",
    "readTime": 3,
    "tags": [
      "随笔",
      "生活"
    ],
    "content": "# 开始我的写作之旅\n\n一直以来，我都想把自己的所思所想记录下来。今天，终于迈出了这一步——建了这个博客，开始认真写作。\n\n## 为什么写作？\n\n写作对我来说，是一种**整理思绪**的方式。\n\n> 写作不是为了展示聪明，而是为了理清思路。\n\n## 我打算写什么？\n\n- **技术分享**：编程、工具、效率方法\n- **读书笔记**：好书不能只读一遍\n- **生活随笔**：记录值得记录的瞬间\n\n感谢你找到这里。欢迎交流 :)"
  },
  {
    "id": "2",
    "title": "我用了半年的效率工具清单",
    "slug": "productivity-tools",
    "excerpt": "分享几个真正改变了我工作方式的效率工具，不是广告，是真实使用体验。",
    "date": "2026-03-15",
    "readTime": 6,
    "tags": [
      "效率",
      "工具"
    ],
    "content": "# 我用了半年的效率工具清单\n\n分享几个真正改变了我工作方式的效率工具。\n\n## 笔记类\n\n### Obsidian\n\n双向链接笔记，适合构建个人知识图谱。\n\n**优点：**\n- 完全本地，数据在自己手里\n- 插件生态强大\n- Markdown 原生支持\n\n## 写作类\n\n### Typora\n\n最干净的 Markdown 编辑器，没有之一。\n\n---\n\n工具只是工具，最重要的还是养成**使用习惯**。"
  },
  {
    "id": "3",
    "title": "TypeScript 实用技巧",
    "slug": "typescript-practical-tips",
    "excerpt": "这些 TypeScript 技巧是我在真实项目中反复用到的，实战中摸爬滚打出来的经验。",
    "date": "2026-03-08",
    "readTime": 8,
    "tags": [
      "技术",
      "TypeScript"
    ],
    "content": "# TypeScript 实用技巧\n\n这些 TypeScript 技巧是我在真实项目中反复用到的。\n\n## 1. 善用 `satisfies` 操作符\n\n```typescript\nconst config = {\n  port: 3000,\n  host: 'localhost',\n} satisfies Record<string, string | number>;\n```\n\n## 2. 使用 `as const` 锁定字面量类型\n\n```typescript\nconst ROLES = ['admin', 'user', 'guest'] as const;\ntype Role = typeof ROLES[number];\n```\n\nTypeScript 的类型系统深不见底，但掌握这些高频模式，应对日常开发绰绰有余。"
  },
  {
    "id": "4",
    "title": "《深度工作》读书笔记",
    "slug": "deep-work-reading-notes",
    "excerpt": "卡尔·纽波特的《深度工作》彻底改变了我对时间管理的认知。",
    "date": "2026-02-28",
    "readTime": 5,
    "tags": [
      "读书",
      "效率"
    ],
    "content": "# 《深度工作》读书笔记\n\n卡尔·纽波特的《深度工作》彻底改变了我对时间管理的认知。\n\n## 核心观点\n\n> 深度工作：在无干扰的状态下专注进行职业活动，使个人的认知能力得到极致发挥。\n\n## 我的实践\n\n| 时间段 | 安排 |\n|--------|------|\n| 9:00-10:30 | 深度工作块 1 |\n| 11:00-12:30 | 深度工作块 2 |\n\n这本书值得反复读。推荐。"
  },
  {
    "id": "5",
    "title": "用 React + Vite 搭建现代前端项目",
    "slug": "react-vite-modern-setup",
    "excerpt": "从零开始搭建一个生产级的 React 项目，包含代码规范等配置。",
    "date": "2026-02-18",
    "readTime": 10,
    "tags": [
      "技术",
      "React"
    ],
    "content": "# 用 React + Vite 搭建现代前端项目\n\n从零开始搭建一个生产级的 React 项目。\n\n## 初始化项目\n\n```bash\nnpm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install\n```\n\n## 配置路径别名\n\n在 `vite.config.ts` 中配置 `@` 路径别名即可。\n\n---\n\n这套配置是我目前最顺手的 React 项目起始模板。"
  },
  {
    "id": "1774355658718",
    "title": "test",
    "slug": "test",
    "excerpt": "test",
    "date": "2026-03-24",
    "readTime": 5,
    "tags": [
      "test"
    ],
    "content": "test"
  }
];
