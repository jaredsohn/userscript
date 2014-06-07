// ==UserScript==
// @name           Generateur de msg
// @namespace      MK
// @description		Générateur de messages
// @version			1.0.1
// @include        http://www.jeuxvideo.com/forums/3-*
// @resource		licence	http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

var reponses, message, p, zone, label, select, option, key, onselect;

reponses = {};

reponses["Ok"] = "ok :ok:"
reponses["Boost"] = "a ok... :noel:"
reponses["Jerry"] = "Jerry :hap: "
reponses["Bide"] = "Bide :noel:"
reponses["Osef"] = "osef ... :noel:"
reponses["Ou pas"] = "Ou pas :hap:"
reponses["Btg"] = "Btg ? :hap:"
reponses["slt"] = "coucou :)"

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
label.appendChild(document.createTextNode(" * Reponse auto : "));
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