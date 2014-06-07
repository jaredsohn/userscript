// ==UserScript==
// @name           mods.de keybb
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @description    ermoeglicht das einfuegen von BB-Code per tasten
// @include        http://forum.mods.de/bb/*
// ==/UserScript==

function add(a,b) {
	var ta = document.getElementsByTagName("textarea")[0], s = ta.selectionStart, e = ta.selectionEnd;
	if (!ta) return;
	ta.value = ta.value.substring(0, s) + "["+a+"]" + "[/"+(b?b:a)+"]" + ta.value.substring(s, e);
	ta.selectionStart = ta.selectionEnd = (ta.value.substring(0,s)+"["+(b?b:a)+"]").length;
}
document.addEventListener("keydown", function(e) {
	if (document.getElementsByTagName("textarea")[0].selectionStart != "undefined") {
		if (e.ctrlKey && e.altKey) {
			e.preventDefault();
			e.stopPropagation();
			switch(e.keyCode) {
				case 66: add("b"); return; // bold
				case 75: add("i"); return; // italic
				case 85: add("u"); return; // underline
				case 76: add("url=", "url"); return; // URL
				case 81: add("quote"); return; // quote
				case 73: add("img"); return; // image
				case 77: add("m"); return; // monospace
				case 80: add("php"); return; // PHP
			}
		}
	}
}, false);