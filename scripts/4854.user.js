// ==UserScript==
// @name          Forum Skin - View Thread PAge - Manacim (egg Lovers)
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
s+= "body {background-color:#FCD707!important;margin-top:-130px!important;}\n";


//navbar bg
s+= "div div table{background-color:#66ccff!important;}\n";
s+= "div div table tr td table tr td {border:3px dashed #9965ff !important;}\n";


//navbar code
s+= ".navbar{width:792px!important;text-align:center;height:20px;font-color:black!important;}\n";


//typical links color
s+= "a{color:#9966ff!important;text-decoration:none!important;text-decoration: none!important;font-weight:bold!important;}\n";




s+= "a:hover{background-color:#00b6f1!important;text-decoration: none!important;}\n";




s+= "a:active {color:#9966ff!important;}\n";




s+= "a:visited {color:#9966ff!important;}\n";




s+= "a:hover img {border:none!important;}\n";








//?? please ignore these code..im testing it one by one
//hide white bg

//border (keep)
s+= "div table tbody tr td table tbody tr td table tbody tr td table{background-color:#66ccff!important;border:3px dashed #9965ff !important;}\n";

//unkeep
s+= "div table tbody tr td table tbody tr td table tbody tr td table tbody tr td table{background-color:#66ccff!important;border:none!important;}\n";
s+= "div table table table td {background-color:transparent!important;border:none!important;}\n";
s+= "div table{background-color:transparent!important;}\n";
s+= "div table tbody tr td table tbody tr td table{background-color:#fcd707!important;border-color:white!important;}\n";
s+= "div table table table table table table table td {border:1px solid black!important;}\n";







GM_addStyle(s);
