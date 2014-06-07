// ==UserScript==
// @name           check images without alt
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        *
// ==/UserScript==

Array.forEach(document.getElementsByTagName('img'), function(e) {
  if(!e.alt) {
    e.style.border = '10px solid #f00';
  }
});
