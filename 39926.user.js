// ==UserScript==
// @name           Schedule Matchup Comparison
// @namespace      rockitsauce
// @description    Team matchup comparison on mouse hover.  Game results on mouse hover.
// @include       http://goallineblitz.com/game/team.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js 
// ==/UserScript==

$('head')
	.append("<link href='http://goallineblitz.com/css/game/game.css' type='text/css' rel='stylesheet'>")
	.append("<link href='http://goallineblitz.com/css/game/compare_teams.css' type='text/css' rel='stylesheet'>"); 

$(document).ready( function() {
	var matchup_view = "<div id='matchup_view' style='padding: 5px; background-color: grey; width: 400px; z-index: 9999; position: absolute; display: none;'></div>";
	var stats_view = "<div id='stats_view' style='padding: 2px; background-color: grey; z-index: 9999; position: absolute; display: none;'><table><tr><td align='center'><table id='scoreboard'></table></td></tr><tr><td align='center'><table id='stats'></table></td></tr></table></div>";
	$('body').append(matchup_view).append(stats_view);
	
	$('a:contains("Matchup")').hover(
		function() {
			var link = $(this).attr('href');
			$("#matchup_view")
				.load(link + " .ratings")
				.css('left', $(this).offset().left + $(this).width() + 5)
				.css('top', $(this).offset().top)
				.show();
		},
		function() {
			$('#matchup_view').hide();
		}
	);
	
	$('a:contains("-")').hover(
		function() {
			var a = $(this);
			var link = a.attr('href');
			$.get(link, function(data) {
				var scoreboard = $('#scoreboard table:eq(0)', data).html();
				var stats = $('#box_score table:eq(1)', data).html();
				
				$('#scoreboard').html(scoreboard).css('width', '512px');
				$('#stats').html(stats).css('width', '512px');
				$('#stats_view')
					.css('left', a.offset().left + a.width() + 5)
					.css('top', a.offset().top)
					.show();
				$('#stats_view a').css('font-size', '10pt');
			});
		},
		function() {
			$('#stats_view').hide();
		}
	);
});

