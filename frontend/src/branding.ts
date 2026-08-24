// Brand configuration — single source of truth for product naming.
// Override at build time via Vite env vars
// (VITE_BRAND_NAME / VITE_BRAND_TAGLINE / VITE_BRAND_DESCRIPTION).
//
// Source code references BRAND.name (or the [[brand]] placeholder in i18n
// resources) so the displayed product name is not hardcoded across files.
// Defaults provide the personal studio brand; downstream distributions can
// override via frontend/.env without code changes.

const env = import.meta.env as Record<string, string | undefined>;

function fallback(value: string | undefined, defaultValue: string): string {
  // Trim + empty check so VITE_BRAND_NAME="" (or whitespace) falls back to the
  // default, matching the documented "Empty = upstream defaults" contract.
  if (typeof value !== "string") return defaultValue;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : defaultValue;
}

export const BRAND = {
  name: fallback(env.VITE_BRAND_NAME, "秦圣东 · AI Video Studio"),
  tagline: fallback(env.VITE_BRAND_TAGLINE, "Agent 驱动的 AI 视频工作台"),
  description: fallback(
    env.VITE_BRAND_DESCRIPTION,
    "面向脚本到成片的 Agent 驱动 AI 视频工作台。",
  ),
} as const;

export const BRAND_DOCUMENT_TITLE = `${BRAND.name} · ${BRAND.tagline}`;
export const PERSONAL_UI_ATTRIBUTION = "Personal UI customization by Qin Shengdong";

