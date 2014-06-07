// ==UserScript==
// @name           Open URL Tester
// @include http://economictimes.indiatimes.com/*
// @include http://timesofindia.indiatimes.com/*
// ==/UserScript==

javascript :
(
 function() 
  {
	var array = [];
	var links = document.getElementsByTagName("a");
	for (var i=0; i<links.length; i++) 
	 {
		var newWindow = window.open(myLink);
		setTimeout(
		             function()
			             {
			               newWindow.close();
			             },
		             5000
		            );
	 }
  }
);