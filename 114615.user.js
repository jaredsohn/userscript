//------------------------------------------------------------------------------
//
//          Sport4fun
// Version : 3.02
// Date    : 2012/05/22
// Auteur  : Yves Gaigé
// Status  : Beta
// Copyright (c) 2008-2012, Yves Gaigé
//
//------------------------------------------------------------------------------
//
// Ceci est un script Greasemonkey.
// Afin de l'installer vous devez disposer de l'extension Greasemonkey, depuis:
//     http://www.greasespot.net/
// Ensuite redémarrer Firefox et revisiter la page de ce script.
// Dans le menu 'Outils', il y aura un nouveau sous-menu 'Greasemonkey-->nouveau script...'.
// Accepter la configuration par défaut et installer.
// Pour désinstaller, exécuter 'Outils' -> 'Greasemonkey' -> 'Gérer les scripts...',
// selectionner "sport4fun", et cliquer Désinstaller.
//
//------------------------------------------------------------------------------
// ==UserScript==
// @name          sport4fun
// @namespace     http://sport4fun.sports.fr/gmscripts
// @description	  Modifie l'affichage et étend les possibilités de l'agenda et du forum
// @version       3.02
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include       http://sport4fun.sports.fr/*
// @icon          http://pronos.blyng.fr/favicon.ico
// ==/UserScript==
//------------------------------------------------------------------------------

//==============================================================================
// Les données globales du script
//==============================================================================

