// ==UserScript==
// @name           ogame highscore improved
// @namespace      marshen
// @description    Some improvements to the highscore like a bar to switch between lists even if you are scrolled down.
// @include        http://*.ogame.gameforge.com/game/index.php?page=highscore*
// @version        1.0.6
// @downloadURL    http://userscripts.org/scripts/source/121415.user.js
// @updateURL      https://userscripts.org/scripts/source/121415.meta.js
// ==/UserScript==

(function(){
	/* CONFIG */
	var language = "en";
	/* Dear translator, please don't upload a copy of this script but send me an email (which you can find on http://o-calc.com)!
	   Please use the german ("de") language as a template to translate.
	   The syntax is "key" : "value" where the translation goes into "value".
	   If a word has no translation you can remove that line. You can also remove the lines with 'false' as value.
	   Thank you.
	*/
	var localization = {
		"de" : {
			"thousand_seperator" : ".",
			"decimal_mark" : ",",
			"status_abbr_v" : "u",
			"No planets found for this player. It may take some time until the data is available by the OGame server." : "Keine Planeten gefunden für diesen Spieler. Bis die Daten vom OGame Server zur Verfügung gestellt werden, kann einige Zeit vergehen.",
			"Rankings" : "Rangliste",
			"Planets" : "Planeten",
			"Planet" : false,
			"Coordinate" : "Position",
			"Points: " : "Punkte: ",
			"Ships: " : "Schiffe: ",
			"Economy: " : "Ökonomie: ",
			"Real economy points.<br /><br />Points with defense: " : "Tatsächliche Ökonomie Punkte.<br /><br />Punkte inklusive Verteidigung: ",
			"Research: " : "Forschung: ",
			"Military: " : "Militär: ",
			"Real military points.<br /><br />Points with defense: " : "Tatsächliche Militär Punkte.<br /><br />Punkte inklusive Verteidigung: ",
			"Built: " : "Gebaut: ",
			"Destroyed: " : "Zerstört: ",
			"Lost: " : "Verloren: ",
			"Defense: " : "Verteidigung: ",
			"Honor: " : "Ehrenpunkte: "
		},
		"en" : {
			"thousand_seperator" : ",",
			"decimal_mark" : ".",
			"rank_sign" : "#",
			"percent_sign" : "%",
			"status_abbr_v" : "v",
			"status_abbr_i" : "i",
			"status_abbr_I" : "I",
			"status_abbr_o" : "o",
			"moon_abbr" : " M"
		}
	};
	
	var config = {
		barScrolling : true,
		showShips : true,
		extendedInformation : true,
		nextPrevPageLink : true,
		planetListSortCategory : 0, // 0: planet creation time, 1: planet names, 2: coordinates
		planetListSortAscending : true,
		status : {
			'v' : {
				className : 'status_abbr_vacation',
				value : 10
			},
			'o' : {
				className : 'status_abbr_outlaw',
				value : 1
			},
			'i' : {
				className : 'status_abbr_inactive',
				value : 2
			},
			'I' : {
				className : 'status_abbr_longinactive',
				value : 3
			}
		}
	};
	
	/* INIT */
	var data = {
		// Also contains the points of a player in this format:
		// <player_id> : {
		//   <statistic_type> : <array(int rank, int points)>
		//   "name" : <string fullname>
		//   "status" : <string>
		//   "planets" : <array(int number, string name, string coordinates, bool moon)>
		// }
		cache : {
			// Contains:
			// "universe" : <XML>
			// "players" : <XML>
			// Contains for each statistic type the last ajax response:
			// <statistic_type> : <XML>
		}
	};
	
	var TYPES = {
		GENERAL : 0,
		ECONOMY : 1,
		RESEARCH : 2,
		MILITARY : 3,
		MILITARY_POINTS_BUILT : 5,
		MILITARY_POINTS_DESTROYED : 6,
		MILITARY_POINTS_LOST : 4,
		HONOR : 7
	};

	/* INIT */
	var style;
	var version = document.getElementsByName('ogame-version');
	version = (version.length != 1 ? 0 : getVersion(version[0].getAttribute('content')));
	if (version < 30001 || !document.getElementsByClassName)
		return;
	if (config.barScrolling)
		document.addEventListener('scroll', scroll, false);
	if (version < 40100)
		config.extendedInformation = false;
		
	var lang = document.getElementsByName('ogame-language');
	if (lang.length > 0)
	{
		language = lang[0].getAttribute('content');
	}
	
	modifyPageBar();
	
	if (config.showShips || config.extendedInformation)
	{
		var content = document.getElementById('stat_list_content');
		content.addEventListener('DOMNodeInserted', nodeInserted, false);
	}
	
	if (config.barScrolling)
	{
		addStyle(
			'#highscore #send.improve #row { width: 630px; top: 0; position: fixed; background: #0D1014;  border-bottom: 10px solid #22313B; z-index: 9 }'
		);
		
		addStyle(
			'#highscore #send.improve #stat_list_content { padding-top: 65px; }'
		);
		
		addStyle(
			'#highscore #send.improve #stat_list_content .pagebar.hImproved_firstBar { width: 610px; top: 84px; position:fixed; background: #0d1014; z-index: 9 }'
		);
		
		// fix for 5.1
		addStyle(
			'#send.improve #highscoreHeadline { float: none; margin-top: 43px; }'
		);
		
		addStyle(
			'#send.improve #scrollToTop { z-index: 10; }'
		);
	}
	
	if (config.extendedInformation)
	{
		var ranks = document.getElementById('ranks');
		if (ranks)
		{
			addStyle(
				'.extendedInfoToggle { display: inline-block; width: 20px; height: 18px; margin-bottom: -4px; background: url("/cdn/img/navigation/message-open-close-bg.gif"); }'
			);
			
			addStyle(
				'.extendedInfoToggle:hover { background-position: -20px 0px; }'
			);
			
			addStyle(
				'.extendedInfoToggleExpanded { background-position: 0px -18px; }'
			);
			
			addStyle(
				'.extendedInfoToggleExpanded:hover { background-position: -20px -18px; }'
			);
			
			addStyle(
				'.hImproved_information > td { padding : 0 !important; }'
			);
			
			addStyle(
				'.hImproved_information .hImproved_information_head { background:url("/cdn/img/layout/header-stuff.gif") center; background-size: 100%; margin: 0px; height: 32px; padding: 0 15px 0 25px; }'
			);
			
			addStyle(
				'.hImproved_information .hImproved_playername { font-weight:bold; font-size: 11px; line-height: 32px; }'
			);
			
			addStyle(
				'.hImproved_information .hImproved_status { font-size: 9px }'
			);
			
			addStyle(
				'.hImproved_information ul.hImproved_select { float: right; }'
			);
			
			addStyle(
				'.hImproved_information ul.hImproved_select li { background:url("/cdn/img/navigation/network-tab-below-bg-short.gif"); display: inline-block; width: 150px; height: 23px; margin-top: 9px }'
			);
			
			addStyle(
				'.hImproved_information ul.hImproved_select a { width: 100%; display: inline-block; text-align: center; line-height: 23px; }'
			);
			
			// score table styles
			addStyle(
				'.hImproved_general { color: #D29D00; }'
			);
			addStyle(
				'.hImproved_economy { color: #848484; }'
			);
			addStyle(
				'.hImproved_research { color: #9C0; }'
			);
			addStyle(
				'.hImproved_military, .hImproved_military_built, .hImproved_military_destroyed, .hImproved_military_lost, .hImproved_ships { color: #D43635; }'
			);
			addStyle(
				'.hImproved_defense { color: #6F9FC8; }'
			);
			addStyle(
				'.hImproved_honor { color: #FF6; }'
			);
			
			addStyle(
				'.hImproved_general, .hImproved_economy, .hImproved_research, .hImproved_defense, .hImproved_emptyCell, .hImproved_even { background: #13181D }'
			);
			
			addStyle(
				'.hImproved_scores td { width: 50%; }'
			);
			addStyle(
				'#highscore #ranks .hImproved_tableHead td { font-weight: bold; text-align: left; border-bottom: 1px dotted #848484; }'
			);
			addStyle(
				'#highscore #ranks .hImproved_planets tBody tr:first-child td { border-top: 0; }'
			);
			addStyle(
				'#highscore .hImproved_planets .hImproved_coords a { color: white }'
			);
			addStyle(
				'.hImproved_planets .hImproved_planetnumber { width: 20px; text-align: right; }'
			);
			addStyle(
				'#highscore .contentbox div.content table.hImproved_scores, #highscore .contentbox div.content table.hImproved_planets { width: 580px; margin: 0 auto 10px; }'
			);
			addStyle(
				'.hImproved_home, #highscore .hImproved_planets .hImproved_home .hImproved_coords a { color: #6F9FC8; }'
			);
			addStyle(
				'#highscore a.hImproved_sortable { padding-left: 10px; background: no-repeat left url(data:image/gif;base64,R0lGODlhCQAFAJEAAAAAAP///4SEhP///yH5BAEAAAMALAAAAAAJAAUAAAILnCenworZTHx0iQIAOw==); }'
			);
			addStyle(
				'#highscore a.hImproved_sortable.hImproved_asc { background-image: url(\'http://gf1.geo.gfsrv.net/cdnf5/1c7545144452ec3e38c9fba216c4f9.gif\'); }'
			);
			addStyle(
				'#highscore a.hImproved_sortable.hImproved_desc { background-image: url(\'http://gf3.geo.gfsrv.net/cdn5e/7e6b4e65bec62ac2f10ea24ba76c51.gif\'); }'
			);
			
			addExtendedInformationToggles(ranks.tBodies[0]);
		}
	}
	
	/* UTILS */
	
	/**
	 * Parses a given version to an integer.
	 * @param	pVersion	The version string to parse.
	 * @return	The parsed version.
	 */
	function getVersion(pVersion)
	{
		var version = pVersion.toString().split('.');
		if (version.length >= 3)
		{
			// This is why I would like to see the version as a number because otherwise you can't compare it!
			var intversion = parseInt(version[0]) * 10000 + parseInt(version[1]) * 100 + parseInt(version[2]);
			return intversion;
		}
		return parseInt(pVersion);
	}
	
	// Adds a style rule.
	function addStyle(rule)
	{
		if (!style)
		{
			style = document.createElement('style');
			style.setAttribute('type', 'text/css')
			style.setAttribute('id', 'highscore_improved_style');
			
			var head = document.head || document.getElementsByTagName('head')[0];
			head.appendChild(style);
		}
		style.appendChild(document.createTextNode(rule + "\n"));
	}
	
	// Adds a class to an element.
	function addClass (elm, className) {
		if (elm.className.length == 0) {
			elm.className = className;
		} else {
			if (!hasClass(elm, className)) {
				elm.className += ' ' + className;
			}
		}
	}

	// Removes a class from an element.
	function removeClass (elm, className) {
		if (hasClass(elm, className))
		{
			var classes = elm.className.split(' ');
			for (var i = 0; i < classes.length; i++) {
				if (classes[i] == className) {
					classes.splice(i, 1);
				}
			}
			elm.className = classes.join(' ');
		}
	}
	
	// Has an element a class.
	function hasClass (elm, className) {
		return ((' ' + elm.className + ' ').indexOf(className) > -1);
	}
	
	function trim(s)
	{
		s = s.toString();
		if (s.trim)
		{
			return s.trim();
		}
		return s.replace(/^\s+/, '').replace(/\s+$/, '');
	}
	
	// Adds thousand seperator
	function addSeperator(s)
	{
		var seperator = L('thousand_seperator');
		var mark = L('decimal_mark');
	 
		s = s.toString();
		// Separate number and fraction.
		var a = s.split('.');
		var neg = (a[0][0] == '-' ? '-' : '');
		var num = a[0].substr(neg.length); // Number w/o negative sign.
		var frac = a[1];
		var res = '';
		var len = num.length;
		while (len > 3){
			res = seperator + num.substr(len - 3, 3) + res;
			len -= 3;
		}
		res = neg + num.substr(0, len) + res;
	 
		if (frac)
			res = res + mark + frac;
		return res;
	}
	
	// Get localization
	function L(key)
	{
		if (localization[language] && localization[language][key])
			return localization[language][key];
		if (localization['en'][key])
			return localization['en'][key];
		return key;
	}
	
	
	/* DATA HANDLING FUNCTIONS */
	function getHighscoreURL(type)
	{
		return 'http://' + location.host + '/api/highscore.xml?category=1&type=' + type;
	}
	
	function getUniverseURL()
	{
		return 'http://' + location.host + '/api/universe.xml';
	}
	
	function getPlayersURL()
	{
		return 'http://' + location.host + '/api/players.xml';
	}
	
	function getPlayerURL(id)
	{
		return 'http://'+ location.host + '/api/playerData.xml?id=' + id;
	}
	
	function isDataComplete()
	{
		return (requests.length > 0 && currentRequest == requests.length);
	}
	
	function isPlayerDataComplete(playerId)
	{
		var player = data[playerId];
		return player != null;
	}
	
	function isValidType(type)
	{
		var tmp = parseInt(type);
		return !isNaN(tmp) && tmp >= 0 && tmp <= TYPES.HONOR;
	}
	
	function loadNextRequest()
	{
		// If there are still more requests in the queue load them.
		if (currentRequest < requests.length)
		{
			var http;
			if (window.XMLHttpRequest) {
				http = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				http = new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			if (http != null) {
				var url;
				if (requests[currentRequest] == "universe")
				{
					url = getUniverseURL();
				}
				else if (requests[currentRequest] == "players")
				{
					url = getPlayersURL();
				}
				else
				{
					url = getHighscoreURL(requests[currentRequest]);
				}
				http.open("GET", url, true);
				http.onreadystatechange = function () {
					if (http.readyState == 4 && http.status == 200)
					{
						// Save the xml and start next request.
						data.cache[requests[currentRequest]] = http.responseXML;
						currentRequest++;
						loadNextRequest();
						
						var percent = Math.min(Math.round(currentRequest / requests.length * 100), 99);
						var spans = document.getElementsByName('hImproved_loading');
						for (var i = 0; i < spans.length; i++)
						{
							spans[i].firstChild.nodeValue = percent;
						}
					}
				}
				http.send(null);
			}
		}
		else
		{
			onDataComplete();
		}
	}
	
	
	//////////
	// Will be called when all AJAX requests have been finished. Build UI for the pending players.
	function onDataComplete()
	{
		for (var i = 0; i < pendingPlayers.length; i++)
		{
			showData(pendingPlayers[i][0], pendingPlayers[i][1]);
		}
	}
	
	var requests = [];
	var currentRequest = 0;
	var pendingPlayers = [];
	
	/////////////
	// Gather data and build UI for a player.
	function showData(playerId, container)
	{
		// If the data hasn't been loading enqueue the player for later.
		if (!isDataComplete())
		{
			pendingPlayers.push([playerId, container]);
			// When this is being called the first time start AJAX requests.
			if (requests.length == 0)
			{
				requests.push("universe");
				requests.push("players");
				for (var i in TYPES)
				{
					requests.push(TYPES[i]);
				}
				loadNextRequest();
			}
		}
		else
		{
			// XML has been received. Check if data has already been fetched.
			if (!isPlayerDataComplete(playerId))
			{
				// Fetch data from XML
				var playerData = {
					planets : []
				};
				// Fetch highscore data.
				for (var i in TYPES)
				{
					var players = data.cache[TYPES[i]].getElementsByTagName('player');
					var rank = 0;
					var score = 0;
					for (var j = 0; j < players.length; j++)
					{
						if (players[j].getAttribute('id') == playerId)
						{
							rank = parseInt(players[j].getAttribute('position'));
							score = parseInt(players[j].getAttribute('score'));
							playerData[TYPES[i]] = [rank, score];
							
							if (TYPES[i] == TYPES.MILITARY)
							{
								var ships = 0;
								if (players[j].getAttribute('ships'))
								{
									ships = parseInt(players[j].getAttribute('ships'));
								}
								playerData[TYPES[i]].push(ships);
							}
							break;
						}
					}
				}
				// Fetch player data.
				var players = data.cache['players'].getElementsByTagName('player');
				for (var i = 0; i < players.length; i++)
				{
					if (players[i].getAttribute('id') == playerId)
					{
						playerData['name'] = players[i].getAttribute('name');
						playerData['status'] = players[i].getAttribute('status');
						break;
					}
				}
				// Fetch planets.
				var planets = data.cache['universe'].getElementsByTagName('planet');
				for (var i = 0; i < planets.length; i++)
				{
					if (planets[i].getAttribute('player') == playerId)
					{
						var planet = planets[i];
						var name = planet.getAttribute('name');
						var moon = (planet.firstChild != null);
						var coords = planet.getAttribute('coords');
						playerData.planets.push([playerData.planets.length + 1, name, coords, moon]);
					}
				}
				
				data[playerId] = playerData;
				// Planets are sorted by number ascending. Sort if current sorting isn't number ascending
				if (config.planetListSortCategory != 0 || config.planetListSortAscending == false)
				{
					data[playerId].planets.sort(sortPlanetsComparison);
				}
			}
			// Build UI
			
			// Calculate data
			var scores = {
				general : data[playerId][TYPES.GENERAL],
				economy : data[playerId][TYPES.ECONOMY],
				economyActual : null,
				research : data[playerId][TYPES.RESEARCH],
				military : data[playerId][TYPES.MILITARY],
				militaryActual : null,
				military_built : data[playerId][TYPES.MILITARY_POINTS_BUILT],
				military_destroyed : data[playerId][TYPES.MILITARY_POINTS_DESTROYED],
				military_lost : data[playerId][TYPES.MILITARY_POINTS_LOST],
				honor : data[playerId][TYPES.HONOR],
				defenseActual : null,
			}
			
			scores.defenseActual = Math.max((scores.economy[1] + scores.research[1] + scores.military[1]) - scores.general[1], 0);
			scores.economyActual = Math.max(Math.floor(scores.economy[1] - scores.defenseActual), 0);
			scores.militaryActual = Math.max(Math.floor(scores.military[1] - scores.defenseActual), 0);
			
			scores.economyPercentage = scores.economyActual / scores.general[1];
			scores.researchPercentage = scores.research[1] / scores.general[1];
			scores.militaryPercentage = scores.militaryActual / scores.general[1];
			scores.defensePercentage = scores.defenseActual / scores.general[1];
			
			// Clear container.
			while (container.firstChild)
			{
				container.removeChild(container.firstChild);
			}
			
			// Fill UI
			var head = document.createElement('div');
			head.setAttribute('class', 'hImproved_information_head');
			var span = document.createElement('span');
			span.appendChild(document.createTextNode((data[playerId].name ? data[playerId].name : '')));
			span.setAttribute('class', 'hImproved_playername');
			head.appendChild(span);
			var status = data[playerId].status;
			
			if (status)
			{
				var commandingStatus;
				var text = '';
				span = document.createElement('span');
				for (var i = 0; i < status.length; i++)
				{
					if (!commandingStatus || commandingStatus.value < config.status[status[i]].value)
					{
						commandingStatus = config.status[status[i]];
					}
					text += L("status_abbr_" + status[i]);
				}
				span.appendChild(document.createTextNode(' (' + text + ')'));
				span.setAttribute('class', 'hImproved_status ' + commandingStatus.className);
				head.appendChild(span);
			}
			
			var list = document.createElement('ul');
			list.setAttribute('class', 'hImproved_select');
			var item = document.createElement('li');
			var link_scores = document.createElement('a');
			link_scores.appendChild(document.createTextNode(L("Rankings")));
			link_scores.setAttribute('href', 'javascript:void(0)');
			item.appendChild(link_scores);
			list.appendChild(item);
			
			item = document.createElement('li');
			var link_planets = document.createElement('a');
			link_planets.appendChild(document.createTextNode(L("Planets")));
			link_planets.setAttribute('href', 'javascript:void(0)');
			item.appendChild(link_planets);
			list.appendChild(item);
			
			head.appendChild(list);
			
			container.appendChild(head);
			
			
			
			// Scores table
			var scoreTable = document.createElement('table');
			scoreTable.setAttribute('class', 'hImproved_scores');
			var scoreTBody = document.createElement('tBody');
			scoreTable.appendChild(scoreTBody);
			for (var i = 0; i < 5; i++)
			{
				var row = document.createElement('tr');
				for (var j = 0; j < 2; j++)
				{
					var cell = document.createElement('td');
					row.appendChild(cell);
				}
				scoreTBody.appendChild(row);
			}
			container.appendChild(scoreTable);
			
			
			// General.
			fillScoresCell(scoreTBody.rows[0].cells[0], {
				desc : 'Points: ',
				score : scores.general[1],
				rank : scores.general[0],
				className : 'hImproved_general'
			});
			
			// Ships.
			fillScoresCell(scoreTBody.rows[0].cells[1], {
				desc : 'Ships: ',
				score : scores.military[2],
				className : 'hImproved_ships'
			});
			
			// Economy.
			fillScoresCell(scoreTBody.rows[1].cells[0], {
				desc : 'Economy: ',
				tooltip : ['Real economy points.<br /><br />Points with defense: ', addSeperator(scores.economy[1])],
				score : scores.economyActual,
				rank : scores.economy[0],
				percentage : scores.economyPercentage,
				className : 'hImproved_economy'
			});
			
			// Research.
			fillScoresCell(scoreTBody.rows[2].cells[0], {
				desc : 'Research: ',
				score : scores.research[1],
				rank : scores.research[0],
				percentage : scores.researchPercentage,
				className : 'hImproved_research'
			});
			
			// Military.
			fillScoresCell(scoreTBody.rows[3].cells[0], {
				desc : 'Military: ',
				tooltip : ['Real military points.<br /><br />Points with defense: ', addSeperator(scores.military[1])],
				score : scores.militaryActual,
				rank : scores.military[0],
				percentage : scores.militaryPercentage,
				className : 'hImproved_military'
			});
			
			// Military built.
			fillScoresCell(scoreTBody.rows[1].cells[1], {
				desc : 'Built: ',
				score : scores.military_built[1],
				rank : scores.military_built[0],
				className : 'hImproved_military_built'
			});
			
			// Military destroyed.
			fillScoresCell(scoreTBody.rows[2].cells[1], {
				desc : 'Destroyed: ',
				score : scores.military_destroyed[1],
				rank : scores.military_destroyed[0],
				className : 'hImproved_military_destroyed'
			});
			
			// Military lost.
			fillScoresCell(scoreTBody.rows[3].cells[1], {
				desc : 'Lost: ',
				score : scores.military_lost[1],
				rank : scores.military_lost[0],
				className : 'hImproved_military_lost'
			});
			
			// Defense.
			fillScoresCell(scoreTBody.rows[4].cells[0], {
				desc : 'Defense: ',
				score : scores.defenseActual,
				percentage : scores.defensePercentage,
				className : 'hImproved_defense'
			});
			
			// Honor.
			fillScoresCell(scoreTBody.rows[4].cells[1], {
				desc : 'Honor: ',
				score : scores.honor[1],
				rank : scores.honor[0],
				className : 'hImproved_honor'
			});
			
			// Planets table
			var planetsTable = document.createElement('table');
			planetsTable.setAttribute('class', 'hImproved_planets');
			planetsTable.setAttribute('style', 'display: none');
			var planetsTBody = document.createElement('tBody');
			planetsTable.appendChild(planetsTBody);
			
			var row, cell, link;
			var link_sort = Array(3);
			planetsTable.createTHead();
			row = document.createElement('tr');
			row.setAttribute('class', 'hImproved_tableHead');
			cell = document.createElement('td');
			cell.setAttribute('class', 'hImproved_planetnumber');
			link_sort[0] = document.createElement('a');
			link_sort[0].setAttribute('class', 'hImproved_sortable');
			link_sort[0].setAttribute('href', 'javascript:void(0)');
			link_sort[0].appendChild(document.createTextNode(L('rank_sign')));
			cell.appendChild(link_sort[0]);
			row.appendChild(cell);
			cell = document.createElement('td');
			link_sort[1] = document.createElement('a');
			link_sort[1].setAttribute('class', 'hImproved_sortable');
			link_sort[1].setAttribute('href', 'javascript:void(0)');
			link_sort[1].appendChild(document.createTextNode(L('Planet')));
			cell.appendChild(link_sort[1]);
			cell.setAttribute('class', 'hImproved_planet');
			row.appendChild(cell);
			cell = document.createElement('td');
			link_sort[2] = document.createElement('a');
			link_sort[2].setAttribute('class', 'hImproved_sortable');
			link_sort[2].setAttribute('href', 'javascript:void(0)');
			link_sort[2].appendChild(document.createTextNode(L('Coordinate')));
			cell.appendChild(link_sort[2]);
			row.appendChild(cell);
			planetsTable.tHead.appendChild(row);
			
			var planets = data[playerId].planets;
			
			if (planets.length > 0)
			{
				for (var i = 0; i < planets.length; i++)
				{
					row = document.createElement('tr');
					row.setAttribute('class', 'hImproved_' + (i % 2 ? 'odd' : 'even'));
					
					cell = document.createElement('td');
					cell.appendChild(document.createTextNode(''));
					cell.setAttribute('class', 'hImproved_planetnumber');
					row.appendChild(cell);
					
					cell = document.createElement('td');
					cell.appendChild(document.createTextNode(''));
					cell.setAttribute('class', 'hImproved_planet');
					row.appendChild(cell);
					
					cell = document.createElement('td');
					link = document.createElement('a');
					link.appendChild(document.createTextNode(''));
					cell.appendChild(link);
					cell.setAttribute('class', 'hImproved_coords');
					row.appendChild(cell);
					
					planetsTBody.appendChild(row);
				}
				
				fillPlanets(playerId, planetsTable);
			}
			else
			{
				row = document.createElement('tr');
				cell = document.createElement('td');
				cell.setAttribute('colspan', '3');
				cell.appendChild(document.createTextNode(L("No planets found for this player. It may take some time until the data is available by the OGame server.")));
				row.appendChild(cell);
				
				planetsTBody.appendChild(row);
			}
			
			container.appendChild(planetsTable);
			
			// Add event handler for tabs
			link_scores.addEventListener('click', function () { scoreTable.setAttribute('style', 'display: table'); planetsTable.setAttribute('style', 'display: none'); }, false);
			link_planets.addEventListener('click', function () { scoreTable.setAttribute('style', 'display: none'); planetsTable.setAttribute('style', 'display: table'); }, false);
			
			for (var i = 0; i < link_sort.length; i++)
			{
				link_sort[i].addEventListener('click', function(category) { return function () { sortPlanets.apply(this, [playerId, category]); } }(i));
			}
		}
	}
	
	function fillScoresCell(cell, params)
	{
		var span, elm;
		span = document.createElement('span');
		if (params.tooltip)
		{
			span.setAttribute('class', 'tooltipRight');
			var title = '';
			for (var i = 0; i < params.tooltip.length; i++)
			{
				title += L(params.tooltip[i]);
			}
			span.setAttribute('title', title);
		}
		span.appendChild(document.createTextNode(L(params.desc)));
		elm = document.createElement('span');
		elm.appendChild(document.createTextNode(addSeperator(params.score)));
		elm.setAttribute('class', 'hImproved_score');
		span.appendChild(elm);
		if (params.rank)
		{
			span.appendChild(document.createTextNode(' '));
			elm = document.createElement('span');
			elm.appendChild(document.createTextNode(L('rank_sign') + addSeperator(params.rank)));
			elm.setAttribute('class', 'hImproved_rank');
			span.appendChild(elm);
		}
		if (params.percentage)
		{
			// Percent with one decimal.
			params.percentage = Math.round(params.percentage * 1000) / 10;
			
			span.appendChild(document.createTextNode(' '));
			elm = document.createElement('span');
			elm.appendChild(document.createTextNode('(' + params.percentage + L('percent_sign') + ')'));
			elm.setAttribute('class', 'hImproved_percent');
			span.appendChild(elm);
		}
		cell.appendChild(span);
		cell.setAttribute('class', params.className);
	}
	
	function fillPlanets(playerId, table)
	{
		if (typeof table == "undefined")
		{
			// Get planets table.
			table = document.getElementById('hImproved_information_' + playerId);
			table = table.getElementsByClassName('hImproved_planets');
			if (table.length < 1)
			{
				return;
			}
			table = table[0];
		}
		
		var link, coords, row;
		var tBody = table.tBodies[0];
		var planets = data[playerId].planets;
		for (var i = 0; i < planets.length; i++)
		{
			row = tBody.rows[i];
			// Homeplanet
			if (planets[i][0] == 1)
			{
				addClass(row, 'hImproved_home');
			}
			else
			{
				removeClass(row, 'hImproved_home');
			}
		
			// Planet number
			row.cells[0].firstChild.nodeValue = planets[i][0];
		
			// Planet name
			row.cells[1].firstChild.nodeValue = planets[i][1];
		
			// Planet coordinate
			link = row.cells[2].firstChild;
			coords = planets[i][2].split(':');
			if (coords.length > 1)
			{
				link.setAttribute('href', '?page=galaxy&galaxy=' + coords[0] + '&system=' + coords[1]);
			}
			else
			{
				link.setAttribute('href', '#');
			}
			link.firstChild.nodeValue = planets[i][2] + (planets[i][3] ? L("moon_abbr") : '');
		}
		
		// Fix table head sort icons
		row = table.tHead.rows[0];
		for (var i = 0; i < row.cells.length; i++)
		{
			link = row.cells[i].firstChild;
			removeClass(link, 'hImproved_asc');
			removeClass(link, 'hImproved_desc');
			if (i == config.planetListSortCategory)
			{
				addClass(link, (config.planetListSortAscending ? 'hImproved_asc' : 'hImproved_desc'));
			}
		}
	}
	
	// Sort planets of a player by category
	function sortPlanets(playerId, category)
	{
		if (category == config.planetListSortCategory)
		{
			config.planetListSortAscending = !config.planetListSortAscending;
		}
		else
		{
			config.planetListSortCategory = category;
			config.planetListSortAscending = true;
		}
		
		// Actually sort
		data[playerId].planets.sort(sortPlanetsComparison);
		
		fillPlanets(playerId);
	}
	
	// Comparison function for planet sorting
	function sortPlanetsComparison(a, b)
	{
		var factor = (config.planetListSortAscending ? 1 : -1);
		
		if (config.planetListSortCategory == 1)
		{
			if (a[1] < b[1])
			{
				return -1 * factor;
			}
			else if (a[1] > b[1])
			{
				return 1 * factor;
			}
		}
		else if (config.planetListSortCategory == 2)
		{
			var coords = [];
			coords.push(a[2].split(':'));
			coords.push(b[2].split(':'));
			for (var i = 0; i < coords.length; i++)
			{
				for (var j = 0; j < coords[i].length; j++)
				{
					coords[i][j] = parseInt(coords[i][j]);
				}
			}
			
			if (coords[0].length > 2 && coords[1].length > 2)
			{
				// Galaxy
				if (coords[0][0] < coords[1][0])
				{
					return -1 * factor;
				}
				else if (coords[0][0] > coords[1][0])
				{
					return 1 * factor;
				}
				// System
				else if (coords[0][1] < coords[1][1])
				{
					return -1 * factor;
				}
				else if (coords[0][1] > coords[1][1])
				{
					return 1 * factor;
				}
				// Planet
				else if (coords[0][2] < coords[1][2])
				{
					return -1 * factor;
				}
				else if (coords[0][2] > coords[1][2])
				{
					return 1 * factor;
				}
			}
		}
		
		// Sort normal if category comparison is equal
		// Check unique planet number
		return (a[0] - b[0]) * factor;
	}
	
	function scroll(evt)
	{
		var scrollTop = (window.pageYOffset || (document.body && document.body.scrollTop));
		var elemTop = 0;
		var send = document.getElementById('send');
		var elem = send;
		do
		{
			elemTop += elem.offsetTop;
			elem = elem.offsetParent;
		}
		while (elem);
		
		if (scrollTop > elemTop)
			send.setAttribute('class', 'improve');
		else
			send.setAttribute('class', '');
	}
	
	function nodeInserted(evt)
	{
		if(!evt || !evt.target || !evt.target.childElementCount || evt.target.childElementCount < 1 || !evt.relatedNode || !evt.relatedNode.id || evt.relatedNode.id != 'stat_list_content')
			return;
		var ranks = document.getElementById('ranks');
		if (!ranks)
			return;
		
		modifyPageBar();
		
		var navigationRow = document.getElementById('row');
		var active = navigationRow.getElementsByClassName('active');
		if (active.length == 0 || active[0].getAttribute('id') == 'alliance')
			return;
		
		var tBody = ranks.tBodies[0];
		
		// Show ship count next to the military score
		if (config.showShips && active.length == 2 && active[1].getAttribute('id') == 'fleet')
		{
			for (var i = 0; i < tBody.rows.length; i++)
			{
				var td = tBody.rows[i].getElementsByClassName('score');
				if (td && td.length > 0)
				{
					var title = td[0].getAttribute('title');
					if (title && title.length > 0)
					{
						var points = title.substring(title.lastIndexOf(' ') + 1);
						var span = document.createElement('span');
						span.setAttribute('class', 'shipcount');
						span.appendChild(document.createTextNode('(' + points + ')'));
						
						td[0].appendChild(document.createElement('br'));
						td[0].appendChild(span);
					}
					else
					{
						break;
					}
				}
			}
		}
		
		// Show information beneath the player
		if (config.extendedInformation)
		{
			addExtendedInformationToggles(tBody);
		}
	}
	
	function addExtendedInformationToggles(tBody)
	{
		var a = document.createElement('a');
		a.setAttribute('class', 'extendedInfoToggle');
		a.setAttribute('href', 'javascript:void(0)');
		
		for (var i = 0; i < tBody.rows.length; i++)
		{
			var td = tBody.rows[i].getElementsByClassName('score');
			if (td && td.length > 0)
			{
				var tmp = a.cloneNode(true);
				tmp.addEventListener('click', toggleExtendedInformation, false);
				td[0].appendChild(tmp);
			}
		}
	}
	
	function toggleExtendedInformation(evt)
	{
		var playerId;
		var infoRow;
		var expand = true;
		var row = evt.target.parentNode.parentNode;
		// Get the player id.
		var sendMessage = row.getElementsByClassName('sendmsg');
		if (sendMessage.length > 0)
		{
			var sendMessageLinks = sendMessage[0].getElementsByTagName('a');
			if (sendMessageLinks.length > 0)
			{
				var expr = /&to=(\d*)/;
				var result = expr.exec(sendMessageLinks[0].getAttribute('href'));
				if (result != null)
				{
					playerId = result[1];
				}
			}
			else
			{
				// The player has clicked himself.
				var ogamePlayerId = document.getElementsByName('ogame-player-id');
				if (ogamePlayerId.length > 0)
				{
					playerId = parseInt(ogamePlayerId[0].getAttribute('content'));
				}
			}
		}
		else
		{
			return;
		}
		
		// Get the row used to show the information.
		infoRow = document.getElementById('hImproved_information_' + playerId);
		
		if (!infoRow)
		{
			// No row found create one and load the data.
			infoRow = document.createElement('tr');
			infoRow.setAttribute('class', 'hImproved_information');
			infoRow.setAttribute('id', 'hImproved_information_' + playerId);
			var td = document.createElement('td');
			td.setAttribute('colspan', '5');
			td.appendChild(document.createTextNode(L('Loading... ')));
			var span = document.createElement('span');
			span.appendChild(document.createTextNode('0.0'));
			span.setAttribute('name', 'hImproved_loading');
			td.appendChild(span);
			td.appendChild(document.createTextNode(L('percent_sign')));
			infoRow.appendChild(td);
			
			// Add behind the clicked row.
			row.parentNode.insertBefore(infoRow, row.nextSibling);
			
			
			showData(playerId, td);
		}
		
		if (hasClass(evt.target, 'extendedInfoToggleExpanded'))
		{
			expand = false;
			removeClass(evt.target, 'extendedInfoToggleExpanded');
		}
		else
		{
			addClass(evt.target, 'extendedInfoToggleExpanded');
		}
		
		infoRow.style.display = (expand ? 'table-row' : 'none');
		
		return false;
	}
	
	// Adds a needed class and optionally creates first/last page links.
	function modifyPageBar()
	{
		var pageBar = document.getElementsByClassName("pagebar");
		if (pageBar.length < 1)
			return;
		
		pageBar[0].setAttribute('class', pageBar[0].getAttribute('class') + ' hImproved_firstBar');
		
		// Show first and last page switch
		if (config.nextPrevPageLink)
		{
			var pageBarActive = pageBar[0].getElementsByClassName('activePager');
			if (pageBarActive.length > 0)
			{
				var prevLink = pageBarActive[0].previousSibling;
				var nextLink = pageBarActive[0].nextSibling;
				var hasFirstPageLink = false;
				var hasLastPageLink = false;
				
				// Find A node before and behind the selected page.
				while (prevLink && prevLink.nodeType != 1)
				{
					prevLink = prevLink.previousSibling;
				}
				while (nextLink && nextLink.nodeType != 1)
				{
					nextLink = nextLink.nextSibling;
				}
				
				// Check if there is first page link. Since first node contains whitespaces use second node.
				if (isNaN(parseInt(pageBar[0].firstChild.nextSibling.firstChild.nodeValue)))
				{
					hasFirstPageLink = true;
				}
				
				// Check if there is last page link. If the last page is selected the last node is a text node which has no children.
				if (pageBar[0].lastChild.previousSibling.firstChild && isNaN(parseInt(pageBar[0].lastChild.previousSibling.firstChild.nodeValue)))
				{
					hasLastPageLink = true;
				}
				
				for (var bar = 0; bar < pageBar.length; bar++)
				{
					// Fix whitespace nodes so that links can be inserted with correct "margin".
					if (pageBar[bar].firstChild.nodeType == 3)
					{
						pageBar[bar].firstChild.nodeValue = '\u00a0 ';
					}
					if (pageBar[bar].lastChild.nodeType == 3)
					{
						pageBar[bar].removeChild(pageBar[bar].lastChild);
					}
					
					if (prevLink)
					{
						var node;
						prevLink = prevLink.cloneNode(false);
						prevLink.appendChild(document.createTextNode("<"));
						if (hasFirstPageLink)
						{
							node = pageBar[bar].firstChild.nextSibling.nextSibling;
							if (bar == 1)
							{
								node = node.nextSibling.nextSibling;
							}
							pageBar[bar].insertBefore(document.createTextNode("\u00a0 "), node);
							pageBar[bar].insertBefore(prevLink, node);
						}
						else
						{
							node = pageBar[bar].firstChild;
							// Ignore "to top" button
							if (bar == 1)
							{
								node = node.nextSibling.nextSibling.nextSibling;
								node = pageBar[bar].insertBefore(document.createTextNode("\u00a0 "), node);
							}
							pageBar[bar].insertBefore(prevLink, node);
						}
					}
					if (nextLink)
					{
						nextLink = nextLink.cloneNode(false);
						nextLink.appendChild(document.createTextNode(">"));
						if (hasLastPageLink)
						{
							pageBar[bar].insertBefore(nextLink, pageBar[bar].lastChild);
							pageBar[bar].insertBefore(document.createTextNode("\u00a0 "), pageBar[bar].lastChild);
						}
						else
						{
							pageBar[bar].appendChild(document.createTextNode("\u00a0 "));
							pageBar[bar].appendChild(nextLink);
						}
					}
				}
			}
		}
	}
})();