// ==UserScript==
// @name           GLB add QB rating to stats page V2
// @namespace      Darwood - GLB scripts
// @description    QB rating to leaders page
// @include        http://goallineblitz.com/game/team_player_stats.pl?team_id=*
// @include	    http://goallineblitz.com/game/stats.pl?league_id=*&stat=passing*
// @include	    http://goallineblitz.com/game/team_player_stats.pl?team_id=*
// @include	    http://goallineblitz.com/game/stats.pl?league_id=*&conference_id=*
// @include	    http://goallineblitz.com/game/stats.pl?season=*&league_id=*&conference_id=*&stat=passing&playoffs=*
// @exclude	    http://goallineblitz.com/game/team_player_stats.pl?team_id=*&stat=rushing*
// @exclude	    http://goallineblitz.com/game/team_player_stats.pl?team_id=*&stat=sp_teams*
// @exclude	    http://goallineblitz.com/game/team_player_stats.pl?team_id=*&stat=receiving*
// @exclude	    http://goallineblitz.com/game/team_player_stats.pl?team_id=*&stat=kicking*
// @exclude	    http://goallineblitz.com/game/team_player_stats.pl?team_id=*&stat=defense*
// @exclude	    http://goallineblitz.com/game/team_player_stats.pl?team_id=*&stat=other*
// @exclude	    http://goallineblitz.com/game/stats.pl?league_id=*&conference_id=*&stat=rushing*
// @exclude	    http://goallineblitz.com/game/stats.pl?league_id=*&conference_id=*&stat=sp_teams*
// @exclude	    http://goallineblitz.com/game/stats.pl?league_id=*&conference_id=*&stat=receiving*
// @exclude	    http://goallineblitz.com/game/stats.pl?league_id=*&conference_id=*&stat=kicking*
// @exclude	    http://goallineblitz.com/game/stats.pl?league_id=*&conference_id=*&stat=defense*
// @exclude	    http://goallineblitz.com/game/stats.pl?league_id=*&conference_id=*&stat=other*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require	    http://tablesorter.com/jquery.tablesorter.min.js
// ==/UserScript==

//------------------- main -----------------------

function loadCss() {
	var css = document.createElement('link');
	css.href="http://jquery-ui.googlecode.com/svn/tags/latest/themes/base/ui.all.css";
	css.type="text/css";
	css.rel="stylesheet";
	document.getElementsByTagName('head')[0].appendChild(css);
}

function modifyPlayers() {
	var players = document.getElementsByClassName("stat_column_player", document);
	
	//var columnname = "<td class=\"stat_column\">G</td>";
	
	console.log('Where is this : ' + players[0].parentNode.childNodes[3].innerHTML);
	
	var z = document.createElement("span");
	z.className = "stat_column";
	z.innerHTML = '<b>QB rating</b>';
	
	players[0].parentNode.childNodes[3].removeChild(players[0].parentNode.childNodes[3].firstChild);
	players[0].parentNode.childNodes[3].appendChild(z);
	
	for (var i=1; i < players.length; i++) {
	
		var p = players[i];
		
		if (p == null) continue;
		
		var yards = parseFloat(players[i].parentNode.childNodes[5].innerHTML);
		var completions = parseFloat(players[i].parentNode.childNodes[7].innerHTML);
		var attempts = parseFloat(players[i].parentNode.childNodes[9].innerHTML);
		var TDs = parseFloat(players[i].parentNode.childNodes[21].innerHTML);
		var Ints = parseFloat(players[i].parentNode.childNodes[23].innerHTML);
		
		//console.log('Yards : ' + yards + ' Comp : ' + completions + ' Att : ' + attempts + ' TDs : ' + TDs + ' Ints : ' + Ints);
		
		var aa = (((completions/attempts) * 100) -30) / 20;
		var bb = ((TDs/attempts) * 100) / 5;
		var cc = (9.5 - ((Ints/attempts) * 100)) / 4;
		var dd = ((yards/attempts) - 3) / 4;
		
		//console.log(aa + ' - ' + bb + ' - ' + cc + ' - ' + dd);
		
		//a, b, c and d can not be greater than 2.375 or less than zero.  
		//stats_table

		QBratingHandle = Math.round(((aa + bb + cc + dd) / 0.6)*100)/10;
		
		if (QBratingHandle > 152.1) 
		{
				QBratingHandle = 152.1;
		}

		var y = document.createElement("div");
		y.className = "position QB";
		y.innerHTML = QBratingHandle;
		
		//console.log('Adding to : ' + players[i].parentNode.childNodes[3].innerHTML + ' a rating of ' + QBratingHandle);
		
		players[i].parentNode.childNodes[3].removeChild(players[i].parentNode.childNodes[3].firstChild);
		players[i].parentNode.childNodes[3].appendChild(y);
	
		//console.log('Adding to : ' + players[i].parentNode.childNodes[3].innerHTML);
	
	}
}

var positions = [];

loadCss();

modifyPlayers();

$(document).ready(function() 
    { 
		console.log('execute Jquery');
		jQuery("#body_container #content .stats_table").attr("id","stats_table");
		//jQuery("#stats_table").attr("id","stats_table");
        jQuery("#body_container #content .stats_table").tablesorter({sortList:[[0,0],[2,1]], widgets: ['zebra']}); 
		//jQuery(".stats_table").tablesorter({sortList:[[0,0],[2,1]], widgets: ['zebra']}); 
		jQuery("#stats_table").tablesorter({sortList:[[0,0],[2,1]], widgets: ['zebra']}); 
		console.log('done with Jquery');
    } 
); 