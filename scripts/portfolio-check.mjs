import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
const out = process.env.EVIDENCE_DIR || "../screenshots";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome-stable",
  headless: true,
});
const results = [];
try {
  for (const width of [320, 390, 1440])
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height: width === 1440 ? 900 : 740 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.addInitScript(
        (theme) => localStorage.setItem("vietanh-portfolio-theme", theme),
        theme,
      );
      await page.goto(base);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").innerText(), "Trần Việt Anh");
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      assert.equal(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).scrollBehavior,
        ),
        "auto",
      );
      assert.equal(
        await page.evaluate(() =>
          getComputedStyle(document.body).fontFamily.includes(
            "Source Code Pro",
          ),
        ),
        true,
      );
      await page.screenshot({
        path: out + "/" + width + "-" + theme + ".png",
        fullPage: true,
      });
      if (width < 900) {
        const button = page.getByRole("button", { name: "Open navigation" });
        await button.click();
        assert.equal(
          await page
            .getByRole("button", { name: "Close navigation" })
            .getAttribute("aria-expanded"),
          "true",
        );
        assert.notEqual(
          await page
            .locator("#mobile-navigation")
            .evaluate((e) => getComputedStyle(e).backgroundColor),
          "rgba(0, 0, 0, 0)",
        );
        const box = await page
          .getByRole("button", { name: "Close navigation" })
          .boundingBox();
        assert(box.width >= 44 && box.height >= 44);
        await page.screenshot({
          path: out + "/" + width + "-" + theme + "-menu.png",
        });
        await page.keyboard.press("Escape");
        assert.equal(
          await button.evaluate((e) => e === document.activeElement),
          true,
        );
        await button.click();
        await page
          .locator("#mobile-navigation")
          .getByRole("link", { name: "Experience", exact: true })
          .click();
        await page.waitForURL("**/#experiences");
        assert.equal(await page.locator("#mobile-navigation").count(), 0);
        assert.equal(
          await page
            .locator("#experiences")
            .evaluate((e) => e === document.activeElement),
          true,
        );
        await button.click();
        await page.screenshot({
          path: out + "/" + width + "-" + theme + "-menu-scrolled.png",
        });
        await page.keyboard.press("Escape");
      } else {
        await page
          .getByRole("link", { name: "Experience", exact: true })
          .click();
        await page.waitForURL("**/#experiences");
      }
      await page.waitForFunction(() =>
        document.querySelector(
          'a[href="#experiences"][aria-current="location"]',
        ),
      );
      await page.goto(base + "/#achievements");
      await page.waitForFunction(
        () =>
          document.getElementById("achievements").getBoundingClientRect().top <
          180,
      );
      await page.locator("#gear summary").click();
      assert.equal(await page.locator(".gear-grid article").count(), 2);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      const pdf = await page.request.get(
        base + "/Tran_Viet_Anh_CV___Fullstack_Software_Engineer.pdf",
      );
      assert.equal(pdf.status(), 200);
      assert(pdf.headers()["content-type"].includes("application/pdf"));
      assert.equal(
        createHash("sha256")
          .update(await pdf.body())
          .digest("hex"),
        createHash("sha256")
          .update(
            await readFile(
              "public/Tran_Viet_Anh_CV___Fullstack_Software_Engineer.pdf",
            ),
          )
          .digest("hex"),
      );
      assert.equal(errors.length, 0);
      results.push({ width, theme, errors, passed: true });
      await context.close();
    }
  const historyPage = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await historyPage.goto(base);
  await historyPage.getByRole("link", { name: "Experience", exact: true }).click();
  await historyPage.waitForURL("**/#experiences");
  await historyPage.getByRole("link", { name: "Achievements", exact: true }).click();
  await historyPage.waitForURL("**/#achievements");
  await historyPage.goBack();
  await historyPage.waitForURL("**/#experiences");
  await historyPage.waitForFunction(() => document.getElementById("experiences").getBoundingClientRect().top < 180);
  assert.equal(await historyPage.evaluate(() => document.getAnimations().length), 0);
  await historyPage.close();
  const page = await browser.newPage({ viewport: { width: 390, height: 740 } });
  await page.goto(base);
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent),
    "Skip to content",
  );
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement.id), "main");
  await page.getByRole("button", { name: /Theme:/ }).click();
  await page.getByRole("menuitemradio", { name: "System" }).click();
  await page.emulateMedia({ colorScheme: "light" });
  await page.waitForFunction(() =>
    document.documentElement.classList.contains("light"),
  );
  await page.emulateMedia({ colorScheme: "dark" });
  await page.waitForFunction(() =>
    document.documentElement.classList.contains("dark"),
  );
  await page.reload();
  assert.equal(
    await page.evaluate(() => localStorage.getItem("vietanh-portfolio-theme")),
    "system",
  );
  await page.getByRole("button", { name: "Theme: system" }).click();
  assert.equal(
    await page
      .getByRole("menuitemradio", { name: "System" })
      .getAttribute("aria-checked"),
    "true",
  );
  await page.getByRole("menuitemradio", { name: "Light · soft" }).click();
  await page.reload();
  assert(
    await page.locator("html").evaluate((e) => e.classList.contains("light")),
  );
  await page.goto(base + "/not-a-page");
  assert(await page.getByText("Page not found", { exact: true }).isVisible());
  await page.getByRole("link", { name: "Return to Home" }).click();
  assert.equal(new URL(page.url()).pathname, "/");
  await writeFile(
    out + "/checks.json",
    JSON.stringify(
      {
        matrix: results,
        themePersistence: true,
        systemChanges: true,
        skipLink: true,
        notFoundRecovery: true,
      },
      null,
      2,
    ),
  );
  console.log(
    "PASS: viewport/theme matrix, navigation, focus, hash, reduced motion, fonts, CV, theme persistence/System, skip link, 404.",
  );
} finally {
  await browser.close();
}
