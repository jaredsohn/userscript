// ==UserScript==
// @name				arkStecard
// @description	Stecard Tuning
// @namespace		chooz
// @author			chooz
// @include			https://ihm-pfo*.gicm.net:8443/ihm_uniqueWebArkeaV1*/stecard*
// @version			1.7.201312
// @require			http://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==
////// ***@require		  http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js

	GM_registerMenuCommand('Paramètres IHM Stecard', setParametres);

	GM_config.init('Parametres IHM Stecard',
		{
			'atm':{'label':'Automate', 'type':'text', 'size':8, 'default':'60151000'},
			'etab':{'label':'Etablissement', 'type':'select', 'options':{'1':'CMB', '2':'CMMC', '3':'CMSO', '4':'BPE', '5':'CMO', '6':'CMA', '7':'RNCM', '8':'ACCORD', '9':'TRAVELEX', '10':'ALLIANZ', '11':'ACCORD', '12':'P2Y'}, 'default': '2'},
			'bin':{'label':'BIN porteur', 'type':'text', 'size':17, 'default':''},
			'debut':{'label':'Début', 'type':'text', 'size':20, 'default':''},
			'fin':{'label':'Fin', 'type':'text', 'size':20, 'default':''}
		}
	);

var sURL = window.location.toString();

// NB : les fonctions sont lancées avec un retardateur pour laisser le temps aux frame de se charger
// peut être est il possible de les déclencher sur un evenement

// login auto
if (sURL.match(/\/connect/)) setTimeout(fillFormConnexion, 200);

// reconnexion automatique
if (sURL.match(/\/deconnect/)) {
	alert("Connexion nécessaire.");
	window.location = sURL.replace(/\/deconnect/, "/connect");
}

if (sURL.match(/menu\?/)) setTimeout(enrichirMenu, 200);

if (sURL.match(/\/stecard\/auto\/compteRendus/)) setTimeout(decalerBoutonRetour, 200);

if (sURL.match(/(main|auto|gab)/)) setTimeout(fillForm, 200);

