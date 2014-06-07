//  Overrides the "Map this" links that automatically show up in GMail when an email contains a US address to instead display a Mapquest map
// version 1.0
// 2006-04-22
// Copyright (c) 2006, Andrew Turner
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MapThis", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES
// 
//
// UUID: 
//
// ==UserScript==
// @name          MapThis
// @namespace     http://www.highearthorbit.com/mapquest/
// @description  Overrides the "Map this" links that automatically show up in GMail when an email contains a US address and instead displays a MapQuest Maps
// @include       http://mail.google.com/*
// ==/UserScript==

(function() {

var userLocation;
function GetUserLocation() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://api.hostip.info/',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://snark/speedlimit/',
        },
        onerror: function(responseDetails) {
            alert('Error getting User Location ' + responseDetails.status +
                  ' ' + responseDetails.statusText + '\n\n' +
                  'Response data:\n' + responseDetails.responseText);
        },
        onload: function(responseDetails) {
            if (responseDetails.status == 200) {
                GM_log('User Location request succeeded and returned ' + responseDetails.status +
                  ' ' + responseDetails.statusText + '\n\n' +
                  'Response data:\n' + responseDetails.responseText);
				var dom = new DOMParser().parseFromString(responseDetails.responseText, 
				            "application/xml"); 
                userLocation = ParseUserLocation(dom);
            } else if (responseDetails.status == 403) {
                GM_log('User Location failed and returned ' + responseDetails.status +
                  ' ' + responseDetails.statusText + '\n\n' +
                  'Response data:\n' + responseDetails.responseText);
            }
        }
    });
}

var ParseUserLocation = function(hostipxml) {
	var location = hostipxml.getElementsByTagNameNS("http://www.opengis.net/gml","name")[1].firstChild.data.split(", ")

	if(location == "(Unknown city)")
		return "";
	
	var country = hostipxml.getElementsByTagName("countryAbbrev")[0].firstChild.nodeValue
	var coordinates = hostipxml.getElementsByTagNameNS("http://www.opengis.net/gml","coordinates")[0].firstChild.data.split(",")

  var string = location[0] ? encodeURIComponent(location[0]) + "," : ",";
	string += location[1] ? encodeURIComponent(location[1]) + "," : ",";
	string += country ? encodeURIComponent(country): "";
	
  return { "locality" : location[0], 
	    	"region" : location[1], 
	    	"country": country,
			"latitude": coordinates[1],
			"longitude": coordinates[0],
			"string" : string
		};
}

 document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
	if(event.target.getAttribute('class') == "re")
	{
		link = event.target.href;
		address = event.target.parentNode.parentNode.innerHTML
		address = address.replace(/<div>(.*)<\/div>(.*)<br>(.*)/, "$2, $3, US");
		if (userLocation != null)
		{
			event.target.href = "http://code.highearthorbit.com/greaseroute/route.rhtml?v=1&userloc=" + userLocation.string + "&dest=" + address + "&dirs=1";	
		}
		else {
			event.target.href = "http://code.highearthorbit.com/greaseroute/map.rhtml?v=1&locs=" + address;	
		}
	}


}, true);

GetUserLocation();

})();

