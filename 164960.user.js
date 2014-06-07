// ==UserScript==
// @name           Metal-Archives forum  disable onclick on topic td
// @namespace      http://userscripts.org/users/121410
// @description    Prevent the current tab loading when loading a topic in a new tab with ctrl+click (cmd + click on mac).
// @version        0.666
// @match      http://www.metal-archives.com/board/*
// ==/UserScript==
var errorTds = document.querySelectorAll("td.row1[onclick]");
for (var i in errorTds) {
	errorTds[i].onclick = "";
}