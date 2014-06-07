// ==UserScript==
// @name           Dragon Heart
// @namespace      CristalCode Drags
// @icon           http://www.draconian.com/artwork/icons/1tailorange.gif
// @include        http://*.castle.wonderhill.com/*
// @include        http://apps.facebook.com/dragonsofatlantis/*
// @match          http://*.castle.wonderhill.com/*
// @match          http://apps.facebook.com/dragonsofatlantis/*
// @description    Edit MalganiZ
// @version        v17
// ==/UserScript==
(function() {

var Version = '16/09/2011';
var Title = 'Dragon Heart';
var WebSite = 'www.CristalCode.info';
var Publi = '#DoAPower';
var VERSION_CHECK_HOURS = 4;
var DEBUG_TRACE_AJAX = 2;
var DEBUG_MARCHES = false;
var MAP_DELAY = 500;
var MIN_CAMP_DELAY = 5;
var EMULATE_NET_ERROR = 0;  // percentage
var ENABLE_DEBUG_TAB = false;
var ENABLE_WINLOG = false;
var ALERT_ON_BAD_DATA = false;
var VERSION_DE_JUEGO = 17;

// Tab order
var INFO_TAB_ORDER = 1;
var WAVE_TAB_ORDER = 2;
var ATTACK_TAB_ORDER = 3;
var RESEARCH_TAB_ORDER = 4;
var BUILD_TAB_ORDER = 5;
var RESEARCH_TAB_ORDER = 6; 
var AZAR_TAB_ORDER = 7;
var LOG_TAB_ORDER = 8;
var OPTIONS_TAB_ORDER = 9;
var TRAIN_TAB_ORDER = 10;
var DEBUG_TAB_ORDER = 99;

// Enable/Disable tabs
var ENABLE_INFO_TAB = true;
var ENABLE_WAVE_TAB = true;
var ENABLE_ATTACK_TAB = true;
var ENABLE_JOB_TAB = false;
var ENABLE_BUILD_TAB = true;
var ENABLE_RESEARCH_TAB = false;
var ENABLE_TRAIN_TAB = true;
var ENABLE_OPTIONS_TAB = true;
var ENABLE_LOG_TAB = true;
var ENABLE_DEBUG_TAB = false;

var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

var MESSAGES_ALL=0;
var MESSAGES_ONLY=1;
var REPORTS_ONLY=2;
var MSG_BATTLE_REPORT=1;
var TRANSPORT_MARCH_REPORT=2;
var SPY_REPORT=3;
var SENTINEL_WARNING=4;
var REINFORCEMENTS_REPORT=5;
var SYSTEM_MESSAGE=6;
var PLAYER_MESSAGE=7;
var ALLIANCE_MESSAGE=8;
var TRADING_REPORT=9;
var DEFAULT_ALERT_SOUND_URL="http://koc.god-like.info/alarm.mp3";
var DEFAULT_FF_ALERT_SOUND_URL="http://www.starbase51.co.uk/starbase51/wav/red_alert.wav";


//*********************************************************************************
// German Translation strings - will use preprocessor #ifdef to create translations
//*********************************************************************************
// Tabs
var gInfo = 'Info';	
var gWave = 'Oleada';			
var gAnt = 'Ataques';				
var gTrain = 'Tropas';		
var gBuild = 'Construir';
var gLog = 'Log';			
var gOpts = 'Extras';			

// Terrain types
var gAnthropusCamp = 'Camp.Anthropus';		
var gCity = 'Ciudad';			
var gOutpost = 'Avanzada';			
var gSavanna = 'Sabana';			
var gSwamp = 'Cienaga';				
var gLake = 'Lago';				
var gHill = 'Colina';	
var gPlain = 'Planicie';			
var gMountain = 'Montaña';			
var gForest = 'Bosque';			

// Buildings
var gHome = 'Casas';			
var gWall = 'Muralla';			
var gFactory = 'Factoria';		
var gRookery = 'Criadero';			
var gTheater = 'Teatro';			
var gFortress = 'Fortaleza';			
var gGarrison = 'Guarnicion';		
var gSentinel = 'Centinela';			
var gDragonKeep = 'Guarida del Dragon';		
var gMetalsmith = 'Fragua';			
var gMusterPoint = 'Punto de encuentro';	
var gStorageVault = 'Cámara de reserva';	
var gScienceCenter = 'Centro Cientifico';		
var gOfficerQuarter = 'Cuartel';		
var gTrainingCamp = 'Campo Entrenam.';	
var gSilo = 'Silo';			
var gFarm = 'Granja';			
var gMine = 'Mina';				
var gQuarry = 'Cantera';			
var gLumbermill = 'Aserradero';		

//Research
var gAgriculture = 'Agricultura';
var gWoodcraft = 'Carpinteria';
var gMasonry = 'Mamposteria';
var gMining = 'Aleaciones';
var gClairvoyance = 'Clarividencia';
var gRapidDeployment = 'Despliegue rapido';
var gBallistics = 'Calibracion de armas';
var gMetallurgy = 'Metaluriga';
var gMedicine = 'Medicina';
var gDragonry = 'Dragoneria';
var gLevitation = 'Levitacion';
var gMercantilism = 'Mercantilismo';
var gAerialCombat = 'Combate aereo';

// Troops				
var gPorter = 'Porteador';			
var gConscript = 'Recluta';			
var gSpy = 'Espia';				
var gHalberdsman = 'Alabardero';		
var gMinotaur = 'Minotauro';			
var gLongbowman = 'Arquero';		
var gSwiftStrikeDragon = 'D.Rapido';	
var gBattleDragon = 'D.Combate';		
var gArmoredTransport = 'T.Blindado';	
var gGiant = 'Gigante';				
var gFireMirror = 'E.Fuego';		
var gAquaTroop = 'Triton';			
var gStoneTroop = 'OgroGranit';
var gWindTroop = 'Banshee';
var gFireTroop = 'Magmasaurus';		
var gGreatDragon = 'GranDragon';		
var gWaterDragon = 'DraAgua';	
var gStoneDragon = 'DrPiedra';
var gFireDragon = 'DrFuego';
var gWindDragon = 'DrCefiro';

// Troop abbreviations
var gPorte = 'Porta';		
var gConscr = 'Reclut';		
var gSpies = 'Espia';		
var gHalbrd = 'Alabard';		
var gMino = 'Mino';		
var gLBM = 'Arquero';			
var gSSDrg = 'DRapido';		
var gBatDrg = 'DCombat';		
var gATrans = 'TBlindad';		
var gFireM = 'EFuego';		
var gFang = 'Triton';			
var gOgre = 'OgroGr';
var gPyro = 'Magma';
var gWind= 'Banshee';
var gGrtDrg = 'GranDra';			
var gWatDrg = 'DraAgua';				
var gStnDrg = 'DrPiedra';
var gFirDrg = 'DrFuego';
var gWinDrg = 'DrCefiro';

var kPorter = 'Porter';
var kConscript = 'Conscript';
var kSpy = 'Spy';
var kSpies = 'Spies';
var kHalberdsman = 'Halberdsman';
var kMinotaur = 'Minotaur';
var kLongbowman = 'Longbowman';
var kSwiftStrikeDragon = 'SwiftStrikeDragon';
var kBattleDragon = 'BattleDragon';
var kArmoredTransport = 'ArmoredTransport';
var kGiant = 'Giant';
var kFireMirror = 'FireMirror';
var kAquaTroop = 'AquaTroop';
var kStoneTroop = 'StoneTroop';
var kFireTroop = 'FireTroop';
var kWindTroop = 'WindTroop';

var kRookery = 'Rookery';
var kGarrison = 'Garrison';
var kTrainingCamp = 'TrainingCamp';
var kMetalsmith = 'Metalsmith';
var kFactory = 'Factory';

var kUnits = 'units';
//*********************************************************************************


// Global variables
var Tabs = {};
var currentName = 'Info';
var mainPop;
var CPotpUpTopClass = 'pbpelozo';
var C = {};
C.attrs = {};
var gFormatTime = ':';
var gFormatDate = '/';
var SegError = 60;

/***************************************************************************************************************/

var BusqAli = '';
var BusqJug = '';

var ENABLE_ALERTA_SENTINEL = '';
var ENABLE_ALERTA_ATAQUES  = '';

var ENABLE_ALERTA_ATAQ_CHK = false;
var ENABLE_ALERTA_TRAM_CHK = false;

var CoordAtaques = [];

/***************************************************************************************************************/

var gTower = 'Torre';	
var kAutoResearchOn = 'ENCENDIDO';
var kAutoResearchOff = 'APAGADO';

var kLevel = 'nivel ';
var kLevel1 = ' Nivel';
var kResearch = 'Investigar';
var kResearchErr = 'ERROR INVESTIGANDO: ';
var kTooManyResearchErrs = 'Demasiados errores, Desabilitando auto-investigación';

// Items
var kAquaTroopRespirator = 'AquaTroopRespirator';
var kStoneTroopItem = 'StoneTroopItem';
var kFireTroopItem = 'FireTroopItem';
var kGDBodyArmor = 'GreatDragonBodyArmor';
var kGDClawGuards = 'GreatDragonClawGuards';
var kGDHelmet = 'GreatDragonHelmet';
var kGDTailGuard = 'GreatDragonTailGuard';


var translateSPArray = {
    'Actualizar DoA':'Actualizar Juego',
    'Auto Upgrade Buildings': 'Auto-Construccion',
    'Attack One Target in Waves': 'Ataques en Oleadas a Objetivos',
    'Information': 'Investigaciones',
    'TestroniusPowder':'Polvos de Testronius',
    'GlowingShields':'Escudos incandescentes',
    'MassNullifier':'Destructor de materia',
    'RenameProclamation':'Proclama de topónimo',
    'CeaseFireTreaty':'Tratado de tregua',
    'CompletionGrant':' Acta de finalización',
    'CrimsonBull':'Toro carmesí',
    'PurpleBones':'Hueso púrpura',
    'TranceMarchDrops':'Elixir de trance 50%',
    'ForcedMarchDrops':'Elixir de marcha 25%',
    'DarkWarpDevice':'Teletransporte oscuro',
    'OutpostWarp':'Vórtice de puesto avanzado',
    'DragonHearts':'Corazón de dragón',
    'Actualizar DoA':'Actualizar Juego',
    'Auto Upgrade Buildings': 'Auto-Construccion',
    'Attack One Target in Waves': 'Ataques en Oleadas',
    'Information': 'Investigaciones',
    'Target Coords':'Coords del objetivo',
    'Troops for Wave Attack':'Tropas para atacar',
    'Delete battle reports':'Suprimir reporte de batalla',
    'Stop if any troops lost':'Parar de atacar si las tropas mueren',
    'Delay Between attacks':'Tiempo entre ataques',
    'to':'a',
    'seconds':'segundos',
    'minutes':'minutos',
    'Reset Stats':'Eliminar estadisticas',
    'Attacks OFF':'APAGADO',
    'Attacks ON':'ENCENDIDO',
    'Auto Build OFF':'APAGADO',
    'Auto Build ON':'ENCENDIDO',
    'Auto-Train ON':'ENCENDIDO',
    'Auto-Train OFF':'APAGADO',
    'Auto ON':'ENCENDIDO',
    'Auto OFF':'APAGADO',
    'Terre':'Tierras',
    'Accampamenti':'Campamentos',
    'Run Time':'Tiempo transcurrido',
    'Attacks':'Ataques',
    'Garrison':'Guarnición',
    'Home':'Casas',
    'Fortress':'Fortaleza',
    'Sentinel':'Centinela',
    'MusterPoint':'Punto de encuentro',
    'OfficerQuarter':'Cuartel',
    'StorageVault':'Cámara de reserva',
    'DragonKeep':'Guarida del Dragón',
    'Wall':'Muralla',
    'Mine':'Mina',
    'Farm':'Granja',
    'Lumbermill':'Aserradero',
    'Quarry':'Cantera',
    'TrainingCamp':'Campo de entrenamiento',
    'Silo':'Silo',
    'Metalsmith':'Fragua',
    'ScienceCenter':'Centro Científico',
    'Rookery':'Criadero',
    'Theater':'Teatro',
    'Factory':'Factoría',
    'level':'nivel',
    'Dist':'Dist',
    'Coords':'Coords',
    'Level':'Nivel',
    'UNITS':'TROPAS',
    'Wave':'Oleada',
    'AntCamp':'Campo de Antropus',
    'GENERALS':'GENERALES',
    'Marches':'Marchas',
    'Building':'Construyendo',
    'Research':'Investigando',
    'Training':'Entrenando',
    'Train':'Entrena',
    'Auto Train':'Autoentrenamiento',
    'Distance':'Distancia',
    'NONE':'NADA',
    'BUSY':'OCUPADO',
    'refresh':'Actualizar',
    'Not enough':'No hay suficiente',
    'Porter':'Porteador',
    'Conscript':'Reculta',
    'Spy':'Espía',
    'Halberdsman':'Alabardero',
    'Minotaur':'Minotauro',
    'Longbowman':'Arquero',
    'SwiftStrikeDragon':'D.Rapido',
    'BattleDragon':'D.Combate',
    'ArmoredTransport':'T.Blindado',
    'Giant':'Gigante',
    'FireMirror':'E.Fuego',
    'StoneTroop':'OgroGranit',
    'WindTroop':'Banshee',
    'GreatDragon':'Dra.Gran',
    'WaterDragon':'Dra.Agua',
    'StoneDragon':'Dra.Piedra',
    'AquaTroop':'Tritón',
    'Agriculture':'Agricultura',
    'Woodcraft':'Carpintería',
    'Masonery':'Mampostería',
    'Mining':'Aleaciones',
    'Clairvoyance':'Clarividencia',
    'RapidDeployment':'Despliegue rápido',
    'Ballistics':'Calibración de armas',
    'Metallurgy':'Metalurgia',
    'Medicine':'Medicina',
    'Dragonry':'Dragonería',
    'Levitation':'Levitación',
    'Mercantilism':'Mercantilismo',
    'AerialCombat':'Combate Aereo',
    'idle':'Vacío',
    'Lake':'Lago',
    'Grassland':'Sabana',
    'Forest':'Bosque',
    'Plain':'Planicie',
    'Hill':'Colina',
    'Mountain':'Montaña',
    'City':'Ciudad',
    'Outpost':'Avanzada',
    'Capital':'Capital',
    'Ant':'Antropus',
    'Opts':'Opciones',
    'Build':'Construir',
    'Config':'Configuración',
    'Targets':'Objetivos',
    'Stats':'Estadísticas',
    'Anthropus Camp Auto-Attacks':'Auto-Ataque Campamento Antropus',
    'Auto-attack Camp Levels':'AutoAtaque a Campamentos por Levels',
    'Auto-attack Configuration':'Configuración AutoAtaque',
    'Enable':'Activar',
    'Random delay between attacks':'Retraso entre ataques',
    'Same target delay':'Retorno a campamentos visitados',
    'Log attacks':'Registro de Ataques',
    'Delete March Reports':'Eliminar informes de marchas',
    'Stop if any troops lost':'Detener si se pierden tropas',
    'Maximum simultaneous marches':'Máximo de marchas simultáneas',
    'Enable window drag move window by dragging <BR>top bar with mouse':'Permitir mover la ventana en la barra superior <BR>con el raton',
    'Auto-collect resources at outpost every 8 hours':'Autorecolección de recursos Avanzadas',
    'Attack':'Atacar',
    'Config':'Configuración',
    'Features':'Características',
    'Sending Attack':'Ataque enviado',
    'Last Attack':'Ult.Ataque',
    'ACTION LOG':'LOG DE ACCION',
    'DOA Power Tools Options':'Opciones bot Español',
    'Auto-attack Stats':'Estadísticas de Autoataque',
    'Clear Stats':'Borrar Estadísticas',
    'Attacks':'Ataques',
    'Stats started at':'Estadísticas desde',
    'Run time':'Tiempo en curso',
    'Resources':'Recursos',
    'Stats by Camp Level':'Detalles de Ataques a Campamentos por nivel',
    'No Troops Defined':'No indicaste Tropas',
    'gold':'oro',
    'hr':'h',
    'ore':'metal',
    'food':'comida',
    'stone':'piedra',
    'wood':'madera',
    'Hop':'Brinco5m',
    'Blink':'Brinco1m',
    'Jump':'Salto',
    'Skip':'Impulso',
    'Bounce':'SaltoT8h',
    'Leap':'Pirueta',
    'WaterDragonEgg':'Huevo Dragón Agua',
    'StoneDragonEgg':'Huevo Dragón Piedra',
    'FireDragonEgg':'Huevo de Fuego',
    'WindDragonEgg':'Huevo de Cefiro',
    'GD Armor-1':'Armadura Gran Dragón',
    'GD Armor-2':'Casco Gran Dragón',
    'GD Armor-3':'Cola Gran Dragón',
    'GD Armor-4':'Garras Gran Dragón',
    'WD Armor-1':'Armadura Dragón de Agua',
    'WD Armor-2':'Casco Dragón de Agua',
    'WD Armor-3':'Cola Dragón de Agua',
    'WD Armor-4':'Garras Dragón de Agua',
    'SD Armor-1':'Armadura Dragón de Piedra',
    'SD Armor-2':'Casco Dragón de Piedra',
    'SD Armor-3':'Cola Dragón de Piedra',
    'SD Armor-4':'Garras Dragón de Piedra',
    'FireDragonBodyArmor':'Armadura Dragón de Fuego',
    'FireDragonHelmet':'Casco Dragón de Fuego',
    'FireDragonTailGuard':'Cola Dragón de Fuego',
    'FireDragonClawGuards':'Garras Dragón de Fuego',
    'WindDragonBodyArmor':'Armadura Dragon de Cefiro',
    'WindDragonHelmet':'Casco Dragon de Cefiro',
    'WindDragonTailGuard':'Cola Dragon de Cefiro',
    'WindDragonClawGuards':'Garras Dragon de Cefiro',
    'Respirators':'Respiradores',
    'Respirator-100':'100 Respiradores',
    'Respirator-500':'500 Respiradores',
    'Respirator-1000':'1000 Respiradores',
    'Mandrakes':'Mandrágoras',
    'Mandrake-100':'100 Mandrágoras',
    'Mandrake-500':'500 Mandrágoras',
    'Mandrake-1000':'1000 Mandrágoras',
    'FireTroopItem':'Runas Volcanicas',
    'FireTroopItemStack100':'100 Runas Volcanicas',
    'FireTroopItemStack500':'500 Runas Volcanicas',
    'FireTroopItemStack1000':'1000 Runas Volcanicas',
    'WindTroopItem':'Garras De Banshee',
    'WindTroopItemStack100':'100 Garras De Banshee',
    'WindTroopItemStack500':'500 Garras De Banshee',
    'WindTroopItemStak1000':'1000 Garras De Banshee',
    'Loaded':'Cargado',
    'd':'d',
    'h':'h',
    'm':'m',
    's':'s',
    'per hour':'por hora',
    'Levels':'Niveles',
    'CAMP LEVELS':'NIVELES DE CAMPAMENTO',
    'Troops lost!':'¡Se han perdido tropas!',
    'No targets/troops available':'Sin objetivos o tropas disponibles',
    'Attacking level':'Atacando nivel',
    'camp at':'Cordenadas',
    'Max Dist':'Dist Máx',
    'Attack Now':'Atacar YA',
    'Building level':'Construcción nivel',
    'of':'de',
    'at':'en',
    'Wave sent to':'Oleada enviada a',
    'Wave attack sent to':'Ataques en oleada enviado a',
    'Muster Point Full':'Punto de encuentro completo',
    'User-set maximum marches reached.':'Llegaste al limite defindo por ti de marchas',
    'marching':'en marcha',
    'returning':'volviendo',
    'encamped':'acampado',
    'Too many errors, disabling auto-train':'Demasiados errores, desactivado entrenamiento.',
    'No Generals Available':'No hay generales disponibles',
    'Escondido':'Tropas Escondidas',
    'Defendiendo':'Tropas Defendiendo',
    'Defendiendo2':'Tropas Defendiendo',
    'Outpost 1':'Avanzada de Agua',
    'Outpost 2':'Avanzada de Piedra',
    'Outpost 3':'Avanzada de Fuego',
    'Outpost 4':'Avanzada de Viento',
    'Type' : 'Tipo',
    'Arrive by' : 'Llega',
    'From' : 'Origen',
    'Alliance' : 'Alianza',
    'Troups' : 'Tropas',
    'Battle' : 'Batalla',
    'Tip-Off' : 'Espiar',
    'Check alarm' : 'Alarma cada',
    'Delete alarm after' : 'Borrar alarma cada', 
    'Enable tower alert' : 'Activar alerta',
    'Exclude spy' : 'Excluir espias',
    'Enable the sound tower alert' : 'Activar sonidos',
    'Second(s)' : 'Segundos',
    'Minute(s)' : 'Minutos',
    'Hour(s)' : 'Horas',
    'ALARM LOG' : 'Historial Alertas',
    'Day(s)' : 'Dias'
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
  centinela    : false,
  ptWinPos     : {x: 760, y: 93 },
  campAttack   : {enabled:false, repeatTime:60, delayMin:5, delayMax:65, levelEnable:[], levelDist:[null,10,10,10,10,10,10,10,10,10,10], deleteCampAttacks:false, stopAttackOnLoss:false, logAttacks:true, maxMarches:10},
  currentTab   : false,
  autoCollect  : {enabled:false, lastTime:0, delay:1, unit:3600 },
  autoBuild    : {enabled:false, buildingEnable:[] },
  autoResearch : {enabled:false, researchEnable:[]},
  researchCap  : [],
  tJobs        : [],
  rJobs        : [],
  researchTimer: null,
  messages     : {lastRead:0, missing:0},
  waves        : null,
  campStats    : null,
  campMarches  : {},
  version      : {lastChecked:0, checkVersion:Version, lastVersion:Version},
  autoTrain    : {enabled:false, subTab: 0, troopCap:[], trainStyle: 0, city:[] },
  trainTab     : 0,
  warningTower : {enabled:false, delay:1, unit:60, sound:true, nospy:false, deleteReport:true, delayDelete:1, unitDelete:86400, warningEnabled:!0, delayWarning:1, unitWarning:3600, soundUrl:IsChrome==!0?DEFAULT_ALERT_SOUND_URL:DEFAULT_FF_ALERT_SOUND_URL},
  emailTower   : '',
  urlTower     : '',
  checkForDel  : {type:0, msgGame:true, msgPlayer:true, msgSentinel:true, msgAlliance:true, rptAnthropus:true, rptTransport:true, rptSpy:true, rptBattle:true, rptReinforcement:true, rptExcludeMe:true, dateAll:true, rptTrading:!0},
  TESTOPTION   : {},
  pl1          : {alerta:1}
};

var Styles = '\
	div {font-size: 9pt; margin:0 ! important}\
	div.pbTitle {font-size: 9pt; border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#0000AA}\
	div.pbSubtitle {font-size: 9pt; border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#0033DB}\
	div.pbInput {font-size: 9pt; border:2px ridge yellow; background-color:#ffffee; padding:3px}\
	div.pbStatBox {font-size: 9pt; border:2px ridge black; background-color:#efefe0; padding:2px}\
	div.pbstatus_feedback {font-size: 9pt; height: 34px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px 2px 2px; text-align:left; font-weight:bold;}\
	div.short {font-size: 9pt; height:7px;}\
	.hiding {font-size: 9pt; background-color: #2FAC2F; color: white; padding-left: 10px; padding-right: 10px; margin-right: -2px;}\
	.defending {font-size: 9pt; background-color: #F80000; color: white; padding-left: 10px; padding-right: 10px; margin-right: -2px;}\
	div#qTip {font-size: 9pt; padding: 3px; border: 1px solid #777; border-right-width: 2px; border-bottom-width: 2px; display: none; background: #999; color: #fff; font: bold 9px Verdana, Arial, sans-serif; text-align: left; position: absolute; z-index: 1000;}\
	table.pbTabPad tr td {font-size: 9pt; border:none; background:none; white-space:nowrap; padding: 2px 4px}\
	table.pbTab tr td {font-size: 9pt; border:none; background:none; white-space:nowrap; padding: 0px 4px;}\
	table tr td.pbTabLeft {font-size: 9pt; font-weight:bold; text-align:right; padding-right: 5px}\
	table.pbTabLined tr td {font-size: 9pt; border-bottom:1px solid #ccc; background:none; white-space:nowrap; padding: 1px 4px 1px 4px;}\
	table tr.pbTabHdr1 td {font-size: 9pt; background-color:#dde; font-weight:bold}\
	table tr.pbTabHdr2 td {font-size: 9pt; font-weight:bold}\
	tr.pbMarchOther td {font-size: 9pt; color:#888888}\
	tr.pbMarchMine td {font-size: 9pt; color:#000000}\
	tr.pbpelozo td {font-size: 9pt; background-color:#dde; border:none; height: 21px;  padding:0px; }\
	tr.pbretry_ptpelozo td {font-size: 9pt; background-color:#a00; color:#fff; border:none; height: 21px; padding:0px; }\
	tr.pbOwned {font-size: 9pt; background-color: #e80000; color:white}\
	table.pbMainTab {font-size: 9pt; empty-cells:show; margin-top:5px; }\
	table.pbMainTab tr td a {font-size: 9pt; color:inherit }\
	table.pbMainTab tr td   {font-size: 9pt; height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 2px solid; border-style: none none solid none; }\
	table.pbMainTab tr td.spacer {font-size: 9pt; padding: 0px 3px; border:none; }\
	table.pbMainTab tr td.sel    {font-size: 9pt; font-weight:bold; border: 1px solid; border-style: solid solid none solid; background-color:#CC66FF; cursor:hand; cursor:pointer; padding: 2px;}\
	table.pbMainTab tr td.notSel {font-size: 9pt; font-weight:bold; border: 1px solid; border-style: solid solid none solid; background-color:#6600CC; color:white; border-color:black; cursor:hand; cursor:pointer; padding: 2px;}\
	.CPotpup .CPopMain {font-size: 9pt; background-color:#f8f8f8;padding:6px;}\
	.CPotpup  {font-size: 9pt; border:3px ridge #666}\
	input.butAttackOff {font-size: 9pt; width:130px; background-color:#e80000; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
	input.butAttackOff:hover {font-size: 9pt; width:130px; background-color:#f80000; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
	input.butAttackOn {font-size: 9pt; width:130px; background-color:#009C1F; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
	input.butAttackOn:hover {font-size: 9pt; width:130px; background-color:#2FAC2F; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
	input.small {font-size: 9pt; margin:0; padding-top:0; padding-bottom:0; padding-left:1px; padding-right:1px;}\
	input.short {font-size: 9pt; width:30px}\
	input.greenButton {font-size: 9pt; width:130px; background-color:#009C1F; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
	input.greenButton:active {font-size: 9pt; width:130px; background-color:black; color:white; font-weight:bold; cursor:hand; cursor:pointer; }\
	input.greenButton:hover {font-size: 9pt; width:130px; background-color:#2FAC2F; color:white; font-weight:bold; cursor:hand; cursor:pointer; }\
	.button {font-size: 9pt; cursor:hand; cursor:pointer; border: 1px solid #006; background: #0044a0; color: white; padding: 2px; font-weight:bold; border-style: solid solid none solid;}\
	//  .button:hover {background: #eed; font-weight:bold; font-size:13px; color: black; border-style: solid solid none solid; }\
	//  .button:active {background: black; font-weight:bold; font-size:13px; color: white; border-style: none none none none;}\
	span.boldRed {font-size: 9pt; color:#FF0000; font-weight:bold}\
	div.pbAlert {font-size: 16pt; border:1px solid; border-color:#F80000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:white; background-color:#F80000;}\
	hr.thin {font-size: 9pt; margin:0px; padding:0px}\
	#hd ul.tabs li.tab a.toolbutOn {font-size: 9pt; background-color:#900 ! important; color:white ! important}\
	#hd ul.tabs li.tab a.toolbutOff {font-size: 9pt; background-color:#ffc ! important; color:black ! important}\
	';


if (document.URL.search(/apps.facebook.com\/dragonsofatlantis/i) >= 0){
  facebookInstance ();
  return;
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

var initOk = 0;

// Main entry
function dtStartup (){
  clearTimeout (dtStartupTimer);
  if (doatLoaded)
    return;
  logit ('dtStartup'); 

  if (++startupCount > 10){
    dialogFatal ('<B>Error initializing DOA español:</b><BR><BR>Unable to find SWF element');
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
  } catch (e){
    dtStartupTimer = setTimeout (dtStartup, 1000);
    return;
  }

  doatLoaded = true;
  try {
    WinLog.enabled = ENABLE_WINLOG;
    logit (inspect (C, 6, 1));
    Data.init({options:OptionsDefaults, log:[], targets:{radius:0, center:{x:0, y:0}, camps:[]}, radscan:35, CoordMapX:0, CoordMapY:0, CoordMapN:'', CoordMapT:false, resultados:[], l:[], DefAtaques:[], SelScan:'A', msgsTower:[]});
    //checkVersion (); // NOTE: Temporarily removed
    try {
      document.getElementById('hd').style.width = '760px';   
      document.getElementById('hd').hidden = true;   
      document.getElementById('content').style.margin = '';   
    } catch (e) {}

    initDOA();

  } catch (e){
    dialogFatal ('<B>Error initializing DOA español:</b><BR><BR>'+  e);
    logit (inspect (e, 8, 1));
  }  
}

function initDOA () {
  var t = Seed;

  if (initOk == 00)
    t.fetchSeed();
  if (initOk == 01)
    if (t.s.cities != null && t.s.cities != undefined) {
      initOk++;
      t.s.cities.length = t.cityLen;
    }
  if (initOk == 02)
      initOk++;
  if (initOk == 03)
    t.fetchManifest();
  if (initOk == 04)
    if (t.manifest.city != null && t.manifest.city != undefined)
      initOk++;

  if (initOk >= 05)
    setTimeout(initSeed, 5000);
  else
    setTimeout(initDOA, 15000);
}

function initSeed () {

    Seed.init(function(rslt){
      if (rslt.ok){
        gotSeed (rslt);
      } else {
        dialogFatal ('Error starting DOA español:<BR>'+ rslt.errmsg);
        return;
      }
    });
    
    logit ("* DOA español v"+ Version +" "+translate( 'Loaded' ) );
    
  // TODO: Make sure WinPos is visible on-screen ?
  
    if (!Data.options.ptWinPos==null || Data.options.ptWinPos.x==null|| Data.options.ptWinPos.x=='' || isNaN(Data.options.ptWinPos.x)){
      Data.options.ptWinPos.x = 760;
      Data.options.ptWinPos.y = 93;
    }

    mainPop = new CPotpup ('Leonardo', Data.options.ptWinPos.x, Data.options.ptWinPos.y, 480,760, Data.options.ptWinDrag, 
        function (){
          tabManager.hideTab();
          WinTracker.show (false);
        });
        
    function gotSeed (rslt){    // TODO: check result, retry or disable tools?
      mainPop.getMainDiv().innerHTML = '<STYLE>'+ Styles +'</style>';
      tabManager.init (mainPop.getMainDiv());
      if (Data.options.ptWinIsOpen){
        mainPop.show (true);
        tabManager.showTab();
      }
      AddMainTabLink('On/Off DoA', eventHideShow, mouseMainTab); //BiTFx
      actionLog ("* " + Title + " V"+ Version +" "+translate( 'Loaded' ) );
      AutoCollect.init ();
      TestSomething.init ();
      Messages.init ();
      WinTracker.init();
      window.addEventListener('unload', onUnload, false);
      window.addEventListener ('unload', Data.onUnload, false);

//------------------------------------------------------------------------------
      Data.CoordMapX = Seed.s.cities[Seed.cityName[0]].x;
      Data.CoordMapY = Seed.s.cities[Seed.cityName[0]].y; 
      Data.CoordMapN = ''; 
      Data.CoordMapT = false; 
//------------------------------------------------------------------------------

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
        t.but.className = 'toolbutOff';
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
    if (t.but.className == 'toolbutOff')
      t.but.className = 'toolbutOn';
    else
      t.but.className = 'toolbutOff';
  },
}

function onUnload (){
  Data.options.ptWinPos = mainPop.getLocation();
  logit ('=============  onUnload: save win pos');
}

function dialogFatal (msg){
  pop = new CPotpup ('dtfatal', 200,300, 400,300, true); 
  pop.getMainDiv ().innerHTML = '<STYLE>'+ Styles +'</style><BR>'+ msg ;
  pop.getTopDiv ().innerHTML = '<B><CENTER>Uh ohs</center></b>' ;
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
				pop = new CPotpup ('dtver', Data.options.ptWinPos.x, Data.options.ptWinPos.y, 300,220, Data.options.ptWinDrag, remindLater); 
        pop.getTopDiv ().innerHTML = '<CENTER><B>Nueva Version Disponible!</b></center>';
        pop.getMainDiv ().innerHTML = '<STYLE>'+ Styles +'</style><BR><CENTER>Hay una nueva version de magoblanco<BR><BR>Version: '+ m[1] 
            +'<BR><BR>en: <A HREF="http://'+ WebSite +'">'+ WebSite +'</a><BR><BR><INPUT id=doaVerRML type=submit value="Mirar mas tarde"\> &nbsp; &nbsp;<INPUT id=doaVerDR DISABLED type=submit value="No me lo recuerdes de nuevo"\></center>';
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
  deleteQueue : [],
  deleteTimer: null,
  
  init : function (){
    Messages.checkMessages(500);
    window.addEventListener ('unload', Messages.onUnload, false);
  },
  
  marchAtTarget : function (){
    var t = Messages;
    t.checkMessages();
  },

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
  
  checkMessages : function (maxWaitMillis)  {
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
        for (var i=rslt.length-1; i>=0; i--){
//          if (rslt[i].report_type=="BattleReport" && !rslt[i].read_at){
          if (rslt[i].report_type=="BattleReport"){
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
 
//  && rslt[i].report.attacker.name == Seed.s.name

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
      if (rslt.report.attacker.name == Seed.s.name) {
        t.gotBattleReport (rslt);
      }
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
  s : {},           // seed data  from server 
  r : {},           // seed data  from server 
  cityIdx : {},     // 'indicies'
  cityTs : {},      // timestamps of last update
  jobs : {},        // by city
  buildings : {},        // by buildings
  units : {},        // by buildings
  marches : {},
  numMarches : 0,
  generals : {},
  numGenerals : 0,
  serverTimeOffset : 0,
  resources : {ore : 0, gold : 0, food : 0, wood : 0, stone : 0},
  ratefood : 0,
  firstTime : false,
  firstTower : false,
  requirements : {building:[], research:[], troop:[]},
  manifest : {},
  player : {},
  cityLen : 0,
  cityName : ['capital', 'water', 'stone', 'fire', 'wind'],
    
  init : function (callback){
    var t = Seed;

    t.fetchSeed(callback);

    t.fetchManifest(function (rslt) {
      if (rslt.ok) {
      } else {
        if (callback)
          callback(rslt);
        return;
      }
    });


   for (p in t.s.cities)
     t.fetchCity(t.s.cities[p].id, 1000);

    setInterval (t.tick, 1000);
  },
  
  tick : function (){     // called once per second - to check for job completion
    var t = Seed;
    var now = serverTime () - 1;
    // delete expired marches ...
    for (var pm in t.marches){
      var march = t.marches[pm];
      if ((march.run_at < now-30) || (march.status=='volviendo' && march.run_at < now-2) || (march.status=='returning' && march.run_at < now-2)){
        delete (t.marches[pm]);
        --Seed.numMarches;
      }
    }
    // check for job completion
    for (var pcity in t.jobs){
      for (var pjob in t.jobs[pcity]){
        var job = t.jobs[pcity][pjob];
        if (job.run_at < (now - 300)){
          if (job.done)
            delete (t.jobs[pcity][pjob]);
        } 
        else if (!job.done && job.run_at<now){
          job.done = true;
          delete (t.jobs[pcity][pjob]);
          var march = Seed.marches[job.march_id];
          // if (!march), march just finished (returned)          
          if (march && job.queue=='march' && (march.status=='en marcha' || march.status=='marching')){  // march just reached target
            Messages.marchAtTarget(march);
          }
          t.fetchCity (pcity);
          return;
        }
      }
    }
  },

  fetchJobs : function (notify) {
    var t = Seed;
    initOk++;
    return;
    new MyAjaxRequest ('player/jobs.json', { 'user%5Fid':C.attrs.userId, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, version:VERSION_DE_JUEGO, 'dragon%5Fheart':C.attrs.dragonHeart }, function (rslt) {
      if (rslt.ok && !rslt.dat.errors) {
        try {
          for (p in rslt.dat.result.result)
            for (var i=0; i<rslt.dat.result.result[p].length; i++)
              t.checkAddJob (rslt.dat.result.result[p][i]);
          initOk++;
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

  fetchManifest : function (notify) {
    var t = Seed;
    var now = new Date().getTime() / 1000;
    new MyAjaxRequest ('manifest.json', { 'user%5Fid':C.attrs.userId, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, version:VERSION_DE_JUEGO, 'dragon%5Fheart':C.attrs.dragonHeart }, function (rslt) {
      if (rslt.ok && !rslt.dat.errors) {
        if (rslt.dat.timestamp)
          t.serverTimeOffset = rslt.dat.timestamp - now;
        t.r = rslt.dat; 
        t.manifest = rslt.dat; 
        try {
          initOk++;
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
    var t = Seed;
    var now = new Date().getTime() / 1000;
    new MyAjaxRequest ('player.json', {'user%5Fid':C.attrs.userId, 'dragon%5Fheart':C.attrs.dragonHeart, '%5Fsession%5Fid':C.attrs.sessionId, version:VERSION_DE_JUEGO, timestamp:parseInt(serverTime()) }, function (rslt){
      if (rslt.ok){
        if (rslt.dat.timestamp)
          t.serverTimeOffset = rslt.dat.timestamp - now;
        t.s = rslt.dat; 
        t.player = rslt.dat; 
        var cnt = 0;
        try {
          for (p in rslt.dat.cities) {
            t.updateCity (p);
            cnt++;
          }
          Seed.cityLen = cnt;
          initOk++;
        } 
        catch (e) {
          rslt.ok = false;
          rslt.errmsg = e.toString();
		  alert(rslt.errmsg);
        }
      }
      if (notify)
        notify (rslt);
    });
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
  updateCity : function (cityIdx){
    var t = Seed;
    var scity = t.s.cities[cityIdx];
    if (!Seed.cityIdx[scity.id])
      Seed.cityIdx[scity.id] = cityIdx;
    Seed.cityTs[scity.id] = serverTime();  
    for (var i=0; i<t.updateNotifyQueue.length; i++)
      t.updateNotifyQueue[i]();
    t.updateNotifyQueue = []; 
  },
  
  checkAddMarch : function (march){
    if (march.general_id)
      Seed.generals[march.general_id].busy = true;
    if (Seed.marches[march.id]){
      if (march.status=='retreating')
        Seed.marches[march.id].status='volviendo';
      return;
    }
    var m = cloneProps(march);  
    if (m.status =='marching')
      m.status = 'en marcha';
    if (m.status =='encamped')
      m.status = 'acampado';
    if (m.march_type == 'AttackMarch')
      m.march_type = 'ataque en marcha';
    else if (m.march_type == 'TransportMarch')
      m.march_type = 'transportando';
    if (m.status == 'retreating')
      m.status = 'volviendo';
    m.target = m.terrain_type;
    if (m.target == 'Bog')
      m.target = m.destination_name;
    else if (m.target == 'AnthropusCamp')
      m.target = gAnthropusCamp;
    else if (m.target == 'Outpost')
      m.target = gOutpost;
    else if (m.target == 'Grassland')
      m.target = gSavanna;
    else if (m.target == 'Swamp')
      m.target = gSwamp;
    else if (m.target == 'Lake')
      m.target = gLake;
    else if (m.target == 'Hill')
      m.target = gHill;
    else if (m.target == 'Plain')
      m.target = gPlain;
    else if (m.target == 'Mountain')
      m.target = gMountain;
    else if (m.target == 'Forest')
      m.target = gForest;  
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
//    Seed.jobs[cityId][Seed.jobs[cityId].length] = cloneProps(job);
  },
  
  jsonAddJob : function (job){  // called from various jsons (buildUpgrade) when new job rx'd 
    var t = Seed;
    t.checkAddJob (job);
  },

  jsonGotCity : function (dat){  // call from various jsons when seed data rx'd
    var t = Seed;
    var cityIdx = dat.city.id;
    //    t.s.cities[cityIdx] = dat.city;
    try {
      t.buildings[cityIdx] = dat.city.buildings;
      t.jobs[cityIdx] = dat.city.jobs;
      if (dat.city.type == 'Capital') {
        t.units = dat.city.units;
        t.resources = dat.city.resources;
        t.marches = {};
        t.numMarches = 00;
        for (var i=0; i<dat.city.generals.length; i++)
          Seed.generals[dat.city.generals[i].id] = dat.city.generals[i];
        Seed.numGenerals = dat.city.generals.length;
        for (var i=0; i<dat.city.marches.length; i++)
          t.checkAddMarch (dat.city.marches[i]);    
      }
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
      maxTime = 2000;
    if (cityId== null)
      cityId = Seed.s.cities['capital'].id
    setTimeout(doit, maxTime);    
    function doit (){    
      new MyAjaxRequest ('cities/'+ cityId +'.json', { 'user%5Fid':C.attrs.userId, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, version:VERSION_DE_JUEGO, 'dragon%5Fheart':C.attrs.dragonHeart }, function (rslt){
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
  var gens = Seed.generals;
  for (var i=0; i<gens.length; i++)
    ret[gens[i].id] = gens[i].name +' ('+ gens[i].rank +')';
  return ret;
}

//************************************Wave-Tab**********************************************

Tabs.Waves = {
  tabOrder : 2,
  tabLabel : gWave,
  tabDisabled : false,
  cont : null,
  troopList : ['Spy', 'LBM', 'SSDrg', 'BatDrg', 'FireM', 'Fang', 'ATrans', 'Pyro', 'Ogre', 'Banshee', 'GrtDrg', 'WatDrg', 'StnDrg', 'FirDrg', 'WinDrg'],
  troopLista : [gSpies, gLBM, gSSDrg, gBatDrg, gFireM, gFang, gATrans, gPyro, gOgre, gWindTroop, gGrtDrg, gWatDrg, gStnDrg, gFirDrg, gWinDrg],
  enabled : false,
  attackTimer : null,
  marchTimer: null,
  attackErrors : 0,
  
  init : function (div){
    var t = Tabs.Waves;
    t.cont = div;
    if (Data.options.waves == null){
      Data.options.waves = {enabled:false, timeLimit:240, iterationMin:5, iterationMax:60, maxMarches:10, stopOnLoss:true, deleteReports:false, curTarget:0, targets:[], tsStarted:serverTime(), runTime:0};
      for (var i=0; i<5; i++)
        Data.options.waves.targets[i] = {enabled:false, lastAttack:0, troopsWave1:{}, troopsWave2:{}, targetX:0, targetY:0, terrainType:null, terrainLevel:0, stats:{numAttacks:0, spoils:{}}};
    }
    if (!Data.options.waves.iterationMin)
      Data.options.waves.iterationMin = 5;
    if (Data.options.waves.maxMarches == undefined)
      Data.options.waves.maxMarches = 10;
    var gensel = htmlSelector (generalList(0), '', 'id=pbrptGenSel');
    var m = '<DIV class=pbTitle>'+translate( 'Attack One Target in Waves' )+'</div>\
       <DIV id=pbwaveStatus class=pbStatBox style="margin-bottom:5px !important">\
       <CENTER><INPUT type=submit value="OnOff" id=pbwaveEnable></input></center>\
       <DIV id=pbwaveMarches style="height:125px; max-height:125px; overflow-y:auto;"></div>\
      <DIV id=pbwaveFeedback style="height: 17px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px; text-align:center; font-weight:bold"></div></div>\
      <INPUT id=pbatTerre type="submit" value="'+translate("Terre")+'"></input>\
      <DIV class=pbInput>\
      <DIV style="height:48px;"><B>'+translate( 'Target Coords' )+':</b> &nbsp; X:<INPUT id=pbwaveX size=1 maxlength=3 type=text value="'+ Data.options.waves.targets[0].targetX +'" /> Y:<INPUT id=pbwaveY size=2 maxlength=3 value="'+ Data.options.waves.targets[0].targetY +'" type=text/> &nbsp <B>'+translate( 'Distance' )+':</b> <SPAN id=pbwaveDist></span><BR>\
        <DIV class=pbStatBox style="margin:0px 10px !important"><CENTER><SPAN id=pbwaveTile></span></center></div></div>\
      <TABLE class=pbTab id=pbwaveTroops align=center><TR align=center class=pbTabHdr1><TD colspan=8>'+translate( 'Troops for Wave Attack' )+':</td></tr></table>\
      <BR><TABLE class=pbTabPad>\
      <TR><TD class=pbTableft>'+translate( 'Delete battle reports' )+':</td><TD><INPUT id=pbwaveDBR type=checkbox '+ (Data.options.waves.deleteReports?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=pbTableft>'+translate( 'Stop if any troops lost' )+':</td><TD><INPUT id=pbwaveSTL type=checkbox '+ (Data.options.waves.stopOnLoss?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=pbTableft>'+translate( 'Delay Between attacks' )+':</td><TD><INPUT id=pbwaveDelay type=text size=1 maxlength=4 value="'+ Data.options.waves.iterationMin +'" \> '+translate( 'to' )+' <SPAN id=pbwaveDelMax>'+ Data.options.waves.iterationMax +'</span> '+translate( 'seconds' )+'</td></tr>\
      <TR><TD class=pbTableft>'+translate( 'Maximum simultaneous marches' )+':</td><TD><INPUT id=pbwaveMM size=1 type=text maxlength=2 value="'+ Data.options.waves.maxMarches +'"\></td></tr>\
      </table></div>\
      <DIV class=pbStatBox style="margin-top:10px !important">\
        <CENTER><INPUT id=pbwaveResStat type=submit value="'+translate( 'Reset Stats' )+'" /></center>\
      <DIV id=pbwaveStats  style="height:200px; max-height:200px; overflow-y:auto"></div>\
      <HR class=thin><DIV id=pbwaveCurSpoil> &nbsp; </div></div>';
    t.cont.innerHTML = m;
    document.getElementById('pbwaveEnable').addEventListener ('click', function(){t.setWaveEnable(!Data.options.waves.enabled)}, false);
    document.getElementById('pbwaveX').addEventListener ('change', t.eventCoords, false);
    document.getElementById('pbwaveY').addEventListener ('change', t.eventCoords, false);
    document.getElementById('pbwaveResStat').addEventListener ('click', t.resetStats, false);
    document.getElementById('pbwaveDBR').addEventListener ('click', function(e){Data.options.waves.deleteReports=e.target.checked}, false);
    document.getElementById('pbwaveSTL').addEventListener ('click', function(e){Data.options.waves.stopOnLoss=e.target.checked}, false);
    document.getElementById('pbwaveDelay').addEventListener ('change', delayChanged, false);
    document.getElementById('pbwaveMM').addEventListener('change', maxMarchesChanged, false);
    document.getElementById('pbatTerre').addEventListener ('click', t.helpPopT, false);
    troopTable (document.getElementById('pbwaveTroops'), 1, 'AW', t.eventTroops);
    window.addEventListener('unload', t.onUnload, false);
    t.setWaveEnable (Data.options.waves.enabled);
    t.marchTick();
    t.eventCoords();
    t.dispStats();
    Messages.addBattleReportListener(t.gotBattleReport);
    
    function maxMarchesChanged (e){
      var val = parseIntNan(document.getElementById('pbwaveMM').value);
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
      var row3 = tab.insertRow(rownum+2);
      row3.align='center';
      var row4 = tab.insertRow(rownum+3);
      row4.align='center';
      var row5 = tab.insertRow(rownum+4);
      row5.align='center';
      var row6 = tab.insertRow(rownum+5);
      row6.align='center';
      var val;
      for (var i=0; i<t.troopList.length; i++){
        if (i <= 4)
          row1.insertCell(i).innerHTML = t.troopLista[i];
        else if (i >= 5 && i <= 9)
          row3.insertCell(i - 5).innerHTML = t.troopLista[i];
        else
          row5.insertCell(i - 10).innerHTML = t.troopLista[i];

        var inp = document.createElement ('INPUT');
        inp.type = 'text';
        inp.size = '1';
        inp.maxlength = '6';
        if (prefix=='AW')
          val = Data.options.waves.targets[0].troopsWave2[Names.troops.byAbbr[t.troopList[i]][1]];
        if (!val)
          val = 0;
        inp.value = val;
        inp.addEventListener ('change', listener, false);
        inp.name = prefix +'_'+ i;
        if (i <= 4)
          row2.insertCell(i).appendChild (inp);
        else if (i >= 5 && i <= 9)
          row4.insertCell(i - 5).appendChild (inp);
        else
          row6.insertCell(i - 10).appendChild (inp);
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
      if (Data.options.waves.deleteReports)
        Messages.deleteMessage(rpt.report_notification.id);
    }
  },
  
   /***Tabla de tierras***/

  helpPopT : function (){
		var stTitle = 'background-color: #0000AA; font-weight:bold; text-align:center; color:#ffffff;';
        var stTitle2 = 'background-color: #FFFFFF; font-weight:bold;';
        var s0 = 'http://img62.imageshack.us/img62/1582/16857792.gif';
        var s1 = 'http://img683.imageshack.us/img683/8149/31096760.gif';
        var s2 = 'http://img706.imageshack.us/img706/1485/40621535.gif';
        var s3 = 'http://img148.imageshack.us/img148/9913/21372285.gif';
        var s4 = 'http://img90.imageshack.us/img90/1061/24344413.gif';
        var s5 = 'http://img691.imageshack.us/img691/3886/85305366.gif';

		var m = '';
		m += '<TABLE width=100% bgcolor=#ffffd0><TR><TD colspan=4 align=center style="' + stTitle + '">Esta tabla indica el número de unidades de envío para cada nivel de la tierra salvaje. La cantidad puede variar dependiendo del nivel de calibración que tiene armas, la medicina y la metalurgia. Tomé las tablas incluidas como referencia y probada por los usuarios para los usuarios, en Dragons of Atlantis WIKI, no asumen las pérdidas de las tropas.<BR></td></tr>';
  	m += '<TABLE width=100% bgcolor=#ffffff><TR><TD colspan=4 align=center style="' + stTitle2 + '"><A target="_tab" href="http://www.facebook.com/pages/Dragons-of-Atlantis-Espa%C3%B1ol-Pagina-no-official/233829349968338?sk=wall">Haga clic aquí para ayudar a la "comunidad" en la forma de ataque</a></td></tr>';
  	m += '<TR><TD> </td><TD></td><TD></TD></tr>';
  	m += '<TR><TD><b><center>Nivel</center></b></td><TD><center>Tropa</center></td><TD><center>General (Estrellas)</center></td><TD><center>Nivel Investigacion</center></TD></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		m += '<TR><TD></td><TD><center>50 Minotauro</center></td><TD><center><img src="'+ s0 +'"></center></td><TD><center>Metalurgia: 2 Medicina: 2 Cal.Arma: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>100 Minotauro </center></td><TD><center><img src="'+ s1 +'"></center></td><TD><center>Metalurgia: 1 Medicina: 0 Cal.Arma: 0</center></Td></tr>';
		m += '<TR><TD></td><TD><center>10 Dragon Rapido</center></td><TD><center><img src="'+ s2 +'"></center></td><TD><center>Metalurgia: 1 Medicina: 0 Dragoneria: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>50 Minotauro + 50 Porteador</center></td><TD><center><img src="'+ s1 +'"></center></td><TD><center>Metalurgia: 1 Medicina: 0 Cal.Arma: 0</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 6 Medicina: 6 Dragoneria: 3</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>2</center></b></td><TD><center>100 Minotauro</center></td><TD><center><img src="'+ s2 +'"></center></td><TD><center>Metalurgia: 2 Medicina: ? Cal.Arma: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>50 Alabardero + 100 Minotauro + 100 Porteador</center></td><TD><center><img src="'+ s3 +'"></center></td><TD><center>Metalurgia: 2 Medicina: 2 Cal.Arma: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>15 Arquero + 9 Porteador</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 2 Medicina: ? Cal.Arma: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>45 Minotauro</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 2 Medicina: ? Cal.Arma: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>50 Dragon Rapido</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 3 Medicina: 0 Dragoneria: 3</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>3</center></b></td><TD><center>136 Arquero</center></td><TD><center><img src="'+ s1 +'"></center></td><TD><center>Metalurgia: 1 Medicina: 1 Cal.Arma: 1</center></Td></tr>';
		m += '<TR><TD></td><TD><center>53 Arquero</center></td><TD><center><img src="'+ s1 +'"></center></td><TD><center>Metalurgia: 2 Medicina: 0 Cal.Arma: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>25 Arquero + 5 T.Blindado </center></td><TD><center><img src="'+ s4 +'"></center></td><TD><center>Metalurgia: 2 Medicina: ? Cal.Arma: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>50 Minotauro + 50 Arquero + 25 Porteador</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 2 Medicina: 0 Cal.Arma: 1</center></Td></tr>';
		m += '<TR><TD></td><TD><center>5 Porteador + 55 Minotauro + 20 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 2 Medicina: 2 Cal.Arma: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>10 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 5 Medicina: 5 Dragoneria: 5</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';

		m += '<TR><TD><b><center>4</center></b></td><TD><center>104 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 2 Medicina: 0 Cal.Arma: 2</center></Td></tr>';
		m += '<TR><TD></td><TD><center>80 Arquero + 10 Porteador</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 2 Medicina: ? Cal.Arma: 1</center></Td></tr>';
		m += '<TR><TD></td><TD><center>500 Dragon Rapido</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 2 Medicina: 2 Dragoneria: ?</center></Td></tr>';
		m += '<TR><TD></td><TD><center>210 Minotauro + 200 Dragon Rapido</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 2 Medicina: ? Cal.Arma: 2 Dragoneria: ?</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';

		m += '<TR><TD><b><center>5</center></b></td><TD><center>50 Minotauro + 973 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 1 Medicina: 0 Cal.Arma: 3</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1250 Arquero + 40 Minotauro</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 2 Medicina: ? Cal.Arma: 3</center></Td></tr>';
		m += '<TR><TD></td><TD><center>300 Arquero + 22 T.Blindado</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 3 Medicina: 1 Cal.Arma: 4</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1150 Minotauro + 300 Arquero + 500 Dragon de Combate</center></td><TD><center><img src="'+ s3 +'"></center></td><TD><center>Metalurgia: 5 Medicina: 2 Cal.Arma: 2 Dragoneria: 4</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1200 Dragon Rapido</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 6 Medicina: 5 Dragoneria: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>400 Dragon Rapido + 600 Dragon de Combate + 200 T.Blindado</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 6 Medicina: 5 Dragoneria: 8</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>6</center></b></td><TD><center>1250 Arquero</center></td><TD><center><img src="'+ s3 +'"></center></td><TD><center>Metalurgia: 2 Medicina: 0 Cal.Arma: 3</center></Td></tr>';
		m += '<TR><TD></td><TD><center>950 Arquero + 70 T.Blindado</center></td><TD><center><img src="'+ s3 +'"></center></td><TD><center>Metalurgia: 2 Medicina: 0 Cal.Arma: 3</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1200 Arquero + 30 Minotauro</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 2 Medicina: 1 Cal.Arma: 3</center></Td></tr>';
		m += '<TR><TD></td><TD><center>750 Arquero + 190 Minotauro</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 5 Medicina: 5 Cal.Arma: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>770 Arquero + 180 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 5 Medicina: 5 Cal.Arma: 5 Dragoneria: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>2400 Dragon Rapido</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 9 Medicina: 8 Dragoneria: 9</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1600 Dragon Rapido + 500 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 4 Medicina: 5 Dragoneria: 4</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>7</center></b></td><TD><center>1700 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 4 Medicina: 4 Cal.Arma: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1000 Dragon de Combate + 30 Arquero + 100 T.Blindado</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 5 Medicina: 6 Dragoneria: 6</center></Td></tr>';
		m += '<TR><TD></td><TD><center>3100 Dragon Rapido</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 6 Medicina: 5 Dragoneria: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1 Dragon de Piedra</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 10 Medicina: 9 Cal.Arma: 10 Dragoneria: 9</center></Td></tr>';
		m += '<TR><TD></td><TD><center>100 S.Semplice + 37 Alabardero + 118 Minotauro + 564 Dragon Rapido + 447 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 4 Medicina: 4 Dragoneria: 4</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1600 Dragon Rapido + 500 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 4 Medicina: 5 Dragoneria: 4</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>8</center></b></td><TD><center>3000 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 6 Medicina: 7 Cal.Arma: 6</center></Td></tr>';
		m += '<TR><TD></td><TD><center>4500 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 5 Medicina: 5 Cal.Arma: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>4719 Arquero 102 T.Blindado</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 4 Medicina: 5 Cal.Arma: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>4500 Dragon Rapido</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 6 Medicina: 5 Dragoneria: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>2136 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 8 Medicina: 9 Dragoneria: 8</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><b><center>9</center></b></td><TD><center>5500 Arquero + 40 T.Blindado</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 6 Medicina: 5 Cal.Arma: 5</center></Td></tr>';
		m += '<TR><TD></td><TD><center>5500 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 8 Medicina: 7 Cal.Arma: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>11000 Dragon Rapido</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 6 Medicina: 5 Dragoneria: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>11600 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 8 Medicina: 8 Cal.Arma: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>9000 Dragon Rapido + 4500 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 7 Medicina: 6 Cal.Arma: 6 Dragoneria: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>1000 Dragon Rapido + 3000 Dragon de Combate + 500 T.Blindado</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 7 Medicina: 6 Cal.Arma: 6 Dragoneria: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>5750 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 6 Medicina: 6 Dragoneria: 6</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';

		m += '<TR><TD><b><center>10</center></b></td><TD><center>25000 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 9 Medicina: 8 Cal.Arma: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>5000 Giganti</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 9 Medicina: 8 Cal.Arma: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>15000 Dragon Rapido</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 9 Medicina: 8 Dragoneria: 9</center></Td></tr>';
		m += '<TR><TD></td><TD><center>11600 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 8 Medicina: 8 Cal.Arma: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>9000 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 9 Medicina: 9 Cal.Arma: 9 Dragoneria: 9</center></Td></tr>';
		m += '<TR><TD></td><TD><center>28000 Arquero + 1 Gran Drago</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 8 Medicina: 8 Cal.Arma: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>15000 Dragon de Combate</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 8 Medicina: 9 Cal.Arma 7 Dragoneria: 8</center></Td></tr>';
		m += '<TR><TD></td><TD><center>20000 Arquero</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 9 Medicina: 9 Cal.Arma: 9</center></Td></tr>';
		m += '<TR><TD></td><TD><center>30000 Arquero + 500 T.Blindado</center></td><TD><center><img src="'+ s5 +'"></center></td><TD><center>Metalurgia: 7 Medicina: 7 Cal.Arma: 6 Desp.Rapido: 6</center></Td></tr>';
		m += '<TR><TD> </td><TD></td><TD></TD></tr>';

  var pop = new CPotpup ('giftHelp', 0, 0, 830, 1500, true);
  pop.centerMe (mainPop.getMainDiv());
  pop.getMainDiv().innerHTML = m;
  pop.getTopDiv().innerHTML = '<CENTER><B>Tierras Salvajes</b></center>';
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
    var msg = '<TABLE class=pbTabPad width=100%><TR><TD class=pbTabLeft>'+translate( 'Run Time' )+':</td><TD width=90%>'+ timestr(runTime, true) +'</td></tr>\
        <TR><TD class=pbTabLeft>'+translate( 'Attacks' )+':</td><TD>'+ Data.options.waves.numAttacks +'</td></tr>\
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
      but.value = translate( 'Attacks ON' );
      but.className = 'butAttackOn';
      t.waveAttackTick();
      t.curRunStart = serverTime();
    } else {
      but.value = translate( 'Attacks OFF' );
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

    if (Ajax.marchBusy>0){
      t.attackTimer = setTimeout (t.waveAttackTick, 2500);
      return;
    }    
    if (!Data.options.waves.enabled)
      return;
      
    var target = Data.options.waves.targets[0];
    var now = serverTime();
    var cityIdx = 0;
    var targMsg =  target.targetX +','+ target.targetY +' '+translate( 'Lvl' )+' '+ target.terrainLevel +' '+ target.terrainType;
    var gen = null;
    if (getMusterPointSlots (cityIdx) <= 0){
      t.dispFeedback ( translate( 'Muster Point Full') );
      t.attackTimer = setTimeout (t.waveAttackTick, 5000);
      return;
    }
    
    var marchCount = 0;
    for (var p in Seed.marches)
      if (Seed.marches[p].ownerId == 'wave')
        ++marchCount;
    if (marchCount >= Data.options.waves.maxMarches){
      t.dispFeedback ('Máximo de Marchas simultáneas alcanzado');
      t.attackTimer = setTimeout (t.waveAttackTick, 5000);
      return;
    }
    
//logit (inspect (Seed.generals, 8, 1));    
    if ((gen = getAvailableGeneral ()) == null){
      t.dispFeedback ('No hay Generales disponibles');
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
    t.dispFeedback ( translate( 'Wave sent to' )+': '+ targMsg);
    
//	if (Data.options.verboseLog.enabled)
//		actionLog('Wave attack to ' + targMsg + ' attempted');
		
    new Ajax.march (Seed.s.cities[cityIdx].id, target.targetX, target.targetY, gen.id, target.troopsWave2, 'wave', function (rslt){
        var t = Tabs.Waves;
        if (rslt.ok && rslt.dat.result.success){
          t.attackErrors = 0;
          target.lastAttack = serverTime();
          actionLog ( translate( 'Wave attack sent to' )+' '+ targMsg);
          var delay = Data.options.waves.iterationMin + parseInt((Math.random()*(Data.options.waves.iterationMax-Data.options.waves.iterationMin)));
          t.attackTimer = setTimeout (t.waveAttackTick, delay*1000);
        } else {
          t.dispFeedback ('Error: '+ rslt.errmsg);
          actionLog ('Attack Error: '+ rslt.errmsg);
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
        if (Seed.units[p] < troops[p]){
        if(p == 'Spy'){p = gSpy;}
		if(p == 'Longbowman'){p = gLongbowman;}
        if(p == 'SwiftStrikeDragon'){p = gSwiftStrikeDragon;}   
        if(p == 'BattleDragon'){p = gBattleDragon;}
        if(p == 'FireMirror'){p = gFireMirror;}
        if(p == 'AquaTroop'){p = gAquaTroop;}
		if(p == 'ArmoredTransport'){p = gArmoredTransport;}
		if(p == 'GreatDragon'){p = gGreatDragon;}   
        if(p == 'WaterDragon'){p = gWaterDragon;}
        if(p == 'StoneDragon'){p = gStoneDragon;}
        if(p == 'FireDragon'){p = gFireDragon;}
        if(p == 'WindTroop'){p = gWindTroop;}
          return ('No hay suficientes '+ p);
        if(p == gSpy){p = 'Spy';}
		if(p == gLongbowman){p = 'Longbowman';}  
        if(p == gSwiftStrikeDragon){p = 'SwiftStrikeDragon';}  
        if(p == gBattleDragon){p = 'BattleDragon';}
        if(p == gFireMirror){p = 'FireMirror';}
        if(p == gAquaTroop){p = 'AquaTroop';}
		if(p == gArmoredTransport){p = 'ArmoredTransport';}
		if(p == gGreatDragon){p = 'GreatDragon';}  
        if(p == gWaterDragon){p = 'WaterDragon';}
        if(p == gStoneDragon){p = 'StoneDragon';}
        if(p == gFireDragon){p = 'FireDragon';}
        if(p == gWindTroop){p = 'WindTroop';}
        }
      }
    }    if (totTroops <= 0){
      return ('No Hay Tropas Definidas');
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
    document.getElementById('pbwaveDist').innerHTML = distance(Seed.s.cities[Seed.cityName[0]].x, Seed.s.cities[Seed.cityName[0]].y, x, y);
    document.getElementById('pbwaveTile').innerHTML = '&nbsp;';
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
      document.getElementById('pbwaveTile').innerHTML = '<B>'+ Map.names[tile.type] + ' ' + translate( 'level' )+ ' ' + tile.lvl +'</b>';
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
    var s = new Array(750);

    for (var p in list){
      t[p] = t.readMergeOptions (p, list[p]);
      t.names.push(p);
    }

    if (t.l.length == 0) {
      for (var ff=0; ff<750; ff++) {
        t.l.push(s);
      }

      for (var ff=0; ff<750; ff++)
        for (var cc=0; cc<750; cc++)
          t.l[ff][cc] = '';

    }

  },


  onUnloadNew : function () {
    logit('Save Data in localStorage');
    var t = Data;
    for (var i=0; i<t.names.length; i++)
      localStorage.setItem(t.names[i], JSON.stringify(t[t.names[i]]));
  },


  onUnload : function (){
    var t = Data;
    logit ('===========  Data.onUnload');
    for (var i=0; i<t.names.length; i++)
      if (t.isChrome){
        localStorage.setItem(t.names[i], JSON.stringify(t[t.names[i]]));
      }else{
        GM_setValue (t.names[i] +'_'+ t.serverID, JSON.stringify(t[t.names[i]]));
      }
  },

  readMergeOptionsNew : function (label, defaults) {
    var t = Data;  
    var s;
    if (t.isChrome)
        s = localStorage.getItem(label);
    else
      s = GM_getValue (label +'_'+ t.serverID);
    if (s != null){
      opts = JSON.parse (s);
      if (matTypeof(defaults)=='object')
        for (d in defaults)
          for (o in opts)
            if (d == o)
              switch (matTypeof(defaults[d])) {
                case 'object':
                  for (dd in defaults[d])
                    for (oo in opts[o])
                      if (dd == oo)
                        defaults[d][dd] = opts[o][oo];
                      break;
                default:
                  defaults[d] = opts[o];
              }
    }        
    return defaults;
  },
  
  readMergeOptions : function (label, defaults){
    var t = Data;
    var s;
    if (t.isChrome)
        s = localStorage.getItem(label);
    else
      s = GM_getValue (label +'_'+ t.serverID);
    if (s == null)
      return defaults;
    if (s != null){
      opts = JSON.parse (s);
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

/************************************** ANT TAB ******************************************/

Tabs.AutoAttack = {
  tabOrder : 3,
  tabLabel : gAnt,
  tabDisabled : false,
  cont : null,
  attackTimer: null,
  marchTimer: null,
  lastAttack : 0,
  attackErrors : 0,
  checkMapBusy : false,
  MAX_DISTANCE : 50,
  curRunStart : 0,
  
  init : function (div){
    var t = Tabs.AutoAttack;
    t.cont = div;
    if (!Data.options.campAttack.troops){
      Data.options.campAttack.troops = [];
      for (var x=1; x<=10; x++)
        Data.options.campAttack.troops[x] = {};
    }
    div.innerHTML = '<DIV class=pbTitle>'+translate( 'Anthropus Camp Auto-Attacks' )+'</div>\
      <DIV class=pbStatBox id=pbatStatus style="margin-bottom:5px !important">\
      <CENTER><INPUT type=submit value="OnOff" id=pbatEnable></input></center>\
      <DIV id=pbatMarches style="height:165px; max-height:165px; overflow-y:auto;"></div>\
      <DIV id=pbatFeedback style="height: 17px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px; text-align:center; font-weight:bold"></div></div>\
      <TABLE width=100% bgcolor=#ffffff align=center><TR><TD>\
      <INPUT type=submit style="font-size: 9pt; " value=" '+translate( 'Levels' )+' " id=pbatConfigL></input>\
      <INPUT type=submit style="font-size: 9pt; " value=" '+translate("Config")+' " id=pbatConfigG></input>\
      <INPUT type=submit style="font-size: 9pt; " value=" '+translate("Targets")+' " id=pbatTargets></input>\
      <INPUT type=submit style="font-size: 9pt; " value=" '+translate("Stats")+' " id=pbatStats></input>\
      <INPUT type=submit style="font-size: 9pt; " value=" '+translate("Accampamenti")+' " id=pbatAcc></input></td></tr></table>\
      <DIV id=pbatAutoAtaque style="padding-top:5px; font-size: 9pt;  background-color:#ffffff;"></div>\
      <DIV id=pbatAutoAtaqueTab style="padding-top:5px; font-size: 9pt;  height:560px; max-height:570px; width:460px; overflow-y:auto; background-color:#ffffff;"></div>';
      
    document.getElementById('pbatEnable').addEventListener ('click', function (){t.setAttackEnable (!Data.options.campAttack.enabled);}, false);
    document.getElementById('pbatConfigL').addEventListener ('click', t.tabConfigLevels, false);
    document.getElementById('pbatConfigG').addEventListener ('click', t.tabConfigGeneral, false);
    document.getElementById('pbatTargets').addEventListener ('click', t.tabTargets, false);
    document.getElementById('pbatStats').addEventListener ('click', t.tabStats, false);
    document.getElementById('pbatAcc').addEventListener ('click', t.helpPopA, false);
    if (Data.options.campStats == null)
      t.clearStats();
    if (Data.options.campAttack.maxMarches == undefined)
      Data.options.campAttack.maxMarches = 10;
    Messages.addBattleReportListener(t.gotBattleReport);
    setTimeout (t.checkMarches, 15000);
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
      if (DEBUG_MARCHES) WinLog.write ('***** ERROR march missing from seed: '+ job.march_id);   
    } else {
      Data.options.campMarches[job.march_id] = cloneProps(march);
      if (DEBUG_MARCHES) WinLog.write ('Tabs.AutoAttack.addMarch: ID='+ march.id +'  ('+ march.x +','+ march.y +') General:'+ march.general.id);    
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
          //logit ('March report never received! (now='+ now +')\n'+ inspect (Data.options.campMarches[p], 7, 1));    
          t.removeMarch (p);
        } else {
          Data.options.campMarches[p].retry = true;
          Messages.checkMessages();
        }
      }
    }
    t.marchCheckTimer = setTimeout (t.checkMarches, 35000);
  },
  
  trackStats : function (marchId, rpt){   // called when battle report received
    var t = Tabs.AutoAttack;
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
    <TR><TD class=pbTabLeft>'+translate( 'Run time' )+':</td><TD>'+ timestr(runTime, true) +'</td></tr>\
    <TR><TD class=pbTabLeft>'+translate( 'Attacks' )+':</td><TD>'+ Data.options.campStats.numAttacks +'</td></tr>\
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
  
  /***Tabla de Anthropus***/
  
    helpPopA : function (){
		var stTitle = 'background-color: #0000AA; font-weight:bold; text-align:center; color:#ffffff;';
        var stTitle2 = 'background-color: #FFFFFF; font-weight:bold;';
        var s0 = 'http://img62.imageshack.us/img62/1582/16857792.gif';
        var s1 = 'http://img683.imageshack.us/img683/8149/31096760.gif';
        var s2 = 'http://img706.imageshack.us/img706/1485/40621535.gif';
        var s3 = 'http://img148.imageshack.us/img148/9913/21372285.gif';
        var s4 = 'http://img90.imageshack.us/img90/1061/24344413.gif';
        var s5 = 'http://img691.imageshack.us/img691/3886/85305366.gif';

		var m = '';
		m += '<TABLE width=100% bgcolor=#ffffd0><TR><TD colspan=3 align=center style="' + stTitle + '">Esta tabla indica el número de unidades para enviar a cualquier cantidad dada anthropus.La campo puede variar en función del nivel de calibración que tiene armas, medicinas y Metalurgia<BR</td></tr>';
		m += '<TABLE width=100% bgcolor=#ffffff><TR><TD colspan=3 align=left style="' + stTitle2 + '">Leyenda: Metalurgia: MT, Medicina: MD, Calibracion de armas: CA, Dragoneria: DG, Desplazamiento Rapdio:DR, Aleaciones:AL</td><TR>';
		m += '<TR><TD><center><BR>Nivel</center></td><TD><center>Unidades</center></td><TD><center>General (estrellas)</center></TD><TD><center>Investig.</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>50 Portador + 50 Minotauro + 100 Arquero</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>no</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>14 Tritones</td><TD><center><img src="'+ s4 +'"></center></td><TD><center>no</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>120 D.Rapido</td><TD><center><img src="'+ s4 +'"></center></td><TD><center>1MT,3DG</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>600 Portador + 33 Arquero</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>?</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>33 Arqueros + 33 T.Blindado</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>?</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>300 Arqueros + 200 porteadores + 200 minotauros + 200 Alabarda</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>1MT,2CA o 8MT</center></TD></tr>';
		m += '<TR><TD><center>1</center></td><TD>500 Gigantes + 25 T.Blindado</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>8MT</center></TD></tr>';
                m += '<TR><TD><center>1</center></td><TD>1500 Dragon de Ataque Rapido</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>7MT, 6MD, 6CA, 8DR, 8DG</center></TD></tr>';
                m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>2</center></td><TD>350 Arqueros + 47 T.Blindado</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>3MT, 3MD, 3CA</center></TD></tr>';
		m += '<TR><TD><center>2</center></td><TD>300 Arqueros + 700 Minotauros + 200 Reclutas + 1050 Portadores</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>3MT, 3MD, 3CA</center></TD></tr>';
		m += '<TR><TD><center>2</center></td><TD>100 Alabarda + 500 Minotauros + 850 Arqueros + 20 T.Blindado</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>3MT, 3MD, 3CA</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>3</center></td><TD>2700 Dragones de ataque rapido</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>4MT, 4MD, 4DG</center></TD></tr>';
		m += '<TR><TD><center>3</center></td><TD>500 Arqueros + 71 T.Blindados</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>4MT, 5MD, 4CA</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';

		m += '<TR><TD><center>4</center></td><TD>1600 Arqueros + 950 Minotauros + 87 T.Blindados</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>4MT, 4MD, 4CA</center></TD></tr>';
		m += '<TR><TD><center>4</center></td><TD>1500 Arqueros + 100 T.Blindados</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>4MT, 4MD, 4CA</center></TD></tr>';
		m += '<TR><TD><center>4</center></td><TD>3500 Dragones de Ataque Rapido + 1700 Dragones de Combate</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>6MT, 6MD, 6CA</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';

		m += '<TR><TD><center>5</center></td><TD>5000 Arqueros + 100 T.Blindado</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>4MT, 4MD, 5CA</center></TD></tr>';
		m += '<TR><TD><center>5</center></td><TD>7600 Dragones de Combate</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7MT, 7MD, 7DG</center></TD></tr>';
		m += '<TR><TD><center>5</center></td><TD>5000 Dragones de combate + 2000 dragones de Ataque rapido</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7MT, 7MD, 7DG</center></TD></tr>';
		m += '<TR><TD><center>5</center></td><TD>4000 Dragones de combate + 4000 dragones de Ataque rapido</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7MT, 7MD, 7DG</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>6</center></td><TD>6000 Arquero + 108 T.Blindado</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7MT, 7MD, 7CA</center></TD></tr>';
		m += '<TR><TD><center>6</center></td><TD>10000 Dragones de Combate</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7MT, 7MD, 7DG</center></TD></tr>';
		m += '<TR><TD><center>6</center></td><TD>20000 Dragones de Ataque Rapido</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>7MT, 7MD, 7DG</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>7</center></td><TD>5000 Arquero + 2000 Tritones</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>9MT, 9MD, 8CA</center></TD></tr>';
		m += '<TR><TD><center>7</center></td><TD>15000 Dragones de combate o 30000 dragones de ataque rapido</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>8MT, 8MD, 8DG</center></TD></tr>';
		m += '<TR><TD><center>7</center></td><TD>20000 Arquero + 400 T.Blindados</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>10MT, 8MD, 9CA</center></TD></tr>';
		m += '<TR><TD><center>7</center></td><TD>600 Tritones + 200 T.Blindados + 3000 Arqueros</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>10MT, 9MD, 10CA</center></TD></tr>';
		m += '<TR><TD><center>7</center></td><TD>10000 Dragones de combate + 6000 Tritones</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>8MT, 8MD, 8DG</center></TD></tr>';
                m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>8</center></td><TD>30000 Arquero + 250 Transporte Blindado</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>9MT, 9MD, 9CA</center></TD></tr>';		
		m += '<TR><TD><center>8</center></td><TD>29000 Dragones de Combate</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>8MT, 8MD, 8DG</center></TD></tr>';
		m += '<TR><TD><center>8</center></td><TD>55000 Dragones de Ataque Rapido</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>8MT, 8MD, 8DG</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
		
		m += '<TR><TD><center>9</center></td><TD>55000 Dragones de Combate</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>9MT, 9MD, 9DG</center></TD></tr>';
                m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';

		m += '<TR><TD><center>10</center></td><TD>100000 Dragones de Combate</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>9MT, 10MD, 10DG</center></TD></tr>';
		m += '<TR><TD><center>10</center></td><TD>15000 Espejos de Fuego + 250 T.Blindados</td><TD><center><img src="'+ s5 +'"></center></TD><TD><center>10MT, 10MD, 10AC</center></TD></tr>';
		m += '<TR><TD><center>10</center></td><TD>30000 Tritones + 1000 Arqueros</td><TD><center><img src="'+ s5 +'"></center></td><TD><center>10MT, 10M, 10AC</center></TD></tr>';
		m += '<TR><TD>&nbsp;</td><TD></td><TD></TD></tr>';
				

  var pop = new CPotpup ('giftHelp', 0, 0, 650, 900, true);
  pop.centerMe (mainPop.getMainDiv());
  pop.getMainDiv().innerHTML = m;
  pop.getTopDiv().innerHTML = '<CENTER><B>Campamentos de Anthropus</b></center>';
  pop.show (true);
  },

  /*** STATS Sub-tab ****/
  tabStats : function (){
    var t = Tabs.AutoAttack;
    var m = '<DIV class=pbSubtitle>'+translate( 'Auto-attack Stats' )+'</div>\
      <CENTER><INPUT id=pmcampRS type=submit value='+translate( 'Clear Stats' )+' \></center>\
      <DIV class=pbStatBox id=pbcampSO></div>';
    document.getElementById('pbatAutoAtaque').innerHTML = m;
    document.getElementById('pbatAutoAtaqueTab').innerHTML = '<DIV></div>';
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
    if (Data.targets.radius!= Data.radscan || Data.targets.center.x!=Seed.s.cities[Seed.cityName[0]].x || Data.targets.center.y!=Seed.s.cities[Seed.cityName[0]].y){
      t.checkMapBusy = true;
      t.setAttackEnable (false);
      t.scanMap(Data.radscan, function(){logit('****** Setting checkMapBusy to FALSE'); Tabs.AutoAttack.checkMapBusy = false});
      return false;
    }    
    return true;
 },
  
  gotBattleReport : function (rpt){
    var t = Tabs.AutoAttack;
//    if (rpt.report.location.terrain != 'AnthropusCamp')
//      return;
    if (rpt.report.location.terrain == null || rpt.report.location.terrain == undefined) {
      logit(rpt);
      return;
    }
    var mid=null;
    for (var p in Data.options.campMarches) {
      var march = Data.options.campMarches[p];
      if (march.x==rpt.report.location.x && march.y==rpt.report.location.y && march.general.id == rpt.report.attacker.general.id){  // TODO: time and troops check here
        mid = p;
        break;
      }
    }
    if (mid) {
      t.trackStats (mid, rpt);
      if (!Data.options.campAttack.deleteCampAttacks && !Data.options.campAttack.stopAttackOnLoss)
        return;
      if (Data.options.campAttack.stopAttackOnLoss){
        for (var p in rpt.report.attacker.units){
          if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1]){
            var ts = new Date(rpt.report_notification.created_at * 1000).myString();
            t.abort ( translate( 'Troops lost!' )+' ('+ ts +')');
            return;
          }
        }
      }
      if (Data.options.campAttack.deleteCampAttacks && rpt.report.attacker.name == Seed.s.name) {
        Messages.deleteMessage (rpt.report_notification.id);
      }
    }
  },
  
  setAttackEnable : function (onOff){
    var t = Tabs.AutoAttack;
    clearTimeout (t.attackTimer);
    var but = document.getElementById('pbatEnable');
    Data.options.campAttack.enabled = onOff;
    if (onOff){
      but.value = ''+translate('Auto ON')+'';
      but.className = 'butAttackOn';
      t.curRunStart = serverTime();
      t.autoCheckTargets();
    } else {
      if (t.curRunStart != 0)
        Data.options.campStats.runTime += (serverTime()-t.curRunStart);
      but.value = ''+translate('Auto OFF')+'';
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
    t.marchTimer = setTimeout (t.marchTick, 2500);
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById('pbatFeedback').innerHTML = msg;
  },

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
      t.attackTimer = setTimeout (t.autoCheckTargets, 2000);
      return;
    }
    if (!t.checkMapData())
      return;
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
      t.dispFeedback ('No Generales disponibles');
      t.attackTimer = setTimeout (t.autoCheckTargets, 5000);
      return;
    }

    // check all potential targets ...
    var camps = t.getActiveCampList();
    var target = null;
    var rptTime = now - ( (Data.options.campAttack.repeatTime * 60) + 1);

    for (var i=0; i<camps.length; i++){
      var camp = camps[i];
      var okPlayer = true;

      // check repeat time
      if (camp.last!=null && camp.last>rptTime)
        continue;

      // check Paramos de otros Jugadores
      if (camp.name != '' && camp.type != 'A' && camp.type != 'C')
        okPlayer = false;

      // check troops
      if (t.checkTroops (cityIdx, camp.lvl) == null && okPlayer){
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
    if (t.attackBusy){
      t.dispFeedback ('ERROR! (Ataque erroneo, no ahy respuesta del servidor?)');
      return;
    }
    t.attackBusy = true;
    t.dispFeedback ( translate( 'Attacking level' )+' '+ camp.lvl +' '+translate( 'camp at' )+' '+ camp.x +','+ camp.y);
    t.lastAttack = now;
    new Ajax.march (Seed.s.cities[Seed.cityName[cityIdx]].id, camp.x, camp.y, gen.id, Data.options.campAttack.troops[camp.lvl], 'camp', function (rslt){
        t.attackBusy = false;
        if (rslt.ok && rslt.dat.result.success){
          t.addMarch (rslt.dat.result.job);
          t.attackErrors = 0;
          camp.last = now;
          if (Data.options.campAttack.logAttacks)
            actionLog ('Enviado ataque a level '+ camp.lvl +' de Coord '+ camp.x +'/'+ camp.y);
          if (notify)
            notify (true);
        } else {
          t.dispFeedback ('Error: '+ rslt.errmsg);
          actionLog ('Attack Error: '+ rslt.errmsg);
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
        if (Seed.units[p] < troops[p]){
          if(p == 'Longbowman'){p = gLongbowman;}
          if(p == 'SwiftStrikeDragon'){p = gSwiftStrikeDragon;}   
          if(p == 'BattleDragon'){p = gBattleDragon;}
          if(p == 'FireMirror'){p = gFireMirror;}
          if(p == 'AquaTroop'){p = gAquaTroop;}
          if(p == 'ArmoredTransport'){p = gArmoredTransport;}
          if(p == 'Giant'){p = gGiant;}
          if(p == 'StoneTroop'){p = gStoneTroop;}
          if(p == 'FireTroop'){p = gFireTroop;}
          if(p == 'WindTroop'){p = gWindTroop;}
          if(p == gLongbowman){p = 'Longbowman';}  
          if(p == gSwiftStrikeDragon){p = 'SwiftStrikeDragon';}  
          if(p == gBattleDragon){p = 'BattleDragon';}
          if(p == gFireMirror){p = 'FireMirror';}
          if(p == gAquaTroop){p = 'AquaTroop';}
          if(p == gArmoredTransport){p = 'ArmoredTransport';}
          if(p == gGiant){p = 'Giant';}
          if(p == gStoneTroop){p = 'StoneTroop';}
          if(p == gFireTroop){p = 'FireTroop';}
          if(p == gWindTroop){p = 'WindTroop';}
            return ( translate( 'Not enough' ) +' '+ p);
        }
      }
    }    if (totTroops <= 0){
      return ('No tropa Definida');
    }
    return null;
  },
  
  // return array of camps that satisfy config (max distance, level enables)
  getActiveCampList : function (){
    var t = Tabs.AutoAttack;
    var ret = [];
    for (var i=0; i<Data.targets.camps.length; i++){
      var camp = Data.targets.camps[i];
      if (((camp.dist<=Data.options.campAttack.levelDist[camp.lvl]) && Data.options.campAttack.levelEnable[camp.lvl]) || Data.CoordMapT)
        if (Data.CoordMapN == '')
          ret.push (camp);
        else
          if (camp.name == Data.CoordMapN)
            ret.push (camp);
    }
    return ret;
  },
  
  checkAttack : function (camp, notify){
    var t = Tabs.AutoAttack;
    var cityId = Seed.s.cities[Seed.cityName[0]].id;
    var cityIdx = 0;
    var gen;
    // check troops
    var troops = Data.options.campAttack.troops[camp.lvl];
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.units[p] < troops[p]){
          if(p == 'Longbowman'){p = gLongbowman;}
          if(p == 'SwiftStrikeDragon'){p = gSwiftStrikeDragon;}   
          if(p == 'BattleDragon'){p = gBattleDragon;}
          if(p == 'FireMirror'){p = gFireMirror;}
          if(p == 'AquaTroop'){p = gAquaTroop;}
          if(p == 'ArmoredTransport'){p = gArmoredTransport;}
          if(p == 'Giant'){p = gGiant;}
          if(p == 'StoneTroop'){p = gStoneTroop;}
          if(p == 'FireTroop'){p = gFireTroop;}
          if(p == 'WindTroop'){p = gWindTroop;}
          if(p == gLongbowman){p = 'Longbowman';}  
          if(p == gSwiftStrikeDragon){p = 'SwiftStrikeDragon';}  
          if(p == gBattleDragon){p = 'BattleDragon';}
          if(p == gFireMirror){p = 'FireMirror';}
          if(p == gAquaTroop){p = 'AquaTroop';}
          if(p == gArmoredTransport){p = 'ArmoredTransport';}
          if(p == gGiant){p = 'Giant';}
          if(p == gStoneTroop){p = 'StoneTroop';}
          if(p == gFireTroop){p = 'FireTroop';}
          if(p == gWindTroop){p = 'WindTroop';}
          else
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
      notify ( translate( 'No Generals Available' ) );
      return;
    }
    new Ajax.march (cityId, camp.x, camp.y, gen.id, troops, 'camp', function (rslt){
      if (rslt.ok && rslt.dat.result.success){
        t.addMarch (rslt.dat.result.job);
        camp.last = serverTime();
        actionLog ('Enviado Ataque al level '+ camp.lvl +' de estas Cord '+ camp.x +'/'+ camp.y);
        notify (null);
      } else {
        notify ('Error: '+ rslt.errmsg );
      }
    });
  },

  
  

  /** CONFIG LEVELS SUB-TAB ***/
  troopTypes : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'AquaTroop', 'StoneTroop',  'FireTroop', 'WindTroop', 'GreatDragon', 'WaterDragon', 'StoneDragon', 'FireDragon', 'WindDragon'],

  tabConfigLevels : function (){
    var t = Tabs.AutoAttack;

    var m  = '<DIV><TABLE><TR>';
        m +=        '<TD><INPUT type=submit id=pbTabCampsA value=" Config Llv 1-5 "></td>';
        m +=        '<TD><INPUT type=submit id=pbTabCampsB value=" Config Llv 6-10 "></td></tr>';
        m +=      '</table></div>';

    m += '<DIV class=pbSubtitle>'+translate( 'Auto-attack Camp Levels' )+'</div>';

    document.getElementById('pbatAutoAtaque').innerHTML = m;

    document.getElementById('pbTabCampsA').addEventListener('click', function () { dispLvlCamp(1); }, false);
    document.getElementById('pbTabCampsB').addEventListener('click', function () { dispLvlCamp(2); }, false);

    dispLvlCamp(2);
    dispLvlCamp(1);


    function dispLvlCamp(lvl) {
      var m = '<TABLE class=pbTabPad align=center border=1><TR><TD>';
      var s = 0;

      if (lvl == 1) 
        m += '<TABLE class=pbTabPad><TR class=pbTabHdr1 align=center><TD style="background:none !important;">Level</td><TD>1</td><TD>2</td><TD>3</td><TD>4</td><TD>5</td></tr>';

      if (lvl == 2) {
        m += '<TABLE class=pbTabPad><TR class=pbTabHdr1 align=center><TD style="background:none !important;">Level</td><TD>6</td><TD>7</td><TD>8</td><TD>9</td><TD>10</td></tr>';
        s = 5;
      }

      m +=  '<TR align=center><TD class=pbTabLeft>'+translate( 'Enable' )+':</td>';

      for (var x=1; x<=5; x++)
        m += '<TD><INPUT style="font-size: 9pt; " type=checkbox id=pbatEn_'+ (x+s) +(Data.options.campAttack.levelEnable[x+s]?' CHECKED':'')   +' \></td>';
      m += '</tr><TR align=center><TD style="font-size: 9pt; " class=pbTabLeft>'+translate( 'Max Dist' )+':</td>';
      for (var x=1; x<=5; x++)
        m += '<TD><INPUT type=text id=pbatDist_'+ (x+s) +' maxlength=2 size=1 style="width:30px; font-size: 9pt; " value="'+ Data.options.campAttack.levelDist[x+s] +'"\></td>';
      m += '</tr><TR><TD><DIV class=short></td></tr>';
      for (i=0; i<t.troopTypes.length; i++){
        m += '<TR><TD class=pbTabLeft style="font-size: 9pt; ">'+ Names.troops.byName[t.troopTypes[i]][4] +':</td>';
        for (var x=1; x<=5; x++){
          var num = Data.options.campAttack.troops[x+s][t.troopTypes[i]];
          if (!num)
            num = 0;
          m += '<TD><INPUT type=text style="font-size: 9pt; " id=pbatTrp_'+ (x+s) +'_'+ i +' maxlength=6 size=1 value="'+ num +'"\></td>';
        }
        m += '</tr>';
      }    

      document.getElementById('pbatAutoAtaqueTab').innerHTML = m + '</td></tr></table>';

      for (var x=1; x<=5; x++)
        document.getElementById('pbatEn_'+ (x+s)).addEventListener('change', enableChanged, false);
      for (var x=1; x<=5; x++)
        document.getElementById('pbatDist_'+ (x+s)).addEventListener('change', distChanged, false);
      for (i=0; i<t.troopTypes.length; i++)
        for (var x=1; x<=5; x++)
          document.getElementById('pbatTrp_'+ (x+s) +'_'+ i).addEventListener('change', troopsChanged, false);

    }

    function enableChanged (e){
      var args = e.target.id.split('_');
      Data.options.campAttack.levelEnable[args[1]] = e.target.checked;
    }

    function distChanged (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      if (isNaN(x) || x<1 || x>t.MAX_DISTANCE){
        e.target.style.backgroundColor = 'red';
        dispError ('Distance must be between 1 and '+ t.MAX_DISTANCE);
      } else {
        e.target.value = x;
        e.target.style.backgroundColor = '';
        Data.options.campAttack.levelDist[args[1]] = x;
      }
    }

    function troopsChanged (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      if (isNaN(x) || x<0 || x>120000){
        e.target.style.backgroundColor = 'red';
        dispError ('El numero de tropas no es correcto');
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

    Data.CoordMapX = Seed.s.cities[Seed.cityName[0]].x;
    Data.CoordMapY = Seed.s.cities[Seed.cityName[0]].y; 
    Data.CoordMapN = ''; 
    Data.CoordMapT = false; 

    var m = '<DIV class=pbSubtitle>'+translate( 'Auto-attack Configuration' )+'</div>\
      <DIV style="overflow-x:auto"><TABLE class=pbTabPad>\
      <TR><TD class=pbTabLeft>'+translate( 'Random delay between attacks' )+':</td><TD>\
        <INPUT class=short id=pbaacfgRD1 maxlength=4 type=text value="'+ Data.options.campAttack.delayMin +'"/> '+translate( 'to' )+' \
        <INPUT class=short id=pbaacfgRD2 maxlength=4 type=text value="'+ Data.options.campAttack.delayMax +'"/> '+translate( 'seconds' )+'</td></tr>\
      <TR><TD class=pbTabLeft>'+translate( 'Same target delay' )+':</td><TD><INPUT class=short id=pbaacfgSTD maxlength=4 type=text value="'+ Data.options.campAttack.repeatTime +'"/> '+translate( 'minutes' )+'</td></tr>\
      <TR><TD class=pbTabLeft>'+translate( 'Log attacks' )+':</td><TD><INPUT id=pbaacfgLA '+ (Data.options.campAttack.logAttacks?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=pbTabLeft>'+translate( 'Delete March Reports' )+':</td><TD><INPUT id=pbaacfgDMR '+ (Data.options.campAttack.deleteCampAttacks?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=pbTabLeft>'+translate( 'Stop if any troops lost' )+':</td><TD><INPUT id=pbaacfgSTL '+ (Data.options.campAttack.stopAttackOnLoss?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=pbTabLeft>'+translate( 'Maximum simultaneous marches' )+':</td><TD><INPUT class=short id=pbaacfgMM maxlength=2 type=text value="'+ Data.options.campAttack.maxMarches +'"\></td></tr>\
      </table>';    


    var n = '<DIV class=pbSubtitle>Tipo de Mapa</div>\
        <DIV style="overflow:auto">\
        <TABLE class=pbTabPad>\
        <TR align=center class=pbTabHdr1><TD style="background:none !important;" colspan=2></td></tr></table>\
        </div><TABLE class=pbTabPad>';
    
    // Add the radio buttons  
    n += '<TR><TD><INPUT type=radio name=pbatMapRadio value="AntCamp" ></td><td>AnthropusCamp</td>';
    n +=     '<TD><INPUT type=radio name=pbatMapRadio value="City" ></td><td>Ciudad</td></tr>';
    n += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Outpost" ></td><td>Outpost</td>';
    n +=      '<TD><INPUT type=radio name=pbatMapRadio value="Grassland" ></td><td>Sabana</td></tr>';
    n += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Swamp" ></td><td>Cienaga</td>';
    n +=     '<TD><INPUT type=radio name=pbatMapRadio value="Lake"></td><td>Lago</td></tr>';
    n += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Hill" ></td><td>Colina</td>';
    n +=     '<TD><INPUT type=radio name=pbatMapRadio value="Plain" ></td><td>Planicie</td></tr>';
    n += '<TR><TD><INPUT type=radio name=pbatMapRadio value="Mountain" ></td><td>Montania</td>';
    n += '    <TD><INPUT type=radio name=pbatMapRadio value="Forest" ></td><td>Bosque</td></tr>';
    n += '<TR><TD></td><TD></td></tr></table>';
    n += '<DIV class=pbSubtitle>Otras Coordenadas de Busqueda</div>';
    n += '<TABLE class=pbTabPad>';
    n +=   '<TR><TD align=center>Radio</td>';
    n +=       '<TD align=center>CoordX</td>';
    n +=       '<TD align=center>CoordY</td>';
    n +=       '<TD align=center>Jugador</td></tr>';
    n +=   '<TR><TD align=center><INPUT type=text id=pbatMapRadius value=35 size=3></td>';
    n +=       '<TD align=center><INPUT type=text id=pbatMapCoordX value=' + Data.CoordMapX + ' size=3></td>';
    n +=       '<TD align=center><INPUT type=text id=pbatMapCoordY value=' + Data.CoordMapY + ' size=3></td>';
    n +=       '<TD align=center><INPUT type=text id=pbatMapJugado size=35 maxlength=50></td></tr>';
    n += '</table>';
    n += '<TABLE class=pbTabPad>';
    n +=   '<TR><TD><INPUT type=checkbox id=pbatMapTodos value="" ></td>';
    n +=       '<td>Buscar en Todos</td>';
    n +=       '<TD class=pbTabLeft colspan="2"><INPUT class=megaButton id=pbaaRescan type="submit" value="Rescan Mapa" ></td>';
    n +=   '</tr>';
    n += '</table>';
    n += '<DIV class=short></div>';
    
    m+= n;

    document.getElementById('pbatAutoAtaque').innerHTML = m;
    document.getElementById('pbatAutoAtaqueTab').innerHTML = '<DIV></div>';
    document.getElementById('pbaacfgDMR').addEventListener('change', function (e){Data.options.campAttack.deleteCampAttacks = e.target.checked;}, false);
    document.getElementById('pbaacfgSTL').addEventListener('change', function (e){Data.options.campAttack.stopAttackOnLoss = e.target.checked;}, false);
    document.getElementById('pbaacfgLA').addEventListener('change', function (e){Data.options.campAttack.logAttacks = e.target.checked;}, false);
    document.getElementById('pbaacfgRD1').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgRD2').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgSTD').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgMM').addEventListener('change', maxMarchesChanged, false);
    document.getElementById('pbaaRescan').addEventListener('click', rescanMap, false);

    document.getElementById('pbatMapRadius').addEventListener('change', function (e){Data.radscan = parseInt(e.target.value);}, false);
    document.getElementById('pbatMapCoordX').addEventListener('change', function (e){Data.CoordMapX = parseInt(e.target.value);}, false);
    document.getElementById('pbatMapCoordY').addEventListener('change', function (e){Data.CoordMapY = parseInt(e.target.value);}, false);
    document.getElementById('pbatMapJugado').addEventListener('change', function (e){Data.CoordMapN = e.target.value;}, false);
    document.getElementById('pbatMapTodos').addEventListener ('change', function (e){Data.CoordMapT = e.target.checked;}, false);

    // add event listeners

    var r = document.getElementsByName('pbatMapRadio');

    if (Data.targets.camps.length != null && Data.targets.camps.length != undefined)
      if (Data.targets.camps[0].type != Data.SelScan)
        Data.SelScan = Data.targets.camps[0].type;

    for (i=0;i<r.length;i++) {
      r[i].addEventListener('change', enableChanged, false);
      r[i].checked = (r[i].value.charAt(0) == Data.SelScan);
    }
    
    function enableChanged (e){
      Data.SelScan = e.target.value.charAt(0);
      return;
    }

    function delayChanged (e){
      var min = parseIntNan(document.getElementById('pbaacfgRD1').value);
      var max = parseIntNan(document.getElementById('pbaacfgRD2').value);
      var repeat = parseIntNan(document.getElementById('pbaacfgSTD').value);
      if (min<MIN_CAMP_DELAY || min>3600 || (max-min)<5 || repeat<30){
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = '<B>Invalido Tiempo</b><BR><BR>El primer valor debe estar entre '+ MIN_CAMP_DELAY +' y 3600<BR>El segundo valor debe ser de al menos 5 por encima del primer valor.<BR>Tercer valor debe ser de 30 minutos por lo menos.';
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
    var m = '<DIV class=pbSubtitle>'+translate( 'Auto-attack Camp Levels' )+'</div>\
      <TABLE id=pbatTargTab class=pbTab>\
        <TR class=pbTabHdr2>\
          <TD>'+translate( 'Dist' )+'</td>\
          <TD>'+translate( 'Coords' )+'</td>\
          <TD>'+translate( 'Level' )+'</td>\
          <TD width=65>'+translate( 'Last Attack' )+'</td>\
          <td>jug.</td>\
          <td></td>\
        </tr>';
    
    var camps = t.getActiveCampList();    

    for (var i=0; i<camps.length; i++){
      m += '<TR>\
              <TD>'+ camps[i].dist +'</td>\
              <TD align=center>'+ camps[i].x +','+ camps[i].y +'</td>\
              <TD align=center>'+ camps[i].lvl +'</td>\
              <TD><span id=pbatList_'+ i +'> --- </span></td>\
              <TD>' + camps[i].type + '-' + camps[i].name + '</td>\
              <TD><INPUT class=small id=pbattargAN_'+ i +' type=submit value="'+translate('Attack Now')+'"></td>\
            </tr>';
    }

    document.getElementById('pbatAutoAtaque').innerHTML = m + '</table>';
    document.getElementById('pbatAutoAtaqueTab').innerHTML = '<DIV></div>';

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
          if (time > 3600)
            ts = '<FONT COLOR=#550000><B>'+ timestr (now-camps[i].last, false) +'</b></font>';
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
    Data.targets = {radius:0, center:{x:Data.CoordMapX, y:Data.CoordMapY}, camps:[]};
    var dial = new ModalDialog (t.cont, 300, 165, '', false, null);
    dial.getContentDiv().innerHTML = 'Escaneando campos de mapa<BR>esto puede deparar 1 minuto no se impaciente';
    var ix=0; iy=0;
    var x = Data.CoordMapX;
    var y = Data.CoordMapY;
    Map.scanMapCirc (x,y, radius, callback, false);
    function callback (dat){
      if (dat==null){
        dial.getContentDiv().innerHTML = '<B>Se produjo un error durante la exploración del mapa.<BR>Recargue la pagina.</b>';
        dial.allowClose (true);
        if (notify)
          notify (false);
        return;
      }
      for (var i=0; i<dat.tiles.length; i++){
        var tile = dat.tiles[i];
        if (tile.type == Data.SelScan || Data.CoordMapT)
          Data.targets.camps.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, type:tile.type, name:tile.name});
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
    var mtClass='pbMarchOther';
    if (march.ownerId == myId)
      mtClass = 'pbMarchMine';
    if (time < 0)
      time = '?';
    else if (isNaN (time))
      time = '---';
    else
      time = timestr(time, true);
    m += '<TR class='+ mtClass +'><TD>'+translate( 'Attack' )+' '+ march.x +','+ march.y +'</td><TD>('+ march.target +'-'+ march.terrain_level +')</td><TD>'+ march.status +'<TD>'+ time +'</td></tr>';
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
    var cid = Seed.s.cities[Seed.cityName[cityIdx]].id;
    if (Seed.buildings[cid] != null) {
      for (var i=0; i<Seed.buildings[cid].length; i++){
        if (Seed.buildings[cid][i].type == type)
          ret.push (Seed.buildings[cid][i]);
      }
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
    var cid = Seed.s.cities[Seed.cityName[cityIdx]].id;
    for (var i=0; i<Seed.buildings[cid].length; i++){
      if (Seed.buildings[cid][i].id == bid)
        return (Seed.buildings[cid][i]);
    }
    return null;
  },
}



var Ajax = {
  // cat: 'all, 'reports', ''
  messageList : function (cat, callback, pag){
  if (!cat)
    cat = 'all';
  if (pag == null || pag == undefined)
    pag = 1;
  new MyAjaxRequest ('reports.json', { 'user%5Fid':C.attrs.userId, 'dragon%5Fheart':C.attrs.dragonHeart, count:12, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, category:cat, page:pag, version:VERSION_DE_JUEGO }, mycb, false);
	function mycb (rslt){
      if (rslt.ok && rslt.dat.result.success){
        if (callback)
          callback (rslt.dat.result.report_notifications);
      } else if (callback)
        callback (null);
    }
  },

  messageDetail : function (id, callback){
    new MyAjaxRequest ('reports/'+ id +'.json', { 'user%5Fid':C.attrs.userId, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, version:VERSION_DE_JUEGO, 'dragon%5Fheart':C.attrs.dragonHeart }, mycb, false);	
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
	p['version'] = VERSION_DE_JUEGO;
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
	p['version'] = VERSION_DE_JUEGO;
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
	p['version'] = VERSION_DE_JUEGO;
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
 

  researchStart : function (cityId, researchType, callback){
    var t = Ajax;
    var p = {};
	p['user%5Fid'] = C.attrs.userId;
    p['%5Fmethod'] = 'post';
	p['timestamp'] = parseInt(serverTime());
	p['%5Fsession%5Fid'] = C.attrs.sessionId;
	p['research%5Bresearch%5Ftype%5D'] = researchType;
	p['dragon%5Fheart'] = C.attrs.dragonHeart;
	p['version'] = VERSION_DE_JUEGO;
    new MyAjaxRequest ('cities/'+ cityId +'/researches.json', p, mycb, true);
    function mycb (rslt){
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
  march : function (cityId, x, y, genId, units, ownerId, callback){
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
      if (units[pu] > 0){
        u[pu] = units[pu];
        if (mt == true )
          sendTroops += "%2C";
        sendTroops += "%22" + pu + "%22%3A" + units[pu];
        mt = true;
      }
    sendTroops += "%7D";

    p['march%5Bunits%5D'] = sendTroops; 
    p['march%5Bgeneral%5Fid%5D'] = genId;
    p['version'] = VERSION_DE_JUEGO;
    p['%5Fmethod'] = 'post';
    p['dragon%5Fheart'] = C.attrs.dragonHeart;
    p['user%5Fid'] = C.attrs.userId;
    p['march%5Bx%5D'] = x;
    p['%5Fsession%5Fid'] = C.attrs.sessionId;
		// Send request
    new MyAjaxRequest ('cities/'+ cityId +'/marches.json', p, mycb, true);
    function mycb (rslt){
      --t.marchBusy;
      if (rslt.ok && !rslt.dat.errors){
        if (rslt.dat.result.success){
          try {
            Seed.jsonGotCity (rslt.dat.result);
            Seed.marches[rslt.dat.result.job.march_id].ownerId = ownerId;          
          } catch (e){
            WinLog.write ('***********'+ e);
         }
        } else {
          rslt.ok = false;
          if (matTypeof(rslt.dat.result.errors) == 'array')
            rslt.errmsg = rslt.dat.result.errors[0];
          else 
            rslt.errmsg = rslt.dat.result.errors;
        }
      }      
      if (callback)
        callback (rslt);
    }
  },

  marchRecall : function (cityId, marchId, callback){ // untested
    var t = Ajax;
    var p = {};
        p['user%5Fid'] = C.attrs.userId;
	p['dragon%5Fheart'] = C.attrs.dragonHeart;
	p['%5Fsession%5Fid'] = C.attrs.sessionId;
        p['%5Fmethod'] = 'delete';
	p['version'] = VERSION_DE_JUEGO;
	p['timestamp'] = parseInt(serverTime());
    new MyAjaxRequest ('cities/'+ cityId +'/marches/'+ marchId +'.json', p, mycb, true);
    function mycb (rslt){
      if (rslt.ok){
        if (rslt.dat.result.success){
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
	p['user%5Fid'] = C.attrs.userId;
	p['timestamp'] = parseInt(serverTime());
	p['%5Fsession%5Fid'] = C.attrs.sessionId;
	p['version'] = VERSION_DE_JUEGO;
	p['dragon%5Fheart'] = C.attrs.dragonHeart;
   new MyAjaxRequest ('cities/'+ cityId +'/move_resources.json', p, mycb, true);
    function mycb (rslt){
      if (rslt.ok){
        Seed.jsonGotCity (rslt.dat);
      }
      else {
        logit( "Auto-Collect Error: " + rslt.msg);
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
    for (var out=1; out<Seed.cityLen; out++)
      collect (out, out*30000);
    t.timer = setTimeout (t.doit, ((Data.options.autoCollect.delay*Data.options.autoCollect.unit) + (Math.random()*120))*1000);
    function collect (cityIdx, delay){
      setTimeout (function(){
        Ajax.collectResources (Seed.s.cities[Seed.cityName[cityIdx]].id);
        actionLog ('Recursos puesto de avanzada #'+ cityIdx + ' ¡¡Recogidos!!');
      }, delay);
    }
  },
}


//******************************** Info Tab *****************************
Tabs.Info = {
	tabOrder : 1,
	tabDisabled : false,
	cont : null,
	timer : null,
  
  init : function (div){
    var t = Tabs.Info;
    t.cont = div;

    t.cont.innerHTML = '<DIV class=pbTitle>DOA Español - version:  '+ Version + '</div>\
      <TABLE width=100%><TR><TD><INPUT type=submit value=" Actualizar " id=pbinfRefresh></input><INPUT id=pcReloadTools type=submit \
      value=" Recargar Pagina " \></td><TD align=right><SPAN id=pbinfGmt></span></td><TD align=right>\
      <SPAN id=pbinfUtc></span></tr></tr></table><DIV id=pbinfCont></div>';

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

    var city = Seed.s.cities[Seed.cityName[0]];
    var m = '';
    var col = 0;

    m += '<DIV class=short></div>'+ cityTitle(0, true);
    m += t.dispTorre();
    m += '<TABLE style="margin-top:3px" width=100%>\
          <TR bgcolor=#dde align=center><TD style="border-right: 1px solid; border-bottom: 1px solid;"><B>'+translate( 'UNITS' )+'</b></td></tr></table>';

    // Troops
    m += '<TABLE class=pbTabPad width=100%><TR>';

    for (var i=0; i<Names.troops.names.length; i++){
      var name = Names.troops.names[i][3];
      var name2 = Names.troops.names[i][1];
      if (name=='GreatDragon' || name=='WaterDragon' || name=='StoneDragon' || name=='FireDragon' || name=='WindDragon' || name2=='GreatDragon' || name2=='WaterDragon' || name2=='StoneDragon' || name2=='FireDragon' || name2=='WindDragon')
        continue;
      var num = 0;
      num = Seed.units[name2];
      if (!num)
        num = 0;
      var marchNum = 0;
      for (p in Seed.marches)
        for (q in Seed.marches[p].units)
          if (q == name2)
            marchNum += Seed.marches[p].units[q];
      var marchStr = (marchNum > 0) ? '<B>(' + marchNum + ')</b>' : '';
      m += '<TD class=pbTabLeft width=40%>'+ name +':</td><TD align=right width=5%>'+ num +'</td><TD align=right width=5%>'+ marchStr +'</td>';
      if (col == 0)
        col = 1;
      else {
        m += '</tr><tr>';
        col = 0
      }
    }
    m += '</table>';

    m += '<TABLE style="margin-top:3px" width=100%>\
          <TR bgcolor=#dde align=center><TD style="border-right: 1px solid; border-bottom: 1px solid;"><B>RECURSOS</b></td></tr></table>';
    m += '<TABLE class=pbTabPad width=100%><TR>' + dispResearchJob(0) + '</tr></table>';
    m += '<TABLE class=pbTabPad width=100%><TR>' + dispRecursos() + '<TR></tr></table>';
    m += '<TABLE style="margin-top:3px" width=100%>\
          <TR bgcolor=#dde align=center><TD style="border-right: 1px solid; border-bottom: 1px solid;"><B>CIUDADES - OUTPOST</b></td></tr></table>';

	// city, outposts ...
    m += '<TABLE style="margin-top:3px" width=100%><TR>';

    if (Seed.cityLen > 0){
      for (var i=0; i<Seed.cityLen; i++){
        m += '<TD width=50%><TABLE style="margin-top:3px" width=100%><TR><TD>' + cityTitle(i, false) + '</TD></TR><TR><TD>' + dispTrainingJobs(i);
        m +=  '</TD></TR><TR><TD>' + dispBuildingJob(i) + '</TD></TR></TABLE></TD>';
        if (i==1 || i==3 || i==5)
          m += '</TR><TR>';
      }
      m += '</TR></TABLE>';
    }

    m += '<TABLE style="margin-top:3px" width=100%><TR bgcolor=#dde align=center><TD style="border-right: 1px solid;\
          border-bottom: 1px solid;"><B>'+translate( 'GENERALS' )+'</b></td></tr></table>\
          <TABLE class=pbTabPad width=100%><TD class=pbTabPad>' + translate( 'Marches' )+': <b>'+ Seed.numMarches +'</b></td>\
          <td></td></table><TABLE class=pbTabPad width=100%>';
    col = 0;

//    for (var ig=0; ig<Seed.generals.length; ig++){

    for (var ig in Seed.generals) {
      if (Seed.numMarches)
        for (pm in Seed.marches)
          if (Seed.marches[pm].march_type != "Transport")
            try {
              if (Seed.generals[ig].name == Seed.marches[pm].general.first_name)
                loc = Seed.marches[pm].x + ',' + Seed.marches[pm].y;
            }
            catch (e) {
             actionLog('Err: general first_name not available' + e.name + ' ' + e.message);
            }
      if (col == 0)
        m += '<TR>';
      m += '<TD align=right>'+ Seed.generals[ig].name +' ('+ Seed.generals[ig].rank +')</td><TD>'+ (Seed.generals[ig].busy?loc:'')+''
      m += (Seed.generals[ig].busy?' <SPAN class=boldRed>Ocupado</span>':'') +'</td>';
      if (col == 0)
        col = 1;
      else {
        m += '</tr>';
        col = 0
      }
    }
    m += '</table>';

    document.getElementById('pbinfCont').innerHTML = m; 

    var now = new Date();  
    now.setTime(now.getTime() + (now.getTimezoneOffset()*5,9));
    document.getElementById('pbinfGmt').innerHTML = now.toTimeString().substring (0,8) +' GMT';
    t.timer = setTimeout (t.showStuff, 2000);

    var now = new Date();  
    now.setTime(now.getTime() + (now.getTimezoneOffset()*60000));
    document.getElementById('pbinfUtc').innerHTML = now.toTimeString().substring (0,8) +' UTC';

    function cityTitle (cityIdx, def){
      var city = Seed.s.cities[Seed.cityName[cityIdx]], ancho = '50%', wallStatus = '', scaning = '';
      if (cityIdx == 0 && def) {
        ancho = '100%';
        if (!Map.finscan)
          scaning = '<TD align=center>Buscando...</td>';
        wallStatus = (city.defended) ? '<font class="defending">'+translate( 'Defendiendo' )+'</font>' : '<font class="hiding">'+translate( 'Escondido' )+'</font>';
      }
      wallStatus = '<div class=pbSubtitle><TABLE width="' + ancho + '" class=pbTab><TR><TD align=left>'+ translate(city.name) +'</td>' + scaning + '<TD align=center>'+ city.x +','+ city.y +'</td><TD align=right>'+ wallStatus +'</td></tr></table></div>';
      return wallStatus;
    }

    function dispRecursos (){
      var m = '';
      var recursos = Seed.resources;
      m += '<TR><TD class=pbTabLeft>Alimento:</td><TD>'+ miles(recursos.food)  +'</td>';
      m +=     '<TD class=pbTabLeft>Madera:  </td><TD>'+ miles(recursos.wood)  +'</td></tr>';
      m += '<TR><TD class=pbTabLeft>Metal:   </td><TD>'+ miles(recursos.ore)   +'</td>';
      m +=     '<TD class=pbTabLeft>Piedra:  </td><TD>'+ miles(recursos.stone) +'</td></tr>';
      return m;
    }

    function dispBuildingJob (cityIdx){
      var m = '', job = getBuildingJob (cityIdx);
      if (job && job.job.run_at > serverTime()) {
        if(job.building.type =='Home'){job.building.type = gHome;}
        if(job.building.type =='Wall'){job.building.type = gWall;}
        if(job.building.type =='Factory'){job.building.type = gFactory;}
        if(job.building.type =='Rookery'){job.building.type = gRookery;}
        if(job.building.type =='Theater'){job.building.type = gTheater;}
        if(job.building.type =='Fortress'){job.building.type = gFortress;}
        if(job.building.type =='Garrison'){job.building.type = gGarrison;}
        if(job.building.type =='Sentinel'){job.building.type = gSentinel;}
        if(job.building.type =='DragonKeep'){job.building.type = gDragonKeep;}
        if(job.building.type =='Metalsmith'){job.building.type = gMetalsmith;}
        if(job.building.type =='MusterPoint'){job.building.type = gMusterPoint;}
        if(job.building.type =='StorageVault'){job.building.type = gStorageVault;}
        if(job.building.type =='ScienceCenter'){job.building.type = gScienceCenter;}
        if(job.building.type =='OfficerQuarter'){job.building.type = gOfficerQuarter;}
        if(job.building.type =='TrainingCamp'){job.building.type = gTrainingCamp;}
        if(job.building.type =='Silo'){job.building.type = gSilo;}
        if(job.building.type =='Farm'){job.building.type = gFarm;}
        if(job.building.type =='Mine'){job.building.type = gMine;}
        if(job.building.type =='Quarry'){job.building.type = gQuarry;}
        if(job.building.type =='Lumbermill'){job.building.type = gLumbermill;}

        m += '<TABLE class=pbTabPad><tr><TD>'+ job.building.type +' Lvl.'; 
        m += job.job.level + ' '+ timestr(job.job.run_at - serverTime(), true) +'</td></tr></table>';
      }
      else
        m += '<TABLE class=pbTabPad><tr><TD>--</td></tr></table>';
     
      return m;
    }

    function dispResearchJob (cityIdx){
      var m = '', job = getResearchJob (00);
      if (job && job.run_at > serverTime()){
      	if(job.research_type =='Agriculture'){job.research_type = gAgriculture;}
      	if(job.research_type =='Woodcraft'){job.research_type = gWoodcraft;}
      	if(job.research_type =='Masonry'){job.research_type = gMasonry;}
      	if(job.research_type =='Mining'){job.research_type = gMining;}
      	if(job.research_type =='Clairvoyance'){job.research_type = gClairvoyance;}
      	if(job.research_type =='RapidDeployment'){job.research_type = gRapidDeployment;}
      	if(job.research_type =='Ballistics'){job.research_type = gBallistics;}
      	if(job.research_type =='Metallurgy'){job.research_type = gMetallurgy;}
      	if(job.research_type =='Medicine'){job.research_type = gMedicine;}
      	if(job.research_type =='Dragonry'){job.research_type = gDragonry;}
      	if(job.research_type =='Levitation'){job.research_type = gLevitation;}
      	if(job.research_type =='Mercantilism'){job.research_type = gMercantilism;}
      	if(job.research_type =='AerialCombat'){job.research_type = gAerialCombat;}

        m += '<TD class=pbTabPad><b> '+translate( 'Research' )+': </b>'+ job.research_type +' Lvl.'+ job.level;
        m += ' ' + timestr(job.run_at - serverTime(), true) +'</td>';
      }
      return m;
    }

    function dispTrainingJobs (cityIdx){
      var last = serverTime(), tot='', trains = [], timeRemaining = 0;
      var cid = Seed.s.cities[Seed.cityName[cityIdx]].id;
      tot = '<TABLE class=pbTabPad><TR>---</td></tr></table>';
      for (var p in Seed.jobs[cid]){
        var job = Seed.jobs[cid][p];
        if (job.queue=='units' && job.unit_type && job.run_at > last)
          trains.push (job);
      }
      trains.sort(function(a,b){return a.run_at-b.run_at});
      for (var i=0; i<trains.length; i++){
        timeRemaining = (trains[i].run_at-serverTime() > 0) ? trains[i].run_at-serverTime() : 0;
        tot = '<TABLE class=pbTabPad><TR><td>Entrenamiento finaliza en <b>'+ timestrShort(timeRemaining) +'</b></td></tr></table>';
        last = trains[i].run_at;
      }
      return tot;
    }

  },

  refresh : function (){
    var t = Tabs.Info;
    Seed.fetchCity ();  
    Seed.fetchSeed (t.showStuff());  
  },


  dispTorre : function () {
    var attacchi = 0, spiate = 0, m = ''; 
    return m;
  },

}

function getBuildingJob (cityIdx){
  var cid = Seed.s.cities[Seed.cityName[cityIdx]].id;
  for (var p in Seed.jobs[cid]){
    var job = Seed.jobs[cid][p];
    if (job.queue == 'building')
      return ({job:job, building:Buildings.getById(cityIdx, job.city_building_id)});
  }
  return null;
}

function getResearchJob (cityIdx){
  var cid = Seed.s.cities[Seed.cityName[cityIdx]].id;
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
    [0, 'Porter','Porter',gPorter,gPorte],
    [1, 'Conscript', 'Conscr',gConscript,gConscr],
    [2, 'Spy', 'Spy',gSpy,gSpies],
    [3, 'Halberdsman', 'Halbrd',gHalberdsman,gHalbrd],
    [4, 'Minotaur', 'Mino',gMinotaur,gMino],
    [5, 'Longbowman', 'LBM',gLongbowman,gLBM],
    [6, 'SwiftStrikeDragon', 'SSDrg',gSwiftStrikeDragon,gSSDrg],
    [7, 'BattleDragon', 'BatDrg',gBattleDragon,gBatDrg],
    [8, 'ArmoredTransport', 'ATrans',gArmoredTransport,gATrans],
    [9, 'Giant', 'Giant',gGiant,gGiant],
    [10, 'FireMirror', 'FireM',gFireMirror,gFireM],
    [11, 'AquaTroop', 'Fang',gAquaTroop,gFang],
    [12, 'StoneTroop', 'Ogre',gStoneTroop,gOgre],
    [13, 'FireTroop', 'Pyro',gFireTroop,gPyro],
    [14, 'WindTroop', 'Banshee',gWindTroop,gWind],
    [15, 'GreatDragon', 'GrtDrg',gGreatDragon,gGrtDrg],
    [16, 'WaterDragon', 'WatDrg',gWaterDragon,gWatDrg],
    [17, 'StoneDragon', 'StnDrg',gStoneDragon,gStnDrg],
    [18, 'FireDragon', 'FirDrg',gFireDragon,gFirDrg],
    [19, 'WindDragon', 'WinDrg',gWindDragon,gWinDrg]
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
    [100, 'AquaTroopRespirator', 'Respirators'],
    [101, 'AquaTroopRespiratorStack100', 'Respirator-100'],
    [102, 'AquaTroopRespiratorStack500', 'Respirator-500'],
    [103, 'AquaTroopRespiratorStack1000', 'Respirator-1000'],
    [110, 'GreatDragonBodyArmor', 'GD Armor-1'],
    [111, 'GreatDragonHelmet', 'GD Armor-2'],
    [112, 'GreatDragonTailGuard', 'GD Armor-3'],
    [113, 'GreatDragonClawGuards', 'GD Armor-4'],
    [114, 'WaterDragonBodyArmor', 'WD Armor-1'],
    [115, 'WaterDragonHelmet', 'WD Armor-2'],
    [116, 'WaterDragonTailGuard', 'WD Armour-3'],
    [117, 'WaterDragonClawGuards', 'WD Armor-4'],
    [118, 'WaterDragonEgg', 'WaterDragonEgg'],
    [120, 'StoneDragonEgg', 'StoneDragonEgg'],
    [121, 'StoneDragonBodyArmor', 'SD Armor-1'],
    [122, 'StoneDragonHelmet', 'SD Armor-2'],
    [123, 'StoneDragonTailGuard', 'SD Armour-3'],
    [124, 'StoneDragonClawGuards', 'SD Armor-4'],
    [125, 'StoneTroopItem', 'Mandrakes'],
    [126, 'StoneTroopItemStack100', 'Mandrake-100'],
    [127, 'StoneTroopItemStack500', 'Mandrake-500'],
    [128, 'StoneTroopItemStack1000', 'Mandrake-1000'],
    [130, 'FireDragonEgg', 'FireDragonEgg'],
    [131, 'FireDragonBodyArmor', 'FireDragonBodyArmor'],
    [132, 'FireDragonHelmet', 'FireDragonHelmet'],
    [133, 'FireDragonTailGuard', 'FireDragonTailGuard'],
    [134, 'FireDragonClawGuards', 'FireDragonClawGuards'],
    [135, 'FireTroopItem', 'FireTroopItem'],
    [136, 'FireTroopItemStack100', 'FireTroopItemStack100'],
    [137, 'FireTroopItemStack500', 'FireTroopItemStack500'],
    [138, 'FireTroopItemStack1000', 'FireTroopItemStack1000'],
    [139, 'WindDragonEgg', 'WindDragonEgg'],
    [140, 'WindDragonBodyArmor', 'WindDragonBodyArmor'],
    [141, 'WindDragonHelmet', 'WindDragonHelmet'],
    [142, 'WindDragonTailGuard', 'WindDragonTailGuard'],
    [143, 'WindDragonClawGuards', 'WindDragonClawGuards'],
    [144, 'WindTroopItem', 'WindTroopItem'],
    [145, 'WindTroopItemStack100', 'WindTroopItemStack100'],
    [146, 'WindTroopItemStack500', 'WindTroopItemStack500'],
    [147, 'WindTroopItemStack1000', 'WindTroopItemStack1000']
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
  tabOrder : 99,
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
    t.dispBuildings ('Seed.s.cities[Seed.cityName[0]].buildings', Seed.s.cities[Seed.cityName[0]].buildings);
    t.dispBuildings ('Seed.s.cities[1].buildings', Seed.s.cities[1].buildings);
  },
  
  dispScripts : function (){
    pop = new CPotpup ('debug', 0,0, 1000,800, true); 
    pop.getTopDiv ().innerHTML = '<B><CENTER>Debug - List Scripts</center></b>' ;
    var scripts = document.getElementsByTagName('script');
    var m = '<DIV style="height:560px; max-height:560px; overflow-y:auto; overflow-x:auto">';
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
        status = 'volviendo';
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

// example: http://www150.kingdomsofcamelot.com
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
  var goto = 'http://apps.facebook.com/dragonsofatlantis/realm/'+serverId;
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}


/****************************************JOB TAB********************************************************/

Tabs.Research = {
  tabOrder        : 7,
  tabLabel        : 'Investigar',
  tabDisabled     : false,
  cont            : null,
  timer           : null,
  capitolResearch : {Agriculture:'Agricultura', Woodcraft:'Carpinteria', Masonry:'Mamposteria', Mining:'Aleaciones', Clairvoyance:'Clarividencia',   RapidDeployment :'Despliegue Rapido', Ballistics:'Calibracion de Armas', Metallurgy:'Metalurgia', Medicine:'Medicina', Dragonry:'Dragoneria',   Levitation      :'Levitacion', Mercantilism:'Mercantilismo', AerialCombat:'Combate Aereo'},
  researchIdx     : {Agriculture:0, Woodcraft:1, Masonry:2, Mining:3, Clairvoyance:4, RapidDeployment:5, Ballistics:6, Metallurgy:7, Medicine:8, Dragonry:9, Levitation:10, Mercantilism:11, AerialCombat:12},
  contentType     : 0, // 0 = info, 1 = train, 2 = build, 3 = research
  fixAvailable    : {},

  init : function (div){
    var t = Tabs.Research;
    t.cont = div;
    div.innerHTML =  '<TABLE width=100% bgcolor=#ffffd0 align=center><TR><TD></td></tr></table>\
			<DIV id=pb_job_Boton></div>\
			<DIV id=pb_job_Sele style="padding-top:5px; overflow-y:auto;"></div>\
			<DIV id=pb_job_Opc></div>';

    for (var i=0; i<Seed.cityLen; i++) {
        if (!Data.options.autoResearch.researchEnable[i])
            Data.options.autoResearch.researchEnable[i] = {};
        if (!Data.options.researchCap[i])
            Data.options.researchCap[i] = {};
    }

    t.contentType = 3;        
    t.tabJobResearch();
    t.tabJobOpc();
    t.setResearchEnable (Data.options.autoResearch.enabled);
    t.tabJobInfo();

  },

  show : function (){
    var t = Tabs.Research;
  },
	
  hide : function (){
    var t = Tabs.Research;
  },


  tabJobOpc : function () {
    var t = Tabs.Options;
    var selected = new Array(4);
    var m = '';

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
      m = '<DIV class=pbTitle style="margin-bottom:10px">Configuraciones Varias</div><TABLE class=pbTab>\
        <TR valign=top><TD><B>'+translate('Config')+':</b></td></tr>\
        <TR><TD><INPUT id=ptAllowWinMove type=checkbox>Permitir mover la ventana con el raton</td></tr>\
        <TR><TD><INPUT id=ptHiddenHd type=checkbox checked>Ocultar Barra de Publicidad</td></tr></TABLE>\
        <TABLE class=pbTab><TR><TD><B><BR>'+translate( 'Features' )+':</b></td></tr></TABLE>\
        <TABLE class=pbTab>\
          <TR valign=center><TD><INPUT id=pboptACol type=checkbox> Autorecolección de recursos cada \
                <INPUT id=pboptAColTime size=1 maxlength=2 type=text value="'+ Data.options.autoCollect.delay +'" />\
                <SELECT id=pboptAColUnit size=1>\
                  <OPTION value=1 '+selected[1]+'>Segundo(s)</OPTION>\
                  <OPTION value=60 '+selected[2]+'>Minuto(s)</OPTION>\
                  <OPTION value=3600 '+selected[3]+'>Hora(s)</OPTION>\
                  <OPTION value=86400 '+selected[4]+'>Dia(s)</OPTION>\
                </SELECT></TD></TR>\
        </TABLE><BR><HR>';

      document.getElementById('pb_job_Opc').innerHTML = m;

      t.togOpt ('ptAllowWinMove', Data.options.ptWinDrag, mainPop.setEnableDrag);
      t.togOpt ('pboptACol', Data.options.autoCollect.enabled, AutoCollect.setEnable);

      document.getElementById('ptHiddenHd').addEventListener('click', Tabs.Research.HiddenHd, false);
      document.getElementById('pboptAColTime').addEventListener ('change', t.timeChanged, false);
      document.getElementById('pboptAColUnit').addEventListener ('change', t.unitChanged, false);

    } catch (e) {
      document.getElementById('pb_job_Opc').innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
  },

  HiddenHd : function (evt) {
    document.getElementById('hd').hidden = evt.target.checked;   
  },

  tabJobInfo : function (){
    var t = Tabs.Research;
    clearTimeout (t.timer);
    var m = '<DIV><TABLE class=pbTabPad>' + dispResearchJob(0) + '</td></tr></table></DIV>';
  
    document.getElementById('pb_job_Desc').innerHTML = m; 
    t.timer = setTimeout (t.tabJobInfo, 2000);

    function dispResearchJob (cityIdx){
			var m = '<TR><TD class=pbTabLeft>'+translate( 'Research' )+':</td>';
      var job = getResearchJob (00);
      if (job)
        m += '<TD>'+ job.research_type +' level '+ job.level +'</td><TD class=pbTabRight>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
      else
        m += '<TD colspan=2><SPAN class=boldRed>NONE</span></td></tr>';
      return m;
    }
	
  },
  
  tabJobResearch : function (){
    var t = Tabs.Research;
    var n = '<DIV class=pbSubtitle> Auto Investigar</div>\
             <DIV class=pbStatBox><CENTER><INPUT id=pbresOnOff type=submit\></center>\
             <DIV id=pb_job_Desc></div>\
             <DIV id=pbresStat></div> <BR>\
             <DIV id=pbresFeedback class=pbstatus_feedback></div>  </div>';

    document.getElementById('pb_job_Boton').innerHTML = n;
		
    var m = '<DIV id=pbresConfig class=pbInput>';
    var el = [];
    var city = Seed.s.cities[Seed.cityName[0]];
    var i=0;
    var cc=0;
   
    m += '<DIV class=pbSubtitle>Investigaciones</div><TABLE class=pbTab><TR valign=top><TD><TABLE class=pbTab>';

    for (var p in t.capitolResearch){
      if (cc==0)
        m += '<TR>';
      m += '<TD><INPUT type=checkbox id="pbrescb_'+ 0 + '_' +t.capitolResearch[p] +'" '+ (Data.options.autoResearch.researchEnable[0][t.capitolResearch[p]]?'CHECKED':'') +' /></td><TD>'+ t.capitolResearch[p] +'</td><TD>'+ researchDisplayCap(i) +'</td>';  
      el.push('pbrescb_' + 0 + '_' +t.capitolResearch[p]);
      ++i;
      if (cc==0) {
        cc = 1;
      }
      else {
        m += '</tr>';
        cc = 0;
      }
    }

    m += '</table></td><TD><TABLE class=pbTab>';  
    m += '</div>';

//    document.getElementById('pb_job_Sele').style.height = "240px";
    document.getElementById('pb_job_Sele').innerHTML = m;
    
    for (var i=0; i<el.length; i++)
      document.getElementById(el[i]).addEventListener('click', checked, false);
      
    var ii = 0;

    for (var p in t.capitolResearch) {
      var selectMenu = document.getElementById('pbrescap_'+ 0 + '_' +ii);
      try {
        if (!Data.options.researchCap[0][ii]) {
          var currentResearchLevel = t.getCurrentResearchLevel(p);
          selectMenu.selectedIndex = currentResearchLevel;
          Data.options.researchCap[0][ii] = currentResearchLevel;
        }
        else {
          selectMenu.selectedIndex = Data.options.researchCap[0][ii];
          selectMenu.options[Data.options.researchCap[0][ii]].selected = true;
        }
      }
      catch (e) { }
      selectMenu.addEventListener('change', changeResearchCap, false);
      ++ii;
    }
      
    document.getElementById('pbresOnOff').addEventListener ('click', function (){t.setResearchEnable (!Data.options.autoResearch.enabled);}, false);
    t.refreshResearchButton (Data.options.autoResearch.enabled);

    function checked (evt){
      var rId = evt.target.id.split ('_');
      Data.options.autoResearch.researchEnable[rId[1]][rId[2]] = evt.target.checked;
      if (!evt.target.checked) {}
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

      Data.options.researchCap[rId[1]][rId[2]] = evt.target[evt.target.selectedIndex].value;

      evt.target.style.backgroundColor = '';  

      if (Data.options.autoResearch.enabled)
          t.researchTick();     
    }	

  },
 
  setResearchEnable : function (onOff){
    var t = Tabs.Research;
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
    
    refreshResearchButton : function (onOff) {
        var t = Tabs.Research;
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

    // Modified to work with jobs
    dispFeedback : function (msg){
        var t = Tabs.Research;
        
        if (document.getElementById('pbresFeedback'))
          document.getElementById('pbresFeedback').innerHTML = new Date().toTimeString().substring (0,8) +' '+  msg;       
    },

    // Returns the current research level or zero if the user has not
    // researched this type yet
    // TBD - remove the if statements, make sure that the type passed
    // is UI convolved
    getCurrentResearchLevel : function (researchType){
        var t = Tabs.Research, level = 0;
    
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
    
    // Returns the user set research cap or zero if the cap has not been set
    getResearchCap : function (researchType){
        var t = Tabs.Research;
        var cap = 0;
        var resType = t.capitolResearch;
     
        for (var p in resType) {
            //if (resType[p] == researchType) {
            if (p == researchType) {
                try {
                    cap = (Data.options.researchCap[0][t.researchIdx[researchType]]) ? Data.options.researchCap[0][t.researchIdx[researchType]] : 0; 
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
        var t = Tabs.Research;
        for (var p in t.capitolResearch)
            if (p == researchType) 
                return t.capitolResearch[p];
    },
  
    // Used by research jobs
    // This would be simple if only one building of each type existed, but you may build multiple garrisons/training camps
    // So we have to look through the entire list and use an additional parameter to specify the building level needed
    // Returns zero if the specified building is not the at the required level

    getBuildingLevel : function(cityIdx, buildingType, buildingLevel){
        var buildings = Seed.s.cities[cityIdx].buildings;
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
        var t = Tabs.Research;
        return t.researchIdx[researchType];
    },

    checkAgricultureReqs : function() {
        var t = Tabs.Research;
        var researchType = 'Agriculture';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 500 * Math.pow(2,researchLevel +1);
        var food = 250 * Math.pow(2,researchLevel + 1);
        var metal = 100 * Math.pow(2,researchLevel + 1);
        var farmLevel = researchLevel + 1;
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city    = Seed.s.cities[Seed.cityName[0]];
        city    = Seed;

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
        var t = Tabs.Research;
        var researchType = 'Woodcraft';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 1200 * Math.pow(2,researchLevel +1);
        var lumber = 500 * Math.pow(2,researchLevel + 1);
        var metal = 100 * Math.pow(2,researchLevel + 1);
        var millLevel = researchLevel + 1;
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city = Seed;

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
        var t = Tabs.Research;
        var researchType = 'Masonry';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 1500 * Math.pow(2,researchLevel +1);
        var stone = 500 * Math.pow(2,researchLevel + 1);
        var metal = 200 * Math.pow(2,researchLevel + 1);
        var quarryLevel = researchLevel + 1;
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city = Seed;

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
        var t = Tabs.Research;
        var researchType = 'Mining';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 2000 * Math.pow(2,researchLevel +1);
        var metal = 800 * Math.pow(2,researchLevel + 1);
        var mineLevel = researchLevel + 1;
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city = Seed;

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
        var t = Tabs.Research;
        var researchType = 'Clairvoyance';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 2000 * Math.pow(2,researchLevel + 1);
        var food = 2400 * Math.pow(2,researchLevel + 1);
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city = Seed;

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
        var t = Tabs.Research;
        var researchType = 'RapidDeployment';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 600 * Math.pow(2,researchLevel + 1);
        var food = 3000 * Math.pow(2,researchLevel + 1);
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city = Seed;

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
        var t = Tabs.Research;
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
        var city = Seed;

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
        var t = Tabs.Research;
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
        var city = Seed;

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
        var t = Tabs.Research;
        var researchType = 'Medicine';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 3600 * Math.pow(2,researchLevel +1);
        var food = 1500 * Math.pow(2,researchLevel + 1);
        var scienceCenterLevel = researchLevel;          
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city = Seed;

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
        var t = Tabs.Research;
        var researchType = 'Dragonry';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 5000 * Math.pow(2,researchLevel +1);
        var food = 2500 * Math.pow(2,researchLevel + 1);
        var metal = 1000 * Math.pow(2,researchLevel + 1);
        var scienceCenterLevel = researchLevel; 
        var rookeryLevel = researchLevel;         
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city = Seed;

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
        var t = Tabs.Research;
        var researchType = 'Levitation';
        var researchLevel = t.getCurrentResearchLevel(researchType);
        var gold = 5000 * Math.pow(2,researchLevel +1);
        var lumber = 2000 * Math.pow(2,researchLevel + 1);
        var metal = 2000 * Math.pow(2,researchLevel + 1);
        var scienceCenterLevel = researchLevel + 1; 
        var woodcraftLevel = researchLevel + 1;         
        var m = '';
        var n = '<TABLE><TR><TD>Need: </td>';
        var city = Seed;

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
        var t = Tabs.Research;
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
        var city = Seed;

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
        var t = Tabs.Research;
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
        var city = Seed;

        try {
            var seedReqs = Seed.requirements.research[researchType];
            gold = seedReqs.level[researchLevel + 1].resources['gold'];
            food = seedReqs.level[researchLevel + 1].resources['food'];
            dragonskeepLevel = seedReqs.level[researchLevel + 1].buildings['DragonKeep'];
            dragonryLevel = seedReqs.level[researchLevel + 1].research['Dragonry'];
            bodyArmor = seedReqs.level[researchLevel + 1].items['GreatDragonBodyArmor'];
            clawGuards = seedReqs.level[researchLevel + 1].items['GreatDragonClawGuards'];
            dragonHelmet = seedReqs.level[researchLevel + 1].items['GreatDragonHelmet'];
            tailGuard = seedReqs.level[researchLevel + 1].items['GreatDragonTailGuard'];
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
        if (t.getBuildingLevel(0, 'DragonKeep', dragonskeepLevel) < dragonskeepLevel) m += '<TD>&nbsp;Dragons Keep '+ dragonskeepLevel +'</td>';
        if (t.getCurrentResearchLevel('Dragonry') < dragonryLevel) m += '<TD>&nbsp;Dragonry '+ dragonryLevel +'</td>';
        if (t.getItem(kGDBodyArmor) != bodyArmor) m += '<TD>&nbsp;Body Armor ' + bodyArmor +'</td>';
        if (t.getItem(kGDClawGuards) != clawGuards ) m += '<TD>&nbsp;Claw Guards ' + clawGuards +'</td>';
        if (t.getItem(kGDHelmet) != dragonHelmet ) m += '<TD>&nbsp;Helmet ' + dragonHelmet +'</td>';
        if (t.getItem(kGDTailGuard) != tailGuard ) m += '<TD>&nbsp;Tail Guard ' + tailGuard +'</td>';
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
        var t = Tabs.Research;
    
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

    // Research heartbeat
  resErrorCount : 0,
  doResRecheck  : false,

  researchTick : function (){
    var t = Tabs.Research;

    if (!Data.options.autoResearch.enabled)
      return;

    Data.options.rJobs.length = 0;
      
    Seed.notifyOnUpdate(function(){
      var nothingToDo = true;
      var rJob = getResearchJob (00);
      var city = Seed.s.cities[Seed.cityName[0]];
      var cityId = city.id;
            
      if (rJob == null){                                  

        var reJobs = Data.options.rJobs;                               // Is there a research job in persistent data?

        for (var i=0; i<reJobs.length; i++) {
          if (reJobs[i]) {
            if (reJobs[i].done || !reJobs[i].duration || reJobs[i].run_at + reJobs[i].duration > serverTime()) {
              reJobs.splice(i,1);
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
        else {                                                         // We have a job running  // Look at the record
          if (rJob) {
            var jFound = false;                                              // Look for the job in persistent data
            for (var i=0; i<Data.options.rJobs.length; i++) {     // Check the rJob structure for a field called city_research_id or some 
                                                                   // such (like the building) Otherwise, double-check that the ids match
              if (rJob.id == Data.options.rJobs[i].id) {
                jFound = true;
              }
            }                                                        // If the job is not in persistent data, put it there
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

      }
    }); 
  },

    doResearch : function (researchType, researchLevel){
        var t = Tabs.Research;
        var city = Seed.s.cities[Seed.cityName[0]];
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


  refresh : function (){
    var t = Tabs.Research;
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
  tabOrder : 4,
  tabLabel : gBuild,
  cont : null,
  buildTimer : null,
  statTimer : null,
  capitalCity : ['Home', 'Garrison', 'ScienceCenter', 'Metalsmith', 'OfficerQuarter', 'MusterPoint', 'Rookery', 'StorageVault', 'Theater', 'Sentinel', 'Factory', 'Fortress', 'DragonKeep', 'Wall'],
  capitalField : ['Farm', 'Mine', 'Quarry', 'Lumbermill'],
  outpostCity : ['TrainingCamp', 'Home', 'Silo', 'MusterPoint', 'DragonKeep', 'Wall'],
  outpostField : ['Farm', 'Mine', 'Quarry', 'Lumbermill'],
  
  capitalCityger : [gHome, gGarrison, gScienceCenter, gMetalsmith, gOfficerQuarter, gMusterPoint, gRookery, gStorageVault, gTheater, gSentinel, gFactory, gFortress, gDragonKeep, gWall],
  capitalFieldger : [gFarm, gMine, gQuarry, gLumbermill],
  outpostCityger : [gTrainingCamp, gHome, gSilo, gMusterPoint, gDragonKeep, gWall],
  outpostFieldger : [gFarm, gMine, gQuarry, gLumbermill],
  
  
  init : function (div){
    var t = Tabs.Build;
    t.cont = div;

    for (var i=0; i<Seed.cityLen; i++)
      if (!Data.options.autoBuild.buildingEnable[i])
        Data.options.autoBuild.buildingEnable[i] = {};
        
    var m = '<DIV class=pbTitle>'+translate( 'Auto Upgrade Buildings' )+'</div>\
      <DIV class=pbStatBox><CENTER><INPUT id=pbbldOnOff type=submit\></center>\
      <DIV id=pbbldBldStat></div> <BR> <DIV id=pbbldFeedback style="font-weight:bold; border: 1px solid green; height:17px"></div>  </div>\
      <DIV id=pbbldConfig class=pbInput>';
    var el = [];

    for (var i=0; i<Seed.cityLen; i++){
      if (i==0){
        listC = t.capitalCity;
        listF = t.capitalField;
        listD = t.capitalCityger;
        listG = t.capitalFieldger;
      } else {
        listC = t.outpostCity;
        listF = t.outpostField;
        listD = t.outpostCityger;
        listG = t.outpostFieldger;
      }     
 
      var city = Seed.s.cities[Seed.cityName[i]];
      m += '<DIV class=pbSubtitle>'+ translate(city.name) +'</div><TABLE class=pbTab><TR valign=top><TD width=150><TABLE class=pbTab>';

      for (var ii=0; ii<listC.length; ii++){
        m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listC[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listC[ii]]?'CHECKED':'') +' /></td><TD>'+ listD[ii] +'</td></tr>';  
        el.push('pbbldcb_'+ i +'_'+ listC[ii]);
        if (ii==6 && ii<listC.length)
          m += '</table></td><TD><TABLE class=pbTab>';  
      }

      m += '</table></td><TD><TABLE class=pbTab>';  

      for (var ii=0; ii<listF.length; ii++){
        m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listF[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listF[ii]]?'CHECKED':'') +' /></td><TD>'+ listG[ii] +'</td></tr>';  
        el.push('pbbldcb_'+ i +'_'+ listF[ii]);
      }

      m += '</table></td></tr></table>';
    }    
    m += '</div>';
    div.innerHTML = m;
    for (var i=0; i<el.length; i++)
      document.getElementById(el[i]).addEventListener('click', checked, false);

    t.setEnable (Data.options.autoBuild.enabled);
    document.getElementById('pbbldOnOff').addEventListener ('click', function (){t.setEnable (!Data.options.autoBuild.enabled);}, false);
    
    function checked (evt){
      var id = evt.target.id.split ('_');
      var cityId = Seed.s.cities[Seed.cityName[id[1]]].id;
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
      but.value = translate( 'Auto Build ON' );
      but.className = 'butAttackOn';
      t.buildTick();
    } else {
      but.value = translate( 'Auto Build OFF' );
      but.className = 'butAttackOff';
    }
  },
  
  statTick : function (){
    var t = Tabs.Build;
    var m = '<TABLE class=pbTabPad>';
    clearTimeout (t.statTimer);
    for (var i=0; i<Seed.cityLen; i++){
      var city = Seed.s.cities[Seed.cityName[i]];
      var job = getBuildJob (i);
      m += '<TR><TD>'+ translate(city.name) +'</td><TD>';
      if (job == null)
        m += '---</td></tr>';
      else {
        var b = Buildings.getById(i, job.city_building_id);
        m += ''+translate( 'Building' )+' </td><TD>'+translate( 'level' )+' '+ job.level +' '+ translate( b.type )  +'</td><TD>'+ timestr(job.run_at-serverTime(), true)  +'</td></tr>';
      }
    }
    document.getElementById('pbbldBldStat').innerHTML = m +'</table>';
    t.statTimer = setTimeout (t.statTick, 2000);
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
        for (var ic=0; ic<Seed.cityLen; ic++ ){
          var city = Seed.s.cities[Seed.cityName[ic]];
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
          t.dispFeedback ('Nada que hacer, desactivada auto-construcción.');
          t.setEnable (false);
          return;
        }
        t.buildTimer = setTimeout (t.buildTick, 8000);
    }); 
  },
  
  doBuild : function (building, city){
    var t = Tabs.Build;
	if (building.level >= 9){
		return;
	}
	if(building.type == 'Home'){building.type = gHome;}
 	if(building.type == 'Wall'){building.type = gWall;}
 	if(building.type == 'Factory'){building.type = gFactory;}
 	if(building.type == 'Rookery'){building.type = gRookery;}
	if(building.type == 'Theater'){building.type = gTheater;}
 	if(building.type == 'Fortress'){building.type = gFortress;}
 	if(building.type == 'Garrison'){building.type = gGarrison;}
 	if(building.type == 'Sentinel'){building.type = gSentinel;}
 	if(building.type == 'DragonKeep'){building.type = gDragonKeep;}
 	if(building.type == 'Metalsmith'){building.type = gMetalsmith;}
 	if(building.type == 'MusterPoint'){building.type = gMusterPoint;}
 	if(building.type == 'StorageVault'){building.type = gStorageVault;}
 	if(building.type == 'ScienceCenter'){building.type = gScienceCenter;}
 	if(building.type == 'OfficerQuarter'){building.type = gOfficerQuarter;}
 	if(building.type == 'TrainingCamp'){building.type = gTrainingCamp;}
 	if(building.type == 'Silo'){building.type = gSilo;}
 	if(building.type == 'Farm'){building.type = gFarm;}
 	if(building.type == 'Mine'){building.type = gMine;}
 	if(building.type == 'Quarry'){building.type = gQuarry;}
 	if(building.type == 'Lumbermill'){building.type = gLumbermill;}
    var msg = ''+translate( 'Building level' )+' '+ (building.level+1) +' '+ building.type + ' en ' + ''+ translate(city.name) +'';
	if(building.type == gHome){building.type = 'Home';}
 	if(building.type == gWall){building.type = 'Wall';}
 	if(building.type == gFactory){building.type = 'Factory';}
 	if(building.type == gRookery){building.type = 'Rookery';}
	if(building.type == gTheater){building.type = 'Theater';}
 	if(building.type == gFortress){building.type = 'Fortress';}
 	if(building.type == gGarrison){building.type = 'Garrison';}
 	if(building.type == gSentinel){building.type = 'Sentinel';}
 	if(building.type == gDragonKeep){building.type = 'DragonKeep';}
 	if(building.type == gMetalsmith){building.type = 'Metalsmith';}
 	if(building.type == gMusterPoint){building.type = 'MusterPoint';}
 	if(building.type == gStorageVault){building.type = 'StorageVault';}
 	if(building.type == gScienceCenter){building.type = 'ScienceCenter';}
 	if(building.type == gOfficerQuarter){building.type = 'OfficerQuarter';}
 	if(building.type == gTrainingCamp){building.type = 'TrainingCamp';}
 	if(building.type == gSilo){building.type = 'Silo';}
 	if(building.type == gFarm){building.type = 'Farm';}
 	if(building.type == gMine){building.type = 'Mine';}
 	if(building.type == gQuarry){building.type = 'Quarry';}
 	if(building.type == gLumbermill){building.type = 'Lumbermill';} 
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
        actionLog ('Error: '+ rslt.errmsg);
        if (++t.errorCount > 3){
          t.dispFeedback ('Demasiados errores, deshabilitada auto-construcción');
          t.setEnable (false);
          return;
        }
        t.dispFeedback ('Error: '+ rslt.errmsg);
        t.buildTimer = setTimeout (t.buildTick, 20000);
        return;
      }
    });
  },
  
}

 function getBuildJob (cityIdx){
  var cid = Seed.s.cities[Seed.cityName[cityIdx]].id;
  var jobs = Seed.jobs[cid];
  for (var p in jobs){
    if (jobs[p].queue == 'building')
      return jobs[p];
  }
  return null;
 }
 
/********************************   TRAIN Tab *****************************/
Tabs.Train = {
  tabOrder : 5,
  tabLabel : gTrain,
  cont : null,
  trainTimer : null,
  statTimer : null,
  capitalTroops : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror'],
  outpost1Troops : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'AquaTroop'],
  outpost2Troops : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'StoneTroop'],
  outpost3Troops : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'FireTroop'],
  outpost4Troops : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'WindTroop'],

  init : function (div){
    var t = Tabs.Train;
    t.cont = div;
    
    for (var c=0; c<Seed.cityLen; c++)
      if (!Data.options.autoTrain.city[c])
        Data.options.autoTrain.city[c] = {};
    for (var c=0; c<Seed.cityLen; c++) {
      if (!Data.options.autoTrain.city[c].troopType) {
        Data.options.autoTrain.city[c].troopType = [];
        for (tt=0; tt<t.capitalTroops.length; tt++)
          Data.options.autoTrain.city[c].troopType[tt] = {};
      }
    }
	
	// Create status ticker
    var m = '<DIV class=pbTitle>'+translate('Auto Train')+'</div>\
      <DIV class=pbStatBox><CENTER><INPUT id=pbtrnOnOff type=submit\></center>\
      <DIV id=pbtrnTrnStat></div> <BR> <DIV id=pbtrnFeedback style="font-weight:bold; border: 1px solid green; height:17px"></div>  </div>\
      <DIV id=pbtrnConfig class=pbInput>';
	  
	// Create troop table for each city
    var el = [];
    for (var c=0; c<Seed.cityLen; c++){
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
        case 4:
          troopTypes = t.outpost4Troops;
          break;
        default:
          troopTypes = t.capitalTroops;
      }
      var city = Seed.s.cities[Seed.cityName[c]];
      m += '<DIV class=pbSubtitle>'+ translate(city.name) +'</div><TABLE class=pbTab><TR valign=top><TD width=150><TABLE class=pbTab>';
      for (tt=0; tt<troopTypes.length; tt++){
        if (tt%3 == 0) m += '<TR>';
        m += '<TD class=pbTabLeft>'+ Names.troops.byName[troopTypes[tt]][4] +':</td>';
        var num = Data.options.autoTrain.city[c].troopType[tt];
        if (!num || isNaN(num)) num = 0;
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
    document.getElementById('pbtrnOnOff').addEventListener ('click', function (){t.setEnable (!Data.options.autoTrain.enabled);}, false);
	
	// Update troops on change
    function troopsChanged (e){
		var args = e.target.id.split('_');
		var x = parseIntZero(e.target.value);
		if (isNaN(x) || x<0 || x>100000){
			e.target.style.backgroundColor = 'red';
			dispError ('El numero de tropas no es correcto');
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
      but.value = ''+translate('Auto-Train ON')+'';
      but.className = 'butAttackOn';
      t.trainTick(0);
    } else {
      but.value = ''+translate('Auto-Train OFF')+'';
      but.className = 'butAttackOff';
    }
  },
  
  statTick : function (){
    var t = Tabs.Train;
    var m = '<TABLE class=pbTabPad>';
    var cid = 0;
    var city = '';
    clearTimeout (t.statTimer);
    for (var c=0; c<Seed.cityLen; c++){
      var last = serverTime();
      var trains = [];
      city = Seed.s.cities[Seed.cityName[c]];
      cid = city.id;
      if (Seed.jobs[cid]!=null && Seed.jobs[cid]!=undefined)
        for (var j=0; j<Seed.jobs[cid].length; j++){
          if (Seed.jobs[cid][j]!=null && Seed.jobs[cid][j]!=undefined)
            if (Seed.jobs[cid][j].queue=='units' && Seed.jobs[cid][j].unit_type)
              trains.push (Seed.jobs[cid][j]);
        }
      if (trains.length != 0) {
        for (var j=0; j<trains.length; j++){
          var left='', tot='';
          if (j==0)
            left = ''+ translate(city.name) +' ';
          else if (j==trains.length-1)
            tot = ' &nbsp <B>('+ timestrShort(trains[j].run_at-serverTime()) +')</b>';
          m += '<TR><TD>' + left +'</td><TD>'+ trains[j].quantity +' '+ Names.troops.byName[trains[j].unit_type][3] +' </td><TD> '
            + timestr(trains[j].run_at-last, true) + tot + '</td></tr>';
          last = trains[j].run_at;
        }   
      }
      else{
        m += '<TR><TD>'+ translate(city.name) +'</td><TD>---</td></TR>';
      }
    }
    document.getElementById('pbtrnTrnStat').innerHTML = m +'</table>';
    t.statTimer = setTimeout (t.statTick, 2000);
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
		if (ic == Seed.cityLen) {
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
		    case 4:
				troopsLength = t.outpost4Troops.length;
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
				break
			case 4:
				var troopType = t.outpost4Troops[count];
				var troopQty = Data.options.autoTrain.city[ic].troopType[count];
				break
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
		var city = Seed.s.cities[Seed.cityName[ic]];
        if(troopType == 'Porter'){troopType = gPorter;}
        if(troopType == 'Conscript'){troopType = gConscript;}
        if(troopType == 'Spy'){troopType = gSpy;}
        if(troopType == 'Halberdsman'){troopType = gHalberdsman;}
        if(troopType == 'Minotaur'){troopType = gMinotaur;}
        if(troopType == 'Longbowman'){troopType = gLongbowman;}
        if(troopType == 'SwiftStrikeDragon'){troopType = gSwiftStrikeDragon;}
        if(troopType == 'BattleDragon'){troopType = gBattleDragon;}
        if(troopType == 'ArmoredTransport'){troopType = gArmoredTransport;}
        if(troopType == 'Giant'){troopType = gGiant;}
        if(troopType == 'FireMirror'){troopType = gFireMirror;}
        if(troopType == 'AquaTroop'){troopType = gAquaTroop;}
        if(troopType == 'StoneTroop'){troopType = gStoneTroop;} 
        if(troopType == 'FireTroop'){troopType = gFireTroop;}
        if(troopType == 'WindTroop'){troopType = gWindTroop;} 	
        var msg = translate('Training')+ ' '+ troopQty +' '+ troopType +' en '+ ''+ translate(city.name) +'';
        if(troopType == gPorter){troopType = 'Porter';}
        if(troopType == gConscript){troopType = 'Conscript';}
        if(troopType == gSpy){troopType = 'Spy';}
        if(troopType == gHalberdsman){troopType = 'Halberdsman';}
        if(troopType == gMinotaur){troopType = 'Minotaur';}
        if(troopType == gLongbowman){troopType = 'Longbowman';}
        if(troopType == gSwiftStrikeDragon){troopType = 'SwiftStrikeDragon';}
        if(troopType == gBattleDragon){troopType = 'BattleDragon';}
        if(troopType == gArmoredTransport){troopType = 'ArmoredTransport';}
        if(troopType == gGiant){troopType = 'Giant';}
        if(troopType == gFireMirror){troopType = 'FireMirror';}
        if(troopType == gAquaTroop){troopType = 'AquaTroop';}
        if(troopType == gStoneTroop){troopType = 'StoneTroop';} 
        if(troopType == gFireTroop){troopType = 'FireTroop';}
        if(troopType == gWindTroop){troopType = 'WindTroop';}
		t.dispFeedback (msg);
		Ajax.troopTraining (troopType, troopQty, city.id, function (rslt){
			Seed.fetchCity (city.id, 1000);
			t.statTick();
			if (rslt.ok){
				t.errorCount = 0;
				actionLog (msg);
				count = count + 1;
				t.trainTimer = setTimeout (function(){ t.attemptTrain(ic, count, troopsLength) }, 2000);
				return;
			} else {
				Seed.fetchSeed();
				actionLog ('Error: '+ rslt.errmsg);
				if (++t.errorCount > 3){
					t.dispFeedback ( translate('Too many errors, disabling auto-train') );
					t.setEnable (false);
					return;
				}
				t.dispFeedback ('Error: '+ rslt.errmsg);
				t.trainTimer = setTimeout (t.trainTick, 10000);
				return;
			}
		});
	},
}

function getTrainJob (cityIdx){
	var cid = Seed.s.cities[Seed.cityName[cityIdx]].id;
	var jobs = Seed.jobs[cid];
	for (var p in jobs){
		if (jobs[p].queue == 'units')
			return jobs[p];
	}
	return null;
}

/*********************************** Options Tab ***********************************/
Tabs.Options = {
  tabOrder : 6,
  tabLabel : gOpts,
  tabDisabled : true,
  cont : null,
  fixAvailable : {},

  init : function (div){
    var t = Tabs.Options;
    t.cont = div;
    try {      
      m = '<DIV class=pbTitle style="margin-bottom:10px">'+translate( 'DOA Power Tools Options' )+'</div><TABLE class=pbTab>\
           <TR valign=top><TD colspan=2><B>'+translate( 'Config' )+':</b></td></tr></TABLE>';
      t.cont.innerHTML = m;
    } catch (e) {
      t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
  },

	timeChanged : function (e){
		var etime = document.getElementById('pboptAColTime');
		var time = parseIntZero (etime.value);
		etime.value = time;
		Data.options.autoCollect.delay = time;
	},
  
	unitChanged : function (e){
		var eunit = document.getElementById('pboptAColUnit');
		var unit = parseIntZero (eunit.value);
		eunit.value = unit;
		Data.options.autoCollect.unit = unit;
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
	
  hide : function (){
  },
  show : function (){
  },
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
    C : gCity,
    O : gOutpost,
    H : gHill,
    G : gSavanna,
    L : gLake,
    M : gMountain,
    F : gForest,
    P : gPlain,
    S : gSwamp,  
    A : gAnthropusCamp,
},
  finscan : true,

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
    new MyAjaxRequest ('map.json', { 'user%5Fid':C.attrs.userId, x:t.firstX, y:t.firstY, timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, 'dragon%5Fheart':C.attrs.dragonHeart, version:VERSION_DE_JUEGO }, t.got, false);
  },  


  got : function (rslt){
    var t = Map;
    var x = rslt.dat.x;
    var ret = {tiles:[]}
    
    if (!rslt.ok){
      t.callback (null);    // error !?!
      return;
    }

    var til3 = rslt.dat.city_wildernesses;
    var til4 = rslt.dat.map_cities;

    var det  = '';

    for (var i=0; i<rslt.dat.terrain.length; i++){
      for (var ii=0; ii<rslt.dat.terrain[i].length; ii++){
        var tile = rslt.dat.terrain[i][ii];
        var dist = distance (t.centerX, t.centerY, tile[2], tile[3]);
        if (dist <= t.radius){

        det = '';

          var type = tile[0].substr(0,1).toUpperCase();
          var d = {x:tile[2], y:tile[3], dist:dist, type:type, lvl:tile[1], name:det};

          if (t.doDetail){
             if (type=='W'){
             } else if (type=='C') {
             }
          }
          ret.tiles.push (d);
        }
      }
    }

    if (++t.curIX >= t.widthI){
      t.curIX = 0;
      if (++t.curIY >= t.widthI){
        ret.done = true;
        Map.finscan = true;
        t.callback (ret); 
        return;
      }
    }

    ret.done = false;
    Map.finscan = false;
    t.callback (ret);  
//WinLog.writeText ('***** AJAX: '+ t.curX +' , '+ t.curY);    
    setTimeout (function(){new MyAjaxRequest ('map.json', { 'user%5Fid':C.attrs.userId, x:t.normalize(t.firstX+(t.curIX*15)), y:t.normalize(t.firstY+(t.curIY*15)), timestamp:parseInt(serverTime()), '%5Fsession%5Fid':C.attrs.sessionId, 'dragon%5Fheart':C.attrs.dragonHeart, version:VERSION_DE_JUEGO }, t.got, false);}, MAP_DELAY);
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
    <TR valign=middle align=center><TD><INPUT id=MD7r8h type=submit value="CERRAR" style="display:none"/></td></tr></table>';
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
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id=fabi'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    m += '<TD class=spacer width=90% align=right></td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;

    t.currentTab = null;
    for (k in t.tabList) {
      if (t.tabList[k].name == Data.options.currentTab)
        t.currentTab = t.tabList[k] ;
      document.getElementById('fabi'+ k).addEventListener('click', this.e_clickedTab, false);
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
    t.setTabStyle (document.getElementById ('fabi'+ t.currentTab.name), true);
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
    var newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('fabi'+ newTab.name), true);
      t.setTabStyle (document.getElementById ('fabi'+ t.currentTab.name), false);
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
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};


function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  var pop = new CPotpup ('ptcancont', 0, 0, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>DOA Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptcccancel type=submit value="CANCELAR" \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value="CONTINUAR" \></td></tr></table>';
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
    pop = new CPotpup ('pbretry', 0, 0, 400,200, true);
    pop.centerMe(mainPop.getMainDiv());
    pop.getTopDiv().innerHTML = '<CENTER>DOA Español by botserver</center>';
    pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>A ocurrido un error como no...:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
        <BR><BR><B>DOA Tools recargara automaticamente en <SPAN id=paretrySeconds></b></span> segundos ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCELAR Reintento" \>';
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

function MyAjaxRequest (url, params, callback, isPost){
  var o = {onSuccess:mySuccess, onFailure:myFailure}, p, ajax, msg;
  var retrySecs = 3.33;
  o.parameters = {};

  for (var p in params)
    o.parameters[p] = params[p];
 
  if (isPost) {
    o.method = 'POST';
  } else {
    o.method = 'GET';
  }
		
  o.timeoutSecs = 45;

  ajax = new AjaxRequest (C.attrs.apiServer +'/'+ url, o);

  function mySuccess (r){
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

  function myFailure (r){
    error (r.status, r.statusText +' ('+ r.status +')');
  }
		
  function myFailureNew(r) {
    if (r.status > 200 && r.responseText) {
      callback({ok:false, dat:JSON.parse(r.responseText)});
    } else if (r.status > 0) {
      callback({ok:false, errmsg:r.statusText});
    } else {
      msg = 'This browser is not compatible at this time';
      callback({ok:false, errmsg:msg});
    }
  }

  function error (code, msg){
    if (!code || (code>=400 && code<500)){      
      cancel();
      return;
    }
    retrySecs *= 1.5;
    if (code == 509)
      retrySecs = SegError;
    new DialogRetry (msg, retrySecs, retry, cancel);
    function retry (){
      new MyAjaxRequest (url, params, callback, isPost);
    }
    function cancel(){
      callback ({ok:false, errmsg:msg});
    }
  }

}


function AjaxRequest (url, opts){
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
  
  function timedOut(){
    ajax.abort();
    if (opts.onFailure) opts.onFailure({responseText:null, status:599, statusText:'Request Timed Out', ajax:ajax}); // CHECK: 599 is custom error code. See if better option exists.
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
	tabOrder: 07,
	tabLabel : gLog,
        tabDisabled : true,
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
  var ul = searchDOM (document.getElementById('hd'), 'node.tagName=="UL"', 4);
  var li = document.createElement ('li');
  var a = document.createElement ('a');
  li.className = 'tab first';
  a.innerHTML = text;
  a.href='javascript:';
  a.addEventListener ('click', eventListener, true);
  a.className = 'toolbutOff';
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
  wins : {},    // prefix : CPotpup obj

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
function CPotpup (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 123456;
    
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
  this.div.className = 'CPotpup '+ prefix +'_CPotpup';
  this.div.id = prefix +'_paal';					// botserver antes: this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (CPotpUpTopClass==null)
    topClass = 'CPotpupTop '+ prefix +'_CPotpupTop';
  else
    topClass = CPotpUpTopClass +' '+ prefix +'_'+ CPotpUpTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size: 9pt; padding:0px 5px">X</td></tr>\
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
//    for (k in unsafeWindow.cpotpupWins){
//      if (k != t.prefix)
//        unsafeWindow.cpotpupWins[k].unfocusMe(); 
//    }
  }
  function unfocusMe (){
    t.setLayer(-5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
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
    } else
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

function translate( wordToTranslate ) {
    var returnWord = wordToTranslate
    if ( navigator.language != 'es' || navigator.language != 'nl' || navigator.language != 'du' || navigator.language != 'fr' || navigator.language != 'es-ES') {
        if ( translateSPArray[wordToTranslate] != undefined ) {
          returnWord = translateSPArray[wordToTranslate];
        }
        else {
//            logit( wordToTranslate+' traduccido by mago' )
        }
    }
    return returnWord;
}

function miles(numero) {
  var n = '';
  var m = String(numero);
  while(m.length > 3) {
    n = ',' + m.substr(m.length-3) + n;
    m = m.substr(0, m.length-3);
  }
  return m + n;
}

function createCheckBox(a,b,c,d,e,f,g,h,j){
  var r="";
  a&&(r+=b!=""?"<TR "+b+">":"<TR>");
  c&&(r+=d>0?"<TD colspan="+d+">":"<TD>");
  r+="<INPUT id="+e+" type=checkbox"+(f==!0?" CHECKED":"")+" />";
  g!=""&&(r+=" "+translate(g));
  j==void 0&&(j=!0);
  j&&(r+="</td>");
  h&&(r+="</tr>");
  return r
}

function createSubmitButton(a,b,c,d,e,f){
  var g="";
  e==void 0&&(e="");
  f==void 0&&(f="");
  d&&(g+="<CENTER>");
  g+="<INPUT id="+a+" type=submit";
  f!=""&&(g+=' style="'+f+'"');
  e!=""&&(g+=" class="+e);
  b!=""&&(g+=' value="'+b+'"');
  c&&(g+=" DISABLED");
  g+="></input>";
  d&&(g+="</center>");
  return g
}

function createTextInput(a,b,c,d,e,f){
  a="<INPUT id="+a+" type=text";
  e==void 0&&(e="");
  f==void 0&&(f="");
  f!=""&&(a+=' style="'+f+'"');
  e!=""&&(a+=" class="+e);
  b!=""&&(a+=' value="'+b+'"');
  c!=0&&(a+=" size="+c);
  d!=0&&(a+=" maxlength="+d);
  a+="></input>";
  return a
}

function createSelect(a,b,c,d,e,f,g,h,j,r){
  var l="";
  r==void 0&&(r=!0);
  a&&(l+="<TR>");
  b&&(l+="<TD>");
  l+="<SELECT id="+c;
  d!=0&&(l+=" size="+d);
  l+=">";
  for(a=0;a<e.length;a++)
    l+="<OPTION value="+e[a]+(e[a]==f?" selected":"")+">",l+=r?translate(g[a]):g[a],l+="</option>";
  l+="</select>";
  j&&(l+="</td>");
  h&&(l+="</tr>");
  return l
}

function isValidAudio(){
  var a=DocSound,b=!1,c="";
  if(Data.options.warningTower.soundUrl.length==0)
    return!0;
  if(Data.options.warningTower.soundUrl.length<5)
    c="File non valido!";
  else{
    var d=Data.options.warningTower.soundUrl.toLowerCase().substring(Data.options.warningTower.soundUrl.length-4);
    d==".wav"?d='audio/wav; codecs="1"':d==".mp3"?d="audio/mpeg;":d==".ogg"?d='audio/ogg; codecs="vorbis"':d==".mid"?d="audio/mid;":c="Tipo di File non valido!<BR>Tipi validi: .ogg, .mid, .wav"+(IsChrome==!0?", .mp3":"");
    c.length==0&&!a.mss.canPlayType(d)?c="Tipo di File non riproducibile!":b=!0
  }

  if(c.length!=0)(
    new ModalDialog(a.cont,300,150,"",!0)).getContentDiv().innerHTML=c;
    return b
  }

  var DocSound={
    init:function(){
      var a=DocSound;
      a.mss=document.createElement("audio");
      a.loadUrl()
    },

    loadUrl:function(){
      var a=DocSound;
      if(isValidAudio()&&(document.getElementById("pbPlayNow").disabled=!0,Data.options.warningTower.soundUrl.length!=0))a.mss.src=Data.options.warningTower.soundUrl,a.mss.load(),a.mss.addEventListener("loadeddata",a.loadedData)
    },

    loadedData:function(){
      document.getElementById("pbPlayNow").disabled=!1
    },

    soundFinished:function(){
      var a=DocSound;
      alarmActive&&!alarmStopped&&a.playSound()
    },

    soundTheAlert:function(){
      var a=DocSound;
      isValidAudio()&&Data.options.warningTower.soundUrl.length!=0&&(alarmActive=!0,a.playSound())
    },

    playSound:function(){
      var a=DocSound;
      if(isValidAudio()&&Data.options.warningTower.soundUrl.length!=0)document.getElementById("pbSoundStop").disabled=!1,document.getElementById("pbSoundRenew").disabled=!0,a.mss.play(),a.mss.addEventListener("ended",a.soundFinished)
    },

    stopSoundAlerts:function(){
      var a=DocSound;
      if(isValidAudio()&&Data.options.warningTower.soundUrl.length!=0)
        try{
          a.mss.pause(),a.mss.currentTime=0
        }catch(b){}
      document.getElementById("pbSoundStop").disabled=!0;
      document.getElementById("pbSoundRenew").disabled=!1;
      alarmStopped=!0;
      alarmActive=!1
    },

    renewSoundAlerts:function(){
      document.getElementById("pbSoundRenew").disabled=!0;
      alarmStopped=!1
    }
  },

  AttacksOrSpy = {

    check:function(){
      var a=AttacksOrSpy,b=!1;
      clearTimeout(timerGeneral);
      spiateTotali=attacchiTotali=0;
      if(Data.options.warningTower.deleteReport)
        for(var c,d=Data.msgsTower.length-1;d>=0;)
         c=Date.parse(Data.msgsTower[d].arrive_at)/1E3,parseInt(serverTime())-c>=Data.options.warningTower.delayDelete*Data.options.warningTower.unitDelete&&(Tabs.Tower.removeRow(Data.msgsTower[d]),Data.msgsTower.splice(d,1),b=!0),d--;
      if(Data.options.warningTower.enabled)
        for(d=0;d<Data.msgsTower.length;d++){
          if(Data.msgsTower[d].enabled==void 0)
            Data.msgsTower[d].enabled=!0;
          c=Date.parse(Data.msgsTower[d].arrive_at)/1E3;
          if(Data.msgsTower[d].enabled&&parseInt(serverTime())-c>=Data.options.warningTower.delayWarning*Data.options.warningTower.unitWarning)
            Data.msgsTower[d].enabled=!1,b=!0;
          if(Data.msgsTower[d].enabled&&(Data.msgsTower[d].type==0&&attacchiTotali++,Data.msgsTower[d].type==1&&spiateTotali++,!Data.options.warningTower.nospy&&attacchiTotali>1&&spiateTotali>1))
            break
        }
      totaleTotali=attacchiTotali+(Data.options.warningTower.nospy==!0?0:spiateTotali);
      Data.options.warningTower.sound&&!alarmStopped&&(totaleTotali>0?DocSound.soundTheAlert():DocSound.stopSoundAlerts());
      b&&Tabs.Tower.printTab();
      Tabs.Info.showStuff();
      timerGeneral=setTimeout(a.check,1E3)
    }
  };

function getCookie(a){
  return(a=document.cookie.match("(^|;) ?"+a+"=([^;]*)(;|$)"))?unescape(a[2]):null
}

function setCookie(a,b,c,d,e,f,g,h){
  a=a+"="+escape(b);c&&(a+="; expires="+(new Date(c,d,e)).toGMTString());f&&(a+="; path="+escape(f));g&&(a+="; domain="+escape(g));h&&(a+="; secure");document.cookie=a
}

function delCookie(a,b,c){
if(getCookie(a))document.cookie=a+"="+(b?"; path="+b:"")+(c?"; domain="+c:"")+"; expires=Thu, 01-Jan-70 00:00:01 GMT"
}

function delCoockiesKabam(){
delCookie("__utma","/",".castle.wonderhill.com");delCookie("__utmb","/",".castle.wonderhill.com");delCookie("__utmc","/",".castle.wonderhill.com");delCookie("__utmz","/",".castle.wonderhill.com");delCookie("dragons","/",".castle.wonderhill.com")
}

function resetDOA(){
  exitFromDOA();
  reloadTools();
}

function clearAllTimeout(){
var a=Tabs.Debug;clearTimeout(a.timerShow);clearTimeout(a.timerAlive);clearTimeout(a.timerMouse);a=AutoCollect;clearTimeout(a.timer);a=Tabs.Options;clearTimeout(a.readPagesTimer);clearTimeout(a.readMsgsTimer);a=Tabs.Tower;clearTimeout(a.fetchTimer);clearTimeout(a.alarmTimer);a=Tabs.Jobs;clearTimeout(a.timer);a=Tabs.Build;clearTimeout(a.statTimer);clearTimeout(a.buildTimer);a=Tabs.Train;clearTimeout(a.trainTimer);a=Tabs.Waves;clearTimeout(a.attackTimer);clearTimeout(a.marchTimer);
a=Tabs.AutoAttack;clearTimeout(a.attackTimer);clearTimeout(a.timer);clearTimeout(timerDial);clearTimeout(timerGeneral);clearTimeout(timerCheckVersion);clearTimeout(timerCollectDelay);clearTimeout(timerScan);clearTimeout(timerWide);clearTimeout(dtStartupTimer);clearTimeout(timerChkt11)
}

function destroyDial(a){
clearTimeout(timerDial);a.destroy()
}

function exitFromDOA(){
clearAllTimeout();delCoockiesKabam()
}

if( location.href.match("dragonsofatlantis") || location.href.match("castle.wonderhill.com") ) 
{ 
  var t=setTimeout(dtStartup,5000);
}

})();
