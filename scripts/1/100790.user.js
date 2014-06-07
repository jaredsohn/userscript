// ==UserScript==
// @name           Watch Game Score
// @namespace      GLB
// @description    Inserts the current score into a GLB game's play by play listing. Updated from unknown author's version to properly handle TDs, FGs, XPs, and safeties.
// @include        http://goallineblitz.com/game/game.pl?game_id=*
// @version        3.0
// @author         Doc_Nilla
// ==/UserScript==

window.setTimeout( 
	function() {
		runMain();
	}, 
	60
);


function runMain() {

	var plays = document.getElementsByClassName('pbp_play');
	var number_of_plays = plays.length;
	
	// If pbp_play elements were found, we're on the pbp page
	if (number_of_plays > 0) {
	
		var teams = document.getElementsByClassName('team_name');
		var team1 = teams[1].firstChild.innerHTML;
		var team2 = teams[2].firstChild.innerHTML;
		var team1_score = 0;
		var team2_score = 0;
		var current_team = '';
		
		for (var i = 0; i < number_of_plays; i++) {
			
			// Find each play's tbody element, extract the text
			// from the pbp_play td, and identify the pbp_team
			
			var play_id = i + 1;
			var play_container = document.getElementById('play_'+play_id);
			var pbp_team = play_container.getElementsByClassName('pbp_team');
			
			if (pbp_team.length > 0 && pbp_team[0].innerHTML.indexOf(team1) != -1) {
				current_team = team1;
			}
			else if (pbp_team.length > 0 && pbp_team[0].innerHTML.indexOf(team2) != -1) {
				current_team = team2;
			}
		
			var play = plays[i];
			var scoreToAdd = 0;
			var playText = play.innerHTML;
			
			// The following text in a play description usually
			// indicates a score, but creative player names
			// can cause false positives.
			
			if (playText.indexOf(", made [XP]") != -1) {
				scoreToAdd = 1;
			}
			if (playText.indexOf(" [SAFETY]") != -1) {
				scoreToAdd = 2;
			}
			if (playText.indexOf(", made [FG]") != -1) {
				scoreToAdd = 3;
			}
			if (playText.indexOf(" [TD]") != -1) {
				scoreToAdd = 6;
			}
		
			if (current_team == team1) {
				team1_score += scoreToAdd;
			}
			else {
				team2_score += scoreToAdd;
			}
			
			// If the score changed, append it to the end of the play description
			if (scoreToAdd != 0) {
				play.innerHTML += " ["+team1+": "+team1_score+" | "+team2+": "+team2_score+"]";
			}
			
		}
		
	}

}
