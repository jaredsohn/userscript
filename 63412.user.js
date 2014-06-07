// ==UserScript==
// @name           HyperCeri
// @namespace      hyperCeri
// @description    Affiche le planning CERI de la semaine courante correspondant a l'utilisateur. Infos : stanislas oger, pierre gotab
// @include        http://www.univ-avignon.fr/fileadmin/CERI/edt/index.htm
// @version        0.2
// ==/UserScript==


// fonction anonyme pour ne pas que le script entre en conflit avec le JS deja present dans la page
(function(){

/****************************/
/*  variables du programme  */
/****************************/

var moi = GM_getValue('moi', null); // se souvient du "moi"
GM_setValue('quand', ''); // ne garde pas la date d'une fois sur l'autre


/***************************/
/*  fonctions utilitaires  */
/***************************/

function text2mois (m) {
	return ({"janvier":0,
		"février":1,
		"mars":2,
		"avril":3,
		"mai":4,
		"juin":5,
		"juillet":6,
		"aout":7,
		"septembre":8,
		"octobre":9,
		"novembre":10,
		"décembre":11})[m];
}

function selectWeek(week) {
	// recuperation de la liste des semaines
	var _selects = document.getElementsByTagName('select');
	var _options = _selects[1].getElementsByTagName('option');

	if(!week) week = (new Date()).getTime();
	var reg_date = new RegExp("\\d+", "");
	var reg_decoupage = new RegExp("[0-9a-zA-Zéû]+", "gi");

	// recherche de la semaine dont la fin est >= a la date du jour
	var i_date = 0;
	for (var i=0; i<_options.length; i++) {
	
		if (reg_date.test(_options[i].text)) {
			var res = _options[i].text.match(reg_decoupage);
			if (res != null) {
				var d = new Date();
				d.setDate(res[res.length-3]);
				d.setMonth(text2mois(res[res.length-2]));
				d.setFullYear(res[res.length-1]);
				if (d.getTime() >= week) {
					i_date = i;
					break;
				}
			}
		}
	}

	// clique sur la semaine courante
	_options[i_date].selected = true;
	_options[i_date].style.backgroundColor = '#DDF';
	unsafeWindow.composerGrille(_options[i_date].value);
}


/**********/
/*  main  */
/**********/
setTimeout(function(){

// clique sur l'emploi du temps enseignant
unsafeWindow.composerBandeauRessource ('grEnseignant');

// recuperation de la liste des enseignants
var _selects = document.getElementsByTagName('select');
var _options = _selects[0].getElementsByTagName('option');

// recherche de la personne
var i_moi = 0;
while (i_moi < _options.length && _options[i_moi].value != moi) {i_moi++;}

// pas trouvée : demande qui on est !
if(moi === null || i_moi == _options.length) {
	unsafeWindow.composerBandeauPeriode = function (moi) {
		window.setTimeout(function(){GM_setValue('moi', moi);}, 0); // définit qui est "moi"
		unsafeWindow.history.go(0); // recharge
	}
	
	_options[0].text = "Choisissez votre nom !";
	return;
	
} else {
	_options[0].text = "Changez qui vous êtes !";
	// fais un hook pour récupérer la sélection éventuelle du 1er item (pour changer le "moi")
	unsafeWindow.__composerBandeauPeriode = unsafeWindow.composerBandeauPeriode;
	unsafeWindow.composerBandeauPeriode = function hook_composerBandeauPeriode(moi) {
		if(moi == "vide") {
			window.setTimeout(function(){GM_setValue('moi', '');}, 0);
			unsafeWindow.history.go(0); // recharge
			//unsafeWindow.composerBandeauPeriode = unsafeWindow.__composerBandeauPeriode; // rétablit le comportement par défaut
			//unsafeWindow.composerBandeauRessource('grEnseignant'); // réinitialise la liste
		} else {
			// permet de naviguer à travers les enseignants pour une date donnée
			var _arguments = arguments;
			window.setTimeout(function(){
				var quand = GM_getValue('quand', null);
				unsafeWindow.__composerBandeauPeriode.apply(unsafeWindow, _arguments); // réalise l'action (comportement par défaut)
				if(quand !== null && quand !== "vide") { // le "quand" est défini
					selectWeek(quand);
				} else { // sinon, prend la date du jour
					selectWeek();
				}
			}, 0);
		}
		
		/*var selectPeriod = (document.getElementsByTagName('select'))[1];
		selectPeriod.parentNode.insertBefore(document.createTextNode("<"), selectPeriod);
		selectPeriod.parentNode.insertBefore(document.createTextNode(">"), selectPeriod.nextSibling);*/
	}
}

// permet de sauver la date sélectionnée pour naviguer entre les enseignants
unsafeWindow.__composerGrille = unsafeWindow.composerGrille;
unsafeWindow.composerGrille = function hook_composerGrille(quand) {
	
	_selects = document.getElementsByTagName('select');
	_options = _selects[1].getElementsByTagName('option');

	var reg_date = new RegExp("\\d+", "");
	var reg_decoupage = new RegExp("[0-9a-zA-Zéû]+", "gi");

	// recherche de la semaine sélectionnée
	i_date = 0;
	var found = false;
	for(i=0; i<_options.length; i++) {
		if(_options[i].value == quand) {
			var res = _options[i].text.match(reg_decoupage);
			if (res != null) {
				var d = new Date();
				d.setDate(res[res.length-3]);
				d.setMonth(text2mois(res[res.length-2]));
				d.setFullYear(res[res.length-1]);
				if(d != NaN) {
					window.setTimeout(function(){GM_setValue('quand', d.getTime().toString());}, 0); // définit le "quand"
					found = true;
				}
			}
		}	
	}
	if(!found) window.setTimeout(function(){GM_setValue('quand', '');}, 0);
	
	unsafeWindow.__composerGrille.apply(unsafeWindow, arguments); // réalise l'action
}


// clique sur la personne
_options[i_moi].selected = true;
_options[i_moi].style.backgroundColor = '#DDF';
unsafeWindow.composerBandeauPeriode(_options[i_moi].value);

}, 100);


})();




