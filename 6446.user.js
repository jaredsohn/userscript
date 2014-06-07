// ==UserScript==
// @name           Hide Some Myspace Annoyances
// @namespace      http://userscripts.org/people/10583
// @description    Hide Some Annoyances on your homepage (Last Updated:March 21, 2007)
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// @exclude        http://comments.myspace.com/*
// ==/UserScript==


//This script makes some script unusable (ex. Joyboner's homepage script) to know what 
//section to edit to change comment at http://userscripts.org/scripts/show/6446
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

// Change "display:none" to "display:display" or vise versa to hide or unhide the message box
GM_addStyle("#home_messages {display:display;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Featured Profile"
GM_addStyle("#splash_profile {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Cool New Videos"
GM_addStyle("#home_coolNewVideos {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Sponsored Links"
GM_addStyle("#ctl00_Main_ctl00_CMS_ProfileHome_Gads {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Featured Filmmaker"
GM_addStyle("#ctl00_Main_ctl00_cvFeaturedFilm {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Featured Comedy"
GM_addStyle("#ctl00_Main_ctl00_cvFeaturedComedy {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Featured Music"
GM_addStyle("#ctl00_Main_ctl00_cvFeaturedMusic {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Featured Books"
GM_addStyle("#ctl00_Main_ctl00_cvFeaturedBook {display:none;}");


GM_addStyle(s);