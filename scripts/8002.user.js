// ==UserScript==
// @name           Hide Some Myspace Annoyances
// @namespace      http://userscripts.org/people/10583
// @description    Hide Some Annoyances on your homepage
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// @exclude        http://comments.myspace.com/*
// ==/UserScript==


//If this script makes any script unusable (ex. Joyboner's homepage script) pleace leave a
//comment at http://userscripts.org/scripts/show/6446
//If you have any questions or comments please leave me a comment

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Cool New People"
GM_addStyle("#splash_coolNewPeople {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Make Myspace My Home Page"
GM_addStyle("#home_setHomePage {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Get Myspace Mobile Alerts"
GM_addStyle("#home_additionalLinks {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Visit School Home Page"
GM_addStyle("#home_schools {display:display;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Search Your Address Book"
GM_addStyle("#home_searchAddressBook {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Grey Box"
GM_addStyle("#home_greybox {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Footer"
GM_addStyle("#footer {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Tell People About Your Myspace"
GM_addStyle("#home_userURLInfo {display:display;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Info Bar"
GM_addStyle("#home_infoBar {display:display;}");
 
// Change "display:none" to "display:display" or vise versa to hide or unhide the "Square Ad by the Info Bar"
GM_addStyle("#squareAd {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide your bulletins
GM_addStyle("#home_bulletins {display:display;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide your messages
GM_addStyle("#home_messages {display:display;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Featured Profile"
GM_addStyle("#splash_profile {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Cool New Videos"
GM_addStyle("#home_coolNewVideos {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Sponsored Links"
GM_addStyle("#ctl00_Main_ctl00_CMS_ProfileHome_Gads {display:none;}");

GM_addStyle(s);

#ctl00_Main_ctl00_CMS_ProfileHome_gads, #ctl00_Main_ctl00_CMS_ProfileHome_Gads_A, #ctl00_Main_ctl00_CMS_ProfileHome_Gads {display:none;}