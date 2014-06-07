// ==UserScript==
// @name           OG Throne Skin
// @namespace      http://haiku.merseine.nu/
// @description    OG Throne Skin
// @include        http://utopia-game.com/wol/game/throne
// ==/UserScript==

//

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#tabbed_panel { border: 0px;}');
