// ==UserScript==
// @name          Nate Radtke Designs (#1)
// @namespace     www.myspace.com/person420
// @description	  Custom Homepage #1
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background-color: #000000}\n";
s+= "div, table, tr, td{color:#FFF!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#B30000!important; color:#000!important; padding-top:55px!important;}\n";
s+= "a{color:#00B300!important;}\n";
s+= "a:hover{color:#333333!important;text-decoration:none!important;}\n";
s+= "a img {border:1px solid!important; border-color:FF4775!important;}\n";
s+= "#topnav a{color:#000!important;}\n";
s+= ".heading{height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#FF0A47!important;}\n";
s+= ".heading{background-color:transparent!important; font-size:12pt!important; line-height:18px!important; letter-spacing:-1px; color:B30000!important;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:B30000;color:#FFF;}\n";
s+= "#home_greybox,#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";

//changes Hello to HEY!!! next to name
html = document.body.innerHTML.replace(/Hello,/, "HEY!!! "); 
document.body.innerHTML = html;

//changes the classifieds link to a signout
html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);

