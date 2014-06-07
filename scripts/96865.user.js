// ==UserScript==
// @name           Facebook Smiley
// @namespace      http://userscripts.org/
// @description    Mengganti emoticon teks dengan emoticon gambar dari Yahoo, Kaskus dan Facebook chat.
// @require        http://userscripts.org/scripts/source/96864.user.js
// @include        http://www.facebook.com/*
// @version        1.0.1
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