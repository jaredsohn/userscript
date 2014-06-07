// ==UserScript==
// @name           pbr Formation Scout
// @description    Scouts a game and outputs the offense and defense play calls.
// @namespace      glbFS
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include        http://216.245.193.2/game/game.pl?game_id=*&mode=pbp
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp&quarter=*
// @include        http://216.245.193.2/game/game.pl?game_id=*&mode=pbp&quarter=*
// @version        0.01
// ==/UserScript==

window.setTimeout( 
	function() {
		runFormationScout();
	}, 
	1500
);

function runFormationScout() {
	alert("Dork! This script does nothing");
}
//---------------------- end --------------------------------

