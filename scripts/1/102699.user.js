
// Geocaching-Handbuch.de - GCQuick
// version 0.2 BETA!
// 2011-05-09
// Copyright (c) 2011, Robert Stefanowicz
// http://www.geocaching-handbuch.de
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GCQuick
// @namespace     http://www.geocaching-handbuch.de
// @description   Dieses Script liefert euch, egal auf welcher Internetseite Ihr seit, eine Direktverbindung zu GC.com
// @include       *
// @exclude		  http://*finalbes*
// ==/UserScript==

                     
    	if(document.URL==parent.location.href){																																																																								
    document.getElementsByTagName('html')[0].innerHTML += '<p style="display:scroll;position:fixed;bottom:-5px; right:15px;"><a href="http://www.geocaching-handbuch.de" title="Geocaching-Handbuch.de" target="_blank"/><img src="http://dl.dropbox.com/u/22755689/gcb.png" style="margin:0; padding:0;"/></a><a href="http://www.geocaching.com/map/beta/default.aspx" title="Geocaching.com - Map" target="_blank"/><img src="http://dl.dropbox.com/u/22755689/karte.png" style="margin:0; padding:0;"/></a><a href="http://www.geocaching.com/seek/default.aspx" title="Geocaching.com - Search" target="_blank"/><img src="http://dl.dropbox.com/u/22755689/lupe.png" style="margin:0; padding:0;"/></a><img src="http://dl.dropbox.com/u/22755689/bigleer.png" style="margin:0; padding:0;"/><img src="http://dl.dropbox.com/u/22755689/bigleer.png" style="margin:0; padding:0;"/><img src="http://dl.dropbox.com/u/22755689/bigleer.png" style="margin:0; padding:0;"/><img src="http://dl.dropbox.com/u/22755689/bigleer.png" style="margin:0; padding:0;"/><img src="http://dl.dropbox.com/u/22755689/bigleer.png" style="margin:0; padding:0;"/></p><p style="display:scroll;position:fixed;bottom:-3px; right:15px;"><iframe src="http://maps.finalbes.org/marquee.php" scrolling="no" border="0" frameborder="0" cellpadding="0" cellspacing="0" height="20px" width="625px"></p>'; 
 }

// Changelog:
// V0.2 Beta
// -Killed Bug with frames (THX to Thomas from Team TSaK)
// -Switched from left to right side