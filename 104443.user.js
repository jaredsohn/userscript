// ==UserScript==
// @name		   No Bitcoin on Hacker News
// @namespace	   Zac Schellhardt
// @description	   Removes any posts on Hacker News with Bitcoin in their title.
// @include		   http://news.ycombinator.com/*
// ==/UserScript==

var tds = document.getElementsByTagName('td');
for(var index = 0; index < tds.length; index++)
{
	var td = tds[index]
	if (td.getAttribute('class') &&
		td.getAttribute('class').indexOf('title') != -1 && 
		td.firstChild && 
		td.firstChild.tagName == 'A' &&
		td.firstChild.text.match(/bit\s*coin/i))
	{
		var tr1 = td.parentNode;
		var tr2 = tr1.nextSibling;
		var tr3 = tr2.nextSibling;
		tr1.parentNode.removeChild(tr1);
		tr2.parentNode.removeChild(tr2);
		tr3.parentNode.removeChild(tr3);
	}
}