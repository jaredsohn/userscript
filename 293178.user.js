// ==UserScript==
// @name        Destiny Chat on GameOn
// @namespace   com.lsenger
// @description Replace Twitter"chat" with Destiny one
// @include     http://www.gameon.gg/stream
// @version     1
// @grant       none
// ==/UserScript==
document.getElementById("chat").children[0].src="http://www.destiny.gg/embed/chat"