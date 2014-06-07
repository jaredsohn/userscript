// ==UserScript==
// @name           Rockitsauce GLB Game Scout Tool
// @namespace      rockitsauce
// @description    Scouting Tool
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include        http://test.goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include        http://goallineblitz.com/game/scout_team.pl?team_id=*
// @include        http://test.goallineblitz.com/game/scout_team.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

$(document).ready( function() {
	//var c = unsafeWindow.console;

	var el = {
		btn_scout: "<div id='tab_scout' class='tab_off'><a id='btn_scout'>Scout</a></div><div id='tab_gamelogs' class='tab_off'><a id='btn_gamelogs'>Manage Logs</a></div>",
		grid: "<div id='grid'></div>",
		status: "<span id='status' class='medium_head'></span>",
		filter: "<br /><br /><div id='filter'></div>",
		button_filter: "<div style='background-color: white; border: 1px solid #CCC; margin: 3px; width: 30px; height: 20px; line-height: 20px; text-align: center; color: #A03C19;' class='quarter_selector'><a id='btn_filter'>Filter</a></div>",
		button_clear: "<div style='background-color: white; border: 1px solid #CCC; margin: 3px; width: 30px; height: 20px; line-height: 20px; text-align: center; color: #A03C19;' class='quarter_selector'><a id='btn_clear'>Clear</a></div><div style='clear: both;' />",
		replay_header: "<table width='100%' class='stats' cellspacing='0' cellpadding='0' style='margin-bottom: 0px;'><tr class='nonalternating_color'>[text]</tr>",
		stat_header: "<table width='100%' class='stats' cellspacing='0' cellpadding='0' style='margin-bottom: 0px;'><tr class='nonalternating_color'>[text]</tr>[header][stats]</table><div style='clear: both; />",
		stat_pass: "<tr class='nonalternating_color2'><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-1' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Plays”'>Plays</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-2' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Comp”'>Comp</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-3' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Att”'>Att</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-4' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Yds”'>Yds</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-5' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Pct”'>Pct</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-6' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Y/A”'>Y/A</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-7' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Hurry”'>Hurry</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-8' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Sack”'>Sack</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-10' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Int”'>Int</a></th></tr>",
		stat_run: "<tr class='nonalternating_color2'><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-1' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Plays”'>Plays</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-2' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Rush”'>Rush</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-3' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Yds”'>Yds</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-4' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Avg”'>Avg</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-6' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “BrTk”'>BrTk</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-7' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “TFL”'>TFL</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-8' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Fum”'>Fum</a></th></tr>",
		stat_defense: "<tr class='nonalternating_color2'><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-1' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Ply”'>Ply</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-2' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Tk”'>Tk</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-3' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “MsTk”'>MsTk</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-4' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Sack”'>Sack</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-6' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Hry”'>Hry</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-7' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “TFL”'>TFL</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-8' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “FFum”'>FFum</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-10' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “PD”'>PD</a></th><th class='sortable-numeric favour-reverse box_score_player_stat fd-column-11' style='-moz-user-select: none;'><a class='fdTableSortTrigger' title='Sort on “Int”'>Int</a></th></tr>",
		values_pass: "<tr class='alternating_color1'><td class='box_score_player_stat'>[plays]</td><td class='box_score_player_stat'>[comp]</td><td class='box_score_player_stat'>[att]</td><td class='box_score_player_stat'>[yds]</td><td class='box_score_player_stat'>[pct]</td><td class='box_score_player_stat'>[yatt]</td><td class='box_score_player_stat'>[hurry]</td><td class='box_score_player_stat'>[sack]</td><td class='box_score_player_stat'>[int]</td></tr>",
		values_run: "<tr class='alternating_color1'><td class='box_score_player_stat'>[plays]</td><td class='box_score_player_stat'>[rush]</td><td class='box_score_player_stat'>[yds]</td><td class='box_score_player_stat'>[avg]</td><td class='box_score_player_stat'>[brktk]</td><td class='box_score_player_stat'>[tfl]</td><td class='box_score_player_stat'>[fum]</td></tr>",
		values_defense: "<tr class='alternating_color1'><td class='box_score_player_stat'>[plays]</td><td class='box_score_player_stat'>[tk]</td><td class='box_score_player_stat'>[mstk]</td><td class='box_score_player_stat'>[sack]</td><td class='box_score_player_stat'>[hry]</td><td class='box_score_player_stat'>[tfl]</td><td class='box_score_player_stat'>[ffum]</td><td class='box_score_player_stat'>[pd]</td><td class='box_score_player_stat'>[int]</td></tr>",
		values_replay: "<tr class='alternating_color1 pbp_play_row'><td style='white-space: nowrap'>[Down]</td><td style='white-space: nowrap'>[Marker]</td><td>[Outcome]</td><td style='white-space: nowrap'><a href='[Link]' target='_blank'>Replay</a></td></tr>",
		game_log: "<div id='game_log'></div>",
		temp: "<div id='temp' style='display: none;'></div>",
		button_multi: "<div class='subtab_off'><a id='btn_multi'>Play by Play</a></div>",
		btn_scout_multi: "<input type='button' value='Scout Checked' id='btn_scout_multi' />"
	};
	
	var play = function(row) {
		this.id = $('a', row).attr('href').split('=')[2];
		this.link = $('a', row).attr('href');
		this.outcome = $('.pbp_play', row).text();
		this.players = [];
		this.time = (parseInt($('.pbp_time_remaining', row).text().split(':')[0]) * 60) + parseInt($('.pbp_time_remaining', row).text().split(':')[1]);
		this.down = get.down($('.pbp_down', row).text()); 
		this.distance = get.distance($('.pbp_down', row).text());
		this.marker = get.marker($('.pbp_marker', row).text());
		this.breakdown = fn.parse_play(this.outcome);
		};
		
	var games = [];
	
	var game = {
		id: "",
		teams: {
			home: {
				id: '',
				name: ''
			},
			away: {
				id: '',
				name: ''
			}},
		plays: [],
		players: []
	};
	
	var get = {
		positions: function(players) {
			var pos = [];
			$.each(players, function(i, player) {
				pos.push(player.position);
			});
			return pos;
		},
		distance: function(text) {
			if (text.length == 0 || text.match('inches')) return 0;
			var d = $.trim(text.split('&')[1]);
			if (d == 'G')
				return parseFloat(text.split('OPP ')[1]);
			return parseFloat(d);
		},
		down: function(text) {
			if (text.length == 0) return 0;
			var d = $.trim(text.substring(0,1));
			return parseInt(d);
		},
		marker: function(text) {
			if (text.length == 0) return 0;
			var s = text.split(' ');
			return s[0] == 'OWN' ? (parseFloat(s[1]) + 50) : parseFloat(s[1]);
		},
		yards: function(text) {
			var y = 0;
			if (text.match('yd gain')) {
				var left = text.split('yd gain')[0];
				left = left.substring(left.lastIndexOf('(') + 1, left.length);
				y = parseFloat($.trim(left));
			}
			else if (text.match('yd loss')) {
				var left = text.split('yd loss')[0];
				left = left.substring(left.lastIndexOf('(') + 1, left.length);
				y = parseFloat($.trim(left)) * -1;
			}
			return y;
		},
		players: function(players, ptid, data) {
			var temp = []; 
			
			for (var key in ptid) {
				var player = {};
				player.team = ptid[key];
				player.id = key;
				player.name = players[key].name;
				player.position = players[key].position;
				player.icons = [];
				temp.push(player);
			}
			
			for (var tick in data) {
				for (var key in data[tick])
					if (data[tick][key].icon)
						for (var p in temp)
							if (temp[p].id == data[tick][key].id)
								if ($.inArray(data[tick][key].icon, temp[p].icons) == -1)
									temp[p].icons.push(data[tick][key].icon);
			}
			
			return temp;
		},
		off_team: function(current) {
			if (current.breakdown.type != 'pass' && current.breakdown.type != 'rush') return '';
			var id = '';
			$.each(current.players, function(i, player) {
				if (player.position == 'QB') {
					id = player.team;
				}
			});
			return id;
		},
		def_team: function(current) {
			if (current.breakdown.type != 'pass' && current.breakdown.type != 'rush') return '';
			var id = '';
			$.each(current.players, function(i, player) {
				if (player.position == 'NT')
					id = player.team;
			});
			return id;
		},
		dformation: function(current) {
			var pos = get.positions(current.players);
			// 4-4, 4-3, 3-4, Nickel, 3-3-5, Dime, Quarter
			if ($.inArray('CB5', pos) > -1) return 'Quarter';
			if ($.inArray('SS', pos) == -1) return '4-4';
			if ($.inArray('CB4', pos) > -1 && $.inArray('LOLB', pos) == -1) return 'Dime';
			if ($.inArray('DT', pos) > -1 && $.inArray('ROLB', pos) == -1) return 'Nickel';
			if ($.inArray('DT', pos) == -1 && $.inArray('CB3', pos) > -1) return 'Nickel 3-3-5';
			if ($.inArray('RILB', pos) > -1 && $.inArray('SS', pos) > -1) return '3-4';
			return '4-3'			
		},
		oformation: function(data, current) {
			var pos = get.positions(current.players);
			if ($.inArray('K', pos) > -1) return 'Kick';
			if ($.inArray('P', pos) > -1) return 'Punt';
			if ($.inArray('WR5', pos) > -1) return 'Shotgun 5WR';
			if ($.inArray('WR4', pos) > -1 && $.inArray('WR5', pos) == -1) return 'Singleback Spread';
			
			var count_TE = 0;
			for (var p in pos) {
				if (pos[p] == 'TE') {
					count_TE += 1;
				}
			};
			if (count_TE == 3) {
				return 'Goalline';
			}
			if (count_TE == 2) {
				if ($.inArray('FB', pos) > -1) return 'Big I';
				return 'Singleback Big';
			}
			
			if (($.inArray('HB', pos) > -1) && ($.inArray('FB', pos) > -1)) {
				var id;
				for (var p in current.players) {
					if (current.players[p].position == 'FB')
						id = current.players[p].id;
				}
				var delta = fn.player_position(data, id);
				if (delta.y < 0) {
					// offense heading north
					if (delta.y <= -10) return 'Pro Set';
					if (delta.x <= -3) return 'Strong I';
					if (delta.x >= 3) return 'Weak I';
					return 'I';
				} 
				else {
					// offense heading south
					if (delta.y >= 10) return 'Pro Set';
					if (delta.x >= 3) return 'Strong I';
					if (delta.x <= -3) return 'Weak I';
					return 'I';
				}
			}
			
			if ($.inArray('WR3', pos) > -1) {
				var id;
				for (var p in current.players) {
					if (current.players[p].position == 'QB')
						id = current.players[p].id;
				}
				var delta = fn.player_position(data, id);
				if (delta.y > 7 || delta.y < -7) return 'Shotgun';
				
				for (var p in current.players) {
					if (current.players[p].position == 'WR2')
						id = current.players[p].id;
				}
				var delta = fn.player_position(data, id);
				if (delta.y <= -4.5 || delta.y >= 4.5)
					return 'Singleback Trips';
				return 'Singleback';
			}
			
			return 'Non-determined';
		},
		play_type: function(text) {
			if (text.match('penalty')) return 'penalty';
			if (text.match('spiked')) return 'spike';
			if (text.match('Kickoff')) return 'kickoff';
			if (text.match('Extra point')) return 'extra point';
			if (text.match('Punt')) return 'punt';
			if (text.match('field goal')) return 'field goal';
			if (text.match('incomplete')) return 'pass';
			if (text.match('timeout')) return 'timeout';
			if (text.match('Timeout')) return 'timeout';
			if (text.match('caught')) return 'pass';
			if (text.match('sacked')) return 'pass';
			if (text.match('intercepted')) return 'pass';
			if (text.match('fumbled')) return 'rush';
			if (text.match('rush')) return 'rush';
			if (text.match('pitch')) return 'rush';
			
			//c.log('Unidentified play: ' + text);
			return 'unidentified';
		},
		pass: {
			result: function(text) {
				if (text.match('dropped')) return 'dropped';
				if (text.match('incomplete')) 
					if (text.match('deflected')) return 'deflected incomplete'; 
					else return 'incomplete';
				if (text.match('caught')) 
					if (text.match('deflected')) return 'deflected completed';
					else return 'completed';
				if (text.match('intercepted')) return 'intercepted';
				return 'none';
			},
			direction: function(text) {
				if (text.match('screen')) return 'screen';
				if (text.match('left side')) return 'left';
				if (text.match('right side')) return 'right';
				if (text.match('middle')) return 'middle';
				return 'none';
			},
			rush: function(text) {
				if (text.match('hurried')) return 'hurried';
				if (text.match('sacked')) return 'sacked';
				return 'none';
			},
			quality: function(text) {
				if (text.match('thrown low')) return 'bad - thrown low';
				if (text.match('bad pass')) return 'bad';
				if (text.match('thrown away')) return 'thrown away';
				return 'good';
			},
			target: function(current) {
				if (current.breakdown.type != 'pass' || current.breakdown.offense.pass.rush == 'sacked') return '';
				var rec = current.outcome.split('pass to')[1];
				if (current.breakdown.offense.pass.direction == 'middle')
					return fn.player_id_by_name($.trim(rec.split('over the middle')[0]), current.players);
				else if (current.breakdown.offense.pass.direction == 'screen')
					return fn.player_id_by_name($.trim(rec.split('to the')[0]), current.players);
				else {
					return fn.player_id_by_name($.trim(rec.split('up the')[0]), current.players);
				}
			},
			passer: function(current) {
				if (current.breakdown.type != 'pass') return '';
				for (var q in current.players) {
					if (current.players[q].position == 'QB')
						return current.players[q].id;
				}
			}
		},
		rush : {
			direction: function(text) {
				if (text.match('pitch')) {
					if (text.match('to the right')) return 'pitch right';
					if (text.match('to the left')) return 'pitch left';
				}
				if (text.match('up the middle')) return 'middle';
				if (text.match('to the right')) return 'right';
				if (text.match('to the left')) return 'left';
				return 'fumble';
			},
			result: function(text) {
				if (text.match('fumbled')) return 'fumble';
				if (text.match('yd gain')) return 'gain';
				if (text.match('yd loss')) return 'loss';
				if (text.match('no gain')) return 'no gain';
			},
			rusher: function(currents) {
				if (current.breakdown.type != 'rush') return '';
				if (current.outcome.match('pitch')) {
					var run = current.outcome.split('pitch to')[1];
					return fn.player_id_by_name($.trim(run.split('to the')[0]), current.players);
				}
				else {
					return fn.player_id_by_name($.trim(current.outcome.split('rush')[0]),  current.players);
				}
			}
		},
		defense: {
			deflection: function(current) {
				if (current.outcome.indexOf('deflected by') == -1) return '';
				var left = current.outcome.split('deflected by')[1];
				return fn.player_id_by_name($.trim(left.split(']')[0]), current.players);
			},
			knockedloose: function(current) {
				if (current.outcome.indexOf('knocked loose') == -1) return '';
				var left = current.outcome.split('knocked loose by')[1];
				return fn.player_id_by_name($.trim(left.split(']')[0]), current.players);
			},
			interception: function(current) {
				if (current.outcome.indexOf('intercepted by') == -1) return '';
				var left = current.outcome.split('intercepted by')[1];
				return fn.player_id_by_name($.trim(left.split('(')[0]), current.players);
			},
			sack: function(current) {
				if (current.outcome.indexOf('sacked by') == -1) return '';
				var left = current.outcome.split('sacked by')[1];
				return fn.player_id_by_name($.trim(left.split('(')[0]), current.players);
			},
			hurry: function(current) {
				if (current.outcome.indexOf('hurried by') == -1) return '';
				var left = current.outcome.split('hurried by')[1];
				return fn.player_id_by_name($.trim(left.split(',')[0]), current.players);
			},
			tackle: function(current) {
				if (current.outcome.match('tackle:') == 0 &&
					(current.offense.type == 'rush' || current.offense.type == 'pass')) 
					return;
				
				var t = {made: {}, missed: []};
				var missed = [];
				
				var r = /\[([^]*?)\]/gi;
				
				while (token = r.exec(current.outcome)) {
					var left = token[1].split(':');
					if (left[0].indexOf('missed') > -1) {
						var miss = {};
						miss.type = (left[0].indexOf('diving') > -1) ? 'missed diving tackle' : 'missed tackle';
						miss.id = fn.player_id_by_name(left[1].split('(')[0], current.players);
						if (left[1].indexOf('(') > -1)
							miss.cause = left[1].split('(')[1].replace(')');
						missed.push(miss);
					}
					else if (left[0].indexOf('tackle:') > -1) {
						var made = {};
						made.type = $.trim(left[0]) == 'tackle' ? 'tackle' : $.trim(left[0]);
						made.id = fn.player_id_by_name(left[1], current.players);
						t.made = made;
					}
				}
				t.missed = missed;
				return t;
			}
		}
	};
	
	var fn = {
		init: function() {
			$('#tab_summary').after(el.btn_scout);
			$('#quarter_selectors').before(el.grid).before(el.temp).before(el.game_log);
			$('#btn_scout').click(fn.scout).css('cursor', 'pointer');
			$('#btn_gamelogs').click(fn.managelogs).css('cursor', 'pointer');
			$('.medium_head').append(el.status);
			$('#quarter_selectors').after(el.filter);
			$('.subtab_off:last').after(el.button_multi);
			$('#btn_multi').click(fn.multiscout);
		},
		multiscout: function() {
			var ctr = $('.tactic_container');
			ctr.html('');
			var saved = [];
			for each (var val in GM_listValues()) {
				saved.push(val);
			}
			$.each(saved, function(i, id) {
				var game = JSON.parse(GM_getValue(id));
				var teamid = $('#tab_profile a').attr('href').split('=')[1];
				if (game.teams.home.id == teamid || game.teams.away.id == teamid)
					ctr.append('<span><input type="checkbox" id="' + game.id + '" />  <a href="http://goallineblitz.com/game/scout_team.pl?team_id=' + game.teams.home.id + '&m=roster&for_team_id=0">' + game.teams.home.name + '</a> vs <a href="http://goallineblitz.com/game/scout_team.pl?team_id=' + game.teams.home.id + '&m=roster&for_team_id=0">' + game.teams.away.name + '</a></span><br />');
			});
			ctr.append('<br />' + el.btn_scout_multi);
			$('#btn_scout_multi').click(fn.gathergames);
			ctr.append(el.button_filter).append(el.button_clear).append(el.filter);
		},
		gathergames: function() {
			$('input:checked').each(function() {
				games.push(JSON.parse(GM_getValue($(this).attr('id'))));
			});
			fn.prepfilters();
		},
		managelogs: function() {
			var games = [];
			$('#game_log').show();
			for each (var val in GM_listValues()) {
				games.push(val);
			}
			$.each(games, function(i, game) {
				$('#game_log').append('<span>' + game + '</span><a href="#">  [X]</a><br />');
			});
			$('#game_log a').click(function() {
				GM_deleteValue($(this).prev().text());
				$(this).prev().text('');
				$(this).text('');
			});
		},
		summarize: function(plays) {
			var text = {
				pass: '', run: '', defense: ''
			};
			
			var totals = {
				passing: {
					plays: 0,
					completions: 0,
					attempts: 0,
					yards: 0,
					percentage: 0,
					yardsattempt: 0,
					hurries: 0,
					sacks: 0,
					interceptions: 0
				},
				rushing: {
					plays: 0,
					rushes: 0,
					yards: 0,
					average: 0,
					brokentackles: 0,
					tacklesforloss: 0,
					fumbles: 0
				},
				defense: {
					plays: 0,
					tackles: 0,
					missedtackles: 0,
					sacks: 0,
					yards: 0,
					hurries: 0,
					tacklesforloss: 0,
					fumbles: 0,
					deflections: 0,
					interceptions: 0
				}
			};
			
			$.each(plays, function(i, play) {
				if (play.breakdown.type == 'pass' || play.breakdown.type == 'rush') {
					var p = play.breakdown;
					switch (p.type) {
						case 'pass':
							totals.passing.plays += 1;
							totals.passing.completions += p.offense.pass.result.indexOf('completed') > -1 ? 1 : 0;
							totals.passing.attempts += p.offense.pass.rush != 'sacked' ? 1 : 0;
							totals.passing.yards += p.yards;
							totals.passing.hurries += p.offense.pass.rush == 'hurried' ? 1 : 0;
							totals.passing.sacks += p.offense.pass.rush == 'sacked' ? 1 : 0;
							totals.passing.interceptions += p.offense.pass.result == 'intercepted' ? 1 : 0;
							totals.defense.hurries += p.offense.pass.rush == 'hurried' ? 1 : 0;
							totals.defense.sacks += p.offense.pass.rush == 'sacked' ? 1 : 0;
							totals.defense.interceptions += p.offense.pass.result == 'intercepted' ? 1 : 0;
							totals.defense.deflections += p.offense.pass.result.indexOf('deflected') > -1 ? 1 : 0;
							break;
						case 'rush':
							totals.rushing.plays += 1;
							totals.rushing.rushes += 1;
							totals.rushing.yards += p.yards;
							totals.rushing.brokentackles += p.defense.tackle.missed.length;
							totals.rushing.tacklesforloss += p.offense.rush.result == 'loss' ? 1 : 0;
							totals.rushing.fumbles += p.offense.rush.result == 'fumble' ? 1 : 0;
							totals.defense.tacklesforloss += p.offense.rush.result == 'loss' ? 1 : 0;
							totals.defense.fumbles += p.offense.rush.result == 'fumble' ? 1 : 0;
							break;
					}
					totals.defense.plays += 1;
					totals.defense.tackles += p.defense.tackle.made.id != '' ? 1 : 0;
					totals.defense.missedtackles += p.defense.tackle.missed.length;
				}
			});
			
			// some misc calculations on the totals
			var per = ((totals.passing.completions / totals.passing.attempts) * 100).toString() + "00";
			if (parseFloat(per)) {
				if (per.indexOf('.') > -1)
					per = per.split('.')[0] + '.' + per.split('.')[1].substring(0,2)
				else
					per = per.substring(0, per.length - 2);
				per = per + "%";
			}
			else
				per = '0%';

			totals.passing.percentage = per;
			var ypa = parseFloat(totals.passing.yards / totals.passing.attempts).toString();
			totals.passing.yardsattempt = ypa.indexOf('.') > -1 ? ypa.split('.')[0] + '.' + ypa.split('.')[1].substring(0,2) : ypa;
			var rpc = parseFloat(totals.rushing.yards / totals.rushing.rushes).toString();
			totals.rushing.average = rpc.indexOf('.') > -1 ? rpc.split('.')[0] + '.' + rpc.split('.')[1].substring(0,2) : rpc;

			text.pass = el.values_pass
				.replace('[plays]', totals.passing.plays)
				.replace('[comp]', totals.passing.completions)
				.replace('[att]', totals.passing.attempts)
				.replace('[yds]', totals.passing.yards)
				.replace('[pct]', totals.passing.percentage)
				.replace('[yatt]', totals.passing.yardsattempt)
				.replace('[hurry]', totals.passing.hurries)
				.replace('[sack]', totals.passing.sacks)
				.replace('[int]', totals.passing.interceptions);
				
			text.run = el.values_run
				.replace('[plays]', totals.rushing.plays)
				.replace('[rush]', totals.rushing.rushes)
				.replace('[yds]', totals.rushing.yards)
				.replace('[avg]', totals.rushing.average)
				.replace('[brktk]', totals.rushing.brokentackles)
				.replace('[tfl]', totals.rushing.tacklesforloss)
				.replace('[fum]', totals.rushing.fumbles)
				
			text.defense = el.values_defense
				.replace('[plays]', totals.defense.plays)
				.replace('[tk]', totals.defense.tackles)
				.replace('[mstk]', totals.defense.missedtackles)
				.replace('[sack]', totals.defense.sacks)
				.replace('[hry]', totals.defense.hurries)
				.replace('[tfl]', totals.defense.tacklesforloss)
				.replace('[ffum]', totals.defense.fumbles)
				.replace('[pd]', totals.defense.deflections)
				.replace('[int]', totals.defense.interceptions);
				
			return text;
		},
		clear: function() {
			$('#filter :input').each(function(i, s) {
				s.selectedIndex = -1;
			});
		},
		filter_players: function() {
			var teams = []; 
			$('option:selected', this).each(function(i, id) { teams.push(id.value); });
			var players = $('#filter_players');
			players.html('');
			$.each(games, function(i, game) {
				$.each(game.players, function(i, player) {
					if ($.inArray(player.team, teams) > -1)
						players.append("<option value='" + player.id + "|" + player.position + "'>" + player.position + " " + player.name + "</option>");
				});
			});
		},
		filter_player_actions: function() {
			var players = [];
			var actions = [];
			var select = $('#filter_actions');
			select.html('');
			$('option:selected', this).each(function(i, id) { players.push(id.value.split('|')[0]); });
			
			$.each(games, function(i, game) {
				$.each(game.plays, function(i, play) {
					$.each(play.players, function(i, player) {
						if ($.inArray(player.id, players) > -1) {
							// target, passer, rusher, tackle, missed tackles, icons, deflection, interception, knockedloose
							if (play.breakdown.offense.pass.target == player.id)
								if ($.inArray('target', actions) == -1) actions.push('target');
							if (play.breakdown.offense.pass.passer == player.id)
								if ($.inArray('passer', actions) == -1) actions.push('passer');
							if (play.breakdown.offense.rush.rusher == player.id)
								if ($.inArray('rusher', actions) == -1) actions.push('rusher');
							if (play.breakdown.defense.sack == player.id)
								if ($.inArray('sack', actions) == -1) actions.push('sack');
							if (play.breakdown.defense.hurry == player.id)
								if ($.inArray('hurry', actions) == -1) actions.push('hurry');
							if (play.breakdown.defense.deflection == player.id)
								if ($.inArray('deflection', actions) == -1) actions.push('deflection');
							if (play.breakdown.defense.interception == player.id)
								if ($.inArray('interception', actions) == -1) actions.push('interception');
							if (play.breakdown.defense.knockedloose == player.id)
								if ($.inArray('knockedloose', actions) == -1) actions.push('knockedloose');
							if (play.breakdown.defense.deflection == player.id)
								if ($.inArray('deflection', actions) == -1) actions.push('deflection');
							if (play.breakdown.defense.tackle.made.id == player.id)
								if ($.inArray(play.breakdown.defense.tackle.made.type, actions) == -1) actions.push(play.breakdown.defense.tackle.made.type);
							$.each(play.breakdown.defense.tackle.missed, function(i, m) {
								if (m.id == player.id)
									if ($.inArray(m.type, actions) == -1) actions.push(m.type);
							});
							if (play.breakdown.defense.tackle.made.id == player.id) {
								if ($.inArray(play.breakdown.defense.tackle.made.type, actions) == -1) actions.push(play.breakdown.defense.tackle.made.type);
								if ($.inArray(play.breakdown.offense.pass.target, players) > -1) actions.push(m.cause); 
								if ($.inArray(play.breakdown.offense.rush.rusher, players) > -1) actions.push(m.cause); 
							}
							$.each(player.icons, function(i, icon) {
								if ($.inArray(icon, actions) == -1) actions.push(icon);
							});
						}
					});
				});
			});
			$.each(actions, function(i, a) {
				select.append('<option>' + a + '</option>');
			});
			select.show();
		},
		filter_display: function() {
			var type = $('option:selected', this).val();
			$('#run_filters').hide();
			$('#pass_filters').hide();
			if (type == 'rush') {
				$('#run_filters').show();
				$('#pass_filters :select option:selected').each(function(i, s) { $(s).attr('selected', ''); });
			}
			else if (type == 'pass') {
				$('#pass_filters').show();
				$('#run_filters :select option:selected').each(function(i, s) { $(s).attr('selected', ''); });
			}
			
		},
		filter_oplays: function() {
			var teams = [];
			$('#filter_teams option:selected').each(function(i, s) { teams.push(s.value) });
			var oformations = [];
			$('#filter_oformations option:selected').each(function(i, s) { oformations.push(s.value) });
			
			var playname = [];
			
			$.each(games, function(i, game) {			
				$.each(game.plays, function(i, play) {
					var add = false;
					if ((teams.length > 0) && (oformations.length > 0)) {
						if (teams.indexOf(play.breakdown.offense.team) > -1 && oformations.indexOf(play.breakdown.offense.formation) > -1)
							add = true;
					}
					else if (teams.length > 0) {
						if (teams.indexOf(play.breakdown.offense.team) > -1)
							add = true;
					}
					else if (oformations.length > 0) {
						if (oformations.indexOf(play.breakdown.offense.formation) > -1)
							add = true;
					}
					if (add)
						if ($.inArray(play.breakdown.offense.playname, playname) == -1 && play.breakdown.offense.playname != '') playname.push(play.breakdown.offense.playname);
				});
			});
			$('#filter_oplayname').parent().remove();
			$('#oplay_filters').append(fn.build_options(playname.sort(), 'multiple', 'oplayname', 'Offensive Plays'));
		},
		filter_dplays: function() {
			var teams = [];
			$('#filter_teams option:selected').each(function(i, s) { teams.push(s.value) });
			var dformations = [];
			$('#filter_dformations option:selected').each(function(i, s) { dformations.push(s.value) });
			var playname = [];
			
			$.each(games, function(i, game) {			
				$.each(game.plays, function(i, play) {
					var add = false;
					if ((teams.length > 0) && (dformations.length > 0)) {
						if (teams.indexOf(play.breakdown.defense.team) > -1 && dformations.indexOf(play.breakdown.defense.formation) > -1)
							add = true;
					}
					else if (teams.length > 0) {
						if (teams.indexOf(play.breakdown.defense.team) > -1)
							add = true;
					}
					else if (dformations.length > 0) {
						if (dformations.indexOf(play.breakdown.defense.formation) > -1)
							add = true;
					}
					
					if (add)
						if ($.inArray(play.breakdown.defense.playname, playname) == -1 && play.breakdown.defense.playname != '') playname.push(play.breakdown.defense.playname);
				});
			});
			$('#filter_dplayname').parent().remove();
			$('#dplay_filters').append(fn.build_options(playname.sort(), 'multiple', 'dplayname', 'Defensive Plays'));
		},
		filter: function() {
			// gather selected filters into arrays
			var teams = []
			$('#filter_teams option:selected').each(function(i, s) { teams.push(s.value) });
			var downs = [];
			$('#filter_downs option:selected').each(function(i, s) { downs.push(parseInt(s.value)) });
			var ytg = [];
			$('#filter_distance option:selected').each(function(i, s) { ytg.push(parseFloat(s.value)) });
			var markers = [];
			$('#filter_marker option:selected').each(function(i, s) { markers.push(parseInt(s.value)) });
			var oforms = [];
			$('#filter_oformations option:selected').each(function(i, s) { oforms.push(s.value) });
			var dforms = [];
			$('#filter_dformations option:selected').each(function(i, s) { dforms.push(s.value) });
			var players = [];
			$('#filter_players option:selected').each(function(i, s) { players.push(s.value) });
			var playerids = [];
			$('#filter_players option:selected').each(function(i, s) { playerids.push(s.value.split('|')[0]) });
			var types = [];
			$('#filter_playtype option:selected').each(function(i, s) { types.push(s.value) });
			var rushdir = [];
			$('#filter_rushdirection option:selected').each(function(i, s) { rushdir.push(s.value) });
			var passdir = [];
			$('#filter_passdirection option:selected').each(function(i, s) { passdir.push(s.value) });
			var passresult = [];
			$('#filter_passresult option:selected').each(function(i, s) { passresult.push(s.value) });
			var passquality = [];
			$('#filter_passquality option:selected').each(function(i, s) { passquality.push(s.value) });
			var passrush = [];
			$('#filter_passrush option:selected').each(function(i, s) { passrush.push(s.value) });
			var actions = [];
			$('#filter_actions option:selected').each(function(i, s) { actions.push(s.value) });
			var oplaynames = [];
			$('#filter_oplayname option:selected').each(function(i, s) { oplaynames.push(s.value) });
			var dplaynames = [];
			$('#filter_dplayname option:selected').each(function(i, s) { dplaynames.push(s.value) });
			
			var filter_count = 0;
			filter_count += teams.length > 0 ? 1 : 0;
			filter_count += downs.length > 0 ? 1 : 0;
			filter_count += ytg.length > 0 ? 1 : 0;
			filter_count += markers.length > 0 ? 1 : 0;
			filter_count += oforms.length > 0 ? 1 : 0;
			filter_count += dforms.length > 0 ? 1 : 0;
			filter_count += types.length > 0 ? 1 : 0;
			filter_count += players.length;
			filter_count += rushdir.length > 0 ? 1 : 0;
			filter_count += passdir.length > 0 ? 1 : 0;
			filter_count += passresult.length > 0 ? 1 : 0;
			filter_count += passquality.length > 0 ? 1 : 0;
			filter_count += passrush.length > 0 ? 1 : 0;
			filter_count += actions.length > 0 ? 1 : 0;
			filter_count += oplaynames.length > 0 ? 1: 0;
			filter_count += dplaynames.length > 0 ? 1: 0;
			
			var filtered = [];
			$.each(games, function(i, game) {
				$.each(game.plays, function(i, play) {
					var show = filter_count;
					if (teams.length > 0)
						show -= $.inArray(play.breakdown.offense.team, teams) > -1 ? 1 : 0;
					if (downs.length > 0)
						show -= $.inArray(play.down, downs) > -1 ? 1 : 0;
					if (ytg.length > 0)
						show -= $.inArray(play.distance, ytg) > -1 ? 1 : 0;
					if (markers.length > 0)
						show -= $.inArray(play.marker, markers) > -1 ? 1 : 0;
					if (oforms.length > 0)
						show -= $.inArray(play.breakdown.offense.formation, oforms) > -1 ? 1 : 0;
					if (dforms.length > 0)
						show -= $.inArray(play.breakdown.defense.formation, dforms) > -1 ? 1 : 0;
					if (oplaynames.length > 0)
						show -= $.inArray(play.breakdown.offense.playname, oplaynames) > -1 ? 1 : 0;
					if (dplaynames.length > 0) {
						show -= $.inArray(play.breakdown.defense.playname, dplaynames) > -1 ? 1 : 0;
						show -= $.inArray(play.breakdown.defense.team, teams) > -1 ? 1 : 0;
					}
					if (types.length > 0)
						show -= $.inArray(play.breakdown.type, types) > -1 ? 1 : 0;
					// players
					if (players.length > 0) {
						$.each(players, function(i, id) {
							$.each(play.players, function(x, player) {
								var pid = id.split('|')[0];
								var pos = id.split('|')[1];
								show -= player.id == pid && player.position == pos ? 1 : 0;
							});
						});
					}
					if (rushdir.length > 0)
						show -= $.inArray(play.breakdown.offense.rush.direction, rushdir) > -1 ? 1 : 0;
					if (passdir.length > 0)
						show -= $.inArray(play.breakdown.offense.pass.direction, passdir) > -1 ? 1 : 0;
					if (passresult.length > 0)
						show -= $.inArray(play.breakdown.offense.pass.result, passresult) > -1 ? 1 : 0;
					if (passquality.length > 0)
						show -= $.inArray(play.breakdown.offense.pass.quality, passquality) > -1 ? 1 : 0;
					if (passrush.length > 0)
						show -= $.inArray(play.breakdown.offense.pass.rush, passrush) > -1 ? 1 : 0;
					// target, passer, rusher, tackle, missed tackles, icons, deflection, interception, knockedloose
					if (actions.length > 0) {
						if (actions.indexOf('target') > -1)
							show -= $.inArray(play.breakdown.offense.pass.target, playerids) > -1 ? 1 : 0;
						if (actions.indexOf('passer') > -1)
							show -= $.inArray(play.breakdown.offense.pass.passer, playerids) > -1 ? 1 : 0;
						if (actions.indexOf('rusher') > -1)
							show -= $.inArray(play.breakdown.offense.rush.rusher, playerids) > -1 ? 1 : 0;
						if (actions.indexOf('tackle') > -1)
							show -= $.inArray(play.breakdown.defense.tackle.made.id, playerids) > -1 ? 1 : 0;
						if (actions.indexOf('sack') > -1)
							show -= $.inArray(play.breakdown.defense.sack, playerids) > -1 ? 1 : 0;
						if (actions.indexOf('hurry') > -1)
							show -= $.inArray(play.breakdown.defense.hurry, playerids) > -1 ? 1 : 0;
						if (actions.indexOf('deflection') > -1)
							show -= $.inArray(play.breakdown.defense.deflection, playerids) > -1 ? 1 : 0;
						if (actions.indexOf('interception') > -1) 
							show -= $.inArray(play.breakdown.defense.interception, playerids) > -1 ? 1 : 0;
						if (actions.indexOf('knockedloose') > -1)
							show -= $.inArray(play.breakdown.defense.knockedloose, playerids) > -1 ? 1 : 0;
						$.each(actions, function(i, act) {
							$.each(play.players, function(i, player) {
								if ($.inArray(player.id, playerids) > -1)
									show -= $.inArray(act, player.icons) > -1 ? 1 : 0;
							});
						});
					}				
					if (show == 0) 
						filtered.push(play);
				});
			});
			var table = $('#play_by_play_table');
			$('.nonalternating_color2,.pbp_spacer', table).hide();
			
			var pbp = "";
			if (table.length > 0) { // individual game
				$('.alternating_color1,.alternating_color2', table).each(function() {
					var row = $(this);
					var link = $('a', row).attr('href');
					row.hide();
					$.each(filtered, function(i, play) {
						if (link.indexOf(play.link) > -1) {
							row.show();
							var outcome = $('.pbp_play', row);
							if (outcome.text().indexOf(play.breakdown.offense.playname) == -1)
								outcome.append('<b style="color: DarkMagenta;">[' + play.breakdown.offense.formation + ' - ' + play.breakdown.offense.playname + ']</b>').append('<b style="color: DarkGreen;">[' + play.breakdown.defense.formation + ' - ' + play.breakdown.defense.playname + ']</b>');
						}
					});
				});
			}
			else { // multiple games
				pbp += el.replay_header
					.replace('[text]', '<td colspan="12">Plays</td>');
					
				$.each(filtered, function(i, play) {
					var marker;
					if (play.marker > 50)
						marker = 'OPP ' + (play.marker - 50);
					else if (play.marker == 50)
						marker = 'The 50';
					else
						marker = 'OWN ' + play.marker;
					
					var distance = 'G';
					if (play.distance)
						distance = play.distance;
						
					pbp += el.values_replay
						.replace('[Down]', play.down + ' & ' + distance)
						.replace('[Marker]', marker)
						.replace('[Outcome]', play.outcome + ' <b style="color: DarkMagenta;">[' + play.breakdown.offense.formation + ' - ' + play.breakdown.offense.playname + ']</b><b style="color: DarkGreen;">[' + play.breakdown.defense.formation + ' - ' + play.breakdown.defense.playname + ']</b>')
						.replace('[Link]', play.link);
				});
			}
			//c.log(filtered.length);
			
			var totals = fn.summarize(filtered);
			// set up stat display
			$('.stats').html('');
			$('#filter').append(el.stat_header.replace('[text]', '<td colspan="12">Passing</td>').replace('[header]', el.stat_pass).replace('[stats]', totals.pass));
			$('#filter').append(el.stat_header.replace('[text]', '<td colspan="12">Rushing</td>').replace('[header]', el.stat_run).replace('[stats]', totals.run));
			$('#filter').append(el.stat_header.replace('[text]', '<td colspan="12">Defense</td>').replace('[header]', el.stat_defense).replace('[stats]', totals.defense));
			if (table.length == 0) $('#filter').append(pbp);
		},
		prepfilters: function() {
			var box = $('#filter');
			box.html('');
			$('#quarter_selectors div:last').remove();
			// offensive formations
			var oformations = [];
			var dformations = [];
			var downs = [];
			var distances = [];
			var markers = [];
			var playtype = [];
			var rushdirection = [];
			var passdirection = [];
			var passresult = [];
			var passquality = [];
			var passrush = [];
			var oplayname = [];
			var dplayname = [];
			var score = [];

			$.each(games, function(i, game) {
				$.each(game.plays, function(i, play) {
					// play type
					if (play.breakdown.type == 'pass' || play.breakdown.type == 'rush') {
						if ($.inArray(play.down, downs) == -1 && play.down != 0) downs.push(play.down); // downs
						if ($.inArray(play.distance, distances) == -1 && !isNaN(play.distance) && play.distance != null) distances.push(play.distance); // distance
						if ($.inArray(play.marker, markers) == -1 && play.marker != 0) markers.push(play.marker); // marker
						if ($.inArray(play.breakdown.type, playtype) == -1) playtype.push(play.breakdown.type); // type
						// formations
						if ($.inArray(play.breakdown.offense.formation, oformations) == -1) oformations.push(play.breakdown.offense.formation);
						if ($.inArray(play.breakdown.defense.formation, dformations) == -1) dformations.push(play.breakdown.defense.formation);
						if ($.inArray(play.breakdown.offense.playname, oplayname) == -1 && play.breakdown.offense.playname != '') oplayname.push(play.breakdown.offense.playname);
						if ($.inArray(play.breakdown.defense.playname, dplayname) == -1 && play.breakdown.defense.playname != '') dplayname.push(play.breakdown.defense.playname);
						// rush plays
						if (play.breakdown.type == 'rush') {
							if (play.breakdown.offense.rush.direction != '' || play.breakdown.offense.rush.direction != 'undefined')
								if ($.inArray(play.breakdown.offense.rush.direction, rushdirection) == -1) rushdirection.push(play.breakdown.offense.rush.direction); // rush direction
						}
						// pass plays
						if (play.breakdown.type == 'pass') {
							if (play.breakdown.offense.pass.direction != 'none' && play.breakdown.offense.pass.direction != '' && play.breakdown.offense.pass.direction != undefined)
								if ($.inArray(play.breakdown.offense.pass.direction, passdirection) == -1) passdirection.push(play.breakdown.offense.pass.direction); // direction
							if (play.breakdown.offense.pass.result != 'none' && play.breakdown.offense.pass.result != '' && play.breakdown.offense.pass.result != undefined)
								if ($.inArray(play.breakdown.offense.pass.result, passresult) == -1) passresult.push(play.breakdown.offense.pass.result); // result
							if (play.breakdown.offense.pass.quality != 'none' && play.breakdown.offense.pass.quality != '' && play.breakdown.offense.pass.quality != undefined)
								if ($.inArray(play.breakdown.offense.pass.quality, passquality) == -1) passquality.push(play.breakdown.offense.pass.quality); // quality	
							if (play.breakdown.offense.pass.rush != 'none' && play.breakdown.offense.pass.rush != '' && play.breakdown.offense.pass.rush != undefined)
								if ($.inArray(play.breakdown.offense.pass.rush, passrush) == -1) passrush.push(play.breakdown.offense.pass.rush); // rush	
						}
					}
				});
			});
			box.append("<div id='gen_filters'></div>");
			$('#gen_filters').append(fn.build_teams());
			$('#gen_filters').append(fn.build_players());
			$('#gen_filters').append(fn.build_options(downs.sort(), 'multiple', 'downs', 'Down'));
			$('#gen_filters').append(fn.build_options(distances.sort(function(a,b) { return parseFloat(a) - parseFloat(b) }), 'multiple', 'distance', 'YTG'));
			$('#gen_filters').append(fn.build_options(markers.sort(function(a,b) { return parseFloat(a) - parseFloat(b) }), 'multiple', 'marker', 'Marker'));
			box.append("<div style='clear: both;' />");
			box.append("<div id='oplay_filters'></div>");
			$('#oplay_filters').append(fn.build_options(oformations, 'multiple', 'oformations', 'Off Formations'));
			$('#oplay_filters').append(fn.build_options(oplayname.sort(), 'multiple', 'oplayname', 'Offensive Plays'));
			box.append("<div id='dplay_filters'></div>");
			$('#dplay_filters').append(fn.build_options(dformations, 'multiple', 'dformations', 'Def Formations'));
			$('#dplay_filters').append(fn.build_options(dplayname.sort(), 'multiple', 'dplayname', 'Defensive Plays'));
			box.append("<div style='clear: both;' />");
			box.append(fn.build_options(playtype, '', 'playtype', 'Type'));
			box.append("<div id='run_filters'></div>");
			$('#run_filters').append(fn.build_options(rushdirection, 'multiple', 'rushdirection', 'Rush Dir'));
			box.append("<div id='pass_filters'></div>");
			$('#pass_filters').append(fn.build_options(passdirection, 'multiple', 'passdirection', 'Pass Dir'));
			$('#pass_filters').append(fn.build_options(passresult, 'multiple', 'passresult', 'Pass Result'));
			$('#pass_filters').append(fn.build_options(passquality, 'multiple', 'passquality', 'Pass Quality'));
			$('#pass_filters').append(fn.build_options(passrush, 'multiple', 'passrush', 'Pass Rush'));
			// extra dynamic filters that should display on same line as pass/rush
			box.append("<div style='float: left;'><span>Player Actions</span><br /><select style='display: none;' id='filter_actions' multiple size='7'></select>");
			box.append("<div style='clear: both;' />");
			$('#quarter_selectors').append(el.button_filter).append(el.button_clear);
			$('#btn_filter').click(fn.filter);
			$('#btn_clear').click(fn.clear);
			// events on select changes
			$('#filter_playtype').change(fn.filter_display);
			$('#filter_oformations').change(fn.filter_oplays);
			$('#filter_dformations').change(fn.filter_dplays);
			$('#filter_teams').change(fn.filter_dplays);
			$('#filter_teams').change(fn.filter_players);
			$('#filter_teams').change(fn.filter_oplays);
			fn.filter_display();
			$('#filter_players').change(fn.filter_player_actions);
		},
		build_teams: function() {
			var html = "<div style='float: left;'><span>Teams</span><br /><select id='filter_teams' multiple size='4'>";
			var teams = [];
			$.each(games, function(i, game) {
				$.each(game.teams, function(i, team) {
					if ($.inArray(team.id, teams) == -1) {
						teams.push(team.id);
						html += "<option value='" + team.id + "'>" + team.name + "</option>";
					}
				});
			});
			html += "</select><div>";
			return html;
		},
		build_players: function() {
			var html = "<div style='float: left;'><span>Players</span><br /><select id='filter_players' multiple size='10'>";
			$.each(games, function(i, game) {
				$.each(game.players, function(i, player) {
					html += "<option value='" + player.id + "'>" + player.position + " " + player.name + "</option>";
				});
			});
			html += "</select></div>";
			return html;
		},
		build_options: function(array, multi, id, title) {
			var html = "<div style='float: left;'><span>" + title + "</span><br /><select id='filter_" + id + "' " + multi + " size='7'>";
			$.each(array, function(i, obj) {
				html += "<option value='" + obj + "'>" + obj + "</option>";
			});
			html += "</select></div>";
			return html;
		},
		player_id_by_name: function(name, players) {
			var id;
			for (var p in players) {
				if (players[p].name == $.trim(name))
					id = players[p].id;
			}
			return id;
		},
		player_by_id: function(id, players) {
			var id;
			for (var p in players) {
				if (id == players[p].id)
					id = players[p];
			}
		},
		player_position: function(data, id) {
			var ballLoc = {};
			var posLoc = {};
			for (var i = 0; i < data[0].length; i++) {
				if (data[0][i].id == 'ball') {
					ballLoc.x = data[0][i].x;
					ballLoc.y = data[0][i].y;
				} 
				else if (data[0][i].id == id) {
					posLoc.x = data[0][i].x;
					posLoc.y = data[0][i].y;
				}
			}
			return {x: ballLoc.x-posLoc.x, y: ballLoc.y-posLoc.y};
		},
		parse_play: function(text) {
			var info = {
				type: '',
				yards: 0,
				offense: {
					team: '',
					score: '',
					formation: '',
					playname: '',
					pass: {
						result: '',
						direction: '',
						quality: '',
						rush: '',
						target: '',
						passer: ''
					},
					rush: {
						direction: '',
						result: '',
						rusher: ''
					},
				},
				defense: {
					team: '',
					score: '',
					formation: '',
					playname: '',
					deflection: '',
					interception: '',
					knockedloose: '',
					tackle: {
						made: {
							id: '',
							type: ''
						},
						missed: [
							// { type, id, cause }
						]
					}
				}
			};
			info.type = get.play_type(text);
			info.yards = get.yards(text);
			// passing data
			if (info.type == 'pass') {
				info.offense.pass.result = get.pass.result(text);
				info.offense.pass.direction = get.pass.direction(text);
				info.offense.pass.rush = get.pass.rush(text);
				info.offense.pass.quality = get.pass.quality(text);
			}
			// running data
			if (info.type == 'rush') {
				info.offense.rush.direction = get.rush.direction(text);
				info.offense.rush.result = get.rush.result(text);
			}
			// player data (in the outcome text)
			
			return info;
		},
		parse_data: function(data, current) {
			//var script = $('script:eq(0)', data).text();
			eval(data.slice(data.indexOf('var players'), data.indexOf('var score_update')));
			eval(data.slice(data.indexOf('var ptid'), data.indexOf('soundManager')));
			current.players = get.players(players, ptid, play_data);
			current.breakdown.offense.formation = get.oformation(play_data, current);
			current.breakdown.defense.formation = get.dformation(current);
			current.breakdown.offense.playname = $.trim($('#play_container', data).text().split(':')[1]);
			current.breakdown.defense.playname = $.trim($('#defense_play_container', data).text().split(':')[1]);
			current.breakdown.defense.tackle = get.defense.tackle(current);
			current.breakdown.offense.pass.target = get.pass.target(current);
			current.breakdown.offense.pass.passer = get.pass.passer(current);
			current.breakdown.offense.rush.rusher = get.rush.rusher(current);
			current.breakdown.defense.deflection = get.defense.deflection(current);
			current.breakdown.defense.interception = get.defense.interception(current);
			current.breakdown.defense.knockedloose = get.defense.knockedloose(current);
			current.breakdown.defense.sack = get.defense.sack(current);
			current.breakdown.defense.hurry = get.defense.hurry(current);
			current.breakdown.offense.team = get.off_team(current);
			current.breakdown.defense.team = get.def_team(current);
			current.breakdown.offense.score = $('#off_score', data).text();
			current.breakdown.defense.score = $('#def_score', data).text();
			game.teams.home.id = home;
			game.teams.home.name = $('.big_head a:eq(0)').text();
			game.teams.away.id = away;
			game.teams.away.name = $('.big_head a:eq(1)').text();
		},
		dedupe_players: function() {
			game.players = [];
			var all = [];
			$.each(game.plays, function(i,a) {
				if (a.breakdown.type == 'pass' || a.breakdown.type == 'rush') {
					$.each(a.players, function(i, player) {
						var fix = player.name + "|" + player.position + "|" + player.id + "|" + player.team;
						if ($.inArray(fix, all) == -1)
							all.push(fix);
					});
				}
			});
			
			$.each(all, function(i, a) {
				var player = { team: "", id: "", name: "", position: "" };
				player.name = a.split('|')[0];
				player.position = a.split('|')[1];
				player.team = a.split('|')[3];
				player.id = a.split('|')[2];
				game.players.push(player);
			});
			var rank = {
				'QB': 0,'HB': 1, 'FB': 2, 'TE': 3, 'WR1': 4, 'WR2': 5, 'WR3': 6, 'WR4': 7, 'WR5': 8, 'LOT': 9,'ROT': 10, 'RG': 11, 'LG': 12, 'C': 13, 
				'RDE': 14,'LDE': 15, 'DT': 16, 'NT': 17, 'MLB': 18, 'ROLB': 19, 'LOLB': 20, 'RILB': 21, 'LILB': 22, 'CB1': 23, 'CB2': 24, 'CB3': 25, 'CB4': 26, 'CB5': 27, 'SS': 28, 'FS': 29,
				'K': 30, 'P': 31
			};
			game.players.sort(function(a, b) {
				return rank[a.position] - rank[b.position];
			});
		},
		wrapup: function() {
			fn.dedupe_players();
			GM_setValue(game.id, JSON.stringify(game));
			games.push(game);
			fn.prepfilters();
			return;
		},
		scout: function() {
			var gm = GM_getValue($('#tab_summary a').attr('href').split('=')[1]);
			if (gm) {
				game = JSON.parse(gm);
				games.push(game);
				fn.prepfilters();
				return this;
			}
			var table = $('#play_by_play_table');
			// game id
			game.id = $('#tab_summary a').attr('href').split('=')[1];
			
			// loop over all plays and parse the data
			$('.alternating_color1,.alternating_color2', table).each(function() {
				game.plays.push(new play($(this)));
			});
			
			// loop over all plays and get data from replay through ajax
			fn.loop(0);
			return this;
		},
		loop: function() {
			var i = arguments[0]; current = game.plays[i];
			if (i >= game.plays.length) {
				fn.wrapup();
				return;
			}

			$.ajax({
				url: current.link,
				dataType: 'text',
				success: function(data) {
					if (data.indexOf('var players') == -1) {
						if (i == 0) {
							alert('You probably have flash replay turned on.');
							i = game.plays.length;
						}
						return;
					}
					fn.parse_data(data, current);
				},
				complete: function() {
					$('#status').text(" - Processing: " + i + " of " + (game.plays.length - 1));
					i = i + 1;
					fn.loop(i);
				},
				error: function(x) {
					alert('Error getting replay page.  ' + x);
				}
			});
		},
		length: function() {
			var count = 0; game = arguments.length == 0 ? game.plays : arguments[0];
			for (var i in game) { count++; }
			return count;
		}
	};
	
	fn.init();
});