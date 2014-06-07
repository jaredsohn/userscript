// ==UserScript==
// @name			DoA Power Tools Plus
// @namespace		http://www.facebook.com/DoaPowerTools
// @description		Dragons of Atlantis fix Anti Bot  EasyMaster
// @include			http://apps.facebook.com/dragonsofatlantis/*
// @include			http://*.castle.wonderhill.com/platforms/facebook/game
// @exclude			http://apps.facebook.com/dragonsofatlantis/rubies
// @include			https://plus.google.com/games/659749063556
// @include			*googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @version			ProEkipWNA_One
// ==/UserScript==
(function() {

/********************************************************************************
 * All global variables MUST be set here or they will not be available to all   *
 * functions throughout the script.                                             *
 ********************************************************************************/
// Script information
var Version = 'ProEkipWNA_One'; // Year, Month, Day, Revision, Maturity (e.g. YYYMMDDa_BETA)
var Title = 'ProEkipWNA_Zero Beta'; // Removed for security purposes
var WebSite = 'http://www.facebook.com/DoaPowerTools'; // Removed for security purposes
var getVersion = 17;
var postVersion = 17;

// Help pages
var urlError = 'http://www.mmogwiki.com/forum/index.php?f=5&t=409&rb_v=viewtopic';

// Style - Rules: First character must be a-zA-Z, last character must be a-zA-Z0-9, middle characters must be _a-zA-Z0-9-
var rndStyle = ['idPrefix', 'classPrefix', 'subtab_info', 'subtab_build', 'subtab_research', 'subtab_train', 'status_ticker', 'status_feedback', 'job_header', 'job_content'];
var rndId = ['enable_drag', 'enable_verbose', 'enable_collect', 'collect_time', 'collect_unit', 'options_refresh', 'options_clear', 'support_link'];
var rndClass = ['red_button', 'green_button', 'blue_button', 'yellow_button', 'purple_button', 'cyan_button', 'tab_title'];

// Tab order
var INFO_TAB_ORDER = 1;     
var WAVE_TAB_ORDER = 2;
var ATTACK_TAB_ORDER = 3;
var JOBS_TAB_ORDER = 4;
var LOG_TAB_ORDER = 5;
var OPTIONS_TAB_ORDER = 6;
var DEBUG_TAB_ORDER = 99;

// Tab enable/disable
var INFO_TAB_ENABLE = true;     
var WAVE_TAB_ENABLE = true;
var ATTACK_TAB_ENABLE = true;
var JOBS_TAB_ENABLE = true;
var LOG_TAB_ENABLE = true;
var OPTIONS_TAB_ENABLE = true;
var DEBUG_TAB_ENABLE = false;

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
if (window.top === window.self) {
	function setFacebookWide() {	
		var iframe = document.getElementById('iframe_canvas');
		if (!iframe) {
			setTimeout (setFacebookWide, 1000);
			return;
		}
		while ((iframe = iframe.parentNode) != null) {
			if (iframe.tagName == 'DIV')
				iframe.style.width = '100%';
		}
		document.getElementById('rightCol').style.display = 'none';
	}

	function setGoogleWide() {	
		var iframeTag = document.getElementById('content').getElementsByTagName('iframe');
		if (iframeTag.length < 1) {
			setTimeout (setGoogleWide, 1000);
			return;
		}
		var iframeId = iframeTag[0].id;
		var iframe = document.getElementById(iframeId);
		while ((iframe = iframe.parentNode) != null) {
			if (iframe.tagName == 'DIV')
				iframe.style.width = '100%';
		}
	}
	
	if (window.location.href.indexOf("facebook") != -1)
		setFacebookWide();
	else
		setGoogleWide();
} else {
	function setFacebookHigh() {
		var obs = document.getElementsByTagName('object');
		if (obs.length < 1 || window.location.hostname.indexOf("realm") == -1) {
			setTimeout (setFacebookHigh, 1000);
			return;
		}
		for (var i=0; i<obs.length; i++)
			switch (obs[i].parentNode.id) {
				case 'hd' :
					obs[i].style.display = 'none'; 
					break;
				default :
					obs[i].parentNode.style.margin = '0px';
			}
		document.getElementById('hd').parentNode.style.width = '760px';
		var hdChild = document.getElementById('hd').childNodes;
		for (var i=0; i<hdChild.length; i++)
			if (hdChild[i].tagName == 'DIV')
				hdChild[i].style.display = 'none';  
		document.getElementById('ft').style.display = 'none';
		initStyle();
	}
	
	function setGoogleHigh() {	
		var obs = document.getElementsByTagName('object');
		if (obs.length < 1) {
			setTimeout (setGoogleHigh, 1000);
			return;
		}		
		initStyle();
	}
	
	if (window.location.href.indexOf("facebook") != -1)
		setFacebookHigh();
	else 
		setGoogleHigh();
}

function initStyle () {
	/********************************************************************************
	 * All id and class names must be scrambled to prevent the script from being    *
	 * blocked. These names have to be generated and allocated to CSS prior to      *
	 * rest of the script being initialised.                                        *
	 *                                                                              *
	 * rndStyle is an array containing the normal names for each id and class. This *
	 * is then looped through and then scrambled to generate a unique name. A check *
	 * is done to ensure no two randmised names are the same before allowing the    *
	 * script to continue.                                                          *
	 ********************************************************************************/ 
	for (var s=0; s<rndStyle.length; s++) {
		rndStyle[rndStyle[s]] = scramble(rndStyle[s]);
		checkDuplicate(s);
	}
	
	for (var s=0; s<rndId.length; s++) {
		rndId[rndId[s]] = scramble(rndId[s]);
		checkDuplicate(s);
	}
	
	for (var s=0; s<rndClass.length; s++) {
		rndClass[rndClass[s]] = scramble(rndClass[s]);
		checkDuplicate(s);
	}
	
	setTimeout (initScript, 1000); // NOTE: Forced a delay in an attempt to stop the styling issue (Need to find a better way)
}

function initScript () {
// CHECK THESE VARIABLES
var VERSION_CHECK_HOURS = 4;
var DEBUG_TRACE_AJAX = 2;
var DEBUG_MARCHES = false;
var MAP_DELAY = 1250;
var MIN_DELAY = 15;
var EMULATE_NET_ERROR = 0;  // percentage
var ENABLE_WINLOG = false;
var ALERT_ON_BAD_DATA = false;


var BUTTON_BGCOLOR = '#436';
var JOB_BUTTON_BGCOLOR = '#049C93';

var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

var wordArr = ['Czar', 'Bright', 'Work', 'Power', 'Tools', 'Dragons', 'Fire', 'Water', 'Lava', 'Metal', 'Stone', 'Protect', 'Branch', 'Child', 'New', 'Fangled', 'Flugel', 'Horn', 'Perfect', 'Myth', 'Jelly', 'Graph', 'Quick', 'Thorn', 'Pitbull', 'Tech', 'Cow', 'Middle', 'Brow', 'Hammer', 'Chord', 'Dazzle', 'Elemental', 'Brillig', 'Craft', 'Thumb', 'Print', 'Crtyp', 'Torch', 'Light', 'Bank', 'Final', 'Epic', 'Desk', 'Marble', 'Aqua', 'Phoenix', 'Peanut', 'Halo', 'Nimbus', 'Cloud', 'Seed',];

//
// Translation strings - will use preprocessor #ifdef to create translations
//
// Terrain types
var kAnthropusCamp = 'Anthropus Camp';
var kAntCamp = 'AntCamp';
var kCity = 'City';
var kOutpost = 'Outpost';
var kSavanna = 'Savanna';
var kSwamp = 'Swamp';
var kLake = 'Lake';
var kHill = 'Hill';
var kPlain = 'Plain';
var kMountain = 'Mountain';
var kForest = 'Forest';

// Buildings
var kFarm = 'Farm';
var kHome = 'Home';
var kMine = 'Mine';
var kSilo = 'Silo';
var kWall = 'Wall';
var kQuarry = 'Quarry';
var kFactory = 'Factory';
var kRookery = 'Rookery';
var kTheater = 'Theater';
var kFortress = 'Fortress';
var kGarrison = 'Garrison';
var kSentinel = 'Sentinel';
var kLumbermill = 'Lumbermill';
var kDragonKeep = 'DragonKeep';
var kMetalsmith = 'Metalsmith';
var kMusterPoint = 'MusterPoint';
var kStorageVault = 'StorageVault';
var kTrainingCamp = 'TrainingCamp';
var kScienceCenter = 'ScienceCenter';
var kOfficerQuarter = 'OfficerQuarter';

// Troops
var kPorter = 'Porter';
var kConscript = 'Conscript';
var kSpy = 'Spy';
var kSpies = 'Spies';
var kHalberdsman = 'Halberdsman';
var kHalberdsmen = 'Halberdsmen';
var kMinotaur = 'Minotaur';
var kLongbowman = 'Longbowman';
var kLongbowmen = 'Longbowmen';
var kSwiftStrikeDragon = 'SwiftStrikeDragon';
var kBattleDragon = 'BattleDragon';
var kArmoredTransport = 'ArmoredTransport';
var kGiant = 'Giant';
var kFireMirror = 'FireMirror';
var kAquaTroop = 'AquaTroop';
var kStoneTroop = 'StoneTroop';
var kFireTroop = 'FireTroop';
var kWindTroop = 'WindTroop';
var kGreatDragon = 'GreatDragon';
var kWaterDragon = 'WaterDragon';
var kStoneDragon = 'StoneDragon';
var kFireDragon = 'FireDragon';
var kWindDragon = 'WindDragon';

// Troop abbreviations
var kConscr = 'Conscr';
var kHalbrd = 'Halbrd';
var kMino = 'Mino';
var kLBM = 'LBM';
var kSSDrg = 'SSDrg';
var kBatDrg = 'BatDrg';
var kATrans = 'ATrans';
var kFireM = 'FireM';
var kGrtDrg = 'GrtDrg';
var kWatDrg = 'WatDrg';
var kStnDrg = 'StnDrg';
var kFreDrg = 'FreDrg';
var kWndDrg = 'WndDrg';
var kFang = 'Fang';
var kOgre = 'Ogre';
var kLavaJaw = 'LavaJaw';
var kBanshee = 'Banshee';

// Tabs
var kInfo = 'Info';
var kWave = 'Wave';
var kAttack = 'Attack';
var kTrain = 'Train';
var kBuild = 'Build';
var kResearch = 'Research';
var kJobs = 'Jobs';
var kLog = 'Log';
var kOpts = 'Opts';

// Items
var kAquaTroopRespirator = 'AquaTroopRespirator';
var kStoneTroopItem = 'StoneTroopItem';
var kFireTroopItem = 'FireTroopItem';
var kWindTroopItem = 'WindTroopItem';
var kGDBodyArmor = 'GreatDragonBodyArmor';
var kGDClawGuards = 'GreatDragonClawGuards';
var kGDHelmet = 'GreatDragonHelment';
var kGDTailGuard = 'GreatDragonTailGuard';

// Error messages
var kError = 'Error';
var kFatalSWF = '"<B>Error initializing "'+ Title +'"</b><BR><BR>Unable to find SWF element"';
var kFatalSeedTitle = 'ERROR WHILST FETCHING DATA FROM SERVER';
var kFatalSeedMsg = 'Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again.';
var kStartupErr = '"Unable to start "'+ Title +'"<BR>"';
var kInitErr = '"<B>Error initializing "'+ Title +'"</b><BR><BR>"';
var kNoTroops = 'No troops available';
var kErrSendAttack = 'ERROR! (sendAttack is busy, no response from server?)';
var kAttackErr = 'Attack Error: ';
var kNoTroopsDefined = 'No Troops Defined';
var kNotEnough = 'Not enough ';
var kMusterPointFull = 'Muster Point Full';
var kNoGenerals = 'No Generals Available';
var kInvalidDelay = 'Invalid delay(s)';
var kErrScanningMap = '<B>Bummer, there was an error while scanning the map.</b>';
var kBuildErr = 'BUILD ERROR: ';
var kResearchErr = 'RESEARCH ERROR: ';
var kTooManyBuildErrs = 'Too many errors, disabling auto-build';
var kTooManyResearchErrs = 'Too many errors, disabling auto-research';
var kMaxMarchesReached = 'User-set maximum marches reached.';
var kAttackSafetyFeature = 'Safety Feature: Auto-Attack turned off';
var kTrainSafetyFeature = 'Safety Feature: Auto-Train turned off';
var kSelectLevelsReminder = 'Use the Levels Tab to select attack areas';
var kTooManyTroops = 'Too many troops for muster point level';
var kDisablingAutoTrain = 'Too many errors, disabling auto-train';
var kTrainError = 'Train error: ';
var kInvalidNumberTroops = 'Invalid number of troops';
var kErrorOccurred = 'An error has occurred:';

// User interface
var kAttacks = 'Attacks';
var kAttack1 = kAttacks +' ';
var kAttack2 = kAttacks + ': ';
var kAttackNow = '"Attack Now"';
var kSkipAttack = '"Skip Attack"';
var kWaveTitle = 'Attack One Target in Waves';
var kAttackStatsTitle = 'Auto-attack Stats';
var kAutoUpgradeBuildings = 'Auto Upgrade Buildings';
var kAutoResearch = 'Auto Research';
var kClearStats = '"Clear Stats"';
var kClearLast = 'Clear last attack on current map';
var kClear = 'Clear';
var kClearAll = 'Clear last attack on all maps';
var kTroopsLost = 'Troops lost! (';
var kMaps = 'Maps';
var kAutoOn = 'Auto ON';
var kAutoOff = 'Auto OFF';

var kCampAt = ' camp at ';
var kAutoAttack = 'Auto-attack ';
var kAutoAttackConfig = 'Auto-attack Configuration';
var kRandomDelay = 'Random delay between attacks:';
var kDOAVersionString = Title + ' - v';
var kTo = ' to ';
var kSeconds = ' seconds ';
var kSameTargetDelay = 'Same target delay: ';
var kTwentyMinutes = ' 20 minutes';
var kOneHour = ' 1 hour';
var kLogAttacks = 'Log attacks: ';
var kDeleteMarchReports = 'Delete March Reports: ';
var kStopOnLoss = 'Stop if any troops lost: ';
var kMaxMarches = 'Maximum simultaneous marches: ';
var kRescanMap = '" Rescan Map "';
var kFirstValue = 'First value must be between ';
var kSecondValue = ' and 3600<BR>Second value must be at least 5 above the first value.';
var kLastAttack = 'Last Attack';
var kSendingAttack = 'Sending Attack';
var kOK = 'OK';
var kMapping = 'Mapping';
var kMapTypes = '" Map Types "';
var kTargets = '" Targets "';
var kConfig = '"Config"';
var kStats = '"Stats"';
var kMapCategories = 'Map Categories';
var kSearch = '" Search "';
var kTransferMap = '" Transfer to Attack "';
var kScanningMap = 'Scanning map within 35 miles<BR>This should take about a minute';
var kList = ' List';
var kDistance = 'Dist';
var kCoords = 'Coords';
var kLvl = 'Lvl';
var kCityName = kCity + ' Name';
var kLord = 'Lord';
var kPower = 'Power';
var kAlliance = 'Alliance';
var kLevels = ' Levels';
var kTraining = 'Training:';
var kTraining1 = 'Training ';
var kAutoBuildOn = 'Auto Build ON';
var kAutoBuildOff = 'Auto Build OFF';
var kAutoResearchOn = 'Auto Research ON';
var kAutoResearchOff = 'Auto Research OFF';
var kCityNumber = kCity +' #';
var kLevel = 'level ';
var kLevel1 = ' Level';
var kNothingToDo = 'Nothing to do, disabling auto-build.';
var kNoResearchToDo = 'Nothing to do, disabling auto-research';
var kBuildingLevel = 'Building level ';
var kBuilding = 'Building:';
var kBuilding1 = kBuilding +' ';
var kIdle = 'idle';

// Global
var kAttackSent = 'Attack sent to level';
var kManualAttackSent = 'Manual attack sent to level';
var kAt = 'at';

var kCancel = '"CANCEL"';
var kContinue = '"CONTINUE"';
var kAutoRetry = 'Automatic retry in ';
var kSeconds1 = kSeconds +' ...';
var kCancelRetry = '"CANCEL Retry"';
var kNewVersionAvailable = 'New Version Available!';
var kAnnounceVersion = 'There is a new version of '+ Title +'<BR><BR>Version: ';
var kRemindLater = '"Remind me later"';
var kNoReminder = '"Don\'t remind me again"';
var kTargetCoords = 'Target Coords: ';
var kDistance1 = 'Distance: ';
var kWaveTroops = 'Troops for Wave Attack: ';
var kDeleteBattleReports = ' Delete battle reports:';
var kDelayBetweenAttacks = 'Delay Between attacks: ';
var kResetStats = '"Reset Stats"';
var kGot = ': Got ';
var kRunTime = 'Run Time: ';
var kAttackOn = 'Attacks ON';
var kAttackOff = 'Attacks OFF';

var kStatsStarted = 'Stats started at: ';
var kResources = 'Resources: ';
var kStatsBy = 'Stats by ';
var kEnable = 'Enable: ';
var kDistanceWarning = 'Distance must be between 1 and ';
var kTroopWarning = 'Invalid # of troops';
var kMaxDist = 'Max Dist: ';

var kDefending = 'DEFENDING';
var kSanctuary = 'HIDING';
var kMarches = 'Marches:';
var kTroops = 'Troops';
var kGenerals = 'Generals';
var kUnits = 'units';

// Buttons
var kRefresh = 'Refresh';

var kAutoTrain = 'Auto Train';
var kConfigTrain = 'Training Configuration';
var kMinHousing = 'Minimum Housing';
var kMinResourceLevels = 'Minimum Resource Levels';

// Options Tab
var kOptions = 'Options';
var kGameOptions = 'Game Options';
var kAutoCollect = 'Auto-collect resources from outpost(s) every';
var kSeconds = 'Second(s)';
var kMinutes = 'Minute(s)';
var kHours = 'Hour(s)';
var kDays = 'Day(s)';
var kScriptOptions = 'Script Options';
var kEnableDrag = 'Enable window drag (move window by dragging top bar with mouse)';
var kEnableVerbose = 'Enable verbose logging (only use when an error is suspected)';


/*******************************************************************************
**************************** Traductions françaises ****************************
*******************************************************************************/
var translateFrArray = {
	'Auto Upgrade Buildings':'Agrandissement Automatique',
	'Attack One Target in Waves':'Attaquer Une Cible en Vagues',
	'Target Coords: ':'Coords de la Cible: ',
	'Troops for Wave Attack: ':'Troupes pour Attaque en Vague: ',
	' Delete battle reports:':' Supprimer les rapports de bataille:',
	'Stop if any troops lost: ':'Arrêter si perte de troupes: ',
	'Delay Between attacks: ':'Délai Entre les Attaques: ',
	' to ':' à',
	' seconds ':' secondes ',
	'Reset Stats':'Supprimer les Stats',
	'Attacks OFF':'Attaques OFF',
	'Attacks ON':'Attaques ON',
	'Auto Build OFF':'Construction Automatique OFF',
	'Auto Build ON':'Construction Automatique ON',
	'Run Time: ':'Temps d\'exécution',
	'Attacks':'Attaques',
	'Garrison':'Garnison',
	'Home':'Maison',
	'Fortress':'Forteresse',
	'Sentinel':'Sentinelle',
	'MusterPoint':'Caserne',
	'OfficerQuarter':'Quartier des Officiers',
	'StorageVault':'Entrepôt Sécurisé',
	'DragonKeep':'La Tour du Dragon',
	'Wall':'Remparts',
	'Mine':'Mine',
	'Farm':'Ferme',
	'Lumbermill':'Scierie',
	'Quarry':'Carrière',
	'TrainingCamp':'Camp d\'Entraînement',
	'Silo':'Silo',
	'Agriculture':'Agriculture',
	'Woodcraft':'Science du Bois',
	'Masonry':'Maçonnerie',
	'Alloys':'Alliages',
	'Clairvoyance':'Clairvoyance',
	'Rapid Deployment':'Déploiment Rapide',
	'Weapons Calibration':'Calibration d\'Armes',
	'Metallurgy':'Métallurgie',
	'Medicine':'Médecine',
	'Dragonry':'Etude Dragons',
	'Levitation':'Lévitation',
	'Mercantilism':'Mercantilisme',
	'Aerial combat':'Combat Aérien',
	'level':'niveau',
	'Units':'Troupes',
	'Wave':'Vague',
	'AntCamp':'Camp d\'Anthropus',
	'Anthropus Camp':'Camp d\'Anthropus',
	'GENERALS':'GENERAUX',
	'Marches':'Marches',
	'Building':'Construction',
	'Research':'Recherche',
	'Training':'Entraînement',
	'NONE':'AUCUN',
	'BUSY':'OCCUPE',
	'refresh':'rafraîchir',
	'Not enough':'Pas assez de',
	'Porter':'Porteur',
	'Conscript':'Conscrit',
	'Spy':'Espion',
	'Halberdsman':'Hallbardier',
	'Minotaur':'Minotaure',
	'Longbowman':'Archer',
	'SwiftStrikeDragon':'Dragon Rapide',
	'BattleDragon':'Dragon Guerrier',
	'ArmoredTransport':'Dirigeable',
	'Giant':'Géant',
	'FireMirror':'Miroir',
	'GreatDragon':'Grand Dragon',
	'WaterDragon':'Dragon Aqua',
	'AquaTroop':'Soldat Aqua',
	//new adds
	'idle':'vide',
	'Lake':'Lac',
	'Grassland':'Savane',
	'Forest':'Forêt',
	'Plain':'Plaine',
	'Hill':'Colline',
	'Mountain':'Montagne',
	'City':'Cité',
	'Outpost':'Poste Extérieur',
	'LBM':'Archer',
	'BatDrg':'DrgGue',
	'SSDrg':'DrgRap',
	'FireM':'MiroirFeu',
	'Fang':'GueAqua',
	'ATrans':'DiriB',
	'Info':'L\'Info',
	'HIDING':'DISSIMULATION',
	'DEFENDING':'DèFENSE'
};

/*******************************************************************************
**************************** Traductions hollandaises ****************************
*******************************************************************************/
var translateNlArray = {
	'Auto Upgrade Buildings':'Auto Upgrade Buildings',
	'Attack One Target in Waves':'Val een doelwit in Waves aan',
	'Target Coords: ':'Doelwit Coördinaten: ',
	'Troops for Wave Attack: ':'Troepen voor Wave-Aanval: ',
	' Delete battle reports: ':' Wis Battle Rapport:',
	'Stop if any troops lost: ':'Stop met verlies: ',
	'Delay Between attacks: ':'Wachttijd tussen aanvallen: ',
	' to ':' A ',
	' seconds ':' seconde ',
	'Reset Stats':'Reset Stat',
	'Attacks OFF':'Aanval OFF',
	'Attacks ON':'Aanval ON',
	'Auto Build OFF':'Automatisch Bouwen OFF',
	'Auto Build ON':'Automatisch Bouwen ON',
	'Run Time: ':'Run Time',
	'Attacks':'Aanvallen',
	'Garrison':'Garnizoen',
	'Home':'Huis',
	'Fortress':'Fort',
	'Sentinel':'Helderziende',
	'MusterPoint':'Verzamelpunt',
	'OfficerQuarter':'Officiersvertrekken',
	'StorageVault':'Opslagbunker', 
	'DragonKeep':'Drakenkraal',
	'Wall':'Muur',
	'Mine':'Mijn',
	'Farm':'Boerderij',
	'Lumbermill':'Houthakker',
	'Quarry':'Groeve',
	'TrainingCamp':'Trainingskamp',
	'Silo':'Silo',
	'Agriculture':'Landbouw',
	'Woodcraft':'Houtbewerking',
	'Masonry':'Metselwerk',
	'Alloys':'Legering',
	'Clairvoyance':'Helderziendheid',
	'Rapid Deployment':'Snelle inzet',
	'Weapons Calibration':'Wapenkalibratie',
	'Metallurgy':'Métallurgie',
	'Medicine':'Medicijnen',
	'Dragonry':'Drakenhouden',
	'Levitation':'Levitatie',
	'Mercantilism':'Marktkunde',
	'Aerial combat':'Luchtgevecht',
	'level':'Level',
	'Units':'Eenheden',
	'Wave':'Wave',
	'AntCamp':'Anthrokamp',
	'Anthropus Camp':'Anthropus kamp',
	'GENERALS':'GENERAAL',
	'Marches':'Marsen',
	'Building':'Bouwen',
	'Research':'Onderzoek',
	'Training':'Training',
	'NONE':'Geen',
	'BUSY':'Bezig',
	'refresh':'Refresh',
	'Not enough':'Niet genoeg',
	'Porter':'Drager',
	'Conscript':'Rekruut',
	'Spy':'Spion',
	'Halberdsman':'Hellebaardier',
	'Minotaur':'Minotaurus',
	'Longbowman':'Boogschutter',
	'SwiftStrikeDragon':'SnelleAanvalsDraak',
	'BattleDragon':'VechtDraak',
	'ArmoredTransport':'GewapendTransport',
	'Giant':'Reus',
	'FireMirror':'VuurSpiegel',
	'GreatDragon':'Grote Draak',
	'WaterDragon':'WaterDraak',
	'AquaTroop':'SnijTand',
	'Info':'Info',
	'HIDING':'HET VERBERGEN',
	'DEFENDING':'HET VERDEDIGEN'
};

/*******************************************************************************
**************************** Traductions espagnoles ****************************
*******************************************************************************/
var translateEsArray = {
	'Auto Upgrade Buildings':'Auto-Construccion',
	'Attack One Target in Waves':'Ataques en oleadas a enemigos',
	'Target Coords: ':'Coordenadas: ',
	'Troops for Wave Attack: ':'Tropas para ataques masivos: ',
	' Delete battle reports:':' Eliminar los informes de batalla:',
	'Stop if any troops lost: ':'Parar de atacar si las tropas perdieron: ',
	'Delay Between attacks: ':'Tiempo entre ataques: ',
	' to ':' a ',
	' seconds ':' segundos ',
	'Reset Stats':'Reset Tabla',
	'Attacks OFF':'Ataques OFF',
	'Attacks ON':'Ataques ON',
	'Auto Build OFF':'Auto-Construccion OFF',
	'Auto Build ON':'Auto-Construccion ON',
	'Run Time: ':'Tiempo de Ejecuccion:',
	'Attacks':'Ataques',
	'Garrison':'Guarnicion',
	'Home':'Casas',
	'Fortress':'Fortaleza',
	'Sentinel':'Centinela',
	'MusterPoint':'Punto de Encuentro',
	'OfficerQuarter':'Cuartel',
	'StorageVault':'Almacen', 
	'DragonKeep':'Guarida del Dragon',
	'Wall':'Muralla',
	'Mine':'Mina',
	'Farm':'Granja',
	'Lumbermill':'Aserradero',
	'Quarry':'Cantera',
	'TrainingCamp':'Campo de entrenamiento',
	'Silo':'Silo',
	'Agriculture':'Agricultura',
	'Woodcraft':'Arte de madera',
	'Masonry':'Albannileria',
	'Alloys':'Aleaciones',
	'Clairvoyance':'Clarividencia',
	'Rapid Deployment':'Despliegue Rapido',
	'Weapons Calibration':'Calibracion de las armas',
	'Metallurgy':'Metalurgia',
	'Medicine':'Medicina',
	'Dragonry':'Habilidad del dragon',
	'Levitation':'Levitacion',
	'Mercantilism':'Mercantilismo',
	'Aerial combat':'Combate aereo',
	'level':'Nivel',
	'Units':'Unidades',
	'Wave':'Wave',
	'AntCamp':'Campo del Anthropus',
	'Anthropus Camp':'Campo del Anthropus',
	'Generals':'Generales',
	'Marches':'Marchas',
	'Building':'Edificio',
	'Research':'Investigacion',
	'Training':'Entrenamiento',
	'None':'Niguno',
	'BUSY':'OCUPADO',
	'refresh':'restaure',
	'Not enough':'no bastantes',
	'Porter':'Porteador',
	'Conscript':'Recluta',
	'Spy':'Espia',
	'Spies':'Espias',
	'Halberdsman':'Alabardero',
	'Halberdsmen':'Alabarderos',
	'Minotaur':'Minotauro',
	'Longbowman':'Arquero',
	'SwiftStrikeDragon':'Dragon de ataque rapido',
	'BattleDragon':'Dragon de combate',
	'ArmoredTransport':'Dirigible Acorazado',
	'Giant':'Gigante',
	'FireMirror':'Espejo de Fuego',
	'GreatDragon':'Gran Dragon',
	'WaterDragon':'Dragon de Agua',
	'AquaTroop':'Tropa de Agua',
	'Info':'Info',
	'HIDING':'Ocultacion',
	'DEFENDING':'Defensa'
};

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
*) added Maps tab - searches and displays ant camps, cities, outposts, grasslands, swamps, lakes, hills, plains, mountains, and forests within 35 miles
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
  wave: option to log attacks
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
var OptionsDefaults = {
	// Popup
	popUp			: {open:true, drag:true, x:0, y:0},
	
  objAttack     : {enabled:false, repeatTime:3660, delayMin:30, delayMax:60, levelEnable:[], levelDist:[null,10,10,10,10,10,10,10,10,10,10], deleteObjAttacks:false, stopAttackOnLoss:false, logAttacks:true, maxMarches:10, troops:[], clearAllTargets:false},
  currentTab    : false,
  attackTab     : 0,
  mapTab        : 0,
  jobsTab       : 0,

  autoBuild     : {enabled:false, buildingEnable:[], buildCap:[]},
  autoResearch  : {enabled:false, researchEnable:[], researchCap:[]},
  autoTrain     : {enabled:false, trainingEnable:[], city:[]},
  messages      : {lastRead:0, missing:0},
  //waves         : {enabled:false, iterationMin:30, iterationMax:45, stopOnLoss:true, deleteReports:false, targets:[], runTime:0},
  objStats      : null,
  objMarches    : {},
  version       : {lastChecked:0, checkVersion:Version, lastVersion:Version},
  maps          : {enabled:false, repeatTime:3660, delayMin:30, delayMax:60, levelEnable:[], levelDist:[null,10,10,10,10,10,10,10,10,10,10], deleteObjAttacks:false, stopAttackOnLoss:false, logAttacks:true, maxMarches:10},
  mapChoice     : kAntCamp,
  mapMarches    : {},
  autoColInt    : 8,
  isDefending   : false,
  trainTab      : 0,
  trainQChoice  : kMinHousing,
  troopCap      : {},
  tJobs         : [],
  rJobs         : [],
  buildTimer    : null,
  researchTimer : null,
  trainTimer    : null,
//  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, minTroops:10000, spamLimit:10 },
	// Options Tab
	autoCollect		: {enabled:false, lastTime:0, delay:1, unit:3600},
	verboseLog		: {enabled:false},
	
};

var Styles = '\
    div.' + rndClass['tab_title'] + ' {border:1px solid; border-color:#CAB16A; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#5D902A; background-color:#CAB16A}\
    div.' + rndStyle['classPrefix'] + 'Subtitle {border:1px solid; border-color:#CAB16A; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#5D902A; background-color:#CAB16A}\
    div.' + rndStyle['classPrefix'] + 'Input {border:2px ridge yellow; background-color:#CAB16A; padding:3px}\
    div.' + rndStyle['status_ticker'] + ' {border:2px ridge black; background-color:#CAB16A; padding:2px}\
	div.' + rndStyle['status_feedback'] + ' {height: 34px; border:1px solid black; background-color:#CAB16A; padding: 2px 0px 2px 2px; text-align:left; font-weight:bold;}\
    div.short {height:7px;}\
    .hiding {background-color: #2FAC2F; color: white; padding-left: 10px; padding-right: 10px; margin-right: -2px;}\
    .defending {background-color: #F80000; color: white; padding-left: 10px; padding-right: 10px; margin-right: -2px;}\
    div#qTip {padding: 3px; border: 1px solid #777; border-right-width: 2px; border-bottom-width: 2px; display: none; background: #999; color: #fff; font: bold 9px Verdana, Arial, sans-serif; text-align: left; position: absolute; z-index: 1000}\
    table.' + rndStyle['classPrefix'] + 'TabPad tr td {border:none; background:none; white-space:nowrap; padding: 1px 1px}\
    table.' + rndStyle['classPrefix'] + 'Tab tr td {border:none; background:none; white-space:nowrap; padding: 1px 1px;}\
    table tr td.' + rndStyle['classPrefix'] + 'TabLeft {font-weight:bold; text-align:right; padding-right: 5px}\
    table.' + rndStyle['classPrefix'] + 'TabLined tr td {border-bottom:1px solid #ccc; background:none; padding: 1px 4px 1px 4px;}\
    table tr.' + rndStyle['classPrefix'] + 'TabHdr1 td {background-color:#dde; font-weight:bold}\
    table tr.' + rndStyle['classPrefix'] + 'TabHdr2 td {font-weight:bold}\
    tr.' + rndStyle['classPrefix'] + 'MarchOther td {color:#888888}\
    tr.' + rndStyle['classPrefix'] + 'MarchMine td {color:#000000}\
    tr.pbretry_ptpoptp td { background-color:#a00; color:#fff; border:none; height: 21px; padding:0px; }\
    tr.' + rndStyle['classPrefix'] + 'retry_ptpoptp td { background-color:#a00; color:#fff; border:none; height: 21px; padding:0px; }\
    tr.' + rndStyle['classPrefix'] + 'Owned {background-color: #e80000; color:white}\
    table.' + rndStyle['classPrefix'] + 'MainTab {empty-cells:show; margin-top:5px; }\
    table.' + rndStyle['classPrefix'] + 'MainTab tr td a {color:inherit }\
    table.' + rndStyle['classPrefix'] + 'MainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 2px solid; border-style: none none solid none; }\
    table.' + rndStyle['classPrefix'] + 'MainTab tr td.spacer {padding: 0px 3px; border:none; }\
    table.' + rndStyle['classPrefix'] + 'MainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed; cursor:hand; cursor:pointer; padding: 2px;}\
    table.' + rndStyle['classPrefix'] + 'MainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#0044a0; color:white; border-color:black; cursor:hand; cursor:pointer; padding: 2px;}\
    .' + rndStyle['classPrefix'] + 'CP .' + rndStyle['classPrefix'] + 'CPMain { background-color:#f8f8f8; padding:6px;}\
    input.butAttackOff {width:130px; background-color:#e80000; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
    input.butAttackOff:hover {width:130px; background-color:#f80000; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
    input.butAttackOn {width:130px; background-color:#009C1F; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
    input.butAttackOn:hover {width:130px; background-color:#2FAC2F; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
    input.small {margin:0; padding-top:0; padding-bottom:0; padding-left:1px; padding-right:1px; font-size:10px}\
    input.short {width:30px}\
    input.' + rndClass['red_button'] + ', input.' + rndClass['green_button'] + ', input.' + rndClass['blue_button'] + ', input.' + rndClass['yellow_button'] + ', input.' + rndClass['cyan_button'] + ', input.' + rndClass['purple_button'] + ' {width:130px; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
    input.' + rndClass['red_button'] + ':active, input.' + rndClass['green_button'] + ':active, input.' + rndClass['blue_button'] + ':active, input.' + rndClass['yellow_button'] + ':active, input.' + rndClass['cyan_button'] + ':active, input.' + rndClass['purple_button'] + ':active {width:130px; background-color:black; color:white; font-weight:bold; cursor:hand; cursor:pointer; }\
    input.' + rndClass['red_button'] + ':hover, input.' + rndClass['green_button'] + ':hover, input.' + rndClass['blue_button'] + ':hover, input.' + rndClass['yellow_button'] + ':hover, input.' + rndClass['cyan_button'] + ':hover, input.' + rndClass['purple_button'] + ':hover {width:130px; color:white; font-weight:bold; cursor:hand; cursor:pointer; }\
	input.' + rndClass['red_button'] + ' {background-color:#BF0000;}\
	input.' + rndClass['red_button'] + ':hover {background-color:#DF0000;}\
	input.' + rndClass['green_button'] + ' {background-color:#00BF00;}\
	input.' + rndClass['green_button'] + ':hover {background-color:#00DF00;}\
	input.' + rndClass['blue_button'] + ' {background-color:#0000BF;}\
	input.' + rndClass['blue_button'] + ':hover {background-color:#0000DF;}\
	input.' + rndClass['yellow_button'] + ' {background-color:#BFBF00;}\
	input.' + rndClass['yellow_button'] + ':hover {background-color:#DFDF00;}\
	input.' + rndClass['cyan_button'] + ' {background-color:#00BFBF;}\
	input.' + rndClass['cyan_button'] + ':hover {background-color:#00DFDF;}\
	input.' + rndClass['purple_button'] + ' {background-color:#BF00BF;}\
	input.' + rndClass['purple_button'] + ':hover {background-color:#DF00DF;}\
    .button {cursor:hand; cursor:pointer; border: 1px solid #006; background: #049C93; color: white; padding: 2px; font-weight:bold; font-size:13px; border-style: solid solid none solid;}\
//  .button:hover {background: #eed; font-weight:bold; font-size:13px; color: black; border-style: solid solid none solid; }\
//  .button:active {background: black; font-weight:bold; font-size:13px; color: white; border-style: none none none none;}\
    span.boldRed {color:#550000; font-weight:bold}\
    hr.thin {margin:0px; padding:0px}\
    #hdRnd ul.tabs li.tab a.' + rndStyle['classPrefix'] + 'toolbutOn {background-color:#900 ! important; color:white ! important}\
    #hdRnd ul.tabs li.tab a.' + rndStyle['classPrefix'] + 'toolbutOff {background-color:#ffc ! important; color:black ! important}\
    ';
	
// Global variables
var Tabs = {};
var currentName = kInfo;
var mainPop;
var gAttScrollPos = 0;
var gMapScrollPos = 0;
var C = {};
C.attrs = {};

// Provide language translation services based on the browswer language
function translate( wordToTranslate ) {
	var returnWord = wordToTranslate
	if ( navigator.language == 'fr' ) {
		if ( translateFrArray[wordToTranslate] != undefined ) {
			returnWord = translateFrArray[wordToTranslate];
		}
		else {
			logit( wordToTranslate+' à traduire' );
		}
	}
	else if ( navigator.language == 'nl' || navigator.language == 'du' ) {
		if ( translateNlArray[wordToTranslate] != undefined ) {
			returnWord = translateNlArray[wordToTranslate];
		}
		else {
			logit( wordToTranslate+' à traduire' );
		}
	}
	return returnWord;
}

function getC (swf){
  "use strict";
  var parms = swf.innerHTML;
  var re = /\<\s*param\s*(.*?)\>/gi;
  var attrs={};
  var m = null;
  while ((m = re.exec(parms)) != null){
    var nv = parseNvQuoted(m[1]);
    if (nv.name && nv.name=='flashvars'){
      m = entityDecode(nv.value).split('&');
      for (var i=0; i<m.length; i++){
        var mm = m[i].split('=');
        attrs[mm[0].trim()] = mm[1].trim();
      }
      break;
    }
  }
  // will have to enhance this if they change the names ...
  C.attrs.apiServer = attrs.api_server;
  C.attrs.sessionId = attrs.session_id;
  C.attrs.dragonHeart = attrs.dragon_heart;
  C.attrs.userId = attrs.user_id;
}

var dtStartupTimer = null;
var doatLoaded = false;
var startupCount = 0;
var initTimer = null;
var initCount = 0;

// Main entry
function dtStartup() {
	clearTimeout(dtStartupTimer);
	pickRandomTitle();
	if (doatLoaded)
		return;
	if (++startupCount > 10) {
		dialogFatal (kFatalSWF);
		return;
	}
	try {  
		var swf = null;
		var obs = document.getElementsByTagName ('object');
		if (obs.length < 1) {
			dtStartupTimer = setTimeout(dtStartup, 1000);
			return;
		}
		for (var i=0; i<obs.length; i++) {
			if (obs[i].type && obs[i].type=='application/x-shockwave-flash') {
				swf = obs[i];
				getC(swf);
				if (C.attrs.apiServer)
					break;
			}
		}
		if (!C.attrs.apiServer) {
			dtStartupTimer = setTimeout(dtStartup, 1000);
			return;
		}  
	} catch (e) {
		dtStartupTimer = setTimeout(dtStartup, 1000);
		return;
	}
	doatLoaded = true;
	try {
		WinLog.enabled = ENABLE_WINLOG;
		logit (inspect (C, 6, 1));
		Data.init({options:OptionsDefaults, log:[], targets:{radius:0, center:{x:0, y:0}, mapObjects:[], camps:[], cities:[], outposts:[], grasslands:[], swamps:[], lakes:[], hills:[], plains:[], mountains:[], forests:[]}});
		//checkVersion (); // CHECK
		
		actionLog(Version +" Loaded");
		
		Translate.init(function (rslt) {
			if (rslt.ok) {
				if (Data.options.verboseLog.enabled)
					actionLog('Translation matrix successfully initialised');
				//console.log(Translate.item('ceasefiretreaty'));
				//alert(Translate.item('ceasefiretreaty'));
				//console.log(Translate.troop('SwiftStrikeDragon'));
				checkInit(true);
			} else {
				dialogFatal('<B>' + kFatalSeedTitle + '</B><BR><BR>\
					' + kFatalSeedMsg + '<BR><BR>\
					<A id="' + rndId['support_link'] + '" href="javascript:;">Bugs and Known Issues</A><BR><BR>\
					<FONT color="#BF0000"><B> ' + rslt.errmsg + '</B></FONT>');
				return;
			}
		});
		
		Manifest.init(function (rslt) {
			if (rslt.ok) {
				if (Data.options.verboseLog.enabled)
					actionLog('Manifest successfully initialised');
				checkInit(true);
			} else {
				dialogFatal('<B>' + kFatalSeedTitle + '</B><BR><BR>\
					' + kFatalSeedMsg + '<BR><BR>\
					<A id="' + rndId['support_link'] + '" href="javascript:;">Bugs and Known Issues</A><BR><BR>\
					<FONT color="#BF0000"><B> ' + rslt.errmsg + '</B></FONT>');
				return;
			}
		});
		
		Seed.init(function (rslt) {
			if (rslt.ok) {
				if (Data.options.verboseLog.enabled)
					actionLog('Seed successfully initialised');
				checkInit(true);
			} else {
				dialogFatal('<B>' + kFatalSeedTitle + '</B><BR><BR>\
					' + kFatalSeedMsg + '<BR><BR>\
					<A id="' + rndId['support_link'] + '" href="javascript:;">Bugs and Known Issues</A><BR><BR>\
					<FONT color="#BF0000"><B> ' + rslt.errmsg + '</B></FONT>');
				return;
			}
		});
		

		
		function checkInit(status) {
			clearTimeout(initTimer);
			if (status === true) {
				initCount = initCount + 1;
				console.log('checkInit = ' + initCount);
			}
			console.log(Seed.cityInit + ' ' + Seed.numCities);
			
			if (initCount >= 4 && Seed.cityInit >= Seed.numCities) {
				startScript();
			} else {
				initTimer = setTimeout(checkInit, 1000);
			}
		}
		
		function startScript() {    // TODO: check result, retry or disable tools?
			// Get client screen width and adjust script popup to suit
			if (screen.width >= 1240) {
				var popupWidth = 475 + Math.floor(Math.random()*11);
			} else {
				var popupWidth = 395 + Math.floor(Math.random()*11);
			}
			// Create a new popup DIV for the main script window
			mainPop = new CPopup ('main', Data.options.popUp.x, Data.options.popUp.y, popupWidth, 800, Data.options.popUp.drag, function () {
				tabManager.hideTab();
			});
			// Apply CSS style information to the main script popup DIV
			mainPop.getMainDiv().innerHTML = '<style>'+ Styles +'</style>';
			// Create all the tabs and insert them into the main script popup DIV
			tabManager.init(mainPop.getMainDiv());
			// Display everything
			Data.options.popUp.open = true;
			if (Data.options.popUp.open) {
				mainPop.show(true);
				tabManager.showTab();
			}
			AutoCollect.init (); // CHECK: Should this be here or somewhere else?
			Messages.init (); // CHECK: Should this be here or somewhere else?
			// Start event listeners to look for an unload event from the main popup DIV
			// CHECK: Calling two function for the same event really should not be necessary
			// CHECK: Using beforeunload may be more suitable but need to look at browser compatibilty
			window.addEventListener('unload', onUnload, false);
			window.addEventListener('unload', Data.onUnload, false);
		}
	} catch (e) {
		dialogFatal(kInitErr + e);
		logit(inspect (e, 8, 1));
	}  
}

function onUnload() {
	logit('Save popUp position');
	Data.options.popUp = mainPop.getLocation();
}

// Translation
function dialogFatal(msg) {
    var pop = new CPopup('fatal', 200,300, 400,300, true); 
    pop.getMainDiv().innerHTML = '<STYLE>' + Styles + '</style><BR>' + msg ;
    pop.getTopDiv().innerHTML = '<B><CENTER>' + kError + '</center></b>' ;
    pop.show(true);
	
	document.getElementById(rndId['support_link']).addEventListener('click', redirect, false);
	
	function redirect() {
		window.open(urlError, 'MMOG Wiki');
	}
}

var RequestQueue = {
  que : {},
  add : function (id, func, maxWaitMillis){
    var t = RequestQueue;
    var now = serverTime();
    var maxWait = maxWaitMillis/1000;
    if (isNaN(maxWaitMillis))
      maxWait = 1;
    if (t.que[id]){
      if (now+maxWaitMillis >= t.que[id][2])
        return;      
      clearTimeout(t.que[id][1]);  
    } 
    var timer = setTimeout (function(){myFunc(id)}, maxWait*1000);
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
      for (var p in RequestQueue.que)
        m += p +' : '+ RequestQueue.que[p][1] +' : '+ RequestQueue.que[p][2] +' ('+ (RequestQueue.que[p][2]-now) +')\n';
      WinLog.write (m);
    }   
  }, 

  isPending : function (id){
    var t = RequestQueue;
    return t.que[id]?true:false;
  },
}

// This is very crude - does not really check for an updated version, only if the current version is different from the one in userscripts.org
function checkVersion (){
  //if (IsChrome) return;
  var now = new Date().getTime()/1000;
  if (Data.options.version.lastCheck > now-(VERSION_CHECK_HOURS*3600))
    return;
  logit ('CHECKING VERSION.....');   
  var timer = setTimeout (checkVersion, VERSION_CHECK_HOURS*3600*1000);
  GM_xmlhttpRequest({
    method: 'GET',
    url: WebSite,
    onload : function(r){
      var m = r.responseText.match (/var \s*Version\s*=\s*\'(.*)\'/m);
      if (m && m[1]!=Data.options.version.checkVersion){
        clearTimeout (timer);
        pop = new CPopup ('checkversion', Data.options.popUp.x, Data.options.popUp.y, 300,200, Data.options.popUp.drag, remindLater); 
        // Translation
        pop.getTopDiv ().innerHTML = '<CENTER><B>'+ kNewVersionAvailable +'</b></center>';
        pop.getMainDiv ().innerHTML = '<STYLE>'+ Styles +'</style><BR><CENTER>'+ kAnnounceVersion + m[1] 
            +'<BR><BR>at: <A HREF="http://'+ WebSite +'">'+ WebSite +'</a><BR><BR><INPUT id=doaVerRML type=submit value='+ kRemindLater +'\> &nbsp; &nbsp;<INPUT id=doaVerDR type=submit value='+ kNoReminder +'\></center>';
        pop.setLayer(20);
        pop.show(true);
        document.getElementById('doaVerRML').addEventListener('click', remindLater, false);
        document.getElementById('doaVerDR').addEventListener('click', function(){dontRemind(m[1])}, false);
      }
    },
  });
  function remindLater (){
    pop.show(false);
    Data.options.version.lastCheck = now;
    setTimeout (checkVersion, VERSION_CHECK_ITER*1000);
  }
  function dontRemind (v){
    Data.options.version.checkVersion = v;
    pop.show(false);
    Data.options.version.lastCheck = now;
    setTimeout (checkVersion, VERSION_CHECK_ITER*1000);
  }
}

// TODO: reduce n/w traffic - cache up requests
var Messages = {
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
    if (t.deleteQueue.length == 0)
      t.deleteTimer = setTimeout (doit, 60000);
    t.deleteQueue.push (msgId);
    function doit (){
      var t = Messages;
      //logit ('DELETE MESSAGES:\n'+ inspect (t.deleteQueue, 5, 1));      
      Ajax.messageDelete (t.deleteQueue, function (rslt){
        var t = Messages;
        t.deleteQueue = [];
      });
    }
  },

  onUnload : function (){
    var t = Messages;
    if (t.deleteQueue.length>0)
      Ajax.messageDelete (t.deleteQueue);
 },
  
  // check for battle reports
  checkMessages : function (maxWaitMillis){
    var t = Messages;
    if (t.battleReportListeners.length==0)
      return;
    if (maxWaitMillis == null)
      maxWaitMillis = 30000;
    RequestQueue.add ('checkMessages', doit, maxWaitMillis);      
      
    function doit (){
      Ajax.messageList ('all', function (rslt){
        var t = Messages;
        if (rslt==null)
          return;
        //logit ('messageList:\n' + inspect (rslt, 7, 1));        
        for (var i=rslt.length-1; i>=0; i--){
          if (rslt[i].report_type=="BattleReport" && !rslt[i].read_at){
            if (t.readList.indexOf(rslt[i].id) < 0)
              t.readList.push (rslt[i].id);
          }
        }
        clearTimeout (t.fetchTimer);
        if (t.readList.length > 0)
          t.fetchTimer = setTimeout (t.fetchNext, 2000);
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
    Ajax.messageDetail (id, function (rslt){
      var t = Messages;
      t.readList.shift();
      t.gotBattleReport (rslt);
      if (t.readList.length > 0)
        t.fetchTimer = setTimeout (t.fetchNext, 2500);
    });
  },
  
  gotBattleReport : function (rpt){
    var t = Messages;
if (DEBUG_MARCHES) WinLog.write ('Read Message: '+ rpt.report.location.terrain +' , '+ rpt.report.location.x +','+  rpt.report.location.y +' General: '+ rpt.report.attacker.general.id );    
    for (var i=0; i<t.battleReportListeners.length; i++)
      t.battleReportListeners[i](rpt);
  },
  addBattleReportListener : function (notify){
    var t = Messages;
    t.battleReportListeners.push (notify);
  },
  removeBattleReportListener : function (notify){
    var t = Messages;
    var i = t.battleReportListeners.indexOf (notify);
    if (i>=0)
      t.battleReportListeners.splice (i, 1);
  },
}

Date.prototype.myString = function (){
  return this.toDateString() +' '+ this.toTimeString().substr (0,8);
}

var Manifest = {
	m : {},
	
	init : function (notify) {
		Manifest.fetchManifest(function (rslt) {
			if (rslt.ok) {
				if (Data.options.verboseLog.enabled)
					actionLog('Manifest was successfully requested from the server');
			}
			if (notify)
				notify(rslt);
		});
	},
	
	fetchManifest : function (notify) {
		var now = new Date().getTime() / 1000;
		new MyAjaxRequest ('manifest.json', { 'user%5Fid':C.attrs.userId, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, version:getVersion, 'dragon%5Fheart':C.attrs.dragonHeart }, function (rslt) {
			if (rslt.ok && !rslt.dat.errors) {
				Manifest.m = rslt.dat; // This holds the entire Manifest JSON data parsed as an object 
				try {
					//var testThis = Manifest.buildings.byCityType('capital', 'all', {alphabetical: 'asc', buildable: false});
					//testThis = Manifest.buildings.sortBy(testThis, {alphabetical: 'desc', buildable: false});
					//for (var i = 0; i < testThis.length; i = i + 1) {
					//	console.log(testThis[i].type);
					//}
				} catch (e) {
					rslt.ok = false;
					rslt.errmsg = 'fetchManifest when calling updateManifest returned this error: ' + e.toString();
				}
			} else if (rslt.ok && rslt.dat.errors) {
				rslt.ok = false;
				rslt.errmsg = rslt.dat.errors;
			}
			if (notify)
				notify(rslt);
		}, false);
	},
	
	buildings : {
		byCityType : function (cityType, buildable, order) {
			var b, buildings = Manifest.m.buildings, ct, rslt = [];
			if (!buildable) {
				buildable = 'all';
			}
			if (!cityType) {
				cityType = 'all';
			}
			if (buildings.length > 0) {
				for (b = 0; b < buildings.length; b = b + 1) {
					if (buildings[b].buildable === buildable || buildable.toLowerCase() === 'all') {
						if (buildings[b].city_type.length > 0) {
							for (ct = 0; ct < buildings[b].city_type.length; ct = ct + 1) {
								if (buildings[b].city_type[ct] === cityType.toLowerCase() || cityType.toLowerCase() === 'all') {
									rslt[rslt.length] = buildings[b];
									break;
								}
							}
						}
					}
				}
			}
			if (order) {
				rslt = Manifest.buildings.sortBy(rslt, order);
			}
			return rslt;
		},
		
		byLocation : function (location, buildable, order) {
			var b, buildings = Manifest.m.buildings, ct, rslt = [];
			if (!buildable) {
				buildable = 'all';
			}
			if (!location) {
				cityType = 'all';
			}
			if (buildings.length > 0) {
				for (b = 0; b < buildings.length; b = b + 1) {
					if (buildings[b].buildable === buildable || buildable.toLowerCase() === 'all') {
						if (buildings[b].location === location.toLowerCase() || location.toLowerCase() === 'all') {
							rslt[rslt.length] = buildings[b];
						}
					}
				}
			}
			if (order) {
				rslt = Manifest.buildings.sortBy(rslt, order);
			}
			return rslt;
		},
		
		sortBy : function (data, order) {
			var rslt = [], orderBy;
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
				if (order.toLowerCase() === 'asc') {
					data.sort(function (a, b) {
						var typeA = a.type.toLowerCase(), typeB = b.type.toLowerCase();
						if (typeA < typeB) {return -1}
						if (typeA > typeB) {return 1}
						return 0;
					});
				} else if (order.toLowerCase() === 'desc') {
					data.sort(function (a, b) {
						var typeA = a.type.toLowerCase(), typeB = b.type.toLowerCase();
						if (typeA > typeB) {return -1}
						if (typeA < typeB) {return 1}
						return 0;
					});
				}
			}
		
			function orderBuildable(order) {
				if (order === true) {
					data.sort(function (a, b) {
						var buildableA = a.buildable, buildableB = b.buildable;
						if (buildableA < buildableB) {return -1}
						if (buildableA > buildableB) {return 1}
						return 0;
					});
				} else if (order === false) {
					data.sort(function (a, b) {
						var buildableA = a.buildable, buildableB = b.buildable;
						if (buildableA > buildableB) {return -1}
						if (buildableA < buildableB) {return 1}
						return 0;
					});
				}
			}

			
			function orderLocation(order) {
				if (order.toLowerCase() === 'city') {
					data.sort(function (a, b) {
						var locationA = a.location.toLowerCase(), locationB = b.location.toLowerCase();
						if (locationA < locationB) {return -1}
						if (locationA > locationB) {return 1}
						return 0;
					});
				} else if (order.toLowerCase() === 'field') {
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
		for (b = 0; b < Manifest.m.buildings.length; b = b + 1) {
			
		}
		} else {
			// Return an error message because no type was specificed
		}
	},
	
	updateManifest : function () {
		var b, r, t;
		var buildingManifest = Manifest.m.buildings;
		var researchManifest = Manifest.m.research;
		var troopManifest = Manifest.m.city.capital.units;
		
		// Initialise buildings
		for (var b=0; b<buildingManifest.length; b++)
			if (!Seed.requirements.building[buildingManifest[b].type])
				Seed.requirements.building[buildingManifest[b].type] = {};
		
		// Initialise levels for each building
		for (var b=0; b<buildingManifest.length; b++) {
			if (!Seed.requirements.building[buildingManifest[b].type].level) 
				Seed.requirements.building[buildingManifest[b].type].level = [];
					for (var l=0; l<buildingManifest[b].levels.length; l++) 
						Seed.requirements.building[buildingManifest[b].type].level[buildingManifest[b].levels[l].level] = {};
		}

		// 	Save building requirements
		for (var b=0; b<buildingManifest.length; b++) 
			for (var l=0; l<buildingManifest[b].levels.length; l++) 
				Seed.requirements.building[buildingManifest[b].type].level[buildingManifest[b].levels[l].level] = buildingManifest[b].levels[l].requirements;
				
		// Initialise research
		for (var r=0; r<researchManifest.length; r++)
			if (!Seed.requirements.research[researchManifest[r].type])
				Seed.requirements.research[researchManifest[r].type] = {};
		
		// Initialise levels for each research
		for (var r=0; r<researchManifest.length; r++) {
			if (!Seed.requirements.research[researchManifest[r].type].level) 
				Seed.requirements.research[researchManifest[r].type].level = [];
					for (var l=0; l<researchManifest[r].levels.length; l++) 
						Seed.requirements.research[researchManifest[r].type].level[researchManifest[r].levels[l].level] = {};
		}

		// 	Save research requirements
		for (var r=0; r<researchManifest.length; r++) 
			for (var l=0; l<researchManifest[r].levels.length; l++) 
				Seed.requirements.research[researchManifest[r].type].level[researchManifest[r].levels[l].level] = researchManifest[r].levels[l].requirements;
				
		// Initialise troops
		for (var t=0; t<troopManifest.length; t++)
			if (!Seed.requirements.troop[troopManifest[t].type])
				Seed.requirements.troop[troopManifest[t].type] =[];

		// 	Save troop requirements
		for (var t=0; t<troopManifest.length; t++) 
			Seed.requirements.troop[troopManifest[t].type] = troopManifest[t].requirements;
	},


}

var Seed = {
	s : {},           // seed data  from server 
	cities : [],
	cityIdx : {},     // 'indicies'
	cityTs : {},      // timestamps of last update
	jobs : {},        // by city
	marches : {},
	numMarches : 0,
	generals : {},
	requirements : {building:[], research:[], troop:[]},
	numGenerals : 0,
	serverTimeOffset : 0,
	numCities : 0,
	cityInit : 0,
    
	init : function (notify) {
		var t = Seed;
		t.fetchManifest(function (rslt) {
			if (rslt.ok) {
				if (Data.options.verboseLog.enabled)
					actionLog('Manifest was successfully requested from the server');
			}
			if (notify)
				notify(rslt);
		});
		t.fetchSeed(function (rslt) {
			if (rslt.ok) {
				if (Data.options.verboseLog.enabled)
					actionLog('Player data was successfully requested from the server');
			}
			if (notify)
				notify(rslt);
		});
		setInterval(t.tick, 1000);
	},
  
	fetchManifest : function (notify) {
		var t = Seed;
		var now = new Date().getTime() / 1000;
		new MyAjaxRequest ('manifest.json', { 'user%5Fid':C.attrs.userId, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, version:getVersion, 'dragon%5Fheart':C.attrs.dragonHeart }, function (rslt) {
			if (rslt.ok && !rslt.dat.errors) {
				if (rslt.dat.timestamp)
					t.serverTimeOffset = rslt.dat.timestamp - now;
				t.r = rslt.dat; 
				try {
					t.updateManifest();
				} catch (e) {
					rslt.ok = false;
					rslt.errmsg = e.toString();
				}
			} else if (rslt.ok && rslt.dat.errors) {
				rslt.ok = false;
				rslt.errmsg = rslt.dat.errors;
			}
			if (notify)
				notify(rslt);
		}, false);
	},

	fetchSeed : function (notify) {
		var t = Seed, city;
		new MyAjaxRequest ('player.json', {'user%5Fid':C.attrs.userId, 'dragon%5Fheart':C.attrs.dragonHeart, '%5Fsession%5Fid':C.attrs.sessionId, version:getVersion, timestamp:parseInt(serverTime()) }, function (rslt) {
			if (rslt.ok && !rslt.dat.errors) {
				if (rslt.dat.timestamp)
					t.serverTimeOffset = rslt.dat.timestamp - (new Date().getTime() / 1000);
				t.s = rslt.dat; 
				for (city in rslt.dat.cities) {
					t.numCities = t.numCities + 1;
				}
				try {
					for (city in rslt.dat.cities) {
						Seed.cityIdx[rslt.dat.cities[city].id] = city;
						t.fetchCity(rslt.dat.cities[city].id);
					}
				} catch (e) {
					rslt.ok = false;
					rslt.errmsg = e.toString();
				}
			} else if (rslt.ok && rslt.dat.errors) {
				rslt.ok = false;
				rslt.errmsg = rslt.dat.errors;
			}
			if (notify)
				notify(rslt);
		});
	},
	
	fetchCity : function (cityId) {
		if (Data.options.verboseLog.enabled)
			actionLog('Attempting fetchCity ' + cityId);
		var t = Seed;
		new MyAjaxRequest('cities/'+ cityId +'.json', { 'user%5Fid':C.attrs.userId, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, version:getVersion, 'dragon%5Fheart':C.attrs.dragonHeart }, function (rslt) {
			if (rslt.ok && !rslt.dat.errors) {
				//t.checkIncomingData(rslt); // CHECK: This needs to be improved
				if (rslt.dat.timestamp) {
					t.serverTimeOffset = rslt.dat.timestamp - (new Date().getTime() / 1000);
				}
				if (Data.options.verboseLog.enabled)
					actionLog('Successful fetchCity ' + rslt.dat.city.id);
				t.updateCity(rslt.dat.city);
			} else if (rslt.ok && rslt.dat.errors) {
				rslt.ok = false;
				rslt.errmsg = rslt.dat.errors;
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
				--Seed.numMarches;
			}
		}
		// check for job completion
		for (var pcity in t.jobs) {
			for (var pjob in t.jobs[pcity]) {
				var job = t.jobs[pcity][pjob];
				if (job.run_at < (now - 300)) {
					if (!job.done) {
					//WinLog.write ('****** TIMER Seed.tick: RETAINING \'UNDONE\' JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
					//logit ('****** TIMER Seed.tick: RETAINING \'UNDONE\' JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
					} else
						delete (t.jobs[pcity][pjob]);
				} else if (!job.done && job.run_at<now) {
					//WinLog.write ('TIMER Seed.tick: fetchCity JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
					job.done = true;
					delete (t.jobs[pcity][pjob]);
					var march = Seed.marches[job.march_id];
					// if (!march), march just finished (returned)          
					if (march && job.queue=='march' && march.status=='marching') {  // march just reached target
						if (DEBUG_MARCHES) WinLog.write ('MARCH at TARGET!');
							Messages.marchAtTarget(march);
					}
					t.fetchCity (pcity);
					return;
				}
			}
		}
	},
	
	updateManifest : function () {
		var t = Seed;
		var buildingManifest = t.r.buildings;
		var researchManifest = t.r.research;
		var troopManifest = t.r.city.capital.units;
		
		// Initialise buildings
		for (var b=0; b<buildingManifest.length; b++)
			if (!Seed.requirements.building[buildingManifest[b].type])
				Seed.requirements.building[buildingManifest[b].type] = {};
		
		// Initialise levels for each building
		for (var b=0; b<buildingManifest.length; b++) {
			if (!Seed.requirements.building[buildingManifest[b].type].level) 
				Seed.requirements.building[buildingManifest[b].type].level = [];
					for (var l=0; l<buildingManifest[b].levels.length; l++) 
						Seed.requirements.building[buildingManifest[b].type].level[buildingManifest[b].levels[l].level] = {};
		}

		// 	Save building requirements
		for (var b=0; b<buildingManifest.length; b++) 
			for (var l=0; l<buildingManifest[b].levels.length; l++) 
				Seed.requirements.building[buildingManifest[b].type].level[buildingManifest[b].levels[l].level] = buildingManifest[b].levels[l].requirements;
				
		// Initialise research
		for (var r=0; r<researchManifest.length; r++)
			if (!Seed.requirements.research[researchManifest[r].type])
				Seed.requirements.research[researchManifest[r].type] = {};
		
		// Initialise levels for each research
		for (var r=0; r<researchManifest.length; r++) {
			if (!Seed.requirements.research[researchManifest[r].type].level) 
				Seed.requirements.research[researchManifest[r].type].level = [];
					for (var l=0; l<researchManifest[r].levels.length; l++) 
						Seed.requirements.research[researchManifest[r].type].level[researchManifest[r].levels[l].level] = {};
		}

		// 	Save research requirements
		for (var r=0; r<researchManifest.length; r++) 
			for (var l=0; l<researchManifest[r].levels.length; l++) 
				Seed.requirements.research[researchManifest[r].type].level[researchManifest[r].levels[l].level] = researchManifest[r].levels[l].requirements;
				
		// Initialise troops
		for (var t=0; t<troopManifest.length; t++)
			if (!Seed.requirements.troop[troopManifest[t].type])
				Seed.requirements.troop[troopManifest[t].type] =[];

		// 	Save troop requirements
		for (var t=0; t<troopManifest.length; t++) 
			Seed.requirements.troop[troopManifest[t].type] = troopManifest[t].requirements;
	},
		
	// TODO: fix march destination when city (shows as bog)
	updateCity : function (city) {
		var t = Seed, cityIdx = Seed.cityIdx[city.id], cityType = city.type, cityName = city.name;
		if (cityType === 'Capital') {
			Seed.cities[0] = city;
		} else {
			Seed.cities[cityName.charAt(cityName.length-1)] = city;
		}
		Seed.cityTs[city.id] = serverTime();  
		if (Data.options.verboseLog.enabled)
			actionLog('Updated coords for ' + city.name + ' are ' + city.x + '/' + city.y);
		if (cityIdx === 'capital') {
			// generals
			for (var i=0; i<city.generals.length; i++)
				Seed.generals[city.generals[i].id] = city.generals[i];
			Seed.numGenerals = city.generals.length;
			// marches
			for (var i=0; i<city.marches.length; i++)
				t.checkAddMarch (city.marches[i]);   
		}
		// jobs
		for (var i=0; i<city.jobs.length; i++)
			t.checkAddJob (city.jobs[i]);
		//logit ('Seed.updateCity: '+ inspect (city, 5, 1));
		//for (var i=0; i<t.updateNotifyQueue.length; i++)
		//	t.updateNotifyQueue[i]();
		//t.updateNotifyQueue = []; 
		
		if (t.cityInit < t.numCities) {
			t.cityInit = t.cityInit + 1;
			if (Data.options.verboseLog.enabled) {
				actionLog(city.name + ' successfully initialised');
			}
		} else {
			if (Data.options.verboseLog.enabled) {
				actionLog(city.name + ' successfully updated');
			}
		}
	},

	// if fetchcity is pending, will notify when complete, else notifies right away...
	updateNotifyQueue : [],
	notifyOnUpdate : function (notify) {
		actionLog('updateNotifyQueue');
		var t = Seed;
		if (!RequestQueue.isPending('fetchCity')) {
			notify();
			return;
		}
		t.updateNotifyQueue.push (notify);
	},
 
  checkAddMarch : function (march){
    if (march.general_id)
      Seed.generals[march.general_id].busy = true;
    if (Seed.marches[march.id]){
      if (march.status=='retreating')
        Seed.marches[march.id].status='returning';
      return;
    }
    var m = cloneProps(march);  
    if (m.march_type == 'AttackMarch')
      m.march_type = 'Attack';
    else if (m.march_type == 'TransportMarch')
      m.march_type = 'Transport';
    if (m.status == 'retreating')
      m.status = 'returning';
    m.target = m.terrain_type;
    if (m.target == 'Bog')
      m.target = 'City '+ m.destination_name;
    else if (m.target == 'AnthropusCamp')
      m.target = 'AntCamp';
    Seed.marches[m.id] = m;
    ++Seed.numMarches;
 },
  
  checkAddJob : function (job){
    var cityId = job.city_id;
    if (!job.run_at){
        WinLog.write ('checkAddJob job.run_at is null:\n'+ inspect (job, 5, 1));
        if (ALERT_ON_BAD_DATA) alert ('checkAddJob job.run_at is null');
    }    
    if (!Seed.jobs[cityId])
      Seed.jobs[cityId] = {};
    if (job.queue == 'march'){
      if (!Seed.marches[job.march_id]){
        WinLog.write ('checkAddJob MISSING MARCH:\n'+ inspect (job, 5, 1) +'\n'+ inspect(Seed.marches, 5, 1));
        if (ALERT_ON_BAD_DATA) alert ('checkAddJob MISSING MARCH');
        if (job.run_at < serverTime())
          return;               // ?????? delete from Seed.jobs  ????
      } 
      else {  
        Seed.marches[job.march_id].run_at = job.run_at;
        Seed.marches[job.march_id].duration = job.duration;
      }
    } 
    
    if (job.queue == 'units'){
    }
   
    if (Seed.jobs[cityId][job.id])
      return;
    job.run_at += 2;      
    Seed.jobs[cityId][job.id] = cloneProps(job);
  },
  
  jsonAddJob : function (job){  // called from various jsons (buildUpgrade) when new job rx'd 
    var t = Seed;
    t.checkAddJob (job);
  },



  checkIncomingData : function (rslt){
    // check seed for missing building ...      
    for (var ij=0; ij<rslt.dat.city.jobs.length; ij++){
      var job = rslt.dat.city.jobs[ij];
      if (job.queue == 'building'){
        var building = null;
        for (var im=0; im<rslt.dat.city.buildings.length; im++){
          if (rslt.dat.city.buildings[im].id == job.city_building_id){
            building = rslt.dat.city.buildings[im];
            break;
          }
        }
        if (!building){
          WinLog.writeText ('*********************** MISSING BUILDING! ('+ job.city_building_id +') now='+ serverTime() +'\n' + inspect (job, 7, 1) +'\n'+ inspect (rslt, 12, 1));
        if (ALERT_ON_BAD_DATA) alert ('Danger Will Robinson! (missing building)');   
        }
      }
    }
    
    if (!rslt.dat.city.marches)
      return;
    // check seed for missing march ...  
    for (var ij=0; ij<rslt.dat.city.jobs.length; ij++){
      var job = rslt.dat.city.jobs[ij];
      if (job.march_id){
        if (Seed.findMarch(job.march_id, rslt.dat.city.marches) == null){
          WinLog.writeText ('*********************** MISSING MARCH, Job ID:'+ job.march_id +' (now='+ serverTime() +')\n'+ inspect (job, 7, 1) +'\n'
                  + inspect (rslt, 12, 1));
        if (ALERT_ON_BAD_DATA) alert ('Danger Will Robinson! (missing march)');   
        }
      }
    }   
    // check seed for missing march job ...  
    for (var im=0; im<rslt.dat.city.marches.length; im++){
      var march = rslt.dat.city.marches[im];
      var job = null;
      for (var ij=0; ij<rslt.dat.city.jobs.length; ij++){
        if (rslt.dat.city.jobs[ij].march_id == march.id){
          job = rslt.dat.city.jobs[ij];
          break;
        }
      }
      if (job==null){
        WinLog.writeText ('*********************** MISSING JOB FOR MARCH!  marchId:'+ march.id +'\n'+ inspect (rslt, 11, 1));
        if (ALERT_ON_BAD_DATA) alert ('MISSING JOB FOR MARCH!');   
      }
    }
  },
  
  findMarch : function (mid, marches){
    for (var im=0; im<marches.length; im++){
      if (marches[im].id == mid)
        return marches[im];
    }
    return null;
  },
 

}

	var Translate = {
		commons : [],
		items : [],
		troops : [],
		
		init : function (notify) {
			var t = Translate;
			t.fetchLocale(function (rslt) {
				if (rslt.ok) {
					if (Data.options.verboseLog.enabled)
						actionLog('Locale data was successfully requested from the sever');
				}
				if (notify)
					notify(rslt);
			});
		},

		fetchLocale : function (notify) {
			var t = Translate;
			new MyAjaxRequest ('locales/' + navigator.language.substr(0, 2) + '.xml', {'%5Fswf%5Fsession%5Fid':C.attrs.sessionId}, function (rslt) {
				if (rslt.ok) {
					try {
						t.updateCommons(rslt.dat);
						t.updateItems(rslt.dat);
						t.updateTroops(rslt.dat);
					} catch (e) {
						rslt.ok = false;
						rslt.errmsg = e.toString();
					}
					if (notify)
						notify(rslt);
				} else if (rslt.errmsg.indexOf('404') !== -1) {
					new MyAjaxRequest('locales/en.xml', {'%5Fswf%5Fsession%5Fid':C.attrs.sessionId}, function (rslt) {
						if (rslt.ok) {
							try {
								t.updateCommons(rslt.dat);
								t.updateItems(rslt.dat);
								t.updateTroops(rslt.dat);
							} catch (e) {
								rslt.ok = false;
								rslt.errmsg = e.toString();
							}
						}
						if (notify)
							notify(rslt);
					});
				}
			});
		},
		
		updateCommons : function (xmlString) {
			var t = Translate, xmlStart = xmlString.indexOf("<common>"), xmlFinish = xmlString.indexOf("</common>") + 9, parser, xmlObject, commons, common, i, ii;
			// Parse the string into an object			
			xmlObject = t.parseXML(xmlString, xmlStart, xmlFinish);
			// Traverse through xmlObject and place each item into an array of objects
			commons = xmlObject.getElementsByTagName("common");
			common = commons[0].childNodes;
			if (common.length > 0) {
				for (i = 0; i < common.length; i = i + 1) {
					if (common[i].firstChild) {
						if (common[i].firstChild.nodeValue) {
							t.commons[t.commons.length] = {id:common[i].nodeName, name:common[i].firstChild.nodeValue};
						} else if (common[i].childNodes.length > 0) {
							for (ii = 0; ii < common[i].childNodes.length; ii = ii + 1) {
								t.commons[t.commons.length] = {id:common[i].childNodes[ii].nodeName, name:common[i].childNodes[ii].firstChild.nodeValue};
							}
						}
					}
				}
			}
		},
		
		updateItems : function (xmlString) {
			var t = Translate, xmlStart = xmlString.indexOf("<items>"), xmlFinish = xmlString.indexOf("</items>") + 8, parser, xmlObject, items, item, i;
			// Parse the string into an object			
			xmlObject = t.parseXML(xmlString, xmlStart, xmlFinish);
			// Traverse through xmlObject and place each item into an array of objects
			items = xmlObject.getElementsByTagName("items");
			item = items[0].childNodes;
			if (item.length > 0) {
				for (i = 0; i < item.length; i = i + 1) {
					t.items[t.items.length] = {id:item[i].nodeName, name:item[i].firstChild.firstChild.nodeValue};
				}
			}
		},
		
		updateTroops : function (xmlString) {
			var t = Translate, xmlStartOffset = xmlString.indexOf("<troops>"), xmlFinishOffset = xmlString.indexOf("</troops>"), xmlStart, xmlFinish, xmlObject, items, item, i;
			// As this element appears twice the result needs to be offset (note if xml structure changes this could break)
			xmlStart = xmlString.indexOf("<troops>", xmlStartOffset + 1);
			xmlFinish = xmlString.indexOf("</troops>", xmlFinishOffset + 1) + 9;
			// Parse the string into an object			
			xmlObject = t.parseXML(xmlString, xmlStart, xmlFinish);
			// Traverse through xmlObject and place each troop into an array of objects
			troops = xmlObject.getElementsByTagName("troops");
			troop = troops[0].childNodes;
			if (troop.length > 0) {
				for (i = 0; i < troop.length; i = i + 1) {
					t.troops[t.troops.length] = {id:troop[i].nodeName, name:troop[i].firstChild.firstChild.nodeValue};
				}
			}
		},
		
		common : function (common) {
			var t = Translate, commonLower = common.toLowerCase(), i, rslt;
			// Loop through available translations to find a match
			if (t.commons.length > 0) {
				for (i = 0; i < t.commons.length; i = i + 1) {
					if (t.commons[i].id === commonLower) {
						rslt = t.commons[i].name;
						break;
					}
				}
			}
			return rslt;
		},

		item : function (item) {
			var t = Translate, itemLower = item.toLowerCase(), i, rslt;
			// Loop through available translations to find a match
			if (t.items.length > 0) {
				for (i = 0; i < t.items.length; i = i + 1) {
					if (t.items[i].id === itemLower) {
						rslt = t.items[i].name;
						break;
					}
				}
			}
			return rslt;
		},
		
		troop : function (troop) {
			var t = Translate, troopLower = troop.toLowerCase(), i, rslt;
			// Loop through available translations to find a match
			if (t.troops.length > 0) {
				for (i = 0; i < t.troops.length; i = i + 1) {
					if (t.troops[i].id === troopLower) {
						rslt = t.troops[i].name;
						break;
					}
				}
			}
			return rslt;
		},
		
		parseXML : function (xmlString, xmlStart, xmlFinish) {
			var t = Translate, parser, xmlObject;
			// Extract only the associated xml data
			xmlString = xmlString.substring(xmlStart, xmlFinish);
			// Remove all line feeds
			xmlString = xmlString.replace(/\n/g, "");
			// Remove all white space between xml elements
			xmlString = xmlString.replace(/>[ ]+</g, "><");
			// Parse the string into an object			
			parser = new DOMParser();
			xmlObject = parser.parseFromString(xmlString, "text/xml");
			return xmlObject;
		},
	}


	function generalList() {
		var ret = {};
		var gens = Seed.cities[0].generals;
		for (var i=0; i<gens.length; i++)
			ret[gens[i].id] = gens[i].name +' ('+ gens[i].rank +')';
		return ret;
	}

/*Tabs.Tab = {
	tabOrder : 99,
	tabLabel : 'Tab',
	tabDisabled : false,
	cont : null,
	
	init : function (div) {
		var t = Tabs.Tab;
		console.log('Tabs.Tab Initialised with ' + div.id);
		t.cont = div;
		t.cont.innerHTML = 'INSERT TAB HERE';
		subtabManager.init(div);
		Tabs.Tab.Subtabs.Subtab.init('Hello Subtab');
		for (k in Tabs.Tab.Subtabs) {
			console.log(k);
		}
	},
	
	show : function () {
		var t = Tabs.Tab;
	},
	
	hide : function () {
		var t = Tabs.Tab;
	},

	Subtabs : {
		Subtab : {
			subtabOrder : 1,
			subtabLabel : 'Subtab',
			subtabDisabled : false,
			cont : null,
			
			init : function (msg) {
				console.log(msg);
			},
		},
	},
}*/


//******************************** Waves Tab *****************************
Tabs.Waves = {
	tabOrder : WAVE_TAB_ORDER,
	tabLabel : kWave,
	tabDisabled : !WAVE_TAB_ENABLE,
	cont : null,
	troopList : [kSpy, kATrans, kLBM, kSSDrg, kBatDrg, kFireM, kFang, kOgre, kLavaJaw, kBanshee],
	enabled : false,
	attackTimer : null,
	marchTimer: null,
	attackErrors : 0,
  
	init : function (div) {
		var t = Tabs.Waves;
		
		Data.init({waves: {enabled:false, iterationMin:30, iterationMax:45, stopOnLoss:true, deleteReports:false, target:{troopsWave:{}, x:0, y:0, type:null, level:0, stats:{numAttacks:0, spoils:{}}}, runTime:0}});

		t.cont = div;
		//if (Data.waves.targets.length == 0)
		//	for (var i=0; i<5; i++)
		//		Data.waves.targets[i] = {enabled:false, lastAttack:0, troopsWave:{}, targetX:0, targetY:0, terrainType:null, terrainLevel:0, stats:{numAttacks:0, spoils:{}}};
		var gensel = htmlSelector (generalList(), '', 'id=pbrptGenSel');
		var m = '<DIV class=' + rndClass['tab_title'] + '>'+kWaveTitle+'</div>\
			<DIV id=' + rndStyle['idPrefix'] + 'Status class=' + rndStyle['status_ticker'] + ' style="margin-bottom:5px !important">\
			<CENTER><INPUT type=submit value="OnOff" id=' + rndStyle['idPrefix'] + 'Enable></input></center>\
			<DIV id=' + rndStyle['idPrefix'] + 'Marches style="height:140px; max-height:140px; overflow-y:auto;"></div>\
			<DIV id=' + rndStyle['idPrefix'] + 'Feedback class='+ rndStyle['status_feedback'] +'></div></div>\
			<DIV class=' + rndStyle['classPrefix'] + 'Input>\
			<DIV style="height:48px;"><B>'+ kTargetCoords +'</b> &nbsp; X:<INPUT id=' + rndStyle['idPrefix'] + 'X size=1 maxlength=3 type=text value="'+ Data.waves.target.x +'" /> Y:<INPUT id=' + rndStyle['idPrefix'] + 'Y size=2 maxlength=3 value="'+ Data.waves.target.y +'" type=text/> &nbsp <B>'+ kDistance1 +'</b> <SPAN id=' + rndStyle['idPrefix'] + 'Dist></span><BR>\
			<DIV class=' + rndStyle['status_ticker'] + ' style="margin:0px 10px !important"><CENTER><SPAN id=' + rndStyle['idPrefix'] + 'Tile></span></center></div></div>\
			<TABLE class=' + rndStyle['classPrefix'] + 'Tab id=' + rndStyle['idPrefix'] + 'Troops><TR align=center class=' + rndStyle['classPrefix'] + 'TabHdr1><TD colspan=8>'+ kWaveTroops +'</td></tr></table>\
			<BR><TABLE class=' + rndStyle['classPrefix'] + 'TabPad><TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kDeleteBattleReports +'</td><TD><INPUT id=' + rndStyle['idPrefix'] + 'DBR type=checkbox '+ (Data.waves.deleteReports?'CHECKED ':'') +'/></td></tr>\
			<TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kStopOnLoss +'</td><TD><INPUT id=' + rndStyle['idPrefix'] + 'STL type=checkbox '+ (Data.waves.stopOnLoss?'CHECKED ':'') +'/></td></tr>\
			<TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kDelayBetweenAttacks +'</td><TD><INPUT id=' + rndStyle['idPrefix'] + 'Delay type=text size=1 maxlength=4 value="'+ Data.waves.iterationMin +'" \> to <SPAN id=' + rndStyle['idPrefix'] + 'DelMax>'+ Data.waves.iterationMax +'</span>'+ kSeconds +'</td></tr></table></div>\
			<DIV class=' + rndStyle['status_ticker'] + ' style="margin-top:10px !important">\
			<CENTER><INPUT class=' + rndClass['green_button'] + ' id=' + rndStyle['idPrefix'] + 'ResStat type=submit value='+ kResetStats +' /></center>\
			<DIV id=' + rndStyle['idPrefix'] + 'Stats  style="height:200px; max-height:200px; overflow-y:auto"></div>\
			<HR class=thin><DIV id=' + rndStyle['idPrefix'] + 'CurSpoil> &nbsp; </div></div>';
    t.cont.innerHTML = m;
    document.getElementById(rndStyle['idPrefix'] + 'Enable').addEventListener ('click', function(){t.setWaveEnable(!Data.waves.enabled)}, false);
    document.getElementById(rndStyle['idPrefix'] + 'X').addEventListener ('change', t.eventCoords, false);
    document.getElementById(rndStyle['idPrefix'] + 'Y').addEventListener ('change', t.eventCoords, false);
    document.getElementById(rndStyle['idPrefix'] + 'ResStat').addEventListener ('click', t.resetStats, false);
    document.getElementById(rndStyle['idPrefix'] + 'DBR').addEventListener ('click', function(e){Data.waves.deleteReports=e.target.checked}, false);
    document.getElementById(rndStyle['idPrefix'] + 'STL').addEventListener ('click', function(e){Data.waves.stopOnLoss=e.target.checked}, false);
    document.getElementById(rndStyle['idPrefix'] + 'Delay').addEventListener ('change', delayChanged, false);
//    troopTable (document.getElementById(rndStyle['idPrefix'] + 'Troops'), 1, 'FW', t.eventTroops);
    troopTable (document.getElementById(rndStyle['idPrefix'] + 'Troops'), 1, 'AW', t.eventTroops);
    window.addEventListener('unload', t.onUnload, false);
    t.setWaveEnable (false);
    t.marchTick();
    t.eventCoords();
    t.dispStats();
    Messages.addBattleReportListener(t.gotBattleReport);
 
    function troopTable (tab, rownum, prefix, listener) {
      var row1 = tab.insertRow(rownum);
      row1.align='center';
      var row2 = tab.insertRow(rownum+1);
      row2.align='center';
      var val;
      for (var i=0; i<t.troopList.length; i++){
        row1.insertCell(i).innerHTML = t.troopList[i];
        var inp = document.createElement ('INPUT');
        inp.type = 'text';
        inp.size = '1';
        inp.maxlength = '6'; // Allow 100,000 troops to be sent
        if (prefix=='AW')
          val = Data.waves.target.troopsWave[Names.troops.byAbbr[t.troopList[i]][1]];
        if (!val)
          val = 0;
        inp.value = val;
        inp.addEventListener ('change', listener, false);
        inp.name = prefix +'_'+ i;
        row2.insertCell(i).appendChild (inp);
      }
      return tab;
    }
    
    function delayChanged (e){
      var min = parseIntZero(e.target.value);
      var max = parseInt(min * 1.5);
      if (min < 30 || min > 3600){
        // error dialog, etc ...
        e.target.style.backgroundColor = 'red';
        return;
      }
      document.getElementById(rndStyle['idPrefix'] + 'DelMax').innerHTML = max;
        e.target.style.backgroundColor = '';
      Data.waves.iterationMin = min;
      Data.waves.iterationMax = max;
    }
  },

  curRunStart : 0,
  gotBattleReport : function (rpt){
    var t = Tabs.Waves;
    if (rpt.report.location.x==Data.waves.target.x && rpt.report.location.y==Data.waves.target.y){
      ++Data.waves.numAttacks;
      for (var i=0; i<rpt.report.spoils.items.length; i++){
        if (!Data.waves.target.stats.spoils[rpt.report.spoils.items[i]])
          Data.waves.target.stats.spoils[rpt.report.spoils.items[i]] = 1;
        else
          ++Data.waves.target.stats.spoils[rpt.report.spoils.items[i]];
        document.getElementById(rndStyle['idPrefix'] + 'CurSpoil').innerHTML = new Date().toTimeString().substring (0,8) + kGot + Names.itemAbbr(rpt.report.spoils.items[i]);
      }
      t.dispStats();
      
      if (Data.waves.stopOnLoss){
        for (var p in rpt.report.attacker.units){
          if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1]){
            var ts = new Date(rpt.report_notification.created_at * 1000).myString();
            t.setWaveEnable (false);
            t.dispFeedback (kTroopsLost + ts +')');
            actionLog ('Wave Troops Lost! ('+ ts +')');
            return;
          }
        }
      }
      if (Data.waves.deleteReports && rpt.report.attacker.name == Seed.s.name)
        Messages.deleteMessage(rpt.report_notification.id);
    }
  },
  
  resetStats : function (){
    var t = Tabs.Waves;
    var now = serverTime();
    t.curRunStart = now;
    Data.waves.numAttacks = 0;
    Data.waves.runTime = 0;
    for (var i=0; i<5; i++)
      Data.waves.targets[i].stats = {numAttacks:0, spoils:{}};
    t.dispStats();
  },
  
  dispStats : function (){
    var t = Tabs.Waves;
    var runTime = Data.waves.runTime;
    if (Data.waves.enabled)
      runTime += (serverTime()-t.curRunStart);
    var msg = '<TABLE class=' + rndStyle['classPrefix'] + 'TabPad width=100%><TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kRunTime +'</td><TD width=90%>'+ timestr(runTime, true) +'</td></tr>\
        <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kAttack2 +'</td><TD>'+ Data.waves.numAttacks +'</td></tr>\
        <TR><TD colspan=2><HR class=thin></td></tr>';
    for (var p in  Data.waves.target.stats.spoils){
      var num = Data.waves.target.stats.spoils[p];
      var perHour = num / (runTime/3600);
      var item = Names.itemAbbr(p);
      msg += '<TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ item +':</td><TD>'+ num +' ('+ perHour.toFixed(2) +' per hour)</td></tr>';
    }
    document.getElementById(rndStyle['idPrefix'] + 'Stats').innerHTML = msg + '</table>';
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById(rndStyle['idPrefix'] + 'Feedback').innerHTML = msg;
  },
  
  eventTroops : function (e){
    var t = Tabs.Waves;
    var args = e.target.name.split ('_');
    if (args[0] == 'AW'){
      var tr = Data.waves.target.troopsWave;
      var tt = Names.troops.byAbbr[t.troopList[args[1]]][1];
      tr[tt] = e.target.value;
    }
  },

  setWaveEnable : function (onOff){
    var t = Tabs.Waves;
    var but = document.getElementById(rndStyle['idPrefix'] + 'Enable');
    clearTimeout (t.attackTimer);
    Data.waves.enabled = onOff;
    if (onOff){
      but.value = kAttackOn;
      but.className = 'butAttackOn';
	  t.attackErrors = 0;
      t.waveAttackTick();
      t.curRunStart = serverTime();
    } 
    else {
      but.value = kAttackOff;
      but.className = 'butAttackOff';
      if (t.curRunStart != 0)
        Data.waves.runTime += (serverTime()-t.curRunStart);
    }
  },
  
  onUnload : function (){
    var t = Tabs.Waves;
    if (Data.waves.enabled && t.curRunStart!=0)
      Data.waves.runTime += (serverTime()-t.curRunStart);
  },
  
  
	waveAttackTick : function () {
		var t = Tabs.Waves, targetMsg, retryDelay, waveGeneral, waveUnits;
		clearTimeout (t.attackTimer);
		if (!Data.waves.enabled)
			return;
		targetMsg =  'a level ' + Data.waves.target.level + ' ' + Data.waves.target.type + ' at ' + Data.waves.target.x +'/'+ Data.waves.target.y;
		retryDelay = Math.floor(Math.random() * (5 - 7 + 1) + 7);	
		if (Ajax.marchBusy > 0) {
			if (Data.options.verboseLog.enabled) {
				actionLog('Wave attack to ' + targetMsg + ' delayed due to pending march request: retry in ' + retryDelay + ' seconds');
			}
			t.dispFeedback('Another march request is pending: retry in ' + retryDelay + ' seconds');
			t.attackTimer = setTimeout(t.waveAttackTick, retryDelay * 1000);
			return;
		}    
		if (getMusterPointSlots(0) <= 0) {
			if (Data.options.verboseLog.enabled) {
				actionLog('Wave attack to ' + targetMsg + ' delayed due to insufficent march slots: retry in ' + retryDelay + ' seconds');
			}
			t.dispFeedback('Muster point full: retry in ' + retryDelay + ' seconds');
			t.attackTimer = setTimeout(t.waveAttackTick, retryDelay * 1000);
			return;
		}
		waveGeneral = getAvailableGeneral();
		if (waveGeneral === null) {
			if (Data.options.verboseLog.enabled) {
				actionLog('Wave attack to ' + targetMsg + ' delayed due to insufficent generals: retry in ' + retryDelay + ' seconds');
			}
			t.dispFeedback('No generals available: retry in ' + retryDelay + ' seconds');
			t.attackTimer = setTimeout(t.waveAttackTick, retryDelay * 1000);
			return;
		}
		waveUnits = t.checkTroops(0, Data.waves.target.troopsWave);
		if (waveUnits !== null) {
			if (Data.options.verboseLog.enabled) {
				actionLog('Wave attack to ' + targetMsg + ' delayed due to ' + waveUnits +': retry in ' + retryDelay + ' seconds');
			}
			t.dispFeedback(waveUnits + ': retry in ' + retryDelay + ' seconds');
			t.attackTimer = setTimeout(t.waveAttackTick, retryDelay * 1000);
			return;
		}
		// All prerequisite checks are done so march request can be sent
		if (Data.options.verboseLog.enabled) {
			actionLog('Wave attack to ' + targetMsg + ' attempted');
		}
		new Ajax.march (Seed.cities[0].id, Data.waves.target.x, Data.waves.target.y, waveGeneral.id, Data.waves.target.troopsWave, 'wave', function (rslt) {
			var t = Tabs.Waves, waveDelay, retryDelay;
			if (rslt.ok && rslt.dat.result.success) {
				t.attackErrors = 0;
				waveDelay = Math.floor(Math.random() * (Data.waves.iterationMax - Data.waves.iterationMin + 1) + Data.waves.iterationMin);
				if (Data.options.verboseLog.enabled) {
					actionLog('Wave attack to ' + targetMsg + ' succeeded');
				} else {
					actionLog('Wave attack sent to ' + targetMsg);
				}
				t.dispFeedback('Wave attack sent to ' + targetMsg);
				t.attackTimer = setTimeout (t.waveAttackTick, waveDelay * 1000);
			} else {
				t.attackErrors++
				retryDelay = 30 * (t.attackErrors * t.attackErrors);
				if (Data.options.verboseLog.enabled) {
					actionLog('Wave attack to ' + targetMsg + ' failed and returned error: ' + rslt.errmsg + ' - retrying in ' + retryDelay  + ' seconds');
				} else {
					actionLog('Wave attack to ' + targetMsg + ' failed');
				}
				t.dispFeedback('Wave attack to ' + targetMsg + ' failed');
				t.attackTimer = setTimeout(t.waveAttackTick, retryDelay * 1000);
			} 
		});
	},

  // returns null if ok, else error message
  checkTroops : function (cityIdx, troops){
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.cities[cityIdx].units[p] < troops[p]){
          return (kNotEnough + p);
        }
      }
    }
    if (totTroops <= 0){
      return (kNoTroopsDefined);
    }
    return null;
  },
  
   marchTick : function (){
    var t = Tabs.Waves;
    clearTimeout (t.marchTimer);
    document.getElementById(rndStyle['idPrefix'] + 'Marches').innerHTML = marchTable('wave');
    t.marchTimer = setTimeout (t.marchTick, 1000);
  },

  // Calls scanMapCirc
  eventCoords : function (e){
    var ex = document.getElementById(rndStyle['idPrefix'] + 'X');
    var ey = document.getElementById(rndStyle['idPrefix'] + 'Y');
    var x = parseIntZero (ex.value);
    var y = parseIntZero (ey.value);
    ex.value = x;
    ey.value = y;
    Data.waves.target.x = x;
    Data.waves.target.y = y;
    document.getElementById(rndStyle['idPrefix'] + 'Dist').innerHTML = distance(Seed.cities[0].x, Seed.cities[0].y, x, y);
    document.getElementById(rndStyle['idPrefix'] + 'Tile').innerHTML = '&nbsp;';
    if (x<0 || x>749){
      ex.style.backgroundColor = 'red';
      return;
    }
    if (y<0 || y>749){
      ey.style.backgroundColor = 'red';
      return;
    }
    ey.style.backgroundColor = '';
    ex.style.backgroundColor = '';
    Map.scanMapCirc (x, y, 1, callback, true);
    function callback (rslt){
      var tile = null;
      for (var i=0; i<rslt.tiles.length; i++){
        if (rslt.tiles[i].x==x && rslt.tiles[i].y==y){
          tile = rslt.tiles[i];
          break;
        }
      }
      if (!tile)
        return;
      Data.waves.target.type = Map.names[tile.type];
      Data.waves.target.level = tile.lvl;
      document.getElementById(rndStyle['idPrefix'] + 'Tile').innerHTML = '<B>'+ Map.names[tile.type] +' level '+ tile.lvl +'</b>';
    }
  },
 
 
  show : function () {
    var t = Tabs.Waves;
    t.marchTick();
  },
  hide : function (){
    var t = Tabs.Waves;
    clearTimeout (t.marchTimer);
  },
}

var Data = {
	serverID : getServerId(),
	names : [],
  
	init : function (list) {
		try {
			var t = Data;
			for (var p in list) {
				t[p] = t.readMergeOptions (p, list[p]);
				t.names.push(p);
			}
		} catch (e) {
			alert ('This browser does not support LocalStorage');
			return false;
		}
	},

	onUnload : function () {
		var t = Data;
		for (var i=0; i<t.names.length; i++)
			localStorage.setItem(getServerId() + '_' + C.attrs.userId + '_' + t.names[i], JSON.stringify(t[t.names[i]]));
	},

	readMergeOptions : function (label, defaults) {
		var s, opts, d, o, dd, oo;
		s = localStorage.getItem(getServerId() + '_' + C.attrs.userId + '_' + label);
		if (s !== null) {
			opts = JSON.parse(s);
	 
			// Copy Cache to Data
			if (extTypeof(defaults) === 'array') {
				defaults = defaults.concat(opts);
			} else if (extTypeof(defaults) === 'object') {
				for (d in defaults) {
					for (o in opts) {
						if (d === o) {
							if (extTypeof(defaults[d]) === 'array') {
								defaults[d] = defaults[d].concat(opts[o]);
							} else if (extTypeof(defaults[d]) === 'object') {
								for (dd in defaults[d]) {
									for (oo in opts[o]) {
										if (dd === oo) {
											defaults[d][dd] = opts[o][oo];
										}
									}
								}
							} else {
								defaults[d] = opts[o];
							}
						}
					}
				}
			} else {
				defaults = opts;
			}
		}        
		return defaults;
	}
}

//******************************** Attacks Tab *****************************
// References to camp and camps changed to mapObject to make sure that other data does not overwrite the camps
Tabs.AutoAttack = {
  tabOrder      : ATTACK_TAB_ORDER,
  tabLabel      : kAttack,
  tabDisabled   : !ATTACK_TAB_ENABLE,
  cont          : null,
  attackTimer   : null,
  marchTimer    : null,
  lastAttack    : 0,
  attackErrors  : 0,
  checkMapBusy  : false,
  MAX_DISTANCE  : 35,
  curRunStart   : 0,
  contentType   : 0, // 0 = levels, 1 = config, 2 = targets, 3 = stats, 4 = mapTypes these should be enums but Javascript doesn't support that type
  selectedMapName: kAntCamp,
  
  init : function (div){
    var t = Tabs.AutoAttack;
    t.cont = div;
    
    // This is where we store the troops type and quantity from the Levels sub-tab
    // TBD: To save different configurations for wildernesses, ant camps, and cities/outposts
    // I will use a multidimensional array. The first index is the row, the second is the column
    // For our purposes the row is the map type selector, and the column is the troop type and quantity data {}
    //
    // [wilderness][0(null)][1][2][3][4][5][6][7][8][9][10]
    // [antcamps][0(null)][1][2][3][4][5][6][7][8][9][10]
    // [city][0(null)][1][2][3][4][5][6][7][8][9][10]
    //
    for (var x=1; x<=10; x++)
        if (!Data.options.objAttack.troops[x])
            Data.options.objAttack.troops[x] = {};
            
    //if (!Data.options.objAttack.troops){
    //  Data.options.objAttack.troops = [];
    //  for (var x=1; x<=10; x++)
    //    Data.options.objAttack.troops[x] = {};
    //}
   
    div.innerHTML = '<DIV class=' + rndClass['tab_title'] + '>' + Data.options.mapChoice + ' </div>\
      <DIV class=' + rndStyle['status_ticker'] + ' id=pbatStatus style="margin-bottom:5px !important">\
      <CENTER><INPUT type=submit value="OnOff" id=pbatEnable></input></center>\
      <DIV id=pbatMarches style="height:140px; max-height:140px; overflow:auto;"></div>\
	  <DIV id=pbatFeedback class='+ rndStyle['status_feedback'] +'></div></div>\
      <TABLE width=100% bgcolor=#ffffd0 align=center><TR><TD>\
      <INPUT class=button type=submit value='+ kLevels +' id=pbatConfigL></input>\
      <INPUT class=button type=submit value='+ kConfig +' id=pbatConfigG></input>\
      <INPUT class=button type=submit value='+ kTargets +' id=pbatTargets></input>\
      <INPUT class=button type=submit value='+ kStats +' id=pbatStats></input>\
      <INPUT class=button type=submit value='+ kMaps +' id=pbatMaps></input></td></tr></table>\
      <DIV id=pbatcon style="padding-top:5px; height:auto; overflow:auto; background-color:white"></div>';
     
    // Add the event listeners
    document.getElementById('pbatEnable').addEventListener ('click', function (){
      t.setAttackEnable (!Data.options.objAttack.enabled);
      }, false);
    document.getElementById('pbatConfigL').addEventListener ('click', t.tabConfigLevels, false);
    document.getElementById('pbatConfigG').addEventListener ('click', t.tabConfigGeneral, false);
    document.getElementById('pbatTargets').addEventListener ('click', t.tabTargets, false);
    document.getElementById('pbatStats').addEventListener ('click', t.tabStats, false);
    document.getElementById('pbatMaps').addEventListener ('click', t.tabMaps, false);
    
    if (Data.options.objStats == null)
      t.clearStats();
      
    if (Data.options.objAttack.maxMarches == undefined)
      Data.options.objAttack.maxMarches = 10;
      
    Messages.addBattleReportListener(t.gotBattleReport);
    setTimeout (t.checkMarches, 60000); 
    t.tabConfigLevels();
    window.addEventListener ('unload', t.onUnload, false);
    t.setAttackEnable (Data.options.objAttack.enabled);
    
    for (var p in Data.options.objMarches){
      if (Seed.marches[Data.options.objMarches[p].id])
        Seed.marches[Data.options.objMarches[p].id].ownerId = 'camp';
    }    
  },

  firstShow : true,
  show : function () {
    var t = Tabs.AutoAttack;
    t.marchTick();
    if (t.firstShow){
      t.marchTick();
      t.contentType = Data.options.attackTab;
      setTimeout (function (){
        // Do not automatically scan the map, wait for the user to initiate the scan on the maps sub-tab
        //t.checkMapData ();
        t.firstShow = false;
      }, 0);
    }
    if (t.contentType == 2)
        document.getElementById('pbatcon').scrollTop = gAttScrollPos;

    switch (t.contentType) {
        case 0: t.tabConfigLevels(); break;
        case 1: t.tabConfigGeneral(); break;
        case 2: t.tabTargets(); break;
        case 3: t.tabStats(); break;
        case 4: t.tabMaps(); break;
    }
  },
  hide : function (){
    var t = Tabs.AutoAttack;
    clearTimeout (t.marchTimer);
  },

	onUnload : function () {
		logit('Tabs.AutoAttack.onUnload');
		var t = Tabs.AutoAttack;
		if (Data.options.objAttack.enabled)
			Data.options.objStats.runTime += (serverTime()-t.curRunStart);
		Data.options.attackTab = t.contentType;
	},
  
  addMarch : function (job){
    var t = Tabs.AutoAttack;
    var march = Seed.marches[job.march_id];
    if (march == null){
      logit ('***** March missing from seed: '+ job.march_id); 
      if (DEBUG_MARCHES) WinLog.write ('***** ERRROR march missing from seed: '+ job.march_id);   
    } 
    else {
      Data.options.objMarches[job.march_id] = cloneProps(march);
      if (DEBUG_MARCHES) WinLog.write ('Tabs.AutoAttack.addMarch: ID='+ march.id +'  ('+ march.x +','+ march.y +') General:'+ march.general.id);    
    }
  },
  
  removeMarch : function (mid){   
    var t = Tabs.AutoAttack;
    delete (Data.options.objMarches[mid]);
  },
  
  marchCheckTimer : null,
  checkMarches : function (){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    clearTimeout (t.marchCheckTimer);
    for (var p in Data.options.objMarches){
      if (parseInt(Data.options.objMarches[p].run_at) < (now-40)){
        if (Data.options.objMarches[p].retry){
          ++Data.options.messages.missing;
          logit ('March report never received! (now='+ now +')\n'+ inspect (Data.options.objMarches[p], 6, 1));    
          if (DEBUG_MARCHES) WinLog.write ('March report never received! (now='+ now +')\n'+ inspect (Data.options.objMarches[p], 6, 1));    
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
  
  trackStats : function (marchId, rpt){   // called when battle report received
    var t = Tabs.AutoAttack;
    if (DEBUG_MARCHES) WinLog.write ('Tabs.AutoAttack.trackStats: '+ marchId); 
    var objLevel = rpt.report.location.level;
    
    if (objLevel<1 || objLevel>11)
      objLevel = 0;
      
    ++Data.options.objStats.numAttacks;
    ++Data.options.objStats.byLevel[objLevel].numAttacks;
    var res =  rpt.report.spoils.resources;
    
    for (var p in res){
      objAddTo (Data.options.objStats.resources, p, parseInt(res[p]));
      objAddTo (Data.options.objStats.byLevel[objLevel].resources, p, parseInt(res[p]));
    }  
    
    var items =  rpt.report.spoils.items;
    for (var i=0; i<items.length; i++){
      objAddTo (Data.options.objStats.items, items[i], 1);
      objAddTo (Data.options.objStats.byLevel[objLevel].items, items[i], 1);
    }  
    
    t.removeMarch (marchId);
    t.showStats();    
  },

  showStats : function (){
    var div = document.getElementById('pbcampSO');
    var t = Tabs.AutoAttack;
    
    if (div==null)
      return;
    var runTime = Data.options.objStats.runTime;
    if (Data.options.objAttack.enabled)
      runTime += (serverTime()-t.curRunStart);
      
    var trueRunTime = (runTime > 0) ? (runTime/3600) : 1;
      
    var m = '<TABLE class=' + rndStyle['classPrefix'] + 'TabPad> <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kStatsStarted +'</td><TD>'+  new Date(Data.options.objStats.tsStart * 1000).myString() +'</td></tr>\
    <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kRunTime +'</td><TD>'+ timestr(runTime, true) +'</td></tr>\
    <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kAttack2 +'</td><TD>'+ Data.options.objStats.numAttacks +'</td></tr>\
    <TR valign=top><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kResources +'</td><TD><TABLE class=' + rndStyle['classPrefix'] + 'TabPad>';
    for (var p in Data.options.objStats.resources){
      var perHour = Data.options.objStats.resources[p] / trueRunTime;
      m += '<TR align=right><TD>'+ p +':</td><TD>'+ addCommasInt(Data.options.objStats.resources[p]) +'</td><TD>('+ addCommasInt(perHour) +' /hr)</td></tr>';
    }
    m += '</table></td></tr></table>';
    
    m += '<BR><DIV class=' + rndStyle['classPrefix'] + 'Subtitle>'+ kStatsBy + Data.options.mapChoice + kLevel1 +'</div><DIV style="overflow:auto"><TABLE class=' + rndStyle['classPrefix'] + 'TabPad><TR class=' + rndStyle['classPrefix'] + 'TabHdr1 align=center><TD style="background:none !important;"></td><TD align=right colspan=10>'+ titleLine(kLevels) +'</td></tr><TR align=right class=' + rndStyle['classPrefix'] + 'TabHdr1><TD style="background:none !important;"></td>';
    for (i=1; i<11; i++)
      m += '<TD width=45>'+ i +'</td>';
    m += '</tr><TR><TD colspan=11><HR class=thin></td></tr><TR align=right><TD class=' + rndStyle['classPrefix'] + 'TabLeft># Attacks:</td>';
    for (i=1; i<11; i++)
      m += '<TD>'+ Data.options.objStats.byLevel[i].numAttacks +'</td>';
    m += '</tr><TR><TD colspan=11><HR class=thin></td></tr>'; 
      
    var items =  flipStats ('items');     
    for (var p in items){
      m += '<TR align=right><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ Names.itemAbbr(p) +':</td>';
      for (i=1; i<11; i++)
        m += '<TD>'+ items[p][i] +'</td>';
    }
    m += '</tr></table></div>';
    div.innerHTML = m;
    
    function flipStats (name){
      var o = {};
      for (var i=1; i<11; i++){
        for (var p in Data.options.objStats.byLevel[i][name]){
          if (!o[p]){
            o[p] = [];
            for (var x=1; x<11; x++)
              o[p][x] = 0;
          }
          o[p][i] += Data.options.objStats.byLevel[i][name][p];
        }
      }
      return o;
    }
  },

//*** Attacks Tab - Stats Sub-tab ***
  tabStats : function (){
    var t = Tabs.AutoAttack;

    document.getElementById('pbatConfigL').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatConfigL').style.color = "white"; 
    document.getElementById('pbatConfigG').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatConfigG').style.color = "white"; 
    document.getElementById('pbatTargets').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatTargets').style.color = "white"; 
    document.getElementById('pbatMaps').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatMaps').style.color = "white"; 

    t.contentType = 3;
    document.getElementById('pbatStats').style.backgroundColor = "#eed"; 
    document.getElementById('pbatStats').style.color = "black"; 
   
    var m = '<DIV class=' + rndClass['tab_title'] + '>'+kAttackStatsTitle+'</div>\
      <CENTER><INPUT class=' + rndClass['green_button'] + ' id=pmcampRS type=submit value='+ kClearStats +' \></center>\
      <DIV class=' + rndStyle['status_ticker'] + ' id=pbcampSO></div>';
    document.getElementById('pbatcon').innerHTML = m;
    document.getElementById('pmcampRS').addEventListener('click', function(){t.clearStats(); t.showStats();}, false);
    t.showStats();  
  },

  // byLevel.resources
  clearStats : function (){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    Data.options.objStats = {tsStart:now, runTime:0, numAttacks:0, items:{}, resources:{}, byLevel:[]};
    t.curRunStart = now;
    for (var i=0; i<12; i++)
      Data.options.objStats.byLevel[i] = {numAttacks:0, items:{}, resources:{}};
    t.showStats(); 
  },
  
	// If we are already checking the map, return false
	// otherwise, if the radius to check is not 35 miles, or if the targets do not mach the seed values
	// all scanMap with a radius of 35 miles, stop checking the map, and return false
	// if none of the above, return true
	checkMapData : function () {
		var t = Tabs.AutoAttack;
		if (t.checkMapBusy)
			return false;
		if (Data.targets.radius!=35 || Data.targets.center.x!=Seed.cities[0].x || Data.targets.center.y!=Seed.cities[0].y) {
			if (Data.options.verboseLog.enabled) {
				actionLog('Stored coords are ' + Data.targets.center.x + '/' + Data.targets.center.y);
				actionLog('Reported coords are ' + Seed.cities[0].x + '/' + Seed.cities[0].y);
			}
			Seed.fetchSeed(function (rslt) {
				if (rslt.ok) {
					if (Data.options.verboseLog.enabled) {
						actionLog('Player data was successfully requested from the server');
						actionLog('Stored coords are ' + Data.targets.center.x + '/' + Data.targets.center.y);
						actionLog('Updated coords are ' + Seed.cities[0].x + '/' + Seed.cities[0].y);
					}
					if (Data.targets.radius!=35 || Data.targets.center.x!=Seed.cities[0].x || Data.targets.center.y!=Seed.cities[0].y) {
						if (Data.options.verboseLog.enabled)
							actionLog('Rescanning map due to a coordinate mismatch');
						t.checkMapBusy = true;
						t.setAttackEnable (false);
						t.scanMap(35, function(){logit('****** Setting checkMapBusy to FALSE'); Tabs.AutoAttack.checkMapBusy = false});
						return false;
					}
				} else {
					if (Data.options.verboseLog.enabled)
						actionLog('The following error occured when updating Player data: ' + rslt.errmsg);
				}
			});
		}    
		return true;
	},
  
  gotBattleReport : function (rpt){
    var t = Tabs.AutoAttack;
    //logit ('Tabs.AutoAttack.gotBattleReport'); 
    // tie report to march id ...
    var mid=null;
    for (var p in Data.options.objMarches ){
      var march = Data.options.objMarches[p];
      if (march.x==rpt.report.location.x && march.y==rpt.report.location.y
      && march.general.id == rpt.report.attacker.general.id
      ){  // TODO: time and troops check here
        mid = p;
        break;
      }
    }
    if (mid)
      t.trackStats (mid, rpt);
      
    if (!Data.options.objAttack.deleteObjAttacks && !Data.options.objAttack.stopAttackOnLoss )
      return;
    //logit (inspect (rpt, 8, 1));
    if (Data.options.objAttack.stopAttackOnLoss){
      for (var p in rpt.report.attacker.units){
        if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1]){
          var ts = new Date(rpt.report_notification.created_at * 1000).myString();
          t.abort (kTroopsLost + ts +')');
          return;
        }
      }
    }
    if (Data.options.objAttack.deleteObjAttacks && rpt.report.attacker.name == Seed.s.name)
      Messages.deleteMessage (rpt.report_notification.id);
  },
  
  setAttackEnable : function (onOff){
    var t = Tabs.AutoAttack;
    clearTimeout (t.attackTimer);
    var but = document.getElementById('pbatEnable');
    Data.options.objAttack.enabled = onOff;
    if (onOff){
      but.value = kAutoOn;
      but.className = 'butAttackOn';
      t.curRunStart = serverTime();
	  t.attackErrors = 0;
      t.autoCheckTargets();
    } 
    else {
      if (t.curRunStart != 0)
        Data.options.objStats.runTime += (serverTime()-t.curRunStart);
      but.value = kAutoOff;
      but.className = 'butAttackOff';
      t.dispFeedback ('');
    }
  },

  abort : function (msg){
    var t = Tabs.AutoAttack;
    t.setAttackEnable (false);
    t.dispFeedback (msg);
    actionLog (msg);
  },
  
  marchTick : function (){
    var t = Tabs.AutoAttack;
    clearTimeout (t.marchTimer);
    document.getElementById('pbatMarches').innerHTML = marchTable('camp');
    t.marchTimer = setTimeout (t.marchTick, 1000);
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById('pbatFeedback').innerHTML = msg;
  },

  // Data.options.objAttack {enabled:false, maxDist:7, repeatTime:3660, delayMin:15, delayMax:25, levelEnable:[]}
	autoCheckTargets : function () {
		var t = Tabs.AutoAttack;
		var now = serverTime();
		var targetMsg, retryDelay, attackGeneral, marchCount = 0, p;
		clearTimeout (t.attackTimer);
		targetMsg = ''; //'a level ' + Data.waves.target.level + ' ' + Data.waves.target.type + ' at ' + Data.waves.target.x +'/'+ Data.waves.target.y;
		retryDelay = Math.floor(Math.random() * (5 - 7 + 1) + 7);	

		if (!Data.options.objAttack.enabled) {
			return;	
		}
		if (Ajax.marchBusy > 0) {
			if (Data.options.verboseLog.enabled) {
				actionLog('Attack to ' + targetMsg + ' delayed due to pending march request: retry in ' + retryDelay + ' seconds');
			}
			t.dispFeedback('Another march request is pending: retry in ' + retryDelay + ' seconds');
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay * 1000);
			return;
		}    
		if (!t.checkMapData()) {
			return;
		}
		for (p in Seed.marches) {
			if (Seed.marches[p].ownerId === 'camp') {
				++marchCount;
			}
		}
		if (marchCount >= Data.options.objAttack.maxMarches) {
			if (Data.options.verboseLog.enabled) {
				actionLog('Attack to ' + targetMsg + ' delayed due to march limit reached: retry in ' + retryDelay + ' seconds');
			}
			t.dispFeedback('March limit reached: retry in ' + retryDelay + ' seconds');
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay * 1000);
			return;
		}
		if (getMusterPointSlots(0) <= 0) {
			if (Data.options.verboseLog.enabled) {
				actionLog('Attack to ' + targetMsg + ' delayed due to insufficent march slots: retry in ' + retryDelay + ' seconds');
			}
			t.dispFeedback('Muster point full: retry in ' + retryDelay + ' seconds');
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay * 1000);
			return;
		}
		attackGeneral = getAvailableGeneral();
		if (attackGeneral === null) {
			if (Data.options.verboseLog.enabled) {
				actionLog('Attack to ' + targetMsg + ' delayed due to insufficent generals: retry in ' + retryDelay + ' seconds');
			}
			t.dispFeedback('No generals available: retry in ' + retryDelay + ' seconds');
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay * 1000);
			return;
		}
		// Get the next target, make sure we have sufficient troops
		var nextAttackTarget = t.getNextAttackTarget();
		if (t.checkTroops(0, nextAttackTarget.lvl) === null) {
			t.sendAttack(0, nextAttackTarget, attackGeneral, function (rslt) {
				var t = Tabs.AutoAttack, attackDelay, retryDelay;
				if (rslt) {
					attackDelay = Math.floor(Math.random() * (Data.options.objAttack.delayMax - Data.options.objAttack.delayMin + 1) + Data.options.objAttack.delayMin);
					t.attackTimer = setTimeout(t.autoCheckTargets, attackDelay * 1000);
				} else {
					retryDelay = 30 * (t.attackErrors * t.attackErrors);
					t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay * 1000);
				}
			});
			return;                
		} else {
			if (Data.options.verboseLog.enabled) {
				actionLog('Attack to ' + targetMsg + ' delayed due to insufficient troops: retry in ' + retryDelay + ' seconds');
			}
			t.dispFeedback('Not enough troops: retry in ' + retryDelay + ' seconds');
			t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay * 1000);
		}
	},
  
	// notifies with true for success, false if error
	sendAttack : function (cityIdx, mapObject, gen, notify) {
		var t = Tabs.AutoAttack;
		var now = serverTime();
		if (t.attackBusy) {
			t.dispFeedback (kErrSendAttack);
			return;
		}
		
		var targMsg =  kAttackSent + ' ' + mapObject.lvl + ' ' + Data.options.mapChoice + ' ' + kAt + ' ' + mapObject.x +'/'+ mapObject.y;
		
		if (Data.options.verboseLog.enabled) {
			actionLog(targMsg + ' attempted');
		}
		t.attackBusy = true;
		t.lastAttack = now;
		new Ajax.march (Seed.cities[cityIdx].id, mapObject.x, mapObject.y, gen.id, Data.options.objAttack.troops[mapObject.lvl], 'camp', function (rslt) {
			t.attackBusy = false;
			if (rslt.ok && rslt.dat.result.success) {
				t.attackErrors = 0;
				if (Data.options.verboseLog.enabled) {
					actionLog(targMsg + ' succeeded');
				} else if (Data.options.objAttack.logAttacks) {
					actionLog(targMsg);
				}
				t.dispFeedback(targMsg);
				t.addMarch(rslt.dat.result.job);        
				mapObject.last = now;
				if (notify) {
					notify(true);
				}
			} else {
				t.attackErrors++;
				if (Data.options.verboseLog.enabled) {
					actionLog(targMsg + ' failed and returned error: ' + rslt.errmsg);
				} else {
					actionLog(targMsg + ' failed');
				}
				t.dispFeedback(targMsg + ' failed');
				if (notify) {
					notify(false);
				}
			}
		});
	},
  
  // returns null if ok, else error message
  checkTroops : function (cityIdx, objLevel){
    var troops = Data.options.objAttack.troops[objLevel];
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.cities[cityIdx].units[p] < troops[p]){
          return (kNotEnough + p);
        }
      }
    }
    
    if (totTroops <= 0){
      return (kNoTroopsDefined);
    }
    return null;
  },
  
  // return the mapObject that is next to be attacked, if we are at the last object in the last, return the first object
  getNextAttackTarget : function (){
    var t = Tabs.AutoAttack;
    var lastAttack = 0;
    var mapObject = null;
    var targetObj = null;
    var defaultObj = Data.options.objAttack;
    
    // Look through all the targets
    for (var i=0; i<Data.targets.mapObjects.length; i++){
        targetObj = Data.targets.mapObjects[i];
        // Is this target attackable?
        if (targetObj.attackable) {
            // Does it fit within the config specifications (distance and level)?
            if ( (targetObj.dist <= defaultObj.levelDist[targetObj.lvl]) && defaultObj.levelEnable[targetObj.lvl] ) {
                // Has the target never been attacked?
                if (targetObj.last == null) {
                    mapObject = targetObj;
                    break;
                } 
                else if (lastAttack == 0) {
                    // Yes, this target is next (so far)
                    lastAttack = targetObj.last;
                    mapObject = targetObj;
                }
                else if (lastAttack > targetObj.last) { // Was the previous target attacked before this target?
                    // Yes, this target is next (so far)
                    lastAttack = targetObj.last;
                    mapObject = targetObj;
                    break;
                }
            }
        }
    }
    
    // This is complicated by the fact that the last attacked target in the list may not be the last physical entry, just the one that fits
    // the config info (distance, level enables, attackable)
    // Find the last matching target in the list
    var objs = Data.targets.mapObjects;
    var lastMatchingTarget = null;
    for (var j=objs.length-1; j>0; j--) {
        targetObj = objs[j];
        if (targetObj.attackable) {
            if ( (targetObj.dist <= defaultObj.levelDist[targetObj.lvl]) && defaultObj.levelEnable[targetObj.lvl] ) {
                lastMatchingTarget = targetObj;
                break;
            }
        }  
    }
    
    // Is the next target the last matching target?
    if (mapObject == lastMatchingTarget) {
        for (var k=0; j<objs.length; k++) {
            targetObj = objs[k];
            if (targetObj.attackable) {
                if ( (targetObj.dist <= defaultObj.levelDist[targetObj.lvl]) && defaultObj.levelEnable[targetObj.lvl]) {
                    // Make the next target the first matching target in the list
                    mapObject = targetObj;
                    break;
                }
            }
        }
    }
  
    // Return the next target
    return mapObject;
  },
  
  // return array of mapObjects that satisfy config (max distance, level enables)
  getActiveObjectList : function (){
    var t = Tabs.AutoAttack;
    var ret = [];
    for (var i=0; i<Data.targets.mapObjects.length; i++){
      var mapObject = Data.targets.mapObjects[i];
      if ((mapObject.dist<=Data.options.objAttack.levelDist[mapObject.lvl]) && Data.options.objAttack.levelEnable[mapObject.lvl])
        ret.push (mapObject);
    }
    return ret;
  },
  
  checkAttack : function (mapObject, notify){
    var t = Tabs.AutoAttack;
    var cityId = Seed.cities[0].id;
    var cityIdx = 0;
    var gen;
    // check troops
    var troops = Data.options.objAttack.troops[mapObject.lvl];
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.cities[cityIdx].units[p] < troops[p]){
          notify (kNotEnough + p);
          return;
        }
      }
    }
    
    if (totTroops <= 0){
        notify (kNoTroopsDefined);
        return;
    }
    
    // TODO: 'too many troops for muster point level'
    var musterPointLvl = getMusterPointLevel (cityIdx);
    for (var p in troops) {
        if (troops[p] > 0) {
            if (musterPointLvl < troops[p] / 10000) {
                notify (kTooManyTroops);
                return;
            }
        }
    }
    
    if (musterPointLvl < totTroops / 10000) {
        notify (kTooManyTroops);
        return;
    }
    
    if (getMusterPointSlots (cityIdx) <= 0){
      notify (kMusterPointFull);
      return;
    }
    
    if ((gen = getAvailableGeneral ()) == null){
      notify (kNoGenerals);
      return;
    }
	
    var targMsg =  kManualAttackSent + ' ' + mapObject.lvl + ' ' + Data.options.mapChoice + ' ' + kAt + ' ' + mapObject.x +'/'+ mapObject.y;
	
	if (Data.options.verboseLog.enabled)
		actionLog(targMsg + ' attempted');
    
	new Ajax.march (cityId, mapObject.x, mapObject.y, gen.id, troops, 'camp', function (rslt) {
		if (rslt.ok) {
			if (Data.options.verboseLog.enabled)
				actionLog(targMsg + ' succeeded');
			else if (Data.options.objAttack.logAttacks)
				actionLog(targMsg);
			t.dispFeedback(targMsg);
			t.addMarch(rslt.dat.result.job);        
			mapObject.last = serverTime();
			notify(null);
		} else {
			if (Data.options.verboseLog.enabled)
				actionLog(targMsg + ' failed and returned error: ' + rslt.errmsg);
			t.dispFeedback (kError + ': ' + rslt.errmsg);
			notify(null);
			//notify(kAttackErr + rslt.errmsg);
		}
	});	
  },
    
 // Data.options.campAttack {enabled:false, maxDist:7, repeatTime:3660, delayMin:15, delayMax:25, levelEnable:[], levelDist:[]}
  
  //*** Attacks Tab - Levels Sub-Tab ***
  troopTypes : [kPorter, kConscript, kSpy, kHalberdsman, kMinotaur, kLongbowman, kSwiftStrikeDragon, kBattleDragon, kArmoredTransport, kGiant, kFireMirror, kAquaTroop, kStoneTroop, kFireTroop, kWindTroop, kGreatDragon, kWaterDragon, kStoneDragon, kFireDragon, kWindDragon],
  tabConfigLevels : function (){
    var t = Tabs.AutoAttack;
     
    document.getElementById('pbatConfigG').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatConfigG').style.color = "white";
    document.getElementById('pbatTargets').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatTargets').style.color = "white"; 
    document.getElementById('pbatStats').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatStats').style.color = "white"; 
    document.getElementById('pbatMaps').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatMaps').style.color = "white"; 

    t.contentType = 0;
    document.getElementById('pbatConfigL').style.backgroundColor = "#eed"; 
    document.getElementById('pbatConfigL').style.color = "black";
    
    // New content area here
    var m = '<DIV class=' + rndClass['tab_title'] + '>'+ kAutoAttack + Data.options.mapChoice + kLevels +'</div>\
        <DIV style="overflow:auto">\
        <TABLE class=' + rndStyle['classPrefix'] + 'TabPad><TR class=' + rndStyle['classPrefix'] + 'TabHdr1><TD style="background:none !important;"></td><TD align=center colspan=10>'+ titleLine(kLevels) +'</td></tr>\
        <TR align=center class=' + rndStyle['classPrefix'] + 'TabHdr1><TD style="background:none !important;"></td><TD>1</td><TD>2</td><TD>3</td><TD>4</td><TD>5</td><TD>6</td><TD>7</td><TD>8</td><TD>9</td><TD>10</td></tr>\
        </div><TR align=center><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kEnable +'</td>';
    for (var x=1; x<=10; x++)
      m += '<TD><INPUT type=checkbox id=pbatEn_'+ x +(Data.options.objAttack.levelEnable[x]?' CHECKED':'')   +' \></td>';
    m += '</tr><TR align=center><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kMaxDist +'</td>';
    for (var x=1; x<=10; x++)
      m += '<TD><INPUT type=text id=pbatDist_'+ x +' maxlength=2 style="width:34px" value="'+ Data.options.objAttack.levelDist[x] +'"\></td>';
    m += '</tr><TR><TD><DIV class=short></td></tr>';
    
    for (i=0; i<t.troopTypes.length; i++){
      m += '<TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ Names.troops.byName[t.troopTypes[i]][2] +':</td>';
      for (var x=1; x<=10; x++){
        var num = Data.options.objAttack.troops[x][t.troopTypes[i]];
        if (!num)
          num = 0;
        m += '<TD><INPUT type=text id=pbatTrp_'+ x +'_'+ i +' maxlength=6 size=2  style="width:34px" value="'+ num +'"\></td>';
      }
      m += '</tr>';
    }    
    m += '</table><DIV class=short></div></div>';
    document.getElementById('pbatcon').innerHTML = m;
 
    // add event listeners ...
    for (var x=1; x<=10; x++)
      document.getElementById('pbatEn_'+ x).addEventListener('change', enableChanged, false);
    for (var x=1; x<=10; x++)
      document.getElementById('pbatDist_'+ x).addEventListener('change', distChanged, false);
    for (i=0; i<t.troopTypes.length; i++)
      for (var x=1; x<=10; x++)
        document.getElementById('pbatTrp_'+ x +'_'+ i).addEventListener('change', troopsChanged, false);
    
    function enableChanged (e){
      var args = e.target.id.split('_');
      Data.options.objAttack.levelEnable[args[1]] = e.target.checked;
    }
    
    function distChanged (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      if (isNaN(x) || x<1 || x>t.MAX_DISTANCE){
        e.target.style.backgroundColor = 'red';
        dispError (kDistanceWarning + t.MAX_DISTANCE);
      } 
      else {
        e.target.value = x;
        e.target.style.backgroundColor = '';
        Data.options.objAttack.levelDist[args[1]] = x;
      }
    }
    
    function troopsChanged (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      if (isNaN(x) || x<0 || x>120000){
        e.target.style.backgroundColor = 'red';
        dispError (kTroopWarning);
      }
      else {
        e.target.value = x;
        Data.options.objAttack.troops[args[1]][t.troopTypes[args[2]]] = x;
        e.target.style.backgroundColor = '';
      }
    }
    
    function dispError (msg){
      var dial = new ModalDialog (t.cont, 300, 150, '', true);
      dial.getContentDiv().innerHTML = msg;
    }
  },

//*** Attacks Tab - Config Sub-Tab ***
  tabConfigGeneral : function (){
    var t = Tabs.AutoAttack;
    

    document.getElementById('pbatConfigL').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatConfigL').style.color = "white";
    document.getElementById('pbatTargets').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatTargets').style.color = "white";
    document.getElementById('pbatStats').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatStats').style.color = "white";
    document.getElementById('pbatMaps').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatMaps').style.color = "white";

    t.contentType = 1;
    document.getElementById('pbatConfigG').style.backgroundColor = "#eed"; 
    document.getElementById('pbatConfigG').style.color = "black"; 
    

    var m = '<DIV class=' + rndClass['tab_title'] + '>'+ kAutoAttackConfig + '</div>\
      <DIV style="overflow:auto"><TABLE class=' + rndStyle['classPrefix'] + 'TabPad>\
      <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kRandomDelay +'</td><TD>\
      <INPUT class=short id=pbaacfgRD1 maxlength=4 type=text value="'+ Data.options.objAttack.delayMin +'"/>'+ kTo +'\
      <INPUT class=short id=pbaacfgRD2 maxlength=4 type=text value="'+ Data.options.objAttack.delayMax +'"/>'+ kSeconds +'</td></tr>\
      <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kSameTargetDelay +'</td><TD>'+ kOneHour +'</td></tr>\
      <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kLogAttacks +'</td><TD><INPUT id=pbaacfgLA '+ (Data.options.objAttack.logAttacks?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kDeleteMarchReports +'</td><TD><INPUT id=pbaacfgDMR '+ (Data.options.objAttack.deleteObjAttacks?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kStopOnLoss +'</td><TD><INPUT id=pbaacfgSTL '+ (Data.options.objAttack.stopAttackOnLoss?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kMaxMarches +'</td><TD><INPUT class=short id=pbaacfgMM maxlength=2 type=text value="'+ Data.options.objAttack.maxMarches +'"\></td></tr>\
      <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kClearLast +'</td><TD><INPUT class=' + rndClass['green_button'] + ' type=submit id=pbaacfgClr value='+ kClear +'></td></tr>\
      <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kClearAll +'</td><TD><INPUT id=pbaacfgCA '+ (Data.options.objAttack.clearAllTargets?'CHECKED ':'') +' type=checkbox \></td></tr>\
      </table>';
    document.getElementById('pbatcon').innerHTML = m;
    
    // Add event listeners
    document.getElementById('pbaacfgDMR').addEventListener('change', function (e){Data.options.objAttack.deleteObjAttacks = e.target.checked;}, false);
    document.getElementById('pbaacfgSTL').addEventListener('change', function (e){Data.options.objAttack.stopAttackOnLoss = e.target.checked;}, false);
    document.getElementById('pbaacfgLA').addEventListener('change', function (e){Data.options.objAttack.logAttacks = e.target.checked;}, false);
    document.getElementById('pbaacfgCA').addEventListener('change', function (e){Data.options.objAttack.clearAllTargets = e.target.checked;}, false);
    document.getElementById('pbaacfgRD1').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgRD2').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgMM').addEventListener('change', maxMarchesChanged, false);
    document.getElementById('pbaacfgClr').addEventListener('click', clearLast, false);
    
    
    function delayChanged (e){
      var min = parseIntNan(document.getElementById('pbaacfgRD1').value);
      var max = parseIntNan(document.getElementById('pbaacfgRD2').value);
      if (min<MIN_DELAY || min>3600 || (max-min)<5){
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = '<B>'+ kInvalidDelay +'</b><BR><BR>'+ kFirstValue + MIN_DELAY + kSecondValue;
        return;
      }
      Data.options.objAttack.delayMin = min;
      Data.options.objAttack.delayMax = max;
    }
    
    function maxMarchesChanged (e){
      var val = parseIntNan(document.getElementById('pbaacfgMM').value);
      if (val<0 || val>12){
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
            if (Data.targets.camps) {
                // Clear the last field of all targets
                for (var i=0; i<Data.targets.camps.length; i++)
                    Data.targets.camps[i].last = 0;
                for (var i=0; i<Data.targets.cities.length; i++)
                    Data.targets.cities[i].last = 0;
                for (var i=0; i<Data.targets.outposts.length; i++)
                    Data.targets.outposts[i].last = 0;
                for (var i=0; i<Data.targets.grasslands.length; i++)
                    Data.targets.grasslands[i].last = 0;
                for (var i=0; i<Data.targets.swamps.length; i++)
                    Data.targets.swamps[i].last = 0;
                for (var i=0; i<Data.targets.lakes.length; i++)
                    Data.targets.lakes[i].last = 0;
                for (var i=0; i<Data.targets.hills.length; i++)
                    Data.targets.hills[i].last = 0;
                for (var i=0; i<Data.targets.plains.length; i++)
                    Data.targets.plains[i].last = 0;
                for (var i=0; i<Data.targets.mountains.length; i++)
                    Data.targets.mountains[i].last = 0;
                for (var i=0; i<Data.targets.forests.length; i++)
                    Data.targets.forests[i].last = 0;
            }      
        }
        else
            // Clear the last attacked field of the currently selected target
            if (Data.targets.mapObjects)
                for (var i=0; i<Data.targets.mapObjects.length; i++)
                    Data.targets.mapObjects[i].last = 0;
    }
  },
    

//*** Attacks Tab - Targets Sub-Tab ***
  tabTargets : function (){
    var t = Tabs.AutoAttack;

    document.getElementById('pbatConfigL').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatConfigL').style.color = "white"; 
    document.getElementById('pbatConfigG').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatConfigG').style.color = "white"; 
    document.getElementById('pbatStats').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatStats').style.color = "white"; ;
    document.getElementById('pbatMaps').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatMaps').style.color = "white"; ;

    t.contentType = 2;
    document.getElementById('pbatTargets').style.backgroundColor = "#eed"; 
    document.getElementById('pbatTargets').style.color = "black";
    

    var timer = null;
    var m = '<DIV class=' + rndClass['tab_title'] + '>'+ kAutoAttack + Data.options.mapChoice + kLevels +'</div><TABLE id=pbatTargTab class=' + rndStyle['classPrefix'] + 'Tab><TR class=' + rndStyle['classPrefix'] + 'TabHdr2><TD>'+ kDistance +'</td><TD>'+ kCoords +'</td><TD>'+ kLevel +'</td><TD width=65>'+ kLastAttack +'</td></tr>';
//logit (inspect (Data.targets.mapObjects, 5, 1));
    
    // Owned resources have a red background color and white text
    var mapObjects = t.getActiveObjectList(); 
    if (mapObjects.length == 0)
        t.dispFeedback ( kSelectLevelsReminder );

    // Hilite owned wildernesses
    var ownedWilderness = Seed.s.player_wildernesses; 
    var bFound = false;
    for (var i=0; i<mapObjects.length; i++){
        m += '<TR id=pbatRow_'+ i +'><TD>'+ mapObjects[i].dist +'</td><TD align=center>'+ mapObjects[i].x +','+ mapObjects[i].y +'</td><TD align=center>'+ mapObjects[i].lvl +'</td>\
              <TD><span id=pbatList_'+ i +'> --- </span></td><TD><INPUT class=small id=pbattargAN_'+ i +' type=submit value=' + kAttackNow + '\></td>';
        
        // Add the skip attack button for cities and outposts
        if (t.selectedMapName == kCity || t.selectedMapName == kOutpost)
            m += '<TD><INPUT class=small id=pbskipAN_'+ i +' type=submit value=' + kSkipAttack + '\></td><TD>'+ mapObjects[i].playerAlliance +'</td>';
            
        m += '</tr>';
        /*
        // Hilight owned resources and don't attack them
        for (var j=0;j<ownedWilderness.length; j++) {
            if (ownedWilderness[j].x == mapObjects[i].x && ownedWilderness[j].y == mapObjects[i].y) {
                document.getElementById('pbatRow_'+j).setAttribute("class", "' + rndStyle['classPrefix'] + 'Owned");
                mapObjects[j].attackable = false;
                break;
            }
        }
        */
     }

    document.getElementById('pbatcon').innerHTML = m + '</table>';
    document.getElementById('pbatcon').scrollTop = gAttScrollPos;
    
     for (var i=0; i<mapObjects.length; i++)
        for (var j=0;j<ownedWilderness.length; j++) {
            if (ownedWilderness[j].x == mapObjects[i].x && ownedWilderness[j].y == mapObjects[i].y) {
                document.getElementById('pbatRow_'+i).setAttribute("class", "' + rndStyle['classPrefix'] + 'Owned");
                mapObjects[i].attackable = false;
                break;
            }
        }
    
    // Add the event listeners
    document.getElementById('pbatcon').addEventListener('scroll', onScroll, false);
    
    for (var i=0; i<mapObjects.length; i++) {
        var butAttack = document.getElementById('pbattargAN_'+ i);
        butAttack.addEventListener ('click', butAttackNow, false);
        if (t.selectedMapName == kCity || t.selectedMapName == kOutpost) 
            document.getElementById('pbskipAN_'+ i).addEventListener ('click', butSkipAttack, false);
        setButtonStyle (butAttack, mapObjects[i].attackable);         
    }
    
    tick();
    
    function setButtonStyle (theButton, enabled) {
        if (enabled) {
            theButton.disabled = false;
            theButton.style.backgroundColor = '#009C1F';
            theButton.style.color = 'white';            
        }
        else {
            theButton.disabled = true;
            theButton.style.backgroundColor = '#e80000';
            theButton.style.color = 'white';            
        }
    }
    
    function onScroll (e){
      if (t.contentType == 2)
        gAttScrollPos = document.getElementById('pbatcon').scrollTop;
    }

    function butAttackNow (e){
      var args = e.target.id.split('_');
      var dial = new ModalDialog (t.cont, 300, 150, '', false);
      dial.getContentDiv().innerHTML = kSendingAttack;
      t.checkAttack (mapObjects[args[1]], notify);
      function notify (rslt){
        if (rslt!=null){
          dial.getContentDiv().innerHTML = '<B>'+ rslt +'</b>';
          dial.allowClose (true);
        } else {
          dial.getContentDiv().innerHTML = '<B>'+ kOK +'</b>';
          setTimeout (function(){dial.destroy()}, 1000);
        }
      }
    }
    
    function butSkipAttack (e){
      var args = e.target.id.split('_');
      mapObjects[args[1]].attackable = (!mapObjects[args[1]].attackable);
      setButtonStyle (document.getElementById('pbattargAN_'+args[1]), mapObjects[args[1]].attackable);     
    }
    
    function tick (){
      var now = serverTime();
      var ts;
      clearTimeout (timer);
      if (!document.getElementById('pbatTargTab'))
        return;
      for (var i=0; i<mapObjects.length; i++){
        if (!mapObjects[i].last)
          ts = '---';
        else {
          var time = now-mapObjects[i].last;
// fix this :P
          if (time > 3600)
            ts = '<FONT COLOR=#550000><B>'+ timestr (now-mapObjects[i].last, false) +'</b></font>';
          else
            ts = timestr (now-mapObjects[i].last, false);
        }
        document.getElementById('pbatList_'+ i).innerHTML = ts;
      }
      timer = setTimeout (tick, 5000);
    }
  },

//*** Attack version of scanMap ***
// scan the map within the radius for Anthropus Camps
// the notify function sets the mapChecked flag
// calls scanMapCirc() with a callback function that gets the mapObject information
// scanMapCirc repeatedly invokes the callback until all the mapObjects have been examined (dat.done == true)
//     when dat.done, sort the mapObjects by distance
  scanMap : function (radius, notify){
  
    var t = Tabs.AutoAttack;
    Data.targets = {radius:0, center:{x:Seed.cities[0].x, y:Seed.cities[0].y}, mapObjects:[]};
    var dial = new ModalDialog (t.cont, 300, 165, '', false, null);
    dial.getContentDiv().innerHTML = kScanningMap;
    var ix=0; iy=0;
    var x = Seed.cities[0].x;
    var y = Seed.cities[0].y;
    Map.scanMapCirc (x,y, radius, callback, false);
    function callback (dat){
      if (dat==null){
        dial.getContentDiv().innerHTML = kErrScanningMap;
        dial.allowClose (true);
        if (notify)
          notify (false);
        return;
      }
      for (var i=0; i<dat.tiles.length; i++){
        var tile = dat.tiles[i];
        if (tile.type == 'A')
          Data.targets.mapObjects.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true});
      }      
      if (dat.done){
        logit ('*********  Done Scanning Map ... Total targets: '+ Data.targets.mapObjects.length);      
        Data.targets.mapObjects.sort(function(a,b){return a.dist-b.dist});
        Data.targets.radius = radius;
        if (notify)
          notify(true);
        dial.destroy();
      }
    }
  },
      
//*** Attacks Tab - Maps Sub-tab ***
  tabMaps : function(){
    var t = Tabs.AutoAttack;
    document.getElementById('pbatConfigL').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatConfigL').style.color = "white"; 
    document.getElementById('pbatConfigG').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatConfigG').style.color = "white"; 
    document.getElementById('pbatStats').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatStats').style.color = "white"; ;
    document.getElementById('pbatTargets').style.backgroundColor = BUTTON_BGCOLOR; 
    document.getElementById('pbatTargets').style.color = "white";

    t.contentType = 4;
    document.getElementById('pbatMaps').style.backgroundColor = "#eed"; 
    document.getElementById('pbatMaps').style.color = "black";

    var m = '<DIV class=' + rndStyle['classPrefix'] + 'Subtitle>'+ kMapCategories +'</div>\
        <DIV style="overflow:auto">\
        <TABLE class=' + rndStyle['classPrefix'] + 'TabPad>\
        <TR align=center class=' + rndStyle['classPrefix'] + 'TabHdr1><TD style="background:none !important;" colspan=2></td></tr>\
        </div>';
    
    // Add the radio buttons  
    m += '<TR><TD><INPUT type=radio name=pbatMapRadio value="AntCamp" ></td><td>'+ kAnthropusCamp +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbatMapRadio value="City" ></td><td>'+ kCity +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Outpost" ></td><td>'+ kOutpost +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Grassland" ></td><td>'+ kSavanna +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Swamp" ></td><td>'+ kSwamp +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Lake"></td><td>'+ kLake +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Hill" ></td><td>'+ kHill +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Plain" ></td><td>'+ kPlain +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Mountain" ></td><td>'+ kMountain +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Forest" ></td><td>'+ kForest +'</td></tr>';
    
    // Add the Search button - triggers an immediate map search when clicked
    m += '<TR><TD colspan="2"><INPUT class=' + rndClass['green_button'] + ' type=submit id=pbatMapSearch value='+ kSearch +'></td></tr>'; 
    m += '</table><DIV class=short></div>';
    
    // Display the inputs
    document.getElementById('pbatcon').innerHTML = m;

    // add event listeners
    var r = document.getElementsByName('pbatMapRadio');
    for (i=0;i<r.length;i++) {
        r[i].addEventListener('change', enableChanged, false);
        // Select the radio button that was last selected
        r[i].checked = (r[i].value == Data.options.mapChoice);
    }
    
    document.getElementById('pbatMapSearch').addEventListener ('click', butSearchNow, false);
    
    // search the map for the selected type
    function butSearchNow (e){
        actionLog('scanMap: begin');
        var radius = 35;
        var t = Tabs.AutoAttack;
        Data.targets = {radius:0, center:{x:Seed.cities[0].x, y:Seed.cities[0].y}, mapObjects:[], camps:[], cities:[], outposts:[], grasslands:[], swamps:[], lakes:[], hills:[], plains:[], mountains:[], forests:[]};
        var dial = new ModalDialog (t.cont, 300, 165, '', false, null);
    
        // Change this to reflect the parameter for the category of map item
        dial.getContentDiv().innerHTML = kScanningMap;
    
        var ix=0; iy=0;
        var x = Seed.cities[0].x;
        var y = Seed.cities[0].y;
        Map.scanMapCirc (x,y, radius, callback, true);
    
        function callback (dat){
            if (dat==null){
                dial.getContentDiv().innerHTML = kErrScanningMap;
                dial.allowClose (true);
                Tabs.AutoAttack.checkMapBusy = false;
                return;
            }
            for (var i=0; i<dat.tiles.length; i++){
                var tile = dat.tiles[i];
                // push the map data into the appropriate array
                switch (tile.type){
                    case 'A': Data.targets.camps.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'C': Data.targets.cities.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, cityName:tile.cityName, cityLvl:tile.cityLvl, playerName:tile.playerName, playerLvl:tile.playerLvl, playerMight:tile.playerMight, playerAlliance:tile.playerAlliance, last:null, fromCity:0, attackable:(tile.playerAlliance == '---')}); break;
                    case 'O': Data.targets.outposts.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, cityName:tile.cityName, cityLvl:tile.cityLvl, playerName:tile.playerName, playerLvl:tile.playerLvl, playerMight:tile.playerMight, playerAlliance:tile.playerAlliance, last:null, fromCity:0, attackable:(tile.playerAlliance == '---')}); break;
                    case 'G': Data.targets.grasslands.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'B': Data.targets.swamps.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'L': Data.targets.lakes.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'H': Data.targets.hills.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'P': Data.targets.plains.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'M': Data.targets.mountains.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'F': Data.targets.forests.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    default: break;
                }
            }      
            if (dat.done){
                var totalTargets = 0;
                for (var pm in Data.targets)
                    totalTargets += pm.length;
                // = Data.targets.camps.length + Data.targets.cities.length + Data.targets.outposts.length +\
                //    Data.targets.grasslands.length + Data.targets.swamps.length + Data.targets.lakes.length + \
                //   Data.targets.hills.length + Data.targets.plains.length + Data.targets.mountains.length + Data.targets.forests.length;
                    
                //logit ('*********  Done Scanning Map ... Total targets: '+ totalTargets);
                actionLog('scanMap:callback: done, total targets: ' + totalTargets);
                Data.targets.camps.sort(function(a,b){return a.dist-b.dist});
                Data.targets.cities.sort(function(a,b){return a.dist-b.dist});
                Data.targets.outposts.sort(function(a,b){return a.dist-b.dist});
                Data.targets.grasslands.sort(function(a,b){return a.dist-b.dist});
                Data.targets.swamps.sort(function(a,b){return a.dist-b.dist});
                Data.targets.lakes.sort(function(a,b){return a.dist-b.dist});
                Data.targets.hills.sort(function(a,b){return a.dist-b.dist});
                Data.targets.plains.sort(function(a,b){return a.dist-b.dist});
                Data.targets.mountains.sort(function(a,b){return a.dist-b.dist});
                Data.targets.forests.sort(function(a,b){return a.dist-b.dist});

                Data.targets.radius = radius;
                Tabs.AutoAttack.checkMapBusy = false;
                dial.destroy();
                butTransfer (e); // Transfer the map
            }
            else
                actionLog('scanMap: still scanning...');
        }
        actionLog('scanMap: complete');
    }
    
    // Transfer the currently selected map to the Attack tab so it may be used to farm
    function butTransfer (e) {
        var mapObjects = Data.targets.mapObjects;
        var currentlySelectedMap = null;
        switch (Data.options.mapChoice){
            case 'AntCamp':     currentlySelectedMap = Data.targets.camps; break;
            case 'City':        currentlySelectedMap = Data.targets.cities; break;
            case 'Oupost':      currentlySelectedMap = Data.targets.outposts; break;
            case 'Grassland':   currentlySelectedMap = Data.targets.grasslands; break;
            case 'Swamp':       currentlySelectedMap = Data.targets.swamps; break;
            case 'Lake':        currentlySelectedMap = Data.targets.lakes; break;
            case 'Hill':        currentlySelectedMap = Data.targets.hills; break;
            case 'Plain':       currentlySelectedMap = Data.targets.plains; break;
            case 'Mountain':    currentlySelectedMap = Data.targets.mountains; break;
            case 'Forest':      currentlySelectedMap = Data.targets.forests; break;
            default:            break;
        }
        if (currentlySelectedMap){
            mapObjects.length = 0; // Zero out the array so stuff left in it from before is gone
            for (var i=0;i<currentlySelectedMap.length;i++){
                mapObjects[i] = currentlySelectedMap[i];
            }
        }
    }
    
    // radio buttons are weird    
    function enableChanged (e){
        var t = Tabs.AutoAttack;
        
        if (Data.options.objAttack.enabled) {
            t.setAttackEnable(false); // It would be very bad to leave attack on when switching targets. Imagine sending the troops for a wilderness to a city or an ant camp...
            t.dispFeedback (kAttackSafetyFeature);
        }
        
        Tabs.AutoAttack.selectedMapName = e.target.value;
        Data.options.mapChoice = e.target.value;
        butTransfer (e);
    }
    
    function dispError (msg){
      var dial = new ModalDialog (t.cont, 300, 150, '', true);
      dial.getContentDiv().innerHTML = msg;
    }

  },
};
//******************************** End Attacks *************************

function trainTable (myId){
  var m = '<TABLE class=' + rndStyle['classPrefix'] + 'Tab>';
  var now = serverTime();
  var mtClass = '' + rndStyle['classPrefix'] + 'MarchMine';
  for (var c=0; c<Seed.cities.length; c++){
    var jobs = Seed.cities[c].jobs;
    for (var j=0; j<jobs.length; j++){
        var time = jobs[j].run_at - now;
        if (time < 0) time = '?';
        else if (isNaN (time)) time = '---';
        else time = timestr(time, true);
        if (jobs[j].queue == 'units' && jobs[j].unit_type)
            m += '<TR class='+ mtClass +'><TD>'+ kTraining +'</td><TD>'+ jobs[j].quantity +'</td><TD>'+ jobs[j].unit_type +'</td><TD><TD>'+ time +'</td></tr>';   
    }
  }
  return m + '</table>';
}

function marchTable (myId){
  var m = '<TABLE class=' + rndStyle['classPrefix'] + 'Tab>';
  var now = serverTime();
  for (var p in Seed.marches){
    var march = Seed.marches[p];
    var time = march.run_at - now;
    var mtClass='' + rndStyle['classPrefix'] + 'MarchOther';
    if (march.ownerId == myId)
      mtClass = '' + rndStyle['classPrefix'] + 'MarchMine';
    if (time < 0)
      time = '?';
    else if (isNaN (time))
      time = '---';
    else
      time = timestr(time, true);
    m += '<TR class='+ mtClass +'><TD>'+ kAttack1 + march.x +','+ march.y +'</td><TD>('+ march.target +'-'+ march.terrain_level +')</td><TD>'+ march.status +'<TD>'+ time +'</td></tr>';
  }
  return m +'</table>';
}

	function getAvailableGeneral() {
		for (var p in Seed.generals) {
			if (!Seed.generals[p].busy) {
				return Seed.generals[p];
			}
		}
		return null;
	}

function getMusterPointSlots (cityIdx){
  var lvl = Buildings.getLevel (cityIdx, 'MusterPoint');
  if (!lvl)
    return 0;
  return lvl - Seed.numMarches;
}

function getMusterPointLevel (cityIdx){
  var lvl = Buildings.getLevel (cityIdx, 'MusterPoint');
  return (!lvl) ? 0 : lvl;
}

function objAddTo (o, name, val){
  if (!o[name])
    o[name] = val;
  else
    o[name] += val;
}

function getBuildingById (cityIdx, bId){
    var b = Seed.cities[cityIdx].buildings;
    for (var i=0; i<b.length;i++)
        if (b[i].id == bId)
            return b[i].type;
            
    return '';
}

var Buildings = {
  getList : function (cityIdx, type){
    var ret = [];
    for (var i=0; i<Seed.cities[cityIdx].buildings.length; i++){
      if (Seed.cities[cityIdx].buildings[i].type == type)
        ret.push (Seed.cities[cityIdx].buildings[i]);
    }
    return ret;
  },
  getLevel : function (cityIdx, type){
    var x = Buildings.getList(cityIdx, type);
    if (x.length < 1)
      return null;
    return x[0].level;
  },
  getById : function (cityIdx, bid){
    for (var i=0; i<Seed.cities[cityIdx].buildings.length; i++){
      if (Seed.cities[cityIdx].buildings[i].id == bid)
        return (Seed.cities[cityIdx].buildings[i]);
    }
    return null;
  },
}



var Ajax = {
  // cat: 'all, 'reports', ''
  messageList : function (cat, callback){
    if (!cat)
      cat = 'all';
    new MyAjaxRequest ('reports.json', {'user%5Fid':C.attrs.userId, 'dragon%5Fheart':C.attrs.dragonHeart, count:12, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, category:cat, page:1, version:getVersion }, mycb, false);
    function mycb (rslt){
      if (rslt.ok && rslt.dat.result.success){
        if (callback)
          callback (rslt.dat.result.report_notifications);
      } 
      else if (callback)
        callback (null);
    }
  },
  
  messageDetail : function (id, callback){
    new MyAjaxRequest ('reports/'+ id +'.json', {'user%5Fid':C.attrs.userId, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, version:getVersion, 'dragon%5Fheart':C.attrs.dragonHeart }, mycb, false);
    function mycb (rslt){
      if (rslt.ok && rslt.dat.result.success){
        if (callback)
          callback (rslt.dat.result);
      } 
      else if (callback)
        callback (null);
    }
  },

  messageDelete : function (ids, callback){
	var p = {}
	p['user%5Fid'] = C.attrs.userId;
	p['%5Fmethod'] = 'delete';
	p['timestamp'] = parseInt(serverTime());
	p['%5Fsession%5Fid'] = C.attrs.sessionId;
	p['ids'] = ids.join('%7C');
	p['dragon%5Fheart'] = C.attrs.dragonHeart;
	p['version'] = postVersion;
    new MyAjaxRequest ('reports/bulk_delete.json', p, mycb, true);
    function mycb (rslt){
      if (rslt.ok && !rslt.dat.result.success)
        rslt.ok = false;
      if (callback)
        callback (rslt.ok);
    }
  },

// Use a json to wrap the building upgrade job
  buildingUpgrade : function (cityId, buildingId, callback){
    var t = Ajax;
    var p = {};
	p['user%5Fid'] = C.attrs.userId;
	p['dragon%5Fheart'] = C.attrs.dragonHeart;
	p['%5Fsession%5Fid'] = C.attrs.sessionId;
    p['%5Fmethod'] = 'put';
	p['version'] = postVersion;
	p['timestamp'] = parseInt(serverTime());
    new MyAjaxRequest ('cities/'+ cityId +'/buildings/'+ buildingId +'.json', p, mycb, true);
    function mycb (rslt){
        //logit ("BUILD RESPONSE:\n" + inspect (rslt, 10, 1));
        if (rslt.dat.result.success){
            Seed.jsonAddJob (rslt.dat.result.job);
        } 
        else {
            rslt.ok = false;
            rslt.errmsg = rslt.dat.result.errors[0];
        }
        if (callback)
            callback (rslt);
    }
 },
 
  troopTraining : function (troopType, troopQty, cityId, callback){
    var t = Ajax;
    var p = {};
	p['user%5Fid'] = C.attrs.userId;
	p['%5Fmethod'] = 'post';
	p['timestamp'] = parseInt(serverTime());
	p['%5Fsession%5Fid'] = C.attrs.sessionId;
	p['units%5Bquantity%5D'] = troopQty;
	p['units%5Bunit%5Ftype%5D'] = troopType;
	p['dragon%5Fheart'] = C.attrs.dragonHeart;
	p['version'] = postVersion;
    new MyAjaxRequest ('cities/'+ cityId +'/units.json', p, mycb, true);
    function mycb (rslt){
	  //logit ("Troop Training Response:\n" + inspect (rslt, 10, 1));
      if (rslt.dat) {
        if (rslt.dat.result.success){
            Seed.jsonAddJob (rslt.dat.result.job);
        } 
        else {
            rslt.ok = false;
            rslt.errmsg = rslt.dat.result.errors[0];
        }
      }
      if (callback)
        callback (rslt);
    }
 },
 
  researchStart : function (cityId, researchType, callback){
    var t = Ajax;
    var p = {};
	p['user%5Fid'] = C.attrs.userId;
    p['%5Fmethod'] = 'post';
	p['timestamp'] = parseInt(serverTime());
	p['%5Fsession%5Fid'] = C.attrs.sessionId;
	p['research%5Bresearch%5Ftype%5D'] = researchType;
	p['dragon%5Fheart'] = C.attrs.dragonHeart;
	p['version'] = postVersion;
    new MyAjaxRequest ('cities/'+ cityId +'/researches.json', p, mycb, true);
    function mycb (rslt){
        //logit ("RESEARCH RESPONSE:\n" + inspect (rslt, 10, 1));
        if (rslt.dat.result.success){
            Seed.jsonAddJob (rslt.dat.result.job);
        } 
        else {
            rslt.ok = false;
            rslt.errmsg = rslt.dat.result.errors[0];
        }
        if (callback)
            callback (rslt);
    }
 },
 
	marchBusy : 0,
	march : function (cityId, x, y, generalId, units, ownerId, callback) {
		var t = Ajax;
		var p = {};
		++t.marchBusy;
		// Initialise POST data
		p['march%5Bmarch%5Ftype%5D'] = 'attack';
		p['march%5By%5D'] = y;
		p['timestamp'] = parseInt(serverTime());
		var u = {}
		var mt = false;
		var sendTroops = "%7B";
		for (var pu in units)
		if (units[pu] > 0) {
			u[pu] = units[pu];
			if (mt == true )
				sendTroops += "%2C";
			sendTroops += "%22" + pu + "%22%3A" + units[pu];
			mt = true;
		}
		sendTroops += "%7D";
		p['march%5Bunits%5D'] = sendTroops;
		p['march%5Bgeneral%5Fid%5D'] = generalId;
		p['version'] = postVersion;
		p['%5Fmethod'] = 'post';
		p['dragon%5Fheart'] = C.attrs.dragonHeart;
		p['user%5Fid'] = C.attrs.userId;
		p['march%5Bx%5D'] = x;
		p['%5Fsession%5Fid'] = C.attrs.sessionId;
		// Send request
		new MyAjaxRequest ('cities/'+ cityId +'/marches.json', p, mycb, true);
		function mycb(rslt) {
			--t.marchBusy;
			if (Data.options.verboseLog.enabled)
				actionLog('Ajax.march request was returned with a status of ' + rslt.ok);
			if (rslt.ok && !rslt.dat.errors) {
				if (rslt.dat.result.success) {
					try {
						Seed.updateCity(rslt.dat.result.city);
						Seed.marches[rslt.dat.result.job.march_id].ownerId = ownerId;          
					} catch (e) {
						WinLog.write ('***********'+ e);
					}
				} else {
					rslt.ok = false;
					rslt.errmsg = rslt.dat.result.reason;
				}
			} else if (rslt.ok && rslt.dat.errors) {
				if (Data.options.verboseLog.enabled)
					actionLog('Ajax.march request error: ' + rslt.dat.errors);
				rslt.ok = false;
				rslt.errmsg = rslt.dat.errors;
			}
			if (callback)
				callback (rslt);
		}
	},

// This looks really cool, if it works
  marchRecall : function (cityId, marchId, callback){ // untested
    var t = Ajax;
    var p = {};
	p['user%5Fid'] = C.attrs.userId;
	p['dragon%5Fheart'] = C.attrs.dragonHeart;
	p['%5Fsession%5Fid'] = C.attrs.sessionId;
    p['%5Fmethod'] = 'delete';
	p['version'] = postVersion;
	p['timestamp'] = parseInt(serverTime());
    new MyAjaxRequest ('cities/'+ cityId +'/marches/'+ marchId +'.json', p, mycb, true);
    function mycb (rslt){
        //logit ("MARCH RESPONSE:\n" + inspect (rslt, 10, 1));
        if (rslt.ok){
            if (rslt.dat.result.success){
                logit (inspect (rslt, 9, 1));        
                //Seed.updateCity (rslt.dat.result);
            } 
            else {
                rslt.ok = false;
                rslt.errmsg = rslt.dat.result.errors[0];
            }
        }      
        if (callback)
            callback (rslt);
    }
  },

  collectResources : function (cityId, callback){
    var p = {};
	p['user%5Fid'] = C.attrs.userId;
	p['timestamp'] = parseInt(serverTime());
	p['%5Fsession%5Fid'] = C.attrs.sessionId;
	p['version'] = postVersion;
	p['dragon%5Fheart'] = C.attrs.dragonHeart;
    new MyAjaxRequest ('cities/'+ cityId +'/move_resources.json', p, mycb, true);
    function mycb (rslt){
      if (rslt.ok){
        Seed.updateCity (rslt.dat.city);
      }
      else {
        actionLog( "Auto-Collect Error: " + rslt.msg);
      }
      if (callback)
        callback (rslt.ok);
    }
  },
}

// Added the autocollection interval from the select menu
var AutoCollect = {
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
			if (time <= 0)
				t.doit ();
			else
				t.timer = setTimeout (t.doit, time*1000);
		}
	},
	
	doit : function (){
		var t = AutoCollect;
		Data.options.autoCollect.lastTime = serverTime();
		for (var out=1; out<Seed.cities.length; out++)
			collect (out, out*30000);
		t.timer = setTimeout (t.doit, ((Data.options.autoCollect.delay*Data.options.autoCollect.unit) + (Math.random()*120))*1000);
		function collect (cityIdx, delay){
			setTimeout (function(){
				Ajax.collectResources (Seed.cities[cityIdx].id);
				actionLog ('Collected resources at outpost #'+ cityIdx);
			}, delay);
		}
	},
}

