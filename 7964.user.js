// ==UserScript==
// @name          OrkutTalk [v0.2b]
// @namespace     http://www.undergoogle.com/
// @description   Script que coloca o Google Talk Gadget dentro do Orkut
// @include       http*://www.orkut.com/*
// ==/UserScript==

var uls = document.getElementsByTagName('ul');

sourcify(uls[uls.length-1]);

function sourcify(link) {
	var source_link = document.createElement("iframe");
	source_link.src = "http://talkgadget.google.com/talkgadget/client?fid=gtalk29&relay=http%3A%2F%2Fwww.google.com";
	source_link.style.border = 'solid 1px rgb(161,187,228)';
	source_link.style.marginLeft = "4px";
	source_link.width = "134px";
	source_link.height = "500px";

	var space = document.createElement("br");

	var parent = link.parentNode;
	parent.insertBefore(source_link, link.nextSibling);
	parent.insertBefore(space, link.nextSibling);
}