// ==UserScript==
// @name           ConquerStats
// @namespace      cspare.ConquerStats
// @description    Shows several statistics for Conquerclub games.
// @include        http://*conquerclub.com*
// @version		   1.6.0
// ==/UserScript==

var scriptVersion = "1.6.0";
unsafeWindow = unsafeWindow || window;


function checkForUpdateVersion() {
	 var lastupdate = GM_getValue('lastupdate', 0);
	 if (lastupdate < new Date().getTime() - 60*60*1000) {
			GM_setValue('lastupdate', new Date().getTime() + "");
			var scriptURL = 'http://userscripts.org/scripts/source/95109.meta.js';// ?nocache=' + Math.random();
			GM_xmlhttpRequest({
				 method: 'GET',
				 url: scriptURL,
				 onload: updateServerNumber
			});
	 }
	 toggleUpdateAvailable();
}

function updateServerNumber(response) {
	try {
		var serverVersion = /@version\s+(\d+.\d+)/.exec(response.responseText)[1];
		GM_setValue('updateavailable', serverVersion);
		toggleUpdateAvailable();
	}catch(e){}
}

function toggleUpdateAvailable() {
	showMenu(isNewVersion());
	
}
function isNewVersion() {
	var serverVersion = GM_getValue('updateavailable', false);
	if (serverVersion) {
		var newVersion = serverVersion.split('.').map(function(string) {
				return parseInt(string,10);
		 });
		 var thisVersion = versionString.split('.').map(function(string) {
				return parseInt(string,10);
		 });
		 return (newVersion[0]>thisVersion[0] || (newVersion[0]==thisVersion[0] && (newVersion[1]>thisVersion[1])));
	}
	return false;
}

function doUpgrade() {
	GM_setValue('lastupdate', new Date().getTime() + "");
	var link = this.getElementsByTagName("a")[0];
	link.href = "http://userscripts.org/scripts/source/95109.user.js";
}

