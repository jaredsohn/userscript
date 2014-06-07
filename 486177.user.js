// ==UserScript==
// @name        Wikipedia Auto Login
// @include     http://*.wikipedia.org/*
// @include     https://*.wikipedia.org/*
// @include     http://*.wikivoyage.org/*
// @include     https://*.wikivoyage.org/*
// @version     1
// @grant       none
// ==/UserScript==

// check if login button is present
var loginPossible = document.getElementById("pt-login");
if(loginPossible){
   var foo = loginPossible.getElementsByTagName("a")[0];
   location.href = foo.href;
}

// login on login page
var zurueck = document.getElementById("mw-returnto");
if(zurueck){
	var zurueckLink = zurueck.getElementsByTagName("a")[0];
	if(zurueckLink){
		location.href = zurueckLink.href;
	}
}

window.setTimeout("document.getElementById('wpRemember').click(); ", 10);

if (document.forms['userlogin'].wpName.value)
window.setTimeout("document.getElementById('wpLoginAttempt').click(); ", 10);