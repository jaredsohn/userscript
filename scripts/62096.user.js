// ==UserScript==
// @name	Trukz Script
// @namespace	http://www.trukz.com
// @description	Adds 5 MPH to truck speed and speeding on the last leg. Alerts when fuel price is below a certain threshold and disables next leg when FP is above a certain threshold.
// @include	http://*trukz.com/in_route.asp*
// @author	Jaap-Jan van der Veen
// @license	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version	1.6.2
// ==/UserScript==

/*
 * Enable or disable features. A user may set these to true or false.
 *
 * - ENABLE_SPEEDING: Increase speed by the value set in SPEED_INCREASE.
 *
 * - ENABLE_LAST_LEG_ADJUST: When miles to go is less then the permissible 
 *	maximum speed (either the default speed, or the truck's speed or +5 
 *	when ENABLE_SPEEDING is enabled) speed is set to the number of miles to
 *	go.
 *
 * - ENABLE_LAST_LEG_SPEEDING: When ENABLE_LAST_LEG_ADJUST is enabled and miles
 *	to go is less then the truck's speed, speed is set to the number of 
 *	miles to go. You drive faster then the permissible speed and there are
 *	some reports of people wrecking their truck and/ or receiving a fine.
 *
 * - ENABLE_REFUEL_ALERT - Blinking text when fuel price is below
 *	FUEL_PRICE_THRESHOLD.
 *
 * - ENABLE_DISABLE_NEXT_LEG - Disable the 'Next Leg' button when above
 *	FATIGUE_THRESHOLD.
 */

ENABLE_SPEEDING = true;
ENABLE_LAST_LEG_ADJUST = true;
ENABLE_LAST_LEG_SPEEDING = true;
ENABLE_REFUEL_ALERT = true;
ENABLE_DISABLE_NEXT_LEG = true;

/*
 * Default values. Please read the comments before setting a new value.
 * You might risk a fine or wreck your truck.
 *
 * - SPEED_INCREASE: When speeding is enabled, increase the speed by this value.
 *	You won't risk any fines or accidents if you set it to 5 or below.
 *	Any value above 0 is accepted.
 *
 * - SPEED_COLOUR: Sets the background color of the speed input box after it's 
 *	adjusted. Makes it easier to see if you can hit Next leg. Can be set to
 *	any valid CSS color (hexadecimal -'#123abc'- or name -'lime'- or null if
 *	you don't want to set a color.
 *
 * - FUEL_PRICE_THRESHOLD: Blink an alert when fuel price is below this
 *	threshold. Can be set to your liking. Any value is accepted.
 *
 * - FUEL_LEVEL_THRESHOLD: Only blink when at or below this level. Can be set in
 *	gallons or as a percentage. If a '%' is appended, it's a percentage,
 *	gallons otherwise. Should be set higher then 0(%) otherwise this alert
 *	is always showing. 
 *
 * - FATIGUE_THRESHOLD: Disable the 'Next Leg' button when your FP is higher
 *	then this threshold. You won't risk any fines or accidents if you set
 *	it to 10 or below. That said, up until now I received a ticket when
 *	going beyond my HOS (11 FP) only once. Any value above 0 is accepted.
 *
 * - CRITICAL FUEL_LEVEL: If ENABLE_DISABLE_NEXT_LEG is enabled, the 'Next Leg'
 *	button will be disabled when the fuel level is below this level. Set to
 *	something lower then 0 to disable this feature.
 */

SPEED_INCREASE = 5;
SPEED_COLOUR = 'lime';
FUEL_PRICE_THRESHOLD = 2.00;
FUEL_LEVEL_THRESHOLD = '30%';
FATIGUE_THRESHOLD = 10;
CRITICAL_FUEL_LEVEL = 12;


/*
 * Constants.
 * There is no need to change this.
 */
