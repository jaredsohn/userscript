// ==UserScript==
// @name           HackForums.net - Signature Character Counter
// @namespace      spafic/sigcharcount
// @description    Lets the user know how many characters are in his signature
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/usercp.php?action=editsig
// @version        1.0.0
// @downloadURL    https://userscripts.org/scripts/source/137853.user.js
// @updateURL      https://userscripts.org/scripts/source/137853.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// ==/UserScript==

(function(){function f(b,a){255==b.value.length&&(a.innerHTML=b.value.length+" <span style='color:red'>(Maximum length)</span>");255<b.value.length&&(a.innerHTML=b.value.length,a.style.color="red");255>b.value.length&&(a.innerHTML=b.value.length,a.style.color="green");return 1}var e,a,c,d;e=document.getElementsByTagName("table")[3].getElementsByClassName("smalltext")[0].parentNode;a=document.createElement("span");a.setAttribute("class","smalltext");a.innerHTML="Characters: ";d=document.createElement("span");d.setAttribute("class","smalltext");f(document.getElementById("signature_new"),d);a.appendChild(d);c=document.createElement("br");e.appendChild(c);c=null;c=document.createElement("br");e.appendChild(c);e.appendChild(a);document.getElementById("signature_new").addEventListener("keyup",function(){f(document.getElementById("signature_new"),d)})})();