// 
// 
//
// ==UserScript==
// @name          hellcat's Homepage
// @namespace     #Jo\n @ r4wr[dot]com
// @description	  Myspace Homepage *kudos to yayie and russell for the original scripts, which i promptly butchered and made this from lol.
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @exclude       http://comments.myspace.com/*
// ==/UserScript==

// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

// new stylesheet
s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url(http://www.enchantedillusion.com/myspace/rick/background.jpg) repeat-x #72c2d9 fixed;margin-top:-110px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:verdana}\n";
s+= "a:link, a:active, a:visited {color:white!important;font:bold 11px verdana!important;}\n";
s+= "a:hover {text-decoration:none; color:white!important; background-image:url(http://www.mbif.net/backgrounds/lightningline.gif); }\n";
s+= "a[id*='friendImageLink']:hover img {background-image:url(http://www.mbif.net/backgrounds/lightningline.gif);}\n";
s+= "a[id*='friendImageLink'] img {max-height:131px;}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:white; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background:a2cecd!important; border:2px solid white!important;padding:2px; top:10px; color:white}\n";
s+= "#topnav a {font:normal 11px verdana!important; color:white!important;}\n";
s+= "#topnav a:hover {color:whiteimportant;}\n";
s+= ".section {border:2px solid white!important;-moz-border-radius:10px;background-color:a2cecd!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 11px verdana!important;color:white;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:a2cecd!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:#4BA0D7}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:white}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:#4BA0D7!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:#4BA0D7!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:white!important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:white; font-weight:normal; margin-top:4px}\n";
s+= "#home_infoBar span {color:#4BA0D7}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:a2cecd; color:white; font-weight:normal}\n";
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
s+= "#ctl00_Main_ctl00_ProfileHome_gads,#home_coolNewVideosUserName,#home_coolNewVideosBrowse,#home_coolNewVideos,#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";

GM_addStyle(s);
var logo = document.createElement("div");
logo.innerHTML = '<div style="position:absolute; left:690px; top:500px; width:auto;background-color:#B1D0F0;padding:3px;margin-bottom:1em; z-index:10000"> ' +
'<div><embed src="http://divspacechat2.chatango.com/group" bgcolor="#FFFFFF" width="320" height="500" wmode="transparent" type="application/x-shockwave-flash" ></embed>' +
'</div>';
document.body.insertBefore(logo, document.body.firstChild);