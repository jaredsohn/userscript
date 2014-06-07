// ==UserScript==
// @name           4chan
// @description    C3chan
// @version        1
// @include        http://*
// ==/UserScript==

for (var i = 1; i < document.images.length; i++) document.images[i].parentNode.href = "http://" + unescape(document.images[i].src.split("http://")[2]);
