// Free Mp3Raid
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2009, Zusi
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
// select "Free Mp3Raid", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Free Mp3Raid
// @namespace     http://www.mp3raid.com/
// @description   Disable captcha in mp3raid :]
// @include       http://*.mp3raid.com/search/download-mp3/*
// ==/UserScript==
function Get_Cookie( name ) {

var start = document.cookie.indexOf( name + "=" );
var len = start + name.length + 1;
if ( ( !start ) &&
( name != document.cookie.substring( 0, name.length ) ) )
{
return null;
}
if ( start == -1 ) return null;
var end = document.cookie.indexOf( ";", len );
if ( end == -1 ) end = document.cookie.length;
return unescape( document.cookie.substring( len, end ) );
}

if (Get_Cookie( 'mp3raid_code')){
}else{
var today = new Date();
var expire = new Date();
expire.setTime(today.getTime() + 3600000*24*2);
document.cookie = "mp3raid_code=correct;expires="+expire.toGMTString();
setTimeout("location.reload(true);",1);
}