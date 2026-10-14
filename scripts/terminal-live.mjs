import { chromium } from 'playwright-core';
import { readFile,writeFile,readdir } from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const url=process.env.BASE_URL || 'https://vietanhrs.github.io';
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',headless:true});
const checks=[];
try{const page=await browser.newPage();
for(const path of ['index.html','404.html','social-preview.png','fonts/source-code-pro-latin.woff2','fonts/source-code-pro-vietnamese.woff2',...(await readdir('dist/assets')).map(x=>'assets/'+x)]){
const response=await page.request.get(url+'/'+path);assert.equal(response.status(),200,path);const actual=createHash('sha256').update(await response.body()).digest('hex');const expected=createHash('sha256').update(await readFile('dist/'+path)).digest('hex');assert.equal(actual,expected,path);checks.push({path,status:200,sha256:actual});}
for(const blocked of [false,true]){const p=await browser.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));if(blocked)await p.addInitScript(()=>{for(const key of ['localStorage','sessionStorage'])Object.defineProperty(window,key,{get(){throw new DOMException('Disabled','SecurityError')}})});await p.goto(url+'/terminal-live-missing-route');if(blocked){await p.waitForURL(url+'/');await p.locator('h1').waitFor();}else{await p.getByText('404 — path not found').waitFor();await p.getByRole('link',{name:'Return to portfolio →'}).click();}assert.deepEqual(errors,[]);await p.close();}
await page.goto(url);assert.match(await page.locator('.rust-logo').innerText(),/##########/);assert.equal(await page.locator('.role').count(),8);assert.equal(await page.locator('.award-register>li').count(),9);
await writeFile('../../portfolio-terminal/deployment/live/assets.json',JSON.stringify({checks,actualPages404:true,deniedStoragePages404:true,rustAscii:true},null,2));console.log('PASS live exact built assets, Rust ASCII, actual Pages missing-route recovery with and without storage.');}finally{await browser.close();}
