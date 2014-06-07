// ==UserScript==
// @name           Message de moderation auto forum Medal Of Honor
// @namespace      MK
// @description	Message de moderation auto
// @version			1.0.1
// @include        http://www.jeuxvideo.com/forums/3-*
// ==/UserScript==

var reponses, message, p, zone, label, select, option, key, onselect;

reponses = {};


reponses["Balise"] = "Les balises sont obligatoires. :ok:\n" +
		"http://www.jeuxvideo.com/forums/1-18365-33017-1-0-1-0-a-lire-medal-of-moderation-regles.htm";
reponses["Balise non valide"] = "Balise non-conforme. :ok: \n" +
		"http://www.jeuxvideo.com/forums/1-18365-33017-1-0-1-0-a-lire-medal-of-moderation-regles.htm";
reponses["Demande clé Beta"] = ":d) Merci de faire une demande de clé sur le topic officiel: http://www.jeuxvideo.com/forums/1-18365-22321-1-0-1-0-officiel-demande-de-cle.htm"
reponses["Rechercher"] = "Merci de rechercher la prochaine fois. :ok:"

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