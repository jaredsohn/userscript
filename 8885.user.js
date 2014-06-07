// ==UserScript==
// @name          A Re Modified User Homepage 
// @author        Filthy Jesus
// @description	  03/20/07 LATEST UPDATE. Updated to Remove Featured Film, Music, Comedy, and Book. Removes the Sponsored Links from the homepage and everywhere else that I found and the cool new videos, and a couple more of the 300 things on people's View More pictures as well as a couple of ads around myspace.. Gets rid of that stupid 300 picture in people's View More Pictures. On The homepage hides the tiny ad, adds a sign out link at the top right . Removes the  links box.  hides the Featured Profile, Moves the Info box below bulletins, Cool New People, The Square AD, top and Bottom links, URL box, Schools Homepage box, Address book, Make Myspace homepage link, get Myspace alerts link, and the Helio link.

// @include       http://myspace.com/*
// @include       http://*.myspace.com/*
// ==/UserScript==

var b = document.getElementById("headerlinks");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("row0");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("header_search");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("header");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("footer");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_coolNewVideos");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ctl00_ProfileHome_gads");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ImageListings1_ContentView1");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ucImageView_CMS_300_Ad");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_CMS_100_Ad");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ImageListings1_CMS_300_Ad");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ctl00_CMS_Tom_Announcement");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ctl00_InfoBar1_pnlAdSpot");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_greybox");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_userURLInfo");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_setHomePage");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_schools");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("squareAd");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("splash_coolNewPeople");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_searchAddressBook");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ctl00_cvFeaturedFilm");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ctl00_cvFeaturedComedy");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ctl00_cvFeaturedMusic");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ctl00_cvFeaturedBook");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("splash_profile");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ad160x600");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("advert");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ad");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("side_google");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_ctl00_Main_Main_SendMessage_gads");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_ctl00_Main_Main_CMS_SendMessage_gads");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_CMS_ViewImage_Gads");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_ctl00_Main_Main_CMS_ReadMessage_Gads");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_ctl00_Main_Main_readMessage_gads");

var tempHTML, lastItem, newElement;

thisElement = document.getElementById("home_infoBar")
tempHTML = thisElement.innerHTML;  //save the homeinfo bar so we can re-generate it
thisElement.parentNode.removeChild(thisElement);  //delete it from the top

var tempDiv = document.createElement("div");
tempDiv.innerHTML = '<div id="home_infoBar" class="section">' + tempHTML

lastItem = document.getElementById('home_bulletins');
if (lastItem) {
    lastItem.parentNode.insertBefore(tempDiv, lastItem.nextSibling);
    
    //newElement = document.createElement('hr');
    //lastItem.parentNode.insertBefore(newElement, lastItem.nextSibling);
    }



var SignOutLink = document.createElement("div");
SignOutLink.innerHTML = '<style type="text/css">'
+'<!--'
+'#SignOutLink #table1 a {'
+'text-decoration: none !important;'
+'color: #FFFFFF !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#SignOutLink #table1 a:hover {'
+'text-decoration: none !important;'
+'color: #FFFFFFF !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#SignOutLink #table1 {'
+'background-color: #990000 !important;'
+'}'
+'-->'
+'</style>'
+'<div style="position: absolute; width: 50px; height: 50px; z-index: 1; right; top: 0pt; right: 0pt" id="SignOutLink">'
+'<table border="0" width="100%" id="table1" bgcolor="#990000">'
+'<tr><td><p align="left">'
+'<a href="http://collect.myspace.com/index.cfm?fuseaction=signout">Sign Out</a><br>'
+'</font></td></tr></table></div>';
document.body.insertBefore(SignOutLink, document.body.firstChild);
