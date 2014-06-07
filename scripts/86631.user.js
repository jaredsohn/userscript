// ==UserScript==
// @name           ThisBox - AutoLogin
// @namespace      Colek
// @description    Automatycznie wpisuje email i has�o na stronie ThisBox
// @include        *.thisbox.pl*
// @version       1.0
// @author        Colek
// @date          23.09.2010
// ==/UserScript==

// Konfiguracja
user="EMAIL";	// email
pass="HASLO";	// haslo

// Skrypt (nie edytuj)
document.getElementsByName('log_login').item(0).value=user;
document.getElementsByName('log_password').item(0).value=pass;