// ==UserScript==
// @name           UrwijNagrody - AutoLogin
// @namespace      Colek
// @description    Automatycznie wpisuje email i has�o na stronie UrwijNagrody
// @include        *urwijnagrody.pl*
// @version       1.0
// @author        Colek
// @date          23.09.2010
// ==/UserScript==

// Konfiguracja
user="NICK";	// nick
pass="HASLO";	// haslo

// Skrypt (nie edytuj)
document.getElementsByName('username').item(0).value=user;
document.getElementsByName('password').item(0).value=pass;