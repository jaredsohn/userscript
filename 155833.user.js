// ==UserScript==
// @name        DayZDB Taviana map coords fix
// @namespace   https://userscripts.org/users/206653
// @include     http://dayzdb.com/map/taviana*
// @version     1.01
// @grant       none
// ==/UserScript==

function patch()
{
	unsafeWindow.fromLatLngToGps=function(a){var b=(-parseInt(fromCoordToGps(a.lat),10)+255).toString();return fromCoordToGps(a.lng)+" "+b};
}
onload=patch;
