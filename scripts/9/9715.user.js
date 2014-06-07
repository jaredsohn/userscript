// ==UserScript==
// @name           Add numbers to comments in Friends of George @ Blogli
// @namespace      http://www.splintor.com/userscripts
// @include        http://friendsofgeorge.blogli.co.il/archives/*
// ==/UserScript==

(function() {
	// update automatically -  // see http://userscripts.org/scripts/show/2296 for details
	try {
		window.addEventListener("load", function () { try {
			(unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates({
				name: "Add numbers to comments in Friends of George @ Blogli",
				namespace: "http://www.splintor.com/userscripts",
				//description: "",
				source: "http://userscripts.org/scripts/show/9715",
				identifier: "http://userscripts.org/scripts/source/9715.user.js",
				version: "0.1",
				date: (new Date(2007, 6 - 1, 7)).valueOf()
			});
		} catch (ex) {} }, false);
	} catch (ex) {}

	var title = document.getElementsByTagName("h3")[0];
	var comments = document.getElementById("content").getElementsByTagName("li")

	title.innerHTML = comments.length + " " + title.innerHTML;
	for(var i = 0; i < comments.length; ++i) {
		var p = comments[i].getElementsByTagName("p")[0];
		p.innerHTML = (i+1) + ". " + p.innerHTML;
	}
})();