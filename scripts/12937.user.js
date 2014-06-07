//
//
// ==UserScript==
// @name          Clean MySpace login page
// @description	  Cleans up all the annoying stuff from the login page
// @include       http://*myspace.com*
// @exclude       http://*profile.myspace.com*
// @exclude       http://*home.myspace.com/index.cfm?fuseaction=user
// ==/UserScript==

//s+= "\n";
//This puts in the basic styles
s = "#wrap{background:#FFF;}\n";

s+= "#ctl00_Main_SplashDisplay_gettingStarted_getstarted,#footer,#ctl00_Main_SplashDisplay_featuredVideos_CMS_videos,#splash_mainLeft,#splash_coolNewPeople{display:none}\n";

s+= "#splash_login_container{position:absolute; left:33%!important;}\n";

s+= "#splash_login{background:#6698CB!important; -moz-border-radius:50.6px; padding:15px;}\n";


html = document.body.innerHTML.replace(/Member Login/, "Login, bish!!1!"); 
document.body.innerHTML = html;
GM_addStyle(s);

