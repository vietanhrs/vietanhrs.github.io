import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',headless:true});
const out=process.env.EVIDENCE_DIR || '../../portfolio-terminal/screenshots';
const url=process.env.BASE_URL || 'http://127.0.0.1:4175';
const results=[];
try {
for(const theme of ['dark','light']) {
 const page=await browser.newPage({viewport:{width:1200,height:607},reducedMotion:'reduce'});
 await page.addInitScript(t=>localStorage.setItem('vietanh-portfolio-theme',t),theme);
 await page.goto(url);await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:out+'/1200x607-'+theme+'-fold.png'});
 await page.locator('#command').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/1200x607-'+theme+'-prompt.png'});
 const links=await page.locator('a[href^="#"]').evaluateAll(es=>es.map(e=>e.getAttribute('href').slice(1)));
 for(const id of links)assert.equal(await page.locator('[id="'+id+'"]').count(),1);
 await page.setViewportSize({width:720,height:450});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 results.push({theme,shortViewport:true,allAnchorTargets:links.length,reflowEquivalent200Percent:true});await page.close();
}
const page=await browser.newPage();
await page.addInitScript(()=>{for(const key of ['localStorage','sessionStorage'])Object.defineProperty(window,key,{get(){throw new DOMException('Disabled','SecurityError')}})});
const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(url);await page.getByLabel('theme',{exact:true}).selectOption('light');assert(await page.locator('html').evaluate(e=>e.classList.contains('light')));assert.deepEqual(errors,[]);
// Serve the actual built 404 document at an unknown route, matching Pages behavior.
const fallback = await (await page.request.get(url+'/404.html')).text();
for (const blocked of [false,true]) {
 const p=await browser.newPage();const failures=[];p.on('pageerror',e=>failures.push(e.message));
 if(blocked)await p.addInitScript(()=>{for(const key of ['localStorage','sessionStorage'])Object.defineProperty(window,key,{get(){throw new DOMException('Disabled','SecurityError')}})});
 await p.route('**/storage-fallback-test?test=1',r=>r.fulfill({status:404,contentType:'text/html',body:fallback}));
 await p.goto(url+'/storage-fallback-test?test=1');
 if(blocked){await p.waitForURL(url+'/');assert(await p.locator('h1').isVisible());}
 else{await p.getByText('404 — path not found').waitFor();assert.equal(new URL(p.url()).pathname,'/storage-fallback-test');await p.getByRole('link',{name:'Return to portfolio →'}).click();}
 await p.goto(url+'/404.html');await p.waitForURL(url+'/');assert(await p.locator('h1').isVisible());assert.deepEqual(failures,[]);await p.close();
}
for(const bad of ['http://[invalid','https://example.com/unsafe','/404.html']) {
 const p=await browser.newPage();await p.addInitScript(v=>sessionStorage.setItem('spa-redirect',v),bad);await p.goto(url);assert.equal(new URL(p.url()).pathname,'/');assert(await p.locator('h1').isVisible());await p.close();
}
await writeFile(out+'/extra-checks.json',JSON.stringify({results,blockedStorage:true,actualStatic404:true,malformedAndExternalRecovery:true},null,2));console.log('PASS short viewport, every anchor target, reflow and blocked storage.');
}finally{await browser.close();}
