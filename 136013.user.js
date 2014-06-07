// ==UserScript==
// @name           HackForums.net - Hide Blocked Posts
// @namespace      spafic/hideblockposts
// @description    Really hides posts by users you have ignored
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/showthread.php?tid=*

// @version        1.0.1
// @downloadURL    https://userscripts.org/scripts/source/136013.user.js
// @updateURL      https://userscripts.org/scripts/source/136013.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.0.1 - Compressed and cross-browser compatable.
// ==/UserScript==

(function(){var b,a,d,c;c=[];b=document.getElementById("posts").getElementsByTagName("table");for(a=d=0;a<b.length;a++)-1!=b[a].id.toString().indexOf("ignored_post_")&&(c[d]=b[a],d++);for(a=0;a<c.length;a++)c[a].style.display="none"})();