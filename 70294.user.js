// ==UserScript==
// @name           Ikariam Troops in Town Icon
// @description    Show an icon in island view next to the name of other towns that your troops are in.
// @namespace      http://userscripts.org/scripts/show/70294
// @include        http://s*.ikariam.*/index.php?*view=island*
// ==/UserScript==


var troopTownsObjs = document.getElementsByClassName("deployedCities");
var troopTowns = new Array();
for (var i = 0; i < troopTownsObjs.length; i++) {
	if (troopTownsObjs[i].nodeName == "OPTION") {
		troopTowns.push(troopTownsObjs[i].value);
	}
}
var islandTowns = document.getElementsByClassName("cityLocation");
for (var i = 0; i < islandTowns.length; i++) {
	console.log(islandTowns[i]);
	var townIdTag = islandTowns[i].getElementsByTagName("a");
	console.log(townIdTag[0]);
	if (townIdTag[0] && townIdTag[0].id.substr(0,5) == "city_") {
		currId = townIdTag[0].id.substr(5)
		if (troopTowns.indexOf(currId) >= 0) {
			console.log("found it");
			var imgTag = document.createElement("img");
			imgTag.src = "skin/relatedCities/general.gif";
			imgTag.height = 15;
			imgTag.width = 15;
			imgTag.setAttribute('style', 'vertical-align:middle; margin-left:-6px; position:relative; top:-1px;');
			var locObj = townIdTag[0].getElementsByClassName("before")[0];
			locObj.parentNode.insertBefore(imgTag, locObj.nextSibling)
		}
	}
}