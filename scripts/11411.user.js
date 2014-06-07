// ==UserScript==
// @name		ForumPlanet Cleanup
// @description		Hides some of the unwanted junk from the new ForumPlanet.
// @include		http://forumplanet.gamespy.com/*
// ==/UserScript==

GM_addStyle("#news_bar { display: none; }"); //hides header on the news box
GM_addStyle("#news_body { display: none; }"); //hides the news box itself
GM_addStyle(".networkBar { display: none; }"); //hides the IGN links at the top of the page
GM_addStyle("#googlesearchbar { display: none; }"); //hides the google search bar
GM_addStyle("#page_ad_wrapper { display: none; }"); //hides the square ad
GM_addStyle(".footer_wrapper { display: none; }"); //hides the IGN links at the bottom of the page
document.getElementById("navigation_ad_wrapper").scrollIntoView(true); //scrolls the page to a useful position