// CTA on Google Maps Greasemonkey script
// version 0.1
// 2005-04-19
// Copyright (c) 2005, Adrian Holovaty
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// See http://www.holovaty.com/blog/archive/2005/04/19/0216
//
// Changelog:
// 0.1 (2005-04-19) -- Original release after a fun night's hacking.
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
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// --------------------------------------------------------------------
//
// TODO:
// * Use data: URIs, embedding the images into this script, instead of
//   hard-coding the letitblog.com/cta calls.
// * Add more zoom levels. (This just requires mindless Photoshop work.)
// * Find a cleaner way to reset the toggle links that doesn't involve
//   innerHTML = ''.
// * Make the CTA map line up better with Google's map.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            CTA on Google Maps
// @namespace       http://www.holovaty.com/code/firefox/greasemonkey/
// @description     Adds Chicago Transit Authority map functionality to Google Maps.
// @include         http://maps.google.com/*
// ==/UserScript==

(function() {
    /*
    This script adds "CTA map" as a choice on Google Maps. (The "official"
    current choices are Map and Satellite.)

    Basically, this happens by accessing the _m.map.mapTypes JavaScript
    variable, which is a list of map-spec objects. Each map-spec object defines
    how the particular map is displayed. This script creates a custom map-spec
    object, appends it to that list and refreshes the "toggle links," which is
    the section of the Google Maps interface that allows a user to switch
    between map views.
    */

    function copy_obj(o) { var c = new Object(); for (var e in o) { c[e] = o[e]; } return c; }

    // Google Maps conveniently provides the default map-spec objects as
    // non-obfuscated variables. Rather than redefining the entire map-spec
    // interface, just copy _GOOGLE_MAP_SPEC as a starting point. And doing
    // "var cta = _GOOGLE_MAP_SPEC" won't work, because JavaScript copies by
    // reference. If you wanted to use the satellite map as a starting point,
    // you'd use _KEYHOLE_SPEC here.
    var cta = copy_obj(_GOOGLE_MAP_SPEC);

    // Google Maps will request the tiled map images from the following URL.
    // This (obviously) is a custom server-side script that I've set up.
    // Ideally the images themselves would be embedded within this Greasemonkey
    // script, so my server doesn't get pounded (and users maintain privacy).
    cta.baseURL="http://letitblog.com/cta?";

    // This adds the small, red "New!" text. :-)
    cta.isNew = true;

    // This is the map's display name.
    cta.getLinkText = function() { return 'CTA map'; }

    // This is a hard-coded limit on how far a user can zoom out. If it's set
    // to 1, only the farthest-in zoom will work, etc. Because this script
    // currently works only on zoom level 4, setting this wouldn't be helpful.
    // cta.numZoomLevels = 1;

    // Register the new map spec.
    _m.map.mapTypes[_m.map.mapTypes.length] = cta;

    // (Slightly dirty.) Refresh the display that allows a user to switch
    // between views.
    _el('toggle').innerHTML = '';
    _m.map.createSpecToggleLinks(_el('toggle'));
})();
