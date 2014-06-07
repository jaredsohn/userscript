// ==UserScript==
// @name           Gaia-heaven-normalizer
// @namespace      http://userscripts.org/users/227975
// @description    Makes the "Heaven" forum have a normal background.
// @include        http://*gaiaonline.com/forum/*
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

addGlobalStyle('.event_bg { background: #e4ded8 !important; } #content-padding { background: white !important; } .event_bg .post { border-bottom: 3px solid #CED3F7!important; }');