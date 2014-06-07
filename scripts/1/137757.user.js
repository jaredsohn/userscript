// ==UserScript==
// @name		Google Maps for ks-vuokraisannat.fi
// @namespace	com.secretweapon.ks-vuokraisannat-map
// @description	Adds Google Map to ks-vuokraisannat.fi apartment detail page
// @author 		Simon Otst
// @version		1.2
// @include		http://www.ks-vuokraisannat.fi/apartments/view/*
// ==/UserScript==
(function(window, undefined ) 
{
	if (window.self != window.top){
		return;
	}

	var addMapScript = document.createElement("script");
	addMapScript.type = 'text/javascript';
	addMapScript.text = 
	"function addMap() {" +
	"	var mapContainer = document.createElement('div');" +
	"	if (mapContainer) {" +
	"		var title = document.getElementById('tiedotjakuvat').getElementsByTagName('h2')[0].innerHTML;" +
	"		var address = document.getElementsByName('asunnon_osoite')[0].value;" +
	"		var description = document.evaluate('//*[text()=\"Huoneisto: \"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0).parentNode.innerText;" +
	"		mapContainer.style.width = '860px'; " +
	"		mapContainer.style.height = '400px'; " +
	"		mapContainer.style.margin = '5px'; " +
	"		mapContainer.style.marginRight = '0px'; " +
	"		var geocoder = new google.maps.Geocoder();" +
	
	"		if (geocoder) {" +
	"			geocoder.geocode(" +
	"				{ 'address': address }, " +
	"				function (results, status) {" +
	"					if (status == google.maps.GeocoderStatus.OK) {" +
	"						var latlng = results[0].geometry.location;" +
	
	"						var map = new google.maps.Map(mapContainer, {" +
	"							zoom: 14," +
	"							center: latlng," +
	"							mapTypeId: google.maps.MapTypeId.ROADMAP," +
	"							mapTypeControl: true," +
	"							scrollwheel: true," +
	"							streetViewControl: true" +
	"						});" +
	
	"						var marker = new google.maps.Marker({" +
	"							position: latlng," +
	"							map: map," +
	"							title: title" +
	"						});" +
	
	"						var infowindow = new google.maps.InfoWindow({" +
    "							content: '<p><strong>'+title+'</strong><br /><small>'+description.substr(description.indexOf(':')+2)+'</small></p>', " +
	"							maxWidth: 300" +
	"						});" +
	
	"						google.maps.event.addListener(marker, 'click', function() {" +
	"							infowindow.open(map,marker);" +
	"						});" +
	"						document.getElementsByClassName('apartments view')[0].insertBefore(mapContainer, document.getElementById('tiedotjakuvat'));" +
	"					}" +
	"				}" +
	"			);" +
	"		}" +
	"	}" +
	"}";
	document.head.appendChild(addMapScript);
	
	var mapsApiScript = document.createElement("script");
	mapsApiScript.src = "http://maps.google.fi/maps/api/js?sensor=false&callback=addMap";
	mapsApiScript.type = 'text/javascript';
	mapsApiScript.async = true;
	document.head.appendChild(mapsApiScript);
})(window);