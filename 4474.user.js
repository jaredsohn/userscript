// ==UserScript==
// @name          party4.
// @namespace     www.myspace.com/
// @description	  home page.
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==


s+= "div, table, td, th, .heading{background:transparent!important; border:0px!important;}\n";
s+= "*{font-family:tahoma}\n";
s+= "a[id*='friendImageLink']:hover img {border:0px solid #b0bfd4!important;}\n";
s+= "a[id*='friendImageLink'] img {border:2px solid #}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 11px verdana!important;color:63B8FF;border:none!important;display:inline;padding:0!important;background-color:000000!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:63B8FF}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:!important;}\n";
s+= "#splash_coolNewPeople {width:46%; display:inline; margin-left:10px!important;float:left!important;}\n";
s+= document.getElementById('splash_coolNewPeople').innerHTML = '<center><a href="http://www.last.fm/user/nicque/?chartstyle=minimalDark"><img src="http://imagegen.last.fm/minimalDark/recenttracks/nicque.gif" border="0"/></a></center>';"a[id*='ns1_HyperLink2']{display:inline; float:left!important; margin-left:-10px!important; margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:black; color:666666; font-weight:normal}\n";
s+= ".left span a {display:none!important;}\n";
s+= ".mar5 strong {display:none!important;}\n";
s+= ".mar5 .strong {display:none!important;}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:http://imagegen.last.fm/minimalDark/recenttracks/nicque.gif}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_messages .heading {font-size:11pt!important; font-weight:bold!important; color:}\n";
s+= "#home_messages img {padding-top:3px;}\n";
s+= "#home_bulletins .heading {font-size:11pt!important; font-weight:bold!important; color:}\n";
s+= "#home_bulletins img {padding-top:3px;}\n";
s+= "#home_schools .heading {font-size:0pt!important; font-weight:bold!important; color:}\n";
s+= "#home_schools img {padding-top:0px;}\n";
s+= "#home_setHomePage, #home_userURLInfo, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";

GM_addStyle(s);