/*
Icerocket Google script
version 1.0
Adds an Icerocket link to the Google search results page.

*/
// ==UserScript==
// @name          Icerocket on Google Search
// @namespace     http://meat.net/
// @description	  Adds an Icerocket link to Google Search results
// @include       http://google.com/search*
// @include       http://www.google.com/search*
// ==/UserScript==

if (document.forms.length > 0)
{
	var res = document.location.search.match(/(\?|&)q=([^&]+)/);
	if (res.length == 3)
	{
		var bl = document.createElement('a');
		bl.href = 'http://blogs.icerocket.com/search?q=' + res[2];
		bl.innerHTML = 'Icerocket';
	
		var space = document.createElement('span');
		space.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
	
		var t = document.getElementById('t1a');
		t.parentNode.insertBefore(bl, t);
		t.parentNode.insertBefore(space, t);
	}
}




