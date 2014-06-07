// ==UserScript==
// @name           GLB Cut CPU Players - pabst fix
// @namespace      GLB
// @description    Cuts CPU layers to the minimum 
// @author	   DDCUnderground
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @include        http://glb.warriorgeneral.com/game/roster.pl?team_id=*
// @require        http://userscripts.org/scripts/source/74204.user.js
// @version	   14.02.26-pabst
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



	function cutAllCPUS(){
		$('#ddccutcpus').attr('value','Working');
		$('#ddccutcpus').attr("disabled", "true");

		$('tr[class="alternating_color1"],tr[class="alternating_color2"]').each(function(z){
			//if (z<2) {
				if ($('span[class="cpu"]',$(this)).length > 0) {
					var playerid  = $('a[href*="/game/player.pl?player_id="]',$(this)).attr('href');
					playerid = playerid.substring(playerid.indexOf('player_id=')+10,playerid.length);
					var upgradeData = 'action=Confirm Release&&player_id=' + playerid;
					$.ajax({
						 async: false,
						 type: 'POST',
						 url: "/game/cut_player.pl?player_id="+playerid,
						 data: encodeURI(upgradeData),
						 success: function(returned_data) {
						}
					})
				}
			//}
		})
		window.location.reload();

	}

	var cutcpusbut = buildobj('input','type','button','id','ddccutcpus','Value','Cut CPUs');
	var linebreak = buildobj('br');
	$('.medium_head:first').append(linebreak);
	$('.medium_head:first').append(cutcpusbut);
	$('#ddccutcpus').bind('click',cutAllCPUS, false);

})
