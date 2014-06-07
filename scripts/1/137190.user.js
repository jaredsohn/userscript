// ==UserScript==
// @name       Tweet Cheezburgers
// @namespace  https://twitter.com/#!/eladio_tercios
// @version    1.0
// @description  Script para añadir botón de Twiter para los elementos de la web http://cheezburger.com/ ya que el nuevo diseño no lo incluye de manera nativa.
// @include    http://cheezburger.com/*
// @copyright  Disfruta, modifica, comparte.
// ==/UserScript==

//Node del div de compartir
var padre=document.body.childNodes[15].childNodes[3].childNodes[3].childNodes[1].childNodes[3];

//Creamos un div en el cuál meteremos nuestro botón de Twitter
var un_div=document.createElement("div");
padre.appendChild(un_div);

//Le insertamos el html correspondiente al botón de Twitter
un_div.innerHTML='<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en">Tweet</a>';

//Función del botón de Twitter
!function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0];
    if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;js.src="//platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);
    }
}(document,"script","twitter-wjs");