var VerboseLog = {
	init : function () {
		var t = VerboseLog;
		t.setEnable(Data.options.verboseLog.enabled);
	},
	
	setEnable : function (onOff) {
		var t = VerboseLog;
		Data.options.verboseLog.enabled = onOff;
	},
}


//******************************** Info Tab *****************************
Tabs.Info = {
  tabOrder : INFO_TAB_ORDER,
  tabDisabled : !INFO_TAB_ENABLE,
  cont : null,
  timer : null,
  
  init : function (div){
    var t = Tabs.Info;
    t.cont = div;
    div.innerHTML = '<DIV class=' + rndClass['tab_title'] + '>'+ kDOAVersionString + Version +'<BR>'+ WebSite +'</div>\
      <TABLE width=100%><TR><TD><INPUT class=' + rndClass['green_button'] + ' type=submit value='+ kRefresh +' id=pbinfRefresh></input>\
      </td><TD align=right><SPAN id=pbinfGmt></span></td></tr></table><DIV id=pbinfCont></div>';
    document.getElementById('pbinfRefresh').addEventListener ('click', t.refresh, false);
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
        m += '<TABLE style="margin-top:3px" width=100%>\
              <TR bgcolor=#dde align=center><TD style="border-right: 1px solid; border-bottom: 1px solid;"><B>'+ kTroops +'</b></td>\
              <TD style="border-bottom: 1px solid; padding-left:7px"><B>'+ kGenerals +'</b></td></tr>\
              <TR valign=top align=center><TD width=50% style="border-right: 1px solid;">';
      
        // Troops
        m += '<TABLE class=' + rndStyle['classPrefix'] + 'TabPad>';
        for (var i=0; i<Names.troops.names.length; i++){
            var name = Names.troops.names[i][1];
            if (name==kGreatDragon || name==kWaterDragon || name==kStoneDragon || name==kFireDragon || name==kWindDragon) continue;
            var num = city.units[name];
            if (!num) num = 0;
            var marchNum = 0;
            for (var p in city.marches)
                for (var q in city.marches[p].units)
                    if (q == name)
                        marchNum += city.marches[p].units[q];
                        
            var marchStr = (marchNum > 0) ? '<B>(' + marchNum + ')</b>' : '';
            m += '<TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ name +':</td><TD align=right>'+ num +'</td><TD align=right>'+ marchStr +'</td></tr>';
        }
        m += '</table></td><TD width=50% style=" padding-left:7px">';
    
        // Generals
        m += '<TABLE class=' + rndStyle['classPrefix'] + 'TabPad>';
        var loc = '';
        for (var ig=0; ig<city.generals.length; ig++){
            if (Seed.numMarches)
                for (var pm in Seed.marches)
                    // The general object will be null if the march is a transport
                    if (Seed.marches[pm].march_type != "Transport")
                        try {
           		           if (city.generals[ig].name == Seed.marches[pm].general.first_name)
   		                       loc = Seed.marches[pm].x + ',' + Seed.marches[pm].y;
                        }
                        catch (e) {
                            actionLog('Err: general first_name not available' + e.name + ' ' + e.message);
                        }
             
            m += '<TR><TD align=right>'+ city.generals[ig].name +' ('+ city.generals[ig].rank +')</td><TD width=75%>'+ (city.generals[ig].busy?loc:'') +'</td></tr>';
        }
        
        m += '</table></td></tr></table><BR><TABLE class=' + rndStyle['classPrefix'] + 'TabPad>\
              <TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kMarches +'</td><TD>'+ Seed.numMarches +'</td></tr></table>'
//        + dispBuildingJob(0) + dispResearchJob(0) + dispTrainingJobs(0) + '</td></tr></table>';
  
        // outposts ...
        //if (Seed.cities.length > 0){
        //    for (var i=1; i<Seed.cities.length; i++){
        //        m += '<DIV class=short></div>'+ cityTitle(i) + '<TABLE class=' + rndStyle['classPrefix'] + 'TabPad><TR><TD></td></tr></table>'
//      //    + dispBuildingJob(i) + dispTrainingJobs(i) + '</td></tr></table>';
        //    }
        //}
    
        // Marches, building, research, training
        document.getElementById('pbinfCont').innerHTML = m; 
        
        var now = new Date();  
        now.setTime(now.getTime() + (now.getTimezoneOffset()*60000));
        document.getElementById('pbinfGmt').innerHTML = now.toTimeString().substring (0,8) +' GMT';
 
        function cityTitle (cityIdx){
            var city = Seed.cities[cityIdx];
            // Outposts are always defending (until further notice)
            var wallStatus = '';
            var alliance_name = (Seed.s.alliance) ? Seed.s.alliance.name : '';
            if (cityIdx == 0)
                wallStatus = (Seed.cities[cityIdx].defended) ? '<font class="defending">'+ kDefending +'</font>' : '<font class="hiding">'+ kSanctuary +'</font>';
            else
                wallStatus = '<font class="defending">'+ kDefending +'</font>';
      
			return '<div class=' + rndStyle['classPrefix'] + 'Subtitle><TABLE class=' + rndStyle['classPrefix'] + 'Tab><TR><TD align=left>'+ city.name +'</td><TD align=center>'+ city.x +','+ city.y + '</td><TD align=center width=200px><font color=yellow>' + alliance_name +'</font></td><TD width=80px align=right>'+ wallStatus +'</td></tr></table></div>';
        }
    },

  refresh : function (){
  logit('fetchSeed from Tab.Info refresh');
    var t = Tabs.Info;
    Seed.fetchSeed (t.showStuff());  
  },
}

	function getBuildingJob(cityIdx) {
		var cityId = Seed.cities[cityIdx].id;
		for (var p in Seed.jobs[cityId]) {
			var job = Seed.jobs[cityId][p];
			if (job.queue == 'building') {
				return ({job:job, building:Buildings.getById(cityIdx, job.city_building_id)});
			}
		}
		return null;
	}

