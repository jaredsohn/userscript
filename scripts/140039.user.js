// ==UserScript==
// @name        embed video links in BBcode forums
// @namespace   http://userscripts.org
// @description Changes links to youtube videos so the videos are embedded in the webpage, with autoplay off
// @include     http://*.net/forum*/viewtopic.php*
// @include     http://*.com/forum*/viewtopic.php*
// @include     http://*.co.uk/forum*/viewtopic.php*
// @exclude     http://www.youtube.com/*
// @exclude     https://www.youtube.com/*
// @version     0.1 28Jul2012
// ==/UserScript==
// Replaces HREF links to youtube videos with an IFRAME tag to embed the video in the page
// If using AdBlock Plus you may need to add an exception rule for http://www.youtube.com/embed/* 
// If the video appears like a blank then check you are logged into youtube - it could be due to age or country restrictions
// Designed for bbcode forums but should work on any HTML page. Tested on Firefox only.

// set the width and height you want the video to be
var w = 425;
var h = 350;

try {
// get all links into an array
var yvid= [];
var link = "";
var linkname = "";
   for(i=0;i<document.links.length;i++)
    {
	yvid = document.links[i];
	linkname =yvid.href;

	// if a youtube link then edit the code
	if ((linkname.search(/www.youtube.com\/watch/ig) != -1) || (linkname.search(/www.youtube.com\/v\//ig) != -1))
		{
		//youtube.com link found 
		//remove the options from end of link and change to iframe-style link
		if (linkname.search("\&") != null )
		{ var links = linkname.split("\&"); 
		link = links[0];
		 }
		else { link = linkname; }
		if (link.search(/www.youtube.com\/watch/ig) != null)
			{ link = link.replace(/youtube.com\/watch\?v\=/ig,"youtube.com\/embed\/"); }
		else
			{ link = link.replace(/youtube.com\/v\//ig,"youtube.com\/embed\/"); }
		//replace whole <a href> tag with iframe tag
		yvid.outerHTML='<iframe width="' + w + '"height="' + h +' " src="' + link + '" frameborder="0" allowfullscreen></iframe>';
		}
    }
}
catch (err)
{
alert ("error!");
}
