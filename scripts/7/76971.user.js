// ==UserScript==
// @name           GLB Add Arc to Marketplace
// @namespace      GLB
// @author 		   DDCUnderground
// @description    Adds Archetype to Marketplace
// @include        http://goallineblitz.com/game/market_free_agents.pl
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==
// 
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

	$('tr[class="alternating_color1"],tr[class="alternating_color2"]',$('table:last')).each(function(z){
		$.get('http://goallineblitz.com' + $('a:first',$(this)).attr('href'),function(returned_data){
			var playerarc = $('img[src*="/images/game/archetypes"]:first',returned_data).parent();
			var playerid = $('a:first',$('#tab_player_profile',returned_data)).attr('href');
			//alert(playerarc);
			if (typeof(playerarc) !='undefined') {
				$('a[href="'+ playerid + '"]').prepend(playerarc);
			}
		})
	})
})
