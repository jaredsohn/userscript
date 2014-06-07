// ==UserScript==
// @name                      Ikariam Solarium
// @namespace                 http://ikariamsolarium.googlecode.com/
// @version                   1.9.1
// @author                    Pezmc and kieran776 (Based on "Ikariam Solarium 1.2" by Foxtrod II)
// @e-mail                    pegpro@gmail.com
// @namespace                 Ikarium Solarium
// @description               Effect of day and night as well as fog and rain on cities and isands. With more reliable image host meaning faster loading, 0% downtime, and transitions between effects. Also allows you to host the images yourself - see http://ikariamsolarium.googlecode.com/ for more info.
// @include                   http://s*.ikariam.tld/index.php
// @include                   http://s*.ikariam.tld/*login*
// @include                   http://s*.ikariam.tld/*?view=city*
// @include                   http://s*.ikariam.tld/*?view=island*
// @include                   http://s*.ikariam.tld/*?view=worldmap_iso*
// @resource town             town.css
// @resource island           island.css
// @resource world            world.css
// @resource transition_town  transition_town.css
// ==/UserScript==

// ---- Version 1.9.1 ---- 
var CurrentVersion = "1.9.1";

// Globals
var Debug = false, DebugStartTime, DebugStopTime;
var LocalTime, Hour, Minute, LocalDate, MinutesPastMidnight;
var WebAddress, LastWeatherCalculation, OverideEffect;
var SunriseStartTime, SunshineStartTime, SunsetStartTime, NightStartTime;
var EffectNames, EffectTimes;
var RainStartTime, RainEndTime, FogStartTime, FogEndTime, SnowStartTime, SnowEndTime;
var RainStartInt = 0, RainEndInt = 0, FogStartInt = 0, FogEndInt = 0, SnowStartInt = 0, SnowEndInt = 0;
var loadTransitions = true;

// Prep the Ikarium Solarium Script
function prepScript() {
	LocalTime = new Date();
	if (Debug) {
		DebugStartTime = LocalTime.getMilliseconds();
	}
	Hour = LocalTime.getHours();
	Minute = LocalTime.getMinutes();
	LocalDate = LocalTime.getDate() + "/" + LocalTime.getMonth() + "/" + LocalTime.getFullYear();
	MinutesPastMidnight = ((Hour * 60) + Minute);
	
	WebAddress = GM_getValue("WebAddress", "http://ikariamsolarium.googlecode.com/svn/trunk/");
	LastWeatherCalculation = GM_getValue("LastWeatherCalculation", "");
	OverideEffect = GM_getValue("OverideEffect", "");
	
	if ( LastWeatherCalculation !== LocalDate ) {
		calculateWeather();
		checkForUpdate(false);
	}
	
	EffectNames = ["Night", "Sunrise", "Sunshine", "Sunset", "Rain", "Fog", "Snow"];
	EffectTimes = [];
	EffectTimes[0] = "Night";
	
	SunriseStartTime = GM_getValue("SunriseStartTime", '06:00');
	EffectTimes[minutesSinceMidnight(SunriseStartTime)] = "Sunrise";
	
	SunshineStartTime = GM_getValue("SunshineStartTime", '09:00');
	EffectTimes[minutesSinceMidnight(SunshineStartTime)] = "Sunshine";
	
	SunsetStartTime = GM_getValue("SunsetStartTime", '18:00');
	EffectTimes[minutesSinceMidnight(SunsetStartTime)] = "Sunset";
	
	NightStartTime = GM_getValue("NightStartTime", '20:00');
	EffectTimes[minutesSinceMidnight(NightStartTime)] = "Night";
	
	//Weather
	RainStartTime = GM_getValue("RainStartTime", '10:00');
	RainEndTime = GM_getValue("RainEndTime", '12:00');
	if (RainStartTime != false) {
		RainStartInt = minutesSinceMidnight(RainStartTime);
		RainEndInt = minutesSinceMidnight(RainEndTime);
	}
	
	FogStartTime = GM_getValue("FogStartTime", '00:00');
	FogEndTime = GM_getValue("FogEndTime", '02:00');
	if (FogStartTime != false) {
		FogStartInt = minutesSinceMidnight(FogStartTime);
		FogEndInt = minutesSinceMidnight(FogEndTime);
	}
	
	SnowStartTime = GM_getValue("SnowStartTime", '15:00');
	SnowEndTime = GM_getValue("SnowEndTime", '17:00');
	if (SnowStartTime != false) {
		SnowStartInt = minutesSinceMidnight(SnowStartTime);
		SnowEndInt = minutesSinceMidnight(SnowEndTime);
	}
	
	setupMenus();
	changeEffect();
	if (loadTransitions) {
		setupTransitions();
	}
	
	if (Debug) {
		LocalTime = new Date();
		DebugStopTime = LocalTime.getMilliseconds();
		alert("Ikarium Solarium execution time: " + (DebugStopTime - DebugStartTime) + " milliseconds.\nKeep this under 15 milliseconds if possible.");
	}
} //Prepared the Ikarium Solarium Script

