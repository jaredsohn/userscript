// ==UserScript==
// @name        GestionResellers AvisaIVA
// @namespace   Misael.K
// @description Avisa al usuario si está viendo precios sin IVA.
// @include     https://www.gestionresellers.com.ar/extranet/listaArticulos
// @version     1
// @grant       none
// ==/UserScript==

function contentEval(source) {
    // Check for function input.
    if ('function' == typeof source) {
        // Execute this function with no arguments, by adding parentheses.
        // One set around the function, required for valid syntax, and a
        // second empty set calls the surrounded function.
        source = '(' + source + ')();'
    }

    // Create a script node holding this source code.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.
    document.body.appendChild(script);
    document.body.removeChild(script);
}

contentEval(function() {
    var tipoPrecio = document.querySelector("div.tipo_precio");
    var textos = tipoPrecio.textContent.split("\n");
    var textoIVA = textos[textos.length - 1];
    textoIVA = textoIVA.trim();
    if (textoIVA == "PRECIOS SIN IVA") {
        alert("ATENCIÓN\nSE ESTÁN MOSTRANDO PRECIOS SIN IVA");
    }
});