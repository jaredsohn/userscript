// ==UserScript==
// @name          gaiaonline.com send text message removal
// @description   remove send as text message option in pms
// @include       http://*gaiaonline.com/profile/privmsg*
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

addGlobalStyle(
'.opt_text .sig:first-child * {display:none;} .opt_text {height:auto !important;}' );