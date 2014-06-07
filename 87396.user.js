// ==UserScript==

// @name           Tools_Ogame_AutoSend_Expedition
// @namespace      monkey
// @version        1.48
// @author         MonkeyIsBack
// @include        http://*ogame.*/game/index.php?page=showmessage&session=*
// @include        http://*ogame.*/game/index.php?page=movement&session=*

// ==/UserScript==

/************************************************************************
 *                                Rappel :                              *
 *          Vos expéditions sont sauvegardées à titre personnel         *
 * Vous pouvez "feinter" greasemonkey on modifiant les données envoyées *
 *  Mais voyez d'abord si il y a une quelconque utilité à faire ceci =) *
 ************************************************************************/

 
/***********************************************
 *           Fonctions des Données             *
 ***********************************************/


function correspondanceUnivers() {

	// Adresse d'un script quelconque
	var addr = document.getElementsByTagName('script')[0].getAttribute('src');
	
	// Récupération du numéro d'uni
	addr = addr.split('/')[2];
	addr = addr.split('.')[0];

	// En cas d'uni à nom
	var univers = Array();
	univers['uni101'] = 'Andromeda';
	univers['uni102'] = 'Barym';
	univers['uni103'] = 'Capella';
	univers['uni104'] = 'Draco';
	univers['uni105'] = 'Electra';
	univers['uni106'] = 'Fornax';
	univers['uni107'] = 'Gemini';
	univers['uni108'] = 'Hydra';
	univers['uni109'] = 'Io';
	univers['uni110'] = 'Jupiter';

	// En cas d'uni à chiffre
	if(!univers[addr]) {
		var universNumero = addr.replace('uni', '');
		univers[addr] = 'Univers ' + universNumero;
	}

	// Renvoi de la donnée voulue
	return univers[addr];
}


/**************************************************
 *             Fonctions du login                 *
 **************************************************/


function loginStart() {
	if (GM_getValue('MToolsPseudo') == null || GM_getValue('MToolsPass') == null ) {
		showFormLogin();
	} else {
		verifHttpLogin(GM_getValue('MToolsPseudo'), GM_getValue('MToolsPass'));
	}
}


function showFormLogin() {
	var divLogs = document.createElement('div');

	var formLogs = document.createElement('form');
	formLogs.id = 'gmData';
	formLogs.style.display = 'inline';

	var spanLogs = document.createElement('span');
	spanLogs.style.color = 'red';
	spanLogs.appendChild(document.createTextNode('Logins Monkey Tool\'s requis'));

	var inputPseudoLogs = document.createElement('input');
	inputPseudoLogs.setAttribute('type', 'text');
	inputPseudoLogs.size = 8;
	inputPseudoLogs.name = 'pseudo';
	inputPseudoLogs.value = 'Pseudo';
	inputPseudoLogs.style.border = '1px solid #4466CC';
	inputPseudoLogs.style.color = 'white';
	inputPseudoLogs.style.backgroundColor = '#2244AA';

	var inputPassLogs = document.createElement('input');
	inputPassLogs.setAttribute('type', 'password');
	inputPassLogs.size = 8;
	inputPassLogs.name = 'pass';
	inputPassLogs.value = 'aaaa';
	inputPassLogs.style.border = '1px solid #4466CC';
	inputPassLogs.style.color = 'white';
	inputPassLogs.style.backgroundColor = '#2244AA';

	var linkSaveLogs = document.createElement('a');
	linkSaveLogs.appendChild(document.createTextNode('Sauvegarder'));
	linkSaveLogs.addEventListener("click", (function (){testHttpLogin(document.forms.namedItem("gmData").elements.namedItem("pseudo").value, document.forms.namedItem("gmData").elements.namedItem("pass").value)}), true);

	var linkMTools = document.createElement('a');
	linkMTools.href = URLDomaine + 'index.php?action=inscription';
	linkMTools.target = '_blank';
	linkMTools.style.color = '';
	linkMTools.appendChild(document.createTextNode('Inscription'));
	
	formLogs.appendChild(inputPseudoLogs);
	formLogs.appendChild(document.createTextNode(' - '));
	formLogs.appendChild(inputPassLogs);
	formLogs.appendChild(document.createTextNode(' - '));
	formLogs.appendChild(linkSaveLogs);
	formLogs.appendChild(document.createTextNode(' - '));
	formLogs.appendChild(linkMTools);
	divLogs.appendChild(spanLogs);
	divLogs.appendChild(document.createTextNode(' : '));
	divLogs.appendChild(formLogs);
	CadreExpe.appendChild(divLogs);

	mToolsStatutTexteSpanB.removeChild(mToolsStatutTexteB);
	mToolsStatutTexteB = document.createTextNode('Identifiants Requis');
	mToolsStatutTexteSpanB.appendChild(mToolsStatutTexteB);
}


