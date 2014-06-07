// ==UserScript==
// @name        Warez-BB Force HTTPS
// @namespace   wbbhttps
// @description This will alter all warez-bb.org (http) forum urls to become https
// @include     http://www.warez-bb.org*
// @include     http://warez-bb.org*
// @include     https://www.warez-bb.org*
// @include     https://warez-bb.org*
// @version     1
// @copyright	ND @ warez-bb.org
// ==/UserScript==

if(window.location.protocol === 'http:')
{
	window.location = window.location.href.replace('http:', 'https:');	
}

var wbbLinks = document.getElementsByTagName('a');

for(var i in wbbLinks)
{
	var wbbUrl = wbbLinks.item(i);
	
	if(typeof wbbUrl.getAttribute !== 'undefined')
	{
		var attrValue = wbbUrl.getAttribute('href');
	
		if(attrValue.match(/^http\:\/\/(www\.warez-bb\.org|warez-bb\.org)/gim) !== null)
		{
			wbbUrl.setAttribute('href', attrValue.replace('http:', 'https:'));
		}
	}
}