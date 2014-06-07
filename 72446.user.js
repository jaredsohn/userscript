// ==UserScript==
// @name           GLB add effective value league page
// @namespace      GLB
// @description    Adds the Effective level to each of the teams on the league page
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
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

$('a[href*="/game/team.pl?team_id="]',$('#conferences')).each(function(t){
	var teamid = $(this).attr('href');
	teamid = teamid.substring(teamid.indexOf('=')+1);
	$.get('http://goallineblitz.com/game/roster.pl?team_id=' + teamid, function(returned_data){
		var avglevel = $('div[class="medium_head"]:eq(0)',returned_data).text();
		avglevel = avglevel.substring(avglevel.indexOf('('), avglevel.length);
		avglevel = avglevel.replace(/[^0-9]/g, '');
		var efflevel = $('div[class="medium_head"]:eq(1)',returned_data).text();
		efflevel = efflevel.substring(efflevel.indexOf('('), efflevel.length);
		efflevel = efflevel.replace(/[^0-9]/g, '');
		var teamlink = $('a:first',$('#tab_profile',returned_data)).attr('href');
		$('a[href="'+teamlink+'"]', $('#conferences')).parent().append('(' + avglevel + ')(' + efflevel + ')');
	})
})

})
