import { chromium } from "playwright-core";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome-stable",
  headless: true,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto(process.env.BASE_URL || "http://127.0.0.1:4173");
  await page.setContent(
    "<style>@font-face{font-family:Source;src:url(http://127.0.0.1:4173/fonts/source-code-pro-latin.woff2)}@font-face{font-family:Source;src:url(http://127.0.0.1:4173/fonts/source-code-pro-vietnamese.woff2);unicode-range:U+1EA0-1EF9}*{box-sizing:border-box}body{margin:0;background:#1d2021;color:#ebdbb2;font-family:Source,monospace;padding:76px}p{color:#8ec07c;font-size:24px;margin:0 0 56px}h1{font-size:80px;letter-spacing:-4px;margin:0 0 28px;font-weight:700}h2{font-size:32px;font-weight:500;margin:0 0 20px}footer{font-size:22px;color:#bdae93;margin-top:72px;border-top:1px solid #665c54;padding-top:24px}</style><p>~/anh.tv</p><h1>Trần Việt Anh</h1><h2>Front-end engineer</h2><h2>System design. Product delivery.</h2><footer>vietanhrs.github.io</footer>",
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/social-preview.png" });
} finally {
  await browser.close();
}
