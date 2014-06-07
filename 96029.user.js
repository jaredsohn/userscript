// ==UserScript==
// @name           Butt Computing v1
// @namespace      http://twitter.com/geeknik
// @description    Replaces the word 'cloud' with the word 'butt' all over the web
// @include        *
// @exclude        http://userscripts.org/*
// @exclude        http://www.userscripts.org/*
// ==/UserScript==
var texts = document.evaluate(".//body//text()[contains(., 'cloud') or contains(., 'Cloud')]", document, null, 7, null);
for (var ai = 0, at = texts.snapshotLength; ai < at; ++ai)
{
	var text = texts.snapshotItem(ai);
	if (!/^(?:style|script)$/i.test(text.parentNode.tagName))
	text.nodeValue = text.nodeValue.replace(/Cloud/gi, 'butt');
}