// ==UserScript==
// @name           PW CrazyHard Speedbot 0.1
// @namespace      BvS-Ranatama
// @description    Adjusts your speed for you
// @include        http://animecubed.com/billy/bvs/pizzawitch.html
// @include        http://www.animecubed.com/billy/bvs/pizzawitch.html
// @include        http://animecubed.com/billy/bvs/pizzawitchgarage.html
// @include        http://www.animecubed.com/billy/bvs/pizzawitchgarage.html
// ==/UserScript==

//Much thanks to Razithel, whose PW ExHard script was modified
//To create this script. 

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
		curSpeedElement.innerHTML = curSpeedElement.innerHTML + "\nRaz's Speed Script Ver. 0.3";
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

function getDurability() {
	var DurabilityElement = document.evaluate("/html/body/center/table/tbody/tr/td/form/table[1]/tbody/tr[1]/td[last() - 1]/b", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var DurabilityRaw;
	var Durability;
	if (DurabilityElement != null) {
		DurabilityRaw = DurabilityElement.innerHTML;
		var DurabilityResult = DurabilityRaw.match(/Durability: (\d+)/);		
		if (DurabilityResult != null) {
			Durability = DurabilityResult[1];
		}// else {
		//	alert ("Can't detect Durability!");
		//} screws up on negative durability
	} else {
		Durability = null;
	}
	return Durability;
}

function isDTOK() {
	var DrivetrainElement = document.evaluate("/html/body/center/table/tbody/tr/td/form/table[1]/tbody/tr[1]/td[last() - 2]/b", document, null,
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
	if (Drivetrain > 50) return true;

     return false;
}

function setSpeed(target, current) {
	var diff = target - current;
	var shiftInput = "";
	if (diff > 5) {
		diff = 5;
	} else if (diff < -5) {
		diff = -5;
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

if (location == 1) {
	var InfPot = document.evaluate("//input[@name='card_used' and @value='64']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
	if (InfPot != null) {
		InfPot.wrappedJSObject.click()
	}
} else if (isDTOK() && (getDeliciousness() < 200 || getDurability() < 100)) {
	var OLR = document.evaluate("//input[@name='card_used' and @value='63']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
	if (OLR != null) {
		OLR.wrappedJSObject.click();
	}
}



var target = 8; 
if (hSpeedComp=="Slower") {
	if (hLocation - location <= hSpeed) {
		target = 3;
	}
	if ((hLocation - location > hSpeed)) {
		target = hLocation - location - 1 ;
	}
	
}
if (hSpeedComp == "Faster") {
	if ((hLocation == location) && (hSpeed < 8)) {
		target++;
	}
}


setSpeed(target, cSpeed);

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