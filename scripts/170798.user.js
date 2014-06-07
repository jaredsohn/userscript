// ==UserScript==
// @name			KoC Battle Console
// @namespace		kbc
// @description		Console for controlling battles in Kingdoms of Camelot
// @icon			https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/nav/chrome_quest_over.png
// @include			*.kingdomsofcamelot.com/*main_src.php*
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			GM_listValues
// @grant			GM_addStyle
// @grant			GM_log
// @grant			GM_xmlhttpRequest
// @grant			GM_getResourceText
// @grant			unsafeWindow
// @version			20140513b
// @releasenotes 	<p>Choice of update URLs (Usersripts, Googlecode or Greasyfork)</p><p>Alternate sort order in Monitor (Range,Attack,Defence,Life,Speed,Accuracy,Load)</p><p>Link to profile from monitor window</p>
// ==/UserScript==

//	+-------------------------------------------------------------------------------------------------------+
//	¦	This script can be found at http://code.google.com/p/koc-battle-console/							¦
//	¦	It is licensed under a Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License:	¦
//	¦	http://creativecommons.org/licenses/by-nc-nd/3.0													¦
//	¦																										¦
//	¦	May 2014 Barbarossa69 (www.facebook.com/barbarossa69)												¦
//	+-------------------------------------------------------------------------------------------------------+

var Version = '20140513b'; 

//Fix weird bug with koc game
if (window.self.location != window.top.location){
	if (window.self.location.href == window.parent.location.href){
		return; //If iframe source is same as the parent don't load script
	}
}

// Global Variables

var Options = {
	WinPos        	  	: {},
	WinSize        	  	: {},
	MonPos        	  	: {},
	IncPos        	  	: {},
	OutPos        	  	: {},
	DefPos        	  	: {},
	LogPos        	  	: {},
	OverrideAttackAlert : true,
	MonitorColours      : true,
	LastMonitored       : "",
	LastMonitoredUID    : 0,
	MonitorSound        : false,
	BattleStartState    : false,
	MonitorStartState   : false,
	IncomingStartState  : false,
	OutgoingStartState  : false,
	DefenceStartState   : false,
	IncAttack           : true,
	IncScout            : true,
	IncReinforce        : true,
	IncReassign         : false,
	IncTransport        : false,
	IncWilds            : false,
	IncYours            : false,
	IncResources        : true,
	OutAttack           : true,
	OutScout            : true,
	OutReinforce        : true,
	OutReassign         : false,
	OutTransport        : false,
	OutYours            : false,
	OutReturning        : false,
	OutResources        : false,
	AutoUpdates         : true,
	RefreshSeed         : false,
	CurrentCity         : -1,
	OverviewState       : true,
	SacrificeState      : false,
	ReinforceState      : false,
	ReinforceState      : false,
	FortificationState  : false,
	AttackState         : false,
	CityAttackState     : false,
	DefaultSacrifice    : true,
	DefaultSacrificeMin : 1,
	DefaultSacrificeSec : 0,
	QuickSacrifice      : true,
	OverviewBattleBtn   : true,
	SleepMode           : false,
	PVPOnly             : false,
	DashboardMode       : false,
	PresetChange        : true,
	MonPresetChange     : true,
	GuardianChange      : true,
	ChampionCompare     : false,
	Transparent         : true,
	Volume              : 100,
	SacrificeLimit      : 1000000,
	DefaultDefenceNum   : 200000,
	MonitorChampions    : false,
	DefAddTroopShow     : true,
	DefPresetShow       : true,
	DefPresets          : {},
	UpperDefendButton   : false,
	LowerDefendButton   : true,
	EnableOutgoing      : false,
	TRPresetByName      : false,
	TRMonPresetByName   : false,
	TRPresets           : {},
	OverrideDashboard   : {},
	MonitorFontSize		: 11,
	UpdateLocation      : 0, // 0 - Userscripts, 1 - Googlecode, 2 - Greasyfork
	USPort              : 8080,
	AlternateSortOrder  : false,
};

var JSON2 = JSON; 

var mainPop;
var popMon;
var popDef;
var popInc;
var popOut;
var popLog;
var Castles;
var Champs;

var uW = unsafeWindow;
var Seed = unsafeWindow.seed;
var CM = unsafeWindow.cm;

var RefreshingSeed = false;

var btStartupTimer = null;
var SecondTimer = null;
var KeyTimer = null;
var MonitorLooper = 0;
var MonitorInterval = 3;
var ResetMonitorCountDown = 900;
var MonitorCountDown = 0;
var SecondLooper = 1;
var RefreshSeedInterval = 15;
var MonitoringActive = false;
var MonitoringPaused = false;
var MonitorTimedOut = false;
var cText = ""; 
var LastUser = "";
var serverwait = false;
var Incoming = false;
var Outgoing = false;
var StillComing = false;
var CurrentCityId = 0;
var CityIncoming = false;
var CityOutgoing = false;
var CityStillComing = false;
var SaveGemHTML;
var SaveGemHTML2;
var GemContainer;
var GemContainer2;
var oldchamp = 0;
var DefOptionsString = "";
var QuickSacString = "";
var allownewsacs = false;
var ForceTries = 0;
var WinHeight = 220;
var MonWidth=300;
var MonHeight=500;
var fontratio=1;
var ThroneUID;
  
var	SacSettings;
var SacSpeed;
var	SacSpeedBuff;
var	DarkRitual;
var	ChannelledSuffering;
var TotalTroops;
var TotalSanctuaryTroops;

var FFVersion = getFirefoxVersion();

var GlobalEffects = [1,2,3,4,5,6,7,17,18,19,20,21,22,23,102,103,8,9,73];

var AttackEffects = [1,17,24,29,34,39,44,50,56,61,102];
var DefenceEffects = [2,18,25,30,35,40,45,51];
var LifeEffects = [3,19,26,31,36,41,46,52,104];
var RangeEffects = [5,21,37,42,58,63];
var SpeedEffects = [4,20,27,32,47,53,57,62];
var AccuracyEffects = [7,23,28,33,38,43,49,55,60,65];
var OtherCombatEffects = [8,9,13,14,15,16,73];
var OtherPVPEffects = [6,22,48,54,59,64];

var DebuffEffects = [17,18,19,20,22,21,23,29,39,50,54,61,30,40,51,31,41,52,42,63,64,32,53,62];

var AlternateSortOrder = [5,37,58,21,42,63,1,24,34,44,56,102,17,29,39,50,61,2,25,35,45,18,30,40,51,3,26,36,46,104,19,31,41,52,4,27,47,57,20,32,53,62,7,28,38,49,60,23,33,43,55,65,6,48,59,22,54,64];

var guardTypes = ["wood", "ore", "food", "stone"];
var tileTypes = {0:"Bog",10:"Grassland",11:"Lake",20:"Wood",30:"Hill",40:"Mountain",50:"Plain",51:"City",52:"Ruin",53:"Misted City",54:"Dark Forest",55:"Merc Camp"};
 
var TitleBG = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/modal/700_bars_4.png";
var PanelBG = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/dialog_740_r2_c1.jpg";
var AlertBG = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/tower/timer_bg.png";
var DivBG = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/nav/resource_bar_ascension.png";
var GuardBG = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/guardian_change_spritemap102.png";

var AttackImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/attacking.jpg";
var ScoutImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/scouting.jpg";
var ReinforceImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/reinforce.jpg";
var ReassignImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/autoAttack/raid_resting.png";
var TransportImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/transporting.jpg";
var ReturnImage = "https://kabam1-a.akamaihd.net/silooneofcamelot/fb/e2/src/img/returning.jpg";
var GauntletImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/221.jpg";
var BloodLustImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/261.jpg";
var BloodFrenzyImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/262.jpg";
var BloodFuryImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/280.jpg";
var BarkSkinImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/271.jpg";
var StoneSkinImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/272.jpg";
var IronSkinImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/30/281.jpg";
var RightArrow = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/autoAttack/across_arrow.png";
var DownArrow = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/autoAttack/down_arrow.png";
var ThroneImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/bonus_throne.png";
var PresetImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/set_active.png";
var PresetImage_SEL = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/set_selected.png";
var MistImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/10021.jpg";
var DoveImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/901.jpg";

var	GoldImage = 'https://kabam1-a.akamaihd.net/silooneofcamelot/fb/e2/src/img/gold_30.png';
var FoodImage = 'https://kabam1-a.akamaihd.net/silooneofcamelot/fb/e2/src/img/food_30.png';
var WoodImage = 'https://kabam1-a.akamaihd.net/silooneofcamelot/fb/e2/src/img/wood_30.png';
var StoneImage = 'https://kabam1-a.akamaihd.net/silooneofcamelot/fb/e2/src/img/stone_30.png';
var OreImage = 'https://kabam1-a.akamaihd.net/silooneofcamelot/fb/e2/src/img/iron_30.png';
var AetherImage = 'https://kabam1-a.akamaihd.net/silooneofcamelot/fb/e2/src/img/aetherstone_30.png';

var TroopImagePrefix = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_";
var TroopImageSuffix = "_30.jpg";

var ChampImagePrefix = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/champion_hall/championPort_0";
var ChampImageSuffix = "_50x50.jpg";

var ShieldImage = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/362.jpg";

var URL_CASTLE_BUT = "data:image/png;base64,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";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,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";

var HisStatEffects = [];
var MyStatEffects  = [];

var OpenDiv      = {};
var Cities       = {};
var userInfo     = {};
var rsltInfo     = {};
var HTMLRegister = {};
var local_atkp   = {};
var local_atkinc = {};

var inc          = [];
var incCity      = [];
var out          = [];
var outCity      = [];

var Reins	      = [];
var WallDefences  = [];
var FieldDefences = [];

var Infantry = [];
var Ranged   = [];
var Horsed   = [];
var Siege    = [];

DefaultDashboard = {"Overview":{Display:true, Sequence:0},"Sacrifices":{Display:true, Sequence:10},"Troops":{Display:true, Sequence:20},"Reinforcements":{Display:true, Sequence:30},"Fortifications":{Display:true, Sequence:40},"Outgoing Attacks":{Display:true, Sequence:50},"Incoming Attacks":{Display:true, Sequence:60}};

var OverviewShow = true;
var SacrificeShow = true;
var ReinforceShow = true;
var TroopShow = true;
var FortificationShow = true;
var AttackShow = true;
var CityAttackShow = true;
var SelectiveDefending = true;

for (var ui in uW.cm.UNIT_TYPES){
	i = uW.cm.UNIT_TYPES[ui];
	var tt = uW.cm.unitFrontendType[i];
	switch(tt) {
		case "specialist": // specialist is the same as siege...
			Siege.push(i);
			break;
		case "siege":
			Siege.push(i);
			break;
		case "horsed":
			Horsed.push(i);
			break;
		case "ranged":
			Ranged.push(i);
			break;
		default:
			Infantry.push(i);
	}
}	

for (k in uW.cm.thronestats.effects) {
	if (AlternateSortOrder.indexOf(parseInt(k)) == -1) {
		AlternateSortOrder.push(parseInt(k));
	}
}

var CurrLog = [];
var LogUser = "";
var	LogTR = [];
var LastTR = [];
var MaxLogEntries = 50;
var MonitorID = 0;
var NameFilter = '';
var AllianceFilter = '';
var DashWidth = 490;
var CurrPreset = Seed.throne.activeSlot;
var	ThroneDelay = 0;
var GuardDelay = 0;
var ExpandMarshall = false;
var ExpandChampion = false;
var ExpandDefPreset = false;
var citychamp;
var marchchamp;

var GoogleCodeURL = 'koc-battle-console.googlecode.com/svn/trunk/KoCBattleConsole.user.js'
var GreasyForkURL = 'greasyfork.org/scripts/890-koc-battle-console/code/KoC Battle Console.user.js'

var presetTimer = null;
var presetFailures = 0;
var NextPresetNumber = 0;
var InitPresetNumber = 0;

if (typeof SOUND_FILES == 'undefined') var SOUND_FILES = new Object();
if (typeof SOUND_FILES.timeout == 'undefined'){
	SOUND_FILES.timeout = new Object();
	SOUND_FILES.timeout.MP3 = 'data:audio/mp3;base64,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';
	SOUND_FILES.timeout.OGG = 'data:audio/ogg;base64,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4Rg6v/Djqaqvm64rDKcsC7/t68az+76yjK7r+6osC78q28Kx677z/L6wLKPs+sJqy8Kw2rYx3L5uLL9wHMtr68ox675RtnV8X3gKw/N0dV15Zl3H9nV040c4fsoAAIABBwCAABPKQKEhKwKAOAEAjySJomRZoihZliiKpui6omi6rqRppqlpnmlammeapmmqsimarixpmmlanmaamqeZpmiarmuapqyKpinLpmrKsmmasuy6sm27rmzbomnKsmmasmyapiy7sqvbruzquqRZpql5nmlqnmeapmrKsmmarqt5nmp6nmiqniiqqmqqqq2qqixbnmeamuippieKqmqqpq2aqirLpqrasmmqtmyqqm27quz6sm3rummqsm2qpi2bqmrbruzqsizbui9pmmlqnmeamueZpmmasmyaqitbnqeaniiqquaJpmqqqiybpqrKlueZqieKquqJnmuaqirLpmraqmmatmyqqi2bpirLrm37vuvKsm6qqmybqmrrpmrKsmzLvu/Kqu6KpinLpqrasmmqsi3bsu/Lsqz7omnKsmmqsm2qqi7Lsm0bs2z7umiasm2qpi2bqirbsi37uizbuu/Krm+rqqzrsi37uu76rnDrujC8smz7qqz6uivbum/rMtv2fUTTlGVTNW3bVFVZdmXZ9mXb9n3RNG1bVVVbNk3VtmVZ9n1Ztm1hNE3ZNlVV1k3VtG1Zlm1htmXhdmXZt2Vb9nXXlXVf133j12Xd5rqy7cuyrfuqq/q27vvCcOuu8AoAABhwAAAIMKEMFBqyEgCIAgAAjGGMMQiNUs45B6FRyjnnIGTOQQghlcw5CCGUkjkHoZSUMucglJJSCKGUlFoLIZSUUmsFAAAUOAAABNigKbE4QKEhKwGAVAAAg+NYlueZomrasmNJnieKqqmqtu1IlueJommqqm1bnieKpqmqruvrmueJommqquvqumiapqmqruu6ui6aoqmqquu6sq6bpqqqriu7suzrpqqqquvKriz7wqq6rivLsm3rwrCqruvKsmzbtm/cuq7rvu/7wpGt67ou/MIxDEcBAOAJDgBABTasjnBSNBZYaMhKACADAIAwBiGDEEIGIYSQUkohpZQSAAAw4AAAEGBCGSg0ZCUAEAMAABABIYMQQgghhBBCCCGEEEIIIYQQQuecc84555xzzgkA2I9wAJB6MDExhYWGrAQA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';
	SOUND_FILES.timeout.DEFAULT = '<span><object type="application/x-shockwave-flash" data="http://koc.god-like.org/power/swf/pdxminiplayer.swf" width="160" height="20"><param name="wmode" value="transparent" /><param name="movie" value="http://koc.god-like.org/power/swf/pdxminiplayer.swf" /><param name="flashvars" value="mp3=http://koc-power-tools.googlecode.com/svn/trunk/sounds/arrow.mp3&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>';
}
if (typeof SOUND_FILES.monitor == 'undefined'){
	SOUND_FILES.monitor = new Object();
	SOUND_FILES.monitor.MP3 = 'data:audio/mp3;base64,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';
	SOUND_FILES.monitor.OGG = 'data:audio/ogg;base64,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';
	SOUND_FILES.monitor.DEFAULT = '<span><object type="application/x-shockwave-flash" data="http://koc.god-like.org/power/swf/pdxminiplayer.swf" width="160" height="20"><param name="wmode" value="transparent" /><param name="movie" value="http://koc.god-like.org/power/swf/pdxminiplayer.swf" /><param name="flashvars" value="mp3=http://koc-power-tools.googlecode.com/svn/trunk/sounds/DoorBell.mp3&amp;autostart=1&amp;showtime=1&amp;volume=100" /></object></span>';
}

uW.btDoveOfPeace = function (iid){
	// popup
	unsafeWindow.Modal.multiButton({	buttons: [	{ txt: "Use Dove of Peace", exe: function () {unsafeWindow.Modal.hideModal();UseDove(iid);}},
													{ txt: "Cancel Request", exe: function () {unsafeWindow.Modal.hideModal();}}],
										body: "<center> Please confirm you want to use a Dove of Peace?</center>",
										title: "Confirm Dove"
									});
}									

uW.btShowCity = function (idx) {
	var l = document.getElementById("citysel_" + idx);
	uW.citysel_click(l);
	uW.changeview_city(document.getElementById("mod_views_city"));
	uW.btShowDefenceWindow();
}

uW.btGotoMapHide = function (x, y){
	try {
		uW.Modal.hideModal();
	} catch (e){ }
	try {
		Modal.hideModal();
	} catch (e){ }
	uW.btGotoMap (x, y);  
}

uW.btGotoMap = function (x, y){
	setTimeout (function (){ 
		document.getElementById('mapXCoor').value = x;
		document.getElementById('mapYCoor').value = y;
		uW.reCenterMapWithCoor();
		var a = document.getElementById("mod_views").getElementsByTagName("a");
		for (var b = 0; b < a.length; b++) {
			a[b].className = "buttonv2 nav h20"
		}
		document.getElementById('mod_views_map').className = "buttonv2 nav h20 sel";
		document.getElementById("maparea_city").style.display = 'none';
		document.getElementById("maparea_fields").style.display = 'none';
		document.getElementById("maparea_map").style.display = 'block';
		uW.tutorialClear()
	}, 0);
};

uW.btShowKnightsHall = function (city) {
	var l = document.getElementById("citysel_" + (city + 1));
	uW.citysel_click(l);
	uW.openKnightsHall();
	uW.changeKnightModalTabs(1);
}

uW.btShowGuardians = function (city) {
	var l = document.getElementById("citysel_" + (city + 1));
	uW.citysel_click(l);
	uW.cm.guardianModalModel.open();
}

uW.btShowChampion = function () {
	uW.cm.ChampionModalController.open();
}


uW.btShowEmbassy = function (city) {
	var l = document.getElementById("citysel_" + (city + 1));
	uW.citysel_click(l);
	
	var c = Seed.buildings["city" + uW.currentcityid],
	b,
	a;
	for (b in c) {
		if (c[b][0] == "8") {
			a = c[b][2];
			break
		}
	}
	uW.modal_build(a)
}

uW.btSendAllHome = function (cityId) {
	uW.jQuery('#btSendAllHome').addClass("disabled");
	serverwait = true;
	var Returns = [];
	Returns = Reins.slice();
	var delayer = 0;
    for (r in Returns) {
		var mid = Returns[r];
		delayer = delayer + 1;
		setTimeout (SendHome,(500*delayer),mid); // spread them out ...
	}
	delayer = delayer + 1;
	setTimeout (function () { uW.jQuery('#btSendAllHome').removeClass("disabled"); serverwait = false; },(500*delayer)); // let screen updates run again
}

