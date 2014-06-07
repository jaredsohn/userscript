/*****************************************************************************\
* Copyright (C) 2010  Lúthien Sofea Elanessë                                  *
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
// @name           [Master Key] Generated Answers
// @namespace      MK
// @description		Générateur de messages
// @version			1.0.1
// @include        http://www.jeuxvideo.com/forums/3-*
// @copyright		2010, Lúthien Sofea Elanessë
// @copyright		<jeuxvideo.nyu@gmail.com>
// @license			GPL version 3 or any later version;
// @license			http://www.gnu.org/copyleft/gpl.html
// @resource		licence	http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

var reponses, message, p, zone, label, select, option, key, onselect;

reponses = {};

reponses["Cloture imminente"] = "--- CECI EST UN MESSAGE AUTOMATIQUE ---\n\n" +
		"Bonjour, nous avons détecté sur ce sujet du contenu hors-charte.\n" +
		"La sanction décidée en haut lieu est la clôture définitive.\n\n" +
		"Nous vous remercions de votre coopération.\n\n" +
		"Ze Modératerror's team\n\n" +
		"Powered by Sofea's corporation \"J.V.Nyu for the win\"";
reponses["Mauvaise foi"] = "Oui, oui j'ai bien lu vos demandes.\n" +
		"Mais ça ne change strictement rien du tout. :non:"
reponses["Taisez-vous, j'ai raison et pas vous"] = "Bon j'en ai marre de vos palabres creuses et stériles. :(\n" +
		"Kick + Ban pour tous ceux qui continuent. :-(("

message = document.getElementById("newmessage");
p = document.createElement("p");
p.className = "login";
zone = document.getElementById("login_pass");
if (zone === null) {
	zone = document.createElement("div");
	zone.id = "login_pass";
	message.parentNode.parentNode.insertBefore(zone, message.parentNode);
}
zone.appendChild(p);

label = document.createElement("label");
label.appendChild(document.createTextNode(" * Réponse auto : "));
p.appendChild(label);

select = document.createElement("select");
select.style.width = "300px";
p.appendChild(select);

option = document.createElement("option");
option.value = "";
select.appendChild(option);

for (key in reponses) {
	if (reponses.hasOwnProperty(key)) {
		option = document.createElement("option");
		option.value = reponses[key];
		option.appendChild(document.createTextNode(key));
		select.appendChild(option);
	}
}

onselect = "document.getElementById(\"newmessage\").value = this.value;";
select.setAttribute("onchange", onselect);