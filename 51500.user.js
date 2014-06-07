// ==UserScript==
// @name           Login forum METSO
// @namespace      METSO
// @description    Login automatique
// @include        http://met.ciavlan.qc.ca/forum/*
// ==/UserScript==

if (document.URL.search('mode=login') == -1 && document.forms[0].elements[3].name=='login'){
	if (readCookie('nomusager')){
		log();
	}else{
		var nom = prompt ("Entrez votre nom d'usager (supprimer les cookies pour réinitialiser).","");
		var pass = prompt ("Entrez votre mot de passe","");
		
		if (nom && pass){
			createCookie('nomusager',nom, 10000);
			createCookie('motdepasse',pass, 10000);

			log();
		};
	};
}else{
	if (document.URL.search('mode=login') != -1){
		window.location = String(document.getElementsByTagName("META")[9].content).substring(6);
	};
};

function log(){
	document.forms[0].elements[0].value = readCookie('nomusager');
	document.forms[0].elements[1].value = readCookie('motdepasse');
	document.forms[0].elements[3].click();
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