// ==UserScript==
// @name           Planets.nu Game Data Alliance Addon
// @namespace      Planets.nu
// @description    Adds capabilities for handling alliances on the game data screen
// @include        http://planets.nu/games/*
// @updateURL      https://userscripts.org/scripts/source/132150.meta.js
// @downloadURL    http://userscripts.org/scripts/source/132150.user.js
// @author         kedalion
// @version        0.6
// ==/UserScript==

/* -----------------------------------------------------------------------
 v0.6 
 - removed a small bug
 v0.5
 - reorganized menu into individual and alliance
 - improved alliance grouping to use new algorithm to support complicated alliances
 - added alliance tab to visualize alliances (relations tab moved to end in case somebody 
   still likes it; it shows one sided alliance offers) 
 - pie charts disabled if players belong to several distinct alliances as they would be 
   incorrect
 v0.4
 - fixed swapped freighters and war ships
 - added tooltips for 'Relations' table
 - team members now on different lines in pie charts (no overlapping with the chart)
 v0.3
 - changed names
 v0.2
 - Adds graphs and data pages taking alliances into account.
 - Adds a relationship tab displaying inter racial relationships. 
 - Fixes pie charts for giant melee and team games.
 - Fixes charts for games with non-default number of planets (Blitz/Private).
 - Groups races with very small contribution into "Others" --> declutter...
 - Sorts entries in pie chart for better overview
 ----------------------------------------------------------------------- */

function exec(fn) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = '(' + wrapper + ')(); (' + fn + ')();';
	document.body.appendChild(script);
	document.body.removeChild(script);
};

exec(function() {

	// console.log("Inserting tabs.");

	var node;

	// separate in individual and alliance tabs
	var first = document.getElementById("ScoreMenu").firstChild;
	node = document.createElement("li");
	node.innerHTML = "Individual:";
	node.setAttribute("style", "color: green");
	document.getElementById("ScoreMenu").insertBefore(node, first);

	node = document.createElement("br");
	document.getElementById("ScoreMenu").appendChild(node);

	node = document.createElement("li");
	node.innerHTML = "Alliances:";
	node.setAttribute("style", "color: red");
	document.getElementById("ScoreMenu").appendChild(node);

	// create alliance tabs
	node = document.createElement("li");
	node.innerHTML = "Alliances";
	node.setAttribute("onclick", "scoreboard.showAlliances()");
	document.getElementById("ScoreMenu").appendChild(node);

	node = document.createElement("div");
	node.setAttribute("id", "Alliances");
	node.setAttribute("style", "display: none; ");
	document.getElementById("Scores").appendChild(node);

	//data
	node = document.createElement("li");
	node.innerHTML = "Alliances Data";
	node.setAttribute("onclick", "scoreboard.showAllianceData()");
	document.getElementById("ScoreMenu").appendChild(node);

	node = document.createElement("div");
	node.setAttribute("id", "AllianceData");
	node.setAttribute("style", "display: none; ");
	document.getElementById("Scores").appendChild(node);

	//planets
	node = document.createElement("li");
	node.innerHTML = "Planets (Alliance)";
	node.setAttribute("onclick", "scoreboard.showAlliancePlanetGraph()");
	document.getElementById("ScoreMenu").appendChild(node);

	node = document.createElement("div");
	node.setAttribute("id", "AlliancePlanetGraph");
	node.setAttribute("style", "display: none; ");
	document.getElementById("Scores").appendChild(node);

	//owned planets
	node = document.createElement("li");
	node.innerHTML = "Owned Planets (Alliance)";
	node.setAttribute("onclick", "scoreboard.showAllianceOwnedPlanetGraph()");
	document.getElementById("ScoreMenu").appendChild(node);

	node = document.createElement("div");
	node.setAttribute("id", "AllianceOwnedPlanetGraph");
	node.setAttribute("style", "display: none; ");
	document.getElementById("Scores").appendChild(node);

	//military
	node = document.createElement("li");
	node.innerHTML = "Military (Alliance)";
	node.setAttribute("onclick", "scoreboard.showAllianceMilitaryGraph()");
	document.getElementById("ScoreMenu").appendChild(node);

	node = document.createElement("div");
	node.setAttribute("id", "AllianceMilitaryGraph");
	node.setAttribute("style", "display: none; ");
	document.getElementById("Scores").appendChild(node);

	//relations
	node = document.createElement("li");
	node.innerHTML = "Relations";
	node.setAttribute("onclick", "scoreboard.showRelations()");
	document.getElementById("ScoreMenu").appendChild(node);

	node = document.createElement("div");
	node.setAttribute("id", "Relations");
	node.setAttribute("style", "display: none; ");
	document.getElementById("Scores").appendChild(node);

	// run scripts to fill content
	node = document.createElement("script");
	node.setAttribute("type", "text/javascript");
	node.innerHTML = "scoreboard.loadRelations()";
	document.getElementById("Scores").appendChild(node);

	//	node = document.createElement("script");
	//	node.setAttribute("type", "text/javascript");
	//	node.setAttribute("src", "");
	//	document.getElementById("Scores").appendChild(node);

});

