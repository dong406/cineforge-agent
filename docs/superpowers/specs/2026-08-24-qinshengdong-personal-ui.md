# 秦圣东个人 UI 定制设计

## 目标

将上游 AI 视频工作台定制为可公开展示的个人工程作品：**秦圣东 · AI Video Studio**。保留原有项目、Agent 工作流和 API 行为，仅替换用户可见的品牌、视觉令牌、入口图标与法律归属表达。

## 产品与视觉方向

- 定位：Agent 驱动的 AI 视频创作工作台，面向从脚本到成片的创作流程。
- 主品牌：\`秦圣东 · AI Video Studio\`。
- 视觉：深海蓝黑背景、青绿色主操作色、天蓝信息高亮；使用紧凑卡片、细边框、QS 字母 SVG 标记与工程化数据排版。
- 交互：保持现有路由和操作不变；沿用已有可见焦点、减少动效和禁用态处理。

## 许可证与署名边界

上游 \`NOTICE\` 明确要求修改版在显著的 About、Legal、Footer 或 Attribution 区域保留：

\`Powered by ArcReel — https://github.com/ArcReel/ArcReel\`

且 ArcReel 名称与 Logo 不随 AGPL-3.0 授权。因此，不将 ArcReel 用作本版本的产品名或图标；About 页保留原始版权、上游链接，并新增“由秦圣东进行个人 UI 定制”的可翻译说明。

## 改造范围

1. \`frontend/src/branding.ts\`：把默认品牌、标语、说明与个人定制署名收敛到单一配置源。
2. \`frontend/public/qinshengdong-mark.svg\`、\`frontend/index.html\`、\`frontend/public/site.webmanifest\`：替换应用入口图标与安装元数据。
3. \`frontend/src/index.css\`：将全局暗色调由紫色转为深海蓝黑与青绿色，同时保留语义状态色与无障碍焦点环。
4. \`frontend/src/pages/LoginPage.tsx\`、\`frontend/src/components/pages/ProjectsPage.tsx\`：替换入口品牌标记，压缩移动端顶栏布局，并强化项目大厅的 Agent 工作台观感。
5. \`frontend/src/components/pages/settings/AboutSection.tsx\` 和全部支持语言的 \`dashboard.ts\`：添加个人定制说明，同时完整保留上游 required attribution。

## 验证标准

- 品牌默认值、个人署名和登录页标记由 Vitest 覆盖。
- About 页展示个人定制说明，同时仍展示逐字不变的 Powered by ArcReel 声明与上游链接。
- \`pnpm check\`、\`pnpm build\` 与 \`git diff --check\` 通过。
- 在浏览器检查登录页的桌面和窄屏布局；确认主题、标题、标记、焦点样式和减弱动效不回归。