// Actions du lien Sauvegarder
function sauvegarderLogs(Pseudo, Pass) {
	GM_setValue('MToolsPseudo', Pseudo);
	GM_setValue('MToolsPass', Pass);
}


function testHttpLogin(Pseudo, Pass) {
	GM_xmlhttpRequest({
		method: "GET",
		url: URLDomaine + URLPage + "?Pseudo=" + Pseudo + "&Pass=" + Pass,
		onload: function(response) {
			if (response.responseText == 'ok ' + Pseudo) {
				sauvegarderLogs(Pseudo, Pass);
				alert('Pseudo ' + Pseudo + ' valide et enregistré');
				loginValide = true;
				uploadExpe();
			} else {
				alert('Pseudo non enregistré, veuillez le vérifier');
			}
		}
	});
}


function verifHttpLogin(Pseudo, Pass) {
	GM_xmlhttpRequest({
		method: "GET",
		url: URLDomaine + URLPage + "?Pseudo=" + Pseudo + "&Pass=" + Pass,
		onload: function(response) {
			if (response.responseText == 'ok ' + Pseudo) {

				mToolsStatutTexteSpan.removeChild(mToolsStatutTexte);
				mToolsStatutTexte = document.createTextNode('Login Valide : ' + Pseudo + ' - Envoi en cours - ');
				mToolsStatutTexteSpan.appendChild(mToolsStatutTexte);

				loginValide = true;
				uploadExpe();
			} else {
				alert('Erreur sur les logins !!');
				showFormLogin();
			}
		}
	});
}


/**************************************************
 *             Fonctions de l'upload              *
 **************************************************/


function uploadExpe() {
	if(loginValide == true) {
		envoiHttpExpe();
	}
}


function envoiHttpExpe() {
	GM_xmlhttpRequest({
		method: "POST",
		url: URLDomaine + URLPage + "?Pseudo=" + GM_getValue('MToolsPseudo') + "&Pass=" + GM_getValue('MToolsPass'),
		data: "&Destinataire=" + Destinataire + "&Objet=" + Objet + "&Date=" + Date + "&ResultatExpe=" + ResultatExpe + "&Univers=" + Univers + "&Debug=0",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			mToolsStatutTexteSpan.removeChild(mToolsStatutTexte);
			mToolsStatutTexte = document.createTextNode('Login Valide : ' + GM_getValue('MToolsPseudo') + ' - Envoi en effectué - ');
			mToolsStatutTexteSpan.appendChild(mToolsStatutTexte);
			mToolsStatutTexteSpanB.removeChild(mToolsStatutTexteB);
			mToolsStatutTexteB = response.responseText;
			mToolsStatutTexteSpanB.innerHTML = mToolsStatutTexteB;
		}
	});
}


/**************************************************
 *                    Données                     *
 **************************************************/

var loginValide = false;

var URLDomaine = 'http://osc.game-host.org:81/MonkeyTools/'
// var URLDomaine = 'http://localhost/MonkeyTools/';
var URLPage = 'ajax_expe.php';


