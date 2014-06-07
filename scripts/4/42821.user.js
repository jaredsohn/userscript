// Tycho's Music
// version 2
// 2009-3-08
// Copyright (c) 2009, Peter Swire
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
// select "Unstyle", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Penny Arcade - Tycho's Music
// @description   Turns Tychos's comments into Youtube links
// @include       http://www.penny-arcade.com/*
// @include       http://penny-arcade.com/*
// ==/UserScript==


titles = document.getElementsByTagName("a");


for(i = 0; i < titles.length; i++){
	if(titles[i].getAttribute('title') != null){
		
		link = document.createElement('span');
		bandName = titles[i].title;
		
		link.innerHTML =
		'<em><span style="font-family: verdana,arial,sans-serif; color: rgb(255, 255, 255);">' +
		'<span style="font-size: x-small;">' +
		' (<a href="http://www.youtube.com/results?search_query= '+ bandName +
		'" title="Youtube Link - ' + bandName + '">yt</a>)' + 
		 '</em></span></span>';
		 
		 
		 titles[i].parentNode.insertBefore(link, titles[i].nextSibling);
		 break;
	}
}
