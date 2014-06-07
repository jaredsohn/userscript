// ==UserScript==
// @name           Chrome Quick Quote
// @namespace      https://userscripts.org/scripts/show/128231
// @description    Quote posts into the Quick Reply box.
// @match          *://*.hackforums.net/showthread.php*
// @version        1.0.2
// @downloadURL    https://userscripts.org/scripts/source/128231.user.js
// @updateURL      https://userscripts.org/scripts/source/128231.meta.js
// ==/UserScript==
// Copyright 2012 PyroStorm
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
var ref,k,v,b,n,quote,msg,post,author,author1,pid,c,p;ref=document.getElementsByClassName("post_management_buttons");b=document.createElement("a");b.setAttribute("class","bitButton");b.setAttribute("title","Quote this message in a quick reply");b.setAttribute("rel","nofollow");b.setAttribute("href","##");b.innerHTML="Quick Quote";msg=document.getElementById("message");c="children";p="parentNode";quote=function(){post=this[p][p][p][p][c][2][c][0][c][0];author1=this[p][p][p][p][c][1][c][0][c][0][c][0][c][0][c][1][c][0][c][0][c][0];if(typeof author1[c][0]!=="undefined"){author=author1[c][0]}else{author=author1}pid=post.getAttribute("id").slice(4);msg.innerHTML+=("[quote='"+author.innerHTML+"' pid='"+pid+"']"+(post.textContent||post.innerText).replace(/\r+|^\s+|\s+$/,"").replace(/^\s+/,"").replace(/\s+$/,"")+"[/quote]\n\n")};for(k in ref){v=ref[k];n=b.cloneNode(true);n.addEventListener("click",quote,true);v.insertBefore(n,v[c][0])};
