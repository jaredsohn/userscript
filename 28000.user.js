// JavaScript Document
// ==UserScript==
// @name           Ikariam Solarium 2.2
// @version        2.2
// @author         Pezmc and Kieran776 (Based on "Ikariam Solarium 1.2" by Foxtrod II)
// @e-mail         pegpro@gmail.com
// @description    Effect of day and night as well as fog and rain on cities and isands. With more reliable image host meaning faster loading and 0% downtime. Also allows you to host the images yourself - see http://ikariam.pezmc.com/solarium/ for more info.
// @include        http://s*.ikariam.tld/index.php
// @include        http://s*.ikariam.tld/index.php?*login*
// @include        http://s*.ikariam.tld/index.php?*view=city*
// @include        http://s*.ikariam.tld/index.php?*view=island*
// @include        http://s*.ikariam.tld/index.php?*view=worldmap_iso*
// @exclude        http://*board.ikariam.*/*
// ==/UserScript==


// ---- Version 1.8 ---- 

// Globals
var Debug = false, DebugStartTime, DebugStopTime;
var LocalTime, Hour, Minute, LocalDate;
var SunriseStartTime, DaylightStartTime, SunsetStartTime, NightStartTime;
var EffectNames, EffectTimes;
var WebAddress, WeatherDate, OverideEffect;
var RainStartTime, RainEndTime, FogStartTime, FogEndTime, SnowStartTime, SnowEndTime;

// Prep the Ikarium Solarium Script
function prepScript() {
	LocalTime = new Date();
	DebugStartTime = LocalTime.getMilliseconds();
	Hour = LocalTime.getHours();
	Minute = LocalTime.getMinutes();
	LocalDate = LocalTime.getDate() + "/" + LocalTime.getMonth() + "/" + LocalTime.getFullYear();
	
	EffectNames = ["Night", "Sunrise", "Sunset", "Rain", "Fog", "Snow"];
	EffectTimes = [];
	EffectTimes[0] = "Night";
	
	SunriseStartTime = GM_getValue("SunriseStartTime", '06:00');
	var SunriseSplit = SunriseStartTime.split(':');
	var SunriseInt = (parseInt(SunriseSplit[0] * 60) + parseInt(SunriseSplit[1]));
	EffectTimes[SunriseInt] = "Sunrise";
	
	DaylightStartTime = GM_getValue("DaylightStartTime", '09:00');
	var DaylightSplit = DaylightStartTime.split(':');
	var DaylightInt = (parseInt(DaylightSplit[0] * 60) + parseInt(DaylightSplit[1]));
	EffectTimes[DaylightInt] = "";
	
	SunsetStartTime = GM_getValue("SunsetStartTime", '18:00');
	var SunsetSplit = SunsetStartTime.split(':');
	var SunsetInt = (parseInt(SunsetSplit[0] * 60) + parseInt(SunsetSplit[1]));
	EffectTimes[SunsetInt] = "Sunset";
	
	NightStartTime = GM_getValue("NightStartTime", '20:00');
	var NightSplit = NightStartTime.split(':');
	var NightInt = (parseInt(NightSplit[0] * 60) + parseInt(NightSplit[1]));
	EffectTimes[NightInt] = "Night";
	
	WebAddress = GM_getValue("WebAddress", "http://solarium.pezmc.com/");
	WeatherDate = GM_getValue("WeatherDate", "");
	OverideEffect = GM_getValue("OverideEffect", "");
	
	RainStartTime = GM_getValue("RainStartTime", 11);
	RainEndTime = GM_getValue("RainEndTime", 12);
	FogStartTime = GM_getValue("FogStartTime", 0);
	FogEndTime = GM_getValue("FogEndTime", 2);
	SnowStartTime = GM_getValue("SnowStartTime", 11);
	SnowEndTime = GM_getValue("SnowEndTime", 12);
	
	setupMenus();
	if (WeatherDate !== LocalDate) {
		calculateWeather();
	}
	changeEffect();
	
	LocalTime = new Date();
	DebugStopTime = LocalTime.getMilliseconds();
	if (Debug) {
		alert("Ikarium Solarium execution time: " + (DebugStopTime - DebugStartTime) + " milliseconds.\nKeep this under 10 milliseconds if possible.");
	}
} //Prepared the Ikarium Solarium Script

// Lets start this thing
prepScript();

