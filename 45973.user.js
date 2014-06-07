// ==UserScript==
// @name         Nexus War Raid Calculator
// @namespace    http://nw.raid.calculator/arundor
// @description  Displays various raid related statistics on Nexus War faction pages.
// @include      http://www.nexuswar.com/factions/view.do?factionID=*
// ==/UserScript==

var url = parent.document.URL;
if (url.indexOf('&') != -1) {
	return;
}

var factionlevel;
var karma;
var members;
var flagshield;
var ward = 1500;

var vitals = document.getElementById('profilevitals');
var vital_items = vitals.getElementsByTagName('span');

for (var i=0; i<vital_items.length; i++) {
	if (vital_items[i].innerHTML.search(/A Level \d+/) != -1) {
		factionlevel = vital_items[i].innerHTML.split(' ')[2];
	}
	if (vital_items[i].innerHTML.search(/\d+ Infused Tiles \(\d+ Karma\)/) != -1) {
		karma = vital_items[i].innerHTML.split('(')[1].split(' ')[0];
	}
	if (vital_items[i].innerHTML.search(/(\d+ Members)/) != -1) {
		members = vital_items[i].innerHTML.split(' ')[0];
	}
}

var upgrades = document.getElementById('pupgrades');
var upgrade_items = upgrades.getElementsByTagName('tr');

for (var i=0; i<upgrade_items.length; i++) {
	if (upgrade_items[i].innerHTML.search(/Level \w+ Ward Strength Increase/) != -1) {
		if ((upgrade_items[i].innerHTML.indexOf('Active') != -1) || (upgrade_items[i].innerHTML.indexOf('Deactivate') != -1)) {
			if (upgrade_items[i].innerHTML.indexOf('One') != -1) {
				ward += 100;
			}
			if (upgrade_items[i].innerHTML.indexOf('Two') != -1) {
				ward += 100;
			}
			if (upgrade_items[i].innerHTML.indexOf('Three') != -1) {
				ward += 200;
			}
			if (upgrade_items[i].innerHTML.indexOf('Four') != -1) {
				ward += 200;
			}
			if (upgrade_items[i].innerHTML.indexOf('Five') != -1) {
				ward += 300;
			}
		}
	}
}

flagshield = 2 * members + 5 * karma;
var flags = document.getElementById('flags');
var ally_flags = flags.innerHTML.split('class="pla"').length - 1;
var your_flags = (flags.innerHTML.split('class="plf"').length - 1);


var vitalsData = vitals.innerHTML;

var newBox = '<table style="width: 100%">';
newBox += '<tr><td colspan="2"><span style="font-weight: bold">Defenses</span></td></tr>';
newBox += '<tr style="border: 1px solid #aaaaaa"><td>Maximum Ward:</td><td>' + ward + '</td></tr>';
newBox += '<tr style="border: 1px solid #aaaaaa"><td>Maximum Flagshield:</td><td>' + flagshield + '</td></tr>';

newBox += '<tr><td colspan="2"><span style="font-weight: bold"><br />Recap Opportunities</span></td></tr>';
newBox += '<tr style="border: 1px solid #aaaaaa"><td>Ally Flags:</td><td>' + ally_flags + '</td></tr>';
newBox += '<tr style="border: 1px solid #aaaaaa"><td>Your Flags:</td><td>' + your_flags + '</td></tr>';
newBox += '<tr style="border: 1px solid #aaaaaa"><td><span style="font-style: italic">Total Recap Honour:</span></td><td>' + parseInt((ally_flags * 8) + (your_flags * 10)) + '</td></tr>';

newBox += '<tr><td colspan="2"><span style="font-weight: bold"><br />Raid Honour</span></td></tr>';
newBox += '<tr><td colspan="2"><table style="border: 1px solid #aaaaaa; width: 100%">';
newBox += '<tr><td colspan="2">Enter your faction level:</td></tr>';
newBox += '<tr><td colspan="2"><input id="arundor_input" type="text" maxlength="2" style="width: 60px" /><button id="arundor_button" style="margin-left: 10px">Calculate</button></td></tr>';
newBox += '<tr><td colspan="2" id="arundor_td"></td></tr>';
newBox += '</td></tr></table>';

newBox += '</table>';

vitals.innerHTML = '<table><tr><td style="width: 75%">' + vitalsData + '</td><td style="vertical-align: top">' + newBox + '</td></tr></table>';

document.getElementById('arundor_button').addEventListener('click', calculateHonour, false);

function calculateHonour() {
	var attackerlevel = parseInt(document.getElementById('arundor_input').value);
	if (attackerlevel) {
		var honour = 20 - ((attackerlevel - factionlevel) * 4);
		var td = document.getElementById('arundor_td');
		if (td) {
			td.innerHTML = '<br />You would gain <span style="font-weight: bold">' + honour + '</span> honour for a successful unassisted raid.';
		}
	}
}
