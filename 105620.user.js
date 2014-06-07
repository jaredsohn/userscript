// ==UserScript==
// @name                Google Maps for Etuovi.com
// @namespace	        http://github.com/jarnoan
// @description	        Changes Etuovi.com to use Google Maps
// @include		http://kuluttaja.etuovi.com/crometapp/product/realties/common/public/search/item/item.jsp?*
// @include		http://kuluttaja.etuovi.com/kohde/*
// @version		1.1
// ==/UserScript==

function main() {
	var mapReplaceScript = document.createElement("script");
	mapReplaceScript.type = 'text/javascript';
	mapReplaceScript.text = 
	"function replaceMap() {" +
	"	var map = document.getElementById('maplocation_map');" +
	"	if (map) {" +
	"		var mapContainer = map.parentNode;" +
	"		mapContainer.style.height = '306px'; " +
	"		var latlng = new google.maps.LatLng(map_centerpoint_x, map_centerpoint_y);" +
	"		var map = new google.maps.Map(mapContainer, {" +
	"			zoom: 14," +
	"			center: latlng," +
	"			mapTypeId: google.maps.MapTypeId.ROADMAP," +
	"			mapTypeControl: false," +
	"			scrollwheel: false," +
	"			streetViewControl: true" +
	"		});" +
	"		var marker = new google.maps.Marker({" +
	"			position: latlng," +
	"			map: map" +
	"		});" +
	"		var bigMapLink = document.createElement('a');" +
	"		bigMapLink.href = 'http://maps.google.fi/maps?z=14&t=m&q=loc:' + latlng.lat() + ',' + latlng.lng() + '+(' + escape(document.title) + ')';" +
	"		bigMapLink.innerHTML = 'Suurempi kartta';" +
	"		bigMapLink.target = '_blank';" +
	"		mapContainer.parentNode.insertBefore(bigMapLink, mapContainer.nextSibling);" +
	"	}" +
	"}";
	document.head.appendChild(mapReplaceScript);

	var mapsApiScript = document.createElement("script");
	mapsApiScript.src = "http://maps.google.fi/maps/api/js?sensor=false&callback=replaceMap";
	mapsApiScript.type = 'text/javascript';
	mapsApiScript.async = true;
	document.head.appendChild(mapsApiScript);
}

main();
