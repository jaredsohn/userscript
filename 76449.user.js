// ==UserScript==
// @name           Wykop Recommends Remover
// @namespace      http://kubofonista.net
// @description    Wywala niechciane boksy reklamowe
// @include			http://*.wykop.pl/
// @include	  		 http://*.wykop.pl/wykopalisko*
// ==/UserScript==

domena1 = 'domena1.pl';
domena2 = 'domena2.pl';

var body = document.getElementsByTagName('BODY')[0];
if(body && body.readyState == 'loaded') {
    w();
} else {
    if (window.addEventListener) {  
        window.addEventListener('load', w, false);
    } else {
        window.attachEvent('onload', w);
    }
}


function w() {
licznik = document.getElementsByTagName("LI").length;
for(i=0;i<licznik;i++) {
	if(document.getElementsByTagName("LI")[i].innerHTML.indexOf('recommends') !== -1 && (document.getElementsByTagName("LI")[i].innerHTML.indexOf(domena1) !== -1 | document.getElementsByTagName("LI")[i].innerHTML.indexOf(domena2) !== -1)) {
		document.getElementsByTagName("LI")[i].innerHTML = '';
	}
}
}