// CleanLivemocha
// version 1.1
// 28.09.2009
// Copyleft Maxim Mladenov
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ChangeLog
// 1.1		28.09.2008
// The ad which is in profile page is removed.
// 1.0		08.09.2009
// --------------------------------------------------------------------
// ==UserScript==
// @name	    CleanLivemocha
// @namespace      www.livemocha.com/
// @description	    Removes the poll, ads and invite friend sections from Livemocha.
// @author	    Maxim Mladenov
// @version	    1.1
// @include         http://www.livemocha.com/*
// ==/UserScript==

var XPUnordered = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function find(xpath, xpres){
	return document.evaluate(xpath, document, null, xpres, null);
}

function clean() {
	var elementsToHide = find("//*[@id='left-column'] | //*[@id='View Profile']", XPUnordered);
	var result = elementsToHide.iterateNext();	
	
	while(result){
		result.parentNode.removeChild(result);
		result = elementsToHide.iterateNext();
	}
}

document.addEventListener('DOMNodeInserted', clean ,false);
window.addEventListener('load', clean ,false);