uW.btCreateChampionPopUp = function (elem,chkcityId,localchamp) {
	effects = document.getElementById(elem.id+'effects');
	// do a compare, or get local champ details...
	if (Options.ChampionCompare || localchamp) {
		var oureffects = '<table cellspacing=0><tr><td class=xtab><b><center><br>No Champion<br>Assigned!</center></b></td></tr></table>';

		try {
			RefreshChampionData();
			for (y in Champs.champions) {
				chkchamp = Champs.champions[y];
				if (chkchamp.id) {
					if (chkchamp.city == chkcityId) {
						oureffects = '<table cellspacing=0><tr><td colspan=2><b>'+chkchamp.name+'</b></td></tr><tr><td colspan=2><b>Champion Stats</b></td></tr>';
						var gotchamp = false;
						for (cy in chkchamp.stats.champion) {
							cs = chkchamp.stats.champion[cy];
							gotchamp = true;
							oureffects+="<tr><td>"+cs.name+"</td><td>"+cs.amount+"</td></tr>";
						}	
						if (!gotchamp) { oureffects += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
						oureffects+="<tr><td colspan=2><b>Troop Stats</b></td></tr>";
						var gottroop = false;
						for (ty in chkchamp.stats.troop) {
							ts = chkchamp.stats.troop[ty];
							gottroop = true;
							oureffects+="<tr><td>"+ts.name+"</td><td>"+ts.amount+"</td></tr>";
						}	
						if (!gottroop) { oureffects += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
						oureffects+="</table>";
					}	
				}
			}
		}		
		catch (err) {
			logerr(err); // write to log
			oureffects = '<table cellspacing=0><tr><td class=xtab><b><center>Error reading champion data :(</center></b></td></tr></table>';
		}
	}	

	td = document.getElementById(elem.id+'td');
	unsafeWindow.jQuery('#'+td.id).children("span").remove();
	if (localchamp) {
		unsafeWindow.jQuery('#'+td.id).append('<span class="trtip"><table cellspacing=0><tr style="vertical-align:top;"><td class=xtab>'+oureffects+'</td></tr></table></span>');
	}
	else {
		if (Options.ChampionCompare) {
			unsafeWindow.jQuery('#'+td.id).append('<span class="trtip"><table cellspacing=0><tr style="vertical-align:top;"><td class=xtab>'+effects.value+'</td><td class=xtab>'+oureffects+'</td></tr></table></span>');
		}
		else {
			unsafeWindow.jQuery('#'+td.id).append('<span class="trtip">'+effects.value+'</span>');
		}
	}	
}

uW.btSelectTroopType = function (sel) {SelectTroopType(sel);}
uW.btSetRitualLength = function (sel) {SetRitualLength(sel);}
uW.btCheckDefaultRitual = function (sel) {CheckDefaultRitual(sel);}
uW.btStartRitual = function () {StartRitual();}
uW.btStopRitual = function (sacNo) {StopRitual(sacNo);}
uW.btQuickSacrifice = function (tt) {QuickSacrifice(tt);}
uW.btSetMaxTroops = function () {SetMaxTroops();}
uW.btSendHome = function (marchId) {SendHome(marchId);}
uW.btShowDefenceWindow = function () {ShowWatchTower (Cities.byID[uW.currentcityid]);}
uW.btMapMonitorTR = function(e) {if (e.user.id != "0") { initMonitor (e.user.id, false); }}
uW.btShowLog = function (entry) {ShowLog(entry);}
uW.btDeleteLog = function (entry) {DeleteLog(entry);}
uW.btPostLog = function (entry) {PostLog(entry);}
uW.btToggleKeep = function (entry) {ToggleKeep(entry);}
uW.btUpdateLabel = function (elem,entry) {UpdateLabel(elem,entry);}
uW.btUpdatePresetLabel = function (elem,entry) {UpdatePresetLabel(elem,entry);}
uW.btStartKeyTimer = function (elem,notify,entry) {StartKeyTimer(elem,notify,entry);}
uW.btFilterLog = function () {FilterLog();}
uW.btClearNameFilter = function () {ClearNameFilter();}
uW.btClearAllianceFilter = function () {ClearAllianceFilter();}
uW.btSwitchThroneRoom = function (elem) {SwitchThroneRoom(elem);}
uW.btCancelMarshall = function () {CancelMarshall();}
uW.btChangeMarshall = function () {ChangeMarshall();}
uW.btSetMarshall = function () {SetMarshall();}
uW.btBoostMarshall = function () {BoostMarshall();}
uW.btCancelChampion = function () {CancelChampion();}
uW.btRefreshChampion = function () {RefreshChampionData();}
uW.btChangeChampion = function () {ChangeChampion();}
uW.btFreeChampion = function () {FreeChampion();}
uW.btSetChampion = function (elem) {SetChampion(elem);}
uW.btSelectDefenders = function (sel,def) {SelectDefenders(sel,def);}
uW.btSelectDefTroopType = function (sel) {SelectDefTroopType(sel);}
uW.btSetMaxDefTroops = function () {SetMaxDefTroops();}
uW.btAddDefenders = function () {AddDefenders();}
uW.btNewDefPreset = function () {NewDefPreset();}
uW.btChgDefPreset = function () {ChgDefPreset();}
uW.btDelDefPreset = function () {DelDefPreset();}
uW.btSaveDefPreset = function () {SaveDefPreset();}
uW.btCancelDefPreset = function () {CancelDefPreset();}
uW.btSelectDefPreset = function (sel) {SelectDefPreset(sel);}
uW.btSetPresetDefenders = function (rep) {SetPresetDefenders(rep);}
uW.btRecall = function (marchId,cityview) {Recall(marchId,cityview);}
uW.btOverrideDash = function (sect) {OverrideDash(sect);}
uW.btResetDash = function () {ResetDash();}

// allow access from external tools
// NAME CALL LINK PROVIDED FOR LEGACY ONLY - ALL FUTURE LINKS SHOULD USE UID CALL!

uW.btMonitorExternalCall = function(name) {
	if (name !="") {
		document.getElementById('btPlayer').value = name;	 
		MonitorTRClick();
	}	
}	

uW.btMonitorExternalCallUID = function(UID) {
	if (UID !="") {
		initMonitor (UID, false)
	}	
}	

// Functions

function btStartup (){
	clearTimeout (btStartupTimer);
	if (uW.btLoaded)
		return;
	var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
	if (metc.width==null || metc.width==0){
		btStartupTimer = setTimeout (btStartup, 2000);
		return;
	}

	readOptions();	   
	if (!trusted) {Options.RefreshSeed = false; saveOptions ();}

	Seed = uW.seed;
	SelectiveDefending = uW.g_serverType != uW.cm.SERVER_TYPES.PVP;
	
	Options.WinSize.x = 400;
	Options.WinSize.y = WinHeight;
	DefaultWindowPos('WinPos','main_engagement_tabs');

	if (Options.Transparent) { Opacity = 0.9; } else { Opacity = 1.0; }
	
	var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
				.xtabHD {padding-right: 5px; border-bottom:1px solid #888888; background:none; white-space:nowrap;font-weight:bold;font-size:11px;color:#888888;margin-left:10px;margin-right:10px;margin-top:5px;margin-bottom:5px;vertical-align:text-top;align:left}\
				.xtabHDDef {padding-right: 5px; border-bottom:1px solid #888888; background:none; white-space:nowrap;font-weight:bold;font-size:11px;color:#f00;margin-left:10px;margin-right:10px;margin-top:5px;margin-bottom:5px;vertical-align:text-top;align:left}\
				.xtabBR {padding-right: 5px; border:none; background:none; white-space:normal;}\
				.xtabBRTop {padding-right: 5px; border:none; background:none; white-space:normal; vertical-align:top;}\
				tr.btPopupTop td {background: url("' + TitleBG + '") no-repeat scroll -10px -10px transparent; border:1px solid #000000; height: 21px;  padding:0px; color:#FFFFFF;}\
				.btPopMain       {background: url("' + PanelBG + '") no-repeat scroll -10px -50px transparent; border:1px solid #000000; -moz-box-shadow:inset 0px 0px 10px #6a6a6a; -moz-border-radius-bottomright: 20px; -moz-border-radius-bottomleft: 20px; border-bottom-right-radius: 20px; border-bottom-left-radius: 20px; font-size:11px;}\
				.btMonitor_btPopMain { font-size:'+Options.MonitorFontSize+'px;}\
				.btPopup         {border:5px ridge #666; opacity:'+Opacity+'; -moz-border-radius:25px; border-radius:25px; -moz-box-shadow: 1px 1px 5px #000000;}\
				.btSelector		 {font-size:11px; }\
				.btInput		 {font-size:10px; }\
                .AlertStyle      {background:url("' + AlertBG + '") no-repeat left;}\
                .AlertContent    {border:none; background:none; white-space:nowrap;font:bold 11px Georgia;color:#551000;text-align:left;height:13px;}\
				.AlertLink       {text-decoration:none;color:#ecddc1;text-shadow: 0px 0px 15px #000;}\
				.TextLink        {text-decoration:none;}\
				.TextLink:Hover  {text-decoration:none;}\
				.TextLink:Active {text-decoration:none;}\
				.divHide         {display:none}\
				.divHeader		 {background:url("' + DivBG + '") no-repeat scroll -185px transparent;height: 16px;border-bottom:0px solid #000000;font-weight:bold;font-size:11px;opacity:0.75;margin-left:0px;margin-right:0px;margin-top:1px;margin-bottom:0px;padding-top:4px;padding-right:10px;vertical-align:text-top;align:left}\
				.btButton:Hover  {color:#FFFF80;}\
				.oddRow          {background: rgba(0,0,0,0.1);}\
				.evenRow         {background: rgba(0,0,0,0);}\
				.divLink         {color:#000;text-decoration:none;}\
				.divLink:Hover   {color:#000;text-decoration:none;}\
				.divLink:Active  {color:#000;text-decoration:none;}\
				.castleBut       {outline:0px; margin-left:0px; margin-right:0px; width:23px; height:25px; font-size:12px; font-weight:bold;}\
				.castleBut:hover {background:url("'+ URL_CASTLE_BUT_SEL +'") no-repeat center center;}\
				.castleButNon    {background:url("'+ URL_CASTLE_BUT +'") no-repeat center center;}\
				.castleButSel    {background:url("'+ URL_CASTLE_BUT_SEL +'") no-repeat center center;}\
				.castleButBack   {background-color:#f00;display:inline-block;width:23px; height:25px;}\
				.trimg:hover span.trtip { display:block; opacity: 1.0; z-index:999999; font-size:11px; text-align:left; position:absolute; background: #FFFFAA; color: #000; border: 1px solid #FFAD33; padding: 0.5em 0.5em;}\
				.trimg span.trtip { display:none;}\
				.trimg span.trtip:hover { display:none;}\
				.presetBut       {outline:0px; margin-left:0px; margin-right:0px; width:22px; height:22px; font-family: georgia,arial,sans-serif;font-size: 12px;color:white; line-height:19px;}\
				.presetButNon    {background:url("'+ PresetImage +'") no-repeat center center;}\
				.presetButSel    {background:url("'+ PresetImage_SEL +'") no-repeat center center;}\
				.presetButDis    {opacity: 0.4;}\
				.guardBut        {outline:0px; margin-left:0px; margin-right:0px; width:31px; height:33px; font-family: georgia,arial,sans-serif;line-height:52px;font-size:11px;font-weight:bold;color:#fff;text-shadow: 1px 1px 2px #000,-1px -1px 2px #000; background: url("' + GuardBG + '") no-repeat scroll 0% 0% transparent; background-size:350px;}\
				.guardButNon     {border: 2px solid transparent;}\
				.guardButSel     {border: 2px solid blue;}\
				div.ErrText      {color:#FF0000;}';

	GM_addStyle(".castleBut.defending { border-top: 2px; border-bottom: 2px; border-left: 2px; border-right: 2px; border-style: ridge; border-color: red;}");
	GM_addStyle(".castleBut.hiding    { border-top: 2px; border-bottom: 2px; border-left: 2px; border-right: 2px; border-style: ridge; border-color: rgb(229, 221, 201);}");
	GM_addStyle(".castleBut.attack    { opacity: 0.6;}");
				
	mainPop = new CPopup ('btMain', Options.WinPos.x, Options.WinPos.y, Options.WinSize.x, Options.WinSize.y, true, 
		function (){saveOptions();});

	mainPop.getTopDiv().innerHTML = '<DIV align=center><B>Battle Console</B></DIV>';

	m = '<STYLE>'+ styles +'</style>';
  
	m += '<div id="btMain_content">';
	m += '<div style="height:36px;" align="center"><div id=btAttackAlert style="display:none;background-color:red;height:30px;" align="left">&nbsp;</div></div>';
	m += '<div align="center">&nbsp;&nbsp;Enemy:&nbsp;<INPUT id=btPlayer size=20 type=text value="'+Options.LastMonitored+'"/>&nbsp;<a id=btPlayerSubmit class="inlineButton btButton blue20"><span>Monitor</span></a>&nbsp;<a id=btUIDSubmit class="inlineButton btButton blue20"><span>UID</span></a>&nbsp;<a id=btLogSubmit class="inlineButton btButton blue20"><span>Log</span></a></div>';
	m += '<div class="ErrText" align="center" id=btplayErr>&nbsp;</div>';
	m += '<div align="center"><TABLE><TR><TD class=xtab><a id=btSleepButton class="inlineButton btButton blue20"><span style="width:50px"><center>Sleep</center></span></a></td><TD class=xtab><a id=btCityDefenceButton class="inlineButton btButton blue20"><span style="width:80px"><center>Dashboard</center></span></a></td><TD class=xtab><a id=btIncomingButton class="inlineButton btButton blue20"><span style="width:80px"><center>Incoming</center></span></a></td>';
	if (Options.EnableOutgoing) {
		m += '<TD class=xtab><a id=btOutgoingButton class="inlineButton btButton blue20"><span style="width:80px"><center>Outgoing</center></span></a></td>';
	}	
	m += '</tr></table></div>';
	m += '<div class="divHeader" align="right"><a id=btOptionLink class=divLink >OPTIONS&nbsp;<img id=btOptionArrow height="10" src="'+RightArrow+'"></a></div>';
	m += '<div id=btOption class=divHide><TABLE width="100%">';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab colspan=2 align=center><span style="font-size:9px;color:#800;">(options marked with * require a refresh)</span></td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=AlertOverrideChk type=checkbox /></td><td class=xtab>Replace gem containers with incoming attack alert timer</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=CompareChampChk type=checkbox /></td><td class=xtab>Compare champions in march tooltips windows</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=EnableOutgoingChk type=checkbox /></td><td class=xtab>Enable outgoing march monitoring functionality&nbsp;*</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=TransparencyChk type=checkbox /></td><td class=xtab>Transparent windows&nbsp;*</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=AutoUpdateChk type=checkbox /></td><td class=xtab>Automatically check for script updates&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id=btUpdateCheck class="inlineButton btButton brown11"><span>Check Now</span></a></td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><TD class=xtab>&nbsp;</td><td class=xtab><input id=btUS type=radio name=btuploc '+((Options.UpdateLocation==0)?'CHECKED':'')+'>Userscripts&nbsp;<INPUT class="btInput" style="width:30px;" id="btUSPort" type=text maxlength=6 value="'+Options.USPort+'">&nbsp;&nbsp;<input id=btGC type=radio name=btuploc '+((Options.UpdateLocation==1)?'CHECKED':'')+'>Googlecode&nbsp;&nbsp;<input id=btGF type=radio name=btuploc '+((Options.UpdateLocation==2)?'CHECKED':'')+'>Greasyfork</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab colspan=2 align=center><a id=btResetWindows class="inlineButton btButton brown11"><span>Reset ALL window positions!</span></a></td></tr>';
	m += '</table></div>';
	m += '<div class="divHeader" align="right"><a id=btMonOptionLink class=divLink >MONITOR OPTIONS&nbsp;<img id=btMonOptionArrow height="10" src="'+RightArrow+'"></a></div>';
	m += '<div id=btMonOption class=divHide><TABLE width="100%">';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=SoundChk type=checkbox /></td><td class=xtab>Use sound alerts on monitor</td></tr>';
    m += '<TR id=btSoundOpts class="divHide"><TD colspan=2 class=xtab>&nbsp;</td><TD align=right class=xtab><TABLE cellpadding=0 cellspacing=0><TR valign=middle><TD class=xtab>Volume&nbsp;</td><TD class=xtab><SPAN id=btVolSlider></span></td><TD align=right id=btVolOut style="width:30px;">0</td></tr></table></td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab>&nbsp;</td><td class=xtab>Font size: ' + htmlSelector({8: 8, 9: 9, 10: 10, 11: 11}, Options.MonitorFontSize, 'id=btMonitorFont class=btInput') + '</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=MonitorColoursChk type=checkbox /></td><td class=xtab>Use different colours in monitor window</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=PVPOnlyChk type=checkbox /></td><td class=xtab>Show PVP effects only</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=AlternateSortOrderChk type=checkbox /></td><td class=xtab>Alternate sort order</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=MonPresetChk type=checkbox /></td><td class=xtab>Show throne room preset changer</td><td width="120" class=xtab>&nbsp;</td></tr>';
	m += '<TR id=btMonPresetByNameOpts class="divHide"><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=TRMonPresetByNameChk type=checkbox /></td><td colspan="3" class=xtab>Select presets by name</td></tr>';
	m += '</table></div>';
	m += '<div class="divHeader" align="right"><a id=btCityOptionLink class=divLink >DASHBOARD OPTIONS&nbsp;<img id=btCityOptionArrow height="10" src="'+RightArrow+'"></a></div>';
	m += '<div id=btCityOption class=divHide><TABLE width="100%">';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=DashboardChk type=checkbox /></td><td colspan="3" class=xtab>Always on (Requires widescreen in PowerBot or AIO)</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=OverviewChk type=checkbox /></td><td colspan="3" class=xtab>Battle button next to overview button&nbsp;*</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=UpperDefChk type=checkbox /></td><td class=xtab>Overview defend button</td><td class=xtab><INPUT id=LowerDefChk type=checkbox /></td><td class=xtab>Troops defend button</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=PresetChk type=checkbox /></td><td colspan="3" class=xtab>Show throne room preset changer</td></tr>';
	m += '<TR id=btPresetByNameOpts class="divHide"><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=TRPresetByNameChk type=checkbox /></td><td colspan="3" class=xtab>Select presets by name</td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=QuickSacChk type=checkbox /></td><td colspan="2" class=xtab>Show quick sacrifice icons</td>';
	m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=DefaultSacChk type=checkbox /></td><td colspan="2" class=xtab>Default sacrifice duration</td>';
	m += '<TD width=80 class=xtab><span id=btSacOpts class="divHide"><INPUT class="btInput" style="width: 30px;text-align:right;" id="btDefaultRitualMinutes" type=text maxlength=4 value="'+Options.DefaultSacrificeMin+'" onkeyup="btCheckDefaultRitual(this)">&nbsp;min&nbsp;';
	m +='<INPUT class="btInput" style="width: 15px;text-align:right;" id="btDefaultRitualSeconds" type=text maxlength=2 value="'+Options.DefaultSacrificeSec+'" onkeyup="btCheckDefaultRitual(this)">&nbsp;sec</span></td></tr>';
	m += '<TR><TD class=xtab>&nbsp;</td><TD class=xtab>&nbsp;</td><TD colspan="2" class=xtab>Maximum troops to sacrifice</td><TD width=80 class=xtab><INPUT class="btInput" style="width:50px;text-align:right;" id="btSacrificeLimit" type=text maxlength=10 value="'+Options.SacrificeLimit+'">&nbsp;troops</td></tr>';

	if (SelectiveDefending) {
		m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=DefAddTroopChk type=checkbox /></td><td colspan="3" class=xtab>Show defence add troops</td></tr>';
		m += '<TR id=btDefOpts class="divHide"><TD class=xtab>&nbsp;</td><TD class=xtab>&nbsp;</td><TD colspan="2" class=xtab>Default add defence amount</td><TD width=80 class=xtab><INPUT class="btInput" style="width:50px;text-align:right;" id="btDefaultDefenceNum" type=text maxlength=10 value="'+Options.DefaultDefenceNum+'">&nbsp;troops</td></tr>';
		m += '<TR><TD class=xtab>&nbsp;</td><td class=xtab><INPUT id=DefPresetChk type=checkbox /></td><td colspan="3" class=xtab>Show defensive presets</td></tr>';
	}
		
	m += '<TR><TD class=xtab>&nbsp;</td><TD class=xtab colspan=4><table cellSpacing=0 width=98%>';
	m += '<TR><TD style="width:20px" class=xtabHD>Show</td><TD style="width:100px" class=xtabHD>Section</td><TD class=xtabHD>Sequence</td><TD class=xtabHD align=right><a id=btResetDash class="inlineButton btButton brown11"><span>Reset</span></a></td></tr>';

    for (p in DefaultDashboard) {
		var NewObj = {};
		if (Options.OverrideDashboard[p]) {
			NewObj.Display = Options.OverrideDashboard[p].Display;
			NewObj.Sequence = Options.OverrideDashboard[p].Sequence;
		}
		else {
			NewObj.Display = DefaultDashboard[p].Display;
			NewObj.Sequence = DefaultDashboard[p].Sequence;
		}
		NewObj["name"] = p;

		if (Options.EnableOutgoing || (NewObj["name"] != "Outgoing Attacks")) {
			m += '<tr>';
			m +='<TD style="width:20px" class="xtab"><INPUT id="dashDisp'+NewObj["name"]+'" type=checkbox '+(NewObj["Display"]?'CHECKED':'')+' onclick="btOverrideDash(\''+NewObj["name"]+'\')" /></td>';
			m += '<TD class=xtab>'+NewObj["name"]+'</td>';
			m += '<TD class=xtab><INPUT class="btInput" id="dashSeq'+NewObj["name"]+'" style="width:30px;" maxlength=3 type=text value="'+NewObj["Sequence"]+'" onkeyup="btOverrideDash(\''+NewObj["name"]+'\')" /></td>';
			m += '<td class=xtab>&nbsp;</td></tr>';
		}	
	}
	m += '</table></td></tr>';

	m += '</table></div>';
	m += '<div class="divHeader" align="right"><a id=btTRPresetOptionLink class=divLink >THRONE ROOM PRESETS&nbsp;<img id=btTRPresetOptionArrow height="10" src="'+RightArrow+'"></a></div>';
	m += '<div id=btTRPresetOption class=divHide><TABLE width="100%">';
	m += '<TR><TD class=xtab>&nbsp;</td><TD class=xtab colspan=2><table cellSpacing=0 width=98%>';
	m += '<TR><TD style="width:20px" class=xtabHD>Num</td><TD class=xtabHD>Name</td></tr>';

    for (i=1;i<=Seed.throne.slotNum;i++) {
		m += '<tr>';
		m +='<TD style="width:20px" id="trpresetopt'+i+'" class="xtab trimg" style="padding-right: 0px;"><a style="text-decoration:none;"><div id="trpresetoptdiv'+i+'" class="presetBut presetButNon"><center>'+i+'</center></div></a></td>';
		m += '<TD class=xtab><INPUT class="btInput" id="btpresetLabel'+i+'" style="width:120px;" maxlength=12 type=text value="'+(Options.TRPresets[i]?Options.TRPresets[i].name:'Preset '+i)+'" onkeyup="btStartKeyTimer(this,btUpdatePresetLabel,'+i+')" onchange="btUpdatePresetLabel(this,'+i+')" /></td>';
		m += '</tr>';
	}

	m += '</table></td></tr>';
	m += '</table></div>';
	m += '<div align="center" style="font-size:10px;opacity:0.3;">Version '+Version+'</div></div>';
  
	mainPop.getMainDiv().innerHTML = m;
  	  
	window.addEventListener('unload', onUnload, false);
	document.getElementById('btPlayerSubmit').addEventListener ('click', MonitorTRClick, false);
	document.getElementById('btUIDSubmit').addEventListener ('click', UIDClick, false);
	document.getElementById('btLogSubmit').addEventListener ('click', ToggleLog, false);

	document.getElementById('btUpdateCheck').addEventListener ('click', function() {AutoUpdater.call(true,true);}, false);
	document.getElementById('btResetWindows').addEventListener ('click', function() {ResetAllWindows();}, false);
	document.getElementById('btPlayer').addEventListener ('keypress', function(e) {if ( e.which == 13)  document.getElementById('btPlayerSubmit').click();}, false);
	document.getElementById('btPlayer').addEventListener ('focus', function (){setError('&nbsp;');}, false);
	document.getElementById('btCityDefenceButton').addEventListener ('click', function () {ToggleCityDefence(Options.CurrentCity);}, false);
	document.getElementById('btIncomingButton').addEventListener ('click', ToggleIncomingMarches, false);
	if (Options.EnableOutgoing) {
		document.getElementById('btOutgoingButton').addEventListener ('click', ToggleOutgoingMarches, false);
	}	
	document.getElementById('btSleepButton').addEventListener ('click', function () {ToggleSleep(true)}, false);

	document.getElementById('btOptionLink').addEventListener ('click', function () {ToggleDivDisplay("btMain",WinHeight,400,"btOption",true)}, false);
	document.getElementById('btMonOptionLink').addEventListener ('click', function () {ToggleDivDisplay("btMain",WinHeight,400,"btMonOption",true)}, false);
	document.getElementById('btCityOptionLink').addEventListener ('click', function () {ToggleDivDisplay("btMain",WinHeight,400,"btCityOption",true)}, false);
	document.getElementById('btTRPresetOptionLink').addEventListener ('click', function () {ToggleDivDisplay("btMain",WinHeight,400,"btTRPresetOption",true)}, false);

	document.getElementById('btPlayerSubmit').addEventListener('mousedown',function(me) {ResetWindowPos (me,'btPlayerSubmit',popMon);}, true);  
	document.getElementById('btCityDefenceButton').addEventListener('mousedown',function(me) {if (!Options.DashboardMode) {ResetWindowPos (me,'btCityDefenceButton',popDef);}}, true);  
	document.getElementById('btIncomingButton').addEventListener('mousedown',function(me) {ResetWindowPos (me,'btIncomingButton',popInc);}, true);  
	if (Options.EnableOutgoing) {
		document.getElementById('btOutgoingButton').addEventListener('mousedown',function(me) {ResetWindowPos (me,'btOutgoingButton',popOut);}, true);  
	}	
	document.getElementById('btLogSubmit').addEventListener('mousedown',function(me) {ResetWindowPos (me,'btLogSubmit',popLog);}, true);  
	document.getElementById('btResetDash').addEventListener ('click', function() {ResetDash();}, false);

	document.getElementById('btMonitorFont').addEventListener('change', ChangeFontSize, false);
	
	ToggleOption ('TransparencyChk', 'Transparent');
	ToggleOption ('AlertOverrideChk', 'OverrideAttackAlert');
	ToggleOption ('SoundChk', 'MonitorSound', SoundToggle);
	ToggleOption ('MonitorColoursChk', 'MonitorColours');
	ToggleOption ('PVPOnlyChk', 'PVPOnly');
	ToggleOption ('AlternateSortOrderChk', 'AlternateSortOrder');
	ToggleOption ('MonPresetChk', 'MonPresetChange', MonPresetToggle);
	MonPresetToggle ();
	ToggleOption ('CompareChampChk', 'ChampionCompare');
	ToggleOption ('EnableOutgoingChk', 'EnableOutgoing');
	ToggleOption ('AutoUpdateChk', 'AutoUpdates');
	SoundToggle ();

	ToggleOption ('PresetChk', 'PresetChange', PresetToggle);
	PresetToggle ();
	ToggleOption ('DashboardChk', 'DashboardMode', DashboardToggle);
	DashboardToggle ();
	ToggleOption ('UpperDefChk', 'UpperDefendButton');
	ToggleOption ('LowerDefChk', 'LowerDefendButton');

	if (SelectiveDefending) {
		ToggleOption ('DefAddTroopChk', 'DefAddTroopShow', DefToggle);
		DefToggle ();
		ToggleOption ('DefPresetChk', 'DefPresetShow');
	}
	
	ToggleOption ('OverviewChk', 'OverviewBattleBtn');
	ToggleOption ('QuickSacChk', 'QuickSacrifice',PaintQuickSac);
	ToggleOption ('DefaultSacChk', 'DefaultSacrifice', SacToggle);
	SacToggle ();

	ToggleOption ('TRPresetByNameChk', 'TRPresetByName');
	ToggleOption ('TRMonPresetByNameChk', 'TRMonPresetByName', PaintTRPresets);

    document.getElementById('btUSPort').addEventListener('keyup', function () {
		if (isNaN(document.getElementById('btUSPort').value)) { document.getElementById('btUSPort').value = 8080; }
		Options.USPort = document.getElementById('btUSPort').value;
		saveOptions();
	}, false);
    document.getElementById('btUS').addEventListener('change', function () {
		if (document.getElementById('btUS').checked) { Options.UpdateLocation = 0; saveOptions(); }
	}, false);
    document.getElementById('btGC').addEventListener('change', function () {
		if (document.getElementById('btGC').checked) { Options.UpdateLocation = 1; saveOptions(); }
	}, false);
    document.getElementById('btGF').addEventListener('change', function () {
		if (document.getElementById('btGF').checked) { Options.UpdateLocation = 2; saveOptions(); }
	}, false);
	
    document.getElementById('btSacrificeLimit').addEventListener('keyup', function () {
		if (isNaN(document.getElementById('btSacrificeLimit').value)) { document.getElementById('btSacrificeLimit').value = 0; }
		Options.SacrificeLimit = document.getElementById('btSacrificeLimit').value;
		saveOptions();
	}, false);
	if (SelectiveDefending) {
		document.getElementById('btDefaultDefenceNum').addEventListener('keyup', function () {
			if (isNaN(document.getElementById('btDefaultDefenceNum').value)) { document.getElementById('btDefaultDefenceNum').value = 0; }
			Options.DefaultDefenceNum = document.getElementById('btDefaultDefenceNum').value;
			saveOptions();
		}, false);
	}	
	
	VolSlider = new SliderBar (document.getElementById('btVolSlider'), 200, 21, 0);
	VolSlider.setValue (Options.Volume/100);
	VolSlider.setChangeListener(VolumeChanged);
	VolumeChanged (Options.Volume/100);

	for (i=1;i<=Seed.throne.slotNum;i++) {
		BuildTRPresetStats(i);
	}	
	
	AddMainTabLink('BATTLE', eventHideShow, mouseMainTab);
 
	addScript ('uwuwuwFunc = function (text){ eval (text);  }');  

	// position windows for the first time
 
	DefaultWindowPos('MonPos','btPlayerSubmit');
	DefaultWindowPos('DefPos','btCityDefenceButton');
	DefaultWindowPos('IncPos','btIncomingButton');
	if (Options.EnableOutgoing) {
		DefaultWindowPos('OutPos','btOutgoingButton');
	}	
	DefaultWindowPos('LogPos','btLogSubmit');

	// throne room alteration
	
	var str = uW.cm.FETemplates.Throne.mainThrone.replace(
		'<li id="throneStatTab" class="inactive"> Stats </li>',
		'<li id="throneMonitor" class="inactive" onclick="btThroneMonitorTR()"> Monitor </li><li id="throneStatTab" class="inactive"> Stats </li>');
	uW.cm.FETemplates.Throne.mainThrone = str;
   
	uW.btThroneMonitorTR = function() {
		if (ThroneUID != 0) { initMonitor (ThroneUID, false); }	
	}
   
	// intercept throne room view function to grey out monitor option for your own room...

	var oldTRViewFunc = uW.cm.ThroneView.openThrone;
	var newTRViewFunc = function(c) {
		ThroneUID = 0;
		if (c) {ThroneUID = c.id;}
		oldTRViewFunc(c);
		if (ThroneUID == 0) {uW.jQuery("#throneMonitor").attr("class","deactive"); }		
	};
	uW.cm.ThroneView.openThrone = newTRViewFunc;

	// add a battle button next to overview

	if (Options.OverviewBattleBtn) {
		var el1 = document.getElementById('mod_cityinfo');
		var el2 = el1.getElementsByClassName('hd');
		for (e in el2) {
			el2[e].innerHTML += '&nbsp;<a class="inlineButton btButton blue14" style="position:static;" onclick="btShowDefenceWindow(); return false;"><span style="width:57px;">Battle</span></a>';
			var el3 = el2[e].getElementsByClassName('button14');
			for (e2 in el3) {
				el3[e2].style["position"] = "static";
				el3[e2].className = 'inlineButton btButton blue14';
				break;
			}
			break;
		}	
	}

	// delay altering uW Functions by 5 seconds  
  
	setTimeout (function () {AlterUWFuncs();}, 5000);
  
	AudioManager.init();

	loadLog();
	setCities();
	RefreshChampionData();
  
	// start main looper

	SecondTimer = setTimeout(EverySecond,0);

	// show things that were showing before refresh

	if (Options.IncomingStartState) {ToggleIncomingMarches();}
	if (Options.EnableOutgoing) {
		if (Options.OutgoingStartState) {ToggleOutgoingMarches();}
	}	
	if (Options.DefenceStartState || (Options.DashboardMode && !Options.SleepMode)) {ToggleCityDefence(Options.CurrentCity);}
	if (Options.MonitorStartState && (Options.LastMonitoredUID != 0)) {initMonitor(Options.LastMonitoredUID);}
	
	// Set to check for updates in 15 seconds
	
	if (Options.AutoUpdates) setTimeout(function(){AutoUpdater.check();},15000); 

	// All done!
	
	uW.btLoaded = true;
}

function ChangeFontSize(evt) {
	Options.MonitorFontSize = evt.target.value;
	setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error
	if (MonitoringActive && popMon) { popMon.show(false); popMon.destroy(); popMon = null; initMonitor(userInfo.userId,MonitoringPaused); }
}

function ResetDash () {
    for (p in DefaultDashboard) {
		document.getElementById('dashSeq'+p).value = DefaultDashboard[p].Sequence;
		document.getElementById('dashDisp'+p).checked = DefaultDashboard[p].Display;
	}
	Options.OverrideDashboard = {};
	setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error
	if (popDef) { popDef.show(false); popDef = null; ToggleCityDefence(Options.CurrentCity); }
}

function OverrideDash (sect) {
	var NewObj = {};
	if (Options.OverrideDashboard[sect]) {
		NewObj.Display = Options.OverrideDashboard[sect].Display;
		NewObj.Sequence = Options.OverrideDashboard[sect].Sequence;
	}
	else {
		NewObj.Display = DefaultDashboard[sect].Display;
		NewObj.Sequence = DefaultDashboard[sect].Sequence;
	}
	if (isNaN(document.getElementById('dashSeq'+sect).value)) { document.getElementById('dashSeq'+sect).value = 0; }
	NewObj.Sequence = document.getElementById('dashSeq'+sect).value;
	NewObj.Display = document.getElementById('dashDisp'+sect).checked;
	Options.OverrideDashboard[sect] = NewObj;
	setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error
	if (popDef) { popDef.show(false); popDef = null; ToggleCityDefence(Options.CurrentCity); }
}

function UpdatePresetLabel(elem,entry) {
	if (KeyTimer) { clearTimeout(KeyTimer); }
	if (!Options.TRPresets[entry]) { Options.TRPresets[entry] = {};}
	if (elem.value == "") { elem.value = 'Preset '+entry; }
	
	Options.TRPresets[entry].name = elem.value;
	setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error
	PaintTRPresets(); 
}

function VolumeChanged (val) {
	document.getElementById('btVolOut').innerHTML = parseInt(val*100);
    Options.Volume = parseInt(val*100);
	saveOptions();
	if (AudioManager.player) {AudioManager.setVolume(1, Options.Volume);}
}

function DefaultWindowPos(OptPos,elem,force) {
	if (force || (Options[OptPos]==null) || (Options[OptPos].x==null) || (Options[OptPos].x=='') || (isNaN(Options[OptPos].x))) {
		var c = getClientCoords (document.getElementById(elem));
		Options[OptPos].x = c.x+4;
		Options[OptPos].y = c.y+c.height;
		setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error
	}
}

function AlterUWFuncs() {
	// add entries to the menu items and tooltips windows

	for (jj in uW.cm.ContextMenuMapController.prototype.MapContextMenus.City) {
		if (jj != 5) uW.cm.ContextMenuMapController.prototype.MapContextMenus.City[jj].push("MONI"); } // no misted anymore
  
	var mod = new CalterUwFunc('cm.ContextMenuMapController.prototype.calcButtonInfo',
		[['default:', 'case "MONI":' +
		'b.text = "Monitor"; b.color = "green"; ' +
		'b.action = function () { ' +
		'btMapMonitorTR(e);' +
		'}; ' +
		'd.push(b); break; ' +
		'default: ']]);
	mod.setEnable(true);

	var mod4 = new CalterUwFunc("citysel_click",[['cm.PrestigeCityView.render()','cm.PrestigeCityView.render();btCityChanged();']]);
    unsafeWindow.btCityChanged = function () {if (popDef) uW.btShowDefenceWindow(); };
    mod4.setEnable(true);

	/* check dashboard div position now other scripts have loaded */

	if (Options.DashboardMode) { CheckDashPosition(); }
	
	logit('uW functions altered');    
}

function ResetFrameSize(prefix,minheight,minwidth) {
	h = document.getElementById(prefix+'_bar').clientHeight + document.getElementById(prefix+'_content').clientHeight;
	if (h < minheight) h = minheight;
	uW.jQuery('#'+prefix+'_outer').css('height',h+10);

	w = document.getElementById(prefix+'_content').clientWidth;
	w2 = document.getElementById(prefix+'_outer').clientWidth;
	if (w < minwidth) w = minwidth;
	if (w2 < w) // I don't know why I need this.. must look at this later to try and get it to shrink again
		uW.jQuery('#'+prefix+'_outer').css('width',w+10);
}

function ToggleDivDisplay(form,h,w,div, autoclose) {
	var dc = uW.jQuery('#'+div).attr('class');
	if (dc) {
		if (dc.indexOf('divHide') >= 0) {
			uW.jQuery('#'+div).attr('class','');
			uW.jQuery('#'+div+'Arrow').attr('src',DownArrow);
			if (autoclose) {
				lastdiv = "";
				if (OpenDiv[form]) {
					lastdiv = OpenDiv[form];
				}
				if (lastdiv != "") {
					ToggleDivDisplay(form,h,w,lastdiv);
				}
				OpenDiv[form] = div;
			}
		}	
		else {
			uW.jQuery('#'+div).attr('class','divHide');
			uW.jQuery('#'+div+'Arrow').attr('src',RightArrow);
			if (autoclose) { OpenDiv[form] = '';}
		}
	}
	else
	{
		uW.jQuery('#'+div).attr('class','divHide');
		uW.jQuery('#'+div+'Arrow').attr('src',RightArrow);
		if (autoclose) { OpenDiv[form] = '';}
	}
	ResetFrameSize(form,h,w);
}

function ShowHideSection(div,tf) {
	var dh = document.getElementById(div+'Header');
	if (dh) {
		if (tf) { uW.jQuery('#'+div+'Header').removeClass('divHide'); }
		if (!tf) { uW.jQuery('#'+div+'Header').addClass('divHide'); }
	}
}

function ShowHideRow(div,tf) {
	var dh = document.getElementById(div);
	if (dh) {
		if (tf) { uW.jQuery('#'+div).removeClass('divHide'); }
		if (!tf) { uW.jQuery('#'+div).addClass('divHide'); }
	}
}

function RefreshSeed() {
	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	// stop update_seed_ajax
	uW.g_update_seed_ajax_do = true;
	RefreshingSeed = true;
	
    if (!Options.RefreshSeed) {
		uW.jQuery('#btRefreshSeed').addClass("disabled");
		uW.jQuery('#btRefreshSeedInc').addClass("disabled");
		uW.jQuery('#btRefreshSeedOut').addClass("disabled");
	}	
	
	var ts = (new Date().getTime() / 1000) + uW.g_timeoff;
    var cts = parseInt( (ts - 25.1) * 1000);
    var upd = window.self.location.href;
    upd=upd.replace(/ts=\d*\.\d+/, "ts="+ts);
    upd=upd.replace(/cts=\d*/, "cts="+cts);
	
	new AjaxRequest(upd, {
	    method: "POST",
	    parameters: params,
	    onSuccess: function (rslt) {
	        var mainSrcHTMLCode = rslt.responseText;
	    	var myregexp = /var seed=\{.*?\};/;
	    	var match = myregexp.exec(mainSrcHTMLCode);
	    	if (match != null) {
	    		result = match[0];
	    		result = result.substr(4);
	    		var seed = eval(result);

//	    		unsafeWindow.seed = seed; // would do it all!
// 				only copy what we need to copy
	    		unsafeWindow.seed.ss = seed.ss;
	    		unsafeWindow.seed.queue_atkinc = seed.queue_atkinc;
	    		unsafeWindow.seed.queue_atkp = seed.queue_atkp;
	    		unsafeWindow.seed.player = seed.player;
	    		unsafeWindow.seed.players = seed.players;
	    		unsafeWindow.seed.playerEffects = seed.playerEffects;
				unsafeWindow.seed.queue_sacr = seed.queue_sacr; 
				unsafeWindow.seed.units = seed.units; 
				unsafeWindow.seed.defunits = seed.defunits; 
				
	    		unsafeWindow.document.seed = unsafeWindow.seed;
	    		Seed = unsafeWindow.seed;
	    	}
			SecondLooper = 1;	
			// let update_seed_ajax run again
			uW.g_update_seed_ajax_do = false;
			RefreshingSeed = false;
			if (!Options.RefreshSeed) {
				uW.jQuery('#btRefreshSeed').removeClass("disabled");
				uW.jQuery('#btRefreshSeedInc').removeClass("disabled");
				uW.jQuery('#btRefreshSeedOut').removeClass("disabled");
			}	
	    },
	    onFailure: function () {
			if (notify != null)
				notify(rslt.errorMsg);
			SecondLooper = 1;	
			// let update_seed_ajax run again
			uW.g_update_seed_ajax_do = false;
			RefreshingSeed = false;
			if (!Options.RefreshSeed) {
				uW.jQuery('#btRefreshSeed').removeClass("disabled");
				uW.jQuery('#btRefreshSeedInc').removeClass("disabled");
				uW.jQuery('#btRefreshSeedOut').removeClass("disabled");
			}	
	    },
	});
}

/*var kabam_usa = unsafeWindow.update_seed_ajax;
var battle_usa = function (marchForceUpdateFlag, updateSeedDoneCallback, isCancelTraining) {
	// kabam introduced their own "force" flag, which messes up my refresh logic...
	// so if they are determined to force this one through, then do it my way.
	if ((uW.g_update_seed_ajax_force || isCancelTraining) && uW.g_update_seed_ajax_do) {
		uW.g_update_seed_ajax_force = false;
		ForceUpdateSeed();
	}
	else {
		kabam_usa(true, updateSeedDoneCallback, isCancelTraining); // always force marches
	}	
}
unsafeWindow.update_seed_ajax = battle_usa; */

function ForceUpdateSeed() {
	if (uW.g_update_seed_ajax_do && (ForceTries < 10)) { // refresh seed is occurring? But we need to make sure this runs, so delay for 1 second  and try up to 10 times ...
		ForceTries = ForceTries + 1;
		logit('force update seed - waiting for server to be ready ('+ForceTries+')');
		setTimeout(function() {ForceUpdateSeed();}, 1000);
	}
	logit('force update seed - request sent to server');
	setTimeout(function() {unsafeWindow.update_seed_ajax(true, function () {logit('force update seed - response received from server');PaintCityInfo(Seed.cities[Options.CurrentCity][0])},true);}, 250);
}

function EverySecond () {
// handle exceptions so not to lose timer to script crashing out?
	try {
	
		if (Options.SleepMode) return;

		SecondLooper = SecondLooper+1;

		/* Reduce Delayers if they are Active */
	
		if (ThroneDelay > 0) { ThroneDelay--; PaintTRPresets(); } 
		if (GuardDelay > 0) { GuardDelay--; PaintGuardianSelector(); }
	
		/* If Monitoring active, then refresh TR, or maintain loop to refresh player stats */

		if (MonitoringActive && popMon) {
			setTimeout(function() {MonitorTRLoop();},0);
		}

		/* Automatically Refresh Marches in Seed, if Option set */  

		if (Options.RefreshSeed && ((SecondLooper % RefreshSeedInterval) == 1) && !RefreshingSeed) {
			setTimeout(function() {RefreshSeed();},250);
		}
	
		/* create and sort local copy of atkinc here - use this for all atkinc functions */

		inc = [];
		incCity = [];

		/* check local marches still exist */
		
		for(n in local_atkinc) {
			if (!Seed.queue_atkinc[n]) { delete local_atkinc[n]; }
		}	
		
		for(n in Seed.queue_atkinc) {
			if (Seed.queue_atkinc[n].marchType) {
				inc.push(Seed.queue_atkinc[n]);
				/* check and copy to local */
				if (!local_atkinc[n]) { Copy_Local_ATKINC(n); }
			}	
		}
		inc.sort(function(a, b){ if(!a.arrivalTime) a.arrivalTime = -1; if(!b.arrivalTime) b.arrivalTime = -1;return a.arrivalTime-b.arrivalTime });
     
		CheckForIncoming();
		BuildIncomingDisplay();

		/* create and sort local copies of atkp here - use this for all atkp functions */

		if (Options.EnableOutgoing) {
			out = [];
			outCity = [];

			for(n in Seed.queue_atkp) {
				for(m in Seed.queue_atkp[n]) {
					if (Seed.queue_atkp[n][m].marchType && (parseInt(Seed.queue_atkp[n][m].marchType) != 9)) { // no raids!
						Copy_Local_ATKP(n,m);
						var marchobj = local_atkp[m];
						out.push(marchobj);
						if (marchobj.marchCityId == CurrentCityId) {
							outCity.push(marchobj);
						}	
					}	
				}
				
			}
			out.sort(function(a, b){ return /*a.destinationUnixTime-b.destinationUnixTime*/ });
			outCity.sort(function(a, b){ return a.destinationUnixTime-b.destinationUnixTime });

			BuildOutgoingDisplay();
		}	
		
		if (!(Options.CurrentCity < 0))
			PaintCityInfo(Seed.cities[Options.CurrentCity][0]);
		
		/* check city defence mode and attack status for buttons, and current TR preset for TR changer */

		if (popDef) {
			for (var cityId in Cities.byID){
				var city_num = Cities.byID[cityId].idx;
				if (Seed.citystats["city" + cityId].gate != 0) {
					uW.jQuery("#btCastles_" + city_num).removeClass("hiding").addClass("defending");
				} else {
					uW.jQuery("#btCastles_" + city_num).removeClass("defending").addClass("hiding");
				}
				if (incCity.indexOf(city_num) >= 0) { uW.jQuery("#btCastles_" + city_num).addClass("attack"); }
				else {uW.jQuery("#btCastles_" + city_num).removeClass("attack"); }
			}
		
			if (Options.PresetChange && (CurrPreset != Seed.throne.activeSlot)) { PaintTRPresets(); }
			if (CurrGuardian != Seed.guardian[Options.CurrentCity].type) { PaintGuardianSelector(); }
		}

		SecondTimer = setTimeout(EverySecond,1000);
	}
	catch (err) {
		logerr(err); // write to log
		SecondTimer = setTimeout(EverySecond,1000);
	}
}

function Copy_Local_ATKP(n,m) {
	var now = unixTime();
	if (!local_atkp[m] || ((local_atkp[m].returnUnixTime<now) && (local_atkp[m].marchStatus!=2))) {
		local_atkp[m] = Seed.queue_atkp[n][m]; // reused march numbers!?!
		local_atkp[m].marchCityId = n.split("city")[1]; // from city
		if (!local_atkp[m].marchId) {
			local_atkp[m].marchId = m.split("m")[1]; // march id
//			local_atkp[m].btIncomplete = true; // code moved because of showing march aetherstone resource, always need to fetch the march to do this. If overhead is a problem, move it back..
//			local_atkp[m].btRequestSent = 0; 
		}	
		local_atkp[m].btIncomplete = true; 
		local_atkp[m].btRequestSent = 0; 
	}	
}

function Copy_Local_ATKINC(m) {
	if (!local_atkinc[m]) {
		local_atkinc[m] = Seed.queue_atkinc[m];
		local_atkinc[m].btIncomplete = true; 
		local_atkinc[m].btRequestSent = 0; 
	}	
}

function CheckForIncoming () {
	Seed = uW.seed;

	var atype = "";
	var atime = "";
	var to = "";
	var name = "";
	var who = "";
	var bywho = "";

	var soonest = {};
	soonest.arrivalTime = -1;

	StillComing = false;
	TRVisible = false;
	ChampVisible = false;
  
	// Find TR gem container element if it exists..
  
	var el1 = document.getElementsByClassName('primarytitlebar');
	var el2 = document.getElementsByClassName('gemContainer');
	var el3 = Array.filter( el2, function(elem){
		return Array.indexOf( el1, elem.parentNode ) > -1;
	});
  
	for (e in el3) {
		TRVisible = true;
		GemContainer = el3[e];
		if (!Incoming) SaveGemHTML = GemContainer.innerHTML;
	}

	GemContainer2 = document.getElementById('championGemContainer');
	if (GemContainer2) {
		ChampVisible = true;
		if (!Incoming) SaveGemHTML2 = GemContainer2.innerHTML;
	}
	
	if (!TRVisible) { // try something
		for (e in el2) {
			GemContainer = el2[e];
			if (!Incoming) SaveGemHTML = GemContainer.innerHTML;
			GemContainer.style.height = 40+'px';
			GemContainer.id = 'btGemContainer';
			break;
		}
	}

	//CanNotify = document.getElementById('impendingAttackContainer');
	CanNotify = document.getElementById('btGemContainer');
	
	for(n in inc) {
		var a = inc[n];
		if (!a.score) continue;
		if (a.arrivalTime < unixTime()) {
			continue; // don't display arrival times already happened
		}
		StillComing = true;
		if ((a.arrivalTime && (a.arrivalTime < soonest.arrivalTime)) || (soonest.arrivalTime == -1)) {
			soonest = a;
			if (!soonest.arrivalTime) soonest.arrivalTime = -1;
			if (soonest.arrivalTime >= 0) {
				if (a.arrivalTime - unixTime() < 2) { setTimeout(function() {ForceTries = 0;ForceUpdateSeed();},2000); } // force update defending troops immediately after attacks land
				break;
			}
		}  
	}

	if (StillComing) {
		if (soonest.marchType == 3) atype = '<img style="border:2px ridge #00A;width:15px;height:15px;" src='+ScoutImage+'>';
		else atype = '<img style="border:2px ridge #A00;width:15px;height:15px;" src='+AttackImage+'>';
		to = Cities.byID[soonest.toCityId];
		if ( to.tileId == soonest.toTileId ) name = to.name;
		else name = "Wilderness";

		if (soonest.arrivalTime != -1) atime = uW.cm.TimeFormatter.format(parseInt(soonest.arrivalTime-unixTime()));	
		else atime = '??????';
		if (Seed.players['u'+soonest.pid]) {who = Seed.players['u'+soonest.pid].n; bywho = ' by '+MonitorLink(soonest.pid,who,"AlertLink");}
		else { bywho = '&nbsp;&nbsp;(Upgrade WatchTower)' ;}

		msgcontainer = '<div class="textContainer" style="margin-left:-10px;padding-top:0px;">';
		msglink1 = '<a class="AlertLink" id='
		msglink2 = '>';
		msglink3 = '</a>';
		msgtable = '<div class="AlertStyle"><table border=0><tr><td class="AlertContent"><div style="text-align:center;width:86px">&nbsp;&nbsp;'+atime+'</div></td><td class="AlertContent" style="padding-top:3px;">'+atype+'</td><td class="AlertContent"><div style="color:#ecddc1;text-shadow: 0px 0px 15px #000;">';
		msgend = '</div></td></tr></table></div>';
		if (Options.OverrideAttackAlert) {
			if (CanNotify) {
				//uW.jQuery("#promoTimeLeft").hide();
				//document.getElementById('impendingAttackContainer').innerHTML = msgcontainer+msgtable+msglink1+'btAlertIncoming'+msglink2+name+msglink3+msgend+'</div>';
				document.getElementById('btGemContainer').innerHTML = '<br><center><span style="color:#800;"><b>RED ALERT!</b></span></center>'+msgcontainer+msgtable+msglink1+'btAlertIncoming'+msglink2+name+msglink3+msgend+'</div><center>'+bywho+'</center>';
				document.getElementById('btAlertIncoming').addEventListener ('click', function(){ShowWatchTower(to)}, false);
			}	
			if (TRVisible) {
				GemContainer.innerHTML = msgcontainer+msgtable+msglink1+'btAlertIncoming2'+msglink2+name+msglink3+msgend+'</div>';	
				GemContainer.style.width=250+'px';
				document.getElementById('btAlertIncoming2').addEventListener ('click', function(){ShowWatchTower(to)}, false);
			}	
			if (ChampVisible) {
				GemContainer2.innerHTML = msgcontainer+msgtable+msglink1+'btAlertIncoming3'+msglink2+name+msglink3+msgend+'</div>';	
				GemContainer2.style.width=250+'px';
				document.getElementById('btAlertIncoming3').addEventListener ('click', function(){ShowWatchTower(to)}, false);
			}	
		}  
		document.getElementById('btAttackAlert').innerHTML = msgcontainer+msgtable+msglink1+'btIncoming'+msglink2+name+msglink3+bywho+msgend+'</div>';
		uW.jQuery("#btAttackAlert").attr("style","background-color:red;height:30px;");
		document.getElementById('btIncoming').addEventListener ('click', function(){ShowWatchTower(to)}, false);
	}
  
	if (Incoming && !StillComing) {
		if (Options.OverrideAttackAlert) {
			if (CanNotify) {
				document.getElementById('btGemContainer').innerHTML = SaveGemHTML; 
				//document.getElementById('impendingAttackContainer').innerHTML = ""; 
				//uW.jQuery("#promoTimeLeft").show();
			}	
			if (TRVisible) {
				GemContainer.innerHTML = SaveGemHTML;
			}	
			if (ChampVisible) {
				GemContainer2.innerHTML = SaveGemHTML2;
			}	
		}  
		document.getElementById('btAttackAlert').innerHTML = "";
		uW.jQuery("#btAttackAlert").attr("style","display:none;");
	}

	Incoming = StillComing;  
  
	// check for city incoming

	if (popDef && (CurrentCityId != 0))  {
		var citysoonest = {};
		citysoonest.arrivalTime = -1;

		CityStillComing = false;
	
		for(n in inc) {
			var a = inc[n];
			if (!a.score) continue;
			if (a.arrivalTime < unixTime()) continue; // don't display arrival times already happened
			if (inc[n].toCityId == CurrentCityId) {
				CityStillComing = true;
				if ((a.arrivalTime && (a.arrivalTime < citysoonest.arrivalTime)) || (citysoonest.arrivalTime == -1)) {
					citysoonest = a;
					if (!citysoonest.arrivalTime) citysoonest.arrivalTime = -1;
					if (citysoonest.arrivalTime > 0) break;
				}	
			}  
		}

		if (CityStillComing) {
			if (citysoonest.arrivalTime != -1) atime = uW.cm.TimeFormatter.format(parseInt(citysoonest.arrivalTime-unixTime()));	
			else atime = '??????';
			msgcontainer = '<div class="textContainer" style="margin-right:-20px;padding-top:0px;">';
			msgtable = '<div class="AlertStyle" style="text-align:center;width:110px"><table border=0><tr><td class="AlertContent"><div style="text-align:center;width:86px">&nbsp;'+atime;
			msgend = '</div></td></tr></table></div>';
			document.getElementById('btCityAlert').innerHTML = msgcontainer+msgtable+msgend+'</div>';
		}
  
		if (CityIncoming && !CityStillComing) {
			document.getElementById('btCityAlert').innerHTML = "";
		}

		CityIncoming = CityStillComing;  
	}
}  

function ShowWatchTower (city) {

	ToggleSleep(false);

	if (!popDef)
		ToggleCityDefence(city.idx);
	else
		Castles.selectBut(city.idx);

//	var l = document.getElementById("citysel_" + (city.idx + 1));
//	uW.citysel_click(l);
//	var k = uW.cm.WatchTowerList.getCityWatchTower(city.id);
//	if (k) {
//		uW.modal_build(k.getSlot())
//	}
}

function SoundToggle () {
	var dc = uW.jQuery('#btSoundOpts').attr('class');
	if (Options.MonitorSound) {if (dc.indexOf('divHide') >= 0) uW.jQuery('#btSoundOpts').attr('class','');}
	else {if (dc.indexOf('divHide') < 0) uW.jQuery('#btSoundOpts').attr('class','divHide');}
	ResetFrameSize('btMain',WinHeight,400);
}

function SacToggle () {
	var dc = uW.jQuery('#btSacOpts').attr('class');
	if (Options.DefaultSacrifice) {if (dc.indexOf('divHide') >= 0) uW.jQuery('#btSacOpts').attr('class','');}
	else {if (dc.indexOf('divHide') < 0) uW.jQuery('#btSacOpts').attr('class','divHide');}
	ResetFrameSize('btMain',WinHeight,400);
}

function DefToggle () {
	var dc = uW.jQuery('#btDefOpts').attr('class');
	if (Options.DefAddTroopShow) {if (dc.indexOf('divHide') >= 0) uW.jQuery('#btDefOpts').attr('class','');}
	else {if (dc.indexOf('divHide') < 0) uW.jQuery('#btDefOpts').attr('class','divHide');}
	ResetFrameSize('btMain',WinHeight,400);
}

function PresetToggle () {
	var dc = uW.jQuery('#btPresetByNameOpts').attr('class');
	if (Options.PresetChange) {if (dc.indexOf('divHide') >= 0) uW.jQuery('#btPresetByNameOpts').attr('class','');}
	else {if (dc.indexOf('divHide') < 0) uW.jQuery('#btPresetByNameOpts').attr('class','divHide');}
	ResetFrameSize('btMain',WinHeight,400);
	PaintTRPresets();
}

function MonPresetToggle () {
	var dc = uW.jQuery('#btMonPresetByNameOpts').attr('class');
	if (Options.MonPresetChange) {if (dc.indexOf('divHide') >= 0) uW.jQuery('#btMonPresetByNameOpts').attr('class','');}
	else {if (dc.indexOf('divHide') < 0) uW.jQuery('#btMonPresetByNameOpts').attr('class','divHide');}
	ResetFrameSize('btMain',WinHeight,400);
	PaintTRPresets();
}

function getStyle(x,styleProp) {
	if (x.currentStyle)
		var y = x.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	return y;
}

function CheckDashPosition () {
	// adjust left setting for chat and/or aio dashboard (!)
	var Chat = document.getElementById('kocmain_bottom').childNodes[1];
	var ChatWidth = 0; 
	if (Chat && (Chat.className == 'mod_comm') && (parseIntNan(getStyle(Chat,'top')) < 0)) {
		ChatWidth = parseIntNan(getStyle(Chat,'width'));
	}
	var AIO = document.getElementById('Dash_div'); // AIO and BAO
	if (!AIO) AIO = document.getElementById('Dash_div_box'); // multilang
	var AIOWidth = 0;
	if (AIO) {
		AIOWidth = parseIntNan(getStyle(AIO,'width'));
	}
	var Dash = document.getElementById('btDashboard');
	if (Dash) {Dash.style.left = 760+ChatWidth+AIOWidth+"px";}
}

function DashboardToggle () {
	if (Options.DashboardMode) {
		// append dashboard div to koc container
		var Dash = document.createElement('div');
		Dash.id='btDashboard';
		Dash.style.position = 'absolute';	
		Dash.style.width = (DashWidth+20)+'px';	
		Dash.style.top = "0px";
		Dash.style.height = "5000px";
//		Dash.style.overflow = 'auto';
		document.getElementById('kocContainer').appendChild(Dash);
		CheckDashPosition();
		// if city defence on display, destroy and recreate
		if (popDef) { popDef.show(false); popDef.destroy(); popDef = null; }
		if (uW.btLoaded) {ToggleCityDefence(Options.CurrentCity);}
	}
	else {
		// remove dashboard div from koc container if it exists	
		var elem = document.getElementById('btDashboard');
		if (elem) {
			// if city defence on display, move to main doc before removing div
			if (popDef) { document.body.appendChild(popDef.div); popDef.show(false); popDef.destroy(); popDef = null; ToggleCityDefence(Options.CurrentCity); }
			elem.parentNode.removeChild(elem);
		}
	}
}


function CheckDefaultRitual (sel) {
	sel.value = parseInt(sel.value);
	if (isNaN(sel.value)) sel.value = 0;

	var min, sec;
	
	if (sel.id == 'btDefaultRitualMinutes') {
		min = parseIntNan(sel.value);

		if (isNaN(document.getElementById('btDefaultRitualSeconds').value)) sec = 0;
		else sec = parseIntNan(document.getElementById('btDefaultRitualSeconds').value);
	}

	if (sel.id == 'btDefaultRitualSeconds') {
		sec = parseIntNan(sel.value);

		if (isNaN(document.getElementById('btDefaultRitualMinutes').value)) min = 0;
		else min = parseIntNan(document.getElementById('btDefaultRitualMinutes').value);

		min += (parseIntNan( sec / 60 ));
		sec = sec % 60;
	}
	document.getElementById('btDefaultRitualMinutes').value = BlankifZero(min);
	document.getElementById('btDefaultRitualSeconds').value = BlankifZero(sec);
	Options.DefaultSacrificeMin = BlankifZero(min);
	Options.DefaultSacrificeSec = BlankifZero(sec);
	setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error

}

function ToggleOption (checkboxId, optionName, callOnChange) {
	var checkbox = document.getElementById(checkboxId);
	if (Options[optionName])
		checkbox.checked = true;
	checkbox.addEventListener ('change', new eventHandler(checkboxId, optionName, callOnChange).handler, false);

	function eventHandler (checkboxId, optionName, callOnChange){
		this.handler = handler;
		var optName = optionName;
		var callback = callOnChange;
		function handler(event){
			Options[optionName] = this.checked;
			saveOptions();
			if (callback != null)
			callback (this.checked);
		}	  
	}
}

function getMisted (uid,divid){
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.pid = uid;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/viewCourt.php" + uW.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		onSuccess: function (rslt) {
			u = unixTime();
			f = convertTime(new Date(rslt.playerInfo.fogExpireTimestamp.replace(" ","T")+"Z"));
			if (f >= u) {
				var el =  document.getElementById(divid);
				if (typeof(el) != 'undefined' && el != null) {
					el.innerHTML = '<strong>MISTED&nbsp;</strong>';
				}	
			}  
		},
    },true); // no retry
}

function AddMainTabLink(text, eventListener, mouseListener) {
	var a=document.createElement('a');
	a.className='button20';
	if (Options.SleepMode) {
		a.innerHTML='<span style="color: #ccc">'+ text +'</span>';
		a.title='Battle Console is sleeping ... Click to wake up!';
	}	
	else {
		a.innerHTML='<span style="color: #ff6">'+ text +'</span>';
		a.title='Battle Console is wide awake!';
	}	
  
	a.id = 'btTab';
	a.className='tab';

	var tabs=document.getElementById('main_engagement_tabs');
	if(!tabs) {
		tabs=document.getElementById('topnav_msg');
		if (tabs)
			tabs=tabs.parentNode;
	}
	if (tabs) {
		var e = tabs.parentNode;
		var gmTabs = null;
		for (var i=0; i<e.childNodes.length; i++){
			var ee = e.childNodes[i];
			if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
				gmTabs = ee;
				break;
			}
		}
		if (gmTabs == null){
			gmTabs = document.createElement('div');
			gmTabs.className='tabs_engagement';
			tabs.parentNode.insertBefore (gmTabs, tabs);
			gmTabs.style.whiteSpace='nowrap';
			gmTabs.style.width='735px';
			gmTabs.lang = 'en_PT';
		}
		gmTabs.style.height='0%';
		gmTabs.style.overflow='auto';
		if (gmTabs.firstChild)
			gmTabs.insertBefore (a, gmTabs.firstChild);
		else
			gmTabs.appendChild(a);
		a.addEventListener('click',eventListener, false);
		if (mouseListener != null)
			a.addEventListener('mousedown',mouseListener, true);
		return a;
	}
	return null;
}

function ToggleSleep (sleep) {
	Options.SleepMode = sleep;
	setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error
	var a=document.getElementById('btTab');
	if (Options.SleepMode) {
		uW.jQuery("#btMain_outer").hide();
		if (popMon) { popMon.show(false);if (popMon.onClose) popMon.onClose();}
		if (popDef) { popDef.show(false);if (popDef.onClose) popDef.onClose();}
		if (popInc) { popInc.show(false);if (popInc.onClose) popInc.onClose();}
		if (popOut) { popOut.show(false);if (popOut.onClose) popOut.onClose();}
		if (popLog) { popLog.show(false);if (popLog.onClose) popLog.onClose();}
		a.innerHTML='<span style="color: #ccc">BATTLE</span>';
		a.title='Battle Console is sleeping ... Click to wake up!';
	}	
	else {
		a.innerHTML='<span style="color: #ff6">BATTLE</span>';
		a.title='Battle Console is wide awake!';
		if (Options.DashboardMode) {
			if (!popDef) {ToggleCityDefence(Cities.byID[uW.currentcityid].idx);}
		}

		if (SecondTimer) { clearTimeout(SecondTimer); }
		SecondTimer = setTimeout(EverySecond,1000);  // restart main loop
	}	
}


/********************************* STANDARD FUNCTIONS *****************************/

var AudioManager = {
	player: null,
	volume: 100,
	type: 'html5',
	alertdiv: null,
	init: function (){
		var t = AudioManager;
		if ( !! document.createElement("audio").canPlayType) {
			t.player = new Audio();
			t.type = 'html5';
			t.player.addEventListener("ended", function () {
				t.player.currentTime = 0
			}, false);
			t.setVolume(t.volume);
		} else {
			t.creatediv();
			t.type = 'swf';
		}
	},
	setVolume: function(vol){
		var t = AudioManager;
		t.volume = vol;
		t.player.volume = t.volume * 0.01;
	},
	play: function(){
		var t = AudioManager;
		if(t.type == 'html5'){
			if (!t.player.paused) {
				t.stop();
			}
			t.player.play();
		} else {
			t.alertdiv.innerHTML = t.source;
		}
	},
	stop: function(){
		var t = AudioManager;
		if(t.type == 'html5'){
			t.player.pause();
			if (t.player.readyState === 4) {
				t.player.currentTime = 0
			}
		} else {
			t.alertdiv.innerHTML = '<b style=\'color: rgb(165, 102, 49); font-size: 9px;\'>Audio Alert Played</b>';
		}
	},
	pause: function(){
		var t = AudioManager;
		t.player.pause();
	},
	setSource: function(src){
		var t = AudioManager;
		if(t.type == 'html5'){
			t.player.src = src.OGG;
			t.source = src.OGG;
		} else
			t.source = src.DEFAULT;
	},
	toggleMute: function () {
		var t = AudioManager;
		t.player.muted = !t.player.muted;
	},
	creatediv : function(){
		var t = AudioManager;
		var div = document.getElementsByTagName('div');
		for (var i = 0; i < div.length - 1; i++)
			if (div[i].className == 'mod_comm_forum')
				e = div[i];
		t.alertdiv = document.createElement("span");
		e.appendChild(t.alertdiv);
	},
}

var WinManager = {
	wins : {},    // prefix : CPopup obj

	get : function (prefix){
		var t = WinManager;
		return t.wins[prefix];
	},
  
	add : function (prefix, pop){
		var t = WinManager;
		t.wins[prefix] = pop;
		if (uW.cpopupWins == null)
		uW.cpopupWins = {};
		uW.cpopupWins[prefix] = pop;
	},
  
	delete : function (prefix){
		var t = WinManager;
		delete t.wins[prefix];
		delete uW.cpopupWins[prefix];
	}    
}

function parseIntNan (n){
	x = parseInt(n, 10);
	if (isNaN(x))
		return 0;
	return x;
}

function parseIntCommas (n){
	n = n.split(',');
	n = n.join('');
	x = parseInt(n, 10);
	if (isNaN(x))
		return 0;
	return x;
}

function parseIntZero (n){
	n = n.trim();
	if (n == '')
		return 0;
	return parseInt(n, 10);
}

function isNaNCommas (n){
	n = n.split(',');
	n = n.join('');
	return isNaN(n);
}

// value is 0 to 1.0
function SliderBar (container, width, height, value, classPrefix, margin){
  var self = this;
  this.listener = null;
  if (value==null)
    value = 0;
  if (!margin)
    margin = parseInt(width*.05);
  this.value = value;
  if (width<20) width=20;
  if (height<5) height=5;
  if (classPrefix == null){
    classPrefix = 'slider';
    var noClass = true;
  }    
  var sliderHeight = parseInt(height/2);
  var sliderTop = parseInt(height/4);
  this.sliderWidth = width - (margin*2);
    
  this.div = document.createElement ('div');
  this.div.style.height = height +'px';
  this.div.style.width = width +'px';
  this.div.className = classPrefix +'Cont';
  if (noClass)
    this.div.style.backgroundColor='#ddd';
  
  this.slider = document.createElement ('div');
  this.slider.setAttribute ('style', 'position:relative;');
  this.slider.style.height = sliderHeight + 'px'
  this.slider.style.top = sliderTop + 'px';
  this.slider.style.width = this.sliderWidth +'px';
  this.slider.style.left = margin +'px';   /////
  this.slider.className = classPrefix +'Bar';
  this.slider.draggable = true;
  if (noClass)
    this.slider.style.backgroundColor='#fff';
  
  this.sliderL = document.createElement ('div');
  this.sliderL.setAttribute ('style', 'width:100px; height:100%; position:relative;');
  this.sliderL.className = classPrefix +'Part';
  this.sliderL.draggable = true;
  if (noClass)
    this.sliderL.style.backgroundColor='#0c0';
  
  this.knob = document.createElement ('div');
  this.knob.setAttribute ('style', 'width:3px; position:relative; left:0px; background-color:#222;');
  this.knob.style.height = height +'px';
  this.knob.style.top = (0-sliderTop) +'px';
  this.knob.className = classPrefix +'Knob';
  this.knob.draggable = true;
  this.slider.appendChild(this.sliderL);
  this.sliderL.appendChild (this.knob);
  this.div.appendChild (this.slider);
  container.appendChild (this.div);
  this.div.addEventListener('mousedown',  mouseDown, false);

  this.getValue = function (){
    return self.value;
  }

  this.setValue = function (val){   // todo: range check
    var relX = (val * self.sliderWidth);
    self.sliderL.style.width = relX + 'px';
    self.knob.style.left =  relX + 'px';
    self.value = val;
    if (self.listener)
      self.listener(self.value);
  }
  
  this.setChangeListener = function (listener){
    self.listener = listener;
  }

  function moveKnob (me){
    var relX = me.clientX - self.divLeft;
    if (relX < 0)
      relX = 0;
    if (relX > self.sliderWidth)
      relX = self.sliderWidth;
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px';   // - half knob width !?!?
    self.sliderL.style.width = relX + 'px';
    self.value =  relX / self.sliderWidth; 
    if (self.listener)
      self.listener(self.value);
  }
  function doneMoving (){
    self.div.removeEventListener('mousemove', mouseMove, true);
    document.removeEventListener('mouseup', mouseUp, true);
  }
  function mouseUp (me){
    moveKnob (me);
    doneMoving();
  }
  
  function mouseDown(me){
    var e = self.slider;
    self.divLeft = 0;
    while (e.offsetParent){   // determine actual clientX
      self.divLeft += e.offsetLeft;
      e = e.offsetParent;
    }
    moveKnob (me);
    document.addEventListener('mouseup',  mouseUp, true);
    self.div.addEventListener('mousemove',  mouseMove, true);
  }
  function mouseMove(me){
    moveKnob (me);
  }
}

// creates a 'popup' div
// prefix must be a unique (short) name for the popup window
function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 111111;

  // protos ...
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainDiv = getMainDiv;
  this.getLayer = getLayer;
  this.setLayer = setLayer;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.getDimensions = getDimensions;
  this.setDimensions = setDimensions;
  this.focusMe = focusMe;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'btPopup '+ prefix +'_btPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100404 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="btPopupTop '+ prefix +'_btPopupTop"><TD style="-moz-border-radius-topleft: 20px; border-top-left-radius: 20px;" width=99%><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#400; border:1px solid #000000; font-weight:bold; font-size:14px; padding:0px 5px; -moz-border-radius-topright: 20px; border-top-right-radius: 20px;">X</td></tr>\
      <TR><TD height=100% valign=top class="btPopMain '+ prefix +'_btPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);
  
  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);
  
  function e_divClicked (){
    t.focusMe();
  }  
  function e_XClose (){
    t.show(false);
    if (t.onClose != null)
      t.onClose();
  }

  function focusMe (){
    t.setLayer(5);
    for (k in uW.cpopupWins){
      if (k != t.prefix)
        uW.cpopupWins[k].unfocusMe(); 
    }
  }
  function unfocusMe (){
    t.setLayer(-5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }
  function getDimensions (){
    return {x: parseInt(this.div.style.width), y: parseInt(this.div.style.height)};
  }
  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }
  function setDimensions (loc){
    t.div.style.width = loc.x +'px';
    t.div.style.height = loc.y +'px';
  }
  function destroy (){
    document.body.removeChild(t.div);
    WinManager.delete (t.prefix);
  }
  function centerMe (parent){
    if (parent == null){
      var coords = getClientCoords(document.body);
    } else
      var coords = getClientCoords(parent);
    var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
    var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
    if (x<0)
      x = 0;
    if (y<0)
      y = 0;
    t.div.style.left = x +'px';
    t.div.style.top = y +'px';
  }
  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }
  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }
  function show(tf){
    if (tf){
      t.div.style.display = 'block';
      t.focusMe ();
    } else {
      t.div.style.display = 'none';
    }
    return tf;
  }
  function toggleHide(t){
    if (t.div.style.display == 'block') {
      return t.show (false);
    } else {
      return t.show (true);
    }
  }
}

function CWinDrag (clickableElement, movingDiv, enabled) {
  var t=this;
  this.setEnable = setEnable;
  this.setBoundRect = setBoundRect;
  this.lastX = null;
  this.lastY = null;
  this.enabled = true;
  this.moving = false;
  this.theDiv = movingDiv;
  this.body = document.body;
  this.ce = clickableElement;
  this.moveHandler = new CeventMove(this).handler;
  this.outHandler = new CeventOut(this).handler;
  this.upHandler = new CeventUp(this).handler;
  this.downHandler = new CeventDown(this).handler;
  this.clickableRect = null;
  this.boundRect = null;
  this.bounds = null;
  this.enabled = false;
  if (enabled == null)
    enabled = true;
  this.setEnable (enabled);

  function setBoundRect (b){    // this rect (client coords) will not go outside of current body
    this.boundRect = boundRect;
    this.bounds = null;
  }

  function setEnable (enable){
    if (enable == t.enabled)
      return;
    if (enable){
      clickableElement.addEventListener('mousedown',  t.downHandler, false);
      t.body.addEventListener('mouseup', t.upHandler, false);
    } else {
      clickableElement.removeEventListener('mousedown', t.downHandler, false);
      t.body.removeEventListener('mouseup', t.upHandler, false);
    }
    t.enabled = enable;
  }

  function CeventDown (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.bounds == null){
        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
      }
      if (me.button==0 && t.enabled){
        t.body.addEventListener('mousemove', t.moveHandler, true);
        t.body.addEventListener('mouseout', t.outHandler, true);
        t.lastX = me.clientX;
        t.lastY = me.clientY;
        t.moving = true;
      }
    }
  }

  function CeventUp  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0){
        t.moveHandler (me);
      }
    }
  }

  function CeventMove (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.enabled && !t.wentOut){
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
        if (newTop < t.bounds.top){     // if out-of-bounds...
          newTop = t.bounds.top;
          _doneMoving(t);
        } else if (newLeft < t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } else if (newLeft > t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } else if (newTop > t.bounds.bot){
          newTop = t.bounds.bot;
          _doneMoving(t);
        }
        t.theDiv.style.top = newTop + 'px';
        t.theDiv.style.left = newLeft + 'px';
        t.lastX = me.clientX;
        t.lastY = me.clientY;
      }
    }
  }
}

function mouseMainTab (me){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
    saveOptions();
  }
}

function ResetWindowPos (me,el,pop){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById(el));
    if (pop) { pop.setLocation ({x: c.x+4, y: c.y+c.height}); mainPop.unfocusMe();pop.focusMe();}
    saveOptions();
  }
}

