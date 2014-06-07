// ==UserScript==
// @name          Clean Login Page
// @description      Removes the clutter from the MySpace login page
// @namespace     http://userscripts.org/users/34883
// @include     http://www.myspace.com/
// @include     http://www.myspace.com/index.cfm?fuseaction=splash*
// ==/UserScript==

s= 'div#ad440x160, div#splash_music, div#ad300x100, div#splash_coolNewPeople, div#splash_getStarted, div#ctl00_Main_SplashDisplay_CMS_SplashHome_Gads_DE, span#ctl00_Main_SplashDisplay_featuredVideos_CMS_videos, #footer {display:none;}\n'

GM_addStyle(s);