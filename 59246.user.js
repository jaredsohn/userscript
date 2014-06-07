// ==UserScript==
// @name          K12 auto refresher
// @namespace     Nick_Ninja
// @include			https://totalviewstudent.k12.com/cgi-bin/WebObjects/TotalViewStudent.woa/*
// ==/UserScript==

var secs = GM_getValue('k12autorefreshinterval', 60);

var inter = setInterval(refresh, secs * 1000);

GM_registerMenuCommand("Change interval", changeint);

function refresh() {
	GM_xmlhttpRequest({
		 method: 'GET',
		 url: document.getElementById("navigationContainer").getElementsByTagName("a")[0].href,
		 headers: {},
		 onload: function(responseDetails) {}
	});
}

function changeint() {
	GM_setValue('k12autorefreshinterval', prompt("Number of seconds between refreshes: ", GM_getValue('k12autorefreshinterval', 60)));
	alert("Refresh page for changes to apply");
}