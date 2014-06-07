// ==UserScript==
// @name           Gmail Extras Remover
// @version        0.3
// @namespace      http://timkloske.com/
// @description    Removes extra content from the reply section of Gmail
// @include        *
// ==/UserScript==

(function(){

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.c0{display:none !important}');  

})();