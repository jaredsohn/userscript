// ==UserScript==
// @name           Project Intersect Element 24B
// @namespace      Int Controller
// @include        *://*.*
// ==/UserScript==
//JS BROWSER Plug-in for INTERSECT ELEMENT 24B
//Catch HTTP & Store in DB
//Works for Chromium and FireFox' GreaseMonkey

var thisBuild = 1;
var v = window.location.href;
GM_xmlhttpRequest({
	method: 'POST',
	url: 'http://24.intersect.jaimederrez.nl/catch.php',
	data: 'f=b&v='+v,
	headers:	{ "Accept": "text/html" },
	onload: function(responseDetails)	{
		var newestBuild = responseDetails.responseText;
		if (newestBuild > thisBuild) {
			//ff stealth update
		}
		
	}
});