// ==UserScript==
// @name       PC add margin
// @version    1.0
// @description  Add margin Planete-Casio's chat
// @match      http://www.planet-casio.com/Fr/shoutbox/
// @author     Dark Storm
// ==/UserScript==

var messages = document.getElementsByClassName('messages')[0];
messages.style.paddingLeft = "10px";