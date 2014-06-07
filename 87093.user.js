// ==UserScript==
// @name           Gaia-width-fix
// @namespace      http://userscripts.org/users/228010
// @description    Fixes the width of the new Gaia layout. 
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

addGlobalStyle('#content-padding, #thread_leaderboard_ad, #gaia_footer, #gaia_content #bd { width: inherit; border: none; }');