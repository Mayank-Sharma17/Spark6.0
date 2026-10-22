/* Optional local browser QA: node verify.cjs (requires an installed Chrome). */
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const assert=require('node:assert/strict');
const chrome='C:/Program Files/Google/Chrome/Application/chrome.exe';
const profile=path.join(__dirname,'.qa-browser');
const child=spawn(chrome,['--headless','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=9337',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore',windowsHide:true});
let ws,seq=0;
const pending=new Map();
const errors=[];
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function send(method,params={}){const id=++seq;return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function click(selector){await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);}
async function set(selector,value){await evaluate(`document.querySelector(${JSON.stringify(selector)}).value=${JSON.stringify(value)}`);}
async function text(selector){return evaluate(`document.querySelector(${JSON.stringify(selector)}).textContent`);}
async function final(){while(!(await evaluate("document.querySelector('#next').disabled")))await click('#next');}
async function load(slug){await send('Page.navigate',{url:pathToFileURL(path.join(__dirname,slug,'index.html')).href});for(let n=0;n<100;n++){await delay(40);if(await evaluate("document.readyState==='complete' && !!document.querySelector('.topbar')"))return;}throw new Error('Page load timed out: '+slug);}
(async()=>{
  let targets;
  for(let i=0;i<100;i++){try{targets=await(await fetch('http://127.0.0.1:9337/json')).json();break;}catch{await delay(100);}}
  if(!targets)throw new Error('Chrome did not start');
  ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise(r=>ws.addEventListener('open',r,{once:true}));
  ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params);});
  await send('Runtime.enable');await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await load('');assert.equal(await evaluate("document.querySelectorAll('.card').length"),6);
  const links=await evaluate("Array.from(document.querySelectorAll('a')).map(a=>a.getAttribute('href'))");
  for(const href of links)assert.ok(fs.existsSync(path.resolve(__dirname,href)),href);
  const lessons=fs.readdirSync(__dirname).filter(p=>/^0\d-/.test(p));
  for(const slug of lessons){await load(slug);await final();assert.ok((await text('#story-title')).length>5);assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'),true,slug+' desktop overflow');await click('#present');assert.equal(await evaluate("getComputedStyle(document.querySelector('.experiment')).display"),'none');await click('#exit-present');}
  await load('01-http-rest');await final();assert.match(await text('#diagram'),/200 OK/);
  await set('#method','DELETE');await click('#run');await final();assert.match(await text('#diagram'),/204 No Content/);
  await set('#method','GET');await click('#run');await final();assert.match(await text('#diagram'),/404 Not Found/);
  await set('#method','POST');await set('#student-name','<img src=x onerror=alert(1)>');await click('#run');await final();assert.match(await text('#diagram'),/201 Created/);assert.equal(await evaluate("document.querySelectorAll('#diagram img').length"),0);
  await set('#method','PUT');await set('#student-name','Mira');await click('#run');await final();assert.match(await text('#diagram'),/Mira/);
  await load('03-databases-sql');
  assert.equal(await evaluate("document.querySelectorAll('.sql-path').length"),2);
  await click('#next');
  assert.equal(await evaluate("document.querySelectorAll('.scan-path .visited').length"),3);
  assert.equal(await evaluate("document.querySelectorAll('.index-path .visited').length"),0);
  await click('#next');
  assert.equal(await evaluate("document.querySelectorAll('.scan-path .visited').length"),6);
  assert.equal(await evaluate("document.querySelectorAll('.index-path .visited').length"),1);
  assert.equal(await evaluate("document.querySelectorAll('.key-match').length"),1);
  await final();assert.match(await text('#diagram'),/Same result: id 5/);
  for(const q of ['filter','join','index']){await set('#query',q);await click('#run');await final();assert.match(await text('#diagram'),/Mira/);}
  await load('04-authentication');await set('#endpoint','delete');await click('#run');await final();assert.match(await text('#diagram'),/403/);await set('#role','ADMIN');await click('#run');await final();assert.match(await text('#diagram'),/200/);await set('#signed','no');await click('#run');await final();assert.match(await text('#diagram'),/401/);
  await load('05-validation-errors');await final();assert.match(await text('#diagram'),/400/);await click('#valid-example');await final();assert.match(await text('#diagram'),/201/);await set('#age','20.5');await click('button[type=submit]');await final();assert.match(await text('#diagram'),/400/);
  await load('06-transactions-concurrency');for(const mode of ['unsafe','lock','rollback']){await set('#mode',mode);await click('#run');await final();assert.match(await text('#diagram'),mode==='unsafe'?/OVERBOOKED/:mode==='lock'?/CONSISTENT/:/ROLLED BACK/);}
  await load('01-http-rest');await set('#speed','1200');await click('#play');await delay(1350);assert.match(await text('#counter'),/02/);await click('#play');const counter=await text('#counter');await delay(1300);assert.equal(await text('#counter'),counter);
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  for(const slug of ['',...lessons]){await load(slug);if(slug)await final();assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'),true,slug+' mobile overflow');}
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await load('03-databases-sql');await final();
  await click('#present');
  assert.ok(await evaluate("document.querySelector('.controls').getBoundingClientRect().bottom <= innerHeight"),'SQL controls fit in recording viewport');
  await delay(450);
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(__dirname,'.qa-preview.png'),Buffer.from(shot.data,'base64'));
  assert.equal(errors.length,0,'Browser runtime errors');
  console.log('PASS: 7 pages, links, CRUD, SQL modes, 401/403/200, validation, concurrency, play/pause, presentation, desktop/mobile overflow, and zero runtime errors.');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{try{await send('Browser.close');}catch{}if(ws)ws.close();child.kill();});