function getResearchJob (cityIdx) {
  var cid = Seed.cities[cityIdx].id;
  for (var p in Seed.jobs[cid]){
    var job = Seed.jobs[cid][p];
    if (job.queue == 'research')
      return (job);
  }
  return null;
}


function cloneProps (src) {
  var newObj = (src instanceof Array) ? [] : {};
  for (i in src) {
    if (extTypeof(src[i]) == 'function')
      continue;
    if (src[i] && typeof src[i] == 'object') {
      newObj[i] = cloneProps(src[i]);
    } 
    else 
      newObj[i] = src[i];
  } 
  return newObj;
};


var Names = {
  troops : {
    'names' : [
    [0, kPorter, kPorter],
    [1, kConscript, kConscr],
    [2, kSpy, kSpy],
    [3, kHalberdsman, kHalbrd],
    [4, kMinotaur, kMino],
    [5, kLongbowman, kLBM],
    [6, kSwiftStrikeDragon, kSSDrg],
    [7, kBattleDragon, kBatDrg],
    [8, kArmoredTransport, kATrans],
    [9, kGiant, kGiant],
    [10, kFireMirror, kFireM],
    [11, kGreatDragon, kGrtDrg],
    [12, kWaterDragon, kWatDrg],
    [13, kStoneDragon, kStnDrg],
	[14, kFireDragon, kFreDrg],
	[15, kWindDragon, kWndDrg],
    [16, kAquaTroop, kFang],
    [17, kStoneTroop, kOgre],
    [18, kFireTroop, kLavaJaw],
	[19, kWindTroop, kBanshee],
    ],
  }, 
  
  items : {
    'names' : [
    [1, 'Blink', 'Blink'],
    [2, 'Hop', 'Hop'],
    [3, 'Skip', 'Skip'],
    [4, 'Jump', 'Jump'],
    [5, 'Leap', 'Leap'],
    [6, 'Bounce', 'Bounce'],
    [100, 'GreatDragonBodyArmor', 'GD Body Armor'],
    [101, 'GreatDragonHelmet', 'GD Helmet'],
    [102, 'GreatDragonTailGuard', 'GD Tail Guard'],
    [103, 'GreatDragonClawGuards', 'GD Claw Guards'],
    [110, 'WaterDragonEgg', 'WaterDragonEgg'],
    [111, 'WaterDragonBodyArmor', 'WD Body Armor'],
    [112, 'WaterDragonHelmet', 'WD Helmet'],
    [113, 'WaterDragonTailGuard', 'WD Tail Guard'],
    [114, 'WaterDragonClawGuards', 'WD Claw Guards'],
    [115, 'AquaTroopRespirator', 'Respirators'],
    [116, 'AquaTroopRespiratorStack100', 'Respirator-100'],
    [117, 'AquaTroopRespiratorStack500', 'Respirator-500'],
    [118, 'AquaTroopRespiratorStack1000', 'Respirator-1000'],
    [120, 'StoneDragonEgg', 'StoneDragonEgg'],
    [121, 'StoneDragonBodyArmor', 'SD Body Armor'],
    [122, 'StoneDragonHelmet', 'SD Helmet'],
    [123, 'StoneDragonTailGuard', 'SD Tail Guard'],
    [124, 'StoneDragonClawGuards', 'SD Claw Guards'],
    [125, 'StoneTroopItem', 'GlowingMandrake'],
    [126, 'StoneTroopItemStack100', 'GlowingMandrake-100'],
    [127, 'StoneTroopItemStack500', 'GlowingMandrake-500'],
    [128, 'StoneTroopItemStack1000', 'GlowingMandrake-1000'],
    [130, 'FireDragonEgg', 'FireDragonEgg'],
    [131, 'FireDragonBodyArmor', 'FD Body Armor'],
    [132, 'FireDragonHelmet', 'FD Helmet'],
    [133, 'FireDragonTailGuard', 'FD Tail Guard'],
    [134, 'FireDragonClawGuards', 'FD Claw Guards'],
    [135, 'FireTroopItem', 'VolcanicRune'],
    [136, 'FireTroopItemStack100', 'VolcanicRune-100'],
    [137, 'FireTroopItemStack500', 'VolcanicRune-500'],
    [138, 'FireTroopItemStack1000', 'VolcanicRune-1000'],
    [140, 'WindDragonEgg', 'WindDragonEgg'],
    [141, 'WindDragonBodyArmor', 'Wnd Body Armor'],
    [142, 'WindDragonHelmet', 'Wnd Helmet'],
    [143, 'WindDragonTailGuard', 'Wnd Tail Guard'],
    [144, 'WindDragonClawGuards', 'Wnd Claw Guards'],
    [145, 'WindTroopItem', 'BansheeTalon'],
    [146, 'WindTroopItemStack100', 'BansheeTalon-100'],
    [147, 'WindTroopItemStack500', 'BansheeTalon-500'],
    [148, 'WindTroopItemStack1000', 'BansheeTalon-1000'],
   ],
  }, 

  itemAbbr : function (name){
    var x = Names.items.byName[name]; 
    if (x)
      return x[2];
    return name.substr (0, 14);
  },
  
  
/***  
EpeoradMetalsNanosWeek
EpeoradMetalsNanosDay
OreadStoneNanosDay
AtlagenHarvestNanosDay
NanoCollectorWeek
DryadForestNanosWeek
NanoCanisters
DryadForestNanosDay
NanoCollectorDay
DoubleTaxDayDeclaration
Gold10K
Wood25K
Wood250K
OutpostWarp
CompletionGrant
TranceMarchDrops
FortunasTicket
DragonHearts
EasterChest

RenameProclamation
CrimsonBull
ForcedMarchDrops
CeaseFireTreaty
FoundersChest
PurpleBones
MassNullifier
****/    
  
  init : function (){
    var t = Names;
    t.makeIdx (t.troops);
    t.makeIdx (t.items);
  },
  
  makeIdx : function (o){
    byId = {};
    byAbbr = {};
    byName = {};
    var n = o.names;
    for (var i=0; i<n.length; i++){
      byId[n[i][0]] = n[i];
      byAbbr[n[i][2]] = n[i];
      byName[n[i][1]] = n[i];
    }
    o.byId = byId;
    o.byAbbr = byAbbr;
    o.byName = byName;
  },
} 
Names.init ();