// Lets start this thing
prepScript();

//////////////////////////////////
// SOLARIUM FUNCTIONS
//////////////////////////////////

//Calculate Weather
function calculateWeather() {
	//Rain
	var NewRainStartTime = false, NewRainEndTime = false;
	if ( Math.random() >= 0.4 ) {
		var results = calculateWeatherTimes(9, 18);
		NewRainStartTime = results[0];
		NewRainEndTime = results[1];
	}
	GM_setValue("RainStartTime", NewRainStartTime);
	GM_setValue("RainEndTime", NewRainEndTime);
	//End Rain
	
	//Fog
	var NewFogStartTime = false, NewFogEndTime = false;
	if ( Math.random() > 0.6 ) {
		var results = calculateWeatherTimes(0, 6);
		NewFogStartTime = results[0];
		NewFogEndTime = results[1];
	}
	GM_setValue("FogStartTime", NewFogStartTime);
	GM_setValue("FogEndTime", NewFogEndTime);
	//End Fog

	//Snow
	var NewSnowStartTime = false, NewSnowEndTime = false;
	if ( Math.random() > 0.8 && NewRainStartTime == false ) {
		var results = calculateWeatherTimes(9, 18);
		NewSnowStartTime = results[0];
		NewSnowEndTime = results[1];
	}
	GM_setValue("SnowStartTime", NewSnowStartTime);
	GM_setValue("SnowEndTime", NewSnowEndTime);
	//End Snow
	
	//Set the new Last Weather Calculation
	GM_setValue("LastWeatherCalculation", LocalDate);
} //End Calculate Weather

//Weather Time Calculations function
function calculateWeatherTimes(minStart, maxEnd) {
	var WeatherStartHour = minStart + Math.round(Math.random() * (maxEnd - minStart));
	var WeatherEndHour = WeatherStartHour - 1;
	while ( WeatherEndHour < WeatherStartHour ) {
		WeatherEndHour = maxEnd - Math.round(Math.random() * (maxEnd - minStart));
	}
	var WeatherStartMinute = Math.round(Math.random() * 20);
	var WeatherEndMinute = WeatherStartMinute - 1;
	if ( WeatherStartHour == WeatherEndHour ) {
		while ( WeatherEndMinute < WeatherStartMinute ) {
			WeatherEndMinute = Math.round(Math.random() * 59);
		}
	} else {
		WeatherEndMinute = Math.round(Math.random() * 59);
	}
	var results = [];
	results[0] = zeroPad(WeatherStartHour, 2) + ":" + zeroPad(WeatherStartMinute, 2);
	results[1] = zeroPad(WeatherEndHour, 2) + ":" + zeroPad(WeatherEndMinute, 2);
	return results;
} //End Weather Time Calculations

//Check for Update Function
function checkForUpdate(manual) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://ikariamsolarium.googlecode.com/svn/trunk/version.txt',
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.8.1.14) Gecko/20080404 Firefox/2.0.0.14',
            'Accept': 'text/plain,text/html,text/xml',
        },
        onload: function(responseDetails) {
        NewVersion = responseDetails.responseText;
            if ( NewVersion != CurrentVersion ) {
							alert('This version of the Ikarium Solarium script is outdated.');
							if (confirm('Would you like to update the script now?')) {
								window.location="http://ikariamsolarium.googlecode.com/svn/trunk/ikariam_solarium.user.js";
							}
						} else if (manual) {
							alert('There are no new updates to the Ikarium Solarium script available.');
						} else {
							//alert('silent check');
						}
        } 
    })
}//End Check for Update

//Get minutes since midnight function
function minutesSinceMidnight (text) {
	var ArraySplit = text.split(':');
	return (parseInt(ArraySplit[0] * 60) + parseInt(ArraySplit[1]));
} //End Get minutes since midnight

//Setup Menus
function setupMenus() {
	GM_registerMenuCommand("Ikariam Solarium: Image Host", setWebAddress);
	GM_registerMenuCommand("Ikariam Solarium: Set Light Settings", lightSettings);
	GM_registerMenuCommand("Ikariam Solarium: Weather Forcast", weatherForcast);
	GM_registerMenuCommand("Ikariam Solarium: Overide Effect", overideEffect);
	GM_registerMenuCommand("Ikariam Solarium: Recalculate Weather", recalculateWeather);
	GM_registerMenuCommand("Ikariam Solarium: Check for Update", manuallyCheckForUpdate);
} //End Setup Menus

