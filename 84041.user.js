// ==UserScript==
// @name           Test Server Player Stat Exporter
// @namespace      rockitsauce
// @description    Export player stats on test server 
// @include        http://test.goallineblitz.com/game/game.pl?game_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$(document).ready( function() {
	var el = {
		button_export: "<div id='tab_export' class='tab_off'><a id='btn_export' href='#'>Export Stats</a></div>",
		print: "<div id='print'></div>"
	};
	
	var properties = {
		teams: [],
		sections: {
			passing: {
				table: [{ index: 0, name: '#fd-table-1'}, { index: 1, name: '#fd-table-2' }], 
				name: "Passing", 
				mask: ['team', 'section', 'position', 'name', 'plays', 'comp', 'att', 'yds', 'pct', '[y/a]', 'hurry', 'sack', 'sackyd', '[int]', 'td'], 
				players: []
			},
			rushing: {
				table: [{ index: 0, name: '#fd-table-3'}, { index: 1, name: '#fd-table-4' }], 
				name: "Rushing", 
				mask: ['team', 'section', 'position', 'name', 'plays', 'rush', 'yds', '[avg]', 'td', 'brtk', 'tfl', 'fum', 'fuml'], 
				players: []
			},
			receiving: {
				table: [{ index: 0, name: '#fd-table-5'}, { index: 1, name: '#fd-table-6' }], 
				name: "Receiving", 
				mask: ['team', 'section', 'position', 'name', 'plays', 'rec', 'yds', '[avg]', 'yac', 'td', '[drop]', 'fum', 'fuml'], 
				players: []
			},
			kicking: {
				table: [{ index: 0, name: '#fd-table-7'}, { index: 1, name: '#fd-table-8' }], 
				name: "Kicking", 
				mask: ['team', 'section', 'position', 'name', 'fgm', 'fga', '[0-19a]', '[0-19m]', '[20-29a]', '[20-29m]', '[30-39a]', '[30-39m]', '[40-49a]', '[40-49m]', '[50+a]', '[50+m]', 'xpm', 'xpa'], 
				players: []
			},
			punting: {
				table: [{ index: 0, name: '#fd-table-9'}, { index: 1, name: '#fd-table-10' }], 
				name: "Punting", 
				mask: ['team', 'section', 'position', 'name', 'punts', 'yds', '[avg]'], 
				players: []
			},
			kickpuntreturn: {
				table: [{ index: 0, name: '#fd-table-11'}, { index: 1, name: '#fd-table-12' }], 
				name: "KickPuntReturn", 
				mask: ['team', 'section', 'position', 'name', 'kr', 'kyds', 'kavg', 'ktd', 'pr', 'pyds', 'pavg', 'ptd'], 
				players: []
			},
			specialteams: {
				table: [{ index: 0, name: '#fd-table-13'}, { index: 1, name: '#fd-table-14' }], 
				name: "SpecialTeams", 
				mask: ['team', 'section', 'position', 'name', 'plays', 'tk', 'mstk', 'ffum', 'frec', 'fumrtd', 'pnkd', 'brtk', 'fum', 'fuml'], 
				players: []
			},
			offensiveline: {
				table: [{ index: 0, name: '#fd-table-15'}, { index: 1, name: '#fd-table-16' }], 
				name: "OffensiveLine", 
				mask: ['team', 'section', 'position', 'name', 'plays', 'pancakes'], 
				players: []
			},
			defense: {
				table: [{ index: 0, name: '#fd-table-17'}, { index: 1, name: '#fd-table-18' }], 
				name: "Defense", 
				mask: ['team', 'section', 'position', 'name', 'plays', 'tk', 'mstk', 'sack', 'yds', 'hry', 'tfl', 'ffum', 'fumr', 'pd', 'int', 'intyds', 'deftd', 'pnkd'], 
				players: []
			}
		}
	};
	
	var fn = {
		init: function() {
			$('.subhead_link_bar').append(el.button_export);
			$('#box_score').prepend(el.print);
			$('#btn_export').click(fn.collect);
		},
		collect: function() {
			for each (section in properties.sections)
			{
				for each (table in section.table) {
					var t = $(table.name);
					$('tr', t).each(function() {
						if ($(this).attr('class') == 'nonalternating_color2') return;
						var stats = ["'" + $('.big_head a:eq(' + table.index + ')').text() + "'", "'" + section.name + "'"];
						$('td', this).each(function() {
							if ($(this).is('.box_score_player_stat_name')) {
								stats.push("'" + $.trim($('span', this).text()) + "'");
								stats.push("'" + $('a', this).text() + "'");
							}
							else {
								var stat = $(this).text();
								if (stat.indexOf('/', 0) > -1) {
									stats.push(stat.split('/')[0]); 
									stats.push(stat.split('/')[1]);
								}
								else
									stats.push(stat);
							}
						});
						section.players.push(stats);					
					});
				}
			}
			
			for each (section in properties.sections)
			{
				var query = "INSERT INTO " + section.name + " (" + section.mask + ")<br />";
				for each (player in section.players)
					query += "SELECT " + player + "<br />UNION ALL<br />";
				$('#print').append(query.substring(0, query.length - 15) + "<br />GO<br />");
			}
		}
	};
	
	fn.init();
});