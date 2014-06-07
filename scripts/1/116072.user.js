// ==UserScript==
// @name          DoA Power Tools Plus mod Phantomas
// @namespace     http://www.dragonsofatlantis.com/scripts
// @icon          http://img66.xooimage.com/files/3/6/d/jaws64-2b5041c.png
// @description   Enhanced tools for Dragons of Atlantis modded by Phantomas
// @include       http://apps.facebook.com/dragonsofatlantis/*
// @include       http://*.castle.wonderhill.com/*
// @include       *plus.google.com/games/659749063556*
// @include       *googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @exclude       http://apps.facebook.com/dragonsofatlantis/rubies
// @match         http://*.castle.wonderhill.com/*
// @match         http://apps.facebook.com/dragonsofatlantis/*
// @version       solo para tercos v0.3
// ==/UserScript==

(function() {

//*******************************************************************************
// All global variables MUST be set here or they will not be available to all
// functions throughout the script.
//*******************************************************************************
var kDOAPowerTools = 'I Hate Kabam';

// URLs
var wWebSite = 'http://t111-Mode-d-.htm';
var kWebSite = 'COLMILLO DE DRAGON';
var wForumLink = 'http://pfd/index.php';
var kForumLink = 'PFD Forum';
var wWikiLink = 'http://wiki/';
var kWikiLink = 'DoA';

var Version = 'Phantomas lo mas v.03';
var DisplayTitle = kDOAPowerTools + ' -v ' + Version;
//var WebSite = 'userscripts.org/scripts/show/104301';
var DEBUG_TRACE_AJAX = 2;
var DEBUG_MARCHES = false;
var MAP_DELAY = 1250;
//var MIN_DELAY = 15;
var MIN_DELAY = 1;
var EMULATE_NET_ERROR = 0;  // percentage
var ENABLE_DEBUG_TAB = false;
var ENABLE_WINLOG = false;
var ALERT_ON_BAD_DATA = false;
var BUTTON_BGCOLOR = '#436';
var JOB_BUTTON_BGCOLOR = '#436'; //'#049C93';
var KABAM_CHECK = false;
var getVersion = 17;
var postVersion = 17;

// To remove header bar "play | rubies | ...."
var REMOVE_HD = false;

// Skins
var urlBackgroundImage = 'http://img70.xooimage.com/files/3/8/3/pfdnewbackgroundfix-2b96f19.jpg';
//                       'http://img74.xooimage.com/files/3/a/6/pfdnewbackground-2b861f9.gif';
//                       'http://img72.xooimage.com/files/7/8/0/skinewscript-2b4ed29.jpg';
//                       'http://img66.xooimage.com/files/9/b/e/skin-3-2aac15d.jpg';
var urlBackgroundLogo = 'http://img73.xooimage.com/files/4/3/1/logojaws-2b7e9d0.jpg';

// Help pages
var urlError = 'http://www.forum/viewtopic';

// Alert sound
var DEFAULT_ALERT_SOUND_URL = 'http://koc.god-like.info/alarm.mp3';
var SWF_PLAYER_URL = 'http://koc.god-like.info/player_mp3_multi_1.2.1.swf';

// Tab order
var INFO_TAB_ORDER = 1;
var JOBS_TAB_ORDER = 2; // Holding position for research tab
var WAVE_TAB_ORDER = 3;
var MULTI_TAB_ORDER = 4;  // Jawz
var SPY_TAB_ORDER = 5;  // Jawz
var ATTACK_TAB_ORDER = 6;
var ALLIANCE_TAB_ORDER = 7;
var SEARCH_TAB_ORDER = 8; // Jawz
var BATTLE_TAB_ORDER = 9;
var TOWER_TAB_ORDER = 10;
var OPTIONS_TAB_ORDER = 97;
var LOG_TAB_ORDER = 98;
var DEBUG_TAB_ORDER = 99;

var BUILD_TAB_ORDER = 3;  // Jawz

// Enable/Disable tabs
var ENABLE_INFO_TAB = true;
var ENABLE_JOBS_TAB = true;
var ENABLE_WAVE_TAB = true;
var ENABLE_MULTI_TAB = true;  // Jawz
var ENABLE_SPY_TAB = true;  // Jawz
var ENABLE_BUILD_TAB = true;  // temporaire
var ENABLE_ATTACK_TAB = true;
var ENABLE_SEARCH_TAB = true; // Jawz
var ENABLE_OPTIONS_TAB = true;
var ENABLE_BATTLE_TAB = true;
var ENABLE_ALLIANCE_TAB = true;
var ENABLE_TOWER_TAB = true;
var ENABLE_LOG_TAB = true;
var ENABLE_DEBUG_TAB = false;

// Message handling
var MESSAGES_ALL = 0;
var MESSAGES_ONLY = 1;
var REPORTS_ONLY = 2;
// Message types
var MSG_BATTLE_REPORT = 1;
var TRANSPORT_MARCH_REPORT = 2;
var SPY_REPORT = 3;
var SENTINEL_WARNING = 4;
var REINFORCEMENTS_REPORT = 5;
var SYSTEM_MESSAGE = 6;
var PLAYER_MESSAGE = 7;
var ALLIANCE_MESSAGE = 8;

// Prefix for each id and class
var styleDone = 0;
var idPrefix;
var classPrefix;
var outerRnd;
var hdRnd;
var poptopRnd;
var idSupportLink;
var idRetry;

var infoPrefix;
var wavePrefix;
var multiPrefix;
var spyPrefix;
var searchPrefix;
var attackPrefix;
var jobsPrefix;
var logPrefix;
var optionPrefix;
var battlePrefix;
var alliancePrefix;
var buildPrefix;
var towerPrefix;

var idTitle;
var idSubtitle;
var idInput;
var idStatBox;
var idTabPad;
var idTab;
var idTabLeft;
var idTableft;
var idTabSelectOpt;
var idTabRight;
var idTabLined;
var idTabHdr;
var idMarchOther;
var idMarchMine;
var idOwned;
var idMainTab;
var idButAttackOff;
var idButAttackOn;
var idGreenButton;
var idBoldRed;

//************************************************************************
// Check to see if script is running in an iframe or not and removes
// unnecessary elements before continuing with the script.
//
// Current actions:
//  - Set width all parent div of 'iframe_canvas' to 100%
//  - Hide 'rightCol' div
//  - Hide unwanted objects
//  - Set width of 'hd' div to 760px
//  - Set margin of parent to game object to 0px
//  - Hide unwanted elements in 'hd' div
//  - Hide 'ft' div
//************************************************************************
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
    document.getElementById('blueBar').style.display = 'none';
    document.getElementById('pageHead').style.display = 'none';
    document.getElementById('jewelContainer').style.display = 'none';
    document.getElementById('headNav').style.display = 'none';
    document.getElementById('contentCol').style.margin = '0px';
    var contentColChild = document.getElementById('contentCol').childNodes;
    for (var i=0; i<contentColChild.length; i++)
      if (contentColChild[i].tagName == 'DIV')
        contentColChild[i].style.margin = '0px';
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
    if (REMOVE_HD) document.getElementById('hd').style.display = 'none';
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
  // id prefixes
  idPrefix    = makeid(2);
  classPrefix = makeid(5);
  outerRnd    = makeid(5);
  hdRnd       = makeid(2);
  poptopRnd   = makeid(6);
  idSupportLink = makeid(7);
  idRetry       = makeid(7);

  // Tabs prefixes
  infoPrefix     = makeid(5) + "i";
  wavePrefix     = makeid(5) + "w";
  multiPrefix    = makeid(5) + "m";
  spyPrefix      = makeid(5) + "s";
  searchPrefix   = makeid(5) + "x";
  attackPrefix   = makeid(5) + "a";
  jobsPrefix     = makeid(5) + "j";
  logPrefix      = makeid(5) + "l";
  optionPrefix   = makeid(5) + "o";
  battlePrefix   = makeid(5) + "f";
  alliancePrefix = makeid(5) + "z";
  towerPrefix    = makeid(5) + "t";
  buildPrefix    = makeid(5) + "b";  // temporaire

  // Class suffixes
  idTitle        = classPrefix + "T" + makeid(5);
  idSubtitle     = classPrefix + "S" + makeid(5);
  idInput        = classPrefix + "I" + makeid(5);
  idStatBox      = classPrefix + "B" + makeid(5);
  idTabPad       = classPrefix + "P" + makeid(5);
  idTab          = classPrefix + "t" + makeid(3);
  idTabLeft      = classPrefix + "L" + makeid(5);
  idTableft      = classPrefix + "l" + makeid(5);
  idTabSelectOpt = classPrefix + "O" + makeid(5);
  idTabRight     = classPrefix + "R" + makeid(5);
  idTabLined     = classPrefix + "Tl" + makeid(3);
  idTabHdr       = classPrefix + "H"  + makeid(4);
  idMarchOther   = classPrefix + "Mo" + makeid(3);
  idMarchMine    = classPrefix + "Mm" + makeid(3);
  idOwned        = classPrefix + "w" + makeid(4);
  idMainTab      = classPrefix + "M" + makeid(5);
  idButAttackOff = classPrefix + "Of" + makeid(4);
  idButAttackOn  = classPrefix + "On" + makeid(4);
  idGreenButton  = classPrefix + "G" + makeid(4);
  idBoldRed      = classPrefix + "b" + makeid(4);

  function makeid(l){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < l; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    styleDone++;
    return text;
  }
  processInitScript ();
}

function processInitScript () {
  if (styleDone >= 40)
    initScript ();
  else
    setTimeout (processInitScript, 100);
}


function initScript () {

var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

//var wordArr = ['Czar', 'Bright', 'Work', 'Power', 'Tools', 'Dragons', 'Fire', 'Water', 'Lava', 'Metal', 'Stone', 'Protect', 'Branch', 'Child', 'New', 'Fangled', 'Flugel', 'Horn', 'Perfect', 'Myth', 'Jelly', 'Graph', 'Quick', 'Thorn', 'Pitbull', 'Tech', 'Cow', 'Middle', 'Brow', 'Hammer', 'Chord', 'Dazzle', 'Elemental', 'Brillig', 'Craft', 'Thumb', 'Print', 'Crtyp', 'Torch', 'Light', 'Bank', 'Final', 'Epic', 'Desk', 'Marble', 'Aqua', 'Phoenix', 'Peanut', 'Halo', 'Nimbus', 'Cloud', 'Seed',];
var prefArr = ['Enorme', 'Magnifique', 'Petit', 'Joli', 'Mignon', 'Rapide', 'Grand', 'Lent', 'Puissant', 'Agile', 'Avide', 'Rapide', 'Parfait',
               'Précis', 'Simple', 'Stable', 'Véloce', 'Vilain', 'Vivace', 'Moche', 'Laid', 'Cruel', 'Démoniaque', 'Silencieux', 'Eternel',
               'Tacite', 'Menu', 'Méchant', 'Instable', 'Rusé',];

var nameArr = ['Acrobate', 'Recommencement', 'Boeuf', 'Carnage', 'Chacal', 'Doigt', 'Chien', 'Choc', 'Colosse', 'Criquet', 'Démon', 'Eclair',
               'Eclat', 'Empalement', 'Equilibre', 'Esprit', 'Feu', 'Fléau', 'Fantôme', 'Garde', 'Géant', 'Gel', 'Glacier', 'Lion', 'Loup',
               'Mage', 'Mammouth', 'Massacre', 'Développeur', 'Pic', 'Remède', 'Renard', 'Renouvellement', 'Savoir-faire', 'Scorpion', 'Soleil', 
               'Tigre', 'Titan', 'Tonnerre', 'Vampire', 'Venin', 'Tueur', 'Dragon', 'Soldat', 'Nuage', 'Slip', 'Serpent', 'Lézard', 'Spectre', 'Océan',];

var suffArr = ['Aigue-Marine', 'Ambre', 'Béni', 'Béryl', 'Cobalt', 'Corail', 'Cruel', 'd\'Acier', 'd\'Ange', 'd\'Arch-Ange', 'd\'Archer', 'd\'Argent',
               'd\'Or', 'de Bronze', 'de Chevalier', 'de Fer', 'de Guerrier', 'de la Fin', 'de Moine', 'de Platine', 'de Seigneur', 'de Soldat', 'du Canard',
               'du Dément', 'Emeraude', 'Féroce', 'Fortifié', 'Fulgurant', 'Impitoyable', 'Imprévu', 'Infatiguable', 'Irrégulier', 'de Jade', 'Luisant',
               'Lumineux', 'Mortel', 'Ocre', 'Pourpre', 'Robuste', 'Rubis', 'Sacré', 'Saint', 'Saphir', 'Solide', 'Sournois', 'Triomphant', 'Turquoise',
               'Vigoureux', 'Violent', 'de Précision',];

/*************************** Traductions françaises ***************************/
var Texts = {
  fr : {
// Terrain types
	'Anthropus Camp' : 'Camp Anthropus',
	'AnthropusCamp' : 'Camp Anthropus',
	'AntCamp' : 'Camp Anthropus',
	'City' : 'Cité',
	'Outpost' : 'Poste Extérieur',
	'Grassland' : 'Savane',
	'Swamp' : 'Marais',
	'Lake' : 'Lac',
	'Hill' : 'Colline',
	'Plain' : 'Plaine',
	'Mountain' : 'Montagne',
	'Forest' : 'Forêt',
	'Fog' : 'Nuage',
	// Buildings
	'Farm' : 'Ferme',
	'Home' : 'Maison',
	'Mine' : 'Mine',
	'Silo' : 'Silo',
	'Wall' : 'Remparts',
	'Quarry' : 'Carrière',
	'Factory' : 'Usine',
	'Rookery' : 'Volière',
	'Theater' : 'Théâtre',
	'Fortress' : 'Forteresse',
	'Garrison' : 'Garnison',
	'Sentinel' : 'Sentinelle',
	'Lumbermill' : 'Scierie',
	'DragonKeep' : 'Tour Dragon',
	'Metalsmith' : 'Forge',
	'MusterPoint' : 'Caserne',
	'StorageVault' : 'Entrepôt',
	'TrainingCamp' : 'Camp Entr.',
	'ScienceCenter' : 'Centre scient.',
	'OfficerQuarter' : 'Quartier Off.',
// Alliance
	'overlord' : 'Grand Seigneur',
	'lord' : 'Seigneur',
	'leader' : 'Leader',
// Troops
	'Porter' : 'Porteurs',
	'Conscript' : 'Conscrits',
	'Spy' : 'Espions',
	'Spies' : 'Espions',
	'Halberdsman' : 'Hallbardiers',
	'Halberdsmen' : 'Hallbardiers',
	'Minotaur' : 'Minotaures',
	'Longbowman' : 'Archers',
	'Longbowmen' : 'Archers',
	'SwiftStrikeDragon' : 'Dragons Rapides',
	'BattleDragon' : 'Dragons Guerriers',
	'ArmoredTransport' : 'Dirigeables',
	'Giant' : 'Géants',
	'FireMirror' : 'Miroirs de feu',
	'AquaTroop' : 'Soldats Aqua',
	'StoneTroop' : 'Ogres Granite',
	'FireTroop' : 'Sauriens magmatiques',
	'WindTroop' : 'Banshees',
	'GreatDragon' : 'Grand Dragon',
	'WaterDragon' : 'Dragon Aqua',
	'StoneDragon' : 'Dragon pierre',
	'FireDragon' : 'Dragon Feu',
	'WindDragon' : 'Dragon Eolien',
// special Troops names used by sentinel reports
	'Battle Dragons' : 'Dragons Guerriers',
	'Armored Transports' : 'Dirigeables',
	'Fire Mirrors' : 'Miroirs de feu',
	'Aqua Troops' : 'Soldats Aqua',
	'Stone Troops' : 'Ogres Granite',
	'Fire Troops' : 'Sauriens magmatiques',
	'Wind Troops' : 'Banshees',
// Troops abbreviations
	'Conscr' : 'Conscr',
	'Halbrd' : 'Halbrd',
	'Mino' : 'Mino',
	'LBM' : 'Archer',
	'SSDrg' : 'Rapide',
	'BatDrg' : 'DG',
	'ATrans' : 'Ballon',
	'FireM' : 'Miroir',
	'GrtDrg' : 'GrdDrag',
	'WatDrg' : 'DrgAqua',
	'StnDrg' : 'DrgPier',
	'FirDrg' : 'DrgFeu',
	'WinDrg' : 'DrgEol',
	'Fang' : 'GueAqua',
	'Ogre' : 'Ogre',
	'Saurien' : 'Saurien',
	'Banshee' : 'Banshee',
// Researches
	'Agriculture' : 'Agriculture',
	'Woodcraft' : 'Science du Bois',
	'Masonry' : 'Maçonnerie',
	'Alloys' : 'Alliages',
	'Mining' : 'Alliages',
	'Clairvoyance' : 'Clairvoyance',
	'Rapid Deployment' : 'Déploiment Rapide',
	'RapidDeployment' : 'Déploiment Rapide',
	'Weapons Calibration' : 'Calibration d\'Armes',
	'Ballistics' : 'Calibration d\'Armes',
	'Metallurgy' : 'Métallurgie',
	'Medicine' : 'Médecine',
	'Dragonry' : 'Etude Dragons',
	'Levitation' : 'Lévitation',
	'Mercantilism' : 'Mercantilisme',
	'Aerial combat' : 'Combat Aérien',
	'Aerial Combat' : 'Combat Aérien',
	'AerialCombat' : 'Combat Aérien',
// Objects
	'Blink' : 'Réducteur',
	'Hop' : 'Petit saut',
	'Skip' : 'Bond',
	'Jump' : 'Saut',
	'Leap' : 'Grande enjambée',
	'Bounce' : 'Saut dans le temps',
	'Bore' : 'Saut quantique',
	'Bolt' : 'Foudre',
	'Blast' : 'Explosion',
	'Blitz' : 'Eclair',
	'TestroniusPowder' : 'Poudre Testronius',
	'ForcedMarchDrops' : 'Gouttes pour Marche Forcée',
	'TranceMarchDrops' : 'Gouttes de Transe',
	'GreatDragonBodyArmor' : 'Armure du Grand Dragon',
	'GreatDragonHelmet' : 'Casque du Grand Dragon',
	'GreatDragonTailGuard' : 'Protège-queue du Grand Dragon',
	'GreatDragonClawGuards' : 'Griffes du Grand Dragon',
	'WaterDragonEgg' : 'Oeuf du Dragon Aquatique',
	'WaterDragonBodyArmor' : 'Armure du Dragon Aquatique',
	'WaterDragonHelmet' : 'Casque du Dragon Aquatique',
	'WaterDragonTailGuard' : 'Protège-queue du Dragon Aquatique',
	'WaterDragonClawGuards' : 'Griffes du Dragon Aquatique',
	'AquaTroopRespirator' : 'Recycleurs',
	'AquaTroopRespiratorStack100' : '100 Recycleurs',
	'AquaTroopRespiratorStack500' : '500 Recycleurs',
	'AquaTroopRespiratorStack1000' : '1000 Recycleurs',
	'StoneDragonEgg' : 'Oeuf du Dragon de Pierres',
	'StoneDragonBodyArmor' : 'Armure du Dragon de Pierres',
	'StoneDragonHelmet' : 'Casque du Dragon de Pierres',
	'StoneDragonTailGuard' : 'Protège-queue du Dragon de Pierres',
	'StoneDragonClawGuards' : 'Griffes du Dragon de Pierres',
	'StoneTroopItem' : 'Mandragores',
	'StoneTroopItemStack100' : '100 Mandragores',
	'StoneTroopItemStack500' : '500 Mandragores',
	'StoneTroopItemStack1000' : '1000 Mandragores',
	'FireTroopItem' : 'Runes volcaniques',
	'FireTroopItemStack100' : '100 Runes volcaniques',
	'FireTroopItemStack500' : '500 Runes volcaniques',
	'FireTroopItemStack1000' : '1000 Runes volcaniques',
	'GD Armor-1' : 'Armure GD',
	'GD Armor-2' : 'Casque GD',
	'GD Armor-3' : 'Queue GD',
	'GD Armor-4' : 'Griffes GD',
	'WaterDragonEgg' : 'Oeuf Aqua',
	'WD Armor-1' : 'Armure Aqua',
	'WD Armor-2' : 'Casque Aqua',
	'WD Armour-3' : 'Queue Aqua',
	'WD Armor-4' : 'Griffes Aqua',
	'Respirators' : 'Recycleurs',
	'Respirator-100' : '100 Recycleurs',
	'Respirator-500' : '500 Recycleurs',
	'Respirator-1000' : '1000 Recycleurs',
	'StoneDragonEgg' : 'Oeuf Pierres',
	'SD Armor-1' : 'Armure DdP',
	'SD Armor-2' : 'Casque DdP',
	'SD Armour-3' : 'Queue DdP',
	'SD Armor-4' : 'Griffes DdP',
	'Mandrakes' : 'Mandragores',
	'Mandrake-100' : '100 Mandragores',
	'Mandrake-500' : '500 Mandragores',
	'Mandrake-1000' : '1000 Mandragores',
	'FireDragonEgg' : 'Oeuf du Dragon de Feu',
	'FireDragonBodyArmor' : 'Armure du Dragon de Feu',
	'FireDragonHelmet' : 'Casque du Dragon de Feu',
	'FireDragonTailGuard' : 'Protège-queue du Dragon de Feu',
	'FireDragonClawGuards' : 'Griffes du Dragon de Feu',
	'FD Armor-1' : 'Armure DdF',
	'FD Armor-2' : 'Casque DdF',
	'FD Armour-3' : 'Queue DdF',
	'FD Armor-4' : 'Griffes DdF',
	'WindDragonEgg' : 'Oeuf du Dragon Eolien',
	'WindDragonBodyArmor' : 'Armure du Dragon Eolien',
	'WindDragonHelmet' : 'Casque du Dragon Eolien',
	'WindDragonTailGuard' : 'Protège-queue du Dragon Eolien',
	'WindDragonClawGuards' : 'Griffes du Dragon Eolien',
	'WiD Armor-1' : 'Armure DEo',
	'WiD Armor-2' : 'Casque DEo',
	'WiD Armour-3' : 'Queue DEo',
	'WiD Armor-4' : 'Griffes DEo',
	'WindTroopItem' : 'Serres de Banshee',
	'WindTroopItemStack100' : '100 Serres de Banshee',
	'WindTroopItemStack500' : '500 Serres de Banshee',
	'WindTroopItemStack1000' : '1000 Serres de Banshee',
	'Talons' : 'Serres',
	'Talons-100' : '100 Serres',
	'Talons-500' : '500 Serres',
	'Talons-1000' : '1000 Serres',
	'Runes' : 'Runes',
	'Runes-100' : '100 Runes',
	'Runes-500' : '500 Runes',
	'Runes-1000' : '1000 Runes',
	'Wood500K' : '500k Bois',
	'Wood250K' : '250k Bois',
	'Wood80K' : '80k Bois',
	'Wood50K' : '50k Bois',
	'Wood25K' : '25k Bois',
	'Wood10K' : '10k Bois',
	'Stone500K' : '500k Pierres',
	'Stone250K' : '250k Pierres',
	'Stone80K' : '80k Pierres',
	'Stone50K' : '50k Pierres',
	'Stone25K' : '25k Pierres',
	'Stone10K' : '10k Pierres',
	'Food500K' : '500k Nourriture',
	'Food250K' : '250k Nourriture',
	'Food80K' : '80k Nourriture',
	'Food50K' : '50k Nourriture',
	'Food25K' : '25k Nourriture',
	'Food10K' : '10k Nourriture',
	'Ore500K' : '500k Métal',
	'Ore250K' : '250k Métal',
	'Ore80K' : '80k Métal',
	'Ore50K' : '50k Métal',
	'Ore25K' : '25k Métal',
	'Ore10K' : '10k Métal',
	'Gold200K' : '200k Or',
	'Gold50K' : '50k Or',
	'Gold25K' : '25k Or',
	'Gold10K' : '10k Or',
	'AtlagenHarvestNanosDay' : 'Nanos Récolteur pour 1 Journée',
	'AtlagenHarvestNanosWeek' : 'Nanos Récolteur pour 1 Semaine',
	'DryadForestNanosDay' : 'Nanos Forestier pour 1 Journée',
	'DryadForestNanosWeek' : 'Nanos Forestier pour 1 Semaine',
	'OreadStoneNanosDay' : 'Nanos Minéral pour 1 Journée',
	'OreadStoneNanosWeek' : 'Nanos Minéral pour 1 Semaine',
	'EpeoradMetalsNanosDay' : 'Nanos Métallurgique pour 1 Journée',
	'EpeoradMetalsNanosWeek' : 'Nanos Métallurgique pour 1 Semaine',
	'DoubleTaxDayDeclaration' : 'Décrêt Journalier Double Impôts',
	'DoubleTaxWeekDeclaration' : 'Décrêt Hebdo. Double Impôts',
	'NanoCollectorWeek' : 'Collecteurs de Nanos pour 1 Semaine',
	'NanoCollectorDay' : 'Collecteurs de Nanos pour 1 Journée',
	'MassNullifier' : 'Destructeur de Masse',
	'CompletionGrant' : 'Permis de construire',
	'DragonHearts' : 'Coeurs des Dragons',
	'GlowingShields' : 'Boucliers illuminés',
	'CeaseFireTreaty' : 'Traité de Cessez le Feu',
	'DarkWarpDevice' : 'Dispositif de Projection',
	'ChartedWarpDevice' : 'Téléportation',
	'PseudonymGrant' : 'Décrêt Pseudonyme',
	'RenameProclamation' : 'Proclamation de baptême',
	'PurpleBones' : 'Les Os Pourpres',
	'CrimsonBull' : 'Taureau Pourpre',
	'FortunasTicket' : 'Ticket Fortuna',
	'FortunasGoldenTicket' : 'Médaillon de Fortuna',
	'OutpostWarp' : 'Projecteur de poste extérieur',
	'DivineLigth' : 'Lumière divine',
	'AncestralSeal' : 'Sceau Ancestral',
	'RaceChangeItem' : 'Renaissance tribale',
	'NanoCanisters' : 'Récipient Nano',
	'CompletionGrantPortfolio' : 'Porte-feuille de permis de construire',
	'NanoCrates' : 'Caisse Nano',
	'TimeTrickstersBag' : 'Le Sac de Chronos',
	'CurseWorms' : 'Malédiction des Vers',
	'CurseFrogs' : 'Malédiction des Grenouilles',
	'CurseBats' : 'Malédiction des Chauves-souris',
	'CurseLocusts' : 'Malédiction des Criquets',
	'NomadicRecruits' : 'Nomades',
	'DivineRations' : 'Rations divines',
// Ressources
	'Ressources' : 'Ressources',
	'food' : 'Nourriture',
	'wood' : 'Bois',
	'stone' : 'Pierre',
	'gold' : 'Or',
	'ore' : 'Métal',
// March status
	'marching' : 'En marche',
	'returning' : 'Retour',
	'encamped' : 'Renforcement',  
// Tabs
	'Tabs' : 'Onglets',
	'About' : 'A propos',
	'Info' : 'Info',
	'Wave' : 'Vague',
	'Multi' : 'Multi',
	'Search' : 'Carte',
	'Train' : 'Formation',
	'Build' : 'Bâti',
	'Research' : 'Labo',
	'Jobs' : 'Jobs',
	'Tower' : 'Guet',
	'Log' : 'Log',
	'Opts' : 'Opts',
// Info tab
	'refresh' : 'rafraîchir',
	'manifest' : 'manifeste',
	'reload DOA' : 'Actualiser DOA',
	'UNITS' : 'TROUPES',
	'GENERALS' : 'GENERAUX',
	'Marches' : 'Marches',
	'level' : 'niveau',
	'Building' : 'Construction',
	'Research' : 'Recherche',
	'Training' : 'Entraînement',
	'NONE' : 'AUCUN',
	'BUSY' : 'OCCUPE',
	'HIDING' : 'SANCTUAIRE',
	'DEFENDING' : 'EN DEFENSE',
	'Healing' : 'Guérison',
	'Dragon healing' : 'Dégâts causés au dragon',
	'Repairing' : 'Réparation',
	'Outpost damages' : 'Dégâts causés au poste extérieur',
	'Overview' : 'Vue d\'ensemble',
	'Inventory' : 'Inventaire',
	'Production' : 'Production',
	'SpeedUps' : 'Plus vite',
	'General' : 'Général',
	'Chest' : 'Coffre',
	'Arsenal' : 'Arsenal',
// Wave tab
	'Attack One Target in Waves' : 'Attaquer une cible en Vagues',
	'Attacks OFF' : 'Attaques OFF',
	'Attacks ON' : 'Attaques ON',
	'Target Coords' : 'Coords de la Cible',
	'Distance' : 'Distance',
	'Troops for Wave Attack' : 'Troupes pour Attaque en Vague',
	'Delete battle reports' : 'Supprimer les rapports de bataille',
	'Stop if any troops lost' : 'Arrêter si perte de troupes',
	'Delay Between attacks' : 'Délai entre les attaques',
	' to ' : ' à ',
	'seconds' : 'secondes',
	'Reset Stats' : 'Supprimer les Stats',
	'Run Time' : 'Temps d\'exécution',
	'Attacks' : 'Attaques',
	' Got ' : ' Obtenu ',
     ' per hour' : '/heure',
	'Wave sent to' : 'Vague envoyée à',
	'Owned' : 'Possédé',
	'Send a great dragon with each attack' : 'Envoyer un grand dragon avec chaque attaque',
	'No great dragon available' : 'Aucun grand dragon disponible',
// Multi tab
	'Attack One Target in Multiple waves' : 'Attaquer une cible en Vagues successives',
	'Troops for Primary Attack' : 'Troupes pour Attaque principale',
	'Troops for Secondary Attacks' : 'Troupes pour Attaques secondaires',
	'Primary sent to' : 'Vague principale envoyée à',
	'Secondary sent to' : 'Vague secondaire envoyée à',
	' spent. 2 min timeout (defense respawn)' : ' écoulé. Temporisation de 2 min (retour défense)',
	' spent. 1 min timeout (defense respawn)' : ' écoulé. Temporisation de 1 min (retour défense)',
// Spies tab
	'Spy One Target' : 'Espionner une cible en rafale',
	'<B>Warning: </b> The goal of this is to rot the mailbox of your target.To use only when absolutely necessary in order to avoid server overloading !!' : '<B>Warning:</b> Spéciale Gold Roger pour pourrir la boîte à messages d\'un joueur. A utiliser qu\'en cas d\'absolue nécessité pour ne pas saturer le serveur !!',
	'Spy number' : 'Nombre d\'espions',
	'Delete spy reports' : 'Supprimer les rapports d\'espionnage',
	'Spies done' : 'Espionnages effectués',
	'Spies ON' : 'Espionnage ON',
	'Spies OFF' : 'Espionnage OFF',
	'Spy sent to' : 'Espion(s) envoyé à',
// Autoattack tab
	'Anthropus Camp Auto-Attacks' : 'Attaques automatiques de Camps Anthropus',
	'Auto ON' : 'Attaque auto ON',
	'Auto OFF' : 'Attaque auto OFF',
	'Levels' : 'Niveaux',
	'Targets' : 'Cibles',
	'Config' : 'Config',
	'Stats' : 'Stats',
	'Auto-attack Camp levels' : 'Niveaux de camps pour attaque auto',
	'LEVELS' : 'NIVEAUX',
	'Enable' : 'Active',
	'Max Dist' : 'Dist Max',
	'Auto-attack Configuration' : 'Configuration Attaques auto',
	'Random delay between attacks' : 'Délai aléatoire entre 2 attaques',
	'Same target delay' : 'Délai entre 2 attaques d\'une même cible',
	'minutes' : 'minutes',
	'Log attacks' : 'Log attaques',
	'Maximum simultaneous marches' : 'Nombre maximum de marches simultanées',
	'Delete March Reports' : 'Supprimer les rapports de marche',
	'Auto-attack Camp targets' : 'Camps cibles pour attaque auto',
	'Dist' : 'Dist',
	'Coords' : 'Coords',
	'Level' : 'Niveau',
	'Last Attack' : 'Dernière attaque',
	'Attack Now' : 'Attaque immédiate',
	'Spy' : 'Espionner',
	'Sending one spy' : 'Envoi d\'un espion',
	'Auto-attack Stats' : 'Stats attaques auto',
	'Clear Stats' : 'Effacer stats',
	'Stats started at' : 'Stats démarrées le',
	'Resources' : 'Ressources',
	'Stats by level of ' : 'Stats par niveau de ',
	'Attacking' : 'Attaque lancée sur',
	'at' : 'au',
	'Attack sent to' : 'Attaque envoyée sur',
	'<B>Invalid delay(s)</b><BR><BR>First value must be between ' : '<B>Délai(s) invalide(s)</b><BR><BR>La première valeur doit être comprise entre ',
	' and 3600<BR>Second value must be at least 5 above the first value.' : ' et 3600<BR>La seconde valeur doit être à 5 au moins, au-dessus de la première valeur.',
	'<BR>The same target delay must be greater than 30 minutes.' : '<BR>Le délai entre 2 attaques d\'une même cible doit être supérieur ou égal à 30 minutes.',
	'Sending Attack' : 'Attaque lancée',
	'Scanning map for camps<BR>This should take about a minute' : 'Scanne de la carte pour camps<BR>Cela devrait prendre environ une minute',
	'<B>Bummer, there was an error while scanning the map.</b>' : '<B>Oups, une erreur s\'est produite pendant le scan de la carte.</b>',
	'Attack' : 'Attaque',
	'ERROR! (sendAttack is busy, no response from server?)' : 'ERREUR! (l\'envoi d\'attaques est bloqué, aucune réponse du serveur?)',
	'Distance must be between 1 and ' : 'Distance doit être comprise entre 1 et ',
	'Invalid # of troops' : 'Nombre de troupes invalide',
	'Maps' : 'Carte',
	'Auto-attack ' : 'Attaque automatique de ',
	'Auto-attack Configuration' : 'Configuration attaque auto',
// Jobs tab
	'Job Info' : 'Vue d\'ensemble',
	'Auto Upgrade Buildings' : 'Mise à jour bâtiments en automatique',
	'Auto Train' : 'Formation troupes en automatique',
	'Auto Research' : 'Recherches scientifiques en automatique',
	'Auto Build OFF' : 'Constr. Auto OFF',
	'Auto Build ON' : 'Constr. Auto ON',
	'City #' : 'Cité #',
	'Nothing to do, disabling auto-build.' : 'Rien à faire, construction auto désactivée.',
	'Building level' : 'Construction Niveau',
	'idle' : 'inoccupé',
	' at ' : ' à ',
	'Too many errors, disabling auto-build' : 'Trop d\'erreurs, construction auto désactivée.',
	'Auto Train ON' : 'Form. Auto ON',
	'Auto Train OFF' : 'Form. Auto OFF',
	'Too many errors, disabling auto-train' : 'Trop d\'erreurs, formation auto désactivée.',
	'Research ON' : 'Recherche ON',
	'Research OFF' : 'Recherche OFF',
	'Too many errors, disabling auto-research' : 'Trop d\'erreurs, recherche auto désactivée.',
	'Max level' : 'Niveau max',
	'Priority' : 'Priorité',
	'Current lev' : 'Niv. Actuel',
	'Cap' : 'Limite',
	'Invalid number of troops' : 'Nombre de troupes invalide',
	'Training Configuration' : 'Configuration de la formation auto',
	'Minimum Housing' : 'En fonction de la population disponible',
	'Minimum Resource Levels' : 'En fonction des ressources disponibles',
	'Troop Cap (Max Troops, 0 = no max)' : 'Limite de formation (Troupes max, 0 = pas de limite)',
// Search tab
	'Map Search' : 'Recherche sur la carte',
	'Search Coords' : 'Coords recherche',
	'Search max radius' : 'Rayon rech. max',
	'Refresh map data' : 'Rafraîchir données carte',
	'Player cities' : 'Cités',
	'Wildernesses' : 'Etendues sauvages',
	'Alliance' : 'Alliance',
	'All alliances' : 'Toutes alliances',
	'All players' : 'Tous les joueurs',
	'Refresh list' : 'Rafraîchir la liste',
	'Player cities list' : 'Liste des cités des joueurs',
	'Player name' : 'Nom joueur',
	'Might' : 'Force',
	'Evol' : 'Evol',
	'Type' : 'Type',
	'Min level' : 'Niveau min',
	'Max level' : 'Niveau max',
	'Unowned only' : 'Libres seulement',
	'Wildernesses list' : 'Liste des étendues sauvages',
	'Owner' : 'Propriétaire',
	'Scanning map for cities/wildernesses<BR>This should take about couple minutes<BR>according to the radius entered' : 'Scanne de la carte pour cités/ES<BR>Cela devrait prendre quelques minutes<BR>en fonction du radius saisi',
// Config tab
	'Options' : 'Options',
	'Enable window drag (move window by dragging top bar with mouse)' : 'Autoriser le déplacement de la fenêtre (en déplaçant la <BR>barre d\'onglets avec la souris)',
	'Features' : 'Fonctionalités',
	'Auto-collect resources from outpost(s) every' : 'Collecte automatique des outposts chaque',
	'Config' : 'Config',
	'Second' : 'Seconde',
	'Minute' : 'Minute',
	'Hour' : 'Heure',
	'Day' : 'Jour',
	'Auto-refresh Info tabs every second' : 'Rafraîchissement automatique de l\'onglet info chaque seconde',
	'Disable <B>Wave</B> tab' : 'Désactiver l\'onglet <B>Vague</B>',
	'Disable <B>Multi</B> tab' : 'Désactiver l\'onglet <B>Multi</B>',
	'Disable <B>Spy</B> tab' : 'Désactiver l\'onglet <B>Espionnage</B>',
	'Disable <B>Build</B> tab' : 'Désactiver l\'onglet <B>Construction</B>',
	'Disable <B>Train</B> tab' : 'Désactiver l\'onglet <B>Formation</B>',
	'Disable <B>Search</B> tab' : 'Désactiver l\'onglet <B>Carte</B>',
	'Disable <B>Research</B> tab' : 'Désactiver l\'onglet <B>Recherche</B>',
	'Disable <B>Battle</B> tab' : 'Désactiver l\'onglet <B>Simu</B>',
	'Disable <B>Alliance</B> tab' : 'Désactiver l\'onglet <B>Alliance</B>',
	'Disable <B>Log</B> tab' : 'Désactiver l\'onglet <B>Log</B>',
	'Max building level to reach :' : 'Niveau de bâtiment maximum à atteindre :',
	'Sound alerts' : 'Alertes sonores',
	'Sound configuration' : 'Configuration du son',
	'Game Options' : 'Options de jeu',
	'Script Options' : 'Options du script',
	'Enable verbose logging (only use when an error is suspected)' : 'Activer la journalisation détaillée (à utiliser uniquement quand une erreur est suspectée) ',
// Alliance tab
	'Alliance features' : 'Fonctionnalités Alliance',
	'Recipient : ' : 'Destinataire : ',
	'Members' : 'Membres',
	'Transport' : 'Transport',
	'Reinforcement' : 'Renforcement',
	'Alliance members list retrieved' : 'Liste des membres de l\'alliance récupérée',
	'Search for alliance members' : 'Recherche des membres de l\'alliance',
	'Error while retrieving the list of members' : 'Erreur lors de la récuparation de la liste des membres',
	'To be refreshed' : 'A rafraîchir',
	'Members list ' : 'Liste des membres ',
	'Role' : 'Rôle',
	'Troops for transport' : 'Troupes pour le transport',
	'Resources to transport' : 'Ressources à envoyer',
	'Send transport' : 'Envoyer le transport',
	'Troops for reinforcement' : 'Troupes pour le renforcement',
	'Send reinforcement' : 'Envoyer les renforts',
	'No resources to transport defined' : 'Aucune ressource à envoyer n\'est définie',
	'Sending transport' : 'Envoi de transport',
	'Transport sent to ' : 'Transport envoyé à ',
	'Sending reinforcement' : 'Envoi de renforts',
	'Reinforcement sent to ' : 'Renforcement envoyé à ',
	'Yoyo functionality' : 'Fonctionalité Yoyo',
	'Automatically recall transport 1 minute before delivery' : 'Rappel automatique du transport une minute avant livraison',
// Battle tab
	'Battle' : 'Simul',
	'Battle calculator' : 'Simulation bataille',
	'Clear all data' : 'Réinitialiser',
	'Clear log' : 'Effacer log',
	'You are' : 'Vous êtes',
	'Attacker' : 'Attaquant',
	'Defender' : 'Défenseur',
	'Available troops' : 'Troupes disponibles',
	'Great Dragons' : 'Grands Dragons',
	'None' : 'Aucun',
	'Ennemy General' : 'Général ennemi',
	' Stars' : ' Etoiles',
	'Results' : 'Résultats',
	'Battle report' : 'Rapport de bataille',
	'Battle forces' : 'Forces de bataille',
	'Units' : 'Unités',
	'Alives' : 'Survécu',
	'Killed' : 'Tués',
	' damages taken<BR>' : ' dommages subis<BR>',
	'% life lost' : '% vie perdue',
	'Upgrading items' : 'Objets d\'amélioration',
	'Ennemy research levels' : 'Niveaux de recherche de l\'ennemi',
	' deal ' : ' infligent ',
	' damages to ' : ' dommages à ',
	' in melee' : ' en corps-à-corps',
	' at range' : ' à distance',
	' (kill ' : ' (tuent ',
	' survivals)' : ' survivants)',
	' move to ' : ' vont à la position ',
	'<B>Attacker\'s move turn</B>' : '<B>Déplacement des unités offensives</B>',
	'<B>Attacker\'s attack turn</B>' : '<B>Attaque des unités offensives</B>',
	'<B>Defender\'s move turn</B>' : '<B>Déplacement des unités défensives</B>',
	'<B>Defender\'s attack turn</B>' : '<B>Riposte des unités défensives</B>',
	'Battle won !!' : 'Bataille gagnée !!',
	'Battle lost !!' : 'Bataille perdue !!',
	'<B>Start</B>' : '<B>Début</B>',
	'<B>End</B>' : '<B>Fin</B>',
	'Terrain length set to ' : 'Longueur du terrain initialisée à ',
	'Rules' : 'Règles',
	'Battle mechanics' : 'Mécanique des bataille',
// Tower tab
	'Sentinel tower' : 'Sentinelle / Tour de guet',
	'Tower configuration' : 'Configuration sentienlle',
	'Enable the sentinel tower' : 'Activer la sentinelle',
	'Check sentinel reports every ' : 'Contrôler les rapports de sentinelle chaque ',
	'Hide spy alerts' : 'Masquer les alertes d\'espionnage',
	'Do not show alerts obsolete since ' : 'Ne pas afficher les alertes obsolètes depuis ',
	'Play sound on incoming sentinel report' : 'Jouer un son à l\'arrivée de nouvelles alertes sentinelle',
	'Sound file' : 'Fichier son',
	'Repeat every ' : 'Répéter chaque ',
	'Play for ' : 'Jouer pendant ',
	'Alerts log' : 'Log alertes',
	'Arrival time' : 'Heure arrivée',
	'Warning for ' : 'Alerte pour ',
	'</B> and <B>' : '</B> et <B>',
	' in progress' : ' en cours',
	'one spy' : 'un espionnage',
	'several spies' : 'plusieurs espionnages',
	'one attack' : 'une attaque',
	'several attacks' : 'plusieurs attaques',
// Message deletion in config tab
	'Delete messages' : 'Suppression des messages',
	'Delete messages of this type :' : 'Suppression des messages de ce type :',
	'All types' : 'Tous les types',
	'Messages' : 'Messages',
	'Reports' : 'Rapports',
	'Game messages' : 'Message du jeu',
	'Player messages' : 'Messages de joueurs',
	'Sentinel messages' : 'Alertes sentinel',
	'Alliance messages' : 'Message de l\'alliance',
	'Camps/wilds attack reports' : 'Rapports d\'attaque de camps/ES',
	'Transport reports' : 'Rapports de transport',
	'Spy reports' : 'Rapports d\'espionnage',
	'Reinforcement reports' : 'Rapports de renforcement',
	'Battle reports' : 'Rapports de bataille',
	'Exception' : 'Exception',
	'Keep battle reports of my attacks on other players' : 'Gardez les rapports de bataille de mes attaques contre d\'autres joueurs',
	'Keep battle reports of attacks from other players' : 'Gardez les rapports de bataille des attaques d\'autres joueurs',
	'Date range' : 'Plage de dates',
	'All' : 'Tout',
	'From' : 'Du',
	'To' : 'Au',
	'Delete now' : 'Supprimer',
	'Select at least one type of message or report to delete' : 'Sélectionnez au moins un type de message ou de rapport à supprimer',
	'Invalid date' : 'Date invalide',
	'Invalid date range' : 'Plage de dates invalide',
	'Read page ' : 'Lecture de la page ',
	' of ' : ' sur ',
	'Message(s) deletion in progress' : 'Message(s) en cours de suppression',
	'Message(s) deleted' : 'Message(s) supprimé(s)',
// Feedback messages
	'No targets/troops available' : 'Aucune cible/troupe disponible',
	'No Troops Defined' : 'Aucune troupe définie',
	'Not enough ' : 'Pas assez de ',
	'Muster Point Full' : 'Caserne complète',
	'No Generals Available' : 'Aucun général disponible',
	'User-set maximum marches reached.' : 'Nombre maximum de marches atteind.',
// Error messages
	'<B>Error initializing DOA Power Tools mod by Jawz :</b><BR><BR>Unable to find SWF element' : '<B>Erreur lors de l\'initialisation de DOA Power Tools mod by Jawz :</b><BR><BR>Impossible de trouver l\'élément SWF',
	'Error starting DOA Power Tools mod by Jawz :<BR>' : 'Erreur lors du démarrage de DOA Power Tools mod by Jawz :<BR>',
	'<B>Error initializing DOA Power Tools mod by Jawz :</b><BR><BR>' : '<B>Erreur lors de l\'initialisation de DOA Power Tools mod by Jawz :</b><BR><BR>',
	'CANCEL' : 'ANNULER',
	'CONTINUE' : 'CONTINUER',
	'Automatic retry in ' : 'Ré-essai automatique dans ',
	'CANCEL Retry' : 'ANNULER Retry',
	'An error has ocurred' : 'Une erreur est survenue',
	'Troops lost! (' : 'Troupes perdues! (',
	'Attack Error: ' : 'Erreur lors de l\'attaque: ',
	'Spy Error: ' : 'Erreur lors de l\'espionnage: ',
	'Build Error: ' : 'Erreur lors de la construction: ',
	'Train Error: ' : 'Erreur lors de la formation: ',
	'Error: ' : 'Erreur: ',
  },
  /*************************** Fin Traductions françaises ***************************/

  /*************************** Swedish translations ***************************/
  sv : {
// Terrain types
	'Anthropus Camp' : 'Antropläger',
	'AnthropusCamp' : 'Antropläger',
	'AntCamp' : 'Antropläger',
	'City' : 'Stad',
	'Outpost' : 'Utpost',
	'Grassland' : 'Stäpp',
	'Swamp' : 'Träsk',
	'Lake' : 'Sjö',
	'Hill' : 'Kulle',
	'Plain' : 'Slätt',
	'Mountain' : 'Berg',
	'Forest' : 'Skog',
	'Fog' : 'Mystiska Moln',
// Alliance
	'overlord' : 'Overlord',
	'lord' : 'Herre',
	'leader' : 'Ledare',
// Buildings
	'Farm' : 'Gård',
	'Home' : 'Hem',
	'Mine' : 'Gruva',
	'Silo' : 'Silo',
	'Wall' : 'Mur',
	'Quarry' : 'Stenbrott',
	'Factory' : 'Fabrik',
	'Rookery' : 'Kläckeri',
	'Theater' : 'Teater',
	'Fortress' : 'Fästning',
	'Garrison' : 'Garnison',
	'Sentinel' : 'Vaktposttorn',
	'Lumbermill' : 'Sågverk',
	'DragonKeep' : 'Drakfålla',
	'Metalsmith' : 'Smedja',
	'MusterPoint' : 'Mönstringsplats',
	'StorageVault' : 'Magasin',
	'TrainingCamp' : 'Utbildningsläger.',
	'ScienceCenter' : 'Vetenskapscentrum.',
	'OfficerQuarter' : 'Officerskvarter.',
// Troops
	'Porter' : 'Bärare',
	'Conscript' : 'Rekryt',
	'Spy' : 'Spion',
	'Spies' : 'Spioner',
	'Halberdsman' : 'Hillebardman',
	'Halberdsmen' : 'Hillebardsmän',
	'Minotaur' : 'Minotaur',
	'Longbowman' : 'Bågskytt',
	'Longbowmen' : 'Bågskyttar',
	'SwiftStrikeDragon' : 'Attackdrake',
	'BattleDragon' : 'Stridsdrake',
	'ArmoredTransport' : 'Pansartransport',
	'Giant' : 'Jätte',
	'FireMirror' : 'Eldspegel',
	'AquaTroop' : 'Huggtandsfisk',
	'StoneTroop' : 'Granittroll',
	'FireTroop' : 'Lavakäkar',
	'WindTroop' : 'Banshees',
	'GreatDragon' : 'Jättedrake',
	'WaterDragon' : 'Vanddrake',
	'StoneDragon' : 'Stendrake',
	'FireDragon' : 'Elddrake',
	'WindDragon' : 'VindDrake',
// special Troops names used by sentinel reports
	'Battle Dragons' : 'Stridsdrake',
	'Armored Transports' : 'Pansartransport',
	'Fire Mirrors' : 'Eldspegel',
	'Aqua Troops' : 'Huggtandsfisk',
	'Stone Troops' : 'Granittroll',
	'Fire Troops' : 'Lavakäkar',
	'Wind Troops' : 'Banshees',
// Troops abbreviations
	'Conscr' : 'Conscr',
	'Halbrd' : 'Halbrd',
	'Mino' : 'Mino',
	'LBM' :  'LBM',
	'SSDrg' : 'SSD',
	'BatDrg' : 'BD',
	'ATrans' : 'AT',
	'FireM' : 'FM',
	'GrtDrg' : 'GrdDrag',
	'WatDrg' : 'DrgVatten',
	'StnDrg' : 'DrgSten',
	'FirDrg' : 'DrgEld',
	'WinDrg' : 'DrgVind',
	'Fang' : 'Fisk',
	'Ogre' : 'Troll',
	'Saurien' : 'Lava',
	'Banshee' : 'Banshee',
// Researches
	'Agriculture' : 'Jordbruk',
	'Woodcraft' : 'Trähantverk',
	'Masonry' : 'Mureri',
	'Alloys' : 'Legeringar',
	'Mining' : 'Legeringar',
	'Clairvoyance' : 'Klärvoajans',
	'Rapid Deployment' : 'Snabb Utveckling',
	'RapidDeployment' : 'Snabb Utveckling',
	'Weapons Calibration' : 'Vapenkallibrering',
	'Ballistics' : 'Vapenkallibrering',
	'Metallurgy' : 'Metallurgi',
	'Medicine' : 'Medicin',
	'Dragonry' : 'Drakkunskap',
	'Levitation' : 'Levitation',
	'Mercantilism' : 'Merkantilism',
	'Aerial combat' : 'Luftkrigföring',
	'Aerial Combat' : 'Luftkrigföring',
	'AerialCombat' : 'Luftkrigföring',
// Objects
	'Blink' : 'Blink',
	'Hop' : 'Kliv',
	'Skip' : 'Studs',
	'Jump' : 'Skutt',
	'Leap' : 'Hopp',
	'Bounce' : 'Språng',
	'Bore' : 'Skott',
	'Bolt' : 'Blixt',
	'Blast' : 'Dunder',
	'Blitz' : 'Storm',
	'TestroniusPowder' : 'Testoniuspulver',
	'ForcedMarchDrops' : 'Droppar För Tvångsmarch',
	'TranceMarchDrops' : 'Droppar För March i Trans',
	'GreatDragonBodyArmor' : 'Bröstpansar till Jättedraken',
	'GreatDragonHelmet' : 'Hjälm till Jättedraken',
	'GreatDragonTailGuard' : 'Svansskydd till Jättedraken',
	'GreatDragonClawGuards' : 'Kloskydd till jättedraken',
	'WaterDragonEgg' : 'Vattendraks ägg',
	'WaterDragonBodyArmor' : 'Bröstpansar till Vattendraken',
	'WaterDragonHelmet' : 'Hjälm till Vattendraken',
	'WaterDragonTailGuard' : 'Svansskydd till Vattendraken',
	'WaterDragonClawGuards' : 'Kloskydd till Vattendraken',
	'AquaTroopRespirator' : 'Huggtands andare',
	'AquaTroopRespiratorStack100' : '100 Huggtands andare',
	'AquaTroopRespiratorStack500' : '500 Huggtands andare',
	'AquaTroopRespiratorStack1000' : '1000 Huggtands andare',
	'StoneDragonEgg' : 'Stendraks ägg',
	'StoneDragonBodyArmor' : 'Bröstpansar till Stendraken',
	'StoneDragonHelmet' : 'Hjälm till Stendraken',
	'StoneDragonTailGuard' : 'Svansskydd till Stendraken',
	'StoneDragonClawGuards' : 'Kloskydd till Stendraken',
	'StoneTroopItem' : 'Skimrande alrunor',
	'StoneTroopItemStack100' : '100 Skimrande alrunor',
	'StoneTroopItemStack500' : '500 Skimrande alrunor',
	'StoneTroopItemStack1000' : '1000 Skimrande alrunor',
	'FireTroopItem' : 'Vulkaniska runor',
	'FireTroopItemStack100' : '100 Vulkaniska runor',
	'FireTroopItemStack500' : '500 Vulkaniska runor',
	'FireTroopItemStack1000' : '1000 Vulkaniska runor',
	'GD Armor-1' : 'Harnesk JD',
	'GD Armor-2' : 'Hjälm JD',
	'GD Armor-3' : 'Svans JD',
	'GD Armor-4' : 'Klo JD',
	'WaterDragonEgg' : 'Vattendraks ägg',
	'WD Armor-1' : 'Harnesk VD',
	'WD Armor-2' : 'Hjälm VD',
	'WD Armour-3' : 'Svans VD',
	'WD Armor-4' : 'Klo VD',
	'Respirators' : 'Huggtands andare',
	'Respirator-100' : '100 Huggtands andare',
	'Respirator-500' : '500 Huggtands andare',
	'Respirator-1000' : '1000 Huggtands andare',
	'StoneDragonEgg' : 'Stendraks ägg',
	'SD Armor-1' : 'Harnesk SD',
	'SD Armor-2' : 'Hjälm SD',
	'SD Armour-3' : 'Svans SD',
	'SD Armor-4' : 'Klo SD',
	'Mandrakes' : 'Skimrande Alrunor',
	'Mandrake-100' : '100 Skimrande alrunor',
	'Mandrake-500' : '500 Skimrande alrunor',
	'Mandrake-1000' : '1000 Skimrande alrunor',
	'FireDragonEgg' : 'Elddraks ägg',
	'FireDragonBodyArmor' : 'Harnesk till Elddraken',
	'FireDragonHelmet' : 'Hjälm till Elddraken',
	'FireDragonTailGuard' : 'Svansskydd till Elddraken',
	'FireDragonClawGuards' : 'Kloskydd till Elddraken',
	'FD Armor-1' : 'Harnesk ED',
	'FD Armor-2' : 'Hjälm ED',
	'FD Armour-3' : 'Svans ED',
	'FD Armor-4' : 'Klo ED',
	'WindDragonEgg' : 'Vind-draks ägg',
	'WindDragonBodyArmor' : 'Harnesk till Vind-draken',
	'WindDragonHelmet' : 'Hjälm till Vind-draken',
	'WindDragonTailGuard' : 'Svansskydd till Vind-draken',
	'WindDragonClawGuards' : 'Kloskydd till Vind-draken',
	'WiD Armor-1' : 'Harnesk ViD',
	'WiD Armor-2' : 'Hjälm ViD',
	'WiD Armour-3' : 'Svans ViD',
	'WiD Armor-4' : 'Klo ViD',
	'WindTroopItem' : 'Banshee Klor',
	'WindTroopItemStack100' : '100 Banshee Klor',
	'WindTroopItemStack500' : '500 Banshee Klor',
	'WindTroopItemStack1000' : '1000 Banshee Klor',
	'Talons' : 'Klor',
	'Talons-100' : '100 Klor',
	'Talons-500' : '500 Klor',
	'Talons-1000' : '1000 Klor',
	'Runes' : 'Vulkaniska runor',
	'Runes-100' : '100 Lava Runor',
	'Runes-500' : '500 Lava Runor',
	'Runes-1000' : '1000 Lava Runor',
	'Wood500K' : '500k Trä',
	'Wood250K' : '250k Trä',
	'Wood80K' : '80k Trä',
	'Wood50K' : '50k Trä',
	'Wood25K' : '25k Trä',
	'Wood10K' : '10k Trä',
	'Stone500K' : '500k Sten',
	'Stone250K' : '250k Sten',
	'Stone80K' : '80k Sten',
	'Stone50K' : '50k Sten',
	'Stone25K' : '25k Sten',
	'Stone10K' : '10k Sten',
	'Food500K' : '500k Mat',
	'Food250K' : '250k Mat',
	'Food80K' : '80k Mat',
	'Food50K' : '50k Mat',
	'Food25K' : '25k Mat',
	'Food10K' : '10k Mat',
	'Ore500K' : '500k Metall',
	'Ore250K' : '250k Metall',
	'Ore80K' : '80k Metall',
	'Ore50K' : '50k Metall',
	'Ore25K' : '25k Metall',
	'Ore10K' : '10k Metall',
	'Gold200K' : '200k Guld',
	'Gold50K' : '50k Guld',
	'Gold25K' : '25k Guld',
	'Gold10K' : '10k Guld',
	'AtlagenHarvestNanosDay' : 'Skördnanoer för 1 dag',
	'AtlagenHarvestNanosWeek' : 'Skördsnanoer för 1 vecka',
	'DryadForestNanosDay' : 'Skogsnanoer för 1 dag',
	'DryadForestNanosWeek' : ' Skogsnanoer för 1 vecka',
	'OreadStoneNanosDay' : 'Stennanoer för 1 dag',
	'OreadStoneNanosWeek' : 'Stennanoer för 1 vecka',
	'EpeoradMetalsNanosDay' : 'Metallnanoer för 1 dag',
	'EpeoradMetalsNanosWeek' : 'Metallnanoer för 1 vecka',
	'DoubleTaxDayDeclaration' : 'Beslut om dubbel skatt för 1 dag',
	'DoubleTaxWeekDeclaration' : 'Beslut om dubbel skatt för 1 vecka',
	'NanoCollectorWeek' : 'Nanoinsamlare för 1 vecka',
	'NanoCollectorDay' : 'Nanoinsamlare för 1 dag',
	'MassNullifier' : 'Massutplånare',
	'CompletionGrant' : 'Tillstånd för Slutförande',
	'DragonHearts' : 'Drakhjärta',
	'GlowingShields' : 'Skimmrande Sköldar',
	'CeaseFireTreaty' : 'Fördrag om Vapenvila',
	'DarkWarpDevice' : 'Mörk warpanordning',
	'ChartedWarpDevice' : 'Warpanordning med karta',
	'PseudonymGrant' : 'Pseudonymtillstånd',
	'RenameProclamation' : 'Kungörelse om namnbyte',
	'PurpleBones' : 'Lila Ben',
	'CrimsonBull' : 'Blodröd Tjur',
	'FortunasTicket' : 'Fortunas biljett',
	'FortunasGoldenTicket' : 'Fortunas medaljong',
	'OutpostWarp' : 'Utpostwarp',
	'DivineLigth' : 'Gudomligt ljus',
	'AncestralSeal' : 'Fädenesigill',
	'RaceChangeItem' : 'Rasförändring',
	'NanoCanisters' : 'Nanobehållare',
	'CompletionGrantPortfolio' : 'Slutförandeportfälj',
	'NanoCrates' : 'Nanolådor',
	'TimeTrickstersBag' : 'Kronospåse',
	'CurseWorms' : 'Förbannelse med maskar',
	'CurseFrogs' : 'Förbannelse med grodor',
	'CurseBats' : 'Förbannelse med fladdermöss',
	'CurseLocusts' : 'Förbannelse med gräshoppor',
	'NomadicRecruits' : 'Nomadiska rekryter',
	'DivineRations' : 'Rasförändring',
// Ressources
	'Ressources' : 'Resurser',
	'food' : 'Mat',
	'wood' : 'Trä',
	'stone' : 'Sten',
	'gold' : 'Guld',
	'ore' : 'Metall',
// March status
	'marching' : 'Marcherar',
	'returning' : 'Återkallar',
	'encamped' : 'Förstärkning',  
// Tabs
	'Tabs' : 'Flikar',
	'About' : 'Om',
	'Info' : 'Info',
	'Wave' : 'Vågor',
	'Multi' : 'Attack',
	'Search' : 'Sök',
	'Train' : 'Träna',
	'Build' : 'Bygg',
	'Research' : 'Forskning',
	'Jobs' : 'Jobb',
	'Tower' : 'Torn',
	'Log' : 'Log',
	'Opts' : 'Inställningar',
// Info tab
	'refresh' : 'Uppdatera',
	'manifest' : 'manifest',
	'reload DOA' : 'Uppdaterar DOA',
	'UNITS' : 'Trupper',
	'GENERALS' : 'Generaler',
	'Marches' : 'Marcher',
	'level' : 'Nivå',
	'Building' : 'Konstruktionsförlopp',
	'Research' : 'Forskningsförlopp',
	'Training' : 'Träningsförlopp',
	'NONE' : 'TOMT',
	'BUSY' : 'UPPTAGEN',
	'HIDING' : 'GÖM',
	'DEFENDING' : 'FÖRSVARAR',
	'Healing' : 'Helas',
	'Dragon healing' : 'Drakhälsa',
	'Repairing' : 'Reparerar',
	'Outpost damages' : 'Skada på utpost',
	'Overview' : 'Översyn',
	'Inventory' : 'Föremål',
	'Production' : 'Production',
	'SpeedUps' : 'Hastighetsökning',
	'General' : 'Allmänt',
	'Chest' : 'Kista',
	'Arsenal' : 'Arsenal',
// Wave tab
	'Attack One Target in Waves' : 'Attackera ett mål I vågor',
	'Attacks OFF' : 'Attack OFF',
	'Attacks ON' : 'Attack ON',
	'Target Coords' : 'Målkordinater',
	'Distance' : 'Avstånd',
	'Troops for Wave Attack' : 'Trupper för vågattacker',
	'Delete battle reports' : 'Ta bort Battle rapports',
	'Stop if any troops lost' : 'Avbryt vågor vid truppförlust',
	'Delay Between attacks' : 'Fördröjning mellan attacker',
	' to ' : ' Till ',
	'seconds' : 'sekunder',
	'Reset Stats' : 'Nollställ statistik',
	'Run Time' : 'Tidsförlopp',
	'Attacks' : 'Attacker',
	' Got ' : ' Byten ',
     ' per hour' : ' /timme',
	'Wave sent to' : 'Vågor skickade till',
	'Owned' : 'I ägo',
	'Send a great dragon with each attack' : 'Skicka en stor drake med varje attack',
	'No great dragon available' : 'Ingen stor drake tillgängliga',
// Multi tab
	'Attack One Target in Multiple waves' : 'Attackera ett mål I flera vågor',
	'Troops for Primary Attack' : 'Trupper I Huvudanfallet',
	'Troops for Secondary Attacks' : 'Trupper I påföljande anfallsvågor',
	'Primary sent to' : 'Huvudattacken skickad till',
	'Secondary sent to' : 'Påföljande attacken skickad till',
	' spent. 2 min timeout (defense respawn)' : ' Spenderat abort efter 2 min (försvar återskapat)',
	' spent. 1 min timeout (defense respawn)' : ' Spenderat abort efter 1 min (försvar återskapat)',
// Spies tab
	'Spy One Target' : 'Speja av 1 mål',
	'<B>Warning: </b> The goal of this is to rot the mailbox of your target. To use only when absolutely necessary in order to avoid server overloading !!' : '<B>Varning:</b> Användandet av denna flik kommer spamma Målet med meddelanden och bör endast användas om absolut nödvändigt för att undvika överbelastning av server!!',
	'Spy number' : 'Antal spioner',
	'Delete spy reports' : 'Radera spionrapporter',
	'Spies done' : 'Spion klar',
	'Spies ON' : 'Spionering ON',
	'Spies OFF' : 'Spionering OFF',
	'Spy sent to' : 'Spion skickad till',
// Autoattack tab
	'Anthropus Camp Auto-Attacks' : 'Auto attack på Antropläger',
	'Auto ON' : 'Auto ON',
	'Auto OFF' : 'Auto OFF',
	'Levels' : 'Nivå',
	'Targets' : 'Mål',
	'Config' : 'Konfig',
	'Stats' : 'Stats',
	'Auto-attack Camp levels' : 'Autoattack av antropnivåer',
	'LEVELS' : 'NIVÅ',
	'Enable' : 'Aktivera',
	'Max Dist' : ' Max Dist',
	'Auto-attack Configuration' : 'Konfigurera autoattacker',
	'Random delay between attacks' : 'Slumpmässigt interval mellan attacker',
	'Same target delay' : 'Fördröjning på samma mål',
	'minutes' : 'minuter',
	'Log attacks' : 'För attacklogg',
	'Maximum simultaneous marches' : 'Max. antal marcher',
	'Delete March Reports' : 'Radera Battle rapports',
	'Auto-attack Camp targets' : 'Auto attack på antroper',
	'Dist' : 'Avstånd',
	'Coords' : 'Kords',
	'Level' : 'Nivå',
	'Last Attack' : 'Senaste attack',
	'Attack Now' : 'Attackera Nu',
	'Spy' : 'Spion',
	'Sending one spy' : 'Skickar en spion',
	'Auto-attack Stats' : 'Autoattack Stats',
	'Clear Stats' : 'Radera stats',
	'Stats started at' : 'Stats loggades först vid',
	'Resources' : 'Resurser',
	'Stats by level of ' : 'Stats efter nivå ',
	'Attacking' : 'Attackerar',
	'at' : 'vid',
	'Attack sent to' : 'Attack skickad till',
	'<B>Invalid delay(s)</b><BR><BR>First value must be between ' : '<B>Ogiltigt intervall</b><BR><BR>Första värdet måste ligga mellan ',
	' and 3600<BR>Second value must be at least 5 above the first value.' : ' och 3600<BR>Andra värdet måste vara minst 5 högre än första.',
	'<BR>The same target delay must be greater than 30 minutes.' : '<BR>Fördröjning på samma mål måste vara minst 30 minuter.',
	'Sending Attack' : 'Skickar attack',
	'Scanning map for camps<BR>This should take about a minute' : 'Skannar kartan för läger<BR>Detta borde ta nån minut',
	'<B>Bummer, there was an error while scanning the map.</b>' : '<B>Skit, det påträffades ett fel vid skannandet.</b>',
	'Attack' : 'Attackera',
	'ERROR! (sendAttack is busy, no response from server?)' : 'Felmeddelande! (Attackkommandot är upptaget, inget svar från servern?)',
	'Distance must be between 1 and ' : 'Avståndet måste vara mellan 1 och ',
	'Invalid # of troops' : 'Inkorrekt # av trupper',
	'Maps' : 'Karta',
	'Auto-attack ' : 'Auto-attack ',
	'Auto-attack Configuration' : 'Auto-attack konfigurering',
// Jobs tab
	'Job Info' : 'Jobbinfo',
	'Auto Upgrade Buildings' : 'Auto uppgradering',
	'Auto Train' : 'Auto träning',
	'Auto Research' : 'Auto forskning',
	'Auto Build OFF' : 'Auto bygg OFF',
	'Auto Build ON' : 'Auto bygg ON',
	'City #' : 'Stad #',
	'Nothing to do, disabling auto-build.' : 'Inget kvar att bygga, slår av autofunktionen',
	'Building level' : 'Byggnads Nivå',
	'idle' : 'overksam',
	' at ' : ' hos ',
	'Too many errors, disabling auto-build' : 'För många fel, avbryter autobygge.',
	'Auto Train ON' : 'Auto träning ON',
	'Auto Train OFF' : 'Auto träning OFF',
	'Too many errors, disabling auto-train' : 'För många fel, avbryter autoträning.',
	'Research ON' : 'Recherche ON',
	'Research OFF' : 'Recherche OFF',
	'Too many errors, disabling auto-research' : 'För många fel, avbryter autoforskning.',
	'Max level' : 'Max nivå',
	'Priority' : 'Prioritet',
	'Current lev' : 'Aktuell nivå',
	'Cap' : 'Gränssnitt',
	'Invalid number of troops' : 'Fel antal trupper',
	'Training Configuration' : 'Konfig av autoträning',
	'Minimum Housing' : 'Triggas av minsta antal overksam bef.',
	'Minimum Resource Levels' : 'Triggas av tillgängliga resurser',
	'Troop Cap (Max Troops, 0 = no max)' : 'Avsluta träningen vid (Max. trupper, 0 = ingen gräns)',
// Search tab
	'Map Search' : 'Kart sök',
	'Search Coords' : 'Sök kords',
	'Search max radius' : 'Sök max. avstånd',
	'Refresh map data' : 'Uppdatera kartdata',
	'Player cities' : 'Stad',
	'Wildernesses' : 'Vildmark',
	'Alliance' : 'Allians',
	'All alliances' : 'Samtliga allianser',
	'All players' : 'Alla spelare',
	'Refresh list' : 'Uppdatera lista',
	'Player cities list' : 'Förteckning av spelarstäder',
	'Player name' : 'Spelar namn',
	'Might' : 'Makt',
	'Evol' : 'Evol',
	'Type' : 'Typ',
	'Min level' : 'Nivå min',
	'Max level' : 'Nivå max',
	'Unowned only' : 'Bara lediga',
	'Wildernesses list' : 'Vildmarks lista',
	'Owner' : 'Ägare',
	'Scanning map for cities/wildernesses<BR>This should take about couple minutes<BR>according to the radius entered' : 'Skanna kartan efter städer/vildmarker<BR>Detta bör ta någon minut<BR>enligt den angivna radien',
// Config tab
	'Options' : 'Alternativ',
	'Enable window drag (move window by dragging top bar with mouse)' : 'Aktivera fönsterdrag (flytta fönster genom att dra översta fältet med musen)',
	'Features' : 'Funktioner',
	'Auto-collect resources from outpost(s) every' : 'Automatisk insamling av resurser från utpost(erna) varje',
	'Config' : 'Config',
	'Second' : 'Sekund',
	'Minute' : 'Minut',
	'Hour' : 'Timma',
	'Day' : 'Dag',
	'Auto-refresh Info tabs every second' : 'Auto-refresh info flikar varje sekund',
	'Disable <B>Wave</B> tab' : 'Inaktivera <B>Våg</B>',
	'Disable <B>Multi</B> tab' : 'Inaktivera <B>Multi</B>',
	'Disable <B>Spy</B> tab' : 'Inaktivera <B>Spionage</B>',
	'Disable <B>Build</B> tab' : 'Inaktivera <B>Byggnation</B>',
	'Disable <B>Train</B> tab' : 'Inaktivera <B>Träning</B>',
	'Disable <B>Search</B> tab' : 'Inaktivera <B>Sök</B>',
	'Disable <B>Research</B> tab' : 'Inaktivera <B>Forskning</B>',
	'Disable <B>Battle</B> tab' : 'Inaktivera <B>Strid</B>',
	'Disable <B>Alliance</B> tab' : 'Inaktivera <B>Allians</B>',
	'Disable <B>Log</B> tab' : 'Inaktivera <B>Logg</B>',
	'Max building level to reach :' : 'Byggnaden har uppnått högsta nivå :',
	'Sound alerts' : 'Ljudsignaler',
	'Sound configuration' : 'Ljudinställning',
	'Game Options' : 'Spelalternativ',
	'Script Options' : 'Script alternativ',
	'Enable verbose logging (only use when an error is suspected)' : 'Aktivera detaljerad loggning (använd endast när ett fel misstänks)',
// Alliance tab
	'Alliance features' : 'Alliansen funktioner',
	'Recipient : ' : 'Mottagare : ',
	'Members' : 'Medlem',
	'Transport' : 'Transporter',
	'Reinforcement' : 'Förstärkning',
	'Alliance members list retrieved' : 'Förteckning över medlemmar i alliansen återvinns',
	'Search for alliance members' : 'Sök efter alliansens medlemmar',
	'Error while retrieving the list of members' : 'Fel vid hämtning av den förteckning över ledamöter',
	'To be refreshed' : 'att uppdatera',
	'Role' : 'Roll',
	'Members list ' : 'Medlemslista ',
	'Troops for transport' : 'Trupper för transport',
	'Resources to transport' : 'Resurser för att skicka',
	'Send transport' : 'skicka transporter',
	'Troops for reinforcement' : 'Trupper för förstärkning',
	'Send reinforcement' : 'Skicka förstärkning',
	'No resources to transport defined' : 'Ej tillräckligt med resurser',
	'Sending transport' : 'Skickar transporter',
	'Transport sent to ' : 'Transport skickat till ',
	'Sending reinforcement' : 'Skickar förstärkning',
	'Reinforcement sent to ' : 'Förstärkning skickat till ',
	'Yoyo functionality' : 'Yoyo funktionalitet',
	'Automatically recall transport 1 minute before delivery' : 'Automatiskt hämta transport 1 minut före leverans',
// Battle tab
	'Battle' : 'Strid',
	'Battle calculator' : 'Strids simulator',
	'Clear all data' : 'Rensa all info',
	'Clear log' : 'Rensa loggen',
	'You are' : 'Du är',
	'Attacker' : 'Anfallare',
	'Defender' : 'Försvarare',
	'Available troops' : 'Tillgängliga trupper',
	'Great Dragons' : 'Jätte Drakar',
	'None' : 'Ingen',
	'Ennemy General' : 'Fiende General',
	' Stars' : ' Stjärnor',
	'Results' : 'Resultat',
	'Battle report' : 'Strids rapport',
	'Battle forces' : 'Stridande trupper',
	'Units' : 'Trupper',
	'Alives' : 'Överlevande',
	'Killed' : 'Förlust',
	' damages taken<BR>' : ' Tagen Skada<BR>',
	'% life lost' : '% Förlorat liv',
	'Upgrading items' : 'Uppgradera saker',
	'Ennemy research levels' : 'Fiendens forsknings nivå',
	' deal ' : ' göra skada ',
	' damages to ' : ' skada till ',
	' in melee' : ' i närstrid',
	' at range' : ' på distans',
	' (kill ' : ' (Döda ',
	' survivals)' : ' överlevande)',
	' move to ' : ' Flytta till ',
	'<B>Attacker\'s move turn</B>' : '<B>Försvara med offensiva enheter</B>',
	'<B>Attacker\'s attack turn</B>' : '<B>Attackera med offensiva enheter</B>',
	'<B>Defender\'s move turn</B>' : '<B>Försvara med defensiva enheter</B>',
	'<B>Defender\'s attack turn</B>' : '<B>Attackera med defensiva enheter</B>',
	'Battle won !!' : 'Vunna strider !!',
	'Battle lost !!' : 'Förlorade strider !!',
	'<B>Start</B>' : '<B>Start</B>',
	'<B>End</B>' : '<B>Stopp</B>',
	'Terrain length set to ' : 'Terräng avstånd inställd på ',
	'Rules' : 'Regler',
	'Battle mechanics' : 'Strids mekanism',
// Tower tab
	'Sentinel tower' : 'Vakttorn',
	'Tower configuration' : 'Konfigurera Vakttorn ',
	'Enable the sentinel tower' : 'Aktivera vakttorn',
	'Check sentinel reports every ' : 'Kontrollera portvakt rapporter varje ',
	'Hide spy alerts' : 'Dölj spion varningar',
	'Do not show alerts obsolete since ' : 'Visa inte varningar föråldrat eftersom ',
	'Play sound on incoming sentinel report' : 'Spela upp ljud på ny varning från Sentinel',
	'Sound file' : 'Ljudfil',
	'Repeat every ' : 'Upprepa varje ',
	'Play for ' : 'Spela i ',
	'Alerts log' : 'Varning log',
	'Arrival time' : 'Ankomsttid',
	'Warning for ' : 'Varning för ',
	'</B> and <B>' : '</B> och <B>',
	' in progress' : ' pågår',
	'one spy' : 'en spion',
	'several spies' : 'flera spioner',
	'one attack' : 'en attack',
	'several attacks' : 'flera attacker',
// Message deletion in config tab
	'Delete messages' : 'Ta bort inlägg',
	'Delete messages of this type :' : 'Ta bort inlägg av denna typ :',
	'All types' : 'Alla typer',
	'Messages' : 'Meddelanden',
	'Reports' : 'Rapporter',
	'Game messages' : 'Meddelande av spelet',
	'Player messages' : 'Meddelanden av spelare',
	'Sentinel messages' : 'Varningar från Sentinel',
	'Alliance messages' : 'Alliance inlägg',
	'Camps/wilds attack reports' : 'Rapporter om läger/vildmarker attack',
	'Transport reports' : 'Transport rapporter',
	'Spy reports' : 'Spion rapporter',
	'Reinforcement reports' : 'Förstärkning rapporter',
	'Battle reports' : 'Slaget rapporter',
	'Exception' : 'Undantag',
	'Keep battle reports of my attacks on other players' : 'Håll stridsrapporter av mina attacker på andra spelare',
	'Keep battle reports of attacks from other players' : 'Håll slaget rapporter om attacker från andra aktörer',
	'Date range' : 'Datumintervall',
	'All' : 'Alla',
	'From' : 'Från',
	'To' : 'Till',
	'Delete now' : 'Radera nu',
	'Select at least one type of message or report to delete' : 'Välj minst en typ av meddelande eller rapport ta bort',
	'Invalid date' : 'Ogiltigt datum',
	'Invalid date range' : 'Ogiltigt datumintervall',
	'Read page ' : 'Läs sidan',
	' of ' : ' av ',
	'Message(s) deletion in progress' : 'Meddelande(n) radering pågår',
	'Message(s) deleted' : 'Meddelande(n) borttagna',
// Feedback messages
	'No targets/troops available' : 'Inga mål/trupper tillgängliga',
	'No Troops Defined' : 'Inga trupper tagna',
	'Not enough ' : 'Ej tillräckligt ',
	'Muster Point Full' : 'Träningskö full',
	'No Generals Available' : 'Generaler ej tillgängliga',
	'User-set maximum marches reached.' : 'Maximalt antal marcher uppnådda.',
// Error messages
	'<B>Error initializing DOA Power Tools mod by Jawz :</b><BR><BR>Unable to find SWF element' : '<B>Error initializing DOA Power Tools mod by Jawz :</b><BR><BR>Unable to find SWF element',
	'Error starting DOA Power Tools mod by Jawz :<BR>' : 'Error starting DOA Power Tools mod by Jawz :<BR>',
	'<B>Error initializing DOA Power Tools mod by Jawz :</b><BR><BR>' : '<B>Error initializing DOA Power Tools mod by Jawz :</b><BR><BR>',
	'CANCEL' : 'AVBRYT',
	'CONTINUE' : 'FORTSÄTT',
	'Automatic retry in ' : 'Automatisk fortsätta igen ',
	'CANCEL Retry' : 'Försök igen',
	'An error has ocurred' : 'Ett fel har inträffat',
	'Troops lost! (' : 'Trupper förlorade! (',
	'Attack Error: ' : 'Fel med anfall: ',
	'Spy Error: ' : 'Fel med spioner: ',
	'Build Error: ' : 'Fel med byggnation: ',
	'Train Error: ' : 'Fel med träning: ',
	'Error: ' : 'Fel: ',
  }
};
/*************************** End of Swedish translations ***************************/


// Terrain types
var kAnthropusCamp = translate ('Anthropus Camp');
var kAntCamp = translate ('AntCamp');
var kCity = translate ('City');
var kOutpost = translate ('Outpost');
var kGrassland = translate ('Grassland');
var kSwamp = translate ('Swamp');
var kLake = translate ('Lake');
var kHill = translate ('Hill');
var kPlain = translate ('Plain');
var kMountain = translate ('Mountain');
var kForest = translate ('Forest');
var kFog = translate ('Fog');

// Buildings
var kFarm = translate ('Farm');
var kHome = translate ('Home');
var kMine = translate ('Mine');
var kSilo = translate ('Silo');
var kWall = translate ('Wall');
var kQuarry = translate ('Quarry');
var kFactory = translate ('Factory');
var kRookery = translate ('Rookery');
var kTheater = translate ('Theater');
var kFortress = translate ('Fortress');
var kGarrison = translate ('Garrison');
var kSentinel = translate ('Sentinel');
var kLumbermill = translate ('Lumbermill');
var kDragonKeep = translate ('DragonKeep');
var kMetalsmith = translate ('Metalsmith');
var kMusterPoint = translate ('MusterPoint');
var kStorageVault = translate ('StorageVault');
var kTrainingCamp = translate ('TrainingCamp');
var kScienceCenter = translate ('ScienceCenter');
var kOfficerQuarter = translate ('OfficerQuarter');

// Troops
var kPorter = translate ('Porter');
var kConscript = translate ('Conscript');
var kSpy = translate ('Spy');
var kSpies = translate ('Spies');
var kHalberdsman = translate ('Halberdsman');
var kHalberdsmen = translate ('Halberdsmen');
var kMinotaur = translate ('Minotaur');
var kLongbowman = translate ('Longbowman');
var kLongbowmen = translate ('Longbowmen');
var kSwiftStrikeDragon = translate ('SwiftStrikeDragon');
var kBattleDragon = translate ('BattleDragon');
var kArmoredTransport = translate ('ArmoredTransport');
var kGiant = translate ('Giant');
var kFireMirror = translate ('FireMirror');
var kAquaTroop = translate ('AquaTroop');
var kStoneTroop = translate ('StoneTroop');
var kFireTroop = translate ('FireTroop');
var kWindTroop = translate ('WindTroop');
var kGreatDragon = translate ('GreatDragon');
var kWaterDragon = translate ('WaterDragon');
var kStoneDragon = translate ('StoneDragon');
var kFireDragon = translate ('FireDragon');
var kWindDragon = translate ('WindDragon');

// Troop abbreviations
var kConscr = translate ('Conscr');
var kHalbrd = translate ('Halbrd');
var kMino = translate ('Mino');
var kLBM = translate ('LBM');
var kSSDrg = translate ('SSDrg');
var kBatDrg = translate ('BatDrg');
var kATrans = translate ('ATrans');
var kFireM = translate ('FireM');
var kGrtDrg = translate ('GrtDrg');
var kWatDrg = translate ('WatDrg');
var kStnDrg = translate ('StnDrg');
var kFirDrg = translate ('FirDrg');
var kWinDrg = translate ('WinDrg');
var kFang = translate ('Fang');
var kOgre = translate ('Ogre');
var kSaurien = translate ('Saurien');
var kBanshee = translate ('Banshee');

// Tabs
var kAbout = translate ('About');
var kInfo = translate ('Info');
var kWave = translate ('Wave');
var kMulti = translate ('Multi');  // Jawz
var kSpyTab = translate ('Spy'); // Jawz
var kSearch = translate ('Search'); // Jawz
var kTrain = translate ('Train');
var kBuild = translate ('Build');
var kResearch = translate ('Research');
var kJobs = translate ('Jobs');
var kTower = translate ('Tower');
var kLog = translate ('Log');
var kOpts = translate ('Opts');

// Info tab
var kRefresh = translate ('refresh');
var kRefreshManifest = translate ('manifest');
var kRefreshDOA = translate ('reload DOA');
var kUnits = translate ('UNITS');
var kGenerals = translate ('GENERALS');
var kMarches = translate ('Marches');
var kLevel = translate ('level');
var kBuilding = translate ('Building');
var kResearch = translate ('Research');
var kTraining = translate ('Training');
var kDefending = translate ('DEFENDING');
var kSanctuary = translate ('HIDING');
var kNone = translate ('NONE');
var kBusy = translate ('BUSY');
var kRessources = translate ('Ressources');
var kHealing = translate ('Healing');
var kHealingDragon = translate ('Dragon healing');
var kRepair = translate ('Repairing');
var kRepairOutpost = translate ('Outpost damages');
var kOverview = translate ('Overview');
var kInventory = translate ('Inventory');

// Wave tab
var kWaveTitle = translate ('Attack One Target in Waves');
var kAttackOn = translate ('Attacks ON');
var kAttackOff = translate ('Attacks OFF');
var kTargetCoords = translate ('Target Coords');
var kDistance = translate ('Distance');
var kWaveTroops = translate ('Troops for Wave Attack');
var kDeleteBattleReports = translate ('Delete battle reports');
var kStopOnLoss = translate ('Stop if any troops lost');
var kDelayBetweenAttacks = translate ('Delay Between attacks');
var kTo = translate (' to ');
var kSeconds = translate ('seconds');
var kResetStats = translate ('Reset Stats');
var kGot = translate (' Got ');
var kPerHour = translate (' per hour');
var kRunTime = translate ('Run Time');
var kAttacks = translate ('Attacks');
var kWaveSentTo = translate ('Wave sent to');
var kOwned = translate ('Owned');
var kItmProduction = translate ('Production');
var kItmSpeedups = translate ('SpeedUps');
var kItmGeneral = translate ('General');
var kItmChest = translate ('Chest');
var kItmArsenal = translate ('Arsenal');
var kIncludeGreatDragon = translate ('Send a great dragon with each attack');
var kNoGreatDragon = translate ('No great dragon available');

// Multi tab
var kMultiTitle = translate ('Attack One Target in Multiple waves');
var kMultiTroops1 = translate ('Troops for Primary Attack');
var kMultiTroops2 = translate ('Troops for Secondary Attacks');
var kMultiSentTo1 = translate ('Primary sent to');
var kMultiSentTo2 = translate ('Secondary sent to');
var kMultiSpent1 = translate (' spent. 2 min timeout (defense respawn)');
var kMultiSpent2 = translate (' spent. 1 min timeout (defense respawn)');

// Spies tab
var kSpiesTitle = translate ('Spy One Target');
var kSpiesWarning = translate ('<B>Warning: </b> The goal of this is to rot the mailbox of your target.To use only when absolutely necessary in order to avoid server overloading !!');
var kDeleteSpyReports = translate ('Delete spy reports');
var kSpiesNumber = translate ('Spy number');
var kSpiesDone = translate ('Spies done');
var kSpiesOn = translate ('Spies ON');
var kSpiesOff = translate ('Spies OFF');
var kSpySentTo = translate ('Spy sent to');

// Autoattack tab
var kAutoTitle = translate ('Anthropus Camp Auto-Attacks');
var kAutoOn = translate ('Auto ON');
var kAutoOff = translate ('Auto OFF');
var kLevels = translate ('Levels');
var kTargets = translate ('Targets');
var kConfig = translate ('Config');
var kStats = translate ('Stats');
var kAutoAttackLevels = translate ('Auto-attack Camp levels');
var kLEVELS = translate ('LEVELS');
var kEnable = translate ('Enable');
var kMaxDist = translate ('Max Dist');
var kAutoAttackConfig = translate ('Auto-attack Configuration');
var kRandomDelay = translate ('Random delay between attacks');
var kSameTargetDelay = translate ('Same target delay');
//var kTwentyMinutes = translate ('20 minutes');
//var kOneHour = translate ('1 hour');
var kMinutes = translate ('minutes');
var kLogAttacks = translate ('Log attacks');
var kMaxMarches = translate ('Maximum simultaneous marches');
var kDeleteMarchReports = translate ('Delete March Reports');
var kAutoAttackTargets = translate ('Auto-attack Camp targets');
var kDist = translate ('Dist');
var kCoords = translate ('Coords');
var kAutoLevel = translate ('Level');
var kLastAttack = translate ('Last Attack');
var kAttackNow = translate ('Attack Now');
var kSpyNow = translate ('Spy');
var kAttackStatsTitle = translate ('Auto-attack Stats');
var kClearStats = translate ('Clear Stats');
var kStatsStarted = translate ('Stats started at');
var kResources = translate ('Resources');
var kStatsBy = translate ('Stats by level of ');
var kAttackingLevel = translate ('Attacking');
var kCampAt = translate ('at');
var kAttackSent = translate ('Attack sent to');
var kFirstValue = translate ('<B>Invalid delay(s)</b><BR><BR>First value must be between ');
var kSecondValue = translate (' and 3600<BR>Second value must be at least 5 above the first value.');
var kThirdValue = translate ('<BR>The same target delay must be greater than 30 minutes.');
var kSendingAttack = translate ('Sending Attack');
var kSendingSpy = translate ('Sending one spy');
var kScanningMap = translate ('Scanning map for camps<BR>This should take about a minute');
var kErrScanningMap = translate ('<B>Bummer, there was an error while scanning the map.</b>');
var kAttack1 = translate ('Attack');
var kErrSendAttack = translate ('ERROR! (sendAttack is busy, no response from server?)');
var kDistanceWarning = translate ('Distance must be between 1 and ');
var kTroopWarning = translate('Invalid # of troops');
var kMaps = translate('Maps');
var kAutoAttack = translate('Auto-attack ');
var kAutoAttackConfig = translate('Auto-attack Configuration');

var kSelectLevelsReminder = 'Use the Levels Tab to select attack areas';
var kClearLast = 'Clear last attack on current map';
var kClear = 'Clear';
var kClearAll = 'Clear last attack on all maps';
var kLevel1 = ' Level';
var kMapCategories = 'Map Categories';

// Jobs tab
var kJobInfo = translate ('Job Info');
var kAutoBuildTitle = translate ('Auto Upgrade Buildings');
var kAutoUpgradeBuildings = translate ('Auto Upgrade Buildings');
var kAutoTrainTitle = translate ('Auto Train');
var kAutoTrain = translate ('Auto Train');
var kAutoResearchTitle = translate ('Auto Research');
var kAutoResearch = translate ('Auto Research');
var kAutoBuildOn = translate ('Auto Build ON');
var kAutoBuildOff = translate ('Auto Build OFF');
var kCityNumber = translate ('City #');
var kNothingToDo = translate ('Nothing to do, disabling auto-build.');
var kBuildingLevel = translate ('Building level');
var kBuilding1 = translate ('Building');
var kIdle = translate ('idle');
var kAt = translate (' at ');
var kTooManyBuildErrs = translate ('Too many errors, disabling auto-build');
var kAutoTrainOn = translate ('Auto Train ON');
var kAutoTrainOff = translate ('Auto Train OFF');
var kTooManyTrainErrs = translate ('Too many errors, disabling auto-train');
var kAutoResearchOn = translate ('Research ON');
var kAutoResearchOff = translate ('Research OFF');
var kTooManyTrainErrs = translate ('Too many errors, disabling auto-research');
var kLevMax = translate ('Max level');
var kPriority = translate ('Priority');
var kActualLev = translate ('Current lev');
var kCap = translate ('Cap');
var kInvalidNumberTroops = translate('Invalid number of troops');
var kConfigTrain = translate ('Training Configuration');
var kMinHousing = translate ('Minimum Housing');
var kMinResourceLevels = translate ('Minimum Resource Levels');
var kTroopCap = translate ('Troop Cap (Max Troops, 0 = no max)');

// Search tab
var kSearchTitle = translate ('Map Search');
var kSearchCoords = translate ('Search Coords');
var kSearchRadius = translate ('Search max radius');
var kSearchRefreshMapData = translate ('Refresh map data');
var kSearchCities = translate ('Player cities');
var kSearchWilds = translate ('Wildernesses');
var kSearchAlliance = translate ('Alliance');
var kSearchAllAlliance = translate ('All alliances');
var kSearchAllPlayers = translate ('All players');
var kSearchRefreshList = translate ('Refresh list');
var kSearchCitiesList = translate ('Player cities list');
var kSearchPlayer = translate ('Player name');
var kSearchMight = translate ('Might');
var kSearchEvol = translate ('Evol');
var kSearchType = translate ('Type');
var kSearchMinLev = translate ('Min level');
var kSearchMaxLev = translate ('Max level');
var kSearchUnowned = translate ('Unowned only');
var kSearchWildsList = translate ('Wildernesses list');
var kSearchOwner = translate ('Owner');
var kScanningMap2 = translate ('Scanning map for cities/wildernesses<BR>This should take about couple minutes<BR>according to the radius entered');

// Config tab
var kOptions = translate ('Options');
var kEnableDrag = translate ('Enable window drag (move window by dragging top bar with mouse)');
var kFeatures = translate ('Features');
var kAutoCollectAt = translate ('Auto-collect resources from outpost(s) every');
var kConfig = translate ('Config');
var kConfS = translate ('Second');
var kConfM = translate ('Minute');
var kConfH = translate ('Hour');
var kConfD = translate ('Day');
var kTabs = translate ('Tabs');
var kAutoRefreshInfo = translate ('Auto-refresh Info tabs every second');
var kOptTabWave = translate ('Disable <B>Wave</B> tab');
var kOptTabMulti = translate ('Disable <B>Multi</B> tab');
var kOptTabSpy = translate ('Disable <B>Spy</B> tab');
var kOptTabBuild = translate ('Disable <B>Build</B> tab');
var kOptTabTrain = translate ('Disable <B>Train</B> tab');
var kOptTabSearch = translate ('Disable <B>Search</B> tab');
var kOptTabResearch = translate ('Disable <B>Research</B> tab');
var kOptTabBattle = translate ('Disable <B>Battle</B> tab');
var kOptTabAlliance = translate ('Disable <B>Alliance</B> tab');
var kOptTabLog = translate ('Disable <B>Log</B> tab');
var kMaxLevelBuild = translate ('Max building level to reach :');
var kSoundAlert = translate('Sound alerts');
var kConfigSound = translate('Sound configuration');
var kGameOptions = translate('Game Options');
var kScriptOptions = translate('Script Options');
var kEnableVerbose = translate('Enable verbose logging (only use when an error is suspected)');

// Alliance tab
var kAllianceFeatures = translate ('Alliance features');
var kRecipient = translate ('Recipient : ');
var kMembers = translate ('Members');
var kTransport = translate ('Transport');
var kReinforcement = translate ('Reinforcement');
var kAllianceListRetrieved = translate ('Alliance members list retrieved');
var kErrorGetMemberList = translate ('Error while retrieving the list of members');
var kSearchMembers = translate ('Search for alliance members');
var kToRefresh = translate ('To be refreshed');
var kMemberList = translate ('Members list ');
var kAllianceRole = translate ('Role');
var kTransTroops = translate ('Troops for transport');
var kTransRessources = translate ('Resources to transport');
var kSendTransport = translate ('Send transport');
var kReinforceTroops = translate ('Troops for reinforcement');
var kSendReinforcement = translate ('Send reinforcement');
var kNoRessourcesDefined = translate ('No resources to transport defined');
var kSendingTransport = translate ('Sending transport');
var kTransportSent = translate ('Transport sent to ');
var kSendingReinforcement = translate ('Sending reinforcement');
var kReinforcementSent = translate ('Reinforcement sent to ');
var kYoyo = translate ('Yoyo functionality');
var kRecallTransport = translate ('Automatically recall transport 1 minute before delivery');

// Battle tab
var kBattle = translate ('Battle');
var kBattleTitle = translate ('Battle calculator');
var kClearAll = translate('Clear all data');
var kClearLog = translate ('Clear log');
var kYouAre = translate ('You are');
var kAttacker = translate ('Attacker');
var kDefender = translate ('Defender');
var kBattleGetTroops = translate ('Available troops');
var kGreatDragons = translate ('Great Dragons');
var kNoDragon = translate ('None');
var kEnnemyGeneral = translate ('Ennemy General');
var kStars = translate (' Stars');
var kItems = translate ('Upgrading items');
var kResult = translate ('Results');
var kBattleLog = translate ('Battle report');
var kBattleTroops = translate ('Battle forces');
var kUnit = translate ('Units');
var kSurvival = translate ('Alives');
var kLosts = translate ('Killed');
var kDmgTaken = translate (' damages taken<BR>');
var kLostLife = translate ('% life lost');
var kEnnemyResearch = translate ('Ennemy research levels');
var kBatLogDeal = translate (' deal ');
var kDamageTo = translate (' damages to ');
var kBatLogInMelee = translate (' in melee');
var kBatLogAtRange = translate (' at range');
var kBatLogKill = translate (' (kill ');
var kBatLogSurvivals = translate (' survivals)');
var kBatLogMoveTo = translate (' move to ');
var kBatLogAttMoveTurn = translate ('<B>Attacker\'s move turn</B>');
var kBatLogAttackTurn = translate ('<B>Attacker\'s attack turn</B>');
var kBatLogDefMoveTurn = translate ('<B>Defender\'s move turn</B>');
var kBatLogDefattackTurn = translate ('<B>Defender\'s attack turn</B>');
var kBatLogWin = translate ('Battle won !!');
var kBatLogLost = translate ('Battle lost !!');
var kBatLogStart = translate ('<B>Start</B>');
var kBatLogEnd = translate ('<B>End</B>');
var kBatLogTerrain = translate ('Terrain length set to ');
var kRules = translate ('Rules');
var kBattleRules = translate ('Battle mechanics');

// Tower tab
var kTower = translate ('Tower');
var kSentinelTower = translate ('Sentinel tower');
var kTowerConfig = translate ('Tower configuration');
var kTowerEnable = translate ('Enable the sentinel tower');
var kTowerCheck = translate ('Check sentinel reports every ');
var kTowerNoSpy = translate ('Hide spy alerts');
var kTowerDelete = translate ('Do not show alerts obsolete since ');
var kTowerPlaySound = translate ('Play sound on incoming sentinel report');
var kSoundFile = translate ('Sound file');
var kRepeat = translate ('Repeat every ');
var kPlayLength = translate ('Play for ');
var kLogAlerts = translate ('Alerts log');
var kArrivalTime = translate ('Arrival time');
var kSentinelWarning = translate ('Warning for ');
var kSentinelAnd = translate ('</B> and <B>');
var kSentinelProgress = translate (' in progress');
var kSentinelSpy = translate ('one spy');
var kSentinelSpies = translate ('several spies');
var kSentinelAttack = translate ('one attack');
var kSentinelAttacks = translate ('several attacks');

// Message deletion in config tab
var kInfoDelMsg = translate ('Delete messages');
var kInfoDelMsgType = translate ('Delete messages of this type :');
var kInfoDelTypeAll = translate ('All types');
var kInfoDelTypeMsg = translate ('Messages');
var kInfoDelTypeRpt = translate ('Reports');
var kInfoMsgGame = translate ('Game messages');
var kInfoMsgPlyr = translate ('Player messages');
var kInfoMsgAlert = translate ('Sentinel messages');
var kInfoMsgAlli = translate ('Alliance messages');
var kInfoRptCamp = translate ('Camps/wilds attack reports');
var kInfoRptTrans = translate ('Transport reports');
var kInfoRptSpy = translate ('Spy reports');
var kInfoRptReinf = translate ('Reinforcement reports');
var kInfoRptBattle = translate ('Battle reports');
var kInfoKeepMsgA = translate ('Keep battle reports of my attacks on other players');
var kInfoKeepMsgD = translate ('Keep battle reports of attacks from other players');
var kInfoExcept = translate ('Exception');
var kInfoDateRange = translate ('Date range');
var kInfoDateAll = translate ('All');
var kInfoDateFrom = translate ('From');
var kInfoDateTo = translate ('To');
var kInfoDelNow = translate ('Delete now');
var kDeleteError = translate ('Select at least one type of message or report to delete');
var kDelInvalidDate = translate ('Invalid date');
var kDelInvalidDateRange = translate ('Invalid date range');
var kReadPage = translate ('Read page ');
var kReadPageOf = translate (' of ');
var kMsgDelInProgress = translate ('Message(s) deletion in progress');
var kMsgDelDone = translate ('Message(s) deleted');

// Feedback messages
var kNoTargetTroops = translate('No targets/troops available');
var kNoTroopsDefined = translate('No Troops Defined');
var kNotEnough = translate('Not enough ');
var kMusterPointFull = translate('Muster Point Full');
var kNoGenerals = translate('No Generals Available');
var kMaxMarchesReached = translate('User-set maximum marches reached.');

var kFatalSWF = translate ('<B>Error initializing DOA Power Tools mod by Jawz :</b><BR><BR>Unable to find SWF element');
var kStartupErr = translate ('Error starting DOA Power Tools mod by Jawz :<BR>');
var kInitErr = translate ('<B>Error initializing DOA Power Tools mod by Jawz :</b><BR><BR>');
var kCancel = translate ('CANCEL');
var kContinue = translate ('CONTINUE');
var kAutoRetry = translate ('Automatic retry in ');
var kCancelRetry = translate ('CANCEL Retry');
var kErrorOccured = translate ('An error has ocurred');
var kTroopsLost = translate ('Troops lost! (');
var kAttackErr = translate ('Attack Error: ');
var kSpyErr = translate ('Spy Error: ');
var kBuildErr = translate ('Build Error: ');
var kTrainErr = translate ('Train Error: ');
var kError = translate ('Error: ');

var kFatalSeedTitle = 'ERROR WHILST FETCHING DATA FROM SERVER';
var kFatalSeedMsg = 'Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again.';

// Gobal variables
var Tabs = {};
var currentName = kInfo;
var mainPop;
var CPopUpTopClass = classPrefix + poptopRnd;
var gAttScrollPos = 0;
var gMapScrollPos = 0;
var C = {};
C.attrs = {};
var gFormatTime = ':';
var gFormatDate = '/';
var soundRepeatTimer = null;
var soundStopTimer   = null;

//************************************
var OptionsDefaults = {
  popUp         : {open:true, drag:true, x:0, y:0},
  verboseLog    : {enabled:false},
  warningTower  : {enabled:false, soundUrl:DEFAULT_ALERT_SOUND_URL, repeat:true, playLength:17, repeatDelay:2, alarmActive:false, expireTime:0, delay:2, unit:60, sound:true, nospy:false, deleteReport:true, delayDelete:1, unitDelete:86400},
  objAttack     : {enabled:false, repeatTime:60, delayMin:5, delayMax:7, levelEnable:[], levelDist:[null,10,10,10,10,10,10,10,10,10,10], deleteObjAttacks:true, stopAttackOnLoss:true, logAttacks:false, maxMarches:10, troops:[], clearAllTargets:false},
  currentTab    : false,
  attackTab     : 0,
  mapTab        : 0,
  jobsTab       : 0,
  autoCollect   : {enabled:true, lastTime:0, delay:1, unit:360 },
  autoBuild     : {enabling:false, enabled:false, buildingEnable:[], buildCap:[]},
  autoResearch  : {enabled:false, researchEnable:[], researchCap:[]},
  autoTrain     : {enabled:false, trainingEnable:[], city:[]},
  messages      : {lastRead:0, missing:0},
  waves         : {enabled:false, iterationMin:5, iterationMax:7, maxMarches:10, stopOnLoss:true, deleteReports:false, targets:[], runTime:0, numAttacks:0, includeGreatDragon:false},
  multiple      : {enabled:false, iterationMin:5, iterationMax:7, maxMarches:10, stopOnLoss:true, deleteReports:false, targets:[], runTime:0, numAttacks:0, includeGreatDragon:false},
  spies         : {enabled:false, iterationMin:5, iterationMax:7, maxMarches:10, stopOnLoss:true, deleteReports:false, targets:[], runTime:0, numAttacks:0},
  objStats      : null,
  objMarches    : {},
  version       : {lastChecked:0, checkVersion:Version, lastVersion:Version},
  maps          : {enabled:false, repeatTime:60, delayMin:5, delayMax:7, levelEnable:[], levelDist:[null,10,10,10,10,10,10,10,10,10,10], deleteObjAttacks:true, stopAttackOnLoss:true, logAttacks:false, maxMarches:10},
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
 
  search        : {enabled:false, sortL:'0', targets:[], grassland:true, lake:true, hill:true, mountain:true, forest:true, nuage:true, plain:true, swamp:true, wildMinLevel:1, wildMaxLevel:10, unowned:false},
  battle        : {ennemyResearch:[], attackUnits:[], defenseUnits:[], battleLog:[], battleTurn:0, ownStatus:1 },
  alliance      : {lastUpdate:'', id:0, sortL:'0', troopsTrans:{}, resourceTrans:{}, troopsReinforce:{}, recallTransp:false},
  MsgDelete     : {type:0, msgGame:true, msgPlayer:true, msgSentinel:true, msgAlliance:true, rptAnthropus:true, rptTransport:true, rptSpy:true, rptBattle:true, rptReinforcement:true, rptExceptMyAttacks:true, rptExceptYourAttacks:true, dateAll:true},
  searchTab     : 0,
  allianceTab   : 0,
  battleTab     : 0,
  wavetab       : !ENABLE_WAVE_TAB,
  multitab      : !ENABLE_MULTI_TAB,
  spytab        : !ENABLE_SPY_TAB,
//  buildtab      : !ENABLE_BUILD_TAB,
//  traintab      : !ENABLE_TRAIN_TAB,
  searchtab     : !ENABLE_SEARCH_TAB,
  battletab     : !ENABLE_BATTLE_TAB,
  alliancetab   : !ENABLE_ALLIANCE_TAB,
  logtab        : !ENABLE_LOG_TAB,
};

var Styles = '\
  div {margin:0 ! important}\
  div.' + idTitle + ' {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#436;background-image:url(\'' + urlBackgroundLogo + '\')}\
  div.' + idSubtitle + ' {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#444}\
  div.' + idInput + ' {border:2px ridge yellow; background-color:#ffffee; padding:3px; font-size:11px}\
  div.' + idStatBox + ' {border:2px ridge black; background-color:#efefe0; padding:2px; font-size:11px}\
  div.short {height:7px;}\
  div.textsmall {font-size:10px}\
  .hiding {background-color: #2FAC2F; color: white; padding-left: 10px; padding-right: 10px; margin-right: -2px;}\
  .defending {background-color: #F80000; color: white; padding-left: 10px; padding-right: 10px; margin-right: -2px;}\
  div#qTip {padding: 3px; border: 1px solid #777; border-right-width: 2px; border-bottom-width: 2px; display: none; background: #999; color: #fff; font: bold 9px Verdana, Arial, sans-serif; text-align: left; position: absolute; z-index: 1000; font-size:11px;}\
  table.' + idTabPad + ' {width: 100%; font-size:11px}\
  table.' + idTabPad + ' tr td {border:none; background:none; white-space:nowrap; padding: 2px 2px; font-size:11px}\
  table.' + idTabPad + '2 {width: 100%; font-size:10px}\
  table.' + idTabPad + '2 tr td {border:none; background:none; white-space:nowrap; padding: 2px 0px; font-size:10px}\
  table.' + idTab + ' tr td {border:none; background:none; white-space:nowrap; padding: 0px 4px; font-size:11px}\
  table.' + idTab + '2 tr td {border:none; background:none; white-space:nowrap; padding: 4px 0px 4px 0px; font-size:11px}\
  table tr td.' + idTabLeft + ' {font-weight:bold; text-align:right; 5px; font-size:11px}\
  table tr td.' + idTabLeft + '2 {font-weight:bold; text-align:left; 5px; font-size:11px}\
  table tr td.' + idTabLeft + '3 {font-weight:bold; text-align:left; 5px; padding: 4px 0px 4px 0px; font-size:11px}\
  table tr td.' + idTableft + ' {text-align:left; 5px; font-size:11px}\
  table tr td.' + idTabSelectOpt + ' {text-align:left; 5px; font-size:9px}\
  table tr td.' + idTabRight + ' {text-align:right; font-size:11px}\
  table tr td.' + idTabRight + '2 {text-align:right; 5px; font-size:11px}\
  table.' + idTabLined + ' tr td {border-bottom:1px solid #ccc; background:none; white-space:nowrap; padding: 1px 4px 1px 4px;}\
  table.' + idTabLined + 'W tr td {border-bottom:1px solid #ccc; background:none; padding: 1px 4px 1px 4px;}\
  table tr.' + idTabHdr + '1 td {background-color:#dde; font-weight:bold}\
  table tr.' + idTabHdr + '2 td {font-weight:bold}\
  tr.' + idMarchOther + ' td {color:#888888}\
  tr.' + idMarchMine + ' td {color:#000000}\
  tr.pbretry_pt' + poptopRnd + ' td { background-color:#a00; color:#fff; border:none; height: 21px; padding:0px; }\
  tr.' + classPrefix + 'retry_pt' + poptopRnd + ' td { background-color:#a00; color:#fff; border:none; height: 21px; padding:0px; }\
  tr.' + idOwned + ' {background-color: #e80000; color:white}\
  table.' + idMainTab + ' {empty-cells:show; margin-top:5px }\
  table.' + idMainTab + ' tr td a {color:inherit }\
  table.' + idMainTab + ' tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
  table.' + idMainTab + ' tr td.spacer {padding: 0px 3px; border:none}\
  table.' + idMainTab + ' tr td.sel    {font-weight:bold; font-size:12px; border: 1px solid; border-style: solid solid none solid; background-color:#eed;}\
  table.' + idMainTab + ' tr td.notSel {font-weight:bold; font-size:12px; border: 1px solid; border-style: solid solid none solid; background-color:#0044a0; color:white; border-color:black;}\
  .' + classPrefix + 'CP .' + classPrefix + 'CPMain { background-color:#f8f8f8;background-image:url(\'' + urlBackgroundImage + '\');  padding:6px;}\
  .' + classPrefix + 'CP  {border:3px ridge #666; font-size:11px}\
  input.' + idButAttackOff + ' {width:130px; background-color:#0044a0; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.' + idButAttackOff + ':hover {width:130px; background-color:#1044a0; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.' + idButAttackOn + ' {width:130px; background-color:#770000; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.' + idButAttackOn + ':hover {width:130px; background-color:#870000; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.small {margin:0; padding-top:0; padding-bottom:0; padding-left:1px; padding-right:1px; font-size:10px}\
  input.short {width:30px}\
  input.' + idGreenButton + ' {width:130px; background-color:#009C1F; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.' + idGreenButton + ':active {width:130px; background-color:black; color:white; font-weight:bold; cursor:hand; cursor:pointer; }\
  input.' + idGreenButton + ':hover {width:130px; background-color:#2FAC2F; color:white; font-weight:bold; cursor:hand; cursor:pointer; }\
  .button {cursor:hand; cursor:pointer; border: 1px solid #006; background: #0044a0; color: white; padding: 2px; font-weight:bold; font-size:11px; border-style: solid solid none solid;}\
  span.' + idBoldRed + ' {color:#550000; font-weight:bold}\
  span.' + idBoldRed + '12 {color:#AA0000; font-weight:bold; font-size:12px}\
  span.red {color:#AA0000}\
  span.green {color:#009C1F}\
  input.butDef {background-color:#ffffee; color:#550000; font-weight:bold}\
  hr.thin {margin:0px; padding:0px}\
  #' + hdRnd + ' ul.tabs li.tab a.' + classPrefix + 'toolbutOn {background-color:#900 ! important; color:white ! important}\
  #' + hdRnd + ' ul.tabs li.tab a.' + classPrefix + 'toolbutOff {background-color:#ffc ! important; color:black ! important}\
  ';
//  tr.' + classPrefix + 'PopTop td { background-color:#dde; border:none; height: 21px;  padding:0px; }\


//var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
//var JSON2 = JSON; 

function pickRandomTitle(){
  var len1 = prefArr.length-1;
  var len2 = nameArr.length-1;
  var len3 = suffArr.length-1;
  var rnd1 = Math.ceil (Math.random() * len1);
  var rnd2 = Math.ceil (Math.random() * len2);
  var rnd3 = Math.ceil (Math.random() * len3);
  Title = prefArr[rnd1] +' '+ nameArr[rnd2] +' '+ suffArr[rnd2];
  kDOAVersionString = Title + ' -v ' + Version + ' ('+navigator.language+')';
  kFatalSWF = '"<B>Error initializing "'+ Title +'"</b><BR><BR>Unable to find SWF element"';
  kStartupErr = '"Unable to start "'+ Title +'"<BR>"';
  kInitErr = '"<B>Error initializing "'+ Title +'"</b><BR><BR>"';
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

function dtStartup (){
  clearTimeout (dtStartupTimer);
  pickRandomTitle();
  if (doatLoaded)
    return;
  //logit ('dtStartup'); 
  if (++startupCount > 10){
    dialogFatal (kFatalSWF);
    return;
  }
  try {  
    var swf = null;
    var obs = document.getElementsByTagName ('object');
    if (obs.length < 1){
      dtStartupTimer = setTimeout (dtStartup, 1000);
      return;
    }
    for (var i=0; i<obs.length; i++){
      if (obs[i].type && obs[i].type=='application/x-shockwave-flash'){
        swf = obs[i];
        getC (swf);
        if (C.attrs.apiServer)
          break;
      }
    }
    if (!C.attrs.apiServer){
      dtStartupTimer = setTimeout (dtStartup, 1000);
      return;
    }
    if (!Styles){
      dtStartupTimer = setTimeout (dtStartup, 1000);
      return;
    }  
  } catch (e){
    dtStartupTimer = setTimeout (dtStartup, 1000);
    return;
  }

  doatLoaded = true;
  try {
    WinLog.enabled = ENABLE_WINLOG;
    logit (inspect (C, 6, 1));

// Jawz - Added playercities
    Data.init({options:OptionsDefaults, log:[], recallMarches:[], msgsTower:[],
               targets:{radius:0, center:{x:0, y:0}, mapObjects:[], camps:[], cities:[], outposts:[], grasslands:[], swamps:[], lakes:[], hills:[], plains:[], mountains:[], forests:[]},
               BattleSimu:{ennemyResearch:[], attackItems:[], defenseItems:[], attackUnits:[], defenseUnits:[], battleLog:[], attDragLevel:0, defDragLevel:0, battleTurn:0, ennemyGeneral:5 },
               players:{memberships:[], memberEvol:[], playerEvol:[]},
               playercities:{radius:0, lastUpdate:'', center:{x:0, y:0}, cities:[]}});
// End Jawz - Added playercities

    actionLog ("* "+ Title +" v"+ Version +" Loaded");

    Seed.init(function (rslt) {
      if (rslt.ok) {
        if (Data.options.verboseLog.enabled)
          actionLog('Seed successfully initialised');
        checkInit(true);
      } else {
        dialogFatal('<B>' + kFatalSeedTitle + '</B><BR><BR>\
                    ' + kFatalSeedMsg + '<BR><BR>\
                    <A id="testLink" href="javascript:;">Bugs and Known Issues</A><BR><BR>\
                    <FONT color="#BF0000"><B> ' + rslt.errmsg + '</B></FONT>');
        return;
      }
    });
	
    function checkInit(status) {
      clearTimeout(initTimer);
      if (status === true) {
        initCount = initCount + 1;
        console.log(initCount);
      }
      if (initCount >= 2) {
        startScript();
      } else {
        initTimer = setTimeout(checkInit, 1000);
      }
    }

    function startScript() {    // TODO: check result, retry or disable tools?
    
      if (Data.options.popUp==null || Data.options.popUp.x==null|| Data.options.popUp.x=='' || isNaN(Data.options.popUp.x)){
        Data.options.popUp.x = 760; //screen.width - 540 + Math.floor(Math.random()*11);  // Jawz - Set to 763 instead of 760
        Data.options.popUp.y = 117 + Math.floor(Math.random()*11);  // Jawz - Set to 127 instead of 93
      }
      // Get client screen width and adjust script popup to suit
      var popupWidth = 540 + Math.floor(Math.random()*11);
      var popupMaxWidth = (popupWidth - 13); //.toString() + "px";
      mainPop = new CPopup (idPrefix, Data.options.popUp.x, Data.options.popUp.y, popupMaxWidth, 800, Data.options.popUp.drag, function () {
          tabManager.hideTab();
      });
      mainPop.getMainDiv().innerHTML = '<style>'+ Styles +'</style>';
      tabManager.init (mainPop.getMainDiv());
      Data.options.popUp.open = true;
      if (Data.options.popUp.open) {
        mainPop.show(true);
        tabManager.showTab();
      }
      actionLog ("* "+ Title +" v"+ Version +" Loaded");
      AutoCollect.init (); // CHECK
	  RecallMarch.init ();
      Messages.init ();
      simpleSoundPlayer.init();
      window.addEventListener('unload', onUnload, false);
      window.addEventListener ('unload', Data.onUnload, false);
    }
  } catch (e) {
    dialogFatal (kInitErr +  e);
    logit (inspect (e, 8, 1));
  }  
}

function onUnload (){
  Data.options.popUp = mainPop.getLocation();
  logit ('=============  onUnload: save win pos');
}

function dialogFatal(msg) {
  var pop = new CPopup('fatal', 200,300, 400,300, true); 
  pop.getMainDiv().innerHTML = '<STYLE>' + Styles + '</style><BR>' + msg ;
  pop.getTopDiv().innerHTML = '<B><CENTER>' + kError + '</center></b>' ;
  pop.show(true);
  document.getElementById(idSupportLink).addEventListener('click', redirect, false);
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
      Ajax.messageList ('all', 1, function (rslt){
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
Date.prototype.formatTime = function (){
  var curr_hour = this.getHours();
  var curr_min = this.getMinutes();
  var curr_sec = this.getSeconds();
  return (curr_hour < 10 ? '0' : '') + curr_hour + gFormatTime + (curr_min < 10 ? '0' : '') + curr_min + gFormatTime + (curr_sec < 10 ? '0' : '') + curr_sec;
}
Date.prototype.formatDate = function (){
  var curr_day = this.getDate();
  var curr_month = this.getMonth();
  curr_month++;
  var curr_year = this.getFullYear();
  return (curr_day < 10 ? '0' : '') + curr_day + gFormatDate + (curr_month < 10 ? '0' : '') + curr_month + gFormatDate + curr_year;
}

//*********************************** Seed package *********************************************
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
  troops : {stats:[]},
  greatDragons : {GreatDragon:[], WaterDragon:[], StoneDragon:[], FireDragon:[], WindDragon:[]},
  numGenerals : 0,
  serverTimeOffset : 0,

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
    var t = Seed;
    new MyAjaxRequest('cities/'+ cityId +'.json', { 'user%5Fid':C.attrs.userId, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, version:getVersion, 'dragon%5Fheart':C.attrs.dragonHeart }, function (rslt) {
      if (rslt.ok && !rslt.dat.errors) {
        //t.checkIncomingData(rslt); // CHECK: This needs to be improved
        if (rslt.dat.timestamp) {
          t.serverTimeOffset = rslt.dat.timestamp - (new Date().getTime() / 1000);
        }
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
    var greatDragonLvlsManifest = t.r.great_dragon_levels;
    var waterDragonLvlsManifest = t.r.water_dragon_levels;
    var stoneDragonLvlsManifest = t.r.stone_dragon_levels;
    var fireDragonLvlsManifest  = t.r.fire_dragon_levels;
    var windDragonLvlsManifest  = t.r.wind_dragon_levels;

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

    // Save research requirements
    for (var r=0; r<researchManifest.length; r++) 
      for (var l=0; l<researchManifest[r].levels.length; l++) 
        Seed.requirements.research[researchManifest[r].type].level[researchManifest[r].levels[l].level] = researchManifest[r].levels[l].requirements;

    // Initialise troops
    for (var m=0; m<troopManifest.length; m++)
      if (!Seed.requirements.troop[troopManifest[m].type])
        Seed.requirements.troop[troopManifest[m].type] =[];

    // Save troop requirements
    for (var m=0; m<troopManifest.length; m++) {
      Seed.requirements.troop[troopManifest[m].type] = troopManifest[m].requirements;
      //Seed.requirements.troop[troopManifest[m].type].load = troopManifest[m].stats.load;
    }

    // Save troop statistics
    for (var m=0; m<troopManifest.length; m++) {
      if (!Seed.troops.stats[troopManifest[m].type])
        Seed.troops.stats[troopManifest[m].type] =[];
      Seed.troops.stats[troopManifest[m].type] = troopManifest[m].stats;
    }
    // Save Great Dragons statistics by level
    for (var m=1; m<11; m++) {
      if (!Seed.greatDragons.GreatDragon[m])
        Seed.greatDragons.GreatDragon[m] = [];
      Seed.greatDragons.GreatDragon[m] = greatDragonLvlsManifest[m];
      if (!Seed.greatDragons.WaterDragon[m])
        Seed.greatDragons.WaterDragon[m] = [];
      Seed.greatDragons.WaterDragon[m] = waterDragonLvlsManifest[m];
      if (!Seed.greatDragons.StoneDragon[m])
        Seed.greatDragons.StoneDragon[m] = [];
      Seed.greatDragons.StoneDragon[m] = stoneDragonLvlsManifest[m];
      if (!Seed.greatDragons.FireDragon[m])
        Seed.greatDragons.FireDragon[m] = [];
      Seed.greatDragons.FireDragon[m] = fireDragonLvlsManifest[m];
      if (!Seed.greatDragons.WindDragon[m])
        Seed.greatDragons.WindDragon[m] = [];
      Seed.greatDragons.WindDragon[m] = windDragonLvlsManifest[m];
    }
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
    //  t.updateNotifyQueue[i]();
    //t.updateNotifyQueue = []; 
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
    else if (m.march_type == 'SpyMarch')
      m.march_type = 'Spy';
    else if (m.march_type == 'TransportMarch')
      m.march_type = 'Transport';
    if (m.status == 'retreating')
      m.status = 'returning';
    m.target = m.terrain_type;
    if (m.target == 'Bog')
      m.target = 'City' + m.destination_name;
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
      } else {  
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
//*********************************** Seed package *********************************************


function generalList (){
  var ret = {};
  var gens = Seed.cities[0].generals;
  for (var i=0; i<gens.length; i++)
    ret[gens[i].id] = gens[i].name +' ('+ gens[i].rank +')';
  return ret;
}


//*********************************** Data package *********************************************
var Data = {
  serverID : getServerId(),
  names : [],

  init : function (list){
    try {
      var t = Data;
      for (var p in list){
        t[p] = t.readMergeOptions (p, list[p]);
        t.names.push(p);
      }
    } catch (e) {
      alert ('This browser does not support LocalStorage');
      return false;
    }
  },

  onUnload : function (){
    var t = Data;
    for (var i=0; i<t.names.length; i++){
      localStorage.setItem(getServerId() + '_' + C.attrs.userId + '_' + t.names[i], JSON.stringify(t[t.names[i]]));
    }
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
  },  

}
//*********************************** Data package *********************************************


//*********************************** Ajax package *********************************************
var Ajax = {
  // cat: 'all, 'reports', ''
  messageList : function (cat, numpage, callback){
    if (!cat)
      cat = 'all';
    var npage = (numpage == -1 ? 1 : numpage);
    new MyAjaxRequest ('reports.json', {'user%5Fid':C.attrs.userId, 'dragon%5Fheart':C.attrs.dragonHeart, count:12, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, category:cat, page:npage, version:getVersion }, mycb, false);
    function mycb (rslt){
      if (rslt.ok && rslt.dat.result.success){
        if (numpage == -1 && callback)
          callback (rslt.dat.result.total);
        else if (callback)
          callback (rslt.dat.result.report_notifications);
      } else if (callback)
        callback (null);
    }
  },

  messageDetail : function (id, callback){
    new MyAjaxRequest ('reports/'+ id +'.json', {'user%5Fid':C.attrs.userId, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, version:getVersion, 'dragon%5Fheart':C.attrs.dragonHeart }, mycb, false);
    function mycb (rslt){
      if (rslt.ok && rslt.dat.result.success){
        if (callback)
          callback (rslt.dat.result);
      } else if (callback)
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
    } else {
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
    if (rslt.dat.result.success){
      Seed.jsonAddJob (rslt.dat.result.job);
    } else {
      rslt.ok = false;
      rslt.errmsg = rslt.dat.result.errors[0];
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
    } else {
      rslt.ok = false;
      rslt.errmsg = rslt.dat.result.errors[0];
    }
    if (callback)
      callback (rslt);
    }
 },

  marchBusy : 0,
  march : function (cityId, x, y, generalId, units, ownerId, callback){
    var t = Ajax;
    var p = {};
    ++t.marchBusy;
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
    new MyAjaxRequest ('cities/'+ cityId +'/marches.json', p, mycb, true);
    function mycb (rslt){
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

// Jawz : Spy march type
  marchSpy : function (cityId, x, y, units, ownerId, callback){
    var t = Ajax;
    var p = {};
    ++t.marchBusy;
    p['march%5Bmarch%5Ftype%5D'] = 'spy';
    p['march%5By%5D'] = y;
    p['%5Fmethod'] = 'post';
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
    p['march%5Bunits%5D'] = sendTroops; //JSON.stringify(u);     //ie: '{"Longbowman":500}';
    p['march%5Bx%5D'] = x;
    p['%5Fsession%5Fid'] = C.attrs.sessionId;
    p['user%5Fid'] = C.attrs.userId;
    p['dragon%5Fheart'] = C.attrs.dragonHeart;
    p['version'] = postVersion;
    new MyAjaxRequest ('cities/'+ cityId +'/marches.json', p, mycb, true);
    function mycb (rslt){
      --t.marchBusy;
      if (Data.options.verboseLog.enabled)
        actionLog('Ajax.marchSpy request was returned with a status of ' + rslt.ok);
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
          actionLog('Ajax.marchSpy request error: ' + rslt.dat.errors);
        rslt.ok = false;
        rslt.errmsg = rslt.dat.errors;
      }
      if (callback)
        callback (rslt);
    }
  },
// End Jawz : Spy march type

// Jawz : Transport march type
  TransportMarch : function (cityId, x, y, units, resources, ownerId, callback){
    var t = Ajax;
    var p = {};
    ++t.marchBusy;
    p['user%5Fid'] = C.attrs.userId; 
    p['march%5Btype%5D'] = 'TransportMarch';
    p['timestamp'] = parseInt(serverTime());
    var r = {}
    var trs = false;
    var sendResources = "%7B";
    for (var pr in resources)
      if (resources[pr] > 0) {
        r[pr] = resources[pr];
        if (trs == true )
          sendResources += "%2C";
        sendResources += "%22" + pr + "%22%3A" + resources[pr];
        trs = true;
      }
    sendResources += "%7D";
    p['march%5Bresources%5D'] = sendResources;
    p['march%5Bx%5D'] = x;
    p['%5Fmethod'] = 'post';
    p['march%5By%5D'] = y;
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
    p['dragon%5Fheart'] = C.attrs.dragonHeart;
    p['version'] = postVersion;
    p['%5Fsession%5Fid'] = C.attrs.sessionId;
    new MyAjaxRequest ('cities/'+ cityId +'/marches.json', p, mycb, true);
    function mycb (rslt){
      --t.marchBusy;
      if (Data.options.verboseLog.enabled)
        actionLog('Ajax.TransportMarch request was returned with a status of ' + rslt.ok);
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
          actionLog('Ajax.TransportMarch request error: ' + rslt.dat.errors);
        rslt.ok = false;
        rslt.errmsg = rslt.dat.errors;
      }
      if (callback)
        callback (rslt);
    }
  },
// End Jawz : Transport march type


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
      if (Data.options.verboseLog.enabled)
        actionLog('Ajax.marchRecall request was returned with a status of ' + rslt.ok);
      if (rslt.ok){
        if (rslt.dat.result.success){
          logit (inspect (rslt, 9, 1)); 
          //Seed.updateCity (rslt.dat.result);
        } else {
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
      } else {
        actionLog( "Auto-Collect Error: " + rslt.msg);
      }
      if (callback)
        callback (rslt.ok);
    }
  },
}
//*********************************** Ajax package *********************************************


//*********************************** Auto-collect package *********************************************
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
//*********************************** Auto-collect package *********************************************

var simpleSoundPlayer = {
  sentinelAlertCount : 0,
  oldAlertCount : 0,
  alertString   : null,
  checkInterval : null,
  init : function (){
    var t = simpleSoundPlayer;
    t.oldAlertCount = 0;
    if (Data.options.warningTower.enabled)
      t.checkInterval = setInterval (t.checkAlerts, 1000);
  },

  checkAlerts : function () {
    var t = simpleSoundPlayer;
    t.alertString = '';
    var attacks = 0;
    var spies = 0;
    t.oldAlertCount = t.sentinelAlertCount;
    if (Data.options.warningTower.enabled && Data.msgsTower.length != 0) {
      for (var i=0; i<Data.msgsTower.length; i++) {
        if (Data.msgsTower[i].type == 0) attacks++;
        if (Data.msgsTower[i].type == 1) spies++;
        if (Data.options.warningTower.nospy && attacks > 1) break;
        else if (!Data.options.warningTower.nospy && attacks > 1 && spies > 1) break;
      }
    }
    if (attacks + spies > 0) {
      t.sentinelAlertCount = attacks + spies;
      t.alertString += '<TR><TD colspan=4 width=100%"><DIV class=' + idSubtitle + ' style="background-color:#770000;"><font color=white>' + kSentinelWarning + '<B>';
      if (attacks == 0) {
        if (spies > 1) t.alertString += kSentinelSpies;
        else t.alertString += kSentinelSpy;
      } else if (attacks > 1) {
        if (spies > 1)  t.alertString += kSentinelSpies + kSentinelAnd + kSentinelAttacks;
        else if (spies == 1)  t.alertString += kSentinelSpy + kSentinelAnd + kSentinelAttacks;
        else t.alertString += kSentinelAttacks;
      } else {
        if (spies > 1)  t.alertString += kSentinelSpies + kSentinelAnd + kSentinelAttack;
        else if (spies == 1)  t.alertString += kSentinelSpy + kSentinelAnd + kSentinelAttack;
        else t.alertString += kSentinelAttack;
      }
      t.alertString += '</B>' + kSentinelProgress + '</font></DIV></TD></TR>';
    }
    if (Data.options.warningTower.sound && !Data.options.warningTower.alarmActive && t.sentinelAlertCount != t.oldAlertCount)
      t.soundTheAlert(Data.options.warningTower.repeat);
  },
  addPlayer : function (container, url) {
    var audio = '<object class="playerpreview" id="swfSoundPlayerObj" type="application/x-shockwave-flash" data="'+SWF_PLAYER_URL+'" width="0" height="0">\
                    <param name="movie" value="'+SWF_PLAYER_URL+'">\
                    <param name="AllowScriptAccess" value="always" />\
                    <param name="FlashVars" value="mp3='+url+'&amp;autoplay=1" />\
                 </object>';
    if (container) document.getElementById(container).innerHTML = audio;
  },
  removePlayer : function (container) {
    if (container)
      document.getElementById(container).innerHTML = "";
  },
  soundTheAlert : function (doRepeats){
    var t = simpleSoundPlayer;
    Data.options.warningTower.alarmActive = true;
    clearTimeout (soundStopTimer);
    clearTimeout (soundRepeatTimer);
    t.addPlayer(idPrefix + 'SwfPlyr', Data.options.warningTower.soundUrl);
    soundStopTimer = setTimeout (t.stopSoundAlerts, Data.options.warningTower.playLength*1000);
    if (doRepeats && Data.options.warningTower.repeat)
      soundRepeatTimer = setTimeout (function (){t.soundTheAlert(true)}, Data.options.warningTower.repeatDelay*60000);
  },
  stopSoundAlerts : function (){
    var t = simpleSoundPlayer;
    t.removePlayer(idPrefix + 'SwfPlyr');
    clearTimeout (soundStopTimer);
    //clearTimeout (soundRepeatTimer);
    Data.options.warningTower.alarmActive = false;
  },
}


//*********************************** Recall march package *********************************************
var RecallMarch = {
  init : function (){
    var t = RecallMarch;
    if (!Data.recallMarches || Data.recallMarches == undefined || Data.recallMarches == "")
      Data.recallMarches = [];
    t.timer = setTimeout (t.doit, 1000);
  },

  doit : function (){
    var t = RecallMarch;
    for (var m=0; m<Data.recallMarches.length; m++){
      if (Data.recallMarches[m] == null || Data.recallMarches[m] == undefined || !Data.recallMarches[m] || Seed.marches[Data.recallMarches[m].marchId] == null){
        logit ('***** March missing from seed: '+ Data.recallMarches[m].marchId); 
        delete (Data.recallMarches[m]);
      } else {
        logit ('Recall marches - doit ['+m+'] : '+inspect(Data.recallMarches[m]));
        var now = new Date().getTime() / 1000;
        logit ('check recall March : run_at = '+Data.recallMarches[m].run_at+', servertime = '+serverTime()+', now = '+now);
        if (Data.recallMarches[m].run_at <= now) {
          doRecallMarch (Data.recallMarches[m].cityId, Data.recallMarches[m].marchId);
          delete (Data.recallMarches[m]);
          break;
        }
      }
    }
    t.timer = setTimeout (t.doit, 1000);
    function doRecallMarch (cityId, marchId){
	  var t = RecallMarch;
	  var now = serverTime();
      var targMsg = 'Recall march ' + marchId;
      if (Data.options.verboseLog.enabled)
        actionLog(targMsg + ' attempted');
      new Ajax.marchRecall (cityId, marchId, function (rslt){
        if (rslt.ok) {
          if (Data.options.verboseLog.enabled)
            actionLog(targMsg + ' succeeded');
        } else {
          if (Data.options.verboseLog.enabled)
            actionLog(targMsg + ' failed and returned error: ' + rslt.errmsg);
        }
      });
    }
  },
}
//*********************************** Recall march package *********************************************

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

//*********************************** Info Tab *********************************************
Tabs.Info = {
  tabOrder    : INFO_TAB_ORDER,
  tabLabel    : kInfo,
  tabDisabled : !ENABLE_INFO_TAB,
  cont        : null,
  timer       : null,
  contentType : 0, // 0 = overview, 1 = inventory
  infoScrollPos : 0,

  init : function (div){
    var t = Tabs.Info;
    t.cont = div;

    div.innerHTML = '<DIV class=' + idTitle + '><TABLE width=100%><TR><TD colspan=4 width=100%>' + kDOAVersionString +'</TD></TR>\
      <TR><TD width=30%><a href="'+ wWebSite + '" target="_blank" style="color:#FFFFFF;text-decoration:none;">'+ kWebSite +'</a></TD>\
          <TD width=30%><a href="'+ wWikiLink + '" target="_blank" style="color:#FFFFFF;text-decoration:none;">'+ kWikiLink +'</a></TD>\
          <TD width=30%><a href="'+ wForumLink + '" target="_blank" style="color:#FFFFFF;text-decoration:none;">'+ kForumLink +'</a></TD>\
      </TR></TABlE></div>\
      <TABLE width=100%><TR><TD width=33%><INPUT class=' + idGreenButton + ' type=submit value="' + kRefresh + '" id=' + infoPrefix + 'Refresh></input>\
      </td><TD align=center width=33%><INPUT class=' + idGreenButton + ' id=' + infoPrefix + 'ReloadTools type=submit value="' + kRefreshDOA +'" \></input>\
      </td><TD align=right width=33% style="font-weight:bold;color:#000000;"><SPAN id=' + infoPrefix + 'Gmt></span></td></tr></table>\
      <DIV id=' + infoPrefix + 'Header style="margin-top:10px !important; height:690px; max-height:690px; overflow-y:auto">\
      <TABLE width=100% align=center><TR><TD>\
      <INPUT class=button type=submit value="' + kOverview + '" id=' + infoPrefix + 'Overview></INPUT>\
      <INPUT class=button type=submit value="' + kInventory + '" id=' + infoPrefix + 'Inventory></INPUT>\
      </TD></TR></TABLE>\
      <DIV id=' + infoPrefix + 'Cont style="margin-top:1px !important; height:665px; max-height:665px; overflow-y:auto"></div></div>';

    document.getElementById(infoPrefix + 'Refresh').addEventListener ('click', t.refresh, false);
    document.getElementById(infoPrefix + 'ReloadTools').addEventListener ('click', reloadTools, false);
    document.getElementById(infoPrefix + 'Overview').addEventListener ('click', t.tabInfoOverview, false);
    document.getElementById(infoPrefix + 'Inventory').addEventListener ('click', t.tabInfoInventory, false);	
    // Restore the views
    t.contentType = Data.options.infoTab;
//    if (t.contentType == 2)
//        document.getElementById(infoPrefix + 'Content').scrollTop = gAttScrollPos;
    t.show();
  },

  show : function (){
    var t = Tabs.Info;
    switch (isEmpty(t.contentType, 0)) {
      case 0: t.tabInfoOverview(); break;
      case 1: t.tabInfoInventory(); break;
    }
  },
  hide : function (){
    var t = Tabs.Info;
    clearTimeout (t.timer);
  },

  tabInfoOverview : function (){
    var t = Tabs.Info;
    clearTimeout (t.timer);
    //logit (inspect (Seed.s, 8, 1));

    setSubTab(infoPrefix + 'Inventory', false);
    setSubTab(infoPrefix + 'Overview', true);
    t.contentType = 0;
    Data.options.infoTab = t.contentType;

    var city = Seed.cities[0];

    var m = '<DIV class=' + idStatBox + '>';
    m += cityTitle(0);
    m += '<TABLE style="margin-top:3px" width=100%>\
      <TR bgcolor=#dde align=center><TD style="border-right: 1px solid; border-bottom: 1px solid;"><B>' + kUnits + '</b></td>\
      <TD style="border-bottom: 1px solid; padding-left:7px"><B>' + kGenerals + '</b></td></tr>\
      <TR valign=top align=center><TD width=60% style="border-right: 1px solid;">';
    // UNITS
    m += '<TABLE class=' + idTabPad + '>';
    for (var i=0; i<Names.troops.names.length; i++){
      var name = Names.troops.names[i][1];
      if (name=='GreatDragon' || name=='WaterDragon' || name=='StoneDragon' || name=='FireDragon' || name=='WindDragon')
        continue;
      var num = city.units[name];
      if (!num) {
        num = 0;
      // Jawz - Added number formatting
      } else {
        num = nombreFormate(num,' ');
      }
      // End Jawz - Added number formatting

      var marchNum = 0;
      for (var p in city.marches)
        for (var q in city.marches[p].units)
          if (q == name)
            marchNum += city.marches[p].units[q];
      var marchStr = (marchNum > 0) ? '<B>' + nombreFormate(marchNum,' ') + '</b>' : '';
      m += '<TR><TD class=' + idTabLeft + ' width=50%>'+ translate(name) +':</td><TD align=right width=24%>'+ num +'</td><TD align=right width=26%>'+ marchStr +'</td></tr>';
    }
    m += '</table></td><TD width=40% style=" padding-left:7px">';

    // GENERALS
    m += '<TABLE class=' + idTabPad + '>';
    var loc = '';
    for (var ig=0; ig<city.generals.length; ig++){
      if (Seed.numMarches)
        for (pm in Seed.marches)
          // The general object will be null if the march is a transport
          if (Seed.marches[pm].march_type != "Transport" && Seed.marches[pm].march_type != "Spy")
            try {
              if (city.generals[ig].name == Seed.marches[pm].general.first_name)
                loc = Seed.marches[pm].x + ',' + Seed.marches[pm].y;
            }
            catch (e) {
              actionLog('Err: general first_name not available' + e.name + ' ' + e.message);
            }
      m += '<TR><TD align=right>'+ city.generals[ig].name +' ('+ city.generals[ig].rank +')</td><TD width=75%><B>'+ (city.generals[ig].busy?loc:'') +'</B></td></tr>';
    }

    m += '</table></td></tr></table><BR><TABLE class=' + idTabPad + '>' + dispProtection() + simpleSoundPlayer.alertString +
         '<TR><TD class=' + idTabLeft + ' width=20%>' + kMarches + ':</td><TD width=30%>'+ Seed.numMarches +'</td>\
             <TD class=' + idTabLeft + ' width=20%>' + kSearchWilds + ':</TD><TD width=30%>' + dispWildsCount() + '</TD></tr>'
        + dispDragonJob(0) + dispBuildingJob(0) + dispResearchJob(0) + dispTrainingJobs(0) + '</td></tr>';
    m += '</table></div>';  // End Jawz - Added border

    // outposts ...
    if (Seed.cities.length > 0){
      for (var i=1; i<Seed.cities.length; i++){
        m += '<DIV class=' + idStatBox + ' style="margin-top:6px !important">'+ cityTitle(i) + '<TABLE class=' + idTabPad + '>'  // Jawz - added border
          + dispDragonJob(i) + dispOutpostJob(i) + dispBuildingJob(i) + dispTrainingJobs(i) + '</td></tr></table>';
          m += '</div>';  // End Jawz - Added border
      }
    }
    document.getElementById(infoPrefix + 'Cont').innerHTML = m; 
    document.getElementById(infoPrefix + 'Cont').scrollTop = t.infoScrollPos;
    document.getElementById(infoPrefix + 'Cont').addEventListener('scroll', onScroll, false);
    var now = new Date();  

// Jawz - Modif pour heure courante
//    now.setTime(now.getTime() + (now.getTimezoneOffset()*60000));
//    document.getElementById(infoPrefix + 'Gmt').innerHTML = now.toTimeString().substring (0,8) +' GMT';
    now.setTime(now.getTime() + (Seed.serverTimeOffset * 60000));
    document.getElementById(infoPrefix + 'Gmt').innerHTML = now.toTimeString().substring (0,8);
// End Jawz

    if (Data.options.autoRefreshInfo) t.timer = setTimeout (t.refresh, 1000);
    else t.timer = setTimeout (t.show, 1000);

    function onScroll (e){
      if (t.contentType == 0)
        t.infoScrollPos = document.getElementById(infoPrefix + 'Cont').scrollTop;
    }

    function dispProtection (){
      var m = '';
      if (Seed.cities[0].protected){
        var expir = timestr(Seed.boosts.safety - serverTime(), true);
        m += '<TR><TD width=100% colspan=4><DIV class=' + idSubtitle + ' style="background-color:#0044a0;"><font color=yellow>Protection : '+ expir +'</font></div></td></tr>';
      }
      return m;
    }

    function dispWildsCount (){
      var max = isEmpty(Seed.s.max_wildernesses, 0);
      var cur = isEmpty(Seed.s.player_wildernesses.length, 0);
      var m = cur 
      var m = (cur < max) ? '<SPAN class=' + idBoldRed + '12>'+ cur +'</span>' : cur;
      m += ' / ' + max;
      return m;
    }
    function dispDragonJob (cityIdx){
      var m = '';
      var job = getDragonJob (cityIdx);
      if (job && job.run_at > serverTime()) {
        m += '<TR><TD class=' + idTabLeft + ' width=20%>' + kHealing + ':</td>';
        m += '<TD width=50% colspan=2><SPAN class=' + idBoldRed + '>'+ kHealingDragon + '</span></td><TD width=30%>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
      }
      return m;
    }
    function dispOutpostJob (cityIdx){
      var m = '';
      var job = getOutpostJob (cityIdx);
      if (job && job.run_at > serverTime()) {
        m += '<TR><TD class=' + idTabLeft + ' width=20%>' + kRepair + ':</td>';
        m += '<TD width=50% colspan=2><SPAN class=' + idBoldRed + '>'+ kRepairOutpost + '</span></td><TD width=30%>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
      }
      return m;
    }
    function dispBuildingJob (cityIdx){
      var m = '<TR><TD class=' + idTabLeft + ' width=20%>' + kBuilding + ':</td>';
      var job = getBuildingJob (cityIdx);
      if (job && job.job.run_at > serverTime()) {
        // Don't show negative values - not pleasant user interface. To be truly nice, if the time is less than zero, we should reset 
        // the build timer. For now, that is done by the Build tab's notification process
        m += '<TD width=50% colspan=2>'+ translate(job.building.type) + ' ' + kLevel + ' ' + job.job.level +'</td><TD width=30%>'+ timestr(job.job.run_at - serverTime(), true) +'</td></tr>';
      }
      else
        m += '<TD colspan=2><SPAN class=' + idBoldRed + '>' + kNone + '</span></td></tr>';
      return m;
    }
    function dispResearchJob (cityIdx){
      var m = '<TR><TD class=' + idTabLeft + ' width=20%>' + kResearch + ':</td>';
      var job = getResearchJob (cityIdx);
      if (job && job.run_at > serverTime())
        m += '<TD width=50% colspan=2>'+ translate(job.research_type) + ' ' + kLevel + ' ' + job.level +'</td><TD width=30%>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
      else
        m += '<TD colspan=2><SPAN class=' + idBoldRed + '>' + kNone + '</span></td></tr>';
      return m;
    }
    function dispTrainingJobs (cityIdx){
      var m = '', last = serverTime(), trains = [];
      for (var i=0; i<Seed.cities[cityIdx].jobs.length; i++)
        if (Seed.cities[cityIdx].jobs[i].queue=='units' && Seed.cities[cityIdx].jobs[i].unit_type && Seed.cities[cityIdx].jobs[i].run_at > last)
          trains.push (Seed.cities[cityIdx].jobs[i]);
      trains.sort(function(a,b){return a.run_at-b.run_at});
      for (var i=0; i<trains.length; i++){
        var left='', tot='', timeRemaining = 0;
        if (i==0)
          left = kTraining + ':';

        else if (i==trains.length-1) {
          timeRemaining = (trains[i].run_at-serverTime() > 0) ? trains[i].run_at-serverTime() : 0;
          tot = ' &nbsp <B>('+ timestrShort(timeRemaining) +')</b>';
        }
        timeRemaining = (trains[i].run_at-last > 0) ? trains[i].run_at-last : 0;
        m += '<TR><TD class=' + idTabLeft + ' width=20%>'+ left +'</td><TD width=50% colspan=2>'+ nombreFormate(trains[i].quantity,' ') +' '+ translate(trains[i].unit_type) +' </td><TD width=30%> '
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
          alliance_name = (cityIdx != 0) ? '' : alliance_name;
      if (cityIdx == 0)
        wallStatus = (Seed.cities[cityIdx].defended) ? '<font class="defending">' + kDefending + '</font>' : '<font class="hiding">' + kSanctuary + '</font>';
      else
        wallStatus = ' &nbsp ';
      var ret = '<div class=' + idSubtitle + '><TABLE width="100%" class=' + idTab + '>\
                 <TR><TD align=left width=35%>'+ city.name +'</td>\
                     <TD align=center width=30%>'+ city.x +','+ city.y +'</td>\
                     <TD align=center width=200px><font color=yellow>' + alliance_name +'</font></td>\
                     <TD align=right width=35%>'+ wallStatus +'</td>\
                 </tr></table></div>';
      return ret;
    }
  },

  tabInfoInventory : function (){
    var t = Tabs.Info;

    setSubTab(infoPrefix + 'Inventory', true);
    setSubTab(infoPrefix + 'Overview', false);
    t.contentType = 1;
    Data.options.infoTab = t.contentType;

    var city = Seed.cities[0];
    var resourceItems   = ['Wood500K', 'Wood250K', 'Wood80K', 'Wood50K', 'Wood25K', 'Wood10K', 'Stone500K', 'Stone250K', 'Stone80K', 'Stone50K', 'Stone25K', 'Stone10K', 
                           'Food500K', 'Food250K', 'Food80K', 'Food50K', 'Food25K', 'Food10K', 'Ore500K', 'Ore250K', 'Ore80K', 'Ore50K', 'Ore25K', 'Ore10K', 
                           'Gold200K', 'Gold50K', 'Gold25K', 'Gold10K'];
    var timeItems       = ['Blink', 'Hop', 'Skip', 'Jump', 'Leap', 'Bounce', 'Bore', 'Bolt', 'Blast', 'Blitz', 'TestroniusPowder', 'ForcedMarchDrops', 'TranceMarchDrops' ];
    var productionItems = ['AtlagenHarvestNanosDay', 'AtlagenHarvestNanosWeek', 'DryadForestNanosDay', 'DryadForestNanosWeek', 'OreadStoneNanosDay', 'OreadStoneNanosWeek', 
                           'EpeoradMetalsNanosDay', 'EpeoradMetalsNanosWeek', 'DoubleTaxDayDeclaration', 'DoubleTaxWeekDeclaration', 'NanoCollectorWeek', 'NanoCollectorDay' ];
    var generalItems    = ['MassNullifier', 'CompletionGrant', 'DragonHearts', 'GlowingShields', 'CeaseFireTreaty', 'DarkWarpDevice', 'ChartedWarpDevice', 'PseudonymGrant', 
                           'RenameProclamation', 'PurpleBones', 'CrimsonBull', 'FortunasTicket', 'FortunasGoldenTicket', 'OutpostWarp', 'DivineLigth', 'AncestralSeal',
                           'RaceChangeItem', 'NomadicRecruits', 'DivineRations' ];
    var chestItems      = ['NanoCanisters', 'CompletionGrantPortfolio', 'NanoCrates', 'TimeTrickstersBag'];
    var arsenalItems    = ['AquaTroopRespirator', 'AquaTroopRespiratorStack100', 'AquaTroopRespiratorStack500', 'AquaTroopRespiratorStack1000',
                           'StoneTroopItem', 'StoneTroopItemStack100', 'StoneTroopItemStack500', 'StoneTroopItemStack1000',
                           'FireTroopItem', 'FireTroopItemStack100', 'FireTroopItemStack500', 'FireTroopItemStack1000',
                           'WindTroopItem', 'WindTroopItemStack100', 'WindTroopItemStack500', 'WindTroopItemStack1000',
                           'CurseWorms', 'CurseFrogs', 'CurseBats', 'CurseLocusts' ];
    var item = '';
    var itmRessources = [];
    var itmProduction = [];
    var itmTime       = [];
    var itmGeneral    = [];
    var itmChest      = [];
    var itmArsenal    = [];
    for (item=0; item<resourceItems.length; item++){
      num = isEmpty(Seed.s.items[resourceItems[item]],0);
      if (num > 0) itmRessources.push ({desc:translate(resourceItems[item]), qty:num});
    }
    for (item=0; item<productionItems.length; item++){
      num = isEmpty(Seed.s.items[productionItems[item]],0);
      if (num > 0) itmProduction.push ({desc:translate(productionItems[item]), qty:num});
    }
    for (item=0; item<timeItems.length; item++){
      num = isEmpty(Seed.s.items[timeItems[item]],0);
      if (num > 0) itmTime.push ({desc:translate(timeItems[item]), qty:num});
    }
    for (item=0; item<generalItems.length; item++){
      num = isEmpty(Seed.s.items[generalItems[item]],0);
      if (num > 0) itmGeneral.push ({desc:translate(generalItems[item]), qty:num});
    }
    for (item=0; item<chestItems.length; item++){
      num = isEmpty(Seed.s.items[chestItems[item]],0);
      if (num > 0) itmChest.push ({desc:translate(chestItems[item]), qty:num});
    }
    for (item=0; item<arsenalItems.length; item++){
      num = isEmpty(Seed.s.items[arsenalItems[item]],0);
      if (num > 0) itmArsenal.push ({desc:translate(arsenalItems[item]), qty:num});
    }

    var m = '<DIV class=' + idStatBox + '>';
    m += cityTitle(0);
    m += '<TABLE style="margin-top:3px" width=100%>';

    if (itmRessources.length > 0) {
      m += '<TR bgcolor=#dde align=center><TD style="border-bottom: 1px solid; border-bottom: 1px solid;" colspan=2><B>' + kRessources + '</b></td></tr>\
            <TR valign=top align=center><TD width=50% style="border-right: 1px solid"><TABLE class=' + idTabPad + '>';
      for (var i=0; i<Math.ceil(itmRessources.length/2); i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmRessources[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmRessources[i].qty,' ') +'</td></tr>';
      }
      m += '</table></td><TD width=50%><TABLE class=' + idTabPad + '>';  
      for (var i=Math.ceil(itmRessources.length/2); i<itmRessources.length; i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmRessources[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmRessources[i].qty,' ') +'</td></tr>';
      }
      m += '</TABLE></TD></TR><TR><TD> &nbsp </TD></TR>';
    }
    if (itmProduction.length > 0) {
      m += '<TR bgcolor=#dde align=center><TD style="border-top: 1px solid; border-bottom: 1px solid;" colspan=2><B>' + kItmProduction + '</b></td></tr>\
            <TR valign=top align=center><TD width=50% style="border-right: 1px solid"><TABLE class=' + idTabPad + '>';
      for (var i=0; i<Math.ceil(itmProduction.length/2); i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmProduction[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmProduction[i].qty,' ') +'</td></tr>';
      }
      m += '</table></td><TD width=50%><TABLE class=' + idTabPad + '>';  
      for (var i=Math.ceil(itmProduction.length/2); i<itmProduction.length; i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmProduction[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmProduction[i].qty,' ') +'</td></tr>';
      }
      m += '</TABLE></TD></TR><TR><TD> &nbsp </TD></TR>';
    }
    if (itmTime.length > 0) {
      m += '<TR bgcolor=#dde align=center><TD style="border-top: 1px solid; border-bottom: 1px solid;" colspan=2><B>' + kItmSpeedups + '</b></td></tr>\
            <TR valign=top align=center><TD width=50% style="border-right: 1px solid"><TABLE class=' + idTabPad + '>';
      for (var i=0; i<Math.ceil(itmTime.length/2); i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmTime[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmTime[i].qty,' ') +'</td></tr>';
      }
      m += '</table></td><TD width=50%><TABLE class=' + idTabPad + '>';  
      for (var i=Math.ceil(itmTime.length/2); i<itmTime.length; i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmTime[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmTime[i].qty,' ') +'</td></tr>';
      }
      m += '</TABLE></TD></TR><TR><TD> &nbsp </TD></TR>';
    }
    if (itmGeneral.length > 0) {
      m += '<TR bgcolor=#dde align=center><TD style="border-top: 1px solid; border-bottom: 1px solid;" colspan=2><B>' + kItmGeneral + '</b></td></tr>\
            <TR valign=top align=center><TD width=50% style="border-right: 1px solid"><TABLE class=' + idTabPad + '>';
      for (var i=0; i<Math.ceil(itmGeneral.length/2); i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmGeneral[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmGeneral[i].qty,' ') +'</td></tr>';
      }
      m += '</table></td><TD width=50%><TABLE class=' + idTabPad + '>';  
      for (var i=Math.ceil(itmGeneral.length/2); i<itmGeneral.length; i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmGeneral[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmGeneral[i].qty,' ') +'</td></tr>';
      }
      m += '</TABLE></TD></TR><TR><TD> &nbsp </TD></TR>';
    }
    if (itmChest.length > 0) {
      m += '<TR bgcolor=#dde align=center><TD style="border-top: 1px solid; border-bottom: 1px solid;" colspan=2><B>' + kItmChest + '</b></td></tr>\
            <TR valign=top align=center><TD width=50% style="border-right: 1px solid"><TABLE class=' + idTabPad + '>';
      for (var i=0; i<Math.ceil(itmChest.length/2); i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmChest[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmChest[i].qty,' ') +'</td></tr>';
      }
      m += '</table></td><TD width=50%><TABLE class=' + idTabPad + '>';  
      for (var i=Math.ceil(itmChest.length/2); i<itmChest.length; i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmChest[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmChest[i].qty,' ') +'</td></tr>';
      }
      m += '</TABLE></TD></TR><TR><TD> &nbsp </TD></TR>';
    }
    if (itmArsenal.length > 0) {
      m += '<TR bgcolor=#dde align=center><TD style="border-top: 1px solid; border-bottom: 1px solid;" colspan=2><B>' + kItmArsenal + '</b></td></tr>\
            <TR valign=top align=center><TD width=50% style="border-right: 1px solid"><TABLE class=' + idTabPad + '>';
      for (var i=0; i<Math.ceil(itmArsenal.length/2); i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmArsenal[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmArsenal[i].qty,' ') +'</td></tr>';
      }
      m += '</table></td><TD width=50%><TABLE class=' + idTabPad + '>';  
      for (var i=Math.ceil(itmArsenal.length/2); i<itmArsenal.length; i++){
        m += '<TR><TD class=' + idTableft + ' width=75%>'+ itmArsenal[i].desc +'</td><TD align=left width=25%>'+ nombreFormate(itmArsenal[i].qty,' ') +'</td></tr>';
      }
      m += '</TABLE></TD></TR><TR><TD> &nbsp </TD></TR>';
    }
    m += '</table></div>';

    document.getElementById(infoPrefix + 'Cont').innerHTML = m; 

    function cityTitle (cityIdx){
      var city = Seed.cities[cityIdx];
      var wallStatus = (Seed.cities[cityIdx].defended) ? '<font class="defending">' + kDefending + '</font>' : '<font class="hiding">' + kSanctuary + '</font>';
      var alliance_name = (Seed.s.alliance) ? Seed.s.alliance.name : '';
      var ret = '<div class=' + idSubtitle + '><TABLE width="100%" class=' + idTab + '>\
                 <TR><TD align=left width=35%>'+ city.name +'</td>\
                     <TD align=center width=30%>'+ city.x +','+ city.y +'</td>\
                     <TD align=center width=200px><font color=yellow>' + alliance_name +'</font></td>\
                     <TD align=right width=35%>'+ wallStatus +'</td>\
                 </tr></table></div>';
      return ret;
    }
  },

  onUnload : function (){
    var t = Tabs.Info;
    logit ('===============  Tabs.Info.onUnload');
    Data.options.infoTab = t.contentType;
  },
  
  refresh : function (){
    var t = Tabs.Info;
    switch (t.contentType) {
      case 0: Seed.fetchSeed (t.tabInfoOverview()); break;
      case 1: Seed.fetchSeed (t.tabInfoInventory()); break;
    }
  },

}
//*********************************** Info Tab *********************************************


//*********************************** Jobs Tab *********************************************
Tabs.Jobs = {
	tabOrder        : JOBS_TAB_ORDER,
	tabLabel        : kJobs,
	tabDisabled     : !ENABLE_JOBS_TAB,
	cont            : null,
	timer           : null,
//	buildTimer      : null,
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
      div.innerHTML =  '<TABLE width=100% align=center><TR><TD>\
                        <INPUT class=button type=submit value="' + kJobInfo + '" id=' + jobsPrefix + 'Info></INPUT>\
                        <INPUT class=button type=submit value="' + kTraining + '" id=' + jobsPrefix + 'Train></INPUT>\
                        <INPUT class=button type=submit value="' + kBuilding + '" id=' + jobsPrefix + 'Build></INPUT>\
                        <INPUT class=button type=submit value="' + kResearch + '" id=' + jobsPrefix + 'Research></INPUT>\
                        </TD></TR></TABLE>\
                        <DIV id=' + jobsPrefix + 'Header style="padding-top:5px; height:260px; max-height:260px;"></div>\
                        <DIV id=' + jobsPrefix + 'Content style="padding-top:5px; height:435px; max-height:800px; overflow-y:auto;"></div>';
      document.getElementById(jobsPrefix + 'Info').addEventListener ('click', t.tabJobInfo, false);
      document.getElementById(jobsPrefix + 'Train').addEventListener ('click', t.tabJobTrain, false);	
      document.getElementById(jobsPrefix + 'Build').addEventListener ('click', t.tabJobBuild, false);
      document.getElementById(jobsPrefix + 'Research').addEventListener ('click', t.tabJobResearch, false);

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

    onUnload : function (){
      var t = Tabs.Jobs;
      logit ('===============  Tabs.Jobs.onUnload');
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
  
    //*** Jobs Tab - Job infos Sub-tab ***
    tabJobInfo : function (){
      var t = Tabs.Jobs;
      setSubTab(jobsPrefix + 'Info', true);
      setSubTab(jobsPrefix + 'Build', false);
      setSubTab(jobsPrefix + 'Research', false);
      setSubTab(jobsPrefix + 'Train', false);
      t.contentType = 0;

      // Timers
      t.clearTimers();
      t.timer = setInterval (t.tabJobInfo, 1000);

      var city = Seed.cities[0];
      var n = '<DIV class=' + idTitle + '>Information</DIV>\
               <TABLE width=100%><TR><TD><INPUT class=' + idGreenButton + ' type=submit value="' + kRefresh + '" id=' + jobsPrefix + 'Refresh></input></td></tr></table>';
      document.getElementById(jobsPrefix + 'Header').style.height = "45px";
      document.getElementById(jobsPrefix + 'Header').innerHTML = n;
      document.getElementById(jobsPrefix + 'Refresh').addEventListener ('click', refresh, false);

      var m = '<DIV class=' + idStatBox + '>' + cityTitle(0);
      m += '<TABLE class=' + idTabPad + '>' + dispCurrRessources(0) + dispDragonJob(0) + dispBuildingJob(0) + dispResearchJob(0) + dispTrainingJobs(0) + '</td></tr></table></div>';
      // outposts ...
      if (Seed.cities.length > 0){
        for (var i=1; i<Seed.cities.length; i++){
          m += '<DIV class=' + idStatBox + ' style="margin-top:6px !important">'
            + cityTitle(i) + '<TABLE class=' + idTabPad + '>' + dispDragonJob(i) + dispOutpostJob(i) + dispBuildingJob(i) + dispTrainingJobs(i) + '</td></tr></table></div>';
        }
      }

      document.getElementById(jobsPrefix + 'Content').style.height = "665px";
      document.getElementById(jobsPrefix + 'Content').innerHTML = m; 

      // Display build queue
      function dispCurrRessources (cityIdx){
        var m = '<TR><TD class=' + idTabLeft + ' width=20%>'+ kRessources +'</td>';
        var dfltResources = ['gold', 'food', 'wood', 'ore', 'stone'];
        var newline = '';
        for (var p=0; p<dfltResources.length; p++){
          var actualStock = nombreFormate(isEmpty(Seed.cities[cityIdx].resources[dfltResources[p]],0));
          m += newline + '<TD width =15%>'+ translate(dfltResources[p]) + '</td><TD width=1%>:</td><TD align=right width=14%>'+ actualStock +'</td><TD width=50%> &nbsp </td></tr>';
          newline = '<TR><TD> &nbsp </TD>'
        }
        var popCur = isEmpty(Seed.cities[cityIdx].figures.population['current'],0);
        var popLab = isEmpty(Seed.cities[cityIdx].figures.population['laborers'],0);
        var popFor = isEmpty(Seed.cities[cityIdx].figures.population['armed_forces'],0);
        var num = popCur - popLab - popFor;
        num = (num < 0) ? 0 : num;
        m += '<TR><TD> &nbsp </TD><TD width =15%>Inactifs</td><TD width=1%>:</td><TD align=right width=14%>' + nombreFormate(num,' ') + '</td><TD width=50%> &nbsp </td></tr>';
        m += '</table><BR><TABLE class=' + idTabPad + '>';
        return m;
      }

      function dispDragonJob (cityIdx){
        var m = '';
        var job = getDragonJob (cityIdx);
        if (job && job.run_at > serverTime()) {
          m += '<TR><TD class=' + idTabLeft + ' width=20%>' + kHealing + ':</td>';
          m += '<TD width=50%><SPAN class=' + idBoldRed + '>'+ kHealingDragon + '</span></td><TD width=30%>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
        }
        return m;
      }
      function dispOutpostJob (cityIdx){
        var m = '';
        var job = getOutpostJob (cityIdx);
        if (job && job.run_at > serverTime()) {
          m += '<TR><TD class=' + idTabLeft + ' width=20%>' + kRepair + ':</td>';
          m += '<TD width=50%><SPAN class=' + idBoldRed + '>'+ kRepairOutpost + '</span></td><TD width=30%>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
        }
        return m;
      }

      // Display build queue
      function dispBuildingJob (cityIdx){
        var m = '<TR><TD class=' + idTabLeft + ' width=20%>'+ kBuilding +'</td>';
        var job = getBuildingJob (cityIdx);
        if (job && job.job.run_at > serverTime()) {
          // Don't show negative values - not pleasant user interface. To be truly nice, if the time is less than zero, we should reset 
          // the build timer. For now, that is done by the Build tab's notification process
          m += '<TD width =50%>'+ translate(job.building.type) + ' ' + kLevel + ' ' + job.job.level +'</td><TD width=30%>'+ timestr(job.job.run_at - serverTime(), true) +'</td></tr>';
        } else
          m += '<TD colspan=2><SPAN class=' + idBoldRed + '>' + kNone + '</span></td></tr>';
        return m;
      }

      // Display research queue
      function dispResearchJob (cityIdx){
        var m = '<TR><TD class=' + idTabLeft + ' width=20%>'+ kResearch +'</td>';
        var job = getResearchJob (cityIdx);
        if (job && job.run_at > serverTime())
          m += '<TD width=50%>'+ translate(job.research_type) + ' ' + kLevel + ' ' + job.level +'</td><TD widtj=30%>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
        else
          m += '<TD colspan=2><SPAN class=' + idBoldRed + '>' + kNone + '</span></td></tr>';
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
            left = kTraining + ':';
          else if (i==trains.length-1) {
            timeRemaining = (trains[i].run_at-serverTime() > 0) ? trains[i].run_at-serverTime() : 0;
            tot = ' &nbsp <B>('+ timestrShort(timeRemaining) +')</b>';
          }
          timeRemaining = (trains[i].run_at-last > 0) ? trains[i].run_at-last : 0;
          m += '<TR><TD class=' + idTabLeft + ' width=20%>'+ left +'</td><TD width=50%>'+ nombreFormate(trains[i].quantity,' ') +' '+ translate(trains[i].unit_type) +' </td><TD width=30%> '
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
          wallStatus = ' &nbsp ';
        var ret = '<div class=' + idSubtitle + '><TABLE width="100%" class=' + idTab + '>\
                   <TR><TD align=left width=35%>'+ city.name +'</td>\
                       <TD align=center width=30%>'+ city.x +','+ city.y +'</td>\
                       <TD align=center width=200px><font color=yellow>' + alliance_name +'</font></td>\
                       <TD align=right width=35%>'+ wallStatus +'</td>\
                   </tr></table></div>';
        return ret;
      }

      function refresh (){
        var t = Tabs.Jobs;
        Seed.fetchSeed (t.tabJobInfo());  
      }
    },


    //*** Jobs Tab - Train Sub-tab ***
    tabJobTrain : function (){
      var t = Tabs.Jobs;
      setSubTab(jobsPrefix + 'Info', false);
      setSubTab(jobsPrefix + 'Build', false);
      setSubTab(jobsPrefix + 'Research', false);
      setSubTab(jobsPrefix + 'Train', true);
      t.contentType = 1;

      t.clearTimers();
      t.trainStatTimer = setInterval(t.trainStatTick, 1000);

      // Create status ticker
      var n = '<DIV class=' + idTitle + '>'+ kAutoTrain +'</div>\
               <DIV class=' + idStatBox + ' style="margin-bottom: 5px !important"><CENTER><INPUT id=pbtrnOnOff type=submit\></center>\
               <DIV id=pbtrnTrnStat style="height: 126px; max-height: 126px; overflow:auto;"></div> <BR>\
               <DIV id=pbtrnFeedback style="font-weight:bold; border: 1px solid green; padding: 2px 0px 2px 2px; height:17px"></div>  </div>\
               <TABLE width=100% align=center><TR><TD>\
               <INPUT class=button type=submit value='+ kTrain +' id=pbttTrain></input>\
               <INPUT class=button type=submit value='+ kConfig +' id=pbttConfigTrain></input></td></tr></table>';
      document.getElementById(jobsPrefix + 'Header').style.height = "220px";
      document.getElementById(jobsPrefix + 'Header').innerHTML = n;

      var m = '<DIV id=pbtrnConfig style="padding-top: 5px; overflow:auto;">'; // class=' + idInput + '
      document.getElementById(jobsPrefix + 'Content').style.height = "435px";
      document.getElementById(jobsPrefix + 'Content').innerHTML = m;

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
      Seed.fetchSeed (t.tabJobInfo());  
    },


    //*** Jobs Tab - Build Sub-tab ***
    tabJobBuild : function (){
      var t = Tabs.Jobs;
      setSubTab(jobsPrefix + 'Info', false);
      setSubTab(jobsPrefix + 'Build', true);
      setSubTab(jobsPrefix + 'Research', false);
      setSubTab(jobsPrefix + 'Train', false);
      t.contentType = 2;

      // Timers
      t.clearTimers();
      t.buildStatTimer = setInterval (t.buildStatTick, 1000); // start the build statistics timer

      var n = '<DIV class=' + idTitle + '>'+ kAutoUpgradeBuildings +'</div>\
               <DIV class=' + idStatBox + '><CENTER><INPUT id=' + jobsPrefix + 'BldOnOff type=submit\></center>\
               <DIV id=pbbldBldStat></div> <BR>\
               <DIV id=pbbldFeedback style="font-weight:bold; border: 1px solid green; height:17px; padding:2px 0px 2px 2px;"></div>  </div>';
      document.getElementById(jobsPrefix + 'Header').innerHTML = n;

      var m = '';
      var el = [], listC = [], listF = [];
      for (var i=0; i<Seed.cities.length; i++){
        if (i==0){
          listC = t.capitolCity;
          listF = t.capitolField;
        } else {
          listC = t.outpostCity;
          listF = t.outpostField;
        }
        // The seed object contains a wealth of information including alliance membership, number of people in the alliance, facebook ids of each member,
        // the ol's information (in alliances and alliance_membership), the s object contains all the buildings for the cities, whether or not the city is
        // on defense, the list of generals, what and where the dragon is, a list of jobs (e.g. research, building, troops training and pending training, current marches)
        // the marches alone say where the troops are, whether or not they are returning or attacking, general assigned, etc.
        var city = Seed.cities[i];
        m += '<DIV class=' + idStatBox + ' style="margin-top:6px !important">';  // Jawz - added border
        m += '<DIV class=' + idSubtitle + '>' + city.name +'</div><TABLE class=' + idTab + '><TR valign=top><TD width=140><TABLE class=' + idTab + '>';
//        m += '<DIV class=' + idSubtitle + '>'+ kCityNumber + (i+1) +' ('+ city.type +')</div><TABLE class=' + idTab + '><TR valign=top><TD width=150><TABLE class=' + idTab + '>';

        // Jawz : Building config list shown on 3 columns instead of 2 (for future outposts display)
        // Modified ii<ListC.length to ii<Math.floor(listC.length/2)
        for (var ii=0; ii<Math.floor(listC.length/2); ii++){
          m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listC[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listC[ii]]?'CHECKED':'') +' /></td><TD>'+ listC[ii] +'</td>'+ buildDisplayCap(i,ii) +'</tr>';  
          el.push('pbbldcb_'+ i +'_'+ listC[ii]);
        }
        // Jawz - Added this for second part of the city buildings
        m += '</table></td><TD width=140><TABLE class=' + idTab + '>';  
        for (var ii=Math.floor(listC.length/2); ii<listC.length; ii++){
          m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listC[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listC[ii]]?'CHECKED':'') +' /></td><TD>'+ listC[ii] +'</td>'+ buildDisplayCap(i,ii) +'</tr>';  
          el.push('pbbldcb_'+ i +'_'+ listC[ii]);
        }
        // End Jawz

        m += '</table></td><TD><TABLE class=' + idTab + '>';  
        for (var ii=0; ii<listF.length; ii++){
          m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listF[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listF[ii]]?'CHECKED':'') +' /></td><TD>'+ listF[ii] +'</td>'+ buildDisplayCap(i,(listC.length + ii)) +'</tr>';  
          el.push('pbbldcb_'+ i +'_'+ listF[ii]);
        }
        m += '</table></td></tr></table></div>';
      }    
      m += '</div>';
      document.getElementById(jobsPrefix + 'Content').style.height = "475px";
      document.getElementById(jobsPrefix + 'Content').innerHTML = m;
      document.getElementById(jobsPrefix + 'Content').scrollTop = t.buildScrollPos;

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
            } else {
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
      document.getElementById(jobsPrefix + 'BldOnOff').addEventListener ('click', function (){t.setBuildEnable (!Data.options.autoBuild.enabled);}, false);
      t.refreshBuildButton (Data.options.autoBuild.enabled);
      document.getElementById(jobsPrefix + 'Content').addEventListener('scroll', onScroll, false);

      function checked (evt){
        var id = evt.target.id.split ('_');
        var cityId = Seed.cities[id[1]].id;
        Data.options.autoBuild.buildingEnable[id[1]][id[2]] = evt.target.checked;
        if (Data.options.autoBuild.enabled && evt.target.checked)
          t.buildTick();  
      }

      function buildDisplayCap (cityIdx, listIdx){
        var m = '<TD class=' + idTabSelectOpt + '><SELECT id="pbbldcap_' + cityIdx +'_'+ listIdx +'"><option value="0">0</option>\
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
          t.buildScrollPos = document.getElementById(jobsPrefix + 'Content').scrollTop;
      }
    },


    //*** Jobs Tab - Research Sub-tab ***
    tabJobResearch : function (){
      var t = Tabs.Jobs;	
      setSubTab(jobsPrefix + 'Info', false);
      setSubTab(jobsPrefix + 'Build', false);
      setSubTab(jobsPrefix + 'Research', true);
      setSubTab(jobsPrefix + 'Train', false);
      t.contentType = 3;

      // Timers
      t.clearTimers();
      t.resStatTimer = setInterval (t.resStatTick, 1000); // start the research statistics timer

      var n = '<DIV class=' + idTitle + '>'+ kAutoResearch +'</div>\
               <DIV class=' + idStatBox + '><CENTER><INPUT id=pbresOnOff type=submit\></center>\
               <DIV id=pbresStat style="height: 43px; max-height: 43px; overflow:auto;"></div> <BR>\
               <DIV id=pbresFeedback style="font-weight:bold; border: 1px solid green; height:17px; padding:2px 0px 2px 2px;"></div>  </div>';
      document.getElementById(jobsPrefix + 'Header').style.height = "120px";
      document.getElementById(jobsPrefix + 'Header').innerHTML = n;

      var m = '<DIV class=' + idStatBox + ' style="margin-top:6px !important">';  // Jawz - added border
//      var m = '<DIV id=pbresConfig class=' + idInput + '>';
      var el = [];
      var city = Seed.cities[0];
      m += '<DIV class=' + idSubtitle + '>' + city.name +'</div><TABLE class=' + idTab + '><TR valign=top><TD width=100%><TABLE class=' + idTab + '>';
      m += '<TR class=' + idTabHdr + '2><TD width=10%> &nbsp </td><TD width=50%>'+ kResearch +'</td><TD align=center width=20%><B>'+ kActualLev +'</B></td><TD align=center width=20%>'+ kCap +'</td></tr>';  
      var i=0;
      for (var p in t.capitolResearch){
        var actualResearch = isEmpty(Seed.s.research[p],0);
        m += '<TR><TD><INPUT type=checkbox id="pbrescb_'+ 0 + '_' +t.capitolResearch[p] +'" '+ (Data.options.autoResearch.researchEnable[0][t.capitolResearch[p]]?'CHECKED':'') +' /></td>\
                  <TD>'+ translate(t.capitolResearch[p]) +'</td>\
                  <TD align=center><B>'+ actualResearch +'</B></td>\
                  <TD align=center>'+ researchDisplayCap(i) +'</td></tr>';  
        el.push('pbrescb_' + 0 + '_' +t.capitolResearch[p]);
        ++i;
      }
      m += '</table></td><TD><TABLE class=' + idTab + '>';  
      m += '</div>';
      document.getElementById(jobsPrefix + 'Content').style.height = "435px";
      document.getElementById(jobsPrefix + 'Content').innerHTML = m;

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
          } else {
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
        var m = '<SELECT id="pbrescap_' + 0 + '_' + listIdx +'"><option value="0">0</option>\
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
                 </select>';
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
          but.className = idButAttackOn;
        }
        Data.options.trainTimer = setInterval(function() {t.trainTick(0) }, 3000);
      } else {
        if (but) {
          but.value = kAutoOff;
          but.className = idButAttackOff;
        }
        t.dispFeedback(""); // Erase previous feedback
        clearTimeout (Data.options.trainTimer);
      }
    },

    setBuildEnable : function (onOff){
      var t = Tabs.Jobs;
      var but = document.getElementById(jobsPrefix + 'BldOnOff');
      Data.options.autoBuild.enabled = onOff;
      if (onOff){
        if (but) {
          but.value = kAutoBuildOn;
          but.className = idButAttackOn;
        }
        Data.options.buildTimer = setInterval (t.buildTick, 4000);
      } else {
        if (but) {
          but.value = kAutoBuildOff;
          but.className = idButAttackOff;
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
          but.className = idButAttackOn;
        }
        Data.options.researchTimer = setInterval(t.researchTick, 5000);
      } else {
        if (but) {
          but.value = kAutoResearchOff;
          but.className = idButAttackOff;
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
        but.className = idButAttackOn;
      } else {
        but.value = kAutoOff;
        but.className = idButAttackOff;
      }
    },

    refreshBuildButton : function (onOff) {
      var t = Tabs.Jobs;
      var but = document.getElementById(jobsPrefix + 'BldOnOff');
      if (onOff){
        but.value = kAutoBuildOn;
        but.className = idButAttackOn;
      } else {
        but.value = kAutoBuildOff;
        but.className = idButAttackOff;
      }
    },

    refreshResearchButton : function (onOff) {
      var t = Tabs.Jobs;
      var but = document.getElementById('pbresOnOff');
      if (onOff){
        but.value = kAutoResearchOn;
        but.className = idButAttackOn;
      } else {
        but.value = kAutoResearchOff;
        but.className = idButAttackOff;
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
      var m = '<TABLE class=' + idTabPad + '>';
      var len = Data.options.tJobs.length;

      for (var i=0; i<Seed.cities.length; i++){
        var city = Seed.cities[i];
        var job = getBuildJob (i);
/* Bout de code qui fout la merde dans l'affichage des stats constructions */
        if (Data.options.tJobs.length == 0 && job) {
          // the Seed is out of sync, the job should be deleted
          deleteBuildJob (i, job);
          job = null;
        }
/* remit en fonctionnement le 10/09/2011 */
        m += '<TR><TD>'+ city.name +'</td><TD>';
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
          } else {
            m += kBuilding1 + ' </td><TD>' + kLevel + ' ' + job.level + ' ' + translate(b.type) +'</td><TD>'+ timeRemaining +'</td></tr>';
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
      var t = Tabs.Jobs, m = '<TABLE class=' + idTabPad + '>', city = Seed.cities[0];
      var job = getResearchJob (0);

      m += '<TR><TD width=20%>'+ kCityNumber +' 1</td>';
      if (job == null)
        m += '<TD colspan=3><SPAN class=' + idBoldRed + '>' + kNone +'</td></tr>';
      else {
        var timeRemaining = ((job.run_at - serverTime()) > 0) ? timestr(job.run_at - serverTime()) : 0;
        if (timeRemaining == 0) {
          m += '<TD colspan=3>Awaiting job completion notification...</td></tr>';
          deleteResearchJob(job);
          if (t.resStatFetch == false) {
            Seed.fetchSeed();
            t.resStatFetch = true;
          }
        } else {
          // Bug: If we have a job and the timeRemaining is negative or zero we should delete the job
          m += '<TD>' + kResearch +'</TD><TD width=50%>'+ translate(t.resUITranslate(job.research_type)) + ' ' + kLevel + ' ' + job.level +'</td><TD widtj=30%>'+ timeRemaining +'</td></tr>';
//          m += kResearch +'</td><TD>'+ kLevel1 +' '+ job.level +' '+ t.resUITranslate (job.research_type) +'</td><TD>'+ timeRemaining  +'</td></tr>';
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
    // Requirements :
    // Garrison Level: 1	Idle Population: 1		Upkeep: 2 food
    // Food: 40			Lumber: 150			Metals: 10
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;    
    },

    checkConscriptReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Garrison Level: 1	Idle Population: 1		Upkeep: 3 food
    // Food: 80			Lumber: 100			Metals: 50
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;    
    },
  
    checkSpyReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Clairvoyance: 1	Garrison Level: 2	Idle Population: 1	Upkeep: 5 food
    // Food: 120		Lumber: 200		Metals: 150	
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;       
    },

    checkHalberdsmanReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Metallurgy: 1			Garrison Level: 2	Idle Population: 1	Upkeep: 6 food
    // Food: 150			Lumber: 500		Metals: 100
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;       
    },

    checkMinotaurReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Metallurgy: 1		Metalsmith: 1	Garrison Level: 3	Idle Population: 1	Upkeep: 7 food
    // Food: 200		Lumber: 150	Metals: 400
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;          
    },

    checkLongbowmanReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Weapons Calibration: 1	Garrison Level: 4	Idle Population: 2	Upkeep: 9 food
    // Food: 300			Lumber: 350		Metals: 300
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;    
    },

    checkSwiftStrikeDragonReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Dragonry: 2	Rapid Deployment: 1	Rookery: 1		Garrison Level: 5	Idle Population: 3	Upkeep: 18 food
    // Food: 1000	Lumber: 600		Metals: 500
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret; 
    },

    checkBattleDragonReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Dragonry: 3	Rapid Deployment: 5	Rookery: 5		Garrison Level: 7	Idle Population: 6	Upkeep: 35 food
    // Food: 1000	Lumber: 500		Metals: 2500
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;     
    },

    checkArmoredTransportReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Factory: 3	Levitation: 3	Garrison Level: 6	Idle Population: 4	Upkeep: 10 food
    // Food: 600	Lumber: 1500	Metals: 350
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;    
    },

    checkGiantReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Clairvoyance: 3	Factory: 7		Metallurgy: 8	Metalsmith: 5	Garrison Level: 9	Idle Population: 8	Upkeep: 100 food
    // Food: 4000		Lumber: 6000	Metals: 1500
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;    
    },

    checkFireMirrorReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Weapons Calibration: 10	Factory: 9		Metallurgy: 10	Garrison Level: 10	Idle Population: 10	Upkeep: 250 food
    // Food: 5000			Lumber: 5000	Metals: 1200	Stone: 8000
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
      } else if (t.getBuildingLevel(ic, kTrainingCamp, garrisonLevel) == 0) m += '<TD>&nbsp;training camp '+ garrisonLevel +'</td>';
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;    
    },

    checkAquaTroopReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Clairvoyance: 4	Rapid Deployment: 8	Factory: 7		Metallurgy: 10	TrainingCampe Level: 10	Idle Population: 10	Upkeep: 125 food
    // Food: 4000		Lumber: 5500		Metals: 2500	Stone: 7000
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;    
    },

    checkStoneTroopReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Clairvoyance: 5	Metalsmith: 9	Metallurgy: 10	Masonry: 10	TrainingCamp Level: 10	Idle Population: 8	Upkeep: 110 food	Glowing Mandrake: 1
    // Food: 3000		Lumber: 4000	Metals: 2000	Stone: 8000
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
      } else {
        ret.trainable = false;
        ret.msg = n + m + '</tr></table>';
      }
      return ret;    
    },

    checkFireTroopReqs : function (troopQty, ic, count, troopsLength) {
    // Requirements
    // Clairvoyance: 5	Metalsmith: 8	Rapid Deployment: 9	Weapons Calibration: 10	TrainingCamp Level: 10	Volcanic Rune: 1	Idle Population: 12
    // Food: 5000		Lumber: 3000	Metals: 9000	Stone: 4000
  
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

    checkWindTroopReqs : function(troopQty, ic, count, troopsLength) {
    // Requirements
    // Rapid Deployment:9	Aerial Combat:3		Levitation: 9	TrainingCamp Level: 10	Idle Population: 6	WindTroop item: 1
    // Food: 2000		Lumber: 3000	Metals: 3000	Stone: 1000
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      if (!Data.options.autoTrain.enabled) return;
      if (ic == undefined) ic = 0;	

      //Seed.notifyOnUpdate(function()//{ 
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
        } else 
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
      if (!Data.options.autoBuild.enabled) return;

      // Iterate over the cities for buildings in each
      //Seed.notifyOnUpdate(function()//{   
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
                if (Data.options.tJobs[i].done || !Data.options.tJobs[i].duration ||
                    Data.options.tJobs[i].run_at + Data.options.tJobs[i].duration > serverTime()) {
                  Data.options.tJobs.splice(i,1);
                  Seed.fetchSeed ();
                  clearTimeout (Data.options.buildTimer);
                  Data.options.buildTimer = setInterval (t.buildTick, 1000);
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
                } else {
                  // Error condition prevents building, try again later
                  t.doBuildRecheck = true;
                  break;
                }
              } else {
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
          } // End of if (bJob == null)

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
              } else {
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
      if (!Data.options.autoResearch.enabled) return;
//      Data.options.rJobs.length = 0;
//      return;
      
      //Seed.notifyOnUpdate(function()//{
        var nothingToDo = true;
        var rJob = getResearchJob (0);
        var city = Seed.cities[0];
        var cityId = city.id;
        if (rJob == null){     // no research being done yet
          // Is there a research job in persistent data?
          for (var i=0; i<Data.options.rJobs.length; i++) {
            if (Data.options.rJobs[i]) {
              if (Data.options.rJobs[i].done || !Data.options.rJobs[i].duration ||
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
                  } else {
                    t.doResRecheck = true;
                    break;
                  }
                } else {
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
        }  // End of if (rJob == null)

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
        } else {
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
            } // End switch
            if (troopQty > 0) {
              var ret = t.checkTrainReqs(troopType, troopQty, i, j, troopsLength);
              if (t.contentType == 1) t.dispFeedback (ret.msg);
              if (ret.trainable) {
                t.doTrain(troopType, troopQty, i);
              } else {
                // Error condition prevents training, try again later
                doRecheck = true;
                break;
              }
            } 
          }
        }  // End of if (getTrainJob (i))
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
          }  // End switch
          if (troopQty > 0) {
            var ret = t.checkTrainReqs(troopType, troopQty, i, j, troopsLength);
            if (t.contentType == 1) t.dispFeedback (ret.msg);
            if (ret.trainable) {
              var d = {tType:troopType, tQty:troopQty, cityIdx:i, troopIdx:j, tLen:troopsLength};
              t.trainJobs.push (d);
              //t.trainTime = setTimeout ("t.doTrain(troopType, troopQty, i, j, troopsLength)", 3000);
            } else {
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
        } else {
          //Seed.fetchSeed();
          actionLog (kTrainError + rslt.errmsg);
          // The queue is frequently full, but we could be getting server errors (500) too
          // Wait a couple of minutes
          if (++t.trainErrorCount > 5){
            if (t.contentType == 1) t.dispFeedback (kDisablingAutoTrain);
            t.setTrainEnable (false);
            t.trainErrorCount = 0;
          } else {
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
        } else {
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
        } else {
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

        m += '<DIV class=' + idStatBox + ' style="margin-top:6px !important">';  // Jawz - added border
        m += '<DIV class=' + idSubtitle + '>'+ city.name +'</div><TABLE class=' + idTab + '><TR valign=top><TD width=140px><TABLE class=' + idTab + '>';
        var nbre1 = Math.ceil(troopTypes.length/3);
        var nbre2 = Math.ceil(troopTypes.length/3) + Math.ceil((troopTypes.length - Math.ceil(troopTypes.length/3))/2);
        for (tt=0; tt<nbre1; tt++){
          m += '<TR><TD class=' + idTabRight + '2 width=70%>'+ translate(Names.troops.byName[troopTypes[tt]][2]) +':</td>';  
          var num = Data.options.autoTrain.city[c].troopType[tt];
          if (!num || isNaN(num)) num = 0;
          m += '<TD width=30%><INPUT type=text id=pbtrnTrp_'+ c +'_'+ tt +' maxlength=6 size=2 value="'+ num +'"\></td></tr>';
          el.push('pbtrnTrp_'+ c +'_'+ tt);
        }
        m += '</table></td><TD width=140px><TABLE class=' + idTab + '>';
        for (tt=nbre1; tt<nbre2; tt++){
          m += '<TR><TD class=' + idTabRight + '2 width=70%>'+ translate(Names.troops.byName[troopTypes[tt]][2]) +':</td>';  
          var num = Data.options.autoTrain.city[c].troopType[tt];
          if (!num || isNaN(num)) num = 0;
          m += '<TD width=30%><INPUT type=text id=pbtrnTrp_'+ c +'_'+ tt +' maxlength=6 size=2 value="'+ num +'"\></td></tr>';
          el.push('pbtrnTrp_'+ c +'_'+ tt);
        }
        m += '</table></td><TD width=140px><TABLE class=' + idTab + '>';  
        for (tt=nbre2; tt<troopTypes.length; tt++){
          m += '<TR><TD class=' + idTabRight + '2 width=70%>'+ translate(Names.troops.byName[troopTypes[tt]][2]) +':</td>';  
          var num = Data.options.autoTrain.city[c].troopType[tt];
          if (!num || isNaN(num)) num = 0;
          m += '<TD width=30%><INPUT type=text id=pbtrnTrp_'+ c +'_'+ tt +' maxlength=6 size=2 value="'+ num +'"\></td></tr>';
          el.push('pbtrnTrp_'+ c +'_'+ tt);
        }
        m += '</table></td></tr></table></div>';
      }    
      m += '</div>';
      document.getElementById('pbtrnConfig').innerHTML = m;

      // Hilite the sub-tabs correctly
      setSubTab('pbttConfigTrain', false);
      setSubTab('pbttTrain', true);
      t.trainContentType = 0;
      // Add event listeners for troop quantities 
      for (var i=0; i<el.length; i++)
        document.getElementById(el[i]).addEventListener('change', troopsChanged, false);
 
      // Update troops on change
      function troopsChanged (e){
        var args = e.target.id.split('_');
        var x = parseIntZero(e.target.value);
        var authMaxTroops = getMusterPointMaxTroops (cityIdx);
        if (isNaN(x) || x<0 || x>authMaxTroops){
          e.target.style.backgroundColor = 'red';
          dispError (kInvalidNumberTroops);
        } else {
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
      setSubTab('pbttConfigTrain', true);
      setSubTab('pbttTrain', false);
      t.trainContentType = 1;

      var m = '<DIV class=' + idStatBox + ' style="margin-top:6px !important">';  // Jawz - added border
      m += '<DIV class=' + idSubtitle + '>'+ kConfigTrain +'</div>\
            <DIV style="overflow:auto">\
            <TABLE class=' + idTabPad + '>\
            <TR align=center class=' + idTabHdr + '1><TD style="background:none !important;" colspan=2></td></tr>\
            </div>';
      // Add the radio buttons  
      m += '<TR><TD><INPUT type=radio name=pbttQRadio value="Minimum Housing" ></td><td>'+ kMinHousing +'</td></tr>';
      m += '<TR><TD><INPUT type=radio name=pbttQRadio value="Minimum Resource Levels" ></td><td>'+ kMinResourceLevels +'</td></tr>';
      m += '</table><DIV class=short></div>'; 

      // Create an all troop table
      var el = [];
      var troopTypes = t.allTroops;

      m += '<DIV class=' + idSubtitle + ' style="background-color:#0044a0;">' + kTroopCap + '</div><TABLE class=' + idTab + '><TR valign=top><TD width=140px><TABLE class=' + idTab + '>';
      var nbre1 = Math.ceil(troopTypes.length/3);
      var nbre2 = Math.ceil(troopTypes.length/3) + Math.ceil((troopTypes.length - Math.ceil(troopTypes.length/3))/2);
      for (tt=0; tt<nbre1; tt++){
        m += '<TR><TD class=' + idTabRight + '2 width=70%>'+ translate(Names.troops.byName[troopTypes[tt]][2]) +':</td>';  
        var num = Data.options.troopCap.city[0].troopType[tt];
        if (!num || isNaN(num)) num = 0;
        m += '<TD width=30%><INPUT type=text id=pbtrnCap_'+ 0 +'_'+ tt +' maxlength=6 size=2 value="'+ num +'"\></td></tr>';
        el.push('pbtrnCap_'+ 0 +'_'+ tt);
      }
      m += '</table></td><TD width=140px><TABLE class=' + idTab + '>';
      for (tt=nbre1; tt<nbre2; tt++){
        m += '<TR><TD class=' + idTabRight + '2 width=70%>'+ translate(Names.troops.byName[troopTypes[tt]][2]) +':</td>';  
        var num = Data.options.troopCap.city[0].troopType[tt];
        if (!num || isNaN(num)) num = 0;
        m += '<TD width=30%><INPUT type=text id=pbtrnCap_'+ 0 +'_'+ tt +' maxlength=6 size=2 value="'+ num +'"\></td></tr>';
        el.push('pbtrnCap_'+ 0 +'_'+ tt);
      }
      m += '</table></td><TD width=140px><TABLE class=' + idTab + '>';  
      for (tt=nbre2; tt<troopTypes.length; tt++){
        m += '<TR><TD class=' + idTabRight + '2 width=70%>'+ translate(Names.troops.byName[troopTypes[tt]][2]) +':</td>';  
        var num = Data.options.troopCap.city[0].troopType[tt];
        if (!num || isNaN(num)) num = 0;
        m += '<TD width=30%><INPUT type=text id=pbtrnCap_'+ 0 +'_'+ tt +' maxlength=6 size=2 value="'+ num +'"\></td></tr>';
        el.push('pbtrnCap_'+ 0 +'_'+ tt);
      }
      m += '</table></td></tr></table></div></div>';
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
        } else {
          e.target.value = x;
          Data.options.troopCap.city[args[1]].troopType[args[2]] = x;
          e.target.style.backgroundColor = '';
        }
      }
    },
}
//*********************************** Jobs Tab *********************************************


//*********************************** Build Tab *********************************************
Tabs.Build = {
  tabOrder     : BUILD_TAB_ORDER,
  tabLabel     : kBuild,
  cont         : null,
  buildTimer   : null,
  statTimer    : null,
  capitalCity : ['Home', 'Garrison', 'ScienceCenter', 'Metalsmith', 'OfficerQuarter', 'MusterPoint', 'Rookery', 'StorageVault', 'Theater', 'Sentinel', 'Factory', 'Fortress', 'DragonKeep', 'Wall'],
  capitalField : ['Farm', 'Mine', 'Quarry', 'Lumbermill'],
  outpostCity : ['TrainingCamp', 'Home', 'Silo', 'MusterPoint', 'DragonKeep', 'Wall'],
  outpostField : ['Farm', 'Mine', 'Quarry', 'Lumbermill'],

  init : function (div){
    var t = Tabs.Build;
    t.cont = div;
    for (var i=0; i<Seed.cities.length; i++)
      if (!Data.options.autoBuild.buildingEnable[i])
        Data.options.autoBuild.buildingEnable[i] = {};
        
    var m = '<DIV class=' + idTitle + '>' + kAutoBuildTitle + '</div>\
      <DIV class=' + idStatBox + '><CENTER><INPUT id=' + buildPrefix + 'OnOff type=submit\></center>\
      <DIV id=' + buildPrefix + 'BldStat></div> <BR> <DIV id=' + buildPrefix + 'Feedback style="font-weight:bold; border: 1px solid green; height:17px"></div>  </div>';
    var el = [];
    for (var i=0; i<Seed.cities.length; i++){
      if (i==0){
        listC = t.capitalCity;
        listF = t.capitalField;
      } else {
        listC = t.outpostCity;
        listF = t.outpostField;
      }
      var city = Seed.cities[i];
      m += '<DIV class=' + idStatBox + ' style="margin-top:6px !important">';  // Jawz - added border
      m += '<DIV class=' + idSubtitle + '>' + city.name +'</div><TABLE class=' + idTab + '><TR valign=top><TD width=140><TABLE class=' + idTab + '>';

      // Jawz : Building config list shown on 3 columns instead of 2 (for future outposts display)
      // Modified ii<ListC.length to ii<Math.floor(listC.length/2)
      for (var ii=0; ii<Math.floor(listC.length/2); ii++){
        m += '<TR><TD><INPUT type=checkbox id="' + buildPrefix + 'cb_'+ i +'_'+ listC[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listC[ii]]?'CHECKED':'') +' /></td><TD>'+ translate(listC[ii]) +'</td></tr>';  
        el.push(buildPrefix + 'cb_'+ i +'_'+ listC[ii]);
      }
      // Jawz - Added this for second part of the city buildings
      m += '</table></td><TD width=140><TABLE class=' + idTab + '>';  
      for (var ii=Math.floor(listC.length/2); ii<listC.length; ii++){
        m += '<TR><TD><INPUT type=checkbox id="' + buildPrefix + 'cb_'+ i +'_'+ listC[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listC[ii]]?'CHECKED':'') +' /></td><TD>'+ translate(listC[ii]) +'</td></tr>';  
        el.push(buildPrefix + 'cb_'+ i +'_'+ listC[ii]);
      }
      // End Jawz

      m += '</table></td><TD><TABLE class=' + idTab + '>';  
      for (var ii=0; ii<listF.length; ii++){
        m += '<TR><TD><INPUT type=checkbox id="' + buildPrefix + 'cb_'+ i +'_'+ listF[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listF[ii]]?'CHECKED':'') +' /></td><TD>'+ translate(listF[ii]) +'</td></tr>';  
        el.push(buildPrefix + 'cb_'+ i +'_'+ listF[ii]);
      }
      m += '</table></td></tr></table></div>';
    }    
    m += '</div>';
    div.innerHTML = m;
    for (var i=0; i<el.length; i++)
      document.getElementById(el[i]).addEventListener('click', checked, false);
    t.setEnable (Data.options.autoBuild.enabling);
    document.getElementById(buildPrefix + 'OnOff').addEventListener ('click', function (){
      t.setEnable (!Data.options.autoBuild.enabling);
    }, false);
    
    function checked (evt){
      var id = evt.target.id.split ('_');
      var cityId = Seed.cities[id[1]].id;
      Data.options.autoBuild.buildingEnable[id[1]][id[2]] = evt.target.checked;
    }
  },
  
  hide : function (){
    var t = Tabs.Build;
    clearTimeout (t.statTimer);
  },
  show : function (){
    var t = Tabs.Build;
    t.statTick();
  },
  
  setEnable : function (onOff){
    var t = Tabs.Build;
    var but = document.getElementById(buildPrefix + 'OnOff');
    clearTimeout (t.buildTimer);
    Data.options.autoBuild.enabling = onOff;
    if (onOff){
      but.value = kAutoBuildOn;
      but.className = idButAttackOn;
      t.buildTick();
    } else {
      but.value = kAutoBuildOff;
      but.className = idButAttackOff;
    }
  },

  statTick : function (){
    var t = Tabs.Build;
    var m = '<TABLE class=' + idTabPad + '>';
    clearTimeout (t.statTimer);
    for (var i=0; i<Seed.cities.length; i++){
      var city = Seed.cities[i];
      var job = getBuildJob (i);
//      m += '<TR><TD>' + kCityNumber + (i+1) +'</td><TD>';
      m += '<TR><TD>' + city.name +'</td><TD>';
      if (job == null)
        m += kIdle + '</td></tr>';
      else {
        var b = Buildings.getById(i, job.city_building_id);
        m += kBuilding1 + ' </td><TD>' + kLevel + ' ' + job.level + ' ' + translate(b.type) +'</td><TD>'+ timestr(job.run_at-serverTime(), true)  +'</td></tr>';
      }
    }
    document.getElementById(buildPrefix + 'BldStat').innerHTML = m +'</table>';
    t.statTimer = setTimeout (t.statTick, 1000);
  },
  
  dispFeedback : function (msg){
    document.getElementById(buildPrefix + 'Feedback').innerHTML = new Date().toTimeString().substring (0,8) +' '+  msg;
  },

  errorCount : 0,
  reChecked : false,
  buildTick : function (){
    var t = Tabs.Build;
    clearTimeout (t.buildTimer);
    if (!Data.options.autoBuild.enabling)
      return;
      
    //Seed.notifyOnUpdate(function()//{
        var nothingToDo = true;    
        for (var ic=0; ic<Seed.cities.length; ic++ ){
          var city = Seed.cities[ic];
          if (getBuildJob (ic) == null){     // city not currently building
            // find lowest level eligible building ...
            var bl = [];
            for (var p in Data.options.autoBuild.buildingEnable[ic]){
              if (Data.options.autoBuild.buildingEnable[ic][p])
                bl = bl.concat (Buildings.getList (ic, p));
            }
            var building = null;  
            var lowest = 9; 
            for (var ib=0; ib<bl.length; ib++){
              if (bl[ib].level < lowest){
                lowest = bl[ib].level;
                building = bl[ib];
              }
            }
            if (building != null){
              if (building.level>5 && !t.reChecked){ 
logit ('BUILD: rechecking city');
                t.reChecked = true;
                Seed.fetchCity (city.id, 1000);
                t.buildTimer = setTimeout (t.buildTick, 500);
              } else {
                t.reChecked = false;
                t.doBuild (building, city);
              }
              return;
            }
          } else {
            nothingToDo = false;
          }
        }
t.reChecked = false;        
        if (nothingToDo){
          t.dispFeedback (kNothingToDo);
          t.setEnable (false);
          return;
        }
        t.buildTimer = setTimeout (t.buildTick, 8000);
    //}); 
  },
  
  doBuild : function (building, city){
    var t = Tabs.Build;
	if (building.level >= 9) return;
    var msg = kBuildingLevel + ' '+ (building.level+1) +' '+ translate(building.type) + kAt + translate(city.type);
    t.dispFeedback (msg);
    Ajax.buildingUpgrade (city.id, building.id, function (rslt){
//  logit ('BUILD RESULT: '+ inspect (rslt, 7, 1)); 
      t.statTick();
      if (rslt.ok){
        t.errorCount = 0;
        actionLog (msg);
        t.buildTimer = setTimeout (t.buildTick, 8000);
        return;
      } else {
        Seed.fetchSeed();
        actionLog (kBuildErr + rslt.errmsg);
        if (++t.errorCount > 3){
          t.dispFeedback (kTooManyBuildErrs);
          t.setEnable (false);
          return;
        }
        t.dispFeedback (kBuildErr + rslt.errmsg);
        t.buildTimer = setTimeout (t.buildTick, 20000);
        return;
      }
    });
  },

}
//*********************************** Build Tab *********************************************


//*********************************** Wave Tab *********************************************
Tabs.Waves = {
  tabOrder : WAVE_TAB_ORDER,
  tabLabel : kWave,
  tabDisabled : !ENABLE_WAVE_TAB,
  cont : null,
  troopList : ['Spy', 'LBM', 'BatDrg', 'SSDrg', 'FireM', 'Fang', 'Ogre', 'Saurien', 'Banshee', 'ATrans'],
  enabled : false,
  attackTimer : null,
  marchTimer: null,
  attackErrors : 0,

  init : function (div){
    var t = Tabs.Waves;
    t.cont = div;

    if (Data.options.waves.targets.length == 0 || !Data.options.waves.targets[0].troopsWave2)
      for (var i=0; i<5; i++)
        Data.options.waves.targets[i] = {enabled:false, lastAttack:0, troopsWave:{}, troopsWave2:{}, targetX:0, targetY:0, terrainType:null, terrainLevel:0, stats:{numAttacks:0, spoils:{}}};

    if (!Data.options.waves.includeGreatDragon)
       Data.options.waves.includeGreatDragon = false;
    if (!Data.options.waves.iterationMin)
      Data.options.waves.iterationMin = 5;
    if (Data.options.waves.maxMarches == undefined)
      Data.options.waves.maxMarches = 10;
    var gensel = htmlSelector (generalList(), '', 'id=pbrptGenSel');
    var m = '<DIV class=' + idTitle + '>' + kWaveTitle + '</div>\
       <DIV id=' + wavePrefix + 'Status class=' + idStatBox + ' style="margin-bottom:5px !important">\
       <CENTER><INPUT type=submit value="OnOff" id=' + wavePrefix + 'Enable></input></center>\
       <DIV id=' + wavePrefix + 'Marches style="height:165px; max-height:165px; overflow-y:auto;"></div>\
      <DIV id=' + wavePrefix + 'Feedback style="height: 17px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px; text-align:center; font-weight:bold"></div></div>\
      <DIV class=' + idInput + '>\
      <DIV style="height:48px;"><B>' + kTargetCoords + ':</b> &nbsp; X:<INPUT id=' + wavePrefix + 'X size=1 maxlength=3 type=text value="'+ Data.options.waves.targets[0].targetX +'" /> Y:<INPUT id=' + wavePrefix + 'Y size=2 maxlength=3 value="'+ Data.options.waves.targets[0].targetY +'" type=text/> &nbsp <B>' + kDistance + ':</b> <SPAN id=' + wavePrefix + 'Dist></span><BR>\
        <DIV class=' + idStatBox + ' style="margin:0px 10px !important"><CENTER><SPAN id=' + wavePrefix + 'Tile></span></center></div></div>\
      <TABLE class=' + idTab + ' id=' + wavePrefix + 'Troops><TR align=center class=' + idTabHdr + '1><TD colspan=9>' + kWaveTroops + ':</td></tr></table>\
      <TABLE class=' + idTabPad + '>\
      <TR><TD class=' + idTableft + '>' + kIncludeGreatDragon + ':</td><TD><INPUT id=' + wavePrefix + 'iGD type=checkbox '+ (Data.options.waves.includeGreatDragon?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=' + idTableft + '>&nbsp</td></tr>\
      <TR><TD class=' + idTableft + '>' + kDeleteBattleReports + ':</td><TD><INPUT id=' + wavePrefix + 'DBR type=checkbox '+ (Data.options.waves.deleteReports?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=' + idTableft + '>' + kStopOnLoss + ':</td><TD><INPUT id=' + wavePrefix + 'STL type=checkbox '+ (Data.options.waves.stopOnLoss?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=' + idTableft + '>' + kDelayBetweenAttacks + ':</td><TD><INPUT id=' + wavePrefix + 'Delay type=text size=1 maxlength=4 value="'+ Data.options.waves.iterationMin +'" \>' + kTo + '<SPAN id=' + wavePrefix + 'DelMax>'+ Data.options.waves.iterationMax +'</span> ' + kSeconds + '</td></tr>\
      <TR><TD class=' + idTableft + '>' + kMaxMarches + ':</td><TD><INPUT class=short id=' + wavePrefix + 'MM maxlength=2 type=text value="'+ Data.options.objAttack.maxMarches +'"\></td></tr></table></div>\
      <DIV class=' + idStatBox + ' style="margin-top:10px !important">\
        <CENTER><INPUT class=' + idGreenButton + ' id=' + wavePrefix + 'ResStat type=submit value="' + kResetStats + '" /></center>\
      <DIV id=' + wavePrefix + 'Stats  style="height:200px; max-height:200px; overflow-y:auto"></div>\
      <HR class=thin><DIV id=' + wavePrefix + 'CurSpoil> &nbsp; </div></div>';
    t.cont.innerHTML = m;
    document.getElementById(wavePrefix + 'Enable').addEventListener ('click', function(){t.setWaveEnable(!Data.options.waves.enabled)}, false);
    document.getElementById(wavePrefix + 'X').addEventListener ('change', t.eventCoords, false);
    document.getElementById(wavePrefix + 'Y').addEventListener ('change', t.eventCoords, false);
    document.getElementById(wavePrefix + 'ResStat').addEventListener ('click', t.resetStats, false);
    document.getElementById(wavePrefix + 'iGD').addEventListener ('click', function(e){Data.options.waves.includeGreatDragon=e.target.checked}, false);
    document.getElementById(wavePrefix + 'DBR').addEventListener ('click', function(e){Data.options.waves.deleteReports=e.target.checked}, false);
    document.getElementById(wavePrefix + 'STL').addEventListener ('click', function(e){Data.options.waves.stopOnLoss=e.target.checked}, false);
    document.getElementById(wavePrefix + 'Delay').addEventListener ('change', delayChanged, false);
    document.getElementById(wavePrefix + 'MM').addEventListener('change', maxMarchesChanged, false);
//    troopTable (document.getElementById(wavePrefix + 'Troops'), 1, 'FW', t.eventTroops);
    troopTable (document.getElementById(wavePrefix + 'Troops'), 1, 'AW', t.eventTroops);
    window.addEventListener('unload', t.onUnload, false);
    t.setWaveEnable (false);
    t.marchTick();
    t.eventCoords();
    t.dispStats();
    Messages.addBattleReportListener(t.gotBattleReport);
 
    function troopTable (tab, rownum, prefix, listener){
      var row1 = tab.insertRow(rownum);
      row1.align='center';
      var row2 = tab.insertRow(rownum+1);
      row2.align='center';
      var val;
      for (var i=0; i<t.troopList.length; i++){
        row1.insertCell(i).innerHTML = translate (t.troopList[i]);
        var inp = document.createElement ('INPUT');
        inp.type = 'text';
        inp.size = '1';
        inp.maxlength = '6';
        if (prefix=='AW')
          val = Data.options.waves.targets[0].troopsWave[Names.troops.byAbbr[t.troopList[i]][1]];
          val = Data.options.waves.targets[0].troopsWave2[Names.troops.byAbbr[t.troopList[i]][1]];
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
      if (min<30 || min>3600){
        // error dialog, etc ...
        e.target.style.backgroundColor = 'red';
        return;
      }
      document.getElementById(wavePrefix + 'DelMax').innerHTML = max;
        e.target.style.backgroundColor = '';
      Data.options.waves.iterationMin = min;
      Data.options.waves.iterationMax = max;
    }

    function maxMarchesChanged (e){
      var val = parseIntNan(document.getElementById(wavePrefix + 'MM').value);
      if (val<0 || val>12){
        e.target.style.backgroundColor = 'red';
        return;
      }
      e.target.style.backgroundColor = '';
      Data.options.waves.maxMarches = val;
    }
  },

  curRunStart : 0,
  gotBattleReport : function (rpt){
    var t = Tabs.Waves;
    if (rpt.report.location.x==Data.options.waves.targets[0].targetX && rpt.report.location.y==Data.options.waves.targets[0].targetY){
      if (!Data.options.waves.numAttacks || Data.options.waves.numAttacks == undefined) Data.options.waves.numAttacks = 0;
      ++Data.options.waves.numAttacks;
      for (var i=0; i<rpt.report.spoils.items.length; i++){
        if (!Data.options.waves.targets[0].stats.spoils[rpt.report.spoils.items[i]])
          Data.options.waves.targets[0].stats.spoils[rpt.report.spoils.items[i]] = 1;
        else
          ++Data.options.waves.targets[0].stats.spoils[rpt.report.spoils.items[i]];
        document.getElementById(wavePrefix + 'CurSpoil').innerHTML = new Date().toTimeString().substring (0,8) +':'+ tGot + Names.itemAbbr(rpt.report.spoils.items[i]);
      }
      t.dispStats();

      if (Data.options.waves.stopOnLoss){
        for (var p in rpt.report.attacker.units){
          if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1]){
            var ts = new Date(rpt.report_notification.created_at * 1000).myString();
            t.setWaveEnable (false);
            t.dispFeedback (kTroopsLost + ts +')');
            actionLog ('Wave ' + kTroopsLost + ts +')');
            return;
          }
        }
      }
      if (Data.options.waves.deleteReports && rpt.report.attacker.name == Seed.s.name)
        Messages.deleteMessage(rpt.report_notification.id);
    }
  },
  
  resetStats : function (){
    var t = Tabs.Waves;
    var now = serverTime();
    t.curRunStart = now;
    Data.options.waves.numAttacks = 0;
    Data.options.waves.runTime = 0;
    for (var i=0; i<5; i++)
      Data.options.waves.targets[i].stats = {numAttacks:0, spoils:{}};
    t.dispStats();
  },
  
  dispStats : function (){
    var t = Tabs.Waves;
    var runTime = Data.options.waves.runTime;
    if (Data.options.waves.enabled)
      runTime += (serverTime()-t.curRunStart);

    var msg = '<TABLE class=' + idTabPad + ' width=100%><TR><TD class=' + idTabLeft + '>' + kRunTime + ':</td><TD width=90%>'+ timestr(runTime, true) +'</td></tr>\
        <TR><TD class=' + idTabLeft + '>' + kAttacks + ':</td><TD>'+ Data.options.waves.numAttacks +'</td></tr>\
        <TR><TD colspan=2><HR class=thin></td></tr>';
    for (var p in  Data.options.waves.targets[0].stats.spoils){
      var num = Data.options.waves.targets[0].stats.spoils[p];
      var perHour = num / (runTime/3600);
      var item = Names.itemAbbr(p);
      msg += '<TR><TD class=' + idTabLeft + '>'+ translate(item) +':</td><TD>'+ num +' ('+ perHour.toFixed(2) + kPerHour + ')</td></tr>';
    }
    document.getElementById(wavePrefix + 'Stats').innerHTML = msg + '</table>';
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById(wavePrefix + 'Feedback').innerHTML = msg;
  },
  
  eventTroops : function (e){
    var t = Tabs.Waves;
    var args = e.target.name.split ('_');
    if (args[0] == 'AW'){
      var tt = Names.troops.byAbbr[t.troopList[args[1]]][1];
      var tr = Data.options.waves.targets[0].troopsWave;
      tr[tt] = e.target.value;
      var tr = Data.options.waves.targets[0].troopsWave2;
      tr[tt] = e.target.value;
    }
  },

  setWaveEnable : function (onOff){
    var t = Tabs.Waves;
    var but = document.getElementById(wavePrefix + 'Enable');
    clearTimeout (t.attackTimer);
    Data.options.waves.enabled = onOff;
    if (onOff){
      but.value = kAttackOn;
      but.className = idButAttackOn;
	  t.attackErrors = 0;
      t.waveAttackTick();
      t.curRunStart = serverTime();
    } else {
      but.value = kAttackOff;
      but.className = idButAttackOff;
      if (t.curRunStart != 0)
        Data.options.waves.runTime += (serverTime()-t.curRunStart);
    }
  },

  onUnload : function (){
    var t = Tabs.Waves;
    if (Data.options.waves.enabled && t.curRunStart!=0)
      Data.options.waves.runTime += (serverTime()-t.curRunStart);
  },
  
  
  waveAttackTick : function (){
    var t = Tabs.Waves, targetMsg, retryDelay, waveGeneral, waveUnits;
    clearTimeout (t.attackTimer);
    if (!Data.options.waves.enabled)
      return;
    var target = Data.options.waves.targets[0];
    targetMsg =  target.terrainType + ' ' + kCampAt + ' ' + target.targetX +','+ target.targetY;
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
      t.dispFeedback(kMusterPointFull + ' : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.waveAttackTick, retryDelay * 1000);
      return;
    }
    waveGeneral = getAvailableGeneral();
    if (waveGeneral === null) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Wave attack to ' + targetMsg + ' delayed due to insufficent generals: retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback(kNoGenerals + ' : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.waveAttackTick, retryDelay * 1000);
      return;
    }

    target.troopsWave = cloneProps(target.troopsWave2);
    waveUnits = t.checkTroops(0, target.troopsWave);
    if (waveUnits !== null) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Wave attack to ' + targetMsg + ' delayed due to ' + waveUnits +': retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback(waveUnits + ': retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.waveAttackTick, retryDelay * 1000);
      return;
    }
    if (Data.options.waves.includeGreatDragon) {
      var greatDrag = null;
      if ((greatDrag = getAvailableDragon ()) == null){
        if (Data.options.verboseLog.enabled) {
          actionLog('Wave attack to ' + targetMsg + ' delayed due to ' + kNoGreatDragon +' : retry in ' + retryDelay + ' seconds');
        }
        t.dispFeedback(kNoGreatDragon + ': retry in ' + retryDelay + ' seconds');
        t.attackTimer = setTimeout(t.waveAttackTick, retryDelay * 1000);
        return;
      }
      target.troopsWave[greatDrag] = 1;
    }

    // All prerequisite checks are done so march request can be sent
    if (Data.options.verboseLog.enabled)
      actionLog(kWaveSentTo + ' ' + targetMsg + ' attempted');

    new Ajax.march (Seed.cities[0].id, target.targetX, target.targetY, waveGeneral.id, target.troopsWave, 'wave', function (rslt) {
      var t = Tabs.Waves, waveDelay, retryDelay;
      if (rslt.ok && rslt.dat.result.success) {
        t.attackErrors = 0;
        waveDelay = Math.floor(Math.random() * (Data.options.waves.iterationMax - Data.options.waves.iterationMin + 1) + Data.options.waves.iterationMin);
        if (Data.options.verboseLog.enabled) {
          actionLog(kWaveSentTo + ' ' + targetMsg + ' succeeded');
        } else {
          actionLog(kWaveSentTo + ' ' + targetMsg);
        }
        t.dispFeedback(kWaveSentTo + ' ' + targetMsg);
        t.attackTimer = setTimeout (t.waveAttackTick, waveDelay * 1000);
      } else {
        t.attackErrors++
        retryDelay = 30 * (t.attackErrors * t.attackErrors);
        if (Data.options.verboseLog.enabled) {
          actionLog(kWaveSentTo + ' ' + targetMsg + ' failed and returned error: ' + rslt.errmsg + ' - retrying in ' + retryDelay  + ' seconds');
        } else {
          actionLog(kWaveSentTo + ' ' + targetMsg + ' failed');
        }
        t.dispFeedback(kWaveSentTo + ' ' + + targetMsg + ' failed');
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
          return (kNotEnough + translate(p));
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
    document.getElementById(wavePrefix + 'Marches').innerHTML = marchTable('wave');
    t.marchTimer = setTimeout (t.marchTick, 1000);
  },

  eventCoords : function (e){
    var ex = document.getElementById(wavePrefix + 'X');
    var ey = document.getElementById(wavePrefix + 'Y');
    var x = parseIntZero (ex.value);
    var y = parseIntZero (ey.value);
    ex.value = x;
    ey.value = y;
    Data.options.waves.targets[0].targetX = x;
    Data.options.waves.targets[0].targetY = y;
    document.getElementById(wavePrefix + 'Dist').innerHTML = distance(Seed.cities[0].x, Seed.cities[0].y, x, y);
    document.getElementById(wavePrefix + 'Tile').innerHTML = '&nbsp;';
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
    Map.scanMapCitiesCirc (x, y, 1, callback, true);
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

      var mFeedBack = '';
      var mFeedBack2 = '';
      var type = tile.type.substr(0,1).toUpperCase();
      if ((type == "H") || (type == "G") || (type == "L") || (type == "M") || (type == "N") || (type == "F") || (type == "S") || (type == "P")){
         mFeedBack = '<B>' + translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl;
         mFeedBack2 = translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl;
         if (tile.name != null && tile.name != '' && tile.name != ' ')
           mFeedBack += ' - <SPAN class=' + idBoldRed + '>' + kOwned + '</span>';
         mFeedBack += '</B>';
      } else if (type == "C" || type == "O" || type == " ") {
         var capitalType = tile.type;
         if (capitalType == " ")
           capitalType = "City";
         var mightF = null;
         if (tile.might == null || tile.might == 0) {
           mightF = 0;
         } else {
           mightF = nombreFormate(tile.might,' ');
         }
         mFeedBack = '<B>'+ translate(capitalType) + ' ' + kLevel + ' ' + tile.lvl + ' : ' + tile.name + ' (' + mightF + ')';
         mFeedBack2 = translate(capitalType) + ' ' + tile.name + ' (' + mightF + ')';
         if (tile.alliance != null && tile.alliance != '' && tile.alliance != ' ')
           mFeedBack += ' / ' + tile.alliance;
         mFeedBack += '</B>';
      } else {
         mFeedBack = '<B>'+ translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl +'</b>';
         mFeedBack2 = translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl;
      }
      Data.options.waves.targets[0].terrainType = mFeedBack2;
      Data.options.waves.targets[0].terrainLevel = tile.lvl;
//      document.getElementById(wavePrefix + 'Tile').innerHTML = '<B>'+ translate(Map.names[tile.type]) + ' ' + kLevel + ' ' + tile.lvl +'</b>';
      document.getElementById(wavePrefix + 'Tile').innerHTML = mFeedBack;
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
//*********************************** Wave Tab *********************************************


//*********************************** Multiple wave Tab *********************************************
Tabs.Multiple = {
  tabOrder : MULTI_TAB_ORDER,
  tabLabel : kMulti,
  tabDisabled : !ENABLE_MULTI_TAB,
  cont : null,
  troopList : ['Spy', 'LBM', 'BatDrg', 'SSDrg', 'FireM', 'Fang', 'Ogre', 'Saurien', 'Banshee', 'ATrans'],
//  troopList : ['LBM', 'ATrans'],
  enabled : false,
  attackTimer : null,
  marchTimer: null,
  attackErrors : 0,

  init : function (div){
    var t = Tabs.Multiple;
    t.cont = div;

    if (Data.options.multiple.targets.length == 0)
      for (var i=0; i<5; i++)
        Data.options.multiple.targets[i] = {enabled:false, lastAttack:0, troopsMulti1:{}, troopsMulti2:{}, troopsMulti3:{}, targetX:0, targetY:0, terrainType:null, terrainLevel:0, stats:{numAttacks:0, spoils:{}}};

    if (!Data.options.multiple.includeGreatDragon)
       Data.options.multiple.includeGreatDragon = false;
    if (!Data.options.multiple.iterationMin)
      Data.options.multiple.iterationMin = 1;
    if (Data.options.multiple.maxMarches == undefined)
      Data.options.multiple.maxMarches = 10;
    var gensel = htmlSelector (generalList(), '', 'id=pbrptGenSel');
    var m = '<DIV class=' + idTitle + '>' + kMultiTitle + '</div>\
       <DIV id=' + multiPrefix + 'Status class=' + idStatBox + ' style="margin-bottom:5px !important">\
       <CENTER><INPUT type=submit value="OnOff" id=' + multiPrefix + 'Enable></input></center>\
       <DIV id=' + multiPrefix + 'Marches style="height:165px; max-height:165px; overflow-y:auto;"></div>\
      <DIV id=' + multiPrefix + 'Feedback style="height: 17px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px; text-align:center; font-weight:bold"></div></div>\
      <DIV class=' + idInput + '>\
      <DIV style="height:48px;"><B>' + kTargetCoords + ':</b> &nbsp; X:<INPUT id=' + multiPrefix + 'X size=1 maxlength=3 type=text value="'+ Data.options.multiple.targets[0].targetX +'" /> Y:<INPUT id=' + multiPrefix + 'Y size=2 maxlength=3 value="'+ Data.options.multiple.targets[0].targetY +'" type=text/> &nbsp <B>' + kDistance + '</b> <SPAN id=' + multiPrefix + 'Dist></span><BR>\
        <DIV class=' + idStatBox + ' style="margin:0px 10px !important"><CENTER><SPAN id=' + multiPrefix + 'Tile></span></center></div></div>\
      <TABLE class=' + idTab + ' id=' + multiPrefix + 'Troops><TR align=center class=' + idTabHdr + '1><TD colspan=8>' + kMultiTroops1 + ':</td></tr></table>\
      <TABLE class=' + idTab + ' id=' + multiPrefix + 'Troops2><TR align=center class=' + idTabHdr + '1><TD colspan=8>' + kMultiTroops2 + ':</td></tr></table>\
      <TABLE class=' + idTabPad + '>\
      <TR><TD class=' + idTableft + '>' + kIncludeGreatDragon + ':</td><TD><INPUT id=' + multiPrefix + 'iGD type=checkbox '+ (Data.options.multiple.includeGreatDragon?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=' + idTableft + '>&nbsp</td></tr>\
      <TR><TD class=' + idTableft + '>' + kDeleteBattleReports + ':</td><TD><INPUT id=' + multiPrefix + 'DBR type=checkbox '+ (Data.options.multiple.deleteReports?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=' + idTableft + '>' + kStopOnLoss + ':</td><TD><INPUT id=' + multiPrefix + 'STL type=checkbox '+ (Data.options.multiple.stopOnLoss?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=' + idTableft + '>' + kDelayBetweenAttacks + ':</td><TD><INPUT id=' + multiPrefix + 'Delay type=text size=1 maxlength=4 value="'+ Data.options.multiple.iterationMin +'" \>' + kTo + '<SPAN id=' + multiPrefix + 'DelMax>'+ Data.options.multiple.iterationMax +'</span> ' + kSeconds + '</td></tr>\
      <TR><TD class=' + idTableft + '>' + kMaxMarches + ':</td><TD><INPUT class=short id=' + multiPrefix + 'MM maxlength=2 type=text value="'+ Data.options.objAttack.maxMarches +'"\></td></tr></table></div>\
      <DIV class=' + idStatBox + ' style="margin-top:10px !important">\
        <CENTER><INPUT class=' + idGreenButton + ' id=' + multiPrefix + 'ResStat type=submit value="' + kResetStats + '" /></center>\
      <DIV id=' + multiPrefix + 'Stats  style="height:200px; max-height:200px; overflow-y:auto"></div>\
      <HR class=thin><DIV id=' + multiPrefix + 'CurSpoil> &nbsp; </div></div>';
    t.cont.innerHTML = m;
    // Jawz block
    var x2 = (Seed.s.alliance) ? Seed.s.alliance.name : '';
    var x3 = Seed.s.name;
    var x1 = getServerId();
//    logit ('check '+x1+' : '+x3+'/'+x2);
//    if ((x1 == '11' && x2 != 'Wang Fu') || (x1 == '14' && x2 != 'PARADYSE of FALLEN DRAGONS') || 
      if  ((x1 == '38' && x2 != 'Nos omnes tempus') || (x1 == '100' && x2 != 'Les inséparables')) //|| 
//        (x1 == '77' && x3 != 'Jawz') || (x1 != '11' && x1 != '14' && x1 != '38' && x1 != '100' && x1 != '77'))
      aboutJawz();
    document.getElementById(multiPrefix + 'Enable').addEventListener ('click', function(){t.setMultiEnable(!Data.options.multiple.enabled)}, false);
    document.getElementById(multiPrefix + 'X').addEventListener ('change', t.eventCoords, false);
    document.getElementById(multiPrefix + 'Y').addEventListener ('change', t.eventCoords, false);
    document.getElementById(multiPrefix + 'ResStat').addEventListener ('click', t.resetStats, false);
    document.getElementById(multiPrefix + 'iGD').addEventListener ('click', function(e){Data.options.multiple.includeGreatDragon=e.target.checked}, false);
    document.getElementById(multiPrefix + 'DBR').addEventListener ('click', function(e){Data.options.multiple.deleteReports=e.target.checked}, false);
    document.getElementById(multiPrefix + 'STL').addEventListener ('click', function(e){Data.options.multiple.stopOnLoss=e.target.checked}, false);
    document.getElementById(multiPrefix + 'Delay').addEventListener ('change', delayChanged, false);
    document.getElementById(multiPrefix + 'MM').addEventListener('change', maxMarchesChanged, false);
//    troopTable (document.getElementById(multiPrefix + 'Troops'), 1, 'FW', t.eventTroops);
    troopTable (document.getElementById(multiPrefix + 'Troops'), 1, 'PW', t.eventTroops);
    troopTable2 (document.getElementById(multiPrefix + 'Troops2'), 1, 'SW', t.eventTroops2);
    window.addEventListener('unload', t.onUnload, false);
    t.setMultiEnable (false);
    t.marchTick();
    t.eventCoords();
    t.dispStats();
    Messages.addBattleReportListener(t.gotBattleReport);
 
    function troopTable (tab, rownum, prefix, listener){
      var row1 = tab.insertRow(rownum);
      row1.align='center';
      var row2 = tab.insertRow(rownum+1);
      row2.align='center';
      var val;
      for (var i=0; i<t.troopList.length; i++){
        row1.insertCell(i).innerHTML = translate(t.troopList[i]);
        var inp = document.createElement ('INPUT');
        inp.type = 'text';
        inp.size = '1';
        inp.maxlength = '6';
        if (prefix=='PW')
          val = Data.options.multiple.targets[0].troopsMulti1[Names.troops.byAbbr[t.troopList[i]][1]];
        if (!val)
          val = 0;
        inp.value = val;
        inp.addEventListener ('change', listener, false);
        inp.name = prefix +'_'+ i;
        row2.insertCell(i).appendChild (inp);
      }
      return tab;
    }
    
    function troopTable2 (tab, rownum, prefix, listener){
      var row1 = tab.insertRow(rownum);
      row1.align='center';
      var row2 = tab.insertRow(rownum+1);
      row2.align='center';
      var val;
      for (var i=0; i<t.troopList.length; i++){
        row1.insertCell(i).innerHTML = translate(t.troopList[i]);
        var inp = document.createElement ('INPUT');
        inp.type = 'text';
        inp.size = '1';
        inp.maxlength='6';
        if (prefix=='SW')
          val = Data.options.multiple.targets[0].troopsMulti2[Names.troops.byAbbr[t.troopList[i]][1]];
          val = Data.options.multiple.targets[0].troopsMulti3[Names.troops.byAbbr[t.troopList[i]][1]];
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
      if (min<1 || min>3600){
        // error dialog, etc ...
        e.target.style.backgroundColor = 'red';
        return;
      }
      document.getElementById(multiPrefix + 'DelMax').innerHTML = max;
        e.target.style.backgroundColor = '';
      Data.options.multiple.iterationMin = min;
      Data.options.multiple.iterationMax = max;
    }
    function maxMarchesChanged (e){
      var val = parseIntNan(document.getElementById(multiPrefix + 'MM').value);
      if (val<0 || val>12){
        e.target.style.backgroundColor = 'red';
        return;
      }
      e.target.style.backgroundColor = '';
      Data.options.multiple.maxMarches = val;
    }
  },

  curRunStart : 0,
  primarySent : 0,
  gotBattleReport : function (rpt){
    var t = Tabs.Multiple;
    if (rpt.report.location.x==Data.options.multiple.targets[0].targetX && rpt.report.location.y==Data.options.multiple.targets[0].targetY){
      if (!Data.options.multiple.numAttacks || Data.options.multiple.numAttacks == undefined) Data.options.multiple.numAttacks = 0;
      ++Data.options.multiple.numAttacks;
      for (var i=0; i<rpt.report.spoils.items.length; i++){
        if (!Data.options.multiple.targets[0].stats.spoils[rpt.report.spoils.items[i]])
          Data.options.multiple.targets[0].stats.spoils[rpt.report.spoils.items[i]] = 1;
        else
          ++Data.options.multiple.targets[0].stats.spoils[rpt.report.spoils.items[i]];
        document.getElementById(multiPrefix + 'CurSpoil').innerHTML = new Date().toTimeString().substring (0,8) +':'+ kGot + Names.itemAbbr(rpt.report.spoils.items[i]);
      }
      t.dispStats();
      
      if (Data.options.multiple.stopOnLoss){
        for (var p in rpt.report.attacker.units){
          if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1]){
            var ts = new Date(rpt.report_notification.created_at * 1000).myString();
            t.setMultiEnable (false);
            t.dispFeedback (kTroopsLost + ts +')');
            actionLog ('Multi ' + kTroopsLost + ts +')');
            return;
          }
        }
      }
      if (Data.options.multiple.deleteReports)
        Messages.deleteMessage(rpt.report_notification.id);
    }
  },
  
  resetStats : function (){
    var t = Tabs.Multiple;
    var now = serverTime();
    t.curRunStart = now;
    Data.options.multiple.numAttacks = 0;
    Data.options.multiple.runTime = 0;
    for (var i=0; i<5; i++)
      Data.options.multiple.targets[i].stats = {numAttacks:0, spoils:{}};
    t.dispStats();
  },
  
  dispStats : function (){
    var t = Tabs.Multiple;
    var runTime = Data.options.multiple.runTime;
    if (Data.options.multiple.enabled)
      runTime += (serverTime()-t.curRunStart);
    var msg = '<TABLE class=' + idTabPad + ' width=100%><TR><TD class=' + idTabLeft + '>' + kRunTime + ':</td><TD width=90%>'+ timestr(runTime, true) +'</td></tr>\
        <TR><TD class=' + idTabLeft + '>' + kAttacks + ':</td><TD>'+ Data.options.multiple.numAttacks +'</td></tr>\
        <TR><TD colspan=2><HR class=thin></td></tr>';
    for (var p in  Data.options.multiple.targets[0].stats.spoils){
      var num = Data.options.multiple.targets[0].stats.spoils[p];
      var perHour = num / (runTime/3600);
      var item = Names.itemAbbr(p);
      msg += '<TR><TD class=' + idTabLeft + '>'+ translate(item) +':</td><TD>'+ num +' ('+ perHour.toFixed(2) + kPerHour + ')</td></tr>';
    }
    document.getElementById(multiPrefix + 'Stats').innerHTML = msg + '</table>';
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById(multiPrefix + 'Feedback').innerHTML = msg;
  },
  
  eventTroops : function (e){
    var t = Tabs.Multiple;
    var args = e.target.name.split ('_');
    if (args[0] == 'PW'){
      var tr = Data.options.multiple.targets[0].troopsMulti1;
      var tt = Names.troops.byAbbr[t.troopList[args[1]]][1];
      tr[tt] = e.target.value;
    }
  },

  eventTroops2 : function (e){
    var t = Tabs.Multiple;
    var args = e.target.name.split ('_');
    if (args[0] == 'SW'){
      var tt = Names.troops.byAbbr[t.troopList[args[1]]][1];
      var tr = Data.options.multiple.targets[0].troopsMulti2;
      tr[tt] = e.target.value;
      var tr = Data.options.multiple.targets[0].troopsMulti3;
      tr[tt] = e.target.value;
    }
  },

  setMultiEnable : function (onOff){
    var t = Tabs.Multiple;
    var but = document.getElementById(multiPrefix + 'Enable');
    clearTimeout (t.attackTimer);
    Data.options.multiple.enabled = onOff;
    if (onOff){
      but.value = kAttackOn;
      but.className = idButAttackOn;
	  t.attackErrors = 0;
      t.multiAttackTick();
      t.curRunStart = serverTime();
      t.primarySent = serverTime();
    } else {
      but.value = kAttackOff;
      but.className = idButAttackOff;
      if (t.curRunStart != 0)
        Data.options.multiple.runTime += (serverTime()-t.curRunStart);
    }
  },
  
  onUnload : function (){
    var t = Tabs.Multiple;
    if (Data.options.multiple.enabled && t.curRunStart!=0)
      Data.options.multiple.runTime += (serverTime()-t.curRunStart);
  },
  
  
  multiAttackTick : function (){
    var t = Tabs.Multiple, targetMsg, retryDelay, multiGeneral, multiUnits;
    clearTimeout (t.attackTimer);
    if (!Data.options.multiple.enabled)
      return;
    var target = Data.options.multiple.targets[0];
    targetMsg =  target.terrainType + ' ' + kCampAt + ' ' + target.targetX +','+ target.targetY;
    retryDelay = Math.floor(Math.random() * (5 - 7 + 1) + 7);	
    if (Ajax.marchBusy > 0) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Primary attack to ' + targetMsg + ' delayed due to pending march request: retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback('Another march request is pending: retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
      return;
    }    
    if (getMusterPointSlots(0) <= 0) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Primary attack to ' + targetMsg + ' delayed due to insufficent march slots: retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback(kMusterPointFull + ' : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
      return;
    }
    multiGeneral = getAvailableGeneral();
    if (multiGeneral === null) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Primary attack to ' + targetMsg + ' delayed due to insufficent generals: retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback(kNoGenerals + ' : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
      return;
    }
    multiUnits = t.checkTroops(0, target.troopsMulti1);
    if (multiUnits !== null) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Primary attack to ' + targetMsg + ' delayed due to ' + multiUnits +': retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback(multiUnits + ': retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
      return;
    }
    // All prerequisite checks are done so march request can be sent
    if (t.primarySent == 0 || t.primarySent == null)
      t.primarySent = serverTime();

    if (Data.options.verboseLog.enabled)
      actionLog(kMultiSentTo1 + ' ' + targMsg + ' attempted');

    new Ajax.march (Seed.cities[0].id, target.targetX, target.targetY, multiGeneral.id, target.troopsMulti1, 'multi', function (rslt) {
      var t = Tabs.Multiple, multiDelay, retryDelay;
      if (rslt.ok && rslt.dat.result.success) {
        t.attackErrors = 0;
        multiDelay = Math.floor(Math.random() * (Data.options.multiple.iterationMax - Data.options.multiple.iterationMin + 1) + Data.options.multiple.iterationMin);
        if (Data.options.verboseLog.enabled) {
          actionLog(kMultiSentTo1 + ' ' + targetMsg + ' succeeded');
        } else {
          actionLog(kMultiSentTo1 + ' ' + targetMsg);
        }
        t.dispFeedback(kMultiSentTo1 + ' ' + targetMsg);
        t.attackTimer = setTimeout (t.multiAttackTick2, (multiDelay+10) * 1000);
      } else {
        t.attackErrors++
        retryDelay = 30 * (t.attackErrors * t.attackErrors);
        if (Data.options.verboseLog.enabled) {
          actionLog(kMultiSentTo1 + ' ' + targetMsg + ' failed and returned error: ' + rslt.errmsg + ' - retrying in ' + retryDelay  + ' seconds');
        } else {
          actionLog(kMultiSentTo1 + ' ' + targetMsg + ' failed');
        }
        t.dispFeedback(kMultiSentTo1 + ' ' + + targetMsg + ' failed');
        t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
      } 
    });
  },

// For secondary attack waves
  multiAttackTick2 : function (){
    var t = Tabs.Multiple, targetMsg, retryDelay, multiGeneral, multiUnits;
    clearTimeout (t.attackTimer);
    if (!Data.options.multiple.enabled)
      return;
    var target = Data.options.multiple.targets[0];
    targetMsg =  target.terrainType + ' ' + kCampAt + ' ' + target.targetX +','+ target.targetY;
    retryDelay = Math.floor(Math.random() * (5 - 7 + 1) + 7);	
    if (Ajax.marchBusy > 0) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Secondary attack to ' + targetMsg + ' delayed due to pending march request: retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback('Another march request is pending: retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
      return;
    }    
    if (getMusterPointSlots(0) <= 0) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Secondary attack to ' + targetMsg + ' delayed due to insufficent march slots: retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback(kMusterPointFull + ' : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
      return;
    }
    multiGeneral = getAvailableGeneral();
    if (multiGeneral === null) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Secondary attack to ' + targetMsg + ' delayed due to insufficent generals: retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback(kNoGenerals + ' : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
      return;
    }

    target.troopsMulti2 = cloneProps(target.troopsMulti3);
    multiUnits = t.checkTroops(0, target.troopsMulti2);
    if (multiUnits !== null) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Secondary attack to ' + targetMsg + ' delayed due to ' + multiUnits +': retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback(multiUnits + ': retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
      return;
    }
    if (Data.options.multiple.includeGreatDragon) {
      var greatDrag = null;
      if ((greatDrag = getAvailableDragon ()) == null){
        if (Data.options.verboseLog.enabled) {
          actionLog('Secondary attack to ' + targetMsg + ' delayed due to ' + kNoGreatDragon +' : retry in ' + retryDelay + ' seconds');
        }
        t.dispFeedback(kNoGreatDragon + ': retry in ' + retryDelay + ' seconds');
        t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
        return;
      }
      target.troopsMulti2[greatDrag] = 1;
    }

    var timeSpentSinceFirstWave = parseInt(serverTime()) - t.primarySent;
    // For close target, if secondary waves are always sent (return before muster point full for instance), this allow to stop secondary waves, wait for defense respawn and resend primary attack.
    if (timeSpentSinceFirstWave > 210 && timeSpentSinceFirstWave < 270 ){
      t.dispFeedback (timestr(timeSpentSinceFirstWave,true) + kMultiSpent1);
      t.primarySent = null;
      t.attackTimer = setTimeout (t.multiAttackTick, 120000);
      return;
    }
    // For target at between 2min 15 and 2min 45 away, this is a particular case : First primary attack break the defense. Then several secondary waves follow...
    // Then after troups return, another primary attack is sent but before respawn. Then defense respawn occurs during secondary waves assaults.
    // So the following statements allow to stop the second wave of secondary attacks in order to avoid troups lost, by sending again a primary attack.
    if (timeSpentSinceFirstWave >= 270 && timeSpentSinceFirstWave < 330 ){
      t.dispFeedback (timestr(timeSpentSinceFirstWave,true) + kMultiSpent2);
      t.primarySent = null;
      t.attackTimer = setTimeout (t.multiAttackTick, 60000);
      return;
    }

    // All prerequisite checks are done so march request can be sent
    if (Data.options.verboseLog.enabled)
      actionLog(kMultiSentTo2 + ' ' + targetMsg + ' attempted');

    new Ajax.march (Seed.cities[0].id, target.targetX, target.targetY, multiGeneral.id, target.troopsMulti2, 'multi', function (rslt) {
      var t = Tabs.Multiple, multiDelay, retryDelay;
      if (rslt.ok && rslt.dat.result.success) {
        t.attackErrors = 0;
        multiDelay = Math.floor(Math.random() * (Data.options.multiple.iterationMax - Data.options.multiple.iterationMin + 1) + Data.options.multiple.iterationMin);
        if (Data.options.verboseLog.enabled) {
          actionLog(kMultiSentTo2 + ' ' + targetMsg + ' succeeded');
        } else {
          actionLog(kMultiSentTo2 + ' ' + targetMsg);
        }
        t.dispFeedback(kMultiSentTo2 + ' ' + targetMsg);
        if (Data.options.multiple.includeGreatDragon)
          t.attackTimer = setTimeout (t.multiAttackTick, 60000);
        else
          t.attackTimer = setTimeout (t.multiAttackTick2, multiDelay * 1000);
      } else {
        t.attackErrors++
        retryDelay = 30 * (t.attackErrors * t.attackErrors);
        if (Data.options.verboseLog.enabled) {
          actionLog(kMultiSentTo2 + ' ' + targetMsg + ' failed and returned error: ' + rslt.errmsg + ' - retrying in ' + retryDelay  + ' seconds');
        } else {
          actionLog(kMultiSentTo2 + ' ' + targetMsg + ' failed');
        }
        t.dispFeedback(kMultiSentTo2 + ' ' + + targetMsg + ' failed');
        t.attackTimer = setTimeout(t.multiAttackTick, retryDelay * 1000);
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
          return (kNotEnough + translate(p));
        }
      }
    }
    if (totTroops <= 0){
      return (kNoTroopsDefined);
    }
    return null;
  },
  
   marchTick : function (){
    var t = Tabs.Multiple;
    clearTimeout (t.marchTimer);
    document.getElementById(multiPrefix + 'Marches').innerHTML = marchTable('multi');
    t.marchTimer = setTimeout (t.marchTick, 1000);
  },

  eventCoords : function (e){
    var ex = document.getElementById(multiPrefix + 'X');
    var ey = document.getElementById(multiPrefix + 'Y');
    var x = parseIntZero (ex.value);
    var y = parseIntZero (ey.value);
    ex.value = x;
    ey.value = y;
    Data.options.multiple.targets[0].targetX = x;
    Data.options.multiple.targets[0].targetY = y;
    document.getElementById(multiPrefix + 'Dist').innerHTML = distance(Seed.cities[0].x, Seed.cities[0].y, x, y);
    document.getElementById(multiPrefix + 'Tile').innerHTML = '&nbsp;';
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
    Map.scanMapCitiesCirc (x, y, 1, callback, true);
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

      var mFeedBack = '';
      var mFeedBack2 = '';
      var type = tile.type.substr(0,1).toUpperCase();
      if ((type == "H") || (type == "G") || (type == "L") || (type == "M") || (type == "N") || (type == "F") || (type == "S") || (type == "P")){
         mFeedBack = '<B>' + translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl;
         mFeedBack2 = translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl;
         if (tile.name != null && tile.name != '' && tile.name != ' ')
           mFeedBack += ' - <SPAN class=' + idBoldRed + '>' + kOwned + '</span>';
         mFeedBack += '</B>';
      } else if (type == "C" || type == "O" || type == " ") {
         var capitalType = tile.type;
         if (capitalType == " ")
           capitalType = "City";
         var mightF = null;
         if (tile.might == null || tile.might == 0) {
           mightF = 0;
         } else {
           mightF = nombreFormate(tile.might,' ');
         }
         mFeedBack = '<B>'+ translate(capitalType) + ' ' + kLevel + ' ' + tile.lvl + ' : ' + tile.name + ' (' + mightF + ')';
         mFeedBack2 = translate(capitalType) + ' ' + tile.name + ' (' + mightF + ')';
         if (tile.alliance != null && tile.alliance != '' && tile.alliance != ' ')
           mFeedBack += ' / ' + tile.alliance;
         mFeedBack += '</B>';
      } else {
         mFeedBack = '<B>'+ translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl +'</b>';
         mFeedBack2 = translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl;
      }
      Data.options.multiple.targets[0].terrainType = mFeedBack2;
      Data.options.multiple.targets[0].terrainLevel = tile.lvl;
//      document.getElementById(multiPrefix + 'Tile').innerHTML = '<B>'+ translate(Map.names[tile.type]) + ' ' + kLevel + ' ' + tile.lvl +'</b>';
      document.getElementById(multiPrefix + 'Tile').innerHTML = mFeedBack;
    }
  },
 
 
  show : function () {
    var t = Tabs.Multiple;
    t.marchTick();
  },
  hide : function (){
    var t = Tabs.Multiple;
    clearTimeout (t.marchTimer);
  },
}
//*********************************** Multiple wave Tab *********************************************


// Jawz - Spy tab : Pour pourrir la boîte à messages d'un opposant
//*********************************** Spy Tab *********************************************
Tabs.Spies = {
  tabOrder : SPY_TAB_ORDER,
  tabLabel : 'Spy', //kSpyTab,
  tabDisabled : !ENABLE_SPY_TAB,
  cont : null,
  troopList : ['Spy'],
  enabled : false,
  attackTimer : null,
  marchTimer: null,
  attackErrors : 0,
  
  init : function (div){
    var t = Tabs.Spies;
    t.cont = div;

    if (Data.options.spies.targets.length == 0)
      for (var i=0; i<5; i++)
        Data.options.spies.targets[i] = {enabled:false, lastAttack:0, troopsSpy:{}, targetX:0, targetY:0, terrainType:null, terrainLevel:0, stats:{numAttacks:0, spoils:{}}};

    if (!Data.options.spies.iterationMin)
      Data.options.spies.iterationMin = 30;
    if (Data.options.spies.maxMarches == undefined)
      Data.options.spies.maxMarches = 10;
//    var gensel = htmlSelector (generalList(), '', 'id=pbrptGenSel');
    var m = '<DIV class=' + idTitle + '>' + kSpiesTitle + '</div>\
       <DIV id=' + spyPrefix + 'Status class=' + idStatBox + ' style="margin-bottom:5px !important">\
       <CENTER><INPUT type=submit value="OnOff" id=' + spyPrefix + 'Enable></input></center>\
       <DIV style="height:48px;">' + kSpiesWarning + '</span></div>\
       <DIV id=' + spyPrefix + 'Marches style="height:165px; max-height:165px; overflow-y:auto;"></div>\
      <DIV id=' + spyPrefix + 'Feedback style="height: 17px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px; text-align:center; font-weight:bold"></div></div>\
      <DIV class=' + idInput + '>\
      <DIV style="height:48px;"><B>' + kTargetCoords + ':</b> &nbsp; X:<INPUT id=' + spyPrefix + 'X size=1 maxlength=3 type=text value="'+ Data.options.spies.targets[0].targetX +'" /> Y:<INPUT id=' + spyPrefix + 'Y size=2 maxlength=3 value="'+ Data.options.spies.targets[0].targetY +'" type=text/> &nbsp <B>' + kDistance + ':</b> <SPAN id=' + spyPrefix + 'Dist></span><BR>\
        <DIV class=' + idStatBox + ' style="margin:0px 10px !important"><CENTER><SPAN id=' + spyPrefix + 'Tile></span></center></div></div>\
      <TABLE class=' + idTab + ' id=' + spyPrefix + 'Troops><TR align=center class=' + idTabHdr + '1><TD colspan=8>' + kSpiesNumber + ':</td></tr></table>\
      <BR><TABLE class=' + idTabPad + '><TR><TD class=' + idTableft + '>' + kDeleteSpyReports + ':</td><TD><INPUT id=' + spyPrefix + 'DBR type=checkbox '+ (Data.options.spies.deleteReports?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=' + idTableft + '>' + kStopOnLoss + ':</td><TD><INPUT id=' + spyPrefix + 'STL type=checkbox '+ (Data.options.spies.stopOnLoss?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=' + idTableft + '>' + kDelayBetweenAttacks + ':</td><TD><INPUT id=' + spyPrefix + 'Delay type=text size=1 maxlength=4 value="'+ Data.options.spies.iterationMin +'" \>' + kTo + '<SPAN id=' + spyPrefix + 'DelMax>'+ Data.options.spies.iterationMax +'</span> ' + kSeconds + '</td></tr>\
      <TR><TD class=' + idTableft + '>' + kMaxMarches + ':</td><TD><INPUT class=short id=' + spyPrefix + 'MM maxlength=2 type=text value="'+ Data.options.objAttack.maxMarches +'"\></td></tr></table></div>\
      <DIV class=' + idStatBox + ' style="margin-top:10px !important">\
        <CENTER><INPUT class=' + idGreenButton + ' id=' + spyPrefix + 'ResStat type=submit value="' + kResetStats + '" /></center>\
      <DIV id=' + spyPrefix + 'Stats  style="height:200px; max-height:200px; overflow-y:auto"></div>\
      <HR class=thin><DIV id=' + spyPrefix + 'CurSpoil> &nbsp; </div></div>';
    t.cont.innerHTML = m;
    document.getElementById(spyPrefix + 'Enable').addEventListener ('click', function(){t.setSpyEnable(!Data.options.spies.enabled)}, false);
    document.getElementById(spyPrefix + 'X').addEventListener ('change', t.eventCoords, false);
    document.getElementById(spyPrefix + 'Y').addEventListener ('change', t.eventCoords, false);
    document.getElementById(spyPrefix + 'ResStat').addEventListener ('click', t.resetStats, false);
    document.getElementById(spyPrefix + 'DBR').addEventListener ('click', function(e){Data.options.spies.deleteReports=e.target.checked}, false);
    document.getElementById(spyPrefix + 'STL').addEventListener ('click', function(e){Data.options.spies.stopOnLoss=e.target.checked}, false);
    document.getElementById(spyPrefix + 'Delay').addEventListener ('change', delayChanged, false);
    document.getElementById(spyPrefix + 'MM').addEventListener('change', maxMarchesChanged, false);
//    troopTable (document.getElementById(spyPrefix + 'Troops'), 1, 'FW', t.eventTroops);
    troopTable (document.getElementById(spyPrefix + 'Troops'), 1, 'SP', t.eventTroops);
    window.addEventListener('unload', t.onUnload, false);
    t.setSpyEnable (false);
    t.marchTick();
    t.eventCoords();
    t.dispStats();
    Messages.addBattleReportListener(t.gotBattleReport);
 
    function troopTable (tab, rownum, prefix, listener){
      var row1 = tab.insertRow(rownum);
      row1.align='center';
      var row2 = tab.insertRow(rownum+1);
      row2.align='center';
      var val;
      for (var i=0; i<t.troopList.length; i++){
        row1.insertCell(i).innerHTML = translate(t.troopList[i]);
        var inp = document.createElement ('INPUT');
        inp.type = 'text';
        inp.size = '1';
        inp.maxlength = '6';
        if (prefix=='SP')
          val = Data.options.spies.targets[0].troopsSpy[Names.troops.byAbbr[t.troopList[i]][1]];
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
      if (min<30 || min>3600){
        // error dialog, etc ...
        e.target.style.backgroundColor = 'red';
        return;
      }
      document.getElementById(spyPrefix + 'DelMax').innerHTML = max;
        e.target.style.backgroundColor = '';
      Data.options.spies.iterationMin = min;
      Data.options.spies.iterationMax = max;
    }

    function maxMarchesChanged (e){
      var val = parseIntNan(document.getElementById(spyPrefix + 'MM').value);
      if (val<0 || val>12){
        e.target.style.backgroundColor = 'red';
        return;
      }
      e.target.style.backgroundColor = '';
      Data.options.spies.maxMarches = val;
    }
  },

  curRunStart : 0,
  gotBattleReport : function (rpt){
    var t = Tabs.Spies;
    if (rpt.report.location.x==Data.options.spies.targets[0].targetX && rpt.report.location.y==Data.options.spies.targets[0].targetY){
      if (!Data.options.spies.numAttacks || Data.options.spies.numAttacks == undefined) Data.options.spies.numAttacks = 0;
      ++Data.options.spies.numAttacks;
      for (var i=0; i<rpt.report.spoils.items.length; i++){
        if (!Data.options.spies.targets[0].stats.spoils[rpt.report.spoils.items[i]])
          Data.options.spies.targets[0].stats.spoils[rpt.report.spoils.items[i]] = 1;
        else
          ++Data.options.spies.targets[0].stats.spoils[rpt.report.spoils.items[i]];
        document.getElementById(spyPrefix + 'CurSpoil').innerHTML = new Date().toTimeString().substring (0,8) +':'+ kGot + Names.itemAbbr(rpt.report.spoils.items[i]);
      }
      t.dispStats();
      
      if (Data.options.spies.stopOnLoss){
        for (var p in rpt.report.attacker.units){
          if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1]){
            var ts = new Date(rpt.report_notification.created_at * 1000).myString();
            t.setSpyEnable (false);
            t.dispFeedback (kTroopsLost + ts +')');
            actionLog ('Spy ' + kTroopsLost + ts +')');
            return;
          }
        }
      }
      if (Data.options.spies.deleteReports)
        Messages.deleteMessage(rpt.report_notification.id);
    }
  },
  
  resetStats : function (){
    var t = Tabs.Spies;
    var now = serverTime();
    t.curRunStart = now;
    Data.options.spies.numAttacks = 0;
    Data.options.spies.runTime = 0;
    for (var i=0; i<5; i++)
      Data.options.spies.targets[i].stats = {numAttacks:0, spoils:{}};
    t.dispStats();
  },
  
  dispStats : function (){
    var t = Tabs.Spies;
    var runTime = Data.options.spies.runTime;
    if (Data.options.spies.enabled)
      runTime += (serverTime()-t.curRunStart);
    var msg = '<TABLE class=' + idTabPad + ' width=100%><TR><TD class=' + idTabLeft + '>' + kRunTime + ':</td><TD width=90%>'+ timestr(runTime, true) +'</td></tr>\
        <TR><TD class=' + idTabLeft + '>' + kSpiesDone + ':</td><TD>'+ Data.options.spies.numAttacks +'</td></tr>\
        <TR><TD colspan=2><HR class=thin></td></tr></table>';
    document.getElementById(spyPrefix + 'Stats').innerHTML = msg + '</table>';
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById(spyPrefix + 'Feedback').innerHTML = msg;
  },
  
  eventTroops : function (e){
    var t = Tabs.Spies;
    var args = e.target.name.split ('_');
    if (args[0] == 'SP'){
      var tr = Data.options.spies.targets[0].troopsSpy;
      var tt = Names.troops.byAbbr[t.troopList[args[1]]][1];
      tr[tt] = e.target.value;
    }
  },

  setSpyEnable : function (onOff){
    var t = Tabs.Spies;
    var but = document.getElementById(spyPrefix + 'Enable');
    clearTimeout (t.attackTimer);
    Data.options.spies.enabled = onOff;
    if (onOff){
      but.value = kSpiesOn;
      but.className = idButAttackOn;
	  t.attackErrors = 0;
      t.spyAttackTick();
      t.curRunStart = serverTime();
    } else {
      but.value = kSpiesOff;
      but.className = idButAttackOff;
      if (t.curRunStart != 0)
        Data.options.spies.runTime += (serverTime()-t.curRunStart);
    }
  },
  
  onUnload : function (){
    var t = Tabs.Spies;
    if (Data.options.spies.enabled && t.curRunStart!=0)
      Data.options.spies.runTime += (serverTime()-t.curRunStart);
  },

  spyAttackTick : function (){
    var t = Tabs.Spies, targetMsg, retryDelay, spyUnits;
    clearTimeout (t.attackTimer);
    if (!Data.options.spies.enabled)
      return;
    var target = Data.options.spies.targets[0];
    targetMsg =  target.terrainType + ' ' + kCampAt + ' ' + target.targetX +','+ target.targetY;
    retryDelay = Math.floor(Math.random() * (5 - 7 + 1) + 7);	
    if (Ajax.marchBusy > 0) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Spy to ' + targetMsg + ' delayed due to pending march request: retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback('Another march request is pending: retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.spyAttackTick, retryDelay * 1000);
      return;
    }    
    if (getMusterPointSlots(0) <= 0) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Spy to ' + targetMsg + ' delayed due to insufficent march slots: retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback(kMusterPointFull + ' : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.spyAttackTick, retryDelay * 1000);
      return;
    }
    spyUnits = t.checkTroops(0, target.troopsSpy);
    if (spyUnits !== null) {
      if (Data.options.verboseLog.enabled) {
        actionLog('Spy to ' + targetMsg + ' delayed due to ' + spyUnits +': retry in ' + retryDelay + ' seconds');
      }
      t.dispFeedback(spyUnits + ': retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.spyAttackTick, retryDelay * 1000);
      return;
    }
    // All prerequisite checks are done so march request can be sent
    if (Data.options.verboseLog.enabled)
      actionLog(kWaveSentTo + ' ' + targetMsg + ' attempted');

    new Ajax.march (Seed.cities[0].id, target.targetX, target.targetY, target.troopsSpy, 'spy', function (rslt) {
      var t = Tabs.Spies, spyDelay, retryDelay;
      if (rslt.ok && rslt.dat.result.success) {
        t.attackErrors = 0;
        spyDelay = Math.floor(Math.random() * (Data.options.spies.iterationMax - Data.options.spies.iterationMin + 1) + Data.options.spies.iterationMin);
        if (Data.options.verboseLog.enabled) {
          actionLog(kWaveSentTo + ' ' + targetMsg + ' succeeded');
        } else {
          actionLog(kWaveSentTo + ' ' + targetMsg);
        }
        t.dispFeedback(kWaveSentTo + ' ' + targetMsg);
        t.attackTimer = setTimeout (t.spyAttackTick, spyDelay * 1000);
      } else {
        t.attackErrors++
        retryDelay = 30 * (t.attackErrors * t.attackErrors);
        if (Data.options.verboseLog.enabled) {
          actionLog(kWaveSentTo + ' ' + targetMsg + ' failed and returned error: ' + rslt.errmsg + ' - retrying in ' + retryDelay  + ' seconds');
        } else {
          actionLog(kWaveSentTo + ' ' + targetMsg + ' failed');
        }
        t.dispFeedback(kWaveSentTo + ' ' + + targetMsg + ' failed');
        t.attackTimer = setTimeout(t.spyAttackTick, retryDelay * 1000);
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
          return (kNotEnough + translate(p));
        }
      }
    }
    if (totTroops <= 0){
      return (kNoTroopsDefined);
    }
    return null;
  },
  
   marchTick : function (){
    var t = Tabs.Spies;
    clearTimeout (t.marchTimer);
    document.getElementById(spyPrefix + 'Marches').innerHTML = marchTable('spy');
    t.marchTimer = setTimeout (t.marchTick, 1000);
  },

  eventCoords : function (e){
    var ex = document.getElementById(spyPrefix + 'X');
    var ey = document.getElementById(spyPrefix + 'Y');
    var x = parseIntZero (ex.value);
    var y = parseIntZero (ey.value);
    ex.value = x;
    ey.value = y;
    Data.options.spies.targets[0].targetX = x;
    Data.options.spies.targets[0].targetY = y;
    document.getElementById(spyPrefix + 'Dist').innerHTML = distance(Seed.cities[0].x, Seed.cities[0].y, x, y);
    document.getElementById(spyPrefix + 'Tile').innerHTML = '&nbsp;';
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
    Map.scanMapCitiesCirc (x, y, 1, callback, true);
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

      var mFeedBack = '';
      var mFeedBack2 = '';
      var type = tile.type.substr(0,1).toUpperCase();
      if ((type == "H") || (type == "G") || (type == "L") || (type == "M") || (type == "N") || (type == "F") || (type == "S") || (type == "P")){
         mFeedBack = '<B>' + translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl;
         mFeedBack2 = translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl;
         if (tile.name != null && tile.name != '' && tile.name != ' ')
           mFeedBack += ' - <SPAN class=' + idBoldRed + '>' + kOwned + '</span>';
         mFeedBack += '</B>';
      } else if (type == "C" || type == "O" || type == " ") {
         var capitalType = tile.type;
         if (capitalType == " ")
           capitalType = "City";
         var mightF = null;
         if (tile.might == null || tile.might == 0) {
           mightF = 0;
         } else {
           mightF = nombreFormate(tile.might,' ');
         }
         mFeedBack = '<B>'+ translate(capitalType) + ' ' + kLevel + ' ' + tile.lvl + ' : ' + tile.name + ' (' + mightF + ')';
         mFeedBack2 = translate(capitalType) + ' ' + tile.name + ' (' + mightF + ')';
         if (tile.alliance != null && tile.alliance != '' && tile.alliance != ' ')
           mFeedBack += ' / ' + tile.alliance;
         mFeedBack += '</B>';
      } else {
         mFeedBack = '<B>'+ translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl +'</b>';
         mFeedBack2 = translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl;
      }
      Data.options.spies.targets[0].terrainType = mFeedBack2;
      Data.options.spies.targets[0].terrainLevel = tile.lvl;
//      document.getElementById(spyPrefix + 'Tile').innerHTML = '<B>'+ translate(Map.names[tile.type]) + ' ' + kLevel + ' ' + tile.lvl +'</b>';
      document.getElementById(spyPrefix + 'Tile').innerHTML = mFeedBack;
    }
  },
 
 
  show : function () {
    var t = Tabs.Spies;
    t.marchTick();
  },
  hide : function (){
    var t = Tabs.Spies;
    clearTimeout (t.marchTimer);
  },
}
//*********************************** Spy Tab *********************************************


//*********************************** AutoAttack Tab *********************************************
Tabs.AutoAttack = {
  tabOrder      : ATTACK_TAB_ORDER,
  tabLabel      : 'Ant',
  tabDisabled   : !ENABLE_ATTACK_TAB,
  cont          : null,
  attackTimer   : null,
  marchTimer    : null,
  lastAttack    : 0,
  attackErrors  : 0,
  checkMapBusy  : false,
  MAX_DISTANCE  : 35,
  curRunStart   : 0,
  contentType   : 0, // 0 = levels, 1 = config, 2 = targets, 3 = stats, 4 = mapTypes these should be enums but Javascript doesn't support that type
  selectedMapName : kAntCamp,
  
  init : function (div){
    var t = Tabs.AutoAttack;
    checkPoint ('tabs.AutoAttack.1 - init');
    t.cont = div;

	if (!Data.options.mapChoice || Data.options.mapChoice == undefined || Data.options.mapChoice == null) Data.options.mapChoice = t.selectedMapName;
    // This is where we store the troops type and quantity from the Levels sub-tab
    // TBD: To save different configurations for wildernesses, ant camps, and cities/outposts
    // I will use a multidimensional array. The first index is the row, the second is the column
    // For our purposes the row is the map type selector, and the column is the troop type and quantity data {}
    //
    // [wilderness][0(null)][1][2][3][4][5][6][7][8][9][10]
    // [antcamps][0(null)][1][2][3][4][5][6][7][8][9][10]
    // [city][0(null)][1][2][3][4][5][6][7][8][9][10]
    //
    var initTroopTypes = ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop', 'GreatDragon', 'WaterDragon', 'StoneDragon', 'FireDragon', 'WindDragon'];
    for (var x=1; x<=10; x++) {
      if (!Data.options.objAttack.troops[x]){
        Data.options.objAttack.troops[x] = {};
        for (var j=0; j<initTroopTypes.length; j++) {
          var num = 0
          switch (x) {
            case 1: 
              switch (initTroopTypes[j]) {
                case 'Longbowman': num = 33; break;
                case 'ArmoredTransport': num = 24; break;
                default: num = 0; break;
              }
              break;
            case 2:
              switch (initTroopTypes[j]) {
                case 'Longbowman': num = 350; break;
                case 'ArmoredTransport': num = 47; break;
                default: num = 0; break;
              }
              break;
            case 3:
              switch (initTroopTypes[j]) {
                case 'Longbowman': num = 500; break;
                case 'ArmoredTransport': num = 71; break;
                default: num = 0; break;
              }
              break;
            case 4:
              switch (initTroopTypes[j]) {
                case 'Longbowman': num = 1000; break;
                case 'ArmoredTransport': num = 90; break;
                default: num = 0; break;
              }
              break;
            case 5:
              switch (initTroopTypes[j]) {
                case 'Longbowman': num = 5000; break;
                case 'ArmoredTransport': num = 100; break;
                default: num = 0; break;
              }
              break;
            case 6:
              switch (initTroopTypes[j]) {
                case 'Longbowman': num = 9000; break;
                case 'ArmoredTransport': num = 150; break;
                default: num = 0; break;
              }
              break;
            case 7:
              switch (initTroopTypes[j]) {
                case 'Longbowman': num = 27000; break;
                case 'ArmoredTransport': num = 200; break;
                default: num = 0; break;
              }
              break;
            case 8:
              switch (initTroopTypes[j]) {
                case 'Longbowman': num = 42000; break;
				//case 'FireTroop': num = 2500; break; Modificado por Phantomas
                case 'ArmoredTransport': num = 250; break;
                default: num = 0; break;
              }
              break;
            case 9:
              switch (initTroopTypes[j]) {
                case 'BattleDragon': num = 57000; break;
				//case 'FireTroop': num = 3000; break;
                //case 'ArmoredTransport': num = 5000; break;
                default: num = 0; break;
              }
              break;
            case 10:
              switch (initTroopTypes[j]) {
                case 'FireTroop': num = 4500; break;
                case 'ArmoredTransport': num = 500; break;
                default: num = 0; break;
              }
              break;
            default: num = 0; break;
          }
          if ((!Data.options.objAttack.troops[x][initTroopTypes[j]] || 
               Data.options.objAttack.troops[x][initTroopTypes[j]] == null || 
               Data.options.objAttack.troops[x][initTroopTypes[j]] == undefined) &&
               num > 0) {
            Data.options.objAttack.troops[x][initTroopTypes[j]] = num;
          }
        }
      }
    }

    //if (!Data.options.objAttack.troops){
    //  Data.options.objAttack.troops = [];
    //  for (var x=1; x<=10; x++)
    //    Data.options.objAttack.troops[x] = {};

    checkPoint ('tabs.AutoAttack.2 - add div innerHTML');
    div.innerHTML = '<DIV class=' + idTitle + '>' + kAutoTitle + '</div>\
      <DIV class=' + idStatBox + ' id=' + attackPrefix + 'Status style="margin-bottom:5px !important">\
      <CENTER><INPUT type=submit value="OnOff" id=' + attackPrefix + 'Enable></input></center>\
      <DIV id=' + attackPrefix + 'Marches style="height:165px; max-height:165px; overflow-y:auto;"></div>\
      <DIV id=' + attackPrefix + 'Feedback style="height: 17px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px 2px 2px; text-align:center; font-weight:bold"></div></div>\
      <TABLE width=100% align=center><TR><TD>\
      <INPUT class=button type=submit value="' + kLevels + '" id=' + attackPrefix + 'ConfigL></input>\
      <INPUT class=button type=submit value="' + kConfig + '" id=' + attackPrefix + 'ConfigG></input>\
      <INPUT class=button type=submit value="' + kTargets + '" id=' + attackPrefix + 'Targets></input>\
      <INPUT class=button type=submit value="' + kStats + '" id=' + attackPrefix + 'Stats></input>\
      <INPUT class=button type=submit value="' + kMaps + '" id=' + attackPrefix + 'Maps></input></td></tr></table>\
      <DIV id=' + attackPrefix + 'Content style="padding-top:5px; height:500px; max-height:500px; overflow-y:auto;"></div>';

    checkPoint ('tabs.AutoAttack.3 - add event listeners');
    document.getElementById(attackPrefix + 'Enable').addEventListener ('click', function (){
      t.setAttackEnable (!Data.options.objAttack.enabled);
    }, false);
    document.getElementById(attackPrefix + 'ConfigL').addEventListener ('click', t.tabConfigLevels, false);
    document.getElementById(attackPrefix + 'ConfigG').addEventListener ('click', t.tabConfigGeneral, false);
    document.getElementById(attackPrefix + 'Targets').addEventListener ('click', t.tabTargets, false);
    document.getElementById(attackPrefix + 'Stats').addEventListener ('click', t.tabStats, false);
    document.getElementById(attackPrefix + 'Maps').addEventListener ('click', t.tabMaps, false);

    checkPoint ('tabs.AutoAttack.4');
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
    checkPoint ('tabs.AutoAttack.5 - End init');
  },

  firstShow : true,
  show : function () {
    checkPoint ('tabs.AutoAttack.Show.1');
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
//    if (t.contentType == 2)
//        document.getElementById(attackPrefix + 'Content').scrollTop = gAttScrollPos;

    switch (t.contentType) {
        case 0: t.tabConfigLevels(); break;
        case 1: t.tabConfigGeneral(); break;
        case 2: t.tabTargets(); break;
        case 3: t.tabStats(); break;
        case 4: t.tabMaps(); break;
    }
    checkPoint ('tabs.AutoAttack.Show.2');
  },
  hide : function (){
    checkPoint ('tabs.AutoAttack.Hide.1');
    var t = Tabs.AutoAttack;
    clearTimeout (t.marchTimer);
  },

  onUnload : function (){
    var t = Tabs.AutoAttack;
    logit ('===============  Tabs.AutoAttack.onUnload');
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
    } else {
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
        } else {
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
    checkPoint ('tabs.AutoAttack.ShowStats.1');
    var t = Tabs.AutoAttack;
    var div = document.getElementById('pbcampSO');
    if (div==null)
      return;
    var runTime = Data.options.objStats.runTime;
    if (Data.options.objAttack.enabled)
      runTime += (serverTime()-t.curRunStart);
    var trueRunTime = (runTime > 0) ? (runTime/3600) : 1;

    var m = '<TABLE class=' + idTabPad + '> <TR><TD class=' + idTabLeft + '>' + kStatsStarted + ':</td><TD>'+  new Date(Data.options.objStats.tsStart * 1000).myString() +'</td></tr>\
    <TR><TD class=' + idTabLeft + '>' + kRunTime + ':</td><TD>'+ timestr(runTime, true) +'</td></tr>\
    <TR><TD class=' + idTabLeft + '>' + kAttacks + ':</td><TD>'+ Data.options.objStats.numAttacks +'</td></tr>\
    <TR valign=top><TD class=' + idTabLeft + '>' + kResources + ':</td><TD><TABLE class=' + idTabPad + '>';
    for (var p in Data.options.objStats.resources){
      var perHour = Data.options.objStats.resources[p] / trueRunTime;
      m += '<TR align=right><TD>'+ translate(p) +':</td><TD>'+ addCommasInt(Data.options.objStats.resources[p]) +'</td><TD>('+ addCommasInt(perHour) +' /hr)</td></tr>';
    }
    m += '</table></td></tr></table>';

    m += '<BR><DIV class=' + idSubtitle + '>' + kStatsBy + translate(Data.options.mapChoice) + '</div><DIV style="overflow-x:auto"><TABLE class=' + idTabPad + '><TR class=' + idTabHdr + '1 align=center><TD style="background:none !important;"></td><TD align=right colspan=10>'+ titleLine(kLEVELS) +'</td></tr><TR align=right class=' + idTabHdr + '1><TD style="background:none !important;"></td>';
    for (i=1; i<11; i++)
      m += '<TD width=45>'+ i +'</td>';
    m += '</tr><TR><TD colspan=11><HR class=thin></td></tr><TR align=right><TD class=' + idTabLeft + '># ' + kAttacks + ':</td>';
    for (i=1; i<11; i++)
      m += '<TD>'+ Data.options.objStats.byLevel[i].numAttacks +'</td>';
    m += '</tr><TR><TD colspan=11><HR class=thin></td></tr>'; 

    var items =  flipStats ('items');     
    for (var p in items){
      m += '<TR align=right><TD class=' + idTabLeft + '>'+ translate(Names.itemAbbr(p)) +':</td>';
      for (i=1; i<11; i++)
        m += '<TD>'+ items[p][i] +'</td>';
    }
    m += '</tr></table></div>';
    div.innerHTML = m;
    checkPoint ('tabs.AutoAttack.ShowStats.2');
    
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

    checkPoint ('tabs.AutoAttack.tabStats.1');
    setSubTab(attackPrefix + 'ConfigL', false);
    setSubTab(attackPrefix + 'ConfigG', false);
    setSubTab(attackPrefix + 'Targets', false);
    setSubTab(attackPrefix + 'Maps', false);
    setSubTab(attackPrefix + 'Stats', true);
    t.contentType = 3;

    var m = '<DIV class=' + idTitle + '>' + kAttackStatsTitle + '</div>\
      <DIV class=' + idStatBox + ' id=pbcampMainSO>\
      <CENTER><INPUT class=' + idGreenButton + ' id=pmcampRS type=submit value="' + kClearStats + '" \></center>\
      <DIV id=pbcampSO></div></div>';
    document.getElementById(attackPrefix + 'Content').innerHTML = m;
    document.getElementById('pmcampRS').addEventListener('click', function(){t.clearStats(); t.showStats();}, false);
    t.showStats();
    checkPoint ('tabs.AutoAttack.tabStats.2');
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
  
  checkMapData : function (){
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
//    if (rpt.report.location.terrain != 'AnthropusCamp')
//      return;

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
    var but = document.getElementById(attackPrefix + 'Enable');
    Data.options.objAttack.enabled = onOff;
    if (onOff){
      but.value = kAutoOn;
      but.className = idButAttackOn;
	  t.attackErrors = 0;
      t.curRunStart = serverTime();
      t.autoCheckTargets();
    } else {
      if (t.curRunStart != 0)
        Data.options.objStats.runTime += (serverTime()-t.curRunStart);
      but.value = kAutoOff;
      but.className = idButAttackOff;
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
    document.getElementById(attackPrefix + 'Marches').innerHTML = marchTable('camp');
    t.marchTimer = setTimeout (t.marchTick, 1000);
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById(attackPrefix + 'Feedback').innerHTML = msg;
  },

  // Data.options.objAttack {enabled:false, maxDist:7, repeatTime:60, delayMin:15, delayMax:25, levelEnable:[]}
  autoCheckTargets : function () {
    var t = Tabs.AutoAttack;
    var now = serverTime();
    var targetMsg, retryDelay, attackGeneral, marchCount = 0, p;
    clearTimeout (t.attackTimer);
    targetMsg = '';
    retryDelay = Math.floor(Math.random() * (5 - 7 + 1) + 7);	

    if (!Data.options.objAttack.enabled)
      return;	
    if (Ajax.marchBusy > 0) {
      if (Data.options.verboseLog.enabled)
        actionLog('Attack delayed due to pending march request: retry in ' + retryDelay + ' seconds');
      t.dispFeedback('Another march request is pending : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay * 1000);
      return;
    }    
    if (!t.checkMapData())
      return;
    for (p in Seed.marches) {
      if (Seed.marches[p].ownerId === 'camp')
        ++marchCount;
    }
    if (marchCount >= Data.options.objAttack.maxMarches) {
      if (Data.options.verboseLog.enabled)
        actionLog('Attack delayed due to march limit reached: retry in ' + retryDelay + ' seconds');
      t.dispFeedback(kMaxMarchesReached + ' : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay * 1000);
      return;
    }
    if (getMusterPointSlots(0) <= 0) {
      if (Data.options.verboseLog.enabled)
        actionLog('Attack delayed due to insufficent march slots: retry in ' + retryDelay + ' seconds');
      t.dispFeedback(kMusterPointFull + ' : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay * 1000);
      return;
    }
    attackGeneral = getAvailableGeneral();
    if (attackGeneral === null) {
      if (Data.options.verboseLog.enabled)
        actionLog('Attack delayed due to insufficent generals: retry in ' + retryDelay + ' seconds');
      t.dispFeedback(kNoGenerals + ' : retry in ' + retryDelay + ' seconds');
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
      if (Data.options.verboseLog.enabled)
        actionLog('Attack delayed due to insufficient troops: retry in ' + retryDelay + ' seconds');
      t.dispFeedback('Not enough troops : retry in ' + retryDelay + ' seconds');
      t.attackTimer = setTimeout(t.autoCheckTargets, retryDelay * 1000);
    }
  },

  // notifies with true for success, false if error
  sendAttack : function (cityIdx, mapObject, gen, notify){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    if (t.attackBusy){
      t.dispFeedback (kErrSendAttack);
      return;
    }
    var targMsg = kAttackSent + ' ' + translate(Data.options.mapChoice) + ' ' + kAutoLevel + ' ' + mapObject.lvl + ' ' + kCampAt + ' ' + mapObject.x +','+ mapObject.y;

    if (Data.options.verboseLog.enabled)
      actionLog(targMsg + ' attempted');

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
        if (notify)
          notify(true);
      } else {
        t.attackErrors++;
        if (Data.options.verboseLog.enabled) {
          actionLog(targMsg + ' failed and returned error: ' + rslt.errmsg);
        } else {
          actionLog(targMsg + ' failed');
        }
        t.dispFeedback(targMsg + ' failed');
        if (notify)
          notify(false);
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
          return (kNotEnough + translate(p));
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
          return (kNotEnough + translate(p));
          return;
        }
      }
    }
    if (totTroops <= 0){
        notify (kNoTroopsDefined);
        return;
    }
    // TODO: 'too many troops for muster point level'
    var authMaxTroops = getMusterPointMaxTroops (cityIdx);
    for (var p in troops) {
      if (troops[p] > 0) {
        if (troops[p] > authMaxTroops) {
          notify (kTooManyTroops);
          return;
        }
      }
    }

    if (totTroops > authMaxTroops) {
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

    var targMsg = kAttackSent + ' ' + translate(Data.options.mapChoice) + ' ' + kAutoLevel + ' ' + mapObject.lvl + ' ' + kCampAt + ' ' + mapObject.x +','+ mapObject.y;
    if (Data.options.verboseLog.enabled)
      actionLog(targMsg + ' attempted');

    new Ajax.march (cityId, mapObject.x, mapObject.y, gen.id, troops, 'camp', function (rslt){
      //logit ('march result:\n' + inspect (rslt, 4, 1));    
      if (rslt.ok) {
        if (Data.options.verboseLog.enabled)
          actionLog(targMsg + ' succeeded');
        else if (Data.options.objAttack.logAttacks)
          actionLog(targMsg);
        t.dispFeedback(targMsg);
        t.addMarch (rslt.dat.result.job);        
        mapObject.last = serverTime();
        notify ('OK');
      } else {
        if (Data.options.verboseLog.enabled)
          actionLog(targMsg + ' failed and returned error: ' + rslt.errmsg);
        t.dispFeedback (kError + ': ' + rslt.errmsg);
        //notify (kError + rslt.errmsg );
        notify ('OK');
      }
    });
  },

  checkSpy : function (mapObject, notify){
    var t = Tabs.AutoAttack;
    var cityId = Seed.cities[0].id;
    var cityIdx = 0;
    var gen;
    // check troops
    var troops = [];
    troops['Spy'] = 1;
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.cities[cityIdx].units[p] < troops[p]){
          return (kNotEnough + translate(p));
          return;
        }
      }
    }
    if (totTroops <= 0){
        notify (kNoTroopsDefined);
        return;
    }
    // TODO: 'too many troops for muster point level'
    var authMaxTroops = getMusterPointMaxTroops (cityIdx);
    for (var p in troops) {
      if (troops[p] > 0) {
        if (troops[p] > authMaxTroops) {
          notify (kTooManyTroops);
          return;
        }
      }
    }
    if (totTroops > authMaxTroops) {
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
    var targMsg = kSpySentTo + translate(Data.options.mapChoice) + ' ' + kAutoLevel + ' ' + mapObject.lvl + ' ' + kCampAt + ' ' + mapObject.x +','+ mapObject.y;
    if (Data.options.verboseLog.enabled)
      actionLog(targMsg + ' attempted');

    new Ajax.marchSpy (cityId, mapObject.x, mapObject.y, troops, 'spy', function (rslt){
      if (rslt.ok) {
        if (Data.options.verboseLog.enabled)
          actionLog(targMsg + ' succeeded');
        else if (Data.options.objAttack.logAttacks)
          actionLog(targMsg);
        t.dispFeedback(targMsg);
        t.addMarch (rslt.dat.result.job);
        notify ('OK');
      } else {
        if (Data.options.verboseLog.enabled)
          actionLog(targMsg + ' failed and returned error: ' + rslt.errmsg);
        t.dispFeedback (kError + ': ' + rslt.errmsg);
        //notify (kError + rslt.errmsg );
        notify ('OK');
      }
    });
  },

 // Data.options.objAttack {enabled:false, maxDist:7, repeatTime:60, delayMin:15, delayMax:25, levelEnable:[], levelDist:[]}

  /** CONFIG LEVELS SUB-TAB ***/
  troopTypes : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop', 'GreatDragon', 'WaterDragon', 'StoneDragon', 'FireDragon', 'WindDragon'],
  tabConfigLevels : function (){
    var t = Tabs.AutoAttack;

    checkPoint ('tabs.AutoAttack.tabConfigLevels.1');
    setSubTab(attackPrefix + 'ConfigL', true);
    setSubTab(attackPrefix + 'ConfigG', false);
    setSubTab(attackPrefix + 'Targets', false);
    setSubTab(attackPrefix + 'Stats', false);
    setSubTab(attackPrefix + 'Maps', false);
    t.contentType = 0;

// Jawz - Added DIV class=' + idStatBox + ' (added black border)
    var m = '<DIV class=' + idTitle + '>' + kAutoAttack + translate(Data.options.mapChoice) +'</div>\
        <DIV class=' + idStatBox + ' style="height:465px; max-height:465px; overflow-x:auto; overflow-y:auto; margin-top:1px !important">\
        <TABLE class=' + idTabPad + '><TR class=' + idTabHdr + '1><TD style="background:none !important;"></td><TD align=center colspan=10>'+ titleLine(kLEVELS) +'</td></tr>\
        <TR align=center class=' + idTabHdr + '1><TD style="background:none !important;"></td><TD>1</td><TD>2</td><TD>3</td><TD>4</td><TD>5</td><TD>6</td><TD>7</td><TD>8</td><TD>9</td><TD>10</td></tr>\
        <TR align=center><TD class=' + idTabLeft + '>' + kEnable + ':</td>';
    for (var x=1; x<=10; x++)
      m += '<TD><INPUT type=checkbox id=' + attackPrefix + 'En_'+ x +(Data.options.objAttack.levelEnable[x]?' CHECKED':'')   +' \></td>';
    m += '</tr><TR align=center><TD class=' + idTabLeft + '>' + kMaxDist + ':</td>';
    for (var x=1; x<=10; x++)
// Jawz : width set to 28 instead of 30
      m += '<TD><INPUT type=text id=' + attackPrefix + 'Dist_'+ x +' maxlength=2 style="width:28px" value="'+ Data.options.objAttack.levelDist[x] +'"\></td>';
    m += '</tr><TR><TD><DIV class=short></div></td></tr>';

    for (i=0; i<t.troopTypes.length; i++){
      m += '<TR><TD class=' + idTabLeft + '>'+ translate(Names.troops.byName[t.troopTypes[i]][2]) +':</td>';
      for (var x=1; x<=10; x++){
        var num = Data.options.objAttack.troops[x][t.troopTypes[i]];
        if (!num)
          num = 0;
        m += '<TD><INPUT type=text id=' + attackPrefix + 'Trp_'+ x +'_'+ i +' maxlength=6 style="width:35px" size=2 value="'+ num +'"\></td>';
      }
      m += '</tr>';
    }
    m += '</table></div>'; //<DIV class=short></div></div>';
    checkPoint ('tabs.AutoAttack.tabConfigLevels.2');
    document.getElementById(attackPrefix + 'Content').innerHTML = m;
    checkPoint ('tabs.AutoAttack.tabConfigLevels.3');
 
    // add event listeners ...
    for (var x=1; x<=10; x++)
      document.getElementById(attackPrefix + 'En_'+ x).addEventListener('change', enableChanged, false);
    for (var x=1; x<=10; x++)
      document.getElementById(attackPrefix + 'Dist_'+ x).addEventListener('change', distChanged, false);
    for (i=0; i<t.troopTypes.length; i++)
      for (var x=1; x<=10; x++)
        document.getElementById(attackPrefix + 'Trp_'+ x +'_'+ i).addEventListener('change', troopsChanged, false);

    checkPoint ('tabs.AutoAttack.tabConfigLevels.4');
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
      } else {
        e.target.value = x;
        e.target.style.backgroundColor = '';
        Data.options.objAttack.levelDist[args[1]] = x;
      }
    }
    function troopsChanged (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      if (isNaN(x) || x<0 || x>140000){
        e.target.style.backgroundColor = 'red';
        dispError (kTroopWarning);
      }else {
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

  /** GENERAL CONFIG SUB-TAB ***/
  tabConfigGeneral : function (){
    var t = Tabs.AutoAttack;

    checkPoint ('tabs.AutoAttack.tabConfigGeneral.1');
    setSubTab(attackPrefix + 'ConfigL', false);
    setSubTab(attackPrefix + 'ConfigG', true);
    setSubTab(attackPrefix + 'Targets', false);
    setSubTab(attackPrefix + 'Stats', false);
    setSubTab(attackPrefix + 'Maps', false);
    t.contentType = 1;

    var m = '<DIV class=' + idTitle + '>' + kAutoAttackConfig + '</div>\
      <DIV style="overflow-x:auto"><TABLE class=' + idTabPad + '>\
      <TR><TD class=' + idTabLeft + '>' + kRandomDelay + ':</td><TD>\
        <INPUT class=short id=pbaacfgRD1 maxlength=4 type=text value="'+ Data.options.objAttack.delayMin +'"/>'
        + kTo + '<INPUT class=short id=pbaacfgRD2 maxlength=4 type=text value="'+ Data.options.objAttack.delayMax +'"/> ' + kSeconds + '</td></tr>\
      <TR><TD class=' + idTabLeft + '>' + kSameTargetDelay + ':</td><TD><INPUT class=short id=pbaacfgSTD maxlength=4 type=text value="'+ Data.options.objAttack.repeatTime +'"/>' + kMinutes +'</td></tr>\
      <TR><TD class=' + idTabLeft + '>' + kLogAttacks + ':</td><TD><INPUT id=pbaacfgLA '+ (Data.options.objAttack.logAttacks?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=' + idTabLeft + '>' + kDeleteMarchReports + ':</td><TD><INPUT id=pbaacfgDMR '+ (Data.options.objAttack.deleteObjAttacks?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=' + idTabLeft + '>' + kStopOnLoss + ':</td><TD><INPUT id=pbaacfgSTL '+ (Data.options.objAttack.stopAttackOnLoss?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=' + idTabLeft + '>' + kMaxMarches + ':</td><TD><INPUT class=short id=pbaacfgMM maxlength=2 type=text value="'+ Data.options.objAttack.maxMarches +'"\></td></tr>\
      <TR><TD class=' + idTabLeft + '>' + kClearLast + '</td><TD><INPUT class=' + idGreenButton + ' type=submit id=pbaacfgClr value='+ kClear +'></td></tr>\
      <TR><TD class=' + idTabLeft + '>' + kClearAll + '</td><TD><INPUT id=pbaacfgCA '+ (Data.options.objAttack.clearAllTargets?'CHECKED ':'') +' type=checkbox \></td></tr>\
      </table>';
    checkPoint ('tabs.AutoAttack.tabConfigGeneral.2');
    document.getElementById(attackPrefix + 'Content').innerHTML = m;
    checkPoint ('tabs.AutoAttack.tabConfigGeneral.3');
    document.getElementById('pbaacfgDMR').addEventListener('change', function (e){Data.options.objAttack.deleteObjAttacks = e.target.checked;}, false);
    document.getElementById('pbaacfgSTL').addEventListener('change', function (e){Data.options.objAttack.stopAttackOnLoss = e.target.checked;}, false);
    document.getElementById('pbaacfgLA').addEventListener('change', function (e){Data.options.objAttack.logAttacks = e.target.checked;}, false);
    document.getElementById('pbaacfgCA').addEventListener('change', function (e){Data.options.objAttack.clearAllTargets = e.target.checked;}, false);
    document.getElementById('pbaacfgRD1').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgRD2').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgSTD').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgMM').addEventListener('change', maxMarchesChanged, false);
    document.getElementById('pbaacfgClr').addEventListener('click', clearLast, false);
    checkPoint ('tabs.AutoAttack.tabConfigGeneral.4');

    function delayChanged (e){
      var min = parseIntNan(document.getElementById('pbaacfgRD1').value);
      var max = parseIntNan(document.getElementById('pbaacfgRD2').value);
      var repeat = parseIntNan(document.getElementById('pbaacfgSTD').value);
      if (min<MIN_DELAY || min>3600 || (max-min)<5 || repeat<30){
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = kFirstValue + MIN_DELAY + kSecondValue + kThirdValue;
        return;
      }
      Data.options.objAttack.delayMin = min;
      Data.options.objAttack.delayMax = max;
      Data.options.objAttack.repeatTime = repeat;
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
    

  /** TARGETS SUB-TAB ***/
  tabTargets : function (){
    var t = Tabs.AutoAttack;

    checkPoint ('tabs.AutoAttack.tabTargets.1');
    setSubTab(attackPrefix + 'ConfigL', false);
    setSubTab(attackPrefix + 'ConfigG', false);
    setSubTab(attackPrefix + 'Targets', true);
    setSubTab(attackPrefix + 'Stats', false);
    setSubTab(attackPrefix + 'Maps', false);
    t.contentType = 2;

    var timer = null;
// Jawz - Added DIV class=' + idStatBox + ' (added black border)
    var m = '<DIV class=' + idTitle + '>'+ kAutoAttack + translate(Data.options.mapChoice) +'</div>\
             <DIV id=' + attackPrefix + 'TargList  style="height:475px">\
             <DIV class=' + idStatBox + ' style="height:470px; max-height:470px; overflow-y:auto; overflow-x:auto; margin-top:1px !important">\
             <TABLE id=' + attackPrefix + 'TargTab class=' + idTab + '><TR class=' + idTabHdr + '2><TD>' + kDist + '</td><TD>' + kCoords + '</td><TD>' + kAutoLevel + '</td><TD width=65>' + kLastAttack + '</td></tr>';
//logit (inspect (Data.targets.camps, 5, 1));

    checkPoint ('tabs.AutoAttack.tabTargets.2');
    // Owned resources have a red background color and white text
    var mapObjects = t.getActiveObjectList(); 
    if (mapObjects.length == 0)
        t.dispFeedback ( kSelectLevelsReminder );

    checkPoint ('tabs.AutoAttack.tabTargets.3');
    // Hilite owned wildernesses
    var ownedWilderness = Seed.s.player_wildernesses; 
    var bFound = false;
    for (var i=0; i<mapObjects.length; i++){
        m += '<TR id=' + attackPrefix + 'Row_'+ i +'><TD>'+ mapObjects[i].dist +'</td><TD align=center>'+ mapObjects[i].x +','+ mapObjects[i].y +'</td><TD align=center>'+ mapObjects[i].lvl +'</td>\
              <TD><span id=' + attackPrefix + 'List_'+ i +'> --- </span></td>\
              <TD><INPUT class=small id=' + attackPrefix + 'targAN_'+ i +' type=submit value=' + kAttackNow + '\></td>\
              <TD><INPUT class=small id=' + attackPrefix + 'spyAN_'+ i +' type=submit value=' + kSpyNow + '\></td>';
        
        // Add the skip attack button for cities and outposts
        if (t.selectedMapName == kCity || t.selectedMapName == kOutpost)
            m += '<TD><INPUT class=small id=pbskipAN_'+ i +' type=submit value=' + kSkipAttack + '\></td><TD>'+ mapObjects[i].playerAlliance +'</td>';
            
        m += '</tr>';
     }

    checkPoint ('tabs.AutoAttack.tabTargets.4');
    document.getElementById(attackPrefix + 'Content').innerHTML = m + '</table></div></div>';
//    document.getElementById(attackPrefix + 'Content').scrollTop = gAttScrollPos;

    checkPoint ('tabs.AutoAttack.tabTargets.5');
     for (var i=0; i<mapObjects.length; i++)
        for (var j=0;j<ownedWilderness.length; j++) {
            if (ownedWilderness[j].x == mapObjects[i].x && ownedWilderness[j].y == mapObjects[i].y) {
                document.getElementById(attackPrefix + 'Row_'+i).setAttribute("class", "' + idOwned + '");
                mapObjects[i].attackable = false;
                break;
            }
        }
    
    // Add the event listeners
//    document.getElementById(attackPrefix + 'Content').addEventListener('scroll', onScroll, false);
    
    checkPoint ('tabs.AutoAttack.tabTargets.6');
    for (var i=0; i<mapObjects.length; i++) {
        var butAttack = document.getElementById(attackPrefix + 'targAN_'+ i);
        butAttack.addEventListener ('click', butAttackNow, false);
        var butSpy = document.getElementById(attackPrefix + 'spyAN_'+ i);
        butSpy.addEventListener ('click', butSpyNow, false);
        if (t.selectedMapName == kCity || t.selectedMapName == kOutpost) 
            document.getElementById('pbskipAN_'+ i).addEventListener ('click', butSkipAttack, false);
        setButtonStyle (butAttack, mapObjects[i].attackable);
        setButtonStyle (butSpy, mapObjects[i].attackable);
    }

    checkPoint ('tabs.AutoAttack.tabTargets.7');
    tick();
    checkPoint ('tabs.AutoAttack.tabTargets.8');
    
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
//      if (t.contentType == 2)
//        gAttScrollPos = document.getElementById(attackPrefix + 'Content').scrollTop;
    }

    function butAttackNow (e){
      var args = e.target.id.split('_');
      var dial = new ModalDialog (t.cont, 300, 150, '', false);
      dial.getContentDiv().innerHTML = kSendingAttack;
      t.checkAttack (mapObjects[args[1]], notify);
      function notify (rslt){
        if (rslt!='OK'){
          dial.getContentDiv().innerHTML = '<B>'+ rslt +'</b>';
          dial.allowClose (true);
        } else {
          dial.getContentDiv().innerHTML = '<B> OK </b>';
          setTimeout (function(){dial.destroy()}, 1000);
        }
      }
    }
    function butSpyNow (e){
      var args = e.target.id.split('_');
      var dial = new ModalDialog (t.cont, 300, 150, '', false);
      dial.getContentDiv().innerHTML = kSendingSpy;
      t.checkSpy (mapObjects[args[1]], notify);
      function notify (rslt){
        if (rslt!='OK'){
          dial.getContentDiv().innerHTML = '<B>'+ rslt +'</b>';
          setTimeout (function(){dial.destroy()}, 1000);
//          dial.allowClose (true);
        } else {
          dial.getContentDiv().innerHTML = '<B> OK </b>';
          setTimeout (function(){dial.destroy()}, 1000);
        }
      }
    }
    
    function butSkipAttack (e){
      var args = e.target.id.split('_');
      mapObjects[args[1]].attackable = (!mapObjects[args[1]].attackable);
      setButtonStyle (document.getElementById(attackPrefix + 'targAN_'+args[1]), mapObjects[args[1]].attackable);     
    }

    function tick (){
      var now = serverTime();
      var ts;
      clearTimeout (timer);
      if (!document.getElementById(attackPrefix + 'TargTab'))
        return;
      for (var i=0; i<mapObjects.length; i++){
        if (!mapObjects[i].last)
          ts = '---';
        else {
          var time = now-mapObjects[i].last;
// fix this :P
          if (time > (Data.options.objAttack.repeatTime * 60))
            ts = '<FONT COLOR=#550000><B>'+ timestr (now-mapObjects[i].last, false) +'</b></font>';
          else
            ts = timestr (now-mapObjects[i].last, false);
        }
        document.getElementById(attackPrefix + 'List_'+ i).innerHTML = ts;
      }
      timer = setTimeout (tick, 5000);
    }
  },

  
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
        logit ('*********  Done Scanning Map ... Total targets: '+ Data.targets.camps.length);      
        Data.targets.mapObjects.sort(function(a,b){return a.dist-b.dist});
        Data.targets.radius = radius;
        Data.options.search.sortL = '0';
        if (notify)
          notify(true);
        dial.destroy();
      }
    }
  },

  //*** Attacks Tab - Maps Sub-tab ***
  tabMaps : function(){
    var t = Tabs.AutoAttack;
    checkPoint ('tabs.AutoAttack.tabMaps.1');
    setSubTab(attackPrefix + 'ConfigL', false);
    setSubTab(attackPrefix + 'ConfigG', false);
    setSubTab(attackPrefix + 'Targets', false);
    setSubTab(attackPrefix + 'Stats', false);
    setSubTab(attackPrefix + 'Maps', true);
    t.contentType = 4;

    checkPoint ('tabs.AutoAttack.tabMaps.2');
    var m = '<DIV class=' + idSubtitle + '>'+ kMapCategories +'</div>\
             <DIV class=' + idStatBox + ' style="overflow:auto; margin-top:1px !important">\
             <TABLE class=' + idTabPad + '>\
             <TR align=center class=' + idTabHdr + '1><TD style="background:none !important;" colspan=2></td></tr>\
             </div>';

    // Add the radio buttons  
    m += '<TR><TD><INPUT type=radio name=' + attackPrefix + 'MapRadio value="AntCamp" ></td><td>'+ kAnthropusCamp +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=' + attackPrefix + 'MapRadio value="City" ></td><td>'+ kCity +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=' + attackPrefix + 'MapRadio value="Outpost" ></td><td>'+ kOutpost +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=' + attackPrefix + 'MapRadio value="Grassland" ></td><td>'+ kGrassland +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=' + attackPrefix + 'MapRadio value="Swamp" ></td><td>'+ kSwamp +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=' + attackPrefix + 'MapRadio value="Lake"></td><td>'+ kLake +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=' + attackPrefix + 'MapRadio value="Hill" ></td><td>'+ kHill +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=' + attackPrefix + 'MapRadio value="Plain" ></td><td>'+ kPlain +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=' + attackPrefix + 'MapRadio value="Mountain" ></td><td>'+ kMountain +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=' + attackPrefix + 'MapRadio value="Forest" ></td><td>'+ kForest +'</td></tr>';
    
    // Add the Search button - triggers an immediate map search when clicked
    m += '<TR><TD colspan="2"><INPUT class=' + idGreenButton + ' type=submit id=' + attackPrefix + 'MapSearch value='+ kSearch +'></td></tr>'; 
    m += '</table><DIV class=short></div>';
    
    // Display the inputs
    checkPoint ('tabs.AutoAttack.tabMaps.3');
    document.getElementById(attackPrefix + 'Content').innerHTML = m;

    // add event listeners
    checkPoint ('tabs.AutoAttack.tabMaps.4');
    var r = document.getElementsByName(attackPrefix + 'MapRadio');
    for (i=0;i<r.length;i++) {
        r[i].addEventListener('change', enableChanged, false);
        // Select the radio button that was last selected
        r[i].checked = (r[i].value == Data.options.mapChoice);
    }
    
    checkPoint ('tabs.AutoAttack.tabMaps.5');
    document.getElementById(attackPrefix + 'MapSearch').addEventListener ('click', butSearchNow, false);
    
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
//*********************************** AutoAttack Tab *********************************************


var MemberShips = {
 
  fetchMembership : function (callback, doDetail){
    var t = MemberShips;
    t.callback = callback; 
    t.doDetail = doDetail;
    if (Seed.s.alliance.id){
      var jsonType = 'alliances/'+Seed.s.alliance.id+'/memberships'; //.json';
      new MyAjaxRequest (jsonType, { 'user%5Fid':C.attrs.userId, '%5Fsession%5Fid':C.attrs.sessionId, timestamp:parseInt(serverTime()), count:120, approved:1, 'dragon%5Fheart':C.attrs.dragonHeart, version:getVersion }, t.updateMemberships, false);
    }
  },
  updateMemberships : function (rslt){
    var t = MemberShips;
    var memberList = rslt.dat.alliance_memberships; 
    if (!rslt.ok){
      t.callback (null);
      return;
    }
    var ret = {member:[]};
    for (var m=0; m<memberList.length; m++) {
      //logit (inspect(memberList[m]));
      var d = {player:memberList[m].player.name,
               id    :memberList[m].player.id,
               role  :memberList[m].role,
               might :memberList[m].player.might,
               city  :memberList[m].player.city.name,
               x     :memberList[m].player.city.x,
               y     :memberList[m].player.city.y,
               dist  :distance(Seed.cities[0].x, Seed.cities[0].y, memberList[m].player.city.x, memberList[m].player.city.y)};
      ret.member.push (d);
    }
    ret.done = true;
    t.callback (ret); 
    return;
  },
}

//*********************************** Alliance features Tab *********************************************
Tabs.Alliance = {
  tabOrder       : ALLIANCE_TAB_ORDER,
  tabLabel       : 'Alliance',
  tabDisabled    : !ENABLE_ALLIANCE_TAB,
  cont           : null,
  transList 	 : ['Porter', 'ATrans'],
  troopList      : ['Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop'],
  resourceList   : ['gold', 'food', 'wood', 'ore', 'stone'],
  contentType    : 0, // 0 = member list, 1 = transport, 2 = reinforcement
  totalResources : 0,
  maxResources   : 0,
  totalForces    : 0,
  recallTimer    : 0,

  init : function (div){
    var t = Tabs.Alliance;
    t.cont = div;

    if (Data.options.alliance == null){
      Data.options.alliance = {lastUpdate:'', id:0, sortL:'0', troopsTrans:{}, resourceTrans:{}, troopsReinforce:{}};
    }
//<DIV id=' + alliancePrefix + 'Status class=' + idStatBox + ' style="margin-bottom:5px !important">
    var m = '<DIV class=' + idTitle + '>' + kAllianceFeatures + '</div>\
             <TABLE width=100%><TR>\
               <TD><INPUT class=' + idGreenButton + ' type=submit value="'+ kSearchRefreshList +'" id=' + alliancePrefix + 'RefreshList></input></TD>\
             </TR></TABLE></DIV>\
             <DIV id=' + alliancePrefix + 'Header style="margin-top:10px !important; height:680px; max-height:680px; overflow-y:auto">\
               <TABLE width=100% align=center><TR><TD>\
               <INPUT class=button type=submit value="' + kMembers + '" id=' + alliancePrefix + 'List></INPUT>\
               <INPUT class=button type=submit value="' + kTransport + '" id=' + alliancePrefix + 'Transp></INPUT>\
               <INPUT class=button type=submit value="' + kReinforcement + '" id=' + alliancePrefix + 'Reinforce></INPUT>\
               </TD></TR></TABLE>\
             <DIV id=' + alliancePrefix + 'Cont style="margin-top:1px !important; height:655px; max-height:655px; overflow-y:auto"></div></div>';
    t.cont.innerHTML = m;
    document.getElementById(alliancePrefix + 'RefreshList').addEventListener ('click', t.refreshList, false);
    document.getElementById(alliancePrefix + 'List').addEventListener ('click', t.tabAllianceList, false);	
    document.getElementById(alliancePrefix + 'Transp').addEventListener ('click', t.tabAllianceTrans, false);	
    document.getElementById(alliancePrefix + 'Reinforce').addEventListener ('click', t.tabAllianceReinforcement, false);	
    window.addEventListener('unload', t.onUnload, false);
    // Restore the views
    t.contentType = isEmpty(Data.options.allianceTab,0);
    t.show();
  },

  show : function (){
    var t = Tabs.Alliance;
    if (!t.checkMembersBusy) {
      switch (isEmpty(t.contentType, 0)) {
        case 0: t.tabAllianceList(); break;
        case 1: t.tabAllianceTrans(); break;
        case 2: t.tabAllianceReinforcement(); break;
      }
    } else setTimeout(t.show, 100);
  },

  onUnload : function (){
    var t = Tabs.Alliance;
    logit ('===============  Tabs.Alliance.onUnload');
    Data.options.allianceTab = t.contentType;
  },

  hide : function (){
  },

  refreshList : function (){
    var t = Tabs.Alliance;
    if (t.checkMembersBusy)
      return false;
    t.checkMembersBusy = true;
    t.getAllianceMembers(function(){logit(kAllianceListRetrieved); Tabs.Alliance.checkMembersBusy = false});
    var now = serverTime();
    Data.options.alliance.lastUpdate = new Date(now * 1000).myString();
    t.show ();
  },

  getAllianceMembers : function (notify){
    var t = Tabs.Alliance;
    ret = [];
    if (Data.players.memberships)
      for (var i=0; i<Data.players.memberships.length; i++)
        ret.push ({id:Data.players.memberships[i].id, might:Data.players.memberships[i].might});
    Data.players.memberEvol = cloneProps(ret);
    Data.players.memberships = {player:'', id:0, role:'', might:0, city:'', x:0, y:0, dist:0};
    var dial = new ModalDialog (t.cont, 300, 165, '', false, null);
    dial.getContentDiv().innerHTML = kSearchMembers;
    MemberShips.fetchMembership (callback, false);
    function callback (dat){
      if (dat==null){
        dial.getContentDiv().innerHTML = kErrorGetMemberList;
        dial.allowClose (true);
        if (notify)
          notify (false);
        return;
      }
      if (dat.done){
        Data.players.memberships = cloneProps(dat.member);
        logit ('*********  List retrieved ... Total members: '+ Data.players.memberships.length);
        function charOrdA(a, b){
          a = a.player.toLowerCase(); b = b.player.toLowerCase();
          if (a>b) return 1;
          if (a <b) return -1;
          return 0;
        }
        Data.players.memberships.sort(charOrdA);
        Data.options.alliance.sortL = '2';
        //t.getMemberList();
        if (notify)
          notify(true);
        dial.destroy();
      }
    }
  },

  //** ALLIANCE MEMBERS LIST SUB-TAB ***
  tabAllianceList : function (){
    var t = Tabs.Alliance;
    setSubTab(alliancePrefix + 'List', true);
    setSubTab(alliancePrefix + 'Transp', false);
    setSubTab(alliancePrefix + 'Reinforce', false);
    t.contentType = 0;

    if (!Data.options.alliance.sortL ||
         Data.options.alliance.sortL == null ||
         Data.options.alliance.sortL == undefined)
      Data.options.alliance.sortL = '0';
    if (Data.options.alliance.lastUpdate &&
        Data.options.alliance.lastUpdate != null &&
        Data.options.alliance.lastUpdate != undefined)
         kLastupdate = ' ('+Data.options.alliance.lastUpdate+')';
    else kLastupdate = '';

    var m = '<DIV id=' + alliancePrefix + 'Results  style="height:640px">\
             <DIV class=' + idTitle + '>' + kMemberList + kLastupdate + '</div>\
             <DIV id=' + alliancePrefix + 'ResultsList class=' + idStatBox + ' style="height:620px; max-height:620px; overflow-y:auto ; overflow-x:auto ; margin-top:1px !important"></div>\
             </div>';
    document.getElementById(alliancePrefix + 'Cont').innerHTML = m;

    var m = '<TABLE id=' + alliancePrefix + 'TargTab class=' + idTab + '><TR class=' + idTabHdr + '2>\
           <TD id=' + alliancePrefix + 'tal_0 width="20px"><A><SPAN>' + kDist + '</SPAN></A></td>\
           <TD id=' + alliancePrefix + 'tal_1 width="40px"><A><SPAN>' + kCoords + '</SPAN></A></td>\
           <TD id=' + alliancePrefix + 'tal_2 width="150px" style="overflow-x:auto"><A><SPAN>' + kSearchPlayer + '</SPAN></A></td>\
           <TD id=' + alliancePrefix + 'tal_3 width="50px" style="overflow-x:auto"><A><SPAN>' + kAllianceRole + '</SPAN></A></td>\
           <TD id=' + alliancePrefix + 'tal_4 width="40px" align=right><A><SPAN>' + kSearchMight + '</SPAN></A></td>\
           <TD width="40px" align=right>' + kSearchEvol + '</td>\
           <TD></TD></tr>';
    for (var i=0; i<Data.players.memberships.length; i++){
      m += '<TR><TD>' + Data.players.memberships[i].dist + '</td><TD align=center>'+ Data.players.memberships[i].x +','+ Data.players.memberships[i].y +'</td>';
      var mightF = nombreFormate(Data.players.memberships[i].might,' ');
      var found = false;
      var evol = 'x';
      for (var old=0; old<Data.players.memberEvol.length && !found; old++){
        if (Data.players.memberEvol[old].id == Data.players.memberships[i].id){
          evol = Data.players.memberships[i].might - Data.players.memberEvol[old].might;
          if (evol < 0) evol = '<SPAN class=red><B>'+nombreFormate(evol,' ')+'</B></span>';
          else if (evol > 0) evol = '<SPAN class=green><B>+'+nombreFormate(evol,' ')+'</B></span>';
          else evol = nombreFormate(evol,' ');
          found = true;
        }
      }
      if (Data.players.memberships[i].role == 'vassal') var pRole = '';
      else var pRole = translate(Data.players.memberships[i].role);
      m += '<TD align=left>'+ Data.players.memberships[i].player +'</td>\
            <TD align=left>'+ pRole +'</td>\
            <TD align=right>'+ mightF +'</td><TD align=right>'+ evol +'</td></tr>';
    }
    document.getElementById(alliancePrefix + 'ResultsList').innerHTML = m + '</table>';
    for (var h=0; h<5; h++)
      document.getElementById(alliancePrefix + 'tal_' + h).addEventListener ('click', sortMembList, false);

    function sortMembList (e){
      var t = Tabs.Alliance;
      var arg = e.target.parentNode.parentNode.id.split('_');
      if (arg[1] == 0){
        if (Data.options.alliance.sortL == '0'){
          Data.players.memberships.sort(function(a,b){return b.dist-a.dist});
          Data.options.alliance.sortL = '-0';
        } else {
          Data.players.memberships.sort(function(a,b){return a.dist-b.dist});
          Data.options.alliance.sortL = '0';
        }
      } else if (arg[1] == 1){
        if (Data.options.alliance.sortL == '1'){
          Data.players.memberships.sort(function(a,b){return b.x-a.x});
          Data.options.alliance.sortL = '-1';
        } else {
          Data.players.memberships.sort(function(a,b){return a.x-b.x});
          Data.options.alliance.sortL = '1';
        }
      } else if (arg[1] == 2){
        if (Data.options.alliance.sortL == '2'){
          Data.players.memberships.sort(function(a, b){a = a.player.toLowerCase(); b = b.player.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
          Data.options.alliance.sortL = '-2';
        } else {
          Data.players.memberships.sort(function(a, b){a = a.player.toLowerCase(); b = b.player.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
          Data.options.alliance.sortL = '2';
        }
      } else if (arg[1] == 3){
        if (Data.options.alliance.sortL == '3'){
          Data.players.memberships.sort(function(a, b){a = a.role.toLowerCase(); b = b.role.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
          Data.options.alliance.sortL = '-3';
        } else {
          Data.players.memberships.sort(function(a, b){a = a.role.toLowerCase(); b = b.role.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
          Data.options.alliance.sortL = '3';
        }
      } else if (arg[1] == 4){
        if (Data.options.alliance.sortL == '4'){
          Data.players.memberships.sort(function(a,b){return b.might-a.might});
          Data.options.alliance.sortL = '-4';
        } else {
          Data.players.memberships.sort(function(a,b){return a.might-b.might});
          Data.options.alliance.sortL = '4';
        }
      }
      t.tabAllianceList();
    }
  },

  //** ALLIANCE TRANSPORT SUB-TAB ***
  tabAllianceTrans : function (){
    var t = Tabs.Alliance;
    setSubTab(alliancePrefix + 'List', false);
    setSubTab(alliancePrefix + 'Transp', true);
    setSubTab(alliancePrefix + 'Reinforce', false);
    t.contentType = 1;

    if (!Data.options.alliance.troopsTrans ||
         Data.options.alliance.troopsTrans == null ||
         Data.options.alliance.troopsTrans.length == 0){
      for (var i=0; i<t.transList.length; i++)
        Data.options.alliance.troopsTrans[Names.troops.byAbbr[t.transList[i]][1]] = 0;   
    }
    var m = '<DIV id=' + alliancePrefix + 'Results  style="height:590px">\
               <DIV class=' + idTitle + '>' + kTransport + '</div>\
               <DIV id=' + alliancePrefix + 'Status class=' + idStatBox + ' style="margin-bottom:5px !important">\
                 <TABLE width=100%>\
                   <TR><TD class=' + idTableft + ' colspan=2>' + kRecipient + '</td></TR>\
                   <TR><TD><DIV id=' + alliancePrefix + 'PlayerList></div></td>\
                       <TD><DIV id=' + alliancePrefix + 'Target style="height: 17px; padding: 2px 0px;"></div></td>\
                 </TR></TABLE>\
                 <BR><DIV id=' + alliancePrefix + 'Feedback style="height: 17px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px; text-align:center; font-weight:bold"></div>\
               </div>\
               <DIV class=' + idInput + '>\
                 <TABLE class=' + idTab + ' id=' + alliancePrefix + 'Yoyo>\
                   <TR align=left class=' + idTabHdr + '1>\
                     <TD colspan=2>' + kYoyo + ' :</td></TR>\
				   <TR align=left><TD>' + kRecallTransport + '</td>\
                     <TD><INPUT id=' + alliancePrefix + 'Yoyo type=checkbox '+ (Data.options.alliance.recallTransp?'CHECKED ':'') +'/></td>\
                 </tr></table><BR>\
                 <TABLE class=' + idTab + ' id=' + alliancePrefix + 'TTroops>\
                   <TR align=left class=' + idTabHdr + '1>\
                     <TD colspan=4>' + kTransTroops + ' :</td>\
                 </tr></table><BR>\
                 <TABLE class=' + idTab + ' id=' + alliancePrefix + 'Resources width=100%>\
                   <TR align=left class=' + idTabHdr + '1>\
                     <TD colspan=4 align=left>' + kTransRessources + ' :</td></TR>';

    for (var p=0; p<t.resourceList.length; p++){
      var actualStock = nombreFormate(isEmpty(Seed.cities[0].resources[t.resourceList[p]],0));
      m += '<TR><TD class=' + idTableft + '2 width=70px>'+ translate(t.resourceList[p]) + ' :</td>\
                <TD width=90px><INPUT type=text id=' + alliancePrefix + 'Res_'+ p +' maxlength=8 style="width:70px" size=2 value="'+ parseIntZero(Data.options.alliance.resourceTrans[t.resourceList[p]]) +'"\></td>\
                <TD width=30px><INPUT class=small id=' + alliancePrefix + 'Max_'+ p +' type=submit value=Max\></td>\
                <TD align=right width=90px>'+ actualStock +'</td><TD></TD></tr>';
    }

    m += '<TR><TD class=' + idTableft + '2>A envoyer :</td>\
          <TD class=' + idTableft + ' colspan=4><DIV id=' + alliancePrefix + 'Total></div></td>';

    m += '</tr></table><BR><BR>\
          <CENTER><INPUT class=' + idGreenButton + ' id=' + alliancePrefix + 'Launch type=submit value="' + kSendTransport + '" /></center>\
          </div>\
          </div>';
    document.getElementById(alliancePrefix + 'Cont').innerHTML = m;
    document.getElementById(alliancePrefix + 'Yoyo').addEventListener ('click', function(e){Data.options.alliance.recallTransp=e.target.checked}, false);
    document.getElementById(alliancePrefix + 'Launch').addEventListener ('click', sendTransp, false);
    troopTable (document.getElementById(alliancePrefix + 'TTroops'), 1, 'TR', eventTroopsTransport);
    for (i=0; i<t.resourceList.length; i++){
      document.getElementById(alliancePrefix + 'Res_'+ i).addEventListener('change', resourceChanged, false);
      butMax = document.getElementById(alliancePrefix + 'Max_'+ i);
      butMax.addEventListener('click', setResourceMax, false);
      setButtonStyle (butMax, true);
    }
    t.getMemberList();
    t.displayTotal();

    function troopTable (tab, rownum, prefix, listener){
      var row1 = tab.insertRow(rownum);
      row1.align='center';
      var row2 = tab.insertRow(rownum+1);
      row2.align='center';
      var val;
      for (var i=0; i<t.transList.length; i++){
        row1.insertCell(i).innerHTML = translate (t.transList[i]);
        var inp = document.createElement ('INPUT');
        inp.type = 'text';
        inp.size = '2';
        inp.maxlength = '6';
        inp.style = 'width:65px';
        if (prefix=='TR')
          val = Data.options.alliance.troopsTrans[Names.troops.byAbbr[t.transList[i]][1]];
        if (!val)
          val = 0;
        inp.value = val;
        inp.addEventListener ('change', listener, false);
        inp.name = prefix +'_'+ i;
        row2.insertCell(i).appendChild (inp);
      }
      return tab;
    }
    function eventTroopsTransport (e){
      var t = Tabs.Alliance;
      var args = e.target.name.split ('_');
      var x = parseIntZero(e.target.value);
      if (args[0] == 'TR'){
        if (isNaN(x) || x<0 || x>getMusterPointMaxTroops (0)){
          e.target.style.backgroundColor = 'red';
        } else {
          Data.options.alliance.troopsTrans[Names.troops.byAbbr[t.transList[args[1]]][1]] = x;
          var tr = Data.options.alliance.troopsTrans;
          var tt = Names.troops.byAbbr[t.transList[args[1]]][1];
          tr[tt] = e.target.value;
          e.target.style.backgroundColor = '';
        }
      }
      t.displayTotal();
    }
    function resourceChanged (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      t.totalResources = 0;
      for (var r=0; r<t.resourceList.length; r++)
        if (r != args[1]) t.totalResources = parseIntZero(t.totalResources) + parseIntZero(Data.options.alliance.resourceTrans[t.resourceList[r]]);
      for (i=0; i<t.resourceList.length; i++)
        document.getElementById(alliancePrefix + 'Res_'+ i).style.backgroundColor = '';
      if (isNaN(x) || x<0 || (x + parseIntZero(t.totalResources))>parseIntZero(t.maxResources)){
        e.target.style.backgroundColor = 'red';
      }else {
        e.target.style.backgroundColor = '';
      }
      e.target.value = parseIntZero(x);
      Data.options.alliance.resourceTrans[t.resourceList[args[1]]] = parseIntZero(x);
      t.displayTotal();
    }
    function setResourceMax (e){
      var args = e.target.id.split('_');
      var max = 0;
      var cur = parseIntZero(Seed.cities[0].resources[t.resourceList[args[1]]]);
      t.totalResources = 0;
      for (var r=0; r<t.resourceList.length; r++)
        if (r != args[1]) t.totalResources = parseIntZero(t.totalResources) + parseIntZero(Data.options.alliance.resourceTrans[t.resourceList[r]]);
      max = parseIntZero(t.maxResources) - parseIntZero(t.totalResources);
      if (max > cur) max = cur;
      Data.options.alliance.resourceTrans[t.resourceList[args[1]]] = parseIntZero(max);
      t.tabAllianceTrans();
    }
    function setButtonStyle (theButton, enabled) {
      if (enabled) {
        theButton.disabled = false;
        theButton.style.backgroundColor = '#009C1F';
        theButton.style.color = 'white';            
      } else {
        theButton.disabled = true;
        theButton.style.backgroundColor = '#e80000';
        theButton.style.color = 'white';            
      }
    }
    function sendTransp (){
      var dial = new ModalDialog (t.cont, 300, 150, '', false);
      dial.getContentDiv().innerHTML = kSendingTransport;
      checkTransport (notify);
      function notify (rslt){
        if (rslt!='OK'){
          dial.getContentDiv().innerHTML = '<B>'+ rslt +'</b>';
          dial.allowClose (true);
        } else {
          dial.getContentDiv().innerHTML = '<B> OK </b>';
          setTimeout (function(){dial.destroy()}, 1000);
        }
      }
    }
    function checkTransport (notify){
      var t = Tabs.Alliance;
      var cityId = Seed.cities[0].id;
      var cityIdx = 0;
      // check resources
      var ress = Data.options.alliance.resourceTrans;
      var totRess = 0;
      for (var p in ress)
        if (ress[p] > 0)
          totRess += ress[p];
      if (totRess <= 0){
          notify (kNoRessourcesDefined);
          return;
      }
      // check troops
      var troops = Data.options.alliance.troopsTrans;
      var totTroops = 0;
      for (var p in troops){
        if (troops[p] > 0){
          totTroops += troops[p];
          if (Seed.cities[cityIdx].units[p] < troops[p]){
            return (kNotEnough + translate(p));
            return;
          }
        }
      }
      if (totTroops <= 0){
          notify (kNoTroopsDefined);
          return;
      }
      var authMaxTroops = getMusterPointMaxTroops (cityIdx);
      for (var p in troops) {
        if (troops[p] > 0) {
          if (troops[p] > authMaxTroops ) {
            notify (kTooManyTroops);
            return;
          }
        }
      }
      if (totTroops > authMaxTroops) {
        notify (kTooManyTroops);
        return;
      }
      if (getMusterPointSlots (cityIdx) <= 0){
        notify (kMusterPointFull);
        return;
      }
      var found = false;
      for (var i=0; i<Data.players.memberships.length && !found; i++){
        if (Data.players.memberships[i].id == Data.options.alliance.id){
          found = true;
          var targetName = Data.players.memberships[i].player;
          var targetCity = Data.players.memberships[i].city;
          var targetX = Data.players.memberships[i].x;
          var targetY = Data.players.memberships[i].y;
        }
      }
      var targMsg = targetName  + ', ' + targetCity + kCampAt + ' ' + targetX +','+ targetY;
      new Ajax.TransportMarch (cityId, targetX, targetY, troops, ress, 'transport', function (rslt){
        if (rslt.ok && rslt.dat.result.success){
          var march = Seed.marches[rslt.dat.result.job];
          if (march == null){
            logit ('***** March missing from seed: '+ rslt.dat.result.job.march_id); 
            if (DEBUG_MARCHES) WinLog.write ('***** ERRROR march missing from seed: '+ rslt.dat.result.job.march_id);   
          } else {
            Data.options.objMarches[rslt.dat.result.job.march_id] = cloneProps(march);
            if (DEBUG_MARCHES) WinLog.write ('Tabs.Search.checkSpy: ID='+ march.id +'  ('+ march.x +','+ march.y +')');
          }
		  if (Data.options.alliance.recallTransp) {
 		    var m = {cityId:cityId, marchId:rslt.dat.result.job.march_id, run_at:rslt.dat.result.job.run_at - 90};
            logit ('Recall march check : '+rslt.dat.result.job.march_id+' when : '+timestr(rslt.dat.result.job.run_at,true)+ ' ('+timestr(m.run_at,true)+ ')');
            Data.recallMarches.push (m);
            for (i=0; i<Data.recallMarches.length; i++)
              logit ('Recall marches : '+inspect(Data.recallMarches[i]));
		  }
          actionLog (kTransportSent + ' ' + targMsg);
          notify ('OK');
        } else {
          notify (kError + rslt.errmsg );
        }
      });
    }
  },


  //** ALLIANCE REINFORCEMENT SUB-TAB ***
  tabAllianceReinforcement : function (){
    var t = Tabs.Alliance;
    setSubTab(alliancePrefix + 'List', false);
    setSubTab(alliancePrefix + 'Transp', false);
    setSubTab(alliancePrefix + 'Reinforce', true);
    t.contentType = 2;

    if (!Data.options.alliance.troopsReinforce ||
         Data.options.alliance.troopsReinforce == null ||
         Data.options.alliance.troopsReinforce.length == 0){
      for (var i=0; i<t.troopList.length; i++)
        Data.options.alliance.troopsReinforce[Names.troops.byName[t.troopList[i]][1]] = 0;   
    }
    var m = '<DIV id=' + alliancePrefix + 'Results  style="height:590px">\
               <DIV class=' + idTitle + '>' + kReinforcement + '</div>\
               <DIV id=' + alliancePrefix + 'Status class=' + idStatBox + ' style="margin-bottom:5px !important">\
                 <TABLE width=100%>\
                   <TR><TD class=' + idTableft + ' colspan=2>' + kRecipient + '</td></TR>\
                   <TR><TD><DIV id=' + alliancePrefix + 'PlayerList></div></td>\
                       <TD><DIV id=' + alliancePrefix + 'Target style="height: 17px; padding: 2px 0px;"></div></td>\
                 </TR></TABLE>\
                 <BR><DIV id=' + alliancePrefix + 'FeedbackR style="height: 17px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px; text-align:center; font-weight:bold"></div>\
               </div>\
               <DIV class=' + idInput + '>\
                 <TABLE class=' + idTab + ' id=' + alliancePrefix + 'RTroops>\
                   <TR align=left class=' + idTabHdr + '1>\
                     <TD colspan=4>' + kReinforceTroops + ' :</td>';

    for (i=0; i<t.troopList.length; i++){
      m += '<TR><TD class=' + idTabLeft + '>'+ translate(Names.troops.byName[t.troopList[i]][1]) +':</td>';
      var num = parseIntZero(Data.options.alliance.troopsReinforce[t.troopList[i]]);
      var stk = nombreFormate(parseIntZero(Seed.cities[0].units[t.troopList[i]]),' ');
      m += '<TD><INPUT type=text id=' + alliancePrefix + 'Trp_'+ i +' maxlength=6 style="width:55px" size=2 value="'+ num +'"\></td>\
            <TD><INPUT class=small id=' + alliancePrefix + 'MaxT_'+ i +' type=submit value=Max\></td>\
            <TD align=right>'+ stk +'</td></tr>';
    }

    m += '</tr></table><BR><BR>\
          <CENTER><INPUT class=' + idGreenButton + ' id=' + alliancePrefix + 'Launch type=submit value="' + kSendReinforcement + '" /></center>\
          </div></div>';
    document.getElementById(alliancePrefix + 'Cont').innerHTML = m;
    document.getElementById(alliancePrefix + 'Launch').addEventListener ('click', SendReinforcement, false);
    for (i=0; i<t.troopList.length; i++){
      document.getElementById(alliancePrefix + 'Trp_'+ i).addEventListener('change', eventTroopsReinforcemment, false);
      butMax = document.getElementById(alliancePrefix + 'MaxT_'+ i);
      butMax.addEventListener('click', setTroupsMax, false);
      setButtonStyle (butMax, true);
    }
    t.getMemberList();

    function eventTroopsReinforcemment (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      t.totalForces = 0;
      for (var r=0; r<t.troopList.length; r++)
        if (r != args[1]) t.totalForces = parseIntZero(t.totalForces) + parseIntZero(Data.options.alliance.troopsReinforce[t.troopList[r]]);
      for (i=0; i<t.troopList.length; i++)
        document.getElementById(alliancePrefix + 'Trp_'+ i).style.backgroundColor = '';
      if (isNaN(x) || x<0 || (x + parseIntZero(t.totalForces))>getMusterPointMaxTroops (0)){
        e.target.style.backgroundColor = 'red';
      }else {
        e.target.style.backgroundColor = '';
      }
      e.target.value = x;
      Data.options.alliance.troopsReinforce[t.troopList[args[1]]] = x;
    }
    function setTroupsMax (e){
      var args = e.target.id.split('_');
      var max = 0;
      var cur = parseIntZero(Seed.cities[0].units[t.troopList[args[1]]]);
      t.totalForces = 0;
      for (var r=0; r<t.troopList.length; r++)
        if (r != args[1]) t.totalForces = parseIntZero(t.totalForces) + parseIntZero(Data.options.alliance.troopsReinforce[t.troopList[r]]);
      max = getMusterPointMaxTroops (0) - parseIntZero(t.totalForces);
      if (max > cur) max = cur;
      Data.options.alliance.troopsReinforce[t.troopList[args[1]]] = parseIntZero(max);
      t.tabAllianceReinforcement();
    }
    function setButtonStyle (theButton, enabled) {
      if (enabled) {
        theButton.disabled = false;
        theButton.style.backgroundColor = '#009C1F';
        theButton.style.color = 'white';            
      } else {
        theButton.disabled = true;
        theButton.style.backgroundColor = '#e80000';
        theButton.style.color = 'white';            
      }
    }
    function SendReinforcement (){
      var dial = new ModalDialog (t.cont, 300, 150, '', false);
      dial.getContentDiv().innerHTML = kSendingReinforcement;
      checkReinforcement (notify);
      function notify (rslt){
        if (rslt!='OK'){
          dial.getContentDiv().innerHTML = '<B>'+ rslt +'</b>';
          dial.allowClose (true);
        } else {
          dial.getContentDiv().innerHTML = '<B> OK </b>';
          setTimeout (function(){dial.destroy()}, 1000);
        }
      }
    }
    function checkReinforcement (notify){
      var t = Tabs.Alliance;
      var cityId = Seed.cities[0].id;
      var cityIdx = 0;
      var gen = null;
      // check troops
      var troops = Data.options.alliance.troopsReinforce;
      var totTroops = 0;
      for (var p in troops){
        if (troops[p] > 0){
          totTroops += troops[p];
          if (Seed.cities[cityIdx].units[p] < troops[p]){
            return (kNotEnough + translate(p));
            return;
          }
        }
      }
      if (totTroops <= 0){
          notify (kNoTroopsDefined);
          return;
      }
      var authMaxTroops = getMusterPointMaxTroops (cityIdx);
      for (var p in troops) {
        if (troops[p] > 0) {
          if (troops[p] > authMaxTroops) {
            notify (kTooManyTroops);
            return;
          }
        }
      }
      if (totTroops > authMaxTroops) {
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
      var found = false;
      for (var i=0; i<Data.players.memberships.length && !found; i++){
        if (Data.players.memberships[i].id == Data.options.alliance.id){
          found = true;
          var targetName = Data.players.memberships[i].player;
          var targetCity = Data.players.memberships[i].city;
          var targetX = Data.players.memberships[i].x;
          var targetY = Data.players.memberships[i].y;
        }
      }
      var targMsg = targetName  + ', ' + targetCity + kCampAt + ' ' + targetX +','+ targetY;
      new Ajax.march (cityId, targetX, targetY, gen.id, troops, 'reinforcement', function (rslt){
        if (rslt.ok && rslt.dat.result.success){
          var march = Seed.marches[rslt.dat.result.job];
          if (march == null){
            logit ('***** March missing from seed: '+ rslt.dat.result.job.march_id); 
            if (DEBUG_MARCHES) WinLog.write ('***** ERRROR march missing from seed: '+ rslt.dat.result.job.march_id);   
          } else {
            Data.options.objMarches[rslt.dat.result.job.march_id] = cloneProps(march);
            if (DEBUG_MARCHES) WinLog.write ('Tabs.Search.checkSpy: ID='+ march.id +'  ('+ march.x +','+ march.y +')');    
          }
          actionLog (kReinforcementSent + ' ' + targMsg);
          notify ('OK');
        } else {
          notify (kError + rslt.errmsg );
        }
      });
    }
  },

  // return array of alliance members found
  getMemberList : function (){
    var t = Tabs.Alliance;
    var m = '<select id=' + alliancePrefix + 'Player>';
    if (!Data.players.memberships || Data.players.memberships.length == 0)
      m += '<option value="">' + kToRefresh + '</option>';
    else {
      for (var i=0; i<Data.players.memberships.length; i++){
        var selected = '';
        if (Data.players.memberships[i].id == Data.options.alliance.id) selected = ' SELECTED';
        m += '<option value="' + Data.players.memberships[i].id + '" '+selected+'>' + Data.players.memberships[i].player + '</option>';
      }
    }
    m += '</select>';
    document.getElementById(alliancePrefix + 'PlayerList').innerHTML = m;
    document.getElementById(alliancePrefix + 'Player').addEventListener('change', t.playerSelChanged, false);
    t.playerCityDesc();
  },

  playerSelChanged : function (e){
    var t = Tabs.Alliance;
    var id = document.getElementById(alliancePrefix + 'Player');
    var sel = isEmpty(id.value,'none');
    id.value = sel;
    Data.options.alliance.id = sel;
    t.playerCityDesc();
  },

  playerCityDesc : function (){
    var t = Tabs.Alliance;
    var found = false;
    for (var i=0; i<Data.players.memberships.length && !found; i++){
      if (Data.players.memberships[i].id == Data.options.alliance.id){
        found = true;
        document.getElementById(alliancePrefix + 'Target').innerHTML = kCity + ' &nbsp; <B>' + Data.players.memberships[i].city + '</b>' +
             ' &nbsp; ('+Data.players.memberships[i].x + ', '+Data.players.memberships[i].y +
             ') &nbsp; <B>' + kDistance + ': </b>' + Data.players.memberships[i].dist;
      }
    }
  },

  displayTotal : function (){
    var t = Tabs.Alliance;
    t.totalResources = 0;
    t.maxResources = 0;
    for (var r=0; r<t.resourceList.length; r++)
      t.totalResources = parseIntZero(t.totalResources) + parseIntZero(Data.options.alliance.resourceTrans[t.resourceList[r]]);
    for (var i=0; i<t.transList.length; i++){
      if (Names.troops.byAbbr[t.transList[i]][1] == 'Porter') var load = 200;
      else if (Names.troops.byAbbr[t.transList[i]][1] == 'ArmoredTransport') var load = 5000;
      else var load = 0;
      var qty  = Data.options.alliance.troopsTrans[Names.troops.byAbbr[t.transList[i]][1]];
      try {
        var load = Seed.troops.stats[Names.troops.byAbbr[t.transList[i]][1]].load;
      }
      catch(e){
        actionLog('Troops load: ' + e.msg + ' Manifest not available, using defaults');
      }
      t.maxResources = t.maxResources + (parseIntZero(qty) * parseIntZero(load));
    }
    var avail = nombreFormate(parseIntZero(t.maxResources) - parseIntZero(t.totalResources),' ');
    document.getElementById(alliancePrefix + 'Total').innerHTML = '<B>' + nombreFormate(parseIntZero(t.totalResources),' ') + '</B> / <B>' +
      nombreFormate(parseIntZero(t.maxResources),' ') + '</B> (<B>' + avail + '</B> disponible)';
  },

};
//*********************************** Alliance features Tab *********************************************


//*********************************** Map search Tab *********************************************
// Jawz - Map search tab
Tabs.Search = {
  tabOrder     : SEARCH_TAB_ORDER,
  tabLabel     : kSearch,
  tabDisabled  : !ENABLE_SEARCH_TAB,
  cont         : null,
  checkMapBusy : false,
  MAX_DISTANCE : 75,
  contentType  : 0, // 0 = cities list, 1 = Wildernesses list

  init : function (div){
    var t = Tabs.Search;
    t.cont = div;

    if (!Data.options.search || Data.options.search == null){
      Data.options.search = {enabled:false, sortL:'0', targets:[], grassland:true, lake:true, hill:true, mountain:true, forest:true, nuage:true, plain:true, swamp:true, wildMinLevel:1, wildMaxevel:10, unowned:false};
      for (var i=0; i<5; i++)
        Data.options.search.targets[i] = {enabled:false, alliance:null, Walliance:null, player:null, Wplayer:null, distance:50, targetX:Seed.cities[0].x, targetY:Seed.cities[0].y, terrainType:null, terrainLevel:0 };
    }
    for (var i=0; i<5 && (!Data.options.search.targets[i] || Data.options.search.targets[i] == undefined); i++)
      Data.options.search.targets[i] = {enabled:false, alliance:null, Walliance:null, player:null, Wplayer:null, distance:50, targetX:Seed.cities[0].x, targetY:Seed.cities[0].y, terrainType:null, terrainLevel:0 };

    if (!Data.options.search.sortL ||
         Data.options.search.sortL == null ||
         Data.options.search.sortL == undefined)
      Data.options.search.sortL = '0';

    var m = '<DIV class=' + idTitle + '>' + kSearchTitle + '</div>\
       <DIV id=' + searchPrefix + 'Status class=' + idStatBox + ' style="margin-bottom:5px !important">\
        <DIV style="height:48px"><B>' + kSearchCoords + ':</b> &nbsp; X:<INPUT id=' + searchPrefix + 'X size=1 maxlength=3 type=text value="'+ Data.options.search.targets[0].targetX +'" />\
          Y:<INPUT id=' + searchPrefix + 'Y size=2 maxlength=3 value="'+ Data.options.search.targets[0].targetY +'" type=text/><B>' + kSearchRadius + ':</B><INPUT id=' + searchPrefix + 'Dist style="width:25px" type=text size=2 maxlength=3 value="'+ Data.options.search.targets[0].distance +'"/><BR>\
        <CENTER><INPUT id=' + searchPrefix + 'Refresh class=' + idGreenButton + ' type=submit value="' + kSearchRefreshMapData + '" /></center>\
        <DIV class=' + idStatBox + ' style="margin:0px 10px !important"><CENTER><SPAN id=' + searchPrefix + 'Tile></span></center></div></div><br></div>\
        <TABLE width=100% align=center><TR><TD>\
        <INPUT type=submit class=button value="' + kSearchCities + '" id=' + searchPrefix + 'ListC></input>\
        <INPUT type=submit class=button value="' + kSearchWilds + '" id=' + searchPrefix + 'ListW></input></td></tr></table>\
        <DIV id=' + searchPrefix + 'Content style="padding-top:5px; height:590px"></div>';
    t.cont.innerHTML = m;
    document.getElementById(searchPrefix + 'X').addEventListener ('change', t.eventCoords, false);
    document.getElementById(searchPrefix + 'Y').addEventListener ('change', t.eventCoords, false);
    document.getElementById(searchPrefix + 'Dist').addEventListener ('change', t.eventDist, false);
    document.getElementById(searchPrefix + 'Refresh').addEventListener ('click', t.refreshMapData, false);
    document.getElementById(searchPrefix + 'ListC').addEventListener ('click', t.tabSearchC, false);
    document.getElementById(searchPrefix + 'ListW').addEventListener ('click', t.tabSearchW, false);
    window.addEventListener('unload', t.onUnload, false);
    if (Data.options.search.targets[0].distance == undefined)
      Data.options.search.targets[0].distance = 75;
    t.eventCoords();
    t.eventDist();
    t.contentType = isEmpty(Data.options.searchTab,0);
    t.show();
  },

  onUnload : function (){
    var t = Tabs.Search;
    logit ('===============  Tabs.Search.onUnload');
  },

  hide : function (){
  },

  show : function (){
    var t = Tabs.Search;
    if (!t.checkMapBusy) {
      switch (isEmpty(t.contentType, 0)) {
        case 0: t.tabSearchC(); break;
        case 1: t.tabSearchW(); break;
      }
    } else setTimeout(t.show, 100);

  },

  eventCoords : function (e){
    var ex = document.getElementById(searchPrefix + 'X');
    var ey = document.getElementById(searchPrefix + 'Y');
    var x = parseIntZero (ex.value);
    var y = parseIntZero (ey.value);
    ex.value = x;
    ey.value = y;
    Data.options.search.targets[0].targetX = x;
    Data.options.search.targets[0].targetY = y;
    document.getElementById(searchPrefix + 'Tile').innerHTML = '&nbsp;';
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
    Map.scanMapCitiesCirc (x, y, 1, callback, true);
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
      Data.options.search.targets[0].terrainType = Map.names[tile.type];
      Data.options.search.targets[0].terrainLevel = tile.lvl;

      var mFeedBack = '';
      var type = tile.type.substr(0,1).toUpperCase();
      if ((type == "H") || (type == "G") || (type == "L") || (type == "M") || (type == "N") || (type == "F") || (type == "S") || (type == "P")){
         mFeedBack = '<B>' + translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl;
         if (tile.name != null && tile.name != '' && tile.name != ' ')
           mFeedBack += ' - <SPAN class=' + idBoldRed + '>' + kOwned + '</span>';
         mFeedBack += '</B>';
      } else if (type == "C" || type == "O" || type == " ") {
         var capitalType = tile.type;
         if (capitalType == " ")
           capitalType = "City";
         var mightF = null;
         if (tile.might == null || tile.might == 0) {
           mightF = 0;
         } else {
           mightF = nombreFormate(tile.might,' ');
         }
         mFeedBack = '<B>'+ translate(capitalType) + ' ' + kLevel + ' ' + tile.lvl + ' : ' + tile.name + ' (' + mightF + ')';
         if (tile.alliance != null && tile.alliance != '' && tile.alliance != ' ')
           mFeedBack += ' / ' + tile.alliance;
         mFeedBack += '</B>';
      } else {
         mFeedBack = '<B>'+ translate(tile.type) + ' ' + kLevel + ' ' + tile.lvl +'</b>';
      }
//      document.getElementById(searchPrefix + 'Tile').innerHTML = '<B>'+ translate(Map.names[tile.type]) + ' ' + kLevel + ' ' + tile.lvl +'</b>';
      document.getElementById(searchPrefix + 'Tile').innerHTML = mFeedBack;
    }
  },

  eventAlliance : function (e){
    var t = Tabs.Search;
    var ea = document.getElementById('listAlliances');
    var alli = ea.value;
    Data.options.search.targets[0].alliance  = alli;
    Data.options.search.targets[0].Walliance = alli;
    if (alli==null){
      ea.style.backgroundColor = 'red';
      return;
    }
    ea.style.backgroundColor = '';
    t.displayPlayersList ();
    t.displayCityResults ();
  },

  eventWAlliance : function (e){
    var t = Tabs.Search;
    var ea = document.getElementById('listWildAlliances');
    var alli = ea.value;
    Data.options.search.targets[0].alliance  = alli;
    Data.options.search.targets[0].Walliance = alli;
    if (alli==null){
      ea.style.backgroundColor = 'red';
      return;
    }
    ea.style.backgroundColor = '';
    t.displayWildPlayersList ();
    t.displayWildResults ();
  },

  eventPlayer : function (e){
    var t = Tabs.Search;
    var ea = document.getElementById('listPlayers');
    var plyr = ea.value;
    Data.options.search.targets[0].player  = plyr;
    Data.options.search.targets[0].Wplayer = plyr;
    if (plyr==null){
      ea.style.backgroundColor = 'red';
      return;
    }
    ea.style.backgroundColor = '';
    t.displayCityResults ();
  },

  eventWPlayer : function (e){
    var t = Tabs.Search;
    var ea = document.getElementById('listWildPlayers');
    var plyr = ea.value;
    Data.options.search.targets[0].player  = plyr;
    Data.options.search.targets[0].Wplayer = plyr;
    if (plyr==null){
      ea.style.backgroundColor = 'red';
      return;
    }
    ea.style.backgroundColor = '';
    t.displayWildResults ();
  },

  eventDist : function (e){
    var ed = document.getElementById(searchPrefix + 'Dist');
    var dist = ed.value;
    Data.options.search.targets[0].distance = dist;
    if (dist==null || dist<0 || dist>75){
      ed.style.backgroundColor = 'red';
      return;
    }
    ed.style.backgroundColor = '';
  },

  levelChanged : function (evt){
    var t = Tabs.Search;
    var id = evt.target.id.split ('_');
    var x = parseIntZero(evt.target.value);
    if (isNaN(x) || x<1 || x>10){
      evt.target.style.backgroundColor = 'red';
    } else {
      if (id[1] == 'Min') Data.options.search.wildMinLevel = x;
      else Data.options.search.wildMaxLevel = x;
      evt.target.value = x;
      var min = Data.options.search.wildMinLevel;
      var max = Data.options.search.wildMaxLevel;
      if (min>max)
        evt.target.style.backgroundColor = 'red';
      else {
        evt.target.style.backgroundColor = '';
        t.displayWildResults();
      }
    }
  },

  levelSelect : function (MinMax, curVal){
    var m = '<SELECT id="' + searchPrefix + 'Lv_' + MinMax + '">';
    for (var k=1; k<=10; k++)
      m += '<OPTION value="' + k + '" ' + (curVal==k?'SELECTED':'') + '>' + k + '</option>';
    m += '</select>';
    return m;
  },

  eventWildFlag : function (){
    var t = Tabs.Search;
    var cG = document.getElementById(searchPrefix + 'WildG');
    var cL = document.getElementById(searchPrefix + 'WildL');
    var cP = document.getElementById(searchPrefix + 'WildP');
    var cH = document.getElementById(searchPrefix + 'WildH');
    var cM = document.getElementById(searchPrefix + 'WildM');
    var cF = document.getElementById(searchPrefix + 'WildF');
    var cN = document.getElementById(searchPrefix + 'WildN');
    var cS = document.getElementById(searchPrefix + 'WildS');
    var cU = document.getElementById(searchPrefix + 'Unowned');

    Data.options.search.grassland = cG.checked;
    Data.options.search.lake = cL.checked;
    Data.options.search.plain = cP.checked;
    Data.options.search.hill = cH.checked;
    Data.options.search.mountain = cM.checked;
    Data.options.search.forest = cF.checked;
    Data.options.search.nuage = cN.checked;
    Data.options.search.swamp = cS.checked;
    Data.options.search.unowned = cU.checked;
    t.displayWildResults();
  },

  checkMapData : function (){
    var t = Tabs.Search;
    if (t.checkMapBusy)
      return false;
    t.checkMapBusy = true;
    t.scanMap(Data.options.search.targets[0].distance, function(){logit('****** Setting checkMapBusy to FALSE'); Tabs.Search.checkMapBusy = false});
    return true;
  },

  // return array of cities that satisfy config (max distance, alliance name)
  getAllianceCityList : function (){
    var t = Tabs.Search;
    var ret = [];
    for (var i=0; i<Data.playercities.cities.length; i++){
      var city = Data.playercities.cities[i];
      var type = city.type.substr(0,1).toUpperCase();
      if ((type != "A") && (type != "H") && (type != "G") && (type != "L") && (type != "M") && (type != "N") && (type != "F") && (type != "P") && (type != "S")){
        if (((city.alliance == Data.options.search.targets[0].alliance || Data.options.search.targets[0].alliance == "*") ||
             (city.alliance == " " && Data.options.search.targets[0].alliance == null)) &&
             (city.name == Data.options.search.targets[0].player || Data.options.search.targets[0].player == "*"))
          ret.push (city);
      }
    }
    return ret;
  },

  // return array of cities that satisfy config (max distance, alliance name)
  getWildernessesList : function (){
    var t = Tabs.Search;
    var ret = [];
    for (var i=0; i<Data.playercities.cities.length; i++){
      var wild = Data.playercities.cities[i];
      var type = wild.type.substr(0,1).toUpperCase();
      if ((type == "H") || (type == "G") || (type == "L") || (type == "M") || (type == "N") || (type == "F") || (type == "S") || (type == "P")){
        if ( ((type == "H" && Data.options.search.hill) ||
              (type == "G" && Data.options.search.grassland) ||
              (type == "L" && Data.options.search.lake) ||
              (type == "M" && Data.options.search.mountain) ||
              (type == "F" && Data.options.search.forest) ||
              (type == "N" && Data.options.search.nuage) ||
              (type == "S" && Data.options.search.swamp) ||
              (type == "P" && Data.options.search.plain)) &&
             ((parseInt(wild.lvl) >= parseInt(Data.options.search.wildMinLevel)) &&
              (parseInt(wild.lvl) <= parseInt(Data.options.search.wildMaxLevel ))) &&
             ((wild.name == '' && Data.options.search.unowned) || (!Data.options.search.unowned)) &&
             ((wild.alliance == Data.options.search.targets[0].Walliance || Data.options.search.targets[0].Walliance == "*") ||
              (wild.alliance == " " && Data.options.search.targets[0].Walliance == null))  &&
              (wild.name == Data.options.search.targets[0].Wplayer || Data.options.search.targets[0].Wplayer == "*")
           )
          ret.push (wild);
      }
    }
    return ret;
  },

  // return array of different alliances found
  getAllianceList : function (){
    var t = Tabs.Search;
    var ret = [];
    var existe = false;
    for (var i=0; i<Data.playercities.cities.length; i++){
      existe = false;
      for (var j=0; j<ret.length; j++){
        if (Data.playercities.cities[i].alliance == ret[j])
          existe = true;
      }
      if (!existe)
        ret.push (Data.playercities.cities[i].alliance);
    }
    function charOrdA(a, b){
      a = a.toLowerCase(); b = b.toLowerCase();
      if (a>b) return 1;
      if (a <b) return -1;
      return 0;
    }
    ret.sort(charOrdA);
    return ret;
  },

  displayAllianceList : function (){
    var t = Tabs.Search;
    var list = t.getAllianceList();
    var m = '<select id=listAlliances>\
             <option value="*">' + kSearchAllAlliance + '</option>';
    for (var i=0; i<list.length; i++){
	  var selected = '';
      if (list[i] == Data.options.search.targets[0].alliance) selected = 'SELECTED'
      m += '<option value="' + list[i] + '" '+selected+'>' + list[i] + '</option>';
    }
    m += '</select>';
    document.getElementById(searchPrefix + 'Alliance').innerHTML = m;
    t.displayPlayersList ();
  },

  displayWildAllianceList : function (){
    var t = Tabs.Search;
    var list = t.getAllianceList();
    var m = '<select id=listWildAlliances>\
             <option value="*">' + kSearchAllAlliance + '</option>';
    for (var i=0; i<list.length; i++){
	  var selected = '';
      if (list[i] == Data.options.search.targets[0].Walliance) selected = 'SELECTED'
      m += '<option value="' + list[i] + '" '+selected+'>' + list[i] + '</option>';
    }
    m += '</select>';
    document.getElementById(searchPrefix + 'WAlliance').innerHTML = m;
    t.displayWildPlayersList();
  },

  // return array of different alliances found
  getPlayersList : function (){
    var t = Tabs.Search;
    var ret = [];
    var existe = false;
    for (var i=0; i<Data.playercities.cities.length; i++){
      existe = false;
      for (var j=0; j<ret.length && !existe; j++){
        if (Data.playercities.cities[i].name == ret[j])
          existe = true;
      }
      if ((!existe)  &&
         ( (Data.options.search.targets[0].alliance == "*") ||
           ((Data.options.search.targets[0].alliance != "*") &&
           ((Data.playercities.cities[i].alliance == Data.options.search.targets[0].alliance) ||
            (Data.playercities.cities[i].alliance == " " && Data.options.search.targets[0].alliance == null)))
         ))
        ret.push (Data.playercities.cities[i].name);
    }
    function charOrdA(a, b){
      a = a.toLowerCase(); b = b.toLowerCase();
      if (a>b) return 1;
      if (a <b) return -1;
      return 0;
    }
    ret.sort(charOrdA);
    return ret;
  },

  displayPlayersList : function (){
    var t = Tabs.Search;
    var list = t.getPlayersList();
    var m = '<select id=listPlayers>\
             <option value="*">' + kSearchAllPlayers + '</option>';
    for (var i=0; i<list.length; i++){
	  var selected = '';
      if (list[i] == Data.options.search.targets[0].player) selected = 'SELECTED'
      m += '<option value="' + list[i] + '" '+selected+'>' + list[i] + '</option>';
    }
    m += '</select>';
    document.getElementById(searchPrefix + 'Players').innerHTML = m;
  },

  displayWildPlayersList : function (){
    var t = Tabs.Search;
    var list = t.getPlayersList();
    var m = '<select id=listWildPlayers>\
             <option value="*">' + kSearchAllPlayers + '</option>';
    for (var i=0; i<list.length; i++){
	  var selected = '';
      if (list[i] == Data.options.search.targets[0].Wplayer) selected = 'SELECTED'
      m += '<option value="' + list[i] + '" '+selected+'>' + list[i] + '</option>';
    }
    m += '</select>';
    document.getElementById(searchPrefix + 'WPlayers').innerHTML = m;
  },

  refreshMapData : function (){
    var t = Tabs.Search;
    t.checkMapBusy = false;
    t.checkMapData ();
  },


  //** CITY PLAYER SUB-TAB ***
  tabSearchC : function (){
    var t = Tabs.Search;
    setSubTab(searchPrefix + 'ListC', true);
    setSubTab(searchPrefix + 'ListW', false);
    t.contentType = 0;
    if (Data.playercities.lastUpdate && Data.playercities.lastUpdate != null && Data.playercities.lastUpdate != undefined) kLastupdate = ' ('+Data.playercities.lastUpdate+')';
    else kLastupdate = '';
    var m = '<DIV class=' + idInput + '>\
             <TABLE class=' + idTabPad + '><TR><TD class=' + idTableft + '>' + kSearchAlliance + ':</td><TD><DIV id=' + searchPrefix + 'Alliance></div></td><td>\
               <INPUT id=' + searchPrefix + 'NewList type=submit class=' + idGreenButton + ' value="' + kSearchRefreshList + '" /></td></tr>\
               <TR><TD class=' + idTableft + '>' + kSearchPlayer + ':</td><TD><DIV id=' + searchPrefix + 'Players></div></td></tr>\
             </table></div>\
             <DIV id=' + searchPrefix + 'Results  style="height:580px">\
               <DIV class=' + idTitle + '>' + kSearchCitiesList + kLastupdate + '</div>\
             <DIV id=' + searchPrefix + 'ResultsList class=' + idStatBox + ' style="height:550px; max-height:550px; overflow-y:auto ; overflow-x:auto ; margin-top:1px !important"></div>\
             </div>';
    document.getElementById(searchPrefix + 'Content').innerHTML = m;
    document.getElementById(searchPrefix + 'Alliance').addEventListener ('change', t.eventAlliance, false);
    document.getElementById(searchPrefix + 'Players').addEventListener ('change', t.eventPlayer, false);
    document.getElementById(searchPrefix + 'NewList').addEventListener ('click', t.displayAllianceList, false);
    t.displayAllianceList();
    t.displayPlayersList();
    t.displayCityResults();
  },

  displayCityResults : function (){
    var t = Tabs.Search;
    var m = '<TABLE id=' + searchPrefix + 'TargTab class=' + idTab + '><TR class=' + idTabHdr + '2>\
             <TD id=' + searchPrefix + 'tsc_0 width="20px"><A><SPAN>' + kDist + '</SPAN></A></td>\
             <TD id=' + searchPrefix + 'tsc_1 width="40px"><A><SPAN>' + kCoords + '</SPAN></A></td>';
    if (Data.options.search.targets[0].alliance == "*")
       m += '<TD id=' + searchPrefix + 'tsc_2><A><SPAN>' + kSearchAlliance + '</SPAN></A></td>';
    m += '<TD id=' + searchPrefix + 'tsc_3 width="200px" style="overflow-x:auto"><A><SPAN>' + kSearchPlayer + '</SPAN></A></td>\
          <TD id=' + searchPrefix + 'tsc_4 width="40px" align=right><A><SPAN>' + kSearchMight + '</SPAN></A></td>\
          <TD width="40px" align=right>' + kSearchEvol + '</td>\
          <TD id=' + searchPrefix + 'tsc_5 ><A><SPAN>' + kSearchType + '</SPAN></A></td><TD></td>\
          <TD></TD></tr>';

    var cities = t.getAllianceCityList();
    for (var i=0; i<cities.length; i++){
      m += '<TR><TD>'+ cities[i].dist +'</td><TD align=center>'+ cities[i].x +','+ cities[i].y +'</td>';
      if (Data.options.search.targets[0].alliance == "*")
         m += '<TD align=left>'+ cities[i].alliance +'</td>';
      var mightF = nombreFormate(cities[i].might,' ');

      var found = false;
      var evol = 'x';
      for (var old=0; old<Data.players.playerEvol.length && !found; old++){
        if (Data.players.playerEvol[old].name == cities[i].name){
          evol = cities[i].might - Data.players.playerEvol[old].might;
          if (evol < 0) evol = '<SPAN class=red>'+nombreFormate(evol,' ')+'</span>';
          else if (evol > 0) evol = '<SPAN class=green>+'+nombreFormate(evol,' ')+'</span>';
          else evol = nombreFormate(evol,' ');
          found = true;
        }
      }
      m += '<TD align=left>'+ cities[i].name +'</td>\
            <TD align=right>'+ mightF +'</td><TD align=right>'+ evol +'</td><TD align=center>'+ cities[i].type +'</td>\
            <TD><INPUT class=small id=' + searchPrefix + 'spy_'+ i +' type=submit value=' + kSpyNow + '\></td></tr>';
    }
    document.getElementById(searchPrefix + 'ResultsList').innerHTML = m + '</table>';
    for (var h=0; h<6; h++)
      if ((h != 2) || (Data.options.search.targets[0].alliance == "*" && h == 2))
        document.getElementById(searchPrefix + 'tsc_' + h).addEventListener ('click', sortCityList, false);

    var own_alliance = (Seed.s.alliance) ? Seed.s.alliance.name : '';
    for (var i=0; i<cities.length; i++){
      var butSpy = document.getElementById(searchPrefix + 'spy_'+ i);
      butSpy.addEventListener ('click', butSpyNow, false);
      if ((cities[i].alliance == null) || (cities[i].alliance != own_alliance)) {
        butSpy.disabled = false;
        butSpy.style.backgroundColor = '#009C1F';
        butSpy.style.color = 'white';            
      } else {
        butSpy.disabled = true;
        butSpy.style.backgroundColor = '#e80000';
        butSpy.style.color = 'white';            
      }
    }
    function butSpyNow (e){
      var args = e.target.id.split('_');
      var dial = new ModalDialog (t.cont, 300, 150, '', false);
      dial.getContentDiv().innerHTML = kSendingSpy;
      checkSpy (cities[args[1]], notify);
      function notify (rslt){
        if (rslt!='OK'){
          dial.getContentDiv().innerHTML = '<B>'+ rslt +'</b>';
          dial.allowClose (true);
        } else {
          dial.getContentDiv().innerHTML = '<B> OK </b>';
          setTimeout (function(){dial.destroy()}, 1000);
        }
      }
    }
    function checkSpy (targetObj, notify){
      var t = Tabs.Search;
      var cityId = Seed.cities[0].id;
      var cityIdx = 0;
      // check troops
      var troops = [];
      troops['Spy'] = 1;
      var totTroops = 0;
      for (var p in troops){
        if (troops[p] > 0){
          totTroops += troops[p];
          if (Seed.cities[cityIdx].units[p] < troops[p]){
            notify (kNotEnough + translate(p));
            return;
          }
        }
      }
      if (totTroops <= 0){
          notify (kNoTroopsDefined);
          return;
      }
      // TODO: 'too many troops for muster point level'
      var authMaxTroops = getMusterPointMaxTroops (cityIdx);
      for (var p in troops) {
        if (troops[p] > 0) {
          if (troops[p] > authMaxTroops) {
            notify (kTooManyTroops);
            return;
          }
        }
      }
      if (totTroops > authMaxTroops) {
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
      var targMsg = targetObj.name  + ' ' + kCampAt + ' ' + targetObj.x +','+ targetObj.y;
      new Ajax.marchSpy (cityId, targetObj.x, targetObj.y, troops, 'spy', function (rslt){
        if (rslt.ok && rslt.dat.result.success){
          var march = Seed.marches[rslt.dat.result.job];
          if (march == null){
            logit ('***** March missing from seed: '+ rslt.dat.result.job.march_id); 
            if (DEBUG_MARCHES) WinLog.write ('***** ERRROR march missing from seed: '+ rslt.dat.result.job.march_id);   
          } else {
            Data.options.objMarches[rslt.dat.result.job.march_id] = cloneProps(march);
            if (DEBUG_MARCHES) WinLog.write ('Tabs.Search.checkSpy: ID='+ march.id +'  ('+ march.x +','+ march.y +')');    
          }
          actionLog (kSpySentTo + ' ' + targMsg);
          notify ('OK');
        } else {
          notify (kError + rslt.errmsg );
        }
      });
    }
    function sortCityList (e){
      var t = Tabs.Search;
      var arg = e.target.parentNode.parentNode.id.split('_');
      if (arg[1] == 0){
        if (Data.options.search.sortL == '0'){
          Data.playercities.cities.sort(function(a,b){return b.dist-a.dist});
          Data.options.search.sortL = '-0';
        } else {
          Data.playercities.cities.sort(function(a,b){return a.dist-b.dist});
          Data.options.search.sortL = '0';
        }
      } else if (arg[1] == 1){
        if (Data.options.search.sortL == '1'){
          Data.playercities.cities.sort(function(a,b){return b.x-a.x});
          Data.options.search.sortL = '-1';
        } else {
          Data.playercities.cities.sort(function(a,b){return a.x-b.x});
          Data.options.search.sortL = '1';
        }
      } else if (arg[1] == 2){
        if (Data.options.search.sortL == '2'){
          Data.playercities.cities.sort(function(a, b){a = a.alliance.toLowerCase(); b = b.alliance.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
          Data.options.search.sortL = '-2';
        } else {
          Data.playercities.cities.sort(function(a, b){a = a.alliance.toLowerCase(); b = b.alliance.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
          Data.options.search.sortL = '2';
        }
      } else if (arg[1] == 3){
        if (Data.options.search.sortL == '3'){
          Data.playercities.cities.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
          Data.options.search.sortL = '-3';
        } else {
          Data.playercities.cities.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
          Data.options.search.sortL = '3';
        }
      } else if (arg[1] == 4){
        if (Data.options.search.sortL == '4'){
          Data.playercities.cities.sort(function(a,b){return b.might-a.might});
          Data.options.search.sortL = '-4';
        } else {
          Data.playercities.cities.sort(function(a,b){return a.might-b.might});
          Data.options.search.sortL = '4';
        }
      } else if (arg[1] == 5){
        if (Data.options.search.sortL == '5'){
          Data.playercities.cities.sort(function(a, b){a = a.type.toLowerCase(); b = b.type.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
          Data.options.search.sortL = '-5';
        } else {
          Data.playercities.cities.sort(function(a, b){a = a.type.toLowerCase(); b = b.type.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
          Data.options.search.sortL = '5';
        }
      }
      t.displayCityResults();
    }
  },


  //** WILDERNESSES SUB-TAB ***
  tabSearchW : function (){
    var t = Tabs.Search;
    setSubTab(searchPrefix + 'ListC', false);
    setSubTab(searchPrefix + 'ListW', true);
    t.contentType = 1;
    var m = '<DIV class=' + idInput + '>\
             <TABLE class=' + idTabPad + '>\
             <TR><TD width=3%><INPUT id=' + searchPrefix + 'WildG type=checkbox '+ (Data.options.search.grassland?'CHECKED ':'') +'/></td><TD class=' + idTableft + ' width=30%>' + kGrassland + '</td>\
                 <TD width=3%><INPUT id=' + searchPrefix + 'WildL type=checkbox '+ (Data.options.search.lake?'CHECKED ':'') +'/></td><TD class=' + idTableft + ' width=30%>' + kLake + '</td>\
                 <TD width=3%><INPUT id=' + searchPrefix + 'WildP type=checkbox '+ (Data.options.search.plain?'CHECKED ':'') +'/></td><TD class=' + idTableft + ' width=31%>' + kPlain + '</td></tr>\
             <TR><TD><INPUT id=' + searchPrefix + 'WildH type=checkbox '+ (Data.options.search.hill?'CHECKED ':'') +'/></td><TD class=' + idTableft + '>' + kHill + '</td>\
                 <TD><INPUT id=' + searchPrefix + 'WildM type=checkbox '+ (Data.options.search.mountain?'CHECKED ':'') +'/></td><TD class=' + idTableft + '>' + kMountain + '</td>\
                 <TD><INPUT id=' + searchPrefix + 'WildF type=checkbox '+ (Data.options.search.forest?'CHECKED ':'') +'/></td><TD class=' + idTableft + '>' + kForest + '</td></tr>\
             <TR><TD><INPUT id=' + searchPrefix + 'WildN type=checkbox '+ (Data.options.search.nuage?'CHECKED ':'') +'/></td><TD class=' + idTableft + '>' + kFog + '</td>\
                 <TD><INPUT id=' + searchPrefix + 'WildS type=checkbox '+ (Data.options.search.swamp?'CHECKED ':'') +'/></td><TD class=' + idTableft + '>' + kSwamp + '</td></tr>\
             </table><TABLE class=' + idTabPad + '>\
             <TR><TD class=' + idTableft + ' width=33%>' + kSearchMinLev + ': '+ t.levelSelect('Min', isEmpty(Data.options.search.wildMinLevel,'1') ) +'</td>\
                 <TD class=' + idTableft + ' width=33%>' + kSearchMaxLev + ': '+ t.levelSelect('Max', isEmpty(Data.options.search.wildMaxLevel,'10') ) +'</td>\
                 <TD width=3%><INPUT id=' + searchPrefix + 'Unowned type=checkbox '+ (Data.options.search.unowned?'CHECKED ':'') +'/></td><TD class=' + idTableft + ' width=30%>' + kSearchUnowned + '</td>\
             </tr></table><TABLE class=' + idTabPad + '><TR><TD class=' + idTableft + '>' + kSearchAlliance + ':</td><TD><DIV id=' + searchPrefix + 'WAlliance></div></td><td>\
               <INPUT id=' + searchPrefix + 'WNewList type=submit class=' + idGreenButton + ' value="' + kSearchRefreshList + '" /></td></tr>\
               <TR><TD class=' + idTableft + '>' + kSearchOwner + ':</td><TD><DIV id=' + searchPrefix + 'WPlayers></div></td></tr>\
             </table></div>';
    m += '<DIV id=' + searchPrefix + 'Wilds  style="height:490px">\
               <DIV class=' + idTitle + '>' + kSearchWildsList + '</div>\
             <DIV id=' + searchPrefix + 'WildList class=' + idStatBox + ' style="height:470px; max-height:470px; overflow-y:auto ; overflow-x:auto ; margin-top:1px !important"></div>\
             </div>';
    document.getElementById(searchPrefix + 'Content').innerHTML = m;
    document.getElementById(searchPrefix + 'WildG').addEventListener ('click', t.eventWildFlag, false);
    document.getElementById(searchPrefix + 'WildL').addEventListener ('click', t.eventWildFlag, false);
    document.getElementById(searchPrefix + 'WildP').addEventListener ('click', t.eventWildFlag, false);
    document.getElementById(searchPrefix + 'WildH').addEventListener ('click', t.eventWildFlag, false);
    document.getElementById(searchPrefix + 'WildM').addEventListener ('click', t.eventWildFlag, false);
    document.getElementById(searchPrefix + 'WildF').addEventListener ('click', t.eventWildFlag, false);
    document.getElementById(searchPrefix + 'WildN').addEventListener ('click', t.eventWildFlag, false);
    document.getElementById(searchPrefix + 'WildS').addEventListener ('click', t.eventWildFlag, false);
    document.getElementById(searchPrefix + 'Lv_Min').addEventListener('change', t.levelChanged, false);
    document.getElementById(searchPrefix + 'Lv_Max').addEventListener('change', t.levelChanged, false);
    document.getElementById(searchPrefix + 'Unowned').addEventListener ('click', t.eventWildFlag, false);
    document.getElementById(searchPrefix + 'WAlliance').addEventListener ('change', t.eventWAlliance, false);
    document.getElementById(searchPrefix + 'WPlayers').addEventListener ('change', t.eventWPlayer, false);
    document.getElementById(searchPrefix + 'WNewList').addEventListener ('click', t.displayWildAllianceList, false);
    if (Data.options.search.wildMinLevel == undefined)
      Data.options.search.wildMinLevel = 1;
    if (Data.options.search.wildMaxLevel == undefined)
      Data.options.search.wildMaxLevel = 10;
    t.displayWildAllianceList();
    t.displayWildPlayersList();
    t.displayWildResults();
  },

  displayWildResults : function (){
    var t = Tabs.Search;
    var m = '<TABLE id=' + searchPrefix + 'WildTab class=' + idTab + '><TR class=' + idTabHdr + '2>\
             <TD id=' + searchPrefix + 'tsw_0 width="20px"><A><SPAN>' + kDist + '</SPAN></A></td>\
             <TD id=' + searchPrefix + 'tsw_1 width="40px"><A><SPAN>' + kCoords + '</SPAN></A></td>\
             <TD id=' + searchPrefix + 'tsw_5 width="60px"><A><SPAN>' + kSearchType + '</SPAN></A></td>\
             <TD id=' + searchPrefix + 'tsw_6 width="20px"><A><SPAN>' + kAutoLevel + '</SPAN></A></td>\
             <TD id=' + searchPrefix + 'tsw_3 width="200px" style="overflow-x:auto"><A><SPAN>' + kSearchOwner + '</SPAN></A></td>\
             <TD id=' + searchPrefix + 'tsw_4 width="40px" align=right><A><SPAN>' + kSearchMight + '</SPAN></A></td>\
             <TD id=' + searchPrefix + 'tsw_2><A><SPAN>' + kSearchAlliance + '</SPAN></A></td><td></td></tr>';

    var wilds = t.getWildernessesList();
    for (var i=0; i<wilds.length; i++){
      var mightF = null;
      if (wilds[i].might != null)
        mightF = nombreFormate(wilds[i].might,' ');
      m += '<TR><TD>'+ wilds[i].dist +'</td><TD align=center>'+ wilds[i].x +','+ wilds[i].y +'</td>\
            <TD align=left>'+ translate(wilds[i].type) +'</td><TD align=right>'+ wilds[i].lvl +'</td>\
            <TD align=left>'+ wilds[i].name +'</td><TD align=right>'+ mightF +'</td><TD align=left>'+ wilds[i].alliance +'</td>\
            <TD><INPUT class=small id=' + searchPrefix + 'att_'+ i +' type=submit value=' + kAttackNow + '\></td></tr>';
    }
    document.getElementById(searchPrefix + 'WildList').innerHTML = m + '</table>';
    for (var h=0; h<7; h++)
      document.getElementById(searchPrefix + 'tsw_' + h).addEventListener ('click', sortWildList, false);

    var own_alliance = (Seed.s.alliance) ? Seed.s.alliance.name : '';
    for (var i=0; i<wilds.length; i++){
      var butAttack = document.getElementById(searchPrefix + 'att_'+ i);
      butAttack.addEventListener ('click', butAttackNow, false);
      if ((wilds[i].alliance == null) || (wilds[i].alliance != own_alliance)) {
        butAttack.disabled = false;
        butAttack.style.backgroundColor = '#009C1F';
        butAttack.style.color = 'white';            
      } else {
        butAttack.disabled = true;
        butAttack.style.backgroundColor = '#e80000';
        butAttack.style.color = 'white';            
      }
    }
    function butAttackNow (e){
      var args = e.target.id.split('_');
      var dial = new ModalDialog (t.cont, 300, 150, '', false);
      dial.getContentDiv().innerHTML = kSendingSpy;
      checkAttack (wilds[args[1]], notify);
      function notify (rslt){
        if (rslt!='OK'){
          dial.getContentDiv().innerHTML = '<B>'+ rslt +'</b>';
          dial.allowClose (true);
        } else {
          dial.getContentDiv().innerHTML = '<B> OK </b>';
          setTimeout (function(){dial.destroy()}, 1000);
        }
      }
    }

    function checkAttack (targetObj, notify){
      var t = Tabs.Search;
      var cityId = Seed.cities[0].id;
      var cityIdx = 0;
      var gen;
      // check troops
      var troops = [];
      troops['Spy'] = 1;
      var totTroops = 0;
      for (var p in troops){
        if (troops[p] > 0){
          totTroops += troops[p];
          if (Seed.cities[cityIdx].units[p] < troops[p]){
            notify (kNotEnough + translate(p));
            return;
          }
        }
      }
      if (totTroops <= 0){
          notify (kNoTroopsDefined);
          return;
      }
      var authMaxTroops = getMusterPointMaxTroops (cityIdx);
      for (var p in troops) {
        if (troops[p] > 0) {
          if (troops[p] > authMaxTroops) {
            notify (kTooManyTroops);
            return;
          }
        }
      }
      if (totTroops > authMaxTroops) {
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
      var targMsg = targetObj.name  + ' ' + kCampAt + ' ' + targetObj.x +','+ targetObj.y;
      new Ajax.march (cityId, targetObj.x, targetObj.y, gen.id, troops, 'attack', function (rslt){
        if (rslt.ok && rslt.dat.result.success){
          var march = Seed.marches[rslt.dat.result.job];
          if (march == null){
            logit ('***** March missing from seed: '+ rslt.dat.result.job.march_id); 
            if (DEBUG_MARCHES) WinLog.write ('***** ERRROR march missing from seed: '+ rslt.dat.result.job.march_id);   
          } else {
            Data.options.objMarches[rslt.dat.result.job.march_id] = cloneProps(march);
            if (DEBUG_MARCHES) WinLog.write ('Tabs.Search.checkSpy: ID='+ march.id +'  ('+ march.x +','+ march.y +')');    
          }
          actionLog (kAttackSent + ' ' + targMsg);
          notify ('OK');
        } else {
          notify (kError + rslt.errmsg );
        }
      });
    }
    function sortWildList (e){
      var t = Tabs.Search;
      var arg = e.target.parentNode.parentNode.id.split('_');
      if (arg[1] == 0){
        if (Data.options.search.sortL == '0'){
          Data.playercities.cities.sort(function(a,b){return b.dist-a.dist});
          Data.options.search.sortL = '-0';
        } else {
          Data.playercities.cities.sort(function(a,b){return a.dist-b.dist});
          Data.options.search.sortL = '0';
        }
      } else if (arg[1] == 1){
        if (Data.options.search.sortL == '1'){
          Data.playercities.cities.sort(function(a,b){return b.x-a.x});
          Data.options.search.sortL = '-1';
        } else {
          Data.playercities.cities.sort(function(a,b){return a.x-b.x});
          Data.options.search.sortL = '1';
        }
      } else if (arg[1] == 2){
        if (Data.options.search.sortL == '2'){
          Data.playercities.cities.sort(function(a, b){a = a.alliance.toLowerCase(); b = b.alliance.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
          Data.options.search.sortL = '-2';
        } else {
          Data.playercities.cities.sort(function(a, b){a = a.alliance.toLowerCase(); b = b.alliance.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
          Data.options.search.sortL = '2';
        }
      } else if (arg[1] == 3){
        if (Data.options.search.sortL == '3'){
          Data.playercities.cities.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
          Data.options.search.sortL = '-3';
        } else {
          Data.playercities.cities.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
          Data.options.search.sortL = '3';
        }
      } else if (arg[1] == 4){
        if (Data.options.search.sortL == '4'){
          Data.playercities.cities.sort(function(a,b){return b.might-a.might});
          Data.options.search.sortL = '-4';
        } else {
          Data.playercities.cities.sort(function(a,b){return a.might-b.might});
          Data.options.search.sortL = '4';
        }
      } else if (arg[1] == 5){
        if (Data.options.search.sortL == '5'){
          Data.playercities.cities.sort(function(a, b){a = a.type.toLowerCase(); b = b.type.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
          Data.options.search.sortL = '-5';
        } else {
          Data.playercities.cities.sort(function(a, b){a = a.type.toLowerCase(); b = b.type.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
          Data.options.search.sortL = '5';
        }
      } else if (arg[1] == 6){
        if (Data.options.search.sortL == '6'){
          Data.playercities.cities.sort(function(a,b){return b.lvl-a.lvl});
          Data.options.search.sortL = '-6';
        } else {
          Data.playercities.cities.sort(function(a,b){return a.lvl-b.lvl});
          Data.options.search.sortL = '6';
        }
      }
      t.displayWildResults();
    }
  },

  scanMap : function (radius, notify){
    var t = Tabs.Search;
    ret = [];
    if (Data.playercities.cities){
      for (var i=0; i<Data.playercities.cities.length; i++){
        var city = Data.playercities.cities[i];
        var type = city.type.substr(0,1).toUpperCase();
        if ((type != "A") && (type != "H") && (type != "G") && (type != "L") && (type != "M") && (type != "N") && (type != "F") && (type != "P") && (type != "S")){
          ret.push ({name:Data.playercities.cities[i].name, might:Data.playercities.cities[i].might});
        }
      }
    }
    Data.players.playerEvol = cloneProps(ret);
    Data.playercities = {radius:0, lastUpdate:'', center:{x:Data.options.search.targets[0].targetX, y:Data.options.search.targets[0].targetY}, cities:[]};
    var dial = new ModalDialog (t.cont, 300, 165, '', false, null);
    dial.getContentDiv().innerHTML = kScanningMap2;
    var ix=0; iy=0;
    var x = Data.options.search.targets[0].targetX;
    var y = Data.options.search.targets[0].targetY;
    if (radius == null)
      radius = Data.options.search.targets[0].distance;
logit('======> Map.scanMapCitiesCirc (' + x +','+y+', '+radius+', callback, false)');
    Map.scanMapCitiesCirc (x,y, radius, callback, false);
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
        Data.playercities.cities.push ({x:tile.x, y:tile.y, dist:tile.dist, type:tile.type, lvl:tile.lvl, name:tile.name, might:tile.might, alliance:tile.alliance, fromCity:0});
      }      
      if (dat.done){
logit ('*********  Done Scanning Map ... Total targets: '+ Data.playercities.cities.length);      
        Data.playercities.cities.sort(function(a,b){return a.dist-b.dist});
        Data.playercities.radius = radius;
        var now = serverTime();
        Data.playercities.lastUpdate = new Date(now * 1000).myString();
        if (notify)
          notify(true);
        dial.destroy();
      }
    }
  },

};
//*********************************** Map search Tab *********************************************
// End Jawz


//*********************************** Tower Tab *********************************************
Tabs.Tower = {
  tabOrder     : TOWER_TAB_ORDER,
  tabLabel     : kTower,
  tabDisabled  : !ENABLE_TOWER_TAB,
  cont         : null,
  alarmTimer   : null,
  deleteTimer  : null,
  fetchTimer   : null,
  logTab       : null,
  maxEntries   : 100,
  saveEntries  : 100,
  readList     : [],

  init : function (div){
    var t = Tabs.Tower;
    t.cont = div;

    m = '<DIV class=' + idTitle + ' style="margin-bottom:10px">'+ kSentinelTower +'</div><BR><TABLE class=' + idTab + '>\
         <TR valign=top><TD colspan=4><B>' + kTowerConfig + ': </B></TD></TR>\
         <TR><TD><INPUT id=' + towerPrefix + 'Alert type=checkbox /></td><td colspan=2>' + kTowerEnable + '</td></tr>\
         <TR><TD></TD><TD colspan=2>' + kTowerCheck + ': <INPUT id=' + towerPrefix + 'chkTime size=1 maxlength=2 type=text value="'+ Data.options.warningTower.delay +'" />&nbsp\
         <SELECT id=' + towerPrefix + 'chkUnit size=1>\
           <OPTION value=1 '+(Data.options.warningTower.unit == 1 ? 'selected' : '')+'>' + kConfS + '(s)</option>\
           <OPTION value=60 '+(Data.options.warningTower.unit == 60 ? 'selected' : '')+'>' + kConfM + '(s)</option>\
           <OPTION value=3600 '+(Data.options.warningTower.unit == 3600 ? 'selected' : '')+'>' + kConfH + '(s)</option>\
         </select></td></tr><TR><TD>&nbsp</TD></TR>\
         <TR><TD><INPUT id=' + towerPrefix + 'NoSpy type=checkbox /></td><td colspan=2>' + kTowerNoSpy + '</td></tr>\
         <TR><TD><INPUT id=' + towerPrefix + 'Del type=checkbox /></td><td colspan=2>' + kTowerDelete + ': &nbsp<INPUT id=' + towerPrefix + 'DelTime size=1 maxlength=2 type=text value="'+ Data.options.warningTower.delayDelete +'" />&nbsp\
        <SELECT id=' + towerPrefix + 'DelUnit size=1>\
          <OPTION value=60 '+(Data.options.warningTower.unitDelete == 60 ? 'selected' : '')+'>' + kConfM + '(s)</option>\
          <OPTION value=3600 '+(Data.options.warningTower.unitDelete == 3600 ? 'selected' : '')+'>' + kConfH + '(s)</option>\
          <OPTION value=86400 '+(Data.options.warningTower.unitDelete == 86400 ? 'selected' : '')+'>' + kConfD + '(s)</option>\
        </select></td></tr></table><BR>';

    m += '<TABLE class=' + idTab + '>\
          <TR valign=top><TD colspan=4><B>'+ kConfigSound +':</B></TD></TR>\
          <TR><TD><INPUT id=' + towerPrefix + 'Sound type=checkbox  '+ (Data.options.warningTower.sound?'CHECKED ':'') +'/></td>\
              <TD>' + kTowerPlaySound + '</td></tr>\
          <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\
                <TR><TD>' + kSoundFile + ': &nbsp; </td>\
                    <TD><INPUT id=' + towerPrefix + 'File type=text size=50 maxlength=160 value="'+ Data.options.warningTower.soundUrl +'" \> &nbsp; </td>\
                    <TD><INPUT id=' + towerPrefix + 'Play type=submit value=Play>\
                        <INPUT id=' + towerPrefix + 'Stop type=submit value=Stop>\
                        <INPUT id=' + towerPrefix + 'Default type=submit value=Default></td></tr>\
              </table></TD></TR>\
          <TR><TD><INPUT id=' + towerPrefix + 'Repeat type=checkbox '+ (Data.options.warningTower.repeat?'CHECKED ':'') +'/></td>\
              <TD><TABLE cellpadding=0 cellspacing=0><TR><TD>' + kRepeat + '\
                  <INPUT id=' + towerPrefix + 'Every type=text size=2 maxlength=5 value="'+ Data.options.warningTower.repeatDelay +'">' + kConfM + 's</td>\
                  <TD width=5px></td><TD>' + kPlayLength + '\
                  <INPUT id=' + towerPrefix + 'Length type=text size=3 maxlength=5 value="'+ Data.options.warningTower.playLength +'">' + kConfS + 's</td></tr>\
          </TABLE></TD></TR></table><BR><HR>';

      m += '<DIV class=' + idTitle + ' style="margin-bottom:10px">' + kLogAlerts + '</div>\
            <DIV id=' + towerPrefix + 'LogList class=' + idStatBox + ' style="height:465px; max-height:465px; overflow-y:auto; margin-top:1px !important">\
            <TABLE cellpadding=0 cellspacing=0 id=ptTowerLog width=100% class=' + idTabLined + 'W>\
            </table></div>\
            <DIV id=pbSwfPlayer></div>';

      t.cont.innerHTML = m;
      t.logTab = document.getElementById('ptTowerLog');
      Data.msgsTower = [];
      t.printTab();  
      t.togOpt (towerPrefix + 'Alert', Data.options.warningTower.enabled, t.setEnable);
      t.togOpt (towerPrefix + 'NoSpy', Data.options.warningTower.nospy, t.setEnableNoSpy);
      t.togOpt (towerPrefix + 'Del', Data.options.warningTower.deleteReport, t.setDeleteReport);
      document.getElementById(towerPrefix + 'chkTime').addEventListener ('change', t.timeChanged, false);
      document.getElementById(towerPrefix + 'chkUnit').addEventListener ('change', t.unitChanged, false);
      document.getElementById(towerPrefix + 'DelTime').addEventListener ('change', t.timeDeleteChanged, false);
      document.getElementById(towerPrefix + 'DelUnit').addEventListener ('change', t.unitDeleteChanged, false);
      t.deleteTick();
      t.alarmTick();

      document.getElementById(towerPrefix + 'Sound').addEventListener ('change', function (e){Data.options.warningTower.sound = e.target.checked}, false);
      document.getElementById(towerPrefix + 'Repeat').addEventListener ('change', function (e){Data.options.warningTower.repeat = e.target.checked}, false);
      document.getElementById(towerPrefix + 'Every').addEventListener ('change', function (e){Data.options.warningTower.repeatDelay = e.target.value}, false);
      document.getElementById(towerPrefix + 'Length').addEventListener ('change', function (e){Data.options.warningTower.playLength = e.target.value}, false);
      document.getElementById(towerPrefix + 'File').addEventListener ('change', function (){Data.options.warningTower.soundUrl = document.getElementById(towerPrefix + 'File').value}, false);
      document.getElementById(towerPrefix + 'Play').addEventListener ('click', t.playSound, false);
      document.getElementById(towerPrefix + 'Stop').addEventListener ('click', t.stopSound, false);
      document.getElementById(towerPrefix + 'Default').addEventListener ('click', function (){
        document.getElementById(towerPrefix + 'File').value = DEFAULT_ALERT_SOUND_URL;
        Data.options.warningTower.soundUrl = DEFAULT_ALERT_SOUND_URL;
        t.playSound;
        }, false);
      document.getElementById(towerPrefix + 'Stop').disabled = true;
  },
  
  hide : function (){
  },
  
  show : function (){
  },


  printTab : function () {
    var t = Tabs.Tower;
    t.logTab.innerHTML = '';
    t._addTab ('', true);
    if (extTypeof(Data.msgsTower) == 'array'){
      for (var i=0; i<Data.msgsTower.length; i++)
        t._addTab (Data.msgsTower[i], false);
    }
  },
 
  _addTab : function (msg, head){
    var t = Tabs.Tower;
    if (!head &&Data.options.warningTower.nospy && msg.type == 1)
      return;
    var rows = t.logTab.getElementsByTagName('tr');
    var rowCount = rows.length;
    var row = t.logTab.insertRow((head==true? 0 : 1));
    row.vAlign = 'top';
    if (head)
      row.id = 0;
    else {
      if (rowCount % 2 == 1) row.style.backgroundColor = "White";
      row.id = msg.id;
    }
    var cell;
    var txt;
    for (var i=0;i<5;i++)
    {
      cell = row.insertCell(i);
      if (head) {
        switch (i) {
          case 0: txt = kSearchType; break;
          case 1: txt = kArrivalTime; break;
          case 2: txt = kAttacker; break;
          case 3: txt = kSearchAlliance; break;
          default: txt = kUnit; break;
        }
      } else {
        switch (i) {
          case 0: txt = (msg.type == 0 ? kAttack1 : kSpy); break;
          case 1: if (msg.arrive_at != 0) txt = new Date(msg.arrive_at).formatDate() + ' ' + new Date(msg.arrive_at).formatTime();
                  else txt = '';
                  break;
          case 2: if (msg.x != -1) txt = msg.x+','+msg.y;
                  else txt = '';
                  break;
          case 3: txt = msg.alliance; break;
          default: txt = msg.troups; break;
        }
      }
      cell.innerHTML = txt;
      if (i>2) cell.width = '30%';
      else if (i==2) cell.width = '10%';
      else cell.width = '15%';
      if (head)
        cell.style.fontWeight = 'bold';
      else
        cell.style.fontWeight = 'normal';
      cell.style.color = 'Black';
    }
  }, 

  removeRow : function (msg) {
    var t = Tabs.Tower;
    for (var i=0;i<t.logTab.rows.length;i++) {
      if (t.logTab.rows[i].id == msg.id) {
        t.logTab.deleteRow(i);
        break;
      }
    }
  },
 
  setEnable : function (onOff){
    var t = Tabs.Tower;
    Data.options.warningTower.enabled = onOff;
    if (Data.options.warningTower.enabled) t.alarmTick();
  },
  
  setEnableNoSpy : function (onOff){
    var t = Tabs.Tower;
    Data.options.warningTower.nospy = onOff;
    t.printTab();
  },
  
  setDeleteReport : function (onOff){
    var t = Tabs.Tower;
    Data.options.warningTower.deleteReport = onOff;
    t.deleteTick();
  },

  timeChanged : function (e){
    var t = Tabs.Tower;
    var etime = document.getElementById(towerPrefix + 'chkTime');
    var time = parseIntZero (etime.value);
    etime.value = time;
    Data.options.warningTower.delay = time;
    t.alarmTick();
  },
  
  unitChanged : function (e){
    var t = Tabs.Tower;
    var eunit = document.getElementById(towerPrefix + 'chkUnit');
    var unit = parseIntZero (eunit.value);
    eunit.value = unit;
    Data.options.warningTower.unit = unit;
    t.alarmTick();
  },
  
  timeDeleteChanged : function (e){
    var t = Tabs.Tower;
    var etime = document.getElementById(towerPrefix + 'DelTime');
    var time = parseIntZero (etime.value);
    etime.value = time;
    Data.options.warningTower.delayDelete = time;
    t.deleteTick();
  },
 
  unitDeleteChanged : function (e){
    var t = Tabs.Tower;
    var eunit = document.getElementById(towerPrefix + 'DelUnit');
    var unit = parseIntZero (eunit.value);
    eunit.value = unit;
    Data.options.warningTower.unitDelete = unit;
    t.deleteTick();
  },

  alarmTick : function (){
    var t = Tabs.Tower;
    clearTimeout (t.alarmTimer);
    t.checkAlarm();
    t.alarmTimer = setTimeout (t.alarmTick, Data.options.warningTower.delay*Data.options.warningTower.unit*1000);
  },

  deleteTick : function (){
    var t = Tabs.Tower;
    clearTimeout (t.deleteTimer);
    if (Data.options.warningTower.deleteReport) {
      var d;
      for (var i=Data.msgsTower.length-1; i>=0; i--) {
        d = Date.parse(Data.msgsTower[i].arrive_at)/1000;
        var now = parseInt(serverTime());
        var diff = now - d;
        if (diff>=Data.options.warningTower.delayDelete*Data.options.warningTower.unitDelete) {
          t.removeRow(Data.msgsTower[i]);
          Data.msgsTower.splice(i,1);
        }
      }
      t.deleteTimer = setTimeout (t.deleteTick, Data.options.warningTower.delayDelete*Data.options.warningTower.unitDelete*1000);
    }
  },

  // check for alarm reports
  checkAlarm : function (){
    Ajax.messageList ('all', 1, function (rslt){
      var t = Tabs.Tower;
      if (rslt != null) {
        //logit ('messageList:\n' + inspect (rslt, 7, 1));        
        for (var i=rslt.length-1; i>=0; i--){
          if (rslt[i].report_type == "SentinelWarning"){
            var found = false;
            for (var j=0; j<Data.msgsTower.length; j++) {
              if (Data.msgsTower[j].id == rslt[i].id) {
                found = true;
                break;
              }
            }
            if (!found) t.readList.push (rslt[i].id);
          }
        }
        clearTimeout (t.fetchTimer);
        if (t.readList.length > 0) t.fetchTimer = setTimeout (t.fetchNext, 2000);
      }
    });
  },  

  fetchNext : function (){
    var t = Tabs.Tower;
    var id = t.readList[0];
    if (!id) {
      logit ('t.readList BAD MESSAGE ID:\n'+ inspect (t.readList, 8, 1));
      return;
    }
    clearTimeout (t.fetchTimer);
    Ajax.messageDetail (id, function (rslt){
      var t = Tabs.Tower;
      t.gotAlarmReport (rslt, id);
      t.readList.shift();
      if (t.readList.length > 0) t.fetchTimer = setTimeout (t.fetchNext, 2500);
    });
  },

  gotAlarmReport : function (rpt, msgid){
    var msg = {id : msgid, type : 0, arrive_at : 0, alliance : '', x : 0, y : 0, troups : '', };
    var msgIndexed;
    var indmax = 4;
    var toAdd = 0;
    if (rpt.report.warnings.length > indmax) {
      msgIndexed = rpt.report.warnings[indmax-1]; 
      msg.arrive_at = getValueFromString (msgIndexed, indmax-1, 0, toAdd);
      var d = Date.parse(msg.arrive_at)/1000;
      if (parseInt(serverTime())-d >= Data.options.warningTower.delayDelete*Data.options.warningTower.unitDelete)
        return;
      indmax += 2;
    }
    if (rpt.report.warnings.length > indmax) {
      msgIndexed = rpt.report.warnings[indmax-1]; 
      msg.alliance = getValueFromString (msgIndexed, indmax-1, 0, toAdd);
      indmax++;
    }
    if (rpt.report.warnings.length > indmax) {
      if (rpt.report.warnings[indmax-1].indexOf('General') >= 0) {
        toAdd = 1;
        indmax++;
      } else
        msg.type = 1;
    }
    if (rpt.report.warnings.length > indmax) {
      msgIndexed = rpt.report.warnings[indmax-1]; 
      msg.x = getValueFromString(msgIndexed, indmax-1, 0, toAdd);
      msg.y = getValueFromString(msgIndexed, indmax-1, 1, toAdd);
      indmax++;
    }
    if (rpt.report.warnings.length > indmax) {
      msgIndexed = rpt.report.warnings[indmax-1]; 
      msg.troups = getValueFromString(msgIndexed, indmax-1, 0, toAdd);
    }
    function getValueFromString(warn, ind, value, toAdd) {
      var str = warn;
      var toSearch;
      var ritorno;
      var t = Tabs.Tower;
      if (ind == 3) toSearch = ' arrive by ';
      else if (ind == 5) toSearch = ' member of ';
      else if (ind == 6) toSearch = ' originate from ';
      else if (ind == 7) {
        if (toAdd == 1) toSearch = ' originate from ';
        else toSearch = ' include ';
      } else toSearch = ' include ';
      pos = str.indexOf(toSearch);
      if (pos < 0) {
        if (ind == 3) result = 0;
        else if (ind == 5) result = '';
        else if (ind == 6) result = -1;
        else if (ind == 7) {
          if (toAdd == 1) result = -1;
          else result = '';
        } else result = '';
        return result;
      }
      var strNew = str.substr(pos+toSearch.length);
      if (strNew.substr(strNew.length-1) == '.') strNew = strNew.substr(0, strNew.length-1);
      if (ind == 3) result = t.getTimeAlarm(strNew);
      else if (ind == 5) result = strNew;
      else if (ind == 6) result = t.getCoordXY(strNew, value);
      else if (ind == 7) {
        if (toAdd == 1) result = t.getCoordXY(strNew, value);
        else result = t.getTroups(strNew);
      } else result = t.getTroups(strNew);
      return result;
    }

    Data.msgsTower.push (msg);
    var t = Tabs.Tower;
    t._addTab (msg, false);
  },

  getTroups : function (str) {
    var result = '';
    var pos;
    var splitRes = str.split(", ");
    for (var i=splitRes.length-1; i>=0; i--) {
      pos = splitRes[i].indexOf(' ');
      if (pos < 0) splitRes.splice(i,1);
      else splitRes[i] = nombreFormate(splitRes[i].substr(0,pos),' ') + ' ' + translate ( splitRes[i].substr(pos+1) ); 
    }
    if (splitRes.length>0) result = splitRes.join(', ');
    return result;
  },
  
  getTimeAlarm : function (str) {
    var result = 0;
    if (str.length>=19) {
      var year;
      var month;
      var day;
      var hours;
      var minutes;
      var seconds;
      year = parseInt(str.substr(0,4));
      month = parseInt(str.substr(5,2));
      if (month == 0) month = parseInt(str.substr(6,1));
      day = parseInt(str.substr(8,2));
      if (day == 0) day = parseInt(str.substr(9,1));
      hours = parseInt(str.substr(11,2));
      if (hours == 0) hours = parseInt(str.substr(12,1));
      minutes = parseInt(str.substr(14,2));
      if (minutes == 0) minutes = parseInt(str.substr(15,1));
      seconds = parseInt(str.substr(17,2));
      if (seconds == 0) seconds = parseInt(str.substr(18,1));
      result = new Date(Date.UTC(year, month-1, day, hours, minutes, seconds));
    }
    return result;
  },

  getCoordXY : function (str, value) {
    var pos;
    var result = -1;
    pos = str.indexOf('/');
    if (pos >= 0) result = (value == 0 ? parseInt(str.substr(0, pos)) : parseInt(str.substr(pos+1)));
    return result;
  },

  togOpt : function (checkboxId, optionVar, callEnable, callIsAvailable){
    var t = Tabs.Tower;
    var checkbox = document.getElementById(checkboxId);
    if (callIsAvailable && callIsAvailable() == false){
      checkbox.disabled = true;
      return;
    }
    if (optionVar) checkbox.checked = true;
    checkbox.addEventListener ('change', new eventToggle(checkboxId, optionVar, callEnable).handler, false);
    function eventToggle (checkboxId, optionVar, callOnChange){
      this.handler = handler;
      var optVar = optionVar;
      var callback = callOnChange;
      function handler(event){
        optVar = this.checked;
        if (callback != null)
          callback (this.checked);
      }
    }
  },

  playSound : function (doRepeats){
    var t = Tabs.Tower;
    document.getElementById(towerPrefix + 'Stop').disabled = false;
    clearTimeout (soundStopTimer);
    clearTimeout (soundRepeatTimer);
    simpleSoundPlayer.addPlayer('pbSwfPlayer', Data.options.warningTower.soundUrl);
    soundStopTimer = setTimeout (t.stopSound, Data.options.warningTower.playLength*1000);
    if (doRepeats && Data.options.warningTower.repeat)
      soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Data.options.warningTower.repeatDelay*60000);
  },

  stopSound : function (){
    var t = Tabs.Tower;
    simpleSoundPlayer.removePlayer('pbSwfPlayer');
    clearTimeout (soundStopTimer);
    clearTimeout (soundRepeatTimer);
    document.getElementById(towerPrefix + 'Stop').disabled = true;
  },
}
//*********************************** Tower Tab *********************************************

//*********************************** Options Tab *********************************************
Tabs.Options = {
  tabOrder       : OPTIONS_TAB_ORDER,
  tabLabel       : kOpts,
  tabDisabled	 : !ENABLE_OPTIONS_TAB,
  cont           : null,
  readMsgsTimer  : null,
  readPagesTimer : null,
  pagesMessages  : 0,
  pageReading    : 0,
  readList       : [],
  idsToDelete    : [],
  year           : [],
  month          : [],
  day            : [],
  msDate         : [],
  cat            : '',

  init : function (div){
    var t = Tabs.Options;
    t.cont = div;

    var now = new Date();
    t.year[0] = 2010;
    t.month[0] = 10;
    t.day[0] = 1;
    t.year[1] = now.getFullYear();
    t.month[1] = now.getMonth()+1;
    t.day[1] = now.getDate();
    t.msDate[0] = 0;
    t.msDate[1] = 0;

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
        m = '<DIV class=' + idTitle + ' style="margin-bottom:10px">'+ kOptions +'</div><TABLE class=' + idTab + '>\
             <TR valign=top><TD colspan=4><B>' + kGameOptions + ': </B></TD></TR>\
             <TR><TD><INPUT id=' + optionPrefix + 'ACol type=checkbox /></TD><TD>'+ kAutoCollectAt +':</TD><TD align=center><INPUT id=' + optionPrefix + 'AColTime size=1 maxlength=2 type=text value="'+ Data.options.autoCollect.delay +'" /></TD><TD>\
             <SELECT id=' + optionPrefix + 'AColUnit size=1>\
             <OPTION value=1 '+selected[1]+'>' + kConfS + '(s)</OPTION>\
             <OPTION value=60 '+selected[2]+'>' + kConfM + '(s)</OPTION>\
             <OPTION value=3600 '+selected[3]+'>' + kConfH + '(s)</OPTION>\
             <OPTION value=86400 '+selected[4]+'>' + kConfD + '(s)</OPTION>\
             </SELECT></TD></TR>\
             <TR valign=top><TD colspan=4><BR><B>' + kScriptOptions + ': </B></TD></TR>\
             <TR valign=top><TD><INPUT id=' + optionPrefix + 'WinMove type=checkbox /></TD><TD colspan=3>'+ kEnableDrag +'</TD></TR>\
             <TR valign=top><TD><INPUT id=' + optionPrefix + 'Verbose type=checkbox /></TD><TD colspan=3>'+ kEnableVerbose +'</TD></TR>\
             <TR valign=top><TD colspan=4><BR><B>'+ kFeatures +':</B></TD></TR>\
             <TR><TD><INPUT id=' + optionPrefix + 'ARef type=checkbox /></TD><TD colspan=3>'+ kAutoRefreshInfo +':</TD></TR><TR><TD colspan=4> &nbsp </TD></TR>\
             <TR valign=top><TD colspan=2><INPUT id=' + optionPrefix + 'Refresh class=' + idGreenButton + ' type=submit value=' + kRefresh + ' /></TD>\
                            <TD colspan=2><INPUT id=' + optionPrefix + 'Manifest class=' + idGreenButton + ' type=submit value=' + kRefreshManifest + ' /></TD></TR>\
             <TR valign=top><TD colspan=4><BR><B>'+ kTabs +':</B></TD></TR><BR>\
             <TR><TD><INPUT id=' + optionPrefix + 'TWave type=checkbox /></TD><TD colspan=3>'+ kOptTabWave +'</TD></TR>\
             <TR><TD><INPUT id=' + optionPrefix + 'TMulti type=checkbox /></TD><TD colspan=3>'+ kOptTabMulti +'</TD></TR>\
             <TR><TD><INPUT id=' + optionPrefix + 'TSpy type=checkbox /></TD><TD colspan=3>'+ kOptTabSpy +'</TD></TR>\
             <TR><TD><INPUT id=' + optionPrefix + 'TSearch type=checkbox /></TD><TD colspan=3>'+ kOptTabSearch +'</TD></TR>\
             <TR><TD><INPUT id=' + optionPrefix + 'TBattle type=checkbox /></TD><TD colspan=3>'+ kOptTabBattle +'</TD></TR>\
             <TR><TD><INPUT id=' + optionPrefix + 'TAlliance type=checkbox /></TD><TD colspan=3>'+ kOptTabAlliance +'</TD></TR>\
             <TR><TD><INPUT id=' + optionPrefix + 'TLog type=checkbox /></TD><TD colspan=3>'+ kOptTabLog +'</TD></TR>\
             </TABLE><BR><BR>';

        // Message deletion part
        m += '<DIV class=' + idTitle + ' style="margin-bottom:10px">'+ kInfoDelMsg +'</div><BR><TABLE class=' + idTab + '>\
              <TR valign=top><TD><B>' + kInfoDelMsgType + '</B></td><TD>\
              <SELECT id=' + infoPrefix + 'TypD size=1>\
                <OPTION value=0 '+(Data.options.MsgDelete.type==MESSAGES_ALL ? 'selected' : '')+'>' + kInfoDelTypeAll + '</option>\
                <OPTION value=1 '+(Data.options.MsgDelete.type==MESSAGES_ONLY ? 'selected' : '')+'>' + kInfoDelTypeMsg + '</option>\
                <OPTION value=2 '+(Data.options.MsgDelete.type==REPORTS_ONLY ? 'selected' : '')+'>' + kInfoDelTypeRpt + '</option>\
              </select></td></tr>\
              <TR valign=top><TD colspan=2><BR><B><I>' + kInfoDelTypeMsg + ' :</i></B></td></tr>\
              <TR><TD><INPUT id=' + infoPrefix + 'MsgG type=checkbox'+(Data.options.MsgDelete.msgGame?' CHECKED ':'')+' />' + kInfoMsgGame + '</td>\
              <TD><INPUT id=' + infoPrefix + 'MsgP type=checkbox'+(Data.options.MsgDelete.msgPlayer?' CHECKED ':'')+' />' + kInfoMsgPlyr + '</td></tr>\
              <TR><TD><INPUT id=' + infoPrefix + 'MsgS type=checkbox'+(Data.options.MsgDelete.msgSentinel?' CHECKED ':'')+' />' + kInfoMsgAlert + '</td>\
              <TD><INPUT id=' + infoPrefix + 'MsgA type=checkbox'+(Data.options.MsgDelete.msgAlliance?' CHECKED ':'')+' />' + kInfoMsgAlli + '</td></tr>\
              <TR valign=top><TD colspan=2><BR><B><I>' + kInfoDelTypeRpt + ' :</i></B></td></tr>\
              <TR><TD><INPUT id=' + infoPrefix + 'RepA type=checkbox'+(Data.options.MsgDelete.rptAnthropus?' CHECKED ':'')+' />' + kInfoRptCamp + '</td>\
              <TD><INPUT id=' + infoPrefix + 'RepT type=checkbox'+(Data.options.MsgDelete.rptTransport?' CHECKED ':'')+' />' + kInfoRptTrans + '</td></tr>\
              <TR><TD><INPUT id=' + infoPrefix + 'RepS type=checkbox'+(Data.options.MsgDelete.rptSpy?' CHECKED ':'')+' />' + kInfoRptSpy + '</td>\
              <TD><INPUT id=' + infoPrefix + 'RepB type=checkbox'+(Data.options.MsgDelete.rptBattle?' CHECKED ':'')+' />' + kInfoRptBattle + '</td></tr>\
              <TR><TD colspan=2><INPUT id=' + infoPrefix + 'RepF type=checkbox'+(Data.options.MsgDelete.rptReinforcement?' CHECKED ':'')+' />' + kInfoRptReinf + '</td></tr>\
              <TR valign=top><TD colspan=2><BR><B><I>' + kInfoExcept + ' :</i></B></td></tr>\
              <TR><TD colspan=2><INPUT id=' + infoPrefix + 'ExcM type=checkbox'+(Data.options.MsgDelete.rptExceptMyAttacks?' CHECKED ':'')+' />' + kInfoKeepMsgA + '</td></tr>\
              <TR><TD colspan=2><INPUT id=' + infoPrefix + 'ExcY type=checkbox'+(Data.options.MsgDelete.rptExceptYourAttacks?' CHECKED ':'')+' />' + kInfoKeepMsgD + '</td></tr>\
              <TR valign=top><TD><BR><B><I>' + kInfoDateRange + ':</i></B>&nbsp &nbsp<INPUT id=' + infoPrefix + 'ChkD type=checkbox'+(Data.options.MsgDelete.dateAll?' CHECKED ':'')+' />' + kInfoDateAll + '</td></tr>\
              <TR>';
        for (var type=0; type<2; type++) {
          m += '<TD>' + (type == 0 ? kInfoDateFrom : kInfoDateTo) +' : ';
          m += '<SELECT id=' + infoPrefix + 'DD' + type + ' size=1>';
          for (var i=1; i<32; i++)
            m += '<OPTION value=' + i + (i == t.day[type] ? ' selected' : '') + '>' + (i < 10 ? '0' : '') + i + '</option>';
          m += '</select>';
          m += '<SELECT id=' + infoPrefix + 'DM' + type + ' size=1>';
          for (var i=1; i<13; i++)
            m += '<OPTION value=' + i + (i == t.month[type] ? ' selected' : '') + '>' + (i < 10 ? '0' : '') + i + '</option>';
          m += '</select>';
          m += '<SELECT id=' + infoPrefix + 'DY' + type + ' size=1>';
          for (var i=2010; i<t.year[1]+1; i++)
            m += '<OPTION value=' + i + (i == t.year[type] ? ' selected' : '') + '>' + i + '</option>';
          m += '</select></td>';
        }
        m += '</tr>\
              <TR><TD colspan=2><BR><INPUT id=' + infoPrefix + 'ButDel class=' + idGreenButton + ' type=submit value="' + kInfoDelNow + '" /></td></tr>\
              </table><BR><DIV id=' + infoPrefix + 'DelFB></div><HR>'; // Delete procedure Feedback
        // End Message deletion part

        t.cont.innerHTML = m;
        t.togOpt (optionPrefix + 'WinMove', Data.options.popUp.drag, mainPop.setEnableDrag);
        t.togOpt (optionPrefix + 'ACol', Data.options.autoCollect.enabled, AutoCollect.setEnable);
        t.togOpt (optionPrefix + 'Verbose', Data.options.verboseLog.enabled, VerboseLog.setEnable);
        document.getElementById(optionPrefix + 'Refresh').addEventListener ('click', t.refreshClicked, false);
        document.getElementById(optionPrefix + 'Manifest').addEventListener ('click', t.refreshManifest, false);

        // Jawz - Added checkboxes to allow end user to enable/disable tabs
        t.togOpt (optionPrefix + 'ARef', Data.options.autoRefreshInfo, t.setEnableRefresh);
        t.togOpt (optionPrefix + 'TWave', Data.options.wavetab, t.setEnableTab);
        t.togOpt (optionPrefix + 'TMulti', Data.options.multitab, t.setEnableTab);
        t.togOpt (optionPrefix + 'TSpy', Data.options.spytab, t.setEnableTab);
        t.togOpt (optionPrefix + 'TSearch', Data.options.searchtab, t.setEnableTab);
        t.togOpt (optionPrefix + 'TBattle', Data.options.battletab, t.setEnableTab);
        t.togOpt (optionPrefix + 'TAlliance', Data.options.alliancetab, t.setEnableTab);
        t.togOpt (optionPrefix + 'TLog', Data.options.logtab, t.setEnableTab);
        // End Jawz - Added checkboxes to allow end user to enable/disable tabs

        document.getElementById(optionPrefix + 'AColTime').addEventListener ('change', t.timeChanged, false);
        document.getElementById(optionPrefix + 'AColUnit').addEventListener ('change', t.unitChanged, false);

        // Message deletion fields listeners
        document.getElementById(infoPrefix + 'TypD').addEventListener ('change', ctlChanged, false);
        document.getElementById(infoPrefix + 'MsgG').addEventListener ('click', function(e){Data.options.MsgDelete.msgGame=e.target.checked}, false);
        document.getElementById(infoPrefix + 'MsgP').addEventListener ('click', function(e){Data.options.MsgDelete.msgPlayer=e.target.checked}, false);
        document.getElementById(infoPrefix + 'MsgS').addEventListener ('click', function(e){Data.options.MsgDelete.msgSentinel=e.target.checked}, false);
        document.getElementById(infoPrefix + 'MsgA').addEventListener ('click', function(e){Data.options.MsgDelete.msgAlliance=e.target.checked}, false);
        document.getElementById(infoPrefix + 'RepA').addEventListener ('click', function(e){Data.options.MsgDelete.rptAnthropus=e.target.checked}, false);
        document.getElementById(infoPrefix + 'RepT').addEventListener ('click', function(e){Data.options.MsgDelete.rptTransport=e.target.checked}, false);
        document.getElementById(infoPrefix + 'RepS').addEventListener ('click', function(e){Data.options.MsgDelete.rptSpy=e.target.checked}, false);
        document.getElementById(infoPrefix + 'RepB').addEventListener ('click', function(e){Data.options.MsgDelete.rptBattle=e.target.checked}, false);
        document.getElementById(infoPrefix + 'RepF').addEventListener ('click', function(e){Data.options.MsgDelete.rptReinforcement=e.target.checked}, false);
        document.getElementById(infoPrefix + 'ExcM').addEventListener ('click', function(e){Data.options.MsgDelete.rptExceptMyAttacks=e.target.checked}, false);
        document.getElementById(infoPrefix + 'ExcY').addEventListener ('click', function(e){Data.options.MsgDelete.rptExceptYourAttacks=e.target.checked}, false);
        document.getElementById(infoPrefix + 'ChkD').addEventListener ('click', function(e){Data.options.MsgDelete.dateAll=e.target.checked; disableDates();}, false);
        document.getElementById(infoPrefix + 'MsgG').addEventListener ('change', function(e){Data.options.MsgDelete.msgGame=e.target.checked}, false);
        document.getElementById(infoPrefix + 'MsgP').addEventListener ('change', function(e){Data.options.MsgDelete.msgPlayer=e.target.checked}, false);
        document.getElementById(infoPrefix + 'MsgS').addEventListener ('change', function(e){Data.options.MsgDelete.msgSentinel=e.target.checked}, false);
        document.getElementById(infoPrefix + 'MsgA').addEventListener ('change', function(e){Data.options.MsgDelete.msgAlliance=e.target.checked}, false);
        document.getElementById(infoPrefix + 'RepA').addEventListener ('change', function(e){Data.options.MsgDelete.rptAnthropus=e.target.checked}, false);
        document.getElementById(infoPrefix + 'RepT').addEventListener ('change', function(e){Data.options.MsgDelete.rptTransport=e.target.checked}, false);
        document.getElementById(infoPrefix + 'RepS').addEventListener ('change', function(e){Data.options.MsgDelete.rptSpy=e.target.checked}, false);
        document.getElementById(infoPrefix + 'RepB').addEventListener ('change', function(e){Data.options.MsgDelete.rptBattle=e.target.checked}, false);
        document.getElementById(infoPrefix + 'RepF').addEventListener ('change', function(e){Data.options.MsgDelete.rptReinforcement=e.target.checked}, false);
        document.getElementById(infoPrefix + 'ExcM').addEventListener ('change', function(e){Data.options.MsgDelete.rptExceptMyAttacks=e.target.checked}, false);
        document.getElementById(infoPrefix + 'ExcY').addEventListener ('change', function(e){Data.options.MsgDelete.rptExceptYourAttacks=e.target.checked}, false);
        document.getElementById(infoPrefix + 'ChkD').addEventListener ('change', function(e){Data.options.MsgDelete.dateAll=e.target.checked; disableDates();}, false);
        for (var type=0; type<2; type++)
        {
          document.getElementById(infoPrefix + 'DD'+type).addEventListener ('change', ctlChanged, false);
          document.getElementById(infoPrefix + 'DM'+type).addEventListener ('change', ctlChanged, false);
          document.getElementById(infoPrefix + 'DY'+type).addEventListener ('change', ctlChanged, false);
          disableCheckMsgsRpts(false);
          disableDates();
        }
        document.getElementById(infoPrefix + 'ButDel').addEventListener ('click', t.beforeDeleteReport, false);
        // End Message deletion fields listeners
      } catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }

      function ctlChanged (e){
        var t = Tabs.Options;
        var elem = document.getElementById(e.target.id);
        var value = parseIntZero (elem.value);
        elem.value = value;
        if (e.target.id==infoPrefix + 'TypD') {
          Data.options.MsgDelete.type = value;
          disableCheckMsgsRpts(true);
        } else {
          for (var type=0; type<2; type++) {
            if (e.target.id==infoPrefix + 'DD'+type) t.day[type] = value;
            else if (e.target.id==infoPrefix + 'DM'+type) t.month[type] = value;
            else if (e.target.id==infoPrefix + 'DY'+type) t.year[type] = value;
          }
        }
      }
      function disableDates() {
        for (var type=0; type<2; type++) {
          document.getElementById(infoPrefix + 'DD'+type).disabled = Data.options.MsgDelete.dateAll;
          document.getElementById(infoPrefix + 'DM'+type).disabled = Data.options.MsgDelete.dateAll;
          document.getElementById(infoPrefix + 'DY'+type).disabled = Data.options.MsgDelete.dateAll;
        }
      }
      function disableCheckMsgsRpts(byCtl) {
        disableCheckMessages(false);
        disableCheckReports(false);
        setCheckMessages((Data.options.MsgDelete.type != REPORTS_ONLY), byCtl);
        setCheckReports ((Data.options.MsgDelete.type != MESSAGES_ONLY), byCtl);
        if (Data.options.MsgDelete.type!=MESSAGES_ALL) {
          disableCheckMessages((Data.options.MsgDelete.type == REPORTS_ONLY));
          disableCheckReports ((Data.options.MsgDelete.type == MESSAGES_ONLY));
        }
      }
      function disableCheckMessages (OnOff) {
        document.getElementById(infoPrefix + 'MsgG').disabled = OnOff;
        document.getElementById(infoPrefix + 'MsgP').disabled = OnOff;
        document.getElementById(infoPrefix + 'MsgS').disabled = OnOff;
        document.getElementById(infoPrefix + 'MsgA').disabled = OnOff;
      }
      function setCheckMessages (OnOff, byCtl) {
        document.getElementById(infoPrefix + 'MsgG').checked = OnOff;
        document.getElementById(infoPrefix + 'MsgP').checked = OnOff;
        document.getElementById(infoPrefix + 'MsgS').checked = OnOff;
        document.getElementById(infoPrefix + 'MsgA').checked = OnOff;
        if (byCtl) {
          Data.options.MsgDelete.msgGame = OnOff;
          Data.options.MsgDelete.msgPlayer = OnOff;
          Data.options.MsgDelete.msgSentinel = OnOff;
          Data.options.MsgDelete.msgAlliance = OnOff;
        }
      }
      function disableCheckReports (OnOff) {
        document.getElementById(infoPrefix + 'RepA').disabled = OnOff;
        document.getElementById(infoPrefix + 'RepT').disabled = OnOff;
        document.getElementById(infoPrefix + 'RepS').disabled = OnOff;
        document.getElementById(infoPrefix + 'RepB').disabled = OnOff;
        document.getElementById(infoPrefix + 'RepF').disabled = OnOff;
        document.getElementById(infoPrefix + 'ExcM').disabled = OnOff;
        document.getElementById(infoPrefix + 'ExcY').disabled = OnOff;
      }
      function setCheckReports (OnOff, byCtl) {
        document.getElementById(infoPrefix + 'RepA').checked = OnOff;
        document.getElementById(infoPrefix + 'RepT').checked = OnOff;
        document.getElementById(infoPrefix + 'RepS').checked = OnOff;
        document.getElementById(infoPrefix + 'RepB').checked = OnOff;
        document.getElementById(infoPrefix + 'RepF').checked = OnOff;
        document.getElementById(infoPrefix + 'ExcM').checked = OnOff;
        document.getElementById(infoPrefix + 'ExcY').checked = OnOff;
        if (byCtl) {
          Data.options.MsgDelete.rptAnthropus = OnOff;
          Data.options.MsgDelete.rptTransport = OnOff;
          Data.options.MsgDelete.rptSpy = OnOff;
          Data.options.MsgDelete.rptBattle = OnOff;
          Data.options.MsgDelete.rptReinforcement = OnOff;
          Data.options.MsgDelete.rptExceptMyAttacks = OnOff;
          Data.options.MsgDelete.rptExceptYourAttacks = OnOff;
        }
      }
    },
  
	timeChanged : function (e){
		var etime = document.getElementById(optionPrefix + 'AColTime');
		var time = parseIntZero (etime.value);
		etime.value = time;
		Data.options.autoCollect.delay = time;
	},
  
	unitChanged : function (e){
		var eunit = document.getElementById(optionPrefix + 'AColUnit');
		var unit = parseIntZero (eunit.value);
		eunit.value = unit;
		Data.options.autoCollect.unit = unit;
	},
  
	hide : function (){
	},
  
	show : function (){
	},
  
	togOpt : function (checkboxId, optionVar, callEnable, callIsAvailable){
		var t = Tabs.Options;
		var checkbox = document.getElementById(checkboxId);
		if (callIsAvailable && callIsAvailable()==false){
			checkbox.disabled = true;
			return;
		}
		if (optionVar)
			checkbox.checked = true;
		checkbox.addEventListener ('change', new eventToggle(checkboxId, optionVar, callEnable).handler, false);
		function eventToggle (checkboxId, optionVar, callOnChange){
			this.handler = handler;
			var optVar = optionVar;
			var callback = callOnChange;
			function handler(event){
				optVar = this.checked;
				if (callback != null)
					callback (this.checked);
			}
		}
	},

	refreshClicked : function () {
		var t = Tabs.Options;
		Seed.fetchSeed();  
	},

    refreshManifest : function (){
      var t = Tabs.Options;
      Seed.fetchManifest(function (rslt) {
        if (rslt.ok) {
          if (Data.options.verboseLog.enabled)
            actionLog('Manifest was successfully requested from the server');
        } else {
          if (notify)
            notify(rslt);
          return;
        }
      });
    },


  // Jawz - Added checkboxes to allow end user to enable/disable tabs
  setEnableTab : function (){
    var t = Tabs.Options;
    var cW = document.getElementById(optionPrefix + 'TWave');
    var cM = document.getElementById(optionPrefix + 'TMulti');
    var cS = document.getElementById(optionPrefix + 'TSpy');
    var cC = document.getElementById(optionPrefix + 'TSearch');
    var cB = document.getElementById(optionPrefix + 'TBattle');
    var cA = document.getElementById(optionPrefix + 'TAlliance');
    var cL = document.getElementById(optionPrefix + 'TLog');
    Data.options.wavetab = cW.checked;
    Data.options.multitab = cM.checked;
    Data.options.spytab = cS.checked;
    Data.options.searchtab = cC.checked;
    Data.options.battletab = cB.checked;
    Data.options.alliancetab = cA.checked;
    Data.options.logtab = cL.checked;
  },
  // End Jawz - Added checkboxes to allow end user to enable/disable tabs

  // Jawz - Added checkboxe to allow auto-refresh of the info tab
  setEnableRefresh : function (){
    var t = Tabs.Options;
    var cR = document.getElementById(optionPrefix + 'ARef');
    Data.options.autoRefreshInfo = cR.checked;
  },
  // End Jawz - Added checkboxes to allow end user to enable/disable tabs

  // Functions for messages deletion
  beforeDeleteReport : function () {
    var t = Tabs.Options;
    var leastOneCheck=false;
    if (Data.options.MsgDelete.type != REPORTS_ONLY)
      if (Data.options.MsgDelete.msgGame ||
          Data.options.MsgDelete.msgPlayer ||
          Data.options.MsgDelete.msgSentinel ||
          Data.options.MsgDelete.msgAlliance)
        leastOneCheck = true;
    if (!leastOneCheck && Data.options.MsgDelete.type != MESSAGES_ONLY)
      if (Data.options.MsgDelete.rptAnthropus ||
          Data.options.MsgDelete.rptTransport ||
          Data.options.MsgDelete.rptSpy ||
          Data.options.MsgDelete.rptBattle ||
          Data.options.MsgDelete.rptReinforcement)
        leastOneCheck = true;
    if (!leastOneCheck) {
      var dial = new ModalDialog (t.cont, 300, 150, '', true);
      dial.getContentDiv().innerHTML = '<B>' + kDeleteError + ' !</b>';
      return;
    }
    if (!Data.options.MsgDelete.dateAll) {
      for (type=0; type<2; type++) {
        if (!isValidDate(t.day[type],t.month[type],t.year[type])) {
          var dial = new ModalDialog (t.cont, 300, 150, '', true);
          dial.getContentDiv().innerHTML = '<B>' + kDelInvalidDate + ' "' + (type == 0 ? kInfoDateFrom : kInfoDateTo) +'" !</b>';
          return;
        }
        t.msDate[type] = Date.parse(new Date(Date.UTC(t.year[type], t.month[type]-1, t.day[type], 0, 0, 0)))/1000;
      }
      if (t.msDate[1] < t.msDate[0]) {
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = '<B>' + kDelInvalidDateRange + ' !</b>';
        return;
      }
      t.msDate[1] += 86400;
    }
    t.cat = 'all';
    if (Data.options.MsgDelete.type == MESSAGES_ONLY) t.cat = 'messages';
    else if (Data.options.MsgDelete.type == REPORTS_ONLY) t.cat = 'reports';
    var totMessages = 0;
    t.pagesMessages = 0;
    Ajax.messageList (t.cat, -1, function (rslt){
      if (rslt==null)
        return;
      var t = Tabs.Options;
      totMessages = parseIntNan(rslt);
      if (totMessages==0) return;
      else {
        t.pagesMessages = parseInt(totMessages/12);
        if (totMessages%12 != 0)
          t.pagesMessages++;
        t.readList = [];
        t.pageReading = t.pagesMessages;
        clearTimeout (t.readPagesTimer);
        t.readPagesTimer = setTimeout (t.readPages, 2000);
      }
    });
    
    function isValidDate(day, month, year) {
      var result=false;
      var daysMonth;
      if ((month < 8 && month%2 == 1) || (month > 7 && month%2 == 0)) daysMonth = 31;
      else if (month != 2) daysMonth = 30;
      else if (isLeapYear(year)) daysMonth = 29;
      else daysMonth = 28;
      if (day > 0 && day < daysMonth && month > 0 && month < 13) result=true;
      return result;
    }
    
    function isLeapYear(year) {
      var result=false;
      if (year%4 == 0) {
        result=true;
        if (year%100 == 0 && year%400 != 0) result=false;
      }
      return result;
    }
  },
  
  readPages : function () {
    var t = Tabs.Options;
    document.getElementById(infoPrefix + 'DelFB').innerHTML = '<CENTER>' + kReadPage + (t.pagesMessages + 1 - t.pageReading) + kReadPageOf + t.pagesMessages +'</center>';
    clearTimeout (t.readPagesTimer);
    Ajax.messageList (t.cat, t.pageReading, function (rslt){
      if (rslt==null) return;
      var typeMsg;
      for (var i=rslt.length-1; i>=0; i--) {
        var msgToDelete = true;
        if (rslt[i].report_type == "BattleReport") {
          typeMsg = MSG_BATTLE_REPORT;
          msgToDelete = (Data.options.MsgDelete.rptBattle || Data.options.MsgDelete.rptAnthropus);
        } else if (rslt[i].report_type == "TransportMarchReport") {
          typeMsg = TRANSPORT_MARCH_REPORT;
          msgToDelete = Data.options.MsgDelete.rptTransport;
        } else if (rslt[i].report_type == "SpyReport") {
          typeMsg = SPY_REPORT;
          msgToDelete = Data.options.MsgDelete.rptSpy;
        } else if (rslt[i].report_type == "SentinelWarning") {
          typeMsg = SENTINEL_WARNING;
          msgToDelete = Data.options.MsgDelete.msgSentinel;
        } else if (rslt[i].report_type == "ReinforcementsReport") {
          typeMsg = REINFORCEMENTS_REPORT;
          msgToDelete = Data.options.MsgDelete.rptReinforcement;
        } else if (rslt[i].report_type == "SystemMessage") {
          typeMsg = SYSTEM_MESSAGE;
          msgToDelete = Data.options.MsgDelete.msgGame;
        } else if (rslt[i].report_type == "PlayerMessage") {
          typeMsg = PLAYER_MESSAGE;
          msgToDelete = Data.options.MsgDelete.msgPlayer;
        } else if (rslt[i].report_type == "AllianceMessage") {
          typeMsg = ALLIANCE_MESSAGE;
          msgToDelete = Data.options.MsgDelete.msgAlliance;
        } else
          msgToDelete = false;
        if (msgToDelete && !Data.options.MsgDelete.dateAll)
          if (rslt[i].created_at < t.msDate[0] || rslt[i].created_at > t.msDate[1])
            msgToDelete = false;
        var index = rslt[i].id * 1000 + t.pageReading * 10 + typeMsg;
        if (msgToDelete && t.readList.indexOf(index) < 0)
          t.readList.push (index);
      }
      if (t.pageReading > 1) {
        t.pageReading--;
        t.readPagesTimer = setTimeout (t.readPages, 2000);
      } else if (t.readList.length != 0) {
        t.idsToDelete = [];
        clearTimeout (t.readMsgsTimer);
        t.readMsgsTimer = setTimeout (t.readMsgs, 2000);
      } else
        document.getElementById(infoPrefix + 'DelFB').innerHTML = '';
    });
  },

  readMsgs : function () {
    var t = Tabs.Options;
    var index = t.readList[0];
    document.getElementById(infoPrefix + 'DelFB').innerHTML = '<CENTER>' + kMsgDelInProgress + '</center>';
    if (!index) {
      if (t.idsToDelete.length > 0) {
        Ajax.messageDelete (t.idsToDelete);
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = '<B>Je ne sais pas trop ce qu\'il doit y avoir comme message ici... !</b>';
        t.idsToDelete = [];
        document.getElementById(infoPrefix + 'DelFB').innerHTML = '';
      }
      logit ('t.readList BAD MESSAGE ID:\n'+ inspect (t.readList, 8, 1));
      return;
    }
    id = parseInt(index/1000);
    var typeMsg = index%10;    
    clearTimeout (t.readMsgsTimer);
    Ajax.messageDetail (id, function (rslt){
      var msgToDelete=true;
      if (typeMsg == MSG_BATTLE_REPORT) {
        if (Data.options.MsgDelete.rptBattle) {
          msgToDelete = rslt.report.sanctuary;
          if (msgToDelete && (
              (Data.options.MsgDelete.rptExceptMyAttacks && rpt.report.attacker.name == Seed.s.name) ||
              (Data.options.MsgDelete.rptExceptYourAttacks && rpt.report.attacker.name != Seed.s.name)))
            msgToDelete = false;
        }
        else if (Data.options.MsgDelete.rptAnthropus)
          msgToDelete = !rslt.report.sanctuary;
      }
      if (msgToDelete) {
        if (t.idsToDelete.length > 11) {
          Ajax.messageDelete (t.idsToDelete);
          t.idsToDelete = [];
        }
        t.idsToDelete.push (id);
      }
      t.readList.shift();
      if (t.readList.length > 0)
        t.readMsgsTimer = setTimeout (t.readMsgs, 2500);
      else {
        if (t.idsToDelete.length > 0) {
          Ajax.messageDelete (t.idsToDelete);
          t.idsToDelete = [];
        }
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = '<B>' + kMsgDelDone + ' !</b>';
        document.getElementById(infoPrefix + 'DelFB').innerHTML = '';
      }
    });
  },
  // End Functions for messages deletion

}
//*********************************** Options Tab *********************************************

function marchTable (myId){
  var m = '<TABLE class=' + idTab + '>';
  var now = serverTime();
  for (var p in Seed.marches){
    var march = Seed.marches[p];
    var time = march.run_at - now;
    var mtClass=idMarchOther;
    if (march.ownerId == myId)
      mtClass = idMarchMine;
    if (time < 0)
      time = '?';
    else if (isNaN (time))
      time = '---';
    else
      time = timestr(time, true);
    var xTarget = march.target.substring(0,4);
    if (xTarget == 'City') {
      xTarget = translate(march.target.substring(0,4)) +' '+ march.target.substring(4);
    } else {
      xTarget = translate(march.target);
    }
    var isYoyo = checkInRecallList(p);
//kAttack1
    m += '<TR class='+ mtClass +'><TD>'+ translate(march.march_type) + ' ' + march.x +','+ march.y +'</td><TD>('+ xTarget +'-'+ march.terrain_level +')</td><TD>'+ translate(march.status) +'<TD>'+ time + isYoyo +'</td></tr>';
  }
  return m +'</table>';
}

function checkInRecallList (id){
  var found = false;
  for (var m=0; m<Data.recallMarches.length && !found; m++)
    if (Data.recallMarches[m] != null && Data.recallMarches[m] != undefined && Data.recallMarches[m])
      if (Data.recallMarches[m].marchId != null && Data.recallMarches[m].marchId == id)
        found = true;
  if (found) return ' (Yoyo)';
  else return '';
}

function trainTable (myId){
//  var m = '<TABLE class=' + idTab + '>';
  var m = '<TABLE class=' + idTabPad + '>';
  var now = serverTime();
//  var mtClass = idMarchMine;

  for (var c=0; c<Seed.cities.length; c++){
    var jobs = Seed.cities[c].jobs;
    var last = serverTime();
    var trains = [];
    m += '<TR><TD class=' + idTabLeft + '2 width=20%>'+ Seed.cities[c].name +'</TD>';
    for (var j=0; j<jobs.length; j++)
      if (jobs[j].queue=='units' && jobs[j].unit_type) trains.push (jobs[j]);
    if (trains.length == 0)
      m += '<TD>' + kIdle + '</td></tr>';
    else {
      for (var j=0; j<trains.length; j++){
        var time = trains[j].run_at - last;
        if (time < 0) time = '?';
        else if (isNaN (time)) time = '---';
        else time = timestr(time, true);

//        var left='<TR class='+ mtClass +'><TD> &nbsp </TD>', tot='';
        var left='<TR><TD> &nbsp </TD>', tot='';
        if (j==0)
          left = ' ';
        else if (j==trains.length-1)
          tot = ' &nbsp <B>('+ timestrShort(trains[j].run_at-now) +')</b>';
        m += left + '<TD width=40%>' + nombreFormate(trains[j].quantity,' ') +' '+ translate(trains[j].unit_type) +' </td><TD width=40%> '+ time + tot +'</TD></TR>';
        last = trains[j].run_at;
      }   
    }
  }
  return m + '</table>';
}

function getAvailableDragon () {
  var GrDItems    = ['GreatDragonBodyArmor', 'GreatDragonHelmet', 'GreatDragonTailGuard', 'GreatDragonClawGuards'];
  var WaDItems    = ['WaterDragonBodyArmor', 'WaterDragonHelmet', 'WaterDragonTailGuard', 'WaterDragonClawGuards'];
  var StDItems    = ['StoneDragonBodyArmor', 'StoneDragonHelmet', 'StoneDragonTailGuard', 'StoneDragonClawGuards'];
  var FiDItems    = ['FireDragonBodyArmor', 'FireDragonHelmet', 'FireDragonTailGuard', 'FireDragonClawGuards'];
  var WiDItems    = ['WindDragonBodyArmor', 'WindDragonHelmet', 'WindDragonTailGuard', 'WindDragonClawGuards'];
  var found = false;
  var curAerialCombat = isEmpty(Seed.s.research['AerialCombat'],0);
  if (!curAerialCombat || curAerialCombat == 0) return null;
  for (var i=0; i<Names.troops.names.length && !found; i++){
    var curDrag;
    var curName = '';
    var curLife = 0;
    var maxLife = 0;
    var isInCity = 0;
    var readyForBattle = false;
    var num = 0;
    var name = Names.troops.names[i][1];
    switch (name) {
      case 'GreatDragon' :
        curDrag = Seed.cities[0].great_dragon;
        curName = name;
        for (item=0; item<GrDItems.length; item++){
          num += isEmpty(Seed.s.items[GrDItems[item]],0);
        }
        if (num == 4) readyForBattle = true;
        break;
      case 'WaterDragon' :
        curDrag = Seed.cities[1].water_dragon;
        curName = name;
        for (item=0; item<WaDItems.length; item++){
          num += isEmpty(Seed.s.items[WaDItems[item]],0);
        }
        if (num == 4) readyForBattle = true;
        break;
      case 'StoneDragon' :
        curDrag = Seed.cities[2].stone_dragon;
        curName = name;
        for (item=0; item<StDItems.length; item++){
          num += isEmpty(Seed.s.items[StDItems[item]],0);
        }
        if (num == 4) readyForBattle = true;
        break;
      case 'FireDragon' :
        curDrag = Seed.cities[3].fire_dragon;
        curName = name;
        for (item=0; item<FiDItems.length; item++){
          num += isEmpty(Seed.s.items[FiDItems[item]],0);
        }
        if (num == 4) readyForBattle = true;
        break;
      case 'WindDragon' :
        curDrag = Seed.cities[4].wind_dragon;
        for (item=0; item<WiDItems.length; item++){
          num += isEmpty(Seed.s.items[WiDItems[item]],0);
        }
        if (num == 4) readyForBattle = true;
        curName = name;
        break;
      default :
        curDrag = undefined;
        curName = '';
        break
    }
    if (curDrag) {
      curLife  = curDrag.life;
      maxLife  = curDrag.maximum_life;
      isInCity = curDrag.is_in_city;
      if (curLife == maxLife && isInCity && readyForBattle) {
        found = true;
      }
    }
  }
  if (found)
    return curName;
  else
    return null;
}

function getAvailableGeneral (){
  for (var p in Seed.generals)
    if (!Seed.generals[p].busy)
      return Seed.generals[p];
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
function getMusterPointMaxTroops(cityIdx){
  var lvl = Buildings.getLevel (cityIdx, 'MusterPoint');
  if (!lvl) return 0;
  else
    switch (lvl) {
      case 11 : var maxLvl = 120000; break;
      case 12 : var maxLvl = 140000; break;
      default : var maxLvl = lvl * 10000;
    }
  return maxLvl;
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
function getBuildingJob (cityIdx){
  var cid = Seed.cities[cityIdx].id;
  for (var p in Seed.jobs[cid]){
    var job = Seed.jobs[cid][p];
    if (job.queue == 'building')
      return ({job:job, building:Buildings.getById(cityIdx, job.city_building_id)});
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
function getDragonJob (cityIdx){
  var cid = Seed.cities[cityIdx].id;
  for (var p in Seed.jobs[cid]){
    var job = Seed.jobs[cid][p];
    if (job.queue == 'dragon')
      return (job);
  }
  return null;
}
function getOutpostJob (cityIdx){
  var cid = Seed.cities[cityIdx].id;
  for (var p in Seed.jobs[cid]){
    var job = Seed.jobs[cid][p];
    if (job.queue == 'outpost')
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
    } else 
      newObj[i] = src[i];
  } 
  return newObj;
};


// Jawz - Added function to call a popup in order to display version history or whatever we want
function aboutJawz () {
  var stTitle = 'font-weight:bold;font-size:15px;text-align:center; color:#ffffff;';
  var stText = 'color:#000000';
//  class=textsmall

  var m = '<TABLE width=100%><TR><TD align=center style="' + stTitle + '">' + kDOAVersionString + ' :<BR></td></tr>\
           <TR><TD><BR><DIV align=left style="' + stText + '">\
           This mod was applied to the latest version by <B>Runey</B> of the DOA Power Tools Plus - June 27, 2011 (20110627b)<BR>\
           Original version by <B>George Jetson</B> - May 31, 2011 (20110531a)<BR>\
           <BR>\
           Many thanks to George Jetson, Wham and Runey for their hard & hudge work.<BR>\
           <BR>\
           <B>Modifications done :</B><BR>\
           - Added a <B>"multi" tab</B> : Allow to attack one target with a first attack that will break all the defense, followed by as many secondary waves as possible.\
           This was done in order to facilitate any object search (eggs, armors, ...)<BR>\
           <BR>\
           - Added a <B>"Spy" tab</B> : Allow to launch spies by waves on a single target. The goal of this is to rot the mailbox of your target.\
           To use only when absolutely necessary in order to avoid server overloading !!<BR>\
           <BR>\
           - Added a <B>"Search" tab</B> : Allow to look at all cities and wildernesses around your city. Map scan is done around the coodinates X, Y entered, with a distance max set by the max radius (from 1 to 75).\
           Any cities and wildernesses within this distance are retrieved.<BR>\
           For player cities, you just have to select an alliance name to display all members found (alliance "*" will display all players, " " will display all players without alliance).<BR>\
           For wildernesses, select the types, level min and max, and if you want all or only the unowned wildernesses.<BR>\
           <BR>\
           - Added <B>wall defense setting</B> in the information tab (if troups are hidden or not).<BR>\
           <BR>\
           - Added a <B>reload DOA button</B> in the information tab (allow to refresh DOA in one click).<BR>\
           <BR>\
           - Modified building tab presentation for the city and outposts building lists : From 2 to 3 columns in anticipation of the new outposts.<BR>\
           <BR>\
           - Added checkboxes in config tab in order to allow end users to enable/disable tabs.<BR>\
           <BR>\
           - Added french translations.<BR>\
           <BR>\
           - Some minor change in script appearance.<BR></div></TD></TR></TABLE>\
           <BR><BR><DIV align=right>Your devoted, <B>Jawz</B></DIV>';

  var popId = "AboutJawz";
  var pop = new CPopup (popId, 0, 0, 470, 720, true);
  pop.centerMe (mainPop.getMainDiv());
  pop.getMainDiv().innerHTML = m;
  pop.getTopDiv().innerHTML = '<CENTER><B>'+ kDOAVersionString + ' - ' + kAbout + '</b></center>';
  pop.show (true);
};
// End Jawz - Added function to call a popup in order to display version history or whatever we want

var Names = {
  troops : {
    'names' : [
    [0, 'Porter','Porter'],
    [1, 'Conscript', 'Conscr'],
    [2, 'Spy', 'Spy'],
    [3, 'Halberdsman', 'Halbrd'],
    [4, 'Minotaur', 'Mino'],
    [5, 'Longbowman', 'LBM'],
    [6, 'SwiftStrikeDragon', 'SSDrg'],
    [7, 'BattleDragon', 'BatDrg'],
    [8, 'ArmoredTransport', 'ATrans'],
    [9, 'Giant', 'Giant'],
    [10, 'FireMirror', 'FireM'],
    [11, 'AquaTroop', 'Fang'],
    [12, 'StoneTroop', 'Ogre'],
    [13, 'FireTroop', 'Saurien'],
    [14, 'GreatDragon', 'GrtDrg'],
    [15, 'WaterDragon', 'WatDrg'],
    [16, 'StoneDragon', 'StnDrg'],
    [17, 'FireDragon', 'FirDrg'],
    [18, 'WindDragon', 'WinDrg'],
    [19, 'WindTroop', 'Banshee']
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
    [100, 'GreatDragonBodyArmor', 'GD Armor-1'],
    [101, 'GreatDragonHelmet', 'GD Armor-2'],
    [102, 'GreatDragonTailGuard', 'GD Armor-3'],
    [103, 'GreatDragonClawGuards', 'GD Armor-4'],
    [110, 'WaterDragonEgg', 'WaterDragonEgg'],
    [111, 'WaterDragonBodyArmor', 'WD Armor-1'],
    [112, 'WaterDragonHelmet', 'WD Armor-2'],
    [113, 'WaterDragonTailGuard', 'WD Armour-3'],
    [114, 'WaterDragonClawGuards', 'WD Armor-4'],
    [115, 'AquaTroopRespirator', 'Respirators'],
    [116, 'AquaTroopRespiratorStack100', 'Respirator-100'],
    [117, 'AquaTroopRespiratorStack500', 'Respirator-500'],
    [118, 'AquaTroopRespiratorStack1000', 'Respirator-1000'],
    [120, 'StoneDragonEgg', 'StoneDragonEgg'],
    [121, 'StoneDragonBodyArmor', 'SD Armor-1'],
    [122, 'StoneDragonHelmet', 'SD Armor-2'],
    [123, 'StoneDragonTailGuard', 'SD Armour-3'],
    [124, 'StoneDragonClawGuards', 'SD Armor-4'],
    [125, 'StoneTroopItem', 'Mandrakes'],
    [126, 'StoneTroopItemStack100', 'Mandrake-100'],
    [127, 'StoneTroopItemStack500', 'Mandrake-500'],
    [128, 'StoneTroopItemStack1000', 'Mandrake-1000'],
    [129, 'FireDragonEgg', 'FireDragonEgg'],
    [130, 'FireDragonBodyArmor', 'FD Armor-1'],
    [131, 'FireDragonHelmet', 'FD Armor-2'],
    [132, 'FireDragonTailGuard', 'FD Armour-3'],
    [133, 'FireDragonClawGuards', 'FD Armor-4'],
    [134, 'FireTroopItem', 'Runes'],
    [135, 'FireTroopItemStack100', 'Runes-100'],
    [136, 'FireTroopItemStack500', 'Runes-500'],
    [137, 'FireTroopItemStack1000', 'Runes-1000'],
    [140, 'WindDragonEgg', 'WindDragonEgg'],
    [141, 'WindDragonBodyArmor', 'WiD Armor-1'],
    [142, 'WindDragonHelmet', 'WiD Armor-2'],
    [143, 'WindDragonTailGuard', 'WiD Armour-3'],
    [144, 'WindDragonClawGuards', 'WiD Armor-4'],
    [145, 'WindTroopItem', 'Talons'],
    [146, 'WindTroopItemStack100', 'Talons-100'],
    [147, 'WindTroopItemStack500', 'Talons-500'],
    [148, 'WindTroopItemStack1000', 'Talons-1000'],
    ],
  }, 

  itemAbbr : function (name){
    var x = Names.items.byName[name]; 
    if (x)
      return x[2];
    return name.substr (0, 14);
  },
  
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


//*********************************** Debug Tab *********************************************
Tabs.Debug = {
  tabOrder : DEBUG_TAB_ORDER,
  tabLabel : 'Dbg',
  tabDisabled : !ENABLE_DEBUG_TAB,
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
      <DIV style="background-color:#eee; margin:5px"><CENTER><INPUT style="width:130px" class=' + idButAttackOn + ' id=pbdbgTMonoff type=submit value="Track Mouse Off"><BR><DIV id=pbdbgCoords>&nbsp;</div></center></div>\
      <BR>Missing Reports:<SPAN id=pbdbgMissRpt></span> &nbsp; <INPUT id=pbdbgResetMR type=submit value="RESET" \>\
      <BR><SPAN class=' + idBoldRed + '>Keep-alive is running!</span>';
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
    pop = new CPopup (idPrefix, 0,0, 1000,800, true); 
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
      e.target.className = idButAttackOff;
      t.mouseElement.removeEventListener('mousemove', t.moveHandler, true);
    } 
    else {
      e.target.value = 'Track Mouse ON'
      e.target.className = idButAttackOn;
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
//*********************************** Debug Tab *********************************************


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
  return (!n || n=='' || isNaN(n)) ? 0 : parseInt(n, 10);
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
function deleteResearchJob(job){
  var cid = Seed.cities[0].id;
  var jobs = Seed.jobs[cid];
  for (var p in jobs){
    if (jobs[p] == job)
      delete jobs[p];
  } 
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


/***
callback (datObj):
  minX
  minY
  maxX
  maxY
  done: true/false
  tiles [  {x, y, type, dist, lvl, detail{} } ]  type = A, W or C
***/

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

  scanMapCitiesCirc : function (x, y, radius, callback, doDetail){
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
    new MyAjaxRequest ('map.json', { 'user%5Fid':C.attrs.userId, x:t.firstX, y:t.firstY, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, 'dragon%5Fheart':C.attrs.dragonHeart, version:getVersion }, t.gotCities, false);
  },  

  gotCities : function (rslt){
    var t = Map;
    var x = rslt.dat.x;
    var ret = {tiles:[]}
    if (!rslt.ok){
      t.callback (null);    // error !?!
      return;
    }

    // Store ES position, type, distance, level, and owner
    for (var i=0; i<rslt.dat.terrain.length; i++){
      for (var ii=0; ii<rslt.dat.terrain[i].length; ii++){
        var tile = rslt.dat.terrain[i][ii];
        var tDist = distance (t.centerX, t.centerY, tile[2], tile[3]);
        if (tDist <= t.radius){
          var fullType = tile[0];
          if (fullType == 'Fog' || fullType == "Fog") // F = Forest or Fog
             fullType = 'Nuage';
          if (fullType == 'Bog' || fullType == "Bog") // B = Bog... I prefer Swamp :))
             fullType = 'Swamp';
          var tType = fullType.substr(0,1).toUpperCase();
//            logit ('MapCity.ESgot:\n'+ inspect (rslt.dat.terrain[i]));
//            logit ('MapCity.ESgot:\n'+ inspect (rslt.dat.terrain[i][ii]));
          if ((tType=='H') || (tType=='G') || (tType=='L') || (tType=='M') || (tType=='N') || (tType=='F') || (tType=='S') || (tType=='P')) {

            var wFound = false;
            for (var w=0; w<rslt.dat.city_wildernesses.length; w++){
              var wx = rslt.dat.city_wildernesses[w].x;
              var wy = rslt.dat.city_wildernesses[w].y;
              if ((wx == tile[2]) && (wy == tile[3])){
                wFound = true;
                var wPlyr = rslt.dat.city_wildernesses[w].player.name;
                var wMight = rslt.dat.city_wildernesses[w].player.might;
                var wAlliance = " ";
                if (rslt.dat.city_wildernesses[w].player.alliance != null)
                  wAlliance = rslt.dat.city_wildernesses[w].player.alliance.name;

                var wil = {x:tile[2], y:tile[3], dist:tDist, type:fullType, lvl:tile[1], name:wPlyr, might:wMight, alliance:wAlliance};
//logit ('wild.got:\n'+tile[2]+','+tile[3]+' ('+tDist+') : '+wPlyr+' / '+wAlliance+' ('+wMight+') - '+fullType);
                ret.tiles.push (wil);

              }
            }
            if (!wFound){
              var terr = {x:tile[2], y:tile[3], dist:tDist, type:fullType, lvl:tile[1], name:'', might:'', alliance:' '};
//  logit ('wild.got:\n'+tile[2]+','+tile[3]+' ('+tDist+') - '+fullType);
              ret.tiles.push (terr);
            }
          }
          if (tType=='A' && t.doDetail) {
             var tcamp = {x:tile[2], y:tile[3], dist:tDist, type:fullType, lvl:tile[1], name:'', might:'', alliance:' '};
//  logit ('wild.got:\n'+tile[2]+','+tile[3]+' ('+tDist+') - '+fullType);
              ret.tiles.push (tcamp);
          }
        }
      }
    }

    // Store city details
    for (var j=0; j<rslt.dat.map_cities.length; j++){

//var toto = rslt.dat.map_cities[j].player.name;
//if (toto == "Bedo 13" || toto == "Jawz"){
//logit ('MapCity.got:\n'+ inspect (rslt.dat));
//logit ('MapCity.got:\n'+ inspect (rslt.dat.map_cities[j]));
//logit ('MapCity.plyr.got:\n'+ inspect (rslt.dat.map_cities[j].player));
//logit ('MapCity.alli.got:\n'+ inspect (rslt.dat.map_cities[j].player.alliance));
      var x = rslt.dat.map_cities[j].x;
      var y = rslt.dat.map_cities[j].y;
      var dist = distance (t.centerX, t.centerY, x, y);
      var type = rslt.dat.map_cities[j].type;
      if (type == "Capital")
        type = " ";
      var levl = rslt.dat.map_cities[j].level;
      var plyr = rslt.dat.map_cities[j].player.name;
      var might = rslt.dat.map_cities[j].player.might;
      var alliance = " ";
      if (rslt.dat.map_cities[j].player.alliance != null)
        alliance = rslt.dat.map_cities[j].player.alliance.name;

      var d = {x:x, y:y, dist:dist, type:type, lvl:levl, name:plyr, might:might, alliance:alliance};
//logit ('Player.got:\n'+x+','+y+' ('+dist+') : '+plyr+' / '+alliance+' ('+might+') - '+type);
      ret.tiles.push (d);
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
    setTimeout (function(){new MyAjaxRequest ('map.json', { 'user%5Fid':C.attrs.userId, x:t.normalize(t.firstX+(t.curIX*15)), y:t.normalize(t.firstY+(t.curIY*15)), timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, 'dragon%5Fheart':C.attrs.dragonHeart, version:getVersion }, t.gotCities, false);}, MAP_DELAY);
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
  this.curtain.style.left = off.left + 'px';
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
  this.div.style.left = ((curtainDiv.clientWidth-width)/2 + off.left) + 'px';

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
    checkPoint ('tabManager.1 - init');
    for (k in Tabs){
      // Jawz - Allow disabling/enabling tabs by end users
      //logit ('tab '+k);
      //if (k == 'Waves') logit ('tab '+k+' disabled '+ ((isEmpty(Data.options.wavetab, !ENABLE_WAVE_TAB)) ? 'true' : 'false'));
      //if (k == 'Spies') logit ('tab '+k+' disabled '+ ((isEmpty(Data.options.spytab, !ENABLE_SPY_TAB)) ? 'true' : 'false'));
      //if (k == 'Multiple') logit ('tab '+k+' disabled '+ ((isEmpty(Data.options.multitab, !ENABLE_MULTI_TAB)) ? 'true' : 'false'));
      //if (k == 'Search') logit ('tab '+k+' disabled '+ ((isEmpty(Data.options.searchtab, !ENABLE_SEARCH_TAB)) ? 'true' : 'false'));
      //if (k == 'Battle') logit ('tab '+k+' disabled '+ ((isEmpty(Data.options.battletab, !ENABLE_BATTLE_TAB)) ? 'true' : 'false'));
      //if (k == 'Alliance') logit ('tab '+k+' disabled '+ ((isEmpty(Data.options.alliancetab, !ENABLE_ALLIANCE_TAB)) ? 'true' : 'false'));
      //if (k == 'ActionLog') logit ('tab '+k+' disabled '+ ((isEmpty(Data.options.logtab, !ENABLE_LOG_TAB)) ? 'true' : 'false'));
      if ((k == 'Waves'     && isEmpty(Data.options.wavetab, !ENABLE_WAVE_TAB)) ||
          (k == 'Multiple'  && isEmpty(Data.options.multitab, !ENABLE_MULTI_TAB)) ||
          (k == 'Spies'     && isEmpty(Data.options.spytab, !ENABLE_SPY_TAB)) ||
          (k == 'Search'    && isEmpty(Data.options.searchtab, !ENABLE_SEARCH_TAB)) ||
          (k == 'Battle'    && isEmpty(Data.options.battletab, !ENABLE_BATTLE_TAB)) ||
          (k == 'Alliance'  && isEmpty(Data.options.alliancetab, !ENABLE_ALLIANCE_TAB)) ||
          (k == 'ActionLog' && isEmpty(Data.options.logtab, !ENABLE_LOG_TAB)))
         Tabs[k].tabDisabled = true;
      // End Jawz - Allow disabling/enabling tabs by end users
      checkPoint ('tabManager.2 - Creating tabList for '+k);
      if (!Tabs[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs[k].tabOrder != null)
          sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        checkPoint ('tabManager.3 - CreateElement for '+k);
        t.tabList[k].div = document.createElement('div');
      }
    }

    checkPoint ('tabManager.4 - Sort');
    sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<TABLE cellspacing=0 class=' + idMainTab + '><TR>';
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id=' + idPrefix + 'tc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    m += '<TD class=spacer width=90% align=right></td></tr></table>';
    m += '<DIV id=' + idPrefix + 'SwfPlyr></div>';
    checkPoint ('tabManager.5 - getTopDiv of mainPop');
    mainPop.getTopDiv().innerHTML = m;
    checkPoint ('tabManager.6');

    var tabCount = sorter.length; // Jawz - Count of the active tabs
    t.currentTab = null;
    checkPoint ('tabManager.7 - Managing tabList');
    for (k in t.tabList) {
      if (t.tabList[k].name == Data.options.currentTab)
        t.currentTab = t.tabList[k] ;
      checkPoint ('tabManager.8 - getElementById for '+k);
      document.getElementById(idPrefix + 'tc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div; 
      div.style.display = 'none';
      div.style.height = '100%';
      checkPoint ('tabManager.9 - Set display, height for '+k);

      // Jawz - Set max width according to active tabs
//      div.style.maxWidth = '487px';  // Jawz - Set to 487 instead of 387
//      if (tabCount <= 7) {
//        div.style.maxWidth = '417px';
//      } else if (tabCount == 8) {
//        div.style.maxWidth = '467px';
//      } else {
        div.style.maxWidth = '517px';  // Jawz - Set to 517 max width instead of 387
//      }
      // End Jawz - Set max width according to active tabs

      div.style.overflowX = 'auto';
      checkPoint ('tabManager.10 - AppendChild for '+k);
      mainDiv.appendChild(div);
      try {
        checkPoint ('tabManager.11 - obj.init for '+k);
        t.tabList[k].obj.init(div);
        checkPoint ('tabManager.12 - End obj.init');
      } catch (e){
        checkPoint ('tabManager.12 - Init error : '+e);
        div.innerHTML = "INIT ERROR: "+ e;
      }
    }
    checkPoint ('tabManager.13');
    if (t.currentTab == null)
      t.currentTab = sorter[0][1];    
    checkPoint ('tabManager.14 - setTabStyle for '+ t.currentTab.name);
    t.setTabStyle (document.getElementById (idPrefix + 'tc'+ t.currentTab.name), true);
    checkPoint ('tabManager.15 - set display for '+ t.currentTab.name);
    t.currentTab.div.style.display = 'block';
    checkPoint ('tabManager.16');
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
    } else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager;
    var newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById (idPrefix + 'tc'+ newTab.name), true);
      t.setTabStyle (document.getElementById (idPrefix + 'tc'+ t.currentTab.name), false);
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
  } else {
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

function hideMe (){
  if (!Data.options.popUp.open)
    return;
  tabManager.hideTab();
}
function showMe (){
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
  var pop = new CPopup (idPrefix, 0, 0, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>' + Title + '</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptcccancel type=submit value="' + kCancel + '" \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value="' + kContinue + '" \></td></tr></table>';
  document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
  document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
  pop.show(true);
}

var rTimer;
var cdTimer;

// TODO: add 'Retry Now' button
function DialogRetry (errMsg, seconds, onRetry, onCancel){
  var secs, pop;
  
    secs = parseInt(seconds);
    pop = new CPopup (idRetry, 0, 0, 400,200, true);
    pop.centerMe(mainPop.getMainDiv());
    pop.getTopDiv().innerHTML = '<CENTER>' + Title + '</center>';
    pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>' + kErrorOccured + ':</b></font><BR><BR><DIV id=' + idRetry + 'Msg></div>\
        <BR><BR><B>' + kAutoRetry + '<SPAN id=' + idRetry + 'Secs></b></span> ' + kSeconds + ' ...<BR><BR><INPUT id=' + idRetry + 'Can type=submit value="' + kCancelRetry + '" \>';
    document.getElementById(idRetry + 'Can').addEventListener ('click', doCancel, false);
    pop.show(true);
    document.getElementById(idRetry + 'Msg').innerHTML = errMsg;
    document.getElementById(idRetry + 'Secs').innerHTML = secs;
    rTimer = setTimeout (doRetry, secs*1000);
    cdTimer = null;
    countdown ();

  function countdown (){
    document.getElementById(idRetry + 'Secs').innerHTML = secs--;
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


function implodeUrlArgs (obj){
  var a = [];
  for (var k in obj)
    a.push (k +'='+ encodeURI(obj[k]) );
  return a.join ('&');    
}
function addUrlArgs (url, args){
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
/*function MyAjaxRequest(url, params, callback, isPost) {
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
	function mySuccess(r) {
		if (r.status === 200 && r.responseText) {
			if (url.indexOf(".xml") !== -1) {
				callback({ok:true, dat:r.responseText});
			} else {
				callback({ok:true, dat:JSON.parse(r.responseText)});
			}
		} else {
			msg = 'The request was successful but no data was returned';
			callback({ok:false, errmsg:msg});
		}
	}
	function myFailure(r) {
		if (r.status > 200 && r.responseText) {
			callback({ok:false, dat:JSON.parse(r.responseText)});
		} else if (r.status > 0) {
			callback({ok:false, errmsg:r.statusText});
		} else {
			msg = 'This browser is not compatible at this time';
			callback({ok:false, errmsg:msg});
		}
	}
}
*/

function MyAjaxRequest (url, params, callback, isPost){
  var o = {onSuccess:mySuccess, onFailure:myFailure};
  var retrySecs = 3.33;
  o.parameters = {};
  for (var p in params)
    o.parameters[p] = params[p];
  //o.parameters._session_id = C.attrs.sessionId;
  if (EMULATE_NET_ERROR > 0){
    if (Math.random()*100 <= EMULATE_NET_ERROR){
//      o.parameters._session_id = 'xxx';
      setTimeout (function(){error (999, 'ERROR: Emulated')}, 1500);
      return;
    }
  }

  if (isPost)
    o.method = 'POST';
  o.timeoutSecs = 45;
  if (DEBUG_TRACE_AJAX > 0){
    WinLog.writeText ("AJAX "+ (isPost?'POST':'GET') +" : "+ C.attrs.apiServer +'/'+ url);  
    if (DEBUG_TRACE_AJAX > 1)
      WinLog.writeText ('ARGS:\n'+ inspect (o.parameters, 5, 1));
  }
  var ajax = new AjaxRequest (C.attrs.apiServer +'/'+ url, o);
  function mySuccess (r){
    if (DEBUG_TRACE_AJAX > 0){
      WinLog.writeText ("AJAX SUCCESS:");  
      if (DEBUG_TRACE_AJAX > 1)
        WinLog.writeText (inspect (r, 2, 1));
      if (DEBUG_TRACE_AJAX > 2)
        WinLog.writeText (inspect (JSON.parse(r.responseText), 8, 1));  
    }
    if (r.status == 200)
      callback ({ok:true, dat:JSON.parse(r.responseText)});
    else
      error (r.status, 'Server error: '+ r.statusText);
  }
  function myFailure (r){
    if (DEBUG_TRACE_AJAX > 0)
      WinLog.writeText ("**********  AJAX FAILURE: \n" + inspect (r, 8, 1));  
    error (r.status, r.statusText +' ('+ r.status +')');
  }
  function error (code, msg){
    if (!code || (code>=400 && code<500)){      // SHOULD BE 500!
      cancel();
      return;
    }
    retrySecs *= 1.5;
    new DialogRetry (msg, retrySecs, retry, cancel);
    function retry (){
      new MyAjaxRequest (url, params, callback, isPost);
    }
    function cancel(){
      callback ({ok:false, errmsg:msg});
    }
  }
}



// simliar to protoype's Ajax.Request ... 
// passes object to handlers: {status:, responseText:, statusText:, ajax:}
function AjaxRequest (url, opts){
  var timer = null;
  var method = 'GET';
  var ajax;
  if (IsChrome) {
	  var headers = {
		'Accept': '*/*'
	  };
  } else {
    var headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    };
  }
  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");
  if (opts.method)
    method = opts.method.toUpperCase();  
  if (method == 'POST'){
    headers['content-type'] = 'application/x-www-form-urlencoded';
  } else if (method == 'GET'){
    url = addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      clearTimeout (timer);  
      if (ajax.status >= 200 && ajax.status < 399){
        if (opts.onSuccess) opts.onSuccess({responseText:ajax.responseText, status:ajax.status, statusText:"OK", ajax:ajax});
      }else{
        if (opts.onFailure) opts.onFailure({responseText:ajax.responseText, status:ajax.status, statusText:ajax.statusText, ajax:ajax});
      }
    } else {
      if (opts.onChange) opts.onChange ({responseText:ajax.responseText, status:ajax.status, statusText:ajax.statusText, ajax:ajax});
    }
  }  
  ajax.open(method, url, true);   // always async!
  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (extTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);
  if (opts.timeoutSecs)
    timer = setTimeout (timedOut, opts.timeoutSecs*1000);
  if (method == 'POST'){
    var a = [];
    for (var k in opts.parameters)
      a.push (k +'='+ opts.parameters[k] );
    var parmStr = a.join ('&');  
    //ajax.setRequestHeader ('X-S3-AWS', SHA1("playerId" + url + parmStr + "WaterDragon5555"));
    ajax.setRequestHeader ('X-S3-AWS', SHA1("Dracunculiasis" + parmStr + "LandCrocodile" + url  + "Bevar-Asp"));
    ajax.send (parmStr);
  } else {
    ajax.send();
  }
  
  function timedOut(){
    ajax.abort();
    if (opts.onFailure) opts.onFailure({responseText:null, status:599, statusText:'Timed Out', ajax:ajax});
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
/*
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
*/
//		headers['Accept'] = '*/*';
//	} else {
//		headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
/*	}
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
	function timedOut() {
		ajax.abort();
		if (opts.onFailure) opts.onFailure({responseText:null, status:599, statusText:'Request Timed Out', ajax:ajax}); // CHECK: 599 is custom error code. See if better option exists.
	}
}
*/

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

function logit (msg){
  var serverID = getServerId();
  var now = new Date();
  console.log(serverID + ' @ ' + now.toTimeString().substring (0,8) + '.' + now.getMilliseconds() + ': ' +  msg);
}

/*********************************** Log Tab ***********************************/
Tabs.ActionLog = {
  tabOrder: LOG_TAB_ORDER,
  tabLabel : kLog,
  tabDisabled : !ENABLE_LOG_TAB,
  myDiv : null,
  logTab : null,
  maxEntries: 500,
  saveEntries: 200,
  state : null,

  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV id=' + idPrefix + 'WarnSent></div>\
       <DIV class=' + idTitle + '>ACTION LOG</div><DIV style="height:725px; max-height:725px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=' + idTabLined + '><TR><TD></td><TD width=95%></td></table></div>';
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

function actionLog (msg){
  if (!Tabs.ActionLog.tabDisabled)
    Tabs.ActionLog.log (msg);  
}

/**********************************************************************************/

function titleLine (msg){
  return '<TABLE cellpadding=0 cellspacing=0 width=100%><TR><TD width=50%><HR></td><TD>'+ msg +'</td><TD width=50%><HR></td></tr></table>';
}

/************  LIB classes/functions .... **************/
function getAbsoluteOffsets (e){
  ret = {left:0, top:0};
  while (e.offsetParent){
    if (e.style.position == 'absolute')
      break;
    ret.left += e.offsetLeft;
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
  return 'client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
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
    ret.x += e.offsetLeft;
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
  checkPoint ('CPopup.1');
  var pop = WinManager.get(prefix);
  checkPoint ('CPopup.2');
  if (pop){
    pop.show (false);
    return pop;
  }
  checkPoint ('CPopup.3');
  this.BASE_ZINDEX = 100; // 111111;
    
  checkPoint ('CPopup.4 - Protos');
  // protos ...
  this.show = show;
  checkPoint ('CPopup.5 - toggleHide');
  this.toggleHide = toggleHide;
  checkPoint ('CPopup.6 - getTopDiv');
  this.getTopDiv = getTopDiv;
  checkPoint ('CPopup.7 - getMainDiv');
  this.getMainDiv = getMainDiv;
  checkPoint ('CPopup.8 - getLayer');
  this.getLayer = getLayer;
  checkPoint ('CPopup.9 - setLayer');
  this.setLayer = setLayer;
  checkPoint ('CPopup.10 - setEnableDrag');
  this.setEnableDrag = setEnableDrag;
  checkPoint ('CPopup.11 - getLocation');
  this.getLocation = getLocation;
  checkPoint ('CPopup.12 - setLocation');
  this.setLocation = setLocation;
  checkPoint ('CPopup.13 - focusMe');
  this.focusMe = focusMe;
  checkPoint ('CPopup.14 - unfocusMe');
  this.unfocusMe = unfocusMe;
  checkPoint ('CPopup.15 - centerMe');
  this.centerMe = centerMe;
  checkPoint ('CPopup.16 - destroy');
  this.destroy = destroy;
  checkPoint ('CPopup.17 - setModal');
  this.setModal = setModal;

  // object vars ...
  checkPoint ('CPopup.18 - createElement');
  this.div = document.createElement('div');
  checkPoint ('CPopup.19 - prefix');
  this.prefix = prefix;
  checkPoint ('CPopup.20 - onClose');
  this.onClose = onClose;
  
  var t = this;
//  this.div.className = 'CPopup '+ prefix +'_CPopup';
  this.div.className = classPrefix +'CP';
  checkPoint ('CPopup.21 - className '+this.div.className);
  this.div.id = idPrefix +'_'+ outerRnd;
  checkPoint ('CPopup.22 - div.id '+this.div.id);
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  checkPoint ('CPopup.23 - End div attributes');
  
  if (CPopUpTopClass==null)
//    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
    topClass = 'CPTop '+ prefix +'_CPTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;
  checkPoint ('CPopup.24 - topClass '+topClass);
    
  var m = '<TABLE cellspacing=0 width=100% height=100%>\
           <TR id="'+ prefix +'_bar" class="'+ topClass +'">\
           <TD width=99% valign=bottom>\
           <SPAN id="'+ prefix +'_top"></span></td>\
           <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 4px"></td></tr>\
           <TR><TD height=100% valign=top class="' + classPrefix + 'CPMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';

//      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td></tr>\
  checkPoint ('CPopup.24 - appendChild');
  document.body.appendChild(this.div);
  checkPoint ('CPopup.25 - add m to innerHTML');
  this.div.innerHTML = m;
//  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  checkPoint ('CPopup.26 - Call CWinDrag');
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);
  
  checkPoint ('CPopup.27 - addEventListener mousedown');
  this.div.addEventListener ('mousedown', e_divClicked, false);
  checkPoint ('CPopup.28 - Call WinManager');
  WinManager.add(prefix, this);
  checkPoint ('CPopup.29');
  
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
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }
  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
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
    Data.options.popUp.drag = tf;
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

  function debug  (msg, e){
    logit ("*************** "+ msg +" ****************");
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
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
        } else if (type != 'function') {
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


// Jawz - Number formatting
function nombreFormate (nNombre, separateurMilliers) {
  var sNombre = String(nNombre);
  var i;
  if (separateurMilliers == undefined) separateurMilliers = ' ';
  function separeMilliers (_sNombre) {
    var sRetour = "";
    while (_sNombre.length % 3 != 0) {
      _sNombre = "0"+_sNombre;
    }
    for (i = 0; i < _sNombre.length; i += 3) {
      if (i ==  _sNombre.length-1) separateurMilliers = '';
      sRetour += _sNombre.substr(i, 3)+separateurMilliers;
    }
    while (sRetour.substr(0, 1) == "0") {
      sRetour = sRetour.substr(1);
    }
    return sRetour.substr(0, sRetour.lastIndexOf(separateurMilliers));
  }
  return isEmpty(separeMilliers(sNombre),'0');
}
// End Jawz - Number formatting

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
  for (k=0; k<a.length; k++)
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
  } else
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

/************  LIB singletons .... **************/
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
      } else{
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
      } else {
        t.eOut.insertBefore(te, t.lastE);
      }
      var hr = document.createElement('hr');
      t.eOut.insertBefore(hr, te);
      t.lastE = hr;
    } else {
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


// Jawz - Allow to reload DOA for the same realm as connected in one click
function reloadTools (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var goto = 'http://apps.facebook.com/dragonsofatlantis/realm/'+serverId;
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}

// Provide language translation services based on the browswer language
function translate (wordToTranslate) {
	var returnWord = wordToTranslate
	if ( navigator.language == 'fr' ) {
		if ( Texts.fr[wordToTranslate] != undefined ) {
			returnWord = Texts.fr[wordToTranslate];
		} else {
			logit( wordToTranslate+' to translate FR' );
		}
	}
     else 	if ( navigator.language == 'sv' || navigator.language == 'sv-SE' ) {
		if ( Texts.sv[wordToTranslate] != undefined ) {
			returnWord = Texts.sv[wordToTranslate];
		} else {
			logit( wordToTranslate+' to translate FR' );
		}
	}
	return returnWord;
}

// Jawz - Set default value for null parameter
function isEmpty(obj, defaultval) { 
  if (typeof obj == 'undefined' || obj === undefined || obj === null || obj === '') return defaultval; 
  return obj; 
}

function setSubTab(id, current) {
  if (current) {
    document.getElementById(id).style.backgroundColor = "#eed"; 
    document.getElementById(id).style.color = "black";
  } else {
    document.getElementById(id).style.backgroundColor = JOB_BUTTON_BGCOLOR; 
    document.getElementById(id).style.color = "white"; 
  }
}

function checkPoint(msg) { 
  if (KABAM_CHECK) logit ('Kabam Checkpoint : '+msg);
}



//*********************************** Battle Simulation Tab *********************************************
// Jawz - Battle simulation tab
Tabs.Battle = {
  tabOrder      : BATTLE_TAB_ORDER,
  tabLabel      : kBattle,
  tabDisabled   : false,
  cont          : null,
  logLine       : '',
  terrainLength : 500,
  battleStop    : false,
  battleWinner  : 0, // 0 = Attacker, 1 = Defender
  dragList      : ['GreatDragon', 'WaterDragon', 'StoneDragon', 'FireDragon', 'WindDragon'],
  troopList     : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport',
                   'Giant', 'FireMirror', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop', 'GreatDragon', 'WaterDragon', 'StoneDragon', 'FireDragon', 'WindDragon'],
  meleeListByPrior : ['StoneTroop', 'AquaTroop', 'WindTroop', 'Giant', 'FireMirror', 'GreatDragon', 'WaterDragon', 'StoneDragon', 'FireDragon', 'WindDragon', 'BattleDragon',
                      'FireTroop', 'ArmoredTransport', 'SwiftStrikeDragon', 'Minotaur', 'Halberdsman', 'Longbowman', 'Conscript', 'Porter', 'Spy'],
  rangeListByPrior : ['StoneTroop', 'FireTroop', 'AquaTroop', 'WindTroop', 'FireMirror', 'Longbowman', 'GreatDragon', 'WaterDragon', 'StoneDragon', 'FireDragon', 'WindDragon', 
                      'Giant', 'BattleDragon', 'ArmoredTransport', 'SwiftStrikeDragon', 'Minotaur', 'Halberdsman', 'Conscript', 'Porter', 'Spy'],
  troopDefault  : { Porter            :{meleeDamage:1,     rangeDamage:0,    defense:10,    life:45,     speed:100,  range:0,    x:0, qty:0},
                    Conscript         :{meleeDamage:10,    rangeDamage:0,    defense:10,    life:75,     speed:200,  range:0,    x:0, qty:0},
                    Spy               :{meleeDamage:5,     rangeDamage:0,    defense:5,     life:10,     speed:3000, range:0,    x:0, qty:0},
                    Halberdsman       :{meleeDamage:40,    rangeDamage:0,    defense:40,    life:150,    speed:300,  range:0,    x:0, qty:0},
                    Minotaur          :{meleeDamage:70,    rangeDamage:0,    defense:45,    life:225,    speed:275,  range:0,    x:0, qty:0},
                    Longbowman        :{meleeDamage:5,     rangeDamage:80,   defense:30,    life:75,     speed:250,  range:1200, x:0, qty:0},
                    SwiftStrikeDragon :{meleeDamage:150,   rangeDamage:0,    defense:60,    life:300,    speed:1000, range:0,    x:0, qty:0},
                    BattleDragon      :{meleeDamage:300,   rangeDamage:0,    defense:300,   life:1500,   speed:750,  range:0,    x:0, qty:0},
                    ArmoredTransport  :{meleeDamage:5,     rangeDamage:0,    defense:200,   life:750,    speed:150,  range:0,    x:0, qty:0},
                    Giant             :{meleeDamage:1000,  rangeDamage:0,    defense:400,   life:4000,   speed:120,  range:0,    x:0, qty:0},
                    FireMirror        :{meleeDamage:20,    rangeDamage:1200, defense:30,    life:1500,   speed:50,   range:1500, x:0, qty:0},
                    AquaTroop         :{meleeDamage:1600,  rangeDamage:800,  defense:300,   life:3000,   speed:500,  range:600,  x:0, qty:0},
                    StoneTroop        :{meleeDamage:650,   rangeDamage:0,    defense:900,   life:15000,  speed:350,  range:0,    x:0, qty:0},
                    FireTroop         :{meleeDamage:500,   rangeDamage:2000, defense:150,   life:1000,   speed:400,  range:1600, x:0, qty:0},
                    WindTroop         :{meleeDamage:700,   rangeDamage:0,    defense:200,   life:2850,   speed:1350, range:0,    x:0, qty:0},
                    GreatDragon       :{meleeDamage:2425,  rangeDamage:2425, defense:2425,  life:242514, speed:750,  range:1500, x:0, qty:0},
                    WaterDragon       :{meleeDamage:2728,  rangeDamage:2425, defense:2122,  life:242514, speed:800,  range:1500, x:0, qty:0},
                    StoneDragon       :{meleeDamage:9700,  rangeDamage:7276, defense:14550, life:970056, speed:650,  range:1700, x:0, qty:0},
                    FireDragon        :{meleeDamage:6398,  rangeDamage:9564, defense:4132,  life:413216, speed:850,  range:1800, x:0, qty:0},
                    WindDragon        :{meleeDamage:10306, rangeDamage:7275, defense:6063,  life:606285, speed:1300, range:1000, x:0, qty:0}},
  contentType   : 0, // 0 = config, 1 = result, 2 = log, 3 = rules
  attackLosts   : { Porter            :{qty:0, defense:0, life:0},
                    Conscript         :{qty:0, defense:0, life:0},
                    Spy               :{qty:0, defense:0, life:0},
                    Halberdsman       :{qty:0, defense:0, life:0},
                    Minotaur          :{qty:0, defense:0, life:0},
                    Longbowman        :{qty:0, defense:0, life:0},
                    SwiftStrikeDragon :{qty:0, defense:0, life:0},
                    BattleDragon      :{qty:0, defense:0, life:0},
                    ArmoredTransport  :{qty:0, defense:0, life:0},
                    Giant             :{qty:0, defense:0, life:0},
                    FireMirror        :{qty:0, defense:0, life:0},
                    AquaTroop         :{qty:0, defense:0, life:0},
                    StoneTroop        :{qty:0, defense:0, life:0},
                    FireTroop         :{qty:0, defense:0, life:0},
                    WindTroop         :{qty:0, defense:0, life:0},
                    GreatDragon       :{qty:0, defense:0, life:0},
                    WaterDragon       :{qty:0, defense:0, life:0},
                    StoneDragon       :{qty:0, defense:0, life:0},
                    FireDragon        :{qty:0, defense:0, life:0},
                    WindDragon        :{qty:0, defense:0, life:0}},
  defenseLosts  : { Porter            :{qty:0, defense:0, life:0},
                    Conscript         :{qty:0, defense:0, life:0},
                    Spy               :{qty:0, defense:0, life:0},
                    Halberdsman       :{qty:0, defense:0, life:0},
                    Minotaur          :{qty:0, defense:0, life:0},
                    Longbowman        :{qty:0, defense:0, life:0},
                    SwiftStrikeDragon :{qty:0, defense:0, life:0},
                    BattleDragon      :{qty:0, defense:0, life:0},
                    ArmoredTransport  :{qty:0, defense:0, life:0},
                    Giant             :{qty:0, defense:0, life:0},
                    FireMirror        :{qty:0, defense:0, life:0},
                    AquaTroop         :{qty:0, defense:0, life:0},
                    StoneTroop        :{qty:0, defense:0, life:0},
                    FireTroop         :{qty:0, defense:0, life:0},
                    WindTroop         :{qty:0, defense:0, life:0},
                    GreatDragon       :{qty:0, defense:0, life:0},
                    WaterDragon       :{qty:0, defense:0, life:0},
                    StoneDragon       :{qty:0, defense:0, life:0},
                    FireDragon        :{qty:0, defense:0, life:0},
                    WindDragon        :{qty:0, defense:0, life:0}},
  attackAlives  : { Porter            :{qty:0, defense:0, life:0},
                    Conscript         :{qty:0, defense:0, life:0},
                    Spy               :{qty:0, defense:0, life:0},
                    Halberdsman       :{qty:0, defense:0, life:0},
                    Minotaur          :{qty:0, defense:0, life:0},
                    Longbowman        :{qty:0, defense:0, life:0},
                    SwiftStrikeDragon :{qty:0, defense:0, life:0},
                    BattleDragon      :{qty:0, defense:0, life:0},
                    ArmoredTransport  :{qty:0, defense:0, life:0},
                    Giant             :{qty:0, defense:0, life:0},
                    FireMirror        :{qty:0, defense:0, life:0},
                    AquaTroop         :{qty:0, defense:0, life:0},
                    StoneTroop        :{qty:0, defense:0, life:0},
                    FireTroop         :{qty:0, defense:0, life:0},
                    WindTroop         :{qty:0, defense:0, life:0},
                    GreatDragon       :{qty:0, defense:0, life:0},
                    WaterDragon       :{qty:0, defense:0, life:0},
                    StoneDragon       :{qty:0, defense:0, life:0},
                    FireDragon        :{qty:0, defense:0, life:0},
                    WindDragon        :{qty:0, defense:0, life:0}},
  defenseAlives : { Porter            :{qty:0, defense:0, life:0},
                    Conscript         :{qty:0, defense:0, life:0},
                    Spy               :{qty:0, defense:0, life:0},
                    Halberdsman       :{qty:0, defense:0, life:0},
                    Minotaur          :{qty:0, defense:0, life:0},
                    Longbowman        :{qty:0, defense:0, life:0},
                    SwiftStrikeDragon :{qty:0, defense:0, life:0},
                    BattleDragon      :{qty:0, defense:0, life:0},
                    ArmoredTransport  :{qty:0, defense:0, life:0},
                    Giant             :{qty:0, defense:0, life:0},
                    FireMirror        :{qty:0, defense:0, life:0},
                    AquaTroop         :{qty:0, defense:0, life:0},
                    StoneTroop        :{qty:0, defense:0, life:0},
                    FireTroop         :{qty:0, defense:0, life:0},
                    WindTroop         :{qty:0, defense:0, life:0},
                    GreatDragon       :{qty:0, defense:0, life:0},
                    WaterDragon       :{qty:0, defense:0, life:0},
                    StoneDragon       :{qty:0, defense:0, life:0},
                    FireDragon        :{qty:0, defense:0, life:0},
                    WindDragon        :{qty:0, defense:0, life:0}},
  itemList      : ['DragonHearts', 'GlowingShields', 'PurpleBones', 'CrimsonBull'],
  researchList  : ['RapidDeployment', 'Ballistics', 'Metallurgy', 'Medicine', 'Dragonry', 'AerialCombat'],
  researchDefault : {RapidDeployment:0, Ballistics:0, Metallurgy:0, Medicine:0, Dragonry:0, AerialCombat:0},

  init : function (div){
    var t = Tabs.Battle;
    t.cont = div;

    if (Data.options.battle == null)
      Data.options.battle = { ownStatus:1 };
    if (Data.BattleSimu == null || Data.BattleSimu.attDragLevel == undefined || !Data.BattleSimu.attDragLevel) {
      Data.BattleSimu = {ennemyResearch:[], attackItems:[], defenseItems:[], attackUnits:[], defenseUnits:[], battleLog:[], attDragLevel:0, defDragLevel:0, battleTurn:0, ennemyGeneral:5 };
      Data.BattleSimu.attackUnits = cloneProps(t.troopDefault);
      Data.BattleSimu.defenseUnits = cloneProps(t.troopDefault);
      Data.BattleSimu.ennemyResearch = cloneProps(t.researchDefault);
    }
    if (!Data.BattleSimu.attackUnits ||
         Data.BattleSimu.attackUnits == null ||
         Data.BattleSimu.attackUnits == undefined ||
         Data.BattleSimu.attackUnits.length == 0)
      Data.BattleSimu.attackUnits = cloneProps(t.troopDefault);
    if (!Data.BattleSimu.defenseUnits ||
         Data.BattleSimu.defenseUnits == null ||
         Data.BattleSimu.defenseUnits == undefined ||
         Data.BattleSimu.defenseUnits.length == 0)
      Data.BattleSimu.defenseUnits = cloneProps(t.troopDefault);
    if (!Data.BattleSimu.ennemyResearch ||
         Data.BattleSimu.ennemyResearch == null ||
         Data.BattleSimu.ennemyResearch == undefined ||
         Data.BattleSimu.ennemyResearch.length == 0)
      Data.BattleSimu.ennemyResearch = cloneProps(t.researchDefault);

//for (i=0; i<t.troopList.length; i++)
//  logit ('TroopDefault['+t.troopList[i]+'] : '+inspect(t.troopDefault[t.troopList[i]]));
//  logit ('attackUnits['+t.troopList[i]+'] : '+inspect(Data.BattleSimu.attackUnits[t.troopList[i]]));
//  logit ('defenseUnits['+t.troopList[i]+'] : '+inspect(Data.BattleSimu.defenseUnits[t.troopList[i]]));
//  t.log (t.troopDefault['+t.troopList[i]+'].qty+' '+t.troopList[i]+', pos x '+t.troopDefault[t.troopList[i]].x, '<B>Init 0</B>');

    var m = '<DIV class=' + idTitle + '>' + kBattleTitle + '</div>\
             <DIV id=' + battlePrefix + 'Status class=' + idStatBox + ' style="margin-bottom:5px !important">\
               <TABLE width=100%><TR>\
                 <TD><CENTER><INPUT class=' + idGreenButton + ' type=submit value="' + kClearAll + '" id=' + battlePrefix + 'ClearAll></input></CENTER></TD>\
                 <TD><CENTER><INPUT class=' + idGreenButton + ' type=submit value="' + kClearLog + '" id=' + battlePrefix + 'ClearLog></input></CENTER></TD>\
               </TR></TABLE><TABLE width=100%>\
               <TR><TD width=15%>' + kYouAre + ' : </TD>\
                   <TD width=5%><INPUT type=radio name=' + battlePrefix + 'OwnStatus value="0" ></td><td align=left colspan=2>'+ kAttacker +'</td></tr>\
               <TR><TD width=15%></TD>\
                   <TD width=5%><INPUT type=radio name=' + battlePrefix + 'OwnStatus value="1" ></td><td align=left width=15%>'+ kDefender +'</td>\
                   <TD width=75%><CENTER><INPUT class=' + idGreenButton + ' id=' + battlePrefix + 'GetTroops type=submit value="' + kBattleGetTroops + '" /></center></TD>\
             </TR></TABLE></DIV>\
             <DIV id=' + battlePrefix + 'Header style="margin-top:10px !important; height:680px; max-height:680px; overflow-y:auto">\
               <TABLE width=100% align=center><TR><TD>\
               <INPUT class=button type=submit value="' + kConfig + '" id=' + battlePrefix + 'Config></INPUT>\
               <INPUT class=button type=submit value="' + kResult + '" id=' + battlePrefix + 'Result></INPUT>\
               <INPUT class=button type=submit value="' + kLog + '" id=' + battlePrefix + 'Log></INPUT>\
               <INPUT class=button type=submit value="' + kRules + '" id=' + battlePrefix + 'Rules></INPUT>\
               </TD></TR></TABLE>\
             <DIV id=' + battlePrefix + 'Cont style="margin-top:1px !important; height:655px; max-height:655px; overflow-y:auto"></div></div>';
    t.cont.innerHTML = m;
    document.getElementById(battlePrefix + 'ClearAll').addEventListener ('click', t.clearAllData, false);
    document.getElementById(battlePrefix + 'ClearLog').addEventListener ('click', t.clearLog, false);
    document.getElementById(battlePrefix + 'GetTroops').addEventListener ('click', t.getOwnTroops, false);
    document.getElementById(battlePrefix + 'Config').addEventListener ('click', t.tabBattleConfig, false);
    document.getElementById(battlePrefix + 'Result').addEventListener ('click', t.tabBattleResult, false);	
    document.getElementById(battlePrefix + 'Log').addEventListener ('click', t.tabBattleLog, false);	
    document.getElementById(battlePrefix + 'Rules').addEventListener ('click', t.tabBattleRules, false);	
    window.addEventListener('unload', t.onUnload, false);
    var r = document.getElementsByName(battlePrefix + 'OwnStatus');
    for (i=0;i<r.length;i++) {
      r[i].addEventListener('change', enableChanged, false);
      r[i].checked = (r[i].value == Data.options.battle.ownStatus);
    }

    function enableChanged(e){
      var t = Tabs.Battle;
      Data.options.battle.ownStatus = e.target.value;
    }

    // Restore the views
    t.contentType = Data.options.battleTab;
    t.show();
  },

  show : function (){
    var t = Tabs.Battle;
    switch (isEmpty(t.contentType, 0)) {
      case 0: t.tabBattleConfig(); break;
      case 1: t.tabBattleResult(); break;
      case 2: t.tabBattleLog(); break;
      case 3: t.tabBattleRules(); break;
    }
  },

  onUnload : function (){
    var t = Tabs.Battle;
    logit ('===============  Tabs.Battle.onUnload');
    Data.options.battleTab = t.contentType;
  },

  hide : function (){
  },

  clearAllData : function (){
    var t = Tabs.Battle;
    Data.options.battle = { ownStatus:1 };
    Data.BattleSimu = {ennemyResearch:[], attackItems:[], defenseItems:[], attackUnits:[], defenseUnits:[], battleLog:[], attDragLevel:0, defDragLevel:0, battleTurn:0, ennemyGeneral:5 };
    Data.BattleSimu.attackUnits = cloneProps(t.troopDefault);
    Data.BattleSimu.defenseUnits = cloneProps(t.troopDefault);
    Data.BattleSimu.ennemyResearch = cloneProps(t.researchDefault);
    t.show();
  },

  clearLog : function (){
    var t = Tabs.Battle;
    Data.BattleSimu.battleLog = [];
    if (isEmpty(t.contentType, 0) == 2) t.tabBattleLog();
  },

  getOwnTroops : function (){
    var t = Tabs.Battle;
    var city = Seed.cities[0];
    for (i=0; i<t.troopList.length; i++){
      var num = city.units[t.troopList[i]];
      if (!num) num = 0;
      Data.BattleSimu.defenseUnits[t.troopList[i]].qty = num;
      document.getElementById(battlePrefix + 'Trp_D_'+ i).value = num;
    }
  },

  /** BATTLE CONFIG SUB-TAB ***/
  tabBattleConfig : function (){
    var t = Tabs.Battle;

    setSubTab(battlePrefix + 'Config', true);
    setSubTab(battlePrefix + 'Result', false);
    setSubTab(battlePrefix + 'Log', false);
    setSubTab(battlePrefix + 'Rules',  false);
    t.contentType = 0;
    Data.options.battleTab = t.contentType;

    var m = '<DIV class=' + idStatBox + '>';
    m += '<DIV class=' + idSubtitle + '>' + kBattleTroops + '</div>\
          <DIV style="height:610px; max-height:610px; overflow-y:auto">\
          <TABLE class=' + idTabPad + '2 style="margin-top:3px" width=100%>\
          <TR bgcolor=#dde align=center>\
            <TD style="border-bottom: 1px solid;" width=30%><B>' + kUnit + '</b></td>\
            <TD style="border-bottom: 1px solid;" width=30%><B>' + kAttacker + '</b></td>\
            <TD style="border-bottom: 1px solid;" width=30%><B>' + kDefender + '</b></td>\
            <TD style="border-bottom: 1px solid;" width=10%></TD></tr>';
    for (var i=0; i<t.troopList.length; i++){
      if ((t.troopList[i] != 'GreatDragon') && (t.troopList[i] != 'WaterDragon') &&
          (t.troopList[i] != 'StoneDragon') && (t.troopList[i] != 'FireDragon') && (t.troopList[i] != 'WindDragon')) {
        m += '<TR><TD class=' + idTabLeft + '2>'+ translate(Names.troops.byName[t.troopList[i]][1]) +'</td>';
        var num = 0;
        if (Data.BattleSimu.attackUnits[t.troopList[i]].qty) num = isEmpty(Data.BattleSimu.attackUnits[t.troopList[i]].qty,0);
        m += '<TD align=center><INPUT type=text id=' + battlePrefix + 'Trp_A_'+ i +' maxlength=6 style="width:60px" size=2 value="'+ num +'"\></td>';
        if (Data.BattleSimu.defenseUnits[t.troopList[i]].qty) num = isEmpty(Data.BattleSimu.defenseUnits[t.troopList[i]].qty,0);
        else num = 0;
        m += '<TD align=center><INPUT type=text id=' + battlePrefix + 'Trp_D_'+ i +' maxlength=6 style="width:60px" size=2 value="'+ num +'"\></td><td></td>';
        m += '</tr>';
      }
    }
    m += '<TR><TD class=' + idTabLeft + '2>'+ kGreatDragons +'</td>\
              <TD>'+ dragonSelect('Att', Data.BattleSimu.attackUnits) +'&nbsp'+ dragLvlSelect('A',Data.BattleSimu.attDragLevel) +'</td>\
              <TD>'+ dragonSelect('Def', Data.BattleSimu.defenseUnits) +'&nbsp'+ dragLvlSelect('D',Data.BattleSimu.defDragLevel) +'</td><td></td></tr>';

    m += '<TR><TD colspan=4 style="font-size:2px">&nbsp</TD></TR>\
          <TR><TD width=100% colspan=4 align=center><TABLE cellpadding=1 cellspacing=1 width=90%><TR>\
          <TD width=40%><HR></td><TD>  '+ kItems +'  </td><TD width=40%><HR></td></tr></table></TD></TR>';
    var el = [];
    for (var i=0; i<t.itemList.length; i++){
      m += '<TR><TD class=' + idTabLeft + '2>'+ translate(t.itemList[i]) +'</td>';
      var num = 0;
      m += '<TD align=center><INPUT type=checkbox id="' + battlePrefix + 'cb_A_'+ i +'" '+ (Data.BattleSimu.attackItems[i]?'CHECKED':'') +' /></td>';
      m += '<TD align=center><INPUT type=checkbox id="' + battlePrefix + 'cb_D_'+ i +'" '+ (Data.BattleSimu.defenseItems[i]?'CHECKED':'') +' /></td>';
      el.push(battlePrefix + 'cb_A_'+ i);
      el.push(battlePrefix + 'cb_D_'+ i);
      m += '</tr>';
    }

    m += '<TR><TD colspan=4 style="font-size:2px">&nbsp</TD></TR>\
          <TR><TD width=100% colspan=4 align=center><TABLE cellpadding=1 cellspacing=1 width=90%><TR>\
          <TD width=40%><HR></td><TD>  '+ kEnnemyResearch +'  </td><TD width=40%><HR></td></tr></table></TD></TR>';
    m += '<TR><TD width=100% colspan=4 align=center><TABLE cellpadding=1 cellspacing=1 width=100%>';
    var rl = [];
    var col = 0;
    for (var i=0; i<t.researchList.length; i++){
      if (col == 0) m += '<tr>';
      m += '<TD class=' + idTabLeft + '2>'+ translate(t.researchList[i]) +'</td>';
      var num = 0;
      m += '<TD>'+ researchSelect(i, isEmpty(Data.BattleSimu.ennemyResearch[t.researchList[i]],'0') ) +'</td>';
      rl.push(battlePrefix + 'rs_A_' + i);
      if (col == 1) {
        col = 0;
        m += '</tr>';
      } else col++;
    }
    m += '<TR><TD class=' + idTabLeft + '2>'+ kEnnemyGeneral +'</td>';
    m += '<TD>'+ generalSelect(isEmpty(Data.BattleSimu.ennemyGeneral,'5')) +'</td>\
          <TD colspan=2><CENTER><INPUT class=' + idGreenButton + ' id=' + battlePrefix + 'StartBattle type=submit value="Calculate" /></center></TD></TR>';
    m += '</table></table></div></div>';
    document.getElementById(battlePrefix + 'Cont').innerHTML = m; 

    // add event listeners ...
    for (var i=0; i<t.troopList.length; i++) {
      if ((t.troopList[i] != 'GreatDragon') && (t.troopList[i] != 'WaterDragon') &&
          (t.troopList[i] != 'StoneDragon') && (t.troopList[i] != 'FireDragon') && (t.troopList[i] != 'WindDragon')) {
        document.getElementById(battlePrefix + 'Trp_A_'+ i).addEventListener('change', attackTroopsChanged, false);
        document.getElementById(battlePrefix + 'Trp_D_'+ i).addEventListener('change', defenseTroopsChanged, false);
      }
    }
    document.getElementById(battlePrefix + 'DragSelAtt').addEventListener('change', attackDragonChanged, false);
    document.getElementById(battlePrefix + 'DrgLvlA').addEventListener('change', attDragLvlChanged, false);
    document.getElementById(battlePrefix + 'DragSelDef').addEventListener('change', defenseDragonChanged, false);
    document.getElementById(battlePrefix + 'DrgLvlD').addEventListener('change', defDragLvlChanged, false);
    document.getElementById(battlePrefix + 'General').addEventListener('change', ennemyGeneralChanged, false);
    document.getElementById(battlePrefix + 'StartBattle').addEventListener ('click', t.startBattle, false);

    for (var i=0; i<el.length; i++)
      document.getElementById(el[i]).addEventListener('click', checked, false);

    for (var i=0; i<rl.length; i++)
      document.getElementById(rl[i]).addEventListener('change', ennemyResearchChanged, false);

    function checked (evt){
      var id = evt.target.id.split ('_');
      if (id[1] == 'A')
        Data.BattleSimu.attackItems[id[2]] = evt.target.checked;
      else
        Data.BattleSimu.defenseItems[id[2]] = evt.target.checked;
    }

    function attackTroopsChanged (e){
      var t = Tabs.Battle;
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      var max = 9999999999;
      if (isNaN(x) || x<0 || x>max){
        e.target.style.backgroundColor = 'red';
      }else {
        e.target.value = x;
        Data.BattleSimu.attackUnits[t.troopList[args[2]]].qty = x;
        e.target.style.backgroundColor = '';
      }
    }

    function defenseTroopsChanged (e){
      var t = Tabs.Battle;
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      var max = 9999999999;
      if (isNaN(x) || x<0 || x>max){
        e.target.style.backgroundColor = 'red';
      }else {
        e.target.value = x;
        Data.BattleSimu.defenseUnits[t.troopList[args[2]]].qty = x;
        e.target.style.backgroundColor = '';
      }
    }

    function attackDragonChanged (e){
      var id = document.getElementById(battlePrefix + 'DragSelAtt');
      var sel = isEmpty(id.value,'none');
      id.value = sel;
      for (var d=0; d<t.dragList.length; d++)
        Data.BattleSimu.attackUnits[t.dragList[d]].qty = 0;
      if (sel != 'none') Data.BattleSimu.attackUnits[sel].qty = 1;
      id.style.backgroundColor = '';
    }

    function defenseDragonChanged (e){
      var id = document.getElementById(battlePrefix + 'DragSelDef');
      var sel = isEmpty(id.value,'none');
      id.value = sel;
      for (var d=0; d<t.dragList.length; d++)
        Data.BattleSimu.defenseUnits[t.dragList[d]].qty = 0;
      if (sel != 'none') Data.BattleSimu.defenseUnits[sel].qty = 1;
      id.style.backgroundColor = '';
    }

    function dragonSelect (suffid, trpList){
      var t = Tabs.Battle;
      var found = false;
      var m = '<SELECT id="' + battlePrefix + 'DragSel' + suffid + '">';
      for (var d=0; d<t.dragList.length; d++){
        var selected = '';
        if (trpList[t.dragList[d]].qty > 0) {
          selected = 'SELECTED';
          found = true;
        }
        m += '<OPTION value="' + t.dragList[d] + '" ' + selected + '>' + translate(Names.troops.byName[t.dragList[d]][1]) + '</option>';
      }
      if (!found) selected = 'SELECTED';
      m += '<OPTION value="none" ' + selected + '>' + kNoDragon + '</option>';
      m += '</select>';
      return m;
    }

    function attDragLvlChanged (e){
      var id = document.getElementById(battlePrefix + 'DrgLvlA');
      var x = parseIntZero(id.value);
      if (isNaN(x) || x<0 || x>10){
        id.style.backgroundColor = 'red';
      }else {
        id.value = x;
        Data.BattleSimu.attDragLevel = x;
        id.style.backgroundColor = '';
      }
    }

    function defDragLvlChanged (e){
      var id = document.getElementById(battlePrefix + 'DrgLvlD');
      var x = parseIntZero(id.value);
      if (isNaN(x) || x<0 || x>10){
        id.style.backgroundColor = 'red';
      }else {
        id.value = x;
        Data.BattleSimu.defDragLevel = x;
        id.style.backgroundColor = '';
      }
    }

    function dragLvlSelect (suffid, curVal){
      var m = '<SELECT id="' + battlePrefix + 'DrgLvl' + suffid + '">';
      for (var k=1; k<=10; k++)
        m += '<OPTION value="' + k + '" ' + (curVal==k?'SELECTED':'') + '>' + k + '</option>';
      m += '</select>';
      return m;
    }

    function ennemyResearchChanged (evt){
      var id = evt.target.id.split ('_');
      var x = parseIntZero(evt.target.value);
      if (isNaN(x) || x<0 || x>10){
        evt.target.style.backgroundColor = 'red';
      }else {
        evt.target.value = x;
        Data.BattleSimu.ennemyResearch[t.researchList[id[2]]] = x;
        evt.target.style.backgroundColor = '';
      }
    }

    function researchSelect (listIdx, curVal){
      var m = '<SELECT id="' + battlePrefix + 'rs_A_' + listIdx + '">';
      for (var k=1; k<=10; k++)
        m += '<OPTION value="' + k + '" ' + (curVal==k?'SELECTED':'') + '>' + k + '</option>';
      m += '</select>';
      return m;
    }

    function ennemyGeneralChanged (e){
      var id = document.getElementById(battlePrefix + 'General');
      var x = parseIntZero(id.value);
      if (isNaN(x) || x<0 || x>5){
        id.style.backgroundColor = 'red';
      }else {
        id.value = x;
        Data.BattleSimu.ennemyGeneral = x;
        id.style.backgroundColor = '';
      }
    }

    function generalSelect (curVal){
      var m = '<SELECT id="' + battlePrefix + 'General">';
      for (var k=1; k<=5; k++)
        m += '<OPTION value="' + k + '" ' + (curVal==k?'SELECTED':'') + '>' + k + kStars + '</option>';
      m += '</select>';
      return m;
    }

  },


  /** BATTLE RESULT SUB-TAB ***/
  tabBattleResult : function (){
    var t = Tabs.Battle;

    setSubTab(battlePrefix + 'Config', false);
    setSubTab(battlePrefix + 'Result', true);
    setSubTab(battlePrefix + 'Log',    false);
    setSubTab(battlePrefix + 'Rules',  false);
    t.contentType = 1;
    Data.options.battleTab = t.contentType;

    var m = '<DIV class=' + idStatBox + '>';
    m += '<DIV class=' + idSubtitle + '>' + kBattleLog + '</div>\
          <DIV style="height:570px; max-height:570px; overflow-y:auto">\
          <TABLE class=' + idTabPad + '2 style="margin-top:3px" width=100%>\
          <TR bgcolor=#dde align=center>\
            <TD width=30%><B>' + kUnit + '</b></td>\
            <TD width=35% colspan=2><B>' + kAttacker + '</b></td>\
            <TD width=35% colspan=2><B>' + kDefender + '</b></td></tr>\
          <TR bgcolor=#dde align=center>\
            <TD style="border-bottom: 1px solid;" width=30%> &nbsp </td>\
            <TD style="border-bottom: 1px solid;" width=18%><B>' + kSurvival + '</b></td>\
            <TD style="border-bottom: 1px solid;" width=17%><B>' + kLosts + '</b></td>\
            <TD style="border-bottom: 1px solid;" width=18%><B>' + kSurvival + '</b></td>\
            <TD style="border-bottom: 1px solid;" width=17%><B>' + kLosts + '</b></td></tr>';
    for (var i=0; i<t.troopList.length; i++){
      if ((t.troopList[i] != 'GreatDragon') && (t.troopList[i] != 'WaterDragon') &&
          (t.troopList[i] != 'StoneDragon') && (t.troopList[i] != 'FireDragon') && (t.troopList[i] != 'WindDragon')) {
        m += '<TR><TD class=' + idTabLeft + '3>'+ translate(Names.troops.byName[t.troopList[i]][1]) +'</td>';
        var num = 0;
        num = nombreFormate(isEmpty(t.attackAlives[t.troopList[i]].qty,0), ' ');
        m += '<TD align=right class=' + idTab + '2>'+ num +'</td>';
        var num = 0;
        num = isEmpty(t.attackLosts[t.troopList[i]].qty,0);
        num = (num > 0) ? '<SPAN class=' + idBoldRed + '12>'+ nombreFormate(num,' ') +'</span>' : nombreFormate(num,' ');
        m += '<TD align=right class=' + idTab + '2>'+ num +'</td>';
        var num = 0;
        num = nombreFormate(isEmpty(t.defenseAlives[t.troopList[i]].qty,0), ' ');
        m += '<TD align=right class=' + idTab + '2>'+ num +'</td>';
        num = isEmpty(t.defenseLosts[t.troopList[i]].qty,0);
        num = (num > 0) ? '<SPAN class=' + idBoldRed + '12>'+ nombreFormate(num,' ') +'</span>' : nombreFormate(num,' ');
        m += '<TD align=right class=' + idTab + '2>'+ num +'</td>';
        m += '</tr>';
      }
    }
    // Great dragons display (specific as we show damage received)
    for (var d=0; d<t.dragList.length; d++){
      if ((Data.BattleSimu.attackUnits[t.dragList[d]].qty > 0) ||
          (Data.BattleSimu.defenseUnits[t.dragList[d]].qty > 0)){
        if (Data.BattleSimu.attackUnits[t.dragList[d]].qty > 0) {
          var attAlive = nombreFormate(isEmpty(t.attackAlives[t.dragList[d]].qty,0),' ');
          var attLost = isEmpty(t.attackLosts[t.dragList[d]].qty,0);
          attLost = (attLost > 0) ? '<SPAN class=' + idBoldRed + '12>'+ nombreFormate(attLost,' ') +'</span>' : nombreFormate(attLost,' ');
          var dmg = nombreFormate(isEmpty(t.attackLosts[t.dragList[d]].defense,0),' ');
          var life = ((isEmpty(t.attackLosts[t.dragList[d]].life,0) / Data.BattleSimu.attackUnits[t.dragList[d]].life) * 100);
          life = life.toFixed(2);
          var attState = dmg + kDmgTaken + life + kLostLife; // + '(reste '+t.attackAlives[t.dragList[d]].life+')';
        } else {
          var attAlive = '';
          var attLost  = '';
          var attState = '';
        }
        if (Data.BattleSimu.defenseUnits[t.dragList[d]].qty > 0) {
          var defAlive = nombreFormate(isEmpty(t.defenseAlives[t.dragList[d]].qty,0),' ');
          var defLost = isEmpty(t.defenseLosts[t.dragList[d]].qty,0);
          defLost = (defLost > 0) ? '<SPAN class=' + idBoldRed + '12>'+ nombreFormate(defLost,' ') +'</span>' : nombreFormate(defLost,' ');
          var dmg = nombreFormate(isEmpty(t.defenseLosts[t.dragList[d]].defense,0),' ');
          var life = ((isEmpty(t.defenseLosts[t.dragList[d]].life,0) / Data.BattleSimu.defenseUnits[t.dragList[d]].life) * 100);
          life = life.toFixed(2);
          var defState = dmg + kDmgTaken + life + kLostLife; // + '(reste '+t.defenseAlives[t.dragList[d]].life+')';
        } else {
          var defAlive = '';
          var defLost  = '';
          var defState = '';
        }
        m += '<TR><TD class=' + idTabLeft + '3>'+ translate(Names.troops.byName[t.dragList[d]][1]) +'</td>\
                  <TD align=right class=' + idTab + '2>'+ attAlive +'</td>\
                  <TD align=right class=' + idTab + '2>'+ attLost +'</td>\
                  <TD align=right class=' + idTab + '2>'+ defAlive +'</td>\
                  <TD align=right class=' + idTab + '2>'+ defLost +'</td></tr>';
        m += '<TR><TD>&nbsp</td>\
                  <TD align=right class=' + idTab + '2 colspan=2>'+ attState +'</td>\
                  <TD align=right class=' + idTab + '2 colspan=2>'+ defState +'</td></tr>';
      }
    }

    m += '<TR><TD colspan=5>&nbsp</TD></TR><TR><TD width=100% colspan=5 align=center><TABLE cellpadding=10 cellspacing=10 width=90%><TR>\
          <TD width=40%><HR></td><TD>  '+ kItems +'  </td><TD width=40%><HR></td></tr></table></TD></TR>';
    for (var i=0; i<t.itemList.length; i++){
      m += '<TR><TD class=' + idTabLeft + '3>'+ translate(t.itemList[i]) +'</td>';
      var num = 0;
      m += '<TD align=center colspan=2>'+ (Data.BattleSimu.attackItems[i]?'<SPAN class=' + idBoldRed + '12>X</span>':'') +'</td>';
      m += '<TD align=center colspan=2>'+ (Data.BattleSimu.defenseItems[i]?'<SPAN class=' + idBoldRed + '12>X</span>':'') +'</td>';
      m += '</tr>';
    }
    m += '</table></div></div>';
    document.getElementById(battlePrefix + 'Cont').innerHTML = m; 
  },


  /** BATTLE LOG SUB-TAB ***/
  tabBattleLog : function (){
    var t = Tabs.Battle;
    var logTable = null;

    setSubTab(battlePrefix + 'Config', false);
    setSubTab(battlePrefix + 'Result', false);
    setSubTab(battlePrefix + 'Log',    true);
    setSubTab(battlePrefix + 'Rules',  false);
    t.contentType = 2;
    Data.options.battleTab = t.contentType;

    var m = '<DIV class=' + idStatBox + '>';
    m += '<DIV class=' + idSubtitle + '>' + kBattleLog + '</div>\
          <DIV style="height:620px; max-height:620px; overflow-y:auto">\
          <TABLE cellpadding=0 cellspacing=0 id=' + battlePrefix + 'LogTable class=' + idTabLined + 'W>';
    for (var i=0; i<Data.BattleSimu.battleLog.length; i++)
      if (!Data.BattleSimu.battleLog[i].msg2)
        m += '<TR><TD>'+ Data.BattleSimu.battleLog[i].turn + '</td><TD colspan=2>' + Data.BattleSimu.battleLog[i].msg + '</td></tr>';
      else
        m += '<TR><TD>'+ Data.BattleSimu.battleLog[i].turn + '</td><TD width=5%></td><TD width=90%>' + Data.BattleSimu.battleLog[i].msg2 + '</td></tr>';
    document.getElementById(battlePrefix + 'Cont').innerHTML = m + '</table></div>'; 
  },

  log : function (msg, msg2, turn){
    var t = Tabs.Battle;
    Data.BattleSimu.battleLog.push ({turn:turn, msg:msg, msg2:msg2});
  },


  /** BATTLE CALCULATOR ***/
  startBattle : function (){
    var t = Tabs.Battle;
    var maxRange = 0;
    t.battleStop = false;

    function applyUpgrade (src, percent){
      var dest = src + Math.floor(src * (percent / 100));
      return dest;
    }

    function loadGreatDragonStats (src, unit, lev){
    // Load great dragons statistics from manifest according to level selected
      var dfltMeleeDamage = t.troopDefault[unit].meleeDamage;
      var dfltRangeDamage = t.troopDefault[unit].rangeDamage;
      var dfltDefense     = t.troopDefault[unit].defense;
      var dfltLife        = t.troopDefault[unit].life;
      var dfltRange       = t.troopDefault[unit].range;
      var dfltSpeed       = t.troopDefault[unit].speed;
      switch (unit) {
        case 'GreatDragon' : var DragStats = Seed.greatDragons.GreatDragon; break;
        case 'WaterDragon' : var DragStats = Seed.greatDragons.WaterDragon; break;
        case 'StoneDragon' : var DragStats = Seed.greatDragons.StoneDragon; break;
        case 'FireDragon'  : var DragStats = Seed.greatDragons.FireDragon; break;
        case 'WindDragon'  : var DragStats = Seed.greatDragons.WindDragon; break;
        default: var DragStats = Seed.greatDragons.GreatDragon; break;
      }
      try {
        var dfltMeleeDamage = DragStats[lev].melee;
        var dfltRangeDamage = DragStats[lev].ranged;
        var dfltDefense     = DragStats[lev].defense;
        var dfltLife        = DragStats[lev].life;
        var dfltRange       = DragStats[lev].range;
        var dfltSpeed       = DragStats[lev].speed;
      }
      catch(e){
        actionLog('Troops statistics for + ' + Names.troops.byName[unit][1] + ': ' + e.msg + ' Manifest not available, using defaults');
      }
      src[unit].meleeDamage = dfltMeleeDamage;
      src[unit].rangeDamage = dfltRangeDamage;
      src[unit].defense     = dfltDefense;
      src[unit].life        = dfltLife;
      src[unit].range       = dfltRange;
      src[unit].speed       = dfltSpeed;
    }


    if (Data.options.battle.ownStatus == 0) { // Player is attacking
      // Attacker's research
      var attRapidDeployment = isEmpty(Seed.s.research['RapidDeployment'],0);
      var attWeaponCalibration = isEmpty(Seed.s.research['Ballistics'],0);
      var attMedicine = isEmpty(Seed.s.research['Medicine'],0);
      var attMetallurgy = isEmpty(Seed.s.research['Metallurgy'],0);
      var attDragonry = isEmpty(Seed.s.research['Dragonry'],0);
      var attAerialCombat = isEmpty(Seed.s.research['AerialCombat'],0);
      // Defender's research
      var defRapidDeployment = Data.BattleSimu.ennemyResearch['RapidDeployment'];
      var defWeaponCalibration = Data.BattleSimu.ennemyResearch['Ballistics'];
      var defMedicine = Data.BattleSimu.ennemyResearch['Medicine'];
      var defMetallurgy = Data.BattleSimu.ennemyResearch['Metallurgy'];
      var defDragonry = Data.BattleSimu.ennemyResearch['Dragonry'];
      var defAerialCombat = Data.BattleSimu.ennemyResearch['AerialCombat'];
    } else {
      // Attacker's research
      var attRapidDeployment = Data.BattleSimu.ennemyResearch['RapidDeployment'];
      var attWeaponCalibration = Data.BattleSimu.ennemyResearch['Ballistics'];
      var attMedicine = Data.BattleSimu.ennemyResearch['Medicine'];
      var attMetallurgy = Data.BattleSimu.ennemyResearch['Metallurgy'];
      var attDragonry = Data.BattleSimu.ennemyResearch['Dragonry'];
      var attAerialCombat = Data.BattleSimu.ennemyResearch['AerialCombat'];
      // Defender's research
      var defRapidDeployment = isEmpty(Seed.s.research['RapidDeployment'],0);
      var defWeaponCalibration = isEmpty(Seed.s.research['Ballistics'],0);
      var defMedicine = isEmpty(Seed.s.research['Medicine'],0);
      var defMetallurgy = isEmpty(Seed.s.research['Metallurgy'],0);
      var defDragonry = isEmpty(Seed.s.research['Dragonry'],0);
      var defAerialCombat = isEmpty(Seed.s.research['AerialCombat'],0);
    }

    //logit ('attRapidDeployment : '+Data.BattleSimu.ennemyResearch['RapidDeployment']);
    //logit ('attWeaponCalibration : '+Data.BattleSimu.ennemyResearch['Ballistics']);
    //logit ('attMedicine : '+Data.BattleSimu.ennemyResearch['Medicine']);
    //logit ('attMetallurgy : '+Data.BattleSimu.ennemyResearch['Metallurgy']);
    //logit ('attDragonry : '+Data.BattleSimu.ennemyResearch['Dragonry']);
    //logit ('attAerialCombat : '+Data.BattleSimu.ennemyResearch['AerialCombat']);

    //logit ('defRapidDeployment : '+isEmpty(Seed.s.research['RapidDeployment'],0));
    //logit ('defWeaponCalibration : '+isEmpty(Seed.s.research['Ballistics'],0));
    //logit ('defMedicine : '+isEmpty(Seed.s.research['Medicine'],0));
    //logit ('defMetallurgy : '+isEmpty(Seed.s.research['Metallurgy'],0));
    //logit ('defDragonry : '+isEmpty(Seed.s.research['Dragonry'],0));
    //logit ('defAerialCombat : '+isEmpty(Seed.s.research['AerialCombat'],0));

    // Load troop statistics from manifest
    for (var i=0; i<t.troopList.length; i++){
      if ((t.troopList[i] != 'GreatDragon') && (t.troopList[i] != 'WaterDragon') && 
          (t.troopList[i] != 'StoneDragon') && (t.troopList[i] != 'FireDragon') && (t.troopList[i] != 'WindDragon')) {
        var dfltMeleeDamage = t.troopDefault[t.troopList[i]].meleeDamage;
        var dfltRangeDamage = t.troopDefault[t.troopList[i]].rangeDamage;
        var dfltDefense     = t.troopDefault[t.troopList[i]].defense;
        var dfltLife        = t.troopDefault[t.troopList[i]].life;
        var dfltRange       = t.troopDefault[t.troopList[i]].range;
        var dfltSpeed       = t.troopDefault[t.troopList[i]].speed;
        try {
          var dfltMeleeDamage = Seed.troops.stats[Names.troops.byName[t.troopList[i]][1]].melee;
          var dfltRangeDamage = Seed.troops.stats[Names.troops.byName[t.troopList[i]][1]].ranged;
          var dfltDefense     = Seed.troops.stats[Names.troops.byName[t.troopList[i]][1]].defense;
          var dfltLife        = Seed.troops.stats[Names.troops.byName[t.troopList[i]][1]].life;
          var dfltRange       = Seed.troops.stats[Names.troops.byName[t.troopList[i]][1]].range;
          var dfltSpeed       = Seed.troops.stats[Names.troops.byName[t.troopList[i]][1]].speed;
        }
        catch(e){
          actionLog('Troops statistics for + ' + Names.troops.byName[t.troopList[i]][1] + ': ' + e.msg + ' Manifest not available, using defaults');
        }
        t.troopDefault[t.troopList[i]].meleeDamage = dfltMeleeDamage;
        t.troopDefault[t.troopList[i]].rangeDamage = dfltRangeDamage;
        t.troopDefault[t.troopList[i]].defense     = dfltDefense;
        t.troopDefault[t.troopList[i]].life        = dfltLife;
        t.troopDefault[t.troopList[i]].range       = dfltRange;
        t.troopDefault[t.troopList[i]].speed       = dfltSpeed;
      }
    }

    // Main initialization
    for (var i=0; i<t.troopList.length; i++){
      var dfltMeleeDamage = t.troopDefault[t.troopList[i]].meleeDamage;
      var dfltRangeDamage = t.troopDefault[t.troopList[i]].rangeDamage;
      var dfltDefense     = t.troopDefault[t.troopList[i]].defense;
      var dfltLife        = t.troopDefault[t.troopList[i]].life;
      var dfltRange       = t.troopDefault[t.troopList[i]].range;
      var dfltSpeed       = t.troopDefault[t.troopList[i]].speed;
      if ( (t.troopList[i] == 'GreatDragon') || (t.troopList[i] == 'WaterDragon') ||
           (t.troopList[i] == 'StoneDragon') || (t.troopList[i] == 'FireDragon') || (t.troopList[i] == 'WindDragon') )
        loadGreatDragonStats (Data.BattleSimu.attackUnits, t.troopList[i], Data.BattleSimu.attDragLevel);
      // Attack troops initialization : Set characteristics based on default characteristics + research upgrades
      switch (t.troopList[i]) {
        case 'SwiftStrikeDragon':
        case 'BattleDragon' : var speedmultiplier = attDragonry; break;
        case 'GreatDragon' :
        case 'WaterDragon' :
        case 'StoneDragon' :
        case 'FireDragon' : 
        case 'WindDragon' : var speedmultiplier = attAerialCombat; break;
        default: var speedmultiplier = attRapidDeployment; break;
      }
      Data.BattleSimu.attackUnits[t.troopList[i]].meleeDamage = applyUpgrade (dfltMeleeDamage, (5 * attMetallurgy));
      Data.BattleSimu.attackUnits[t.troopList[i]].rangeDamage = applyUpgrade (dfltRangeDamage, (5 * attMetallurgy));
      Data.BattleSimu.attackUnits[t.troopList[i]].defense     = applyUpgrade (dfltDefense, (5 * attMetallurgy));
      Data.BattleSimu.attackUnits[t.troopList[i]].life        = applyUpgrade (dfltLife, (5 * attMedicine));
      Data.BattleSimu.attackUnits[t.troopList[i]].range       = applyUpgrade (dfltRange, (5 * attWeaponCalibration));
      Data.BattleSimu.attackUnits[t.troopList[i]].speed       = applyUpgrade (dfltSpeed, (5 * speedmultiplier));
      // Items modifiers
      for (var itm=0; itm<t.itemList.length; itm++){
        switch (t.itemList[itm]) {
          case 'DragonHearts' :
            if ((Data.BattleSimu.attackItems[itm]) &&
                (t.troopList[i] != 'GreatDragon') && (t.troopList[i] != 'WaterDragon') && 
                (t.troopList[i] != 'StoneDragon') && (t.troopList[i] != 'FireDragon') && (t.troopList[i] != 'WindDragon')) {
              Data.BattleSimu.attackUnits[t.troopList[i]].meleeDamage = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].meleeDamage, 20);
              Data.BattleSimu.attackUnits[t.troopList[i]].rangeDamage = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].rangeDamage, 20);
            }
            break;
          case 'GlowingShields' : 
            if ((Data.BattleSimu.attackItems[itm]) &&
                (t.troopList[i] != 'GreatDragon') && (t.troopList[i] != 'WaterDragon') && 
                (t.troopList[i] != 'StoneDragon') && (t.troopList[i] != 'FireDragon') && (t.troopList[i] != 'WindDragon')) {
              Data.BattleSimu.attackUnits[t.troopList[i]].defense = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].defense, 20);
            }
            break;
          case 'PurpleBones' : 
            if ((Data.BattleSimu.attackItems[itm]) &&
                (t.troopList[i] == 'GreatDragon') || (t.troopList[i] == 'WaterDragon') ||
                (t.troopList[i] == 'StoneDragon') || (t.troopList[i] == 'FireDragon') || (t.troopList[i] == 'WindDragon')) {
              Data.BattleSimu.attackUnits[t.troopList[i]].defense = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].defense, 20);
            }
            break;
          case 'CrimsonBull' : 
            if ((Data.BattleSimu.attackItems[itm]) &&
                (t.troopList[i] == 'GreatDragon') || (t.troopList[i] == 'WaterDragon') ||
                (t.troopList[i] == 'StoneDragon') || (t.troopList[i] == 'FireDragon') || (t.troopList[i] == 'WindDragon')) {
              Data.BattleSimu.attackUnits[t.troopList[i]].meleeDamage = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].meleeDamage, 20);
              Data.BattleSimu.attackUnits[t.troopList[i]].rangeDamage = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].rangeDamage, 20);
            }
            break;
          default:break;
        }
      }
      // General upgrades
      var genPrct = Data.BattleSimu.ennemyGeneral * 4;
      Data.BattleSimu.attackUnits[t.troopList[i]].meleeDamage = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].meleeDamage, genPrct);
      Data.BattleSimu.attackUnits[t.troopList[i]].rangeDamage = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].rangeDamage, genPrct);
      Data.BattleSimu.attackUnits[t.troopList[i]].defense     = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].defense, genPrct);
      Data.BattleSimu.attackUnits[t.troopList[i]].life        = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].life, genPrct);
      Data.BattleSimu.attackUnits[t.troopList[i]].range       = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].range, genPrct);
      Data.BattleSimu.attackUnits[t.troopList[i]].speed       = applyUpgrade (Data.BattleSimu.attackUnits[t.troopList[i]].speed, genPrct);

      // Search for max speed
      if ((Data.BattleSimu.attackUnits[t.troopList[i]].range > maxRange) && (Data.BattleSimu.attackUnits[t.troopList[i]].qty > 0) &&
          (t.troopList[i] != 'GreatDragon') && (t.troopList[i] != 'WaterDragon') && (t.troopList[i] != 'StoneDragon') &&
		  (t.troopList[i] != 'FireDragon') && (t.troopList[i] != 'WindDragon'))
        maxRange = Data.BattleSimu.attackUnits[t.troopList[i]].range;
      t.attackAlives[t.troopList[i]].qty     = Data.BattleSimu.attackUnits[t.troopList[i]].qty;
      t.attackAlives[t.troopList[i]].defense = Data.BattleSimu.attackUnits[t.troopList[i]].qty * Data.BattleSimu.attackUnits[t.troopList[i]].defense;
      t.attackAlives[t.troopList[i]].life    = Data.BattleSimu.attackUnits[t.troopList[i]].qty * Data.BattleSimu.attackUnits[t.troopList[i]].life;
      t.attackLosts[t.troopList[i]].qty      = 0;
      t.attackLosts[t.troopList[i]].defense  = 0;
      t.attackLosts[t.troopList[i]].life     = 0;

      // Defense troops initialization : Set characteristics based on default characteristics + research upgrades
      if ( (t.troopList[i] == 'GreatDragon') || (t.troopList[i] == 'WaterDragon') ||
           (t.troopList[i] == 'StoneDragon') || (t.troopList[i] == 'FireDragon') || (t.troopList[i] == 'WindDragon') )
        loadGreatDragonStats (Data.BattleSimu.defenseUnits, t.troopList[i], Data.BattleSimu.defDragLevel);
      if (t.troopList[i] == 'FireDragon') logit ('FireDragon : '+inspect(Data.BattleSimu.defenseUnits[t.troopList[i]]));
      switch (t.troopList[i]) {
        case 'SwiftStrikeDragon':
        case 'BattleDragon' : var speedmultiplier = defDragonry; break;
        case 'GreatDragon' :
        case 'WaterDragon' :
        case 'StoneDragon' :
        case 'FireDragon' : 
        case 'WindDragon' : var speedmultiplier = defAerialCombat; break;
        default: var speedmultiplier = defRapidDeployment; break;
      }
      Data.BattleSimu.defenseUnits[t.troopList[i]].meleeDamage = applyUpgrade (dfltMeleeDamage, (5 * defMetallurgy));
      Data.BattleSimu.defenseUnits[t.troopList[i]].rangeDamage = applyUpgrade (dfltRangeDamage, (5 * defMetallurgy));
      Data.BattleSimu.defenseUnits[t.troopList[i]].defense     = applyUpgrade (dfltDefense, (5 * defMetallurgy));
      Data.BattleSimu.defenseUnits[t.troopList[i]].life        = applyUpgrade (dfltLife, (5 * defMedicine));
      Data.BattleSimu.defenseUnits[t.troopList[i]].range       = applyUpgrade (dfltRange, (5 * defWeaponCalibration));
      Data.BattleSimu.defenseUnits[t.troopList[i]].speed       = applyUpgrade (dfltSpeed, (5 * speedmultiplier));
      // Items modifiers
      for (var itm=0; itm<t.itemList.length; itm++){
        switch (t.itemList[itm]) {
          case 'DragonHearts' :
            if ((Data.BattleSimu.defenseItems[itm]) &&
                (t.troopList[i] != 'GreatDragon') && (t.troopList[i] != 'WaterDragon') && 
                (t.troopList[i] != 'StoneDragon') && (t.troopList[i] != 'FireDragon') && (t.troopList[i] != 'WindDragon')) {
              Data.BattleSimu.defenseUnits[t.troopList[i]].meleeDamage = applyUpgrade (Data.BattleSimu.defenseUnits[t.troopList[i]].meleeDamage, 20);
              Data.BattleSimu.defenseUnits[t.troopList[i]].rangeDamage = applyUpgrade (Data.BattleSimu.defenseUnits[t.troopList[i]].rangeDamage, 20);
            }
            break;
          case 'GlowingShields' : 
            if ((Data.BattleSimu.defenseItems[itm]) &&
                (t.troopList[i] != 'GreatDragon') && (t.troopList[i] != 'WaterDragon') &&
                (t.troopList[i] != 'StoneDragon') && (t.troopList[i] != 'FireDragon') && (t.troopList[i] != 'WindDragon')) {
              Data.BattleSimu.defenseUnits[t.troopList[i]].defense     = applyUpgrade (Data.BattleSimu.defenseUnits[t.troopList[i]].defense, 20);
            }
            break;
          case 'PurpleBones' : 
            if ((Data.BattleSimu.defenseItems[itm]) &&
                (t.troopList[i] == 'GreatDragon') || (t.troopList[i] == 'WaterDragon') ||
                (t.troopList[i] == 'StoneDragon') || (t.troopList[i] == 'FireDragon') || (t.troopList[i] == 'WindDragon')) {
              Data.BattleSimu.defenseUnits[t.troopList[i]].defense     = applyUpgrade (Data.BattleSimu.defenseUnits[t.troopList[i]].defense, 20);
            }
            break;
          case 'CrimsonBull' : 
            if ((Data.BattleSimu.defenseItems[itm]) &&
                (t.troopList[i] == 'GreatDragon') || (t.troopList[i] == 'WaterDragon') ||
                (t.troopList[i] == 'StoneDragon') || (t.troopList[i] == 'FireDragon') || (t.troopList[i] == 'WindDragon')) {
              Data.BattleSimu.defenseUnits[t.troopList[i]].meleeDamage = applyUpgrade (Data.BattleSimu.defenseUnits[t.troopList[i]].meleeDamage, 20);
              Data.BattleSimu.defenseUnits[t.troopList[i]].rangeDamage = applyUpgrade (Data.BattleSimu.defenseUnits[t.troopList[i]].rangeDamage, 20);
            }
            break;
          default:break;
        }
      }
      t.defenseAlives[t.troopList[i]].qty     = Data.BattleSimu.defenseUnits[t.troopList[i]].qty;
      t.defenseAlives[t.troopList[i]].defense = Data.BattleSimu.defenseUnits[t.troopList[i]].qty * Data.BattleSimu.defenseUnits[t.troopList[i]].defense;
      t.defenseAlives[t.troopList[i]].life    = Data.BattleSimu.defenseUnits[t.troopList[i]].qty * Data.BattleSimu.defenseUnits[t.troopList[i]].life;
      t.defenseLosts[t.troopList[i]].qty      = 0;
      t.defenseLosts[t.troopList[i]].defense  = 0;
      t.defenseLosts[t.troopList[i]].life     = 0;
    }

    // Initialize terrain length and defense unit position
    t.terrainLength = 500 + maxRange;
    t.log ('', kBatLogTerrain + t.terrainLength, kBatLogStart);
    for (var i=0; i<t.troopList.length; i++) {
      Data.BattleSimu.attackUnits[t.troopList[i]].x = 0;
      Data.BattleSimu.defenseUnits[t.troopList[i]].x = t.terrainLength;

//      if (Data.BattleSimu.attackUnits[t.troopList[i]].qty > 0)
//        logit ('attackAlives[t.troopList[i]] : '+t.troopList[i]+' : '+inspect(t.attackAlives[t.troopList[i]]));
//        logit ('attackUnits[t.troopList[i]] : '+t.troopList[i]+' : '+inspect(Data.BattleSimu.attackUnits[t.troopList[i]]));
//      if (Data.BattleSimu.defenseUnits[t.troopList[i]].qty > 0)
//        logit ('defenseUnits[t.troopList[i]] : '+t.troopList[i]+' : '+inspect(Data.BattleSimu.defenseUnits[t.troopList[i]]));
    }
    Data.BattleSimu.battleTurn = 0;

    // Do battle turns
    while (!t.battleStop) {
      Data.BattleSimu.battleTurn++;
      t.log (kBatLogAttMoveTurn, '', '<B>' + Data.BattleSimu.battleTurn + '</B>');
      t.attackMoveTurn ();
      t.log (kBatLogAttackTurn, '', '');
      t.attackTurn ();
      if (!t.battleStop) {
        t.log (kBatLogDefMoveTurn, '', '');
        t.defenseMoveTurn ();
        t.log (kBatLogDefattackTurn, '', '');
        t.defenseTurn ();
        t.log ('', '', '');
      }
    }
    var winner = kBatLogLost;
    if (t.battleWinner == Data.options.battle.ownStatus)
      winner = kBatLogWin;
    t.log ('<SPAN class=' + idBoldRed + '12>' + winner + '</SPAN>', '', kBatLogEnd);
  },

  attackTurn : function () {
    var t = Tabs.Battle;
    var boolExists = true;
    t.logLine = '';
    // For each unit type
    for (var i=0; i<t.meleeListByPrior.length; i++) {
      var attPos = Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].x;
      var attQty = t.attackAlives[t.meleeListByPrior[i]].qty;
      var attSpeed = Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].speed;
      var attRange = Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].range;
      var attMaxMeleeDamage = Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].meleeDamage * attQty;
      var attMaxRangeDamage = Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].rangeDamage * attQty;
      // if troop number = 0, nothing to do
      if (attQty > 0) {
        // Check again if ennemy troops in attack range. If troops in range, then attack it.
        if (t.checkInAttackRange ((attRange + attPos), Data.BattleSimu.defenseUnits, t.defenseAlives)) {
          t.dealDamage ('A', t.meleeListByPrior[i], attPos, attRange, attMaxMeleeDamage, attMaxRangeDamage, Data.BattleSimu.defenseUnits, t.defenseAlives, t.defenseLosts);
        }
        if (t.logLine != '') t.log ('', t.logLine, '');
        t.logLine = '';
      }
    }
    // Check for survival ennemy units
    boolExists = false;
    for (i=0; i<t.troopList.length; i++) {
      var nCount = t.defenseAlives[t.troopList[i]].qty;
      if (nCount > 0){
        boolExists = true;
        return;
      }
    }
    if (!boolExists){
      t.battleStop = true;
      t.battleWinner = 0;
    }
  },

  attackMoveTurn : function () {
    var t = Tabs.Battle;
    var boolExists = true;
    t.logLine = '';
    // For each unit type
    for (var i=0; i<t.meleeListByPrior.length; i++) {
      var attPos = Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].x;
      var attQty = t.attackAlives[t.meleeListByPrior[i]].qty;
      var attSpeed = Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].speed;
      var attRange = Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].range;
      var attMeleeDmg = Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].meleeDamage;
      var attRangeDmg = Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].rangeDamage;
      // if troop number = 0, nothing to do
      if (attQty > 0) {
        // get closest ennemy's position
        var minPos = t.terrainLength;
        for (var m=0; m<t.meleeListByPrior.length; m++) {
          if ((Data.BattleSimu.defenseUnits[t.troopList[m]].x < minPos) && (t.defenseAlives[t.troopList[m]].qty > 0))
            minPos = Data.BattleSimu.defenseUnits[t.troopList[m]].x;
        }
        if (attMeleeDmg > attRangeDmg) attRange = 0;
        // Check if ennemy troops in attack range. If no troops in range, move forward.
        if ((!t.checkInAttackRange ((attRange + attPos), Data.BattleSimu.defenseUnits, t.defenseAlives)) && (attPos < t.terrainLength)) {
          if ((attPos + attSpeed) > minPos)
            attPos = minPos;
          else {  // other case, troop is avancing at normal speed
            attPos = attPos + attSpeed;
          }
          if (attPos > t.terrainLength) attPos = t.terrainLength;
          Data.BattleSimu.attackUnits[t.meleeListByPrior[i]].x = attPos;
          t.logLine = translate(Names.troops.byName[t.meleeListByPrior[i]][1]) + kBatLogMoveTo + attPos;
        }
        if (t.logLine != '') t.log ('', t.logLine, '');
        t.logLine = '';
      }
    }
  },

  checkInAttackRange : function (range, trplist, trpAlives) {
    var t = Tabs.Battle;
    var exists = false;
    // For each unit type
    for (var r=0; r<t.troopList.length; r++) {
      var trpPos = trplist[t.troopList[r]].x;
      var trpQty = trpAlives[t.troopList[r]].qty;
      if (trpPos <= range && trpQty > 0) {
        exists = true;
//        return;
      }
    }
    return exists;
  },

  dealDamage : function (who, attacker, pos, range, mDamage, rDamage, trplist, trpAlives, trpLosts) {
    var t = Tabs.Battle;
    var done = false;
    var melee = false;
    var meleeHits = mDamage;
    var rangeHits = rDamage;
    var left = (t.logLine == '') ? translate(Names.troops.byName[attacker][1]) : ',';
    // For each unit type, deal first melee damages if any
    for (var i=0; i<t.meleeListByPrior.length; i++) {
      var nLosts = 0;
      if (!done) {
        var trpRemainQty  = trpAlives[t.meleeListByPrior[i]].qty;
        var trpRemainDef  = trpAlives[t.meleeListByPrior[i]].defense;
        var trpRemainLife = trpAlives[t.meleeListByPrior[i]].life;
        var trpPos  = trplist[t.meleeListByPrior[i]].x;
        var trpDef  = trplist[t.meleeListByPrior[i]].defense;
        var trpLife = trplist[t.meleeListByPrior[i]].life;
        if ((trpPos <= pos && trpRemainLife > 0 && who == 'A') ||
            (trpPos >= pos && trpRemainLife > 0 && who == 'D')) { // Troops are in contact => Deal melee damages
          melee = true;
          if (meleeHits >= trpRemainDef){
            var realDamage = trpRemainDef;
            trpRemainDef = 0;
          } else {
            var realDamage = meleeHits;
            trpRemainDef = trpRemainDef - meleeHits;
          }
          trpAlives[t.meleeListByPrior[i]].defense = trpRemainDef;
          trpLosts[t.meleeListByPrior[i]].defense  = trpLosts[t.meleeListByPrior[i]].defense  + realDamage;
          meleeHits = meleeHits - realDamage;
          if (meleeHits > 0) {
            if (meleeHits >= trpRemainLife){
              realDamage    = realDamage + trpRemainLife;
              meleeHits     = meleeHits - trpRemainLife;
              nLosts        = trpAlives[t.meleeListByPrior[i]].qty;
              trpAlives[t.meleeListByPrior[i]].life = 0;
              trpLosts[t.meleeListByPrior[i]].life = trpLosts[t.meleeListByPrior[i]].life + trpRemainLife;
              trpRemainLife = 0;
            } else {
              realDamage    = realDamage + meleeHits;
              trpRemainLife = trpRemainLife - meleeHits;
              nLosts        = Math.round (meleeHits / trpLife);
              trpAlives[t.meleeListByPrior[i]].life = trpRemainLife;
              trpLosts[t.meleeListByPrior[i]].life  = trpLosts[t.meleeListByPrior[i]].life  + meleeHits;
              meleeHits     = 0;
            }
          }
          if (realDamage > 0)
            t.logLine += left + kBatLogDeal + nombreFormate(realDamage,' ') + kDamageTo + translate(Names.troops.byName[t.meleeListByPrior[i]][1]) + kBatLogInMelee;
          if (meleeHits > 0) {
            done = false;
            left = ',';
          } else done = true;
        }
        if (nLosts > 0) {
          trpAlives[t.meleeListByPrior[i]].qty = trpAlives[t.meleeListByPrior[i]].qty - nLosts;
          trpLosts[t.meleeListByPrior[i]].qty  = trpLosts[t.meleeListByPrior[i]].qty + nLosts;
          t.logLine += kBatLogKill + nombreFormate(nLosts,' ') + ', ' + nombreFormate(trpAlives[t.meleeListByPrior[i]].qty,' ') + kBatLogSurvivals;
        }
      }
    }
    if (!melee) {
      // For each unit type, deal range damages if any and if no melee damages done
      for (var i=0; i<t.rangeListByPrior.length; i++) {
        var nLosts = 0;
        if (!done) {
          var trpRemainQty  = trpAlives[t.rangeListByPrior[i]].qty;
          var trpRemainDef  = trpAlives[t.rangeListByPrior[i]].defense;
          var trpRemainLife = trpAlives[t.rangeListByPrior[i]].life;
          var trpPos  = trplist[t.rangeListByPrior[i]].x;
          var trpDef  = trplist[t.rangeListByPrior[i]].defense;
          var trpLife = trplist[t.rangeListByPrior[i]].life;
          if (((trpPos <= (pos + range)) && (trpRemainLife > 0) && (rDamage > 0) && (who == 'A')) ||
              ((trpPos >= (pos - range)) && (trpRemainLife > 0) && (rDamage > 0) && (who == 'D'))) { // Troops are in range but not close  => Deal range damages
            if (rangeHits >= trpRemainDef){
              var realDamage = trpRemainDef;
              trpRemainDef = 0;
            } else {
              var realDamage = rangeHits;
              trpRemainDef = trpRemainDef - rangeHits;
            }
            trpAlives[t.rangeListByPrior[i]].defense = trpRemainDef;
            trpLosts[t.rangeListByPrior[i]].defense  = trpLosts[t.rangeListByPrior[i]].defense  + realDamage;
            rangeHits = rangeHits - realDamage;
            if (rangeHits > 0) {
              if (rangeHits >= trpRemainLife){
                realDamage    = realDamage + trpRemainLife;
                rangeHits     = rangeHits - trpRemainLife;
                nLosts        = trpAlives[t.rangeListByPrior[i]].qty;
                trpAlives[t.rangeListByPrior[i]].life = 0;
                trpLosts[t.rangeListByPrior[i]].life = trpLosts[t.rangeListByPrior[i]].life + trpRemainLife;
                trpRemainLife = 0;
              } else {
                realDamage    = realDamage + rangeHits;
                trpRemainLife = trpRemainLife - rangeHits;
                nLosts        = Math.round (rangeHits / trpLife);
                trpAlives[t.rangeListByPrior[i]].life = trpRemainLife;
                trpLosts[t.rangeListByPrior[i]].life  = trpLosts[t.rangeListByPrior[i]].life  + rangeHits;
                rangeHits     = 0;
              }
            }
            if (realDamage > 0)
              t.logLine += left + kBatLogDeal + nombreFormate(realDamage,' ') + kDamageTo + translate(Names.troops.byName[t.rangeListByPrior[i]][1]) + kBatLogAtRange;
            if (rangeHits > 0) {
              done = false;
              left = ',';
            } else done = true;
          }
          if (nLosts > 0) {
            trpAlives[t.rangeListByPrior[i]].qty = trpAlives[t.rangeListByPrior[i]].qty - nLosts;
            trpLosts[t.rangeListByPrior[i]].qty  = trpLosts[t.rangeListByPrior[i]].qty + nLosts;
            t.logLine += kBatLogKill + nombreFormate(nLosts,' ') + ', ' + nombreFormate(trpAlives[t.rangeListByPrior[i]].qty,' ') + kBatLogSurvivals;
          }
        }
      }
    }
  },

  defenseTurn : function () {
    var t = Tabs.Battle;
    var boolExists = true;
    t.logLine = '';
    // For each unit type
    for (var i=0; i<t.meleeListByPrior.length; i++) {
      var defPos = Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].x;
      var defQty = t.defenseAlives[t.meleeListByPrior[i]].qty;
      var defSpeed = Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].speed;
      var defRange = Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].range;
      var defMaxMeleeDamage = Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].meleeDamage * defQty;
      var defMaxRangeDamage = Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].rangeDamage * defQty;
      // if troop number = 0, nothing to do
      if (defQty > 0) {
        // Check if ennemy troops in attack range. If troops in range, then attack it.
        if (t.checkInDefenseRange ((defPos - defRange), Data.BattleSimu.attackUnits, t.attackAlives)) {
          t.dealDamage ('D', t.meleeListByPrior[i], defPos, defRange, defMaxMeleeDamage, defMaxRangeDamage, Data.BattleSimu.attackUnits, t.attackAlives, t.attackLosts);
        }
        if (t.logLine != '') t.log ('', t.logLine, '');
        t.logLine = '';
      }
    }
    // Check for survival ennemy units
    boolExists = false;
    for (i=0; i<t.troopList.length; i++) {
      var nCount = t.attackAlives[t.troopList[i]].qty;
      if (nCount > 0){
        boolExists = true;
        return;
      }
    }
    if (!boolExists){
      t.battleStop = true;
      t.battleWinner = 1;
    }
  },

  defenseMoveTurn : function () {
    var t = Tabs.Battle;
    var boolExists = true;
    t.logLine = '';
    // For each unit type
    for (var i=0; i<t.meleeListByPrior.length; i++) {
      var defPos = Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].x;
      var defQty = t.defenseAlives[t.meleeListByPrior[i]].qty;
      var defSpeed = Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].speed;
      var defRange = Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].range;
      var defMeleeDmg = Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].meleeDamage;
      var defRangeDmg = Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].rangeDamage;
      // if troop number = 0, nothing to do
      if (defQty > 0) {

        // get closest ennemy's position
        var maxPos = t.terrainLength;
        for (var m=0; m<t.meleeListByPrior.length; m++) {
          if ((Data.BattleSimu.attackUnits[t.troopList[m]].x > maxPos) && (t.attackAlives[t.troopList[m]].qty > 0))
            maxPos = Data.BattleSimu.attackUnits[t.troopList[m]].x;
        }
        if (defMeleeDmg > defRangeDmg) defRange = 0;
        // Check if ennemy troops in attack range. If no troops in range, move forward.
        if ((!t.checkInDefenseRange ((defPos - defRange), Data.BattleSimu.attackUnits, t.attackAlives)) && (defPos > 0)) {
          // get highest x pos from attacker's troops
          if ((defPos - defSpeed) < maxPos) // Defense troop will engage attacker in close combat
            defPos = maxPos;
          else {
            defPos = defPos - defSpeed;
            if (defPos < 0) defPos = 0;
          }
          Data.BattleSimu.defenseUnits[t.meleeListByPrior[i]].x = defPos;  // Vérifier si on se déplace jusqu'à la troupe à portée la plus proche ou non
          t.logLine = translate(Names.troops.byName[t.meleeListByPrior[i]][1]) + kBatLogMoveTo + defPos;
        }
        if (t.logLine != '') t.log ('', t.logLine, '');
        t.logLine = '';
      }
    }
  },

  checkInDefenseRange : function (range, trplist, trpAlives) {
    var t = Tabs.Battle;
    var exists = false;
    // For each unit type
    for (var r=0; r<t.troopList.length; r++) {
      var trpPos = trplist[t.troopList[r]].x;
      var trpQty = trpAlives[t.troopList[r]].qty;
      if (trpPos >= range && trpQty > 0) {
        exists = true;
//        return;
      }
    }
    return exists;
  },


  /** BATTLE RULES SUB-TAB ***/
  tabBattleRules : function (){
    var t = Tabs.Battle;

    setSubTab(battlePrefix + 'Config', false);
    setSubTab(battlePrefix + 'Result', false);
    setSubTab(battlePrefix + 'Log',    false);
    setSubTab(battlePrefix + 'Rules',  true);
    t.contentType = 3;
    Data.options.battleTab = t.contentType;

    var m = '<DIV class=' + idTitle + '>' + kBattleRules + '</div>\
          <DIV style="height:570px; max-height:570px; overflow-y:auto">\
          <TABLE class=' + idTabPad + ' style="margin-top:3px" width=100%>\
          <TR><TD><BR><DIV align=left style="color:#000000">';
    if ( navigator.language == 'fr' ) {
      m += 'La longueur du terrain est initialisée à <B>500 + portée maximale des unités offensives</B>.<BR>\
           Si il n\'y a que des unités de coprs-à-corps sélectionnées en attaque, la longueur du terrain sera initialisée à 500.<BR>\
           <BR>\
           Le tour de chaque joueur est composé d\'une phase de déplacement + une phase de combat.<BR>\
           Les unités offensives ont l\'initiative et se déplacent donc en premier.<BR>\
           <BR>\
           <B>Phase de déplacement :</B><BR>\
           - Chaque unité encore en vie va vérifier s\'il existe des unités ennemies à portée (en corps-à-corps ou à distance).\
           - Si aucune unité ennemie à portée, alors elle se déplace.<BR>\
           - S\'il existe au moins une unité ennemie à portée, alors l\'unité ne se déplace pas.<BR>\
           <BR>\
           - Au début du combat les unités offensives commencent à la position 0 ; les unités défensives à la position maximale du terrain (donc à la position égale à la longueur du terrain).<BR>\
           - Chaque unité se déplace de sa vitesse maximale à chaque fois sauf si elle rencontre une unité ennemie avec laquelle elle peut engager un corps-à-corps.<BR>\
           <BR>\
           <B>Phase de combat :</B><BR>\
           - Chaque unité encore en vie va vérifier s\'il existe des unités ennemies à portée (en corps-à-corps ou à distance).\
           - Sìl existe une unité ennemie à portée, l\'attaque est lancée.<BR>\
           <BR>\
           <B>Statistiques des unités :</B><BR>\
           - Objets modificateurs.<BR>\
           - Général.<BR>\
           <BR>\
           <B>Points particuliers :</B><BR>\
           - Utilité des remparts : Franchement ? Là, je vois pas... \
           Après plusieurs tests, les résultats semblent cohérents avec les rapports de bataille réels obtenus.\
           Or comme la simulation ne prend pas en compte le rempart...<BR>\
           - Questions en suspens : Ordre des unités qui subissent les dégâts ? Ordre des unités lors de la phase d\'attaque (qui frappe en premier) ?\
           ...';
    }
    m += '</div></TD></TR></table></div></div>';
    document.getElementById(battlePrefix + 'Cont').innerHTML = m; 
  },

};
//*********************************** Battle Simulation Tab *********************************************
// End Jawz


// initScript statup function call
// Jawz - Added test on URL in order to avoid the call of dtStartup on every opened web page
if (document.URL.search(/apps.facebook.com\/dragonsofatlantis/i) >= 0 || document.URL.search(/.castle.wonderhill.com/i) >= 0)
  setTimeout (dtStartup, 5000);
}
})();