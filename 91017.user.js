// ==UserScript==
// @name           Werbung
// @include        http://www.team-ulm.de/*
// @version        1.0
// @author         PcFr34kZ
// ==/UserScript==

function werbung() {
	var Node = document.getElementById('banneriframe');
	Node.parentNode.removeChild(Node);
}
werbung();