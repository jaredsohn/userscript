// ==UserScript==
// @name          Fix CSS SendGrid
// @namespace     http://sendgrid.com/statistics/email/bryan
// @description   Fixes stupid CSS.
// @include       http://sendgrid.com/statistics/email
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

addGlobalStyle('div.alpha-content {width:93% !important}');