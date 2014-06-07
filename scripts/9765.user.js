// ==UserScript==
// @name          A Re Modified MySpace (Morgan Edition)
// @source        http://userscripts.org/scripts/show/9707
// @identifier    http://userscripts.org/scripts/show/9707.user.js
// @creator       Filthy Jesus (myspace.com/xFilthyxJesusx)
// @version       1.0.1
// @date          2007-06-09
// @description	  06/07/09 LATEST UPDATE. Fixed Tom's Announcement box from messing up so badly. On MySpace removes: OurProgram box, 300 ads, Transformers ad, featured film, featured music, featured comedy, featured book, featured profile, sponsored links, cool new videos, cool new people, square ad, top and bottom links, URL box, schools homepage, address book, make myspace homepage, get myspace alerts, tiny ad, links box, and the helio link.Then on the Homepage adds a sign out link at the top right . Moves the info box below bulletins and optimizes format.
// @include       http://myspace.com/*
// @include       http://*.myspace.com/*
// ==/UserScript==

/***********************\
|*   Remove The Crap    *|
\***********************/

var b = document.getElementById("MarketingPrograms");
if (b) {b.parentNode.removeChild(b);}

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

var b = document.getElementById("");
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
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ucImageView_ContentView1");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_CMS_300_Ad");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ImageListings1_ContentView1");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ucImageView_CMS_300_Ad");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_CMS_100_Ad");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ImageListings1_CMS_300_Ad");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ucImageView_ContentView1");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_ctl00_Main_cphSponsorSpace_cvSponsor");
if (b) {b.parentNode.removeChild(b);}

/***********************\
|*     Move InfoBox     *|
\***********************/

var tempHTML, lastItem, newElement;

thisElement = document.getElementById("home_Bar")
tempHTML = thisElement.innerHTML;
thisElement.parentNode.removeChild(thisElement);

var tempDiv = document.createElement("div");
tempDiv.innerHTML = '<div id="home_infoBar" class="section">' + tempHTML

lastItem = document.getElementById('home_profileInfo');
if (lastItem) {
    lastItem.parentNode.insertBefore(tempDiv, lastItem.nextSibling);
    
    //newElement = document.createElement('hr');
    //lastItem.parentNode.insertBefore(newElement, lastItem.nextSibling);
    }

var infoBox = document.getElementById('home_infoBar');
if (infoBox) {
infoBox.innerHTML = infoBox.innerHTML.replace(/<br>/ig,'&nbsp;');
infoBox.innerHTML = infoBox.innerHTML.replace(/<\/a>&nbsp;/ig,'</a>,&nbsp;');
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#home_infoBar span, #home_infoBar div { display: inline ! important; }');
infoBox.style.width = '100%';
infoBox.style.height = '85px';
infoBox.style.margin = '0px';
}

/***********************\
|*    Move Tom's Box    *|
\***********************/

var tempHTML, lastItem, newElement;

thisElement = document.getElementById("ctl00_Main_ctl00_CMS_Tom_Announcement")
tempHTML = thisElement.innerHTML;
thisElement.parentNode.removeChild(thisElement);

var tempDiv = document.createElement("div");
tempDiv.innerHTML = '<div id="ctl00_Main_ctl00_CMS_Tom_Announcement class="section">' + tempHTML

lastItem = document.getElementById('home_bulletins');
if (lastItem) {
    lastItem.parentNode.insertBefore(tempDiv, lastItem.nextSibling);
    
    //newElement = document.createElement('hr');
    //lastItem.parentNode.insertBefore(newElement, lastItem.nextSibling);
    }

var tomBox = document.getElementById('ctl00_Main_ctl00_CMS_Tom_Announcement');
if (tomBox) {
tomBox.innerHTML = tomBox.innerHTML.replace(/<br>/ig,'&nbsp;');
tomBox.innerHTML = tomBox.innerHTML.replace(/<\/a>&nbsp;/ig,'</a>,&nbsp;');
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#ctl00_Main_ctl00_CMS_Tom_Announcement span, #ctl00_Main_ctl00_CMS_Tom_Announcement div { display: inline ! important; }');
tomBox.style.width = '100%';
tomBox.style.height = '100%';
tomBox.style.margin = '0px';
tomBox.style.border = '0px';
}

/***********************\
|* Create Signout Link *|
\***********************/

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


/***********************\
|* User Script Updates *|
\***********************/
// http://userscripts.org/scripts/show/2296
var SCRIPT = {
	name: "A Re Modified MySpace",
	namespace: "Filthy Jesus",
	description: "06/07/09 LATEST UPDATE. Fixed Tom's Announcement box from messing up so badly. On MySpace removes: OurProgram box, 300 ads, Transformers ad, featured film, featured music, featured comedy, featured book, featured profile, sponsored links, cool new videos, cool new people, square ad, top and bottom links, URL box, schools homepage, address book, make myspace homepage, get myspace alerts, tiny ad, links box, and the helio link.Then on the Homepage adds a sign out link at the top right . Moves the info box below bulletins and optimizes format.",
	source: "http://userscripts.org/scripts/show/9707",
	identifier: "http://userscripts.org/scripts/show/9707.user.js",	
	version: "1.0.1",
	date: Date.parse("June 09, 2007")
};
