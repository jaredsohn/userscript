// ==UserScript==
// @name           easy_reader
// @namespace      google
// @include        http://www.google.com.tld/reader/*
// ==/UserScript==
window.addEventListener("keydown",function (event){if(event.keyCode=="39") GM_openInTab(document.getElementById("current-entry").getElementsByTagName("A")[0].href)},false)