var MIN_SPEED = 10;
var SCRIPT_NAME = 'GreaseMonkey Trukz Script';
var REFUEL_TEXT = ' Refuel NOW!';
var SUBMIT_TEXT = 'Next Leg';
var FUEL_PRICE_REGEX = /\d+\.\d+/;
var FUEL_LEVEL_REGEX_ABS = /\d+ Gallons/;
var FUEL_LEVEL_REGEX_PCT = /\d+% Full\)/;

/* Globals */
/**
 * Contains the original text, which is displayed when the refuel alert mustn't
 * be shown. Initialized in init().
 */
var fuelText;

/** Contains the refuel alert text. Initialized in init(). */
var refuelAlertText;

/*
 * Code.
 */

/**
 * Shows an alert when a variable is set too low by the user.
 * 
 * @param varName contains the name of the var which appears in the alert text.
 * @param threshold contains the minimum value that the variable must have.
 */
function showVarTooLowAlert(varName, threshold) {
	alert(SCRIPT_NAME + ': ' + varName + ' should not be set below ' +
		threshold + '.');
}

/** 
 * Retrieves the route information panel.
 *
 * @return the table containing the route information.
 */
function getRouteInformation() {
	return document.getElementById('table5');
}

/**
 *
 *
 *
 *
 *
 */
function setNextLegDisabled(disable) {
	var form = document.forms[0];
	var size = form.elements.length;

	for (var i = 0; i < size; ++i) {
		var element = form.elements[i];
		if (element.type == 'submit' && element.value == SUBMIT_TEXT) {
			element.disabled = disable;
			return;
		}
	}
}

/**
 * Called when the script starts. 
 *
 * Does the following things:
 *	* Initializes the refuel alert if it's enabled.
 */
function init() {
	if (ENABLE_REFUEL_ALERT) {
		var info = getRouteInformation();
		var fuelPriceCell = info.rows[2].cells[3];
		fuelText = fuelPriceCell.firstChild;
		var fuelPriceText = fuelText.nodeValue;
		var text = document.createTextNode(fuelPriceText + REFUEL_TEXT);
		refuelAlertText = document.createElement('font');
		refuelAlertText.color = 'red';
		refuelAlertText.appendChild(document.createElement('blink'));
		refuelAlertText.firstChild.appendChild(text);
	}
}

/**
 * Increases (or decreases) the speed.
 *
 * If ENABLE_SPEEDING is true, the speed (legSpeed) is set to default speed +
 * SPEED_INCREASE (maxSpeed) or the truck's maximum speed (maxTruckSpeed), 
 * whichever is lowest.
 *
 * If ENABLE_LAST_LEG_ADJUST is true, the speed is set to the number of miles
 * to go (milesToGo) when it's less then defaultSpeed or the speed set by
 * ENABLE_SPEEDING. 
 *
 * If ENABLE_LAST_LEG_SPEEDING is true as well, the speed is set to milesToGo
 * if the destination can be reached (meaning milesToGo <= maxTruckSpeed).
 *
 * Trukz.com has a minimum speed (MIN_SPEED) the truck must drive in one leg. 
 * The speed is always set equal to or greater then MIN_SPEED.
 */
function speeding() {
	var speedInput = document.getElementById('Speed');

	if (ENABLE_SPEEDING || ENABLE_LAST_LEG_ADJUST) {
		if (SPEED_INCREASE < 0) {
			showVarTooLowAlert('SPEED_INCREASE', 0);
			SPEED_INCREASE = 0;
		}
		var dashboard = getRouteInformation();
		var defaultSpeed = parseInt(speedInput.defaultValue, 10);
		var maxSpeed = defaultSpeed + SPEED_INCREASE;
		var truckSpeed = dashboard.rows[1].cells[1];
		var maxTruckSpeed = parseInt(truckSpeed.innerText ||
			truckSpeed.textContent, 10);
		var milesToGo = parseInt(dashboard.rows[8].cells[3]
			.firstChild.nodeValue.replace(/,/g, ''), 10);
	
		var legSpeed = defaultSpeed;
		if (ENABLE_SPEEDING) {
			legSpeed = Math.min(maxTruckSpeed, maxSpeed);
		}
		if (ENABLE_LAST_LEG_ADJUST) {
			if (milesToGo <= legSpeed) {
				legSpeed = milesToGo;
			}
			if (ENABLE_LAST_LEG_SPEEDING && milesToGo <= maxTruckSpeed) {
				legSpeed = milesToGo;
			}
		}
		speedInput.value = Math.max(legSpeed, MIN_SPEED);
		if (SPEED_COLOUR)
			speedInput.style.backgroundColor = SPEED_COLOUR;

		/* alert('Default speed: '+defaultSpeed+' Max speed: '
		 +maxSpeed+' Truck speed: '+maxTruckSpeed+' Miles to go: '
		 +milesToGo+' Selected speed: '+legSpeed); */
	}
	else {
		speedInput.value = speedInput.defaultValue;
	}
}

