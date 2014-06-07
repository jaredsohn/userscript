/*This script is intended to be used with Craigslist.org. It modifies the location at the bottom of the Item pages and creates a
link to the relevant Google and Mapquest Maps of that area.

For Google Maps:
All location listings will work, as long as they are a valid address. Any incomplete addresses will give you the most likely map
and will give you a list of alternates to choose from.

For Mapquest Maps:
Certain location listings will not work, but any standalone City name, City and State with a comma delimiter, and any listing
that includes a Zip code will pull up the correct map for that area.
*/

// ==UserScript==
// @name          Craigslist+Mapquest+GoogleMaps_linker 1.0
// @namespace     http://www.modhotspot.com
// @description   Adds a link to the Google and Mapquest maps of the Craigslist item's location.
// @include       http://*.craigslist.org/*
// ==/UserScript==

(function() {

    var oldform = document.getElementsByTagName('li')[0].innerHTML;
    var location = oldform.substr(11, oldform.length);
    var place = location.split(",");
    var town = place[0];

    if (typeof place[1] != "undefined"){
        var state = place[1];
    }else{
        var state = '';
    }
    
    var GoogleTemplate = '<a href="http://maps.google.com/maps?f=q&hl=en&geocode=&q=LOCATION" target="_blank">Google Maps</a>';
    var GoogleLink = GoogleTemplate.replace(/LOCATION/g,location);

    if (zip=oldform.match(/\d{5}/)){
                
        var MqTemplate = '<a href="http://www.mapquest.com/maps/ZIP/" target="_blank">Mapquest</a>';
        var MqLink = MqTemplate.replace("ZIP", zip).replace("LOCATION",location);

    }else{
        
        var place = location.split(",");
        
        var town = place[0];
        if (typeof place[1] != "undefined"){
            var state = place[1];
        }else{
            var state = '';
        }
        
        var MqTemplate = '<a href="http://www.mapquest.com/maps/map.adp?formtype=address&country=US&city=TOWN&state=STATE" target="_blank">Mapquest</a>';
        var MqLink = MqTemplate.replace("TOWN", town).replace("STATE",state).replace("LOCATION",location);
    }

    if (oldform.match("Location:")) {
        document.getElementsByTagName('li')[0].innerHTML=(oldform + "&nbsp &nbsp" + MqLink + "&nbsp &nbsp " + GoogleLink);
    };
})();