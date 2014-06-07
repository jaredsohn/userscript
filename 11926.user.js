// ==UserScript==
// @name		   BOR text ad remover
// @namespace	  http://bash.org.ru/
// @include		http://bash.org.ru/*
// ==/UserScript==

var divs = document.getElementsByTagName('div');
var removed = false;

var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@class='q']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	if (thisDiv.childNodes.length == 1 && thisDiv.childNodes[0].className != 'news')
		thisDiv.style.display = 'none';
}
