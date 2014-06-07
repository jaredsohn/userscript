// ==UserScript==
// @name            Kuwaii's AA Mission Farmer (Based on Razithel's AA Mission Farmer Billy Mission Hotkey by Garyzx)
// @namespace       BvS-Razithel
// @include         http://www.animecubed.com/billy/bvs/missions/mission*
// @include         http://animecubed.com/billy/bvs/missions/mission*
// ==/UserScript==
				
function process_event(event) {
	// CHANGE THIS TO FALSE IF YOU DON'T WANT TO ESCAPE ROOT MISSIONS
	if (event.keyCode==69){		//e
		smokeBomb();
	}
        if (event.keyCode==75){		//k
		if(document.forms.namedItem("attempt")) {
			smartAttemptMission4();
		}
		else {
			document.forms.namedItem("domission").wrappedJSObject.submit();	//New mission
		}
	}
        if (event.keyCode==76){		//l
		if(document.forms.namedItem("attempt")) {
			smartAttemptMission3();
		}
		else {
			document.forms.namedItem("domission").wrappedJSObject.submit();	//New mission
		}
	}
	if (event.keyCode==77){		//m
		if(document.forms.namedItem("attempt")) {
			smartAttemptMission();
		}
		else {
			document.forms.namedItem("domission").wrappedJSObject.submit();	//New mission
		}
	}
        if (event.keyCode==78){		//n
		if(document.forms.namedItem("attempt")) {
			smartAttemptMission2();
		}
		else {
			document.forms.namedItem("domission").wrappedJSObject.submit();	//New mission
		}
	}

	if (event.keyCode==67)		//c
		document.forms.namedItem("chakra").wrappedJSObject.submit();	//Charge chakra
}

