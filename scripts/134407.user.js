// ==UserScript==
// @name        GestionResellers KeepAlive
// @namespace   Misael.K
// @description Mantiene viva la sesión de usuario en Gestión Resellers
// @include     https://www.gestionresellers.com.ar/extranet/*
// @version     1.0
// @grant       GM_xmlhttpRequest
// ==/UserScript==

function cargarAlgo() {
    GM_xmlhttpRequest({
        method: "GET",
        url:    "https://www.gestionresellers.com.ar/extranet/listaArticulos",
        onload: function() {
            setTimeout(function(){cargarAlgo()}, 60000);
        }
    });
}
setTimeout(function(){cargarAlgo()}, 60000);