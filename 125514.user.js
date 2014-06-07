// ==UserScript==
// @name           ffnet-downloader
// @namespace      Fanfiction.net Downloader
// @description    Downloader for fanfiction.net website
// @include        http://www.fanfiction.net/s/*
// @include        http://www.fanfiction.net/u/*
// ==/UserScript==
var url = document.location.href;
var split = url.split('/');
var id_fic = '';
var id_profil = '';
for (var i = 0; i < split.length; i++) {
	if (split[i] == 's') {
		var id_fic = split[i + 1];
	} else if (split[i] == 'u') {
		var id_profil = split[i + 1];
	}
}

if (id_fic != '') {
	url = 'http://www.ffnet-downloader.fr/~jeremyb/fanfic/telecharger.php?url=' + id_fic + '&format=html&choix=simple&grease=oui';
	var texte = document.createTextNode("Télécharger la fic");
	creerElement(texte, url);
} else if (id_profil != '') {
	url = 'http://www.ffnet-downloader.fr/~jeremyb/fanfic/telecharger.php?url=' + id_profil + '&format=html&choix=mesfics&grease=oui';
	var texte = document.createTextNode("Télécharger les fics de l'auteur");
	creerElement(texte, url);
	url = 'http://www.ffnet-downloader.fr/~jeremyb/fanfic/telecharger.php?url=' + id_profil + '&format=html&choix=favoris&grease=oui';
	var texte = document.createTextNode("Télécharger les favoris");
	creerElement(texte, url);
}

function creerElement(texte, url) {
	var lien = document.createElement("a");
	lien.setAttribute("id", "menu-ffnet");
	lien.setAttribute("class", "menu-link");
	lien.setAttribute("href", url);
	lien.setAttribute("style", "margin-left:10px;");
	lien.appendChild(texte);
	document.getElementById('top').appendChild(lien);
}