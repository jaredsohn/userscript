// ==UserScript==
// @name       	413 reload button
// @namespace  	http://use.i.E.your.homepage/
// @version    	0.1
// @description	reload button for u413.com
// @include    	http://u413.com/*
// @copyright  	2011+, 1337 aka Ym[0]n
// ==/UserScript==


if(document.getElementById('button') == null)
{
	var button = document.createElement("div");
	button.id = 'button';
	button.style.position = 'fixed';
	button.style.right = '0';
	button.style.top = '0';

	button.style.cursor = 'pointer';
	button.innerHTML = '<img src="http://s61.radikal.ru/i171/1106/32/5ace191726c0.png" width="80" height="80">';
	document.body.insertBefore(button);
		
	document.getElementById('button').onclick = function() { 
		SendCommand("refresh");		
	}
}
