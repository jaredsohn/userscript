// KSI Clan Members Counter
// 2007-05-27
// Copyright (c) 2007, Scott Royalty
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
// select "Userscripts Back to Top", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Bungie Clan Member Count
// @namespace      Bungie_Clan_Count
// @description    Takes the total gamertags on Bungie.Net's Clan Members Page and displays it at the bottom.
// @include        http://www.bungie.net/Stats/ClanMembers*
// @version       0.0.1
// ==/UserScript==


var countResult = document.createElement("div");

// Now we check all the links for profile criteria.
var links = document.links;
var memberCount = 0;
for (i = 0; i < links.length; i++) {
	if ( (links[i].href.indexOf("Account/Profile") != -1) ) {
		memberCount++;
	}
}

countResult.innerHTML = '<div id="countResult" style=" padding-top:0px; padding-right:0; padding-bottom:0px; padding-left:0; font-family: Lucida Grande, Trebuchet MS, Arial, Helvetica, sans-serif; font-weight:normal; font-size:1;" align="center">Members: ' + memberCount + '</div>';
document.body.appendChild(countResult);

// 0.0.1	Initial release.