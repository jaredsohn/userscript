// ==UserScript==
// @name           HackForums.net - Live TinyChat
// @namespace      xaze_211/livechat
// @description    Gives users the ability to chat live directly from HackForums.net
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/
// @match          *://*.hackforums.net/index.php
// @match          *://*.hackforums.net/usercp.php?action=options
// @version        3.0
// @downloadURL    https://userscripts.org/scripts/source/128517.user.js
// @updateURL      https://userscripts.org/scripts/source/128517.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0. - Script created
// @history        1.1 - N/A
// @history        2.1 - N/A
// @history        3.0 - Completely recoded.  Same design.
// ==/UserScript==

(function(){var c,e,a,b,d;null==localStorage.getItem("hf_tinychat")&&localStorage.setItem("hf_tinychat","parlaying");-1!=document.location.toString().indexOf("options")?(c=document.getElementsByTagName("fieldset")[3].getElementsByTagName("tbody")[0],a=document.createElement("tr"),a.innerHTML='<td><span class="smalltext">TinyChat Room</span></td>',c.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td><input type="text" name="my_tc" id="my_tc" style="background-color:#CCC;" value="'+localStorage.getItem("hf_tinychat")+'"/></td>',c.appendChild(a),document.getElementsByClassName("button")[0].addEventListener("click",function(){localStorage.setItem("hf_tinychat",document.getElementById("my_tc").value)})):(c=document.getElementById("menutabs"),e=document.getElementsByClassName("quick_keys")[0],a=document.createElement("li"),a.style.cursor="pointer",b=document.createElement("a"),b.setAttribute("id","tabmenu_1337"),b.innerHTML="Chat",b.addEventListener("click",function(){"selected"==this.getAttribute("class")?(this.setAttribute("class","notselected"),document.getElementById("chattab_content").parentNode.removeChild(document.getElementById("chattab_content"))):(this.setAttribute("class","selected"),e.insertBefore(d,document.getElementById("tabmenu_1")))}),a.appendChild(b),c.appendChild(a),b=a=null,d=document.createElement("div"),d.setAttribute("id","chattab_content"),d.innerHTML='<table border="0" cellspacing="1" cellpadding="4" class="tborder">\t\t<thead>\t\t\t<tr>\t\t\t\t<td class="thead">\t\t\t\t\t<div><strong><a>Chat</a></strong><br><div class="smalltext"></div></div>\t\t\t\t</td>\t\t\t</tr>\t\t</thead>\t\t<tbody id="cat_1337_e">\t\t\t<tr>\t\t\t\t<td class="tcat">\t\t\t\t\t<span class="smalltext">\t\t\t\t\t\t<strong>Made By <a href="http://www.hackforums.net/member.php?action=profile&uid=47962">Spafic</a></strong>\t\t\t\t\t</span>\t\t\t\t</td>\t\t\t</tr>\t\t\t<tr>\t\t\t\t<td class="trow1" valign="top" height="500" >\t\t\t\t\t<iframe src="http://tinychat.com/embed/chat.html?room='+localStorage.getItem("hf_tinychat")+'&colorbk=0x000000&oin=auto&api=list" style="width:100%;height:100%;border:0px" border="0">Your browser does not support iframes.  Sorry :(.</iframe> \t\t\t\t</td>\t\t\t</tr>\t\t</tbody>\t</table><br />')})();

