// ==UserScript==
// @name		    OGame: Chat
// @namespace		localhost
// @description		Chat for OGame
// @include         http://*.ogame.*/game/index.php?*page=*
// @include         http://*-*.ogame.gameforge.com/game/index.php?page=*
// @exclude		    http://board.*.ogame.gameforge.com
// @copyright		2013, Asiman
// @license		    GNU
// @version 		0.1
// @author 		    Asiman
// @grant           none
// @homepage 		http://logserver.net
// ==/UserScript==

var chatScript = document.createElement("script");
    chatScript.src = "http://chat.logserver.su/js/chat.js";
document.body.appendChild(chatScript);