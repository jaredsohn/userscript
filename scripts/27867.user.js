// ==UserScript==
// @name           Plurk Timeline Cleaner
// @namespace      http://mikeontv.com/
// @description    Removes the updater (View New/Updated Plurks & Mark as read) from Plurk.com timeline.
// @include        *plurk.com*
// ==/UserScript==
addGlobalStyle('#dynamic_logo {display:none;}#updater {display:none;}.block_bg .div_one_line{border-left:0px;');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}