// ==UserScript==
// @name          Newgrounds Banner Remover
// @namespace     Bryce - Trip272@Yahoo.com	
// @description	  This removes the annoying top banners off of newgrounds.com
// @include       http://*newgrounds.com/*
// ==/UserScript==

//Find Ads on the top of all pages
var adframe = document.getElementsByTagName('iframe')[0];

//If we find them we remove them
if(adframe != null) { adframe.parentNode.removeChild(adframe); }