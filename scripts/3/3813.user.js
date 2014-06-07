/*
KosmixGoogle
version 1.0
Simple script that puts a Kosmix Search link at the top of Google search 
pages to do the same search on Kosmix. There is a popular version
that puts Yahoo link so this is a small twist on that :)
*/

// ==UserScript==
// @name          Kosmix link on Google Search
// @namespace     http://www.kosmix.com
// @description	  Adds a Kosmix link to Google's Search page
// @include       http://google.com/search*
// @include       http://www.google.com/search*
// @exclude 	  http://www.kosmix.com/search*
// ==/UserScript==

if (document.forms.length > 0)
{
	var res = document.location.search.match(/(\?|&)q=([^&]+)/);
	if (res.length == 3)
	{
		var bl = document.createElement('a');
		bl.href = 'http://www.kosmix.com/search?q=' + res[2];
		bl.innerHTML = 'Kosmix';
	
		var space = document.createElement('span');
		space.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
	
		var t = document.getElementById('t1a');
		t.parentNode.insertBefore(bl, t);
		t.parentNode.insertBefore(space, t);
	}
}