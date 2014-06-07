//#alltheweb_search.user.js
// ==UserScript==
// @name          AlltheWeb search sponsers-ads Removal
// @namespace     http://moppy.4free.co.il
// @description	  removes the sponsers adds from the page results, Motty Katan (c) 05-02-2006
// @include       http://www.alltheweb.com/search?*
// ==/UserScript==
try{
	sponsers = document.getElementById("mainResults");
    sponsers.removeChild(sponsers.childNode);
//	sponsers.innerHTML = "";
}
catch(e){}

