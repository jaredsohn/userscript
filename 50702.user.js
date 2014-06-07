// ==UserScript==
// @name           GLB DPC Play Save As New Play
// @namespace      Bogleg
// @version        1.0.0
// @include        http://goallineblitz.com/game/team_create_defense.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

if ($('div.tactic_container:contains(Current Custom Defensive Plays)').length == 0) { // don't work on the play index page

$('input[name=action]').before('<div class="small_head"><input type="checkbox" id="save_as_new_play" /> Save as New Play</div>');
var origPlayId = $('input[name=play_id]').val();
$('#save_as_new_play').change(function() {
	if ($(this).attr('checked')) {
		$('input[name=play_id]').val('');
	} else {
		$('input[name=play_id]').val(origPlayId);
	}
});

} // end if (!isIndex)
