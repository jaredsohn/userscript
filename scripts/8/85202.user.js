// ==UserScript==
// @name           GC.com Owner Line Enhancer
// @namespace      rob3k
// @version        1.2
// @license        Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @description    Adds hides & finds link next to the owner profile link at top of page.
// @include        http*.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==
// Copied code and several functions and modeled on Lil Devil's excellent Bag O' Tricks 
//	script.  This script will work alongside the Bag O' Tricks script.

// ===============================================================================
// Changelog:
// ===============================================================================
// v 1.2 08/08/2011
// * Simplified script and updated so it will work with current geocaching.com
//    site.
// ===============================================================================
// v 1.1  09/08/2010
// * Stripped out functionality implemented in GC.com Show True Owner script.
//	This script is found at http://userscripts.org/scripts/show/85236
// ===============================================================================
// v 1.0  09/02/2010
// * Initial version
// ===============================================================================


var ownerLinkSpan = document.getElementById("ctl00_ContentBody_CacheName").parentNode.nextElementSibling;
var ownerHides = document.getElementById("ctl00_ContentBody_uxFindLinksHiddenByThisUser");
var ownerName = Get_URL_Parameter("u", ownerHides.href);
var ownerHidesFinds = document.createElement("span");
ownerHidesFinds.style.fontWeight = "normal";
ownerHidesFinds.style.color = "#717073";
ownerHidesFinds.style.fontSize = "85%";

ownerHidesFinds.innerHTML = 
' [<a href="http://' + document.domain + '/seek/nearest.aspx?u=' + ownerName + '" title="Owner hides" target="_blank">hides</a>]' + 
' [<a href="http://' + document.domain + '/seek/nearest.aspx?ul=' + ownerName + '" title="Owner finds" target="_blank">finds</a>]';

ownerLinkSpan.parentNode.insertBefore(ownerHidesFinds, ownerLinkSpan.nextSibling);


function Get_URL_Parameter(fieldName, theUrl) {
	if (!theUrl) {
		theUrl = document.location.toString();
	}
	var query_string = theUrl.substring(theUrl.indexOf('?') + 1);
	var re = new RegExp('(^|&)' + fieldName + '=(.*?)(&|#|$)', 'i');
	if (query_string.match(re)) {
		return RegExp.$2;
	}
	return '';
}

