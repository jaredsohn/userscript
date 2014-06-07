// ==UserScript==
// @name           TakeAGift - AutoLogin
// @namespace      Colek
// @description    Automatycznie wpisuje email i has�o na stronie TakeAGift
// @include        *.takeagift.pl*
// @version       1.0
// @author        Colek
// @date          23.09.2010
// ==/UserScript==

// Konfiguracja
user="EMAIL";	// email
pass="HASLO";	// haslo

// Skrypt (nie edytuj)
document.getElementsByName('tagLogin').item(0).value=user;
document.getElementsByName('tagPassword').item(0).value=pass;