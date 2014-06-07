// Sathyanrayanan Chandrasekar
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Irazoo Sender", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Irazoo Sender
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       http://www.irazoo.com/SearchResults.aspx*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==


tp=document.getElementsByTagName('a');
for(i=0;i<tp.length;i++)
{
	var str=tp[i].href;
	if(str.indexOf('ViewSite')!=-1)
	{
		//alert(tp[i].href);
		window.open(tp[i].href);
	}
	
		
}
