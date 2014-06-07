//
// ==UserScript==
// @name          PhotoBucketFixed
// @version       3.2
// @description   Replace thumblink with directlink
// @include       http://*.photobucket.com/*
// @include       http://www.photobucket.com/*
// ==/UserScript==


// get the UL that contains the thumbails
thumbList = document.getElementById("containerThumbList");
if(thumbList != null)
{
	// get the LIs for each thumbnail
	thumbItems = thumbList.getElementsByTagName("li");
	for(var i=0; i < thumbItems.length; i++)
	{
		// get the input box that has the direct link url
		urlbox = document.getElementById("mediaUrl_" + String(i));
		// get the link surrounding the thumbnail
		imagelinks = thumbItems[i].getElementsByTagName("a");
		// set the link's href to the direct url
		imagelinks[0].href = urlbox.value;
		// and make the image load in a new window/tab
		imagelinks[0].target = "_blank";
	}
}
