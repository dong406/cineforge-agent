import { afterEach, describe, expect, it, vi } from "vitest";

const DEFAULT_BRAND = {
  name: "CineForge Agent",
  tagline: "AI 视频创作智能体工作台",
  description: "从脚本到成片的 Agent 驱动 AI 视频创作工作台。",
} as const;

async function loadBranding() {
  vi.resetModules();
  return import("@/branding");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("CineForge Agent branding", () => {
  it("ships the CineForge Agent identity by default", async () => {
    vi.stubEnv("VITE_BRAND_NAME", "");
    vi.stubEnv("VITE_BRAND_TAGLINE", " ");
    vi.stubEnv("VITE_BRAND_DESCRIPTION", "\t");

    const { BRAND, PERSONAL_UI_ATTRIBUTION } = await loadBranding();

    expect(BRAND).toMatchObject(DEFAULT_BRAND);
    expect(PERSONAL_UI_ATTRIBUTION).toBe("Personal UI customization by Qin Shengdong");
  });

  it("uses non-empty Vite brand overrides", async () => {
    vi.stubEnv("VITE_BRAND_NAME", "Qin Shengdong Studio");
    vi.stubEnv("VITE_BRAND_TAGLINE", "Custom tagline");
    vi.stubEnv("VITE_BRAND_DESCRIPTION", "Custom description");

    const { BRAND } = await loadBranding();

    expect(BRAND).toMatchObject({
      name: "Qin Shengdong Studio",
      tagline: "Custom tagline",
      description: "Custom description",
    });
  });

  it("falls back to configured defaults for empty and whitespace Vite brand overrides", async () => {
    vi.stubEnv("VITE_BRAND_NAME", "");
    vi.stubEnv("VITE_BRAND_TAGLINE", "   ");
    vi.stubEnv("VITE_BRAND_DESCRIPTION", "\n\t");

    const { BRAND } = await loadBranding();

    expect(BRAND).toMatchObject(DEFAULT_BRAND);
  });
});
