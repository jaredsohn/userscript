// ==UserScript==
// @name           Full Plurk Timeline
// @namespace      http://danillonunes.net
// @description    Show complete plurks in the timeline
// @include        http://*plurk.com*
// @version        0.1
// ==/UserScript==
// based on Plurk Timeline Cleaner ( http://userscripts.org/scripts/show/27867 )
addGlobalStyle('.plurk .truncated { width: 380px; height: auto; white-space: normal; } .dots { display: none; }');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}