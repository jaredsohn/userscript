// ==UserScript==
// @name          Jimbo's Homepage
// @namespace     jimbo[dot]com
// @description	  Jimbos homepage
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==UserScript==
// @name          fsf Homepage
// @namespace     fwfwef[dot]com
// @description	  regweg homepage
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url(http://www.faemalia.net/USPictures/Backgrounds/darkspace-face.jpg) #009900 fixed;margin-top:25px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:verdana}\n";
s+= "a:link, a:active, a:visited {color:009900!important;font:bold 11px verdana!important;}\n";
s+= "a:hover {text-decoration:none; color:009900!important; background-image:url(); cursor:arrow}\n";
s+= "a[id*='friendImageLink']:hover img {border:2px solid #009900!important;}\n";
s+= "a[id*='friendImageLink'] img {border:2px solid #009900}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:009900; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background:transparent!important; padding:0!important; margin-bottom:10px; color:009900}\n";
s+= "#topnav a {font:normal 11px verdana!important; color:green!important;}\n";
s+= "#topnav a:hover {color:009900!important;}\n";
s+= "#topnav a{visibility:visible;}\n";
s+= ".section {border:2px solid #009900!important;-moz-border-radius:10px;background-color:000000!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 11px verdana!important;color:009900;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:000000!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:009900}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:000000}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:009900!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:green!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:009900!important;}\n";
s+= document.getElementById('splash_coolNewPeople').innerHTML = '<center><img src="http://img411.imageshack.us/img411/3715/blahjimboyea8ka.gif"border=0>';"a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:009900; font-weight:normal; margin-top:5px}\n";
s+= "#home_infoBar span {color:009900}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:black; color:009900; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:green!important; font-weight:normal!important}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= document.getElementById('splash_coolNewPeople').innerHTML = '<embed allowScriptAccess="never"                                        src="http://www.myfilehut.com/userfiles/126948/xspf_kong.swf?playlist_url=http://www.myfilehut.com/userfiles/126948/jimbombp3splaylist.xml&autoplay=random" quality="high" name="xpsf_player" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="160" width="225"></embed>';"a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:000000}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";

GM_addStyle(s);