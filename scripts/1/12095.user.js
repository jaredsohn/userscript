// ==UserScript==
// @name		ForumPlanet Cleanup - Modified
// @description		Hides some of the unwanted junk from the new ForumPlanet.
// @include		http://forumplanet.gamespy.com/*
// ==/UserScript==

GM_addStyle("#navigation_ad_content { width: 100%; }"); //makes navigation wider to fill empty space
GM_addStyle("#news_bar { display: none; }"); //hides header on the news box
GM_addStyle("#news_body { display: none; }"); //hides the news box itself
GM_addStyle("#page_ad_wrapper { display: none; }"); //hides the square ad