// ==UserScript==
// @name           Remove Tabs from throne page
// @namespace      http://haiku.merseine.nu/
// @description    Remove Tabs from throne page
// @include        http://utopia-game.com/wol/game/throne
// ==/UserScript==

//

var element = document.getElementById("tabbed_menu");
if (element) {
    element.parentNode.removeChild(element);
}

