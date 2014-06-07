// ==UserScript==
// @author         Raaaak
// @id             BvSPizzaWitchAutoride
// @name           BvS PizzaWitch Autoride
// @namespace      Raaaak
// @version        1.0
// @description    Minimally modified (i.e. bugfixed) version of Yukio's Universal Speedhelper
// @include        http://animecubed.com/billy/bvs/pizzawitch.html
// @include        http://www.animecubed.com/billy/bvs/pizzawitch.html
// @include        http://animecubed.com/billy/bvs/pizzawitchgarage.html
// @include        http://www.animecubed.com/billy/bvs/pizzawitchgarage.html
// ==/UserScript==

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

function getDiff() {
	var diffElement = document.evaluate("//tr/td[@colspan='3' and @align='center']/b/i", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var diff = null;
	if (diffElement) {
		var diffRaw = diffElement.innerHTML;
		var diffResult = diffRaw.match(/Distance to Destination: (\d+)\s*\/\s*(\d+)/);
		if (diffResult != null) {
			diff = diffResult[2];
		} else {
			alert ("Can't detect difficulty!");
		}
	}
	if (diff == 25) {
		return "Easy";
	}else if (diff == 50) {
		return "Normal";
	}else if (diff == 75) {
		return "Hard";
	}else if (diff == 100) {
		return "Extra Hard";
	}else if (diff == 150) {
		return "Crazy Hard";
	}else {
		return "SPECIAL";
	}
}

function getCurSpeed() {
	var curSpeedElement = document.evaluate("//font[@style='font-size:24px;color:33AA33']/b", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var curSpeedRaw = null;
	if (curSpeedElement) {
		curSpeedRaw = curSpeedElement.innerHTML;
		//curSpeedElement.innerHTML = curSpeedElement.innerHTML + "\nRaz's Speed Script Ver. 0.3";
	}else {
		alert("can't detect current speed");
	}
	return curSpeedRaw;
}

function getHurdleLocation() {
	var hurdleLocationElement = document.evaluate("//font[@color='FFFFAA']/b", document, null,
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
		xpathquery = "//font[@color='AAFFAA']/b/i";
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
		xpathquery = "//font[@color='AAFFAA']/b/i";
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

function getDrivetrain() {
	var DrivetrainElement = document.evaluate("/html/body/center/table/tbody/tr/td/form/table/tbody/tr/td/b", document, null,
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

function getDurability() {
	var DurabilityElement = document.evaluate("/html/body/center/table/tbody/tr/td/form/table/tbody/tr/td[2]/b", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var DurabilityRaw;
	var Durability;
	if (DurabilityElement != null) {
		DurabilityRaw = DurabilityElement.innerHTML;
		var DurabilityResult = DurabilityRaw.match(/Durability: (\d+)/);		
		if (DurabilityResult != null) {
			Durability = DurabilityResult[1];
		} else {
			alert ("Can't detect Durability!");
		}
	} else {
		Durability = null;
	}
	return Durability;
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

var upUp = getDash();
var downDown = getDecel();

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
var hSpeedComp;
if (hLocation != null) {
	hSpeed = getHurdleSpeed(1) - 0;
	hSpeedComp = getHurdleSpeedComparison(1);
	hLocation -= 0;
} else {
	hSpeed = getHurdleSpeed(2) - 0;
	hSpeedComp = getHurdleSpeedComparison(2);
	hLocation = location;
}

var target = cSpeed;
var dSpeed = getDSpeed();
var maxAccel = upUp + cSpeed;
var maxDecel = downDown + cSpeed;
var rideDiff = getDiff();

while(maxAccel > dSpeed){
	maxAccel--;
}

while(maxDecel < 0){
	maxDecel++;
}

var IP = document.evaluate("//input[@name='card_used' and @value='64']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ;
var OLR = document.evaluate("//input[@name='card_used' and @value='63']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ;
var PizzaPizza = document.evaluate("//input[@name='card_used' and @value='3']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ;
var MeltyCheese = document.evaluate("//input[@name='card_used' and @value='10']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ;
var acOff = document.evaluate("//input[@name='card_used' and @value='7']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ;

if (rideDiff!="Crazy Hard") {
	if (location == 1) {
		if (OLR != null) {
			OLR.wrappedJSObject.click();
		}
	} else if (location <= 8) {
		if (PizzaPizza != null) {
			PizzaPizza.wrappedJSObject.click();
		}
	} else if (getDeliciousness() < 200) {
		if (MeltyCheese != null) {
			MeltyCheese.wrappedJSObject.click();
		} else {
			if (acOff != null) {
				acOff.wrappedJSObject.click();
			}
		}
	}
} else {
	if (location == 1) {
		if (IP != null) {
			IP.wrappedJSObject.click()
		}
	} else if (getDrivetrain() > 50 && (getDurability() < 100 || getDeliciousness() < 200)) {
		if (OLR != null) {
			OLR.wrappedJSObject.click();	
		}
	}
}

if (hSpeedComp=="Slower") {
	while (((location + target) <= hLocation) && (target < maxAccel)) {
		target++;
	}
	while ((((location + target) >= hLocation) && (target > maxDecel)) || ((target==maxAccel) && ((location + 2*target + downDown) > hLocation))) {
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

if (rideDiff == "Crazy Hard") {
	if (target > 8){
		target = 8;
	}
}

// Debug garbage
//alert (getDeliciousness());
//alert("Ride Type " + rideDiff + "\ndSpeed " + dSpeed + "\nloc" + location + "\ncspeed" + cSpeed + "\nhLoc" + hLocation + "\nhSpeed" + hSpeed + "\nhSpeedComp" + hSpeedComp + "\ntarget" + target + "\nmaxAccel/maxDecel " + maxAccel + " / " + maxDecel + "\ndash/decel" + upUp + " / " + downDown);
setSpeed(target, cSpeed);