function smartAttemptMission() {
	var myDivs=document.getElementsByTagName("div");
	for (var i in myDivs) {
		if(myDivs[i].className=="miscontent2") {
			var myMissionTxt = myDivs[i].innerHTML;
			if (isRootMission(myMissionTxt)) {
				var shiftValue = document.evaluate("//table[@style='color: white; background-color: rgb(0, 0, 0); border: 1px dotted rgb(0, 0, 255); font-size: 12px; font-family: arial; width: 380px;']/tbody/tr/td[3]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
				var shiftValueText = shiftValue.innerHTML;
				var checkShift = shiftValueText.search("\\(\\+0 Range\\)");
				if (checkShift == 0) {
					smokeBomb();
				}
				else {
					selectDrift();
					attemptMission();
				}
			} else if (isKagesPlace(myMissionTxt)) {
				selectShift();
				ICHC();
				attemptMission();

			} else {
				selectShift();
				attemptMission();
			}
		}
	}
}

function smartAttemptMission2() {
	var myDivs=document.getElementsByTagName("div");
	for (var i in myDivs) {
		if(myDivs[i].className=="miscontent2") {
			var myMissionTxt = myDivs[i].innerHTML;
			if (isRootMission(myMissionTxt)) {
				var shiftValue = document.evaluate("//table[@style='color: white; background-color: rgb(0, 0, 0); border: 1px dotted rgb(0, 0, 255); font-size: 12px; font-family: arial; width: 380px;']/tbody/tr/td[3]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
				var shiftValueText = shiftValue.innerHTML;
				var checkShift = shiftValueText.search("\\(\\+0 Range\\)");
				if (checkShift == 0) {
					smokeBomb();
				}
				else {
					selectDrift();
					attemptMission();
				}
			} else if (isKagesPlace2(myMissionTxt)) {
				selectShift();
				ICHC();
				attemptMission();

			} else {
				selectShift();
				attemptMission();
			}
		}
	}
}

function smartAttemptMission3() {
	var myDivs=document.getElementsByTagName("div");
	for (var i in myDivs) {
		if(myDivs[i].className=="miscontent2") {
			var myMissionTxt = myDivs[i].innerHTML;
			if (isRootMission(myMissionTxt)) {
				var shiftValue = document.evaluate("//table[@style='color: white; background-color: rgb(0, 0, 0); border: 1px dotted rgb(0, 0, 255); font-size: 12px; font-family: arial; width: 380px;']/tbody/tr/td[3]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
				var shiftValueText = shiftValue.innerHTML;
				var checkShift = shiftValueText.search("\\(\\+0 Range\\)");
				if (checkShift == 0) {
					smokeBomb();
				}
				else {
					selectDrift();
					attemptMission();
				}
			} else if (isKagesPlace3(myMissionTxt)) {
				selectShift();
				ICHC();
				attemptMission();

			} else {
				selectShift();
				attemptMission();
			}
		}
	}
}

function smartAttemptMission4() {
	var myDivs=document.getElementsByTagName("div");
	for (var i in myDivs) {
		if(myDivs[i].className=="miscontent2") {
			var myMissionTxt = myDivs[i].innerHTML;
			if (isRootMission(myMissionTxt)) {
				var shiftValue = document.evaluate("//table[@style='color: white; background-color: rgb(0, 0, 0); border: 1px dotted rgb(0, 0, 255); font-size: 12px; font-family: arial; width: 380px;']/tbody/tr/td[3]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
				var shiftValueText = shiftValue.innerHTML;
				var checkShift = shiftValueText.search("\\(\\+0 Range\\)");
				if (checkShift == 0) {
					smokeBomb();
				}
				else {
					selectDrift();
					attemptMission();
				}
			} else if (isKagesPlace4(myMissionTxt)) {
				selectShift();
				smokeBomb();
				attemptMission();
                        } else if (isKagesPlace5(myMissionTxt)) { 
                                selectShift();
                                diagnosis();
                                attemptMission();
			} else {
				selectShift();
				attemptMission();
			}
		}
	}
}

function selectShift() {
	var shifters = document.getElementsByName("shifter");
	var shiftersLength = shifters.length;
	for (var i=0; i<shiftersLength; i++) {
		if (shifters[i].getAttribute("value") == 1) {
			shifters[i].wrappedJSObject.click();
		}
	}
}

function selectDrift() {
	var shifters = document.getElementsByName("shifter");
	var shiftersLength = shifters.length;
	for (var i=0; i<shiftersLength; i++) {
		if (shifters[i].getAttribute("value") == 3) {
			shifters[i].wrappedJSObject.click();
		}
	}
}		

function attemptMission() {
	document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
}

function isRootMission(mText) {
	var rootTest=/SYNTAX ERROR|Eat The Tasty|Mind The Gap/i;
	var isRoot=rootTest.test(mText);
	var rootTest2=/Flaw in the World/;
	if (rootTest2.test(mText)) {
		if(confirm("Escape this S-Rank mission? Click OK to Escape, Cancel to Attempt")) {
			isRoot=true;
		}
	}
	return isRoot;
}

function isKagesPlace(mText) {
	var KPTest=/Outwit the Bad Guys|Jonin At Risk|Find the Ultimate Answer|Act in the Kage/i;
	var isKP=KPTest.test(mText);
	return isKP;
}

function isKagesPlace2(mText) {
	var KPTest=/Act in the Kage/i;
	var isKP=KPTest.test(mText);
	return isKP;
}

function isKagesPlace3(mText) {
	var KPTest=/Outwit the Bad Guys|Jonin At Risk|Find the Ultimate Answer/i;
	var isKP=KPTest.test(mText);
	return isKP;
}

function isKagesPlace4(mText) {
	var KPTest=/Land Shark!|Carnivore Plants!|Explosive Mudslide!|Blinding Heat|Hunt the Rubber Pirates!|Sande Demon!|Trophy Monster/i;
	var isKP=KPTest.test(mText);
	return isKP;
}

function isKagesPlace5(mText) {
	var KPTest=/The Pure Awesome of this place is almost too much to bear!/i;
	var isKP=KPTest.test(mText);
	return isKP;
}

function smokeBomb() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==374)		//Escape jutsu
			jutsu[i].wrappedJSObject.click();
	attemptMission();
}

function ICHC() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==484)		//Escape jutsu
			jutsu[i].wrappedJSObject.click();
}

function diagnosis() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==485)		//Escape jutsu
			jutsu[i].wrappedJSObject.click();
}
window.addEventListener("keydown", process_event, false);