function decalerBoutonRetour(){
	var xpBtnRetour = document.evaluate("//input[@type='button' and @value='Retour']/..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var oBtnRetour = xpBtnRetour.singleNodeValue;
	if (oBtnRetour){
		oBtnRetour.align="left";
	}
	return;
}

function fillFormConnexion(){
	document.getElementsByName('FML_NOM_USER')[0].value = 'admin';
	document.getElementsByName('FML_PASSWORD')[0].value = 'root';
	document.getElementsByName('machine')[0].value = 'MERCUTIO';
	var xPathBtnValider = document.evaluate("/html/body/form/table/tbody/tr[2]/td[2]/p[5]/input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var oBtnValider = xPathBtnValider.singleNodeValue;
	oBtnValider.focus();
	return;
}

function fillForm(){
	//var oDoc = top.frames[2].document;
	//var oDoc = unsafeWindow.frames['main'].document;
	//var oDoc = unsafeWindow.frames['main'].contentDocument;
	var oDoc = document;
	if(oDoc.getElementsByName('FML_RECH_TERM').length > 0) {
			if(oDoc.getElementsByName('FML_RECH_TERM')[0].value == '') {
			oDoc.getElementsByName('FML_RECH_TERM')[0].value = GM_config.get('atm');
		}
	}
	if(oDoc.getElementsByName('FML_NUM_TERM').length > 0) {
			if(oDoc.getElementsByName('FML_NUM_TERM')[0].value == '') {
				oDoc.getElementsByName('FML_NUM_TERM')[0].value = GM_config.get('atm');
			}
	}
	if(oDoc.getElementsByName('FML_NUM_ETAB').length > 0) {
		if(oDoc.getElementsByName('FML_NUM_ETAB')[0].type != 'hidden') {
				oDoc.getElementsByName('FML_NUM_ETAB')[0].value = GM_config.get('etab');
		}
	}
	return;
}

function fillFormListeCRO(){
	var oDoc = top.frames[2].document; // récupère le doc de la frame principale (main)
	
	oDoc.getElementsByName('FML_NUM_ETAB')[0].value = GM_config.get('etab');
	oDoc.getElementsByName('FML_RECH_TERM')[0].value = GM_config.get('atm');
	//oDoc.getElementsByName('jourToDebut')[0].value = '20';
	//oDoc.getElementsByName('moisToDebut')[0].value = '03';
	//oDoc.getElementsByName('anneeToDebut')[0].value = '2013';
	//oDoc.getElementsByName('heure_debut')[0].value = '00';
	//oDoc.getElementsByName('minute_debut')[0].value = '00';
	//oDoc.getElementsByName('jourToFin')[0].value = '20';
	//oDoc.getElementsByName('moisToFin')[0].value = '03';
	//oDoc.getElementsByName('anneeToFin')[0].value = '2013';
	oDoc.getElementsByName('heure_fin')[0].value = '23';
	oDoc.getElementsByName('minute_fin')[0].value = '59';
	oDoc.getElementsByName('Submit')[0].focus;
	return;
}

function setParametres(){
	GM_config.open();
}

function pad0(num) {
   return (num >= 0 && num < 10) ? "0" + num : num + "";
}

function enrichirMenu(){
	var oDoc = document; // top.frames[0].document; // récupère le doc de la frame menu
//	var sURL = 'auto/compteRendus/ListeCro?verouillage=0&Indice=0&Indice_pays=0&heure_debut=00&minute_debut=00&heure_fin=23&minute_fin=59&FML_RECH_TYPE=**&FML_NUM_ETAB=' + GM_config.get('etab') + '&FML_RECH_TERM=' + GM_config.get('atm') + '&index=0&token=' + oDoc.getElementById('token_value').value;
	var sURL = 'auto/compteRendus/ListeCro?verouillage=0&Indice=0&Indice_pays=0';

	var now = new Date();

	var sDebut = GM_config.get('debut');
	if (sDebut.match(/..\/..\/..../)) {
		sURL += sDebut.replace(/(..)\/(..)\/..../, "&jourToDebut=$1&moisToDebut=$2");
	} else {
		sURL += "&jourToDebut=" + pad0(now.getDate()) + "&moisToDebut=" + pad0(now.getMonth() + 1);
	}
	if (sDebut.match(/..:../)) {
		sURL += sDebut.replace(/(..):(..)/, "&heure_debut=$1&minute_debut=$2");
	} else {
		sURL += "&heure_debut=00&minute_debut=00";
	}
	
	var sFin = GM_config.get('fin');
	if (sFin.match(/..\/..\/..../)) {
		sURL += sFin.replace(/(..)\/(..)\/..../, "&jourToFin=$1&moisToFin=$2");
	} else {
		sURL += "&jourToFin=" + pad0(now.getDate()) + "&moisToFin=" + pad0(now.getMonth() + 1);
	}
	if (sFin.match(/..:../)) {
		sURL += sFin.replace(/(..):(..)/, "&heure_fin=$1&minute_fin=$2");
	} else {
		sURL += "&heure_fin=23&minute_fin=59";
	}
	
	sURL += '&type_Comp_Rendu=1';
	sURL += '&FML_RECH_TYPE=**&FML_NUM_ETAB=' + GM_config.get('etab');
	sURL += '&FML_RECH_TERM=' + GM_config.get('atm');
	sURL += '&FML_NUM_CARTE=' + GM_config.get('bin');
	sURL += '&index=0&token=' + oDoc.getElementById('token_value').value;

	var oLien = oDoc.getElementById('98;lcro');
	
	if (oLien) {
		oLien.href = sURL;
	} else {
		var oLigne = oDoc.createElement('tr');
		oLigne.innerHTML = "<td width='19' style='background-color:transparent' onmouseout='javascript:this.style.backgroundColor=&apos;transparent&apos;;' onmouseover='this.style.backgroundColor = getStyle(document.getElementById(&apos;stecard&apos;),&apos;background-color&apos;);'><a target='main' id='98;lcro' class='IHMMenuFavori' href='" + sURL + "'>Liste des CRO</a></td>";
		var oTable = oDoc.getElementById('contien').tBodies[0];
		oTable.insertBefore(oLigne, oTable.children[12]); //lastChild);
	}

	return;
}