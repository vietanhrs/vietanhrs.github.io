import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',headless:true});
const out='../../portfolio-terminal/screenshots';
const results=[];
try {
for(const theme of ['dark','light']) {
 const page=await browser.newPage({viewport:{width:1200,height:607},reducedMotion:'reduce'});
 await page.addInitScript(t=>localStorage.setItem('vietanh-portfolio-theme',t),theme);
 await page.goto('http://127.0.0.1:4175');await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:out+'/1200x607-'+theme+'-fold.png'});
 await page.locator('#command').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/1200x607-'+theme+'-prompt.png'});
 const links=await page.locator('a[href^="#"]').evaluateAll(es=>es.map(e=>e.getAttribute('href').slice(1)));
 for(const id of links)assert.equal(await page.locator('[id="'+id+'"]').count(),1);
 await page.setViewportSize({width:720,height:450});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 results.push({theme,shortViewport:true,allAnchorTargets:links.length,reflowEquivalent200Percent:true});await page.close();
}
const page=await browser.newPage();
await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Disabled','SecurityError')}})});
const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:4175');await page.getByLabel('theme',{exact:true}).selectOption('light');assert(await page.locator('html').evaluate(e=>e.classList.contains('light')));assert.deepEqual(errors,[]);
await writeFile(out+'/extra-checks.json',JSON.stringify({results,blockedStorage:true},null,2));console.log('PASS short viewport, every anchor target, reflow and blocked storage.');
}finally{await browser.close();}
