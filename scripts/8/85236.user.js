// ==UserScript==
// @name           GC.com Show True Owner
// @namespace      rob3k
// @version        1.3
// @license        Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @description    Adds official username as title (hover text) to owner URL at top of every cache page.
// @include        http*.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==
// Script uses several GM_ functions that are probably not supported by Opera and Google Chrome.  Will likely see
//	basic functionality only with those browsers.    Copied code and several functions and modeled on Lil 
//	Devil's excellent Bag O' Tricks script.  This script will work alongside the Bag O' Tricks script.

// ===============================================================================
// Changelog:
// ===============================================================================
// v 1.3 08/09/2011
// * Simplified script and updated so it will work with current geocaching.com site.
// * Removed icognito icon functionality
// * Now the cache owner name is displayed within quotes (i.e. scare quotes) if the
//     true owner name differs from the entered placed by name.
// ===============================================================================
// v 1.2  09/09/2010
// * Fixed code so that default behavior is functional in browsers other than Firefox.
//	 Previously, the icon would not display. 
// * Cleaned up code to allow easier updating of default values for non-Firefox 
//	 browsers.  Two lines of code require simple updates if something other than
//	 default behavior is desired.
// ===============================================================================
// v 1.1  09/08/2010
// * Fix problem where spaces in an owner name show up as "+".
// * Added call to decodeURI to decode escaped characters.
// * Added icognito icon which gives visual cue that owner name differs from 
//	 caches placed by entry.  Configurable via User Command.
// * Added ability to replace pseudo cache owner name with true owner name on the
//	 cache page.  This is disabled by default.  Configurable via User Command.
// ===============================================================================
// v 1.0  09/02/2010
// * Initial version
// ===============================================================================

// ===============================================================================
// Configuration:
// ===============================================================================
// Icognito Icon
//	Description:
//		Displays icon next to placed by name if different than the true owner name.
//		This is enabled by default.  
//		To configure, use the 'GC.com Show True Owner - Display Icon?' User Command.
//		See: http://wiki.greasespot.net/Greasemonkey_Manual:Monkey_Menu for 
//			information on accessing User Commands.
// ===============================================================================
// Modify Placed By Name
//	Description:
//		Changes Placed By name at top of cache page to the true owner name.  
//		The hover text will then display the pseudo CO name.
//		This is disabled by default.
//		To configure, use the 'GC.com Show True Owner - Display True CO?' User Command.
//		See: http://wiki.greasespot.net/Greasemonkey_Manual:Monkey_Menu for 
//			information on accessing User Commands.
// ===============================================================================

//Setting defaults, used for non-Firefox browsers (e.g. Chrome, Opera)  Modify below
//	values if you wish to change the default behavior.  In Firefox this will be
//	overwritten based on value of GM_getValue so no need to modify.
var modifyPlacedBy = false;

//Reads configuration values and sets up User Script Commands.  Only executed if GM_
//	functions are supported.
if (!(!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1)) {
	modifyPlacedBy = GM_getValue('displayTrueCO', false);
	GM_registerMenuCommand("GC.com Show True Owner - Display True CO?", modifyCOUserMenu);
}

//Grab owner name from 'A cache by ...' link at top of cache page.
var ownerLinkSpan = document.getElementById("ctl00_ContentBody_CacheName").parentNode.nextElementSibling;
if (!ownerLinkSpan) { return; }
var ownerLink = ownerLinkSpan.getElementsByTagName("a");
if (ownerLink[0]) {
    var ownerLinkText = ownerLink[0].innerHTML;
} else {
    return;
}

//Grab true owner name from Hides link at bottom of cache page.
var ownerHides = document.getElementById("ctl00_ContentBody_uxFindLinksHiddenByThisUser");
if (!ownerHides) { return; }
var ownerName = Get_URL_Parameter("u", ownerHides.href);
if (!ownerName) { return; }
ownerName = decodeURI(ownerName);
ownerName = ownerName.replace("+", " ");



/*
if (showIcognitoIcon) {
	var icognitoIcon = document.createElement('span');
	icognitoIcon.style.fontWeight = 'normal';
	if (ownerLinkText.toLowerCase() != ownerName.toLowerCase()) {
		var icognitoIconText = '<img src="'+icongitoIcon+'" height="12px" width = "12px" alt="Icognito Owner" title="' + ownerName + ' is the true owner"/>';
	      ownerLinkSpan.innerHTML = ownerLinkSpan.innerHTML.substring(0, ownerLinkSpan.innerHTML.indexOf("by")+3) +
			icognitoIconText + ownerLinkSpan.innerHTML.substring(ownerLinkSpan.innerHTML.indexOf("by")+3, ownerLinkSpan.innerHTML.length)

	}
}
*/

if (ownerLinkText.toLowerCase() != ownerName.toLowerCase()) {
	if (modifyPlacedBy) {
		ownerLink[0].title = "'" + ownerLink[0].innerHTML + "' is the pseudo cache owner name.";
		ownerLink[0].innerHTML = ownerName;
	} else {
		ownerLink[0].title = "'" + ownerName + "' is the true cache owner name.";
		if (ownerLinkText.toLowerCase() != ownerName.toLowerCase()) {
		      ownerLinkSpan.innerHTML = ownerLinkSpan.innerHTML.substring(0, ownerLinkSpan.innerHTML.indexOf("<a")) +
				'"' + ownerLinkSpan.innerHTML.substring(ownerLinkSpan.innerHTML.indexOf("<a"), ownerLinkSpan.innerHTML.indexOf("</a>")+4) +
				'"' + ownerLinkSpan.innerHTML.substring(ownerLinkSpan.innerHTML.indexOf("</a>")+4, ownerLinkSpan.innerHTML.length);
		}
	}
} else {
ownerLink[0].title = ownerName;
}

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

function modifyCOUserMenu() {
	var str, pref = GM_getValue('displayTrueCO', false);
	if (pref) {
		str = "Currently, the placed by value at the top of the page is modified to display" +
				"the true cache owner name.  Default behavior is to display the pseduo" +
				"cache owner name as entered by the cache owner.\n\n" +
				"Click [OK] to revert to displaying the pseudo cache owner name.\n" +
				"Click [CANCEL] to continue displaying the true cache owner name." +
				"\n\nNote: Clicking [OK] will refresh page.";

	} else {
		str = "Currently, the placed by value at the top of the page displays the pseudo " +
				"user name as entered by the cache owner.  The link text can be modified " +
				"to display the true cache owner name.\n\n" +
				"Click [OK] to display the true cache owner name on the cache page.\n" +
				"Click [CANCEL] to continue displaying the pseudo cache owner name." +
				"\n\nNote: Clicking [OK] will refresh page.";
	}

	var change = window.confirm(str);
	if (change) {
		pref = !pref;
		GM_setValue('displayTrueCO', pref);
		location.reload(true)
	}
}