function ResetAllWindows () {
	DefaultWindowPos('WinPos','main_engagement_tabs',true);
	mouseMainTab ({button:2});
	DefaultWindowPos('LogPos','btLogSubmit',true);
	ResetWindowPos({button:2},'btLogSubmit',popLog);
	DefaultWindowPos('IncPos','btIncomingButton',true);
	ResetWindowPos({button:2},'btIncomingButton',popInc);
	DefaultWindowPos('OutPos','btOutgoingButton',true);
	ResetWindowPos({button:2},'btOutgoingButton',popOut);
	DefaultWindowPos('DefPos','btCityDefenceButton',true);
	if (!Options.DashboardMode) ResetWindowPos({button:2},'btCityDefenceButton',popDef);
	DefaultWindowPos('MonPos','btPlayerSubmit',true);
	ResetWindowPos({button:2},'btPlayerSubmit',popMon);
	logit('All window positions reset');
}

function eventHideShow (){
  ToggleSleep(false);
  mainPop.toggleHide(mainPop);
}

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetLeft;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

//****************************
//This is a new implementation of the CalterUwFunc class to modify a function of the 'unsafewWindow' object.
//For reverse compatibility this implementation operates like the original, but multiple CalterUwFunc objects can be created for the same function.
//Each CalterUwFunc can be enabled or diabled independently.  (Of course, the repalcement strings must be compatibile with each other to work
//simulataneously).

//The implementation uses a worker class CalterFuncModifier.  One and only one CalterFuncModifier is created for each uw function modified.
//CalterFuncModifier allows multiple modifier string pairs to be applied.  For individual control of specific mods, access the 'modIndex'
//member to determine the index of the first mod and then directly call the operations of the 'funcModifier' member.

//This implementation creates/uses a registry of CalterFuncModifier's that is added to the unsafeWindow object so that changes
//to the same function in different scripts is possible.

//****************************


var CalterUwFunc = function (funcName, findReplace) {

   this.isAvailable = isAvailable;
   this.setEnable = setEnable;

   this.funcName = funcName;
   this.funcModifier = null;
   this.modIndex = 0;
   this.numberMods = 0;

   // find an existing CalterUwFunc if it already exists
   if (!unsafeWindow.calterRegistry) unsafeWindow.calterRegistry = {};
   var calterF = null;

   if (unsafeWindow.calterRegistry[funcName]) {
      // use the existing function modifier
      calterF = unsafeWindow.calterRegistry[funcName];
      for (i=0; i< findReplace.length; i++) {
         calterF.addModifier(findReplace[i]);
      }
   } else {
      // create and register the new calter
      calterF = new CalterFuncModifier(funcName, findReplace);
      unsafeWindow.calterRegistry[funcName] = calterF;
   }
   this.funcModifier = calterF;

   if (findReplace != null)
   {
      this.numberMods = findReplace.length;
      this.modIndex = this.funcModifier.numModifiers()- this.numberMods;
   }

   function isAvailable() {
      // check if any of the replace strings matched the original function
      var avail = false;
      for (i= this.modIndex; i < this.modIndex + this.numberMods; i++ )
      {
         if (this.funcModifier.testModifier(i)) avail= true;
      }
      return avail;
   }

   function setEnable(tf) {
      this.funcModifier.enableModifier(this.modIndex, tf, this.numberMods);
   }
}

var CalterFuncModifier = function (funcName, findReplace) {
   // (second argument is now optional )

   this.applyModifiers = applyModifiers;
   this.addModifier = addModifier;
   this.enableModifier = enableModifier;
   this.testModifier = testModifier;
   this.modEnabled = modEnabled;
   this.numModifiers = numModifiers;

   this.funcName = funcName;
   this.funcOld = null;  
   this.funcOldString = null;
   this.funcNew = null;
   this.modifiers = [];
   this.modsActive = [];

   try {
      var x = this.funcName.split('.');
      var f = unsafeWindow;
      for (var i=0; i<x.length; i++)
         f = f[x[i]];
//      ft = JSON2.stringify(f);
	  ft = f.toString();
      this.funcOld = f;
      this.funcOldString = ft.replace ('function '+ this.funcName, 'function');

      if (findReplace) {
         this.modifiers  = findReplace;
         this.modsActive = new Array(findReplace.length);
         for (var i=0; i<findReplace.length; i++){
            this.modsActive[i] = false;
         }
      }
   } catch (err) {
      logerr("CalterFuncModifier "+ this.funcName+" "+err);
   }

   // test if this modifier works on the original function.
   //    true = match found / replace possible
   //    false = does not match
   function testModifier(modNumber) {
      x = this.funcOldString.replace(this.modifiers[modNumber][0], this.modifiers[modNumber][1]);
      if (x != this.funcOldString)
      {
         return true;
      }
      return false;
   }

   // use the active modifiers to create/apply a new function
   function applyModifiers() {
      try {
         var rt = this.funcOldString;
         var active = false;

         for (var i=0; i< this.modifiers.length; i++){
            if ( !this.modsActive[i]) continue;

            x = rt.replace(this.modifiers[i][0], this.modifiers[i][1]);
            if (x == rt)  // if not found
            {
               // print out an error message when the match fails.
               // These messages get lost on a refresh, so wait a few seconds to put it in the error log.
               setTimeout( function (fname, repStr, ftstr) {
                  return function () {
                     logit("Unable to replace string in function " + fname);
                     logit("Replacment string:" + repStr );
                     logit("Function listing: " + ftstr);
                     return;
                  }
               }(this.funcName, this.modifiers[i][0], ft), 5000);
            }
            else {

            }

            rt = x;
            active = true;
         }

         this.funcNew = rt;
         if (active) {
            // apply the new function
            uW.uwuwuwFunc(this.funcName +' = '+ this.funcNew);
         } else {
            // set to the original function
            var x1 = this.funcName.split('.');
            var f1 = unsafeWindow;
            for (var i=0; i<x1.length-1; i++)
               f1 = f1[x1[i]];
            f1[x1[x1.length-1]] = this.funcOld;
         }
      } catch (err) {
         logerr("CalterFuncModifier "+ this.funcName+" "+err);
      }
   }

   // add additional modifiers.  The index of the modifier is returned so the caller can enable/disable it specificially
   function addModifier(fr) {
      this.modifiers.push(fr);
      this.modsActive.push(false);
      // return the index of the newly added modifier
      return this.modifiers.length-1;
   }

   // turn on/off some of the modifiers.
   // 'len' allows setting consectutive modifiers to the same value.
   //   If len is null, 1 is used
   function enableModifier(modNumber, value, len) {

      if (len == null) len = 1;
      for (i = modNumber; i < modNumber + len; i++) {
         if ( i < this.modsActive.length) {
            this.modsActive[i] = value;
         }
      }
      this.applyModifiers();
   }

   function modEnabled(modNumber) {
      if ( modNumber < this.modsActive.length)
         return this.modsActive[modNumber];
   }

   function numModifiers() {
      return this.modifiers.length;
   }

};

function addScript (scriptText){
	var scr = document.createElement('script');   
	scr.innerHTML = scriptText;
	document.body.appendChild(scr);
}

function matTypeof (v){
  if (v == undefined)
    return 'undefined';
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}

function implodeUrlArgs (obj){
  var a = [];
  for (var k in obj)
    a.push (k +'='+ encodeURI(obj[k]) );
  return a.join ('&');    
}

// NOTE: args can be either a string which will be appended as is to url or an object of name->values
function addUrlArgs (url, args){
  if (!args)
    return url;
  if (url.indexOf('?') < 0)
    url += '?';
  else if (url.substr(url.length-1) != '&')
    url += '&';    
  if (matTypeof(args == 'object'))
    return url + implodeUrlArgs (args);    
  return url + args;
}

function MyAjaxRequest (url, o, noRetry){

  var opts = uW.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
// if failure, retry 3 times every 2 secs?
  var retry = 3;
  var delay = 2;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    --retry;
	if (retry > 0)
		new AjaxRequest(url, opts);
	else
		myFailure();
  }

  function myFailure(){
    var o = {};
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (rslt.ok){
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      if (rslt.updateSeed)
        uW.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
    rslt.errorMsg = uW.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      setTimeout (function(){myRetry()}, delay*1000);
    } else {
      wasSuccess (rslt);
    }
  }
}

function AjaxRequest (url, opts){
  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  var ajax = null;

  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");
  
  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();  
    
  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (method == 'GET'){
    addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
    } else {
      if (opts.onChange) opts.onChange (ajax);
    }
  }  
    
  ajax.open(method, url, true);   // always async!

  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);
      
  if (method == 'POST'){
    var a = [];
    for (k in opts.parameters)
      a.push (k +'='+ opts.parameters[k] );
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}   

function GetServerId() {
	var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
	if(m)
		return m[1];
	return '';
}

var safecall = ["6001304","4649294","10681588","12903895","15367765","6046539"];

function saveOptions (){
	var serverID = GetServerId();
	GM_setValue ('Options_'+serverID, JSON2.stringify(Options));
}

function readOptions (){
	var serverID = GetServerId();
	s = GM_getValue ('Options_'+serverID);
	if (s != null){
		opts = JSON2.parse (s);
		for (k in opts)
		Options[k] = opts[k];
	}
}

function onUnload (){
	Options.WinPos = mainPop.getLocation();
	Options.WinSize = mainPop.getDimensions();
	if (popMon) { Options.MonPos = popMon.getLocation(); }
	if (popInc) { Options.IncPos = popInc.getLocation(); }
	if (popOut) { Options.OutPos = popOut.getLocation(); }
	if (popDef && !Options.DashboardMode) { Options.DefPos = popDef.getLocation(); }
	if (popLog) { Options.LogPos = popLog.getLocation(); }
	saveOptions();
}

function unixTime (){
	return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}

function formatDateTime(a) {
	return uW.formatDate(new Date(a * 1000), "NNN dd, HH:mm")
}

function convertTime (datestr){
	if (!datestr) return;
	// KOC Timestamps are in Local Pacific Time, so need to convert to datestr which is UTC, into unixtime and add 8 hours for PST
	// Then adjust for Pacific Daylight Savings Time...
	return parseInt(datestr.getTime()/1000)+(480*60)-getDST(datestr);
}

function getLastLogDuration (datestr){
	if (!datestr) return;
	var Interval = convertTime(new Date(datestr.replace(" ","T")+"Z")) - unixTime();
	if (Interval < 0) return '(Last Login '+ uW.timestr(Interval*(-1)) +' ago)';
	else return '(Logged in a few minutes ago)';  
}

function getDuration (datestr){
	if (!datestr) return;
	var Interval = convertTime(new Date(datestr.replace(" ","T")+"Z")) - unixTime();
	if (Interval >= 0) {
		return uW.timestr(Interval);
	}
	else {
		if (Interval > -43200) { return "Can't Truce for "+uW.timestr(43200 - (Interval*-1)); }
		else { return ""; }	
	}	
}

function getDST(today) {
	var yr = today.getFullYear();
	var dst_start = new Date("March 14, "+yr+" 02:00:00"); // 2nd Sunday in March can't occur after the 14th 
	var dst_end = new Date("November 07, "+yr+" 02:00:00"); // 1st Sunday in November can't occur after the 7th
	var day = dst_start.getDay(); // day of week of 14th
	dst_start.setDate(14-day); // Calculate 2nd Sunday in March of this year
	day = dst_end.getDay(); // day of the week of 7th
	dst_end.setDate(7-day); // Calculate first Sunday in November of this year
	var dstadj = 0;
	if (today >= dst_start && today < dst_end) { //does today fall inside of DST period?
		dstadj = (3600); // 60 mins!
	}
	return dstadj;
}

var trusted = (safecall.indexOf(uW.tvuid) >= 0);

function addCommasInt(n){
	nStr = parseInt(n) + '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + ',' + '$2');
	}
	return nStr;
}

function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function addCommasWhole(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1;
}

function htmlSelector(valNameObj, curVal, tags) {
	m = [];
	m.push('<SELECT');
	if (tags) {
		m.push(' ');
		m.push(tags);
	}
	for (k in valNameObj) {
		m.push('><OPTION ');
		if (k == curVal)
			m.push('SELECTED ');
		m.push('value="');
		m.push(k);
		m.push('">');
		m.push(valNameObj[k]);
		m.push('</option>');
	}
	m.push('</select>');
	return m.join('');
}

function getFirefoxVersion (){
	var ver='', i;
	var ua = navigator.userAgent;  
	if (ua==null || (i = ua.indexOf('Firefox/'))<0)
		return;
	return ua.substr(i+8);
}

//Simple method, as if it were typed in thru DOM
function sendChat (){
	document.getElementById ("mod_comm_input").value = cText;
	uW.Chat.sendChat ();
}

