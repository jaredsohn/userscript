// ==UserScript==
// @name           Blocker
// @namespace      none
// @description    Password block versja by anonim2
// @author         anonim2
// @version        1.1.1
// @include        http://*.plemiona.pl/staemme.php*
// ==/UserScript==
//Konfiguracja
var $pass = "hasełko";
//Kod by anonim2
var $pass2 = prompt("Podaj haslo","");
if ($pass2 != $pass) {
document.location.href="http://www.plemiona.pl";
} else {
alert ("Haslo poprawne");
}