/**
 *  Adds a link to Google maps to see nearby Terracaches. Questions, comments, etc
 *  can be mailed to joshgunnar@gmail.com
 *  (c) 2005 Josh Gunnar joshgunnar@gmail.com
 *
 *  GPL.
 */

// ==UserScript==
// @name          GMaps Terracaching Link
// @namespace     http://home.austin.rr.com/joshgunnar/userscripts
// @description	  Creates a link on GMaps to see nearby Terracaches
// @include       http://maps.google.com/*
// @include       http://maps.google.co.uk/*
// ==/UserScript==

 (function() {
    
    function insertTerracachingLink() {
        var metaPanelDiv = document.getElementById('metapanel');
        if (metaPanelDiv) {
            metaPanelDiv.innerHTML = "<a style=\"text-decoration: none; font-size: smaller\" title=\"Click to see nearby Terracaches\" href=\"javascript:goToTerracaches()\"><img width=\"16px\" height=\"16px\" src=\"http://www.terracaching.com/favicon.ico\"/>&nbsp;Nearby Terracaches</a><br/>" +
                metaPanelDiv.innerHTML;
        }
    }
    
    insertTerracachingLink();
    
    window.goToTerracaches = new Function('window.open("http://www.terracaching.com/tdl.cgi?C=LL&NF=1&CC=-1&SC=-1&PC=-1&" + getTerraLatQueryParams() + "&" + getTerraLonQueryParams(),"Geocache results")');
    window.getTerraLatQueryParams = new Function('degDec = _m.map.getCenterLatLng().y;if (degDec >= 0) { deg = Math.floor(degDec);direction = 1;} else { deg = Math.ceil(degDec);direction = -1;} temp = Math.abs(degDec - deg);temp = temp * 60;decmin = Math.round(temp * Math.pow(10,8)) / Math.pow(10,8);return "CLATNS=" + direction + "&CLATD=" + Math.abs(deg) + "&CLATM=" + decmin;');
    window.getTerraLonQueryParams = new Function('degDec = _m.map.getCenterLatLng().x;if (degDec >= 0) { deg = Math.floor(degDec);direction = 1;} else { deg = Math.ceil(degDec);direction = -1;} temp = Math.abs(degDec - deg);temp = temp * 60;decmin = Math.round(temp * Math.pow(10,8)) / Math.pow(10,8);return "CLONEW=" + direction + "&CLOND=" + Math.abs(deg) + "&CLONM=" + decmin;');
})();