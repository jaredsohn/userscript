// ==UserScript==
// @name           Compteur de caractères
// @namespace      Compteur
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://www.jeuxvideo.com/forums/0-*
// @include        http://*.forumjv.com/*
// ==/UserScript==

function rei() {
	var mess = document.getElementById('newmessage');
	var compteur = document.getElementById('compteur');
	compteur.innerHTML = mess.value.length;
}

try {
	var mess = document.getElementById('newmessage');
	var bloc = document.createElement('span');
	mess.parentNode.insertBefore(bloc,mess);
	var compteur = document.createElement('span');
	compteur.id = "compteur";
	bloc.appendChild(compteur);
	bloc.appendChild(document.createTextNode(" caractères écrits"));
	
	bloc.style.marginLeft = "10px";
	compteur.style.marginRight = "2px";
	compteur.style.fontWeight = "bold";
	
	mess.addEventListener("keyup", rei, false);
	mess.addEventListener("keydown", rei, false);
	mess.addEventListener("keypress", rei, false);
	
	compteur.innerHTML = 0;
} catch(e) {
	GM_log(e);
}