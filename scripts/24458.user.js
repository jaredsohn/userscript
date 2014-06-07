// ==UserScript==
// @name           infoexpress hacks
// @namespace      infoexpres.es
// @description    hacks para la página infoexpres.es
// @include        http://www.infoexpres.es/*
// ==/UserScript==

function infoexpres_main (){
    var code="";

// simplemente añado un retraso a la ocultación del submenú. No se por qué
// el callback mouseout se activa incluso sin sacar el puntero del menu
// esto sólo se aprecia en firefox en linux o mac, parece que con windows no es
// necesario
    code = "window.ocultaSubmenu="+function(id) {
        var submenu = document.getElementById("submenu" + id).style;
        setTimeout(function(){submenu.display="none";}, 3000);
    }
    location.href="javascript:void("+code+");"
}
window.setTimeout(function(){ infoexpres_main() }, 5);