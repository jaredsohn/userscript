// ==UserScript==
// @name           AutoLogin ForoLockerz
// @namespace      AutoLogin ForoLockerz by ArtroTM
// @include        *forolockerz.com/*
// ==/UserScript==

//Inicio de Configuración

	var usuariofl = "user"; //Cambia el valor user por tu usuario en ForoLockerz.
	var passwordfl = "password"; //Cambia el valor password por tu contraseña en     ForoLockerz.

//Fin de Configuración



//Código de AutoLogin a ForoLockerz. Si quieres que todo funcione correctamente, no toques nada.

		document.getElementById("usrnme").value = usuariofl;
		document.getElementById("psswrd").value = passwordfl;
		document.getElementById("loginbutton").click();
	