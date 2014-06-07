// ==UserScript==
// @name           Connexion Free Wifi
// @namespace      freecon
// @description    Ce script connecte l'utilisateur automatiquement au réseau Free Wifi
// @include        https://wifi.free.fr/*
// ==/UserScript==


/*****************************/
/**Demande d'authentification*/
/*****************************/
if(!GM_getValue('freewifi_login', '')){
	GM_setValue('freewifi_login', window.prompt("Merci de renseigner votre login. (Ces informations ne vous seront demandés que la première fois)"));
}
if(!GM_getValue('freewifi_pwd', '')){
	GM_setValue('freewifi_pwd', window.prompt("Merci de renseigner votre mot de passe"));
}


/*******************/
/**Début du script**/
/*******************/
if(document.getElementById("login")){
	if(GM_getValue('freewifi_login', '') && GM_getValue('freewifi_pwd', '')){
		document.getElementById("login").value = GM_getValue('freewifi_login', '');
		document.getElementById("password").value = GM_getValue('freewifi_pwd', '');
		document.getElementById("form1").submit();
	}
}
else{
	if(history.length >= 2){
		history.go(-2);
	}
}