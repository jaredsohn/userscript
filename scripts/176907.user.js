// ==UserScript==
// @name       Boton denunciaar
// @namespace  http://taringa.net/max_pc
// @version    0.1
// @description  Agrega el boton denunciar en la barra de compartir de arriba.
// @match      http://*.taringa.net/posts/*
// @copyright  2013, @max_pc
// ==/UserScript==
// @require http://code.jquery.com/jquery-1.7.min.js


function agregarBoton (){
    
    $(".social-bar").prepend($("#flag-post"));
    
}

agregarBoton();