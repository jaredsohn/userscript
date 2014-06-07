// ==UserScript==
// @name           Hide Tapuz blog tags
// @namespace      http://www.splintor.com/userscripts
// @include        http://www.tapuz.co.il/blog/*
// ==/UserScript==

(function() {
	// update automatically -  // see http://userscripts.org/scripts/show/2296 for details
	try {
		window.addEventListener("load", function () { try {
			(unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates({
				name: "Hide Tapuz blog tags",
				namespace: "http://www.splintor.com/userscripts",
				//description: "",
				source: "http://userscripts.org/scripts/show/9746",
				identifier: "http://userscripts.org/scripts/source/9746.user.js",
				version: "0.2",
				date: (new Date(2007, 6 - 1, 8)).valueOf()
			});
		} catch (ex) {} }, false);
	} catch (ex) {}

	var w = document.getElementById("window13");
	if(w) {
		console.log("Hiding tags (windows13)");
		w.style.display = "none";
	}
})();
