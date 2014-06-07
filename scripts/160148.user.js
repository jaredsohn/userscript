// ==UserScript==
// @name       Commentaar verwijderen op GVA
// @namespace  http://gva.be/
// @version    0.1
// @description  met dit script zie je geen lezerscommentaar meer op gva.be
// @match      http://*/*
// @copyright  2013+, Kingflurkel
// ==/UserScript==

var elems = document.getElementsByClassName('w-comments append-bottom');
for (var i = 0; i < elems.length; i++) {
  elems[i].style.display = 'none';
}

