// ==UserScript==

// @name	POS Tracker
// @namespace	https://pos.pleaseignore.com/
// @description	Unfuck the page a little
// @include	https://pos.pleaseignore.com/*

// ==/UserScript==

if (window.location.href.match(/track.php/) && !window.location.href.match(/sb=/)) {
	if (window.location.href.match(/\?/)) {
		window.location.href = window.location.href + "&sb=1";
	} else {
		window.location.href = window.location.href + "?sb=1";
	}
}

if (window.location.href.match(/sb=1/) && !window.location.href.match(/sb=1[0-9]/) && !window.location.href.match(/nohide=1/)) {
	var tds = document.getElementsByTagName('td');
	for (var i = 0; i < tds.length; i++) {
		if (tds[i].innerHTML.match("\\[ignore\\]")) {
			tds[i].parentNode.style.display = 'none';
		}
	}
}

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	if (links[i].title == "100") {
		links[i].innerHTML = "All";
		links[i].href = "track.php?sd=999&sb=1&nohide=1";
	}
}
