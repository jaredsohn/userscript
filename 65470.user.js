// ==UserScript==
// @name           Galaxy-Network: Verbessertes Taktikzentrum
// @namespace      http://userscripts.org/scripts/show/65470
// @description    Markiert die ein- und ausgehenden Angriffe im Taktikscreen farblich nach der Deffbarkeit.
// @include        http://www.galaxy-network.de/game/gala-taktiks.*
// @include        http://galaxy-network.de/game/gala-taktiks.*
// @include        http://www.galaxy-network.net/game/gala-taktiks.*
// @include        http://galaxy-network.net/game/gala-taktiks.*
// @version        1.0
// ==/UserScript==

// ==Konfiguration==
var showOrbDeff = false; //Zeige * wenn mit AJ deffbar und ** wenn mit LO deffbar
var showTimeLeft = false; //Zeige Minuten bis zum nächsten "Farbwechsel" z.B. 17m
// ==/Konfiguration==

const TICK_LENGTH = 15;
const EXT_DEFF_TICKS = 24;
const BND_DEFF_TICKS = 22;
const ALLY_DEFF_TICKS = 20;
const GALA_DEFF_TICKS = 18;
const AJ_DEFF_TICKS = 8;
const LO_DEFF_TICKS = 18;

const TIME_MODES = [ {
	'getValues': function(remaining) { return new RegExp(/(\d+)\sMin/).exec(remaining); },
	'getTicks': function(values) { return parseInt(values[1]) / TICK_LENGTH; },
	'isUnique': false
}, {
	'getValues': function(remaining) { return new RegExp(/(\d+):(\d+):(\d+)/).exec(remaining); },
	'getTicks': function(values) {
		return (4 * parseInt(values[1])) + (parseInt(values[2]) / TICK_LENGTH) +
			(parseInt(values[3]) / 60 / TICK_LENGTH);
	},
	'isUnique': true
}, {
	'getValues': function(remaining) { return new RegExp(/(\d+):(\d+)/).exec(remaining); },
	'getTicks': function(values) { return (4 * parseInt(values[1])) + (parseInt(values[2]) / TICK_LENGTH); },
	'isUnique': true
}, {
	'getValues': function(remaining) { return new RegExp(/(\d+)\sStd/).exec(remaining); },
	'getTicks': function(values) { return parseInt(values[1]) * 60 / TICK_LENGTH; },
	'isUnique': false
}, {
	'getValues': function(remaining) { return new RegExp(/(\d+)\sSek/).exec(remaining); },
	'getTicks': function(values) { return parseInt(values[1]) / 60 / TICK_LENGTH; },
	'isUnique': false
}, {
	'getValues': function(remaining) { return new RegExp(/(.*)/).exec(remaining); },
	'getTicks': function(values) { return parseInt(values[1]); },
	'isUnique': true
}];

var selectedMode = null;
var incs = document.evaluate(
	'//*[@id="content"]/tbody/tr/td/center/table/tbody/tr/td/div/div/table/tbody/tr/td/div/table/tbody/tr[@class="R"]/td[position() mod 4 = 0]/nobr',
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = incs.snapshotLength - 1; i >= 0; --i) {
	var inc = incs.snapshotItem(i);
	var usedDeffTicks = null;
	var ticksRemaining = getTicks(inc.textContent) + 1 - (1 / (TICK_LENGTH * 60));
	var ticks = parseInt(ticksRemaining);
	if (ticks >= EXT_DEFF_TICKS) {
		inc.style.color = 'green';
		usedDeffTicks = EXT_DEFF_TICKS;
	}
	else if (ticks >= BND_DEFF_TICKS) {
		inc.style.color = 'yellow';
		usedDeffTicks = BND_DEFF_TICKS;
	}
	else if (ticks >= ALLY_DEFF_TICKS) {
		inc.style.color = 'orange';
		usedDeffTicks = ALLY_DEFF_TICKS;
	}
	else if (ticks >= GALA_DEFF_TICKS) {
		inc.style.color = 'red';
		usedDeffTicks = GALA_DEFF_TICKS;
	}
	else {
		inc.style.color = 'brown';
	}
	
	if (showTimeLeft || showOrbDeff) {
		additionalText = document.createElement('span');
		additionalText.setAttribute('style', '-moz-user-select: none; -khtml-user-select: none;');
	
		if (showTimeLeft && usedDeffTicks) {
			additionalText.innerHTML += '&nbsp;';
			additionalText.innerHTML += parseInt((ticksRemaining - usedDeffTicks) * TICK_LENGTH) + 'm';
		}
		
		if (showOrbDeff) {
			additionalText.innerHTML += '&nbsp;';
			if (ticks >= AJ_DEFF_TICKS - 1) additionalText.innerHTML += '*';
			if (ticks >= LO_DEFF_TICKS - 1) additionalText.innerHTML += '*';
		}
		
		inc.appendChild(additionalText);
	}
}

function getTicks(remaining) {	
	if (selectedMode) {
		var mode = TIME_MODES[selectedMode];
		return mode.getTicks(mode.getValues(remaining));
	}
	
	for (var i in TIME_MODES) {
		var mode = TIME_MODES[i];
		var values = mode.getValues(remaining);
		if (values) {
			if (mode.isUnique)
				selectedMode = i;
			return mode.getTicks(values);
		}
	}
	
	return 0;
}
