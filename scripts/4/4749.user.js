// ==UserScript==
// @name          Master Jake's Homepage
// @namespace     myspace.com/burnboy07
// @description	  A homepage based on the Master Jake Profile. ^_^
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url(http://i82.photobucket.com/albums/j241/burnboy07/EdgeJakeBGwStarkoolCityREDANDBLACK.jpg) #000000 fixed;margin-top:-50px;   background-position:center center; background-repeat:no-repeat; background-attachment:fixed;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:monospace}\n";
s+= "a:link, a:active, a:visited {color:FFFFFF!important;font:bold 11px monospace!important;}\n";
s+= "a:hover {text-decoration:none; color:ff0000!important; cursor:help}\n";
s+= "a[id*='friendImageLink']:hover img {border:3px solid #FFFFFF!important;}\n";
s+= "a[id*='friendImageLink'] img {border:3px solid #FFFFFF}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:000000; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background-image:url(' none ')!important; padding:0!important; margin-bottom:10px; color:000000}\n";
s+= "#topnav a {font:normal 11px monospace!important; color:FFFFFF!important;}\n";
s+= "#topnav a:hover {color:FF0000!important;}\n";
s+= ".section {border:3px solid #FFFFFF!important;background-color:transparent!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 12px monospace!important;color:FFFFFF;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:DC143C!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:FFFFFF}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:FFFFFF}\n";
s+= ".indicator img {display:display}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:FFFFFF!important; font-weight:bold!important}\n";
s+= "a:hover .indicator {border:display!important;}\n";
s+= "#home_bulletins th {color:FFFFFF!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:ffffff!important;}\n";
s+= document.getElementById('splash_coolNewPeople').innerHTML = '<embed allownetworking="internal" allowScriptAccess="never" src="http://www.fileden.com/files/2006/6/23/84963/bloodgirl.swf" menu="true" quality="high" width="300" height="320" name="index" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="playlist=http://www.fileden.com/files/2006/6/23/84963/mp3playlist%20No%20start%20and%20menu.xml&showeq=1&initvol=80" wmode="transparent"></embed>';"a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:43%;height:170px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:000000; font-weight:normal; margin-top:3px}\n";
s+= "#home_infoBar span {color:FFFFFF}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:DC143C; color:FFFFFF; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:000000!important; font-weight:normal!important}\n";
s+= "#splash_coolNewPeople {height:163px;width: 300px; text-align:center;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:DC143C}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";

GM_addStyle(s);




