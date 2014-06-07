// ==UserScript==
// @name           LazyGirls Instant Fullsize
// @description    Rewrites links so clicking on thumbnail immediately gives fullsize picture
// @include        http://www.lazygirls.info/*
// ==/UserScript==
var allImgtags, thisImgtag;
allImgtags = document.getElementsByTagName('img');
for (i = 1; i < allImgtags.length ; i++){
   thisImgtag = allImgtags[i];
   if (thisImgtag.src.match(/thumb/)){
	var fullImgsrc = thisImgtag.src.split('.');
	fullImgsrc.splice(-2,1);
	fullImgsrc = fullImgsrc.join('.');
	thisImgtag.parentNode.href = fullImgsrc;
	}
}