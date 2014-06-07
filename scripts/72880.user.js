// ==UserScript==
// @name           Facebook HTML5 Video Element
// @namespace      Custopootimus
// @description    Replace Facebook's Flash video player with HTML5 video element. 
// @include        http://lite.facebook.com/*/video/*
// @include        http://www.facebook.com/*/video.php*
// @include        http://www.facebook.com/#!/video/video.php?v=*
// ==/UserScript==
// This script is only a minor modification (with quite a big change in function) to a script written by rashid8928 which can be found here: http://userscripts.org/scripts/show/70766 I then made several changes and compressed the script using Google's Closure Compiler.

for(var a=0;h3=document.getElementsByTagName("script")[a];){var b=unescape(unescape(h3.textContent.replace(/\s+|\s+/g,unescape(" ")).replace(/mp4.+/,"mp4").replace(/.+http/,"http").replace(/\\/g,"")));if(b.match(/^http.+mp4$/))document.getElementById("player").innerHTML="<video src='"+b+"' controls='controls' class='mvp_player' style='height: 403px;width: 716px;'>";a++};