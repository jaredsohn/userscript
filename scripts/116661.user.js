// ==UserScript==
// @name           Gaia - Auto Font: Size 11px font.
// @namespace      Created by Kloob.
// @description    Makes all posts on Gaia's forums/guilds a nice small size 11 font.
// @include        http://*forum.tribalwars.ae/*
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

addGlobalStyle('.postcontent, .postcontent span { font-size: 11px !important; }');