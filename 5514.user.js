// 
// 
//
// ==UserScript==
// @name          JR's Comment Page
// @namespace     JR's
// @description	  Myspace Comment page
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @exclude       http://comments.myspace.com/*
// ==/UserScript==

// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

// new stylesheet
s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url(http://i23.photobucket.com/albums/b370/DrumFreak93X/backhome.jpg) #FFFFFF fixed;margin-top:-50px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:verdana}\n";
s+= "a:link, a:active, a:visited {color:black!important;font:bold 11px verdana!important;}\n";
s+= "a:hover {text-decoration:none; color:black!important; background-image:url(); }\n";
s+= "a[id*='friendImageLink']:hover img {background-image:url();}\n";
s+= "a[id*='friendImageLink'] img {max-height:131px;}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:white; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#navbar {background:black!important; border:2px solid black!important;-moz-border-radius:10px;padding:2px;margin-bottom:10px; color:white}\n";
s+= "#navbar a {font:normal 11px verdana!important; color:white!important;}\n";
s+= "#navbar a:hover {color:blackimportant;}\n";
s+= ".section {border:2px solid black!important;-moz-border-radius:10px;background-color:000000!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 11px verdana!important;color:white;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:000000!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:lime}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:black}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:lime!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:lime!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:white!important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:white; font-weight:normal; margin-top:4px}\n";
s+= "#home_infoBar span {color:lime}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:black; color:white; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:white!important; font-weight:normal!important}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:666666}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";

GM_addStyle(s);
