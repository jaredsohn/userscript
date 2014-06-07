// ==UserScript==
// @name           Erizabethizel
// @namespace      http://userscripts.org/users/dscho
// @description    In the tladition of Monty Python's "Erizabeth L" sketch, this sclipt exchanges l's fol r's and vice versa
// @include        *
// ==/UserScript==

function erizabethizeText(text) {
	var result = '';
	// cannot use replace(), as that would change R's to L's and back
	for (var i = 0; i < text.length; i++) {
		var ch = text.charAt(i);
		switch (ch) {
		case 'L': result += 'R'; break;
		case 'R': result += 'L'; break;
		case 'l': result += 'r'; break;
		case 'r': result += 'l'; break;
		default: result += ch; break;
		}
	}
	return result;
}

function erizabethizeNode(parentNode) {
	var nodes = parentNode.childNodes;
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i] instanceof Text)
			nodes[i].data = erizabethizeText(nodes[i].data);
		if (!(nodes[i] instanceof HTMLScriptElement) &&
				!(nodes[i] instanceof HTMLHeadElement))
			erizabethizeNode(nodes[i]);
	}
}

erizabethizeNode(document);