//******************************** DEBUG Tab *****************************
// No need to translate the DEBUG tab
Tabs.Debug = {
  tabOrder : DEBUG_TAB_ORDER,
  tabLabel : 'Dbg',
  tabDisabled : !DEBUG_TAB_ENABLE,
  cont : null,
  
  init : function (div){
    var t = Tabs.Debug;
    t.cont = div;
    t.mouseElement = div;
    div.innerHTML = '<TEXTAREA id=pbdbgUnTxt row=3 cols=50></textarea><INPUT type=submit value="unescape" id=pbdbgUn></input><BR><BR>\
      <INPUT type=submit value="Seed.s" id=pbdbgSeedS\> <BR>\
      <INPUT type=submit value="Seed.JOBS.CITY" id=pbdbgSeedJobCity\><BR>\
      <INPUT type=submit value="Seed.MARCHES" id=pbdbgSeedMarches\><BR>\
      <INPUT type=submit value="Seed buildings" id=pbdbgSeedBuildings\><BR><BR>\
      <INPUT type=submit value="Set all mapObject.last to null" id=pbdbgLastNull></input>\
      <INPUT type=submit value="Clear MAP data" id=pbdbgClearMap></input><BR>\
      <INPUT type=submit value="check reports" id=pbdbgReports></input><BR>\
      <INPUT type=submit value="Persistant Data" id=pbdbgData></input><BR>\
      <INPUT type=submit value="Scripts" id=pbdbgScripts></input><BR>\
      <INPUT type=submit value="click" id=pbdbgClick></input> \
      <INPUT type=submit value="move" id=pbdbgMoveM></input><BR><BR>\
      <DIV style="background-color:#eee; margin:5px"><CENTER><INPUT style="width:130px" class=butAttackOff id=pbdbgTMonoff type=submit value="Track Mouse Off"><BR><DIV id=pbdbgCoords>&nbsp;</div></center></div>\
      <BR>Missing Reports:<SPAN id=pbdbgMissRpt></span> &nbsp; <INPUT id=pbdbgResetMR type=submit value="RESET" \>\
      <BR><SPAN class=boldRed>Keep-alive is running!</span>';
    document.getElementById('pbdbgUn').addEventListener ('click', t.unescape, false);
    document.getElementById('pbdbgSeedS').addEventListener ('click', t.seedS, false);
    document.getElementById('pbdbgSeedJobCity').addEventListener ('click', t.seedJobsCity, false);
    document.getElementById('pbdbgSeedMarches').addEventListener ('click', t.seedMarches, false);
    document.getElementById('pbdbgSeedBuildings').addEventListener ('click', t.seedBuildings, false);
    document.getElementById('pbdbgClearMap').addEventListener ('click', t.clearMap, false);
    document.getElementById('pbdbgLastNull').addEventListener ('click', t.setLastNull, false);
    document.getElementById('pbdbgReports').addEventListener ('click', t.readReports, false);
    document.getElementById('pbdbgScripts').addEventListener ('click', t.dispScripts, false);
    document.getElementById('pbdbgClick').addEventListener ('click', t.clickMouse, false);
    document.getElementById('pbdbgMoveM').addEventListener ('click', t.moveMouse, false);
    document.getElementById('pbdbgTMonoff').addEventListener ('click', t.trackMouseEnable, false);
    document.getElementById('pbdbgData').addEventListener ('click', t.dispData, false);
    document.getElementById('pbdbgResetMR').addEventListener ('click', function(){Data.options.messages.missing=0; t.showMissingReports()}, false);
    t.mouseDispDiv = document.getElementById('pbdbgCoords');
    t.keepAlive ();
    t.showMissingReports ();
  },

  show : function (){
  },
  hide : function (){
  },

  seedBuildings : function (){
    var t = Tabs.Debug;
    t.dispBuildings ('Seed.cities[0].buildings', Seed.cities[0].buildings);
    t.dispBuildings ('Seed.cities[1].buildings', Seed.cities[1].buildings);
  },
  
  dispScripts : function (){
    pop = new CPopup ('debug', 0,0, 1000,800, true); 
    pop.getTopDiv ().innerHTML = '<B><CENTER>Debug - List Scripts</center></b>' ;
    var scripts = document.getElementsByTagName('script');
    var m = '<DIV style="height:560px; max-height:560px; overflow:auto">';
    for (var i=0; i<scripts.length; i++){
      var code = scripts[i].innerHTML;
      if (code == undefined)
        m += 'no code<BR>';
      else
        m += 'Source: '+ scripts[i].src +'<BR>Length: '+ code.length +'<BR>'+ code.substr(0,1000).htmlEntities() +'<BR><HR>';
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
    document.getElementById('pbdbgMissRpt').innerHTML = Data.options.messages.missing;
    setTimeout (t.showMissingReports, 2000);
  },
  
  readReports : function (){
    Messages.checkMessages();
  },
  seedS : function (){
    logit (inspect (Seed.s, 8, 1));
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
      msg += 'OWNER: '+  march.ownerId +' ID: '+ march.id +' '+ status +' '+ march.x +','+ march.y +' '+ march.run_at +'('+ (march.run_at-now)  +') '+ march.duration +'\n';
    }
    logit (msg);
  },
  
  dispData : function (){
    var m = '';
    for (var i=0; i<Data.names.length; i++)
      m += '***** Data.'+ Data.names[i] +':\n'+ inspect (Data[Data.names[i]], 12, 1);
    logit (m);
  },
  clearMap : function (){
    Tabs.AutoAttack.targets.radius = 0;
    Tabs.AutoAttack.targets.mapObjects = [];
    Tabs.Maps.targets.radius = 0;
    Tabs.Maps.targets.mapObjects = [];
  },
  setLastNull : function (){
    for (var i=0; i<Tabs.AutoAttack.targets.mapObjects.length; i++)
      Tabs.AutoAttack.targets.mapObjects[i].last = null;
    for (var i=0; i<Tabs.Maps.targets.mapObjects.length; i++)
      Tabs.Maps.targets.mapObjects[i].last = null; },

keepAlive : function (){
  var t = Tabs.Debug;
  t.createMouseClick (document.getElementById('castlemania_swf_container'), 0, 0, 0, 0);
  setTimeout (t.keepAlive, 60000);
},
  
  trackMouse : false,
//  mouseElement = document.getElementById('castlemania_swf_container');
  trackMouseEnable : function (e){
    var t = Tabs.Debug;
    if (t.trackMouse){
      e.target.value = 'Track Mouse OFF'
      e.target.className = 'butAttackOff';
      t.mouseElement.removeEventListener('mousemove', t.moveHandler, true);
    } 
    else {
      e.target.value = 'Track Mouse ON'
      e.target.className = 'butAttackOn';
      t.mouseElement.addEventListener('mousemove', t.moveHandler, true);
    }
    t.trackMouse = !t.trackMouse;
  },
  moveHandler : function (me){
    var t = Tabs.Debug;
    t.mouseDispDiv.innerHTML = 'Client: '+ me.clientX +','+ me.clientY +' &nbsp; Screen: '+ me.screenX +','+ me.screenY;
  },
  
  clickMouse : function (){
    var t = Tabs.Debug;
//    t.createMouseClick (t.mouseElement, 874,280,803,183);
    t.createMouseClick (document.getElementById('pbdbgUn'), 0, 0, 0, 0);
  },
  moveMouse : function (){
    var t = Tabs.Debug;
    setTimeout (function (){
      var evObj = document.createEvent('MouseEvents');
      evObj.initMouseEvent( 'move', true, false, window, 0,   874,280,803,183,   false, false, true, false, 0, null );
      var cancelled = !t.cont.dispatchEvent(evObj);
      logit ('Mouse moved, cancelled='+ cancelled);
    }, 2000);
  },
  unescape : function (div){
    var t = Tabs.Debug;
    var e = document.getElementById('pbdbgUnTxt');
    e.value = unescape (e.value);
  },

  createMouseClick : function (e, screenX, screenY, clientX, clientY){
    var evObj = document.createEvent('MouseEvents');
    var cancellable = false;
    evObj.initMouseEvent( 'click', true, cancellable, window, 1, screenX, screenY, clientX, clientY, false, false, true, false, 0, null );
    var cancelled = !e.dispatchEvent(evObj);
    logit ('Mouse dispatched, cancelled='+ cancelled);
  },

  
}



