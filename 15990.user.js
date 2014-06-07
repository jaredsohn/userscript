// ==UserScript==
// @name           Secure Allegro
// @description    Switch to secure connection on Allegro.pl
// @namespace      my userscript
// @include        http://www.allegro.pl/*
// ==/UserScript==

window.location.href = window.location.href.replace(/^http:\/\/www/, 'https://ssl');
