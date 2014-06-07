// ==UserScript==
// @name           Ogame Login Enhancer
// @namespace      monkey
// @version        2.04
// @include        http://ogame.fr/
// @include        http://www.ogame.fr/
// @include        http://ogame.fr/#*
// @include        http://www.ogame.fr/#*
// @exclude        http://ogame.*index*
// ==/UserScript==

// fonctions pour opera
if (typeof GM_getValue == 'undefined') {
	function GM_getValue (item) {
		return localStorage.getItem(item)
	}
	function GM_setValue (item, value) {
		localStorage.setItem(item, value)
	}
}

// Déplier l'onglet login
document.getElementById('login').style.display = 'block';

// Div de masquage du clic sur Login
var divHide = document.createElement('div');
	divHide.style.position = 'absolute';
	divHide.style.right = '0px';
	divHide.style.height = '30px';
	divHide.style.margin = '32px 32px 0 0';
	divHide.style.width = '102px';
document.getElementById('header').appendChild(divHide);

// Sauvegarde du contenu
var loginContent = document.getElementById('login').innerHTML;

// Conversion des données de l'ancien script (v1.04 / v1.05)
if(GM_getValue('savedUnis') && GM_getValue('savedUnis').indexOf('#') != -1) {
	var oldListeUnis = GM_getValue('savedUnis').split('#');
	var oldListeComptes = [];
	for(i = 0; i < (oldListeUnis.length -1); i++){
		oldListeComptes[i] = {};
		oldListeComptes[i].uni    = oldListeUnis[i].split('{')[0];
		oldListeComptes[i].pseudo = oldListeUnis[i].split('{')[1];
		oldListeComptes[i].pass   = oldListeUnis[i].split('{')[2];
	}
	GM_setValue('savedUnis', JSON.stringify(oldListeComptes));
	alert('mise à jour du script effectuée');
}

// Récupération des données & traitement
var HTMLData = {};
	HTMLData.listeUnis = document.getElementById('serverLogin').getElementsByTagName('option');
	HTMLData.innerListeUnis = document.getElementById('serverLogin').innerHTML;
var listeUnivers = [];
for(var i = 0; i < HTMLData.listeUnis.length; i++) {
	listeUnivers[HTMLData.listeUnis[i].value] = {
		name: HTMLData.listeUnis[i].innerHTML.split(' ').join('')
	};
}
var savedUnis = [];
if(GM_getValue('savedUnis')) {
	savedUnis = eval(GM_getValue('savedUnis'));
}
function goLogin(elm) {
	var formLogin = document.createElement('form');
		formLogin.method = 'post';
		formLogin.name = 'loginForm';
		formLogin.id = 'loginForm';
		formLogin.style.display = 'none';
		formLogin.action = 'http://' + elm.getAttribute('uni') + '/game/reg/login2.php';

	var inputUniId = document.createElement('input');
		inputUniId.type = 'hidden';
		inputUniId.name = 'uni_id';
		inputUniId.value = '';
	formLogin.appendChild(inputUniId);

	var inputKid = document.createElement('input');
		inputKid.type = 'hidden';
		inputKid.name = 'kid';
		inputKid.value = '';
	formLogin.appendChild(inputKid);

	var inputV = document.createElement('input');
		inputV.type = 'hidden';
		inputV.name = 'v';
		inputV.value = '2';
	formLogin.appendChild(inputV);

	var inputIsUTF8 = document.createElement('input');
		inputIsUTF8.type = 'hidden';
		inputIsUTF8.name = 'is_utf8';
		inputIsUTF8.value = '0';
	formLogin.appendChild(inputIsUTF8);

	var selectUniURL = document.createElement('select');
		selectUniURL.name = 'uni_url';
		var optionURL = document.createElement('option');
			optionURL.value = elm.getAttribute('uni');
		selectUniURL.appendChild(optionURL);
	formLogin.appendChild(selectUniURL);
	
	var inputLogin = document.createElement('input');
		inputLogin.type = 'text';
		inputLogin.id = 'usernameLogin';
		inputLogin.name = 'login';
		inputLogin.value = elm.getAttribute('pseudo');
	formLogin.appendChild(inputLogin);
	
	var inputPass = document.createElement('input');
		inputPass.type = 'password';
		inputPass.id = 'passwordLogin';
		inputPass.name = 'pass';
		inputPass.value = elm.getAttribute('pass');
	formLogin.appendChild(inputPass);
    
	var inputSubmit = document.createElement('input');
		inputSubmit.type = 'submit';
		inputSubmit.id = 'loginSubmit';
		inputSubmit.value = 'Login';
	formLogin.appendChild(inputSubmit);
	document.body.appendChild(formLogin);
	
	formLogin.submit();
}

