// ==UserScript==
// @name Tetris Friends Ad Remover
// @namespace http://userscripts.org/scripts/show/115116
// @description Removes video ads before each game of Tetris.
// @include http://www.tetrisfriends.com/games/*/game.php
// @version 20 December 2013
// @author knux
// ==/UserScript==
addEventListener("DOMContentLoaded", function(){$(".game_preroll_container").remove(); gamePrerollComplete()});