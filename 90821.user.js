// ==UserScript==
// @name           Google Image Relinker
// @description    Changes the way Google Images directs links
// @version        1.8
// @include        http://*
// ==/UserScript==

for (var i = 1; i < document.images.length; i++) document.images[i].parentNode.href = "http://" + unescape(document.images[i].src.split("http://")[2]);
