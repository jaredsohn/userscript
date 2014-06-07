// ==UserScript==
// @name           Auto Login - epsyon
// @description    Login automatico
// @include        *ptzplace.lockerz.com*
// @include        *freecandy.tk*
// @include        *virtualredemption.info*
// @include        *redeem-it.net*
// @include        *ptzplace.info*
// @include        *tutudragon3.info*
// @version        0.6 BETA
// @creator        Aitor Cubeles (epsyon)
// ==/UserScript==

// Comienza el script
var email = GM_getValue("tuemail@aqui.com");
var pass = GM_getValue("tu-contraseña");
GM_registerMenuCommand("Auto Login - epsyon > Configurar eMail", function(){email = prompt("Escribe tu email", email); GM_setValue("email", email); });
GM_registerMenuCommand("Auto Login - epsyon > Configurar Contraseña", function(){pass = prompt("Escribe tu contraseña"); GM_setValue("pass", pass); });
GM_registerMenuCommand("Auto Login - epsyon > Borrar datos", function(){email = undefined; pass = undefined; GM_deleteValue("email"); GM_deleteValue("pass"); });
if (document.getElementById("login-main")){
//if (document.body.innerHTML.indexOf("Remember me") > -1) {
	if(!email){ email = prompt("Escribe tu email"); GM_setValue("email", email);}
	if(!pass){ pass = prompt("Escribe tu contraseña"); GM_setValue("pass", pass);}

	function $$(a) {
		return document.getElementById(a);
	}

	$$("email-email").value = email;
	with(p = $$("password-password")) focus(), value = pass;
	if(email && pass){
		$$("sumbitLogin").click();
	}
}
//Acaba el script