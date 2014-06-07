// ==UserScript==
// @name        OGame Improve
// @namespace   de.ogame
// @include     http://*.ogame.gameforge.com/game/*
// @version     1
// @grant       none
// ==/UserScript==

var metalProduction = getProduction('metal_box');
var crystalProduction = getProduction('crystal_box');
var deuteriumProduction = getProduction('deuterium_box');
var countDownTimer;

for (var i = 0; i <= 30; i++) {
	try
	{
		//set a variable to refer to a specific ID
		var specialSection = document.getElementById("button"+i);
		
		//initiate this function when the user clicks the ID
		specialSection.onmouseup = function() {
			
			clearTimeout(countDownTimer);
			setTimeout(function() {weiter();}, 1500);
			
		};
	}
	catch(err)
	{
			
	}
}


for (var i = 100; i <= 200; i++) {
	try
	{
		//set a variable to refer to a specific ID
		var specialSection = document.getElementById("details"+i);
		
		//initiate this function when the user clicks the ID
		specialSection.onmouseup = function() {
			
			clearTimeout(countDownTimer);
			setTimeout(function() {weiter();}, 1500);
			
		};
	}
	catch(err)
	{
			
	}
}


for (var i = 401; i <= 408; i++) {
	try
	{
		//set a variable to refer to a specific ID
		var specialSection = document.getElementById("details"+i);
		
		//initiate this function when the user clicks the ID
		specialSection.onmouseup = function() {
			
			clearTimeout(countDownTimer);
			setTimeout(function() {weiter();}, 1500);
			
		};
	}
	catch(err)
	{
			
	}
}

for (var i = 501; i <= 505; i++) {
	try
	{
		//set a variable to refer to a specific ID
		var specialSection = document.getElementById("details"+i);
		
		//initiate this function when the user clicks the ID
		specialSection.onmouseup = function() {
			
			clearTimeout(countDownTimer);
			setTimeout(function() {weiter();}, 1500);
			
		};
	}
	catch(err)
	{
			
	}
}


for (var i = 100; i <= 220; i++) {
	try
	{
		//set a variable to refer to a specific ID
		var specialSection = document.getElementById("details"+i);
		
		//initiate this function when the user clicks the ID
		specialSection.onmouseup = function() {
			
			clearTimeout(countDownTimer);
			setTimeout(function() {weiter();}, 1500);
			
		};
	}
	catch(err)
	{
			
	}
}


function weiter() {
	
	var metal = getResources('resources_metal');
	var crystal = getResources('resources_crystal');
	var deut = getResources('resources_deuterium');
	var costs = document.getElementById('costs');
	
	var costsMetal = clearNumbers(getContentInContainer(costs,'metal tooltip'));
	var costsCrystal = clearNumbers(getContentInContainer(costs,'crystal tooltip'));
	var costsDeut = clearNumbers(getContentInContainer(costs,'deuterium tooltip'));
	calculate(metal, crystal, deut, costsMetal, costsCrystal, costsDeut);
}

function calculate(metal, crystal, deuterium, costsMetal, costsCrystal, costsDeut) {
	var difference_metal = metal - costsMetal;
	var difference_crystal = crystal - costsCrystal;
	var difference_Deut = deuterium - costsDeut;
	var time = 0;
	
	var metalProduction_s = metalProduction / 3600;
	var crystalProduction_s = crystalProduction / 3600;
	var deuteriumProduction_s = deuteriumProduction / 3600;
	
	if (difference_metal < 0 || difference_crystal < 0 || difference_Deut < 0) {
		var timeInSMetal = Math.floor(difference_metal/metalProduction_s);
		var timeInSCrystal = Math.floor(difference_crystal/crystalProduction_s);
		var timeInSDeut = Math.floor(difference_Deut/deuteriumProduction_s);
		if (timeInSMetal <= timeInSCrystal && timeInSMetal <= timeInSDeut) {
			setBuildTime(timeInSMetal);
		} else if (timeInSCrystal <= timeInSMetal && timeInSCrystal <= timeInSDeut) {
			setBuildTime(timeInSCrystal);
		} else if (timeInSDeut <= timeInSMetal && timeInSDeut <= timeInSCrystal) {
			setBuildTime(timeInSDeut);
		}
	}

}

function getContentInContainer(parent,matchClass) {
	
    var elems = parent.getElementsByTagName('*');
	
	if (matchClass.indexOf('cost ') > -1 && elems.length == 2) {
		return elems[1].innerHTML;
	}
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) {
            return getContentInContainer(elems[i], 'cost ');
        }
    }
	return '0';
	
}


function getProduction(id) {
	var element = document.getElementById(id);
	var titleElement = element.title;
	var index = titleElement.indexOf('+');
	if (index < -1) {
			index = titleElement.indexOf('-');
			
			if (index < -1) {
				return -1;
			}
	}
	
	var index2 = titleElement.indexOf('<', index);
	var sum = titleElement.substring(index,index2);
	if (sum.indexOf('+') > -1) {
		
		var zahl =  sum.substring(1);
		if (zahl.indexOf('.') > -1) {
			return sum*1000;
		}
		return sum;
	}
	return sum*1000;
}

