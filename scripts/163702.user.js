// ==UserScript==
// @name        zapinacz
// @namespace   lokalizacja
// @description Podpina naczepy jak jest wolne auto
// @include     *.cargotycoon.pl/index.php?action=*
// @version     1
// @grant           none
// ==/UserScript==
var zegar;
document.onload = podpinanie();
function podpinanie(){
if (window.location.search.match(/[?&]action=cars/)){zegar = setInterval(function(){zapinacz()}, 1000);}
if (window.location.search.match(/[?&]action=sign_trailer/)){zegar = setInterval(function(){naczepa()}, 1000);}
}

function zapinacz(){
var fuel =/Podepnij/;
var x =document.getElementsByTagName("a");

for (var i = 0, l = x.length; i < l; i++) {
    var fu = x[i];
    
    if (fuel.test(fu.innerHTML)) {
        location.href=fu.href;
        clearInterval(zegar);
        break;}}}
function naczepa(){
//alert(document.forms[0].element.length);
if (document.forms[0].length<1){
lert('brak aut do wyslania');
}
//location.href="index.php";}
//alert("There are " + document.forms[0].length + " elements in this Form");
document.forms[0].elements[1].checked=true;
document.forms[0].submit();
clearInterval(zegar);
}