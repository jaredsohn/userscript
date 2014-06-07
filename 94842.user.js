// ==UserScript==
// @name 	JTrac : masquer les maintenances closes ou abandonnées
// @namespace	http://jtrac.cib.net:8000/
// @description	masquer les maintenances closes ou abandonnées
// @include		http://jtrac.cib.net:8000/jtrac/app/item/list/*
// ==/UserScript==

var MyTDs = document.getElementsByTagName('td');
var MyTRsToRemove = new Array();
for (var i=0;i<+MyTDs.length ;i++) {
	if (!(MyTDs[i].firstChild == null)) { // il y a un fils DOM
		if ( 3== MyTDs[i].firstChild.nodeType) { // on restreint aux TD qui ont un TextElement comme premier fils.
			if (MyTDs[i].firstChild.nodeValue.match(/.*Abandon.*|.*Closed.*/)) {
				MyTRsToRemove.push(MyTDs[i].parentNode);
			}
		}
	}
}
for( var i = 0 ; i<+MyTRsToRemove.length ; i++) {
	MyTRsToRemove[i].parentNode.removeChild(MyTRsToRemove[i]);
}