// ==UserScript==
// @name           pbp enhancer
// @namespace      goallineblitz.com
// @description    Counts how many formations you have in this section
// @include        http://glb2.warriorgeneral.com/game/game/*
// @copyright      2014, Trey Patterson
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version        2014.01.02
// ==/UserScript==

window.setTimeout(main,10); //needed to start greasemonkey

// Create div to store text box and button
$("#profile").append('<div id="pbpInputs"></div>');
// Create text box for team ID
$("#pbpInputs").append('Enter Team ID: <input type="text" id="pbpTeamId"></input>');
// Create button to click on
$("#pbpInputs").append('<button type="button" id="RunScript">Click Here');
document.getElementById ("RunScript").addEventListener (
    "click", processPbp, false
);
// Create div to store results
$("#pbpInputs").append('<div id="pbpOutputs"></div>');
/*
	Target Results:
	Plays for loss (grab play name and formation?)
	Runner for loss
	pitch plays
	Knock looses - player involved

*/
function main() {

}
var playsForLoss = 0;
var playerForLoss = new Array();
var pitchPlayCount = 0;
var playsKnockedLoose = 0;
var playerKockedLoose = new Array();
var playString = '';
var runPlayRegExp = /(HB|(WR[0-9])|TE|FB)([\s\S]+)(?= for)/;
var passPlayRegExp = /(HB|(WR[0-9])|TE|FB)([\s\S]+)(?=,)/;
var teamID = '';

function processPbp () {
	alert("Starting search");
	$(".pbp_play").each(function() {
		playString = this.innerHTML;
		if (playString.indexOf('loss') > -1) {
			playsForLoss++;
			if (playString.match(runPlayRegExp) !== null || playString.match(passPlayRegExp) !== null) {
				if (playString.match(runPlayRegExp) !== null) {
					playerForLoss.push(playString.match(runPlayRegExp)[1]);
				} else {
					playerForLoss.push(playString.match(passPlayRegExp)[1]);
				}
			}
		} // end of loss
		if (playString.indexOf('pitch') > -1) {
			pitchPlayCount++;
		}
		if (playString.indexOf('secure') > -1) {
			playsKnockedLoose++;
			if (playString.match(passPlayRegExp) !== null) {
				playerForLoss.push(playString.match(passPlayRegExp)[1]);
			}
		}
	});

	$("#pbpOutputs").append('<p>Plays for loss: ' + playsForLoss + '</p>');
	$("#pbpOutputs").append('<p>Pitch Plays: ' + pitchPlayCount + '</p>');
	$("#pbpOutputs").append('<p>Plays for knocked loose: ' + playsKnockedLoose + '</p>');
}

// This matches one set: /(HB|(WR[0-9])|TE|FB)([\s\S]+)(?= for)/
// This matches another set /(HB|(WR[0-9])|TE|FB)([\s\S]+)(?=,)/
// CSS for the items
$("#pbpInputs").css({"background-color":"grey","position":"relative"});
$("#pbpOutputs").css({"background-color":"green","position":"relative","width":"200px","height":"300px"});