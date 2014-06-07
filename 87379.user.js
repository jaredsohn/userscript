// ==UserScript==
// @name           TeamZoneSports++
// @namespace      holyschmidt
// @author         holyschmidt (http://userscripts.org/users/50784)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/87379
// @description    Adds to additional features to a TeamZoneSports team page.
// @include        http://app.teamzonesports.com/team/teamzone/standings.aspx?teamid=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://www.betawarriors.com/bin/gm/62718user.js 
// @version        0.06
//
// @history        0.05 Bug: Error in sorting number ('#') column.
// @history        0.05 Bug: Duplicate 'live' events getting registered, causing performance issues.
// @history        0.04 Added stat table sorting, available in any statistic column.
// @history        0.03 Completed basic "Game Logs" tab implementation.
// 
// ==/UserScript==

ScriptUpdater.check(87379, "0.06");
Config.footerHtml = '<p><i>If you are financially able, please <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=B8E3NFWUXUH4W&lc=US&item_name=holyschmidt%20scripting%20services&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted">donate</a> a small gift to further development of this and future projects!</i></p>';
Config.prefix = 'TZS_Team' + $('#TeamId').attr('value');
Config.reloadOnSave = true;
Config.scriptName = "TeamZoneSports++";
Config.tabs = {
	"Game Logs":{
		html:'<p>No user selected!</p>',
	},
	"Settings":{
		html:'<p>Customizable settings for TeamZoneSports++.</p>',
		fields:{
			hideOverallRemove:{
				type:"checkbox",
				label:"Hide Remove Button",
				text:"This hides the 'remove' button, found on the overall team stat page.",
				value:true,
			},
			playerGameLogs:{
				type:"checkbox",
				label:"Game Log",
				text:"Enables player game logs, showing game-by-game stats/averages.",
				value:true,
			},
			tableSorting:{
				type:"checkbox",
				label:"Table Rorting",
				text:"Enables sorting stat tables by any column (Hits, RBIs, etc).",
				value:true,
			},
		}
	},
	"About":{
		html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">' +
				Config.scriptName + ' v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/holyschmidt" target="_blank">holyschmidt</a>\
				<p>This script packages up additional features not implemented by TeamZoneSports.com</p>',
	}
};

UserData = {
	get:function(key) {
		return eval(GM_getValue(Config.prefix + key, ('({})')));
	},
	set:function(key, value) {
		GM_setValue(Config.prefix + key, '(' + JSON.stringify(value) + ')');
	},
};

Images = {
	'magnifier' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMKSURBVHjaYmRAADEeHt4yByenADU1NYWPHz9+P3bs2InrV69MBcptYMABAAIIhiyc3b1eHT5x7v/9R8/+33345P+12/f/n754/X9rz6R//AKCC4FqmLFpBAggkKCErZPb4clTpogyMTEzbDh1lWH/nWcMFx+/YmD+8Z1BVUmJUUvPSP/g3p2sf//82YtuAEAAMXNwcrVMmzXX6fuvPwwzz91n8HQwZ/A31WIw1lBkuPL1HwPQNQzyosIM33/+Mrt57fJcoJ4vyAYABBCTgbFZgIKsNMOsk7cYVHQ1GW5//8Ow9ekHhh3PPjL85eFhuMkhxPDx2w8GMys7dqB6T3QXAAQQi5qaquyDJy8Y3nLyM9z6/IvhNSMzAyszE8Pvf/8Z3n/7yfDkDyPDo9+MDKK8/AyMjExy////QzEAIAAVc4wDMAgDMNARpATExv8/2QEiVRVkxaOHyyLCcsfKQ9fEMMUC+PemCnytkKeyXg8AYl8dAcRy7+7dB1ycnEqS/z4zCDAxMEixszDwAw358+8fw/O/fxneMfxnEP7/i+Hu8+cM//79u4/uBYAAYjp98tjad+/eMehz/mdg/PSJgf3XLwYBoDN5gJqZvv9kkP76luHPly8Ml86eANl9D90AgABi/vPnz/nHjx/HOjk68vL8+MLw+/t3BlagIV/fvWdg/viWgf3rB4YfP38xuNpbM3749DX43p2bR4H6HsEMAAggUDr49vTxwz13bt/2kVdS5eNmYWL48/0rw4/Pnxge3H/IcO70aQY1VRUGc2N9BjMLS/YXr9+F3bl57SRQH9g7AAGEjARYWFjrlDV0zplYO73XNbF6KigivhYo3uQflfJv2YZd/6/fefD/yKmL//1Co7/BohQggIhCTExMGUBD/i5Zv/P/dWASP3bm0v/gqIQfQCl/gABiJsaA////n7l15cLjX/+YfARFJZiU5KQZDA2NWK5ev+ELEEDMRDuD4f+F29cu3fn++78/v7A406ePHxiWLpizCSCAGMgAIdqG5l94+QWXA9l8AAEGAAqaMIzpoCLsAAAAAElFTkSuQmCC',
};

