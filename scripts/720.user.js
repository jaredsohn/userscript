/**
 *  Adds a link to Google maps to see nearby geocaches. Questions, comments, etc
 *  can be mailed to joshgunnar@gmail.com
 *  (c) 2005 Josh Gunnar joshgunnar@gmail.com
 *
 *  GPL.
 */

// ==UserScript==
// @name          GMaps Geocaching Link
// @namespace     http://home.austin.rr.com/joshgunnar/userscripts
// @description	  Creates a link on GMaps to see nearby geocaches
// @include       http://maps.google.com/*
// @include       http://maps.google.co.uk/*
// ==/UserScript==

(function() {
    
    function insertGeocachingLink() {
        var metaPanelDiv = document.getElementById('metapanel');
        if (metaPanelDiv) {
            var lat = _m.map.getCenterLatLng().y;
            var longitude = _m.map.getCenterLatLng().x;
            
            metaPanelDiv.innerHTML = "<a style=\"text-decoration: none; font-size: smaller\" title=\"Click to see nearby geocaches\" href=\"javascript:goToGeocaches()\"><img width=\"16px\" height=\"16px\" src=\"http://www.geocaching.com/Favicon.ico\"/>&nbsp;Nearby Geocaches</a><br/>" +
                metaPanelDiv.innerHTML;
        }
    }
    
    insertGeocachingLink();
    window.goToGeocaches = new Function('window.open("http://www.geocaching.com/seek/nearest.aspx?lat=" + _m.map.getCenterLatLng().y + "&lon=" + _m.map.getCenterLatLng().x,"Geocache results")');
})();