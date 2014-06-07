// ==UserScript==
// @name         Folha sem Limites 2
// @author       ElegantMonkey
// @description  Tira o limite de 20 materias da Folha de S. Paulo - Baseado num script de Evandro Luiz
// @version      1.0
// @include      http*folha.uol.com.br/*
// @grant        none
// ==/UserScript==

var imgs = document.getElementsByTagName("img");

for (var i = 0; i < imgs.length; i++) {
    if (imgs[i].getAttribute("usemap") == "#paywallimage") {
        imgs[i].parentNode.parentNode.style.display = "none";
        window.onscroll = function() { return true }; 
        window.onresize = function() { return true }; 
        document.body.style.cssText = "overflow: auto !important";
        break;
    }
}
