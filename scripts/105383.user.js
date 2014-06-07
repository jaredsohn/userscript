// ==UserScript==
// @name           Better Titles for RuneScape
// @description    Changes page titles on RuneScape.com to be more descriptive.
// @author         clintxs@gmail.com
// @include        http://runescape.com/*
// @include        http://*.runescape.com/*
// @version        1.0
// ==/UserScript==

var title;
var title_end = ' - RuneScape.com';

if (document.URL.indexOf('m=forum') > -1) {
	document.title = document.getElementsByClassName('title')[0].innerText.trim() + title_end;
} else if (document.URL.indexOf('m=adventurers-log/display_player_profile.ws') > -1) {
	if (title = document.getElementsByClassName('title')[0].innerText) {
		document.title = title.trim() + "'s Adventurer Log" + title_end;
	}
} else {
	if (document.URL.indexOf('viewitem.ws') == -1) {
		if (title = document.getElementsByClassName('plaque')[0]) {
			document.title = title.innerText.trim() + title_end;
		} else if (title = document.getElementsByClassName('PageHeading')[0]) {
			document.title = title.innerText.trim() + title_end;
		} else if (title = document.getElementById('logTitle')) {
			document.title = title.innerText.trim() + title_end;
		}
	}
}