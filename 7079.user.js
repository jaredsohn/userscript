// ==UserScript==
// @name          JoyBoner Designs (Sanity B Pink)
// @namespace     joyboner.com
// @description	  Custom Homepage Styles (Sanity B Pink)
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://i91.photobucket.com/albums/k284/joyboner/herpe/sanity/bg_black.png) center repeat-y #000000!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td{color:#FFF!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#000000!important; color:#ffffff!important; padding-top:55px!important;}\n";
s+= "a{color:orange!important;}\n";
s+= "a:hover{color:#9f9f9f!important;text-decoration:none!important;}\n";
s+= "a img {border:2px solid!important; border-color:000000!important;}\n";
s+= "#topnav a{color:#ffffff!important;}\n";
s+= ".heading{height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#b5b5b5!important;}\n";
s+= ".heading{background-color:transparent!important; font-size:12pt!important; line-height:18px!important; letter-spacing:-1px; color:9f9f9f!important;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#FF0099;color:#FFF;}\n";

document.getElementById('squareAd').innerHTML = '<a href="http://joyboner.com"><img src="http://i9.tinypic.com/359lhmx.jpg"/></a>';
html = document.body.innerHTML.replace(/Hello,/, "eeek it's "); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);

