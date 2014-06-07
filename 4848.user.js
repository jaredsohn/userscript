// ==UserScript==
// @name          Forum Skin - View Thread PAge - BBZ
// @namespace     http://www.myspace.com/yayie
// @description   A Customize forum skin at View all Topics page only
// @include       http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewThread*
// @include       http://collect.myspace.com/index.cfm?fuseaction=messageboard.viewThread*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageboard.viewCategory*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageboard.postReply*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageBoard.previewReply*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageboard.posted*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewCategory*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageboard.postReply*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageBoard.previewReply*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageboard.posted*
// ==/UserScript==




//hide codes (self explanatory)
s= "#msft{display:none!important;}\n";
s+= "a[href*='classifieds']{display:none;}\n";


//background Code
s+= "body {background-color:#6698cb!important;margin-top:-130px!important;}\n";


//navbar bg
s+= "div div table{background-color:white!important;}\n";
s+= "div div table tr td table tr td {border:4px solid black !important;}\n";


//navbar code
s+= ".navbar{width:792px!important;text-align:center;height:20px;font-color:black!important;}\n";


//typical links color
s+= "a{color:black!important;text-decoration:none!important;text-decoration: none!important;font-weight:bold!important;}\n";




s+= "a:hover{background-color:#D5E8FB!important;text-decoration: none!important;}\n";




s+= "a:active {color:black!important;}\n";




s+= "a:visited {color:black!important;}\n";




s+= "a:hover img {-moz-opacity:.5;opacity:.5;border:none!important;}\n";








//?? please ignore these code..im testing it one by one
//hide white bg

//border (keep)
s+= "div table tbody tr td table tbody tr td table tbody tr td table{background-color:white!important;border:4px solid black !important;}\n";

//unkeep
s+= "div table tbody tr td table tbody tr td table tbody tr td table tbody tr td table{background-color:white!important;border:none!important;}\n";
s+= "div table table table td {background-color:transparent!important;border:none!important;}\n";
s+= "div table{background-color:transparent!important;}\n";
s+= "div table tbody tr td table tbody tr td table{background-color:#6698cb!important;border-color:white!important;}\n";
s+= "div table table table table table table table td {border:1px solid black!important;}\n";







GM_addStyle(s);
