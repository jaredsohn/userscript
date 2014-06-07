// ==UserScript==
// @name           Get Scouting Data
// @namespace      SN
// @include        http://goallineblitz.com/game/scout_team.pl?team_id=*
// @copyright      2010, SeattleNiner
// @version        11.29.10
// ==/UserScript==

window.setTimeout( function() {
    var button = document.createElement("input");
    button.setAttribute("value","Get Scouting Data");
    button.setAttribute("type","button");
    button.addEventListener("click", main, true);
	  button.setAttribute("id","Getbutton");

	var footer = document.getElementById("footer");
	footer.parentNode.insertBefore(button, footer);

}, 100);

var runs;
var numpasses;
var datarun = new Array();
var datapass = new Array();

function main() {
	//document.getElementById("Getbutton").disabled = "true"; // UNDO THIS LATER

		var runs = document.getElementById("top_plays_run")
		    alert( runs);
		for (var t=0; t<runs.length; t++) {
//			console.log(teams[t].href.toString());
			var runplay = runs.getElementsByTagName("a");
			//alert ( runplay[t].href.toString() );
			alert( "HELLO" );
		}

	setTimeout(finish, 2000);
}


