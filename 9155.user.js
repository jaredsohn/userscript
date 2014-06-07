// ==UserScript==
// @name              Jimbos homepage
// @namespace         joyboner.com remix
// @description       Jimbo's joy boner remix
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://joyboner.com/gmscripts/img/bg05.gif) center repeat-y #16400B!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#16400B!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#000!important; color:#16400B!important; padding-top:55px!important;}\n";
s+= "a{color:#16400B!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#16400B!important;}\n";
s+= "#topnav a{color:#FFFFFF!important;}\n";
s+= "#topnav a:hover{color:#16400B!important;}\n";
s+= ".heading{border-bottom: 1px solid #CCC!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#16400B!important;}\n";
s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:-1px;}\n";
s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2{padding-left:5px;border-left:10px solid;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#16400B;color:#000;}\n";


document.getElementById('squareAd').innerHTML = '<a href="http://www.myspace.com/1andonlyjimbo"><img src="http://i7.tinypic.com/4l7v0vm.jpg"/></a>';
html = document.body.innerHTML.replace(/Hello,/, "G'day,"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);

