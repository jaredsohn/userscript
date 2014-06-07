//
//  Adds a link to Google maps to show the latitude/longitude of the map centre.
//  (C) Copyright James Inge 2006-9.
//
//  v0.4 - Updated to match Google changing underscores to hyphens in their class names.
//  v0.3 - Updated to match change in Google Maps page structure.
//  v0.2 - Updated to match change in Google Maps layout
//
//  GPL.
//

// ==UserScript==
// @name          Google Maps Show Coords Link
// @namespace     http://inge.org.uk/userscripts
// @description	  Creates a link on Google Maps to show the map centre coordinates.
// @include       http://maps.google.com/*
// @include       http://maps.google.co.uk/*
// @include       http://www.google.com/local*
// @include       http://www.google.co.uk/local*
// @include       http://www.google.com/maps*
// @include       http://www.google.co.uk/maps*
// @include       http://www.google.com.hk/maps*
// @include       http://maps.google.com.hk/maps*
// @include       http://www.google.com.hk/*
// @include       http://maps.google.com.hk/*
// ==/UserScript==

(function() {

  	function addGeoLink() {
		var targets = document.evaluate("//div[@id='links']/ul[@class='leaf-links']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (targets.snapshotLength == 1) {
			targets.snapshotItem(0).innerHTML +=
			"<li>&nbsp;<img class=\"bar-icon-divider bar-divider\" src=\"/intl/en_uk/mapfiles/transparent.png\" />&nbsp;</li><li><a title=\"Click to show coordinates at map centre.\" href=\"javascript: void(url = gApplication.getPageUrl()); if( url.search('&ll=') != -1 ) { url2 = url.slice(url.search('&ll=')+4); url = url2.slice(0,url2.search('&')); void(document.getElementById('coordtxt').innerHTML=url);void(document.getElementById('coordtxt2').value =url);} \" id=\"coord\"><img width=\"16px\" height=\"16px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH2AkXFCAH4qiDGAAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAAARnQU1BAACxjwv8YQUAAAJfSURBVHjapVNLaFNREJ25LzavwSC11orSCupGa83HRRGFxlKlqMU2aRA3bXcV%2B6QiiAjKIwjWTUHyAxVUEEET46a4cuGPdqMksTQquJDixtoKVdoS8rnjvMTYNEY3Djzum3vn3Dlz5g5Chdk8AReCGBKCfhBhGoCaEdABSPME8CSbzoWnx8%2FOGrFEgFgOdrgDHhDCmf%2B%2BfHXq6fml0v4ur15jhoYTQHiB3Sa%2B6FoGv46lIr4srmQOtihC7I9HT980fLs7eAQVaEtENX0lhS4cnoZBQAjxNxmPaJ2idIQCTpbAhuUV%2BgwE3asL9MlETLuNSCPsrHUN6uYidW%2Bwy%2B4Od1bq4egLvoR23QR%2FMV0HUTgkiT3Jb7PanyEUdm5o3BcHeMVJdiBQhyTRxmsrc942%2Fi7nNxXpy3p44ctVwjM5%2BbpmjbjLTOY5akECfeJufOSLU0aHBIi%2BIj1Cq7HsPXbDQmq2l1U%2BxG4zt%2BkZSJjhboWTj4YnKxM4vYGhgogcYAJvRJFqdooQbzEwnpibO5yMaVc46ygIuFxNA5kHa%2BECVjW9Z2FGZVr9kKedDPSXSnob01JGzTbv2JZysMFWKFD3S0S4L9ZZBphmuKrcRBMC1QP897C0lavNHWTwhwKDZGz4AUd1tBwPNVXFI0ZJSrV8TwCNENK93y9xd%2Ff1RpNZiXAZIaYdgX%2BYwxM6xQ%2Bvfzs8d62ahdajo3UmizXIqtYz7UuJ2Jk35edb2%2B%2Bo6zcuXUSCnuV8puv943NfsFoGe6%2FfBooyIJA2c0sXeWuRA2slwCYknOBhCxnDZkwj%2FK%2F9BHj47IkKg5bPAAAAAElFTkSuQmCC\"/>&nbsp;<span id=\"coordtxt\">現在坐標</span></a><input id=\"coordtxt2\" type=\"text\"  onClick=\"document.getElementById('coordtxt2').focus();document.getElementById('coordtxt2').select();\"></li>";
		}
	}

	addGeoLink();
})();