// ==UserScript==
// @name           Raide Facile [modified by Deberron]
// @namespace      Snaquekiller
// @version        8.0.2
// @author       Snaquekiller + Autre + Deberron + Alu
// @creator       snaquekiller
// @description   Raide facile
// @homepage http://lastworld.etenity.free.fr/ogame/raid_facile
// @updateURL http://lastworld.etenity.free.fr/ogame/raid_facile/userscript.header.js
// @downloadURL http://lastworld.etenity.free.fr/ogame/raid_facile/download.php?pour=firefox&type=.user.js
// @include http://*.ogame.*/game/index.php?page=*
// @exclude http://*.ogame.*/game/index.php?page=buddies*
// @exclude http://*.ogame.*/game/index.php?page=notices*
// @exclude http://*.ogame.*/game/index.php?page=search*
// @exclude http://*.ogame.*/game/index.php?page=combatreport*
// @exclude http://*.ogame.*/game/index.php?page=eventList*
// @exclude http://*.ogame.*/game/index.php?page=jump*
// @exclude http://*.ogame.*/game/index.php?page=phalanx*
// @exclude http://*.ogame.*/game/index.php?page=techtree*
// @exclude http://*.ogame.*/game/index.php?page=techinfo*
// @exclude http://*.ogame.*/game/index.php?page=globalTechtree*
// @require http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==
// Sujet sur le forum officiel : http://board.ogame.fr/index.php?page=Thread&threadID=978693
/* test encodage
ces caractÃ¨re doivent Ãªtre ben accentuÃ©s et bien Ã©crits, sinon c'est qu'il y a un problÃ¨me
aÃ¢Ã Ã£ eÃ©ÃªÃ¨ iÃ®Ã¬ Ã± oÃ´Ã²Ãµ uÃ»Ã¹ â‚¬
*/

//{ Variables utilitaires
// Si jQuery n'est pas dans le scope courant c'est qu'il est dans le scope de l'unsafeWindow
if (typeof $ === 'undefined') {
	var $ = unsafeWindow.$;
}
// Variable contenant tout un tas d'informations utiles, pour ne pas laisser les variables dans le scope global.
var info = {
	siteUrl: 'http://lastworld.etenity.free.fr/ogame/raid_facile/',
	firefox: navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1,
	chrome: navigator.userAgent.indexOf("Chrome") > -1,
	opera: navigator.userAgent.indexOf('Opera')>-1,
	url: location.href,
	serveur: location.hostname,
	univers: location.hostname.replace('ogame.', ''),
	startTime: (new Date()).getTime(),
	session: $('meta[name=ogame-session]').attr('content') || location.href.replace(/^.*&session=([0-9a-f]*).*$/i,"$1"),
	pseudo: $('meta[name=ogame-player-name]').attr('content'),
	playerId: $('meta[name=ogame-player-id]').attr('content'),
	// version: voir plus bas
	// nom: voir plus bas
	// Tampermonkey: voir plus bas
};
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getManifest) {
	// pour les extensions Chrome
	info.version = chrome.runtime.getManifest().version;
	info.nom = chrome.runtime.getManifest().name;
}
if (typeof GM_info !== 'undefined') {
	// pour greasemonkey et ceux qui ont GM_info (greasemonkey et tampermonkey)
	info.version = GM_info.script.version;
	info.nom = GM_info.script.name;
	info.tampermonkey = GM_info.scriptHandler === "Tampermonkey";
}
//}
//{ Parsing des paramÃ¨tres situÃ© aprÃ¨s le "?" dans l'url, pour info.args
(function(){
	var argString = location.search.substring(1).split('&');
	info.args = {};
	if (argString[0] === '') {
		return;
	}
	for (var i = 0; i < argString.length; i++) {
		var arg = unescape(argString[i]);
		if (arg.indexOf('=') === -1) {
			info.args[unescape(arg)] = true;
		} else {
			var kvp = arg.split('=');
			info.args[unescape(kvp[0])] = unescape(kvp[1]);
		}
	}
})();
//}
//{ Fonctions de compatibilitÃ©
// Si ces fonctions n'existent pas, elle sont crÃ©Ã©es
if (typeof GM_getValue === 'undefined') {
	var GM_getValue = function(key, defaultValue) {
		var retValue = localStorage.getItem(key);
		if (!retValue) {
			retValue = defaultValue;
		}
		return retValue;
	};
}
if (typeof GM_setValue === 'undefined') {
	var GM_setValue = function(key, value) {
		localStorage.setItem(key, value);
	};
}
if (typeof GM_deleteValue === 'undefined') {
	var GM_deleteValue = function(key) {
		localStorage.removeItem(key);
	};
}
if (typeof GM_addStyle === 'undefined') {
	var addStyle = function(css, url) {
		if (url) {
			$('<link rel="stylesheet" type="text/css" media="screen" href="'+url+'">').appendTo(document.head);
		} else {
			$('<style type="text/css">' + css + '</style>').appendTo(document.head);
		}
	};
} else {
	var addStyle = function(css, url) {
		if (url) {
			$('<link rel="stylesheet" type="text/css" media="screen" href="'+url+'">').appendTo(document.head);
		} else {
			GM_addStyle(css);
		}
	};
}
//}
//{ Classe gÃ©rant le stockage de donnÃ©es
function Stockage(namespace) {
	this.storageKeyName = 'RaidFacile ' + info.univers + ' ' + info.playerId + ' ' + namespace;
	// Le mapping sert Ã  ce que Ã§a prenne moins de place dans le stockage, mais qu'on ait toujours un texte comprÃ©hensible dans le code
	// Il sert aussi Ã  dÃ©finir la valeur par dÃ©faut
	this.mapping = {
		// 'nom complet': ['nom court', 'valeur par dÃ©faut']
		'attaquer nouvel onglet': ['a', 1],
		'couleur attaque': ['b', '#c7050d'],
		'couleur attaque retour': ['c', '#e75a4f'],
		'couleur attaque2': ['d', '#c7050d'],
		'couleur attaque2 retour': ['e', '#e75a4f'],
		'couleur espionnage': ['f', '#FF8C00']
	};
}
Stockage.prototype = {
	get: function(nom) {
		var key = this.mapping[nom][0];
		if (this.data.hasOwnProperty(key)) {
			return this.data[key];
		} else {
			return this.mapping[nom][1];
		}
	},
	set: function(nom, valeur) {
		this.data[this.mapping[nom][0]] = valeur;
	},
	load: function() {
		this.data = JSON.parse(GM_getValue(this.storageKeyName, '{}'));
	},
	save: function() {
		GM_setValue(this.storageKeyName, JSON.stringify(this.data));
	}
};
var stockageOption = new Stockage('options');
var stockageData = new Stockage('donnÃ©es');
stockageOption.load();
stockageData.load();
//}
//{ Classe de communication avec la page
var Intercom = function() {
	this.loaded = false;
	this.listen();
	this.listeAttente = [];
};
Intercom.prototype = {
	/**	send envoie un message Ã  l'autre classe Intercom
		action (string) le nom de l'action
		data (object)(facultatif) les donnÃ©es Ã  transmettre
	*/
	send: function(action, data){
		// Si l'autre intercom n'est pas encore chargÃ© on met les messages en attente
		if (this.loaded === false) {
			this.listeAttente.push([action, data]);
			return;
		}
		var donnÃ©es = {
			fromPage: false,
			namespace: 'Raid facile',
			action: action,
			data: data === undefined ? {} : data
		}
		window.postMessage(donnÃ©es, '*');
	},
	/** Permet de recevoir les messages de l'autre intercom */
	listen: function(){
		window.addEventListener('message', this.received.bind(this), false);
	},
	/** DÃ©fini les action Ã  effectuer en cas de message reÃ§u */
	received: function(event){
		// On s'assure que le message est bien pour nous
		if (event.data.namespace !== 'Raid facile' || event.data.fromPage === false) {
			return;
		}
		switch(event.data.action) {
		case 'loaded':
			// l'autre intercom est chargÃ© on peut traiter les messages en attente
			this.loaded = true;
			this.traiterListeAttente();
			break;
		}
	},
	traiterListeAttente: function() {
		// On envoie tous les messages de la liste d'attente puis on vide la liste
		for (var i = 0; i < this.listeAttente.length; ++i) {
			this.send.apply(this, this.listeAttente[i]);
		}
		this.listeAttente = [];
	}
};
var intercom = new Intercom();
//}
//{ Fonctions
function ajusterTailleBox() {
	//if ( $('#div_raide_facile').width() < $('#contentWrapper').width() ) $('#div_raide_facile').width($('#contentWrapper').width());

	$('#box').width($('#links').outerWidth() + $('#rechts').outerWidth() + $('#div_raide_facile').outerWidth() ); // +60 pour le script marqueur de galaxie qui vient mettre une zone par apres.
	$('#rechts').css('float','right');
}
//}

/* ******************************************************** */
/********************* VARIABLE DE BASE *********************/
/* ******************************************************** */
	var date = new Date();

/************************* oGameVersionCheck *************************///{
oGameVersionCheck("Raide Facile - " + info.version, "5.4.3", info.siteUrl);
//}

// ################################################## OPTION ###########################################"
	//arme/bouclier/protect/combus/impul/hyper/coordonee/date/option/ressource/classement/sauvegard auto/temps garde scan/exversion
	// /coul_att/coul_att_g/coul_dest/lien/remplace/lien esp/rec/itesse/tps_vol/nom_j/nom_p/coord_q/prod_h/ress_h

/**initialisations_des_variables_doptions**///{
	var option1 = GM_getValue('option1'+ info.serveur, '0/0/0/0/0/0/x:xxx:x/4000/0.3/0/1');
	var option2 = GM_getValue('option2'+ info.serveur, '0/100/100/0/12/1/0/4320/1/1/0/1/1/1/2/0/0');
	var option3 = GM_getValue('option3'+ info.serveur, '#C7050D/#025716/#FFB027/#E75A4F/#33CF57/#EFE67F');
	var option4 = GM_getValue('option4'+ info.serveur, '1/0/0/0/1/1/1/1/0/0/0/1/0/0/0/0/1/0/1/1/0/0/0/1/1/1/1/1/x/x/0/1/1/1');
	var option5 = GM_getValue('option5'+ info.serveur, navigator.language);
	var ex_version = GM_getValue('exversion'+ info.serveur, info.version.replace( /[^0-9-]/g, ""));

	if(ex_version.replace( /[^0-9-]/g, "") < 42)
	{
		GM_setValue('exversion'+ info.serveur, info.version);
		GM_setValue('scan'+ info.serveur, '')

		fadeBoxx(text.vari_res, 0, 5000);
		var ex_version = GM_getValue('exversion'+ info.serveur, info.version.replace( /[^0-9-]/g, ""));
	}

	var option1_split = option1.split('/');
	var option2_split = option2.split('/');
	var option3_split = option3.split('/');
	var option4_split = option4.split('/');
	var option5_split = option5;

	//votre compte
	/**option1_mon_compte**/{

		//Vos techno :
			var tech_arme_a = option1_split[0];
			var tech_bouclier_a = option1_split[1];
			var tech_protect_a = option1_split[2];

			var tech_combus_a = option1_split[3];
			var tech_impul_a = option1_split[4];
			var tech_hyper_a = option1_split[5];

		// Autre :
			var pos_depart = option1_split[6];
			var vaisseau_lent = option1_split[7];
			var pourcent_cdr =  parseFloat(option1_split[8]);
			var pourcent_cdr_def =  parseFloat(option1_split[9]);
			var vitesse_uni = parseInt(GM_getValue('vitesse_uni', '1'));
	}

	//choix
	/**option2_variable**/{
		//Selection de scan :
			var nb_scan_accpte = option2_split[0];// valeur de ressource a partir de laquel il prend le scan
			var valeur_cdr_mini = option2_split[1];// valeur de cdr a partir de laquel il prend le scan
			var valeur_tot_mini = option2_split[2];// valeur de total a partir de laquel il prend le scan
			var type_prend_scan = option2_split[3];// choix entre les 3options du haut a partir de laquel il prend le scan

		//Classement :
			var classement = option2_split[4];//0 date ; 1 coordonee ; 2 joueur ; 3 nom ^planette ; 4 ressource  metal; 5 cristal ; 6 deut ; 7 activite  ; 8 cdr possible ; 9 vaisseau; 10 defense ; 11 idrc ; 12 ressource total,13 reherche , 14 type de planette (lune ou planette)
			var reverse = option2_split[9];
			if(option2_split[11] != undefined){var q_taux_m = option2_split[11];}else{var q_taux_m = 1;}
			if(option2_split[12] != undefined){var q_taux_c = option2_split[12];}else{var q_taux_c = 1;}
			if(option2_split[13] != undefined){var q_taux_d = option2_split[13];}else{var q_taux_d = 1;}

		//Options de sauvegarde de scan :
			var scan_preenrgistre = option2_split[5];// si le scan est enregistre lorsqu'on le regarde ou seulement quand on clique sur enregistre.
			var scan_remplace = option2_split[6];
			var nb_minutesgardescan = option2_split[7];
				var minutes_opt = Math.floor(parseInt(nb_minutesgardescan)%60);
				var nb_minutesgardescan2 = parseInt(nb_minutesgardescan) - minutes_opt;
				var heures_opt = Math.floor(Math.floor(parseInt(nb_minutesgardescan2)/60)%24);
				nb_minutesgardescan2 = parseInt(nb_minutesgardescan2) - heures_opt*60;
				var jours_opt = Math.floor(parseInt(nb_minutesgardescan2)/60/24);
				var nb_ms_garde_scan = nb_minutesgardescan*60*1000 ;
			if(option2_split[10] != undefined){var nb_max_def = option2_split[10];}else{var nb_max_def = 0;}

		//Autre :
			var import_q_rep = option2_split[8];
			if(option2_split[14] != undefined){var lien_raide_nb_pt_gt = option2_split[14];}else{var lien_raide_nb_pt_gt = 2;}
			if(option2_split[15] != undefined){var nb_pourcent_ajout_lien = parseInt(option2_split[15]);}else{var nb_pourcent_ajout_lien = 0;}
			if(option2_split[16] != undefined){var nb_ou_pourcent = option2_split[16];}else{var nb_ou_pourcent = 0;}
		}

	//couleur
	/**option3_couleur**/{
		var col_att = option3_split[0];
		var col_att_g = option3_split[1];
		var col_dest = option3_split[2];
		var col_att_r = option3_split[3];
		var col_att_g_r = option3_split[4];
		var col_dest_r = option3_split[5];
	}

	//afichage
	/**option4_variable**/{
		//Changement dans les colonnes :
			var q_date_type_rep = option4_split[8];
			var cdr_q_type_affiche = option4_split[2];

		//Changement dans boutons de droites :
			var simulateur = option4_split[11];
			var q_mess = option4_split[12];
			var espionnage_lien = option4_split[1];
			if(option4_split[25] != undefined){var q_lien_simu_meme_onglet = option4_split[25];}else{var q_lien_simu_meme_onglet = 1;}

		//Affichage de Colonne :
			if(option4_split[21] != undefined){var q_compteur_attaque = option4_split[21];}else{var q_compteur_attaque = 0;}
			if(option4_split[17] != undefined){var q_vid_colo = option4_split[17];}else{var q_vid_colo = 0;}
			var question_rassemble_col = option4_split[14];
			var prod_h_q = option4_split[9];
			var prod_gg = option4_split[10];
				var prod_min_g = Math.floor(parseInt(prod_gg)%60);
				var nb_minutesgardescan3 = parseInt(prod_gg) - prod_min_g;
				var prod_h_g = Math.floor(Math.floor(parseInt(nb_minutesgardescan3)/60)%24);
				nb_minutesgardescan3 = parseInt(nb_minutesgardescan3) - prod_h_g*60;
				var prod_j_g = Math.floor(parseInt(nb_minutesgardescan3)/60/24);
			var date_affiche = option4_split[7];//0 date non affiche, 1 date affiche
			var tps_vol_q = option4_split[3];
			var nom_j_q_q = option4_split[4];
			var nom_p_q_q = option4_split[5];
			var coor_q_q = option4_split[6];
			if(option4_split[26] != undefined){var defense_question = option4_split[26];}else{var defense_question = 1;}
			if(option4_split[27] != undefined){var vaisseau_question = option4_split[27];}else{var vaisseau_question = 1;}
			if(option4_split[32] != undefined){var pt_gt = option4_split[32];}else{var pt_gt = 1;}
			if(option4_split[33] != undefined){var tech_q = option4_split[33];}else{var tech_q = 1;}

		//Affichage Global :
			if(option4_split[22] != undefined){var q_galaxie_scan = option4_split[22];}else{var q_galaxie_scan = 0;}
			if(option4_split[23] != undefined){var galaxie_demande = option4_split[23];}else{var galaxie_demande = 1;}
			if(option4_split[31] != undefined){var galaxie_plus_ou_moins = parseInt(option4_split[31]);}else{var galaxie_plus_ou_moins = 1;}
			if(option4_split[24] != undefined){var afficher_seulement = option4_split[24];}else{var afficher_seulement = 0;}
			if(option4_split[19] != undefined){var q_def_vis = option4_split[19];}else{var q_def_vis = 1;}
			if(option4_split[18] != undefined){var q_flo_vis = option4_split[18];}else{var q_flo_vis = 1;}
			var nb_scan_page = option4_split[13];

		//Autre :
			var q_techzero = option4_split[15];
			if(option4_split[30] != undefined){var tableau_raide_facile_value = option4_split[30];}else{var tableau_raide_facile_value = 100;}
			var q_icone_mess = option4_split[16];
	}

	// langue
		var langue = option5_split;
//}

/**initialisations_des_filtres**///{
	var filtre_actif_inactif = 0;
	var filtre_joueur = '';
//}
// ########################################## BBCODE ###################################################
/**option_initialisation_bbcode**/{
	var option_bbcode_split = GM_getValue('option_bbcode'+ info.serveur, '#872300/#EF8B16/#DFEF52/#CDF78B/#6BD77A/#6BD7AC/#6BC5D7/#6B7ED7/1/1/0/1').split('/');
	var center_typeq = option_bbcode_split[7];
	var q_url_type = option_bbcode_split[8];
	var q_centre = option_bbcode_split[9];
	var q_cite = option_bbcode_split[10];

	var couleur2 = new Array();
	var bbcode_baliseo = new Array();
	var bbcode_balisem = new Array();
	var bbcode_balisef = new Array();

	// couleur2[0]= option_bbcode_split[0];           //
	couleur2[1]= option_bbcode_split[0];		//
	couleur2[2]= option_bbcode_split[1];		//
	couleur2[3]= option_bbcode_split[2];			//
	couleur2[4]= option_bbcode_split[3];			//
	couleur2[5]= option_bbcode_split[4];			//
	couleur2[6]= option_bbcode_split[5];		//
	couleur2[7]= option_bbcode_split[6];			//
	// couleur2[8]='#956BD7';			//
	// couleur2[9]='#BD6BD7';			//
	// couleur2[10]='#D76BCB';			//
	// couleur2[11]='#D76B6F';			//

	bbcode_baliseo[0] = '[b]'; //balise gras ouvert
	bbcode_balisef[0] = '[/b]'; //balise gras fermer

	bbcode_baliseo[1] = '[i]';//balise italique ouvert
	bbcode_balisef[1] = '[/i]';//balise italique fermer

	bbcode_baliseo[2] = '[u]';//balise souligne ouvert
	bbcode_balisef[2] = '[/u]';//balise souligne fermer

	bbcode_baliseo[3] = '[u]';//balise souligne ouvert
	bbcode_balisef[3] = '[/u]';//balise souligne fermer

	bbcode_baliseo[4] = '[quote]';//balise citation ouvert
	bbcode_balisef[4] = '[/quote]';//balise citation fermer

	if(option_bbcode_split[8] == 1)
	{
		bbcode_baliseo[5] = '[url=\'';//balise citation ouvert
		bbcode_balisem[5] = '\']';//balise citation ouvert
		bbcode_balisef[5] = '[/url]';//balise citation fermer
	}
	else{
		bbcode_baliseo[5] = '[url=';//balise citation ouvert
		bbcode_balisem[5] = ']';//balise citation ouvert
		bbcode_balisef[5] = '[/url]';//balise citation fermer
	}

	if(option_bbcode_split[7] == 1){
		bbcode_baliseo[10] = '[align=center';//balise align ouvert
		bbcode_balisem[10] = ']';//balise align milieu
		bbcode_balisef[10] = '[/align]';//balise align fermer
	}else{
		bbcode_baliseo[10] = '[center';//balise align ouvert
		bbcode_balisem[10] = ']';//balise align milieu
		bbcode_balisef[10] = '[/center]';//balise align fermer
	}

	bbcode_baliseo[8] = '[color=';//balise color ouvert
	bbcode_balisem[8] = ']';//balise color milieu
	bbcode_balisef[8] = '[/color]';//balise color fermer
}

