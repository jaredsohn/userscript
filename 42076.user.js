// ==UserScript==
// @name           Torrentleech Crap Remover
// @namespace      http://kludgehack.com
// @description    Removes crappy releases from TL listing
// @include        http://www.torrentleech.org*
// @include        http://torrentleech.org*
// ==/UserScript==

var filter = new Array("GREEK", "HebSub", "0day", "CAM", "HDNet", "Friday Night", "Naruto", "CUSTOM");
var links = document.getElementsByTagName('a');
for (i=0; i<links.length; i++)
{
	for (k=0; k<filter.length; k++) {
		if (links[i].text.search(filter[k]) >= 0) {
			var row = links[i].parentNode.parentNode;
			var rIndex = row.sectionRowIndex;
			row.parentNode.deleteRow(rIndex);
		}
	}
}
