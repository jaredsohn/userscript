// ==UserScript==
// @name           Travian attack time in title
// @namespace      TWADZREM
// @include        http://*.travian.*/dorf1.php
// @name 		Travian attack time in title
// @author		Firewolf
// @namespace 	Tatit
// @version 	0.02
// @description	If there is attack coming, shows time until it in title bar. Support for reinforcements, outgoing attacks and incoming attacks.
// @source 		-
// ==/UserScript==


// Edit settings below

var minimumTimeCheck = 1000; // Interval to update incoming attack status to title
var maximumTimeCheck = 360000; // If there are no activity, interval to update page to check are there any new activity
var useMaximumTime = true; // Is maximum time check (above) enabled
var reportingLvl = 3; // 0 for total disabling. 1 for reporting only incoming attacks. 2 for incoming and outgoing attacks. 3 for incoming+outcgoing attacks and 

reinforcements. Note: only one movement showed at the time and incoming attack is in top of order.

// Dont edit anything below this line


// Initialize

var fullUrl = window.location.host

var parts = fullUrl.split('.')
var language = parts[2];

var m = document.getElementsByTagName("div");
var timeToCheck = 1000;
var reloadThen = false;

// Language settings

var langs = [];

langs["lt"] = [];
langs["lt"]["Attack"] = "Puolimas";
langs["lt"]["MAttack"] = "Puolimas";
langs["lt"]["ReInf"] = "Pastipr.";
langs["lt"]["TimerReplace"] = /p[a-z]{1,2}&nbsp;<span id="timer[1-9]">/;
langs["lt"]["TimerEndReplace"] = "</span>&nbsp;val.";

langs["fi"] = [];
langs["fi"]["Attack"] = "Hyökkäys";
langs["fi"]["MAttack"] = "Hyökkäystä";
langs["fi"]["ReInf"] = "Vahvistuksia";
langs["fi"]["TimerReplace"] = /&nbsp;<span id="timer[1-9]">/;
langs["fi"]["TimerEndReplace"] = "</span>&nbsp;";

langs["com"] = [];
langs["com"]["Attack"] = "Attack";
langs["com"]["MAttack"] = "Attacks";
langs["com"]["ReInf"] = "Reinforcement";
langs["com"]["TimerReplace"] = /in &nbsp;<span id="timer[1-9]">/;
langs["com"]["TimerEndReplace"] = "</span>&nbsp; Hrs";


function updAttacks() {

if (reloadThen == true) {
window.location.reload();
}

var movementsTrue = false;

var allthing = "[";

var myStats = [];

for ( var i in m ) {

var attribute = m[i].getAttribute("class");

    if (attribute == "dur_r") {
	var movements = m[i].innerHTML;
	//movements = movements.replace('per&nbsp;<span id="timer1">', '');

	movements = movements.replace(langs[language]["TimerReplace"], '');

	movements = movements.replace(langs[language]["TimerEndReplace"], '');
	myStats[0] = movements + " @ ";
    }
    if (attribute == "mov") {

	var typez = "attack(s)";

	var movements = m[i].innerHTML;
	
	movementsTrue = true;

	if (movements.search(langs[language]["Attack"]) !== -1) {
	movements = movements.replace('&nbsp;' + langs[language]["Attack"] + '</span>', '');
	movements = movements.replace('&nbsp;' + langs[language]["MAttack"] + '</span>', '');

	if (movements.search("a1") !== -1 && reportingLvl >= 1) {
	typez = "attack(s)";
	}
	else if (reportingLvl >= 2) {
	typez = "outgoing attacks(s)";
	}
	else {
	movementsTrue = false;
	}

	}
	else if (movements.search(langs[language]["ReInf"]) !== -1) {
	movements = movements.replace('&nbsp;' + langs[language]["ReInf"] + '</span>', '');
	
	if (movements.search("d1") !== -1 && reportingLvl >= 3) {
	typez = "reinforcement(s)";
	}
	else if (reportingLvl >= 3) {
	typez = "outgoing reinforcement(s)";
	}
	else {
	movementsTrue = false;
	}
	
	}
	else {
	movementsTrue = false;
	}


	movements = movements.replace(/<span class="[ad][12]">/, '');

	myStats[1] = movements + " " + typez;

    }
    
} 

allthing += myStats[0] + myStats[1] + "] - Travian";

if (movementsTrue == true) {
document.title = allthing;
timeToCheck = minimumTimeCheck;
}
else {
if (useMaximumTime == true) {
timeToCheck = maximumTimeCheck;
reloadThen = true;
}
else {
timeToCheck = 99999999999999999999999999999999;
}
}


setTimeout(updAttacks, timeToCheck);

}

window.onLoad = updAttacks();