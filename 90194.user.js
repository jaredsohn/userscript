// ==UserScript==
// ROBOT UNICORN ATTACK HACK
// Greasemonkey script version of robotunicornattack.slicknfresh.com's hack
// compiled with very little work by pca.
// ==UserScript==
// @name           Robot Unicorn Attack Hack
// @namespace      http://twitter.com/sunlandictwin
// @description    Greasemonkey script version of robotunicornattack.slicknfresh.com's hack
// @include        http://apps.facebook.com/robotunicorn/*
// ==/UserScript==

function rez() {
   alert('Estou dentro da função!');
   document.getElementById('UIStandardFrame_SidebarAds').setAttribute("style", "visibility:hidden");
   document.getElementById('pageFooter').setAttribute("style", "visibility:hidden");
   document.getElementById('pageHead').setAttribute("style", "visibility:hidden");
   document.getElementById('header_ad').setAttribute("style", "visibility:hidden");
   document.getElementById('game-of-the-week').setAttribute("style", "visibility:hidden");
}

window.onload = rez;