// ==UserScript==
// @name           Google Image Source Relinker
// @description    Directly links Google Image results to the actual target
// @author 	   shadowx360
// @version        1.0
// @include        http://*google.*/images*
// @include        http://*images.google.*
// ==/UserScript==

for (var i = 1; i < document.images.length; ++i) document.images[i].parentNode.href = "http://" + unescape(document.images[i].src.split("http://")[2]);