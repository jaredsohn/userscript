// ==UserScript==
// @name        Sprosteslovo.cz AdRemove
// @namespace   sprosteslovo.cz
// @description Odstraňuje podvodné tlačítko VSTOUPIT které lajkuje reklamu.
// @include     http://sprosteslovo.cz/*
// @include     http://funnyweb.cz/*
// @version     0.5
// @grant       none
// ==/UserScript==
    ad = document.getElementById("new");
    if (ad){ad.parentNode.removeChild(ad)}
    ad = document.getElementById("sidebar");
    if (ad){ad.parentNode.removeChild(ad)}
    ad = document.getElementById("fb-root");
    if (ad){ad.parentNode.removeChild(ad)}
    ad = document.getElementsByClassName('advert')[0];
    if (ad){ad.parentNode.removeChild(ad)}
    ad = document.getElementsByClassName('text_block')[0];
    if (ad){ad.parentNode.removeChild(ad)}
    ad = document.getElementsByClassName('fb-like')[0];
    if (ad){ad.parentNode.removeChild(ad);}
    ad = document.getElementsByClassName('tac')[0];
    if (ad){ad.parentNode.removeChild(ad);}
    ad = document.getElementsByClassName('tac')[0];
    if (ad){ad.parentNode.removeChild(ad);}

