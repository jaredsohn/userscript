/*
Geocaching images on flickr - 0.2 20/07/2005
Copyright (c) 2005, Andy Helsby - http://absoblogginlutely.net/absocachinlutely
Released under the GPL http://www.gnu.org/copyleft/gpl.html

This is a Greasemonkey user script, see http://greasemonkey.mozdev.org/.

This adds a link to flickr images tagged with the cache name.
inspired,edited from an original taken from http://files.dixo.net/GeocachingMapLinker.user.js
*/

// ==UserScript==
// @name          Geocaching flickr images
// @namespace     http://absoblogginlutely.net/absocachinlutely/
// @description	  Links to flickr pages for this particular cache
// @include       http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==


window.addflickrlink=function()
{
//add link to flickr via tag function
//<title>(GCH8TJ) In the shadow of the Tower by Cookiecachers</title>

	var titlepattern =new RegExp("GC[0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z]");
	var cachename=document.title.match(titlepattern);

	//<span id="LogWarning">
	var warningFormat=document.getElementById("LogWarning");
	warningFormat.innerHTML= warningFormat.innerHTML  + '<a href="http://flickr.com/photos/tags/' + cachename + '">Flickr Photos</a>';
}
window.addflickrlink();