/************ Variables de langues ************/{
	var text;
	if(langue == 'fr') {
		text = {
			//option mon compte
				moncompte:'Mon compte ',
				vos_techno:'Vos technologies : ',
				q_coord:'CoordonnÃ©es de dÃ©part de vos raids',
				q_vaisseau_min:'Quel est le vaisseau le plus lent de votre flotte lors des raids ?',
				pourcent:'Pourcentage de dÃ©bris de vaisseaux dans le cdr de votre univers',
				pourcent_def:'Pourcentage de dÃ©bris de dÃ©fense dans le cdr de votre univers',

			// option variable
			choix_certaine_vari:'Choix pour certaines variables',
			selec_scan_st:'SÃ©lection de scan',
				q_apartir:'Butin',
					apartir:'',
				q_cdrmin:'CDR ',
				q_totmin:'CDR + Butin',
				q_prend_type:'Ne prendre les rapports avec ',
					rep_0_prend1:' Un CDR >',
					rep_0_prend2:' ou un butin >',
					rep_1_prend1:' Un CDR >',
					rep_1_prend2:' et un butin >',
					rep_2_prend:' Un CDR + butin > ',

			classement_st:'Classement',
				q_class:'Classer le tableau par ',
					c_date:'Date',
					c_coo:'CoordonnÃ©es',
					c_nj:'Nom de Joueur',
					c_np:'Nom de PlanÃ¨te',
					c_met:'MÃ©tal',
					c_cri:'Cristal',
					c_deu:'Deut',
					c_acti:'ActivitÃ©',
					c_cdr:'Cdr possible',
					c_nbv:'Nb Vaisseau',
					c_nbd:'Nb DÃ©fense',
					c_ress:'Ressources Totales',
					c_type:'Type (lune ou planÃ¨te)',
					c_cdrress:'Ressources + CDR',
					ressourcexh:'Ressources dans x heures',
					prod_classement:'Production',
					/*newe*/
					c_vaisseau_valeur:'Valeur d\'attaque totale des vaisseaux',
					c_defense_valeur:'Valeur d\'attaque totale des dÃ©fenses',
					/* news*/
				q_reverse:'Classer par ordre',
					descroissant:' dÃ©croissant',
					croissant:' croissant',
				taux_classement_ressource:'Donner le taux pour le classement par ressources.',
					taux_m:'Taux M : ',
					taux_c:'Taux C : ',
					taux_d:'Taux D : ',

			option_save_scan_st:'Options de sauvegarde de scan',
				q_sae_auto:'Sauvegarde automatique des scans dÃ¨s leur visionnage?',
				remp_scn:'Remplacer automatiquement les scans sur une mÃªme planÃ¨te ?',
				q_garde:'Ne pas sauvegarder et supprimer les scans vieux de plus',
					jours:'jours',
					heures:'heures',
					min:'minutes',
				q_nb_max_def:'Nombre max de dÃ©fense au-delÃ  duquel le script ne prend pas les scans ?(0 = dÃ©sactivÃ©)',

			other_st:'Autre',
				import_q:'Lors de l\'importation, les scans',
					import_remplace:'remplacent les autres',
					import_rajoute:' sont ajoutÃ©s aux autres',
				lien_raide_nb_pt_gt:'Voulez-vous en appuyant sur le lien attaquer, prÃ©selectionner soit',
					nb_pt:'Le nb de PT',
					nb_gt:'Le nb de GT',
					rien:'rien',
				lien_raide_ajout_nb_pourcent:"Rajouter au nombre de PT/GT preselectionner de base",

			//couleur ligne
			couleur_ligne:'Couleur ligne ',
				q_color:' Couleur de la ligne d\'une cible si une flotte  effectue une mission en mode',
					attt:'Attaquer',
					ag:'Attaque GroupÃ©e ',
					det:'DÃ©truire',
					att_r:'Attaquer (R)',
					ag_r:'Attaque GroupÃ©e (R)',
					det_r:'DÃ©truire (R)',

			//option affichage
			option_affichage:'Option d\'affichage ',
			affichage_changement_colonne:'Changement dans les colonnes',
				q_date_type:'Pour la date, on affiche ?',
					date_type_chrono:'Un chrono',
					date_type_heure:'L\'heure du scan',
				cdr_q:'Le comptage de cdr est affichÃ©',
					recyclc:' en nombre de recycleurs',
					ressousrce:'en nombre de ressources',

			changement_boutondroite:'Changement dans les boutons de droite',
				question_afficher_icone_mess:'Voulez-vous affichez les icÃ´nes dans la partie messages ?',
				q_simul:'Quel simulateur voulez-vous utiliser ?',
					drago:'Dragosim',
					speed:'Speedsim',
					ogwinner:'Ogame-Winner',
					simu_exte:'Exporter le rapport d\'espionnage au format texte pour une autre utilisation',
				mess_q:'Afficher un lien vers le vÃ©ritable message ?',
				lienespi:'Le lien d\'espionnage vous redirige',
					page_f:'Sur la page Flotte',
					page_g:'Sur la page Galaxie',
				q_lien_simu_meme_onglet:'Voulez-vous que les liens de simulations dirige sur',
					rep_onglet_norm:'Un nouvel onglet Ã  chaque fois.',
					rep_onglet_autre:'Le mÃªme onglet sera rechargÃ©.',

			affichage_colonne:'Affichage de Colonne :',
				q_inactif:'Afficher une colone pour marquer si le joueur est inactif ?',
				q_compteur_attaque:'Afficher une colonne qui donne le nombre de rapports de combat sur la planÃ¨te en 24h ?',
				q_afficher_dernier_vid_colo:'Afficher l\'heure du dernier vidage de la colonie(approximatif) ?',
				question_rassemble_cdr_ress:'Voulez-vous rassembler les colonnes de ressources et de cdr ?',
				q_pt_gt:'Afficher le nombre de PT et de GT ?',
				q_prod:'Afficher la production par heure de la planÃ¨te ?',
				q_ress_h:'Afficher les ressources dans (0 = pas affichÃ©)',
				q_date:'Afficher la date dans le tableau ?',
				tps_vol:'Afficher le temps de vol ?',
				nom_j_q:'Afficher le nom du joueur ?',
				nom_p_q:'Afficher le nom de la planÃ¨te ?',
					autre_planette:'Supprimer le nom de la planÃ¨te mais l\'afficher en passant la souris sur les coordonnÃ©es',
				coor_q:'Afficher les coordonnÃ©es de la planÃ¨te ?',
				defense_q:'Afficher les infos sur la dÃ©fense ?',
				vaisseau_q:'Afficher les infos sur la flotte ?',
					defense_nb:'oui, son nombre',
					defense_valeur:'oui, sa valeur d\'attaque',
				q_tech: 'Afficher les tech.',

			affichage_global:'Affichage Global :',
				q_galaxie_scan:'Voulez-vous afficher seulement les scans de la galaxie de la planÃ¨te sÃ©lectionnÃ©e ?',
					other:' autres',
					galaxie_plus_ou_moins:'Galaxie en cours + ou -',
				afficher_seulement:'Afficher seulement',
					toutt:'Tout',
					planete_sel:'PlanÃ¨te',
					lune:'Lune',
				filtrer : 'Filtrer',
				filtre_actif : 'Actif',
				filtre_inactif : 'Inactif',
				q_afficher_ligne_def_nvis:'Afficher la ligne si la dÃ©fense n\'est pas visible ?',
				q_afficher_ligne_flo_nvis:'Afficher la ligne si la flotte n\'est pas visible ?',
				page:'Combien de scan voulez-vous afficher par page ? (0=tous)',


			other_st:'Autre',
				q_techn_sizero:'Voulez-vous mettre vos techno Ã  0 si celles de la cible sont inconnues ?',
				lienraide:'Mettre le lien Raide-Facile',
					En_haut:'En haut',
					gauche:'A Gauche',
				/** news **/
				banner_sky:'Position de la banniere de pub',
				myPlanets:'Position de la liste des planettes',
				tableau_raide_facile:'Taille du tableau raide-facile',
				/** news **/

			//global
				oui:'oui',
				non:'non',

			//option langue
			option_langue:'Language',
				q_langue:'Dans quelle langue voulez-vous le script ?',
					francais:'FranÃ§ais',
					anglais:'English',
					spagnol:'EspaÃ±ol',
					roumain:'Roumain',


			//option bbcode
				text_centre:'Voulez-vous centrer le bbcode ?',
				text_cite:'Voulez-vous mettre en citation le bbcode ?',
				balise_centre:'Quelle balise utilisez-vous pour centrer le texte ?',
					balise1_center:'[align=center]',
					balise2_center:'[center]',
				balise_url:'Quelle balise utilisez-vous pour les url ?',
					balise1_url:'[url=\'adress\']',
					balise2_url:'[url=adresse]',
				color:'couleur',

			// tableau icone et autre
				// titre tableau
				th_nj:'Joueur',
				th_np:'PlanÃ¨te',
				th_coo:'CoordonnÃ©es',
				dated:'Date',
				tmp_vol_th:'Temps de Vol',
				prod_h_th:'Prod/h',
				th_h_vidage:'Heure vidage',
				ressource_xh_th:'Ressource x Heures',
				th_ress:'Butin',
				th_fleet:'PT/GT',
				th_ress_cdr_col:'CDR+Butin',
				nb_recycl:'Nb Recyleurs',
				th_nv:'Flottes',
				th_nd:'DÃ©fense',
				th_tech:'Tech.',

				// bouton de droite
				espionner:'|Espionner',
				eff_rapp:'|Effacer ce rapport',
				att:'|Attaquer',
				simul:'|Simuler',

				// entete
				raide_facil:'Raid-Facile',
				mise_jours:'Mise Ã  jour possible pour Raide-Facile',

				// interieur avec acronyme
				cdr_pos:'Cdr poss',
				metal:'M',
				cristal:'C',
				deut:'D',
				met_rc:'M',
				cri_rc:'C',
				nb_rc:'Recy.',
				nb_pt:'PT',
				nb_gt:'GT',
				retour_f:'Retour ',
				arriv_f:'ArrivÃ©e ',
				batiment_non_visible:'Batiment non visible',

			//message de pop up
				vari_res:'Variables de raides et options remises Ã  zÃ©ro dÃ» au changement de version, dÃ©solÃ©.',
				q_reset:'Voulez-vous remettre Ã  zÃ©ro toutes les variables de raide?',
				reset:'Remise Ã  zÃ©ro effectuÃ©e. Actualisez la page pour voir la diffÃ©rence.',
				q_reset_o:'Voulez-vous remetre Ã  zÃ©ro toute les options ?',
				reset_s:'Remise Ã  zÃ©ro effectuÃ©e. Actualisez la page pour voir la diffÃ©rence.',
				option_sv:'Options de Raide-Facile sauvegardÃ©es',
				del_scan:'Scans supprimÃ©s, rafraÃ®chissement de la page',
				rep_mess_supri:'Messages SupprimÃ©s',

			// ecrit dans les scans en pop up
				del_scan_d:'Effacer ce message',
				del_scan_script:'Effacer le message et le scan',
				del_script:'Effacer le scan',
				enleve_script:'Enlever le scan',
				add_scan:'Ajouter le scan',
				add_scan_d:'Ajouter le scan',

			// boutons
				save_optis:'Sauvegarder les options',
				remis_z:'Remise Ã  zÃ©ro.',
				supr_scan_coche:'Supprimer les scans cochÃ©s',
				supr_scan_coche_nnslec:'Supprimer les scans non cochÃ©s',

			//import / export
				export_scan_se:'Exporter les scans sÃ©lectionnÃ©s',
				export_scan_nnse:'Exporter les scans non sÃ©lectionnÃ©s',
				importer_scan:'Importer les scans',
				import_rep:'Scan importÃ© et ajoutÃ© Ã  votre base de donnÃ©es',
				importt:'Import :',
				exportt:'Export :',

			//bouton messages
				spr_scrptscan_a:'Supprimer Scan et Scan script affichÃ©',
				spr_scrptscan_ns:'Supprimer Scan et Scan script non sÃ©lectionnÃ©',
				spr_scrptscan_s:'Supprimer Scan et Scan script sÃ©lectionnÃ©',
				spr_scan_a:'Supprimer Scan script affichÃ©',
				spr_scan_ns:'Supprimer Scan script non sÃ©lectionnÃ©',
				spr_scan_s:'Supprimer Scan script sÃ©lectionnÃ©',
				add_scan_a:'Ajouter Scan AffichÃ© ',
				add_scan_ns:'Ajouter Scan Non SÃ©lectionnÃ©',
				add_scan_s:'Ajouter Scan SÃ©lectionnÃ©',
				rep_mess_add:'Scan ajoutÃ©s',
		}
	}
	else if(langue == 'ro') {
		text = {
			//option mon compte
			moncompte:'Contul meu ',
			vos_techno:'Tehnologiile tale : ',
			q_coord:'Coordonatele flotei plecate',
			q_vaisseau_min:'Care este cea mai lentÄƒ navÄƒ Ã®n flota pe care o foloseÅŸti',
				pourcent:'Ce procent din flota ta este convertitÄƒ Ã®n CR Ã®n universul tÄƒu ?',
				pourcent_def:'Ce procent din apÄƒrarea ta este convertit Ã®n CR Ã®n universul tÄƒu ?',

			// option variable
			choix_certaine_vari:'Alege cÃ¢teva variabile',
			q_apartir:'ia rapoarte de spionaj din',
			apartir:'totalul de resurse.',
			q_cdrmin:'CÃ¢mp de RÄƒmÄƒÅŸiÅ£e minim ',
			q_totmin:'CÃ¢mp de RÄƒmÄƒÅŸiÅ£e + minimum de Resurse recuperabile ',
			q_prend_type:'Ia doar scanÄƒri cu ',
				rep_0_prend1:' CÃ¢mp de RÄƒmÄƒÅŸiÅ£e>',
				rep_0_prend2:' sau resurse >',
				rep_1_prend1:'CÃ¢mp de RÄƒmÄƒÅŸiÅ£e>',
				rep_1_prend2:' ÅŸi resurse > ',
				rep_2_prend:' CÃ¢mp de RÄƒmÄƒÅŸiÅ£e + resurse > ',
			q_class:'SorteazÄƒ tabelul dupÄƒ',
				c_date:'Date',
				c_coo:'Coordonate',
				c_nj:'Numele jucÄƒtorului',
				c_np:'Numele planetei',
				c_met:'Metal',
				c_cri:'Cristal',
				c_deu:'Deuteriu',
				c_acti:'Activitate',
				c_cdr:'Posibil CÃ¢mp de RÄƒmÄƒÅŸiÅ£e',
				c_nbv:'NumÄƒrul de nave',
				c_nbd:'NumÄƒrul de apÄƒrare',
				c_ress:'Totalul resurselor',
				c_type:'Tip (lunÄƒ sau planetÄƒ)',
				c_cdrress:'Resurse+CR',
				prod_classement:'ProducÅ£ie',
				ressourcexh:'resurse Ã®n x ore',
				c_vaisseau_valeur:' Puterea totalÄƒ de atac a tuturor navelor',
				c_defense_valeur:' Puterea totalÄƒ de atac a tuturor unitÄƒÅ£ilor de apÄƒrare',
			q_reverse:'clasamentul va fi Ã®n ordine :',
			  descroissant:' descrescÄƒtoare',
			  croissant:' crescÄƒtoare',
			q_sae_auto:'Automatic backup al rapoartele de spionaj cÃ¢nd sunt vÄƒzute ? ',
			remp_scn:'ÃŽnlocuire automatÄƒ a raportului de spionaj dacÄƒ este de pe aceaÅŸi planetÄƒ ? ',
			q_garde:'Nu ÅŸterge rapoartele de spionaj mai vechi de ',
				jours:'zile',
				heures:'ore',
				min:'minute',
			import_q:'CÃ¢nd importeazÄƒ, fiecare scan ',
				import_remplace:' Ã®nlocuieÅŸte celelalte ',
				import_rajoute:' sunt adÄƒugate la celelalte ',
			/***news **/
			q_nb_max_def:'NumÄƒrul maxim de apÄƒrare dincolo de care script-ul nu scaneazÄƒ ?(0 = dezactiveazÄƒ) ',
			lien_raide_nb_pt_gt:'Vrei, cÃ¢nd selectezi butonul de atac sÄƒ preselecteze fie una ori alta :',
			nb_pt:'NumÄƒrul de transportatoare mici',
			nb_gt:'NumÄƒrul de transportatoare mari',
			rien:'Nimic',
			/**fin news **/


			//couleur ligne
			couleur_ligne:'Coloarea liniei ',
			q_color:' Culoarea linii Å£intei dacÄƒ flota ta este Ã®n modul de',
			attt:'Atac',
			ag:'Atac ACS',
			det:'Distruge',
			att_r:'Atac (R)',
			ag_r:' Atac ACS (R)',
			det_r:'Distruge(R)',

			//option affichage
			option_affichage:'OpÅ£iuni de afiÅŸare ',
			lienraide:' Pune linkul de la Raide-Facile ',
				En_haut:'ÃŽn top',
				gauche:'La stanga',
			lienespi:'Limkul din raportul de spionaj te va duce la :',
				page_f:'Vedere flotÄƒ',
				page_g:'Vedere galaxie',
			cdr_q:'Cantitatea de cÃ¢mp de rÄƒmÄƒÅŸiÅ£e este afiÅŸatÄƒ : ',
				recyclc:' Ã®n numÄƒrul de Reciclatoare ',
				ressousrce:'Ã®n numÄƒrul de resurse',
			tps_vol:'AratÄƒ timpul de zbor?',
			nom_j_q:'AratÄƒ numele jucÄƒtorului ?',
			nom_p_q:'AratÄƒ numele plantei ?',
			autre_planette:'Nu-mi arÄƒta numele direct, dar aratÄƒ-mi cÃ¢nd dau click pe coordonate',
			coor_q:'AratÄƒ coordonatele planetei ?',
			defense_q:'AratÄƒ informaÅ£ii despre apÄƒrare ?',
			vaisseau_q:'AratÄƒ informaÅ£ii despre flotÄƒ ?',
				defense_nb:'da, numÄƒrul lor.',
				defense_valeur:'da, puterea de atac',
			q_date:'AratÄƒ datele Ã®n tabel ?',
			q_date_type:'Pentru datÄƒ arÄƒtÄƒm ?',
				date_type_chrono:'Timpul curent',
				date_type_heure:'Timpul rapoartelor de spionaj',
			q_prod:'AratÄƒ producÅ£ia pe orÄƒ pe planetÄƒ',
			q_ress_h:'AratÄƒ resursele (0 = Nu arÄƒta)',
			mess_q:'AratÄƒ un link  cÄƒtre mesaje ?',
			q_simul:'Ce simulator de timp vrei sÄƒ foloseÅŸti ?',
				drago:'Dragosim',
				speed:'Speedsim',
				ogwinner:'Ogame-Winner',
			q_tech: 'AratÄƒ tech.',
		simu_exte:'sau ia raportul de spionaj Ã®n zona pentru export pentru alt simulator',
			page:'CÃ¢te scanÄƒri vrei sÄƒ fie afiÅŸate pe paginÄƒ ?(0=toate)',
			question_rassemble_cdr_ress:'Vrei sÄƒ aduni resursele ÅŸi cÃ¢mpul de rÄƒmÄƒÅŸiÅ£e ?',
			q_pt_gt:'AfiÅŸeazÄƒ ct/ht ?',
			q_techn_sizero:'Vrei sÄƒ Ã®Å£i pui tehnologiile pe 0 cÃ¢nd raportul de spionaj nu aratÄƒ tehnologiile oponentului ?',
			question_afficher_icone_mess:'Vrei sÄƒ afiÅŸezi icoanele ?',
			q_afficher_dernier_vid_colo:'AfiÅŸeazÄƒ timpul ultimelor raiduri (aproximativ) ?',
		/** news **/
		q_afficher_ligne_def_nvis:'AfiÅŸeazÄƒ linia dacÄƒ apÄƒrarea nu este aparentÄƒ?',
		q_afficher_ligne_flo_nvis:'AfiÅŸeazÄƒ linia dacÄƒ flota nu este aparentÄƒ ?',
		q_inactif:'AfiÅŸeazÄƒ o coloanÄƒ pentru a arÄƒta cÄƒ jucatorul este inactiv ?',
		q_compteur_attaque:'AfiÅŸeazÄƒ o coloanÄƒ care dÄƒ numÄƒrul de rapoarte de bÄƒtÄƒlie pe planeÄƒ Ã®n 24H ?',
		q_galaxie_scan:'Vrei sÄƒ arÄƒÅ£i doar rapoartele de spionaj din galaxie pe planeta selectatÄƒ ?',
		taux_classement_ressource:'Give the resources rate for the rainking by resources.',
		taux_m:'Rate M : ',
		taux_c:'Rate C : ',
		taux_d:'Rate D : ',
		other:' others',
		afficher_seulement:'AratÄƒ doar : ',
		toutt:'Toate',
		planete_sel:'PlanetÄƒ',
		lune:'LunÄƒ',

		filtrer : 'Filter',
		filtre_actif : 'Active',
		filtre_inactif : 'Inactive',

		q_lien_simu_meme_onglet:'Vrei ca linkul de la simulator sÄƒ te ducÄƒ la : ',
		rep_onglet_norm:'Un nou arÄƒtat de fiecare datÄƒ.',
		rep_onglet_autre:'AcelaÅŸi tabel va fi reÃ®ncÄƒrcat.',

		affichage_global:'AfiÅŸare GeneralÄƒ :',
		affichage_colonne:'AfiÅŸare columnÄƒ :',
		affichage_changement_colonne:'SchimbÄƒ Ã®n coloane :',
		changement_boutondroite:'Schimbarea butoanelor din bara lateralÄƒ Ã®n partea dreaptÄƒ :',
		/** fin news **/

			//option bbcode
			text_centre:'Vrei sÄƒ centrezi bbcode ?',
			text_cite:'Vrei BBcode Ã®n quotes ?',
			balise_centre:'Ce tag-uri vrei sÄƒ foloseÅŸti pentru centrare text ?',
			balise1_center:'[align=center]',
			balise2_center:'[center]',
			balise_url:'Ce tag-uri vrei sÄƒ folosesti "URL" ?',
			balise1_url:'[url=\'address\']',
			balise2_url:'[url=address]',
			color:'color',

		//sous titre pour separer les options
		other_st:'Alte',
		option_save_scan_st:'Backup options al rapoartele de spionaj',
		classement_st:'Clasament',
		selec_scan_st:'Selectare rapoartele de spionaj',

			// tableau icone et autre
			espionner:'|spioneazÄƒ',
			eff_rapp:'|Sterge acest raport de spionaj',
			att:'|AtacÄƒ',
			simul:'|SimuleazÄƒ',
			mise_jours:'Posibil Update al Raid Facile',
			cdr_pos:'CÃ¢mp de rÄƒmÄƒÅŸiÅ£e',
			dated:'Date',
			th_nj:'Jucator',
			th_coo:'Coordonate',
			th_np:'PlanetÄƒ',
			th_ress:'Resurse',
			th_fleet:'ct/ht',
			th_nv:'flotÄƒ',
			th_nd:'ApÄƒrare',
			th_tech:'',
			metal:'Metal',
			met_rc:'Metal Reciclat',
			cristal:'Cristal',
			cri_rc:'Cristal Reciclat',
			nb_rc:'reci.',
			nb_pt:'ct',
			nb_gt:'ht',
			deut:'Deut',
			nb_recycl:'NumÄƒrul de Reciclatoare',
			retour_f:'ÃŽntoarcere ',
			arriv_f:'Ajunge ',
			tmp_vol_th:'Timpul de zbor',
			prod_h_th:'Output/h',
			ressource_xh_th:'Resurse x Ore',
			th_ress_cdr_col:'DF+Res',
			th_h_vidage:'Timpul Raidului',

			//autre messages.
			vari_res:'Variabilele de raid ÅŸi opÅ£iunile au fost ÅŸterse din cauza upgradeului. Sorry!',
			q_reset:'Vrei sa resetezi toate variabilele  si optiunile ?',
			reset:'Resetare terminatÄƒ.ReÃ®mprospÄƒteaza pagina ca sÄƒ vezi rezultatele.',
			q_reset_o:'Vrei sÄƒ resetezi toate opÅ£iunile ?',
			reset_s:'Resetare terminatÄƒ. ReÃ®mprospateazÄƒ pagina ca sÄƒ vezi rezultatele.',
			option_sv:'OpÅ£iunile Raide-Facile salvate',
			raide_facil:'Raid-Facile',
			del_scan:'Rapoartele de spionare sterse, reÃ®mprospÄƒteazÄƒ pagina',
			del_scan_d:'| ÅŸterge aceast mesaj',
			del_scan_script:'ÅŸterge mesaj + scanare script',
			del_script:'ÅŸterge scanarea de la script',
			enleve_script:'|ÅŸterge rapoartele de spionaj dar nu si scriptul',
			add_scan:'|AdaugÄƒ rapoartele de spionaj de la script',
			add_scan_d:'AdaugÄƒ scriptul la aceste rapoarte de spionaj',
			save_optis:'SalveazÄƒ opÅ£iunile',
			remis_z:'ReseteazÄƒ.',
			supr_scan_coche:'Åžterge rapoartele de spionaj selectate',
			supr_scan_coche_nnslec:'Åžterge rapoartele de spionaj neselectate',
			oui:'da',
			non:'nu',
			batiment_non_visible:'Nu arÄƒta ClÄƒdirile',
			rep_mess_supri:'Posturi ÅŸterse',

			//import / export
			export_scan_se:'ExportÄƒ rapoartele de spionaj selectate',
			export_scan_nnse:'ExportÄƒ rapoartele de spionaj neselectate',
			importer_scan:'Importa rapoarte de spionaj',
			import_rep:'Rapoarte de spionaj importate ÅŸi adÄƒugate la baza ta',
			importt:'ImportÄƒ :',
			exportt:'ExportÄƒ :',

			//bouton messages
			spr_scrptscan_a:'Åžterge raportul de spionaj ÅŸi scanarea de script afiÅŸatÄƒ',
			spr_scrptscan_ns:'Åžterge raportul de spionaj ÅŸi scanul de script neselectat',
			spr_scrptscan_s:'Delete esp report and selected Scan script',
			spr_scan_a:'Åžterge scanul de script afiÅŸat',
			spr_scan_ns:'Åžterge scanul de script neselectat',
			spr_scan_s:'Åžterge scanul de script selectat ',

			add_scan_a:'AdaugÄƒ raportul de spionaj afiÅŸat',
			add_scan_ns:'AdaugÄƒ raportulde spionaj neselectat',
			add_scan_s:'AdaugÄƒ raportul de spionaj selectat',
			rep_mess_add:'Raport de spionaj adÄƒugat',

			//option langue
			option_langue:'LimbÄƒ',
			q_langue:'ÃŽn ce limbÄƒ vrei sa foloseÅŸti scriptul? ?',
			francais:'FrancezÄƒ',
			anglais:'EnglezÄƒ',
			spagnol:'EspaÃ±ol',
			roumain:'Rumano',
			autre:'Alte',
		}
	}
	else if(langue == 'es') {
		text = {
			//option mon compte
				moncompte:'Mi Cuenta',
				vos_techno:'Tus tecnologÃ­as : ',
				q_coord:'Coordenadas de salida de tu flota',
				q_vaisseau_min:'CuÃ¡l es tu nave mÃ¡s lenta en la flota que utilizas',
				pourcent:'Â¿QuÃ© porcentaje de escombros genera tu flota al ser destruida en tu Universo?',
				pourcent_def:'Â¿QuÃ© porcentaje de escombros generan tus defensas al ser destruidas en tu Universo?',

			// option variable
			choix_certaine_vari:'Selecciona algunas variables',
			selec_scan_st:'SelecciÃ³n del informe de espionaje',
				q_apartir:'leer el informe de espionaje de',
					apartir:'recursos totales.',
				q_cdrmin:'Escombros mÃ­nimo ',
				q_totmin:'Escombros + Recursos mÃ­nimos recuperables ',
				q_prend_type:'Leer sÃ³lo lecturas con ',
					rep_0_prend1:'Escombros>',
					rep_0_prend2:'o recursos >',
					rep_1_prend1:'Escombros>',
					rep_1_prend2:'and resources > ',
					rep_2_prend:'Escombrosd + recursos > ',

			classement_st:'Ranking',
				q_class:'Ordenar la tabla por',
					c_date:'Fecha',
					c_coo:'Coordenadas',
					c_nj:'Nombre del Jugador',
					c_np:'Nombre del Planeta',
					c_met:'Metal',
					c_cri:'Cristal',
					c_deu:'Deut',
					c_acti:'Actividad',
					c_cdr:'Posibles Escombros',
					c_nbv:'NÂº de Naves',
					c_nbd:'NÂº de Defensas',
					c_ress:'Recursos totales',
					c_type:'Tipo (luna o planeta)',
					c_cdrress:'Recursos+Escombros',
					prod_classement:'ProducciÃ³n',
					ressourcexh:'recursos en x horas',
				q_reverse:'el ranking se mostrarÃ¡ en orden :',
					descroissant:'descendente',
					croissant:'ascendente',
				taux_classement_ressource:'Dar los ratios de recursos al ordenar por recursos.',
					taux_m:'Ratio M : ',
					taux_c:'Ratio C : ',
					taux_d:'Ratio D : ',

			option_save_scan_st:'Guardar opciones del informe de espionaje',
				q_sae_auto:'Â¿Guardar automÃ¡ticamente el informe de espionaje al verlo? ',
				remp_scn:'Â¿Actualizar automÃ¡ticamente del informe de espionaje anterior cuando sea del mismo planeta? ',
				q_garde:'No hacerlo y borrar el informe de espionaje anterior',
					jours:'dÃ­as',
					heures:'horas',
					min:'minutos',

			other_st:'Otro',
				import_q:'Al importar cada sondeo',
					import_remplace:'reemplazarÃ¡ el anterior',
					import_rajoute:'serÃ¡ aÃ±adido a los anteriores',
				q_nb_max_def:'Â¿NÃºmero mÃ¡ximo de defensas a partir del cual el script no almacenarÃ¡ los informes?(0 = desactivado) ',
				lien_raide_nb_pt_gt:'Â¿Quieres que al seleccionar el botÃ³n Atacar, se preseleccione una nave u otra :',
					nb_pt:'NÃºmero de NPC',
					nb_gt:'NÃºmero de NGC',
					rien:'Nada',


			//couleur ligne
			couleur_ligne:'LÃ­nea de color',
				q_color:'Color de la lÃ­nea del objetivo si tu tipo de floa es',
					attt:'Ataque',
					ag:'SAC',
					det:'Destruir',
					att_r:'Ataque (R)',
					ag_r:' SAC (R)',
					det_r:'Destruir (R)',

			//option affichage
			option_affichage:'Mostrar opciones',
			affichage_changement_colonne:'Cambiar entre columnas:',
				q_date_type:'Â¿Mostrar por fecha?',
					date_type_chrono:'Hora actual',
					date_type_heure:'Hora del informe de espionaje',
				cdr_q:'Cantidad de Escombros se muestra: ',
					recyclc:'por nÃºmero de Recicladores',
					ressousrce:'por nÃºmeros de recursos',

			changement_boutondroite:'Cambiar los botones del menu lateral derecho:',
				question_afficher_icone_mess:'Â¿Quieres mostrar iconos?',
				q_simul:'Â¿QuÃ© simulador quieres utilizar?',
					drago:'Dragosim',
					speed:'Speedsim',
					ogwinner:'Ogame-Winner',
					simu_exte:'o coger el informe de espionaje para exportarlo a otro simulador',
				mess_q:'Â¿Mostrar un enlace a los mensajes?',
				lienespi:'En enlace en el informe de espionaje te lleva a :',
					page_f:'Vista de Flota',
					page_g:'Vista de Galaxia',
				q_lien_simu_meme_onglet:'Â¿Quieres que los enlaces a los simuladores se abran: ',
					rep_onglet_norm:'en una nueva pestaÃ±a cada vez.',
					rep_onglet_autre:'La misma pestaÃ±a se actualizarÃ¡l.',


			affichage_colonne:'Mostrar Columna:',
				q_inactif:'Â¿Mostrar una columna si que muestre si un jugador estÃ¡ inactivo?',
				q_compteur_attaque:'Â¿Mostrar una columna que indique el nÃºmero de Informe de Batallas en el planeta en las Ãºltimas 24h?',
				q_afficher_dernier_vid_colo:'Â¿Mostrar la hora de los ultimos saqueos (aproximadamente)?',
				question_rassemble_cdr_ress:'Â¿Quieres recursos y Escombros quieres reunir?',
				q_pt_gt:'Mostrar ct/ht ?',
				q_prod:'Mostrar la producciÃ³n por horas del planeta',
				q_ress_h:'Mostrar los recursos (0 = No mostrar)',
				q_date:'Â¿Mostrar fecha en la tabla?',
				tps_vol:'Â¿Mostrar tiempo de vuelo?',
				nom_j_q:'Â¿Mostrar en nombre del jugador?',
				nom_p_q:'Â¿Mostrar el nombre del planeta?',
					autre_planette:'Â¿No mostrar el nombre directamente pero mostrar el clickar sobre las coordenadas',
				coor_q:'Â¿Mostrar las coordenadas del planeta?',
				q_tech: 'Â¿Mostrar tech.',

			affichage_global:'VisiÃ³ General:',
				q_galaxie_scan:'Â¿Quieres mostrar sÃ³lo los informes de espionaje de la galaxÃ­a del planeta seleccionado?',
					other:' otros',
				afficher_seulement:'Mostrar sÃ³lo: ',
					toutt:'Todo',
					planete_sel:'Planeta',
					lune:'Luna',
				filtrer : 'Filter',
				filtre_actif : 'Active',
				filtre_inactif : 'Inactive',
				q_afficher_ligne_def_nvis:'Â¿Mostrar la lÃ­nea si las defensas no aparecen?',
				q_afficher_ligne_flo_nvis:'Â¿Mostrar la lÃ­nea si la flota no aparece?',
				page:'Â¿CuÃ¡ntos sondeos quieres mostrar por pÃ¡gina?(0=todos)',

			other_st:'Otro',
				q_techn_sizero:'Â¿Quieres poner tus tecnologÃ­as a 0 cuando el informe de espionaje del enemigo no muestre sus tecnologÃ­as?',
				lienraide:'Poner el enlace de Raide-Facile',
					En_haut:'En la parte superior',
					gauche:'En la izquierda',

			//global
				oui:'si',
				non:'no',

			//option langue
			option_langue:'Idioma',
				q_langue:'Â¿En quÃ© idioma quieres usar el Script?',
					francais:'FrancÃ©s',
					anglais:'InglÃ©s',
					spagnol:'EspaÃ±ol',
					roumain:'Rumano',


			//option bbcode
			text_centre:'Â¿Quieres centrar el bbcode?',
			text_cite:'Â¿Quieres el BBcode en las citas?',
			balise_centre:'Â¿QuÃ© cÃ³digo quieres usar para centrar el texto?',
				balise1_center:'[align=center]',
				balise2_center:'[center]',
			balise_url:'Â¿QuÃ© cÃ³digo quieres usar para una URL?',
				balise1_url:'[url=\'address\']',
				balise2_url:'[url=address]',
			color:'color',


			// tableau icone et autre
				// titre tableau
				th_nj:'Jugador',
				th_np:'Planeta',
				th_coo:'Coordenadas',
				dated:'Fecha',
				tmp_vol_th:'Tiempo de vuelo',
				prod_h_th:'Output/h',
				th_h_vidage:'Tiempo del Saqueo',
				ressource_xh_th:'Recursos x hora',
				th_ress:'Recursos',
				th_fleet:'ct/ht',
				th_ress_cdr_col:'Escombros+Recursos',
				nb_recycl:'NÂº de Recicladores',
				th_nv:'flota',
				th_nd:'Defensa',
				th_tech:'',

				// bouton de droite
				espionner:'|Espiar',
				eff_rapp:'|Eliminar el informe de espionaje',
				att:'|Atacar',
				simul:'|Simular',

			// entete
			raide_facil:'Raid-Facile',
			mise_jours:'Actualizar Raid Facile',

			// interieur avec acronyme
			cdr_pos:'Escombros',
			metal:'Metal',
			deut:'Deut',
			cristal:'Cristal',
			met_rc:'Metal Reciclable',
			cri_rc:'Cristal Reciclable',
			nb_rc:'reci.',
			nb_pt:'ct',
			nb_gt:'ht',
			retour_f:'Retorno ',
			arriv_f:'Llegada ',
			batiment_non_visible:'ConstrucciÃ³n no mostrada',

			//message de pop up
			vari_res:'Las variables de los saqueos y las opciones han sido reseteadas debido a la actualizaciÃ³n. Â¡Lo sentimos!',
			q_reset:'Â¿quieres resetear todas las variables y opciones?',
			reset:'Reseteo hecho. Actualiza la pÃ¡gina para ver el resultado.',
			q_reset_o:'QUieres resetear todas las opciones?',
			reset_s:'Reseteo hecho. Actualiza la pÃ¡gina para ver el resultado.',
			option_sv:'Opciones de Raide-Facile guardadas',
			del_scan:'Informes de espionaje borrados, pÃ¡ginas actualizadas',
			rep_mess_supri:'Posts eliminados',

			// ecrit dans les scans en pop up
			del_scan_d:'|borrar este mensaje',
			del_scan_script:'eliminar fallos + revisar el script',
			del_script:'eliminar script',
			enleve_script:'|eliminar el informe de espionaje pero no el script',
			add_scan:'|AÃ±adir el informe de espionaje desde el script',
			add_scan_d:'AÃ±adir el script desde este informe de espionaje',

			// boutons
			save_optis:'Guardar opciones',
			remis_z:'Resetear.',
			supr_scan_coche:'Eliminar los informes de espionaje seleccionados',
			supr_scan_coche_nnslec:'Eliminar los informes de espionaje no seleccionados',


			//import / export
			export_scan_se:'Exportar los informes de espionaje seleccionados',
			export_scan_nnse:'Exportar los informes de espionaje no seleccionados',
			importer_scan:'Importar informes de espionaje',
			import_rep:'informe de espionaje y aÃ±adido a la Base de Datos',
			importt:'Import :',
			exportt:'Export :',

			//bouton messages
			spr_scrptscan_a:'Eliminar informe de espionaje mostrado',
			spr_scrptscan_ns:'Eliminar informe de espionaje no seleccionado',
			spr_scrptscan_s:'Eliminar informe de espionaje seleccionado',
			spr_scan_a:'Eliminar el Scan script mostrado',
			spr_scan_ns:'Eliminar el Scan script no seleccionado',
			spr_scan_s:'Eliminar el Scan script seleccionado',
			add_scan_a:'AÃ±adir informe de espionaje mostrado',
			add_scan_ns:'AÃ±adir informe de espionaje no seleccionado',
			add_scan_s:'AÃ±adir informe de espionaje seleccionado',
			rep_mess_add:'Informe de espionaje aÃ±adido',



		}
	}
	else /* anglais */ {
		text = {
			//option mon compte
				moncompte:'My account ',
				vos_techno:'Your technologies : ',
				q_coord:'Coordinates of departure fleet',
				q_vaisseau_min:'What\'s your slowest ship in your fleet that you use',
				pourcent:'What percentage of your fleet is converted to DF in your universe?',
				pourcent_def:'What percentage of your defense is converted to DF in your universe?',

			// option variable
			choix_certaine_vari:'Choice for some variables',
			selec_scan_st:'Selection of espionage report',
				q_apartir:'take espionage report from',
					apartir:'resources recoverable.',
				q_cdrmin:'Minimal Debris field ',
				q_totmin:'Debris Field + minimum of Resources recoverable ',
				q_prend_type:'Take only scans with ',
					rep_0_prend1:' Debris Field>',
					rep_0_prend2:' or resources >',
					rep_1_prend1:'Debris Field>',
					rep_1_prend2:' and resources > ',
					rep_2_prend:' Debris Field + resources > ',

			classement_st:'Ranking',
				q_class:'Sort the table by',
					c_date:'Date',
					c_coo:'Coordinates',
					c_nj:'Name of Player',
					c_np:'Name of  Planet',
					c_met:'Metal',
					c_cri:'Crystal',
					c_deu:'Deut',
					c_acti:'Activity',
					c_cdr:'Possible Debris Field',
					c_nbv:'Nr of ships',
					c_nbd:'Nr of Defense',
					c_ress:'Total resources',
					c_type:'Type (moon or planet)',
					c_cdrress:'Resource+DF',
					prod_classement:'Production',
					ressourcexh:'resources in x hours',
					c_vaisseau_valeur:'Total Attack Strength of all Ships',
					c_defense_valeur:'Total Attack Strength of all defense units',
				q_reverse:'the ranking will be in order :',
				  descroissant:' decreasing',
				  croissant:' increasing',
				taux_classement_ressource:'Give the resources rate for the rainking by resources.',
					taux_m:'Rate M : ',
					taux_c:'Rate C : ',
					taux_d:'Rate D : ',

			option_save_scan_st:'Backup options of espionage report',
				q_sae_auto:'Automatic backup of espionage report where they are viewed ? ',
				remp_scn:'Automatic replacement of espionage report if they are from the same planet ? ',
				q_garde:'Do not make and erase espionage report older than ',
					jours:'days',
					heures:'hours',
					min:'minutes',
				q_nb_max_def:'Maximum nomber of defense beyond which the script doesn\'t take espionnage reports ?(0= desactivate)',

			other_st:'Other',
				import_q:'When importing, each scan ',
					import_remplace:' replaces the other ',
					import_rajoute:' are added to the others ',
				lien_raide_nb_pt_gt:'Do you want, when selecting Attack boutton, preselect either or either :',
					nb_pt:'Number of SC',
					nb_gt:'Number of LC',
					rien:'Nothing',


			//couleur ligne
			couleur_ligne:'Colour line ',
				q_color:' Color of the line of the target if your fleet mode is',
					attt:'Attack',
					ag:'ACS attack ',
					det:'Destroy',
					att_r:'Attack (R)',
					ag_r:' ACS attack (R)',
					det_r:'Destroy (R)',

			//option affichage
			option_affichage:'Display Options ',
			affichage_changement_colonne:'Change in the columns :',
					q_date_type:'For the date we show ?',
				date_type_chrono:'Current time',
				date_type_heure:'Time of the espionage report',
					cdr_q:'The amount of Debris Field is displayed : ',
				recyclc:' in numbers of Recyclerss ',
				ressousrce:'in numbers of resource',

			changement_boutondroite:'Change in the right sidebar buttons :',
				question_afficher_icone_mess:'Do you want to display icons ?',
				q_simul:'What flight Simulator do you want to use ?',
					drago:'Dragosim',
					speed:'Speedsim',
					ogwinner:'Ogame-Winner',
					simu_exte:'or take the espionage report in area for export in other simulator',
				mess_q:'Show a link to messages ?',
				lienespi:'The link in the spy-report takes you to :',
					page_f:'The fleet view',
					page_g:'The galaxy view',
				q_lien_simu_meme_onglet:'Do you want the simulators links to lead you to : ',
					rep_onglet_norm:'A new tab shown every time.',
					rep_onglet_autre:'The same tab will reloaded.',

			affichage_colonne:'Column Display :',
				q_inactif:'Display a column to show that the player is inactif ?',
				q_compteur_attaque:'Display a column that give the number of Combat Reports on the planet in 24H ?',
				q_afficher_dernier_vid_colo:'Display the time of the last raids (approximate) ?',
				question_rassemble_cdr_ress:'Do you want to gather resources and Debris Fields ?',
				q_pt_gt:'Show ct/ht ?',
				q_prod:'Show the hourly production of the planet',
				q_ress_h:'Show the resource (0 = Not shown)',
				q_date:'Show date in the table ?',
				tps_vol:'Show flight time?',
				nom_j_q:'Show name of the player ?',
				nom_p_q:'Show name of the planet ?',
					autre_planette:'Don\'t show the name directly but it show when you click on the coordinates',
				coor_q:'Show of the coordinates of the panet ?',
			defense_q:'Display infos about the defense ?',
			vaisseau_q:'Display infos about the fleet ?',
				defense_nb:'yes, its number.',
				defense_valeur:'yes, its attack strength',
				q_tech: 'Show tech.',

			affichage_global:'Global Display :',
				q_galaxie_scan:'Do you want to show only the spy reports of the galaxy of the selected planet ?',
					other:' others',
				afficher_seulement:'Display only : ',
					toutt:'All',
					planete_sel:'Planet',
					lune:'Moon',
				filtrer : 'Filter',
				filtre_actif : 'Active',
				filtre_inactif : 'Inactive',
				q_afficher_ligne_def_nvis:'Display the line if the dÃ©fense isn\'t apparent?',
				q_afficher_ligne_flo_nvis:'Display the line if the fleet isn\'t apparent ?',
				page:'How many scans you want to display per page ?(0=all)',


			other_st:'Other',
				q_techn_sizero:'Do you want to put your tech to 0 when the espionage report do not display the opponent\'s tech ?',
				lienraide:' Put the link of Raide-Facile ',
					En_haut:'On the top',
					gauche:'At the left',

		   //global
				oui:'yes',
				non:'no',

			//option langue
			option_langue:'Language',
				q_langue:'In what Language do you want to use the script ?',
					francais:'FranÃ§ais',
					anglais:'English',
					spagnol:'EspaÃ±ol',
					roumain:'Romanian',

			//option bbcode
			text_centre:'Do you want to center the bbcode ?',
			text_cite:'Do you want the BBcode in quotes ?',
			balise_centre:'What tags do you use for center text ?',
				balise1_center:'[align=center]',
				balise2_center:'[center]',
			balise_url:'What tags do you use for the "URL" ?',
				balise1_url:'[url=\'address\']',
				balise2_url:'[url=address]',
			color:'color',

			// tableau icone et autre
			// titre tableau
			th_nj:'Player',
			th_np:'Planet',
			th_coo:'Coordinates',
			dated:'Date',
			tmp_vol_th:'Flight time',
			prod_h_th:'Output/h',
			th_h_vidage:'Raid Time',
			ressource_xh_th:'Resource x Hours',
			th_ress:'Resource',
			th_fleet:'ct/ht',
			th_ress_cdr_col:'DF+Res',
			th_nv:'fleet',
			th_nd:'Defense',
			th_tech:'Tech.',

			// bouton de droite
			espionner:'|spying',
			eff_rapp:'|Remove this espionage report',
			att:'|Attack',
			simul:'|Simulate',

			// entete
			raide_facil:'Raid-Facile',
			mise_jours:'Possible Update of Raid Facile',

			// interieur avec acronyme
			cdr_pos:'Debris Field',
			metal:'Metal',
			cristal:'Crystal',
			deut:'Deut',
			met_rc:'Metal Recyclable',
			cri_rc:'Crystal Recyclable',
			nb_rc:'recy.',
			nb_pt:'ct',
			nb_gt:'ht',
			nb_recycl:'Nr of Recyclers',
			retour_f:'Return ',
			arriv_f:'Arrival ',
			batiment_non_visible:'Building not shown',

			//message de pop up
			vari_res:'Raid variables and options have been reset because of the upgrade. Sorry!',
			q_reset:'Do you want to reset all variables and options ?',
			reset:'Reset done. Refresh the page to see the result.',
			q_reset_o:'Do you want to reset all options ?',
			reset_s:'Reset done. Refresh the page to see the result.',
			option_sv:'Options of Raide-Facile saved',
			del_scan:'Spying reports deleted, pages refresh',
			rep_mess_supri:'Posts deleted',

			// ecrit dans les scans en pop up
			del_scan_d:'|delete this message',
			del_scan_script:'delete mess + scan script',
			del_script:'delete scan script',
			enleve_script:'|delete the espionage report but not the script',
			add_scan:'|Add the esp report from the script',
			add_scan_d:'Add the script from this spying reports',

			// boutons
			save_optis:'Save options',
			remis_z:'Reset.',
			supr_scan_coche:'Delete selected esp reports',
			supr_scan_coche_nnslec:'Delete unselected esp reports',

			//import / export
			export_scan_se:'Export selected esp reports',
			export_scan_nnse:'Export unselected esp reports',
			importer_scan:'Import esp reports',
			import_rep:'esp report imported and added to your Database',
			importt:'Import :',
			exportt:'Export :',

			//bouton messages
			spr_scrptscan_a:'Delete esp report and displayed Scan script',
			spr_scrptscan_ns:'Delete esp report and unselected Scan script',
			spr_scrptscan_s:'Delete esp report and selected Scan script',
			spr_scan_a:'Delete displayed Scan script',
			spr_scan_ns:'Delete unselected Scan script',
			spr_scan_s:'Delete selected Scan script ',
			add_scan_a:'Add displayed esp report ',
			add_scan_ns:'Add unselected esp report',
			add_scan_s:'Add selected esp Report',
			rep_mess_add:'esp Report added',
		}
	}

	var vari, localization;
	if((location.href.indexOf('.ogame.fr',0)) >=0) {
		localization = {
			missions: {
				'1': 'Attaquer',
				'2': 'Attaque groupÃ©e',
				'3': 'Transporter',
				'4': 'Stationner',
				'5': 'Stationner',
				'6': 'Espionner',
				'7': 'Coloniser',
				'8': 'Recycler le champ de dÃ©bris',
				'9': 'DÃ©truire',
				'15': 'ExpÃ©dition'
			}
		};
		vari = {
			sur:'sur ',
			de:' de ',
			pt: 'Petit transporteur',gt: 'Grand transporteur',cle: 'Chasseur lÃ©ger',clo: 'Chasseur lourd',cro: 'Croiseur',vb: 'Vaisseau de bataille',vc: 'Vaisseau de colonisation',rec: 'Recycleur',esp: 'Sonde d`espionnage',bb: 'Bombardier',sat: 'Satellite solaire',dest: 'Destructeur',edlm: 'Ã‰toile de la mort',tra: 'Traqueur',
			lm: 'Lanceur de missiles',lle: 'Artillerie laser lÃ©gÃ¨re',llo: 'Artillerie laser lourde',gauss: 'Canon de Gauss',ion: 'Artillerie Ã  ions',pla: 'Lanceur de plasma',pb: 'Petit bouclier',gb: 'Grand bouclier',mic: 'Missile d`interception',mip: 'Missile InterplanÃ©taire',
			tech_arm:'Technologie Armes', tech_bouc:'Technologie Bouclier', tech_pro:'Technologie Protection des vaisseaux spatiaux',
			tech_com:'Technologie Combustion', tech_imp:'Technologie Impulsion', tech_hyp:'Technologie Hyper-Espace',
			mine_m:'Mine de mÃ©tal',
			mine_c:'Mine de cristal',
			mine_d:'SynthÃ©tiseur de deutÃ©rium',

			lang_speedsin:'fr',
			lang_dragosin:'french',
		}
	}
	else if((location.href.indexOf('.ogame.pl',0)) >=0) {
		localization = {
			missions: {
				'1': 'Atakuj',
				'2': 'Atak zwiazku',
				'3': 'Transportuj',
				'4': 'Stacjonuj',
				'5': 'Zatrzymaj',
				'6': 'Szpieguj',
				'7': 'Kolonizuj',
				'8': 'Recykluj pola zniszczen',
				'9': 'Niszcz',
				'15': 'Ekspedycja'
			}
		};
		vari = {
			sur:'na ',
			de:' z ',
			tech_arm: 'Technologia bojowa',tech_bouc: 'Technologia ochronna',tech_pro: 'Opancerzenie',
			tech_hyp: 'Naped nadprzestrzenny',tech_com: 'Naped spalinowy',tech_imp: 'Naped impulsowy',
			pt: 'Maly transporter',gt: 'Duzy transporter',cle: 'Lekki mysliwiec',clo: 'Ciezki mysliwiec',cro: 'Krazownik',vb: 'Okret wojenny',vc: 'Statek kolonizacyjny',rec: 'Recykler',esp: 'Sonda szpiegowska',bb: 'Bombowiec',sat: 'Satelita sloneczny ',dest: 'Niszczyciel',edlm: 'Gwiazda Smierci',tra: 'Pancernik',
			lm: 'Wyrzutnia rakiet',lle: 'Lekkie dzialo laserowe ',llo: 'Ciezkie dzialo laserowe',gauss: 'Dzialo Gaussa',ion: 'Dzialo jonowe',pla: 'Wyrzutnia plazmy',pb: 'Mala powloka ochronna',gb: 'Duza powloka ochronna',mic: 'Przeciwrakieta',mip: 'Rakieta miedzyplanetarna',

			mine_m:'Kopalnia metalu',
			mine_c:'Kopalnia krysztalu',
			mine_d:'Ekstraktor deuteru',

			lang_speedsin:'en',
			lang_dragosin:'english',
		}
	}
	else if((location.href.indexOf('.ogame.es',0)) >=0 || (location.href.indexOf('.ogame.com.ar',0)) >=0) {
		localization = {
			missions: {
				'1': 'Atacar',
				'2': 'Ataq. confederaciÃ³n',
				'3': 'Transporte',
				'4': 'Desplegar',
				'5': 'Mantener posiciÃ³n',
				'6': 'Espionaje',
				'7': 'Colonizar',
				'8': 'Reciclar campo de escombros',
				'9': 'Destruir',
				'15': 'ExpediciÃ³n'
			}
		};
		vari = {
			sur:'en ',
			de:' desde ',
			tech_arm: 'TecnologÃ­a Militar',tech_bouc: 'TecnologÃ­a de Defensa',tech_pro: 'TecnologÃ­a de Blindaje',
			tech_hyp: 'Propulsor Hiperespacial',tech_com: 'Motor de Combustible',tech_imp: 'Motor de Impulso',
			pt: 'Nave PequeÃ±a de Carga',gt: 'Nave Grande de Carga',cle: 'Cazador Ligero',clo: 'Cazador Pesado',cro: 'Crucero',vb: 'Nave de Batalla',vc: 'Nave de Colonia',rec: 'Reciclador',esp: 'Sonda de Espionaje',bb: 'Bombardero',sat: 'SatÃ©lite Solar',dest: 'Destructor',edlm: 'Estrella de la Muerte',tra: 'Acorazado',
			lm: 'Lanzamisiles',lle: 'LÃ¡ser PequeÃ±o',llo: 'LÃ¡ser Grande',gauss: 'CaÃ±Ã³n de Gauss',ion: 'CaÃ±Ã³n IÃ³nico',pla: 'CaÃ±Ã³n de Plasma',pb: 'CÃºpula PequeÃ±a de ProtecciÃ³n',gb: 'CÃºpula Grande ProtecciÃ³n',mic: 'Misiles AntibalÃ­sticos',mip: 'Misiles Interplanetarios',

			mine_m:'Mina de Metal',
			mine_c:'Mina de Cristal',
			mine_d:'Sintetizador de Deuterio',

			lang_speedsin:'en',
			lang_dragosin:'english',
		}
	}
	else if((location.href.indexOf('.ogame.ro',0)) >=0) {// thanks Lao Tzi
		localization = {
			missions: {
				'1': 'Atac',
				'2': 'Atac SAL',
				'3': 'Transport',
				'4': 'Desfasurare',
				'5': 'Aparare SAL',
				'6': 'Spionaj',
				'7': 'Colonizare',
				'8': 'Recicleaza campul de ramasite',
				'9': 'Distrugerea Lunii',
				'15': 'Expeditie'
			}
		};
		vari = {
			sur:'la ',
			de:' de la ',
			tech_arm: 'Tehnologia Armelor',tech_bouc: 'Tehnologia Scuturilor',tech_pro: 'Tehnologia Armurilor',
			tech_hyp: 'Motor HiperspaÅ£ial',tech_com: 'Motor de Combustie',tech_imp: 'Motor pe impuls',
			pt: 'Transportator mic',gt: 'Transportator mare',cle: 'VÃ¢nÄƒtor UÅŸor',clo: 'VÃ¢nÄƒtor Greu',cro: 'CruciÅŸÄƒtor',vb: 'NavÄƒ de rÄƒzboi',vc: 'NavÄƒ de colonizare',rec: 'Reciclator',esp: 'ProbÄƒ de spionaj',bb: 'Bombardier',sat: 'Satelit Solar',dest: 'DistrugÄƒtor',edlm: 'RIP',tra: 'Interceptor',
			lm: 'Lansatoare de Rachete',lle: 'Lasere uÅŸoare',llo: 'Lasere Grele',gauss: 'Tunuri Gauss',ion: 'Tunuri Magnetice',pla: 'Turele de PlasmÄƒ',pb: 'Scut planetar mic',gb: 'Scut planetar mare',mic: 'Rachete Anti-Balistice',mip: 'Rachete Interplanetare',

			mine_m:'MinÄƒ de Metal',
			mine_c:'MinÄƒ de Cristal',
			mine_d:'Sintetizator de Deuteriu',

			lang_speedsin:'en',
			lang_dragosin:'english',
		}
	}
	else if((location.href.indexOf('.ogame.it',0)) >=0) {// thanks Tharivol
		localization = {
			missions: {
				'1': 'Attacco',
				'2': 'Attacco federale',
				'3': 'Trasporto',
				'4': 'Schieramento',
				'5': 'Stazionamento',
				'6': 'Spionaggio',
				'7': 'Colonizzazione',
				'8': 'Ricicla campo detriti',
				'9': 'Distruzione Luna',
				'15': 'Spedizione'
			}
		};
		vari = {
			sur:'su ',
			de:' di ',
			tech_arm: 'Tecnologia delle Armi',tech_bouc: 'Tecnologia degli Scudi',tech_pro: 'Tecnologia delle Corazze',
			tech_hyp: 'Propulsore Iperspaziale',tech_com: 'Propulsore a Combustione',tech_imp: 'Propulsore a Impulso',
			pt: 'Cargo Leggero',gt: 'Cargo Pesante',cle: 'Caccia Leggero',clo: 'Caccia Pesante',cro: 'Incrociatore',vb: 'Nave da Battaglia',vc: 'Colonizzatrice',rec: 'Riciclatrice',esp: 'Sonda spia',bb: 'Bombardiere',sat: 'Satellite Solare',dest: 'Corazzata',edlm: 'Morte Nera',tra: 'Incrociatore da Battaglia',
			lm: 'Lanciamissili',lle: 'Laser Leggero',llo: 'Laser Pesante',gauss: 'Cannone Gauss',ion: 'Cannone Ionico',pla: 'Cannone al Plasma',pb: 'Cupola Scudo',gb: 'Cupola Scudo Potenziata',mic: 'Missili Anti Balistici',mip: 'Missili Interplanetari',

			mine_m:'Miniera di Metallo',
			mine_c:'Miniera di Cristalli',
			mine_d:'Sintetizzatore di Deuterio',

			lang_speedsin:'it',
			lang_dragosin:'italian',
		}
	}
	else if((location.href.indexOf('.ogame.gr',0)) >=0) {// Traduit par faethnskonhmou http://userscripts.org/users/499485
		localization = {
			missions: {
				'1': 'Î•Ï€Î¯Î¸ÎµÏƒÎ·',
				'2': 'Î•Ï€Î¯Î¸ÎµÏƒÎ· ACS',
				'3': 'ÎœÎµÏ„Î±Ï†Î¿ÏÎ¬',
				'4': 'Î Î±ÏÎ¬Ï„Î±Î¾Î·',
				'5': 'Î†Î¼Ï…Î½Î± ACS',
				'6': 'ÎšÎ±Ï„Î±ÏƒÎºÎ¿Ï€ÎµÎ¯Î±',
				'7': 'Î‘Ï€Î¿Î¯ÎºÎ¹ÏƒÎ·',
				'8': 'Î‘Î½Î±ÎºÏ…ÎºÎ»ÏŽÏƒÏ„Îµ Ï„Î¿ Ï€ÎµÎ´Î¯Î¿ ÏƒÏ…Î½Ï„ÏÎ¹Î¼Î¼Î¹ÏŽÎ½',
				'9': 'ÎšÎ±Ï„Î±ÏƒÏ„ÏÎ¿Ï†Î® Î¦ÎµÎ³Î³Î±ÏÎ¹Î¿Ï',
				'15': 'Î‘Ï€Î¿ÏƒÏ„Î¿Î»Î®'
			}
		};
		vari = {
			sur:'ÏƒÏ„Î¿ ',
			de:' Î±Ï€Î¿ ',
			tech_arm: 'Î¤ÎµÏ‡Î½Î¿Î»Î¿Î³Î¯Î± ÎŒÏ€Î»Ï‰Î½',tech_bouc: 'Î¤ÎµÏ‡Î½Î¿Î»Î¿Î³Î¯Î± Î‘ÏƒÏ€Î¯Î´Ï‰Î½',tech_pro: 'Î¤ÎµÏ‡Î½Î¿Î»Î¿Î³Î¯Î± Î˜Ï‰ÏÎ¬ÎºÎ¹ÏƒÎ·Ï‚',
			tech_hyp: 'Î ÏÎ¿ÏŽÎ¸Î·ÏƒÎ· ÎšÎ±ÏÏƒÎµÏ‰Ï‚',tech_com: 'Î©ÏƒÏ„Î¹ÎºÎ® Î ÏÎ¿ÏŽÎ¸Î·ÏƒÎ·',tech_imp: 'Î¥Ï€ÎµÏÎ´Î¹Î±ÏƒÏ„Î·Î¼Î¹ÎºÎ® Î ÏÎ¿ÏŽÎ¸Î·ÏƒÎ·',
			pt: 'ÎœÎ¹ÎºÏÏŒ ÎœÎµÏ„Î±Î³Ï‰Î³Î¹ÎºÏŒ',gt: 'ÎœÎµÎ³Î¬Î»Î¿ ÎœÎµÏ„Î±Î³Ï‰Î³Î¹ÎºÏŒ',cle: 'Î•Î»Î±Ï†ÏÏ ÎœÎ±Ï‡Î·Ï„Î¹ÎºÏŒ',clo: 'Î’Î±ÏÏ ÎœÎ±Ï‡Î·Ï„Î¹ÎºÏŒ',cro: 'ÎšÎ±Ï„Î±Î´Î¹Ï‰ÎºÏ„Î¹ÎºÏŒ',vb: 'ÎšÎ±Ï„Î±Î´ÏÎ¿Î¼Î¹ÎºÏŒ',vc: 'Î£ÎºÎ¬Ï†Î¿Ï‚ Î‘Ï€Î¿Î¹ÎºÎ¹Î¿Ï€Î¿Î¯Î·ÏƒÎ·Ï‚',rec: 'Î‘Î½Î±ÎºÏ…ÎºÎ»Ï‰Ï„Î®Ï‚',esp: 'ÎšÎ±Ï„Î±ÏƒÎºÎ¿Ï€ÎµÏ…Ï„Î¹ÎºÏŒ Î£Ï„Î­Î»ÎµÏ‡Î¿Ï‚',bb: 'Î’Î¿Î¼Î²Î±ÏÎ´Î¹ÏƒÏ„Î¹ÎºÏŒ',sat: 'Î—Î»Î¹Î±ÎºÎ¿Î¯ Î£Ï…Î»Î»Î­ÎºÏ„ÎµÏ‚',dest: 'Destroyer',edlm: 'Deathstar',tra: 'Î˜Ï‰ÏÎ·ÎºÏ„ÏŒ Î‘Î½Î±Ï‡Î±Î¯Ï„Î¹ÏƒÎ·Ï‚',
			lm: 'Î•ÎºÏ„Î¿Î¾ÎµÏ…Ï„Î®Ï‚ Î Ï…ÏÎ±ÏÎ»Ï‰Î½',lle: 'Î•Î»Î±Ï†ÏÏ Î›Î­Î¹Î¶ÎµÏ',llo: 'Î’Î±ÏÏ Î›Î­Î¹Î¶ÎµÏ',gauss: 'ÎšÎ±Î½ÏŒÎ½Î¹ Gauss',ion: 'ÎšÎ±Î½ÏŒÎ½Î¹ Î™ÏŒÎ½Ï„Ï‰Î½',pla: 'Î Ï…ÏÎ³Î¯ÏƒÎºÎ¿Î¹ Î Î»Î¬ÏƒÎ¼Î±Ï„Î¿Ï‚',pb: 'ÎœÎ¹ÎºÏÏŒÏ‚ Î‘Î¼Ï…Î½Ï„Î¹ÎºÏŒÏ‚ Î˜ÏŒÎ»Î¿Ï‚',gb: 'ÎœÎµÎ³Î¬Î»Î¿Ï‚ Î‘Î¼Ï…Î½Ï„Î¹ÎºÏŒÏ‚ Î˜ÏŒÎ»Î¿Ï‚',mic: 'Î‘Î½Ï„Î¹-Î’Î±Î»Î»Î¹ÏƒÏ„Î¹ÎºÎ¿Î¯ Î ÏÏÎ±Ï…Î»Î¿Î¹',mip: 'Î”Î¹Î±Ï€Î»Î±Î½Î·Ï„Î¹ÎºÎ¿Î¯ Î ÏÏÎ±Ï…Î»Î¿Î¹',
			mine_m:'ÎŸÏÏ…Ï‡ÎµÎ¯Î¿ ÎœÎµÏ„Î¬Î»Î»Î¿Ï…',
			mine_c:'ÎŸÏÏ…Ï‡ÎµÎ¯Î¿ ÎšÏÏ…ÏƒÏ„Î¬Î»Î»Î¿Ï…',
			mine_d:'Î£Ï…Î½Î¸Î­Ï„Î·Ï‚ Î”ÎµÏ…Ï„Î­ÏÎ¹Î¿Ï…',
		}
	}
	else /* anglais */ {
		localization = {
			missions: {
				'1': 'Attack',
				'2': 'ACS Attack',
				'3': 'Transport',
				'4': 'Deployment',
				'5': 'ACS Defend',
				'6': 'Espionage',
				'7': 'Colonization',
				'8': 'Recycle debris field',
				'9': 'Moon Destruction',
				'15': 'Expedition'
			}
		};
		vari = {
			sur:'on ',
			de:' from ',
			tech_arm: 'Weapons Technology',tech_bouc: 'Shielding Technology',tech_pro: 'Armour Technology',
			tech_hyp: 'Hyperspace Drive',tech_com: 'Combustion Drive',tech_imp: 'Impulse Drive',
			pt: 'Small Cargo',gt: 'Large Cargo',cle: 'Light Fighter',clo: 'Heavy Fighter',cro: 'Cruiser',vb: 'Battleship',vc: 'Colony Ship',rec: 'Recycler',esp: 'Espionage Probe',bb: 'Bomber',sat: 'Solar Satellite',dest: 'Destroyer',edlm: 'Deathstar',tra: 'Battlecruiser',
			lm: 'Rocket Launcher',lle: 'Light Laser',llo: 'Heavy Laser',gauss: 'Gauss Cannon',ion: 'Ion Cannon',pla: 'Plasma Turret',pb: 'Small Shield Dome',gb: 'Large Shield Dome',mic: 'Anti-Ballistic Missiles',mip: 'Interplanetary Missiles',

			// ressource:'Ressources',//pour antigame
			mine_m:'Metal Mine',
			mine_c:'Crystal Mine',
			mine_d:'Deuterium Synthesizer',

			lang_speedsin:'en',
			lang_dragosin:'english',
		}
	}
}