function wrapper() { // wrapper for injection

	Alliance = function() {
		this.players = new Array();
		this.name = "";
		this.militaryscore = 0;
		this.planets = 0;
		this.percent = 0.0;
		this.freighters = 0;
		this.capitalships = 0;
		this.starbases = 0;
		this.inventoryscore = 0;
		this.prioritypoints = 0;
	};

	nuScores.prototype.processRelations = function(data) {

		scoreboard.gameData = data;

		// get race array
		scoreboard.races = [ "Federation", "Lizards", "Birds", "Fascists", "Privateers", "Borg", "Crystals", "Evil Empire", "Robots",
				"Rebels", "Colonials" ];

		// delete old graphs
		document.getElementById("PieChart").removeChild(document.getElementById("PieChart").childNodes[0]);
		document.getElementById("PlanetPie").removeChild(document.getElementById("PlanetPie").childNodes[0]);
		document.getElementById("OwnedPlanetPie").removeChild(document.getElementById("OwnedPlanetPie").childNodes[0]);

		// replace deleted graphs
		scoreboard.renderPie("PieChart", "score");
		scoreboard.renderPie("PlanetPie", "planets");
		scoreboard.renderPie("OwnedPlanetPie", "ownedplanets");

		// extract alliance
		scoreboard.extractAlliances();

		// adjust size of 'score' div element if necessary
		// ----------------------------------------
		// normal data: #players + 3 for stats
		var individual_rows = scoreboard.slots + 3;
		// alliance data: #players in factions + #alliances + 1 for stats
		var alliance_rows = scoreboard.playersInFactions + scoreboard.numAlliances + 1;

		// use larger value for table height
		var height = 30 * Math.max(individual_rows, alliance_rows);

		if (scoreboard.factions_complicated) {
			height += 70;
		}

		// add padding
		height += 20;

		// graphs need at least 500px.
		height = Math.max(height, 500);
		document.getElementById("Scores").setAttribute("style", "height: " + height + "px");
		// ----------------------------------------
		
		// render all data using alliances
		scoreboard.renderAlliancesData();
		scoreboard.renderPie("AllianceMilitaryGraph", "Ascore");
		scoreboard.renderPie("AlliancePlanetGraph", "Aplanets");
		scoreboard.renderPie("AllianceOwnedPlanetGraph", "Aownedplanets");

		// show inter race relations matrix
		scoreboard.renderRelations();
		scoreboard.renderAlliances("Alliances", 500, 100);

		
	};

	// Find maximal cliques in relationship 'graph'
	// R = empty;
	// X = empty;
	// P = {1::scoreboard.slots};
	nuScores.prototype.BronKerbosch = function(R, P, X) {
		// console.log(R.length + " " + P.length + " " + X.length);
		if (P.length == 0 && X.length == 0) {
			var alliance = new Alliance();
			for ( var p = 0; p < R.length; p++) {
				alliance.players.push(R[p]);
			}
			// console.log("found faction: ");
			// console.log(alliance);
			this.factions.push(alliance);
			return;
		}

		while (P.length > 0) {
			// console.log("still p size: " + P.length);
			var v = P.pop();

			var R2 = R.slice();
			R2.push(v);

			// P cut N(v);
			var P2 = new Array();
			for ( var j = 0; j < P.length; j++) {
				var index = (P[j] - 1) * scoreboard.slots;
				if (scoreboard.gameData.relations[index + v - 1].relationfrom == 4
						&& scoreboard.gameData.relations[index + v - 1].relationto == 4) {
					P2.push(P[j]);
				}
			}

			// X cut N(v);
			var X2 = new Array();
			for ( var j = 0; j < X.length; j++) {
				var index = (X[j] - 1) * scoreboard.slots;
				if (scoreboard.gameData.relations[index + v - 1].relationfrom == 4
						&& scoreboard.gameData.relations[index + v - 1].relationto == 4) {
					X2.push(X[j]);
				}
			}
			// console.log(" v: " + v);
			this.BronKerbosch(R2, P2, X2);

			X.push(v);
			// console.log("end: still p size: " + P.length);
		}
	};

	// extract all alliances / factions from relationship data
	nuScores.prototype.extractAlliances = function() {

		this.factions = new Array();

		//var index = 0;
		var mostRecentScoreIndex = 0;

		var P = new Array();
		for ( var i = scoreboard.slots; i >= 1; i--) {
			P.push(i);
		}

		scoreboard.BronKerbosch(new Array(), P, new Array());

		scoreboard.factions_complicated = false;
		scoreboard.numAlliances = 0;
		scoreboard.playersInFactions = 0;

		// go through all factions and add scores
		for ( var f = 0; f < this.factions.length; f++) {
			scoreboard.playersInFactions += this.factions[f].players.length;

			for ( var p = 0; p < this.factions[f].players.length; p++) {
				mostRecentScoreIndex = scores.length - scoreboard.slots - 1 + this.factions[f].players[p];
				//var player = this.factions[f].players[p];
				this.factions[f].name += "\n " + scores[mostRecentScoreIndex].name;
				this.factions[f].militaryscore += scores[mostRecentScoreIndex].militaryscore;
				this.factions[f].planets += scores[mostRecentScoreIndex].planets;
				this.factions[f].starbases += scores[mostRecentScoreIndex].starbases;
				this.factions[f].capitalships += scores[mostRecentScoreIndex].capitalships;
				this.factions[f].freighters += scores[mostRecentScoreIndex].freighters;
				this.factions[f].percent += scores[mostRecentScoreIndex].percent;
				this.factions[f].inventoryscore += scores[mostRecentScoreIndex].inventoryscore;
				this.factions[f].prioritypoints += scores[mostRecentScoreIndex].prioritypoints;
			}

			if (this.factions[f].players.length > 1)
				scoreboard.numAlliances++;
		}

		if (scoreboard.playersInFactions > scoreboard.slots) {
			console.log("Complicated Alliances!");
			scoreboard.factions_complicated = true;
		}
	};

	// output table with all know inter player relations
	nuScores.prototype.renderRelations = function() {

		var html = "<div class='DashPane'><div id='MessageInbox' style='padding: 10pt'><table width='100%' class='CleanTable'><thead>";
		html += "<tr><th></th><th></th>";

		for ( var r = 1; r <= scoreboard.slots; r++) {
			html += "<th>" + r + "</th>";
		}
		html += "</tr></thead><tbody>";

		var index = 0;

		if (scoreboard.slots * scoreboard.slots != scoreboard.gameData.relations.length) {
			console.log("Dimension mismatch!");
			return;
		}

		for ( var r = 1; r <= scoreboard.slots; r++) {
			html += "<tr><td>" + r + "</td><td>" + scores[scores.length - scoreboard.slots - 1 + r].name + "</td>";
			for ( var r2 = 1; r2 <= scoreboard.slots; r2++) {
				if ((scoreboard.gameData.relations[index].playerid != r) || (scoreboard.gameData.relations[index].playertoid != r2)) {
					console.log("id mismatch" + r + "!=" + scoreboard.gameData.relations[index].playerid + " , " + r2 + " != "
							+ scoreboard.gameData.relations[index].playertoid);
				}
				var rel = scoreboard.gameData.relations[index].relationto;
				if (rel == 1)
					html += "<td style='background-color: rgb(20, 20, 20)'> ";
				else if (rel == 2)
					html += "<td style='background-color: rgb(0, 70, 150)'>sp ";
				else if (rel == 3)
					html += "<td style='background-color: rgb(255, 165, 0)'>IS ";
				else if (rel == 4)
					html += "<td style='background-color: rgb(0, 200, 0)' title='Alliance offer from "
							+ scoreboard.gameData.players[r - 1].username + " to " + scoreboard.gameData.players[r2 - 1].username + "'>A";
				else
					html += "<td>";

				html += "</td>";
				index += 1;
			}
			html += "</tr>";
		}
		html += "</tbody></table></div>";
		this.relations.html(html);
	};

	nuScores.prototype.renderAlliancesData = function() {
		var html = "<div class='DashPane'><div id='MessageInbox' style='padding: 10pt'>";

		if (scoreboard.factions_complicated) {
			html += "<h3> Complicated alliances!</h3> Some players are involved in multiple distinct alliances. They contribute to multiple factions. <br><br>";
		}

		html += "<table width='100%' class='CleanTable'><thead>";
		html += "<tr><th>Race (Player)</th><th>Planets</th><th>Starbases</th><th>War Ships</th><th>Freighters</th><th>Military</th><th>Score></th><th>Priotity Points</th></tr></thead><tbody>";

		var teamNum = 1;
		for ( var f = 0; f < this.factions.length; f++) {
			html += "<tr>";

			if (this.factions[f].players.length > 1) {
				html += "<td>Alliance " + teamNum + "</td>";
				teamNum++;
			} else {
				var player = scoreboard.gameData.players[this.factions[f].players[0] - 1];
				html += "<td>" + scoreboard.races[player.raceid - 1] + " (" + player.username + ")</td>";
			}

			// html += "<td>" + this.factions[f].percent + "</td>";
			html += "<td>" + this.factions[f].planets + "</td>";
			html += "<td>" + this.factions[f].starbases + "</td>";
			html += "<td>" + this.factions[f].capitalships + "</td>";
			html += "<td>" + this.factions[f].freighters + "</td>";
			html += "<td>" + this.factions[f].militaryscore + "</td>";
			html += "<td>" + this.factions[f].inventoryscore + "</td>";
			html += "<td>" + this.factions[f].prioritypoints + "</td>";

			html += "</tr>";

			if (this.factions[f].players.length > 1) {

				for ( var p = 0; p < this.factions[f].players.length; p++) {
					html += "<tr style='color: #888888'>";
					var player = scoreboard.gameData.players[this.factions[f].players[p] - 1];
					html += "<td>&nbsp; &nbsp;" + scoreboard.races[player.raceid - 1] + " (" + player.username + ")</td>";

					// html += "<td>" + player.score.percent + "</td>";
					html += "<td>" + player.score.planets + "</td>";
					html += "<td>" + player.score.starbases + "</td>";
					html += "<td>" + player.score.capitalships + "</td>";
					html += "<td>" + player.score.freighters + "</td>";
					html += "<td>" + player.score.militaryscore + "</td>";
					html += "<td>" + player.score.inventoryscore + "</td>";
					html += "<td>" + player.score.prioritypoints + "</td>";

					html += "</tr>";
				}
			}
		}
		html += "</tbody></table></div>";

		this.allianceData.html(html);
	};

	nuScores.prototype.renderPie = function(target, property) {

		if (property[0] == "A" && scoreboard.factions_complicated) {

			var html = "<div class='DashPane'><div id='MessageInbox' style='padding: 10pt'>";
			html += "<h2>Complicated alliances!</h2> <br> Some players are involved in multiple distinct alliances. They contribute to multiple factions. <br>Resulting Pie charts not correct and omitted.";
			html += "</div>";

			document.getElementById(target).innerHTML = html;
			return;
		}

		// Setup paper
		paper = Raphael(target, this.width, this.height);
		paper.safari();

		var turn = this.turn;
		var slots = this.slots;

		var colors = [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 0.43, 0.53, 0.03, 0.13, 0.23, 0.33, 0.63, 0.73, 0.83, 0.93, 0.36,
				0.46, 0.56, 0.06, 0.16, 0.26, 0.66, 0.76, 0.86, 0.96 ];

		var labels = new Array();
		var data = new Array();

		var totalPlanets = 0;
		for ( var i = 0; i < scores.length; i++) {
			var score = scores[i];
			if (score.turn == turn)
				totalPlanets += score.planets;
		}

		var sumBelowThreshold = 0.0;

		if (property[0] != "A") {

			for ( var j = 0; j < slots; j++) {

				var playerId = j + 1;

				for ( var i = 0; i < scores.length; i++) {

					var score = scores[i];
					if (score.ownerid == playerId && score.turn == turn) {
						if (property == "score") {
							if (score.percent > 1.5) {
								labels.push(score.name);
								data.push(score.percent);
							} else {
								sumBelowThreshold += score.percent;
							}
						} else if (property == "planets") {
							if (score.planets / totalPlanets > 0.015) {
								labels.push(score.name);
								data.push(score.planets / scoreboard.gameData.settings.numplanets);
							} else {
								sumBelowThreshold += score.planets / scoreboard.gameData.settings.numplanets;
							}
						} else if (property == "ownedplanets") {
							if (score.planets / totalPlanets > 0.02) {
								labels.push(score.name);
								data.push(score.planets / totalPlanets);
							} else {
								sumBelowThreshold += score.planets / totalPlanets;
							}
						}
					}
				}
			}
		} else {
			for ( var j = 0; j < scoreboard.factions.length; j++) {
				if (property == "Ascore") {
					if (scoreboard.factions[j].percent > 1.5) {
						labels.push(scoreboard.factions[j].name);
						data.push(scoreboard.factions[j].percent);
					} else {
						sumBelowThreshold += scoreboard.factions[j].percent;
					}
				} else if (property == "Aplanets") {
					if (scoreboard.factions[j].planets / totalPlanets > 0.015) {
						labels.push(scoreboard.factions[j].name);
						data.push(scoreboard.factions[j].planets / scoreboard.gameData.settings.numplanets);
					} else {
						sumBelowThreshold += scoreboard.factions[j].planets / scoreboard.gameData.settings.numplanets;
					}
				} else if (property == "Aownedplanets") {
					if (scoreboard.factions[j].planets / totalPlanets > 0.02) {
						labels.push(scoreboard.factions[j].name);
						data.push(scoreboard.factions[j].planets / totalPlanets);
					} else {
						sumBelowThreshold += scoreboard.factions[j].planets / totalPlanets;
					}
				}
			}
		}

		// sort entries by percentage
		var labels_sorted = new Array();
		var data_sorted = new Array();
		var colors_sorted = new Array();

		// simple selection sort
		for ( var i = 0; i < data.length; i++) {
			var large_index = 0;
			var large_value = -1.0;

			for ( var j = 0; j < data.length; j++) {

				if (data[j] > large_value) {
					large_value = data[j];
					large_index = j;
				}
			}

			labels_sorted.push(labels[large_index]);
			data_sorted.push(data[large_index]);
			colors_sorted.push(colors[large_index]);

			data[large_index] = -2.0;
		}

		// add races below threshold
		if (sumBelowThreshold > 0.0) {
			labels.push("Others");
			data.push(sumBelowThreshold);
			labels_sorted.push("Others");
			data_sorted.push(sumBelowThreshold);
			colors_sorted.push(colors[data.length - 1]);
		}

		// add unowned planets
		if (property == "planets" || property == "Aplanets") {
			labels.push("Unowned");
			data.push((scoreboard.gameData.settings.numplanets - totalPlanets) / scoreboard.gameData.settings.numplanets);
			labels_sorted.push("Unowned");
			data_sorted.push((scoreboard.gameData.settings.numplanets - totalPlanets) / scoreboard.gameData.settings.numplanets);
			colors_sorted.push(colors[data.length - 1]);
		}

		// paper.pieChart(414, 250, 150, data, labels, colors, "#fff");
		paper.pieChart(414, 250, 150, data_sorted, labels_sorted, colors_sorted, "#fff");

	};

	nuScores.prototype.renderAlliances = function(target, property) {
		
		// Setup paper
		paper = Raphael(target, this.width, this.height);
		paper.safari();

		this.canvas = paper.set();

		var colors = [ "red", "RoyalBlue", "green", "purple", "orange", "yellow", "cyan", "olive", "coral", "deeppink", "white",
				"mediumslateblue", "sienna", "skyblue", "tomato", "wheat", "lightcoral", "darkslategray", "teal", "firebrick", "olive",
				"mediumpurple", "lime", "indigo", "tan", "yellowgreen", "goldenrod", "aliceblue", "olivedrab", "orangered" ];

		var x = 250;
		var x_offset = 20;
		var y_offset = 16;
		var y_start = 20;

		// loop over all players and print their names
		var t;
		for ( var p = 0; p < scoreboard.gameData.players.length; p++) {

			t = paper.text(x, y_start + y_offset * p, scoreboard.races[scoreboard.gameData.players[p].raceid - 1] + " ("
					+ scoreboard.gameData.players[p].username + ")");
			if (scoreboard.gameData.players[p].username == "dead")
				t.attr({
					fill : "grey",
					"font-size" : "14",
					"text-anchor" : "end"
				});
			else
				t.attr({
					fill : "white",
					"font-size" : "14",
					"text-anchor" : "end"
				});

		}

		// loop over all factions and draw paths between them, move next path
		// further out
		var path;
		var num_alliance = 0;
		for ( var f = 0; f < scoreboard.factions.length; f++) {
			if (scoreboard.factions[f].players.length > 1) {

				// connect all players of alliance
				for ( var p = 0; p < scoreboard.factions[f].players.length - 1; p++) {
					var p1 = scoreboard.factions[f].players[p] - 1;
					var p2 = scoreboard.factions[f].players[p + 1] - 1;
					var y1 = y_start - Math.round(y_offset / 2) + p1 * y_offset + 2 * (num_alliance % 6);

					var path_str = "M" + (x + x_offset) + "," + y1;
					path_str += " h" + ((num_alliance + 1) * x_offset);
					path_str += " v" + ((p2 - p1) * y_offset);
					path_str += " h" + (-(num_alliance + 1) * x_offset);

					path = paper.path(path_str);
					path.attr({
						stroke : colors[num_alliance],
						"stroke-width" : 2
					});
				}
				num_alliance++;
			}
		}
	};

	nuScores.prototype.showRelations = function() {
		this.openScreen.fadeOut(function() {
			scoreboard.relations.fadeIn();
		});
		this.openScreen = scoreboard.relations;
	};

	nuScores.prototype.showAllianceData = function() {
		this.openScreen.fadeOut(function() {
			scoreboard.allianceData.fadeIn();
		});
		this.openScreen = scoreboard.allianceData;
	};

	nuScores.prototype.showAlliancePlanetGraph = function() {
		this.openScreen.fadeOut(function() {
			scoreboard.alliancePlanetGraph.fadeIn();
		});
		this.openScreen = scoreboard.alliancePlanetGraph;
	};

	nuScores.prototype.showAllianceOwnedPlanetGraph = function() {
		this.openScreen.fadeOut(function() {
			scoreboard.allianceOwnedPlanetGraph.fadeIn();
		});
		this.openScreen = scoreboard.allianceOwnedPlanetGraph;
	};

	nuScores.prototype.showAllianceMilitaryGraph = function() {
		this.openScreen.fadeOut(function() {
			scoreboard.allianceMilitaryGraph.fadeIn();
		});
		this.openScreen = scoreboard.allianceMilitaryGraph;
	};

	nuScores.prototype.showAlliances = function() {
		this.openScreen.fadeOut(function() {
			scoreboard.alliances.fadeIn();
		});
		this.openScreen = scoreboard.alliances;
	};

	nuScores.prototype.loadRelations = function() {
		// hide tables
		this.alliances = $("#Alliances");
		this.alliances.hide();

		this.allianceData = $("#AllianceData");
		this.allianceData.hide();

		this.alliancePlanetGraph = $("#AlliancePlanetGraph");
		this.alliancePlanetGraph.hide();

		this.allianceOwnedPlanetGraph = $("#AllianceOwnedPlanetGraph");
		this.allianceOwnedPlanetGraph.hide();

		this.allianceMilitaryGraph = $("#AllianceMilitaryGraph");
		this.allianceMilitaryGraph.hide();

		this.relations = $("#Relations");
		this.relations.hide();

		// extract game id from URL
		console.log(document.URL);
		var index = document.URL.split("/").length - 1;
		this.gameid = document.URL.split("/")[index];

		// request game info and send to callback function
		console.log("Trying to load relationships for game " + this.gameid);

		var url = "http://api.planets.nu/game/loadinfo?gameid=" + this.gameid + "&jsoncallback=?";
		$.get(url, scoreboard.processRelations, "jsonp");

		console.log("Done loading.");

	};

} //wrapper for injection
