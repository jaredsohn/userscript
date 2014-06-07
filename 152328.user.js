// ==UserScript==
// @name           viphackforums.net - Scroll Quotes
// @namespace      spafic/scroll
// @description    Makes large quotes take up less space on viphackforums.net
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.viphackforums.net/showthread.php*
// @match          *://*.viphackforums.net/newreply.php?tid=*&processed=1
// @match          *://*.viphackforums.net/newthread.php?fid=*&processed=1
// @match          *://*.viphackforums.net/private.php*
// @version        
// @downloadURL    https://userscripts.org/scripts/source/128503.user.js
// @updateURL      https://userscripts.org/scripts/source/128503.meta.js
//
// @icon           http://cdn2.viphackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.viphackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.1.0 - Compressed and changed a few things around.
// ==/UserScript==

(function(){var b=document.getElementsByClassName("post_body");for(i=0;i<b.length;i++){var a=b[i].getElementsByTagName("blockquote");for(x=0;x<a.length;x++)a[x].style.maxHeight="200px",a[x].style.width="99%",a[x].style.overflowY="scroll",a[x].style.overflowX="hidden"}})();