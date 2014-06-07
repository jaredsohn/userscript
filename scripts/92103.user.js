// ==UserScript==
// @name ed-footnote-disabler
// @namespace karmarulez
// @description eksi duyuru footnote gizleyici by fader
// @include http://www.itusozluk.com/*
// ==/UserScript==


var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}
function cleanSozluk() {
	var donBebegim = find("//button", XPFirst);
	if ((donBebegim) && (donBebegim.firstChild.data == 'alışılmış itü sözlük görünümüne dön')) {
		donBebegim.click();
	}
	var elemToHide = find("//*[@id='ad' or @id='as']", XPFirst);
	if (elemToHide) {
		elemToHide.style.display = 'none';
	}
}

document.addEventListener('DOMNodeInserted', cleanSozluk ,false);
window.addEventListener('load', cleanSozluk ,false);