// ==UserScript==
// @name			carewasher
// @include			http://badgame.net/*
// @include			http://bad-game.net/*
// @namespace		badgame.net
// ==/UserScript==

var posts = document.getElementsByClassName('postrow');

for (var i = 0; i < posts.length; i++) {
	var userid = posts[i].getAttribute("userid");
	if (userid == 2735) {
		posts[i].innerHTML = "";
	}
}