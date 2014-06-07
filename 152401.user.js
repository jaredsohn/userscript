// ==UserScript==
// @name          Refresh
// @description   Automatic Reload for any web page
// @include       http://ufedora.ucoz.ru/*
// ==/UserScript==

 var time = 30000.1; //= 10.1sec			
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;