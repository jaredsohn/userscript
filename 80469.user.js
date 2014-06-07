// ==UserScript==
// @name           Mousehunt Autohunter
// @namespace      alkenrinnstet
// @description    Sound the horn every 15 minutes plus random delay; alert when King's Reward occurs. Edit file for user configuration.
// @include        http://*.facebook.com/mousehunt/*
// ==/UserScript==

//User configuration
var refreshRate = 1;     //amount of time between checks, in minutes
var refreshTimeout = 15; //amount of time before next alert, in minutes
var delayRange = 20;     //amount of variation for the timer delay, in seconds
var delayMin = 10;       //minimum delay, in seconds
var alertReward = 1;     //set to 1 for alerts whenever you receive a King's Reward
var alertRewardText = 'King\'s Reward!';
var alertUrl = 'http://apps.facebook.com/mousehunt/turn.php';
var alertLowCheese = 1;  //set to 1 for alerts whenever you are low on cheese
var alertLowValue = 2; 	 //amount of cheese considered low
var alertNoCheese = 1;   //set to 1 for alerts whenever you are out of cheese
//Rememeber to escape quotation marks (') with a backslash (\) when used in a text string
//End user configuration

//Do not edit anything below this line unless you know what you're doing!
//
function delayReward() {
	var cyy = document.getElementsByTagName('h1');
	for (var i=0; i < cyy.length; i++) {
		if (cyy[i].innerHTML=='Claim Your Reward!') {
			return 1;
		};
	};
	return 0;
};
function checkCheese() {
	if (document.getElementById('app10337532241_hud_baitQuantity').innerHTML == 0) {
		return 0;
	} else if (document.getElementById('app10337532241_hud_baitQuantity').innerHTML <= alertLowValue) {
		return -1;
	} else {
		return 1;
	};
};
var debugCount=0;
var refreshTimeout=100;
if (delayReward()) {
	if(alertReward) {
		alert(alertRewardText);
		refreshTimeout=-(refreshTimeout*60000-100);
	};
} else {
	if (checkCheese() == 0) {
		if (alertNoCheese) {
			alert('Out of cheese!');
			refreshTimeout=-(refreshTimeout*60000-100);
		};
	} else if (checkCheese() == -1) {
		if (alertLowCheese) {
			alert('Low cheese!');
			refreshTimeout=-(refreshTimeout*60000-100);
		};
	} else {
		if (getComputedStyle(document.getElementById('app10337532241_huntTimer'), '').getPropertyValue("display") == 'none') {
			setTimeout(function() {
				document.location = alertUrl;
				debugCount++;
			},Math.floor((Math.random()*delayRange+delayMin)*1000));
		};
	};
};
setInterval(function() {
	if (delayReward()) {
		if(alertReward && refreshTimeout>0) {
			alert(alertRewardText);
			refreshTimeout=-(refreshTimeout*60000-100);
		};
	} else {
		if (checkCheese() == 0) {
			if (alertNoCheese && refreshTimeout>0) {
				alert('Out of cheese!');
				refreshTimeout=-(refreshTimeout*60000-100);
			};
		} else if (checkCheese() == -1) {
			if (alertLowCheese && refreshTimeout>0) {
				alert('Low cheese!');
				refreshTimeout=-(refreshTimeout*60000-100);
			};
		} else {
			if (getComputedStyle(document.getElementById('app10337532241_huntTimer'), '').getPropertyValue("display") == 'none') {
				setTimeout(function() {
					document.location = alertUrl;
					debugCount++;
				},Math.floor((Math.random()*delayRange+delayMin)*1000));
			};
		};
	};
	refreshTimeout+=refreshRate*60000;
},refreshRate*60000);