// ==UserScript==
// @name                Got No Satisfaction
// @namespace      umbrae
// @description      Removes the UserVoice and Get Satisfaction buttons at the side of webpages.
// @include             *
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

addGlobalStyle('#uservoice-feedback-tab, #fdbk_tab { visibility: hidden !important; }');