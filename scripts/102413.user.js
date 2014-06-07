// ==UserScript==
// @name           4chan No Music
// @version        1.0
// @include        http://*.4chan.org/*
// ==/UserScript==

var embedArray = document.getElementsByTagName("embed");
for (var i=0; i<embedArray.length; i++) {
 embedArray[i].style.display = "none";
}