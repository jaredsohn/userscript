// ==UserScript==
// @name           Remove Game Announcement
// @namespace      http://haiku.merseine.nu/
// @description    Remove Game Announcement
// @include        http://utopia-game.com/wol/game/throne
// ==/UserScript==

//

var element = document.getElementById("throne-game-message");
if (element) {
    element.parentNode.removeChild(element);
}

