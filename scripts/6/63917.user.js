// ==UserScript==
// @name           Google DeTwitter
// @description    Removes the annoying twitter results from Google results
// @author      Mike J
// @namespace   mike.j.google
// @include        http://www.google.tld/*
// @include        http://*.google.tld/*
// ==/UserScript==


var linkObj = document.getElementsByTagName("a"); 
for (var i in linkObj)
{
	if(linkObj[i].href.indexOf("realtime_result_group") >-1)
    	{
	        	var blah = linkObj[i].parentNode;
			var blah2 = blah.parentNode;
			blah2.parentNode.removeChild(blah2);
	}
}
