// ==UserScript==
// @name           Panoramio -> Geocaching.com linker
// @namespace      http://kino.wippiespace.com/
// @include        http://www.panoramio.com/map*
// ==/UserScript==
// Based on a script by Josh Inge http://inge.org.uk/
// Author: Jukka Alander @ gmail com
// Updated 22.1.2011
// Just changed where to include this, and it works again.


(function() {
    
    function addGeoLink() {
        var target = document.getElementById('main-menu');
        if (target) {
                target.innerHTML = target.innerHTML + 
            	"<li class=\"last-child\"><a title=\"Show geocaches nearby.\" href=\"javascript: void(document.location); \
				var loka = location.hash; var alku = 4; var lat = loka.slice(alku,alku + 8); var lon = (loka.slice(alku + 13, alku+13+8)); document.location = 'http://www.geocaching.com/seek/nearest.aspx?origin_lat=' + lat + '&origin_long=' + lon; \" id=\"geocaching\">Show Geocaches nearby</a></li>";
        }
    }

    addGeoLink();
})();