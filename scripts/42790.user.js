// ==UserScript==
// @name          Moodle P5 M1 BCPP
// @description   Modifie la page Moodle du M1 BCPP de P5
// @include       https://www.biomedicale.univ-paris5.fr/moodle/course/view.php?id=7*
// ==/UserScript==

// Fonction XPath
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Remanie "Liens vers sections"
// /!\ Attention aux conflits avec le truc qui vire les blocs... /!\ 
var liens, nouveauxliens;
liens = document.getElementById('inst3908');
if (liens) {
	nouveauxliens = document.createElement("div");
	nouveauxliens.innerHTML = '<div id="inst3908" class="block_section_links sideblock"><div class="header"><div class="title"><h2>Liens vers sections</h2></div></div><div class="content"><ul class="list">' +
// DÉCOMMENTER les liens UTILISÉS
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Informations pratiques" href="#section-1">Infos</a></div></li>' +
//		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Trafic, cytosquelette et matrices" href="#section-2">Cytosquelette / Trafic</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Dynamique cellulaire" href="#section-3">Signa / Cycle</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Méthodes en biologie cellulaire" href="#section-4">Bioinfo / Imagerie</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Expression génétique" href="#section-5">Régulation</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Développement et Physiologie" href="#section-6">Dév / Physio</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Anglais" href="#section-7">Anglais</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Stages de recherche en laboratoire" href="#section-8">Stages</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Neurosciences cellulaires" href="#section-9">Neuro</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Physiopathologie métabolique" href="#section-10">Métabo</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Physiopathologie cardiovasculaire" href="#section-11">Cardio</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Reproduction et développement" href="#section-12">Repro dév</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Xénobiotiques et stress" href="#section-13">Xénobiotiques</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Biologie et physiologie du système immunitaire" href="#section-14">Système immunitaire</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Biologie et pathologie des épithéliums" href="#section-15">Épithéliums</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Cellules spécialisées " href="#section-16">Cellules spé</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Immunologie appliquée" href="#section-17">Immuno</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Pharmacologie endocrinienne" href="#section-18">Pharmaco</a></div></li>' +
		'<li class="r0"><div class="icon column c0"><img src="https://www.biomedicale.univ-paris5.fr/moodle/pix/f/folder.gif" class="icon"></div><div class="column c1"><a title ="Plasticité cellulaire" href="#section-19">Plasticité</a></div></li>' +
		'</ul></div></div>';
	liens.parentNode.replaceChild(nouveauxliens,liens);
}

// Pour virer le gros tableau
// Si vous voulez absolument le garder, DÉCOMMENTER la ligne suivante
// /*
var var1, var2;
var1 = xpath("//table[@style='width: 607px; height: 293px;']");
if (var1) {
	for (var i = 0; i < var1.snapshotLength; i++) {
		var2 = var1.snapshotItem(i);
		var2.parentNode.removeChild(var2);
	}
}
// */		// Toujours si vous voulez garder le tableau, DÉCOMMENTER cette ligne également.

// La variable 'blocs' liste tous les blocs (logique)
var blocs = new Array(
// COMMENTER les blocs UTILISÉS
//	'inst487',		// "Personnes"
//	'inst3908',		// "Liens vers sections"
//	'inst489',		// "Recherche forums"
//	'inst490',		// "Administration"
//	'inst491',		// "Mes cours"
//	'inst946',		// "Calendrier"
//	'inst492',		// "Dernières nouvelles"
//	'inst493',		// "Prochains événements"
//	'inst494',		// "Activité récente"
//	'inst3534',		// "Utilisateurs en ligne"
//	'inst488',		// "Activités"
//	'section-1',		// "Informations pratiques"
	'section-2',		// "Trafic, cytosquelette et matrices"
//	'section-3',		// "Dynamique cellulaire"
//	'section-4',		// "Méthodes en biologie cellulaire"
//	'section-5',		// "Expression génétique"
//	'section-6',		// "Développement et Physiologie"
//	'section-7',		// "Anglais"
//	'section-8',		// "Stages en laboratoire"
//	'section-9',		// "Neurosciences cellulaires"
//	'section-10',		// "Physiopathologie métabolique"
//	'section-11',		// "Physiopathologie cardiovaculaire"
//	'section-12',		// "Reproduction et développement"
//	'section-13',		// "Xénobiotiques et stress"
//	'section-14',		// "Biologie et physiologie du système immunitaire"
//	'section-15',		// "Biologie et pathologie des épithéliums"
//	'section-16',		// "Cellules spécialisées "
//	'section-17',		// "Immunologie appliquée"
//	'section-18',		// "Pharmacologie endocrinienne"
//	'section-19',		// "Plasticité cellulaire"
	'section-bidon');	// Cette ligne est à garder TELLE QUELLE, quoiqu'il arrive
if (blocs) {
	for (var i = 0; i <= blocs.length; i++) {
		avirer = document.getElementById(blocs[i]);
		avirer.parentNode.removeChild(avirer);	
	}
}
