
﻿// ==UserScript==
// @name            Reserved
// @icon            http://img528.imageshack.us/img528/6439/17489034175088253191120.jpg
// @description     Reserved
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
// @version         Created 22.2.2012 V1 Beta
// ==/UserScript==

(function() {

var scriptVersion	= '22.2.2012';
var scriptId = 'Petauri Assassini';

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
if (/(pixelkabam|akamaihd|plugins|ai\.php|talkgadget|apps\-static|notifications|contactPicker|accounts|googleapis\.com\/static)/.test(window.location.href)) return;

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
				// Jawz - 03/10/2011
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
				// Jawz - 03/10/2011
				document.scrollTop = '42px';
				if (USE_BACKGROUND) {
					var body_elements = document.getElementsByTagName ('body');
					for (var el=0; el < body_elements.length; el++)
						body_elements[el].style.background = '#888 url(http://sheamacleod.files.wordpress.com/2011/07/reddragon.jpg)';
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
		//$J('#container').css({width:'760px',height:'860px'});
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
				if (REMOVE_HD) document.getElementById('hd').style.display = 'none'; //
Dav3 - 22/2/2012
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
						body_elements[el].style.background = '#888 url(http://sheamacleod.files.wordpress.com/2011/07/reddragon.jpg)';
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
var api_version		= '20111215';
var map_api_version = '20111215';

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
 'row_headers_left',
 'scrollable',
 'status_feedback',
 'status_report',
 'status_ticker',
 'subtitle',
 'support_link',
 'table',
 'table_headers',
 'title',
 'red',
 'green',
 'btn_disabled',
 'title_main',
 'info_protect',
 'info_alerts',
 ];

// Skins
var urlBackgroundImage = ''; //'http://img70.xooimage.com/files/3/8/3/pfdnewbackgroundfix-2b96f19.jpg';
//                       'http://img74.xooimage.com/files/3/a/6/pfdnewbackground-2b861f9.gif';
//                       'http://img72.xooimage.com/files/7/8/0/skinewscript-2b4ed29.jpg';
//                       'http://img66.xooimage.com/files/9/b/e/skin-3-2aac15d.jpg';
var urlBackgroundLogo = 'http://img73.xooimage.com/files/4/3/1/logojaws-2b7e9d0.jpg';

// Alert sound
var DEFAULT_ALERT_SOUND_URL = 'http://koc.god-like.info/alarm.mp3';
var SWF_PLAYER_URL = 'http://koc.god-like.info/player_mp3_multi_1.2.1.swf';

// Tab order
var INFO_TAB_ORDER		= 1;     
var LAVORO_TAB_ORDER		= 2;
var WAVE_TAB_ORDER		= 3;
var MULTI_TAB_ORDER		= 80;  // Dav3
var SPIA_TAB_ORDER		= 81;  // Dav3
var ATTACCO_TAB_ORDER	= 6;
var ALLEANZA_TAB_ORDER	= 7;  // Jawz
var CERCA_TAB_ORDER	= 8;  // Jawz
var BATTAGLIA_TAB_ORDER	= 9; // Jawz
var TORRE_TAB_ORDER		= 10; // Dav3
var LOG_TAB_ORDER		= 78;
var OPZIONI_TAB_ORDER	= 77;
var DEBUG_TAB_ORDER		= 99;

// Tab enable/disable
var INFO_TAB_ENABLE		= true;     
var WAVE_TAB_ENABLE		= true;
var ATTACCO_TAB_ENABLE	= true;
var LAVORO_TAB_ENABLE		= true;
var LOG_TAB_ENABLE		= true;
var OPZIONI_TAB_ENABLE	= true;
var DEBUG_TAB_ENABLE	= true;
var MULTI_TAB_ENABLE	= true; // Dav3
var SPIA_TAB_ENABLE		= true; // Dav3
var CERCA_TAB_ENABLE	= true; // Dav3
var BATTAGLIA_TAB_ENABLE	= true; // Dav3
var ALLEANZA_TAB_ENABLE	= true; // Dav3
var TORRE_TAB_ENABLE	= true; // Dav3

// CHECK THESE VARIABLES
var DEBUG_TRACE_AJAX	= 2;
var DEBUG_MARCHES		= false;
var MAP_DELAY			= 1250;
var MIN_DELAY			= 15;
var EMULATE_NET_ERROR	= 0;  // percentage
var ENABLE_WINLOG		= false;
var ALERT_ON_BAD_DATA	= false;
var KABAM_CHECK 		= false;  // Jawz
var MIN_DELAY_BETWEEN_WAVE = 30;

var BUTTON_BGCOLOR		= '#437';
var LAVORO_BUTTON_BGCOLOR	= '#437'; //'#049C93'; // Jawz

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
var FROST_OUTPOST_ID = 2;
var WATER_OUTPOST_ID = 3;
var STONE_OUTPOST_ID = 4;
var FIRE_OUTPOST_ID = 5;
var WIND_OUTPOST_ID = 6;

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
var kSwamp				= 'Swamp'
;

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
// Jawz - Added for spectral outpost
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
var kPackDragon			= 'PackDragon';

// Dragons
var kFireDragon			= 'FireDragon';
var kGreatDragon		= 'GreatDragon';
var kStoneDragon		= 'StoneDragon';
var kWaterDragon		= 'WaterDragon';
var kWindDragon			= 'WindDragon';
var kSpectralDragon		= 'SpectralDragon';

// Troop abbreviations
var kATrans		= 'ATrans';
var kWTroop		= 'Banshee';
var kBatDrg		= 'BatDrg';
var kConscr		= 'Conscr';
var kATroop		= 'Fang';
var kFireM		= 'FireM';
var kFireDrg	= 'FireDrg';
var kGrtDrg		= 'GrtDrg';
var kHalbrd		= 'Halbrd';
var kFTroop		= 'Magma';
var kLBM		= 'LBM';
var kMino		= 'Mino';
var kSTroop		= 'Ogre';
var kSSDrg		= 'SSDrg';
var kStnDrg		= 'StnDrg';
var kWatDrg		= 'WatDrg';
var kWndDrg		= 'WndDrg';
var kPackDrg	= 'PackDrg';
var kSpctDrg	= 'SpctDrg';

// Items
var kAquaTroopRespirator	= 'AquaTroopRespirator';
var kStoneTroopItem			= 'StoneTroopItem';
var kFireTroopItem			= 'FireTroopItem';
var kWindTroopItem			= 'WindTroopItem';

var kGDBodyArmor			= 'GreatDragonBodyArmor';
var kGDClawGuards			= 'GreatDragonClawGuards';
var kGDHelmet				= 'GreatDragonHelmet';
var kGDTailGuard			= 'GreatDragonTailGuard';

// Error messages
var kFatalSeedTitle	= 'ERROR WHILST FETCHING DATA FROM SERVER';
var kFatalSeedMsg	= 'Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again.';


// Main arrays used in the script
// Troops arrays
var all_unit_types		= [	kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror,	kPackDragon, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop];
var capital_units		= [	kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror ];
var water_outpost_units	= [	kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kPackDragon,	kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop];
var stone_outpost_units	= [	kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kPackDragon,	kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop];
var fire_outpost_units	= [	kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kPackDragon,	kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop];
var wind_outpost_units	= [	kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kPackDragon,	kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop];
var all_trainable_units	= [	kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop];
var attack_unit_types	= [	kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kPackDragon,	kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop];
var wave_unit_types		= [	kSpy, kArmoredTransport, kPackDragon, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop];
var spy_unit_types		= [	kSpy ];
var transport_unit_types= [	kPorter, kATrans, kPackDrg ]; // Beware : Use abbreviations here
// Resources arrays
var all_resource_types				= [	'gold', 'food', 'wood', 'ore', 'stone', 'blue_energy'];
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
var resource_item_list  = ['Wood500K', 'Wood250K', 'Wood80K', 'Wood50K', 'Wood25K', 'Wood10K', 'Stone500K', 'Stone250K', 'Stone80K', 'Stone50K', 'Stone25K', 'Stone10K', 
							'Food500K', 'Food250K', 'Food80K', 'Food50K', 'Food25K', 'Food10K', 'Ore500K', 'Ore250K', 'Ore80K', 'Ore50K', 'Ore25K', 'Ore10K', 
							'Gold200K', 'Gold50K', 'Gold25K', 'Gold10K'];
var time_item_list       = ['Blink', 'Hop', 'Skip', 'Jump', 'Leap', 'Bounce', 'Bore', 'Bolt', 'Blast', 'Blitz', 'TestroniusPowder', 'ForcedMarchDrops', 'TranceMarchDrops' ];
var production_item_list = ['AtlagenHarvestNanosDay', 'AtlagenHarvestNanosWeek', 'DryadForestNanosDay', 'DryadForestNanosWeek', 'OreadStoneNanosDay', 'OreadStoneNanosWeek', 
							'EpeoradMetalsNanosDay', 'EpeoradMetalsNanosWeek', 'DoubleTaxDayDeclaration', 'DoubleTaxWeekDeclaration', 'NanoCollectorWeek', 'NanoCollectorDay' ];
var general_item_list    = ['MassNullifier', 'CompletionGrant', 'DragonHearts', 'GlowingShields', 'CeaseFireTreaty', 'DarkWarpDevice', 'ChartedWarpDevice', 'PseudonymGrant', 
							'RenameProclamation', 'PurpleBones', 'CrimsonBull', 'FortunasTicket', 'FortunasGoldenTicket', 'OutpostWarp', 'DivineLigth', 'AncestralSeal',
							'RaceChangeItem', 'NomadicRecruits', 'DivineRations', 'MomentaryTruce', 'ArmisticeAgreement' ];
var chest_item_list      = ['NanoCanisters', 'CompletionGrantPortfolio', 'NanoCrates', 'TimeTrickstersBag'];
var arsenal_item_list    = ['AquaTroopRespirator', 'AquaTroopRespiratorStack100', 'AquaTroopRespiratorStack500', 'AquaTroopRespiratorStack1000',
							'StoneTroopItem', 'StoneTroopItemStack100', 'StoneTroopItemStack500', 'StoneTroopItemStack1000',
							'FireTroopItem', 'FireTroopItemStack100', 'FireTroopItemStack500', 'FireTroopItemStack1000',
							'WindTroopItem', 'WindTroopItemStack100', 'WindTroopItemStack500', 'WindTroopItemStack1000',
							'CurseWorms', 'CurseFrogs', 'CurseBats', 'CurseLocusts', 'PackDragon1000TroopPrizeItem',
							'AnthropusTalisman', 'AnthropusTalisman50K' ];
