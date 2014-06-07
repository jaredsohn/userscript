// ==UserScript==
// @name       Allegro Payback check
// @namespace  none :(
// @version    1.2
// @description  "I want to receive my Payback points" auto-check 
// @match      http://allegro.pl/Purchase/PreBuyNow.php*
// @copyright  2013+, Anubis
// ==/UserScript==

if(document.getElementById('pb_check')){document.getElementById('pb_check').checked = true;}
