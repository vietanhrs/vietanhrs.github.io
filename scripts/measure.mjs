import { chromium } from "playwright-core";
import { writeFile, readdir, readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome-stable",
  headless: true,
});
const results = {};
try {
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
    });
    await page.addInitScript(
      (t) => localStorage.setItem("vietanh-portfolio-theme", t),
      theme,
    );
    await page.goto("http://127.0.0.1:4173");
    await page.evaluate(() => document.fonts.ready);
    results[theme] = await page.evaluate(() => {
      const rgb = (s) =>
        s
          .match(/[\d.]+/g)
          .slice(0, 3)
          .map(Number);
      const lum = (c) =>
        c
          .map((v) => v / 255)
          .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
          .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
      const ratio = (a, b) =>
        (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
      const pairs = [];
      for (const sel of [
        "body",
        ".meta",
        ".eyebrow",
        ".primary-action",
        ".secondary-action",
        ".syntax-keyword",
        ".syntax-string",
        ".artifact-note",
        ".contact-email",
      ]) {
        const el = document.querySelector(sel),
          cs = getComputedStyle(el);
        let bg = cs.backgroundColor,
          parent = el;
        while (bg === "rgba(0, 0, 0, 0)" && parent.parentElement) {
          parent = parent.parentElement;
          bg = getComputedStyle(parent).backgroundColor;
        }
        const value = ratio(rgb(cs.color), rgb(bg));
        pairs.push({
          selector: sel,
          foreground: cs.color,
          background: bg,
          ratio: +value.toFixed(2),
        });
      }
      return {
        pairs,
        fontResources: performance
          .getEntriesByType("resource")
          .filter((e) => e.name.includes("woff"))
          .map((e) => ({ name: e.name, bytes: e.encodedBodySize })),
        documentHeight: document.documentElement.scrollHeight,
        heroHeight: document.querySelector(".hero").getBoundingClientRect()
          .height,
      };
    });
    await page.screenshot({
      path: "../screenshots/1440-" + theme + "-hero.png",
    });
    await page.close();
  }
  const assets = async (dir) => {
    const files = await readdir(dir);
    return Promise.all(
      files.map(async (file) => {
        const bytes = await readFile(dir + "/" + file);
        return { file, bytes: bytes.length, gzip: gzipSync(bytes).length };
      }),
    );
  };
  results.baseline = await assets("../baseline/dist/assets");
  results.after = await assets("dist/assets");
  await writeFile("../measurements.json", JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  for (const theme of ["light", "dark"])
    for (const pair of results[theme].pairs)
      if (pair.ratio < 4.5)
        throw new Error("Contrast failure " + theme + " " + pair.selector);
} finally {
  await browser.close();
}
