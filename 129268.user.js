// ==UserScript==
// @name           HackForums Post Character Count
// @namespace      https://userscripts.org/scripts/show/129268
// @description    Count the amount of characters in every post.
// @match          *://*.hackforums.net/showthread.php*
// @version        1.0.0
// @downloadURL    https://userscripts.org/scripts/source/129268.user.js
// @updateURL      https://userscripts.org/scripts/source/129268.meta.js
// ==/UserScript==
// Copyright 2012 PyroStorm
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
var a,b,c,d,e,r,i,p,n,h,s,t,j,ab,bb;r=document.getElementsByClassName("post_body");c="children";p="parentNode";ab=document.createElement("span");ab.className="charcount_container";ab.innerHTML=" &bull; Characters: ";bb=document.createElement("span");bb.className="charcount";bb.style.setProperty("color","blue","");bb.style.setProperty("font-weight","bold","");d=function(f){a=ab.cloneNode(true);b=bb.cloneNode(true);b.innerHTML=(f.textContent||f.innerText).replace(/\r+|^\s+|\s+$/,"").replace(/\s{3,}/g,"").length.toString();j=f[p][p][p][c][0][c][0][c][0][c][0];a.appendChild(b);j.appendChild(a)};for(i in r){d(r[i])}