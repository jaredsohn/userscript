// This Mobile life
// version 0.6 REBAR-VINDALOO
// 2010-06-19
// Copyright (c) 2010, Matt Katz
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
// select "This Mobile Life", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          This Mobile Life
// @author         Matt Katz
// @namespace     http://www.morelightmorelight.com
// @description   Changes all This American Life mp3 stream links to link to the .mp3 file to download
// @include       http://*.thislife.org/*
// @include       http://thislife.org/*
// @require   http://usocheckup.redirectme.net/2392.js
// ==/UserScript==





var allLinks = unsafeWindow.document.getElementsByTagName("a");

for (i = 0; i < allLinks.length; i++)
{ 
 
  var href = allLinks[i].href;
  if (href.match(/javascript\:playMe\(\'([0-9]+)\'\);$/i) )
  {
	   //alert('Hello world!');
	   var episode = href.match(/([0-9]+)/i);
	   
	   //get the number to get the episode number
	  if(episode){
		allLinks[i].setAttribute("href", "/sites/all/download.php?ep=" + episode[1] );
		allLinks[i].innerHTML="Download MP3";
		allLinks[i].parentNode.setAttribute("class", "download last");
	   }
	   
   
  }
}