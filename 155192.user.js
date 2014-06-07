// ==UserScript==
// @name        remove-piratesbay-adds
// @namespace   http://thepiratebay.se
// @description Remove piratesbay ads
// @include     http://thepiratebay.se/*
// @version     1
// ==/UserScript==

var addContainers = new Array();

addContainers[0] = document.getElementById('sky-right');
addContainers[1] = document.getElementById('sky-banner');
addContainers[2] = document.getElementById('header').getElementsByTagName("div")[0];
addContainers[3] = document.getElementById('foot').getElementsByTagName("iframe")[0];
addContainers[4] = document.getElementById('main-content').getElementsByTagName("iframe")[0];

var i = 0;
for ( ; i <addContainers.length; i++ ) {
	GM_log("Visiting add: " + addContainers[i]);
	try {
		addContainers[i].style.display = "none";
	} catch (e) {
		GM_log("Add not found: " + addContainers[i]);
	}
}

document.getElementById('main-content').style.marginLeft = "10px";






