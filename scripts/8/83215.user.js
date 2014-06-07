// ==UserScript==
// @name           Saigon FB
// @namespace      Chazno
// @description    Saigon FB
// @version        1.9.0
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://216.245.193.2/game/replay.pl?game_id=*&pbp_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {



$('a[href=\'\/game\/player\.pl?player_id=1085974\']').text("Offensive FB");
$('a[href=\'\/game\/player\.pl?player_id=964810\']').text("Blocking FB");
});
