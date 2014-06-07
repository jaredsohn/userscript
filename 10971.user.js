// ==UserScript==
// @name           No-Null Links
// @namespace      Security
// @description    Removes "%00" from all links
// @include        *
// ==/UserScript==

function replaceAll( str, from, to ) {
	var idx = str.indexOf( from );
	
	while ( idx > -1 )
	{
		str = str.replace( from, to );
		idx = str.indexOf( from );
	}
	
	return str;
}
(function()
{
	var urls = document.getElementsByTagName('A');
	for(var i=0;i<urls.length;i++)
		urls[i].href = replaceAll(urls[i].href, "%00", "");
})()