function cc_log(text) {
	if (unsafeWindow.console && unsafeWindow.console.log) {
		if (typeof text == "string" || typeof text == 'number') {
			text = "CS:" + cc_log.caller.toString().split(/{/)[0].split('function')[1] + ': ' + text;
		}
		unsafeWindow.console.log(text);
	}
}

function SwitchDisplayPosition() {
	displayPosition++;
	if (displayPosition >= displayPositionNames.length) {
		displayPosition = 0;
	}
	GM_setValue('csDisplayPosition',displayPosition);
	
	document.getElementById('displayPositionMenuLink').innerHTML = 'Position: <b>' + displayPositionNames[displayPosition] + '</b>';

	// Move HTML elements to new position:
	var divAggression = document.getElementById('Aggression');
	InsertMainDiv(divAggression);
}

function showMenu(isLatestVersion) {
	var divLeftColumn = document.getElementById('leftColumn');
	var ul = divLeftColumn.getElementsByTagName("ul");
	var nav = ul[0].parentNode;

	var header = document.createElement('h3');
	header.innerHTML = 'ConquerStats <span style=\'font-size:7pt;\' ><a href="http://www.conquerclub.com/forum/viewtopic.php?t=63517"> ' + scriptVersion + '</a></span>';
	var menu = document.createElement('ul');

	menu.innerHTML = '<li><a href="javascript:void(0);" id="displayPositionMenuLink">Position: <b>' + displayPositionNames[displayPosition] + '</b></a></li>';

	if (!isLatestVersion) {
		menu.innerHTML += '<li id="updateConquerStats"><a href="#"><span class="countdown-alert">Update Available</span></a></li>';
	} else {
		menu.innerHTML += '<li id="updateConquerStats"><a href="#">Latest Version Installed</a></li>';
	}
	
	nav.appendChild(header);
	nav.appendChild(menu);
	
	document.getElementById('displayPositionMenuLink').addEventListener("click", SwitchDisplayPosition, false);
	document.getElementById("updateConquerStats").addEventListener("click", doUpdate, false);
}



function getFullLog() {
	var thisLog = divGameHistory.innerHTML.split('<br>');
	
	//if(thisLog[0].indexOf("Game has been initialized") < 0)
	try {
		var lastSend = new Date();
		var url = gamePhpLocation + "?game=" + unsafeWindow.game.value + "&ajax=1&map_key=" + unsafeWindow.mapKey + "&log_number=" + unsafeWindow.logNumber + "&chat_number=" + unsafeWindow.chatNumber+"&lastSend="+lastSend.getTime()+"&full_log=Y";
		var req = new XMLHttpRequest();
		//Setting the URL with a synchronous GET
		req.open('GET',url,false);
		req.send(null);
	} catch (e) {
		alert(e);
	}
	if (req.status != 200) {
		alert('Error requesting full log.');
	}

	var response = req.responseText.split("&");
	setLogContent(unescape(response[16]));
	setPlayerContent(unescape(response[4]));
	return getLogContent(req.responseText);
}

function setLogContent(logTxt) {
	logContent = getLogContent(logTxt);
}

function getLogContent(logTxt) {
	var qryRemoveColorcodes = /<span id="player_prefix_\d" >\w:<\/span>/gi;
	logTxt = logTxt.replace(qryRemoveColorcodes, "");
	return logTxt;
}

function refreshGMScript() {
	var response = unsafeWindow.request.responseText.split("&");
	var logContent = getLogContent(response[15]);
	var isFullLog = (response[16] == 'Y');
	if (isFullLog == true && lastLogDate != null) {
		var lastItemIndex = logContent.indexOf(lastLogDate);
		var nextItemIndex = logContent.indexOf('<br />', lastItemIndex);
		logContent = logContent.substr(nextItemIndex);
	}
	ParseLog(logContent);
	ParseArmies();
	DrawAggresionTable();
	DrawReinforcementsTable();
	UpdateChart(logContent);
	
	originalRefreshGMScript();
}

function InsertMainDiv(divAggression) {
	switch(displayPosition) {
	case 0:
		divDashboard.parentNode.insertBefore(divAggression, divGameHistory.previousSibling.previousSibling);
		break;
	case 1:
		divDashboard.parentNode.appendChild(divAggression);
		break;
	}
}

function CreateHtml() {
	divAggression = document.createElement('div');
	divAggression.id = "Aggression";
	divAggression.innerHTML = "";

	divContent = document.createElement('div');
	divContent.id = 'AggressionContent';
	divContent.innerHTML = '';

	divAttackTable = document.createElement('div');
	divAttackTable.id = 'AttackTable';
	divAttackTable.innerHTML = '';	

	divReinforcements = document.createElement('div');
	divReinforcements.id = 'Reinforcements';
	divReinforcements.innerHTML = '';	

	divSilverApp = document.createElement('div');
	divSilverApp.id = 'SilverApp';
	divSilverApp.innerHTML = '';

	divAggression.appendChild(divContent);
	divAggression.appendChild(divAttackTable);
	divAggression.appendChild(divReinforcements);
	divAggression.appendChild(divSilverApp);
	
	InsertMainDiv(divAggression);
}

function setPlayerContent(ajaxPlayerInfoString) {
	var players = ajaxPlayerInfoString.split("|");

	for (playerNumber = 0; playerNumber < players.length - 1; playerNumber++) {
		var playerInfo = players[playerNumber].split("~");
		if (playerInfo[1] == "1") { // Eliminated
			playerIsEliminatedStartStr[playerNumber] = '<span class="eliminated">';
			playerIsEliminatedEndStr[playerNumber] = '</span>';
		}
	}
}

function ParsePlayerInfo() {
	var i, playerElements = divPlayers.getElementsByTagName('span'),
		qryTeamPlayers = /<li><b>Team (\d):<\/b><\/li>/gi, TeamPlayers;
	for (i=0;i<playerElements.length;i++) {
		if (playerElements[i].className.match(/player\d/)) {
			playerNames.push(removeHTMLTags(playerElements[i].innerHTML).substring(2));
		}
	}
	playerCount = playerNames.length;
 
	while ((TeamPlayers = qryTeamPlayers.exec(divPlayers.innerHTML)) != null) {
		if (TeamPlayers[1] > teamCount) {
			teamCount = TeamPlayers[1];
		}
	}

	var qryPlayerIsEliminated = /<span class="eliminated">.*<span class="player(\d)">/gi;
	var PlayerIsEliminated;
	while ((PlayerIsEliminated = qryPlayerIsEliminated.exec(divPlayers.innerHTML)) != null) {
		playerIsEliminatedStartStr[PlayerIsEliminated[1] - 1] = '<span class="eliminated">';
		playerIsEliminatedEndStr[PlayerIsEliminated[1] - 1] = '</span>';
	}
	playersPerTeam = playerCount / teamCount;
}

function removeHTMLTags(input){
	input = input.replace(/&(lt|gt);/g, function (strMatch, p1){
		return (p1 == "lt")? "<" : ">";
	});
	return input.replace(/<\/?[^>]+(>|$)/g, "");
}

function InitializeVars() {
	var i,j,partialAttack;
	attackTable = [];
	attackTableNeutral = [];
	playerReinforcementsRegular = [];
	playerReinforcementsBonus = [];
	playerReinforcementsSpoils = [];
	playerReinforcementsTerritoryBonus = [];
	playerArmies = new Array(playerCount);

	for (i = 0; i < playerCount; i++) {
		partialAttack = [];
		for (j = 0; j < playerCount; j++) {
			partialAttack.push(0);
		}
		attackTable.push(partialAttack);
		attackTableNeutral.push(0);
		playerReinforcementsRegular.push(0);
		playerReinforcementsBonus.push(0);
		playerReinforcementsSpoils.push(0);
		playerReinforcementsTerritoryBonus.push(0);
		playerArmies.push(0);
		if (playerIsEliminatedStartStr[i] == null) { 
			playerIsEliminatedStartStr[i] = '';
		};
		if (playerIsEliminatedEndStr[i] == null) {
			playerIsEliminatedEndStr[i] = '';
		}
		

	}
}

function ParseLog(testStr) {
	var regExQry = /<span class="player(\d)">[^<]*<\/span> assaulted [ \x21-\x3D\x3F-\x7E?]* from [ \x21-\x3D\x3F-\x7E?]* and conquered it from <span class="player([\d^0])"/gi;
	var myArray;
	while ((myArray = regExQry.exec(testStr)) != null) {
		attackTable[myArray[1] - 1][myArray[2] - 1] += 1;
	}

	var regExQry = /<span class="player(\d)">[^<]*<\/span> assaulted [ \x21-\x3D\x3F-\x7E?]* from [ \x21-\x3D\x3F-\x7E?]* and conquered it from <span class="player0"/gi;
	var myArray;
	while ((myArray = regExQry.exec(testStr)) != null) {
		attackTableNeutral[myArray[1] - 1] += 1;
	}

	var qryRegularReinforcements = /<span class="player(\d)">[^<]*<\/span> received (\d+) troops for \d+ regions/gi;
	var reinforcements;
	while ((reinforcements = qryRegularReinforcements.exec(testStr)) != null) {
		playerReinforcementsRegular[reinforcements[1] - 1] += parseInt(reinforcements[2]);
	}
	
	var qryBonusReinforcements = /<span class="player(\d)">[^<]*<\/span> received (\d+) troops for holding /gi;
	var bonusReinforcements;
	while ((bonusReinforcements = qryBonusReinforcements.exec(testStr)) != null) {
		playerReinforcementsBonus[bonusReinforcements[1] - 1] += parseInt(bonusReinforcements[2]);
	}

	var qryCardSetReinforcements = /<span class="player(\d)">[^<]*<\/span> cashed in a group of <span class="card.">[ \x21-\x3D\x3F-\x7E?]*<\/span>, <span class="card.">[ \x21-\x3D\x3F-\x7E?]*<\/span>, and <span class="card.">[ \x21-\x3D\x3F-\x7E?]*<\/span> worth (\d+) troops/gi;
	var cardSetReinforcements;
	while ((cardSetReinforcements = qryCardSetReinforcements.exec(testStr)) != null) {
		playerReinforcementsSpoils[cardSetReinforcements[1] - 1] += parseInt(cardSetReinforcements[2]);
	}

	var qryCardBonusReinforcements = /<span class="player(\d)">[^<]*<\/span> got bonus of (\d+) troops added to/gi;
	var cardBonusReinforcements;
	while ((cardBonusReinforcements = qryCardBonusReinforcements.exec(testStr)) != null) {
		playerReinforcementsTerritoryBonus[cardBonusReinforcements[1] - 1] += parseInt(cardBonusReinforcements[2]);
	}
	
	var qryLastDate = /<br \/>(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) /gi;
	var lastDateItem;
	while ((lastDateItem = qryLastDate.exec(testStr)) != null) {
		lastLogDate = lastDateItem[1];
	}
}

function ParseGameInfo() {
	var qryBonusCards = /<dt>Spoils<\/dt>\s*<dd>([\s\w]*)<\/dd>/gi,
		bonusCardsType = qryBonusCards.exec(divDashboard.innerHTML);
	if (bonusCardsType[1] != "No Spoils") {
		gameHasBonusCards = 1;
	} else {
		gameHasBonusCards = 0;
	}
	var armyList = getArmies();

	mapTerritoryCount = armyList.length;
	startingArmies = Math.floor(mapTerritoryCount / playerCount) * 3;
	neutralArmiesStart = (mapTerritoryCount % playerCount) * 3;
}

function getScriptConfig() {
	var scriptTag = document.getElementById('middleColumn').getElementsByTagName("script")[0];
	return scriptTag.innerHTML;
}
function getMap() {
	var json = /map = (.+);/.exec(getScriptConfig())[1];
	return JSON.parse(json);
}
function getArmies() {
	var toParse = document.getElementById('armies').innerHTML;
	if (toParse.length == 0) {
		toParse = /armies = (.+);/.exec(getScriptConfig())[1];
	}
	return JSON.parse(toParse);
}

function ParseArmies() {
	var i, armyList, armyItem, armyItemElements;
	for (i = 0; i < playerCount; i++) {
		playerArmies[i] = 0;
	}
	armyList = getArmies();
	for (i = 0; i < armyList.length; i++) {
		armyItem = armyList[i];
		playerArmies[armyItem.player - 1] += armyItem.quantity;
	}
}



// Draw aggresion table
function DrawAggresionTable() {
	var divAttackTableStr, i, j, playerNumber, textVal, sumAttacks;
	divAttackTableStr = "<h3>ConquerStats</h3><h4>Aggression</h4>This table shows the total number of successful assaults between players.<br/><table style=\"border: 1px solid rgb(255, 255, 255); background: rgb(238, 238, 238); width: 100%\" rules=\"rows\">";
	divAttackTableStr += "<tr>";
	divAttackTableStr += "<td></td>";
	for (i = 0; i < playerCount; i++) {
		playerNumber = i + 1;
		divAttackTableStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerNames[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
	}
	if (neutralArmiesStart > 0) {
		divAttackTableStr += "<td><span class=\"player0\">Neutral player</span></td>";
	}
	divAttackTableStr += "<td>Total assaults</td>";
	divAttackTableStr += "</tr>";


	for (i = 0; i < playerCount; i++) {
		playerNumber = i + 1;
		sumAttacks = 0;
		divAttackTableStr += "<tr>";
		divAttackTableStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerNames[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		
		for (j = 0; j < playerCount; j++) {
			textVal = "0";
			if (j == i) {
				textVal = "-";
			} else {
				textVal = "<b>" + attackTable[i][j] + "</b>";
				sumAttacks += attackTable[i][j];
			}
			divAttackTableStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + textVal + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		}

		if (neutralArmiesStart > 0) {
			divAttackTableStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + attackTableNeutral[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		}
		divAttackTableStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + sumAttacks + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divAttackTableStr += "</tr>";
	}

	divAttackTableStr += "</table>";
	divAttackTable.innerHTML = divAttackTableStr;
}

// Draw Reinforcements table
function DrawReinforcementsTable() {
	var divReinforcementsStr = "<h4>Reinforcements</h4><table style=\"border: 1px solid rgb(255, 255, 255); background: rgb(238, 238, 238); width: 100%\" rules=\"rows\">";

	divReinforcementsStr += "<thead><tr><td>Player Name</td><td title=\"The troops you get from number of territories held.\">Reinforcements</td><td title=\"The troops you get from Continents held.\">Bonus</td><td title=\"Auto deployed bonuses for holding specific territories.\">Territory Bonus</td>";
	if (gameHasBonusCards == 1) {
		divReinforcementsStr += "<td title=\"The troops you get for cashing in a group of cards.\">Spoils</td>";
	}
	divReinforcementsStr += "<td>Total Reinforcements</td><td>Troops Still Alive</td><td>Win-Loss Efficiency</td></tr></thead>";

	var teamReinforcementsRegular = 0, teamReinforcementsBonus = 0, teamReinforcementsSpoils = 0, teamReinforcementsTerritoryBonus = 0, teamTotalReinforcements = 0, teamArmies = 0;
	for (var i = 0; i < playerCount; i++) {
		var playerNumber = i + 1;
		var totalReinforcements = parseInt(playerReinforcementsRegular[i]) + parseInt(playerReinforcementsBonus[i]) + parseInt(playerReinforcementsSpoils[i]) + parseInt(playerReinforcementsTerritoryBonus[i]);
		var winLossRatio = Math.round((parseInt(playerArmies[i]) * 1000) / (totalReinforcements + startingArmies)) / 10;
		divReinforcementsStr += "<tr><td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerNames[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerReinforcementsRegular[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerReinforcementsBonus[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerReinforcementsTerritoryBonus[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		
		if (gameHasBonusCards == 1) {
			divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerReinforcementsSpoils[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		}

		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + totalReinforcements + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerArmies[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + winLossRatio + "%</span>" + playerIsEliminatedEndStr[i] + "</td>";
		
		divReinforcementsStr += "</tr>";

		if (teamCount > 0) {
			teamReinforcementsRegular += playerReinforcementsRegular[i];
			teamReinforcementsBonus += playerReinforcementsBonus[i];
			teamReinforcementsSpoils += playerReinforcementsSpoils[i];
			teamReinforcementsTerritoryBonus += playerReinforcementsTerritoryBonus[i];
			teamTotalReinforcements += totalReinforcements;
			teamArmies += playerArmies[i];

			if ((i + 1) % playersPerTeam == 0) {
				var teamNumber = (i + 1) / playersPerTeam;
				var TeamWinLossRatio = Math.round((parseInt(teamArmies) * 1000) / (teamTotalReinforcements + startingArmies * playersPerTeam)) / 10;
				divReinforcementsStr += "<tr>";
				divReinforcementsStr += "<td><b>Team " + teamNumber + "</b></td>";
				divReinforcementsStr += "<td>" + teamReinforcementsRegular + "</td>";
				divReinforcementsStr += "<td>" + teamReinforcementsBonus + "</td>";
				divReinforcementsStr += "<td>" + teamReinforcementsTerritoryBonus + "</td>";

				if (gameHasBonusCards == 1)
				{
					divReinforcementsStr += "<td>" + teamReinforcementsSpoils + "</td>";					
				}
				
				divReinforcementsStr += "<td>" + teamTotalReinforcements + "</td>";
				divReinforcementsStr += "<td>" + teamArmies + "</td>";
				divReinforcementsStr += "<td>" + TeamWinLossRatio + "%</td>";
				divReinforcementsStr += "</tr>";

				teamReinforcementsRegular = 0;
				teamReinforcementsBonus = 0;
				teamReinforcementsSpoils = 0;
				teamReinforcementsTerritoryBonus = 0;
				teamTotalReinforcements = 0;
				teamArmies = 0;
			}
		}
	}

	divReinforcementsStr += "</table>";
	divReinforcements.innerHTML = divReinforcementsStr;
}

function DrawChart() {
	var divConquerData = document.createElement('div');
	divConquerData.setAttribute('id', 'ConquerStatsData');
	divConquerData.setAttribute('style', 'display: none;');
	divConquerData.innerHTML = fullLogStr;
	document.body.appendChild(divConquerData);
	cc_log(fullLogStr);
	var initParams = 'page=default,clientVersion='+scriptVersion;

	divSilverApp.innerHTML = ''
	+'	<div id=\'errorLocation\' style="font-size: small;color: Gray;"></div>\r\n'
	+'    <div id="silverlightControlHost">\r\n'
	+'		<object data="data:application/x-silverlight," type="application/x-silverlight-2" id="silverChart" width="1024" height="350">\r\n'
	+'			<param name="source" value="http://www.cspare.nl/ConquerStats/App/1.5.3/ConquerStats.xap"/>\r\n'
	+'			<param name="minRuntimeVersion" value="2.0.31005.0" />\r\n'
	+'			<param name="autoUpgrade" value="true" />\r\n'
	+'			<param name="enableHtmlAccess" value="true" />\r\n'
	+'			<param name="initParams" value="'+initParams+'" />\r\n'
	+'			<param name="background" value="white" />\r\n'
	+'			\r\n'
	+'			<a href="http://go.microsoft.com/fwlink/?LinkID=124807" style="text-decoration: none;">\r\n'
	+'     			<img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style: none"/>\r\n'
	+'			</a>\r\n'
	+'		</object>\r\n'
	+'		<iframe style=\'visibility:hidden;height:0;width:0;border:0px\'></iframe>\r\n'
	+'    </div>\r\n';
}

function UpdateChart(addedLog) {
	var chart = document.getElementById('silverChart');
	chart.wrappedJSObject.Content.ChartInfo.UpdateChart(addedLog);
}

function Init() {
	if (location.pathname.indexOf("game.php")==-1) {
		checkForUpdateVersion();
		return; // Do not process any further.
	}
	setLogContent(divGameHistory.innerHTML);

	originalRefreshGMScript = unsafeWindow.refreshGMScript; 
	unsafeWindow.refreshGMScript = refreshGMScript;

	fullLogStr = getFullLog();
	CreateHtml();
	ParsePlayerInfo();
	InitializeVars();
	ParseLog(logContent);
	ParseGameInfo();
	ParseArmies();
	DrawAggresionTable();
	DrawReinforcementsTable();
	//DrawChart();
	
	checkForUpdateVersion();
}

var displayPositionNames = ['Above log', 'Below chat'];
var displayPosition = GM_getValue('csDisplayPosition');
if (displayPosition == null || !(displayPosition > 0 && displayPosition < displayPositionNames.length)) {
	displayPosition = 0;
	GM_setValue('csDisplayPosition', displayPosition);
}

// CC Elements
var divGameHistory = document.getElementById('log'); // HTML div element containing the game history.
var divDashboard = document.getElementById('dashboard');
var divPlayers = document.getElementById('players');
var divArmies = document.getElementById('armies');

// Custom Elements
var divAggression;
var divContent;
var divAttackTable;
var divReinforcements;
var divSilverApp;

// Vars
var logContent = "";
var playerCount = 0;
var attackTable = [];
var attackTableNeutral = [];
var playerNames = [];
var playerIsEliminatedStartStr = [];
var playerIsEliminatedEndStr = [];
var playerReinforcementsRegular = [];
var playerReinforcementsBonus = [];
var playerReinforcementsSpoils = [];
var playerReinforcementsTerritoryBonus = [];
var playerArmies = [];
var teamCount = 0;
var playersPerTeam = 0;
var mapTerritoryCount = 0;
var startingArmies = 0;
var neutralArmiesStart = 0;
var gameHasBonusCards = 0;
var fullLogStr;
var lastLogDate;
var originalRefreshGMScript;
var gamePhpLocation = "http://www.conquerclub.com/game.php";

Init();
