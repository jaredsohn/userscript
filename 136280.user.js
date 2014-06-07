// ==UserScript==
// @name           Default non-http checkout URLs on Github
// @description    Select SSH (private repos) or GIT (public repos) checkout URL by default
// @author         Jan Vcelak
// @include        https://github.com/*/*
// @version        1.0
// ==/UserScript==

var clone_priorities = new Array("private_clone_url", "public_clone_url");

for (var i in clone_priorities) {
	var cls = clone_priorities[i];
	result = document.evaluate('//li[contains(@class,"'+cls+'")]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var element = result.singleNodeValue;

	if (element) {
		element.click.apply(element);
		break;
	}
}
