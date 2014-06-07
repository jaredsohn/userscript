// ==UserScript==
// @name          jasonevil's Homepage
// @namespace     jasonevil[dot]skem9[dot]com
// @description	  Modified homepage to match jasonevil's profile
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url(http://i48.photobucket.com/albums/f208/___nick/hawaii/100_0596.jpg) #000000 fixed;background-attachement:fixed;backgroud-position:center center;background-repeat:repeat-y;margin-top:-110px;}\n";
s+= "div, table,tr,td, th,table table table, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:verdana;font-size:10px;color:33ff00!important;}\n";
s+= "a[id*='friendImageLink']:hover img {border:1px solid #33ff00!important;}\n";
s+= "a[id*='friendImageLink'] img {border:1px solid #33ff00}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible;position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background:transparent!important; padding:0!important; margin-bottom:10px;visibility:hidden;}\n";
s+= ".section {border:1px solid #33ff00!important;-moz-border-radius:10px;background-color:000000!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold  verdana!important;color:33ff00;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:000000!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:33ff00}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:33ff00}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:33ff00!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:cc0000!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:33ff00!important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:33ff00; font-weight:normal; margin-top:4px}\n";
s+= "#home_infoBar span {color:cc0000}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:black; color:; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:yellow!important; font-weight:normal!important}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:666666}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";
s+= "#main{position:relative;left:15px;}\n";
s+= "#topnav a{visibility:visible;}\n";
s+= "#home_image.left{width:170px;}\n";
s+= "span{color:99cc00!important;}\n";
GM_addStyle(s);