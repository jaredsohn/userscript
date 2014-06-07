/*****************************************************************************\
* Copyright (C) 2010  giftasp                                *
*                                                                             *
*    This program is free software: you can redistribute it and/or modify     *
*    it under the terms of the GNU General Public License as published by     *
*    the Free Software Foundation, either version 3 of the License, or        *
*    (at your option) any later version.                                      *
*                                                                             *
*    This program is distributed in the hope that it will be useful,          *
*    but WITHOUT ANY WARRANTY; without even the implied warranty of           *
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the            *
*    GNU General Public License for more details.                             *
*                                                                             *
*    You should have received a copy of the GNU General Public License        *
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.    *
\*****************************************************************************/

// ==UserScript==
// @name           admin interface
// @namespace       AI
// @description		interface admin
// @version			1.0.1
// @include        http://www.jeuxvideo.com/*
// @copyright		asp
// @copyright		<giftasp@gmail.com>
// @license			GPL version 3 or any later version;
// @license			http://www.gnu.org/copyleft/gpl.html
// @resource		licence	http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

var tr, td, newTd, ul, li, suppr, kick, banTemp, banDef, img;

if (new RegExp("\\.jeuxvideo\\.com/forums/([0-9]+)\\-([0-9]+)\\-([0-9]*)\\-([0-9]*)\\-([^-]*)\\-([0-9]*)\\-([0-9]*)\\-(.*)\\.htm#?(.*)").test(location.href)) {
	switch (RegExp.$1) {
	case "0" :
		try {
			
			for (i = 1; i < tr.length; i += 1) {
				td = tr[i].getElementsByTagName("td");
				if (td.length > 3) {
					newTd = document.createElement("td");
					
				
				}
			}
		} catch (e) {
		}
		break;
	case "1" :
	case "3" :
		try {
			ul = document.getElementById("col1").getElementsByTagName("ul");
			for (i = 0; i < ul.length; i += 1) {
				li = ul[i].getElementsByTagName("li");
				if (li.length > 3) {
					suppr = document.createElement("a");
					suppr.href = "#";
					suppr.setAttribute("target", "popup");
					if (ul[i].parentNode.id === "message_" + RegExp.$3) {
						suppr.setAttribute("onclick", "return confirmation('');");
					} else {
						suppr.setAttribute("onclick", "window.open('','popup','width=640,height=480,scrollbars=no,status=no')");
					}
					
					img = document.createElement("img");
					img.setAttribute("width", "0");
					img.setAttribute("height", "0");
					img.alt = "Supprimer ce message";
					img.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_sup_msg.gif";
					
					suppr.appendChild(img);
					li[0].insertBefore(suppr, li[0].firstChild);
					
					
					
					
					
					
					banTemp = document.createElement("a");
					banTemp.href = "#";
					banTemp.setAttribute("target", "bann_temp_user");
					banTemp.setAttribute("onclick", "return confirmation_ban_tmp('');");
					
					img = document.createElement("img");
					img.setAttribute("width", "11");
					img.setAttribute("height", "12");
					img.alt = "Supprimer ce message et bannir son auteur temporairement";
					img.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_bann_tempo.gif";
					
					banTemp.appendChild(img);
					li[1].insertBefore(banTemp, li[1].lastChild);
					li[1].insertBefore(document.createTextNode(" \n"), li[1].lastChild);
					
					
					
					
					banDef = document.createElement("a");
					banDef.href = "#";
					banDef.setAttribute("target", "bann_def_user");
					banDef.setAttribute("onclick", "return confirmation_ban('');");
					
					img = document.createElement("img");
					img.setAttribute("width", "11");
					img.setAttribute("height", "12");
					img.alt = "Supprimer ce message et bannir son auteur définitivement";
					img.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_bann_defi.gif";
					
					banDef.appendChild(img);
					li[1].insertBefore(banDef, li[1].lastChild);
					li[1].insertBefore(document.createTextNode(" \n"), li[1].lastChild);
				}
			}
		} catch (e) {
		}
		break;
	}
}