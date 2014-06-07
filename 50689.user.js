// ==UserScript==
// @name           JTV Download Link
// @namespace      http://userscripts.org/users/93198
// @description    JTV Download Link
// @include        http://www.justin.tv/clip/*
// ==/UserScript==

var getDownloaded = document.getElementById('downloaded');
var daURL = getDownloaded.getAttribute("href");

var obj = document.getElementById("channel_info");
obj.innerHTML += "</p><p><br><a href=\"" + daURL + "\"> Download Video</a></p>";