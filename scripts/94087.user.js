// ==UserScript==
// @name           Megaupload Direct Link Redirect
// @namespace      Jhonjhon_123
// @description    Redirección a los enlaces de descarga directos de megaupload.com sin espera de tiempo
// @Version        1.0
// @include        http://www.megaupload.com/*
// ==/UserScript==

var oLinks = document.getElementsByTagName('a');

for (i=0;i < oLinks.length;i++)
{
	var sLink = oLinks[i].href;
	
	if ( sLink.match('http://www') != null && sLink.match('megaupload.com/files/') != null ) 
	{
		document.location = sLink;
	}
}