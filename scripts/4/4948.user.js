//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Yahoo! Hi-Resolution Photos", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Yahoo! Hi-Resolution Photos
// @namespace     http://cantspellathing.blogspot.com
// @description   View any image from the yahoo photos album page in Hi-Resolution by clicking on the text-link
// @include       http://*.photos.yahoo.com/ph/*/album?*
// ==/UserScript==


var links = document.getElementsByTagName('a')

for(var i=0; i<links.length; i++)
{
	link = links[i]
	if((link.title != '') && (link.href.indexOf('detail') > -1) )
	{
		link.href = link.href.replace('detail', 'detail_hires')
		link.firstChild.data = "(Hi-Res) " + link.firstChild.data
	}
}
