import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const out=process.env.EVIDENCE_DIR || '../../portfolio-terminal/screenshots';
const url=process.env.BASE_URL || 'http://127.0.0.1:4175';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',headless:true});
const results=[]; const errors=[];
const old=execFileSync('git',['show','676439c:src/components/ExperienceSection.tsx'],{encoding:'utf8'});
const highlights=[...old.matchAll(/highlights:\s*\[([\s\S]*?)\],/g)].flatMap(m=>[...m[1].matchAll(/"([^"]+)"/g)].map(x=>x[1]));
assert.equal(highlights.length,15);
// Every original factual string and URL remains in the single data module.
const data = await readFile('src/lib/portfolio.ts','utf8');
for (const [file,end] of [['ExperienceSection','const roleIds'],['AchievementsSection','export function'],['GearSection','export function'],['LinksSection','export function']]) {
 const source=execFileSync('git',['show','676439c:src/components/'+file+'.tsx'],{encoding:'utf8'}).split(end)[0];
 for(const match of source.matchAll(/"([^"\n]+)"/g)) assert(data.includes(JSON.stringify(match[1])),file+': '+match[1]);
}
try {
for(const theme of ['dark','light']) for(const width of [1440,1200,768,390,320]) {
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce',hasTouch:width<800});
 page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(t=>localStorage.setItem('vietanh-portfolio-theme',t),theme);
 await page.goto(url); await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('.role').count(),8); assert.equal(await page.locator('.award-register>li').count(),9);
 assert.equal(await page.locator('.gear-grid article').count(),2); assert.equal(await page.locator('.inventory li').count(),9);
 assert.equal(await page.locator('details,summary,canvas').count(),0);
 for(const h of highlights) assert(await page.getByText(h,{exact:true}).isVisible(),h);
 assert.equal(await page.locator('#teko .highlights li').count(),5);
 const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,font:document.fonts.check('500 15px "Source Code Pro"'),bg:getComputedStyle(document.querySelector('main')).backgroundColor,weights:[...new Set([...document.querySelectorAll('main *')].map(e=>getComputedStyle(e).fontWeight))],fontRequests:performance.getEntriesByType('resource').filter(e=>e.name.includes('.woff2')).map(e=>e.name),motion:getComputedStyle(document.documentElement).scrollBehavior}));
 assert(!metrics.overflow);assert(metrics.font);assert.deepEqual(metrics.weights,['500']);assert.equal(metrics.motion,'auto');assert.equal(metrics.bg,theme==='dark'?'rgb(29, 32, 33)':'rgb(242, 229, 188)');
 assert(metrics.fontRequests.length===2);
 await page.screenshot({path:out+'/'+width+'-'+theme+'-fold.png'});
 for(const id of ['experiences','teko','achievements','skills','gear','links','help']) {await page.locator('#'+id).evaluate(e=>e.scrollIntoView()); await page.screenshot({path:out+'/'+width+'-'+theme+'-'+id+'.png'});}
 const contrast=await page.evaluate(()=>{
 const lum=s=>s.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
 const pairs=new Map();for(const e of document.querySelectorAll('p,h1,h2,h3,h4,a,dt,dd,button,label,input,select,span,li')) {if(!e.getClientRects().length||e.getAttribute('aria-hidden')==='true')continue; const c=getComputedStyle(e);let p=e,bg=c.backgroundColor;while(bg==='rgba(0, 0, 0, 0)'&&p.parentElement){p=p.parentElement;bg=getComputedStyle(p).backgroundColor;}if(bg==='rgba(0, 0, 0, 0)')continue;const a=lum(c.color),b=lum(bg);pairs.set(c.color+bg,{text:e.textContent.slice(0,40),ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),fg:c.color,bg});} return [...pairs.values()];});
 assert(contrast.every(x=>x.ratio>=4.5),JSON.stringify(contrast.filter(x=>x.ratio<4.5)));
 for(const [command,id] of [['fastfetch','fastfetch'],['experience','experiences'],['achievements','achievements'],['skills','skills'],['tree','skills'],['gear','gear'],['contact','links'],['cv','cv'],['help','help'],['theme','theme']]) {await page.locator('#command').fill(command);await page.locator('#command').press('Enter');await page.waitForURL(u=>u.hash==='#'+id);await page.waitForFunction(id=>document.activeElement.id===id,id);assert.equal(new URL(page.url()).hash,'#'+id);assert.equal(await page.evaluate(()=>document.activeElement.id),id);}
 for(const value of ['__proto__','constructor','<img src=x onerror=alert(1)>','fetch("https://example.com")','experience; alert(1)']) {await page.locator('#command').fill(value);await page.locator('#command').press('Enter');assert.match(await page.getByRole('status').innerText(),/Unknown command/);}
 await page.locator('#command').fill('test');await page.locator('#command').press('Escape');assert.equal(await page.locator('#command').inputValue(),'');
 await page.locator('#command').fill('  THEME   LIGHT ');await page.locator('#command').press('Enter');assert(await page.locator('html').evaluate(e=>e.classList.contains('light')));
 await page.getByLabel('theme',{exact:true}).selectOption(theme);
 await page.getByRole('button',{name:'Expand window width'}).click();assert(await page.locator('main').evaluate(e=>e.classList.contains('wide')));await page.getByRole('button',{name:'Restore window width'}).click();
 if(width<800){await page.locator('.command-index a[href="#gear"]').tap();assert.equal(new URL(page.url()).hash,'#gear');}
 for(const id of ['teko','robotics','links']) {await page.goto(url+'/#'+id);await page.waitForFunction(id=>document.activeElement.id===id,id);assert((await page.locator('#'+id).boundingBox()).y>=0);}
 await page.goto(url+'/#%E0%A4%A');assert(await page.locator('h1').isVisible());
 results.push({width,theme,metrics,contrast,highlights:highlights.length,checks:'counts,content,font,contrast,overflow,commands,injection,Escape,theme,width-control,touch,deep-links'});await page.close();
}
const p=await browser.newPage({colorScheme:'light',reducedMotion:'reduce'});await p.goto(url);await p.getByLabel('theme',{exact:true}).selectOption('system');await p.reload();assert(await p.locator('html').evaluate(e=>e.classList.contains('light')));await p.emulateMedia({colorScheme:'dark'});await p.waitForFunction(()=>document.documentElement.classList.contains('dark'));await p.reload();assert.equal(await p.getByLabel('theme',{exact:true}).inputValue(),'system');
await p.goto(url);await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Skip to portfolio');await p.keyboard.press('Enter');assert.equal(await p.evaluate(()=>document.activeElement.id),'main');
await p.locator('.command-index a[href="#gear"]').click();await p.locator('.command-index a[href="#links"]').click();await p.goBack();assert.equal(new URL(p.url()).hash,'#gear');
const response=await p.request.get(url+'/Tran_Viet_Anh_CV___Fullstack_Software_Engineer.pdf');assert.equal(response.status(),200);assert.match(response.headers()['content-type'],/application\/pdf/);const hash=createHash('sha256').update(await response.body()).digest('hex');assert.equal(hash,'b066a3e254f2e5d163cf60b71070193cfdf500fceda52b1a295a99a06a779ed6');
await p.goto(url+'/missing-page');assert(await p.getByText('404 — path not found').isVisible());await p.getByRole('link',{name:'Return to portfolio →'}).click();assert(await p.locator('h1').isVisible());
assert.equal(errors.length,0);await writeFile(out+'/checks.json',JSON.stringify({results,errors,cv:hash,systemPersistence:true,keyboardSkip:true,backNavigation:true},null,2));console.log('PASS 10 viewport/theme combinations, full content, interactions, fonts, contrast, exact CV.');
} finally {await browser.close();}
