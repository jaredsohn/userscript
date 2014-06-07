// ==UserScript==
// @name           Show URL Google Reader
// @namespace      76552.user.js
// @include        https://www.google.com/reader/view/*
// ==/UserScript==

document.addEventListener('DOMNodeInserted',init, false);

function init() {
	var re = new RegExp(/^https?:\/\/(www\.)?([^/]+)?/i);
	var entryTitle = document.getElementsByClassName("entry-title-link");
	var entryAuthor = document.getElementsByClassName("entry-author");

	for (var i = 0; i < entryTitle.length; i++) {
	    entryTitle[i].href.match(re);
	    if (entryAuthor[i].innerHTML.indexOf("[") == -1)
	        entryAuthor[i].innerHTML += (" [" + RegExp.$2 + "]");
	}
}