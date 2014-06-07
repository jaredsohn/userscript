// ==UserScript==
// @name        Scale Imgur Images: Large
// @description		Automatically scales down large imgur photos
// @author		electrolemon
// @contact		http://twitter.com/electrolemon
// @licence		GPL (http://www.gnu.org/copyleft/gpl.html)
// @include   http://i.imgur.com/*
//
// ==/UserScript==

var newprefix = "l.jpg";
var mylocation = window.location.href;
if (mylocation.indexOf("l.jpg") == -1)
{
	var mynewlocation = mylocation.replace(/\.jpg/g,newprefix);
	window.location = mynewlocation;
}