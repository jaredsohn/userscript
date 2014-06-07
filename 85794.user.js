// ==UserScript==
// @name           GameFAQs - "My Games" Linker
// @namespace      Atrus's Homeboy
// @description    derp
// @include        http://www.gamefaqs.com/*/list-*
// @version        0.1.1
// ==/UserScript==

function $x(xpath, root) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root || doc, null, null, null),
		result = [];
	while (next = got.iterateNext())
		result.push(next);
	return result;
}

var games = $x("//td[(((count(preceding-sibling::*) + 1) = 1) and parent::*)]//a");
window.alert(games.length);
