// ==UserScript==
// @name           Ignore4WBFH
// @namespace      Ignore4WBFH
// @include        http://forum.wbfree.net/forums/showthread.php*
// @decription     Ignore messages from 2 users
// ==/UserScript==

var ignl = 0;
var igns = 0

var elementList = document.querySelectorAll(".tborder");

var i;

for (i=0; i<elementList.length; i++)
{
	linkObjList = elementList[i].querySelectorAll(".bigusername");

	for (var j=0; j<linkObjList.length; j++) {
		if (linkObjList[j].innerHTML == 'soomnvR') {
			igns++;
			elementList[i].innerHTML = "";
		}
		if (linkObjList[j].innerHTML == '-letez') {
			ignl++;
			elementList[i].innerHTML = "";
		}
	}

	linkObjList = elementList[i].querySelectorAll(".alt2");

	for (var j=0; j<linkObjList.length; j++) {
		if(linkObjList[j].innerHTML.indexOf('soomnvR') + 1) {
			igns++;
			elementList[i].innerHTML = "";
		}
		if(linkObjList[j].innerHTML.indexOf('-letez') + 1) {
			ignl++;
			elementList[i].innerHTML = "";
		}
	}
}

if (ignl || igns) {
	document.title = "-letez vs soomnvR score - " + ignl + " : " + igns + " | " + document.title;
}
