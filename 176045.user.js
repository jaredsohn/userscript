// ==UserScript==
// @name           LeakForums - :awesome:
// @namespace      DeNial/awesome
// @description    :awesome: on LeakForums.org
// @author         DeNial
// @copyright      DeNial 2013 (http://userscripts.org/users/429026)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.leakforums.org/showthread.php*
// @match          *://leakforums.org/showthread.php*
// @match          *://*.leakforums.org/newreply.php*
// @match          *://leakforums.org/newreply.php*
// @match          *://*.leakforums.org/newthread.php*
// @match          *://leakforums.org/newthread.php*
//
// @version        1.0
// @downloadURL    https://userscripts.org/scripts/source/169675.user.js
// @updateURL      https://userscripts.org/scripts/source/169675.meta.js
//
// @icon           http://www.leakforums.org/images/pro_star2.png
// @icon64         http://www.leakforums.org/images/pro_star2.png
// ==/UserScript==

/*
	:awesome: image provided by http://www.leakforums.org/member.php?action=profile&uid=21963
	http://i.neoseeker.com/mgv/349649-The%20New%20Era/649/34/epic_smiley_icon.png
*

/*
 * Script by DeNial,
 * Modified by Orange.
*/
(function(){var a,b,c;c=RegExp(":awesome:","gim");if(-1!=window.location.toString().indexOf("showthread.php?tid=")){document.getElementById("quick_reply_submit").addEventListener("mousedown",function(){document.getElementById("message").value=document.getElementById("message").value.toString().replace(c,"[img]http://i.neoseeker.com/mgv/349649-The%20New%20Era/649/34/epic_smiley_icon.png[/img]")},!1);a=document.getElementById("posts").getElementsByClassName("post_body");for(b=0;b<a.length;++b)a[b].innerHTML=a[b].innerHTML.replace(c,'<img src="http://i.neoseeker.com/mgv/349649-The%20New%20Era/649/34/epic_smiley_icon.png" border="0" alt="Awesome!" />')}else-1!=window.location.toString().indexOf("newreply.php?tid=")&&(a=document.createElement("tr"),a.innerHTML='<td style="text-align: center"><img src="http://i.neoseeker.com/mgv/349649-The%20New%20Era/649/34/epic_smiley_icon.png" width="16" height="16" border="0" class="smilie" alt=":awesome:" style="cursor: pointer" /></td>',a.addEventListener("mousedown",function(){document.getElementById("message_new").value+=":ohya:";document.getElementById("message_new").focus()},!1),document.getElementById("clickable_smilies").getElementsByTagName("tbody")[0].appendChild(a),document.getElementsByName("submit")[0].addEventListener("mousedown",function(){document.getElementById("message_new").value=document.getElementById("message_new").value.toString().replace(c,"[img]http://i.neoseeker.com/mgv/349649-The%20New%20Era/649/34/epic_smiley_icon.png[/img]")},!1))})();