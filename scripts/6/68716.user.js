// ==UserScript==
// @name Clear hotline.ua title
// @include        http://hotline.ua/*
// ==/UserScript==

document.title = document.title.replace(/^Hotline.ua. /, "");