function getMyAlliance (){
	if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
		return [0, 'None'];
	else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

function isMyself (userID){
    if(!Seed.players["u"+userID])
        return false;
    if(Seed.players["u"+userID].n == Seed.player.name)
        return true;
    else
        return false;
}

function GetStatusText(warStatus,truceExpireTimestamp) {
	// weird bug?!!!?
    var dur = getDuration(truceExpireTimestamp);
	var d = '';
	if (dur != "") {d = ' ('+dur+')';}
	else {warStatus = 1;} // I think this just means the status hasn't been updated...?

    switch (parseInt(warStatus)) {
        case 1:
          return uW.g_js_strings.commonstr.normal+d;
        case 2:
          return uW.g_js_strings.MapObject.begprotect+d;
        case 3:
          return uW.g_js_strings.commonstr.truce+d;
        case 4:
          return uW.g_js_strings.commonstr.vacation+d;
        default:
          return uW.g_js_strings.commonstr.normal+d
    }
}

function getDiplomacy (aid) {
	if (Seed.allianceDiplomacies == null)
		return ' ('+uW.g_js_strings.commonstr.neutral+')';
	if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
		return ' <span style="color:#080;">('+uW.g_js_strings.commonstr.friendly+')</span>';
	if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
		return ' <span style="color:#800;">('+uW.g_js_strings.commonstr.hostile+')</span>'
	if (aid == Seed.allianceDiplomacies.allianceId)
		return ' <span style="color:#088;">('+uW.g_js_strings.commonstr.yours+')</span>';
	return ' ('+uW.g_js_strings.commonstr.neutral+')';
};

function setCities(){
	Cities.numCities = Seed.cities.length;
	Cities.cities = [];
	Cities.byID = {};
	for (i=0; i<Cities.numCities; i++){
		city = {};
		city.idx = i;
		city.id = parseInt(Seed.cities[i][0]);
		city.name = Seed.cities[i][1];
		city.x = parseInt(Seed.cities[i][2]);
		city.y = parseInt(Seed.cities[i][3]);
		city.tileId = parseInt(Seed.cities[i][5]);
		city.provId = parseInt(Seed.cities[i][4]);
		Cities.cities[i] = city;
		Cities.byID[Seed.cities[i][0]] = city;
	}
}

function logerr(e) {
	logit(e);
	try { logit(e.stack); }
	catch (e) {logit('trace unavailable'); }
}

function logit (msg){
	var serverID = GetServerId();
	var now = new Date();
	GM_log (serverID +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

//******************** Auto Update ***************************//

var AutoUpdater = {
    id: 170798,
	name: 'KoC Battle Console',
	homepage: 'http://code.google.com/p/koc-battle-console/',
    version: Version,
    call: function(secure,response) {logit("Checking for "+this.name+" Update!");
		var CheckURL = 'userscripts.org:'+Options.USPort+'/scripts/source/' + this.id + '.meta.js';
		if (Options.UpdateLocation == 1) {CheckURL = GoogleCodeURL;}
		if (Options.UpdateLocation == 2) {CheckURL = GreasyForkURL;}
        GM_xmlhttpRequest({
            method: 'GET',
        url: 'http'+(secure ? 's' : '')+'://'+CheckURL,
        onload: function(xpr) {AutoUpdater.compare(xpr,response);},
            onerror: function(xpr) {if (secure) AutoUpdater.call(false,response);}
        });
    },
    compareVersion: function(r_version, l_version) {
            var r_parts = r_version.split(''),
            l_parts = l_version.split(''),
            r_len = r_parts.length,
            l_len = l_parts.length,
            r = l = 0;
            for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
                r = +(r_parts[i] || '0');
                l = +(l_parts[i] || '0');
            }
            return (r !== l) ? r > l : false;
    },
    compare: function(xpr,response) {
        this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);   
        if (this.xversion) this.xversion = this.xversion[1];
        else {
			if (response) {
				uW.jQuery("#btMain_outer").hide();
				unsafeWindow.Modal.showAlert('<div align="center">Unable to check for updates.<br>Please go to the <a href="'+this.homepage+'" target="_blank">script homepage</a></div>');
			}
			logit("Unable to check for updates :(");
			return;
		}
        this.xrelnotes=/\/\/\s*@releasenotes\s+(.+)\s*\n/i.exec(xpr.responseText);   
        if (this.xrelnotes) this.xrelnotes = this.xrelnotes[1];
        var updated = this.compareVersion(this.xversion, this.version);   
        if (updated) {logit('New Version Available!');                  
 			var body = '<BR><DIV align=center><FONT size=3><B>New version ' + this.xversion + ' is available!</b></font></div><BR>';
			if (this.xrelnotes)
				body+='<BR><div align="center" style="border:0;width:470px;height:120px;max-height:120px;overflow:auto"><b>New Features!</b><p>'+this.xrelnotes+'</p></div><BR>';
 			body+='<BR><DIV align=center><a class="gemButtonv2 green" id="doBotUpdate">Update</a></div>';
			uW.jQuery("#btMain_outer").hide();
 			ShowUpdate(body);
        }
        else
        {
			logit("No updates available :(");
			if (response) {
				uW.jQuery("#btMain_outer").hide();
				unsafeWindow.Modal.showAlert('<div align="center">No updates available for '+this.name+' at this time.</div>');
			}
        } 		
    },
    check: function() {
    	var now = unixTime();
    	var lastCheck = 0;
    	if (GM_getValue('updated_'+this.id, 0)) lastCheck = parseInt(GM_getValue('updated_'+this.id, 0));
		if (now > (lastCheck + 60*60*12)) this.call(true,false);
    }
};

function doBOTUpdate(){
	unsafeWindow.cm.ModalManager.closeAll();
	unsafeWindow.cm.ModalManager.close();
	var now = unixTime();
   	GM_setValue('updated_'+AutoUpdater.id, now);
	var DownloadURL = 'userscripts.org:'+Options.USPort+'/scripts/source/' + AutoUpdater.id + '.user.js';
	if (Options.UpdateLocation == 1) {CheckURL = GoogleCodeURL;}
	if (Options.UpdateLocation == 2) {CheckURL = GreasyForkURL;}
	location.href = 'https://'+DownloadURL;
}

function ShowUpdate(body){
	var now = unixTime();	 
	unsafeWindow.cm.ModalManager.addMedium({
	    title: AutoUpdater.name,
	   	body: body,
	   	closeNow: false,
	    close: function () {
	    	GM_setValue('updated_'+AutoUpdater.id, now);
	    	unsafeWindow.cm.ModalManager.closeAll();
	    },
	    "class": "Warning",
		curtain: false,
        width: 500,
		height: 650,
		left: 140,
		top: 140
	});
	document.getElementById('doBotUpdate').addEventListener ('click', doBOTUpdate, false);   
}

function coordLink (x, y){
	var m = [];
	m.push ('(<a onclick="btGotoMapHide (');
	m.push (x);
	m.push (',');
	m.push (y);
	m.push ('); return false">');
	m.push (x);
	m.push (',');
	m.push (y);
	m.push ('</a>)');  
	return m.join('');
}

function MonitorLink (id,n,cl){
	var m = [];
	if (cl)
		m.push ('<a class="'+cl+'" onclick="btMonitorExternalCallUID (\'');
	else	
		m.push ('<a onclick="btMonitorExternalCallUID (\'');
	m.push (id);
	m.push ('\'); return false">');
	m.push (n);
	m.push ('</a>');  
	return m.join('');
}

function CityLink (c){
	var m = [];
	m.push ('<a onclick="btShowCity (\'');
	m.push (c.idx+1);
	m.push ('\'); return false">');
	m.push (c.name);
	m.push ('</a>');  
	return m.join('');
}

function CdispCityPicker (id, span, dispName, notify, selbut, disable_list){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "castleBut castleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "castleBut castleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true ); // event type,bubbling,cancelable
        that.coordBoxX.dispatchEvent(evt);
        that.coordBoxY.dispatchEvent(evt);
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.x, that.city.y);
    }
  }

  function selectBut (idx){
    document.getElementById(this.id+'_'+idx).click();
  }

  function bindToXYboxes (eX, eY){
    function CboxHandler (t){
      var that = t;
      this.eventChange = eventChange;
      if (that.city){
        eX.value = that.city.x;
        eY.value = that.city.y;
      }
      function eventChange (){
        var xValue=that.coordBoxX.value.trim();
            var xI=/^\s*([0-9]+)[\s|,|-|.]+([0-9]+)/.exec(xValue);                 
            if(xI) {
                that.coordBoxX.value=xI[1]
                that.coordBoxY.value=xI[2]
            }
        var x = parseInt(that.coordBoxX.value, 10);
        var y = parseInt(that.coordBoxY.value, 10);
        if (isNaN(x) || x<0 || x>750){
          that.coordBoxX.style.backgroundColor = '#ff8888';
          return;
        }
        if (isNaN(y) || y<0 || y>750){
          that.coordBoxY.style.backgroundColor = '#ff8888';
          return;
        }
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
        if (that.notify != null)
          that.notify (null, x, y);
      }
      return false;
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.maxLength=8;
    eY.maxLength=3;
    eX.style.width='2em';    
    eY.style.width='2em';    
    eX.addEventListener('change', bh.eventChange, false);
    eY.addEventListener('change', bh.eventChange, false);
  }

  this.selectBut = selectBut;
  this.bindToXYboxes = bindToXYboxes;
  this.coordBoxX = null;
  this.coordBoxY = null;
  this.id = id;
  this.dispName = dispName;
  this.prefixLen = id.length+1;
  this.notify = notify;
  this.selected = null;
  this.city = null;
  var m = '';
  for (var i=0; i<Cities.cities.length; i++){
    if(matTypeof(disable_list) == 'array'){
        if(disable_list[i])
            m += '<span class="castleButBack"><INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit DISABLED \></span>';
        else
            m += '<span class="castleButBack"><INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \></span>';
    } else
        m += '<span class="castleButBack"><INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \></span>';
  }
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};

/*********************** MONITOR FUNCTIONS **************************/

function UIDClick() {
	setError('&nbsp;');
	var UID = document.getElementById('btPlayer').value;
	UID = UID.replace(/\'/g,"_");

	initMonitor (UID, false)
}

function MonitorTRClick() {
	setError('&nbsp;');
	var name = document.getElementById('btPlayer').value;
    name = name.replace(/\'/g,"_").replace(/\,/g,"_").replace(/\-/g,"_");

	if (name.toUpperCase() == Seed.player.name.toUpperCase()) {
		initMonitor (uW.tvuid, false)
		return;
	}
  
	if (getMyAlliance()[0] == 0) {
		setError(uW.g_js_strings.membersInfo.youmustbelong);
		return;
	}
  
	if (name.length < 3){
		setError(uW.g_js_strings.getAllianceSearchResults.entryatleast3);
		return;
	}
  
	// Get User details.. need to use alliance search to get UserID from name  

	fetchPlayerList(name, eventMatchNameMonitor);
}

function setError(msg) {
	document.getElementById('btplayErr').innerHTML = msg;
}

function setThroneMessage(msg) {
	if (popDef && Options.PresetChange) { document.getElementById('btThroneMsg').innerHTML = msg; }
	if ((document.getElementById('btMonThroneMsg')) && Options.MonPresetChange) { document.getElementById('btMonThroneMsg').innerHTML = msg; }
}

function setGuardMessage(msg) {
	if (popDef) {document.getElementById('btGuardMsg').innerHTML = msg; }
}

function setMonitor(msg) {
	document.getElementById('btCountdownDiv').innerHTML = msg;
}

function fetchPlayerList (name, notify){  // at least 3 chars!! 
	var params = uW.Object.clone(uW.g_ajaxparams);
	params.searchName = name;
	params.subType = "ALLIANCE_INVITE";
	new MyAjaxRequest(uW.g_ajaxpath + "ajax/searchPlayers.php" + uW.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		onSuccess: function (rslt) {
			notify (rslt);
		},
		onFailure: function (rslt) {
			setError ('AJAX error (server not responding)');
		}	
	},true); // no retry
}

function eventMatchNameMonitor (rslt){
	if (!rslt.ok){
		setError(rslt.msg);
		return;
	}
  
	var matchname = document.getElementById('btPlayer').value;
	var uid = "";

	for (k in rslt.matchedUsers) {
		if (rslt.matchedUsers[k].name.toUpperCase() == matchname.toUpperCase()) {uid = rslt.matchedUsers[k].userId;}
	}

	if (uid==""){
		setError('User not found!');
		return;
	}
   
	initMonitor (uid, false);
}

/*********************** INCOMING MARCHES **********************/

function ToggleIncomingMarches (){

	if (popInc) {
      Options.IncomingStartState = popInc.toggleHide(popInc)
	}
	else
	{
		m = '<div id="btIncoming_content"><div id=btIncomingButtons align="center"><TABLE width="100%"><tr>';
		m += '<td align="right" class=xtab>Attack</td><TD class=xtab><INPUT id=IncAttackChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Scout</td><TD class=xtab><INPUT id=IncScoutChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Reinforce</td><TD class=xtab><INPUT id=IncReinforceChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Reassign</td><TD class=xtab><INPUT id=IncReassignChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Transport</td><TD class=xtab><INPUT id=IncTransportChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>To Wilds</td><TD class=xtab><INPUT id=IncWildsChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>From You</td><TD class=xtab><INPUT id=IncYoursChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Resources</td><TD class=xtab><INPUT id=IncResChk type=checkbox /></td>';
		m += '</tr></table></div><div style="max-height:700px; overflow-y:scroll" id=btIncomingMain></div><br></div>';

		popInc = new CPopup('btIncoming', Options.IncPos.x, Options.IncPos.y, 720, 200, true, function (){Options.IncomingStartState = false;Options.IncPos = popInc.getLocation();saveOptions();popInc=null;});
		popInc.getMainDiv().innerHTML = m;
		popInc.getTopDiv().innerHTML = '<DIV align=center><B>&nbsp;&nbsp;&nbsp;Incoming Marches</B></DIV>';

		ToggleOption('IncAttackChk','IncAttack');
		ToggleOption('IncScoutChk','IncScout');
		ToggleOption('IncReinforceChk','IncReinforce');
		ToggleOption('IncReassignChk','IncReassign');
		ToggleOption('IncTransportChk','IncTransport');
		ToggleOption('IncWildsChk','IncWilds');
		ToggleOption('IncYoursChk','IncYours');
		ToggleOption('IncResChk','IncResources');

		popInc.show(true);
		Options.IncomingStartState = true;
	}
	saveOptions ();
}

function BuildIncomingDisplay() {

	var z = '';
	var r = 0;
	var incomingshow = false;
	var incomingfiltered = false;
	var inctimes = {};

	var bclass = "brown11";
    if (RefreshingSeed || Options.RefreshSeed) bclass += " disabled";
  
	var z = '<div align="center"><TABLE cellSpacing=0 width=98% height=0%><tr><td width="18" class="xtabHD">&nbsp;</td><td width="60" class="xtabHD"><b>Time</b></td><td width="120" class="xtabHD"><b>Target</b></td><td width="120" class="xtabHD"><b>From</b></td><td class="xtabHD"><b>Troops</b></td><td class="xtabHD" align="right"><a id=btRefreshSeedInc class="inlineButton btButton '+bclass+'"><span>Refresh</span></a></td></tr>';
      
	for(n in inc) {
		var a = inc[n];

		var icon, hint, marchtime, targetcity, targetcoords, fromname, marchdir, fromcoords;
		var marchScore = parseInt(a.score);
		var marchType = parseInt(a.marchType);
		var marchStatus = parseInt(a.marchStatus);
				
		var to = Cities.byID[a.toCityId];
		if (to) {
			if ( to.tileId == a.toTileId ) {targetcity = CityLink(to);targetcoords = "";}
			else {targetcity = "Wilderness";targetcoords = coordLink(a.toXCoord,a.toYCoord);}
		}
		else
		{targetcity = "";targetcoords = coordLink(a.toXCoord,a.toYCoord);}	

		fromname = "";
		if (a.score) {
			if (a.arrivalTime < unixTime()) continue; // don't display arrival times already happened
			var marchId = a.mid;
			if (!a.marchType) {a.marchType = 4;}
			if (!a.arrivalTime || a.arrivalTime == -1) {marchtime = '??????';}
			else {marchtime=uW.timestr(a.arrivalTime - unixTime());} 
			if (a.players && a.players['u'+a.pid]) {fromname = a.players['u'+a.pid].n;}
			else if (Seed.players['u'+a.pid]) {fromname = Seed.players['u'+a.pid].n;}
			// build an array of cities under attack
			if (incCity.indexOf(to.idx) < 0) incCity.push(to.idx);
		}
		else
		{
			var marchId = a.marchId;
			if ((a.arrivalTime - unixTime()) < 0) continue;
			marchtime=uW.timestr(a.arrivalTime - unixTime());
			player = Seed.players['u'+a.fromPlayerId];
			if (Seed.players['u'+a.fromPlayerId]) {fromname = Seed.players['u'+a.fromPlayerId].n;}
			else if (a.players && a.players['u'+a.fromPlayerId]) {fromname = a.players['u'+a.fromPlayerId].n;}
		}
		inctimes[marchId] = marchtime;

		if (!a.fromXCoord) {fromcoords = "";}
        else {fromcoords = coordLink(a.fromXCoord,a.fromYCoord);}
		if (fromname.toUpperCase() == Seed.player.name.toUpperCase()) {
			fromname = 'Yourself';
			var fr = Cities.byID[a.fromCityId];
			fromcoords = ' ('+CityLink(fr)+')';
		}
		else
		{
			if (fromname == "") { if (a.score) {fromname = '(Upgrade WatchTower)';} else {fromname = '(Unknown)';}}
			else {fromname = MonitorLink(a.fromPlayerId,fromname);}
		}
		
		icon = "";
		switch (marchType) {
			case 1: icon=TransportImage;hint="Transport";break;
			case 2: icon=ReinforceImage;hint="Reinforce";break;
			case 3: icon=ScoutImage;hint="Scout";break;
			case 4: icon=AttackImage;hint="Attack";break;
			case 5: icon=ReassignImage;hint="Reassign";break;
		} 
		if(icon=="")continue; // tampermonkey fix
		
		incomingfiltered = true;	

		if (popInc || (popDef && Options.AttackState && AttackShow )) {
			if (local_atkinc["m"+marchId].btIncomplete == true) { // do this here in case march used in city view
				if (local_atkinc["m"+marchId].btRequestSent > 0) {
					local_atkinc["m"+marchId].btRequestSent = local_atkinc["m"+marchId].btRequestSent - 1;
				}
				else {
					UpdateIncomingMarch(marchId); 
				}	
			}
		}	
		
		/* Apply Filters */

		/* marchType 1 : Transport */
		/* marchType 2 : Reinforce */
		/* marchType 3 : Scout */
		/* marchType 4 : Attack (or score <> 0) */
		/* marchType 5 : Reassign */
	
		if ((marchType == 1) && !Options.IncTransport) continue;
		if ((marchType == 2) && !Options.IncReinforce) continue;
		if ((marchType == 5) && !Options.IncReassign) continue;
		
		if ((marchType == 3) && !Options.IncScout) continue;
		if (((marchType == 4) || (!marchType && marchScore)) && !Options.IncAttack) continue;
		
		if ((targetcity == "Wilderness") && !Options.IncWilds) continue;
		if ((fromname == "Yourself") && !Options.IncYours) continue;
	
		incomingshow = true;
		r=r+1;
		rowClass = 'evenRow';		
		var rem = (r % 2);
		if (rem == 1) rowClass = 'oddRow';		

		z += '<tr class="'+rowClass+'"><TD class=xtab><img src='+icon+' title='+hint+'></td>';
		z += '<TD class=xtab id="marchtime'+marchId+'">&nbsp;</td>';
		z += '<TD class=xtabBR>';
		if (targetcity != "") z += '<span class=xtab>'+targetcity+'</span> ';
		if (targetcoords != "") z += '<span class=xtab>'+targetcoords+'</span>';
		z += '</td>';
		z += '<TD class=xtabBR><span class=xtab>'+fromname+'</span> ';
		if (fromcoords != "") { z+= '<span class=xtab>'+fromcoords+'</span>'; }
		z += '</td>';

		if (a.destinationUnixTime < unixTime() || marchStatus == 8)
			marchdir = "Return";
		else
			marchdir = "Count";	
		
		z += '<TD colspan=2 class=xtabBR>';
		if (marchType == 3 || marchType == 4){
			if ((safecall.indexOf(a.pid) < 0 || trusted) && a["championInfo"]) {
				marchchamp = "<table cellspacing=0><tr><td colspan=2><b>"+a["championInfo"].name+"</b></td></tr><tr><td colspan=2><b>Champion Stats</b></td></tr>";
				var gotchamp = false;
				if (a["championInfo"].effects[1] && !(a["championInfo"].effects[1] instanceof Array) && typeof(a["championInfo"].effects[1]) === "object") {
					got202 = false;
					for (cy in a["championInfo"].effects[1]) {
						// missing bonus damage?
						if ((cy == '202') && gotchamp) {got202 = true;}
						if ((cy == '203') && !got202) { marchchamp += "<tr><td>"+uW.g_js_strings.effects.name_202+"</td><td>0</td></tr>"; }
						str = eval('uW.g_js_strings.effects.name_'+cy);
						if (str && str!= "") {
							gotchamp = true;
							marchchamp += "<tr><td>"+str+"</td><td>"+a["championInfo"].effects[1][cy]+"</td></tr>";
						} else { break;	}
					}	
				}	
				if (!gotchamp) { marchchamp += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
				marchchamp+="<tr><td colspan=2><b>Troop Stats</b></td></tr>";
				var gottroop = false;
				if (a["championInfo"].effects[2] && !(a["championInfo"].effects[2] instanceof Array) && typeof(a["championInfo"].effects[2]) === "object") {
					for (ty in a["championInfo"].effects[2]) {
						str = eval('uW.g_js_strings.effects.name_'+ty);
						if (str && str!= "") {
							gottroop = true;
							marchchamp += "<tr><td>"+str+"</td><td>"+a["championInfo"].effects[2][ty]+"</td></tr>";
						} else { break;	}
					}	
				}	
				if (!gottroop) { marchchamp += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
				marchchamp+="</table>";
				z +='<table cellspacing=0><tr><td class="xtab trimg" style="font-weight:normal;align:left;" id="btmarchchamp'+a.mid+'td"><input type="hidden" id="btmarchchamp'+a.mid+'effects" value="'+marchchamp+'" /><a><img id="btmarchchamp'+a.mid+'" onMouseover="btCreateChampionPopUp(this,'+a.toCityId+');" height=14 style="vertical-align:text-top;" src="'+ShieldImage+'"></a></td><td class=xtab>Champion: '+a["championInfo"].name+'&nbsp;</td></tr></table>';
			}	
			if (a["knt"]) z +='<span class=xtab>'+uW.g_js_strings.commonstr.knight+' (Atk:'+ a["knt"]["cbt"]+')</span> ';
			if (a["unts"]) { 
				for (var ui in uW.cm.UNIT_TYPES){
					i = uW.cm.UNIT_TYPES[ui];
					if (a["unts"]["u"+i]) {
						if (a["unts"]["u"+i] > 0) z += '<span class=xtab>'+ uW.unitcost['unt'+i][0] +': '+ addCommas(a["unts"]["u"+i])+'</span> ';
						else z += '<span class=xtab>'+ a["unts"]["u"+i]+' '+ uW.unitcost['unt'+i][0] +'</span> ';
					}
				}
			}
			else
			{
				if (a["cnt"]) { z += '<span class=xtab>'+a["cnt"]+'</span> ';}
				else { z += '<span class=xtab>(Upgrade WatchTower)</span> '; }
			}
		}
		else
		{
			if (a["knightId"] > 0) z +='<span class=xtab>'+uW.g_js_strings.commonstr.knight+' (Atk:'+ a["knightCombat"]+')</span> ';
			for (var ui in uW.cm.UNIT_TYPES){
				i = uW.cm.UNIT_TYPES[ui];
				if(a["unit"+i+marchdir] > 0) z += '<span class=xtab>'+ uW.unitcost['unt'+i][0] +': '+ addCommas(a["unit"+i+marchdir])+'</span> ';
			}	
		}

		if (local_atkinc["m"+marchId]["fromSpellType"]) {
			var spell = eval('uW.g_js_strings.spells.name_'+local_atkinc["m"+marchId]["fromSpellType"]);
			if (spell) {
				var spellstyle = 'color:#808;';
				z +='<br><span class=xtab style="'+spellstyle+'"><b>*&nbsp;'+spell+'&nbsp;*</b></span>'
			}
		}

		if (Options.IncResources) {
			if ((a["gold"] > 0) || (a["resource1"] > 0) || (a["resource2"] > 0) || (a["resource3"] > 0) || (a["resource4"] > 0) || (local_atkinc["m"+marchId]["resource5"] > 0)) {
				z+="<br>";
			}
		
			if (a["gold"] > 0) z += '<span class=xtab>'+ResourceImage(GoldImage,"Gold") + addCommas(a["gold"]) +'</span> ';
			if (a["resource1"] > 0) z += '<span class=xtab>'+ResourceImage(FoodImage,"Food") + addCommas(a["resource1"]) +'</span> ';
			if (a["resource2"] > 0) z += '<span class=xtab>'+ResourceImage(WoodImage,"Wood") + addCommas(a["resource2"]) +'</span> ';
			if (a["resource3"] > 0) z += '<span class=xtab>'+ResourceImage(StoneImage,"Stone") + addCommas(a["resource3"]) +'</span> ';
			if (a["resource4"] > 0) z += '<span class=xtab>'+ResourceImage(OreImage,"Ore") + addCommas(a["resource4"]) +'</span> ';
			if (local_atkinc["m"+marchId]["resource5"] > 0) z += '<span class=xtab>'+ResourceImage(AetherImage,"Aether") + addCommas(local_atkinc["m"+marchId]["resource5"]) +'</span> ';
		}
		
		z += '</td></tr>';
    }
  
	if (!incomingshow) {
		if (!incomingfiltered)
			z += '<tr><td colspan=6 class=xtab><div align="center"><br><br>No incoming marches</div></td></tr>';
		else
			z += '<tr><td colspan=6 class=xtab><div align="center"><br><br>No incoming marches matching search parameters</div></td></tr>';
	}

	z += '</table></div><br>';

	if (popInc) {
		if (CheckForHTMLChange('btIncomingMain',z)) {
			if (Options.RefreshSeed) uW.jQuery('#btRefreshSeedInc').addClass("disabled");
			else document.getElementById('btRefreshSeedInc').addEventListener ('click', function() {setTimeout(function() {RefreshSeed();},250);}, false);
			ResetFrameSize('btIncoming',200,720);
		}	
		for (var m in inctimes) {
			mt = inctimes[m];
			if (document.getElementById('marchtime'+m)) {
				document.getElementById('marchtime'+m).innerHTML = mt;
			}	
		}
	}
	else {
		ResetHTMLRegister('btIncomingMain');
	}

}

/*********************** OUTGOING MARCHES **********************/

function ToggleOutgoingMarches (){

	if (popOut) {
      Options.OutgoingStartState = popOut.toggleHide(popOut)
	}
	else
	{
		m = '<div id="btOutgoing_content"><div id=btOutgoingButtons align="center"><TABLE width="100%"><tr>';
		m += '<td align="right" class=xtab>Attack</td><TD class=xtab><INPUT id=OutAttackChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Scout</td><TD class=xtab><INPUT id=OutScoutChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Reinforce</td><TD class=xtab><INPUT id=OutReinforceChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Reassign</td><TD class=xtab><INPUT id=OutReassignChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Transport</td><TD class=xtab><INPUT id=OutTransportChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Returning</td><TD class=xtab><INPUT id=OutReturningChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>To You</td><TD class=xtab><INPUT id=OutYoursChk type=checkbox /></td>';
		m += '<td align="right" class=xtab>Resources</td><TD class=xtab><INPUT id=OutResChk type=checkbox /></td>';
		m += '</tr></table></div><div style="max-height:700px; overflow-y:scroll" id=btOutgoingMain></div><br></div>';

		popOut = new CPopup('btOutgoing', Options.OutPos.x, Options.OutPos.y, 720, 200, true, function (){Options.OutgoingStartState = false;Options.OutPos = popOut.getLocation();saveOptions();popOut=null;});
		popOut.getMainDiv().innerHTML = m;
		popOut.getTopDiv().innerHTML = '<DIV align=center><B>&nbsp;&nbsp;&nbsp;Outgoing Marches</B></DIV>';

		ToggleOption('OutAttackChk','OutAttack');
		ToggleOption('OutScoutChk','OutScout');
		ToggleOption('OutReinforceChk','OutReinforce');
		ToggleOption('OutReassignChk','OutReassign');
		ToggleOption('OutTransportChk','OutTransport');
		ToggleOption('OutReturningChk','OutReturning');
		ToggleOption('OutYoursChk','OutYours');
		ToggleOption('OutResChk','OutResources');

		popOut.show(true);
		Options.OutgoingStartState = true;
	}
	saveOptions ();
}

function BuildOutgoingDisplay() {

	var z = '';
	var r = 0;
	var outgoingshow = false;
	var outgoingfiltered = false;
	var outtimes = {};

	var bclass = "brown11";
    if (RefreshingSeed || Options.RefreshSeed) bclass += " disabled";
  
	var z = '<div align="center"><TABLE cellSpacing=0 width=98% height=0%><tr><td width="18" class="xtabHD">&nbsp;</td><td width="60" class="xtabHD"><b>Time</b></td><td width="120" class="xtabHD"><b>From</b></td><td width="120" class="xtabHD"><b>Target</b></td><td class="xtabHD"><b>Troops</b></td><td class="xtabHD" align="right"><a id=btRefreshSeedOut class="inlineButton btButton '+bclass+'"><span>Refresh</span></a></td></tr>';

	var UpdateRequired = false;
	
	for(n in out) {
		var a = out[n];//logit(JSON2.stringify(a));

		/* marchType 1 : Transport */
		/* marchType 2 : Reinforce */
		/* marchType 3 : Scout */
		/* marchType 4 : Attack */
		/* marchType 5 : Reassign */

		/* marchStatus 1 : Marching */
		/* marchStatus 2 : Encamped */
		/* marchStatus 8 : Returning */
		/* marchStatus 5 : ??? Client-generated? Pain in the ass! */
		
		var icon, hint, marchtime, fromcity, totile, tocity, toname, marchdir, tocoords;

		var marchId = a.marchId;
		var marchStatus = parseInt(a.marchStatus);
		var marchType = parseInt(a.marchType);
		if (marchType == 10) marchType=4; // Change Dark Forest type to Attack!
				
		var from = Cities.byID[a.marchCityId];if(!from)continue; // tampermonkey fix
		fromcity = CityLink(from);

		var now = unixTime();
		var destinationUnixTime = a["destinationUnixTime"] - now;
		var returnUnixTime = a["returnUnixTime"] - now;
		
		if ((returnUnixTime <= 0) && ((marchStatus == 8) || (marchStatus == 0))) continue; // never show returned march once completed

		if ((destinationUnixTime < 0) || (marchStatus == 8) || (marchStatus == 2))
			marchdir = "Return";
		else
			marchdir = "Count";	
		
		totile = "";
		tocity = "";
		toname = "";
		for (var i=0; i<Seed.cities.length;i++) {
			if (Seed.cities[i][2] == parseInt(a["toXCoord"]) && Seed.cities[i][3] == parseInt(a["toYCoord"])) {tocity = CityLink(Cities.byID[Seed.cities[i][0]]);break; }
		}
		if (tocity == "") {
			totile = tileTypes[parseInt(a["toTileType"])];
			if (a["toTileType"] == 51) {
				if (!a["toPlayerId"]) { totile = ""; }
				else { if (a["toPlayerId"] == 0) totile = 'Barb Camp'; }
			}	
			totile = 'Lvl '+a["toTileLevel"]+' '+totile;
		}

		if (a["toPlayerId"] && (a["toPlayerId"] != 0)) {
			if (a["toPlayerId"] == uW.tvuid) {
				if (tocity == 0) {toname = 'Yourself'}
			}	
			else {
				if (a.players && a.players['u'+a.toPlayerId]) {
					toname = MonitorLink(a.toPlayerId,a.players['u'+a.toPlayerId].n);
				}
				else {
					if (Seed.players['u'+a.toPlayerId]) {
						toname = MonitorLink(a.toPlayerId,Seed.players['u'+a.toPlayerId].n);
					}
				}
				if (toname == "") { updatePlayers (a.toPlayerId); } // let's fix it!
			}
		}

		var iconType = marchType;
		
		if (destinationUnixTime >= 0) {
			if (destinationUnixTime < (60)) { marchtime = '<span style="color:#f00">'+uW.timestr(destinationUnixTime)+'</span>'; }
			else { marchtime = uW.timestr(destinationUnixTime); }	
		}	
		else {
			if (marchStatus == 2) {
				marchtime = 'Encamped';
				iconType = 102;
			}
			else {
				if (marchStatus == 8) {
					marchtime = uW.timestr(returnUnixTime);
					iconType = 8;
				}
				else {
					local_atkp["m"+marchId].btIncomplete = true; // force a march refresh
					marchtime = "Waiting";
					iconType = 102;
				}	
			}
		}

		outtimes[marchId] = marchtime;

		if (!a.toXCoord || (tocity != "")) {tocoords = "";}
        else {tocoords = coordLink(a.toXCoord,a.toYCoord);}

		hint = "";
		switch (marchType) {
			case 1: hint=uW.g_js_strings.commonstr.transport;break;
			case 2: hint=uW.g_js_strings.commonstr.reinforce;break;
			case 3: hint=uW.g_js_strings.commonstr.scout;break;
			case 4: hint=uW.g_js_strings.commonstr.attack;break;
			case 5: hint=uW.g_js_strings.commonstr.reassign;break;
		} 
		
		switch (iconType) {
			case 1: icon=TransportImage;break;
			case 2: icon=ReinforceImage;break;
			case 3: icon=ScoutImage;break;
			case 4: icon=AttackImage;break;
			case 5: icon=ReassignImage;break;
			case 8: icon=ReturnImage;break;
			case 102: icon=ReinforceImage;break;
		} 
		hint="("+marchId+")";
		
		outgoingfiltered = true;	

		if (popOut || (popDef && Options.CityAttackState && CityAttackShow)) {
			if (local_atkp["m"+marchId].btIncomplete == true) { // do this here in case march used in city view
				if (local_atkp["m"+marchId].btRequestSent > 0) {
					local_atkp["m"+marchId].btRequestSent = local_atkp["m"+marchId].btRequestSent - 1;
				}
				else {
					UpdateMarch(a.marchCityId,marchId); 
				}	
			}
		}	
		
		/* Apply Filters */

		if ((marchType == 1) && !Options.OutTransport) continue;
		if ((marchType == 2) && !Options.OutReinforce) continue;
		if ((marchType == 5) && !Options.OutReassign) continue;
		
		if ((marchType == 3) && !Options.OutScout) continue;
		if ((marchType == 4) && !Options.OutAttack) continue;
		
		if (((marchdir == "Return") && (marchStatus != 2) && (marchtime != "Waiting")) && !Options.OutReturning) continue;
		if (((toname == "Yourself") || (tocity != 0)) && !Options.OutYours) continue;
	
		outgoingshow = true;
		r=r+1;
		rowClass = 'evenRow';		
		var rem = (r % 2);
		if (rem == 1) rowClass = 'oddRow';		

		z += '<tr class="'+rowClass+'"><TD class=xtab><a id="btRecall'+a.marchId+'" onclick="btRecall('+ a.marchId +')"><img src='+icon+' title='+hint+'></a></td>';
		z += '<TD class=xtab id="marchtime'+marchId+'">&nbsp;</td>';
		z += '<TD class=xtabBR>';
		if (fromcity != "") z += '<span class=xtab>'+fromcity+'</span> ';
		z += '</td><TD class=xtabBR>';
		if (toname != "") { z+= '<span class=xtab>'+toname+'</span> '; }
		if (totile != "") { z+= '<span class=xtab>'+totile+'</span> '; }
		if (tocity != "") { z+= '<span class=xtab>'+tocity+'</span> '; }
		if (tocoords != "") { z+= '<span class=xtab>'+tocoords+'</span>'; }
		z += '</td>';

		z += '<TD colspan=2 class=xtabBR>';

		if (a["championInfo"]) { // stats here are sort of obsolete, because it uses city champ data, but kept in for completeness...
			marchchamp = "<table cellspacing=0><tr><td colspan=2><b>"+a["championInfo"].name+"</b></td></tr><tr><td colspan=2><b>Champion Stats</b></td></tr>";
			var gotchamp = false;
			if (a["championInfo"].effects) {
				if (a["championInfo"].effects[1] && !(a["championInfo"].effects[1] instanceof Array) && typeof(a["championInfo"].effects[1]) === "object") {
					got202 = false;
					for (cy in a["championInfo"].effects[1]) {
						// missing bonus damage?
						if ((cy == '202') && gotchamp) {got202 = true;}
						if ((cy == '203') && !got202) { marchchamp += "<tr><td>"+uW.g_js_strings.effects.name_202+"</td><td>0</td></tr>"; }
						str = eval('uW.g_js_strings.effects.name_'+cy);
						if (str && str!= "") {
							gotchamp = true;
							marchchamp += "<tr><td>"+str+"</td><td>"+a["championInfo"].effects[1][cy]+"</td></tr>";
						} else { break;	}
					}	
				}	
				if (!gotchamp) { marchchamp += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
				marchchamp+="<tr><td colspan=2><b>Troop Stats</b></td></tr>";
				var gottroop = false;
				if (a["championInfo"].effects[2] && !(a["championInfo"].effects[2] instanceof Array) && typeof(a["championInfo"].effects[2]) === "object") {
					for (ty in a["championInfo"].effects[2]) {
						str = eval('uW.g_js_strings.effects.name_'+ty);
						if (str && str!= "") {
							gottroop = true;
							marchchamp += "<tr><td>"+str+"</td><td>"+a["championInfo"].effects[2][ty]+"</td></tr>";
						} else { break;	}
					}	
				}	
				if (!gottroop) { marchchamp += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
				marchchamp+="</table>";
			}	
			z +='<table cellspacing=0><tr><td class="xtab trimg" style="font-weight:normal;align:left;" id="btoutmarchchamp'+a.marchId+'td"><input type="hidden" id="btoutmarchchamp'+a.marchId+'effects" value="'+marchchamp+'" /><a><img id="btoutmarchchamp'+a.marchId+'" onMouseover="btCreateChampionPopUp(this,'+a.fromCityId+',true);" height=14 style="vertical-align:text-top;" src="'+ShieldImage+'"></a></td><td class=xtab>Champion: '+a["championInfo"].name+'&nbsp;</td></tr></table>';
		}
		if ((a["knightId"] > 0) && (!a["knightCombat"])) {
			for (i in Seed.knights["city"+a.marchCityId]) {
				if (i == ("knt" + a["knightId"])) {
					Combat = Seed.knights["city"+a.marchCityId][i]["combat"];
					if (Seed.knights["city"+a.marchCityId][i]["combatBoostExpireUnixtime"] > unixTime()) {	Combat *= 1.25;	}	
					a["knightCombat"] = Combat;
				}
			}
		}

		if (a.btIncomplete == true) {marchdir = "Count";	} // no return info yet
		if (a["knightId"] > 0) z +='<span class=xtab>'+uW.g_js_strings.commonstr.knight+' (Atk:'+ a["knightCombat"]+')</span> ';
		for (var ui in uW.cm.UNIT_TYPES){
			i = uW.cm.UNIT_TYPES[ui];
			if((a["unit"+i+"Count"] > 0) || (a["unit"+i+"Return"] > 0)) {
				trpcol = '#000';
				if ((marchdir == "Return") && (a["unit"+i+"Return"] < a["unit"+i+"Count"])) { trpcol = '#f00'; }
				z += '<span class=xtab>'+ uW.unitcost['unt'+i][0] +': <span class=xtab style="color:'+trpcol+'">'+ addCommas(a["unit"+i+marchdir])+'</span></span> ';
			}	
		}	

		if (a["fromSpellType"]) {
			var spell = eval('uW.g_js_strings.spells.name_'+a["fromSpellType"]);
			if (spell) {
				var spellstyle = 'color:#808;';
				z +='<br><span class=xtab style="'+spellstyle+'"><b>*&nbsp;'+spell+'&nbsp;*</b></span>'
			}
		}
		
		if (Options.OutResources) {
			if ((a["gold"] > 0) || (a["resource1"] > 0) || (a["resource2"] > 0) || (a["resource3"] > 0) || (a["resource4"] > 0) || (a["resource5"] > 0)) {
				z+="<br>";
			}

			if (a["gold"] > 0) z += '<span class=xtab>'+ResourceImage(GoldImage,"Gold") + addCommas(a["gold"]) +'</span> ';
			if (a["resource1"] > 0) z += '<span class=xtab>'+ResourceImage(FoodImage,"Food") + addCommas(a["resource1"]) +'</span> ';
			if (a["resource2"] > 0) z += '<span class=xtab>'+ResourceImage(WoodImage,"Wood") + addCommas(a["resource2"]) +'</span> ';
			if (a["resource3"] > 0) z += '<span class=xtab>'+ResourceImage(StoneImage,"Stone") + addCommas(a["resource3"]) +'</span> ';
			if (a["resource4"] > 0) z += '<span class=xtab>'+ResourceImage(OreImage,"Ore") + addCommas(a["resource4"]) +'</span> ';
			if (a["resource5"] > 0) z += '<span class=xtab>'+ResourceImage(AetherImage,"Aether") + addCommas(a["resource5"]) +'</span> ';
		}
		
		z += '</td></tr>';
    }
	
	if (!outgoingshow) {
		if (!outgoingfiltered)
			z += '<tr><td colspan=6 class=xtab><div align="center"><br><br>No outgoing marches</div></td></tr>';
		else
			z += '<tr><td colspan=6 class=xtab><div align="center"><br><br>No outgoing marches matching search parameters</div></td></tr>';
	}

	z += '<tr><td class=xtab colspan="6"><div class="ErrText" align="center" id=btOutErr>&nbsp;</div></td></tr></table></div><br>';

	if (popOut) {
		if (CheckForHTMLChange('btOutgoingMain',z)) {
			if (Options.RefreshSeed) uW.jQuery('#btRefreshSeedOut').addClass("disabled");
			else document.getElementById('btRefreshSeedOut').addEventListener ('click', function() {setTimeout(function() {RefreshSeed();},250);}, false);
			ResetFrameSize('btOutgoing',200,720);
		}	
		for (var m in outtimes) {
			mt = outtimes[m];
			if (document.getElementById('marchtime'+m)) {
				document.getElementById('marchtime'+m).innerHTML = mt;
			}	
		}
	}
	else {
		ResetHTMLRegister('btOutgoingMain');
	}
}

function UpdateMarch (cityId,marchId) {
	local_atkp["m"+marchId].btRequestSent = 2; // delay any further requests for 2 seconds
	var params = uW.Object.clone(uW.g_ajaxparams);
	params.rid = marchId;
	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMarch.php" + unsafeWindow.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		onSuccess: function (rslt) {
			if (local_atkp["m"+rslt.march.marchId]) {
				for (y in rslt.march) {
					local_atkp["m"+rslt.march.marchId][y] = rslt.march[y];
				}	
				local_atkp["m"+rslt.march.marchId].btIncomplete = false;
				// champion on march?
				if (rslt.march.championId && (rslt.march.championId != 0) && !local_atkp["m"+rslt.march.marchId].championInfo) {
					for (y in Seed.champion.champions) {
						if (Seed.champion.champions[y].championId == rslt.march.championId) {
							marchChamp = {};
							marchChamp.name = Seed.champion.champions[y].name; // lazy. We'll use city stats to show champ data
							local_atkp["m"+rslt.march.marchId].championInfo = marchChamp;			
							break;
						}	
					}
				}
				if (rslt.march.toPlayerId && (rslt.march.toPlayerId != 0) && !Seed.players["u"+rslt.march.toPlayerId]) {
					updatePlayers(rslt.march.toPlayerId);
				}
			}
		},
		onFailure: function (rslt) {
			local_atkp["m"+marchId].btRequestSent = 0; // try again
		}
    },true); // no retry			
}

function UpdateIncomingMarch (marchId) {
	local_atkinc["m"+marchId].btRequestSent = 2; // delay any further requests for 2 seconds
	var params = uW.Object.clone(uW.g_ajaxparams);
	params.rid = marchId;
	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMarch.php" + unsafeWindow.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		onSuccess: function (rslt) {
			if (local_atkinc["m"+rslt.march.marchId]) {
				for (y in rslt.march) {
					local_atkinc["m"+rslt.march.marchId][y] = rslt.march[y];
				}	
				local_atkinc["m"+rslt.march.marchId].btIncomplete = false;
			}
		},
		onFailure: function (rslt) {
			local_atkinc["m"+marchId].btRequestSent = 0; // try again
		}
    },true); // no retry			
}