//Web Address
function setWebAddress(PreEnteredWebAddress) {
	var WebAddressOld = WebAddress;
	var NewWebAddress = prompt("Where are your images hosted? (needs http://)", PreEnteredWebAddress || WebAddressOld);
	if (NewWebAddress == null) { // cancelling
		return false;
	} else {
		if (!NewWebAddress.match(/^http\:\/\/[A-Z0-9_\/\.-]+\/$/i)) {
			alert("Invalid URL. Must start with http:// and have a trailing slash");
			setWebAddress(NewWebAddress);
			return false;
		}
	}
	GM_setValue("WebAddress", NewWebAddress);
	window.location.reload();
	return true;
} //End Web Address

//Light Settings
function lightSettings() {
	setSunriseStartTime();
	setSunshineStartTime();
	setSunsetStartTime();
	setNightStartTime();
	window.location.reload();
	return true;
} //End Light Settings

//Set Sunrise Start Time
function setSunriseStartTime() {
	var newSunriseStartTime = prompt('When does Sunrise begin? (24 hour format -> hh:mm)', SunriseStartTime);
	if (newSunriseStartTime == null) {
		return false;
	} else if (!newSunriseStartTime.match(/^[0-9]{2}\:[0-9]{2}$/)) {
		alert("Sunrise Start Time is an invalid format (24 hour format -> hh:mm)");
		return setSunriseStartTime();
	} else {
		GM_setValue("SunriseStartTime", newSunriseStartTime);
		return true;
	}
} //End Sunrise Start Time

//Set Sunshine Start Time
function setSunshineStartTime() {
	var newSunshineStartTime = prompt('When does Sunshine begin? (24 hour format -> hh:mm)', SunshineStartTime);
	if (newSunshineStartTime == null) {
		return false;
	} else if (!newSunshineStartTime.match(/^[0-9]{2}\:[0-9]{2}$/)) {
		alert("Sunshine Start Time is an invalid format (24 hour format -> hh:mm)");
		return setSunshineStartTime();
	} else {
		GM_setValue("SunshineStartTime", newSunshineStartTime);
		return true;
	}
} //End Sunshine Start Time

//Set Sunset Start Time
function setSunsetStartTime() {
	var newSunsetStartTime = prompt('When does Sunset begin? (24 hour format -> hh:mm)', SunsetStartTime);
	if (newSunsetStartTime == null) {
		return false;
	} else if (!newSunsetStartTime.match(/^[0-9]{2}\:[0-9]{2}$/)) {
		alert("Sunset Start Time is an invalid format (24 hour format -> hh:mm)");
		return setSunsetStartTime();
	} else {
		GM_setValue("SunsetStartTime", newSunsetStartTime);
		return true;
	}
} //End Sunset Start Time

//Set Night Start Time
function setNightStartTime() {
	var newNightStartTime = prompt('When does Night begin? (24 hour format -> hh:mm)', NightStartTime);
	if (newNightStartTime == null) {
		return false;
	} else if (!newNightStartTime.match(/^[0-9]{2}\:[0-9]{2}$/)) {
		alert("Night Start Time is an invalid format (24 hour format -> hh:mm)");
		return setNightStartTime();
	} else {
		GM_setValue("NightStartTime", newNightStartTime);
		return true;
	}
} //End Night Start Time

//Weather Forcast
function weatherForcast() {
	if (RainStartTime != false) {
		alert("Today it is going to rain from " + RainStartTime + " until " + RainEndTime);
	} else {
		alert("It is not going to rain today"); 
	}
	if (FogStartTime != false) {
		alert("Today it is going to be foggy from " + FogStartTime + " until " + FogEndTime);
	} else { 
		alert("It is not going to be foggy today"); 
	}
	if (SnowStartTime != false) {
		alert("Today it is going to snow from " + SnowStartTime + " until " + SnowEndTime);
	} else {
		alert("It is not going to snow today"); 
	}
} //End Weather Forcast

