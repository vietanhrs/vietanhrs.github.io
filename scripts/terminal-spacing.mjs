import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const url=process.env.BASE_URL || 'http://127.0.0.1:4175';
const out=process.env.EVIDENCE_DIR || '../../portfolio-terminal/spacing/local';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',headless:true});
const results=[];
try {
for(const theme of ['dark','light']) for(const [width,height] of [[1200,607],[1440,900],[768,900],[390,900],[320,900]]) {
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
 await page.addInitScript(t=>localStorage.setItem('vietanh-portfolio-theme',t),theme);
 await page.goto(url);await page.evaluate(()=>document.fonts.ready);
 const metrics=await page.evaluate(()=>{
  const selectors=['body','.profile h1','.fetch-fields dd','.fetch-fields>div','.rust-logo','.intro','.output','.output h2','.annotation','.role','.role-title','.highlights','.highlights li','.skill-line','.award-register','.skill-tree li','.subheading','.gear-grid h4','.gear-grid dl>div','.inventory li','.contact-list>div','.help-list>div','.command-index a','.role-index a','.command-form input','.command-form button','.chrome-control'];
  return {overflow:document.documentElement.scrollWidth>innerWidth,height:document.documentElement.scrollHeight,items:Object.fromEntries(selectors.map(s=>{const e=document.querySelector(s),c=getComputedStyle(e);return [s,{font:c.fontFamily,size:c.fontSize,weight:c.fontWeight,line:c.lineHeight,ratio:parseFloat(c.lineHeight)/parseFloat(c.fontSize),marginTop:c.marginTop,marginBottom:c.marginBottom,paddingTop:c.paddingTop,paddingBottom:c.paddingBottom,rowGap:c.rowGap,height:e.getBoundingClientRect().height}]})),ascii:document.querySelector('.rust-logo').textContent,name:document.querySelector('h1').textContent,fonts:[...document.fonts].map(f=>({family:f.family,status:f.status}))};
 });
 assert(!metrics.overflow);assert.equal(metrics.name,'Trần Việt Anh@portfolio');
 if(process.env.EXPECT_TIGHT)for(const s of ['body','.profile h1','.fetch-fields dd','.intro','.highlights li','.gear-grid dl>div'])assert.equal(metrics.items[s].ratio,1.25,s);
 const prefix=out+'/'+width+'x'+height+'-'+theme;
 await page.screenshot({path:prefix+'-fold.png'});
 for(const id of ['fastfetch','teko','gear','help']){await page.locator('#'+id).evaluate(e=>e.scrollIntoView());await page.screenshot({path:prefix+'-'+id+'.png'});}
 results.push({width,height,theme,metrics});await page.close();
}
await writeFile(out+'/spacing.json',JSON.stringify(results,null,2));console.log('PASS spacing matrix, 10 viewport/theme cases.');
}finally{await browser.close();}
