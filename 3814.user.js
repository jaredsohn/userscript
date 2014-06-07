/*
KosmixYahoo
version 1.0
Simple script that puts a Kosmix link at the top of Yahoo search 
pages to do the same search on Kosmix.  

*/

// ==UserScript==
// @name          Kosmix link on Yahoo Search
// @namespace     http://www.kosmix.com
// @description	  Adds a Kosmix link to Yahoo Search page
// @include	  http://www.yahoo.com/search*
// @include       http://search.yahoo.com/search*
// @exclude 	  http://www.kosmix.com/search*
// ==/UserScript==

if (document.forms.length > 0)
{
	var res = document.location.search.match(/(\?|&)p=([^&]+)/);
	if (res.length == 3)
	{
		var bl = document.createElement('a');
		bl.href = 'http://www.kosmix.com/search?q=' + res[2];
		bl.innerHTML = 'Kosmix';
	
		var space = document.createElement('span');
		space.class = 'yschsep';
		space.innerHTML = '&nbsp|&nbsp';
	
		var t = document.getElementById('yschqcon');
		t.parentNode.insertBefore(bl, t);
		t.parentNode.insertBefore(space, t);
	}
}