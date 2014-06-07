// ==UserScript==
// @name           Remove KoL Topics By Specific People
// @namespace      a
// @description    Removes topics posted by people listed
// @include        *forums.kingdomofloathing.com*forumdisplay.php*
// ==/UserScript==

stuff = document.getElementsByTagName('tr');
var names = [];
names[names.length] = "Lescha";

for(i=0;i<names.length;i++) {
	names[i] = "'_self')\">" + names[i];
}

for(i=0;i<stuff.length;i++) {
	for(j=0;j<names.length;j++) {
		if(stuff[i].innerHTML.indexOf(names[j]) > -1 ) {
			stuff[i].parentNode.removeChild(stuff[i]);
			i--;
		}
	}
}