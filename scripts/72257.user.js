// ==UserScript==
// @name           GLB Add Pancaked Count to Game Logs
// @namespace      GLB
// @author         DDCUnderground
// @include        http://goallineblitz.com/game/player_game_log.pl?player_id=*
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

function getgameinfo(gameId, playerId, rownum){
	$.get("http://goallineblitz.com"+gameId,function(returned_data){
		var tablerow = $('tr[class*="player_'+playerId+'"]:eq(0)',$('table:eq(28),table:eq(29)',returned_data));
		var pnkcnt = $('td[class="box_score_player_stat"]:last',tablerow).text();
		var pnkrow = buildobj('td','align',"right");
		if (pnkcnt.length<1) {
			pnkcnt=0;
		}
		pnkrow.innerHTML = pnkcnt;
		$('tr[class="alternating_color1"], tr[class="alternating_color2"]', $('#career_stats')).each(function(z){
			if (z==rownum) {
				$(this).append(pnkrow);
			}
		})
	})
}

function doPnks(){
	$('#butpkd').hide();
	var tdrow = buildobj('td','align',"center",'colspan',"1",'class',"career_stat_head");
	tdrow.innerHTML="Pnkd";
	$('tr[class="nonalternating_color"]', $('#career_stats')).append(tdrow);
	var tdrow2 = buildobj('td','align',"right");
	tdrow2.innerHTML = 'Pnkd';
	$('tr[class="nonalternating_color2"]', $('#career_stats')).append(tdrow2);
	$('tr[class="alternating_color1"], tr[class="alternating_color2"]', $('#career_stats')).each(function(z){
		var gameid = $('a[href*="/game/game.pl?game_id="]:eq(0)',$(this)).attr('href');
		getgameinfo(gameid, playerid, z);
	})

}

// build button for adding stats
var addpkdbut = buildobj('input','type','button','value','Add Pancaked','id','butpkd','name','butpkd');
$(addpkdbut).insertBefore($('div[class*="tabs"]'));
$('#butpkd').bind('click',doPnks);

// get player id
var amploc = window.location.href.indexOf('&');
if (amploc==-1) {
	amploc = window.location.href.length;
}
var playerid = window.location.href.substring(window.location.href.indexOf('player_id=')+10, amploc);


})
