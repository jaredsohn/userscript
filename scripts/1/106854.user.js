// ==UserScript==
// @name           Google Calendar Visible Today
// @description    Makes Today in new Google Calendar Theme much more visible.
// @namespace      http://userscripts.org/users/365154
// @include        http*://www.google.com/calendar/render*
// @version        0.1
// @author         josef dot sabl at gmail dot com
// ==/UserScript==

function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
    '.st-bg-today { background: #ddd }'
    + '.st-dtitle-today { background: none }'
    + '.dp-today-selected { background: #D34836; color: white; }'
);