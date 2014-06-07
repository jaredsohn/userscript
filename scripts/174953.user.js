// ==UserScript==
// @name	TruckingSim Script
// @namespace	http://www.truckingsim.com
// @description	Adds 5 MPH to truck speed and speeding on the last leg. Disables next leg when FP is above a certain threshold.
// @include	http://truckingsim.com/*.php
// @include	http://truckingsim.com/*.php?*
// @include	http://truckingsim.com/*.php#*
// @grant	GM_info
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_xmlhttpRequest
// @author	Andy Calderbank
// @license	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version	2.2.0
// @updateURL   https://userscripts.org/scripts/source/174953.meta.js
// @downloadURL https://userscripts.org/scripts/source/174953.user.js
// ==/UserScript==

/* Original script for trukz.com by Jaap-Jan van der Veen
 * edited to work with truckingsim.com
 * I have recoded the refueling code as I would never use it as was.
 * Disables the Drive button when we're below the threshold and colours amount.
 *
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
 * - ENABLE_DISABLE_NEXT_LEG - Disable the 'Next Leg' button when above
 *	FATIGUE_THRESHOLD.
 *
 * - ENABLE_MOVE_INFO - When ENABLE_MOVE_INFO is enabled the script will append
 *  a row to the dashboard to disable the time you need to move by before you
 *  start to waste FP.
 *
 * - ENABLE_TRUCK_VALUE - When ENABLE_TRUCK_VALUE is enabled the script will append
 *  to the Total line on the My Driver page with the value of everything sellable
 *  for when you're about to buy a new truck. (Not touched stocks so not taken into account)
 */

ENABLE_SPEEDING = true;
ENABLE_LAST_LEG_ADJUST = true;
ENABLE_LAST_LEG_SPEEDING = false;
ENABLE_DISABLE_NEXT_LEG = true;
ENABLE_MOVE_INFO = true;
ENABLE_TRUCK_VALUE = true;

/*
 * Default values. Please read the comments before setting a new value.
 * You might risk a fine or wreck your truck.
 *
 * - SPEED_INCREASE: When speeding is enabled, increase the speed by this value.
 *	You won't risk any fines or accidents if you set it to 5 or below.
 *	Any value above 0 is accepted.
 *
 * - CRITICAL_FUEL_LEVEL: What percentage of fuel left we should disable the 
 *  Drive button.
 *
 * - SPEED_COLOUR: Sets the background colour of the speed input box after it's 
 *	adjusted. Makes it easier to see if you can hit Next leg. Can be set to
 *	any valid CSS colour (hexadecimal -'#123abc'- or name -'lime'- or null if
 *	you don't want to set a colour.
 *
 * - UNDER_FUEL_COLOUR: Sets the background colour of the current fuel display
 *  once we're below the threshold value to make it easy to see why the Drive
 *  button may be disabled. See above for colour value information.
 *
 * - FATIGUE_THRESHOLD: Disable the 'Next Leg' button when your FP is higher
 *	then this threshold. You won't risk any fines or accidents if you set
 *	it to 100 or below. That said, up until now I received a ticket when
 *	going beyond my HOS (110 FP) only once. Any value above 0 is accepted.
 *
 * - TOPSPEED_THRESHOLD: If current trucks top speed is lower than this value
 *  then display background colour TOPSPEED_COLOUR.
 *
 * - TOPSPEED_COLOUR: Colour to change top speeds background to when the above
 *  threashold is met.
 *
 */

SPEED_INCREASE = 5;
CRITICAL_FUEL_LEVEL = 12;
SPEED_COLOUR = 'lime';
UNDER_FUEL_COLOUR = 'Crimson';
FATIGUE_THRESHOLD = 110;
TOPSPEED_THRESHOLD = 85;
TOPSPEED_COLOUR = 'Crimson';

/*
 * Constants.
 * There is no need to change this.
 */
var MIN_SPEED = 10;
var SCRIPT_NAME = 'GreaseMonkey TruckingSim Script';
var SUBMIT_TEXT = 'Drive';


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
	var dashForm = document.getElementById('routeForm');
	dashForm = dashForm.getElementsByTagName('table');
	return dashForm[1];
}

/**
 * Disables the Drive button.
 */
