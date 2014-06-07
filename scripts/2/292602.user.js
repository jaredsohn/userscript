// ==UserScript==
// @name        KekoMundo Anti-AntiAdBlock
// @namespace   kmaaab
// @description Desactivar el AntiAdBlock de KekoMundo
// @include     http://*kekomundo.com/*
// @version     1
// @grant       none
// ==/UserScript==

/*var caja = document.getElementById("light");
var fondo = document.getElementById("fade");
if (caja) {
    div.style.display = "none"; // Hides it
    // Or
    //div.parentNode.removeChild(div); // Removes it entirely
}
if (fondo) {
    div.style.display = "none"; // Hides it
    // Or
    //div.parentNode.removeChild(div); // Removes it entirely
}*/
document.getElementById("light").remove();
document.getElementById("fade").remove();
setTimeout(function(){document.getElementById("light").remove()},1000);
setTimeout(function(){document.getElementById("fade").remove()},1000);