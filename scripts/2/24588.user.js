// ==UserScript==
// @name           Google for world
// @namespace      http://userscripts.org/users/48278
// @description    Double click on a word opens a tab with google search for it.
// @include        http://*
// @include        https://*
// ==/UserScript==

function googleFor(search) {
	var url = 'http://www.google.com/search?q=' + encodeURIComponent(search);
	window.open(url);
	//GM_openInTab(url);
}

document.body.addEventListener("dblclick", function(e) {
	var word = window.getSelection();
	//GM_log(word);
	googleFor(word);
}, false);