/**************
C.attrs:   
  (string) apiServer = http://realm57.c6.castle.wonderhill.com/api
  (string) appId = 111896392174831
  (string) appPath = http://apps.facebook.com/dragonsofatlantis
  (number) clientTime = 1303048825
  (string) facebookId = 1400526627
  (string) locale = en
  (number) playerId = 400086503
  (boolean) production = true
  (boolean) publishToFacebook = true
  (number) realmId = 57
  (string) s3Server = http://castlemania-production.s3.amazonaws.com
  (string) s3SwfPrefix = /flash/game/current
  (number) serverTime = 1303048829
  (string) sessionId = c681b23d48531835624085c5ba1a7a79
  (number) userId = 2395058
  (number) viralCohortId = 9999
  (string) pubServer = pub.castle.wonderhill.com
  (number) pubPort = 7000
  (string) preloaderCachebreaker = 1302888680
  (string) primaryUICachebreaker = 1302123068
  (string) secondaryUICachebreaker = 1302123081
  (string) buildingCachebreaker = 1302043432
  (string) soundCachebreaker = 1300136852
  (string) lazyLoadedSwfCachebreaker = 1302043433
  (array) playerGeneralFacebookIds = 511766946,531413843,1408508145,1583521095,1630864998,1641056237,100000233332372,100000629563828
  (boolean) isFan = false
  (boolean) hasExtPerms = false
  (array) appFriendIds = 1400526627,511766946,513290679,517317030,587021483,594053295,607773106,628608909,685297360,769038534,829965606,1266963775,1311343917,1361197746,1383471858,1408508145,1408906378,1432144775,1630864998,1641056237,1655875848,1661333219,100000232672930,100000475977050,100000569950692,100000583783925,100000629563828
  (array) nonAppFriends = .................
  (array) generalFriends = .................
  (array) appFriends = ................
************/

// REDUNDENT
function getSwfVar (name){
  var s = 'function swfGetVar (name){\
    var swf = document.getElementById("castlemania_swf");\
    swf.setAttribute("allowscriptaccess", "always");\
    swf.setAttribute("swliveconnect", "true");\
    var val = swf.GetVariable(name);\
    return val;}';
  var e = document.createElement('script');
  e.innerHTML = s;
  document.body.appendChild (e);
  return unsafeWindow.swfGetVar (name);
}

function parseIntNan (n){
  var x = parseInt(n, 10);
  return (isNaN(x)) ? 0 : x;
}

function parseIntZero (n){
  return (!n || n=='') ? 0 : parseInt(n, 10);
}

// class
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
            if (jobs[p] == job)
                delete jobs[p];
        } 
    }
  
    function deleteBuildJob(cityIdx, job){
        var cid = Seed.cities[cityIdx].id;
        var jobs = Seed.jobs[cid];
        for (var p in jobs){
            if (jobs[p] == job)
            delete jobs[p];
        } 
    }

    function getBuildJob (cityIdx){
        var cid = Seed.cities[cityIdx].id;
        var jobs = Seed.jobs[cid];
        for (var p in jobs){
            if (jobs[p].queue == 'building')
            return jobs[p];
        }
        return null;
    }

function getTrainJob (cityIdx){
	var cid = Seed.cities[cityIdx].id;
	var jobs = Seed.jobs[cid];
	for (var p in jobs){
		if (jobs[p].queue == 'units')
			return jobs[p];
	}
	return null;
}

