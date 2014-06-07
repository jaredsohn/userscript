// ==UserScript==
// @name        OGame Redesign: Coords in rank page
// @namespace   Zaffa
// @description Shows the coordinates of each player in the ranking page.
// @include     http://*.ogame.*/game/index.php?page=highscore*
// @version     0.3
// @grant		none
// @author		Francesco Zaffaroni
// ==/UserScript==

//Function scrivi is the main function, that take care of writing the coordinates.

var scrivi = function scrivi(){
		var table = document.getElementById('ranks');
		var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		for(i=0; i< rows.length; i++)
		{
			var name = rows[i].getElementsByTagName('td')[2];

			var links = name.getElementsByTagName('a');
			var link = (links.length>1) ? links[1].href : links[0].href;

			var coord = link.replace(/.+galaxy=([0-9]+)&system=([0-9]+)&position=([0-9]+)/g, "$1:$2:$3");

			if(name.getElementsByClassName('coords').length === 0){

			var coordspan = document.createElement('span');
			coordspan.innerHTML = '<strong>['+coord+']</strong>';
			coordspan.className = "coords"
			name.appendChild(coordspan);
		}

		}
};

//create a string containing the function
var fscrivi = scrivi.toString();
//create a function, that acts after ajax conent loaded
var strFunc = (function(){
	$("#stat_list_content").ajaxSuccess(function(e,xhr,settings){

		scrivi();
	});
}).toString();
//append a script that contain the main funciton for successive requests
//and the strFunc(), to execute scrivi() every time ajax content loads
var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = fscrivi + "\n" + "(" + strFunc + ")();";
document.body.appendChild(script);

//executes the function for the first time
scrivi();