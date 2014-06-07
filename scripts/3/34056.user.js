// ==UserScript==
// @name           KoL Chat Marker
// @namespace      http://userscripts.org/users/66698
// @description    Adds a timestamp into KoL Chat every 5 minutes
// @include        *kingdomofloathing.com/*chat*
// ==/UserScript==

var addMarkTimeout;
var lastMark = 0;
addMark();

var winwin = window.window;
winwin.addEventListener('blur', addMark, false);

function addMark() {
	var d = new Date();
	if ((unix_timestamp()-lastMark) > 60) {
		if (document.getElementById("ChatWindow")) {
			document.getElementById("ChatWindow").innerHTML += "<center class=tiny>&mdash;&mdash;&mdash;&nbsp;" + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()) + "&nbsp;&mdash;&mdash;&mdash;</center>";
			postedgraf = "";
			document.getElementById("ChatWindow").scrollTop+=400;
			
			if (addMarkTimeout)
				clearTimeout(addMarkTimeout);
			addMarkTimeout = window.setTimeout(addMark,5*60*1000);
			lastMark = unix_timestamp();
		}
	}
}

function unix_timestamp() {
	return parseInt(new Date().getTime().toString().substring(0, 10))
}