// En dev
// Si on est dans la page de mouvement de flottes
if(window.location.search.split('&')[0].split('=')[1] == 'movement'){
	var spans = document.getElementsByTagName('span');
	var expeFlotte = []; var idFlotte; var tdVaisseaux;
	for (i=0; spans[i]; i++) {
		if(spans[i].className=='destinationData') {
			if(spans[i].getElementsByTagName('span')[1].getElementsByTagName('a')[0].innerHTML.split(':')[2] == '16]') {
				
				idFlotte = spans[i+3].id.split('_')[1];
				expeFlotte[i] = [];
				expeFlotte[i]['Coords'] = spans[i].getElementsByTagName('span')[1].getElementsByTagName('a')[0].innerHTML;
				expeFlotte[i]['dateArrivee'] = document.getElementById('fleet' + idFlotte).getElementsByTagName('span')[1].innerHTML.split(' ')[0];
				tdVaisseaux = document.getElementById('bl' + idFlotte).getElementsByTagName('td');
				expeFlotte[i]['Compo'] = 0;
				for (j=0; tdVaisseaux[j]; j++){
					if (/Petit/.test(tdVaisseaux[j].innerHTML))	expeFlotte[i]['Compo'] += 12  * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
					if (/Grand/.test(tdVaisseaux[j].innerHTML)) expeFlotte[i]['Compo'] += 47  * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
					if (/léger/.test(tdVaisseaux[j].innerHTML))	expeFlotte[i]['Compo'] += 12  * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
					if (/lourd/.test(tdVaisseaux[j].innerHTML)) expeFlotte[i]['Compo'] += 110 * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
					if (/Crois/.test(tdVaisseaux[j].innerHTML))	expeFlotte[i]['Compo'] += 47  * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
					if (/batai/.test(tdVaisseaux[j].innerHTML)) expeFlotte[i]['Compo'] += 160 * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
					if (/Recyc/.test(tdVaisseaux[j].innerHTML))	expeFlotte[i]['Compo'] += 16  * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
					if (/Sonde/.test(tdVaisseaux[j].innerHTML)) expeFlotte[i]['Compo'] += 1   * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
					if (/Bomba/.test(tdVaisseaux[j].innerHTML))	expeFlotte[i]['Compo'] += 75  * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
					if (/Destr/.test(tdVaisseaux[j].innerHTML)) expeFlotte[i]['Compo'] += 110 * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
					if (/Traqu/.test(tdVaisseaux[j].innerHTML)) expeFlotte[i]['Compo'] += 70  * parseInt(tdVaisseaux[j+1].innerHTML.replace(/^\s+/g,'').replace(/\s+$/g,''));
				}
			}
		}
	}
	// ré-indexation du tableau
	var expeEnCours = []; for (k=0, l=0; k<30; k++) {if(expeFlotte[k]) {expeEnCours[l] = expeFlotte[k]; l++;}}
}


// Si on est dans la messagerie
if(window.location.search.split('&')[0].split('=')[1] == 'showmessage'){
	// Récupération des données du message
	var listeTR = document.getElementsByTagName('tr');
	// Récupération de l'objet du message
	var Objet = listeTR[2].getElementsByTagName('td')[0].innerHTML;

	// Si on regarde bien une expe
	if(/Résultat/.test(Objet) == true) {
		var Univers = correspondanceUnivers();
		var Destinataire = listeTR[1].getElementsByTagName('td')[0].innerHTML;
		var Date = listeTR[3].getElementsByTagName('td')[0].innerHTML;
		var ResultatExpe = document.getElementsByTagName('div')[7].innerHTML;
	
		var CadreExpe = document.getElementsByTagName('div')[7];
	
		/**************************************************
		 *                 Positionnement                 *
		 **************************************************/

		var positionTexte = document.getElementsByClassName('infohead')[0].getElementsByTagName('tbody')[0];
		var contenuTexte = document.createElement('tr');
		var thContenuTexte = document.createElement('th');
			thContenuTexte.scope = 'row';
			thContenuTexte.appendChild(document.createTextNode('Statut AutoSend:'));

		var tdContenuTexte = document.createElement('td');
		var mToolsStatutTexte = document.createTextNode('');
		var mToolsStatutTexteSpan = document.createElement('span');

			
		var mToolsStatutTexteB = document.createTextNode('Connexion au serveur ...');
		var mToolsStatutTexteSpanB = document.createElement('span');


			mToolsStatutTexteSpan.appendChild(mToolsStatutTexte);
			mToolsStatutTexteSpanB.appendChild(mToolsStatutTexteB);
			
			tdContenuTexte.appendChild(mToolsStatutTexteSpan);
			tdContenuTexte.appendChild(mToolsStatutTexteSpanB);
			
			contenuTexte.appendChild(thContenuTexte);
			contenuTexte.appendChild(tdContenuTexte);
			positionTexte.appendChild(contenuTexte);
			
			loginStart();
			uploadExpe();
	}
}


