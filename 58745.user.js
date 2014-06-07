// ==UserScript==
// @name           Facebook smiley beta
// @namespace      http://scripts.namdx1987.org/
// @description    Replace text emoticon by graphical (currently yahoo) smiley.
// @require        http://userscripts.org/scripts/source/67273.user.js
// @include        http://www.facebook.com/*
// @version        1.3.2 beta
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