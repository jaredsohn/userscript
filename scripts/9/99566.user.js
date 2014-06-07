// ==UserScript==
// @name           DVPMenuFixedOnTop
// @namespace      http://www.developpez.net/forums/
// @description    Fixe le menu DVP en haut de la page
// @include        http://www.developpez.net/forums/
// ajouter d'autre include pour avoir le même effet sur d'autre page que le forum
// @author 		   golgotha
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#quicknav {  left: 50%; margin-left: -450px; position: fixed; z-index: 2; }');