// Contenu de l'onglet Login
document.getElementById('login').style.overflow = 'auto';

function effacerLogin() {
	while(document.getElementById('login').getElementsByTagName('*').length > 0) {
		document.getElementById('login').removeChild(document.getElementById('login').getElementsByTagName('*')[0]);
	}
}

function showLogin() {
	document.getElementById('loginBtn').innerHTML = 'Login';

	effacerLogin();
	
	if (savedUnis.length > 0) {
		var mesComptes = document.createElement('div');
			mesComptes.style.color = 'white';
			mesComptes.style.textAlign = 'center';
			mesComptes.style.marginTop = '6px';
			mesComptes.style.marginBottom = '3px';
			mesComptes.style.fontWeight = 'bold';
			mesComptes.appendChild(document.createTextNode('Mes Comptes'));
		document.getElementById('login').appendChild(mesComptes);
	}
	for(var i = 0; i < savedUnis.length; i++) {
		var compte = document.createElement('div');
			compte.style.color = '#bbbbbb';
			compte.style.textAlign = 'center';
			compte.style.padding = '2px';
			compte.style.marginBottom = '3px';
			compte.style.marginLeft = '15px';
			compte.style.marginRight = '3px';
			compte.style.border = '1px solid #226622';
			compte.style.width = '185px';
			compte.style.cursor = 'pointer';
			compte.setAttribute('uni', savedUnis[i].uni);
			compte.setAttribute('pseudo', savedUnis[i].pseudo);
			compte.setAttribute('pass', savedUnis[i].pass);
			
			compte.addEventListener('mouseover', function(){
				this.style.color = '#ddeeff';
				this.style.border = '1px solid #55dd55';
			}, false);
			
			compte.addEventListener('mouseout', function(){
				this.style.color = '#bbbbbb';
				this.style.border = '1px solid #226622';
			}, false);
			
			compte.addEventListener('mousedown', function(){
				goLogin(this);
			}, false);
			
			compte.appendChild(document.createTextNode(listeUnivers[savedUnis[i].uni].name + ' - ' + savedUnis[i].pseudo));
		document.getElementById('login').appendChild(compte);
	}
	
	var gestion = document.createElement('div');
		gestion.style.color = 'white';
		gestion.style.textAlign = 'center';
		gestion.style.marginTop = '3px';
		gestion.style.marginBottom = '3px';
		gestion.style.fontWeight = 'bold';
		gestion.appendChild(document.createTextNode('Gestion'));
	document.getElementById('login').appendChild(gestion);
	
	var ajouterUni = document.createElement('div');
		ajouterUni.style.color = '#bbbbbb';
		ajouterUni.style.textAlign = 'center';
		ajouterUni.style.padding = '2px';
		ajouterUni.style.marginBottom = '3px';
		ajouterUni.style.marginLeft = '15px';
		ajouterUni.style.marginRight = '3px';
		ajouterUni.style.border = '1px solid #662222';
		ajouterUni.style.width = '185px';
		ajouterUni.style.cursor = 'pointer';
			
		ajouterUni.addEventListener('mouseover', function(){
			this.style.color = '#ffddee';
			this.style.border = '1px solid #dd5555';
		}, false);
		
		ajouterUni.addEventListener('mouseout', function(){
			this.style.color = '#bbbbbb';
			this.style.border = '1px solid #662222';
		}, false);
		
		ajouterUni.addEventListener('mousedown', function(){
			ajouterCompte();
		}, false);
		
		ajouterUni.appendChild(document.createTextNode('Ajouter un Compte'));
	document.getElementById('login').appendChild(ajouterUni);
	
	var modifierUni = document.createElement('div');
		modifierUni.style.color = '#bbbbbb';
		modifierUni.style.textAlign = 'center';
		modifierUni.style.padding = '2px';
		modifierUni.style.marginBottom = '3px';
		modifierUni.style.marginLeft = '15px';
		modifierUni.style.marginRight = '3px';
		modifierUni.style.border = '1px solid #662222';
		modifierUni.style.width = '185px';
		modifierUni.style.cursor = 'pointer';
			
		modifierUni.addEventListener('mouseover', function(){
			this.style.color = '#ffddee';
			this.style.border = '1px solid #dd5555';
		}, false);
		
		modifierUni.addEventListener('mouseout', function(){
			this.style.color = '#bbbbbb';
			this.style.border = '1px solid #662222';
		}, false);
		
		modifierUni.addEventListener('mousedown', function(){
			modifierCompte();
		}, false);
		
		modifierUni.appendChild(document.createTextNode('Modifier un Compte'));
	document.getElementById('login').appendChild(modifierUni);
	
	var changerOrdreUni = document.createElement('div');
		changerOrdreUni.style.color = '#bbbbbb';
		changerOrdreUni.style.textAlign = 'center';
		changerOrdreUni.style.padding = '2px';
		changerOrdreUni.style.marginBottom = '3px';
		changerOrdreUni.style.marginLeft = '15px';
		changerOrdreUni.style.marginRight = '3px';
		changerOrdreUni.style.border = '1px solid #662222';
		changerOrdreUni.style.width = '185px';
		changerOrdreUni.style.cursor = 'pointer';
			
		changerOrdreUni.addEventListener('mouseover', function(){
			this.style.color = '#ffddee';
			this.style.border = '1px solid #dd5555';
		}, false);
		
		changerOrdreUni.addEventListener('mouseout', function(){
			this.style.color = '#bbbbbb';
			this.style.border = '1px solid #662222';
		}, false);
		
		changerOrdreUni.addEventListener('mousedown', function(){
			changerOrdre();
		}, false);
		
		changerOrdreUni.appendChild(document.createTextNode('Changer l\'Ordre des Univers'));
	document.getElementById('login').appendChild(changerOrdreUni);
	
	var motDePassePerdu = document.createElement('div');
		motDePassePerdu.style.color = '#bbbbbb';
		motDePassePerdu.style.textAlign = 'center';
		motDePassePerdu.style.padding = '2px';
		motDePassePerdu.style.marginBottom = '3px';
		motDePassePerdu.style.marginLeft = '25px';
		motDePassePerdu.style.marginRight = '3px';
		motDePassePerdu.style.border = '1px solid #662222';
		motDePassePerdu.style.width = '165px';
		motDePassePerdu.style.cursor = 'pointer';
			
		motDePassePerdu.addEventListener('mouseover', function(){
			this.style.color = '#ffeedd';
			this.style.border = '1px solid #dd5555';
		}, false);
		
		motDePassePerdu.addEventListener('mouseout', function(){
			this.style.color = '#bbbbbb';
			this.style.border = '1px solid #662222';
		}, false);
		
		motDePassePerdu.addEventListener('mousedown', function(){
			oubliMotDePasse();
		}, false);
		
		motDePassePerdu.appendChild(document.createTextNode('Mot De Passe Perdu'));
	document.getElementById('login').appendChild(motDePassePerdu);
}

