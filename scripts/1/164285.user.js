// ==UserScript==
// @name				arkTemoins
// @description	Témoins de recette / validation / production
// @namespace		chooz
// @author			chooz
// @version			1.5.201401
// @updateURL		http://userscripts.org/scripts/source/164285.user.js
// @include			*.gicm.net*
// @include			*.intra.arkea.com*
// @include			*.b2b.arkea.com*
// @include			http*://*.cmb.*
// @include			http*://*.cmmc.*
// @include			http*://*.cmso.*
// @include			http*://*.bpe.*
// @include			http*://*.bcme.*
// @include			http*://*.abei.*
// @include			http*://*.arkea-banque-ei.*
// @exclude			http*://mail*
// @exclude			http*://maia*
// @exclude			http*://wiki*
// @exclude			http*://blog*
// @exclude			http*://jira*
// @exclude			http*://gktest*
// @exclude			http*://gsica*
// @exclude			http*://processmaker*
// @exclude			http*://go*
// ==/UserScript==

if (location.href==window.parent.window.location) { //	Empèche l'éxécution du script sur les iframes et assimilés
	GM_addStyle('															\
		body.integration{	border-top:3px Yellow solid; }		\
		body.recette{ 		border-top:3px LightGreen solid; }	\
		body.validation{	border-top:3px Orange solid; }		\
		body.production{	border-top:3px OrangeRed solid; }	\
	');

	var sPlateforme;
	var sURL = window.location.toString();
	if (sURL.match(/rec.(gicm.net|intra.arkea.com|b2b.arkea.com)/)) {	sPlateforme = 'recette';	}
	else if (sURL.match(/int.(gicm.net|intra.arkea.com|b2b.arkea.com)/)) {	sPlateforme = 'integration';	}
	else if (sURL.match(/val.(gicm.net|intra.arkea.com|b2b.arkea.com)/)) {	sPlateforme = 'validation';	}
	else {	sPlateforme = 'production';	}

	var sBodyClass = document.body.getAttribute('class');
	sBodyClass = sBodyClass ? sBodyClass + ' ' : ''; // initialise la variable si elle n'existe pas et ajoute un espace si elle existe
	document.body.setAttribute('class', sBodyClass + sPlateforme);
//} else {
	 // si frame.top =0
	 // alors set attribute body class
}
