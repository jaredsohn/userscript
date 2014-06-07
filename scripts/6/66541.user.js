// ==UserScript==
// @name           JV.com - Nouveaux messages
// @namespace      http://blog.djlechuck.fr
// @description    Marque les sujets qui ont eu une nouvelle réponse depuis le dernier passage.
// @include        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==


// -- Crée le nom de la variable par rapport à l'URI
var urlForum	= document.URL;
var regSplit	= new RegExp("[-]+", "g");
var tabURI		= urlForum.split(regSplit);
var nomVar		= tabURI[0] + '-' + tabURI[1];

var b = GM_getValue(nomVar, 'noVisited');
if(b != 'noVisited') { // Si on a déjà visité la page on effectue le traitement
	// -- Chemins des icones "new" --
	var newMessage		= 'http://www.noelshack.com/up/aac/new_topic_dossier1-bf85cc7386.gif';
	var newHotMessage	= 'http://www.noelshack.com/up/aac/new_topic_dossier2-fe7e7cfd27.gif';

	// -- Chemin de l'icone "normal" de JV.com --
	var JVMessage		= 'http://image.jeuxvideo.com/pics/forums/topic_dossier1.gif';
	var JVHotMessage	= 'http://image.jeuxvideo.com/pics/forums/topic_dossier2.gif';

	// -- Boucle sur toutes les heures et incrémente un compteur si elle est plus récente que celle de la dernière visite --
	var listeDate = document.evaluate('//table[@id=\'liste_topics\']/tbody/tr/td[5]', document, null, 7, null);
	var i = 0; var a = ''; var anneeMessage = ''; var XPath = ''; var cpt = 0;
	var anneeVisite = b.substring(6, 10);
	for(i = 0; i < listeDate.snapshotLength; i++) {
		// -- Découpe et compare l'année (Sinon 2009 est considéré comme plus récent que 2010...) --
		a = listeDate.snapshotItem(i).textContent;
		if(a >= b) {
			anneeMessage = a.substring(6, 10);
			if(anneeMessage >= anneeVisite)
				cpt = cpt + 1;
		}
	}

	// -- Boucle sur les icones de messages et les remplacent par l'icone "new" ou "new hot" --
	var listFile = document.evaluate('//table[@id=\'liste_topics\']/tbody/tr/td[1]/img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; i < cpt; i++) {
		if(listFile.snapshotItem(i).getAttribute('src') == JVMessage)
			listFile.snapshotItem(i).setAttribute('src', newMessage)
		else if(listFile.snapshotItem(i).getAttribute('src') == JVHotMessage)
			listFile.snapshotItem(i).setAttribute('src', newHotMessage)
	}
}

// -- Enregistre la date et l'heure courante comme dernière visite --
var Today = new Date;
var Jour = Today.getDate();
	Jour = ((Jour < 10) ? '0' + Jour : Jour);
var Mois = Today.getMonth() + 1;
	Mois = ((Mois < 10) ? '0' + Mois : Mois);
var Annee = Today.getFullYear();
var Heure = Today.getHours();
	Heure = ((Heure < 10) ? '0' + Heure : Heure);
var Minute = Today.getMinutes();
	Minute = ((Minute < 10) ? '0' + Minute : Minute);
var dateNow = Jour + '/' + Mois + '/' + Annee + ' ' + Heure + 'h' + Minute;
GM_setValue(nomVar, dateNow); // Enregistre la date de la visite