function getResources(id) {
	var resources = document.getElementById(id).innerHTML;
	var resourcesZ = resources;
	if (resourcesZ.indexOf('.') > -1) {
		resourcesZ = resourcesZ * 1000;
	}
	return resourcesZ;
}

function clearNumbers(number) {
	
	if (number.indexOf('.') > -1) {
		return number * 1000;
	}
	return number*1;
}


function setBuildTime(seconds) {
	var seconds = Math.abs(seconds);
	var jetzt = new Date();
	
	var d = new Date();
	d.setSeconds(d.getSeconds()+seconds);
	var gesamtSekunden = d-jetzt;
	var tage=Math.floor(gesamtSekunden/(24*3600*1000));
    var stunden=Math.floor((gesamtSekunden-24*3600*1000*tage)/(3600*1000));
    var minuten=Math.floor((gesamtSekunden-24*3600*1000*tage-3600*1000*stunden)/(60*1000));
    var sekunden=Math.round((gesamtSekunden-24*3600*1000*tage-3600*1000*stunden-60*1000*minuten)/1000);
	var n = d.toLocaleString();
	var convert = convertTime(tage, stunden, minuten, sekunden);
	
	getPosAndSetText(n, convert);
	var count = new Date();
	count.setDate(tage);
	count.setHours(stunden);
	count.setMinutes(minuten);
	count.setSeconds(sekunden);
	
	clearTimeout(countDownTimer);
	countdown(n, count);
}

function getPosAndSetText(dateString, countdown) {
	
	var elems = document.getElementsByTagName('ul');
	
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' production_info ') > -1) {
				
				var node=document.createElement("LI");
				var textnode=document.createTextNode("Baubeginn: ");
				var txtSpan=document.createElement("span");
				txtSpan.className = "time";
				var dateInner=document.createTextNode(dateString);
				txtSpan.appendChild(dateInner);
				node.appendChild(textnode);
				node.appendChild(txtSpan);
				
				var nodeCountdown=document.createElement("LI");
				var textnodeCountdown=document.createTextNode("Möglich in: ");
				var txtSpanCountdown=document.createElement("span");
				txtSpanCountdown.className = "time";
				var dateInnerCountdown=document.createTextNode(countdown);
				txtSpanCountdown.appendChild(dateInnerCountdown);
				nodeCountdown.appendChild(textnodeCountdown);
				nodeCountdown.appendChild(txtSpanCountdown);
				
				if (GetUrlValue('page').indexOf('resources') > -1) {
					if (elems[i].childNodes.length <= 5) {
						elems[i].appendChild(node);
						elems[i].appendChild(nodeCountdown);
					} else {
						elems[i].lastChild.remove();
						elems[i].lastChild.remove();
						elems[i].appendChild(node);
						elems[i].appendChild(nodeCountdown);
					}
				} else if (GetUrlValue('page').indexOf('station') > -1
					|| GetUrlValue('page').indexOf('research') > -1
					|| GetUrlValue('page').indexOf('defense') > -1
					|| GetUrlValue('page').indexOf('shipyard') > -1){
					if (elems[i].childNodes.length <= 3) {
						elems[i].appendChild(node);
						elems[i].appendChild(nodeCountdown);
					} else {
						
						elems[i].lastChild.remove();
						elems[i].lastChild.remove();
						elems[i].appendChild(node);
						elems[i].appendChild(nodeCountdown);
					}
				}
				
				
				return;
        }
    }
	return;

}


function GetUrlValue(VarSearch){
	
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
	
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
        }
    }
}

function convertTime(tage, stunden, minuten, sekunden) {
	var countDownString = '';
	if (tage == 1) {
		countDownString += tage + ' Tag ';
	} else if (tage > 0) {
		countDownString += tage + ' Tage ';
	}
	
	if (stunden < 10) {
		countDownString += '0'+stunden;
	} else {
		countDownString += stunden;
	}
	
	if (minuten < 10) {
		countDownString += ':0'+minuten;
	} else {
		countDownString += ':'+minuten;
	}
	
	if (sekunden < 10) {
		countDownString += ':0'+sekunden;
	} else {
		countDownString += ':'+sekunden;
	}
	
	return countDownString;
}


function countdown(n, countdowns) {
	
	if (countdowns.getSeconds() == 0 && countdowns.getMinutes() == 0 && countdowns.getHours() == 0) {
		window.location.reload();
		return;
	}
	countdowns.setSeconds(countdowns.getSeconds()-1);
	var convert = '';
	if (countdowns.getDate() == 31) {
		
		convert = convertTime(0, countdowns.getHours(), countdowns.getMinutes(), countdowns.getSeconds());
	} else {
		convert = convertTime(countdowns.getDate(), countdowns.getHours(), countdowns.getMinutes(), countdowns.getSeconds());
	}
	
	
	getPosAndSetText(n, convert);
	countDownTimer = setTimeout(function() {countdown(n, countdowns);}, 1000);
}
