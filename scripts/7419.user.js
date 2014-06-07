// ==UserScript==
// @name          Black and White Homepage 
// @namespace     www.myspace.com/andruaesthetik
// @description	  Black and White Homepage
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url(http://i7.photobucket.com/albums/y257/dangerskater911/bg_image.gif) #800303 fixed;margin-top:-50px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:arial narrow}\n";
s+= "a:link, a:active, a:visited {color:FFFFFF!important;font:bold 11px arial narrow!important;}\n";
s+= "a:hover {text-decoration:none; color:FFFFFF!important; cursor:crosshair}\n";
s+= "a[id*='friendImageLink']:hover img {border:2px solid #666666!important;}\n";
s+= "a[id*='friendImageLink'] img {border:2px solid #FFFFFF}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .left {visibility:visible; color:666666; position:relative; top:118px;}\n";
s+= "#header .left a {font-weight:normal!important}\n";
s+= "#topnav {background:transparent!important; padding:0!important; margin-bottom:10px; color:666666}\n";
s+= "#topnav a {font:normal 11px arial narrow!important; color:FFFFFF!important;}\n";
s+= "#topnav a:hover {color:666666!important;}\n";
s+= ".section {border:2px solid #FFFFFF!important;-moz-border-radius:10px;background-color:000000!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 12px arial narrow!important;color:FFFFFF;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:000000!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:FFFFFF}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:FFFFFF}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:FFFFFF!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:FFFFFF!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:666666!important;}\n";
s+= document.getElementById('splash_coolNewPeople').innerHTML = '<embed allowScriptAccess="never" src="http://i16.photobucket.com/albums/b49/freddyizbadd/xspf/xspf_bwhite.swf?&autoplay=false&randomstart=false" quality="high" name="xspf_player" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="160" width="225"></embed>';"a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:666666; font-weight:normal; margin-top:3px}\n";
s+= "#home_infoBar span {color:FFFFFF}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:000000; color:000000; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:666666!important; font-weight:normal!important}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:000000}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";

//Change the part before title
html = document.body.innerHTML.replace(/Hello,/, "Better Run Its...."); 
document.body.innerHTML = html;

//change Friends title
html = document.body.innerHTML.replace(/My Friend Space/, "My Friends"); 
document.body.innerHTML = html;

//change school title
html = document.body.innerHTML.replace(/Visit My School Home Page/, "Durand High"); 
document.body.innerHTML = html;

//change bulletins title
html = document.body.innerHTML.replace(/My Bulletin Space/, "Sayin Stuff"); 
document.body.innerHTML = html;

//change mail title
html = document.body.innerHTML.replace(/My Mail/, "MAIL"); 
document.body.innerHTML = html;

//takes out "Show My:"
html = document.body.innerHTML.replace(/Show My:/, ""); 
document.body.innerHTML = html;

//takes out "Your Network"
html = document.body.innerHTML.replace(/Your Network:/, "Yup! He's In Ur Network"); 
document.body.innerHTML = html;

GM_addStyle(s);