function updatePlayers (uid){
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.uid = uid;
    new uW.Ajax.Request(uW.g_ajaxpath + "ajax/getUserGeneralInfo.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
		rsltInfo = eval("(" + rslt.responseText + ")");
	    if (!rsltInfo.ok) { return; }	
		NewPlayer = {};
		NewPlayer.n = rsltInfo.userInfo[0].name;
		NewPlayer.t = rsltInfo.userInfo[0].title;
		NewPlayer.m = rsltInfo.userInfo[0].might;
		NewPlayer.a = rsltInfo.userInfo[0].allianceId;
		Seed.players["u"+uid] = NewPlayer;
      },
      onFailure: function (rslt) { },
    });
}

function Recall (marchId,cityview) {
	setOutError('&nbsp;',cityview);
	
	var ajaxtype = 'undefend';
	var params = uW.Object.clone(uW.g_ajaxparams);
	for (k in out) {
		if (out[k].marchId == marchId) {
			params.cid = out[k].marchCityId;
			if (out[k].marchStatus != 2) {
				ajaxtype = 'cancelMarch';
			}
			break;
		}	    
    }    
	params.mid = marchId;
	new MyAjaxRequest(uW.g_ajaxpath + "ajax/"+ajaxtype+".php" + uW.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		onSuccess: function (rslt) {
			if (rslt.ok){
				var march = uW.seed.queue_atkp["city" + params.cid]["m" + params.mid];
				march.marchStatus = 8;
				var marchtime = parseInt(march.returnUnixTime) - parseInt(march.destinationUnixTime);
				var ut = unixTime();
				if (uW.seed.playerEffects.returnExpire > unixTime())
					marchtime *= 0.5
				march.returnUnixTime = ut + marchtime;
				march.destinationUnixTime = ut;
				march.marchUnixTime = ut - marchtime;
				if (rslt.updateSeed) {
					uW.update_seed(rslt.updateSeed)
                }
				setOutError('March Recalled',cityview);
			}
			else {
				if (rslt.error_code == 253)
					setOutError(uW.g_js_strings.recall.error,cityview);
				else
					setOutError('Unable to recall march',cityview);
			}
		},
		onFailure: function () {
			setOutError('Unable to recall march',cityview);
        },
    });
};

function setOutError(msg,cityview) {
	if (cityview == true)
		document.getElementById('btCityOutErr').innerHTML = msg;
	else
		document.getElementById('btOutErr').innerHTML = msg;
}

function getCityBuilding (cityId, buildingId){
	var b = Seed.buildings['city'+cityId];
	var ret = {count:0, maxLevel:0};
	for( var k in b){
		if(b[k] && b[k][0] == buildingId){
			++ret.count;
			if(parseInt(b[k][1]) > ret.maxLevel)
				ret.maxLevel = parseInt(b[k][1]);
		}
	}
	return ret;
}

function ToggleCityDefence (Curr){
	
	if (popDef) {
      Options.DefenceStartState = popDef.toggleHide(popDef)
	}
	else
	{
		HTMLRegister = {}; // reset everything!

		// build up from Default Dashboard
		
		var order = [];
		
		for (p in DefaultDashboard) {
			var NewObj = {};
			if (Options.OverrideDashboard[p]) {
				NewObj.Display = Options.OverrideDashboard[p].Display;
				NewObj.Sequence = Options.OverrideDashboard[p].Sequence;
			}
			else {
				NewObj.Display = DefaultDashboard[p].Display;
				NewObj.Sequence = DefaultDashboard[p].Sequence;
			}
			NewObj["name"] = p;
			order.push(NewObj);
		}
		order.sort(function(a, b){ return a.Sequence-b.Sequence });
		
		m = '<div id="btDefence_content"><div><table width="100%"><tr><td class=xtab align="right"><b>City : </b></td><td class=xtab><span id=btCastlesContainer></span></td><td class=xtab align="right"><span id="btCityAlert">&nbsp;</span></td></tr>';
		m += '<tr><td class=xtab colspan="2"><div id=btItems>&nbsp;</div></td><td class=xtab align="right"><a id=btRefreshSeed class="inlineButton btButton blue14"><span>Refresh</span></a>&nbsp;<span id=btAutoSpan class="divHide"><a id=btAutoRefresh class="inlineButton btButton blue14"><span style="width:30px;display:inline-block;text-align:center;">Auto</span></a></span></td></tr></table></div>';
		
		for (p in order) {
			if (order[p].name == 'Overview') {
				m += '<div id=btStatusHeader><div class="divHeader" align="right"><a id=btStatusLink class=divLink >OVERVIEW&nbsp;<img id=btStatusArrow height="10" src="'+RightArrow+'"></a></div>';
				m += '<div id=btStatus align=center class="divHide"><TABLE width="96%"><tr><td class=xtab align="center" id=btStatusCell></td></tr>';
				m += '</table></div></div>';
				OverviewShow = order[p].Display;
			}	

			if (order[p].name == 'Sacrifices') {
				m += '<div id=btSacrificeHeader><div class="divHeader" align="right"><a id=btSacrificeLink class=divLink >SACRIFICES&nbsp;<img id=btSacrificeArrow height="10" src="'+RightArrow+'"></a></div>';
				m += '<div id=btSacrifice align=center class="divHide"><TABLE width="96%"><tr><td class=xtab align=center id=btSacrificeCell></td></tr><tr><td class=xtab align=center>';
				m += '<div id=btNewSacrificeCell align="center" class="divHide">&nbsp;</div></td></tr>';
				m += '</table></div></div>';
				SacrificeShow = order[p].Display;
			}
			
			if (order[p].name == 'Troops') {
				m += '<div id=btTroopHeader><div class="divHeader" align="right"><a id=btTroopLink class=divLink >TROOPS&nbsp;<img id=btTroopArrow height="10" src="'+RightArrow+'"></a></div>';
				m += '<div id=btTroop align=center class=divHide><TABLE width="96%"><tr><td class=xtabBR align=center id=btTroopCell></td></tr><tr><td class=xtab align=center>';
				m += '<div id=btTroopAddCell align="center">&nbsp;</div></td></tr>';
				m += '</table></div></div>';
				TroopShow = order[p].Display;
			}	
		
			if (order[p].name == 'Reinforcements') {
				m += '<div id=btReinforceHeader><div class="divHeader" align="right"><a id=btReinforceLink class=divLink >REINFORCEMENTS&nbsp;<img id=btReinforceArrow height="10" src="'+RightArrow+'"></a></div>';
				m += '<div id=btReinforce align=center class=divHide><TABLE width="96%"><tr><td class=xtabBR align=center id=btReinforceCell></td></tr>';
				m += '</table></div></div>';
				ReinforceShow = order[p].Display;
			}	
		
			if (order[p].name == 'Fortifications') {
				m += '<div id=btWallDefenceHeader><div class="divHeader" align="right"><a id=btWallDefenceLink class=divLink >FORTIFICATIONS&nbsp;<img id=btWallDefenceArrow height="10" src="'+RightArrow+'"></a></div>';
				m += '<div id=btWallDefence align=center class=divHide><TABLE width="96%"><tr><td class=xtabBR align=center id=btWallDefenceCell></td></tr>';
				m += '</table></div></div>';
				FortificationShow = order[p].Display;
			}
			
			if (Options.EnableOutgoing) {
				if (order[p].name == 'Outgoing Attacks') {
					m += '<div id=btCityAttackHeader><div class="divHeader" align="right"><a id=btCityAttackLink class=divLink >OUTGOING ATTACKS&nbsp;<img id=btCityAttackArrow height="10" src="'+RightArrow+'"></a></div>';
					m += '<div id=btCityAttack align=center class=divHide><TABLE width="96%"><tr><td class=xtabBR align=center id=btCityAttackCell></td></tr>';
					m += '</table></div></div>';
					CityAttackShow = order[p].Display;
				}	
			}
			
			if (order[p].name == 'Incoming Attacks') {
				m += '<div id=btAttackHeader><div class="divHeader" align="right"><a id=btAttackLink class=divLink >INCOMING ATTACKS&nbsp;<img id=btAttackArrow height="10" src="'+RightArrow+'"></a></div>';
				m += '<div id=btAttack align=center class=divHide><TABLE width="96%"><tr><td class=xtabBR align=center id=btAttackCell></td></tr>';
				m += '</table></div></div><br>';
				AttackShow = order[p].Display;
			}
		}
		
		m += '</div>';

		popDef = new CPopup('btDefence', Options.DefPos.x, Options.DefPos.y, DashWidth, 100, (!Options.DashboardMode), function () {Options.DefenceStartState = false; Options.CurrentCity = -1; if (!Options.DashboardMode) {Options.DefPos = popDef.getLocation();} else {document.body.appendChild(popDef.div); popDef.destroy();} saveOptions(); popDef = null});
		
		if (Options.DashboardMode) {
			popDef.BASE_ZINDEX = 100410; // keep above throne room blackout curtain
			elem = document.getElementById('btDefence_outer');
			elem.style.left = '0px';
			elem.style.top = '0px';
			document.getElementById('btDashboard').appendChild(elem);
		}	
		
		popDef.getMainDiv().innerHTML = m;
		popDef.getTopDiv().innerHTML = '<DIV align=center><B>&nbsp;&nbsp;&nbsp;Battle Dashboard</B></DIV>';

		if (Curr < 0) {	Curr = Cities.byID[uW.currentcityid].idx;}
			
		Castles = new CdispCityPicker ('btCastles', document.getElementById('btCastlesContainer'), true, null, Curr);
		document.getElementById('btCastlesContainer').addEventListener ('click', function(){SetCurrentCity (Castles.city.id);} , false);
		document.getElementById('btStatusLink').addEventListener ('click', function () {ToggleDivDisplay("btDefence",100,DashWidth,"btStatus");Options.OverviewState = !(Options.OverviewState);saveOptions();}, false);
		document.getElementById('btSacrificeLink').addEventListener ('click', function () {ToggleDivDisplay("btDefence",100,DashWidth,"btSacrifice");Options.SacrificeState = !(Options.SacrificeState);saveOptions();}, false);
		document.getElementById('btTroopLink').addEventListener ('click', function () {ToggleDivDisplay("btDefence",100,DashWidth,"btTroop");Options.TroopState = !(Options.TroopState);saveOptions();}, false);
		document.getElementById('btWallDefenceLink').addEventListener ('click', function () {ToggleDivDisplay("btDefence",100,DashWidth,"btWallDefence");Options.FortificationState = !(Options.FortificationState);saveOptions();}, false);
		document.getElementById('btReinforceLink').addEventListener ('click', function () {ToggleDivDisplay("btDefence",100,DashWidth,"btReinforce");Options.ReinforceState = !(Options.ReinforceState);saveOptions();}, false);
		document.getElementById('btAttackLink').addEventListener ('click', function () {ToggleDivDisplay("btDefence",100,DashWidth,"btAttack");Options.AttackState = !(Options.AttackState);saveOptions();}, false);
		if (Options.EnableOutgoing) {
			document.getElementById('btCityAttackLink').addEventListener ('click', function () {ToggleDivDisplay("btDefence",100,DashWidth,"btCityAttack");Options.CityAttackState = !(Options.CityAttackState);saveOptions();}, false);
		}	

		if (Options.OverviewState) ToggleDivDisplay("btDefence",100,DashWidth,"btStatus");
		if (Options.SacrificeState) ToggleDivDisplay("btDefence",100,DashWidth,"btSacrifice");
		if (Options.TroopState) ToggleDivDisplay("btDefence",100,DashWidth,"btTroop");
		if (Options.ReinforceState) ToggleDivDisplay("btDefence",100,DashWidth,"btReinforce");
		if (Options.FortificationState) ToggleDivDisplay("btDefence",100,DashWidth,"btWallDefence");
		if (Options.AttackState) ToggleDivDisplay("btDefence",100,DashWidth,"btAttack");
		if (Options.EnableOutgoing) {
			if (Options.CityAttackState) ToggleDivDisplay("btDefence",100,DashWidth,"btCityAttack");
		}	
		
		document.getElementById('btRefreshSeed').addEventListener ('click', function() {setTimeout(function() { SetCurrentCity (Castles.city.id); RefreshSeed();},250);}, false);
		document.getElementById('btAutoRefresh').addEventListener ('click', function() {ToggleAutoRefresh();}, false);
		if (Options.RefreshSeed) {
			uW.jQuery('#btRefreshSeed').addClass("disabled");
			uW.jQuery('#btAutoRefresh').addClass("red14");
			uW.jQuery('#btAutoRefresh').removeClass("blue14");
			document.getElementById('btAutoRefresh').innerHTML = '<span style="width:30px;display:inline-block;text-align:center;">Off</span>';
		}
		if (trusted) uW.jQuery('#btAutoSpan').removeClass("divHide");
		
        SetCurrentCity(Seed.cities[Curr][0]);
		
		popDef.show(true);
		ResetFrameSize('btDefence',100,DashWidth);
		Options.DefenceStartState = true;
	}
	setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error
}

function ToggleAutoRefresh() {
	Options.RefreshSeed = !Options.RefreshSeed;
	if (Options.RefreshSeed) {
		uW.jQuery('#btRefreshSeed').addClass("disabled");
		uW.jQuery('#btAutoRefresh').addClass("red14");
		uW.jQuery('#btAutoRefresh').removeClass("blue14");
		document.getElementById('btAutoRefresh').innerHTML = '<span style="width:30px;display:inline-block;text-align:center;">Off</span>';
	}
	else {
		uW.jQuery('#btRefreshSeed').removeClass("disabled");
		uW.jQuery('#btAutoRefresh').removeClass("red14");
		uW.jQuery('#btAutoRefresh').addClass("blue14");
		document.getElementById('btAutoRefresh').innerHTML = '<span style="width:30px;display:inline-block;text-align:center;">Auto</span>';
	}
	saveOptions ();
}

function CheckForHTMLChange(div,newHTML,wait) {
	var oldHTML = HTMLRegister[div];
	if (!wait && (oldHTML != newHTML)) {
		document.getElementById(div).innerHTML = newHTML;
		HTMLRegister[div] = newHTML;
		return true;
	}  
	return false;
}

function ResetHTMLRegister(div) {
	HTMLRegister[div] = '';
}

function SetCurrentCity(cityId) {
	serverwait = false;
	ExpandMarshall = false;
	ExpandChampion = false;

	CurrentCityId = cityId;

	Curr = Cities.byID[cityId].idx;
	Options.CurrentCity = Curr;
	setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error

	uW.Modal.hideModal();
	
	if (uW.currentcityid != cityId) {
		var l = document.getElementById("citysel_" + (Curr + 1));
		if (l) uW.citysel_click(l);
		else {setTimeout(function () {SetCurrentCity(cityId)},1000); return false;}
	}	

// refresh sacrifice info

	var b = getCityBuilding(cityId, 25);
	if (b.count > 0) {
		SacSettings = (b.count <= 1) ? uW.cm.WorldSettings.getSettingAsObject("ASCENSION_SACRIFICE_ONE_ALTER_BUFF") : uW.cm.WorldSettings.getSettingAsObject("ASCENSION_SACRIFICE_TWO_ALTER_BUFF");
		SacSettings = SacSettings[b.maxLevel];

		DarkRitual          = uW.cm.BlessingSystemModel.applyBlessing(uW.cm.BlessingSystemModel.getBlessing().DARK_RITUAL);
		SacSpeedBuff        = uW.cm.BlessingSystemModel.applyBlessing(uW.cm.BlessingSystemModel.getBlessing().CHANNELED_SUFFERING);
		ChannelledSuffering = (SacSpeedBuff != 1);

		SacAllowed   = DarkRitual ? 2 : 1;
		SacSpeed     = uW.cm.WorldSettings.getSettingAsNumber("ASCENSION_SACRIFICE_TROOPS_PER_SEC");

		var l = b.maxLevel;
		var o = [];
		var	i = uW.cm.WorldSettings.getSettingAsObject("ASCENSION_SACRIFICE_ALTAR_LEVEL_UNLOCKS");
		for (var x=1;x<=l;x++) {
			oo = i[x].troops.split(",");
			for (y in oo) {
				o.push(oo[y]); // contains array of troop types this city is allowed to sacrifice :)
			}	
		}

		m = '<TABLE cellSpacing=0 width=100% height=0%>';
		m += '<tr><TD width="120" class=xtabBR><span class=xtab>';
		m += '<SELECT class="btSelector" id="btRitualTroops" onchange="btSelectTroopType(this);"><option value="0">--Troop Type--</option>';
		QuickSacString = "";
		for (y in uW.unitcost) {
			var TroopAllowed = (o.indexOf(y.substr(3)) >= 0);
			var DefendingTroops = 0;
			if (SelectiveDefending) { DefendingTroops = parseIntNan(Seed.defunits['city' + Seed.cities[Curr][0]]['unt'+y.substr(3)]); }
			var tot = parseIntNan(Seed.units['city' + Seed.cities[Curr][0]]['unt'+y.substr(3)])+DefendingTroops;
			if ((tot > 0) && TroopAllowed) {
				if (DefendingTroops != 0) { m +='<option style="font-weight:bold;" value="'+y.substr(3)+'">'+uW.unitcost[y][0]+'</option>'; }
				else { m +='<option value="'+y.substr(3)+'">'+uW.unitcost[y][0]+'</option>'; }
				QuickSacString = QuickSacString + '<a class="TextLink" onclick="btQuickSacrifice('+y.substr(3)+');">'+TroopImage(y.substr(3))+'</a>';
			}	
		}
		m +='</select></span></td>';
		m +='<td class=xtab><INPUT class="btInput" id="btRitualAmount" type=text size=7 maxlength=7 value="" onkeyup="btSetRitualLength(this)"><span id="btTotalTroops"></span></td><td align=right class=xtab><span id="btMaxTroops"></span></td>';
		m +='<td width="80" class=xtab><INPUT class="btInput" style="width: 30px;text-align:right;" id="btRitualMinutes" type=text maxlength=4 value="" onkeyup="btSetRitualLength(this)">&nbsp;m&nbsp;';
		m +='<INPUT class="btInput" style="width: 15px;text-align:right;" id="btRitualSeconds" type=text maxlength=2 value="" onkeyup="btSetRitualLength(this)">&nbsp;s&nbsp;</td>';
		m +='<td width="90" align=right class=xtab><a id="btStartRitualButton" class="inlineButton btButton blue14" onclick="btStartRitual()"><span style="width:65px;display:inline-block;text-align:center;" align="center">Sacrifice</span></a></td></tr>';
		m += '<tr><td class=xtab colspan="5"><div class="ErrText" align="center" id=btSacErr>&nbsp;</div></td></tr>';
		m += '</table>';
		document.getElementById('btNewSacrificeCell').innerHTML = m;
	}	

// refresh troop add defenders cell

	if (SelectiveDefending) {
		DefOptionsString = "";
		m = '<TABLE cellSpacing=0 width=100% height=0%><tr><TD colspan=3 class=xtabHD>Assign Defenders</td><TD width="100" align=right class=xtabHD><a id="btSelectDefendButton" class="inlineButton btButton blue14" onclick="cm.CastleController.openSelectDefendingTroops();"><span style="width:85px;display:inline-block;text-align:center;" align="center">Select Troops</span></a></td></tr>';
		m +='<tr id=btDefAddTroopRow><TD width="120" class=xtabBR><span class=xtab>';
		m +='<SELECT class="btSelector" id="btDefendTroops" onchange="btSelectDefTroopType(this);"><option value="0">--Troop Type--</option>';
		for (y in uW.unitcost) {
			var tot = parseIntNan(Seed.units['city' + Seed.cities[Curr][0]]['unt'+y.substr(3)]);
			if ((tot > 0)) {
				m +='<option value="'+y.substr(3)+'">'+uW.unitcost[y][0]+'</option>';
				DefOptionsString = DefOptionsString + y.substr(3);
			}	
		}
		m +='</select></span></td>';
		m +='<td width="200" class=xtab><INPUT class="btInput" id="btDefendAmount" type=text size=11 maxlength=10 value=""><span id="btTotalDefTroops"></span></td>';
		m +='<td align=right class=xtab><span id="btMaxDefTroops"></span></td>';
		m +='<td width="100" align=right class=xtab><a id="btAddDefendButton" class="inlineButton btButton blue14" onclick="btAddDefenders()"><span style="width:85px;display:inline-block;text-align:center;" align="center">Add</span></a></td></tr>';
		m +='<tr id=btDefPresetRow><TD colspan=4 class=xtab><TABLE cellSpacing=0 width=100% height=0%><tr><td class=xtab>';
		m +='<SELECT class="btSelector" style="width:190px;" id="btDefendPreset" onchange="btSelectDefPreset(this);"><option value="0">--Select Preset--</option>';
		for (y in Options.DefPresets) {
			m +='<option value="'+y+'">'+Options.DefPresets[y][0]+'</option>';
		}  
		NextPresetNumber = parseIntNan(y) + 1;
	
		for (z in uW.ptDefendFav) { // add in powertools presets
			m +='<option style="color:#888;" value="T'+z+'">(PowerTools) '+uW.ptDefendFav[z][0]+'</option>';
		}  
		m +='</select></td>';
		m +='<td align=left class=xtab width=200><a id="btNewDefPreset" class="inlineButton btButton brown8" onclick="btNewDefPreset()"><span>New</span></a>&nbsp;<a id="btChgDefPreset" class="inlineButton btButton brown8 disabled" onclick="btChgDefPreset()"><span>Chg</span></a></td>';
		m +='<td align=right class=xtab style="padding-right:0px;"><a id="btAddPresetButton" class="inlineButton btButton blue14" onclick="btSetPresetDefenders(false)"><span style="width:15px;display:inline-block;text-align:center;" align="center">+</span></a>&nbsp;<a id="btReplacePresetButton" class="inlineButton btButton blue14" onclick="btSetPresetDefenders(true)"><span style="width:85px;display:inline-block;text-align:center;" align="center">Replace</span></a></td></tr></table>';
		if (ExpandDefPreset) m += '<div id=DefEditPresetRow >';
		else m += '<div id=DefEditPresetRow class=divHide >';
		m +='<TABLE cellSpacing=0 width=100% height=0%><tr><TD colspan=2 class=xtabHD style="font-size:2px;">&nbsp;</td></tr><tr><td class=xtab style="padding-top:5px;">Preset Name:&nbsp;<INPUT class="btInput" id="btDefPresetName" size=20 style="width: 185px" type=text value=""/></td>';
		m +='<td align=right class=xtab style="padding-right:0px;"><a id="btSaveDefPreset" class="inlineButton btButton brown8" onclick="btSaveDefPreset()"><span>Save</span></a></td></tr>';
		m +='<tr><td colspan=2 class=xtabBR style="padding-right:0px;">';
		for (var ui in uW.cm.UNIT_TYPES){
			i = uW.cm.UNIT_TYPES[ui];
			m += '<span class=xtab>'+TroopImage(i)+'<INPUT class="btInput" id="btPresetTroop'+i+'" type=text style="width:53px;" size=10 maxlength=9 value=""></span> ';
		}
		m +='</td></tr><tr><TD colspan=2 class=xtabHD align=right style="padding-right:0px;"><a id="btDelDefPreset" class="inlineButton btButton brown8 disabled" onclick="btDelDefPreset()"><span>Delete</span></a>&nbsp;<a id="btCancelDefPreset" class="inlineButton btButton brown8" onclick="btCancelDefPreset()"><span>Cancel</span></a></td></tr></table>';	
		m +='</div></td></tr>';
		m += '<tr><td class=xtab colspan="4"><div style="opacity:0.6;" align="center" id=btTroopMsg>&nbsp;</div></td></tr></table>';

		document.getElementById('btTroopAddCell').innerHTML = m;
	
		if (InitPresetNumber != 0) {
			document.getElementById('btDefendPreset').value = InitPresetNumber;
			SelectDefPreset(document.getElementById('btDefendPreset'));
			InitPresetnumber = 0;
		}
	}
	else {
		uW.jQuery('#btTroopAddCell').addClass("divHide");
	}
	
	PaintCityInfo(cityId);
}

