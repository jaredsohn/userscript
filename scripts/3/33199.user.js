// ==UserScript==
// @name		Reddit Anti-Election '08
// @namespace	http://www.llbit.se/
// @description	Removes any headline mentioning Obama, McCain or Palin from the reddit frontpage. This will not affect subreddits.
// @include		http://www.reddit.com/
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	var element = links[i];
	if (/title/.test(element.className) &&
		(/obama/i.test(element.innerHTML) ||
		/mccain/i.test(element.innerHTML) ||
		/palin/i.test(element.innerHTML))) {
		element.parentNode.parentNode.parentNode.style.display = 'none';
	}

}
