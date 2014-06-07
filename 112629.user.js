// ==UserScript==
// @name           SteamGifts Thanks button
// @version        1.1
// @namespace      steamgifts
// @description    Adds a "Thanks" button to the giveaway comment section.
// @include        http://www.steamgifts.com/giveaway/*
// @match          http://www.steamgifts.com/giveaway/*
// @grant          none
// ==/UserScript==

// Change these messages to suit your needs.
var thanks = ["Thanks", "Thank you", "Thanks for this", "Thanks for the giveaway", "Great giveaway, thanks"];
var punc = ["", ".", "!"];
// Stop suiting your needs here.

var cf = document.getElementById("comment_form");
if (cf) {
	cf = cf.getElementsByTagName("form")[0];

	var postBody = cf.elements.body;

	var thx = document.createElement("input");
	thx.type = "submit";
	thx.value = "Thanks";
	thx.addEventListener("click", function(ev) {
		postBody.value = thanks[Math.floor(Math.random() * thanks.length)] + punc[Math.floor(Math.random() * punc.length)];

		// this is stupid
		var s = document.createElement("input");
		s.type = "hidden";
		s.name = "submit_comment";
		s.value = "Submit Comment";
		cf.appendChild(s);
	});

	var p = cf.elements.submit_comment.parentNode;
	p.appendChild(document.createTextNode(" "));
	p.appendChild(thx);
}
