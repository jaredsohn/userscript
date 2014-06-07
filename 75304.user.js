// ==UserScript==
// @name           GLB Position on stats page
// @namespace      GLB
// @description    GLB Position on stats page
// @include        http://goallineblitz.com/game/stats.pl*
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==
// 

$(document).ready(function(){

	// functions
	var buildobj = function(a){
		var newobj = document.createElement(arguments[0]);
		for (var varval = 1; varval < arguments.length; varval++) {
			newobj.setAttribute(arguments[varval],arguments[varval+1]);
			varval++;
		};
		return newobj;
	};
	
	
	function buildlink(){
		var linkdiv = buildobj('div','id',"linkdiv",'class',"tab_off");
		var linklink = buildobj('a','id','ddcpositionlink');
		var linktextnode = document.createTextNode('Load Positions');
		linklink.appendChild(linktextnode);
		linklink.addEventListener('click',doPositions, false);
		linkdiv.appendChild(linklink);
		$('div[class*="subhead_link_bar"]',$('#page_league_leaders')).append(linkdiv);
	}

	function doPositions(){
		$('a[href*="/game/player.pl?player_id="]',$('table[class="stats_table"]:first')).each(function(z){
			$.get("http://goallineblitz.com" + $(this).attr('href'), function(returned_data){
				var playerposition = $('div[class*="position"]:first',returned_data).text();
				var playerhtml = $('a[href*="/game/player.pl?player_id="]:eq(' + z + ')',$('table[class="stats_table"]:first')).html();
				$('a[href*="/game/player.pl?player_id="]:eq(' + z + ')',$('table[class="stats_table"]:first')).html(playerhtml + '(' + playerposition + ')');
			})
		})
	}

	buildlink();

})
