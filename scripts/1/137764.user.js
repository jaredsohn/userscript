// ==UserScript==
// @name       SharePoint 2010 Scroller
// @namespace  http://nibbles.mx/
// @version    0.1
// @description  Brings scrolling capabilities to SharePoint sites
// @include    http://*/*
// @copyright  2012, Rodrigo Garcia (nibblesmx)
// ==/UserScript==

var metatags = document.getElementsByTagName('meta')
for(i = 0; i <  metatags.length; i++)
{
	if
	(
		metatags[i].name.toLowerCase() == "generator"
		&&
		metatags[i].content.toLowerCase() == "microsoft sharepoint"
	)
	{
		document.getElementById("s4-workspace").style.overflow = "auto"
		document.body.style.overflow="auto"
	}
}
