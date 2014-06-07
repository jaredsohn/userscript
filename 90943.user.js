// ==UserScript==
// @name           SoundCloud - Hide comments
// @namespace      http://userscripts.org/users/115800
// @description    Hides comments on tracks
// @icon           http://i.imgur.com/vXfx8.png
// @include        http://soundcloud.com/*
// ==/UserScript==

var elements = document.getElementsByClassName("player");
var n = elements.length;
for (var i = 0; i < n; i++) {
    var e = elements[i];
    e.setAttribute("class", e.getAttribute("class") + " no-comments");
}
