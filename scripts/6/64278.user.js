// ==UserScript==
// @name           Watch Game Score
// @namespace      http://goallinebliz.com
// @include        http://goallineblitz.com/game/game.pl?game_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$(document).ready(function(){


	var team1 = $('a:first',$('td[class="team_name"]:eq(1)')).text();
	var team2 = $('a:first',$('td[class="team_name"]:eq(2)')).text();

	var current_team=0;
	var team1_score=0;
	var team2_score=0;

	var scoreToAdd = 0;

    $('td[class*="pbp_play"], tr[class*="pbp_team"]', $('#play_by_play_table')).each(function(x){
		var curtext = $(this).text();
		var tagnm = $(this).attr('tagName');
		if (tagnm =="TR") {
			if (curtext.indexOf(team1)>-1) {
				current_team = team1;
			}else if (curtext.indexOf(team2)>-1){
				current_team = team2;
			}
		} 
		if(curtext.indexOf("[TD]")!=-1){
			scoreToAdd = 6;
		}else if(curtext.indexOf("[SAFETY]")!=-1){
			scoreToAdd = 2;
		}else if(curtext.indexOf("made [XP]")!=-1){
			scoreToAdd = 1;
		}else if(curtext.indexOf("made [FG]")!=-1){
			scoreToAdd = 3;
		}
	
		if(current_team==team1){
			team1_score = team1_score + scoreToAdd;
		}else{
			team2_score = team2_score + scoreToAdd;
		}
		if(scoreToAdd!=0)
		{
			$(this).append(" ["+team1+": "+team1_score+" | "+team2+": "+team2_score+"]");
			scoreToAdd = 0;
		}
	})

});
