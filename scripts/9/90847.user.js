// ==UserScript==
// @name           HoN - Heroes Played Stats, Performance, Top, Sortable
// @namespace      http://www.heroesofnewerth.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.heroesofnewerth.com/player_stats.php?aid=*
// ==/UserScript==

$(document).ready(function() {

		// global
		var GM_heroes = [];

		// GM_getPerformanceStats
		var GM_getPerformanceStats = function () {
			// console.log('a', arguments);
			var _loadingTxt = 'Loading... ',
					_tpl = [
						'<div id="GM_getPerformanceStats_status" style="margin-top: 10px; margin-bottom: 10px;">' + _loadingTxt +'</div>',
						'<table id="GM_getPerformanceStats_data" width="100%" cellpadding="10" cellspacing="1" style="background-color: #666666;">',
							'<thead style="background-color: #000000;">',
								'<tr style="background-color: #000000;">',
									'<th style="padding: 10px;">Hero</th>',
									'<th style="padding: 10px;" title="Wins"><a href="javascript:GM_sortTable(\'wins\');">#W</a></th>',
									'<th style="padding: 10px;" title="Losses"><a href="javascript:GM_sortTable(\'losses\');">#L</a></th>',
									'<th style="padding: 10px;" title="Matches"><a href="javascript:GM_sortTable(\'matches\');">#M</a></th>',
									'<th style="padding: 10px;" title="Win %"><a href="javascript:GM_sortTable(\'winPercent\');">W%</a></th>',
									'<th style="padding: 10px;" title="Kills"><a href="javascript:GM_sortTable(\'kills\');">#K</a></th>',
									'<th style="padding: 10px;" title="Deaths"><a href="javascript:GM_sortTable(\'deaths\');">#D</a></th>',
									'<th style="padding: 10px;" title="Kills / Deaths"><a href="javascript:GM_sortTable(\'kdPercent\');">K/D</a></th>',
								'</tr>',
							'</thead>',
							'<tbody style="background-color: #000000;">'
					],
					heroesLoaded = GM_heroes.length;

			// console.log(1, GM_heroes.length);

			// get heroes from fake select (dropdown)
			if (GM_heroes.length == 0) {
				if (false) { // typeof localStorage != 'undefined' && localStorage.GM_heroes
					// GM_heroes = localStorage.GM_heroes;
				}
				else {
					$('#hero_drop div.jhs_option').each(function(key, item) {
						// if (key < 2)
							// return;

						var hid = '', 
								_onclick = item.getAttribute('onclick');
						_onclick = _onclick.substring(_onclick.indexOf('getPlayerStats('));
						hid = _onclick.substring(new String('getPlayerStats(').length, _onclick.indexOf(', '));

						var hero = {
							'name'	: item.firstChild.innerHTML,
							'id'		: hid,
							'index'	: (key - 2),
							'stats'	: { wins: '.', losses: '.', matches: '.', winPercent: '.', kills: '.', deaths: '.', kdPercent: '.' }
						};
						
						_tpl.push([
							'<tr data-index="' + hero.index + '" style="background-color: #000000;">',
								'<td style="padding: 5px;">' + hero.name + '</td>',
								'<td></td>',
								'<td></td>',
								'<td></td>',
								'<td></td>',
								'<td></td>',
								'<td></td>',
								'<td></td>',
							'</tr>'
						].join(''));
						
						GM_heroes.push(hero);
						
					});
				}
			}
			else {
				$(GM_heroes).each(function (key, hero) {
					_tpl.push([
						'<tr data-index="' + hero.index + '" style="background-color: #000000;">',
							'<td style="padding: 5px;">' + hero.name + '</td>',
							'<td></td>',
							'<td></td>',
							'<td></td>',
							'<td></td>',
							'<td></td>',
							'<td></td>',
							'<td></td>',
						'</tr>'
					].join(''));
				});
			}

			_tpl.push('</tbody>');
			_tpl.push('</table>');

			// console.log(2, _tpl);
			$('#player-statsinfo').html(_tpl.join("\n"));


			if (!(GM_heroes.length == heroesLoaded && heroesLoaded > 0))
				$(GM_heroes).each(function (key, hero) {
					if (true) { // key < 2
					jQuery.post(
						'http://' + window.location.hostname + '/getPlayerStats.php', 
						{ 
							'aid':  aid,
							'hid':  hero.id
						},
						function(data, status) {

							hero.icon = $('div img', $(data))[0].getAttribute('src');
							
							var _basicStats = $('div span.o12', $(data));
							hero.stats.wins = parseInt($.trim($(_basicStats[0]).parent().html().split('<br>')[1]));
							hero.stats.losses = parseInt($.trim($(_basicStats[1]).parent().html().split('<br>')[1]));
							hero.stats.matches = hero.stats.wins * 1 + hero.stats.losses * 1;
							hero.stats.winPercent = parseInt($.trim($(_basicStats[3]).parent().html().split('<br>')[1]));

							hero.stats.kills = parseInt($.trim($($('div a.r12[title="Hero Kills"]', $(data))[0]).text()));
							hero.stats.deaths = parseInt($.trim($($('div a.r12[title="Hero Kills"]', $(data))[0]).text()));
							hero.stats.kdPercent = parseFloat(parseFloat(hero.stats.kills / hero.stats.losses).toFixed(2));

							// console.log('getPlayerStats: ', hero.stats);
							GM_heroes[key] = hero;
							if (typeof localStorage != 'undefined') {
								// console.log('a', localStorage);
								// localStorage.GM_heroes = GM_heroes;
								// console.log('b', localStorage);
							}

							// add hero icon to table (first cell)
							var _html = '<img src="' + hero.icon + '" width="25" style="border: 1px solid #393939; margin: 2px;" /><br />' + hero.name;
							var _row = $('#GM_getPerformanceStats_data tr[data-index="' + hero.index + '"] td');
							var _cell = 0;
							$(_row[_cell++]).html(_html); 
							
							$(_row[_cell++]).html(hero.stats.wins);
							$(_row[_cell++]).html(hero.stats.losses);
							$(_row[_cell++]).html(hero.stats.matches);
							$(_row[_cell++]).html(hero.stats.winPercent);
							$(_row[_cell++]).html(hero.stats.kills);
							$(_row[_cell++]).html(hero.stats.deaths);
							$(_row[_cell++]).html(hero.stats.kdPercent);

							// update load status
							heroesLoaded = heroesLoaded + 1;
							$('#GM_getPerformanceStats_status').html(_loadingTxt + heroesLoaded + ' / ' + GM_heroes.length);
							// $('#player-statsinfo').html(data);
						}
					);
					console.info(hero.name, aid, hero.id);
					}
				// $('#_loadingTxt')
			});
			else {
				$(GM_heroes).each(function (key, hero) {
					var _html = (hero.icon && hero.icon.length) ? ('<img src="' + hero.icon + '" width="25" style="border: 1px solid #393939; margin: 2px;" /><br />' + hero.name) : hero.name;
					var _row = $('#GM_getPerformanceStats_data tr[data-index="' + key + '"] td');
					var _cell = 0;
					$(_row[_cell++]).html(_html); 
					
					$(_row[_cell++]).html(hero.stats.wins);
					$(_row[_cell++]).html(hero.stats.losses);
					$(_row[_cell++]).html(hero.stats.matches);
					$(_row[_cell++]).html(hero.stats.winPercent);
					$(_row[_cell++]).html(hero.stats.kills);
					$(_row[_cell++]).html(hero.stats.deaths);
					$(_row[_cell++]).html(hero.stats.kdPercent);
				});
			}

		}
		unsafeWindow.GM_getPerformanceStats = GM_getPerformanceStats;
		

		// GM_sortTable
		var GM_sortDirection = -1;
		var GM_sortTable = function (statsKey) {
			GM_sortDirection = GM_sortDirection * -1;
			GM_heroes.sort(function(a, b) {
				if (typeof a.stats != 'undefined' && typeof a.stats[statsKey] != 'undefined' && typeof b.stats != 'undefined' && typeof b.stats[statsKey] != 'undefined') {
					// console.log('sorting', a.stats[statsKey], b.stats[statsKey], GM_sortDirection);
					return (a.stats[statsKey] < b.stats[statsKey]) ? -1 * GM_sortDirection : (a.stats[statsKey] > b.stats[statsKey]) ? GM_sortDirection : 0;
				}
				else
					return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
			});
			
			$(GM_heroes).each(function (key, hero) {
				var _html = (hero.icon && hero.icon.length) ? ('<img src="' + hero.icon + '" width="25" style="border: 1px solid #393939; margin: 2px;" /><br />' + hero.name) : hero.name;
				var _row = $('#GM_getPerformanceStats_data tr[data-index="' + key + '"] td');
				var _cell = 0;
				$(_row[_cell++]).html(_html); 
				
				$(_row[_cell++]).html(hero.stats.wins);
				$(_row[_cell++]).html(hero.stats.losses);
				$(_row[_cell++]).html(hero.stats.matches);
				$(_row[_cell++]).html(hero.stats.winPercent);
				$(_row[_cell++]).html(hero.stats.kills);
				$(_row[_cell++]).html(hero.stats.deaths);
				$(_row[_cell++]).html(hero.stats.kdPercent);
			});
		}
		unsafeWindow.GM_sortTable = GM_sortTable;


		// main
		if (!window.console) {
			var _console = { };
			_console.log = _console.info = function() { }; 
			window.console = _console;
		}

		console.info('HoN - Heroes Played Stats, Performance, Top, Sortable');
		
		var aid = window.location.href.split('?aid=');
		if (aid.length > 1 && aid[1].length > 0) {
			aid = aid[1];

			$("<div onclick=\"hideIt('jhs_heroname'); GM_getPerformanceStats(); document.getElementById('stats_sel').innerHTML='= Compared Stats ='\" class=\"jhs_option\"><div style=\"padding: 4px 0pt 0pt 10px;\">= Compared Stats =</div></div>").insertAfter($('#hero_drop').children()[0]);
		}

	});
