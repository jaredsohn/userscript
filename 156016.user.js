// ==UserScript==
// @name				arkMantis
// @description	Mantis Tuning
// @namespace		chooz
// @author			chooz
// @version			1.5.201310
// @updateURL		http://userscripts.org/scripts/source/156016.user.js
// @include			http://gktest.gicm.net:8080/mantis/*
// @icon				http://www.mantisbt.org/favicon.ico
// ==/UserScript==

var sURL = window.location.toString();

// redirection sur la page 'Accès interdit'
if (sURL.match(/\/(view|bug_view_page)\.php/) && document.body.innerHTML.match(/Acc.s interdit/)) {
	if (document.cookie.match(/MANTIS_STRING_COOKIE=[0-9a-f]*/)) { // connecté ou pas ?
		alert("Habilitation insuffisante.");
		window.location = "http://gktest.gicm.net:8080/mantis/view_all_bug_page.php";
	} else {
		alert("Connexion requise.");
		window.location = window.location.href.replace(/^.*id=([0-9]+)$/,"http://gktest.gicm.net:8080/mantis/login_page.php?return=/mantis/view.php?id=$1");
	}
}

// remplace "anomalie/évolution" par "mantis"
document.body.innerHTML = document.body.innerHTML.replace(/l?\'?anomalies?\/évolutions?/g, "mantis");

// cache les bandeaux inutiles
document.body.children[0].style.display = 'none';
document.body.children[1].style.display = 'none';

// change le titre
document.title = document.title.replace(/^(.+) - Mantis$/, "Mantis $1");

if (sURL.match(/\/login_page\.php/) && document.getElementsByName('username').length == 1) {
// sur la page de login : pre-remplit le champ utilisateur à la valeur "user" par défaut
	document.getElementsByName('username')[0].value = 'user';
	document.getElementsByName('password')[0].focus();
} else if (sURL.match(/\/(view|bug_view_page)\.php/)) {
// sur la page de detail des anomalies
	// decoupe la ligne de boutons sur deux lignes pour que l'ecran (le premier pave) puisse tenir sur une page en largeur
	var xPathResLigne = document.evaluate("/html/body/table[3]/tbody/tr[15]/td/table/tbody/tr", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var ligneBoutons1 = xPathResLigne.singleNodeValue;
	var ligneBoutons2 = document.createElement("tr");

	for (var i = 4; i < 8; i++) {
		ligneBoutons2.appendChild(ligneBoutons1.removeChild(ligneBoutons1.childNodes[3]));
	}
	ligneBoutons2.setAttribute("class", "vcenter");
	ligneBoutons1.parentNode.appendChild(ligneBoutons2);
	
	// ajoute un lien propre vers l'ano en cours dans la premiere cellule en haut a gauche
	xPathResLigne = document.evaluate("/html/body/table[3]/tbody/tr[3]/td", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var celluleID = xPathResLigne.singleNodeValue;
	var sContenu = celluleID.innerHTML.replace(/^\s*([0-9]+)\s*$/, "<a href='http://gktest.gicm.net:8080/mantis/view.php?id=$1'>mantis $1</a>");
	celluleID.innerHTML = sContenu;
} else if (sURL.match(/\/view_all_bug_page\.php/)) {
// sur la page qui liste toutes les anomalies
	var tBug = document.getElementById('buglist');
	var sBuf = tBug.innerHTML;
	sBuf = sBuf.replace(/>Priorité</, '>Prio<');
	sBuf = sBuf.replace(/>Catégorie</, '>Type<');
	sBuf = sBuf.replace(/<td><span class="bold">urgente<\/span><\/td>/g, '<td class="center"><span style="color:black; font-weight:bold;">1</span></td>');
	sBuf = sBuf.replace(/<td>(<span class="bold">)?moyenne(<\/span>)?<\/td>/g, '<td class="center"><span style="color:black; font-weight:normal;">2</span></td>');
	sBuf = sBuf.replace(/<td>faible<\/td>/g, '<td class="center"><span style="color:silver;">3</span></td>');
	sBuf = sBuf.replace(/>Anomalie</g, '>ano<');
	sBuf = sBuf.replace(/>Evolution</g, '>evo<');
	sBuf = sBuf.replace(/<\/u> \(([^)]* )(\w)\w+\)</g, '</u> $1 $2<'); // initiale du prénom des acteurs
	tBug.innerHTML = sBuf;
}