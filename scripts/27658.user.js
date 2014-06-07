// ==UserScript==
// @name           YouTube Red Corner Remover
// @namespace      http://trevorcreech.com/ytred
// @description    Removes red corner from YouTube Partner videos.
// @include        http://youtube.com*
// @include        http://*.youtube.com*
// ==/UserScript==
addGlobalStyle('.partner-marker {display:none;}');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}