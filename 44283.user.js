// Tiny Url Selective Preview Disabler
// version 0.1 BETA!
// 2009-03-16
// Copyright (c) 2009, Sathyanarayanan Chandrasekar (csathya at gmail dot com) http://kaisertalk.in
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
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
// @name          TinyUrl Selctive Preview Disabler
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   TinyURL has this nifty feature called preview - Which when set enables previews before redirecting. In this script we introduce a whitelist which is bypassed by the twitter preview. E.g  urls listed in the whitelist will escape the preview. Effectively using the preview only for suspicious sites.
// @include       http://tinyurl.com/preview.php*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==



// Add a new line for every site that you wnat to add to the White List. Ignore the leading http and www
var whiteList = new Array();
whiteList[0]="flickr.com";
whiteList[1]="blogspot.com";
whiteList[2]="ebay.com";
whiteList[3]="thesun.co.uk";
whiteList[4]="blogspot.com";
whiteList[6]="yahoo.com";
whiteList[7]="kaisertalk.in";




var url=document.getElementById('redirecturl');


for(var i=0;i<whiteList.length;i++)
{
 
if (url.href.indexOf(whiteList[i])!=-1)
{
//  alert("love you ...  bye");
  document.location = url.href
}

}