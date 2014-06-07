// ==UserScript==
// @name		Reddit Vote-Up-If Blocker
// @namespace	http://www.llbit.se/
// @description	Hides headlines with "vote up if" in the title.
// @include		http://www.reddit.com/*
// @exclude		http://www.reddit.com/user/*
// @exclude		http://www.reddit.com/r/*/comments/*
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	var element = links[i];
	if (/^title/.test(element.className) &&
		/vote up if/i.test(element.innerHTML)) {
		element.parentNode.parentNode.parentNode.style.display = 'none';
	}

}