function ajouterCompte() {
	document.getElementById('loginBtn').innerHTML = 'Ajout';

	effacerLogin();
	
	var univers = document.createElement('div');
		univers.style.color = 'white';
		univers.style.textAlign = 'center';
		univers.style.marginTop = '3px';
		univers.style.marginBottom = '3px';
		univers.style.fontWeight = 'bold';
		univers.appendChild(document.createTextNode('Univers'));
	document.getElementById('login').appendChild(univers);
	
	var universInput = document.createElement('select');
		universInput.style.position = 'relative';
		universInput.style.left = '65px';
		universInput.innerHTML = HTMLData.innerListeUnis;
	document.getElementById('login').appendChild(universInput);


	var pseudo = document.createElement('div');
		pseudo.style.color = 'white';
		pseudo.style.textAlign = 'center';
		pseudo.style.marginTop = '3px';
		pseudo.style.marginBottom = '3px';
		pseudo.style.fontWeight = 'bold';
		pseudo.appendChild(document.createTextNode('Pseudo'));
	document.getElementById('login').appendChild(pseudo);

	var pseudoInput = document.createElement('input');
		pseudoInput.type = 'text';
		pseudoInput.style.marginBottom = '3px';
		pseudoInput.style.marginLeft = '20px';
		pseudoInput.style.marginRight = '3px';
		pseudoInput.style.width = '165px';
	document.getElementById('login').appendChild(pseudoInput);

	var pass = document.createElement('div');
		pass.style.color = 'white';
		pass.style.textAlign = 'center';
		pass.style.marginTop = '3px';
		pass.style.marginBottom = '3px';
		pass.style.fontWeight = 'bold';
		pass.appendChild(document.createTextNode('Pass'));
	document.getElementById('login').appendChild(pass);

	var passInput = document.createElement('input');
		passInput.type = 'password';
		passInput.style.marginBottom = '3px';
		passInput.style.marginLeft = '20px';
		passInput.style.marginRight = '3px';
		passInput.style.width = '165px';
	document.getElementById('login').appendChild(passInput);

	var buttonAjouter = document.createElement('div');
		buttonAjouter.style.color = '#bbbbbb';
		buttonAjouter.style.textAlign = 'center';
		buttonAjouter.style.padding = '2px';
		buttonAjouter.style.marginBottom = '3px';
		buttonAjouter.style.marginTop = '20px';
		buttonAjouter.style.marginLeft = '15px';
		buttonAjouter.style.marginRight = '3px';
		buttonAjouter.style.border = '1px solid #226622';
		buttonAjouter.style.width = '185px';
		buttonAjouter.style.cursor = 'pointer';
		
		buttonAjouter.addEventListener('mouseover', function(){
			this.style.color = '#ddeeff';
			this.style.border = '1px solid #55dd55';
		}, false);
		
		buttonAjouter.addEventListener('mouseout', function(){
			this.style.color = '#bbbbbb';
			this.style.border = '1px solid #226622';
		}, false);
		
		buttonAjouter.addEventListener('mousedown', function(){
			var uni = universInput.value;
			var pseudo = pseudoInput.value;
			var pass = passInput.value;
			var index = savedUnis.length;
			savedUnis[index] = {};
			savedUnis[index].uni = uni;
			savedUnis[index].pseudo = pseudo;
			savedUnis[index].pass = pass;
			
			GM_setValue('savedUnis', JSON.stringify(savedUnis));
			
			showLogin();
		}, false);
		
		buttonAjouter.appendChild(document.createTextNode('Ajouter ce Compte'));
	document.getElementById('login').appendChild(buttonAjouter);
	
	var retourLogin = document.createElement('div');
		retourLogin.style.color = '#cccccc';
		retourLogin.style.textAlign = 'center';
		retourLogin.style.padding = '2px';
		retourLogin.style.marginBottom = '3px';
		retourLogin.style.marginLeft = '15px';
		retourLogin.style.marginRight = '3px';
		retourLogin.style.border = '1px solid #bb9977';
		retourLogin.style.width = '185px';
		retourLogin.style.cursor = 'pointer';
			
		retourLogin.addEventListener('mouseover', function(){
			this.style.color = '#ffcc99';
			this.style.border = '1px solid #ff8800';
		}, false);
		
		retourLogin.addEventListener('mouseout', function(){
			this.style.color = '#cccccc';
			this.style.border = '1px solid #bb9977';
		}, false);
		
		retourLogin.addEventListener('mousedown', function(){
			showLogin();
		}, false);
		
		retourLogin.appendChild(document.createTextNode('Retour'));
	document.getElementById('login').appendChild(retourLogin);
}


