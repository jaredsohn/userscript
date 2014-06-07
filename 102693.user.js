// ==UserScript==
// @name           Google Groups Redirect cut
// @namespace      http://wikiwiki.jp/hyagni/
// @include        http://groups.google.com/group/*
// @include        https://groups.google.com/group/*
// ==/UserScript==

(function(){
  var i = document.links.length,
      e, m;
  while(i--){
    e = document.links[i];
    if (e.href) {
    }
    m = e.href.match(/url\?sa=D&q=(.*)/);
    if (m) {
      console.log(e.href, m[1]);
      e.href = m[1];
    }
  }
})();
