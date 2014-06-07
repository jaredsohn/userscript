// ==UserScript==
// @name           mods.de keybb v2a
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @include        http://forum.mods.de/bb/*
// ==/UserScript==

var keys = {
	"b": "b",
	"k": "i",
	"m": "m",
	"p": "php",
	"c": "code",
	"q": "quote",
	"i" : "img",
	"u": "url=|url"
}, _keys = [], ta = document.evaluate("//textarea[@name='message']", document, null, 8, null).singleNodeValue;
for (var i in keys) _keys.push(i);
function add(e) {
	var value = ta.value, s = ta.selectionStart, end = ta.selectionEnd, d = !!~e.indexOf("|");
	// nix selektiert
	if (ta.selectionStart == ta.selectionEnd) {
		ta.value = ta.value.slice(0,s) + "["+(d ? e.split("|")[0]+"]"+"[/"+e.split("|")[1] : e + "][/"+e) + "]" + ta.value.slice(s);
		ta.selectionStart = ta.selectionEnd = ta.value.slice(0,s).length + (d ? "["+e.split("|")[0] : "["+e+"]").length;
	}/*
	// text selectiert
	else {
		ta.value = ta.value.slice(0,s) + "["+(d?e.split("|")[0]+"]":e)+"]"+ta.value.slice(s,end)+"[/"+(d?e.split("|")[1]:e)+"]";
		ta.selectionStart = ta.value.slice(0,s)+("["+(d?e.split("|")[0]+"]":e)+"]").length;
		ta.selectionEnd = ta.value.slice(0,s)+(("["+d?e.split("|")[0]+"]":e)+"["+(d?e.split("|")[1]:e)+"]").length;
	}*/
}
window.addEventListener("keydown", function(e) {
	if (typeof ta.selectionStart != "undefined") {
		if (e.altKey && e.ctrlKey && !!~_keys.indexOf(String.fromCharCode(e.keyCode).toLowerCase())) {
			add(keys[String.fromCharCode(e.keyCode).toLowerCase()]);
			e.preventDefault();
			e.stopPropagation();
		}
	}
}, false);