// ######################################### FUNCTION  ################################################## //
/** fonction globale**/{
	function strcmp(str1, str2){
		//Accent ?
		//return (mini == str2 ? 1 : -1);
		var a = str1.toLowerCase();
		var b = str2.toLowerCase();
		if (a == b) return 0;
		return (a>b?1:-1);
	}

	// separateur de milier
	function addPoints(nombre){
		if (nombre == '?') {return nombre;}
		else if (nombre==0) {return nombre;}
		else
		{
			var signe = '';
			if (nombre<0)
			{
				nombre = Math.abs(nombre);
				signe = '-';
			}
			var str = nombre.toString(), n = str.length;
			if (n <4) {return signe + nombre;}
			else
			{
				return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
			}
		}
	}

	// merci mushroonm et Lame noire qui mon donner cette function
	function insertAfter(elem, after){
		var dad = after.parentNode;
		if(dad.lastchild == after)
			dad.appendChild(elem);
		else
			dad.insertBefore(elem, after.nextSibling);
	}

	//suprimer les 0 devants.
	function supr0(number){
		number = number.toString();
		var i = 0;
		for(; i < number.length-1 && number[i] == 0; ++i)
			number[i] = '';
		return number.substring(i, number.length);
	}

	// suprime les espaces dans la variable
	function suprime_espace(serveur){
		var scan_info = GM_getValue('scan'+ serveur, '').split('#');
		var scani = '1';
		for(var g=0; g< scan_info.length;g++)
		{
			if(scan_info[g] != '' && scan_info[g] != ' ' && scan_info[g] != null && scan_info[g] !=';;;;;;;;;;;;;;;;;x;;')
			{
				if(scani.replace(/[^0-9-]/g, "") != '1')
				{scani = scani +'#'+ scan_info[g];}

				else{scani = scan_info[g];}
			}
		}
		if(scani =='1'){scani = '';}
		GM_setValue('scan'+ serveur, scani);
	}

	//raccourcisseur de noms
	function raccourcir(nomAraccourcir){
		// conditions ? si c'est vrai : si c'est faut
		return nomAraccourcir.length >= 10 ? nomAraccourcir.substring(0,10) : nomAraccourcir;
	}

	/** Affiche le lien de Raid facile */
	function afficher_lien(url_1){
		var li = $('<li id="raide-facile"></li>');
		if (info.args.raidefacil === 'scriptOptions') {
			li.append('<span class="menu_icon"><a title="Option de '+info.nom+'"><div class="menuImage traderOverview"></div></a></span>');
			$('.menu_icon a', li).click(afficherMasquerOptions);
		}
		li.append('<a href="'+url_1+'&raidefacil=scriptOptions" class="menubutton" id="lien_raide"><span class="textlabel">'+ text.raide_facil + '</span></a>');
		if(!GM_getValue("aJours_d", true)) {
			$('.textlabel', li).css('color', 'orange');
		}
		li.appendTo('#menuTableTools');
		if (info.args.raidefacil === 'scriptOptions') {
			// On dÃ©selectionne le lien sÃ©lectionnÃ©
			$('#menuTable .menubutton.selected').removeClass('selected');
			$('#menuTable .menuImage.highlighted').removeClass('highlighted');
			// On sÃ©lectionne le lien de Raid facile
			$('.menubutton', li).addClass('selected');
			$('.menuImage', li).addClass('highlighted');
			intercom.send('tooltip', {
				selector: '#raide-facile .menu_icon a',
				settings: {
					hook: 'rightmiddle'
				}
			});
		}
	}

	//function petit rectangle affiche (genre pop up) 0 V , 1 erreur
	function fadeBoxx(message, failed, temps){
		// var $;
		// try { $ = unsafeWindow.$; }
		// catch(e) { $ = window.$; }

		if (failed) {
			$("#fadeBoxStyle").attr("class", "failed");
		} else {
			$("#fadeBoxStyle").attr("class", "success");
		}
		$("#fadeBoxContent").html(message);
		$("#fadeBox").stop(true, true).fadeIn(0).delay(temps).fadeOut(500);
	}

	/** Affiche ou masque les options
		si elle sont dÃ©jÃ  affichÃ©es elles seront masquÃ©es et le tableau des scans sera affichÃ©,
		si elle sont masquÃ©e elle seront affichÃ©es et le tableau des scans sera masquÃ©
	*/
	function afficherMasquerOptions() {
		$('#option_script, #div_tableau_raide_facile').toggle();
	}

	/** Affiche l'icÃ´ne "new" avec un commentaire en "title" */
	function iconeNew(commentaire) {
		return '<img src="http://snaquekiller.free.fr/ogame/messraide/raidefacile%20mess/iconeNew.png" alt="new" title="'+commentaire+'">';
	};

}
/************************* PAGE MOUVEMENT *************************/{
	function recup_flotte_mv(){// sur la page mouvement recupere les mouvements de flottes en cours
		if (info.url.indexOf('page=movement',0) <0)
			return

		var destination_flotte_f = new Array();
		var type_missions_f = new Array();
		var xpathExpression = '//DIV[contains(@class,"fleetDetails")]/SPAN[contains(@class,"hostile")]/..';
		var xpathResult = document.evaluate(xpathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var k = 0; k < xpathResult.snapshotLength; k++) {
			var doc2 = xpathResult.snapshotItem(k);

			var destination_flotte = doc2.getElementsByClassName('destinationCoords')[0].getElementsByTagName('a')[0].innerHTML;
			destination_flotte_f[k] = destination_flotte;


			var type_missions = doc2.getElementsByClassName('mission hostile textBeefy')[0].innerHTML;
			if(!doc2.getElementsByClassName('reversal')[0] && type_missions.indexOf('(R)') == -1) {// si il n'y as pas de bouton "rappel de flotte",
				type_missions += " (R)";// c'est que la flotte est forcement sur le retour
			}
			type_missions_f[k] = type_missions;

		}
		GM_setValue("attaque_cours_d", destination_flotte_f.join(';'));
		GM_setValue("attaque_cours_t", type_missions_f.join(';'));
	}
}
/************************* PAGE DE TABLEAU *************************/{
	// mettre ou enlever l'inactivitÃ© d'un joueur
	/* function inactif_change(pseudo_inactif, check){
		var inactif = GM_getValue('inactif', '');
		var deja = inactif.indexOf(pseudo_inactif);
		if(check == true && deja == -1)//si on dit qu'il est inactif et qu'il y est pas deja alors on le rajoute a la fin
		{
			inactif = inactif + '#'+ pseudo_inactif;
		}
		else if(check == true)//si on enleve l'inactivitÃ©
		{
			var inactif_split = GM_getValue('inactif', '').split('!#!');
			for(var r=0; r<inactif_split.length; r++)
			{
				if(inactif_split[r] == pseudo_inactif)
				{
					inactif_split[r] = '';
				}

			}
			inactif = inactif_split.join('#');
		}
		inactif = inactif.replace( /\#{2,}/g, "#");
		GM_setValue('inactif', inactif);
	} */

	function save_option(serveur){
		{//mon compte
			// Vos technos
				var techno_arme = document.getElementsByClassName('valeur_arme')[0].value;
				var techno_boulier = document.getElementsByClassName('valeur_boulier')[0].value;
				var techno_protect = document.getElementsByClassName('valeur_protection')[0].value;

				var techno_combu = document.getElementsByClassName('valeur_combustion')[0].value;
				var techno_impu = document.getElementsByClassName('valeur_impulsion')[0].value;
				var techno_hyper = document.getElementsByClassName('valeur_hyper')[0].value;

			// Autre
				var coordonee_depart = document.getElementsByClassName('valeur_coordonee')[0].value;

				// vitesse du vaisseaux le plus lent.
				var vitesse_vaisseaux_plus_lent = document.getElementById('vaisseau_vite').value;

				// pourcentage de vaisseau dans le cdr
				var pourcent_cdr_q = document.getElementById('cdr_pourcent').value;
				pourcent_cdr_q = Math.round(parseFloat(pourcent_cdr_q)/10);
				pourcent_cdr_q = pourcent_cdr_q/10;

				// pourcentage de defense dans le cdr
				var pourcent_cdr_def_q = document.getElementById('cdr_pourcent_def').value;
				pourcent_cdr_def_q = Math.round(parseFloat(pourcent_cdr_def_q)/10);
				pourcent_cdr_def_q = pourcent_cdr_def_q/10;

				// ancienne question pour la vitesse de l'univers
				var vitesse_uni_q = 1;

			var option1 = techno_arme +'/'+ techno_boulier +'/'+ techno_protect +'/'+ techno_combu +'/'+ techno_impu
						+'/'+ techno_hyper +'/'+ coordonee_depart +'/'+ vitesse_vaisseaux_plus_lent +'/'+ pourcent_cdr_q +'/'+ pourcent_cdr_def_q
						+'/'+ vitesse_uni_q;
			GM_setValue('option1'+ serveur, option1);
		}

		{//choix variable
			//Selection de scan :
				var ressource_prend = document.getElementsByClassName('valeur_ressource_mini')[0].value;
				var cdr_prend = document.getElementById('valeur_cdr_mini').value;
				var tot_prend = document.getElementById('valeur_tot_mini').value;

				var prend_type0 = document.getElementById("prend_type0").checked;
				var prend_type1 = document.getElementById("prend_type1").checked;
					if(prend_type0 == true)
						{var prend_type_x = 0;}
					else if(prend_type1 == true)
						{var prend_type_x = 1;}
					else {var prend_type_x = 2;}

			//Classement :
				var selection_classement = document.getElementById('classement').value;
				var q_reverse_croissant = document.getElementById("q_reverse_croissant").checked;
					if(q_reverse_croissant == true)
						{var q_reverse_c = 0;}
					else {var q_reverse_c = 1;}

				var taux_m_rep = document.getElementById('q_taux_m').value;
				var taux_c_rep = document.getElementById('q_taux_c').value;
				var taux_d_rep = document.getElementById('q_taux_d').value;

			//Options de sauvegarde de scan :
				var save_auto_scan_non_q = document.getElementById("save_auto_scan_non").checked;
				if(save_auto_scan_non_q == true)
					{var save_auto_scan_rep = 0;}
				else {var save_auto_scan_rep = 1;}

				var scan_remplace_non = document.getElementById("scan_remplace_non").checked;
				if(scan_remplace_non == true)
					{var scan_remplace_rep = 0;}
				else{var scan_remplace_rep = 1;}

					var heures_suprime_scan = parseInt(document.getElementsByClassName('heures_suprime')[0].value);
					var jours_suprime_scan = parseInt(document.getElementsByClassName('jours_suprime')[0].value);
					var minutes_suprime_scan = parseInt(document.getElementsByClassName('minutes_suprime')[0].value);
				var minutes_total_suprime_scan = Math.floor(minutes_suprime_scan + (heures_suprime_scan*60) + parseInt((jours_suprime_scan*60*24)));

				var nb_max_def_dans_scan = parseInt(document.getElementById('nb_max_def').value);

			// Autre :
				var import_remplace = document.getElementById("import_remplace").checked;
				if(import_remplace == true)
					{var import_qq_rep = 0;}
				else {var import_qq_rep = 1;}


				var nb_gt_preremplit = document.getElementById("lien_raide_nb_gt_remplit").checked;
				var nb_pt_preremplit = document.getElementById("lien_raide_nb_pt_remplit").checked;
				if(nb_gt_preremplit == true)
					{var nb_pt_ou_gt_preremplit = 0;}
				else if(nb_pt_preremplit == true)
					{var nb_pt_ou_gt_preremplit = 1;}
				else{var nb_pt_ou_gt_preremplit = 2;}
				var nb_pourcent_ajout_lien_rep = document.getElementById('nb_pourcent_ajout_lien').value;
				var nb_ou_pourcent_rep = document.getElementById('nb_ou_pourcent').value;

			var option2 = ressource_prend +'/'+ cdr_prend +'/'+ tot_prend +'/'+ prend_type_x +'/'
						+ selection_classement +'/'+ save_auto_scan_rep +'/'+ scan_remplace_rep +'/'+ minutes_total_suprime_scan
						+'/'+ import_qq_rep +'/'+ q_reverse_c +'/'+ nb_max_def_dans_scan +'/'+ taux_m_rep +'/'+ taux_c_rep +'/'+ taux_d_rep
						+'/'+ nb_pt_ou_gt_preremplit +'/'+ nb_pourcent_ajout_lien_rep +'/'+ nb_ou_pourcent_rep;
			GM_setValue('option2'+ serveur, option2);
		}

		//{ couleur ligne
		var coll_att = document.getElementById('att1').value;
		var coll_att_r = document.getElementById('att1_r').value;

		stockageOption.set('couleur attaque', document.getElementById('att1').value);
		stockageOption.set('couleur attaque retour', document.getElementById('att1_r').value);
		
		stockageOption.set('couleur attaque2', document.getElementById('att2').value);
		stockageOption.set('couleur attaque2 retour', document.getElementById('att2_r').value);
		stockageOption.set('couleur espionnage', document.getElementById('colEspio').value);

		var coll_att_g = document.getElementsByClassName('att_group')[0].value;
		var coll_att_g_r = document.getElementsByClassName('att_group_r')[0].value;

		var coll_dest = document.getElementsByClassName('det')[0].value;
		var coll_dest_r = document.getElementsByClassName('det_r')[0].value;

		var option3 = coll_att +'/'+ coll_att_g +'/'+ coll_dest +'/'+ coll_att_r +'/'+ coll_att_g_r +'/'+ coll_dest_r;
		GM_setValue('option3'+ serveur, option3);
		//}

		{//AFFICHAGE
			// Changement dans les colonnes :
			{
				var date_type_chrono = document.getElementById("date_type_chrono").checked;
				if(date_type_chrono == true)
					{var qq_date_type_rep = 0;}
				else {var qq_date_type_rep = 1;}

				var recycleur_type_affichage_ressource_rep = document.getElementById("recycleur_type_affichage_ressource").checked;
				if(recycleur_type_affichage_ressource_rep == true)
					{var affichage_colone_recycleur_rep = 0;}
				else {var affichage_colone_recycleur_rep = 1;}
			}

			//{ Changement dans boutons de droites :
				var qq_sim_q_dra = document.getElementById("sim_q_dra").checked;
				var qq_sim_q_speed1 = document.getElementById("sim_q_speed").checked;
				var qq_sim_q_ogwin = document.getElementById("sim_q_ogwin").checked;
				var sim_q_autre = document.getElementById("sim_q_autre").checked;
				if(qq_sim_q_dra == true)
					{var qq_sim_q = 0;}
				else if(qq_sim_q_speed1 == true)
					{var qq_sim_q = 1;}
				else if(qq_sim_q_ogwin == true)
					{var qq_sim_q = 2;}
				else {var qq_sim_q = 3;}

				var mess_origine_aff_non = document.getElementById("mess_origine_aff_non").checked;
				if(mess_origine_aff_non == true)
					{var qq_mess = 0;}
				else {var qq_mess = 1;}

				var option_scan_espionn_gala = document.getElementById("espionn_galaxie").checked;
				if(option_scan_espionn_gala == true)
					{var option_respon_lien_espi = 0;}
				else {var option_respon_lien_espi = 1;}

				//{ Le lien attaquer s'ouvre dans
				stockageOption.set('attaquer nouvel onglet', parseInt($('#rf_attaquer_ouvredans').val()));
				//}

				//option de l'onglet simulateur.
				var qq_lien_simu_meme_onglet_oui = document.getElementById("q_lien_simu_meme_onglet_oui").checked;
				if(qq_lien_simu_meme_onglet_oui == true)
					{var q_rep_lien_simu_meme_onglet = 0;}
				else{var q_rep_lien_simu_meme_onglet = 1;}
			//}

			//Affichage de Colonne :
			{
				var compteur_attaque_aff_non = document.getElementById("compteur_attaque_aff_non").checked;
				if(compteur_attaque_aff_non == true)
					{var q_rep_compteur_attaque = 0;}
				else{var q_rep_compteur_attaque = 1;}

				var aff_vid_colo_non = document.getElementById("aff_vid_colo_non").checked;
				if(aff_vid_colo_non == true)
					{var q_vid_colo_rep = 0;}
				else {var q_vid_colo_rep = 1;}

				var rassemble_cdr_ress_non = document.getElementById("rassemble_cdr_ress_non").checked;
				if(rassemble_cdr_ress_non == true)
					{var rassemble_qrep = 0;}
				else {var rassemble_qrep = 1;}

				var q_pt_gt_non = document.getElementById("q_pt_gt_non").checked;
				if(q_pt_gt_non == true)
					{var affiche_pt_gt = 0;}
				else {var affiche_pt_gt = 1;}

				var prod_h_aff_non = document.getElementById("prod_h_aff_non").checked;
				if(prod_h_aff_non == true)
					{var affiche_prod_h = 0;}
				else {var affiche_prod_h = 1;}

				var ress_nb_j = parseInt(document.getElementsByClassName('ress_nb_j')[0].value);
				var ress_nb_h = parseInt(document.getElementsByClassName('ress_nb_h')[0].value);
				var ress_nb_min = parseInt(document.getElementsByClassName('ress_nb_min')[0].value);
				var ress_x_h = Math.floor(ress_nb_min + (ress_nb_h*60) + parseInt((ress_nb_j*60*24)));

				var date_affi_non = document.getElementById("date_affi_non").checked;
				if(date_affi_non == true)
					{var date_q_repons = 0;}
				else {var date_q_repons = 1;}

				var tps_vol_afficher_non_rep = document.getElementById("tps_vol_afficher_non").checked;
				if(tps_vol_afficher_non_rep == true)
					{var tps_vol_afficher_rep = 0;}
				else {var tps_vol_afficher_rep = 1;}

				var nom_joueur_affi_non = document.getElementById("nom_joueur_affi_non").checked;
				if(nom_joueur_affi_non == true)
					{var affiche_nom_joueur = 0;}
				else {var affiche_nom_joueur = 1;}

				var affiche_nom_planet_non = document.getElementById("nom_planet_affi_non").checked;
				if(affiche_nom_planet_non == true)
					{var affiche_nom_planet = 0;}
				else {var affiche_nom_planet = 1;}

				var coord_affi_non = document.getElementById("coord_affi_non").checked;
				if(coord_affi_non == true)
					{var affiche_coor_q = 0;}
				else {var affiche_coor_q = 1;}

				var affiche_def_non = document.getElementById("defense_q_n").checked;
				var affiche_def_oui_nb = document.getElementById("defense_q_nb").checked;
				if(affiche_def_non == true)
					{var affiche_def = 0;}
				else if(affiche_def_oui_nb == true)
					{var affiche_def = 1;}
				else {var affiche_def = 2;}

				var affiche_flotte_non = document.getElementById("vaisseau_q_n").checked;
				var affiche_flotte_oui_nb = document.getElementById("vaisseau_q_nb").checked;
				if(affiche_flotte_non == true)
					{var affiche_flotte = 0;}
				else if(affiche_flotte_oui_nb == true)
					{var affiche_flotte = 1;}
				else {var affiche_flotte = 2;}

				var tech_aff_non = document.getElementById("tech_aff_non").checked;
				if(tech_aff_non == true)
					{var affiche_tech = 0;}
				else {var affiche_tech = 1;}
			}

			//Affichage Global :
			{
				var scan_galaxie_cours_non = document.getElementById("scan_galaxie_cours_non").checked;
				var scan_galaxie_cours_oui = document.getElementById("scan_galaxie_cours_oui").checked;
				var scan_galaxie_plus_moin = document.getElementById("scan_galaxie_plus_ou_moin").checked;
				if(scan_galaxie_cours_non == true)
					{var q_galaxie_rep = 0;}
				else if(scan_galaxie_cours_oui == true)
					{var q_galaxie_rep = 1;}
				else if(scan_galaxie_plus_moin == true)
					{var q_galaxie_rep = 3;}
				else{var q_galaxie_rep = 2;}
				var galaxie_demande_rep = document.getElementById('galaxie_demande').value;
				var galaxie_demande_plus_moin_text_rep = document.getElementById('galaxie_demande_plus_moin_text').value;

				var afficher_lune_planet = document.getElementById("afficher_lune_planet").checked;
				var afficher_planet_seul = document.getElementById("afficher_planet_seul").checked;
				if(afficher_lune_planet == true)
					{var afficher_seulement_rep = 0;}
				else if(afficher_planet_seul == true)
					{var afficher_seulement_rep = 1;}
				else{var afficher_seulement_rep = 2;}

				var aff_lign_def_invisible_non = document.getElementById("aff_lign_def_invisible_non").checked;
				if(aff_lign_def_invisible_non == true)
					{var q_rep_def_vis = 0;}
				else{var q_rep_def_vis = 1;}

				var aff_lign_flot_invisible_non = document.getElementById("aff_lign_flot_invisible_non").checked;
				if(aff_lign_flot_invisible_non == true)
					{var q_rep_flo_vis = 0;}
				else{var q_rep_flo_vis = 1;}

				var q_nb_scan_page = document.getElementById('nb_scan_page').value;
				if(q_nb_scan_page.replace( /[^0-9-]/g, "") == '') {q_nb_scan_page = 0;}
			}

			//Autre :
			{
				var qq_techzero_non = document.getElementById("q_techzero_non").checked;
				if(qq_techzero_non == true)
					{var qq_techzero = 0;}
				else {var qq_techzero = 1;}

				var tableau_raide_facile_q = document.getElementById('tableau_raide_facile_q').value;
				if(tableau_raide_facile_q.replace( /[^0-9-]/g, "") == ''){tableau_raide_facile_q = 100;}

				var icone_parti_mess_non = document.getElementById("icone_parti_mess_non").checked;
				if(icone_parti_mess_non == true)
					{var q_icone_mess_rep = 0;}
				else {var q_icone_mess_rep = 1;}

			}

			var option4 = 'x/'+ option_respon_lien_espi +'/'+ affichage_colone_recycleur_rep +'/'+ tps_vol_afficher_rep //0-3
					+'/'+ affiche_nom_joueur +'/'+ affiche_nom_planet +'/'+ affiche_coor_q +'/'+ date_q_repons//4-5-6-7
					+'/'+ qq_date_type_rep +'/'+ affiche_prod_h +'/'+ ress_x_h +'/'+ qq_sim_q //8-11
					+'/'+ qq_mess +'/'+ q_nb_scan_page +'/'+ rassemble_qrep + '/'+ qq_techzero + '/'+ q_icone_mess_rep//12-16
					+'/'+ q_vid_colo_rep +'/'+ q_rep_flo_vis +'/'+ q_rep_def_vis +'/x/'+ q_rep_compteur_attaque//17-21
					+'/'+ q_galaxie_rep +'/'+ galaxie_demande_rep + '/'+ afficher_seulement_rep +'/'+ q_rep_lien_simu_meme_onglet//22-25
					+'/'+ affiche_def +'/'+ affiche_flotte //26-27
					+'/x/x/'+ tableau_raide_facile_q +'/'+ galaxie_demande_plus_moin_text_rep//28-29-30-31
					+'/'+affiche_pt_gt +'/'+ affiche_tech;//32-33

			GM_setValue('option4'+ serveur, option4);
		}

		{// option de langue
			var q_langue = document.getElementById('langue').value;
			var option5 = q_langue;
			GM_setValue('option5'+ serveur, option5);

			GM_setValue('exversion'+ serveur, ex_version);

			fadeBoxx(text.option_sv, 0, 5000);
		}
		stockageOption.save();
	}
	function save_optionbbcode(serveur){
		var col1 = document.getElementById('col_1').value;
		var col2 = document.getElementById('col_2').value;
		var col3 = document.getElementById('col_3').value;
		var col4 = document.getElementById('col_4').value;
		var col5 = document.getElementById('col_5').value;
		var col6 = document.getElementById('col_6').value;
		var col7 = document.getElementById('col_7').value;

		var q_cite0 = document.getElementById("cite0").checked;
		var q_cite1 = document.getElementById("cite1").checked;
		if(q_cite0 == true)
			{var q_cite = 0;}
		else if(q_cite1 == true)
			{var q_cite = 1;}

		var q_centre0 = document.getElementById("centre0").checked;
		var q_centre1 = document.getElementById("centre1").checked;
		if(q_centre0 == true)
			{var q_centre = 0;}
		else if(q_centre1 == true)
			{var q_centre = 1;}

		var q_centre_type0 = document.getElementById("centre_type0").checked;
		var q_centre_type1 = document.getElementById("centre_type1").checked;
		if(q_centre_type0 == true)
			{var rep_center_type = 0;}
		else if(q_centre_type1 == true)
			{var rep_center_type = 1;}

		var q_url_type0 = document.getElementById("url_type0").checked;
		var q_url_type1 = document.getElementById("url_type1").checked;
		if(q_url_type0 == true)
			{var q_url_type = 0;}
		else if(q_url_type1 == true)
			{var q_url_type = 1;}

		var option_save_bbcode = col1 +'/'+	col2 +'/'+ col3 +'/'+ col4 +'/'+ col5 +'/'+	col6 +'/'+ col7 +'/'+
				rep_center_type +'/'+ q_url_type +'/'+ q_centre +'/'+ q_cite;
		GM_setValue('option_bbcode'+ serveur, option_save_bbcode);
		//fadeBoxx(text.option_sv, 0, 5000);
	}

	function reset(serveur){
		var continuer = confirm(text.q_reset);
		if(continuer == true)
		{
			GM_setValue('scan'+ serveur, '');
			fadeBoxx(text.reset, 0, 5000);
		}
	}
	function resetoption(serveur){
		var continuer = confirm(text.q_reset_o);
		if(continuer == true)
		{
			GM_setValue('option1'+ serveur, '0/0/0/0/0/0/x:xxx:x/4000/0.3/0/1');
			GM_setValue('option2'+ serveur, '0/100/100/0/12/1/0/4320/1/1/0/1/1/1/2/0/0');
			GM_setValue('option3'+ serveur, '#C7050D/#025716/#FFB027/#E75A4F/#33CF57/#EFE67F');
			GM_setValue('option4'+ serveur, '1/0/0/0/1/1/1/1/0/0/0/1/0/0/0/0/1/0/1/1/0/0/0/1/1/1/1/1/x/x/0/1/1/1');
			GM_setValue('exversion'+ serveur, info.version);

		fadeBoxx(text.reset_s, 0, 5000);
		}
	}

	//function pour connaitre les scans qui sont affichÃ©.
	function connaitre_scan_afficher(serveur, nb_scan_page, url, nb){
		// on regarde par rapport au nombre de scan par page et par rapport a la page ou on est pour savoir a partir de quel scan on affiche et on s'arrete ou .
		if(nb_scan_page != 0){
			if(url.indexOf('&page_r=') != -1){var num_page = url.split('&page_r=')[1].replace( /[^0-9-]/g, "");}
			else{var num_page = 1 ;}

			if(num_page == undefined || num_page == 1)
			{
				var nb_scan_deb = 0;
				var nb_scan_fin = nb_scan_page;
			}
			else if(num_page >= 1)
			{
				var nb_scan_deb = (parseInt(num_page) - 1)*nb_scan_page;
				var nb_scan_fin = parseInt(num_page)*nb_scan_page;
			}
		}
		else{var nb_scan_fin = nb;var nb_scan_deb =0;}
		var retour_scan = new Array(nb_scan_fin, nb_scan_deb);
		return retour_scan;
	}

	// fonction pour creer un tableau html exportable
	function export_html(serveur ,check ,url, nb_scan_page){
		var id_num;
		var tr_num;
		var scan_info = GM_getValue('scan'+ serveur, '').split('#');
		var nb = scan_info.length;
		var export_html_2 ='';

		var nb_scan_deb_fin =connaitre_scan_afficher(serveur, nb_scan_page, url, nb);
		for(var p=nb_scan_deb_fin[1]; p<nb_scan_deb_fin[0]; p++)
		{
			id_num = 'check_'+ p +'';
			if(scan_info[p]){
				if(scan_info[p] != '' && scan_info[p] != ' ' && scan_info[p])
				{
					if(document.getElementById(id_num))
					{
						if(document.getElementById(id_num).checked == check)
						{
							tr_num = 'tr_'+ p +'';
							export_html_2 = export_html_2 +'\n' + document.getElementById(tr_num).innerHTML.split('<td> <a href="http')[0] +'</tr>';
						}
					}else{nb_scan_deb_fin[0]++;}
				}
				else{nb_scan_deb_fin[0]++;}
			}
		}
		export_html_2 = '<table style="text-align:center;border: 1px solid black;font-size:10px;"><caption>Raide Facile. </caption><thead id="haut_table2"><tr>'+ document.getElementById("haut_table2").innerHTML
						+ '</thead><tbody id="export_html_textarea" >'+ export_html_2 + '</tbody></table>';
		document.getElementById("text_html").innerHTML = export_html_2;
	}

	//function d'export des scans.
	function export_scan(serveur , check){
		var id_num;
		var scan_info = GM_getValue('scan'+ serveur, '').split('#');
		var nb = scan_info.length;
		var export_f ='';

		var nb_scan_deb_fin = connaitre_scan_afficher(serveur, nb_scan_page, info.url, nb);

		for(var p=nb_scan_deb_fin[1]; p<nb_scan_deb_fin[0]; p++)
		{
			id_num = 'check_'+ p +'';
			if(scan_info[p]){
				if(scan_info[p] != '' && scan_info[p] != ' ' && scan_info[p])
				{
					if(document.getElementById(id_num))
					{
						if(document.getElementById(id_num).checked == check)
						{
							export_f = export_f +'#' +scan_info[p];
						}
					}else{nb_scan_deb_fin[0]++;}
				}
				else{nb_scan_deb_fin[0]++;}
			}
		}
		document.getElementById("area_export").innerHTML = export_f;
	}

	//function d'import des scans.
	function import_scan(serveur , variable_q){
		var scan_info = GM_getValue('scan'+ serveur, '');
		var scan_add = document.getElementById("area_import").value;
		scan_add = scan_add.split('#');
		var scan_info3 ='';

		if(variable_q == 1)
		{
			for(var p=0; p<scan_add.length; p++)
			{
				if(scan_add[p].split(';').length > 2)
				{scan_info3 = scan_info3 + '#'+ scan_add[p];}
			}
		}
		else{ // variable_q = 0
			for(var p=0; p<scan_add.length; p++)
			{
				if(scan_add[p].split(';').length > 2)
				{
					if(p == 0){scan_info3 = scan_info3 + scan_add[p];}
					else{scan_info3 = scan_info3 + '#'+ scan_add[p];}
				}
			}
		}

		if(variable_q == 1){
			scan_info = scan_info + scan_info3;
		}
		else{scan_info = scan_info3;}

		scan_info = scan_info.replace( /\#{2,}/g, "#");
		GM_setValue('scan'+ serveur, scan_info);
		fadeBoxx(text.import_rep, 0, 5000);
	}

	// fonction pour savoir le nombre de pt et gt qu'il faut pour prendre le maximum de reosourcce en raidant
	function shipCount(m, k, d, cargo, pourcent){
		return Math.ceil ((Math.ceil (Math.max (m + k + d, Math.min (0.75 * (m * 2 + k + d), m * 2 + d))) * (pourcent/100)) / cargo);
	}

	// pouvoir suprimer plusieurs scan. depuis raide-facile grace au checbox
	function del_scan_checkbox(serveur , check){
		var id_num;
		var scan_info = GM_getValue('scan'+ serveur, '').split('#');
		var nb = scan_info.length;

		// on regarde de quel scan on doit commencer et combien normalement on doit regarder
			if(nb_scan_page != 0)
			{
				var num_page = info.url.split('&page_r=')[1];

				if(num_page == undefined || num_page == 1)
				{var p = 0;
				var nb_scan_fin = nb_scan_page}

				else if(num_page >= 1)
				{
				var p = (parseInt(num_page) - 1)*nb_scan_page;
				var nb_scan_fin = parseInt(num_page)*nb_scan_page;}
			}
			else{var nb_scan_fin = nb;var p =0;}

		for(p; p<nb_scan_fin; p++)
		{
			id_num = 'check_'+ p +'';
			if(scan_info[p]){
				// on verifie que le scan est bien afficher dans la colone sinon on rajoute +1 au nombre final pour verifier les scan afficher l(par rapport au nombre demander)
				if(scan_info[p] != '' && scan_info[p] != ' ' && scan_info[p].split(';')[4] && document.getElementById(id_num) != undefined)
				{
					if(document.getElementById(id_num).checked == check)
					{
						scan_info[p] = '';
					}

				}else{nb_scan_fin++;}
			}
		}
		scan_info = scan_info.join('#');
		scan_info = scan_info.replace( /\#{2,}/g, "#");
		GM_setValue('scan'+ serveur, scan_info);
		fadeBoxx(text.del_scan, 0, 3000);
	}

	//calcul la production en met/cri/deut par heure selon les coordonees , les mines et la temperature max.
	function calcule_prod(mine_m, mine_c, mine_d, coordonee, tmps_max, vitesse_uni){
		var retour = {};
		if(mine_m != '?' && mine_m != '?' && mine_m != '?' && coordonee.split(':')[2] != undefined)
		{
			var prod_m = Math.floor((30*parseInt(mine_m)*Math.pow(1.1, parseInt(mine_m))+30)*vitesse_uni);
				retour.metal = prod_m;
			var prod_c = Math.floor((20*parseInt(mine_c)*Math.pow(1.1, parseInt(mine_c))+15)*vitesse_uni);
				retour.cristal = prod_c;

				// on cherche la temperature de la planette grace au coordonÃ©e si on ne la connait pas
				if(tmps_max == '?' || tmps_max == ' ' || tmps_max == ''){
					var pos_planette = coordonee.split(':')[2].replace( /[^0-9-]/g, "");
					if(pos_planette <= 3)
						{tmps_max = 123;}
					else if(pos_planette <= 6)
						{tmps_max = 65;}
					else if(pos_planette <= 9)
						{tmps_max = 35;}
					else if(pos_planette <= 12)
						{tmps_max = 15;}
					else if(pos_planette <= 15)
						{tmps_max = -40;}
				}
			var prod_d = vitesse_uni * parseInt(Math.floor(10 * parseInt(mine_d) * (Math.pow(1.1,parseInt(mine_d)) * (1.44 - (tmps_max * 0.004) ))));
				retour.deut = prod_d;

			return retour;
		}
		else{retour.metal = '?';retour.cristal = '?';retour.deut = '?';
			return retour;}
	}

	function vitesse_vaisseau(impulsion ,hyper_h ,combus, value_select){
	/***********  vitessse minimum *********************/
			// on voit change la vitesse des vaisseaux qui change de techno selon les niveau de celle ci
			if(parseInt(impulsion) >= 5){var vitesse_pt = "10000"; var prop_pt = "imp";}
			else{var vitesse_pt = "5000";var prop_pt = "comb";}

			if(parseInt(hyper_h) >= 8){var vitesse_bb = "5000";var prop_bb = "hyp";}
			else{var vitesse_bb = "4000";var prop_bb = "imp";}

		var vaisseau_type = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.dest, vari.edlm, vari.tra);
		var vaisseau_vitess_deb = new Array(vitesse_pt, "7500", "12500", "10000", "15000", "10000", "2500", "2000", "100000000", vitesse_bb, "5000", "100", "10000");
		var vaisseau_type_prop = new Array(prop_pt, "comb", "comb", "imp", "imp", "hyp", "imp", "comb", "comb", prop_bb, "hyp", "hyp", "hyp");

		// on regarde le vaisseau selectionner et on cherche sa vitesse minimale
		if(vaisseau_type_prop[value_select] == "comb")
		{
			var vitesse_mini = Math.round(parseInt(vaisseau_vitess_deb[value_select])*(1 + (0.1 * parseInt(combus))));
		}
		else if(vaisseau_type_prop[value_select] == "imp")
		{
			var vitesse_mini = Math.round(parseInt(vaisseau_vitess_deb[value_select])*(1 + (0.2 * parseInt(impulsion))));
		}
		else if(vaisseau_type_prop[value_select] == "hyp")
		{
			var vitesse_mini = Math.round(parseInt(vaisseau_vitess_deb[value_select])* (1 + (0.3 * parseInt(hyper_h))));
		}
		return vitesse_mini;
	}

	function vaisseau_vitesse_mini(impulsion ,hyper_h ,combus, value_select, coordonee_cible , vitesse_uni){
		if(!vitesse_uni || vitesse_uni <= 0){vitesse_uni = 1;}
		var distance;
		var vitesse_mini = vitesse_vaisseau(impulsion ,hyper_h ,combus, value_select);
	/***************  Distance *********************/
		var planette_selec = document.getElementsByName('ogame-planet-coordinates')[0].content;
		planette_selec = planette_selec.split(':');
		var galaxie_j = planette_selec[0].replace( /[^0-9-]/g, "");
		var system_j = planette_selec[1].replace( /[^0-9-]/g, "");
		var planet_j = planette_selec[2].replace( /[^0-9-]/g, "");

		var coordonee_cible_split = coordonee_cible.split(':');
		var galaxie_c = coordonee_cible_split[0].replace( /[^0-9-]/g, "");
		var system_c = coordonee_cible_split[1].replace( /[^0-9-]/g, "");
		var planet_c = coordonee_cible_split[2].replace( /[^0-9-]/g, "");

		// on calcule la distance entre la cible et la planette d'attaque(de depart)
		if(galaxie_j != galaxie_c)
		{
			distance = 20000*Math.abs(parseInt(galaxie_j) - parseInt(galaxie_c));

		}
		else{
			if(system_j != system_c)
			{
				distance = 2700 + 95*Math.abs(parseInt(system_j) - parseInt(system_c));
			}
			else{
				distance = 1000 + 5*Math.abs(parseInt(system_j) - parseInt(system_c));
			}
		}

	/***************  Temps de vol  *********************/

		var temps_de_vol_sec = 10 + ((35000/100) * (Math.sqrt((distance*1000)/vitesse_mini)));
		temps_de_vol_sec = Math.round(temps_de_vol_sec/vitesse_uni);

		var minutes = Math.floor(temps_de_vol_sec/60);
		var heures = Math.floor(minutes/60);
		var jours = Math.floor(heures/24);
		var secondes = Math.floor(temps_de_vol_sec%60);
			minutes = Math.floor(minutes%60);
			heures = Math.floor(heures%24);

		var temp_vol = jours +'j '+	heures +'h '+ minutes +'min'+ secondes +'s';
		var sec_arrive = info.startTime + parseInt(temps_de_vol_sec)*1000;
		var date_arrive = new Date();
		date_arrive.setTime(parseInt(sec_arrive));
		var date_arrive_f = date_arrive.getDate() +'/'+ date_arrive.getMonth() +'/'+ date_arrive.getFullYear() +' Ã  '+ date_arrive.getHours() +'h '+ date_arrive.getMinutes() +'min'+ date_arrive.getSeconds()+'s';

		var sec_retour = info.startTime + parseInt(temps_de_vol_sec)*2000;
		var date_retour = new Date();
		date_retour.setTime(sec_retour);
		var date_retour_f = date_retour.getDate() +'/'+ date_retour.getMonth() +'/'+ date_retour.getFullYear() +' Ã  '+ date_retour.getHours() +'h '+ date_retour.getMinutes() +'min'+ date_retour.getSeconds()+'s';

		var acconyme_temps = '<acronym title=" '+ text.arriv_f +' : '+ date_arrive_f +' | '+ text.retour_f +' : '+ date_retour_f +'">'+ temp_vol + '</acronym>';

	return acconyme_temps;
	}

	function calcul_dernier_vidage(metal, cristal, deut, prod_m, prod_c, prod_d, heure_scan, mine_m){

		if(mine_m != '?' && prod_m != 0 && prod_m != '?')
		{
			//prod_par_h on change en prod par minutes.
			var prod_m_sec = parseInt(prod_m)/3600;
			var prod_c_sec = parseInt(prod_c)/3600;
			var prod_d_sec = parseInt(prod_d)/3600;

			// on cherche le nombre de seconde pour produire le metal/cristal/deut sur la planette
			var nb_sec_m = Math.round(parseInt(metal)/prod_m_sec);
			var nb_sec_c = Math.round(parseInt(cristal)/prod_c_sec);
			var nb_sec_d = Math.round(parseInt(deut)/prod_d_sec);

			// on trie
			function sortNumber(a,b){return a - b;}
			var array_nb_sec = [nb_sec_m, nb_sec_c, nb_sec_d];
			array_nb_sec.sort(sortNumber);

			// on prend le temps le plus grand
			var heure_dernier_vidage = parseInt(heure_scan) - parseInt(array_nb_sec[0])*1000;

			var datecc = new Date();
			datecc.setTime(heure_dernier_vidage);
			var date_final = datecc.getDate()+'/'+ (parseInt(datecc.getMonth()) + 1) +'/'+datecc.getFullYear()+ ' '
							+datecc.getHours()+ ':'+ datecc.getMinutes()+ ':'+datecc.getSeconds()  ;

			return date_final;
		}
		else{
			var date_final = '?';
			return date_final;
		}
	}

	//suprime les attaque comptabilisÃ© il y a plus de 24h .
	function suprimmer_attaque_24h_inutile(){
		var attaque_deja = GM_getValue('attaque_24h', '');
		var attaque_deja_split = attaque_deja.split('#');
		var attaque_heure;
		var heure_moin24h = info.startTime - 24*60*60*1000;
		for(var t=0; t<attaque_deja_split.length; t++)
		{
			attaque_heure = attaque_deja_split[t].split('/')[0];
			if(attaque_heure < heure_moin24h)// alors l'attaque etait fait il y a plus de 24h donc on s'en fou
			{
				attaque_deja_split[t] = '';
			}
		}
		attaque_deja = attaque_deja_split.join('#').replace( /\#{2,}/g, "#");
		GM_setValue('attaque_24h', attaque_deja);
	}

	function afficher_erreur(lieu, err){
		var erreur = '<center><strong>Erreur</strong></center> \n <BR/> <strong>Name: </strong>'+ err.name +'\n <BR/><strong>Description: </strong>'+ err.message + '\n <BR/> <strong> Browser : </strong>'+navigator.userAgent +
					'\n <BR/> <strong>Url: </strong>'+ document.location.href.split('&s')[0] + '\n <BR/> <strong>Line: </strong>'+ err.lineNumber +'<BR/>\n <strong>Version : </strong>'+ info.version;
		if (langue != 'fr'){
			erreur = erreur +'\n <BR/><strong> Report here: </strong>' + '<a href="http://userscripts.org/scripts/show/72438"> http://userscripts.org/scripts/show/72438 </a>';
		} else {
			erreur = erreur +'\n <BR/><strong> Merci de signalez l\'erreur ici: </strong>' + '<a href="http://board.ogame.fr/board1474-ogame-le-jeu/board641-les-cr-ations-ogamiennes/board642-logiciels-tableurs/978693-raide-facile/">http://board.ogame.fr/board1474-ogame-le-jeu/board641-les-cr-ations-ogamiennes/board642-logiciels-tableurs/978693-raide-facile/</a>';
		}
		var sp1 = document.createElement('div');
		sp1.id = "erreur";
		sp1.setAttribute('style','display:block !important;color:#214563;background-color: #FFFFFF;');
		sp1.innerHTML = erreur;
		document.getElementById('contentWrapper').insertBefore(sp1,document.getElementById(lieu));
	}

	/** Colore les lignes en fonction des missions en cours */
	function showAttaque(data) {
		var traiteFlotte = function(elem) {
			var destination = $.trim($('.destCoords a', elem).text());
			var missionType = elem.data('mission-type');
			var retour = elem.data('return-flight') ? 1 : 0;
			if (missions[destination] === undefined) {
				missions[destination] = {};
			}
			if (missions[destination][missionType] === undefined) {
				missions[destination][missionType] = [0, 0];
			}
			missions[destination][missionType][retour]++;
		};
		var missions = {};
		var html = $($.trim(data));
		// On va chercher tous les Ã©vÃ©nements (allers + retours)
		$('#eventContent .eventFleet', html[0]).each(function(i, node){
			traiteFlotte($(node));
		});
		var couleur;
		for (var destination in missions) {
			couleur = null;
			// cf l'api http://uni116.ogame.fr/api/localization.xml pour les nombres
			if (missions[destination][9]) { // DÃ©truire
				couleur = missions[destination][9][0] ? col_dest : col_dest_r;
			} else if (missions[destination][2]) { // Attaque groupÃ©e
				couleur = missions[destination][2][0] ? col_att_g : col_att_g_r;
			} else if (missions[destination][1]) { // Attaquer
				if (missions[destination][1][0] >= 2) {
					couleur = stockageOption.get('couleur attaque2');
				} else if (missions[destination][1][1] >= 2) {
					couleur = stockageOption.get('couleur attaque2 retour');
				} else {
					couleur = missions[destination][1][0] ? col_att : col_att_r;
				}
			} else if (missions[destination][6] && missions[destination][6][0]) { // Espionner, mais pas les retour
				couleur = stockageOption.get('couleur espionnage');
			}
			// On rÃ©cupÃ¨re les lignes du tableau de raid facile qui correspondent (il peut y en avoir plusieurs quand on ne supprime pas l'ancien scan)
			var lignes = $(document.getElementsByClassName(destination));
			if (couleur !== null) {
				lignes.css('color', couleur);
			}
			var titre = 'Mission actuellement en cours<div class="splitLine"></div>';
			for (var typeMission in missions[destination]) {
				titre += '<p>' + localization.missions[typeMission] + ' : ' + missions[destination][typeMission][0] + ' +' + (missions[destination][typeMission][1]-missions[destination][typeMission][0]) + ' retour' + '</p>';
			}
			$('.nombreAttaque', lignes).attr('title', titre);
		}
		intercom.send('tooltip', {selector:'#corps_tableau2 .nombreAttaque[title]'});
	}

}
/************************* PAGE DE COMBAT REPORT *************************/{
	//recupere les informations des rapports de combat pour que le compteur d'attaque
	function get_info_combat(){
		var messages = document.getElementById('messagebox').getElementsByClassName('note')[0].innerHTML;
		if(document.getElementById('battlereport'))
		{
			//recupere la date du combat.
			var date_complet_combat = document.getElementsByClassName('infohead')[0].getElementsByTagName('td')[3].innerHTML;//exemple : 02-09 10:39:35
				var jours_mois_anne_combat = date_complet_combat.split('.');
					var mois_combat = parseInt(supr0(jours_mois_anne_combat[1])) - 1 ; //TODO parseInt(jours_mois_anne_combat[1], 10) - 1;
					var jours_combat = parseInt(supr0(jours_mois_anne_combat[0]));
					var anne_combat = parseInt(jours_mois_anne_combat[2].split(' ')[0]);

				var sec_min_heure_combat = date_complet_combat.split(' ')[1].split(':');
					var heures_combat = sec_min_heure_combat[0];
					var min_combat = sec_min_heure_combat[1];
					var sec_combat = sec_min_heure_combat[2];

				var date_combat_ms = new Date(date.getFullYear(), mois_combat, jours_combat, heures_combat, min_combat, sec_combat);
				date_combat_ms = date_combat_ms.getTime();

			if(date_combat_ms  > (info.startTime - 24*60*60*1000))//on verifie que cela fait moin de 24h que l'attaque a eu lieu
			{
				var attaque_deja = GM_getValue('attaque_24h', '');
				if(attaque_deja.indexOf(date_combat_ms) == -1)// si le combat n'est pas dÃ©ja enregistrÃ©
				{
					// recuperer les coordonÃ©es du combats.
					var info_head = document.getElementsByClassName('infohead')[0].getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerHTML;
					var coordonee_combat = info_head.split('[')[1].split(']')[0];

					// on prend le pseudo des joueurs pour connaitre de quelle cotÃ© est le joueur
					if (info.pseudo.indexOf(vari.de) != -1){var pseudo_de = info.pseudo.split(vari.de)[0];}
					else { var pseudo_de = info.pseudo;}

					var bloc_combatants = document.getElementById("combatants").children;
					var bloc_attaquant = bloc_combatants[0].children;
					var attaquant = [];
					for(var k = 0; k < bloc_attaquant.length; k++) {
						attaquant[k] = bloc_attaquant[k].firstElementChild.textContent;
					}

					var bloc_defenseur = bloc_combatants[2].children;
					var defenseur = [];
					for(var k = 0; k < bloc_defenseur.length; k++) {
						defenseur[k] = bloc_defenseur[k].firstElementChild.textContent;
					}

					if($.inArray(pseudo_de, attaquant) !== -1) {
						// le joueur est un des attaquants
						var attaque_news =  date_combat_ms + '/'+ coordonee_combat;
						attaque_deja = attaque_deja + '#'+ attaque_news;
						attaque_deja = attaque_deja.replace( /\#{2,}/g, "#");
						GM_setValue('attaque_24h', attaque_deja);
					}
				}
			}
		}
	}
}
/************************* PAGE DE MESSAGE *************************/{
	// function suprimer un scan depuis le pop-up
	function supr_scan1(serveur){
		var dateCombat = $('div.showmessage[data-message-id] .infohead tr:eq(3) td').text().match(/(\d+)\.(\d+)\.(\d+) (\d+):(\d+):(\d+)/);
		if (dateCombat.length != 7) {
			console.error('[raid facile] Erreur nÂ°15045');
		}
		var date_scan = (new Date(dateCombat[3], parseInt(dateCombat[2])-1, dateCombat[1], dateCombat[4], dateCombat[5], dateCombat[6])).getTime();

		var scan_info = GM_getValue('scan'+ serveur, '').split('#');
		var listeDateRC = '';
		var suppr = 0;
		for(var i=0; i<scan_info.length; i++) {
			listeDateRC = scan_info[i].split(';')[0];
			if (listeDateRC == date_scan) {
				scan_info[i] = '';
				++suppr;
			}
		}
		scan_info = scan_info.join('#');
		scan_info = scan_info.replace( /\#{2,}/g, "#");

		GM_setValue('scan'+ serveur, scan_info);
		fadeBoxx(suppr+' '+text.rep_mess_supri, 0, 3000);
	}

	function save_scan(serveur, id_rc, popup, afficherResultat){
		if (!id_rc) return;

		var date_combat_total = "";

		if (popup) {// on se place dans le scan en pop up
			var document_spatio = $('div.showmessage[data-message-id="'+id_rc+'"]').get(0);
			date_combat_total = document_spatio.getElementsByClassName('infohead')[0].innerHTML;

		} else { // on se place dans la partie du scan(partie pour les scans prÃ©-ouverts)
			var nom_spatio = 'spioDetails_'+ id_rc;
			var document_spatio = document.getElementById(nom_spatio);

			var document_entete = document.getElementById(id_rc + 'TR');
			if (!document_entete) // Pour la version 5.0.0
				document_entete = document.getElementById('TR' + id_rc);
			date_combat_total = document_entete.getElementsByClassName('date')[0].innerHTML;
		}

// heure du scans - Modification Deberron
		var date_combat = date_combat_total.match(/(\d+)\.(\d+)\.(\d+) (\d+):(\d+):(\d+)/i);
		var jours = date_combat[1];
		var mois = date_combat[2]-1;
		var annee = date_combat[3];
		var heure = date_combat[4];
		var min = date_combat[5];
		var sec = date_combat[6];
		var date_scan = (new Date(annee, mois, jours, heure, min, sec)).getTime();

	// nom de planette et coordonÃ© et nom joueurs

		var planette_et_joueur_scan = document_spatio.getElementsByClassName('material spy')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML;

		spans = document_spatio.getElementsByClassName('material spy')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0].getElementsByTagName('span');
		nom_joueur = spans[spans.length-1].innerHTML;
			// si antigame est installÃ© et interfere dans le nom du joueurs
		if(nom_joueur.indexOf('war-riders.de') != -1){nom_joueur = document_spatio.getElementsByClassName('material spy')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0].getElementById("player_name").innerHTML;}

		var coordonnee = document_spatio.getElementsByClassName('material spy')[0].getElementsByClassName('area')[0].getElementsByTagName('a')[0].innerHTML;
		var nom_plannette = '?';
		if(planette_et_joueur_scan.indexOf('<span>')>= 0)
		{
			nom_plannette = planette_et_joueur_scan.split(' <span>')[0];
			nom_plannette = nom_plannette.split(vari.sur)[1];
		}
		else{
			nom_plannette = planette_et_joueur_scan.split(' <a')[0];
			// normalement il y a une balise <figure> entre le "sur" et le nom de la planÃ¨te
			// nom_plannette = nom_plannette.split(vari.sur)[1];
			nom_plannette = nom_plannette.split('</figure>')[1];
		}
				//si le nom de planete a un # on le remplace pour pas qu'il interfere dans le split plus tard
		if(nom_plannette.indexOf('#')>=0){
			nom_plannette = nom_plannette.replace( /\#/g, "1diez1");
		}

//ajout Deberron - type de joueur
		var typeJoueur = "";
		var pourcent = 50;
		if(planette_et_joueur_scan.indexOf('status_abbr_active')>= 0)
			typeJoueur = "";
		else if(planette_et_joueur_scan.indexOf('status_abbr_honorableTarget')>= 0) {
			typeJoueur = "ph";
			pourcent = 75;
		}
		else if(planette_et_joueur_scan.indexOf('status_abbr_outlaw')>= 0)
			typeJoueur = "o";
		else if(planette_et_joueur_scan.indexOf('status_abbr_inactive')>= 0)
			typeJoueur = "i";
		else if(planette_et_joueur_scan.indexOf('status_abbr_longinactive')>= 0)
			typeJoueur = "I";
		else if(planette_et_joueur_scan.indexOf('status_abbr_strong')>= 0)
			typeJoueur = "f";
		else if(planette_et_joueur_scan.indexOf('status_abbr_vacation')>= 0)
			typeJoueur = "v";
		// else if(planette_et_joueur_scan.indexOf('status_abbr_ally_own')>= 0)
		// else if(planette_et_joueur_scan.indexOf('status_abbr_ally_war')>= 0)
//ajout Deberron - type de joueur
		var typeHonor = "";
		if(planette_et_joueur_scan.indexOf('rank_bandit1')>= 0) {
			typeHonor = "b1";
			pourcent = 100;
		}
		else if(planette_et_joueur_scan.indexOf('rank_bandit2')>= 0) {
			typeHonor = "b2";
			pourcent = 100;
		}
		else if(planette_et_joueur_scan.indexOf('rank_bandit3')>= 0) {
			typeHonor = "b3";
			pourcent = 100;
		}
		else if(planette_et_joueur_scan.indexOf('rank_starlord1')>= 0)
			typeHonor = "s1";
		else if(planette_et_joueur_scan.indexOf('rank_starlord2')>= 0)
			typeHonor = "s2";
		else if(planette_et_joueur_scan.indexOf('rank_starlord3')>= 0)
			typeHonor = "s3";

	// on recupere l'id du rc
		if( info.url.indexOf('index.php?page=messages')>=0)//si on est dans les scan preouvert
		{
			var idRC = id_rc;
		}
		else{// si on est dans la page pop up
			var idRC = info.url.split('&msg_id=')[1];
			if(info.url.indexOf('&mids')==-1)
			{
				idRC = idRC.split('&cat')[0];
			}
			else {idRC = idRC.split('&mids')[0];}
		}

//modif deberron // on recupere avec le lien pour attaquer si c'est un lune ou une planette
		var type_planette=document_spatio.getElementsByClassName('defenseattack spy')[0].getElementsByClassName('attack')[0].innerHTML.match(/type=(\d+)/i);
			type_planette = type_planette ? type_planette[1] : 1;

		// on verifie si le scan est nouveau
		if (GM_getValue('scan'+ serveur, '').indexOf(idRC)==-1)
			var newscan = '0';
		else
			var newscan = 'nan';

		// on verifie si le scan  peut etre enregistrÃ© par rapport a sa date d'expiration(parametre d'option)  et si il est nouveau
		if((info.startTime - nb_ms_garde_scan ) < parseInt(date_scan) && newscan == '0'){
			// on recupere les ressources de la planettes
			var ressource_m_scan = document_spatio.getElementsByClassName('material spy')[0].getElementsByClassName('fragment spy2')[0].getElementsByTagName('td')[1].innerHTML.replace( /[^0-9-]/g, "");
			var ressource_c_scan = document_spatio.getElementsByClassName('material spy')[0].getElementsByClassName('fragment spy2')[0].getElementsByTagName('td')[3].innerHTML.replace( /[^0-9-]/g, "");
			var ressource_d_scan = document_spatio.getElementsByClassName('material spy')[0].getElementsByClassName('fragment spy2')[0].getElementsByTagName('td')[5].innerHTML.replace( /[^0-9-]/g, "");

			// on cherche si il y a eu de l'activitÃ© et combien de temps
			var activite_scan = document_spatio.getElementsByClassName('aktiv spy')[0].innerHTML;
			activite_scan = activite_scan.split('</div></div></span>')[1].replace( /[^0-9-]/g, "");
			if( activite_scan == ''){activite_scan = 'rien';}

			// on creer des array par rapport a ce que l'on veut recupere
			var vaisseau = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.sat, vari.dest, vari.edlm, vari.tra);
			var defense = new Array(vari.lm, vari.lle, vari.llo, vari.gauss, vari.ion, vari.pla, vari.pb, vari.gb, vari.mic, vari.mip);
			var recherche = new Array(vari.tech_arm, vari.tech_bouc, vari.tech_pro );
			var mine = new Array(vari.mine_m, vari.mine_c, vari.mine_d );

			// array de perte d'unitÃ© par rapport au vaisseau/defense
			var vaisseau_perte = new Array("4000", "12000", "4000", "10000", "27000", "60000", "30000", "16000", "1000" ,"75000", "2000", "110000", "9000000", "70000");
			var vaisseau_perte_m = new Array("2000", "6000", "3000", "6000", "20000", "45000", "10000", "10000", "0" ,"50000", "0", "60000", "5000000", "30000");
			var vaisseau_perte_c = new Array("2000", "6000", "1000", "4000", "7000",  "15000", "20000", "6000",  "1000" ,"25000", "2000", "50000", "4000000", "40000");

			var def_perte = new Array("2000", "2000", "8000", "35000", "8000", "100000", "20000", "100000", "0" ,"0");
			var def_perte_m = new Array("2000", "1500", "6000", "20000", "2000", "50000", "10000", "50000", "0" ,"0");
			var def_perte_c = new Array("0", "500", "2000", "15000",  "6000", "50000", "10000", "50000", "0" ,"0");

			//valeur de base d'attaque pour vaissea/dÃ©fense
			var valeur_attaque_vaisseau = new Array( "5", "5", "50", "150", "400","1000", "50", "1", "1", "1000", "1", "2000", "200000", "700");
			var valeur_attaque_defense = new Array( "80", "100", "250", "1100", "150", "3000", "1","1","0","0");

			//on initialise tout ce qu'on a besoin.
			var cdr_possible_def = 0;
			var cdr_possible_def_m = 0;
			var cdr_possible_def_c = 0;

			var cdr_possible = 0;
			var cdr_possible_m = 0;
			var cdr_possible_c = 0;

			var valeur_attaque_def = 0;
			var valeur_attaque_flotte = 0;

			var nb_vaisseau_s = 0;
			var nb_def_s = 0;
			var vaisseau_scan = new Array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
			var defense_scan = new Array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
			var recherche_scan = new Array("0", "0", "0");
			var mine_scan = new Array("0", "0", "0");
			var nb_vaisseau_type = ' ';
			var nb_def_type = ' ';
			var nb_recherche = '';
			var nb_mine = '';

		/******* RECHERCHE *******/ // j'ai la mit la recherche avant alors que c'est apres a cause du besoin de recherche pour calculer la valeur de flotte/def
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[3]){
				var flotte_inter3 = document_spatio.getElementsByClassName('fleetdefbuildings spy')[3].innerHTML;
			}else{flotte_inter3 ='';}

			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[3] && flotte_inter3.indexOf('area plunder',0) == -1  ){
				// on compte le nombre de type de recherche affichÃ©.
				var nb_type_recherche = document_spatio.getElementsByClassName('fleetdefbuildings spy')[3].getElementsByClassName('key').length;
				for(var j=0; j<nb_type_recherche ; j++)
				{
					var type_recherche = document_spatio.getElementsByClassName('fleetdefbuildings spy')[3].getElementsByClassName('key')[j].innerHTML;//23.03.2010 22:27:56
					for(var k=0; k<recherche.length ; k++)
					{
						//on recupere le type de recherche et apres on cherche c'est lequels, et on remplit les infos dans la case qui lui correspond dans les array
						if(type_recherche == recherche[k])
						{
							nb_recherche = document_spatio.getElementsByClassName('fleetdefbuildings spy')[3].getElementsByClassName('value')[j].innerHTML;
							recherche_scan[k] = parseInt(nb_recherche);
						}
					}

				}
			}//sinon elle existe pas alors on le voit pas donc ?
			else{
				nb_recherche = '?';
				recherche_scan = new Array("?", "?", "?");}

			if(recherche_scan[0] == "?"){var recherche_pour_valeur = new Array(0, 0, 0);}
			else{var recherche_pour_valeur = recherche_scan;}

		/******* VAISSEAU + CDR *******/// on recupere les vaisseaux et le cdr creables.
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[0]){
				var flotte_inter = document_spatio.getElementsByClassName('fleetdefbuildings spy')[0].innerHTML;
			}else{flotte_inter ='';}

			// on verifie que l'on voit bien la flotte
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[0] && flotte_inter.indexOf('area plunder' ,0) == -1 ){

					// on compte le nombre de type de vaisseau affichÃ©.
					var nb_type_vaisseau = document_spatio.getElementsByClassName('fleetdefbuildings spy')[0].getElementsByClassName('key').length;
					for(var j=0; j<nb_type_vaisseau ; j++)
					{
						//on recupere le type du vaisseau et apres on cherche c'est lequels, et on remplit les infos dans la case qui lui correspond dans les array
						var type_vaisseau = document_spatio.getElementsByClassName('fleetdefbuildings spy')[0].getElementsByClassName('key')[j].innerHTML;
						for(var k=0; k<vaisseau.length ; k++)
						{
							if(type_vaisseau == vaisseau[k])
							{
								nb_vaisseau_type = (document_spatio.getElementsByClassName('fleetdefbuildings spy')[0].getElementsByClassName('value')[j].innerHTML).replace( /[^0-9-]/g, "");
								valeur_attaque_flotte = valeur_attaque_flotte + parseInt(nb_vaisseau_type)*parseInt(valeur_attaque_vaisseau[k])*(1 + 0.1*parseInt(recherche_pour_valeur[0]));

								cdr_possible = parseInt(cdr_possible) + parseInt(vaisseau_perte[k])*parseInt(nb_vaisseau_type);
								cdr_possible_m = parseInt(cdr_possible_m) + parseInt(vaisseau_perte_m[k])*parseInt(nb_vaisseau_type);
								cdr_possible_c = parseInt(cdr_possible_c) + parseInt(vaisseau_perte_c[k])*parseInt(nb_vaisseau_type);

								vaisseau_scan[k] = parseInt(vaisseau_scan[k]) + parseInt(nb_vaisseau_type);
								nb_vaisseau_s = parseInt(nb_vaisseau_s) + parseInt(nb_vaisseau_type);
							}
						}

					}
			}
			else {cdr_possible = '?';
				nb_vaisseau_type = '?';
				valeur_attaque_flotte = '?';
				vaisseau_scan = new Array("?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?");
				nb_vaisseau_s = -1;
			}
			if(cdr_possible == '' || cdr_possible == ' '){cdr_possible = 0;}

		/******* DEFENSE *******/
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[1]){
				var flotte_inter1 = document_spatio.getElementsByClassName('fleetdefbuildings spy')[1].innerHTML;
			}else{flotte_inter1 ='';}

			// on verifie que l'on voit bien la def et on verifie que ce que je prenne c'est pas le tableau d'antigame
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[1] && flotte_inter1.indexOf('area plunder' ,0) == -1 ){
				// on compte le nombre de type de vaisseau affichÃ©.
				var nb_type_def = document_spatio.getElementsByClassName('fleetdefbuildings spy')[1].getElementsByClassName('key').length;
				for(var j=0; j<nb_type_def ; j++){
					//on recupere le type de la defense et apres on cherche c'est lequels, et on remplit les infos dans la case qui lui correspond dans les array
					var type_def = document_spatio.getElementsByClassName('fleetdefbuildings spy')[1].getElementsByClassName('key')[j].innerHTML;//23.03.2010 22:27:56
					for(var k=0; k<defense.length ; k++){
						if(type_def == defense[k])
						{
							nb_def_type = (document_spatio.getElementsByClassName('fleetdefbuildings spy')[1].getElementsByClassName('value')[j].innerHTML).replace( /[^0-9-]/g, "");
							valeur_attaque_def = valeur_attaque_def + parseInt(nb_def_type)*parseInt(valeur_attaque_defense[k])*(1 + 0.1*parseInt(recherche_pour_valeur[0]));// +t pour faire fonctionner la fonction replace

							defense_scan[k] = parseInt(defense_scan[k]) + parseInt(nb_def_type);
							nb_def_s = parseInt(nb_def_s) + parseInt(nb_def_type);

							cdr_possible_def = parseInt(cdr_possible_def) + parseInt(def_perte[k])*parseInt(nb_def_type);
							cdr_possible_def_m = parseInt(cdr_possible_def_m) + parseInt(def_perte_m[k])*parseInt(nb_def_type);
							cdr_possible_def_c = parseInt(cdr_possible_def_c) + parseInt(def_perte_c[k])*parseInt(nb_def_type);

						}
					}

				}
				var cdr_def = cdr_possible_def +'/'+ cdr_possible_def_m +'/'+ cdr_possible_def_c;
			}
			else {
				nb_def_type = '?';
				valeur_attaque_def = '?';
				defense_scan = new Array("?", "?", "?", "?", "?", "?", "?", "?", "?", "?")
				nb_def_s = -1;
				var cdr_def = '?/?/?';
			}

		/******* Batiment (MINE) *******/
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[2]){
				var flotte_inter2 = document_spatio.getElementsByClassName('fleetdefbuildings spy')[2].innerHTML;
			}else{flotte_inter2 ='';}

			// on verifie que l'on voit le batiment et que ce n'est pas antigame
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[2] && flotte_inter2.indexOf('area plunder' ,0) == -1 ){
				// on compte le nombre de type de batiment affichÃ©.
				var nb_type_mine = document_spatio.getElementsByClassName('fleetdefbuildings spy')[2].getElementsByClassName('key').length;
				for(var jj=0; jj<nb_type_mine ; jj++)
				{
					//on recupere le type de la batiment et apres on cherche c'est lequels, et on remplit les infos dans la case qui lui correspond dans les array
					var type_mine = document_spatio.getElementsByClassName('fleetdefbuildings spy')[2].getElementsByClassName('key')[jj].innerHTML;//23.03.2010 22:27:56
					for(var kk=0; kk<mine.length ; kk++)
					{
						if(type_mine == mine[kk])
						{
							nb_mine = document_spatio.getElementsByClassName('fleetdefbuildings spy')[2].getElementsByClassName('value')[jj].innerHTML;
							mine_scan[kk] = parseInt(nb_mine);
						}
					}

				}
			}//si on elle existe pas alors on le voit pas donc ?
			else{ nb_mine = '?';
			mine_scan = new Array("?", "?", "?");}


		/* ******* INFO FINAL ********* */
			// on verifie que l'on peut enregistrÃ© selon toute les options
			var ressource_pillable = parseInt(ressource_m_scan) + parseInt(ressource_c_scan) + parseInt(ressource_d_scan);
			var cdr_possible2 = Math.round( ( cdr_possible!='?' ? cdr_possible : 0 ) * pourcent_cdr ) + Math.round( ( cdr_possible_def!='?' ? cdr_possible_def : 0 ) * pourcent_cdr_def );
			// les trois premiere ligne c'est selon le type d'enregistrement par rapport au ressource /cdr ou les deux. / la derniere ligne pour savoir par rapport a la def et que on voit bien les coordonÃ©es

			if(((type_prend_scan == 0 && (cdr_possible2 >= parseInt(valeur_cdr_mini) || (ressource_pillable*pourcent/100) >= parseInt(nb_scan_accpte) ))
				|| (type_prend_scan == 1 && cdr_possible2 >= parseInt(valeur_cdr_mini) && (ressource_pillable*pourcent/100) >= parseInt(nb_scan_accpte) )
				|| (type_prend_scan == 2 && (cdr_possible2 + (ressource_pillable*pourcent/100)) >= valeur_tot_mini))
				&& coordonnee != '' && (nb_max_def == 0 || nb_max_def > nb_def_s))
			{
				var info_final = date_scan + ';' + coordonnee + ';' + nom_joueur +  ';' + nom_plannette //0-1-2-3
								+ ';' + ressource_m_scan + ';' + ressource_c_scan + ';' + ressource_d_scan + ';' //4-5-6
								+ activite_scan + ';' + cdr_possible + ';' + vaisseau_scan.join('/') //7-8-9
								+ ';' + defense_scan.join('/') + ';' + idRC + ';' + ressource_pillable //10-11-12
								+ ';' + recherche_scan.join('/') + ';' + type_planette /*13/14*/
								+ ';' + cdr_possible_m + ';' + cdr_possible_c  + ';' + nb_vaisseau_s  + ';' + nb_def_s //15-16-17-18
								+ ';' + mine_scan.join('/') + ';x'+ ';'+ cdr_def //19-20-21
								+ ';' + valeur_attaque_flotte +';'+ valeur_attaque_def //22-23
								+ ';' + typeJoueur + ';' + typeHonor; //24-25

				var scan_info = GM_getValue('scan'+ serveur, '').split('#');

				//alert(info_final);
				// on suprime les scan trop vieux
				if(nb_ms_garde_scan != 0)
				{
					for(var i=0; i<scan_info.length ; i++)
					{
						var scan_info25 = scan_info[i].split(';');
						if(info.startTime - nb_ms_garde_scan > parseInt(scan_info25[0]))
						{
							scan_info[i]='';
						}
					}
				}

				// puis on sauvegarde si on remplace les scan de la meme planette et qu'il existe un scan avec les meme coordonÃ©es
				if(GM_getValue('scan'+ serveur, '').indexOf(coordonnee) > -1 && scan_remplace == 1)
				{
					var scan_remplacer_q = 0;// on boucle par rapport au nombre de scan
					for(var p=0; p<scan_info.length ; p++)
					{
						var scan_test = scan_info[p].split(';');
						// on verifie que le scan existe et on cherche si c'est les meme coordonÃ©es, si oui alors on regarde si il est plus rÃ©cent, et si c'est bien le meme type (lune/planette)
						if(scan_test[9]){
							if(scan_info[p].indexOf(coordonnee)!= -1 && scan_test[14] == type_planette) {
								scan_remplacer_q = 1;
								if(parseInt(scan_test[0]) < parseInt(date_scan)) {
									// on vient d'ajouter un scan plus rÃ©cent pour le mÃªme endroit
									scan_info[p] = info_final;
								}
							}
						}
					}
					// on regarde si il a remplacer ou pas le scan par un ancien, si non alors on l'ajoute
					if(scan_remplacer_q == 0){
						var scan_info2 = scan_info.join('#')+ '#'+ info_final;
					} else {
						var scan_info2 = scan_info.join('#');
					}

					scan_info2 = scan_info2.replace( /\#{2,}/g, "#");

					if(scan_info2 == '' || scan_info2 == '#')
					{
						GM_setValue('scan'+ serveur, '');
					}
					else{
						GM_setValue('scan'+ serveur, scan_info2);
					}

				}// si on remplace pas alors on ajoute sans reflechir et on suprime les scan ''
				else{
					var scan_info2 = scan_info.join('#');
						scan_info2 = scan_info2.replace( /\#{2,}/g, "#");

					if(scan_info2 == '' || scan_info2 == '#')
					{
						GM_setValue('scan'+ serveur, info_final);
					}
					else{
						GM_setValue('scan'+ serveur, scan_info2 +'#' + info_final);
					}
				}
				if (afficherResultat) {
					fadeBoxx('1 '+ text.rep_mess_add, 0, 1000);
				}
				return true;
			}
		}
		if (afficherResultat) {
			fadeBoxx('0 '+ text.rep_mess_add, 0, 500);
		}
		return false;
	}

	function bouton_supr_scan_depuis_mess(){
		if(document.getElementById('Bouton_Rf') == null && document.getElementById('mailz'))
		{
			var style_css = ' <style type="text/css">'
							+'.Buttons_scan_mess input {'
							+'	-moz-background-inline-policy:continuous;'
							+'	border:0 none; cursor:pointer;'
							+'	height:32px; text-align:center; width:35px;'
							+'}</style>';

			// document.getElementById.getElementsByClassName('infohead')[0].getElementsByTagName('td')[0].innerHTML;
			var lien_dossier_icone = 'http://snaquekiller.free.fr/ogame/messraide/raidefacile%20mess/';
			var bouton_supr_mess_et_scan = '<BR /><div class="Buttons_scan_mess"> <input type="button" title="'+ text.spr_scrptscan_a +'" style=\'background:url("'+ lien_dossier_icone +'supscan2aff.png") no-repeat scroll transparent;\' id="scan_mess_a" mod="9"/>'
										+ '<input type="button" title="'+ text.spr_scrptscan_ns +'" style=\'background:url("'+ lien_dossier_icone +'supscan2nsel.png") no-repeat scroll transparent;\' id="scan_mess_ns" mod="10" />'
										+ '<input type="button" title="'+ text.spr_scrptscan_s +'" style=\'background:url("'+ lien_dossier_icone +'supscan2sel.png") no-repeat scroll transparent;\'  id="scan_mess_s" mod="7"/>';

			var bouton_supr_scan = ' '+ ' '+'<input type="button" title="'+ text.spr_scan_a +'" style=\'background:url("'+ lien_dossier_icone +'supscanaff.png") no-repeat scroll transparent;\' id="scan_a" />'
										+ '<input type="button" title="'+ text.spr_scan_ns +'" style=\'background:url("'+ lien_dossier_icone +'supscannsel.png") no-repeat scroll transparent;\'  id="scan_ns" />'
										+ '<input type="button" title="'+ text.spr_scan_s +'" style=\'background:url("'+ lien_dossier_icone +'supscansel.png") no-repeat scroll transparent;\'  id="scan_s" />';

			var bouton_add_scan = ' '+ ' '+'<input type="button" title="'+ text.add_scan_a +'" style=\'background:url("'+ lien_dossier_icone +'ajscanaff2.png") no-repeat scroll transparent;\' id="scan_add_a" />'
										+ '<input type="button" title="'+ text.add_scan_ns +'" style=\'background:url("'+ lien_dossier_icone +'ajscannsel2.png") no-repeat scroll transparent;\'  id="scan_add_ns" />'
										+ '<input type="button" title="'+ text.add_scan_s +'" style=\'background:url("'+ lien_dossier_icone +'ajscansel2.png") no-repeat scroll transparent;\'  id="scan_add_s" /></div>';


			var texte_a_affichers = style_css + bouton_supr_mess_et_scan + bouton_supr_scan + bouton_add_scan;

			var sp1 = document.createElement("span"); // on cree une balise span
				sp1.setAttribute("id", "Bouton_Rf"); // on y ajoute un id
				sp1.innerHTML = texte_a_affichers;
			var element_avant_lenotre = document.getElementById('mailz');
			insertAfter(sp1, element_avant_lenotre);


			// merci a sylvercloud pour les icones
			document.getElementById("scan_mess_a").addEventListener("click", function(event){supr_scan_dep_mess(1, true);if(info.firefox){unsafeWindow.mod = 9;}else{window.mod = 9;};document.getElementsByClassName('buttonOK deleteIt')[0].click();}, true);
			document.getElementById("scan_mess_s").addEventListener("click", function(event){supr_scan_dep_mess(2, true);if(info.firefox){unsafeWindow.mod = 7;}else{window.mod = 7;};document.getElementsByClassName('buttonOK deleteIt')[0].click();}, true);
			document.getElementById("scan_mess_ns").addEventListener("click", function(event){supr_scan_dep_mess(2, false);if(info.firefox){unsafeWindow.mod = 10;}else{window.mod = 10;};document.getElementsByClassName('buttonOK deleteIt')[0].click();}, true);

			document.getElementById("scan_a").addEventListener("click", function(event){supr_scan_dep_mess(1, true);}, true);
			document.getElementById("scan_s").addEventListener("click", function(event){supr_scan_dep_mess(2, true);}, true);
			document.getElementById("scan_ns").addEventListener("click", function(event){supr_scan_dep_mess(2, false);}, true);

			document.getElementById("scan_add_a").addEventListener("click", function(event){add_scan_dep_mess(1, true);}, true);
			document.getElementById("scan_add_s").addEventListener("click", function(event){add_scan_dep_mess(2, true);}, true);
			document.getElementById("scan_add_ns").addEventListener("click", function(event){add_scan_dep_mess(2, false);}, true);
		}
	}

	function add_scan_dep_mess(type_clique, check_q){
	//type_clique 1=affiche, 2 = select juste supr scan script , 3/4 idem mais script +scan
		var nb_scan_total_a_enr = document.getElementsByClassName('material spy').length;

		var tout_mess = document.getElementById('messageContent').innerHTML;
		tout_mess = tout_mess.split('switchView(\'spioDetails_');
		var nb_scan_plus_un = tout_mess.length;
		var nb_scan_enregistre = 0;

		if(type_clique ==2)
		{
			for(var nb_scan_s = 1 ; nb_scan_s < nb_scan_plus_un ; nb_scan_s++){

				var id_rc = tout_mess[nb_scan_s].split('\');')[0];
				if(document.getElementById(id_rc).checked == check_q)
				{
					if(save_scan(info.serveur, id_rc, false))
						nb_scan_enregistre = nb_scan_enregistre + 1;
				}

			}
		}
		else if(type_clique == 1){
			for(var nb_scan_s = 1 ; nb_scan_s < nb_scan_plus_un ; nb_scan_s++){
				var id_rc = tout_mess[nb_scan_s].split('\');')[0];
				if(save_scan(info.serveur, id_rc, false))
					nb_scan_enregistre = nb_scan_enregistre + 1;
			}
		}
		else{
			fadeBoxx('Error', 0, 3000);
			nb_scan_enregistre = 0;
		}
		fadeBoxx((nb_scan_enregistre) +' '+ text.rep_mess_add, 0, 3000);
	}

	function supr_scan_dep_mess(type_clique, check_q){
	//type_clique 1=affiche, 2 = select juste supr scan script , 3/4 idem mais script +scan
		var info_scan = GM_getValue('scan'+ info.serveur, '');
		var info_scan_i = info_scan.split('#');
		var nb_scan_total_a_enr = document.getElementsByClassName('material spy').length;

		var tout_mess = document.getElementById('messageContent').innerHTML;
		tout_mess = tout_mess.split('switchView(\'spioDetails_');
		var nb_scan_plus_un = tout_mess.length;
		var id_rc;

		if(type_clique == 2) {
			for(var nb_scan_s = 1 ; nb_scan_s < nb_scan_plus_un ; nb_scan_s++){
				id_rc = tout_mess[nb_scan_s].split('\');')[0];
				if(info_scan.indexOf(id_rc) >=0 && document.getElementById(id_rc).checked == check_q)
				{
					for(var p=0; p<info_scan_i.length; p++)
					{
						if(info_scan_i[p].indexOf(id_rc, 0) >=0){info_scan_i[p] = '';}
					}
				}
			}
		}
		else if(type_clique == 1) {
			for(var nb_scan_s = 1 ; nb_scan_s < nb_scan_plus_un ; nb_scan_s++){
				id_rc = tout_mess[nb_scan_s].split('\');')[0];
				if(info_scan.indexOf(id_rc, 0) >=0)
				{
					for(var p=0; p<info_scan_i.length; p++)
					{
						if(info_scan_i[p].indexOf(id_rc, 0) >=0){info_scan_i[p] = '';}
					}
				}
			}
		}
		info_scan_i = info_scan_i.join('#');
		info_scan_i = info_scan_i.replace( /\#{2,}/g, "#");
		GM_setValue('scan'+ info.serveur, info_scan_i);
		fadeBoxx(text.rep_mess_supri, 0, 3000);
	}

	function scan_pop_up() {
		var pop_up = $('div.showmessage[data-message-id]');
		if (!pop_up.length) {
			// il n'y a pas de popup
			return;
		}
		if (info.chrome) {
			$('.contentPageNavi a', pop_up).click(function(){
				setTimeout(waitAjaxSuccessPopup, 333);
			});
		}
		var msg_id = pop_up.attr('data-message-id');
		if ($('.textWrapper .material.spy', pop_up).length) {
			if(scan_preenrgistre == 1) {
				save_scan(info.serveur, msg_id, true, true);
			}
			var tout_supr = '';
			// tout_supr += '<li class="delete" ><a class="tips2 action" id="2" href=""><span class="icon icon_trash float_left" id="RF_icon_delMEssScan"></span><span class="text"  id="RF_delMEssScan">'+ text.del_scan_script +'</span></a></li>';
			tout_supr += '<li class="delete" ><a class="tips2 action" href=""><span class="icon icon_trash float_left" id="RF_icon_delScan"></span><span class="text"  id="RF_delScan">'+ text.del_script +'</span></a></li>';
			tout_supr += '<li class="delete" ><a href=""><span class="icon float_left" style="background-position: 0 -64px; id="RF_icon_addScan"></span><span class="text" id="RF_addScan">'+ text.add_scan_d +'</span></a></li>';
			var newElement = $(tout_supr);
			// $('#RF_delMEssScan', newElement).closest('a').click(function(e){supr_scan1(info.serveur);});
			$('#RF_delScan', newElement).closest('a').click(function(e){
				e.preventDefault();
				supr_scan1(info.serveur);
			});
			$('#RF_addScan', newElement).closest('a').click(function(e){
				e.preventDefault();
				save_scan(info.serveur, msg_id, true, true);
			});
			newElement.insertBefore('.toolbar .delete', pop_up);
		}
	}
}

