// ==UserScript==
// @name           Remove Monarch Message
// @namespace      http://haiku.merseine.nu/
// @description    Remove Monarch message
// @include        http://utopia-game.com/wol/game/throne
// ==/UserScript==

//

var element = document.getElementById("throne-monarch-message");
if (element) {
    element.parentNode.removeChild(element);
}
