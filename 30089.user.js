// ==UserScript==
// @name	     Auto Refresh
// @namespace    http://userscripts.org/users/23652
// @description  Reloads pages at intervals you set. Customizable intervals for different sites
// @include      http://*
// @include      https://*
// @include      file:///*
// @copyright   JoeSimmons
// @version     1.0.1
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     http://usocheckup.dune.net/30089.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

/* ---------- CHANGELOG -------------------

1.0.1
	- updated with better looking code
	- used document.location.replace instead of document.location.reload

1.0.0
	- created

---------------------------------------- */

(function auto_refresh() {

// Make sure the page is not in a frame
if(window.self !== window.top) return;

var dtime = [], sites = [], timeS = [], i, to, time;







//////////////////////////////////////////////////////////////////////////////
////////////////////////// SET HERE //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////// Create more sites following the pattern if needed ///////////////////
//////// For the timeS, enter seconds, minutes, or hours /////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
sites[0] = 'domainhere';       // site one
dtime[0] = 5;                  // time for site one
timeS[0] = 'seconds';          // time type for site one

sites[1] = 'domainhere.com';   // site two
dtime[1] = 5;                  // time for site two
timeS[1] = 'minutes';          // time type for site two

sites[2] = 'domainhere.com';   // site three
dtime[2] = 5;                  // time for site three
timeS[2] = 'hours';            // time type for site three
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////








function reload() {

	window.top.document.location.replace(window.top.document.location.href);

}

function resetReload() {

	window.clearTimeout(to);

	to = window.setTimeout(reload, time);

}

function setupReload(obj) {

	if(typeof obj !== "object" || !obj["dtime"] || !obj["timeS"]) return;

	switch(obj["timeS"]) {

		case "seconds":
			time = obj["dtime"] * 1000;
			break;

		case "minutes":
			time = obj["dtime"] * 1000 * 60;
			break;

		case "hours":
			time = obj["dtime"] * 1000 * 60 * 60;
			break;

	}

	// set a delay to reload the page after the specified time
	to = window.setTimeout(reload, time);

	window.addEventListener("click", resetReload, false);
	window.addEventListener("keyup", resetReload, false);

}

for(i = 0; i < sites.length; i++) {

	if(window.top.document.domain.indexOf(sites[i]) !== -1) {

		setupReload({
			"dtime" : dtime[i],
			"timeS" : timeS[i]
		});

		break;

	}

}

})();