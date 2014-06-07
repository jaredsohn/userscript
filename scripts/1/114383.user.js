// ==UserScript==
// @name           GLB Player Value Calculator 1_0
// @namespace      avidday
// @description    calculate a player value
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// ==/UserScript==

// Constants borrowed from monsterkill script
var commonHeaders = {
	"User-agent": "Mozilla/5.0 (compatible) Greasemonkey",
	"Accept": "text/html,application/xml,text/xml"
};

var attributeNames = [
    'strength',
    'speed',
    'agility',
    'jumping',
    'stamina',
    'vision',
    'confidence',
    'blocking',
    'throwing',
    'catching',
    'carrying',
    'tackling',
    'kicking',
    'punting'
];
// End Constants


// Add elements to page
var valueDiv = document.createElement('div');
document.getElementById("player_vitals").appendChild(valueDiv);
valueDiv.innerHTML = "<span><b>Player Value Calculator</b><br/>Player Value =</span></br>";

var valueVADiv = document.createElement('span');
valueDiv.appendChild(valueVADiv);
valueVADiv.innerHTML = "Press Button to Calculate</br>";


var calcButton = document.createElement('input');
calcButton.id = "calcButton";
calcButton.type = "button";
calcButton.value = "Calculate Player Value";
calcButton.addEventListener("click", parsePlayerPage, true);
valueDiv.appendChild(calcButton);

// Add up everything, then send to output
function testCalc(incomingVA){
	var skillTotal = 0;
	var i = 0;
		do{
		skillTotal = skillTotal + calcValue(getAttribute(attributeNames[i]));
		i++;
	} while (i<14);
	//alert("Skill Total = " + skillTotal);
	var saTotal = getSATotal();
	//alert("SA Total = " + saTotal);
	var existVA = getVA(incomingVA);
	//alert("VA Total = " + existVA);
	var whatSP = getSP();
	//alert("SP Total = " + whatSP);
	var totalPoints = truncate(skillTotal + saTotal + parseFloat(whatSP) + existVA * 0.1);
	
	setValue(totalPoints);

}

// Get Player ID, borrowed from monsterkill
function parsePlayerId() {
    var pid = window.location.search;
    pid = pid.slice(pid.indexOf('player_id=')+'player_id='.length);
    if (pid.indexOf('&') > -1) {
        pid = pid.slice(0,pid.indexOf('&'));
    } else {
        pid = pid.slice(0);
    }
	return pid;
}

//Get VA Points from Player Page, partially borrowed from monsterkill
function parsePlayerPage() {
    var playerId = parsePlayerId();
	var unspentVA = 0;
	var spentVA = 0;
	GM_xmlhttpRequest({
        method: 'GET',
        url: "/game/player.pl?player_id="+playerId,
        headers: commonHeaders,
        onload: function(responseDetails) {
			var txt = responseDetails.responseText;
			if (txt.indexOf('<span>Vet Pts:</span>') >-1) {
				var vasplit = txt.split('<span>Vet Pts:</span>');
				var unspentVAtemp = vasplit[1].substring(vasplit[1].indexOf('>')+1,vasplit[1].indexOf('</a>'));
				unspentVA = parseInt(unspentVAtemp);
			} else {
				unspentVA=0;
			}	
			var diditsplit;
			var additup = 0;
			var regexResultVA = txt.match(/(skill_level_\d+\D+)(\d+)/ig);
			if(regexResultVA != null){
				var howLong = regexResultVA.length;
				for (var i=0; i<howLong; i++){
					diditsplit = regexResultVA[i].split('>');
					additup = additup + parseInt(diditsplit[1]);
				}
			}
			var totalVA = unspentVA + additup;
			valueVADiv.innerHTML = "VA points before VPB=" + totalVA + "</br>";
			testCalc(totalVA);
		}
		
	});
	
}
// Holy cow it worked, get the VA from player page, simulated VA from this page, add them
function getVA(holycowVA){
	var earnedVA = holycowVA;
	//alert("Real = " + earnedVA);
	if (document.getElementById("currentVADiv")){
	        var getSimulatedVA = document.getElementById("currentVADiv").innerHTML;
		if(getSimulatedVA.length >0){
		var simVA = getSimulatedVA.split(':');
		var futureVA = parseInt(simVA[1]);
		}else{
		var futureVA = 0;
		}
		}else{
		var futureVA = 0;
	}
	//alert("Future = " + futureVA);
	var totalVA = earnedVA + futureVA;
	return totalVA;
}

