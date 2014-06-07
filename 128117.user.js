// ==UserScript==
// @name           HackForums No Prestige
// @namespace      https://userscripts.org/scripts/show/128117
// @description    Don't display Prestige on HackForums.
// @match          *://*.hackforums.net/private.php?*action=read*
// @match          *://*.hackforums.net/showthread.php*
// @match          *://*.hackforums.net/member.php?*action=profile*
// @author         PyroStorm
// @version        1.0
// @downloadURL    https://userscripts.org/scripts/source/128117.user.js
// @updateURL      https://userscripts.org/scripts/source/128117.meta.js
// ==/UserScript==
// Copyright 2012 PyroStorm
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
if(window.location.href.indexOf("member.php")===-1){var c,p,i,i2,ref,ref2;ref=document.getElementsByClassName("post_author_info");for(i in ref){p=ref[i];c=p.childNodes;ref2=[c[0],c[1]];for(i2 in ref2){p.removeChild(ref2[i2])}}}else{var i3,ref3,p3;ref3=document.getElementsByClassName("trow2");for(i3 in ref3){p3=ref3[i3];if(p3.firstChild.innerHTML==="Prestige: "){p3.parentNode.parentNode.removeChild(p3.parentNode)}}};