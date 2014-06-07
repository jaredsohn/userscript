// Bungie.net Link Assimilator
// c r e a t e d   b y   the eNeME
// 3/29/2009
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Bungie.net Link Assimilator", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Bungie.net Link Assimilator
// @namespace      http://www.bungie.net/Forums/posts.aspx?postID=27428424
// @description    Rewrites all links on Bungie.net to correspond to your current domain.
// @include        *.bungie.net/*
// @include        *halo3.org/*
// ==/UserScript==


//Change according to your preferences:
//	False = Only the URL of the link will be changed.
//	True  = The URL and the "Link text" will be changed.  This is not recommended as it
//			can cause confusion if a user is referring to a certain domain in a post.
var ChangeLinkText = false;


var loc = document.location.href;
var parts = loc.split('/');
	//parts[2] is "xxx.bungie.net" or "halo3.org"

for(var i = 0; i < document.links.length; i++)
{
	document.links[i].href = document.links[i].href.replace(/http:\/\/www.bungie.net/i,"http://"+parts[2]);
	document.links[i].href = document.links[i].href.replace(/http:\/\/admin.bungie.net/i,"http://"+parts[2]);
	document.links[i].href = document.links[i].href.replace(/http:\/\/seventhcolumn.bungie.net/i,"http://"+parts[2]);
	document.links[i].href = document.links[i].href.replace(/http:\/\/[www\.]*halo3.org/i,"http://"+parts[2]);
	if(ChangeLinkText) {
		document.links[i].innerHTML = document.links[i].innerHTML.replace(/www.bungie.net/i,parts[2]);
		document.links[i].innerHTML = document.links[i].innerHTML.replace(/admin.bungie.net/i,parts[2]);
		document.links[i].innerHTML = document.links[i].innerHTML.replace(/seventhcolumn.bungie.net/i,parts[2]);
		document.links[i].innerHTML = document.links[i].innerHTML.replace(/[www\.]*halo3.org/i,parts[2]);
	}
}


//	   GTFO
//	 d[(**)]T
//	MAI SCRIPT