//Override Effect
function overideEffect() {
	var OverideEffectOld = OverideEffect;
	var validEffectsString = EffectNames.join(", ");
	var NewOverideEffect = prompt("What do you want the weather to be? ("+validEffectsString+"). Empty string to stop overide.", OverideEffectOld)
	if (NewOverideEffect == null) { // they want to cancel
		return false;
	} else if (NewOverideEffect == '') { // they want to reset overide
		NewOverideEffect = '';
	} else {
		if (!in_array(NewOverideEffect, EffectNames)) {
			alert("Invalid Effect. Must be one of "+validEffectsString+".");
			overideEffect();
			return false;
		}
	}
	GM_setValue("OverideEffect", NewOverideEffect);
	window.location.reload();
	return true;
} //End Overide Effect

//Recalculate Weather
function recalculateWeather() {
	calculateWeather()
	window.location.reload();
} //End Recalculate Weather

//Manually check for update
function manuallyCheckForUpdate() {
	checkForUpdate(true);
} //End manual update check

//Change Effect Function
function changeEffect() {
	var effectTime = MinutesPastMidnight;
	while (EffectTimes[effectTime] == undefined) {
		effectTime--;
	}
	var Effect = EffectTimes[effectTime];
	
	//Weather
	if ( RainStartTime != false && MinutesPastMidnight >= RainStartInt && MinutesPastMidnight <= RainEndInt ) { Effect = "Rain"; }
	if ( FogStartTime != false && MinutesPastMidnight >= FogStartInt && MinutesPastMidnight <= FogEndInt ) { Effect = "Fog"; }
	if ( SnowStartTime != false && MinutesPastMidnight >= SnowStartInt && MinutesPastMidnight <= SnowEndInt ) { Effect = "Snow"; }
	if ( OverideEffect != "" ) { Effect = OverideEffect; }
	
	var oldbody = " " + (document.body.className || "");
	document.body.className = oldbody.replace(/(Night|Sunrise|Sunshine|Sunset|Fog|Rain|Snow)?/, Effect);
	
	changeEffect.done = changeEffect.done || 0; // already added CSS?
	if (!changeEffect.done++) {
		GM_addStyle(GM_getResourceText("town").replace(/-WEBADDRESS-/g, WebAddress).replace(/-EFFECT-/g, Effect));
		if (Effect == "Night" || Effect == "Sunshine") { // which ones have island views?
			GM_addStyle(GM_getResourceText("island").replace(/-WEBADDRESS-/g, WebAddress).replace(/-EFFECT-/g, Effect));
		}
		if (Effect == "Night" || Effect == "Sunshine") { // which ones have world views?
			GM_addStyle(GM_getResourceText("world").replace(/-WEBADDRESS-/g, WebAddress).replace(/-EFFECT-/g, Effect));
		}
	}
} //End Change Effect function

// Load Transition
function setupTransitions() {
	var effectTime = MinutesPastMidnight;
	while (EffectTimes[effectTime] == undefined) {
		effectTime++;
		if (effectTime > 1440) {
			return false; // effect time not till tomorrow, maintain the current effect till then
		}
	}
	var Effect = EffectTimes[effectTime];
	
	var minutesLeft = effectTime - MinutesPastMidnight;
	if (minutesLeft <= 60) {
		var Opacity = (60 - minutesLeft) / 60;
		// will return something like this:
		// 0 = 60 mins till next effect	// 0.1 = 54 // 0.2 = 48 // 0.3 = 42 // 0.4 = 36 // 0.5 = 30 // 0.6 = 24 // 0.7 = 18 // 0.8 = 12 // 0.9 = 6  // 1   = 0 (effect happening)
		// console.log(effect_shading);
		
		if (document.getElementById('mainview')) {
			var mainview = document.getElementById('mainview');
			var mainview_transition = document.createElement('div');
			mainview_transition.setAttribute('id', 'mainview_transition');
			mainview_transition.setAttribute('class', 'transition');
			mainview.appendChild(mainview_transition);
		}
		
		for (var i = 0; i <= 14; i++) {
			if (document.getElementById('position'+i+'')) {
				var position = document.getElementById('position'+i+'');
				var position_transition = document.createElement('div');
				position_transition.setAttribute('class', 'transition');
				position.appendChild(position_transition);
			}
		}
		
		GM_addStyle(GM_getResourceText("transition_town").replace(/-WEBADDRESS-/g, WebAddress).replace(/-EFFECT-/g, Effect).replace(/-OPACITY-/g, Opacity));
	}
} //End Transition

//////////////////////////
// EXTRA FUNCTIONS
//////////////////////////

//Add zero's function
function zeroPad (text, digits) {
	text = text.toString();
	while (text.length < digits) {
		text = '0' + text;
	}
	return text;
} //End Add Zero's

// In Array Function
function in_array (what, where) {
	for (var i = 0; i < where.length; i++) {
		if (what == where[i]) { return true; }
	}
	return false;
} //End In Array Function