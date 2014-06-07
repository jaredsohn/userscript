// ==UserScript==
// @name          	Numbers in scouting report
// @description    	Adds numbers to the scouting report bars
// @namespace      	http://goallinebliz.com
// @include        	http://goallineblitz.com/game/player.pl?player_id=*
// @copyright       2009, garrettfoster
// @version      	2010.05.31
// ==/UserScript==

window.setTimeout(main,10);

function main(){ 

	var scoutingBar = document.getElementsByClassName('rating_bar_fill');
	for (var i=0;i<scoutingBar.length;i++){ 			
		var width = parseInt(scoutingBar[i].style.width.split('%')[0]);
		var fill = parseInt(scoutingBar[i].className.split('rating_bar_fill')[2].split('_')[1]) - 20.5;
		var number = 0;		
		if (width > fill){
			scoutingBar[i].innerHTML = width;
		}	else {
			scoutingBar[i].innerHTML = fill;
		}		
	}	
}
