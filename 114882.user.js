// ==UserScript==
// @name            DoA Tools
// @namespace       NEW ScanMap
// @description     ScanMap for Dragons of Atlantis
// @include         *://apps.facebook.com/dragonsofatlantis/*
// @include         *://*.castle.wonderhill.com/platforms/facebook/game
// @exclude         *://apps.facebook.com/dragonsofatlantis/rubies
// @include         *://plus.google.com/games/659749063556
// @include         *://googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @version         1.0
// @icon            http://www.mmogwiki.com/scripts/dragonsofatlantis/powertools/logo.png
// ==/UserScript==
(function() {
var scriptVersion	= '1.0'; // Year, Month, Day, Revision, Maturity (e.g. YYYMMDDa_BETA)


var window = unsafeWindow || window;

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
		document.scrollTop = '42px';
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
		document.scrollTop = '42px';
		initScript();
	}
	
	function setGoogleHigh() {	
		var obs = document.getElementsByTagName('object');
		if (obs.length < 1) {
			setTimeout (setGoogleHigh, 1000);
			return;
		}		
		initScript();
	}
	
	if (window.location.href.indexOf("facebook") != -1)
		setFacebookHigh();
	else 
		setGoogleHigh();
}



function initScript () {
/********************************************************************************
* All global variables MUST be set here or they will not be available to all   *
* functions throughout the script.                                             *
********************************************************************************/
var getVersion		= 18;
var postVersion		= 18;

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

// Tab order
var INFO_TAB_ORDER		= 1;     
var WAVE_TAB_ORDER		= 2;
var ATTACK_TAB_ORDER	= 3;
var JOBS_TAB_ORDER		= 4;
var LOG_TAB_ORDER		= 5;
var OPTIONS_TAB_ORDER	= 6;
var DEBUG_TAB_ORDER		= 99;

// Tab enable/disable
var INFO_TAB_ENABLE		= false;     
var WAVE_TAB_ENABLE		= false;
var ATTACK_TAB_ENABLE	= false;
var JOBS_TAB_ENABLE		= false;
var LOG_TAB_ENABLE		= false;
var OPTIONS_TAB_ENABLE	= false;
var DEBUG_TAB_ENABLE	= false;

// CHECK THESE VARIABLES
var VERSION_CHECK_HOURS	= 4;
var DEBUG_TRACE_AJAX	= 2;
var DEBUG_MARCHES		= false;
var MAP_DELAY			= 1250;
var MIN_DELAY			= 15;
var EMULATE_NET_ERROR	= 0;  // percentage
var ENABLE_WINLOG		= false;
var ALERT_ON_BAD_DATA	= false;


var BUTTON_BGCOLOR		= '#436';
var JOB_BUTTON_BGCOLOR	= '#049C93';

var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

/*
var wordArr = ['aerialcombat', 'alliance', 'ancestralseal', 'aquatroop', 'armor', 'army', 'arsenal', 'blast', 'blitz', 'bog', 'bolt', 'bore', 'chest', 'complete', 'crimsonbull', 'dragonhearts', 'darkwarpdevice', 'divinelight', 'divinerations', 'field', 'firedragon', 'firetroop', 'fog', 'forest', 'fortress', 'giant', 'gold', 'greatdragon', 'hop', 'lake', 'levitation', 'life', 'lumbermill', 'metalsmith', 'might', 'military', 'mining', 'minotaur', 'mountain', 'ore', 'outposts', 'plain', 'purplebones', 'quarry', 'rookery', 'rubies', 'silo', 'skip', 'source', 'speed', 'spy', 'stone', 'technology', 'wall', 'warp', 'wildernesses', 'windtroop', 'wood', 'world'];
*/

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
var kWTroop		= 'WTroop';
var kBatDrg		= 'BatDrg';
var kConscr		= 'Conscr';
var kATroop		= 'ATroop';
var kFireM		= 'FireM';
var kFireDrg	= 'FireDrg';
var kGrtDrg		= 'GrtDrg';
var kHalbrd		= 'Halbrd';
var kFTroop		= 'FTroop';
var kLBM		= 'LBM';
var kMino		= 'Mino';
var kSTroop		= 'STroop';
var kSSDrg		= 'SSDrg';
var kStnDrg		= 'StnDrg';
var kWatDrg		= 'WatDrg';
var kWndDrg		= 'WndDrg';

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

/*******************************************************************************
***************************      TRANSLATIONS      ****************************
*******************************************************************************/
var LANG_CODE = navigator.language.substring(0,2).toLowerCase();
var IS_NOT_NATIVE_LANG = (LANG_CODE != 'en');
switch ( LANG_CODE ){
	/*******************************************************************************
		German ( by Native )
	*******************************************************************************/
case 'de':
	var translateArray = {
	'Action Logs':'Aktion Logs',
	'Actions':'Aktionen',
	'Activate Attacks Logs':'Aktiviere Angriffs-Logbücher',
	'and':'und',
	'at':'bei',
	'Attack One Target in Waves':'Wellenangriff auf ein Ziel',
	'Attack sent to':'Angriffe an',
	'Attacking':'Angriff',
	'Attacks Configuration':'Angriff Konfiguration',
	'Attacks Stats':'Angriffe Stats',
	'Attacks':'Attacken',
	'Attempted':'Versuch',
	'Auto harvest resources from outposts every':'Automatisches einsammeln der Ressourcen von Außenposten jede',
	'Automatically':'Automatisch',
	'Awaiting task completion notification':'Erwarte Abschlussbenachrichtingung der Aufgabe',
	'Building':'Gebäude',
	'Busy':'Beschäftigt',
	'by':'durch',
	'Clear last attack on all maps':'Lösche letzten Angriff auf alle Karten',
	'Clear last attack on current map':'Lösche letzten Angriff auf aktueller Karte',
	'Clear Stats':'Statistik löschen',
	'Config':'Konfiguration',
	'Console Logs':'Konsolen Logbücher',
	'Console':'Konsole',
	'Coordinates':'Koordinaten',
	'Days':'Tage',
	'Delay Between Attacks':'Verzögerung zwischen Angriffen',
	'Delete Battle Reports':'Kampfberichte löschen',
	'Disabled':'Deaktiviert',
	'Distance must be between':'Entfernung muss zwischen',
	'Distance':'Entfernung',
	'Enable verbose logging':'Aktivieren der ausführlichen Logbücher',
	'Enable window drag':'Fensterverschiebung aktivieren',
	'Enable':'Aktivieren',
	'Enabled':'Aktiviert',
	'Error':'Fehler',
	'First value must be between':'Erster Wert muss zwischen',
	'Game Options':'Spiel Optionen',
	'Generals':'Generäle',
	'Hiding':'Verstecken',
	'Hour':'Stunde',
	'Hours':'Stunden',
	'idle':'Untätig',
	'Info':'Info',
	'Invalid Date From':'Ungültiges Datum aus',
	'Invalid Date To':'Ungültiges Datum zu',
	'Invalid delays':'Ungültige Verzögerungen',
	'Invalid number of troops':'Ungültige Anzahl von Truppen',
	'Invalid Range Date':'Ungültiger Bereichs Datum',
	'Last Attack':'Letzter Angriff',
	'Loaded':'Geladen',
	'Logs':'Logbücher',
	'Manual attack sent to':'Manueller Angriff gesendet an',
	'Maximum simultaneous marches':'Maximale gleichzeitige Märsche',
	'miles':'Meilen',
	'Minimum Housing':'Minimale Bürger',
	'Minimum Resource Levels':'Minimale Ressourcen',
	'Minutes':'Minuten',
	'Muster Point Full':'Truppensammelplatz ausgelastet',
	'Need':'Benötige',
	'New Version Available':'Neue Version verfügbar',
	'No Generals Available':'Keine Generäle verfügbar',
	'No targets or troops available':'Keine Ziele oder Truppen verfügbar',
	'No troops available':'Keine Truppen verfügbar',
	'No Troops Defined':'Keine Truppen ausgewählt',
	'Not enough':'Nicht genügend',
	'Not':'Nicht',
	'of':'der',
	'Options':'Optionen',
	'Outpost 1':'Wasser-Außenposten',
	'Outpost 2':'Stein-Außenposten',
	'Outpost 3':'Feuer-Außenposten',
	'Outpost 4':'Wind-Außenposten',
	'Putting build job in persistent data':'Lege Bauaufgaben in persistenten Daten ab',
	'Putting research job in persistent data':'Lege Forschungsaufaben in persistenten Daten ab',
	'Refresh':'Aktualisieren',
	'Remind me later':'Erinnere mich später',
	'Researching':'Forschen',
	'Reset Stats':'Statistik zurücksetzen',
	'Retry in':'Wiederholen in',
	'Run Time':'Laufzeit',
	'Safe Mode':'Sicherer Modus',
	'Scanning Map':'Scanne Karte innerhalb von $NUM$ Meilen <BR> Ungefähre restliche Wartezeit',
	'Script Options':'Skript-Optionen',
	'Search Radius':'Suchradius',
	'Seconds':'Sekunden',
	'Start Date':'Startdatum',
	'Stop if any troops lost':'Stopp bei Truppenverlust',
	'Successfully':'Erfolgreich',
	'Summary':'Übersicht',
	'Targets':'Ziele',
	'Task Completed':'Erledigt',
	'Tasks':'Aufgaben',
	'Too many errors,  disabling auto train':'Zu viele Fehler, deaktivere automatische Ausbildung',
	'Too many troops for muster point level':'Maximale Truppenanzahl laut Truppensammelplatz-Level überschritten',
	'Training Configuration':'Ausbildungs Konfiguration',
	'Training queue':'Trainings-Warteschlange',
	'Troops for Wave Attack':'Truppen für Wellenangriff',
	'Troops lost':'Truppen verloren',
	'Troops Not Defined':'Truppen nicht definiert',
	'Turned Off':'Ausgeschaltet',
	'Use the Levels Tab to select attack areas':'Benutze die Level-Tabelle um Angriffsbereiche auszuwählen',
	'Userset maximum marches reached':'Eingestellte maximale Märsche erreicht',
	'waiting':'warten',
	'Warnings':'Warnung',
	'Wave attack to':'Wellenangriff zu',
	'Wave':'Welle',
	'Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Español (by La Larva)
	*******************************************************************************/
case 'es':
	var translateArray = {
	'Action Log':'Reporte de Acciones',
	'Actions':'Acciones',
	'Activate Attacks Logs':'Activar Registro de Ataques',
	'and':'y',
	'at':'en',
	'ATrans':'TransB', /* abbr Armored Transport */
	'ATroop':'Tritón', /* abbr Aqua Troop */
	'Attack One Target in Waves':'Ataques en Oleadas a Objetivos',
	'Attack sent to':'Ataque enviado a',
	'Attacking':'Atacando',
	'Attacks Configuration':'Configuración de Ataques',
	'Attacks Stats':'Estadísticas de Ataques',
	'Attacks':'Ataques',
	'Attempted':'Intentado',
	'Auto harvest resources from outposts every':'Auto-Recolectar recursos de Avanzadas cada',
	'Automatically':'Automáticamente',
	'Awaiting task completion notification':'En espera de la notificación de finalización de la tarea',
	'BatDrg':'DrgComb', /* abbr Battle Dragon */
	'Building':'Edificando',
	'Busy':'Ocupado',
	'by':'por',
	'Clear last attack on all maps':'Borrar todos los registros de últimos ataques',
	'Clear last attack on current map':'Borrar registro de últimos ataques actuales',
	'Clear Stats':'Borrar Estadísticas',
	'Config':'Configuración',
	'Conscr':'Reclu', /* abbr Conscript */
	'Console Log':'Registros de Consola',
	'Console':'Consola',
	'Coords':'Coords',
	'd':'d',
	'Days':'Día(s)',
	'Delay Between Attacks':'Tiempo de retraso entre ataques',
	'Delete Battle Reports':'Eliminar los mensajes de batallas',
	'Disabled':'Desactivado',
	'Distance must be between':'La distancia debe estar entre',
	'Distance':'Distancia',
	'Enable verbose logging':'Habilitar el registro detallado',
	'Enable window drag':'Permiten arrastrar la ventana',
	'Enable':'Activar',
	'Enabled':'Activado',
	'Error':'Error',
	'FireDrg':'DrgFue', /* abbr Fire Dragon */
	'FireM':'Espejo', /* abbr Fire Mirror */
	'First value must be between':'El primer valor debe ser de',
	'FTroop':'Magma', /* abbr Fire Troop - Magmasaurus */
	'Game Options':'Opciones del Juego',
	'Generals':'Generales',
	'GrtDrg':'GrnDrg', /* abbr Great Dragon */
	'h':'h',
	'Halbrd':'Alabar', /* abbr Halberdsman */
	'Hiding':'Esconder Tropas',
	'Hour':'Hora',
	'Hours':'Hora(s)',
	'idle':'Sin Tareas',
	'Info':'Info',
	'Invalid Date From':'Formato de Fecha de Inicio Invalido',
	'Invalid Date To':'Formato de Fecha de Finalizacion Invalido',
	'Invalid delays':'Intervalo de Retraso Invalido',
	'Invalid number of troops':'Numero invalido de tropas',
	'Invalid Range Date':'Rango de Fecha Invalido',
	'Last Attack':'Último Ataque',
	'LBM':'Arq', /* abbr Longbowman */
	'Loaded':'Cargado',
	'Logs':'Registros',
	'm':'m',
	'Manual attack sent to':'Ataque Manual enviado a',
	'Maximum simultaneous marches':'Máximo de Marchas Simultáneas',
	'miles':'millas',
	'Minimum Housing':'por Mínimo de Casas',
	'Minimum Resource Levels':'por Mínimo de Niveles de Recursos',
	'Mino':'Mino', /* abbr Minotaur */
	'Minutes':'Minuto(s)',
	'Muster Point Full':'Punto de Encuentro Lleno',
	'Need':'Req',
	'New Version Available':'Nueva Versión Disponible',
	'No Generals Available':'No hay generales disponibles',
	'No targets or troops available':'Sin objetivos o tropas disponibles',
	'No troops available':'No hay suficientes tropas',
	'No Troops Defined':'No Hay Tropas Definidas',
	'Not enough':'No hay suficiente',
	'Not':'No',
	'of':'de',
	'Options':'Opciones',
	'Outpost 1':'Ciudad del Agua',
	'Outpost 2':'Ciudad de la Piedra',
	'Outpost 3':'Ciudad del Fuego',
	'Outpost 4':'Ciudad del Viento',
	'Putting build job in persistent data':'Guardando tareas de edificación en datos persistentes',
	'Putting research job in persistent data':'Guardando tareas de investigación en datos persistentes',
	'Refresh':'Actualizar',
	'Remind me later':'Recordarmelo luego',
	'Researching':'Investigando',
	'Reset Stats':'Borrar Estadisticas',
	'Retry in':'Reintentando en',
	'Run Time':'Tiempo de Ejecucción',
	's':'s',
	'Safe Mode':'Modo Seguro',
	'Scanning Map':'Buscando datos en $NUM$ millas a la redonda<BR>Este proceso puede demorar un tiempo',
	'Script Options':'Opciones del Script',
	'Search Radius':'Radio de Busqueda',
	'Seconds':'Segundo(s)',
	'SSDrg':'DrgARap', /* abbr Swift Strike Dragon */
	'Start Date':'Fecha de Inicio',
	'StnDrg':'DrgPét', /* abbr Stone Dragon */
	'Stop if any troops lost':'Detener ataques si se pierden tropas',
	'STroop':'Ogro', /* abbr Stone Troop - Ogre */
	'Successfully':'Exitosamente',
	'Summary':'Detalles',
	'Targets':'Objetivos',
	'Task Completed':'Tarea Finalizada',
	'Tasks':'Tareas',
	'Too many errors, disabling auto training':'Demasiados errores, Desactivado Adiestramientos',
	'Too many troops for muster point level':'Demasiadas tropas para el Nivel actual del Punto de Encuentro',
	'Training Configuration':'Configuración de Adiestramientos',
	'Training queue':'Encolando Adistramientos',
	'Troops for Wave Attack':'Tropas para Ataques Masivos',
	'Troops lost':'¡Se han perdido tropas',
	'Troops Not Defined':'No Hay Tropas Definidas',
	'Use the Levels Tab to select attack areas':'Usar la solapa de Niveles para seleccionar el rango de ataque',
	'Userset maximum marches reached':'Llegaste al limite defindo por ti de marchas',    
	'waiting':'esperando',
	'Warnings':'Advertencias',
	'WatDrg':'DrgAgua', /* abbr Water Dragon */
	'Wave attack to':'Ataque en Oleada a',
	'Wave':'Oleadas',
	'WndDrg':'DrgVie', /* abbr Wind Dragon */
	'WTroop':'Bansh', /* abbr Wind Troop - Banshee */
	'Zzz':'Zzz'
	};
	break;
	/**********************************************************************
	     Français  (by randalph)
	***********************************************************************/
case 'fr':
	var translateArray = {
	'Action Logs':'Journal d\'évenements',
	'Actions':'Actions',
	'Activate Attacks Logs':'Détails des attaques',
	'and':'et',
	'at':'à',
	'Attack One Target in Waves':'Attaquer une cible par vagues',
	'Attack sent to':'Actions en  cours',
	'Attacking':'Activer',
	'Attacks Configuration':'Configuration',
	'Attacks Stats':'Statistiques',
	'Attacks':'Attaque',
	'Attempted':'Tentative',
	'Auto harvest resources from outposts every':'Recolter les silos toutes les',
	'Automatically':'Automatique',
	'Awaiting task completion notification':'En attente de la notification de fin des tâches',
	'Building':'Bâtiment',
	'Busy':'Occupé',
	'by':'par',
	'Clear last attack on all maps':'Réinitialiser toutes les cartes',
	'Clear last attack on current map':'Réinitialiser les attaques sur la carte',
	'Clear Stats':'Réinitialiser',
	'Config':'Config',
	'Console Logs':'Console Logs',
	'Console':'Console',
	'Coordinates':'Coordonnées',
	'Days':'Jours',
	'Delay Between Attacks':'Délai entre les attaques',
	'Delete Battle Reports':'Supprimer les rapports de combat',
	'Disabled':'Désactivé',
	'Distance must be between':'La distance doit être comprise entre',
	'Distance':'Distance',
	'Enable verbose logging':'Activer le journal d\'évenements',
	'Enable window drag':'Activer glisser/déposer',
	'Enable':'Activer',
	'Enabled':'Activé',
	'Error':'Erreur',
	'First value must be between':'La valeur du délai doit être comprise entre',
	'Game Options':'Options de jeu',
	'Generals':'Généraux',
	'Hiding':'Cacher',
	'Hour':'Heure',
	'Hours':'Heures',
	'idle':'Inactif',
	'Info':'Info',
	'Invalid Date From':'Date non valide de',
	'Invalid Date To':'Date non valide pour',
	'Invalid delays':'Délai invalide',
	'Invalid number of troops':'Nombre d\'unités invalide',
	'Invalid Range Date':'Format de la date incorrect',
	'Last Attack':'Dernière attaque',
	'Loaded':'Script chargé',
	'Logs':'Journal',
	'Manual attack sent to':'Attaque manuelle envoyé',
	'Maximum simultaneous marches':'Maximum de marches simultanées',
	'miles':'miles',
	'Minimum Housing':'Logement Minimum',
	'Minimum Resource Levels':'Niveaux de Ressources Minimales',
	'Minutes':'Procès-verbal',
	'Muster Point Full':'Maximum des marches autorisées atteintes',
	'Need':'Requiert',
	'New Version Available':'Nouvelle version disponible',
	'No Generals Available':'Pas de généraux libre',
	'No targets or troops available':'Aucune cibles ou troupes disponibles',
	'No troops available':'Pas de troupes disponibles',
	'No Troops Defined':'Pas de troupes définies',
	'Not enough':'Pas assez',
	'Not':'Non',
	'of':'sur',
	'Options':'Options',
	'Outpost 1':'Dragon aquatique',
	'Outpost 2':'Dragon de pierre',
	'Outpost 3':'Dragon de feu',
	'Outpost 4':'Dragon éolien',
	'Putting build job in persistent data':'Mettre emploi dans la construction des données persistantes',
	'Putting research job in persistent data':'Sauvegarder la recherche',
	'Refresh':'Actualiser',
	'Remind me later':'Pas maintenant',
	'Researching':'Recherche',
	'Reset Stats':'Réinitialiser Stats',
	'Retry in':'nouvel essai dans',
	'Run Time':'Temps d\'exécution',
	'Safe Mode':'Mode Sans échec',
	'Scanning Map':'Balayage de la carte sur $NUM$ miles<BR>Attendez la fin de la recherche',
	'Script Options':'Options de script',
	'Search Radius':'Rayon de balayage',
	'Seconds':'Secondes',
	'Start Date':'Date de début',
	'Stop if any troops lost':'Désactiver en cas de pertes',
	'Successfully':'Réussir',
	'Summary':'Général',
	'Targets':'Cibles',
	'Task Completed':'Tache éffectué',
	'Tasks':'Tâches',
	'Too many errors,  disabling auto train':'Trop d\'erreurs, entrainement automatique désactivé',
	'Too many troops for muster point level':'Déploiement maximal atteint',
	'Training Configuration':'Configuration',
	'Training queue':'File de formation en attente',
	'Troops for Wave Attack':'Sélectionnez vos troupes',
	'Troops lost':'Troupes perdues',
	'Troops Not Defined':'Aucunes troupes disponible',
	'Turned Off':'Désactivé',
	'Use the Levels Tab to select attack areas':'Utilisez l\'onglet "Niveaux" et sélectionnez la cible',
	'Userset maximum marches reached':'Maximum de marches simultanés atteinte',
	'waiting':'en attente',
	'Warnings':'Avertissements',
	'Wave attack to':'Attaque en vagues vers',
	'Wave':'Vague',
	'ATrans':'Ballons',		/* abbr Armored Transport */
	'ATroop':'Fang',		/* abbr Aqua Troop */
	'BatDrg':'DrgGr',		/* abbr Battle Dragon */
	'Conscr':'Conscrit',	/* abbr Conscript */
	'FireDrg':'DrgFeu',		/* abbr Fire Dragon */
	'FireM':'Miroir',		/* abbr Fire Mirror */
	'FTroop':'Magama',		/* abbr Fire Troop - Magmasaurus */
	'GrtDrg':'GrdDrg',		/* abbr Great Dragon */
	'Halbrd':'Halbrd',		/* abbr Halberdsman */
	'LBM':'Archer',			/* abbr Longbowman */
	'Mino':'Mino',			/* abbr Minotaur */
	'SSDrg':'RapDrg',		/* abbr Swift Strike Dragon */
	'StnDrg':'DrgPierre',	/* abbr Stone Dragon */
	'STroop':'Ogre',		/* abbr Stone Troop - Ogre */
	'WatDrg':'DrgAqua',		/* abbr Water Dragon */
	'WndDrg':'DrgVent',		/* abbr Wind Dragon */
	'WTroop':'Banshee',		/* abbr Wind Troop - Banshee */
	'Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Italiano 
	*******************************************************************************/
case 'it':
	var translateArray = {
	'Action Logs': 'Logs azione',
	'Actions': 'Azioni',
	'Activate Attacks Logs': 'Attiva gli attacchi log',
	'and': 'e',
	'at': 'a',
	'Attack One Target in Waves': 'Attacco un obiettivo in Waves',
	'Attack sent to': 'Attacco inviato a',
	'Attacking': 'Attaccare',
	'Attacks Configuration': 'Attacchi di configurazione',
	'Attacks Stats': 'Attacchi Statistiche',
	'Attacks': 'Attacchi',
	'Attempted': 'Tentativo',
	'Auto harvest resources from outposts every': 'Auto risorse messe da ogni avamposti',
	'Automatically': 'Automatico',
	'Awaiting task completion notification': 'In attesa di notifica completamento delle attività',
	'Building': 'Costruzione',
	'Busy': 'Occupato',
	'by': 'da',
	'Clear last attack on all maps': 'Cancella ultimo attacco su tutte le mappe',
	'Clear last attack on current map': 'Cancella ultimo attacco sulla mappa corrente',
	'Clear Stats': 'Cancella Statistiche',
	'Config': 'Configurazione',
	'Console Logs': 'Console Registri',
	'Console': 'Console',
	'Coordinates': 'Coordinate',
	'Days': 'Giorni',
	'Delay Between Attacks': 'Intervallo tra gli attacchi',
	'Delete Battle Reports': 'Cancella Battle Report',
	'Disabled': 'Disabili',
	'Distance must be between': 'La distanza deve essere tra',
	'Distance': 'Distanza',
	'Enable verbose logging': 'Abilita registrazione dettagliata',
	'Enable window drag': 'Abilita trascinamento finestra',
	'Enable': 'Abilita',
	'Enabled': 'Abilitato',
	'Error': 'Errore',
	'First value must be between': 'Il primo valore deve essere compreso tra',
	'Game Options': 'Opzioni di gioco',
	'Generals': 'Generali',
	'Hiding': 'Nascondere',
	'Hour': 'Ora',
	'Hours': 'Ore',
	'idle': 'riposo',
	'Info': 'Info',
	'Invalid Date From': 'Data non da',
	'Invalid Date To': 'Data non To',
	'Invalid delays': 'Ritardi non valido',
	'Invalid number of troops': 'Non valido il numero di truppe',
	'Invalid Range Date': 'Non valido Data Range',
	'Last Attack': 'Ultimo attacco',
	'Loaded': 'Caricato',
	'Logs': 'Registri',
	'Manual attack sent to': 'Attacco manuale inviata',
	'Maximum simultaneous marches': 'Marce Massimo simultanea',
	'miles':'miglia',
	'Minimum Housing': 'Housing minimo',
	'Minimum Resource Levels': 'Livelli minimi di risorse',
	'Minutes': 'Minutes',
	'Muster Point Full': 'Muster completa Point',
	'Need': 'Bisogno',
	'New Version Available': 'Nuova Versione',
	'No Generals Available': 'No generali disponibili',
	'No targets or troops available': 'Nessun obiettivo o truppe disponibili',
	'No troops available': 'No truppe disponibili',
	'No Troops Defined': 'No Truppe Definito',
	'Not enough': 'Non abbastanza',
	'Not': 'Non',
	'of': 'di',
	'Options': 'Opzioni',
	'Outpost 1': 'Città d\'Acqua',
	'Outpost 2': 'Città di Pietra',
	'Outpost 3': 'Città di Fuoco',
	'Outpost 4': 'Città del vento',
	'Putting build job in persistent data': 'Mettere costruire lavoro in dati persistenti',
	'Putting research job in persistent data': 'Lavoro di ricerca Mettere a dati persistenti',
	'Refresh': 'Aggiorna',
	'Remind me later': 'Visualizza in seguito',
	'Researching': 'La ricerca',
	'Reset Stats': 'Ripristina Statistiche',
	'Retry in':'Riprova a',
	'Run Time': 'Run Time',
	'Safe Mode': 'Modalità provvisoria',
	'Scanning Map': 'La scansione mappa entro $NUM$ miglia <BR> Questo dovrebbe richiedere circa a tempo',
	'Script Options': 'Opzioni Script',
	'Search Radius':'Raggio di ricerca',
	'Seconds': 'Secondi',
	'Start Date': 'Data Start',
	'Stop if any troops lost': 'Stop eventuali truppe perse',
	'Successfully': 'Successo',
	'Summary': 'Sintesi',
	'Targets': 'Obiettivi',
	'Task Completed': 'Attività Completato',
	'Tasks': 'Attività',
	'Too many errors,  disabling auto train': 'Troppi errori, treno auto invalidante',
	'Too many troops for muster point level': 'Le truppe Troppi per il livello di radunare punto',
	'Training Configuration': 'Configurazione di Formazione',
	'Training queue': 'Coda di Formazione',
	'Troops for Wave Attack': 'Le truppe di attacco Onda',
	'Troops lost': 'Truppe perso',
	'Troops Not Defined': 'Truppe Non definito',
	'Turned Off': 'Spenta',
	'Use the Levels Tab to select attack areas': 'Usa la scheda Livelli per selezionare le aree attacco',
	'Userset maximum marches reached': 'Massima raggiunta Userset marce',
	'waiting': 'in attesa',
	'Warnings': 'Avvertenze',
	'Wave attack to': 'Attacco Wave',
	'Wave': 'Wave',
	'Zzz': 'Zzz'
	};
	break;
	/*******************************************************************************
		Hollandaises (Dutch)
	*******************************************************************************/
case 'nl':
	var translateArray = {
	'Action Logs': 'Actie Logs',
	'Actions': 'Acties',
	'Activate Attacks Logs': 'Activeer Aanvallen Logs',
	'and': 'en',
	'at': 'bij',
	'Attack One Target in Waves': 'Een Aanval Doel in Golven',
	'Attack sent to': 'Aanval verzonden naar',
	'Attacking': 'Aanvallen',
	'Attacks Configuration': 'Aanvallen Configuratie',
	'Attacks Stats': 'Aanvallen Stats',
	'Attacks': 'Aanvallen',
	'Attempted': 'Poging tot',
	'Auto harvest resources from outposts every': 'Auto oogst middelen van buitenposten elke',
	'Automatically': 'Automatisch',
	'Awaiting task completion notification': 'In afwachting van voltooiing van de taak melding',
	'Building': 'Bebouw',
	'Busy': 'Bezig',
	'by': 'door',
	'Clear last attack on all maps': 'Duidelijke laatste aanval op alle kaarten',
	'Clear last attack on current map': 'Duidelijke laatste aanval op de huidige kaart',
	'Clear Stats': 'Heldere Stats',
	'Config': 'Configuratie',
	'Console Logs': 'Troosten Logs',
	'Console': 'Troosten',
	'Coordinates': 'Coördinaten',
	'Days': 'Dagen',
	'Delay Between Attacks': 'Vertraging tussen de aanvallen',
	'Delete Battle Reports': 'Verwijder Battle Reports',
	'Disabled': 'Deactiveren',
	'Distance must be between': 'Afstand moet worden tussen',
	'Distance': 'Afstand',
	'Enable verbose logging': 'Enable uitgebreide logging',
	'Enable window drag': 'Enable venster slepen',
	'Enable': 'Inschakelen',
	'Enabled': 'Ingeschakeld',
	'Error': 'Error',
	'First value must be between': 'Eerste waarde moet tussen',
	'Game Options': 'Spelopties',
	'Generals': 'Generaals',
	'Hiding': 'Hiding',
	'Hour': 'Uur',
	'Hours': 'Uur',
	'idle': 'idle',
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
	'Muster Point Full': 'Verzamelen Punt Volledige',
	'Need': 'Nood',
	'New Version Available': 'Nieuwe versie beschikbaar',
	'No Generals Available': 'Geen generaals beschikbaar',
	'No targets or troops available': 'Geen targets of troepen beschikbaar zijn',
	'No troops available': 'Geen troepen beschikbaar',
	'No Troops Defined': 'Geen troepen Defined',
	'Not enough': 'Niet genoeg',
	'Not': 'Niet',
	'of': 'van',
	'Options': 'Opties',
	'Outpost 1': 'Stad van Water',
	'Outpost 2': 'City of Stone',
	'Outpost 3': 'City of Fire',
	'Outpost 4': 'Stad van de Wind',
	'Putting build job in persistent data': 'Putting te bouwen baan in permanente gegevens',
	'Putting research job in persistent data': 'Putting onderzoek job in permanente gegevens',
	'Refresh': 'Verversen',
	'Remind me later': 'Herinner mij later',
	'Researching': 'Onderzoek',
	'Reset Stats': 'Reset Stats',
	'Retry in':'Opnieuw in',
	'Run Time': 'Uitvoeringstijd',
	'Safe Mode': 'Veilige Modus',
	'Scanning Map': 'Scannen kaart binnen $NUM$ mijl <BR> Dit duurt ongeveer een tijd',
	'Script Options': 'Script opties',
	'Search Radius':'Zoek in een straal',
	'Seconds': 'Seconden',
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
	'waiting': 'wachten',
	'Warnings': 'Waarschuwingen',
	'Wave attack to': 'Golf te vallen',
	'Wave': 'Golf',
	'Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Polish
	*******************************************************************************/
case 'pl':
	var translateArray = {
	'Action Logs':'Dzienniki działaniu',
	'Actions':'Akcje',
	'Activate Attacks Logs':'Włącz Logi Ataki',
	'and':'i',
	'at':'w',
	'Attack One Target in Waves':'Jeden cel ataku w Fala',
	'Attack sent to':'Wysłane do Atak',
	'Attacking':'Atak',
	'Attacks Configuration':'Ataki Konfiguracja',
	'Attacks Stats':'Ataki Statystyki',
	'Attacks':'Ataki',
	'Attempted':'Próba',
	'Auto harvest resources from outposts every':'Asoby zbiorów Auto z domu i placówek',
	'Automatically':'Automatycznie',
	'Awaiting task completion notification':'Oczekiwanie na zakończenie zadania zgłoszeniu',
	'Building':'Budowanie',
	'Busy':'Zajęty',
	'by':'prze',
	'Clear last attack on all maps':'Usuń ostatnie atak na wszystkich mapach',
	'Clear last attack on current map':'Usuń ostatnie atak na aktualną mapę',
	'Clear Stats':'Wyczyść Statystyki',
	'Config':'Konfiguracja',
	'Console Logs':'Dzienniki Konsola',
	'Console':'Konsola',
	'Coordinates':'Współrzędne',
	'Days':'Dni',
	'Delay Between Attacks':'Przerwa pomiędzy atakami',
	'Delete Battle Reports':'Usuń raporty z walki',
	'Disabled':'Dezaktywować',
	'Distance must be between':'Odległość powinna wynosić od',
	'Distance':'Odległość',
	'Enable verbose logging':'Włącz verbose logging',
	'Enable window drag':'Włącz okna przeciągnij',
	'Enable':'Włąc',
	'Enabled':'Włączone',
	'Error':'Błąd',
	'First value must be between':'Wartość musi być pierwsze entre',
	'Game Options':'Opcje gry',
	'Generals':'Generałów',
	'Hiding':'Ukrywanie',
	'Hour':'Godziny',
	'Hours':'Godziny',
	'idle':'bezczynności',
	'Info':'Informacje',
	'Invalid Date From':'Nieprawidłowe dane od',
	'Invalid Date To':'Nieprawidłowe dane do',
	'Invalid delays':'Nieważny opóźnienia',
	'Invalid number of troops':'Błędna liczba żołnierzy',
	'Invalid Range Date':'Nieprawidłowy zakres dat',
	'Last Attack':'Ostatni atak',
	'Loaded':'Załadowany',
	'Logs':'Dzienniki',
	'Manual attack sent to':'Podręcznik wysłane do ataku',
	'Maximum simultaneous marches':'Maksymalna jednoczesne marsze',
	'miles':'mil',
	'Minimum Housing':'Minimalna Obudowa',
	'Minimum Resource Levels':'Minimalnego poziomu zasobów',
	'Minutes':'Minut',
	'Muster Point Full':'Muster Punkt Full',
	'Need':'Bieda',
	'New Version Available':'Nnowa wersja',
	'No Generals Available':'Niedostępny generalnych',
	'No targets or troops available':'Nie celów lub dostępnych oddziałów',
	'No troops available':'Wojsko nie jest dostępna',
	'No Troops Defined':'Nie zdefiniowane Troops',
	'Not enough':'A Mało',
	'Not':'Nie',
	'of':'z',
	'Options':'Opcje',
	'Putting build job in persistent data':'Wykorzystanie budować pracy w danych trwałych',
	'Putting research job in persistent data':'Wykorzystanie pracy badawczej w danych trwałych',
	'Refresh':'Odśwież',
	'Remind me later':'Przypomnij mi później',
	'Researching':'Badania',
	'Reset Stats':'Resetuj Statystyki',
	'Retry in':'Ponowna próba',
	'Run Time':'Czas pracy',
	'Safe Mode':'Tryb awaryjny',
	'Scanning Map':'W $NUM$ mil Skanowanie map <BR> powinna to około czas',
	'Script Options':'Opcje Script',
	'Search Radius':'OdlegĹ',
	'Seconds':'Sekund',
	'Start Date':'Początek',
	'Stop if any troops lost':'Stop, jeżeli jakiekolwiek wojska stracone',
	'Successfully':'Powodzeniem',
	'Summary':'Podsumowanie',
	'Targets':'Cele',
	'Task Completed':'Adanie Wykonane',
	'Tasks':'Zadania',
	'Too many errors,  disabling auto train':'Byt wiele błędów, wyłączenie pociągu auto',
	'Too many troops for muster point level':'Byt wielu żołnierzy zebrać punkt za poziom',
	'Training Configuration':'Konfiguracja Szkolenia',
	'Training queue':'Szkolenia kolejki',
	'Troops for Wave Attack':'Fala Atak wojsk',
	'Troops lost':'Wojsko Stracone',
	'Troops Not Defined':'Wojsko Nie zdefiniowane',
	'Turned Off':'Wyłączony',
	'Use the Levels Tab to select attack areas':'Użyciu karty Poziom wybrać obszary atak',
	'Userset maximum marches reached':'Maksymalnie marsze Zasięg UserSet',
	'waiting':'czeka',
	'Warnings':'Ostrzeżenia',
	'Wave attack to':'Atak Fala',
	'Wave':'Fala',
	'Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Russian
	*******************************************************************************/
case 'ru':
case 'tt':
	var translateArray = {
	'Action Logs':'Действие Журналы',
	'Actions':'Действия',
	'Activate Attacks Logs':'Активировать Атаки Журналы',
	'and':'и',
	'at':'в',
	'Attack One Target in Waves':'Атака одна цель в волнах',
	'Attack sent to':'Атака направлены',
	'Attacking':'Атака',
	'Attacks Configuration':'Атаки Конфигурация',
	'Attacks Stats':'Атаки Статистика',
	'Attacks':'Атака',
	'Attempted':'Попытки',
	'Auto harvest resources from outposts every':'Авто урожая ресурсов из форпостов каждый',
	'Automatically':'Автоматически',
	'Awaiting task completion notification':'Ожидающие уведомления завершения задачи',
	'Building':'Строительство',
	'Busy':'Занят',
	'by':'на',
	'Clear last attack on all maps':'Очистить последнюю атаку на всех картах',
	'Clear last attack on current map':'Очистить последнюю атаку на текущую карту',
	'Clear Stats':'Очистить статистику',
	'Config':'Config',
	'Console Logs':'Консоль Журналы',
	'Console':'Консоль',
	'Coordinates':'Координаты',
	'Days':'Дней',
	'Delay Between Attacks':'Задержка между атаками',
	'Delete Battle Reports':'Удалить Битва отчетов',
	'Disabled':'инвалидов',
	'Distance must be between':'расстояние должно быть между',
	'Distance':'Расстояние',
	'Enable verbose logging':'Включить ведение подробного журнала',
	'Enable window drag':'Включить окно перетащить',
	'Enable':'Включить',
	'Enabled':'Enabled',
	'Error':'Ошибка',
	'First value must be between':'Первое значение должно быть между',
	'Game Options':'Game Options',
	'Generals':'Генералы',
	'Hiding':'Сокрытие',
	'Hour':'Час',
	'Hours':'Часы',
	'idle':'простоя',
	'Info':'Информация',
	'Invalid Date From':'Неверный Дата С',
	'Invalid Date To':'Неверный Дата To',
	'Invalid delays':'Неверный задержки',
	'Invalid number of troops':'Неверное число войск',
	'Invalid Range Date':'Неверный диапазон дат',
	'Last Attack':'Последнее Атака',
	'Loaded':'Loaded',
	'Logs':'Журналы',
	'Manual attack sent to':'Руководство атаки направлены',
	'Maximum simultaneous marches':'Максимально одновременных маршей',
	'miles':'миль',
	'Minimum Housing':'Минимальное жилье',
	'Minimum Resource Levels':'минимальный уровень ресурсов',
	'Minutes':'Minutes',
	'Muster Point Full':'Muster центр Полное',
	'Need':'Вам нужно',
	'New Version Available':'новая версия',
	'No Generals Available':'Нет генералов Доступный',
	'No targets or troops available':'Нет цели или войск, доступных',
	'No troops available':'Нет доступных войск',
	'No Troops Defined':'Нет войск Определено',
	'Not enough':'Не хватает',
	'Not':'Не',
	'of':'в',
	'Options':'опции',
	'Putting build job in persistent data':'Размещение строить работу в постоянных данных',
	'Putting research job in persistent data':'Помещение научно-исследовательской работой в постоянных данных',
	'Refresh':'Обновить',
	'Remind me later':'Напомнить позже',
	'Researching':'Исследование',
	'Reset Stats':'Сброс Статистика',
	'Retry in':'Повтор в',
	'Run Time':'Run Time',
	'Safe Mode':'Безопасный режим',
	'Scanning Map':'Сканирование карты в течение $NUM$ миль <BR> Это должно занять около время',
	'Script Options':'Сценарий опции',
	'Search Radius':'Поиск Радиус',
	'Seconds':'секунды',
	'Start Date':'Дата начала',
	'Stop if any troops lost':'Остановитесь, если какой-либо войска потеряли',
	'Successfully':'Успешно',
	'Summary':'Сводка',
	'Targets':'Цели',
	'Task Completed':'Задача выполнена',
	'Tasks':'Задачи',
	'Too many errors,  disabling auto train':'Слишком много ошибок, отключение автоматического поезд',
	'Too many troops for muster point level':'Слишком много войск для набраться уровня точки',
	'Training Configuration':'Обучение Конфигурация',
	'Training queue':'Обучение очередь',
	'Troops for Wave Attack':'Войска для волны атаки',
	'Troops lost':'Войска потеряли',
	'Troops Not Defined':'Войска Не определен',
	'Turned Off':'выключен',
	'Use the Levels Tab to select attack areas':'Использование уровней Tab, чтобы выбрать уязвимую зону',
	'Userset maximum marches reached':'Userset максимальной марши достигли',
	'waiting':'ожидание',
	'Warnings':'Предупреждения',
	'Wave attack to':'Волна атака',
	'Wave':'Волна',
	'Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Turkish
	*******************************************************************************/
case 'tr':
case 'tk':
	var translateArray = {
	'Action Logs':'Eylem Kayıtlar',
	'Actions':'Eylemler',
	'Activate Attacks Logs':'Saldırılar Kayıtlar Etkinleştir',
	'and':'ve',
	'at':'az',
	'Attack One Target in Waves':'Dalgaları Bir Hedef Saldırı',
	'Attack sent to':'Saldırı gönderildi',
	'Attacking':'Saldırmak',
	'Attacks Configuration':'Yapılandırma Saldırıları',
	'Attacks Stats':'İstatistikler Saldırıları',
	'Attacks':'Saldırılar',
	'Attempted':'Girişimi',
	'Auto harvest resources from outposts every':'Karakollarını Otomatik hasat kaynakları her',
	'Automatically':'Otomatik',
	'Awaiting task completion notification':'Bekliyor görev tamamlama bildirimi',
	'Building':'Bina',
	'Busy':'Meşgul',
	'by':'ile',
	'Clear last attack on all maps':'Tüm haritalarda açık son saldırı',
	'Clear last attack on current map':'Mevcut harita üzerinde net son saldırı',
	'Clear Stats':'Temizle İstatistikler',
	'Config':'Yapılandırma',
	'Console Logs':'Konsol Kayıtlar',
	'Console':'Konsol',
	'Coordinates':'Koordinatlar',
	'Days':'Günleri',
	'Delay Between Attacks':'Saldırılar Arasındaki Gecikme',
	'Delete Battle Reports':'Savaşı Raporları Sil',
	'Disabled':'Engelli',
	'Distance must be between':'Mesafe arasında olmalıdır',
	'Distance':'Mesafe',
	'Enable verbose logging':'Ayrıntılı günlüğü etkinleştir',
	'Enable window drag':'Pencere sürükleme etkinleştirin',
	'Enable':'Etkinleştir',
	'Enabled':'Etkin',
	'Error':'Hata',
	'First value must be between':'İlk değeri arasında olmalıdır',
	'Game Options':'Oyun Seçenekleri',
	'Generals':'Generaller',
	'Hiding':'Gizleme',
	'Hour':'Saat',
	'Hours':'Saat',
	'idle':'boşta',
	'Info':'Bilgi',
	'Invalid Date From':'Geçersiz Tarih',
	'Invalid Date To':'Geçersiz Tarih',
	'Invalid delays':'Geçersiz gecikmeler',
	'Invalid number of troops':'Geçersiz ask