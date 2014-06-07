// ==UserScript==
// @name           zamber.net/mzk/ happy cat!
// @namespace      http://zamber.net/mzk/
// @description    Dodaje Happy Cata :D
// @include        http://zamber.net/mzk/*
// ==/UserScript==

var kotek = 'http://polygondesign.net/cbo/images/happycat.jpg';
var main, newElement;
main = document.getElementById('stopka');
if (main) {
    newElement = document.createElement('img');
    newElement.setAttribute('src', kotek);
    main.parentNode.insertBefore(newElement, main);
}
