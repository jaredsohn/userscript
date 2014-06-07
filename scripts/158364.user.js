// ==UserScript==
// @name        Skimm.tv tv-kaista etusivulla
// @namespace   maeki.org
// @description Lisää etusivulle suora linkki TV-kaistaan
// @include     http://www.skimm.tv/*
// @grant       none
// @version     1
// ==/UserScript==

var navdiv = document.getElementById('view_nav');
var ntv = navdiv.childNodes[4];
var tvk = $(ntv).clone();
tvk[0].href='/tvkaista';
tvk[0].textContent='tv-kaista';
$(tvk).appendTo(navdiv);