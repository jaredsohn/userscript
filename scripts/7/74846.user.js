// ==UserScript==
// @name           GLB Printer Friendly Tactics
// @namespace      GLB
// @description    Creates a Printer Friendly Tactics Popup
// @author         DDCUnderground
// @include        http://goallineblitz.com/game/player_tactics.pl?player_id=*
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


	function doPrint(){
		//get player position and level
		var profilelink = $('a[href*="/game/player.pl?player_id="]').attr('href');
		var playerpos = '';
		var playerlvl = '';
		profilelink = profilelink.substring(profilelink.indexOf('=')+1, profilelink.length);
		$.ajax({
			 async: false,
			 type: 'GET',
			 url: "http://goallineblitz.com/game/player.pl?player_id=" + profilelink,
			 success: function(returned_data) {
				playerpos = $('div[class*="position"]:first', returned_data).text();
				playerlvl = $('td[class="current_stats_value"]:first', returned_data).text();
				playerlvl = playerlvl.substring(0,playerlvl.indexOf('/'));
			}
		})



		var fullstring = '<font size =4><b>' + $('div[class*="big_head"]:first').text() + ' ' + playerpos + ' ' + playerlvl + '</b></font><br><br>';
		$('div[class*="tactic_group"]').each(function(z){
			$('div[class="tactic_head"], select, input[type="text"]', $(this)).each(function(x){
				if ((x % 2) == 0){
					fullstring += '<b>';
				}
				switch ($(this).attr('tagName').toLowerCase()) {
					case 'div':
						fullstring += $(this).text();
						break;
					case 'select':
						fullstring += $(this).val();
						break;
					case 'input':
						fullstring += $(this).attr('value');
						break;
				}
                if ((x % 2) != 0){
					fullstring += '<br>';
				}else{
					fullstring += '</b>&nbsp;&nbsp;&nbsp;&nbsp;';
				}
			})
		})
		workingwindow=window.open('',"Player Tactics", "width=300,height=400,scrollbars=yes,resizable=yes,toolbar=yes,location=no,menubar=yes");
		//$('#linkdiv').hide();
		if (!workingwindow.opener) workingwindow.opener = self;
		workingwindow.document.writeln(fullstring);
	}

	
	var printerdbut = buildobj('input','type','button','value','Print Friendly','id','printerdbut','name','printerdbut');
	$(printerdbut).insertBefore($('div[class="medium_head"]:eq(1)'));
	$('#printerdbut').bind('click',doPrint);
	

})