var G_mois = new Array('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
var G_options = [
		{ myopt:'permcusto',  myvar:'s4f_agenda_permanent',        mydef:0, mytxt:'Custo Agenda persistante : ',       myhlp:'Sauvegarde l\'état de l\'agenda lorsque vous masquez certaines catégories de pronos' },
		{ myopt:'pasthidden', myvar:'s4f_agenda_cache_precedents', mydef:0, mytxt:'Jours Précédents Masqués : ',       myhlp:'Masque les pronos des jours passés quel que soit leur état' },
		{ myopt:'permforum',  myvar:'s4f_forum_permanent',         mydef:0, mytxt:'Dernier forum visité : ',           myhlp:'Permet d\'aller directement dans le dernier forum visité depuis l\'accueil' },
		{ myopt:'affchall',   myvar:'s4f_challenge_affiche',       mydef:0, mytxt:'Affichage classement challenge : ', myhlp:'Permet d\'afficher le classement challenge dans le pavé jaune' },
		{ myopt:'afflive',    myvar:'s4f_live_affiche',            mydef:1, mytxt:'Affichage du live : ',              myhlp:'Supprime le pavé Direct à gauche' }
		];

var btns = {
	'bientot': 	{ 'name': 'bientot', 'cb': 'type' },
	'ouvert':  	{ 'name': 'ouvert',  'cb': 'type' },
	'ferm':    	{ 'name': 'ferm',    'cb': 'type' },
	'ferme':   	{ 'name': 'ferme',   'cb': 'type' },
	'archive': 	{ 'name': 'archive', 'cb': 'type' },
	'pronodone':    { 'name': 'picto2',  'cb': 'state' },
	'prononotdone': { 'name': 'picto1',  'cb': 'state' }
};

var G_imgChInd = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAADxElEQVQ4y12Ta1CUZRiG3/ohtpSw7o4LKCvLHohW0ZSoqdTJKFCQmCin6cBU9iNtiGCcscNgU8RqHMJQwjJREXA1MKDitALB5oIrUEIc3F2Rg8vC7rIL33LyY7/v7g1m+tEz87y/nuea+7nnfgmhdYD2cNUm0nM68GFrY8IrLsO7V5j2ZDPTEjvhrlabbBeDtLcLJYn1n0sExpx1dPpp8l81phDiMeeQkdoExXR/fhlrq/Lwzmpg8jwwrAF/6214dVswpw1grKfF529oRLLRAiH54n3pCmCi4zAZrtuvmB2p/oOftwALvQDTBEyVAbYcwJIC/mYM+NoQsOViTBb6NxuzRLK+bCEJSd5FSOe3q3ynTRdK+cVRgL0LzHcDsxTgvkRVUMDwIfB/RYNvkoOrDABb7Adrvl9x5dH1Pm0aCSHj+pQk1tnKMI4ujFkawc93UAgFMFp4J46DGz4A9D4DvlUBriYIXIkQsyd9ZwaOC3cPZfsR4vrzSy2YFuh1hSjI/RBLHrq8qIPXXQLtmdfQWb0b+Hs7eL0S3C8bwJWuBVsogDVvTQ6KqQcztzIGMXUFrrvnMNJXBHgq6AmXwNq/wbkT0ei8+jjQEwG+7V8F68GVieClZziLhLUVmSGryUzHe+Oz5jyw1nzAeYJ2HuD4ihpI1ZjiwfVFAl2PgW8OXQFcDaBeSOAukbQ1HdvwCHHV7RiwGrMwOfQrHIPZcA+kgel/C56eGHi6n8J0exSc9Wp4GzaC14Usg/hrMrgqpL9VHglcTSbKg0sduiTMzYyDvT8LxnUHrvF2OEd1mLrXAueYAeaaBHh/DwWM4VSNGtyNcExUyY8BTxJiKpIkuMqDpq2GLHi9S/h/2c2NcNRFAN1qoP8JwPQsFroi3RatfOfoz0pCfvo08CHr9+KzzpJgWPUazLnvYYldxP0FBvbbDRir2QWvQQn0baeZiAM3+jrs+p1FNYfIKmMBTWNvroi0a8QbJ7/zv8acEcJ+cRtslS/BdjmahlEGb710RfpgFM3Ey7B1vNrakBuhABrIZvFWQtLfCCKWvLXEkCkOGcr1L2NO+s6xhT7gfhAAl8V0Tgruehim9RHc9R+3mTTJj2am7lHtS49XhafukQuW/8NWWRh9PyGfJcmkFamBH9zMEFWZvhb1Dp0KGOovkt5pypb3njqobD68T3U2LT4sgy6/mR6njPwoNnTNMmDzugfJ86pNJFolf+DFLWrBOy+ESz9OUkYd3a+IPZKoTEyJUSWmxIbtTYtT7aDL6rQ4pSQ1NtTn4HPB5B/jiX0uS/G/tgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAwOS0wOS0xM1QxNTozNToyOSswMjowML0TYLIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMDktMDktMTNUMTU6MzU6MjkrMDI6MDDMTtgOAAAAAElFTkSuQmCC';
var G_imgChGrp = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAA5VJREFUOMuFk2tM02cUxl8aO3UOlaUappM1zm0uXhaRrDJ0LFtnnZGBRCXOWAJmaogu88KcmyWAAt2YijagRlYsOLFyaZlghVYtRaCVS6GlhUIjd1tooYWK0EH/z/7DD/uwmJ3kl/N+ec558p5zCKHjLRqZYCsR7nz/zdtJMVGyDP6h3KOfbYlfN3/u8S1LyP9GRWokkX63iW0oz5Y7rfUT412VMwPVFxyq36LTEtaTBcnblr5aXPrNG4RLCKP9zg/ZXocR8DqAUT3QVwy7OmlKeiKEryOvs8wbPgpuYr+zSkoI8z6D8W+BRwcDiJLPXDKiEbbBUQc4G4FnSvisEow9SYchebd5VFqon9CoXGNF+f093x+8eJ+9lKULXv2ywINDC0ll7ByWU3WqFU9vgeqWwtd1A5OmyxgsSYSn5h7t6gXgGQE1aMFknYLqPH34F1rKOLmS/h/x17N2/BrzIi+5G9IwacyCR5+JwYcn0XfzFKiBLlCjNlDDvfB1G/CXRQd7oajjeij7bTF3LSHRpTEkTMJbliiPl6sqjsBYEgtDQTSqcsPRVnQclFUPX48RvqctmLY8wZSpFvai7P6r2ze+dz2SQ/eOIvPPVafm1vSp0TCkhbrgNAy7QlCkTYe+WQxv08PZrt52Le2uBhM1cpjP/6iIYL3mH7eeTQjn0qfc31uzRk0uLWyTvRh2WmGrfwDbxAAeNVvRWKLEc00ZjQweRT7MEgky0isLPzigXcRL1BPyZc7WM1dNyZRq6BZ0Iwq0ujUwempRbtChrM6JhrYxNKjNKCuogqK4DncfO3BPOz6Tnt8tJGQ3k3CEoedSm+Mg7hbgdl8mZIMiFHbm4GJFC2o7vXg2jlksTgq97pfvDts0xErn8Gb+n5+TwPg1ETHF4S5B205kWPi4YP0WAnUiUkp7UW6hoB0ADEO0yAmY6R1rtgHqHuCa5jm+SlDSLlhBc4Pi1hwJPx9sjLq5ybW39JMXEaI93gRJP5XTBBQYgGIzIO8AZDRSE5DXApytmkIY/24ePYYAGn8GCQwKnLdh5ccLN7O5izbuiOEJOqwnqigkawBhLZBZD/xKk/YYOFMN7Ltinw7iZP30n9tg+qfM5hWhd/aHHWu1Rl62e/eKXdR+yRj23XBj1xXHDDep3f3uF5I//ObwVrzixP5ZkOUM5oKjHwasEsYGBot+Xs7JObssRJTCWp1xbF7AYR4haxcTvz3kb+HFOFFhpS4mAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTA5LTEzVDEzOjEwOjIxKzAyOjAwkFyDjQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0wOS0xM1QxMzoxMDoyMSswMjowMOEBOzEAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC'
var G_site = 'http://sport4fun.sports.fr/'
var G_cpre = 'pronostics/classement/classement-'
var G_csuf = '-t2-p1.html';
var G_picto1 = 'background-color: #FFFFFF; text-indent: 0pt; padding-top: 23px; width: 25px; height: 0px; background-position: -11px -14px;';
var G_picto2 = 'background-color: #FFFFFF; text-indent: 0pt; padding-top: 23px; width: 25px; height: 0px; background-position: -12px -63px;';

//==============================================================================
// Les fonctions utiles
//==============================================================================

//------------------------------------------------------------------------------
// Les fonctions spéciales pour s'accomoder des autres navigateurs
//------------------------------------------------------------------------------
try {
	// teste pour protéger sous FF4
	var L_perm = GM_getValue('s4f_agenda_permanent', 0);
}
catch (e) {
	if (!this.GM_getValue || this.GM_getValue.toString().indexOf('not supported')>-1) {
		this.GM_getValue = function (key, defaultValue) {
			var value = localStorage.getItem(key);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		};

		this.GM_setValue = function (key, value) {
			value = (typeof value)[0] + value;
			return localStorage.setItem(key, value);
		};

		this.GM_log = function (message) {
			console.log(message);
		};
	}
}

//------------------------------------------------------------------------------
// getMonth : retourne l'index du mois
//------------------------------------------------------------
// Parametres : <mois>
//------------------------------------------------------------------------------
function getMonth(P_month) {
	for (var i = 0; i < G_mois.length; i++) {
		if (P_month == G_mois[i]) { return(i); }
	}
	return(-1);
}

//==============================================================================
// Gestion des préférences
//==============================================================================

//------------------------------------------------------------------------------
// doCustoCreatePar : crée une option dans la boîte de custo
//------------------------------------------------------------
// Parametres :  P_node - le noeud sur lequel se rattacher (UL)
//                        P_id      - l'id de la propriété à créer
//                        P_var    - la variable GM à sauvegarder
//                        P_def    - la valeur par défaut de cette variable
//                        P_txt     - le texte à afficher pour cette propriété
//------------------------------------------------------------------------------
function doCustoCreatePar(P_node, P_id, P_var, P_def, P_txt, P_hlp) {
	var L_lst = document.createElement('LI');
	var L_txt = document.createTextNode(P_txt);
	L_lst.appendChild(L_txt);

	var L_par = document.createElement('P');
	L_par.setAttribute('class', 'low');
	L_par.setAttribute('style', 'float:right;');
	var L_lnk = document.createElement('A');
	L_lnk.href = '#';
	L_lnk.setAttribute('id', P_id);
	L_lnk.setAttribute('title', P_hlp);
	L_lnk.addEventListener('click', functionProfileGenerator(P_id, P_var, P_def), true);
	var L_status = GM_getValue(P_var, P_def);
	if (L_status == 1) {
		L_lnk.setAttribute('class', 'picto picto2');
		L_lnk.setAttribute('style', G_picto2);
	} else {
		L_lnk.setAttribute('class', 'picto picto1');
		L_lnk.setAttribute('style', G_picto1);
	}
	L_par.appendChild(L_lnk);
	L_lst.appendChild(L_par);
	P_node.appendChild(L_lst);
}

//------------------------------------------------------------------------------
// doCustoProfile : ajoute les options nécessaires dans la page profil
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doCustoProfile() {
	var L_ul = document.createElement('UL');
	L_ul.setAttribute('style', 'list-style-type: none;');

	// Crée chacune des options
	for (var i=0; i < G_options.length; i++) {
		var L_opt = G_options[i];
		doCustoCreatePar(L_ul, L_opt.myopt, L_opt.myvar, L_opt.mydef, L_opt.mytxt, L_opt.myhlp);
	}

	// Création du conteneur
	var L_fld = document.createElement('FIELDSET');
	L_fld.setAttribute('class', 'fr');
	L_fld.setAttribute('style', 'margin: 0px; padding: 0px 0px 0px 0px');
	var L_lgd = document.createElement('LEGEND');
	L_txt = document.createTextNode('Greasemonkey');
	L_lgd.appendChild(L_txt);
	L_fld.appendChild(L_lgd);
	L_fld.appendChild(L_ul);

	L_node = document.getElementById('personnel');
	L_node.appendChild(L_fld);
}

//------------------------------------------------------------------------------
// functionProfileGenerator : enregistre l'event listener
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function functionProfileGenerator(P_id, P_var, P_def) {
	return function(event) {
		doSetProfile(P_id, P_var, P_def);
		event.preventDefault();
	}
}

//------------------------------------------------------------------------------
// doSetProfile : event listener, modifie l'état des préférences
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doSetProfile(P_id, P_var, P_def) {
	var L_lnk = document.getElementById(P_id);
	var L_status = GM_getValue(P_var, P_def);
	if (L_status == 0) {
		L_lnk.setAttribute('class', 'picto picto2');
		L_lnk.setAttribute('style', G_picto2);
		L_status = 1;
	} else {
		L_lnk.setAttribute('class', 'picto picto1');
		L_lnk.setAttribute('style', G_picto1);
		L_status = 0;
	}

	// Cas spécial du challenge (reset dans le cas où on le désactive -- évite d'aller jouer avec about:config)
	if (P_var == 's4f_challenge_affiche' && L_status == 0) {
		GM_setValue('s4f_challenge_points', 0);
		GM_setValue('s4f_challenge_place',  0);
		GM_setValue('s4f_challenge_date',   0);
		GM_setValue('s4f_challenge_groupe_points', 0);
		GM_setValue('s4f_challenge_groupe_place',  0);
	}

	GM_setValue(P_var, L_status);
	GM_log('INFO: Le paramètre ' + P_var + ' est mis à ' + L_status);
}

//==============================================================================
// La custo de l'agenda
//==============================================================================

//------------------------------------------------------------------------------
// doAddAgendaButtons : ajoute les boutons sur les différents types d'affichage
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doAddAgendaButtons() {
	var L_perm = GM_getValue('s4f_agenda_permanent', 0);
	var re = /\/picto_(\w+)\.(gif|png)/;
	$('DIV#agenda DIV.node-in DIV.options DIV P IMG')
		.each(function() {
			re.exec($(this).attr('src'));
			setTimeout(showHidePronos, 0, RegExp.$1, 0);
		})
		.click(function() {
			re.exec($(this).attr('src'));
			setTimeout(showHidePronos, 0, RegExp.$1, 1);
		})
		.css('cursor', 'pointer');
}

//------------------------------------------------------------------------------
// showHidePronos : affiche ou masque les pronos du type donné
//------------------------------------------------------------
// Parametres : <type> <update>
//------------------------------------------------------------------------------
function showHidePronos() {
	L_upd = arguments[1];
	var L_type = btns[arguments[0]].name;
	var L_val = GM_getValue('s4f_agenda_' + L_type, 1);
	if (L_val != 0) L_val = 1; // security
	if (L_upd != 0) {
		L_val = 1 - L_val;
		GM_setValue('s4f_agenda_' + L_type, L_val);
	}

	GM_log('INFO: ' + ((L_val == 0) ? 'Masque ': 'Affiche') + ' les pronos du type ' + L_type);

	var L_sel = 'DIV#agenda.node1 DIV.node-in DIV.panel DIV.box-tab UL.first LI P ';
	if (btns[arguments[0]].cb === 'type') {
		L_sel += 'IMG[src*="' + L_type + '.gif"]';
	} else {
		L_sel += 'A.' + L_type;
	}

	$(L_sel)
		.parent()
		.parent()
		.each(function() { (L_val == 0) ? $(this).hide(): $(this).show(); });
}

// BUGBEG: AFFICHE AGENDA
function doSolveBugAgenda() {
	$('DIV.panel DIV.box-tab UL LI P A.picto').each(function() {
		if ($(this).css('background-position') === '-12px -63px') {
			$(this).removeClass('picto1').addClass('picto2');
		} else {
			$(this).removeClass('picto2').addClass('picto1');
		}
	});
}
// BUGEND: AFFICHE AGENDA

//------------------------------------------------------------------------------
// doAddAgendaDays : ajoute un lien sur les jours de l'agenda
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doAddAgendaDays() {
	var L_date = new Date();
	var L_jour = L_date.getDate();
	var L_mois = L_date.getMonth();

	var L_cache  = GM_getValue('s4f_agenda_cache_precedents', 0);
	$('DIV#agenda.node1 DIV.node-in DIV.panel DIV.box-tab').each(function() {
		var L_day = $('H3', this).text().split(' ');
		var L_month = getMonth(L_day[2]);
		if ((L_cache != 0) && ((L_day[1] < L_jour && L_month == L_mois) || (L_month < L_mois && L_mois != '11'))) {
			GM_log('INFO: Masque  le jour ' + $('H3', this).text());
			$('H3', this).data('display', 0);
			$('UL.first', this).children().hide();
		} else {
			$('H3', this).data('display', 1);
		}
		$('H3', this).click(function() {
			$(this).data('display', 1 - $(this).data('display'));
			if ($(this).data('display') === 1) {
				GM_log('INFO: Affiche le jour ' + $(this).text());
				$(this).next().children().show();
			} else {
				GM_log('INFO: Masque  le jour ' + $(this).text());
				$(this).next().children().hide();
			}
		});
	}).css('cursor', 'pointer');
}

//==============================================================================
// La custo du forum
//==============================================================================

//------------------------------------------------------------------------------
// doCustoForum : indique en surbrillance le message de référence de la réponse lue
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doCustoForum() {
	if (document.URL.match(/sujet-liste/) && ! document.URL.match(/groupe-sujet-liste/)) {
		// Met à jour le forum courant si nécessaire uniquement depuis la liste des sujets
		var L_perm = GM_getValue('s4f_forum_permanent', 0);
		if (L_perm == 1) {
			// Récupération du forum courant via l'URL actuelle
			var L_url = document.URL.split('/');
			var L_forum = L_url[L_url.length-2];
			var L_page  = L_url[L_url.length-1];
			var L_array = L_page.split('-');
			if (L_array.length == 3) {
				// 1ère page du forum, rien à changer
			} else if (L_array.length == 4) {
				// On reconstruit l'addresse de la première page
				L_url[L_url.length-1] = L_array[0] + '-' + L_array[1] + '-' + L_array[2] + L_array[3].substring(1, L_array[3].length);
			} else {
				// Cas théorique (pour le moment)
				GM_log('ERREUR: URL incorrecte à la page forum ' + document.URL);
				return;
			}
			L_forum = L_url.join('/');
			L_perm = GM_getValue('s4f_forum_defaut');
			if (L_perm == null || L_perm != L_forum) {
				GM_setValue('s4f_forum_defaut', L_forum);
				GM_log('INFO: Le forum par défaut est ' + L_forum);
			}
		}
	} else if (document.URL.match(/message-liste/)) {
		// Surlignage du post parent
		var L_post = $('DIV.post');
		if (L_post.length > 0) {
			$(window).scrollTop(L_post.offset().top - 110);
			L_post = L_post.parent().parent().parent();
			if (L_post.is('LI')) {
				L_post.children('DIV:eq(0)').css('background-color', '#EFF3FF');
			}
		}
	}
}

//------------------------------------------------------------------------------
// doSetForum : met le lien direct sur le forum par défaut
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doSetForum() {
	var L_perm = GM_getValue('s4f_forum_permanent', 0);
	if (L_perm == 1) {
		var L_url = GM_getValue('s4f_forum_defaut', 0);
		if (L_url == 0) {
			// Pas de défaut, rien à faire
			return;
		}
		$('#DIV.mod-forum DIV.node-in P A').attr('href', L_url);
		GM_log('INFO: Lien vers le forum par défaut ' + L_url);
	}
}

function doAddSmileys() {
	var xxx = $('#tool-smiley UL');
//	var _smileys = [ 36, 38, 49, 50, 57, 58, 60, 61, 67, 42, 39, 51, 41, 40, 37, 35, 43, 65, 55, 63, 47, 48, 64, 62, 53, 34, 54, 44, 45, 59, 52, 66, 33, 56, 46 ];
	var _smileys;
	_smileys = [ { i:36, w:15, h:15 }, { i:38, w:15, h:15 }, { i:49, w:15, h:15 }, { i:50, w:15, h:15 }, { i:57, w:15, h:15 }, { i:58, w:15, h:15 }, { i:60, w:15, h:15 }, { i:61, w:15, h:15 }, { i:67, w:22, h:15 }, { i:42, w:23, h:15 }, { i:39, w:15, h:22 }, { i:51, w:15, h:23 }, { i:41, w:20, h:20 }, { i:40, w:22, h:21 }, { i:37, w:15, h:30 }, { i:35, w:20, h:30 }, { i:43, w:24, h:45 }, { i:65, w:25, h:24 }, { i:55, w:25, h:34 }, { i:63, w:27, h:25 }, { i:47, w:28, h:24 }, { i:48, w:28, h:29 }, { i:64, w:30, h:17 }, { i:62, w:30, h:30 }, { i:53, w:33, h:36 }, { i:34, w:34, h:15 }, { i:54, w:34, h:29 }, { i:44, w:35, h:26 }, { i:45, w:37, h:31 }, { i:59, w:40, h:15 }, { i:52, w:42, h:15 }, { i:66, w:43, h:28 }, { i:33, w:45, h:20 }, { i:56, w:61, h:23 }, { i:46, w:81, h:26 } ];

//	for (var i = 33; i < 67; i++) {
//		xxx.append('<li><img src="../../../images/smileys/smiley-' + i + '.gif"></li>');
//	}
	for (var i = 0; i < _smileys.length; i++) {
		xxx.append('<li style="width:' + _smileys[i].w + 'px; height: ' + _smileys[i].h + 'px;"><img src="../../../images/smileys/smiley-' + _smileys[i].i + '.gif"></li>');
	}
	$('#tool-smiley img').click(function(){
		var smid = $('#tool-smiley img').index(this) - 1;
		if (smid > 32) {
			smid = $(this).attr('src').substring(31, 33);
			var _textarea = document.getElementById('editor-textarea');
			var cursorpos = _textarea.selectionStart;
			var selection = { type : 'smiley', start : cursorpos, end : cursorpos, text : '' };
			var smiley = '[smiley]' + smid + '[/smiley]';
			unsafeWindow.setTags(_textarea, smiley, selection);
			_textarea.selectionStart = cursorpos;
			_textarea.selectionEnd   = cursorpos;
		}
	});
}

//==============================================================================
//La gestion du classement challenge
//==============================================================================

//------------------------------------------------------------------------------
// doGetChallenge : récupère les valeurs du challenge
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doGetChallenge() {
	var L_doIt = GM_getValue('s4f_challenge_affiche', 0);
	if (L_doIt == 0) {
		// On s'occupe de rien
		return;
	}

	var L_jour = new Date();
	var L_date = 1900 + L_jour.getYear() + '/' + ( 1 + L_jour.getMonth() ) + '/' + L_jour.getDate();
	var L_gmdate = GM_getValue('s4f_challenge_date', 0);
	if (L_date == L_gmdate) {
		// Déjà récupéré aujourd'hui, il sera affiché
		return;
	}

	// on exécute la requête et on traite la réponse
	$.ajax({
		type: 'GET',
		url: G_site + G_cpre + 'challenge' + G_csuf,
		success: function(data) {
			var _pos = $('TR.me > TD > EM', data).text();
			var _pts = $('TR.me > TD.nb > B', data).text();
			if (_pos != '') {
				setTimeout(doStoreChallenge, 0, L_date, '', _pos, _pts);
			}
		}
	});

	// Récupération du challenge groupe
	$.ajax({
		type: 'GET',
		url:  G_site + G_cpre + 'challenge-groupe' + G_csuf,
		success: function(data) {
			var _pos = $('TR.me TD EM', data).text();
			var _pts = $('TR.me TD.nb > B', data).text();
			if (_pos != '') {
				setTimeout(doStoreChallenge, 0, L_date, 'groupe_', _pos, _pts);
			}
		}
	});
}

//------------------------------------------------------------------------------
// doStoreChallenge : stocke les valeurs du challenge
//------------------------------------------------------------
// Parametres : <date> <''|groupe> <pos> <pts>
//------------------------------------------------------------------------------
function doStoreChallenge() {
	// Stocke les valeurs
	GM_log('INFO: ' + arguments[0] + ' classement challenge ' + arguments[1] + ' ' + arguments[2] + 'ème (' + arguments[3] + ' points)');
	GM_setValue('s4f_challenge_date', arguments[0]);
	GM_setValue('s4f_challenge_' + arguments[1] + 'points', arguments[3]);
	GM_setValue('s4f_challenge_' + arguments[1] + 'place',  arguments[2]);
}

//------------------------------------------------------------------------------
// doSetChallenge : affiche les données du challenge
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doSetChallenge() {
	var L_doIt = GM_getValue('s4f_challenge_affiche', 0);
	if (L_doIt == 0) {
		// On s'occupe de rien
		return;
	}

	//------------------------------------------------------------
	// Challenge individuel
	var L_pts = GM_getValue('s4f_challenge_points', 0);
	var L_rnk = GM_getValue('s4f_challenge_place',  0);
	if (L_pts * L_rnk > 0) {
		(L_rnk == 1) ? L_rnk += 'er': L_rnk += 'ème';
		if ($('#mod-logged > DIV > DIV > UL.myclass LI#chalind').length > 0) {
			$('#mod-logged > DIV > DIV > UL.myclass LI#chalind EM').text(L_rnk);
		} else {
			$('#mod-logged > DIV > DIV > UL.myclass')
				.append($('<LI id="chalind" />')
				.css('background', 'transparent url(' + G_imgChInd + ') no-repeat scroll left top')
				.append($('<STRONG />').text(L_pts),
					document.createTextNode(' points '),
					$('<A />').attr('href', G_site + G_cpre + 'challenge' + G_csuf)
					.append($('<EM />').text(L_rnk))));
		}
	}

	//------------------------------------------------------------
	// Challenge Groupe
	var L_pts = GM_getValue('s4f_challenge_groupe_points', 0);
	var L_rnk = GM_getValue('s4f_challenge_groupe_place',  0);
	if (L_pts * L_rnk > 0) {
		(L_rnk == 1) ? L_rnk += 'er': L_rnk += 'ème';
		if ($('#mod-logged > DIV > DIV > UL.myclass LI#chalgrp').length > 0) {
			$('#mod-logged > DIV > DIV > UL.myclass LI#chalgrp EM').text(L_rnk);
		} else {
			$('#mod-logged > DIV > DIV > UL.myclass')
				.append($('<li />')
				.css('background', 'transparent url(' + G_imgChGrp + ') no-repeat scroll left top')
				.append($('<strong />').text(L_pts),
					document.createTextNode(' points '),
					$('<a />')
						.attr('href', G_site + G_cpre + 'challenge-groupe' + G_csuf)
						.append($('<em />')
						.text(L_rnk))));
		}
	}
}

//------------------------------------------------------------------------------
//  doCleanDirect: Supprime la boîte direct + quelques boîtes pub
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doCleanDirect() {
	var liveon = GM_getValue('s4f_live_affiche', 1);
	if (liveon == 1) { return; }

	$('#mod-livescore').remove();
	$('#adrectangle').remove();
	$('#shoppingBox').remove();
	$('#adbanner').remove();
}

//------------------------------------------------------------------------------
//  doAddRankLinks: ajoute des liens  directs vers les classements
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doAddRankLinks() {
	var rankTypes = new Array()
	rankTypes['points']  = 'general';
	rankTypes['funnies'] = 'funnies';
	rankTypes['mensuel'] = 'mensuel';

	$('#mod-logged > DIV > DIV > UL.myclass LI').each(function() {
		$('EM', this).wrap($('<A href=' + G_site + G_cpre + rankTypes[$(this).attr('class')] + G_csuf + ' />'));
	});
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//------------------------------------------------------------------------------
//  doAddDivisions: ajoute le bouton divisions
//------------------------------------------------------------
// Parametres : 
//------------------------------------------------------------------------------
function doAddDivisions(current) {
	var _class = (current) ? ' current': '';
	$('li.pronostics').after($('<li />', { 'class': 'divisions' + _class }).append($('<a />', { 'href': '/pronostics/divisions.html' }).text('Divisions')));
}

function doDivisions() {
	// Need to have specific stylesheet loaded
	$('<link/>', {
		rel: 'stylesheet',
		type: 'text/css',
		href: '/css/s4f_fr/classements.css'
	}).appendTo('head');

	// Empty the page
	$('DIV.col-left > DIV').remove();

	// Add sub navigation bar
	$('#main-nav')
		.after($('<ul />', { 'id': 'sub-nav' })
			.append($('<li />', { 'class': 'current' })
				.append($('<a />', { 'id': 'div-rank' })
					.css('cursor', 'pointer')
					.text('Classements')
					.click(function() { if (! $(this).parent().hasClass('current')) { $('#div-histo').hide(); $('#div-current').show(); $('#sub-nav LI').toggleClass('current'); } })
				)
			)
			.append($('<li />')
				.append($('<a />', { 'id': 'div-hist' })
					.css('cursor', 'pointer')
					.text('Historique')
					.click(function() { if (! $(this).parent().hasClass('current')) { $('#div-current').hide(); $('#div-histo').show(); $('#sub-nav LI').toggleClass('current'); } })
				)
			)
		);
	// Check whether user is logged in or not
	var cook = readCookie('S4F_1');
	var uid = '';
	if (cook != null) {
		var cooks = cook.split('-');
		uid = '?uid=' + cooks[0];
	}
	$('DIV.col-left')
		.append($('<div />', { 'id': 'div-current' })
			.append($('<IFRAME />', {id: 'divFrame', src: 'http://pronos.blyng.fr/divisions/div4S4F.html' + uid }).css({ width: '100%', 'min-height': '2252px' }))
		)
		.append($('<div />', { 'id': 'div-histo' }).text('L\'historique arrivera prochainement...').hide());
}

//==============================================================================
// MAIN
//==============================================================================

//------------------------------------------------------------------------------
//

GM_log('jQuery version: ' + $().jquery);

	// Basic sanity
	if ( document.documentElement.tagName == 'HTML' && document.body ) {

		// Common
		doCleanDirect();
		doAddRankLinks();
		doSetChallenge();
		doAddDivisions(document.URL.match(/divisions/));

		if (document.URL.match(/agenda/)) {
			var L_node = document.getElementById('agenda_navigation');
			if (L_node.nodeName == 'DIV') {
				// BUGBEG: AFFICHE AGENDA
				doSolveBugAgenda()
				// BUGEND: AFFICHE AGENDA

				doAddAgendaButtons();
				doAddAgendaDays();
			}
		} else if (document.URL.match(/compte/)) {
			doCustoProfile();
		} else if (document.URL.match(/forum/)) {
			doCustoForum();
			if (document.URL.match(/message-nouveau/)) {
				doAddSmileys();
			}
		} else if (document.URL.match(/divisions/)) {
			doDivisions();
		} else if (document.URL == 'http://sport4fun.sports.fr/' || document.URL == 'http://sport4fun.sports.fr/index.html') {
			doGetChallenge();
			doSetForum();
		}
	}

//------------------------------------------------------------------------------
//
// ChangeLog
// 2008-06-04 - 0.1: version initiale
// 2009-05-05 - 0.3: ajout de la gestion des pronos
// 2009-09-02 - 2.0: mise à jour pour S4F V7 (agenda + forum)
// 2009-09-02 - 2.1: bugs mineurs
// 2009-09-03 - 2.2: PronoByState n'est plus permanent, log sur le nom du picto tronqué (var locale)
// 2009-09-04 - 2.3: PronoByState de nouveau permanent
// 2009-09-04 - 2.4: Permanence du forum
// 2009-09-11 - 2.5: Gestion du classement challenge (v1) + correctif temporaire du bug agenda
// 2009-09-23 - 2.6: Gestion du classement challenge (v2 dynamique)
// 2009-09-24 - 2.7: Autoscroll du message lu
// 2009-12-19 - 2.8: 
// 2010-01-20 - 2.9: Suppression du direct + optimisation de la custo + correction de l'autoscroll
// 2010-01-26 - 2.10: Liens directs vers les classement depuis le pavé jaune
// 2010-01-28 - 2.11: Correction du bug d'affichage du challenge (bug trouvé par torual)
// 2010-02-20 - 2.12: Correction du bug de l'agenda (nouveau div qui n'est pas un jour !!!)
// 2010-03-22 - 2.13: Modification des noms de champs (mots réservés plantent sous Chrome) et challenge défault (pour par tomber sur celui du groupe)
// 2010-07-08 - 2.14: Ajout challenge groupe + correction de la récup challenge (si un slogan)
// 2010-12-21 - 2.15: Correction début d'année + Support autres browser (chrome)
// 2011-01-06 - 2.16: changement de domaine www.sport4fun.com ---> sport4fun.sports.fr
// 2011-03-24 - 2.17: fix pour FF4
// 2011-06-08 - 3.00: beta 1, avec jQuery
// 2011-09-23 - 3.00: beta 2, les divisions !!!
// 2011-10-03 - 3.00: version publique jQuery + gestion des divisions 
// 2012-05-12 - 3.01: correction du bug de gestion des arguments des fonctions appelées par setTimeout
// 2012-05-22 - 3.02: re-correction suite au retour arrière avec GM 0.9.20
//
//------------------------------------------------------------------------------
