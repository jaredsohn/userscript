// ==UserScript==
// @name           GLB AI Expand In/Out Textboxen
// @namespace      Bogleg
// @description    Expands Textboxen in GLB Offense/Defense AI page so you can see the whole Input/Output name
// @version        1.2.1
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('input[type=text][id*=put_name_]').attr('size', 39);
$('div[class$=put_delete]').each(function() {
	this.style.width = $(this).hasClass('input_delete') ? '400px' : '275px';
});
