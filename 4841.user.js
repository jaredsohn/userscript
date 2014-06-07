// ==UserScript==
// @name          Nic's New Homepage
// @namespace     none
// @description	  Orange Myspace Home
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url(http://i113.photobucket.com/albums/n207/crazymistern3/newbg.gif) #FF9900 fixed;margin-top:-50px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:arial narrow}\n";
s+= "a:link, a:active, a:visited {color:blue!important;font:bold 11px arial narrow!important;}\n";
s+= "a:hover {text-decoration:none; color:00ff00!important;}\n";
s+= "a[id*='friendImageLink']:hover img {border:2px solid white!important;}\n";
s+= "a[id*='friendImageLink'] img {border:2px solid blue}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:00ff00; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background:transparent!important; padding:0!important; margin-bottom:10px; color:FF9900}\n";
s+= "#topnav a {font:normal 11px arial narrow!important; color:blue!important;}\n";
s+= "#topnav a:hover {color:00ff00!important;}\n";
s+= ".section {border:2px solid 00ff00!important;-moz-border-radius:10px;background-color:ff9900!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 12px arial narrow!important;color:00ff00;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:3300FF!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:00ff00}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:blue}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtBlue {color:blue!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:00ff00!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:3300FF; font-weight:normal; margin-top:3px}\n";
s+= "#home_infoBar span {color:00ff00}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:FFCC00; color:FFCC00; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:00ff00!important; font-weight:normal!important}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:3300FF}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";

GM_addStyle(s);