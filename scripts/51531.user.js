// ==UserScript==
// @name           Poprawiacz linków na forum
// @namespace      bzzz
// @include        http://pl*.plemiona.pl/forum.php*
// ==/UserScript==

var curVillagePattern = new RegExp( "village=([np])?[0-9]+");
var curVillageId = curVillagePattern.exec(window.parent.location)[0];
var curVillageId = new RegExp("[0-9]+").exec(curVillageId);


var links = document.getElementsByTagName('a');
	
for (var i = 0; i < links.length; i++) {
	if (links[i].href.indexOf("screen=info") > 0) {
		links[i].href += "&village="+curVillageId;	
	}

}