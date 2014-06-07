// ==UserScript==
// @name          JoyBoner Designs (Sanity B Pink)
// @namespace     joyboner.com
// @description	  Custom Homepage Styles (Sanity B Pink)
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://i11.tinypic.com/4do9g6p.png) center repeat-y #f9cec9!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td{color:grey!important; background-color:white!important;border:0px!important;}\n";
s+= "#topnav{background:#ffffff!important; color:#f9cec9!important; padding-top:55px!important;}\n";
s+= "a{color:black!important;}\n";
s+= "a:hover{color:#9f9f9f!important;text-decoration:none!important;}\n";
s+= "a img {border:2px solid!important; border-color:grey!important;}\n";
s+= "#topnav a{color:#f9cec9!important;font-weight:bold!important;}\n";
s+= ".heading{height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#b5b5b5!important;}\n";
s+= ".heading{background-color:transparent!important; font-size:12pt!important; line-height:18px!important; letter-spacing:-1px; color:black!important;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#FF0099;color:#000000;}\n";

document.getElementById('squareAd').innerHTML = '<a href="http://joyboner.com"><img src="http://i10.tinypic.com/2e3y0wj.gif"/></a>';
html = document.body.innerHTML.replace(/Hello,/, "eeek it's "); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);

