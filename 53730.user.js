// ==UserScript==
// @name           what.cd: artists: move collector to bottom
// @namespace      http://what.cd
// @description    moves the collector to the bottom of the sidebar
// @include        https://ssl.what.cd/artist.php?id=*
// @include        http://*what.cd/artist.php?id=*
// @include        https://ssl.what.cd/collage.php?id=*
// @include        http://*what.cd/collage.php?id=*
// ==/UserScript==

var divs = document.getElementsByTagName('div');
var collector, parent;
for(i=0;i<divs.length;i++) {
	if(divs[i].className != "box") continue;
	if(divs[i].children[0].children[0].innerHTML != "Collector") continue;
	collector = divs[i];
	parent = divs[i].parentNode;
}
parent.removeChild(collector);
parent.appendChild(collector);