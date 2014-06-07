// ==UserScript==
// @name           Change links to only contain item number
// @namespace      http://www.splintor.com/userscripts
// @description    Change Haaretz site links to only contain the meaningful item number, so the URL is shorter, and the last update date appears
// @include        http://*haaretz.co.il/*
// @include        http://*captain.co.il/*
// ==/UserScript==

(function() {
	// update automatically -  // see http://userscripts.org/scripts/show/2296 for details
	try {
		window.addEventListener("load", function () { try {
			(unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates({
				name: "Change links to only contain item number",
				namespace: "http://www.splintor.com/userscripts",
				description: "Change Haaretz site links to only contain the meaningful item number, so the URL is shorter, and the last update date appears",
				source: "http://userscripts.org/scripts/show/9489",
				identifier: "http://userscripts.org/scripts/source/9489.user.js",
				version: "0.2",
				date: (new Date(2007, 5 - 1, 28)).valueOf()
			});
		} catch (ex) {} }, false);
	} catch (ex) {}

	var shortenURL = function(u) {
		return u.replace(/&contrassID=\d+(&subContrassID=\d+&sbSubContrassID=\d+)*/, "")
	}

	var thisShortURL = shortenURL(location.href);
	if(thisShortURL != location.href)
		location.replace(thisShortURL);
	else {
		var l = document.links;
		for(var i = 0; i < l.length; ++i) {
			l[i].href = shortenURL(l[i].href);
		}
	}
})();