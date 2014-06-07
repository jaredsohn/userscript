// Offsite links in new window
// Very simple script for opening offsite links in new window / tab
// Copyright (c) 2007 Samuel Saint-Pettersen <samji@bigfoot.com>
// Released under the GPL licence
// http://www.gnu.org/copyleft/gpl.html
// ---------------------------------------------------------------------
// This is a Greasemonkey user script.
// To install it, you need Greasemonkey: http://www.greasespot.net
// ---------------------------------------------------------------------
// ==UserScript==
// @name Offsite links in new window
// @version 1.0
// @author Samuel Saint-Pettersen
// @description Open offsite links in a new window or tab
// @include *
// ==/UserScript==
(function() {
	var current_site = window.location.hostname;
	var current_regex = new RegExp(current_site, "ig");
	var offsite_regex = new RegExp("http://", "ig");
	for(var i = 0; i < document.getElementsByTagName("a").length; i++)
	{
		var a = document.getElementsByTagName("a")[i];
		var href = a.getAttribute("href");
		var current_match = href.search(current_regex);
		var offsite_match = href.search(offsite_regex);
		if(current_match == -1 && offsite_match != -1)
		{
			a.setAttribute("target", "_blank");
		}
	}
})();
