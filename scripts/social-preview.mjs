import { chromium } from 'playwright-core';
const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || '/usr/bin/google-chrome-stable',headless:true});
try {
 const page = await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
 await page.addInitScript(()=>localStorage.setItem('vietanh-portfolio-theme','dark'));
 await page.goto(process.env.BASE_URL || 'http://127.0.0.1:4175');
 await page.evaluate(()=>document.fonts.ready);
 await page.addStyleTag({content:'.terminal-window{margin:24px auto}.terminal-body{padding-top:20px}.command-index,.command-form,.input-note,.command-status,.output,footer{display:none}.terminal-window{padding-bottom:18px}'});
 await page.screenshot({path:'public/social-preview.png'});
} finally { await browser.close(); }
