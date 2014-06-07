// ==UserScript==
// @name           Travian building & attack time in title
// @namespace      TWADZREM
// @include        http://*.travian.*/dorf1.php*
// @version        0.021
// @require        http://updater.usotools.co.cc/67147.js
// ==/UserScript==


// Edit settings below

var updateRate = 1000; // Interval to update movements & buildings status
var whichFirst = 1; // Which one is showed first in title. 1 for movements. Other number for buildings
var reportingLvl = 3; // 0 for total disabling. 1 for reporting only incoming attacks. 2 for incoming and outgoing attacks. 3 for incoming+outcgoing attacks and reinforcements. Note: only one movement showed at the time and incoming attack is in top of order.

// Dont edit anything below this line


// Initialize

var fullUrl = window.location.host

var parts = fullUrl.split('.')
var language = parts[2];

var m = document.getElementsByTagName("div");

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

var baseTitle = document.title;

function updBuildings() {

var contract = document.getElementById("building_contract");
if (contract == undefined) {
return false;
}
var m = contract.getElementsByTagName("span");
var tds = contract.getElementsByTagName("td");

var val = m[0].innerHTML;
if (val !== -1) {

var allthing = "[" + val + " till finishing " + tds[1].innerHTML + "";

var fullSeconds = val.split(":");
fullSeconds = fullSeconds[0] * 3600 + fullSeconds[1] * 60 + fullSeconds[2]*1;

allthing += "]";

}
else {
var allthing = "";
}
updAttacks(allthing);

setTimeout(updBuildings, updateRate);

}

function updAttacks(baseTitle) {

var movementsTrue = false;

buildthing = baseTitle;

var stopSearchz = false;
var stopSearch = false;

allthing = "[";

var myStats = [];

for ( var i in m ) {

var attribute = m[i].getAttribute("class");

    if (attribute == "dur_r") {

	if (stopSearch == false) {
	if (stopSearchz == true) {
	var movements = m[i].innerHTML;
	//movements = movements.replace('per&nbsp;<span id="timer1">', '');

	movements = movements.replace(langs[language]["TimerReplace"], '');

	movements = movements.replace(langs[language]["TimerEndReplace"], '');
	myStats[0] = movements + " @ ";
	}

	stopSearch = true;
	}

    }
    if (attribute == "mov") {
	if (stopSearchz == false) {

	var typez = "attack(s)";

	var movements = m[i].innerHTML;
	
	movementsTrue = true;

	if (movements.search(langs[language]["Attack"]) !== -1) {
	movements = movements.replace('&nbsp;' + langs[language]["Attack"] + '</span>', '');
	movements = movements.replace('&nbsp;' + langs[language]["MAttack"] + '</span>', '');

	if (movements.search("a1") !== -1 && reportingLvl >= 1) {
	typez = "incoming attack(s)";
	stopSearchz = true;
	}
	else if (reportingLvl >= 2) {
	typez = "outgoing attacks(s)";
	stopSearchz = true;
	}
	else {
	movementsTrue = false;
	}

	}
	else if (movements.search(langs[language]["ReInf"]) !== -1) {
	movements = movements.replace('&nbsp;' + langs[language]["ReInf"] + '</span>', '');
	
	if (movements.search("d1") !== -1 && reportingLvl >= 3) {
	typez = "incoming reinforcement(s)";
	stopSearchz = true;
	}
	else if (reportingLvl >= 3) {
	typez = "outgoing reinforcement(s)";
	stopSearchz = true;
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
    
} 

allthing += myStats[0] + myStats[1] + "]";
if (movementsTrue == true) {
if (whichFirst == 1) {
document.title = allthing + buildthing;
}
else {
document.title = buildthing + allthing;
}
}
else {
document.title = buildthing;
}
document.title += " - Travian";

}

window.onLoad = updBuildings();