// ==UserScript==
// @name          me
// @namespace     myspace.com/kaylanikki
// @description	  Another Custom Homepage Style
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://img351.imageshack.us/img351/6884/cf3ee1fd00d8d752qi2.jpg) center repeat-no repeat #FFFFFF!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#6f150a!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#FFFFFF!important; color:#6f150a!important; padding-top:55px!important;}\n";
s+= "a{color:#000000!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#c0c0c0!important;}\n";
s+= "#topnav a{color:#000000!important;}\n";
s+= "#topnav a:hover{color:c0c0c0!important;}\n";
s+= ".heading{border-bottom: 1px solid #CCC!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#fae4e6!important;}\n";
s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:-1px;}\n";
s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2{padding-left:5px;border-left:10px solid;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#6f150a;color:#000;}\n";

document.getElementById('squareAd').innerHTML = '<img src="http://img177.imageshack.us/img177/9387/homepagethingsl1.jpg">';
html = document.body.innerHTML.replace(/Hello,/, "G'day,"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);