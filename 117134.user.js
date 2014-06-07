// ==UserScript==
// @name Pontenova.es
// @namespace http://diveintogreasemonkey.org/download/
// @description prueba de script. Sale aviso ó entrar en pontenova.es
// @include     http://www*.comunio.es/*
// @include     http://comunio.es/*
// ==/UserScript==

alert('Pontenova.es');
var update;
update = '<span class="button01">Versión actualizada</span>';

var div = document.getElementsByTagName("div");

for( var i=0; i<div.length; i++){

//plusplayer?
    if (div[i].textContent == "Comunio > Fichajes" ){	
		
        div[i].innerHTML += '<br/><br/><div class="button01"></div>' + update;						
        break;
    }
}