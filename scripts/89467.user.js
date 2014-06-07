// ==UserScript==
// @name           Gaia-font-size-regulator
// @namespace      http://userscripts.org/users/227975
// @description    Makes all posts in lovely size 11 font.
// @include        http://*gaiaonline.com/forum/*
// @include        http://*gaiaonline.com/guilds/*
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

addGlobalStyle('.postcontent, .postcontent span { font-size: 13px !important; }');