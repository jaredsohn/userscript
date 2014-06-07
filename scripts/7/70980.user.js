// ==UserScript==
// @name           BvS PW Hard SpeedBot 1.2
// @namespace      BvS-Dorian
// @description    Adjusts speed and deliciousness ability consumption on Hard mode deliveries.  Modded from Yukio's PW Speedbot 0.7.2, itself modded from Razithel's ExHard SpeedBot v.03.
// @include        http://*animecubed.com/billy/bvs/pizzawitch.html
// @include        http://*animecubed.com/billy/bvs/pizzawitchgarage.html
// ==/UserScript==
//  Thanks to TheSpy, Vasey, and Razithel for XPATH variables.


function process_event(event) {
	if (event.keyCode==71){		//g
		if (document.forms.namedItem("anotherdelivery")) {
			document.forms.namedItem("anotherdelivery").wrappedJSObject.submit();
		} else if (document.forms.namedItem("drive")) {
			document.forms.namedItem("drive").wrappedJSObject.submit();
		} else if (document.forms.namedItem("hittheride")) {
			document.forms.namedItem("hittheride").wrappedJSObject.submit();
		}
	}
}
window.addEventListener("keyup", process_event, false);

function getDash() {
	var curDashElement = document.evaluate("//table/tbody/tr/td[2]/b/*[6]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	return parseInt(curDashElement.nextSibling.textContent);
}

function getDecel() {
	var curDecelElement = document.evaluate("//table/tbody/tr/td[2]/b/*[7]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	return parseInt(curDecelElement.nextSibling.textContent);
}

function getDSpeed() {
	var curDSpeedElement = document.evaluate("//table/tbody/tr/td[2]/b/font[5]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	return parseInt(curDSpeedElement.textContent);	
}

function getLocation() {
	var locationElement = document.evaluate("//tr/td[@colspan='3' and @align='center']/b/i", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var location = null;
	if (locationElement) {
		var locationRaw = locationElement.innerHTML;
		var locationResult = locationRaw.match(/Distance to Destination: (\d+)/);
		if (locationResult != null) {
			location = locationResult[1];
		} else {
			alert ("Can't detect location!");
		}
	}
	return location;
}

function getCurSpeed() {
	var curSpeedElement = document.evaluate("//font[@style='font-size: 24px; color: rgb(51, 170, 51);']/b", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var curSpeedRaw = null;
	if (curSpeedElement) {
		curSpeedRaw = curSpeedElement.innerHTML;
		//curSpeedElement.innerHTML = curSpeedElement.innerHTML + "\nRaz's Speed Script Ver. 0.3";
	}
	return curSpeedRaw;
}

function getHurdleLocation() {
	var hurdleLocationElement = document.evaluate("//font[@color='#ffffaa']/b", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var hurdleLocationRaw;
	var hurdleLocation;
	if (hurdleLocationElement != null) {
		hurdleLocationRaw = hurdleLocationElement.innerHTML;
		var hurdleLocationResult = hurdleLocationRaw.match(/Location (\d+)/);		
		if (hurdleLocationResult != null) {
			hurdleLocation = hurdleLocationResult[1];
		} else {
			alert ("Can't detect hurdle location!");
		}
	} else {
		hurdleLocation = null;
	}
	return hurdleLocation;
}

function getHurdleSpeed(type) {
	var xpathquery;
	if (type == 1) {
		xpathquery = "//font[@color='#aaffaa']/b/i";
	} else if (type == 2) {
		xpathquery = "//table[@width='90%']/tbody/tr/td/b";
	}
	var hurdleSpeedElement = document.evaluate(xpathquery, document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var hurdleSpeedRaw;
	var hurdleSpeed;
	if (hurdleSpeedElement != null) {
		hurdleSpeedRaw = hurdleSpeedElement.innerHTML;
		var hurdleSpeedResult = hurdleSpeedRaw.match(/Speed [\w \:]*(\d+)/);		
		if (hurdleSpeedResult != null) {
			hurdleSpeed = hurdleSpeedResult[1];
		} else {
			alert ("Can't detect hurdle Speed!");
		}
	} else {
		hurdleSpeed = null;
	}
	
	return hurdleSpeed;
}

function getHurdleSpeedComparison(type) {
	if (type == 1) {
		xpathquery = "//font[@color='#aaffaa']/b/i";
	} else if (type == 2) {
		xpathquery = "//table[@width='90%']/tbody/tr/td/b";
	}
	var hurdleSpeedComparisonElement = document.evaluate(xpathquery, document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var hurdleSpeedComparisonRaw;
	var hurdleSpeedComparison;
	if (hurdleSpeedComparisonElement != null) {
		hurdleSpeedComparisonRaw = hurdleSpeedComparisonElement.innerHTML;
		var hurdleSpeedComparisonResult = hurdleSpeedComparisonRaw.match(/Speed [\w \:]*\d+  ?or (\w+)/);		
		if (hurdleSpeedComparisonResult != null) {
			hurdleSpeedComparison = hurdleSpeedComparisonResult[1];
		} else {
			alert ("Can't detect hurdle SpeedComparison!");
		}
	} else {
		hurdleSpeedComparison = null;
	}
	return hurdleSpeedComparison;
}

function getDeliciousness() {
	var DeliciousnessElement = document.evaluate("/html/body/center/table/tbody/tr/td/form/table[1]/tbody/tr[1]/td[last()]/b", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var DeliciousnessRaw;
	var Deliciousness;
	if (DeliciousnessElement != null) {
		DeliciousnessRaw = DeliciousnessElement.innerHTML;
		var DeliciousnessResult = DeliciousnessRaw.match(/Deliciousness: (\d+)/);		
		if (DeliciousnessResult != null) {
			Deliciousness = DeliciousnessResult[1];
		} else {
			alert ("Can't detect Deliciousness!");
		}
	} else {
		Deliciousness = null;
	}
	return Deliciousness;
}

function getDrivetrain() {
	var DrivetrainElement = document.evaluate("/html/body/center/table/tbody/tr/td/form/table[1]/tbody/tr[1]/td[last()-2]/b", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var DrivetrainRaw;
	var Drivetrain;
	if (DrivetrainElement != null) {
		DrivetrainRaw = DrivetrainElement.innerHTML;
		var DrivetrainResult = DrivetrainRaw.match(/Drivetrain: (\d+)/);		
		if (DrivetrainResult != null) {
			Drivetrain = DrivetrainResult[1];
		} else {
			alert ("Can't detect Drivetrain!");
		}
	} else {
		Drivetrain = null;
	}
	return Drivetrain;
}

var upUp = getDash();
var downDown = getDecel();
var absoluteDown = -1 * downDown;



function setSpeed(target, current) {
	var diff = target - current;
	var shiftInput = "";
	if (diff > upUp) {
		diff = upUp;
	} else if (diff < downDown) {
		diff = downDown;
	}
	if (diff > 0) {
		shiftInput = "+" + diff;
	} else if (diff < 0) { 
		shiftInput = diff;
	}
	var speedInput = document.evaluate("//input[@name='shift' and @value='" + shiftInput+ "']", document, null,
    XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (speedInput) {
		speedInput.wrappedJSObject.click();
	}
}

var location = getLocation() - 0;
var cSpeed = getCurSpeed() - 0;
var hLocation = getHurdleLocation();
var hSpeed;
// var hSpeedComp;
var endLocation = 75;
if (hLocation != null) {
	hSpeed = getHurdleSpeed(1) - 0;
//	hSpeedComp = getHurdleSpeedComparison(1);
	hLocation -= 0;
} else {
	hSpeed = getHurdleSpeed(2) - 0;
//	hSpeedComp = getHurdleSpeedComparison(2);
	hLocation = location;
}

var drivetrain = getDrivetrain();

if (location == 1 && drivetrain > 50) {
	var OLR = document.evaluate("//input[@name='card_used' and @value='63']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
	if (OLR != null) {
		OLR.wrappedJSObject.click()
	}
} else if (location <= 8 && drivetrain > 45) {
	var PizzaPizza = document.evaluate("//input[@name='card_used' and @value='3']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
	if (PizzaPizza != null) {
		PizzaPizza.wrappedJSObject.click();
	}
} else if ((getDeliciousness() <= 190 || (hSpeed == 2 && cSpeed > 2 && location >= hLocation)) && drivetrain > 40) {
	var MeltyCheese = document.evaluate("//input[@name='card_used' and @value='10']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
	if (MeltyCheese != null) {
		MeltyCheese.wrappedJSObject.click();
	} else {
		var acOff = document.evaluate("//input[@name='card_used' and @value='7']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
		if (acOff != null) {
			acOff.wrappedJSObject.click();
		}
	}
}


var target = cSpeed;
var dSpeed = getDSpeed();
var maxAccel = upUp + cSpeed;
var maxDecel = downDown + cSpeed;

while(maxAccel > dSpeed){
	maxAccel--;
}

while(maxDecel < 0){
	maxDecel++;
}


// Main modifications from Yukio's script start here.

// Determines the minimum possible number of moves to reach a location from another location
// starting at a given speed.
function getMovesToLocation(speed, cLoc, eLoc) {
        var dist = eLoc - cLoc;
        var moved = 0;
        var moves = 0;
        var nextSpeed = speed;

        while (moved < dist) {
                moved = moved + nextSpeed;

                if (nextSpeed < dSpeed - upUp) {
                         nextSpeed = nextSpeed + upUp;
                } else {
                         nextSpeed = dSpeed;
                }

                moves++;
        }

        return moves;
}

// Determines if the minimum number of moves to reach a location from another one is the same at
// two different starting speeds.
function equalMoves(speed1, speed2, cLoc, eLoc) {
        return getMovesToLocation(speed1, cLoc, eLoc) ==
               getMovesToLocation(speed2, cLoc, eLoc);
}


if (hSpeed > 2 || (hSpeed == 1 && hLocation > location)) {

// Accelerate to maximum as long as the next hurdle requires a speed higher than 2
// or it requires 1 but has not yet been reached.
        target = maxAccel;
} else if (hSpeed == 2) {
// If the hurdle is speed 2

        // Set the speed as close to 2 as possible.
        if (maxDecel <= 2) {
                target = 2;
        } else {
                target = maxDecel;
        }


        // Increase the speed as much as possible while still allowing it to decelerate to 2
        // by the time you reach the hurdle.
        var s = target + 1;
        var prevTarget = 0;

        while ((target <= maxAccel) && (prevTarget != target)) {
                var maxBrake = s;
                prevTarget = target;

                while (s > 2) {
                       if (s - absoluteDown <= 2) {
                             s = 2;
                       } else {
                             s = s - absoluteDown;
                       }

                       maxBrake = maxBrake + s;
                }

                if ((hLocation - location + 1) >= maxBrake) {
                       target++;
                }

                s = target + 1;
        }
} else if (hSpeed == 1) {
// If the hurdle speed is 1 and it has been reached

        // Move the target to as close to 3 as possible.
        while ((target > 3) && (target > maxDecel)) {
                target--;
        }
        while ((target < 3) && (target < maxAccel)) {
                target++;
        }

        // If the current speed is 3, increase the speed to maximum.
        if (cSpeed <= 3) {
                target = maxAccel;
        }
}


// When close to the end, attempt to reduce the speed to lowest possible even-numbered
// speed that does not increase the expected number of moves to reach the end.

// Monitors whether a speed reduction has been rejected in the loop.
var canLower = 1;


// Perform the loop as long as a reduction hasn't been rejected and the current location
// is near the end.  (Possible mod: Reduce location requirement to 34?)
while (canLower && location > (endLocation - 2 * dSpeed)) {
        // Exception cases to speed reduction:
        // 1) If the current hurdle is speed 1 and we are still attempting to reach it.
        // 2) If the current hurdle speed is 2.  (Reduction attempts are redundant in this case.)
        // 3) If the target is already under 3.
        // 4) if the target has already decelerated as much as possible.
        if (!((hSpeed == 1) && (location < hLocation))
            && (hSpeed != 2)
            && (target >= 3)
            && (target != maxDecel)) {
                var levelDown = target - 1;
                var offset = levelDown % absoluteDown;
                var twoOffset = 2 % absoluteDown;

                // levelDown should be the next number below the current target that can reach 2 in fewer
                // moves than the current target.
                while (offset != twoOffset) {
                    levelDown--;
                    offset = levelDown % absoluteDown;
                }

                // Further exception cases:
                // 1) The next even speed down can't be reached from the current speed.
                // 2) Reducing the speed will cause it to take more moves to reach the next hurdle.
                // 3) Reducing the speed will cause the speed to be too low for the hurdle requirements when
                //    the hurdle is reached.  (Note that this case is never reached if hurdle speed is 1 or 2.)
                // 4) Reducing the speed will make it take longer to reach the end.
                if (levelDown >= maxDecel &&
                    equalMoves(target, levelDown, location, hLocation) &&
                    !((levelDown < hSpeed) && (hLocation - location <= levelDown)) &&
                    equalMoves(target, levelDown, location, endLocation)) {
                        // If no exceptions are found, reduce.
                        target = levelDown;
                } else {
                    // If exception is found, end reduction loop.
                    canLower = 0;
                }
         } else {
                // If exception is found, end reduction loop.
                canLower = 0;
         }
}


// Removed code from original script.


/*
if (hSpeedComp=="Slower") {
	while (((location + target) <= hLocation) && (target < maxAccel)) {
		target++;
	}
	while (((location + target + hSpeed) > hLocation) && (target > maxDecel)) {
		target--;
	}
	if ((location + hSpeed) >= hLocation) {
		target = hSpeed;
	}
}
if (hSpeedComp == "Faster") {
	while ((((location + target) <= hLocation) && (target < maxAccel)) || (target < hSpeed)) {
		target++;
	}
}
*/

// Debug garbage
//alert (getDeliciousness());
//alert("dSpeed " + dSpeed + "\nloc" + location + "\ncspeed" + cSpeed + "\nhLoc" + hLocation + "\nhSpeed" + hSpeed + "\nhSpeedComp" + hSpeedComp + "\ntarget" + target + "\nmaxAccel/maxDecel " + maxAccel + " / " + maxDecel + "\ndash/decel" + upUp + " / " + downDown);
setSpeed(target, cSpeed);