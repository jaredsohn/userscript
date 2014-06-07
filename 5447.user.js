// ==UserScript==
// @name          SuperJew's HomePage
// @namespace     dezinerzparaize[dot]com
// @description	  SJ's HP
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url(http://www.lambofgod.tv/souvenirs/wallpaper/log_1024.jpg) #800303 fixed;margin-top:-50px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:arial narrow}\n";
s+= "a:link, a:active, a:visited {color:990000!important;font:bold 11px arial narrow!important;}\n";
s+= "a:hover {text-decoration:none; color:990000!important; cursor:crosshair}\n";
s+= "a[id*='friendImageLink']:hover img {border:2px solid #666666!important;}\n";
s+= "a[id*='friendImageLink'] img {border:2px solid #990000}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:666666; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background:transparent!important; padding:0!important; margin-bottom:10px; color:666666}\n";
s+= "#topnav a {font:normal 11px arial narrow!important; color:990000!important;}\n";
s+= "#topnav a:hover {color:666666!important;}\n";
s+= ".section {border:2px solid #AB0202!important;-moz-border-radius:10px;background-color:transparent!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 12px arial narrow!important;color:990000;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:transparent!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:990000}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:990000}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:990000!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:990000!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:666666!important;}\n";
s+= document.getElementById('splash_coolNewPeople').innerHTML = '<embed allowScriptAccess="never"                                        src="http://webjay.org/flash/xspf_player?autoload=1&amp;autoplay=1&amp;playlist_url=http://webjay.org/by/SuperJew887/superjew8875c27splaylist.xspf" quality="high" name="xpsf_player" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="160" width="225"></embed>';"a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:666666; font-weight:normal; margin-top:3px}\n";
s+= "#home_infoBar span {color:990000}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:transparent; color:000000; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:666666!important; font-weight:normal!important}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:transparent}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";

GM_addStyle(s);