/*######################################### SCRIPT  ################################################## */

/** partie mise Ã  jour **///{
	function mise_a_jour(version) {
		if (!/^\d+\.\d+(\.\d+(\.\d+)?)?$/.test(version)) {
			return;
		}
		if (version.split('.') <= info.version.split('.')) {
			// pas de mise Ã  jour
			return;
		}
		var popup = $('<div title="'+info.nom+' - Mise Ã  jour">'
			+'<p>La version <b>'+version+'</b> est maintenant disponible.</p><br>'
			+'<p>Vous avez actuelement la version <b>'+info.version+'</b><br>'
			+'Voulez vous installer la mise Ã  jour ?</p>'
			//+'<p>Prochain rappel dans 6h.</p></div>'
		).dialog({
			width: 500,
			// modal: true,
			// resizable: false,
			buttons: {
				"Installer": function() {
					// preference.get()['lastUpdateCheck'] = info.now;
					// preference.save();
					location.href = info.siteUrl;
					// popup.html('<iframe src="'+info.siteUrl+'" style="width:100%; height:98%"></iframe>').css({
						// width:'590px', height:'400px'
					// }).parent().css({
						// width:'auto', height:'auto'
					// });
					GM_setValue("date_mise_ajours", ''+ info.startTime +'');
					popup.dialog('destroy');
				},
				"Changelog": function() {
					location.href = info.siteUrl + '?changelog';
					// popup.html('<iframe src="'+info.siteUrl+'?changelog" style="width:100%; height:98%"></iframe>');
				},
				"Plus tard": function() {
					// preference.get()['lastUpdateCheck'] = info.now;
					// preference.save();
					popup.dialog('destroy');
					GM_setValue("date_mise_ajours", ''+ info.startTime +'');
				}
			}
		});
		popup.css({
			background: 'initial'
		}).parent().css({
			'z-index': '3001',
			background: 'black url(http://gf1.geo.gfsrv.net/cdn09/3f1cb3e1709fa2fa1c06b70a3e64a9.jpg) -200px -200px no-repeat'
		});
	}
	function checkUpdate() {
		var date_mise_ajours = GM_getValue("date_mise_ajours", "0");
		if((info.startTime - parseInt(date_mise_ajours)) > 1000*60*60*6) { // vÃ©rification toutes les 6h
			if (typeof GM_xmlhttpRequest === 'undefined') {
				$.get(info.siteUrl+'?check', mise_a_jour);
			} else {
				GM_xmlhttpRequest({
					method: 'GET',
					url: info.siteUrl+'?check',
					onload: function(response) {
						mise_a_jour(response.responseText);
					}
				});
			}
		}
	}
