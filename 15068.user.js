// ==UserScript==
// @name           Replace Koriyama with Coolyama
// @namespace      http://shokai.org
// @description    replace all "koriyama" in webpage with "coolyama"
// @include        http://*
// author: Sho Hashimoto
// http://shokai.org
// ==/UserScript==

function replaceKoriyama(){
  var body = document.body.innerHTML;
  body = body.replace(/koriyama/gi, 'coolyama');
  document.body.innerHTML = body;
}
window.addEventListener('load', replaceKoriyama, true);
