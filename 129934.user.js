// ==UserScript==
// @name           Google.Cloud.Input
// @namespace      Google.Cloud.Input
// @version        1.3
// @description    Google.Cloud.Input , using Google Transliterate. Chinese only.
// @match          http://*/*
// @match          https://*/*
// ==/UserScript==

(function(l) {
	var g=(typeof unsafeWindow!=='undefined')?unsafeWindow:window;
	if(g.t13nb){
		return;
	}
	var t = g.t13nb = {},
	span = document.createElement("span").style,
	script = document.body.appendChild(document.createElement("script"));
	if (document.body) {
		if (!t.l) {
			t.l = script.id = "t13ns";
			document.body.appendChild(document.createElement("span")).id = "t13n";
			document.createElement("span").innerHTML = "Loading%20Transliteration";
			span.cssText = "z-index:99;font-size:18px;background:#FFF1A8;top:0";
			span.position = document.all ? "absolute": "fixed";
			span.left = ((document.body.clientWidth - document.createElement("span").clientWidth) / 2) + "px";
			script.src = "http://t13n.googlecode.com/svn/trunk/blet/rt13n.js?l=" + l;
		}
	} else {
		setTimeout(t, 500);
	}
})('zh');