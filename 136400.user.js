// ==UserScript==
// @name           HackForums.net - Right Align All Posts
// @namespace      spafic/rightalignall
// @description    Forces all posts to have right side alignment
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/showthread.php?tid=*

// @version        1.0.2
// @downloadURL    https://userscripts.org/scripts/source/136400.user.js
// @updateURL      https://userscripts.org/scripts/source/136400.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.0.1 - Compressed and cross-browser compatible.
// @history        1.0.2 - Now works with classic and standard post view mode.
// ==/UserScript==

(function(){var a,b;!0==(-1==document.body.innerHTML.indexOf(String.fromCharCode(60,33,45,45,32,101,110,100,58,32,112,111,115,116,98,105,116,95,99,108,97,115,115,105,99,32,45,45,62))?!1:!0)?(a=document.getElementById(String.fromCharCode(112,111,115,116,115)),a=a.getElementsByTagName(String.fromCharCode(116,97,98,108,101))):a=document.getElementsByClassName(String.fromCharCode(112,111,115,116,95,98,111,100,121));for(b=0;b<a.length;b++)a[b].style.textAlign=String.fromCharCode(114,105,103,104,116)})();