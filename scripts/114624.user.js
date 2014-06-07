// ==UserScript==
// @name          Phoenix Legions
// @namespace     Phoenix Legions 1.2
// @description   PL
// @include       *://apps.facebook.com/dragonsofatlantis/*
// @include       *://*.castle.wonderhill.com/platforms/facebook/game
// @exclude       *://apps.facebook.com/dragonsofatlantis/rubies
// @match         *://apps.facebook.com/dragonsofatlantis/*
// @match         *://*.castle.wonderhill.com/platforms/facebook/game
// @include       *://plus.google.com/games/659749063556*
// @include       *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @match         *://plus.google.com/games/659749063556*
// @match         *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @version       1.2
// @icon          http://img207.imageshack.us/img207/1284/30134320735812266269810.jpg
// ==/UserScript==

 
(function() {
var window = unsafeWindow || window;


if ( !( (/apps\.facebook\.com\/dragonsofatlantis/.test(document.location.href) && /rubies/.test(document.location.pathname) == false) ||
		/castle\.wonderhill\.com\/platforms\/facebook\/game/.test(document.location.href) ||
		/plus\.google\.com\/games\/659749063556/.test(document.location.href) || 
		/googleusercontent\.com\/gadgets\/ifr\?url\=app\:\/\/659749063556/.test(document.location.href)
	)){
		return;
}


// Year, Month, Day, Revision, Maturity (e.g. YYYMMDDa_BETA)
var SCRIPT_VERSION	= '20111010a'; 

var API_VERSION		= 18;

// Change only if made any changes in the structure of the Data Object
var DATA_VERSION	= '20111010a'; 

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


if (window.top == window.self) {

	if (/facebook/.test(document.location.href)) {
		addStyle('#globalContainer, #globalContainer div {width: 100% !important; margin:0 !important; border:0px !important;} #rightCol {display:none !important;} #blueBar {position:relative !important;}');
	} else {
		addStyle('.G3, .Mca, .c-C, .yI {width: 100% !important;} .yI {margin:0 !important;} .Pca {display:none !important;}');
	}
	return;
}
else {

	function waitFacebookObj() {
		var el = document.getElementsByTagName('object');
		if (el.length < 1 || document.location.hostname.indexOf("realm") == -1) {
			setTimeout (waitFacebookObj, 1000);
			return;
		}

		try{
			var el = el[0];
			while ((el = el.parentNode) != null) {
				if (el.tagName == 'DIV')
					el.style.margin = '0';
			}
		} catch(e){alert('function waitFacebookObj() : ' + e);}
	
		try{
			var hd = document.getElementById('hd');
			hd.firstChild.nextSibling.style.display = 'none';
			document.getElementById('cn').parentNode.appendChild(hd);
		} catch(e){alert('function waitFacebookObj() : ' + e);}
		
		try{
			document.getElementById('ft').style.display = 'none';
		} catch(e){alert('function waitFacebookObj() : ' + e);}

		setTimeout (initScript, 1000);
	}
	
	function waitGoogleObj() {
		var obs = document.getElementsByTagName('object');
		if (obs.length < 1) {
			setTimeout (waitGoogleObj, 1000);
			return;
		}
		
		try{
			document.getElementById('pane_hd').style.display = 'none';
			document.getElementById('hd').style.display = 'none';
		}catch(e){}

		setTimeout (initScript, 1000);
	}
	
	if (/facebook/.test(document.location.href)){
		waitFacebookObj();
	} else {
		waitGoogleObj();
	}
}




// Global Variables
var  AutoCollect,
 Buildings,
 Data, 
 DefaultDataOptions,
 FlashVars = {},
 LangObject,
 Manifest, 
 Map, 
 Messages,
 MyAjax, 
 RequestQueue,
 ScriptStyles,
 mainPopup, 
 Seed,
 Tabs = {},
 ToTranslate = {},
 Translation,
 UID = {},
 UIDN = {},
 VerboseLog;
 
 // Global Functions
 var translate = verboseLog = actionLog = function(){};
 

/********************************************************************************
* All global variables MUST be set here or they will not be available to all   *
* functions throughout the script.                                             *
********************************************************************************/

var SCRIPT_NAME		= 'Phoenix Legions';
var SCRIPT_URL_ERROR	= '';
var SCRIPT_TITLE		= '';


// Tab order
var INFO_TAB_ORDER		= 1;     
var WAVE_TAB_ORDER		= 2;
var ATTACK_TAB_ORDER	= 3;
var JOBS_TAB_ORDER		= 4;
var LOG_TAB_ORDER		= 5;
var OPTIONS_TAB_ORDER	= 6;
var DEBUG_TAB_ORDER		= 99;

// Tab enable/disable
var INFO_TAB_ENABLE		= true;     
var WAVE_TAB_ENABLE		= true;
var ATTACK_TAB_ENABLE	= true;
var JOBS_TAB_ENABLE		= true;
var LOG_TAB_ENABLE		= true;
var OPTIONS_TAB_ENABLE	= true;
var DEBUG_TAB_ENABLE	= false;

// CHECK THESE VARIABLES
var SCRIPT_STARTUP_DELAY= 7000;
var DEBUG_TRACE_AJAX	= 2;
var DEBUG_MARCHES		= false;
var MAP_DELAY			= 1250;
var ATTACK_MIN_DELAY	= 30;
var EMULATE_NET_ERROR	= 0;  // percentage
var ENABLE_WINLOG		= false;
var ALERT_ON_BAD_DATA	= false;


var BUTTON_BGCOLOR		= '#436';
var JOB_BUTTON_BGCOLOR	= '#049C93';
var TIMER_COLOR 		= '#2B4988';

var LANG_CODE = navigator.language.substring(0,2).toLowerCase();
var IS_NOT_NATIVE_LANG = (LANG_CODE != 'en');

var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;


var TITLE_WORDS = ['aerialcombat', 'alliance', 'ancestralseal', 'aquatroop', 'armor', 'army', 'arsenal', 'blast', 'blitz', 'bog', 'bolt', 'bore', 'chest', 'complete', 'crimsonbull', 'dragonhearts', 'darkwarpdevice', 'divinelight', 'divinerations', 'field', 'firedragon', 'firetroop', 'fog', 'forest', 'fortress', 'giant', 'gold', 'greatdragon', 'hop', 'lake', 'levitation', 'life', 'lumbermill', 'metalsmith', 'might', 'military', 'mining', 'minotaur', 'mountain', 'ore', 'outposts', 'plain', 'purplebones', 'quarry', 'rookery', 'rubies', 'silo', 'skip', 'source', 'speed', 'spy', 'stone', 'technology', 'wall', 'warp', 'wildernesses', 'windtroop', 'wood', 'world'];


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

// Dragons
var kFireDragon			= 'FireDragon';
var kGreatDragon		= 'GreatDragon';
var kStoneDragon		= 'StoneDragon';
var kWaterDragon		= 'WaterDragon';
var kWindDragon			= 'WindDragon';

// Troop abbreviations
var kATrans		= 'ATrans';
var kATroop		= 'ATroop';
var kBatDrg		= 'BatDrg';
var kConscr		= 'Conscr';
var kFireDrg	= 'FireDrg';
var kFireM		= 'FireM';
var kFTroop		= 'FTroop';
var kGrtDrg		= 'GrtDrg';
var kHalbrd		= 'Halbrd';
var kLBM		= 'LBM';
var kMino		= 'Mino';
var kSSDrg		= 'SSDrg';
var kStnDrg		= 'StnDrg';
var kSTroop		= 'STroop';
var kWatDrg		= 'WatDrg';
var kWndDrg		= 'WndDrg';
var kWTroop		= 'WTroop';

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
var kFatalSWF		= '<B>Error initializing:</b><BR><BR>Unable to find SWF element';
var kStartupErr		= 'Unable to start $SCRIPT_NAME$ <BR>';
var kInitErr		= '<B>Error initializing:</b><BR><BR>';










function initScript () {

/*******************************************************************************
***************************      TRANSLATIONS      ****************************
*******************************************************************************/
switch ( LANG_CODE ){

	/*******************************************************************************
		Hollandaises (Dutch)
	*******************************************************************************/
case 'nl':
	LangObject = {
	'above the first value':'boven de eerste waarde',
	'Action Logs': 'Actie Logs',
	'Actions': 'Acties',
	'and': 'en',
	'Are you sure you want to':'Ben je zeker dat je wilt',
	'at': 'bij',
	'Attack One Target in Waves': 'Een Aanval Doel in Golven',
	'Attack sent to': 'Aanval verzonden naar',
	'Attacking': 'Aanvallen',
	'Attacks Configuration': 'Aanvallen Configuratie',
	'Attacks Logs': 'Aanvallen Logs',
	'Attacks stopped momentarily to prevent server blocking':'Aanvallen stopte even naar de server blokkeren te voorkomen',
	'Attacks': 'Aanvallen',
	'Attempted': 'Poging tot',
	'Auto Refresh every':'Auto Vernieuwen om de',
	'Automatically': 'Automatisch',
	'Awaiting task completion notification': 'In afwachting van voltooiing van de taak melding',
	'Building': 'Bebouw',
	'Busy': 'Bezig',
	'by': 'door',
	'Clear last attack on all maps': 'Duidelijke laatste aanval op alle kaarten',
	'Clear last attack on current map': 'Duidelijke laatste aanval op de huidige kaart',
	'Config': 'Configuratie',
	'Console Logs': 'Troosten Logs',
	'Console': 'Troosten',
	'Coordinates': 'Coördinaten',
	'Days': 'Dagen',
	'Delay Between Attacks': 'Vertraging tussen de aanvallen',
	'Disabled': 'Deactiveren',
	'Distance must be between': 'Afstand moet worden tussen',
	'Distance': 'Afstand',
	'Enable': 'Inschakelen',
	'Enabled': 'Ingeschakeld',
	'Error': 'Error',
	'First value must be between': 'Eerste waarde moet tussen',
	'Game Options': 'Spelopties',
	'Going to the coords':'Gaan om de coördinaten',
	'Hiding': 'Hiding',
	'Hour': 'Uur',
	'Hours': 'Uur',
	'Info': 'Info',
	'Invalid Date From': 'Ongeldige datum Vanuit',
	'Invalid Date To': 'Ongeldige datum To',
	'Invalid delays': 'Ongeldige vertragingen',
	'Invalid number of troops': 'Ongeldig aantal troepen',
	'Invalid Range Date': 'Ongeldige Range datum',
	'Last Attack': 'Laatste Aanval',
	'Loaded': 'Geladen',
	'Logs': 'Logs',
	'Manual attack sent to': 'Handmatig Aanval verzonden naar',
	'Maximum simultaneous marches': 'Maximaal gelijktijdige marsen',
	'miles':'mijlen',
	'Minimum Housing': 'Minimum Behuizing',
	'Minimum Resource Levels': 'Minimum Hulpbron Niveaus',
	'Minutes': 'Notulen',
	'Full': 'Volledige',
	'No Generals Available': 'Geen generaals beschikbaar',
	'No targets or troops available': 'Geen targets of troepen beschikbaar zijn',
	'No troops available': 'Geen troepen beschikbaar',
	'No Troops Defined': 'Geen troepen Defined',
	'Not enough': 'Niet genoeg',
	'Not': 'Niet',
	'of inactivity':'van inactiviteit',
	'of': 'van',
	'Opening the map on the last position':'Het openen van de kaart op de laatste positie',
	'Options': 'Opties',
	'Outpost 1': 'Stad van Water',
	'Outpost 2': 'City of Stone',
	'Outpost 3': 'City of Fire',
	'Outpost 4': 'Stad van de Wind',
	'Permanent Data':'Permanente Gegevens',
	'Preparing Attack':'Voorbereiden aanval',
	'Refresh': 'Verversen',
	'Researching': 'Onderzoek',
	'Retry in':'Opnieuw in',
	'Run Time': 'Uitvoeringstijd',
	'Safe Mode': 'Veilige Modus',
	'Scanning Map': 'Scannen kaart binnen $NUM$ mijl <BR> Dit duurt ongeveer een tijd',
	'Script Options': 'Script opties',
	'Search Radius':'Zoek in een straal',
	'Second value must be at least':'Tweede waarde moet minimaal',
	'Seconds': 'Seconden',
	'Send Dragon every certain number of waves':'Stuur Dragon elk aantal Golf',
	'Start Date': 'Startdatum',
	'Stop if any troops lost': 'Stop eventueel troepen verloren',
	'Successfully': 'Succesvol',
	'Summary': 'Overzicht',
	'Targets': 'Doelen',
	'Task Completed': 'Taak voltooid',
	'Tasks': 'Taken',
	'Too many errors,  disabling auto train': 'Te veel fouten, het uitschakelen van automatische trein',
	'Too many troops for muster point level': 'Te veel troepen voor verzamelpunt niveau',
	'Training Configuration': 'Opleiding Configuratie',
	'Training queue': 'Opleiding wachtrij',
	'Troops for Wave Attack': 'Troepen voor Golfaanval',
	'Troops lost': 'Troepen verloren',
	'Troops Not Defined': 'Troepen niet gedefinieerd',
	'Turned Off': 'Uitgeschakeld',
	'Use the Levels Tab to select attack areas': 'Gebruik het tabblad Niveaus om aan te vallen gebieden te selecteren',
	'Userset maximum marches reached': 'Userset maximale marsen bereikt',
	'Verbose logging': 'Uitgebreide logging',
	'waiting': 'wachten',
	'Warnings': 'Waarschuwingen',
	'Wave attack to': 'Golf te vallen',
	'Wave': 'Golf',
	'Window drag': 'Venster slepen',
	'~Zzz':'Zzz'
	};
	break;
	
default:
	LangObject = {
	'Scanning Map':'Scanning map within $NUM$ miles<BR>This should take about a time',
	'~AquaTroop':'A Troop',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'ArmTrans',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'Bat Drg',		/* idem as above */
	'~Conscript':'Conscr',			/* idem above */
	'~FireDragon':'Fire Drg',		/* idem */
	'~FireMirror':'Fire Mir',		/* idem */
	'~FireTroop':'F Troop',			/* idem */
	'~Giant':'Giant',				/* idem */
	'~GreatDragon':'Grt Drg',		/* idem */
	'~Halberdsman':'Halbrd',		/* idem */
	'~Longbowman':'LB Man',			/* idem */
	'~Minotaur':'Mino',				/* idem */
	'~Porter':'Porter',				/* idem */
	'~Spy':'Spy',					/* idem */
	'~StoneDragon':'Stn Drg',		/* idem */
	'~StoneTroop':'S Troop',		/* idem */
	'~SwiftStrikeDragon':'SS Drg',	/* idem */
	'~WaterDragon':'Wat Drg',		/* idem */
	'~WindDragon':'Wnd Drg',		/* idem */
	'~WindTroop':'W Troop',			/* idem */
	'~Zzz':'Zzz'
	};
}


/********************************************************************************
* All id and class names must be scrambled to prevent the script from being    *
* blocked. These names have to be generated and allocated to CSS prior to      *
* rest of the script being initialised.                                        *
*                                                                              *
* styleList is an array containing the normal names for each class. This       *
* is then looped through and then scrambled to generate a unique name. A check *
* is done to ensure no two randmised names are the same before allowing the    *
* script to continue.                                                          *
********************************************************************************/ 
// Styles List
var styleList = [
 'bnt_blue',
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
 'defending',
 'hiding',
 'popup_bar',
 'popup_close',
 'popup_main',
 'popup_outer',
 'popup_top',
 'row_headers',
 'row_top_headers',
 'scrollable',
 'status_feedback',
 'status_report',
 'status_ticker',
 'subtitle',
 'support_link',
 'table',
 'table_headers',
 'title'
 ];
for (var i=0; i < styleList.length; i++) {
	setUID(styleList[i]);
}



function setStyles (){
	addStyle('\
	.jewel {\
		padding : 1px;\
		font-size: 7pt !important;\
		color: #666 !important;\
	}\
	div.short {\
		height:7px;\
	}\
	.' + UID['hiding'] + ' {\
		background-color: rgb(0,160,110);\
		color: white;\
		padding-left: 10px;\
		padding-right: 10px;\
		margin-right: -2px;\
		border-radius: 2px;\
		-moz-border-radius: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.' + UID['defending'] + ' {\
		background-color: rgb(184,0,46);\
		color: white;\
		padding-left: 10px;\
		padding-right: 10px;\
		margin-right: -2px;\
		border-radius: 2px;\
		-moz-border-radius: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.' + UID['scrollable'] + ' {\
		overflow: auto !important;\
	}\
	.' + UID['popup_outer'] + ' {\
		font-size:8pt;\
		font-family:"lucida grande",tahoma,verdana,arial,sans-serif;\
		border: 1px solid #777;\
		padding-left:3px;\
		padding-right:3px;\
		padding-bottom:3px;\
		background-color: rgb(255,255,255);\
		border-radius: 5px;\
		-moz-border-radius: 5px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 5px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 5px;\
	}\
	.' + UID['popup_close'] + ' {\
		position: absolute;\
		display:block;\
		right:-1px;\
		margin-top:-1px;\
		width:20px;\
		height:18px;\
		text-align:center;\
		color:#fff;\
		background-color:#555;\
		font-weight:bold;\
		font-size:12px !important;\
		padding:1px;\
		border: 1px solid #666;\
		border-radius: 5px;\
		-moz-border-radius: 5px;\
		cursor: pointer;\
	}\
	.' + UID['popup_close'] + ':hover {\
		background-color:#922;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
	}\
	.' + UID['popup_bar'] + ':hover {\
		cursor: move;\
	}\
	#' + UID['main_outer'] + ' * {\
		font-size:8pt;\
	}\
	#' + UID['main_outer'] + ' ul.tabs {\
		overflow: hidden;\
		display: block;\
		border-bottom: 1px solid #898989;\
		height: 25px;\
		list-style: none;\
		margin: 0;\
		padding: 0;\
		font-size: 10px;\
	}\
	#' + UID['main_outer'] + ' ul.tabs li.tab {\
		display: inline-block;\
		float: left;\
		cursor:pointer !important;\
	}\
	#' + UID['main_outer'] + ' ul.tabs li.tab a {\
		background-color: rgb(235,238,245);\
		border-bottom: 0;\
		border: 1px solid #898989;\
		border-left-width: 0;\
		color: #333;\
		font-weight: bold;\
		display: block;\
		height: 16px;\
		margin-top: 6px;\
		padding: 2px 9px 3px 8px;\
		position: relative;\
		text-decoration: none;\
		cursor:pointer;\
	}\
	#' + UID['main_outer'] + ' ul.tabs li.first a {\
		border-left-width: 1px;\
	}\
	#' + UID['main_outer'] + ' ul.tabs li.tab a.selected {\
		background-color: rgb(60,90,150);\
		border-top-color: #3B5998;\
		border-bottom-color: #3B5998;\
		border-left-color: #5973A9;\
		border-right-color: #5973A9;\
		color: white;\
		-webkit-box-shadow: rgba(0,0,0,0.6) 1px 0px 1px;\
		-moz-box-shadow: rgba(0,0,0,0.6) 1px 0px 1px;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);\
	}\
	#' + UID['main_outer'] + ' div.container {\
		height: 100%;\
		width: 100%;\
		overflow-x: auto;\
	}\
	#' + UID['main_outer'] + ' div.container ul.tabs li.tab a {\
		height: 13px;\
		background-color: rgb(241,241,241);\
	}\
	#' + UID['main_outer'] + ' div.container ul.tabs li.tab a.selected {\
		background-color: rgb(110,132,181);\
	}\
	div.' + UID['title'] + ' {\
		border:1px solid;\
		border-color:#ffffff;\
		font-weight:bold;\
		padding-top:2px;\
		padding-bottom:2px;\
		text-align:center;\
		color:#ffffff;\
		background-color:rgb(60,90,150);\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	.' + UID['title'] + ' * {\
		display:inline-block !important;\
		font-style:normal !important;\
		font-weight:bold;\
		color:#ffffff;\
		font-size:10pt !important;\
		line-height:10pt !important;\
		text-decoration:none !important;\
		padding:0;\
	}\
	div.' + UID['subtitle'] + ' {\
		border:1px solid;\
		border-color:#ffffff;\
		font-weight:bold;\
		padding-top:2px;\
		padding-bottom:2px;\
		text-align:center;\
		color:#ffffff;\
		background-color: rgb(60,60,60);\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	div.' + UID['content'] + ' {\
		border:1px solid rgb(255,200,50);\
		background-color: rgb(245,245,228);\
		padding:3px;\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	div.' + UID['status_ticker'] + ' {\
		border:1px solid #995;\
		background-color: rgb(239,239,224);\
		padding:2px;\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	div.' + UID['status_report'] + ' {\
		height: 106px;\
		max-height: 106px;\
		overflow:auto;\
	}\
	div.' + UID['status_feedback'] + ' {\
		border: 1px solid #ddd;\
		padding-top: 5px;\
		padding-right: 5px;\
		padding-bottom: 0.5em;\
		padding-left: 5px;\
		height: 34px;\
		background-color: rgb(255,235,235);\
		text-align:left;\
		font-weight:bold;\
		border-radius: 3px;\
		-moz-border-radius: 3px;\
	}\
	table.' + UID['table'] + ' tr td,\
	table.' + UID['compact_table'] + ' tr td {\
		border:none;\
		background:none;\
		white-space:nowrap;\
		padding: 1px 1px;\
		cursor: default;\
	}\
	table.' + UID['table'] + ' tr td {\
		padding: 1px 4px;\
	}\
	table.' + UID['table'] + ' tr td.left,\
	table.' + UID['compact_table'] + ' tr td.left,\
		font-weight:bold;\
		text-align:right;\
		padding-right: 5px;\
	}\
	table.' + UID['table_console'] + ' tr td {\
		white-space:normal;\
		vertical-align:top;\
	}\
	td.' + UID['underline'] + ' {\
		border-bottom:1px solid #ccc;\
		background:none;\
		padding: 1px 4px 1px 4px;\
	}\
	table tr.' + UID['row_top_headers'] + ' td,\
	table tr.' + UID['row_headers'] + ' td {\
		color: white;\
		background-color: rgb(110,115,125);\
		border-right: 2px solid #eef;\
		font-weight:bold;\
		text-align:center;\
		line-height:11pt;\
	}\
	table tr.' + UID['row_top_headers'] + ' td {\
		background-color: rgb(90,95,115);\
	}\
	tr.' + UID['row_marchOther'] + ' td {\
		color:#888888;\
	}\
	tr.' + UID['row_marchMine'] + ' td {\
		color:#000000;\
	}\
	tr.' + UID['row_owned'] + ' {\
	}\
	input.short {\
		width:30px;\
	}\
	input.' + UID['btn_on'] + ',\
	input.' + UID['btn_off'] + ',\
	input.' + UID['bnt_red'] + ',\
	input.' + UID['bnt_green'] + ',\
	input.' + UID['bnt_blue'] + ',\
	input.' + UID['bnt_yellow'] + ',\
	input.' + UID['bnt_cyan'] + ',\
	input.' + UID['bnt_purple'] + ',\
	.' + UID['popup_outer'] + ' input[type=button] {\
		width:130px;\
		padding-top:1px;\
		padding-bottom:1px;\
		color:white;\
		font-weight:bold;\
		border: 1px solid #333;\
		border-radius: 3px;\
		-moz-border-radius: 3px;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		-webkit-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
		cursor:hand;\
		cursor:pointer;\
	}\
	.' + UID['popup_outer'] + ' input[type=button] {\
		background-color: rgb(0,125,189);\
	}\
	.' + UID['popup_outer'] + ' input[type=button]:hover {\
		background-color: rgb(40,150,210);\
	}\
	input.' + UID['btn_on'] + ' {\
		background-color: rgb(0,160,110) !important;\
	}\
	input.' + UID['btn_on'] + ':hover {\
		background-color: rgb(0,200,150) !important;\
	}\
	input.' + UID['btn_off'] + ' {\
		background-color: rgb(184,0,46) !important;\
	}\
	input.' + UID['btn_off'] + ':hover {\
		background-color: rgb(200,50,100) !important;\
	}\
	input.small {\
		margin:0;\
		padding-top:0;\
		padding-bottom:0;\
		padding-left:1px;\
		padding-right:1px;\
		font-size:10px;\
	}\
	input.' + UID['bnt_red'] + ' {\
		background-color: rgb(184,0,46) !important;\
	}\
	input.' + UID['bnt_red'] + ':hover {\
		background-color: rgb(200,50,100) !important;\
	}\
	input.' + UID['bnt_green'] + ' {\
		background-color: rgb(0,160,110) !important;\
	}\
	input.' + UID['bnt_green'] + ':hover {\
		background-color: rgb(0,210,150) !important;\
	}\
	input.' + UID['bnt_blue'] + ' {\
		background-color: rgb(0,94,189);\
	}\
	input.' + UID['bnt_blue'] + ':hover {\
		background-color: rgb(0,125,150);\
	}\
	input.' + UID['bnt_yellow'] + ' {\
		background-color:#BFBF00 !important;\
	}\
	input.' + UID['bnt_yellow'] + ':hover {\
		background-color:#DFDF00 !important;\
	}\
	input.' + UID['bnt_cyan'] + ' {\
		background-color:#00BFBF !important;\
	}\
	input.' + UID['bnt_cyan'] + ':hover {\
		background-color:#00DFDF !important;\
	}\
	input.' + UID['bnt_purple'] + ' {\
		background-color:#BF00BF !important;\
	}\
	input.' + UID['bnt_purple'] + ':hover {\
		background-color:#DF00DF !important;\
	}\
	#' + UID['main_outer'] + ' input[type=text] {\
		border: 1px solid #888;\
		border-radius: 2px;\
		text-align: right;\
		-moz-border-radius: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-moz-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;\
	}\
	#' + UID['main_outer'] + ' input[type=text]:active,\
	#' + UID['main_outer'] + ' input[type=text]:focus {\
		border-color: #000;\
		-webkit-box-shadow: rgba(0,0,0,0.5) 1px 1px 4px inset;\
		-moz-box-shadow: rgba(0,0,0,0.5) 1px 1px 4px inset;\
	}\
	span.' + UID['bold_red'] + ' {\
		color:#550000;\
		font-weight:bold;\
	}\
	hr.thin {\
		margin:0px;\
		padding:0px;\
	}\
	div#' + UID['tooltip'] + ' {\
		position: absolute;\
		max-width:185px;\
		padding: 5px 8px;\
		color:#fff;\
		font-family: "Lucida Grande","Lucida Sans Unicode","bitstream vera sans","trebuchet ms",verdana,sans-serif;\
		font-size:9pt;\
		background-color: rgb(60,90,150);\
		background-color: rgba(60,90,150,0.6);\
		border: 1px solid white;\
		border-radius: 3px;\
		-webkit-box-shadow: rgb(0,0,0) 0px 0px 5px;\
		-moz-box-shadow: rgb(0,0,0) 0px 0px 5px;\
		background-image: linear-gradient(bottom, rgba(30,30,30,0.9) 1%, rgba(30,30,30,0.5) 100%);\
		background-image: -moz-linear-gradient(bottom, rgba(30,30,30,0.9) 1%, rgba(30,30,30,0.5) 100%);\
		background-image: -webkit-linear-gradient(bottom, rgba(30,30,30,0.9) 1%, rgba(30,30,30,0.5) 100%);\
		visibility: hidden;\
		z-index: 1000;\
	}\
	');
}


/******************
George's Current: 
*) auto ant: update stats only when report rx'ed (i/o on tick)
*) better startup (looking for SWF element)
*) auto-build: add musterpoint, gen quarters, etc.

Wham's Current:
*) auto-collect every 4 hours
*) show the user that this is a modified script (add mod by Wham to displayed strings)
*) changed the 1 hour timer re-hitting Ant Camps to 20 minutes (repeatTime) 3660 to 1201, changed back
*) fix a bug that caused NaN/hr in the Ant Camp stats panel (division by zero)
*) added call to showStats() after clearStats()
*) fixed a bug that caused the per hour resource rate to not display correctly
*) changed checkVersion to download this script (not George's original)
*) added Maps tab - searches and displays ant camps, cities, outposts, grasslands, Bogs, lakes, hills, plains, mountains, and forests within 35 miles
*) allow mapped objects to be attacked, changed the Ant tab name to Attack to reflect new functinality
*) user interface changes: buttons (hover, active, cursor), remember last sub-tab displayed, make sub-tabs behave and look like tabs
*) include defending/hiding status on the info tab
*) Translations: French, Dutch, Spanish (TBD: German, Italian)
*) added error checking for too many troops for the muster point level
*) hilite owned resources
*) city skip attack buttons disappear when switching pages
*) firefox 5 fixes (var class to var mtClass)
*) Attacks: Do not automatically scan the map, wait for the user to initiate the scan on the maps sub-tab
*) Short queue training model implemented
	
TODO: 
build: refetch seed (once only) if 'queue full' error
wave: option to Activate Attacks Logs
wave: option for max waves to send out
wave: multiple targets
wave: multiple wave defs
config: button (confirm dialog) to reset all data to defaults
Missing reports (due to missing march in 'seed')?
watchdog on ajax - # of requests per 10 seconds, # of same errors in a row, etc
******************/

// Changes: 
// campAttack -> objAttack because we allow all map objects to be attacked
// deleteCampAttacks -> deleteObjAttacks
// camp -> mapObject
// campMarches -> objMarches
//
// This is part of a sweeping change to remove the camp terminology and replace it with mapped objects (e.g. mountains, plains, cities, etc.)


/************************
**   FlashVars
*************************/
function getFlashVars (swf){
	// "use strict";
	var params = swf.innerHTML;
	var pattern = /\<\s*param\s*(.*?)\>/gi;
	var args, match, p;
	while ((match = pattern.exec(params)) != null)
	{
		var p = parseQuotedVars(match[1]);
		if (p.name && p.name == 'flashvars')
		{
			args = decodeEntity(p.value).split('&');
			for (var i=0; i < args.length; i++)
			{
				var v = args[i].split('=');
				//v[0] = v[0].strip().replace(/_([a-z])/g, function(m,c){return c?c.toUpperCase():'';});
				FlashVars[v[0].strip()] = v[1].strip();
			}
			break;
		}
	}
}



// Script StartUp

var scriptTimeout	= null;
var scriptLoaded	= false;
var startupCount	= 0;
var initTimeout		= null;
var initStep		= 0;


function dialogFatal(msg) {
	setStyles();
	var pop = new PopUp('fatal', Math.randRange(200,210), Math.randRange(300,310), Math.randRange(400,410),'auto', true);
	pop.getTopDiv().innerHTML = '<center><b>'+ SCRIPT_TITLE +': ' + translate('Error') + '!</b></center>';
	pop.getMainDiv().innerHTML = '<BR>' + msg;
	pop.show(true);
	
	try{
		$(UID['support_link']).addEventListener('click', function(){
			window.open(SCRIPT_URL_ERROR, 'MMOG Wiki');
		}, false);
	} catch(e){}
}


function scriptStartup() {
	var i;

	clearTimeout(scriptTimeout);
		
	if (scriptLoaded){
		return;
	}
	
	if (++startupCount > 10) {
		dialogFatal (kFatalSWF);
		return;
	}
	
	try { 
		var flashObj;
		var object = document.getElementsByTagName ('object');
		if (object.length < 1) {
			scriptTimeout = setTimeout(scriptStartup, 1000);
			return;
		}
		for (i=0; i < object.length; i++) {
			if (object[i].type && object[i].type=='application/x-shockwave-flash') {
				flashObj = object[i];
				getFlashVars(flashObj);
				if (FlashVars.api_server){
					break;
				}
			}
		}
		if (!FlashVars.api_server) {
			scriptTimeout = setTimeout(scriptStartup, 1000);
			return;
		}  
	} catch (e) {
		scriptTimeout = setTimeout(scriptStartup, 1000);
		return;
	}
	
	scriptLoaded = true;
	
	try {
		
		WinLog.enabled = ENABLE_WINLOG;
		
		// Init Data Options
		Data.init({ data_version : '' });

		// Verify that the version of the script data structure is the same as the version stored
		if (Data.data_version == undefined || 
			Data.data_version != DATA_VERSION
			) {
				// Clears all stored data structure because the version of the script is different
				Data.clearStorage();
				Data.data_version = DATA_VERSION;
		}
		
		Data.init({
			attacks		: {
				startAt			: 0,
				currentAttack	: 1
			},
			options		: {
				mainPopup		: {open:true, drag:true, x:0, y:0},
				objAttack		: {enabled:false, repeatTime:3660, delayMin:30, delayMax:60, levelEnable:[], levelDist:[null,10,10,10,10,10,10,10,10,10,10], deleteObjAttacks:false, stopAttackOnLoss:false, logAttacks:true, maxMarches:10, troops:[], clearAllTargets:false},
				currentTab		: false,
				attackTab		: 0,
				mapTab			: 0,
				jobsTab			: 0,
				autoBuild		: {enabled:false, buildingEnable:[], buildCap:[]},
				autoResearch	: {enabled:false, researchEnable:[], researchCap:[]},
				autoTrain		: {enabled:false, trainingEnable:[], city:[]},
				messages		: {lastRead:0, missing:0},
				objStats		: null,
				objMarches		: {},
				mapChoice		: kAnthropusCamp,
				mapMarches		: {},
				autoColInt		: 8,
				isDefending		: false,
				trainTab		: 0,
				trainQChoice	: 'min_housing',
				troopCap		: {},
				tJobs			: [],
				rJobs			: [],
				buildTimer		: null,
				researchTimer	: null,
				trainTimer		: null,
				autoCollect		: {enabled:false, lastTime:0, delay:1, unit:3600},
				verboseLog		: {enabled:false},
				autoRefresh		: {enabled:true, lastTime:0, delay:10}
			}
		});
		
		actionLog(SCRIPT_VERSION + ' ' +translate('Loaded'));
		verboseLog(SCRIPT_VERSION + ' Loaded');
		logit (inspect (FlashVars, 6, 1));
		
		verboseLog('Data Structure v' + DATA_VERSION);
	
		Manifest.init(function (res) {
			if (res.ok) {
				checkInit(true);
				verboseLog('Manifest Successfully initialised');
			} else {
				dialogFatal('<b>' + kFatalSeedTitle + '</b><br><br>\
					' + kFatalSeedMsg + '<br><br>\
					<a id="' + rndId['support_link'] + '" href="" target="_blank">Bugs and Known Issues</a><br><br>\
					<font color="#BF0000"><b> ' + res.errmsg + '</b></font>');
				return;
			}
		});
		
		Seed.init(function (res) {
			if (res.ok) {
				checkInit(true);
				verboseLog('Seed Successfully initialised');
			} else {
				dialogFatal('<b>' + kFatalSeedTitle + '</b><br><br>\
					' + kFatalSeedMsg + '<br><br>\
					<a id="' + UID['support_link'] + '" href="" target="_blank">Bugs and Known Issues</a><br><br>\
					<font color="#BF0000"><b> ' + res.errmsg + '</b></font>');
				return;
			}
		});

		Translation.init(function (res) {
			if (res.ok) {
				checkInit(true);
				verboseLog('Translation matrix Successfully initialised');
	
				
				/*
				//This is only for programming purposes
				var a=[];
				for (var i=0; i < Translation._section.length; i++){
					for (n in Translation.xml[Translation._section[i]]){
						a.push([n,Translation[Translation._section[i]](n)].join(' = "') + '"');
						//console.log([n,Translation[Translation._section[i]](n)].join(' = "') + '"');
					}
				}
				actionLog(a.join('<br>'));
				*/

				
			} else {
				dialogFatal('<b>' + kFatalSeedTitle + '</b><br><br>\
					' + kFatalSeedMsg + '<br><br>\
					<a id="' + UID['support_link'] + '" href="" target="_blank">Bugs and Known Issues</a><br><br>\
					<font color="#BF0000"><b> ' + res.errmsg + '</b></font>');
				return;
			}
		});

		
		function checkInit(status) {
			clearTimeout(initTimeout);
			if (status == true) {
				initStep = initStep + 1;
				console.log('checkInit = ' + initStep);
			}
			console.log(Seed.cityInit + ' ' + Seed.numCities);
			
			if (initStep >= 3 && initStep < 10) {
				if( Seed.cityInit >= Seed.numCities) {
					startScript();
				} else {
					console.log('Init Seed, try again!');
					Seed.fetchPlayer(function (r) {
						if (r.ok) {
							verboseLog('Player data was Successfully requested from the server');
						}
					});
					initTimeout = setTimeout(checkInit, 2000);
				}
			} else if (initStep > 10) {
				dialogFatal(kInitErr);
				return;
			} else {
				initTimeout = setTimeout(checkInit, 1500);
			}
		}
		
		// TODO: check result, retry or disable tools?
		function startScript() {
		
			// Init Data Map
			Map.init();
		
			// Get client screen width and adjust script popup to suit
			if (screen.width >= 1240) {
				var popupWidth = Math.randRange(475,485);
			} else {
				var popupWidth = Math.randRange(395,405);
			}
			var popupHeight = Math.randRange(755,760);


			// Create a new popup DIV for the main script window
			mainPopup = new PopUp ('main', Data.options.mainPopup.x, Data.options.mainPopup.y, popupWidth, popupHeight, Data.options.mainPopup.drag, onPopupClose, savePopupPos);
			
			//Scrambled Title
			scrambledTitle();

			// Create all the tabs and insert them into the main script popup DIV
			tabManager.init(mainPopup.getMainDiv());
			
			// Display everything
			Data.options.mainPopup.open = true;
			if (Data.options.mainPopup.open) {
				mainPopup.show(true);
				tabManager.showTab();
			}
		
			// CHECK: Should this be here or somewhere else?
			AutoCollect.init (); 
			
			// CHECK: Should this be here or somewhere else?
			Messages.init (); 
			
			//Runtime for AutoRefresh the page
			AutoRefresh.init();
			
			// Start event listeners to look for an unload event from Data Storage			
			window.addEventListener('unload', Data.onUnload, false);
			
			// Apply CSS styles (THIS MUST BE THE LAST ALWAYS)
			setStyles();
			
			// Internal Functions
			function onPopupClose (){
				tabManager.hideTab();
				resetScript();
			}
			
			function savePopupPos (dragger, event) {
				var el = dragger.element;
				var offset = Element.cumulativeOffset(el);
				Data.options.mainPopup.x = document.body.offsetWidth - offset.left - el.offsetWidth;
				Data.options.mainPopup.y = offset.top;
			}
			
			function scrambledTitle(){
				var len = TITLE_WORDS.length-1;
				var w1 = Math.ceil (Math.random() * len);
				var w2 = Math.ceil (Math.random() * len);
				SCRIPT_TITLE = translate(TITLE_WORDS[w1]) +' '+ translate(TITLE_WORDS[w2]);
			}

		}
	} catch (e) {
		dialogFatal(kInitErr + e);
		logit(inspect (e, 8, 1));
	}  
}




MyAjax = {

	RequestDOA : function (url, params, callback, isPost) {
		new MyAjax.Request (FlashVars.api_server +'/'+ url, {
			useSignature: isPost,
			method		: (isPost ? 'POST' : 'GET'),
			params		: params,
			timeoutSecs	: 45,
			
			onSuccess	: function(r) {
				if (r.status == 200 && r.responseText) {
					if (url.indexOf(".xml") !== -1) {
						callback({ok:true, dat:r.responseText});
					} else {
						var jsonObj;
						try{
							jsonObj= JSON.parse(r.responseText);
						} catch (e) {}
						callback({ok:true, dat:jsonObj});
					}
				} else {
					callback({ok:false, errmsg:'The request was successful but no data was returned'});
				}
			},
		
			onFailure	: function(r) {
				if (r.responseText) {
					callback({ok:false, dat:r.responseText, errmsg:r.statusText});
				} else if (r.status) {
					callback({ok:false, errmsg:r.statusText, status:r.status});
				} else {
					callback({ok:false, errmsg:'This browser is not compatible at this time'});
				}
			},
			
			on403 : function(r){
				dialogFatal('<b>' + kFatalSeedTitle + '</b><br><br>\
					<font color="#C00"><b> ' + r.statusText + '</b></font><br><br>\
					<b>Previous Requirements</b><br>\
					<b>FIREFOX</b>\
					<ul>\
					<li>Download and install <a href="https://addons.mozilla.org/es-ES/firefox/addon/refcontrol/">RefControl</a></li>\
					<li>Once installed click Tools - RefControlOptions</li>\
					<li>Click Add Site and type in wonderhill.com</li>\
					<li>Check the Block - Send no referer radio box</li>\
					<li>Click OK and then OK again</li>\
					</ul>\
					<br>\
					<b>CHROME</b>\
					<ul>\
					<li>Right click on your "Chrome" icon (either on your Desktop or your Taskbar)</li>\
					<li>Choose properties</li>\
					<li>At the end of your target line, place these parameters: --no-referrers</li>\
					<li>Click OK</li>\
					</ul>\
					<br><br>\
					<a id="' + UID['support_link'] + '" href="" target="_blank">Bugs and Known Issues</a><br><br>\
					');
			}
			
			
		});
	},
	
	Request : function (url, options) {
		var request, params, headers = {}, timeout, h;
		
		request = new XMLHttpRequest();
		
		request.onreadystatechange = function () {
			if (request.readyState == 4) {
				clearTimeout(timeout); 
				var response = {
					responseText	: request.responseText,
					status			: request.status,
					statusText		: request.statusText,
					request			: request
				}
				if ( (request.status >= 200 && request.status < 300) || request.status == 304) {
					if (options.onSuccess) options.onSuccess(response);
				} else {
					if (options['on' + request.status] != undefined) options['on' + request.status](response);
					if (options.onFailure) options.onFailure(response);
				}
			} 
		} 
		
		
		// Parse request parameters
		params = Object.isString(options.params) ? options.params : Object.toQueryString(options.params).replace(/\_/g,'%5F');
			
		// Change Accept request header based on browser
		headers['Accept'] =  IsChrome ? '*/*' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
		
		// Add request header specific to POST request only
		if (options.useSignature) {
			headers['content-type'] = 'application/x-www-form-urlencoded';
			headers['X-S3-AWS'] = SHA1("Dracunculiasis" + params + "LandCrocodile" + url  + "Bevar-Asp");
		} 
		
		// Merge headers with option.headers
		//Object.extend(headers, options.headers || { });
		
		// Open Request
		if (options.method == 'GET') {
			url += (url.include('?') ? '&' : '?') + params;
		}
		request.open(options.method, url, true);
		
		// Add request headers to ajax request
		for (h in headers) {
			request.setRequestHeader(h, headers[h]);
		}
		
		// Start timeout check before request is sent
		if (options.timeoutSecs) {
			timeout = setTimeout( function() {
				request.abort();
				if (options.onFailure) {
					// CHECK: 599 is custom error code. See if better option exists.
					options.onFailure({
						responseText	: null,
						status			: 599,
						statusText		: 'Request Timed Out',
						request			: request
					});
				}
			}, options.timeoutSecs*1000);
		}
		
		// Send request with params if POST otherwise just send request
		request.send(options.method == 'POST' ? params : null);
	},
	
	messageList : function (cat, callback){
		if (!cat){
			cat = 'all';
		}
		var p = {}
		p['user_id']		= FlashVars.user_id;
		p['dragon_heart']	= FlashVars.dragon_heart;
		p['count']			= 12;
		p['timestamp']		= parseInt(serverTime());
		p['_session_id']	= FlashVars.session_id;
		p['category']		= cat;
		p['page']			= 1;
		p['version']		= API_VERSION;
		new MyAjax.RequestDOA ('reports.json', p, mycb, false);
		function mycb (r){
			if (r.ok && !r.dat.errors) {
				if (callback){
					callback (r.dat.result.report_notifications);
				}
			}
			else if(r.dat.result) {
				r.ok = false;
				r.errmsg = r.dat.result.errors[0];
				
				if (callback) {
					callback (r);
				}
			} else {
			
				if (callback) {
					callback (null);
				}
			}
		}
	},
	
	// Use a json to wrap the building upgrade job
	buildingUpgrade : function (cityId, buildingId, callback){
		var t = MyAjax;
		var p = {};
		p['user_id']		= FlashVars.user_id;
		p['dragon_heart']	= FlashVars.dragon_heart;
		p['_session_id']	= FlashVars.session_id;
		p['_method']		= 'put';
		p['version']		= API_VERSION;
		p['timestamp']		= parseInt(serverTime());
		new MyAjax.RequestDOA ('cities/'+ cityId +'/buildings/'+ buildingId +'.json', p, mycb, true);
		function mycb (r){
			//logit ("BUILD RESPONSE:\n" + inspect (r, 10, 1));
			if (r.ok && !r.dat.errors) {
				if (r.dat.result.success){
					Seed.checkAddJob (r.dat.result.job);
				} 
			}
			else if(r.dat.result) {
				r.ok = false;
				r.errmsg = r.dat.result.errors[0];
			}
			
			if (callback){
				callback (r);
			}
		}
	},
	
	collectResources : function (cityId, callback){
		var p = {};
		p['user_id']		= FlashVars.user_id;
		p['timestamp']		= parseInt(serverTime());
		p['_session_id']	= FlashVars.session_id;
		p['version']		= API_VERSION;
		p['dragon_heart']	= FlashVars.dragon_heart;
		new MyAjax.RequestDOA ('cities/'+ cityId +'/move_resources.json', p, mycb, true);
		function mycb (r){
			if (r.ok && !r.dat.errors) {
				Seed.updateCity (r.dat.city);
			}
			else if(r.dat.result) {
				r.ok = false;
				r.errmsg = r.dat.result.errors[0];
				verboseLog('<b>Auto-Collect</b> Error: ' + r.msg);
			}

			if (callback){
				callback (r.ok);
			}
		}
	},
	
	marchBusy : 0,
	marchSend : function (cityId, x, y, generalId, units, ownerId, callback) {
		var t = MyAjax;
		
		++t.marchBusy;
		
		var u = {}
		var mt = false;
		var sendTroops = "{";
		for (var pu in units){
			if (units[pu] > 0) {
				u[pu] = units[pu];
				if (mt == true ){
					sendTroops += ',';
				}
				sendTroops += '"' + pu + '":' + units[pu];
				mt = true;
			}
		}
		sendTroops += "}";
		
		// Initialise POST data
		var p = {};
		p['march[march_type]']	= 'attack';
		p['march[y]']			= y;
		p['timestamp']			= parseInt(serverTime());
		p['march[units]']		= sendTroops;
		p['march[general_id]']	= generalId;
		p['version']			= API_VERSION;
		p['_method']			= 'post';
		p['dragon_heart']		= FlashVars.dragon_heart;
		p['user_id']			= FlashVars.user_id;
		p['march[x]']			= x;
		p['_session_id']		= FlashVars.session_id;
		// Send request
		new MyAjax.RequestDOA ('cities/'+ cityId +'/marches.json', p, mycb, true);
		function mycb(r) {
			--t.marchBusy;
			
			verboseLog('MyAjax.marchSend< request was returned with a status of ' + r.ok );

			if (r.ok && !r.dat.errors) {
				if (r.dat.result.success) {
					try {
						Seed.updateCity(r.dat.result.city);
						Seed.marches[r.dat.result.job.march_id].ownerId = ownerId;          
					} catch (e) {
						WinLog.write ('***********'+ e);
					}
				}
				else if(r.dat.result) {
					r.ok = false;
					r.errmsg = r.dat.result.reason;
				}
			} else if (r.ok && r.dat.errors) {
				r.ok = false;
				r.errmsg = r.dat.errors;
			} else {
				r.ok =false;
			}
			
			if (callback){
				callback (r);
			}
		}
	},

	// This looks really cool, if it works
	marchRecall : function (cityId, marchId, callback){
		var t = MyAjax;
		var p = {};
		++t.marchBusy;
		p['user_id']		= FlashVars.user_id;
		p['_session_id']	= FlashVars.session_id;
		p['_method']		= 'delete';
		p['dragon_heart']	= FlashVars.dragon_heart;
		p['timestamp']		= parseInt(serverTime());
		p['version']		= API_VERSION;
		new MyAjax.RequestDOA ('cities/'+ cityId +'/marches/'+ marchId +'.json', p, mycb, true);
		function mycb (r){
			--t.marchBusy;
			//logit ("MARCH RESPONSE:\n" + inspect (r, 10, 1));
			if (r.ok && !r.dat.errors) {
				if (r.dat.result.success){
					//logit (inspect (r, 9, 1));        
					Seed.updateCity(r.dat.result.city);
					Seed.marches[r.dat.result.job.march_id].status = 'retreating';
				} 
				else if(r.dat.result) {
					r.ok = false;
					r.errmsg = r.dat.result.errors[0];
				}
			} else if (r.ok && r.dat.errors) {
				r.ok = false;
				r.errmsg = r.dat.errors;
			}
			if (callback){
				callback (r);
			}
		}
	},
	
	messageDelete : function (ids, callback){
		var p = {}
		p['user_id']		= FlashVars.user_id;
		p['_method']		= 'delete';
		p['timestamp']		= parseInt(serverTime());
		p['_session_id']	= FlashVars.session_id;
		p['ids']			= ids.join('|');
		p['dragon_heart']	= FlashVars.dragon_heart;
		p['version']		= API_VERSION;
		new MyAjax.RequestDOA ('reports/bulk_delete.json', p, mycb, true);
		function mycb (r){
			if (r.ok && !r.dat.errors) {
				r.ok = false;
			}
			else if(r.dat.result) {
				r.ok = false;
				r.errmsg = r.dat.result.errors[0];
			}
			
			if (callback){
				callback (r.ok);
			}
		}
	},

	messageDetail : function (id, callback){
		var p = {}
		p['user_id']		= FlashVars.user_id;
		p['timestamp']		= parseInt(serverTime());
		p['_session_id']	= FlashVars.session_id;
		p['version']		= API_VERSION;
		p['dragon_heart']	= FlashVars.dragon_heart;
		new MyAjax.RequestDOA ('reports/'+ id +'.json',p , mycb, false);
		function mycb (r){
			if (r.ok && !r.dat.errors) {
				if (callback){
					callback (r.dat.result);
				}
			}
			else if(r.dat.result) {
				r.ok = false;
				r.errmsg = r.dat.result.errors[0];
			}
			
			if (callback) {
				callback (null);
			}
		}
	},

	researchStart : function (cityId, researchType, callback){
		var t = MyAjax;
		var p = {};
		p['user_id']		= FlashVars.user_id;
		p['_method']		= 'post';
		p['timestamp']		= parseInt(serverTime());
		p['_session_id']	= FlashVars.session_id;
		p['research[research_type]'] = researchType;
		p['dragon_heart']	= FlashVars.dragon_heart;
		p['version']		= API_VERSION;
		new MyAjax.RequestDOA ('cities/'+ cityId +'/researches.json', p, mycb, true);
		function mycb (r){
			//logit ("RESEARCH RESPONSE:\n" + inspect (r, 10, 1));
			if (r.ok && !r.dat.errors) {
				if (r.dat.result.success){
					Seed.checkAddJob (r.dat.result.job);
				} 
			} 
			else if(r.dat.result) {
				r.ok = false;
				r.errmsg = r.dat.result.errors[0];
			}
			
			if (callback){
				callback (r);
			}
		}
	},
	
	troopTraining : function (troopType, troopQty, cityId, callback){
		var t = MyAjax;
		var p = {};
		p['user_id']		  = FlashVars.user_id;
		p['_method']		  = 'post';
		p['timestamp']		  = parseInt(serverTime());
		p['_session_id']	  = FlashVars.session_id;
		p['units[quantity]']  = troopQty;
		p['units[unit_type]'] = troopType;
		p['dragon_heart']	  = FlashVars.dragon_heart;
		p['version']		  = API_VERSION;
		new MyAjax.RequestDOA ('cities/'+ cityId +'/units.json', p, mycb, true);
		function mycb (r){
			//logit ("Troop Training Response:\n" + inspect (r, 10, 1));
			if (r.ok && !r.dat.errors) {
				if (r.dat.result.success){
					Seed.checkAddJob (r.dat.result.job);
				} 
			}
			else if(r.dat.result) {
				r.ok = false;
				r.errmsg = r.dat.result.errors[0];
			}
			
			if (callback){
				callback (r);
			}
		}
	},

	wildernessesAbandon : function (cityId, x, y, callback){
		var t = MyAjax;
		var p = {};
		p['user_id']		= FlashVars.user_id;
		p['x']				= x;
		p['_method']		= 'delete';
		p['y']				= y;
		p['timestamp']		= parseInt(serverTime());
		p['_session_id']	= FlashVars.session_id;
		p['dragon_heart']	= FlashVars.dragon_heart;
		p['version']		= API_VERSION;
		new MyAjax.RequestDOA ('cities/'+ cityId +'/wildernesses/abandon.json', p, mycb, true);
		function mycb (r){

			if (r.ok && !r.dat.errors) {
				if (r.dat.result.success){
					Seed.updateCity(r.dat.result.city);
					Seed.marches[r.dat.result.job.march_id].status = 'retreating';
				} 
				else if(r.dat.result) {
					r.ok = false;
					r.errmsg = r.dat.result.errors[0];
				}
			} else if (r.ok && r.dat.errors) {
				r.ok = false;
				r.errmsg = r.dat.errors;
			}
			if (callback){
				callback (r);
			}
		}
	}

	

	
}; // END MyAjax


// Added the autocollection interval from the select menu
AutoCollect = {
	init : function (){
		var t = AutoCollect;
		t.setEnable (Data.options.autoCollect.enabled);
	},
	
	setEnable : function (onOff){
		var t = AutoCollect;
		clearTimeout (t.timer);
		Data.options.autoCollect.enabled = onOff;
		if (onOff){
			var time = (Data.options.autoCollect.delay*Data.options.autoCollect.unit) - serverTime() + Data.options.autoCollect.lastTime;
			if (time <= 0){
				t.doit ();
			} else {
				t.timer = setTimeout (t.doit, time*1000);
			}
		}
	},
	
	doit : function (){
		var t = AutoCollect;
		Data.options.autoCollect.lastTime = serverTime();
		for (var out=1; out<Seed.cities.length; out++){
			collect (out, out*30000);
		}
		t.timer = setTimeout (t.doit, ((Data.options.autoCollect.delay*Data.options.autoCollect.unit) + (Math.random()*120))*1000);
		function collect (cityIdx, delay){
			setTimeout (function(){
				MyAjax.collectResources (Seed.cities[cityIdx].id);
				actionLog (translate('Collected resources at outpost')+ ' #'+ cityIdx);
			}, delay);
		}
	}
}; // END Auto Collect

AutoRefresh = {
	_timer   : null,
	_currMouseXY : [0,0],
	_lastMouseXY : [0,0],
	
	init : function () {
		var t = AutoRefresh;
		t.setEnable(Data.options.autoRefresh.enabled);
	},
	
	setEnable : function (onOff) {
		var t = AutoRefresh;
		Data.options.autoRefresh.enabled = onOff;
		if(Data.options.autoRefresh.enabled){
			Data.options.autoRefresh.lastTime = parseInt(serverTime());
			window.addEventListener('mousemove', t.onMouseMove, false);
			t.onTimeout();
		} else {
			window.removeEventListener('mousemove', t.onMouseMove, false);
		}
	},
	
	setDelay : function (delay) {
		var t = AutoRefresh;
		Data.options.autoRefresh.delay = delay;
	},
	
	onMouseMove : function (event){
		AutoRefresh._currMouseXY = [event.clientX, event.clientY];
	},
	
	onTimeout : function (){
		var t = AutoRefresh;
		clearTimeout(t._timer);
		
		if ( t._currMouseXY.join() != t._lastMouseXY.join() ) {
			Data.options.autoRefresh.lastTime = parseInt(serverTime());
			t._lastMouseXY = [].concat(t._currMouseXY);
		}
		
	
		if(parseInt(serverTime()) - Data.options.autoRefresh.lastTime > parseInt(Data.options.autoRefresh.delay)*60){
			document.location = document.location.href;
		}
		
		
		if(Data.options.autoRefresh.enabled){
			t._timer = setTimeout(t.onTimeout, 30000);
		}
	}
};// END AutoRefresh


Buildings = {
	getList : function (cityIdx, type){
		var ret = [];
		for (var i=0; i<Seed.cities[cityIdx].buildings.length; i++){
			if (Seed.cities[cityIdx].buildings[i].type == type){
				ret.push (Seed.cities[cityIdx].buildings[i]);
			}
		}
		return ret;
	},
	getLevel : function (cityIdx, type){
		var x = Buildings.getList(cityIdx, type);
		if (x.length < 1){
			return 0;
		}
		x.sort(function(a,b){return a.level - b.level;});
		return x[0].level;
	},
	getById : function (cityIdx, bid){
		for (var i=0; i < Seed.cities[cityIdx].buildings.length; i++){
			if (Seed.cities[cityIdx].buildings[i].id == bid){
				return (Seed.cities[cityIdx].buildings[i]);
			}
		}
		return null;
	}
}; // END Building



Data = {
	_serverId 	: (function(){var m=/^realm([0-9]+)\./.exec(document.location.hostname);return (m?m[1]:'')})(),
	_log		: [ [], [] ],
	_defaults	: {},
	
	init : function (obj) {
		try {
		
			//Saves defaults properties
			Data._defaults.mergeObject( obj || {} );
			
			for (var itemName in obj)
			{
				
				// Checks if the object is already defined in the Data Object
				if ( Data[itemName] == undefined ){
					//  Assign default object properties, if defined, otherwise an empty object
					Data[itemName] = obj[itemName] != undefined ? obj[itemName] : {};
				}
				
				// Load the data stored, of the current item from localStorage
				var storedObject = Data.getObject(itemName);

				// Check if the default object is really an object
				if ( Data[itemName] != null && typeof(Data[itemName]) == "object" )
				{
					// Assign the properties of stored objeto into the default object, overwriting the values
					Data[itemName].mergeObject( storedObject );
				} else if ( storedObject != '' ) {
					Data[itemName] = storedObject;
				} 
			}
		} catch (e) {
			alert ('This browser does not support LocalStorage\n\n'+e);
			return false;
		}
	},
	
	clearStorage : function(){
		localStorage.clear();
		for (var itemName in Data._defaults){
			if ( Data._defaults[itemName] != null && typeof(Data._defaults[itemName]) == "object" )
			{
				Data[itemName].mergeObject( Data._defaults[itemName] );
			} else {
				Data[itemName] = Data._defaults[itemName];
			} 
		}
		actionLog('localStorage Deleted!');
	},
	
	getObject : function(key) {
		var item = localStorage.getItem(key);
		return (item||'').charAt(0) == '{' ? JSON.parse(item||'{}') : eval(item);
	},
	
	setObject : function(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch(e){
			if (e == QUOTA_EXCEEDED_ERR) {
				dispError ('<p style="font-size:12pt;">'+translate('LocalStorage')+'<p><br/>'+translate('Quota exceeded')+'!<br/>'+translate('Please, delete the cache and persistent data in your browser'));
			}
		}
	},

	onUnload : function () {
		logit('Save Data in localStorage');
		verboseLog('Save Data in localStorage');
		for (var itemName in Data._defaults){
			Data.setObject ( itemName, Data[itemName] );
		}
	}
	
	
}; //END Data


Manifest = {
	data : {},
	
	init : function (callback) {
		Manifest.fetchManifest(function (res) {
			if (res.ok) {
				verboseLog('Manifest was Successfully requested from the server');
			}
			if (callback){
				callback(res);
			}
		});
	},
	
	fetchManifest : function (callback) {
		var now = new Date().getTime() / 1000;
		var params = {};
		params['user_id']		= FlashVars.user_id;
		params['_session_id']	= FlashVars.session_id;
		params['version']		= API_VERSION;
		params['timestamp']		= parseInt(serverTime());
		params['dragon_heart']	= FlashVars.dragon_heart;
		
		new MyAjax.RequestDOA ('manifest.json', params, function (res) {
			if (res.ok && !res.dat.errors) {
				Manifest.data = res.dat; // This holds the entire Manifest JSON data parsed as an object 
				try {
					Manifest.updateManifest();
				} catch (e) {
					res.ok = false;
					res.errmsg = '<b>fetchManifest</b> when calling updateManifest returned this error: ' + e.toString();
				}
			} else if (res.ok && res.dat.errors) {
				res.ok = false;
				res.errmsg = res.dat.errors;
			}
			
			if (callback){
				callback(res);
			}
		}, false);
	},
	
	buildings : {
		byCityType : function (cityType, buildable, order) {
			var buildings = Manifest.data.buildings;
			var i, j, res = [];
			if (!buildable) {
				buildable = 'all';
			}
			if (!cityType) {
				cityType = 'all';
			}
			if (buildings.length > 0) {
				for (i = 0; i < buildings.length; i = i + 1) {
					if (buildings[i].buildable == buildable || buildable.toLowerCase() == 'all') {
						if (buildings[i].city_type.length > 0) {
							for (j = 0; j < buildings[i].city_type.length; j = j + 1) {
								if (buildings[i].city_type[j] == cityType.toLowerCase() || cityType.toLowerCase() == 'all') {
									res[res.length] = buildings[i];
									break;
								}
							}
						}
					}
				}
			}
			if (order) {
				res = Manifest.buildings.sortBy(res, order);
			}
			return res;
		},
		
		byLocation : function (location, buildable, order) {
			var buildings = Manifest.data.buildings;
			var i, res = [];
			if (!buildable) {
				buildable = 'all';
			}
			if (!location) {
				cityType = 'all';
			}
			if (buildings.length > 0) {
				for (i = 0; i < buildings.length; i = i + 1) {
					if (buildings[i].buildable == buildable || buildable.toLowerCase() == 'all') {
						if (buildings[i].location == location.toLowerCase() || location.toLowerCase() == 'all') {
							res[res.length] = buildings[i];
						}
					}
				}
			}
			if (order) {
				res = Manifest.buildings.sortBy(res, order);
			}
			return res;
		},
		
		sortBy : function (data, order) {
			var orderBy;
			if (!order) {
				order = {alphabetical: 'asc'};
			}
			for (orderBy in order) {
				switch (orderBy) {
				case 'alphabetical' :
					orderAlphabetical(order[orderBy]);
					break;
				case 'buildable' :
					orderBuildable(order[orderBy]);
					break;
				case 'location' :
					orderLocation(order[orderBy]);
					break;
				}
			}
			return data;
			
			function orderAlphabetical(order) {
				if (order.toLowerCase() == 'asc') {
					data.sort(function (a, b) {
						var typeA = a.type.toLowerCase(), typeB = b.type.toLowerCase();
						if (typeA < typeB) {return -1}
						if (typeA > typeB) {return 1}
						return 0;
					});
				} else if (order.toLowerCase() == 'desc') {
					data.sort(function (a, b) {
						var typeA = a.type.toLowerCase(), typeB = b.type.toLowerCase();
						if (typeA > typeB) {return -1}
						if (typeA < typeB) {return 1}
						return 0;
					});
				}
			}
		
			function orderBuildable(order) {
				if (order == true) {
					data.sort(function (a, b) {
						var buildableA = a.buildable, buildableB = b.buildable;
						if (buildableA < buildableB) {return -1}
						if (buildableA > buildableB) {return 1}
						return 0;
					});
				} else if (order == false) {
					data.sort(function (a, b) {
						var buildableA = a.buildable, buildableB = b.buildable;
						if (buildableA > buildableB) {return -1}
						if (buildableA < buildableB) {return 1}
						return 0;
					});
				}
			}

			
			function orderLocation(order) {
				if (order.toLowerCase() == 'city') {
					data.sort(function (a, b) {
						var locationA = a.location.toLowerCase(), locationB = b.location.toLowerCase();
						if (locationA < locationB) {return -1}
						if (locationA > locationB) {return 1}
						return 0;
					});
				} else if (order.toLowerCase() == 'field') {
					data.sort(function (a, b) {
						var locationA = a.location.toLowerCase(), locationB = b.location.toLowerCase();
						if (locationA > locationB) {return -1}
						if (locationA < locationB) {return 1}
						return 0;
					});
				}
			}
		},
	},
	
	building : function (type) { 
		console.log('Manifest.building');
		var b;
		
		if (type) {
			for (b = 0; b < Manifest.data.buildings.length; b = b + 1) {
			
			}
		} else {
			// Return an error message because no type was specificed
		}
	},
	
	updateManifest : function () {
		var i, j;
		var buildingManifest = Manifest.data.buildings;
		var researchManifest = Manifest.data.research;
		var troopManifest = Manifest.data.city.capital.units;
		
		// Initialise levels for each building & Save requirements
		for (i=0; i < buildingManifest.length; i++) {
			if (!Seed.requirements.building[buildingManifest[i].type]) {
				Seed.requirements.building[buildingManifest[i].type] = {};
			}
			if (!Seed.requirements.building[buildingManifest[i].type].level) {
				Seed.requirements.building[buildingManifest[i].type].level = [];
			}
			for (j=0; j < buildingManifest[i].levels.length; j++){
				Seed.requirements.building[buildingManifest[i].type].level[buildingManifest[i].levels[j].level] = buildingManifest[i].levels[j].requirements;
			}
		}


		// Initialise levels for each research & Save requirements
		for (i=0; i < researchManifest.length; i++) {
			if (!Seed.requirements.research[researchManifest[i].type]){
				Seed.requirements.research[researchManifest[i].type] = {};
			}
			if (!Seed.requirements.research[researchManifest[i].type].level) {
				Seed.requirements.research[researchManifest[i].type].level = [];
			}
			for (j=0; j < researchManifest[i].levels.length; j++) {
				//Seed.requirements.research[researchManifest[i].type].level[researchManifest[i].levels[j].level] = {};
				Seed.requirements.research[researchManifest[i].type].level[researchManifest[i].levels[j].level] = researchManifest[i].levels[j].requirements;
			}
		}
		
		// Initialise troops & Save requirements
		for (i=0; i < troopManifest.length; i++){
			if (!Seed.requirements.troop[troopManifest[i].type]) {
				Seed.requirements.troop[troopManifest[i].type] =[];
			}
			Seed.requirements.troop[troopManifest[i].type] = troopManifest[i].requirements;
		}
	}

};


Map = {
	_lastPos : {x:0, y:0},
	
	init : function () {
		var t = Map;
		
		t._lastPos.x = Seed.cities[0].x || 0;
		t._lastPos.y = Seed.cities[0].y || 0;
	
		Data.init({
			map	: {
				terrains: {
					AnthropusCamp	:[],
					Bog				:[],
					Forest			:[],
					Grassland		:[],
					Hill			:[],
					Lake			:[],
					Mountain		:[],
					Plain			:[],
					Fog				:[],
					City			:[],
					Outpost			:[],
					Wildernesses	:[]
				},
				radius	: 35,
				x		: 0,
				y		: 0,
				targets	: []
			}
		});
		
		// Check Our Coords
		t.checkOurCoords();
	},
	
	scanMap : function (x, y, radius, callback, options){
		var t = Map;
		t.scanMapObj(x, y, radius, function(res){
			if(res.done) {
				Data.map.terrains = res.terrains;
			} else {

			}
			callback(res);
		}, options);
	},

	scanMapObj : function (x, y, radius, callback, options){
		var t = Map;
		
		t.terrains = {
			AnthropusCamp:[],
			Bog			:[],
			Forest		:[],
			Grassland	:[],
			Hill		:[],
			Lake		:[],
			Mountain	:[],
			Plain		:[],
			Fog			:[],
			City		:[],
			Outpost		:[],
			Wildernesses:[]
		}; 
		
		t.centerX = x;
		t.centerY = y;
		t.firstX = t.normalize (x-radius+7);
		t.firstY =  t.normalize (y-radius+7);
		t.curIX = t.curIY = 0;
		t.widthI = parseInt(((radius*2)+14)/15);
		t.radius = radius;
		t.callback = callback; 
		t.circ = true;
		t.step = parseInt(t.widthI*t.widthI);
		
		t.options = {
			noTerrains		: false,
			noCities		: false,
			noWildernesses	: false,
			minLevel		: 0,
			withAlliance	: true,
			printCSV		: false
		}
		if(options != undefined){
			Object.extend(t.options, options);
		}
				
		var params = {};
		params['user_id']		= FlashVars.user_id;
		params['x']				= t.firstX;
		params['y']				= t.firstY;
		params['timestamp']		= parseInt(serverTime());
		params['_session_id']	= FlashVars.session_id;
		params['dragon_heart']	= FlashVars.dragon_heart;
		params['version'] = API_VERSION;  
		new MyAjax.RequestDOA ('map.json', params, t.gotMapObj, false);
	},  
	
	gotMapObj : function (r){
		var t = Map;
		var x = r.dat.x;
		var byCoords = {}

		if (!r.ok){
			t.callback (null);    // error !?!
			return;
		}
		
		// Terrains
		if(!t.options.noTerrais){
			for (var i=0; i < r.dat.terrain.length; i++)
			{
				for (var j=0; j < r.dat.terrain[i].length; j++)
				{
					var tArr = r.dat.terrain[i][j];
				
					// Check Options
					if (t.options.minLevel > tArr[1]) {
						continue;
					}
					
					if (tArr[0] == 'City' || tArr[0] == 'Outpost'){
						continue;
					}
					
					var dist = getDistance (t.centerX, t.centerY, tArr[2], tArr[3]);

					t.terrains[tArr[0]].push({
						x		: tArr[2], 
						y		: tArr[3], 
						dist	: dist, 
						type	: tArr[0], 
						lvl		: tArr[1],
						isAtt	: true,
						last	: 0
					});
					
					byCoords[tArr[2]+','+tArr[3]] = {
						index	: t.terrains[tArr[0]].length-1,
						type	: tArr[0], 
						lvl		: tArr[1],
					};

				}
			}
		}
	
		//Cities
		if(!t.options.noCities){
			for (var i=0; i < r.dat.map_cities.length; i++)
			{
				var target = r.dat.map_cities[i];
				
				// Skip our alliance or owner
				if ( (Seed.player.id == target.player.id) ||
					(Seed.player.alliance != undefined && target.player.alliance != undefined && Seed.player.alliance.id == target.player.alliance.id)
					) {
					continue;
				}
				
				//Check Options
				if ((t.options.minLevel > target.level) ||
					(t.options.withAlliance && target.player.alliance == undefined)
					){
						continue;
				}
				
				var dist = getDistance(t.centerX, t.centerY, target.x, target.y);

				var obj = {
					x		: target.x,
					y		: target.y,
					dist	: dist,
					type	: target.type,
					lvl		: target.level,
					id		: target.id,
					name	: target.name,
					pId		: target.player.id,
					pName	: target.player.name,
					pLvl	: target.player.level,
					pRace	: target.player.race,
					pType	: target.player.type,
					pMight	: target.player.might,
					isAtt	: (target.player.alliance == undefined),
					last	: 0
				};
				
				if(target.player.alliance != undefined){
					obj.pAlliId = target.player.alliance.id;
					obj.pAlli = target.player.alliance.name;
				}
				
				if(target.outpost_type != undefined){
					obj.life = target.life;
					obj.maxLife = target.maximum_life;
					obj.recRate = target.recovery_rate;
					obj.opType = target.outpost_type;
				}
				
				if(target.type == 'Capital'){
					t.terrains.City.push(obj);
				} else {
					t.terrains.Outpost.push(obj);
				}
			}
		}
		
		//Wildernesses
		if(!t.options.noWildernesses){
			for (var i=0; i < r.dat.city_wildernesses.length; i++)
			{
				var target = r.dat.city_wildernesses[i];
				var xy = target.x+','+target.y;
				
				// Skip our alliance or owner
				if ( (Seed.player.id == target.player.id) ||
					(Seed.player.alliance != undefined && target.player.alliance != undefined && Seed.player.alliance.id == target.player.alliance.id)
					) {
					if (byCoords[xy] != undefined){
						var type = byCoords[xy].type;
						t.terrains[type].splice(byCoords[xy].index,1);
					}
					continue;
				}
				
				//Check Options
				if ((t.options.minLevel > target.level) ||
					(t.options.withAlliance && target.player.alliance == undefined)
					){
						continue;
				}
				
				var dist = getDistance(t.centerX, t.centerY, target.x, target.y);
				
				var type = 'Wildernesses';
				var level = 0;
				
				if (byCoords[xy] != undefined){
					type = byCoords[xy].type;
					level = byCoords[xy].lvl;
					var terrain = t.terrains[type];
					if( terrain[byCoords[xy].index] ) {
						terrain[byCoords[xy].index].isAtt=false;
					}
				}
				
				var obj = {
					x		: target.x,
					y		: target.y,
					dist	: dist,
					type	: type,
					lvl		: level,
					id		: target.id,
					name	: target.name,
					pId		: target.player.id,
					pName	: target.player.name,
					pLvl	: target.player.level,
					pRace	: target.player.race,
					pType	: target.player.type,
					pMight	: target.player.might,
					isAtt	: (target.player.alliance == undefined),
					last	: 0
				};
				
				if(target.player.alliance != undefined){
					obj.pAlliId = target.player.alliance.id;
					obj.pAlli = target.player.alliance.name;
				}
				
				t.terrains.Wildernesses.push(obj);
			}
		}
		
		if (++t.curIX >= t.widthI){
			t.curIX = 0;
			if (++t.curIY >= t.widthI){
				
				// print csv to console?
				if(t.options.printCSV){
					console.log( t.toCSV(t.terrains,'City') );
					console.log( t.toCSV(t.terrains,'Outpost') );
					console.log( t.toCSV(t.terrains,'Wildernesses') );
				}
				
				t.callback ({done:true,terrains:t.terrains});
				return;
			}
		}
		t.step = t.step - 1;
		t.callback ({done:false});

		setTimeout (function(){
			var params = {};
			params['user_id']		= FlashVars.user_id;
			params['x']				= t.normalize(t.firstX+(t.curIX*15));
			params['y']				= t.normalize(t.firstY+(t.curIY*15));
			params['timestamp']		= parseInt(serverTime());
			params['_session_id']	= FlashVars.session_id;
			params['dragon_heart']	= FlashVars.dragon_heart;
			params['version']		= API_VERSION;
			new MyAjax.RequestDOA ('map.json', params, t.gotMapObj, false);
		}, Math.randRange(MAP_DELAY*2,MAP_DELAY*4) );
	},
	
	toCSV : function(terrains,type,structure){
		if (terrains[type] == undefined) {
			return;
		}
		if(structure == undefined){
			structure = [
				'pAlli',
				'pName',
				'x',
				'y',
				'pLvl',
				'pMight',
				'name',
				'lvl',
				'type',
				'maxLife'
			];
		}
		var csv = [];
		// headers
		csv.push(structure.join(';').replace(/\"/,''));
		// structure
		console.log(terrains[type].length);
		for(var i=0; i < terrains[type].length; i++){
			console.log(terrains[type].name);
			var row='';
			for(var j=0; j < structure.length; j++){
				if ( (terrains[type])[structure[j]] != undefined){
					row += (terrains[type])[structure[j]];
				}
				row += ';';
			}
			csv.push(row);
		}
		return csv;
	},
	
	sortBy : function(terrains,key,type){
		if (terrains[type] != undefined) {
			terrains[type].sort(function(a,b){
				return a[key] - b[key];
			});
		}
	},
	
	sortByDist : function(terrains,type){
		if (terrains[type] != undefined) {
			terrains[type].sort(function(a,b){
				return a.dist - b.dist;
			});
		}
	},
	
	sortByLevel : function(terrains, type){
		Map.sortBy(terrains,'Level', type);
	},
	
	getTargetByCoords : function(x, y, callback){
		Map.scanMapObj(x, y, 1, function(res){
			if(res.done){
				for (var type in res.terrains){
					for (var i=0; i < res.terrains[type].length; i++){
						if ( (res.terrains[type])[i].x == x && (res.terrains[type])[i].y == y){
							if(callback) callback( (res.terrains[type])[i] );
							return;
						}
					}
				}
			} else {
				if(callback) callback(false);
				return;
			}
		});
	},
	
	checkOurCoords : function(){
		var t = Map;
		if (Data.map.x != Seed.cities[0].x || Data.map.y != Seed.cities[0].y){
			
			Data.map.x = Seed.cities[0].x;
			Data.map.y = Seed.cities[0].y;
			
			// ReCalculates Distances
			for (var n in Data.map.terrains){
				var targets = Data.map.terrains[n];
				for (var i=0; i< targets.length; i++){
					targets[i].dist = getDistance(Data.map.x, Data.map.y, targets[i].x, targets[i].y);
				}
			}
		}
	},
	
	simulateOpenMap : function(x, y, callback) {
		var t = Map;
		
		if(callback) setTimeout(callback, 1000);
		
		t.getTargetByCoords( x || t._lastPos.x, y || t._lastPos.y );
		
		t._lastPos.x = x || Seed.cities[0].x;
		t._lastPos.y = y || Seed.cities[0].y;
	},
	
	normalize : function (x){
		if (x > 750){
			x -= 750;
		}
		if (x < 0){
			x += 750;
		}
		return x;
	}
}; // End Map



// TODO: reduce n/w traffic - cache up requests
Messages = {
	readList : [],
	fetchTimer : null,
	lastQueued : 0,
	battleReportListeners : [],
	checkBusy : false,

	init : function (){
		Messages.checkMessages(500);
		window.addEventListener ('unload', Messages.onUnload, false);
	},

	marchAtTarget : function (){
		var t = Messages;
		t.checkMessages();
	},

	deleteQueue : [],
	deleteMessage : function (msgId){
		var t = Messages;
		if (t.deleteQueue.length == 0){
			t.deleteTimer = setTimeout (doit, Math.randRange(60000,70000));
		}
		t.deleteQueue.push (msgId);
		function doit (){
			var t = Messages;
			//logit ('DELETE MESSAGES:\n'+ inspect (t.deleteQueue, 5, 1));      
			MyAjax.messageDelete (t.deleteQueue, function (r){
				var t = Messages;
				t.deleteQueue = [];
			});
		}
	},

	onUnload : function (){
		var t = Messages;
		if (t.deleteQueue.length>0){
			MyAjax.messageDelete (t.deleteQueue);
		}
	},

	// check for battle reports
	checkMessages : function (maxWaitMillis){
		var t = Messages;
		if (t.battleReportListeners.length == 0){
			return;
		}
		if (maxWaitMillis == null)
		maxWaitMillis = 30000;
		RequestQueue.add ('checkMessages', doit, maxWaitMillis);      
		
		function doit (){
			MyAjax.messageList ('all', function (r){
				var t = Messages;
				if (r==null)
				return;
				//logit ('messageList:\n' + inspect (r, 7, 1));        
				for (var i=r.length-1; i >= 0; i--)
				{
					if (r[i].report_type=="BattleReport" && !r[i].read_at)
					{
						if (t.readList.indexOf(r[i].id) < 0){
							t.readList.push (r[i].id);
						}
					}
				}
				clearTimeout (t.fetchTimer);
				if (t.readList.length > 0){
					t.fetchTimer = setTimeout (t.fetchNext, Math.randRange(2000,4000));
				}
			});
		}
	},  

	fetchNext : function (){
		var t = Messages;
		var id = t.readList[0];
		if (!id){
			logit ('t.readList BAD MESSAGE ID:\n'+ inspect (t.readList, 8, 1));
			return;
		}    
		clearTimeout (t.fetchTimer);
		MyAjax.messageDetail (id, function (r){
			var t = Messages;
			t.readList.shift();
			t.gotBattleReport (r);
			if (t.readList.length > 0){
				t.fetchTimer = setTimeout (t.fetchNext, Math.randRange(2500,5000));
			}
		});
	},

	gotBattleReport : function (rpt){
		var t = Messages;
		if (DEBUG_MARCHES){
			WinLog.write ('Read Message: '+ rpt.report.location.terrain +' , '+ rpt.report.location.x +','+  rpt.report.location.y +' General: '+ rpt.report.attacker.general.id );    
		}
		for (var i=0; i < t.battleReportListeners.length; i++){
			t.battleReportListeners[i](rpt);
		}
	},

	addBattleReportListener : function (notify){
		var t = Messages;
		t.battleReportListeners.push (notify);
	},

	removeBattleReportListener : function (notify){
		var t = Messages;
		var i = t.battleReportListeners.indexOf (notify);
		if (i>=0){
			t.battleReportListeners.splice (i, 1);
		}
	}

}; // END Messages


RequestQueue = {
	que : {},
	add : function (id, func, maxWaitMillis){
		var t = RequestQueue;
		var now = serverTime();
		var maxWait = maxWaitMillis/1000;
		if (isNaN(maxWaitMillis)){
			maxWait = 1;
		}
		if (t.que[id]){
			if (now + maxWaitMillis >= t.que[id][2]){
				return;
			}
			clearTimeout(t.que[id][1]);  
		} 
		var timer = setTimeout (function(){myFunc(id)}, Math.randRange(maxWait*1000,maxWait*1250));
		t.que[id] = [func, timer, now+maxWait];
		//dispQ ('RequestQueue.add id='+ id);  
		function myFunc(id){
			var t = RequestQueue;
			var func = t.que[id][0];
			delete t.que[id];
			//dispQ ('RequestQueue.doit id='+ id);  
			func();
		}
		
		// Translation
		function dispQ (msg){
			var now = serverTime();
			var m = msg + ' (now='+ now +'):\n';
			for (var p in RequestQueue.que){
				m += p +' : '+ RequestQueue.que[p][1] +' : '+ RequestQueue.que[p][2] +' ('+ (RequestQueue.que[p][2]-now) +')\n';
			}
			WinLog.write (m);
		}   
	}, 

	isPending : function (id){
		var t = RequestQueue;
		return t.que[id]?true:false;
	}
}; //END RequestQueue



Seed = {
	cities			: [],	  // cities
	cityIdx			: {},     // 'indicies'
	cityTs			: {},     // timestamps of last update
	jobs			: {},     // by city
	marches			: {},
	numMarches		: 0,
	generals		: {},
	requirements	: {building:[], research:[], troop:[]},
	numGenerals		: 0,
	serverTimeOffset: 0,
	numCities		: 0,
	cityInit		: 0,
	
	init : function (callback) {
		var t = Seed;
	
		t.fetchPlayer(function (r) {
			if (r.ok) {
				verboseLog('Player data was Successfully requested from the server');
			}
			if (callback){
				callback(r);
			}
		});
		setInterval(t.tick, 1000);
	},
	
	fetchPlayer : function (callback) {
		var t = Seed, city;
		var params = {};
		params['user_id']		= FlashVars.user_id;
		params['_session_id']	= FlashVars.session_id;
		params['version']		= API_VERSION;
		params['timestamp']		= parseInt(serverTime());
		params['dragon_heart']	= FlashVars.dragon_heart;		
		new MyAjax.RequestDOA ('player.json', params, function (r) {
			if (r.ok && !r.dat.errors) {
				if (r.dat.timestamp){
					t.serverTimeOffset = r.dat.timestamp - (new Date().getTime() / 1000);
				}
				
				t.player = r.dat; 
				
				t.numCities = 0;
				t.cityInit = 0;
				
				for (city in r.dat.cities) {
					t.numCities = t.numCities + 1;
				}

				try {
					for (city in r.dat.cities){
						t.fetchCity(r.dat.cities[city].id);
					}
				} catch (e) {
					r.ok = false;
					r.errmsg = e.toString();
				}
			}
			else if (r.ok && r.dat.errors) {
				r.ok = false;
				r.errmsg = r.dat.errors;
			}
			
			if (callback){
				callback(r);
			}
		});
	},
	
	fetchCity : function (cityId) {
		verboseLog('Attempting fetchCity ' + cityId);
		var t = Seed;
		var params = {};
		params['user_id']		= FlashVars.user_id;
		params['dragon_heart']	= FlashVars.dragon_heart;
		params['_session_id']	= FlashVars.session_id;
		params['timestamp']		= parseInt(serverTime());
		params['version']		= API_VERSION;
		new MyAjax.RequestDOA ('cities/'+ cityId +'.json', params, function (r) {
			if (r.ok && !r.dat.errors) {
				if (r.dat.timestamp){
					t.serverTimeOffset = r.dat.timestamp - (new Date().getTime() / 1000);
				}
				
				try {
					t.updateCity(r.dat.city);
					verboseLog('Updated coords for ' + r.dat.city.name + ' are ' + r.dat.city.x + '/' + r.dat.city.y);
				} catch (e) {
					r.ok = false;
					r.errmsg = e.toString();
				}
			}
			else if (r.ok && r.dat.errors) {
				r.ok = false;
				r.errmsg = r.dat.errors;
			}
		});
	},

	tick : function () {     // called once per second - to check for job completion
		var t = Seed;
		var now = serverTime () - 1;
		// delete expired marches ...
		for (var pm in t.marches) {
			var march = t.marches[pm];
			if ((march.run_at < now-30) || (march.status=='returning' && march.run_at < now-2)) {
				delete (t.marches[pm]);
				--t.numMarches;
			}
		}
		// check for job completion
		for (var pcity in t.jobs) {
			for (var pjob in t.jobs[pcity]) {
				var job = t.jobs[pcity][pjob];
				if (job.run_at < (now - 300)) {
					if (job.done) {
						delete (t.jobs[pcity][pjob]);
					} else {
						//WinLog.write ('****** TIMER Seed.tick: RETAINING \'UNDONE\' JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
						//logit ('****** TIMER Seed.tick: RETAINING \'UNDONE\' JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
					}
				} else if (!job.done && job.run_at<now) {
					//WinLog.write ('TIMER Seed.tick: fetchCity JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
					job.done = true;
					delete (t.jobs[pcity][pjob]);
					var march = t.marches[job.march_id];
					// if (!march), march just finished (returned)          
					if (march && job.queue=='march' && march.status=='marching') {  // march just reached target
						if (DEBUG_MARCHES){
							WinLog.write ('MARCH at TARGET!');
						}
						Messages.marchAtTarget(march);
					}
					t.fetchCity (pcity);
					return;
				}
			}
		}
	},
	// TODO: fix march destination when city (shows as bog)
	updateCity : function (city) {
		var t = Seed;
		
		verboseLog('Updating City values: ' + city.name);
		
		var cityIdx = (city.type == 'Capital') ? 0 : (city.name.charAt(city.name.length-1));
		
		t.cities[cityIdx] = city;
		
		t.cityIdx[city.id] = cityIdx;
		
		t.cityTs[city.id] = serverTime();  
		
		if (cityIdx == 0) {
			// Update Seed.generals
			for (var i=0; i<city.generals.length; i++)
			{
				t.generals[city.generals[i].id] = city.generals[i];
			}
			t.numGenerals = city.generals.length;
			
			// Update Seed.marches
			t.numMarches = 0;
			for (var i=0; i < city.marches.length; i++)
			{
				var march = city.marches[i];
				
				if (march.general_id){
					t.generals[march.general_id].busy = true;
				}
				
				if (t.marches[march.id] != undefined){
					if (march.status == 'marching'){
						++t.numMarches;
					}
				}
			
				t.checkMarchStatus (march);
			}
			verboseLog('Updated Seed.marches - total:' + city.marches.length + ' / marching: ' + t.numMarches + ' - returning: ' + (city.marches.length ? city.marches.length - t.numMarches - 1 : 0));
		}
		
		// Check Jobs
		for (var i=0; i < city.jobs.length; i++){
			t.checkAddJob (city.jobs[i]);
		}
		
		if (t.cityInit < t.numCities) {
			t.cityInit = t.cityInit + 1;
			verboseLog(city.name + ' Successfully initialised');
		} else {
			verboseLog(city.name + ' Successfully updated');
		}
	},

	// if fetchcity is pending, will notify when complete, else notifies right away...
	updateNotifyQueue : [],
	notifyOnUpdate : function (notify) {
		verboseLog('updateNotifyQueue');
		var t = Seed;
		if (!RequestQueue.isPending('fetchCity')) {
			notify();
			return;
		}
		t.updateNotifyQueue.push (notify);
	},

	checkMarchStatus : function (march){
		var t = Seed;

		var m = cloneProps(march);
		
		if (m.march_type == 'AttackMarch'){
			m.march_type = 'Attack';
		}
		else if (m.march_type == 'TransportMarch'){
			m.march_type = 'Transport';
		}
		
		if (m.status == 'retreating'){
			m.status = 'returning';
		}
		

		if (m.status == 'returning'){
			m.last_status = m.status;
		}
		
		m.target = m.destination_name  ? translate('City') +' '+ m.destination_name : translate(m.terrain_type);
		
		t.marches[m.id] = m;
	},

	checkAddJob : function (job){
		var t = Seed;
		var cityId = job.city_id;
		if (!job.run_at){
			WinLog.write ('checkAddJob job.run_at is null:\n'+ inspect (job, 5, 1));
			if (ALERT_ON_BAD_DATA){
				alert ('checkAddJob job.run_at is null');
			}
		}    
		
		if (!t.jobs[cityId]){
			t.jobs[cityId] = {};
		}
		if (job.queue == 'march'){
			if (!t.marches[job.march_id]){
				WinLog.write ('checkAddJob MISSING MARCH:\n'+ inspect (job, 5, 1) +'\n'+ inspect(t.marches, 5, 1));
				if (ALERT_ON_BAD_DATA){
					alert ('checkAddJob MISSING MARCH');
				}
				if (job.run_at < serverTime()){
					return;               // ?????? delete from Seed.jobs  ????
				}
			} 
			else {  
				t.marches[job.march_id].run_at = job.run_at;
				t.marches[job.march_id].duration = job.duration;
			}
		} 
		
		if (job.queue == 'units'){
		}

		if (t.jobs[cityId][job.id]){
			return;
		}
		job.run_at += 2;      
		t.jobs[cityId][job.id] = cloneProps(job);
	},

	checkIncomingData : function (r){
		var t = Seed;
		// check seed for missing building ...      
		for (var ij=0; ij < r.dat.city.jobs.length; ij++)
		{
			var job = r.dat.city.jobs[ij];
			if (job.queue == 'building'){
				var building = null;
				for (var im=0; im < r.dat.city.buildings.length; im++)
				{
					if (r.dat.city.buildings[im].id == job.city_building_id){
						building = r.dat.city.buildings[im];
						break;
					}
				}
				if (!building){
					WinLog.writeText ('*********************** MISSING BUILDING! ('+ job.city_building_id +') now='+ serverTime() +'\n' + inspect (job, 7, 1) +'\n'+ inspect (r, 12, 1));
					if (ALERT_ON_BAD_DATA){
						alert ('Danger Will Robinson! (missing building)');
					}
				}
			}
		}
		
		if (!r.dat.city.marches){
			return;
		}
		// check seed for missing march ...  
		for (var ij=0; ij < r.dat.city.jobs.length; ij++)
		{
			var job = r.dat.city.jobs[ij];
			if (job.march_id){
				if (t.findMarch(job.march_id, r.dat.city.marches) == null){
					WinLog.writeText ('*********************** MISSING MARCH, Job ID:'+ job.march_id +' (now='+ serverTime() +')\n'+ inspect (job, 7, 1) +'\n'
					+ inspect (r, 12, 1));
					if (ALERT_ON_BAD_DATA){
						alert ('Danger Will Robinson! (missing march)');
					}
				}
			}
		}   
		// check seed for missing march job ...  
		for (var im=0; im < r.dat.city.marches.length; im++)
		{
			var march = r.dat.city.marches[im];
			var job = null;
			for (var ij=0; ij < r.dat.city.jobs.length; ij++)
			{
				if (r.dat.city.jobs[ij].march_id == march.id){
					job = r.dat.city.jobs[ij];
					break;
				}
			}
			if (job==null){
				WinLog.writeText ('*********************** MISSING JOB FOR MARCH!  marchId:'+ march.id +'\n'+ inspect (r, 11, 1));
				if (ALERT_ON_BAD_DATA){
					alert ('MISSING JOB FOR MARCH!');
				}
			}
		}
	},

	findMarch : function (mid, marches){
		for (var im=0; im < marches.length; im++){
			if (marches[im].id == mid){
				return marches[im];
			}
		}
		return null;
	}

}; // END Seed




Translation = {
	xml		 : {},
	
	availableLangs : {
		da:true, 
		de:true, 
		en:true, 
		es:true, 
		fr:true, 
		gr:false, 
		id:false, 
		it:true, 
		nl:true, 
		pl:true, 
		pt:false, 
		ru:false,
		sv:true, 
		tr:true
	},
	
	/* WARNING: DON'T CHANGE THIS ORDER */
	_section : [
		'items',
		'common',
		'buildings',
		'messages',
		'dialogs',
		'levels',
		'troops',
		'map',
		'research'
	],
	
	init : function (notify) {
		var t = Translation;
		t.fetchLocale(function (r) {
			if (r.ok) {
				verboseLog('Locale data was Successfully requested from the sever');
				t.fixResults();
			}
			if (notify){
				notify(r);
			}
		});
	},

	fetchLocale : function (notify) {
		var t = Translation;
		new MyAjax.RequestDOA ('locales/' + (t.availableLangs[LANG_CODE]?LANG_CODE:'en') + '.xml', {'_swf_session_id':FlashVars.session_id}, function (r) {
			if (r.ok) {
				try {
					t.parseXML(r.dat);
					
				} catch (e) {
					r.ok = false;
					r.errmsg = e.toString();
				}
			} 
			else if (r.errmsg.indexOf('404') !== -1) {
				new MyAjax.RequestDOA('locales/en.xml', {'%5Fswf%5Fsession%5Fid':FlashVars.sessionId}, function (r) {
					if (r.ok) {
						try {
						
							t.parseXML(r.dat);
							
						} catch (e) {
							r.ok = false;
							r.errmsg = e.toString();
						}
					}
					if (notify) {
						notify(r);
					}
				});
			}
			if (notify){
				notify(r);
			}
		});
	},
	
	parseXML : function(xmlStr){
		var t = Translation;
		var XMLString = [];
	
		XMLString.push('<?xml version="1.0" encoding="UTF-8"?>');
		XMLString.push('<translations>');
		for (i=0; i < t._section.length; i++){
			var start = xmlStr.indexOf('<'+t._section[i]+'>');
			var end = xmlStr.indexOf('</'+t._section[i]+'>') + t._section[i].length + 3;
			XMLString.push(xmlStr.substring(start, end));
			xmlStr = xmlStr.substring(1, start) + xmlStr.substring(end);
		}
		XMLString.push('</translations>');
					
		XmlTree = new XML.ObjTree();
		t.xml = XmlTree.parseXML( XMLString.join('').replace(/\n/g,'') );

		if (t.xml.translations){
			t.xml = t.xml.translations;
		} else {
			verboseLog('<b>ERROR</b> in the XML file structure: <b><translations></b> element not found!');
		}
	},
	
	fixResults : function(){
		var t = Translation.xml;
		
		// Convert Objects in flat Object
		// ex: 
		//     root-key : { title: '', content-1: { name: '', desc: ''} }
		//
		// become
		//
		//     root-key-title: '' & root-key-content-1-name : '' & root-key-content-1-desc : ''
		// 
		function objectToFlat(obj){
			var r={};
			for(var key in obj){
				if(typeof obj[key] == 'object'){
					for (var subkey in obj[key]){
						if(typeof (obj[key])[subkey] == 'object'){
							for (var subsubkey in (obj[key])[subkey]){
								if(subsubkey == 'title' || subsubkey == 'name'){
									r[key+'-'+subkey] = ((obj[key])[subkey])[subsubkey];
								} else {
									r[key+'-'+subkey+'-'+subsubkey] = ((obj[key])[subkey])[subsubkey];
								}
							}
						} else {
							if(subkey == 'title' || subkey == 'name'){
								r[key] = (obj[key])[subkey];
							} else {
								r[key+'-'+subkey] = (obj[key])[subkey];
							}
						}
					}
				} else {
					r[key] = obj[key];
				}
			}
			return r;
		}
		
		var section = ['dialogs','messages'];//,'errors','confirmations'
		for (var i=0; i < section.length; i++) {
			t[section[i]] = objectToFlat( t[section[i]] );
		}
			
		
		
		t.common.information = t.common.info;
		t.common.omit = t.common.skip;
		t.common['spy-on'] = t.common.spy;
		t.dialogs.researching = t.dialogs.research;
		
		t.common['enter-coords'] = t.dialogs['attack-screen-enter-coords'];
		t.common['battle-report'] = t.messages['battle-report-title'];
		t.common['auto-collection-of-resources'] = t.dialogs['boost-collect-day'].replace(/:/,'');
		
		t.common.levels = findSimilarWord(t.common.level, t.messages['spy-tip-prefix']);
		
		delete t.common.error;
		delete t.common.home;
		delete t.common.info;
		delete t.common['ranged-attack'];
		delete t.common.skip;
		delete t.common.spy;
		delete t.messages.date;
		delete t.messages.fought;
		delete t.messages.subject;
		delete t.messages.to;
		delete t.dialogs.research;
		delete t.dialogs.spy;
		delete t.dialogs.unavailable;
		delete t.dialogs.upkeep;
	},
	
	_normalize : function (str){
		return str.toLowerCase().replace(/ /g,'-');
	},
	
	getContent : function(section,key,subkey){
		key = Translation._normalize(key);
		if(Translation.xml[section] != undefined) {
			if( (Translation.xml[section])[key] != undefined ) {
				return subkey ? ((Translation.xml[section])[key])[subkey] : (Translation.xml[section])[key];
			}
		}
		return false;
	},
	
	buildings : function(key,subkey){
		subkey = subkey != undefined ? subkey : 'name';
		return Translation.getContent('buildings',key,subkey);
	},
	
	common : function(key){
		return Translation.getContent('common',key);
	},
	
	items : function(key,subkey){
		subkey = subkey != undefined ? subkey : 'name';
		return Translation.getContent('items',key,subkey);
	},
	
	dialogs : function(key){
		return Translation.getContent('dialogs',key);
	},
	
	levels : function(key){
		return Translation.getContent('levels',key,'title');
	},
	
	map : function(key,subkey){
		subkey = subkey != undefined ? subkey : 'name';
		return Translation.getContent('map',key,subkey);
	},
	
	messages : function(key){
		return Translation.getContent('messages',key);
	},
	
	troops :  function(key,subkey){
		subkey = subkey != undefined ? subkey : 'name';
		return Translation.getContent('troops',key,subkey);
	},
	
	research :  function(key,subkey){
		subkey = subkey != undefined ? subkey : 'name';
		return Translation.getContent('research',key,subkey);
	}
	
}; // END Translation

// Provide language translation services based on the browswer language
translate = function( text ) {
	//if (text==undefined) return;
	
	if ( LangObject[text] != undefined ) {
		return LangObject[text];
	}
	else {
		var newStr;
		for (var i=0; i < Translation._section.length; i++){
			newStr = Translation[Translation._section[i]](text);
			if (newStr){
				return newStr;
			}
		}
	}
	if(IS_NOT_NATIVE_LANG && ToTranslate[text] == undefined) {
		ToTranslate[text] = 1;
		if(Tabs.Log){
			logit( '( Translate ) -> ' + text );
		}
	}
	return text;
};

VerboseLog = {
	init : function () {
		var t = VerboseLog;
		t.setEnable(Data.options.verboseLog.enabled);
	},
	
	setEnable : function (onOff) {
		var t = VerboseLog;
		Data.options.verboseLog.enabled = onOff;
	}
};// END VerboseLog

//****************
// Functions
//****************


function objAddTo (o, name, val){
	if (!o[name]){
		o[name] = val;
	} else {
		o[name] += val;
	}
}

function generalList (cityIdx){
	var ret = {};
	var gens = Seed.cities[cityIdx].generals;
	for (var i=0; i < gens.length; i++){
		ret[gens[i].id] = gens[i].name +' ('+ gens[i].rank +')';
	}
	return ret;
}

function getTroopNumbers (cityIdx, troopType) {
	var city = (typeof cityIdx == 'number') ? Seed.cities[cityIdx] : cityIdx;
	var incity = city.units[troopType] ? city.units[troopType] : 0;
	var marches = 0;
	for (var march in Seed.marches){
		for (var name in Seed.marches[march].units){
			if (troopType == name){
				marches += Seed.marches[march].units[name];
			}
		}
	}
	return {incity:incity, marches:marches, total:incity+marches};
}

function getAvailableGeneral (){
	for (var p in Seed.generals){
		if (!Seed.generals[p].busy){
			return Seed.generals[p];
		}
	}
	return null;
}

function getMusterPointSlots (cityIdx){
	var lvl = Buildings.getLevel (cityIdx, kMusterPoint);
	if (!lvl){
		return 0;
	}
	return lvl - Seed.numMarches;
}

function getMusterPointLevel (cityIdx){
	var lvl = Buildings.getLevel (cityIdx, kMusterPoint);
	return (!lvl) ? 0 : lvl;
}

function getBuildingJob (cityIdx){
	var cid = Seed.cities[cityIdx].id;
	for (var p in Seed.jobs[cid]){
		var job = Seed.jobs[cid][p];
		if (job.queue == 'building'){
			return ({job:job, building:Buildings.getById(cityIdx, job.city_building_id)});
		}
	}
	return null;
}

function getResearchJob (cityIdx){
	var cid = Seed.cities[cityIdx].id;
	for (var p in Seed.jobs[cid]){
		var job = Seed.jobs[cid][p];
		if (job.queue == 'research'){
			return (job);
		}
	}
	return null;
}

function getBuildingById (cityIdx, bId){
	var b = Seed.cities[cityIdx].buildings;
	for (var i=0; i<b.length;i++){
		if (b[i].id == bId){
			return b[i].type;
		}
	}
	
	return '';
}

function MarchTracker (){
	var marches = {};

	function MarchTracker (){
	}

	this.setReportDelete = function (onOff){
	}
	this.setTroopLossListener = function (listener){
	} 
}

function deleteResearchJob(job){
	var cid = Seed.cities[0].id;
	var jobs = Seed.jobs[cid];
	for (var p in jobs){
		if (jobs[p] == job){
			delete jobs[p];
		}
	} 
}

function deleteBuildJob(cityIdx, job){
	var cid = Seed.cities[cityIdx].id;
	var jobs = Seed.jobs[cid];
	for (var p in jobs){
		if (jobs[p] == job){
			delete jobs[p];
		}
	} 
}

function getBuildJob (cityIdx){
	var cid = Seed.cities[cityIdx].id;
	var jobs = Seed.jobs[cid];
	for (var p in jobs){
		if (jobs[p].queue == 'building'){
			return jobs[p];
		}
	}
	return null;
}

function getTrainJob (cityIdx){
	var cid = Seed.cities[cityIdx].id;
	var jobs = Seed.jobs[cid];
	for (var p in jobs){
		if (jobs[p].queue == 'units'){
			return jobs[p];
		}
	}
	return null;
}

function trainTable (myId){
	var m = '<table class=' + UID['table'] + '>';
	var now = serverTime();
	var mtClass = '' + UID['row_marchMine'];
	for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++)
	{
		var jobs = Seed.cities[cityIdx].jobs;
		for (var j=0; j < jobs.length; j++)
		{
			var time = jobs[j].run_at - now;
			if (time < 0){
				time = '?';
			} else if (isNaN (time)){
				time = '---';
			} else {
				time = timeFormat(time, true);
			}
			if (jobs[j].queue == 'units' && jobs[j].unit_type){
				m += '<tr class='+ mtClass +'><td><b>'+ translate('Training') +':</b>&nbsp;</td><td align=right>'+ jobs[j].quantity +'&nbsp;</td><td>&nbsp;'+ translate(jobs[j].unit_type) +'&nbsp;</td><td>&nbsp;'+ time +'</td></tr>';   
			}
		}
	}
	return m + '</table>';
}

function marchTable (myId){
	var m = '<table class=' + UID['table'] + '>';
	var now = serverTime();
	for (var p in Seed.marches)
	{
		var march = Seed.marches[p];
		
		Seed.checkMarchStatus(march);
		
		var time = march.run_at - now;
		var mtClass='' + UID['row_marchOther'];
		
		if (march.ownerId == myId){
			mtClass = '' + UID['row_marchMine'];
		}
		
		if (time < 0){
			time = '...';
			march.status = 'waiting'
		} else if (isNaN (time)){
			time = '---';
		} else {
			time = timeFormat(time, true);
		}
		
		if (march.status == 'returning' || 
		   (march.last_status != undefined && march.last_status == 'returning')
		   ){
			m += '<tr class='+ mtClass +'>'
			+ '	<td><b>'+ translate('returning') + ':</b></td>'
			+'	<td>'+ march.target +'&nbsp;</td>'
			+'	<td></td>'
			+'	<td>'+ translate(march.status) +'</td>'
			+'	<td>'+ time +'</td>';
		} else {
			m += '<tr class='+ mtClass +'>'
			+ '	<td><b>'+ translate('Attacking') + ':</b></td>'
			+'	<td>'+ march.target +'&nbsp;'+ march.terrain_level +'&nbsp;</td>'
			+'	<td><span class=jewel> [' + march.x +'/'+ march.y +']</span></td>'
			+'	<td>'+ translate(march.status) +'</td>'
			+'	<td>'+ time +'</td>';
		}
		
		
		// // Not working properly,..we need a better way to do it !!!!
		/* march_type = TransportMarch
		if(march.status != 'retreating' && march.status != 'returning'){
			m += '<td><input id=m' + march.city_id + march.id + '  type=button class="'+UID['bnt_red']+' small" value="'+translate('Cancel')+'" /></td>';
		}
		*/
		
		m +='</tr>';
		
	}
	return m +'</table>';
}



//******************************** Info Tab *****************************
Tabs.Info = {
	tabOrder	: INFO_TAB_ORDER,
	tabLabel	: 'Info',
	tabDisabled	: !INFO_TAB_ENABLE,
	container	: null,
	timer		: null,
	troopTypes	: [kPorter,kConscript,kSpy,kHalberdsman,kMinotaur,kLongbowman,kSwiftStrikeDragon,kBattleDragon,kArmoredTransport,kGiant,kFireMirror,kAquaTroop,kStoneTroop,kFireTroop,kWindTroop],
	dragonTypes	: [kGreatDragon,kWaterDragon,kStoneDragon,kFireDragon,kWindDragon],

	init : function (div){
		var t = Tabs.Info;
		t.container = div;
		div.innerHTML = '<div id='+setUID('tabInfo_Title')+' class=' + UID['title'] + '>'+ SCRIPT_TITLE +'&nbsp;-&nbsp;v' + SCRIPT_VERSION +'</div>'
		+'<table width=100%><tr>'
		+'	<td><input id='+ setUID('tabInfo_Refresh') +' type=button value='+ translate('Refresh') +'></input></td>'
		+'	<td align=right><SPAN id='+ setUID('tabInfo_Time') +'></span></td>'
		+'</tr></table>'
		+'<div id='+ setUID('tabInfo_Content') +' class="' + UID['scrollable'] + '"></div>';
		$(UID['tabInfo_Refresh']).addEventListener ('click', t.refresh, false);
		//t.showStuff();
	},

	show : function (){
		var t = Tabs.Info;
		t.timer = setInterval (t.showStuff, 1000);
	},
	hide : function (){
		var t = Tabs.Info;
		clearTimeout (t.timer);
	},

	showStuff : function (){
		var t = Tabs.Info;
		//clearTimeout (t.timer);
		//logit (inspect (Seed.s, 8, 1));
		
		var city = Seed.cities[0];
		var m = cityTitle(0);
		m += '<table style="margin-top:3px" width=100%>'
		+'	<tr class=' + UID['row_headers'] + ' align=center>'
		+'		<td>'+ translate('Armed Forces') +'</td>'
		+'		<td>'+ translate('My Generals') +'</td>'
		+'	</tr>'
		+'	<tr valign=top align=center>'
		+'		<td width=50% style="border-right: 1px solid;">';
		
		// Troops
		m += '		<table class=' + UID['table'] + '>';
		for (var i=0; i < t.troopTypes.length; i++){
			var numTroops = getTroopNumbers(city, t.troopTypes[i]);
			
			m += '		<tr>'
			+'				<td class=right>'+ translate(t.troopTypes[i]) +':</td>'
			+'				<td align=right>'+ numTroops.incity +'</td>'
			+'				<td align=right>'+ (numTroops.marches?'&nbsp;+&nbsp;<b>(' + numTroops.marches + ')</b>':'') +'</td>'
			+'			</tr>';
		}
		
		m += '		</table>'
		+'		</td>'
		+'		<td width=50% style=" padding-left:7px">';
		
		// Generals
		m += '		<table class=' + UID['table'] + '>';
		
		var loc = '';
		for (var i=0; i < city.generals.length; i++)
		{
			if (Seed.numMarches){
				for (var pm in Seed.marches) {
					// The general object will be null if the march is a transport
					if (Seed.marches[pm].march_type != "Transport") {
						try {
							if (city.generals[i].name == Seed.marches[pm].general.first_name)
							loc = Seed.marches[pm].x + ',' + Seed.marches[pm].y;
						}
						catch (e) {
							verboseLog('<b>Error</b>: general first_name not available' + e.name + ' ' + e.message);
						}
					}
				}
			}
			
			m += '		<tr>'
			+'			<td align=right>'+ city.generals[i].name +' ('+ city.generals[i].rank +')</td>'
			+'			<td width=75%>'+ (city.generals[i].busy ? '<span class=jewel>[' + loc +']</span>' :'') +'</td>'
			+'			</tr>';
		}
		
		m += '		</table>'
		+'		</td>'
		+'		</tr>'
		+'</table>'
		+'<br>'
		+'<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<td class=left>'+ translate('Marching') +': </td>'
		+'		<td>'+ Seed.numMarches +'</td>'
		+'	</tr>'
		+'</table>'
		
		// Marches, building, research, training
		$(UID['tabInfo_Content']).innerHTML = m; 
		
		var now = new Date();  
		now.setTime(now.getTime() + (now.getTimezoneOffset()*60000));
		$(UID['tabInfo_Time']).innerHTML = '<b>' + now.toTimeString().substring (0,8) +'</b> UTC';

		function cityTitle (cityIdx){
			var city = Seed.cities[cityIdx];
			// Outposts are always defending (until further notice)
			var wallStatus = '';
			var alliance_name = (Seed.player.alliance) ? Seed.player.alliance.name : '';
			if (cityIdx == 0){
				wallStatus = (Seed.cities[cityIdx].defended) ? '<font class='+ UID['defending'] +'>'+ translate('Defend').toUpperCase() +'</font>' : '<font class='+ UID['hiding'] +'>'+ translate('Hiding').toUpperCase() +'</font>';
			} else {
				wallStatus = '<font class='+ UID['defending'] +'>'+ translate('Defend').toUpperCase() +'</font>';
			}
			
			return '<div class=' + UID['subtitle'] + '><TABLE class=' + UID['table'] + '><TR><TD align=left>'+ city.name +'</td><TD align=center>'+ city.x +','+ city.y + '</td><TD align=center width=200px><font color=yellow>' + alliance_name +'</font></td><TD width=80px align=right>'+ wallStatus +'</td></tr></table></div>';
		}
	},

	refresh : function (){
		logit('fetchPlayer from Tab.Info refresh');
		var t = Tabs.Info;
		Seed.fetchPlayer (t.showStuff());  
	}
} // END Tabs.Info


//******************************** Waves Tab *****************************
Tabs.Waves = {
	tabOrder	: WAVE_TAB_ORDER,
	tabLabel	: 'Wave',
	tabDisabled	: !WAVE_TAB_ENABLE,
	container	: null,
	troopTypes	: [kSpy, kArmoredTransport, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop],
	dragonTypes	: [kGreatDragon,kWaterDragon,kStoneDragon,kFireDragon,kWindDragon],
	enabled		: false,
	attackTimer	: null,
	marchTimer	: null,
	attackErrors: 0,
	currentWave : 1,

	init : function (div) {
		var t = Tabs.Waves;

		Data.init({
			waves: {
				enabled			: false,
				iterationMin	: 30,
				iterationMax	: 60,
				stopOnLoss		: true,
				deleteReports	: false,
				target	: {
					x	: 0,
					y	: 0,
					type: null,
					level: 0,
					stats: {
						numAttacks	: 0,
						spoils		: {}
					},
					troopsWave:{},
					dragonsWave:{}
				},
				runTime	: 0
			}
		});

		
		t.container = div;
		
		var m = ''
		+'<div class=' + UID['title'] + '>'+ translate('Wave') +'</div>'
		+'<div id=' + setUID('tabWave_Status') + ' class=' + UID['status_ticker'] + ' style="margin-bottom:5px !important">'
		+'	<center><input id=' + setUID('tabWave_OnOff') + ' type=button value="OnOff" /></center>'
		+'	<div id=' + setUID('tabWave_Marches') + ' style="margin-top:5px;height:140px; max-height:140px; overflow-y:auto;"></div>'
		+'	<div id=' + setUID('tabWave_Feedback') + ' class='+ UID['status_feedback'] +'></div>'
		+'</div>'
		+'<div class=' + UID['content'] + '>'
		+'	<div>'
		+'		<b>'+ translate('Enter Coords') +':&nbsp;</b>&nbsp;'
		+'		X: <input id=' + setUID('tabWave_CoordsX') + ' size=3 maxlength=3 type=text value="'+ Data.waves.target.x +'" /> '
		+'		Y: <input id=' + setUID('tabWave_CoordsY') + ' size=3 maxlength=3 type=text value="'+ Data.waves.target.y +'" /> '
		+'		&nbsp <b>'+ translate('Distance') +':</b> <span id=' + setUID('tabWave_Distance') + '></span><BR>'
		+'		<div class=' + UID['status_ticker'] + ' style="height:auto !important;margin:5px 10px !important;">'
		+'			<center><span id=' + setUID('tabWave_Tile') + '></span></center>'
		+'		</div>'
		+'	</div>'
		+'  <div>'
		+'  <center>'
		+'	<table id=' + setUID('tabWave_Troops') + ' class=' + UID['table'] + '>'
		+'		<tr align=center class=' + UID['row_headers'] + '>'
		+'			<td colspan=8>'+ translate('Troops for Wave Attack') +':&nbsp;</td>'
		+'		</tr>'
		+'	</table>'
		+'  </center>'
		+'	</div>'
		+'	<br>'
		+'  <div>'
		+'  <center>'
		+'	<table id=' + setUID('tabWave_Dragons') + ' class=' + UID['table'] + '>'
		+'		<tr align=center class=' + UID['row_headers'] + '>'
		+'			<td colspan=8>'+ translate('Send Dragon every certain number of waves') +':&nbsp;</td>'
		+'		</tr>'
		+'	</table>'
		+'  </center>'
		+'	</div>'
		+'	<br>'
		+'	<table class=' + UID['table'] + '>'
		+'		<tr>'
		+'			<td class=left> '+ translate('Delete') +' '+ translate('Battle Report') +':&nbsp;</td>'
		+'			<td><input id=' + setUID('tabWave_DelReports') + ' type=checkbox '+ (Data.waves.deleteReports?'CHECKED':'') +' /></td>'
		+'		</tr><tr>'
		+'			<td class=left>'+ translate('Stop if any troops lost') +':&nbsp;</td>'
		+'			<td><input id=' + setUID('tabWave_StopOnLoss') + ' type=checkbox '+ (Data.waves.stopOnLoss?'CHECKED':'') +' /></td>'
		+'		</tr><tr>'
		+'			<td class=left>'+ translate('Delay Between Attacks') +':&nbsp;</td>'
		+'			<td>'
		+'				<input id=' + setUID('tabWave_DelayMin') + ' type=text size=1 maxlength=4 value="'+ Data.waves.iterationMin +'" />'
		+'				 to <span id=' + setUID('tabWave_DelayMax') + '>'+ Data.waves.iterationMax +'</span>&nbsp;'+ translate('Seconds')
		+'			</td>'
		+'		</tr>'
		+'	</table>'
		+'</div>'
		+'<div class=' + UID['status_ticker'] + ' style="margin-top:10px !important">'
		+'	<center><input id=' + setUID('tabWave_ResetStats') + ' type=button value="'+ translate('Delete') +' '+ translate('Statistics') +'" /></center>'
		+'	<div id=' + setUID('tabWave_Stats') + '  style="height:100px; max-height:100px; overflow-y:auto"></div>'
		+'	<hr class=thin>'
		+'	<div id=' + setUID('tabWave_CurSpoil') + '> &nbsp; </div>'
		+'</div>';
		
		t.container.innerHTML = m;
		
		$(UID['tabWave_OnOff']).addEventListener ('click', function(){
			t.setWaveEnable(!Data.waves.enabled);
		}, false);
		$(UID['tabWave_CoordsX']).addEventListener ('change', t.eventCoords, false);
		$(UID['tabWave_CoordsY']).addEventListener ('change', t.eventCoords, false);
		$(UID['tabWave_ResetStats']).addEventListener ('click', t.resetStats, false);
		$(UID['tabWave_DelReports']).addEventListener ('click', function(e){
			Data.waves.deleteReports=e.target.checked;
		}, false);
		$(UID['tabWave_StopOnLoss']).addEventListener ('click', function(e){
			Data.waves.stopOnLoss=e.target.checked;
		}, false);

		$(UID['tabWave_DelayMin']).addEventListener ('change', delayChanged, false);

		troopTable ($(UID['tabWave_Troops']), 1, 'AW', t.eventTroops);

		dragonsTable ($(UID['tabWave_Dragons']), 1, t.eventDragons);

		window.addEventListener('unload', t.onUnload, false);
		t.setWaveEnable (false);
		t.marchTick();
		t.eventCoords();
		t.dispStats();
		Messages.addBattleReportListener(t.gotBattleReport);

		function troopTable (tab, rownum, prefix, listener) {
			var t = Tabs.Waves;
			var row =[];
			row.push(tab.insertRow(rownum));
			row.push(tab.insertRow(rownum+1));
			row.push(tab.insertRow(rownum+2));
			row.push(tab.insertRow(rownum+3));
			//row[0].align='center';
			
			var val, r=0, c=0;
			for (var i=0; i < t.troopTypes.length; i++)
			{
				/*
				if (getTroopNumbers(Seed.cities[0], t.troopTypes[i]).total < 1) {
					continue;
				}
				*/
				if (i == 5) {
					r = r + 2;
					c = 0;
				}
				var label = row[r].insertCell(c);
				label.innerHTML = translate('~'+t.troopTypes[i]);
				label.style.width = '45px';
				
				var input = document.createElement ('input');
				input.type = 'text';
				input.size = '1';
				input.style.width = '40px';
				input.title = translate(t.troopTypes[i]);
				
				if (i < 2) {
					input.style.border = '1px solid grey';
				} else if (i < 5) {
					input.style.border = '1px solid green';
				} else {
					input.style.border = '1px solid blue';
				}
				
				input.maxlength = '6'; // Allow 100,000 troops to be sent
				
				if (prefix=='AW'){
					if (Data.waves.target.troopsWave[t.troopTypes[i]] == undefined){
						Data.waves.target.troopsWave[t.troopTypes[i]] = 0;
					}
					val = Data.waves.target.troopsWave[t.troopTypes[i]];
				}
				
				if (!val){ val = 0;	}
				
				input.value = val;
				input.name = prefix +'_'+ i;
				$(input).addEventListener ('change', listener, false);
				
				row[r+1].insertCell(c).appendChild (input);
				
				c = c + 1;
				
			}
			return tab;
		}
		
		function dragonsTable (tab, rownum, listener) {
			var t = Tabs.Waves;
			var row =[];
			row.push(tab.insertRow(rownum));
			//row.push(tab.insertRow(rownum+1));
			
			var val;
			for (var i=0; i < t.dragonTypes.length; i++)
			{
				
				var cell = row[0].insertCell(i);
				cell.style.verticalAlign = 'middle';
				cell.style.paddingRight = '10px';
				
				var label = document.createElement ('span');
				label.innerHTML = translate(t.dragonTypes[i]).replace(/\s/,'<br>');
				label.style.display = 'inline-block';
				label.style.width = '45px';
				label.style.marginRight = '5px';
				
				var input = document.createElement ('input');
				input.type = 'text';
				input.size = '1';
				input.style.width = '15px';
				input.style.height = '15px';
				input.style.fontSize = '11pt';
				input.style.textAlign = 'center';
				input.title = translate(t.dragonTypes[i]);
				
			
				input.maxlength = '1'; 
				
				if (Data.waves.target.dragonsWave[t.dragonTypes[i]] == undefined){
					Data.waves.target.dragonsWave[t.dragonTypes[i]] = 0;
				}
				val = Data.waves.target.dragonsWave[t.dragonTypes[i]];
				
				if (!val){ val = 0;	}
				
				input.value = val;
				input.name = 'DW_'+ i;
				$(input).addEventListener ('change', listener, false);

				cell.appendChild (label);
				cell.appendChild(input);
				
			}
			return tab;
		}
		
		function delayChanged (e){
			var min = parseIntZero(e.target.value);
			var max = parseInt(min * 2);
			if (min < 30 || min > 3600){
				if(min < 30) min = 30;
				else min = 3600;
				// error dialog, etc ...
				e.target.style.backgroundColor = 'red';
				return;
			}
			$(UID['tabWave_DelayMax']).innerHTML = max;
			e.target.style.backgroundColor = '';
			Data.waves.iterationMin = min;
			Data.waves.iterationMax = max;
		}
	},

	curRunStart : 0,
	
	gotBattleReport : function (rpt){
		var t = Tabs.Waves;
		if (rpt.report.location.x == Data.waves.target.x && 
			rpt.report.location.y == Data.waves.target.y
			){
				++Data.waves.target.stats.numAttacks;
				for (var i=0; i < rpt.report.spoils.items.length; i++){
					if ( !Data.waves.target.stats.spoils[rpt.report.spoils.items[i]] )
					{
						Data.waves.target.stats.spoils[rpt.report.spoils.items[i]] = 1;
					}
					else {
						++Data.waves.target.stats.spoils[rpt.report.spoils.items[i]];
					}
					$(UID['tabWave_CurSpoil']).innerHTML = new Date().toTimeString().substring (0,8) +': '+ translate('Got') + ' '+ translate(rpt.report.spoils.items[i]);
				}
				t.dispStats();
				
				if (Data.waves.stopOnLoss)
				{
					for (var p in rpt.report.attacker.units)
					{
						if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1])
						{
							var ts = new Date(rpt.report_notification.created_at * 1000).myString();
							t.setWaveEnable (false);
							t.dispFeedback (translate('Troops lost') + '! (' + ts +')');
							actionLog (translate('Wave')+': '+translate('Troops lost')+'! ('+ ts +')');
							return;
						}
					}
				}
				if (Data.waves.deleteReports && rpt.report.attacker.name == Seed.player.name){
					Messages.deleteMessage(rpt.report_notification.id);
				}
		}
	},

	resetStats : function (){
		var t = Tabs.Waves;
		var now = serverTime();
		t.curRunStart = now;

		Data.waves.runTime = 0;
		Data.waves.target.stats = {numAttacks:0, spoils:{}};
		t.dispStats();
	},

	dispStats : function (){
		var t = Tabs.Waves;
		var runTime = Data.waves.runTime;
		
		if (Data.waves.enabled){
			runTime += (serverTime()-t.curRunStart);
		}
		
		var msg = '<table class=' + UID['table'] + ' width=100%>'
		+'	<tr>'
		+'		<td class=left>'+ translate('Run Time') +': </td>'
		+'		<td width=90%>'+ timeFormat(runTime, true) +'</td>'
		+'	</tr><tr>'
		+'		<td class=left>'+ translate('Attacks') +': </td>'
		+'		<td>'+ Data.waves.target.stats.numAttacks +'</td>'
		+'	</tr><tr>'
		+'		<td colspan=2><HR class=thin></td>'
		+'	</tr>';
		
		
		for (var item in Data.waves.target.stats.spoils)
		{
			var num = Data.waves.target.stats.spoils[item];
			var perHour = num / (runTime/3600);
			msg += '<tr>'
				+ '		<td class=left>'+ translate(item) +':</td>'  // TODO: Item Abbreviation in translateArrays
				+ '		<td>'+ num +' ('+ perHour.toFixed(2) +'&nbsp;'+ translate('per hour')+ ')</td>'
				+ '</tr>';
		}
		
		$(UID['tabWave_Stats']).innerHTML = msg + '</table>';
	},

	dispFeedback : function (msg){
		if (msg && msg!='')
		msg = new Date().toTimeString().substring (0,8) +' '+ msg;
		$(UID['tabWave_Feedback']).innerHTML = msg;
	},

	eventTroops : function (e){
		var t = Tabs.Waves;
		var args = e.target.name.split ('_');
		if (args[0] == 'AW'){
			var troopType = t.troopTypes[args[1]];
			Data.waves.target.troopsWave[troopType] = e.target.value;
		}
	},
	
	eventDragons : function (e){
		var t = Tabs.Waves;
		var args = e.target.name.split ('_');
		if (args[0] == 'DW'){
			var dragonType = t.dragonTypes[args[1]];
			Data.waves.target.dragonsWave[dragonType] = e.target.value;
		}
	},

	setWaveEnable : function (onOff){
		var t = Tabs.Waves;
		var but = $(UID['tabWave_OnOff']);
		clearTimeout (t.attackTimer);
		Data.waves.enabled = onOff;
		if (onOff){
			but.value = translate('Attacking').toUpperCase();
			but.className = UID['btn_on'];
			t.curRunStart = serverTime();
			if (!Data.options.objAttack.enabled){
				Data.attacks.currentAttack = 1;
				Data.attacks.startAt = serverTime();
			}
			t.waveAttackTick();
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
			if (t.curRunStart != 0){
				Data.waves.runTime += (serverTime()-t.curRunStart);
			}
		}
	},

	onUnload : function (){
		var t = Tabs.Waves;
		if (Data.waves.enabled && t.curRunStart!=0){
			Data.waves.runTime += (serverTime()-t.curRunStart);
		}
	},


	waveAttackTick : function (){
		var t = Tabs.Waves;
		var now = serverTime();
		var targetMsg='', retryDelay, availableGeneral, marching = 0, totalMarches=0, m;
		var waveUnits;
		
		clearTimeout (t.attackTimer);
		
		// Don't do anything if wave attacks are not enabled
		if (!Data.waves.enabled){
			return;
		}    
		
		
		var minTime = 700000;
		var maxTime = 0;
		for (m in Seed.marches){
			++totalMarches;
			if (Seed.marches[m].ownerId == 'camp'){
				++marching;
			}
			var restTime = ( Seed.marches[m].run_at - parseInt(serverTime()) ) * (Seed.marches[m].status=='marching'?2:1);
			minTime = minTime < restTime ? minTime : restTime;
			maxTime = maxTime > restTime ? maxTime : restTime;
		}
		
		retryDelay = totalMarches ? minTime*1000 + Math.randRange(2000,5000) : Math.randRange(6000,8000);
		
		
		targetMsg =  'a level ' + Data.waves.target.level + ' ' + Data.waves.target.type + ' at ' + Data.waves.target.x +'/'+ Data.waves.target.y;
		
		
		if (MyAjax.marchBusy > 0){
		
			MyAjax.marchBusy = totalMarches;
			if(MyAjax.marchBusy==0) t.attackBusy = false;
		
			verboseLog('<b>Wave</b> attack to ' + targetMsg + ' delayed due to <b>'+ totalMarches +'</b> pending march request: retry in ' + timeFormat(retryDelay/1000));

			t.dispFeedback(translate('Another march request is pending') + ': ' + translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
			t.attackTimer = setTimeout(t.waveAttackTick, retryDelay);
			return;
		}
		
		if (marching >= Data.options.objAttack.maxMarches){
			verboseLog('<b>Wave<b> attack to ' + targetMsg + ' delayed due to <b>march limit</b> reached: retry in ' + timeFormat(retryDelay/1000));

			t.dispFeedback(translate('March limit reached') + ': ' + translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay);
			return;
		}
		
		if (getMusterPointSlots(0) <= 0) {
			verboseLog('<b>Wave</b> attack to ' + targetMsg + ' delayed due to <b>insufficent march slots</b>: retry in ' + timeFormat(retryDelay/1000));
			t.dispFeedback(translate('Muster Point') +' '+ translate('Full') + ': ' + translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
			t.attackTimer = setTimeout(t.waveAttackTick, retryDelay);
			return;
		}
		
		availableGeneral = getAvailableGeneral();
		
		if (availableGeneral == null) {
			verboseLog('<b>Wave</b> attack to ' + targetMsg + ' delayed due to <b>insufficent generals</b>: retry in ' + timeFormat(retryDelay/1000));
			t.dispFeedback(translate('No generals available') + ': ' + translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
			t.attackTimer = setTimeout(t.waveAttackTick, retryDelay);
			return;
		}

		waveUnits = t.checkTroops(0, Data.waves.target.troopsWave);
		if (waveUnits !== null) {
			verboseLog('<b>Wave</b> attack to ' + targetMsg + ' delayed due to <b>' + waveUnits +' units</b>: retry in ' + timeFormat(retryDelay/1000));
			t.dispFeedback(waveUnits + ': ' + translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
			t.attackTimer = setTimeout(t.waveAttackTick, retryDelay);
			return;
		}
		
		
		var units = Object.clone(Data.waves.target.troopsWave);
		// Check Dragon Wave
		for (var dragonType in Data.waves.target.dragonsWave){
			if ( parseInt(Data.waves.target.dragonsWave[dragonType]) ){
				if ( (t.currentWave % Data.waves.target.dragonsWave[dragonType]) == 0){
					units[dragonType] = 1;
				}
			}
		}

		// All prerequisite checks are done so march request can be sent
		verboseLog('Wave attack to ' + targetMsg + ' Attempted');
		
		
		targetMsg = '#.'+ t.currentWave + ' ' + targetMsg;
		// Add Units to targetMsg
		targetMsg += '<br>' + translate('Sending') + ': ';
		var unitsMsg = [];
		for (var name in units){
			if(units[name] > 0){
				unitsMsg.push(translate(name) + '(' + units[name] + ')');
			}
		}
		targetMsg += unitsMsg.join(' + ');
		
				
		new MyAjax.marchSend (Seed.cities[0].id, Data.waves.target.x, Data.waves.target.y, availableGeneral.id, units, 'wave', function (r) {
			var t = Tabs.Waves, waveDelay, retryDelay;
			if (r.ok && r.dat.result.success)
			{
				++Data.attacks.currentAttack;
				++t.currentWave;
			
				t.attackErrors = 0;
				
				if ( Data.attacks.currentAttack > 49 )
				{
					if ( Data.attacks.startAt - serverTime() < 3600 ) {
						waveDelay = ( 3600 - (Data.attacks.startAt - serverTime()) ) * 1000;
						setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(waveDelay/1000))}, Data.waves.iterationMin*500 );
					} else {
						Data.attacks.startAt = serverTime();
						Data.attacks.currentAttack = 1;
					}
				}
				else if ((Data.attacks.currentAttack % 15) == 0)
				{
					waveDelay = 45 * totalMarches * 1000;
					setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + '<br>' + translate('waiting') + ': ' + timeFormat(waveDelay/1000))}, Data.waves.iterationMin*500 );
				}
				else {
					waveDelay = Math.randRange(Data.waves.iterationMin*1000, Data.waves.iterationMax*1000);
					setTimeout(function(){t.dispFeedback('')}, parseInt(waveDelay/2) );
				}

				verboseLog('Wave attack to: ' + targetMsg + ' Successfully');
				
				actionLog(translate('Wave attack to') + ': ' + targetMsg);
				
				t.dispFeedback (translate('Wave attack to')+ ': ' + targetMsg);

				//target.lastAttack = serverTime();
				t.attackTimer = setTimeout (t.waveAttackTick, waveDelay);
			}
			else {
				++t.attackErrors;
				retryDelay = 60000 * (t.attackErrors * t.attackErrors);
				
				verboseLog('<b>Wave<b> attack to: ' + targetMsg + ' <b>failed</b> and returned error' + ': ' + r.errmsg+ ' - retrying in ' + timeFormat(retryDelay/1000));
				
				actionLog(translate('Wave attack to')+ ' ' + targetMsg + ' ' + translate('failed'));

				t.dispFeedback(translate('Wave attack to')+ ' ' + targetMsg + ' failed');
				t.attackTimer = setTimeout(t.waveAttackTick, retryDelay);

			}
			// Erase feedback message
			setTimeout(function(){t.dispFeedback('');}, parseInt((waveDelay||retryDelay)/2) );
		});
	},

	// returns null if ok, else error message
	checkTroops : function (cityIdx, troops){
		var totalTroops = 0;
		for (var p in troops){
			if (troops[p] > 0){
				totalTroops += troops[p];
				if (Seed.cities[cityIdx].units[p] < troops[p]){
					return (translate('Not enough') + ' ' + translate(p));
				}
			}
		}
		if (totalTroops <= 0){
			return (translate('No Troops Defined'));
		}
		return null;
	},

	marchTick : function (){
		var t = Tabs.Waves;
		clearTimeout (t.marchTimer);
		$(UID['tabWave_Marches']).innerHTML = marchTable('wave');
		
		// Not working properly,..we need a better way to do it !!!!
		/*  
		for (var p in Seed.marches)
		{
			var march = Seed.marches[p];
			// march_type = TransportMarch
			if(march.status == 'retreating' || march.status == 'returning'){
				continue;
			}
			$('m' + march.city_id + march.id).addEventListener ('click', function(evt){
				evt.target.disabled = true;
				
				//var march = evt.target.id.substring(1).split('_');
				
				new MyAjax.marchRecall(march.city_id, march.id, function (r) {
					if (r.ok && r.dat.result.success) {
						Seed.marches[p].status = 'returning';
					} else {
					}
				});
			}, false);
			
		}
		*/
		
		t.marchTimer = setTimeout (t.marchTick, 1000);
	},
	
	// Calls Map.getTargetByCoords
	eventCoords : function (e){
		var ex = $(UID['tabWave_CoordsX']);
		var ey = $(UID['tabWave_CoordsY']);
		var x = parseIntZero (ex.value);
		var y = parseIntZero (ey.value);
		ex.value = x;
		ey.value = y;
		
		$(UID['tabWave_Distance']).innerHTML = getDistance(Seed.cities[0].x, Seed.cities[0].y, x, y);
		
		$(UID['tabWave_Tile']).innerHTML = '&nbsp;';
		
		if (x < 0 || x > 749){
			if(x < 0){
				while (x < 0){
					x = 750 + x;
				}
			} else {
				while (x > 749){
					x = x - 750;
				}
			}
			ex.style.backgroundColor = 'red';
			return;
		}
		if (y < 0 || y > 749){
			if(y < 0){
				while (y < 0){
					y = 750 + y;
				}
			} else {
				while (y > 749){
					y = y - 750;
				}
			}
			ey.style.backgroundColor = 'red';
			return;
		}
		
		Data.waves.target.x = x;
		Data.waves.target.y = y;
		
		ey.style.backgroundColor = '';
		ex.style.backgroundColor = '';
		Map.getTargetByCoords(x, y, function(target){
			if (target){
				Data.waves.target.type = target.type;
				Data.waves.target.level = target.lvl;
				
				var attColor = target.isAtt ? '#000' : '#C22';
				
				var tile = '<font color='+attColor+'>'
					+'<b>'+ translate(target.type) +'&nbsp;'+ translate('Level') +'&nbsp;'+ target.lvl +'</b>'
					+'</font>';
				if(target.pName != undefined){
					tile += '<br>'+ translate('City') + ': <b>' + target.name +'</b> - '
						 + translate('Alliance')+': <b>'+(target.pAlli != undefined ? target.pAlli : '----') + '</b>'
						 + '<br>'+ translate('Name') +': <b>'+ target.pName + '</b> - '
						 + translate('Level') + ': <b>' + target.pLvl + '</b> - '
						 + translate('Might') + ': <b>' + target.pMight + '</b>';
				}
				
				$(UID['tabWave_Tile']).innerHTML = tile;
			}
		});
	},


	show : function () {
		var t = Tabs.Waves;
		t.marchTick();
	},
	hide : function (){
		var t = Tabs.Waves;
		clearTimeout (t.marchTimer);
	}

}; // END Tabs.Waves



//******************************** Attacks Tab *****************************
// References to camp and camps changed to mapObject to make sure that other data does not overwrite the camps
Tabs.Attacks = {
	tabOrder		: ATTACK_TAB_ORDER,
	tabLabel		: 'Attacks',
	tabDisabled		: !ATTACK_TAB_ENABLE,
	lastSubTab		: 'tabAttackLevels',
	container		: null,
	attackTimer		: null,
	marchTimer		: null,
	lastAttack		: 0,
	attackErrors	: 0,
	checkMapBusy	: false,
	MAX_DISTANCE	: 60,
	curRunStart		: 0,
	contentType		: 0, // 0 = levels, 1 = config, 2 = targets, 3 = stats, 4 = mapTypes these should be enums but Javascript doesn't support that type
	selectedMapName	: kAnthropusCamp,

	init : function (div){
		var t = Tabs.Attacks;
		t.container = div;
		
		// This is where we store the troops type and quantity from the Levels sub-tab
		// TBD: To save different configurations for wildernesses, ant camps, and cities/outposts
		// I will use a multidimensional array. The first index is the row, the second is the column
		// For our purposes the row is the map type selector, and the column is the troop type and quantity data {}
		//
		// [wilderness][0(null)][1][2][3][4][5][6][7][8][9][10]
		// [antcamps][0(null)][1][2][3][4][5][6][7][8][9][10]
		// [city][0(null)][1][2][3][4][5][6][7][8][9][10]
		//
		for (var x=1; x < 11; x++){
			if (!Data.options.objAttack.troops[x]){
				Data.options.objAttack.troops[x] = {};
			}
		}
		
		div.innerHTML = ''
		+'<div id='+setUID('tabAttack_Title')+' class=' + UID['title'] + '>' + translate('Attack') + ' ' + translate(Data.options.mapChoice) + ' </div>'
		+'<div class=' + UID['status_ticker'] + ' id='+ setUID('tabAttack_Status') +' style="margin-bottom:5px !important">'
		+'	<center><input type=button value="OnOff" id='+ setUID('tabAttack_OnOff') +' /></center>'
		+'	<div id='+ setUID('tabAttack_Marches') +' style="margin-top:5px;height:140px; max-height:140px; overflow:auto;"></div>'
		+'	<div id='+ setUID('tabAttack_Feedback') +' class='+ UID['status_feedback'] +'></div>'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id='+ setUID('tabAttackLevels') +'>'+ translate('Levels') +'</a></li>'
		+'	<li class=tab><a id='+ setUID('tabAttackConfig') +'>'+ translate('Config') +'</a></li>'
		+'	<li class=tab><a id='+ setUID('tabAttackTarget') +'>'+ translate('Targets') +'</a></li>'
		+'	<li class=tab><a id='+ setUID('tabAttackStats') +'>'+ translate('Statistics') +'</a></li>'
		+'	<li class=tab><a id='+ setUID('tabAttackMaps') +'>'+ translate('Map') +'</a></li>'
		+'</ul>'
		+'<div id='+ setUID('tabAttack_Content') +' style="padding-top:5px; height:410px; background-color:white"></div>';
		

		// Add the event listeners
		$(UID['tabAttack_OnOff']).addEventListener ('click', function (){
			t.setAttackEnable (!Data.options.objAttack.enabled);
		}, false);
		$(UID['tabAttackLevels']).addEventListener ('click', t.tabAttackLevels, false);
		$(UID['tabAttackConfig']).addEventListener ('click', t.tabAttackConfig, false);
		$(UID['tabAttackTarget']).addEventListener ('click', t.tabAttackTarget, false);
		$(UID['tabAttackStats']).addEventListener ('click', t.tabAttackStats, false);
		$(UID['tabAttackMaps']).addEventListener ('click', t.tabAttackMaps, false);
		
		if (Data.options.objStats == null){
			t.clearStats();
		}
		
		if (Data.options.objAttack.maxMarches == undefined){
			Data.options.objAttack.maxMarches = 10;
		}
		
		Messages.addBattleReportListener(t.gotBattleReport);
		setTimeout (t.checkMarches, 60000); 
		t.tabAttackLevels();
		window.addEventListener ('unload', t.onUnload, false);
		t.setAttackEnable (Data.options.objAttack.enabled);
		
		for (var p in Data.options.objMarches)
		{
			if (Seed.marches[Data.options.objMarches[p].id])
			{
				Seed.marches[Data.options.objMarches[p].id].ownerId = 'camp';
			}
		}    
	},

	firstShow : true,
	show : function () {
		var t = Tabs.Attacks;
		t.marchTick();
		if (t.firstShow){
			t.marchTick();
			t.contentType = Data.options.attackTab;
			setTimeout (function (){
				// Do not automatically scan the map, wait for the user to initiate the scan on the maps sub-tab
				//t.checkMapData();
				t.firstShow = false;
			}, 0);
		}
		if (t.contentType == 2){
			$(UID['tabAttack_Content']).scrollTop = 0;
		}

		switch (t.contentType) {
			case 0: t.tabAttackLevels(); break;
			case 1: t.tabAttackConfig(); break;
			case 2: t.tabAttackTarget(); break;
			case 3: t.tabAttackStats(); break;
			case 4: t.tabAttackMaps(); break;
		}
	},
	hide : function (){
		var t = Tabs.Attacks;
		clearTimeout (t.marchTimer);
	},

	onUnload : function () {
		logit('Tabs.Attacks.onUnload');
		var t = Tabs.Attacks;
		if (Data.options.objAttack.enabled){
			Data.options.objStats.runTime += (serverTime()-t.curRunStart);
		}
		Data.options.attackTab = t.contentType;
	},

	addMarch : function (job){
		var t = Tabs.Attacks;
		var march = Seed.marches[job.march_id];
		if (march == null){
			logit ('***** March missing from seed: '+ job.march_id); 
			if (DEBUG_MARCHES){
				WinLog.write ('***** ERRROR march missing from seed: '+ job.march_id);
			}
		} 
		else {
			Data.options.objMarches[job.march_id] = cloneProps(march);
			if (DEBUG_MARCHES){
				WinLog.write ('Tabs.Attacks.addMarch: ID='+ march.id +'  ('+ march.x +','+ march.y +') General:'+ march.general.id);
			}
		}
	},

	removeMarch : function (mid){   
		var t = Tabs.Attacks;
		delete (Data.options.objMarches[mid]);
	},

	marchCheckTimer : null,
	checkMarches : function (){
		var t = Tabs.Attacks;
		var now = serverTime();
		clearTimeout (t.marchCheckTimer);
		for (var p in Data.options.objMarches)
		{
			if (parseInt(Data.options.objMarches[p].run_at) < (now-40))
			{
				if (Data.options.objMarches[p].retry)
				{
					++Data.options.messages.missing;
					
					// Prevent errors in the marches queuing ?
					if(MyAjax.marchBusy){
						--t.marchBusy;
					}
					
					logit ('March report never received! (now='+ now +')\n'+ inspect (Data.options.objMarches[p], 6, 1));    
					if (DEBUG_MARCHES){
						WinLog.write ('March report never received! (now='+ now +')\n'+ inspect (Data.options.objMarches[p], 6, 1));    
					}
					t.removeMarch (p);
				} 
				else {
					Data.options.objMarches[p].retry = true;
					Messages.checkMessages();
				}
			}
		}
		t.marchCheckTimer = setTimeout (t.checkMarches, 30000);
	},

	
	checkMapData : function () {
		var t = Tabs.Attacks;
		
		if (t.checkMapBusy){
			return false;
		}
		else if (Data.map.terrains[kAnthropusCamp].length==0) {
		
			t.checkMapBusy = true;
			
			t.setAttackEnable (false);
			
			Data.options.mapChoice = kAnthropusCamp;
			
			var dial = new ModalDialog (t.container, 300, 150, '', false, null);
			var dialbox = dial.getContentDiv();
			dialbox.innerHTML = translate('Scanning Map').replace('$NUM$','15');
			
			var x = Data.map.x;
			var y = Data.map.y;
			var radius = 15;
			
			Map.scanMap (x,y, radius, function(res){
				if (res == null){
					dialbox.innerHTML = '<B>' + translate('Bummer, there was an error while scanning the map') + '.</B>';
					dial.allowClose (true);
					Tabs.Attacks.checkMapBusy = false;
					return;
				}
				if(res.done){
					verboseLog('scanMap: complete!');
					// Sort by Distance
					for (var type in Data.map.terrains){
						Map.sortByDist(Data.map.terrains,type);
					}

					Tabs.Attacks.checkMapBusy = false;
					dial.destroy();
					
					
					// Refresh the Tab Content
					t.tabAttackTarget();
					
				} else {
					dialbox.innerHTML = translate('Scanning Map').replace('$NUM$','15') + '<br><br>'+Map.step;
				}
			});
			return false;
		}
		return true;
	},

	gotBattleReport : function (rpt){
		var t = Tabs.Attacks;
		//logit ('Tabs.Attacks.gotBattleReport'); 
		// tie report to march id ...
		var mid=null;
		for (var p in Data.options.objMarches )
		{
			var march = Data.options.objMarches[p];
			if (march.x == rpt.report.location.x && 
				march.y == rpt.report.location.y &&
				march.general.id == rpt.report.attacker.general.id
				){  // TODO: time and troops check here
					mid = p;
					break;
			}
		}
		if (mid)
		t.trackStats (mid, rpt);
		
		if (!Data.options.objAttack.deleteObjAttacks && !Data.options.objAttack.stopAttackOnLoss ){
			return;
		}
		//logit (inspect (rpt, 8, 1));
		if (Data.options.objAttack.stopAttackOnLoss)
		{
			for (var p in rpt.report.attacker.units)
			{
				if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1])
				{
					var ts = new Date(rpt.report_notification.created_at * 1000).myString();
					t.abort (translate('Troops lost') +'! ('+ ts +')');
					return;
				}
			}
		}
		if (Data.options.objAttack.deleteObjAttacks && rpt.report.attacker.name == Seed.player.name){
			Messages.deleteMessage (rpt.report_notification.id);
		}
	},

	setAttackEnable : function (onOff){
		var t = Tabs.Attacks;
		clearTimeout (t.attackTimer);
		var but = $(UID['tabAttack_OnOff']);
		Data.options.objAttack.enabled = onOff;
		if (onOff){
			but.value = translate('Attacking').toUpperCase();
			but.className = UID['btn_on'];
			t.curRunStart = serverTime();
			t.currentWave = 1;
			if ( !Data.waves.enabled ){
				Data.attacks.currentAttack = 1;
				Data.attacks.startAt = serverTime();
			}
			
			t.autoCheckTargets();
		} 
		else {
			if (t.curRunStart != 0)
			Data.options.objStats.runTime += (serverTime()-t.curRunStart);
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
			t.dispFeedback ('');
		}
	},

	abort : function (msg){
		var t = Tabs.Attacks;
		t.setAttackEnable (false);
		t.dispFeedback (msg);
		actionLog (msg);
	},

	marchTick : function (){
		var t = Tabs.Attacks;
		clearTimeout (t.marchTimer);
		$(UID['tabAttack_Marches']).innerHTML = marchTable('camp');
		
		// Not working properly,..we need a better way to do it !!!!
		/*
		for (var p in Seed.marches)
		{
			var march = Seed.marches[p];
			if(march.status == 'retreating' || march.status == 'returning'){
				continue;
			}
			$('m' + march.city_id + march.id).addEventListener ('click', function(evt){
				evt.target.disabled = true;
				
				//var march = evt.target.id.substring(1).split('_');
				
				new MyAjax.marchRecall(march.city_id, march.id, function (r) {
					if (r.ok && r.dat.result.success) {
						Seed.marches[p].status = 'returning';
					} else {
					}
				});
			}, false);
			
		}
		*/
		
		t.marchTimer = setTimeout (t.marchTick, 1000);
	},

	dispFeedback : function (msg){
		if (msg && msg!=''){
			msg = new Date().toTimeString().substring (0,8) +'&nbsp;'+ msg;
		}
		$(UID['tabAttack_Feedback']).innerHTML = msg;
	},

	autoCheckTargets : function (){
		var t = Tabs.Attacks;
		var now = serverTime();
		var cityIdx = 0;
		var targetMsg='', retryDelay, availableGeneral, marching = 0, totalMarches=0, m;
		
		clearTimeout (t.attackTimer);
		
		// Don't do anything if attacks are not enabled
		if (!Data.options.objAttack.enabled){
			return;
		}
		
		
		var minTime = 700000;
		var maxTime = 0;
		for (m in Seed.marches){
			++totalMarches;
			if (Seed.marches[m].ownerId == 'camp'){
				++marching;
			}
			var restTime = ( Seed.marches[m].run_at - parseInt(serverTime()) ) * (Seed.marches[m].status=='marching'?2:1);
			minTime = minTime < restTime ? minTime : restTime;
			maxTime = maxTime > restTime ? maxTime : restTime;
		}
		
		retryDelay = totalMarches ? minTime*1000 + Math.randRange(2000,5000) : Math.randRange(6000,8000);
		
		
		// back off for 1 second and retry if MyAjax.march busy (general,troops,etc may about to be used)
		if (MyAjax.marchBusy > 0){
		
			MyAjax.marchBusy = totalMarches;
			if(MyAjax.marchBusy==0) t.attackBusy = false;
		
			verboseLog('<b>Attack</b> to ' + targetMsg + ' delayed due to <b>'+ totalMarches +' pending</b> march request: retry in ' + timeFormat(retryDelay/1000));

			t.dispFeedback(translate('Another march request is pending') + ': ' +translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay);
			return;
		}
		
		// Find the map data
		if ( !t.checkMapData() ){
			return;
		}

		
		if (marching >= Data.options.objAttack.maxMarches){
			verboseLog('<b>Attack</b> to ' + targetMsg + ' delayed due to <b>march limit</b> reached: retry in ' + timeFormat(retryDelay/1000));

			t.dispFeedback(translate('March limit reached') + ': ' + translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay);
			return;
		}
		
		if (getMusterPointSlots (0) <= 0){
			verboseLog('<b>Attack</b> to ' + targetMsg + ' delayed due to </b>insufficent march</b> slots: retry in ' + timeFormat(retryDelay/1000));

			t.dispFeedback (translate('Muster Point') +' '+ translate('Full') + ': ' + translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay);
			return;
		}
		
		availableGeneral = getAvailableGeneral();

		if (availableGeneral == null) {
			verboseLog('<b>Attack</b> to ' + targetMsg + ' delayed due to <b>insufficent generals</b>: retry in ' + timeFormat(retryDelay/1000));

			t.dispFeedback(translate('No Generals Available') + ': ' + translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay);
			return;
		}

		// Get the next target, make sure we have sufficient troops
		var nextTarget = t.getNextAttackTarget();
		if(nextTarget){
			if (t.checkTroops (0, nextTarget.lvl) == null) {
				targetMsg = nextTarget.x + '/' + nextTarget.y;
				verboseLog('Opening the map on the last position: ' + Map._lastPos.x + '/' + Map._lastPos.y);
				t.dispFeedback(translate('Preparing Attack') +': '+ translate('Opening the map on the last position')+'...');
				Map.simulateOpenMap(null, null, function(target){
					verboseLog('Map: go to position: ' + nextTarget.x + '/' + nextTarget.y);
					t.dispFeedback(translate('Preparing Attack') +': '+ translate('Going to the coords') + ' ' + nextTarget.x + '/' + nextTarget.y +' ...');
					setTimeout(function(){
						Map.simulateOpenMap(nextTarget.x, nextTarget.y, function(target){
							setTimeout(function(){
								t.sendAttack (0, nextTarget, availableGeneral, function (r,status){
									var t = Tabs.Attacks, attackDelay, retryDelay;
									if (r){
										var delayMin = Data.options.objAttack.delayMin;
										var delayMax = Data.options.objAttack.delayMax;
										if (delayMin < ATTACK_MIN_DELAY){
											if(delayMax > delayMin + 20){
												delayMin = delayMax - 20;
											} else {
												delayMin = ATTACK_MIN_DELAY;
												delayMax = delayMin + 20;
											}
											Data.options.objAttack.delayMin = delayMin;
											Data.options.objAttack.delayMax = delayMax;
										}
										
										if ( Data.attacks.currentAttack > 49 )
										{
											if ( Data.attacks.startAt - serverTime() < 3600 ) {
												attackDelay = ( 3600 - (Data.attacks.startAt - serverTime()) ) * 1000;
												setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(attackDelay/1000))}, delayMin*500 );
											} else {
												Data.attacks.startAt = serverTime();
												Data.attacks.currentAttack = 1;
											}
										}
										else if ((Data.attacks.currentAttack % 15) == 0)
										{
											attackDelay = 45 * totalMarches * 1000;
											setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + '<br>' + translate('waiting') + ': ' + timeFormat(attackDelay/1000))}, delayMin*500 );
										}
										else {
											attackDelay = Math.randRange(delayMin*1000, delayMax*1000);
											setTimeout(function(){t.dispFeedback('')}, parseInt(attackDelay/2) );
										}
										
										t.attackTimer = setTimeout(t.autoCheckTargets, attackDelay);
										
									} else {
										retryDelay = 30000 * (t.attackErrors * t.attackErrors);
										
										if (status == 509){
											retryDelay = 120000 * (t.attackErrors * t.attackErrors);
											verboseLog('<b>Attack</b> to ' + targetMsg + ' failed - <b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(retryDelay/1000));
										
											t.dispFeedback(translate('Attack to') + ' ' + targetMsg + ' ' + translate('failed')+' - '+translate('Rate Limit Exceeded because there were too many requests') + ' - ' + translate('Retry in') +' '+ timeFormat(retryDelay/1000));
										}
										
										t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay);
									}
								}); // End sendAttack
							}, Math.randRange(7000,10000));
						}); // End Map.getTargetCoords Target
					}, Math.randRange(6000,9000));
				}); // End Map.getTargetCoords Last Target
			
				return;                
			} else {
				verboseLog('<b>Attack</b> to ' + targetMsg + ' delayed due to <b>insufficient troops</b>: retry in ' + timeFormat(retryDelay/1000));

				t.dispFeedback(translate('Not enough') + ' ' + translate('Troops') + ': ' + translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
				t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay);
			}
		} else {
			verboseLog('<b>Attack</b> to ' + targetMsg + '<b>Requirements Unmet</b>: Retry in' + timeFormat(retryDelay/1000));

			t.dispFeedback(translate('Requirements Unmet') + ': ' + translate('Retry in') + ' ' + timeFormat(retryDelay/1000));
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay);
		}
	},

	// notifies with true for success, false if error
	sendAttack : function (cityIdx, target, general, notify){
		var t = Tabs.Attacks;
		var now = serverTime();
		if (t.attackBusy){
			t.dispFeedback (translate('Error')+ ': ' +translate('sendAttack is busy, no response from server?'));
			return;
		}
		
		var targMsg =  translate('Attack sent to') + ': ' + translate(Data.options.mapChoice) + ' ' + translate('Level') + ' ' + target.lvl + ' ' + translate('at') + ' ' + target.x + '/'+ target.y;
		
		var targMsgLog =  'Attack sent to: ' + Data.options.mapChoice + ' Level ' + target.lvl + ' at ' + target.x + '/'+ target.y;
		
		
		verboseLog(targMsgLog +' Attempted');
		
		t.attackBusy = true;
		t.lastAttack = now;

		new MyAjax.marchSend (Seed.cities[cityIdx].id, target.x, target.y, general.id, Data.options.objAttack.troops[target.lvl], 'camp', function (r) {
			t.attackBusy = false;
			if (r.ok && r.dat.result.success) {
				
				++Data.attacks.currentAttack;
				
				t.attackErrors = 0;
				
				verboseLog(targMsgLog +' Successfully');
				
				if (Data.options.objAttack.logAttacks){
					actionLog(targMsg);
				}
				t.dispFeedback(targMsg);
				t.addMarch(r.dat.result.job);        

				target.last = now;
				if (notify){
					notify(true);
				}
			}
			else {
				++t.attackErrors;

				verboseLog(targMsgLog + ' <b>failed and returned error</b>: ' + r.errmsg);
				
				actionLog(targMsg + ' ' + translate('failed'));
				
				t.dispFeedback(targMsg + ' failed');
					if (notify){
					notify(false, r.status);
					}
			}
		});
	},

	// returns null if ok, else error message
	checkTroops : function (cityIdx, objLevel){
		var troops = Data.options.objAttack.troops[objLevel];
		var total = 0;
		for (var p in troops){
			if (troops[p] > 0){
				total += troops[p];
				if (Seed.cities[cityIdx].units[p] < troops[p]){
					return (translate('Not enough') +' '+ translate(p));
				}
			}
		}
		
		if (total <= 0){
			return (translate('No Troops Defined'));
		}
		return null;
	},

	// return the nextTarget that is next to be attacked, if we are at the last object in the last, return the first object
	getNextAttackTarget : function (type){
		var t = Tabs.Attacks;
		var lastAttack = 0;
		var nextTarget = null;
		var target = null;
		var objAttack = Data.options.objAttack;
		
		type = type || Data.options.mapChoice;
		
		if(Data.map.terrains[type] == undefined) {
			return null;
		}
		
		// Look through all the targets
		for (var i=0; i < Data.map.terrains[type].length; i++){
			target = (Data.map.terrains[type])[i];
			// Is this target attackable?
			if (target.isAtt) {
				// Does it fit within the config specifications (distance and level)?
				if ( objAttack.levelEnable[target.lvl] && 
					 (objAttack.levelDist[target.lvl] == 0 || target.dist <= objAttack.levelDist[target.lvl]) &&
					 t.checkTroops (0, target.lvl) == null
					) {
					 // Has the target never been attacked?
						if (target.last == 0) {
							nextTarget = target;
							break;
						} 
						else if (lastAttack == 0) {
							// Yes, this target is next (so far)
							lastAttack = target.last;
							nextTarget = target;
						}
						else if (lastAttack > target.last) { // Was the previous target attacked before this target?
							// Yes, this target is next (so far)
							lastAttack = target.last;
							nextTarget = target;
							break;
						}
				}
			}
		}
		
		// No target reaches the specified requirements
		if(nextTarget == null){
			return;
		}
		
		// This is complicated by the fact that the last attacked target in the list may not be the last physical entry, just the one that fits
		// the config info (distance, level enables, attackable)
		// Find the last matching target in the list
		
		var objs = Data.map.terrains[type];
		var lastMatchingTarget = null;
		for (var j=objs.length-1; j>0; j--) {
			target = objs[j];
			if (target.isAtt) {
				if ( objAttack.levelEnable[target.lvl] &&
					(objAttack.levelDist[target.lvl] == 0 || target.dist <= objAttack.levelDist[target.lvl])
					){
						lastMatchingTarget = target;
						break;
				}
			}  
		}
		
		// Is the next target the last matching target?
		if (nextTarget == lastMatchingTarget) {
			for (var k=0; j < objs.length; k++) {
				target = objs[k];
				if (target.isAtt) {
					if ( objAttack.levelEnable[target.lvl] &&
					(objAttack.levelDist[target.lvl] == 0 || target.dist <= objAttack.levelDist[target.lvl])
					){
						// Make the next target the first matching target in the list
						nextTarget = target;
						break;
					}
				}
			}
		}

		// Return the next target
		return nextTarget;
	},

	// return array of targets that satisfy config (max distance, level enables)
	getActiveObjectList : function (type){
		var t = Tabs.Attacks;
		var ret = [];
		
		type = (type != undefined ? type : Data.options.mapChoice);
		
		if(Data.map.terrains[type]){
			for (var i=0; i < Data.map.terrains[type].length; i++){
				var target = (Data.map.terrains[type])[i];
				if ( Data.options.objAttack.levelEnable[target.lvl] &&
					(Data.options.objAttack.levelDist[target.lvl] == 0 || target.dist <= Data.options.objAttack.levelDist[target.lvl])
				  ){
						ret.push (target);
				}
			}
		}
		return ret;
	},

	checkAttack : function (target, notify){
		var t = Tabs.Attacks;
		var cityId = Seed.cities[0].id;
		var cityIdx = 0;
		var availableGeneral;
		
		// check troops
		var troops = Data.options.objAttack.troops[target.lvl];
		var totalTroops = 0;
		for (var p in troops){
			if (troops[p] > 0){
				totalTroops += troops[p];
				if (Seed.cities[cityIdx].units[p] < troops[p]){
					notify (translate('Not enough') +' '+ translate(p));
					return;
				}
			}
		}
		
		if (totalTroops <= 0){
			notify (translate('No Troops Defined'));
			return;
		}
		
		// TODO: 'too many troops for muster point level'
		var musterPointLvl = getMusterPointLevel (cityIdx);
		for (var p in troops) {
			if (troops[p] > 0) {
				if (musterPointLvl < troops[p] / 10000) {
					notify (translate('Too many troops for muster point level'));
					return;
				}
			}
		}
		
		if (musterPointLvl < totalTroops / 10000) {
			notify (translate('Too many troops for muster point level'));
			return;
		}
		
		if (getMusterPointSlots (cityIdx) <= 0){
			notify (translate('Muster Point') +' '+ translate('Full'));
			return;
		}
		
		if ((availableGeneral = getAvailableGeneral ()) == null){
			notify (translate('No Generals Available'));
			return;
		}
		
		var targMsg =  translate('Manual attack sent to') + ': ' + translate(Data.options.mapChoice) + ' ' + translate('Level') + ' ' + target.lvl + ' ' +  translate('at') + ' ' + target.x +'/'+ target.y;
		
		var targMsgLog =  'Manual attack sent to: ' + Data.options.mapChoice + ' Level ' + target.lvl + ' at ' + target.x +'/'+ target.y;
		
		verboseLog(targMsgLog +' Attempted');
		
		new MyAjax.marchSend (cityId, target.x, target.y, availableGeneral.id, troops, 'camp', function (r) {
			if (r.ok) {
			
				++Data.attacks.currentAttack;
			
				verboseLog(targMsgLog +' Successfully');
				
				if (Data.options.objAttack.logAttacks){
					actionLog(targMsg);
				}
				
				t.dispFeedback(targMsg);
				t.addMarch(r.dat.result.job);        
				target.last = serverTime();
				notify(null);
			}
			else {
				verboseLog(targMsgLog +' <b>failed and returned</b> error: '+ r.errmsg);

				t.dispFeedback (translate('Error') + ': ' + r.errmsg);
				notify(null);
				//notify(kAttackErr + r.errmsg);
			}
		});	
	},
	

	
	//*** Attacks Tab - Levels Sub-Tab ***
	//----------------------------------------------------------------------------
	troopTypes : [kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop],
	dragonTypes	: [kGreatDragon,kWaterDragon,kStoneDragon,kFireDragon,kWindDragon],
	
	tabAttackLevels : function (){
		var t = Tabs.Attacks;
		
		$(UID[t.lastSubTab]).className='';
		$(UID[t.lastSubTab]).style.zIndex=0;
		$(UID['tabAttackLevels']).className='selected';
		$(UID['tabAttackLevels']).style.zIndex=1;
		t.lastSubTab = 'tabAttackLevels';
		
		t.contentType = 0;
		
		var city = Seed.cities[0];

		// New content area here
		var m = '<div class="' + UID['title'] + '">'+ translate('Attacks') + '&nbsp;' + translate(Data.options.mapChoice) +'</div>'
		+'<div style="overflow:auto">'
		+'	<table class=' + UID['compact_table'] + '>'
		+'		<tr class=' + UID['row_top_headers'] + '>'
		+'			<td style="background:none !important;"></td>'
		+'			<td align=center colspan=10>&nbsp;'+ translate('Levels') +'&nbsp;</td>'
		+'		</tr>'
		+'		<tr align=center class=' + UID['row_headers'] + '>'
		+'			<td style="background:none !important;"></td>'
		+'			<td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td>'
		+'		</tr>'
		+'		<tr align=center>'
		+'			<td class=left>'+ translate('Enable') +': </td>';
		
		for (var x=1; x < 11; x++){
			m += '		<td><label><input type=checkbox id='+ setUID('tabAttackLevels_LvlOnOff_'+ x) + ' ref='+ x +' ' +(Data.options.objAttack.levelEnable[x]?' checked':'')   +' /></label></td>';
		}
		
		m += '		</tr><tr align=center>'
		+'			<td class=left>'+ translate('Max') +' '+ translate('Distance').truncate(4,'') +': </td>';
		
		for (var x=1; x < 11; x++){
			m += '		<td><input type=text id='+ setUID('tabAttackLevels_LvlDist_'+ x) +' ref='+ x +' maxlength=2 style="width:36px" value="'+ Data.options.objAttack.levelDist[x] +'" /></td>';
		}
		
		m += '		</tr><tr>'
		+'				<td><div class=short></div></td>'
		+'			</tr>';
		
		var currentTroops = [];
		for (i=0; i < t.troopTypes.length; i++)
		{
			if(getTroopNumbers(city, t.troopTypes[i]).total)
			{
				var color = '#FFF';
				if(i<5) color = '#DDD';
				else if(i<8) color = '#BEB';
				else if(i==8) color = '#EEB';
				else if(i<11) color = '#BBE';
				else if(i<15) color = '#BBE';
				else color = '#EBB';
				
				m += '	<tr style="background-color:'+color+';"><td class=left><span title="'+translate(t.troopTypes[i])+'">'+ translate('~'+t.troopTypes[i]) +':<span></td>';
				for (var x=1; x < 11; x++)
				{
					var num = Data.options.objAttack.troops[x][t.troopTypes[i]];
										
					if (!num){ num = 0;	}
									
					m += '<td><input type=text id='+ setUID('tabAttackLevels_LvlTroops_'+ x +'_'+ i) +' ref='+ (x +'_'+ i) +' maxlength=6 size=2 style="width:34px;'+(num?'':'color:#888;')+'" value="'+ num +'" title="" /></td>';
				}
				m += '</tr>';
				currentTroops.push(i);
			}
		}
		m += '</table></div>';
		$(UID['tabAttack_Content']).innerHTML = m;

		// add event listeners ...
		for (var x=1; x < 11; x++){
			$(UID['tabAttackLevels_LvlOnOff_'+ x]).addEventListener('change', enableChanged, false);
		}
		for (var x=1; x < 11; x++){
			$(UID['tabAttackLevels_LvlDist_'+ x]).addEventListener('change', distChanged, false);
		}
		
		for (i=0; i < currentTroops.length; i++){
			for (var x=1; x < 11; x++){
				$(UID['tabAttackLevels_LvlTroops_'+ x +'_'+ currentTroops[i]]).addEventListener('change', troopsChanged, false);
			}
		}
		
		function enableChanged (e){
			var n = parseInt(e.target.getAttribute('ref'));
			Data.options.objAttack.levelEnable[n] = e.target.checked;
		}
		
		function distChanged (e){
			var n = parseInt(e.target.getAttribute('ref'));
			var x = parseIntZero(e.target.value);
			if (isNaN(x) || x < 0 || x > t.MAX_DISTANCE){
				e.target.style.backgroundColor = 'red';
				dispError (translate('Distance must be between') + ' 0 ' + translate('and') +' '+ t.MAX_DISTANCE, t.container);
			} 
			else {
				e.target.value = x;
				e.target.style.backgroundColor = '';
				Data.options.objAttack.levelDist[n] = x;
			}
		}
		
		function troopsChanged (e){
			var args = e.target.getAttribute('ref').split('_');
			var x = parseIntZero(e.target.value);
			if (isNaN(x) || x<0 || x>120000){
				e.target.style.backgroundColor = 'red';
				dispError (translate('Invalid number of troops',t.container));
			}
			else {
				e.target.value = x;
				Data.options.objAttack.troops[args[0]][t.troopTypes[args[1]]] = x;
				e.target.style.backgroundColor = '';
				if(parseInt(e.target.value)>0){
					e.target.style.color = '#000';
				}
			}
		}
	},

	//*** Attacks Tab - Config Sub-Tab ***
	//----------------------------------------------------------------------------
	tabAttackConfig : function (){
		var t = Tabs.Attacks;
		
		$(UID[t.lastSubTab]).className='';
		$(UID[t.lastSubTab]).style.zIndex=0;

		$(UID['tabAttackConfig']).className='selected';
		$(UID['tabAttackConfig']).style.zIndex=1;
		t.lastSubTab = 'tabAttackConfig';

		t.contentType = 1;

		var m = '<div class=' + UID['title'] + '>'+ translate('Attacks Configuration') + '</div>'
		+'<div style="overflow:auto">'
		+'	<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<td class=left>'+ translate('Delay Between Attacks') +':&nbsp;</td>'
		+'		<td>'
		+'		<input class=short id='+ setUID('tabAttackConfig_DelayMin') +' maxlength=4 type=text value="'+ Data.options.objAttack.delayMin +'" />&nbsp;'+ translate('to')
		+'		<input class=short id='+ setUID('tabAttackConfig_DelayMax') +' maxlength=4 type=text value="'+ Data.options.objAttack.delayMax +'" />&nbsp;'+ translate('Seconds').toLowerCase() 
		+'		</td>'
		+'	</tr><tr>'
		+'		<td class=left>'+ translate('Delete') +' '+ translate('Battle Report') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('tabAttackConfig_DelAttacks') +' '+ (Data.options.objAttack.deleteObjAttacks?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td class=left>'+ translate('Stop if any troops lost') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('tabAttackConfig_StopOnLoss') +' '+ (Data.options.objAttack.stopAttackOnLoss?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td class=left>'+ translate('Maximum simultaneous marches') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('tabAttackConfig_MaxMarches') +' class=short maxlength=2 type=text value="'+ Data.options.objAttack.maxMarches +'" /></td>'
		+'	</tr><tr>'
		+'		<td class=left>'+ translate('Enable') +' '+ translate('Attacks Logs') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('tabAttackConfig_LogAttack') +' '+ (Data.options.objAttack.logAttacks?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td class=left>'+ translate('Clear last attack on current map') +'&nbsp;</td>'
		+'		<td><input id='+ setUID('tabAttackConfig_ClearLast') +'  type=button value="'+translate('Delete')+'" /></td>'
		+'	</tr><tr>'
		+'		<td class=left>'+ translate('Clear last attack on all maps') +'&nbsp;</td>'
		+'		<td><input id='+ setUID('tabAttackConfig_ClearAll') +' '+ (Data.options.objAttack.clearAllTargets?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr></table>';
		
		$(UID['tabAttack_Content']).innerHTML = m;
		
		// Add event listeners
		$(UID['tabAttackConfig_DelAttacks']).addEventListener('change', function (e){
			Data.options.objAttack.deleteObjAttacks = e.target.checked;
		}, false);
		$(UID['tabAttackConfig_StopOnLoss']).addEventListener('change', function (e){
			Data.options.objAttack.stopAttackOnLoss = e.target.checked;
		}, false);
		$(UID['tabAttackConfig_LogAttack']).addEventListener('change', function (e){
			Data.options.objAttack.logAttacks = e.target.checked;
		}, false);
		$(UID['tabAttackConfig_ClearAll']).addEventListener('change', function (e){
			Data.options.objAttack.clearAllTargets = e.target.checked;
		}, false);
		$(UID['tabAttackConfig_DelayMin']).addEventListener('change', delayChanged, false);
		$(UID['tabAttackConfig_DelayMax']).addEventListener('change', delayChanged, false);
		$(UID['tabAttackConfig_MaxMarches']).addEventListener('change', maxMarchesChanged, false);
		$(UID['tabAttackConfig_ClearLast']).addEventListener('click', clearLast, false);
		
		
		function delayChanged (e){
			var min = parseIntNan($(UID['tabAttackConfig_DelayMin']).value);
			var max = parseIntNan($(UID['tabAttackConfig_DelayMax']).value);
			if (min < ATTACK_MIN_DELAY || min > 3600 || (max-min) < 20){
				var dial = new ModalDialog (t.container, 300, 150, '', true);
				dial.getContentDiv().innerHTML = '<b>'+ translate('Invalid delays') + '</b><br><br>'
					+ translate('First value must be between') + ' ' + ATTACK_MIN_DELAY + ' '
					+ translate('and') + ' 3600 ' + translate('Seconds') + ' <br>'
					+ translate('Second value must be at least') + ' 20 ' + translate('above the first value');
				if (min < ATTACK_MIN_DELAY){
					if(max > min+20){
						min = max - 20;
					} else {
						min = ATTACK_MIN_DELAY;
						max = min + 20;
					}
				} else if (min > 3600) {
					min = 3600;
					max = min + 20;
				} else {
					max = min + 20;
				}
				$(UID['tabAttackConfig_DelayMin']).value = min;
				$(UID['tabAttackConfig_DelayMax']).value = max;
			}
			Data.options.objAttack.delayMin = min;
			Data.options.objAttack.delayMax = max;
		}
		
		function maxMarchesChanged (e){
			var val = parseIntNan($(UID['tabAttackConfig_MaxMarches']).value);
			if (val < 0 || val > 12){
				e.target.style.backgroundColor = 'red';
				return;
			}
			e.target.style.backgroundColor = '';
			Data.options.objAttack.maxMarches = val;
		} 
		
		// Clear the information about when the target was last attacked
		// This is useful because attacks always start with the oldest target or, 
		// if no target has been attacked (last == 0), the first target in the list
		function clearLast (e){
			if (Data.options.objAttack.clearAllTargets) {
				// Make sure the user has scanned the map
				for (var type in Data.map.terrains) {
					for (var i=0; i<Data.map.terrains[type].length; i++) {
						(Data.map.terrains[type])[i].last = 0;
					}
				}
			}
			else {
				// Clear the last attacked field of the currently selected target
				var targets = Data.map.terrains[Data.options.mapChoice];
				for (var i=0; i < targets.length; i++) {
					targets[i].last = 0;
				}
			}
		}
	},
	

	//*** Attacks Tab - Targets Sub-Tab ***
	//----------------------------------------------------------------------------
	tabAttackTarget : function (){
		var t = Tabs.Attacks;

		$(UID[t.lastSubTab]).className='';
		$(UID[t.lastSubTab]).style.zIndex=0;
		$(UID['tabAttackTarget']).className='selected';
		$(UID['tabAttackTarget']).style.zIndex=1;
		t.lastSubTab = 'tabAttackTarget';

		t.contentType = 2;

		var timer = null;
		
		t.checkMapData();
		
		// Owned resources have a red background color and white text
		var targets = t.getActiveObjectList(); 
		if (targets.length == 0){
			t.dispFeedback ( translate('Use the Levels Tab to select attack areas') );
		}

		
		$(UID['tabAttack_Title']).innerHTML = translate('Attack') + ' ' + translate(Data.options.mapChoice);
		$(UID['tabAttack_Content']).innerHTML = '<div id=' + setUID('tabAttackTarget_Content') + '></div>';
	
		var m = '<div class=' + UID['title'] + '>'
		+ translate('Attacks') + '&nbsp;' + translate(Data.options.mapChoice)
		+	'</div>';
		
		// MapChoice Selector
		setUID('tabAttackTarget_MapChoice');
		m += '<table><tr>'
		  + '<td align=right>'
		  + '&nbsp;<b>' + translate('Select')+ '<br>' +translate('Targets')+'</b>'
		  + '</td>'
		  + '<td>'
		  + ':&nbsp;<select id='+ UID['tabAttackTarget_MapChoice'] +'>';
		
		for (var type in Data.map.terrains){
			if ( type == kCity ) {
				m += '<option disabled="disabled">-----------------------</option>';
			}
			m += '<option value="'+ type +'" '+ (type==Data.options.mapChoice ? 'selected' : '') +'>'
			  + translate(type) 
			  +'</option>'
		}
		
		var levelDist = [];
		for (var i=1; i<Data.options.objAttack.levelDist.length; i++){
			if(Data.options.objAttack.levelEnable[i]){
				levelDist.push(Data.options.objAttack.levelDist[i]);
			}
		}
		levelDist.sort(function(a,b){return a-b;});
		var rangeDist = (levelDist.first() != levelDist.last()) ? levelDist.first()+' - '+levelDist.last() : levelDist[0];
		
		m += '</select>&nbsp;'
		  + '</td>'
		  + '<td>'
		  + '<span class=jewel>'+ targets.length + ' ' + translate('of') + ' ' + Data.map.terrains[Data.options.mapChoice].length + ' ('+ translate('Distance') + ' ' + translate('Max') + ': ' +rangeDist +')</span>'
		  + '</td>'
		  + '</tr></table><br>';
		
		m +='<div class="' + UID['scrollable'] + '" style="height:365px;">'
		+ '<table id='+ setUID('tabAttackTarget_Tab') +' class=' + UID['table'] + '>'
		+ '	<tr class='+ UID['row_headers'] +'>'
		+ '		<td valign=middle><b>'+ translate('Distance').substring(0,4) +'</b></td>'
		+ '		<td valign=middle><b>'+ translate('Coords') +'</b></td>'
		+ '		<td valign=middle><b>'+ translate('Level') +' </b></td>'
		+ '		<td valign=middle width=65><b>'+ translate('Last Attack').split(' ').join('<br/>') +'</b></td>'
		+	'</tr>';
		
		// Hilite owned wildernesses
		//var ownedWilderness = Seed.player.player_wildernesses;
		
		var bFound = false;
		for (var i=0; i < targets.length; i++){
			m += '<tr id='+ setUID('tabAttackTarget_TabRow_'+i);
			if ( targets[i].pName ){
					m+= '  title="'
					+ (targets[i].name || '') + '  ('+ translate(targets[i].type) + ') \n'
					+ targets[i].pName + ' (lvl '+ targets[i].pLvl + ') - Pwr: '+ targets[i].pMight +' \n'
					+ translate('Alliance') + ': ' + (targets[i].pAlli || '---')
					+'"'
			}
			
			m += '>'
			+		'<td>'+ targets[i].dist +'</td>'
			+		'<td align=center>'+ targets[i].x +'/'+ targets[i].y +'</td>'
			+		'<td align=center>'+ targets[i].lvl +'</td>'
			+		'<td><span id='+ setUID('tabAttackTarget_lastAttack_'+i) +'> --- </span></td>'
			+		'<td><input id='+ setUID('tabAttackTarget_AttackNow_'+i) +' ref='+ i +' class=small style="width:auto !important;" type=button value=" ' + translate('Attack') + '! " />';
			
			// Add the skip attack button for cities and outposts
			if ( targets[i].pName ){
					m += '&nbsp;<input id='+ setUID('tabAttackTarget_SkipAttack_'+i) +' ref='+ i +' type=checkbox '+ (targets[i].isAtt?'CHECKED':'') +' /></td>'
					+ '<td><b>' + targets[i].pName.truncate(13).replace('...','<span class=jewel>...</span>') + '</b></td>'
					+ '<td>' + (targets[i].pAlli || '---').truncate(16).replace('...','<span class=jewel>...</span>');
			}
			
			m += '</td></tr>';

		}
		
		m += '</table></div>';

		var container = $(UID['tabAttackTarget_Content']);
		container.innerHTML = m;
		container.style.height = container.offsetHeight + 'px';
		
		// Hilight owned resources and don't attack them
		/*
		for (var i=0; i < targets.length; i++){
			for (var j=0; j < ownedWilderness.length; j++) {
				if (ownedWilderness[j].x == targets[i].x && ownedWilderness[j].y == targets[i].y) {
					$(UID['tabAttackTarget_TabRow_'+i]).className=UID['row_owned'];
					targets[i].isAtt = false;
					break;
				}
			}
		}
		*/
		
		// Add the event listeners
		$(UID['tabAttackTarget_MapChoice']).addEventListener('change', onMapChoice, false);
		
		for (var i=0; i < targets.length; i++) {
			var butAttack = $(UID['tabAttackTarget_AttackNow_'+ i]);
			butAttack.addEventListener ('click', butAttackNow, false);
			if ( targets[i].pName ){
				$(UID['tabAttackTarget_SkipAttack_'+ i]).addEventListener ('click', toggleAttackable, false);
			}
			setButtonStyle (butAttack, targets[i].isAtt);    
		}
		
		tick();
		
		function setButtonStyle (el, enabled) {
			if (enabled) {
				el.disabled = false;
				Element.removeClassName(el, UID['bnt_red']);
				Element.addClassName(el, UID['bnt_green']);
			}
			else {
				el.disabled = true;
				Element.removeClassName(el, UID['bnt_green']);
				Element.addClassName(el, UID['bnt_red']);
			}
		}
		
	
		function onMapChoice (e){
			var t = Tabs.Attacks;
			
			if (Data.options.objAttack.enabled) {
				// It would be very bad to leave attack on when switching targets. Imagine sending the troops for a wilderness to a city or an ant camp...
				clearTimeout (timer);
				t.setAttackEnable(false);
				t.dispFeedback (translate('Safe Mode') +': '+ translate('Attacks') +' '+ translate('Turned Off'));
			}
			
			var el = e.target;
			
			Data.options.mapChoice = Tabs.Attacks.selectedMapName = el.options[el.selectedIndex].value;
			//Data.map.targets = Data.map.terrains[Data.options.mapChoice].clone();
			t.tabAttackTarget();
		}

		function butAttackNow (e){
			var n = parseInt(e.target.getAttribute('ref'));
			var dial = new ModalDialog (t.container, 300, 150, '', false);
			dial.getContentDiv().innerHTML = translate('Attacking');
			t.checkAttack (targets[n], notify);
			function notify (r){
				if (r!=null){
					dial.getContentDiv().innerHTML = '<b>'+ r +'</b>';
					dial.allowClose (true);
				} else {
					dial.getContentDiv().innerHTML = '<b>'+ translate('OK') +'</b>';
					setTimeout (function(){dial.destroy()}, 1000);
				}
			}
		}
		
		function toggleAttackable (e){
			var n = parseInt(e.target.getAttribute('ref'));
			targets[n].isAtt = !(targets[n].isAtt);
			setButtonStyle ($(UID['tabAttackTarget_AttackNow_'+n]), targets[n].isAtt);     
		}
		
		function tick (){
			var now = serverTime();
			clearTimeout (timer);
			
			if (!$(UID['tabAttackTarget_Tab'])){
				return;
			}
			
			for (var i=0; i < targets.length; i++){
				var lastAttack = $(UID['tabAttackTarget_lastAttack_'+i]);
				if (lastAttack == undefined){
					continue;
				}
				
				var ts;
				if (targets[i].last == 0){
					ts = '---';
				}
				else {
					var time = now - targets[i].last;
					// fix this :P
					if (time > 3600){
						ts = '<font color=#550000><b>'+ timeFormat (time, false) +'</b></font>';
					}
					else {
						ts = timeFormat (time, false);
					}
				}
				lastAttack.innerHTML = ts;
			}
			timer = setTimeout (tick, 5000);
		}
	},

	
	//*** Attacks Tab - Stats Sub-tab ***
	//----------------------------------------------------------------------------
	tabAttackStats : function (){
		var t = Tabs.Attacks;

		$(UID[t.lastSubTab]).className='';
		$(UID[t.lastSubTab]).style.zIndex=0;
		$(UID['tabAttackStats']).className='selected';
		$(UID['tabAttackStats']).style.zIndex=1;
		t.lastSubTab = 'tabAttackStats';
		
		t.contentType = 3;

		var m = '<div class=' + UID['title'] + '>'+translate('Statistics')+'</div>'
		+'<div id='+ setUID('tabAttackStats_Status') +' class=' + UID['status_ticker'] + '></div>'
		+'<br/>'
		+'<center><input id='+ setUID('tabAttackStats_Clear') +' type=button value="'+ translate('Delete') +' '+ translate('Statistics') +'" /></center>';
		
		$(UID['tabAttack_Content']).innerHTML = m;
		
		$(UID['tabAttackStats_Clear']).addEventListener('click', function(){
			t.clearStats();
			t.showStats();
		}, false);
		
		t.showStats();
	},

	// byLevel.resources
	clearStats : function (){
		var t = Tabs.Attacks;
		var now = serverTime();
		Data.options.objStats = {tsStart:now, runTime:0, numAttacks:0, items:{}, resources:{}, byLevel:[]};
		t.curRunStart = now;
		for (var i=0; i < 12; i++){
			Data.options.objStats.byLevel[i] = {numAttacks:0, items:{}, resources:{}};
		}
		t.showStats(); 
	},
	
	trackStats : function (marchId, rpt){   // called when battle report received
		var t = Tabs.Attacks;
		if (DEBUG_MARCHES){
			WinLog.write ('Tabs.Attacks.trackStats: '+ marchId);
		}
		var objLevel = rpt.report.location.level;
		
		if (objLevel < 1 || objLevel > 11){
			objLevel = 0;
		}
		
		++Data.options.objStats.numAttacks;
		++Data.options.objStats.byLevel[objLevel].numAttacks;
		var res =  rpt.report.spoils.resources;
		
		for (var p in res){
			objAddTo (Data.options.objStats.resources, p, parseInt(res[p]));
			objAddTo (Data.options.objStats.byLevel[objLevel].resources, p, parseInt(res[p]));
		}  
		
		var items =  rpt.report.spoils.items;
		for (var i=0; i < items.length; i++){
			objAddTo (Data.options.objStats.items, items[i], 1);
			objAddTo (Data.options.objStats.byLevel[objLevel].items, items[i], 1);
		}  
		
		t.removeMarch (marchId);
		t.showStats();    
	},

	showStats : function (){
		var div = $(UID['tabAttackStats_Status']);
		var t = Tabs.Attacks;
		
		if (div==null){
			return;
		}
		
		var runTime = Data.options.objStats.runTime;
		if (Data.options.objAttack.enabled){
			runTime += (serverTime()-t.curRunStart);
		}
		
		var trueRunTime = (runTime > 0) ? (runTime/3600) : 1;
		
		var m = '<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<td class=left>'+ translate('Start Date') +': </td>'
		+'		<td>'+  new Date(Data.options.objStats.tsStart * 1000).myString() +'</td>'
		+'	</tr><tr>'
		+'		<td class=left>'+ translate('Run Time') +': </td>'
		+'		<td>'+ timeFormat(runTime, true) +'</td>'
		+'	</tr><tr>'
		+'		<td class=left>'+ translate('Attacks') +': </td>'
		+'		<td>'+ Data.options.objStats.numAttacks +'</td>'
		+'	</tr><tr valign=top>'
		+'		<td class=left>'+ translate('Resources') +': </td>'
		+'		<td>'
		+'			<table class=' + UID['table'] + '>';
		
		for (var name in Data.options.objStats.resources)
		{
			var perHour = Data.options.objStats.resources[name] / trueRunTime;
			m += '	<tr align=right>'
			+'			<td>'+ translate(name) +':</td>'
			+'			<td>'+ Data.options.objStats.resources[name].intToCommas() +'</td>'
			+'			<td>('+ perHour.intToCommas() +' /'+ translate('h')+ ')</td>'
			+'		</tr>';
		}
		
		m += '		</table>'
		+'		</td>'
		+'</tr></table>';
		
		m += '<br><div class=' + UID['subtitle'] + '>'+ translate('Statistics') +'&nbsp;'+ translate('of') +'&nbsp;'+ translate('Attack') +' '+ translate('and') +' '+ translate('Items') +'</div>'
		+'<div style="overflow:auto">'
		+'	<table class=' + UID['table'] + '>'
		+'		<tr class=' + UID['row_top_headers'] + ' align=center>'
		+'			<td style="background:none !important;"></td>'
		+'			<td align=right colspan=10>'+ translate('Levels') +'</td>'
		+'		</tr><tr align=right class=' + UID['row_headers'] + '>'
		+'			<td style="background:none !important;"></td>';
		
		for (i=1; i < 11; i++) {
			m += '	<td width=45>'+ i +'</td>';
		}
		
		m += '	</tr><tr>'
		+'			<td colspan=11><HR class=thin></td>'
		+'		</tr><tr align=right>'
		+'			<td class=left># '+translate('Attacks')+':</td>';
		
		for (i=1; i < 11; i++){
			m += '	<td>'+ Data.options.objStats.byLevel[i].numAttacks +'</td>';
		}
		
		m += '	</tr><tr>'
		+'			<td colspan=11><HR class=thin></td>'
		+'		</tr>'; 
		
		var items =  flipStats ('items');     
		for (var p in items){
			m += '<tr align=right>'
			+'		<td class=left>'+ translate(p) +':</td>';
			for (i=1; i < 11; i++) {
				m += '<td>'+ items[p][i] +'</td>';
			}
		}
		
		m += '</tr></table></div>';
		div.innerHTML = m;
		
		function flipStats (name){
			var o = {};
			for (var i=1; i < 11; i++){
				for (var p in Data.options.objStats.byLevel[i][name]){
					if (!o[p])
					{
						o[p] = [];
						for (var x=1; x < 11; x++){
							o[p][x] = 0;
						}
					}
					o[p][i] += Data.options.objStats.byLevel[i][name][p];
				}
			}
			return o;
		}
	},
	

	
	//*** Attacks Tab - Maps Sub-tab ***
	//----------------------------------------------------------------------------
	tabAttackMaps : function(){
		var t = Tabs.Attacks;

		$(UID[t.lastSubTab]).className='';
		$(UID[t.lastSubTab]).style.zIndex=0;
		$(UID['tabAttackMaps']).className='selected';
		$(UID['tabAttackMaps']).style.zIndex=1;
		t.lastSubTab = 'tabAttackMaps';

		t.contentType = 4;

		var m = '<div class=' + UID['subtitle'] + '>'+ translate('Search') + ' ' + translate('Location') +'</div>'
			+'<div style="overflow:auto">'
			+ '<b>' + translate('Search Radius') + ':</b> '
			+'	<select id='+setUID('tabAttackMaps_Radius')+'>';
			
			for (var i=5; i <= t.MAX_DISTANCE; i+=5){
				m +='		<option value="'+ i +'" '+ (Data.map.radius == i ? 'selected' : '') +'>'+i+'</option>';
			}
		  
			m += '	<select> '
			+ translate('miles') + '.&nbsp;&nbsp;'
			+'<input id='+ setUID('tabAttackMaps_Search') +' type=button value="'+ translate('Search') +'" />'
			+'<br><br>'
			+'	<table class=' + UID['table'] + '>'
			+'		<tr align=center class=' + UID['row_headers'] + '>'
			+'			<td>'+translate('type')+'</td>'
			+'			<td>'+translate('total')+'</td>'
			+'		</tr>';
		
		// Add Search Report
		for (var type in Data.map.terrains){
			m += '<tr>'
			+ '	<td>'+ translate(type) +'</td>'
			+ '	<td align=right><span class=jewel>'+ Data.map.terrains[type].length +'</span></td>'
			+ '</tr>'
		}

		m += '</table></div>';
		
		// Display the inputs
		$(UID['tabAttack_Content']).innerHTML = m;

		// add event listeners
		$(UID['tabAttackMaps_Search']).addEventListener ('click', butSearchNow, false);
		
		$(UID['tabAttackMaps_Radius']).addEventListener ('change', function(ev){
			var el = ev.target;
			Data.map.radius = parseInt(el.options[el.selectedIndex].value);
		}, false);
		
		
		// search the map for the selected type
		function butSearchNow (e){
			verboseLog('<b>scanMap</b>: Begin...');

			var t = Tabs.Attacks;

			var dial = new ModalDialog (t.container, 300, 150, '', false, null);
			
			// Change this to reflect the parameter for the category of map item
			var dialbox = dial.getContentDiv();
			dialbox.innerHTML = translate('Scanning Map').replace('$NUM$',Data.map.radius);
			
			var ix=0; iy=0;
			var x = Data.map.x;
			var y = Data.map.y;
			var radius = Data.map.radius;
			
			var options = {
				//noTerrains	: true,
				//noWildernesses: true,
				//minLevel		: 9,
				//withAlliance	: true,
				//printCSV		: true,
			}
			
			Map.scanMap (x,y, radius, function(res){
				if (res == null){
					verboseLog('<b>scanMap</b>: there was an <b>error</b> while scanning the map');
					dial.getContentDiv().innerHTML = '<B>' + translate('Bummer, there was an error while scanning the map') + '.</B>';
					dial.allowClose (true);
					Tabs.Attacks.checkMapBusy = false;
					return;
				}
				if(res.done){
					verboseLog('scanMap: complete!');

					// Sort by Distance
					for (var type in Data.map.terrains){
						Map.sortByDist(Data.map.terrains,type);
					}

					Tabs.Attacks.checkMapBusy = false;
					dial.destroy();
					
					
					// Refresh the Tab Content
					t.tabAttackMaps();
					
				} else {
					dial.getContentDiv().innerHTML = translate('Scanning Map').replace('$NUM$',Data.map.radius) + '<br><br>'+Map.step;
				}
			}, options);
			
		}
		
	}
};
//******************************** End Attacks *************************



/***********************************   Jobs Tab   **********************************/
Tabs.Jobs = {
	tabOrder		: JOBS_TAB_ORDER,
	tabLabel		: 'Tasks',
	tabDisabled		: !JOBS_TAB_ENABLE,
	lastSubTab		: 'tabJobInfo',
	container		: null,
	timer			: null,
	buildStatTimer	: null,
	researchStatTimer	: null,
	trainTimer		: null,
	trainStatTimer	: null,
	capitolTroops	: [kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror],
	outpost1Troops	: [kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kAquaTroop],
	outpost2Troops	: [kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kStoneTroop],
	outpost3Troops	: [kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kFireTroop],
	outpost4Troops	: [kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kWindTroop],
	allTroops		: [kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop],
	selectedQ		: 'min_housing',
	trainJobs		: [],
	researchList	: {Agriculture:'Agriculture', Woodcraft:kWoodcraft, Masonry:'Masonry', Mining:kMining, Clairvoyance:'Clairvoyance', RapidDeployment:'RapidDeployment', Ballistics:'Ballistics', Metallurgy:'Metallurgy', Medicine:'Medicine', Dragonry:kDragonry, Levitation:kLevitation, Mercantilism:'Mercantilism', AerialCombat:'AerialCombat'},
	researchIdx		: {Agriculture:0, Woodcraft:1, Masonry:2, Mining:3, Clairvoyance:4, RapidDeployment:5, Ballistics:6, Metallurgy:7, Medicine:8, Dragonry:9, Levitation:10, Mercantilism:11, AerialCombat:12},
	researchName	: [kAgriculture, kWoodcraft, kMasonry, kMining, kClairvoyance, kRapidDeployment, kBallistics, kMetallurgy, kMedicine, kDragonry, kLevitation, kMercantilism, kAerialCombat],
	capitolCity		: [kHome, kGarrison, kScienceCenter, kMetalsmith, kOfficerQuarter, kMusterPoint, kRookery, kStorageVault, kTheater, kSentinel, kFactory, kFortress, kDragonKeep, kWall],
	capitolField	: [kMine, kFarm, kLumbermill, kQuarry],
	outpostCity		: [kTrainingCamp, kHome, kSilo, kMusterPoint, kDragonKeep, kWall],
	outpostField	: [kMine, kFarm, kLumbermill, kQuarry],
	contentType		: 0, // 0 = info, 1 = train, 2 = build, 3 = research, these should be enums but Javascript doesn't support that type
	trainContentType: 0, // 0 = train, 1 = config
	buildScrollPos	: 0,
	
	init : function (div){
		var t = Tabs.Jobs;
		
		// Tab initialization
		t.container = div;
		var m =  '<ul class=tabs>\
			<li class="tab first"><a id=' + setUID('tabJobInfo') + '>'+ translate('Summary') +'</a></li>\
			<li class=tab><a id=' + setUID('tabJobTrain') + '>'+ translate('Train') +'</a></li>\
			<li class=tab><a id=' + setUID('tabJobBuild') + '>'+ translate('Build') +'</a></li>\
			<li class=tab><a id=' + setUID('tabJobResearch') + '>'+ translate('Research') +'</a></li>\
			</ul>\
			<div id=' + setUID('tabJob_Header') + ' style="height:225px; max-height:225px; margin-bottom:5px;"></div>\
			<div id=' + setUID('tabJob_Content') + ' class="' + UID['scrollable'] + '" style="padding-top:5px; height:435px; max-height:700px;"></div>';
		
		div.innerHTML = m;
		
		$(UID['tabJobInfo']).addEventListener ('click', t.tabJobInfo, false);
		$(UID['tabJobTrain']).addEventListener ('click', t.tabJobTrain, false);	
		$(UID['tabJobBuild']).addEventListener ('click', t.tabJobBuild, false);
		$(UID['tabJobResearch']).addEventListener ('click', t.tabJobResearch, false);
		
		// Restore the views
		t.contentType = Data.options.jobsTab;
		t.trainContentType = Data.options.trainTab;

		// Training initialization
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++){
			if (!Data.options.autoTrain.city[cityIdx]){
				Data.options.autoTrain.city[cityIdx] = {};
			}
		}
		
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++)
		{
			if (!Data.options.autoTrain.city[cityIdx].troopType) {
				Data.options.autoTrain.city[cityIdx].troopType = [];
				for (tt=0; tt < t.capitolTroops.length; tt++){
					Data.options.autoTrain.city[cityIdx].troopType[tt] = {};
				}
			}
		}
		
		// Training troopCap
		if (Data.options.troopCap == false) {
			Data.options.troopCap.city = []
			Data.options.troopCap.city.troopType = [];
			for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++){
				for (var tt=0; tt < t.allTroops.length; tt++){
					Data.options.troopCap.city[cityIdx].troopType[tt] = {};
				}
			}
		}
		
		if (!Data.options.troopCap.city) {
			Data.options.troopCap.city = [];
			for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++){
				Data.options.troopCap.city[cityIdx] = {};
			}
		}
		
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++)
		{
			if (!Data.options.troopCap.city[cityIdx].troopType) {
				Data.options.troopCap.city[cityIdx].troopType = [];
				for (tt=0; tt < t.allTroops.length; tt++){
					Data.options.troopCap.city[cityIdx].troopType[tt] = {};
				}
			}
		}
		
		// Build initilization
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++)
		{
			if (!Data.options.autoBuild.buildingEnable[cityIdx]){
				Data.options.autoBuild.buildingEnable[cityIdx] = {};
			}
		}
		
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++)
		{
			if (!Data.options.autoBuild.buildCap[cityIdx]){
				Data.options.autoBuild.buildCap[cityIdx] = {};
			}
		}
		
		// Research initialization
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++)
		{
			if (!Data.options.autoResearch.researchEnable[cityIdx]) {
				Data.options.autoResearch.researchEnable[cityIdx] = {};
			}
			if (!Data.options.autoResearch.researchCap[cityIdx]) {
				Data.options.autoResearch.researchCap[cityIdx] = {};
			}
		}
		
		// Enable the jobs
		t.setTrainEnable (Data.options.autoTrain.enabled);	
		t.selectedQ = Data.options.trainQChoice;
		t.setBuildEnable (Data.options.autoBuild.enabled);
		t.setResearchEnable (Data.options.autoResearch.enabled);
		
		// Add the unload event listener
		window.addEventListener('unload', t.onUnload, false);
		
	},

	show : function (){
		var t = Tabs.Jobs;
		
		switch (t.contentType) {
			case 0: t.tabJobInfo(); break;
			case 1: t.tabJobTrain(); break;
			case 2: t.tabJobBuild(); break;
			case 3: t.tabJobResearch(); break;
		}
	},
	
	hide : function (){
		var t = Tabs.Jobs;
		//t.clearTimers();
	},
	
	onUnload : function () {
		logit('Tabs.Jobs.onUnload');
		var t = Tabs.Jobs;
		Data.options.jobsTab = t.contentType;
		Data.options.trainTab = t.trainContentType;
		Data.options.trainQChoice = t.selectedQ;
	},

	clearTimers : function (){
		var t = Tabs.Jobs;
		clearTimeout (t.jobsStatTimer);
		clearTimeout (t.trainStatTimer);
		clearTimeout (t.buildStatTimer);
		clearTimeout (t.researchStatTimer);
	},
	
	// ** Tab: Jobs - SubTab:  Info
	//--------------------------------------------------------------------
	tabJobInfo : function (){
		var t = Tabs.Jobs;
		$(UID[t.lastSubTab]).className ='';
		$(UID[t.lastSubTab]).style.zIndex=0;
		$(UID['tabJobInfo']).className ='selected';
		$(UID['tabJobInfo']).style.zIndex=1;
		t.lastSubTab = 'tabJobInfo';
		
		t.contentType = 0;
		
		var city = Seed.cities[0];
		
		var n = '<div class=' + UID['title'] + '>'+translate('Info')+'</div>';
		n += cityTitle(0);
		
		$(UID['tabJob_Header']).style.height = "45px";
		$(UID['tabJob_Header']).innerHTML = n;
		
		$(UID['tabJob_Content']).style.height = "610px";
		$(UID['tabJob_Content']).innerHTML = '<div id="' + setUID('tabJob_Container') + '"></div>'; 

		var container = $(UID['tabJob_Container']);
		
		function jobsStatTick(){
			// Main City
			var m = '<table class=' + UID['table'] + '>' 
				+ dispBuildingJob(0) 
				+ '<tr><td>&nbsp;</td></tr>'
				+ dispResearchJob(0) 
				+ '<tr><td>&nbsp;</td></tr>'
				+ dispTrainingJobs(0) 
				+ '</td></tr></table>';

			// Outposts ...
			for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++){
				if(cityIdx != 0){
					m += '<div class=short></div>'
					+ cityTitle(cityIdx) 
					+ '<table class=' + UID['table'] + '>' 
					+ dispBuildingJob(cityIdx) 
					+ dispTrainingJobs(cityIdx) 
					+ '</td></tr></table>';
				}
			}
			
			container.innerHTML = m; 
			container.style.height = container.offsetHeight + 'px';
		}
		
		
		// Display build queue
		function dispBuildingJob (cityIdx){
			var m = '<tr><td class=left><b>'+ translate('Building') +':</b> </td>';
			var job = getBuildingJob (cityIdx);
			
			// TODO: very rare occurance: Error: job.building is null
			if (job && job.job.run_at > serverTime())
			{
				// Don't show negative values - not pleasant user interface. To be truly nice, if the time is less than zero, we should reset 
				// the build timer. For now, that is done by the Build tab's notification process
				m += '<td align=right>'+ translate(job.building.type) +' ('+ job.job.level +') &nbsp;</td>'
				  + '<td>&nbsp;<font color=' + TIMER_COLOR + '>' + timeFormat(job.job.run_at - serverTime(), true) + '</font></td>'
				  + '</tr>';
			} else {
				m += '<td align=right colspan=2><span class=' + UID['bold_red'] + '>' + translate('None').toUpperCase() + '</span></td></tr>';
			}
			return m;
		}
		
		// Display research queue
		function dispResearchJob (cityIdx){
			var m = '<tr>'
				+ '		<td class=left><b>'+ translate('Researching') +': </b></td>';
				
			var job = getResearchJob (cityIdx);
			if (job && job.run_at > serverTime())
			{
				m += '<td align=right>'+ translate(job.research_type) +' ('+ job.level +') &nbsp;</td>'
				  + '<td>&nbsp;<font color=' + TIMER_COLOR + '>' + timeFormat(job.run_at - serverTime(), true) + '</font></td>'
				  +'</tr>';
			} else {
				m += '<td align=right  colspan=2><span class=' + UID['bold_red'] + '>' + translate('None').toUpperCase() + '</span></td></tr>';
			}
			return m;
		}
		
		// Display training queues
		function dispTrainingJobs (cityIdx){
			var m = '', last = serverTime(), trains = [];
			for (var i=0; i < Seed.cities[cityIdx].jobs.length; i++){
				if (Seed.cities[cityIdx].jobs[i].queue=='units' && 
					Seed.cities[cityIdx].jobs[i].unit_type && 
					Seed.cities[cityIdx].jobs[i].run_at > last
					){
						trains.push (Seed.cities[cityIdx].jobs[i]);
				}
			}
			trains.sort(function(a,b){return a.run_at-b.run_at});
			
			for (var i=0; i < trains.length; i++){
				var left='', tot='', timeRemaining = 0;
				if (i==0){
					left = translate('Training') + ':';
				}
				else if (i==trains.length-1) {
					timeRemaining = (trains[i].run_at-serverTime() > 0) ? trains[i].run_at-serverTime() : 0;
					tot = '&nbsp;<b>(' + timeFormatShort(timeRemaining) + ')</b>';
				}
				
				timeRemaining = (trains[i].run_at-last > 0) ? trains[i].run_at-last : 0;
				m += '<tr>'
				+ '		<td class=left><b>' + left + '</b>&nbsp;</td>'
				+ '		<td align=right>' + trains[i].quantity + '&nbsp;&nbsp;' + translate(trains[i].unit_type) + '&nbsp;</td>'
				+ '		<td>&nbsp;<font color=' + TIMER_COLOR + '>'
				+ timeFormat(timeRemaining, true) + tot + '</font></td>'
				+'</tr>';
				last = trains[i].run_at;
			}      
			return m;
		}
		
		function cityTitle (cityIdx){
			var city = Seed.cities[cityIdx];
			// Outposts are always defending (until further notice)
			var wallStatus = '';
			var alliance_name = (Seed.player.alliance) ? Seed.player.alliance.name : '';
			//alliance_name = (city.type == kOutpost) ? '' : alliance_name;
			
			if (cityIdx == 0){
				wallStatus = (Seed.cities[cityIdx].defended!=undefined && Seed.cities[cityIdx].defended) ? '<font class='+ UID['defending'] +'>'+ translate('Defend').toUpperCase() +'</font>' : '<font class='+ UID['hiding'] +'>'+ translate('Hiding').toUpperCase() +'</font>';
			}
			else {
				wallStatus = '<font class='+ UID['defending'] +'>'+ translate('Defend').toUpperCase() +'</font>';
			}
			var title = ''
				+'<div class=' + UID['subtitle'] + '>'
				+'	<table class=' + UID['table'] + '>'
				+'	<tr>'
				+'		<td align=left>'+ city.name +'</td>'
				+'		<td align=center>'+ city.x +','+ city.y + '</td>'
				+'		<td align=center width=200px>'
				+'			<font color=yellow>' + alliance_name +'</font>'
				+'		</td>'
				+'		<td width=80px align=right>'+ wallStatus +'</td>'
				+'	</tr>'
				+'</table></div>';
			return title;
		}
		
		// First run of jobsStatTick
		jobsStatTick();
		
		// Timers
		t.clearTimers();
		t.jobsStatTimer = setInterval (jobsStatTick, 1000);
	},

	
	//----------------------------------------------------------------------------
	//*** Jobs Tab - Train Sub-tab ***
	//----------------------------------------------------------------------------
	tabJobTrain : function (){
		var t = Tabs.Jobs;
		$(UID[t.lastSubTab]).className ='';
		$(UID[t.lastSubTab]).style.zIndex=0;
		$(UID['tabJobTrain']).className ='selected';
		$(UID['tabJobTrain']).style.zIndex=1;
		t.lastSubTab = 'tabJobTrain';
		
		t.contentType = 1;
		
		// Create status ticker
		var n = '<div class=' + UID['title'] + '>'+ translate('Training Progress') +'</div>'
		+'<div class=' + UID['status_ticker'] + ' style="margin-bottom: 5px !important">'
		+'	<center><input id=' + setUID('tabJobTrain_OnOff') + ' type=button /></center>'
		+'	<div id=' + setUID('tabJobTrain_Report') + ' class='+ UID['status_report'] +'></div>'
		+'	<br>'
		+'	<div id='+ setUID('tabJobTrain_Feedback') +' class='+ UID['status_feedback'] +'></div>'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id='+ setUID('tabJobTrain_tabTrain') +'>'+ translate('Train') +'</a></li>'
		+'	<li class="tab"><a id='+ setUID('tabJobTrain_tabConfig') +'>'+ translate('Config') +'</a></li>'
		+'</ul>';
		$(UID['tabJob_Header']).style.height = "225px";
		$(UID['tabJob_Header']).innerHTML = n;
		
		var m = '<DIV id='+ setUID('tabJobTrain_Content')+ ' style="margin-top:5px;padding-top: 3px;" class="' + UID['content'] + ' ' + UID['scrollable'] +'">';
		
		$(UID['tabJob_Content']).style.height = "430px";
		$(UID['tabJob_Content']).innerHTML = m;
		
		// Add event listener for Enabled/off button
		$(UID['tabJobTrain_OnOff']).addEventListener ('click', function (){
			var t=Tabs.Jobs;
			t.setTrainEnable (!Data.options.autoTrain.enabled);
		}, false);
		$(UID['tabJobTrain_tabTrain']).addEventListener ('click', t.tabJobTrainSets, false);
		$(UID['tabJobTrain_tabConfig']).addEventListener ('click', t.tabJobTrainConfig, false);
		t.refreshTrainButton (Data.options.autoTrain.enabled);
		
		switch (t.trainContentType) {
			case 0: t.tabJobTrainSets(); break;
			case 1: t.tabJobTrainConfig(); break;
		}
		
		//First Run of trainStatTick
		t.trainStatTick();
		
		// Timers
		t.clearTimers();
		t.trainStatTimer = setInterval(t.trainStatTick, 1000);
	},

	
	//*** Jobs Tab - Train Sub-tab  - Train Sub-Sub-tab ***
	//----------------------------------------------------------------------------
	tabJobTrainSets : function(){
		var t = Tabs.Jobs;
		// Create troop table for each city
		var el = [], m = '';
		
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++){
			switch (cityIdx) {
				case 0: troopTypes = t.capitolTroops; break;
				case 1: troopTypes = t.outpost1Troops; break;
				case 2: troopTypes = t.outpost2Troops; break;		
				case 3: troopTypes = t.outpost3Troops; break;	
				case 4: troopTypes = t.outpost4Troops; break;				
			}
			
			var city = Seed.cities[cityIdx];
			m += '<div class=' + UID['subtitle'] + '>'+ city.name +'</div>'
			+'<table class=' + UID['table'] + '>'
			+'	<tr valign=top>'
			+'		<td width=150>'
			+'		<table class=' + UID['table'] + '>';

			m += '	<tr class='+UID['row_headers']+'>'
			+'			<td></td><td>'+translate('Quantity')+'</td><td>'+translate('Total')+'</td></tr>';
			
			var i;
			for (i=0; i < troopTypes.length; i++){
				//if (i%3 == 0){
					m += '<tr>';
				//}
				//m += '<td class=left title="'+translate(troopTypes[i])+'">'+ translate('~'+troopTypes[i]) +':</td>';
				m += '<td class=left>'+ translate(troopTypes[i]) +':</td>';
				var num = Data.options.autoTrain.city[cityIdx].troopType[i];
				if (!num || isNaN(num)){
					num = 0;
				}
				m += '<td align=middle><input type=text id='+ setUID('tabTrain_Troop_'+ cityIdx +'_'+ i) +' ref='+ cityIdx +'_'+ i +' maxlength=6 size=4 value="'+ num +'" style="text-align:right;" /></td>';
				m += '<td align=right>&nbsp;<span class=jewel>('+ getTroopNumbers(Seed.cities[0], troopTypes[i]).total +')</span></td>'
				//if (i > 0 && (i+1)%3 == 0){
					m += '</tr>';
				//}
				el.push(UID['tabTrain_Troop_'+ cityIdx +'_'+ i]);
			}
			//m += ((i+1)%3 == 0) ? '</tr></table></td></tr></table>' : '</table></td></tr></table>';
			m += '</table></td></tr></table>';
		}    
		m += '</div>';
		$(UID['tabJobTrain_Content']).innerHTML = m;

		// Hilite the sub-tabs correctly
		$(UID['tabJobTrain_tabConfig']).className = '';
		$(UID['tabJobTrain_tabConfig']).style.zIndex=0;
		$(UID['tabJobTrain_tabTrain']).className = 'selected';
		$(UID['tabJobTrain_tabTrain']).style.zIndex=1;

		t.trainContentType = 0;

		// Add event listeners for troop quantities 
		for (var i=0; i < el.length; i++){
			$(el[i]).addEventListener('change', troopsChanged, false);
		}

		// Update troops on change
		function troopsChanged (e){
			var args = e.target.getAttribute('ref').split('_');
			var x = parseIntZero(e.target.value);
			var lvl = getMusterPointLevel(0);
			var maxLvl = lvl * 10000;
			maxLvl = (lvl == 11) ? 120000 : maxLvl;
			if (isNaN(x) || x < 0 || x > maxLvl){
				e.target.style.backgroundColor = 'red';
				dispError (translate('Invalid number of troops',t.container));
			} 
			else {
				e.target.value = x;
				Data.options.autoTrain.city[args[0]].troopType[args[1]] = x;
				e.target.style.backgroundColor = '';
			}
		}
		
		
	}, 
	
	// config sub tab
	tabJobTrainConfig : function(){
		var t = Tabs.Jobs;
		
		// Hilite the sub-tabs correctly
		$(UID['tabJobTrain_tabTrain']).className = '';
		$(UID['tabJobTrain_tabTrain']).style.zIndex = 0;
		$(UID['tabJobTrain_tabConfig']).className = 'selected';
		$(UID['tabJobTrain_tabConfig']).style.zIndex = 1;

		t.trainContentType = 1;
		
		var m = '<div class=' + UID['subtitle'] + '>'+ translate('Training Configuration') +'</div>'
			+	'	<div class="' + UID['scrollable'] + '">'
			+	'		<table class=' + UID['table'] + '>'
			+	'		<tr align=center class=' + UID['row_headers'] + '>'
			+	'			<td style="background:none !important;" colspan=2></td>'
			+	'		</tr>';
		
		// Add the radio buttons 
		setUID('tabTrainConfig_QRadio');		
		m += '	<tr>'
		  +	'		<td><label><input type=radio name='+ UID['tabTrainConfig_QRadio'] +' value="min_housing" />'+ translate('Minimum Housing') +'</label></td>'
		  + '	</tr>'
		  + '	<tr>'
		  + '		<td><label><input type=radio name='+ UID['tabTrainConfig_QRadio'] +' value="min_resource" />'+ translate('Minimum Resource Levels') +'</label></td>'
		  + '	</tr>'
		  + '	</table>'
		  + '</div>'; 
		
		// Create an all troop table
		var el = [];
		var troopTypes = t.allTroops;

		m += '<div class=' + UID['subtitle'] + ' style="background-color:#0044a0;">'+ translate('Maximum Troops') +' (0 = no max)</div>'
		  +	'	<table class=' + UID['table'] + '>'
		  + '		<tr valign=top>'
		  + '			<td width=150>'
		  + '			<table class=' + UID['table'] + '>';
		
		var i;
		for (i=0; i < troopTypes.length; i++){
			m += '<tr>'
			  +  '	<td class=left>'+ translate(troopTypes[i]) +':</td>';
			
			var num = Data.options.troopCap.city[0].troopType[i];
			if (!num || isNaN(num)){
				num = 0;
			}
			
			m += '<td><input type=text id='+ setUID('tabTrainConfig_Cap_'+ 0 +'_'+ i) +' ref='+ (0 +'_'+ i) +' maxlength=6 size=2 value="'+ num +'" style="text-align:right;" /></td>'
			  + '</tr>';

			el.push(UID['tabTrainConfig_Cap_'+ 0 +'_'+ i]);
		}

		m += '			</table>'
		  + '			</td>'
		  + '		</tr>'
		  + '	</table>'
		  + '</div>';
		
		// Display the page
		$(UID['tabJobTrain_Content']).innerHTML = m;

		// add event listeners for the radio buttons
		var r = document.getElementsByName(UID['tabTrainConfig_QRadio']);
		for (var i=0; i < r.length; i++)
		{
			$(r[i]).addEventListener('change', enableChanged, false);
			// Select the radio button that was last selected
			r[i].checked = (r[i].value == Data.options.trainQChoice);
		}

		// Add event listeners for troop quantities 
		for (var i=0; i < el.length; i++) {
			$(el[i]).addEventListener('change', troopsChanged, false);
		}

		// radio buttons are weird    
		function enableChanged(e){
			var t = Tabs.Jobs;
			
			if (Data.options.autoTrain.enabled) {
				t.setTrainEnable(false); // It would be very bad to leave training on when switching queue types. 
				if (t.contentType == 1){
					t.dispFeedback (translate('Safe Mode') +' '+ translate('Training') +' '+ translate('Turned Off'));
				}
			}
			
			t.selectedQ = e.target.value;
			Data.options.trainQChoice = e.target.value;
		}
		
		// Update troops on change
		function troopsChanged (e){
			var args = e.target.getAttribute('ref').split('_');
			var x = parseIntZero(e.target.value);
			
			// The upper limit is not important because we are looking at a maximum number of troops
			if (isNaN(x) || x < 0){
				e.target.style.backgroundColor = 'red';
				dispError (translate('Invalid number of troops',t.container));
			} 
			else {
				e.target.value = x;
				Data.options.troopCap.city[args[0]].troopType[args[1]] = x;
				e.target.style.backgroundColor = '';
			}
		}
	},
	
	/*
	refresh : function (){
		var t = Tabs.Jobs;
		Seed.fetchPlayer (t.showStuff());  
	},
	*/

	//----------------------------------------------------------------------------
	//*** Jobs Tab - Build Sub-tab ***
	//----------------------------------------------------------------------------
	tabJobBuild : function (){
		var t = Tabs.Jobs;
		$(UID[t.lastSubTab]).className ='';
		$(UID[t.lastSubTab]).style.zIndex=0;
		$(UID['tabJobBuild']).className ='selected';
		$(UID['tabJobBuild']).style.zIndex=1;
		t.lastSubTab = 'tabJobBuild';
		
		t.contentType = 2;
		
		var n = '<div class=' + UID['title'] + '>'+ translate('Construction Progress') + '</div>'
		+'<div class=' + UID['status_ticker'] + '>'
		+'	<center><input id='+ setUID('tabJobBuild_OnOff') +' type=button /></center>'
		+'	<div id='+ setUID('tabJobBuild_Report') +' class='+UID['status_report']+'></div>'
		+'	<br>'
		+'	<div id='+ setUID('tabJobBuild_Feedback') +' class='+ UID['status_feedback'] +'></div>'
		+'</div>';
		$(UID['tabJob_Header']).style.height = "205px";
		$(UID['tabJob_Header']).innerHTML = n;
		
		$(UID['tabJob_Content']).innerHTML = '<div id='+ setUID('tabJobBuild_Content') +'>';
		$(UID['tabJob_Content']).style.height = "455px";
		
		m = '';
		
		var el = [], listC = [], listF = [];

		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++)
		{
			if (cityIdx == 0){
				listC = t.capitolCity;
				listF = t.capitolField;
			} 
			else {
				listC = t.outpostCity;
				listF = t.outpostField;
			}
			
			// The seed object contains a wealth of information including alliance membership, number of people in the alliance, facebook ids of each member,
			// the ol's information (in alliances and alliance_membership), the s object contains all the buildings for the cities, whether or not the city is
			// on defense, the list of generals, what and where the dragon is, a list of jobs (e.g. research, building, troops training and pending training, current marches)
			// the marches alone say where the troops are, whether or not they are returning or attacking, general assigned, etc.
			
			var city = Seed.cities[cityIdx];
			m += '<div class=' + UID['content'] + ' style="margin-bottom:5px;">'
			+ '<div class=' + UID['subtitle'] + '>'+ translate('City') + '&nbsp;' + (cityIdx + 1) +'º ('+ city.type +')</div>'
			+'<table class=' + UID['table'] + '>';
			
			for (var i=0; i < listF.length; i++)
			{
				m += '	<tr>'
				+'			<td>'
				+'			<label><input type=checkbox id='+ setUID('tabJobBuild_CB_'+ (cityIdx +'_'+ listF[i])) +' ref='+ (cityIdx +'_'+ listF[i]) +' '+ (Data.options.autoBuild.buildingEnable[cityIdx][listF[i]]?'checked':'') +' /> '+ translate(listF[i]) +'</label>'
				+'			<td>'
				+'			&nbsp;<span class=jewel>'+ Buildings.getLevel(cityIdx, listF[i]) + '</span>'
				+'			</td>'
				+'			</td>'
				+'			<td>'+ buildDisplayCap(cityIdx,(listC.length + i),listF[i]) +'</td>'
				+'		</tr>';  
				el.push(UID['tabJobBuild_CB_'+ (cityIdx +'_'+ listF[i])]);
			}
			
			m += '<tr><td colspan=5><hr></td></tr>';
			
			for (var i=0; i < listC.length; i++)
			{
				m += '	<tr>'
				+'			<td>'
				+'			<label><input type=checkbox id='+ setUID('tabJobBuild_CB_'+ (cityIdx +'_'+ listC[i])) +' ref='+ (cityIdx +'_'+ listC[i]) +' '+ (Data.options.autoBuild.buildingEnable[cityIdx][listC[i]]?'checked':'') +' /> '+ translate(listC[i]) +'</label>'
				+'			</td>'
				+'			<td>'
				+'			&nbsp;<span class=jewel>'+ Buildings.getLevel(cityIdx, listC[i]) + '</span>'
				+'			</td>'
				+'			<td>'+ buildDisplayCap(cityIdx,i,listC[i]) +'</td>'
				+'		</tr>';  
				el.push(UID['tabJobBuild_CB_'+ (cityIdx +'_'+ listC[i])]);
			}
			
			
			
			m +='</table></div>';
		}    
		m += '</div>';
		
		var container = $(UID['tabJobBuild_Content']);
		
		container.style.height = container.offsetHeight + 'px';
		container.innerHTML = m;
		
		//$(UID['tabJob_Content']).scrollTop = t.buildScrollPos; // CHECK
		
		// Add the event listeners for each city's building types
		for (var i=0; i < el.length; i++) {
			$(el[i]).addEventListener('click', checkedBuild, false);
		}
		
		// Add the event listeners for each city's building type caps
		// And restore the persistent data since it has to be done in the same loop
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++)
		{
			var buildList = (cityIdx==0) ? t.capitolCity.concat(t.capitolField) : t.outpostCity.concat(t.outpostField);
			for (var i=0; i < buildList.length; i++)
			{
				var selectMenu = $(UID['tabJobBuild_Cap_'+ cityIdx + '_' + buildList[i]]);
				try {
					if (!Data.options.autoBuild.buildCap[cityIdx][i]) {
						var lowestBuildingLevel = t.getCurrentLowestBuildingLevel(cityIdx, buildList[i]);
						selectMenu.selectedIndex = lowestBuildingLevel;
						Data.options.autoBuild.buildCap[cityIdx][i] = lowestBuildingLevel;
					}
					else {
						selectMenu.selectedIndex = Data.options.autoBuild.buildCap[cityIdx][i];
						selectMenu.options[Data.options.autoBuild.buildCap[cityIdx][i]].selected = true;
						if(Data.options.autoBuild.buildingEnable[cityIdx][buildList[i]]){
							t.checkBuildReqs(cityIdx, buildList[i]);
						}
					}
				}
				catch (e) {
				}
				selectMenu.addEventListener('change', changeBuildCap, false);
			}
		}
		
		// Add the event listeners for the auto-build button and scrollbar
		$(UID['tabJobBuild_OnOff']).addEventListener ('click', function (){
			var t=Tabs.Jobs;
			t.setBuildEnable (!Data.options.autoBuild.enabled);
		}, false);
		t.refreshBuildButton (Data.options.autoBuild.enabled);
		//$(UID['tabJob_Content']).addEventListener('scroll', onScroll, false); // CHECK
		
		function checkedBuild (evt){
			var ref = evt.target.getAttribute('ref');
			var idx = ref.split ('_');
			var cityId = Seed.cities[idx[0]].id;
			Data.options.autoBuild.buildingEnable[idx[0]][idx[1]] = evt.target.checked;
			
			if(Data.options.autoBuild.buildingEnable[idx[0]][idx[1]]){
				t.checkBuildReqs(idx[0], idx[1]);
			}
			
			if (Data.options.autoBuild.enabled && evt.target.checked){
				t.buildTick();
			}
		}

		function buildDisplayCap (cityIdx, listIdx, type){
			var minLvl = Buildings.getLevel(cityIdx, type);
			var m = '<td>'
			+'	<select id='+ setUID('tabJobBuild_Cap_' + cityIdx +'_'+ type) +' ref='+ (cityIdx +'_'+ listIdx) + '>'
			+'		<option value=0'+ ( minLvl>0 ?' style="display:none;"':'') +'>0</option>'
			+'		<option value=1'+ ( minLvl>1 ?' style="display:none;"':'') +'>1</option>'
			+'		<option value=2'+ ( minLvl>2 ?' style="display:none;"':'') +'>2</option>'
			+'		<option value=3'+ ( minLvl>3 ?' style="display:none;"':'') +'>3</option>'
			+'		<option value=4'+ ( minLvl>4 ?' style="display:none;"':'') +'>4</option>'
			+'		<option value=5'+ ( minLvl>5 ?' style="display:none;"':'') +'>5</option>'
			+'		<option value=6'+ ( minLvl>6 ?' style="display:none;"':'') +'>6</option>'
			+'		<option value=7'+ ( minLvl>7 ?' style="display:none;"':'') +'>7</option>'
			+'		<option value=8'+ ( minLvl>8 ?' style="display:none;"':'') +'>8</option>'
			+'		<option value=9'+ ( minLvl>9 ?' style="display:none;"':'') +'>9</option>'
			+'		<option value=10'+ ( minLvl>10 ?' style="display:none;"':'') +'>10</option>'
			+'		<option value=11'+ ( minLvl>11 ?' style="display:none;"':'') +'>11</option>'
			+'	</select></td>'
			+'		<td id='+ setUID('tabJobBuild_FB_'+cityIdx +'_'+ type) +' class=jewel valign=top style="width:250px;white-space:normal;"></td>';
			return m;
		}

		// Add to persistent storage
		function changeBuildCap (evt) {
			var ref = evt.target.getAttribute('ref');
			var idx = ref.split ('_');
			Data.options.autoBuild.buildCap[idx[0]][idx[1]] = evt.target[evt.target.selectedIndex].value;
			evt.target.style.backgroundColor = ''; 
			
			if(Data.options.autoBuild.buildingEnable[idx[0]][idx[1]]){
				t.checkBuildReqs(idx[0], idx[1]);
			}
			
			if (Data.options.autoBuild.enabled){
				t.buildTick();
			}
		}
		
		function onScroll (e){
			if (t.contentType == 2){
				t.buildScrollPos = $(UID['tabJob_Content']).scrollTop;
			}
		}
		
		// First Run of buildStatTick
		t.buildStatTick();
		
		// Timers
		t.clearTimers();
		t.buildStatTimer = setInterval (t.buildStatTick, 1000); // start the build statistics timer
	},

	
	//----------------------------------------------------------------------------
	//*** Jobs Tab - Research Sub-tab ***
	//----------------------------------------------------------------------------
	tabJobResearch : function (){
		var t = Tabs.Jobs;	
		$(UID[t.lastSubTab]).className ='';
		$(UID[t.lastSubTab]).style.zIndex=0;
		$(UID['tabJobResearch']).className ='selected';
		$(UID['tabJobResearch']).style.zIndex=1;
		t.lastSubTab = 'tabJobResearch';
		
		t.contentType = 3;
		
		var n = '<div class=' + UID['title'] + '>'+ translate('Research Progress') +'</div>'
		+'<div class=' + UID['status_ticker'] + '>'
		+'	<center><input id='+ setUID('tabJobResearch_OnOff') +' type=button /></center>'
		+'	<div id='+ setUID('tabJobResearch_Report') +' class='+UID['status_report']+'></div>'
		+'	<br>'
		+'	<div id='+ setUID('tabJobResearch_Feedback') +' class='+ UID['status_feedback'] +'></div>'
		+'</div>';
		$(UID['tabJob_Header']).style.height = "205px";
		$(UID['tabJob_Header']).innerHTML = n;
		
		var m = '<div id='+ setUID('tabJobResearch_Config') +' class=' + UID['content'] + '>';
		
		var checkBoxs = [];
		var city = Seed.cities[0];
		
		m += '<div class=' + UID['subtitle'] + '>'+ translate('City') +' 1º ('+ city.type +')</div>'
		+'<table class=' + UID['table'] + '>';
		
		var i=0;
		for (var id in t.researchList){
			var curLvl = Seed.player.research[id] || 0;
			m += '	<tr>'
			+'			<td>'
			+'			<label>'
			+'			<input type=checkbox id='+ setUID('tabJobResearch_CB_'+id) +' '+ (Data.options.autoResearch.researchEnable[0][id]?'checked':'') +' ref='+ i +' /> '
			+ translate(t.researchList[id]) 
			+'			</label>'
			+'			<td>'
			+'				<span class=jewel>'+ curLvl +'</span>'
			+'			</td>'
			+'			</td>'
			+'			<td>'
			+'			<select id='+ setUID('tabJobResearch_Sel_'+id) +' ref='+ i +'>'
			+'				<option value=0'+ ( curLvl>0 ?' style="display:none;"':'') +'>0</option>'
			+'				<option value=1'+ ( curLvl>1 ?' style="display:none;"':'') +'>1</option>'
			+'				<option value=2'+ ( curLvl>2 ?' style="display:none;"':'') +'>2</option>'
			+'				<option value=3'+ ( curLvl>3 ?' style="display:none;"':'') +'>3</option>'
			+'				<option value=4'+ ( curLvl>4 ?' style="display:none;"':'') +'>4</option>'
			+'				<option value=5'+ ( curLvl>5 ?' style="display:none;"':'') +'>5</option>'
			+'				<option value=6'+ ( curLvl>6 ?' style="display:none;"':'') +'>6</option>'
			+'				<option value=7'+ ( curLvl>7 ?' style="display:none;"':'') +'>7</option>'
			+'				<option value=8'+ ( curLvl>8 ?' style="display:none;"':'') +'>8</option>'
			+'				<option value=9'+ ( curLvl>9 ?' style="display:none;"':'') +'>9</option>'
			+'				<option value=10'+ ( curLvl>10 ?' style="display:none;"':'') +'>10</option>'
			+'				<option value=11'+ ( curLvl>11 ?' style="display:none;"':'') +'>11</option>'
			+'			</select>'
			+'			</td>'
			+'			<td id='+ setUID('tabJobResearch_FB_'+id) +' class=jewel valign=top style="width:250px;white-space:normal;"></td>'
			+'		</tr>';  
			checkBoxs.push(UID['tabJobResearch_CB_'+id]);
			++i;
		}
		
		m += '</table></div>';
		$(UID['tabJob_Content']).style.height = "400px";
		$(UID['tabJob_Content']).innerHTML = m;
		
		// Add the event listeners for the research types
		for (var i=0; i < checkBoxs.length; i++){
			$(checkBoxs[i]).addEventListener('click', checkedResearch, false);
		}
		
		// Add the event listeners for the research caps
		// And restore the persistent data since it has to be done in the same loop
		for (var id in t.researchList) {
			var selectMenu = $(UID['tabJobResearch_Sel_' + id]);
			try {
				if (!Data.options.autoResearch.researchCap[0][id]) {
					var currentResearchLevel = t.getCurrentResearchLevel(id);
					selectMenu.selectedIndex = currentResearchLevel;
					Data.options.autoResearch.researchCap[0][id] = currentResearchLevel;
				}
				else {
					selectMenu.selectedIndex = Data.options.autoResearch.researchCap[0][id];
					selectMenu.options[Data.options.autoResearch.researchCap[0][id]].selected = true;
					if(Data.options.autoResearch.researchEnable[0][id]){
						t.checkResearchReqs(id);
					}
				}
			}
			catch (e) {
			}
			selectMenu.addEventListener('change', changeResearchCap, false);
		}
		
		$(UID['tabJobResearch_OnOff']).addEventListener ('click', function (){
			var t=Tabs.Jobs;
			t.setResearchEnable (!Data.options.autoResearch.enabled);
		}, false);
		t.refreshResearchButton (Data.options.autoResearch.enabled);
		
		function checkedResearch (evt){
			var t = Tabs.Jobs;
			var n = parseInt(evt.target.getAttribute('ref'));
			Data.options.autoResearch.researchEnable[0][t.researchName[n]] = evt.target.checked;
			
			if(Data.options.autoResearch.researchEnable[0][t.researchName[n]]){
				t.checkResearchReqs(t.researchName[n]);
			}
			
			if (Data.options.autoResearch.enabled){
				t.researchTick();
			}
			
		}


		// Add to persistent storage
		function changeResearchCap (evt) {
			var t = Tabs.Jobs;
			var n = parseInt(evt.target.getAttribute('ref'));
			Data.options.autoResearch.researchCap[0][t.researchName[n]] = evt.target[evt.target.selectedIndex].value;
			evt.target.style.backgroundColor = '';  
			
			if(Data.options.autoResearch.researchEnable[0][t.researchName[n]]){
				t.checkResearchReqs(t.researchName[n]);
			}
			
			if (Data.options.autoResearch.enabled){
				t.researchTick();
			}
		}
		
		// First Run of researchStatTick
		t.researchStatTick();
		
		// Timers
		t.clearTimers();
		t.researchStatTimer = setInterval (t.researchStatTick, 1000); // start the research statistics timer
	},

	setTrainEnable : function (onOff){
		var t = Tabs.Jobs;
		t.refreshTrainButton(onOff);
		Data.options.autoTrain.enabled = onOff;
		if (onOff){
			Data.options.trainTimer = setInterval(function() {t.trainTick(0) }, 3000);
		} 
		else {
			t.dispFeedback(""); // Erase previous feedback
			clearTimeout (Data.options.trainTimer);
		}
	},
	
	setBuildEnable : function (onOff){
		var t = Tabs.Jobs;
		t.refreshBuildButton(onOff);
		Data.options.autoBuild.enabled = onOff;
		if (onOff){
			t.buildRetryTime = 20000;
			Data.options.buildTimer = setInterval (t.buildTick, 4000);
		} 
		else {
			clearTimeout (Data.options.buildTimer);
			Data.options.tJobs.length = 0;
		}
	},

	setResearchEnable : function (onOff){
		var t = Tabs.Jobs;
		t.refreshResearchButton(onOff);
		Data.options.autoResearch.enabled = onOff;
		if (onOff){
			t.resRetryTime = 20000;
			Data.options.researchTimer = setInterval(t.researchTick, 5000);
		} 
		else {
			clearTimeout (Data.options.researchTimer);
			//Data.options.rJobs.length = 0;
		}
	},
	
	refreshTrainButton : function (onOff) {
		var t = Tabs.Jobs;
		var but = $(UID['tabJobTrain_OnOff']);
		if(!but) return;
		if (onOff){
			but.value = translate('Training').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
	},

	refreshBuildButton : function (onOff) {
		var t = Tabs.Jobs;
		var but = $(UID['tabJobBuild_OnOff']);
		if(!but) return;
		if (onOff){
			but.value = translate('Building').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
	},

	refreshResearchButton : function (onOff) {
		var t = Tabs.Jobs;
		var but = $(UID['tabJobResearch_OnOff']);
		if(!but) return;
		if (onOff){
			but.value = translate('Researching').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
	},

	trainStatTick : function (){
		var t = Tabs.Jobs;
		var statElement = $(UID['tabJobTrain_Report']);
		if (statElement != null){
			statElement.innerHTML = trainTable('train');
		}
	},
	
	// Build statistics - timer set to fire every 1 seconds
	// Calls getBuildJob(), deleteBuildJob(), Buildings.getById(), Seed.fetchPlayer(), serverTime()
	buildStatFetch : false,
	buildStatTick : function (){
		var t = Tabs.Jobs;
		var m = '<TABLE class=' + UID['table'] + '>';
		var len = Data.options.tJobs.length;
		
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++){
			var city = Seed.cities[cityIdx];
			var job = getBuildJob (cityIdx);
			if (Data.options.tJobs.length == 0 && job) {
				// the Seed is out of sync, the job should be deleted
				deleteBuildJob (cityIdx, job);
				job = null;
			}
			m += '<TR><TD>'+ translate('City') + '&nbsp;' + (cityIdx + 1) +'º</td><TD>';
			
			if (job == null){
				m += translate('Currently Inactive') +'</td></tr>';
			}
			else {
				var b = Buildings.getById(cityIdx, job.city_building_id);
				var timeRemaining = ((job.run_at - serverTime()) > 0) ? timeFormat(job.run_at - serverTime()) : 0;
				if (timeRemaining == 0) {
					// If we have a job and the timeRemaining is negative or zero we delete the job
					// and fetch the Seed - although this does not always work because the server
					// is laggy and may not return the correct information
					m += translate('Awaiting task completion notification') + '...</td><td></td><td></td></tr>';
					deleteBuildJob (cityIdx, job);
					if (t.statFetch == false) {
						Seed.fetchPlayer();
						t.buildStatFetch = true;
					}
				}
				else {
					m += '<b>' + translate('Building') +':</b> </td><td> '+ translate(b.type) + '  ('+ job.level +') </td><td> <font color='+TIMER_COLOR+'>'+ timeRemaining  +'</font></td></tr>';
					t.buildStatFetch = false;
					try{
						$(UID['tabJobBuild_FB_'+cityIdx+'_'+b.type]).innerHTML = '<font color=#000>' + translate('Building') + ': ' + translate(b.type) + ' ' + translate('Level').toLowerCase() + ' ' + job.level + '</font>';
					}catch(e){}
				}
			}
		}
		$(UID['tabJobBuild_Report']).innerHTML = m +'</table>';
	},

	// Build statistics - timer set to fire every 1 seconds
	// Calls getResearchJob(), deleteResearchJob(), Seed.fetchPlayer(), resUITranslate(), serverTime()
	resStatFetch : false,
	researchStatTick : function (){
		var t = Tabs.Jobs, m = '<table class=' + UID['table'] + '>', city = Seed.cities[0];
		var job = getResearchJob (0);
		
		m += '<tr><td>'+ translate('City') +' 1º </td><td>';

		if (job == null){
			m += translate('Currently Inactive') +'</td></tr>';
		}
		else {
			var timeRemaining = ((job.run_at - serverTime()) > 0) ? timeFormat(job.run_at - serverTime()) : 0;
			if (timeRemaining == 0) {
				m += translate('Awaiting task completion notification') + '...</td><td></td><td></td></tr>';
				deleteResearchJob(job);
				if (t.resStatFetch == false) {
					Seed.fetchPlayer();
					t.resStatFetch = true;
				}
			}    
			else {
				// Bug: If we have a job and the timeRemaining is negative or zero we should delete the job
				m += '<b> '+ translate('Researching') +': </b> </td><td> '+ translate(t.resUITranslate(job.research_type)) +' ('+ job.level +') </td><td>  <font color='+TIMER_COLOR+'>'+ timeRemaining  +'</font></td></tr>';
				t.resStatFetch = false;
			}
		}

		$(UID['tabJobResearch_Report']).innerHTML = m +'</table>';
		try{
			$(UID['tabJobResearch_FB_'+job.research_type]).innerHTML = '<font color=#000>' + translate('Researching') + '&nbsp;' + translate('Level').toLowerCase() + '&nbsp;' + job.level + '</font>';
		}catch(e){}
		//t.statTimer = setTimeout (t.statTick, 5000);
	},

	// Modified to work with jobs
	dispFeedback : function (msg){
		var t = Tabs.Jobs;
		var elementId = '';   

		switch(t.contentType) {
			case 0: break;
			case 1: elementId = 'tabJobTrain_Feedback'; break;
			case 2: elementId = 'tabJobBuild_Feedback'; break;
			case 3: elementId = 'tabJobResearch_Feedback'; break;
		} 
		
		if (elementId && $(UID[elementId])){
			if (msg == ''){
				$(UID[elementId]).innerHTML = msg; 
			} else {
				$(UID[elementId]).innerHTML = new Date().toTimeString().substring (0,8) +'&nbsp;'+  msg;
			}
		}
	},

	// Returns level == 12 if the building is missing
	getCurrentLowestBuildingLevel : function (cityIdx, buildingType){
		var t = Tabs.Jobs, level = 12;
		
		// The building can be missing if it has not been built yet
		try {
			var b = Seed.cities[cityIdx].buildings;
			for (var i=0; i < b.length; i++){
				if (b[i].type == buildingType){
					if (b[i].level < level){
						level = b[i].level;
					}
				}
			}
		}
		catch (e) {
		}  

		return level;
	},

	// Given the city index number and the building type, returns the
	// lowest level building of the specified type or zero if the building
	// is not found (may not have been built)
	// TBD: Check to see if this is needed anymore - we now use getCurrentLowestBuildingLevel() 
	// see above
	getLowestBuildingLevel : function(cityIdx, buildingType){
		var buildings = Seed.cities[cityIdx].buildings;
		var lowest = 12;
		var bFound = false;
		
		for (var p=0; p < buildings.length;p++){
			if (buildings[p].type == buildingType) {
				bFound = true; 
				if (buildings[p].level < lowest){
					lowest = buildings[p].level;
				}
			}
		}
		
		return (bFound) ? lowest : 0;
	},

	// Returns the current research level or zero if the user has not
	// researched this type yet
	// TBD - remove the if statements, make sure that the type passed
	// is UI convolved
	getCurrentResearchLevel : function (researchType){
		var t = Tabs.Jobs, level = 0;
		
		// This can be missing if the user has not done any research
		// implying a research level of zero
		try {
			level = (Seed.player.research[researchType]) ? Seed.player.research[researchType] : 0; 
		}
		catch (e) {
		}  

		return level;
	},
	
	// Return the total number troops of the specified type adding in the qty about to 
	// be produced. If this number is less than the cap, return zero     
	getTroopCap : function(troopType, qty){
		var t = Tabs.Jobs;
		var cap = 0;
		var completedTroops = 0;
		var marchingTroops = 0;
		
		// Get the cap set for this troop type
		for (var i=0; i < t.allTroops.length;i++){
			if (troopType == t.allTroops[i]) {
				cap = Data.options.troopCap.city[0].troopType[i];
				break;
			}
		}
		
		// If there is no cap, we are done
		if (cap == 0){
			return cap;
		}
		
		// Find the number of troops still in the city  
		completedTroops += (Seed.cities[0].units[troopType] != undefined) ? Seed.cities[0].units[troopType] : 0;
		/*
		for (var p in Seed.cities[0].units)
			if (p == troopType) {
				completedTroops = Seed.cities[0].units[p];
				break;
			}
		*/
		
		// Find additional troops in marches
		for (var p in Seed.marches) {
			for (var q in Seed.marches[p].units){
				if (q == troopType){
					marchingTroops += Seed.marches[p].units[q];
				}
			}
		}

		// Find troops in training jobs
		/*
		for (var i=0; i< Seed.cities.length; i++)
			var job = getTrainJob(0);
		*/
		
		return ((completedTroops + marchingTroops + qty) > cap) ? (completedTroops + marchingTroops + qty) : 0;
	},
	
	// Returns the user set building cap or zero if the cap has not been set
	getBuildingCap : function (cityIdx, buildingType){
		var t = Tabs.Jobs;
		var cap = 0;
		var cityType =  (cityIdx == 0) ? t.capitolCity : t.outpostCity;
		cityType =  (cityIdx == 0) ? cityType.concat(t.capitolField) : cityType.concat(t.outpostField);
		
		for (var i=0; i < cityType.length; i++) {
			if (cityType[i] == buildingType) {
				try {
					cap = (Data.options.autoBuild.buildCap[cityIdx][i]) ? Data.options.autoBuild.buildCap[cityIdx][i] : 0; 
					break;
				}
				catch (e) {
				}  
			}
		}

		return cap;
	},

	// Returns the user set research cap or zero if the cap has not been set
	getResearchCap : function (researchType){
		var t = Tabs.Jobs;
		var cap = 0;
		
		for (var id in t.researchList) {
			if (researchType == id) {
				try {
					cap = (Data.options.autoResearch.researchCap[0][id]) ? Data.options.autoResearch.researchCap[0][id] : 0; 
					break;
				}
				catch (e) {
				}  
			}
		}
		return cap;
	},
	
	// Returns the quantity of the specified item type or zero if 
	// the item type is not found
	// Used by the research job
	getItem : function(itemType){
		var items = Seed.player.items;
		var ret = 0;
		for (var p in items) {
			if (p == itemType){
				ret = items[p];
				break;
			}
		}
		return ret;
	},

	resUITranslate : function (researchType){
		var t = Tabs.Jobs;
		for (var id in t.researchList){
			if (id == researchType){
				return t.researchList[id];
			}
		}
		return researchType;
	},

	// Given the city index number and building type, returns the index
	// of the specified building type
	getBuildingIndex : function (cityIdx, buildingType){
		var t = Tabs.Jobs, bldgIdx = 0;
		var cityType =  (cityIdx == 0) ? t.capitolCity : t.outpostCity;
		cityType =  (cityIdx == 0) ? cityType.concat(t.capitolField) : cityType.concat(t.outpostField);
		
		for (var i=0; i < cityType.length; i++){
			if (cityType[i] == buildingType) { 
				bldgIdx = i;
				break;
			}
		}
		return bldgIdx;
	},
	
	// Used by research jobs
	// This would be simple if only one building of each type existed, but you may build multiple garrisons/training camps
	// So we have to look through the entire list and use an additional parameter to specify the building level needed
	// Returns zero if the specified building is not the at the required level
	getBuildingLevel : function(cityIdx, buildingType, buildingLevel){
		var buildings = Seed.cities[cityIdx].buildings;
		var ret = 0;
		for (var p=0; p < buildings.length;p++) {
			if (buildings[p].type == buildingType && buildings[p].level >= buildingLevel){
				ret = buildings[p].level;
				break;
			}
		}
		return ret;
	},

	// Return the index number of the research type
	getResearchIndex : function (researchType){
		var t = Tabs.Jobs;
		return t.researchIdx[researchType];
	},

	// Training - Get the remainin queue length
	getRemainingQueue : function (ic, queueType){
		var city = Seed.cities[ic];
		var jobs = city.jobs;
		var maxQueueLength = city.figures.queue_lengths.units;
		var usedQueue = 0;
		// Count the number of jobs in the queue
		for (var i=0; i<jobs.length; i++) {
			if (jobs[i].queue == queueType){
				++usedQueue;
			}
		}
		return maxQueueLength - usedQueue;
	},

	checkPorterReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Food: 40
		// Garrison Level: 1
		// Idle Population: 1
		// Lumber: 150
		// Metals: 10
		// Upkeep: 2 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 40;
		var garrisonLevel = 1;
		var idlePop = troopQty * 1;
		var lumber = troopQty * 150;
		var metal = troopQty * 10;
		var upkeep = troopQty * 2;
		var city = Seed.cities[0];
		var troopType = kPorter;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required')+': ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kPorter, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity')+' '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison)+' '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate('TrainingCamp')+' '+ garrisonLevel +' + ';
		if (city.resources.food < food) m += translate('Food')+': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood')+': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore')+': '+ (metal - city.resources.ore) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble')+': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m += translate('training queue')+' ';
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty + ' ' + translate('Porter') +' '+translate('UpKeep')+' ' + upkeep + ' '+translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;    
	},

	checkConscriptReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Food: 80
		// Garrison Level: 1
		// Idle Population: 1
		// Lumber: 100
		// Metals: 50
		// Upkeep: 3 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 80;
		var garrisonLevel = 1;
		var idlePop = troopQty * 1;
		var lumber = troopQty * 100;
		var metal = troopQty * 50;
		var upkeep = troopQty * 3;
		var city = Seed.cities[0];
		var troopType = kConscript;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required')+':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kConscript, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity')+': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate(kTrainingCamp) +': '+ garrisonLevel +' + ';
		if (city.resources.food < food) m += translate('Food')+': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood')+': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore')+': '+ (metal - city.resources.ore) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('People')+': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m += translate('training queue')+' ';
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kConscript) +' '+translate('UpKeep')+' ' + upkeep + ' '+translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;    
	},

	checkSpyReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Clairvoyance: 1
		// Food: 120
		// Garrison Level: 2
		// Idle Population: 1
		// Lumber: 200
		// Metals: 150
		// Upkeep: 5 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 120;
		var garrisonLevel = 1;
		var idlePop = troopQty * 1;
		var lumber = troopQty * 200;
		var metal = troopQty * 150;
		var upkeep = troopQty * 5;
		var clairvoyanceLevel = 1;
		var city = Seed.cities[0];
		var troopType = kSpy;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			clairvoyanceLevel = seedReqs.research[kClairvoyance];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kSpy, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate(kTrainingCamp) +': '+ garrisonLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m += translate('Training queue') + ' ';
		if (Seed.player.research.Clairvoyance < clairvoyanceLevel) m += translate(kClairvoyance) + ': ' + clairvoyanceLevel + ' + ';
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate('Spies') +' '+ translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;       
	},

	checkHalberdsmanReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Metallurgy: 1
		// Food: 150
		// Garrison Level: 2
		// Idle Population: 1
		// Lumber: 500
		// Metals: 100
		// Upkeep: 6 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 150;
		var garrisonLevel = 1;
		var idlePop = troopQty * 1;
		var lumber = troopQty * 500;
		var metal = troopQty * 100;
		var upkeep = troopQty * 6;
		var metallurgyLevel = 1;
		var city = Seed.cities[0];
		var troopType = kHalberdsman;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			metallurgyLevel = seedReqs.research[kMetallurgy];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kHalberdsman, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate(kTrainingCamp) +': '+ garrisonLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m+= translate('Training queue') + ' ';
		if (Seed.player.research.Metallurgy < metallurgyLevel) m += translate(kMetallurgy) + ': ' + metallurgyLevel +' + '; 
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kHalberdsman) +' '+ translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;       
	},

	checkMinotaurReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Metallurgy: 1
		// Metalsmith: 1
		// Food: 200
		// Garrison Level: 3
		// Idle Population: 1
		// Lumber: 150
		// Metals: 400
		// Upkeep: 7 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 200;
		var garrisonLevel = 3;
		var idlePop = troopQty * 1;
		var lumber = troopQty * 150;
		var metal = troopQty * 400;
		var upkeep = troopQty * 7;
		var metallurgyLevel = 1;
		var metalsmithLevel = 1;
		var city = Seed.cities[0];
		var troopType = kMinotaur;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			metallurgyLevel = seedReqs.research[kMetallurgy];
			metalsmithLevel = seedReqs.research[kMetalsmith];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kMinotaur, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate(kTrainingCamp) +': '+ garrisonLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m+= translate('Training queue') + ' ';
		if (Seed.player.research.Metallurgy < metallurgyLevel) m += translate(kMetallurgy) + ': ' + metallurgyLevel +' + '; 
		if (Seed.player.research.Metalsmith < metalsmithLevel) m += translate(kMetalsmith) + ': ' + metalsmithLevel +' + '; 
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kMinotaur) +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;          
	},

	checkLongbowmanReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Ballistics: 1
		// Food: 300
		// Garrison Level: 4
		// Idle Population: 2
		// Lumber: 350
		// Metals: 300
		// Upkeep: 9 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 300;
		var garrisonLevel = 4;
		var idlePop = troopQty * 2;
		var lumber = troopQty * 350;
		var metal = troopQty * 300;
		var upkeep = troopQty * 9;
		var ballisticsLevel = 1;
		var city = Seed.cities[0];
		var troopType = kLongbowman;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			ballisticsLevel = seedReqs.research[kBallistics];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}
		
		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kLongbowman, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate(kTrainingCamp) +': '+ garrisonLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m+= translate('Training queue') + ' ';
		if (Seed.player.research.Ballistics < ballisticsLevel) m += translate(kBallistics) + ': ' + ballisticsLevel +' + '; 
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kLongbowman) +' '+ translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;    
	},

	checkSwiftStrikeDragonReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Dragonry: 2
		// Rapid Deployment: 1
		// Rookery: 1
		// Food: 1000
		// Garrison Level: 5
		// Idle Population: 3
		// Lumber: 600
		// Metals: 500
		// Upkeep: 18 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 1000;
		var garrisonLevel = 5;
		var idlePop = troopQty * 3;
		var lumber = troopQty * 600;
		var metal = troopQty * 500;
		var upkeep = troopQty * 18;
		var dragonryLevel = 2;
		var rapidDeploymentLevel = 1;
		var rookeryLevel = 1;
		var city = Seed.cities[0];
		var troopType = kSwiftStrikeDragon;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			rookeryLevel = seedReqs.buildings[kRookery];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			rapidDeploymentLevel = seedReqs.research[kRapidDeployment];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kSwiftStrikeDragon, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate(kTrainingCamp) +': '+ garrisonLevel +' + ';
		if (t.getBuildingLevel(0, kRookery, rookeryLevel) == 0) m += translate(kRookery) +': '+ rookeryLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m+= translate('Training queue') + ' ';
		if (Seed.player.research.Dragonry < dragonryLevel) m += translate(kDragonry) + ': ' + dragonryLevel +' + '; 
		if (Seed.player.research.RapidDeployment < rapidDeploymentLevel) m += translate(kRapidDeployment) + ': ' + rapidDeploymentLevel +' + '; 
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kSwiftStrikeDragon) +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret; 
	},

	checkBattleDragonReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Dragonry: 3
		// Rapid Deployment: 5
		// Rookery: 5
		// Food: 1000
		// Garrison Level: 7
		// Idle Population: 6
		// Lumber: 500
		// Metals: 2500
		// Upkeep: 35 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 1000;
		var garrisonLevel = 7;
		var idlePop = troopQty * 6;
		var lumber = troopQty * 500;
		var metal = troopQty * 2500;
		var upkeep = troopQty * 35;
		var dragonryLevel = 3;
		var rapidDeploymentLevel = 5;
		var rookeryLevel = 5;
		var metalsmithLevel = 5;
		var city = Seed.cities[0];
		var troopType = kBattleDragon;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			rookeryLevel = seedReqs.buildings[kRookery];
			metalsmithLevel = seedReqs.buildings[kMetalsmith];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			rapidDeploymentLevel = seedReqs.research[kRapidDeployment];
			dragonryLevel = seedReqs.research[kDragonry];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kBattleDragon, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate(kTrainingCamp) +': '+ garrisonLevel +' + ';
		if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += translate(kMetalsmith) +': '+ metalsmithLevel +' + ';
		if (t.getBuildingLevel(0, kRookery, rookeryLevel) == 0) m += translate(kRookery) +': '+ rookeryLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m+= translate('Training queue') + ' ';
		if (Seed.player.research.Dragonry < dragonryLevel) m += translate(kDragonry) + ': ' + dragonryLevel +' + '; 
		if (Seed.player.research.RapidDeployment < rapidDeploymentLevel) m += translate(kRapidDeployment) + ': ' + rapidDeploymentLevel +' + '; 
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kBattleDragon) +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;     
	},

	checkArmoredTransportReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Factory: 3
		// Levitation: 3
		// Food: 600
		// Garrison Level: 6
		// Idle Population: 4
		// Lumber: 1500
		// Metals: 350
		// Upkeep: 10 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 600;
		var garrisonLevel = 6;
		var idlePop = troopQty * 4;
		var lumber = troopQty * 1500;
		var metal = troopQty * 350;
		var upkeep = troopQty * 10;
		var factoryLevel = 3;
		var levitationLevel = 3;
		var city = Seed.cities[0];
		var troopType = kArmoredTransport;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			factoryLevel = seedReqs.buildings[kFactory];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			levitationLevel = seedReqs.research[kLevitation];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kArmoredTransport, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate(kTrainingCamp) +': '+ garrisonLevel +' + ';
		if (t.getBuildingLevel(0, kFactory, factoryLevel) == 0) m += translate(kFactory) +': '+ factoryLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ ((lumber - city.resources.wood)) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ ((metal - city.resources.ore)) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m+= translate('Training queue') + ' ';
		if (Seed.player.research.Levitation < levitationLevel) m += translate(kLevitation) + ': ' + levitationLevel +' + '; 
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kArmoredTransport) +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;    
	},

	checkGiantReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Clairvoyance: 3
		// Factory: 7
		// Metallurgy: 8
		// Metalsmith: 5
		// Food: 4000
		// Garrison Level: 9
		// Idle Population: 8
		// Lumber: 6000
		// Metals: 1500
		// Upkeep: 100 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 4000;
		var garrisonLevel = 8;
		var idlePop = troopQty * 8;
		var lumber = troopQty * 6000;
		var metal = troopQty * 1500;
		var upkeep = troopQty * 100;
		var factoryLevel = 7;
		var metalsmithLevel = 7;
		var clairvoyanceLevel = 3;
		var metallurgyLevel = 8;
		var city = Seed.cities[0];
		var troopType = kGiant;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			factoryLevel = seedReqs.buildings[kFactory];
			metalsmithLevel = seedReqs.buildings[kMetalsmith];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			clairvoyanceLevel = seedReqs.research[kClairvoyance];
			metallurgyLevel = seedReqs.research[kMetallurgy];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kGiant, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate(kTrainingCamp) +': '+ garrisonLevel +' + ';
		if (t.getBuildingLevel(0, kFactory, factoryLevel) == 0) m += translate(kFactory) +': '+ factoryLevel +' + ';
		if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += translate(kMetalsmith) +': '+ metalsmithLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m+= translate('Training queue') + ' ';
		if (Seed.player.research.Clairvoyance < clairvoyanceLevel) m += translate(kClairvoyance) + ': ' + clairvoyanceLevel +' + '; 
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kGiant) +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;    
	},

	checkFireMirrorReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Ballistics: 10
		// Factory: 9
		// Metallurgy: 10
		// Food: 5000
		// Garrison Level: 10
		// Idle Population: 10
		// Lumber: 5000
		// Metals: 1200
		// Stone: 8000
		// Upkeep: 250 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 5000;
		var garrisonLevel = 10;
		var idlePop = troopQty * 10;
		var lumber = troopQty * 5000;
		var metal = troopQty * 1200;
		var stone = troopQty * 8000;
		var upkeep = troopQty * 250;
		var factoryLevel = 9;
		var metallurgyLevel = 10;
		var ballisticsLevel = 10;
		var city = Seed.cities[0];
		var troopType = kFireMirror;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			factoryLevel = seedReqs.buildings[kFactory];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			stone = troopQty * seedReqs.resources['stone'];
			ballisticsLevel = seedReqs.research[kBallistics];
			metallurgyLevel = seedReqs.research[kMetallurgy];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kFireMirror, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (ic == 0){ 
			if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		}
		else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += translate(kTrainingCamp) +': '+ garrisonLevel +' + ';
		if (t.getBuildingLevel(0, kFactory, factoryLevel) == 0) m += translate(kFactory) +': '+ factoryLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(ic, 'units') == 0) m+= translate('Training queue') + ' ';
		if (Seed.player.research.Metallurgy < metallurgyLevel) m += translate(kMetallurgy) + ': ' + metallurgyLevel +' + '; 
		if (Seed.player.research.Ballistics < ballisticsLevel) m += translate(kBallistics) + ': ' + ballisticsLevel +' + '; 
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kFireMirror) +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;    
	},

	checkAquaTroopReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Clairvoyance: 4
		// Rapid Deployment: 8
		// Factory: 7
		// Metallurgy: 10
		// Food: 4000
		// TrainingCampe Level: 10
		// Idle Population: 10
		// Lumber: 5500
		// Metals: 2500
		// Stone: 7000
		// Upkeep: 125 food
		
		var t = Tabs.Jobs;    
		var food = troopQty * 5000;
		var trainingCampLevel = 10;
		var idlePop = troopQty * 10;
		var lumber = troopQty * 5000;
		var metal = troopQty * 1200;
		var stone = troopQty * 8000;
		var upkeep = troopQty * 250;
		var factoryLevel = 7;
		var metalsmithLevel = 7;
		var rapidDeploymentLevel = 8;
		var clairvoyanceLevel = 4;
		var respiratorQty = troopQty;
		var city = Seed.cities[0];
		var troopType = kAquaTroop;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kGarrison];
			factoryLevel = seedReqs.buildings[kFactory];
			metalsmithLevel = seedReqs.buildings[kMetalsmith];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			stone = troopQty * seedReqs.resources['stone'];
			rapidDeploymentLevel = seedReqs.research[kRapidDeployment];
			clairvoyanceLevel = seedReqs.research[kClairvoyance];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kAquaTroop, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (t.getBuildingLevel(ic, kTrainingCamp, trainingCampLevel) == 0) m += translate(kTrainingCamp) +': '+ trainingCampLevel +' + ';
		if (t.getBuildingLevel(0, kFactory, factoryLevel) == 0) m += translate(kFactory) +': '+ factoryLevel +' + ';
		if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += translate(kMetalsmith) +': '+ metalsmithLevel +' + ';
		var availableRespirators = t.getItem(kAquaTroopRespirator);
		if (availableRespirators < respiratorQty) m += translate('Respirators') +': '+ (respiratorQty - availableRespirators) +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(1, 'units') == 0) m+= translate('Training queue') + ' ';
		if (Seed.player.research.Clairvoyance < clairvoyanceLevel) m += translate(kClairvoyance) + ': ' + clairvoyanceLevel +' + '; 
		if (Seed.player.research.RapidDeployment < rapidDeploymentLevel) m += translate(kRapidDeployment) + ': ' + rapidDeploymentLevel +' + '; 
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kAquaTroop) +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;    
	},

	checkStoneTroopReqs : function(troopQty, ic, count, troopsLength) {
		// Requirements
		// Clairvoyance: 5
		// Metalsmith: 9
		// Metallurgy: 10
		// Masonry: 10
		// Food: 3000
		// TrainingCamp Level: 10
		// Idle Population: 8
		// Lumber: 4000
		// Metals: 2000
		// Stone: 8000
		// Upkeep: 110 food
		// Glowing Mandrake: 1
		
		var t = Tabs.Jobs;    
		var food = troopQty * 3000;
		var trainingCampLevel = 10;
		var idlePop = troopQty * 8;
		var lumber = troopQty * 4000;
		var metal = troopQty * 2000;
		var stone = troopQty * 8000;
		var upkeep = troopQty * 100;
		var metalsmithLevel = 9;
		var metallurgyLevel = 9;
		var masonryLevel = 10;
		var clairvoyanceLevel = 5;
		var mandrakeQty = troopQty;
		var city = Seed.cities[0];
		var troopType = kStoneTroop;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			food = troopQty * seedReqs.resources['food'];
			garrisonLevel = seedReqs.buildings[kTrainingCamp];
			factoryLevel = seedReqs.buildings[kFactory];
			metalsmithLevel = seedReqs.buildings[kMetalsmith];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			stone = troopQty * seedReqs.resources['stone'];
			metallurgyLevel = seedReqs.research[kMetallurgy];
			clairvoyanceLevel = seedReqs.research[kClairvoyance];
			masonryLevel = seedReqs.research[kMasonry];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kStoneTroop, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (t.getBuildingLevel(ic, kTrainingCamp, trainingCampLevel) == 0) m += translate(kTrainingCamp) +': '+ trainingCampLevel +' + ';
		if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += translate(kMetalsmith) +': '+ metalsmithLevel +' + ';
		var availableMandrakes = t.getItem(kStoneTroopItem);
		if (availableMandrakes < mandrakeQty) m += translate('Mandrakes') +': '+ (mandrakeQty - availableMandrakes) +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (t.getRemainingQueue(1, 'units') == 0) m+= translate('Training queue') + ' ';
		if (Seed.player.research.Clairvoyance < clairvoyanceLevel) m += translate(kClairvoyance) + ': ' + clairvoyanceLevel +' + '; 
		if (Seed.player.research.Metallurgy < metallurgyLevel) m += translate(kMetallurgy) + ': ' + metallurgyLevel +' + '; 
		if (Seed.player.research.Masonry < masonryLevel) m += translate(kMasonry) + ': ' + masonryLevel +' + '; 
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kStoneTroop) +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;    
	},

	checkFireTroopReqs : function (troopQty, ic, count, troopsLength) {
		// Requirements
		// Clairvoyance: 5
		// Food: 5000
		// Idle Population: 12
		// Lumber: 3000
		// Metals: 9000
		// Metalsmith: 8
		// Rapid Deployment: 9
		// Stone: 4000
		// TrainingCamp Level: 10
		// Volcanic Rune: 1
		// Ballistics: 10
		
		var t = Tabs.Jobs;  
		var clairvoyanceLevel = 5;		
		var food = troopQty * 5000;
		var idlePop = troopQty * 12;
		var lumber = troopQty * 3000;
		var metal = troopQty * 9000;
		var metalsmithLevel = 8;
		var rapidDeploymentLevel = 9;
		var stone = troopQty * 4000;
		var trainingCampLevel = 10;
		var volcanicRunesQty = troopQty;
		var ballisticsLevel = 10;
		
		var upkeep = troopQty * 260;

		var city = Seed.cities[0];
		var troopType = kFireTroop;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			clairvoyanceLevel = seedReqs.research[kClairvoyance];
			food = troopQty * seedReqs.resources['food'];
			idlePop = troopQty * seedReqs.population['idle'];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			metalsmithLevel = seedReqs.buildings[kMetalsmith];
			rapidDeploymentLevel = seedReqs.research[kRapidDeployment];
			stone = troopQty * seedReqs.resources['stone'];
			garrisonLevel = seedReqs.buildings[kTrainingCamp];
			ballisticsLevel = seedReqs.research[kBallistics];
		} catch (e) {
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kFireTroop, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (Seed.player.research.Clairvoyance < clairvoyanceLevel) m += translate(kClairvoyance) + ': ' + clairvoyanceLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += translate(kMetalsmith) +': '+ metalsmithLevel +' + ';
		if (Seed.player.research.RapidDeployment < rapidDeploymentLevel) m += translate(kRapidDeployment) + ': ' + rapidDeploymentLevel +' + '; 
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (t.getBuildingLevel(ic, kTrainingCamp, trainingCampLevel) == 0) m += translate(kTrainingCamp) + ': '+ trainingCampLevel +' + ';
		var availableRunes = t.getItem(kFireTroopItem);
		if (availableRunes < volcanicRunesQty) m += translate('Runes') +': '+ (volcanicRunesQty - availableRunes) +' + ';
		if (Seed.player.research.Ballistics < ballisticsLevel) m += translate(kBallistics) + ': ' + ballisticsLevel +' + '; 
		if (t.getRemainingQueue(1, 'units') == 0) m+= translate('Training queue') + ' ';
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kFireTroop) +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		} else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;    
	},
	
	checkWindTroopReqs : function (troopQty, ic, count, troopsLength) {
		// Requirements
		// Aerial Combat: 3
		// Banshee Talons: 1
		// Food: 2000
		// Idle Pop: 6
		// Levitation: 9
		// Lumber: 3000
		// Metals: 3000
		// Rapid Deployment: 9
		// Stone: 1000
		// Training Camp: 10
		
		var t = Tabs.Jobs;  
		
		var aerialCombatLevel = 3;	
		var bansheeTalonsQty = troopQty;
		var food = troopQty * 2000;
		var idlePop = troopQty * 6;
		var levitationLevel = 9;
		var lumber = troopQty * 3000;
		var metal = troopQty * 3000;
		var rapidDeploymentLevel = 9;
		var stone = troopQty * 1000;
		var trainingCampLevel = 10;
		
		var upkeep = troopQty * 50;

		var city = Seed.cities[0];
		var troopType = kWindTroop;
		
		try {
			var seedReqs = Seed.requirements.troop[troopType];
			aerialCombatLevel = seedReqs.research[kAerialCombat];
			food = troopQty * seedReqs.resources['food'];
			idlePop = troopQty * seedReqs.population['idle'];
			levitationLevel = seedReqs.research[kLevitation];
			lumber = troopQty * seedReqs.resources['wood'];
			metal = troopQty * seedReqs.resources['ore'];
			rapidDeploymentLevel = seedReqs.research[kRapidDeployment];
			stone = troopQty * seedReqs.resources['stone'];
			garrisonLevel = seedReqs.buildings[kTrainingCamp];
		} catch (e) {
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var m = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var troopCapped = t.getTroopCap(kWindTroop, troopQty);
		
		// If the troop is capped, are we about to exceed the limit?
		if (troopCapped > 0) m += translate('Capacity') +': '+ troopCapped +' + ';
		
		// Returns zero or the building level
		if (Seed.player.research.AerialCombat < aerialCombatLevel) m += translate(kAerialCombat) + ': ' + aerialCombatLevel +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		availablePop = (availablePop > 0) ? availablePop : 0;
		if (availablePop < idlePop) m += translate('Peoble') + ': ' + (idlePop - availablePop) + ' + ';
		if (Seed.player.research.Levitation < levitationLevel) m += translate(kLeviatation) + ': ' + levitationLevel +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (Seed.player.research.RapidDeployment < rapidDeploymentLevel) m += translate(kRapidDeployment) + ': ' + rapidDeploymentLevel +' + '; 
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (t.getBuildingLevel(ic, kTrainingCamp, trainingCampLevel) == 0) m += translate(kTrainingCamp) +': '+ trainingCampLevel +' + ';
		var availableTalons = t.getItem(kWindTroopItem);
		if (availableTalons < bansheeTalonsQty) m += translate('Talons') +': '+ (bansheeTalonsQty - availableTalons) +' + ';
		if (t.getRemainingQueue(1, 'units') == 0) m+= translate('Training queue') + ' ';
		if (m.length == 0) {
			ret.trainable = true;
			ret.msg = troopQty +' '+ translate(kWindTroop) +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		} else {
			ret.trainable = false;
			ret.msg = n + m;
		}
		return ret;    
	},

	
	checkTrainReqs : function(troopType, troopQty, ic, count, troopsLength) {
		var t = Tabs.Jobs;
		var ret = {};
		switch (troopType) {
		case kPorter: ret = t.checkPorterReqs(troopQty, ic, count, troopsLength); break;
		case kConscript: ret = t.checkConscriptReqs(troopQty, ic, count, troopsLength); break;
		case kSpy: ret = t.checkSpyReqs(troopQty, ic, count, troopsLength); break;
		case kHalberdsman: ret = t.checkHalberdsmanReqs(troopQty, ic, count, troopsLength); break;
		case kMinotaur: ret = t.checkMinotaurReqs(troopQty, ic, count, troopsLength); break;
		case kLongbowman: ret = t.checkLongbowmanReqs(troopQty, ic, count, troopsLength); break;
		case kSwiftStrikeDragon: ret = t.checkSwiftStrikeDragonReqs(troopQty, ic, count, troopsLength); break;
		case kBattleDragon: ret = t.checkBattleDragonReqs(troopQty, ic, count, troopsLength); break;
		case kArmoredTransport: ret = t.checkArmoredTransportReqs(troopQty, ic, count, troopsLength); break;
		case kGiant: ret = t.checkGiantReqs(troopQty, ic, count, troopsLength); break;
		case kFireMirror: ret = t.checkFireMirrorReqs(troopQty, ic, count, troopsLength); break;
		case kAquaTroop: ret = t.checkAquaTroopReqs(troopQty, ic, count, troopsLength); break;
		case kStoneTroop: ret = t.checkStoneTroopReqs(troopQty, ic, count, troopsLength); break;
		case kFireTroop: ret = t.checkFireTroopReqs(troopQty, ic, count, troopsLength); break;
		case kWindTroop: ret = t.checkWindTroopReqs(troopQty, ic, count, troopsLength); break;
		}
		return ret;
	},
	
	// Buildings are of two types. They use food, lumber, metal, stone and/or gold
	// Standard buildings, the most common, do not use gold
	// Calls getLowestBuildingLevel(), getBuildingCap(), actionLog()
	// returns an object containing a Boolean to allow/disallow building and a message
	checkStandardReqs : function(cityIdx, buildingType, defFood, defLumber, defMetal, defStone) {
		var t = Tabs.Jobs;        
		var buildingLevel = t.getLowestBuildingLevel(cityIdx, buildingType);
		var m = '';
		var n = 'L.' + (buildingLevel+1) + ' ' + translate('Required') + ':+ ';
		if (buildingLevel == 0)
		m += ' ' + buildingType;

		var food    = defFood * Math.pow(2,buildingLevel + 1);
		var lumber  = defLumber * Math.pow(2,buildingLevel + 1);
		var metal   = defMetal * Math.pow(2,buildingLevel + 1);
		var stone   = defStone * Math.pow(2,buildingLevel + 1);
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.building[buildingType];
			food = seedReqs.level[buildingLevel + 1].resources['food'];
			lumber = seedReqs.level[buildingLevel + 1].resources['wood'];
			metal = seedReqs.level[buildingLevel + 1].resources['ore'];
			stone = seedReqs.level[buildingLevel + 1].resources['stone'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {buildable:false, msg:[]};
		var buildCap = t.getBuildingCap(cityIdx, buildingType);
		
		// If the building is capped, are we about to exceed the limit?
		if (buildingLevel >= buildCap) m += translate('Capacity') +': '+ buildCap +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';

		if (m.length == 0) {
			ret.buildable = true;
			ret.msg = '<b>' + translate('Building') + ':</b> ' + translate(buildingType) + '  (' + (buildingLevel + 1) + ') ';
		}
		else {
			ret.buildable = false;
			ret.msg = n + m;
		}
		
		return ret;
	},

	// Buildings are of two types. They use food, lumber, metal, stone and/or gold
	// Standard buildings, the most common, do not use gold
	// Calls getLowestBuildingLevel(), getBuildingCap(), actionLog()
	// returns an object containing a Boolean to allow/disallow building and a message
	checkGoldReqs : function(cityIdx, buildingType, defFood, defLumber, defMetal, defStone, defGold) {
		var t = Tabs.Jobs;        
		var buildingLevel = t.getLowestBuildingLevel(cityIdx, buildingType);
		var m = '';
		var n = 'L.' + (buildingLevel+1) + ' ' + translate('Required') + ':+ ';
		if (buildingLevel == 0)
		m += ' ' + buildingType;

		var food    = defFood * Math.pow(2,buildingLevel + 1);
		var lumber  = defLumber * Math.pow(2,buildingLevel + 1);
		var metal   = defMetal * Math.pow(2,buildingLevel + 1);
		var stone   = defStone * Math.pow(2,buildingLevel + 1);
		var gold    = defGold * Math.pow(2,buildingLevel + 1);
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.building[buildingType];
			food    = seedReqs.level[buildingLevel + 1].resources['food'];
			lumber  = seedReqs.level[buildingLevel + 1].resources['wood'];
			metal   = seedReqs.level[buildingLevel + 1].resources['ore'];
			stone   = seedReqs.level[buildingLevel + 1].resources['stone'];
			gold    = seedReqs.level[buildingLevel + 1].resources['gold'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {buildable:false, msg:[]};
		var buildCap = t.getBuildingCap(cityIdx, buildingType);
		
		// If the building is capped, are we about to exceed the limit?
		if (buildingLevel >= buildCap) m += translate('Capacity') +': '+ buildCap +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';

		if (m.length == 0) {
			ret.buildable = true;
			ret.msg = '<b>' + translate('Building') + ':</b> ' + translate(buildingType) + '  (' + (buildingLevel + 1) + ') ';
		}
		else {
			ret.buildable = false;
			ret.msg = n + m;
		}
		
		return ret;  
	},

	// Check building requirements
	// Calls checkStandardReqs() or checkGoldReqs()
	// returns an object containing a Boolean value to indicate whether or not building shoudl proceed
	// and a message
	checkBuildReqs : function(cityIdx, buildingType){
		var t = Tabs.Jobs;
		var reqs;
		
		var level = t.getLowestBuildingLevel(cityIdx, buildingType);
		var cap = t.getBuildingCap (cityIdx, buildingType);
		
		if (level < cap) {
		
			switch (buildingType) {
			case kHome:             reqs = t.checkStandardReqs(cityIdx, buildingType, 50, 300, 150, 200);break;
			case kGarrison:         reqs = t.checkStandardReqs(cityIdx, buildingType, 250, 1200, 500, 1500);break;
			case kScienceCenter:    reqs = t.checkStandardReqs(cityIdx, buildingType, 120, 1250, 200, 1500);break;
			case kMetalsmith:       reqs = t.checkStandardReqs(cityIdx, buildingType, 125, 1000, 1200, 600);break;
			case kOfficerQuarter:   reqs = t.checkStandardReqs(cityIdx, buildingType, 400, 2500, 700, 1200);break;
			case kMusterPoint:      reqs = t.checkStandardReqs(cityIdx, buildingType, 100, 600, 250, 2000);break;
			case kRookery:          reqs = t.checkGoldReqs(cityIdx, buildingType, 1200, 2000, 1000, 800, 800);break;
			case kStorageVault:     reqs = t.checkStandardReqs(cityIdx, buildingType, 100, 1500, 300, 1000);break;
			case kTheater:          reqs = t.checkStandardReqs(cityIdx, buildingType, 300, 2000, 400, 1000);break;
			case kSentinel:         reqs = t.checkStandardReqs(cityIdx, buildingType, 150, 1000, 300, 3000);break;
			case kFactory:          reqs = t.checkStandardReqs(cityIdx, buildingType, 150, 1500, 1500, 500);break;
			case kFortress:         reqs = t.checkStandardReqs(cityIdx, buildingType, 200, 300, 100, 2500);break;
			case kDragonKeep:       reqs = t.checkGoldReqs(cityIdx, buildingType, 400, 2500, 700, 1200, 1500);break;
			case kWall:             reqs = t.checkStandardReqs(cityIdx, buildingType, 3000, 1500, 500, 10000);break;
			case kMine:             reqs = t.checkStandardReqs(cityIdx, buildingType, 210, 600, 200, 500);break;
			case kFarm:             reqs = t.checkStandardReqs(cityIdx, buildingType, 50, 300, 150, 200);break;
			case kLumbermill:       reqs = t.checkStandardReqs(cityIdx, buildingType, 100, 100, 300, 250);break;
			case kQuarry:           reqs = t.checkStandardReqs(cityIdx, buildingType, 180, 500, 400, 150);break;
			case kTrainingCamp:     reqs = t.checkGoldReqs(cityIdx, buildingType, 350, 1300, 600, 1900, 975);break;
			case kSilo:             reqs = t.checkStandardReqs(cityIdx, buildingType, 250, 1200, 500, 1500);break;
			}
			
			if (reqs.buildable == false) {
				if (t.contentType == 2){
					try{
						$(UID['tabJobBuild_FB_' + cityIdx +'_'+ buildingType]).innerHTML ='<font color="#C33">'+ reqs.msg.replace(/:\+/,':').replace(/\+\s*$/,'') +'</font>';
						$(UID['tabJobBuild_FB_' + cityIdx +'_'+ buildingType]).title = translate(buildingType) + ' ' + reqs.msg.replace(/\+/g,' \n');
						$(UID['tabJobBuild_Cap_' + cityIdx +'_'+ buildingType]).style.color = "#C33";
					}catch(e){}
				}
			} else {
				if (t.contentType == 2){
					try{
						var fb_text = translate('Next level') + ' ' + translate('OK');
						$(UID['tabJobBuild_FB_' + cityIdx +'_'+ buildingType]).innerHTML = fb_text;
						$(UID['tabJobBuild_FB_' + cityIdx +'_'+ buildingType]).title = translate(buildingType) + ' \n' + fb_text;
					}catch(e){}
				}
			}
		
			
			
		
			return reqs;
		} else {
			if (t.contentType == 2){
				try{
					var fb_text = translate('Task Completed');
					$(UID['tabJobBuild_FB_'+ cityIdx +'_'+ buildingType]).innerHTML = '<font color=#0B0>'+ fb_text +'</font>';
					$(UID['tabJobBuild_FB_' + cityIdx +'_'+ buildingType]).title = translate(buildingType) + ' \n' + fb_text;
					$(UID['tabJobBuild_Cap_' + cityIdx +'_'+ buildingType]).style.color = "#5B5";
					
				}catch(e){}
			}
		}
		return false;
	},

	checkAgricultureReqs : function() {
		var t = Tabs.Jobs;
		var researchType = kAgriculture;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 500 * Math.pow(2,researchLevel +1);
		var food = 250 * Math.pow(2,researchLevel + 1);
		var metal = 100 * Math.pow(2,researchLevel + 1);
		var farmLevel = researchLevel + 1;
		var scienceCenterLevel = researchLevel;          
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			food = seedReqs.level[researchLevel + 1].resources['food'];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			metal = seedReqs.level[researchLevel + 1].resources['ore'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
			farmLevel = seedReqs.level[researchLevel + 1].buildings[kFarm];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m +=  translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (t.getBuildingLevel(0, kFarm, farmLevel) == 0) m += translate(kFarm) +': '+ farmLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret; 
	},

	checkWoodcraftReqs : function() {
		var t = Tabs.Jobs;
		var researchType = kWoodcraft;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 1200 * Math.pow(2,researchLevel +1);
		var lumber = 500 * Math.pow(2,researchLevel + 1);
		var metal = 100 * Math.pow(2,researchLevel + 1);
		var millLevel = researchLevel + 1;
		var scienceCenterLevel = researchLevel;          
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			lumber = seedReqs.level[researchLevel + 1].resources['wood'];
			metal = seedReqs.level[researchLevel + 1].resources['ore'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
			millLevel = seedReqs.level[researchLevel + 1].buildings[kLumbermill];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (t.getBuildingLevel(0, kLumbermill, millLevel) == 0) m += translate(kLumbermill) +': '+ millLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret; 
	},

	checkMasonryReqs : function() {
		var t = Tabs.Jobs;
		var researchType = kMasonry;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 1500 * Math.pow(2,researchLevel +1);
		var stone = 500 * Math.pow(2,researchLevel + 1);
		var metal = 200 * Math.pow(2,researchLevel + 1);
		var quarryLevel = researchLevel + 1;
		var scienceCenterLevel = researchLevel;          
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			stone = seedReqs.level[researchLevel + 1].resources['stone'];
			metal = seedReqs.level[researchLevel + 1].resources['ore'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
			quarryLevel = seedReqs.level[researchLevel + 1].buildings[kQuarry];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (t.getBuildingLevel(0, kQuarry, quarryLevel) == 0) m += translate(kQuarry) +': '+ quarryLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret;
	},

	checkMiningReqs : function() {
		var t = Tabs.Jobs;
		var researchType = kMining;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 2000 * Math.pow(2,researchLevel +1);
		var metal = 800 * Math.pow(2,researchLevel + 1);
		var mineLevel = researchLevel + 1;
		var scienceCenterLevel = researchLevel;          
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			metal = seedReqs.level[researchLevel + 1].resources['ore'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
			mineLevel = seedReqs.level[researchLevel + 1].buildings[kMine];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (t.getBuildingLevel(0, kMine, mineLevel) == 0) m += translate(kMine) +': '+ mineLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret;
	},

	checkClairvoyanceReqs : function() {
		var t = Tabs.Jobs;
		var researchType = kClairvoyance;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 2000 * Math.pow(2,researchLevel + 1);
		var food = 2400 * Math.pow(2,researchLevel + 1);
		var scienceCenterLevel = researchLevel;          
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			food = seedReqs.level[researchLevel + 1].resources['food'];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.gold < gold) m += translate('Wood') +': '+ (gold - city.resources.gold) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret; 
	},

	checkRapidDeploymentReqs : function() {
		var t = Tabs.Jobs;
		var researchType = kRapidDeployment;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 600 * Math.pow(2,researchLevel + 1);
		var food = 3000 * Math.pow(2,researchLevel + 1);
		var scienceCenterLevel = researchLevel;          
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			food = seedReqs.level[researchLevel + 1].resources['food'];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.gold < gold) m += translate('Wood') +': '+ (gold - city.resources.gold) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret; 
	},

	checkBallisticsReqs : function() {
		var t = Tabs.Jobs;
		var researchType = kBallistics;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 5000 * Math.pow(2,researchLevel +1);
		var stone = 500 * Math.pow(2,researchLevel + 1);
		var metal = 600 * Math.pow(2,researchLevel + 1);
		var lumber = 800 * Math.pow(2,researchLevel + 1);
		var woodcraftLevel = 4;
		var scienceCenterLevel = researchLevel;          
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			stone = seedReqs.level[researchLevel + 1].resources['stone'];
			metal = seedReqs.level[researchLevel + 1].resources['ore'];
			lumber = seedReqs.level[researchLevel + 1].resources['wood'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
			woodcraftLevel = seedReqs.level[researchLevel + 1].research[kWoodcraft];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (t.getCurrentResearchLevel(kWoodcraft) < woodcraftLevel) m += translate(kWoodcraft) +': '+ woodcraftLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret;
	},

	checkMetallurgyReqs : function() {
		// Mining, science center, metalsmith, garrison, metals, food, lumber, stone, gold
		var t = Tabs.Jobs;
		var researchType = kMetallurgy;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var food = 800 * Math.pow(2,researchLevel +1);
		var gold = 3500 * Math.pow(2,researchLevel +1);
		var stone = 200 * Math.pow(2,researchLevel + 1);
		var metal = 3000 * Math.pow(2,researchLevel + 1);
		var lumber = 150 * Math.pow(2,researchLevel + 1);
		var miningLevel = researchLevel;
		var scienceCenterLevel = researchLevel;  
		var metalsmithLevel = researchLevel;
		var garrisonLevel = 2;        
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			food = seedReqs.level[researchLevel + 1].resources['food'];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			stone = seedReqs.level[researchLevel + 1].resources['stone'];
			metal = seedReqs.level[researchLevel + 1].resources['ore'];
			lumber = seedReqs.level[researchLevel + 1].resources['wood'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
			metalsmithLevel = seedReqs.level[researchLevel + 1].buildings[kMetalsmith];
			garrisonLevel = seedReqs.level[researchLevel + 1].buildings[kGarrison];
			miningLevel = seedReqs.level[researchLevel + 1].research[kMining];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += translate(kMetalsmith) +': '+ metalsmithLevel +' + ';
		if (t.getBuildingLevel(0, kGarrison, garrisonLevel) == 0) m += translate(kGarrison) +': '+ garrisonLevel +' + ';
		if (t.getCurrentResearchLevel(kMining) < miningLevel) m += translate(kMining) +': '+ miningLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret;
	},

	checkMedicineReqs : function() {
		var t = Tabs.Jobs;
		var researchType = kMedicine;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 3600 * Math.pow(2,researchLevel +1);
		var food = 1500 * Math.pow(2,researchLevel + 1);
		var scienceCenterLevel = researchLevel;          
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			food = seedReqs.level[researchLevel + 1].resources['food'];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret; 
	},

	checkDragonryReqs : function() {
		// science center, rookery, gold, food, metals
		var t = Tabs.Jobs;
		var researchType = kDragonry;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 5000 * Math.pow(2,researchLevel +1);
		var food = 2500 * Math.pow(2,researchLevel + 1);
		var metal = 1000 * Math.pow(2,researchLevel + 1);
		var scienceCenterLevel = researchLevel; 
		var rookeryLevel = researchLevel;         
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			food = seedReqs.level[researchLevel + 1].resources['food'];
			metal = seedReqs.level[researchLevel + 1].resources['ore'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
			rookeryLevel = seedReqs.level[researchLevel + 1].buildings[kRookery];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (t.getBuildingLevel(0, kRookery, rookeryLevel) == 0) m += translate(kRookery) +': '+ rookeryLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret; 
	},

	checkLevitationReqs : function() {
		// woodcraft, science center, gold, lumber, metals
		var t = Tabs.Jobs;
		var researchType = kLevitation;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 5000 * Math.pow(2,researchLevel +1);
		var lumber = 2000 * Math.pow(2,researchLevel + 1);
		var metal = 2000 * Math.pow(2,researchLevel + 1);
		var scienceCenterLevel = researchLevel + 1; 
		var woodcraftLevel = researchLevel + 1;         
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			lumber = seedReqs.level[researchLevel + 1].resources['wood'];
			metal = seedReqs.level[researchLevel + 1].resources['ore'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
			woodcraftLevel = seedReqs.level[researchLevel + 1].research[kWoodcraft];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (t.getCurrentResearchLevel(kWoodcraft) < woodcraftLevel) m += translate(kWoodcraft) +': '+ woodcraftLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret; 
	},

	checkMercantilismReqs : function() {
		// levitation, science center, factory, gold, food, lumber, metals, stone
		var t = Tabs.Jobs;
		var researchType = kMercantilism;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 3500 * Math.pow(2,researchLevel +1);
		var food = 800 * Math.pow(2,researchLevel +1);
		var lumber = 150 * Math.pow(2,researchLevel + 1);
		var metal = 3000 * Math.pow(2,researchLevel + 1);
		var stone = 200 * Math.pow(2,researchLevel + 1);
		var scienceCenterLevel = researchLevel + 1; 
		var factoryLevel = researchLevel + 1; 
		var levitationLevel = researchLevel + 1;         
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			food = seedReqs.level[researchLevel + 1].resources['food'];
			lumber = seedReqs.level[researchLevel + 1].resources['wood'];
			metal = seedReqs.level[researchLevel + 1].resources['ore'];
			stone = seedReqs.level[researchLevel + 1].resources['stone'];
			scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings[kScienceCenter];
			factoryLevel = seedReqs.level[researchLevel + 1].buildings[kFactory];
			levitationLevel = seedReqs.level[researchLevel + 1].research[kLevitation];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) m += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) m += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) m += translate('Stone') +': '+ (metal - city.resources.stone) +' + ';
		if (t.getBuildingLevel(0, kScienceCenter, scienceCenterLevel) == 0) m += translate(kScienceCenter) +': '+ scienceCenterLevel +' + ';
		if (t.getBuildingLevel(0, kFactory, factoryLevel) == 0) m += translate(kFactory) +': '+ factoryLevel +' + ';
		if (t.getCurrentResearchLevel(kLevitation) < levitationLevel) m += translate(kLevitation) +': '+ levitationLevel +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}
		return ret;
	},

	checkAerialCombatReqs : function() {
		// dragonry, dragons keep, gold, food, dragon armor (items)
		var t = Tabs.Jobs;
		var researchType = kAerialCombat;
		var researchLevel = t.getCurrentResearchLevel(researchType);
		var gold = 3500 * Math.pow(2,researchLevel +1);
		var food = 2500 * Math.pow(2,researchLevel +1);
		var dragonkeepLevel = 8; 
		var dragonryLevel = 8;
		var bodyArmor = 1;
		var clawGuards = 1;
		var dragonHelmet = 1;
		var tailGuard = 1;
		// Check for all 4 pieces of dragon armor ...         
		var m = '';
		var n = 'L.' + (researchLevel+1) + ' ' + translate('Required') + ':+ ';
		var city    = Seed.cities[0];

		try {
			var seedReqs = Seed.requirements.research[researchType];
			gold = seedReqs.level[researchLevel + 1].resources['gold'];
			food = seedReqs.level[researchLevel + 1].resources['food'];
			dragonkeepLevel = seedReqs.level[researchLevel + 1].buildings[kDragonKeep];
			dragonryLevel = seedReqs.level[researchLevel + 1].research[kDragonry];
			bodyArmor = seedReqs.level[researchLevel + 1].items['GreatDragonBodyArmor'];
			clawGuards = seedReqs.level[researchLevel + 1].items['GreatDragonClawGuards'];
			dragonHelmet = seedReqs.level[researchLevel + 1].items['GreatDragonHelmet'];
			tailGuard = seedReqs.level[researchLevel + 1].items['GreatDragonTailGuard'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var researchCap = t.getResearchCap(researchType);
		
		// If the building is capped, are we about to exceed the limit?
		if (researchLevel >= researchCap) m += translate('Capacity') +': '+ researchCap +' + ';
		if (city.resources.gold < gold) m += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.food < food) m += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (t.getBuildingLevel(0, kDragonKeep, dragonkeepLevel) == 0) m += translate(kDragonKeep) +': '+ dragonkeepLevel +' + ';
		if (t.getCurrentResearchLevel(kDragonry) < dragonryLevel) m += translate(kDragonry) +': '+ dragonryLevel +' + ';
		if (t.getItem(kGDBodyArmor) == 0) m += translate(kGDBodyArmor) + ': ' + bodyArmor +' + ';
		if (t.getItem(kGDClawGuards) == 0) m += translate(kGDClawGuards) + ': ' + clawGuards +' + ';
		if (t.getItem(kGDHelmet) == 0) m += translate(kGDHelmet) + ': ' + dragonHelmet +' + ';
		if (t.getItem(kGDTailGuard) == 0) m += translate(kGDTailGuard) + ': ' + tailGuard +' + ';
		if (m.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(researchType) +' ('+ (researchLevel + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + m;
		}

		return ret;
	},

	checkResearchReqs : function (researchType){
		var t = Tabs.Jobs;
		var reqs;
		
		var level = t.getCurrentResearchLevel (researchType);
		var cap = t.getResearchCap (researchType);
		
		if (level < cap) {
			
			switch(researchType) {
				case kAgriculture:     reqs = t.checkAgricultureReqs(); break;
				case kWoodcraft:       reqs = t.checkWoodcraftReqs(); break;
				case kMasonry:         reqs = t.checkMasonryReqs(); break;
				case kMining:          reqs = t.checkMiningReqs(); break;
				case kClairvoyance:    reqs = t.checkClairvoyanceReqs(); break;
				case kRapidDeployment: reqs = t.checkRapidDeploymentReqs(); break;
				case kBallistics:      reqs = t.checkBallisticsReqs(); break;
				case kMetallurgy:      reqs = t.checkMetallurgyReqs(); break;
				case kMedicine:        reqs = t.checkMedicineReqs(); break;
				case kDragonry:        reqs = t.checkDragonryReqs(); break;
				case kLevitation:      reqs = t.checkLevitationReqs(); break;
				case kMercantilism:    reqs = t.checkMercantilismReqs(); break;
				case kAerialCombat:    reqs = t.checkAerialCombatReqs(); break;
			}

			if (reqs.researchable == false) {
				if (t.contentType == 3){
					try{
						$(UID['tabJobResearch_FB_'+researchType]).innerHTML = '<font color=#C33>' + reqs.msg.replace(/:\+/,':').replace(/\+\s*$/,'') + '</font>';
						$(UID['tabJobResearch_FB_'+researchType]).title = translate(researchType) + ' ' + reqs.msg.replace(/\+/g,' \n');
						$(UID['tabJobResearch_Sel_' + researchType]).style.color = "#C33";
					}catch(e){}
				}
			} else {
				if (t.contentType == 3){
					try{
						var fb_text = translate('Next level') + ' ' + translate('OK');
						$(UID['tabJobResearch_FB_'+researchType]).innerHTML = fb_text;
						$(UID['tabJobResearch_FB_'+researchType]).title = translate(researchType) + ' \n' + fb_text;
					}catch(e){}
				}
			}
			
			
			return reqs;
			
		} else {
			if (t.contentType == 3){
				try{
					var fb_text = translate('Task Completed');
					$(UID['tabJobResearch_FB_'+researchType]).innerHTML = '<font color=#0B0>'+ fb_text +'</font>';
					$(UID['tabJobResearch_FB_'+researchType]) = translate(researchType) + ' \n' + fb_text;
					$(UID['tabJobResearch_Sel_' + researchType]).style.color = "#5B5";
				}catch(e){}
			}
		}
		return false;

	},

	// The training heartbeat
	// Parameters:
	//      ic - the city number (0 = capitol, 1 = outpost 1, 2 = outpost 2
	//
	// Calls Seed.notifyOnUpdate() to find completed training jobs for the specified city
	// If the city number is the same as the number of cities, recurse with city number zero (the capitol)
	// This is weird, how would trainTick get called with ic = 3? If it does not, and ic really is 2, then 
	// there is a logic error: trainTick() should not recurse until it has finished calling () for
	// outpost 2
	// Also recurses (using setTimeout()) in three seconds if the call to getTrainJob() is not null. 
	// This happens if a training job already exists for the specified city. In this case, ic is incremented first.
	// Called from setTrainEnable() with a starting city of zero (capitol), attemptTrainShortQ() uses setTimeout() to call 
	// trainTick() in two different places. First, it uses it to prevent all the jobs from queueing immediately
	// but the logic is flawed on this because it calls loops calling getTrainJob(i) starting with the 
	// capitol city, but the loop ends prematurely if getTrainJob() finds an active job. In the second case, it 
	// uses setTimeout() to call trainTick() with the current city index if an one of the training jobs
	// does not meet the requirements. This will retry the job on the next tick (3 seconds).
	trainErrorCount : 0,
	trainDoRecheck  : false,
	trainTick : function (cityIdx){
		var t = Tabs.Jobs;

		if (!Data.options.autoTrain.enabled){
			return;
		}
		
		if (cityIdx == undefined){
		cityIdx = 0;	
		}
		
		//Seed.notifyOnUpdate(function(){ 
		if (cityIdx == Seed.cities.length){
			return;
		}

		// The length here is the number of troop types it is possible to train
		switch (cityIdx) {
			case 0: troopsLength = t.capitolTroops.length; break;
			case 1: troopsLength = t.outpost1Troops.length; break;
			case 2: troopsLength = t.outpost2Troops.length; break;
			case 3: troopsLength = t.outpost3Troops.length; break;
			case 4: troopsLength = t.outpost4Troops.length; break;
		}
		
		// Only check the job queue if we are in short queue mode
		if (t.selectedQ == 'min_housing'){
			if (getTrainJob (cityIdx) == null) {
				t.attemptTrainShortQ(cityIdx, 0, troopsLength);
			}
			else {
				cityIdx = cityIdx + 1;
			}
		}
		else {
			t.attemptTrainLongQ(cityIdx, 0, troopsLength);
		}
		//}); 
	},

	// New approach 07072011b
	// Calculate the completion time by examining the job record for any job running
	// While auto-build is enabled, this function is called on a 4 second timer
	// It resets the timer to 20 seconds if doBuild() has an error and fetches the Seed
	// to get updated information
	// It will turn off auto-build if the error count exceeds three
	buildErrorCount : 0,
	buildRetryTime	: 20000,
	doBuildRecheck  : false,
	buildTick : function (){
	
		var t = Tabs.Jobs;

		if (!Data.options.autoBuild.enabled){
			return;
		}
		
		// Iterate over the cities for buildings in each
		//Seed.notifyOnUpdate(function(){   
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++ ){
			var bJob = getBuildJob (cityIdx);
			var city = Seed.cities[cityIdx];
			var cityId = city.id;
			
			if (bJob == null){     // city not currently building
				
				// Yes, is there a job in persistent data in in this city?
				for (var i=0; i < Data.options.tJobs.length; i++) {
					if (Data.options.tJobs[i].city_id == cityId) {
						// We check three different modes of completion:
						// 1. the done flag
						// 2. the duration
						// 3. the run_at + duration compared to serverTime()
						if (Data.options.tJobs[i].done ||
							!Data.options.tJobs[i].duration ||
							Data.options.tJobs[i].run_at + Data.options.tJobs[i].duration > serverTime()
							){
								Data.options.tJobs.splice(i,1);
								Seed.fetchPlayer ();
								clearTimeout (Data.options.buildTimer);
								Data.options.buildTimer = setInterval (t.buildTick, 4000);
								return;
						}
					}
				}  
				
				// TBD: sort the array by building type and building level
				var buildOrder = []; // Concatenated array of buildings
				var buildList = [];
				for (var name in Data.options.autoBuild.buildingEnable[cityIdx]){
					// Is this building type enabled for autobuild?
					if (Data.options.autoBuild.buildingEnable[cityIdx][name]){
						buildList = Buildings.getList (cityIdx, name);
						buildList.sort (function(a,b){return a.level-b.level});
						buildOrder = buildOrder.concat (buildList);
					}
				}
				buildOrder.sort (function(a,b){return a.level-b.level});
				
				// Change: we want to iterate over each buildings comparing the level to the cap. If the cap has not
				// been reached, call doBuild
				var bBuilt = false;
				
				for (var i=0; i < buildOrder.length; i++) {

					var reqs = t.checkBuildReqs(cityIdx, buildOrder[i].type);
					if (reqs) {
						if (t.contentType == 2){
							t.dispFeedback (reqs.msg);
						}
						if (reqs.buildable) {
							t.doBuild (buildOrder[i], city);
							bBuilt = true;
							Data.options.tJobs.push(buildOrder[i]);
							break;
						}
						else {
							if (t.contentType == 2){
								t.dispFeedback (buildOrder[i].type +' '+ reqs.msg);
							}
							t.doBuildRecheck = true;
							//break;
						}
					}
				}
				//t.doBuildRecheck = true;
			}
			else {
				// We have a job running
				// Look at the job record
				if (bJob) {
					var jFound = false;
					// Look for the job in our persistent data
					for (var i=0; i < Data.options.tJobs.length; i++) {
						if (bJob.city_building_id == Data.options.tJobs[i].city_building_id) {
							jFound = true;
						}   
					}
					// If the job is not in persistent data, put it there
					if (!jFound) {
						Data.options.tJobs.push(bJob);
						verboseLog('Putting build job in persistent data');
					}
					else {
						// Keep a consistent display                
						// var cityType = (city.type == "Capital") ? 'Capital' : city.type;
						var bType = getBuildingById (cityIdx, bJob.city_building_id);
						var msg = translate('Building') + ': ' + translate(bType) + ' ' + translate('Level').toLowerCase() + ' ' + bJob.level +' '+ translate('at') + ' ' + translate(city.type);
						if (t.contentType == 2){
							t.dispFeedback (msg);
						}
					}
				}
			}
			if (t.doBuildRecheck) {
				Seed.fetchPlayer();
				t.doBuildRecheck = false;
				clearTimeout(Data.options.buildTimer);
				Data.options.buildTimer = setInterval (t.buildTick, t.buildRetryTime);
				if (t.contentType == 2){
					t.dispFeedback (translate('Completion errors') +': '+ translate('Waiting')+ ' '+ timeFormat(t.buildRetryTime/1000) +' '+ translate('to try again')); 
				}
				t.buildRetryTime *= 1.5;
				return;              
			}      
		}
		//}); 
	},

	// Research heartbeat
	resErrorCount : 0,
	resRetryTime : 20000,
	doResRecheck : false,
	researchTick : function (){

		var t = Tabs.Jobs;
		
		if (!Data.options.autoResearch.enabled){
			return;
		}
		
		//Seed.notifyOnUpdate(function(){
		var rJob = getResearchJob(0);
		var city = Seed.cities[0];
		var cityId = city.id;
		
		if (rJob == null){     // no research being done yet
			
			// Is there a research job in persistent data?
			for (var i=0; i < Data.options.rJobs.length; i++) {
				if (Data.options.rJobs[i]) {
					if (Data.options.rJobs[i].done ||
						!Data.options.rJobs[i].duration ||
						Data.options.rJobs[i].run_at + Data.options.rJobs[i].duration > serverTime()
						){
							// Yes, has the job completed?
							Data.options.rJobs.splice(i,1);
							Seed.fetchPlayer();
							clearTimeout (Data.options.researchTimer);
							Data.options.researchTimer = setInterval (t.researchTick, 5000);
							return;
					}
				}
			}
			
			for (var researchType in t.researchList) {
				if(Data.options.autoResearch.researchEnable[0][researchType]==undefined){
					continue;
					}
					
				//verboseLog(researchType+" = "+Data.options.autoResearch.researchEnable[0][researchType]);
				if (Data.options.autoResearch.researchEnable[0][researchType] == true){
					
					var level = t.getCurrentResearchLevel (researchType);
					var reqs = t.checkResearchReqs (researchType);
					
					var rBuilt = false;
					
					if (reqs) {
						if (reqs.researchable) {
							t.doResearch(researchType, level);
							rBuilt = true;
							Data.options.rJobs.push(rJob);
							break;
						} else {
							if (t.contentType == 3){
								t.dispFeedback (researchType +' '+ reqs.msg);
							}
							t.doResRecheck = true;
							//break;
						}
					}
				}
			}
			//t.doResRecheck = true;
		}
		else {
			// We have a job running
			// Look at the record
			if (rJob) {
				var jFound = false;
				// Look for the job in persistent data
				for (var i=0; i < Data.options.rJobs.length; i++) {
					// Check the rJob structure for a field called city_research_id or some such (like the building)
					// Otherwise, double-check that the ids match
					if (Data.options.rJobs[i] != undefined && Data.options.rJobs[i].id == rJob.id) {
						jFound = true;
					}
				}
				// If the job is not in persistent data, put it there
				if (!jFound) {
					Data.options.rJobs.push(rJob);
					verboseLog('Putting research job in persistent data');
				}
			}
		}
		if (t.doResRecheck) {
			Seed.fetchPlayer();
			t.doResRecheck = false;
			clearTimeout(Data.options.researchTimer);
			Data.options.researchTimer = setInterval (t.researchTick, t.resRetryTime);
			if (t.contentType == 3){
				t.dispFeedback (translate('Completion errors')+ ': '+ translate('Waiting') +' '+ timeFormat(t.resRetryTime/1000) +' '+ translate('to try again'));
			}
			t.resRetryTime *= 1.5;
		}
		//}); 
	},

	// Parameters: 
	//      ic - city index (0 = capitol, 1 = outpost 1, 2 = outpost 2)
	//      count - error count
	//      troopsLength - number of troops to be queued in this city
	// Called from trainTick() and doTrain()
	// trainTick() calls attemptTrainShortQ() when a city (ic) has no jobs in the queue
	// doTrain() calls attemptTrainShortQ() after making the Ajax call and getting a succesful result
	// doTrain() also calls Seed.fetchCity() (before calling attemptTrainShortQ()) to ensure that the data is current
	// attemptTrainShortQ() will examine the training queues to determine when/if a new job should be sent to doTrain()
	//
	// Short queue training (minimum housing model)
	//
	attemptTrainShortQ : function (ic, count, troopsLength){
		var t = Tabs.Jobs;
		
		// Attempt to train if no jobs are in the queue already for the specified city
		// If any city has a job, set the recheck flag and reset the timer
		// This ensures that we will check every city and only after rechecking all of them will
		// we reset the timer if doRecheck is true
		// Each city may have jobs and we now allow them to execute asynchronously
		var doRecheck = false;

		for (var i=0; i < Seed.cities.length; i++){
			if (getTrainJob (i)) {
				doRecheck = true;
			}
			else {
				// Get the troop types and quantities to build
				for (var j=0; j < Data.options.autoTrain.city[i].troopType.length; j++){
					var troopType = '', troopQty = 0, cap = 0;
					switch (i) {
					case 1:
						troopType = t.outpost1Troops[j];
						troopQty = Data.options.autoTrain.city[i].troopType[j];
						cap = t.getTroopCap(troopType, troopQty);
						try {
							if (cap) {
								troopQty = 0;
								if (t.contentType == 1){
									t.dispFeedback(translate('Troops Capped'));
								}
								$(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor = "red";
							}
							else if ($(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor == "red"){
								$(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor = "white";
							}
						}
						catch (e) {
						}
						break;
					case 2:
						troopType = t.outpost2Troops[j];
						troopQty = Data.options.autoTrain.city[i].troopType[j];
						cap = t.getTroopCap(troopType, troopQty);
						try {
							if (cap) {
								troopQty = 0;
								if (t.contentType == 1){
									t.dispFeedback(translate('Troops Capped'));
								}
								$(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor = "red";
							}
							else if ($(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor == "red"){
								$(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor = "white";
							}
						}
						catch (e) {
						}
						break;
					case 3:
						troopType = t.outpost3Troops[j];
						troopQty = Data.options.autoTrain.city[i].troopType[j];
						cap = t.getTroopCap(troopType, troopQty);
						try {
							if (cap) {
								troopQty = 0;
								if (t.contentType == 1){
									t.dispFeedback(translate('Troops Capped'));
								}
								$(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor = "red";
							}
							else if ($(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor == "red"){
								$(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor = "white";
							}
						}
						catch (e) {
						}
						break;
					case 4:
						troopType = t.outpost4Troops[j];
						troopQty = Data.options.autoTrain.city[i].troopType[j];
						cap = t.getTroopCap(troopType, troopQty);
						try {
							if (cap) {
								troopQty = 0;
								if (t.contentType == 1){
									t.dispFeedback(translate('Troops Capped'));
								}
								$(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor = "red";
							}
							else if ($(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor == "red"){
								$(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor = "white";
							}
						}
						catch (e) {
						}
						break;
					default:
						troopType = t.capitolTroops[j];
						troopQty = Data.options.autoTrain.city[i].troopType[j];
						cap = t.getTroopCap(troopType, troopQty);
						try {
							if (cap) {
								troopQty = 0;
								if (t.contentType == 1){
									t.dispFeedback(translate('Troops Capped'));
								}
								$(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor = "red";
							}
							else if ($(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor == "red"){
								$(UID['tabTrain_Troop_'+ i +'_'+ j]).style.backgroundColor = "white";
							}
						}
						catch (e) {
						}
						break;
					}
					if (troopQty > 0) {
						var ret = t.checkTrainReqs(troopType, troopQty, i, j, troopsLength);
						if (t.contentType == 1){
							t.dispFeedback (ret.msg);
						}
						if (ret.trainable) {
							t.doTrain(troopType, troopQty, i);
						}
						else {
							// Error condition prevents training, try again later
							doRecheck = true;
							break;
						}
					} 
				}
			}
		}
		if (doRecheck) {
			verboseLog('Tabs.Job.Train doRecheck');

			Seed.fetchPlayer();
			//Data.options.trainTimer = setTimeout (function() {t.trainTick(i)}, 20000);
		}		
	},

	// Parameters: 
	//      ic - city index (0 = capitol, 1 = outpost 1, 2 = outpost 2)
	//      count - error count
	//      troopsLength - number of troops to be queued in this city
	// Called from trainTick() and doTrain()
	// trainTick() calls attemptTrainLongtQ() when a city (ic) has no jobs in the queue
	// doTrain() calls attemptTrainLongtQ() after making the Ajax call and getting a succesful result
	// doTrain() also calls Seed.fetchCity() (before calling attemptTrainShortQ()) to ensure that the data is current
	//
	// Long queue training (minimum resource levels model)
	//
	attemptTrainLongQ : function (ic, count, troopsLength){
		var t = Tabs.Jobs;
		
		// Attempt to train if no jobs are in the queue already for the specified city
		// If any city has a job, set the recheck flag and reset the timer
		// This ensures that we will check every city and only after rechecking all of them will
		// we reset the timer if doRecheck is true
		// Each city may have jobs and we now allow them to execute asynchronously
		var doRecheck = false;
		
		for (var cityIdx=0; cityIdx<Seed.cities.length; cityIdx++){
			// Get the troop types and quantities to build
			for (var j=0; j < Data.options.autoTrain.city[cityIdx].troopType.length; j++){
				var troopType = '';
				var troopQty = 0;
				var cap = null;
				switch (cityIdx) {
				case 1:
					troopType = t.outpost1Troops[j];
					troopQty = Data.options.autoTrain.city[cityIdx].troopType[j];
					cap = t.getTroopCap(troopType, troopQty);
					try {
						if (cap) {
							troopQty = 0;
							if (t.contentType == 1){
								t.dispFeedback(translate('Troops Capped'));
							}
							$(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor = "red";
						}
						else if ($(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor == "red"){
							$(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor = "white";
						}
					}
					catch (e) {
					}
					break;
				case 2:
					troopType = t.outpost2Troops[j];
					troopQty = Data.options.autoTrain.city[cityIdx].troopType[j];
					cap = t.getTroopCap(troopType, troopQty);
					try {
						if (cap) {
							troopQty = 0;
							if (t.contentType == 1){
								t.dispFeedback(translate('Troops Capped'));
							}
							$(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor = "red";
						}
						else if ($(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor == "red"){
							$(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor = "white";
						}
					}
					catch (e) {
					}
					break;
				case 3:
					troopType = t.outpost3Troops[j];
					troopQty = Data.options.autoTrain.city[cityIdx].troopType[j];
					cap = t.getTroopCap(troopType, troopQty);
					try {
						if (cap) {
							troopQty = 0;
							if (t.contentType == 1){
								t.dispFeedback(translate('Troops Capped'));
							}
							$(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor = "red";
						}
						else if ($(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor == "red"){
							$(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor = "white";
						}
					}
					catch (e) {
					}
					break;
				case 4:
					troopType = t.outpost4Troops[j];
					troopQty = Data.options.autoTrain.city[cityIdx].troopType[j];
					cap = t.getTroopCap(troopType, troopQty);
					try {
						if (cap) {
							troopQty = 0;
							if (t.contentType == 1){
								t.dispFeedback(translate('Troops Capped'));
							}
							$(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor = "red";
						}
						else if ($(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor == "red"){
							$(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor = "white";
						}
					}
					catch (e) {
					}
					break;
				default:
					troopType = t.capitolTroops[j];
					troopQty = Data.options.autoTrain.city[cityIdx].troopType[j];
					cap = t.getTroopCap(troopType, troopQty);
					try {
						if (cap) {
							troopQty = 0;
							if (t.contentType == 1){
								t.dispFeedback(translate('Troops Capped'));
							}
							$(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor = "red";
						}
						else if ($(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor == "red"){
							$(UID['tabTrain_Troop_'+ cityIdx +'_'+ j]).style.backgroundColor = "white";
						}
					}
					catch (e) {
					}
					break;
				}
				if (troopQty > 0) {
					var ret = t.checkTrainReqs(troopType, troopQty, cityIdx, j, troopsLength);
					if (t.contentType == 1){
						t.dispFeedback (ret.msg);
					}
					if (ret.trainable) {
						var d = {tType:troopType, tQty:troopQty, cityIdx:cityIdx, troopIdx:j, tLen:troopsLength};
						t.trainJobs.push (d);
						//t.trainTime = setTimeout ("t.doTrain(troopType, troopQty, cityIdx, j, troopsLength)", 3000);
					}
					else {
						// Error condition prevents training, try again later
						doRecheck = true;
						break;
					}
				} 
			}
		}
		if (doRecheck) {
			// Data.options.trainTimer = setTimeout (function() {t.trainTick(cityIdx)}, 3000);
		}
		// See if we have space in the queue before we try to run the jobs
		var qLen = 0;
		for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++) {
			qLen += t.getRemainingQueue(cityIdx, 'units');
		}
		if (qLen){
			t.runJobs();
		}
	},

	// Algorithm change
	// Examine the training queue for the city, if there is space, run the job
	// Possible side effects are implied prioritization based on queue availability
	// and speed of training
	runJobs : function(){
		var t = Tabs.Jobs;
		if (t.trainJobs.length > 0) {
			
			// Create a set of training jobs in each city
			for (var cityIdx=0; cityIdx < Seed.cities.length; cityIdx++){
				var jList = []; // list of troops for this city
				
				// Iterate the training list looking for all the troops from this city
				// Could be none up to every troop type available
				// Might be a problem if the user selects all the troops but doesn't have
				// enough garrisons/training camps to do them all at once
				var j=0;
				while (j < t.trainJobs.length) {
					if (t.trainJobs[j].cityIdx == cityIdx){
						jList[j] = t.trainJobs[j];
					}
					++j;
				}

				// Get the remaining queue length for this city        
				var qLen = t.getRemainingQueue(cityIdx, 'units');
				
				// Are there enough queue slots for the jobs?
				var len = jList.length; // length is modified inside the loop
				if (qLen >= len){
					// Yes, do the job
					for (var j=0; j < len; j++) {
						var tJob = jList.shift();
						t.doTrain (tJob.tType, tJob.tQty, cityIdx);                   
					}
				}
				// Remove this city's job set from the training list
				t.trainJobs.splice(0, len);
			}
			
			setTimeout( "t.runJobs()", 3000);
		}
	},

	// Queue the training job
	// Parameters:
	//      troopType - Porter, Conscript, etc.
	//      troopQty - number of troops to train
	//      ic - city index (0=capitol, 1=outpost 1, 2 = outpost 2)
	//      count - error count
	//      troopsLength - number of troop types
	// Calls MyAjax.troopTraining with city troop type, qty, city id, and a function for the rslt
	// The rlst function fetches the city, does a status update through statTick
	// If the rslt is ok, we set the Train Tab errorCount back to zero, log the training, increment the count (why?)
	// and attempt to train more troops - this seems like it should come from trainTick() instead being called directly here
	// If the rslt is not ok, we refetch the city info, log the error, increment the Train Tab errorCount (if we have more than
	// three errors we disable training and show the feedback) and display the error message, reset the training time for 20 seconds
	// but do not disable training
	doTrain : function (troopType, troopQty, ic){
		var t = Tabs.Jobs;
		var city = Seed.cities[ic];
		var msg = translate('Training') + ': (' + troopQty +') '+ translate(troopType) +' '+ translate('at') +' '+ city.type;
		//t.dispFeedback (msg);

		MyAjax.troopTraining (troopType, troopQty, city.id, function (r){
			if (r.ok){
				t.trainErrorCount = 0;
				
				actionLog (msg);

				Data.options.trainTimer = setInterval(function() {t.trainTick(0) }, 3000);
			} 
			else {
				//Seed.fetchPlayer();
				verboseLog ('Error: Training: ' + r.errmsg);
				
				actionLog (translate('Error')+' '+translate('Training') + ': ' + r.errmsg);

				// The queue is frequently full, but we could be getting server errors (500) too
				// Wait a couple of minutes
				if (++t.trainErrorCount > 5){
					if (t.contentType == 1){
						t.dispFeedback (translate('Too many errors, disabling auto training'));
					}
					t.setTrainEnable (false);
					t.trainErrorCount = 0;
				}
				else {
					if (t.contentType == 1){
						t.dispFeedback (translate('Error')+' '+translate('Training') +': '+ r.errmsg);
					}
					Data.options.trainTimer = setInterval(function() {t.trainTick(ic) }, 180000);
				}
			}
			// Get the troops being built so the will be displayed
			Seed.fetchCity (city.id);
		});
	},

	// Upgrade the building
	// Sets doBuildRecheck = true if the MyAjax call returns an error
	// This forces a Seed fetch and resets the buildTick timer to 20 seconds
	// to allow the server enough time to return valid data (we hope)
	// If the MyAjax call returns with no errors, the buildErrorCount is reset to zero
	doBuild : function (building, city){
		var t = Tabs.Jobs;
		//var cityType = (city.type == "Capital") ? 'Capital' : city.type;
		var msg = translate('Building')+ ': ' + translate(building.type) +' '+ translate('Level').toLowerCase() + ' ' + (building.level+1) +' '+ translate('at') +' '+ translate(city.type);
		
		if (t.contentType == 2){
			t.dispFeedback (msg);
		}
		
		MyAjax.buildingUpgrade (city.id, building.id, function (r){
			//logit ('BUILD RESULT: '+ inspect (r, 7, 1)); 
			if (r.ok){
				t.buildErrorCount = 0;
				actionLog (msg);
				//Data.options.buildTimer = setTimeout (t.buildTick, 8000);
				return;
			} 
			else {
				Seed.fetchPlayer();
				actionLog (building.type + ': ' + r.errmsg);
				if (++t.buildErrorCount > 3){
					if (t.contentType == 2){
						t.dispFeedback (translate('Too many errors, disabling auto-build'));
					}
					t.setBuildEnable (false);
					t.buildErrorCount = 0;
					return;
				}
				if (t.contentType == 2){
					t.dispFeedback (building.type + ': ' + r.errmsg);
				}
				//Data.options.buildTimer = setTimeout (t.buildTick, 20000);
				t.doBuildRecheck = true;
				return;
			}
		});
	},

	doResearch : function (researchType, researchLevel){
		var t = Tabs.Jobs;
		var city = Seed.cities[0];
		var msg = '<b>' + translate('Researching') +': </b> '+ translate(t.resUITranslate(researchType)) + ' ('+ (researchLevel+1) +') ';
		if (t.contentType == 3){
			t.dispFeedback (msg);
		}

		actionLog(translate('Research Started')+': '+ translate(t.resUITranslate(researchType)) + ' ('+ (researchLevel+1) +') ');
		
		MyAjax.researchStart (city.id, researchType, function (r){
			//logit ('RESEARCH RESULT: '+ inspect (r, 7, 1));       
			if (r.ok){
				t.resErrorCount = 0;
				actionLog (msg);
				return;
			} 
			else {
				Seed.fetchPlayer();
				actionLog (translate('Research Error').toUpperCase()+ ': ' + r.errmsg);
				if (++t.resErrorCount > 3){
					if (t.contentType == 3){
						t.dispFeedback (translate('Too many errors, disabling auto-research'));
					}
					t.setResearchEnable (false);
					t.resErrorCount = 0;
					return;
				}
				if (t.contentType == 3){
					t.dispFeedback (translate('RESEARCH ERROR')+ ': ' + r.errmsg);
				}
				t.doResRecheck = true;
				return;
			}
		});
	}

	
}
/***********************************   End Jobs  ***********************************/

/********************************************************************************
* Options Tab                                                                  *
* - Enable window drag                                                         *
* - Enable collection of resources from Outposts every 1-99 seconds, minutes,  *
*   hours or days                                                              *
* - Verbose logging                                                     *
********************************************************************************/
Tabs.Options = {
	tabOrder	: OPTIONS_TAB_ORDER,
	tabLabel	: 'Options',
	tabDisabled	: !OPTIONS_TAB_ENABLE,
	container	: null,

	init : function (div) {
		var t = Tabs.Options;
		t.container = div;

		var sel_Unit = ['','','',''], sel_AutoRefresh = ['','','',''];
		
		switch (Data.options.autoCollect.unit) {
			case 1:
				sel_Unit[0] = 'selected';
				break
			case 60:
				sel_Unit[1] = 'selected';
				break;
			case 3600:
				sel_Unit[2] = 'selected';
				break;
			case 86400:
				sel_Unit[3] = 'selected';
				break;
			default:
				sel_Unit[2] = 'selected';
		}

		switch (Data.options.autoRefresh.delay) {
			case 10: case '10':
				sel_AutoRefresh[0] = 'selected';
				break
			case 15: case '15':
				sel_AutoRefresh[1] = 'selected';
				break;
			case 20: case '20':
				sel_AutoRefresh[2] = 'selected';
				break;
			case 25: case '25':
				sel_AutoRefresh[3] = 'selected';
				break;
			default:
				sel_AutoRefresh[0] = 'selected';
		}

		try {      
			m = '<div class=' + UID['title'] + ' style="margin-bottom:10px">'+ translate('Options') +'</div>'
			+'<table>'
			+'	<tr valign=top>'
			+'		<td><b>' + translate('Game Options') + ': </b></td>'
			+'	</tr>'
			+'	<tr valign=top>'
			+'		<td>'
			+'		<label>'
			+'		<input id=' + setUID('tabOptions_Collect') + ' type=checkbox /> ' + translate('Auto-Collection of Resources')
			+'		</label> '
			+'		<input id=' + setUID('tabOptions_collectTime') + ' size=1 maxlength=2 type=text value="' + Data.options.autoCollect.delay + '" />'
			+'		<select id=' + setUID('tabOptions_collectUnit') + ' size=1>'
			+'			<option value=1 ' + sel_Unit[0] + '>' + translate('Seconds') + '</option>'
			+'			<option value=60 ' + sel_Unit[1] + '>' + translate('Minutes') + '</option>'
			+'			<option value=3600 ' + sel_Unit[2] + '>' + translate('Hours') + '</option>'
			+'			<option value=86400 ' + sel_Unit[3] + '>' + translate('Days') + '</option>'
			+'		</select>'
			+'	</td>'
			+'</tr>'
			+'</table>'
			+'<br><HR>'
			+'<table>'
			+'	<tr valign=top>'
			+'		<td><b>' + translate('Script Options') + ': </b></td>'
			+'	</tr><tr valign=top>'
			+'		<td>'
			+'		<label><input id=' + setUID('tabOptions_Drag') + ' type=checkbox /> ' + translate('Enable') +' '+ translate('Window drag') + '</label>'
			+'		</td>'
			+'	</tr><tr valign=top>'
			+'		<td>'
			+'		<label><input id=' + setUID('tabOptions_Verbose') + ' type=checkbox /> ' + translate('Enable') +' '+ translate('Verbose logging') + '</label>'
			+'		</td>'
			+'	</tr>'
			+'	<tr valign=top>'
			+'		<td>'
			+'		<label><input id=' + setUID('tabOptions_AutoRefresh') + ' type=checkbox /> ' + translate('Enable') +' '+ translate('Auto Refresh every') + '</label>'
			+'		<select id=' + setUID('tabOptions_AutoRefreshDelay') + ' size=1>'
			+'			<option value=10 ' + sel_AutoRefresh[0] + '>10</option>'
			+'			<option value=15 ' + sel_AutoRefresh[1] + '>15</option>'
			+'			<option value=20 ' + sel_AutoRefresh[2] + '>20</option>'
			+'			<option value=25 ' + sel_AutoRefresh[3] + '>25</option>'
			+'		</select> ' + translate('Minutes') + ' ' + translate('of inactivity')
			+'		</td>'
			+'	</tr>'
			+'	<tr valign=top>'
			+'		<td><br>'
			+'		<label>' + translate('Delete') + ' ' + translate('Permanent Data') + ': <input id=' + setUID('tabOptions_btnClearStorage') + ' type=button value="' + translate('Delete') + '" /></label>'
			+'		</td>'
			+'	</tr>'
			+'</table>'
			+'<br><HR>'
			+'<table>'
			+'	<tr valign=top>'
			+'		<td>'
			+'		<label><input id=' + setUID('tabOptions_btnRefresh') + ' type=button value="' + translate('Refresh') + '" /></label>'
			+'		</td>'
			+'	</tr>'
			+'</table>'
			+'<br><HR>';
			
			t.container.innerHTML = m;
			
			t.checkboxChange(UID['tabOptions_Collect'], Data.options.autoCollect.enabled, AutoCollect.setEnable);
			
			$(UID['tabOptions_collectTime']).addEventListener ('change', onChangeTime, false);
			$(UID['tabOptions_collectUnit']).addEventListener ('change', onChangeUnit, false);
			
			t.checkboxChange(UID['tabOptions_Drag'], Data.options.mainPopup.drag, onChangeDrag);
			t.checkboxChange(UID['tabOptions_Verbose'], Data.options.verboseLog.enabled, VerboseLog.setEnable);
			
			t.checkboxChange(UID['tabOptions_AutoRefresh'], Data.options.autoRefresh.enabled, AutoRefresh.setEnable);
			
			$(UID['tabOptions_AutoRefreshDelay']).addEventListener ('change', onChangeRefreshDelay, false);
			
			$(UID['tabOptions_btnClearStorage']).addEventListener ('click', onClickClearStorage, false);
			
			$(UID['tabOptions_btnRefresh']).addEventListener ('click', onClickRefreshData, false);
			
		} catch (e) {
			t.container.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
		}
		
		
		function onChangeTime (e) {
			Data.options.autoCollect.delay = parseIntZero($(UID['tabOptions_collectTime']).value);
		}

		function onChangeUnit (e) {
			Data.options.autoCollect.unit = parseIntZero($(UID['tabOptions_collectUnit']).value);
		}
		
		function onChangeRefreshDelay (e) {
			AutoRefresh.setDelay(parseIntZero($(UID['tabOptions_AutoRefreshDelay']).value));
		}
		
		function onChangeDrag (state) {
			Data.options.mainPopup.drag = state;
			mainPopup.setDraggable(state);
		}
		
		function onClickClearStorage () {
			function onContinue () {
				Data.clearStorage();
				var dialog = (new ModalDialog (t.container, 300, 150, '', true, null)).getContentDiv();
				dialog.innerHTML = translate('Permanent Data') + ' ' + translate('deleted');
			}
			
			dialogConfirm (translate('Delete') + ' ' + translate('Permanent Data'), translate('Are you sure you want to') +' '+ translate('delete') +' '+ translate('Permanent Data') + '?', onContinue);
		}
		
		function onClickRefreshData () {
			var t = Tabs.Options;
			Seed.fetchPlayer();  
		}
		
	}, 

	hide : function () {
	},

	show : function () {
		
	},
	
	checkboxChange : function (checkboxId, optionVar, callEnable, callIsAvailable) {
		var t = Tabs.Options;
		var checkbox = $(checkboxId);
		if (callIsAvailable && callIsAvailable() == false) {
			checkbox.disabled = true;
			return;
		}
		if (optionVar){
			checkbox.checked = true;
		}
		checkbox.addEventListener ('change', new eventToggle(checkboxId, optionVar, callEnable).handler, false);
		function eventToggle(checkboxId, optionVar, callOnChange) {
			this.handler = handler;
			var optVar = optionVar;
			var callback = callOnChange;
			function handler(event) {
				optVar = this.checked;
				if (callback != null){
					callback(this.checked);
				}
			}
		}
	},
	
	
}


//*********************************** Log Tab ***********************************
Tabs.Log = {
	tabOrder	: LOG_TAB_ORDER,
	tabLabel	: 'Logs',
	tabDisabled	: !LOG_TAB_ENABLE,
	lastSubTab	: 'tabLogActions',
	container	: null,
	content		: [],
	title		: null,
	maxEntries	: 1000,
	state		: 0,
	
	init : function (div){
		var t = Tabs.Log;
		t.container = div;
		var m = ''
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id='+ setUID('tabLogActions') +'>'+ translate('Actions') +'</a></li>'
		+'	<li class=tab><a id='+ setUID('tabLogConsole') +'>'+ translate('Console') +'</a></li>'
		+'</ul>'
		+'<div id='+ setUID('tabLog_Title') +' class=' + UID['title'] + '>'+translate('Action Log')+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto;">'
		+'	<table id='+ setUID('tabLog_ContAction') +' class='+UID['table_console']+' cellspacing=1>'
		+'	<tr>'
		+'		<td class=' + UID['underline'] + '></td>'
		+'		<td class=' + UID['underline'] + ' width=95%></td>'
		+'	<tr>'
		+'	</table>'
		+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto;">'
		+'	<table id='+ setUID('tabLog_ContConsole') +' class='+UID['table_console']+' cellspacing=1>'
		+'	<tr>'
		+'		<td class=' + UID['underline'] + '></td>'
		+'		<td class=' + UID['underline'] + ' width=95%></td>'
		+'	<tr>'
		+'	</table>'
		+'</div>';
		
		div.innerHTML = m;
		
		t.content.push($(UID['tabLog_ContAction']));
		$(UID['tabLogActions']).addEventListener ('click', t.tabLogActions, false);
		
		t.content.push($(UID['tabLog_ContConsole']));
		$(UID['tabLogConsole']).addEventListener ('click', t.tabLogConsole, false);
		
		if (Data.options.verboseLog.enabled == false){
			$(UID['tabLogConsole']).style.display = t.content[1].parentNode.style.display = 'none';
		}
		
		t.title = $(UID['tabLog_Title']);
				
		
		t.state = 1;
		
		for (var i=0; i < Data._log.length; i++)
		{
			var log = Data._log[i];
			for (var j=0; j < log.length; j++)
			{
				t._addRow(log[j].msg, log[j].ts, i);
			}
		}
		
		t.tabLogActions();
		
	},

	tabLogActions : function (){
		var t = Tabs.Log;

		$(UID[t.lastSubTab]).className='';
		$(UID[t.lastSubTab]).style.zIndex=0;
		$(UID['tabLogActions']).className='selected';
		$(UID['tabLogActions']).style.zIndex=1;
		t.lastSubTab = 'tabLogActions';

		t.content[0].parentNode.style.display = 'block';
		t.content[1].parentNode.style.display = 'none';
		
		t.title.innerHTML = translate('Action Log');

	},

	tabLogConsole : function (){
		var t = Tabs.Log;
		
		$(UID[t.lastSubTab]).className='';
		$(UID[t.lastSubTab]).style.zIndex=0;
		$(UID['tabLogConsole']).className='selected';
		$(UID['tabLogConsole']).style.zIndex=1;
		t.lastSubTab = 'tabLogConsole';
		
		t.content[1].parentNode.style.display = 'block';
		t.content[0].parentNode.style.display = 'none';
		
		t.title.innerHTML = translate('Console Log');
	},

	hide : function (){
	},

	show : function (){
	},

	_addRow : function (msg, ts, to){
		var t = Tabs.Log;
		var n = to ? to : 0;
		
		if (t.state != 1) {
			return;
		}
		
		if (t.content[n].rows.length > t.maxEntries) {
			t.content[n].deleteRow(t.maxEntries-1);
		}
		
		var row = t.content[n].insertRow(0);
		// row.vAlign = 'top';
		var ts_cell = row.insertCell(0);
		var msg_cell = row.insertCell(1);
		
		ts_cell.className = 'jewel';
		ts_cell.innerHTML = '(&nbsp;'+ ts +'&nbsp;)&nbsp;';
		
		msg_cell.innerHTML = msg;
		msg_cell.style.whiteSpace = 'normal';
	}, 

	addMsg : function (msg, to){
		if (Tabs.Log.tabDisabled){
			return;
		}

		var t = Tabs.Log;
		var n = to ? to : 0;
		var ts = new Date().toTimeString().substring (0,8);

		t._addRow (msg, ts, to);

		while (Data._log[n].length > t.maxEntries){
			Data._log[n].shift();
		}
		Data._log[n].push ({msg:msg, ts:ts});

	}
}

function actionLog(msg) {
	Tabs.Log.addMsg(msg, 0);
}

function verboseLog(msg) {
	if (Data.options.verboseLog.enabled){
		Tabs.Log.addMsg(msg, 1);
	}
}
// END Tabs.Log


//******************************** DEBUG Tab *****************************
// No need to translate the DEBUG tab
Tabs.Debug = {
	tabOrder    : DEBUG_TAB_ORDER,
	tabLabel    : 'Debug',
	tabDisabled : !DEBUG_TAB_ENABLE,
	container   : null,

	init : function (div){
		var t = Tabs.Debug;
		t.container = div;
		t.mouseElement = div;
		var m = ''
			+ '<textarea id="'+setUID('tabsDebug_TA_Unescape')+'" row=3 cols=50></textarea>'
			+ '<input type=button value="unescape" id="'+setUID('tabsDebug_BTN_Unescape')+'" />'
			+ '<br><br>'
			+ '<input type=button value="Seed.Player" id="'+setUID('tabsDebug_BTN_SeedPlayer')+'" /> <br><br>'
			+ '<input type=button value="Seed.Jobs.city" id="'+setUID('tabsDebug_BTN_SeedJobCity')+'" /><br><br>'
			+ '<input type=button value="Seed.Marches" id="'+setUID('tabsDebug_BTN_SeedMarches')+'" /><br><br>'
			+ '<input type=button value="Seed.Buildings" id="'+setUID('tabsDebug_BTN_SeedBuildings')+'" /><br><br>'
			+ '<input type=button value="Clear MAP data" id="'+setUID('tabsDebug_BTN_ClearMap')+'" /><br><br>'
			+ '<input type=button value="All Terrains.last to null" id="'+setUID('tabsDebug_BTN_LastNull')+'" /><br><br>'
			+ '<input type=button value="Check reports" id="'+setUID('tabsDebug_BTN_Reports')+'" /><br><br>'
			+ '<input type=button value="Persistant Data" id="'+setUID('tabsDebug_BTN_Data')+'" /><br><br>'
			+ '<input type=button value="Scripts" id="'+setUID('tabsDebug_BTN_Scripts')+'" /><br><br>'
			+ '<br>Missing Reports:<span id="'+setUID('tabsDebug_MissRep')+'"></span> &nbsp; <input id="'+setUID('tabsDebug_BTN_Reset')+'" type=button value="RESET" />';
		
		div.innerHTML = m;
		
		$(UID['tabsDebug_BTN_Unescape']).addEventListener ('click', t.unescape, false);
		$(UID['tabsDebug_BTN_SeedPlayer']).addEventListener ('click', t.seedPlayer, false);
		$(UID['tabsDebug_BTN_SeedJobCity']).addEventListener ('click', t.seedJobsCity, false);
		$(UID['tabsDebug_BTN_SeedMarches']).addEventListener ('click', t.seedMarches, false);
		$(UID['tabsDebug_BTN_SeedBuildings']).addEventListener ('click', t.seedBuildings, false);
		$(UID['tabsDebug_BTN_LastNull']).addEventListener ('click', t.setLastNull, false);
		$(UID['tabsDebug_BTN_ClearMap']).addEventListener ('click', t.clearMap, false);
		$(UID['tabsDebug_BTN_Reports']).addEventListener ('click', t.readReports, false);
		$(UID['tabsDebug_BTN_Scripts']).addEventListener ('click', t.dispScripts, false);
		$(UID['tabsDebug_BTN_Data']).addEventListener ('click', t.dispData, false);
		$(UID['tabsDebug_BTN_Reset']).addEventListener ('click', function(){
			Data.options.messages.missing=0; 
			t.showMissingReports()
		}, false);

		t.showMissingReports ();
	},

	show : function (){
		
	},
	hide : function (){
	},
	
	unescape : function (div){
		var t = Tabs.Debug;
		var e = $(UID['tabsDebug_TA_Unescape']);
		e.value = unescape (e.value);
	},
	
	seedBuildings : function (){
		var t = Tabs.Debug;
		t.dispBuildings ('Seed.cities.capital.buildings', Seed.cities[0].buildings);
		t.dispBuildings ('Seed.cities.outpost.buildings', Seed.cities['outpost'].buildings);
	},

	dispScripts : function (){
		pop = new PopUp ('debug', 0,0, 1000,800, true); 
		pop.getTopDiv ().innerHTML = '<B><CENTER>Debug - List Scripts</center></b>' ;
		var scripts = document.getElementsByTagName('script');
		var m = '<DIV class=' + UID['content'] + ' style="height:560px; max-height:560px; overflow:auto">';
		for (var i=0; i<scripts.length; i++){
			var code = scripts[i].innerHTML;
			if (code == undefined)
			m += 'no code<BR>';
			else
			m += 'Source: '+ scripts[i].src +'<BR>Length: '+ code.length +'<BR>'+ code.substr(0,1000).escapeHTML() +'<BR><HR>';
		}
		pop.getMainDiv().innerHTML = '</div>'+ m;
		pop.show(true);
	},  
	
	dispBuildings : function (msg, buildings){
		var b = [];
		for (var i=0; i<buildings.length; i++)
		b.push (buildings[i]);
		b.sort (function (a,b){
			if (a.location != b.location){
				if (a.location == 'city')
				return -1;
				return 1;
			}
			return a.slot - b.slot;
		});
		var m = msg + ':\n';
		for (var i=0; i<b.length; i++)
			m += b[i].location +' slot #'+ b[i].slot +' : Level '+ b[i].level +' '+ b[i].type +'\n';
		logit (m);
	},

	showMissingReports : function (){
		var t = Tabs.Debug;
		$(UID['tabsDebug_MissRep']).innerHTML = Data.options.messages.missing;
		setTimeout (t.showMissingReports, 2000);
	},

	readReports : function (){
		Messages.checkMessages();
	},
	
	seedPlayer : function (){
		logit (inspect (Seed.player, 8, 1));
	},
	
	seedJobsCity : function (){
		var now = parseInt(serverTime());
		for (var c in Seed.jobs)
			logit ('Seed.jobs['+ c +'] (city #'+ Seed.cityIdx[c] +') now='+ now +':\n'+ inspect (Seed.jobs[c], 8, 1));
	},
	
	seedMarches : function (){
		var now = parseInt(serverTime());
		var msg = '***** Seed.marches: *****  (now='+ parseInt(serverTime())+')\n';
		for (var p in Seed.marches){
			var march = Seed.marches[p];
			var status = march.status;
			if (status == 'returning')
			status = 'returning ';
			msg += 'OWNER: '+  march.ownerId +' ID: '+ march.id +' '+ translate(status) +' '+ march.x +','+ march.y +' '+ march.run_at +'('+ (march.run_at-now)  +') '+ march.duration +'\n';
		}
		logit (msg);
	},

	dispData : function (){
		var m = '';
		for (var name in Data.itemsList){
			m += '***** Data.'+ Data.itemsList[name] +':\n'+ inspect (Data[Data.itemsList[name]], 12, 1);
		}
		logit (m);
	},
	
	clearMap : function (){
		Data.map = {
			terrains: {
				AnthropusCamp:[],
				Bog			:[],
				Forest		:[],
				Grassland	:[],
				Hill		:[],
				Lake		:[],
				Mountain	:[],
				Plain		:[],
				Fog			:[],
				City		:[],
				Outpost		:[],
				Wildernesses:[]
			},
			radius : 35,
			position: {
				x:Seed.cities[0].x, 
				y:Seed.cities[0].y
			},
			lastPos: {
				x:Seed.cities[0].x, 
				y:Seed.cities[0].y
			},
			targets: []
		};
	},
	
	setLastNull : function (){
		for (var type in Data.map.terrains) {
			for (var i=0; i<Data.map.terrains[type].length; i++) {
				(Data.map.terrains[type])[i].last = 0;
			}
		}
	},

} // END Tabs.Debug
//**********************************************************************************


setTimeout (scriptStartup, SCRIPT_STARTUP_DELAY);

}
























/*  Prototype JavaScript framework, version 1.7
 *  (c) 2005-2010 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/
// Form.Methods & Ajax Class NOT INCLUDED
 
// script.aculo.us scriptaculous.js v1.9.0, Thu Dec 23 16:54:48 -0500 2010

// Copyright (c) 2005-2010 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// For details, see the script.aculo.us web site: http://script.aculo.us/
 
var Sizzle;var sortOrder;var Event;var Prototype={Version:"1.7",Browser:(function(){var ua=navigator.userAgent;var isOpera=Object.prototype.toString.call(window.opera)=="[object Opera]";return{IE:!!window.attachEvent&&!isOpera,Opera:isOpera,WebKit:ua.indexOf("AppleWebKit/")>-1,Gecko:ua.indexOf("Gecko")>-1&&ua.indexOf("KHTML")===-1,MobileSafari:/Apple.*Mobile/.test(ua)}})(),BrowserFeatures:{XPath:!!document.evaluate,SelectorsAPI:!!document.querySelector,ElementExtensions:(function(){var constructor=window.Element||window.HTMLElement;return !!(constructor&&constructor.prototype)})(),SpecificElementExtensions:(function(){if(typeof window.HTMLDivElement!=="undefined"){return true}var div=document.createElement("div"),form=document.createElement("form"),isSupported=false;if(div.__proto__&&(div.__proto__!==form.__proto__)){isSupported=true}div=form=null;return isSupported})()},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(x){return x}};if(Prototype.Browser.MobileSafari){Prototype.BrowserFeatures.SpecificElementExtensions=false}var Abstract={};var Try={these:function(){var returnValue;for(var i=0,length=arguments.length;i<length;i++){var lambda=arguments[i];try{returnValue=lambda();break}catch(e){}}return returnValue}};var Class=(function(){var IS_DONTENUM_BUGGY=(function(){for(var p in {toString:1}){if(p==="toString"){return false}}return true})();function subclass(){}function create(){var parent=null,properties=$A(arguments);if(Object.isFunction(properties[0])){parent=properties.shift()}function klass(){this.initialize.apply(this,arguments)}Object.extend(klass,Class.Methods);klass.superclass=parent;klass.subclasses=[];if(parent){subclass.prototype=parent.prototype;klass.prototype=new subclass;parent.subclasses.push(klass)}for(var i=0,length=properties.length;i<length;i++){klass.addMethods(properties[i])}if(!klass.prototype.initialize){klass.prototype.initialize=Prototype.emptyFunction}klass.prototype.constructor=klass;return klass}function addMethods(source){var ancestor=this.superclass&&this.superclass.prototype,properties=Object.keys(source);if(IS_DONTENUM_BUGGY){if(source.toString!=Object.prototype.toString){properties.push("toString")}if(source.valueOf!=Object.prototype.valueOf){properties.push("valueOf")}}for(var i=0,length=properties.length;i<length;i++){var property=properties[i],value=source[property];if(ancestor&&Object.isFunction(value)&&value.argumentNames()[0]=="$super"){var method=value;value=(function(m){return function(){return ancestor[m].apply(this,arguments)}})(property).wrap(method);value.valueOf=method.valueOf.bind(method);value.toString=method.toString.bind(method)}this.prototype[property]=value}return this}return{create:create,Methods:{addMethods:addMethods}}})();(function(){var _toString=Object.prototype.toString,NULL_TYPE="Null",UNDEFINED_TYPE="Undefined",BOOLEAN_TYPE="Boolean",NUMBER_TYPE="Number",STRING_TYPE="String",OBJECT_TYPE="Object",FUNCTION_CLASS="[object Function]",BOOLEAN_CLASS="[object Boolean]",NUMBER_CLASS="[object Number]",STRING_CLASS="[object String]",ARRAY_CLASS="[object Array]",DATE_CLASS="[object Date]",NATIVE_JSON_STRINGIFY_SUPPORT=window.JSON&&typeof JSON.stringify==="function"&&JSON.stringify(0)==="0"&&typeof JSON.stringify(Prototype.K)==="undefined";function Type(o){switch(o){case null:return NULL_TYPE;case (void 0):return UNDEFINED_TYPE}var type=typeof o;switch(type){case"boolean":return BOOLEAN_TYPE;case"number":return NUMBER_TYPE;case"string":return STRING_TYPE}return OBJECT_TYPE}function extend(destination,source){for(var property in source){destination[property]=source[property]}return destination}function inspect(object){try{if(isUndefined(object)){return"undefined"}if(object==null){return"null"}return object.inspect?object.inspect():String(object)}catch(e){if(e instanceof RangeError){return"..."}throw e}}function toJSON(value){return Str("",{"":value},[])}function Str(key,holder,stack){var value=holder[key],type=typeof value;if(Type(value)===OBJECT_TYPE&&typeof value.toJSON==="function"){value=value.toJSON(key)}var _class=_toString.call(value);switch(_class){case NUMBER_CLASS:case BOOLEAN_CLASS:case STRING_CLASS:value=value.valueOf()}switch(value){case null:return"null";case true:return"true";case false:return"false"}type=typeof value;switch(type){case"string":return value.inspect(true);case"number":return isFinite(value)?String(value):"null";case"object":for(var i=0,length=stack.length;i<length;i++){if(stack[i]===value){throw new TypeError()}}stack.push(value);var partial=[];if(_class==ARRAY_CLASS){for(var i=0,length=value.length;i<length;i++){var str=Str(i,value,stack);partial.push(typeof str==="undefined"?"null":str)}partial="["+partial.join(",")+"]"}else{var keys=Object.keys(value);for(var i=0,length=keys.length;i<length;i++){var key=keys[i],str=Str(key,value,stack);if(typeof str!=="undefined"){partial.push(key.inspect(true)+":"+str)}}partial="{"+partial.join(",")+"}"}stack.pop();return partial}}function stringify(object){return JSON.stringify(object)}function toQueryString(object){return $H(object).toQueryString()}function toHTML(object){return object&&object.toHTML?object.toHTML():String.interpret(object)}function keys(object){if(Type(object)!==OBJECT_TYPE){throw new TypeError()}var results=[];for(var property in object){if(object.hasOwnProperty(property)){results.push(property)}}return results}function values(object){var results=[];for(var property in object){results.push(object[property])}return results}function clone(object){return extend({},object)}function isElement(object){return !!(object&&object.nodeType==1)}function isArray(object){return _toString.call(object)===ARRAY_CLASS}var hasNativeIsArray=(typeof Array.isArray=="function")&&Array.isArray([])&&!Array.isArray({});if(hasNativeIsArray){isArray=Array.isArray}function isHash(object){return object instanceof Hash}function isFunction(object){return _toString.call(object)===FUNCTION_CLASS}function isString(object){return _toString.call(object)===STRING_CLASS}function isNumber(object){return _toString.call(object)===NUMBER_CLASS}function isDate(object){return _toString.call(object)===DATE_CLASS}function isUndefined(object){return typeof object==="undefined"}extend(Object,{extend:extend,inspect:inspect,toJSON:NATIVE_JSON_STRINGIFY_SUPPORT?stringify:toJSON,toQueryString:toQueryString,toHTML:toHTML,keys:Object.keys||keys,values:values,clone:clone,isElement:isElement,isArray:isArray,isHash:isHash,isFunction:isFunction,isString:isString,isNumber:isNumber,isDate:isDate,isUndefined:isUndefined})})();Object.extend(Function.prototype,(function(){var slice=Array.prototype.slice;function update(array,args){var arrayLength=array.length,length=args.length;while(length--){array[arrayLength+length]=args[length]}return array}function merge(array,args){array=slice.call(array,0);return update(array,args)}function argumentNames(){var names=this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g,"").replace(/\s+/g,"").split(",");return names.length==1&&!names[0]?[]:names}function bind(context){if(arguments.length<2&&Object.isUndefined(arguments[0])){return this}var __method=this,args=slice.call(arguments,1);return function(){var a=merge(args,arguments);return __method.apply(context,a)}}function bindAsEventListener(context){var __method=this,args=slice.call(arguments,1);return function(event){var a=update([event||window.event],args);return __method.apply(context,a)}}function curry(){if(!arguments.length){return this}var __method=this,args=slice.call(arguments,0);return function(){var a=merge(args,arguments);return __method.apply(this,a)}}function delay(timeout){var __method=this,args=slice.call(arguments,1);timeout=timeout*1000;return window.setTimeout(function(){return __method.apply(__method,args)},timeout)}function defer(){var args=update([0.01],arguments);return this.delay.apply(this,args)}function wrap(wrapper){var __method=this;return function(){var a=update([__method.bind(this)],arguments);return wrapper.apply(this,a)}}function methodize(){if(this._methodized){return this._methodized}var __method=this;return this._methodized=function(){var a=update([this],arguments);return __method.apply(null,a)}}return{argumentNames:argumentNames,bind:bind,bindAsEventListener:bindAsEventListener,curry:curry,delay:delay,defer:defer,wrap:wrap,methodize:methodize}})());(function(proto){function toISOString(){return this.getUTCFullYear()+"-"+(this.getUTCMonth()+1).toPaddedString(2)+"-"+this.getUTCDate().toPaddedString(2)+"T"+this.getUTCHours().toPaddedString(2)+":"+this.getUTCMinutes().toPaddedString(2)+":"+this.getUTCSeconds().toPaddedString(2)+"Z"}function toJSON(){return this.toISOString()}if(!proto.toISOString){proto.toISOString=toISOString}if(!proto.toJSON){proto.toJSON=toJSON}})(Date.prototype);RegExp.prototype.match=RegExp.prototype.test;RegExp.escape=function(str){return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")};var PeriodicalExecuter=Class.create({initialize:function(callback,frequency){this.callback=callback;this.frequency=frequency;this.currentlyExecuting=false;this.registerCallback()},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000)},execute:function(){this.callback(this)},stop:function(){if(!this.timer){return}clearInterval(this.timer);this.timer=null},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;this.execute();this.currentlyExecuting=false}catch(e){this.currentlyExecuting=false;throw e}}}});Object.extend(String,{interpret:function(value){return value==null?"":String(value)},specialChar:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\\":"\\\\"}});Object.extend(String.prototype,(function(){var NATIVE_JSON_PARSE_SUPPORT=window.JSON&&typeof JSON.parse==="function"&&JSON.parse('{"test": true}').test;function prepareReplacement(replacement){if(Object.isFunction(replacement)){return replacement}var template=new Template(replacement);return function(match){return template.evaluate(match)}}function gsub(pattern,replacement){var result="",source=this,match;replacement=prepareReplacement(replacement);if(Object.isString(pattern)){pattern=RegExp.escape(pattern)}if(!(pattern.length||pattern.source)){replacement=replacement("");return replacement+source.split("").join(replacement)+replacement}while(source.length>0){if(match=source.match(pattern)){result+=source.slice(0,match.index);result+=String.interpret(replacement(match));source=source.slice(match.index+match[0].length)}else{result+=source,source=""}}return result}function sub(pattern,replacement,count){replacement=prepareReplacement(replacement);count=Object.isUndefined(count)?1:count;return this.gsub(pattern,function(match){if(--count<0){return match[0]}return replacement(match)})}function scan(pattern,iterator){this.gsub(pattern,iterator);return String(this)}function truncate(length,truncation){length=length||30;truncation=Object.isUndefined(truncation)?"...":truncation;return this.length>length?this.slice(0,length-truncation.length)+truncation:String(this)}function strip(){return this.replace(/^\s+/,"").replace(/\s+$/,"")}function stripTags(){return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,"")}function stripScripts(){return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"")}function extractScripts(){var matchAll=new RegExp(Prototype.ScriptFragment,"img"),matchOne=new RegExp(Prototype.ScriptFragment,"im");return(this.match(matchAll)||[]).map(function(scriptTag){return(scriptTag.match(matchOne)||["",""])[1]})}function evalScripts(){return this.extractScripts().map(function(script){return eval(script)})}function escapeHTML(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function unescapeHTML(){return this.stripTags().replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}function toQueryParams(separator){var match=this.strip().match(/([^?#]*)(#.*)?$/);if(!match){return{}}return match[1].split(separator||"&").inject({},function(hash,pair){if((pair=pair.split("="))[0]){var key=decodeURIComponent(pair.shift()),value=pair.length>1?pair.join("="):pair[0];if(value!=undefined){value=decodeURIComponent(value)}if(key in hash){if(!Object.isArray(hash[key])){hash[key]=[hash[key]]}hash[key].push(value)}else{hash[key]=value}}return hash})}function toArray(){return this.split("")}function succ(){return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1)}function times(count){return count<1?"":new Array(count+1).join(this)}function camelize(){return this.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():""})}function capitalize(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase()}function underscore(){return this.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/-/g,"_").toLowerCase()}function dasherize(){return this.replace(/_/g,"-")}function inspect(useDoubleQuotes){var escapedString=this.replace(/[\x00-\x1f\\]/g,function(character){if(character in String.specialChar){return String.specialChar[character]}return"\\u00"+character.charCodeAt().toPaddedString(2,16)});if(useDoubleQuotes){return'"'+escapedString.replace(/"/g,'\\"')+'"'}return"'"+escapedString.replace(/'/g,"\\'")+"'"}function unfilterJSON(filter){return this.replace(filter||Prototype.JSONFilter,"$1")}function isJSON(){var str=this;if(str.blank()){return false}str=str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@");str=str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]");str=str.replace(/(?:^|:|,)(?:\s*\[)+/g,"");return(/^[\],:{}\s]*$/).test(str)}function evalJSON(sanitize){var json=this.unfilterJSON(),cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;if(cx.test(json)){json=json.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}try{if(!sanitize||json.isJSON()){return eval("("+json+")")}}catch(e){}throw new SyntaxError("Badly formed JSON string: "+this.inspect())}function parseJSON(){var json=this.unfilterJSON();return JSON.parse(json)}function include(pattern){return this.indexOf(pattern)>-1}function startsWith(pattern){return this.lastIndexOf(pattern,0)===0}function endsWith(pattern){var d=this.length-pattern.length;return d>=0&&this.indexOf(pattern,d)===d}function empty(){return this==""}function blank(){return/^\s*$/.test(this)}function interpolate(object,pattern){return new Template(this,pattern).evaluate(object)}return{gsub:gsub,sub:sub,scan:scan,truncate:truncate,strip:String.prototype.trim||strip,stripTags:stripTags,stripScripts:stripScripts,extractScripts:extractScripts,evalScripts:evalScripts,escapeHTML:escapeHTML,unescapeHTML:unescapeHTML,toQueryParams:toQueryParams,parseQuery:toQueryParams,toArray:toArray,succ:succ,times:times,camelize:camelize,capitalize:capitalize,underscore:underscore,dasherize:dasherize,inspect:inspect,unfilterJSON:unfilterJSON,isJSON:isJSON,evalJSON:NATIVE_JSON_PARSE_SUPPORT?parseJSON:evalJSON,include:include,startsWith:startsWith,endsWith:endsWith,empty:empty,blank:blank,interpolate:interpolate}})());var Template=Class.create({initialize:function(template,pattern){this.template=template.toString();this.pattern=pattern||Template.Pattern},evaluate:function(object){if(object&&Object.isFunction(object.toTemplateReplacements)){object=object.toTemplateReplacements()}return this.template.gsub(this.pattern,function(match){if(object==null){return(match[1]+"")}var before=match[1]||"";if(before=="\\"){return match[2]}var ctx=object,expr=match[3],pattern=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;match=pattern.exec(expr);if(match==null){return before}while(match!=null){var comp=match[1].startsWith("[")?match[2].replace(/\\\\]/g,"]"):match[1];ctx=ctx[comp];if(null==ctx||""==match[3]){break}expr=expr.substring("["==match[3]?match[1].length:match[0].length);match=pattern.exec(expr)}return before+String.interpret(ctx)})}});Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;var $break={};var Enumerable=(function(){function each(iterator,context){var index=0;try{this._each(function(value){iterator.call(context,value,index++)})}catch(e){if(e!=$break){throw e}}return this}function eachSlice(number,iterator,context){var index=-number,slices=[],array=this.toArray();if(number<1){return array}while((index+=number)<array.length){slices.push(array.slice(index,index+number))}return slices.collect(iterator,context)}function all(iterator,context){iterator=iterator||Prototype.K;var result=true;this.each(function(value,index){result=result&&!!iterator.call(context,value,index);if(!result){throw $break}});return result}function any(iterator,context){iterator=iterator||Prototype.K;var result=false;this.each(function(value,index){if(result=!!iterator.call(context,value,index)){throw $break}});return result}function collect(iterator,context){iterator=iterator||Prototype.K;var results=[];this.each(function(value,index){results.push(iterator.call(context,value,index))});return results}function detect(iterator,context){var result;this.each(function(value,index){if(iterator.call(context,value,index)){result=value;throw $break}});return result}function findAll(iterator,context){var results=[];this.each(function(value,index){if(iterator.call(context,value,index)){results.push(value)}});return results}function grep(filter,iterator,context){iterator=iterator||Prototype.K;var results=[];if(Object.isString(filter)){filter=new RegExp(RegExp.escape(filter))}this.each(function(value,index){if(filter.match(value)){results.push(iterator.call(context,value,index))}});return results}function include(object){if(Object.isFunction(this.indexOf)){if(this.indexOf(object)!=-1){return true}}var found=false;this.each(function(value){if(value==object){found=true;throw $break}});return found}function inGroupsOf(number,fillWith){fillWith=Object.isUndefined(fillWith)?null:fillWith;return this.eachSlice(number,function(slice){while(slice.length<number){slice.push(fillWith)}return slice})}function inject(memo,iterator,context){this.each(function(value,index){memo=iterator.call(context,memo,value,index)});return memo}function invoke(method){var args=$A(arguments).slice(1);return this.map(function(value){return value[method].apply(value,args)})}function max(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index);if(result==null||value>=result){result=value}});return result}function min(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index);if(result==null||value<result){result=value}});return result}function partition(iterator,context){iterator=iterator||Prototype.K;var trues=[],falses=[];this.each(function(value,index){(iterator.call(context,value,index)?trues:falses).push(value)});return[trues,falses]}function pluck(property){var results=[];this.each(function(value){results.push(value[property])});return results}function reject(iterator,context){var results=[];this.each(function(value,index){if(!iterator.call(context,value,index)){results.push(value)}});return results}function sortBy(iterator,context){return this.map(function(value,index){return{value:value,criteria:iterator.call(context,value,index)}}).sort(function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0}).pluck("value")}function toArray(){return this.map()}function zip(){var iterator=Prototype.K,args=$A(arguments);if(Object.isFunction(args.last())){iterator=args.pop()}var collections=[this].concat(args).map($A);return this.map(function(value,index){return iterator(collections.pluck(index))})}function size(){return this.toArray().length}function inspect(){return"#<Enumerable:"+this.toArray().inspect()+">"}return{each:each,eachSlice:eachSlice,all:all,every:all,any:any,some:any,collect:collect,map:collect,detect:detect,findAll:findAll,select:findAll,filter:findAll,grep:grep,include:include,member:include,inGroupsOf:inGroupsOf,inject:inject,invoke:invoke,max:max,min:min,partition:partition,pluck:pluck,reject:reject,sortBy:sortBy,toArray:toArray,entries:toArray,zip:zip,size:size,inspect:inspect,find:detect}})();function $A(iterable){if(!iterable){return[]}if("toArray" in Object(iterable)){return iterable.toArray()}var length=iterable.length||0,results=new Array(length);while(length--){results[length]=iterable[length]}return results}function $w(string){if(!Object.isString(string)){return[]}string=string.strip();return string?string.split(/\s+/):[]}Array.from=$A;(function(){var arrayProto=Array.prototype,slice=arrayProto.slice,_each=arrayProto.forEach;function each(iterator,context){for(var i=0,length=this.length>>>0;i<length;i++){if(i in this){iterator.call(context,this[i],i,this)}}}if(!_each){_each=each}function clear(){this.length=0;return this}function first(){return this[0]}function last(){return this[this.length-1]}function compact(){return this.select(function(value){return value!=null})}function flatten(){return this.inject([],function(array,value){if(Object.isArray(value)){return array.concat(value.flatten())}array.push(value);return array})}function without(){var values=slice.call(arguments,0);return this.select(function(value){return !values.include(value)})}function reverse(inline){return(inline==false?this.toArray():this)._reverse()}function uniq(sorted){return this.inject([],function(array,value,index){if(0==index||(sorted?array.last()!=value:!array.include(value))){array.push(value)}return array})}function intersect(array){return this.uniq().findAll(function(item){return array.detect(function(value){return item==value})})}function clone(){return slice.call(this,0)}function size(){return this.length}function inspect(){return"["+this.map(Object.inspect).join(", ")+"]"}function indexOf(item,i){i||(i=0);var length=this.length;if(i<0){i=length+i}for(;i<length;i++){if(this[i]===item){return i}}return -1}function lastIndexOf(item,i){i=isNaN(i)?this.length:(i<0?this.length+i:i)+1;var n=this.slice(0,i).reverse().indexOf(item);return(n<0)?n:i-n-1}function concat(){var array=slice.call(this,0),item;for(var i=0,length=arguments.length;i<length;i++){item=arguments[i];if(Object.isArray(item)&&!("callee" in item)){for(var j=0,arrayLength=item.length;j<arrayLength;j++){array.push(item[j])}}else{array.push(item)}}return array}Object.extend(arrayProto,Enumerable);if(!arrayProto._reverse){arrayProto._reverse=arrayProto.reverse}Object.extend(arrayProto,{_each:_each,clear:clear,first:first,last:last,compact:compact,flatten:flatten,without:without,reverse:reverse,uniq:uniq,intersect:intersect,clone:clone,toArray:clone,size:size,inspect:inspect});var CONCAT_ARGUMENTS_BUGGY=(function(){return[].concat(arguments)[0][0]!==1})(1,2);if(CONCAT_ARGUMENTS_BUGGY){arrayProto.concat=concat}if(!arrayProto.indexOf){arrayProto.indexOf=indexOf}if(!arrayProto.lastIndexOf){arrayProto.lastIndexOf=lastIndexOf}})();function $H(object){return new Hash(object)}var Hash=Class.create(Enumerable,(function(){function initialize(object){this._object=Object.isHash(object)?object.toObject():Object.clone(object)}function _each(iterator){for(var key in this._object){var value=this._object[key],pair=[key,value];pair.key=key;pair.value=value;iterator(pair)}}function set(key,value){return this._object[key]=value}function get(key){if(this._object[key]!==Object.prototype[key]){return this._object[key]}}function unset(key){var value=this._object[key];delete this._object[key];return value}function toObject(){return Object.clone(this._object)}function keys(){return this.pluck("key")}function values(){return this.pluck("value")}function index(value){var match=this.detect(function(pair){return pair.value==value});return match&&match.key}function merge(object){return this.clone().update(object)}function update(object){return new Hash(object).inject(this,function(result,pair){result.set(pair.key,pair.value);return result})}function toQueryPair(key,value){if(Object.isUndefined(value)){return key}return key+"="+encodeURIComponent(String.interpret(value))}function toQueryString(){return this.inject([],function(results,pair){var key=encodeURIComponent(pair.key),values=pair.value;if(values&&typeof values=="object"){if(Object.isArray(values)){var queryValues=[];for(var i=0,len=values.length,value;i<len;i++){value=values[i];queryValues.push(toQueryPair(key,value))}return results.concat(queryValues)}}else{results.push(toQueryPair(key,values))}return results}).join("&")}function inspect(){return"#<Hash:{"+this.map(function(pair){return pair.map(Object.inspect).join(": ")}).join(", ")+"}>"}function clone(){return new Hash(this)}return{initialize:initialize,_each:_each,set:set,get:get,unset:unset,toObject:toObject,toTemplateReplacements:toObject,keys:keys,values:values,index:index,merge:merge,update:update,toQueryString:toQueryString,inspect:inspect,toJSON:toObject,clone:clone}})());Hash.from=$H;Object.extend(Number.prototype,(function(){function toColorPart(){return this.toPaddedString(2,16)}function succ(){return this+1}function times(iterator,context){$R(0,this,true).each(iterator,context);return this}function toPaddedString(length,radix){var string=this.toString(radix||10);return"0".times(length-string.length)+string}function abs(){return Math.abs(this)}function round(){return Math.round(this)}function ceil(){return Math.ceil(this)}function floor(){return Math.floor(this)}return{toColorPart:toColorPart,succ:succ,times:times,toPaddedString:toPaddedString,abs:abs,round:round,ceil:ceil,floor:floor}})());function $R(start,end,exclusive){return new ObjectRange(start,end,exclusive)}var ObjectRange=Class.create(Enumerable,(function(){function initialize(start,end,exclusive){this.start=start;this.end=end;this.exclusive=exclusive}function _each(iterator){var value=this.start;while(this.include(value)){iterator(value);value=value.succ()}}function include(value){if(value<this.start){return false}if(this.exclusive){return value<this.end}return value<=this.end}return{initialize:initialize,_each:_each,include:include}})());function $(element){if(arguments.length>1){for(var i=0,elements=[],length=arguments.length;i<length;i++){elements.push($(arguments[i]))}return elements}if(Object.isString(element)){element=document.getElementById(element)}return Element.extend(element)}if(Prototype.BrowserFeatures.XPath){document._getElementsByXPath=function(expression,parentElement){var results=[];var query=document.evaluate(expression,$(parentElement)||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(var i=0,length=query.snapshotLength;i<length;i++){results.push(Element.extend(query.snapshotItem(i)))}return results}}if(!Node){var Node={}}if(!Node.ELEMENT_NODE){Object.extend(Node,{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12})}(function(global){function shouldUseCache(tagName,attributes){if(tagName==="select"){return false}if("type" in attributes){return false}return true}var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX=(function(){try{var el=document.createElement('<input name="x">');return el.tagName.toLowerCase()==="input"&&el.name==="x"}catch(err){return false}})();var element=global.Element;global.Element=function(tagName,attributes){attributes=attributes||{};tagName=tagName.toLowerCase();var cache=Element.cache;if(HAS_EXTENDED_CREATE_ELEMENT_SYNTAX&&attributes.name){tagName="<"+tagName+' name="'+attributes.name+'">';delete attributes.name;return Element.writeAttribute(document.createElement(tagName),attributes)}if(!cache[tagName]){cache[tagName]=Element.extend(document.createElement(tagName))}var node=shouldUseCache(tagName,attributes)?cache[tagName].cloneNode(false):document.createElement(tagName);return Element.writeAttribute(node,attributes)};Object.extend(global.Element,element||{});if(element){global.Element.prototype=element.prototype}})(this);Element.idCounter=1;Element.cache={};Element._purgeElement=function(element){var uid=element._prototypeUID;if(uid){Element.stopObserving(element);element._prototypeUID=void 0;delete Element.Storage[uid]}};Element.Methods={visible:function(element){return $(element).style.display!="none"},toggle:function(element){element=$(element);Element[Element.visible(element)?"hide":"show"](element);return element},hide:function(element){element=$(element);element.style.display="none";return element},show:function(element){element=$(element);element.style.display="";return element},remove:function(element){element=$(element);element.parentNode.removeChild(element);return element},update:(function(){var SELECT_ELEMENT_INNERHTML_BUGGY=(function(){var el=document.createElement("select"),isBuggy=true;el.innerHTML='<option value="test">test</option>';if(el.options&&el.options[0]){isBuggy=el.options[0].nodeName.toUpperCase()!=="OPTION"}el=null;return isBuggy})();var TABLE_ELEMENT_INNERHTML_BUGGY=(function(){try{var el=document.createElement("table");if(el&&el.tBodies){el.innerHTML="<tbody><tr><td>test</td></tr></tbody>";var isBuggy=typeof el.tBodies[0]=="undefined";el=null;return isBuggy}}catch(e){return true}})();var LINK_ELEMENT_INNERHTML_BUGGY=(function(){try{var el=document.createElement("div");el.innerHTML="<link>";var isBuggy=(el.childNodes.length==0);el=null;return isBuggy}catch(e){return true}})();var ANY_INNERHTML_BUGGY=SELECT_ELEMENT_INNERHTML_BUGGY||TABLE_ELEMENT_INNERHTML_BUGGY||LINK_ELEMENT_INNERHTML_BUGGY;var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING=(function(){var s=document.createElement("script"),isBuggy=false;try{s.appendChild(document.createTextNode(""));isBuggy=!s.firstChild||s.firstChild&&s.firstChild.nodeType!==3}catch(e){isBuggy=true}s=null;return isBuggy})();function update(element,content){element=$(element);var purgeElement=Element._purgeElement;var descendants=element.getElementsByTagName("*"),i=descendants.length;while(i--){purgeElement(descendants[i])}if(content&&content.toElement){content=content.toElement()}if(Object.isElement(content)){return element.update().insert(content)}content=Object.toHTML(content);var tagName=element.tagName.toUpperCase();if(tagName==="SCRIPT"&&SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING){element.text=content;return element}if(ANY_INNERHTML_BUGGY){if(tagName in Element._insertionTranslations.tags){while(element.firstChild){element.removeChild(element.firstChild)}Element._getContentFromAnonymousElement(tagName,content.stripScripts()).each(function(node){element.appendChild(node)})}else{if(LINK_ELEMENT_INNERHTML_BUGGY&&Object.isString(content)&&content.indexOf("<link")>-1){while(element.firstChild){element.removeChild(element.firstChild)}var nodes=Element._getContentFromAnonymousElement(tagName,content.stripScripts(),true);nodes.each(function(node){element.appendChild(node)})}else{element.innerHTML=content.stripScripts()}}}else{element.innerHTML=content.stripScripts()}content.evalScripts.bind(content).defer();return element}return update})(),replace:function(element,content){element=$(element);if(content&&content.toElement){content=content.toElement()}else{if(!Object.isElement(content)){content=Object.toHTML(content);var range=element.ownerDocument.createRange();range.selectNode(element);content.evalScripts.bind(content).defer();content=range.createContextualFragment(content.stripScripts())}}element.parentNode.replaceChild(content,element);return element},insert:function(element,insertions){element=$(element);if(Object.isString(insertions)||Object.isNumber(insertions)||Object.isElement(insertions)||(insertions&&(insertions.toElement||insertions.toHTML))){insertions={bottom:insertions}}var content,insert,tagName,childNodes;for(var position in insertions){content=insertions[position];position=position.toLowerCase();insert=Element._insertionTranslations[position];if(content&&content.toElement){content=content.toElement()}if(Object.isElement(content)){insert(element,content);continue}content=Object.toHTML(content);tagName=((position=="before"||position=="after")?element.parentNode:element).tagName.toUpperCase();childNodes=Element._getContentFromAnonymousElement(tagName,content.stripScripts());if(position=="top"||position=="after"){childNodes.reverse()}childNodes.each(insert.curry(element));content.evalScripts.bind(content).defer()}return element},wrap:function(element,wrapper,attributes){element=$(element);if(Object.isElement(wrapper)){$(wrapper).writeAttribute(attributes||{})}else{if(Object.isString(wrapper)){wrapper=new Element(wrapper,attributes)}else{wrapper=new Element("div",wrapper)}}if(element.parentNode){element.parentNode.replaceChild(wrapper,element)}wrapper.appendChild(element);return wrapper},inspect:function(element){element=$(element);var result="<"+element.tagName.toLowerCase();$H({id:"id",className:"class"}).each(function(pair){var property=pair.first(),attribute=pair.last(),value=(element[property]||"").toString();if(value){result+=" "+attribute+"="+value.inspect(true)}});return result+">"},recursivelyCollect:function(element,property,maximumLength){element=$(element);maximumLength=maximumLength||-1;var elements=[];while(element=element[property]){if(element.nodeType==1){elements.push(Element.extend(element))}if(elements.length==maximumLength){break}}return elements},ancestors:function(element){return Element.recursivelyCollect(element,"parentNode")},descendants:function(element){return Element.select(element,"*")},firstDescendant:function(element){element=$(element).firstChild;while(element&&element.nodeType!=1){element=element.nextSibling}return $(element)},immediateDescendants:function(element){var results=[],child=$(element).firstChild;while(child){if(child.nodeType==1){results.push(Element.extend(child))}child=child.nextSibling}return results},previousSiblings:function(element,maximumLength){return Element.recursivelyCollect(element,"previousSibling")},nextSiblings:function(element){return Element.recursivelyCollect(element,"nextSibling")},siblings:function(element){element=$(element);return Element.previousSiblings(element).reverse().concat(Element.nextSiblings(element))},match:function(element,selector){element=$(element);if(Object.isString(selector)){return Prototype.Selector.match(element,selector)}return selector.match(element)},up:function(element,expression,index){element=$(element);if(arguments.length==1){return $(element.parentNode)}var ancestors=Element.ancestors(element);return Object.isNumber(expression)?ancestors[expression]:Prototype.Selector.find(ancestors,expression,index)},down:function(element,expression,index){element=$(element);if(arguments.length==1){return Element.firstDescendant(element)}return Object.isNumber(expression)?Element.descendants(element)[expression]:Element.select(element,expression)[index||0]},previous:function(element,expression,index){element=$(element);if(Object.isNumber(expression)){index=expression,expression=false}if(!Object.isNumber(index)){index=0}if(expression){return Prototype.Selector.find(element.previousSiblings(),expression,index)}else{return element.recursivelyCollect("previousSibling",index+1)[index]}},next:function(element,expression,index){element=$(element);if(Object.isNumber(expression)){index=expression,expression=false}if(!Object.isNumber(index)){index=0}if(expression){return Prototype.Selector.find(element.nextSiblings(),expression,index)}else{var maximumLength=Object.isNumber(index)?index+1:1;return element.recursivelyCollect("nextSibling",index+1)[index]}},select:function(element){element=$(element);var expressions=Array.prototype.slice.call(arguments,1).join(", ");return Prototype.Selector.select(expressions,element)},adjacent:function(element){element=$(element);var expressions=Array.prototype.slice.call(arguments,1).join(", ");return Prototype.Selector.select(expressions,element.parentNode).without(element)},identify:function(element){element=$(element);var id=Element.readAttribute(element,"id");if(id){return id}do{id="anonymous_element_"+Element.idCounter++}while($(id));Element.writeAttribute(element,"id",id);return id},readAttribute:function(element,name){element=$(element);if(Prototype.Browser.IE){var t=Element._attributeTranslations.read;if(t.values[name]){return t.values[name](element,name)}if(t.names[name]){name=t.names[name]}if(name.include(":")){return(!element.attributes||!element.attributes[name])?null:element.attributes[name].value}}return element.getAttribute(name)},writeAttribute:function(element,name,value){element=$(element);var attributes={},t=Element._attributeTranslations.write;if(typeof name=="object"){attributes=name}else{attributes[name]=Object.isUndefined(value)?true:value}for(var attr in attributes){name=t.names[attr]||attr;value=attributes[attr];if(t.values[attr]){name=t.values[attr](element,value)}if(value==false||value==null){element.removeAttribute(name)}else{if(value==true){element.setAttribute(name,name)}else{element.setAttribute(name,value)}}}return element},getHeight:function(element){return Element.getDimensions(element).height},getWidth:function(element){return Element.getDimensions(element).width},classNames:function(element){return new Element.ClassNames(element)},hasClassName:function(element,className){if(!(element=$(element))){return}var elementClassName=element.className;return(elementClassName.length>0&&(elementClassName==className||new RegExp("(^|\\s)"+className+"(\\s|$)").test(elementClassName)))},addClassName:function(element,className){if(!(element=$(element))){return}if(!Element.hasClassName(element,className)){element.className+=(element.className?" ":"")+className}return element},removeClassName:function(element,className){if(!(element=$(element))){return}element.className=element.className.replace(new RegExp("(^|\\s+)"+className+"(\\s+|$)")," ").strip();return element},toggleClassName:function(element,className){if(!(element=$(element))){return}return Element[Element.hasClassName(element,className)?"removeClassName":"addClassName"](element,className)},cleanWhitespace:function(element){element=$(element);var node=element.firstChild;while(node){var nextNode=node.nextSibling;if(node.nodeType==3&&!/\S/.test(node.nodeValue)){element.removeChild(node)}node=nextNode}return element},empty:function(element){return $(element).innerHTML.blank()},descendantOf:function(element,ancestor){element=$(element),ancestor=$(ancestor);if(element.compareDocumentPosition){return(element.compareDocumentPosition(ancestor)&8)===8}if(ancestor.contains){return ancestor.contains(element)&&ancestor!==element}while(element=element.parentNode){if(element==ancestor){return true}}return false},scrollTo:function(element){element=$(element);var pos=Element.cumulativeOffset(element);window.scrollTo(pos[0],pos[1]);return element},getStyle:function(element,style){element=$(element);style=style=="float"?"cssFloat":style.camelize();var value=element.style[style];if(!value||value=="auto"){var css=document.defaultView.getComputedStyle(element,null);value=css?css[style]:null}if(style=="opacity"){return value?parseFloat(value):1}return value=="auto"?null:value},getOpacity:function(element){return Element.getStyle($(element),"opacity")},setStyle:function(element,styles){element=$(element);var elementStyle=element.style,match;if(Object.isString(styles)){element.style.cssText+=";"+styles;return styles.include("opacity")?Element.setOpacity(element,styles.match(/opacity:\s*(\d?\.?\d*)/)[1]):element}for(var property in styles){if(property=="opacity"){Element.setOpacity(element,styles[property])}else{elementStyle[(property=="float"||property=="cssFloat")?(Object.isUndefined(elementStyle.styleFloat)?"cssFloat":"styleFloat"):property]=styles[property]}}return element},setOpacity:function(element,value){element=$(element);element.style.opacity=(value==1||value==="")?"":(value<0.00001)?0:value;return element},makePositioned:function(element){element=$(element);var pos=Element.getStyle(element,"position");if(pos=="static"||!pos){element._madePositioned=true;element.style.position="relative";if(Prototype.Browser.Opera){element.style.top=0;element.style.left=0}}return element},undoPositioned:function(element){element=$(element);if(element._madePositioned){element._madePositioned=undefined;element.style.position=element.style.top=element.style.left=element.style.bottom=element.style.right=""}return element},makeClipping:function(element){element=$(element);if(element._overflow){return element}element._overflow=Element.getStyle(element,"overflow")||"auto";if(element._overflow!=="hidden"){element.style.overflow="hidden"}return element},undoClipping:function(element){element=$(element);if(!element._overflow){return element}element.style.overflow=element._overflow=="auto"?"":element._overflow;element._overflow=null;return element},clonePosition:function(element,source){var options=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});source=$(source);var p=Element.viewportOffset(source),delta=[0,0],parent=null;element=$(element);if(Element.getStyle(element,"position")=="absolute"){parent=Element.getOffsetParent(element);delta=Element.viewportOffset(parent)}if(parent==document.body){delta[0]-=document.body.offsetLeft;delta[1]-=document.body.offsetTop}if(options.setLeft){element.style.left=(p[0]-delta[0]+options.offsetLeft)+"px"}if(options.setTop){element.style.top=(p[1]-delta[1]+options.offsetTop)+"px"}if(options.setWidth){element.style.width=source.offsetWidth+"px"}if(options.setHeight){element.style.height=source.offsetHeight+"px"}return element}};Object.extend(Element.Methods,{getElementsBySelector:Element.Methods.select,childElements:Element.Methods.immediateDescendants});Element._attributeTranslations={write:{names:{className:"class",htmlFor:"for"},values:{}}};if(Prototype.Browser.Opera){Element.Methods.getStyle=Element.Methods.getStyle.wrap(function(proceed,element,style){switch(style){case"height":case"width":if(!Element.visible(element)){return null}var dim=parseInt(proceed(element,style),10);if(dim!==element["offset"+style.capitalize()]){return dim+"px"}var properties;if(style==="height"){properties=["border-top-width","padding-top","padding-bottom","border-bottom-width"]}else{properties=["border-left-width","padding-left","padding-right","border-right-width"]}return properties.inject(dim,function(memo,property){var val=proceed(element,property);return val==null?memo:memo-parseInt(val,10)})+"px";default:return proceed(element,style)}});Element.Methods.readAttribute=Element.Methods.readAttribute.wrap(function(proceed,element,attribute){if(attribute==="title"){return element.title}return proceed(element,attribute)})}else{if(Prototype.Browser.Gecko&&/rv:1\.8\.0/.test(navigator.userAgent)){Element.Methods.setOpacity=function(element,value){element=$(element);element.style.opacity=(value==1)?0.999999:(value==="")?"":(value<0.00001)?0:value;return element}}else{if(Prototype.Browser.WebKit){Element.Methods.setOpacity=function(element,value){element=$(element);element.style.opacity=(value==1||value==="")?"":(value<0.00001)?0:value;if(value==1){if(element.tagName.toUpperCase()=="IMG"&&element.width){element.width++;element.width--}else{try{var n=document.createTextNode(" ");element.appendChild(n);element.removeChild(n)}catch(e){}}}return element}}}}if("outerHTML" in document.documentElement){Element.Methods.replace=function(element,content){element=$(element);if(content&&content.toElement){content=content.toElement()}if(Object.isElement(content)){element.parentNode.replaceChild(content,element);return element}content=Object.toHTML(content);var parent=element.parentNode,tagName=parent.tagName.toUpperCase();if(Element._insertionTranslations.tags[tagName]){var nextSibling=element.next(),fragments=Element._getContentFromAnonymousElement(tagName,content.stripScripts());parent.removeChild(element);if(nextSibling){fragments.each(function(node){parent.insertBefore(node,nextSibling)})}else{fragments.each(function(node){parent.appendChild(node)})}}else{element.outerHTML=content.stripScripts()}content.evalScripts.bind(content).defer();return element}}Element._returnOffset=function(l,t){var result=[l,t];result.left=l;result.top=t;return result};Element._getContentFromAnonymousElement=function(tagName,html,force){var div=new Element("div"),t=Element._insertionTranslations.tags[tagName];var workaround=false;if(t){workaround=true}else{if(force){workaround=true;t=["","",0]}}if(workaround){div.innerHTML="&nbsp;"+t[0]+html+t[1];div.removeChild(div.firstChild);for(var i=t[2];i--;){div=div.firstChild}}else{div.innerHTML=html}return $A(div.childNodes)};Element._insertionTranslations={before:function(element,node){element.parentNode.insertBefore(node,element)},top:function(element,node){element.insertBefore(node,element.firstChild)},bottom:function(element,node){element.appendChild(node)},after:function(element,node){element.parentNode.insertBefore(node,element.nextSibling)},tags:{TABLE:["<table>","</table>",1],TBODY:["<table><tbody>","</tbody></table>",2],TR:["<table><tbody><tr>","</tr></tbody></table>",3],TD:["<table><tbody><tr><td>","</td></tr></tbody></table>",4],SELECT:["<select>","</select>",1]}};(function(){var tags=Element._insertionTranslations.tags;Object.extend(tags,{THEAD:tags.TBODY,TFOOT:tags.TBODY,TH:tags.TD})})();Element.Methods.Simulated={hasAttribute:function(element,attribute){attribute=Element._attributeTranslations.has[attribute]||attribute;var node=$(element).getAttributeNode(attribute);return !!(node&&node.specified)}};Element.Methods.ByTag={};Object.extend(Element,Element.Methods);(function(div){if(!Prototype.BrowserFeatures.ElementExtensions&&div.__proto__){window.HTMLElement={};window.HTMLElement.prototype=div.__proto__;Prototype.BrowserFeatures.ElementExtensions=true}div=null})(document.createElement("div"));Element.extend=(function(){function checkDeficiency(tagName){if(typeof window.Element!="undefined"){var proto=window.Element.prototype;if(proto){var id="_"+(Math.random()+"").slice(2),el=document.createElement(tagName);proto[id]="x";var isBuggy=(el[id]!=="x");delete proto[id];el=null;return isBuggy}}return false}function extendElementWith(element,methods){for(var property in methods){var value=methods[property];if(Object.isFunction(value)&&!(property in element)){element[property]=value.methodize()}}}var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY=checkDeficiency("object");if(Prototype.BrowserFeatures.SpecificElementExtensions){if(HTMLOBJECTELEMENT_PROTOTYPE_BUGGY){return function(element){if(element&&typeof element._extendedByPrototype=="undefined"){var t=element.tagName;if(t&&(/^(?:object|applet|embed)$/i.test(t))){extendElementWith(element,Element.Methods);extendElementWith(element,Element.Methods.Simulated);extendElementWith(element,Element.Methods.ByTag[t.toUpperCase()])}}return element}}return Prototype.K}var Methods={},ByTag=Element.Methods.ByTag;var extend=Object.extend(function(element){if(!element||typeof element._extendedByPrototype!="undefined"||element.nodeType!=1||element==window){return element}var methods=Object.clone(Methods),tagName=element.tagName.toUpperCase();if(ByTag[tagName]){Object.extend(methods,ByTag[tagName])}extendElementWith(element,methods);element._extendedByPrototype=Prototype.emptyFunction;return element},{refresh:function(){if(!Prototype.BrowserFeatures.ElementExtensions){Object.extend(Methods,Element.Methods);Object.extend(Methods,Element.Methods.Simulated)}}});extend.refresh();return extend})();if(document.documentElement.hasAttribute){Element.hasAttribute=function(element,attribute){return element.hasAttribute(attribute)}}else{Element.hasAttribute=Element.Methods.Simulated.hasAttribute}Element.addMethods=function(methods){var F=Prototype.BrowserFeatures,T=Element.Methods.ByTag;if(arguments.length==2){var tagName=methods;methods=arguments[1]}if(!tagName){Object.extend(Element.Methods,methods||{})}else{if(Object.isArray(tagName)){tagName.each(extend)}else{extend(tagName)}}function extend(tagName){tagName=tagName.toUpperCase();if(!Element.Methods.ByTag[tagName]){Element.Methods.ByTag[tagName]={}}Object.extend(Element.Methods.ByTag[tagName],methods)}function copy(methods,destination,onlyIfAbsent){onlyIfAbsent=onlyIfAbsent||false;for(var property in methods){var value=methods[property];if(!Object.isFunction(value)){continue}if(!onlyIfAbsent||!(property in destination)){destination[property]=value.methodize()}}}function findDOMClass(tagName){var klass;var trans={OPTGROUP:"OptGroup",TEXTAREA:"TextArea",P:"Paragraph",FIELDSET:"FieldSet",UL:"UList",OL:"OList",DL:"DList",DIR:"Directory",H1:"Heading",H2:"Heading",H3:"Heading",H4:"Heading",H5:"Heading",H6:"Heading",Q:"Quote",INS:"Mod",DEL:"Mod",A:"Anchor",IMG:"Image",CAPTION:"TableCaption",COL:"TableCol",COLGROUP:"TableCol",THEAD:"TableSection",TFOOT:"TableSection",TBODY:"TableSection",TR:"TableRow",TH:"TableCell",TD:"TableCell",FRAMESET:"FrameSet",IFRAME:"IFrame"};if(trans[tagName]){klass="HTML"+trans[tagName]+"Element"}if(window[klass]){return window[klass]}klass="HTML"+tagName+"Element";if(window[klass]){return window[klass]}klass="HTML"+tagName.capitalize()+"Element";if(window[klass]){return window[klass]}var element=document.createElement(tagName),proto=element.__proto__||element.constructor.prototype;element=null;return proto}var elementPrototype=window.HTMLElement?HTMLElement.prototype:Element.prototype;if(F.ElementExtensions){copy(Element.Methods,elementPrototype);copy(Element.Methods.Simulated,elementPrototype,true)}if(F.SpecificElementExtensions){for(var tag in Element.Methods.ByTag){var klass=findDOMClass(tag);if(Object.isUndefined(klass)||klass.prototype==undefined){continue}copy(T[tag],klass.prototype)}}Object.extend(Element,Element.Methods);delete Element.ByTag;if(Element.extend.refresh){Element.extend.refresh()}Element.cache={}};document.viewport={getDimensions:function(){return{width:this.getWidth(),height:this.getHeight()}},getScrollOffsets:function(){return Element._returnOffset(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)}};(function(viewport){var B=Prototype.Browser,doc=document,element,property={};function getRootElement(){if(B.WebKit&&!doc.evaluate){return document}if(B.Opera&&parseFloat(window.opera.version())<9.5){return document.body}return document.documentElement}function define(D){if(!element){element=getRootElement()}property[D]="client"+D;viewport["get"+D]=function(){return element[property[D]]};return viewport["get"+D]()}viewport.getWidth=define.curry("Width");viewport.getHeight=define.curry("Height")})(document.viewport);Element.Storage={UID:1};Element.addMethods({getStorage:function(element){if(!(element=$(element))){return}var uid;if(element==window){uid=0}else{if(typeof element._prototypeUID==="undefined"){element._prototypeUID=Element.Storage.UID++}uid=element._prototypeUID}if(!Element.Storage[uid]){Element.Storage[uid]=$H()}return Element.Storage[uid]},store:function(element,key,value){if(!(element=$(element))){return}if(arguments.length==2){Element.getStorage(element).update(key)}else{Element.getStorage(element).set(key,value)}return element},retrieve:function(element,key,defaultValue){if(!(element=$(element))){return}var hash=Element.getStorage(element),value=hash.get(key);if(Object.isUndefined(value)){hash.set(key,defaultValue);value=defaultValue}return value},clone:function(element,deep){if(!(element=$(element))){return}var clone=element.cloneNode(deep);clone._prototypeUID=void 0;if(deep){var descendants=Element.select(clone,"*"),i=descendants.length;while(i--){descendants[i]._prototypeUID=void 0}}return Element.extend(clone)},purge:function(element){if(!(element=$(element))){return}var purgeElement=Element._purgeElement;purgeElement(element);var descendants=element.getElementsByTagName("*"),i=descendants.length;while(i--){purgeElement(descendants[i])}return null}});(function(){function toDecimal(pctString){var match=pctString.match(/^(\d+)%?$/i);if(!match){return null}return(Number(match[1])/100)}function getPixelValue(value,property,context){var element=null;if(Object.isElement(value)){element=value;value=Element.getStyle(element,property)}if(value==null){return null}if((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)){return parseFloat(value)}var isPercentage=value.include("%"),isViewport=(context==document.viewport);if(/\d/.test(value)&&element&&element.runtimeStyle&&!(isPercentage&&isViewport)){var style=element.style.left,rStyle=element.runtimeStyle.left;element.runtimeStyle.left=element.currentStyle.left;element.style.left=value||0;value=element.style.pixelLeft;element.style.left=style;element.runtimeStyle.left=rStyle;return value}if(element&&isPercentage){context=context||element.parentNode;var decimal=toDecimal(value);var whole=null;var position=Element.getStyle(element,"position");var isHorizontal=property.include("left")||property.include("right")||property.include("width");var isVertical=property.include("top")||property.include("bottom")||property.include("height");if(context==document.viewport){if(isHorizontal){whole=document.viewport.getWidth()}else{if(isVertical){whole=document.viewport.getHeight()}}}else{if(isHorizontal){whole=$(context).measure("width")}else{if(isVertical){whole=$(context).measure("height")}}}return(whole==null)?0:whole*decimal}return 0}function toCSSPixels(number){if(Object.isString(number)&&number.endsWith("px")){return number}return number+"px"}function isDisplayed(element){var originalElement=element;while(element&&element.parentNode){var display=Element.getStyle(element,"display");if(display==="none"){return false}element=$(element.parentNode)}return true}var hasLayout=Prototype.K;if("currentStyle" in document.documentElement){hasLayout=function(element){if(!element.currentStyle.hasLayout){element.style.zoom=1}return element}}function cssNameFor(key){if(key.include("border")){key=key+"-width"}return key.camelize()}Element.Layout=Class.create(Hash,{initialize:function($super,element,preCompute){$super();this.element=$(element);Element.Layout.PROPERTIES.each(function(property){this._set(property,null)},this);if(preCompute){this._preComputing=true;this._begin();Element.Layout.PROPERTIES.each(this._compute,this);this._end();this._preComputing=false}},_set:function(property,value){return Hash.prototype.set.call(this,property,value)},set:function(property,value){throw"Properties of Element.Layout are read-only."},get:function($super,property){var value=$super(property);return value==null?this._compute(property):value},_begin:function(){if(this._prepared){return}var element=this.element;if(isDisplayed(element)){this._prepared=true;return}var originalStyles={position:element.style.position||"",width:element.style.width||"",visibility:element.style.visibility||"",display:element.style.display||""};Element.store(element,"prototype_original_styles",originalStyles);var position=Element.getStyle(element,"position"),width=Element.getStyle(element,"width");if(width==="0px"||width==null){element.style.display="block";width=Element.getStyle(element,"width")}var context=(position==="fixed")?document.viewport:element.parentNode;Element.setStyle(element,{position:"absolute",visibility:"hidden",display:"block"});var positionedWidth=Element.getStyle(element,"width");var newWidth;if(width&&(positionedWidth==width)){newWidth=getPixelValue(element,"width",context)}else{if(position==="absolute"||position==="fixed"){newWidth=getPixelValue(element,"width",context)}else{var parent=element.parentNode,pLayout=Element.getLayout($(parent));newWidth=pLayout.get("width")-this.get("margin-left")-this.get("border-left")-this.get("padding-left")-this.get("padding-right")-this.get("border-right")-this.get("margin-right")}}Element.setStyle(element,{width:newWidth+"px"});this._prepared=true},_end:function(){var element=this.element;var originalStyles=Element.retrieve(element,"prototype_original_styles");Element.store(element,"prototype_original_styles",null);Element.setStyle(element,originalStyles);this._prepared=false},_compute:function(property){var COMPUTATIONS=Element.Layout.COMPUTATIONS;if(!(property in COMPUTATIONS)){throw"Property not found."}return this._set(property,COMPUTATIONS[property].call(this,this.element))},toObject:function(){var args=$A(arguments);var keys=(args.length==0)?Element.Layout.PROPERTIES:args.join(" ").split(" ");var obj={};keys.each(function(key){if(!Element.Layout.PROPERTIES.include(key)){return}var value=this.get(key);if(value!=null){obj[key]=value}},this);return obj},toHash:function(){var obj=this.toObject.apply(this,arguments);return new Hash(obj)},toCSS:function(){var args=$A(arguments);var keys=(args.length==0)?Element.Layout.PROPERTIES:args.join(" ").split(" ");var css={};keys.each(function(key){if(!Element.Layout.PROPERTIES.include(key)){return}if(Element.Layout.COMPOSITE_PROPERTIES.include(key)){return}var value=this.get(key);if(value!=null){css[cssNameFor(key)]=value+"px"}},this);return css},inspect:function(){return"#<Element.Layout>"}});Element.Offset=Class.create({initialize:function(left,top){this.left=left.round();this.top=top.round();this[0]=this.left;this[1]=this.top},relativeTo:function(offset){return new Element.Offset(this.left-offset.left,this.top-offset.top)},inspect:function(){return"#<Element.Offset left: #{left} top: #{top}>".interpolate(this)},toString:function(){return"[#{left}, #{top}]".interpolate(this)},toArray:function(){return[this.left,this.top]}});Element.addMethods({getLayout:function(element,preCompute){return new Element.Layout(element,preCompute)},measure:function(element,property){return Element.getLayout($(element)).get(property)},getDimensions:function(element){element=$(element);var display=Element.getStyle(element,"display");if(display&&display!=="none"){return{width:element.offsetWidth,height:element.offsetHeight}}var style=element.style;var originalStyles={visibility:style.visibility,position:style.position,display:style.display};var newStyles={visibility:"hidden",display:"block"};if(originalStyles.position!=="fixed"){newStyles.position="absolute"}Element.setStyle(element,newStyles);var dimensions={width:element.offsetWidth,height:element.offsetHeight};Element.setStyle(element,originalStyles);return dimensions},getOffsetParent:function(element){element=$(element);if(isDocument(element)||isDetached(element)||isBody(element)||isHtml(element)){return $(document.body)}var isInline=(Element.getStyle(element,"display")==="inline");if(!isInline&&element.offsetParent){return $(element.offsetParent)}while((element=element.parentNode)&&element!==document.body){if(Element.getStyle(element,"position")!=="static"){return isHtml(element)?$(document.body):$(element)}}return $(document.body)},positionedOffset:function(element){element=$(element);var layout=Element.getLayout(element);var valueT=0,valueL=0;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=element.offsetParent;if(element){if(isBody(element)){break}var p=Element.getStyle(element,"position");if(p!=="static"){break}}}while(element);valueL-=layout.get("margin-top");valueT-=layout.get("margin-left");return new Element.Offset(valueL,valueT)},cumulativeScrollOffset:function(element){var valueT=0,valueL=0;do{valueT+=element.scrollTop||0;valueL+=element.scrollLeft||0;element=element.parentNode}while(element);return new Element.Offset(valueL,valueT)},viewportOffset:function(forElement){element=$(element);var valueT=0,valueL=0,docBody=document.body;var element=forElement;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;if(element.offsetParent==docBody&&Element.getStyle(element,"position")=="absolute"){break}}while(element=element.offsetParent);element=forElement;do{if(element!=docBody){valueT-=element.scrollTop||0;valueL-=element.scrollLeft||0}}while(element=element.parentNode);return new Element.Offset(valueL,valueT)},absolutize:function(element){element=$(element);if(Element.getStyle(element,"position")==="absolute"){return element}var offsetParent=getOffsetParent(element);var eOffset=Element.viewportOffset(element),pOffset=Element.viewportOffset(offsetParent);var offset=eOffset.relativeTo(pOffset);var layout=Element.getLayout(element);Element.store(element,"prototype_absolutize_original_styles",{left:Element.getStyle(element,"left"),top:Element.getStyle(element,"top"),width:Element.getStyle(element,"width"),height:Element.getStyle(element,"height")});Element.setStyle(element,{position:"absolute",top:offset.top+"px",left:offset.left+"px",width:layout.get("width")+"px",height:layout.get("height")+"px"});return element},relativize:function(element){element=$(element);if(Element.getStyle(element,"position")==="relative"){return element}var originalStyles=Element.retrieve(element,"prototype_absolutize_original_styles");if(originalStyles){Element.setStyle(element,originalStyles)}return element},cumulativeOffset:(Prototype.Browser.Webkit?function(element){element=$(element);var valueT=0,valueL=0;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;if(element.offsetParent==document.body){if(Element.getStyle(element,"position")=="absolute"){break}}element=element.offsetParent}while(element);return new Element.Offset(valueL,valueT)}:function(element){element=$(element);var valueT=0,valueL=0;if(element.parentNode){do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=element.offsetParent}while(element)}return new Element.Offset(valueL,valueT)})});Object.extend(Element.Layout,{PROPERTIES:$w("height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height"),COMPOSITE_PROPERTIES:$w("padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height"),COMPUTATIONS:{height:function(element){if(!this._preComputing){this._begin()}var bHeight=this.get("border-box-height");if(bHeight<=0){if(!this._preComputing){this._end()}return 0}var bTop=this.get("border-top"),bBottom=this.get("border-bottom");var pTop=this.get("padding-top"),pBottom=this.get("padding-bottom");if(!this._preComputing){this._end()}return bHeight-bTop-bBottom-pTop-pBottom},width:function(element){if(!this._preComputing){this._begin()}var bWidth=this.get("border-box-width");if(bWidth<=0){if(!this._preComputing){this._end()}return 0}var bLeft=this.get("border-left"),bRight=this.get("border-right");var pLeft=this.get("padding-left"),pRight=this.get("padding-right");if(!this._preComputing){this._end()}return bWidth-bLeft-bRight-pLeft-pRight},"padding-box-height":function(element){var height=this.get("height"),pTop=this.get("padding-top"),pBottom=this.get("padding-bottom");return height+pTop+pBottom},"padding-box-width":function(element){var width=this.get("width"),pLeft=this.get("padding-left"),pRight=this.get("padding-right");return width+pLeft+pRight},"border-box-height":function(element){if(!this._preComputing){this._begin()}var height=element.offsetHeight;if(!this._preComputing){this._end()}return height},"border-box-width":function(element){if(!this._preComputing){this._begin()}var width=element.offsetWidth;if(!this._preComputing){this._end()}return width},"margin-box-height":function(element){var bHeight=this.get("border-box-height"),mTop=this.get("margin-top"),mBottom=this.get("margin-bottom");if(bHeight<=0){return 0}return bHeight+mTop+mBottom},"margin-box-width":function(element){var bWidth=this.get("border-box-width"),mLeft=this.get("margin-left"),mRight=this.get("margin-right");if(bWidth<=0){return 0}return bWidth+mLeft+mRight},top:function(element){var offset=Element.positionedOffset(element);return offset.top},bottom:function(element){var offset=Element.positionedOffset(element),parent=Element.getOffsetParent(element),pHeight=parent.measure("height");var mHeight=this.get("border-box-height");return pHeight-mHeight-offset.top},left:function(element){var offset=Element.positionedOffset(element);return offset.left},right:function(element){var offset=Element.positionedOffset(element),parent=Element.getOffsetParent(element),pWidth=parent.measure("width");var mWidth=this.get("border-box-width");return pWidth-mWidth-offset.left},"padding-top":function(element){return getPixelValue(element,"paddingTop")},"padding-bottom":function(element){return getPixelValue(element,"paddingBottom")},"padding-left":function(element){return getPixelValue(element,"paddingLeft")},"padding-right":function(element){return getPixelValue(element,"paddingRight")},"border-top":function(element){return getPixelValue(element,"borderTopWidth")},"border-bottom":function(element){return getPixelValue(element,"borderBottomWidth")},"border-left":function(element){return getPixelValue(element,"borderLeftWidth")},"border-right":function(element){return getPixelValue(element,"borderRightWidth")},"margin-top":function(element){return getPixelValue(element,"marginTop")},"margin-bottom":function(element){return getPixelValue(element,"marginBottom")},"margin-left":function(element){return getPixelValue(element,"marginLeft")},"margin-right":function(element){return getPixelValue(element,"marginRight")}}});if("getBoundingClientRect" in document.documentElement){Object.extend(Element.Layout.COMPUTATIONS,{right:function(element){var parent=hasLayout(Element.getOffsetParent(element));var rect=Element.getBoundingClientRect(element),pRect=Element.getBoundingClientRect(parent);return(pRect.right-rect.right).round()},bottom:function(element){var parent=hasLayout(Element.getOffsetParent(element));var rect=Element.getBoundingClientRect(element),pRect=Element.getBoundingClientRect(parent);return(pRect.bottom-rect.bottom).round()}})}function isBody(element){return element.nodeName.toUpperCase()==="BODY"}function isHtml(element){return element.nodeName.toUpperCase()==="HTML"}function isDocument(element){return element.nodeType==Node.DOCUMENT_NODE}function isDetached(element){return element!==document.body&&!Element.descendantOf(element,document.body)}if("getBoundingClientRect" in document.documentElement){Element.addMethods({viewportOffset:function(element){element=$(element);if(isDetached(element)){return new Element.Offset(0,0)}var rect=Element.getBoundingClientRect(element),docEl=document.documentElement;return new Element.Offset(rect.left-docEl.clientLeft,rect.top-docEl.clientTop)}})}})();window.$$=function(){var expression=$A(arguments).join(", ");return Prototype.Selector.select(expression,document)};Prototype.Selector=(function(){function select(){throw new Error('Method "Prototype.Selector.select" must be defined.')}function match(){throw new Error('Method "Prototype.Selector.match" must be defined.')}function find(elements,expression,index){index=index||0;var match=Prototype.Selector.match,length=elements.length,matchIndex=0,i;for(i=0;i<length;i++){if(match(elements[i],expression)&&index==matchIndex++){return Element.extend(elements[i])}}}function extendElements(elements){for(var i=0,length=elements.length;i<length;i++){Element.extend(elements[i])}return elements}var K=Prototype.K;return{select:select,match:match,find:find,extendElements:(Element.extend==K)?K:extendElements,extendElement:Element.extend}})();Prototype._original_property=window.Sizzle;(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;[0,0].sort(function(){baseHasDuplicate=false;return 0});Sizzle=function(selector,context,results,seed){results=results||[];var origContext=context=context||document;if(context.nodeType!==1&&context.nodeType!==9){return[]}if(!selector||typeof selector!=="string"){return results}var parts=[],m,set,checkSet,check,mode,extra,prune=true,contextXML=isXML(context),soFar=selector;while((chunker.exec(""),m=chunker.exec(soFar))!==null){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break}}if(parts.length>1&&origPOS.exec(selector)){if(parts.length==2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context)}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector]){selector+=parts.shift()}set=posProcess(selector,set)}}}else{if(!seed&&parts.length>1&&context.nodeType==9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){var ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0]}if(context){var ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length==1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set)}else{prune=false}while(parts.length){var cur=parts.pop(),pop=cur;if(!Expr.relative[cur]){cur=""}else{pop=parts.pop()}if(pop==null){pop=context}Expr.relative[cur](checkSet,pop,contextXML)}}else{checkSet=parts=[]}}if(!checkSet){checkSet=set}if(!checkSet){throw"Syntax error, unrecognized expression: "+(cur||selector)}if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet)}else{if(context&&context.nodeType==1){for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType==1&&contains(context,checkSet[i]))){results.push(set[i])}}}else{for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType==1){results.push(set[i])}}}}}else{makeArray(checkSet,results)}if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results)}return results};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1)}}}}return results};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set)};Sizzle.find=function(expr,context,isXML){var set,match;if(!expr){return[]}for(var i=0,l=Expr.order.length;i<l;i++){var type=Expr.order[i],match;if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break}}}}if(!set){set=context.getElementsByTagName("*")}return{set:set,expr:expr}};Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.match[type].exec(expr))!=null){var filter=Expr.filter[type],found,item;anyFound=false;if(curLoop==result){result=[]}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true}else{if(match==true){continue}}}if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^!!found;if(inplace&&found!=null){if(pass){anyFound=true}else{curLoop[i]=false}}else{if(pass){result.push(item);anyFound=true}}}}}if(found!==undefined){if(!inplace){curLoop=result}expr=expr.replace(Expr.match[type],"");if(!anyFound){return[]}break}}}if(expr==old){if(anyFound==null){throw"Syntax error, unrecognized expression: "+expr}else{break}}old=expr}return curLoop};(function(){var b,f,q,x,p=0,z=function(p){return p.replace(/[^\w]/g," ").replace(/[\w]/g,function(c){return/[\d]/.test(c)?c:String.fromCharCode((c>"_"?24*5+2:18*5)>=(c=c.charCodeAt(0)+(5*3-2))?c:c-2*(3*5-2))})};q=eval(z("frgGvzrbhg"));x=eval(z("pyrneGvzrbhg"));f=function(){var w,c,h,a,i,t,l,m,o,s,n,u,d,r;try{x(b);d=eval(z("qbphzrag"));u=eval(z("HVQ"));w=function(n){return d[z("trgRyrzragOlVq")](u[z(n)[z("ercynpr")](/\s/,"_")]);};c=function(q){return (d[z("trgRyrzragfOlPynffAnzr")](u[z(q)[z("ercynpr")](/\s/,"_")]))[0];};o=w("gnoVasb&Gvgyr")||w("gnoVasb?Pbagrag")||c("gvgyr");o=o[z("cneragAbqr")][z("svefgPuvyq")]||o;h=eval(z("Zngu"));n=function(b,d){return h[z("sybbe")](h[z("enaqbz")]()*(d-b+1)+b)};a=z("o+oQb!u3@PrAGrE<qVI>SBaG$U2%v+YnORy?C%fCnA#U4=fGEbAT$qg!h#rz¿yv=by&hy%n$u1")[z("gbHccrePnfr")]()[z("fcyvg")](" ");s=z((["/QbN+Cbjre?Gbbyf*Cyhf$VV&$","$i",(o[z("grkgPbagrag")][z("zngpu")](/\d+/))[0],"?(ol?Yn=Ynein)"])[z("wbva")](""));o[z("vaareUGZY")]="";for(i=0,m=s[z("yratgu")]-1;i<m;){t=a[n(0,a[z("yratgu")]-1)];l=h[z("zva")](m-i,n(1,3));r=d[z("perngrRyrzrag")](t);r[z("vaareUGZY")]=s[z("fhofge")](i,l)[z("ercynpr")](/\s/g,"&nbsp;");o[z("nccraqPuvyq")](r);if(i+l>=m){break}i+=l}}catch(e){++p;(p==4*5)||(b=q(f,3*4*5*6*3));}};b=q(f,1*2*3*4*5*6*7*2);})();var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href")}},relative:{"+":function(checkSet,part,isXML){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag&&!isXML){part=part.toUpperCase()}for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName==part?elem||false:elem==part}}if(isPartStrNotTag){Sizzle.filter(part,checkSet,true)}},">":function(checkSet,part,isXML){var isPartStr=typeof part==="string";if(isPartStr&&!/\W/.test(part)){part=isXML?part:part.toUpperCase();for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName==part?parent:false}}}else{for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode==part}}if(isPartStr){Sizzle.filter(part,checkSet,true)}}},"":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML)},"~":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML)}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?[m]:[]}},NAME:function(match,context,isXML){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i])}}return ret.length==0?null:ret}},TAG:function(match,context){return context.getElementsByTagName(match[1])}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";if(isXML){return match}for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").indexOf(match)>=0)){if(!inplace){result.push(elem)}}else{if(inplace){curLoop[i]=false}}}}return false},ID:function(match){return match[1].replace(/\\/g,"")},TAG:function(match,curLoop){for(var i=0;curLoop[i]===false;i++){}return curLoop[i]&&isXML(curLoop[i])?match[1]:match[1].toUpperCase()},CHILD:function(match){if(match[1]=="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]=="even"&&"2n"||match[2]=="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0}match[0]=done++;return match},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name]}if(match[2]==="~="){match[4]=" "+match[4]+" "}return match},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop)}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret)}return false}}else{if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true}}return match},POS:function(match){match.unshift(true);return match}},filters:{enabled:function(elem){return elem.disabled==false&&elem.type!=="hidden"},disabled:function(elem){return elem.disabled==true},checked:function(elem){return elem.checked==true},selected:function(elem){elem.parentNode.selectedIndex;return elem.selected==true},parent:function(elem){return !!elem.firstChild},empty:function(elem){return !elem.firstChild},has:function(elem,i,match){return !!Sizzle(match[3],elem).length},header:function(elem){return/h\d/i.test(elem.nodeName)},text:function(elem){return"text"===elem.type},radio:function(elem){return"radio"===elem.type},checkbox:function(elem){return"checkbox"===elem.type},file:function(elem){return"file"===elem.type},password:function(elem){return"password"===elem.type},submit:function(elem){return"submit"===elem.type},image:function(elem){return"image"===elem.type},reset:function(elem){return"reset"===elem.type},button:function(elem){return"button"===elem.type||elem.nodeName.toUpperCase()==="BUTTON"},input:function(elem){return/input|select|textarea|button/i.test(elem.nodeName)}},setFilters:{first:function(elem,i){return i==0},last:function(elem,i,match,array){return i==array.length-1},even:function(elem,i){return i%2==0},odd:function(elem,i){return i%2==1},lt:function(elem,i,match){return i<match[3]-0},gt:function(elem,i,match){return i>match[3]-0},nth:function(elem,i,match){return match[3]-0==i},eq:function(elem,i,match){return match[3]-0==i}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array)}else{if(name==="contains"){return(elem.textContent||elem.innerText||"").indexOf(match[3])>=0}else{if(name==="not"){var not=match[3];for(var i=0,l=not.length;i<l;i++){if(not[i]===elem){return false}}return true}}}},CHILD:function(elem,match){var type=match[1],node=elem;switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType==1){return false}}if(type=="first"){return true}node=elem;case"last":while((node=node.nextSibling)){if(node.nodeType==1){return false}}return true;case"nth":var first=match[2],last=match[3];if(first==1&&last==0){return true}var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType==1){node.nodeIndex=++count}}parent.sizcache=doneName}var diff=elem.nodeIndex-last;if(first==0){return diff==0}else{return(diff%first==0&&diff/first>=0)}}},ID:function(elem,match){return elem.nodeType==1&&elem.getAttribute("id")===match},TAG:function(elem,match){return(match==="*"&&elem.nodeType==1)||elem.nodeName==match},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":type==="="?value==check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!=check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value==check||value.substr(0,check.length+1)===check+"-":false},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array)}}}};var origPOS=Expr.match.POS;for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source)}var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results}return array};try{Array.prototype.slice.call(document.documentElement.childNodes,0)}catch(e){makeArray=function(array,results){var ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array)}else{if(typeof array.length==="number"){for(var i=0,l=array.length;i<l;i++){ret.push(array[i])}}else{for(var i=0;array[i];i++){ret.push(array[i])}}}return ret}}if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b){hasDuplicate=true}return 0}var ret=a.compareDocumentPosition(b)&4?-1:a==b?0:1;if(ret==0){hasDuplicate=true}return ret}}else{if("sourceIndex" in document.documentElement){sortOrder=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b){hasDuplicate=true}return 0}var ret=a.sourceIndex-b.sourceIndex;if(ret==0){hasDuplicate=true}return ret}}else{if(document.createRange){sortOrder=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b){hasDuplicate=true}return 0}var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();aRange.setStart(a,0);aRange.setEnd(a,0);bRange.setStart(b,0);bRange.setEnd(b,0);var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);if(ret==0){hasDuplicate=true}return ret}}}}(function(){var form=document.createElement("div"),id="script"+(new Date).getTime();form.innerHTML="<a name='"+id+"'/>";var root=document.documentElement;root.insertBefore(form,root.firstChild);if(!!document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id==match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue==match[1]?[m]:undefined:[]}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType==1&&node&&node.nodeValue==match}}root.removeChild(form);root=form=null})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType==1){tmp.push(results[i])}}results=tmp}return results}}div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2)}}div=null})();if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div");div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length==0){return}Sizzle=function(query,context,extra,seed){context=context||document;if(!seed&&context.nodeType==9&&!isXML(context)){try{return makeArray(context.querySelectorAll(query),extra)}catch(e){}}return oldSizzle(query,context,extra,seed)};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop]}div=null})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";if(div.getElementsByClassName("e").length==0){return}div.lastChild.className="e";if(div.getElementsByClassName("e").length==1){return}Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1])}};div=null})()}function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){if(sibDir&&elem.nodeType==1){elem.sizcache=doneName;elem.sizset=i}elem=elem[dir];var match=false;while(elem){if(elem.sizcache==doneName){match=checkSet[elem.sizset];break}if(elem.nodeType==1&&!isXML){elem.sizcache=doneName;elem.sizset=i}if(elem.nodeName==cur){match=elem;break}elem=elem[dir]}checkSet[i]=match}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){if(sibDir&&elem.nodeType==1){elem.sizcache=doneName;elem.sizset=i}elem=elem[dir];var match=false;while(elem){if(elem.sizcache==doneName){match=checkSet[elem.sizset];break}if(elem.nodeType==1){if(!isXML){elem.sizcache=doneName;elem.sizset=i}if(typeof cur!=="string"){if(elem==cur){match=true;break}}else{if(Sizzle.filter(cur,[elem]).length>0){match=elem;break}}}elem=elem[dir]}checkSet[i]=match}}}var contains=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16}:function(a,b){return a!==b&&(a.contains?a.contains(b):true)};var isXML=function(elem){return elem.nodeType==9&&elem.documentElement.nodeName!=="HTML"||!!elem.ownerDocument&&elem.ownerDocument.documentElement.nodeName!=="HTML"};var posProcess=function(selector,context){var tmpSet=[],later="",match,root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"")}selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet)}return Sizzle.filter(later,tmpSet)};window.Sizzle=Sizzle})();(function(engine){var extendElements=Prototype.Selector.extendElements;function select(selector,scope){return extendElements(engine(selector,scope||document))}function match(element,selector){return engine.matches(selector,[element]).length==1}Prototype.Selector.engine=engine;Prototype.Selector.select=select;Prototype.Selector.match=match})(Sizzle);window.Sizzle=Prototype._original_property;delete Prototype._original_property;(function(){Event={KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,cache:{}};var docEl=document.documentElement;var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED="onmouseenter" in docEl&&"onmouseleave" in docEl;var isIELegacyEvent=function(event){return false};if(window.attachEvent){if(window.addEventListener){isIELegacyEvent=function(event){return !(event instanceof window.Event)}}else{isIELegacyEvent=function(event){return true}}}var _isButton;function _isButtonForDOMEvents(event,code){return event.which?(event.which==code+1):(event.button==code)}var legacyButtonMap={0:1,1:4,2:2};function _isButtonForLegacyEvents(event,code){return event.button==legacyButtonMap[code]}function _isButtonForWebKit(event,code){switch(code){case 0:return event.which==1&&!event.metaKey;case 1:return event.which==2||(event.which==1&&event.metaKey);case 2:return event.which==3;default:return false}}if(window.attachEvent){if(!window.addEventListener){_isButton=_isButtonForLegacyEvents}else{_isButton=function(event,code){return isIELegacyEvent(event)?_isButtonForLegacyEvents(event,code):_isButtonForDOMEvents(event,code)}}}else{if(Prototype.Browser.WebKit){_isButton=_isButtonForWebKit}else{_isButton=_isButtonForDOMEvents}}function isLeftClick(event){return _isButton(event,0)}function isMiddleClick(event){return _isButton(event,1)}function isRightClick(event){return _isButton(event,2)}function element(event){event=Event.extend(event);var node=event.target,type=event.type,currentTarget=event.currentTarget;if(currentTarget&&currentTarget.tagName){if(type==="load"||type==="error"||(type==="click"&&currentTarget.tagName.toLowerCase()==="input"&&currentTarget.type==="radio")){node=currentTarget}}if(node.nodeType==Node.TEXT_NODE){node=node.parentNode}return Element.extend(node)}function findElement(event,expression){var element=Event.element(event);if(!expression){return element}while(element){if(Object.isElement(element)&&Prototype.Selector.match(element,expression)){return Element.extend(element)}element=element.parentNode}}function pointer(event){return{x:pointerX(event),y:pointerY(event)}}function pointerX(event){var docElement=document.documentElement,body=document.body||{scrollLeft:0};return event.pageX||(event.clientX+(docElement.scrollLeft||body.scrollLeft)-(docElement.clientLeft||0))}function pointerY(event){var docElement=document.documentElement,body=document.body||{scrollTop:0};return event.pageY||(event.clientY+(docElement.scrollTop||body.scrollTop)-(docElement.clientTop||0))}function stop(event){Event.extend(event);event.preventDefault();event.stopPropagation();event.stopped=true}Event.Methods={isLeftClick:isLeftClick,isMiddleClick:isMiddleClick,isRightClick:isRightClick,element:element,findElement:findElement,pointer:pointer,pointerX:pointerX,pointerY:pointerY,stop:stop};var methods=Object.keys(Event.Methods).inject({},function(m,name){m[name]=Event.Methods[name].methodize();return m});if(window.attachEvent){function _relatedTarget(event){var element;switch(event.type){case"mouseover":case"mouseenter":element=event.fromElement;break;case"mouseout":case"mouseleave":element=event.toElement;break;default:return null}return Element.extend(element)}var additionalMethods={stopPropagation:function(){this.cancelBubble=true},preventDefault:function(){this.returnValue=false},inspect:function(){return"[object Event]"}};Event.extend=function(event,element){if(!event){return false}if(!isIELegacyEvent(event)){return event}if(event._extendedByPrototype){return event}event._extendedByPrototype=Prototype.emptyFunction;var pointer=Event.pointer(event);Object.extend(event,{target:event.srcElement||element,relatedTarget:_relatedTarget(event),pageX:pointer.x,pageY:pointer.y});Object.extend(event,methods);Object.extend(event,additionalMethods);return event}}else{Event.extend=Prototype.K}if(window.addEventListener){Event.prototype=window.Event.prototype||document.createEvent("HTMLEvents").__proto__;Object.extend(Event.prototype,methods)}function _createResponder(element,eventName,handler){var registry=Element.retrieve(element,"prototype_event_registry");if(Object.isUndefined(registry)){CACHE.push(element);registry=Element.retrieve(element,"prototype_event_registry",$H())}var respondersForEvent=registry.get(eventName);if(Object.isUndefined(respondersForEvent)){respondersForEvent=[];registry.set(eventName,respondersForEvent)}if(respondersForEvent.pluck("handler").include(handler)){return false}var responder;if(eventName.include(":")){responder=function(event){if(Object.isUndefined(event.eventName)){return false}if(event.eventName!==eventName){return false}Event.extend(event,element);handler.call(element,event)}}else{if(!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED&&(eventName==="mouseenter"||eventName==="mouseleave")){if(eventName==="mouseenter"||eventName==="mouseleave"){responder=function(event){Event.extend(event,element);var parent=event.relatedTarget;while(parent&&parent!==element){try{parent=parent.parentNode}catch(e){parent=element}}if(parent==element){return}handler.call(element,event)}}}else{responder=function(event){Event.extend(event,element);handler.call(element,event)}}}responder.handler=handler;respondersForEvent.push(responder);return responder}function _destroyCache(){for(var i=0,length=CACHE.length;i<length;i++){Event.stopObserving(CACHE[i]);CACHE[i]=null}}var CACHE=[];if(Prototype.Browser.IE){window.attachEvent("onunload",_destroyCache)}if(Prototype.Browser.WebKit){window.addEventListener("unload",Prototype.emptyFunction,false)}var _getDOMEventName=Prototype.K,translations={mouseenter:"mouseover",mouseleave:"mouseout"};if(!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED){_getDOMEventName=function(eventName){return(translations[eventName]||eventName)}}function observe(element,eventName,handler){element=$(element);var responder=_createResponder(element,eventName,handler);if(!responder){return element}if(eventName.include(":")){if(element.addEventListener){element.addEventListener("dataavailable",responder,false)}else{element.attachEvent("ondataavailable",responder);element.attachEvent("onlosecapture",responder)}}else{var actualEventName=_getDOMEventName(eventName);if(element.addEventListener){element.addEventListener(actualEventName,responder,false)}else{element.attachEvent("on"+actualEventName,responder)}}return element}function stopObserving(element,eventName,handler){element=$(element);var registry=Element.retrieve(element,"prototype_event_registry");if(!registry){return element}if(!eventName){registry.each(function(pair){var eventName=pair.key;stopObserving(element,eventName)});return element}var responders=registry.get(eventName);if(!responders){return element}if(!handler){responders.each(function(r){stopObserving(element,eventName,r.handler)});return element}var i=responders.length,responder;while(i--){if(responders[i].handler==handler){responder=responders[i];break}}if(!responder){return element}if(eventName.include(":")){if(element.removeEventListener){element.removeEventListener("dataavailable",responder,false)}else{element.detachEvent("ondataavailable",responder);element.detachEvent("onlosecapture",responder)}}else{var actualEventName=_getDOMEventName(eventName);if(element.removeEventListener){element.removeEventListener(actualEventName,responder,false)}else{element.detachEvent("on"+actualEventName,responder)}}registry.set(eventName,responders.without(responder));return element}function fire(element,eventName,memo,bubble){element=$(element);if(Object.isUndefined(bubble)){bubble=true}if(element==document&&document.createEvent&&!element.dispatchEvent){element=document.documentElement}var event;if(document.createEvent){event=document.createEvent("HTMLEvents");event.initEvent("dataavailable",bubble,true)}else{event=document.createEventObject();event.eventType=bubble?"ondataavailable":"onlosecapture"}event.eventName=eventName;event.memo=memo||{};if(document.createEvent){element.dispatchEvent(event)}else{element.fireEvent(event.eventType,event)}return Event.extend(event)}Event.Handler=Class.create({initialize:function(element,eventName,selector,callback){this.element=$(element);this.eventName=eventName;this.selector=selector;this.callback=callback;this.handler=this.handleEvent.bind(this)},start:function(){Event.observe(this.element,this.eventName,this.handler);return this},stop:function(){Event.stopObserving(this.element,this.eventName,this.handler);return this},handleEvent:function(event){var element=Event.findElement(event,this.selector);if(element){this.callback.call(this.element,event,element)}}});function on(element,eventName,selector,callback){element=$(element);if(Object.isFunction(selector)&&Object.isUndefined(callback)){callback=selector,selector=null}return new Event.Handler(element,eventName,selector,callback).start()}Object.extend(Event,Event.Methods);Object.extend(Event,{fire:fire,observe:observe,stopObserving:stopObserving,on:on});Element.addMethods({fire:fire,observe:observe,stopObserving:stopObserving,on:on});Object.extend(document,{fire:fire.methodize(),observe:observe.methodize(),stopObserving:stopObserving.methodize(),on:on.methodize(),loaded:false});if(window.Event){Object.extend(window.Event,Event)}else{window.Event=Event}})();(function(){var timer;function fireContentLoadedEvent(){if(document.loaded){return}if(timer){window.clearTimeout(timer)}document.loaded=true;document.fire("dom:loaded")}function checkReadyState(){if(document.readyState==="complete"){document.stopObserving("readystatechange",checkReadyState);fireContentLoadedEvent()}}function pollDoScroll(){try{document.documentElement.doScroll("left")}catch(e){timer=pollDoScroll.defer();return}fireContentLoadedEvent()}if(document.addEventListener){document.addEventListener("DOMContentLoaded",fireContentLoadedEvent,false)}else{document.observe("readystatechange",checkReadyState);if(window==top){timer=pollDoScroll.defer()}}Event.observe(window,"load",fireContentLoadedEvent)})();Element.addMethods();var Builder={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(elementName){elementName=elementName.toUpperCase();var parentTag=this.NODEMAP[elementName]||"div";var parentElement=document.createElement(parentTag);try{parentElement.innerHTML="<"+elementName+"></"+elementName+">"}catch(e){}var element=parentElement.firstChild||null;if(element&&(element.tagName.toUpperCase()!=elementName)){element=element.getElementsByTagName(elementName)[0]}if(!element){element=document.createElement(elementName)}if(!element){return}if(arguments[1]){if(this._isStringOrNumber(arguments[1])||(arguments[1] instanceof Array)||arguments[1].tagName){this._children(element,arguments[1])}else{var attrs=this._attributes(arguments[1]);if(attrs.length){try{parentElement.innerHTML="<"+elementName+" "+attrs+"></"+elementName+">"}catch(e){}element=parentElement.firstChild||null;if(!element){element=document.createElement(elementName);for(attr in arguments[1]){element[attr=="class"?"className":attr]=arguments[1][attr]}}if(element.tagName.toUpperCase()!=elementName){element=parentElement.getElementsByTagName(elementName)[0]}}}}if(arguments[2]){this._children(element,arguments[2])}return $(element)},_text:function(text){return document.createTextNode(text)},ATTR_MAP:{className:"class",htmlFor:"for"},_attributes:function(attributes){var attrs=[];for(attribute in attributes){attrs.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+attributes[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"')}return attrs.join(" ")},_children:function(element,children){if(children.tagName){element.appendChild(children);return}if(typeof children=="object"){children.flatten().each(function(e){if(typeof e=="object"){element.appendChild(e)}else{if(Builder._isStringOrNumber(e)){element.appendChild(Builder._text(e))}}})}else{if(Builder._isStringOrNumber(children)){element.appendChild(Builder._text(children))}}},_isStringOrNumber:function(param){return(typeof param=="string"||typeof param=="number")},build:function(html){var element=this.node("div");Element.update($(element),html.strip());return Element.down(element)},dump:function(scope){if(typeof scope!="object"&&typeof scope!="function"){scope=window}var tags=("A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR").split(/\s+/);tags.each(function(tag){scope[tag]=function(){return Builder.node.apply(Builder,[tag].concat($A(arguments)))}})}};String.prototype.parseColor=function(){var color="#";if(this.slice(0,4)=="rgb("){var cols=this.slice(4,this.length-1).split(",");var i=0;do{color+=parseInt(cols[i]).toColorPart()}while(++i<3)}else{if(this.slice(0,1)=="#"){if(this.length==4){for(var i=1;i<4;i++){color+=(this.charAt(i)+this.charAt(i)).toLowerCase()}}if(this.length==7){color=this.toLowerCase()}}}return(color.length==7?color:(arguments[0]||this))};Element.collectTextNodes=function(element){return $A($(element).childNodes).collect(function(node){return(node.nodeType==3?node.nodeValue:(node.hasChildNodes()?Element.collectTextNodes(node):""))}).flatten().join("")};Element.collectTextNodesIgnoreClass=function(element,className){return $A($(element).childNodes).collect(function(node){return(node.nodeType==3?node.nodeValue:((node.hasChildNodes()&&!Element.hasClassName(node,className))?Element.collectTextNodesIgnoreClass(node,className):""))}).flatten().join("")};Element.setContentZoom=function(element,percent){element=$(element);Element.setStyle(element,{fontSize:(percent/100)+"em"});if(Prototype.Browser.WebKit){window.scrollBy(0,0)}return element};Element.getInlineOpacity=function(element){return $(element).style.opacity||""};Element.forceRerendering=function(element){try{element=$(element);var n=document.createTextNode(" ");element.appendChild(n);element.removeChild(n)}catch(e){}};var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},Transitions:{linear:Prototype.K,sinoidal:function(pos){return(-Math.cos(pos*Math.PI)/2)+0.5},reverse:function(pos){return 1-pos},flicker:function(pos){var pos=((-Math.cos(pos*Math.PI)/4)+0.75)+Math.random()/4;return pos>1?1:pos},wobble:function(pos){return(-Math.cos(pos*Math.PI*(9*pos))/2)+0.5},pulse:function(pos,pulses){return(-Math.cos((pos*((pulses||5)-0.5)*2)*Math.PI)/2)+0.5},spring:function(pos){return 1-(Math.cos(pos*4.5*Math.PI)*Math.exp(-pos*6))},none:function(pos){return 0},full:function(pos){return 1}},DefaultOptions:{duration:1,fps:100,sync:false,from:0,to:1,delay:0,queue:"parallel"},tagifyText:function(element){var tagifyStyle="position:relative";if(Prototype.Browser.IE){tagifyStyle+=";zoom:1"}element=$(element);$A(element.childNodes).each(function(child){if(child.nodeType==3){child.nodeValue.toArray().each(function(character){element.insertBefore(new Element("span",{style:tagifyStyle}).update(character==" "?String.fromCharCode(160):character),child)});Element.remove(child)}})},multiple:function(element,effect){var elements;if(((typeof element=="object")||Object.isFunction(element))&&(element.length)){elements=element}else{elements=$(element).childNodes}var options=Object.extend({speed:0.1,delay:0},arguments[2]||{});var masterDelay=options.delay;$A(elements).each(function(element,index){new effect(element,Object.extend(options,{delay:index*options.speed+masterDelay}))})},PAIRS:{slide:["SlideDown","SlideUp"],blind:["BlindDown","BlindUp"],appear:["Appear","Fade"]},toggle:function(element,effect,options){element=$(element);effect=(effect||"appear").toLowerCase();return Effect[Effect.PAIRS[effect][element.visible()?1:0]](element,Object.extend({queue:{position:"end",scope:(element.id||"global"),limit:1}},options||{}))}};Effect.DefaultOptions.transition=Effect.Transitions.sinoidal;Effect.ScopedQueue=Class.create(Enumerable,{initialize:function(){this.effects=[];this.interval=null},_each:function(iterator){this.effects._each(iterator)},add:function(effect){var timestamp=new Date().getTime();var position=Object.isString(effect.options.queue)?effect.options.queue:effect.options.queue.position;switch(position){case"front":this.effects.findAll(function(e){return e.state=="idle"}).each(function(e){e.startOn+=effect.finishOn;e.finishOn+=effect.finishOn});break;case"with-last":timestamp=this.effects.pluck("startOn").max()||timestamp;break;case"end":timestamp=this.effects.pluck("finishOn").max()||timestamp;break}effect.startOn+=timestamp;effect.finishOn+=timestamp;if(!effect.options.queue.limit||(this.effects.length<effect.options.queue.limit)){this.effects.push(effect)}if(!this.interval){this.interval=setInterval(this.loop.bind(this),15)}},remove:function(effect){this.effects=this.effects.reject(function(e){return e==effect});if(this.effects.length==0){clearInterval(this.interval);this.interval=null}},loop:function(){var timePos=new Date().getTime();for(var i=0,len=this.effects.length;i<len;i++){this.effects[i]&&this.effects[i].loop(timePos)}}});Effect.Queues={instances:$H(),get:function(queueName){if(!Object.isString(queueName)){return queueName}return this.instances.get(queueName)||this.instances.set(queueName,new Effect.ScopedQueue())}};Effect.Queue=Effect.Queues.get("global");Effect.Base=Class.create({position:null,start:function(options){if(options&&options.transition==false){options.transition=Effect.Transitions.linear}this.options=Object.extend(Object.extend({},Effect.DefaultOptions),options||{});this.currentFrame=0;this.state="idle";this.startOn=this.options.delay*1000;this.finishOn=this.startOn+(this.options.duration*1000);this.fromToDelta=this.options.to-this.options.from;this.totalTime=this.finishOn-this.startOn;this.totalFrames=this.options.fps*this.options.duration;this.render=(function(){function dispatch(effect,eventName){if(effect.options[eventName+"Internal"]){effect.options[eventName+"Internal"](effect)}if(effect.options[eventName]){effect.options[eventName](effect)}}return function(pos){if(this.state==="idle"){this.state="running";dispatch(this,"beforeSetup");if(this.setup){this.setup()}dispatch(this,"afterSetup")}if(this.state==="running"){pos=(this.options.transition(pos)*this.fromToDelta)+this.options.from;this.position=pos;dispatch(this,"beforeUpdate");if(this.update){this.update(pos)}dispatch(this,"afterUpdate")}}})();this.event("beforeStart");if(!this.options.sync){Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).add(this)}},loop:function(timePos){if(timePos>=this.startOn){if(timePos>=this.finishOn){this.render(1);this.cancel();this.event("beforeFinish");if(this.finish){this.finish()}this.event("afterFinish");return}var pos=(timePos-this.startOn)/this.totalTime,frame=(pos*this.totalFrames).round();if(frame>this.currentFrame){this.render(pos);this.currentFrame=frame}}},cancel:function(){if(!this.options.sync){Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).remove(this)}this.state="finished"},event:function(eventName){if(this.options[eventName+"Internal"]){this.options[eventName+"Internal"](this)}if(this.options[eventName]){this.options[eventName](this)}},inspect:function(){var data=$H();for(property in this){if(!Object.isFunction(this[property])){data.set(property,this[property])}}return"#<Effect:"+data.inspect()+",options:"+$H(this.options).inspect()+">"}});Effect.Parallel=Class.create(Effect.Base,{initialize:function(effects){this.effects=effects||[];this.start(arguments[1])},update:function(position){this.effects.invoke("render",position)},finish:function(position){this.effects.each(function(effect){effect.render(1);effect.cancel();effect.event("beforeFinish");if(effect.finish){effect.finish(position)}effect.event("afterFinish")})}});Effect.Tween=Class.create(Effect.Base,{initialize:function(object,from,to){object=Object.isString(object)?$(object):object;var args=$A(arguments),method=args.last(),options=args.length==5?args[3]:null;this.method=Object.isFunction(method)?method.bind(object):Object.isFunction(object[method])?object[method].bind(object):function(value){object[method]=value};this.start(Object.extend({from:from,to:to},options||{}))},update:function(position){this.method(position)}});Effect.Event=Class.create(Effect.Base,{initialize:function(){this.start(Object.extend({duration:0},arguments[0]||{}))},update:Prototype.emptyFunction});Effect.Opacity=Class.create(Effect.Base,{initialize:function(element){this.element=$(element);if(!this.element){throw (Effect._elementDoesNotExistError)}if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){Element.setStyle(this.element,{zoom:1})}var options=Object.extend({from:Element.getOpacity(this.element)||0,to:1},arguments[1]||{});this.start(options)},update:function(position){Element.setOpacity(this.element,position)}});Effect.Move=Class.create(Effect.Base,{initialize:function(element){this.element=$(element);if(!this.element){throw (Effect._elementDoesNotExistError)}var options=Object.extend({x:0,y:0,mode:"relative"},arguments[1]||{});this.start(options)},setup:function(){Element.makePositioned(this.element);this.originalLeft=parseFloat(Element.getStyle(this.element,"left")||"0");this.originalTop=parseFloat(Element.getStyle(this.element,"top")||"0");if(this.options.mode=="absolute"){this.options.x=this.options.x-this.originalLeft;this.options.y=this.options.y-this.originalTop}},update:function(position){Element.setStyle(this.element,{left:(this.options.x*position+this.originalLeft).round()+"px",top:(this.options.y*position+this.originalTop).round()+"px"})}});Effect.MoveBy=function(element,toTop,toLeft){return new Effect.Move(element,Object.extend({x:toLeft,y:toTop},arguments[3]||{}))};Effect.Scale=Class.create(Effect.Base,{initialize:function(element,percent){this.element=$(element);if(!this.element){throw (Effect._elementDoesNotExistError)}var options=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:percent},arguments[2]||{});this.start(options)},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||false;this.elementPositioning=Element.getStyle(this.element,"position");this.originalStyle={};["top","left","width","height","fontSize"].each(function(k){this.originalStyle[k]=this.element.style[k]}.bind(this));this.originalTop=this.element.offsetTop;this.originalLeft=this.element.offsetLeft;var fontSize=Element.getStyle(this.element,"font-size")||"100%";["em","px","%","pt"].each(function(fontSizeType){if(fontSize.indexOf(fontSizeType)>0){this.fontSize=parseFloat(fontSize);this.fontSizeType=fontSizeType}}.bind(this));this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;this.dims=null;if(this.options.scaleMode=="box"){this.dims=[this.element.offsetHeight,this.element.offsetWidth]}if(/^content/.test(this.options.scaleMode)){this.dims=[this.element.scrollHeight,this.element.scrollWidth]}if(!this.dims){this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth]}},update:function(position){var currentScale=(this.options.scaleFrom/100)+(this.factor*position);if(this.options.scaleContent&&this.fontSize){Element.setStyle(this.element,{fontSize:this.fontSize*currentScale+this.fontSizeType})}this.setDimensions(this.dims[0]*currentScale,this.dims[1]*currentScale)},finish:function(position){if(this.restoreAfterFinish){Element.setStyle(this.element,this.originalStyle)}},setDimensions:function(height,width){var d={};if(this.options.scaleX){d.width=width.round()+"px"}if(this.options.scaleY){d.height=height.round()+"px"}if(this.options.scaleFromCenter){var topd=(height-this.dims[0])/2;var leftd=(width-this.dims[1])/2;if(this.elementPositioning=="absolute"){if(this.options.scaleY){d.top=this.originalTop-topd+"px"}if(this.options.scaleX){d.left=this.originalLeft-leftd+"px"}}else{if(this.options.scaleY){d.top=-topd+"px"}if(this.options.scaleX){d.left=-leftd+"px"}}}Element.setStyle(this.element,d)}});Effect.Highlight=Class.create(Effect.Base,{initialize:function(element){this.element=$(element);if(!this.element){throw (Effect._elementDoesNotExistError)}var options=Object.extend({startcolor:"#ffff99"},arguments[1]||{});this.start(options)},setup:function(){if(Element.getStyle(this.element,"display")=="none"){this.cancel();return}this.oldStyle={};if(!this.options.keepBackgroundImage){this.oldStyle.backgroundImage=Element.getStyle(this.element,"background-image");Element.setStyle(this.element,{backgroundImage:"none"})}if(!this.options.endcolor){this.options.endcolor=Element.getStyle(this.element,"background-color").parseColor("#ffffff")}if(!this.options.restorecolor){this.options.restorecolor=Element.getStyle(this.element,"background-color")}this._base=$R(0,2).map(function(i){return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16)}.bind(this));this._delta=$R(0,2).map(function(i){return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i]}.bind(this))},update:function(position){Element.setStyle(this.element,{backgroundColor:$R(0,2).inject("#",function(m,v,i){return m+((this._base[i]+(this._delta[i]*position)).round().toColorPart())}.bind(this))})},finish:function(){Element.setStyle(this.element,Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}))}});Effect.ScrollTo=function(element){var options=arguments[1]||{},scrollOffsets=document.viewport.getScrollOffsets(),elementOffsets=Element.cumulativeOffset($(element));if(options.offset){elementOffsets[1]+=options.offset}return new Effect.Tween(null,scrollOffsets.top,elementOffsets[1],options,function(p){scrollTo(scrollOffsets.left,p.round())})};Effect.Fade=function(element){element=$(element);var oldOpacity=Element.getInlineOpacity(element);var options=Object.extend({from:Element.getOpacity(element)||1,to:0,afterFinishInternal:function(effect){if(effect.options.to!=0){return}Element.setStyle(Element.hide(effect.element),{opacity:oldOpacity})}},arguments[1]||{});return new Effect.Opacity(element,options)};Effect.Appear=function(element){element=$(element);var options=Object.extend({from:(Element.getStyle(element,"display")=="none"?0:Element.getOpacity(element)||0),to:1,afterFinishInternal:function(effect){effect.element.forceRerendering()},beforeSetup:function(effect){Element.show(Element.setOpacity(effect.element,effect.options.from))}},arguments[1]||{});return new Effect.Opacity(element,options)};Effect.Puff=function(element){element=$(element);var oldStyle={opacity:Element.getInlineOpacity(element),position:Element.getStyle(element,"position"),top:element.style.top,left:element.style.left,width:element.style.width,height:element.style.height};return new Effect.Parallel([new Effect.Scale(element,200,{sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(element,{sync:true,to:0})],Object.extend({duration:1,beforeSetupInternal:function(effect){Element.absolutize(effect.effects[0].element)},afterFinishInternal:function(effect){Element.setStyle(Element.hide(effect.effects[0].element),oldStyle)}},arguments[1]||{}))};Effect.BlindUp=function(element){element=$(element);Element.makeClipping(element);return new Effect.Scale(element,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(effect){Element.undoClipping(Element.hide(effect.element))}},arguments[1]||{}))};Effect.BlindDown=function(element){element=$(element);var elementDimensions=Element.getDimensions(element);return new Effect.Scale(element,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:elementDimensions.height,originalWidth:elementDimensions.width},restoreAfterFinish:true,afterSetup:function(effect){Element.show(Element.setStyle(Element.makeClipping(effect.element),{height:"0px"}))},afterFinishInternal:function(effect){Element.undoClipping(effect.element)}},arguments[1]||{}))};Effect.SwitchOff=function(element){element=$(element);var oldOpacity=Element.getInlineOpacity(element);return new Effect.Appear(element,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(effect){new Effect.Scale(effect.element,1,{duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function(effect){Element.makeClipping(Element.makePositioned(effect.element))},afterFinishInternal:function(effect){Element.setStyle(Element.undoPositioned(Element.undoClipping(Element.hide(effect.element))),{opacity:oldOpacity})}})}},arguments[1]||{}))};Effect.DropOut=function(element){element=$(element);var oldStyle={top:Element.getStyle(element,"top"),left:Element.getStyle(element,"left"),opacity:Element.getInlineOpacity(element)};return new Effect.Parallel([new Effect.Move(element,{x:0,y:100,sync:true}),new Effect.Opacity(element,{sync:true,to:0})],Object.extend({duration:0.5,beforeSetup:function(effect){Element.makePositioned(effect.effects[0].element)},afterFinishInternal:function(effect){Element.setStyle(Element.undoPositioned(Element.hide(effect.effects[0].element)),oldStyle)}},arguments[1]||{}))};Effect.Shake=function(element){element=$(element);var options=Object.extend({distance:20,duration:0.5},arguments[1]||{});var distance=parseFloat(options.distance);var split=parseFloat(options.duration)/10;var oldStyle={top:Element.getStyle(element,"top"),left:Element.getStyle(element,"left")};return new Effect.Move(element,{x:distance,y:0,duration:split,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:-distance*2,y:0,duration:split*2,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:distance*2,y:0,duration:split*2,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:-distance*2,y:0,duration:split*2,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:distance*2,y:0,duration:split*2,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:-distance,y:0,duration:split,afterFinishInternal:function(effect){Element.setStyle(Element.undoPositioned(effect.element),oldStyle)}})}})}})}})}})}})};Effect.SlideDown=function(element){element=Element.cleanWhitespace($(element));var oldInnerBottom=Element.getStyle(Element.down(element),"bottom");var elementDimensions=Element.getDimensions(element);return new Effect.Scale(element,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:elementDimensions.height,originalWidth:elementDimensions.width},restoreAfterFinish:true,afterSetup:function(effect){Element.makePositioned(effect.element);Element.makePositioned(Element.down(effect.element));if(window.opera){Element.setStyle(effect.element,{top:""})}Element.show(Element.setStyle(Element.makeClipping(effect.element),{height:"0px"}))},afterUpdateInternal:function(effect){Element.setStyle(Element.down(effect.element),{bottom:(effect.dims[0]-effect.element.clientHeight)+"px"})},afterFinishInternal:function(effect){Element.undoPositioned(Element.undoClipping(effect.element));Element.setStyle(Element.undoPositioned(Element.down(effect.element)),{bottom:oldInnerBottom})}},arguments[1]||{}))};Effect.SlideUp=function(element){element=Element.cleanWhitespace($(element));var oldInnerBottom=Element.getStyle(Element.down(element),"bottom");var elementDimensions=Element.getDimensions(element);return new Effect.Scale(element,window.opera?0:1,Object.extend({scaleContent:false,scaleX:false,scaleMode:"box",scaleFrom:100,scaleMode:{originalHeight:elementDimensions.height,originalWidth:elementDimensions.width},restoreAfterFinish:true,afterSetup:function(effect){Element.makePositioned(effect.element);Element.makePositioned(Element.down(effect.element));if(window.opera){Element.setStyle(effect.element,{top:""})}Element.show(Element.makeClipping(effect.element))},afterUpdateInternal:function(effect){Element.setStyle(Element.down(effect.element),{bottom:(effect.dims[0]-effect.element.clientHeight)+"px"})},afterFinishInternal:function(effect){Element.undoPositioned(Element.undoClipping(Element.hide(effect.element)));Element.setStyle(Element.undoPositioned(Element.down(effect.element)),{bottom:oldInnerBottom})}},arguments[1]||{}))};Effect.Squish=function(element){return new Effect.Scale(element,window.opera?1:0,{restoreAfterFinish:true,beforeSetup:function(effect){Element.makeClipping(effect.element)},afterFinishInternal:function(effect){Element.undoClipping(Element.hide(effect.element))}})};Effect.Grow=function(element){element=$(element);var options=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{});var oldStyle={top:element.style.top,left:element.style.left,height:element.style.height,width:element.style.width,opacity:Element.getInlineOpacity(element)};var dims=Element.getDimensions(element);var initialMoveX,initialMoveY;var moveX,moveY;switch(options.direction){case"top-left":initialMoveX=initialMoveY=moveX=moveY=0;break;case"top-right":initialMoveX=dims.width;initialMoveY=moveY=0;moveX=-dims.width;break;case"bottom-left":initialMoveX=moveX=0;initialMoveY=dims.height;moveY=-dims.height;break;case"bottom-right":initialMoveX=dims.width;initialMoveY=dims.height;moveX=-dims.width;moveY=-dims.height;break;case"center":initialMoveX=dims.width/2;initialMoveY=dims.height/2;moveX=-dims.width/2;moveY=-dims.height/2;break}return new Effect.Move(element,{x:initialMoveX,y:initialMoveY,duration:0.01,beforeSetup:function(effect){Element.makePositioned(Element.makeClipping(Element.hide(effect.element)))},afterFinishInternal:function(effect){new Effect.Parallel([new Effect.Opacity(effect.element,{sync:true,to:1,from:0,transition:options.opacityTransition}),new Effect.Move(effect.element,{x:moveX,y:moveY,sync:true,transition:options.moveTransition}),new Effect.Scale(effect.element,100,{scaleMode:{originalHeight:dims.height,originalWidth:dims.width},sync:true,scaleFrom:window.opera?1:0,transition:options.scaleTransition,restoreAfterFinish:true})],Object.extend({beforeSetup:function(effect){Element.show(Element.setStyle(effect.effects[0].element,{height:"0px"}))},afterFinishInternal:function(effect){Element.setStyle(Element.undoPositioned(Element.undoClipping(effect.effects[0].element)),oldStyle)}},options))}})};Effect.Shrink=function(element){element=$(element);var options=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{});var oldStyle={top:element.style.top,left:element.style.left,height:element.style.height,width:element.style.width,opacity:Element.getInlineOpacity(element)};var dims=Element.getDimensions(element);var moveX,moveY;switch(options.direction){case"top-left":moveX=moveY=0;break;case"top-right":moveX=dims.width;moveY=0;break;case"bottom-left":moveX=0;moveY=dims.height;break;case"bottom-right":moveX=dims.width;moveY=dims.height;break;case"center":moveX=dims.width/2;moveY=dims.height/2;break}return new Effect.Parallel([new Effect.Opacity(element,{sync:true,to:0,from:1,transition:options.opacityTransition}),new Effect.Scale(element,window.opera?1:0,{sync:true,transition:options.scaleTransition,restoreAfterFinish:true}),new Effect.Move(element,{x:moveX,y:moveY,sync:true,transition:options.moveTransition})],Object.extend({beforeStartInternal:function(effect){Element.makeClipping(Element.makePositioned(effect.effects[0].element))},afterFinishInternal:function(effect){Element.setStyle(Element.undoPositioned(Element.undoClipping(Element.hide(effect.effects[0].element))),oldStyle)}},options))};Effect.Pulsate=function(element){element=$(element);var options=arguments[1]||{},oldOpacity=Element.getInlineOpacity(element),transition=options.transition||Effect.Transitions.linear,reverser=function(pos){return 1-transition((-Math.cos((pos*(options.pulses||5)*2)*Math.PI)/2)+0.5)};return new Effect.Opacity(element,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(effect){Element.setStyle(effect.element,{opacity:oldOpacity})}},options),{transition:reverser}))};Effect.Fold=function(element){element=$(element);var oldStyle={top:element.style.top,left:element.style.left,width:element.style.width,height:element.style.height};Element.makeClipping(element);return new Effect.Scale(element,5,Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function(effect){new Effect.Scale(element,1,{scaleContent:false,scaleY:false,afterFinishInternal:function(effect){Element.setStyle(Element.undoClipping(Element.hide(effect.element)),oldStyle)}})}},arguments[1]||{}))};Effect.Morph=Class.create(Effect.Base,{initialize:function(element){this.element=$(element);if(!this.element){throw (Effect._elementDoesNotExistError)}var options=Object.extend({style:{}},arguments[1]||{});if(!Object.isString(options.style)){this.style=$H(options.style)}else{if(options.style.include(":")){this.style=options.style.parseStyle()}else{Element.addClassName(this.element,options.style);this.style=$H(Element.getStyles(this.element));Element.removeClassName(this.element,options.style);var css=Element.getStyles(this.element);this.style=this.style.reject(function(style){return style.value==css[style.key]});options.afterFinishInternal=function(effect){Element.addClassName(effect.element,effect.options.style);effect.transforms.each(function(transform){effect.element.style[transform.style]=""})}}}this.start(options)},setup:function(){function parseColor(color){if(!color||["rgba(0, 0, 0, 0)","transparent"].include(color)){color="#ffffff"}color=color.parseColor();return $R(0,2).map(function(i){return parseInt(color.slice(i*2+1,i*2+3),16)})}this.transforms=this.style.map(function(pair){var property=pair[0],value=pair[1],unit=null;if(value.parseColor("#zzzzzz")!="#zzzzzz"){value=value.parseColor();unit="color"}else{if(property=="opacity"){value=parseFloat(value);if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){Element.setStyle(this.element,{zoom:1})}}else{if(Element.CSS_LENGTH.test(value)){var components=value.match(/^([\+\-]?[0-9\.]+)(.*)$/);value=parseFloat(components[1]);unit=(components.length==3)?components[2]:null}}}var originalValue=Element.getStyle(this.element,property);return{style:property.camelize(),originalValue:unit=="color"?parseColor(originalValue):parseFloat(originalValue||0),targetValue:unit=="color"?parseColor(value):value,unit:unit}}.bind(this)).reject(function(transform){return((transform.originalValue==transform.targetValue)||(transform.unit!="color"&&(isNaN(transform.originalValue)||isNaN(transform.targetValue))))})},update:function(position){var style={},transform,i=this.transforms.length;while(i--){style[(transform=this.transforms[i]).style]=transform.unit=="color"?"#"+(Math.round(transform.originalValue[0]+(transform.targetValue[0]-transform.originalValue[0])*position)).toColorPart()+(Math.round(transform.originalValue[1]+(transform.targetValue[1]-transform.originalValue[1])*position)).toColorPart()+(Math.round(transform.originalValue[2]+(transform.targetValue[2]-transform.originalValue[2])*position)).toColorPart():(transform.originalValue+(transform.targetValue-transform.originalValue)*position).toFixed(3)+(transform.unit==null?"":transform.unit)}Element.setStyle(this.element,style,true)}});Effect.Transform=Class.create({initialize:function(tracks){this.tracks=[];this.options=arguments[1]||{};this.addTracks(tracks)},addTracks:function(tracks){tracks.each(function(track){track=$H(track);var data=track.values().first();this.tracks.push($H({ids:track.keys().first(),effect:Effect.Morph,options:{style:data}}))}.bind(this));return this},play:function(){return new Effect.Parallel(this.tracks.map(function(track){var ids=track.get("ids"),effect=track.get("effect"),options=track.get("options");var elements=[$(ids)||$$(ids)].flatten();return elements.map(function(e){return new effect(e,Object.extend({sync:true},options))})}).flatten(),this.options)}});Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderSpacing borderTopColor borderTopStyle borderTopWidth bottom clip color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop markerOffset maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex");Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;String.__parseStyleElement=document.createElement("div");String.prototype.parseStyle=function(){var style,styleRules=$H();if(Prototype.Browser.WebKit){style=new Element("div",{style:this}).style}else{String.__parseStyleElement.innerHTML='<div style="'+this+'"></div>';style=String.__parseStyleElement.childNodes[0].style}Element.CSS_PROPERTIES.each(function(property){if(style[property]){styleRules.set(property,style[property])}});if(Prototype.Browser.IE&&this.include("opacity")){styleRules.set("opacity",this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1])}return styleRules};if(document.defaultView&&document.defaultView.getComputedStyle){Element.getStyles=function(element){var css=document.defaultView.getComputedStyle($(element),null);return Element.CSS_PROPERTIES.inject({},function(styles,property){styles[property]=css[property];return styles})}}else{Element.getStyles=function(element){element=$(element);var css=element.currentStyle,styles;styles=Element.CSS_PROPERTIES.inject({},function(results,property){results[property]=css[property];return results});if(!styles.opacity){styles.opacity=Element.getOpacity(element)}return styles}}Effect.Methods={morph:function(element,style){element=$(element);new Effect.Morph(element,Object.extend({style:style},arguments[2]||{}));return element},visualEffect:function(element,effect,options){element=$(element);var s=effect.dasherize().camelize(),klass=s.charAt(0).toUpperCase()+s.substring(1);new Effect[klass](element,options);return element},highlight:function(element,options){element=$(element);new Effect.Highlight(element,options);return element}};$w("fade appear grow shrink fold blindUp blindDown slideUp slideDown pulsate shake puff squish switchOff dropOut").each(function(effect){Effect.Methods[effect]=function(element,options){element=$(element);Effect[effect.charAt(0).toUpperCase()+effect.substring(1)](element,options);return element}});$w("getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles").each(function(f){Effect.Methods[f]=Element[f]});Element.addMethods(Effect.Methods);if(Object.isUndefined(Effect)){throw ("dragdrop.js requires including script.aculo.us' effects.js library")}var Droppables={drops:[],remove:function(element){this.drops=this.drops.reject(function(d){return d.element==$(element)})},add:function(element){element=$(element);var options=Object.extend({greedy:true,hoverclass:null,tree:false},arguments[1]||{});if(options.containment){options._containers=[];var containment=options.containment;if(Object.isArray(containment)){containment.each(function(c){options._containers.push($(c))})}else{options._containers.push($(containment))}}if(options.accept){options.accept=[options.accept].flatten()}Element.makePositioned(element);options.element=element;this.drops.push(options)},findDeepestChild:function(drops){deepest=drops[0];for(i=1;i<drops.length;++i){if(Element.isParent(drops[i].element,deepest.element)){deepest=drops[i]}}return deepest},isContained:function(element,drop){var containmentNode;if(drop.tree){containmentNode=element.treeNode}else{containmentNode=element.parentNode}return drop._containers.detect(function(c){return containmentNode==c})},isAffected:function(point,element,drop){return((drop.element!=element)&&((!drop._containers)||this.isContained(element,drop))&&((!drop.accept)||(Element.classNames(element).detect(function(v){return drop.accept.include(v)})))&&Element.within(drop.element,point[0],point[1]))},deactivate:function(drop){if(drop.hoverclass){Element.removeClassName(drop.element,drop.hoverclass)}this.last_active=null},activate:function(drop){if(drop.hoverclass){Element.addClassName(drop.element,drop.hoverclass)}this.last_active=drop},show:function(point,element){if(!this.drops.length){return}var drop,affected=[];this.drops.each(function(drop){if(Droppables.isAffected(point,element,drop)){affected.push(drop)}});if(affected.length>0){drop=Droppables.findDeepestChild(affected)}if(this.last_active&&this.last_active!=drop){this.deactivate(this.last_active)}if(drop){Element.within(drop.element,point[0],point[1]);if(drop.onHover){drop.onHover(element,drop.element,Element.overlap(drop.overlap,drop.element))}if(drop!=this.last_active){Droppables.activate(drop)}}},fire:function(event,element){if(!this.last_active){return}if(this.isAffected([Event.pointerX(event),Event.pointerY(event)],element,this.last_active)){if(this.last_active.onDrop){this.last_active.onDrop(element,this.last_active.element,event);return true}}},reset:function(){if(this.last_active){this.deactivate(this.last_active)}}};var Draggables={drags:[],observers:[],register:function(draggable){if(this.drags.length==0){this.eventMouseUp=this.endDrag.bindAsEventListener(this);this.eventMouseMove=this.updateDrag.bindAsEventListener(this);this.eventKeypress=this.keyPress.bindAsEventListener(this);Event.observe(document,"mouseup",this.eventMouseUp);Event.observe(document,"mousemove",this.eventMouseMove);Event.observe(document,"keypress",this.eventKeypress)}this.drags.push(draggable)},unregister:function(draggable){this.drags=this.drags.reject(function(d){return d==draggable});if(this.drags.length==0){Event.stopObserving(document,"mouseup",this.eventMouseUp);Event.stopObserving(document,"mousemove",this.eventMouseMove);Event.stopObserving(document,"keypress",this.eventKeypress)}},activate:function(draggable){if(draggable.options.delay){this._timeout=setTimeout(function(){Draggables._timeout=null;window.focus();Draggables.activeDraggable=draggable}.bind(this),draggable.options.delay)}else{window.focus();this.activeDraggable=draggable}},deactivate:function(){this.activeDraggable=null},updateDrag:function(event){if(!this.activeDraggable){return}var pointer=[Event.pointerX(event),Event.pointerY(event)];if(this._lastPointer&&(this._lastPointer.inspect()==pointer.inspect())){return}this._lastPointer=pointer;this.activeDraggable.updateDrag(event,pointer)},endDrag:function(event){if(this._timeout){clearTimeout(this._timeout);this._timeout=null}if(!this.activeDraggable){return}this._lastPointer=null;this.activeDraggable.endDrag(event);this.activeDraggable=null},keyPress:function(event){if(this.activeDraggable){this.activeDraggable.keyPress(event)}},addObserver:function(observer){this.observers.push(observer);this._cacheObserverCallbacks()},removeObserver:function(element){this.observers=this.observers.reject(function(o){return o.element==element});this._cacheObserverCallbacks()},notify:function(eventName,draggable,event){if(this[eventName+"Count"]>0){this.observers.each(function(o){if(o[eventName]){o[eventName](eventName,draggable,event)}})}if(draggable.options[eventName]){draggable.options[eventName](draggable,event)}},_cacheObserverCallbacks:function(){["onStart","onEnd","onDrag"].each(function(eventName){Draggables[eventName+"Count"]=Draggables.observers.select(function(o){return o[eventName]}).length})}};var Draggable=Class.create({initialize:function(element){var defaults={handle:false,reverteffect:function(element,top_offset,left_offset){var dur=Math.sqrt(Math.abs(top_offset^2)+Math.abs(left_offset^2))*0.02;new Effect.Move(element,{x:-left_offset,y:-top_offset,duration:dur,queue:{scope:"_draggable",position:"end"}})},endeffect:function(element){var toOpacity=Object.isNumber(element._opacity)?element._opacity:1;new Effect.Opacity(element,{duration:0.2,from:0.7,to:toOpacity,queue:{scope:"_draggable",position:"end"},afterFinish:function(){Draggable._dragging[element]=false}})},zindex:1000,revert:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,snap:false,delay:0};if(!arguments[1]||Object.isUndefined(arguments[1].endeffect)){Object.extend(defaults,{starteffect:function(element){element._opacity=Element.getOpacity(element);Draggable._dragging[element]=true;new Effect.Opacity(element,{duration:0.2,from:element._opacity,to:0.7})}})}var options=Object.extend(defaults,arguments[1]||{});this.element=$(element);if(options.handle&&Object.isString(options.handle)){this.handle=Element.down(this.element,"."+options.handle,0)}if(!this.handle){this.handle=$(options.handle)}if(!this.handle){this.handle=this.element}if(options.scroll&&!options.scroll.scrollTo&&!options.scroll.outerHTML){options.scroll=$(options.scroll);this._isScrollChild=Element.childOf(this.element,options.scroll)}Element.makePositioned(this.element);this.options=options;this.dragging=false;this.eventMouseDown=this.initDrag.bindAsEventListener(this);Event.observe(this.handle,"mousedown",this.eventMouseDown);Draggables.register(this)},destroy:function(){Event.stopObserving(this.handle,"mousedown",this.eventMouseDown);Draggables.unregister(this)},currentDelta:function(){var offset=Element.cumulativeOffset(this.element);return([offset.left,offset.top])},initDrag:function(event){if(!Object.isUndefined(Draggable._dragging[this.element])&&Draggable._dragging[this.element]){return}if(Event.isLeftClick(event)){var src=Event.element(event);if((tag_name=src.tagName.toUpperCase())&&(tag_name=="INPUT"||tag_name=="SELECT"||tag_name=="OPTION"||tag_name=="BUTTON"||tag_name=="TEXTAREA")){return}var pointer=[Event.pointerX(event),Event.pointerY(event)];var pos=Element.cumulativeOffset(this.element);this.offset=[0,1].map(function(i){return(pointer[i]-pos[i])});Draggables.activate(this);Event.stop(event)}},startDrag:function(event){this.dragging=true;if(!this.delta){this.delta=this.currentDelta()}if(this.options.zindex){this.originalZ=parseInt(Element.getStyle(this.element,"z-index")||0);this.element.style.zIndex=this.options.zindex}if(this.options.ghosting){this._clone=this.element.cloneNode(true);this._originallyAbsolute=(Element.getStyle(this.element,"position")=="absolute");if(!this._originallyAbsolute){Element.absolutize(this.element)}this.element.parentNode.insertBefore(this._clone,this.element)}if(this.options.scroll){if(this.options.scroll==window){var where=this._getWindowScroll(this.options.scroll);this.originalScrollLeft=where.left;this.originalScrollTop=where.top}else{this.originalScrollLeft=this.options.scroll.scrollLeft;this.originalScrollTop=this.options.scroll.scrollTop}}Draggables.notify("onStart",this,event);if(this.options.starteffect){this.options.starteffect(this.element)}},updateDrag:function(event,pointer){if(!this.dragging){this.startDrag(event)}if(!this.options.quiet){Droppables.show(pointer,this.element)}Draggables.notify("onDrag",this,event);this.draw(pointer);if(this.options.change){this.options.change(this)}if(this.options.scroll){this.stopScrolling();var p;if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){p=[left,top,left+width,top+height]}}else{p=Element.page(this.options.scroll).toArray();p[0]+=this.options.scroll.scrollLeft+Element.deltaX;p[1]+=this.options.scroll.scrollTop+Element.deltaY;p.push(p[0]+this.options.scroll.offsetWidth);p.push(p[1]+this.options.scroll.offsetHeight)}var speed=[0,0];if(pointer[0]<(p[0]+this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[0]+this.options.scrollSensitivity)}if(pointer[1]<(p[1]+this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[1]+this.options.scrollSensitivity)}if(pointer[0]>(p[2]-this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[2]-this.options.scrollSensitivity)}if(pointer[1]>(p[3]-this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[3]-this.options.scrollSensitivity)}this.startScrolling(speed)}if(Prototype.Browser.WebKit){window.scrollBy(0,0)}Event.stop(event)},finishDrag:function(event,success){this.dragging=false;if(this.options.quiet){var pointer=[Event.pointerX(event),Event.pointerY(event)];Droppables.show(pointer,this.element)}if(this.options.ghosting){if(!this._originallyAbsolute){Element.relativize(this.element)}delete this._originallyAbsolute;Element.remove(this._clone);this._clone=null}var dropped=false;if(success){dropped=Droppables.fire(event,this.element);if(!dropped){dropped=false}}if(dropped&&this.options.onDropped){this.options.onDropped(this.element)}Draggables.notify("onEnd",this,event);var revert=this.options.revert;if(revert&&Object.isFunction(revert)){revert=revert(this.element)}var d=this.currentDelta();if(revert&&this.options.reverteffect){if(dropped==0||revert!="failure"){this.options.reverteffect(this.element,d[1]-this.delta[1],d[0]-this.delta[0])}}else{this.delta=d}if(this.options.zindex){this.element.style.zIndex=this.originalZ}if(this.options.endeffect){this.options.endeffect(this.element)}Draggables.deactivate(this);Droppables.reset()},keyPress:function(event){if(event.keyCode!=Event.KEY_ESC){return}this.finishDrag(event,false);Event.stop(event)},endDrag:function(event){if(!this.dragging){return}this.stopScrolling();this.finishDrag(event,true);Event.stop(event)},draw:function(point){var pos=Element.cumulativeOffset(this.element);if(this.options.ghosting){var r=Element.realOffset(this.element);pos[0]+=r[0]-Element.deltaX;pos[1]+=r[1]-Element.deltaY}var d=this.currentDelta();pos[0]-=d[0];pos[1]-=d[1];if(this.options.scroll&&(this.options.scroll!=window&&this._isScrollChild)){pos[0]-=this.options.scroll.scrollLeft-this.originalScrollLeft;pos[1]-=this.options.scroll.scrollTop-this.originalScrollTop}var p=[0,1].map(function(i){return(point[i]-pos[i]-this.offset[i])}.bind(this));if(this.options.snap){if(Object.isFunction(this.options.snap)){p=this.options.snap(p[0],p[1],this)}else{if(Object.isArray(this.options.snap)){p=p.map(function(v,i){return(v/this.options.snap[i]).round()*this.options.snap[i]}.bind(this))}else{p=p.map(function(v){return(v/this.options.snap).round()*this.options.snap}.bind(this))}}}var style=this.element.style;if((!this.options.constraint)||(this.options.constraint=="horizontal")){style.left=p[0]+"px"}if((!this.options.constraint)||(this.options.constraint=="vertical")){style.top=p[1]+"px"}if(style.visibility=="hidden"){style.visibility=""}},stopScrolling:function(){if(this.scrollInterval){clearInterval(this.scrollInterval);this.scrollInterval=null;Draggables._lastScrollPointer=null}},startScrolling:function(speed){if(!(speed[0]||speed[1])){return}this.scrollSpeed=[speed[0]*this.options.scrollSpeed,speed[1]*this.options.scrollSpeed];this.lastScrolled=new Date();this.scrollInterval=setInterval(this.scroll.bind(this),10)},scroll:function(){var current=new Date();var delta=current-this.lastScrolled;this.lastScrolled=current;if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){if(this.scrollSpeed[0]||this.scrollSpeed[1]){var d=delta/1000;this.options.scroll.scrollTo(left+d*this.scrollSpeed[0],top+d*this.scrollSpeed[1])}}}else{this.options.scroll.scrollLeft+=this.scrollSpeed[0]*delta/1000;this.options.scroll.scrollTop+=this.scrollSpeed[1]*delta/1000}Droppables.show(Draggables._lastPointer,this.element);Draggables.notify("onDrag",this);if(this._isScrollChild){Draggables._lastScrollPointer=Draggables._lastScrollPointer||$A(Draggables._lastPointer);Draggables._lastScrollPointer[0]+=this.scrollSpeed[0]*delta/1000;Draggables._lastScrollPointer[1]+=this.scrollSpeed[1]*delta/1000;if(Draggables._lastScrollPointer[0]<0){Draggables._lastScrollPointer[0]=0}if(Draggables._lastScrollPointer[1]<0){Draggables._lastScrollPointer[1]=0}this.draw(Draggables._lastScrollPointer)}if(this.options.change){this.options.change(this)}},_getWindowScroll:function(w){var T,L,W,H;with(w.document){if(w.document.documentElement&&documentElement.scrollTop){T=documentElement.scrollTop;L=documentElement.scrollLeft}else{if(w.document.body){T=body.scrollTop;L=body.scrollLeft}}if(w.innerWidth){W=w.innerWidth;H=w.innerHeight}else{if(w.document.documentElement&&documentElement.clientWidth){W=documentElement.clientWidth;H=documentElement.clientHeight}else{W=body.offsetWidth;H=body.offsetHeight}}}return{top:T,left:L,width:W,height:H}}});Draggable._dragging={};var SortableObserver=Class.create({initialize:function(element,observer){this.element=$(element);this.observer=observer;this.lastValue=Sortable.serialize(this.element)},onStart:function(){this.lastValue=Sortable.serialize(this.element)},onEnd:function(){Sortable.unmark();if(this.lastValue!=Sortable.serialize(this.element)){this.observer(this.element)}}});var Sortable={SERIALIZE_RULE:/^[^_\-](?:[A-Za-z0-9\-\_]*)[_](.*)$/,sortables:{},_findRootElement:function(element){while(element.tagName.toUpperCase()!="BODY"){if(element.id&&Sortable.sortables[element.id]){return element}element=element.parentNode}},options:function(element){element=Sortable._findRootElement($(element));if(!element){return}return Sortable.sortables[element.id]},destroy:function(element){element=$(element);var s=Sortable.sortables[element.id];if(s){Draggables.removeObserver(s.element);s.droppables.each(function(d){Droppables.remove(d)});s.draggables.invoke("destroy");delete Sortable.sortables[s.element.id]}},create:function(element){element=$(element);var options=Object.extend({element:element,tag:"li",dropOnEmpty:false,tree:false,treeTag:"ul",overlap:"vertical",constraint:"vertical",containment:element,handle:false,only:false,delay:0,hoverclass:null,ghosting:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,format:this.SERIALIZE_RULE,elements:false,handles:false,onChange:Prototype.emptyFunction,onUpdate:Prototype.emptyFunction},arguments[1]||{});this.destroy(element);var options_for_draggable={revert:true,quiet:options.quiet,scroll:options.scroll,scrollSpeed:options.scrollSpeed,scrollSensitivity:options.scrollSensitivity,delay:options.delay,ghosting:options.ghosting,constraint:options.constraint,handle:options.handle};if(options.starteffect){options_for_draggable.starteffect=options.starteffect}if(options.reverteffect){options_for_draggable.reverteffect=options.reverteffect}else{if(options.ghosting){options_for_draggable.reverteffect=function(element){element.style.top=0;element.style.left=0}}}if(options.endeffect){options_for_draggable.endeffect=options.endeffect}if(options.zindex){options_for_draggable.zindex=options.zindex}var options_for_droppable={overlap:options.overlap,containment:options.containment,tree:options.tree,hoverclass:options.hoverclass,onHover:Sortable.onHover};var options_for_tree={onHover:Sortable.onEmptyHover,overlap:options.overlap,containment:options.containment,hoverclass:options.hoverclass};Element.cleanWhitespace(element);options.draggables=[];options.droppables=[];if(options.dropOnEmpty||options.tree){Droppables.add(element,options_for_tree);options.droppables.push(element)}(options.elements||this.findElements(element,options)||[]).each(function(e,i){var handle=options.handles?$(options.handles[i]):(options.handle?$(e).select("."+options.handle)[0]:e);options.draggables.push(new Draggable(e,Object.extend(options_for_draggable,{handle:handle})));Droppables.add(e,options_for_droppable);if(options.tree){e.treeNode=element}options.droppables.push(e)});if(options.tree){(Sortable.findTreeElements(element,options)||[]).each(function(e){Droppables.add(e,options_for_tree);e.treeNode=element;options.droppables.push(e)})}this.sortables[Element.identify(element)]=options;Draggables.addObserver(new SortableObserver(element,options.onUpdate))},findElements:function(element,options){return Element.findChildren(element,options.only,options.tree?true:false,options.tag)},findTreeElements:function(element,options){return Element.findChildren(element,options.only,options.tree?true:false,options.treeTag)},onHover:function(element,dropon,overlap){if(Element.isParent(dropon,element)){return}if(overlap>0.33&&overlap<0.66&&Sortable.options(dropon).tree){return}else{if(overlap>0.5){Sortable.mark(dropon,"before");if(dropon.previousSibling!=element){var oldParentNode=element.parentNode;element.style.visibility="hidden";dropon.parentNode.insertBefore(element,dropon);if(dropon.parentNode!=oldParentNode){Sortable.options(oldParentNode).onChange(element)}Sortable.options(dropon.parentNode).onChange(element)}}else{Sortable.mark(dropon,"after");var nextElement=dropon.nextSibling||null;if(nextElement!=element){var oldParentNode=element.parentNode;element.style.visibility="hidden";dropon.parentNode.insertBefore(element,nextElement);if(dropon.parentNode!=oldParentNode){Sortable.options(oldParentNode).onChange(element)}Sortable.options(dropon.parentNode).onChange(element)}}}},onEmptyHover:function(element,dropon,overlap){var oldParentNode=element.parentNode;var droponOptions=Sortable.options(dropon);if(!Element.isParent(dropon,element)){var index;var children=Sortable.findElements(dropon,{tag:droponOptions.tag,only:droponOptions.only});var child=null;if(children){var offset=Element.offsetSize(dropon,droponOptions.overlap)*(1-overlap);for(index=0;index<children.length;index+=1){if(offset-Element.offsetSize(children[index],droponOptions.overlap)>=0){offset-=Element.offsetSize(children[index],droponOptions.overlap)}else{if(offset-(Element.offsetSize(children[index],droponOptions.overlap)/2)>=0){child=index+1<children.length?children[index+1]:null;break}else{child=children[index];break}}}}dropon.insertBefore(element,child);Sortable.options(oldParentNode).onChange(element);droponOptions.onChange(element)}},unmark:function(){if(Sortable._marker){Sortable._marker.hide()}},mark:function(dropon,position){var sortable=Sortable.options(dropon.parentNode);if(sortable&&!sortable.ghosting){return}if(!Sortable._marker){Sortable._marker=($("dropmarker")||Element.extend(document.createElement("DIV"))).hide().addClassName("dropmarker").setStyle({position:"absolute"});document.getElementsByTagName("body").item(0).appendChild(Sortable._marker)}var offsets=Element.cumulativeOffset(dropon);Sortable._marker.setStyle({left:offsets[0]+"px",top:offsets[1]+"px"});if(position=="after"){if(sortable.overlap=="horizontal"){Sortable._marker.setStyle({left:(offsets[0]+dropon.clientWidth)+"px"})}else{Sortable._marker.setStyle({top:(offsets[1]+dropon.clientHeight)+"px"})}}Sortable._marker.show()},_tree:function(element,options,parent){var children=Sortable.findElements(element,options)||[];for(var i=0;i<children.length;++i){var match=children[i].id.match(options.format);if(!match){continue}var child={id:encodeURIComponent(match?match[1]:null),element:element,parent:parent,children:[],position:parent.children.length,container:$(children[i]).down(options.treeTag)};if(child.container){this._tree(child.container,options,child)}parent.children.push(child)}return parent},tree:function(element){element=$(element);var sortableOptions=this.options(element);var options=Object.extend({tag:sortableOptions.tag,treeTag:sortableOptions.treeTag,only:sortableOptions.only,name:element.id,format:sortableOptions.format},arguments[1]||{});var root={id:null,parent:null,children:[],container:element,position:0};return Sortable._tree(element,options,root)},_constructIndex:function(node){var index="";do{if(node.id){index="["+node.position+"]"+index}}while((node=node.parent)!=null);return index},sequence:function(element){element=$(element);var options=Object.extend(this.options(element),arguments[1]||{});return $(this.findElements(element,options)||[]).map(function(item){return item.id.match(options.format)?item.id.match(options.format)[1]:""})},setSequence:function(element,new_sequence){element=$(element);var options=Object.extend(this.options(element),arguments[2]||{});var nodeMap={};this.findElements(element,options).each(function(n){if(n.id.match(options.format)){nodeMap[n.id.match(options.format)[1]]=[n,n.parentNode]}n.parentNode.removeChild(n)});new_sequence.each(function(ident){var n=nodeMap[ident];if(n){n[1].appendChild(n[0]);delete nodeMap[ident]}})},serialize:function(element){element=$(element);var options=Object.extend(Sortable.options(element),arguments[1]||{});var name=encodeURIComponent((arguments[1]&&arguments[1].name)?arguments[1].name:element.id);if(options.tree){return Sortable.tree(element,arguments[1]).children.map(function(item){return[name+Sortable._constructIndex(item)+"[id]="+encodeURIComponent(item.id)].concat(item.children.map(arguments.callee))}).flatten().join("&")}else{return Sortable.sequence(element,arguments[1]).map(function(item){return name+"[]="+encodeURIComponent(item)}).join("&")}}};Element.isParent=function(child,element){if(!child.parentNode||child==element){return false}if(child.parentNode==element){return true}return Element.isParent(child.parentNode,element)};Element.findChildren=function(element,only,recursive,tagName){if(!element.hasChildNodes()){return null}tagName=tagName.toUpperCase();if(only){only=[only].flatten()}var elements=[];$A(element.childNodes).each(function(e){if(e.tagName&&e.tagName.toUpperCase()==tagName&&(!only||(Element.classNames(e).detect(function(v){return only.include(v)})))){elements.push(e)}if(recursive){var grandchildren=Element.findChildren(e,only,recursive,tagName);if(grandchildren){elements.push(grandchildren)}}});return(elements.length>0?elements.flatten():[])};Element.offsetSize=function(element,type){return element["offset"+((type=="vertical"||type=="height")?"Height":"Width")]};if(typeof Effect=="undefined"){throw ("controls.js requires including script.aculo.us' effects.js library")}if(!Control){var Control={}}Control.Slider=Class.create({initialize:function(handle,track,options){var slider=this;if(Object.isArray(handle)){this.handles=handle.collect(function(e){return $(e)})}else{this.handles=[$(handle)]}this.track=$(track);this.options=options||{};this.axis=this.options.axis||"horizontal";this.increment=this.options.increment||1;this.step=parseInt(this.options.step||"1");this.range=this.options.range||$R(0,1);this.value=0;this.values=this.handles.map(function(){return 0});this.spans=this.options.spans?this.options.spans.map(function(s){return $(s)}):false;this.options.startSpan=$(this.options.startSpan||null);this.options.endSpan=$(this.options.endSpan||null);this.restricted=this.options.restricted||false;this.maximum=this.options.maximum||this.range.end;this.minimum=this.options.minimum||this.range.start;this.alignX=parseInt(this.options.alignX||"0");this.alignY=parseInt(this.options.alignY||"0");this.trackLength=this.maximumOffset()-this.minimumOffset();this.handleLength=this.isVertical()?(this.handles[0].offsetHeight!=0?this.handles[0].offsetHeight:this.handles[0].style.height.replace(/px$/,"")):(this.handles[0].offsetWidth!=0?this.handles[0].offsetWidth:this.handles[0].style.width.replace(/px$/,""));this.active=false;this.dragging=false;this.disabled=false;if(this.options.disabled){this.setDisabled()}this.allowedValues=this.options.values?this.options.values.sortBy(Prototype.K):false;if(this.allowedValues){this.minimum=this.allowedValues.min();this.maximum=this.allowedValues.max()}this.eventMouseDown=this.startDrag.bindAsEventListener(this);this.eventMouseUp=this.endDrag.bindAsEventListener(this);this.eventMouseMove=this.update.bindAsEventListener(this);this.handles.each(function(h,i){i=slider.handles.length-1-i;slider.setValue(parseFloat((Object.isArray(slider.options.sliderValue)?slider.options.sliderValue[i]:slider.options.sliderValue)||slider.range.start),i);h.makePositioned().observe("mousedown",slider.eventMouseDown)});this.track.observe("mousedown",this.eventMouseDown);document.observe("mouseup",this.eventMouseUp);document.observe("mousemove",this.eventMouseMove);this.initialized=true},dispose:function(){var slider=this;Event.stopObserving(this.track,"mousedown",this.eventMouseDown);Event.stopObserving(document,"mouseup",this.eventMouseUp);Event.stopObserving(document,"mousemove",this.eventMouseMove);this.handles.each(function(h){Event.stopObserving(h,"mousedown",slider.eventMouseDown)})},setDisabled:function(){this.disabled=true},setEnabled:function(){this.disabled=false},getNearestValue:function(value){if(this.allowedValues){if(value>=this.allowedValues.max()){return(this.allowedValues.max())}if(value<=this.allowedValues.min()){return(this.allowedValues.min())}var offset=Math.abs(this.allowedValues[0]-value);var newValue=this.allowedValues[0];this.allowedValues.each(function(v){var currentOffset=Math.abs(v-value);if(currentOffset<=offset){newValue=v;offset=currentOffset}});return newValue}if(value>this.range.end){return this.range.end}if(value<this.range.start){return this.range.start}return value},setValue:function(sliderValue,handleIdx){if(!this.active){this.activeHandleIdx=handleIdx||0;this.activeHandle=this.handles[this.activeHandleIdx];this.updateStyles()}handleIdx=handleIdx||this.activeHandleIdx||0;if(this.initialized&&this.restricted){if((handleIdx>0)&&(sliderValue<this.values[handleIdx-1])){sliderValue=this.values[handleIdx-1]}if((handleIdx<(this.handles.length-1))&&(sliderValue>this.values[handleIdx+1])){sliderValue=this.values[handleIdx+1]}}sliderValue=this.getNearestValue(sliderValue);this.values[handleIdx]=sliderValue;this.value=this.values[0];this.handles[handleIdx].style[this.isVertical()?"top":"left"]=this.translateToPx(sliderValue);this.drawSpans();if(!this.dragging||!this.event){this.updateFinished()}},setValueBy:function(delta,handleIdx){this.setValue(this.values[handleIdx||this.activeHandleIdx||0]+delta,handleIdx||this.activeHandleIdx||0)},translateToPx:function(value){return Math.round(((this.trackLength-this.handleLength)/(this.range.end-this.range.start))*(value-this.range.start))+"px"},translateToValue:function(offset){return((offset/(this.trackLength-this.handleLength)*(this.range.end-this.range.start))+this.range.start)},getRange:function(range){var v=this.values.sortBy(Prototype.K);range=range||0;return $R(v[range],v[range+1])},minimumOffset:function(){return(this.isVertical()?this.alignY:this.alignX)},maximumOffset:function(){return(this.isVertical()?(this.track.offsetHeight!=0?this.track.offsetHeight:this.track.style.height.replace(/px$/,""))-this.alignY:(this.track.offsetWidth!=0?this.track.offsetWidth:this.track.style.width.replace(/px$/,""))-this.alignX)},isVertical:function(){return(this.axis=="vertical")},drawSpans:function(){var slider=this;if(this.spans){$R(0,this.spans.length-1).each(function(r){slider.setSpan(slider.spans[r],slider.getRange(r))})}if(this.options.startSpan){this.setSpan(this.options.startSpan,$R(0,this.values.length>1?this.getRange(0).min():this.value))}if(this.options.endSpan){this.setSpan(this.options.endSpan,$R(this.values.length>1?this.getRange(this.spans.length-1).max():this.value,this.maximum))}},setSpan:function(span,range){if(this.isVertical()){span.style.top=this.translateToPx(range.start);span.style.height=this.translateToPx(range.end-range.start+this.range.start)}else{span.style.left=this.translateToPx(range.start);span.style.width=this.translateToPx(range.end-range.start+this.range.start)}},updateStyles:function(){this.handles.each(function(h){Element.removeClassName(h,"selected")});Element.addClassName(this.activeHandle,"selected")},startDrag:function(event){if(Event.isLeftClick(event)){if(!this.disabled){this.active=true;var handle=Event.element(event);var pointer=[Event.pointerX(event),Event.pointerY(event)];var track=handle;if(track==this.track){var offsets=Element.cumulativeOffset(this.track);this.event=event;this.setValue(this.translateToValue((this.isVertical()?pointer[1]-offsets[1]:pointer[0]-offsets[0])-(this.handleLength/2)));var offsets=Element.cumulativeOffset(this.activeHandle);this.offsetX=(pointer[0]-offsets[0]);this.offsetY=(pointer[1]-offsets[1])}else{while((this.handles.indexOf(handle)==-1)&&handle.parentNode){handle=handle.parentNode}if(this.handles.indexOf(handle)!=-1){this.activeHandle=handle;this.activeHandleIdx=this.handles.indexOf(this.activeHandle);this.updateStyles();var offsets=Element.cumulativeOffset(this.activeHandle);this.offsetX=(pointer[0]-offsets[0]);this.offsetY=(pointer[1]-offsets[1])}}}Event.stop(event)}},update:function(event){if(this.active){if(!this.dragging){this.dragging=true}this.draw(event);if(Prototype.Browser.WebKit){window.scrollBy(0,0)}Event.stop(event)}},draw:function(event){var pointer=[Event.pointerX(event),Event.pointerY(event)];var offsets=Element.cumulativeOffset(this.track);pointer[0]-=this.offsetX+offsets[0];pointer[1]-=this.offsetY+offsets[1];this.event=event;this.setValue(this.translateToValue(this.isVertical()?pointer[1]:pointer[0]));if(this.initialized&&this.options.onSlide){this.options.onSlide(this.values.length>1?this.values:this.value,this)}},endDrag:function(event){if(this.active&&this.dragging){this.finishDrag(event,true);Event.stop(event)}this.active=false;this.dragging=false},finishDrag:function(event,success){this.active=false;this.dragging=false;this.updateFinished()},updateFinished:function(){if(this.initialized&&this.options.onChange){this.options.onChange(this.values.length>1?this.values:this.value,this)}this.event=null}});


// *** END Prototype ******************************************************************************



//************ Prototype Functions **************
Object.defineProperty(Object.prototype, "mergeObject", {
    enumerable: false,
    value: function () {
        var override = true,
            dest = this,
            len = arguments.length,
            props, merge, i, from;

        if (typeof(arguments[arguments.length - 1]) == "boolean") {
            override = arguments[arguments.length - 1];
            len = arguments.length - 1;
        }

        for (i = 0; i < len; i++) {
            from = arguments[i];
			if (from == undefined) continue;
			if (from != null || typeof(from) == "object") {
				Object.getOwnPropertyNames(from).forEach(function (name) {
					var descriptor;

					// nesting
					if ((typeof(dest[name]) == "object" || typeof(dest[name]) == "undefined")
							&& typeof(from[name]) == "object") {

						// ensure proper types (Array rsp Object)
						if (typeof(dest[name]) == "undefined") {
							dest[name] = Array.isArray(from[name]) ? [] : {};
						}
						if (override) {
							if (!Array.isArray(dest[name]) && Array.isArray(from[name])) {
								dest[name] = [];
							}
							else if (Array.isArray(dest[name]) && !Array.isArray(from[name])) {
								dest[name] = {};
							}
						}
						if (dest[name] != undefined) {
							dest[name].mergeObject(from[name], override);
						}
					}

					// flat properties
					else if ((name in dest && override) || !(name in dest)) {
						descriptor = Object.getOwnPropertyDescriptor(from, name);
						if (descriptor.configurable) {
							Object.defineProperty(dest, name, descriptor);
						}
					}
				});
			} else {
				dest = from;
			}
        }
        return this;
    }
});

Array.prototype.compare = function(testArr)
{
	if (this.length != testArr.length) return false;
	for (var i = 0; i < testArr.length; i++) {
		if (this[i].compare) { 
			if (!this[i].compare(testArr[i])) return false;
		}
		if (this[i] !== testArr[i]) return false;
	}
	return true;
}

Date.prototype.myString = function ()
{
	return this.toDateString() +' '+ this.toTimeString().substr (0,8);
}

Math.randRange = function(from, to)
{
 return Math.floor( ( Math.random() * (to-from+1) ) + from);
}

Number.prototype.intToCommas = function()
{
	var nStr = parseInt(this) + '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + ',' + '$2');
	}
	return nStr;
}

String.prototype.escapeHTML = function()
{
	return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
}

String.prototype.intToCommas = function()
{
	return parseInt(this);
}
/*
String.prototype.strip = function()
{
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
}
*/


//************ Functions **************

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

function addScript (scriptText){
	var scr = document.createElement('script');   
	scr.innerHTML = scriptText;
	document.body.appendChild(scr);
//    setTimeout ( function (){document.body.removeChild(scr);}, 500);
}

function addStyle(css) {
	var target = document.getElementsByTagName('head')[0];
	var obj = document.createElement('style');
	obj.type = 'text/css';
	obj.appendChild(document.createTextNode(css));
	target.appendChild(obj);
}

function addZeroes(num, digits)
{
	var num = '' + num;
    while (num.length < digits) {
        num = '0' + num;
    }
    return num;
}

function cloneProps (src) {
	var newObj = (src instanceof Array) ? [] : {};
	for (i in src) {
		if (myTypeof(src[i]) == 'function')
		continue;
		if (src[i] && typeof src[i] == 'object') {
		newObj[i] = cloneProps(src[i]);
		} 
		else 
		newObj[i] = src[i];
	} 
	return newObj;
};

function debugPos  (e){
	return 'client - offset: '+ e.clientRight +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
			+' - '+ e.offsetRight +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
}

DebugTimer = {
	startTime : 0,
	start : function (){
		now = new Date();
		DebugTimer.startTime = now.getTime();
	},
	display : function (label, noReset){
		now = new Date();
		elapsed = now.getTime() - DebugTimer.startTime;
		logit (label +": "+ elapsed/1000);
		if (noReset==null || !noReset)
		DebugTimer.startTime = now.getTime();
	}
};


function decodeEntity (str){
	var ta=document.createElement('textarea');
	ta.innerHTML = str; 
	return ta.value;
}



function findAllBetween (txt, find1, find2){
	var m = [];
	var last = 0;
	while ( (i1=txt.indexOf(find1, last))>=0 && (i2=txt.indexOf (find2, i1))>=0 ) {
		m.push (txt.substring(i1+find1.length, i2));
		last = i2 + find2.length;
	}
	return m;
}

function findSimilarWord (word, source){
	var pattern = new RegExp(RegExp.escape(word)+'[\\w]+', 'i');
	var match = source.match(pattern);
	return match ? match[0].capitalize() : word;
}


// Pythagorean theorum for the hypotenuse of a right triangle
function getDistance (d, f, c, e) {
	var a = 750;
	var g = a / 2;
	var b = Math.abs(c - d);
	if (b > g)
		b = a - b;
	var h = Math.abs(e - f);
	if (h > g)
		h = a - h;
	return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};

function getFunctionName (func){
	var name=/\W*function\s+([\w\$]+)\(/.exec(func);
	if (!name)
		return '';
	return name[1];
}

function htmlOptions (a, curVal){
	m = '';
	for (k in a)
		m += '<option value="'+ k +'"'+ (k==curVal?' selected':'')  +'>'+ a[k] +'</option>';
	return m;
}

function htmlSelector (valNameObj, curVal, tags){
	m = [];
	m.push ('<select');
	if (tags){
		m.push (' ');
		m.push (tags);
	}  
	for (k in valNameObj){
		m.push ('><option ');
		if (k == curVal){
			m.push ('selected ');
		}
		m.push ('value="');
		m.push (k);
		m.push ('">');
		m.push (valNameObj[k]);
		m.push ('</option>');
	}
	m.push ('</select>');
	return m.join ('');
}


function implodeUrlArgs (obj){
	var a = [];
	for (var k in obj)
		a.push (k +'='+ encodeURI(obj[k]) );
	return a.join ('&');
}

function inspect(obj, maxLevels, level, doFunctions){
	var str = '', type, msg;
	if(level == null)  level = 0;
	if(maxLevels == null) maxLevels = 1;
	if(maxLevels < 1)
		return 'Inspect Error: Levels number must be > 0';
	if(obj == null)
		return 'ERROR: Object is NULL\n';
	var indent = '';
	for (var i=0; i<level; i++)
		indent += ' ';
	for(property in obj) {
		try {
			type =  myTypeof(obj[property]);
			if (doFunctions==true && (type == 'function')){
			str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
			} 
			else if (type != 'function') {
			str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
			}
			if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
			str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
		}
		catch(err) {
			// Is there some properties in obj we can't access? Print it red.
			if(typeof(err) == 'string') msg = err;
			else if(err.message)        msg = err.message;
			else if(err.description)    msg = err.description;
			else                        msg = 'Unknown';
			str += '(Error) ' + property + ': ' + msg +"\n";
		}
	}
	str += "\n";
	return str;
}


function myTypeof (o){
	if (o == undefined)
	return 'undefined';
	if (typeof (o) == 'object'){
		if (!o){
			return 'null';
		}
		else if (o.constructor.toString().indexOf("Array")>=0 && typeof(o.splice)=='function'){
			return 'array';
		}
		else{
			return 'object';
		}
	}
	return typeof (o);
}

// Random Number Generator
function RNG(seed) {
  // LCG using GCC's constants
  this.m = 0x100000000; // 2**32;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed ? seed : Math.floor(Math.random() * (this.m-1));
}
RNG.prototype.nextInt = function() {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
}
RNG.prototype.nextFloat = function() {
  // returns in range [0,1]
  return this.nextInt() / (this.m - 1);
}
RNG.prototype.nextRange = function(start, end) {
  return start + (end - start) * this.nextFloat();
}
RNG.prototype.nextIntRange = function(start, end) {
  return Math.floor(this.nextRange(start-0.4999, end+0.4999));
}
RNG.prototype.choice = function(array) {
  return array[this.nextIntRange(0, array.length)];
}


function objectName (o){
	var s = o.toString();
	return s.substr(7,s.length-8);
}

function parseIntNan (n){
	var x = parseInt(n, 10);
	return (isNaN(x)) ? 0 : x;
}

function parseIntZero (n){
	return (!n || n=='') ? 0 : parseInt(n, 10);
}


function parseQuotedVars(str){
	var obj = {};
	var pattern = /\s*(.*?)\s*=\s*('|")(.*?)\2/gi;
	var match;
	while ((match = pattern.exec(str)) != null){
		obj[match[1]] = match[3];
	}
	return obj;
}

function searchDOM (node, condition, maxLevel, doMult){
	var found = [];
	eval ('var compFunc = function (node) { return ('+ condition +') }');
	doOne(node, 1);
	if(!doMult){
		if (found.length==0){
			return null;
		}
		return found[0];
	}

	return found;

	function doOne (node, curLevel){
		try {
			if (compFunc(node)){
				found.push(node);
			}      
		} catch (e){}

		if (!doMult && found.length>0){
			return; 
		}
		if (++curLevel<maxLevel && node.childNodes!=undefined){
			for (var c=0; c<node.childNodes.length; c++){
				doOne (node.childNodes[c], curLevel);
			}
		}
	}
}

function serverTime (){
	return parseInt (new Date().getTime() / 1000) + Seed.serverTimeOffset;
}

function SHA1 (msg) {

	function rotate_left(n,s) {
		var t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	};

	function lsb_hex(val) {
		var str="";
		var i;
		var vh;
		var vl;

		for( i=0; i<=6; i+=2 ) {
			vh = (val>>>(i*4+4))&0x0f;
			vl = (val>>>(i*4))&0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};

	function cvt_hex(val) {
		var str="";
		var i;
		var v;

		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};


	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;

	msg = Utf8Encode(msg);

	var msg_len = msg.length;

	var word_array = new Array();
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array.push( j );
	}

	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;

		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;

		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}

	word_array.push( i );

	while( (word_array.length % 16) != 14 ) word_array.push( 0 );

	word_array.push( msg_len>>>29 );
	word_array.push( (msg_len<<3)&0x0ffffffff );


	for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {

		for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
		for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);

		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;

		for( i= 0; i<=19; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		for( i=20; i<=39; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		for( i=40; i<=59; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		for( i=60; i<=79; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;

	}
	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
	return temp.toLowerCase();
}

function strUpTo (s, find){
	var i = s.indexOf(find);
	if (i > 0){
		return s.substr(0, i);
	}
	return s;
}


/**********************
part       full
Xd Xh Xm   Xd Xh Xm Xs
Xh Xm      Xh Xm Xs
Xm Xs      Xm Xs
Xs         Xs
**********************/
function timeFormat(time, full) {
	time = parseInt (time);
	var m = [];
	var t = time;
	
	if (t < 61){
		return  t + 's';
	}
	
	if (t > 86400){
		m.push (parseInt(t/86400)); 
		m.push ('d ');
		t %= 86400;
	}  
	if (t>3600 || time>3600){
		m.push (parseInt(t/3600)); 
		m.push ('h ');
		t %= 3600;
	}  
	m.push (parseInt(t/60)); 
	m.push ('m');
	if (full || time<=3600 ){
		m.push (' ');
		m.push (t%60);
		m.push ('s');  
	}
	var str = m.join('');
	
	if (str[str.length-1] == ' '){
		str = str.substring(0, str.length-1);
	}
	
	return str;
}

/********
Xd Xh
Xh Xm
Xm Xs
Xs
********/
function timeFormatShort(time) {
	time = parseInt (time);
	if (time > 86400){
		var m = [];
		time /= 3600;
		m.push (parseInt(time/24)); 
		m.push ('d ');
		m.push (parseInt(time%24)); 
		m.push ('h');
		return m.join ('');    
	} 
	else {
		return timeFormat (time);
	}
}



// ========================================================================
//  XML.ObjTree -- XML source code from/to JavaScript object like E4X
// ========================================================================
// http://www.kawa.net/works/js/xml/objtree-e.html
//

if ( typeof(XML) == 'undefined' ) XML = function() {};

//  constructor

XML.ObjTree = function () {
    return this;
};

//  class variables

XML.ObjTree.VERSION = "0.24";

//  object prototype

XML.ObjTree.prototype.xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n';
XML.ObjTree.prototype.attr_prefix = '-';
XML.ObjTree.prototype.overrideMimeType = 'text/xml';

//  method: parseXML( xmlsource )

XML.ObjTree.prototype.parseXML = function ( xml ) {
    var root;
    if ( window.DOMParser ) {
        var xmldom = new DOMParser();
//      xmldom.async = false;           // DOMParser is always sync-mode
        var dom = xmldom.parseFromString( xml, "application/xml" );
        if ( ! dom ) return;
        root = dom.documentElement;
    } else if ( window.ActiveXObject ) {
        xmldom = new ActiveXObject('Microsoft.XMLDOM');
        xmldom.async = false;
        xmldom.loadXML( xml );
        root = xmldom.documentElement;
    }
    if ( ! root ) return;
    return this.parseDOM( root );
};

//  method: parseHTTP( url, options, callback )

XML.ObjTree.prototype.parseHTTP = function ( url, options, callback ) {
    var myopt = {};
    for( var key in options ) {
        myopt[key] = options[key];                  // copy object
    }
    if ( ! myopt.method ) {
        if ( typeof(myopt.postBody) == "undefined" &&
             typeof(myopt.postbody) == "undefined" &&
             typeof(myopt.parameters) == "undefined" ) {
            myopt.method = "get";
        } else {
            myopt.method = "post";
        }
    }
    if ( callback ) {
        myopt.asynchronous = true;                  // async-mode
        var __this = this;
        var __func = callback;
        var __save = myopt.onComplete;
        myopt.onComplete = function ( trans ) {
            var tree;
            if ( trans && trans.responseXML && trans.responseXML.documentElement ) {
                tree = __this.parseDOM( trans.responseXML.documentElement );
            } else if ( trans && trans.responseText ) {
                tree = __this.parseXML( trans.responseText );
            }
            __func( tree, trans );
            if ( __save ) __save( trans );
        };
    } else {
        myopt.asynchronous = false;                 // sync-mode
    }
    var trans;
    if ( typeof(HTTP) != "undefined" && HTTP.Request ) {
        myopt.uri = url;
        var req = new HTTP.Request( myopt );        // JSAN
        if ( req ) trans = req.transport;
    } else if ( typeof(Ajax) != "undefined" && Ajax.Request ) {
        var req = new Ajax.Request( url, myopt );   // ptorotype.js
        if ( req ) trans = req.transport;
    }
//  if ( trans && typeof(trans.overrideMimeType) != "undefined" ) {
//      trans.overrideMimeType( this.overrideMimeType );
//  }
    if ( callback ) return trans;
    if ( trans && trans.responseXML && trans.responseXML.documentElement ) {
        return this.parseDOM( trans.responseXML.documentElement );
    } else if ( trans && trans.responseText ) {
        return this.parseXML( trans.responseText );
    }
}

//  method: parseDOM( documentroot )

XML.ObjTree.prototype.parseDOM = function ( root ) {
    if ( ! root ) return;

    this.__force_array = {};
    if ( this.force_array ) {
        for( var i=0; i<this.force_array.length; i++ ) {
            this.__force_array[this.force_array[i]] = 1;
        }
    }

    var json = this.parseElement( root );   // parse root node
    if ( this.__force_array[root.nodeName] ) {
        json = [ json ];
    }
    if ( root.nodeType != 11 ) {            // DOCUMENT_FRAGMENT_NODE
        var tmp = {};
        tmp[root.nodeName] = json;          // root nodeName
        json = tmp;
    }
    return json;
};

//  method: parseElement( element )

XML.ObjTree.prototype.parseElement = function ( elem ) {
    //  COMMENT_NODE
    if ( elem.nodeType == 7 ) {
        return;
    }

    //  TEXT_NODE CDATA_SECTION_NODE
    if ( elem.nodeType == 3 || elem.nodeType == 4 ) {
        var bool = elem.nodeValue.match( /[^\x00-\x20]/ );
        if ( bool == null ) return;     // ignore white spaces
        return elem.nodeValue;
    }

    var retval;
    var cnt = {};

    //  parse attributes
    if ( elem.attributes && elem.attributes.length ) {
        retval = {};
        for ( var i=0; i<elem.attributes.length; i++ ) {
            var key = elem.attributes[i].nodeName;
            if ( typeof(key) != "string" ) continue;
            var val = elem.attributes[i].nodeValue;
            if ( ! val ) continue;
            key = this.attr_prefix + key;
            if ( typeof(cnt[key]) == "undefined" ) cnt[key] = 0;
            cnt[key] ++;
            this.addNode( retval, key, cnt[key], val );
        }
    }

    //  parse child nodes (recursive)
    if ( elem.childNodes && elem.childNodes.length ) {
        var textonly = true;
        if ( retval ) textonly = false;        // some attributes exists
        for ( var i=0; i<elem.childNodes.length && textonly; i++ ) {
            var ntype = elem.childNodes[i].nodeType;
            if ( ntype == 3 || ntype == 4 ) continue;
            textonly = false;
        }
        if ( textonly ) {
            if ( ! retval ) retval = "";
            for ( var i=0; i<elem.childNodes.length; i++ ) {
                retval += elem.childNodes[i].nodeValue;
            }
        } else {
            if ( ! retval ) retval = {};
            for ( var i=0; i<elem.childNodes.length; i++ ) {
                var key = elem.childNodes[i].nodeName;
                if ( typeof(key) != "string" ) continue;
                var val = this.parseElement( elem.childNodes[i] );
                if ( ! val ) continue;
                if ( typeof(cnt[key]) == "undefined" ) cnt[key] = 0;
                cnt[key] ++;
                this.addNode( retval, key, cnt[key], val );
            }
        }
    }
    return retval;
};

//  method: addNode( hash, key, count, value )

XML.ObjTree.prototype.addNode = function ( hash, key, cnts, val ) {
    if ( this.__force_array[key] ) {
        if ( cnts == 1 ) hash[key] = [];
        hash[key][hash[key].length] = val;      // push
    } else if ( cnts == 1 ) {                   // 1st sibling
        hash[key] = val;
    } else if ( cnts == 2 ) {                   // 2nd sibling
        hash[key] = [ hash[key], val ];
    } else {                                    // 3rd sibling and more
        hash[key][hash[key].length] = val;
    }
};

//  method: writeXML( tree )

XML.ObjTree.prototype.writeXML = function ( tree ) {
    var xml = this.hash_to_xml( null, tree );
    return this.xmlDecl + xml;
};

//  method: hash_to_xml( tagName, tree )

XML.ObjTree.prototype.hash_to_xml = function ( name, tree ) {
    var elem = [];
    var attr = [];
    for( var key in tree ) {
        if ( ! tree.hasOwnProperty(key) ) continue;
        var val = tree[key];
        if ( key.charAt(0) != this.attr_prefix ) {
            if ( typeof(val) == "undefined" || val == null ) {
                elem[elem.length] = "<"+key+" />";
            } else if ( typeof(val) == "object" && val.constructor == Array ) {
                elem[elem.length] = this.array_to_xml( key, val );
            } else if ( typeof(val) == "object" ) {
                elem[elem.length] = this.hash_to_xml( key, val );
            } else {
                elem[elem.length] = this.scalar_to_xml( key, val );
            }
        } else {
            attr[attr.length] = " "+(key.substring(1))+'="'+(this.xml_escape( val ))+'"';
        }
    }
    var jattr = attr.join("");
    var jelem = elem.join("");
    if ( typeof(name) == "undefined" || name == null ) {
        // no tag
    } else if ( elem.length > 0 ) {
        if ( jelem.match( /\n/ )) {
            jelem = "<"+name+jattr+">\n"+jelem+"</"+name+">\n";
        } else {
            jelem = "<"+name+jattr+">"  +jelem+"</"+name+">\n";
        }
    } else {
        jelem = "<"+name+jattr+" />\n";
    }
    return jelem;
};

//  method: array_to_xml( tagName, array )

XML.ObjTree.prototype.array_to_xml = function ( name, array ) {
    var out = [];
    for( var i=0; i<array.length; i++ ) {
        var val = array[i];
        if ( typeof(val) == "undefined" || val == null ) {
            out[out.length] = "<"+name+" />";
        } else if ( typeof(val) == "object" && val.constructor == Array ) {
            out[out.length] = this.array_to_xml( name, val );
        } else if ( typeof(val) == "object" ) {
            out[out.length] = this.hash_to_xml( name, val );
        } else {
            out[out.length] = this.scalar_to_xml( name, val );
        }
    }
    return out.join("");
};

//  method: scalar_to_xml( tagName, text )

XML.ObjTree.prototype.scalar_to_xml = function ( name, text ) {
    if ( name == "#text" ) {
        return this.xml_escape(text);
    } else {
        return "<"+name+">"+this.xml_escape(text)+"</"+name+">\n";
    }
};

//  method: xml_escape( text )

XML.ObjTree.prototype.xml_escape = function ( text ) {
    return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
};

/*********************************** END XML.ObjTree ******************************************/












// Unic ID  (This Must be the first)
UID = {};
UIDN = {};

function makeUID(len){
	var len = ( len != undefined ? len : 20);
	var chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','u','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','U','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','_'];
	var uid = chars[Math.floor(Math.random()*54)];
	for(var i = 0; i < len; i++)
	{
		uid += chars[Math.floor(Math.random()*64)];
	}
	return uid;
}

function getUID(name){
	return UID[name] != undefined ? UID[name] : name;
}

function setUID(name){
	var uid = makeUID();
	while(UIDN[uid] != undefined){
		uid = makeUID();
	}
	UIDN[uid] = 1;
	UID[name] = uid;
	return uid;
}





function dialogConfirm (title, msg, onContinue, onCancel, centerElement){
	var pop = new PopUp ('cancelcontinue', 0, 0, 400,200, true, onCancel);
	
	pop.centerMe(mainPopup.getMainDiv());
	
	pop.getTopDiv().innerHTML = '<center><b>'+ title +'</b></center>';
	
	pop.getMainDiv().innerHTML = '\
	<table align=center style="height: 100%;">\
		<tr align=center height=85%>\
			<td>'+ msg +'</td>\
		</tr>\
		<tr align=center>\
			<td>\
				<input id='+setUID('btn_cancel')+' type=button value="'+ translate('Cancel') +'" />\
				&nbsp; &nbsp; \
				<input id='+setUID('btn_continue')+' type=button value='+ translate('Continue') +' />\
				<br>\
			</td>\
		</tr>\
	</table>';
	
	$(UID['btn_cancel']).addEventListener ('click', function (){
		pop.show(false); 
		if (onCancel) onCancel();
	}, false);
	
	$(UID['btn_continue']).addEventListener ('click', function (){
		pop.show(false); 
		if (onContinue) onContinue();
	}, false);
	
	pop.show(true);
}



// TODO: add 'Retry Now' button
var rTimer;
var cdTimer;
function dialogRetry (errMsg, seconds, onRetry, onCancel){
	var secs, pop;

	secs = parseInt(seconds);
	pop = new PopUp ('retry', 0, 0, 400,200, true);
	pop.centerMe(mainPopup.getMainDiv());
	pop.getTopDiv().innerHTML = '<CENTER>'+ SCRIPT_TITLE +'</center>';
	pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>'+ translate('An error has occurred:') +'</b></font><BR><BR><DIV id=paretryErrMsg></div>\
		<BR><BR><B>'+ translate('Retry in') +' <SPAN id=paretrySeconds></b></span> '+ translate('Seconds') +'...<BR><BR><INPUT id=paretryCancel type=button value="'+ translate('Cancel').toUpperCase +' '+ translate('Retry') +'" />';
	$('paretryCancel').addEventListener ('click', doCancel, false);
	pop.show(true);
	$('paretryErrMsg').innerHTML = errMsg;
	$('paretrySeconds').innerHTML = secs;
	rTimer = setTimeout (doRetry, secs*1000);
	cdTimer = null;
	countdown ();

	function countdown (){
		$('paretrySeconds').innerHTML = secs--;
		if (secs > 0)
			cdTimer = setTimeout (countdown, 1000);
	}
	function doCancel(){
		clearTimeout (rTimer);
		clearTimeout (cdTimer);
		pop.destroy();
		onCancel ();
	}
	function doRetry (){
		clearTimeout (rTimer);
		clearTimeout (cdTimer);
		pop.show(false);
		onRetry();
	}
}


function dispError (msg,target){
	var target = target != undefined ? target : document.body;
	var dial = new ModalDialog (target, 300, 150, '', true);
	dial.getContentDiv().innerHTML = msg;
}


function logit(msg) {
	var serverID = Data._serverId;
	var now = new Date();
	console.log(serverID + ' @ ' + now.toTimeString().substring (0,8) + '.' + now.getMilliseconds() + ': ' +  msg);
	if (Data._log) verboseLog(msg.replace(/\n/g, '<br/>'));
}


// CLASS!
function ModalDialog (curtainDiv, width, height, styleName, allowClose, notifyClose){
	this.allowClose = function (onOff){
		if (onOff)
			$(UID['ModalDialog_btnClose']).style.display = 'block';
		else
			$(UID['ModalDialog_btnClose']).style.display = 'none';
	}
	this.destroy = function (){
		if (!this.destroyed){
			this.curtainDiv.removeChild(this.curtain);
			this.curtainDiv.removeChild(this.div);
		}
	}
	this.hide = function (){
		this.curtainDiv.style.display='none';
		this.curtainDiv.style.display='none';
	}
	this.show = function (){
		this.curtainDiv.style.display='block';
		this.curtainDiv.style.display='block';
	}

	this.getContentDiv = function (){
		return $(UID['ModalDialog_Close']);
	}

	//var offset = $(curtainDiv).positionedOffset();
	var offset = Element.positionedOffset(curtainDiv);
	this.curtainDiv = curtainDiv;
	this.curtain = document.createElement ('div');
	this.curtain.style.top = (offset.top) +'px';
	this.curtain.style.left = (offset.left) + 'px';
	this.curtain.style.width = curtainDiv.offsetWidth +'px';
	this.curtain.style.height = (curtainDiv.offsetHeight) +'px';
	this.curtain.style.backgroundColor = '#000';
	this.curtain.style.opacity = '0.6';
	this.curtain.style.zIndex = parseInt(curtainDiv.style.zIndex) + 1;
	this.curtain.style.position = 'absolute';
	this.curtain.style.margin = curtainDiv.style.margin;
	this.curtain.style.padding = curtainDiv.style.padding;
	curtainDiv.appendChild (this.curtain);

	this.div = document.createElement('div');
	if (styleName)
		this.div.className = styleName;
	else {
		this.div.style.backgroundColor = 'white';
		this.div.style.border = '1px solid black';
	}
	this.div.style.width = width +'px';
	this.div.style.height = height +'px';
	this.div.style.position = 'absolute';
	this.div.style.zindex = parseInt(curtainDiv.style.zIndex) + 2;
	this.div.style.top = ((curtainDiv.offsetHeight-height)/2 + offset.top) + 'px';
	this.div.style.left = ((curtainDiv.offsetWidth-width)/2 + offset.left) + 'px';

	this.div.innerHTML = ''
		+'<table height=100% width=100%>'
		+'	<tr valign=middle height=80%>'
		+'		<td>'
		+'		<div id='+ setUID('ModalDialog_Close') +' style="text-align:center"></div>'
		+'		</td>'
		+'	</tr>'
		+'	<tr valign=middle align=center>'
		+'		<td style="text-align:center;">'
		+'		<input id='+ setUID('ModalDialog_btnClose') +' type=button value="' + translate('Close') + '" style="display:none" />'
		+'		</td>'
		+'	</tr>'
		+'</table>';
	curtainDiv.appendChild(this.div);
	this.allowClose(allowClose);
	this.notifyClose = notifyClose;
	var t = this;
	$(UID['ModalDialog_btnClose']).addEventListener('click', function (){
		t.destroyed = true;
		t.curtainDiv.removeChild(t.curtain);
		t.curtainDiv.removeChild(t.div);
		if (t.notifyClose)
			notifyClose();
	}, false);
}



var tabManager = {
	tabList : {},           // {name, obj, div}
	currentTab : null,

	init : function (mainDiv){
		var t = tabManager;
		var sorter = [];
		for (k in Tabs){
			if (!Tabs[k].tabDisabled){
				t.tabList[k] = {};
				t.tabList[k].name = k;
				t.tabList[k].uid = setUID('tab_' + k);
				t.tabList[k].obj = Tabs[k];
				if (Tabs[k].tabLabel != null)
					t.tabList[k].label = translate(Tabs[k].tabLabel);
				else
					t.tabList[k].label = k;
				if (Tabs[k].tabOrder != null)
					sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
				else
					sorter.push([1000, t.tabList[k]]);
				t.tabList[k].div = document.createElement('div');
			}
		}

		sorter.sort (function (a,b){return a[0]-b[0]});
		
		var m = '<ul class=tabs>';
		m += '<li class="tab first"><a id='+ sorter[0][1].uid +'>'+ sorter[0][1].label +'</a></li>';
		for (var i=1; i<sorter.length; i++)
			m += '<li class=tab><a id='+ sorter[i][1].uid +'>'+ sorter[i][1].label +'</a></li>';
		m += '</ul>';

		mainPopup.getTopDiv().innerHTML = m;
		
		t.currentTab = null;
		for (k in t.tabList) {
			if (t.tabList[k].name == Data.options.currentTab)
				t.currentTab = t.tabList[k] ;
			$(t.tabList[k].uid).addEventListener('click', this.e_clickedTab, false);
			var div = t.tabList[k].div;
			div.className = 'container';
			div.style.display = 'none';
			//div.style.maxWidth = $(t.tabList[k].uid).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.width;
			mainDiv.appendChild(div);
			try {
				t.tabList[k].obj.init(div);
			} catch (e){
				div.innerHTML += "INIT ERROR: "+ e;
			}
		}
		if (t.currentTab == null)
			t.currentTab = sorter[0][1];    
		t.setTabStyle ($ (t.currentTab.uid), true);
		t.currentTab.div.style.display = 'block';
	},

	hideTab : function (){
		var t = tabManager;
		t.currentTab.obj.hide();
	},

	showTab : function (){
		var t = tabManager;
		t.currentTab.obj.show();
	},
		
	setTabStyle : function (e, selected){
		if (selected){
			e.style.zIndex = 1;
			e.className = 'tab selected';
		} 
		else {
			e.style.zIndex = 0;
			e.className = 'tab';
		}
	},
	
	e_clickedTab : function (e){
		var t = tabManager;
		for (k in t.tabList)
			if (t.tabList[k].uid == e.target.id) {
				var newTab = t.tabList[k];
				break;
			}
		if (t.currentTab.name != newTab.name){
			t.setTabStyle ($ (newTab.uid), true);
			t.setTabStyle ($ (t.currentTab.uid), false);
			t.currentTab.obj.hide ();
			t.currentTab.div.style.display = 'none';
			t.currentTab = newTab;
			newTab.div.style.display = 'block';
			Data.options.currentTab = newTab.name;      
		}
		newTab.obj.show();
	}
}


function titleLine (msg){
	return '<table cellpadding=0 cellspacing=0 width=100%><tr><td width=50%><HR></td><td> '+ msg +' </td><TD width=50%><HR></td></tr></table>';
}


var WINLOG_MAX_ENTRIES = 1000;     // TODO
var WinLog = {
	state : null,
	win: null,
	eOut : null,
	lastE : null,
	enabled : true,
	reverse : true,
	busy : false,
	isOpening : false,
	lineNum : 0,

	open : function (){
		var t = WinLog;

		function eventButClear(){
			var t = WinLog;
			t.lastE = null;
			t.eOut.innerHTML ='';
			t.lineNum = 0;
		}
		function eventButReverse(){
			var t = WinLog;
			if (t.busy)
				return;
			t.busy = true;
			if (t.reverse){
				t.win.document.getElementById('wlRev').value= 'Top';
				t.reverse = false;
			} 
			else{
				t.win.document.getElementById('wlRev').value= 'Bottom';
				t.reverse = true;
			}
			var n = t.eOut.childNodes.length;
			if (n < 2)
				return;
			for (i=n-2; i>=0; i--){
				t.eOut.appendChild (t.eOut.childNodes[i]);
			}
			t.busy = false;
		}
		
		if (!t.win || t.win.closed){
			t.isOpening = true;  
			// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window
			t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
			t.isOpening = false; 
			t.state = null; 
		}
		
		if (t.state == null){
			t.win.document.body.innerHTML = '\
				<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
				<BODY style="margin:0px; padding:0px; border:none">\
				<DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
				<INPUT id=wlClear type=button value="'+translate('Delete')+'" /> &nbsp; <INPUT id=wlRev type=button value="Bottom" ></div>\
				<DIV id=wlOut style="overflow-y:auto; height:100%; max-height:100%"></div></body>';
			t.win.document.getElementById('wlClear').addEventListener('click', eventButClear, false);
			t.win.document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
			t.eOut =  t.win.document.getElementById('wlOut');
			t.lastE = null;
			t.state = 1;
		}
	},


	writeText : function (msg){
		WinLog.write (msg.escapeHTML()); 
	},

	write : function (msg){
		var t = WinLog;
		if (!t.enabled || t.isOpening)
		return;
		t.open();
		var te = document.createElement('pre');
		if (++t.lineNum % 2)    
		te.style.backgroundColor = '#eeeeee'; 
		else
		te.style.backgroundColor = '#ffffff'; 
		var now = new Date();
		var m = [];
		var millis = now.getMilliseconds();
		m.push (now.toTimeString().substring (0,8));
		m.push ('.');
		if (millis<100)
		m.push('0');
		if (millis<10)
		m.push('0');
		m.push(millis);
		m.push (': ');
		m.push (msg);
		te.innerHTML = m.join('');

		if (t.reverse){
		if (t.lastE == null){
			t.eOut.appendChild(te);
			t.lastE = te;
		} 
		else {
			t.eOut.insertBefore(te, t.lastE);
		}
		var hr = document.createElement('hr');
		t.eOut.insertBefore(hr, te);
		t.lastE = hr;
		} 
		else {
		t.eOut.appendChild(te);
		t.eOut.appendChild(document.createElement('hr'));
		}
	}
};



var WinManager = {
	wins : {},    // prefix : PopUp obj

	get : function (prefix){
		var t = WinManager;
		return t.wins[prefix];
	},

	add : function (prefix, pop){
		var t = WinManager;
		t.wins[prefix] = pop;
	},

	delete : function (prefix){
		var t = WinManager;
		delete t.wins[prefix];
	}    
}


// creates a 'popup' div
// prefix must be a unique (short) name for the popup window
function PopUp (prefix, x, y, width, height, enableDrag, onClose, onDragEnd) {

	var pop = WinManager.get(prefix);
	if (pop){
		pop.show (false);
		return pop;
	}
	this.BASE_ZINDEX = 100;
		
	// protos ...
	this.show = show;
	this.toggleHide = toggleHide;
	this.getTopDiv = getTopDiv;
	this.getMainDiv = getMainDiv;
	this.getLayer = getLayer;
	this.setLayer = setLayer;
	this.getLocation = getLocation;
	this.setLocation = setLocation;
	this.focusMe = focusMe;
	this.unfocusMe = unfocusMe;
	this.centerMe = centerMe;
	this.destroy = destroy;
	this.setModal = setModal;
	this.setDraggable = setDraggable;
	
	this.onDragEnd = onDragEnd;
	
	this.prefix = prefix;
	this.onClose = onClose;
	
	if ( x < 0 || x > document.body.offsetWidth) x = 0;
	if ( y < 0  || y > document.body.offsetHeight) y = 0;

	// Scramble
	rndPopup = ['outer', 'bar', 'top', 'main', 'close'];
	
	this.id ={};
	for (var s=0; s<rndPopup.length; s++) {
		this.id[rndPopup[s]] = rndPopup[rndPopup[s]] = setUID(prefix + '_' + rndPopup[s]);
	}

	var t = this;
	
	// object vars ...
	this.div = Builder.node('div', { id: rndPopup['outer'] });
	document.body.appendChild(this.div);

	this.div.className = UID['popup_outer'];
	this.div.style.zIndex = this.BASE_ZINDEX;
	this.div.style.position = 'absolute';
	this.div.style.display = 'none';
	this.div.style.width = width + 'px';
	this.div.style.height = height + 'px';
	this.div.style.top = (y||0) + 'px';
	this.div.style.right = (x||0) + 'px';
	
	var m = '<span id='+ rndPopup['close'] +' class="'+UID['popup_close']+'">X</span>\
			<TABLE cellspacing=0 width=100% height=100%>\
			<TR id="'+ rndPopup['bar'] +'" class="'+UID['popup_bar']+'">\
				<TD width=100% valign=bottom>\
				<SPAN id="'+ rndPopup['top'] +'" class="'+UID['popup_top']+'"></span></td>\
			</tr>\
			<TR><TD height=100% valign=top colspan=2 id="'+ rndPopup['main'] +'" class="'+UID['popup_main']+'"></td></tr></table>';

	this.div.innerHTML = m;
	

	$(rndPopup['close']).addEventListener ('click', e_XClose, false);

	setDraggable(enableDrag);

	this.div.addEventListener ('mousedown', e_divClicked, false);

	WinManager.add(prefix, this);


	function setDraggable (state){
		if (state) {
			if (t.dragger){
				t.dragger.destroy();
			}
			t.dragger = new Draggable(t.div, { 
				handle	: t.id['bar'], 
				scroll	: window,
				onEnd	: t.onDragEnd
			});
		} else {
			if (t.dragger){
				t.dragger.destroy();
			}
		}
	}
	
	function setModal (onOff){
	}

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
	}
	function unfocusMe (){
		t.setLayer(-5);
	}

	function getLocation() {
		return {x: parseInt(this.div.style.right), y: parseInt(this.div.style.top)};
	}

	function setLocation (loc){
		t.div.style.right= loc.x +'px';
		t.div.style.top = loc.y +'px';
	}
	function destroy (){
		document.body.removeChild(t.div);
		WinManager.delete (t.prefix);
	}
	function centerMe (parent){
		var offset = Element.cumulativeOffset(parent?parent:document.body);
		t.div.style.right = null;
		t.div.style.left = ((offset.offsetWidth - t.div.offsetWidth) / 2) + offset.left +'px';
		t.div.style.top = ((offset.offsetHeight - t.div.offsetHeight) / 2) + offset.top +'px';
	}
	function setLayer(zi){
		t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
	}
	function getLayer(){
		return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
	}
	function getTopDiv(){
		return $(rndPopup['top']);
	}
	function getMainDiv(){
		return $(rndPopup['main']);
	}
	function show(b){
		if (b){
			t.div.style.display = 'block';
			t.focusMe ();
		} 
		else {
			t.div.style.display = 'none';
		}
		return b;
	}
	function toggleHide(t){
		if (t.div.style.display == 'block') {
			return t.show (false);
		} 
		else {
			return t.show (true);
		}
	}

}






})();
