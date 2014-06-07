// ==UserScript==
// @name           GLB Avg Age of Roster
// @namespace      GLB
// @description    Adds Average age to roster
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
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
		var linkdiv = buildobj('div','id',"avgagelinkdiv",'class',"tab_off");
		var linklink = buildobj('a','id','ddcavgagelink');
		var linktextnode = document.createTextNode('Load Avg Age');
		linklink.appendChild(linktextnode);
		linklink.addEventListener('click',doAvgAge, false);
		linkdiv.appendChild(linklink);
		$('div[class*="subhead_link_bar"]',$('#page_roster')).append(linkdiv);
	}


	function doAvgAge(){
		$('#avgagelinkdiv').hide();
		for (var q=0;q<2;q++) {
			$('tr[class*="alternating_color1"], tr[class*="alternating_color2"]').each(function(z){
				if ($('span[class="cpu"]',$(this)).length == 0){
					if (q==0){
						agecountdown++;
					}else{
						var playerlink = $('a[href*="/game/player.pl?player_id="]:first',$(this)).attr('href');
						$.get("http://goallineblitz.com"+playerlink,function(returned_data){
							agecountdown = agecountdown-1;
							humanplayers++;
							var createdon = $('td[class="vital_data"]:eq(2)',returned_data).text();
							createdon = createdon.substring(createdon.indexOf(' - ')+3,createdon.indexOf('d old'));
							createdon = parseInt(createdon);
							totalage+=createdon;
							if (agecountdown==0) {
								var totalavgage = Math.round(totalage/humanplayers);
								var htmladdition = 'Human Players: '+ humanplayers + ' Avg Age: ' + totalavgage;
								var oldhtml = $('div[class="medium_head"]:first').html();
								$('div[class="medium_head"]:first').html(oldhtml + htmladdition);
							}
						})
					}
					
				}
			})
		}
	}


	var totalage = 0;
	var humanplayers = 0;
	var agecountdown = 0;
	buildlink();

})
