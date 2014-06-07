// ==UserScript==
// @name          Scheming Mind: Scroll comments to bottom
// @description   Automatically scrolls game comments to the bottom
// @include       http://www.schemingmind.com/game.aspx?game_id=*
// ==/UserScript==
var objDiv = document.getElementById('Div1');
objDiv.scrollTop = objDiv.scrollHeight;