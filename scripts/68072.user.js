// FT Free articles Hack
// version 0.4.0 Alpha - stoped auto-redirect from google - click redirect link to proceed.
// 0.3.1: auto redirected from google
// 0.2: updated for pages which require registration - e.g. front page of print edition: http://www.ft.com/us-edition
// 0.2.1: minor fix
// 0.2.2: bug fixes
// 0.3: added: auto-redirect/click from google (thanks NoHype!)
// 0.3.1: to save pdf right click and 'save target as'
// last change: 18/02/2010
// Copyright (c) 2010, dmn001<at>gmail
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "FT Free articles Hack", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FT Free articles Hack
// @namespace     
// @description   redirect FT to content via google
// @include       http://*.ft.com/*
// @include 	  http://www.google.co.uk/url?*
// ==/UserScript==

var s = window.location.href;
if (s.indexOf('google')>0){
	//var link = document.links[0];
	// todo - click link using js
}
else{
	if (s.indexOf(',Authorised=false')>0){
		var t = s.substring(s.indexOf('s/')+4,s.indexOf(','));
		var y = "http://www.google.co.uk/url?sa=t&source=web&url=http%3A%2F%2Fwww.ft.com%2Fcms%2Fs%2F0%2F";
		var z = ".html";
		window.location.href = y+t+z;
	}
	if (s.indexOf('registration')>0 && s.indexOf('location')>0 ){
		var y = "http://www.google.co.uk/url?sa=t&source=web&url=";
		var z = s.substring(s.indexOf('location=')+9,s.indexOf('&referer'));
		window.location.href = y+z;
	}
}
