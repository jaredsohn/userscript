// ==UserScript==
// @name           Message de moderation auto forum Dead Rising 2
// @namespace      MK
// @description	Message de moderation auto
// @version			1.0.1
// @include        http://www.jeuxvideo.com/forums/3-*
// ==/UserScript==

var reponses, message, p, zone, label, select, option, key, onselect;

reponses = {};


reponses["Pas de balise"] = "Lis les règles, les balises sont obligatoires.\n" +
		"http://www.jeuxvideo.com/forums/1-19403-39707-1-0-1-0-all-les-regles-du-forum-a-lire.htm";
reponses["Rechercher"] = "Ce sujet existe déjà, merci de faire une recherche."

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