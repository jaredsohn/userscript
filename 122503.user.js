// ==UserScript==
// @name			Expand Code Blocks
// @namespace		http://userscripts.org/users/TeleKawaru
// @include			http://www.autohotkey.com/forum/*
// ==/UserScript==

GM_registerMenuCommand("Expand All", expandAll);

function hasExpandableBlocks() {
	var elCount = 0, ele, allEles = document.getElementsByClassName('genmed');
	for (var i=0; (ele = allEles[i]) != null; i++) if (ele = ele.childNodes[0].childNodes[1]) if (ele.tagName == "A") elCount++;
	return elCount;
}

function expandAll() {
	var bC = 0;
	if (bC = hasExpandableBlocks()) if (!confirm("Expand " + bC + " code blocks?")) return;
	var allEles = document.getElementsByClassName('genmed');
	var ele;
	for (var i=0; (ele = allEles[i]) != null; i++) {
		var aTag;
		if ((aTag = ele.childNodes[0].childNodes[1]) != null) {
			aTag.click();
		}
	}
	return;
}