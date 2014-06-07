// ==UserScript==
// @name        FL Adblock
// @namespace   Juanix.net
// @description Bloquea publicidad de FL
// @include     *.forolockerz.com/*
// @version     1
// @grant       none
// @license     Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
// ==/UserScript==

//Para agregar publicidad que bloquear al script, solo agrega el ID del DIV de la publicidad abajo
//Si no sabes que es esto, no tocar nada y mejor preguntad a Juanix (quizas actualize el script)
var ads = [
    "spu-bg",
    "spu-main",
    "ventanaPopup1",
    "ventanaPopup1Fondo"
];

//***NO EDITAR DE AQUI PARA ABAJO A MENOS QUE SEAS SUPERIOR***

var adsRemoved = 0;
var checker = setInterval(adsLoaded, 100);

function adsLoaded() 
{
    for (var i = 0; i < ads.length; i++)
    {
        var ad = get(ads[i]);
        if (ad)
        {
            ad.remove();
            adsRemoved++;
        }
    }
    if (adsRemoved === 3)
       clearInterval(checker);
    
}

function get(ad) {
   return document.getElementById(ad);
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}