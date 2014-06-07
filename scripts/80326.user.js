// ==UserScript==
// @name           maxkeiser first comments
// @namespace      wcs.blah
// @description    Makes article links go to first page of comments instead of the last page.
// @include        http://maxkeiser.com/
// ==/UserScript==

//grab all links
var allElements, thisElement;
allElements = document.getElementsByTagName('a');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];

	// target all links to "http:..maxkeiser.com"
	var pattern = /http...maxkeiser.com.+/;
	if(thisElement.href.match(pattern)) {
		// redirect links to first page of comments
		thisElement.href = thisElement.href + "comment-page-1/#comments";
	}
}