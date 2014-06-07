// ==UserScript==
// @name          Proggit Sans Imgur
// @namespace     http://userscripts.org/users/296063
// @description   Removes Imgur links from the Programming section of Reddit
// @include       http://www.reddit.com/r/programming
// @include       http://www.reddit.com/r/programming/
// @version       1.0
// ==/UserScript==

var things = document.querySelectorAll("div.thing");
for (var i=0;i<things.length;++i) {
	var thing = things[i];
	var href = thing.querySelectorAll("a.title")[0].href;
	if (/imgur\.com\//.test(href)) {
		thing.outerHTML = "";
	}
}
