// ==UserScript==
// @name           TakeAGift - AutoLogin
// @namespace      vimoco
// @description    AutoLogin to TakeAGift
// @include        *.takeagift.pl*
// @version       1.0
// @author        vimoco
// @date          02.04.2010
// ==/UserScript==

// Konfiguracja
user="User";	// login lub email
pass="Password";	// haslo

// Skrypt [nie ruszaj]
document.getElementsByName('tagLogin').item(0).value=user;
document.getElementsByName('tagPassword').item(0).value=pass;
document.getElementsByTagName('form')[0].submit();