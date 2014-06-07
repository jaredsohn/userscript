// ==UserScript==
// @name           Foxtel Download Fixer
// @namespace      http://0xF051.wordpress.com
// @description    Rewrite Foxtel Download Service URLs into a clickable .wmv download link.
// @include        http://www.foxtel.com.au/download/*
//
// ==/UserScript==
//
// Package: 2a7b8b07981c62bb14c04fd52941b039 
// 
// This script is intended for use to improve the Foxtel Download experience. It is designed 
// to allow FOXTEL subscribers the ability to download from the Foxtel Download service without 
// the need for the clunky, and frankly horrible, Foxtel Download Silverlight application. 
// 
// THIS SCRIPT IS NOT INTENDED TO FACILITATE ANY FORM OF COPYRIGHT THEFT. PERIOD. 
// 
// A note to Foxtel: Keep software compatible. Don't use proprietary software which would otherwise  
// prevent paying customers, such as myself, from accessing your download service using the software 
// and of our choosing. Open your eyes and cater for those that do not use a Microsoft operating 
// system. The market is slowly changing, more people are using OS X and OSS, you are missing 
// a reasonably sized, and growing, market. 
// 
// Signed,  
// 0xF051 
//
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/* Define the location of the WMV files. */
var base_uri = "http://download.foxtel.com.au/digital_store/wmv/";

/* Get all links from the page. */
for (var i = 0; i < document.links.length; i++) {

	/* Search for all links on the page with the "OnClick" value set. */
	if (document.links[i].getAttribute("onclick")) {

		/* Do a RegEx search for the 'goTry' function, and rip out the download ID. */
		if(document.links[i].getAttribute("onclick").match(/goTry\('.*?','(.*?)'/)) {

			/* Parse the ID number from the string we just grabbed. */
			RegExp.$1.match(/([a-z]*?)_([0-9]+)/);

			/* Rewrite the "Download" link to the WMV location. */
			var download_uri = base_uri + RegExp.$2 + ".wmv";

			/* Change the 'OnClick' value to equal our new download link. */
			document.links[i].setAttribute("onclick", "location.href='" + download_uri + "'");

		}

	}

}