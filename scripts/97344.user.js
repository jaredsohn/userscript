// ==UserScript==
// @name	Sort Google My Maps alphabetically
// @namespace	http://twisterrob.uw.hu
// @description	Sorts alphabetically instead of last-changed.
// @include	http://maps.google.*
// @match	http://maps.google.com/*
// @match	http://maps.google.hu/*
// ==/UserScript==
function addJQuery(callback) {
	var scriptJQ = document.createElement("script");
	var version = "1.5.0";
	scriptJQ.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/" + version + "/jquery.min.js");
	scriptJQ.addEventListener("load", function() {
		var scriptOnLoad = document.createElement("script");
		scriptOnLoad.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(scriptOnLoad);
	}, false);
	document.body.appendChild(scriptJQ);
}

addJQuery(main);

function main() {
	// Globals
	var debug = false;
	var log = function(msg){window.status = msg;};
	if (window.console) { log = function(msg){window.console.log(msg);} };
	if (!debug) log = function(){}; // disable logging
	var myMapsLinks = "#mmheaderpane div[jsselect='$this.owned_maps || []']";
	var createdByMeTitle = "div.mmfchd[jsdisplay='modulesExist($this.owned_maps)']";
	
	var waitForLoad = function () {
		if($(myMapsLinks).last().text() != "") {
			log("welcome hidden, let's do it on " + window.location);
			var getName = function(el) {
				return $(el).text();
			};
			var ordered = $(myMapsLinks).sort(function(a,b) {
				a = getName(a);
				b = getName(b);
				return a == b? 0 : (a < b)? -1 : 1;
			}).get();
			$(myMapsLinks).remove();
			$(ordered).insertAfter($(createdByMeTitle));
		} else if ($("#panel").size() != 0) {
			log("waiting for my maps welcome to hide on " + window.location);
			window.setTimeout(waitForLoad, 1000); // wait to hide
		} else {
			log("giving up, no my maps welcome screen and never will be on " + window.location);
		}
	};

	log("starting");
	waitForLoad(); // start waiting
}