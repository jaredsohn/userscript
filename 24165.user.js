/*This script is intended to be used with Craigslist.org. It modifies the location at the bottom of the Item pages and creates a link to the relevant Mapquest map of that area.
Certain location listings will not work, but any standalone City name, City and State with a comma delimiter, and any listing that includes a Zip code will pull up the correct
map for that area.
*/

// ==UserScript==
// @name          Craigslist_Mapquest_link 1.0
// @namespace     http://www.modhotspot.com
// @description	  Adds a link to a mapquest map of where the listed item is located.
// @include       http://*.craigslist.org/*
// ==/UserScript==

(function() {

	var oldform = document.getElementsByTagName('li')[0].innerHTML;
	var location = oldform.substr(11, oldform.length);
	
	if (zip=oldform.match(/\d{5}/)){
				
		var newform = '<a href="http://www.mapquest.com/maps/ZIP/" target="_blank">LOCATION</a>';
		var link = newform.replace("ZIP", zip).replace("LOCATION",location);

	}else{
		
		var place = location.split(",");
		
		var town = place[0];
		if (typeof place[1] != "undefined"){
			var state = place[1];
		}else{
			var state = '';
		}
		
		var newform = '<a href="http://www.mapquest.com/maps/map.adp?formtype=address&country=US&city=TOWN&state=STATE" target="_blank">LOCATION</a>';
		var link = newform.replace("TOWN", town).replace("STATE",state).replace("LOCATION",location);
	}
	
	if (oldform.match("Location:")) {
		document.getElementsByTagName('li')[0].innerHTML=("Location: "+link);
	};
})();

