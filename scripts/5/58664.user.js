// Yahoo Mail Login
// version 1.0
// 27.09.2009
// Copyleft Maxim Mladenov
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ChangeLog
// 1.0		27.09.2009
// --------------------------------------------------------------------
// ==UserScript==
// @name            Yahoo Mail Login
// @description     Provides an ability to save your Yahoo Mail username and password within firefox.
// @author	    Maxim Mladenov
// @version	    1.0
// @include	    https://login.yahoo.com/*
// ==/UserScript==

var XPUnordered = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function find(xpath, xpres){
	return document.evaluate(xpath, document, null, xpres, null);
}

function setAutoCompleteOn() {
	var results = find("//*[@autocomplete='off'] | //*[@id='username'] | //*[@id='passwd']", XPUnordered);
	var element = results.iterateNext();

	while(element){
		element.setAttribute("autocomplete","on");		
		element = results.iterateNext();
	}
}

document.addEventListener('DOMNodeInserted', setAutoCompleteOn ,false);
window.addEventListener('load', setAutoCompleteOn ,false);