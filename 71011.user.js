// ==UserScript==
// @name           Red Annoying Bar Remover Script
// @namespace      Ahsaan Khatree
// @description    it removes red annoying donation bar from every page
// @include        http://www.bwtorrents.com/*
// ==/UserScript==

if (document.getElementById('topbar')) {
document.getElementById('topbar').style.display="none";
}