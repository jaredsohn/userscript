// ==UserScript==
// @name           43things cheers
// @namespace      http://whee.dk/
// @description    This script checks your profile page on 43 things to see if you have any cheers to give. If you do, it shows a notification at the top of whatever page you visit, with a link to 43things.com.
// @include        *
// ==/UserScript==

// Configuration: Set the url of your page.
config_url = 'http://www.43things.com/person/alfar';

// No need to fiddle below here unless you know what you're doing ;)

GM_xmlhttpRequest({
	method: 'GET',
	url: config_url,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/xml+xhtml,text/xml',
	},
	onload: function(responseDetails) {
		var cheers = responseDetails.responseText.match(/Cheers available: ([0-9]+)/);
		
		var cheercount = parseInt(cheers[1]);
		
		if (cheercount > 0)
		{
			div = document.createElement('div');
			div.style.pixelTop = 0;
			div.style.pixelLeft = 0;
			div.style.backgroundColor = '#ffffdf';
			div.style.fontFamily = 'Verdana';
			div.style.percentWidth = 100;
			div.style.paddingTop = 5;
			div.style.paddingBottom = 5;
			
			div.innerHTML = '<a style="text-decoration: none; color: #000000;" href="http://www.43things.com/">' + cheers[1] + ' cheers available.</a>';

			document.body.insertBefore(div, document.body.firstChild);
		}	
	}
});                                                             