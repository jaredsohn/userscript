// ==UserScript==
// @name           chinesefontreplacement
// @description    Font replacement: use Microsoft Yahei in place of Songti
// @namespace      smalltalk80.uiuc
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

	fontMapping["宋体"] = "Microsoft Yahei";
	fontMapping["simsun"] = "Microsoft Yahei";
	fontMapping["新宋体"] = "Microsoft Yahei";
	fontMapping["nsimhei"] = "Microsoft Yahei";
	fontMapping["黑体"] = "Microsoft Yahei";
	fontMapping["simhei"] = "Microsoft Yahei";
	fontMapping["楷体"] = "Microsoft Yahei";
	fontMapping["仿宋"] = "Microsoft Yahei";
	fontMapping["明體"] = "Microsoft Jhenhei";
	fontMapping["mingliu"] = "Microsoft Jhenhei";
	fontMapping["pmingliu"] = "Microsoft Jhenhei";
	fontMapping["ms gothic"] = "Meiryo";
	fontMapping["ms pgothic"] = "Meiryo";
	fontMapping["ms mincho"] = "Meiryo";
	fontMapping["ms pmincho"] = "Meiryo";
	fontMapping["courier"] = "Consolas";
	fontMapping["monospace"] = "Consolas";
	visitNode(document.getElementsByTagName("body")[0]);
