// --------------------------------------------------------------------
// ==UserScript==
// @name			CleanSozluk
// @description	    		Removes ads from ek$isÃ¶zlÃ¼k
// @author		    	HuzursuZ
// @version		    	2.0.32
// @include		    	http://www.eksisozluk.com/*
// @include		    	http://eksisozluk.com/*
// @include		    	http://sozluk.sourtimes.org/*
// @include		    	http://sourtimes.org/*
// @include		    	http://www.sourtimes.org/*
// @include		    	http://84.44.114.44/*

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
	if ((donBebegim) && (donBebegim.firstChild.data == 'dÃ¶n bebeÄim')) {
		donBebegim.click();
	}
	var elemToHide = find("//*[@id='ad' or @id='as']", XPFirst);
	if (elemToHide) {
		elemToHide.style.display = 'none';
	}
}

document.addEventListener('DOMNodeInserted', cleanSozluk ,false);
window.addEventListener('load', cleanSozluk ,false);