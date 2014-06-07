// ==UserScript==
// @name           HackForums.net - Hide Locked Threads
// @namespace      spafic/hidelock
// @description    Hide locked threads on HackForums.net
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/search.php*
// @match          *://*.hackforums.net/forumdisplay.php*
// @version        1.2.0
// @downloadURL    https://userscripts.org/scripts/source/130898.user.js
// @updateURL      https://userscripts.org/scripts/source/130898.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.2.0 - Compressed and optimized
// ==/UserScript==

(function(){var e,a,f,b,c,d;e=document.getElementsByClassName("quick_keys")[0];a=e.getElementsByTagName("img");f=!0;e=e.getElementsByClassName("pagination")[0];b=document.createElement("button");b.setAttribute("type","checkbox");b.setAttribute("id","thisisahider");b.setAttribute("style","display:inline;margin:0;padding:2px;");b.innerHTML="Show Locked Threads";e.appendChild(b);b.addEventListener("click",function(){if(!0==f){this.innerHTML="Show Locked Threads";for(i=0;i<a.length;i++)-1!=a[i].src.toString().indexOf("lock")&&"DD"!=a[i].parentNode.tagName&&(c=a[i].parentNode.parentNode,d=c.getElementsByClassName("author smalltext")[0].innerHTML,-1==d.indexOf('uid=1"')&&a[i].parentNode.parentNode.setAttribute("style",""));f=!1}else{this.innerHTML="Hide Locked Threads";for(i=0;i<a.length;i++)-1!=a[i].src.toString().indexOf("lock")&&"DD"!=a[i].parentNode.tagName&&(c=a[i].parentNode.parentNode,d=c.getElementsByClassName("author smalltext")[0].innerHTML,-1==d.indexOf('uid=1"')&&a[i].parentNode.parentNode.setAttribute("style","display:none"));f=!0}},!1);for(i=0;i<a.length;i++)-1!=a[i].src.toString().indexOf("lock")&&"DD"!=a[i].parentNode.tagName&&(c=a[i].parentNode.parentNode,d=c.getElementsByClassName("author smalltext")[0].innerHTML,-1==d.indexOf('uid=1"')&&a[i].parentNode.parentNode.setAttribute("style","display:none"))})();