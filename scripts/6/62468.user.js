// ==UserScript==
// @name		DisableChatter
// @namespace	http://www.myyearbook.com/shrek99
// @description	Disables Chatter on myYearbook
// @include		http://*myyearbook.com/apps/home*
// ==/UserScript==
//
// Code to disable Chatter on the homepage
homeFeed = document.getElementById("HALFeed");
chatFeed = document.getElementById("feed");
homeFeed.style.visibility = "hidden";
chatFeed.style.visibility = "hidden";
