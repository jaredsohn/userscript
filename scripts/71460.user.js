/* (C) Copyright 2010-2012 Basique. Licensed under the MIT License
 *
 * based on "Google Maps Show Coords Link" : 
 * (C) Copyright 2006-2010 James Inge.  Licensed under the MIT License
 *
 * with help from "Google Maps Geocaching Link" :
 * (C) Copyright 2011-2012 David Fichtmueller. Licensed under the MIT License
 */
 
// ==UserScript==
// @name           Google Maps Bing Maps Link
// @namespace      Basique
// @description    Creates a link on Google Maps to view the map on Bing Maps
// @include        http://maps.google.tld/*
// @include        https://maps.google.tld/*
// @license        MIT License; http://www.opensource.org/licenses/mit-license.php
// ==/UserScript==

GM_registerMenuCommand("GMaps: Set Bing Maps URL", set_url);

var url = (GM_getValue('url','http://www.bing.com/maps/default.aspx?v=2&cp=<lat>~<lon>&lvl=<zoom>&sty=r'));

function set_url() {
    url = prompt('URL', url);
    GM_setValue('url', url);
}

(function() {
    function addBingMapsLink() {
        var targets = document.evaluate("//ol[@id='gbzc']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (targets.snapshotLength == 1) {
            var js = "javascript: void(url = gApplication.getPageUrl()); if( url.search('&ll=') != -1 ) { coords = url.slice(url.search('&ll=')+4); coords = coords.slice(0,coords.search('&')); lat = coords.slice(0,coords.indexOf(',')); long=coords.slice(coords.indexOf(',')+1); zoom = url.slice(url.search('&z=')+3); url='" + url + "';document.location=url.replace('&lt;lat&gt;', lat).replace('&lt;lon&gt;', long).replace('&lt;zoom&gt;', zoom); return false;} else {alert('No coordinates available.\\nPlease move map a little and try again.');} ";
            targets.snapshotItem(0).innerHTML +=
            "<li class=gbt><a onclick=\"" + js + "\"class=gbzt href=\"#\"><span class=gbtb2></span><span class=gbts>View on Bing Maps</span></a></li>";
        }
    }
    addBingMapsLink();
})();