TeamZone = {
	ALLSTATS:["AB", "H", "R", "HR", "2B", "3B", "RBI", "SB", "CS", "BB", "HBP", "SAC", "SF", "SO"],
	STATS:["AB", "H", "R", "HR", "2B", "3B", "RBI", "BB", "SF", "SO"],
	CALCS:["AVG", "OBP", "SLG"],
	order:'ASC',
	orderByLast:undefined,
	addListeners:function() {
		if (Config.get('playerGameLogs')) {
			// Add in link to bring up game log for each player and listen for click event.
			var seasonHittingStats = '#ctl00_ContentPlaceHolder1_TabContainer1_tbTeamStats_seasonStats_StatControl_TabContainer1_tpHittingStats';
			if ($(seasonHittingStats).size() > 0) {
				$(seasonHittingStats + ' table tr').each(function() {
					$('td:eq(1)', this).each(function() {
						// Hide useless remove link.
						if (Config.get('hideOverallRemove')) $('a', this).attr('style', 'display:none;');
						// Grab the player name.
						var player = $(this).text().replace('\xA0', '_').replace(/\n|\s/g, '').replace('_', ' ');
						// Add image link to bring up player details.
						$(this).append(
							'<img class="TZDetailsImage" src="' + Images.magnifier + '" ' +
							'title="Show Game Log for ' + player + '" ' +
							'lang="' + player + '" />');
						// Listen for click event.
						$('.TZDetailsImage', this).click(function() {
							TeamZone.showPlayerDetails(this.lang);
						});
					});
				});
			}
			// Listen for changes to player selected.
			$('#TZPlayerDetailsSelect').live('change', function() { 
				this.blur();
				TeamZone.showPlayerDetails(this.value);
			});
		}
		if (Config.get('tableSorting')) {
			$('table.StTable th').each(function() {
				$(this).wrapInner('<span class="TZStatRowSorter" title="Click to sort rows by ' + $(this).text() + '"/>');
				$('.TZStatRowSorter', this).click(function() {
					var table = $(this).parents('table');
					TeamZone.reorderTable(table, $(this).text());
				});
			});
		}
	},
	addOptions:function() {
		$('div.Search p').prepend('<span class="TZOptionsLink">Script Options</span>&nbsp;|&nbsp;');
		$('.TZOptionsLink').click(function() {
			if (!Config.get('playerGameLogs')) {
				delete Config.tabs['Game Logs'];
			} else {
				var season = TeamZone.getSeason();
				var savedSeason = UserData.get('Season' + season); if (!savedSeason) savedSeason = {}; 
				var players = TeamZone.getPlayers(savedSeason);
				html = '<select id="TZPlayerDetailsSelect" style="width:200px; border:1px solid gray;">';
				html += '<option value="" selected="selected">[Select Player]</option>';
				for (var pIdx in players) {
					html += '<option value="' + players[pIdx] + '">' + players[pIdx] + '</option>';
				}
				html += '</select><br><br>';
				Config.tabs['Game Logs'].html = html;
				Config.show();
			}
		});
	},
	addStyles:function() {
		GM_addStyle(
			'.TZOptionsLink:hover { cursor:pointer; text-decoration:underline; } ' +
			'.TZOptionsLink { font-weight:bold; } ' +
			'.TZDetailsImage { float:right; height:12px; width:12px; cursor:pointer; } ' +
			'.TZStatRowSorter { cursor:pointer; } ' +
			'.TZPlayerDetails { width:100%; } ' +
			'.TZPlayerDetailRow { height:21px; } ' +
			'.TZPlayerDetailGame { width:150px; text-align:left; } ' +
			'.TZPlayerDetailStat1 { width:25px; text-align:center; } ' +
			'.TZPlayerDetailStat2 { width:40px; text-align:center; } '
		);
	},
	getDate:function(details) {
		return details.match(/\d+\/\d+\/\d+\s/)[0];
	},
	getPlayers:function(season) {
		var players = new Array();
		for (var game in season) {
			if (season[game].lineup) { 
				for (var player in season[game].lineup) {
					// Is it in the array already?
					var found = false;
					for (var p in players) {
						if (players[p] == player) found = true;;
					}
					if (!found) players.push(player);
				}
			}
		}
		// Sort the array.
		players.sort();
		return players;
	},
	getSeason:function() {
		return $('#ctl00_ContentPlaceHolder1_ddlSeason').attr('value');
	},
	getTime:function(details) {
		return details.match(/\d+:\d+\s../)[0];
	},
	init:function() {
		TeamZone.addStyles();
		TeamZone.addOptions();
		TeamZone.readStats();
		TeamZone.addListeners();
	},
	readStats:function() {
		if (!Config.get('playerGameLogs')) return;
		var hittingStats = '#ctl00_ContentPlaceHolder1_TabContainer1_tbEditStats_EditGameStats1_StatControl_TabContainer1_tpHittingStats';
		if ($(hittingStats).size() > 0) {
			// First, get the season, game object, id, etc.
			var season = TeamZone.getSeason();
			var selectedGame = $("#ctl00_ContentPlaceHolder1_TabContainer1_tbEditStats_DDLGames option[selected='selected']");
			var gameId = $(selectedGame).attr('value');
			var gameDetails = $(selectedGame).text();
			var game = { 
				"id"      : gameId,
				"details" : gameDetails, 
				"lineup" : {} 
			};
			// Next, read each stat to be saved.
			count = 0; stats = {}; 
			$(hittingStats + ' table tr:eq(0) th').each(function() {
				stats[count++] = $(this).text();
			});
			// Next, iterate through each player, and gather individual stats.
			$(hittingStats + ' table tr:gt(0)').each(function() {
				count = 0; playerName = ''; playerStats = {};
				$('td', this).each(function() {
					if (this.className != "NoPadding Number") {
						playerStats[stats[count]] = $(this).text().replace('\xA0', '_').replace(/\n|\s/g, '').replace('_', ' ');
						if (stats[count] == 'Player Name') {
							playerName = playerStats[stats[count]];
						}
					} else {
						playerStats[stats[count]] = $('input', this).attr('value');
					}
					count++;
				});
				// Add this player to the game object.
				if (playerName != '') {
					game["lineup"][playerName] = playerStats;
				}
			}); 
			// Update saved stats for this game.
			TeamZone.saveGame(season, game);
		}
	},
	reorderTable:function(table, orderBy) { 
		// First, find the index to the column we're going to sort by.
		column = -1; index = 0;
		$('tr:eq(0) th', table).each(function() {
			if ($(this).text() == orderBy) {
				column = index;
			}
			index++;
		});
		// Once the index is found, the rows can be sorted.
		if (column != -1) {
			// Update order properties.
			TeamZone.order = (!TeamZone.orderLast || TeamZone.orderLast == orderBy) && TeamZone.order == 'DESC' ? 'ASC' : 'DESC';
			TeamZone.orderLast = orderBy;
			rows = new Array(); 
			values = new Array();
			$('tr:gt(0)', table).each(function() {
				newValue = $('td:eq(' + column + ')', this).text(); 
				newValue = orderBy == 'Player Name' ? newValue : parseFloat(newValue != '' ? newValue : 0); 
				for (i = 0; i < values.length; i++) { 
					if (values[i] < newValue) break;
				}
				values.splice(i, 0, newValue);
				rows.splice(i, 0, this);
			});
			var header = $('tr:eq(0)', table);
			$(table).html('');
			for (i = 0; i < rows.length; i++) {
				if (TeamZone.order == 'DESC') {
					$(table).append($(rows[i]));
				} else {
					$(table).prepend($(rows[i]));
				}
			} 
			$(table).prepend(header);
		}
	},
	saveGame:function(season, game) {
		var savedSeason = UserData.get('Season' + season); if (!savedSeason) savedSeason = {};
		// First, look for the game in the saved data. Update it, if found.
		for (var savedGame in savedSeason) {
			if (savedGame.id == game.id) {
				savedSeason[game.id] = game;
				UserData.set('Season' + season, savedSeason);
				return;
			} 
		}
		// If the game is not found (only way to get this far), then add a new one.
		savedSeason[game.id] = game;
		UserData.set('Season' + season, savedSeason);
	},
	showPlayerDetails:function(playerRequested) {
		var season = TeamZone.getSeason();
		var savedSeason = UserData.get('Season' + season); if (!savedSeason) savedSeason = {}; 
		var players = TeamZone.getPlayers(savedSeason);
		html = '<select id="TZPlayerDetailsSelect" style="width:200px; border:1px solid gray;">';
		for (var pIdx in players) {
			html += '<option ';
			html += players[pIdx] == playerRequested ? 'selected="selected" ' : '';
			html += 'value="' + players[pIdx] + '">' + players[pIdx] + '</option>';
		}
		html += '</select><br><br>';
		html += '<table class="TZPlayerDetails">';
		html += '<tr style="background-color:#ccc; height:24px;">';
		html += '<th class="TZPlayerDetailGame">&nbsp;Game</th>';
		for (var stat in TeamZone.STATS) {
			html += '<th class="TZPlayerDetailStat1">' + TeamZone.STATS[stat] + '</th>';
		}
		for (var stat in TeamZone.CALCS) {
			html += '<th class="TZPlayerDetailStat2">' + TeamZone.CALCS[stat] + '</th>';
		}
		html += '</tr>';
		var tracker = new StatTracker(TeamZone.ALLSTATS);
		for (var game in savedSeason) {
			if (savedSeason[game].lineup) { 
				var currDate = TeamZone.getDate(savedSeason[game].details);
				var currTime = TeamZone.getTime(savedSeason[game].details);
				for (var player in savedSeason[game].lineup) {
					var currStats = savedSeason[game].lineup[player]; 
					if (currStats && player == playerRequested) {
						tracker.update(currStats);
						html += '<tr class="TZPlayerDetailRow" ';
						html += 'onmouseover="this.style.backgroundColor = \'#B4CFEC\';" ';
						html += 'onmouseout="this.style.backgroundColor = \'\';">';
						html += '<td class="TZPlayerDetailGame">&nbsp;&nbsp;' + currDate + " @ " + currTime + '</td>';
						for (var stat in TeamZone.STATS) {
							html += '<td class="TZPlayerDetailStat1" style="text-align:center">';
							html += currStats[TeamZone.STATS[stat]] ? currStats[TeamZone.STATS[stat]] : '0';
							html += '</td>';
						}
						for (var stat in TeamZone.CALCS) {
							html += '<td class="TZPlayerDetailStat1" style="text-align:center">';
							html += tracker.getCalculation(TeamZone.CALCS[stat]);
							html += '</td>';
						}
						html += '</tr>';
					}
				}
			}
		}
		html += '<tr style="background-color:#ccc; height:24px;">';
		html += '<th>&nbsp;Totals</th>';
		for (var stat in TeamZone.STATS) {
			html += '<th class="TZPlayerDetailStat1">';
			html += tracker[TeamZone.STATS[stat]] >= 0 ? tracker[TeamZone.STATS[stat]] : '?';
			html += '</th>';
		}
		for (var stat in TeamZone.CALCS) {
			html += '<th class="TZPlayerDetailStat1">';
			html += tracker.getCalculation(TeamZone.CALCS[stat]);
			html += '</th>';
		}
		html += '</tr>';
		html += '</table>';
		if ($('#TZPlayerDetailsSelect').size() > 0) {
			Config.close();
		}
		Config.tabs['Game Logs'].html = html;
		Config.show('Game Logs');
	},
};

StatTracker = function(myStats) {
	for (var stat in myStats) {
		this[myStats[stat]] = 0;
	}
	this.getCalculation = function(stat) {
		var calc = 0;
		switch (stat) {
			case "AVG":
				calc = this["AB"] > 0 
					? this["H"] / this["AB"] : 0; break;
			case "OBP":
				calc = this["AB"] + this["BB"] + this["HBP"] + this["SF"] > 0 
					? (this["H"] + this["BB"] + this["HBP"]) / (this["AB"] + this["BB"] + this["HBP"] + this["SF"]) : 0; break;
			case "SLG":
				calc = this["AB"] > 0 
					? ((this["H"] - this["2B"] - this["3B"] - this["HR"]) + 2 * this["2B"] + 3 * this["3B"] + 4 * this["HR"]) / this["AB"] : 0; break;
		}
		return calc.toFixed(3);
	}
	this.update = function(stats) { 
		for (var stat in stats) { 
			if (this[stat] >= 0) {
				this[stat] += parseInt(stats[stat]); 
			}
		}
	}
};

TeamZone.init();