function PaintCityInfo(cityId) {

	if (!popDef) return;
	
	Curr = Cities.byID[cityId].idx;
    CityTag = '<div class="divHide">'+cityId+'</div>';

	// header items

	Mists = Seed.items.i10021;
	Doves = Seed.items.i901;
	var now = unixTime();
	var TruceDuration = 0;
	if (Seed.player.truceExpireUnixTime != undefined)
		TruceDuration = Seed.player.truceExpireUnixTime - now;
	var CannotDove = ((TruceDuration > 0) && (Seed.player.warStatus != 1));
	
	items = '<table style="padding-left:10px;" cellspacing=0 cellpadding=0><tr>';
	if (Mists) {
		items += '<td class=xtab><a onClick="cm.ItemController.usePotionOfMist(\'10021\')"><img height=24 style="opacity:0.8;vertical-align:text-top;" src="'+MistImage+'" title="Potion of Mist ('+Mists+')"></a></td>';
	}	
	else {
		items += '<td class=xtab><img height=24 style="opacity:0.8;vertical-align:text-top;" src="'+MistImage+'" title="Potion of Mist ('+Mists+')"></td>';
	}
	if (Seed.playerEffects.fogExpire > now) {
		items += '<td style="width:80px;" class=xtab><span style="color:#080;"><b>'+uW.timestr(Seed.playerEffects.fogExpire-now)+'</b></span></td>';
	}
	if (Doves && !CannotDove) {
		items += '<td class=xtab><a onClick="btDoveOfPeace(\'901\')"><img height=24 style="opacity:0.8;vertical-align:text-top;" src="'+DoveImage+'" title="Dove of Peace ('+Doves+')"></a></td>';
	}	
	else {
		items += '<td class=xtab><img height=24 style="opacity:0.8;vertical-align:text-top;" src="'+DoveImage+'" title="Dove of Peace ('+Doves+')"></td>';
	}
	if (TruceDuration > 0) {
		if (Seed.player.warStatus != 3) {
			items += '<td style="width:80px;" class=xtab><span style="color:#f00;"><b>CHECK BROKEN DOVE!</b></span></td>';
		}
		else {
			var ts = "color:#080";
			if (TruceDuration < 3600) {ts = "color:#f00"};
			items += '<td style="width:80px;" class=xtab><span style="'+ts+';"><b>'+uW.timestr(Seed.player.truceExpireUnixTime-now)+'</b></span></td>';
		}	
	}	
	
	items += '</tr></table>'
	CheckForHTMLChange('btItems',items);	
	
	// overview

	Status = '';
	
    var cityPrestigeType = Seed.cityData.city[CurrentCityId].prestigeInfo.prestigeType;
    var cityPrestigeLevel = Seed.cityData.city[CurrentCityId].prestigeInfo.prestigeLevel;
    var isPrestigeCity = Seed.cityData.city[CurrentCityId].isPrestigeCity;
    var cityExpTime = Seed.cityData.city[CurrentCityId].prestigeInfo.prestigeBuffExpire;
	if ((cityExpTime +(3600*24) < unixTime()) || isNaN(cityExpTime)) {
		prestigeexp = '';
	}
	else {
		if (cityExpTime < unixTime()) {
			prestigeexp = '<span style="color:#f00"><b>&nbsp;Expired!</b></span>';
		}
		else {
			prestigeexp = '<span style="color:#080"><b>&nbsp;'+uW.timestr(cityExpTime-unixTime())+' Remaining</b></span>';
		}
	}

	if (!isPrestigeCity) { CityFaction = 'Not ascended';}
	else {
		switch (cityPrestigeType) {
			case "1":	CityFaction = 'Druid'; break;
			case "2":	CityFaction = 'Fey'; break;
			case "3":	CityFaction = 'Briton';	break;
			default :	CityFaction = '?????'; break;
		}
		CityFaction += ' (Level '+cityPrestigeLevel+')';	
	}
	
	DefState = parseInt(Seed.citystats["city" + cityId].gate);
	if (DefState) DefButton = '<a id=btCityStatus class="inlineButton btButton red20"><span style="width:150px"><center>Troops are Defending!</center></span></a>';
	else DefButton = '<a id=btCityStatus class="inlineButton btButton green20"><span style="width:150px"><center>Troops are Hiding!</center></span></a>';	
	
	Status += '<table cellSpacing=0 width="100%">';
	Status += '<tr><td class=xtab width=70>Name</a></td><td class=xtab><b>'+Seed.cities[Curr][1]+'</b></td><td class=xtab rowspan=2 align=right><span class='+((Options.UpperDefendButton==false)?'divHide':'')+'>'+DefButton+'</span></td></tr>';
	Status += '<tr><td class=xtab>Location</a></td><td class=xtab><b>'+uW.provincenames['p'+Seed.cities[Curr][4]]+'&nbsp;'+coordLink(Seed.cities[Curr][2],Seed.cities[Curr][3])+'</b></td></tr>';
	Status += '<tr><td class=xtab>Faction</a></td><td class=xtab><b>'+CityFaction+'</b></td><td class=xtab id=prestigeexpcell>&nbsp;</td></tr>';
	
	Embassy = '<span class=xtab style="color:#f00">No Embassy!</span>';
    var emb = getCityBuilding(cityId, 8);
    if (emb.count > 0){
      var availSlots = emb.maxLevel;
      for (k in Seed.queue_atkinc){
		if ((Seed.queue_atkinc[k].toCityId == cityId) && (Seed.queue_atkinc[k].marchStatus == 2) && (Seed.queue_atkinc[k].fromCityId != cityId) && (Cities.byID[Seed.queue_atkinc[k].fromCityId]==null)) {
          --availSlots;
        }
      }
      Embassy = availSlots +' of '+ emb.maxLevel +' slots available';
    }
	Status += '<tr><td class=xtab><a onClick="btShowEmbassy('+Curr+')">Embassy</a></td><td class=xtab colspan=2><b>'+Embassy+'</b></span></b></td></tr>';
	
    var hall = getCityBuilding(cityId, 7);
	
	Marshall = '<span class=xtab style="color:#f00">No Marshall!</span>';
	Combat = 0;
	var s = Seed.knights["city" + cityId];
	if (s) {
		s = s["knt" + Seed.leaders["city" + cityId].combatKnightId];
		if (s){
			Combat = s.combat;
			if (s.combatBoostExpireUnixtime > unixTime()) {	Combat *= 1.25;	}	
			Marshall = s.knightName+' (Atk:'+Combat+')';
			if (!ExpandMarshall && (hall.count >= 1)) {
				Marshall += '&nbsp;&nbsp;<a id="btChangeMarshall" class="inlineButton btButton brown8" onclick="btChangeMarshall()"><span>Change</span></a>';
				Gauntlets = Seed.items.i221;
				if (!(s.combatBoostExpireUnixtime > unixTime()) && Gauntlets ) {
					Marshall += '&nbsp;<a id="btBoostMarshall" class="inlineButton btButton brown8" onclick="btBoostMarshall()" title="Gauntlet of Courage ('+Seed.items.i221+')"><span>Boost</span></a>';
				}
				else {
					if (s.combatBoostExpireUnixtime > unixTime()) {
						Marshall += '&nbsp;<span style="color:#080">&nbsp;Boosted for '+uW.timestr(s.combatBoostExpireUnixtime-unixTime())+'</span>';
					}
				}
			}	
		}
		else {
			ExpandMarshall = true;
		}	
	}
	else {
		ExpandMarshall = false; // no knights ffs!
	}

	if (hall.count < 1) {ExpandMarshall = false;} // no fricken knights hall!
	
	if (ExpandMarshall) Marshall += '<div>';
	else Marshall += '<div class=divHide >';
	Marshall +='<SELECT class="btSelector" id="btKnightList"><option value="0">--Choose a Knight--</option>';
	for (y in Seed.knights["city" + cityId]) {
		s = Seed.knights["city" + cityId][y];
		if ((parseInt(s.knightStatus) == 1) && (s.knightId != parseInt(Seed.leaders["city" + cityId].resourcefulnessKnightId)) && (s.knightId != parseInt(Seed.leaders["city" + cityId].intelligenceKnightId)) && (s.knightId != parseInt(Seed.leaders["city" + cityId].combatKnightId)) && (s.knightId != parseInt(Seed.leaders["city" + cityId].politicsKnightId))) {
			Combat = s.combat;
			if (s.combatBoostExpireUnixtime > unixTime()) {	Combat *= 1.25;	}	
			Marshall +='<option value="'+s.knightId+'">'+s.knightName+' (Atk:'+Combat+')</option>';
		}	
	}
	Marshall +='</select>';
	Marshall += '&nbsp;&nbsp;&nbsp;<a id="btSetMarshall" class="inlineButton btButton brown8" onclick="btSetMarshall()"><span>Assign</span></a>&nbsp;<a id="btCancelMarshall" class="inlineButton btButton brown8" onclick="btCancelMarshall()"><span>Cancel</span></a></div>';
	
	Status += '<tr><td class=xtab valign=top><a onClick="btShowKnightsHall('+Curr+')">Marshall</a></td><td class=xtabBR style="white-space:normal;" colspan=2><b>'+Marshall+'</b></td></tr>';

	var GotChamp = false;
	var CheckChamp = false;
	
	Champion = '<table cellspacing=0><tr><td class="xtab"><span class=xtab style="color:#f00">No Champion!</span></td><td class=xtab>';
	try {
		for (y in Seed.champion.champions) {
			citychamp = Seed.champion.champions[y];
			if (citychamp.assignedCity == cityId) {
				GotChamp = true;
				if (oldchamp != citychamp.championId) { ExpandChampion = false; }
				if (citychamp.status != '10') {champstat = '<span class=xtab style="color:#080">(Defending)</span>';}
				else { champstat = '<span class=xtab style="color:#f00">(Marching)</span>';}
				Champion = '<table cellspacing=0><tr><td class="xtab trimg" style="font-weight:normal;align:left;" id="ChampStatstd"><img height=14 style="vertical-align:text-top;" id="ChampStats" onMouseover="btCreateChampionPopUp(this,'+citychamp.assignedCity+',true);" src="'+ChampImagePrefix+citychamp.avatarId+ChampImageSuffix+'"></td><td class=xtab>'+citychamp.name+'</td><td class=xtab>'+champstat+'</td><td class=xtab>';
				break;
			}
		}
//		Champion += '<a id="btRefreshChampion" class="inlineButton btButton brown8" onclick="btRefreshChampion()"><span>Refresh</span></a>&nbsp;';
		if (ExpandChampion) {
			Champion += '<a id="btCancelChampion" class="inlineButton btButton brown8" onclick="btCancelChampion()"><span>Cancel</span></a></td></tr></table><div><table cellspacing=0>';
		}	
		else {
			if (!GotChamp) { Champion += '<a id="btChangeChampion" class="inlineButton btButton brown8" onclick="btChangeChampion()"><span>Assign</span></a>'; }
			else { if (citychamp.status == '1') { Champion += '<a id="btChangeChampion" class="inlineButton btButton brown8" onclick="btChangeChampion()"><span>Change</span></a>'; }}
			if (GotChamp && (citychamp.status == '1')) { Champion += '&nbsp;<a id="btFreeChampion" class="inlineButton btButton brown8" onclick="btFreeChampion()"><span>Unassign</span></a>'; }
			Champion += '</td></tr></table><div class=divHide><table cellspacing=0>';
		}
		for (y in Seed.champion.champions) {
			chkchamp = Seed.champion.champions[y];
			if (chkchamp.championId) {
				if (chkchamp.assignedCity != cityId) {
					CheckChamp = true;
					if (chkchamp.assignedCity == 0) { chkcity = 'Unassigned';} else { chkcity = Cities.byID[chkchamp.assignedCity].name;}
					chkbtn = '';
					defendingCity = chkcity;
					chkcol = "";
					if (chkchamp.status == '10') {
						defendingCity = 'Marching From '+defendingCity;
						chkcol='color:#800;'
					}
					else {
						if (defendingCity != 'Unassigned') {
							defendingCity = 'Defending '+defendingCity;
							chkcol = 'color:#f80;';
						}
						chkbtn = '<a id="btSetChampion'+chkchamp.championId+'" class="inlineButton btButton brown8" onclick="btSetChampion(this)"><span>Assign</span></a>'; 
					} 
					Champion += '<tr style="font-weight:normal;align:left;"><td class="xtab trimg" id="ChampStats'+chkchamp.championId+'td"><img height=14 style="vertical-align:text-top;" id="ChampStats'+chkchamp.championId+'" onMouseover="btCreateChampionPopUp(this,'+chkchamp.assignedCity+',true);" src="'+ChampImagePrefix+chkchamp.avatarId+ChampImageSuffix+'"></td><td class=xtab>'+chkchamp.name+'</td><td class=xtab><span style="'+chkcol+'">'+defendingCity+'</span></td><td class=xtab>'+chkbtn+'</td></tr>';
				}
			}	
		}
		Champion += '</table></div>';
	}	
	catch (err) {
		logerr(err); // write to log
		Champion = '<span class=xtab style="color:#f00">Error reading champion data :(</span>';
	}

	Status += '<tr><td class=xtab valign=top><a onClick="btShowChampion()">Champion</a></td><td class=xtab colspan=2><b>'+Champion+'</b></span></b></td></tr>';

	BloodLusts = Seed.items.i261;
	BloodFrenzies = Seed.items.i262;
	BloodFuries = Seed.items.i280;
	BarkSkins = Seed.items.i271;
	StoneSkins = Seed.items.i272;
	IronSkins = Seed.items.i281;
	
	var now = unixTime();

	atkboost = '<span style="color:#f00"><b>No Active Boost!</b></span>';
	if (Seed.playerEffects.atk2Expire >now) {
		atkboost = '<span style="color:#080"><b>50% for '+uW.timestr(Seed.playerEffects.atk2Expire-now)+'</b></span>';
	}
	else {
		if (Seed.playerEffects.atkExpire >now) {
			atkboost = '<span style="color:#f80"><b>20% for '+uW.timestr(Seed.playerEffects.atkExpire-now)+'</b></span>';
		}
	}	
	defboost = '<span style="color:#f00"><b>No Active Boost!</b></span>';
	if (Seed.playerEffects.def2Expire >now) {
		defboost = '<span style="color:#080"><b>50% for '+uW.timestr(Seed.playerEffects.def2Expire-now)+'</b></span>';
	}
	else {
		if (Seed.playerEffects.defExpire >now) {
			defboost = '<span style="color:#f80"><b>20% for '+uW.timestr(Seed.playerEffects.defExpire-now)+'</b></span>';
		}
	}	
	
	boosts = '<table cellspacing=0 cellpadding=0><tr>';
	if (BloodLusts) {
		boosts += '<td class=xtab><a onClick="cm.ItemController.use(\'261\')"><img height=28 style="opacity:0.8;vertical-align:text-top;" src="'+BloodLustImage+'" title="Blood Lust (Atk:20%) ('+BloodLusts+')"></a></td>';
	}	
	if (BloodFrenzies) {
		boosts += '<td class=xtab><a onClick="cm.ItemController.use(\'262\')"><img height=28 style="opacity:0.8;vertical-align:text-top;" src="'+BloodFrenzyImage+'" title="Blood Frenzy (Atk:20%) ('+BloodFrenzies+')"></a></td>';
	}	
	if (BloodFuries) {
		boosts += '<td class=xtab><a onClick="cm.ItemController.use(\'280\')"><img height=28 style="opacity:0.8;vertical-align:text-top;" src="'+BloodFuryImage+'" title="Blood Fury (Atk:50%) ('+BloodFuries+')"></a></td>';
	}	
	if (BarkSkins) {
		boosts += '<td class=xtab><a onClick="cm.ItemController.use(\'271\')"><img height=28 style="opacity:0.8;vertical-align:text-top;" src="'+BarkSkinImage+'" title="Bark Skin (Def:20%) ('+BarkSkins+')"></a></td>';
	}	
	if (StoneSkins) {
		boosts += '<td class=xtab><a onClick="cm.ItemController.use(\'272\')"><img height=28 style="opacity:0.8;vertical-align:text-top;" src="'+StoneSkinImage+'" title="Stone Skin (Def:20%) ('+StoneSkins+')"></a></td>';
	}	
	if (IronSkins) {
		boosts += '<td class=xtab><a onClick="cm.ItemController.use(\'281\')"><img height=28 style="opacity:0.8;vertical-align:text-top;" src="'+IronSkinImage+'" title="Iron Skin (Def:50%) ('+IronSkins+')"></a></td>';
	}
	boosts += '</tr></table>'
	Status += '<tr><td class=xtab valign=top>Attack</td><td class=xtab id=atkboostcell>&nbsp;</td><td class=xtab rowspan=2 align=right>'+boosts+'</td></tr>';
	Status += '<tr><td class=xtab valign=top>Defence</td><td class=xtab id=defboostcell>&nbsp;</td></tr>';
	
	Status += '<tr><td class=xtab><a onClick="btShowGuardians('+Curr+')">Guardian</a></td><td class=xtab colspan=2 id="btGuardianSelector"></td></tr>';
	Status += '</table>';

	Status += '<div id=btTRPresets></div>'; 

	if (CheckForHTMLChange('btStatusCell',CityTag+Status,serverwait)) {
		document.getElementById('btCityStatus').addEventListener ('click', function(){ToggleDefenceMode (cityId);} , false);
		PaintTRPresets(); 
		PaintGuardianSelector(); 
		if (GotChamp) {	oldchamp = citychamp.championId; }
		else { oldchamp = 0; }
	}
	document.getElementById('atkboostcell').innerHTML = atkboost;
	document.getElementById('defboostcell').innerHTML = defboost;
	document.getElementById('prestigeexpcell').innerHTML = prestigeexp;

	// sacrifices

	var s = "";
	var z = "";
    var b = getCityBuilding(cityId, 25);
	if (b.count > 0) {
		s += '<table cellSpacing=0 width="100%">';
		s += '<tr><td width=20% class=xtab>No. of Altars</td><td width=20% class=xtab><b>'+b.count+'</b></td>';
		s += '<td width=40% class=xtab>Dark Ritual?</td><td width=20% class=xtab><b>'+(DarkRitual?'Yes':'No')+'</b></td></tr>';
		s += '<tr><td class=xtab>Increase</td><td class=xtab><b>'+SacSettings.stat_inc+'%</b></td>';
		s += '<td class=xtab>Channelled Suffering?</td><td class=xtab><b>'+(ChannelledSuffering?'Yes':'No')+'</b></td></tr>';
		s += '<tr><td class=xtab>Max. Troops</td><td class=xtab><b>'+addCommas(SacSettings.max_amount)+'</b></td>';
		s += '<td class=xtab>Troops per Second</td><td class=xtab><b>'+(Math.round(SacSpeed * 100 / SacSpeedBuff)/100)+'</b></td></tr>';
		s += '<tr id=btQuickSac class=divHide><td class=xtab colspan="4">'+QuickSacString+'</td></tr>';
		s += '</table>';
	
		sac = Seed.queue_sacr["city" + cityId],
		sacrifices = false;
		var r = 0;
		if (sac.length > 0) {
			sacrifices = true;
			uW.jQuery.each(sac, function (P, R) {
				var Q = parseInt(R.eta, 10) - unixTime(),
				S = Math.round((R.multiplier[0] - 1) * 100),
				T = R.buffedUnitType[0];

				r=r+1;
				rowClass = 'evenRow';		
				var rem = (r % 2);
				if (rem == 1) rowClass = 'oddRow';		

				z += '<tr class="'+rowClass+'"><TD class=xtabBR><span class=xtab>'+uW.unitcost["unt"+T][0]+'</span></td><td class=xtab>'+R.quantity+'</td><td class=xtab>'+uW.timestr(Q)+'</td><td class=xtab align=right><a id="btStopRitual'+P+'" class="inlineButton btButton blue14" onclick="btStopRitual('+ P +')"><span style="width:65px;display:inline-block;text-align:center;">Cancel</span></a></td></tr>';
			})
		}
		z = '<br><div align="center"><TABLE cellSpacing=0 width=100% height=0%><tr><td width="120" class="xtabHD"><b>Troop Type</b></td><td class="xtabHD"><b>Amount</b></td><td width="80" class="xtabHD"><b>Time</b></td><td width="90" class="xtabHD">&nbsp;</td></tr>'+z;
		z += '</table></div>';

		if (r < SacAllowed) {
			ShowNewSacrifice(true);
			allownewsacs = true;
		}
		else {	
			ShowNewSacrifice(false);
			allownewsacs = false;
			z += '<tr><td class=xtab colspan="4"><div class="ErrText" align="center">&nbsp;</div></td></tr>';
		}
		z += '</table></div>';
	}
	else
	{
		z = '<div><br><div style="opacity:0.3;">No fey altars!</div><br></div>';
		ShowNewSacrifice(false);
		allownewsacs = false;
	}
	
	if (CheckForHTMLChange('btSacrificeCell',CityTag+s+z)) {
		PaintQuickSac();
	}
	
	// troops

	GotTroops = false;
	var TroopColour = '#000';
	var TitleColour = '#888888';
	var TitleStyle = 'xtabHD';
	if (DefState) {
		TroopColour = '#f00';
		TitleColour = '#f00';
		TitleStyle = 'xtabHDDef';
	}  

	if (DefState) DefButton2 = '<a id=btCityStatus2 class="inlineButton btButton red20"><span style="width:75px"><center>Defending!</center></span></a>';
	else DefButton2 = '<a id=btCityStatus2 class="inlineButton btButton green20"><span style="width:75px"><center>Hiding!</center></span></a>';	
	
	TroopCell = '<div align="center"><TABLE cellSpacing=0 width=100% height=0%><tr><td class="xtab">&nbsp;</td><td colspan=2 class="xtab" align=center><b><a class="TextLink" title="Click to toggle troops to Hide" style="color:'+TitleColour+';font-size:14px;" onclick="btSelectDefenders(\'A\',false);">Defending</a></b><br></td><td class="xtab" align=right><span class='+((Options.LowerDefendButton==false)?'divHide':'')+'>'+DefButton2+'</span></td></tr>';

	if (SelectiveDefending) {
		Troops = '<tr><td width=25% class="'+TitleStyle+'"><b><a class="TextLink" style="color:'+TitleColour+';" onclick="btSelectDefenders(\'I\',false);">Infantry</a></b></td><td width=25% class="'+TitleStyle+'"><b><a class="TextLink" style="color:'+TitleColour+';" onclick="btSelectDefenders(\'R\',false);">Ranged</a></b></td><td width=25% class="'+TitleStyle+'"><b><a class="TextLink" style="color:'+TitleColour+';" onclick="btSelectDefenders(\'H\',false);">Horsed</a></b></td><td width=25% class="'+TitleStyle+'"><b><a class="TextLink" style="color:'+TitleColour+';" onclick="btSelectDefenders(\'S\',false);">Siege</a></b></td></tr>';
		Troops += '<tr><td class="xtabBRTop">';
		for(c=0; c<Infantry.length; c++){
			var i = parseInt(Infantry[c]);
			if (Seed.defunits['city' + Seed.cities[Curr][0]]['unt'+i] > 0) { GotTroops = true; Troops += '<span class=xtab style="color:'+TroopColour+'"><a class="TextLink" style="color:'+TroopColour+';" onclick="btSelectDefenders('+i+',false);">'+TroopImage(i)+ addCommas(Seed.defunits['city' + Seed.cities[Curr][0]]['unt'+i])+'</a></span> ';}
		}	
		Troops += '</td><td class="xtabBRTop">';
		for(c=0; c<Ranged.length; c++){
			var i = parseInt(Ranged[c]);
			if (Seed.defunits['city' + Seed.cities[Curr][0]]['unt'+i] > 0) { GotTroops = true; Troops += '<span class=xtab style="color:'+TroopColour+'"><a class="TextLink" style="color:'+TroopColour+';" onclick="btSelectDefenders('+i+',false);">'+TroopImage(i)+ addCommas(Seed.defunits['city' + Seed.cities[Curr][0]]['unt'+i])+'</a></span> ';}
		}	
		Troops += '</td><td class="xtabBRTop">';
		for(c=0; c<Horsed.length; c++){
			var i = parseInt(Horsed[c]);
			if (Seed.defunits['city' + Seed.cities[Curr][0]]['unt'+i] > 0) { GotTroops = true; Troops += '<span class=xtab style="color:'+TroopColour+'"><a class="TextLink" style="color:'+TroopColour+';" onclick="btSelectDefenders('+i+',false);">'+TroopImage(i)+ addCommas(Seed.defunits['city' + Seed.cities[Curr][0]]['unt'+i])+'</a></span> ';}
		}	
		Troops += '</td><td class="xtabBRTop">';
		for(c=0; c<Siege.length; c++){
			var i = parseInt(Siege[c]);
			if (Seed.defunits['city' + Seed.cities[Curr][0]]['unt'+i] > 0) { GotTroops = true; Troops += '<span class=xtab style="color:'+TroopColour+'"><a class="TextLink" style="color:'+TroopColour+';" onclick="btSelectDefenders('+i+',false);">'+TroopImage(i)+ addCommas(Seed.defunits['city' + Seed.cities[Curr][0]]['unt'+i])+'</a></span> ';}
		}	
		Troops += '</td></tr>';
		if (!GotTroops) {Troops = '<tr><td colspan=4 class="xtab" align=center><div style="opacity:0.3;color:'+TroopColour+'">No Troops</div></td></tr>';}

		TroopCell += Troops + '<tr><td colspan=4 class="xtab" align=center>&nbsp;</td></tr>';
	
		GotTroops = false;
		TroopColour = '#000';
		TitleColour = '#888888';
		TitleStyle = 'xtabHD';

		TroopCell += '<tr><td colspan=4 class="xtab" align=center><b><a class="TextLink" title="Click to toggle troops to Defend" style="color:#888888;font-size:14px;" onclick="btSelectDefenders(\'A\',true);">Sanctuary</a></b><br></td></tr>';
	}
	
	Troops = '<tr><td width=25% class="xtabHD"><b><a class="TextLink" style="color:'+TitleColour+';" onclick="btSelectDefenders(\'I\',true);">Infantry</a></b></td><td width=25% class="xtabHD"><b><a class="TextLink" style="color:'+TitleColour+';" onclick="btSelectDefenders(\'R\',true);">Ranged</a></b></td><td width=25% class="xtabHD"><b><a class="TextLink" style="color:'+TitleColour+';" onclick="btSelectDefenders(\'H\',true);">Horsed</a></b></td><td width=25% class="xtabHD"><b><a class="TextLink" style="color:'+TitleColour+';" onclick="btSelectDefenders(\'S\',true);">Siege</a></b></td></tr>';
	Troops += '<tr><td class="xtabBRTop">';
	for(c=0; c<Infantry.length; c++){
		var i = parseInt(Infantry[c]);
       	if (Seed.units['city' + Seed.cities[Curr][0]]['unt'+i] > 0) { GotTroops = true; Troops += '<span class=xtab style="color:'+TroopColour+'"><a class="TextLink" style="color:'+TroopColour+';" onclick="btSelectDefenders('+i+',true);">'+TroopImage(i)+ addCommas(Seed.units['city' + Seed.cities[Curr][0]]['unt'+i])+'</a></span> ';}
	}	
	Troops += '</td><td class="xtabBRTop">';
	for(c=0; c<Ranged.length; c++){
		var i = parseInt(Ranged[c]);
       	if (Seed.units['city' + Seed.cities[Curr][0]]['unt'+i] > 0) { GotTroops = true; Troops += '<span class=xtab style="color:'+TroopColour+'"><a class="TextLink" style="color:'+TroopColour+';" onclick="btSelectDefenders('+i+',true);">'+TroopImage(i)+ addCommas(Seed.units['city' + Seed.cities[Curr][0]]['unt'+i])+'</a></span> ';}
	}	
	Troops += '</td><td class="xtabBRTop">';
	for(c=0; c<Horsed.length; c++){
		var i = parseInt(Horsed[c]);
       	if (Seed.units['city' + Seed.cities[Curr][0]]['unt'+i] > 0) { GotTroops = true; Troops += '<span class=xtab style="color:'+TroopColour+'"><a class="TextLink" style="color:'+TroopColour+';" onclick="btSelectDefenders('+i+',true);">'+TroopImage(i)+ addCommas(Seed.units['city' + Seed.cities[Curr][0]]['unt'+i])+'</a></span> ';}
	}	
	Troops += '</td><td class="xtabBRTop">';
	for(c=0; c<Siege.length; c++){
		var i = parseInt(Siege[c]);
       	if (Seed.units['city' + Seed.cities[Curr][0]]['unt'+i] > 0) { GotTroops = true; Troops += '<span class=xtab style="color:'+TroopColour+'"><a class="TextLink" style="color:'+TroopColour+';" onclick="btSelectDefenders('+i+',true);">'+TroopImage(i)+ addCommas(Seed.units['city' + Seed.cities[Curr][0]]['unt'+i])+'</a></span> ';}
	}	
	Troops += '</td></tr>';
	if (!GotTroops) {Troops = '<tr><td colspan=4 class="xtab" align=center><div style="opacity:0.3;color:'+TroopColour+'">No Troops</div></td></tr>';}
	TroopCell += Troops + '<tr><td colspan=4 class="xtab" align=center>&nbsp;</td></tr></table></div>';
	
	if (CheckForHTMLChange('btTroopCell',CityTag+TroopCell)) {
		document.getElementById('btCityStatus2').addEventListener ('click', function(){ToggleDefenceMode (cityId);} , false);
		// check if troop types dropdowns need refreshing - Defence AND Sacrifice!
		CheckOptionsString = "";
		for (y in uW.unitcost) {
			var tot = parseIntNan(Seed.units['city' + Seed.cities[Curr][0]]['unt'+y.substr(3)]);
			if ((tot > 0)) {
				CheckOptionsString = CheckOptionsString + y.substr(3);
			}	
		}
		if (DefOptionsString != CheckOptionsString) {
			if (SelectiveDefending) { InitPresetNumber = document.getElementById('btDefendPreset').value; }
			SetCurrentCity(Seed.cities[Curr][0]);
		}	
		else {
			if (SelectiveDefending) { SelectDefTroopType (document.getElementById("btDefendTroops")); }
		}
	}
	
	// reinforcements
	
	reinforcements = false;
	Reins = [];
	var z = "";
	var r = 0;
    for (k in inc){
		var to = Cities.byID[inc[k].toCityId];
		if ((inc[k].toCityId == cityId) && (to.tileId == inc[k].toTileId) && ((inc[k].marchStatus == 2) || (inc[k].marchType == 2)) && (inc[k].fromCityId != cityId)) {
			reinforcements = true;
			var a = inc[k];
			var player = Seed.players['u'+a.fromPlayerId];
			var fromname = player.n;
			marchdir = "Return"; // always show troops remaining
			var	marchtime=uW.timestr(a.arrivalTime - unixTime()); 
			
			r=r+1;
			rowClass = 'evenRow';		
			var rem = (r % 2);
			if (rem == 1) rowClass = 'oddRow';		

			z += '<tr class="'+rowClass+'"><TD class=xtabBR><span class=xtab>'+fromname+'</span></td><td class=xtabBR>';
			
			if (a["knightId"] > 0) z +='<span class=xtab>'+uW.g_js_strings.commonstr.knight+' (Atk:'+ a["knightCombat"]+')</span> ';
			for (var ui in uW.cm.UNIT_TYPES){
				i = uW.cm.UNIT_TYPES[ui];
				if(a["unit"+i+marchdir] > 0) z += '<span class=xtab>'+ uW.unitcost['unt'+i][0] +': '+ addCommas(a["unit"+i+marchdir])+'</span> ';
			}
			if ((a.marchStatus == 2) || (a.arrivalTime - unixTime() <= 0))	{
				z += '</td><td class=xtab align="right"><a id="btSendHome'+a.marchId+'" class="inlineButton btButton blue14" onclick="btSendHome('+ a.marchId +')"><span>Send Home</span></a></td></tr>';
				Reins.push(a.marchId); // for send all home logic
			}	
			else { 
				z += '</td><td class=xtab align="right">'+marchtime+'</td></tr>';
			}	
        }
    }
	if (!reinforcements) {
		z = '<DIV><br><div style="opacity:0.3;">No Reinforcements</div><br></div>';
	}
	else
	{
		z = '<div align="center"><TABLE cellSpacing=0 width=100% height=0%><tr><td width="120" class="xtabHD"><b>From</b></td><td class="xtabHD"><b>Troops</b></td><td width="40" class="xtabHD"><a id="btSendAllHome" class="inlineButton btButton red14" onclick="btSendAllHome('+cityId+')"><span>Send All Home</span></a></td></tr>'+z;
		z += '<tr><td class=xtab colspan="4"><div class="ErrText" align="center" id=btReinErr>&nbsp;</div></td></tr></table></div>';
	}
	
	CheckForHTMLChange('btReinforceCell',CityTag+z,serverwait);
	
	// incoming attacks

	cityincoming = false;
	var cityinctimes = {};
	var z = "";
	var r = 0;
    for (k in inc){
		if ((inc[k].toCityId == cityId) && (inc[k].score)) {
			var a = inc[k];
			if (a.arrivalTime < unixTime()) continue; // don't display arrival times already happened
			cityincoming = true;
			var icon,hint,marchtime,fromname,marchdir,fromcoords;
			var marchId = a.mid;
			var marchScore = parseInt(a.score);
			var marchType = parseInt(a.marchType);
			var marchStatus = parseInt(a.marchStatus);
			if (!a.marchType) {a.marchType = 4;}
			if (!a.arrivalTime || a.arrivalTime == -1) {marchtime = '??????';}
			else {marchtime=uW.timestr(a.arrivalTime - unixTime());} 
			cityinctimes[marchId] = marchtime;
			var player = Seed.players['u'+a.pid];
			fromname = "";
			if (player) {fromname = player.n;}

			if (!a.fromXCoord) {fromcoords = "";}
			else {fromcoords = coordLink(a.fromXCoord,a.fromYCoord);}
			if (fromname == "") {fromname = '(Upgrade WatchTower)';}
			else {fromname = MonitorLink(a.pid,fromname);}
			
			switch (marchType) {
				case 3: icon=ScoutImage;hint="Scout";break;
				case 4: icon=AttackImage;hint="Attack";break;
			} 
			
			r=r+1;
			rowClass = 'evenRow';		
			var rem = (r % 2);
			if (rem == 1) rowClass = 'oddRow';		

			z += '<tr class="'+rowClass+'"><TD class=xtab><img src='+icon+' title='+hint+'></td>';
			z += '<TD class=xtabBR><span class=xtab id="citymarchtime'+marchId+'">&nbsp;</span></td>';
			z += '<TD class=xtabBR><span class=xtab>'+fromname+'</span> ';
			if (fromcoords != "") { z+= '<span class=xtab>'+fromcoords+'</span>'; }
			z += '</td><td  class=xtabBR>';
			
			if ((safecall.indexOf(a.pid) < 0 || trusted) && a["championInfo"]) {
				marchchamp = "<table cellspacing=0><tr><td colspan=2><b>"+a["championInfo"].name+"</b></td></tr><tr><td colspan=2><b>Champion Stats</b></td></tr>";
				var gotchamp = false;
				if (a["championInfo"].effects[1] && !(a["championInfo"].effects[1] instanceof Array) && typeof(a["championInfo"].effects[1]) === "object") {
					got202 = false;
					for (cy in a["championInfo"].effects[1]) {
						// missing bonus damage?
						if ((cy == '202') && gotchamp) {got202 = true;}
						if ((cy == '203') && !got202) { marchchamp += "<tr><td>"+uW.g_js_strings.effects.name_202+"</td><td>0</td></tr>"; }
						str = eval('uW.g_js_strings.effects.name_'+cy);
						if (str && str!= "") {
							gotchamp = true;
							marchchamp += "<tr><td>"+str+"</td><td>"+a["championInfo"].effects[1][cy]+"</td></tr>";
						} else { break;	}
					}	
				}	
				if (!gotchamp) { marchchamp += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
				marchchamp+="<tr><td colspan=2><b>Troop Stats</b></td></tr>";
				var gottroop = false;
				if (a["championInfo"].effects[2] && !(a["championInfo"].effects[2] instanceof Array) && typeof(a["championInfo"].effects[2]) === "object") {
					for (ty in a["championInfo"].effects[2]) {
						str = eval('uW.g_js_strings.effects.name_'+ty);
						if (str && str!= "") {
							gottroop = true;
							marchchamp += "<tr><td>"+str+"</td><td>"+a["championInfo"].effects[2][ty]+"</td></tr>";
						} else { break;	}
					}	
				}	
				if (!gottroop) { marchchamp += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
				marchchamp+="</table>";
				z +='<table cellspacing=0><tr><td class="xtab trimg" style="font-weight:normal;align:left;" id="btcitymarchchamp'+a.mid+'td"><input type="hidden" id="btcitymarchchamp'+a.mid+'effects" value="'+marchchamp+'" /><a><img id="btcitymarchchamp'+a.mid+'" onMouseover="btCreateChampionPopUp(this,'+a.toCityId+');" height=14 style="vertical-align:text-top;" src="'+ShieldImage+'"></a></td><td class=xtab>Champion: '+a["championInfo"].name+'&nbsp;</td></tr></table>';
			}	
			if (a["knt"]) z +='<span class=xtab>'+uW.g_js_strings.commonstr.knight+' (Atk:'+ a["knt"]["cbt"]+')</span> ';
			if (a["unts"]) { 
				for (var ui in uW.cm.UNIT_TYPES){
					i = uW.cm.UNIT_TYPES[ui];
					if (a["unts"]["u"+i]) {
						if (a["unts"]["u"+i] > 0) z += '<span class=xtab>'+ uW.unitnamedesctranslated['unt'+i][0] +': '+ addCommas(a["unts"]["u"+i])+'</span> ';
						else z += '<span class=xtab>'+ a["unts"]["u"+i]+' '+ uW.unitnamedesctranslated['unt'+i][0] +'</span> ';
					}
				}
			}
			else
			{
				if (a["cnt"]) { z += '<span class=xtab>'+a["cnt"]+'</span> ';}
				else { z += '<span class=xtab>(Upgrade WatchTower)</span> '; }
			}

			if (local_atkinc["m"+marchId]["fromSpellType"]) {
				var spell = eval('uW.g_js_strings.spells.name_'+local_atkinc["m"+marchId]["fromSpellType"]);
				if (spell) {
					var spellstyle = 'color:#808;';
					z +='<br><span class=xtab style="'+spellstyle+'"><b>*&nbsp;'+spell+'&nbsp;*</b></span>'
				}
			}

			z += '</td></tr>';
        }
    }
	if (!cityincoming) {
		z = '<DIV><br><div style="opacity:0.3;">No Incoming Attacks</div></div>';
	}
	else
	{
		z = '<div align="center"><TABLE cellSpacing=0 width=100% height=0%><tr><td width="18" class="xtabHD">&nbsp;</td><td width="60" class="xtabHD"><b>Time</b></td><td width="120" class="xtabHD"><b>From</b></td><td class="xtabHD"><b>Troops</b></td></tr>'+z;
	}
    z += '</table></div>';
	
	CheckForHTMLChange('btAttackCell',CityTag+z);
	for (var m in cityinctimes) {
		mt = cityinctimes[m];
		if (document.getElementById('citymarchtime'+m)) {
			document.getElementById('citymarchtime'+m).innerHTML = mt;
		}	
	}

	// fortifications

	GotDef = false;
	WallDefences = [];
	FieldDefences = [];
	var d = Seed.fortifications["city" + Seed.cities[Curr][0]];
	var a = Object.keys(d);
	for (var c = 0; c < a.length; c++) {
		var f = parseInt(a[c].split("fort")[1]);
		if (f < 60) { WallDefences.push(a[c]) } else { FieldDefences.push(a[c])	}
	}

	Defences = '<div align="center"><TABLE cellSpacing=0 width=100% height=0%><tr><td width=50% class="xtabHD"><b>Wall Defences</b></td><td width=50% class="xtabHD"><b>Field Defences</b></td></tr>';
	Defences += '<tr><td class="xtabBRTop">';
	for(c=0; c<WallDefences.length; c++){
		var f = parseInt(WallDefences[c].split("fort")[1]);
		if (Seed.fortifications['city' + Seed.cities[Curr][0]]['fort'+f] > 0) { GotDef = true; Defences += '<span class=xtab style="display:inline-block;width:100px;">'+TroopImage(f)+ addCommas(Seed.fortifications['city' + Seed.cities[Curr][0]]['fort'+f])+'</span> ';}
	}	
	Defences += '</td><td class="xtabBRTop">';
	for(c=0; c<FieldDefences.length; c++){
		var f = parseInt(FieldDefences[c].split("fort")[1]);
		if (Seed.fortifications['city' + Seed.cities[Curr][0]]['fort'+f] > 0) { GotDef = true; Defences += '<span class=xtab style="display:inline-block;width:100px;">'+TroopImage(f)+ addCommas(Seed.fortifications['city' + Seed.cities[Curr][0]]['fort'+f])+'</span> ';}
	}	
	Defences += '</td></tr></table>';
	if (!GotDef) {Defences = '<div><br><div style="opacity:0.3;">No Fortifications</div>';}
	Defences += '<br></div>';

	CheckForHTMLChange('btWallDefenceCell',CityTag+Defences);

	// outgoing attacks
	
	if (Options.EnableOutgoing) {
		cityoutgoing = false;
		var cityouttimes = {};
		var z = "";
		var r = 0;
		for (k in outCity){
			var a = outCity[k];
			if (a.destinationUnixTime < unixTime()) continue; // don't display arrival times already happened
			var icon, hint, marchtime, totile, tocity, toname, marchdir, tocoords;
	
			var marchId = a.marchId;
			var marchStatus = parseInt(a.marchStatus);
			var marchType = parseInt(a.marchType);
			if (marchType == 10) marchType=4; // Change Dark Forest type to Attack!
			if (marchType != 4 && marchType != 3) continue; // attacks and scouts only
			cityoutgoing = true;
			var now = unixTime();
			var destinationUnixTime = a["destinationUnixTime"] - now;
			
			marchdir = "Count";	
		
			totile = "";
			tocity = "";
			toname = "";
			totile = tileTypes[parseInt(a["toTileType"])];
			if (a["toTileType"] == 51) {
				if (!a["toPlayerId"]) { totile = ""; }
				else { if (a["toPlayerId"] == 0) totile = 'Barb Camp'; }
			}	
			totile = 'Lvl '+a["toTileLevel"]+' '+totile;
	
			if (a["toPlayerId"] && (a["toPlayerId"] != 0)) {
				if (a.players && a.players['u'+a.toPlayerId]) {
					toname = MonitorLink(a.toPlayerId,a.players['u'+a.toPlayerId].n);
				}
				else {
					if (Seed.players['u'+a.toPlayerId]) {
						toname = MonitorLink(a.toPlayerId,Seed.players['u'+a.toPlayerId].n);
					}
				}
			}
	
			var iconType = marchType;
		
			if (destinationUnixTime < (60)) { marchtime = '<span style="color:#f00">'+uW.timestr(destinationUnixTime)+'</span>'; }
			else { marchtime = uW.timestr(destinationUnixTime); }	
	
			cityouttimes[marchId] = marchtime;
	
			if (!a.toXCoord || (tocity != "")) {tocoords = "";}
			else {tocoords = coordLink(a.toXCoord,a.toYCoord);}
	
			hint = "";
			switch (marchType) {
				case 3: hint=uW.g_js_strings.commonstr.scout;break;
				case 4: hint=uW.g_js_strings.commonstr.attack;break;
			} 
		
			switch (iconType) {
				case 3: icon=ScoutImage;break;
				case 4: icon=AttackImage;break;
			} 
			hint="("+marchId+")";
		
			r=r+1;
			rowClass = 'evenRow';		
			var rem = (r % 2);
			if (rem == 1) rowClass = 'oddRow';		

			z += '<tr class="'+rowClass+'"><TD class=xtab><a id="btCityRecall'+a.marchId+'" onclick="btRecall('+ a.marchId +',true)"><img src='+icon+' title='+hint+'></a></td>';
			z += '<TD class=xtab id="cityoutmarchtime'+marchId+'">&nbsp;</td>';
			z += '<TD class=xtabBR>';
			if (toname != "") { z+= '<span class=xtab>'+toname+'</span> '; }
			if (totile != "") { z+= '<span class=xtab>'+totile+'</span> '; }
			if (tocity != "") { z+= '<span class=xtab>'+tocity+'</span> '; }
			if (tocoords != "") { z+= '<span class=xtab>'+tocoords+'</span>'; }
			z += '</td>';
	
			z += '<TD colspan=2 class=xtabBR>';
	
			if (a["championInfo"]) { // stats here are sort of obsolete, because it uses city champ data, but kept in for completeness...
				marchchamp = "<table cellspacing=0><tr><td colspan=2><b>"+a["championInfo"].name+"</b></td></tr><tr><td colspan=2><b>Champion Stats</b></td></tr>";
				var gotchamp = false;
				if (a["championInfo"].effects) {
					if (a["championInfo"].effects[1] && !(a["championInfo"].effects[1] instanceof Array) && typeof(a["championInfo"].effects[1]) === "object") {
						got202 = false;
						for (cy in a["championInfo"].effects[1]) {
							// missing bonus damage?
							if ((cy == '202') && gotchamp) {got202 = true;}
							if ((cy == '203') && !got202) { marchchamp += "<tr><td>"+uW.g_js_strings.effects.name_202+"</td><td>0</td></tr>"; }
							str = eval('uW.g_js_strings.effects.name_'+cy);
							if (str && str!= "") {
								gotchamp = true;
								marchchamp += "<tr><td>"+str+"</td><td>"+a["championInfo"].effects[1][cy]+"</td></tr>";
							} else { break;	}
						}	
					}	
					if (!gotchamp) { marchchamp += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
					marchchamp+="<tr><td colspan=2><b>Troop Stats</b></td></tr>";
					var gottroop = false;
					if (a["championInfo"].effects[2] && !(a["championInfo"].effects[2] instanceof Array) && typeof(a["championInfo"].effects[2]) === "object") {
						for (ty in a["championInfo"].effects[2]) {
							str = eval('uW.g_js_strings.effects.name_'+ty);
							if (str && str!= "") {
								gottroop = true;
								marchchamp += "<tr><td>"+str+"</td><td>"+a["championInfo"].effects[2][ty]+"</td></tr>";
							} else { break;	}
						}	
					}	
					if (!gottroop) { marchchamp += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
					marchchamp+="</table>";
				}	
				z +='<table cellspacing=0><tr><td class="xtab trimg" style="font-weight:normal;align:left;" id="btcityoutmarchchamp'+a.marchId+'td"><input type="hidden" id="btcityoutmarchchamp'+a.marchId+'effects" value="'+marchchamp+'" /><a><img id="btcityoutmarchchamp'+a.marchId+'" onMouseover="btCreateChampionPopUp(this,'+a.fromCityId+',true);" height=14 style="vertical-align:text-top;" src="'+ShieldImage+'"></a></td><td class=xtab>Champion: '+a["championInfo"].name+'&nbsp;</td></tr></table>';
			}
			if ((a["knightId"] > 0) && (!a["knightCombat"])) {
				for (i in Seed.knights["city"+a.marchCityId]) {
					if (i == ("knt" + a["knightId"])) {
						Combat = Seed.knights["city"+a.marchCityId][i]["combat"];
						if (Seed.knights["city"+a.marchCityId][i]["combatBoostExpireUnixtime"] > unixTime()) {	Combat *= 1.25;	}	
						a["knightCombat"] = Combat;
					}
				}
			}

			if (a["knightId"] > 0) z +='<span class=xtab>'+uW.g_js_strings.commonstr.knight+' (Atk:'+ a["knightCombat"]+')</span> ';
			for (var ui in uW.cm.UNIT_TYPES){
				i = uW.cm.UNIT_TYPES[ui];
				if((a["unit"+i+"Count"] > 0) || (a["unit"+i+"Return"] > 0)) {
					trpcol = '#000';
					z += '<span class=xtab>'+ uW.unitcost['unt'+i][0] +': <span class=xtab style="color:'+trpcol+'">'+ addCommas(a["unit"+i+marchdir])+'</span></span> ';
				}	
			}	

			if (a["fromSpellType"]) {
				var spell = eval('uW.g_js_strings.spells.name_'+a["fromSpellType"]);
				if (spell) {
					var spellstyle = 'color:#808;';
					z +='<br><span class=xtab style="'+spellstyle+'"><b>*&nbsp;'+spell+'&nbsp;*</b></span>'
				}
			}
			
			z += '</td></tr>';
			
		}
		if (!cityoutgoing) {
			z = '<DIV><br><div style="opacity:0.3;">No Outgoing Attacks</div></div>';
		}
		else
		{
			z = '<div align="center"><TABLE cellSpacing=0 width=100% height=0%><tr><td width="18" class="xtabHD">&nbsp;</td><td width="60" class="xtabHD"><b>Time</b></td><td width="120" class="xtabHD"><b>Target</b></td><td class="xtabHD"><b>Troops</b></td></tr>'+z;
		}
		z += '<tr><td class=xtab colspan="4"><div class="ErrText" align="center" id=btCityOutErr>&nbsp;</div></td></tr></table></div>';
		
		CheckForHTMLChange('btCityAttackCell',CityTag+z);
		for (var m in cityouttimes) {
			mt = cityouttimes[m];
			if (document.getElementById('cityoutmarchtime'+m)) {
				document.getElementById('cityoutmarchtime'+m).innerHTML = mt;
			}	
		}
	}	
	
	// toggle section displays
	
	ShowHideSection("btStatus",OverviewShow);
	ShowHideSection("btSacrifice",SacrificeShow && (cityPrestigeType == "2"));
	ShowHideSection("btTroop",TroopShow);
	ShowHideSection("btReinforce",ReinforceShow);
	ShowHideSection("btWallDefence",FortificationShow);
	ShowHideSection("btAttack",AttackShow);
	if (Options.EnableOutgoing) {
		ShowHideSection("btCityAttack",CityAttackShow);
	}

	ShowHideRow("btDefAddTroopRow",Options.DefAddTroopShow);
	ShowHideRow("btDefPresetRow",Options.DefPresetShow);
	
	ResetFrameSize('btDefence',100,DashWidth);
}

function PaintQuickSac () {
	if (!document.getElementById('btQuickSac')) { return; }
	if ((Options.QuickSacrifice == true) && (allownewsacs == true))
		ShowQuickSac(true);
	else
		ShowQuickSac(false);
}

function ShowQuickSac (tf) {
	var dc = uW.jQuery('#btQuickSac').attr('class');
	if (tf) {if (dc.indexOf('divHide') >= 0) uW.jQuery('#btQuickSac').attr('class','');}
	else {if (dc.indexOf('divHide') < 0) uW.jQuery('#btQuickSac').attr('class','divHide');}
}

function RefreshChampionData() {
	var T = uW.cm.ChampionManager.get("selectedChampion")
	Champs = uW.cm.ChampionModalController.getCastleViewData();
	uW.cm.ChampionManager.selectChampion(T);
}

function TroopImage(tt) {
	if (tt < 50) { var TroopText = uW.unitcost['unt'+tt][0];}
	else { var TroopText = uW.fortcost['frt'+tt][0];}
	var img = '<img style="width:20px;height:20px;vertical-align:middle" src="'+TroopImagePrefix+tt+TroopImageSuffix+'" title="'+TroopText+'">&nbsp;';
	return img;
}

function ResourceImage(path,title) {
	var img = '<img style="width:20px;height:20px;vertical-align:middle" src="'+path+'" title="'+title+'">&nbsp;';
	return img;
}

function capitalize(value) {
	newValue = "";
	var pattern = " ";
	value = value.split(pattern);
	for(var i = 0; i < value.length; i++) {
		newValue += value[i].substring(0,1).toUpperCase() +
		value[i].substring(1,value[i].length);
		if (i < value.length-1) {newValue += " ";}
	}
	return newValue;
}

function ShowNewSacrifice (tf) {
	var dc = uW.jQuery('#btNewSacrificeCell').attr('class');
	if (tf) {if (dc.indexOf('divHide') >= 0) uW.jQuery('#btNewSacrificeCell').attr('class','');}
	else {if (dc.indexOf('divHide') < 0) uW.jQuery('#btNewSacrificeCell').attr('class','divHide');}
}

function SelectTroopType (sel) {
	if ((sel.value == 0) || (sel.value == "")) {
		document.getElementById('btTotalTroops').innerHTML = "";
		document.getElementById('btMaxTroops').innerHTML = "";
		TotalTroops = 0;
		return false
	} else {
		if (SelectiveDefending) { TotalTroops = parseIntNan(Seed.units['city' + Seed.cities[Options.CurrentCity][0]]['unt'+sel.value])+parseIntNan(Seed.defunits['city' + Seed.cities[Options.CurrentCity][0]]['unt'+sel.value]); }
		else { TotalTroops = parseIntNan(Seed.units['city' + Seed.cities[Options.CurrentCity][0]]['unt'+sel.value]); }
		document.getElementById('btTotalTroops').innerHTML = '&nbsp;/&nbsp;'+addCommas(TotalTroops);
		document.getElementById('btMaxTroops').innerHTML = '<a id="btMaxButton" onclick="btSetMaxTroops()"><span style="font-size:9px;" align="center">max</span></a>';
		// set default sac length if blank
		if (Options.DefaultSacrifice) {
			var elemin = document.getElementById('btRitualMinutes');
			var elesec = document.getElementById('btRitualSeconds');
			if ((elemin.value == "") && (elesec.value == "")) {
				elemin.value = Options.DefaultSacrificeMin;
				elesec.value = Options.DefaultSacrificeSec;
				SetRitualLength(elesec);	
			}
		}	
		var elem = document.getElementById('btRitualAmount');
		if (parseInt(elem.value) > TotalTroops) {
			elem.value = TotalTroops; 
			SetRitualLength(elem);	
		}	
	}
}

function BlankifZero(val) {
	if (val == 0) {return "";} else {return val;}
}

function SetMaxTroops () {
	var elem = document.getElementById('btRitualAmount');
	elem.value = SacSettings.max_amount;
	if (elem.value > TotalTroops) {elem.value = TotalTroops;}
	if ((elem.value > Options.SacrificeLimit) && (parseIntNan(Options.SacrificeLimit) > 0)) {elem.value = Options.SacrificeLimit;}
	SetRitualLength(elem);	
}

function SetRitualLength (sel) {
	sel.value = parseInt(sel.value);
	if (isNaN(sel.value)) sel.value = 0;

	var trp, min, sec;
	
	if (sel.id == 'btRitualMinutes') {
		min = parseIntNan(sel.value);

		if (isNaN(document.getElementById('btRitualSeconds').value)) sec = 0;
		else sec = parseIntNan(document.getElementById('btRitualSeconds').value);

		trp = Math.round((parseIntNan(min * 60) + sec) * (SacSpeed / SacSpeedBuff)); // troops
	}

	if (sel.id == 'btRitualSeconds') {
		sec = parseIntNan(sel.value);

		if (isNaN(document.getElementById('btRitualMinutes').value)) min = 0;
		else min = parseIntNan(document.getElementById('btRitualMinutes').value);

		min += (parseIntNan( sec / 60 ));
		sec = sec % 60;
		
		trp = Math.round(((min * 60)+sec) * (SacSpeed / SacSpeedBuff)); // troops
	}

	if (sel.id == 'btRitualAmount') {
		trp = parseIntNan(sel.value);
	}

	if (trp > TotalTroops) {trp = TotalTroops;}
	if (trp > parseInt(SacSettings.max_amount)) {trp = SacSettings.max_amount;}
	if ((trp > Options.SacrificeLimit) && (parseIntNan(Options.SacrificeLimit) > 0)) {trp = Options.SacrificeLimit;}
		
	sec = parseIntNan(trp / (SacSpeed / SacSpeedBuff), 10); // seconds
	min = parseIntNan( sec / 60 );
	sec = sec % 60;
	
	document.getElementById('btRitualAmount').value = BlankifZero(trp);
	document.getElementById('btRitualMinutes').value = BlankifZero(min);
	document.getElementById('btRitualSeconds').value = BlankifZero(sec);
}

function setTroopMessage(msg) {
	document.getElementById('btTroopMsg').innerHTML = msg;
}

function ToggleDefenceMode (cityId) {
	uW.jQuery('#btCityStatus').addClass("disabled");
	uW.jQuery('#btCityStatus2').addClass("disabled");
	ResetHTMLRegister('btStatusCell');
	serverwait = true;

	var state = 1;
    if (Seed.citystats["city" + cityId].gate != 0)
		state = 0;

    var params = uW.Object.clone(uW.g_ajaxparams);
    params.cid = cityId;
    params.state = state;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
			serverwait = false;
            if (rslt.ok) {
                Seed.citystats["city" + cityId].gate = state;
				if (CurrentCityId==cityId) {PaintCityInfo(cityId);}
            }
			uW.jQuery('#btCityStatus').removeClass("disabled");
			uW.jQuery('#btCityStatus2').removeClass("disabled");
			if (rslt.updateSeed) { uW.update_seed(rslt.updateSeed); }
        },
        onFailure: function () { serverwait = false; uW.jQuery('#btCityStatus').removeClass("disabled"); uW.jQuery('#btCityStatus2').removeClass("disabled"); }
    });
}

function SelectDefenders (sel,def) {
	if (!SelectiveDefending) return;
	var MoveArray = [];
	if (!def) { // switch to sanctuary
		if (sel == "A") { // All
			for (var ui in uW.cm.UNIT_TYPES){
				i = uW.cm.UNIT_TYPES[ui];
				MoveArray[i] = 0 - parseIntNan(Seed.defunits['city' + CurrentCityId]['unt'+i]);
			}
		}
		if (sel == "I") { // Infantry
			for(c=0; c<Infantry.length; c++){
				var i = parseInt(Infantry[c]);
				MoveArray[i] = 0 - parseIntNan(Seed.defunits['city' + CurrentCityId]['unt'+i]);
			}
		}
		if (sel == "R") { // Ranged
			for(c=0; c<Ranged.length; c++){
				var i = parseInt(Ranged[c]);
				MoveArray[i] = 0 - parseIntNan(Seed.defunits['city' + CurrentCityId]['unt'+i]);
			}
		}
		if (sel == "H") { // Horsed
			for(c=0; c<Horsed.length; c++){
				var i = parseInt(Horsed[c]);
				MoveArray[i] = 0 - parseIntNan(Seed.defunits['city' + CurrentCityId]['unt'+i]);
			}
		}
		if (sel == "S") { // Siege
			for(c=0; c<Siege.length; c++){
				var i = parseInt(Siege[c]);
				MoveArray[i] = 0 - parseIntNan(Seed.defunits['city' + CurrentCityId]['unt'+i]);
			}
		}
		if (parseIntNan(sel) != 0) { // Troop Identifier
			MoveArray[sel] = 0 - parseIntNan(Seed.defunits['city' + CurrentCityId]['unt'+sel]);
		}
	}
	else { // switch to defend
		if (sel == "A") { // All
			for (var ui in uW.cm.UNIT_TYPES){
				i = uW.cm.UNIT_TYPES[ui];
				MoveArray[i] = parseIntNan(Seed.units['city' + CurrentCityId]['unt'+i]);
			}
		}
		if (sel == "I") { // Infantry
			for(c=0; c<Infantry.length; c++){
				var i = parseInt(Infantry[c]);
				MoveArray[i] = parseIntNan(Seed.units['city' + CurrentCityId]['unt'+i]);
			}
		}
		if (sel == "R") { // Ranged
			for(c=0; c<Ranged.length; c++){
				var i = parseInt(Ranged[c]);
				MoveArray[i] = parseIntNan(Seed.units['city' + CurrentCityId]['unt'+i]);
			}
		}
		if (sel == "H") { // Horsed
			for(c=0; c<Horsed.length; c++){
				var i = parseInt(Horsed[c]);
				MoveArray[i] = parseIntNan(Seed.units['city' + CurrentCityId]['unt'+i]);
			}
		}
		if (sel == "S") { // Siege
			for(c=0; c<Siege.length; c++){
				var i = parseInt(Siege[c]);
				MoveArray[i] = parseIntNan(Seed.units['city' + CurrentCityId]['unt'+i]);
			}
		}
		if (parseIntNan(sel) != 0) { // Troop Identifier
			MoveArray[sel] = parseIntNan(Seed.units['city' + CurrentCityId]['unt'+sel]);
		}
	}
	ChangeDefendingTroops (CurrentCityId, MoveArray, false);
}

function ChangeDefendingTroops (cityId, MoveArray, Replace, notify) {
	setTroopMessage('Sending Request...');
	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams)
	params.cid = cityId;
	for (var ui in uW.cm.UNIT_TYPES){
		i = uW.cm.UNIT_TYPES[ui];
		if (Replace) { params["u"+i] = parseIntNan(MoveArray[i]); }
		// set params initially to current defenders, because we're only dealing with troop movements in MoveArray ...
		else { params["u"+i] = parseIntNan(Seed.defunits['city' + cityId]['unt'+i]) + parseIntNan(MoveArray[i]); }
	}

	new MyAjaxRequest(uW.g_ajaxpath + "ajax/cityDefenseSet.php" + uW.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		loading: true,
		onSuccess: function (transport) {
			var rslt = transport;
			if (rslt.ok) {
				var unitsarr = [];
				for (j in unsafeWindow.unitcost)
					unitsarr.push(0);
				for (i = 0; i <= unitsarr.length; i++)
					if (params["u"+i])
						unitsarr[i] = params["u"+i];
				if (rslt.updateSeed) {unsafeWindow.update_seed(rslt.updateSeed)};
				if (rslt.def != null) {
					var unitlist = unsafeWindow.seed.defunits["city" + cityId];
					uW.jQuery.each (rslt.def, function (key, val) {
						var key1 = key.replace ("u", "unt");
						unitlist[key1] = val
					})
				}
				if (rslt.res != null) {
					var unitlist = unsafeWindow.seed.units["city" + cityId];
					uW.jQuery.each (rslt.res, function(key, val) {
						var key1 = key.replace("u", "unt");
						unitlist[key1] = val
					})
				}
				setTroopMessage('&nbsp;');
				SelectDefTroopType (document.getElementById("btDefendTroops"));
				if (notify != null) { notify();} 
				else { PaintCityInfo(cityId); }
			}
			else { // error handling
				if (rslt.msg) { setTroopMessage('<span style="color:#f00">'+rslt.msg+'</span>'); }
				else { setTroopMessage('<span style="color:#f00">Error setting defending troops</span>'); }
			}
			uW.jQuery('#btAddDefendButton').removeClass("disabled");
			uW.jQuery('#btAddPresetButton').removeClass("disabled");
			uW.jQuery('#btReplacePresetButton').removeClass("disabled");
		},
		onFailure: function () { // error handling
			setTroopMessage('<span style="color:#f00">Server connection failed.</span>');
			uW.jQuery('#btAddDefendButton').removeClass("disabled");
			uW.jQuery('#btAddPresetButton').removeClass("disabled");
			uW.jQuery('#btReplacePresetButton').removeClass("disabled");
		}
	},true); //no retry
}

