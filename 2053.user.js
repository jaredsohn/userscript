
// Interchange for Google Maps and Yahoo Maps
// version 0.3 BETA
// 2005-12-17
// Copyright (c) 2005 Josh Staiger, josh@joshstaiger.org
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// * Update 2005-12-17: Thanks to Brendan Rankin for pointing out the fixes necessary
//                      to get Interchange working under Firefox 1.5 + Greasemonkey 0.5+
//
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
// select "Interchange", and click Uninstall.
//
// * text lifted from Mark Pilgrim's Butler
// * http://diveintomark.org/projects/butler/
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// maps.yahoo.com (Yahoo! Maps):
// - adds link to view current location query using Google Maps
// - adds link to view current driving directions query using Google Maps
//
// (In my opinion this script is most useful for using saved Yahoo Maps!
//  addresses with the Google Maps user interface)
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Interchange
// @namespace     http://joshstaiger.org/projects/interchange
// @description	  Adds links to view current Yahoo! Maps locations and driving directions using Google Maps.  
// @include       http://maps.yahoo.com/maps_result*
// @include	  http://maps.yahoo.com/dd_result*
// ==/UserScript==

var GoogleServices = {
	
    // Return the Google Maps URL for displaying the specified location
    getLocationUrl: function(address, cityStateZip, country) {
        var q = escape(address + " " + cityStateZip);
        var s = '<a href="http://maps.google.com/maps?q=' + q + '&hl=en">Google Maps</a>';
        return s;
    },

    // Return the Google Maps URL for displaying the route between
    // the two specified locations
    getRouteUrl: function(addressFrom, cityStateZipFrom, countryFrom, addressTo, cityStateZipTo, countryTo) {
        var q = escape('from: ' + addressFrom + ' ' + cityStateZipFrom + ' ' + 'to: ' + addressTo + ' ' + cityStateZipTo);

        var s = '<a href="http://maps.google.com/maps?q=' + q + '&hl=en">Google Maps</a>';
        return s;
    }
	
}
    
var YahooServices = {

    // Insert text just below the Yahoo Maps navbar 
    // ie: under (Add Maps to My Yahoo! - Edit/Create My Locations)
    addText : function (text) {
        var navbox = document.getElementById("ymapnad");
	    
        if (!navbox) {
            return;
        }

        var textdiv = document.createElement('div');

        textdiv.setAttribute('class', 'interchange');
        textdiv.setAttribute('style', 'background-color:#ff9');

        textdiv.innerHTML = '<p style="padding:.5em">' + text + '</p>';

        navbox.parentNode.insertBefore(textdiv, navbox.nextSibling);
    },

    // Insert links to other map services for locations
    addOtherLocationLinks: function () {

        var s = 'View this location using ';

        var mapForm = document.forms.namedItem("mapForm3"); 

        var address = mapForm.elements.namedItem("addr").value;
        var cityStateZip = mapForm.elements.namedItem("csz").value;
        var Country = mapForm.elements.namedItem("country").value;

        s += GoogleServices.getLocationUrl(address, cityStateZip, Country);

        this.addText(s);

    },

    // Insert links to other map services for driving directions
    addOtherRouteLinks: function() {
	   
        var s = 'View this route using ';

        var ddForm = document.forms.namedItem("dd");
	    
        var addressFrom = ddForm.elements.namedItem("addr").value;
        var cityStateZipFrom = ddForm.elements.namedItem("csz").value;
        var countryFrom = ddForm.elements.namedItem("country").value;

        var addressTo = ddForm.elements.namedItem("taddr").value;
        var cityStateZipTo = ddForm.elements.namedItem("tcsz").value;
        var countryTo = ddForm.elements.namedItem("tcountry").value;

        s += GoogleServices.getRouteUrl(addressFrom, cityStateZipFrom, countryFrom, addressTo, cityStateZipTo, countryTo);

        this.addText(s);
 	    
    }

}

if (!GM_xmlhttpRequest || !GM_log) {
    alert('The Wake County Public Library Lookup script requires Greasemonkey 0.5.3 or higher.  Please upgrade to the latest version of Greasemonkey.');
    return;
}
    
var href = window.location.href;

// Yahoo Maps location
if (href.match(/^http:\/\/maps.yahoo.com\/maps_result/i)) {
    YahooServices.addOtherLocationLinks();	
 }

// Yahoo Maps Driving Directions
if (href.match(/^http:\/\/maps.yahoo.com\/dd_result/i)) {
    YahooServices.addOtherRouteLinks();	
 }

//alert('completed Interchange successfully at' + href);

/*
  TODO:
  - add links from Google Maps back to Yahoo Maps
  - integrate with Mapquest
  - distinguish interchange links from normal page content
  - add help and "about" page
*/
