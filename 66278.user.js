// ==UserScript==
// @name           SS2Helper-Behemoth
// @namespace      SS2Helper-Behemoth
// @description    SS2Helper - Behemoth highlighter
// @include        http://www.sigmastorm2.com/index.php?cmd=world&subcmd=map*
// ==/UserScript==

function findNode(xpath, doc) {
	if (!doc) {
		doc=document;
	}
	var findQ = document.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (findQ.snapshotLength==0) return null;
	return findQ.snapshotItem(0);
}

function main() {
	var isBigMap = findNode('//b[contains(.,"Map Overview")]');
	if (!isBigMap) return;
	var titan = findNode('//table[contains(@background, "/titans/")]');
	if (titan) {
		titan.style.border = "5px solid red";
	}
}

main();