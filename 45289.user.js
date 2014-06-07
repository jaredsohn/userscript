// ==UserScript==
// @name           CantrIIMapLink
// @namespace      www.cantr.net
// @description    Adds link to map image on location page in CantrII / Hides map in CantrII
// @include        http://www.cantr.net/index.php*
// ==/UserScript==

//1 = enabled. 0 = disabled
MAPLINK=1;		//adds LINK to MAP on location page
MAPLINKDESCRIPTION="MAPA"; 	//DESCRIPTION of the LINK (above)
MAPHIDE=1; 	//HIDEs MAP image on location page
var zestaw,obrazek,odnosnik;

//map
if (MAPLINK || MAPHIDE){
	//searching for map
	zestaw = document.evaluate(
		'//input[@type="image"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < zestaw.snapshotLength; i++) {
		obrazek = zestaw.snapshotItem(i);
		//inserting link to image (map) after the image
		var str=obrazek.src;
		if (str.indexOf('map')>0) {
			odnosnik = document.createElement('div');
			odnosnik.innerHTML='<a href="'+obrazek.src+'">'+ MAPLINKDESCRIPTION +'</a>'
			if (MAPLINK){
				obrazek.parentNode.parentNode.insertBefore(odnosnik,obrazek.parentNode.nextSibling);	
			}
			if (MAPHIDE){
				obrazek.parentNode.parentNode.removeChild(obrazek.parentNode);
			}
		}
	}
};