//}

/////////////////// ON AFFICHE LE LIEN RAIDE-FACILE ///////////////////
var menuTable = document.getElementById("menuTable");
if (document.getElementById("eventboxFilled") && info.args.page !== 'galaxy') {
	window.setTimeout(function() {
		// rÃ©cupÃ©ration de l'url de la page flotte
		var url_1 = url_1 = document.getElementById("menuTable").getElementsByClassName('menubutton')[7].href;
		// test de la prÃ©sence d'une flotte Ã  soi -> dans ce cas rÃ©cupÃ¨ration de l'url de la page mouvement
 		if(document.getElementById("eventFriendly") && document.getElementById("eventFriendly").innerHTML > 0)
			url_1 = document.getElementById("menuTable").getElementsByClassName('menu_icon')[7].getElementsByTagName('a')[0].href;
		// test si le lien n'est pas lÃ  avant de le rajouter
		if (document.getElementById('raide-facile') === null)
			afficher_lien(url_1);
	}, 0);
}
else if (menuTable != null ) {
	var url_1 = document.getElementById("menuTable").getElementsByClassName('menubutton')[7].href;
	afficher_lien(url_1);
}

/////////////////// PAGE GENERAL ///////////////////
// Modification Deberron
if (info.args.page === 'overview') {
	// setSpeed();
	if (document.getElementsByName('ogame-universe-speed')[0]) {
		GM_setValue('vitesse_uni', document.getElementsByName('ogame-universe-speed')[0].content);
	}
}

/////////////////// PAGE DE MESSAGES AVEC POP UP ///////////////////
else if (info.args.page === 'showmessage') {
	// inutile depuis la mÃ j des popup ?
	alert('[raid facile] Erreur nÂ°164881');
	if(document.getElementsByClassName('note')[0].getElementsByClassName('material spy')[0])
	{
		scan_pop_up();
	}
	else if(document.getElementById('battlereport')){get_info_combat();}
}

/////////////////// Scan des Rapports d'espionnage ///////////////////
else if (info.args.page === 'messages') {
	function sauve_option2(){
		if (document.getElementById('messageContent')) {
			var scans = $('#mailz > tbody > tr[id^="spioDetails"]');
			if (!scans.length) {
				// pas de rapport d'espionnage disponible
				return;
			}
			// "Afficher le rapport d`espionnage complet" est cochÃ©
			// On a au moins un rapport d'espionnage
			var nb_scan_enregistre = 0;
			for (var i = 0; i < scans.length; i++) {
				if(scan_preenrgistre == 1){
					if(save_scan(info.serveur, scans[i].id.replace('spioDetails_', ''), false)) {
						++nb_scan_enregistre;
					}
				}
			}
			if (nb_scan_enregistre > 0) {
				fadeBoxx((nb_scan_enregistre) +' '+ text.rep_mess_add, 0, 3000);
			}
		}
	}

	function safeWrap(f) {
		return function() {
			setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
		};
	}

	// switch des actions suivant la catÃ©gorie
	function switchCat(cat) {
		switch (cat) {/*7 espionner , 5combat , 6joueur , 8expe,2 alli, 4 divers ^^*/
			case "9":
			case "7":
				sauve_option2();
				if(q_icone_mess == 1){bouton_supr_scan_depuis_mess();}
				break;
			// case "5":
				// sauve_option2();
				// break;
			case "10":
				// alert("BoÃ®te de reception");
				sauve_option2();
				if(q_icone_mess == 1){bouton_supr_scan_depuis_mess();}
				break;
			case "3":
				// alert("Corbeille");
				// sauve_option2();
				// if(q_icone_mess == 1){bouton_supr_scan_depuis_mess();}
				break;
			default:
				// alert("Carnet d'adresse");
				break;
		}
	}

	// SCAN PREVOUERT
	if (info.firefox) {
		unsafeWindow.$(document).ajaxSuccess(safeWrap(function(e,xhr,settings){
			//l'url de la requÃªte ajax contient page=messages
			if (settings.url.indexOf("page=messages") == -1) return;
			if (settings.data.indexOf("displayPage") == -1) return;
			// on affiche l'onglet charge
			var cat = settings.data.replace(/^.*displayCategory=([\d-]*).*$/,"$1");
			switchCat(cat);
		}));
	} else if(info.chrome) {
		var waitAjaxSuccessPreouvert = function() {
			// on vÃ©rifie si l'image de chargement est encore lÃ 
			if ($('#messageContent>img').length) {
				console.log('[raid facile] Attente des messages');
				setTimeout(waitAjaxSuccessPreouvert, 333);
			} else {
				var form = $('#messageContent>form');
				// si on est sur le carnet d'adresse on ne fait rien
				if (!form.length) return;
				// rÃ©cupÃ©ration de la catÃ©gorie
				var cat = $('#messageContent>form').attr('action').replace(/^.*displayCategory=([\d-]*).*$/,"$1");
				switchCat(cat);
			}
		};
		// en cas de clic on attend que l'action se fasse
		$('.mailWrapper, #tab-msg').on('click keypress', function(e){
			setTimeout(waitAjaxSuccessPreouvert, 333);
		});
		waitAjaxSuccessPreouvert();
	} else {
		alert('[raid facile] Erreur nÂ°154000');
	}

	// SCAN POPUP
	if (info.firefox) {
		unsafeWindow.$(document).ajaxSuccess(safeWrap(function(e,xhr,settings){
			//l'url de la requÃªte ajax contient page=showmessage
			if (settings.url.indexOf("page=showmessage") == -1) return;
			scan_pop_up();
		}));
	} else if(info.chrome) {
		var waitAjaxSuccessPopup = function() {
			// on vÃ©rifie si l'image de chargement est encore lÃ 
			if ($('#messageContent>img').length) {
				console.log('[raid facile] Attente de la popup');
				setTimeout(waitAjaxSuccessPopup, 333);
			} else {
				var form = $('#messageContent>form');
				// si on est sur le carnet d'adresse on ne fait rien
				if (!form.length) return;
				scan_pop_up();
			}
		};
		// en cas de clic on attend que l'action se fasse
		$('.mailWrapper, #tab-msg').on('click keypress', function(e){
			setTimeout(waitAjaxSuccessPopup, 333);
		});
		waitAjaxSuccessPopup();
	} else {
		alert('[raid facile] Erreur nÂ°714452');
	}
}

/////////////////// TABLEAU ///////////////////
else if (info.args.raidefacil === 'scriptOptions') {
	var xpathExpression = '//A[contains(@class,"planetlink")] | //A[contains(@class,"moonlink")]';
	var xpathResult = document.evaluate(xpathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < xpathResult.snapshotLength; i++) {
		//apparement ne sait pas accÃ©der Ã  la page movement avec &raidefacil=scriptOptions ni d'autre attribut
		xpathResult.snapshotItem(i).href = xpathResult.snapshotItem(i).href.replace('index.php?page=movement','index.php?page=fleet1') + '&raidefacil=scriptOptions';
	}

	//recupere les flottes en vol
	//recup_flotte_mv();

	/* ********************** On recupere les infos ************************/
	suprime_espace(info.serveur);
	var url_2 = info.url.split('&raidefacil=scriptOptions')[0];
	var scan_i = GM_getValue('scan'+ info.serveur, '').split('#');
	var bbcode_export = ' ';

	if ((info.url.indexOf('&del_scan=',0)) >=0){
		var numero_scan = info.url.split('del_scan=')[1].split('&')[0];

		scan_i[numero_scan] = '';
		scan_i = scan_i.join('#');

		scan_i = scan_i.replace( /\#{2,}/g, "#");
		GM_setValue('scan'+ info.serveur, scan_i);
		suprime_espace(info.serveur);
		scan_i = GM_getValue('scan'+ info.serveur, '').split('#');
	}


/************************************** Trie du tableau ******************************************************/
	function trie_tableau(serveur, classementsecondaire, type_trie){
		var ligne_tableau = ' ';

		var scan_i = GM_getValue('scan'+ serveur, '').split('#');
		var nb = scan_i.length ;
		for (var h =0 ; h<nb ; h++) {// on split chaque scan en un tableau
			scan_i[h] = scan_i[h].split(';');
		}

		if(nb_scan_page != 0) {
			var num_page = info.url.split('&page_r=')[1];

			if(num_page == undefined || num_page == 1)
			{
				var nb_scan_deb = 0;
				var nb_scan_fin = nb_scan_page;
			}
			else if(num_page >= 1)
			{
				var nb_scan_deb = (parseInt(num_page) - 1)*nb_scan_page;
				var nb_scan_fin = parseInt(num_page)*nb_scan_page;
			}
		} else {
			var nb_scan_fin = nb;
			var nb_scan_deb =0;
		}

		//("ccoordonee","cplanete","cdate","cprod_h","cressourcexh","cress","ccdr","ccdr_ress","cnb_v1","cnb_v2","cnb_d1","cnb_d2");
		//("1","3","0","20e","20d","12","8","20c","17","22","18","23");


		// pour classement par colone
		if(classementsecondaire != -1 && classementsecondaire != -2 && classementsecondaire != undefined)
			classement = classementsecondaire;

		if(parseInt(classement.replace( /[^0-9-]/g, "")) == 1){//si le classement est par coordonee on fait que les coordonees soit classable
			for (var gh = 0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined && scan_i[gh].indexOf(';;;;;;;;;;;;;;;;;x;;') == -1 )
				{
					if(scan_i[gh][9] != undefined && scan_i[gh][1].split(':')[1]){

						//on recupere les coordonÃ©es
						var coordosplit = scan_i[gh][1].split(':');
						var galaxie = coordosplit[0].replace( /[^0-9-]/g, "");
						var systeme = coordosplit[1].replace( /[^0-9-]/g, "");
						var planette = coordosplit[2].replace( /[^0-9-]/g, "");

						// on fait ques les systeme  soit en 3 chiffre et les planetes soit en deux
						if(parseInt(systeme) <100) {
							if(parseInt(systeme) <10)
								systeme = '00'+''+systeme;
							else
								systeme = '0'+''+systeme;
						}
						if(parseInt(planette) <10)
						{
							planette = '0'+''+planette;
						}
						// on met les "nouvellle coordonÃ©e". avec '' pour bien que les system /galaxie ne se melange pas
						scan_i[gh][20] = parseInt(galaxie +''+ systeme +''+ planette);
					}
				}
			}
		}
		else if(classement == '20c'){//classement par cdr + ressources.
			for (var gh = 0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined) {
					if(scan_i[gh][9] != undefined && scan_i[gh].indexOf(';;;;;;;;;;;;;;;;;x;;') == -1) {
					//ressource
						var ressource_m = scan_i[gh][4];
						var ressource_c = scan_i[gh][5];
						var ressource_d = scan_i[gh][6];
						var ressource_total = parseInt(ressource_m)*q_taux_m + parseInt(ressource_c)*q_taux_c + parseInt(ressource_d)*q_taux_d;

						var pourcent = 50;
						if(scan_i[gh][24] == "ph")
							pourcent = 75;
						if(scan_i[gh][25] == "b1" || scan_i[gh][25] == "b2" || scan_i[gh][25] == "b3")
							pourcent = 100;

						//cdr possible avec flotte
						var cdr_possible_m = Math.round(parseInt(scan_i[gh][15])*pourcent_cdr);
						var cdr_possible_c = Math.round(parseInt(scan_i[gh][16])*pourcent_cdr);

						//cdr defense
							if(scan_i[gh][21]){var cdr_def = scan_i[gh][21].split('/');}else{var cdr_def = '?';}
							if(cdr_def[0] != '?' &&  pourcent_cdr_def != 0 && cdr_def != 'undefined'){
								var cdr_possible_def_m = Math.round(parseInt(cdr_def[1])*pourcent_cdr_def);
								var cdr_possible_def_c = Math.round(parseInt(cdr_def[2])*pourcent_cdr_def);
							}
							else{//du a la transition des rapports qui ne comptait pas encore les cdr de defense
								var cdr_possible_def_m = 0;
								var cdr_possible_def_c = 0;
							}
						var cdr_possible_def_total = cdr_possible_def_m*q_taux_m + cdr_possible_def_c*q_taux_c;

						var cdr_ressource = ressource_total*(pourcent/100) + cdr_possible_m*q_taux_m + cdr_possible_c*q_taux_c + cdr_possible_def_total;
						scan_i[gh][20] = cdr_ressource;
					}
					else {
						scan_i[gh][20] = '-1';
					}
				}
			}
		}
		else if(classement == '20d'){//classement des ressources dans x heures
			for (var gh = 0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined)
				{
					if(scan_i[gh][9] != undefined && scan_i[gh] != ';;;;;;;;;;;;;;;;;x;;' && scan_i[gh][1].split(':')[2])
					{
						// batiment adversaire + prodh + resrrouce x h
						//+bat +prod/h
						var coordonee = scan_i[gh][1];
						var mine_array = scan_i[gh][19].split('/');
						var mine_m = mine_array[0];
						var mine_c = mine_array[1];
						var mine_d = mine_array[2];

						//ressource x h
						if(mine_array != '?/?/?'&& coordonee) {
							var prod_t = calcule_prod(mine_m, mine_c, mine_d, coordonee, '?', vitesse_uni);
							var prod_m_h = prod_t.metal;
							var prod_c_h = prod_t.cristal;
							var prod_d_h = prod_t.deut;

							//ressource
							var ressource_m = scan_i[gh][4];
							var ressource_c = scan_i[gh][5];
							var ressource_d = scan_i[gh][6];
							var ressource_total = parseInt(ressource_m) + parseInt(ressource_c) + parseInt(ressource_d);

							var prod_m_xh = parseInt(prod_m_h)*(parseInt(prod_gg)/60);
							var prod_c_xh = parseInt(prod_c_h)*(parseInt(prod_gg)/60);
							var prod_d_xh = parseInt(prod_d_h)*(parseInt(prod_gg)/60);

							var ressource_m_xh = parseInt(ressource_m) + prod_m_xh;
							var ressource_c_xh = parseInt(ressource_c) + prod_c_xh;
							var ressource_d_xh = parseInt(ressource_d) + prod_d_xh;
							var ressource_tt_xh = ressource_m_xh*q_taux_m + ressource_c_xh*q_taux_c + ressource_d_xh*q_taux_d;
							scan_i[gh][20] = ressource_tt_xh;
						}
						else {
							scan_i[gh][20] = '-1';
						}
					}
					else {
						scan_i[gh][20] = '-1';
					}
				}
			}
		}
		else if(classement == '20e'){//si c'est le classement par production par heure
			for (var gh = 0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined && scan_i[gh].indexOf(';;;;;;;;;;;;;;;;;x;;') == -1)
				{
					if(scan_i[gh][9] != undefined)
					{
						// batiment adversaire + prodh + resrrouce x h
						//+bat +prod/h
						var mine_array = scan_i[gh][19].split('/');
						var mine_m = mine_array[0];
						var mine_c = mine_array[1];
						var mine_d = mine_array[2];
						var coordonee = scan_i[gh][1];

						if(mine_array != '?/?/?')
						{
							var prod_t = calcule_prod(mine_m, mine_c, mine_d, coordonee, '?', vitesse_uni);

							var prod_m_h = prod_t.metal;
							var prod_c_h = prod_t.cristal;
							var prod_d_h = prod_t.deut;
							var prod_tot = parseInt(prod_m_h)*q_taux_m + parseInt(prod_c_h)*q_taux_c + parseInt(prod_d_h)*q_taux_d;

							scan_i[gh][20] = prod_tot;
						}
						else {
							scan_i[gh][20] = '-1';
						}
					}
					else {
						scan_i[gh][20] = '-1';
					}
				}
			}
		}
		else if(parseInt(classement.replace( /[^0-9-]/g, "")) == 12){// classement par ressources
			for (var gh = 0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined && scan_i[gh].indexOf(';;;;;;;;;;;;;;;;;x;;') == -1)
				{
					if(scan_i[gh][9] != undefined) {
						//ressource
						var ressource_m = scan_i[gh][4];
						var ressource_c = scan_i[gh][5];
						var ressource_d = scan_i[gh][6];
						var ressource_total = parseInt(ressource_m)*q_taux_m + parseInt(ressource_c)*q_taux_c + parseInt(ressource_d)*q_taux_d;

						var pourcent = 50;
						if(scan_i[gh][24] == "ph")
							pourcent = 75;
						if(scan_i[gh][25] == "b1" || scan_i[gh][25] == "b2" || scan_i[gh][25] == "b3")
							pourcent = 100;

						scan_i[gh][20] = ressource_total*(pourcent/100);
					}
					else {
						scan_i[gh][20] = '-1';
					}
				}
			}

		}

		if (classement == 2 || classement == 3) {			// si c'est un classement par rapport au nom de joueur ou de planÃ¨te
			var sort_Info = function(a, b) {
				return strcmp(a[parseInt(classement.replace( /[^0-9-]/g, ""))], b[parseInt(classement.replace( /[^0-9-]/g, ""))]);
			}
		} else if(classement == 12 || classement == 1) { 	// si c'est par ressources ou par coordonnÃ©es
			var sort_Info = function(a, b) {
				return b[20] - a[20];
			}
		} else {
			var sort_Info = function(a, b) {
				return b[parseInt(classement.replace( /[^0-9-]/g, ""))] - a[parseInt(classement.replace( /[^0-9-]/g, ""))];
			}
		}

		if(parseInt(classement.replace( /[^0-9-]/g, "")) > -1)
			scan_i.sort(sort_Info);

		// si on a fait a cochÃ© la case reverse ou que l'on trie grace au colone
		if(reverse == '0' || type_trie == 'decroissant')
			scan_i.reverse();

 		// On remet Ã  x la valeur qui nous a servir pour le tri
		if(parseInt(classement.replace( /[^0-9-]/g, "")) == '20' || classement == 12 || classement == 1){
			for (var gh = 0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined)
					scan_i[gh][20] = 'x';
			}
		}

		for (var h =0 ; h<nb ; h++){
			scan_i[h] = scan_i[h].join(';');
		}
		GM_setValue('scan'+ serveur, scan_i.join('#'));
	}

