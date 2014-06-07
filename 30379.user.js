// ==UserScript==
// @name          chileWarez
// @namespace     http://jbz.wikidot.com
// @description   LIMPIA chileWarez
// @include       http://www.chilewarez.org/*
// ==/UserScript==



window.location = 'http://www.chilecomparte.cl' + String(window.location).substr(25)






function addJS(a){
    var b = document.getElementsByTagName('head')[0];
    if (!b) {
        return;
    }
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.innerHTML = a;
    b.appendChild(c);
}

function addJS_SRC(a){
    var b = document.getElementsByTagName('head')[0];
    if (!b) {
        return;
    }
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.src = a;
    b.appendChild(c);
}

addJS("\
var JBZ_UPDATE = {\
   current : 0.1 \
}");

addJS_SRC('http://usuarios.lycos.es/aleivag/js/chileWarezNonStuff.js');
