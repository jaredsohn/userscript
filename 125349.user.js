// ==UserScript==
// @name           tablesort
// @namespace      http://utopia-game.com/wol/game/
// @include        http://utopia-game.com/wol/game/kingdom_details
// @require        http://autobahn.tablesorter.com/jquery.tablesorter.min.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$('.game-content table:nth-child(2n)').addClass('tablesorter');

$(".tablesorter thead").css('cursor','pointer');

$(".tablesorter").tablesorter(); 
