// ==UserScript==
// @name           Victorian Morality Police
// @namespace      http://twitter.com/ostromi
// @description    Replaces the word 'censorship' in webpages
// @include        *
// @exclude        http://userscripts.org/*
// @exclude        http://www.userscripts.org/*
// ==/UserScript==
var texts = document.evaluate(".//body//text()[contains(., 'censorship') or contains(., 'Censorship')]", document, null, 7, null);
for (var ai = 0, at = texts.snapshotLength; ai < at; ++ai)
{
	var text = texts.snapshotItem(ai);
	if (!/^(?:style|script)$/i.test(text.parentNode.tagName))
	text.nodeValue = text.nodeValue.replace(/Censorship/gi, 'unicorn farts');
}
