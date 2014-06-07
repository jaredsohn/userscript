// ==UserScript==
// @name           erepcookies
// @namespace      erepcookies
// @description 
// @include        http://*.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @version 2.0
// ==/UserScript==



function borrarCookies() {
    var sep = document.cookie.split(";");
    
    for(var k = 0; k < sep.length; k++){
            cookie = sep[k].split("=");
            nombre = cookie[0];
            valor = cookie[1];
            
            if(nombre.indexOf("ogres_") != -1)
                document.cookie = nombre + "=; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
}

