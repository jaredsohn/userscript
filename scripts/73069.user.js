// ==UserScript==
// @name           Lachschon Reparaturset
// @description    Wieder 2-9 Punkte voten können
// @namespace      www.lachschon.de
// @include        http://www.lachschon.de/item/*
// ==/UserScript==

var fid = document.getElementById("form-vote");
var pNode = fid.nextSibling.nextSibling;

if (pNode.childNodes.length == 4) {
	var vnodes = new Array();
	var tenNode = pNode.childNodes[1];
	for (var i=0; i<9; i++) {
		vnodes[i] = pNode.firstChild.cloneNode(true);
		var onclickstring =  vnodes[i].firstChild.getAttribute('onclick').replace(/\(1/, "("+(i+2));
		vnodes[i].firstChild.setAttribute('onclick', onclickstring);
		vnodes[i].firstChild.setAttribute('value', i+2);
		vnodes[i].childNodes[1].firstChild.nodeValue=i+2;
		pNode.insertBefore(vnodes[i], tenNode);
	}
	pNode.removeChild(tenNode)
}