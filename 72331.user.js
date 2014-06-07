// ==UserScript==
// @name           GLB Deflection Stats
// @namespace      GLB
// @author         DDCUnderground
// @description    Collects stats on a by player basis for a selected # of games
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

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
	var linklink = buildobj('a','id','ddcdeflectlink');
	var linktextnode = document.createTextNode('Deflect Stats');
	linklink.appendChild(linktextnode);
	linklink.addEventListener('click',doStats, false);
	linkdiv.appendChild(linklink);
	$('div[class*="subhead_link_bar"]',$('#page_box_score')).append(linkdiv);
}

function doStats(){
	// get game ids
	var othergamesprompt = prompt('Please enter other game IDs seperated by semi-colons','');
    if (othergamesprompt==null) {
        alert('No Other Game IDs entered! Exiting Now');
        return 0;
    }
    othergamesprompt = othergamesprompt.replace(/ /g,'');
    if (othergamesprompt.length == 0 || othergamesprompt==null) {
        alert('No Other Game IDs entered! Exiting Now');
        return 0;
    }
	// parse game ids 
	var othergames = othergamesprompt.split(';');
    
    
    workingwindow=window.open('',"Working", "width=130,height=120,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
	$('#linkdiv').hide();
	if (!workingwindow.opener) workingwindow.opener = self;
    workingwindow.document.writeln('Working...');
	// get team name & link
	var team1 = '';
	var team2 = '';
	$('tr[class*="team_row"]',$('#scoreboard')).each(function(j){
		var teamrowcnt = teamsarr.length;
		teamsarr[teamrowcnt] = new Array();
		teamsarr[teamrowcnt][0] = $('td:eq(0)',$(this)).text();
		if (j==0) {
			team1 = $('td:eq(0)',$(this)).text();
		} else {
			team2 = $('td:eq(0)',$(this)).text();
		}
		teamsarr[teamrowcnt][1] = 'http://goallineblitz.com' + $('a:eq(0)',$(this)).attr('href');
	})
	
	// store stats
	var currentd = '';
	var currento = '';
	// loop through each play
	$('tbody',$('#play_by_play_table')).each(function(z){
		if ($('tr[class*="pbp_team"]', $(this)).length>0) {
			var curteam = $('tr[class*="pbp_team"]', $(this)).text();
			if (curteam.indexOf(team1)>-1) {
				currento=team1;
				currentd=team2;
			}else{
				currento=team2;
				currentd=team1;
			}
		}
		curplaytext = $('.pbp_play',$(this)).text();
		if (curplaytext.indexOf(' [deflected by')>-1) {
			var defplayer = curplaytext.substring(curplaytext.indexOf(' [deflected by') + 15, curplaytext.indexOf(']', curplaytext.indexOf('[deflected by')));
			var defcaught = 0;
			if (curplaytext.indexOf(', caught [deflected by') > -1) {
				defcaught = 1;
			}
			var foundplayer = -1;
			for (var w=0;w<playersarr.length;w++) {
				if (playersarr[w][0] == defplayer) {
					foundplayer = w;
				}
			}
			if (foundplayer == -1) {
				var playcnt = playersarr.length;
				playersarr[playcnt] = new Array();
				playersarr[playcnt][0] = defplayer;
				playersarr[playcnt][1] = 1;
				playersarr[playcnt][2] = defcaught;
				playersarr[playcnt][3] = currentd;
			} else {
				playersarr[foundplayer][1]++;
				playersarr[foundplayer][2] = playersarr[foundplayer][2] + defcaught;
			}
		}
	})

	// loop through games and process the same as above
	for (var t = 0;t<othergames.length;t++) {
		var curpull = 0;
		$.get('http://goallineblitz.com/game/game.pl?game_id=' + othergames[t] + '&mode=pbp',function(returned_data){
			// get team name & link
			var team1 = '';
			var team2 = '';
			$('tr[class*="team_row"]',$('#scoreboard', returned_data)).each(function(j){
				var foundteam = 0;
				for (var s=0;s<teamsarr.length;s++) {
					if (teamsarr[s][0] == $('td:eq(0)',$(this)).text()){
						if (j==0) {
							team1 = $('td:eq(0)',$(this)).text();
						} else {
							team2 = $('td:eq(0)',$(this)).text();
						}
						foundteam =1;
					}
				}
				if (foundteam==0) {
					var teamrowcnt = teamsarr.length;
					teamsarr[teamrowcnt] = new Array();
					teamsarr[teamrowcnt][0] = $('td:eq(0)',$(this)).text();
					if (j==0) {
						team1 = $('td:eq(0)',$(this)).text();
					} else {
						team2 = $('td:eq(0)',$(this)).text();
					}
					teamsarr[teamrowcnt][1] = 'http://goallineblitz.com' + $('a:eq(0)',$(this)).attr('href');
				}
			})
			
			// store stats
			var currentd = '';
			var currento = '';
			// loop through each play
			$('tbody',$('#play_by_play_table', returned_data)).each(function(z){
				if ($('tr[class*="pbp_team"]', $(this)).length>0) {
					var curteam = $('tr[class*="pbp_team"]', $(this)).text();
					if (curteam.indexOf(team1)>-1) {
						currento=team1;
						currentd=team2;
					}else{
						currento=team2;
						currentd=team1;
					}
				}
				curplaytext = $('.pbp_play',$(this)).text();
				if (curplaytext.indexOf(' [deflected by')>-1) {
					var defplayer = curplaytext.substring(curplaytext.indexOf(' [deflected by') + 15, curplaytext.indexOf(']', curplaytext.indexOf('[deflected by')));
					var defcaught = 0;
					if (curplaytext.indexOf(', caught [deflected by') > -1) {
						defcaught = 1;
					}
					var foundplayer = -1;
					for (var w=0;w<playersarr.length;w++) {
						if (playersarr[w][0] == defplayer) {
							foundplayer = w;
						}
					}
					if (foundplayer == -1) {
						var playcnt = playersarr.length;
						playersarr[playcnt] = new Array();
						playersarr[playcnt][0] = defplayer;
						playersarr[playcnt][1] = 1;
						playersarr[playcnt][2] = defcaught;
						playersarr[playcnt][3] = currentd;
					} else {
						playersarr[foundplayer][1]++;
						playersarr[foundplayer][2] = playersarr[foundplayer][2] + defcaught;
					}
				}
			})
			curpull++;
			if (curpull == othergames.length) {
				// present stats in html format
				playersarr.sort(value);
				workingwindow.close();
				resultswindow=window.open('',"Results", "width=420,height=640,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
				if (!resultswindow.opener) resultswindow.opener = self;
				resultswindow.document.writeln('<table><tr><td><b>Player</b></td><td><b>Deflections</b></td><td><b>Deflections Caught</b></td><td align="center"><b>Team</b></td></tr>');
				for (var ww=0;ww<playersarr.length;ww++) {
					resultswindow.document.writeln('<tr><td>' + playersarr[ww][0] + '</td><td align="center">' + playersarr[ww][1] + '</td><td align="center">' + playersarr[ww][2] + '</td><td>' + playersarr[ww][3] + '</td></tr>');
				}
				resultswindow.document.writeln('</table>');
			}
		})
	}

	
}

function value(a,b) {
	var ahold ='';
	var bhold ='';
	ahold += a[loop];
	bhold += b[loop];
	
	if(isNaN(parseInt(ahold))==false) {
		ahold=parseInt(ahold);
		bhold=parseInt(bhold);
	}
	a=ahold;
	b=bhold;
	if (sortdirection==0) {
		return a == b ? 0 : (a < b ? -1 : 1)
	}else{
		return a == b ? 0 : (a > b ? -1 : 1)
	}
}

var teamsarr = new Array();
var playersarr = new Array();
var loop = 1;
var sortdirection = 1;

// build elements
buildlink();
})
