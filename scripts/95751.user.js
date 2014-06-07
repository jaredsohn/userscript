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

reponses["Sugg' : Topic sans balise"] = "Salut :)\n" +
		"Tu devrais aller faire un tour sur les règles du forum : http://www.jeuxvideo.com/forums/1-13-9045225-1-0-1-0-regles-d-utilisation-du-forum-a-lire.htm :ok:
Les balises sont obligatoires http://www.jeuxvideo.com/forums/1-13-9030485-1-0-1-0-rappel-concernant-les-balises.htm :)

:merci:"
reponses["COD Topic déjà existant"] = "Bonjour !\n" +
		"Ce topic existe déjà, merci d'utiliser la fonction « Rechercher »."
reponses["COD Glitch"] = "Bonjour !\n" +
		"Ce genre de discussion n'est pas autorisé ici."
reponses["COD Règles"] = "Bonjour !\n" +
                "Merci de lire les règles.\n" +
                ":d) http://www.jeuxvideo.com/forums/1-21824-95669-1-0-1-0-all-regles-et-index-du-forum.htm"
reponses["-15 Majs"] = "Merci de refaire ton topic sans majuscules."  
reponses["-15 Pub"] = "Merci de poster ta pub ici:\n" +
                ":d) http://www.jeuxvideo.com/forums/1-15-21907641-1-0-1-0-topic-de-pub.htm"
reponses["-15 Pub ForumJV"] = "Merci de poster ta pub ici:\n" +
                              ":d) http://www.jeuxvideo.com/forums/1-15-29204084-1-0-1-0-publicite-pour-vos-forum-jv.htm"
reponses["-15 Topic Nominatif"] = "Pas de topic nominatif."
reponses["-15 Lock Fics"] = "Il y a trop de fics en ce moment sur le forum, repasse après-demain sur le topic de modération demander le délock de ta fic."
reponses["Lien Réclam'"] = "http://www.jeuxvideo.com/forums/0-1000017-0-1-0-1-0-reclamations.htm"
reponses["Lien Contacter jvc"] = "http://www.jeuxvideo.com/mailform.php"

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