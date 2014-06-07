// ==UserScript==
// @name         HackForums.net - Subscribe To Forum 
// @namespace    spafic/sub2forum
// @description  Subscribe to entire forums on HackForums.net
// @author       Spafic
// @copyright    Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match        *://*.hackforums.net/forumdisplay.php*
// @version      1.2.1
// @downloadURL  https://userscripts.org/scripts/source/124949.user.js
// @updateURL    https://userscripts.org/scripts/source/124949.meta.js
//
// @website      http://userscripts.org/scripts/show/124949
// @website      http://hackforums.net/
// 
// @icon         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64       http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history      1.0 - Script created
// @history      1.1 - Added "Manage Subscriptions" button
// @history      1.2 - Compressed script
// @history      1.2.1 - Added a little bit of information to the metadata
// ==/UserScript==

(function(){var b=document.getElementsByTagName("a");for(i=0;i<b.length;i++){var c=b[i];if(-1!=c.href.indexOf("my_post_key"))var a=c.href.split(/my_post_key\=/),a=a[1]}b=document.getElementsByTagName("link");for(i=0;i<b.length;i++)if(c=b[i],-1!=c.href.indexOf("fid"))var e=c.href.split(/fid\=/),e=e[1];var c=document.getElementsByClassName("quick_keys")[0].getElementsByClassName("float_right")[0],b=document.createElement("div"),d=document.createElement("a");d.setAttribute("style","cursor:pointer;margin-right:2px;");d.setAttribute("class","bitButton");d.setAttribute("rel","nofollow");d.setAttribute("title","Subscribe to this forum");d.innerHTML="Subscribe To Forum";d.setAttribute("id","sub2forum");d.setAttribute("href","http://hackforums.net/usercp2.php?action=addsubscription&type=forum&fid="+e+"&my_post_key="+a);b.appendChild(d);a=document.createElement("a");a.setAttribute("style","cursor:pointer;margin-left:2px;");a.setAttribute("class","bitButton");a.setAttribute("rel","nofollow");a.setAttribute("title","Manage Forum Subscriptions");a.innerHTML="Manage Forum Subscriptions";a.setAttribute("id","managesub");a.setAttribute("href","http://hackforums.net/usercp.php?action=forumsubscriptions");b.appendChild(a);c.innerHTML+=b.innerHTML})();