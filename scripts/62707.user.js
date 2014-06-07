// ==UserScript==
// @name           Flickr Spaceball Killer
// @include        http://www.flickr.com/*
// ==/UserScript==
var allImgtags, thisImgtag;
allImgtags = document.getElementsByTagName('img');
for (i = 1; i < allImgtags.length ; i++){
   thisImgtag = allImgtags[i];
   if (thisImgtag.src.match(/spaceball/)){
	thisImgtag.parentNode.removeChild(thisImgtag);
	}
}
