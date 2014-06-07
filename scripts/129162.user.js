// ==UserScript==
// @name           replace ora
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://*
// ==/UserScript==

try { if(top !== self) throw 0 }catch(e){ return }
document.body.innerHTML = document.body.innerHTML.replace(/おら/g,'わだす');