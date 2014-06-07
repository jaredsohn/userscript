// ==UserScript==
// @name           Gaia-width-fix
// @namespace      http://userscripts.org/users/227975
// @description    Fixes the width of the new Gaia layout.
// @include        http://*gaiaonline.com/forum/*
// @include        http://*gaiaonline.com/guilds/*
// @include        http://*gaiaonline.com/profile/privmsg.php*
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
