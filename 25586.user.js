// ==UserScript==
// @name          Fix plural mistakes
// @namespace     http://jacobd.com
// @description	  Replace strings like "1 comment" with "1 comment"
// @include       http://*
// ==/UserScript==

RE = [];
RE.push([new RegExp(/\b1 entries\b/gi), "1 entry"]);
RE.push([new RegExp(/\b1 ([a-z]+)s\b/gi),"1 $1"]);

for(i=0;i<RE.length;i++)
document.body.innerHTML = document.body.innerHTML.replace(RE[i][0],RE[i][1]);