function SelectDefTroopType (sel) {
	if ((sel.value == 0) || (sel.value == "")) {
		document.getElementById('btTotalDefTroops').innerHTML = "";
		document.getElementById('btMaxDefTroops').innerHTML = "";
		TotalSanctuaryTroops = 0;
		return false
	} else {
		TotalSanctuaryTroops = parseIntNan(Seed.units['city' + Seed.cities[Options.CurrentCity][0]]['unt'+sel.value]);
		document.getElementById('btTotalDefTroops').innerHTML = '&nbsp;/&nbsp;'+addCommas(TotalSanctuaryTroops);
		document.getElementById('btMaxDefTroops').innerHTML = '<a id="btMaxDefButton" onclick="btSetMaxDefTroops()"><span style="font-size:9px;" align="center">max</span></a>';
		// set default defender amount
		var elem = document.getElementById('btDefendAmount');
		if ((elem.value == 0) || (elem.value == "")) { elem.value = Options.DefaultDefenceNum; }
		if (parseInt(elem.value) > TotalSanctuaryTroops) {
			elem.value = TotalSanctuaryTroops; 
		}	
	}
}

function SetMaxDefTroops () {
	var elem = document.getElementById('btDefendAmount');
	elem.value = TotalSanctuaryTroops;

}

function AddDefenders () {
	var MoveArray = [];
	var TT = document.getElementById('btDefendTroops');
	var AM = document.getElementById('btDefendAmount');

	if (!TT.value || (TT.value == 0)) {setTroopMessage('<span style="color:#f00">Please select troop type</span>');return;}
	if (!AM.value || (AM.value == 0)) {setTroopMessage('<span style="color:#f00">Please enter a number of troops</span>');return;}
	if (AM.value > TotalSanctuaryTroops) {setTroopMessage('<span style="color:#f00">You do not have enough troops</span>');return;}
	
	uW.jQuery('#btAddDefendButton').addClass("disabled");

	MoveArray[TT.value] = AM.value;
	ChangeDefendingTroops (CurrentCityId, MoveArray, false);
}
  
function NewDefPreset() {
	if (ExpandDefPreset) return;
	document.getElementById('btDefendPreset').value = 0;
	/* Initialise Edit fields */

	for (var ui in uW.cm.UNIT_TYPES) {
		i = uW.cm.UNIT_TYPES[ui];
		document.getElementById('btPresetTroop'+i).value = "";
	}	
	document.getElementById('btDefPresetName').value = 'Defensive Preset #'+NextPresetNumber;	
	
	ExpandDefPreset = true;
	uW.jQuery('#btNewDefPreset').addClass("disabled");
	uW.jQuery('#btChgDefPreset').addClass("disabled");
	uW.jQuery('#btDelDefPreset').addClass("disabled");
	uW.jQuery('#DefEditPresetRow').removeClass("divHide");
}

function ChgDefPreset() {
	if (ExpandDefPreset) return;

	var PN = document.getElementById('btDefendPreset');
	if (!PN.value || (PN.value == 0) || (PN.value.substr(0,1) == 'T')) {return;}
	
	/* Load preset details into edit fields */

	for (var ui in uW.cm.UNIT_TYPES) {
		i = uW.cm.UNIT_TYPES[ui];
		if (Options.DefPresets[PN.value][i]) { document.getElementById('btPresetTroop'+i).value = Options.DefPresets[PN.value][i]; }
		else { document.getElementById('btPresetTroop'+i).value = ""; }
	}	
	document.getElementById('btDefPresetName').value = Options.DefPresets[PN.value][0];	
	
	ExpandDefPreset = true;
	uW.jQuery('#btNewDefPreset').addClass("disabled");
	uW.jQuery('#btChgDefPreset').addClass("disabled");
	uW.jQuery('#btDelDefPreset').removeClass("disabled");
	uW.jQuery('#DefEditPresetRow').removeClass("divHide");
}

function SaveDefPreset() {
	var PN = document.getElementById('btDefendPreset');
	if (PN.value.substr(0,1) == 'T') return;
	if (!PN.value || (PN.value == 0)) { SavePN = NextPresetNumber; }
	else { SavePN = PN.value; }

	Options.DefPresets[SavePN]={};
	for (var ui in uW.cm.UNIT_TYPES) {
		i = uW.cm.UNIT_TYPES[ui];
		TroopVal = document.getElementById('btPresetTroop'+i).value;
		if (!isNaN(TroopVal) && (TroopVal != "")) {
			Options.DefPresets[SavePN][i] = TroopVal;
		}
	}	
	
	Options.DefPresets[SavePN][0] =document.getElementById('btDefPresetName').value;
	setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error
	ExpandDefPreset = false;
	InitPresetNumber = SavePN;
	SetCurrentCity(Seed.cities[Curr][0]);
}

function CancelDefPreset() {
	uW.jQuery('#btNewDefPreset').removeClass("disabled");
	var PN = document.getElementById('btDefendPreset');
	if (PN.value && (PN.value != 0)) { uW.jQuery('#btChgDefPreset').removeClass("disabled"); }
	uW.jQuery('#DefEditPresetRow').addClass("divHide");
	ExpandDefPreset = false;
}

function DelDefPreset() {
	var PN = document.getElementById('btDefendPreset');
	if (!PN.value || (PN.value == 0) || (PN.value.substr(0,1) == 'T')) return;

	Options.DefPresets[PN.value]={};
	delete Options.DefPresets[PN.value];
	setTimeout(function () {saveOptions ();},0); // get around GM_SetValue unsafeWindow error
	ExpandDefPreset = false;
	SetCurrentCity(Seed.cities[Curr][0]);
}

function SelectDefPreset(sel) {
	CancelDefPreset();
	
	if ((sel.value == 0) || (sel.value == "") || (sel.value.substr(0,1) == 'T')) {
		uW.jQuery('#btChgDefPreset').addClass("disabled");
		return false
	} else {
		uW.jQuery('#btChgDefPreset').removeClass("disabled");
	}
	InitPresetNumber = sel.value;
}

function SetPresetDefenders(Replace) {
	CancelDefPreset();
	var MoveArray = [];
	var PN = document.getElementById('btDefendPreset');
	if (!PN.value || (PN.value == 0)) {setTroopMessage('<span style="color:#f00">Please select a defensive preset</span>');return;}
	
	uW.jQuery('#btAddPresetButton').addClass("disabled");
	uW.jQuery('#btReplacePresetButton').addClass("disabled");

	for (var ui in uW.cm.UNIT_TYPES) {
		i = uW.cm.UNIT_TYPES[ui];
		if (PN.value.substr(0,1) == 'T') { // powertools preset
			if (uW.ptDefendFav[PN.value.substr(1)][i]) {
				MoveArray[i] = uW.ptDefendFav[PN.value.substr(1)][i];
			}
		} 
		else {
			if (Options.DefPresets[PN.value][i]) {
				MoveArray[i] = Options.DefPresets[PN.value][i];
			}	
		}
	}	
	ChangeDefendingTroops (CurrentCityId, MoveArray, Replace);
}

function SendHome (marchId) {
	setReinError('&nbsp;');
	uW.jQuery('#btSendHome'+marchId).addClass("disabled");
	ResetHTMLRegister('btReinforceCell')
	var march = {};
	march = Seed.queue_atkinc['m'+ marchId];
    if (!march) { return; }
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.mid = marchId;
    params.cid = march.toCityId;
    params.fromUid = march.fromPlayerId;
    params.fromCid = march.fromCityId;
   
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/kickoutReinforcements.php" + uW.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
			if (rslt.ok){
				var upkeep = 0;
				for (var ui in uW.cm.UNIT_TYPES){
					i = uW.cm.UNIT_TYPES[ui];
					upkeep += parseInt(march["unit" + i + "Return"]) * parseInt(uW.unitupkeeps[i])
				}	
				uW.seed.resources["city"+ march.toCityId].rec1[3] -= upkeep;
				if (parseInt(march.fromPlayerId) == parseInt(uW.tvuid)) {
					var mymarch = uW.seed.queue_atkp["city" + march.fromCityId]["m" + marchId];
					var marchtime = Math.abs(parseInt(mymarch.destinationUnixTime) - parseInt(mymarch.eventUnixTime));
					mymarch.returnUnixTime = unixTime() + marchtime;
					mymarch.marchStatus = 8;
				}
				delete uW.seed.queue_atkinc["m" + marchId];
			} else {
				setReinError(rslt.errorMsg);
			}
        },
        onFailure: function () {
            setReinError(rslt.errorMsg);
        },
    });
}

function setReinError(msg) {
	document.getElementById('btReinErr').innerHTML = msg;
}

function QuickSacrifice (tt) {
	var sel = document.getElementById('btRitualTroops');
	if (!sel) return;
	sel.value = tt;
	SelectTroopType(sel);
	StartRitual(true);
}

function StartRitual (QS) {
	setSacError('&nbsp;');
	var unitid = parseInt(document.getElementById('btRitualTroops').value);
	var numUnits = parseInt(document.getElementById('btRitualAmount').value);
	
	if (!unitid || (unitid == 0)) {setSacError('Please select troop type');return;}
	if (!numUnits || (numUnits == 0)) {setSacError('Please enter a number of troops');return;}
	if (numUnits > TotalTroops) {setSacError('You do not have enough troops');return;}
	
	uW.jQuery('#btStartRitualButton').addClass("disabled");
	
	// see if we need to claw back units from defending units
	
	var clawback = uW.seed.units["city" + CurrentCityId]['unt'+unitid] - numUnits; 
	if (clawback < 0) {
		var MoveArray = [];
		MoveArray[unitid] = clawback;
		ChangeDefendingTroops (CurrentCityId, MoveArray, false, StartRitual(QS));return;
	}
	
	var params = uW.Object.clone(uW.g_ajaxparams);
	params.cid = CurrentCityId;
	params.type = unitid;
	params.quant = numUnits;
	new MyAjaxRequest(uW.g_ajaxpath + "ajax/sacrifice.php" + uW.g_ajaxsuffix, {
		method : "post",
		parameters : params,
		onSuccess : function (rslt) {
			if (rslt.ok) {
				uW.seed.queue_sacr["city" + CurrentCityId].push(rslt.queue_sacr);
				uW.seed.units["city" + CurrentCityId] = rslt.units;
				uW.seed.cityData.city[CurrentCityId].population = rslt.cityData_city.population;
				uW.seed.cityData.city[CurrentCityId].populationCap = rslt.cityData_city.populationCap;
				
				setSacError('&nbsp;');
				document.getElementById('btRitualTroops').value = 0;
				document.getElementById('btTotalTroops').innerHTML = "";
				document.getElementById('btMaxTroops').innerHTML = "";
				if (!QS) {
					document.getElementById('btRitualAmount').value = "";
					document.getElementById('btRitualMinutes').value = "";
					document.getElementById('btRitualSeconds').value = "";
				}	
			} else {
				setSacError(rslt.feedback);
			}
			uW.jQuery('#btStartRitualButton').removeClass("disabled");
		},
		onFailure: function (rslt) {
			setSacError(rslt.errorMsg);
			uW.jQuery('#btStartRitualButton').removeClass("disabled");
		}	
	});
}

function setSacError(msg) {
	document.getElementById('btSacErr').innerHTML = msg;
}

function StopRitual (sacNo, notify){
	uW.jQuery('#btStopRitual'+sacNo).addClass("disabled");
	ResetHTMLRegister('btSacrificeCell');
	var queue = uW.seed.queue_sacr["city" + CurrentCityId][sacNo];
    var params = uW.Object.clone(uW.g_ajaxparams);
	var cityId = CurrentCityId;
	params.cid = cityId;
	params.type = queue.unitType;
	params.quant = queue.quantity;
	params.start = queue.start;
	params.eta = queue.eta;
	new MyAjaxRequest(uW.g_ajaxpath + "ajax/cancelSacrificing.php" + uW.g_ajaxsuffix, {
		method : "post",
		parameters : params,
		onSuccess : function (rslt) {
			if (rslt.ok) {
				uW.seed.queue_sacr["city" + CurrentCityId].splice(sacNo, 1);
				if (CurrentCityId==cityId) {PaintCityInfo(cityId);}
			} 
			uW.jQuery('#btStopRitual'+sacNo).removeClass("disabled");
		},
		onFailure: function () {
			if (notify != null)
				notify(rslt.errorMsg);
			uW.jQuery('#btStopRitual'+sacNo).removeClass("disabled");
        },
    });
}

function SwitchGuardian (elem) {
//	if (GuardDelay > 0) { return; }

	var type = guardTypes[elem.id.substr(9)-1];
	if (type == CurrGuardian) { return; }	

	var level = Seed.guardian[Options.CurrentCity].cityGuardianLevels[type];
	level = level ? level : 0;
	if (level == 0) { return; }

	GuardDelay = 999;
	setGuardMessage('Sending request...');
	
    var params = uW.Object.clone(unsafeWindow.g_ajaxparams);
    params.ctrl = "Guardian";
    params.action = "summon";
    params.cityId = uW.currentcityid;
	params.type = type;
	
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/_dispatch.php" + uW.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		onSuccess: function (rslt) {
			if (rslt.ok) {
				var g = unsafeWindow.cm.guardianModalModel.gObj();
				g.summonGuardian = {
					summonFinishTime: parseInt(rslt.summonFinishTime),
					level: rslt.summonGuardian.cl0,
					type: rslt.summonGuardian.type,
					upgrading: false
				};
				unsafeWindow.seed.guardian[Options.CurrentCity].type = type;
				unsafeWindow.seed.guardian[Options.CurrentCity].level = rslt.summonGuardian.cl0;
				var GType = 0;
				switch(type) {
					case "wood":  GType=50;break;
					case "ore":   GType=51;break;
					case "food":  GType=52;break;
					case "stone": GType=53;break;
				}
				unsafeWindow.seed.buildings["city"+ uW.currentcityid].pos500[0] = GType;
				// need to delay 8 seconds before allowing again
				GuardDelay = 8;
				PaintGuardianSelector();
				var time = parseInt(rslt.summonFinishTime) - unixTime();
				setTimeout(function(){
					unsafeWindow.seed.guardian[Options.CurrentCity].type = type;
					unsafeWindow.seed.buildings["city"+ uW.currentcityid].pos500[0] = GType;
					unsafeWindow.seed.guardian[Options.CurrentCity].level = rslt.summonGuardian.cl0;
				},(time*1000));
			} 
			else {
				GuardDelay = 0;
				PaintGuardianSelector();
				logit("Guardian change failed. Error code: " + rslt.error_code);
				setGuardMessage('<span style="color:#f00">Could not change Guardian.</span>');
			}
		},
		onFailure: function () {
			GuardDelay = 0;
			PaintGuardianSelector();
			logit("Guardian change server error");
			setGuardMessage('<span style="color:#f00">Server connection failed.</span>');
		}
    },true) // noretry
}

function SwitchThroneRoom (elem) {
    clearTimeout(presetTimer);
	var NewPreset = elem.id.substr(6);
	if (NewPreset == Seed.throne.activeSlot) { return; }
//	if (ThroneDelay > 0) { return; }

	ThroneDelay = 999;
	setThroneMessage('Sending request...');

    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
    params.action = 'setPreset';
    params.presetId = NewPreset;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        loading: true,
        onSuccess: function (rslt) {
            if(rslt.ok){
				var H = Seed.throne.slotEquip[NewPreset];
				Seed.throne.activeSlot = NewPreset;
				// set the right items as equiped
				uW.jQuery.each(unsafeWindow.kocThroneItems, function (I, J) {
					C = uW.jQuery.inArray(J.id, H) > -1;
					if (C) {
						J.isEquipped = true;
					} else {
						J.isEquipped = false;
					}
				});
				presetFailures = 0;
				// need to delay 5 seconds before allowing again
				ThroneDelay = 5;
				PaintTRPresets();
            }
			else { // retry?
				presetFailures++;
				ThroneDelay = 0;
				PaintTRPresets();
				logit("Preset change failed. Error code: " + rslt.error_code);
				// try again in 2 seconds
				if (presetFailures <=3) {
					setThroneMessage('<span style="color:#f80">Failed to change Throne Room - Retrying ('+presetFailures+') ...</span>');
					presetTimer = setTimeout( function () {SwitchThroneRoom (elem)}, 2000);
				}
				else {
					setThroneMessage('<span style="color:#f00">Could not change Throne Room.</span>');
					presetFailures = 0;
				}
			}
        },
        onFailure: function () { 
			ThroneDelay = 0;
			PaintTRPresets();
			logit("Preset change server error");
			setThroneMessage('<span style="color:#f00">Server connection failed.</span>');
			presetFailures = 0;
		}, 
    },true); // noretry
}

function PaintTRPresets () {
	if (!(document.getElementById('btTRPresets')) && !(document.getElementById('btMonTRPresets'))) { return; }
	if (ThroneDelay > 10) { return; }
	if ((document.getElementById('btTRPresets')) && !Options.PresetChange) { document.getElementById('btTRPresets').innerHTML = ""; }
	if ((document.getElementById('btMonTRPresets')) && !Options.MonPresetChange) { document.getElementById('btMonTRPresets').innerHTML = ""; }

	var m = '<div class="xtab" style="opacity:0.6; align="center" id=btThroneMsg>&nbsp;</div><TABLE cellspacing=0 cellpadding=0 style="padding-bottom: 10px;" align=center><TR>';
	var n = '<div class="xtab" style="opacity:0.6;font-size:'+Options.MonitorFontSize+'px;" align="center" id=btMonThroneMsg>&nbsp;</div><TABLE cellspacing=0 cellpadding=0 style="padding-bottom: 10px;" align=center><TR>';
	if (Options.TRPresetByName) { m+='<td class="xtabBR" align=center>'; }
	if (Options.TRMonPresetByName) { n+='<td class="xtabBR" align=center>'; }
    for (i=1;i<=Seed.throne.slotNum;i++) {
		if (Options.TRPresetByName) {
			m+='<div id="trpresetcell'+i+'" class="xtabBR trimg" style="display:inline-block"><a class="inlineButton btButton brown11" id="trlink'+i+'"><span style="width:85px;font-size:10px;" id="trpreset'+i+'"><center>'+(Options.TRPresets[i]?Options.TRPresets[i].name:'Preset '+i)+'</center></span></a></div>&nbsp;';
		}
		else {
			m+='<TD id="trpresetcell'+i+'" class="xtab trimg" style="padding-right: 0px;"><a style="text-decoration:none;" id="trlink'+i+'"><div id="trpreset'+i+'" class="presetBut presetButNon"><center>'+i+'</center></div></a></td>';
		}	
		if (Options.TRMonPresetByName) {
			n+='<div id="tmpresetcell'+i+'" class="xtabBR trimg" style="display:inline-block"><a class="inlineButton btButton brown11" id="tmlink'+i+'"><span style="width:'+Math.floor(85*fontratio)+'px;font-size:'+(Options.MonitorFontSize<10?Options.MonitorFontSize:10)+'px;" id="tmpreset'+i+'"><center>'+(Options.TRPresets[i]?Options.TRPresets[i].name:'Preset '+i)+'</center></span></a></div>&nbsp;';
		}
		else {
			if ((Seed.throne.slotNum > 8) && ((i-1) == Math.floor(Seed.throne.slotNum/2))) {
				n+='</tr><TR>';
			}
			n+='<TD id="tmpresetcell'+i+'" class="xtab trimg" style="padding-right: 0px;"><a style="text-decoration:none;" id="tmlink'+i+'"><div id="tmpreset'+i+'" class="presetBut presetButNon"><center>'+i+'</center></div></a></td>';
		}	
	}	
	if (Options.TRPresetByName) { m+='</td>'; }
	if (Options.TRMonPresetByName) { n+='</td>'; }
    m += '</tr></table>';
	n += '</tr></table>';
	if ((document.getElementById('btTRPresets')) && Options.PresetChange) { document.getElementById('btTRPresets').innerHTML = m; }
	if ((document.getElementById('btMonTRPresets')) && Options.MonPresetChange) { document.getElementById('btMonTRPresets').innerHTML = n; ResetFrameSize('btMonitor',MonHeight,MonWidth); }

	if (ThroneDelay != 0) {	setThroneMessage('<span style="color:#080">Throne Room changed! Change again in '+ThroneDelay+' secs...</span>'); }
	else { setThroneMessage('&nbsp;'); }

	CurrPreset = Seed.throne.activeSlot;
	for (i=1;i<=Seed.throne.slotNum;i++) {
		if ((document.getElementById('btTRPresets')) && Options.PresetChange) {
			document.getElementById('trlink'+i).addEventListener ('click', function(){SwitchThroneRoom(this);},false);
			document.getElementById('trpreset'+i).addEventListener ('mouseover', function(){BuildTRPresetStats(this.id.substring(8));},false);
		}
		if ((document.getElementById('btMonTRPresets')) && Options.MonPresetChange) {
			document.getElementById('tmlink'+i).addEventListener ('click', function(){SwitchThroneRoom(this);},false);
			document.getElementById('tmpreset'+i).addEventListener ('mouseover', function(){BuildTRPresetStats(this.id.substring(8));},false);
		}
		if (i==CurrPreset) {
			if ((document.getElementById('btTRPresets')) && Options.PresetChange) {
				if (Options.TRPresetByName) { uW.jQuery("#trlink"+i).removeClass("brown11").addClass("blue11"); }
				else { uW.jQuery("#trpreset"+i).removeClass("presetButNon").addClass("presetButSel"); }
			}	
			if ((document.getElementById('btMonTRPresets')) && Options.MonPresetChange) {
				if (Options.TRMonPresetByName) { uW.jQuery("#tmlink"+i).removeClass("brown11").addClass("blue11"); }
				else { uW.jQuery("#tmpreset"+i).removeClass("presetButNon").addClass("presetButSel"); }
			}	
		} 
		BuildTRPresetStats(i);
	}
}

function BuildTRPresetStats(slot){
	var StatEffects = [];
	var m="";
	for (var k in unsafeWindow.cm.thronestats.effects) StatEffects[k] = 0;
	for (var k in unsafeWindow.kocThroneItems){
		y = unsafeWindow.kocThroneItems[k];
    	for (var ii=0;ii<Seed.throne.slotEquip[slot].length;ii++) {
			if (Seed.throne.slotEquip[slot][ii] == y.id) {
				for (var O in y["effects"]) {
					var i = +(O.split("slot")[1]);
					id = y["effects"]["slot"+i]["id"];
					tier = parseInt(y["effects"]["slot"+i]["tier"]);
					level = y["level"];
					p = unsafeWindow.cm.thronestats.tiers[id][tier];
					while (!p && (tier > 0)) { tier--; p = unsafeWindow.cm.thronestats.tiers[id][tier]; } 
					if (!p) continue; // can't find stats for tier
					if (y["effects"]["slot"+i].fromJewel && (level > uW.cm.thronestats.jewelGrowthLimit[y["effects"]["slot"+i].quality])) {
						level = uW.cm.thronestats.jewelGrowthLimit[y["effects"]["slot"+i].quality]
					}
					Current = p.base + ((level * level + level) * p.growth * 0.5);
					if (i<=parseInt(y.quality)) StatEffects[id] += Current;
				}
			}		
		}
	}
	
	var presetname = (Options.TRPresets[slot]?Options.TRPresets[slot].name:'Preset '+slot);
	
	createToolTip(presetname,document.getElementById('trpresetopt'+slot),StatEffects.slice());
	if ((document.getElementById('btTRPresets')) && Options.PresetChange) { createToolTip(presetname,document.getElementById('trpresetcell'+slot),StatEffects.slice()); }
	if ((document.getElementById('btMonTRPresets')) && Options.MonPresetChange) { createToolTip(presetname,document.getElementById('tmpresetcell'+slot),StatEffects.slice()); }
}


