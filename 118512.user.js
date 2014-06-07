// ==UserScript==
// @name           fontreplacer Titillium Text
// @description    Font replacement: Titillium Text
// @namespace      smelllki0.utvc
// @include        http://*
// ==/UserScript==

var fontMapping = new Object();

function replaceFont(element) {
	var style = getComputedStyle(element, null);
	if (! style) {
		return;
	}

	var fontSize = style.fontSize;
	var pos = fontSize.indexOf('px');
	if (pos != -1) {
		var px = parseInt(fontSize.substring(0, pos));
		if (px < 14) {
			element.style.fontSize = '14px';
		}
	}

	var fontFamily = style.fontFamily.toLowerCase();
	for (var oldFontName in fontMapping) {
		if (fontFamily.indexOf(oldFontName) != -1) {
			var newFontName = fontMapping[oldFontName];
			element.style.fontFamily = newFontName;
			return;
		}
	}
}

function visitNode(node) {
	if (node) {
		if (node.childNodes.length == 0) {
			if (node.nodeName == "#text") {
				return true;
			}
		}
		else {
			var hasDirectText = false;
			for (var i = 0; i < node.childNodes.length; ++ i) {
				if (visitNode(node.childNodes[i])) {
					hasDirectText = true;
				}
			}
			if (hasDirectText) {
				replaceFont(node);
			}
		}
	}
	return false;
}

	fontMapping["*"] = "Titillium Text Regular";
	visitNode(document.getElementsByTagName("body")[0]);
