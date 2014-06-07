// ==UserScript==
// @name              JoyBoner Homepages (HH03)
// @namespace         joyboner.com / r4wr.com
// @description       JoyBoner Homepages (HH03)
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://joyboner.com/gmscripts/img/bg03.gif) center repeat-y #FFF!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#FFF!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#topnav{background:#612424!important; color:#afcd1d!important; padding-top:55px!important;}\n";
s+= "a{color:#612424!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#615524!important;}\n";
s+= "#topnav a{color:#FFFFFF!important;}\n";
s+= "#topnav a:hover{color:silver!important;}\n";
s+= ".heading{border-bottom: 1px solid #FFF!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span, strong span{color:#612424!important;}\n";
s+= ".heading{font-size:12pt!important; line-height:18px!important; letter-spacing:-1px;}\n";
s+= "#home_profileInfoLinks a, #ctl00_Main_ctl00_Bulletins1_HyperLink2{padding-left:5px;border-left:10px solid;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#ff7e00;color:#FFF;}\n";

document.getElementById('squareAd').innerHTML = '<a href="http://joyboner.com"><img src="http://xs303.xs.to/xs303/06284/jbdlogo2.jpg"/></a>';
html = document.body.innerHTML.replace(/Hello,/, "G'day,"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

GM_addStyle(s);



// ==UserScript==
// @name           Hide Some Myspace Annoyances
// @namespace      http://userscripts.org/people/10583
// @description    Hide Some Annoyances on your homepage
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// @exclude        http://comments.myspace.com/*
// ==/UserScript==


//If this script makes any script unusable (ex. Joyboner's homepage script) pleace leave a
//comment at http://userscripts.org/scripts/show/6446
//If you have any questions or comments please leave me a comment

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Cool New People"
GM_addStyle("#splash_coolNewPeople {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Make Myspace My Home Page"
GM_addStyle("#home_setHomePage {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Get Myspace Mobile Alerts"
GM_addStyle("#home_additionalLinks {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Visit School Home Page"
GM_addStyle("#home_schools {display:display;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Search Your Address Book"
GM_addStyle("#home_searchAddressBook {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Grey Box"
GM_addStyle("#home_greybox {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Footer"
GM_addStyle("#footer {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Tell People About Your Myspace"
GM_addStyle("#home_userURLInfo {display:display;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Info Bar"
GM_addStyle("#home_infoBar {display:display;}");
 
// Change "display:none" to "display:display" or vise versa to hide or unhide the "Square Ad by the Info Bar"
GM_addStyle("#squareAd {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide your bulletins
GM_addStyle("#home_bulletins {display:display;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide your messages
GM_addStyle("#home_messages {display:display;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Featured Profile"
GM_addStyle("#splash_profile {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Cool New Videos"
GM_addStyle("#home_coolNewVideos {display:none;}");

// Change "display:none" to "display:display" or vise versa to hide or unhide the "Sponsored Links"
GM_addStyle("#ctl00_Main_ctl00_CMS_ProfileHome_Gads {display:none;}");

GM_addStyle(s);

#ctl00_Main_ctl00_CMS_ProfileHome_gads, #ctl00_Main_ctl00_CMS_ProfileHome_Gads_A, #ctl00_Main_ctl00_CMS_ProfileHome_Gads {display:none;}