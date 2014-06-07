// ==UserScript==
// @name           Mostrar Foto Perfil Desconocidos Tuenti
// @namespace      mostrar_foto_perfil_desconocidos_tuenti
// @include        http://www.tuenti.com/*
// ==/UserScript==

function aniadirEstiloGlobal(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
aniadirEstiloGlobal('.outsideNetwork { opacity:1;); }');