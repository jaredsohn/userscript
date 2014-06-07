// ==UserScript==
// @name           Player of the Game: Season Ranks
// @namespace      http://www.courtrivals.com/
// @include        http://*courtrivals.com/forums/edit.php?id=*
// ==/UserScript==

// There are many changes that should be made to this in order to clean things up,
// but it's late at night and I'm tired, and probably won't mess with this again.
// It also won't help anyone except me, so I don't care about documentation.
// Oh, and you can make fun of the script, especially the getSeason() function.

function Player(name) {
	this.name = name;
	this.ratings = [0,0,0,0];
	
	this.addPoints = function(rank) {
		this.ratings[rank] = this.ratings[rank] + 1;
	}
	
	this.getScore = function() {
		var score = 0;
		for(x=0;x<this.ratings.length;x++) {
			if(x<2) {
				score += (3 * this.ratings[x]);
			} else if(x == 2) {
				score += (2 * this.ratings[x]);
			} else {
				score += (1 * this.ratings[x]);
			}
		}
		
		return score;
	}
	
	this.playerLine = function() {
		var line = this.name + " - " + this.getScore() + " points";
		line += " (" + (this.ratings[0] + this.ratings[1]) + "-" + this.ratings[2] + "-" + this.ratings[3] + ")";
		
		return line;
	}
}

function playerParse(player, rank) {
	var name = player.split(":")[0];
	
	if(PlayerArray[name] == null) {
		PlayerArray[name] = new Player(name);
	}
	
	PlayerArray[name].addPoints(rank);
}

function getGameInfo(info) {

	if(info[0] != null && info[0].indexOf(" Rankings (") < 0) {
		var gameArray = new Array();
		gameArray[0] = info[1].split("; ")[0].replace(/Player of the Game: /g, "").replace(/Players of the Game: /g, "");
		gameArray[1] = info[1].split("; ")[1];
		gameArray[2] = info[2].split("; ")[0].replace(/Honorable Mention: /g, "");
		gameArray[3] = info[2].split("; ")[1];
		
		if(lastUpdated == null) {
			lastUpdated = info[0].split(":")[0].replace("[b]","");
		}
		
		for(x=0;x<gameArray.length;x++) {
			if(typeof gameArray[x] != "undefined") {
				playerParse(gameArray[x], x);
			}
		}
	}
}

function rankSort(a, b) {
	return b.getScore() - a.getScore();
}

function getSeason() {
//This is stupid and should probably be changed sometime.
//This actually got dumber, too, once I changed the code.  Yikes.
	var regex = '(Season )([0-9]*)( Players of the Game)';
	
	var re = new RegExp(regex);
	var m = re.exec(document.body.innerHTML);

	var season = m[2];
	
	return season;
}

function getPlayerRankings(season) {
	var html = document.getElementsByName('req_message')[0].value;

	html = html.replace(/\n\n\n/g, "[n]");
	html = html.replace(/\n\n/g, "--NEXT--");
	
	var games = html.split("--NEXT--");

	for(game in games) {
		getGameInfo(games[game].split("\n"));
	}

	var numArray = new Array();
	var ind = 0;
	for(key in PlayerArray) {
		numArray[ind] = PlayerArray[key];
		ind++;
	}

	numArray.sort(rankSort);

	ranks = "[b]Season " + season +" Rankings (As of " + lastUpdated + "):[/b] \n";
	for(i=0;i<numArray.length;i++) {
		ranks += ((i + 1) + ". " + numArray[i].playerLine() + "\n");
	}

	displayRanks();
}

function displayRanks() {
	//document.getElementById('textdiv').innerHTML = ranks;
	alert(ranks);
	PlayerArray = new Array();
	return ranks;
}

function createRanksDiv(season) {
	if(document.getElementById("ranksdiv") == undefined) {
		document.getElementsByClassName('bblinks')[0].id = "bblinks";
		var bbLinksUL = document.getElementById("bblinks");
	
		var li = document.createElement('li');
		var div = document.createElement('div');
		var button = document.createElement('input');
		div.id = 'ranksdiv';
		button.type = "button";
		button.value = "PotG Ranks";
		button.setAttribute('onclick','javascript:getPlayerRankings(' + season + ')');
	
		div.appendChild(button);
		
		if(document.getElementById('textdiv') == undefined) {
		
			var textDiv = document.createElement("div");
			textDiv.id = 'textdiv';
			
			div.appendChild(textDiv);
		}
		
		li.appendChild(div);
		bbLinksUL.appendChild(li);
	}
}

function addFunctionsToPage() {
	var script = document.createElement("script");
	script.type= 'text/javascript';
	
	var innerHTML;
	
	innerHTML = "\nvar ranks;\n";
	innerHTML = innerHTML + "\nvar lastUpdated;\n";
	innerHTML = innerHTML + "\nvar PlayerArray = new Array();\n";
	innerHTML = innerHTML + "var season = " + getSeason() + ";\n";
	innerHTML = innerHTML + displayRanks + "\n";
	innerHTML = innerHTML + getPlayerRankings + "\n";
	innerHTML = innerHTML + rankSort + "\n";
	innerHTML = innerHTML + getGameInfo + "\n";
	innerHTML = innerHTML + playerParse + "\n";
	innerHTML = innerHTML + Player + "\n";
	
	script.innerHTML = innerHTML;
	
	document.getElementsByTagName('head')[0].appendChild(script);
}

createRanksDiv(getSeason());
addFunctionsToPage();