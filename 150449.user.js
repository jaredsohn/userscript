// ==UserScript==
// @name           HackForums.net - Thread Rating Count
// @namespace      spafic/ratingcount
// @description    Lets the viewer see how many ratings each thread in a section has.
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        This script is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. Summary: Free for personal non-commercial use;
//
// @match          *://*.hackforums.net/forumdisplay.php?fid=*
// @version        1.0.0
// @downloadURL    https://userscripts.org/scripts/source/150449.user.js
// @updateURL      https://userscripts.org/scripts/source/150449.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// ==/UserScript==

(function(){var b,a,c;b=document.getElementsByClassName("current_rating");for(a=0;a<b.length;a++)c=b[a].textContent.toString().split(/ Vote\(s\) - /gim)[0],b[a].parentNode.parentNode.innerHTML+=" ("+c+")"})();