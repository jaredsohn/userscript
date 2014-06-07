// ==UserScript==
// @name           MojaNagroda - AutoLogin
// @namespace      Colek
// @description    Automatycznie wpisuje email i has�o na stronie MojaNagroda
// @include        *MojaNagroda.pl*
// @version       1.0
// @author        Colek
// @date          23.09.2010
// ==/UserScript==

// Konfiguracja
user="EMAIL";	// email
pass="HASLO";	// haslo

// Skrypt (nie edytuj)
document.getElementsByName('user').item(0).value=user;
document.getElementsByName('pass').item(0).value=pass;