// ==UserScript==
// @name           HackForums Prestige Display Under Reputation
// @namespace      https://userscripts.org/scripts/show/128112
// @description    Display Prestige under reputation on HackForums.
// @match          *://*.hackforums.net/private.php?*action=read*
// @match          *://*.hackforums.net/showthread.php*
// @author         PyroStorm
// @version        1.0.2
// @downloadURL    https://userscripts.org/scripts/source/128112.user.js
// @updateURL      https://userscripts.org/scripts/source/128112.meta.js
// ==/UserScript==
// Copyright 2012 PyroStorm
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
var c,p,i,i2,i3,ref,ref2;ref=document.getElementsByClassName("post_author_info");for(i in ref){p=ref[i];c=p.childNodes;ref2=[c[0],c[1]];for(i2 in ref2){p.removeChild(ref2[i2])}for(i3 in ref2){p.insertBefore(ref2[i3],c[c.length-2])}};