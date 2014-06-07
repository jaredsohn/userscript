// ==UserScript==
// @name           arkAstralAdmin
// @description    AstralAdmin Tuning
// @namespace      chooz
// @author         chooz
// @version        1.6.201404
// @updateURL      http://userscripts.org/scripts/source/164691.user.js
// @include        http://*/astraladmin/*
// ==/UserScript==

// change le titre
document.title = document.title.replace(/^(.+)$/, "AstralAdmin: $1");

// clic sur le libellé des boutons radio
var oDivCentrale = document.getElementById("centre");
if (oDivCentrale && oDivCentrale.innerHTML.match(/type="radio"/)) {
	oDivCentrale.innerHTML = oDivCentrale.innerHTML.replace(/<input name="([^"]*)" value="([^"]*)" (.*)type="radio">(.*)/ig, "<label for=\"$2\"><input type=\"radio\" id=\"$2\" value=\"$2\" name=\"$1\" $3>$4</label>");
}


var oMenu = document.getElementById("gauche");
if (oMenu) {
	var sBuf = oMenu.innerHTML;

	// clic sur le menu de niveau 1 = clic sur la consultation/gestion/affectation du sous menu correspondant
	sBuf = sBuf.replace(/(<dt onclick=")(javascript:display.*)(">.*<\/dt>\s*<dd id="smenu.*>\s*<ul>\s*<li><a href=.*<\/a><\/li>\s*<li><a href=")(.*)(">(?:Consultation|Gestion|Affectation)<\/a><\/li>)/ig, "$1$2window.location='$4';$3$4$5");

	// mise en place de touches d'accessibilité
	sBuf = sBuf.replace(/(P)(lagePrefixeConsultation.do")>/i, "$1$2 title='Shift + Alt + $1' accesskey='$1'>");
	sBuf = sBuf.replace(/(T)(ransactionsProposablesInit.do")>/i, "$1$2 title='Shift + Alt + $1' accesskey='$1'>");
	sBuf = sBuf.replace(/(A)(utomateFindInit.do")>/i, "$1$2 title='Shift + Alt + $1' accesskey='$1'>");
	sBuf = sBuf.replace(/(E)(mplacementFindInit.do")>/i, "$1$2 title='Shift + Alt + $1' accesskey='$1'>");
	sBuf = sBuf.replace(/(M)(ouvementFindInit.do")>/i, "$1$2 title='Shift + Alt + $1' accesskey='$1'>");
	sBuf = sBuf.replace(/(C)(achesa.do")>/i, "$1$2 title='Shift + Alt + $1' accesskey='$1'>");

	oMenu.innerHTML = sBuf;
}


// récupérer le nom de l'action en cours
var sAction = window.location.href.replace(/http.*\/astraladmin\/(.*\.do).*/, "$1");
var oInputDefaut;
var oTableResultat;
switch (sAction) {
	case "PlagePrefixeConsultation.do":
		oInputDefaut = document.getElementById('recherche');
		break;
	case "AutomateFindSubmit.do":	
		oTableResultat = document.getElementById('atm');
	case "AutomateFindInit.do":
		oInputDefaut = document.getElementById('noEpc');
		break;
	case "EmplacementFindSubmit.do":
		oTableResultat = document.getElementById('epc');
	case "EmplacementFindInit.do":
		oInputDefaut = document.getElementById('noEpcRech');
		break;
	case "MouvementFindInit.do":
	case "MouvementFindSubmit.do":
		oInputDefaut = document.getElementById('noEpcMouv');
		break;
	default:
		//alert(sAction);
}	

// mettre le focus sur le champs de saisi par défaut
if (oInputDefaut) {
	oInputDefaut.focus();
	oInputDefaut.select();
}

// débrancher directement sur le résultat trouvé s'il y en a un seul et unique
if (oTableResultat && oTableResultat.tBodies[0].rows.length == 1) {
	window.location = oTableResultat.tBodies[0].rows[0].firstElementChild.firstElementChild.href;
}


// compléter automatiquement les numéros d'emplacement à 5 chiffres
function completerNoEmplacement(event, sInputEmplacement) {
	var oEmplacement = document.forms[0].elements[sInputEmplacement];
	// suffixe "000" si un numéro d'emplacement à 5 chiffres a été saisi
	oEmplacement.value = oEmplacement.value.replace(/^(\d{5})$/, "$1000");

	// lance la procédure normale
	soumettreRecherche();
}

var formRech = document.forms[0];
if (formRech.name == "findAutomateForm") { formRech.onsubmit = function(event) { completerNoEmplacement(event, "noEpc"); }; }
if (formRech.name == "findEmplacementForm") { formRech.onsubmit = function(event) { completerNoEmplacement(event, "noEpcRech"); }; }
if (formRech.name == "findMouvementForm") { formRech.onsubmit = function(event) { completerNoEmplacement(event, "noEpcMouv"); }; }
