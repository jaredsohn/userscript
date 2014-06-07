// ==UserScript==
// @name       Revelador de spoilers
// @version    0.1
// @description  Mostra o spoiler automaticamente
// @include     http://*.brchan.org/*/res/*
// @copyright  2012+, You
// ==/UserScript==

(function(){
    var spoilers=document.getElementsByClassName('spoiler');
    for (var i=0;i<spoilers.length;i++){
        spoilers[i].style.color='white';
    }
}).call(this);