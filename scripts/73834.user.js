// ==UserScript==
// @name           Infojobs - AutoLogin
// @namespace      cimbeles
// @description    AutoLogin to Infojobs
// @include        *www.infojobs.net/candidato-login*
// @version       1.0
// @author        cimbeles
// @date          08.04.2010
// ==/UserScript==

// Configuracion
user="EMAIL";	// login lub email
pass="PASSWORD";	// haslo

// Skript
document.getElementsByName('email').item(0).value=user;
document.getElementsByName('password').item(0).value=pass;
document.getElementsByTagName('form')[0].submit();