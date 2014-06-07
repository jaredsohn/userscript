// ==UserScript==
// @name              megans homepage
// @namespace         joyboner.com remix
// @description       megans joy boner remix
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://joyboner.com/gmscripts/img/bg05.gif) center repeat-y #aa0ea5!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#aa0ea5!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#000!important; color:#aa0ea5!important; padding-top:55px!important;}\n";
s+= "a{color:#aa0ea5!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#aa0ea5!important;}\n";
s+= "#topnav a{color:#FFFFFF!important;}\n";
s+= "#topnav a:hover{color:#aa0ea5!important;}\n";
s+= ".heading{border-bottom: 1px solid #CCC!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#aa0ea5!important;}\n";
s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:-1px;}\n";
s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2{padding-left:5px;border-left:10px solid;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#aa0ea5;color:#000;}\n";


document.getElementById('squareAd').innerHTML = '<a href="http://www.myspace.com/1andonlyjimbo"><img src="http://i8.tinypic.com/61urb85.jpg"/></a>';
html = document.body.innerHTML.replace(/Hello,/, "G'day,"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);

