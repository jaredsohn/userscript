// ==UserScript==
// @name           HackForums Post Style
// @namespace      https://userscripts.org/scripts/show/128508
// @description    Define a style for all posts from the User CP Options.
// @match          *://*.hackforums.net/private.php?action=read*
// @match          *://*.hackforums.net/usercp.php?action=options*
// @match          *://*.hackforums.net/showthread.php*
// @version        1.0.0
// @downloadURL    https://userscripts.org/scripts/source/128508.user.js
// @updateURL      https://userscripts.org/scripts/source/128508.meta.js
// ==/UserScript==
// Copyright 2012 PyroStorm
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
var GM_available,localStorage_available,post_setup,style_config,table;GM_available=typeof GM_getValue!=="undefined"&&GM_getValue!==null;localStorage_available=typeof localStorage!=="undefined"&&localStorage!==null;if(window.location.href.indexOf("usercp.php?action=options")===-1){post_setup=function(){var e,d,c,a,f;if(localStorage_available){e=localStorage.getItem("HF_post_style");if(e===null){e="";localStorage.setItem("HF_post_style",e)}}else{e=GM_getValue("HF_post_style","")}a=document.getElementsByClassName("post_body");for(d in a){f=a[d];c=document.createElement("span");c.appendChild(f.cloneNode(true));c.setAttribute("style",e);f.parentNode.replaceChild(c,f)}};post_setup()}else{style_config=function(){var a;a=prompt("Enter your post style:").replace(/\\n/g,"\n");if(localStorage_available){localStorage.setItem("HF_post_style",a)}else{GM_setValue("HF_post_style",a)}};table=document.getElementsByClassName("trow2")[1].getElementsByTagName("table")[0];table.innerHTML+='<tr><td colspan="2"><span class="smalltext"><a href="##">Configure your post style.</a></span></td></tr>';table.getElementsByTagName("a")[1].addEventListener("click",style_config,true)};