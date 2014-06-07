// Hello World! example user script
// version 0.1 BETA!
// 2010-11-25
// Copyright (c) 2010, Stuart Jones
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Garmin Connect Regoogle", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Garmin Connect Regoogle
// @namespace     http://gingerbbm.com/
// @description   Script to replace Bing Maps in Garmin Connect with Google Maps
// @include       http://connect.garmin.com/*
// ==/UserScript==

alert('Regoogle');

/*
This is what it WILL do WHEN IT IS FINISHED:
- Open the relevant KML file for the current activity (window.ACTIVITY_ID)
- Strip the placemarkers and fix up the XML
- Send the text to the parseString() method of the alternative (3rd party) GeoXML class
- Create a Google Maps map
- Destroy the Bing Map
- Supplant with the Google Maps map
*/
