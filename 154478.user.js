// ==UserScript==
// @name        Binsearch Episode Navigation
// @namespace   drnick
// @include     *binsearch.info*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       none
// @version     1.0
// ==/UserScript==

function main() {

	// iframe test
	if (window.self != window.top)
		return;

	var pattern = /\bS(\d\d)E(\d\d)\b/i
		
	var input = $("input[type=text][name=q]");
	var query = input.val();
	var match = query.match(pattern);

	// break if no match for episode in query
	if (!match || match.length != 3)
		return;

	var nextLink = $("<a href='javascript:;'></a>");
	var prevLink = $("<a href='javascript:;'></a>");

	input.after(" ] ");
	input.after(nextLink);
	input.after(" | ");
	input.after(prevLink);
	input.after(" [ ");

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

}


main();