function modifierCompte() {
	document.getElementById('loginBtn').innerHTML = 'Modifier';

	effacerLogin();
	
	if (savedUnis.length > 0) {
		var mesComptes = document.createElement('div');
			mesComptes.style.color = 'white';
			mesComptes.style.textAlign = 'center';
			mesComptes.style.marginTop = '6px';
			mesComptes.style.marginBottom = '3px';
			mesComptes.style.fontWeight = 'bold';
			mesComptes.appendChild(document.createTextNode('Choisir le Compte'));
		document.getElementById('login').appendChild(mesComptes);
	}
	for(var i = 0; i < savedUnis.length; i++) {
		var compte = document.createElement('div');
			compte.style.color = '#bbbbbb';
			compte.style.textAlign = 'center';
			compte.style.padding = '2px';
			compte.style.marginBottom = '3px';
			compte.style.marginLeft = '15px';
			compte.style.marginRight = '3px';
			compte.style.border = '1px solid #226622';
			compte.style.width = '185px';
			compte.style.cursor = 'pointer';
			compte.setAttribute('indexCompte', i);
			
			compte.addEventListener('mouseover', function(){
				this.style.color = '#ddeeff';
				this.style.border = '1px solid #55dd55';
			}, false);
			
			compte.addEventListener('mouseout', function(){
				this.style.color = '#bbbbbb';
				this.style.border = '1px solid #226622';
			}, false);
			
			compte.addEventListener('mousedown', function(){
				optionsCompte(this)
			}, false);
			
			compte.appendChild(document.createTextNode(listeUnivers[savedUnis[i].uni].name + ' - ' + savedUnis[i].pseudo));
		document.getElementById('login').appendChild(compte);
	}
	var retourLogin = document.createElement('div');
		retourLogin.style.color = '#cccccc';
		retourLogin.style.textAlign = 'center';
		retourLogin.style.padding = '2px';
		retourLogin.style.marginBottom = '3px';
		retourLogin.style.marginLeft = '15px';
		retourLogin.style.marginRight = '3px';
		retourLogin.style.border = '1px solid #bb9977';
		retourLogin.style.width = '185px';
		retourLogin.style.cursor = 'pointer';
			
		retourLogin.addEventListener('mouseover', function(){
			this.style.color = '#ffcc99';
			this.style.border = '1px solid #ff8800';
		}, false);
		
		retourLogin.addEventListener('mouseout', function(){
			this.style.color = '#cccccc';
			this.style.border = '1px solid #bb9977';
		}, false);
		
		retourLogin.addEventListener('mousedown', function(){
			showLogin();
		}, false);
		
		retourLogin.appendChild(document.createTextNode('Retour'));
	document.getElementById('login').appendChild(retourLogin);
}

