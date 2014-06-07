// ==UserScript==
// @name           HackForums.net - Quick reply to new reply
// @namespace      spafic/quick2new
// @description    Transfers text in quick reply area to new reply area
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/showthread.php?tid=*
// @match          *://*.hackforums.net/newreply.php?tid=*
// @version        1.0.3
// @downloadURL    https://userscripts.org/scripts/source/.user.js
// @updateURL      https://userscripts.org/scripts/source/.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.0.1 - Script compressed and cross-browser support
// @history        1.0.2 - Minor change
// @history        1.0.3 - If nothing is transfered, does not remove existing text
// ==/UserScript==

(function(){var b,a,c,d;if("undefined"==typeof localStorage)throw Error("Your browser does not support HTML5 localStorage. Try upgrading.");-1==document.location.toString().search(/newreply/)?(d=document.getElementsByName("tid")[0].value,b=document.getElementById("quickreply_e").getElementsByTagName("tr")[1].getElementsByTagName("td")[0],a=document.createElement("button"),a.innerHTML="Transfer to New Reply",a.setAttribute("type","button"),a.setAttribute("id","quick_to_new"),a.addEventListener("click",function(){c=document.getElementById("message").value;localStorage.setItem("hf_quick2new",c);window.location="newreply.php?tid="+d;return!1}),b.appendChild(a)):(b=document.getElementById("message"),""!=localStorage.getItem("hf_quick2new")&&(b.value=localStorage.getItem("hf_quick2new")),localStorage.setItem("hf_quick2new",""))})();