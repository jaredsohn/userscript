// ==UserScript==
// @name           GLB Test SA Reset Button
// @namespace      GLB Test
// @description   Resets all the SA's of a player on the test server
// @include        http://test.goallineblitz.com/game/edit_player_sa.pl?player_id=*
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==


function init(){
	$('DIV#content FORM').prev().before('<input type="button" id="gmReset" value="Reset SA\'s" /><br />');
	$('INPUT#gmReset').click(function(){
		$('DIV#content FORM INPUT:text').each(function(){
			$(this).attr('value','0');
		});
	});
};

init();