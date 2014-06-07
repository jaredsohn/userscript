// ==UserScript==
// @name             Identifier
// @description  It is just a game script.
// @author          Tomas Loon
// @namespace   http://www.loon.com.ar/ascript
// @date             2006-8-20
// @version        0.1
// @include         http://*
// @include         https://*
// ==/UserScript==


(function() {

var id = prompt("Quien eres?");
if(id == "yes" || id == "si" || id =="Si"){
alert(id + " pete");
}
else{
window.close();
}


})();