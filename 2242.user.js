// Googlemaps for Superpages
// version 0.1 
// 2005-11-01
// Copyright (c) 2005 Mark Chackerian, greasemonkey@chackerian.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// thanks to Josh Staiger!
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// yellowpages.superpages.com (Superpages yellow pages maps)
// www.whitepages.com (whitepages people finder)
// - adds link to view current location query using Google Maps
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Googlemaps for superpages.com and whitepages.com
// @namespace     http://www.picturedots.com/projects/interchange
// @description	  Adds links to view current Superpages Maps locations using Google Maps.  
// @include       http://yellowpages.superpages.com/supermaps/*
// @include       http://www.whitepages.com/*/map/map*
// ==/UserScript==

(function() {

    var GoogleServices = {
	
	// Return the Google Maps URL for displaying the specified location
	getLocationUrl: function(address, cityStateZip, country) {
	    var q = escape(address + " " + cityStateZip);
	    var s = '<a href="http://maps.google.com/maps?q=' + q + '&hl=en">Google Maps</a>';
	    return s;
	},

	// Return the Google Maps URL for displaying the route between
	// the two specified locations
	getRouteUrl: function(addressFrom, 
			      cityStateZipFrom, 
			      countryFrom,
			      addressTo,
			      cityStateZipTo,
			      countryTo) {
	    	    var q = escape('from: ' + addressFrom + ', ' + cityStateZipFrom + ' ' + 'to: ' + addressTo + ' ' + cityStateZipTo);

	    var s = '<a href="http://maps.google.com/maps?q=' + q + '&hl=en">Google Maps</a>';
	    return s;
	}
	
    }
    

    var Superpages = {

	// Insert text just after the save link 

	addText : function (text) {
	    var allLinks, thisLink, saveLink;
	    allLinks = document.evaluate(
					 '//a[@href]',
					 document,
					 null,
					 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					 null);
	    for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		// do something with thisLink
		if (thisLink.innerHTML == "save") {
		    saveLink = thisLink;
		}
	    }

	    if (!saveLink) {
		return;
	    }

	    var textdiv = document.createElement('div');
	    textdiv.setAttribute('style', 'background-color:#ff9');
	    textdiv.innerHTML = '<p style="padding:.4em">' + text + '</p>';
	    saveLink.parentNode.insertBefore(textdiv, saveLink.nextSibling);
	},


	// Insert links to other map services for locations
	addOtherLocationLinks: function () {

	    var s = 'View this location using ';
	    href.match(/mapinit.jsp\?.*\&streetaddress=(.*)\&city=(.*)\&state=(\w\w)\&zip=(\d{5})/);
	    var address =RegExp.$1;
	    var cityStateZip =RegExp.$2 + "," + RegExp.$3 + " " + RegExp.$4;
	    var Country = "";
	    s += GoogleServices.getLocationUrl(address, cityStateZip, Country);

	    this.addText(s);

	},

    }

    var Whitepages = {

	// Insert text just address on the screen
	addText : function (text) {
	    var allSpans, thisSpan, saveSpan;
	    allSpans = document.evaluate(
					 "//span[@class='subtext']",
					 document,
					 null,
					 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					 null);
	    for (var i = 0; i < allSpans.snapshotLength; i++) {
		thisSpan = allSpans.snapshotItem(i);
		// do something with thisSpan
		if (thisSpan.innerHTML.match(/Mapped Address/) ) {
		    saveSpan = thisSpan;
		    break;
		}
	    }

	    if (!saveSpan) {
		return;
	    }

	    var textdiv = document.createElement('div');
	    textdiv.setAttribute('class', 'subtext');
	    textdiv.setAttribute('style', 'background-color:#ff9');
	    textdiv.innerHTML = '<p style="padding:.4em">' + text + '</p>';
	    saveSpan.parentNode.insertBefore(textdiv, saveSpan.nextSibling);
	},


	// Insert links to other map services for locations
	addOtherLocationLinks: function () {

	    var s = 'View this location using ';
	    href.match(/map\/map\?CountryRegion=(\w*).*\&Subdivision=(\w*)\&AddressLine=(.*)\&PrimaryCity=(.*)\&PostalCode=(\d{5})/);
	    var address =RegExp.$3;
	    var cityStateZip =RegExp.$4 + "," + RegExp.$2 + " " + RegExp.$6;
	    var Country = RegExp.$1;
	    s += GoogleServices.getLocationUrl(address, cityStateZip, Country);

	    this.addText(s);

	},

    }

    var href = window._content.location.href;

    // Superpages Maps location
    if (href.match(/^http:\/\/yellowpages.superpages.com\/supermaps\/mapinit.jsp/i)) {
	Superpages.addOtherLocationLinks();
    }
    // Whitepages Maps location
    if (href.match(/^http:\/\/www.whitepages.com\/.*\/map\/map\?/i)) {
	Whitepages.addOtherLocationLinks();
    }

})();
