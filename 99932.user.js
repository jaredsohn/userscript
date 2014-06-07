// ==UserScript==
// @name           Reconnexion CdR
// @namespace      reco_cdr
// @description    Permet de se connecter à CdR sans relancer un nouveau tour
// @include        http://*campagne-de-russie.com/*
// ==/UserScript==
var page =  document.location.href;
page = page.substring(page.lastIndexOf( "/" ) );

var nb_jours_attente = 3;



modif_cookie_session("PHPSESSID", nb_jours_attente);

if (page == "/" || page == "/index.php" || page == "/deconnexion.php") ajout_lien();


function modif_cookie_session(nom, nb_jours) {

	var valeur = "";

	// lecture du cookie de session
	var nomEQ = nom + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	if (c.indexOf(nomEQ) == 0) valeur = c.substring(nomEQ.length,c.length);
	}

	// modif de sa date d'expiration
	var date = new Date(); //on instancie un objet Date
	date.setTime(date.getTime()+(nb_jours*24*3600000)); //on recupère la date
	var expire = "; expires="+date.toGMTString(); //on fixe la date d'expiration
	document.cookie = nom + "=" + valeur + expire + "; path=/"; //on crée le cookie
}


function ajout_lien() // ajoute le lien sur la page d'index
{
	var bouton = document.getElementsByName("Submit")[0];
	var lien = document.createElement('a');
	lien.href = "http://www.campagne-de-russie.com/jeu.php";
	lien.innerHTML = "Se connecter sans déclencher de nouveau tour.";
	bouton.parentNode.appendChild(lien);
}
