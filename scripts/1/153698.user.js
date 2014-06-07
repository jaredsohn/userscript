// ==UserScript==
// @name       YouTube Hide recommended videos
// @namespace  http://www.agixo.de/
// @version    1.1
// @description  Hides the recommended videos on your stream (new design)
// @include      *://youtube.com/*
// @include      *://*.youtube.com/*
// @copyright  2012, Daniel Lehr <daniel@agixo.de>
// ==/UserScript==
!(function() {
  window.setTimeout(function check() {
    if (document.getElementsByClassName('feed-author-bubble')) {
      main();
    }
    window.setTimeout(check, 250);
  }, 250);

  function main() {
    var a = document.getElementsByClassName('feed-author-bubble');
    for(var i = 0, len = a.length; i < len; i++) {
      if (/\/feed\/recommended$/.test(a[i].href)) {
        a[i].parentNode.parentNode.style.display = 'none';
      }
    }
  }
})();