/**
 * Refuel alert sets a blinking text in red when fuel price is below 
 * FUEL_PRICE_THRESHOLD and the level is below FUEL_LEVEL_THRESHOLD.
 * If FUEL_LEVEL_THRESHOLD smaller then or equal to 0, the alert always blinks
 * when the price is lower then FUEL_PRICE_THRESHOLD.
 *
 * refuelAlert() gives a warning when FUEL_PRICE_THRESHOLD < 0, because then
 * the alert is always showing.
 */
function refuelAlert() {
	if (parseInt(FUEL_PRICE_THRESHOLD) < 0) {
		showVarTooLowAlert('FUEL_PRICE_THRESHOLD', 0);
	}
	var info = getRouteInformation();
	var fuelLevelText = info.rows[3].cells[3].firstChild.nodeValue;
	var fuelPrice = parseFloat(fuelText.nodeValue.match(FUEL_PRICE_REGEX));
	var fuelLevel = /\%$/.test(FUEL_LEVEL_THRESHOLD) ?
		parseInt(fuelLevelText.match(FUEL_LEVEL_REGEX_PCT), 10) :
		parseInt(fuelLevelText.match(FUEL_LEVEL_REGEX_ABS), 10);

	var threshold = parseInt(FUEL_LEVEL_THRESHOLD);

	var showAlert = ENABLE_REFUEL_ALERT &&
		(threshold <= 0 || fuelLevel <= threshold) && 
		fuelPrice <= FUEL_PRICE_THRESHOLD;

	var fuelPriceCell = info.rows[2].cells[3];
	var node = showAlert ? refuelAlertText : fuelText;
	fuelPriceCell.replaceChild(node, fuelPriceCell.firstChild);
}

/** 
 * Disables the Next Leg button when ENABLE_DISABLE_NEXT_LEG is true and FP is
 * higher then or equal to FATIGUE_THRESHOLD. 
 *
 * Also, if the fuel level is below the CRITICAL_FUEL_LEVEL and
 * ENABLE_DISABLE_NEXT_LEG is true, this button is disabled.
 *
 */
function disableNextLeg() {
	var disableSubmit = false;

	if (ENABLE_DISABLE_NEXT_LEG) {
		var info = getRouteInformation();

		if (FATIGUE_THRESHOLD < 0) {
			showVarTooLowAlert('FATIGUE_THRESHOLD', 0);
		}
		else {
			var fp = parseInt(info.rows[1].cells[3].firstChild.nodeValue, 
				10);
			if (fp >= FATIGUE_THRESHOLD) {
				disableSubmit = true;
			}
		}

		var fuelLevelText = info.rows[3].cells[3].firstChild.nodeValue;
		var fuelLevel = parseInt(fuelLevelText.match(FUEL_LEVEL_REGEX_ABS), 10);

		if (fuelLevel < CRITICAL_FUEL_LEVEL) {
			disableSubmit = true;
		}
	}

	setNextLegDisabled(disableSubmit);
}

function doActions() {
	init();
	speeding();
	refuelAlert();
	disableNextLeg();
}

doActions();