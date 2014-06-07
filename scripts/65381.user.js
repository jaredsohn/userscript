// ==UserScript==
// @name           Kingdom Page Skin
// @namespace      http://haiku.merseine.nu/
// @description    Kingdom Page Skin
// @include        http://utopia-game.com/wol/game/kingdom_details*
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

addGlobalStyle('#kingdom-details-statistics { font-size:10px; color: #FFEDCD; width:320px;}');
addGlobalStyle('#kingdom-details-warfare { font-size:10px; color: #FFEDCD; width:320px;}');
addGlobalStyle('table.data { font-size:11px;}');
addGlobalStyle('h2 { font-size: 12px;}');