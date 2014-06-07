// ==UserScript==
// @name           Rockitsauce's All Time Team Leaders - pabst fix
// @namespace      rockitsauce
// @description    List out your team's all time record holders in Goalline Blitz
// @include        http://glb.warriorgeneral.com/game/team.pl?season=*&team_id=*
// @include        http://glb.warriorgeneral.com/game/team.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @version	   14.02.27-pabst
// ==/UserScript==


$(document).ready( function() {
	Object.prototype.clone = function() {
		var newObj = (this instanceof Array) ? [] : {};
		for (i in this) {
			if (i == 'clone') continue;
			if (this[i] && typeof this[i] == "object") {
				newObj[i] = this[i].clone();
			} 
			else newObj[i] = this[i]
		} 
		return newObj;
	};

	//var c = unsafeWindow.console;
	var el = {
		link_stats: ' <a id="alltime" href="#">View All Time Team Leaders</a>',
		display: '<div id="settings"></div><div id="print"></div>',
		settings_form: '',
		input_form: '<div style="clear: all" />Seasons: <select style="font-size: 9px;" id="range_from" /> to <select style="font-size: 9px;" id="range_to" /><br />Blowout: <input type="text" id="txb_blow" size="5" />&nbsp;Adjust %: <input type="text" id="txb_adjust" size="5" /><br /><input type="button" id="btn_go" value="Gather Stats" />&nbsp;<input type="button" id="btn_del" value="Delete Saved Data" /><br /><input type="button" id="btn_career" value="Print Career" />&nbsp;<input type="button" id="btn_season" value="Print Season" />&nbsp;<input type="button" id="btn_game" value="Print Game" /><br /><span id="status" /><div style="clear: all;" /><div id="stat_container" style="height: 800px; color: black; font-weight: normal; font-size: 9px; overflow: auto;" />'
	};
	
	var stats = function() {
		this.passing = { plays: 0, comp: 0, att: 0, yds: 0, pct: 0, ya: 0, hurry: 0, sack: 0, sackyd: 0, badth: 0, drop: 0, 'int': 0, td: 0},
		this.rushing = { plays: 0, rush: 0, yds: 0, avg: 0, td: 0, rushrz: 0, brtk: 0, tfl: 0, fum: 0, fuml: 0 },
		this.receiving = { plays: 0, targ: 0, rec: 0, yds: 0, avg: 0, yac: 0, td: 0, drop: 0, targrz: 0, targ3d: 0, fum: 0, fuml: 0 },
		this.kicking = { fgm: 0, fga: 0, '0-19': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50+': 0, xpm: 0, xpa: 0, ko: 0, tb: 0, yds: 0, avg: 0},
		this.punting = { punts: 0, yds: 0, avg: 0, tb: 0, cofcrn: 0, 'inside5': 0, 'inside10': 0, 'inside20': 0 },
		this.kickpuntreturn = { kr: 0, kyds: 0, kavg: 0, td: 0, pr: 0, pyds: 0, pavg: 0, td: 0 },
		this.offensiveline = { plays: 0, pancakes: 0, revpnkd: 0, hryalw: 0, sackalw: 0 },
		this.defense = { ply: 0, plays: 0, tk: 0, mstk: 0, sack: 0, yds: 0, hry: 0, tfl: 0, ffum: 0, fumr: 0, targ: 0, recalw: 0, kl: 0, pd: 0, 'int': 0, yds: 0, deftd: 0, pnkd: 0, revpnk: 0 },
		this.specialteams = { plays: 0, tk: 0, mstk: 0, ffum: 0, frec: 0, fumrtd: 0, pnkd: 0, brtk: 0, fum: 0, fuml: 0 }
	};

	var data = {
		team: { id: 0, name: '' },
		history: { seasons: [] }
	};
	
	// setup: stat: the stat, text: to display. if null won't print.
	// key note: some stats are not records to print, but holders for data to calculate (pct, avg, etc.)
	var records = [ 
		{ name: 'Passing', 
			stats: [
				{ stat: 'passing.comp', text: 'Comp' },
				{ stat: 'passing.att', text: null},
				{ stat: 'passing.yds', text: 'Yds'},
				{ stat: 'passing.pct', text: 'Pct' },
				{ stat: 'passing.ya', text: 'Y/A' },
				{ stat: 'passing.sack', text: 'Sck' },
				{ stat: 'passing.int', text: 'Int' },
				{ stat: 'passing.td', text: 'TD' }
			]
		},
		{ name: 'Rushing',
			stats: [
				{ stat: 'rushing.rush', text: null },
				{ stat: 'rushing.yds', text: 'Yds' },
				{ stat: 'rushing.avg', text: 'Avg' },
				{ stat: 'rushing.td', text: 'TD' },
				{ stat: 'rushing.brtk', text: 'BrTk' },
				{ stat: 'rushing.tfl', text: 'TFL' },
				{ stat: 'rushing.fum', text: 'Fum' }
			]
		},
		{ name: 'Receiving',
			stats: [
				{ stat: 'receiving.rec', text: 'Rec' },
				{ stat: 'receiving.yds', text: 'Yds' },
				{ stat: 'receiving.avg', text: 'Avg' },
				{ stat: 'receiving.yac', text: 'YAC' },
				{ stat: 'receiving.td', text: 'TD' },
				{ stat: 'receiving.drop', text: 'Drop' },
				{ stat: 'receiving.fum', text: 'Fum' }
			]
		},
		{ name: 'Kicking Records', 
			stats: [
				{ stat: 'kicking.fgm', text: 'FGM' },
				{ stat: 'kicking.40-49', text: '40-49' },
				{ stat: 'kicking.50+', text: '50+' },
				{ stat: 'kicking.xpm', text: 'XPM' }
			]
		},
		{ name: 'Punting Records',
			stats: [
				{ stat: 'punting.punts', 'text': null },
				{ stat: 'punting.yds', text: 'Yds' },
				{ stat: 'punting.avg', text: 'Avg' }
			]
		},
		{ name: 'Return Records',
			stats: [
				{ stat: 'kickpuntreturn.kr', text: null },
				{ stat: 'kickpuntreturn.kyds', text: 'KR Yds' },
				{ stat: 'kickpuntreturn.kavg', text: 'KR Avg' },
				{ stat: 'kickpuntreturn.ktd', text: 'KR TD' },
				{ stat: 'kickpuntreturn.pr', text: null },
				{ stat: 'kickpuntreturn.pyds', text: 'PR Yds' },
				{ stat: 'kickpuntreturn.pavg', text: 'PR Avg' },
				{ stat: 'kickpuntreturn.ptd', text: 'PR TD' }
			]
		},
		{ name: 'Special Teams Records',
			stats: [
				{ stat: 'specialteams.tk', text: 'Tk' },
				{ stat: 'specialteams.mstk', text: 'MsTk' },
				{ stat: 'specialteams.ffum', text: 'FFum' }
			]
		},
		{ name: 'Blocking Records',
			stats: [
				{ stat: 'offensiveline.pancakes', text: 'Pnk' }
			]
		},
		{ name: 'Defensive Records', 
			stats: [
				{ stat: 'defense.tk', text: 'Tk' },
				{ stat: 'defense.mstk', text: 'MsTk' },
				{ stat: 'defense.sack', text: 'Sack' },
				{ stat: 'defense.hry', text: 'Hry' },
				{ stat: 'defense.tfl', text: 'TFL' },
				{ stat: 'defense.ffum', text: 'FFum' },
				{ stat: 'defense.pd', text: 'PD' },
				{ stat: 'defense.int', text: 'Int' },
				{ stat: 'defense.deftd', text: 'TD' }
			]
		}
	];
		
	var fn = {
		init: function() {
			$('#top_threats_head span').append(el.link_stats);
			$('#alltime').click(fn.load);
			fn.onload();
		},
		onload: function() {
			data.team = { 
				id: $('#tab_profile a').attr('href').split('team_id=')[1], 
				name: $('#team_name').text().split(' (')[0]
			};
		},
		load: function() {
			if (fn.get() == false) {
				$('#schedule_box select option').each(function() { 
					data.history.seasons.push({ season: $(this).val(), games: [] });
				});
				data.history.seasons.reverse(function(a, b) {
					return b.season - a.season;
				});
			}
			
			$('.top_player_container').hide();
			$('#starters').hide();
			
			$('#top_threats_head').append(el.input_form);
			$('#btn_go').click(fn.start_gamelist);
			$('#btn_career').click(fn.print);
			$('#btn_game').click(fn.print);
			$('#btn_del').click(fn.del);
			$('#btn_season').click(fn.print);
			$.each(data.history.seasons, function(i, v) {
				$('#range_from, #range_to').append('<option value=' + v.season + '>' + v.season + '</option>');
			});
		},
		print: function() {
			var type = $(this).val().replace('Print ', '');
			var div = $('#stat_container');
			div.html('');
			$.each(records, function(i, category) {
				div.append('<div>[b]'+ type + ' ~ ' + category.name + '[/b]</div>');
				$.each(category.stats, function(i, stat) {
					if (stat.text != null) {
						div.append('<div>[u]' + stat.text + '[/u]</div>');
						div.append(fn[type.toLowerCase()](stat) + "</br>");
					}
					else
						fn[type.toLowerCase()](stat);
					stat.holders = [];
				});
			});
		},
		game: function(stat) {
			var left = stat.stat.split('.')[0];
			var right = stat.stat.split('.')[1];
			var holders = new Array();
			var text = '<div>';
			
			for (s = 0; s <= data.history.seasons.length -1; s++) {
				var season = data.history.seasons[s];
				if (season.games.length == 0) continue;
				for (g = 0; g <= season.games.length - 1; g++) {
					var game = season.games[g];
					for (p = 0; p <= game.players.length - 1; p++) {
						if (game.players[p].stats[left][right] == undefined || game.players[p].stats[left][right] == '0' || isNaN(parseInt(game.players[p].stats[left][right]))) continue;
						holders.push(game.players[p].clone());
					}
				}
			}
			
			if (holders.length < 0) return;
			holders.sort(function(a, b) {
				return b.stats[left][right] - a.stats[left][right];
			});

			for (i = 0; i <=9; i++) {
				if (holders[i] == undefined) break;
				text += '(' + (i + 1) + ')...' + holders[i].stats[left][right].toFixed(2).replace('.00', '') + '...(' + holders[i].pos.trim() + ') [b]' + holders[i].name + '[/b] - http://glb.warriorgeneral.com/game/player.pl?player_id=' + holders[i].id + '<br />';
			} 

			return text += "</div>";
		},
		season: function(stat) {
			var left = stat.stat.split('.')[0];
			var right = stat.stat.split('.')[1];
			var holders = new Array();
			var text = '<div>';
			var temp = [];
			
			for (s = 0; s <= data.history.seasons.length -1; s++) {
				var season = data.history.seasons[s];
				if (season.games.length == 0) continue;
				else {
					for (var t in temp) {
						if (temp[t].id != undefined)
							holders.push(temp[t]);
					}
					temp = [];
				}
				for (g = 0; g <= season.games.length - 1; g++) {
					var game = season.games[g];
					for (p = 0; p <= game.players.length - 1; p++) {
						if (game.players[p].stats[left][right] == undefined || game.players[p].stats[left][right] == '0' || isNaN(parseInt(game.players[p].stats[left][right]))) continue;
						var existing = fn.index(temp, game.players[p].id);
						if (existing > -1) {
							temp[existing].name = game.players[p].name;
							fn.calculate(temp[existing], game.players[p], left, right);
						}
						
						else
							temp.push(game.players[p].clone());
					}
				}
			}
			if (holders.length < 0) return;
			holders.sort(function(a, b) {
				return b.stats[left][right] - a.stats[left][right];
			});

			for (i = 0; i <=9; i++) {
				if (holders[i] == undefined) break;
				text += '(' + (i + 1) + ')...' + holders[i].stats[left][right].toFixed(2).replace('.00', '') + '...(' + holders[i].pos.trim() + ') [b]' + holders[i].name + '[/b] - http://glb.warriorgeneral.com/game/player.pl?player_id=' + holders[i].id + '<br />';
			}

			return text += "</div>";
		},
		career: function(stat) {
			var left = stat.stat.split('.')[0];
			var right = stat.stat.split('.')[1];
			var holders = new Array();
			var text = '<div>';
			
			for (s = 0; s <= data.history.seasons.length -1; s++) {
				var season = data.history.seasons[s];
				for (g = 0; g <= season.games.length - 1; g++) {
					var game = season.games[g];
					for (p = 0; p <= game.players.length - 1; p++) {
						if (game.players[p].stats[left][right] == undefined || game.players[p].stats[left][right] == '0' || isNaN(parseInt(game.players[p].stats[left][right]))) continue;
						var existing = fn.index(holders, game.players[p].id);
						if (existing > -1) {
							holders[existing].name = game.players[p].name;
							fn.calculate(holders[existing], game.players[p], left, right);
						}
						else
							holders.push(game.players[p].clone());
					}
				}
			}
			if (holders.length < 0) return;
			holders.sort(function(a, b) {
				return b.stats[left][right] - a.stats[left][right];
			});

			for (i = 0; i <=9; i++) {
				if (holders[i] == undefined) break;
				text += '(' + (i + 1) + ')...' + holders[i].stats[left][right].toFixed(2).replace('.00', '') + '...(' + holders[i].pos.trim() + ') [b]' + holders[i].name + '[/b] - http://glb.warriorgeneral.com/game/player.pl?player_id=' + holders[i].id + '<br />';
			}

			return text += "</div>";
		},
		index: function(array, id) {
			for (var p in array) {
				if (array[p].id == id)
					return p;
			}
			return -1;
		},
		calculate: function(p, player, section, stat) {
			// passing: pct, ya; rushing: avg; receiving: avg; punting: avg; 
			// kickpuntreturn: kravg, pravg
			if (stat == 'pct' || stat.indexOf('avg') > -1 || stat == 'ya') {
				switch (section) {
					case 'passing': 
						if (stat == 'pct') {
							p.stats[section][stat] = (((parseInt(p.stats.passing.comp) / parseInt(p.stats.passing.att)) * 100)); 
						}
						if (stat == 'ya') {
							p.stats[section][stat] = (((parseInt(p.stats.passing.yds) / parseInt(p.stats.passing.att)) * 100) / 100);
						}
						break;
					case 'rushing': 
						if (stat == 'avg') {
							p.stats[section][stat] = (((parseInt(p.stats.rushing.yds) / parseInt(p.stats.rushing.rush)) * 100) / 100);
						}
						break;
					case 'receiving': 
						if (stat == 'avg') {
							p.stats[section][stat] = (((parseInt(p.stats.receiving.yds) / parseInt(p.stats.receiving.rec)) * 100) / 100);
						}
						break; 
					case 'punting': 
						if (stat == 'avg') {
							p.stats[section][stat] = (((parseInt(p.stats.punting.yds) / parseInt(p.stats.punting.punts)) * 100) / 100);
						}
						break;
					case 'kickpuntreturn': 
						if (stat == 'kavg') {
							p.stats[section][stat] = (((parseInt(p.stats.kickpuntreturn.kyds) / parseInt(p.stats.kickpuntreturn.kkr)) * 100) / 100);
						}
						if (stat == 'pavg') {
							p.stats[section][stat] = (((parseInt(p.stats.kickpuntreturn.pyds) / parseInt(p.stats.kickpuntreturn.ppr)) * 100) / 100);
						}
						break;
					//default:
					//	return p.stats[section][stat] += p.stats[section][stat];
				}
			}
			else {
				p.stats[section][stat] += parseInt(player.stats[section][stat]);
				return;
			}
		},
		start_gamelist: function() {
			$('#status').text(" - Getting games");
			fn.loop_gamelist(
				parseInt($('#range_from option:selected').val()),
				parseInt($('#range_to option:selected').val())
			);
		},
		build_mask: function(tr, section) {
			var mask = [];
			$('.box_score_player_stat', tr).each(function(i, td) {
				var t = $(td).text().replace('/', '').toLowerCase();
				if (section == 'kickpuntreturn') {
					mask.push(mask.length < 3 ? 'k' + t : 'p' + t);
				}
				else
					mask.push(t);
			});
			return mask;
		},
		player_stats: function(season, game, tr, section, mask, blowout) {
			var id = $('.box_score_player_stat_name a:eq(0)', tr).attr('href').split('player_id=')[1];
			var name = $('.box_score_player_stat_name a:eq(0)', tr).text();
			var pos = $('.position', tr).text().trim();
			var player = { "id": id, "name": name, "pos": pos, "stats": new stats() };
			var ratio = $('#txb_adjust').val();
			var blowout = $('#txb_blow').val();
			var exists = false;

			$.each(data.history.seasons[season].games[game].players, function(i, p) { 
				if (p.id == player.id) {
					player = p; exists = true;
					return;
				}
			});
			
			if (!exists) data.history.seasons[season].games[game].players.push(player);
			
			$('.box_score_player_stat', tr).each(function(i, s) {
				var value = (parseFloat($(this).text().trim())* (blowout ? (ratio * .01) : 1)); //fn.calculate(player, section, parseFloat($(this).text().trim()), mask[i]) * (blowout ? (ratio * .01) : 1);// 
				player.stats[section][fn.mask_fix(section, mask[i], i)] = value;
			});
		},
		mask_fix: function(section, mask, i) {
			if (section != 'kickpuntreturn') return mask;
			return i < 3 ? 'k' + mask : 'p' + mask;
		},
		parse_nonsort: function(season, game, context, us, them, blowout, ratio) {
			var mask = [];
			var active = false;
			var section = '';
			
			$('table', context).each(function(i, table) { // main container
				section = $('.nonalternating_color > td', table).text().replace(' ', '').replace('/', '').toLowerCase();
				if (section == 'teamstats' || section == 'scoringsummary' || section == '') return;
				
				$('tr', table).each(function(i, tr) {
					if ($(tr).is('.nonalternating_color2')) {
						active = us.indexOf($('.box_score_player_stat_name', tr).text()) > -1;
						mask = fn.build_mask(tr, section);
					}
					else if ($(tr).is('.alternating_color1, .alternating_color2') && active) {
						fn.player_stats(season, game, tr, section, mask, blowout);
					}
				});
			});
		},
		parse_sortable: function(season, game, context, us, them, blowout, ratio) {
			var section = '';
			var mask = [];
			var active = false;
			
			$('table', context).each(function(i, table) {
				if ($('.nonalternating_color', table).length > 0) { // section header
					section = $('.nonalternating_color > td', table).text().replace(' ', '').replace('/', '').toLowerCase();
					if (section == 'teamstats' || section == 'scoringsummary' || section == '') return;
				}
				else {
					var mask = [];
					var active = false;
					$('tr, th', table).each(function(i, tr) {
						if ($(tr).is('.nonalternating_color2')) {
							active = us.indexOf($('.box_score_player_stat_name', tr).text()) > -1;
							mask = fn.build_mask(tr);
						}
						else if ($(tr).is('.alternating_color1, .alternating_color2') && active) {
							fn.player_stats(season, game, tr, section, mask, blowout);
						}
					});
				}
			});
		},
		loop_games: function(season, to, game) {
			if (season == to && game == data.history.seasons[season].games.length - 1) {
				$('#status').text(' - Finished. Click Print to display');
				fn.save();
				return;
			}
			$('#status').text(' - Gathering stats: Season: [s] - Game [g]'.replace('[s]', season + 1).replace('[g]', game + 1));
			
			var next = function() {
				if (data.history.seasons[season].games[game+1] != undefined)
					game = game + 1;
				else {
					season = season + 1; 
					game = 0;
				}
				fn.loop_games(season, to, game);
			};
			if (data.history.seasons[season].games[game].players.length < 1) {
				$.ajax({
					url: '/game/game.pl?game_id=[g]'.replace('[g]', data.history.seasons[season].games[game].id),
					dataType: 'html',
					success: function(response) {
						var context = $('#scoreboard', response);
						var boxscore = $('#box_score', response);
						var offset = $('.team_logo:first img', context).attr('src').split('team_id=')[1] == data.team.id;
						var us = $('.team_name:eq' + (offset ? '(1)' : '(2)') + ' a', context).text();
						var them = $('.team_name:eq' + (offset ? '(2)' : '(1)') + ' a', context).text(); 
						var us_score = parseInt($('.total:eq' + (offset ? '(1)' : '(2)'), context).text());
						var them_score = parseInt($('.total:eq' + (offset ? '(2)' : '(1)'), context).text());
						fn[$('.sortable-text', response).length == 0 ? 'parse_nonsort' : 'parse_sortable'](season, game, boxscore,us,them, (us_score - them_score) > parseInt($('#txb_blow').val()), parseInt($('#txb_adjust').val()));
					},
					complete: function() {
						next();
					},
					error: function(x) {
						//alert('Error getting game data page. ' + x);
					}
				});
			}
			else {
				next();
			}
			
			return;
		},
		loop_gamelist: function(i, f) {
			if (i > f) {
				fn.loop_games(parseInt($('#range_from option:selected').val() - 1),	parseInt($('#range_to option:selected').val() - 1), 0);
				return;
			}
			$.ajax({
				url: '/game/team.pl?season=[s]&team_id=[t]#'.replace('[s]', i).replace('[t]', data.team.id),
				dataType: 'html',
				success: function(response) {
					var context = $('.schedule_content:eq(0)', response);
					$('.alternating_color1, .alternating_color2', context).each(function(x, tr) {
						if ($('td:last a', tr).text() == 'Matchup') return;
						var g = { id: $('td:last a', tr).attr('href').split('game_id=')[1], players: [] };
						var push = true;
						$.each(data.history.seasons[i-1].games, function(i, game) {
							if (game.id == g.id) {
								push = false;
								return;
							}
						});
						if (push) data.history.seasons[i-1].games.push(g);
					});
				},
				complete: function() {
					i = i + 1;
					fn.loop_gamelist(i, f);
				},
				error: function(x) {
					//alert('Error getting season page.  ' + x);
				}
			});
		},
		get: function() {
			var stored = GM_getValue(data.team.id);
			if (stored) {
				data = JSON.parse(stored);
				return true;
			}
			return false;
		},
		del: function() {
			GM_deleteValue(data.team.id);
			fn.onload();
		},
		save: function() {
			GM_setValue(data.team.id, JSON.stringify(data));
		}
	};
	
	fn.init();
});
