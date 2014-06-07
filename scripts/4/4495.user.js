// ==UserScript==
// @name          work in prog.
// @namespace     aa
// @description	  aaaaa
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

s = "body {background:url(http://img218.imageshack.us/img218/5457/background8bl.jpg) #BEBEBE;background-attachment:fixed;background-position:center;background-repeat:repeat-y;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:}\n";
s+= "a:link, a:active, a:visited {color:BEBEBE!important;font:bold 10px tahoma!important;}\n";
s+= "a:hover {color:black!important;font:bold 10px tahoma!important;}\n";
s+= "#topnav {margin-left:auto;margin-right:auto;width:600px;background-color:white!important;font-size:0;border:0px solid black!important;height:18px;padding:0!important;}\n";
s+= "#topnav a {font:bold 11px tahoma;margin-left:3px;margin-right:3px;color:tahoma!important;}\n";
s+= "#topnav a:hover {font:normal 11px tahoma;margin-left:3px;margin-right:3px;color:BEBEBE!important;}\n";
s+= ".section {border:0px solid black!important;background-color:FFFFFF!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:normal 11px tahoma!important;color:black;border:0px solid black!important;display:inline;padding:0!important;background-color:FFFFFF!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important;}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".indicator {height:13px;margin-left:2}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:black!important;font-weight:bold!important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block;}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after,a[href*='=rateImage']:after {content:' |';}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".w120 {text-align:center;}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#header, #home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer,a[href*='=comedian'],a[href*='=invite&'],a[href*='=coolNewPeople'],a[href*='=vids.home'] {display:none}\n"; 

GM_addStyle(s);

document.getElementById('ctl00_Main_ctl00_InfoBar1_HyperLink2').innerHTML='';