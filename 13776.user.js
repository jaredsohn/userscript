// Weewar Banker
// version 2.0
// updated 1-1-08
// Copyright (c) 2008, Pluto

// ==UserScript==
// @namespace     plutosforge.com
// @name          Weewar Banker
// @include http://*weewar.com/game*
// ==/UserScript==


//create an array to associate the player number with base color
var colorIndex = {
0 : "blue",
1 : "red",
2 : "purple",
3 : "yellow",
4 : "green",
5 : "white"};

var unitCosts = {
"Light Infantry" : 75,
"Heavy Infantry" : 150,
"Raider" : 200,
"Tank" : 300,
"Heavy Tank" : 600,
"Berserker" : 900,
"Light Artillery" : 400,
"Heavy Artillery" : 600,
"D.F.A." : 1200,
"Assault Artillery" : 450,
"Hovercraft" : 300,
"Anti-Aircraft" : 400,
"Helicopter" : 600,
"Jet" : 800,
"Bomber" : 1200,
"Speedboat" : 200,
"Destroyer" : 1100,
"Sub" : 1200,
"Battleship" : 2000
}

var terrains = {
"blue_city.png" : 0,
"red_city.png" : 0,
"purple_city.png" : 0,
"yellow_city.png" : 0,
"green_city.png" : 0,
"white_city.png" : 0,};

var colorIndex2 = {
0 : "blue_city.png",
1 : "red_city.png",
2 : "purple_city.png",
3 : "yellow_city.png",
4 : "green_city.png",
5 : "white_city.png"};

var gameId = document.getElementById('menuForm').getAttribute('action');
gameId = gameId.substr(gameId.lastIndexOf('/')+1);
var initialCredits;
var perBaseIncome;

var playerColors = new Array();
var playerTotalCredits = new Array();
var playerRounds = new Array();
var playerBuilds = new Array();
var playerBaseCount = new Array();

var totalRounds = parseInt(getElementsByClassName(document, 'span', 'round')[0].textContent.substr(getElementsByClassName(document, 'span', 'round')[0].textContent.indexOf(' ')+1));
var gameRounds = new Array();

var historyLinks = document.getElementById('historyLinks');
historyLinks.innerHTML += '<a href="#" onClick="showBankerLoading();return false;" id="banker"><img src="http://www.plutosforge.com/images/money_dollar.png" width="16" height="16" /></a>';

addGlobalStyle('#history_controls a {margin-left:0em;}');

getMapInfo();
				
unsafeWindow.showBankerLoading = showBankerLoading;				
function showBankerLoading()
{
	document.getElementById('historyLinks').style.display='none;';
	document.getElementById('loadingHistory').style.display='';
	document.getElementById('loadingHistory').getElementsByTagName('a')[0].style.display='none;';
	startBanker();
}

function getMapInfo()
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://weewar.com/api1/game/' + gameId,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',},
		onload: function(responseDetails)
		{
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
			
			initialCredits = parseInt(dom.getElementsByTagName('initialCredits')[0].textContent) ;
			perBaseIncome = parseInt(dom.getElementsByTagName('creditsPerBase')[0].textContent);	
						
			getCurrentIncome();		
		}
	});
}

function getCurrentIncome()
{	
	for (var x = 0; x < unsafeWindow.bWidth; x++)
	{
		for (var y = 0; y < unsafeWindow.bHeight; y++)
		{
			var terrain = unsafeWindow.weewarMap.getTerrain(x,y);
			
			if(terrain && (terrain.substr(terrain.lastIndexOf('_')+1) == "city.png")) 
			{
				terrains[terrain]++;
			}
		}
	}

	var playerDivs = getElementsByClassName(getElementsByClassName(document, 'ul', 'playerlist')[1], 'div', 'player');
	var playerDivCount = 0;
	for(var player in playerDivs)
	{	
		playerDivs[player].innerHTML += "i:$" + (terrains[colorIndex2[playerDivCount]] * perBaseIncome);
		playerDivCount++;		
	}
}

function startBanker()
{
	var url =  'http://weewar.com/ajax/click.jsp';
	var pars = 'method=initialState&game=' + gameId;
	pars+= '&tbUid=' + (new Date()).getTime();
	var infoURL = url + '?' + pars;
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: infoURL,
		headers: { 
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml'},
		onload: function(responseDetails)
		{
			if(responseDetails.responseText.search('error') > -1)
			{
				outputError();
			}	
			else
			{
				parseHistory(responseDetails);
				outputData();
			}
			
			document.getElementById('historyLinks').style.display='';
			document.getElementById('loadingHistory').style.display='none;';
			document.getElementById('loadingHistory').getElementsByTagName('a')[0].style.display='';
		}
	}); 
}

