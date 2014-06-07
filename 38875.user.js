// ==UserScript==
// @name           Remove Skyrates
// @namespace      a
// @description    Removes topics posted by people listed
// @include        *alliancefromhell.com/index.php*
// @include        *alliancefromhell.com/
// ==/UserScript==

stuff = document.getElementsByTagName('tr');

for(i=1;i<stuff.length;i++) {
	if(stuff[i].innerHTML.indexOf("Skyrates!") > -1 ) {
		stuff[i].parentNode.removeChild(stuff[i]);
	}
}