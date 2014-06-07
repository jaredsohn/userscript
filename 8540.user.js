// ==UserScript==
// @name             Sweet Homepage
// @namespace    myspace.com
// @description     Customizes your MySpace HomePage
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s  = "body{background:url(http://img116.imageshack.us/img116/2759/mylineeh3.png) center repeat-y #FFF!important;}\n";
s+= '#home_coolNewVideos {display:none;}';
s+= '#home_userURLInfo {display:none;}';
s+= '#home_setHomePage {display:none;}';
s+= '#home_greybox {display:none;}';
s+= '#home_schools {display:none;}';
s+= '#home_feautured_filmmaker {display:none;}';
s+= '#home_feautured_comedy {display:none;}';
s+= '#home_feautured_music {display:none;}';
s+= '#home_feautured_books {display:none;}';


GM_addStyle(s);