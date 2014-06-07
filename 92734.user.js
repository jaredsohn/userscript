// ==UserScript==
// @name           ValetudoTopBannerRemover
// @namespace      http://mmer.org/
// @include        http://*.valetudo.ru/
// @include        http://*.valetudo.ru/mma*
// ==/UserScript==

var el = document.getElementById('top-banner');
var r = document.getElementById('ja-col2');
var h = document.getElementById('ja-topnav');
el.parentNode.removeChild(el);
r.parentNode.removeChild(r);
h.parentNode.removeChild(h);

