// ==UserScript==
// @name           full viewport
// @description    small thingy to make webxms use the whole viewport
// @author         Patrizio
// @match https://web.xms.me/
// ==/UserScript==

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('#app.default { top:0; left:0; margin-left: 0; margin-top:0; }');

addStyle('#app { width:100%;height:100%; }');
