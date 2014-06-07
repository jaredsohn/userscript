// ==UserScript==
// @name           Bokus - Göm "Tyck till"-knapp
// @namespace      http://codeodyssey.se
// @include        http://www.bokus.com/*
// ==/UserScript==

(function () {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#kundo_button_container { display: none !important; }');

})();