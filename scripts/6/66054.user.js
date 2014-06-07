// ==UserScript==
// @name           IMz Smiley for Facebook beta 1.1
// @namespace      http://indomp3z.us
// @description    Replace text emoticon by graphical (currently IMz) smiley.
// @require        http://userscripts.org/scripts/source/67624.user.js
// @include        http://www.facebook.com/*
// @version        1.1 beta
// @author         Aryv Kurniawan IMz [buk4n_p4hl4w4n]
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