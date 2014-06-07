// ==UserScript==
// @run-at        document-end
// @name          Ogame game
// @namespace     ogamegame
// @description	  Позволяет уничтожить игру
// @version       1.0.0
// @updateURL     http://userscripts.org/scripts/source/160942.meta.js
// @installURL    http://userscripts.org/scripts/source/160942.user.js
// @downloadURL   http://userscripts.org/scripts/source/160942.user.js
// @author        Demien
// @include       *.ogame.*/game/index.php?page=*

// ==/UserScript==

function runOgameGame() {
	var new_game = document.createElement('script');
	new_game.setAttribute("type", "application/javascript");
	new_game.src = 'http://erkie.github.com/asteroids.min.js';
	document.body.appendChild(new_game);
}

$('#bar li#playerName .textBeefy').after('<a class="destroy_game" href="javascript:void(0);">&nbsp;</a>');
$('.destroy_game').css({background: 'url("http://gf1.geo.gfsrv.net/cdn94/297ee218d94064df0a66bd41a04d28.png") no-repeat 0px -654px',
'width':'16px', 'height':'16px'});

$(document).on('click', '.destroy_game', function(e) {
	e.preventDefault();
	runOgameGame();
});