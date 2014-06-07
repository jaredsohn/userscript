// ==UserScript==
// @name           Planets.nu Giant Melee Plot Fix
// @namespace      Planets.nu
// @description    Fixes pie charts for giant melee and team games and improved normal chart quality
// @include        http://planets.nu/games/*
// @updateURL      https://userscripts.org/scripts/source/130860.meta.js
// @downloadURL    http://userscripts.org/scripts/source/130860.user.js
// @version        0.4
// ==/UserScript==


function exec(fn) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = '(' + wrapper2 + ')(); (' + fn + ')();';
	document.body.appendChild(script);
	document.body.removeChild(script);
};
   
exec(function() {
	
	//delete old graphs
	document.getElementById("PieChart").removeChild(document.getElementById("PieChart").childNodes[0])
	document.getElementById("PlanetPie").removeChild(document.getElementById("PlanetPie").childNodes[0])
	document.getElementById("OwnedPlanetPie").removeChild(document.getElementById("OwnedPlanetPie").childNodes[0])

	//scoreboard.load(scoreboard.turn, scoreboard.slots, 4);
	nuScores.prototype.load2(scoreboard.turn, scoreboard.slots);	
});

function wrapper2 () { // wrapper for injection

nuScores.prototype.load2 = function (turn, slots) {

        if (!slots)
            slots = 11;

        this.turn = turn;
        this.slots = slots;

        //scores should be already defined by a separate inclusion.
        this.height = 500;
        this.width = 828;

        this.pie = $("#PieChart");
        this.planetPie = $("#PlanetPie");
        this.ownedPlanetPie = $("#OwnedPlanetPie");
        this.history = $("#ScoreBoard");
        this.planetHistory = $("#PlanetBoard");
        this.data = $("#ScoreData");
        this.pie.hide();
        this.planetPie.hide();
        this.ownedPlanetPie.hide();
        this.history.show();
        this.planetHistory.hide();
        this.data.hide();

        $("#Scores").height(Math.max(500, slots * 50));
        //this.renderHistory("ScoreBoard", "score");
        //this.renderHistory("PlanetBoard", "planets");
        this.renderPie("PieChart", "score");
        this.renderPie("PlanetPie", "planets");
        this.renderPie("OwnedPlanetPie", "ownedplanets");
        //this.renderData();

        this.openScreen = this.history;

    };

nuScores.prototype.renderPie = function (target, property) {

        //Setup paper
        paper = Raphael(target, this.width, this.height);
        paper.safari();

        var turn = this.turn;
        var slots = this.slots;

        var colors = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 0.43, 0.53, 0.03, 0.13, 0.23, 0.33, 0.63, 0.73, 0.83, 0.93,  0.36, 0.46, 0.56, 0.06, 0.16, 0.26, 0.66, 0.76, 0.86, 0.96 ];

        var labels = new Array();
        var data = new Array();

        var totalPlanets = 0;
        for (var i = 0; i < scores.length; i++) {
            var score = scores[i];
            if (score.turn == turn)
                totalPlanets += score.planets;
        }

		var sumBelowThreshold = 0.0;
        for (var j = 0; j < slots; j++) {

            var playerId = j + 1;

            for (var i = 0; i < scores.length; i++) {

                var score = scores[i];
                if (score.ownerid == playerId && score.turn == turn) {
                    if (property == "score") {
						if (score.percent > 1.5) { 
			        		labels.push(score.name);
			             	data.push(score.percent);
						} else {
							sumBelowThreshold += score.percent;
						}
					}
			        else if (property == "planets") {
			        	if (score.planets / totalPlanets > 0.015) {
							labels.push(score.name);
				            data.push(score.planets / 500);
						} else {			
			   		        sumBelowThreshold += score.planets/500;
						}
					}
			        else if (property == "ownedplanets") {
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


		// sort entries by percentage

		var labels_sorted = new Array();
	    var data_sorted = new Array();
		var colors_sorted = new Array();

		// simple selection sort
		for (var i = 0; i < data.length; i++) {
			var large_index = 0;
			var large_value = -1.0;	

			for (var j = 0; j < data.length; j++) {
				
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

		//add races below threshold
        if (sumBelowThreshold > 0.0) {
            labels.push("Others");
            data.push(sumBelowThreshold);
	   		labels_sorted.push("Others");
            data_sorted.push(sumBelowThreshold);
			colors_sorted.push(colors[data.length-1]);
        }

		//add unowned planets
        if (property == "planets") {
            labels.push("Unowned");
            data.push((500 - totalPlanets) / 500);
			labels_sorted.push("Unowned");
			data_sorted.push((500 - totalPlanets) / 500);
			colors_sorted.push(colors[data.length-1]);
        }

        //paper.pieChart(414, 250, 150, data, labels, colors, "#fff");
        paper.pieChart(414, 250, 150, data_sorted, labels_sorted, colors_sorted, "#fff");

    };


} //wrapper for injection
