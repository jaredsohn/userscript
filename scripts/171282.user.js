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

reponses["Okey"] = "Okey :ok:"
reponses["Boost"] = "Ah ok... :noel:"
reponses["Jerry"] = "Jerry :hap: "
reponses["Bide"] = "Bide :noel:"
reponses["Osef"] = "Osef ... :noel:"
reponses["Ou pas"] = "Ou pas :hap:"
reponses["Btg"] = "Btg ? :hap:"
reponses["Non"] = "Non :hap: "
reponses["Oui"] = "Oui :hap: "
reponses["Question"] = "Je peut te poser une question ? :noel: "
reponses["Pourquoi"] = "Pourquoi ? :noel: "
reponses["Noel ou Hap"] = "Noel ou hap ?  "
reponses["Ton pseudo"] = "Ton pseudo :bave: "
reponses["D'accord"] = "D'accord :hap: "
reponses["Post"] = "Je post :)"
reponses["JTM"] = "Je t'aime :coeur: "
reponses["Long"] = "Ton message est trop long :hap: "
reponses["Ecoute"] = "Continue je t'écoute :hap: "
reponses["Booba"] = "Booba :hap: :hap: "
reponses["Up"] = "Je up pour toi :hap: :hap: "
reponses["je sais pas"] = "Je sais pas :hap: :hap: "
reponses["DDB"] = " DDB :pf: "
reponses["Personne"] = "Personne :noel: :hap: "

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