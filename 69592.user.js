// ==UserScript==

// @name           /b/ Post number fix

// @description    Replace the XXX with real post numbers

// @include        http://boards.4chan.org/b/*


// ==/UserScript==

var regex = new RegExp('(\\d+)(XXX)');
var links = document.getElementsByTagName('a');
for(var i in links)
{
	if(regex.test(links[i].innerHTML))
	{
		if(links[i].href.substring(0,10)=="javascript")
		{
			links[i].innerHTML = links[i].href.substring(18,27);
		}
		else if(links[i].href.substring(0,4)=="http")
		{
			links[i].innerHTML = links[i].href.substring(41);
		}
	}
}