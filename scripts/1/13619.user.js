// Weewar Spy
// version 0.3
// updated 1-1-08
// Copyright (c) 2008, Pluto

// ==UserScript==
// @name Weewar Spy
// @description lets you see the games a player is currently playing when you view their  profile
// @namespace userscripts.org
// @include http://*weewar.com/user/*
// ==/UserScript==

//an array of map names to assocaite the actual file name with the more pleasant real name
var mapNames = {
"botanic2" : "Botanic Troubles",
"1o12" : "One on one",
"thebog" : "The Bog",
"taichi" : "Tai Chi",
"rivermaze1187102620410" : "River Maze",
"battleatsimadoro1187103044564" : "Battle at Sima d'Oro",
"throughelpantanopequeo1187103243162" : "El Pantano Pequeno",
"threeways2" : "Three ways",
"continental2" : "Continental",
"citysprawl2" : "City sprawl",
"islanders2" : "Islanders",
"zweistromland2" : "Zweistromland",
"thermopylae2" : "Thermopylae",
"jungbrunnen" : "Jungbrunnen",
"spiral" : "Spiral",
"narrowpath" : "Narrow Path",
"northamerica1185813424052" : "North America",
"southamerica1187103546264" : "South America",
"badlands" : "Badlands",
"plain6" : "Plainly Six",
"workdaycarnage" : "Workday carnage",
"tragictriangle1187105175786" : "tragic triangle",
"tragictriangle2" : "Old Tragic Triangle",
"aruba2" : "Aruba",
"rockyride" : "Rocky Ride",
"fortress" : "Fortress",
"deadmeadows2" : "Dead Meadows",
"lakes1187102532212" : "Lakes",
"cruel2" : "Cruel Intentions"
};

//Alert the user if the GM_xmlhttpRequest function is not available
if (!GM_xmlhttpRequest) 
{
	alert('Please upgrade to the latest version of Greasemonkey.');
	return;
}

var gameNums = new Array();  // a global storing a list of hte game numbers

//parse the player name from the window URL
var userURL = window.location.href;
var user = userURL.substr(userURL.lastIndexOf('/')+1);

var gameLinks = new Array();
//call up the API to get the player data 
GM_xmlhttpRequest(
{
	method: 'GET',
	url: 'http://weewar.com/api1/user/' + user,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/atom+xml,application/xml,text/xml',},
	onload: function(responseDetails)
	{
		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
		var theirGames = dom.getElementsByTagName('game');  //grab the game element that lists all the game numbers
		//GM_log(responseDetails.responseText);
		//loop through the game element to fill up the gameNums array
		for (var i = 0; i < theirGames.length; i++)
		{
			gameNums[i] = theirGames[i].textContent;
			
			gameLinks[i] = 'http://weewar.com/game/' + gameNums[i]; 
		}
	}
});

//first need to find the index of the <li> element that lists the "Favorite Units" because this changes depending on if you are looking at
//a profile of a prefered player or not
var favoriteIndex;
for (var element = 0; element < document.getElementsByTagName('li').length; element++) {
	if(document.getElementsByTagName('li')[element].innerHTML.substr(0,8) == 'Favorite') {
		favoriteIndex = element;				
	}
}

//this will insert the "Current Games" header right after the "Favorite Units"
var statsPannel1 = document.getElementsByTagName('li')[favoriteIndex];  
if (statsPannel1)
{
	var currentGameList = document.createElement('li');
	statsPannel1.parentNode.insertBefore(currentGameList, statsPannel1.nextSibling);
	currentGameList.innerHTML = 'Current Games: ' + '<a href="#">(Open in Tabs)</a>';  //this will insert the game list right after the "Favorite Units"
	currentGameList.id = 'currentGameList';
}
currentGameList.addEventListener("click", function() {
  for (var i = 0; i < gameLinks.length; i++)
		{
			GM_openInTab(gameLinks[i]);
		}
  }, false);

//use the setTimeout to wait for the above GM_xmlhttpRequest to finish, otherwise the program will carry on and not have the necessary gameNums data
window.setTimeout(function()
{
			GM_log(gameLinks);
	//now, for each game number, go call up the api/game to get the game and map names and then insert them into the page
	for (var i = 0; i < gameNums.length; i++)
	{
		getMapName(gameNums[i]);
	}
	
}, 2000); //wait 2 sec for the first GM_xmlhttpRequest to finish

//this function takes a game number as an input and then will call the api/game to get the game and map names, then put all that together and put it on the page
function getMapName(gameNum)
{
	//GM_log('balls');
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://weewar.com/api1/game/' + gameNum,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',},
		onload: function(responseDetails)
		{
			//GM_log('loading game number: ' + gameNum);
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
			var mapName;
			if(dom.getElementsByTagName('map')[0])
			{
				mapName = dom.getElementsByTagName('map')[0].textContent;
			}
			else
			{
				mapName = ' <a href="http://weewar.com/api1/game/' + gameNum + '">Please report API error</a>';
			} //pull out the map name
			
			//if the mapname is in the array, then rename it to it's more recognizable name.  otherwise just leave it as the file name
			if (mapNames[mapName])
			{
				mapName = ' on ' + mapNames[mapName];
			}
			
			var gameName;
			if(dom.getElementsByTagName('name')[0])
			{
				gameName = dom.getElementsByTagName('name')[0].textContent; //pull out the game name
			}
			else
			{
				gameName = gameNum;
			}
			
			//assemble the link to the game with gamename and mapname on the link
			var gameLink = '<a href="http://weewar.com/game/' + gameNum + '">"' + gameName + '"</a>'+ mapName ;
			//now add this link right after the "Curent Games:" line in the stats pannel
			var statsPannel = document.getElementsByTagName('li')[favoriteIndex+1];  
			if (statsPannel)
			{
				var newElement = document.createElement('li');
				statsPannel.parentNode.insertBefore(newElement, statsPannel.nextSibling);
				document.getElementsByTagName('li')[favoriteIndex+2].innerHTML = gameLink;
			}
		}
	});
}