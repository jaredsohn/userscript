// ==UserScript==
// @name           FrenzyFM Smiley for Facebook
// @namespace      http://frenzyfm.my
// @description    Gantikan Text Senyuman dengan Icon Senyuman FrenzyFM.
// @require        http://userscripts.org/scripts/source/90947.user.js
// @include        http://www.facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://www.facebook.com/*
// ----------------------------------------------------------[ CHROME ]-
// @match          http://*.facebook.com/*
// @match          http://www.facebook.com/*
// @match          https://*.facebook.com/*
// @match          https://www.facebook.com/*
// @run-at         document-start
// @version        1.2 beta
// @author         Elyaszbha aka Gaara
// ==/UserScript==


window=unsafeWindow;
document=window.document;

replaceElement(document, yemo);

function listen(evt)
{
	var node = evt.target;
	if (node.nodeType == document.ELEMENT_NODE) 
		replaceElement(node, yemo);
	
	if (node.nodeType == document.TEXT_NODE) {
		var parent = node.parentNode;
		var span = replaceTextNode(node, yemo);
		if (span) 
			parent.replaceChild(span, node);
	}
}		

document.body.addEventListener('DOMNodeInserted', listen, true);