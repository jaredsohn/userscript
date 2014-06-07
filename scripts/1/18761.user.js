// ==UserScript==
// @name           Subba iWiW linkfix
// @namespace      http://persistent.info/greasemonkey
// @description    v0.1 - this scripts fixes the iwiw links on subba.blog.hu
// @include        http://subba.blog.hu/*
// ==/UserScript==
var anchors = document.getElementsByTagName("a");
for(var i = 0; i < anchors.length; i++) {
	var a = anchors[i];
	a.href = String(a.href).replace(/^http:\/\/[^/]*?wiw.hu\//, "http://iwiw.hu/");
}
// vim: ts=4 sw=4
