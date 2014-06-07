// ==UserScript==
// @name           Meneame Troll Ignore
// @namespace      meneame-troll-ignore
// @author         GONZO (Javier González - gonzomail@gmail.com)
// @description    Oculta definitivamente los mensajes de Menéame en blanco (negativos o ignorados), como si nunca hubiesen sido escritos.
// @include        http://meneame.net/*
// @include        https://meneame.net/*
// @include        http://www.meneame.net/*
// @include        https://www.meneame.net/*
// ==/UserScript==


// Funcion que añade codigo CSS en la pagina. Obtenido de Internet, fuente: http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Hace desaparecer -como si no estuviesen- los mensajes (comentarios y notas) etiquedados en blanco.
// Se activa por dos razones posibles: usuario ignorado manualmente por perfil o demasiados votos negativos.
addGlobalStyle('.hidden, .comment-body-hidden, .comment-meta-hidden { display:none; }');