// ==UserScript==
// @name           Incit Alarm
// @namespace      quangntenemy
// @include        http://forumwarz.com/incit
// @include        http://*.forumwarz.com/incit
// ==/UserScript==

$ = unsafeWindow['window'].$;

function alarm() {
	if ($("voting")) {
		alert("Voting");
		setTimeout(alarm, 60000);
	}
	else {
		setTimeout(alarm, 1000);
	}
}

setTimeout(alarm, 1000);
