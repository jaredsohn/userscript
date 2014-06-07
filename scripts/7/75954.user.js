/*
Dieses Script ist im Original von...

Geocaching images on flickr - 0.2 20/07/2005
Copyright (c) 2005, Andy Helsby - http://absoblogginlutely.net/absocachinlutely
Released under the GPL http://www.gnu.org/copyleft/gpl.html

.. und wurde von mir (David Wright, GC:ChilliSchaf) auf das neue 2010 Layout angepasst. Außerdem wurde es durch den Youtubelink erweitert.
bei Frage: david.wright@inviatec.de

*/

// ==UserScript==
// @name          GC Media Links
// @description	  Links to Flickr Images and Youtube Videos
// @include       http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==


window.addflickrlink=function()
{
//add link to flickr via tag function
//<title>(GCH8TJ) In the shadow of the Tower by Cookiecachers</title>

	var titlepattern =new RegExp("GC[0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z]");
	var cachename=document.title.match(titlepattern);

	//<span id="LogWarning">
	var warningFormat=document.getElementById("ctl00_ContentBody_NumVisits");
	warningFormat.innerHTML= warningFormat.innerHTML  + 
' / <a href="http://flickr.com/photos/tags/' + cachename + '" target="_blank">Flickr Photos</a> / <a href="http://www.youtube.com/results?search_query=' + cachename + '&aq=f" target="_blank">Youtube-Videos</a>';
}
window.addflickrlink();