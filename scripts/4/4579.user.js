// skin taken from #Jo\n - http://myspace.com/gmscripts

// ==UserScript==
// @name          Cliff's Homepage
// @namespace     topsecret
// @description	  homepage for me
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==
//


// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

// new stylesheet
s = "#nav {position:absolute; left:5}\n";
s+= "#content {position:absolute; right:5}\n";
s+= "body {background:url(http://img379.imageshack.us/img379/9913/123452ev.jpg) #000000 fixed;margin-top:-30px;}\n";
s+= "body {background-position:center center;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:verdana}\n";
s+= "a:link, a:active, a:visited {color:white!important;font:bold 11px verdana!important;}\n";
s+= "a:hover {text-decoration:none; color:990033!important; background-image:url(http://www.mbif.net/backgrounds/lightningline.gif); cursor:crosshair}\n";
s+= "a[id*='friendImageLink']:hover img {border:2px solid #666666!important;}\n";
s+= "a[id*='friendImageLink'] img {border:2px solid #333333}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:666666; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background:transparent!important; padding:0!important; margin-bottom:10px; color:#666666}\n";
s+= "#topnav a {font:normal 11px verdana!important; color:white!important;}\n";
s+= "#topnav a:hover {color:990033!important;}\n";
s+= ".section {border:2px solid #333333!important;-moz-border-radius:10px;background-color:black!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 11px verdana!important;color:666666;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:000000!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:990033}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:666666}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:990033!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:990033 !important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:3px;;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:666666; font-weight:normal; margin-top:4px}\n";
s+= "#home_infoBar span {color:990033}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:black; color:666666; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:990033!important; font-weight:normal!important}\n";
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

// change 'cool new people' to mp3 player
//document.getElementById('splash_coolNewPeople').innerHTML = '<embed player here