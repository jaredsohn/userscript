// ==UserScript==
// @name        Beetlebum: Hypnohamster entfernen
// @namespace   http://userscripts.org/users/99643
// @include     http://blog.beetlebum.de/*
// @grant       none
// @version     1
// ==/UserScript==

var hamster = document.evaluate("id('bg_footer')//a/img[@src='http://www.beetlebum.de/misc/hypnohamster12.gif']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(hamster){
	hamster.parentNode.removeChild(hamster);
}