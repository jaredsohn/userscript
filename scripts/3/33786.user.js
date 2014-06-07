// ==UserScript==
 // @name          BannerRefresh
 // @namespace     
 // @description   Enter registration system easily
 // @include       http://suis.sabanciuniv.edu/index.html
 // @version       0.1
// ==/UserScript==

var INTERVAL = 1 ;
	
window.setTimeout(
	function()
	{
		window.location = "http://suis.sabanciuniv.edu/prod/twbkwbis.P_SabanciLogin" ;
	},
	INTERVAL
) ;