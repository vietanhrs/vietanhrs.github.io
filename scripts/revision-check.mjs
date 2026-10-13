import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const out = process.env.EVIDENCE_DIR || "../../portfolio-revision/screenshots";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome-stable",
  headless: true,
});
const results = [];
try {
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    await page.addInitScript(
      (t) => localStorage.setItem("vietanh-portfolio-theme", t),
      theme,
    );
    await page.goto(process.env.BASE_URL || "http://127.0.0.1:4173");
    await page.evaluate(() => document.fonts.ready);
    const original = execFileSync(
      "git",
      [
        "show",
        "91e4f40a1fc6739599f0bde6bfd055f58ad347ae:src/components/ExperienceSection.tsx",
      ],
      { encoding: "utf8" },
    );
    const highlights = [...original.matchAll(/highlights:\s*\[([\s\S]*?)\],/g)]
      .flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]))
      .filter((x) => !x.includes("roughly 5 minutes"));
    for (const text of highlights)
      assert(await page.getByText(text, { exact: true }).isVisible(), text);
    assert.equal(highlights.length, 14);
    const contrast = await page.evaluate(() => {
      const lum = (s) =>
        s
          .match(/[\d.]+/g)
          .slice(0, 3)
          .map(Number)
          .map((v) => v / 255)
          .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
          .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
      const pairs = new Map();
      for (const e of document.querySelectorAll(
        "p,h1,h2,h3,h4,a,li,dt,dd,button",
      )) {
        const c = getComputedStyle(e);
        if (!e.getClientRects().length || c.visibility === "hidden") continue;
        let p = e,
          bg = c.backgroundColor;
        while (bg === "rgba(0, 0, 0, 0)" && p.parentElement) {
          p = p.parentElement;
          bg = getComputedStyle(p).backgroundColor;
        }
        if (bg === "rgba(0, 0, 0, 0)") continue;
        const a = lum(c.color),
          b = lum(bg);
        pairs.set(c.color + bg, {
          text: e.textContent.trim().slice(0, 60),
          color: c.color,
          bg,
          ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
        });
      }
      return [...pairs.values()];
    });
    for (const p of contrast) assert(p.ratio >= 4.5, JSON.stringify(p));
    for (const id of ["experiences", "achievements", "gear"]) {
      await page.locator("#" + id).scrollIntoViewIfNeeded();
      await page.screenshot({
        path: out + "/1440-" + theme + "-" + id + ".png",
      });
    }
    await page.locator('.career-index a[href="#teko"]').click();
    await page.waitForURL("**/#teko");
    await page.waitForFunction(() => {
      const y = document.getElementById("teko").getBoundingClientRect().top;
      return y >= 78 && y < 180;
    });
    results.push({
      theme,
      originalHighlightsVisible: highlights.length,
      contrast,
      minContrast: Math.min(...contrast.map((x) => x.ratio)),
    });
    await page.close();
  }
  await writeFile(
    out + "/content-contrast.json",
    JSON.stringify(results, null, 2),
  );
  console.log(
    "PASS all 14 original nonnumeric highlights visible, contrast >=4.5, career index landing",
  );
} finally {
  await browser.close();
}
