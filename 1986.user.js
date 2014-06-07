// ==UserScript==
// @author	  Paul Downey http://blog.whatfettle.com
// @name          Flickr dpreview Linker
// @description	  Turns "Taken with a " into a Google search of dpreview.com
// @namespace     http://whatfettle.com/GreaseMonkey/flickr.dpreview.linker
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @include       http://whatfettle.com/2005/10/GreaseMonkey/flickrdpreviewlinker.test.html
// @version 0.8
// ==/UserScript==

// Tested with:
//    Firefox 1.5 Beta 2 OSX
//    Firefox 1.0.7/GM 0.5.3 Windows XP
//
// Version History:
// 0.2 - add test for "Taken with an"
// 0.3 - attempted workround for Firefox 1.0.6
// 0.4 - ignore trailing bracketed text on HP camera names
// 0.5 - created unit test page
// 0.6 - replaced one-line regex with splits for Firefox 1.0.7 compatability
// 0.7 - made Flickr gamma compatible
// 0.8 - fix from eetree

function flickrDpreviewLinker() 
{
    var nodes = document.getElementsByTagName("li");

    for (var i = 0; i < nodes.length; i++) 
    {
	var node = nodes[i];

	if (node.innerHTML.match(/Taken with a/)) 
	{
	    var line = node.innerHTML.split(/\. *<br>/);
	    var an = line[0].replace(/\s*Taken with\s*/, "").split(/\s+/)[0];
	    var name = line[0].replace(/\s*Taken with an?\s*/, "");
	    var camera = name.split(".")[0];

            node.innerHTML = "Taken with " + an 
		    + " <a href='http://www.google.com/search?q="
		    + camera
		    + "+site:dpreview.com/reviews&btnI=Google+Search' style='text-decoration: none;'>"
		    + name
		    + "</a>."
		    + "<br>" + line[1];
	}
    }
}

flickrDpreviewLinker(); 
