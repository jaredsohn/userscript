// ==UserScript==
// @name           ConquerStats
// @namespace      cspare.ConquerStats
// @description    Shows several statistics for Conquerclub games.
// @include        http://*conquerclub.com*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// ==/UserScript==


var scriptVersion = "1.6.0";
// grant GM_getValue  GM_setValue  GM_xmlhttpRequest
var displayPositionNames = new Array( 'Above log', 'Below chat');
var displayPosition = GM_getValue('csDisplayPosition');
if (displayPosition == null || !(displayPosition > 0 && displayPosition < displayPositionNames.length))
{
	displayPosition = 0;
	GM_setValue('csDisplayPosition', displayPosition);
}

if (location.pathname.indexOf("game.php")==-1)
{
	CheckForUpdates();
	return; // Do not process any further.
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
var attackTable = new Array();
var attackTableNeutral = new Array();
var playerNames = new Array();
var playerIsEliminatedStartStr = new Array();
var playerIsEliminatedEndStr = new Array();
var playerReinforcementsRegular = new Array();
var playerReinforcementsBonus = new Array();
var playerReinforcementsSpoils = new Array();
var playerReinforcementsTerritoryBonus = new Array();
var playerArmies = new Array();
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
var playerArmiesJson = null;

setLogContent(divGameHistory.innerHTML);

function CheckForUpdates()
{

	if (GM_getValue['csLatestVersion'] != null)
	{
		var bIsLatestVersion = GM_getValue['csLatestVersion'] == scriptVersion;
		showMenu(bIsLatestVersion);
	}
	else
	{
	  GM_xmlhttpRequest({
	    method: "GET",
	     url: 'http://www.cspare.nl/ConquerStats/latestVersion.txt?nocache=' + Math.random(),
	     onload: function(response)
		 {
			GM_setValue('csLatestVersion', response.responseText);
			var bIsLatestVersion = GM_getValue['csLatestVersion'] == scriptVersion;
			showMenu(bIsLatestVersion);
		 }
	  });
  }
}


function SwitchDisplayPosition()
{
	displayPosition++;
	if (displayPosition >= displayPositionNames.length)
	{
		displayPosition = 0;
	}
	GM_setValue('csDisplayPosition',displayPosition);
	
	document.getElementById('displayPositionMenuLink').innerHTML = 'Position: <b>' + displayPositionNames[displayPosition] + '</b>';

	// Move HTML elements to new position:
	var divAggression = document.getElementById('Aggression');
	InsertMainDiv(divAggression);
	
}

function showMenu(isLatestVersion)
{
	var divLeftColumn = document.getElementById('leftColumn');
	var ul = divLeftColumn.getElementsByTagName("ul");
	var nav = ul[0].parentNode;

	var header = document.createElement('h3');
	header.innerHTML = 'ConquerStats <span style=\'font-size:7pt;\' ><a href="http://www.conquerclub.com/forum/viewtopic.php?t=63517"> ' + scriptVersion + '</a></span>';
	var menu = document.createElement('ul');

	menu.innerHTML = '<li><a href="javascript:void(0);" id="displayPositionMenuLink">Position: <b>' + displayPositionNames[displayPosition] + '</b></a></li>';

	if (!isLatestVersion)
	{
		menu.innerHTML += '<li><a href="http://userscripts.org/scripts/source/34187.user.js"><span class="countdown-alert">Update Available</span></a></li>';
	} else 
	{
		menu.innerHTML += '<li><a href="http://userscripts.org/scripts/source/34187.user.js">Latest Version Installed</a></li>';
	}
	
	
	nav.appendChild(header);
	nav.appendChild(menu);
	
	document.getElementById('displayPositionMenuLink').addEventListener("click", SwitchDisplayPosition, false);	
}



function getFullLog()
{
	var thisLog = divGameHistory.innerHTML.split('<br>');
	
	//if(thisLog[0].indexOf("Game has been initialized") < 0)
	{
		try
		{
			var lastSend = new Date();
			var url = gamePhpLocation + "?game=" + unsafeWindow.game.value + "&ajax=1&map_key=" + unsafeWindow.mapKey + "&log_number=" + unsafeWindow.logNumber + "&chat_number=" + unsafeWindow.chatNumber+"&lastSend="+lastSend.getTime()+"&full_log=Y";
			var req = new XMLHttpRequest();
			//Setting the URL with a synchronous GET
			req.open('GET',url,false);
			req.send(null);
		}
		catch (e)
		{
			alert(e);
		}
		if (req.status != 200)
		{
			alert('Error requesting full log.');
		}

		var response = req.responseText.split("&");
		
		setLogContent(unescape(response[16]));
		setPlayerContent(unescape(response[4]));
		
		playerArmiesJson = eval(unescape(response[5]));
		
		return getLogContent(req.responseText);
	}

}

function setLogContent(logTxt)
{
	logContent = getLogContent(logTxt);
}
function getLogContent(logTxt)
{
	var qryRemoveColorcodes = /<span id="player_prefix_\d" >\w:<\/span>/gi;
	logTxt = logTxt.replace(qryRemoveColorcodes, "");
	return logTxt;
}

function refreshGMScript()
{
	var response = unsafeWindow.request.responseText.split("&");
	var logContent = getLogContent(response[16]);
	var isFullLog = (response[17] == 'Y');
	if (isFullLog == true && lastLogDate != null)
	{
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

function InsertMainDiv(divAggression)
{
	switch(displayPosition)
	{
		case 0:
			divDashboard.parentNode.insertBefore(divAggression, divGameHistory.previousSibling.previousSibling);
			break;
			
		case 1:
			divDashboard.parentNode.appendChild(divAggression);
			break;

	}
	
}

function CreateHtml()
{
	divAggression = document.createElement('div');
	divAggression.id = "Aggression";
	divAggression.innerHTML = ""

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

function setPlayerContent(ajaxPlayerInfoString)
{
	var players = ajaxPlayerInfoString.split("|");

	for (playerNumber = 0; playerNumber < players.length - 1; playerNumber++)
	{
		var playerInfo = players[playerNumber].split("~");
		if (playerInfo[1] == "1")
		{ // Eliminated
			playerIsEliminatedStartStr[playerNumber] = '<span class="eliminated">';
			playerIsEliminatedEndStr[playerNumber] = '</span>';
		}
	}

	
	
}

function ParsePlayerInfo()
{
	var qryPlayers = /<span( style="display: *none;?")? id="player_prefix_(\d)">\w:<\/span>([^<]*)<\/span>/gi;
	var playerItems;
	while ((playerItems = qryPlayers.exec(divPlayers.innerHTML)) != null)
	{
		if (playerItems[2] > playerCount) playerCount = playerItems[2];
		playerNames[playerItems[2] - 1] = playerItems[3];
	}

	var qryTeamPlayers = /<li><b>Team (\d):<\/b><\/li>/gi;
	var TeamPlayers;
	while ((TeamPlayers = qryTeamPlayers.exec(divPlayers.innerHTML)) != null)
	{
		if (TeamPlayers[1] > teamCount) teamCount = TeamPlayers[1];

	}

	var qryPlayerIsEliminated = /<span class="eliminated">.*<span class="player(\d)">/gi;
	var PlayerIsEliminated;
	while ((PlayerIsEliminated = qryPlayerIsEliminated.exec(divPlayers.innerHTML)) != null)
	{
		playerIsEliminatedStartStr[PlayerIsEliminated[1] - 1] = '<span class="eliminated">';
		playerIsEliminatedEndStr[PlayerIsEliminated[1] - 1] = '</span>';
		
	}
	
	playersPerTeam = playerCount / teamCount;
	
}

function InitializeVars()
{
	attackTable = new Array(playerCount);
	attackTableNeutral = new Array(playerCount);
	playerReinforcementsRegular = new Array(playerCount);
	playerReinforcementsBonus = new Array(playerCount);
	playerReinforcementsSpoils = new Array(playerCount);
	playerReinforcementsTerritoryBonus = new Array(playerCount);
	playerArmies = new Array(playerCount);

	for (var i = 0; i < playerCount; i++)
	{
		attackTable[i] = new Array(playerCount);
		attackTableNeutral[i] = 0;
		playerReinforcementsRegular[i] = 0;
		playerReinforcementsBonus[i] = 0;
		playerReinforcementsSpoils[i] = 0;
		playerReinforcementsTerritoryBonus[i] = 0;
		playerArmies[i] = 0;
		if (playerIsEliminatedStartStr[i] == null) playerIsEliminatedStartStr[i] = '';
		if (playerIsEliminatedEndStr[i] == null) playerIsEliminatedEndStr[i] = '';
		
		for (var j = 0; j < playerCount; j++)
		{
			attackTable[i][j] = 0;
		}
	}
}

function ParseLog(testStr)
{

	var regExQry = /<span class="player(\d)">[^<]*<\/span> assaulted [ \x21-\x3D\x3F-\x7E?]* from [ \x21-\x3D\x3F-\x7E?]* and conquered it from <span class="player([\d^0])"/gi;
	var myArray;
	while ((myArray = regExQry.exec(testStr)) != null)
	{

		attackTable[myArray[1] - 1][myArray[2] - 1] += 1;
	}

	var regExQry = /<span class="player(\d)">[^<]*<\/span> assaulted [ \x21-\x3D\x3F-\x7E?]* from [ \x21-\x3D\x3F-\x7E?]* and conquered it from <span class="player0"/gi;
	var myArray;
	while ((myArray = regExQry.exec(testStr)) != null)
	{
		attackTableNeutral[myArray[1] - 1] += 1;
	}



	var qryRegularReinforcements = /<span class="player(\d)">[^<]*<\/span> received (\d+) troops for \d+ regions/gi;
	var reinforcements;
	while ((reinforcements = qryRegularReinforcements.exec(testStr)) != null)
	{
		playerReinforcementsRegular[reinforcements[1] - 1] += parseInt(reinforcements[2]);
	}
	
	var qryBonusReinforcements = /<span class="player(\d)">[^<]*<\/span> received (\d+) troops for holding /gi;
	var bonusReinforcements;
	while ((bonusReinforcements = qryBonusReinforcements.exec(testStr)) != null)
	{
		playerReinforcementsBonus[bonusReinforcements[1] - 1] += parseInt(bonusReinforcements[2]);
	}

	var qryCardSetReinforcements = /<span class="player(\d)">[^<]*<\/span> played a set of <span class="card.">[ \x21-\x3D\x3F-\x7E?]*<\/span>, <span class="card.">[ \x21-\x3D\x3F-\x7E?]*<\/span>, and <span class="card.">[ \x21-\x3D\x3F-\x7E?]*<\/span> worth (\d+) troops/gi;
	var cardSetReinforcements;
	while ((cardSetReinforcements = qryCardSetReinforcements.exec(testStr)) != null)
	{
		playerReinforcementsSpoils[cardSetReinforcements[1] - 1] += parseInt(cardSetReinforcements[2]);
	}

	var qryCardBonusReinforcements = /<span class="player(\d)">[^<]*<\/span> got bonus of (\d+) troops added to/gi;
	var cardBonusReinforcements;
	while ((cardBonusReinforcements = qryCardBonusReinforcements.exec(testStr)) != null)
	{
		playerReinforcementsTerritoryBonus[cardBonusReinforcements[1] - 1] += parseInt(cardBonusReinforcements[2]);
	}
	
	
	var qryLastDate = /<br \/>(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) /gi;
	var lastDateItem;
	while ((lastDateItem = qryLastDate.exec(testStr)) != null)
	{
		lastLogDate = lastDateItem[1];
	}
}

function ParseGameInfo()
{
	//var qryBonusCards = /Spoils: <b>([\s\w]*)<\/b>/gi;
	var qryBonusCards = /<dt>Spoils<\/dt>\s*<dd>([\s\w]*)<\/dd>/gi;
	var bonusCardsType = qryBonusCards.exec(divDashboard.innerHTML);
	if (bonusCardsType[1] != "No Spoils")
	{
		gameHasBonusCards = 1;
	} else 
	{
		gameHasBonusCards = 0;
	}

	
	//var armyList = divArmies.innerHTML.split(',');

	mapTerritoryCount = $('.army_outline').length;
	startingArmies = Math.floor(mapTerritoryCount / playerCount) * 3;
	neutralArmiesStart = (mapTerritoryCount % playerCount) * 3;
}

function ParseArmies()
{
	for (var i = 0; i < playerCount; i++)
	{
		playerArmies[i] = 0;
	}
	
	for (var i = 0; i < playerArmiesJson.length; i++)
	{
		var armyQuantity = playerArmiesJson[i].quantity;
		var player = parseInt(playerArmiesJson[i].player);
		
		playerArmies[player] += parseInt(armyQuantity);
	}

}



// Draw aggresion table
function DrawAggresionTable()
{
	var divAttackTableStr;

	divAttackTableStr = "<h3>ConquerStats</h3><h4>Aggression</h4>This table shows the total number of successful assaults between players.<br/><table style=\"border: 1px solid rgb(255, 255, 255); background: rgb(238, 238, 238); width: 100%\" rules=\"rows\">";
	divAttackTableStr += "<tr>";
	divAttackTableStr += "<td></td>";


	for (var i = 0; i < playerCount; i++)
	{
		var playerNumber = i + 1;
		divAttackTableStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerNames[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
	}
	if (neutralArmiesStart > 0)
	{
		divAttackTableStr += "<td><span class=\"player0\">Neutral player</span></td>";
	}
	divAttackTableStr += "<td>Total assaults</td>";
	divAttackTableStr += "</tr>";


	for (var i = 0; i < playerCount; i++)
	{
		var playerNumber = i + 1;
		var sumAttacks = 0;
		divAttackTableStr += "<tr>";
		divAttackTableStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerNames[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		
		for (var j = 0; j < playerCount; j++)
		{
			var textVal = "0";
			if (j == i)
			{
				textVal = "-";
			} else 
			{
				textVal = "<b>" + attackTable[i][j] + "</b>";
				sumAttacks += attackTable[i][j];
			}
			
			divAttackTableStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + textVal + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
			
		}

		if (neutralArmiesStart > 0)
		{
			divAttackTableStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + attackTableNeutral[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		}

		divAttackTableStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + sumAttacks + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		
		divAttackTableStr += "</tr>";
	}

	divAttackTableStr += "</table>";
	divAttackTable.innerHTML = divAttackTableStr;
}

// Draw Reinforcements table
function DrawReinforcementsTable()
{
	var divReinforcementsStr;

	divReinforcementsStr = "<h4>Reinforcements</h4><table style=\"border: 1px solid rgb(255, 255, 255); background: rgb(238, 238, 238); width: 100%\" rules=\"rows\">";


	divReinforcementsStr += "<thead><tr><td>Player Name</td><td title=\"The troops you get from number of territories held.\">Reinforcements</td><td title=\"The troops you get from Continents held.\">Bonus</td><td title=\"Auto deployed bonuses for holding specific territories.\">Territory Bonus</td>";
	if (gameHasBonusCards == 1)
	{
		divReinforcementsStr += "<td title=\"The troops you get for cashing in a group of cards.\">Spoils</td>";
	}
	divReinforcementsStr += "<td>Total Reinforcements</td><td>Troops Still Alive</td><td>Win-Loss Efficiency</td></tr></thead>";


	var teamReinforcementsRegular = 0, teamReinforcementsBonus = 0, teamReinforcementsSpoils = 0, teamReinforcementsTerritoryBonus = 0, teamTotalReinforcements = 0, teamArmies = 0;
	for (var i = 0; i < playerCount; i++)
	{
		var playerNumber = i + 1;
		var totalReinforcements = parseInt(playerReinforcementsRegular[i]) + parseInt(playerReinforcementsBonus[i]) + parseInt(playerReinforcementsSpoils[i]) + parseInt(playerReinforcementsTerritoryBonus[i]);
		var winLossRatio = Math.round((parseInt(playerArmies[i]) * 1000) / (totalReinforcements + startingArmies)) / 10;
		divReinforcementsStr += "<tr><td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerNames[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerReinforcementsRegular[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerReinforcementsBonus[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerReinforcementsTerritoryBonus[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		
		if (gameHasBonusCards == 1)
		{
			divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerReinforcementsSpoils[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
			
		}

		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + totalReinforcements + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + playerArmies[i] + "</span>" + playerIsEliminatedEndStr[i] + "</td>";
		divReinforcementsStr += "<td>" + playerIsEliminatedStartStr[i] + "<span class=\"player" + playerNumber + "\">" + winLossRatio + "%</span>" + playerIsEliminatedEndStr[i] + "</td>";
		
		divReinforcementsStr += "</tr>";

		if (teamCount > 0)
		{
			teamReinforcementsRegular += playerReinforcementsRegular[i];
			teamReinforcementsBonus += playerReinforcementsBonus[i];
			teamReinforcementsSpoils += playerReinforcementsSpoils[i];
			teamReinforcementsTerritoryBonus += playerReinforcementsTerritoryBonus[i];
			teamTotalReinforcements += totalReinforcements;
			teamArmies += playerArmies[i];


			if ((i + 1) % playersPerTeam == 0)
			{
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

function DrawChart()
{
	var initParams = ''
	+'page=default'
	+',clientVersion='+scriptVersion;


	var divConquerData = document.createElement('div');
	divConquerData.setAttribute('id', 'ConquerStatsData');
	divConquerData.setAttribute('style', 'display: none;');
	divConquerData.innerHTML = fullLogStr.substring(1, fullLogStr.length);
	document.body.appendChild(divConquerData);


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

function UpdateChart(addedLog)
{
	var chart = document.getElementById('silverChart');
	
	chart.wrappedJSObject.Content.ChartInfo.UpdateChart(addedLog);
}

function Init()
{
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
	DrawChart();
	
	CheckForUpdates();
}

Init();