function parseHistory(originalResponse)
{
	var parser = new DOMParser();
	var responseXML = parser.parseFromString(originalResponse.responseText,"application/xml");
		
	initArrays();
	findStartingBases(responseXML.getElementsByTagName('fields')[0]);
	var eventHTML = document.createElement(eventHTML);
 	for(var i = 0; i < responseXML.getElementsByTagName('event').length; i++)
	{		
		eventHTML.innerHTML = responseXML.getElementsByTagName('event')[i].getElementsByTagName('html')[0].textContent; 
		var eventType = eventHTML.getElementsByTagName('div')[0].nextSibling.textContent;
		var eventField = responseXML.getElementsByTagName('event')[i].getElementsByTagName('field')[0];
		var player = getEventPlayer(eventHTML);
		if(eventType.search('round') > -1)
		{
			playerRounds[player]++;
		}
		if(eventType.search('captured') > -1)
		{			
			var baseKey = "x:" + eventField.getAttribute('x') + ",y:" + eventField.getAttribute('y');
			gameRounds[playerRounds[player]+2][baseKey] = player;
		}
		if(eventType.search('built') > -1)
		{
			var unit = eventType.substring(13,eventType.length-1);
			playerBuilds[player] += unitCosts[unit];
		}
	}
	playerRounds[findCurrentPlayer()]++;
}

function getEventPlayer(eHTML)
{
	var p = eHTML.getElementsByTagName('div')[0].childNodes[0].getAttribute('href');
	p = p.substr(p.lastIndexOf('/')+1);	
	return p;
}

function findStartingBases(firstEvent)
{
	for(var f = 0; f < firstEvent.getElementsByTagName('terrain').length; f++)
	{
		var x = firstEvent.getElementsByTagName('terrain')[f].parentNode.getAttribute('x');
		var y = firstEvent.getElementsByTagName('terrain')[f].parentNode.getAttribute('y');
		var baseKey = "x:" + x + ",y:" + y;
		var cityColor = firstEvent.getElementsByTagName('terrain')[f].textContent;
		cityColor = cityColor.substr(0,cityColor.indexOf('_'));
		gameRounds[1][baseKey] = playerColors[cityColor];	
	}	
}

function initArrays()
{	
	var playerList = getElementsByClassName(getElementsByClassName(document, 'ul', 'playerlist')[1], 'div', 'player');
	for(var p=0; p < playerList.length; p++)
	{
		var player = playerList[p].childNodes[0].getAttribute('href');
		player = player.substr(player.lastIndexOf('/')+1);
		if(player == "") player = "Unknown Player";
		playerRounds[player] = 0;
		playerBaseCount[player] = 0;
		playerBuilds[player] = 0;
		playerTotalCredits[player] = initialCredits;
		playerColors[colorIndex[p]] = player;
	}
	for(var r = 1; r <=totalRounds+1; r++)
	{
		gameRounds[r] = new Array();
	}
}

function findCurrentPlayer()
{
	var currentClasses = ["colorIndex0 current","colorIndex1 current","colorIndex2 current","colorIndex3 current","colorIndex4 current","colorIndex5 current",];
	for( p in currentClasses)
	{		
		if(getElementsByClassName(document, 'li', currentClasses[p]) != '')
			return playerColors[colorIndex[p]];
	}
}

function outputData()
{
	for(var r=1; r<=totalRounds; r++)
	{
		for(var b in gameRounds[r])
		{
			if(r > 1 && gameRounds[r-1][b] != undefined && gameRounds[r][b] != gameRounds[r-1][b])
			{
				if(playerBaseCount[gameRounds[r-1][b]] > 0) playerBaseCount[gameRounds[r-1][b]]--;
			}
			if(r <= playerRounds[gameRounds[r][b]]) playerBaseCount[gameRounds[r][b]]++;
			if(r < totalRounds && !gameRounds[r+1][b]) gameRounds[r+1][b] = gameRounds[r][b];
		}
		for(var p in playerBaseCount)
		{
			playerTotalCredits[p] += playerBaseCount[p] * perBaseIncome;
			playerBaseCount[p] = 0;
		}
	} 
	var playerDivs = getElementsByClassName(getElementsByClassName(document, 'ul', 'playerlist')[1], 'div', 'player');
	var playerDivCount = 0;
	for(var pp in playerTotalCredits)
	{
		playerDivs[playerDivCount].innerHTML += ", b:$" + (playerTotalCredits[pp] - playerBuilds[pp]);
		playerDivCount++;		
	}
}

function outputError()
{
	var playerDivs = getElementsByClassName(getElementsByClassName(document, 'ul', 'playerlist')[1], 'div', 'player');
	var playerDivCount = 0;
	for(var pp = 0; pp < playerDivs.length; pp++)
	{
		playerDivs[playerDivCount].innerHTML += "bad history file";
		playerDivCount++;		
	}
}

function getElementsByClassName(oElm, strTagName, strClassName)
{
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}

function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
