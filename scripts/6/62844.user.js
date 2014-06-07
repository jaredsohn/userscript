// ==UserScript==
// @name           EbayCase GMap larger
// @namespace      http://userscripts.org/users/119343
// @description    Mappa di Google + ampia nella ricerca di ebaycase
// @include        http://case-appartamenti.ebay.it/*
// ==/UserScript==


// funzione cross-browser per selezionare elementi nella pagina
function getObj(objID)
{
	if (document.getElementById) {return document.getElementById(objID);}
	else if (document.all) {return document.all[objID];}
	else if (document.layers) {return document.layers[objID];}
	else return null;
}

gmap_xl = getObj('gmap');
gmap_xl.style.height='700px';
