// ==UserScript==
// @name          JVC Premium (Beta)
// @namespace     http://userscripts.org/users/483230
// @description	  
// @include       http://www.jeuxvideo.com/forums/*
// @include       http://www.jeuxvideo.com/cgi-bin/jvforums/*
// @version       0.3
// @author        Xzl
// ==/UserScript==

function getJVCP(n) {
	var nameEQ = n + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) { var c = ca[i]; while (c.charAt(0)==' ') c = c.substring(1,c.length); if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); }
	return null;
}

// Application de la marge selon la page
if (document.getElementById('textfield_forum') != null && window.location.pathname != "/cgi-bin/jvforums/forums.cgi") { var marge = 44; } else if (document.body.innerHTML.match(new RegExp('alt="Revenir aux messages"')) && window.location.pathname != "/cgi-bin/jvforums/forums.cgi") { var marge = 0; } else { var marge = 88; }

// Active le script selon le cookie JVCP
if (getJVCP('JVCP') == null || getJVCP('JVCP') == "true") {

	// Affichage du bouton de desactivation
	document.getElementsByClassName('titre_page')[0].innerHTML += '<img id="sPremium" src="http://xzlserv.1allo.net/jvcpremium/img/jvcpremium_on.png" style="position:absolute;right:'+marge+'px;top:3px;cursor:pointer;">';
	document.getElementById('sPremium').onclick = function() { document.cookie="JVCP=false; path=/"; document.location.reload(true); }
	
	// Chargement du script principale
	var jvcPremium = document.createElement('script');
	jvcPremium.src = 'http://xzlserv.1allo.net/jvcpremium/jvcpremiumv0-3.js';
	document.body.appendChild(jvcPremium);
	
} else {

	// Affichage du bouton de d'activation
	document.getElementsByClassName('titre_page')[0].innerHTML += '<img id="sPremium" src="http://xzlserv.1allo.net/jvcpremium/img/jvcpremium_off.png" style="position:absolute;right:'+marge+'px;top:3px;cursor:pointer;">';
	document.getElementById('sPremium').onclick = function() { document.cookie="JVCP=true; path=/"; document.location.reload(true); }
	
}

// Stylisation des liens
jvcPremium = document.createElement('style');
jvcPremium.setAttribute('type', 'text/css');
jvcPremium.innerHTML = '/* CSS JVCPREMIUM */ \
	.jvcp_link { cursor: pointer;padding: 2px;background-color: #ACACAC;-webkit-border-radius: 2px;border-radius: 2px;opacity: 1;color: white; } \
	.jvcp_link:hover { background-color: #C4C4C4; } \
';
document.getElementsByTagName('head')[0].appendChild(jvcPremium);