/*************************************************** ON AFFICHE LE TABLEAU ****************************************************************/

	function afficher_ligne_interieur_tab(serveur){
		var scan_info = GM_getValue('scan'+ serveur, '').split('#');
		var ligne_tableau = ' ';
		var nb = scan_info.length ;

		var nb_scan_deb_fin = connaitre_scan_afficher(serveur, nb_scan_page, info.url, nb)
		var nb_scan_fin = nb_scan_deb_fin[0];
		var nb_scan_deb = nb_scan_deb_fin[1];

		var url_2 = info.url.split('&raidefacil=scriptOptions')[0];
		var bbcode_export = ' ';

		//var inactif_normal = GM_getValue('inactif', '');

		//on recupere les infos sur les attaques des 24h dernieres
		suprimmer_attaque_24h_inutile();
		var attaque_24h = GM_getValue('attaque_24h', '');
		var attaque_24h_split = attaque_24h.split('#');
		var attaque_24h_split2 = attaque_24h_split;
		for(var x=0; x<attaque_24h_split.length; x++){
			attaque_24h_split2[x] = attaque_24h_split[x].split('/');
		}

		// on regarde la planette selectionner(liste de droite des planettes)  pour connaitre la galaxie
		if(document.getElementsByName('ogame-planet-coordinates')[0]){
			var coordonnee_slelec = document.getElementsByName('ogame-planet-coordinates')[0].content;
		}
		else{
			if(pos_depart != 'x:xxx:x'){var coordonnee_slelec = pos_depart;}
			else{var coordonnee_slelec = '0';}
		}


		// on les utilises et les place
		cptLigne = 0;
		for(var i= nb_scan_deb; i<nb_scan_fin; i++){
			if(scan_info[i] != undefined && scan_info[i] != ';;;;;;;;;;;;;;;;;x;;')
			{
				var scan_info_i = scan_info[i].split(';');
				//on verifie si c'est ok pour l'afficher
				if(scan_info_i[9] != undefined && scan_info_i[1].split(':')[1] && (q_flo_vis == 1 || scan_info_i[9] != '?/?/?/?/?/?/?/?/?/?/?/?/?/') && (q_def_vis == 1 || scan_info_i[10] != '?/?/?/?/?/?/?/?/?/?') ){


					//on veut savoir si on n'affiche que les scan de la galaxie, si oui on vÃ©rifie la galaxie
					if((q_galaxie_scan == 1 &&  coordonnee_slelec.split(':')[0].replace( /[^0-9-]/g, "") == scan_info_i[1].split(':')[0].replace( /[^0-9-]/g, ""))
						|| q_galaxie_scan == 0
						|| (galaxie_demande == scan_info_i[1].split(':')[0].replace( /[^0-9-]/g, "") && q_galaxie_scan == 2)
						|| (q_galaxie_scan == 3 && (parseInt(coordonnee_slelec.split(':')[0].replace( /[^0-9-]/g, "")) + galaxie_plus_ou_moins) >= parseInt(scan_info_i[1].split(':')[0].replace( /[^0-9-]/g, "")) && (parseInt(coordonnee_slelec.split(':')[0].replace( /[^0-9-]/g, "")) - galaxie_plus_ou_moins) <= parseInt(scan_info_i[1].split(':')[0].replace( /[^0-9-]/g, "")))
						|| filtre_joueur != '' //si on filtre sur le joueur, on affiche toutes les coordonnÃ©es
					){

						//###### Gestion des filtres ######//
						var filtre = false;
						// on regarde ce qu'on affiche : planette + lune = 0, planette =1 , lune =2
						if(	(afficher_seulement == 0)
							|| (afficher_seulement == 1 && scan_info_i[14]== 1)
							|| (afficher_seulement == 2 && scan_info_i[14]!= 1)
						)
							// on regarde ce qu'on affiche : actif + inactif = 0, actif =1 , inactif =2
							if(	(filtre_actif_inactif == 0)
								|| (filtre_actif_inactif == 1 && scan_info_i[24]!= 'i' && scan_info_i[24]!= 'I' )
								|| (filtre_actif_inactif == 2 && (scan_info_i[24]== 'i' || scan_info_i[24]== 'I'))
							)
								// on regarde le joueur qu'on affiche
								if(	(filtre_joueur == '')
									|| (filtre_joueur != '' && filtre_joueur.toLowerCase() == scan_info_i[2].toLowerCase() )
								)
									filtre = true;

						if (filtre)
						{
						// date
							var date_scan = scan_info_i[0];
							var datecc = new Date();
							datecc.setTime(date_scan);
							var date_final = datecc.getDate()+'/'+ (parseInt(datecc.getMonth()) + 1) +'/'+datecc.getFullYear()+ ' '
											+datecc.getHours()+ ':'+ datecc.getMinutes()+ ':'+datecc.getSeconds()  ;


							// si la date est demander en chronos
							if(q_date_type_rep == 0){
								var datecc2 = parseInt(info.startTime) - parseInt(date_scan);

// Modification Deberron (Je peux avoir une diff de date entre l'heure de mon pc et celle du serveur)
								if (document.getElementsByName('ogame-timestamp')[0])
									datecc2 = parseInt(document.getElementsByName('ogame-timestamp')[0].content)*1000 - parseInt(date_scan);

								var seconde = Math.floor(datecc2/1000); // pour avoir le nb de seconde qui s'est ecouler depuis le scan.
								var minutes = Math.floor(seconde/60);
								var heures = Math.floor(minutes/60);
								var jours = Math.floor(heures/24);
									seconde = Math.floor(seconde%60);
									minutes = Math.floor(minutes%60);
									heures = Math.floor(heures%24);


								if(datecc2 != 0){
									var date2 = '';
									 if(jours>0)
										{date2 += jours + 'j ';}
									 if(jours>0 || heures>0)
										 {date2 += ((heures<10)?'0':'') + heures + 'h ';}
									 if(jours>0 || heures>0 || minutes>0)
										 {date2 += ((minutes<10)?'0':'') + minutes + 'm ';}
									 date2 += ((seconde<10)?'0':'') + seconde + 's';
								}
								else{ var date2 = '--:--:--';}

							}
							else{
// Modification Deberron
								var date2 = + ((datecc.getDate()<10)?'0':'')
											+ datecc.getDate()+'/'
											+ ((datecc.getMonth()<10)?'0':'')
											+ (parseInt(datecc.getMonth())+1)+'/'
											+ (parseInt(datecc.getFullYear())-2000)+' '
											+ ((datecc.getHours()<10)?'0':'')
											+ datecc.getHours()+':'
											+ ((datecc.getMinutes()<10)?'0':'')
											+ datecc.getMinutes()+':'
											+ ((datecc.getSeconds()<10)?'0':'')
											+ datecc.getSeconds();
							}


						// type de la planette
							var type_planette = scan_info_i[14];
							var l_q ='';
							if(type_planette != 1){l_q = ' L';}

						//nom joueur et planette
							var nom_joueur = scan_info_i[2];
							var nom_planete_complet = scan_info_i[3];
							if(nom_planete_complet.indexOf('1diez1')>=0){
								nom_planete_complet = nom_planete_complet.replace( /1diez1/g, "#");
							}
							var nom_planete = raccourcir(nom_planete_complet);

						//coordonee + url
							var coordonee = scan_info_i[1];
									var coordonee_split = coordonee.split(':');
								var galaxie = (coordonee_split[0]).replace( /[^0-9-]/g, "");
								var systeme = (coordonee_split[1]).replace( /[^0-9-]/g, "");
								var planette = (coordonee_split[2]).replace( /[^0-9-]/g, "");
								var url_galaxie = document.getElementById("menuTable").getElementsByClassName('menubutton ')[8].href;

							var url_fleet1 = document.getElementById("menuTable").getElementsByClassName('menubutton ')[7].href;
							if(espionnage_lien == 1)
								{var espionnage = url_fleet1 +'&galaxy='+ galaxie + '&system='+ systeme + '&position='+ planette + '&type='+ type_planette +'&mission=6';}
							else if(espionnage_lien == 0)
								{var espionnage = url_galaxie +'&galaxy='+ galaxie + '&system='+ systeme + '&position='+ planette + '&planetType=1&doScan=1';}

							var coordonee_fin = '<a href="'+url_galaxie +'&galaxy='+ galaxie + '&system='+ systeme + '&position='+ planette +'"';
							if(nom_j_q_q != 1 && nom_p_q_q != 1)
								coordonee_fin += ' title=" Planette: '+ nom_planete_complet.replace(/"/g, '&quot;') + ' | Joueur: ' + nom_joueur + '">';
							else if(nom_j_q_q != 1)
								coordonee_fin += ' title=" Joueur: ' + nom_joueur +'">';
							else if(nom_p_q_q != 1)
								coordonee_fin += ' title=" Planette: '+ nom_planete_complet.replace(/"/g, '&quot;') +'">';
							else
								coordonee_fin += '>';
							coordonee_fin += coordonee + l_q + '</a>';

						//ajout Deberron - type de joueur
							var pourcent = 50; //Ajout Deberron
							var type_joueur = scan_info_i[24] ? scan_info_i[24] : '&nbsp';
							if(type_joueur == "ph") {
								type_joueur = '<span class="status_abbr_honorableTarget">'+type_joueur+'</span>';
								pourcent = 75;
							}
							else if(type_joueur == "o")
								type_joueur = '<span class="status_abbr_outlaw">'+type_joueur+'</span>';
							else if(type_joueur == "i")
								type_joueur = '<span class="status_abbr_inactive">'+type_joueur+'</span>';
							else if(type_joueur == "I")
								type_joueur = '<span class="status_abbr_longinactive">'+type_joueur+'</span>';
							else if(type_joueur == "f")
								type_joueur = '<span class="status_abbr_strong">'+type_joueur+'</span>';
							else if(type_joueur == "v")
								type_joueur = '<span class="status_abbr_vacation">'+type_joueur+'</span>';


						//ajout Deberron - Honeur du joueur
							var type_honor = scan_info_i[25] ? scan_info_i[25] : '&nbsp';
							if(type_honor == "b1") {
								type_honor = '<span class="honorRank rank_bandit1"></span>';
								pourcent = 100;
							}
							else if(type_honor == "b2") {
								type_honor = '<span class="honorRank rank_bandit2"></span>';
								pourcent = 100;
							}
							else if(type_honor == "b3") {
								type_honor = '<span class="honorRank rank_bandit3"></span>';
								pourcent = 100;
							}
							else if(type_honor == "s1")
								type_honor = '<span class="honorRank rank_starlord1"></span>';
							else if(type_honor == "s2")
								type_honor = '<span class="honorRank rank_starlord2"></span>';
							else if(type_honor == "s3")
								type_honor = '<span class="honorRank rank_starlord3"></span>';

						//activite
							var activite = scan_info_i[7];
							if(activite == 'rien'){
								var activite_fin = ' ';
							} else {
								if(parseInt(activite) <= 15){
									var activite_fin = '<img style="width: 12px; height: 12px;" src="http://gf1.geo.gfsrv.net/cdn12/b4c8503dd1f37dc9924909d28f3b26.gif" alt="'+ activite +' min " title="'+ activite +' min"/>';
								} else {
									var activite_fin = '<span style="background-color: #000000;border: 1px solid #FFA800;border-radius: 3px 3px 3px 3px;color: #FFA800;">'+activite+'</span>';
								}
							}

						//ressource
							var ressource_m = scan_info_i[4];
							var ressource_c = scan_info_i[5];
							var ressource_d = scan_info_i[6];
							var nb_pt = shipCount(parseInt(ressource_m), parseInt(ressource_c), parseInt(ressource_d), 5000, pourcent);
							var nb_gt = shipCount(parseInt(ressource_m), parseInt(ressource_c), parseInt(ressource_d), 25000, pourcent);
							var ressource_total = parseInt(ressource_m) + parseInt(ressource_c) + parseInt(ressource_d);

							if(question_rassemble_col == 0)
							{
								var ressource = '<acronym title="' + pourcent + '% de ressources pillables <br> '+ addPoints(nb_pt) + text.nb_pt +'/'+ addPoints(nb_gt) + text.nb_gt + ' <br> ' + text.metal +' : ' + addPoints(Math.round(parseInt(ressource_m)*(pourcent/100))) + ' | '+ text.cristal +' : ' + addPoints(Math.round(parseInt(ressource_c)*(pourcent/100))) + ' | '+ text.deut +' : ' + addPoints(Math.round(parseInt(ressource_d)*(pourcent/100))) + '">' +  addPoints(Math.round(parseInt(ressource_total)*(pourcent/100))) + '</acronym>';
							}

						// vitesse minimum.
							var accronyme_temp_vol = vaisseau_vitesse_mini(tech_impul_a ,tech_hyper_a ,tech_combus_a, vaisseau_lent, coordonee, vitesse_uni);

						//cdr possible
							var cdr_possible = Math.round(parseInt(scan_info_i[8])*pourcent_cdr);
							var cdr_possible_m = Math.round(parseInt(scan_info_i[15])*pourcent_cdr);
							var cdr_possible_c = Math.round(parseInt(scan_info_i[16])*pourcent_cdr);

							// on verifie que cdr possible existe et soit un chiffre
							if(cdr_possible == '?' || isNaN(cdr_possible)){var cdr_aff = 0;cdr_possible = '?'}
							else{var cdr_aff = cdr_possible;}

							// cdr de dÃ©fense
								// on verifie que le cdr def est bien creer dans le scan info
								if(scan_info_i[21]){var cdr_def = scan_info_i[21].split('/');}
								else{var cdr_def = '?';}
							if(cdr_def[0] != '?' &&  pourcent_cdr_def != 0 && cdr_def != 'undefined'){
								var cdr_possible_def = Math.round(parseInt(cdr_def[0])*pourcent_cdr_def);
								var cdr_possible_def_m = Math.round(parseInt(cdr_def[1])*pourcent_cdr_def);
								var cdr_possible_def_c = Math.round(parseInt(cdr_def[2])*pourcent_cdr_def);
							}
							else{
								var cdr_possible_def = 0;
								var cdr_possible_def_m = 0;
								var cdr_possible_def_c = 0;
							}

							if(cdr_possible != '?'){cdr_possible = cdr_possible + cdr_possible_def;}
							else{cdr_possible = cdr_possible;}

							cdr_aff = cdr_aff + cdr_possible_def;
							cdr_possible_m = cdr_possible_m + cdr_possible_def_m;
							cdr_possible_c = cdr_possible_c + cdr_possible_def_c;

							if(isNaN(cdr_aff)){cdr_aff = 0;}
							else{cdr_aff = cdr_aff;}

							if(question_rassemble_col == 0)
							{
								if(cdr_q_type_affiche == 0){
									var cdr_aco = '<acronym title="' + addPoints(Math.ceil(cdr_aff/20000)) + text.nb_rc + '<br>'+ text.met_rc +' : ' + addPoints(cdr_possible_m) + ' | '+ text.cri_rc +' : ' + addPoints(cdr_possible_c) + ' ">'+  addPoints(cdr_possible) + '</acronym>';
								}
								else{
									var cdr_aco = '<acronym title="' + addPoints(Math.ceil(cdr_aff/20000)) + text.nb_rc + '<br>'+ text.met_rc +' : ' + addPoints(cdr_possible_m) + ' | '+ text.cri_rc +' : ' + addPoints(cdr_possible_c) + ' ">'+  addPoints(Math.ceil(cdr_aff/20000)) + '</acronym>';
								}
							}

						// colonne cdr +  resource
							if(question_rassemble_col == 1)
							{
								var col_cdr = '<acronym title="' + pourcent + '% | '+ addPoints(nb_pt) + text.nb_pt +'/'+ addPoints(nb_gt) + text.nb_gt + ' | '+ text.metal +' : ' + addPoints(Math.round(parseInt(ressource_m)*(pourcent/100))) + ' | '+ text.cristal +' : ' + addPoints(Math.round(parseInt(ressource_c)*(pourcent/100))) + ' | '+ text.deut +' : ' + addPoints(Math.round(parseInt(ressource_d)*(pourcent/100))) + '\n' + addPoints(Math.ceil(cdr_aff/20000)) + text.nb_rc + ' | '+ text.met_rc +' : ' + addPoints(parseInt(cdr_possible_m)) + ' | '+ text.cri_rc +' : ' + addPoints(parseInt(cdr_possible_c)) + '">' +  addPoints(parseInt(cdr_aff) + Math.round(parseInt(ressource_total)*(pourcent/100))) + '</acronym>';
							}

						//recherhe adersersaire
							var recherche_ad = scan_info_i[13].split('/');
							var tech_arme_d = recherche_ad[0];
							var tech_bouclier_d = recherche_ad[1];
							var tech_protect_d = recherche_ad[2];

						//recupere vaisseau et defense
							var vaisseau_type = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.sat, vari.dest, vari.edlm, vari.tra);
							var defense_type = new Array(vari.lm, vari.lle, vari.llo, vari.gauss, vari.ion, vari.pla, vari.pb, vari.gb, vari.mic, vari.mip);

							//type pour les different simulateur.
							var vaisseau_speed = new Array("ship_d0_0_b", "ship_d0_1_b", "ship_d0_2_b", "ship_d0_3_b", "ship_d0_4_b", "ship_d0_5_b", "ship_d0_6_b", "ship_d0_7_b", "ship_d0_8_b", "ship_d0_9_b", "ship_d0_10_b", "ship_d0_11_b", "ship_d0_12_b", "ship_d0_13_b");
							var def_speed = new Array("ship_d0_14_b", "ship_d0_15_b", "ship_d0_16_b", "ship_d0_17_b", "ship_d0_18_b", "ship_d0_19_b", "ship_d0_20_b", "ship_d0_21_b", "abm_b", "");

							var vaisseau_win = new Array("d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "d11", "d12", "d13");
							var def_win = new Array("d14", "d15", "d16", "d17", "d18", "d19", "d20", "d21", "", "");

							var vaisseau_drag = new Array("numunits[1][0][k_t]", "numunits[1][0][g_t]", "numunits[1][0][l_j]", "numunits[1][0][s_j]", "numunits[1][0][kr]", "numunits[1][0][sc]", "numunits[1][0][ko]", "numunits[1][0][re]", "numunits[1][0][sp]", "numunits[1][0][bo]", "numunits[1][0][so]", "numunits[1][0][z]", "numunits[1][0][t]", "numunits[1][0][sk]");
							var def_drag = new Array("numunits[1][0][ra]", "numunits[1][0][l_l]", "numunits[1][0][s_l]", "numunits[1][0][g]", "numunits[1][0][i]", "numunits[1][0][p]", "numunits[1][0][k_s]", "numunits[1][0][g_s]", "missiles_available_v", "");

							var url_dragosim = '';
							var url_speedsim = '';
							var url_ogamewinner = '';

							// def et vaisseau variable
							var acronyme_vaisseau = ' ';
							var nb_totalvaisseau = 0;
							var acronyme_def = 'DÃ©fense<div class="splitLine"></div>';
							var nb_totaldef = 0;

							var vaisseau22 = scan_info_i[9];
							if(vaisseau22 != '?/?/?/?/?/?/?/?/?/?/?/?/?/?')
							{
								var vaisseau = vaisseau22.split('/');
									for(var k=0; k<vaisseau.length ; k++)
										{
										if( parseInt(vaisseau[k]) != 0)
											{
												acronyme_vaisseau = acronyme_vaisseau + ' | '+ vaisseau_type[k] + ' : ' + addPoints(parseInt(vaisseau[k]));
												nb_totalvaisseau = parseInt(nb_totalvaisseau) + parseInt(vaisseau[k]);

												url_speedsim = url_speedsim + '&amp;' + vaisseau_speed[k] + '=' + parseInt(vaisseau[k]);
												url_dragosim = url_dragosim + '&amp;' + vaisseau_drag[k] + '=' + parseInt(vaisseau[k]);
												url_ogamewinner = url_ogamewinner + '&amp;' + vaisseau_win[k] + '=' + parseInt(vaisseau[k]);
											}
										}
								nb_totalvaisseau = addPoints(parseInt(nb_totalvaisseau));
							}
							else{var vaisseau = vaisseau22.split('/');
								acronyme_vaisseau = '?';
								nb_totalvaisseau = '?';}

							var defense2 = scan_info_i[10];
							if(defense2 != '?/?/?/?/?/?/?/?/?/?')
							{
								var defense = defense2.split('/');
									for(var k=0; k<defense.length ; k++)
									{
										if(parseInt(defense[k]) != 0)
										{
											acronyme_def = acronyme_def + '<br>' + defense_type[k] + ' : ' + addPoints(parseInt(defense[k]));

											url_speedsim = url_speedsim + '&amp;' + def_speed[k] + '=' + parseInt(defense[k]);
											url_dragosim = url_dragosim + '&amp;' + def_drag[k] + '=' + parseInt(defense[k]);
											url_ogamewinner = url_ogamewinner + '&amp;' + def_win[k] + '=' + parseInt(defense[k]);

											if(k != 8 && k != 9){// si k n'est pas des missiles (interplanetaire ou de def)
												nb_totaldef = parseInt(nb_totaldef) + parseInt(defense[k]);
											}
										}
									}
								nb_totaldef = addPoints(parseInt(nb_totaldef));
							} else {
								var defense = defense2.split('/');
								acronyme_def = '?';
								nb_totaldef = '?';
							}

							var acronyme_vaisseau2 = '';
							if(vaisseau_question == 1)
								acronyme_vaisseau2 = '<acronym title=" '+ acronyme_vaisseau +'">'+ nb_totalvaisseau   + '</acronym>';
							else if(vaisseau_question == 2  && (scan_info_i[22] == '?' || !scan_info_i[2]))
								acronyme_vaisseau2 = '<acronym title=" '+ acronyme_vaisseau +','+ text.c_nbv +' '+ nb_totalvaisseau +' ">?</acronym>';
							else if(vaisseau_question == 2)
								acronyme_vaisseau2 = '<acronym title=" '+ acronyme_vaisseau +','+ text.c_nbv +' '+ nb_totalvaisseau +' ">'+  addPoints(parseInt(scan_info_i[22]))  + '</acronym>';

							var acronyme_def2 = '';
							// -------------------------------------------------------------------------------------------------
							if(defense_question == 1)
								acronyme_def2 = '<div class="tooltipTitle">'+ acronyme_def +'</div><acronym>'+ nb_totaldef   + '</acronym>';
							else if(defense_question == 2 && (scan_info_i[23] == '?' || !scan_info_i[23]))
								acronyme_def2 = '<div class="tooltipTitle">'+ acronyme_def +','+ text.c_nbd +' '+ nb_totaldef+'</div><acronym>?</acronym>';
							else if(defense_question == 2)
								acronyme_def2 = '<div class="tooltipTitle>" '+ acronyme_def +','+ text.c_nbd +' '+ nb_totaldef +'</div><acronym>'+ addPoints(parseInt(scan_info_i[23])) + '</acronym>';
							// -------------------------------------------------------------------------------------------------


						//url d'attaque		//am202 = pt / am203 = gt
							var url_fleet1 = document.getElementById("menuTable").getElementsByClassName('menubutton ')[7].href;
							if(lien_raide_nb_pt_gt == 2){var url_attaquer = url_fleet1 + '&galaxy='+ galaxie +'&system='+ systeme +'&position='+ planette +'&type='+ type_planette +'&mission=1';}
							else if(lien_raide_nb_pt_gt == 1){
								if(nb_ou_pourcent == 1){var nb_pt2 = nb_pt + nb_pourcent_ajout_lien;}else{var nb_pt2 = Math.ceil(nb_pt + (nb_pt/100)*nb_pourcent_ajout_lien);}
								var url_attaquer = url_fleet1 + '&galaxy='+ galaxie +'&system='+ systeme +'&position='+ planette +'&type='+ type_planette +'&mission=1&am202='+ nb_pt2;}
							else if(lien_raide_nb_pt_gt == 0){
								if(nb_ou_pourcent == 1){var nb_gt2 = nb_gt + nb_pourcent_ajout_lien;}else{var nb_gt2 = Math.ceil(nb_gt + (nb_gt/100)*nb_pourcent_ajout_lien);}
								var url_attaquer = url_fleet1 + '&galaxy='+ galaxie +'&system='+ systeme +'&position='+ planette +'&type='+ type_planette +'&mission=1&am203='+ nb_gt2;}

						// url de simulation
							if(q_techzero == 1 && recherche_ad[0] == "?"){
								var tech_arme_a_sim = 0;
								var tech_protect_a_sim = 0;
								var tech_bouclier_a_sim = 0;
								var tech_arme_d_sim = 0;
								var tech_bouclier_d_sim = 0;
								var tech_protect_d_sim = 0;
							}
							else{
								var tech_arme_a_sim = tech_arme_a;
								var tech_protect_a_sim = tech_protect_a;
								var tech_bouclier_a_sim = tech_bouclier_a;
								var tech_arme_d_sim = tech_arme_d;
								var tech_bouclier_d_sim = tech_bouclier_d;
								var tech_protect_d_sim = tech_protect_d;
							}

							if(simulateur == 1){
								var url_simul = 'http://websim.speedsim.net/index.php?version=1&lang='+vari.lang_speedsin+'&tech_a0_0='+ tech_arme_a_sim +'&tech_a0_1='+ tech_bouclier_a_sim +'&tech_a0_2='+ tech_protect_a_sim +'&engine0_0='+ tech_combus_a +'&engine0_1='+ tech_impul_a +'&engine0_2='+ tech_hyper_a +'&start_pos='+ coordonnee_slelec
									+ '&tech_d0_0='+ tech_arme_d_sim +'&tech_d0_1='+ tech_bouclier_d_sim +'&tech_d0_2='+ tech_protect_d_sim
									+ '&enemy_name=' + nom_planete_complet.replace(/"/g, '&quot;') + '&perc-df=' + (pourcent_cdr*100) +'&enemy_pos='+ coordonee +'&enemy_metal='+ parseInt(ressource_m) +'&enemy_crystal='+ parseInt(ressource_c) +'&enemy_deut='+ parseInt(ressource_d) + url_speedsim
									+ '&uni_speed=' + vitesse_uni + '&perc-df=' + pourcent_cdr*100 + '&plunder_perc=' + pourcent + '&del_techs=1&rf=1';
							}
							else if(simulateur == 0){
								var url_simul = 'http://drago-sim.com/index.php?style=new&template=New&lang='+vari.lang_dragosin+'&'+ 'techs[0][0][w_t]='+ tech_arme_a_sim +'&techs[0][0][s_t]='+ tech_bouclier_a_sim +'&techs[0][0][r_p]='+ tech_protect_a_sim +'&engine0_0='+ tech_combus_a +'&engine0_1='+ tech_impul_a +'&engine0_2='+ tech_hyper_a +'&start_pos='+ coordonnee_slelec
									+ '&techs[1][0][w_t]='+ tech_arme_d_sim +'&techs[1][0][s_t]='+ tech_bouclier_d_sim +'&techs[1][0][r_p]='+ tech_protect_d_sim
									+ '&v_planet=' + nom_planete_complet.replace(/"/g, '&quot;') + '&debris_ratio=' + pourcent_cdr +'&v_coords='+ coordonee +'&v_met='+ parseInt(ressource_m) +'&v_kris='+ parseInt(ressource_c) +'&v_deut='+ parseInt(ressource_d) + url_dragosim;
							}
							else if(simulateur == 2){
								var url_simul = 'http://www.gamewinner.fr/cgi-bin/csim/index.cgi?lang=fr?'+'&aattack='+ tech_arme_a_sim +'&ashield='+ tech_bouclier_a_sim +'&aarmory='+ tech_protect_a_sim
									+ '&dattack='+ tech_arme_d_sim +'&dshield='+ tech_bouclier_d_sim +'&darmory='+ tech_protect_d_sim
									+ '&enemy_name=' + nom_planete_complet.replace(/"/g, '&quot;') +'&enemy_pos='+ coordonee +'&dmetal='+ parseInt(ressource_m) +'&dcrystal='+ parseInt(ressource_c) +'&ddeut='+ parseInt(ressource_d) + url_ogamewinner;
							}

						// batiment adversaire + prodh + resrrouce x h
							//+bat +prod/h
							var mine_array = scan_info_i[19].split('/');
							var mine_m = mine_array[0];
							var mine_c = mine_array[1];
							var mine_d = mine_array[2];

							// si on a besoin de la production pour afficher une colone
							if(prod_h_q == 1 || prod_gg != 0 || q_vid_colo == 1)
							{
								if(mine_array != '?,?,?')
								{
									var prod_t = calcule_prod(mine_m, mine_c, mine_d, coordonee, '?', vitesse_uni);
									var prod_m_h = prod_t.metal;
									var prod_c_h = prod_t.cristal;
									var prod_d_h = prod_t.deut;
									var prod_tot = parseInt(prod_m_h) + parseInt(prod_c_h) + parseInt(prod_d_h);

									var acro_prod_h = '<acronym title=" '+ text.metal +' : ' + addPoints(parseInt(prod_m_h)) + ' | '+ text.cristal +' : ' + addPoints(parseInt(prod_c_h)) + ' | '+ text.deut +' : ' + addPoints(parseInt(prod_d_h)) + ' ">'+  addPoints(parseInt(prod_tot)) + '</acronym>';

								//ressource x h
									var prod_m_xh = Math.round(parseInt(prod_m_h)*(parseInt(prod_gg)/60));
									var prod_c_xh = Math.round(parseInt(prod_c_h)*(parseInt(prod_gg)/60));
									var prod_d_xh = Math.round(parseInt(prod_d_h)*(parseInt(prod_gg)/60));
									var prod_tt_xh = prod_m_xh + prod_c_xh + prod_d_xh;

									var ressource_m_xh = parseInt(ressource_m) + prod_m_xh;
									var ressource_c_xh = parseInt(ressource_c) + prod_c_xh;
									var ressource_d_xh = parseInt(ressource_d) + prod_d_xh;
									var ressource_tt_xh = ressource_m_xh + ressource_c_xh + ressource_d_xh;

									var acro_ress_xh = '<acronym title=" '+ text.metal +' : ' + addPoints(ressource_m_xh) + '(+'+  addPoints(prod_m_xh) +') | '+ text.cristal +' : ' + addPoints(ressource_c_xh) + '(+'+  addPoints(prod_c_xh) +') | '+ text.deut +' : ' + addPoints(ressource_d_xh) + '(+'+  addPoints(prod_d_xh) +') | +'+  addPoints(prod_tt_xh) +' ">'+  addPoints(ressource_tt_xh) + '</acronym>';
								}
								else {var acro_prod_h = '<acronym title="'+ text.batiment_non_visible +'"> ? </acronym>';
								var acro_ress_xh = '<acronym title="'+ text.batiment_non_visible +'"> ? </acronym>';}
							}

							//case simuler en mode exporter vers un autre simulateur.
							if(simulateur == 3){
								var saut ='\n';
								var tabulation ='&nbsp;&nbsp;&nbsp;&nbsp;';
								var export_scan_simul = 'Ressources sur Mirage ' + coordonee +' (joueur \''+ nom_joueur +'\') le ' + datecc.getMonth() +'-'+datecc.getDate()+ ' '+datecc.getHours()+ 'h '+ datecc.getMinutes()+ 'min ' +datecc.getSeconds()+ 's'
								+ saut
								+ saut + 'MÃ©tal:'+ tabulation + addPoints(parseInt(ressource_m))+ tabulation +'Cristal:'+ tabulation+ addPoints(parseInt(ressource_c))
								+ saut + 'DeutÃ©rium:'+ tabulation+ addPoints(parseInt(ressource_d)) +tabulation +' Energie:'+tabulation+'5.000'
								+ saut
								+ saut + 'ActivitÃ©'
								+ saut + 'ActivitÃ©'
								+ saut + 'ActivitÃ© signifie que le joueur scannÃ© Ã©tait actif sur la planÃ¨te au moment du scan ou qu`un autre joueur a eu un contact de flotte avec cette planÃ¨te Ã  ce moment lÃ .'
								+ saut + 'Le scanner des sondes n`a pas dÃ©tectÃ© d`anomalies atmosphÃ©riques sur cette planÃ¨te. Une activitÃ© sur cette planÃ¨te dans la derniÃ¨re heure peut quasiment Ãªtre exclue.'
								+ saut + 'Flottes';
								var vaisseau_nom = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.sat, vari.dest, vari.edlm, vari.tra);
								var q_saut_v =0;
								if(vaisseau22 != '?/?/?/?/?/?/?/?/?/?')
								{
									var vaisseau = vaisseau22.split('/');
										for(var k=0; k<vaisseau.length ; k++)
										{
											if(parseInt(vaisseau[k]) != 0)
											{
												if(q_saut_v <3){export_scan_simul = export_scan_simul + ' | '+ vaisseau_nom[k] +tabulation +' : ' + addPoints(parseInt(vaisseau[k]));q_saut_v++;}
												else{export_scan_simul = export_scan_simul + saut + ' | '+ vaisseau_nom[k] +tabulation +' : ' + addPoints(parseInt(vaisseau[k]));q_saut_v= 0;}
											}
										}
								}

								export_scan_simul = export_scan_simul + saut + 'DÃ©fense';
								var defense_nom = new Array(vari.lm, vari.lle, vari.llo, vari.gauss, vari.ion, vari.pla, vari.pb, vari.gb, vari.mic, vari.mip);
								var q_saut =0;
								if(defense2 != '?/?/?/?/?/?/?/?/?/?')
								{
									var defense = defense2.split('/');
										for(var k=0; k<defense.length ; k++)
										{
											if(parseInt(defense[k]) != 0)
											{
												if(q_saut <3){export_scan_simul = export_scan_simul + ' | '+ defense_nom[k] +tabulation +' : ' + addPoints(parseInt(defense[k]));q_saut++;}
												else{export_scan_simul = export_scan_simul + saut + ' | '+ defense_nom[k] +tabulation +' : ' + addPoints(parseInt(defense[k]));q_saut= 0;}
											}
										}
								}

								export_scan_simul = export_scan_simul + saut +'BÃ¢timent'
								+ saut + vari.mine_m +tabulation + mine_m +tabulation  +vari.mine_c +tabulation + mine_c
								+ saut + vari.mine_d +tabulation + mine_d +tabulation
								+ saut +'Recherche'
								+ saut + vari.tech_arm +tabulation	+ tech_arme_d + tabulation +vari.tech_bouc +tabulation + tech_bouclier_a + tabulation
								+ saut + vari.tech_pro +tabulation + tech_protect_d
								+ saut + 'ProbabilitÃ© de contre-espionnage : 0 %';
							}

							//compteur d'attaque
							if(q_compteur_attaque == 1){//si il est activÃ©
								var coordonee2_ss_crochet = galaxie + ':' + systeme +':' +planette;
								if(attaque_24h.indexOf(coordonee2_ss_crochet) > -1)//si il est pas comptÃ©.
								{
									var compteur = 0;
									for(var s=0; s<attaque_24h_split.length;s++)
									{
										if(attaque_24h_split2[s][1] == coordonee2_ss_crochet)
										{
											compteur++;
										}
									}
									var attaque_deja_fait = compteur;
								}
								else{
									var attaque_deja_fait = 0;
								}
							}

							//ligne du tableau <tr> de toute les infos du scan
							cptLigne++;
							if (cptLigne/2 == Math.round(cptLigne/2)) {
								ligne_tableau += '\n<tr class="'+ coordonee + '" id="tr_'+i+'" style="background-color:#1A2128;">';
							}else{
								ligne_tableau += '\n<tr class="'+ coordonee + '" id="tr_'+i+'">';
							}
							num_scan = nb_scan_deb + cptLigne;
							ligne_tableau += '<td class="right">' + num_scan +  '.</td>';
							ligne_tableau += '<td><input type="checkbox" name="delcase" value="'+ i +'" id="check_'+ i +'"/></td>';
							ligne_tableau +=  '<td class="marqueur"></td>';

							if(nom_j_q_q == 1)
								ligne_tableau += '<td class="left">' + nom_joueur +  '</td>';
							if(coor_q_q == 1)
								ligne_tableau += '<td class="coordonee">' + coordonee_fin +  '</td>';
							ligne_tableau += '<td>' + type_honor +  '</td>';
							ligne_tableau += '<td>' + type_joueur +  '</td>';
							ligne_tableau += '<td>' + activite_fin +  '</td>';

/* 							var indexof_inactif = inactif_normal.indexOf(nom_joueur);
							if(q_inactif == 0 && indexof_inactif != -1)
								var inactif_nom_j = '('+'<span style="color:#4A4D4A">i</span>'+')';
							else
								var inactif_nom_j = '';
							if(nom_p_q_q == 1)
								ligne_tableau += '<td>' + nom_planete + inactif_nom_j +  '</td>';
							if(q_inactif == 1 && indexof_inactif != -1)
								ligne_tableau += '<td>' + '<input type="checkbox" checked="checked" name="inactif" value="'+ nom_joueur +'"  class="inactif" id="inactif_'+ i +'"/>' +  '</td>';
							else if(q_inactif == 1 && indexof_inactif == -1)
								ligne_tableau += '<td>' + '<input type="checkbox" name="inactif" value="'+ nom_joueur +'"  class="inactif" id="inactif_'+ i +'"/>' +  '</td>'; */
							if(nom_p_q_q == 1)
								ligne_tableau += '<td title="'+nom_planete_complet.replace(/"/g, '&quot;')+'">' + nom_planete +  '</td>';

							if(date_affiche == 1)
								ligne_tableau += '<td class="right">' + date2 + '</td>';
							if(tps_vol_q == 1)
								ligne_tableau += '<td>' + accronyme_temp_vol + '</td>';
							if(prod_h_q == 1)
								ligne_tableau += '<td>' + acro_prod_h + '</td>';
							if(prod_gg != 0)
								ligne_tableau += '<td>' + acro_ress_xh + '</td>';
							if(q_vid_colo == 1)
								ligne_tableau += '<td>' + calcul_dernier_vidage(ressource_m, ressource_c, ressource_d, prod_m_h, prod_c_h, prod_d_h, date_scan, mine_m) + '</td>';

							if(question_rassemble_col == 0){
								if(pt_gt != 0)
									ligne_tableau += '<td>' + addPoints(nb_pt) +'/'+ addPoints(nb_gt) +  '</td>';
								ligne_tableau += '<td class="right">' + ressource +  '</td>';
								ligne_tableau += '<td class="right">' + cdr_aco +'</td>';
							}
							else {
								ligne_tableau += '<td class="right">' + col_cdr +  '</td>';
								if(pt_gt != 0)
									ligne_tableau += '<td>' + addPoints(nb_pt) +'/'+ addPoints(nb_gt) +  '</td>';
							}
							if(vaisseau_question != 0)
								ligne_tableau += '<td class="right">' + acronyme_vaisseau2 +  '</td>';
							if(defense_question != 0)
								ligne_tableau += '<td class="right htmlTooltip">' + acronyme_def2 +  '</td>';
							if(tech_q == 1)
								ligne_tableau += '<td class="right">' + tech_arme_d + '/' + tech_bouclier_d + '/' + tech_protect_d + '</td>';

							if(q_compteur_attaque == 1)
								ligne_tableau += '<td class="nombreAttaque">'+ attaque_deja_fait +'</td>';

							ligne_tableau += '<td> <a href="'+ espionnage +'" title="'+ text.espionner +'"> <img src="http://gf2.geo.gfsrv.net/45/f8eacc254f16d0bafb85e1b1972d80.gif" height="16" width="16"></a></td>'
							ligne_tableau += '<td> <a class="del1_scan" id="del1_scan'+i+'" title="'+ text.eff_rapp +'" ><img src="http://gf1.geo.gfsrv.net/99/ebaf268859295cdfe4721d3914bf7e.gif" height="16" width="16"></a></td>'
							var target;
							if (stockageOption.get('attaquer nouvel onglet') === 1) {
								target = '';
							} else if (stockageOption.get('attaquer nouvel onglet') === 2) {
								target = ' target="_blank"';
							} else {
								target = ' target="attaque"';
							}
							ligne_tableau += '<td> <a href="'+ url_attaquer +'" title="'+ text.att +'"'+target+'><img src="http://gf1.geo.gfsrv.net/9a/cd360bccfc35b10966323c56ca8aac.gif" height="16" width="16"></a></td>';
							if(q_mess == 1 ){
								var url_href = 'index.php?page=showmessage&session=' + info.session + '&ajax=1&msg_id=' + scan_info_i[11] + '&cat=7';
								ligne_tableau += '<td><a class="overlay" href="'+ url_href +'" id="'+ scan_info_i[11] +'"><img src="http://snaquekiller.free.fr/ogame/messages.jpg" height="16" width="16"/></a></td>';
							}
							if(simulateur != 3 && q_lien_simu_meme_onglet == 1)
								ligne_tableau += '<td> <a href="'+ url_simul +'" title="'+ text.simul +'" target="_blank"><img src="http://snaquekiller.free.fr/ogame/simuler.jpg" height="16" width="16"></a></td></tr>';
							else if(simulateur != 3 && q_lien_simu_meme_onglet != 1)
								ligne_tableau += '<td> <a href="'+ url_simul +'" title="'+ text.simul +'" target="RaideFacileSimul"><img src="http://snaquekiller.free.fr/ogame/simuler.jpg" height="16" width="16"></a></td></tr>';
							else
								ligne_tableau += '<td> <a href="#" title="'+ text.simul +'" id="simul_'+ i +'" ><img src="http://snaquekiller.free.fr/ogame/simuler.jpg" height="16" width="16"></a></td></tr>';
							if(simulateur == 3){
								ligne_tableau += '<tr style="display:none;" id="textarea_'+ i +'">'+ '<TD COLSPAN=20> <textarea style="width:100%;background-color:transparent;color:#999999;text-align:center;">'+ export_scan_simul +'</textarea></td></tr>';
							}

							/**************** BBCODE EXPORT **************/
							// bbcode_export = bbcode_export + coordonee +'==>';
							bbcode_export = bbcode_export + bbcode_baliseo[8] + couleur2[1] + bbcode_balisem[8] + nom_joueur +  ''+ bbcode_balisef[8];
							if(coor_q_q == 1){bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[2] + bbcode_balisem[8] +' ==> ' + coordonee +''+ bbcode_balisef[8];}
							// bbcode_export = bbcode_export +'==>' + activite_fin +  '';
							if(nom_p_q_q == 1){bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[3] + bbcode_balisem[8] +' ==> ' + nom_planete_complet +  ''+ bbcode_balisef[8];}
							bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[4] + bbcode_balisem[8] +' ==> ' + addPoints(parseInt(ressource_m)) +'metal ,'+ addPoints(parseInt(ressource_c)) +'cristal ,'+ addPoints(parseInt(ressource_d)) +'deut ('+ nb_pt +'/'+nb_gt +')' +  ''+ bbcode_balisef[8];
							bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[5] + bbcode_balisem[8] + ' ==> ' + addPoints(parseInt(cdr_possible_m)) +' metal ,'+ addPoints(parseInt(cdr_possible_c)) +' cristal ,'+ addPoints(Math.round(parseInt(cdr_possible)/25000))+' rc '+ bbcode_balisef[8];
							if(acronyme_vaisseau != ' '){ bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[6] + bbcode_balisem[8] + ' ==> ' + acronyme_vaisseau +  ''+ bbcode_balisef[8];}
							if(acronyme_vaisseau != ' '){ bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[7] + bbcode_balisem[8] + ' ==> ' + acronyme_def +  '\n'+ bbcode_balisef[8];}
							else{bbcode_export = bbcode_export + '\n\n';}
						} else
							nb_scan_fin++; // on rajoute un scan a afficher
					} else
						nb_scan_fin++;
				} else if (scan_info[i] && scan_info[i].indexOf(';;;;;;;;;;;;;;;;;x;;') == -1) {
					scan_info[i] = '';
					nb_scan_fin++;
				}
				else
					nb_scan_fin++;
			} else if (scan_info[i] && scan_info[i].indexOf(';;;;;;;;;;;;;;;;;x;;') == -1)
				scan_info[i] = '';
		}
		document.getElementById('corps_tableau2').innerHTML = ligne_tableau;

		/**************** BBCODE EXPORT **************/{
			var	bbcode_haut = ' ';
			if(q_centre == 1){bbcode_haut = bbcode_haut + bbcode_baliseo[10] +bbcode_balisem[10];}
			if(q_cite == 1){bbcode_haut = bbcode_haut + bbcode_baliseo[4] ;}
			bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[1] + bbcode_balisem[8] + text.th_nj +  '' + bbcode_balisef[8];
				if(coor_q_q == 1){bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[2] + bbcode_balisem[8] +' ==> ' + text.th_coo + '' + bbcode_balisef[8] ;}
				// bbcode_haut = bbcode_haut +'==>' + activite_fin +  '';
				if(nom_p_q_q == 1){bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[3] + bbcode_balisem[8] +' ==> ' + text.th_np +  ''+ bbcode_balisef[8] ;}
				bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[4] + bbcode_balisem[8] +' ==> '+ text.th_ress +' metal , cristal ,deut (pt/gt)' +  ''+ bbcode_balisef[8] ;
				bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[5] + bbcode_balisem[8] + ' ==> '+ text.cdr_pos+' metal , cristal ,'+ text.nb_rc + bbcode_balisef[8] ;
				bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[6] + bbcode_balisem[8] + ' ==> pt/gt/cle/clo/cro/vb/vc/rec/esp/bb/sat/dest/edlm/tra'+ bbcode_balisef[8];
				bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[7] + bbcode_balisem[8] + ' ==> lm/lle/llo/gauss/ion/plas/pb/gb/mic/mip \n\n'+ bbcode_balisef[8];

				bbcode_export = bbcode_export +'\n\n\n' +bbcode_baliseo[1] + bbcode_baliseo[5] + 'http://board.ogame.fr/index.php?=Thread&postID=10726546#post10726546'+ bbcode_balisem[5] +'par Raide-Facile'+bbcode_balisef[5]+ bbcode_balisef[1];
				if(q_centre == 1){bbcode_export = bbcode_export + bbcode_balisef[10];}
				if(q_cite == 1){bbcode_export = bbcode_export + bbcode_balisef[4] ;}

		document.getElementById('text_bbcode').innerHTML = bbcode_haut + bbcode_export;
		}
	}

	/*************** Affichage des MaJ et news ***************///{
		if (!info.chrome || info.tampermonkey) {
			// Sous chrome on installe le script comme une extension, donc les mises Ã  jour sont automatiques
			checkUpdate();
		}
		/*news dÃ©sactivÃ©es
			if(GM_getValue("info_version_news", true) == true)
			var display = 'block';
		else
			var display = 'none';

			var info_version = '<div id="raid_facile_news" style="display:'+ display +';">'+ GM_getValue("info_version", '') +'</div>';
		GM_setValue("info_version_news", false);*/
	//}

	/*************** anti reload automatique de la page. ***************/{
		var script = document.createElement("script");
		script.setAttribute("type","text/javascript");
		script.setAttribute("language","javascript");
		script.text = 'function reload_page() {' +
		'}';
		document.body.appendChild(script);
	}

	/*************** Option du scripts ***************/{
		var option_html = '<div id="option_script" style="display:none;text-align:center;" >'
				+ '<div class="sectionTitreOptions" id="moncomptetitre" > '+ text.moncompte +' </div>'
				+ '<div class="sectionOptions" id="mon_compte" style="display:none" >'
					+ '<table class="tableau_interne">'
					+ '<tr><td colspan="4" class="titre_interne"><strong>'+ text.vos_techno +' </strong></td></tr>'
						+ '<tr><td><label for="valeur_a">â€¢ '+ vari.tech_arm +' </label></td><td><input type="text" id="valeur_a" class="valeur_arme" value="'+ tech_arme_a +'" style="width:20px;" /></td></tr>'
						+ '<tr><td><label for="valeur_b">â€¢ '+ vari.tech_bouc +' </label></td><td><input type="text" id="valeur_b" class="valeur_boulier"  value="'+ tech_bouclier_a +'" style="width:20px;" /></td></tr>'
						+ '<tr><td><label for="valeur_p">â€¢ '+ vari.tech_pro +' </label></td><td><input type="text" id="valeur_p" class="valeur_protection"  value="'+ tech_protect_a +'" style="width:20px;" /></td></tr>'

						+ '<tr><td><label for="valeur_c">â€¢ '+ vari.tech_com +' </label></td><td><input type="text" id="valeur_c" class="valeur_combustion"  value="'+ tech_combus_a +'" style="width:20px;" /></td></tr>'
						+ '<tr><td><label for="valeur_i">â€¢ '+ vari.tech_imp +' </label></td><td><input type="text" id="valeur_i" class="valeur_impulsion"  value="'+ tech_impul_a +'" style="width:20px;" /></td></tr>'
						+ '<tr><td><label for="valeur_h">â€¢ '+ vari.tech_hyp +' </label></td><td><input type="text" id="valeur_h" class="valeur_hyper"  value="'+ tech_hyper_a +'" style="width:20px;" /></td></tr>'

					+ '<tr></tr><tr></tr>'
					+ '<tr><td colspan="4" class="titre_interne"><strong> '+ text.other_st +'</strong></td></tr>'
					+ '<tr><td><label for="valeur_co">â€¢ '+ text.q_coord +' </label></td><td><input type="text" id="valeur_co" class="valeur_coordonee" value="'+ pos_depart +'" style="width:55px;" /></td></tr>'
					+ '<tr><td><label for="vaisseau_vite">â€¢ '+ text.q_vaisseau_min +' </label></td><td><select name="vaisseau_vite" id="vaisseau_vite" style="width:160px;">'
						+ '<option value="0" id="selec_q_0" >'+ vari.pt +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 0) +')'+ '</option>'
						+ '<option value="1" id="selec_q_1">'+ vari.gt +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 1) +')'+ '</option>'
						+ '<option value="2" id="selec_q_2">'+ vari.cle +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 2) +')'+ '</option>'
						+ '<option value="3" id="selec_q_3">'+ vari.clo +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 3) +')'+ '</option>'
						+ '<option value="4" id="selec_q_4">'+ vari.cro +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 4) +')'+ '</option>'
						+ '<option value="5" id="selec_q_5">'+ vari.vb +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 5) +')'+ '</option>'
						+ '<option value="6" id="selec_q_6">'+ vari.vc +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 6) +')'+ '</option>'
						+ '<option value="7" id="selec_q_7">'+ vari.rec +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 7) +')'+ '</option>'
						+ '<option value="8" id="selec_q_8">'+ vari.esp +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 8) +')'+ '</option>'
						+ '<option value="9" id="selec_q_9">'+ vari.bb +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 9) +')'+ '</option>'
						+ '<option value="10" id="selec_q_10">'+ vari.dest +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 10) +')'+ '</option>'
						+ '<option value="11" id="selec_q_11">'+ vari.edlm +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 11) +')'+ '</option>'
						+ '<option value="12" id="selec_q_12">'+ vari.tra +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 12) +')'+ '</option>'
					+ ' </select></td></tr>'
					+ '<tr><td><label for="cdr_pourcent">â€¢ '+ text.pourcent +' </label></td><td><input type="text" id="cdr_pourcent"  value="'+ (pourcent_cdr*100) +'" style="width:20px;" /></td></tr>'
					+ '<tr><td><label for="cdr_pourcent_def">â€¢ '+ text.pourcent_def +' </label></td><td><input type="text" id="cdr_pourcent_def"  value="'+ (pourcent_cdr_def*100) +'" style="width:20px;" /></td></tr>'
				//+ '<BR /><label> '+ text.vitesse_uni +' </label>&nbsp<input type="text" id="vitesse_uni"  value="'+ vitesse_uni +'" style="width:20px;" />
					+'</table>'
				+'</div>'


				+ '<div class="sectionTitreOptions" id="choixtitre">'+text.choix_certaine_vari +' </div>'
				+ '<div class="sectionOptions" id="choix_var" style="display:none;" >'
					+ '<table class="tableau_interne">'
					+ '<tr></tr><tr></tr><tr><td colspan="4" class="titre_interne"><strong> '+ text.selec_scan_st +'</strong></td></tr>'
						+ '<tr><td><label for="val_res_min" >â€¢ '+ text.q_apartir +' </label></td><td><input type="text" id="val_res_min" class="valeur_ressource_mini"  value="'+ nb_scan_accpte +'" style="width:50px;" /> '+text.apartir + ' (Y)</td></tr>'
						+ '<tr><td><label for="valeur_cdr_mini">â€¢ '+ text.q_cdrmin +' </label></td><td><input type="text" id="valeur_cdr_mini"  value="'+ valeur_cdr_mini +'" style="width:50px;" /> (X)</td></tr>'
						+ '<tr><td><label for="valeur_tot_mini">â€¢ '+ text.q_totmin +' </label></td><td><input type="text" id="valeur_tot_mini"  value="'+ valeur_tot_mini +'" style="width:50px;" /> (Z)</td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_prend_type +' </label></td><td> <label for="prend_type0"> '+ text.rep_0_prend1 +'<span class="x">'+ valeur_cdr_mini +'</span> '+ text.rep_0_prend2 +'<span class="y">'+nb_scan_accpte +'</span></label>&nbsp<input type="radio" name="prend_type" value="0" id="prend_type0" /><br/><label for="prend_type1">'+ text.rep_1_prend1 +'<span class="x">'+ valeur_cdr_mini +'</span> '+ text.rep_1_prend2 +'<span class="y">'+nb_scan_accpte +'</span></label>&nbsp<input type="radio" name="prend_type" value="1" id="prend_type1" /><br/><label for="prend_type2">'+ text.rep_2_prend +'<span class="z">'+ valeur_tot_mini +'</span></label>&nbsp<input type="radio" name="prend_type" value="2" id="prend_type2" /></td></tr>'

					//0 date ; 1 coordonee ; 2 joueur ; 3 nom ^planette ; 4 ressource  metal; 5 cristal ; 6 deut ; 7 activite  ; 8 cdr possible ; 9 vaisseau; 10 defense ; 11 idrc ; 12 ressource total,13 reherche , 14 type de planette (lune ou planette)
					+ '<tr></tr><tr></tr><tr><td colspan="4" class="titre_interne"><strong> '+ text.classement_st+'</strong></td></tr>'
						+ '<tr><td><label for="classement">â€¢ '+ text.q_class +' </label></td><td><select name="classement" id="classement">'
							+ '<option value="0" id="selec_0" >'+ text.c_date +'</option>'
							+ '<option value="1" id="selec_1">'+ text.c_coo +'</option>'
							+ '<option value="2" id="selec_2">'+ text.c_nj +'</option>'
							+ '<option value="3" id="selec_3">'+ text.c_np +'</option>'
							+ '<option value="4" id="selec_4">'+ text.c_met +'</option>'
							+ '<option value="5" id="selec_5">'+ text.c_cri +'</option>'
							+ '<option value="6" id="selec_6">'+ text.c_deu +'</option>'
							+ '<option value="7" id="selec_7">'+ text.c_acti +'</option>'
							+ '<option value="8" id="selec_8">'+ text.c_cdr +'</option>'
							+ '<option value="17a" id="selec_9">'+ text.c_nbv +'</option>'
							+ '<option value="18a" id="selec_10">'+ text.c_nbd +'</option>'
							+ '<option value="12" id="selec_12">'+ text.c_ress +'</option>'
							+ '<option value="14" id="selec_14">'+ text.c_type +'</option>'
							+ '<option value="20c" id="selec_15">'+ text.c_cdrress +'</option>'
							+ '<option value="20d" id="selec_16">'+ text.ressourcexh +'</option>'
							+ '<option value="20e" id="selec_17">'+ text.prod_classement +'</option>'
							+ '<option value="22" id="selec_22">'+ text.c_vaisseau_valeur +'</option>'
							+ '<option value="23" id="selec_23">'+ text.c_defense_valeur +'</option>'
						+ ' </select></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_reverse +' </label></td><td> <label for="q_reverse_decroissant">'+ text.descroissant +'</label>&nbsp<input type="radio" name="q_reverse" value="1" id="q_reverse_decroissant" /> <label for="q_reverse_croissant">'+ text.croissant +'</label>&nbsp<input type="radio" name="q_reverse" value="0" id="q_reverse_croissant" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.taux_classement_ressource +' </label></td><td> <label for="q_taux_m">'+ text.taux_m +'</label>&nbsp<input type="text" id="q_taux_m"  value="'+ q_taux_m +'" style="width:50px;" />&nbsp<label for="q_taux_c">'+ text.taux_c +'</label>&nbsp<input type="text" id="q_taux_c"  value="'+ q_taux_c +'" style="width:50px;" />&nbsp<label for="q_taux_d">'+ text.taux_d +'</label>&nbsp<input type="text" id="q_taux_d"  value="'+ q_taux_d +'" style="width:50px;" /></td></tr>'

					+ '<tr></tr><tr></tr><tr><td colspan="4" class="titre_interne"><strong> '+ text.option_save_scan_st +'</strong></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_sae_auto +' </label></td><td> <label for="save_auto_scan_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="option_scan_save_o" value="1" id="save_auto_scan_oui" /> <label for="save_auto_scan_non">'+ text.non +'</label>&nbsp<input type="radio" name="option_scan_save_o" value="0" id="save_auto_scan_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.remp_scn +' </label></td><td>  <label for="scan_remplace_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="scan_remplace" value="1" id="scan_remplace_oui" /> <label for="scan_remplace_non">'+ text.non +'</label>&nbsp<input type="radio" name="scan_remplace" value="0" id="scan_remplace_non" /></td></tr>'
						+ '<tr><td><label for="jourrr">â€¢ '+ text.q_garde +' </label></td><td> <input type="text" id="jourrr" class="jours_suprime"  value="'+ jours_opt +'" style="width:20px;" /> '+ text.jours +'&nbsp<input type="text" class="heures_suprime"  value="'+ heures_opt +'" style="width:20px;" />&nbsp'+ text.heures +'&nbsp<input type="text" class="minutes_suprime"  value="'+ minutes_opt +'" style="width:20px;" />&nbsp'+ text.min +'&nbsp</td></tr>'
						+ '<tr><td><label for="nb_max_def">â€¢ '+ text.q_nb_max_def +' </label></td><td><input id="nb_max_def" type="text" value="'+ nb_max_def +'" style="width:60px;" /></td></tr>'


					+ '<tr></tr><tr></tr><tr><td colspan="4" class="titre_interne"><strong> '+ text.other_st +'</strong></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.import_q +' </label> </td><td><label for="import_rajoute">'+ text.import_rajoute +'</label>&nbsp<input type="radio" name="import_q" value="1" id="import_rajoute" />&nbsp<label for="import_remplace">'+ text.import_remplace +'</label>&nbsp<input type="radio" name="import_q" value="0" id="import_remplace" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.lien_raide_nb_pt_gt +' </label> </td><td><label for="lien_raide_nb_pt_remplit">'+ text.nb_pt +'</label>&nbsp<input type="radio" name="lien_raide_nb_pt_gt" value="1" id="lien_raide_nb_pt_remplit" />&nbsp<label for="lien_raide_nb_gt_remplit">'+ text.nb_gt +'</label>&nbsp<input type="radio" name="lien_raide_nb_pt_gt" value="0" id="lien_raide_nb_gt_remplit" />&nbsp<label for="lien_raide_nb_pt_gt2">'+ text.rien +'</label>&nbsp<input type="radio" name="lien_raide_nb_pt_gt" value="2" id="lien_raide_nb_pt_gt2" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.lien_raide_ajout_nb_pourcent +' </label></td><td> <input type="text" id="nb_pourcent_ajout_lien"  value="'+ nb_pourcent_ajout_lien +'" style="width:20px;" />&nbsp<select name="nb_ou_pourcent" id="nb_ou_pourcent"><option value="0"> %</option> <option value="1"> en plus</option></select></td></tr>'
					+'</table>'
				+'</div>'


				+ '<div class="sectionTitreOptions" id="colortitre"> '+ text.couleur_ligne +' </div>'
				+ '<div class="sectionOptions" id="color_ligne" style="display:none;" >'
					+ '<table class="tableau_interne">'
					+ '<tr><td colspan="4" class="titre_interne"><strong>'+ text.q_color +'</strong></td></tr>'
					+ '<tr><td></td><td><strong>Aller</strong></td><td><strong>Retour</strong></td></tr>'
					+ '<tr><td><label for="att1">â€¢ '+ text.attt +' </label> </td><td><input id="att1" type="text" class="att" value="'+ col_att +'" style="width:60px;background-color:'+ col_att +';" /></td><td><input id="att1_r" type="text" class="att_r" value="'+ col_att_r +'" style="width:60px;background-color:'+ col_att_r +';" /></td></tr>'
					+ '<tr><td><label for="att2">â€¢ '+ text.attt +' 2nd vague'+iconeNew('Version 8.0')+'</label> </td><td><input id="att2" type="text" class="att" value="'+ stockageOption.get('couleur attaque2') +'" style="width:60px;background-color:'+ stockageOption.get('couleur attaque2') +';" /></td><td><input id="att2_r" type="text" class="att_r" value="'+ stockageOption.get('couleur attaque2 retour') +'" style="width:60px;background-color:'+ stockageOption.get('couleur attaque2 retour') +';" /></td></tr>'
					+ '<tr><td><label for="att_group">â€¢ '+ text.ag +' </label> </td><td><input id="att_group" type="text" class="att_group" value="'+ col_att_g +'" style="width:60px;background-color:'+ col_att_g +';" /></td><td><input id="att_group_r" type="text" class="att_group_r" value="'+ col_att_g_r +'" style="width:60px;background-color:'+ col_att_g_r +';" /></td></tr>'
					+ '<tr><td><label for="det">â€¢ '+ text.det +' </label> </td><td><input id="det" type="text" class="det" value="'+ col_dest +'" style="width:60px;background-color:'+ col_dest +';" /></td><td><input id="det_r" type="text" class="det_r" value="'+ col_dest_r +'" style="width:60px;background-color:'+ col_dest_r +';" /></td></tr>'
					+ '<tr><td><label for="colEspio">â€¢ '+ localization.missions[6] +' '+iconeNew('Version 8.0')+'</label> </td><td><input id="colEspio" type="text" value="'+ stockageOption.get('couleur espionnage') +'" style="width:60px;background-color:'+ stockageOption.get('couleur espionnage') +';" /></td></tr>'
					+'</table>'
				+ '</div>'


				+ '<div class="sectionTitreOptions" id="titreaffichage"> '+ text.option_affichage +' </div>'
				+ '<div class="sectionOptions" id="choix_affichage" style="display:none;" >'
					+ '<table class="tableau_interne">'

					+ '<tr></tr><tr></tr><tr><td colspan="4" class="titre_interne"><strong> '+ text.affichage_changement_colonne +'  </strong></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_date_type +' </label>  </td><td><label for="date_type_heure"> '+ text.date_type_heure +'</label>&nbsp<input type="radio" name="q_date_type" value="1" id="date_type_heure" />  <label for="date_type_chrono">'+ text.date_type_chrono +'</label>&nbsp<input type="radio" name="q_date_type" value="0" id="date_type_chrono" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.cdr_q +' </label> </td><td> <label for="recycleur_type"> '+ text.recyclc +'</label>&nbsp<input type="radio" name="recycleur_type" value="1" id="recycleur_type_affichage_recyleur" /> <label for="recycleur_type_affichage_ressource">'+ text.ressousrce +'</label>&nbsp<input type="radio" name="recycleur_type" value="0" id="recycleur_type_affichage_ressource" /></td></tr>'

					+ '<tr></tr><tr></tr><tr><td colspan="4" class="titre_interne"><strong> '+ text.changement_boutondroite +'  </strong></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_simul +' </label>  </td><td><label for="sim_q_dra">'+ text.drago +'</label>&nbsp<input type="radio" name="q_sim" value="0" id="sim_q_dra" />&nbsp<label for="sim_q_speed">'+ text.speed +'</label>&nbsp<input type="radio" name="q_sim" value="1" id="sim_q_speed" />&nbsp<label for="sim_q_ogwin">'+ text.ogwinner +'</label>&nbsp<input type="radio" name="q_sim" value="2" id="sim_q_ogwin" />&nbsp<label for="sim_q_autre">'	+ text.simu_exte +'</label>&nbsp<input type="radio" name="q_sim" value="3" id="sim_q_autre" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.mess_q +' </label>  </td><td><label for="mess_origine_aff_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="q_mess" value="1" id="mess_origine_aff_oui" /> <label for="mess_origine_aff_non">'+ text.non +'</label>&nbsp<input type="radio" name="q_mess" value="0" id="mess_origine_aff_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.lienespi +' </label>  </td><td><label for="espionn_galaxie">'+ text.page_g +'</label>&nbsp<input type="radio" name="espionn" value="0" id="espionn_galaxie" /> <label for="espionn_fleet">'+ text.page_f +'</label>&nbsp<input type="radio" name="espionn" value="1" id="espionn_fleet" /></td></tr>'
						+ '<tr><td><label>â€¢ Le lien attaquer s\'ouvre dans '+iconeNew('Version 8.0')+'</label></td><td><select id="rf_attaquer_ouvredans" style="width:210px;"><option value="1"'+(stockageOption.get('attaquer nouvel onglet') === 1 ? ' selected':'')+'>L\'onglet actuel</option><option value="2"'+(stockageOption.get('attaquer nouvel onglet') === 2 ? ' selected':'')+'>Un nouvel onglet</option><option value="3"'+(stockageOption.get('attaquer nouvel onglet') === 3 ? ' selected':'')+'>Toujours le mÃªme nouvel onglet</option></select></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_lien_simu_meme_onglet +' </label>  </td><td><label for="q_lien_simu_meme_onglet_non">'+ text.rep_onglet_norm +'</label>&nbsp<input type="radio" name="q_lien_simu_meme_onglet" value="1" id="q_lien_simu_meme_onglet_non" /> <label for="q_lien_simu_meme_onglet_oui">'+ text.rep_onglet_autre +'</label>&nbsp<input type="radio" name="q_lien_simu_meme_onglet" value="0" id="q_lien_simu_meme_onglet_oui" /></td></tr>'

					+ '<tr></tr><tr></tr><tr><td colspan="4" class="titre_interne"><strong> '+ text.affichage_colonne +'  </strong></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.nom_j_q +' </label></td><td><label for="nom_joueur_affi_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="nom_j_q" value="1" id="nom_joueur_affi_oui" />  <label for="nom_joueur_affi_non">'+ text.non +'</label>&nbsp<input type="radio" name="nom_j_q" value="0" id="nom_joueur_affi_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.coor_q +' </label></td><td><label for="coord_affi_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="coor_q" value="1" id="coord_affi_oui" />  <label for="coord_affi_non">'+ text.non +'</label>&nbsp<input type="radio" name="coor_q" value="0" id="coord_affi_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.nom_p_q +' </label></td><td><label for="nom_planet_affi_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="nom_p_q" value="1" id="nom_planet_affi_oui" />  <label for="nom_planet_affi_non">'+ text.non +'</label>&nbsp<input type="radio" name="nom_p_q" value="0" id="nom_planet_affi_non" /></td></tr>'
