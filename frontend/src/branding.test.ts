import { describe, expect, it } from "vitest";
import { BRAND, PERSONAL_UI_ATTRIBUTION } from "@/branding";

describe("personal studio branding", () => {
  it("ships Qin Shengdong's studio identity by default", () => {
    expect(BRAND.name).toBe("秦圣东 · AI Video Studio");
    expect(BRAND.tagline).toBe("Agent 驱动的 AI 视频工作台");
    expect(BRAND.description).toBe("面向脚本到成片的 Agent 驱动 AI 视频工作台。");
    expect(PERSONAL_UI_ATTRIBUTION).toBe("Personal UI customization by Qin Shengdong");
  });
});
