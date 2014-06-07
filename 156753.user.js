// ==UserScript==
// @name         NZBIndex Episode Navigation
// @description  Adds episode navigation links to TV search queries
// @namespace    drnick
// @downloadURL  https://userscripts.org/scripts/source/156753.user.js
// @updateURL    https://userscripts.org/scripts/source/156753.meta.js
// @include      *nzbindex.nl/*
// @version      1.0.1
// @grant        none
// ==/UserScript==

(function() {

	if (typeof jQuery == "undefined") throw "jQuery not found";
	if (window.top != window.self) return;
	
	var $ = jQuery;

	var pattern = /\bS(\d\d)E(\d\d)\b/i
		
	var input = $("input[type=text][name=q]");
	var query = input.val();
	var match = query.match(pattern);

	// break if no match for episode in query
	if (!match || match.length != 3)
		return;

	var nextLink = $("<a href='javascript:;'></a>");
	var prevLink = $("<a href='javascript:;'></a>");
	
	var navBox = $("<div />");
	navBox.css("textAlign", "center");
	
	navBox.append(" [ ");
	navBox.append(prevLink);
	navBox.append(" | ");
	navBox.append(nextLink);
	navBox.append(" ] ");
	
	$("#search").append(navBox);

	var origEp = match[0];  // full: "s01e05"
	var origS = match[1];   // season: "01"
	var origE = match[2];   // episode: "05"

	var nextE = parseInt(origE, 10) + 1;
	var prevE = parseInt(origE, 10) - 1;

	if (prevE < 0) prevE = 0;
	if (nextE < 10) nextE = "0" + nextE;
	if (prevE < 10) prevE = "0" + prevE;

	prevLink.html("<small>&#9668;</small> s" + origS + "e" + prevE);
	nextLink.html("s" + origS + "e" + nextE + " <small>&#9658;</small>");

	var prevEp = query.replace(origEp, "s" + origS + "e" + prevE);
	var nextEp = query.replace(origEp, "s" + origS + "e" + nextE);

	prevLink.click(function() {
		input.val(prevEp);
		input.parents("form:first").submit();
	});

	nextLink.click(function() {
		input.val(nextEp);
		input.parents("form:first").submit();
	});

})();