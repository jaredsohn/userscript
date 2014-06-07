// ==UserScript==
// @name          aaaaaa
// @namespace     www.myspace.com/
// @description	  home page.
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

s = "#nav {position:absolute; right:5;}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:#000000 fixed;margin-top:-110px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:0px!important;}\n";
s+= "*{font-family:verdana}\n";
s+= "a:link, a:active, a:visited {color:#000000!important;font:10px arial!important;}\n";
s+= "a:hover {text-decoration:none;font-weight:bold!important; color:63B8FF!important;}\n";
s+= "a[id*='friendImageLink']:hover img {border:2px solid #ffffff!important;}\n";
s+= "a[id*='friendImageLink'] img {border:2px solid #333333}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:63B8FF; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background-color:#98F5FF; border:2px solid #333333; padding:0!important; margin-bottom:10px;}\n";
s+= "#topnav a {font:normal 11px verdana!important; color:333333!important;  background-color:black; border:0px solid #333333;}\n";
s+= "#topnav a:hover {color:666666!important;  background-color:#FFFFFF; border:2px solid #333333;}\n";
s+= ".section {border:2px solid #333333!important;background-color:ffffff!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 11px verdana!important;color:63B8FF;border:none!important;display:inline;padding:0!important;background-color:000000!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:63B8FF}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:666666}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:990033!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:000000!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:666666!important;}\n";
s+= "#splash_coolNewPeople {width:46%; display:inline; margin-left:10px!important;float:left!important;}\n";
s+= document.getElementById('splash_coolNewPeople').innerHTML = '<center><a href="http://www.last.fm/user/nicque/?chartstyle=minimalDark"><img src="http://imagegen.last.fm/minimalDark/recenttracks/nicque.gif" border="0"/></a><br>Created By:<br><a href="http://myspace.com/37380953">Cord</a></center>';"a[id*='ns1_HyperLink2']{display:inline; float:left!important; margin-left:-10px!important; margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;float:left; }\n";
s+= "#home_infoBar {width:46%;;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:000000; font-weight:bold; margin-top:4px}\n";
s+= "#home_infoBar span {color:000000}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar a {display:none!important;}\n";
s+= "#home_infoBar .heading {font-size:11pt!important; font-weight:bold!important; color:63B8FF}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:black; color:666666; font-weight:normal}\n";
s+= "#home_friends .heading {font-size:11pt!important; font-weight:bold!important; color:63B8FF}\n";
s+= ".left span a {display:none!important;}\n";
s+= ".mar5 strong {display:none!important;}\n";
s+= ".mar5 .strong {display:none!important;}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:666666}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_messages .heading {font-size:11pt!important; font-weight:bold!important; color:63B8FF}\n";
s+= "#home_messages img {padding-top:3px;}\n";
s+= "#home_bulletins .heading {font-size:11pt!important; font-weight:bold!important; color:63B8FF}\n";
s+= "#home_bulletins img {padding-top:3px;}\n";
s+= "#home_schools .heading {font-size:11pt!important; font-weight:bold!important; color:63B8FF}\n";
s+= "#home_schools img {padding-top:3px;}\n";
s+= "#home_setHomePage, #home_userURLInfo, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";

GM_addStyle(s);