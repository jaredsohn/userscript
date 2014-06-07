// ==UserScript==
// @name           zSmall
// @description    Affichage optimisé pour petits écrans.
// @namespace      http://www.siteduzero.com/
// @include        http://www.siteduzero.com/*
// @include        http://sciences.siteduzero.com/*
// @copyright      Romain Porte (MicroJoe)
// @version        1.0.3
// @license        GPL v3 http://www.gnu.org/licenses/gpl.html
// @grant          none
// ==/UserScript==

(function(){

	// Masque le header

	var elmts = document.getElementsByTagName('div');
	for (var i = elmts.length - 1; i >= 0; i--) {
		if (elmts[i].className == 'header_gauche' || elmts[i].className == 'header_droit') {
			elmts[i].style.display = 'none';
		}
	};

	document.getElementById('header').style.height = '24px';

	// Ajoute une entrée « Accueil » dans la speedbar

	var cours = document.getElementById('speed_cours');
		var elm = document.createElement('li');
			var elm_a = document.createElement('a');
			elm_a.innerHTML = '<span>Accueil</span>';
			elm_a.href = '/';
		elm.appendChild(elm_a);
		elm.style.background = 'none';
	cours.parentNode.insertBefore(elm, cours);

	// Masque les entrées inutiles de la speedbar

	var useless = ['speed_etudes', 'speed_job', 'speed_boutique', 'add_on_ope_cle', 'zozor_position'];
	for (var i = useless.length - 1; i >= 0; i--) {
		var elem = document.getElementById(useless[i])
		if (elem != null) { elem.style.display = 'none'; };
	};
	
})();