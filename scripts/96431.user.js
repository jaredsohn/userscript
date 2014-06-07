// ==UserScript==
// @name           Gawker Network - San-Serif Font
// @namespace      http://www.bencoleman.co.uk
// @description    Change the font on all Gawker sites to Arial
// @include        http://lifehacker.com*
// @include        http://*.lifehacker.com*
// @include        http://jezebel.com*
// @include        http://*.jezebel.com*
// @include        http://gizmodo.com*
// @include        http://*.gizmodo.com*
// @include        http://jalopnik.com*
// @include        http://*.jalopnik.com*
// @include        http://io9.com*
// @include        http://*.io9.com*
// @include        http://kotaku.com*
// @include        http://*.kotaku.com*
// @include        http://deadspin.com*
// @include        http://*.deadspin.com*
// @include        http://gawker.com*
// @include        http://*.gawker.com*
// @include        http://fleshbot.com*
// @include        http://*.fleshbot.com*
// ==/UserScript==

/* 
Code heavily borrowed from Dustin Diaz
http://www.dustindiaz.com/getelementsbyclass/ 
*/

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var bodytag, cites, headlines; 
bodytag = document.getElementsByTagName('body');
bodytag[0].style.fontFamily = 'Arial';

headlines = getElementsByClass('headline');
for (var i = 0; i < headlines.length; i++) {
    headlines[i].style.fontFamily = 'Arial';
}

cites = document.getElementsByTagName('cite');
for (var i = 0; i < cites.length; i++) {
    cites[i].style.fontFamily = 'Arial';
}
