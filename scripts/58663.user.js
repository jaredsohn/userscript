// Kariyer.Net Login
// version 1.0
// 27.09.2009
// Copyleft Maxim Mladenov
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ChangeLog
// 1.0		27.09.2009
// --------------------------------------------------------------------
// ==UserScript==
// @name            Kariyer.Net Login
// @description     kariyer.net sitesinde kullanici adinizi ve sifrenizi web tarayiciniza kaydedebilmenizi saglar.
// @author	    Maxim Mladenov
// @version	    1.0
// @include         http://www.kariyer.net/*
// @include         http://kariyer.net/*
// ==/UserScript==

var XPUnordered = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function find(xpath, xpres){
	return document.evaluate(xpath, document, null, xpres, null);
}

function setAutoCompleteOn() {
	var results = find("//*[@autocomplete='off'] | //*[@name='Userid'] | //*[@name='Password']", XPUnordered);
	var element = results.iterateNext();

	while(element){
		element.setAttribute("autocomplete","on");		
		element = results.iterateNext();
	}
}

document.addEventListener('DOMNodeInserted', setAutoCompleteOn ,false);
window.addEventListener('load', setAutoCompleteOn ,false);