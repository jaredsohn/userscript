
// Youtube Ads Remover user script
// version 1.0!
// 2007-03-31
// Copyright (c) 2007, Sathish N
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
// select "YouTube ads remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          	YouTube Ads Remover
// @namespace     http://www.sathishn.com/projects/youtubeadsremover/
// @description   	Youtube Ads remover
// @include       	http://www.youtube.com/results*
// @include       	http://youtube.com/results*
// ==/UserScript==

function RemoveAds()
{
	document.getElementById('sideContentWithPVA').style.display = "none";
}

RemoveAds()