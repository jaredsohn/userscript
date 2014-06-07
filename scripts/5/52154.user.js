// ==UserScript==
// @name           Login forum Terra Incognita
// @namespace      TI
// @description    Login automatique pour le forum
// @include        http://www.gn.qc.ca/forum/*
// ==/UserScript==

const NOM_USAGER = 'nomusagerSCRIPT';
const MOT_DE_PASSE = 'motdepasseSCRIPT';

if (document.URL.search('mode=login') == -1 && document.forms[1].elements[1].name == 'username'){
	if (readCookie(NOM_USAGER)){
		log();
	}else{
		var nom = prompt ("Entrez votre nom d'usager (supprimer les cookies pour réinitialiser).","");
		var pass = prompt ("Entrez votre mot de passe.","");
		
		if (nom && pass){
			createCookie(NOM_USAGER,nom, 10000);
			createCookie(MOT_DE_PASSE,pass, 10000);

			log();
		};
	};
}else{
	if (document.URL.search('mode=login') != -1){
		window.location = String(document.getElementsByTagName("META")[9].content).substring(6);
	};
};

function log(){
	document.forms[1].elements[1].value = readCookie(NOM_USAGER);
	document.forms[1].elements[2].value = readCookie(MOT_DE_PASSE);
	document.forms[1].elements[4].click();
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
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

function eraseCookie(name) {
	createCookie(name,"",-1);
}