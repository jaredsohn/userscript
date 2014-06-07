// ==UserScript==
// @name           Planets.nu Race filters for Open games
// @namespace      Planets.nu
// @description    Adds subsections for each race to the 'open games' page.
// @include        http://planets.nu/echo
// @version        0.1
// ==/UserScript==
 
function exec(fn) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = '(' + wrapper + ')(); (' + fn + ')();';
	document.body.appendChild(script);
	document.body.removeChild(script);
};

exec(function() {
	
	var node = document.createElement("li");
	node.innerHTML = "Show Open Races";
	node.setAttribute("onclick", "gameList.showOpenRaces();");
	node.setAttribute("style", "color: #FFA500");
	var menu = document.getElementById("IndexMenu");
	menu.insertBefore(node, menu.childNodes[3]);	

});

function wrapper () { // wrapper for injection

gameListFunctions.prototype.showOpenRaces = function () {

	//console.log("open");

	var games = new Array();

        var html = "<br/><br/><h1 class='OpenGame'>Order by Race: Running Games with Open Spot</h1><br>Team Games and Giant Melee Games not included in this list."

	var races = ["Federation", "Lizards", "Birds", "Fascists", "Privateers", "Borg", "Crystals", "Evil Empire", "Robots", "Rebels", "Colonials"];

	for (var r = 0; r < races.length; r++) {
		games = new Array();
		for (var i = 0; i < this.games.length; i++) {
            		var game = this.games[i];
            		if ((game.status == 2) && (game.slots > r) && (game.turnstatus[r] == "o")) {
				if (game.wincondition == 4)
					continue;
				if (game.shortdescription == "Giant Melee")
					continue;
                	
				games.push(game);
			}
        	}
		html += "<br/><br/><h2 class='OpenGame'>" + races[r] + "</h2>";
		html += this.renderGames(games);


	}
        this.gameIndex.html(html);

        this.gameIndex.fadeIn();
        this.container.fadeOut();
        window.scrollTo(0, 0);
    };



} //wrapper for injection

