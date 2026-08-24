# 秦圣东个人 UI 定制实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（\`- [ ]\`）语法来跟踪进度。

**目标：** 将 ArcReel 的公开 fork 定制为“秦圣东 · AI Video Studio”，通过个人视觉身份强化 AI Agent / AI 应用开发作品集表达，并保留所有上游法律署名。

**架构：** 默认品牌值集中在 \`branding.ts\`，使动态标题、懒加载翻译占位符和入口页面共享同一来源。QS 标记使用本地 SVG，登录页和项目大厅复用该资源；主题仅通过全局语义 token 改色。About 页保留所需的上游声明，并从品牌配置读取个人定制信息。

**技术栈：** Vite 8、React 19、TypeScript、Tailwind CSS 4、Vitest、i18next。

---

### 任务 1：锁定默认品牌与法定归属

**文件：**
- 创建：\`frontend/src/branding.test.ts\`
- 修改：\`frontend/src/branding.ts\`
- 修改：\`frontend/src/i18n/en/dashboard.ts\`
- 修改：\`frontend/src/i18n/zh/dashboard.ts\`
- 修改：\`frontend/src/i18n/vi/dashboard.ts\`

- [ ] **步骤 1：编写失败的默认品牌测试**

~~~ts
import { describe, expect, it } from "vitest";
import { BRAND, PERSONAL_UI_ATTRIBUTION } from "@/branding";

describe("personal studio branding", () => {
  it("ships Qin Shengdong's studio identity by default", () => {
    expect(BRAND.name).toBe("秦圣东 · AI Video Studio");
    expect(BRAND.tagline).toBe("Agent 驱动的 AI 视频工作台");
    expect(PERSONAL_UI_ATTRIBUTION).toBe("Personal UI customization by Qin Shengdong");
  });
});
~~~

- [ ] **步骤 2：运行测试验证失败**

运行：\`pnpm vitest run src/branding.test.ts\`

预期：FAIL，\`BRAND.name\` 仍为 \`ArcReel\`，且 \`PERSONAL_UI_ATTRIBUTION\` 尚未导出。

- [ ] **步骤 3：实现集中品牌配置和翻译 key**

~~~ts
export const PERSONAL_UI_ATTRIBUTION = "Personal UI customization by Qin Shengdong";

export const BRAND = {
  name: fallback(env.VITE_BRAND_NAME, "秦圣东 · AI Video Studio"),
  tagline: fallback(env.VITE_BRAND_TAGLINE, "Agent 驱动的 AI 视频工作台"),
  description: fallback(env.VITE_BRAND_DESCRIPTION, "面向脚本到成片的 Agent 驱动 AI 视频工作台。"),
} as const;
~~~

在三个 \`dashboard.ts\` 文件加入相同 key \`about_personal_customization\`，中文、英文、越南文均表达“由秦圣东进行个人 UI 定制”。

- [ ] **步骤 4：运行测试验证通过**

运行：\`pnpm vitest run src/branding.test.ts\`

预期：PASS，1 个测试通过。

- [ ] **步骤 5：提交**

~~~bash
git add frontend/src/branding.ts frontend/src/branding.test.ts frontend/src/i18n/en/dashboard.ts frontend/src/i18n/zh/dashboard.ts frontend/src/i18n/vi/dashboard.ts
git commit -m "feat: add Qin Shengdong studio branding"
~~~

### 任务 2：添加个人标记、入口元数据和全局主题

**文件：**
- 创建：\`frontend/public/qinshengdong-mark.svg\`
- 修改：\`frontend/index.html\`
- 修改：\`frontend/public/site.webmanifest\`
- 修改：\`frontend/src/index.css\`
- 修改：\`frontend/src/pages/LoginPage.tsx\`
- 修改：\`frontend/src/pages/LoginPage.test.tsx\`

- [ ] **步骤 1：编写失败的登录页标记测试**

~~~ts
it("shows the Qin Shengdong studio mark", () => {
  const { container } = renderLoginAt("/login");
  expect(container.querySelector('img[src="/qinshengdong-mark.svg"]')).toHaveAttribute(
    "alt",
    "秦圣东 · AI Video Studio",
  );
});
~~~

- [ ] **步骤 2：运行测试验证失败**

运行：\`pnpm vitest run src/pages/LoginPage.test.tsx\`

预期：FAIL，登录页仍引用 \`android-chrome-192x192.png\`。

- [ ] **步骤 3：实现个人图标、入口元数据和语义主题色**

~~~svg
<svg viewBox="0 0 64 64" role="img" aria-labelledby="title">
  <title id="title">Qin Shengdong AI Video Studio</title>
</svg>
~~~

让 \`index.html\` 的 favicon 与 Apple touch icon 指向 \`/qinshengdong-mark.svg\`，把 \`site.webmanifest\` 的 \`name\` / \`short_name\` 改为 \`Qin Shengdong AI Video Studio\`，并将其主色与背景色设为深海蓝黑。把 \`index.css\` 的 \`--color-accent*\` 与背景渐变替换为青绿、天蓝和深海蓝黑的语义 token；不要在组件中引入新的裸 hex 色。

- [ ] **步骤 4：运行测试验证通过**

运行：\`pnpm vitest run src/pages/LoginPage.test.tsx\`

预期：PASS，所有登录回跳测试与新标记断言通过。

- [ ] **步骤 5：提交**

~~~bash
git add frontend/public/qinshengdong-mark.svg frontend/index.html frontend/public/site.webmanifest frontend/src/index.css frontend/src/pages/LoginPage.tsx frontend/src/pages/LoginPage.test.tsx
git commit -m "feat: apply Qin Shengdong visual identity"
~~~

### 任务 3：更新项目大厅与 About 归属

**文件：**
- 修改：\`frontend/src/components/pages/ProjectsPage.tsx\`
- 修改：\`frontend/src/components/pages/settings/AboutSection.tsx\`
- 修改：\`frontend/src/components/pages/settings/AboutSection.test.tsx\`

- [ ] **步骤 1：编写失败的 About 归属测试**

~~~ts
it("keeps the upstream attribution and shows the personal UI customization", async () => {
  render(<AboutSection />);
  expect(await screen.findByText("Personal UI customization by Qin Shengdong")).toBeInTheDocument();
  expect(screen.getByText("Powered by ArcReel —", { exact: false })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "https://github.com/ArcReel/ArcReel" })).toBeInTheDocument();
});
~~~

- [ ] **步骤 2：运行测试验证失败**

运行：\`pnpm vitest run src/components/pages/settings/AboutSection.test.tsx\`

预期：FAIL，尚未显示个人定制说明。

- [ ] **步骤 3：实现品牌化的大厅和 About 声明**

~~~tsx
<img src="/qinshengdong-mark.svg" alt={BRAND.name} className="h-8 w-8 rounded-lg" />
~~~

在项目大厅顶栏改用 QS 标记、强化移动端换行规则，并让首屏使用现有真实项目统计呈现 Agent 工作台的视觉层级。About legal 卡片先显示 \`about_personal_customization\`，再逐字保留上游 copyright、Powered by ArcReel 和仓库链接。

- [ ] **步骤 4：运行测试验证通过**

运行：\`pnpm vitest run src/components/pages/settings/AboutSection.test.tsx\`

预期：PASS，诊断下载测试与新增归属测试全部通过。

- [ ] **步骤 5：提交**

~~~bash
git add frontend/src/components/pages/ProjectsPage.tsx frontend/src/components/pages/settings/AboutSection.tsx frontend/src/components/pages/settings/AboutSection.test.tsx
git commit -m "feat: personalize studio entry experience"
~~~

### 任务 4：全量验证、视觉检查和发布

**文件：**
- 修改：\`docs/superpowers/specs/2026-08-24-qinshengdong-personal-ui.md\`
- 修改：\`docs/superpowers/plans/2026-08-24-qinshengdong-personal-ui.md\`

- [ ] **步骤 1：运行前端静态与行为检查**

运行：\`pnpm check\`

预期：typecheck、eslint 与 Vitest 均通过。

- [ ] **步骤 2：构建生产包**

运行：\`pnpm build\`

预期：Vite 成功生成 \`frontend/dist\`。

- [ ] **步骤 3：检查法律与提交差异**

运行：\`git diff --check upstream/main...HEAD && git diff --name-only upstream/main...HEAD\`

预期：无空白错误，\`LICENSE\` 与 \`NOTICE\` 不在改动列表，且 About 仍包含上游链接。

- [ ] **步骤 4：在浏览器检查登录页**

运行：\`pnpm dev -- --host 127.0.0.1\`

预期：登录页在桌面与 375px 视口下展示 QS 图标、个人品牌、深海蓝黑背景、青绿色主按钮和可见焦点样式。

- [ ] **步骤 5：提交并推送**

~~~bash
git add docs/superpowers/specs/2026-08-24-qinshengdong-personal-ui.md docs/superpowers/plans/2026-08-24-qinshengdong-personal-ui.md
git commit -m "docs: document personal studio customization"
git switch main
git merge --ff-only feat/qinshengdong-studio-ui
git push -u origin main
~~~

