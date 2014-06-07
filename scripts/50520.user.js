// ==UserScript==
// @name           GLB Roster Exporter
// @namespace      rockitsauce
// @description    Creates comma delimited list of all players and their ratings.
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

$(document).ready( function() {
	var elements = {
		textbox: "<div id='display' style='z-index: 999; display: none; top: 0; left: 0'><textarea rows='20' cols='191' id='output' /></div>",
		button: "&nbsp;&nbsp;&nbsp;<input type='button' id='export' value='Export Roster' />"
	};
	
	var players = [];
	var track = 0;
	
	var fn = {
		getPlayers: function() {
			$('.player_name_short a, .player_name a').each( function(ix, link) {
				var player = {
					name: $(link).text(),
					link: $(link).attr('href'),
					position: "",
					vitals: [],
					ratings: [],
					level: ""
				};
				if (player.link.indexOf('player') > 0) players.push(player);
			});
			fn.loop();
			return this;
		},
		loop: function() {
			players[track] != null ? fn.getRatings() : fn.show();
		},
		getRatings: function(link, id) {
			$.ajax({
				url: players[track].link,
				cache: true,
				dataType: 'html',
				success: function(html){
					$('.stat_value_tall, .stat_value_tall_boosted', html).each( function(i, num) {
						players[track].ratings.push($(num).text());
					});
					$('.skill_level', html).each( function(i, num) {
						players[track].ratings.push($(num).text());
					});
					players[track].position = $('.position', html).text();
					$('.vital_data', html).each( function(i, num) {
						players[track].vitals.push($(num).text());
					});
					players[track].level = $('.current_stats_value:eq(0)', html).text();
					track++;
				},
				complete: function() {
					fn.loop();
				}
			});
		},
		show: function() {
			$.each(players, function(ix, player) {
				var e = $('#output').text();
				$('#output').text(e + player.position + "|" + player.name + "|" + player.level + "|" + player.vitals.join("|") + "|" + player.ratings.join("|") + "\r\n" );
			});
			$('#display').show();
			$('#export').after('<span>&nbsp;&nbsp;&nbsp;&nbsp;Finished</span>');
		},
		draw: function() {
			$('div .medium_head:contains("Offense Roster")').append(elements.button);
			$('body').append(elements.textbox);
			return this;
		},
		register: function() {
			$('#export').bind('click', function() {
				fn.getPlayers();
			});
		}
	};
	fn.draw().register();
});