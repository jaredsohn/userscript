// ==UserScript==
// @name           	Hotfile Download Automation
// Last Edited		December 2013

// @include        	http://www.hotfile.com/dl/*
// @include        	http://hotfile.com/dl/*
// ==/UserScript==

/*
This script was modified in December 2013.
While the original version is I do not know anymore who the creator.
I'm Sorry...!
*/

var i = 0;
for (var link in document.links) {
	var v = document.links[i].href;
	var re = /hotfile.com\/get\//;
	var result = v.search(re);
	if (result != -1) {
		document.location = document.links[i].href;
		break;
	}
	i++;
}