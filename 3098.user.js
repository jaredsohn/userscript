// ==UserScript==
// @author	  Paul Downey http://blog.whatfettle.com
// @name          Geocache Tags in Flickr
// @description	  Adds a link to geocaching.com against "GCXXXX" format tags on Flickr
// @namespace     http://whatfettle.com/GreaseMonkey/GeocacheTagsInFlickr
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @version 0.1
// ==/UserScript==

// Tested with:
//    Firefox 1.5.1, GM 0.6.4 OSX
//    Firefox 1.0.7, GM 0.5.3 Windows XP
//
// Version History:


function GeocacheTagsInFlickr() 
{
    var thetags = document.getElementById("thetags");
    var nodes = thetags.getElementsByTagName("a");
    var exp = new RegExp("^GC[0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z]");

    for (var i = 0; i < nodes.length; i++) 
    {
	var node = nodes[i];

	if (node.innerHTML.match(exp)) 
        { 
	   id = node.innerHTML;

           n = document.createElement('a');
	   n.innerHTML = "<img height='10' width='10' "
		 + "src='http://www.geocaching.com/images/nav/logo_sub.gif'/>";

	   n.href = "http://www.geocaching.com/seek/cache_details.aspx?wp="+id;
                     node.parentNode.insertBefore(n, node.nextSibling);

	   nbsp = document.createTextNode(' ');
           node.parentNode.insertBefore(nbsp, node.nextSibling);

	}
    }
}

GeocacheTagsInFlickr(); 
