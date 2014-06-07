/*****************************************************************************\
* Merci sof :coeur:
\*****************************************************************************/

// ==UserScript==
// @name           Fake mod jvc
// @namespace       MK
// @description		Crée une interface de mod factice
// @version			1.0.1
// @include        http://www.jeuxvideo.com/*
// @license			GPL version 3 or any later version;
// @license			http://www.gnu.org/copyleft/gpl.html
// @resource		licence	http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

var tr, td, newTd, ul, li, suppr, kick, banTemp, banDef, img;

if (new RegExp("\\.jeuxvideo\\.com/forums/([0-9]+)\\-([0-9]+)\\-([0-9]*)\\-([0-9]*)\\-([^-]*)\\-([0-9]*)\\-([0-9]*)\\-(.*)\\.htm#?(.*)").test(location.href)) {
	switch (RegExp.$1) {
	case "0" :
		try {
			tr = document.getElementById("liste_topics").getElementsByTagName("tr");
			td = tr[0].getElementsByTagName("th");
			newTd = document.createElement("th");
			newTd.className = "col_moder";
			newTd.innerHTML = "&nbsp;";
			tr[0].insertBefore(newTd, td[0].nextSibling);
			
			for (i = 1; i < tr.length; i += 1) {
				td = tr[i].getElementsByTagName("td");
				if (td.length > 3) {
					newTd = document.createElement("td");
					
					suppr = document.createElement("a");
					suppr.href = "http://www.jeuxvideo.com/cgi-bin/jvforums/moderation.cgi";
					suppr.setAttribute("target", "popup");
					suppr.setAttribute("onclick", "return confirmation('');");
					
					img = document.createElement("img");
					img.setAttribute("width", "11");
					img.setAttribute("height", "12");
					img.alt = "Supprimer ce message";
					img.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_sup_msg.gif";
					
					suppr.appendChild(img);
					newTd.appendChild(suppr);
					tr[i].insertBefore(newTd, td[0].nextSibling);
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
					suppr.href = "http://www.jeuxvideo.com/cgi-bin/jvforums/moderation.cgi";
					suppr.setAttribute("target", "popup");
					if (ul[i].parentNode.id === "message_" + RegExp.$3) {
						suppr.setAttribute("onclick", "return confirmation('');");
					} else {
						suppr.setAttribute("onclick", "return confirmation('');");
					}
					
					img = document.createElement("img");
					img.setAttribute("width", "11");
					img.setAttribute("height", "12");
					img.alt = "Supprimer ce message";
					img.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_sup_msg.gif";
					
					suppr.appendChild(img);
					li[0].insertBefore(suppr, li[0].firstChild);
					
					
					
					kick = document.createElement("a");
					kick.href = "http://www.jeuxvideo.com/cgi-bin/jvforums/moderation.cgi";
					kick.setAttribute("target", "kick_user");
					kick.setAttribute("onclick", "window.open('','kick_user','width=580,height=230,scrollbars=no,status=no')");
					
					img = document.createElement("img");
					img.setAttribute("width", "11");
					img.setAttribute("height", "12");
					img.alt = "Kicker cet utilisateur de ce forum";
					img.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_bann_48h.gif";
					
					kick.appendChild(img);
					li[1].insertBefore(kick, li[1].lastChild);
					li[1].insertBefore(document.createTextNode(" \n"), li[1].lastChild);
					

				}
			}
		} catch (e) {
		}
		break;
	}
}