function setNextLegDisabled(disable) {
	document.getElementById('drive').disabled = disable;
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
 * TruckingSim.com has a minimum speed (MIN_SPEED) the truck must drive in one leg. 
 * The speed is always set equal to or greater then MIN_SPEED.
 */
function speeding() {
	var speedInput = document.getElementById('speed');

	if (ENABLE_SPEEDING || ENABLE_LAST_LEG_ADJUST) {
		if (SPEED_INCREASE < 0) {
			showVarTooLowAlert('SPEED_INCREASE', 0);
			SPEED_INCREASE = 0;
		}
		var dashboard = getRouteInformation();
		var defaultSpeed = parseInt(speedInput.defaultValue, 10);
		var maxSpeed = defaultSpeed + SPEED_INCREASE;
		var truckSpeed = dashboard.rows[1].cells[3];
		var maxTruckSpeed = parseInt(truckSpeed.innerText ||
			truckSpeed.textContent, 10);
		var milesToGo = parseInt(dashboard.rows[6].cells[3]
			.firstChild.nodeValue.replace(/,/g, ''), 10);

		var legSpeed = defaultSpeed;
		if (ENABLE_SPEEDING) {
			legSpeed = Math.min(maxTruckSpeed, maxSpeed);
		}
		
		if (maxTruckSpeed < TOPSPEED_THRESHOLD) {
			truckSpeed.style.backgroundColor = TOPSPEED_COLOUR;
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

		/*alert('Default speed: '+defaultSpeed+' Max speed: '
		 +maxSpeed+' Truck speed: '+maxTruckSpeed+' Miles to go: '
		 +milesToGo+' Selected speed: '+legSpeed);*/
	}
	else {
		speedInput.value = speedInput.defaultValue;
	}
}

/** 
 * Disables the Next Leg button when ENABLE_DISABLE_NEXT_LEG is true and FP is
 * higher then or equal to FATIGUE_THRESHOLD. 
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
			var fp = parseInt(info.rows[3].cells[1].firstChild.nodeValue, 10);

			if (fp >= FATIGUE_THRESHOLD)
				disableSubmit = true;
		}

		var fuelLevelText = info.rows[8].cells[3].firstChild.nodeValue;
		var fuelLevel = parseInt(fuelLevelText.match(/^\d+ gallons? \((\d+(\.\d+)?)%\)$/)[1], 10);

		if (fuelLevel < CRITICAL_FUEL_LEVEL) {
    		if (UNDER_FUEL_COLOUR)
    			info.rows[8].cells[3].style.backgroundColor = UNDER_FUEL_COLOUR;
			disableSubmit = true;
		}
	}

	setNextLegDisabled(disableSubmit);
}


/**
 * Add to the dashboard information about when we next need to move by if
 * ENABLE_MOVE_INFO is enabled.
 */
function addMoveTime() {
    if (ENABLE_MOVE_INFO) {
        var dashboard = getRouteInformation();
        
        var FP = dashboard.rows[3].cells[1].firstChild.nodeValue / 10;
        var moveTime = new Date(); 
        moveTime.setHours(moveTime.getHours()+FP);
        moveTime.setMinutes(59);
        moveTime.setSeconds(59);
      
        var milesLeft = dashboard.rows[6].cells[3].firstChild.nodeValue.replace(/^(?:(\d+),)?(\d+) mile.*/g,'$1$2');
        var MPG = dashboard.rows[7].cells[3].firstChild.nodeValue.replace(/ mpg.*/g,'');
        var totalFuel = dashboard.rows[8].cells[1].firstChild.nodeValue.replace(/\D.*/,'');
        var currentFuel = dashboard.rows[8].cells[3].firstChild.nodeValue.replace(/\D.*/,'');
        var currentFuelDistance = Math.round(currentFuel*MPG*100)/100;
        var requiredFuel = milesLeft / MPG;
        var missingFuel = (currentFuel-requiredFuel<0) ? Math.round((currentFuel - requiredFuel) * -100)/100 : 0;
        var percentageMissing = Math.round((100/totalFuel)*missingFuel*100)/100;
        
        var row = dashboard.insertRow(-1);
        var cell1=row.insertCell(-1);
        var cell2=row.insertCell(-1);
        var cell3=row.insertCell(-1);
        var cell4=row.insertCell(-1);
        
        row.bgColor="#f1f5f8";
        cell1.innerHTML="Move by Time:";
        cell2.innerHTML=moveTime;
        cell3.innerHTML="Required fuel:";
        cell4.innerHTML=missingFuel+" gallons ("+percentageMissing+"%) Can travel "+currentFuelDistance+" miles.";

        cell1.className="bold brb";
        cell2.className="brb";
        cell3.className="bold brb";
        cell4.className="brb";
        
        if (missingFuel > 0)
            cell3.style.backgroundColor = UNDER_FUEL_COLOUR;
    }
}


/**
 * Calculate how much money we have to spend on a new truck!
 */
function newTruckValue() {
	if (ENABLE_TRUCK_VALUE) {
		var truckValue = 100 * parseFloat(document.getElementById('sell').title.replace(/[^\d.]+/g,""));
		var moneyTotal = 100 * parseFloat(document.getElementById('total').firstChild.nodeValue.replace(/[^-\d.]+/g,""));
		moneyTotal += 300000;
		var cash = 0;

	    GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://truckingsim.com/purchase_item.php',
			onload: function(responseDetails) {
				var re = /<a [^<>]*\bid="sell-\d+-(\d+)"/g;

				while (arg = re.exec(responseDetails.responseText))
					cash += 100 * parseFloat(arg[1]);
				cash = (Math.round(truckValue+moneyTotal+cash) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		  		document.getElementById('total').innerHTML += '<br><span>$'+cash+' (cash+truck+addons)</span>';
			}
		});
	}
}


/**
 * If we're on Route Display page check what speed we need to be doing, 
 *  disable Drive if needed and then add the moving information.
 */
if (document.getElementById('speed')) {
	speeding();
	disableNextLeg();
	addMoveTime();
}

/**
 * If we're on My Drive grab the current value of addons and our truck 
 *  and add that to the money in our hand+bank, this is how much we have
 *  to spend on a new truck.
 */
if (document.getElementById('garageTab')) {
    newTruckValue();
}
