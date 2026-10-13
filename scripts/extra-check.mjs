import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: true,
});
const result = {};
try {
  for (const port of [4174, 4173]) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 664 },
    });
    const fonts = [];
    page.on("response", async (r) => {
      if (/fonts|woff|ttf/.test(r.url())) {
        try {
          fonts.push({ url: r.url(), bytes: (await r.body()).length });
        } catch {}
      }
    });
    await page.goto("http://127.0.0.1:" + port);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    result[port] = {
      fonts,
      layout: await page.evaluate(() => ({
        hero: document.querySelector("main section").getBoundingClientRect()
          .height,
        height: document.documentElement.scrollHeight,
        cta: document.querySelector(".primary-action")?.getBoundingClientRect()
          .bottom,
      })),
    };
    if (port === 4173) {
      for (const theme of ["light", "dark"]) {
        await page.evaluate(
          (t) => localStorage.setItem("vietanh-portfolio-theme", t),
          theme,
        );
        await page.reload();
        await page.screenshot({
          path: "../screenshots/390-" + theme + "-hero.png",
        });
        await page.getByRole("button", { name: /Theme:/ }).click();
        await page.screenshot({
          path: "../screenshots/390-" + theme + "-theme.png",
        });
        await page.keyboard.press("Escape");
        assert(
          await page
            .getByRole("button", { name: /Theme:/ })
            .evaluate((e) => e === document.activeElement),
        );
      }
      await page.setViewportSize({ width: 720, height: 450 });
      await page.evaluate(
        () => (document.documentElement.style.fontSize = "200%"),
      );
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      await page.screenshot({
        path: "../screenshots/reflow-200-percent.png",
        fullPage: true,
      });
    }
    await page.close();
  }
  await writeFile(
    "../font-layout-measurements.json",
    JSON.stringify(result, null, 2),
  );
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
