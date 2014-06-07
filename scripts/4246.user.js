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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Yahoo! Photos
// @namespace     http://phillsacre.me.uk
// @description   Gives the option to download hi-res Yahoo! photos by making the photo clickable
// @include       http://*.photos.yahoo.com/ph/*/detail?*
// ==/UserScript==


var divElts = document.getElementsByTagName('div');

var photoDiv;

for (var i=0; i < divElts.length; i++)
{
	if (divElts[i].className == 'yphshade2')
	{
		photoDiv = divElts[i];
		break;
	}
}


var img = photoDiv.firstChild;

var detailLinkHref = location.href;
detailLinkHref = detailLinkHref.replace('detail', 'detail_hires');

var detailLink = document.createElement("a");
detailLink.href = detailLinkHref;

detailLink.appendChild(img);

photoDiv.appendChild(detailLink);