function optionsCompte(elm) {
	document.getElementById('loginBtn').innerHTML = 'Modifier';

	effacerLogin();
	
	var univers = document.createElement('div');
		univers.style.color = 'white';
		univers.style.textAlign = 'center';
		univers.style.marginTop = '3px';
		univers.style.marginBottom = '3px';
		univers.style.fontWeight = 'bold';
		univers.appendChild(document.createTextNode('Univers'));
	document.getElementById('login').appendChild(univers);
	
	var universInput = document.createElement('select');
		universInput.style.position = 'relative';
		universInput.style.left = '65px';
		universInput.innerHTML = HTMLData.innerListeUnis;
		universInput.value = savedUnis[elm.getAttribute('indexCompte')].uni;
	document.getElementById('login').appendChild(universInput);


	var pseudo = document.createElement('div');
		pseudo.style.color = 'white';
		pseudo.style.textAlign = 'center';
		pseudo.style.marginTop = '3px';
		pseudo.style.marginBottom = '3px';
		pseudo.style.fontWeight = 'bold';
		pseudo.appendChild(document.createTextNode('Pseudo'));
	document.getElementById('login').appendChild(pseudo);

	var pseudoInput = document.createElement('input');
		pseudoInput.type = 'text';
		pseudoInput.style.marginBottom = '3px';
		pseudoInput.style.marginLeft = '20px';
		pseudoInput.style.marginRight = '3px';
		pseudoInput.style.width = '165px';
		pseudoInput.value = savedUnis[elm.getAttribute('indexCompte')].pseudo;
	document.getElementById('login').appendChild(pseudoInput);

	var pass = document.createElement('div');
		pass.style.color = 'white';
		pass.style.textAlign = 'center';
		pass.style.marginTop = '3px';
		pass.style.marginBottom = '3px';
		pass.style.fontWeight = 'bold';
		pass.appendChild(document.createTextNode('Pass'));
	document.getElementById('login').appendChild(pass);

	var passInput = document.createElement('input');
		passInput.type = 'password';
		passInput.style.marginBottom = '3px';
		passInput.style.marginLeft = '20px';
		passInput.style.marginRight = '3px';
		passInput.style.width = '165px';
		passInput.value = savedUnis[elm.getAttribute('indexCompte')].pass;
	document.getElementById('login').appendChild(passInput);

	var buttonValiderModifs = document.createElement('div');
		buttonValiderModifs.style.color = '#bbbbbb';
		buttonValiderModifs.style.textAlign = 'center';
		buttonValiderModifs.style.padding = '2px';
		buttonValiderModifs.style.marginBottom = '3px';
		buttonValiderModifs.style.marginTop = '20px';
		buttonValiderModifs.style.marginLeft = '15px';
		buttonValiderModifs.style.marginRight = '3px';
		buttonValiderModifs.style.border = '1px solid #226622';
		buttonValiderModifs.style.width = '185px';
		buttonValiderModifs.style.cursor = 'pointer';
		
		buttonValiderModifs.addEventListener('mouseover', function(){
			this.style.color = '#ddeeff';
			this.style.border = '1px solid #55dd55';
		}, false);
		
		buttonValiderModifs.addEventListener('mouseout', function(){
			this.style.color = '#bbbbbb';
			this.style.border = '1px solid #226622';
		}, false);
		
		buttonValiderModifs.addEventListener('mousedown', function(){
			var uni = universInput.value;
			var pseudo = pseudoInput.value;
			var pass = passInput.value;
			var index = elm.getAttribute('indexCompte');
			savedUnis[index].uni = uni;
			savedUnis[index].pseudo = pseudo;
			savedUnis[index].pass = pass;
			
			GM_setValue('savedUnis', JSON.stringify(savedUnis));
			
			showLogin();
		}, false);
		
		buttonValiderModifs.appendChild(document.createTextNode('Valider les Modifications'));
	document.getElementById('login').appendChild(buttonValiderModifs);
	
	var supprimerCompte = document.createElement('div');
		supprimerCompte.style.color = '#bbbbbb';
		supprimerCompte.style.textAlign = 'center';
		supprimerCompte.style.padding = '2px';
		supprimerCompte.style.marginBottom = '3px';
		supprimerCompte.style.marginLeft = '15px';
		supprimerCompte.style.marginRight = '3px';
		supprimerCompte.style.border = '1px solid #662222';
		supprimerCompte.style.width = '185px';
		supprimerCompte.style.cursor = 'pointer';
			
		supprimerCompte.addEventListener('mouseover', function(){
			this.style.color = '#ffddee';
			this.style.border = '1px solid #dd5555';
		}, false);
		
		supprimerCompte.addEventListener('mouseout', function(){
			this.style.color = '#bbbbbb';
			this.style.border = '1px solid #662222';
		}, false);
		
		supprimerCompte.addEventListener('mousedown', function(){
			savedUnis.splice(elm.getAttribute('indexCompte'), 1);
			GM_setValue('savedUnis', JSON.stringify(savedUnis));
			showLogin();
		}, false);
		
		supprimerCompte.appendChild(document.createTextNode('Supprimer ce Compte'));
	document.getElementById('login').appendChild(supprimerCompte);
	
	var retourLogin = document.createElement('div');
		retourLogin.style.color = '#cccccc';
		retourLogin.style.textAlign = 'center';
		retourLogin.style.padding = '2px';
		retourLogin.style.marginBottom = '3px';
		retourLogin.style.marginLeft = '15px';
		retourLogin.style.marginRight = '3px';
		retourLogin.style.border = '1px solid #bb9977';
		retourLogin.style.width = '185px';
		retourLogin.style.cursor = 'pointer';
			
		retourLogin.addEventListener('mouseover', function(){
			this.style.color = '#ffcc99';
			this.style.border = '1px solid #ff8800';
		}, false);
		
		retourLogin.addEventListener('mouseout', function(){
			this.style.color = '#cccccc';
			this.style.border = '1px solid #bb9977';
		}, false);
		
		retourLogin.addEventListener('mousedown', function(){
			showLogin();
		}, false);
		
		retourLogin.appendChild(document.createTextNode('Retour'));
	document.getElementById('login').appendChild(retourLogin);
}
var compteurOrdre;
var newIndexOrdre;
function changerOrdre() {
	document.getElementById('loginBtn').innerHTML = 'Ordre';

	effacerLogin();
	
	newIndexOrdre = [];
	compteurOrdre = 0
	if (savedUnis.length > 0) {
		var mesComptes = document.createElement('div');
			mesComptes.style.color = 'white';
			mesComptes.style.textAlign = 'center';
			mesComptes.style.marginTop = '6px';
			mesComptes.style.marginBottom = '3px';
			mesComptes.style.fontWeight = 'bold';
			mesComptes.appendChild(document.createTextNode('Selectionner les comptes dans l\'ordre voulu'));
		document.getElementById('login').appendChild(mesComptes);
	}
	for(var i = 0; i < savedUnis.length; i++) {
		var compte = document.createElement('div');
			compte.style.color = '#bbbbbb';
			compte.style.textAlign = 'center';
			compte.style.padding = '2px';
			compte.style.marginBottom = '3px';
			compte.style.marginLeft = '15px';
			compte.style.marginRight = '3px';
			compte.style.border = '1px solid #226622';
			compte.style.width = '185px';
			compte.style.cursor = 'pointer';
			compte.setAttribute('indexCompte', i);
			
			compte.addEventListener('mouseover', function(){
				this.style.color = '#ddeeff';
				this.style.border = '1px solid #55dd55';
			}, false);
			
			compte.addEventListener('mouseout', function(){
				this.style.color = '#bbbbbb';
				this.style.border = '1px solid #226622';
			}, false);
			
			compte.addEventListener('mousedown', function(){
				if (retourLogin) {
					retourLogin.parentNode.removeChild(retourLogin);
					retourLogin = false;
				}
				newIndexOrdre[compteurOrdre] = savedUnis[this.getAttribute('indexCompte')];
				compteurOrdre++;
				if(compteurOrdre == savedUnis.length) {
					savedUnis = newIndexOrdre;
					GM_setValue('savedUnis', JSON.stringify(savedUnis));
					showLogin();
				}
				this.parentNode.removeChild(this);
			}, false);
			
			compte.appendChild(document.createTextNode(listeUnivers[savedUnis[i].uni].name + ' - ' + savedUnis[i].pseudo));
		document.getElementById('login').appendChild(compte);
	}
	var retourLogin = document.createElement('div');
		retourLogin.style.color = '#cccccc';
		retourLogin.style.textAlign = 'center';
		retourLogin.style.padding = '2px';
		retourLogin.style.marginBottom = '3px';
		retourLogin.style.marginLeft = '15px';
		retourLogin.style.marginRight = '3px';
		retourLogin.style.border = '1px solid #bb9977';
		retourLogin.style.width = '185px';
		retourLogin.style.cursor = 'pointer';
			
		retourLogin.addEventListener('mouseover', function(){
			this.style.color = '#ffcc99';
			this.style.border = '1px solid #ff8800';
		}, false);
		
		retourLogin.addEventListener('mouseout', function(){
			this.style.color = '#cccccc';
			this.style.border = '1px solid #bb9977';
		}, false);
		
		retourLogin.addEventListener('mousedown', function(){
			showLogin();
		}, false);
		
		retourLogin.appendChild(document.createTextNode('Retour'));
	document.getElementById('login').appendChild(retourLogin);
}

