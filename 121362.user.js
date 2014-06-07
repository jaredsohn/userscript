// ==UserScript==
// @name           Inserts some text page
// @namespace      http://www.youtube.com/
// @description    insert some text maybe
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// ==/UserScript==

document.getElementById("watch-discussion").innerHTML="<iframe src='http://ytoverride.comoj.com/test2.html' width='640' height='400' frameborder='0'></iframe>";