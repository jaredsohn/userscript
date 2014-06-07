// ==UserScript==
// @name          xkcd titles
// @namespace     http://rephrase.net/box/user-js/
// @description   Appends the text of xkcd comics' title attributes as a paragraph following the image.
// @include       *
// ==/UserScript==
/*
After writing this I found one at userscripts.org that does pretty much the same thing:

    http://userscripts.org/scripts/show/6080

That one only works out-of-the-box at the xkcd site, though, which isn't any
use to me. YMMV.
*/

var xpath = "//img[@title][contains(@src, 'xkcd.com/comics/')]"; 

var imgs = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

var elm, i, text, p; 
	
for(elm = null, i = 0; (elm = imgs.snapshotItem(i)); i++) { 
	text = elm.getAttribute('title');
	p = document.createElement('p');
	p.appendChild( document.createTextNode(text) );
	
	if (elm == elm.parentNode.lastChild) {
	    elm.parentNode.appendChild(p);
	} else {
	    elm.parentNode.insertBefore(p, elm.nextSibling);
	}
}
	
