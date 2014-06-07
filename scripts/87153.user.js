// ==UserScript==
// @name           RedirectYoutube
// @namespace      RedirectYoutube
// @include        http://www.youtube.com/*
// ==/UserScript==

window.location.href = window.location.href.replace(/\.com/, '.com.');
