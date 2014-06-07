// GeoPortail Extras
// Copyright (c) 2006-2009, Franck Quélain
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "geoportail_extras", and click Uninstall.
//
// --------------------------------------------------------------------
// CHANGELOG
//
// 2006-07-26 : 
//  * First version. Worked few months before Geoportail API changed :( 
//  * Link to Google Maps with a default zoom
//  * Permanent link
// 2009-04-12 :
//  * Worked again \o/ 
//  * Work in Opera now
//  * Well integrated in the navigation bar of the geoportail
//  * Permanent link removed (Implemented in the Geoportail ... badly)
//  * Link to Google Maps with quasi-identical zoom
//  * Link to Live Search Maps with quasi-identical zoom
//  * Link to OpenStreetMap with quasi-identical zoom
// --------------------------------------------------------------------
// TODO :
//   * Permalink with latitude and longitude 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            geoportail_extras
// @namespace       http://infernal-quack.net/
// @description     Geoportail Extras! - version 2009.04.12
// @include         http://*.geoportail.fr/*/visu*
// @include         http://*.geoportail.fr/visu*
// ==/UserScript==

(function(){
    // To work with Opera
    var geoportailWindow = this.unsafeWindow || window;

    var extras = document.createElement("li");
    extras.setAttribute("id", "rub42");
    extras.setAttribute("onmouseover","if(typeof(showSub)=='function'){showSub(42);}");
    extras.setAttribute("onmouseout","if(typeof(hideRub)=='function'){hideRub(42);}");

    var extrasLink = document.createElement("a");
    extrasLink.setAttribute("href","#");
    extrasLink.setAttribute('title', 'Options supplémentaires proposées par le script GreaseMonkey geoportail_extras');
    var extrasText = document.createTextNode("✪ Extras ✪");
    
    extrasLink.appendChild(extrasText);
    extras.appendChild(extrasLink);

    var mainNav = document.getElementById("mainNav");
    var liNav = document.getElementById("liTab");
    mainNav.insertBefore(extras, liNav);

    var extrasUl=document.createElement("ul");
    extrasUl.setAttribute("style","display: none;");
    extrasUl.className="subMenu";
    extras.appendChild(extrasUl);

    // ------ Link to Google Maps
    var extrasGoogleLi = document.createElement('li');
    extrasUl.appendChild(extrasGoogleLi);
    var extrasGoogleLink = document.createElement('a');
    extrasGoogleLink.setAttribute('id', 'extrasGoogleLink');
    extrasGoogleLink.setAttribute("href","#");
    extrasGoogleLink.setAttribute('title', "Ouverture de ce lieu dans Google Maps dans une fenêtre externe");
    extrasGoogleLi.appendChild(extrasGoogleLink);
    var extrasGoogleText = document.createTextNode("➤ Google Maps");
    extrasGoogleLink.appendChild(extrasGoogleText);
    function linkToGoogleMaps() {
	var echelle=geoportailWindow.__gestionnaire.carte.getEchelle();
	var zoomGoogle = Math.round(20.9-0.9*echelle);

	var long=geoportailWindow.__gestionnaire.carte.client.mapGetCenterX();
	var lat=geoportailWindow.__gestionnaire.carte.client.mapGetCenterY();

        window.open("http://maps.google.com/?ll=" + lat + "," + long +"&z=" + zoomGoogle);
    }
    extrasGoogleLink.addEventListener("click", linkToGoogleMaps, false);

    // ------ Link to Live Search Maps
    var extrasLiveSearchLi = document.createElement('li');
    extrasUl.appendChild(extrasLiveSearchLi);
    var extrasLiveSearchLink = document.createElement('a');
    extrasLiveSearchLink.setAttribute('id', 'extrasLiveSearchLink');
    extrasLiveSearchLink.setAttribute("href","#");
    extrasLiveSearchLink.setAttribute('title', "Ouverture de ce lieu dans Live Search Maps dans une fenêtre externe");
    extrasLiveSearchLi.appendChild(extrasLiveSearchLink);
    var extrasLiveSearchText = document.createTextNode("➤ Live Search Maps");
    extrasLiveSearchLink.appendChild(extrasLiveSearchText);
    function linkToLiveSearchMaps() {
	var echelle=geoportailWindow.__gestionnaire.carte.getEchelle();
	var zoomLiveSearch = Math.round(370/17-16/17*echelle);

	var long=geoportailWindow.__gestionnaire.carte.client.mapGetCenterX();
	var lat=geoportailWindow.__gestionnaire.carte.client.mapGetCenterY();

        window.open("http://maps.live.com/?style=h&cp=" + lat + "~" + long +"&lvl=" + zoomLiveSearch);
    }
    extrasLiveSearchLink.addEventListener("click", linkToLiveSearchMaps, false);

    // ------ Link to OpenStreetMap
    var extrasOpenStreetMapLi = document.createElement('li');
    extrasUl.appendChild(extrasOpenStreetMapLi);
    var extrasOpenStreetMapLink = document.createElement('a');
    extrasOpenStreetMapLink.setAttribute('id', 'extrasOpenStreetMapLink');
    extrasOpenStreetMapLink.setAttribute("href","#");
    extrasOpenStreetMapLink.setAttribute('title', "Ouverture de ce lieu dans OpenStreetMap dans une fenêtre externe");
    extrasOpenStreetMapLi.appendChild(extrasOpenStreetMapLink);
    var extrasOpenStreetMapText = document.createTextNode("➤ OpenStreetMap");
    extrasOpenStreetMapLink.appendChild(extrasOpenStreetMapText);
    function linkToOpenStreetMap() {
	var echelle=geoportailWindow.__gestionnaire.carte.getEchelle();
	var zoomOpenStreetMap = Math.round(370/17-16/17*echelle);

	var long=geoportailWindow.__gestionnaire.carte.client.mapGetCenterX();
	var lat=geoportailWindow.__gestionnaire.carte.client.mapGetCenterY();

        window.open("http://www.openstreetmap.org/?lat=" + lat + "&lon=" + long +"&zoom=" + zoomOpenStreetMap);
    }
    extrasOpenStreetMapLink.addEventListener("click", linkToOpenStreetMap, false);

    // ------ Link to Panoramio
    var extrasPanoramioLi = document.createElement('li');
    extrasUl.appendChild(extrasPanoramioLi);
    var extrasPanoramioLink = document.createElement('a');
    extrasPanoramioLink.setAttribute('id', 'extrasPanoramioLink');
    extrasPanoramioLink.setAttribute("href","#");
    extrasPanoramioLink.setAttribute('title', "Ouverture de ce lieu dans Panoramio dans une fenêtre externe");
    extrasPanoramioLi.appendChild(extrasPanoramioLink);
    var extrasPanoramioText = document.createTextNode("♥ Panoramio");
    extrasPanoramioLink.appendChild(extrasPanoramioText);
    function linkToPanoramio() {
	var echelle=geoportailWindow.__gestionnaire.carte.getEchelle();
	var zoomPanoramio = Math.round(15/16*echelle-77/17);

	var long=geoportailWindow.__gestionnaire.carte.client.mapGetCenterX();
	var lat=geoportailWindow.__gestionnaire.carte.client.mapGetCenterY();

        window.open("http://www.panoramio.com/map/#lt=" + lat + "&ln=" + long +"&z=" + zoomPanoramio);
    }
    extrasPanoramioLink.addEventListener("click", linkToPanoramio, false);
}
)();


