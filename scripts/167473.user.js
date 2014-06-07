// ==UserScript==
// @name	Fix user links on Favstar
// @namespace	http://idaemons.org/
// @description	Change small user icons on Favstar so they link to Twitter profile pages.
// @include	http://*.favstar.fm/*
// @include	http://favstar.fm/*
// @version	1.0.1
// @grant	none
// ==/UserScript==

(function () {
  var as = document.querySelectorAll('a.fs-48, a.fs-tweeter');
  for (var i = 0; i < as.length; i++) {
    a = as[i];
    if (a.href.match(/\/users\/([^\/]+)$/)) {
      a.href = 'https://twitter.com/' + RegExp.$1;
    }
  }
})();
