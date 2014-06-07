// ==UserScript==
// @name           Geocaching Improved View Map Link
// @namespace      http://svn.ideaharbor.org/greasemonkey
// @description    Replaces the "view map" link on a cache detail page to bypass geocaching.com's "Visualize Waypoints" static maps and link directly to geocaching.com's Google map view.
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==


(function() {
    
        target = document.getElementById('Location');
        if (target) {
                s1 = new String("seek/gmnearest");
                target.innerHTML =target.innerHTML.replace( /map\/getmap/, s1 );
        }

})();