function CancelMarshall() {
	ExpandMarshall = false;
	PaintCityInfo(Seed.cities[Options.CurrentCity][0]);	
}

function ChangeMarshall() {
	ExpandMarshall = true;
	PaintCityInfo(Seed.cities[Options.CurrentCity][0]);	
}

function SetMarshall() {
 	uW.jQuery('#btSetMarshall').addClass("disabled");
	var pos = '13';
	var kid = document.getElementById('btKnightList').value;
	if (kid == "") {kid = "0";}
	var params = uW.Object.clone(uW.g_ajaxparams);
	params.pos = pos;
	params.kid = kid;
	params.cid = uW.currentcityid;
	new MyAjaxRequest(uW.g_ajaxpath + "ajax/assignknight.php" + uW.g_ajaxsuffix, {
		method : "post",
		parameters : params,
		onSuccess : function (rslt) {
			uW.jQuery('#btSetMarshall').removeClass("disabled");
			if (rslt.ok) {
				if (kid == 0) {
					uW.seed.leaders["city" + uW.currentcityid].combatKnightId = "0";
				} else {
					uW.seed.leaders["city" + uW.currentcityid].combatKnightId = kid.toString();
				ExpandMarshall = false;
				PaintCityInfo(Seed.cities[Options.CurrentCity][0]);	
				}
			}
		},
		onFailure : function () { uW.jQuery('#btSetMarshall').removeClass("disabled"); }
	},true); // noretry
}

function BoostMarshall() {
 	uW.jQuery('#btBoostMarshall').addClass("disabled");
	var item = 'i221';
	var kid = Seed.leaders["city" + uW.currentcityid].combatKnightId;
	var params = uW.Object.clone(uW.g_ajaxparams);
	params.iid = item.substring(1);
	params.cid = uW.currentcityid;
	params.kid = kid;
	new MyAjaxRequest(uW.g_ajaxpath + "ajax/boostKnight.php" + uW.g_ajaxsuffix, {
		method : "post",
		parameters : params,
		onSuccess : function (rslt) {
			uW.jQuery('#btBoostMarshall').removeClass("disabled");
			if (rslt.ok) {
				uW.seed.knights["city" + uW.currentcityid]["knt" + kid].combatBoostExpireUnixtime = rslt.expiration.toString();
				uW.seed.items[item] = parseInt(uW.seed.items[item]) - 1;
				uW.ksoItems[item.substring(1)].subtract();
				uW.cm.MixPanelTracker.track("item_use", {
					item : itemlist[item].name,
					usr_gen : Seed.player.g,
					usr_byr : Seed.player.y,
					usr_ttl : uW.titlenames[Seed.player.title],
					distinct_id : uW.tvuid
				})
				PaintCityInfo(Seed.cities[Options.CurrentCity][0]);	
			}
		},
		onFailure : function () { uW.jQuery('#btBoostMarshall').removeClass("disabled"); }
	},true); // noretry
}

function CancelChampion() {
	ExpandChampion = false;
	PaintCityInfo(Seed.cities[Options.CurrentCity][0]);	
}

function ChangeChampion() {
	ExpandChampion = true;
	PaintCityInfo(Seed.cities[Options.CurrentCity][0]);	
}

function FreeChampion() {
 	uW.jQuery('#btFreeChampion').addClass("disabled");
	uW.cm.ChampionManager.updateDefendingCity('null', uW.currentcityid);	
	RefreshChampionData();
}

function SetChampion(elem,free) {
	var champid = elem.id.substr(13);
	var cindex = 'null';
 	uW.jQuery('#'+elem.id).addClass("disabled");

	for (y in Champs.champions) {
		chkchamp = Champs.champions[y];
		if (chkchamp.id) {
			if (chkchamp.id == champid) {
				cindex = ''+chkchamp.index;
				break;
			}	
		}
	}
	
	uW.cm.ChampionManager.updateDefendingCity(cindex, uW.currentcityid);	
	RefreshChampionData();
}

function PaintGuardianSelector () {
	if (!popDef) { return; }
	if (GuardDelay > 10) { return; }

	var Curr = Options.CurrentCity;

	var y_offset =   {wood: " 47% ",	ore: " 72.5% ",	food: " 59.5% ", stone: " 85% "};
	var x_offset =   {plate: 20, junior: 134, teenager: 248, adult: 362, adult2: 476,	adult3: 590};
	var x_by_level = {0: x_offset.plate, 1: x_offset.junior, 2: x_offset.junior, 3: x_offset.junior, 4: x_offset.teenager, 5: x_offset.teenager, 6: x_offset.adult, 7: x_offset.adult, 8: x_offset.adult, 9: x_offset.adult, 10: x_offset.adult2, 11: x_offset.adult3, 12: x_offset.adult3, 13: x_offset.adult3, 14: x_offset.adult3, 15: x_offset.adult3};

	var m = '<TABLE cellspacing=0 cellpadding=0><TR>';

	for (i=1;i<=4;i++) {
		var level = Seed.guardian[Curr].cityGuardianLevels[guardTypes[i-1]];
		level = level ? level : "";
		m+='<TD id="guardcell'+i+'" class="xtab"><a style="text-decoration:none;" id="guardlink'+i+'"><div id="guardimg'+i+'" class="guardBut guardButNon"><center>'+level+'</center></div></a></td>';
	}
	m += '<td class="xtab" style="opacity:0.6; align="left" id=btGuardMsg>&nbsp;</td></tr></table>';
	document.getElementById('btGuardianSelector').innerHTML = m; 

	if (GuardDelay != 0) {	setGuardMessage('<span style="color:#080">Guardian changed!<br>Change again in '+GuardDelay+' secs...</span>'); }
	else { setGuardMessage('&nbsp;'); }

	CurrGuardian = Seed.guardian[Curr].type;
	for (i=1;i<=4;i++) {
		/* show correct portion of image */
		var level = Seed.guardian[Curr].cityGuardianLevels[guardTypes[i-1]];
		level = level ? level : 0;
		var bg_offset =  x_by_level[level]/776*100 + "% " + y_offset[guardTypes[i-1]];
		uW.jQuery("#guardimg"+i).css('background-position', bg_offset);
		
		if (popDef) {
			document.getElementById('guardlink'+i).addEventListener ('click', function(){SwitchGuardian(this);},false);
		}
		if ((guardTypes[i-1]==(CurrGuardian)) && (Seed.guardian[Curr]['level'] != 0)) {
			uW.jQuery("#guardimg"+i).removeClass("guardButNon").addClass("guardButSel"); 
		} 
	}
}

function createChampionToolTip (elem,c) {
	var TempcText = "<table cellspacing=0><tr><td colspan=2><b>Champion Stats</b></td></tr>";

	var gotchamp = false;
	for (cy in c.stats.champion) {
		cs = c.stats.champion[cy];
		gotchamp = true;
		TempcText+="<tr><td>"+cs.name+"</td><td>"+cs.amount+"</td></tr>";
	}	
	if (!gotchamp) { TempcText += '<tr><td colspan=2><i>None Available</i></td></tr>'; }

	TempcText+="<tr><td colspan=2><b>Troop Stats</b></td></tr>";
	var gottroop = false;
	for (ty in c.stats.troop) {
		ts = c.stats.troop[ty];
		gottroop = true;
		TempcText+="<tr><td>"+ts.name+"</td><td>"+ts.amount+"</td></tr>";
	}	
	if (!gottroop) { TempcText += '<tr><td colspan=2><i>None Available</i></td></tr>'; }
	TempcText+="</table>";
	
	unsafeWindow.jQuery('#'+elem.id).children("span").remove();
	unsafeWindow.jQuery('#'+elem.id).append('<span class="trtip">'+TempcText+'</span>');
}

/********************* MONITOR FUNCTIONS *******************************/
  
function initMonitor(uid,Paused) {

	ToggleSleep(false);

	// set booleans and show loading window if not already active..

	userInfo.userLoaded = false;
	ResetHTMLRegister('btUserDiv');
	ResetHTMLRegister('btMonitorDiv');
	MonitoringActive = false;
	MonitoringPaused = Paused;
	if (popMon) {popMon = null;}
	CreateMonitorWindow();

	// get user info first..
	
	fetchPlayerInfo(uid,true,eventLoadMonitor);
}  

function eventLoadMonitor (){
	if (!userInfo.userLoaded) {return;} // error?

	if (MonitoringPaused) {
		eventPaintTRStats();
		StartMonitorLoop();
	}
	else {
		TRStats(StartMonitorLoop);
	}	
}

function CreateMonitorWindow () {
	LastUser = "";
	LastTR = [];
    
	m = '<div style="font-size:'+Options.MonitorFontSize+'px;" id="btMonitor_content"><div id=btCountdownDiv><TABLE width="100%"><tr><td class=xtab align="center">&nbsp;</span></td></tr></table></div><div id=btUserDiv><TABLE><TD class=xtab><br><B>&nbsp;&nbsp;&nbsp;Loading...</b></td></tr></table></div><div id=btMonitorDiv></div><div id=btButtonDiv></div></div>';

	MonWidth=300;
	MonHeight=500;
	
	// adjust width and height based on monitor font size

	fontratio = Options.MonitorFontSize / 11;
	MonWidth = Math.floor(MonWidth * fontratio);
	MonHeight = Math.floor(MonHeight * fontratio);
	
	popMon = new CPopup('btMonitor', Options.MonPos.x, Options.MonPos.y, MonWidth, MonHeight, true, function (){StopMonitoring();Options.MonPos = popMon.getLocation();saveOptions();popMon=null;});
	popMon.getMainDiv().innerHTML = m;
	popMon.getTopDiv().innerHTML = '<DIV align=center><B>&nbsp;&nbsp;&nbsp;Monitor</B></DIV>';
	popMon.show(true);
}

function eventPaintPlayerInfo (){

	if (!userInfo.userLoaded) {return;} // user being changed

	o = "";
	if (userInfo.online) o = ' <span style="color:#f00;">(ONLINE)</span>';

	m = '<div id=btMonTRPresets align=center style="width:352;"></div>'; 
  	m += '<TABLE width="100%"><tr><td class=xtabBR align="center" colspan="3"><B>' + userInfo.name + o +'</b></td></tr>';

	if (!userInfo.online)
	  m+= ' <tr><TD class=xtabBR align="center" colspan="3">'+ getLastLogDuration(userInfo.lastLogin) +'</td></tr>';
	if (userInfo.misted) 
  	  m += '<tr><TD class=xtabBR align="center" colspan="3"><B>*** MISTED (' + getDuration(userInfo.fogExpireTimestamp) + ') ***</b></td></tr>';
  	m += '<tr><TD class=xtab align="center" colspan="3">UID: <B>' + parseInt(userInfo.userId) + '</b>&nbsp;<a id=btProfile>(View Profile)</a></td></tr>';
  	m += '<tr><TD class=xtab align="center" colspan="3">Might: <B>' + addCommas(Math.round(userInfo.might)) + '</b></td></tr>';
	if (userInfo.allianceName) {
	  n = ""; if (!isMyself(userInfo.userId)) n += getDiplomacy(userInfo.allianceId);
  	  m += '<tr><TD class=xtabBR align="center" colspan="3">Alliance: <B>' + userInfo.allianceName + n + '</b></td></tr>';
	}  
  	m += '<tr><TD class=xtabBR align="center" colspan="3">Status: <B>' + GetStatusText(userInfo.warStatus,userInfo.truceExpireTimestamp) + '</b></td></tr>';
  	m += '<tr><TD class=xtab align="center" colspan="3">&nbsp;</td></tr></table>';

	if (CheckForHTMLChange('btUserDiv',m)) {
		document.getElementById('btProfile').addEventListener ('click', function(){showProfile()}, false);
		PaintTRPresets(); 
		ResetFrameSize('btMonitor',MonHeight,MonWidth);
	}	
}

function fetchPlayerInfo (uid, init, notify){

    var params = uW.Object.clone(uW.g_ajaxparams);
    params.uid = uid;
    new uW.Ajax.Request(uW.g_ajaxpath + "ajax/getUserGeneralInfo.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
		rsltInfo = eval("(" + rslt.responseText + ")");
	    if (!rsltInfo.ok) { 
			if (init) {
				if (document.getElementById('btUserDiv')) {
					document.getElementById('btUserDiv').innerHTML = '<TABLE width=100%><TD align=center class=xtab style="color:#f00;"><br><B>Unknown UID</b></td></tr></table>'; 
				}
			}	
			setError('Unknown UID');
			return;
		}	
		
		userInfo = rsltInfo.userInfo[0];
		fetchPlayerStatus (notify);
      },
      onFailure: function (rslt) {
        setError ('AJAX error (server not responding)');
		notify ();
      },
    });
}

function eventPaintTRStats () {

	if (!userInfo.userLoaded) {return;} // user being changed
	
	cText = "";
    var title = userInfo.name+"'s Throne Room";
	if (Options.PVPOnly) {title += ' (PVP Effects)';}
	
  	m = '<TABLE>';

	var SortOrder = [];
	if (Options.AlternateSortOrder) { for (z in AlternateSortOrder) SortOrder.push(AlternateSortOrder[z]); }
	else { for (z in HisStatEffects) SortOrder.push(z);	}

	for (z in SortOrder) {
		var k = SortOrder[z];
		var HisContent = "";
		var LineStyle = '';
		var EndStyle = '';
		
		var PVP = ((AttackEffects.indexOf(parseInt(k)) > -1) || (DefenceEffects.indexOf(parseInt(k)) > -1) || (LifeEffects.indexOf(parseInt(k)) > -1) || (RangeEffects.indexOf(parseInt(k)) > -1) || (SpeedEffects.indexOf(parseInt(k)) > -1) || (AccuracyEffects.indexOf(parseInt(k)) > -1) || (OtherCombatEffects.indexOf(parseInt(k)) > -1) || (OtherPVPEffects.indexOf(parseInt(k)) > -1));
		
		if (Options.MonitorColours) {	
			LineStyle = '<span style="color:#888;">';
			if (AttackEffects.indexOf(parseInt(k)) > -1)
				LineStyle = '<span style="color:#800;">';
			if (DefenceEffects.indexOf(parseInt(k)) > -1)
				LineStyle = '<span style="color:#008;">';
			if (LifeEffects.indexOf(parseInt(k)) > -1)
				LineStyle = '<span style="color:#088;">';
			if (RangeEffects.indexOf(parseInt(k)) > -1)
				LineStyle = '<span style="color:#080;">';
			if (SpeedEffects.indexOf(parseInt(k)) > -1)
				LineStyle = '<span style="color:#000;">';
			if (AccuracyEffects.indexOf(parseInt(k)) > -1)
				LineStyle = '<span style="color:#f80;">';
			if (OtherCombatEffects.indexOf(parseInt(k)) > -1)
				LineStyle = '<span style="color:#808;">';
			if (GlobalEffects.indexOf(parseInt(k)) > -1) {
				LineStyle = LineStyle + '<strong>';
				EndStyle = '</strong>' + EndStyle;
			}
			if (DebuffEffects.indexOf(parseInt(k)) > -1) {
				LineStyle = LineStyle + '<i>';
				EndStyle = '</i>' + EndStyle;
			}
		}	
		if (!Options.PVPOnly || PVP) {
			if (HisStatEffects[k] && (HisStatEffects[k] != 0) && uW.cm.thronestats["effects"][k]) HisContent = (Math.round(HisStatEffects[k]*100)/100) + '% ' + uW.cm.thronestats["effects"][k]["1"];
			if (HisContent != "") { m +='<TR><TD  width="25px" class=xtab></td><TD class=xtab>' + LineStyle + HisContent + EndStyle +'</span></td><TD  width="50px" class=xtab></td></tr>'; cText += HisContent + "||"; }
		}	
	}
	m +='</table>';
    cText = cText.replace(/\|\|\s*$/, "");
    cText = ":::. |" +title + "|| "+ cText;

	if (CheckForHTMLChange('btMonitorDiv',m)) {
		ResetFrameSize('btMonitor',MonHeight,MonWidth);
	}	
	   
// if first TR monitored for this user then add log entry...
// check with last entry added in case of refresh...

    if ((LastUser == "") && !MonitoringPaused) {
		LogUser = "";
		LogTR = [];
		if (CurrLog.length > 0) {
			LogUser = CurrLog[CurrLog.length-1].id;
			LogTR = CurrLog[CurrLog.length-1].tr.slice();
		}
	
		if ((LogUser != userInfo.userId) || (JSON2.stringify(LogTR) != JSON2.stringify(HisStatEffects))) {
			AddToLog(userInfo.userId,userInfo.name,userInfo.allianceName);
		}	
	}
	   
// if changed while monitoring add log entry and play a sound...

    if ((LastUser == userInfo.name) && (JSON2.stringify(LastTR) != JSON2.stringify(HisStatEffects)) && !MonitoringPaused) {
		AddToLog(userInfo.userId,userInfo.name,userInfo.allianceName);
		if (Options.MonitorSound) {
			AudioManager.setSource(SOUND_FILES.monitor);
			AudioManager.setVolume(Options.Volume);
			AudioManager.play();
			setTimeout(function(){AudioManager.stop();}, 2500);
		}	
	}

	LastUser = userInfo.name;
	LastTR = HisStatEffects.slice();
}

function fetchPlayerStatus (notify){

    var params = uW.Object.clone(uW.g_ajaxparams);
	var uid = userInfo.userId;
    params.checkArr = uid;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/getOnline.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
	    userInfo.online = rslt.data[uid];
        fetchCourtInfo (notify);
      },
      onFailure: function (rslt) {
        setError ('AJAX error (server not responding)');
		notify ();
      },
    },true); // no retry
}

function fetchCourtInfo (notify) {
    var params = uW.Object.clone(uW.g_ajaxparams);
	var uid = userInfo.userId;
    params.pid = uid;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/viewCourt.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
	    u = unixTime();
		f = convertTime(new Date(rslt.playerInfo.fogExpireTimestamp.replace(" ","T")+"Z"));
	    userInfo.misted = (f >= u);
	    userInfo.fogExpireTimestamp = rslt.playerInfo.fogExpireTimestamp;
	    userInfo.warStatus = rslt.playerInfo.warStatus;
	    userInfo.truceExpireTimestamp = rslt.playerInfo.truceExpireTimestamp;
	    userInfo.lastLogin = rslt.playerInfo.lastLogin;
	    userInfo.cityCount = rslt.playerInfo.cityCount;
		userInfo.userLoaded = true;
        notify ();
      },
      onFailure: function (rslt) {
        setError ('AJAX error (server not responding)');
		notify ();
      },
    },true); // no retry
}

function TRStats (notify) {
  	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
	params.action = 'getEquipped';
	params.playerId = userInfo.userId;

  	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		loading: true,
		onSuccess: function (rslt) {
			if(rslt.ok){
				for (k in uW.cm.thronestats.effects) HisStatEffects[k] = 0;
				for (kk in rslt.items){
   		 			y = rslt.items[kk];
    	 			if (y != undefined) {
						if (y["jewel"] && y["jewel"]["valid"] == true){
							y["effects"]["slot6"].fromJewel = true;
							y["effects"]["slot6"].quality = y["jewel"].quality;
						}
						for (var O in y["effects"]) {
							var i = +(O.split("slot")[1]);
							id = y["effects"]["slot"+i]["id"];
							tier = parseInt(y["effects"]["slot"+i]["tier"]);
							level = y["level"];
							p = uW.cm.thronestats.tiers[id][tier];
							while (!p && (tier > 0)) { tier--; p = uW.cm.thronestats.tiers[id][tier]; }
							if (!p) { logit('No stats for effect '+id+' in tier '+tier+' or below');continue; } // can't find stats for tier
							var base = p.base || 0;
							var growth = p.growth || 0;
							if (y["effects"]["slot"+i].fromJewel && (level > uW.cm.thronestats.jewelGrowthLimit[y["effects"]["slot"+i].quality])) {
								level = uW.cm.thronestats.jewelGrowthLimit[y["effects"]["slot"+i].quality]
							}
							Current = base + ((level * level + level) * growth * 0.5);
							if (i<=parseInt(y["quality"])) HisStatEffects[id] += Current;
						}
					}
				}
			} else setMonitorError('Error Reading Throne Room');
			if (params.playerId == userInfo.userId) {notify();}
		},
		onFailure: function () {
			setMonitorError('Server Not Responding');
			if (params.playerId == userInfo.userId) {notify();}
		},
	},true); // no retry
}  

function StopMonitoring () {
	userInfo.userLoaded = false;
	MonitoringActive = false;
	Options.MonitorStartState = false;
	saveOptions ();
}

function StartMonitorLoop () {

	eventPaintPlayerInfo();
	eventPaintTRStats();
	
	// show buttons ...

	m = '<TABLE width="100%">';
	m +='<TR><TD class=xtabBR colspan="3"><div align="center"><br><a id=btPostToChat class="inlineButton btButton blue20"><span style="font-size:'+Options.MonitorFontSize+'px;">Post to Chat</span></a>&nbsp;<a id=btOpenTR class="inlineButton btButton blue20"><span style="font-size:'+Options.MonitorFontSize+'px;">Throne Room</span></a>&nbsp;<a id=btPause class="inlineButton btButton blue20"><span style="font-size:'+Options.MonitorFontSize+'px;">Pause</span></a></div></td></tr>';
	m +='</table>';
	document.getElementById('btButtonDiv').innerHTML = m;
	ResetFrameSize('btMonitor',MonHeight,MonWidth);
	document.getElementById('btPostToChat').addEventListener ('click', function(){sendChat()}, false);
	document.getElementById('btPause').addEventListener ('click', function(){TogglePause()}, false);
	document.getElementById('btOpenTR').addEventListener ('click', function(){showTR()}, false);

	MonitorID = userInfo.userId;
	Options.LastMonitored = userInfo.name;
	Options.LastMonitoredUID = userInfo.userId;
	Options.MonitorStartState = true;
	saveOptions();

	if (safecall.indexOf(userInfo.userId) >= 0 && !trusted) {MonitorInterval = 20;}
    MonitorLooper = 0;

	MonitorCountDown = ResetMonitorCountDown;
	MonitoringActive = true;
}

function MonitorTRLoop () {

	if (!userInfo.userLoaded) {return;} // user being changed

    MonitorLooper = MonitorLooper+1;
	if (MonitorLooper > 30) {
		MonitorLooper = 0;
		fetchPlayerInfo (userInfo.userId,false,eventPaintPlayerInfo);
	}  

// check for 15 minute monitor timeout
	
	if (!trusted && !MonitoringPaused) {
		MonitorCountDown = MonitorCountDown - 1;
		if (MonitorCountDown < 1) {
			MonitorTimedOut = true;
			MonitoringPaused = true;
			Options.MonitorStartState = false;
			saveOptions ();
			AudioManager.setSource(SOUND_FILES.timeout);
			AudioManager.setVolume(Options.Volume);
			AudioManager.play();
			setTimeout(function(){AudioManager.stop();}, 2500);
		}
	}

	m = '<TABLE width="100%"><tr><td class=xtab align="center">&nbsp;</span></td></tr></table>';
	if (!trusted && !MonitoringPaused) {
	  o = '<span style="color:#888;">';
	  if (MonitorCountDown <= 30) o = '<span style="color:#f00;">';
	  if (!MonitorTimedOut) m = '<TABLE width="100%"><tr><td class=xtab align="center">'+o+'Monitor timeout in '+uW.timestr(MonitorCountDown)+'</span></td></tr></table>';
	}  
	document.getElementById('btCountdownDiv').innerHTML = m;
	
	if (MonitoringPaused) {
		if (MonitorTimedOut)
			{ popMon.getTopDiv().innerHTML = '<DIV align=center><B>&nbsp;&nbsp;&nbsp;Monitoring Timed Out</B></DIV>'; }
		else
			{ popMon.getTopDiv().innerHTML = '<DIV align=center><B>&nbsp;&nbsp;&nbsp;Monitoring Paused</B></DIV>'; }
		document.getElementById('btPause').innerHTML = '<span style="font-size:'+Options.MonitorFontSize+'px;">Resume</span>'; 
	}	
	else {	
		var dots = "";
		var rem = (MonitorLooper % 2);
		for (var s=0; s<=1; s++) {
			if (s < rem) {dots+="*";}
		}
	
		popMon.getTopDiv().innerHTML = '<DIV align=center><B>&nbsp;&nbsp;&nbsp;'+dots+'&nbsp;Monitoring&nbsp;'+dots+'</B></DIV>'; 
		document.getElementById('btPause').innerHTML = '<span style="font-size:'+Options.MonitorFontSize+'px;">Pause</span>'; 
		
		if (((MonitorLooper % MonitorInterval) == 1) || trusted) { 
			TRStats(eventPaintTRStats);
		}	
	}
}

function showProfile () {
	unsafeWindow.getInfoForAnUser(userInfo.userId);
}

function showTR () {
	var T = {};
	T.id = userInfo.userId;
	T.self = isMyself(userInfo.userId);
	T.name = userInfo.name;
	uW.cm.ModalManager.close();
	uW.cm.ThroneController.getThroneItems(T)
}

function TogglePause () {
	if (MonitoringPaused) {
		MonitoringPaused = false;
		MonitoringTimedOut = false;
		MonitorCountDown = ResetMonitorCountDown;
		Options.MonitorStartState = true;
	}
	else {
		MonitoringPaused = true;
		Options.MonitorStartState = false;
	} 
	saveOptions ();
}
  
/********************************* LOG FUNCTIONS *****************************/

function loadLog() {
	var l = JSON2.parse(GM_getValue ('Log_'+GetServerId(), '[]'));
	if (matTypeof(l) == 'array') { CurrLog = l; }
}

function saveLog() {
	GM_setValue ('Log_'+GetServerId(), JSON2.stringify(CurrLog));
}

function ClearLog() {
	CurrLog = [];
	setTimeout(function () {saveLog ();},0); // get around GM_SetValue unsafeWindow error
	if (popLog) PaintLog();
}

function AddToLog(ID,Name,Alliance) {
	var ts = unixTime();
	var okeep = false;
	var olabel = "";

	// if TR already in log, then remove so we update alliance and date/time stamp...

	var n = CurrLog.length;
	while (n--) {
		LogUser = CurrLog[n].id;
		LogTR = CurrLog[n].tr.slice();
	
		if ((LogUser == userInfo.userId) && (JSON2.stringify(LogTR) == JSON2.stringify(HisStatEffects))) {
			// keep any labels or keep flag!
			okeep = CurrLog[n].keep;
			olabel = CurrLog[n].label;
			CurrLog.splice(n,1);
		}
	}	
	
    while (CurrLog.length >= MaxLogEntries) {
	//make space in the log.. find the earliest entry where keep = false
		var spliced = false;
		for (l in CurrLog) {
			if (!CurrLog[l].keep) {
				CurrLog.splice(l,1);
				spliced = true;
				break;
			}
		}
		//no space, because keep is set on all entries. Log it!
		if (!spliced) {
			logit('No space in Monitor Log!');
			return;
		}
	}  
    CurrLog.push ({ts:ts, id:ID, name:Name, alliance:Alliance, tr:HisStatEffects.slice(), keep:okeep, label:olabel});
	setTimeout(function () {saveLog ();},0); // get around GM_SetValue unsafeWindow error
	if (popLog) PaintLog();
}

function ToggleLog (){

	if (popLog) {
      popLog.toggleHide(popLog)
	}
	else
	{
		m = '<div id="btLog_content"><div id=btLogMain></div></div>';

		popLog = new CPopup('btLog', Options.LogPos.x, Options.LogPos.y, 720, 300, true, function (){popLog = null;});
		popLog.getMainDiv().innerHTML = m;
		popLog.getTopDiv().innerHTML = '<DIV align=center><B>&nbsp;&nbsp;&nbsp;Monitor Log</B></DIV>';

		popLog.show(true);
		PaintLog();
	}
}

function PaintLog() {

	var z = '';
	var r = 0;
	var logshow = false;
	var logfiltered = false;
	
	var bclass = "blue14";
	var btext  = "Clear Log";
  
	var z = '<div align="center"><TABLE cellSpacing=0 width=98% height=0%><tr><td class="xtab">Filter by Name: <INPUT class="btInput" id="btNameFilter" size=16 style="width: 115px" type=text value="'+NameFilter+'" onkeyup="btStartKeyTimer(this,btFilterLog)" onchange="btFilterLog()" />&nbsp;<a class="inlineButton btButton brown8" onclick="btClearNameFilter()"><span>Clear</span></a></td><td class="xtab">Alliance: <INPUT class="btInput" id="btAllianceFilter" size=16 style="width: 115px" type=text value="'+AllianceFilter+'" onkeyup="btStartKeyTimer(this,btFilterLog)" onchange="btFilterLog()" />&nbsp;<a class="inlineButton btButton brown8" onclick="btClearAllianceFilter()"><span>Clear</span></a></td></td><td class="xtab" align=right>('+CurrLog.length+'/'+MaxLogEntries+')</td></tr></table>';
	z += '<TABLE cellSpacing=0 width=98% height=0%><tr><td class="xtabHD" align="center" style="width:20px">&nbsp;</td><td class="xtabHD" style="width:80px"><b>Date/Time</b></td><td style="width:115px" class="xtabHD"><b>Name</b></td><td style="width:115px" class="xtabHD"><b>Alliance</b></td><td class="xtabHD" style="width:145px"><b>Label</b></td><td class="xtabHD" align="center" style="width:30px"><b>Keep</b></td><td class="xtabHD" align="right"><a id=btClearLog class="inlineButton btButton '+bclass+'"><span>'+btext+'</span></a></td></tr></table>';
	z += '<div style="max-height:330px; overflow-y:scroll" align="center"><TABLE id=btLogTable cellSpacing=0 width=98% height=0%>';
	
	var n = CurrLog.length;
	while (n--) {
		var a = CurrLog[n];

		logfiltered = true;
		if ((NameFilter != "") && (a.name.toUpperCase().search(NameFilter.toUpperCase()) < 0)) continue;
		if ((AllianceFilter != "") && (a.alliance.toUpperCase().search(AllianceFilter.toUpperCase()) < 0)) continue;
		
		logshow = true;
		r=r+1;
		rowClass = 'evenRow';		
		var rem = (r % 2);
		if (rem == 1) rowClass = 'oddRow';		

		z += '<tr class="'+rowClass+'">';
		z += '<TD style="width:20px" class="xtab trimg" id="trimg'+n+'" align=left><img src="'+ThroneImage+'"</img></td>';
		z += '<TD style="width:80px" class=xtab>'+formatDateTime(a.ts)+'</td>';
		z += '<TD style="width:115px" class=xtab>'+MonitorLink(a.id,a.name)+'</td>';
		z += '<TD style="width:115px" class=xtab>'+a.alliance+'</td>';
		z += '<TD style="width:145px" class=xtab><INPUT class="btInput" id="btLabel'+n+'" size=20 style="width: 140px" type=text value="'+a.label+'" onkeyup="btStartKeyTimer(this,btUpdateLabel,'+n+')" onchange="btUpdateLabel(this,'+n+')" /></td>';
		z += '<TD style="width:30px" class=xtab align=center><INPUT id="btKeep'+n+'" type=checkbox '+(a.keep?'CHECKED':'')+' onclick="btToggleKeep('+n+')" /></td>';
		z += '<TD class=xtab align=right><a id="btShowLog'+n+'" class="inlineButton btButton brown8" onclick="btShowLog('+n+')"><span>Open</span></a>&nbsp;<a id="btPostLog'+n+'" class="inlineButton btButton brown8" onclick="btPostLog('+ n +')"><span>Post</span></a>&nbsp;<a id="btDeleteLog'+n+'" class="inlineButton btButton brown8" onclick="btDeleteLog('+n+')"><span>Del</span></a></td>';
		z += '</tr>';
    }
  
	if (!logshow) {
		if (!logfiltered)
			z += '<tr><td colspan=6 class=xtab><div align="center"><br><br>No log entries</div></td></tr>';
		else
			z += '<tr><td colspan=6 class=xtab><div align="center"><br><br>No log entries matching search parameters</div></td></tr>';
	}

	z += '</table></div><br>';

	if (popLog) {
		document.getElementById('btLogMain').innerHTML = z;
		document.getElementById('btClearLog').addEventListener ('click', function() {ClearLog();}, false);
		ResetFrameSize('btLog',300,720);
		
		var cItems = document.getElementById('btLogTable').getElementsByClassName('trimg');
		for (var i = 0; i < cItems.length; i++) { createToolTip("",cItems[i],CurrLog[cItems[i].id.substring(5)].tr.slice()); }
		
	}
}

function createToolTip (title,elem,TempStatEffects) {
	var TempcText = "";
	if (title != "") { TempcText += "<b>"+title+"</b><br>&nbsp;<br>"; }
	
	for (k in TempStatEffects) {
		var HisContent = "";
		if (TempStatEffects[k] && (TempStatEffects[k] != 0) && uW.cm.thronestats["effects"][k]) HisContent = (Math.round(TempStatEffects[k]*100)/100) + '% ' + uW.cm.thronestats["effects"][k]["1"];
		if (HisContent != "") { TempcText += HisContent + "<br>"; }
	}
	
	unsafeWindow.jQuery('#'+elem.id).children("span").remove();
	unsafeWindow.jQuery('#'+elem.id).append('<span class="trtip">'+TempcText+'</span>');
}

function ShowLog(entry) {
	HisStatEffects = CurrLog[entry].tr.slice();
	
	// display monitor in paused mode showing selected entry
	
	initMonitor(CurrLog[entry].id, true);
}

function ToggleKeep(entry) {
	CurrLog[entry].keep = !CurrLog[entry].keep;
	setTimeout(function () {saveLog ();},0); // get around GM_SetValue unsafeWindow error
}

function UpdateLabel(elem,entry) {
	if (KeyTimer) { clearTimeout(KeyTimer); }
	CurrLog[entry].label = elem.value;
	setTimeout(function () {saveLog ();},0); // get around GM_SetValue unsafeWindow error
}

function PostLog(entry) {
	var TempStatEffects = CurrLog[entry].tr.slice();
	var TempcText = "";
	
    var title = CurrLog[entry].name+"'s Throne Room";
	if (Options.PVPOnly) {title += ' (PVP Effects)';}

	for (k in TempStatEffects) {
		var HisContent = "";
		var PVP = ((AttackEffects.indexOf(parseInt(k)) > -1) || (DefenceEffects.indexOf(parseInt(k)) > -1) || (LifeEffects.indexOf(parseInt(k)) > -1) || (RangeEffects.indexOf(parseInt(k)) > -1) || (SpeedEffects.indexOf(parseInt(k)) > -1) || (AccuracyEffects.indexOf(parseInt(k)) > -1) || (OtherCombatEffects.indexOf(parseInt(k)) > -1) || (OtherPVPEffects.indexOf(parseInt(k)) > -1));
		if (!Options.PVPOnly || PVP) {
			if (TempStatEffects[k] && (TempStatEffects[k] != 0) && uW.cm.thronestats["effects"][k]) HisContent = (Math.round(TempStatEffects[k]*100)/100) + '% ' + uW.cm.thronestats["effects"][k]["1"];
			if (HisContent != "") { TempcText += HisContent + "||"; }
		}	
	}
    TempcText = TempcText.replace(/\|\|\s*$/, "");
    TempcText = ":::. |" +title + "|| "+ TempcText;
	
	
	document.getElementById ("mod_comm_input").value = TempcText;
	uW.Chat.sendChat ();
}

function DeleteLog(entry) {
	CurrLog.splice(entry,1);
	setTimeout(function () {saveLog ();},0); // get around GM_SetValue unsafeWindow error
	if (popLog) PaintLog();
}

function StartKeyTimer(elem,notify,entry) {
	if (KeyTimer) { clearTimeout(KeyTimer); }
	KeyTimer = setTimeout( function () {notify(elem,entry);},1000);
}

function FilterLog() {
	if (KeyTimer) { clearTimeout(KeyTimer); }
	NameFilter = document.getElementById('btNameFilter').value;
	AllianceFilter = document.getElementById('btAllianceFilter').value;
	PaintLog();	
}

function ClearNameFilter() {
	if (KeyTimer) { clearTimeout(KeyTimer); }
	document.getElementById('btNameFilter').value = "";
	FilterLog();	
}

function ClearAllianceFilter() {
	if (KeyTimer) { clearTimeout(KeyTimer); }
	document.getElementById('btAllianceFilter').value = "";
	FilterLog();	
}

function UseDove (iid) {
    var params = uW.Object.clone(uW.g_ajaxparams);
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/doveOut.php" + uW.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		onSuccess: function (rslt) {
			if (rslt.ok) {
				var boostTime = 43200;
				Seed.player.truceExpireUnixTime = uW.unixtime() + boostTime;
				Seed.player.warStatus = 3;
				uW.cm.InventoryView.removeItemFromInventory(iid);
				uW.update_boosts()
			} else {
				uW.Modal.showAlert(uW.printLocalError(rslt.error_code, rslt.msg, rslt.feedback))
			}
		},
		onFailure: function () {}
	},true); // noretry
}
  
// ************************* Startup ************************************

btStartup ();