// Get unspent SP from page
function getSP(){
	var findSP = document.getElementById("skill_points");
	var foundSP = findSP.innerHTML;
	return foundSP;
}	
// Get SA's from page
function getSATotal() {
    var skilltree = unsafeWindow.skills;
	var count = 0;
	var currentSkill = 0, sasTotal = 0;
    for (s in skilltree) {
		count++;
		if(count==5){
		count=0;
        currentSkill = calcValSPB(parseInt(document.getElementById('skill_level_' + s).innerHTML));
		} else {
		currentSkill = calcValSP(parseInt(document.getElementById('skill_level_' + s).innerHTML));
		}
		
		sasTotal = sasTotal + currentSkill;
    }
	return sasTotal;
}
// Output to page
function setValue(newValue) {
    var value = newValue;
	valueDiv.innerHTML = "<span><b>Player Value Calculator</b></span><br/>Player Value = " + value + "</br>";
	valueDiv.appendChild(valueVADiv);
	valueVADiv.innerHTML = "Press Button to Calculate</br>";
	calcButton.addEventListener("click", parsePlayerPage, true);
    valueDiv.appendChild(calcButton);   
 }
 // Get value from page for each attribute
function getAttribute(incoming) {
	var thisvalue = incoming;
    return parseFloat(document.getElementById(thisvalue).innerHTML);
}
// Find value from spent skill points
function calcValue(incoming) {
		var attribute = incoming;
		var resultVal = 0.0;
		var currentVal = 0.0;
		var currentCapVal = 0.0; 
		var totalCapVal = 0.0; 
		var j = 0.0;
		var holder = 0; 
		var k = 2; 
		var m = 0.0;
		var leftover = 0.0;
		var remainder = attribute - Math.floor(attribute);
		
		if (attribute < 48.07) {
			return attribute;
		}

		if (remainder <= 0.06) {
			currentVal = 49 + remainder;

		} else {
			currentVal = 48 + remainder;
		}

		totalCapVal = currentVal;

		holder =  parseInt(Math.floor(Math.exp(0.0003 * Math.pow(attribute, 2))));
				
		do {
			j = truncate(Math.sqrt(Math.log( parseFloat(k + 1)) / 0.0003)) + 0.01;
			if (attribute > j) {
				m = parseFloat(k);
				currentCapVal = Math.ceil(j - totalCapVal);
				totalCapVal = totalCapVal + currentCapVal;
				currentVal = currentVal + currentCapVal * m;
				
			} else {
				leftover = attribute - totalCapVal;
				break;
			}

			k++;
		} while (k <= holder);
		
		var p = parseFloat(holder);
		
		resultVal = ((currentVal + leftover *  p));
				
		return resultVal;

}

//Value from first four SA's
function calcValSP (value){
	var total=0
	while (value >0) {
		total = total + Math.ceil( parseFloat(value) /2.0);
		value--;
	}
	return total;
}
//Value from fifth SA
function calcValSPB (value){
	var total=0
	while (value >0) {
		total = total + Math.ceil( parseFloat(value) /2.0) + 1;
		value--;
	}
	return total;
}

// Trim to two decimal places, apparently doesn't always work...
function truncate(y) {
		var x = parseFloat(y);
		var z = ((parseFloat(parseInt(Math.floor(x * 100))))/ 100);
		return z;
	}
	
