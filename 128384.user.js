
// ==UserScript==
// @name           Planets.nu strategic information assistant
// @namespace      Planets.nu
// @description    Show latest turn changes in the public game score
// @include        http://planets.nu/games/*
// ==/UserScript==

//--- Load the library.

function exec(fn) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = '(' + fn + ')();';
	document.body.appendChild(script);
	document.body.removeChild(script);
};

exec(function() {
	
	var pos = {
		name : 0,
		planets : 1,
		starbases : 2,
		warships : 3,
		freighters : 4,
		military : 5,
		score : 6,
		pb : 7
	};
	
	var score = document.getElementById('ScoreData').getElementsByClassName('CleanTable')[0];

	
	self.modifyTable = function(row, column, value) {
		var difference = score.childNodes[1].childNodes[row].childNodes[column].childNodes[0].nodeValue - value;
		var appendString = '';
		if (difference < 0) {
			appendString = '(' + difference + ')';
			score.childNodes[1].childNodes[row].childNodes[column].style.backgroundColor=("darkred");
		}
		else if (difference > 0) {
			appendString = '(+' + difference + ')';
			score.childNodes[1].childNodes[row].childNodes[column].style.backgroundColor=("darkgreen");
		}
		
		score.childNodes[1].childNodes[row].childNodes[column].childNodes[0].nodeValue += appendString;
	};
	
	init();
	
	function init() {
		var data;
		var i = 0;
		var previousTotalPlanets = 0;
		var previousTotalBases = 0;
		var previousTotalCapital = 0;
		var previousTotalFreight = 0;

		console.log(score);
		for (var i = 0; i < this.scores.length; i++) {
		
			data = this.scores[i];
			var previousTurn = this.scoreboard.turn-1;
			if (data.turn == previousTurn) {
				for( var ii = 0; ii < this.scoreboard.slots; ii++) {
				
					if (data.name == score.childNodes[1].childNodes[ii].childNodes[0].childNodes[0].nodeValue) {
						previousTotalPlanets += data.planets;
						previousTotalBases += data.starbases;
						previousTotalCapital += data.capitalships;
						previousTotalFreight += data.freighters;
						
						console.log(data);
					
						self.modifyTable(ii, pos.planets, data.planets);
						self.modifyTable(ii, pos.starbases, data.starbases);
						self.modifyTable(ii, pos.warships, data.capitalships);
						self.modifyTable(ii, pos.freighters, data.freighters);
						self.modifyTable(ii, pos.military, data.militaryscore);
						self.modifyTable(ii, pos.score, data.inventoryscore);
						self.modifyTable(ii, pos.pb, data.prioritypoints);
					}
				}
			}
		}

		self.modifyTable(this.scoreboard.slots, pos.planets, previousTotalPlanets);
		self.modifyTable(this.scoreboard.slots, pos.starbases, previousTotalBases);
		self.modifyTable(this.scoreboard.slots, pos.warships, previousTotalCapital);
		self.modifyTable(this.scoreboard.slots, pos.freighters, previousTotalFreight);
	}
});