// ==UserScript==
// @name           Letter Scrambler
// @namespace      http://userscripts.org/users/dscho
// @description    Scrambles each word, keeping first and last letters. This script is based on the April Fools hack on http://fiji.sc/
// @include        *
// ==/UserScript==

function permutation(n) {
	var result = new Array();
	for (var i = 0; i < n; i++)
		result[i] = i;
	for (var i = 1; i < n; i++) {
		var j = Math.floor(Math.random() * (i + 1));
		if (i != j) {
			var k = result[i];
			result[i] = result[j];
			result[j] = k;
		}
	}
	return result;
}

function shuffleWord(text) {
	if (text.length < 4)
		return text;
	var p = permutation(text.length - 2);
	var result = "";
	result += text.charAt(0);
	for (var i = 0; i < text.length - 2; i++)
		result += text.charAt(1 + p[i]);
	result += text.charAt(text.length - 1);
	return result;
}

function isAlNum(c) {
	return (c >= 48 && c < 58) || (c >= 65 && c < 91) || (c >= 96 && c < 122);
}

function shuffleText(text) {
	var i = 0;
	while (i < text.length && !isAlNum(text.charCodeAt(i)))
		i++;
	var result = text.substring(0, i);
	var previous = i - 1;
	for (; i < text.length; i++) {
		var c = text.charCodeAt(i);
		if (isAlNum(c))
			continue;
		result += shuffleWord(text.substring(previous + 1, i));
		previous = i - 1;
		while (i + 1 < text.length && !isAlNum(text.charCodeAt(i)))
			i++;
		result += text.substring(previous + 1, i);
		previous = i - 1;
	}
	result += shuffleWord(text.substring(previous + 1, text.length));
	return result;
}

function shuffleTextRecursively(parentNode) {
	var nodes = parentNode.childNodes;
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i] instanceof Text)
			nodes[i].data = shuffleText(nodes[i].data);
		if (!(nodes[i] instanceof HTMLScriptElement) &&
				!(nodes[i] instanceof HTMLHeadElement))
			shuffleTextRecursively(nodes[i]);
	}
}

shuffleTextRecursively(document);