//////////////////////////////////
// SOLARIUM FUNCTIONS
//////////////////////////////////

//Setup Menus
function setupMenus() {
	GM_registerMenuCommand("Ikariam Solarium: Image Host", setWebAddress);
	GM_registerMenuCommand("Ikariam Solarium: Set Light Settings", lightSettings);
	GM_registerMenuCommand("Ikariam Solarium: Weather Forcast", weatherForcast);
	GM_registerMenuCommand("Ikariam Solarium: Overide Effect", overideEffect);
	GM_registerMenuCommand("Ikariam Solarium: Recalculate Weather", recalculateWeather);
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
	setDaylightStartTime();
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

//Set Daylight Start Time
function setDaylightStartTime() {
	var newDaylightStartTime = prompt('When does Daylight begin? (24 hour format -> hh:mm)', DaylightStartTime);
	if (newDaylightStartTime == null) {
		return false;
	} else if (!newDaylightStartTime.match(/^[0-9]{2}\:[0-9]{2}$/)) {
		alert("Daylight Start Time is an invalid format (24 hour format -> hh:mm)");
		return setDaylightStartTime();
	} else {
		GM_setValue("DaylightStartTime", newDaylightStartTime);
		return true;
	}
} //End Daylight Start Time

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
	//Fix the end times (its inclusive)
	var trueRainEndTime = RainEndTime + 1;
	var trueFogEndTime = FogEndTime + 1;
	var trueSnowEndTime = SnowEndTime + 1;
	if (FogStartTime !== 25) {
		alert ("Today it is going to be foggy from " + FogStartTime + ":00 untill " + trueFogEndTime + ":00");
	} else { 
		alert("It is not going to be foggy today"); 
	}
	if (RainStartTime !== 25) {
		alert ("Today it is going to rain from " + RainStartTime + ":00 until " + trueRainEndTime + ":00");
	} else {
		alert("It is not going to rain today"); 
	}
	if (SnowStartTime !== 25) {
		alert ("Today it is going to snow from " + SnowStartTime + ":00 untill " + trueSnowEndTime + ":00");
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

//Calculate Weather
function calculateWeather() {
	//Rain
	if (Math.random() > 0.5) {
		RainStartTime = (parseInt(10) + Math.round(Math.random() * (15 - 10)));
		RainEndTime = RainStartTime + (Math.round(Math.random()*2));
	} else { 
		RainStartTime = 25;
		RainEndTime = 25;
	}
	GM_setValue("RainStartTime", RainStartTime);
	GM_setValue("RainEndTime", RainEndTime);
	//End Rain

	//Fog
	if (Math.random() > 0.5) { 
		FogStartTime = (parseInt(0) + Math.round(Math.random() * (3 - 0)));
		FogEndTime = FogStartTime + (Math.round(Math.random()*2));
	} else { 
		FogStartTime = 25;
		FogEndTime = 25;
	}
	GM_setValue("FogStartTime", FogStartTime);
	GM_setValue("FogEndTime", FogEndTime);
	//End Fog
	
	//Snow
	if (Math.random() > 0.8 && RainStartTime == 25) {
		SnowStartTime = (parseInt(10) + Math.round(Math.random() * (15 - 10)));
		SnowEndTime = SnowStartTime + (Math.round(Math.random()*2));
	} else { 
		SnowStartTime = 25;
		SnowEndTime = 25;
	}
	GM_setValue("SnowStartTime", SnowStartTime);
	GM_setValue("SnowEndTime", SnowEndTime);
	//End Snow
	
	//Set the new weatherdate
	GM_setValue("WeatherDate", LocalDate);

	Update();
} //End Calculate Weather

//Change Effect Function
function changeEffect() {
	var effectTime = ((Hour * 60) + Minute);
	while (EffectTimes[effectTime] == undefined) {
		effectTime--;
	}
	var Effect = EffectTimes[effectTime];

	//Opacity in CSS
	//opacity:.50;filter: alpha(opacity=50); -moz-opacity: 0.5;

	//Weather
	if ( Hour >= FogStartTime && Hour <= FogEndTime) { Effect = "Fog"; }
	if ( Hour >= SnowStartTime && Hour <= SnowEndTime ) { Effect = "Snow"; }
	if ( Hour >= RainStartTime && Hour <= RainEndTime ) { Effect = "Rain"; }
	if ( OverideEffect != "") { Effect = OverideEffect; }

	var oldbody = (document.body.className || "") + " ";
	document.body.className = oldbody.replace(/(Sunset|Night|Sunrise|Fog|Rain|Snow)?/, Effect);

	changeEffect.done = changeEffect.done || 0; // already added CSS?
	if (!changeEffect.done++) { 
		GM_addStyle(<><![CDATA[
			/*======================================================================All Efects (Not Night)======================================================================*/
			/*--------------------------------City Phases--------------------------------*/
			#city.-EFFECT- #container .phase1 { background-image:url(-WEBADDRESS--EFFECT-/city_phase1.jpg); }
			#city.-EFFECT- #container .phase2,
			#city.-EFFECT- #container .phase3 { background-image:url(-WEBADDRESS--EFFECT-/city_phase2.jpg); }
			#city.-EFFECT- #container .phase4,
			#city.-EFFECT- #container .phase5, 
			#city.-EFFECT- #container .phase6 { background-image:url(-WEBADDRESS--EFFECT-/city_phase3.jpg); }
			#city.-EFFECT- #container .phase7, 
			#city.-EFFECT- #container .phase8,
			#city.-EFFECT- #container .phase9 { background-image:url(-WEBADDRESS--EFFECT-/city_phase4.jpg); }
			#city.-EFFECT- #container .phase10,
			#city.-EFFECT- #container .phase11,
			#city.-EFFECT- #container .phase12 { background-image:url(-WEBADDRESS--EFFECT-/city_phase5.jpg); }
			#city.-EFFECT- #container .phase13,
			#city.-EFFECT- #container .phase14,
			#city.-EFFECT- #container .phase15 { background-image:url(-WEBADDRESS--EFFECT-/city_phase6.jpg); }
			#city.-EFFECT- #container .phase16,
			#city.-EFFECT- #container .phase17 { background-image:url(-WEBADDRESS--EFFECT-/city_phase7.jpg); }
			#city.-EFFECT- #container .phase18,
			#city.-EFFECT- #container .phase19 { background-image:url(-WEBADDRESS--EFFECT-/city_phase7.jpg); }
			#city.-EFFECT- #container .phase20 { background-image:url(-WEBADDRESS--EFFECT-/city_phase8.jpg); }
			/*------------------------------------Buildings-----------------------------------*/
			#city.-EFFECT- #container #mainview #locations .museum .buildingimg {left:-8px; top:-38px; width:105px; height:85px;  background-image:url(-WEBADDRESS--EFFECT-/building_museum.gif);}
			#city.-EFFECT- #container #mainview #locations .shipyard .buildingimg {left:-22px; top:-20px; width:129px; height:100px; background-image:url(-WEBADDRESS--EFFECT-/building_shipyard.gif);}
			#city.-EFFECT- #container #mainview #locations .warehouse .buildingimg {left:0px; top:-33px; width:126px; height:86px;  background-image:url(-WEBADDRESS--EFFECT-/building_warehouse.gif);}
			#city.-EFFECT- #container #mainview #locations .wall .buildingimg {left:-500px; top:-15px; width:720px; height:137px;   background-image:url(-WEBADDRESS--EFFECT-/building_wall.gif);}
			#city.-EFFECT- #container #mainview #locations .tavern .buildingimg {left:-10px; top:-15px; width:111px; height:65px;  background-image:url(-WEBADDRESS--EFFECT-/building_tavern.gif);}
			#city.-EFFECT- #container #mainview #locations .palace .buildingimg {left:-10px; top:-42px; width:106px; height:97px;  background-image:url(-WEBADDRESS--EFFECT-/building_palace.gif);}
			#city.-EFFECT- #container #mainview #locations .academy .buildingimg {left:-19px; top:-31px; width:123px; height:90px; background-image:url(-WEBADDRESS--EFFECT-/building_academy.gif);}
			#city.-EFFECT- #container #mainview #locations .workshop-army .buildingimg {left:-19px; top:-31px; width:106px; height:85px; background-image:url(-WEBADDRESS--EFFECT-/building_workshop.gif);}
			#city.-EFFECT- #container #mainview #locations .safehouse .buildingimg {left:5px; top:-15px; width:84px; height:58px; background-image:url(-WEBADDRESS--EFFECT-/building_safehouse.gif);}
			#city.-EFFECT- #container #mainview #locations .branchOffice .buildingimg {left:-19px; top:-31px; width:109px; height:84px; background-image:url(-WEBADDRESS--EFFECT-/building_branchOffice.gif);}
			#city.-EFFECT- #container #mainview #locations .embassy .buildingimg {left:-5px; top:-31px; width:93px; height:85px; background-image:url(-WEBADDRESS--EFFECT-/building_embassy.gif);}
			#city.-EFFECT- #container #mainview #locations .palaceColony .buildingimg {left:-10px; top:-42px; width:109px; height:95px;  background-image:url(-WEBADDRESS--EFFECT-/building_palaceColony.gif);}
			#city.-EFFECT- #container #mainview #locations .townHall .buildingimg {left:-5px; top:-60px; width:104px; height:106px; background-image:url(-WEBADDRESS--EFFECT-/building_townhall.gif);}
			#city.-EFFECT- #container #mainview #locations .barracks .buildingimg {left:0px; top:-33px; width:100px; height:76px; background-image:url(-WEBADDRESS--EFFECT-/building_barracks.gif);}
			#city.-EFFECT- #container #mainview #locations .port .buildingimg {left:-65px; top:-35px; width:163px; height:131px; background-image:url(-WEBADDRESS--EFFECT-/building_port.gif);}
			#city.-EFFECT- #container #mainview #locations li .constructionSite { left:-20px; top:-30px; width:114px; height:81px; background-image:url(-WEBADDRESS--EFFECT-/constructionSite.gif);}
			/*------------------------------------Flags-----------------------------------*/
			#city.-EFFECT- #container #mainview #locations .land .flag {background-image:url(-WEBADDRESS--EFFECT-/flag_red.gif);}
			#city.-EFFECT- #container #mainview #locations .shore .flag {background-image:url(-WEBADDRESS--EFFECT-/flag_blue.gif);}
			#city.-EFFECT- #container #mainview #locations .wall .flag {background-image:url(-WEBADDRESS--EFFECT-/flag_yellow.gif);}
			/*Ikariam Background*/
			//#extraDiv1 {position:absolute;top:0px;right:0px;width:100%;height:147px;background:url(layout/bg_sky.jpg) repeat top center;z-index:1;}
			//#extraDiv2 {position:absolute;top:147px;left:0px;width:100%;height:189px;background:url(layout/bg_ocean.jpg) repeat top center;z-index:1;}
			//#header {position:relative;height:336px;margin:0 -132px -189px -132px;background:#f3dcb6 url(layout/bg_header.jpg) no-repeat;}
		]]></>.toXMLString().replace(/-WEBADDRESS-/g, WebAddress).replace(/-EFFECT-/g, Effect));
		
		if (Effect == "Night") {
			GM_addStyle(<><![CDATA[
				/*======================================================================Night======================================================================*/
				/*-----------------------------------Islands Night Flags-----------------------------------*/
				#island.Night #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; background-image:url(-WEBADDRESS-Night/flag_yellow.gif); width:29px; height:40px; }
				/*-----------------------------------Islands Night-----------------------------------*/
				#island.Night #container #mainview {padding:0;height:440px;background-image:url(-WEBADDRESS-Night/Isla_Night/bg_island.jpg);}
				/*-----------------------------------Cities that are Red-----------------------------------*/
				#island.Night #container #mainview #cities .level1 div.cityimg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_1_red.gif) no-repeat 13px 10px;}
				#island.Night #container #mainview #cities .level2 div.cityimg,
				#island.Night #container #mainview #cities .level3 div.cityimg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_2_red.gif) no-repeat 13px 13px;}
				#island.Night #container #mainview #cities .level4 div.cityimg,
				#island.Night #container #mainview #cities .level5 div.cityimg,
				#island.Night #container #mainview #cities .level6 div.cityimg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_3_red.gif) no-repeat 13px 13px;}
				#island.Night #container #mainview #cities .level7 div.cityimg,
				#island.Night #container #mainview #cities .level8 div.cityimg,
				#island.Night #container #mainview #cities .level9 div.cityimg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_4_red.gif) no-repeat 11px 13px;}
				#island.Night #container #mainview #cities .level10 div.cityimg,
				#island.Night #container #mainview #cities .level11 div.cityimg,
				#island.Night #container #mainview #cities .level12 div.cityimg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_5_red.gif) no-repeat 8px 13px;}
				#island.Night #container #mainview #cities .level13 div.cityimg,
				#island.Night #container #mainview #cities .level14 div.cityimg,
				#island.Night #container #mainview #cities .level15 div.cityimg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_6_red.gif) no-repeat 4px 7px;}
				#island.Night #container #mainview #cities .level16 div.cityimg,
				#island.Night #container #mainview #cities .level17 div.cityimg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_7_red.gif) no-repeat 4px 7px;}
				#island.Night #container #mainview #cities .level18 div.cityimg,
				#island.Night #container #mainview #cities .level19 div.cityimg,
				#island.Night #container #mainview #cities .level20 div.cityimg,
				#island.Night #container #mainview #cities .level21 div.cityimg,
				#island.Night #container #mainview #cities .level22 div.cityimg,
				#island.Night #container #mainview #cities .level23 div.cityimg,
				#island.Night #container #mainview #cities .level24 div.cityimg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_8_red.gif) no-repeat 2px 4px;}
				/*-----------------------------------Cities that are blue-----------------------------------*/
				#island.Night #container #mainview #cities .level1 div.ownCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_1_blue.gif) no-repeat 13px 10px;}
				#island.Night #container #mainview #cities .level2 div.ownCityImg,
				#island.Night #container #mainview #cities .level3 div.ownCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_2_blue.gif)no-repeat 13px 13px;}
				#island.Night #container #mainview #cities .level4 div.ownCityImg,
				#island.Night #container #mainview #cities .level5 div.ownCityImg,
				#island.Night #container #mainview #cities .level6 div.ownCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_3_blue.gif) no-repeat 13px 13px;}
				#island.Night #container #mainview #cities .level7 div.ownCityImg,
				#island.Night #container #mainview #cities .level8 div.ownCityImg,
				#island.Night #container #mainview #cities .level9 div.ownCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_4_blue.gif) no-repeat 11px 13px;}
				#island.Night #container #mainview #cities .level10 div.ownCityImg,
				#island.Night #container #mainview #cities .level11 div.ownCityImg,
				#island.Night #container #mainview #cities .level12 div.ownCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_5_blue.gif) no-repeat 8px 13px;}
				#island.Night #container #mainview #cities .level13 div.ownCityImg,
				#island.Night #container #mainview #cities .level14 div.ownCityImg,
				#island.Night #container #mainview #cities .level15 div.ownCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_6_blue.gif) no-repeat 4px 7px;}
				#island.Night #container #mainview #cities .level16 div.ownCityImg,
				#island.Night #container #mainview #cities .level17 div.ownCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_7_blue.gif)no-repeat 4px 7px;}
				#island.Night #container #mainview #cities .level18 div.ownCityImg,
				#island.Night #container #mainview #cities .level19 div.ownCityImg,
				#island.Night #container #mainview #cities .level20 div.ownCityImg,
				#island.Night #container #mainview #cities .level21 div.ownCityImg,
				#island.Night #container #mainview #cities .level22 div.ownCityImg,
				#island.Night #container #mainview #cities .level23 div.ownCityImg,
				#island.Night #container #mainview #cities .level24 div.ownCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_8_blue.gif) no-repeat 2px 4px;}
				/*-----------------------------------Cities that are Green-----------------------------------*/
				#island.Night #container #mainview #cities .level1 div.allyCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_1_green.gif) no-repeat 13px 10px;}
				#island.Night #container #mainview #cities .level2 div.allyCityImg,
				#island.Night #container #mainview #cities .level3 div.allyCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_2_green.gif) no-repeat 13px 13px;}
				#island.Night #container #mainview #cities .level4 div.allyCityImg,
				#island.Night #container #mainview #cities .level5 div.allyCityImg,
				#island.Night #container #mainview #cities .level6 div.allyCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_3_green.gif) no-repeat 13px 13px;}
				#island.Night #container #mainview #cities .level7 div.allyCityImg,
				#island.Night #container #mainview #cities .level8 div.allyCityImg,
				#island.Night #container #mainview #cities .level9 div.allyCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_4_green.gif) no-repeat 11px 13px;}
				#island.Night #container #mainview #cities .level10 div.allyCityImg,
				#island.Night #container #mainview #cities .level11 div.allyCityImg,
				#island.Night #container #mainview #cities .level12 div.allyCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_5_green.gif) no-repeat 8px 13px;}
				#island.Night #container #mainview #cities .level13 div.allyCityImg,
				#island.Night #container #mainview #cities .level14 div.allyCityImg,
				#island.Night #container #mainview #cities .level15 div.allyCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_6_green.gif) no-repeat 4px 7px;}
				#island.Night #container #mainview #cities .level16 div.allyCityImg,
				#island.Night #container #mainview #cities .level17 div.allyCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_7_green.gif) no-repeat 4px 7px;}
				#island.Night #container #mainview #cities .level18 div.allyCityImg,
				#island.Night #container #mainview #cities .level19 div.allyCityImg,
				#island.Night #container #mainview #cities .level20 div.allyCityImg,
				#island.Night #container #mainview #cities .level21 div.allyCityImg,
				#island.Night #container #mainview #cities .level22 div.allyCityImg,
				#island.Night #container #mainview #cities .level23 div.allyCityImg,
				#island.Night #container #mainview #cities .level24 div.allyCityImg {background:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_8_green.gif) no-repeat 2px 4px;}
				#island.Night #container #mainview #cities .city .buildCityImg { display:block; position:absolute; left:0px; bottom:0px; background-image:url(-WEBADDRESS-Night/Isla_Night/ciudades_Night/city_constr.gif); width:64px; height:63px;}
				/*-----------------------------------Wonders-----------------------------------*/
				#island.Night #container #mainview #islandfeatures .wonder1 { background-image:url(-WEBADDRESS-Night/Isla_Night/maravillas_Night/wonder1_large.gif);}
				#island.Night #container #mainview #islandfeatures .wonder2 { background-image:url(-WEBADDRESS-Night/Isla_Night/maravillas_Night/wonder2_large.gif);}
				#island.Night #container #mainview #islandfeatures .wonder3 { background-image:url(-WEBADDRESS-Night/Isla_Night/maravillas_Night/wonder3_large.gif);}
				#island.Night #container #mainview #islandfeatures .wonder4 { background-image:url(-WEBADDRESS-Night/Isla_Night/maravillas_Night/wonder4_large.gif);}
				#island.Night #container #mainview #islandfeatures .wonder5 { background-image:url(-WEBADDRESS-Night/Isla_Night/maravillas_Night/wonder5_large.gif);}
				#island.Night #container #mainview #islandfeatures .wonder6 { background-image:url(-WEBADDRESS-Night/Isla_Night/maravillas_Night/wonder6_large.gif);}
				#island.Night #container #mainview #islandfeatures .wonder7 { background-image:url(-WEBADDRESS-Night/Isla_Night/maravillas_Night/wonder7_large.gif);}
				#island.Night #container #mainview #islandfeatures .wonder8 { background-image:url(-WEBADDRESS-Night/Isla_Night/maravillas_Night/wonder8_large.gif);}
				/*-----------------------------------Resources-----------------------------------*/
				#island.Night #container #mainview #islandfeatures .marble a {width:60px; height:63px; background-image:url(-WEBADDRESS-Night/Isla_Night/recursos_Night/resource_marble.gif);}
				#island.Night #container #mainview #islandfeatures .wood a {width:45px; height:41px; background-image:url(-WEBADDRESS-Night/Isla_Night/recursos_Night/resource_wood.gif);}
				#island.Night #container #mainview #islandfeatures .wine a {width:93px; height:48px; background-image:url(-WEBADDRESS-Night/Isla_Night/recursos_Night/resource_wine.gif);}
				#island.Night #container #mainview #islandfeatures .crystal a {width:56px; height:43px; background-image:url(-WEBADDRESS-Night/Isla_Night/recursos_Night/resource_glass.gif);}
				#island.Night #container #mainview #islandfeatures .sulfur a {width:78px; height:46px; background-image:url(-WEBADDRESS-Night/Isla_Night/recursos_Night/resource_sulfur.gif);}
				/*-----------------------------------Selection Ring-----------------------------------*/
				#island.Night #container #mainview #cities .selectimg { position:absolute; top:18px; left:-7px; visibility:hidden;  background-image:url(-WEBADDRESS-Night/Isla_Night/select_city.gif); width:81px; height:55px;}
				/*-----------------------------------World View-----------------------------------*/
				#worldmap_iso.Night #worldmap .ocean1{background-image:url(-WEBADDRESS-Night/mundo_Night/tile_ocean01.gif);}
				#worldmap_iso.Night #worldmap .ocean2{background-image:url(-WEBADDRESS-Night/mundo_Night/tile_ocean02.gif);}
				#worldmap_iso.Night #worldmap .ocean3{background-image:url(-WEBADDRESS-Night/mundo_Night/tile_ocean03.gif);}
				#worldmap_iso.Night #worldmap .ocean_feature1{background-image:url(-WEBADDRESS-Night/mundo_Night/tile_ocean_feature01.gif);}
				#worldmap_iso.Night #worldmap .ocean_feature2{background-image:url(-WEBADDRESS-Night/mundo_Night/tile_ocean_feature02.gif);}
				#worldmap_iso.Night #worldmap .ocean_feature3{background-image:url(-WEBADDRESS-Night/mundo_Night/tile_ocean_feature03.gif);}
				#worldmap_iso.Night #worldmap .ocean_feature4{background-image:url(-WEBADDRESS-Night/mundo_Night/tile_ocean_feature04.gif);}
				#worldmap_iso.Night #worldmap .island1 {background-image:url(-WEBADDRESS-Night/mundo_Night/tile_island01.gif);}
				#worldmap_iso.Night #worldmap .island2 {background-image:url(-WEBADDRESS-Night/mundo_Night/tile_island02.gif);}
				#worldmap_iso.Night #worldmap .island3 {background-image:url(-WEBADDRESS-Night/mundo_Night/tile_island03.gif);}
				#worldmap_iso.Night #worldmap .island4 {background-image:url(-WEBADDRESS-Night/mundo_Night/tile_island04.gif);}
				#worldmap_iso.Night #worldmap .island5 {background-image:url(-WEBADDRESS-Night/mundo_Night/tile_island05.gif);}
				#worldmap_iso.Night #worldmap .island6 {background-image:url(-WEBADDRESS-Night/mundo_Night/tile_island06.gif);}
				#worldmap_iso.Night #worldmap .island7 {background-image:url(-WEBADDRESS-Night/mundo_Night/tile_island07.gif);}
				#worldmap_iso.Night #worldmap .island8 {background-image:url(-WEBADDRESS-Night/mundo_Night/tile_island08.gif);}
				#worldmap_iso.Night #worldmap .island9 {background-image:url(-WEBADDRESS-Night/mundo_Night/tile_island09.gif);}
				#worldmap_iso.Night #worldmap .island10 {background-image:url(-WEBADDRESS-Night/mundo_Night/tile_island10.gif);}
				#worldmap_iso.Night #worldmap .wonder1 {background-image:url(-WEBADDRESS-Night/mundo_Night/wonder1.gif);width:38px;height:53px;}
				#worldmap_iso.Night #worldmap .wonder2 {background-image:url(-WEBADDRESS-Night/mundo_Night/wonder2.gif);width:37px;height:66px;}
				#worldmap_iso.Night #worldmap .wonder3 {background-image:url(-WEBADDRESS-Night/mundo_Night/wonder3.gif);width:37px;height:48px;}
				#worldmap_iso.Night #worldmap .wonder4 {background-image:url(-WEBADDRESS-Night/mundo_Night/wonder4.gif);width:33px;height:77px;}
				#worldmap_iso.Night #worldmap .wonder5 {background-image:url(-WEBADDRESS-Night/mundo_Night/wonder5.gif);width:38px;height:49px;}
				#worldmap_iso.Night #worldmap .wonder6 {background-image:url(-WEBADDRESS-Night/mundo_Night/wonder6.gif);width:28px;height:51px;}
				#worldmap_iso.Night #worldmap .wonder7 {background-image:url(-WEBADDRESS-Night/mundo_Night/wonder7.gif);width:37px;height:70px;}
				#worldmap_iso.Night #worldmap .wonder8 {background-image:url(-WEBADDRESS-Night/mundo_Night/wonder8.gif);width:27px;height:70px;}
			]]></>.toXMLString().replace(/-WEBADDRESS-/g, WebAddress));
		}
	}
} //End Change Effect

function Update() {
	alert('This script is outdated, please visit http://code.google.com/p/ikariamsolarium/source/list or http://ikariamsolarium.googlecode.com/svn/trunk/ikariam_solarium.user.js for the latest version.');
	if (confirm('Would you like to be update?')){
		window.location="http://ikariamsolarium.googlecode.com/svn/trunk/ikariam_solarium.user.js";
	}
}

// In Array
function in_array (what, where) {
	for (var i = 0; i < where.length; i++) {
		if (what == where[i]) { return true; }
	}
	return false;
} //End In Array