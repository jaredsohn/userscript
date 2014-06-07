// GC Link to SK
// version 1.4
// 2013-11-13
// Copyright (c) 2011-2013, Radoslav Bielik & R4ZoRs
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// 
//
// ENGLISH
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// To uninstall, go to Tools/Manage User Scripts,
// select "GC Link to SK", and click Uninstall.
//
// SLOVAK
// Toto je skript pre Greasemonkey (Firefox addon)
//
// Pre nainstalovanie je potrebny Greasemonkey: http://greasemonkey.mozdev.org/
// Po instalacii Greasemonkey restartujte Firefox a znova otvorte tento skript.
// Pre odinstalovanie otvorte Tools/Manage User Scripts,
// zvolte "GC Link to SK" a kliknite "Uninstall"
//
// 
//
// ==UserScript==
// @name           GC Link to SK
// @version        1.4
// @namespace      http://bielik.org/greasemonkey
// @description    V1.4 - Adds a special link to each cache listing, which points to cache details on geocaching.sk.
// @include        http://*.geocaching.com/geocache/*
// @grant          none
// ==/UserScript==


gc_addsklink();

function gc_addsklink()
{
	// update only caches in Slovakia
	if (document.getElementById("ctl00_ContentBody_Location").innerHTML.indexOf("Slovakia") != -1) 
	{
		// find the cache code first GCXXXXX
		var GcCode = document.getElementById("ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode").innerHTML;
		if(GcCode.length == 0)
			return;
			
		// find the navigation widget
		var divCacheNavigation = document.getElementsByClassName("CacheDetailNavigation");
		var navUl = null;
		
		if(divCacheNavigation.length > 0)
		{
			var ulsCacheNavigation = divCacheNavigation[0].getElementsByTagName("ul");
			if(ulsCacheNavigation.length > 0)
			{
				navUl = ulsCacheNavigation[0];
			}
		}
		
		// append the link to the navigation widget
		if(navUl != null)
		{
			var linkToSkLi = document.createElement('li');
			var linkToSkA = document.createElement('a');
			var msgToSk = document.createTextNode("Otvoriť na GC.SK");
			linkToSkA.setAttribute("href", "http://www.geocaching.sk/geocache-detail.php?wpt=" + GcCode);
			linkToSkA.setAttribute("style", "background:url('/images/stockholm/16x16/arrow_r.gif');background-repeat:no-repeat;");
			linkToSkA.appendChild(msgToSk);
			linkToSkLi.appendChild(linkToSkA);
			navUl.appendChild(linkToSkLi);
		}
	}
}