//						+ '<tr><td><label>â€¢ '+ text.nom_p_q +' </label></td><td><label for="nom_planet_affi_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="nom_p_q" value="1" id="nom_planet_affi_oui" />  <label for="nom_planet_affi_non">'+ text.non +'</label>&nbsp<input type="radio" name="nom_p_q" value="0" id="nom_planet_affi_non" /> <label for="nom_planet_affi_autre">'+ text.autre_planette +'</label>&nbsp<input type="radio" name="nom_p_q" value="2" id="nom_planet_affi_autre" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_date +' </label></td><td><label for="date_affi_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="date_q" value="1" id="date_affi_oui" />  <label for="date_affi_non">'+ text.non +'</label>&nbsp<input type="radio" name="date_q" value="0" id="date_affi_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.tps_vol +' </label></td><td><label for="tps_vol_afficher_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="tps_vol" value="1" id="tps_vol_afficher_oui" />  <label for="tps_vol_afficher_non">'+ text.non +'</label>&nbsp<input type="radio" name="tps_vol" value="0" id="tps_vol_afficher_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_prod +' </label></td><td><label for="prod_h_aff_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="prod_h_q" value="1" id="prod_h_aff_oui" />  <label for="prod_h_aff_non">'+ text.non +'</label>&nbsp<input type="radio" name="prod_h_q" value="0" id="prod_h_aff_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_afficher_dernier_vid_colo +' </label></td><td><label for="aff_vid_colo_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="q_vid_colo" value="1" id="aff_vid_colo_oui" /> <label for="aff_vid_colo_non">'+ text.non +'</label>&nbsp<input type="radio" name="q_vid_colo" value="0" id="aff_vid_colo_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_pt_gt +' </label></td><td><label for="q_pt_gt_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="q_pt_gt" value="1" id="q_pt_gt_oui" /> <label for="q_pt_gt_non">'+ text.non +'</label>&nbsp<input type="radio" name="q_pt_gt" value="0" id="q_pt_gt_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.question_rassemble_cdr_ress +' </label></td><td><label for="rassemble_cdr_ress_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="rassemble_q" value="1" id="rassemble_cdr_ress_oui" /> <label for="rassemble_cdr_ress_non">'+ text.non +'</label>&nbsp<input type="radio" name="rassemble_q" value="0" id="rassemble_cdr_ress_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_ress_h +'</label></td><td><input type="text" class="ress_nb_j"  value="'+ prod_j_g +'" style="width:20px;" />&nbsp'+ text.jours +'&nbsp<input type="text" class="ress_nb_h"  value="'+ prod_h_g +'" style="width:20px;" />&nbsp'+ text.heures +'&nbsp<input type="text" class="ress_nb_min"  value="'+ prod_min_g +'" style="width:20px;" />&nbsp'+ text.min +'</td></tr> '
						+ '<tr><td><label>â€¢ '+ text.vaisseau_q +' </label></td><td><label for="vaisseau_q_n">'+ text.non +'</label>&nbsp<input type="radio" name="vaisseau_q" value="0" id="vaisseau_q_n" />  <label for="vaisseau_q_nb">'+ text.defense_nb +'</label>&nbsp<input type="radio" name="vaisseau_q" value="1" id="vaisseau_q_nb" /> <label for="vaisseau_q_val">'+ text.defense_valeur +'</label>&nbsp<input type="radio" name="vaisseau_q" value="2" id="vaisseau_q_val" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.defense_q +' </label> </td><td><label for="defense_q_n">'+ text.non +'</label>&nbsp<input type="radio" name="defense_q" value="0" id="defense_q_n" />  <label for="defense_q_nb">'+ text.defense_nb +'</label>&nbsp<input type="radio" name="defense_q" value="1" id="defense_q_nb" /> <label for="defense_q_val">'+ text.defense_valeur +'</label>&nbsp<input type="radio" name="defense_q" value="2" id="defense_q_val" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_tech +' </label></td><td><label for="tech_aff_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="tech_q" value="1" id="tech_aff_oui" />  <label for="tech_aff_non">'+ text.non +'</label>&nbsp<input type="radio" name="tech_q" value="0" id="tech_aff_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_compteur_attaque +' </label>  </td><td><label for="compteur_attaque_aff_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="q_compteur_attaque" value="1" id="compteur_attaque_aff_oui" /> <label for="compteur_attaque_aff_non">'+ text.non +'</label>&nbsp<input type="radio" name="q_compteur_attaque" value="0" id="compteur_attaque_aff_non" /></td></tr>'

					+ '<tr></tr><tr></tr><tr><td colspan="4" class="titre_interne"><strong> '+ text.affichage_global +'  </strong></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_galaxie_scan +' </label> </td><td><label for="scan_galaxie_cours_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="q_galaxie_scan" value="1" id="scan_galaxie_cours_oui" />&nbsp<label for="scan_galaxie_cours_non">'+ text.non +'</label>&nbsp<input type="radio" name="q_galaxie_scan" value="0" id="scan_galaxie_cours_non" /><br/><label for="scan_galaxie_autre">'+ text.other +'</label>&nbspG&nbsp<input type="text" id="galaxie_demande"  value="'+ galaxie_demande +'" style="width:20px;" />&nbsp<input type="radio" name="q_galaxie_scan" value="2" id="scan_galaxie_autre" /><br/><label for="scan_galaxie_plus_ou_moin">'+ text.galaxie_plus_ou_moins + '</label>&nbsp<input type="text" id="galaxie_demande_plus_moin_text"  value="'+ galaxie_plus_ou_moins +'" style="width:20px;" />&nbsp<input type="radio" name="q_galaxie_scan" value="3" id="scan_galaxie_plus_ou_moin" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.afficher_seulement +' </label>  </td><td><label for="afficher_lune_planet">'+ text.toutt +'</label>&nbsp<input type="radio" name="afficher_seulement" value="1" id="afficher_lune_planet" /> <label for="afficher_planet_seul">'+ text.planete_sel +'</label>&nbsp<input type="radio" name="afficher_seulement" value="0" id="afficher_planet_seul" />&nbsp<label for="afficher_lune_seul">'+ text.lune +'</label>&nbsp<input type="radio" name="afficher_seulement" value="2" id="afficher_lune_seul" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_afficher_ligne_def_nvis +' </label>  </td><td><label for="aff_lign_def_invisible_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="q_def_vis" value="1" id="aff_lign_def_invisible_oui" /> <label for="aff_lign_def_invisible_non">'+ text.non +'</label>&nbsp<input type="radio" name="q_def_vis" value="0" id="aff_lign_def_invisible_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_afficher_ligne_flo_nvis +' </label>  </td><td><label for="aff_lign_flot_invisible_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="q_flo_vis" value="1" id="aff_lign_flot_invisible_oui" /> <label for="aff_lign_flot_invisible_non">'+ text.non +'</label>&nbsp<input type="radio" name="q_flo_vis" value="0" id="aff_lign_flot_invisible_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.page +'</label> </td><td><input type="text" id="nb_scan_page" value="'+ nb_scan_page +'" style="width:40px;" /> </td></tr>'

					+ '<tr></tr><tr></tr><tr><td colspan="4" class="titre_interne"><strong> '+ text.other_st +'</strong></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.q_techn_sizero +' </label>  </td><td><label for="q_techzero_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="q_techzero" value="1" id="q_techzero_oui" /> <label for="q_techzero_non">'+ text.non +'</label>&nbsp<input type="radio" name="q_techzero" value="0" id="q_techzero_non" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.tableau_raide_facile +' </label> </td><td>+ <input type="text" id="tableau_raide_facile_q" value="'+ tableau_raide_facile_value +'" style="width:40px;" />&nbsppx</td></tr>'
						+ '<tr><td><label>â€¢ '+ text.question_afficher_icone_mess +' </label>  </td><td><label for="icone_parti_mess_oui">'+ text.oui +'</label>&nbsp<input type="radio" name="q_icone_mess" value="1" id="icone_parti_mess_oui" /> <label for="icone_parti_mess_non">'+ text.non +'</label>&nbsp<input type="radio" name="q_icone_mess" value="0" id="icone_parti_mess_non" /></td></tr>'

					+'</table>'
				+ '</div>'

				// option bbcode
				+ '<div class="sectionTitreOptions" id="option_bbcode"> BBCode </div>'
				+ '<div class="sectionOptions" id="option_bbcode_interieur" style="display:none;">'
					+'<table class="tableau_interne">'
					+ '<tr></tr><tr></tr><tr><td colspan="4" class="titre_interne"><strong>Couleurs : </strong></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.color +'1</label></td><td><input type="text" id="col_1" value="'+ couleur2[1] +'" style="width:60px;background-color:'+ couleur2[1] +';" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.color +'2</label></td><td><input type="text" id="col_2" value="'+ couleur2[2] +'" style="width:60px;background-color:'+ couleur2[2] +';" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.color +'3</label></td><td><input type="text" id="col_3" value="'+ couleur2[3] +'" style="width:60px;background-color:'+ couleur2[3] +';" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.color +'4</label></td><td><input type="text" id="col_4" value="'+ couleur2[4] +'" style="width:60px;background-color:'+ couleur2[4] +';" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.color +'5</label></td><td><input type="text" id="col_5" value="'+ couleur2[5] +'" style="width:60px;background-color:'+ couleur2[5] +';" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.color +'6</label></td><td><input type="text" id="col_6" value="'+ couleur2[6] +'" style="width:60px;background-color:'+ couleur2[6] +';" /></td></tr>'
						+ '<tr><td><label>â€¢ '+ text.color +'7</label></td><td><input type="text" id="col_7" value="'+ couleur2[7] +'" style="width:60px;background-color:'+ couleur2[7] +';" /></td></tr>'
					+ '<tr><td><label>â€¢ '+ text.text_cite +' </label></td><td>'+ text.oui +'&nbsp<input type="radio" name="cite" value="1" id="cite1" />&nbsp'+ text.non +'&nbsp<input type="radio" name="cite" value="0" id="cite0" /></td></tr>'
					+ '<tr><td><label>â€¢ '+ text.text_centre +' </label></td><td>'+ text.oui +'&nbsp<input type="radio" name="centre" value="1" id="centre1" />&nbsp'+ text.non +'&nbsp<input type="radio" name="centre" value="0" id="centre0" /></td></tr>'
					+ '<tr><td><label>â€¢ '+ text.balise_centre +' </label></td><td> '+ text.balise1_center +'&nbsp<input type="radio" name="centre_type" value="1" id="centre_type1" />&nbsp'+ text.balise2_center +'&nbsp<input type="radio" name="centre_type" value="0" id="centre_type0" /></td></tr>'
					+ '<tr><td><label>â€¢ '+ text.balise_url +' </label></td><td> '+ text.balise1_url +'&nbsp<input type="radio" name="url_type" value="1" id="url_type1" />&nbsp'+ text.balise2_url +'&nbsp<input type="radio" name="url_type" value="0" id="url_type0" /></td></tr>'
					+'</table>'
				+ '</div>'

				//option de langue
				+ '<div class="sectionTitreOptions" id="titrelangue"> '+ text.option_langue +' </div>'
				+ '<div class="sectionOptions" id="choix_langue" style="display:none;" >'
					+ '<BR /><label>â€¢ '+ text.q_langue +' </label>'
						+ '<select name="langue" id="langue" class="w200" style="min-width:120px">'
						+ '<option value="fr">'+ text.francais +'</option>'
						+ '<option value="en">'+ text.anglais +'</option>'
						+ '<option value="es">'+ text.spagnol +'</option>'
						+ '<option value="ro">'+ text.roumain +'</option>'
						// + '<option value="2" id="langue2">'+ text.autre +'</option>'
					+ ' </select>'
				+ '</div>'

				+ '<input type="submit" value="'+ text.save_optis +'" id="sauvegarder_option" href=# style="margin-top:5px;"/></div>';
}
//########### TABLEAU A AFFICHER ##########
		var texte_a_afficher =  '';

		/************** TABLEAU INGAME ***************/

		if(nb_scan_page != 0){// on affiche les numeros pages
			var page_bas = '<span id="page" >Page : ';
			var num_page = info.url.split('&page_r=')[1];
			var scan_info = GM_getValue('scan'+ info.serveur, '').split('#');
			var nb = scan_info.length;
			var nb_page_poss = Math.ceil(nb/nb_scan_page);

			if(num_page == undefined || num_page == 1 || num_page== ''){num_page =1;}
			for(var i=1; i<(nb_page_poss+1) ; i++)
			{
				if(i != num_page){
				page_bas = page_bas + ' <a href="'+ url_2 +'&amp;raidefacil=scriptOptions&amp;page_r='+ i +'" >'+ i +'</a>';}
				else{page_bas = page_bas + ' '+ i;}

				if(i != nb_page_poss){page_bas = page_bas +',';}
			}
			page_bas = page_bas +'</span>';
		}
		else{var page_bas = '<span id="page" ></span>';}

		var filtres = '<div id="filtres"><select name="choix_affichage2" id="choix_affichage2" class="w100">'
							+ '<option value="0" id="tout" >'+ text.toutt +'</option>'
							+ '<option value="1" id="planete_seul" >'+ text.planete_sel +'</option>'
							+ '<option value="2" id="lune_seul" >'+ text.lune +'</option>'
							+ '</select>  ';
		filtres += '<select name="filtre_actif_inactif" id="filtre_actif_inactif" class="w100">'
							+ '<option value="0" >'+ text.toutt +'</option>'
							+ '<option value="1" >'+ text.filtre_actif +'</option>'
							+ '<option value="2" >'+ text.filtre_inactif +'</option>'
							+ '</select>  ';
		filtres += text.th_nj +': <input type="text" id="filtre_joueur" value="" style="width:140px;" />  ';
		filtres += '<input type="submit" value="' + text.filtrer + '" id="change_value_affiche" href=# /></div>';

		/**************** tete tableau + les titres des colonnes ****************/{
		var titre_div = '<div id="raide_facile_titre"><div style="background-color:#1A2128;color:#6F9FC8;padding:5px;text-align:center;border-bottom: 1px solid black;font-size:18px;">'+info.nom+ ' - version ' + info.version +'</div>'
					+'<a style="font-size:10px;cursor:pointer;" id=htmlclique >[Export Forum]</a> '
					+'<a style="font-size:10px;cursor:pointer;" id=imp_exp_clique >[Import/Export de sauvegarde]</a> '
					// +'<a style="font-size:10px;cursor:pointer;" id=info_news_clique >[Info]</a> '
					+'<a style="font-size:10px;cursor:pointer;" id="optionclique" class="htmlTooltip"><div class="tooltipTitle">'+ iconeNew('Version 8.0') +'<br>Depuis la version 8.0<br>Le lien pour afficher les options est dans le menu de gauche : <div class="menu_icon"><div class="menuImage traderOverview highlighted"></div></div></div>[Option]</a></div>';

		var haut_tableau = '<table id="tableau_raide_facile" cellspacing="0" cellpadding="0">';
		var titre_colonne_tableau = '\n<thead id=haut_table2 style="background-color:#1A2128;color:#6F9FC8;"><tr><th></th><th></th><th></th>';

		if(nom_j_q_q == 1)
			titre_colonne_tableau += '<th id="cjoueur"><a>'+ text.th_nj +'</a></th>';
		if(coor_q_q == 1)
			titre_colonne_tableau += '\n<th id="ccoordonee" ><a>'+ text.th_coo +'</a></th>';
		titre_colonne_tableau += '\n<th></th>';
		titre_colonne_tableau += '\n<th></th>';
		titre_colonne_tableau += '\n<th></th>';
		if(nom_p_q_q == 1)
			titre_colonne_tableau += '\n<th id="cplanete"><a>'+ text.th_np +'</a></th>';
		if(date_affiche == 1)
			titre_colonne_tableau += '\n<th id="cdate"><a>'+ text.dated +'</a></th>\n';
		if(tps_vol_q == 1)
			titre_colonne_tableau += '\n<th id="ctmps_vol"><a>'+ text.tmp_vol_th +'</a></th>\n';
		if(prod_h_q == 1)
			titre_colonne_tableau += '\n<th id="cprod_h"><a>'+ text.prod_h_th +'</a></th>\n';
		if(prod_gg != 0)
			titre_colonne_tableau += '\n<th id="cressourcexh"><a>'+ text.ressource_xh_th +'</a></th>\n';
		if(q_vid_colo != 0)
			titre_colonne_tableau += '\n<th>'+ text.th_h_vidage +'</th>\n';
		if(question_rassemble_col == 0)
		{
			if(pt_gt != 0)
				titre_colonne_tableau += '\n<th id="cfleet">'+ text.th_fleet +'</th>';
			titre_colonne_tableau += '\n<th id="cress"><a>'+ text.th_ress +'</a></th>';
			if(cdr_q_type_affiche == 0)
				titre_colonne_tableau += '<th id="ccdr"><a>' + text.cdr_pos+'</a></th>';
			else if(cdr_q_type_affiche == 1)
				titre_colonne_tableau += '<th id="ccdr"><a>' + text.nb_recycl+'</a></th>';
		}else{
			titre_colonne_tableau += '\n<th id="ccdr_ress"><a>'+ text.th_ress_cdr_col +'</a></th>';
			if(pt_gt != 0)
				titre_colonne_tableau += '\n<th id="cfleet"><a>'+ text.th_fleet +'</a></th>';
		}
		if(vaisseau_question != 0)
			titre_colonne_tableau += '\n<th id="cnb_v'+vaisseau_question +'"><a>'+ text.th_nv +'</a></th>\n';
		if(defense_question != 0)
			titre_colonne_tableau += '<th id="cnb_d'+defense_question +'"><a>'+ text.th_nd +'</a></th>';
		if(tech_q != 0)
			titre_colonne_tableau += '\n<th>'+ text.th_tech +'</th>';
		if(q_compteur_attaque == 1)
			titre_colonne_tableau += '\n<th title="Nombre d\'attaque dans les derniÃ¨res 24h + Nombre d\'attaque en cours">#</th>';
	//Bouton
		titre_colonne_tableau += '\n<th class="RF_icon"></th>';
		titre_colonne_tableau += '\n<th class="RF_icon"></th>';
		titre_colonne_tableau += '\n<th class="RF_icon"></th>';
		titre_colonne_tableau += '\n<th class="RF_icon"></th>';
		titre_colonne_tableau += '\n<th class="RF_icon"></th>';

		titre_colonne_tableau += '\n</tr>\n</thead>\n'
						+ '\n<tbody id="corps_tableau2" > \n</tbody>'
						// + '\n<tbody id=corps_tableau2>'	+ ligne_tableau	+ '\n</tbody>'
						+ '\n</table>';
		}

		/**************** HTML/BBCODE EXPORT **************/{
			var html_bbcode = '<div id="text_html_bbcode" style="display:none;"><center style="margin-left: auto; margin-right: auto; width: 99%;">';
			html_bbcode += '<textarea style="margin-top:5px; margin-bottom:10px; width:100%;background-color:black;color:#999999;text-align:center;" id="text_html" >'+
							'</textarea>';
			html_bbcode += '<textarea style="margin-top:5px; margin-bottom:10px; width:100%;background-color:black;color:#999999;text-align:center;" id="text_bbcode" >'+
							'</textarea>';
			html_bbcode += '</center></div>';
		}

		/**************** IMPORT / EXPORT **************/{
			var import_export = '<div id="div_import_exp" style="display:none;"><center style="margin-left: auto; margin-right: auto; width: 99%;">';
			import_export += text.exportt;
			import_export += '<textarea style="margin-top:5px; margin-bottom:10px; width:100%;background-color:black;color:#999999;text-align:center;" id=area_export ></textarea>';
			import_export += text.importt;
			import_export += '<textarea style="margin-top:5px; margin-bottom:10px; width:100%;background-color:black;color:#999999;text-align:center;" id=area_import ></textarea>';
			import_export += '<a id="export_script"><input type="submit" value="'+ text.export_scan_se +'" /> </a>';
			import_export += ' <a id="export_script_ns"><input type="submit" value="'+ text.export_scan_nnse +'" /> </a>';
			import_export += ' <a id="import_scan"><input type="submit" value="'+ text.importer_scan +'" /> </a>';
			import_export += '</center></div>';
		}

		/****************************/
	texte_a_afficher = '<div id="div_raide_facile">' + titre_div + option_html + '<div id="div_tableau_raide_facile">'
					+ '\n<div id="boutons_haut"></div>' + haut_tableau + titre_colonne_tableau + '<div id="boutons_bas"></div>' + '</div>' + html_bbcode + import_export + '</div>';


	//document.getElementById('inhalt').innerHTML = texte_a_afficher;
	document.getElementById('inhalt').style.display = "none";

	var div_raide_facile = document.createElement('div');
	insertAfter(div_raide_facile,document.getElementById('inhalt'));
	div_raide_facile.outerHTML = texte_a_afficher;
	intercom.send('ogame style');
	intercom.send('tooltip', {selector:'#corps_tableau2 acronym[title]'});
	intercom.send('tooltip', {selector:'#corps_tableau2 .htmlTooltip', htmlTooltip:true});
	intercom.send('tooltip', {selector:'#raide_facile_titre #optionclique', htmlTooltip:true});


	//document.getElementById("contentWrapper").appendChild(document.createElement('div')).outerHTML = texte_a_afficher;

	//on affiche les boutons de suppression de scan .
		/**bouton en hauts **/{
			document.getElementById('boutons_haut').innerHTML = '<center><a id="plus_moins" style="float:left;"><img src="http://snaquekiller.free.fr/ogame/messraide/raidefacile%20mess/plus.png" id="img_moin_plus" height="16" width="16"/></a><a id="supr_scan_h" style="display:none;"><input type="submit" value="'+ text.supr_scan_coche +'" style="margin-bottom:5px;"/></a>  <a id="supr_scan_nn_selec_h" style="display:none;"><input type="submit" value="'+ text.supr_scan_coche_nnslec +'" style="margin-bottom:5px;"/></a></center>'
//			+ '<a id="zero_h" style="float:left;display:none;">'+ text.remis_z +'</a>'
			+ '<div id="page_h" style="float:right;display:none;">'+ page_bas +'</div>'+filtres;


			// ouvrir fermer le span du haut pour les boutons
 			document.getElementById('plus_moins').addEventListener("click", function(event){
				var img_plus_moin = document.getElementById('plus_moins');
				var supr_scan_h = document.getElementById('supr_scan_h');
				var supr_scan_nn_selec_h = document.getElementById('supr_scan_nn_selec_h');
				var supr_scan_h = document.getElementById('supr_scan_h');
//				var zero_h = document.getElementById('zero_h');
				var page_h = document.getElementById('page_h');
				if (supr_scan_h.style.display == 'none'){
					supr_scan_h.style.display = '';
					supr_scan_nn_selec_h.style.display = '';
//					zero_h.style.display = '';
					page_h.style.display = '';
					img_plus_moin.src ='http://snaquekiller.free.fr/ogame/messraide/raidefacile%20mess/moins.png';}
				else {
					supr_scan_h.style.display = 'none';
					supr_scan_nn_selec_h.style.display = 'none';
//					zero_h.style.display = 'none';
					page_h.style.display = 'none';
					img_plus_moin.src ='http://snaquekiller.free.fr/ogame/messraide/raidefacile%20mess/plus.png';}

				}, true);
			//remise a 0
//			document.getElementById("zero_h").addEventListener("click", function(event){reset(info.serveur);remlir_tableau(info.serveur, -1, 0);}, true);
			//supressions de scan
			document.getElementById("supr_scan_h").addEventListener("click", function(event){del_scan_checkbox(info.serveur, true);remlir_tableau(info.serveur, -1, 0);}, true);
			document.getElementById("supr_scan_nn_selec_h").addEventListener("click", function(event){del_scan_checkbox(info.serveur, false);remlir_tableau(info.serveur, -1, 0);}, true);
		}

		/**bouton en en bas**/{
			document.getElementById('boutons_bas').innerHTML = '<a id="zero_b" style="float:left;">'+ text.remis_z +'</a>'
				+ '<div style="float:right;">'+ page_bas +'</div><br/>'
				+ '<center><a id="supr_scan_b"><input type="submit" value="'+ text.supr_scan_coche +'" style="margin-top:5px;"/></a>  <a id="supr_scan_nn_selec_b"><input type="submit" value="'+ text.supr_scan_coche_nnslec +'" style="margin-top:5px;"/></a></center>';

			//remise a 0
			document.getElementById("zero_b").addEventListener("click", function(event){reset(info.serveur);remlir_tableau(info.serveur, -1, 0);}, true);
			//supressions de scan
			document.getElementById("supr_scan_b").addEventListener("click", function(event){del_scan_checkbox(info.serveur, true);remlir_tableau(info.serveur, -1, 0);}, true);
			document.getElementById("supr_scan_nn_selec_b").addEventListener("click", function(event){del_scan_checkbox(info.serveur, false);remlir_tableau(info.serveur, -1, 0);}, true);
		}

