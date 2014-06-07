// ==UserScript==
// @name          LauchTalk
// @namespace     http://www.uptecinformatica.com/
// @description   Script que adiciona um bot�o para abrir o Gtalk no Orkut
// @include       http*://www.orkut.com/*
// ==/UserScript==

var uls = document.getElementsByTagName('ul');

sourcify(uls[uls.length-1]);

function sourcify(link) {
	var source_link = document.createElement("iframe");
	source_link.src ="http://uptec1.googlepages.com/talk.html";
	source_link.style.border = '0px';
	source_link.style.marginLeft = "5px";
	source_link.width = "134px";
	source_link.height = "28px";

	var space = document.createElement("br");

	var parent = link.parentNode;
	parent.insertBefore(source_link, link.nextSibling);
	parent.insertBefore(space, link.nextSibling);
}