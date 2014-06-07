// ==UserScript==
// @name           Kingdom Chooser Color Mod
// @namespace      http://haiku.merseine.nu/
// @description    Changes colors of the chooser with relations
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

var textareas = document.evaluate(
    "//*[@class='advice-message']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (textareas.snapshotLength) {
       addGlobalStyle('table#change-kingdom thead th { background-color: #400000; }');
} else {
    addGlobalStyle('table#change-kingdom thead th { background-color: #000040; }');
}
