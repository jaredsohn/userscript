// ==UserScript==
// @name           HackForums Hide User Titles
// @namespace      https://userscripts.org/scripts/show/128304
// @description    Hide User Titles.
// @match          *://*.hackforums.net/showthread.php*
// @match          *://*.hackforums.net/private.php*action=read*
// @match          *://*.hackforums.net/member.php*action=profile*
// @version        1.0.0
// @downloadURL    https://userscripts.org/scripts/source/128304.user.js
// @updateURL      https://userscripts.org/scripts/source/128304.meta.js
// ==/UserScript==
// Copyright 2012 PyroStorm
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
var authors,i,a,b,c,rm;authors=document.getElementsByClassName("post_author");c="children";rm=function(d){b=d[c][0];d.removeChild(b.previousSibling);d.removeChild(b)};if(window.location.href.indexOf("action=profile")!==-1){rm(document.getElementsByClassName("quick_keys")[0].getElementsByClassName("trow1")[0].getElementsByClassName("smalltext")[0])}else{for(i in authors){rm(authors[i][c][3])}};