import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome-stable",
  headless: true,
});
const results = [];
try {
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 740 },
      reducedMotion: "reduce",
    });
    await page.addInitScript(
      (t) => localStorage.setItem("vietanh-portfolio-theme", t),
      theme,
    );
    await page.goto("http://127.0.0.1:4173");
    await page.getByRole("button", { name: /Theme:/ }).click();
    await page.getByRole("menuitemradio", { name: "System" }).hover();
    await page.screenshot({
      path: "../screenshots/390-" + theme + "-theme.png",
    });
    const measure = async (selector) =>
      page
        .locator(selector)
        .first()
        .evaluate((el) => {
          const cs = getComputedStyle(el);
          let p = el,
            bg = cs.backgroundColor;
          while (bg === "rgba(0, 0, 0, 0)" && p.parentElement) {
            p = p.parentElement;
            bg = getComputedStyle(p).backgroundColor;
          }
          const lum = (s) =>
            s
              .match(/[\d.]+/g)
              .slice(0, 3)
              .map(Number)
              .map((v) => v / 255)
              .map((v) =>
                v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
              )
              .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
          const a = lum(cs.color),
            b = lum(bg);
          return {
            color: cs.color,
            bg,
            ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
          };
        });
    for (const selector of [
      "[role=menuitemradio]",
      "[role=menuitemradio][data-highlighted]",
    ])
      results.push({ theme, selector, ...(await measure(selector)) });
    await page.keyboard.press("Escape");
    await page.locator("#gear summary").click();
    for (const selector of [".gear-grid h3", ".gear-grid dt", ".gear-grid dd"])
      results.push({ theme, selector, ...(await measure(selector)) });
    await page.locator(".primary-action").hover();
    results.push({
      theme,
      selector: ".primary-action:hover",
      ...(await measure(".primary-action")),
    });
    await page.locator(".secondary-action").focus();
    results.push({
      theme,
      selector: ".secondary-action:focus",
      ...(await measure(".secondary-action")),
    });
    await page.close();
  }
  for (const r of results) assert(r.ratio >= 4.5);
  await writeFile(
    "../interactive-contrast.json",
    JSON.stringify(results, null, 2),
  );
  console.log("PASS interactive surfaces, text >=4.5:1");
} finally {
  await browser.close();
}
