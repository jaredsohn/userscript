// ==UserScript==
// @name           remove linksynergy in iapps.im links
// @namespace      
// @description    remove the linksynergy part embedded in iapps.im links
// @include        http://www.iapps.im/*
// ==/UserScript==

function main()
{
	var links = document.querySelectorAll('a[href*="click.linksynergy.com"]');
	var text, i;
	for (i = 0; i < links.length; i++) 
	{
		// Replace everything before "http%253A"
		text = links[i].href.replace(/^(.*?)=http%3A%2F%2F/, 'http%3A%2F%2F');
		// Decode the special characters (2 times)
		text = decodeURIComponent(decodeURIComponent(text));
		// Change the actual attribute
		links[i].href = text;
	}
}
main();