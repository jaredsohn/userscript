// ==UserScript==
// @name 		SalsaFrance Forum : fenetre de composition agrandie
// @namespace	http://xandrex.free.fr/salsa/
// @description	la fenetre de composition est plus grande : 60x12 -> 90x36
// @include		http://www.forumsalsa.net/yabbse2/*
// ==/UserScript==

var MyTAE2; MyTAE2 = document.evaluate( '//textarea[@name="message"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
if (MyTAE2 != undefined) {
    MyTAE2.setAttribute('cols',60+30);
    MyTAE2.setAttribute('rows',12+24); 
}