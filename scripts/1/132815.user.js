// ==UserScript==
// @name           HackForums Welcome Block Append
// @namespace      https://userscripts.org/scripts/show/132815
// @description    Define HTML to append to the welcome block from the User CP Options.
// @match          *://*.hackforums.net/*
// @author         PyroStorm
// @version        1.0.1
// @downloadURL    https://userscripts.org/scripts/source/132815.user.js
// @updateURL      https://userscripts.org/scripts/source/132815.meta.js
// ==/UserScript==
// Copyright 2012 PyroStorm
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
(function(){var b,c;b="undefined"!==typeof GM_getValue&&null!==GM_getValue;c="undefined"!==typeof localStorage&&null!==localStorage;if(b||c)-1===window.location.href.indexOf("usercp.php?action=options")?(b=function(){var a;c?(a=localStorage.getItem("HF_welcome_block_append"),null===a&&(a="",localStorage.setItem("HF_welcome_block_append",a))):a=GM_getValue("HF_welcome_block_append","");document.getElementById("panel").innerHTML+=a},-1!==navigator.userAgent.indexOf("Firefox")?document.addEventListener("DOMContentLoaded", b,!1):b()):(b=document.getElementsByClassName("trow2")[1].getElementsByTagName("table")[0],b.innerHTML+='<tr><td colspan="2"><span class="smalltext"><a href="##">Configure the HTML to append to your welcome block.</a></span></td></tr>',b.getElementsByTagName("a")[1].addEventListener("click",function(){var a;a=prompt("Enter the HTML to append to your welcome block:").replace(/\\n/g,"\n");c?localStorage.setItem("HF_welcome_block_append",a):GM_setValue("HF_welcome_block_append",a)},!0))})();