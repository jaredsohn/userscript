// ==UserScript==
// @name           HackForums.net - Classic View Award Fix
// @namespace      spafic/classicawards
// @description    Divides every 6th award in the Classic View Mode.
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/showthread.php?tid=*

// @version        1.0.2
// @downloadURL    https://userscripts.org/scripts/source/135818.user.js
// @updateURL      https://userscripts.org/scripts/source/135818.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.0.1 - Compressed and cross-browser compatible.
// @history        1.0.2 - Fixed a small bug that causes it to not break.
// ==/UserScript==

(function(){var d,c,g,a,e,b,f;if(-1==document.body.innerHTML.indexOf(String.fromCharCode(60,33,45,45,32,101,110,100,58,32,112,111,115,116,98,105,116,95,99,108,97,115,115,105,99,32,45,45,62)))throw Error(String.fromCharCode(89,111,117,32,97,114,101,32,110,111,116,32,105,110,32,99,108,97,115,115,105,99,32,118,105,101,119,32,109,111,100,101,46,32,32,84,111,32,117,115,101,32,116,104,101,32,67,108,97,115,115,105,99,32,86,105,101,119,32,65,119,97,114,100,32,70,105,120,44,32,112,108,101,97,115,101,32,99,104,97,110,103,101,32,121,111,117,114,32,118,105,101,119,32,109,111,100,101,32,116,111,32,99,108,97,115,115,105,99,46));d=document.getElementById(String.fromCharCode(112,111,115,116,115)).getElementsByTagName(String.fromCharCode(105,109,103));c=[];for(a=f=b=e=g=0;a<d.length-1;a++)-1!=d[a].getAttribute(String.fromCharCode(115,114,99)).search(/uploads\/awards\//gim)&&(c[g]=d[a],g++);for(a=0;a<c.length;a++)if(0==b&0==f&&(f=b=c[a].parentNode.parentNode.getElementsByTagName(String.fromCharCode(97))[0].getAttribute(String.fromCharCode(104,114,101,102)).split(String.fromCharCode(117,105,100,61))[1]),b=c[a].parentNode.parentNode,null==b.getAttribute(String.fromCharCode(115,116,121,108,101)))b=b.getElementsByTagName(String.fromCharCode(97))[0].getAttribute(String.fromCharCode(104,114,101,102)).split(String.fromCharCode(117,105,100,61))[1],b==f?6==e&&(d=document.createElement(String.fromCharCode(98,114)),c[a].parentNode.insertBefore(d,c[a]),e=0):(f=b,e=0),e++})();