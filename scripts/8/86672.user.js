// ==UserScript==
// @name		RaGEZONE Utilities
// @version		0.0.1
// @author		NightExcessive
// @description		Makes browsing RaGEZONE more enjoyable
// @include		http://forum.ragezone.com/*
// @require		http://userscripts.org/scripts/source/85398.user.js
// ==/UserScript==

var startedTimer = false;

var killTimer = function() {
	if(typeof unsafeWindow.cyb_ms == "number" && unsafeWindow.cyb_ms > 0) {
		unsafeWindow.cyb_ms = 0;
	}
	if(typeof unsafeWindow.cyb_s == "number" && unsafeWindow.cyb_s > 0) {
		unsafeWindow.cyb_s = 0;
	}
	if(typeof unsafeWindow.cyb_s != "number" || typeof unsafeWindow.cyb_ms != "number" || unsafeWindow.cyb_ms > 0 || unsafeWindow.cyb_s > 0) {
		setTimeout(killTimer, 300);
	}
	startedTimer = true;
}

var gotGlobal = function(n, v) {
	if(!startedTimer) {
		killTimer();
	}
}
read_content_global('cyb_s', gotGlobal);
read_content_global('cyb_ms', gotGlobal);

GM_addStyle("div.tborder {display: none !important;}");
$("div.tborder").remove();