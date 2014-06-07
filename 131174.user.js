// ==UserScript==
// @name           HackForums.net - Custom Word Filter
// @namespace      spafic/wordfilter
// @description    Filters words of viewers choice on HackForums.net
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/showthread.php?tid=*
// @match          *://*.hackforums.net/usercp.php*
// @match          *://*.hackforums.net/private.php*
// @match          *://*.hackforums.net/usercp.php?action=filters

// @version        1.1.1
// @downloadURL    https://userscripts.org/scripts/source/131174.user.js
// @updateURL      https://userscripts.org/scripts/source/131174.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.1.0 - Fixed a few bugs
// @history        1.1.1 - Compressed and optmized
// ==/UserScript==

(function(){var b,e,c,a,d,f,g,h;if("undefined"==typeof localStorage)throw Error("Your browser does not support HTML5 localStorage. Try upgrading.");b=localStorage.getItem("hf_word_filter");b=null==b?"":JSON.parse(b);if(-1!=document.location.toString().indexOf("usercp.php")&&-1!=document.location.toString().indexOf("action=filters")){document.title="Word Filter Configuration";e={};if(""!==b)for(c in b)a=b[c],e[c]=a,d=document.createElement("div"),d.innerHTML="<b>"+c+"</b> is replaced with <b>"+a+'</b> - <button id="'+escape(c)+'">Delete</button><br />',document.body.appendChild(d),a=document.getElementById(escape(c)),a.addEventListener("click",function(){try{delete e[unescape(this.id)],localStorage.setItem("hf_word_filter",JSON.stringify(e))}catch(a){}window.location.reload()},!1);a=document.createElement("div");a.setAttribute("id","replacement_add");a.innerHTML='<br />Add a new filter.<br />Replace <input type="text" name="word" id="word"> with <input type="text" name="replace" id="replace"><br /><input type="button" id="add" name="add" value="Add">';document.body.appendChild(a);a=document.createElement("div");a.innerHTML='<button id="clear" value="Clear all" name="clear">Clear all</button>';a.setAttribute("style","position:absolute;top:95%;");document.body.appendChild(a);a=document.getElementById("add");a.addEventListener("click",function(){try{f=document.getElementById("word").value,g=document.getElementById("replace").value,e[f]=g,localStorage.setItem("hf_word_filter",JSON.stringify(e))}catch(a){a==QUOTA_EXCEEDED_ERR&&alert("Quota exceeded!")}window.location.reload()},!1);a=document.getElementById("clear");a.addEventListener("click",function(){try{localStorage.setItem("hf_word_filter",JSON.stringify(""))}catch(a){a==QUOTA_EXCEEDED_ERR&&alert("Quota exceeded!")}window.location.reload()},!1)}if(-1!=document.location.toString().indexOf("showthread.php?tid=")){d=document.getElementsByClassName("post_body");for(i=0;i<d.length;i++)for(c in b)a=b[c],h=RegExp("[^a-zA-Z0-9]"+c+"[^a-zA-Z0-9]","gi"),d[i].innerHTML=d[i].innerHTML.toString().replace(h," "+a+" ")}-1!=document.location.toString().indexOf("usercp.php")|-1!=document.location.toString().indexOf("private.php")&&-1==document.location.toString().indexOf("action=filter")&&(c=document.getElementById("usercpprofile_e"),b=document.createElement("tr"),b.innerHTML='<td class="trow1 smalltext"><a href="usercp.php?action=filters" class="usercp_nav_item usercp_nav_editsig">Edit Word Filters</a></td>',c.appendChild(b))})();