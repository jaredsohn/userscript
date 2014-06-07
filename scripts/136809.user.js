// ==UserScript==
// @name           HackForums.net - Userscript List
// @namespace      spafic/userscriptlist
// @description    Lists a collection of userscripts in a very stylish way.
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/userscripts
// @version        1.0.4
// @downloadURL    https://userscripts.org/scripts/source/136809.user.js
// @updateURL      https://userscripts.org/scripts/source/136809.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.0.1 - Made display areas bigger so text does not overlap.
// @history        1.0.2 - Changed download link text.
// @history        1.0.3 - Added loading image.
// @history        1.0.4 - Changed formatting of display boxes
// ==/UserScript==

(function(){function m(){GM_xmlhttpRequest({method:"GET",url:"https://dl.dropbox.com/u/7870266/Extentions/HackForums.net/UserScript%20List/myHTML_body.txt",onload:function(a){e=a.responseText;o()}})}function o(){GM_xmlhttpRequest({method:"GET",url:"https://dl.dropbox.com/u/7870266/Extentions/HackForums.net/UserScript%20List/list.txt",onload:function(n){document.head.innerHTML=f;document.body.innerHTML=e;g=document.getElementById("workarea");b=n.responseText.split(/\n/gim);for(a=0;a<b.length;a++)h=b[a].split(/\|/gim)[0],i=b[a].split(/\|/gim)[1],j=b[a].split(/\|/gim)[2],k=b[a].split(/\|/gim)[3],d=b[a].split(/\|/gim)[4],l=b[a].split(/\|/gim)[5],c=document.createElement("div"),c.setAttribute("style","width: 32%; height:150px;max-height:130px;float: left; border: 1px #4F3A6B solid; margin: 4px; padding: 2px;"),c.innerHTML='<table width="100%" cellspacing="0" cellpadding="5" border="0"><tbody><tr><td class="trow1" width="100%"><span><strong>Author:</strong> <a href="'+l+'">'+j+'</a></span><br /><span class="smalltext"><a href="'+d+'">'+d+"</a></span><br /><br /><span><strong>Script:</strong> "+i+"</span><br /><span><strong>Description:</strong> "+k+'</span><br /><strong><a href="'+h+'">Click here to download</a></strong></td></tr></tbody></table>',g.appendChild(c),c=null}})}var f,e,g,c,b,h,i,j,k,d,l,a;b=[];a=0;document.body.innerHTML='<center><img src="https://dl.dropbox.com/u/7870266/Extentions/HackForums.net/UserScript%20List/ajax-loader.gif" alt="Loading" /></center>';GM_xmlhttpRequest({method:"GET",url:"https://dl.dropbox.com/u/7870266/Extentions/HackForums.net/UserScript%20List/myHTML_head.txt",onload:function(a){f=a.responseText;m()}})})();