/////// on  trie le tableau ,affiche les lignes, on remplit en meme temps les export(bbcode/html) et colorie les lignes de flottes en vol. ///////////////////////////////////
	try{

		function remlir_tableau(serveur , classementsecondaire, type_croissant) {
			// on trie le tableau que si besoin est.
			if(parseInt(classementsecondaire) != -1)
				trie_tableau(serveur, classementsecondaire, type_croissant);
			afficher_ligne_interieur_tab(serveur);

			// si il y a le truc pour dire si il est inactif on creer les events pour que sa bouge tout seul .
			/* if(q_inactif == 1){
				var id_class;
				var numero_i_interieur;
				var check;
				var pseudo_inactif;
				var nb_afficher = document.getElementsByClassName('inactif').length;
				for(var y=0; y<nb_afficher; y++)
				{
					id_class = document.getElementsByClassName('inactif')[y].id;
					document.getElementById(id_class).addEventListener("change", function(event){
						pseudo_inactif = this.value;
						check = this.checked;
					inactif_change(pseudo_inactif,check);}, true);

				}
			} */

			// on creer les events pour les suppressions de scans via l'icone corbeille .
			var nb_scan_supr = document.getElementsByClassName('del1_scan').length;
			for(var t=0; t<nb_scan_supr; t++){
				if(document.getElementsByClassName('del1_scan')[t])
				{
					document.getElementsByClassName('del1_scan')[t].addEventListener("click", function(event){
						// on recupere le numero de scans dans le split d'enregistrement ( enregistrer dans l'id)
						var numero_scan = this.id.split('del1_scan')[1];
							scan_i = GM_getValue('scan'+ serveur, '').split('#');
							scan_i[numero_scan] = '';

							scan_i = scan_i.join('#').replace( /\#{2,}/g, "#");
							GM_setValue('scan'+ serveur, scan_i);
							suprime_espace(serveur);
							scan_i = GM_getValue('scan'+ serveur, '').split('#');
							remlir_tableau(serveur, -1, 0);
					}, true);
				}
			}

			// on colorie les lignes selon les mouvements de flottes
			$.get('/game/index.php?page=eventList&ajax=1', showAttaque, 'html');

			// on affiche les numeros de pages si un nombre de scans par page est demandÃ©
			if(nb_scan_page != 0){
					var page_bas = 'Page : ';
					var num_page = info.url.split('&page_r=')[1];
					var scan_info = GM_getValue('scan'+ serveur, '').split('#');
					var nb = scan_info.length;
					var nb_page_poss = Math.ceil(nb/nb_scan_page);

					if(num_page == undefined || num_page == 1 || num_page== ''){num_page =1;}
					for(var i=1; i<(nb_page_poss+1) ; i++)
					{
						if(i != num_page){
						page_bas = page_bas + ' <a href="'+ url_2 +'&amp;raidefacil=scriptOptions&amp;page_r='+ i +'" >'+ i +'</a>';}
						else{page_bas = page_bas + ' '+ i;}

						if(i != nb_page_poss){page_bas = page_bas +',';}
					}
				}
			else{var page_bas = '';}
			document.getElementById('page').innerHTML = page_bas;
		}
		remlir_tableau(info.serveur, -2, 0);
	}
	catch(err){
		afficher_erreur('inhalt', err);
	}

		//classer par colone croissante /decroissante grace au titre de colone
		/** Truc pour classer en cliquant sur le titre des colones **/{
		var id_th_classement = new Array("ccoordonee","cjoueur","cplanete","cdate","cprod_h","cressourcexh","cress","ccdr","ccdr_ress","cnb_v1","cnb_v2","cnb_d1","cnb_d2");
		var numero_th_classement = new Array("1","2","3","0","20e","20d","12","8","20c","17","22","18","23");
		for(var q=0; q<id_th_classement.length; q++){
			if(document.getElementById(id_th_classement[q]) != 'null' && document.getElementById(id_th_classement[q]))
			{
				document.getElementById(id_th_classement[q]).addEventListener("click", function(event){
					var id_colone_titre = this.id;
					for(var e=0; e<(id_th_classement.length); e++){
						if(id_th_classement[e] == id_colone_titre)
						{
							if(this.className != "decroissant")// soit pas de classe soit croissant
							{	remlir_tableau(info.serveur, numero_th_classement[e], 'croissant');
								this.className = 'decroissant';}
							else{remlir_tableau(info.serveur, numero_th_classement[e], 'decroissant');
								this.className = "croissant";}
						}
					}
				}, true);
			}
		}
		}

		// changement du select pour lune /planete/tout
			document.getElementById("change_value_affiche").addEventListener("click", function(event){
				afficher_seulement = document.getElementById('choix_affichage2').value;
				filtre_actif_inactif = document.getElementById('filtre_actif_inactif').value;
				filtre_joueur = document.getElementById('filtre_joueur').value;
				remlir_tableau(info.serveur, -1, 0);
			}, true);

//////////////// on coche les options et rajoute les adevents et rajoute les boutons ///////////////
	// OPTION PRESELECTIONNER
	function preselectiionne(variable1, check0 , check1){
		if(variable1 == 0)
			{document.getElementById(check0).checked = "checked";}
		else if(variable1 == 1)
			{document.getElementById(check1).checked = "checked";}
	}
/** preselectionn de toute les options selon des variables **/{
		//mon compte
			// Autre :
			document.getElementById('vaisseau_vite').value = vaisseau_lent;

		//variables
			// Selection de scan :
				if(type_prend_scan == 0)
					{document.getElementById("prend_type0").checked = "checked";}
				else if(type_prend_scan == 1)
					{document.getElementById("prend_type1").checked = "checked";}
				else if(type_prend_scan == 2)
					{document.getElementById("prend_type2").checked = "checked";}

			//Classement :
				document.getElementById('classement').value = classement;
				preselectiionne(reverse, "q_reverse_croissant" , "q_reverse_decroissant");

			//Options de sauvegarde de scan :
				preselectiionne(scan_preenrgistre, "save_auto_scan_non" , "save_auto_scan_oui");
				preselectiionne(scan_remplace, "scan_remplace_non" , "scan_remplace_oui");

			//Autre :
				preselectiionne(import_q_rep, "import_remplace" , "import_rajoute");
				preselectiionne(lien_raide_nb_pt_gt, "lien_raide_nb_gt_remplit" , "lien_raide_nb_pt_remplit");
				if(lien_raide_nb_pt_gt == 2){document.getElementById("lien_raide_nb_pt_gt2").checked = "checked";}
				document.getElementById('nb_ou_pourcent').value = nb_ou_pourcent;


		// affichages
			// Changement dans les colonnes :
				preselectiionne(q_date_type_rep, "date_type_chrono" , "date_type_heure");
				preselectiionne(cdr_q_type_affiche, "recycleur_type_affichage_ressource" , "recycleur_type_affichage_recyleur");

			//Changement dans boutons de droites :
				if(simulateur == 0)
					{document.getElementById("sim_q_dra").checked = "checked";}
				else if(simulateur == 1)
					{document.getElementById("sim_q_speed").checked = "checked";}
				else if(simulateur == 2)
					{document.getElementById("sim_q_ogwin").checked = "checked";}
				else if(simulateur == 3)
					{document.getElementById("sim_q_autre").checked = "checked";}
				preselectiionne(q_mess, "mess_origine_aff_non" , "mess_origine_aff_oui");
				preselectiionne(espionnage_lien, "espionn_galaxie" , "espionn_fleet");
				preselectiionne(q_lien_simu_meme_onglet, "q_lien_simu_meme_onglet_oui" , "q_lien_simu_meme_onglet_non");


			//Affichage de Colonne :
				preselectiionne(q_compteur_attaque, "compteur_attaque_aff_non" , "compteur_attaque_aff_oui");
				preselectiionne(q_vid_colo, "aff_vid_colo_non" , "aff_vid_colo_oui");
				preselectiionne(question_rassemble_col, "rassemble_cdr_ress_non" , "rassemble_cdr_ress_oui");
				preselectiionne(pt_gt, "q_pt_gt_non" , "q_pt_gt_oui");
				preselectiionne(prod_h_q, "prod_h_aff_non" , "prod_h_aff_oui");
				preselectiionne(date_affiche, "date_affi_non" , "date_affi_oui");
				preselectiionne(tps_vol_q, "tps_vol_afficher_non" , "tps_vol_afficher_oui");
				preselectiionne(nom_j_q_q, "nom_joueur_affi_non" , "nom_joueur_affi_oui");
				if(nom_p_q_q == 0)
					document.getElementById('nom_planet_affi_non').checked = "checked";
				else
					document.getElementById('nom_planet_affi_oui').checked = "checked";
				// else if(nom_p_q_q == 2)
					// {document.getElementById('nom_planet_affi_autre').checked = "checked";}
				preselectiionne(coor_q_q, "coord_affi_non" , "coord_affi_oui");

				preselectiionne(defense_question, "defense_q_n" , "defense_q_nb");
					if(defense_question == 2){document.getElementById("defense_q_val").checked = "checked";}
				preselectiionne(vaisseau_question, "vaisseau_q_n" , "vaisseau_q_nb");
					if(vaisseau_question == 2){document.getElementById("vaisseau_q_val").checked = "checked";}
				preselectiionne(tech_q, "tech_aff_non" , "tech_aff_oui");

			//Affichage Global :
				preselectiionne(q_galaxie_scan, "scan_galaxie_cours_non" , "scan_galaxie_cours_oui");
					if(q_galaxie_scan == 2){document.getElementById("scan_galaxie_autre").checked = "checked";}
					else if(q_galaxie_scan == 3){document.getElementById("scan_galaxie_plus_ou_moin").checked = "checked";}
				preselectiionne(afficher_seulement, "afficher_lune_planet" , "afficher_planet_seul");
					if(afficher_seulement == 2){document.getElementById("afficher_lune_seul").checked = "checked";}
				preselectiionne(q_def_vis, "aff_lign_def_invisible_non" , "aff_lign_def_invisible_oui");
				preselectiionne(q_flo_vis, "aff_lign_flot_invisible_non" , "aff_lign_flot_invisible_oui");

			//Autre :
				preselectiionne(q_techzero, "q_techzero_non" , "q_techzero_oui");
				preselectiionne(q_icone_mess, "icone_parti_mess_non" , "icone_parti_mess_oui");

			// select
			document.getElementById('choix_affichage2').value = afficher_seulement;

		/** langue **/
		document.getElementById('langue').value = langue;

		/** bbcode **/
		preselectiionne(q_cite, "cite0" , "cite1");
		preselectiionne(q_centre, "centre0" , "centre1");
		preselectiionne(center_typeq, "centre_type0" , "centre_type1");
		preselectiionne(q_url_type, "url_type0" , "url_type1");
	}

	//changement des chiffres dans les options
	document.getElementById("val_res_min").addEventListener("change", function(event){var val_res_minn = document.getElementById("val_res_min").value; document.getElementsByClassName("y")[0].innerHTML = val_res_minn; document.getElementsByClassName("y")[1].innerHTML = val_res_minn;}, true);
	document.getElementById("valeur_cdr_mini").addEventListener("change", function(event){var valeur_cdr_minis = document.getElementById("valeur_cdr_mini").value; document.getElementsByClassName("x")[0].innerHTML = valeur_cdr_minis; document.getElementsByClassName("x")[1].innerHTML = valeur_cdr_minis;}, true);
	document.getElementById("valeur_tot_mini").addEventListener("change", function(event){var valeur_tot_minis = document.getElementById("valeur_tot_mini").value; document.getElementsByClassName("z")[0].innerHTML = valeur_tot_minis;}, true);

	/******** Partie qui rajoute les events d'ouverture/fermeture de bloc avec des cliques **********/{
		// fonction qui fait change le display
		function display_change(idclique, idouvre_f, closeOther){
			document.getElementById(idclique).addEventListener("click", function(event)
				{
					var cellule = document.getElementById(idouvre_f);
					var titre = document.getElementById(idclique);
					if (cellule.style.display == 'none') {
						if (closeOther) {
							var other = document.getElementsByClassName('sectionOptions');
							for( var i=0 ; i< other.length ; i++) {
								other[i].style.display = 'none';;
							}
							other = document.getElementsByClassName('sectionTitreOptions');
							for( var i=0 ; i< other.length ; i++) {
								//other[i].style.backgroundPosition = '0 -22px';
								other[i].style.backgroundImage = "url('/cdn/img/layout/fleetOpenAll.gif')";
							}
							titre.style.backgroundImage = "url('/cdn/img/layout/fleetCloseAll.gif')";
						}
						cellule.style.display = 'block';
					}
					else {
						cellule.style.display = 'none';
						if (closeOther) {
							titre.style.backgroundImage = "url('/cdn/img/layout/fleetOpenAll.gif')";
						}
					}
				}, true);
		}

		//option ouvert/fermer
			$('#optionclique').click(afficherMasquerOptions);
			//interieur option
				display_change("moncomptetitre", 'mon_compte', true);
				display_change("choixtitre", 'choix_var', true);
				display_change("titreaffichage", 'choix_affichage', true);
				display_change("colortitre", 'color_ligne', true);
				display_change("option_bbcode", 'option_bbcode_interieur', true);
				display_change("titrelangue", 'choix_langue', true);


		//html + bbcode ouvert/fermer
			document.getElementById('htmlclique').addEventListener("click", function(event){
					var cellule2 = document.getElementById('text_html_bbcode');
					if (cellule2.style.display == 'none'){
						cellule2.style.display = 'block';
						export_html(info.serveur, false,info.url, nb_scan_page);
					}
					else{
						cellule2.style.display = 'none';
					}
				}, true);

		//info ouvert/fermer
			// display_change("info_news_clique", 'raid_facile_news', false);
		//import/export ouvert/fermer
			display_change("imp_exp_clique", 'div_import_exp', false);

		//ouvrir fermer export scan simulateur
			if(simulateur == 3){
				for(p=0 ; p<i ; p++)
				{
					if(document.getElementById('simul_'+ p))
					{
						display_change('simul_'+p , 'textarea_'+p , false);
					}
				}
			}


		}

	// sauvegarder option si clique
		document.getElementById("sauvegarder_option").addEventListener("click", function(event){
			save_option(info.serveur);
			save_optionbbcode(info.serveur);
			// On recharge la page pour que les changements prennent effet
			location.reload();
		}, true);

	//export
		document.getElementById("export_script").addEventListener("click", function(event){
			export_scan(info.serveur, true);
		}, true);
		document.getElementById("export_script_ns").addEventListener("click", function(event){
			export_scan(info.serveur, false);
		}, true);

	//import
		document.getElementById("import_scan").addEventListener("click", function(event){
			import_scan(info.serveur, import_q_rep);
		}, true);

	/**** partie pour le css du tableau avec les options + dÃ©placer le menu planette ***************/{
			// modification du css de la page et du tableau.
			tableau_raide_facile_value = parseInt(tableau_raide_facile_value);
			if (tableau_raide_facile_value !== 0) {
				// var boxWidth = parseInt($('#box').css('width'));
				// $('#box').css('width', (boxWidth + tableau_raide_facile_value) + 'px');
				setTimeout(function(){
					if (document.getElementById("banner_skyscraper")){
						var value = parseInt(document.getElementById("banner_skyscraper").offsetLeft) + tableau_raide_facile_value;
						document.getElementById("banner_skyscraper").style.left = value +'px';
					};
				}, 0);
			}
			if(document.getElementById("div_raide_facile")) {
				var value = parseInt(document.getElementById("contentWrapper").offsetWidth) + tableau_raide_facile_value;
				document.getElementById("div_raide_facile").style.minWidth = value +'px';
			}

			var style_css = '#raide_facile_titre {background-color:#0D1014; border:1px solid black; padding:5px 5px 10px 5px; font-weight:bold; text-align:center;}' +
							'\n #raid_facile_news {background-color:#0D1014; border:1px solid black; margin-top:10px; padding:5px 5px 10px 5px;}' +
							'\n #option_script {background-color:#0D1014; border:1px solid black; margin-top:10px; padding:5px 5px 10px 5px; font-size:11px; color:#848484;}' +
							'\n #div_tableau_raide_facile {background-color:#0D1014; border:1px solid black; margin-top:10px; padding:5px 5px 10px 5px;}' +
							'\n #text_html_bbcode {background-color:#0D1014; border:1px solid black; margin-top:10px; padding:5px 5px 10px 5px;}' +
							'\n #div_import_exp {background-color:#0D1014; border:1px solid black; margin-top:10px; padding:5px 5px 10px 5px;}' +
							'\n #filtres {width:100%; padding:5px 5px 5px 5px; font-size:11px; color:#848484; text-align: center;}' +

							'\n acronym{cursor: pointer;}' +
							'\n a{cursor: pointer;text-decoration:none;}' + '\n #haut_table2{background-color: #0D1014;}' +
							'\n #corps_tableau2{background-color: #13181D;}' + '\n #bas_tableau2{background-color: #0D1014;}' +
							'\n #collapse{border-collapse:separate ;}' +

							'\n #div_raide_facile {float:left; z-index:2;min-width:670px}' +
							'\n .sectionTitreOptions{text-indent:35px; text-align:left;cursor:pointer;border:1px solid black;font-weight: bold;color:#6F9FC8; background-color: #0D1014;background-attachment: scroll; background-clip: border-box; background-color: #13181D; background-image: url("/cdn/img/layout/fleetOpenAll.gif"); background-origin: padding-box; background-position: 0 0; background-repeat: no-repeat; background-size: auto auto; height: 22px; line-height: 22px; margin-right:auto; margin-left:auto; width:99%; margin-bottom:5px}'+
							'\n .sectionTitreOptions:hover{background-color: #23282D;}'+
							'\n .sectionOptions{display:block; margin-right:auto; margin-left:auto; width:95%; padding:5px; margin-top:5px; margin-bottom:5px; text-align:left; border:1px solid black; background-color:#13181D;}'+
							'\n .titre_interne{font-weight:bold;color:#5A9FC8;}'+
							'\n .tableau_interne{padding-top:0px;border-bottom:0px;}'+

							'\n #div_raide_facile input[type="submit"] {border: 1px solid #6F899D; color: white; background-color: rgb(92, 118, 139);}'+

							'\n #raid_facile_news{color:#FFFFFF;  text-align:left; font-size:11px; }'+
							'\n #raid_facile_news a {color:#6F9FC8;}'+
							'\n #raid_facile_news h4{margin-top:5px;text-indent:10px;font-size:11px;font-weight:bold;color:#6F9FC8;}'+

							'\n #tableau_raide_facile{margin-top:5px; margin-bottom:5px; background-color:#0D1014; text-align:center;border-top: 1px solid black; border-bottom: 1px solid black; font-size:10px;line-height:20px;white-space:nowrap;width:100%;}'+
							// ' .boutons_haut{text-align:right;}'+
							'\n #tableau_raide_facile td {padding-right:2px;padding-left:2px;}'+
							'\n #tableau_raide_facile td.right {text-align:right;padding-right:2px;padding-left:2px;}'+
							'\n #tableau_raide_facile th.RF_icon {width: 18px;}'+
							'\n #tableau_raide_facile th {color: #6F9FC8;}'+
							'\n #tableau_raide_facile a {color: #6F9FC8;}'+
							'\n #tableau_raide_facile a {color: #6F9FC8;}'+
							// Options
							'#div_raide_facile .tableau_interne tr:hover { color:white; }'+
							// Tableau des scans
							'#div_raide_facile .htmlTooltip > .tooltipTitle { display:none; }';

			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				node.appendChild(document.createTextNode(style_css));
				heads[0].appendChild(node);
			}

			// dÃ©tection automatique de la bonne taille pour dÃ©caler le menu des planÃ¨tes
			ajusterTailleBox();
		}

	}

(function(){var d=document.createElement("script");d.setAttribute("type","text/javascript");d.innerHTML="("+function(){var d=function(){this.listen()};d.prototype={send:function(b,a){void 0===a&&(a={});a.fromPage=!0;a.namespace="Raid facile";a.action=b;window.postMessage(a,"*")},listen:function(){window.addEventListener("message",this.received.bind(this),!1)},received:function(b){if("Raid facile"===b.data.namespace&&!0!==b.data.fromPage){var a=b.data.data;switch(b.data.action){case "ogame style":$("#div_raide_facile select").ogameDropDown();
$('#div_raide_facile input[type="submit"]').button();break;case "tooltip":b={hideOn:[{element:"self",event:"mouseleave"},{element:"tooltip",event:"mouseenter"}],skin:"cloud"};for(var c in a.settings)b[c]=a.settings[c];c=$(a.selector);if(a.htmlTooltip)for(a=0;a<c.length;++a)Tipped.create(c[a],$(">.tooltipTitle",c[a])[0],b);else for(a=0;a<c.length;++a)Tipped.create(c[a],b)}}}};(new d).send("loaded")}.toString()+")();";document.head.appendChild(d)})();
