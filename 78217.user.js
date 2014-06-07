// ==UserScript==
// @name           Smileys PC INpact pour Facebook
// @namespace      http://www.pcinpact.com
// @description    Remplace le texte dans Facebook par les smileys de PC INpact
// @require        http://userscripts.org/scripts/source/78218.user.js
// @include        http://www.facebook.com/*
// @exclude        http://apps.facebook.com/*
// @exclude        http://*facebook.com/apps/*
// @author         lol.2.dol
// ==/UserScript==

window=unsafeWindow;
document=window.document;

replaceElement(document, pcismile);

function listen(evt)
{
	var node = evt.target;
	if (node.nodeType == document.ELEMENT_NODE) 
		replaceElement(node, pcismile);
	
	if (node.nodeType == document.TEXT_NODE) {
		var parent = node.parentNode;
		var span = replaceTextNode(node, pcismile);
		if (span) 
			parent.replaceChild(span, node);
	}
}		

document.body.addEventListener('DOMNodeInserted', listen, true);