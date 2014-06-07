// ==UserScript==
// @name           KoL: Re-add underline in charpane
// @namespace      http://userscripts.org/users/121156
// @description    Re-add the missing underline in the Kingdom of Loathing charpane.  Seriously.
// @include        http://127.0.0.1:60*/charpane.php*
// @include        http://*kingdomofloathing.com/charpane.php*
// ==/UserScript==

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.nounder[href="charsheet.php"] { text-decoration: underline !important; }';
document.getElementsByTagName('head')[0].appendChild(style);
