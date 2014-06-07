// ==UserScript==
// @name Tetris Friends Restart Button
// @namespace http://userscripts.org/scripts/show/186497
// @description Adds a nifty "Restart Game" button underneath the "Options" button on the left side of the page.  Pressing "[" restarts the game, too.  Single-player games only.
// @include http://*tetrisfriends.com/games/Marathon/game.php*
// @include http://*tetrisfriends.com/games/Ultra/game.php*
// @include http://*tetrisfriends.com/games/Sprint/game.php*
// @include http://*tetrisfriends.com/games/Survival/game.php*
// @include http://*tetrisfriends.com/games/Mono/game.php*
// @grant none 
// @version 21 December 2013
// @author knux
// ==/UserScript==
addEventListener("DOMContentLoaded", 
function(){
restartScript = document.createElement("script");
restartScript.innerHTML = 
'function restartGame(){var flashEl = document.getElementById("contentFlash");' + 
'flashEl.as3_tetrisGameRestart();' + 
'flashEl.focus();};' + 
'var restartEl = document.createElement("a");' + 
'restartEl.setAttribute("href", "javascript:restartGame()");' + 
'restartEl.innerHTML = "Restart Game";' + 
'document.getElementById("game_options").parentNode.appendChild(document.createElement("br"));' + 
'document.getElementById("game_options").parentNode.appendChild(restartEl);' + 
'document.getElementById("contentFlash").onkeyup = function(e){if(e.keyCode == 219) restartGame()}';
document.body.appendChild(restartScript);
})