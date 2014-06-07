// shufflegoogresults.user.js
// version 0.1 BETA!
// 9-23-10
// Copyright (c) 2005, Mark Pilgrim
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Shuffle Google Results
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Randomly shuffle Google Results
// @include       http://www.google.com/*
// ==/UserScript==


window.addEventListener("load", function(e) {
	var sr = document.getElementsByTagName('ol');
        var li = sr[0].getElementsByTagName('li');
	for (var i=0;i<li.length;i++) {
		var rand = getRandomInt(0,li.length)
		//GM_log(rand);
		sr[0].insertBefore(li[i],li[rand]);
	}
}, false);

function getRandomInt(min, max) {
	 return Math.floor(Math.random() * (max - min + 1)) + min;
}