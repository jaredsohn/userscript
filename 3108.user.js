//#google_search.user.js
// ==UserScript==
// @name          Google search AdSense Removal
// @namespace     http://moppy.4free.co.il
// @description	  removes the adSense from the side when searching, Motty Katan (c) 05-02-2006
// @include       http://*.google.*/search*
// ==/UserScript==
try{
	//get first link
	adSenseFirstLink = document.getElementById("aw1");

	//loop untill you get to the table
	i=0;
	a = adSenseFirstLink.parentNode;
	while(i<10 && a.tagName!="TABLE")
	{
	    a = a.parentNode;
	    i++;
	}
	a.parentNode.removeChild(a);

}
catch (e) {}
