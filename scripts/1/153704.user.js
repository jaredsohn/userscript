// ==UserScript==
// @name        Autologin-CampusFiuba
// @namespace   http://localhost
// @description Hace login automáticamente en el campus de la fiuba. El navegador debe recordar la clave.
// @include     http://campus.fi.uba.ar/
// @version     1
// ==/UserScript==

verificarPaginaInicio = function(){
	return location.pathname == "/";
}

autologin_main = function(){
	//Veo si tengo que hacer login
	if (document.getElementById("login") != null){
		if (document.getElementById("login").login_username != "" &&
			document.getElementById("login").login_password != ""){
				document.getElementById("login").submit();
		}
	}
}

if (document.addEventListener && verificarPaginaInicio() ) {
	if(document.cookie.indexOf("noautologin=true") != -1){
		document.addEventListener("DOMContentLoaded", autologin_main, false);
		document.cookie = "noautologin=true";
	}
}
