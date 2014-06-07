// ==UserScript==
// @name           GLB AI (Defense) DPC Selection Sort
// @namespace      Bogleg
// @description    Alpha-sorts DPC plays in the selection pane for outputs
// @version        1.0.0
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('#custom_plays').append($('#custom_plays div.custom_play').sort(function(a, b) {
	return $(a).text() < $(b).text() ? -1 : 1;
}));
