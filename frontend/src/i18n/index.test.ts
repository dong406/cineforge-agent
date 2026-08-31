import { describe, expect, it } from "vitest";
import i18n, { i18nReady } from "@/i18n";

describe("interface language defaults", () => {
  it("pins Chinese as the startup language instead of using a detected browser preference", async () => {
    await i18nReady;

    expect(i18n.options.lng).toBe("zh");
  });
});
