// ==UserScript==
// @name           Disable timers
// @namespace      vt.pt
// @version        1.0
// @description    Disable timers
// @include        http://1.1.1.*/*
// @include        https://1.1.1.*/*
// ==/UserScript==

var clearAllTimeoutsTimer=1000;
var clearAllTimersTimeout=0;
function clearAllTimers() {
	var max = setTimeout("||void", 1000);
	for(var i=clearAllTimersTimeout;i<=max;i++)
		try { clearTimeout(i); } catch(err) { }

	if(clearAllTimersTimeout+1!=max) clearAllTimeoutsTimer=1000;
	else if(clearAllTimeoutsTimer<60000) clearAllTimeoutsTimer*=2;

	clearAllTimersTimeout=setTimeout(clearAllTimers, clearAllTimeoutsTimer);
}

clearAllTimers();
