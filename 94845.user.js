// ==UserScript==
// @name 	JTrac : agrandir la fenetre de commentaire / description
// @namespace	http://jtrac.cib.net:8000/
// @description	agrandir la fenetre de commentaire / description
// @include		http://jtrac.cib.net:8000/jtrac/app/item/*
// ==/UserScript==

var MyTAE2; MyTAE2 = document.evaluate( '//textarea[@name="comment"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
if (MyTAE2 != undefined) {
    MyTAE2.setAttribute('cols',70+19);
    MyTAE2.setAttribute('rows',06+24); 
}