// ==UserScript==
// @name           Fix Eniro links
// @namespace      maeki.org
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

var enirolink = document.getElementById("ctl00_ContentBody_MapLinks_MapLinks").childNodes[1].childNodes[0];

var urlparams = enirolink.href.match(/3B([1-3][0-9]\.[0-9]+).*3B([5-7][0-9].[0-9]+)/);
var lat = urlparams[2];
var lon = urlparams[1];
enirolink.href = "http://www.eniro.fi/kartta/?zoomLevel=16&radius=1&latitude="+ lat + "&longitude=" + lon;
