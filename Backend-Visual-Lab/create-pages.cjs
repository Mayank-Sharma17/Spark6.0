const fs = require('node:fs');
const path = require('node:path');
const lessons = [
  ['01-http-rest','HTTP & REST APIs'],
  ['02-architecture','Application architecture'],
  ['03-databases-sql','Databases & SQL'],
  ['04-authentication','Authentication & authorization'],
  ['05-validation-errors','Validation & error handling'],
  ['06-transactions-concurrency','Transactions & concurrency']
];
function html(title,topic,prefix){return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="Learn backend fundamentals through interactive Student API diagrams and step-by-step animations.">
  <meta name="theme-color" content="#0b111b">
  <title>${title.replaceAll('&','&amp;')} | Backend Visual Lab</title>
  <link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}assets/styles.css">
  <script src="${prefix}assets/sql-demo.js" defer></script>
  <script src="${prefix}assets/app.js" defer></script>
</head>
<body data-topic="${topic}">
  <div id="app"></div>
  <noscript><p class="noscript">Enable JavaScript to explore these interactive lessons.</p></noscript>
</body>
</html>
`;}
fs.writeFileSync(path.join(__dirname,'index.html'),html('Big backend ideas. Made visible.','home','./'));
lessons.forEach(([slug,title],i)=>{fs.mkdirSync(path.join(__dirname,slug),{recursive:true});fs.writeFileSync(path.join(__dirname,slug,'index.html'),html(title,i,'../'));});
console.log('Created the home page and six lesson pages.');
