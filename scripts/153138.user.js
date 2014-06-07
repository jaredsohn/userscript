// ==UserScript==
// @name           HackForums.net - Close On Reply
// @namespace      spafic/closereply
// @description    This script allows you to reply to a thread then close it as soon as your reply is posted.
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/showthread.php?*
// @version        1.0.2
// @downloadURL    https://userscripts.org/scripts/source/153138.user.js
// @updateURL      https://userscripts.org/scripts/source/153138.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.0.1 - Added compatibility for classic view mode
// @history        1.0.2 - Added FireFox compatibility
// ==/UserScript==

(function(){var c=document.getElementById("quickreply_e").getElementsByTagName("td")[0].getElementsByClassName("smalltext")[0],b=!1,d,a;for(a=0;a<document.getElementsByName("action").length;a++)if("selfclose"==document.getElementsByName("action")[a].getAttribute("value")){b=!0;break}if("undefined"==typeof localStorage)throw Error("Your browser does not support HTML5 localStorage. Try upgrading.");null==localStorage.getItem("hf_locker")||"undefined"==localStorage.getItem("hf_locker")?(a=!1,localStorage.setItem("hf_locker","false")):a=localStorage.getItem("hf_locker");if("true"==a){for(a=0;a<document.getElementsByName("action").length;a++)if("selfclose"==document.getElementsByName("action")[a].getAttribute("value")){document.getElementsByName("action")[a].parentNode.setAttribute("onsubmit","");document.getElementsByName("action")[a].parentNode.submit();break}localStorage.setItem("hf_locker","false");a=localStorage.getItem("hf_locker")}"false"==a&&!0==b&&(b=document.createElement("br"),c.appendChild(b),b=document.createElement("label"),b.innerHTML='<input type="checkbox" class="checkbox" id="closer" name="closer" value="1">&nbsp;<strong>Close on Reply</strong></label>',c.appendChild(b),document.getElementById("closer").addEventListener("click",function(){d=confirm("Are you sure you want to close this thread?");if(this.checked==false){if(d==true)return this.checked=true;return this.checked=false}},!1),document.getElementById("quick_reply_submit").addEventListener("click",function(){document.getElementById("closer").checked==true?localStorage.setItem("hf_locker","true"):localStorage.setItem("hf_locker","false")}))})();