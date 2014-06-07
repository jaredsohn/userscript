// ==UserScript==
// @name           Clean Home 
// @namespace      RedBrowse.com
// @description    For MySpace Homepage
// @include       http://home.myspace.com/index.cfm?fuseaction=user*
// ==/UserScript==

s= 'body {overflow:hidden;background-color:black;}';

s+= '#abipromo{display:none !important;}';
s+= '#PageThemeModule{display:none !important;}';
s+= '#PageThemeModule{display:none !important;}';
s+= '#main{height:200px !important;}';
s+= '*{-moz-border-radius:20px !Important;}';
s+= '#ad-hd {display:none;}';
s+= '#home_activities {display:none;}';
s+= '#vert {display:none;}';
s+= '#splash_coolNewPeople {display:none;}';
s+= '#home_setHomePage {display:none;}';
s+= '#home_additionalLinks {display:None;}';
s+= '#home_searchAddressBook {display:none;}';
s+= '#ad-hd {display:none !important;}';
s+= '#ad-hdr {display:none !important;}';
s+= '#gafc{display:none !important;}';
s+= '#home_greybox {display:none;}';
s+= '#footer {display:none;}';
s+= '#home_userURLInfo {display:none;}';
s+= '#home_infoBar {display:none;}';
s+= '#squareAd {display:none;}';
s+= '#splash_profile {display:none;}';
s+= '#home_coolNewVideos {display:none;}';
s+= '#home_featured_filmmaker {display:none;}';
s+= '#home_profileInfo img{Width: 179px;Height: 198px;}';
s+= '#home_featured_comedy {display:none;}';
s+= '#home_featured_books {display:none;}';
s+= '#home_featured_music {display:none;}';
s+= '#home_friends {position:absolute;left:-6px;top:00px;z-index:4;width:442px;height:290px;overflow:auto; z-index:9; background-color:white;}'
s+= '#home_bulletins {position:absolute;left:320px;top:297px;width:442px;height:215px;overflow:auto; z-index:9;}'
s+= '#home_schools {display:none;}';
s+= '#home_profileInfo {height:300px!important;}';
s+= '#StatusBox{height:65px!important; overflow:auto;}';
GM_addStyle(s);
document.getElementById('header').innerHTML = '<center><a href=http://collect.myspace.com/index.cfm?fuseaction=signout>SignOut</a></center>';