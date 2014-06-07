// ==UserScript==
// @name           Mediafire links on Google search
// @namespace      http://sekharanna.blogspot.com/
// @description    Search inside the sites of direct downloads
// @include        http://www.google.*
// @exclude		http://www.google.com/
// ==/UserScript==


	var elmSearchDiv = document.createElement('div');

	elmSearchDiv.innerHTML =
		'<form method="GET" action="http://www.google.com/search">' +
		'<label for="as_q">Search Mediafire:</label> ' + 
		'<input type="text"  name="as_q" accesskey="S"> ' + 
		'<input type="hidden" name="q" value="site:mediafire.com">' +
		'<input type="submit" value="Search Mediafire">' +
		'</form>';

	document.body.insertBefore(elmSearchDiv, document.body.firstChild);
	elmSearchDiv.style.fontSize = 'small';
	elmSearchDiv.style.textAlign = 'right';
	elmSearchDiv.style.borderBottom = '1px solid silver';