function oubliMotDePasse() {
	document.getElementById('loginBtn').innerHTML = 'Perte MdP';

	effacerLogin();
	
	var univers = document.createElement('div');
		univers.style.color = 'white';
		univers.style.textAlign = 'center';
		univers.style.marginTop = '3px';
		univers.style.marginBottom = '3px';
		univers.style.fontWeight = 'bold';
		univers.appendChild(document.createTextNode('Univers'));
	document.getElementById('login').appendChild(univers);
	
	var universInput = document.createElement('select');
		universInput.style.position = 'relative';
		universInput.style.left = '65px';
		universInput.innerHTML = HTMLData.innerListeUnis;
	document.getElementById('login').appendChild(universInput);


	var buttonRecup = document.createElement('div');
		buttonRecup.style.color = '#bbbbbb';
		buttonRecup.style.textAlign = 'center';
		buttonRecup.style.padding = '2px';
		buttonRecup.style.marginBottom = '3px';
		buttonRecup.style.marginTop = '20px';
		buttonRecup.style.marginLeft = '15px';
		buttonRecup.style.marginRight = '3px';
		buttonRecup.style.border = '1px solid #226622';
		buttonRecup.style.width = '185px';
		buttonRecup.style.cursor = 'pointer';
		
		buttonRecup.addEventListener('mouseover', function(){
			this.style.color = '#ddeeff';
			this.style.border = '1px solid #55dd55';
		}, false);
		
		buttonRecup.addEventListener('mouseout', function(){
			this.style.color = '#bbbbbb';
			this.style.border = '1px solid #226622';
		}, false);
		
		buttonRecup.addEventListener('mousedown', function(){
			location.href = 'http://' + universInput.value + '/game/reg/mail.php';
		}, false);
		
		buttonRecup.appendChild(document.createTextNode('Récupérer le mot de passe'));
	document.getElementById('login').appendChild(buttonRecup);
	
	var retourLogin = document.createElement('div');
		retourLogin.style.color = '#cccccc';
		retourLogin.style.textAlign = 'center';
		retourLogin.style.padding = '2px';
		retourLogin.style.marginBottom = '3px';
		retourLogin.style.marginLeft = '15px';
		retourLogin.style.marginRight = '3px';
		retourLogin.style.border = '1px solid #bb9977';
		retourLogin.style.width = '185px';
		retourLogin.style.cursor = 'pointer';
			
		retourLogin.addEventListener('mouseover', function(){
			this.style.color = '#ffcc99';
			this.style.border = '1px solid #ff8800';
		}, false);
		
		retourLogin.addEventListener('mouseout', function(){
			this.style.color = '#cccccc';
			this.style.border = '1px solid #bb9977';
		}, false);
		
		retourLogin.addEventListener('mousedown', function(){
			showLogin();
		}, false);
		
		retourLogin.appendChild(document.createTextNode('Retour'));
	document.getElementById('login').appendChild(retourLogin);
}

showLogin();