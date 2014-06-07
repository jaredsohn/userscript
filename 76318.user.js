// ==UserScript==
// @name           Stop KoB Refresh
// @namespace      http://userscripts.org/
// @include        http://kob.itch.com/home.cfm
// ==/UserScript==
document.addEventListener("DOMContentLoaded", function () {
	for (var i=1;true;i++) {
		var timer=window.namedItem('cd'+i);
		if (typeof timer=='object') {
		timer.refresh=0;
		} else {
			break;
		}
	}
}, false);