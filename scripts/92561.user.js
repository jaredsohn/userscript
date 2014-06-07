// ==UserScript==
// @name           AutoLogin Lockerz
// @namespace      AutoLogin Lockerz by ArtroTM
// @include        *lockerz.com/*
// ==/UserScript==

//Inicio de Configuración

	var maillockerz = "email"; //Cambia mail por tu mail en Lockerz.
	var passwordlockerz = "combination"; //Cambia combination por tu contraseña en Lockerz

//Fin de Configuración


//Código de AutoLogin, no toques nada si quieres que funcione todo correctamente.
	
		document.getElementById("email-email").value = maillockerz;
		document.getElementById("password-password").value = passwordlockerz;
		document.getElementById("login-submit").click();		