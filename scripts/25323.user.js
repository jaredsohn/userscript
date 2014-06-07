/*This script is intended to be used with Craigslist.org. It modifies the location at the bottom of the Item pages and creates a link to the relevant Google Map of that area.
All location listings will work, as long as they are a valid address. Any incomplete addresses will give you the most likely map and will give you a list of alternates to
choose from.
*/

// ==UserScript==
// @name          Craigslist_GoogleMaps_link 1.0
// @namespace     http://www.modhotspot.com
// @description   Adds a link to a Google Map of where the listed item is located.
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
    
    var newform = '<a href="http://maps.google.com/maps?f=q&hl=en&geocode=&q=LOCATION" target="_blank">LOCATION</a>';
    var link = newform.replace("TOWN", town).replace("STATE",state).replace(/LOCATION/g,location);

    
    if (oldform.match("Location:")) {
        document.getElementsByTagName('li')[0].innerHTML=("Location: "+link);
    };
})();

