// ==UserScript==
// @name           Conquer Club - Fog Analyzer
// @namespace      http:/klupar.com
// @description    Keeps track of the # of enemy teritories
// @include        http://*conquerclub.com/*
// ==/UserScript==

var versionString = "1.1.0";


//		version history
//			1.1.0
// ~ Added player names
// ~ Only appears for Fog of War games
// ~ compressed code
// ~ no longer displays deadbeats
// ~ smart logger(includes players as they appear)
//			1.0.0
// ~ calclats number of territories


// Things to do
// create table
// mass produce

var Foggy = document.getElementById('dashboard').innerHTML;
if( Foggy.search('Fog of War: <b>Yes</b>') != -1){// game type is Fog of War

var logDiv = document.getElementById('log');
var log = logDiv.innerHTML.split('<br>');

for( i = 0; i < 4 ; i++){// 4 lines should be enough...
	if (log[i].indexOf("territories") != -1){
		var StartTer = new Number((log[i].substring((log[i].indexOf("territories") - 3),(log[i].indexOf("territories") - 1))));
	}
}

var playerName = new Array();
playerName[0] = "Player0";
playerName[1] = "Player1";
playerName[2] = "Player2";
playerName[3] = "Player3";
playerName[4] = "Player4";
playerName[5] = "Player5";
playerName[6] = "Player6";
playerName[7] = "Player7";
playerName[8] = "Player8";

var ternum = new Array();
ternum[0] = 0;
ternum[1] = StartTer;
ternum[2] = StartTer;
ternum[3] = StartTer;
ternum[4] = StartTer;
ternum[5] = StartTer;
ternum[6] = StartTer;
ternum[7] = StartTer;
ternum[8] = StartTer;


// start processing the log
for( i = 0; i < log.length; i++ ){
		
	for(x in ternum){
		// player is playing
		if (log[i].search('<span class="player'+x+'">') != -1){
					playerName[x] = log[i].substring(log[i].search('<span class="player'+x+'">')+22 , log[i].search('</span>') );
		}
		
		//player x is a deadbeat
		if (log[i].search('- <span class="player'+x+'">') != -1  && log[i].search(' kicked ') != -1){
			ternum[x]=0;
		}
		
		//player x has attacked
		if (log[i].search('- <span class="player'+x+'">') != -1  && log[i].search(' attacked ') != -1){
			ternum[x] += 1;
		}
		
		//player x has lost a territory
		if (log[i].search('from <span class="player'+x+'">') != -1){
			ternum[x] -= 1;
		}
	}	
}

var FogDiv;
FogDiv = document.createElement('div');
FogDiv.id="Fog_Analyzer";
FogDiv.innerHTML = '<div> <h3>Fog Analyzer</h3>';
	// if zero armies then no longer playing
	// may produce false readigs untill all players has moved at least once
	
	for (x in ternum){
		if (ternum[x] > 0 && playerName[x] != ("Player"+x) ){FogDiv.innerHTML +=' <span class="player'+x+'">'+playerName[x]+':'+ternum[x]+'</span><br>';}

	}

FogDiv.innerHTML +=	'</div><br>';
document.getElementById('chat').parentNode.insertBefore(FogDiv, document.getElementById('log').previousSibling.previousSibling);

}