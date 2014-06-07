// ==UserScript==
// @name           Anti-Self.* Reddits
// @namespace      anti-selfreddits
// @description    Hides all instances of self.* Reddit submissions
// @include        http://*reddit.com/*
// ==/UserScript==
var links = document.getElementsByTagName('span');
for (var i = 0; i < links.length; i++) {
	var element = links[i];
	if (/domain/.test(element.className) &&	(/self./i.test(element.innerHTML))) {
		element.parentNode.parentNode.parentNode.style.display = 'none';
	}
}