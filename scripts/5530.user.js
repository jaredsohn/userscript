// 
// 
//
// ==UserScript==
// @name          JR's bulletin Page
// @namespace     JR's
// @description	  Myspace bulletin page
// @include       http://bulletin.myspace.com/*
// ==/UserScript==

// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

// new stylesheet
s = "#nav {position:absolute; right:5}\n";
s+= "body {background:url(http://i23.photobucket.com/albums/b370/DrumFreak93X/bulletinback.jpg) #FFFFFF fixed;margin-top:-50px;}\n";
s+= "table, td {background:transparent!important; border:0 px; color:black!important;-moz-border-radius:10px;padding:2px;margin-bottom:10px; color:black}\n";
s+= "*{font-family:verdana}\n";
s+= "a:link, a:active, a:visited {color:black!important;font:bold 11px verdana!important;}\n";
s+= "a:hover {text-decoration:none; color:lime!important; background-image:url(); }\n";
s+= "#msft {display:none}\n";


GM_addStyle(s);

