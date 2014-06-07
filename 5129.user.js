// ReplaceFlickr
// version 0.1
// 2006-08-13
// Copyright (c) 2006, Brajesh Sachan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "ReplaceFlickr", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           ReplaceFlickr
// @namespace      http://brajesh.wordpress.com/tag/greasemonkey
// @description    Replaces all embedded flickr.com images with base64 encoded proxy urls.
// @include        *
// ==/UserScript==

var links, link, match;
links = document.evaluate(
   '//img[@src]',
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);

match_url  = new RegExp('^http://(?:static.)?flickr\.com/.+$');

for (var i = 0; i < links.snapshotLength; i++)
{
	link = links.snapshotItem(i);
	match = match_url.exec(link.src);
  	if (match) 
	{
		var oldlink = link.src;
		link.src = 'http://www.boxofprox.com/index.php?q=' + base64_encode(oldlink);
	}
}



function base64_encode(str)
{
      var alnum='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._'; 
	var out='';
	var t,x,y,z;
	for(var i=0;i<str.length;i+=3)
	{
		t=Math.min(3,str.length-i);
		if(t==1)
		{
			x=str.charCodeAt(i);
			out+=alnum.charAt((x>>2));
			out+=alnum.charAt(((x&0X00000003)<<4));
			out+='--';
		}
		else if(t==2)
		{
			x=str.charCodeAt(i);
			y=str.charCodeAt(i+1);
			out+=alnum.charAt((x>>2));
			out+=alnum.charAt((((x&0X00000003)<<4)|(y>>4)));
			out+=alnum.charAt(((y&0X0000000f)<<2));
			out+='-';
		}
		else
		{
			x=str.charCodeAt(i);
			y=str.charCodeAt(i+1);
			z=str.charCodeAt(i+2);
			out+=alnum.charAt((x>>2));
			out+=alnum.charAt((((x&0x00000003)<<4)|(y>>4)));out+=alnum.charAt((((y&0X0000000f)<<2)|(z>>6)));
			out += alnum.charAt((z&0X0000003f));
		}
	}
	return out;
}