/***********************************   Jobs Tab   **********************************/
Tabs.Jobs = {
	tabOrder        : JOBS_TAB_ORDER,
	tabLabel        : kJobs,
	tabDisabled			: !JOBS_TAB_ENABLE,
	cont            : null,
	timer           : null,
//    buildTimer      : null,
    buildStatTimer  : null,
//    researchTimer   : null,
    resStatTimer    : null,
    trainTimer      : null,
    trainStatTimer  : null,
    capitolTroops   : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror'],
    outpost1Troops  : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'AquaTroop'],
    outpost2Troops  : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'StoneTroop'],
    outpost3Troops  : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'FireTroop'],
	outpost4Troops  : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'WindTroop'],
    allTroops       : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop'],
    selectedQ       : kMinHousing,
    trainJobs       : [],
    capitolResearch : {Agriculture:'Agriculture', Woodcraft:'Woodcraft', Masonry:'Masonry', Mining:'Alloys', Clairvoyance:'Clairvoyance', RapidDeployment:'Rapid Deployment', Ballistics:'Weapons Calibration', Metallurgy:'Metallurgy', Medicine:'Medicine', Dragonry:'Dragonry', Levitation:'Levitation', Mercantilism:'Mercantilism', AerialCombat:'Aerial Combat'},
    researchIdx     : {Agriculture:0, Woodcraft:1, Masonry:2, Mining:3, Clairvoyance:4, RapidDeployment:5, Ballistics:6, Metallurgy:7, Medicine:8, Dragonry:9, Levitation:10, Mercantilism:11, AerialCombat:12},
    capitolCity     : [kHome, kGarrison, kScienceCenter, kMetalsmith, kOfficerQuarter, kMusterPoint, kRookery, kStorageVault, kTheater, kSentinel, kFactory, kFortress, kDragonKeep, kWall],
    capitolField    : [kMine, kFarm, kLumbermill, kQuarry],
    outpostCity     : [kTrainingCamp, kHome, kSilo, kMusterPoint, kDragonKeep, kWall],
    outpostField    : [kMine, kFarm, kLumbermill, kQuarry],
	capitalResearch : ['Agriculture', 'Woodcraft', 'Masonry', 'Alloys', 'Clairvoyance', 'Rapid Deployment', 'Weapons Calibration', 'Metallurgy', 'Medicine', 'Dragonry', 'Levitation', 'Mercantilism', 'Aerial Combat'],
    contentType     : 0, // 0 = info, 1 = train, 2 = build, 3 = research, these should be enums but Javascript doesn't support that type
    trainContentType: 0, // 0 = train, 1 = config
    buildScrollPos  : 0,
    
	init : function (div){
		var t = Tabs.Jobs;
		
		// Tab initialization
		t.cont = div;
		div.innerHTML =  '<TABLE width=100% bgcolor=#ffffd0 align=center><TR><TD>\
			<INPUT class=button type=submit value="Job Info" id=' + rndStyle['subtab_info'] + '></INPUT>\
			<INPUT class=button type=submit value="Train" id=' + rndStyle['subtab_train'] + '></INPUT>\
			<INPUT class=button type=submit value="Build" id=' + rndStyle['subtab_build'] + '></INPUT>\
			<INPUT class=button type=submit value="Research" id=' + rndStyle['subtab_research'] + '></INPUT>\
			</TD></TR></TABLE>\
			<DIV id=' + rndStyle['job_header'] + ' style="padding-top:5px; height:260px; max-height:260px;"></div>\
			<DIV id=' + rndStyle['job_content'] + ' style="padding-top:5px; height:435px; max-height:800px; overflow-y:auto;"></div>';
			
		document.getElementById(rndStyle['subtab_info']).addEventListener ('click', t.tabJobInfo, false);
		document.getElementById(rndStyle['subtab_train']).addEventListener ('click', t.tabJobTrain, false);	
		document.getElementById(rndStyle['subtab_build']).addEventListener ('click', t.tabJobBuild, false);
		document.getElementById(rndStyle['subtab_research']).addEventListener ('click', t.tabJobResearch, false);
		
		// Restore the views
		t.contentType = Data.options.jobsTab;
		t.trainContentType = Data.options.trainTab;

        // Training initialization
        for (var c=0; c<Seed.cities.length; c++)
            if (!Data.options.autoTrain.city[c])
                Data.options.autoTrain.city[c] = {};
	
	   for (var c=0; c<Seed.cities.length; c++) {
            if (!Data.options.autoTrain.city[c].troopType) {
			     Data.options.autoTrain.city[c].troopType = [];
			     for (tt=0; tt<t.capitolTroops.length; tt++)
                    Data.options.autoTrain.city[c].troopType[tt] = {};
            }
	   }
               
	   // Training troopCap
        if (Data.options.troopCap == false) {
            Data.options.troopCap.city = []
            Data.options.troopCap.city.troopType = [];
            for (var c=0; c<Seed.cities.length; c++)
                for (var tt=0; tt<t.allTroops.length; tt++)
                    Data.options.troopCap.city[c].troopType[tt] = {};        
        }
    
	   if (!Data.options.troopCap.city) {
            Data.options.troopCap.city = [];
            for (var c=0; c<Seed.cities.length; c++)
                Data.options.troopCap.city[c] = {};
	   }
	
        for (var c=0; c<Seed.cities.length; c++) {
            if (!Data.options.troopCap.city[c].troopType) {
                Data.options.troopCap.city[c].troopType = [];
                for (tt=0; tt<t.allTroops.length; tt++)
                    Data.options.troopCap.city[c].troopType[tt] = {};
            }
	   }
	   
        // Build initilization
        for (var i=0; i<Seed.cities.length; i++)
            if (!Data.options.autoBuild.buildingEnable[i])
                Data.options.autoBuild.buildingEnable[i] = {};
    
        for (var i=0; i<Seed.cities.length; i++)
            if (!Data.options.autoBuild.buildCap[i])
                Data.options.autoBuild.buildCap[i] = {};
                
        // Research initialization
        for (var i=0; i<Seed.cities.length; i++) {
            if (!Data.options.autoResearch.researchEnable[i])
                Data.options.autoResearch.researchEnable[i] = {};
            if (!Data.options.autoResearch.researchCap[i])
                Data.options.autoResearch.researchCap[i] = {};
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
		clearTimeout (t.timer);
		clearTimeout (t.trainStatTimer);
		clearTimeout (t.buildStatTimer);
		clearTimeout (t.resStatTimer);
    },
    
	tabJobInfo : function (){
		var t = Tabs.Jobs;
        document.getElementById(rndStyle['subtab_build']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_build']).style.color = "white"; 
        document.getElementById(rndStyle['subtab_research']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_research']).style.color = "white"; 
        document.getElementById(rndStyle['subtab_train']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_train']).style.color = "white"; 

        t.contentType = 0;
	    document.getElementById(rndStyle['subtab_info']).style.backgroundColor = "#eed"; 
        document.getElementById(rndStyle['subtab_info']).style.color = "black";
        
        // Timers
		t.clearTimers();
		t.timer = setInterval (t.tabJobInfo, 1000);
		
		var city = Seed.cities[0];
		var n = '<DIV class=' + rndClass['tab_title'] + '>Information</DIV>';
		n += cityTitle(0);
		document.getElementById(rndStyle['job_header']).style.height = "45px";
		document.getElementById(rndStyle['job_header']).innerHTML = n;
		
		var m = '<TABLE class=' + rndStyle['classPrefix'] + 'TabPad>' + dispBuildingJob(0) + dispResearchJob(0) + dispTrainingJobs(0) + '</td></tr></table>';
  
		// outposts ...
		if (Seed.cities.length > 0){
			for (var i=1; i<Seed.cities.length; i++){
				m += '<DIV class=short></div>'+ cityTitle(i) + '<TABLE class=' + rndStyle['classPrefix'] + 'TabPad>' + dispBuildingJob(i) + dispTrainingJobs(i) + '</td></tr></table>';
			}
		}
    
		document.getElementById(rndStyle['job_content']).style.height = "665px";
		document.getElementById(rndStyle['job_content']).innerHTML = m; 
    	
		// Display build queue
		function dispBuildingJob(cityIdx) {
            var m = '<TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kBuilding +'</td>';
            var job = getBuildingJob (cityIdx);
            // TODO: very rare occurance: Error: job.building is null
            if (job && job.job.run_at > serverTime()) {
            // Don't show negative values - not pleasant user interface. To be truly nice, if the time is less than zero, we should reset 
            // the build timer. For now, that is done by the Build tab's notification process
                m += '<TD>'+ job.building.type +' level '+ job.job.level +'</td><TD>'+ timestr(job.job.run_at - serverTime(), true) +'</td></tr>';
            }
             else
                m += '<TD colspan=2><SPAN class=boldRed>NONE</span></td></tr>';
            return m;
		}
	
		// Display research queue
		function dispResearchJob (cityIdx){
            var m = '<TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ kResearch +'</td>';
            var job = getResearchJob (cityIdx);
            if (job && job.run_at > serverTime())
                m += '<TD>'+ job.research_type +' level '+ job.level +'</td><TD>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
            else
                m += '<TD colspan=2><SPAN class=boldRed>NONE</span></td></tr>';
            return m;
		}
	
		// Display training queues
		function dispTrainingJobs (cityIdx){
            var m = '', last = serverTime(), trains = [];
            for (var i=0; i<Seed.cities[cityIdx].jobs.length; i++)
                if (Seed.cities[cityIdx].jobs[i].queue=='units' && Seed.cities[cityIdx].jobs[i].unit_type && Seed.cities[cityIdx].jobs[i].run_at > last)
            
            trains.push (Seed.cities[cityIdx].jobs[i]);
            trains.sort(function(a,b){return a.run_at-b.run_at});
        
            for (var i=0; i<trains.length; i++){
                var left='', tot='', timeRemaining = 0;
                if (i==0)
                    left = kTraining;
                else if (i==trains.length-1) {
                    timeRemaining = (trains[i].run_at-serverTime() > 0) ? trains[i].run_at-serverTime() : 0;
                    tot = ' &nbsp <B>('+ timestrShort(timeRemaining) +')</b>';
                }
                
                timeRemaining = (trains[i].run_at-last > 0) ? trains[i].run_at-last : 0;
                m += '<TR><TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ left +'</td><TD>'+ trains[i].quantity +' '+ trains[i].unit_type +' </td><TD> '
                  + timestr(timeRemaining, true) + tot + '</td></tr>';
                last = trains[i].run_at;
            }      
            return m;
		}
		
        function cityTitle (cityIdx){
            var city = Seed.cities[cityIdx];
            // Outposts are always defending (until further notice)
            var wallStatus = '';
            var alliance_name = (Seed.s.alliance) ? Seed.s.alliance.name : '';
            alliance_name = (city.type == 'Outpost') ? '' : alliance_name;
            
            if (cityIdx == 0)
                wallStatus = (Seed.cities[cityIdx].defended) ? '<font class="defending">'+ kDefending +'</font>' : '<font class="hiding">'+ kSanctuary +'</font>';
            else
                wallStatus = '<font class="defending">'+ kDefending +'</font>';               
      
            return '<div class=' + rndStyle['classPrefix'] + 'Subtitle><TABLE class=' + rndStyle['classPrefix'] + 'Tab><TR><TD align=left>'+ city.name +'</td><TD align=center>'+ city.x +','+ city.y + '</td><TD align=center width=200px><font color=yellow>' + alliance_name +'</font></td><TD width=80px align=right>'+ wallStatus +'</td></tr></table></div>';
        }
	},
  
	tabJobTrain : function (){
		var t = Tabs.Jobs;
   	    document.getElementById(rndStyle['subtab_info']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_info']).style.color = "white";
        document.getElementById(rndStyle['subtab_build']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_build']).style.color = "white"; 
        document.getElementById(rndStyle['subtab_research']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_research']).style.color = "white"; 

        t.contentType = 1;
        document.getElementById(rndStyle['subtab_train']).style.backgroundColor = "#eed"; 
        document.getElementById(rndStyle['subtab_train']).style.color = "black"; 
       
		t.clearTimers();
		t.trainStatTimer = setInterval(t.trainStatTick, 1000);

	   // Create status ticker
        var n = '<DIV class=' + rndClass['tab_title'] + '>'+ kAutoTrain +'</div>\
                 <DIV class=' + rndStyle['status_ticker'] + ' style="margin-bottom: 5px !important"><CENTER><INPUT id=pbtrnOnOff type=submit\></center>\
                 <DIV id=pbtrnTrnStat style="height: 126px; max-height: 126px; overflow:auto;"></div> <BR>\
                 <DIV id=pbtrnFeedback class='+ rndStyle['status_feedback'] +'></div>  </div>\
                 <TABLE width=100% bgcolor=#ffffd0 align=center><TR><TD>\
                 <INPUT class=button type=submit value='+ kTrain +' id=pbttTrain></input>\
                 <INPUT class=button type=submit value='+ kConfig +' id=pbttConfigTrain></input></td></tr></table>';
		document.getElementById(rndStyle['job_header']).style.height = "258px";
        document.getElementById(rndStyle['job_header']).innerHTML = n;
        
        var m = '<DIV id=pbtrnConfig style="padding-top: 5px; overflow:auto;"class=' + rndStyle['classPrefix'] + 'Input>';
        
		document.getElementById(rndStyle['job_content']).style.height = "435px";
        document.getElementById(rndStyle['job_content']).innerHTML = m;
      
 	  // Add event listener for auto on/off button
        document.getElementById('pbtrnOnOff').addEventListener ('click', function (){ t.setTrainEnable (!Data.options.autoTrain.enabled);}, false);
        document.getElementById('pbttTrain').addEventListener ('click', t.tabTrain, false);
        document.getElementById('pbttConfigTrain').addEventListener ('click', t.tabConfigTrain, false);
        t.refreshTrainButton (Data.options.autoTrain.enabled);
    
        switch (t.trainContentType) {
            case 0: t.tabTrain(); break;
            case 1: t.tabConfigTrain(); break;
        }
	
	   // Display error message
        function dispError (msg){
            var dial = new ModalDialog (t.cont, 300, 150, '', true);
            dial.getContentDiv().innerHTML = msg;
        }	
	},
  
	refresh : function (){
		var t = Tabs.Jobs;
		Seed.fetchSeed (t.showStuff());  
	},

	tabJobBuild : function (){
		var t = Tabs.Jobs;
	    document.getElementById(rndStyle['subtab_info']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_info']).style.color = "white"; 
        document.getElementById(rndStyle['subtab_research']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_research']).style.color = "white"; 
        document.getElementById(rndStyle['subtab_train']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_train']).style.color = "white"; 

        t.contentType = 2;
        document.getElementById(rndStyle['subtab_build']).style.backgroundColor = "#eed"; 
        document.getElementById(rndStyle['subtab_build']).style.color = "black"; 
    
        // Timers
        t.clearTimers();
        t.buildStatTimer = setInterval (t.buildStatTick, 1000); // start the build statistics timer

		//var m = '<DIV class=' + rndClass['tab_title'] + '>Auto Build</div>';
		//document.getElementById(rndStyle['job_content']).innerHTML = m;	

        var n = '<DIV class=' + rndClass['tab_title'] + '>'+ kAutoUpgradeBuildings +'</div>\
                 <DIV class=' + rndStyle['status_ticker'] + '><CENTER><INPUT id=pbbldOnOff type=submit\></center>\
                 <DIV id=pbbldBldStat style="height: 126px; max-height: 126px; overflow:auto;"></div> <BR>\
                 <DIV id=pbbldFeedback class='+ rndStyle['status_feedback'] +'></div>  </div>';
		document.getElementById(rndStyle['job_header']).style.height = "240px";
        document.getElementById(rndStyle['job_header']).innerHTML = n;
        
        var m = '<DIV id=pbbldConfig class=' + rndStyle['classPrefix'] + 'Input>';
    
        var el = [], listC = [], listF = [];
    
        for (var i=0; i<Seed.cities.length; i++){
            if (i==0){
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
            var city = Seed.cities[i];
            m += '<DIV class=' + rndStyle['classPrefix'] + 'Subtitle>'+ kCityNumber + (i+1) +' ('+ city.type +')</div><TABLE class=' + rndStyle['classPrefix'] + 'Tab><TR valign=top><TD width=150><TABLE class=' + rndStyle['classPrefix'] + 'Tab>';
            for (var ii=0; ii<listC.length; ii++){
                m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listC[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listC[ii]]?'CHECKED':'') +' /></td><TD>'+ listC[ii] +'</td>'+ buildDisplayCap(i,ii) +'</tr>';  
                el.push('pbbldcb_'+ i +'_'+ listC[ii]);
            }
            m += '</table></td><TD><TABLE class=' + rndStyle['classPrefix'] + 'Tab>';  
            for (var ii=0; ii<listF.length; ii++){
                m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listF[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listF[ii]]?'CHECKED':'') +' /></td><TD>'+ listF[ii] +'</td>'+ buildDisplayCap(i,(listC.length + ii)) +'</tr>';  
                el.push('pbbldcb_'+ i +'_'+ listF[ii]);
            }
            m += '</table></td></tr></table>';
        }    
        m += '</div>';
		document.getElementById(rndStyle['job_content']).style.height = "475px";
        document.getElementById(rndStyle['job_content']).innerHTML = m;
        //document.getElementById(rndStyle['job_content']).scrollTop = t.buildScrollPos; // CHECK
    
        // Add the event listeners for each city's building types
        for (var i=0; i<el.length; i++)
            document.getElementById(el[i]).addEventListener('click', checked, false);
      
        // Add the event listeners for each city's building type caps
        // And restore the persistent data since it has to be done in the same loop
        for (var i=0; i<Seed.cities.length; i++) {
            var len = (i==0) ? (t.capitolCity.length + t.capitolField.length) : (t.outpostCity.length + t.outpostField.length);
            for (var ii=0;ii<len; ii++) {
                var selectMenu = document.getElementById('pbbldcap_'+ i + '_' + ii);
                try {
                    if (!Data.options.autoBuild.buildCap[i][ii]) {
                        var capitolB = t.capitolCity.concat(t.capitolField);
                        var outpostB = t.outpostCity.concat(t.outpostField);                    
                        var lowestBuildingLevel = t.getCurrentLowestBuildingLevel(i, (i==0)? capitolB[ii] : outpostB[ii]);
                        selectMenu.selectedIndex = lowestBuildingLevel;
                        Data.options.autoBuild.buildCap[i][ii] = lowestBuildingLevel;
                    }
                    else {
                        selectMenu.selectedIndex = Data.options.autoBuild.buildCap[i][ii];
                        selectMenu.options[Data.options.autoBuild.buildCap[i][ii]].selected = true;
                    }
                }
                catch (e) {
                }
                selectMenu.addEventListener('change', changeBuildCap, false);
            }
        }
      
        // Add the event listeners for the auto-build button and scrollbar
        document.getElementById('pbbldOnOff').addEventListener ('click', function (){t.setBuildEnable (!Data.options.autoBuild.enabled);}, false);
        t.refreshBuildButton (Data.options.autoBuild.enabled);
        //document.getElementById(rndStyle['job_content']).addEventListener('scroll', onScroll, false); // CHECK
    
        function checked (evt){
            var id = evt.target.id.split ('_');
            var cityId = Seed.cities[id[1]].id;
            Data.options.autoBuild.buildingEnable[id[1]][id[2]] = evt.target.checked;
            if (Data.options.autoBuild.enabled && evt.target.checked)
                t.buildTick();  
        }

        function buildDisplayCap (cityIdx, listIdx){
            var m = '<TD><SELECT id="pbbldcap_' + cityIdx +'_'+ listIdx +'"<option value="1">1</option>\
                 <option value="0">0</option>\
                 <option value="1">1</option>\
                 <option value="2">2</option>\
                 <option value="3">3</option>\
                 <option value="4">4</option>\
                 <option value="5">5</option>\
                 <option value="6">6</option>\
                 <option value="7">7</option>\
                 <option value="8">8</option>\
                 <option value="9">9</option>\
                 <option value="10">10</option>\
                 <option value="11">11</option>\
                 </select></td>';
            return m;
        }
    
        // Add to persistent storage
        function changeBuildCap (evt) {
            var bId = evt.target.id.split ('_');
            Data.options.autoBuild.buildCap[bId[1]][bId[2]] = evt.target[evt.target.selectedIndex].value;
            evt.target.style.backgroundColor = ''; 
            if (Data.options.autoBuild.enabled)
                t.buildTick();      
        }
        
        function onScroll (e){
            if (t.contentType == 2)
                t.buildScrollPos = document.getElementById(rndStyle['job_content']).scrollTop;
        }
	},
  
	tabJobResearch : function (){
		var t = Tabs.Jobs;	
	    document.getElementById(rndStyle['subtab_info']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_info']).style.color = "white"; 
        document.getElementById(rndStyle['subtab_build']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_build']).style.color = "white"; 
        document.getElementById(rndStyle['subtab_train']).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
        document.getElementById(rndStyle['subtab_train']).style.color = "white"; 

        t.contentType = 3;
        document.getElementById(rndStyle['subtab_research']).style.backgroundColor = "#eed"; 
        document.getElementById(rndStyle['subtab_research']).style.color = "black"; 

        // Timers
		t.clearTimers();
        t.resStatTimer = setInterval (t.resStatTick, 1000); // start the research statistics timer
        
        var n = '<DIV class=' + rndClass['tab_title'] + '>'+ kAutoResearch +'</div>\
                 <DIV class=' + rndStyle['status_ticker'] + '><CENTER><INPUT id=pbresOnOff type=submit\></center>\
                 <DIV id=pbresStat style="height: 126px; max-height: 126px; overflow:auto;"></div> <BR>\
                 <DIV id=pbresFeedback class='+ rndStyle['status_feedback'] +'></div>  </div>';
		document.getElementById(rndStyle['job_header']).style.height = "230px";
		document.getElementById(rndStyle['job_header']).innerHTML = n;
		
        var m = '<DIV id=pbresConfig class=' + rndStyle['classPrefix'] + 'Input>';
    
        var el = [];
        var city = Seed.cities[0];
    
        m += '<DIV class=' + rndStyle['classPrefix'] + 'Subtitle>'+ kCityNumber +'1 ('+ city.type +')</div><TABLE class=' + rndStyle['classPrefix'] + 'Tab><TR valign=top><TD width=150><TABLE class=' + rndStyle['classPrefix'] + 'Tab>';
        var i=0;
        for (var p in t.capitolResearch){
            m += '<TR><TD><INPUT type=checkbox id="pbrescb_'+ 0 + '_' +t.capitolResearch[p] +'" '+ (Data.options.autoResearch.researchEnable[0][t.capitolResearch[p]]?'CHECKED':'') +' /></td><TD>'+ t.capitolResearch[p] +'</td><TD>'+ researchDisplayCap(i) +'</td></tr>';  
            el.push('pbrescb_' + 0 + '_' +t.capitolResearch[p]);
            ++i;
        }
        m += '</table></td><TD><TABLE class=' + rndStyle['classPrefix'] + 'Tab>';  
        m += '</div>';
		document.getElementById(rndStyle['job_content']).style.height = "435px";
		document.getElementById(rndStyle['job_content']).innerHTML = m;
    
        // Add the event listeners for the research types
        for (var i=0; i<el.length; i++)
            document.getElementById(el[i]).addEventListener('click', checked, false);
      
        // Add the event listeners for the research caps
        // And restore the persistent data since it has to be done in the same loop
        var ii = 0;
        for (var p in t.capitolResearch) {
            var selectMenu = document.getElementById('pbrescap_'+ 0 + '_' +ii);
            try {
                if (!Data.options.autoResearch.researchCap[0][ii]) {
                    var currentResearchLevel = t.getCurrentResearchLevel(p);
                    selectMenu.selectedIndex = currentResearchLevel;
                    Data.options.autoResearch.researchCap[0][ii] = currentResearchLevel;
                }
                else {
                    selectMenu.selectedIndex = Data.options.autoResearch.researchCap[0][ii];
                    selectMenu.options[Data.options.autoResearch.researchCap[0][ii]].selected = true;
                }
            }
            catch (e) {
            }
            selectMenu.addEventListener('change', changeResearchCap, false);
            ++ii;
        }
      
        document.getElementById('pbresOnOff').addEventListener ('click', function (){t.setResearchEnable (!Data.options.autoResearch.enabled);}, false);
        t.refreshResearchButton (Data.options.autoResearch.enabled);
        
        function checked (evt){
            var rId = evt.target.id.split ('_');
            Data.options.autoResearch.researchEnable[rId[1]][rId[2]] = evt.target.checked;
            if (Data.options.autoResearch.enabled)
                t.researchTick();     
        }

        function researchDisplayCap (listIdx){
            var m = '<TD><SELECT id="pbrescap_' + 0 + '_' + listIdx +'"<option value="1">1</option>\
                 <option value="0">0</option>\
                 <option value="1">1</option>\
                 <option value="2">2</option>\
                 <option value="3">3</option>\
                 <option value="4">4</option>\
                 <option value="5">5</option>\
                 <option value="6">6</option>\
                 <option value="7">7</option>\
                 <option value="8">8</option>\
                 <option value="9">9</option>\
                 <option value="10">10</option>\
                 </select></td>';
            return m;
        }
    
        // Add to persistent storage
        function changeResearchCap (evt) {
            var rId = evt.target.id.split ('_');
            Data.options.autoResearch.researchCap[rId[1]][rId[2]] = evt.target[evt.target.selectedIndex].value;
            evt.target.style.backgroundColor = '';  
            if (Data.options.autoResearch.enabled)
                t.researchTick();     
        }	
	},

    setTrainEnable : function (onOff){
        var t = Tabs.Jobs;
        var but = document.getElementById('pbtrnOnOff');
        Data.options.autoTrain.enabled = onOff;
        if (onOff){
            if (but) {
                but.value = kAutoOn;
                but.className = 'butAttackOn';
            }
            Data.options.trainTimer = setInterval(function() {t.trainTick(0) }, 3000);
        } 
        else {
            if (but) {
                but.value = kAutoOff;
                but.className = 'butAttackOff';
            }
            t.dispFeedback(""); // Erase previous feedback
            clearTimeout (Data.options.trainTimer);
        }
    },
  	
    setBuildEnable : function (onOff){
        var t = Tabs.Jobs;
        var but = document.getElementById('pbbldOnOff');
        Data.options.autoBuild.enabled = onOff;
        if (onOff){
            if (but) {
                but.value = kAutoBuildOn;
                but.className = 'butAttackOn';
            }
            Data.options.buildTimer = setInterval (t.buildTick, 4000);
        } 
        else {
            if (but) {
                but.value = kAutoBuildOff;
                but.className = 'butAttackOff';
            }
            clearTimeout (Data.options.buildTimer);
            Data.options.tJobs.length = 0;
        }
    },

    setResearchEnable : function (onOff){
        var t = Tabs.Jobs;
        var but = document.getElementById('pbresOnOff');

        Data.options.autoResearch.enabled = onOff;
        if (onOff){
            if (but) {
                but.value = kAutoResearchOn;
                but.className = 'butAttackOn';
            }
            Data.options.researchTimer = setInterval(t.researchTick, 5000);
        } 
        else {
            if (but) {
                but.value = kAutoResearchOff;
                but.className = 'butAttackOff';
            }
            clearTimeout (Data.options.researchTimer);
            Data.options.rJobs.length = 0;
        }
    },
    
    refreshTrainButton : function (onOff) {
        var t = Tabs.Jobs;
        var but = document.getElementById('pbtrnOnOff');

        if (onOff){
            but.value = kAutoOn;
            but.className = 'butAttackOn';

        } 
        else {
            but.value = kAutoOff;
            but.className = 'butAttackOff';
        }
    },

    refreshBuildButton : function (onOff) {
        var t = Tabs.Jobs;
        var but = document.getElementById('pbbldOnOff');

        if (onOff){
            but.value = kAutoBuildOn;
            but.className = 'butAttackOn';

        } 
        else {
            but.value = kAutoBuildOff;
            but.className = 'butAttackOff';
        }
    },

    refreshResearchButton : function (onOff) {
        var t = Tabs.Jobs;
        var but = document.getElementById('pbresOnOff');

        if (onOff){
            but.value = kAutoResearchOn;
            but.className = 'butAttackOn';

        } 
        else {
            but.value = kAutoResearchOff;
            but.className = 'butAttackOff';
        }
    },

    trainStatTick : function (){
        var t = Tabs.Jobs;
        var statElement = document.getElementById('pbtrnTrnStat');
        if (statElement != null) statElement.innerHTML = trainTable('train');
    },
      
    // Build statistics - timer set to fire every 1 seconds
    // Calls getBuildJob(), deleteBuildJob(), Buildings.getById(), Seed.fetchSeed(), serverTime()
    buildStatFetch : false,
    buildStatTick : function (){
        var t = Tabs.Jobs;
        var m = '<TABLE class=' + rndStyle['classPrefix'] + 'TabPad>';
        var len = Data.options.tJobs.length;
    
        for (var i=0; i<Seed.cities.length; i++){
            var city = Seed.cities[i];
            var job = getBuildJob (i);
            if (Data.options.tJobs.length == 0 && job) {
                // the Seed is out of sync, the job should be deleted
                deleteBuildJob (i, job);
                job = null;
            }
            m += '<TR><TD>'+ kCityNumber + (i+1) +'</td><TD>';
            if (job == null)
                m += kIdle +'</td></tr>';
            else {
                var b = Buildings.getById(i, job.city_building_id);
                var timeRemaining = ((job.run_at - serverTime()) > 0) ? timestr(job.run_at - serverTime()) : 0;
                if (timeRemaining == 0) {
                    // If we have a job and the timeRemaining is negative or zero we delete the job
                    // and fetch the Seed - although this does not always work because the server
                    // is laggy and may not return the correct information
                    m += 'awaiting job completion notification...</td><TD></td><TD></td></tr>';
                    deleteBuildJob (i, job);
                    if (t.statFetch == false) {
                        Seed.fetchSeed();
                        t.buildStatFetch = true;
                    }
                }
                else {
                    m += kBuilding1 +'</td><TD>'+ kLevel1 +' '+ job.level +' '+ b.type  +'</td><TD>'+ timeRemaining  +'</td></tr>';
                    t.buildStatFetch = false;
                }
            }
        }
        document.getElementById('pbbldBldStat').innerHTML = m +'</table>';
    },

    // Build statistics - timer set to fire every 1 seconds
    // Calls getResearchJob(), deleteResearchJob(), Seed.fetchSeed(), resUITranslate(), serverTime()
    resStatFetch : false,
    resStatTick : function (){
        var t = Tabs.Jobs, m = '<TABLE class=' + rndStyle['classPrefix'] + 'TabPad>', city = Seed.cities[0];
        var job = getResearchJob (0);
    
        m += '<TR><TD>'+ kCityNumber +' 1</td><TD>';

        if (job == null)
            m += kIdle +'</td></tr>';
        else {
            var timeRemaining = ((job.run_at - serverTime()) > 0) ? timestr(job.run_at - serverTime()) : 0;
            if (timeRemaining == 0) {
                m += 'Awaiting job completion notification...</td><TD></td><TD></td></tr>';
                deleteResearchJob(job);
                if (t.resStatFetch == false) {
                    Seed.fetchSeed();
                    t.resStatFetch = true;
                }
            }    
            else {
                // Bug: If we have a job and the timeRemaining is negative or zero we should delete the job
                m += kResearch +'</td><TD>'+ kLevel1 +' '+ job.level +' '+ t.resUITranslate (job.research_type) +'</td><TD>'+ timeRemaining  +'</td></tr>';
                t.resStatFetch = false;
            }
        }

        document.getElementById('pbresStat').innerHTML = m +'</table>';
        //t.statTimer = setTimeout (t.statTick, 5000);
    },

    // Modified to work with jobs
    dispFeedback : function (msg){
        var t = Tabs.Jobs;
        var elementId = '';   

        switch(t.contentType) {
            case 0: break;
            case 1: elementId = 'pbtrnFeedback'; break;
            case 2: elementId = 'pbbldFeedback'; break;
            case 3: elementId = 'pbresFeedback'; break;
        } 
        
        if (elementId && document.getElementById(elementId))
            if (msg == '')
                document.getElementById(elementId).innerHTML = msg; 
            else
                document.getElementById(elementId).innerHTML = new Date().toTimeString().substring (0,8) +' '+  msg;       
    },

    // Returns level == 12 if the building is missing
    getCurrentLowestBuildingLevel : function (cityIdx, buildingType){
        var t = Tabs.Jobs, level = 12;
    
        // The building can be missing if it has not been built yet
        try {
            var b = Seed.cities[cityIdx].buildings;
            for (var i=0; i<b.length; i++)
                if (b[i].type == buildingType)
                    if (b[i].level < level)
                        level = b[i].level; 
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
        
        for (var p=0; p<buildings.length;p++) 
            if (buildings[p].type == buildingType) {
                bFound = true; 
                if (buildings[p].level < lowest)
                    lowest = buildings[p].level;
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
            if (researchType == 'Rapid Deployment')
                researchType = 'RapidDeployment';
            if (researchType == 'Weapons Calibration')
                researchType = 'Ballistics';
            if (researchType == 'Aerial Combat')
                researchType = 'AerialCombat';
            level = (Seed.s.research[researchType]) ? Seed.s.research[researchType] : 0; 
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
        for (var i=0; i<t.allTroops.length;i++)
            if (troopType == t.allTroops[i]) {
                cap = Data.options.troopCap.city[0].troopType[i];
                break;
            }
        
        // If there is no cap, we are done
        if (cap == 0)
            return cap;
    
        // Find the number of troops still in the city    
        for (var p in Seed.cities[0].units)
            if (p == troopType) {
                completedTroops = Seed.cities[0].units[p];
                break;
            }
    
        // Find additional troops in marches
        for (var p in Seed.marches) {
            for (var q in Seed.marches[p].units)
                if (q == troopType)
                    marchingTroops += Seed.marches[p].units[q];
        }

        // Find troops in training jobs
        for (var i=0; i< Seed.cities.length; i++)
            var job = getTrainJob(0);
               
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
        var resType = t.capitolResearch;
     
        for (var p in resType) {
            //if (resType[p] == researchType) {
            if (p == researchType) {
                try {
                    cap = (Data.options.autoResearch.researchCap[0][t.researchIdx[researchType]]) ? Data.options.autoResearch.researchCap[0][t.researchIdx[researchType]] : 0; 
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
        var items = Seed.s.items;
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
        for (var p in t.capitolResearch)
            if (p == researchType) 
                return t.capitolResearch[p];
    },
  
    // Given the city index number and building type, returns the index
    // of the specified building type
    getBuildingIndex : function (cityIdx, buildingType){
        var t = Tabs.Jobs, bldgIdx = 0;
        var cityType =  (cityIdx == 0) ? t.capitolCity : t.outpostCity;
        cityType =  (cityIdx == 0) ? cityType.concat(t.capitolField) : cityType.concat(t.outpostField);
    
        for (var i=0; i < cityType.length; i++)
            if (cityType[i] == buildingType) { 
                bldgIdx = i;
                break;
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
        for (var p=0; p<buildings.length;p++) {
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
            if (jobs[i].queue == queueType) ++usedQueue;
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
        var troopType = 'Porter';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kPorter, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
    
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m += '<TD>&nbsp;training queue</td>';
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty + ' ' + kPorter +'s eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'Conscript';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kConscript, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
    
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m += '<TD>&nbsp;training queue</td>';
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kConscript +'s eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'Spy';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            clairvoyanceLevel = seedReqs.research['Clairvoyance'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kSpy, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m += '<TD>&nbsp;training queue</td>';
        if (Seed.s.research.Clairvoyance < clairvoyanceLevel) m += '<TD>&nbsp;Clairvoyance ' + clairvoyanceLevel + '</td>';
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kSpies +' eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'Halberdsman';
    
        try {
        var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            metallurgyLevel = seedReqs.research['Metallurgy'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kHalberdsman, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m+= '<TD>&nbsp;training queue</td>';
        if (Seed.s.research.Metallurgy < metallurgyLevel) m += '<TD>&nbsp;Metallurgy ' + metallurgyLevel +'</td>'; 
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kHalberdsmen +' eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'Minotaur';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            metallurgyLevel = seedReqs.research['Metallurgy'];
            metalsmithLevel = seedReqs.research['Metalsmith'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kMinotaur, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m+= '<TD>&nbsp;training queue</td>';
        if (Seed.s.research.Metallurgy < metallurgyLevel) m += '<TD>&nbsp;Metallurgy ' + metallurgyLevel +'</td>'; 
        if (Seed.s.research.Metalsmith < metalsmithLevel) m += '<TD>&nbsp;Metalsmith ' + metalsmithLevel +'</td>'; 
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kMinotaur +'s eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret;          
    },

    checkLongbowmanReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Weapons Calibration: 1
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
        var weaponCalibrationLevel = 1;
        var city = Seed.cities[0];
        var troopType = 'Longbowman';
       
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            weaponCalibrationLevel = seedReqs.research['Ballistics'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }
        
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kLongbowman, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m+= '<TD>&nbsp;training queue</td>';
        if (Seed.s.research.WeaponsCalibration < weaponCalibrationLevel) m += '<TD>&nbsp;Weapons Calibration ' + weaponCalibrationLevel +'</td>'; 
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kLongbowmen +' eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'SwiftStrikeDragon';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            rookeryLevel = seedReqs.buildings['Rookery'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            rapidDeploymentLevel = seedReqs.research['RapidDeployment'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kSwiftStrikeDragon, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (t.getBuildingLevel(0, kRookery, rookeryLevel) == 0) m += '<TD>&nbsp;Rookery '+ rookeryLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m+= '<TD>&nbsp;training queue</td>';
        if (Seed.s.research.Dragonry < dragonryLevel) m += '<TD>&nbsp;Dragonry ' + dragonryLevel +'</td>'; 
        if (Seed.s.research.RapidDeployment < rapidDeploymentLevel) m += '<TD>&nbsp;Rapid Deployment ' + rapidDeploymentLevel +'</td>'; 
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kSwiftStrikeDragon +'s eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'BattleDragon';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            rookeryLevel = seedReqs.buildings['Rookery'];
            metalsmithLevel = seedReqs.buildings['Metalsmith'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            rapidDeploymentLevel = seedReqs.research['RapidDeployment'];
            dragonryLevel = seedReqs.research['Dragonry'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kBattleDragon, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += '<TD>&nbsp;Metalsmith '+ metalsmithLevel +'</td>';
        if (t.getBuildingLevel(0, kRookery, rookeryLevel) == 0) m += '<TD>&nbsp;Rookery '+ rookeryLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m+= '<TD>&nbsp;training queue</td>';
        if (Seed.s.research.Dragonry < dragonryLevel) m += '<TD>&nbsp;Dragonry ' + dragonryLevel +'</td>'; 
        if (Seed.s.research.RapidDeployment < rapidDeploymentLevel) m += '<TD>&nbsp;Rapid Deployment ' + rapidDeploymentLevel +'</td>'; 
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kBattleDragon +'s eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'ArmoredTransport';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            factoryLevel = seedReqs.buildings['Factory'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            levitationLevel = seedReqs.research['Levitation'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kArmoredTransport, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (t.getBuildingLevel(0, kFactory, factoryLevel) == 0) m += '<TD>&nbsp;Factory '+ factoryLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ ((lumber - city.resources.wood)) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ ((metal - city.resources.ore)) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m+= '<TD>&nbsp;training queue</td>';
        if (Seed.s.research.Levitation < levitationLevel) m += '<TD>&nbsp;Levitation ' + levitationLevel +'</td>'; 
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kArmoredTransport +'s eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'Giant';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            factoryLevel = seedReqs.buildings['Factory'];
            metalsmithLevel = seedReqs.buildings['Metalsmith'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            clairvoyanceLevel = seedReqs.research['Clairvoyance'];
            metallurgyLevel = seedReqs.research['Metallurgy'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kGiant, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (t.getBuildingLevel(0, kFactory, factoryLevel) == 0) m += '<TD>&nbsp;Factory '+ factoryLevel +'</td>';
        if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += '<TD>&nbsp;Metalsmith '+ metalsmithLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m+= '<TD>&nbsp;training queue</td>';
        if (Seed.s.research.Clairvoyance < clairvoyanceLevel) m += '<TD>&nbsp;Clairvoyance ' + clairvoyanceLevel +'</td>'; 
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kGiant +'s eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret;    
    },

    checkFireMirrorReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Weapons Calibration: 10
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
        var weaponsCalibrationLevel = 10;
        var city = Seed.cities[0];
        var troopType = 'FireMirror';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            factoryLevel = seedReqs.buildings['Factory'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            stone = troopQty * seedReqs.resources['stone'];
            weaponsCalibrationLevel = seedReqs.research['Ballistics'];
            metallurgyLevel = seedReqs.research['Metallurgy'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kFireMirror, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (ic == 0){ 
            if (t.getBuildingLevel(ic, kGarrison, garrisonLevel) == 0) m += '<TD>&nbsp;garrison '+ garrisonLevel +'</td>';
        }
        else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
        if (t.getBuildingLevel(0, kFactory, factoryLevel) == 0) m += '<TD>&nbsp;Factory '+ factoryLevel +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;lumber '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (stone - city.resources.stone) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(ic, kUnits) == 0) m+= '<td>&nbsp;training queue</td>';
        if (Seed.s.research.Metallurgy < metallurgyLevel) m += '<TD>&nbsp;Metallurgy ' + metallurgyLevel +'</td>'; 
        if (Seed.s.research.WeaponsCalibration < weaponsCalibrationLevel) m += '<TD>&nbsp;Weapons Calibration ' + weaponsCalibrationLevel +'</td>'; 
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kFireMirror +'s eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'AquaTroop';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['Garrison'];
            factoryLevel = seedReqs.buildings['Factory'];
            metalsmithLevel = seedReqs.buildings['Metalsmith'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            stone = troopQty * seedReqs.resources['stone'];
            rapidDeploymentLevel = seedReqs.research['RapidDeployment'];
            clairvoyanceLevel = seedReqs.research['Clairvoyance'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kAquaTroop, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (t.getBuildingLevel(ic, kTrainingCamp, trainingCampLevel) == 0) m += '<TD>&nbsp;training camp '+ trainingCampLevel +'</td>';
        if (t.getBuildingLevel(0, kFactory, factoryLevel) == 0) m += '<TD>&nbsp;Factory '+ factoryLevel +'</td>';
        if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += '<TD>&nbsp;Metalsmith '+ metalsmithLevel +'</td>';
        var availableRespirators = t.getItem(kAquaTroopRespirator);
        if (availableRespirators < respiratorQty) m += '<TD>&nbsp;Respirators '+ (respiratorQty - availableRespirators) +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;lumber '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (stone - city.resources.stone) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(1, kUnits) == 0) m+= '<td>&nbsp;training queue</td>';
        if (Seed.s.research.Clairvoyance < clairvoyanceLevel) m += '<TD>&nbsp;Clairvoyance ' + clairvoyanceLevel +'</td>'; 
        if (Seed.s.research.RapidDeployment < rapidDeploymentLevel) m += '<TD>&nbsp;Rapid Deployment ' + rapidDeploymentLevel +'</td>'; 
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kAquaTroop +'s eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'StoneTroop';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
            food = troopQty * seedReqs.resources['food'];
            garrisonLevel = seedReqs.buildings['TrainingCamp'];
            factoryLevel = seedReqs.buildings['Factory'];
            metalsmithLevel = seedReqs.buildings['Metalsmith'];
            idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            stone = troopQty * seedReqs.resources['stone'];
            metallurgyLevel = seedReqs.research['Metallurgy'];
            clairvoyanceLevel = seedReqs.research['Clairvoyance'];
            masonryLevel = seedReqs.research['Masonry'];
        }
        catch(e){
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kStoneTroop, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
        if (t.getBuildingLevel(ic, kTrainingCamp, trainingCampLevel) == 0) m += '<TD>&nbsp;training camp '+ trainingCampLevel +'</td>';
        if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += '<TD>&nbsp;Metalsmith '+ metalsmithLevel +'</td>';
        var availableMandrakes = t.getItem(kStoneTroopItem);
        if (availableMandrakes < mandrakeQty) m += '<TD>&nbsp;Mandrakes '+ (mandrakeQty - availableMandrakes) +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;lumber '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (stone - city.resources.stone) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (t.getRemainingQueue(1, kUnits) == 0) m+= '<td>&nbsp;training queue</td>';
        if (Seed.s.research.Clairvoyance < clairvoyanceLevel) m += '<TD>&nbsp;Clairvoyance ' + clairvoyanceLevel +'</td>'; 
        if (Seed.s.research.Metallurgy < metallurgyLevel) m += '<TD>&nbsp;Metallurgy ' + metallurgyLevel +'</td>'; 
        if (Seed.s.research.Masonry < masonryLevel) m += '<TD>&nbsp;Masonry ' + masonryLevel +'</td>'; 
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kStoneTroop +'s eat ' + upkeep + ' food';
        }
        else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
		// Weapons Calibration: 10
    
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
		var weaponsCalibrationLevel = 10;
       
        var upkeep = troopQty * 260;

        var city = Seed.cities[0];
        var troopType = 'FireTroop';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
			clairvoyanceLevel = seedReqs.research['Clairvoyance'];
            food = troopQty * seedReqs.resources['food'];
			idlePop = troopQty * seedReqs.population['idle'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
            metalsmithLevel = seedReqs.buildings['Metalsmith'];
			rapidDeploymentLevel = seedReqs.research['RapidDeployment'];
			stone = troopQty * seedReqs.resources['stone'];
			garrisonLevel = seedReqs.buildings['TrainingCamp'];
            weaponsCalibrationLevel = seedReqs.research['Ballistics'];
        } catch (e) {
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kFireTroop, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
		if (Seed.s.research.Clairvoyance < clairvoyanceLevel) m += '<TD>&nbsp;Clairvoyance ' + clairvoyanceLevel +'</td>';
		if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;lumber '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
		if (t.getBuildingLevel(0, kMetalsmith, metalsmithLevel) == 0) m += '<TD>&nbsp;Metalsmith '+ metalsmithLevel +'</td>';
		if (Seed.s.research.RapidDeployment < rapidDeploymentLevel) m += '<TD>&nbsp;Rapid Deployment ' + rapidDeploymentLevel +'</td>'; 
		if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (stone - city.resources.stone) +'</td>';
        if (t.getBuildingLevel(ic, kTrainingCamp, trainingCampLevel) == 0) m += '<TD>&nbsp;training camp '+ trainingCampLevel +'</td>';
        var availableRunes = t.getItem(kFireTroopItem);
        if (availableRunes < volcanicRunesQty) m += '<TD>&nbsp;Runes '+ (volcanicRunesQty - availableRunes) +'</td>';
		if (Seed.s.research.Ballistics < weaponsCalibrationLevel) m += '<TD>&nbsp;Weapons Calibration ' + weaponsCalibrationLevel +'</td>'; 
        if (t.getRemainingQueue(1, kUnits) == 0) m+= '<td>&nbsp;training queue</td>';
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kFireTroop +'s eat ' + upkeep + ' food';
        } else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var troopType = 'WindTroop';
    
        try {
            var seedReqs = Seed.requirements.troop[troopType];
			aerialCombatLevel = seedReqs.research['AerialCombat'];
            food = troopQty * seedReqs.resources['food'];
			idlePop = troopQty * seedReqs.population['idle'];
			levitationLevel = seedReqs.research['Levitation'];
            lumber = troopQty * seedReqs.resources['wood'];
            metal = troopQty * seedReqs.resources['ore'];
			rapidDeploymentLevel = seedReqs.research['RapidDeployment'];
			stone = troopQty * seedReqs.resources['stone'];
			garrisonLevel = seedReqs.buildings['TrainingCamp'];
        } catch (e) {
            actionLog('Training: ' + e.msg + ' Manifest not available, using defaults');
        }

        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var ret = {trainable:false, msg:[]};
        var troopCapped = t.getTroopCap(kWindTroop, troopQty);
    
        // If the troop is capped, are we about to exceed the limit?
        if (troopCapped > 0) m += '<TD>&nbsp; Cap limit '+ troopCapped +'</td>';
        
        // Returns zero or the building level
		if (Seed.s.research.AerialCombat < aerialCombatLevel) m += '<TD>&nbsp;Aerial Combat ' + aerialCombatLevel +'</td>';
		if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        var availablePop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
        availablePop = (availablePop > 0) ? availablePop : 0;
        if (availablePop < idlePop) m += '<TD>&nbsp;people ' + (idlePop - availablePop) + '</td>';
		if (Seed.s.research.Levitation < levitationLevel) m += '<TD>&nbsp;Leviatation ' + levitationLevel +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;lumber '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
		if (Seed.s.research.RapidDeployment < rapidDeploymentLevel) m += '<TD>&nbsp;Rapid Deployment ' + rapidDeploymentLevel +'</td>'; 
		if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (stone - city.resources.stone) +'</td>';
        if (t.getBuildingLevel(ic, kTrainingCamp, trainingCampLevel) == 0) m += '<TD>&nbsp;training camp '+ trainingCampLevel +'</td>';
        var availableTalons = t.getItem(kWindTroopItem);
        if (availableTalons < bansheeTalonsQty) m += '<TD>&nbsp;Talons '+ (bansheeTalonsQty - availableTalons) +'</td>';
        if (t.getRemainingQueue(1, kUnits) == 0) m+= '<td>&nbsp;training queue</td>';
        if (m.length == 0) {
            ret.trainable = true;
            ret.msg = troopQty +' '+ kWindTroop +'s eat ' + upkeep + ' food';
        } else {
            ret.trainable = false;
            ret.msg = n + m + '</tr></table>';
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
        var n = '<TABLE><TR><TD>Need: </td>';
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
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {buildable:false, msg:[]};
        var buildCap = t.getBuildingCap(cityIdx, buildingType);
    
        // If the building is capped, are we about to exceed the limit?
        if (buildingLevel >= buildCap) m += '<TD>&nbsp; Cap limit '+ buildCap +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (stone - city.resources.stone) +'</td>';

        if (m.length == 0) {
            ret.buildable = true;
            ret.msg = 'Building:' + kLevel1 + ' ' + (buildingLevel + 1) + ' ' + buildingType;
        }
        else {
            ret.buildable = false;
            ret.msg = n + m + '</tr></table>';
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
        var n = '<TABLE><TR><TD>Need: </td>';
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
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {buildable:false, msg:[]};
        var buildCap = t.getBuildingCap(cityIdx, buildingType);
    
        // If the building is capped, are we about to exceed the limit?
        if (buildingLevel >= buildCap) m += '<TD>&nbsp; Cap limit '+ buildCap +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;wood '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (stone - city.resources.stone) +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';

        if (m.length == 0) {
            ret.buildable = true;
            ret.msg = 'Building:' + kLevel1 + ' ' + (buildingLevel + 1) + ' ' + buildingType;
        }
        else {
            ret.buildable = false;
            ret.msg = n + m + '</tr></table>';
        }
        
        return ret;  
  },

    // Check building requirements
    // Calls checkStandardReqs() or checkGoldReqs()
    // returns an object containing a Boolean value to indicate whether or not building shoudl proceed
    // and a message
    checkBuildReqs : function(cityIdx, buildingType){
        var t = Tabs.Jobs;
    
        switch (buildingType) {
            case kHome:             return t.checkStandardReqs(cityIdx, buildingType, 50, 300, 150, 200);
            case kGarrison:         return t.checkStandardReqs(cityIdx, buildingType, 250, 1200, 500, 1500);
            case kScienceCenter:    return t.checkStandardReqs(cityIdx, buildingType, 120, 1250, 200, 1500);
            case kMetalsmith:       return t.checkStandardReqs(cityIdx, buildingType, 125, 1000, 1200, 600);
            case kOfficerQuarter:   return t.checkStandardReqs(cityIdx, buildingType, 400, 2500, 700, 1200);
            case kMusterPoint:      return t.checkStandardReqs(cityIdx, buildingType, 100, 600, 250, 2000);
            case kRookery:          return t.checkGoldReqs(cityIdx, buildingType, 1200, 2000, 1000, 800, 800);
            case kStorageVault:     return t.checkStandardReqs(cityIdx, buildingType, 100, 1500, 300, 1000);
            case kTheater:          return t.checkStandardReqs(cityIdx, buildingType, 300, 2000, 400, 1000);
            case kSentinel:         return t.checkStandardReqs(cityIdx, buildingType, 150, 1000, 300, 3000);
            case kFactory:          return t.checkStandardReqs(cityIdx, buildingType, 150, 1500, 1500, 500);
            case kFortress:         return t.checkStandardReqs(cityIdx, buildingType, 200, 300, 100, 2500);
            case kDragonKeep:       return t.checkGoldReqs(cityIdx, buildingType, 400, 2500, 700, 1200, 1500);
            case kWall:             return t.checkStandardReqs(cityIdx, buildingType, 3000, 1500, 500, 10000);
            case kMine:             return t.checkStandardReqs(cityIdx, buildingType, 210, 600, 200, 500);
            case kFarm:             return t.checkStandardReqs(cityIdx, buildingType, 50, 300, 150, 200);
            case kLumbermill:       return t.checkStandardReqs(cityIdx, buildingType, 100, 100, 300, 250);
            case kQuarry:           return t.checkStandardReqs(cityIdx, buildingType, 180, 500, 400, 150);
            case kTrainingCamp:     return t.checkGoldReqs(cityIdx, buildingType, 350, 1300, 600, 1900, 975);
            case kSilo:             return t.checkStandardReqs(cityIdx, buildingType, 250, 1200, 500, 1500);
        }  
    },

    checkAgricultureReqs : function() {
        var t = Tabs.Jobs;
        var researchType = 'Agriculture';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 500 * Math.pow(2,researchLevel +1);
        var food = 250 * Math.pow(2,researchLevel + 1);
        var metal = 100 * Math.pow(2,researchLevel + 1);
        var farmLevel = researchLevel + 1;
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            food = seedReqs.level[researchLevel + 1].resources['food'];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            metal = seedReqs.level[researchLevel + 1].resources['ore'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
            farmLevel = seedReqs.level[researchLevel + 1].buildings['Farm'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (t.getBuildingLevel(0, 'Farm', farmLevel) == 0) m += '<TD>&nbsp;Farm '+ farmLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret; 
    },
  
    checkWoodcraftReqs : function() {
        var t = Tabs.Jobs;
        var researchType = 'Woodcraft';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 1200 * Math.pow(2,researchLevel +1);
        var lumber = 500 * Math.pow(2,researchLevel + 1);
        var metal = 100 * Math.pow(2,researchLevel + 1);
        var millLevel = researchLevel + 1;
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            lumber = seedReqs.level[researchLevel + 1].resources['wood'];
            metal = seedReqs.level[researchLevel + 1].resources['ore'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
            millLevel = seedReqs.level[researchLevel + 1].buildings['Lumbermill'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;lumber '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (t.getBuildingLevel(0, 'Lumbermill', millLevel) == 0) m += '<TD>&nbsp;Lumbermill '+ millLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret; 
    },
  
    checkMasonryReqs : function() {
        var t = Tabs.Jobs;
        var researchType = 'Masonry';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 1500 * Math.pow(2,researchLevel +1);
        var stone = 500 * Math.pow(2,researchLevel + 1);
        var metal = 200 * Math.pow(2,researchLevel + 1);
        var quarryLevel = researchLevel + 1;
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            stone = seedReqs.level[researchLevel + 1].resources['stone'];
            metal = seedReqs.level[researchLevel + 1].resources['ore'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
            quarryLevel = seedReqs.level[researchLevel + 1].buildings['Quarry'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (stone - city.resources.stone) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (t.getBuildingLevel(0, 'Quarry', quarryLevel) == 0) m += '<TD>&nbsp;Quarry '+ quarryLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret;
    },
  
    checkMiningReqs : function() {
        var t = Tabs.Jobs;
        var researchType = 'Mining';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 2000 * Math.pow(2,researchLevel +1);
        var metal = 800 * Math.pow(2,researchLevel + 1);
        var mineLevel = researchLevel + 1;
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            metal = seedReqs.level[researchLevel + 1].resources['ore'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
            mineLevel = seedReqs.level[researchLevel + 1].buildings['Mine'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (t.getBuildingLevel(0, 'Mine', mineLevel) == 0) m += '<TD>&nbsp;Mine '+ mineLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret;
    },
  
    checkClairvoyanceReqs : function() {
        var t = Tabs.Jobs;
        var researchType = 'Clairvoyance';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 2000 * Math.pow(2,researchLevel + 1);
        var food = 2400 * Math.pow(2,researchLevel + 1);
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            food = seedReqs.level[researchLevel + 1].resources['food'];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;wood '+ (gold - city.resources.gold) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret; 
    },

    checkRapidDeploymentReqs : function() {
        var t = Tabs.Jobs;
        var researchType = 'RapidDeployment';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 600 * Math.pow(2,researchLevel + 1);
        var food = 3000 * Math.pow(2,researchLevel + 1);
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            food = seedReqs.level[researchLevel + 1].resources['food'];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;wood '+ (gold - city.resources.gold) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret; 
    },
  
    checkBallisticsReqs : function() {
        var t = Tabs.Jobs;
        var researchType = 'Ballistics';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 5000 * Math.pow(2,researchLevel +1);
        var stone = 500 * Math.pow(2,researchLevel + 1);
        var metal = 600 * Math.pow(2,researchLevel + 1);
        var lumber = 800 * Math.pow(2,researchLevel + 1);
        var woodcraftLevel = 4;
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            stone = seedReqs.level[researchLevel + 1].resources['stone'];
            metal = seedReqs.level[researchLevel + 1].resources['ore'];
            lumber = seedReqs.level[researchLevel + 1].resources['wood'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
            woodcraftLevel = seedReqs.level[researchLevel + 1].research['Woodcraft'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (stone - city.resources.stone) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;lumber '+ (lumber - city.resources.wood) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (t.getCurrentResearchLevel('Woodcraft') < woodcraftLevel) m += '<TD>&nbsp;Woodcraft '+ woodcraftLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret;
    },
  
    checkMetallurgyReqs : function() {
        // alloys, science center, metalsmith, garrison, metals, food, lumber, stone, gold
        var t = Tabs.Jobs;
        var researchType = 'Metallurgy';
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
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            food = seedReqs.level[researchLevel + 1].resources['food'];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            stone = seedReqs.level[researchLevel + 1].resources['stone'];
            metal = seedReqs.level[researchLevel + 1].resources['ore'];
            lumber = seedReqs.level[researchLevel + 1].resources['wood'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
            metalsmithLevel = seedReqs.level[researchLevel + 1].buildings['Metalsmith'];
            garrisonLevel = seedReqs.level[researchLevel + 1].buildings['Garrison'];
            miningLevel = seedReqs.level[researchLevel + 1].research['Mining'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (stone - city.resources.stone) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;lumber '+ (lumber - city.resources.wood) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (t.getBuildingLevel(0, 'Metalsmith', metalsmithLevel) == 0) m += '<TD>&nbsp;Metalsmith '+ metalsmithLevel +'</td>';
        if (t.getBuildingLevel(0, 'Garrison', garrisonLevel) == 0) m += '<TD>&nbsp;Garrison '+ garrisonLevel +'</td>';
        if (t.getCurrentResearchLevel('Mining') < miningLevel) m += '<TD>&nbsp;Alloys '+ miningLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret;
    },
  
    checkMedicineReqs : function() {
        var t = Tabs.Jobs;
        var researchType = 'Medicine';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 3600 * Math.pow(2,researchLevel +1);
        var food = 1500 * Math.pow(2,researchLevel + 1);
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            food = seedReqs.level[researchLevel + 1].resources['food'];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret; 
    },
  
    checkDragonryReqs : function() {
        // science center, rookery, gold, food, metals
        var t = Tabs.Jobs;
        var researchType = 'Dragonry';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 5000 * Math.pow(2,researchLevel +1);
        var food = 2500 * Math.pow(2,researchLevel + 1);
        var metal = 1000 * Math.pow(2,researchLevel + 1);
        var scienceCenterLevel = researchLevel; 
        var rookeryLevel = researchLevel;         
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            food = seedReqs.level[researchLevel + 1].resources['food'];
            metal = seedReqs.level[researchLevel + 1].resources['ore'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
            rookeryLevel = seedReqs.level[researchLevel + 1].buildings['Rookery'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (t.getBuildingLevel(0, 'Rookery', rookeryLevel) == 0) m += '<TD>&nbsp;Rookery '+ rookeryLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret; 
    },
  
    checkLevitationReqs : function() {
        // woodcraft, science center, gold, lumber, metals
        var t = Tabs.Jobs;
        var researchType = 'Levitation';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 5000 * Math.pow(2,researchLevel +1);
        var lumber = 2000 * Math.pow(2,researchLevel + 1);
        var metal = 2000 * Math.pow(2,researchLevel + 1);
        var scienceCenterLevel = researchLevel + 1; 
        var woodcraftLevel = researchLevel + 1;         
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            lumber = seedReqs.level[researchLevel + 1].resources['wood'];
            metal = seedReqs.level[researchLevel + 1].resources['ore'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
            woodcraftLevel = seedReqs.level[researchLevel + 1].research['Woodcraft'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;lumber '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (t.getCurrentResearchLevel('Woodcraft') < woodcraftLevel) m += '<TD>&nbsp;Woodcraft '+ woodcraftLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret; 
    },
  
    checkMercantilismReqs : function() {
        // levitation, science center, factory, gold, food, lumber, metals, stone
        var t = Tabs.Jobs;
        var researchType = 'Mercantilism';
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
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            food = seedReqs.level[researchLevel + 1].resources['food'];
            lumber = seedReqs.level[researchLevel + 1].resources['wood'];
            metal = seedReqs.level[researchLevel + 1].resources['ore'];
            stone = seedReqs.level[researchLevel + 1].resources['stone'];
            scienceCenterLevel = seedReqs.level[researchLevel + 1].buildings['ScienceCenter'];
            factoryLevel = seedReqs.level[researchLevel + 1].buildings['Factory'];
            levitationLevel = seedReqs.level[researchLevel + 1].research['Levitation'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (city.resources.wood < lumber) m += '<TD>&nbsp;lumber '+ (lumber - city.resources.wood) +'</td>';
        if (city.resources.ore < metal) m += '<TD>&nbsp;metal '+ (metal - city.resources.ore) +'</td>';
        if (city.resources.stone < stone) m += '<TD>&nbsp;stone '+ (metal - city.resources.stone) +'</td>';
        if (t.getBuildingLevel(0, 'ScienceCenter', scienceCenterLevel) == 0) m += '<TD>&nbsp;Science Center '+ scienceCenterLevel +'</td>';
        if (t.getBuildingLevel(0, 'Factory', factoryLevel) == 0) m += '<TD>&nbsp;Factory '+ factoryLevel +'</td>';
        if (t.getCurrentResearchLevel('Levitation') < levitationLevel) m += '<TD>&nbsp;Levitation '+ levitationLevel +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret;
    },
  
    checkAerialCombatReqs : function() {
        // dragonry, dragons keep, gold, food, dragon armor (items)
        var t = Tabs.Jobs;
        var researchType = 'AerialCombat';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 3500 * Math.pow(2,researchLevel +1);
        var food = 2500 * Math.pow(2,researchLevel +1);
        var dragonskeepLevel = 8; 
        var dragonryLevel = 8;
        var bodyArmor = 1;
        var clawGuards = 1;
        var dragonHelmet = 1;
        var tailGuard = 1;
        // Check for all 4 pieces of dragon armor ...         
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.cities[0];

        try {
            var seedReqs = Seed.requirements.research[researchType];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            food = seedReqs.level[researchLevel + 1].resources['food'];
            dragonskeepLevel = seedReqs.level[researchLevel + 1].buildings['DragonsKeep'];
            dragonryLevel = seedReqs.level[researchLevel + 1].research['Dragonry'];
            bodyArmor - seedReqs.level[researchLevel + 1].items['GreatDragonBodyArmor'];
            clawGuards - seedReqs.level[researchLevel + 1].items['GreatDragonClawGuards'];
            dragonHelmet - seedReqs.level[researchLevel + 1].items['GreatDragonHelmet'];
            tailGuard - seedReqs.level[researchLevel + 1].items['GreatDragonTailGuard'];
        }
        catch(e){
            actionLog('Building: ' + e.msg + ' Manifest not available, using defaults');
        }

        var ret = {researchable:false, msg:[]};
        var researchCap = t.getResearchCap(researchType);
    
        // If the building is capped, are we about to exceed the limit?
        if (researchLevel >= researchCap) m += '<TD>&nbsp; Cap limit '+ researchCap +'</td>';
        if (city.resources.gold < gold) m += '<TD>&nbsp;gold '+ (gold - city.resources.gold) +'</td>';
        if (city.resources.food < food) m += '<TD>&nbsp;food '+ (food - city.resources.food) +'</td>';
        if (t.getBuildingLevel(0, 'DragonsKeep', dragonskeepLevel) == 0) m += '<TD>&nbsp;Dragons Keep '+ dragonskeepLevel +'</td>';
        if (t.getCurrentResearchLevel('Dragonry') < dragonryLevel) m += '<TD>&nbsp;Dragonry '+ dragonryLevel +'</td>';
        if (t.getItem(kGDBodyArmor) == 0) m += '<TD>&nbsp;Body Armor ' + bodyArmor +'</td>';
        if (t.getItem(kGDClawGuards) == 0) m += '<TD>&nbsp;Claw Guards ' + bodyArmor +'</td>';
        if (t.getItem(kGDHelmet) == 0) m += '<TD>&nbsp;Helmet ' + bodyArmor +'</td>';
        if (t.getItem(kGDTailGuard) == 0) m += '<TD>&nbsp;Tail Guard ' + bodyArmor +'</td>';
        if (m.length == 0) {
            ret.researchable = true;
            ret.msg = 'Researching:' + kLevel1 + ' ' + (researchLevel + 1) + ' ' + researchType;
        }
        else {
            ret.researchable = false;
            ret.msg = n + m + '</tr></table>';
        }
        return ret;
    },
  
    checkResearchReqs : function (researchType){
        var t = Tabs.Jobs;
    
        switch(researchType) {
            case 'Agriculture':     return t.checkAgricultureReqs();
            case 'Woodcraft':       return t.checkWoodcraftReqs();
            case 'Masonry':         return t.checkMasonryReqs();
            case 'Mining':          return t.checkMiningReqs();
            case 'Clairvoyance':    return t.checkClairvoyanceReqs();
            case 'RapidDeployment': return t.checkRapidDeploymentReqs();
            case 'Ballistics':      return t.checkBallisticsReqs();
            case 'Metallurgy':      return t.checkMetallurgyReqs();     
            case 'Medicine':        return t.checkMedicineReqs();
            case 'Dragonry':        return t.checkDragonryReqs();
            case 'Levitation':      return t.checkLevitationReqs();
            case 'Mercantilism':    return t.checkMercantilismReqs();
            case 'AerialCombat':    return t.checkAerialCombatReqs();
        }
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
    trainTick : function (ic){
        var t = Tabs.Jobs;

        if (!Data.options.autoTrain.enabled)
            return;
      
        if (ic == undefined)
            ic = 0;	
            
        //Seed.notifyOnUpdate(function(){ 
            if (ic == Seed.cities.length) return;

            // The length here is the number of troop types it is possible to train
            switch (ic) {
                case 0: troopsLength = t.capitolTroops.length; break;
                case 1: troopsLength = t.outpost1Troops.length; break;
                case 2: troopsLength = t.outpost2Troops.length; break;
                case 3: troopsLength = t.outpost3Troops.length; break;
				case 4: troopsLength = t.outpost4Troops.length; break;
				break;		
            }
            
            // Only check the job queue if we are in short queue mode
            if (t.selectedQ == kMinHousing){
                if (getTrainJob (ic) == null) 
                    t.attemptTrainShortQ(ic, 0, troopsLength);
                else 
                    ic = ic + 1;
            }
            else 
                t.attemptTrainLongQ(ic, 0, troopsLength);
        //}); 
    },

    // New approach 07072011b
    // Calculate the completion time by examining the job record for any job running
    // While auto-build is enabled, this function is called on a 4 second timer
    // It resets the timer to 20 seconds if doBuild() has an error and fetches the Seed
    // to get updated information
    // It will turn off auto-build if the error count exceeds three
    buildErrorCount      : 0,
    doBuildRecheck  : false,
    buildTick : function (){
        var t = Tabs.Jobs;

        if (!Data.options.autoBuild.enabled)
            return;
      
        // Iterate over the cities for buildings in each
        //Seed.notifyOnUpdate(function(){   
            for (var ic=0; ic<Seed.cities.length; ic++ ){
                var city = Seed.cities[ic];
                var cityId = city.id;
                var bJob = getBuildJob (ic);
                
                if (bJob == null){     // city not currently building
                
                    // Yes, is there a job in persistent data in in this city?
                    for (var i=0; i<Data.options.tJobs.length; i++) {
                        if (Data.options.tJobs[i].city_id == cityId) {
                            // We check three different modes of completion:
                            // 1. the done flag
                            // 2. the duration
                            // 3. the run_at + duration compared to serverTime()
                            if (Data.options.tJobs[i].done ||
                                !Data.options.tJobs[i].duration ||
                                Data.options.tJobs[i].run_at + Data.options.tJobs[i].duration > serverTime()) {
                                
                                Data.options.tJobs.splice(i,1);
                                Seed.fetchSeed ();
                                clearTimeout (Data.options.buildTimer);
                                Data.options.buildTimer = setInterval (t.buildTick, 4000);
                                return;
                            }
                        }
                    }  
                
                    // TBD: sort the array by building type and building level
                    var bl = []; // Concatenated array of buildings
                    var bldg = [];
                    for (var p in Data.options.autoBuild.buildingEnable[ic]){
                        // Is this building type enabled for autobuild?
                        if (Data.options.autoBuild.buildingEnable[ic][p]){
                            bldg = Buildings.getList (ic, p);
                            bldg.sort (function(a,b){return a.level-b.level});
                            bl = bl.concat (bldg);
                        }
                    }
                    bl.sort (function(a,b){return a.level-b.level});
                    
                    // Change: we want to iterate over each buildings comparing the level to the cap. If the cap has not
                    // been reached, call doBuild
                    var bBuilt = false, bCapped = false, bType = '', len = bl.length;
                
                    for (var i=0; i<len; i++) {
                        var cap = t.getBuildingCap (ic, bl[i].type);
                        if (bl[i].level < cap) {
                            // Change 07122011a: Check requirements, skip if they are not met
                            // Caps are check in the requirements
                            var ret = t.checkBuildReqs(ic, bl[i].type);
                            if (t.contentType == 2) t.dispFeedback (ret.msg);
                            if (ret.buildable) {
                                t.doBuild (bl[i], city);
                                bBuilt = true;
                                Data.options.tJobs.push(bl[i]);
                                bCapped = false;
                                break;
                            }
                            else {
                                // Error condition prevents building, try again later
                                t.doBuildRecheck = true;
                                break;
                            }
                        }
                        else {
                            bCapped = true;
                            bType = bl[i].type;
                        }
                    }
                
                    if (bCapped) {
                        // This only displays the first capped building
                        // To be consistent with research, we will need to sort the list, find out when the type 
                        // changes and calculate if all the buildings are capped
                        if (t.contentType == 2) t.dispFeedback ("Building capped");
                        var bldgIdx = t.getBuildingIndex (ic, bType);
                        document.getElementById ('pbbldcap_' + ic + '_' + bldgIdx).style.backgroundColor = "red";
                    }
                } 
                else {
                    // We have a job running
                    // Look at the job record
                    if (bJob) {
                        var jFound = false;
                        // Look for the job in our persistent data
                        for (var i=0; i<Data.options.tJobs.length; i++) {
                            if (bJob.city_building_id == Data.options.tJobs[i].city_building_id) {
                                jFound = true;
                            }   
                        }
                        // If the job is not in persistent data, put it there
                        if (!jFound) {
                            Data.options.tJobs.push(bJob);
                            actionLog("Putting build job in persistent data");
                        }
                        else {
                            // Keep a consistent display                
                            var cityType = (city.type == "Capital") ? 'Capitol' : city.type;
                            var bType = getBuildingById (ic, bJob.city_building_id);
                            var msg = kBuildingLevel + (bJob.level) +' '+ bType + kAt + cityType;
                            if (t.contentType == 2) t.dispFeedback (msg);
                        }
                    }
                }
                if (t.doBuildRecheck) {
                    Seed.fetchSeed();
                    t.doBuildRecheck = false;
                    clearTimeout(Data.options.buildTimer);
                    Data.options.buildTimer = setInterval (t.buildTick, 20000);
                    if (t.contentType == 2) t.dispFeedback ("Completion errors: waiting 20 seconds to try again"); 
                    return;              
                }      
            } 
        //}); 
    },

    // Research heartbeat
    resErrorCount : 0,
    doResRecheck  : false,
    researchTick : function (){

        var t = Tabs.Jobs;
        if (!Data.options.autoResearch.enabled)
            return;
//      Data.options.rJobs.length = 0;
//      return;
      
        //Seed.notifyOnUpdate(function(){
            var nothingToDo = true;
            var rJob = getResearchJob (0);
            var city = Seed.cities[0];
            var cityId = city.id;
            
            if (rJob == null){     // no research being done yet
        
                // Is there a research job in persistent data?
                for (var i=0; i<Data.options.rJobs.length; i++) {
                    if (Data.options.rJobs[i]) {
                        if (Data.options.rJobs[i].done ||
                            !Data.options.rJobs[i].duration ||
                            Data.options.rJobs[i].run_at + Data.options.rJobs[i].duration > serverTime()) {
                            // Yes, has the job completed?
                            Data.options.rJobs.splice(i,1);
                            Seed.fetchSeed();
                            clearTimeout (Data.options.researchTimer);
                            Data.options.researchTimer = setInterval (t.researchTick, 5000);
                            return;
                        }
                    }
                }
            
                for (var p in Data.options.autoResearch.researchEnable[0]) {
                    if (Data.options.autoResearch.researchEnable[0][p] == true){
                
                        var researchType = '';
                        for (var rType in t.capitolResearch) 
                            if (p == t.capitolResearch[rType]) {
                                researchType = rType;
                                break;
                            }
                            
                        var level = t.getCurrentResearchLevel (researchType);
                        var cap = t.getResearchCap (researchType);
                        var rBuilt = false;
                        var rCapped = false;
                        if (level < cap) {
                            var ret = t.checkResearchReqs (researchType);
                            if (t.contentType == 3) t.dispFeedback (ret.msg);
                            if (ret.researchable) {
                                t.doResearch(researchType, level);
                                rBuilt = true;
                                Data.options.rJobs.push(rJob);
                                rCapped = false;
                                break;
                            }
                            else {
                                t.doResRecheck = true;
                                break;
                            }
                        }
                        else {
                            // We are capped
                            rCapped = true;
                        }
                    }
                    if (rCapped) {
                        if (t.contentType == 3) t.dispFeedback ("Research capped");
                        var resIdx = t.getResearchIndex (researchType);
                        document.getElementById('pbrescap_' + 0 + '_' + resIdx).style.backgroundColor = "red";
                    }
                }
            } 
            else {
                // We have a job running
                // Look at the record
                if (rJob) {
                    var jFound = false;
                    // Look for the job in persistent data
                    for (var i=0; i<Data.options.rJobs.length; i++) {
                        // Check the rJob structure for a field called city_research_id or some such (like the building)
                        // Otherwise, double-check that the ids match
                        if (rJob.id == Data.options.rJobs[i].id) {
                            jFound = true;
                        }
                    }
                    // If the job is not in persistent data, put it there
                    if (!jFound) {
                        Data.options.rJobs.push(rJob);
                        actionLog("Putting research job in persistent data");
                    }
                }
            }
            if (t.doResRecheck) {
                Seed.fetchSeed();
                t.doResRecheck = false;
                clearTimeout(Data.options.researchTimer);
                Data.options.researchTimer = setInterval (t.researchTick, 20000);
                if (t.contentType == 3) t.dispFeedback ("Completion errors: waiting 20 seconds to try again");               
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
        var i = 0;
		for (i=0; i<Seed.cities.length; i++){
            if (getTrainJob (i)) {
                doRecheck = true;
            }
            else {
                // Get the troop types and quantities to build
                for (var j=0; j<Data.options.autoTrain.city[i].troopType.length; j++){
                    var troopType = '', troopQty = 0, cap = 0;
                    switch (i) {
                        case 1:
                            troopType = t.outpost1Troops[j];
                            troopQty = Data.options.autoTrain.city[i].troopType[j];
                            cap = t.getTroopCap(troopType, troopQty);
                            try {
                                if (cap) {
                                    troopQty = 0;
                                    if (t.contentType == 1) t.dispFeedback("Troops Capped");
                                    document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "red";
                                }
                                else if (document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor == "red")
                                    document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "white";
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
                                    if (t.contentType == 1) t.dispFeedback("Troops Capped");
                                    document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "red";
                                }
                                else if (document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor == "red")
                                    document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "white";
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
                                    if (t.contentType == 1) t.dispFeedback("Troops Capped");
                                    document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "red";
                                }
                                else if (document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor == "red")
                                    document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "white";
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
                                    if (t.contentType == 1) t.dispFeedback("Troops Capped");
                                    document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "red";
                                }
                                else if (document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor == "red")
                                    document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "white";
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
                                    if (t.contentType == 1) t.dispFeedback("Troops Capped");
                                    document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "red";
                                }
                                else if (document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor == "red")
                                    document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "white";
                            }
                            catch (e) {
                            }
                            break;
                    }
                    if (troopQty > 0) {
                        var ret = t.checkTrainReqs(troopType, troopQty, i, j, troopsLength);
                        if (t.contentType == 1) t.dispFeedback (ret.msg);
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
			if (Data.options.verboseLog.enabled)
				actionLog('Tabs.Job.Train doRecheck');
            Seed.fetchSeed();
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
        var i = 0;
		for (i=0; i<Seed.cities.length; i++){
            // Get the troop types and quantities to build
            for (var j=0; j<Data.options.autoTrain.city[i].troopType.length; j++){
                var troopType = '';
                var troopQty = 0;
                var cap = null;
                switch (i) {
                    case 1:
                        troopType = t.outpost1Troops[j];
                        troopQty = Data.options.autoTrain.city[i].troopType[j];
                        cap = t.getTroopCap(troopType, troopQty);
                        try {
                            if (cap) {
                                troopQty = 0;
                                if (t.contentType == 1) t.dispFeedback("Troops Capped");
                                document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "red";
                            }
                            else if (document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor == "red")
                                document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "white";
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
                                if (t.contentType == 1) t.dispFeedback("Troops Capped");
                                document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "red";
                            }
                            else if (document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor == "red")
                                document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "white";
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
                                if (t.contentType == 1) t.dispFeedback("Troops Capped");
                                document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "red";
                            }
                            else if (document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor == "red")
                                document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "white";
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
                                if (t.contentType == 1) t.dispFeedback("Troops Capped");
                                document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "red";
                            }
                            else if (document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor == "red")
                                document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "white";
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
                                if (t.contentType == 1) t.dispFeedback("Troops Capped");
                                document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "red";
                            }
                            else if (document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor == "red")
                                document.getElementById('pbtrnTrp_' + i + '_' + j).style.backgroundColor = "white";
                            }
                        catch (e) {
                        }
                        break;
                }
                if (troopQty > 0) {
                    var ret = t.checkTrainReqs(troopType, troopQty, i, j, troopsLength);
                    if (t.contentType == 1) t.dispFeedback (ret.msg);
                    if (ret.trainable) {
                        var d = {tType:troopType, tQty:troopQty, cityIdx:i, troopIdx:j, tLen:troopsLength};
                        t.trainJobs.push (d);
                        //t.trainTime = setTimeout ("t.doTrain(troopType, troopQty, i, j, troopsLength)", 3000);
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
           // Data.options.trainTimer = setTimeout (function() {t.trainTick(i)}, 3000);
        }
        // See if we have space in the queue before we try to run the jobs
        var qLen = 0;
        for (var i=0; i<Seed.cities.length; i++) {
            qLen += t.getRemainingQueue(i, kUnits);
        }
        if (qLen)
            t.runJobs();   		
	},

    // Algorithm change
    // Examine the training queue for the city, if there is space, run the job
    // Possible side effects are implied prioritization based on queue availability
    // and speed of training
    runJobs : function(){
        var t = Tabs.Jobs;
        if (t.trainJobs.length > 0) {
        
            // Create a set of training jobs in each city
            for (var i=0; i<Seed.cities.length; i++){
                var jList = []; // list of troops for this city
                
                // Iterate the training list looking for all the troops from this city
                // Could be none up to every troop type available
                // Might be a problem if the user selects all the troops but doesn't have
                // enough garrisons/training camps to do them all at once
                var j=0;
                while (j < t.trainJobs.length) {
                    if (t.trainJobs[j].cityIdx == i)
                        jList[j] = t.trainJobs[j];
                    ++j;
                }
   
                // Get the remaining queue length for this city        
                var qLen = t.getRemainingQueue(i, kUnits);
               
                // Are there enough queue slots for the jobs?
                var len = jList.length; // length is modified inside the loop
                if (qLen >= len)
                    // Yes, do the job
                    for (var j=0; j<len; j++) {
                    
                        var tJob = jList.shift();
                        t.doTrain (tJob.tType, tJob.tQty, i);                   
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
    // Calls Ajax.troopTraining with city troop type, qty, city id, and a function for the rslt
    // The rlst function fetches the city, does a status update through statTick
    // If the rslt is ok, we set the Train Tab errorCount back to zero, log the training, increment the count (why?)
    // and attempt to train more troops - this seems like it should come from trainTick() instead being called directly here
    // If the rslt is not ok, we refetch the city info, log the error, increment the Train Tab errorCount (if we have more than
    // three errors we disable training and show the feedback) and display the error message, reset the training time for 20 seconds
    // but do not disable training
	doTrain : function (troopType, troopQty, ic){
		var t = Tabs.Jobs;
		var city = Seed.cities[ic];
		var msg = kTraining1 + troopQty +' '+ troopType + kAt + city.type;
		//t.dispFeedback (msg);

		Ajax.troopTraining (troopType, troopQty, city.id, function (rslt){
			if (rslt.ok){
				t.trainErrorCount = 0;
				actionLog (msg);
				Data.options.trainTimer = setInterval(function() {t.trainTick(0) }, 3000);
			} 
            else {
				//Seed.fetchSeed();
				actionLog (kTrainError + rslt.errmsg);
				// The queue is frequently full, but we could be getting server errors (500) too
				// Wait a couple of minutes
				if (++t.trainErrorCount > 5){
					if (t.contentType == 1) t.dispFeedback (kDisablingAutoTrain);
					t.setTrainEnable (false);
					t.trainErrorCount = 0;
				}
				else {
				    if (t.contentType == 1) t.dispFeedback (kTrainError + rslt.errmsg);
				    Data.options.trainTimer = setInterval(function() {t.trainTick(ic) }, 180000);
				}
			}
            // Get the troops being built so the will be displayed
            Seed.fetchCity (city.id);
		});
	},

    // Upgrade the building
    // Sets doBuildRecheck = true if the Ajax call returns an error
    // This forces a Seed fetch and resets the buildTick timer to 20 seconds
    // to allow the server enough time to return valid data (we hope)
    // If the Ajax call returns with no errors, the buildErrorCount is reset to zero
    doBuild : function (building, city){
        var t = Tabs.Jobs;
        var cityType = (city.type == "Capital") ? 'Capitol' : city.type;
        var msg = kBuildingLevel + (building.level+1) +' '+ building.type + kAt + cityType;
    
        if (t.contentType == 2) t.dispFeedback (msg);
    
        Ajax.buildingUpgrade (city.id, building.id, function (rslt){
            //logit ('BUILD RESULT: '+ inspect (rslt, 7, 1)); 
            if (rslt.ok){
                t.buildErrorCount = 0;
                actionLog (msg);
                //Data.options.buildTimer = setTimeout (t.buildTick, 8000);
                return;
            } 
            else {
                Seed.fetchSeed();
                actionLog (building.type + ': ' + rslt.errmsg);
                if (++t.buildErrorCount > 3){
                    if (t.contentType == 2) t.dispFeedback (kTooManyBuildErrs);
                    t.setBuildEnable (false);
                    t.buildErrorCount = 0;
                    return;
                }
                if (t.contentType == 2) t.dispFeedback (building.type + ': ' + rslt.errmsg);
                //Data.options.buildTimer = setTimeout (t.buildTick, 20000);
                t.doBuildRecheck = true;
                return;
            }
        });
    },

    doResearch : function (researchType, researchLevel){
        var t = Tabs.Jobs;
        var city = Seed.cities[0];
        var msg = kResearch +' '+ kLevel1 +' ' +(researchLevel+1) +' '+ t.resUITranslate (researchType);
        if (t.contentType == 3) t.dispFeedback (msg);
        actionLog('Research started: '+ researchType +' ' +researchLevel);
        
        Ajax.researchStart (city.id, researchType, function (rslt){
            //logit ('RESEARCH RESULT: '+ inspect (rslt, 7, 1));       
            if (rslt.ok){
                t.resErrorCount = 0;
                actionLog (msg);
                return;
            } 
            else {
                Seed.fetchSeed();
                actionLog (kResearchErr+ rslt.errmsg);
                if (++t.resErrorCount > 3){
                    if (t.contentType == 3) t.dispFeedback (kTooManyResearchErrs);
                    t.setResearchEnable (false);
                    t.resErrorCount = 0;
                    return;
                }
                if (t.contentType == 3) t.dispFeedback (kResearchErr + rslt.errmsg);
                t.doResRecheck = true;
                return;
            }
        });
    },

    // train sub tab
    tabTrain : function(){
        var t = Tabs.Jobs;
        // Create troop table for each city
        var el = [], m = '';
	   
        for (var c=0; c<Seed.cities.length; c++){
            switch (c) {
                case 0: troopTypes = t.capitolTroops; break;
                case 1: troopTypes = t.outpost1Troops; break;
                case 2: troopTypes = t.outpost2Troops; break;		
                case 3: troopTypes = t.outpost3Troops; break;	
				case 4: troopTypes = t.outpost4Troops; break;				
            }
           
            var city = Seed.cities[c];
            m += '<DIV class=' + rndStyle['classPrefix'] + 'Subtitle>'+ city.name +'</div><TABLE class=' + rndStyle['classPrefix'] + 'Tab><TR valign=top><TD width=150><TABLE class=' + rndStyle['classPrefix'] + 'Tab>';
            for (tt=0; tt<troopTypes.length; tt++){
                // Use less room in the table layout
                if (tt%3 == 0) m += '<TR>';
                m += '<TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ Names.troops.byName[troopTypes[tt]][2] +':</td>';
                var num = Data.options.autoTrain.city[c].troopType[tt];
                if (!num || isNaN(num)) num = 0;
                m += '<TD><INPUT type=text id=pbtrnTrp_'+ c +'_'+ tt +' maxlength=6 size=2 value="'+ num +'"\></td>';
                if (tt>0 && (tt+1)%3 == 0) m += '</tr>';
                el.push('pbtrnTrp_'+ c +'_'+ tt);
            }
            m += ((tt+1)%3 == 0) ? '</tr></table></td></tr></table>' : '</table></td></tr></table>';
        }    
        m += '</div>';
        document.getElementById('pbtrnConfig').innerHTML = m;

        // Hilite the sub-tabs correctly
        document.getElementById('pbttConfigTrain').style.backgroundColor = BUTTON_BGCOLOR; 
        document.getElementById('pbttConfigTrain').style.color = "white";

        t.trainContentType = 0;
        document.getElementById('pbttTrain').style.backgroundColor = "#eed"; 
        document.getElementById('pbttTrain').style.color = "black";

        // Add event listeners for troop quantities 
        for (var i=0; i<el.length; i++)
        document.getElementById(el[i]).addEventListener('change', troopsChanged, false);
 
        // Update troops on change
        function troopsChanged (e){
            var args = e.target.id.split('_');
            var x = parseIntZero(e.target.value);
            var lvl = getMusterPointLevel(0);
            var maxLvl = lvl * 10000;
            maxLvl = (lvl == 11) ? 120000 : maxLvl;
            if (isNaN(x) || x<0 || x>maxLvl){
                e.target.style.backgroundColor = 'red';
                dispError (kInvalidNumberTroops);
            } 
            else {
                e.target.value = x;
                Data.options.autoTrain.city[args[1]].troopType[args[2]] = x;
                e.target.style.backgroundColor = '';
            }
        }
    }, 
    
    // config sub tab
    tabConfigTrain : function(){
        var t = Tabs.Jobs;
    
        // Hilite the sub-tabs correctly
        document.getElementById('pbttTrain').style.backgroundColor = BUTTON_BGCOLOR; 
        document.getElementById('pbttTrain').style.color = "white";

        t.trainContentType = 1;
        document.getElementById('pbttConfigTrain').style.backgroundColor = "#eed"; 
        document.getElementById('pbttConfigTrain').style.color = "black";
    
        var m = '<DIV class=' + rndStyle['classPrefix'] + 'Subtitle>'+ kConfigTrain +'</div>\
                 <DIV style="overflow:auto">\
                 <TABLE class=' + rndStyle['classPrefix'] + 'TabPad>\
                 <TR align=center class=' + rndStyle['classPrefix'] + 'TabHdr1><TD style="background:none !important;" colspan=2></td></tr>\
                 </div>';
    
        // Add the radio buttons  
        m += '<TR><TD><INPUT type=radio name=pbttQRadio value="Minimum Housing" ></td><td>'+ kMinHousing +'</td></tr>';
        m += '<TR><TD><INPUT type=radio name=pbttQRadio value="Minimum Resource Levels" ></td><td>'+ kMinResourceLevels +'</td></tr>';
        m += '</table><DIV class=short></div>'; 
    
        // Create an all troop table
        var el = [];
        var troopTypes = t.allTroops;
   
        m += '<DIV class=' + rndStyle['classPrefix'] + 'Subtitle style="background-color:#0044a0;">Troop Cap (Max Troops, 0 = no max)</div><TABLE class=' + rndStyle['classPrefix'] + 'Tab><TR valign=top><TD width=150><TABLE class=' + rndStyle['classPrefix'] + 'Tab>';
        for (tt=0; tt<troopTypes.length; tt++){
            // Use less room in the table layout
            if (tt%3 == 0) m += '<TR>';
            m += '<TD class=' + rndStyle['classPrefix'] + 'TabLeft>'+ Names.troops.byName[troopTypes[tt]][2] +':</td>';
            var num = Data.options.troopCap.city[0].troopType[tt];
            if (!num || isNaN(num)) num = 0;
            m += '<TD><INPUT type=text id=pbtrnCap_'+ 0 +'_'+ tt +' maxlength=6 size=2 value="'+ num +'"\></td>';
            if (tt>0 && (tt+1)%3 == 0) m += '</tr>';
            el.push('pbtrnCap_'+ 0 +'_'+ tt);
        }
        m += ((tt+1)%3 == 0) ? '</tr></table></td></tr></table>' : '</table></td></tr></table>';
        m += '</div>';
    
        // Display the page
        document.getElementById('pbtrnConfig').innerHTML = m;

        // add event listeners for the radio buttons
        var r = document.getElementsByName('pbttQRadio');
        for (i=0;i<r.length;i++) {
            r[i].addEventListener('change', enableChanged, false);
            // Select the radio button that was last selected
            r[i].checked = (r[i].value == Data.options.trainQChoice);
        }
   
        // Add event listeners for troop quantities 
        for (var i=0; i<el.length; i++)
        document.getElementById(el[i]).addEventListener('change', troopsChanged, false);

        // radio buttons are weird    
        function enableChanged(e){
            var t = Tabs.Jobs;
        
            if (Data.options.autoTrain.enabled) {
                t.setTrainEnable(false); // It would be very bad to leave training on when switching queue types. 
                if (t.contentType == 1) t.dispFeedback (kTrainSafetyFeature);
            }
        
            t.selectedQ = e.target.value;
            Data.options.trainQChoice = e.target.value;
        }
    
        // Update troops on change
        function troopsChanged (e){
            var args = e.target.id.split('_');
            var x = parseIntZero(e.target.value);
            // The upper limit is not important because we are looking at a maximum number of troops
            if (isNaN(x) || x<0){
                e.target.style.backgroundColor = 'red';
                dispError (kInvalidNumberTroops);
            } 
            else {
                e.target.value = x;
                Data.options.troopCap.city[args[1]].troopType[args[2]] = x;
                e.target.style.backgroundColor = '';
            }
        }
    },
    
}



function pickRandomTitle(){
    var len = wordArr.length-1;
    var rnd1 = Math.ceil (Math.random() * len);
    var rnd2 = Math.ceil (Math.random() * len);
    
    Title = wordArr[rnd1] +' '+ wordArr[rnd2];
    
    kDOAVersionString = Title + ' -v';
    kFatalSWF = '"<B>Error initializing "'+ Title +'"</b><BR><BR>Unable to find SWF element"';
    kStartupErr = '"Unable to start "'+ Title +'"<BR>"';
    kInitErr = '"<B>Error initializing "'+ Title +'"</b><BR><BR>"';
    kAnnounceVersion = 'There is a new version of '+ Title +'<BR><BR>Version: ';
}

/***********************************   End Jobs  ***********************************/

/********************************************************************************
 * Options Tab                                                                  *
 * - Enable window drag                                                         *
 * - Enable collection of resources from Outposts every 1-99 seconds, minutes,  *
 *   hours or days                                                              *
 * - Enable verbose logging                                                     *
 ********************************************************************************/
Tabs.Options = {
	tabOrder : OPTIONS_TAB_ORDER,
	tabLabel : kOpts,
	tabDisabled	: !OPTIONS_TAB_ENABLE,
	cont : null,

	init : function (div) {
		var t = Tabs.Options;
		t.cont = div;

		var selected = new Array(4);
		for (var i = 0; i < selected.length; i++)
			selected[i] = '';
		switch (Data.options.autoCollect.unit) {
			case 1:
				selected[1] = 'selected';
				break
			case 60:
				selected[2] = 'selected';
				break;
			case 3600:
				selected[3] = 'selected';
				break;
			case 86400:
				selected[4] = 'selected';
				break;
			default:
				selected[3] = 'selected';
		}

		try {      
			m = '<DIV class=' + rndClass['tab_title'] + ' style="margin-bottom:10px">'+ kOptions +'</div>\
				<TABLE>\
				<TR valign=top><TD><B>' + kGameOptions + ': </B></TD></TR>\
				<TR valign=top><TD><INPUT id=' + rndId['enable_collect'] + ' type=checkbox /> ' + kAutoCollect + ' <INPUT id=' + rndId['collect_time'] + ' size=1 maxlength=2 type=text value="' + Data.options.autoCollect.delay + '" />\
				<SELECT id=' + rndId['collect_unit'] + ' size=1>\
				<OPTION value=1 ' + selected[1] + '>' + kSeconds + '</OPTION>\
				<OPTION value=60 ' + selected[2] + '>' + kMinutes + '</OPTION>\
				<OPTION value=3600 ' + selected[3] + '>' + kHours + '</OPTION>\
				<OPTION value=86400 ' + selected[4] + '>' + kDays + '</OPTION>\
				</SELECT>\
				</TD></TR></TABLE><BR><HR>\
				<TABLE>\
				<TR valign=top><TD><B>' + kScriptOptions + ': </B></TD></TR>\
				<TR valign=top><TD><INPUT id=' + rndId['enable_drag'] + ' type=checkbox /> ' + kEnableDrag + '</TD></TR>\
				<TR valign=top><TD><INPUT id=' + rndId['enable_verbose'] + ' type=checkbox /> ' + kEnableVerbose + '</TD></TR>\
				</TABLE><BR><HR>\
				<TABLE>\
				<TR valign=top><TD><INPUT id=' + rndId['options_refresh'] + ' class=' + rndClass['blue_button'] + ' type=submit value=' + kRefresh + ' /></TD></TR>\
				</TABLE><BR><HR>';
				
			t.cont.innerHTML = m;
			t.togOpt(rndId['enable_collect'], Data.options.autoCollect.enabled, AutoCollect.setEnable);
			document.getElementById(rndId['collect_time']).addEventListener ('change', t.timeChanged, false);
			document.getElementById(rndId['collect_unit']).addEventListener ('change', t.unitChanged, false);
			t.togOpt(rndId['enable_drag'], Data.options.popUp.drag, mainPop.setEnableDrag);
			t.togOpt(rndId['enable_verbose'], Data.options.verboseLog.enabled, VerboseLog.setEnable);
			document.getElementById(rndId['options_refresh']).addEventListener ('click', t.refreshClicked, false);
		} catch (e) {
			t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
		}
	}, 

	hide : function () {
	},
  
	show : function () {
	},
	
	togOpt : function (checkboxId, optionVar, callEnable, callIsAvailable) {
		var t = Tabs.Options;
		var checkbox = document.getElementById(checkboxId);
		if (callIsAvailable && callIsAvailable() == false) {
			checkbox.disabled = true;
			return;
		}
		if (optionVar)
			checkbox.checked = true;
		checkbox.addEventListener ('change', new eventToggle(checkboxId, optionVar, callEnable).handler, false);
		function eventToggle(checkboxId, optionVar, callOnChange) {
			this.handler = handler;
			var optVar = optionVar;
			var callback = callOnChange;
			function handler(event) {
				optVar = this.checked;
				if (callback != null)
					callback(this.checked);
			}
		}
	},
	
	timeChanged : function (e) {
		var etime = document.getElementById(rndId['collect_time']);
		var time = parseIntZero(etime.value);
		etime.value = time;
		Data.options.autoCollect.delay = time;
	},
  
	unitChanged : function (e) {
		var eunit = document.getElementById(rndId['collect_unit']);
		var unit = parseIntZero(eunit.value);
		eunit.value = unit;
		Data.options.autoCollect.unit = unit;
	},
	
	refreshClicked : function () {
		var t = Tabs.Options;
		Seed.fetchSeed();  
	},
}

// tbd - these may need to be translated
var Map = {
  names : {
    A : 'AntCamp',
    C : 'City',
    O : 'Outpost',
    H : 'Hill',
    G : 'Grassland',
    L : 'Lake',
    M : 'Mountain',
    F : 'Forest',
    P : 'Plain',
    S : 'Swamp',
  },
  scanMapCirc : function (x, y, radius, callback, doDetail){
    var t = Map;
    t.centerX = x;
    t.centerY = y;                                   
    t.firstX = t.normalize (x-radius+7);
    t.firstY =  t.normalize (y-radius+7);
    t.curIX = t.curIY = 0;
    t.widthI = parseInt(((radius*2)+14)/15); 
    t.radius = radius;
    t.doDetail = doDetail;
    t.callback = callback; 
    t.circ = true;
//WinLog.writeText ('***** AJAX: '+ t.curX +' , '+ t.curY);    
    new MyAjaxRequest ('map.json', { 'user%5Fid':C.attrs.userId, x:t.firstX, y:t.firstY, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, 'dragon%5Fheart':C.attrs.dragonHeart, version:getVersion }, t.got, false);
  },  

 // TBD: Change the if/else in the detail section to a case for the various types
  got : function (rslt){
    var t = Map;
    var x = rslt.dat.x;
    var ret = {tiles:[]}
//logit ('Map.got:\n'+ inspect (rslt.dat, 1, 1));    
    if (!rslt.ok){
      t.callback (null);    // error !?!
      return;
    }
    for (var i=0; i<rslt.dat.terrain.length; i++){
      for (var ii=0; ii<rslt.dat.terrain[i].length; ii++){
        var tile = rslt.dat.terrain[i][ii];
        var dist = distance (t.centerX, t.centerY, tile[2], tile[3]);
        if (dist <= t.radius){
          var type = tile[0].substr(0,1).toUpperCase();
          var d = {x:tile[2], y:tile[3], dist:dist, type:type, lvl:tile[1]};
  // TODO:  detail  
          if (t.doDetail){
             if (type=='W'){
             } else if (type=='C') {
             }
          }
          ret.tiles.push (d);
        }
      }
    }
//logit ('SCAN 1:\n'+ inspect (t, 5, 1));    
    if (++t.curIX >= t.widthI){
      t.curIX = 0;
      if (++t.curIY >= t.widthI){
        ret.done = true;
        t.callback (ret); 
        return;
      }
    }
//logit ('SCAN 2:\n'+ inspect (t, 5, 1));    
    ret.done = false;
    t.callback (ret);  
//WinLog.writeText ('***** AJAX: '+ t.curX +' , '+ t.curY);    
    setTimeout (function(){new MyAjaxRequest ('map.json', { 'user%5Fid':C.attrs.userId, x:t.normalize(t.firstX+(t.curIX*15)), y:t.normalize(t.firstY+(t.curIY*15)), timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, 'dragon%5Fheart':C.attrs.dragonHeart, version:getVersion }, t.got, false);}, MAP_DELAY);
 },

     
  normalize : function (x){
    if (x > 750)
      x -= 750;
    if (x < 0)
      x += 750;
    return x;
  },  
}




// CLASS!
function ModalDialog (curtainDiv, width, height, styleName, allowClose, notifyClose){
  this.allowClose = function (onOff){
    if (onOff)
      document.getElementById('MD7r8h').style.display = 'block';
     else
      document.getElementById('MD7r8h').style.display = 'none';
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
    return document.getElementById('MD7r8hc');
  }
  
  var off = getAbsoluteOffsets (curtainDiv);
  this.curtainDiv = curtainDiv;
  this.curtain = document.createElement ('div');
  this.curtain.style.top = off.top +'px';
  this.curtain.style.right = off.right + 'px';
  this.curtain.style.width = curtainDiv.clientWidth +'px';
  this.curtain.style.height = curtainDiv.clientHeight +'px';
  this.curtain.style.backgroundColor = '#000';
  this.curtain.style.opacity = '0.6';
  this.curtain.style.zIndex = parseInt(curtainDiv.style.zIndex) + 1;
  this.curtain.style.position = 'absolute';
//  curtain.style.margin = curtainDiv.style.margin;
//  curtain.style.padding = curtainDiv.style.padding;
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
  this.div.style.top = ((curtainDiv.clientHeight-height)/2 + off.top) + 'px';
  this.div.style.right = ((curtainDiv.clientWidth-width)/2 + off.right) + 'px';

  this.div.innerHTML = '<TABLE HEIGHT=100% WIDTH=100%><TR valign=middle height=80%><TD><DIV id=MD7r8hc style="text-align:center"></div></td></tr>\
    <TR valign=middle align=center><TD><INPUT id=MD7r8h type=submit value="CLOSE" style="display:none"/></td></tr></table>';
  curtainDiv.appendChild(this.div);
  this.allowClose(allowClose);
  this.notifyClose = notifyClose;
  var t = this;
  document.getElementById('MD7r8h').addEventListener('click', function (){
      t.destroyed = true;
      t.curtainDiv.removeChild(t.curtain);
      t.curtainDiv.removeChild(t.div);
      if (t.notifyClose)
        notifyClose();
  }, false);
}


function addScript (scriptText){
	var scr = document.createElement('script');   
	scr.innerHTML = scriptText;
	document.body.appendChild(scr);
//    setTimeout ( function (){document.body.removeChild(scr);}, 500);
}

// Pythagorean theorum for the hypotenuse of a right triangle
function distance (d, f, c, e) {
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
		t.tabList[k].scrambled = scramble('tab_' + k);
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
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
	
    var m = '<TABLE cellspacing=0 class=' + rndStyle['classPrefix'] + 'MainTab><TR>';
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id='+ sorter[i][1].scrambled +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    m += '<TD class=spacer width=90% align=right></td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;
    
    t.currentTab = null;
    for (k in t.tabList) {
      if (t.tabList[k].name == Data.options.currentTab)
        t.currentTab = t.tabList[k] ;
      document.getElementById(t.tabList[k].scrambled).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div; 
      div.style.display = 'none';
      div.style.height = '100%';
      div.style.maxWidth = document.getElementById(t.tabList[k].scrambled).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.width;
      div.style.overflowX = 'auto';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "INIT ERROR: "+ e;
      }
    }
    if (t.currentTab == null)
      t.currentTab = sorter[0][1];    
    t.setTabStyle (document.getElementById (t.currentTab.scrambled), true);
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
      e.className = 'sel';
    } 
    else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager;
	for (k in t.tabList)
		if (t.tabList[k].scrambled == e.target.parentNode.parentNode.id) {
			var newTab = t.tabList[k];
			break;
		}
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById (newTab.scrambled), true);
      t.setTabStyle (document.getElementById (t.currentTab.scrambled), false);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Data.options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}

var subtabManager = {
  tabList : {},           // {name, obj, div}
  currentTab : null,
  
  init : function (mainDiv){
    var t = subtabManager;
    var sorter = [];
    for (k in Tabs){
      if (!Tabs[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
		t.tabList[k].scrambled = scramble('tab_' + k);
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
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
	
    var m = '<TABLE cellspacing=0 class=' + rndStyle['classPrefix'] + 'MainTab><TR>';
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id='+ sorter[i][1].scrambled +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    m += '<TD class=spacer width=90% align=right></td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;
    
    t.currentTab = null;
    for (k in t.tabList) {
      if (t.tabList[k].name == Data.options.currentTab)
        t.currentTab = t.tabList[k] ;
      document.getElementById(t.tabList[k].scrambled).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div; 
      div.style.display = 'none';
      div.style.height = '100%';
      div.style.maxWidth = document.getElementById(t.tabList[k].scrambled).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.width;
      div.style.overflowX = 'auto';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "INIT ERROR: "+ e;
      }
    }
    if (t.currentTab == null)
      t.currentTab = sorter[0][1];    
    t.setTabStyle (document.getElementById (t.currentTab.scrambled), true);
    t.currentTab.div.style.display = 'block';
  },
  
  hideTab : function (){
    var t = subtabManager;
    t.currentTab.obj.hide();
  },
  
  showTab : function (){
    var t = subtabManager;
    t.currentTab.obj.show();
  },
    
  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } 
    else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = subtabManager;
	for (k in t.tabList)
		if (t.tabList[k].scrambled == e.target.parentNode.parentNode.id) {
			var newTab = t.tabList[k];
			break;
		}
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById (newTab.scrambled), true);
      t.setTabStyle (document.getElementById (t.currentTab.scrambled), false);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Data.options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}



function setTabStyle (e, selected){
  if (selected){
    e.className = 'matTabSel';
  } 
  else {
    e.className = 'matTabNotSel';
  }
}

function clickedTab (e){
  who = e.target.id.substring(2);
  newObj = my[who];
  currentObj = my[currentName];
  if (currentName != who){
    setTabStyle (document.getElementById ('aa'+currentName), false);
    setTabStyle (document.getElementById ('aa'+who), true);
    if (currentObj){
      currentObj.hide ();
      currentObj.getContent().style.display = 'none';
    }
    currentName = who;
    cont = newObj.getContent();
    newObj.getContent().style.display = 'block';
  }
  newObj.show();
}

function mouseMainTab (me){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
    showMe();
  }
}

function eventHideShow (e){
  if (Data.options.popUp.open)
    hideMe();
  else 
    showMe();
}

function hideMe() {
	if (!Data.options.popUp.open)
		return;
	tabManager.hideTab();
}

function showMe() {
	if (Data.options.popUp.open)
		return;
	tabManager.showTab();
}

// onClick (city{name, id, x, y}, x, y)   city may be null!
function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "ptcastleBut ptcastleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "ptcastleBut ptcastleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
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
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.size=2;
    eX.maxLength=3;
    eY.size=2;
    eY.maxLength=3;
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
  for (var i=0; i<Cities.cities.length; i++)
    m += '<INPUT class="ptcastleBut ptcastleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};


function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
    var pop = new CPopup ('cancelcontinue', 0, 0, 400,200, true, canNotify);
    if (centerElement)
        pop.centerMe(centerElement);
    else
        pop.centerMe(document.body);
    pop.getTopDiv().innerHTML = '<CENTER>'+ Title +'</center>';
    pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
        <TR align=center><TD><INPUT id=ptcccancel type=submit value='+ kCancel +' \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value='+ kContinue +' \></td></tr></table>';
    document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
    document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
    pop.show(true);
}

	/********************************************************************************
	 * Performs the following actions:                                              *
	 *  - Places all parameters into an object                                      *
	 *  - Determines method                                                         *
	 *  - Sets maximum timeout                                                      *
	 *  - Validates returned data and passes back results to originating function   *
	 *                                                                              *
	 * Returns the following data:                                                  *
	 *  - ok (boolean)                                                              *
	 *  - dat (object if present)                                                   *
	 *  - errmsg (string if present)                                                *
	 ********************************************************************************/	
	function MyAjaxRequest(url, params, callback, isPost) {
		var o = {onSuccess:mySuccess, onFailure:myFailure}, p, ajax, msg;
		o.parameters = {};
		for (p in params) {
			o.parameters[p] = params[p];
		}

		if (isPost) {
			o.method = 'POST';
		} else {
			o.method = 'GET';
		}
		
		o.timeoutSecs = 45;

		ajax = new AjaxRequest (C.attrs.apiServer +'/'+ url, o);
		
		
		/********************************************************************************
		 * Performs the following actions:                                              *
		 *  - Processes all successful AJAX requests (ie 200)                           *
		 *  - Attempts to extract the raw data and parse it into an object              *
		 *  - If parsing fails, an invalid 'Content-Type' returned, or no responseText  *
		 *    was present, then the status is changed to false and an error message is  *
		 *    returned                                                                  *
		 *                                                                              *
		 * Returns the following data:                                                  *
		 *  - ok (boolean)                                                              *
		 *  - dat (object)                                                              *
		 *  - errmsg (string)                                                           *
		 *                                                                              *
		 * Notes:                                                                       *
		 *  - JSON will be parsed before being returned in dat                          *
		 *  - XML will be sent back as a string in dat                                  *
		 *  - All other 'Content-Type' is returned as failed with an error message      *
		 ********************************************************************************/	
		function mySuccess(r) {
			var responseType = r.ajax.getResponseHeader('Content-Type'), msg;
			if (r.status === 200 && r.responseText) {
				if (responseType.indexOf('application/json') !== -1) {
					try {
						callback({ok:true, dat:JSON.parse(r.responseText)});
					} catch (e) {
						msg = 'The request succeeded but returned this error when being parsed: ' + e;
						callback({ok:false, errmsg:msg});
					}
				} else if (responseType.indexOf('application/xml') !== -1) {
					callback({ok:true, dat:r.responseText}); // Due to the inconsistent nature of the locale XML document parsing is not done at this point
				} else if (responseType.indexOf('text/html') !== -1) {
					if (r.responseText.indexOf('<!DOCTYPE html') === -1) {
						msg = ' (' + r.responseText + ')';
					}
					callback({ok:false, errmsg:r.status + ' ' + r.statusText + msg});
				} else {
					msg = 'The request succeeded but no data was able to be extracted';
					callback({ok:false, errmsg:msg});
				}
			} else {
				msg = 'The request succeeded but no data was returned';
				callback({ok:false, errmsg:msg});
			}
		}
		
		/********************************************************************************
		 * Performs the following actions:                                              *
		 *  - Processes all failed AJAX requests (ie anything other than 200)           *
		 *  - Attempts to extract the raw error message and parse it into a string      *
		 *                                                                              *
		 * Returns the following data:                                                  *
		 *  - ok (boolean)                                                              *
		 *  - dat (object)                                                              *
		 *  - errmsg (string)                                                           *
		 *                                                                              *
		 * Notes:                                                                       *
		 *  - Hadling of 'Content-Type' is included to handle the unlikely case that    *
		 *    the error message is returned as JSON or XML                              *
		 *  - JSON will be parsed before being returned in dat                          *
		 *  - XML will be sent back as a string in dat                                  *
		 *  - All other error message are returned as a string in errmsg                *
		 ********************************************************************************/	
		function myFailure(r) {
			var responseType = r.ajax.getResponseHeader('Content-Type'), msg;
			if (r.status > 200 && r.responseText) {
				if (responseType.indexOf('application/json') !== -1) {
					try {
						callback({ok:false, dat:JSON.parse(r.responseText)});
					} catch (e) {
						msg = 'The request failed but returned this error when being parsed: ' + e;
						callback({ok:false, errmsg:msg});
					}
				} else if (responseType.indexOf('application/xml') !== -1) {
					callback({ok:false, dat:r.responseText}); // Due to the inconsistent nature of the locale XML document parsing is not done at this point
				} else if (responseType.indexOf('text/html') !== -1) {
					if (r.responseText.indexOf('<!DOCTYPE html') === -1) {
						msg = ' (' + r.responseText + ')';
					}
					callback({ok:false, errmsg:r.status + ' ' + r.statusText + msg});
				} else {
					msg = 'The request failed but no error message was able to be determined';
					callback({ok:false, errmsg:msg});
				}
			} else if (r.status > 0) {
				callback({ok:false, errmsg:r.status + ' ' + r.statusText});
			} else {
				msg = 'The request failed due to browser incompatibility';
				callback({ok:false, errmsg:msg});
			}
		}
	}

	/********************************************************************************
	 * Performs the following actions:                                              *
	 *  - Generates an appropriate request header                                   *
	 *  - Parses the request parameters                                             *
	 *  - Sends the actual request                                                  *
	 *  - Determines if request was successful based on returned status only        *
	 *  - Handles a request timed out condition                                     *
	 *                                                                              *
	 * Returns the following data:                                                  *
	 *  - responseText (should be JSON but could be almost anything)                *
	 *  - status (integar)                                                          *
	 *  - statusText (string if present)                                            *
	 *  - ajax (raw ajax request)                                                   *
	 ********************************************************************************/	
	function AjaxRequest(url, opts) {
		var timer = null, ajax, headers = {}, k, a = [], parmStr;
		
		// Parse request parameters
		if (opts.method === 'POST') {
			for (k in opts.parameters) {
				a.push(k + '=' + opts.parameters[k]);
			}
			parmStr = a.join('&'); 
		} else if (opts.method === 'GET') {
			url = addUrlArgs(url, opts.parameters);
		}
				
		// Change Accept request header based on browser
		if (IsChrome) {
			headers['Accept'] = '*/*';
		} else {
			headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
		}
		
		// Add request header specific to POST request only
		if (opts.method === 'POST') {
			headers['content-type'] = 'application/x-www-form-urlencoded';
			headers['X-S3-AWS'] = SHA1("Dracunculiasis" + parmStr + "LandCrocodile" + url  + "Bevar-Asp");
		}
		
		ajax = new XMLHttpRequest();

		ajax.onreadystatechange = function () {
			if (ajax.readyState === 4) {
				clearTimeout(timer);  
				if (ajax.status === 200) {
					if (opts.onSuccess) opts.onSuccess({responseText:ajax.responseText, status:ajax.status, statusText:ajax.statusText, ajax:ajax});
				} else {
					if (opts.onFailure) opts.onFailure({responseText:ajax.responseText, status:ajax.status, statusText:ajax.statusText, ajax:ajax});
				}
			} 
		} 
		
		ajax.open(opts.method, url, true);
		
		// Add request headers to ajax request
		for (k in headers) {
			ajax.setRequestHeader(k, headers[k]);
		}
		
		// Start timeout check before request is sent
		if (opts.timeoutSecs) {
			timer = setTimeout(timedOut, opts.timeoutSecs*1000);
		}
		
		// Send request with parmStr if POST otherwise just send request
		if (opts.method === 'POST') { 
			ajax.send(parmStr);
		} else if (opts.method === 'GET') {
			ajax.send();
		}
		
		function addUrlArgs(url, args) {
			if (!args)
				return url;
			if (url.indexOf('?') < 0)
				url += '?';
			else if (url.substr(url.length-1) != '&')
				url += '&';    
			if (extTypeof(args == 'object'))
				return url + implodeUrlArgs (args);    
			return url + args;
		}
		
		function implodeUrlArgs(obj) {
			var a = [];
			for (var k in obj)
				a.push (k +'='+ encodeURI(obj[k]) );
			return a.join ('&');    
		}
	  
		function timedOut() {
			ajax.abort();
			if (opts.onFailure) opts.onFailure({responseText:null, status:599, statusText:'Request Timed Out', ajax:ajax}); // CHECK: 599 is custom error code. See if better option exists.
		}
	}   

// example: http://www150.kingdomsofcamelot.com
var ServerId = null;
function getServerId() {
	if (ServerId)
		return ServerId;
	var m = /^realm([0-9]+)\./.exec(document.location.hostname);
	if (m) {
		ServerId = m[1];
		return m[1];
	}
	return '';
}

function logit(msg) {
	var serverID = getServerId();
	var now = new Date();
	console.log(serverID + ' @ ' + now.toTimeString().substring (0,8) + '.' + now.getMilliseconds() + ': ' +  msg);
}

//*********************************** Log Tab ***********************************
Tabs.ActionLog = {
  tabOrder: LOG_TAB_ORDER,
  tabLabel : kLog,
  tabDisabled : !LOG_TAB_ENABLE,
  myDiv : null,
  logTab : null,
  maxEntries: 500,
  saveEntries: 200,
  state : null,
    
  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=' + rndClass['tab_title'] + '>ACTION LOG</div><DIV style="height:725px; max-height:725px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=' + rndStyle['classPrefix'] + 'TabLined><TR><TD></td><TD width=95%></td></table></div>';
    t.logTab = document.getElementById('pbactionlog');  
    t.state = 1;
    if (extTypeof(Data.log) == 'array'){
      for (var i=0; i<Data.log.length; i++)
        t._addTab (Data.log[i].msg, Data.log[i].ts);
    }
  },

  hide : function (){
  },

  show : function (){
  },

  _addTab : function (msg, ts){
    var t = Tabs.ActionLog;
    if (t.state != 1)
      return;
    if (t.logTab.rows.length >= t.maxEntries)
      t.logTab.deleteRow(t.maxEntries-1);
    var row = t.logTab.insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML = ts;
    row.insertCell(1).innerHTML = msg;
  }, 
  
  log : function (msg){
    var t = Tabs.ActionLog;
    var ts = new Date().toTimeString().substring (0,8);
    t._addTab (msg, ts);
    while (Data.log.length >= t.saveEntries)
      Data.log.shift();
    Data.log.push ({msg:msg, ts:ts});
  },
}

function actionLog(msg) {
	if (!Tabs.ActionLog.tabDisabled)
		Tabs.ActionLog.log(msg);  
}
    

//**********************************************************************************

function titleLine (msg){
  return '<TABLE cellpadding=0 cellspacing=0 width=100%><TR><TD width=50%><HR></td><TD>'+ msg +'</td><TD width=50%><HR></td></tr></table>';
}

//************ LIB classes/functions **************
function getAbsoluteOffsets (e){
  ret = {left:0, top:0};
  while (e.offsetParent){
    if (e.style.position == 'absolute')
      break;
    ret.right += e.offsetRight;
    ret.top += e.offsetTop;
    e = e.offsetParent;
  }      
  return ret;  
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
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};

function debugPos  (e){
  return 'client - offset: '+ e.clientRight +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetRight +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
}

function searchDOM (node, condition, maxLevel, doMult){
  var found = [];
  eval ('var compFunc = function (node) { return ('+ condition +') }');
  doOne(node, 1);
  if(!doMult){
    if (found.length==0)
      return null;
    return found[0];
  }
  return found;
  function doOne (node, curLevel){
    try {
      if (compFunc(node))
        found.push(node);
    } catch (e){
    }      
    if (!doMult && found.length>0)
      return; 
    if (++curLevel<maxLevel && node.childNodes!=undefined)
      for (var c=0; c<node.childNodes.length; c++)
        doOne (node.childNodes[c], curLevel);
  }
}

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetRight;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

function htmlTitleLine (msg){
  return '<TABLE width=100% cellspacing=0><TR><TD style="padding:0px" width=50%><HR></td><TD style="padding:0px">[ '+ msg +' ]</td><TD style="padding:0px" width=50%><HR></td></tr></table>';  
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
//    if (unsafeWindow.cpopupWins == null)
//      unsafeWindow.cpopupWins = {};
//    unsafeWindow.cpopupWins[prefix] = pop;
  },
  
  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
//    delete unsafeWindow.cpopupWins[prefix];
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
  this.BASE_ZINDEX = 100;
	
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
  this.focusMe = focusMe;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;
  this.setModal = setModal;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
	// Scramble
	rndPopup = ['outer', 'bar', 'top', 'main', 'X'];
	
	for (var s=0; s<rndPopup.length; s++) {
		rndPopup[rndPopup[s]] = scramble(prefix + '_' + rndPopup[s]);
	}
  
  var t = this;
  this.div.id = rndPopup['outer'];
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.position = 'absolute';
  this.div.style.top = y +'px';
  this.div.style.right = x + 'px';
  this.div.style.border = '3px ridge #666';
    
  var m = '<TABLE cellspacing=0 width=100% height=100%>\
           <TR id="'+ rndPopup['bar'] +'" style="background-color: #dde;">\
           <TD width=100% valign=bottom>\
           <SPAN id="'+ rndPopup['top'] +'"></span></td>\
           <TD id='+ rndPopup['X'] +' align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 4px">X</td></tr>\
           <TR><TD height=100% valign=top colspan=2 id="'+ rndPopup['main'] +'"></td></tr></table>';
  
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(rndPopup['X']).addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(rndPopup['bar']), this.div, enableDrag);
  
  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);
  
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
//    for (k in unsafeWindow.cpopupWins){
//      if (k != t.prefix)
//        unsafeWindow.cpopupWins[k].unfocusMe(); 
//    }
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
    if (parent == null){
      var coords = getClientCoords(document.body);
    } 
    else
      var coords = getClientCoords(parent);
    var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
    var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
    if (x<0)
      x = 0;
    if (y<0)
      y = 0;
    t.div.style.right = x +'px';
    t.div.style.top = y +'px';
  }
  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
	Data.options.popUp.drag = tf;
  }
  function setLayer(zi){
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function getTopDiv(){
    return document.getElementById(rndPopup['top']);
  }
  function getMainDiv(){
    return document.getElementById(rndPopup['main']);
  }
  function show(tf){
    if (tf){
      t.div.style.display = 'block';
      t.focusMe ();
    } 
    else {
      t.div.style.display = 'none';
    }
    return tf;
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

function CWinDrag (clickableElement, movingDiv, enabled) {
  var t=this;
  this.setEnable = setEnable;
  this.setBoundRect = setBoundRect;
  this.debug = debug;
  this.dispEvent = dispEvent;
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
    } 
    else {
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
//t.dispEvent ('eventOUT', me);
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
//t.dispEvent ('eventMOVE', me);
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newRight = parseInt(t.theDiv.style.right) - me.clientX + t.lastX;
        if (newTop < t.bounds.top){     // if out-of-bounds...
          newTop = t.bounds.top;
          _doneMoving(t);
        } 
        else if (newRight < t.bounds.left){
          newRight = t.bounds.left;
          _doneMoving(t);
        } 
        else if (newRight > t.bounds.right){
          newRight = t.bounds.right;
          _doneMoving(t);
        } 
        else if (newTop > t.bounds.bot){
          newTop = t.bounds.bot;
          _doneMoving(t);
        }
        t.theDiv.style.top = newTop + 'px';
        t.theDiv.style.right = newRight + 'px';
        t.lastX = me.clientX;
        t.lastY = me.clientY;
      }
    }
  }

  function debug  (msg, e){
    logit ("*************** "+ msg +" ****************");
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    logit ('offsetRight, Top, Width, Height (parent): '+ e.offsetRight +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    logit ('scrollRight, Top, Width, Height: '+ e.scrollRight +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
  }

  function dispEvent (msg, me){
    logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
  }
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
    indent += '  ';
  for(property in obj) {
    try {
        type =  extTypeof(obj[property]);
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

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { 
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}
String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;' };
String.prototype.htmlEntities = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}

String.prototype.stripTags = function(){ 
  return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
}

String.prototype.capitalize = function(){ 
  return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}

if (String.trim == undefined) {
  String.prototype.trim = function () {
      return this.replace(/^\s*/, "").replace(/\s*$/, "");
  }
}
function entityDecode (str){
  var ta=document.createElement('textarea');
  ta.innerHTML = str; 
  return ta.value;
}  
  
function parseNvQuoted(str){
  var ret = {};
  var re = /\s*(.*?)\s*=\s*('|")(.*?)\2/gi;
  while ((m = re.exec(str)) != null)
    ret[m[1]] = m[3];
  return ret;
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

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


function htmlSelector (valNameObj, curVal, tags){
  m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');

}


function serverTime (){
  return parseInt (new Date().getTime() / 1000) + Seed.serverTimeOffset;
}
function htmlOptions (a, curVal){
  m = '';
  for (k in a)
    m += '<OPTION value="'+ k +'"'+ (k==curVal?' SELECTED':'')  +'>'+ a[k] +'</option>';
  return m;
}
function getFunctionName (func){
  var name=/\W*function\s+([\w\$]+)\(/.exec(func);
  if (!name)
    return '';
  return name[1];
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

function strUpTo (s, find){
  var i = s.indexOf(find);
  if (i > 0)
    return s.substr(0, i);
  return s;
}


/********
 Xd Xh
 Xh Xm
 Xm Xs
 Xs
********/
function timestrShort(time) {
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
  else
    return timestr (time);
}

/**********************
 part       full
 Xd Xh Xm   Xd Xh Xm Xs
 Xh Xm      Xh Xm Xs
 Xm Xs      Xm Xs
 Xs         Xs
**********************/
function timestr(time, full) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  t + 's';
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
  if (str[str.length-1] == ' ')
    str = str.substring(0, str.length-1);
  return str;
}

//************ LIB singletons **************
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
      t.win.document.body.innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; height:100%; max-height:100%"></div></body>';
      t.win.document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      t.win.document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  t.win.document.getElementById('wlOut');
      t.lastE = null;
      t.state = 1;
    }
  },

  
  writeText : function (msg){
    WinLog.write (msg.htmlEntities()); 
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
  },
};
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

setTimeout (dtStartup, 10000);
}

	/********************************************************************************
	 * All generic global functions go here in alphabetical order.                  *
	 *                                                                              *
	 * Current functions:                                                           *
	 *  - checkDuplicate(string)                                                    *
	 *  - extTypeof(var) returns string                                             *
	 *  - scramble(string) returns string                                           *
	 ********************************************************************************/	
	function checkDuplicate(s) {
		for (var ss=0; ss<rndStyle.length; ss++) {
			if (s != ss) {
				if (rndStyle[rndStyle[s]] == rndStyle[rndStyle[ss]]) {
					rndStyle[rndStyle[s]] = scramble(rndStyle[s]);
					checkDuplicates(s);
				}
			}
		}
	}	

	/********************************************************************************
	 * Determines the type of a variable and returns that as one of the following   *
	 * strings.                                                                     *
	 *                                                                              *
	 *  - number                                                                    *
	 *  - string                                                                    *
	 *  - boolean                                                                   *
	 *  - object                                                                    *
	 *  - null                                                                      *
	 *  - undefined                                                                 *
	 *  - array                                                                     *
	 ********************************************************************************/	
	function extTypeof(v) {
		var rslt;
		if (v === undefined) {
			rslt = 'undefined';
		} else if (!v) {
			rslt = 'null';
		} else {
			if (typeof v === 'object') {
				if (v.constructor.toString().indexOf("Array") !== -1) {
					rslt = 'array';
				} else {
					rslt = 'object';
				}
			} else {
				rslt = typeof v;
			}
		}
		return rslt;
	}	
	
	function scramble(s) {
		return s.replace(
			/\b([a-zA-Z])([_a-zA-Z0-9\-]+)([a-zA-Z0-9])\b/gi,
			function (t, a, b, c) {
				b = b.split(/\B/);
				for (var i = b.length, j, k; i; j = parseInt(Math.random() * i),
				k = b[--i], b[i] = b[j], b[j] = k ) {}
				return a + b.join( '' ) + c;
			}
		);
	}
})();
