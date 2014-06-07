// ==UserScript==
// @name           HackForums.net - Scroll Quotes
// @namespace      spafic/scroll
// @description    Makes large quotes take up less space on HackForums.net
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        This script is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. Summary: Free for personal non-commercial use;
//
// @match          *://*.hackforums.net/showthread.php*
// @match          *://*.hackforums.net/newreply.php?tid=*&processed=1
// @match          *://*.hackforums.net/newthread.php?fid=*&processed=1
// @match          *://*.hackforums.net/private.php*
// @version        1.1.1
// @downloadURL    https://userscripts.org/scripts/source/.user.js
// @updateURL      https://userscripts.org/scripts/source/.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.1.0 - Compressed and changed a few things around.
// @history        1.1.1 - Added compatibility for classic view mode
// ==/UserScript==

(function(){var b=document.getElementsByClassName("spoiler_body");for(i=0;i<b.length;i++){var a=b[i].getElementsByTagName("blockquote");for(x=0;x<a.length;x++)a[x].style.maxHeight="200px",a[x].style.width="99%",a[x].style.overflowY="scroll",a[x].style.overflowX="hidden"}})();