version="v2.3v";
chglog="- Add-on released!!";
// ==UserScript==
// @name		Youtube Music Player
// @version        	2.3
// @namespace		localhost
// @description		Music Player for youtube ;)
// @include        	http://*.youtube.com/*
// @require        	http://userscripts.org/scripts/version/33024/60305.user.js
// ==/UserScript==

//Copyright: dark.cton
//You are allowed to copy this code as often as you want
//If you want to change this code or use parts of it please contact me at beamgeraet@web(dot)de
//Enjoy

if(GM_getValue("addon","")=="")
{
if(confirm("The Userscript Youtube Music Player has been compiled into an Add-on! Click ok to go to the Add-on web page"))
{
 window.open("https://addons.mozilla.org/de/firefox/addon/10727");
}
}
GM_setValue("addon","done");