// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// By dev. Adapted from "URL Replacer" work by Ajit Burad
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Link Replacer", and click Uninstall.
//Author : d3v
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Link Replacer
// @description   Replaces each LINK url in a webpage with some predefined URL
// @include       http://*
// @include       https://*
// ==/UserScript==
var url1,url2;
url1 = ['static.ak.fbcdn.net','b.static.ak.fbcdn.net'];
url2 = ['www.facebook.com','www.facebook.com' ]; 
var link, links;
var tmp="link";
var p,q;
links = document.getElementsByTagName('link');
for (var i = 0; i < links.length; i++) {
    link = links[i];
    for(var j=0;j<url1.length; j++)
	{
	tmp = link.href+"" ;
	if(tmp.indexOf(url1[j]) != -1)
	{
	p=tmp.indexOf(url1[j]) ;
	q="http://";
	q = q + url2[j] + tmp.substring(p+url1[j].length,tmp.length);
	link.href=q ;
	}
	}
    }

//
// ChangeLog
// 2009-03-05 - Modified "URL Replacer" work by Ajit Burad so it changes the link href text instead of the a href text