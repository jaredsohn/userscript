// ==UserScript==
// @name           Reddit Anti-Self.Reddit
// @namespace      antiselfreddit
// @description    Removes any self.reddit submission
// @include        http://*reddit.com/*
// ==/UserScript==
var links = document.getElementsByTagName('span');
for (var i = 0; i < links.length; i++) {
	var element = links[i];
	if (/domain/.test(element.className) &&	(/self.reddit/i.test(element.innerHTML))) {
		element.parentNode.parentNode.parentNode.style.display = 'none';
	}

}
