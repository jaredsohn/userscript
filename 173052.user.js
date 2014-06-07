// ==UserScript==
// @name       Naprawione mikro
// @namespace  http://www.wykop.pl/ludzie/kamdz
// @version    0.1
// @description  Ukrywa nicki
// @match      http://*/*
// @include	http://www.wykop.pl/mikroblog*
// @include	http://www.wykop.pl/wpis*
// @include	http://www.wykop.pl/tag*
// @include	http://www.wykop.pl/ludzie*
// @include	http://www.wykop.pl/dodatki*
// @copyright  2012+, You
// ==/UserScript==

$('a:contains("SebusPL")').remove();
$('a:contains("nvm_onion")').remove();