// ==UserScript==
// @name           GLB Archetype to scouting page
// @namespace      GLB
// @author         DDCUnderground
// @description    GLB Archetype to scouting page
// @include        http://goallineblitz.com/game/scout_team.pl?team_id=*
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==

$(document).ready(function(){

	$('a[href*="/game/player.pl?player_id="]').each(function(z){
		var linkstr="http://goallineblitz.com" + $(this).attr('href');
		$.ajax({
			 async: true,
			 type: 'GET',
			 url: linkstr,
			 success: function(returned_data) {
					  var playerarc = $('img[src*="/images/game/archetypes"]:first',returned_data).parent().html();
					  var playerlink = $('a[href*="/game/player.pl?player_id="]:first',returned_data).attr('href');
					  $('a[href="'+playerlink+'"]:first').append(playerarc);
	
			 }
		})
	})
})
