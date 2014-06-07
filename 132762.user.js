// ==UserScript==
// @name          DoA Power Tools Teamwork
// @namespace     http://userscripts.org/scripts/show/124689
// @description   Power Tools for Dragons of Atlantis
// @include       *://apps.facebook.com/dragonsofatlantis/*
// @include       *://*.castle.wonderhill.com/platforms/*/game
// @match         *://apps.facebook.com/dragonsofatlantis/*
// @match         *://*.castle.wonderhill.com/platforms/*/game
// @match         *://www.kabam.com/dragons-of-atlantis/play 
// @include       *://plus.google.com/games/659749063556*
// @include       *://plus.google.com/*/games/659749063556*
// @include       *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @match         *://plus.google.com/games/659749063556*
// @match         *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @include       *://www.kabam.com/dragons-of-atlantis/play
// @exclude       *://apps.facebook.com/dragonsofatlantis/rubies
// @exclude       *://apps.facebook.com/ai.php*
// @exclude       *://www.facebook.com/plugins/like.php*
// @exclude       *://kabam1-a.akamaihd.net/pixelkabam/*
// @exclude       *://*.akamaihd.net/pixelkabam/*
// @exclude       *://plus.google.com/_/apps-static/*
// @exclude       *://plus.google.com/u/0/_/gadgets/contactPicker*
// @exclude       *://accounts.google.com/*
// @exclude       *://talkgadget.google.com/*
// @exclude       *://www.googleapis.com/static*
// @version       2012.05.03b
// @icon          http://www.wackoscripts.com/icon.png
// @changelog     <ul><li><b>Changed</b> API for script to work</li><li><b>Changed</b> some icons for attacks.. ect</li></ul>
// ==/UserScript==

/********************************************************************************
 * INFORMATION                                                                  *
 *                                                                              *
 * Name: DoA Power Tools Teamwork                                               *
 * Version: 2012.05.03b                                        	    *
 * Last Modified: 3 May 2012 8:00  GMT+3                            	    *
 * Original Authors: G.Jetson, Runey & Wham                                     *
 * Current  Authors: La Larva, Les, Runey, Lord Mimir, Wham, Didi & Jawz        *
 * Collaborators:                                                               *
 *               AqUaRiUs KaMuS (Site in Spanish)                               *
 *               Tweakit    (Dutch   translator)                                *
 *               Randalph   (French  translator)                                *
 *               Native     (German  translator)                                *
 *               Boaro      (Italian translator)                                *
  *                                                                             *
 * ACKNOWLEDGEMENTS                                                             *
 *                                                                              *
 * DoA Power Tools Teamwork has been written from the ground up and is not      *
 * considered a fork of any other project. However it could never of happened   *
 * without the work done by many scriptwriters on the original DoA Power Tools  *
 * and its many mods.                                                           *
 *                                                                              *
 * DoA Power Tools by George Jetson                                             *
 *  - <http://userscripts.org/scripts/show/102481>                              *
 * DoA Power Tools Plus by Runey                                                *
 *  - <http://userscripts.org/scripts/show/104301>                              *
 * DoA Power Tools Mod by Wham                                                  *
 *  - <http://userscripts.org/scripts/show/103833>                              *
 * DoA Power Tools Teamwork by Runey, Wham, La Larva, Les & Lord Mimir          *
 *  - <http://userscripts.org/scripts/show/114012>                              *
 *                                                                              *
 * DEVELOPMENT                                                                  *
 *                                                                              *
 * If you wish to contribute to the development of DoA Power Tools Teamwork you *
 * can do so at http://wackoscripts.com                                         *
 *                                                                              *
 *                                                                              *
 * If you wish to fork this project then you may do so as long as the following *
 * conditions are met.                                                          *
 *  - The GNU General Public License version 3 or later is used                 *
 *  - All acknowledgements MUST be included in the source code                  *
 *  - A link to the API at MMOG Wiki MUST be included in the source code        *
 *  - It MUST be free (though as per the GNU Public License a small fee for     *
 *    distribution and/or support may be charged)                               *
 *                                                                              *
 * LICENSE                                                                      *
 *                                                                              *
 * Released under the GPL license                                               *
 * http://www.gnu.org/copyleft/gpl.html                                         *
 *                                                                              *
 * This program is free software: you can redistribute it and/or modify it      *
 * under the terms of the GNU General Public License as published by the        *
 * Free Software Foundation, either version 3 of the License, or                *
 * (at your option) any later version.                                          *
 *                                                                              *
 * This program is distributed in the hope that it will be useful, but          *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY   *
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License     *
 * for more details.                                                            *
 *                                                                              *
 * You should have received a copy of the GNU General Public License along with *
 * this program.  If not, see <http://www.gnu.org/licenses/>.                   *
 ********************************************************************************/
 
 
 
 
 
 
/*                                 A T T E N T I O N
*
*                                  W A R N I N G ! ! !
*
*  Changing some values in this script generates many requests to the server 
*  that are monitored by the game developers.
*  Thats gives them reason to increase the security on your servers.
*  This type of action ( extremely abusive to the servers ) are what make that
*  game developers end up tired and seek more strictest ways to block this script.
*  ( Of which have already implemented some of them )
*            
*	   PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
*
*                     ( We will end up losing everyone )
*
* The variables involved are:
* -Minimum and maximum between attacks
* -Search radius on the map
* And all the frequencies that include time between requests to the server.
*
* All values we implemented, are thoroughly studied and are there for reasons 
* of logic and common sense, not because we are bad guys.
*
* for example:
* If I were the server administrator, and saw that an IP address with a 
* specific USER_ID is making more than 100 requests in less than an hour over 
* the same action with a frequency of 15 to 20 seconds without stopping, 
* is obviously thats is not a human being.
*/

(function() {
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

// jQuery Alias
var $J; 

var SCRIPT_NAME		= 'DoA Power Tools Teamwork';

// Script Version: Year, Month, Day, Revision, Maturity (e.g. YYYY.MMDDa_BETA)
var SCRIPT_VERSION	= '2012.05.03b';

// For Script Mod Authors  ex: (AuthorName Mod)
var SCRIPT_MOD_BY	= '';

// DoA API Version
var API_VERSION		= 'rover';

// Generates an ID from the name of the script to be used when data is stored in 
// localStorage to prevent overlap of data between different scripts
var SCRIPT_ID		= (SCRIPT_NAME + SCRIPT_MOD_BY).substr(3).replace(/([a-z]|\s)/g,'');

//"use strict";

/********************************************************************************
 * Check to see if script is running in an iframe or not and removes            *
 * unnecessary elements before continuing.                                      *
 *                                                                              *
 * Current actions:                                                             *
 *  - Set width all parent div of iframe to 100%                                *
 *  - Hide unwanted div in window.top                                           *
 *  - Hide unwanted div in iframe                                               *
 *  - Set width of #content div to 760px                                        *
 *                                                                              *
 * To avoid conflict with other libraries, that may be running on the same      *
 * page, the default alias of $ is changed to $J.                                *
 ********************************************************************************/
function preparePage() {
	$J = jQuery.noConflict();
    var iframe,
        object = '#castlemania_swf',
        platform;

    if ( window.top === window.self ) {
	
		if ( window.location.href.indexOf('facebook') !== -1 )
		{
			iframe	 = '#iframe_canvas';
			platform = 'facebook';
		}
		else if ( window.location.href.indexOf("google") !== -1 ) {
			iframe	 = '#oz-gadgets-canvas-iframe-659749063556';
			platform = 'google';
		}
		else if ( window.location.href.indexOf("kabam.com") !== -1 ) {
			iframe	 = '#game_frame';
			platform = 'kabam';
		}
	
        function setWide() {    
            clearTimeout;
            if ( $J(iframe).length < 1 )
			{
                setTimeout(setWide, 100);
                return;
            }
			
			$J(iframe).parents().css({width:'100%',margin:'0',border:'0'});
			
            switch ( platform )
			{
			case 'facebook' :
				$J('#rightCol').css('display', 'none');
				$J('#blueBar').css('position', 'relative');
				$J('#contentCol').css('background','transparent');
				$J('body').css('background', '#888 url(https://kabam1-a.akamaihd.net/wwwkabam/cdn/sites/doa/img/bg_doa.jpg)');
				break;
			case 'google' :
				$J(".Pca").css('display', 'none');
				$J(".ZXy9Tc.VR8ITe").css('display','none');
				$J(".fsfr2c.NeLhq").css('display','none');
				$J(".W1xc1").css('display','none');
				$J(".BQU9Gf.Sw36ne").css('display','none');
				$J(".uohZhe").css('display','none');
				$J(".JNPRxe").css('padding-top','0px');
				$J(".ZI35oe").css('padding','0px');
				break;
			case 'kabam' :
				$J(iframe).css({width:'100%',margin:'0',border:'0',backgroundColor:'transparent'});
				break;
            }

        }
        setWide();
    }
	else {
		
		platform = document.body.className.split(' ');
		if (platform && platform[0]){
			platform = platform[0].replace(/(platforms_|_game)/g,'');
		} else {
			platform = 'google';
		}
	
		var errors = 0;
        function setHigh() {
            clearTimeout;
            if ( $J(object).length < 1 )
			{
				if ( ++errors > 6 ){
					errors = 0;
					window.location =  window.location.href;
				}
				console.log ('object . lenghth < 1');
				setTimeout(setHigh, 500);
                return;
            }
			
			$J('#container').css({width:'760px',height:'860px'});
			
            switch (platform)
			{
			case 'facebook' :
				$J('#hd > div').css('display', 'none');
				$J('#ft').css('display', 'none');
				$J('#cn').parent().append($J('#hd'));
				$J('body').css('background', 'transparent');
				$J('html').css('background', 'transparent');
				break;
			case 'google' :
				$J('#pane_hd').css('display', 'none');
				$J('body').css('background', 'transparent');
				$J('body').css('background', '#888 url(https://kabam1-a.akamaihd.net/wwwkabam/cdn/sites/doa/img/bg_doa.jpg)');
				break;
			case 'kabam' :
				$J('html').css({overflow:'hidden',backgroundColor:'transparent'});
				$J('#content').css({width:'100%'});
				break;
            }
			
           initScript(object);
        }
        setHigh();
    }
}



/********************************************************************************
 * Setup global variables that can be used anywhere within the script           *
 *                                                                              *
 * NAMING CONVENTIONS (http://javascript.crockford.com/code.html)               *
 *  - variables and functions should begin with a lowercase letter              *
 *  - constructor functions should begin with a capital letter                  *
 *  - global variable should be all capitals                                    *
 ********************************************************************************/
 
// Constructor function 
var  AutoCollect,
	 Base64,
	 Buildings,
	 Data, 
	 Manifest, 
	 Map,
	 Marches,
	 Messages,
	 MyAjax,
	 Queue,
	 RequestQueue,
	 Seed,
	 Tabs = {},
	 Translation,
	 UID = {},
	 UIDN = {};
 
// Global Functions
var translate = actionLog = debugLog = verboseLog = function(){};

// Global Elements
var $startUpBox;

// Global Data Objects
var DATA_MAP, LANG_OBJECT = {};
 
 
// Unique Identifier
UID = {};
UIDN = {};

function makeUID ( len )
{
	var len = ( len !== undefined ? len : 20);
	var chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','u','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','U','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','_'];
	var uid = chars[Math.floor( Math.random() * 54 )];
	for(var i = 0; i < len; i++)
	{
		uid += chars[Math.floor( Math.random() * 64 )];
	}
	return uid;
}

function getUID ( name )
{
	return UID[name] !== undefined ? UID[name] : name;
}

function setUID ( name )
{
	var uid = makeUID();
	while ( UIDN[uid] !== undefined )
	{
		uid = makeUID();
	}
	UIDN[uid] = 1;
	UID[name] = uid;
	return uid;
}
 
 

if ( SCRIPT_MOD_BY.length )
{
	String.scriptModBy = SCRIPT_MOD_BY;
}
 
 
 
 
// init PowerTools

function initScript ( SWF_OBJECT )
{


/********************************************************************************
* All global variables MUST be set here or they will not be available to all   *
* functions throughout the script.                                             *
********************************************************************************/

var SCRIPT_URL_ERROR	= 'http://wackoscripts.com';
var SCRIPT_TITLE		= '';


// Tab order
var INFO_TAB_ORDER		= 1;     
var WAVE_TAB_ORDER		= 2;
var ATTACK_TAB_ORDER	= 3;
var JOBS_TAB_ORDER		= 4;
var OPTIONS_TAB_ORDER	= 5;
var LOG_TAB_ORDER		= 99;

// Tab enable/disable
var INFO_TAB_ENABLE		= true;     
var WAVE_TAB_ENABLE		= true;
var ATTACK_TAB_ENABLE	= true;
var JOBS_TAB_ENABLE		= true;
var OPTIONS_TAB_ENABLE	= true;
var LOG_TAB_ENABLE		= true;

// CHECK THESE VARIABLES
var DEBUG_MODE			= false;
var DEBUG_MARCHES		= false;
var ALERT_ON_BAD_DATA	= false;
var SCRIPT_STARTUP_DELAY= Math.randRange(5000, 7000);
var ERROR_509_DELAY     = 900000;


var LANG_CODE = navigator.language.substring(0, 2).toLowerCase();
var IS_NOT_NATIVE_LANG = ( LANG_CODE !== 'en' );

var IS_CHROME = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

// Error messages
var FATAL_SEED_TITLE	= 'ERROR WHILST FETCHING DATA FROM SERVER';
var FATAL_SEED_MSG	= 'Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again. Please try to leave this page open for up to 5 mins <br> Other wise post a report on <a href="http://wackoscripts.com" target="_new">Wackoscripts</a>';
var FATAL_SWF		= '<B>Error initializing:</b><BR><BR>Unable to find SWF element';
var STARTUP_ERROR	= 'Unable to start $SCRIPT_NAME$ <BR>';
var INIT_ERROR		= '<B>Error initializing:</b><BR><BR>';


/* WARNING: Reducing this values cause Too many requests to the server
   that are monitored. Thats gives them reason to increase the security 
   on the servers and, sooner or later, make this scripts unusable.
   PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT. */
var ATTACK_MIN_DELAY	= 25; 


var DRAGON_OBJ_ID = [
	'Great_Dragon',
	'Water_Dragon',
	'Stone_Dragon',
	'Fire_Dragon',
	'Wind_Dragon',
	'Ice_Dragon',
	'Swamp_Dragon',
	'Forest_Dragon',
	'Desert_Dragon',
	'',
	'Spectral_Dragon'
];

var OUTPOST_TYPE_INDEX  = {};
var DRAGONS_NAMES  = [];
for (var i=0; i < DRAGON_OBJ_ID.length; i++)
{
	var dragon_name = DRAGON_OBJ_ID[i].replace('_','');
	DRAGONS_NAMES[i] = dragon_name;
	OUTPOST_TYPE_INDEX[ dragon_name + 'Outpost' ] = i;
}

var DRAGONS_REGEXP = new RegExp('(' + DRAGONS_NAMES.join('|').replace(/\|+/g,'|') + ')');




/*******************************************************************************
***************************      TRANSLATIONS      ****************************
*******************************************************************************/
function setLanguage ( locale )
{
LANG_CODE = locale || LANG_CODE;
switch ( LANG_CODE )
{
	/*******************************************************************************
		German ( by Native & Rosebandit)
	*******************************************************************************/
case 'de':
	LANG_OBJECT = {
	'above the first value':'über dem ersten Wert',
	'Action Logs':'Aktion Logs',
	'Actions':'Aktionen',
	'and':'und',
	'Are you sure you want to':'Bist du sicher, dass du',
	'at':'bei',
	'Attack One Target in Waves':'Wellenangriff auf ein Ziel',
	'Attack sent to':'Sende angriffe an',
	'Attacking':'Angriff',
	'Attacks Configuration':'Angriffs-Konfiguration',
	'Attacks Logs':'Angriffs-Logbücher',
	'Attacks stopped momentarily to prevent server blocking':'Angriffe momentan gestoppt, um eine Sperrung durch den Server zu verhindern',
	'Attacks':'Attacken',
	'Auto Refresh every':'Automatisches Auffrischen alle',
	'Automatically':'Automatisch',
	'Awaiting task completion notification':'Erwarte Abschlussbenach-richtigung der Aufgabe',
	'Bandwidth Limit Exceeded':'Bandbreite Grenzwert überschritten',
	'Building':'Gebäude',
	'Busy':'Beschäftigt',
	'Blue Energy':'Blaue Energie',
	'by':'durch',
	'Charging':'Laden',
	'Cities': 'Cities',
	'Clear last attack on all maps':'Lösche letzten Angriff auf allen Karten',
	'Clear last attack on current map':'Lösche letzten Angriff auf ak-tueller Karte',
	'Config':'Konfiguration',
	'Coordinates':'Koordinaten',
	'd':'t',
	'Days':'Tage',
	'Delay Between Attacks':'Verzögerung zwischen den Angriffen',
	'Depending on available population':'Abhängig von verfügbaren Bürgern',
	'Depending on available resources':'Abhängig von verfügbaren Ressourcen',
	'Disabled':'Deaktiviert',
	'Distance must be between':'Entfernung muss zwischen',
	'Distance':'Entfernung',
	'Dont flag Wildernesses':'Markiere keine Wildnisse',
	'Enable':'Aktivieren',
	'Enabled':'Aktiviert',
	'Error':'Fehler',
	'First value must be between':'Erster Wert muss zwischen',
	'Full':'ausgelastet',
	'Game Options':'Spiel Optionen',
	'Going to the coords':'Gehe zu den Koordinaten',
	'h':'h',
	'Hiding':'Verstecken',
	'Hour':'Stunde',
	'Hours':'Stunden',
	'Info':'Info',
	'Invalid Date From':'Ungültiges Datum aus',
	'Invalid Date To':'Ungültiges Datum zu',
	'Invalid delays':'Ungültige Verzögerungen',
	'Invalid number of troops':'Ungültige Anzahl von Truppen',
	'Invalid Range Date':'Ungültige Zeitspanne',
	'Last Attack':'Letzter Angriff',
	'Loaded':'Geladen',
	'Logs':'Logbücher',
	'm':'m',
	'Manual attack sent to':'Manueller Angriff gesendet an',
	'Maximum simultaneous marches':'Maximale Anzahl gleichzeitiger Mär-sche',
	'Maximum Requests per hour':'Maximale Anfragen pro Stunde',
	'Maximum Troops (0 = no max)':'Maximale Truppenanzahl (0 = kein Limit)',
	'miles':'Meilen',
	'Minutes':'Minuten',
	'No targets or troops available':'Keine Ziele oder Truppen verfügbar',
	'No troops available':'Keine Truppen verfügbar',
	'No Troops Defined':'Keine Truppen ausgewählt',
	'Not enough':'Nicht genügend',
	'Not':'Nicht',
	'of inactivity':'der Inaktivität',
	'of':'der',
	'Opening the map on the last position': 'Öffne die Karte auf der letzten position',
	'Options':'Optionen',
	'water_dragon outpost':'Wasser-Außenposten',
	'stone_dragon outpost':'Stein-Außenposten',
	'fire_dragon outpost':'Feuer-Außenposten',
	'wind_dragon outpost':'Wind-Außenposten',
	'ice_dragon outpost':'Eis-Außenposten',
	'swamp_dragon outpost':'Versunkener Tempel',
	'spectral_dragon outpost':'Spectral-Außenposten',
	'Permanent Data':'Dauerhafte Daten',
	'Please wait':'Bitte warten',
	'Preparing Attack':'Vorbereitung des Angriffs',
	'Refresh':'Aktualisieren',
	'Researching':'Forschen',
	'Retry in':'Wiederholen in',
	'Run Time':'Laufzeit',
	's':'sek',
	'Safe Mode':'Sicherer Modus',
	'Scanning Map':'Scanne Karte innerhalb von $NUM$ Meilen <BR> unge-fähre restliche Wartezeit',
	'Script Options':'Skript-Optionen',
	'Search Radius':'Suchradius',
	'Second value must be at least':'Weiter Wert muss mindestens',
	'Seconds':'Sekunden',
	'Send Dragon every certain number of waves':'Sende Drachen bei einer bestimmten Anzahl von Wellen',
	'spectral_dragon outpost':'Spektral-Ruinen',
	'Start Date':'Startdatum',
	'Starting soon':'Start in kürze',
	'Stop if any troops lost':'Stopp bei Truppenverlust',
	'Successfully':'Erfolgreich',
	'Summary':'Übersicht',
	'Targets':'Ziele',
	'Task Completed':'Aufgabe erledigt',
	'Tasks':'Aufgaben',
	'Too many errors,  disabling auto train':'Zu viele Fehler, deaktivere automatische Ausbildung',
	'Too many requests':'Zu viele Zugriffe',
	'Too many troops for muster point level':'Maximale Truppenanzahl laut Truppensammelplatz-Level überschritten',
	'Training Configuration':'Ausbildungs-Konfiguration',
	'Training queue':'Trainings-Warteschlange',
	'Troops for Wave Attack':'Truppen für Wellenangriff',
	'Troops lost':'Truppen verloren',
	'Troops Not Defined':'Truppen nicht definiert',
	'Use the Levels Tab to select attack areas':'Benutze die Level-Tabelle, um Angriffsbereiche auszuwählen',
	'Userset maximum marches reached':'Eingestellte maximale Märsche erreicht',
	'Verbose logging':'Ausführliche Logbücher',
	'Verbose Logs':'Ausführliche Logbücher',
	'Verbose':'Ausführliche',
	'waiting':'warten',
	'Warnings':'Warnung',
	'Wave attack to':'Wellenangriff auf',
	'Wave':'Welle',
	'Window drag':'Fensterverschiebung',
	'Withdraw troops if they are encamped':'Ziehe Truppen zurück, wenn sie lagern',
	'~AquaTroop':'Giftklau',            /* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'Luftis',       /* idem as above */
	'~BattleDragon':'KampfDr',          /* idem as above */
	'~Conscript':'Rekrut',              /* idem above */
	'~FireDragon':'FeuerDra',           /* idem */
	'~FireMirror':'Feuersp',            /* idem */
	'~FireTroop':'Pyros',               /* idem */
	'~Giant':'Riesen',                  /* idem */
	'~GreatDragon':'GrossDr',           /* idem */
	'~Halberdsman':'Hellebar',          /* idem */
	'~IceDragon':'IceDrg',				/* idem */
	'~Longbowman':'Bogi',               /* idem */
	'~Minotaur':'Mino',                 /* idem */
	'~PackDragon':'PckDrg',             /* idem */
	'~Porter':'Träger',                 /* idem */
	'~Spy':'Spion',                     /* idem */
	'~StoneDragon':'SteinDr',           /* idem */
	'~StoneTroop':'Oger',               /* idem */
	'~SwiftStrikeDragon':'kFD',         /* idem */
	'~WaterDragon':'WasserDr',          /* idem */
	'~WindDragon':'WindDr',             /* idem */
	'~WindTroop':'Banshee',             /* idem */
	'~Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Español (by La Larva)
	*******************************************************************************/
case 'es':
	LANG_OBJECT = {
	'above the first value':'por encima del primer valor',
	'Action Log':'Reporte de Acciones',
	'Actions':'Acciones',
	'and':'y',
	'Are you sure you want to':'Esta seguro que desea',
	'at':'en',
	'Attack One Target in Waves':'Ataques en Oleadas a Objetivos',
	'Attack sent to':'Ataque enviado a',
	'Attacking':'Atacando',
	'Attacks Configuration':'Configuración de Ataques',
	'Attacks Logs':'Registro de Ataques',
	'Attacks stopped momentarily to prevent server blocking':'Ataques pausados temporalmente para evitar el bloqueo del servidor',
	'Attacks':'Ataques',
	'Auto Refresh every':'Auto Recargar la página cada',
	'Automatically':'Automáticamente',
	'Awaiting task completion notification':'Esperando notificación de finalización de tarea',
	'Bandwidth Limit Exceeded':'Límite de ancho de banda excedido',
	'Building':'Edificando',
	'Busy':'Ocupado',
	'by':'por',
	'Charging':'Cargando',
	'Cities': 'Ciudades',
	'Clear last attack on all maps':'Limpiar todos los registros de últimos ataques',
	'Clear last attack on current map':'Limpiar registro de últimos ataques',
	'Config':'Configuración',
	'Coordinates':'Coordenadas',
	'd':'d',
	'Days':'Día(s)',
	'Delay Between Attacks':'Tiempo de retraso entre ataques',
	'Depending on available population':'En funcion de la poblacion disponible',
	'Depending on available resources':'En funcion de los recursos disponibles',
	'Disabled':'Desactivado',
	'Distance must be between':'La distancia debe estar entre',
	'Distance':'Distancia',
	'Dont flag Wildernesses':'No hacer Desiertos de los terrenos atacados',
	'Enable':'Activar',
	'Enabled':'Activado',
	'Error':'Error',
	'First value must be between':'El primer valor debe ser de',
	'Full':'Lleno',
	'Game Options':'Opciones del Juego',
	'Going to the coords':'Llendo a las Coordenadas',
	'h':'h',
	'Hiding':'Esconder Tropas',
	'Hour':'Hora',
	'Hours':'Hora(s)',
	'Info':'Info',
	'Invalid Date From':'Formato de Fecha de Inicio Invalido',
	'Invalid Date To':'Formato de Fecha de Finalizacion Invalido',
	'Invalid delays':'Intervalo de Retraso Invalido',
	'Invalid number of troops':'Numero invalido de tropas',
	'Invalid Range Date':'Rango de Fecha Invalido',
	'Last Attack':'Último Ataque',
	'Loaded':'Cargado',
	'Logs':'Registros',
	'm':'m',
	'Manual attack sent to':'Ataque Manual enviado a',
	'Maximum simultaneous marches':'Máximo de Marchas Simultáneas',
	'miles':'millas',
	'Minutes':'Minuto(s)',
	'No targets or troops available':'Sin objetivos o tropas disponibles',
	'No troops available':'No hay suficientes tropas',
	'No Troops Defined':'No Hay Tropas Definidas',
	'Not enough':'No hay suficiente',
	'Not':'No',
	'of inactivity':'de inactividad',
	'of':'de',
	'Opening the map on the last position':'Abriendo el mapa en la última posición',
	'Options':'Opciones',
	'water_dragon outpost':'Ciudad del Agua',
	'stone_dragon outpost':'Ciudad de la Piedra',
	'fire_dragon outpost':'Ciudad del Fuego',
	'wind_dragon outpost':'Ciudad del Viento',
	'ice_dragon outpost':'Ciudad de Hielo',
	'spectral_dragon outpost':'Ciudad Espectral',
	'Permanent Data':'Datos Permanentes',
	'Please wait':'Por favor, espere',
	'Preparing Attack':'Preparando el Ataque',
	'Refresh':'Actualizar',
	'Researching':'Investigando',
	'Retry in':'Reintentando en',
	'Run Time':'Tiempo de Ejecucción',
	's':'s',
	'Safe Mode':'Modo Seguro',
	'Scanning Map':'Buscando datos en $NUM$ millas a la redonda<BR>Este proceso puede demorar un tiempo',
	'Script Options':'Opciones del Script',
	'Search Radius':'Radio de Busqueda',
	'Second value must be at least':'El segundo valor debe ser por lo menos de',
	'Seconds':'Segundo(s)',
	'Send Dragon every certain number of waves':'Enviar Dragón cada cierto número de oleadas',
	'Start Date':'Fecha de Inicio',
	'Starting soon':'Comenzando pronto',
	'Stop if any troops lost':'Detener ataques si se pierden tropas',
	'Successfully':'Exitosamente',
	'Summary':'Detalles',
	'Targets':'Objetivos',
	'Task Completed':'Tarea Finalizada',
	'Tasks':'Tareas',
	'Too many errors, disabling auto training':'Demasiados errores, Desactivado Adiestramientos',
	'Too many requests':'Demasiadas Solicitudes',
	'Too many troops for muster point level':'Demasiadas tropas para el Nivel actual del Punto de Encuentro',
	'Training Configuration':'Configuración de Adiestramientos',
	'Training queue':'Encolando Adistramientos',
	'Troops for Wave Attack':'Tropas para Ataques Masivos',
	'Troops lost':'¡Se han perdido tropas',
	'Troops Not Defined':'No Hay Tropas Definidas',
	'Use the Levels Tab to select attack areas':'Usar la solapa de Niveles para seleccionar el rango de ataque',
	'Userset maximum marches reached':'Llegaste al limite defindo por ti de marchas',    
	'Verbose Log':'Registro Detallado',
	'Verbose logging':'Registro detallado',
	'Verbose':'Detallado',
	'waiting':'esperando',
	'Warnings':'Advertencias',
	'Wave attack to':'Ataque en Oleada a',
	'Wave':'Oleadas',
	'Window drag':'Arrastrar la ventana',
	'Withdraw troops if they are encamped':'Retirar tropas de terrenos conquistados',
	'~AquaTroop':'Tritón',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'TransB',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'DrgComb',		/* idem as above */
	'~Conscript':'Reclu',			/* idem above */
	'~FireDragon':'DrgFueg',		/* idem */
	'~FireMirror':'Espejo',			/* idem */
	'~FireTroop':'Magma',			/* idem */
	'~Giant':'Gigante',				/* idem */
	'~GreatDragon':'GranDrg',		/* idem */
	'~Halberdsman':'Alabar',		/* idem */
	'~IceDragon':'DrgHielo',		/* idem */
	'~Longbowman':'Arq',			/* idem */
	'~Minotaur':'Mino',				/* idem */
	'~PackDragon':'DrgCarg',		/* idem */ 
	'~Porter':'Porteador',			/* idem */
	'~Spy':'Espía',					/* idem */
	'~StoneDragon':'DrgPét',		/* idem */
	'~StoneTroop':'Ogro',			/* idem */
	'~SwiftStrikeDragon':'DrgARap',	/* idem */
	'~WaterDragon':'DrgAgua',		/* idem */
	'~WindDragon':'DrgViet',		/* idem */
	'~WindTroop':'Bansh',			/* idem */
	'~Zzz':'Zzz'
	};
	break;
	/**********************************************************************
	     Français  (by Randalph)
	***********************************************************************/
case 'fr':
	LANG_OBJECT = {
	'above the first value':'supérieure à la premiere',
	'Action Logs':'Logs Actions',
	'Actions':'Actions',
	'and':'et',
	'at':'à',
	'Attack One Target in Waves':'Attaquer une cible par vagues',
	'Attack sent to':'Attaque envoyée vers',
	'Attacking':'Attaquer',
	'Attacks Configuration':'Configuration',
	'Attacks Stats':'Stats',
	'Attacks stopped momentarily to prevent server blocking':'Attaques arrêtées momentanément pour éviter le blocage du serveur',
	'Attacks':'Attaques',
	'Attacks':'Attaques',
	'Auto Refresh every':'Rafraichir toutes les',
	'Automatically':'Automatique',
	'Awaiting task completion notification':'En attente de la notification de fin des tâches',
	'Bandwidth Limit Exceeded':'Limite la largeur de bande Dépassement',
	'Building':'Bâtiment',
	'Busy':'Occupé',
	'by':'par',
	'Charging':'Chargement',
	'Cities': 'Villes',
	'Clear last attack on all maps':'Réinitialiser toutes les cartes',
	'Clear last attack on current map':'Réinitialiser les attaques sur la carte',
	'Config':'Config',
	'Coordinates':'Coordonnées',
	'd':'j', /*abbr Day*/
	'Days':'Jours',
	'Delay Between Attacks':'Délai entre les attaques',
	'Depending on available population':' Population Minimum',
	'Depending on available resources':' Niveaux de Ressources Minimum',
	'Disabled':'Désactiver',
	'Distance must be between':'La distance doit être comprise entre',
	'Distance':'Distance',
	'Dont flag Wildernesses':'Ne pas occuper les étendues sauvages',
	'Enable':'Activer',
	'Enabled':'Activé',
	'Error':'Erreur',
	'First value must be between':'La valeur du délai doit être comprise entre',
	'Full':'Complet',
	'Game Options':'Options de jeu',
	'Going to the coords':'Aller aux coordonnées',
	'h':'h', /*abbr Hour*/
	'Hiding':'Cacher',
	'Hour':'Heure',
	'Hours':'Heures',
	'Info':'Infos',
	'Invalid Date From':'Date non valide de',
	'Invalid Date To':'Date non valide pour',
	'Invalid delays':'Délai invalide',
	'Invalid number of troops':'Nombre d\'unités invalide',
	'Invalid Range Date':'Format de la date incorrect',
	'Last Attack':'Dernière attaque',
	'Loaded':'Script chargé',
	'Logs':'Journal',
	'm':'m', /*abbr Minute*/
	'Manual attack sent to':'Attaque manuelle vers',
	'Maximum simultaneous marches':'Maximum de marches simultanées',
	'miles':'miles',
	'Minutes':'Minutes',
	'No targets or troops available':'Aucune cibles ou troupes disponibles',
	'No troops available':'Pas de troupes disponibles',
	'No Troops Defined':'Pas de troupes définies',
	'Not enough':'Pas assez',
	'Not':'Non',
	'of inactivity':'d\'inactivitées',
	'of':'des',
	'Opening the map on the last position':'Ouvre la carte aux dernières coordonnées',
	'Options':'Options',
	'water_dragon outpost':'Poste extérieur #1',
	'stone_dragon outpost':'Poste extérieur #2',
	'fire_dragon outpost':'Poste extérieur #3',
	'wind_dragon outpost':'Poste extérieur #4',
	'ice_dragon outpost':'Poste extérieur #5',
	'spectral_dragon outpost': 'Spectral Outpost',
	'Permanent Data':'Données en cache',
	'Please wait':'S\'il vous plaît attendre',
	'Preparing Attack':'Préparation d\'attaque',
	'Refresh':'Actualiser',
	'Researching':'Recherche en cours',
	'Retry in':'nouvel essai dans',
	'Run Time':'Temps d\'exécution',
	's':'s', /*abbr Seconds*/
	'Safe Mode':'Mode Sans échec',
	'Scanning Map':'Balayage de la carte sur $NUM$ miles.<BR>Attendez la fin du scan, ne quittez pas la page',
	'Script Options':'Options de script',
	'Search Radius':'Rayon de balayage',
	'Second value must be at least':'La deuxième valeur doit être au moins',
	'Seconds':'Secondes',
	'Send Dragon every certain number of waves':'Choisir l\'ordre de marche des grands dragons',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date':'Date de début',
	'Starting soon':'Démarrage dès',
	'Stop if any troops lost':'Désactiver en cas de pertes',
	'Successfully':'Réussi',
	'Summary':'Général',
	'Targets':'Cibles',
	'Task Completed':'Tache terminée',
	'Tasks':'Taches',
	'Too many errors,  disabling auto train':'Trop d\'erreurs, entrainement automatique désactivé',
	'Too many requests':'Trop d\' demandes',
	'Too many troops for muster point level':'Déploiement maximal atteint',
	'Training Configuration':'Configuration',
	'Training queue':'File de formation en attente',
	'Troops for Wave Attack':'Sélectionnez vos troupes',
	'Troops lost':'Troupes perdues',
	'Troops Not Defined':'Aucunes troupes définies',
	'Use the Levels Tab to select attack areas':'Utilisez l\'onglet "Niveaux" et sélectionnez la cible',
	'Userset maximum marches reached':'Maximum de marches simultanés atteinte',
	'Verbose logging':'Journal d\'évenements',
	'Verbose Logs':'Détail Logs',
	'Verbose':'Détail',
	'waiting':'en attente',
	'Warnings':'Avertissements',
	'Wave attack to':'Attaque en vagues vers',
	'Wave':'Vagues',
	'Window drag':'Glisser/déposer',
	'Withdraw troops if they are encamped':'Retirer les troupes en campement',
	'~AquaTroop':'Sol Aqua',        /* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'Ballons',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'DrgGr',		/* idem as above */
	'~Conscript':'Conscrit',		/* idem above */
	'~FireDragon':'DrgFeu',			/* idem */
	'~FireMirror':'Miroir',			/* idem */
	'~FireTroop':'Magma',			/* idem */
	'~Giant':'Géant',				/* idem */
	'~GreatDragon':'GrdDrg',		/* idem */
	'~Halberdsman':'Halbrd',		/* idem */
	'~IceDragon':'IceDrg',			/* idem */
	'~Longbowman':'Archer',			/* idem */
	'~Minotaur':'Mino',				/* idem */
	'~PackDragon':'DrgTrsp',   	    /* idem */
	'~Porter':'Porteur',			/* idem */
	'~Spy':'Espion',				/* idem */
	'~StoneDragon':'DrgPierre',		/* idem */
	'~StoneTroop':'Ogre',			/* idem */
	'~SwiftStrikeDragon':'RapDrg',	/* idem */
	'~WaterDragon':'DrgAqua',		/* idem */
	'~WindDragon':'DrgVent',		/* idem */
	'~WindTroop':'Banshee',			/* idem */
	'~Zzz':'Zzz'
	};
	break;

	/*******************************************************************************
		Italiano (by Boaro and Primate)
	*******************************************************************************/
case 'it':
	LANG_OBJECT = {
	'above the first value':'in più del valore minimo',
	'Action Logs': 'Registro Azioni',
	'Actions': 'Azioni',
	'and': 'e',
	'Are you sure you want to':'Sei sicuro di voler',
	'at': 'a',
	'Attack One Target in Waves': 'Attacco un obiettivo con Ondate',
	'Attack sent to': 'Attacco inviato a',
	'Attacking': 'Attacco in corso',
	'Attacks Configuration': 'Configurazione degli attacchi',
	'Attacks Logs': 'Registro attacchi',
	'Attacks stopped momentarily to prevent server blocking':'Attacchi temporaneamente fermati per prevenire il blocco da parte del server',
	'Attacks': 'Attacchi',
	'Auto Refresh every':'Aggiorna automaticamente ogni',
	'Automatically': 'Automaticamente',
	'Awaiting task completion notification': 'In attesa della notifica di completamento delle attività',
	'Bandwidth Limit Exceeded':'Limite larghezza banda superato',
	'Building': 'Costruendo',
	'Busy': 'Occupato',
	'by': 'da',
	'Charging':'Caricamento',
	'Cities': 'Cittàs',
	'Clear last attack on all maps': 'Cancella l\'ultimo attacco eseguito su tutte le mappe',
	'Clear last attack on current map': 'Cancella l\'ultimo attacco eseguito su questa mappa',
	'Config': 'Configurazione',
	'Coordinates': 'Coordinate',
	'd':'g',
	'Days': 'Giorni',
	'Delay Between Attacks': 'Ritardo tra gli attacchi',
	'Depending on available population': 'Una truppa per città alla volta',
	'Depending on available resources': 'Fino ad esaurimento risorse',
	'Disabled': 'Disabilita',
	'Distance must be between': 'La distanza deve essere tra',
	'Distance': 'Distanza',
	'Dont flag Wildernesses':'Non conquistare i terreni attaccati',
	'Enable': 'Abilita',
	'Enabled': 'Abilitato',
	'Error': 'Errore',
	'First value must be between': 'Il valore minimo deve essere compreso tra',
	'Full': 'Completo',
	'Game Options': 'Opzioni di gioco',
	'Going to the coords':'Stanno andando verso le coordinate designate',
	'h':'o',
	'Hiding': 'Truppe NASCOSTE',
	'Hour': 'Ora',
	'Hours': 'Ore',
	'Info': 'Informazioni',
	'Invalid Date From': 'Data Invalida Da',
	'Invalid Date To': 'Data Invalida fino A',
	'Invalid delays': 'Ritardo non valido',
	'Invalid number of troops': 'Numero di truppe non Valido',
	'Invalid Range Date': 'Frangente di tempo non valido',
	'Last Attack': 'Ultimo attacco',
	'Loaded': 'Caricato',
	'Logs': 'Registri',
	'm':'m',
	'Manual attack sent to': 'Inviato attacco manuale a ',
	'Maximum simultaneous marches': 'Massime Marce simultanee',
	'miles':'chilometri',
	'Minutes': 'Minuti',
	'No Generals Available': 'Nessun generale disponibile',
	'No targets or troops available': 'Nessun obiettivo o truppa disponibile',
	'No troops available': 'Nessuna truppa disponibile',
	'No Troops Defined': 'Nessuna truppa definita',
	'Not enough': 'Non hai abbastanza',
	'Not': 'Non',
	'of inactivity':'di inattività',
	'of': 'di',
	'Opening the map on the last position':'Sto aprendo la mappa all\'ultima posizione',
	'Options': 'Opzioni',
	'water_dragon outpost': 'Avamposto d\'Acqua',
	'stone_dragon outpost': 'Avamposto di Pietra',
	'fire_dragon outpost': 'Avamposto di Fuoco',
	'wind_dragon outpost': 'Avamposto di Vento',
	'ice_dragon outpost': 'Avamposto di Hielo',
	'spectral_dragon outpost': 'Avamposto di Spectral',
	'Permanent Data':'Dati Permanenti',
	'Please wait':'Attendere prego',
	'Preparing Attack':'Sto preparando l\'attacco',
	'Refresh': 'Aggiorna',
	'Researching': 'Sto ricercando',
	'Retry in':'Riprova in',
	'Run Time': 'Esecuzione',
	's':'s',
	'Safe Mode': 'Modalità provvisoria',
	'Scanning Map': 'Scansione della mappa entro $NUM$ chilometri <BR> Richiederà del tempo',
	'Script Options': 'Opzioni Script',
	'Search Radius':'Raggio di ricerca',
	'Second value must be at least':'Il maaggiore deve essere almeno',
	'Seconds': 'Secondi',
	'Send Dragon every certain number of waves':'Invia il Drago una volta ogni tot Onde',
	'spectral_dragon outpost':'Avamposto Fantasma',
	'Start Date': 'Data d\'inizio',
	'Starting soon':'A partire presto',
	'Stop if any troops lost': 'Ferma gli attacchi se muoiono delle truppe',
	'Successfully': 'Successo',
	'Summary': 'Sintesi',
	'Targets': 'Obiettivi',
	'Task Completed': 'Attività Completate',
	'Tasks': 'Attività',
	'Too many errors,  disabling auto train': 'Troppi errori, addestramento automatico fermato',
	'Too many requests':'Troppe richieste',
	'Too many troops for muster point level': 'Il livello del Punto di Raduno non supporta cosi tante truppe',
	'Training Configuration': 'Configurazione Addestramento',
	'Training queue': 'Elenco truppe in addestramento',
	'Troops for Wave Attack': 'Truppe per l\'attacco ad Onda',
	'Troops lost': 'Hai perso delle truppe',
	'Troops Not Defined': 'Truppe Non definite',
	'Use the Levels Tab to select attack areas': 'Usa la scheda Livello per selezionare le aree da attaccare',
	'Userset maximum marches reached': 'Numero massimo di marce raggiunto',
	'Verbose logging': 'Accesso con informazioni',
	'Verbose Logs': 'Registro verboso',
	'Verbose': 'Verboso',
	'waiting': 'sto aspettando',
	'Warnings': 'Avvertenze',
	'Wave attack to': 'Attacco ad Onda verso',
	'Wave': 'Onda',
	'Window drag': 'Trascina la finestra con il mouse',
	'Withdraw troops if they are encamped':'Ritira le truppe se si sono accampate',
	'~AquaTroop':'Abissi',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'Blindati',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'DragoGue',		/* idem as above */
	'~Conscript':'Recluta',			/* idem above */
	'~FireDragon':'DrgFuoco',		/* idem */
	'~FireMirror':'SpecchiF',		/* idem */
	'~FireTroop':'Magma',			/* idem */
	'~Giant':'Giganti',				/* idem */
	'~GreatDragon':'DrgBase',		/* idem */
	'~Halberdsman':'Alabarde',		/* idem */
	'~IceDragon':'IceDrg',			/* idem */
	'~Longbowman':'Arcieri',		/* idem */
	'~Minotaur':'Minotaur',			/* idem */
	'~PackDragon':'DraghiTS',		/* idem */ 
	'~Porter':'Portanti',			/* idem */
	'~Spy':'Spia',					/* idem */
	'~StoneDragon':'DrgPietr',		/* idem */
	'~StoneTroop':'OrcoGran',		/* idem */
	'~SwiftStrikeDragon':'DragoVel',/* idem */
	'~WaterDragon':'DrgAcqua',		/* idem */
	'~WindDragon':'DrgVento',		/* idem */
	'~WindTroop':'Banshee',			/* idem */
	'~Zzz':'Zzz'
	};
	break;
	/*********************************************************************************************
	Nederlands / Dutch  (by Tweakit/Modified by RaBeRa/Corrected by Soho/Additions by Cyrion)
	*********************************************************************************************/
case 'nl':
	LANG_OBJECT = {
	'above the first value':'boven de eerste waarde',
	'Action Logs':'Actie Logs',
	'Actions':'Acties',
	'and':'en',
	'Are you sure you want to':'Weet je zeker dat je',
	'at':'bij',
	'Attack One Target in Waves':'Val één doelwit aan met waves',
	'Attack sent to':'Aanval verzonden naar',
	'Attacking':'Aanvallen',
	'Attacks Configuration':'Aanvals Samenstelling',
	'Attacks Logs':'Aanvallogs',
	'Attacks stopped momentarily to prevent server blocking':'Aanvallen tijdelijk gestopt om server blokkade te voorkomen',
	'Attack':'Aanval',
	'Attacks':'Aanvallen',
	'Auto Refresh every':'automatisch verversen elke',
	'Automatically':'Automatisch',
	'Awaiting task completion notification':'In afwachting van melding taakvoltooiing',
	'Backup':'Backup maken',
	'Bandwidth Limit Exceeded':'Bandbreedte limiet overschreden',
	'Battle Report':'Veldslagrapporten',
	'Building':'Bouw',
	'Busy':'Bezig',
	'by':'door',
	'Charging':'Laden van',
	'Choose':'Kiezen',
	'Cities':'Steden',
	'Clear last attack on all maps':'Wis laatste aanval op alle kaarten',
	'Clear last attack on current map':'Wis laatste aanval op huidige kaart',
	'Config':'Samenstelling',
	'Coordinates':'Coördinaten',
	'd':'d',
	'Days':'Dagen',
	'Delay Between Attacks':'Vertraging tussen aanvallen',
	'Depending on available population':'Afhankelijk van beschikbare bevolking',
	'Depending on available resources':'Afhankelijk van beschikbare grondstoffen',
	'Disabled':'Uitgeschakeld',
	'Distance must be between':'Afstand moet liggen tussen',
	'Distance':'Afstand',
	'Dont flag Wildernesses':'Neem geen wildernissen over',
	'Dragon':'Draak',
	'Enable':'Inschakelen',
	'Enabled':'Ingeschakeld',
	'Error':'Fout',
	'fire_dragon outpost':'Vuur Voorpost',
	'First value must be between':'Eerste waarde moet liggen tussen',
	'Full':'Vol',
	'Game Options':'Spel Opties',
	'Going to the coords':'Gaat naar de coördinaten',
	'h':'u',
	'Hiding':'Verbergen',
	'Hour':'Uur',
	'Hours':'Uur',
	'ice_dragon outpost':'IJs Voorpost',
	'Info':'Info',
	'Invalid Date From':'Ongeldige Datum Vanuit',
	'Invalid Date To':'Ongeldige Datum To',
	'Invalid delays':'Ongeldige vertragingen',
	'Invalid number of troops':'Ongeldig aantal troepen',
	'Invalid Range Date':'Ongeldige Range datum',
	'Language':'Taal',
	'Last Attack':'Laatste Aanval',
	'Level':'Niveau',
	'Loaded':'Geladen',
	'Logs':'Logs',
	'm':'m',
	'Manual attack sent to':'Aanval handmatig verzonden naar',
	'Maximum requests per hour':'Maximum aantal verzoeken per uur',
	'Maximum simultaneous marches':'Maximum gelijktijdige marsen',
	'miles':'mijl',
	'Minutes':'Minuten',
	'Next City':'Volgende stad of voorpost',
	'No targets or troops available':'Geen doelwitten of troepen beschikbaar',
	'No troops available':'Geen troepen beschikbaar',
	'No Troops Defined':'Geen troepen opgegeven',
	'Not enough':'Niet genoeg',
	'Not':'Niet',
	'of inactivity':'van inactiviteit',
	'of':'van',
	'Opening the map on the last position':'Kaart openen op laatste positie',
	'Options':'Opties',
	'Permanent Data':'Vaste gegevens',
	'Please wait':'Even geduld aub',
	'Preparing Attack':'Aanval voorbereiden',
	'Refresh':'Verversen',
	'Researching':'Onderzoek', 
	'Restore':'Backup terugzetten',
	'Retry in':'Opnieuw in',
	'Run Time':'Looptijd',
	's':'s',
	'Safe Mode':'Veilige Modus',
	'Scanning Map':'Scannen kaart binnen $NUM$ mijl <BR> Dit duurt ongeveer',
	'Script Options':'Script opties',
	'Search Radius':'Zoek in straal van',
	'Second value must be at least':'Tweede waarde moet minimaal',
	'Seconds':'Seconden',
	'Send Dragon every certain number of waves':'Stuur Draak elke zoveelste aanval mee',
	'spectral_dragon outpost':'Spook Ruïne',
	'Start Date':'Start datum',
	'Starting soon':'Begint binnenkort',
	'Starting Soon':'Begint binnenkort',
	'stone_dragon outpost':'Steen Voorpost',
	'Stop if any troops lost':'Stop bij verliezen troepen',
	'Successfully':'Succesvol',
	'Summary':'Overzicht',
	'Targets':'Doelwitten',
	'Task Completed':'Taak voltooid',
	'Tasks':'Taken',
	'Toggle Flash':'DoA-Flash aan/uit',
	'Too many errors, disabling auto train':'Te veel fouten, automatisch trainen uitgeschakeld',
	'Too many requests':'Te veel verzoeken',
	'Too many troops for muster point level':'Te veel troepen voor niveau verzamelpunt',
	'Training Configuration':'Instelling trainingen',
	'Training queue':'Wachtrij trainingen',
	'Troops for Wave Attack':'Troepen voor wave-aanval',
	'Troops lost':'Troepen verloren',
	'Troops Not Defined':'Geen troepen opgegeven',
	'Use the Levels Tab to select attack areas':'Gebruik het tabblad Niveaus om de aan te vallen gebieden te selecteren',
	'Userset maximum marches reached':'Maximum aantal marsen bereikt',
	'Verbose logging':'Uitgebreid loggen',
	'Verbose Logs':'Uitgebreide Logs',
	'Verbose':'Uitgebreid',
	'waiting':'wachten',
	'Warnings':'Waarschuwingen',
	'water_dragon outpost':'Water Voorpost',
	'Wave attack to':'Wave-aanval op',
	'Wave Stats':'Wave statistieken',
	'Wave':'Wave',
	'wind_dragon outpost':'Wind Voorpost',
	'Window drag':'Slepen venster',
	'Withdraw troops if they are encamped':'Troepen terugtrekken als deze versterken',
	'Your Player':'Spelergegevens',
	'~AquaTroop':'Visjes',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'AT\'s',		/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'BD',			/* idem as above */
	'~Conscript':'Rekruut',			/* idem above */
	'~FireDragon':'Vuur Draak',		/* idem */
	'~FireMirror':'Spiegels',		/* idem */
	'~FireTroop':'Pyro',			/* idem */
	'~Giant':'Reus',			/* idem */
	'~GreatDragon':'Grote Draak',		/* idem */
	'~Halberdsman':'Helbaar',		/* idem */
	'~IceDragon':'Vorstdrk',		/* idem */
	'~Longbowman':'LBM',			/* idem */
	'~Minotaur':'Mino',			/* idem */
	'~PackDragon':'TSDraak',		/* idem */
	'~Porter':'Drager',			/* idem */
	'~Spy':'Spion',				/* idem */
	'~StoneDragon':'SteenDraak',		/* idem */
	'~StoneTroop':'Oger',			/* idem */
	'~SwiftStrikeDragon':'SSD',		/* idem */
	'~WaterDragon':'WaterDraak',		/* idem */
	'~WindDragon':'WindDraak',		/* idem */
	'~WindTroop':'Banshee',			/* idem */
	'~Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Polish
	*******************************************************************************/
case 'pl':
	LANG_OBJECT = {
	'above the first value':'powyzej pierwszej wartosci',
	'Action Logs':'Dzienniki dzialaniu',
	'Actions':'Akcje',
	'and':'i',
	'Are you sure you want to':'Czy na pewno chcesz',
	'at':'w',
	'Attack One Target in Waves':'Jeden cel ataku w Fala',
	'Attack sent to':'Wyslane do Atak',
	'Attacking':'Atak',
	'Attacks Configuration':'Ataki Konfiguracja',
	'Attacks Logs':'Logi Ataki',
	'Attacks stopped momentarily to prevent server blocking':'Ataki zatrzymal sie na chwile, aby zapobiec blokowaniu serwerów',
	'Attacks':'Ataki',
	'Auto Refresh every':'Automatyczne odswiezanie co',
	'Automatically':'Automatycznie',
	'Awaiting task completion notification':'Oczekiwanie na zakonczenie zadania zgloszeniu',
	'Bandwidth Limit Exceeded':'Przekroczono limit transferu',
	'Building':'Budowanie',
	'Busy':'Zajety',
	'by':'prze',
	'Charging':'Ladowanie',
	'Cities': 'Miasta',
	'Clear last attack on all maps':'Usun ostatnie atak na wszystkich mapach',
	'Clear last attack on current map':'Usun ostatnie atak na aktualna mape',
	'Config':'Konfiguracja',
	'Coordinates':'Wspólrzedne',
	'd':'d',
	'Days':'Dni',
	'Delay Between Attacks':'Przerwa pomiedzy atakami',
	'Depending on available population':'Minimalna Obudowa',
	'Depending on available resources':'Minimalnego poziomu zasobów',
	'Disabled':'Dezaktywowac',
	'Distance must be between':'Odleglosc powinna wynosic od',
	'Distance':'Odleglosc',
	'Dont flag Wildernesses':'Nie nalezy puszczach z terenów zaatakowany',
	'Enable':'Wlac',
	'Enabled':'Wlaczone',
	'Error':'Blad',
	'First value must be between':'Wartosc musi byc pierwsze entre',
	'Full':'Pelny',
	'Game Options':'Opcje gry',
	'Going to the coords':'Przechodzac do wspólrzednych',
	'h':'h',
	'Hiding':'Ukrywanie',
	'Hour':'Godziny',
	'Hours':'Godziny',
	'Info':'Informacje',
	'Invalid Date From':'Nieprawidlowe dane od',
	'Invalid Date To':'Nieprawidlowe dane do',
	'Invalid delays':'Niewazny opóznienia',
	'Invalid number of troops':'Bledna liczba zolnierzy',
	'Invalid Range Date':'Nieprawidlowy zakres dat',
	'Last Attack':'Ostatni atak',
	'Loaded':'Zaladowany',
	'Logs':'Dzienniki',
	'm':'m',
	'Manual attack sent to':'Podrecznik wyslane do ataku',
	'Maximum simultaneous marches':'Maksymalna jednoczesne marsze',
	'miles':'mil',
	'Minutes':'Minut',
	'No targets or troops available':'Nie celów lub dostepnych oddzialów',
	'No troops available':'Wojsko nie jest dostepna',
	'No Troops Defined':'Nie zdefiniowane Troops',
	'Not enough':'A Malo',
	'Not':'Nie',
	'of inactivity':'bezczynnosci',
	'of':'z',
	'Opening the map on the last position':'Otwarcie mapy na ostatniej pozycji',
	'Options':'Opcje',
	'water_dragon outpost':'Water Outpost',
	'stone_dragon outpost':'Stone Outpost',
	'fire_dragon outpost':'Fire Outpost',
	'wind_dragon outpost':'Wind Outpost',
	'ice_dragon outpost':'Ice Outpost',
	'spectral_dragon outpost':'Spectral Outpost',
	'Permanent Data':'Stale Danych',
	'Please wait':'Proszę czekać',
	'Preparing Attack':'Przygotowanie Atak',
	'Refresh':'Odswiez',
	'Researching':'Badania',
	'Retry in':'Ponowna próba',
	'Run Time':'Czas pracy',
	's':'s',
	'Safe Mode':'Tryb awaryjny',
	'Scanning Map':'W $NUM$ mil Skanowanie map <BR> powinna to okolo czas',
	'Script Options':'Opcje Script',
	'Search Radius':'OdlegL',
	'Second value must be at least':'Druga wartosc musi wynosic co najmniej',
	'Seconds':'Sekund',
	'Send Dragon every certain number of waves':'Wyslij Smoka co pewnej liczby Fala',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date':'Poczatek',
	'Starting soon':'Począwszy od zaraz',
	'Stop if any troops lost':'Stop, jezeli jakiekolwiek wojska stracone',
	'Successfully':'Powodzeniem',
	'Summary':'Podsumowanie',
	'Targets':'Cele',
	'Task Completed':'Adanie Wykonane',
	'Tasks':'Zadania',
	'Too many errors,  disabling auto train':'Byt wiele bledów, wylaczenie pociagu auto',
	'Too many requests':'Byt wielu żądań',
	'Too many troops for muster point level':'Byt wielu zolnierzy zebrac punkt za poziom',
	'Training Configuration':'Konfiguracja Szkolenia',
	'Training queue':'Szkolenia kolejki',
	'Troops for Wave Attack':'Fala Atak wojsk',
	'Troops lost':'Wojsko Stracone',
	'Troops Not Defined':'Wojsko Nie zdefiniowane',
	'Use the Levels Tab to select attack areas':'Uzyciu karty Poziom wybrac obszary atak',
	'Userset maximum marches reached':'Maksymalnie marsze Zasieg UserSet',
	'Verbose logging':'Verbose logging',
	'Verbose Logs':'Dzienniki Konsola',
	'Verbose':'Konsola',
	'waiting':'czeka',
	'Warnings':'Ostrzezenia',
	'Wave attack to':'Atak Fala',
	'Wave':'Fala',
	'Window drag':'Okna przeciagnij',
	'Withdraw troops if they are encamped':'Wycofania wojsk jesli sa one obóz',
	'~Zzz':'Zzz'
	};
	break;
/*******************************************************************************
  [Portugues] (by The MIB)
*******************************************************************************/
case 'pt-br':
case 'pt':
case 'br':
	var translateArray = {
	'above the first value':'acima do primeiro valor',
	'Action Logs':'Logs de ação',
	'Actions':'Ações',
	'and':'e',
	'at':'em',
	'Attack One Target in Waves':'Um ataque de destino em Ondas',
	'Attack sent to':'Ataque enviado para',
	'Attacking':'Atacando',
	'Attacks':'Ataques',
	'Attacks Configuration':'Configuração de Ataques',
	'Attacks Stats':'Estatísticas de Ataques',
	'Attacks stopped momentarily to prevent server blocking':'Ataques pararam momentaneamente para impedir bloqueio do servidor',
	'Attacks':'Ataques',
	'Auto Refresh every':'Auto atualiza a cada',
	'Automatically':'Automaticamente',
	'Awaiting task completion notification':'Aguardando notificação de conclusão da tarefa',
	'Building':'Construir',
	'Busy':'Ocupado',
	'by':'por',
	'Cities': 'Cidades',
	'Clear last attack on all maps':'Limpar último Ataque em todos os mapas',
	'Clear last attack on current map':'Limpar último Ataque no mapa atual',
	'Config':'Configuração',
	'Console Logs':'Console Logs',
	'Console':'Console',
	'Coordinates':'Coordenadas',
	'd':'d', 
	'Days':'Dias',
	'Delay Between Attacks':'Delay entre os ataques',
	'Disabled':'Desabilitado',
	'Distance must be between':'Distância deve estar entre',
	'Distance':'Distância',
	'Dont make Wildernesses of the terrains attacked':'Não faça Wildernesses dos terrenos atacados',
	'Enable':'Ativar',
	'Enabled':'Ativado',
	'Error':'Erro',
	'First value must be between':'Primeiro valor deve estar entre',
	'Full':'Cheio',
	'Game Options':'Opções de Jogo',
	'Going to the coords':'Indo para a coordenada',
	'h':'h',
	'Hiding':'Escondido',
	'Hour':'Hora',
	'Hours':'Horas',
	'Info':'Info',
	'Invalid Date From':'Data inválida De',
	'Invalid Date To':'Data inválida Para',
	'Invalid delays':'delays inválida',
	'Invalid number of troops':'Número inválido de tropas',
	'Invalid Range Date':'Intevalo de Data inválido',
	'Last Attack':'Ultimo Ataque',
	'Loaded':'carregado',
	'Logs':'Logs',
	'm':'m', 
	'Manual attack sent to':'Ataque manual enviado para',
	'Maximum simultaneous marches':'Máximo marchas simultâneas',
	'miles':'Milhas',
	'Minimum Housing':'Habitação mínima',
	'Minimum Resource Levels':'Os níveis mínimos de recursos',
	'Minutes':'Minutos',
	'No Generals Available':'Não há Generais Disponíveis',
	'No targets or troops available':'Não há alvos ou tropas disponíveis',
	'No troops available':'Tropas não disponíveis',
	'No Troops Defined':'Não foi Definido as Tropas',
	'Not enough':'Não é suficiente',
	'Not':'Não',
	'of inactivity':'de inatividade',
	'of':'de',
	'Opening the map on the last position':'Abrindo o mapa na última posição',
	'Options':'Opções',
	'Outpost 1':'Outpost 1 (Agua)',
	'Outpost 2':'Outpost 2 (Pedra)',
	'Outpost 3':'Outpost 3 (Fogo)',
	'Outpost 4':'Outpost 4 (Vento)',
	'Permanent Data':'Dados Permanentes',
	'Preparing Attack':'Preparando Ataque',
	'Refresh':'Atualizar',
	'Researching':'Pesquisando',
	'Retry in':'Repetir em',
	'Run Time':'Tempo de Execução',
	's':'s', 
	'Safe Mode':'Modo de Segurança',
	'Scanning Map':'Scaneando o Mapa',
	'Script Options':'Opções de Script',
	'Search Radius':'Busca por raio',
	'Second value must be at least':'Segundo valor deve ser Menor',
	'Seconds':'Segundos',
	'Send Dragon every certain number of waves':'Enviar o Dragão cada certo número de ondas',
	'Start Date':'Data de Inicio',
	'Stop if any troops lost':'Parar se houver perda de tropas',
	'Successfully':'Sucesso',
	'Summary':'Resumo',
	'Targets':'Alvos',
	'Task Completed':'Tarefa concluída',
	'Tasks':'Tarefas',
	'Too many errors,  disabling auto train':'Muitos erros, Desabiltar o Treinamento Automatico',
	'Too many troops for muster point level':'Muitas tropas para o seu nível de muster point',
	'Training Configuration':'Configuração de Treinamento',
	'Training queue':'Fila de Treinamento',
	'Troops for Wave Attack':'Tropas de ataque em ondas',
	'Troops lost':'Tropas perdidas',
	'Troops Not Defined':'Tropas não definidas',
	'Use the Levels Tab to select attack areas':'Use a guia Levels para selecionar áreas ataque',
	'Userset maximum marches reached':'O limite Máximo marchas foi atingido ',
	'Verbose logging':'log detalhado',
	'waiting':'Esperando',
	'Warnings':'Advertências',
	'Wave attack to':'Ataque em Ondas',
	'Wave':'Ondas',
	'Window drag':'Arrastar Janela',
	'~AquaTroop':'AquaTroop',					/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'ArmoredTransport',		/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'Dragao de Batalha - BD',	/* idem as above */
	'~Conscript':'Conscript',					/* idem above */
	'~FireDragon':'Dragão de Fogo',				/* idem */
	'~FireMirror':'FireMirror',					/* idem */
	'~FireTroop':'FireTroop',					/* idem */
	'~Giant':'Gigante',							/* idem */
	'~GreatDragon':'Dragão Verde',				/* idem */
	'~Halberdsman':'Halberdsman',				/* idem */
	'~IceDragon':'IceDrg',						/* idem */
	'~Longbowman':'Longbowman',					/* idem */
	'~Minotaur':'Minotauro',					/* idem */
	'~Porter':'Porter',							/* idem */
	'~Spy':'Espião',							/* idem */
	'~StoneDragon':'Dragão de Pedra',			/* idem */
	'~StoneTroop':'StoneTroop',					/* idem */
	'~SwiftStrikeDragon':'SwiftStrikeDragon',	/* idem */
	'~WaterDragon':'Dragão de Agua',			/* idem */
	'~WindDragon':'Dragão do Vento',			/* idem */
	'~WindTroop':'WindTroop',					/* idem */
	'~Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Russian (by Paxa)
	*******************************************************************************/
case 'ru':
case 'tt':
	LANG_OBJECT = {
	'above the first value':'больше первого значения', 
	'Action Logs':'Журнал действий', 
	'Actions':'Действия', 
	'and':'и', 
	'at':'в', 
	'Attack One Target in Waves':'Атаковать одну цель волнами', 
	'Attack sent to':'Войска атакуют', 
	'Attacking':'Атака', 
	'Attacks Configuration':'Настройка атак', 
	'Attacks Stats':'Статистика атак', 
	'Attacks stopped momentarily to prevent server blocking':'Атаки приостановлены для предотвращения блокировок сервером', 
	'Attacks':'Атаки', 
	'Attacks':'Атаки', 
	'Auto Refresh every':'Автообновление каждые', 
	'Automatically':'Автоматически', 
	'Awaiting task completion notification':'Ожидание результатов задания', 
	'Bandwidth Limit Exceeded':'Пропускная способность Превышен предел',
	'Building':'Строительство', 
	'Busy':'Занято', 
	'by':' ', 
	'Charging':'погрузка',
	'Cities': 'Города',
	'Clear last attack on all maps':'Очистка время атак на всех картах', 
	'Clear last attack on current map':'Очистка время атак на этой карте', 
	'Config':'Конфигурация', 
	'Console Logs':'Журнал консоли', 
	'Console':'Консоль', 
	'Coordinates':'Координаты', 
	'd':'дн.', /*abbr Day*/ 
	'Days':'Дней', 
	'Delay Between Attacks':'Пауза между атаками', 
	'Depending on available population':'Минимально по населению', 
	'Depending on available resources':'Минимально по ресурсам', 
	'Disabled':'Выключено', 
	'Distance must be between':'Расстояние должно быть между', 
	'Distance':'Расстояние', 
	'Dont flag Wildernesses':'Dont flag Wildernesses', 
	'Enable':'Включить', 
	'Enabled':'Включено', 
	'Error':'Ошибка', 
	'First value must be between':'Первое значение должно быть между', 
	'Full':'Полный', 
	'Game Options':'Настройки игры', 
	'Going to the coords':'Переход на координаты', 
	'h':'ч', /*abbr Hour*/ 
	'Hiding':'Скрыты', 
	'Hour':'Час', 
	'Hours':'Часов', 
	'Info':'Инф.', 
	'Invalid Date From':'Неправильная дата', 
	'Invalid Date To':'Неправильная дата', 
	'Invalid delays':'Неправильная пауза', 
	'Invalid number of troops':'Не корректное число войск', 
	'Invalid Range Date':'Неправильная дата', 
	'Last Attack':'Последняя атака', 
	'Loaded':'Загружено', 
	'Logs':'Журнал', 
	'm':'мин', /*abbr Minute*/ 
	'Manual attack sent to':'Ручная отправка войск', 
	'Maximum simultaneous marches':'Максимум одновременных атак', 
	'miles':'клеток', 
	'Minutes':'Минут', 
	'No targets or troops available':'Нет доступных целей или войск', 
	'No troops available':'Не хватает войск', 
	'No Troops Defined':'Не указаны войска', 
	'Not enough':'Не хватает', 
	'Not':'Не', 
	'of inactivity':'бездействия', 
	'of':' ', 
	'Opening the map on the last position':'Открытие карты на последней позиции', 
	'Options':'Настройки', 
	'water_dragon outpost':'Аутпост 1', 
	'stone_dragon outpost':'Аутпост 2', 
	'fire_dragon outpost':'Аутпост 3', 
	'wind_dragon outpost':'Аутпост 4', 
	'ice_dragon outpost':'Аутпост 5', 
	'spectral_dragon outpost':'Spectral Outpost',
	'Permanent Data':'Permanent Data', 
	'Please wait':'Пожалуйста, подождите',
	'Preparing Attack':'Подготовка к атаке', 
	'Refresh':'Обновить', 
	'Researching':'Исследование', 
	'Retry in':'Повторить', 
	'Run Time':'Время выполнения', 
	's':'сек', /*abbr Seconds*/ 
	'Safe Mode':'Безопасный режим', 
	'Scanning Map':'Сканирование карты радиусом $NUM$ клеток BR> Это займет немного времени', 
	'Script Options':'Настройки скрипта', 
	'Search Radius':'Диапазон поиска', 
	'Second value must be at least':'второе значение должно быть больше', 
	'Seconds':'Секунд', 
	'Send Dragon every certain number of waves':'Посылать Дракона в волну', 
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date':'Дата начала', 
	'Starting soon':'Начиная скоро',
	'Stop if any troops lost':'Остановить при потере войск', 
	'Successfully':'Успешно', 
	'Summary':'Итог', 
	'Targets':'Цели', 
	'Task Completed':'Задача выполнена', 
	'Tasks':'Задания', 
	'Too many errors, disabling auto train':'Много ошибок, отключение автообучения',
	'Too many requests':'Mного запросов',
	'Too many troops for muster point level':'Много войск для текущего уровня военкомата', 
	'Training Configuration':'Настройки автообучения войск', 
	'Training queue':'Очередь обучения', 
	'Troops for Wave Attack':'Войска для атаки волнами', 
	'Troops lost':'Потери войск', 
	'Troops Not Defined':'Войска не указаны', 
	'Use the Levels Tab to select attack areas':'Укажите цели для атаки на вкладке уровней', 
	'Userset maximum marches reached':'Достигнуто максимально указанное число атак',
	'Verbose logging':'Подробный журнал', 
	'waiting':'ожидание', 
	'Warnings':'Warnings', 
	'Wave attack to':'Атаковать волнами', 
	'Wave':'Волна', 
	'Window drag':'Двигать окно', 
	'Withdraw troops if they are encamped':'Отзывать войска при захвате поля', 
	'~AquaTroop':'FT',			/* Abbreviation (max. 8 characters) */ 
	'~ArmoredTransport':'AT',	/* Abbreviation (max. 8 characters) */ 
	'~BattleDragon':'BD',		/* idem as above */ 
	'~Conscript':'Conscr',		/* idem above */ 
	'~FireDragon':'FireDrg',	/* idem */ 
	'~FireMirror':'FM',			/* idem */ 
	'~FireTroop':'LJ',			/* idem */ 
	'~Giant':'Giant',			/* idem */ 
	'~GreatDragon':'GrtDrg',	/* idem */ 
	'~Halberdsman':'Halbrd',	/* idem */ 
	'~IceDragon':'IceDrg',		/* idem */
	'~Longbowman':'LBM',		/* idem */ 
	'~Minotaur':'Mino',			/* idem */ 
	'~PackDragon':'DrgCarg',	/* idem */ 
	'~Porter':'Porter',			/* idem */ 
	'~Spy':'Spy',				/* idem */ 
	'~StoneDragon':'StnDrg',	/* idem */ 
	'~StoneTroop':'Ogre',		/* idem */ 
	'~SwiftStrikeDragon':'SSD',	/* idem */
	'~SwampDragon':'SwaDrg',	/* idem */	
	'~SwampTroop':'Venom',		/* idem */	
	'~WaterDragon':'WatDrg',	/* idem */ 
	'~WindDragon':'WndDrg',		/* idem */ 
	'~WindTroop':'Banshee',		/* idem */ 
	'~SwampTroop':'Venom',		/* idem */ 
	'~Zzz':'Zzz' 
	};
	break;
	/*******************************************************************************
		Turkish
	*******************************************************************************/
case 'tr':
case 'tk':
	LANG_CODE = 'tr';
	LANG_OBJECT = {
	'above the first value':'Ilk degerin üstünde',
	'Action Logs':'Eylem Kayitlar',
	'Actions':'Eylemler',
	'and':'ve',
	'Are you sure you want to':'Istediginiz emin',
	'at':'az',
	'Attack One Target in Waves':'Dalgalari Bir Hedef Saldiri',
	'Attack sent to':'Saldiri gönderildi',
	'Attacking':'Saldirmak',
	'Attacks Configuration':'Yapilandirma Saldirilari',
	'Attacks Logs':'Saldirilar Kayitlar',
	'Attacks stopped momentarily to prevent server blocking':'Saldirilari engelleme sunucu önlemek için bir an durdu',
	'Attacks':'Saldirilar',
	'Auto Refresh every':'Otomatik Yenileme her',
	'Auto-Collection of Resources':'Karakollarini Otomatik hasat kaynaklari her',
	'Automatically':'Otomatik',
	'Awaiting task completion notification':'Bekliyor görev tamamlama bildirimi',
	'Bandwidth Limit Exceeded':'Bant genişliği Sınırı Aşıldı',
	'Battle Report':'Raporlari Sil',
	'Building':'Bina',
	'Busy':'Mesgul',
	'by':'ile',
	'Charging':'Yükleme',
	'Cities': 'Şehirler',
	'Clear last attack on all maps':'Tüm haritalarda açik son saldiri',
	'Clear last attack on current map':'Mevcut harita üzerinde net son saldiri',
	'Config':'Yapilandirma',
	'Coordinates':'Koordinatlar',
	'd':'g',
	'Days':'Günleri',
	'Delay Between Attacks':'Saldirilar Arasindaki Gecikme',
	'Depending on available population':'Asgari Konut',
	'Depending on available resources':'Asgari Kaynak Seviyeleri',
	'Disabled':'Engelli',
	'Distance must be between':'Mesafe arasinda olmalidir',
	'Distance':'Mesafe',
	'Dont flag Wildernesses':'Arazilerde yapmayin Wildernesses saldirdi',
	'Enable':'Etkinlestir',
	'Enabled':'Etkin',
	'Error':'Hata',
	'First value must be between':'Ilk degeri arasinda olmalidir',
	'Full':'Tam',
	'Game Options':'Oyun Seçenekleri',
	'Going to the coords':'Koordinatlari gitmek',
	'h':'s',
	'Hiding':'Gizleme',
	'Hour':'Saat',
	'Hours':'Saat',
	'Info':'Bilgi',
	'Invalid Date From':'Geçersiz Tarih',
	'Invalid Date To':'Geçersiz Tarih',
	'Invalid delays':'Geçersiz gecikmeler',
	'Invalid number of troops':'Geçersiz asker sayisi',
	'Invalid Range Date':'Geçersiz Araligi Tarihi',
	'Last Attack':'Son Saldiri',
	'Loaded':'Yüklü',
	'Logs':'Kayitlar',
	'm':'d',
	'Manual attack sent to':'Ile gönderilen Manuel saldiri',
	'Maximum simultaneous marches':'Maksimum eszamanli yürüyüslerle',
	'miles':'mil',
	'Minutes':'Dakika',
	'Muster Point':'Nokta Muster',
	'My Generals':'Generaller',
	'No targets or troops available':'Yok hedefler veya asker',
	'No troops available':'Yok askerlerinin',
	'No Troops Defined':'Askerler Tanimli',
	'Not enough':'Yeterli degil',
	'Not':'Degil',
	'of inactivity':'hareketsizlik',
	'of':',',
	'Off':'bosta',
	'Opening the map on the last position':'Son konumu harita açma',
	'Options':'Seçenekler',
	'water_dragon outpost':'Su Sehri',
	'stone_dragon outpost':'Tas Sehir',
	'fire_dragon outpost':'Ates Sehir',
	'wind_dragon outpost':'Rüzgar Sehir',
	'ice_dragon outpost':'Ice Sehir',
	'spectral_dragon outpost':'Spectral Sehir',
	'Permanent Data':'Kalici Veri',
	'Please wait':'Lütfen bekleyin',
	'Preparing Attack':'Saldiri hazirlanmasi',
	'Refresh':'Yenile',
	'Required':'Gerek',
	'Researching':'Arastirma',
	'Run Time':'Çalisma Süresi',
	's':'deg',
	'Safe Mode':'Güvenli Mod',
	'Scanning Map':'Içinde $NUM$ kilometre <BR> Tarama harita bu yaklasik bir dakika zaman',
	'Script Options':'Komut Seçenekleri',
	'Search Radius':'Arama yariçapi',
	'Second value must be at least':'Ikinci deger olmali, en azindan',
	'Seconds':'Degil',
	'Send Dragon every certain number of waves':'Ejderha dalgalarin her belirli sayida Dalga',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date':'Baslangiç ??Tarihi',
	'Starting soon':'Yakında başlıyor',
	'Statistics':'Istatistik',
	'Stop if any troops lost':'Herhangi bir asker kaybetti Durdur',
	'Successfully':'Basariyla',
	'Summary':'Özet',
	'Targets':'Hedefler',
	'Task Completed':'Görev Tamamlandi',
	'Tasks':'Görevler',
	'Too many errors,  disabling auto train':'Çok fazla hata, otomatik tren devre disi birakma',
	'Too many requests':'Çok fazla sayıda istek',
	'Too many troops for muster point level':'Görememesi noktasi seviyesi için çok sayida asker',
	'Training Configuration':'Egitim Yapilandirma',
	'Training queue':'Egitim kuyruk',
	'Troops for Wave Attack': 'Dalgalanma asker Saldirilari',
	'Troops lost':'Askerler kaybetti',
	'Troops Not Defined':'Askerler Tanimli degil',
	'Use the Levels Tab to select attack areas':'Saldiri alanlarini seçmek için Seviyeleri Sekmesini kullanin',
	'Userset maximum marches reached':'Ayarlidir maksimum ulasti yürüyüsleri',
	'Verbose logging':'Günlügü etkinlestir',
	'Verbose Logs':'Konsol Kayitlar',
	'Verbose':'Konsol',
	'waiting':'bekleyen',
	'Warnings':'Uyarilar',
	'Wave attack to':'Dalga saldiri',
	'Wave':'Dalga',
	'Window drag':'Sürükleme etkinlestirin',
	'Withdraw troops if they are encamped':'Kamp eger birliklerinin geri çekilmesi',
	'~Zzz':'Zzz'
	};
	break;
default:
	LANG_OBJECT = {
	'Dont flag Wildernesses':'Don\'t flag Wildernesses',
	'm':'m',
	'water_dragon outpost':'Water Outpost',
	'stone_dragon outpost':'Stone Outpost',
	'fire_dragon outpost':'Fire Outpost',
	'forest_dragon outpost':'GAEA Spring',
	'wind_dragon outpost':'Wind Outpost',
	'ice_dragon outpost':'Ice Outpost',
	'swamp_dragon outpost':'Sunken Temple',
	'spectral_dragon outpost':'Spectral Outpost',
	'Scanning Map':'Scanning map within $NUM$ miles<BR>This should take about a minute',
	'~AquaTroop':'Fang',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'ArmTrans',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'BatDrg',		/* idem as above */
	'~Conscript':'Conscr',			/* idem above */
	'desert_dragon outpost':'Desert Settlers',
	'~DesertDragon':'HelioDrg',			/* idem */
	'~FireDragon':'FireDrg',		/* idem */
	'~FireMirror':'FireMir',		/* idem */
	'~FireTroop':'LavaJaws',		/* idem */
	'~FrostGiant':'FrostG',			/* idem */
	'~ForestTroop':'Titan',         /* idem */
	'~ForestDragon':'ForDrg',		/* idem */
	'~Giant':'Giant',				/* idem */
	'~GreatDragon':'GrtDrg',		/* idem */
	'~Halberdsman':'Halbrd',		/* idem */
	'~IceDragon':'IceDrg',			/* idem */
	'~Longbowman':'LBM',			/* idem */
	'~Minotaur':'Mino',				/* idem */
	'~PackDragon':'PckDrg',			/* idem */ 
	'~Porter':'Porter',				/* idem */
	'~Spy':'Spy',					/* idem */
	'~StoneDragon':'StnDrg',		/* idem */
	'~StoneTroop':'Ogre',			/* idem */
	'~SwiftStrikeDragon':'SSDrg',	/* idem */
	'~SwampDragon':'SwaDrg',		/* idem */
	'~SwampTroop':'Venom',			/* idem */
	'~WaterDragon':'WatDrg',		/* idem */
	'~WindDragon':'WndDrg',			/* idem */
	'~WindTroop':'Banshee',			/* idem */
	'~IceTroop':'Reaper',			/* idem */
	'~Zzz':'Zzz'

	};
}

LANG_OBJECT['WaterDragonOutpost'] = LANG_OBJECT['Outpost 1'] = LANG_OBJECT['water_dragon outpost']
LANG_OBJECT['StoneDragonOutpost'] = LANG_OBJECT['Outpost 2'] = LANG_OBJECT['stone_dragon outpost']
LANG_OBJECT['FireDragonOutpost'] = LANG_OBJECT['Outpost 3'] = LANG_OBJECT['fire_dragon outpost']
LANG_OBJECT['WindDragonOutpost'] = LANG_OBJECT['Outpost 4'] = LANG_OBJECT['wind_dragon outpost']
LANG_OBJECT['IceDragonOutpost'] = LANG_OBJECT['Outpost 5'] = LANG_OBJECT['ice_dragon outpost']
LANG_OBJECT['SwampDragonOutpost'] = LANG_OBJECT['Outpost 6'] = LANG_OBJECT['swamp_dragon outpost']
LANG_OBJECT['ForestDragonOutpost'] = LANG_OBJECT['Outpost 7'] = LANG_OBJECT['forest_dragon outpost']
LANG_OBJECT['DesertDragonOutpost'] = LANG_OBJECT['Outpost 8'] = LANG_OBJECT['desert_dragon outpost']

} // End changeLang

// Set initial Language
setLanguage();

 /********************************************************************************
* All id and class names must be scrambled to prevent the script from being    *
* blocked. These names have to be generated and allocated to CSS prior to      *
* rest of the script being initialised.                                        *
*                                                                              *
* Class List is an array containing the normal names for each class. This       *
* is then looped through and then scrambled to generate a unique name. A check *
* is done to ensure no two randmised names are the same before allowing the    *
* script to continue.                                                          *
********************************************************************************/ 
// Class List
$J.each([
	  'bnt_blue'
	 ,'bnt_cyan'
	 ,'bnt_green'
	 ,'btn_on'
	 ,'btn_off'
	 ,'bnt_red'
	 ,'bnt_purple'
	 ,'bnt_red'
	 ,'bnt_yellow'
	 ,'bold_red'
	 ,'compact_table'
	 ,'content'
	 ,'doa-icons'
	 ,'defending'
	 ,'hiding'
	 ,'hide_inputbox'
	 ,'main-box'
	 ,'march_camp'
	 ,'march_wave'
	 ,'no-attackable'
	 ,'row_top_headers'
	 ,'scrollable'
	 ,'status_feedback'
	 ,'status_report'
	 ,'status_ticker'
	 ,'subtitle'
	 ,'support_link'
	 ,'table'
	 ,'table_headers'
	 ,'title'
	 ,'map-viewer'
	 ,'map-viewer-box'
	 ,'map-viewer-dragger'
	], function(key, value){ setUID(value); });


/** Add Scrollbar CSS Styles
******************************/
//   (this should be loaded first, but overwrites other rules)
$J("<style>").append('\
	.' + UID['main-box'] + ' ::-webkit-scrollbar {\
		width				: 1.2em;\
		height				: 1.2em;\
		 -webkit-border-radius: 1ex;\
	}\
	.' + UID['main-box'] + ' ::-webkit-scrollbar-thumb {\
		border				: 1px solid #999;\
		background			: #bbb -webkit-gradient(\
							linear,\
							right top,\
							left top,\
							color-stop(0, rgb(190,190,190)),\
							color-stop(1, rgb(250,250,250))\
							);\
		-webkit-border-radius: 1ex;\
		-webkit-box-shadow	: 1px 1px 3px rgba(0, 0, 0, 0.4);\
	}\
	.' + UID['main-box'] + ' ::-webkit-scrollbar-thumb:hover {\
		border				: 1px solid #999;\
		background			: #bbb -webkit-gradient(\
							linear,\
							right top,\
							left top,\
							color-stop(0, rgb(160,160,160)),\
							color-stop(1, rgb(230,230,230))\
							);\
	}\
	.' + UID['main-box'] + ' ::-webkit-scrollbar-track {\
		-webkit-box-shadow	: 1px 1px 5px rgba(100,100,100,0.4) inset, -1px -1px 1px rgba(150,150,150,0.9) inset;\
		-webkit-border-radius: 1ex;\
	}\
	.' + UID['main-box'] + ' ::-webkit-scrollbar-track:hover {\
		-webkit-box-shadow	: 1px 1px 5px rgba(100,100,100,0.7) inset, -1px -1px 1px rgba(150,150,150,0.9) inset;\
	}\
');
	
/** Add jQuery UI CSS Styles 
******************************/
$J("<style>").append('\
	/* jQuery UI CSS Framework 1.8.16 */\
	/* Layout helpers\
	----------------------------------*/\
	.ui-helper-hidden\
	{\
		display: none;\
	}\
	.ui-helper-hidden-accessible\
	{\
		position: absolute !important;\
		clip: rect(1px 1px 1px 1px);\
		clip: rect(1px,1px,1px,1px);\
	}\
	.ui-helper-reset\
	{\
		margin: 0;\
		padding: 0;\
		border: 0;\
		outline: 0;\
		line-height: 1.2em;\
		text-decoration: none;\
		font-size: 100%;\
		list-style: none;\
	}\
	.ui-helper-clearfix:after\
	{\
		content: ".";\
		display: block;\
		height: 0;\
		clear: both;\
		visibility: hidden;\
	}\
	.ui-helper-clearfix\
	{\
		display: inline-block;\
	}\
	/* required comment for clearfix to work in Opera \*/\
	* html .ui-helper-clearfix\
	{\
		height:1%;\
	}\
	.ui-helper-clearfix\
	{\
		display:block;\
	}\
	/* end clearfix */\
	.ui-helper-zfix\
	{\
		width: 100%;\
		height: 100%;\
		top: 0;\
		left: 0;\
		position: absolute;\
		opacity: 0;\
		filter:Alpha(Opacity=0);\
	}\
	/* Interaction Cues\
	----------------------------------*/\
	.ui-state-disabled\
	{\
		cursor: default !important;\
	}\
	/* Icons\
	----------------------------------*/\
	/* Misc visuals\
	----------------------------------*/\
	/* Overlays */\
	.ui-widget-overlay\
	{\
		position: absolute;\
		top: 0;\
		left: 0;\
		width: 100%;\
		height: 100%;\
	}\
	/* states and images */\
	.ui-icon\
	{\
		display: block;\
		text-indent: -99999px;\
		overflow: hidden;\
		background-repeat: no-repeat;\
	}\
	/* Component containers\
	----------------------------------*/\
	.ui-widget\
	{\
		font-family: Trebuchet MS, Tahoma, Verdana, Arial, sans-serif;\
		font-size: 0.9em;\
	}\
	.ui-widget .ui-widget\
	{\
		font-size: 0.9em;\
	}\
	.ui-widget input,\
	.ui-widget select,\
	.ui-widget textarea,\
	.ui-widget button\
	{\
		font-family: Trebuchet MS, Tahoma, Verdana, Arial, sans-serif;\
		font-size: 0.9em;\
	}\
	.ui-priority-primary,\
	.ui-widget-content .ui-priority-primary,\
	.ui-widget-header .ui-priority-primary\
	{\
		font-weight: bold;\
	}\
	.ui-priority-secondary,\
	.ui-widget-content .ui-priority-secondary,\
	.ui-widget-header .ui-priority-secondary\
	{\
		opacity: .7;\
		filter:Alpha(Opacity=70);\
		font-weight: normal;\
	}\
	.ui-state-disabled,\
	.ui-widget-content .ui-state-disabled,\
	.ui-widget-header .ui-state-disabled\
	{\
		opacity: .35;\
		filter:Alpha(Opacity=35);\
		background-image: none;\
	}\
	/* Icons\
	----------------------------------*/\
	/* states and images */\
	.ui-icon,\
	.ui-widget-content .ui-icon\
	{\
		width: 16px;\
		height: 16px;\
		background-image: url(http://wackoscripts.com/icons.png);\
	}\
	.ui-widget-header .ui-icon,\
	.ui-state-default .ui-icon,\
	.ui-state-hover .ui-icon,\
	.ui-state-focus .ui-icon,\
	.ui-state-active .ui-icon,\
	.ui-state-highlight .ui-icon,\
	.ui-state-error .ui-icon,\
	.ui-state-error-text .ui-icon\
	{\
		background-image: url(data:image/png;base64,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);\
	}\
	/* positioning */\
	.ui-icon-alert { background-position: 0 -144px; }\
	.ui-icon-arrow-1-e { background-position: -32px -32px; }\
	.ui-icon-arrow-1-n { background-position: 0 -32px; }\
	.ui-icon-arrow-1-ne { background-position: -16px -32px; }\
	.ui-icon-arrow-1-nw { background-position: -112px -32px; }\
	.ui-icon-arrow-1-s { background-position: -64px -32px; }\
	.ui-icon-arrow-1-se { background-position: -48px -32px; }\
	.ui-icon-arrow-1-sw { background-position: -80px -32px; }\
	.ui-icon-arrow-1-w { background-position: -96px -32px; }\
	.ui-icon-arrow-2-e-w { background-position: -160px -32px; }\
	.ui-icon-arrow-2-n-s { background-position: -128px -32px; }\
	.ui-icon-arrow-2-ne-sw { background-position: -144px -32px; }\
	.ui-icon-arrow-2-se-nw { background-position: -176px -32px; }\
	.ui-icon-arrow-4 { background-position: 0 -80px; }\
	.ui-icon-arrow-4-diag { background-position: -16px -80px; }\
	.ui-icon-arrowrefresh-1-e { background-position: -160px -64px; }\
	.ui-icon-arrowrefresh-1-n { background-position: -144px -64px; }\
	.ui-icon-arrowrefresh-1-s { background-position: -176px -64px; }\
	.ui-icon-arrowrefresh-1-w { background-position: -128px -64px; }\
	.ui-icon-arrowreturn-1-e { background-position: -96px -64px; }\
	.ui-icon-arrowreturn-1-n { background-position: -80px -64px; }\
	.ui-icon-arrowreturn-1-s { background-position: -112px -64px; }\
	.ui-icon-arrowreturn-1-w { background-position: -64px -64px; }\
	.ui-icon-arrowreturnthick-1-e { background-position: -32px -64px; }\
	.ui-icon-arrowreturnthick-1-n { background-position: -16px -64px; }\
	.ui-icon-arrowreturnthick-1-s { background-position: -48px -64px; }\
	.ui-icon-arrowreturnthick-1-w { background-position: 0 -64px; }\
	.ui-icon-arrowstop-1-e { background-position: -208px -32px; }\
	.ui-icon-arrowstop-1-n { background-position: -192px -32px; }\
	.ui-icon-arrowstop-1-s { background-position: -224px -32px; }\
	.ui-icon-arrowstop-1-w { background-position: -240px -32px; }\
	.ui-icon-arrowthick-1-e { background-position: -32px -48px; }\
	.ui-icon-arrowthick-1-n { background-position: 0 -48px; }\
	.ui-icon-arrowthick-1-ne { background-position: -16px -48px; }\
	.ui-icon-arrowthick-1-nw { background-position: -112px -48px; }\
	.ui-icon-arrowthick-1-s { background-position: -64px -48px; }\
	.ui-icon-arrowthick-1-se { background-position: -48px -48px; }\
	.ui-icon-arrowthick-1-sw { background-position: -80px -48px; }\
	.ui-icon-arrowthick-1-w { background-position: -96px -48px; }\
	.ui-icon-arrowthick-2-e-w { background-position: -160px -48px; }\
	.ui-icon-arrowthick-2-n-s { background-position: -128px -48px; }\
	.ui-icon-arrowthick-2-ne-sw { background-position: -144px -48px; }\
	.ui-icon-arrowthick-2-se-nw { background-position: -176px -48px; }\
	.ui-icon-arrowthickstop-1-e { background-position: -208px -48px; }\
	.ui-icon-arrowthickstop-1-n { background-position: -192px -48px; }\
	.ui-icon-arrowthickstop-1-s { background-position: -224px -48px; }\
	.ui-icon-arrowthickstop-1-w { background-position: -240px -48px; }\
	.ui-icon-battery-0 { background-position: -48px -176px; }\
	.ui-icon-battery-1 { background-position: -64px -176px; }\
	.ui-icon-battery-2 { background-position: -80px -176px; }\
	.ui-icon-battery-3 { background-position: -96px -176px; }\
	.ui-icon-bookmark { background-position: -224px -96px; }\
	.ui-icon-bullet { background-position: -80px -144px; }\
	.ui-icon-calculator { background-position: -112px -112px; }\
	.ui-icon-calendar { background-position: -32px -112px; }\
	.ui-icon-cancel { background-position: 0 -128px; }\
	.ui-icon-carat-1-e { background-position: -32px 0; }\
	.ui-icon-carat-1-n { background-position: 0 0; }\
	.ui-icon-carat-1-ne { background-position: -16px 0; }\
	.ui-icon-carat-1-nw { background-position: -112px 0; }\
	.ui-icon-carat-1-s { background-position: -64px 0; }\
	.ui-icon-carat-1-se { background-position: -48px 0; }\
	.ui-icon-carat-1-sw { background-position: -80px 0; }\
	.ui-icon-carat-1-w { background-position: -96px 0; }\
	.ui-icon-carat-2-e-w { background-position: -144px 0; }\
	.ui-icon-carat-2-n-s { background-position: -128px 0; }\
	.ui-icon-cart { background-position: -48px -112px; }\
	.ui-icon-check { background-position: -64px -144px; }\
	.ui-icon-circle-arrow-e { background-position: -112px -192px; }\
	.ui-icon-circle-arrow-n { background-position: -160px -192px; }\
	.ui-icon-circle-arrow-s { background-position: -128px -192px; }\
	.ui-icon-circle-arrow-w { background-position: -144px -192px; }\
	.ui-icon-circle-check { background-position: -208px -192px; }\
	.ui-icon-circle-close { background-position: -32px -192px; }\
	.ui-icon-circle-minus { background-position: -16px -192px; }\
	.ui-icon-circle-plus { background-position: 0 -192px; }\
	.ui-icon-circle-triangle-e { background-position: -48px -192px; }\
	.ui-icon-circle-triangle-n { background-position: -96px -192px; }\
	.ui-icon-circle-triangle-s { background-position: -64px -192px; }\
	.ui-icon-circle-triangle-w { background-position: -80px -192px; }\
	.ui-icon-circle-zoomin { background-position: -176px -192px; }\
	.ui-icon-circle-zoomout { background-position: -192px -192px; }\
	.ui-icon-circlesmall-close { background-position: -32px -208px; }\
	.ui-icon-circlesmall-minus { background-position: -16px -208px; }\
	.ui-icon-circlesmall-plus { background-position: 0 -208px; }\
	.ui-icon-clipboard { background-position: -160px -128px; }\
	.ui-icon-clock { background-position: -80px -112px; }\
	.ui-icon-close { background-position: -80px -128px; }\
	.ui-icon-closethick { background-position: -96px -128px; }\
	.ui-icon-comment { background-position: -128px -96px; }\
	.ui-icon-contact { background-position: -192px -128px; }\
	.ui-icon-copy { background-position: -176px -128px; }\
	.ui-icon-disk { background-position: -96px -112px; }\
	.ui-icon-document { background-position: -32px -96px; }\
	.ui-icon-document-b { background-position: -48px -96px; }\
	.ui-icon-eject { background-position: -112px -160px; }\
	.ui-icon-extlink { background-position: -32px -80px; }\
	.ui-icon-flag { background-position: -16px -112px; }\
	.ui-icon-folder-collapsed { background-position: 0 -96px; }\
	.ui-icon-folder-open { background-position: -16px -96px; }\
	.ui-icon-gear { background-position: -192px -112px; }\
	.ui-icon-grip-diagonal-se { background-position: -80px -224px; }\
	.ui-icon-grip-dotted-horizontal { background-position: -16px -224px; }\
	.ui-icon-grip-dotted-vertical { background-position: 0 -224px; }\
	.ui-icon-grip-solid-horizontal { background-position: -48px -224px; }\
	.ui-icon-grip-solid-vertical { background-position: -32px -224px; }\
	.ui-icon-gripsmall-diagonal-se { background-position: -64px -224px; }\
	.ui-icon-heart { background-position: -208px -112px; }\
	.ui-icon-help { background-position: -48px -144px; }\
	.ui-icon-home { background-position: 0 -112px; }\
	.ui-icon-image { background-position: -208px -128px; }\
	.ui-icon-info { background-position: -16px -144px; }\
	.ui-icon-key { background-position: -112px -128px; }\
	.ui-icon-lightbulb { background-position: -128px -128px; }\
	.ui-icon-link { background-position: -240px -112px; }\
	.ui-icon-locked { background-position: -192px -96px; }\
	.ui-icon-mail-closed { background-position: -80px -96px; }\
	.ui-icon-mail-open { background-position: -96px -96px; }\
	.ui-icon-minus { background-position: -48px -128px; }\
	.ui-icon-minusthick { background-position: -64px -128px; }\
	.ui-icon-newwin { background-position: -48px -80px; }\
	.ui-icon-note { background-position: -64px -96px; }\
	.ui-icon-notice { background-position: -32px -144px; }\
	.ui-icon-pause { background-position: -16px -160px; }\
	.ui-icon-pencil { background-position: -64px -112px; }\
	.ui-icon-person { background-position: -144px -96px; }\
	.ui-icon-pin-s { background-position: -144px -144px; }\
	.ui-icon-pin-w { background-position: -128px -144px; }\
	.ui-icon-play { background-position: 0 -160px; }\
	.ui-icon-plus { background-position: -16px -128px; }\
	.ui-icon-plusthick { background-position: -32px -128px; }\
	.ui-icon-power { background-position: 0 -176px; }\
	.ui-icon-print { background-position: -160px -96px; }\
	.ui-icon-radio-off { background-position: -96px -144px; }\
	.ui-icon-radio-on { background-position: -112px -144px; }\
	.ui-icon-refresh { background-position: -64px -80px; }\
	.ui-icon-scissors { background-position: -144px -128px; }\
	.ui-icon-script { background-position: -240px -128px; }\
	.ui-icon-search { background-position: -160px -112px; }\
	.ui-icon-seek-end { background-position: -64px -160px; }\
	.ui-icon-seek-first { background-position: -80px -160px; }\
	.ui-icon-seek-next { background-position: -32px -160px; }\
	.ui-icon-seek-prev { background-position: -48px -160px; }\
	.ui-icon-seek-start { background-position: -80px -160px; }\
	.ui-icon-shuffle { background-position: -80px -80px; }\
	.ui-icon-signal { background-position: -32px -176px; }\
	.ui-icon-signal-diag { background-position: -16px -176px; }\
	.ui-icon-squaresmall-close { background-position: -80px -208px; }\
	.ui-icon-squaresmall-minus { background-position: -64px -208px; }\
	.ui-icon-squaresmall-plus { background-position: -48px -208px; }\
	.ui-icon-star { background-position: -224px -112px; }\
	.ui-icon-stop { background-position: -96px -160px; }\
	.ui-icon-suitcase { background-position: -112px -96px; }\
	.ui-icon-tag { background-position: -240px -96px; }\
	.ui-icon-transfer-e-w { background-position: -96px -80px; }\
	.ui-icon-transferthick-e-w { background-position: -112px -80px; }\
	.ui-icon-trash { background-position: -176px -96px; }\
	.ui-icon-triangle-1-e { background-position: -32px -16px; }\
	.ui-icon-triangle-1-n { background-position: 0 -16px; }\
	.ui-icon-triangle-1-ne { background-position: -16px -16px; }\
	.ui-icon-triangle-1-nw { background-position: -112px -16px; }\
	.ui-icon-triangle-1-s { background-position: -64px -16px; }\
	.ui-icon-triangle-1-se { background-position: -48px -16px; }\
	.ui-icon-triangle-1-sw { background-position: -80px -16px; }\
	.ui-icon-triangle-1-w { background-position: -96px -16px; }\
	.ui-icon-triangle-2-e-w { background-position: -144px -16px; }\
	.ui-icon-triangle-2-n-s { background-position: -128px -16px; }\
	.ui-icon-unlocked { background-position: -208px -96px; }\
	.ui-icon-video { background-position: -224px -128px; }\
	.ui-icon-volume-off { background-position: -128px -160px; }\
	.ui-icon-volume-on { background-position: -144px -160px; }\
	.ui-icon-wrench { background-position: -176px -112px; }\
	.ui-icon-zoomin { background-position: -128px -112px; }\
	.ui-icon-zoomout { background-position: -144px -112px; }\
	/* Corner radius */\
	.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {\
		-moz-border-radius-topleft: 4px;\
		-webkit-border-top-left-radius: 4px;\
		-khtml-border-top-left-radius: 4px;\
		border-top-left-radius: 4px;\
	}\
	.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {\
		-moz-border-radius-topright: 4px;\
		-webkit-border-top-right-radius: 4px;\
		-khtml-border-top-right-radius: 4px;\
		border-top-right-radius: 4px;\
	}\
	.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {\
		-moz-border-radius-bottomleft: 4px;\
		-webkit-border-bottom-left-radius: 4px;\
		-khtml-border-bottom-left-radius: 4px;\
		border-bottom-left-radius: 4px;\
	}\
	.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {\
		-moz-border-radius-bottomright: 4px;\
		-webkit-border-bottom-right-radius: 4px;\
		-khtml-border-bottom-right-radius: 4px;\
		border-bottom-right-radius: 4px;\
	}\
	/* Overlays */\
	.ui-widget-overlay\
	{\
		opacity: .50;\
		filter:Alpha(Opacity=50);\
	}\
	.ui-widget-shadow\
	{\
		margin: -5px 0 0 -5px;\
		padding: 5px;\
		opacity: .20;\
		filter:Alpha(Opacity=20);\
		-moz-border-radius: 5px;\
		-khtml-border-radius: 5px;\
		-webkit-border-radius: 5px;\
		border-radius: 5px;\
	}\
	/* jQuery UI Resizable 1.8.16 */\
	.ui-resizable\
	{\
		position: relative;\
	}\
	.ui-resizable-handle\
	{\
		position: absolute;\
		font-size: 0.1px;\
		z-index: 99999;\
		display: block;\
	}\
	.ui-resizable-disabled .ui-resizable-handle,\
	.ui-resizable-autohide .ui-resizable-handle\
	{\
		display: none;\
	}\
	.ui-resizable-n\
	{\
		cursor: n-resize;\
		height: 7px;\
		width: 100%;\
		top: -5px;\
		left: 0;\
	}\
	.ui-resizable-s\
	{\
		cursor: s-resize;\
		height: 7px;\
		width: 100%;\
		bottom: -5px;\
		left: 0;\
	}\
	.ui-resizable-e\
	{\
		cursor: e-resize;\
		width: 7px;\
		right: -5px;\
		top: 0;\
		height: 100%;\
	}\
	.ui-resizable-w\
	{\
		cursor: w-resize;\
		width: 7px;\
		left: -5px;\
		top: 0;\
		height: 100%;\
	}\
	.ui-resizable-se\
	{\
		cursor: se-resize;\
		width: 12px;\
		height: 12px;\
		right: 1px;\
		bottom: 1px;\
	}\
	.ui-resizable-sw\
	{\
		cursor: sw-resize;\
		width: 9px;\
		height: 9px;\
		left: -5px;\
		bottom: -5px;\
	}\
	.ui-resizable-nw\
	{\
		cursor: nw-resize;\
		width: 9px;\
		height: 9px;\
		left: -5px;\
		top: -5px;\
	}\
	.ui-resizable-ne\
	{\
		cursor: ne-resize;\
		width: 9px;\
		height: 9px;\
		right: -5px;\
		top: -5px;\
	}\
	/* jQuery UI Selectable 1.8.16 */\
	.ui-selectable-helper\
	{\
		position: absolute;\
		z-index: 100;\
		border:1px dotted #000;\
	}\
	/* jQuery UI Accordion 1.8.16 */\
	.ui-accordion\
	{\
		width: 100%;\
	}\
	.ui-accordion .ui-accordion-header\
	{\
		cursor: pointer;\
		position: relative;\
		margin-top: 1px;\
		zoom: 1;\
	}\
	.ui-accordion .ui-accordion-li-fix {\
		display: inline;\
	}\
	.ui-accordion .ui-accordion-header-active\
	{\
		border-bottom: 0 !important;\
	}\
	.ui-accordion .ui-accordion-header a\
	{\
		display: block;\
		width:100%;\
		font-size: 0.9em;\
		padding: .2em .3em .2em .3em;\
	}\
	.ui-accordion-icons .ui-accordion-header a\
	{\
		padding-left: 2em;\
	}\
	.ui-accordion .ui-accordion-header .ui-icon\
	{\
		position: absolute;\
		left: .5em;\
		top: 50%;\
		margin-top: -8px;\
	}\
	.ui-accordion .ui-accordion-content\
	{\
		padding: .5em .5em;\
		border-top: 0;\
		margin-top: -2px;\
		position: relative;\
		top: 1px;\
		margin-bottom: 2px;\
		overflow: auto;\
		display: none;\
		zoom: 1;\
	}\
	.ui-accordion .ui-accordion-content-active\
	{\
		display: block;\
	}\
	/* jQuery UI Autocomplete 1.8.16 */\
	.ui-autocomplete\
	{\
		position: absolute;\
		cursor: default;\
	}\
	/* jQuery UI Menu 1.8.16 */\
	.ui-menu\
	{\
		list-style:none;\
		padding: 2px;\
		margin: 0;\
		display:block;\
		float: left;\
	}\
	.ui-menu .ui-menu\
	{\
		margin-top: -3px;\
	}\
	.ui-menu .ui-menu-item\
	{\
		margin:0;\
		padding: 0;\
		zoom: 1;\
		float: left;\
		clear: left;\
		width: 100%;\
	}\
	.ui-menu .ui-menu-item a\
	{\
		text-decoration:none;\
		display:block;\
		padding:.2em .4em;\
		line-height:1.2em;\
		zoom:1;\
	}\
	.ui-menu .ui-menu-item a.ui-state-hover,\
	.ui-menu .ui-menu-item a.ui-state-active\
	{\
		font-weight: normal;\
		margin: -1px;\
	}\
	/* jQuery UI Button 1.8.16 */\
	.ui-button\
	{\
		display: inline-block;\
		position: relative;\
		padding: 0;\
		margin-right: .1em;\
		text-decoration: none !important;\
		cursor: pointer;\
		text-align: center;\
		zoom: 1;\
		overflow: visible;\
	}\
	/* the overflow property removes extra width in IE */\
	.ui-button-icon-only\
	{\
		width: 2.2em;\
	}\
	/* to make room for the icon, a width needs to be set here */\
	button.ui-button-icon-only\
	{\
		width: 2.4em;\
	}\
	/* button elements seem to need a little more width */\
	.ui-button-icons-only\
	{\
		width: 3.4em;\
	}\
	button.ui-button-icons-only\
	{\
		width: 3.7em;\
	}\
	/*button text element */\
	.ui-button .ui-button-text\
	{\
		display: block;\
		line-height: 1.2em;\
	}\
	.ui-button-text-only .ui-button-text\
	{\
		padding: .4em 1em;\
	}\
	.ui-button-icon-only .ui-button-text,\
	.ui-button-icons-only .ui-button-text\
	{\
		padding: .4em;\
		text-indent: -9999999px;\
	}\
	.ui-button-text-icon-primary .ui-button-text,\
	.ui-button-text-icons .ui-button-text\
	{\
		padding: .4em 1em .4em 2.1em;\
	}\
	.ui-button-text-icon-secondary .ui-button-text,\
	.ui-button-text-icons .ui-button-text\
	{\
		padding: .4em 2.1em .4em 1em;\
	}\
	.ui-button-text-icons .ui-button-text\
	{\
		padding-left: 2.1em;\
		padding-right: 2.1em;\
	}\
	/* no icon support for input elements, provide padding by default */\
	input.ui-button\
	{\
		padding: .4em 1em;\
	}\
	/*button icon element(s) */\
	.ui-button-icon-only .ui-icon,\
	.ui-button-text-icon-primary .ui-icon,\
	.ui-button-text-icon-secondary .ui-icon,\
	.ui-button-text-icons .ui-icon,\
	.ui-button-icons-only .ui-icon\
	{\
		position: absolute;\
		top: 50%;\
		margin-top: -8px;\
	}\
	.ui-button-icon-only .ui-icon {\
		left: 50%;\
		margin-left: -8px;\
	}\
	.ui-button-text-icon-primary .ui-button-icon-primary,\
	.ui-button-text-icons .ui-button-icon-primary,\
	.ui-button-icons-only .ui-button-icon-primary\
	{\
		left: .5em;\
	}\
	.ui-button-text-icon-secondary .ui-button-icon-secondary,\
	.ui-button-text-icons .ui-button-icon-secondary,\
	.ui-button-icons-only .ui-button-icon-secondary\
	{\
		right: .5em;\
	}\
	.ui-button-text-icons .ui-button-icon-secondary,\
	.ui-button-icons-only .ui-button-icon-secondary\
	{\
		right: .5em;\
	}\
	/*button sets*/\
	.ui-buttonset\
	{\
		margin-right: 7px;\
	}\
	.ui-buttonset .ui-button\
	{\
		margin-left: 0;\
		margin-right: -.3em;\
	}\
	/* workarounds */\
	/* reset extra padding in Firefox */\
	button.ui-button::-moz-focus-inner\
	{\
		border: 0;\
		padding: 0;\
	}\
	/* jQuery UI Dialog 1.8.16  */\
	.ui-dialog {\
		position	: absolute;\
		padding		: .2em;\
		width		: 300px;\
		overflow	: hidden;\
		-webkit-box-shadow	: rgba(0,0,0,0.8) 0 0 10px;\
		-moz-box-shadow		: rgba(0,0,0,0.8) 0 0 10px;\
		-khtml-box-shadow	: rgba(0,0,0,0.8) 0 0 10px;\
		box-shadow			: rgba(0,0,0,0.8) 0 0 10px;\
	}\
	.ui-dialog .ui-dialog-titlebar {\
		padding		: .4em 1em;\
		position	: relative;\
	}\
	.ui-dialog .ui-dialog-title {\
		float				: left;\
		margin				: .1em 16px .1em 0;\
		font-weight			: bold;\
		text-shadow			: 0.1em 0.1em rgba(0,0,0,0.6);\
		-moz-text-shadow	: 0.1em 0.1em rgba(0,0,0,0.6);\
		-webkit-text-shadow	: 0.1em 0.1em rgba(0,0,0,0.6);\
		-khtml-text-shadow	: 0.1em 0.1em rgba(0,0,0,0.6);\
	} \
	.ui-dialog .ui-dialog-titlebar-close {\
		position	: absolute;\
		right		: .3em;\
		top			: 50%;\
		width		: 17px;\
		margin		: -10px 0 0 0; \
		padding		: 1px;\
		height		: 16px;\
	}\
	.ui-dialog .ui-dialog-titlebar-close span {\
		display		: block;\
	}\
	.ui-dialog .ui-dialog-content {\
		position	: relative;\
		border		: 0;\
		padding		: .5em 1em;\
		background	: none;\
		overflow	: auto;\
		zoom		: 1;\
	}\
	.ui-dialog .ui-dialog-buttonpane {\
		text-align	: left;\
		border-width: 1px 0 0 0;\
		margin		: .5em 0 0 0;\
		padding		: .3em 1em .5em .4em;\
		background-image: none;\
	}\
	.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset\
	{\
		float		: right;\
	}\
	.ui-dialog .ui-dialog-buttonpane button {\
		margin		: .5em .4em .5em 0;\
		cursor		: pointer;\
	}\
	.ui-dialog .ui-resizable-se {\
		width		: 14px;\
		height		: 14px;\
		right		: 3px;\
		bottom		: 3px;\
	}\
	.ui-draggable .ui-dialog-titlebar\
	{\
		cursor		: move;\
	}\
	/* jQuery UI Slider 1.8.16 */\
	.ui-slider\
	{\
		position: relative;\
		text-align: left;\
	}\
	.ui-slider .ui-slider-handle\
	{\
		position: absolute;\
		z-index: 2;\
		width: 1.2em;\
		height: 1.2em;\
		cursor: default;\
	}\
	.ui-slider .ui-slider-range\
	{\
		position: absolute;\
		z-index: 1;\
		font-size: .7em;\
		display: block;\
		border: 0;\
		background-position: 0 0;\
	}\
	.ui-slider-horizontal\
	{\
		height: .8em;\
	}\
	.ui-slider-horizontal .ui-slider-handle\
	{\
		top: -.3em;\
		margin-left: -.6em;\
	}\
	.ui-slider-horizontal .ui-slider-range\
	{\
		top: 0;\
		height: 100%;\
	}\
	.ui-slider-horizontal .ui-slider-range-min\
	{\
		left: 0;\
	}\
	.ui-slider-horizontal .ui-slider-range-max\
	{\
		right: 0;\
	}\
	.ui-slider-vertical\
	{\
		width: .8em;\
		height: 100px;\
	}\
	.ui-slider-vertical .ui-slider-handle\
	{\
		left: -.3em;\
		margin-left: 0;\
		margin-bottom: -.6em;\
	}\
	.ui-slider-vertical .ui-slider-range\
	{\
		left: 0;\
		width: 100%;\
	}\
	.ui-slider-vertical .ui-slider-range-min\
	{\
		bottom: 0;\
	}\
	.ui-slider-vertical .ui-slider-range-max\
	{\
		top: 0;\
	}\
	/* jQuery UI Tabs 1.8.16 */\
	.ui-tabs\
	{\
		position: relative;\
		padding: .2em;\
		zoom: 1;\
	}\
	.ui-tabs .ui-tabs-nav\
	{\
		margin: 0;\
		padding: .2em .2em 0;\
	}\
	.ui-tabs .ui-tabs-nav li\
	{\
		list-style: none;\
		float: left;\
		position: relative;\
		top: 1px;\
		margin: 0 .2em 1px 0;\
		border-bottom: 0 !important;\
		padding: 0;\
		white-space: nowrap;\
	}\
	.ui-tabs .ui-tabs-nav li a\
	{\
		float: left;\
		padding: .5em 1em;\
		text-decoration: none;\
	}\
	.ui-tabs .ui-tabs-nav li.ui-tabs-selected\
	{\
		margin-bottom: 0;\
		padding-bottom: 1px;\
	}\
	.ui-tabs .ui-tabs-nav li.ui-tabs-selected a,\
	.ui-tabs .ui-tabs-nav li.ui-state-disabled a,\
	.ui-tabs .ui-tabs-nav li.ui-state-processing a\
	{\
		cursor: text;\
	}\
	.ui-tabs .ui-tabs-nav li a,\
	.ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a\
	{\
		cursor: pointer;\
	}\
	/* first selector in group seems obsolete, but required to overcome bug in Opera\
	   applying cursor: text overall if defined elsewhere... */\
	.ui-tabs .ui-tabs-panel\
	{\
		display: block;\
		border-width: 0;\
		padding: 1em 1.4em;\
		background: none;\
	}\
	.ui-tabs .ui-tabs-hide\
	{\
		display: none !important;\
	}\
	/* jQuery UI Progressbar 1.8.16 */\
	.ui-progressbar\
	{\
		height:2em;\
		text-align: left;\
	}\
	.ui-progressbar .ui-progressbar-value\
	{\
		margin: -1px;\
		height:100%;\
	}\
	/* 3D Fx */\
	.ui-widget-content\
	{\
		background-image : linear-gradient(bottom, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -moz-linear-gradient(bottom, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -webkit-linear-gradient(bottom, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -khtml-linear-gradient(bottom, rgba(255,255,255,0.1) 1%,  rgba(255,255,255,0.8) 99%);\
	}\
	.ui-progressbar\
	{\
		background-image : linear-gradient(top, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -moz-linear-gradient(top, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -webkit-linear-gradient(top, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -khtml-linear-gradient(top, rgba(255,255,255,0.1) 1%,  rgba(255,255,255,0.8) 99%);\
		-webkit-box-shadow:0 0 1px rgba(0,0,0,0.7);\
		-moz-box-shadow: 0 0 1px rgba(0,0,0,0.7);\
		box-shadow:0 0 1px rgba(0,0,0,0.7);\
	}\
	.ui-widget-header,\
	.ui-widget-header .ui-state-focus,\
	.ui-widget-header .ui-state-active,\
	.ui-widget-header .ui-state-highlight,\
	.ui-state-hover,\
	.ui-widget-content .ui-state-hover,\
	.ui-widget-header .ui-state-hover\
	{\
		-webkit-box-shadow:0 0 15px rgba(255,255,255,0.8) inset, 1px 1px 1px rgba(255,255,255,0.8) inset, -1px -1px 1px rgba(255,255,255,0.8) inset;\
		-moz-box-shadow: 0 0 15px rgba(255,255,255,0.8) inset, 1px 1px 1px rgba(255,255,255,0.8) inset, -1px -1px 1px rgba(255,255,255,0.8) inset;\
		box-shadow:0 0 15px rgba(255,255,255,0.8) inset, 1px 1px 1px rgba(255,255,255,0.8) inset, -1px -1px 1px rgba(255,255,255,0.8) inset;\
	}\
	#jquery-msg-bg {\
	  -moz-opacity: 0.6;\
	  -khtml-opacity: 0.6;\
	  opacity: 0.6;\
	  filter: alpha(opacity=60);\
	  background: #000;\
	}\
	.jquery-msg-content {\
	  -webkit-background-clip: padding-box;\
	  padding: 15px;\
	  font-size: 11pt;\
	}\
	.black-on-white .jquery-msg-content {\
	  background: #FFE;\
	  color: #333333;\
	  -moz-opacity: 0.9;\
	  -khtml-opacity: 0.9;\
	  opacity: 0.9;\
	  filter: alpha(opacity=90);\
	  -webkit-box-shadow: 5px 5px 30px 0 #000;\
	  -moz-box-shadow: 5px 5px 30px 0 #000;\
	  box-shadow: 5px 5px 30px 0 #000;\
	  -webkit-border-radius: 8px;\
	  -moz-border-radius: 8px;\
	  -o-border-radius: 8px;\
	  -khtml-border-radius: 8px;\
	  -ms-border-radius: 8px;\
	  border-radius: 8px;\
	}\
	.white-on-black .jquery-msg-content {\
	  -moz-opacity: 0.5;\
	  -khtml-opacity: 0.5;\
	  opacity: 0.5;\
	  filter: alpha(opacity=50);\
	  background: #000;\
	  color: #FFE;\
	  -webkit-border-radius: 8px;\
	  -moz-border-radius: 8px;\
	  -o-border-radius: 8px;\
	  -khtml-border-radius: 8px;\
	  -ms-border-radius: 8px;\
	  border-radius: 8px;\
	}\
	').appendTo( 'head' );

	
/** Add CSS Styles 
******************************/

$J("<style>").append('\
	.' + UID['doa-icons'] + ' {\
		display:inline-block;\
		width: 26px;\
		height: 15px;\
		margin:0;\
		padding:0;\
		background-position: 26px 26px;\
		background-image: url(http://wackoscripts.com/icons.png)\
	}\
	/****  Resources  ****/\
	.i-population {\
		background-position:    0px   0px;\
	}\
	.i-life {\
		background-position:  -26px   0px;\
	}\
	.i-tax {\
		background-position:  -52px   0px;\
	}\
	.i-rubie {\
		background-position:  -78px   0px;\
	}\
	.i-gold {\
		background-position: -104px   0px;\
	}\
	.i-food {\
		background-position: -130px   0px;\
	}\
	.i-wood {\
		background-position: -156px   0px;\
	}\
	.i-ore {\
		background-position: -182px   0px;\
	}\
	.i-stone {\
		background-position: -208px   0px;\
	}\
	.i-blue_energy {\
		background-position: -235px   0px;\
	}\
	.i-AnthropusTalisman {\
		background-position: -260px   0px;\
	}\
	.i-resurrect {\
		background-position: -287px   0px;\
	}\
	/****  Tabs  ****/\
	.i-Info {\
		background-position: -573px -119px;\
	}\
	.i-Tasks, .i-Jobs {\
		background-position: -573px -136px;\
	}\
	.i-Building {\
		background-position: -573px -153px;\
	}\
	.i-Research {\
		background-position: -573px -170px;\
	}\
	.i-Training {\
		background-position: -573px -187px;\
	}\
	.i-Waves, .i-Wave {\
		background-position: -573px -204px;\
	}\
	.i-Attacks {\
		background-position: -573px -221px;\
	}\
	.i-Spying {\
		background-position: -573px -238px;\
	}\
	.i-Reinforcement {\
		background-position: -573px -255px;\
	}\
	.i-Alliance {\
		background-position: -573px -273px;\
	}\
	.i-Sentinel {\
		background-position: -573px -289px;\
	}\
	.i-Map {\
		background-position: -573px -306px;\
	}\
	.i-Logs {\
		background-position: -573px -323px;\
	}\
	.i-Summary {\
		background-position: -573px -340px;\
	}\
	.i-Options {\
		background-position: -573px -466px;\
	}\
	/****  Status  ****/\
	.i-done {\
		background-position: -547px -119px;\
	}\
	.i-cancel {\
		background-position: -547px -136px;\
	}\
	.i-marching {\
		background-position: -547px -153px;\
	}\
	.i-retreating {\
		background-position: -547px -170px;\
	}\
	.i-encamped {\
		background-position: -547px -187px;\
	}\
	/********** Items SpeedUps  *********/\
	.i-Blink {\
		background-position:    0px -17px;\
	}\
	.i-Hop {\
		background-position:  -26px -17px;\
	}\
	.i-Skip {\
		background-position:  -52px -17px;\
	}\
	.i-Leap {\
		background-position:  -78px -17px;\
	}\
	.i-Bounce {\
		background-position: -104px -17px;\
	}\
	.i-Bore {\
		background-position: -130px -17px;\
	}\
	.i-Bolt {\
		background-position: -156px -17px;\
	}\
	.i-Blast {\
		background-position: -182px -17px;\
	}\
	.i-ForcedMarchDrops {\
		background-position: -209px -34px;\
	}\
	.i-TranceMarchDrops {\
		background-position: -235px -34px;\
	}\
	.i-TestroniusPowder {\
		background-position: -261px -34px;\
	}\
	.i-DoubleTaxDayDeclaration {\
		background-position:  -78px -51px;\
	}\
	.i-DoubleTaxWeekDeclaration {\
		background-position: -104px -51px;\
	}\
	/********** Items Production  *********/\
	.i-AtlagenHarvestNanosDay {\
		background-position:    0px -35px;\
	}\
	.i-AtlagenHarvestNanosWeek {\
		background-position:  -26px -35px;\
	}\
	.i-DryadForestNanosDay {\
		background-position:  -52px -35px;\
	}\
	.i-DryadForestNanosWeek {\
		background-position:  -78px -35px;\
	}\
	.i-OreadStoneNanosDay {\
		background-position: -104px -35px;\
	}\
	.i-OreadStoneNanosWeek {\
		background-position: -130px -35px;\
	}\
	.i-EpeoradMetalsNanosDay {\
		background-position: -156px -35px;\
	}\
	.i-EpeoradMetalsNanosWeek {\
		background-position: -182px -35px;\
	}\
	.i-NanoCollectorDay {\
		background-position: -209px -35px;\
	}\
	.i-NanoCollectorWeek {\
		background-position: -235px -35px;\
	}\
	.i-NanoCanisters {\
		background-position: -261px -35px;\
	}\
	.i-NanoCrates {\
		background-position: -287px -35px;\
	}\
	/***********  Items Chest  **********/\
	.i-HarvestCornu,\
	.i-HarvestCornuCopia {\
		background-position:    0px -52px;\
	}\
	.i-CompletionGrantPortfolio {\
		background-position:  -26px -52px;\
	}\
	.i-TimeTrickstersBag {\
		background-position:  -52px -52px;\
	}\
	.i-ChestOfCompassion {\
		background-position:    0px -69px;\
	}\
	.i-ExpansionChest {\
		background-position:  -26px -69px;\
	}\
	.i-ChestOfardor {\
		background-position:  -52px -69px;\
	}\
	.i-HoldandWarpChest {\
		background-position:  -78px -69px;\
	}\
	.i-YuletideChest {\
		background-position: -104px -69px;\
	}\
	.i-RESERVED_SLOT_GreatDragonEggChest {\
		background-position:    0px -86px;\
	}\
	.i-GreatDragonChest {\
		background-position:  -26px -86px;\
	}\
	.i-RESERVED_SLOT_WaterDragonEggChest {\
		background-position:  -52px -86px;\
	}\
	.i-WaterDragonChest {\
		background-position:  -78px -86px;\
	}\
	.i-RESERVED_SLOT_WaterDragonArk {\
		background-position: -104px -86px;\
	}\
	.i-StoneEggChest {\
		background-position: -130px -86px;\
	}\
	.i-StoneDragonChest {\
		background-position: -156px -86px;\
	}\
	.i-StoneDragonArk,\
	.i-StoneArk {\
		background-position: -182px -86px;\
	}\
	.i-FireDragonEggChest {\
		background-position: -209px -86px;\
	}\
	.i-FireDragonChest {\
		background-position: -235px -86px;\
	}\
	.i-FireDragonArk {\
		background-position: -261px -86px;\
	}\
	.i-WindDragonEggChest {\
		background-position: -287px -86px;\
	}\
	.i-WindDragonChest {\
		background-position: -313px -86px;\
	}\
	.i-WindDragonArk {\
		background-position: -339px -86px;\
	}\
	.i-SpectralEggChest {\
		background-position: -365px -86px;\
	}\
	.i-SpectralChest {\
		background-position: -391px -86px;\
	}\
	.i-SpectralArk {\
		background-position: -417px -86px;\
	}\
	/************ Items Armor  ***********/\
	.i-GreatDragonHelmet {\
		background-position:    0px -137px;\
	}\
	.i-GreatDragonClawGuards {\
		background-position:  -26px -137px;\
	}\
	.i-GreatDragonBodyArmor {\
		background-position:  -52px -137px;\
	}\
	.i-GreatDragonTailGuard {\
		background-position:  -78px -137px;\
	}\
	.i-WaterDragonHelmet {\
		background-position:    0px -154px;\
	}\
	.i-WaterDragonClawGuards {\
		background-position:  -26px -154px;\
	}\
	.i-WaterDragonBodyArmor {\
		background-position:  -52px -154px;\
	}\
	.i-WaterDragonTailGuard {\
		background-position:  -78px -154px;\
	}\
	.i-StoneDragonHelmet {\
		background-position:    0px -171px;\
	}\
	.i-StoneDragonClawGuards {\
		background-position:  -26px -171px;\
	}\
	.i-StoneDragonBodyArmor {\
		background-position:  -52px -171px;\
	}\
	.i-StoneDragonTailGuard {\
		background-position:  -78px -171px;\
	}\
	.i-FireDragonHelmet {\
		background-position:    0px -188px;\
	}\
	.i-FireDragonClawGuards {\
		background-position:  -26px -188px;\
	}\
	.i-FireDragonBodyArmor {\
		background-position:  -52px -188px;\
	}\
	.i-FireDragonTailGuard {\
		background-position:  -78px -188px;\
	}\
	.i-ForestDragonHelmet {\
		background-position:    0px -272px;\
	}\
	.i-ForestDragonClawGuards {\
		background-position:  -26px -272px;\
	}\
	.i-ForestDragonBodyArmor {\
		background-position:  -52px -272px;\
	}\
	.i-ForestDragonTailGuard {\
		background-position:  -78px -272px;\
	}\
	.i-WindDragonHelmet {\
		background-position:    0px -205px;\
	}\
	.i-WindDragonClawGuards {\
		background-position:  -26px -205px;\
	}\
	.i-WindDragonBodyArmor {\
		background-position:  -52px -205px;\
	}\
	.i-WindDragonTailGuard {\
		background-position:  -78px -205px;\
	}\
	.i-SpectralDragonHelmet {\
		background-position:    0px -222px;\
	}\
	.i-SpectralDragonClawGuards {\
		background-position:  -26px -222px;\
	}\
	.i-SpectralDragonBodyArmor {\
		background-position:  -52px -222px;\
	}\
	.i-SpectralDragonTailGuard {\
		background-position:  -78px -222px;\
	}\
	.i-SwampDragonHelmet {\
		background-position:    0px -254px;\
	}\
	.i-SwampDragonClawGuards {\
		background-position:  -26px -254px;\
	}\
	.i-SswampDragonBodyArmor {\
		background-position:  -52px -254px;\
	}\
	.i-SwampDragonTailGuard {\
		background-position:  -78px -254px;\
	}\
	/***********  Items Arsenal  **********/\
	.i-Fangtooth {\
		background-position:    0px -424px;\
	}\
	.i-Glowing {\
		background-position:  -26px -424px;\
	}\
	.i-Volcanic {\
		background-position:  -52px -424px;\
	}\
	.i-Glacial {\
		background-position:  -176px -424px;\
	}\
	.i-Banshee {\
		background-position:  -78px -424px;\
	}\
	.i-Reaper {\
		background-position: -130px -424px;\
	}\
	.i-Swamp {\
		background-position: -155px -424px;\
	}\
	.i-Titan {\
		background-position: -201px -424px;\
	}\
	.i-Anthropus {\
		background-position: -260px    0px;\
	}\
	.i-AquaTroopRespirator {\
		background-position:    0px -424px;\
	}\
	.i-StoneTroopItem {\
		background-position:  -26px -424px;\
	}\
	.i-FireTroopItem {\
		background-position:  -52px -424px;\
	}\
	.i-FrostGiantItem {\
		background-position:  -176px -424px;\
	}\
	.i-WindTroopItem {\
		background-position:  -78px -424px;\
	}\
	.i-IceTroopItem {\
		background-position: -130px -424px;\
	}\
	.i-SwampTroopItem {\
		background-position: -155px -424px;\
	}\
	.i-ForestTroopItem {\
		background-position: -201px -424px;\
	}\
	.i-AnthropusTalisman {\
		background-position: -260px    0px;\
	}\
	.i-CurseLocusts {\
		background-position:    0px -290px;\
	}\
	.i-CurseWorms {\
		background-position:  -26px -290px;\
	}\
	.i-CurseFrogs {\
		background-position:  -52px -290px;\
	}\
	.i-CurseBats {\
		background-position:  -78px -290px;\
	}\
	.i-WaterDragonEgg {\
		background-position:  -0px -103px;\
	}\
	.i-StoneDragonEgg {\
		background-position:  -26px -103px;\
	}\
	.i-FireDragonEgg {\
		background-position:  -52px -103px;\
	}\
	.i-ForestDragonEgg {\
		background-position:  -153px -103px;\
	}\
	.i-WindDragonEgg {\
		background-position: -78px -103px;\
	}\
	.i-IceDragonEgg {\
		background-position: -104px -103px;\
	}\
	.i-SwampDragonEgg {\
		background-position: -131px -103px;\
	}\
	/***********  Items General  **********/\
	.i-gens {\
		background-position:    -314px -0px;\
	}\
	.i-armys {\
		background-position:    -573px -186px;\
	}\
	.i-MomentaryTruce {\
		background-position:    0px -306px;\
	}\
	.i-ArmisticeAgreement {\
		background-position:  -26px -306px;\
	}\
	.i-CeaseFireTreaty {\
		background-position:  -52px -306px;\
	}\
	.i-CompletionGrant {\
		background-position:  -78px -306px;\
	}\
	.i-AncestralSeal {\
		background-position: -104px -306px;\
	}\
	.i-DarkWarpDevice {\
		background-position:    0px -324px;\
	}\
	.i-ChartedWarpDevice {\
		background-position:  -26px -324px;\
	}\
	.i-OutpostWarp {\
		background-position:  -52px -324px;\
	}\
	.i-GlowingShields {\
		background-position:    0px -341px;\
	}\
	.i-DragonHearts {\
		background-position:  -26px -341px;\
	}\
	.i-PurpleBones {\
		background-position:  -52px -341px;\
	}\
	.i-CrimsonBull {\
		background-position:  -78px -341px;\
	}\
	.i-Divinerations {\
		background-position:  -26px -341px;\
	}\
	.i-DivineLight {\
		background-position:  -52px -341px;\
	}\
	.i-NomadicRecruits {\
		background-position:  -78px -341px;\
	}\
	.i-MassNullifier {\
		background-position:    0px -358px;\
	}\
	.i-PseudonymGrant {\
		background-position:  -26px -358px;\
	}\
	.i-RenameProclamation {\
		background-position:  -52px -358px;\
	}\
	.i-RacechangeItem {\
		background-position:  -78px -358px;\
	}\
	.i-FortunasTicket {\
		background-position:    0px -375px;\
	}\
	.i-FortunasGoldenTicket {\
		background-position:  -26px -375px;\
	}\
	.i-FortunasAccelerator {\
		background-position:  -52px -375px;\
	}\
	.i-FortunasGift {\
		background-position:  -78px -375px;\
	}\
	.i-FortunasCauldron {\
		background-position:  -26px -375px;\
	}\
	/****    Units    ****/\
	.i-GreatDragon {\
		background-position:    0px -446px;\
	}\
	.i-WaterDragon {\
		background-position:  -26px -446px;\
	}\
	.i-StoneDragon {\
		background-position:  -52px -446px;\
	}\
	.i-FireDragon {\
		background-position:  -78px -446px;\
	}\
	.i-WindDragon {\
		background-position: -104px -446px;\
	}\
	.i-IceDragon {\
		background-position: -130px -446px;\
	}\
	.i-SwampDragon {\
		background-position: -162px -446px;\
	}\
	.i-ForestDragon {\
		background-position: -190px -446px;\
	}\
	.i-DesertDragon {\
		background-position: -266px -446px;\
	}\
	.i-SpectralDragon {\
		background-position: -234px -446px;\
	}\
	.i-Porter {\
		background-position:    0px -466px;\
	}\
	.i-Conscript {\
		background-position:  -26px -466px;\
	}\
	.i-Spy {\
		background-position:  -52px -466px;\
	}\
	.i-Halberdsman {\
		background-position:  -78px -466px;\
	}\
	.i-Minotaur {\
		background-position: -104px -466px;\
	}\
	.i-Longbowman {\
		background-position: -130px -466px;\
	}\
	.i-SwiftStrikeDragon {\
		background-position: -156px -466px;\
	}\
	.i-BattleDragon {\
		background-position: -182px -466px;\
	}\
	.i-ArmoredTransport {\
		background-position: -209px -466px;\
	}\
	.i-Giant {\
		background-position: -235px -466px;\
	}\
	.i-FireMirror {\
		background-position: -261px -466px;\
	}\
	.i-FrostGiant {\
		background-position: -465px -466px;\
	}\
	.i-PackDragon {\
		background-position: -287px -466px;\
	}\
	.i-AquaTroop {\
		background-position: -313px -466px;\
	}\
	.i-DesertTroop {\
		background-position: -512px -466px;\
	}\
	.i-StoneTroop {\
		background-position: -339px -466px;\
	}\
	.i-FireTroop {\
		background-position: -365px -466px;\
	}\
	.i-WindTroop {\
		background-position: -391px -466px;\
	}\
	.i-IceTroop {\
		background-position: -417px -466px;\
	}\
	.i-SwampTroop {\
		background-position: -445px -466px;\
	}\
	.i-ForestTroop {\
		background-position: -488px -466px;\
	}\
	/****    Maps    ****/\
	.i-AnthropusCamp {\
		background-position:  -365px -119px;\
	}\
	.i-Bog {\
		background-position:  -365px -136px;\
	}\
	.i-Forest {\
		background-position:  -365px -153px;\
	}\
	.i-Grassland {\
		background-position:  -365px -170px;\
	}\
	.i-Hill {\
		background-position:  -365px -187px;\
	}\
	.i-Lake {\
		background-position:  -365px -204px;\
	}\
	.i-Mountain {\
		background-position:  -365px -221px;\
	}\
	.i-Plain {\
		background-position:  -365px -238px;\
	}\
	.i-City {\
		background-position:  -365px -255px;\
	}\
	.i-Outpost {\
		background-position:  -365px -272px;\
	}\
	.i-Wildernesses {\
		background-position:  -365px -289px;\
	}\
	/****    Research    ****/\
	.i-Agriculture {\
		background-position:  -400px -119px;\
	}\
	.i-Woodcraft {\
		background-position:  -400px -136px;\
	}\
	.i-Masonry {\
		background-position:  -400px -153px;\
	}\
	.i-Mining {\
		background-position:  -400px -170px;\
	}\
	.i-Clairvoyance {\
		background-position:  -400px -187px;\
	}\
	.i-RapidDeployment {\
		background-position:  -400px -204px;\
	}\
	.i-Ballistics {\
		background-position:  -400px -221px;\
	}\
	.i-Metallurgy {\
		background-position:  -400px -238px;\
	}\
	.i-Medicine {\
		background-position:  -400px -255px;\
	}\
	.i-Dragonry {\
		background-position:  -400px -272px;\
	}\
	.i-Levitation {\
		background-position:  -400px -289px;\
	}\
	.i-Mercantilism {\
		background-position:  -400px -306px;\
	}\
	.i-AerialCombat {\
		background-position:  -400px -323px;\
	}\
	.i-EnergyCollection {\
		background-position:  -400px -340px;\
	}\
	.i-WarriorRevival {\
		background-position:  -400px -357px;\
	}\
	.i-GuardianRevival {\
		background-position:  -400px -374px;\
	}\
	/****    Buildings    ****/\
	.i-Mine-0 {\
		background-position:  -422px -119px;\
	}\
	.i-Farm-0 {\
		background-position:  -422px -136px;\
	}\
	.i-Lumbermill-0 {\
		background-position:  -422px -153px;\
	}\
	.i-Quarry-0 {\
		background-position:  -422px -170px;\
	}\
	.i-Home-0 {\
		background-position:  -422px -187px;\
	}\
	.i-Garrison-0 {\
		background-position:  -422px -204px;\
	}\
	.i-ScienceCenter-0 {\
		background-position:  -422px -221px;\
	}\
	.i-Metalsmith-0 {\
		background-position:  -422px -238px;\
	}\
	.i-OfficerQuarter-0 {\
		background-position:  -422px -255px;\
	}\
	.i-MusterPoint-0 {\
		background-position:  -422px -272px;\
	}\
	.i-Rookery-0 {\
		background-position:  -422px -289px;\
	}\
	.i-StorageVault-0 {\
		background-position:  -422px -306px;\
	}\
	.i-Theater-0 {\
		background-position:  -422px -323px;\
	}\
	.i-Sentinel-0 {\
		background-position:  -422px -340px;\
	}\
	.i-Factory-0 {\
		background-position:  -422px -357px;\
	}\
	.i-Fortress-0 {\
		background-position:  -422px -374px;\
	}\
	.i-DragonKeep-0 {\
		background-position:  -422px -391px;\
	}\
	.i-Wall-0 {\
		background-position:  -422px -408px;\
	}\
	.i-Mine-1, .i-Mine-2, .i-Mine-3, .i-Mine-4, .i-Mine-5, .i-Mine-6, .i-Mine-7, .i-Mine-8, .i-Mine-9 {\
		background-position:  -450px -119px;\
	}\
	.i-Farm-1, .i-Farm-2, .i-Farm-3, .i-Farm-4, .i-Farm-5, .i-Farm-6, .i-Farm-7, .i-Farm-8, .i-Farm-9 {\
		background-position:  -450px -136px;\
	}\
	.i-Lumbermill-1, .i-Lumbermill-2, .i-Lumbermill-3, .i-Lumbermill-4, .i-Lumbermill-5, .i-Lumbermill-6, .i-Lumbermill-7, .i-Lumbermill-8, .i-Lumbermill-9 {\
		background-position:  -450px -153px;\
	}\
	.i-Quarry-1, .i-Quarry-2, .i-Quarry-3, .i-Quarry-4, .i-Quarry-5, .i-Quarry-6, .i-Quarry-7, .i-Quarry-8, .i-Quarry-9 {\
		background-position:  -450px -170px;\
	}\
	.i-TrainingCamp-1, .i-TrainingCamp-2, .i-TrainingCamp-3, .i-TrainingCamp-4, .i-TrainingCamp-5, .i-TrainingCamp-6, .i-TrainingCamp-7, .i-TrainingCamp-8, .i-TrainingCamp-9 {\
		background-position:  -450px -187px;\
	}\
	.i-Home-1, .i-Home-2, .i-Home-3, .i-Home-4, .i-Home-5, .i-Home-6, .i-Home-7, .i-Home-8, .i-Home-9 {\
		background-position:  -450px -204px;\
	}\
	.i-Silo-1, .i-Silo-2, .i-Silo-3, .i-Silo-4, .i-Silo-5, .i-Silo-6, .i-Silo-7, .i-Silo-8, .i-Silo-9 {\
		background-position:  -450px -221px;\
	}\
	.i-MusterPoint-1, .i-MusterPoint-2, .i-MusterPoint-3, .i-MusterPoint-4, .i-MusterPoint-5, .i-MusterPoint-6, .i-MusterPoint-7, .i-MusterPoint-8, .i-MusterPoint-9 {\
		background-position:  -450px -238px;\
	}\
	.i-DragonKeep-1, .i-DragonKeep-2, .i-DragonKeep-3, .i-DragonKeep-4, .i-DragonKeep-5, .i-DragonKeep-6, .i-DragonKeep-7, .i-DragonKeep-8, .i-DragonKeep-9 {\
		background-position:  -450px -255px;\
	}\
	.i-Wall-1, .i-Wall-2, .i-Wall-3, .i-Wall-4, .i-Wall-5, .i-Wall-6, .i-Wall-7, .i-Wall-8, .i-Wall-9 {\
		background-position:  -450px -272px;\
	}\
	.i-EnergyCollector-10 {\
		background-position:  -475px -119px;\
	}\
	.i-Mausoleum-10 {\
		background-position:  -475px -136px;\
	}\
	.i-DarkPortal-10 {\
		background-position:  -475px -153px;\
	}\
	.i-SpectralDragonKeep-10 {\
		background-position:  -475px -170px;\
	}\
	/****************************************************************************/\
	.jewel {\
		padding				: 1px;\
		font-size			: 8pt !important;\
	}\
	.font8 {\
		font-size			: 8pt !important;\
	}\
	.font7 {\
		font-size			: 7pt !important;\
	}\
	.short {\
		height				:7px;\
	}\
	.wrap {\
		white-space			: normal !important;\
	}\
	.nowrap {\
		white-space			: nowrap !important;\
	}\
	.overflow {\
		overflow			: normal !important;\
	}\
	.overflow-y {\
		overflow-y			: normal !important;\
	}\
	.no-overflow {\
		overflow			: hidden !important;\
	}\
	.no-overflow-x {\
		overflow-x			: hidden !important;\
	}\
	.' + UID['hiding'] + ' {\
		padding-left		: 10px;\
		padding-right		: 10px;\
		margin-right		: -2px;\
		border-radius		: 2px;\
		-moz-border-radius	: 2px;\
		-webkit-box-shadow	: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow		: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.' + UID['defending'] + ' {\
		padding-left		: 10px;\
		padding-right		: 10px;\
		margin-right		: -2px;\
		border-radius		: 2px;\
		-moz-border-radius	: 2px;\
		-webkit-border-radius: 2px;\
		box-shadow			: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow		: rgba(0,0,0,0.52) 0 0 2px;\
		-webkit-box-shadow	: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.' + UID['scrollable'] + ' {\
		overflow			: auto !important;\
	}\
	.' + UID['main-box'] + ' .ui-dialog-content {\
		padding				: 2px !important;\
		overflow			: hidden !important;\
	}\
	.' + UID['main-box'] + ' h1 {\
		display				: inline-block;\
		font-size			: 12pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' h2 {\
		display				: inline-block;\
		font-size			: 11pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' h3 {\
		display				: inline-block;\
		font-size			: 10pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' h4 {\
		display				: inline-block;\
		font-size			: 9pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' h5 {\
		display				: inline-block;\
		font-size			: 8pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' h6 {\
		display				: inline-block;\
		font-size			: 7pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' .ui-accordion h1,\
	.' + UID['main-box'] + ' .ui-accordion h2,\
	.' + UID['main-box'] + ' .ui-accordion h3,\
	.' + UID['main-box'] + ' .ui-accordion h4,\
	.' + UID['main-box'] + ' .ui-accordion h5,\
	.' + UID['main-box'] + ' .ui-accordion h6\
	{\
		display				: block;\
	}\
	.' + UID['main-box'] + ' .ui-accordion *\
	{\
		font-size			: 9pt;\
	}\
	.' + UID['main-box'] + ' ul.tabs {\
		overflow			: hidden;\
		display				: block;\
		list-style			: none;\
		margin				: 0;\
		padding				: 0;\
		margin-top			: 4px;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab {\
		display				: inline-block;\
		float				: left;\
		cursor				: pointer !important;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a {\
		display				: inline-block;\
		position			: relative;\
		font-weight			: bold;\
		line-height			: 20px;\
		padding-left		: 2px;\
		padding-right		: 3px;\
		padding-top			: 1px;\
		padding-bottom		: 1px;\
		border-width		: 1px;\
		border-style		: solid;\
		border-bottom		: 0;\
		border-left			: 0;\
		text-decoration		: none;\
		cursor				: pointer;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a span.' + UID['main-box'] + ' {\
		margin-left			: -2px;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.first a {\
		border-left-width	: 1px !important;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.first a.selected,\
	.' + UID['main-box'] + ' ul.tabs li.tab a.selected {\
		border-left-width	: 1px !important;\
		border-left-style	: solid !important;\
		box-shadow			: rgba(255,255,255,0.9) 0px 0px 3px inset, rgba(0,0,0,0.9) 0px 0px 3px;\
		-moz-box-shadow		: rgba(255,255,255,0.9) 0px 0px 3px inset, rgba(0,0,0,0.9) 0px 0px 3px;\
		-webkit-box-shadow	: rgba(255,255,255,0.9) 0px 0px 3px inset, rgba(0,0,0,0.9) 0px 0px 3px;\
		background-image	: linear-gradient(bottom, rgba(0,0,0,0) 1%, rgba(255,255,255,0.4) 99%);\
		background-image	: -moz-linear-gradient(bottom, rgba(0,0,0,0) 1%, rgba(255,255,255,0.4) 99%);\
		background-image	: -webkit-linear-gradient(bottom, rgba(0,0,0,0) 1%, rgba(255,255,255,0.4) 99%);\
	}\
	.' + UID['main-box'] + ' .container {\
		height				: auto;\
		width				: 100%;\
		overflow			: hidden;\
	}\
	.' + UID['main-box'] + ' .container ul.tabs li.tab a {\
		line-height			: 16px;\
	}\
	.' + UID['main-box'] + ' .container ul.tabs li.tab a.selected {\
		border-left-width	: 1px !important;\
		border-left-style	: solid !important;\
	}\
	.' + UID['title'] + ' {\
		font-weight			: bold;\
		padding-top			: 2px;\
		padding-bottom		: 2px;\
		text-align			: center;\
		border-radius		: 2px;\
		-moz-border-radius	: 2px;\
		-webkit-border-radius: 2px;\
	}\
	.' + UID['main-box'] + ' .ui-dialog-title *,\
	.' + UID['title'] + ' * {\
		display				: inline-block !important;\
		font-style			: normal !important;\
		font-size			: 10pt !important;\
		font-weight			: bold;\
		line-height			: 10pt !important;\
		text-decoration		: none !important;\
		padding				: 0;\
	}\
	.' + UID['subtitle'] + ' {\
		font-weight			: bold;\
		padding-top			: 2px;\
		padding-bottom		: 2px;\
		margin-bottom		: 3px;\
		text-align			: center;\
		border-radius		: 3px;\
		-moz-border-radius	: 3px;\
		-webkit-border-radius: 3px;\
	}\
	.' + UID['content'] + ' {\
		padding-left		: 3px;\
		padding-right		: 3px;\
		padding-top			: 2px;\
		padding-botom		: 1px;\
		border-radius		: 2px;\
		-moz-border-radius	: 2px;\
		-webkit-border-radius: 2px;\
		box-shadow			: rgba(0,0,0,0.5) 0 0 2px;\
		-moz-box-shadow		: rgba(0,0,0,0.5) 0 0 2px;\
		-webkit-box-shadow	: rgba(0,0,0,0.5) 0 0 2px;\
		overflow-x			: hidden;\
	}\
	.' + UID['status_ticker'] + ' {\
		padding				: 2px;\
		border-radius		: 1px;\
		-moz-border-radius	: 1px;\
		-webkit-border-radius: 1px;\
		box-shadow			: rgba(0,0,0,0.5) 0 0 2px;\
		-moz-box-shadow		: rgba(0,0,0,0.5) 0 0 2px;\
		-webkit-box-shadow	: rgba(0,0,0,0.5) 0 0 2px;\
	}\
	.' + UID['status_report'] + ' {\
		margin-top			: 5px;\
		height				: 106px;\
		max-height			: 106px;\
		overflow			: auto;\
		overflow-x			: hidden;\
	}\
	.' + UID['status_feedback'] + ' {\
		padding-top			: 5px;\
		padding-right		: 5px;\
		padding-bottom		: 0.5em;\
		padding-left		: 5px;\
		height				: 34px;\
		text-align			: left;\
		font-weight			: bold;\
		border-radius		: 3px;\
		-moz-border-radius	: 3px;\
	}\
	table.' + UID['table'] + ' tr td,\
	table.' + UID['compact_table'] + ' tr td,\
	table.' + UID['table_console'] + ' tr td {\
		border				: none;\
		background-color	: transparent;\
		white-space			: nowrap;\
		vertical-align		: top;\
		padding				: 0px;\
		line-height			: 16px;\
		cursor				: default;\
	}\
	table.' + UID['hide_inputbox'] + ' tr td {\
		padding-bottom		: 0px;\
		padding-right		: 0px;\
	}\
	table.' + UID['table'] + ' tr td {\
		padding				: 0px 4px;\
	}\
	table.' + UID['table'] + ' tr td.right,\
	table.' + UID['compact_table'] + ' tr td.right,\
		font-weight			: bold;\
		text-align			: right;\
		padding-right		: 5px;\
	}\
	table.' + UID['table_console'] + ' tr td {\
		white-space			: normal !important;\
	}\
	.' + UID['underline'] + ' {\
		background-color	: transparent;\
		padding				: 1px 4px 1px 4px;\
	}\
	table.' + UID['table'] + ' tr th,\
	table.' + UID['compact_table'] + ' tr th,\
	table.' + UID['compact_console'] + ' tr th,\
	table tr.' + UID['row_top_headers'] + ' td\
	{\
		font-weight			: bold;\
		text-align			: center;\
		line-height			: 11pt;\
		padding				: 1px 3px 1px 3px;\
		border-radius		: 2px;\
	}\
	tr.' + UID['no-attackable'] + ' * {\
		color				: #C00;\
	}\
	table.font8 * {\
		font-size			: 8pt !important;\
	}\
	table.zebra tr:nth-child(even) {\
		background-color	: rgba(255,255,255,0.3);\
	}\
	thead.fixed tr {\
		position			: relative;\
		display				: block;\
	}\
	tbody.scrollable {\
		display				: block;\
		overflow-x			: hidden !important;\
		width				: 100%\
	}\
	input.' + UID['btn_on'] + ',\
	input.' + UID['btn_off'] + ',\
	input.' + UID['bnt_red'] + ',\
	input.' + UID['bnt_green'] + ',\
	input.' + UID['bnt_blue'] + ',\
	input.' + UID['bnt_yellow'] + ',\
	input.' + UID['bnt_cyan'] + ',\
	input.' + UID['bnt_purple'] + ',\
	.' + UID['main-box'] + ' input[type=button] {\
		width				: 130px;\
		padding-top			: 1px;\
		padding-bottom		: 1px;\
		color				: #FFE;\
		font-weight			: bold;\
		border-radius		: 3px;\
		-moz-border-radius	: 3px;\
		-webkit-border-radius: 3px;\
		background-image	: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image	: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image	: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		box-shadow			: rgba(0,0,0,0.52) 1px 1px 1px;\
		-moz-box-shadow		: rgba(0,0,0,0.52) 1px 1px 1px;\
		-webkit-box-shadow	: rgba(0,0,0,0.52) 1px 1px 1px;\
		cursor				: hand;\
		cursor				: pointer;\
	}\
	input.thin {\
		width				: auto !important;\
		margin				: 0;\
		padding-top			: 0 !important;\
		padding-bottom		: 0 !important;\
		padding-left		: 2px;\
		padding-right		: 2px;\
		font-size			: 8pt;\
	}\
	input.short {\
		width				: 30px !important;\
	}\
	.' + UID['main-box'] + ' input[type=text] {\
		text-align			: right;\
		border				: 1px solid #888;\
		border-radius		: 2px;\
		-moz-border-radius	: 2px;\
		-webkit-border-radius: 2px;\
		box-shadow			: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-moz-box-shadow		: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-webkit-box-shadow	: rgba(0,0,0,0.2) 1px 1px 3px inset;\
	}\
	.' + UID['main-box'] + ' input[type=text]:active,\
	.' + UID['main-box'] + ' input[type=text]:focus {\
		box-shadow			: rgba(0,0,0,0.5) 1px 1px 4px inset;\
		-moz-box-shadow		: rgba(0,0,0,0.5) 1px 1px 4px inset;\
		-webkit-box-shadow	: rgba(0,0,0,0.5) 1px 1px 4px inset;\
	}\
	.' + UID['hide_inputbox'] + ' input[type=text] {\
		box-shadow			: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-moz-box-shadow		: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-webkit-box-shadow	: rgba(0,0,0,0.2) 1px 1px 3px inset;\
	}\
	.' + UID['main-box'] + ' select {\
		margin				: 0 !important;\
	}\
	.ui-widget-content select {\
		font-size			: 8pt !important;\
	}\
	table.' + UID['table'] + ' input[type=text],\
	table.' + UID['compact_table'] + ' input[type=text]\
	{\
		padding-top			: 0px;\
		padding-bottom		: 0px;\
	}\
	.' + UID['bold_red'] + ' {\
		font-weight			: bold;\
	}\
	hr.thin {\
		margin				: 2px 0px;\
		padding				: 0px;\
		opacity				: 0.9px;\
	}\
	.' + UID['map-viewer-box'] + ' .ui-dialog-content {\
		margin				: 0 !important;\
		padding				: 0 !important;\
		overflow			: hidden !important;\
	}\
	.' + UID['map-viewer'] + ' {\
		display				: block;\
		width				: 750px;\
		height				: 750px;\
		white-space			: pre;\
		font-family			: Lucida Console, Andale Mono, Courier New, Courier, monospace;\
		font-size			: 1px;\
		font-stretch		: ultra-expanded;\
		cursor				: default;\
	}\
	.' + UID['map-viewer-dragger'] + ' {\
		position 			: absolute;\
		display				: block;\
		cursor				: move;\
	}\
	.' + UID['map-viewer-dragger'] + ' .jewel {\
		position			: absolute;\
		display				: block;\
		margin-top			: -30px;\
		font-size			: 9pt;\
		cursor				: default;\
	}\
	.tf-d {\
		font-size			: 10pt;\
		font-weight			: bold;\
		color				: #910033;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tf-h {\
		font-size			: 10pt;\
		color				: #5D2680;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tf-m {\
		font-size			: 9pt;\
		color				: #274A82;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tf-s {\
		font-size			: 8pt;\
		color				: #285BBC;\
		clear				: left;\
		margin-right		: 4px;\
	}\
	').appendTo("head");
	
	
	
/** Add Color Theme CSS Styles 
******************************/
$J("<style>").append('\
	.jewel {\
		color				: #442 !important;\
	}\
	.' + UID['hiding'] + ' {\
		color				: #FFE;\
		background-color	: rgba(0,180,140,0.7);\
	}\
	.' + UID['defending'] + ' {\
		color				: #FFE;\
		background-color	: rgba(180,0,50,0.7);\
	}\
	.' + UID['main-box'] + ' ul.tabs {\
		border-bottom		: 1px solid rgba(135,135,135,0.6);\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a {\
		color				: #444;\
		background-color	: rgba(200,200,200,0.8);\
		border-color		: rgba(140,140,140,0.6);\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a:hover {\
		background-color	: rgba(215,215,215,0.9);\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a.selected {\
		color				: #000;\
		background-color	: rgba(230,230,230,0.8);\
		border-color		: rgba(255,255,255,0.7);\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a.selected:hover {\
		background-color	: rgba(230,230,230,0.8);\
	}\
	.' + UID['main-box'] + ' .container ul.tabs li.tab a {\
		background-color	: rgba(200,200,200,0.8);\
	}\
	.' + UID['main-box'] + ' .container ul.tabs li.tab a:hover {\
		background-color	: rgba(210,210,210,0.9);\
	}\
	.' + UID['main-box'] + ' .container ul.tabs li.tab a.selected {\
		background-color	: rgba(220,220,220,0.8);\
	}\
	.' + UID['title'] + ' {\
		color				: #FFE;\
		background-color	: rgba(30,30,30,0.7);\
		border				: 1px solid;\
		border-color		: rgba(255,255,255,0.6);\
	}\
	.' + UID['main-box'] + ' .ui-dialog-title *,\
	.' + UID['title'] + ' * {\
		color				: #FFE !important;\
	}\
	.' + UID['subtitle'] + ' {\
		color				: #FFE;\
		background-color	: rgba(40,40,40,0.3);\
		border				: 1px solid;\
		border-color		: rgba(255,255,255,0.5);\
		border-top			: rgba(150,150,150,0.5);\
		border-left			: rgba(150,150,150,0.5);\
		box-shadow			: 1px 1px 1px rgba(0,0,0,0.2) inset;\
		-moz-box-shadow		: 1px 1px 1px rgba(0,0,0,0.2) inset;\
		-webkit-box-shadow	: 1px 1px 1px rgba(0,0,0,0.2) inset;\
	}\
	.' + UID['content'] + ' {\
		border				: 1px solid rgba(210,210,210,0.7);\
	}\
	.' + UID['status_ticker'] + ' {\
		background-color	: rgba(255,245,220,0.5);\
		border				: 1px solid rgba(170,170,170,0.7);\
	}\
	.' + UID['status_feedback'] + ' {\
		background-color	: rgba(0,0,0,0.2);\
		border				: 1px solid rgba(220,220,220,0.7);\
		box-shadow			: 1px 1px 1px rgba(0,0,0,0.1) inset;\
		-moz-box-shadow		: 1px 1px 1px rgba(0,0,0,0.1) inset;\
		-webkit-box-shadow	: 1px 1px 1px rgba(0,0,0,0.1) inset;\
	}\
	.' + UID['underline'] + ' {\
		border-bottom		: 1px solid rgba(200,200,200,0.7);\
	}\
	table.' + UID['table'] + ' tr th,\
	table.' + UID['compact_table'] + ' tr th,\
	table.' + UID['compact_console'] + ' tr th,\
	table tr.' + UID['row_top_headers'] + ' td\
	{\
		color				: #FFE;\
		background-color	: rgba(40,40,40,0.3);\
		border				: 1px solid;\
		border-color		: rgba(210,210,210,0.5);\
		border-top			: rgba(160,160,160,0.5);\
		border-left			: rgba(160,160,160,0.5);\
		box-shadow			: 1px 1px 1px rgba(0,0,0,0.2) inset;\
		-moz-box-shadow		: 1px 1px 1px rgba(0,0,0,0.2) inset;\
		-webkit-box-shadow	: 1px 1px 1px rgba(0,0,0,0.2) inset;\
	}\
	table tr.' + UID['row_top_headers'] + ' td {\
		background-color	: rgba(80,80,80,0.6);\
	}\
	input.' + UID['btn_on'] + ',\
	input.' + UID['btn_off'] + ',\
	input.' + UID['bnt_red'] + ',\
	input.' + UID['bnt_green'] + ',\
	input.' + UID['bnt_blue'] + ',\
	input.' + UID['bnt_yellow'] + ',\
	input.' + UID['bnt_cyan'] + ',\
	input.' + UID['bnt_purple'] + ',\
	.' + UID['main-box'] + ' input[type=button] {\
		border				: 1px solid rgba(50,50,50,0.8);\
	}\
	.' + UID['main-box'] + ' input[type=button] {\
		background-color	: rgba(50,150,220,0.8);\
		border-color		: #39D #39D #28C;\
		text-shadow			: -1px -1px 0 #39D;\
		-moz-text-shadow	: -1px -1px 0 #39D;\
		-webkit-text-shadow	: -1px -1px 0 #39D;\
	}\
	.' + UID['main-box'] + ' input[type=button]:hover {\
		background-color	: rgba(40,150,210,0.8);\
		box-shadow			: rgb(34, 136, 204) 0px 0px 5px 0px;\
		-moz-box-shadow		: rgb(34, 136, 204) 0px 0px 5px 0px;\
		-webkit-box-shadow	: rgb(34, 136, 204) 0px 0px 5px 0px;\
	}\
	input.' + UID['btn_on'] + ',\
	input.' + UID['bnt_green'] + ' {\
		background-color	: rgba(0,160,110,0.8) !important;\
		border-color		: #3eddab #3eddab #30a580 !important;\
		text-shadow			: -1px -1px 0 #22C390 !important;\
		-moz-text-shadow	: -1px -1px 0 #22C390 !important;\
		-webkit-text-shadow	: -1px -1px 0 #22C390 !important;\
	}\
	input.' + UID['btn_on'] + ':hover,\
	input.' + UID['bnt_green'] + ':hover {\
		background-color	: rgba(0,200,150,0.8) !important;\
		box-shadow			: #11d899 0px 0px 5px 0px !important;\
		-moz-box-shadow		: #11d899 0px 0px 5px 0px !important;\
		-webkit-box-shadow	: #11d899 0px 0px 5px 0px !important;\
	}\
	input.' + UID['btn_off'] + ',\
	input.' + UID['bnt_red'] + ',\
	.' + UID['main-box'] + ' input[type=button][disabled] {\
		background-color	: rgba(184,0,46,0.8) !important;\
		border-color		: #c64162 #c64162 #a33750 !important;\
		text-shadow			: -1px -1px 0 #c64162 !important;\
		-moz-text-shadow	: -1px -1px 0 #c64162 !important;\
		-webkit-text-shadow	: -1px -1px 0 #c64162 !important;\
	}\
	input.' + UID['btn_off'] + ':hover,\
	input.' + UID['bnt_red'] + ':hover,\
	.' + UID['main-box'] + ' input[type=button][disabled]:hover {\
		background-color	: rgba(200,50,100,0.8) !important;\
		box-shadow			: #d34a6a 0px 0px 5px 0px !important;\
		-moz-box-shadow		: #d34a6a 0px 0px 5px 0px !important;\
		-webkit-box-shadow	: #d34a6a 0px 0px 5px 0px !important;\
	}\
	input.' + UID['bnt_blue'] + ' {\
		background-color	: rgba(0,94,189,0.8);\
	}\
	input.' + UID['bnt_blue'] + ':hover {\
		background-color	: rgba(0,125,150,0.8);\
	}\
	.' + UID['main-box'] + ' input[type=text]:active,\
	.' + UID['main-box'] + ' input[type=text]:focus {\
		border-color		: rgba(0,0,0,0.8);\
	}\
	.' + UID['hide_inputbox'] + ' input[type=text] {\
		background-color	: rgba(255,255,255,0.3);\
		border				: 1px solid rgba(0,0,0,0.4);\
	}\
	.' + UID['bold_red'] + ' {\
		color				: #500;\
	}\
	.' + UID['map-viewer'] + ' {\
		color				: #000;\
		background-color	: #8A8;\
		border				: 1px solid #666;\
	}\
	.' + UID['map-viewer-dragger'] + ' {\
		background-color	: rgba(240,40,40,0.3);\
		border 				: 1px solid #E55;\
	}\
	.' + UID['map-viewer-dragger'] + ':hover {\
		background-color	: rgba(255,0,0,0.3);\
	}\
	.' + UID['map-viewer-dragger'] + ' .jewel {\
		color				: #000 !important;\
		background-color	: rgba(255,255,255,0.7);\
		border 				: 1px solid #EEE;\
	}\
	/* jQuery UI */\
	.ui-widget-content\
	{\
		border				: 1px solid #dddddd;\
		/*background-color	: rgba(170,170,170,0.7);*/\
		background-image: url(data:image/png;base64,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);\
		color: #303030;\
	}\
	.ui-widget-content a\
	{\
		color				: #303030;\
	}\
	.ui-widget-header\
	{\
		border				: 1px solid #777777;\
		background-color	: rgba(30,30,30,0.8);\
		color				: #FFE;\
		font-weight			: bold;\
	}\
	.ui-widget-header a\
	{\
		color				: #FFE;\
	}\
	/* Interaction states\
	----------------------------------*/\
	.ui-state-default,\
	.ui-widget-content .ui-state-default,\
	.ui-widget-header .ui-state-default,\
	.ui-state-focus,\
	.ui-widget-content .ui-state-focus,\
	.ui-widget-header .ui-state-focus\
	{\
		border				: 1px solid #999999;\
		background-color	: rgba(100,100,100,0.8);\
		font-weight			: bold;\
		color				: #FFE;\
	}\
	.ui-state-default a,\
	.ui-state-default a:link,\
	.ui-state-default a:visited\
	{\
		color				: #FFE;\
		text-decoration		: none;\
	}\
	.ui-state-hover,\
	.ui-widget-content .ui-state-hover,\
	.ui-widget-header .ui-state-hover\
	{\
	}\
	.ui-state-hover a,\
	.ui-state-hover a:hover\
	{\
		color				: #FFE;\
		text-decoration		: none;\
	}\
	.ui-state-active,\
	.ui-widget-content .ui-state-active,\
	.ui-widget-header .ui-state-active\
	{\
		border				: 1px solid rgba(120,120,120,0.8);\
		background-color	: rgba(70,70,70,0.8);\
		font-weight			: bold;\
		color				: #FFE;\
	}\
	.ui-state-active a,\
	.ui-state-active a:link,\
	.ui-state-active a:visited\
	{\
		color				: #FFE;\
		text-decoration		: none;\
	}\
	.ui-widget :active\
	{\
		outline				: none;\
	}\
	/* Interaction Cues\
	----------------------------------*/\
	.ui-state-highlight,\
	.ui-widget-content .ui-state-highlight,\
	.ui-widget-header .ui-state-highlight\
	{\
		border				: 1px solid #fed22f;\
		background-color	: rgba(255,230,90,0.8);\
		color				: #363636;\
	}\
	.ui-state-highlight a,\
	.ui-widget-content .ui-state-highlight a,\
	.ui-widget-header .ui-state-highlight a\
	{\
		color				: #363636;\
	}\
	.ui-state-error,\
	.ui-widget-content .ui-state-error,\
	.ui-widget-header .ui-state-error\
	{\
		border				: 1px solid #cd0a0a;\
		background-color	: rgba(185,25,0,0.8);\
		color				: #FFE;\
	}\
	.ui-state-error a,\
	.ui-widget-content .ui-state-error a,\
	.ui-widget-header .ui-state-error a\
	{\
		color				: #FFE;\
	}\
	.ui-state-error-text,\
	.ui-widget-content .ui-state-error-text,\
	.ui-widget-header .ui-state-error-text\
	{\
		color				: #FFE;\
	}\
	.ui-widget-overlay\
	{\
		background-color	: rgba(170,170,170,0.7);\
	}\
	.ui-widget-shadow\
	{\
		background-color	: #000;\
	}\
	/* jQuery UI Selectable 1.8.16 */\
	.ui-selectable-helper\
	{\
		border:1px dotted #000;\
	}\
	/* jQuery UI Dialog 1.8.16  */\
	.ui-dialog .ui-dialog-title {\
		color				: rgba(255,255,255,0.7);\
	}\
	.ui-dialog .ui-dialog-titlebar-close {\
		background-color	: rgba(0,0,0,0.3);\
		border				: 1px solid transparent;\
	}\
	.ui-dialog .ui-dialog-titlebar-close:hover,\
	.ui-dialog .ui-dialog-titlebar-close:focus\
	{\
		background-color 	: rgba(210,50,80,0.8);\
		border				: 1px solid #960D16;\
		-webkit-box-shadow	: rgba(250,90,120,0.8) 0 0 8px;\
		-moz-box-shadow		: rgba(250,90,120,0.8) 0 0 8px;\
		-khtml-box-shadow	: rgba(250,90,120,0.8) 0 0 8px;\
		box-shadow			: rgba(250,90,120,0.8) 0 0 8px;\
	}\
').appendTo( 'head' );


/********************************************************************************
 * Extract the flashvars from the SWF object and initialise the appropriate     *
 * global variables.                                                            *
 *                                                                              *
 * USED                                                                         *
 *  - api_server                                                                *
 *  - dragon_heart                                                              *
 *  - facebook_id                                                               *
 *  - locale                                                                    *
 *  - session_id                                                                *
 *  - user_hash                                                                 *
 *  - user_id                                                                   *
 *  - user_time                                                                 *
 *                                                                              *
 * UNUSED                                                                       *
 *  - building_cachebreaker                                                     *
 *  - lazy_loaded_swf_cachebreaker                                              *
 *  - primary_ui_cachebreaker                                                   *
 *  - pub_port                                                                  *
 *  - pub_server                                                                *
 *  - second_ui_cachebreaker                                                    *
 *  - sound_cachebreaker                                                        *
 *  - s3_server                                                                 *
 *  - s3_swf_prefix                                                             *
 ********************************************************************************/
 var API_SERVER, /* Global constants from object flashvars (see getFlashvars) */
	 DRAGON_HEART,
	 FACEBOOK_ID,
	 LOCALE,
	 SESSION_ID,
	 USER_HASH,
	 USER_ID,
	 USER_TIME,
	 S3_SERVER,
	 S3_SWF_PREFIX;

function getFlashvars()
{
	var flashvars = $J( SWF_OBJECT + ' param[name="flashvars"]' ).attr( 'value' ).split( '&' ),
		keyValue,
		rslt = {};
		
	$J.each( flashvars, function () {
		keyValue = this.split('=');
		rslt[keyValue[0]] = keyValue[1];
	});
	
	API_SERVER	 = rslt.api_server;
	DRAGON_HEART = rslt.dragon_heart;
	FACEBOOK_ID	 = rslt.facebook_id;
	LOCALE		 = rslt.locale;
	SESSION_ID	 = rslt.session_id;
	USER_HASH	 = rslt.user_hash;
	USER_ID		 = rslt.user_id;
	USER_TIME	 = rslt.user_time;
	S3_SERVER	 = rslt.s3_server;
	S3_SWF_PREFIX= rslt.s3_swf_prefix;
	SERVER_ID	 = ( /realm(\d+)\./.exec( API_SERVER ) || ['',''] )[1];
}

getFlashvars();


/************************
**   scriptStartUp
*************************/

console.log( SCRIPT_NAME + ' Startup in : ' + timeFormat( SCRIPT_STARTUP_DELAY / 1000 ).stripTags() );

var STARTUP_TIMER;

function scriptStartUp()
{
	try {
		
		/**  Data Initialization
		***************************************/
		// Init Defaults Options
		Data.init ({
			options		: {
				api_version		: API_VERSION,
				main_box		: { draggable:true, x:0, y:0 },
				debug_mode		: DEBUG_MODE,
				current_tab		: false,
				use_locale      : '',

				attacks		: { 
					 enabled				: false
					,current_tab			: 0
					,level_enable			: ['',0,0,0,0,0,0,0,0,0,0,0]
					,level_dist				: ['',14,14,14,14,14,14,14,14,14,14,14]
					,dragons_enable		    : ['',0,0,0,0,0,0,0,0,0,0,0]
					,abandon_wildernesses	: false
					,clear_all_targets		: false
					,delete_reports			: true
					,log_attacks			: true
					,recall_encamped		: true
					,stop_on_loss			: true
					,units					: ['',{},{},{},{},{},{},{},{},{},{},{}]
					
					/*
					* WARNING: Changing this values cause Too many requests to the server 
					*          that are monitored. Thats gives them reason to increase the security 
					*          on the servers and, sooner or later, make this scripts unusable.
					*            
					*      PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
					*
					*                   ( We will end up losing everyone )
					*/
					,delay_min				: 5
					,delay_max				: 10
				},
				
				auto_collect	: {
					 enabled	: true
					,last_time	: 0
					,delay		: 1
					,unit		: 3600
					,requests	: {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 1000
					}
				},
				
				auto_refresh	: {
					 enabled		: false
					,last_time		: 0
					,delay			: 15
				},

				building		: { 
					 enabled			: false
					,current_tab		: 0
					,accordion			: 0
					,level_enable		: [{},{},{},{},{},{},{},{},{},{},{}]
					,level_cap			: [{},{},{},{},{},{},{},{},{},{},{}]
				},
				
				info			: {
					current_tab			: 0
				},
				
				jobs			: {
					current_tab			: 0
				},
				
				marches			: {
					 maximum				: 0
					,requests : {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 1000
					}
				},
				
				map				: {
					 selected			: 'AnthropusCamp'
					,radius				: 14
					,x					: 0
					,y					: 0
					,requests : {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 1000
					}
				},
				
				research	: {
					 enabled			: false
					,current_tab		: 0
					,accordion			: 0
					,level_enable		: {}
					,level_cap			: {}
				},
				
				training		: {
					 enabled			: false
					,current_tab		: 0
					,city				: [
						{
							units : {
								Porter				: 0,
								Conscript			: 0,
								Spy					: 0,
								Halberdsman			: 0,
								Minotaur			: 0,
								Longbowman			: 0,
								SwiftStrikeDragon	: 0,
								BattleDragon		: 0,
								ArmoredTransport	: 0,
								Giant				: 0,
								FireMirror			: 0
							}
						 }
						,{
							units : {
								Porter				: 0,
								Conscript			: 0,
								Spy					: 0,
								Halberdsman			: 0,
								Minotaur			: 0,
								Longbowman			: 0,
								SwiftStrikeDragon	: 0,
								BattleDragon		: 0,
								ArmoredTransport	: 0,
								Giant				: 0,
								FireMirror			: 0,
								AquaTroop			: 0
							}
						 }
						 ,{
							units : {
								Porter				: 0,
								Conscript			: 0,
								Spy					: 0,
								Halberdsman			: 0,
								Minotaur			: 0,
								Longbowman			: 0,
								SwiftStrikeDragon	: 0,
								BattleDragon		: 0,
								ArmoredTransport	: 0,
								Giant				: 0,
								FireMirror			: 0,
								StoneTroop			: 0
							}
						 }
						 ,{
							units : {
								Porter				: 0,
								Conscript			: 0,
								Spy					: 0,
								Halberdsman			: 0,
								Minotaur			: 0,
								Longbowman			: 0,
								SwiftStrikeDragon	: 0,
								BattleDragon		: 0,
								ArmoredTransport	: 0,
								Giant				: 0,
								FireMirror			: 0,
								FireTroop			: 0
							}
						 }
						 ,{
							units : {
								Porter				: 0,
								Conscript			: 0,
								Spy					: 0,
								Halberdsman			: 0,
								Minotaur			: 0,
								Longbowman			: 0,
								SwiftStrikeDragon	: 0,
								BattleDragon		: 0,
								ArmoredTransport	: 0,
								Giant				: 0,
								FireMirror			: 0,
								WindTroop			: 0
								
							}
						 }
						 ,{
							units : {
								Porter				: 0,
								Conscript			: 0,
								Spy					: 0,
								Halberdsman			: 0,
								Minotaur			: 0,
								Longbowman			: 0,
								SwiftStrikeDragon	: 0,
								BattleDragon		: 0,
								ArmoredTransport	: 0,
								Giant				: 0,
								FireMirror			: 0,
								IceTroop			: 0,
								FrostGiant			: 0
							}
						 }
						 ,{
						 units : {
								Porter				: 0,
								Conscript			: 0,
								Spy					: 0,
								Halberdsman			: 0,
								Minotaur			: 0,
								Longbowman			: 0,
								SwiftStrikeDragon	: 0,
								BattleDragon		: 0,
								ArmoredTransport	: 0,
								Giant				: 0,
								FireMirror			: 0,
								SwampTroop			: 0
							}
						 }
						 ,{
							units : {
								Porter				: 0,
								Conscript			: 0,
								Spy					: 0,
								Halberdsman			: 0,
								Minotaur			: 0,
								Longbowman			: 0,
								SwiftStrikeDragon	: 0,
								BattleDragon		: 0,
								ArmoredTransport	: 0,
								Giant				: 0,
								FireMirror			: 0,
								ForestTroop			: 0,								
							}
						 }
						 ,{
							units : {
								Porter				: 0,
								Conscript			: 0,
								Spy					: 0,
								Halberdsman			: 0,
								Minotaur			: 0,
								Longbowman			: 0,
								SwiftStrikeDragon	: 0,
								BattleDragon		: 0,
								ArmoredTransport	: 0,
								Giant				: 0,
								FireMirror			: 0,
								DesertTroop			: 0								
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
					]
					,units_cap	: {
						Porter				: 0,
						Conscript			: 0,
						Spy					: 0,
						Halberdsman			: 0,
						Minotaur			: 0,
						Longbowman			: 0,
						SwiftStrikeDragon	: 0,
						BattleDragon		: 0,
						ArmoredTransport	: 0,
						Giant				: 0,
						FireMirror			: 0,
						AquaTroop			: 0,
						StoneTroop			: 0,
						FireTroop			: 0,
						WindTroop			: 0,
						IceTroop			: 0,
						FrostGiant			: 0,
						SwampTroop			: 0,
						ForestTroop			: 0,
						DesertTroop			: 0,
					}
					,mode				: 'population'
					,requests : {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 1000
					}
				},
				
				waves			: {
					 enabled			: false
					,current_tab		: 0
					,stop_on_loss		: true
					,delete_reports		: true
					,delay_min			: 15
					,delay_max			: 30
					,units 				: {}
					,dragons			: {}
					,target	: {
						 x		: 0
						,y		: 0
						,type	: ''
						,level	: 0
					}
				},
				
				messages		: {
					 last_read	: 0
					,missing	: 0 
					,requests : {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 1000
					}
				},

			},

			requests: {
				 start_at	: 0
				,run_time	: 0
				,abandon      : {total:0,errors:0}
				,building     : {total:0,errors:0}
				,cities       : {total:0,errors:0}
				,collect      : {total:0,errors:0}
				,defended     : {total:0,errors:0}
				,generals     : {total:0,errors:0}
				,items        : {total:0,errors:0}
				,manifest     : {total:0,errors:0}
				,map          : {total:0,errors:0}
				,marches      : {total:0,errors:0}
				,player		  : {total:0,errors:0}
				,recalls      : {total:0,errors:0}
				,reports      : {total:0,errors:0}
				,reports_del  : {total:0,errors:0}
				,reports_read : {total:0,errors:0}
				,research     : {total:0,errors:0}
				,resurrect    : {total:0,errors:0}
				,training     : {total:0,errors:0}
			},
			
			stats	: {
				attacks : {
					 start_at	: 0
					,run_time	: 0
					,total		: 0
					,levels			: [
						 '' /* the index zero is not used because the levels are from 1 to 11 */
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
					]
				}
				,items		: {
					 resources : {}
					,speedups  : {}
					,production: {}
					,general   : {}
					,chest     : {}
					,arsenal   : {}
					,armors    : {}
				}
				,waves	: {
					 start_at		: 0
					,run_time		: 0
					,total			: 0
					,spoils			: {}
				}
			},
			
		});
		
		
		// Check if the language of the game is different from the browser and Sets
		if ( LOCALE != LANG_CODE && ( Data.options.use_locale === undefined || Data.options.use_locale === '' ) ) {
			var width  = Math.randRange(300,320);
			dialogBox({
				id		  : setUID('dialog-confirm'),
				position  : [parseInt(document.body.offsetWidth-(document.body.offsetWidth-760)/2-width/2), Math.randRange(0,20)],
				width	  : width,
				height	  : Math.randRange(150,160),
				title	  : 'Language Selector',
				html	  : 'The language of the game is different <br> from the language of your browser.<br><br>'
						  + 'Do you want to use the language of the game <br> instead of your browser?',
				buttons   : [
					{
						text: 'Yes',
						click: function() {
							Data.options.use_locale = true;
							setLanguage(LOCALE);
							Translation.init ({
								onSuccess : function ( r ) {},
								onFailure : function ( r ) {},
								delay     : 500
							});
							$J(this).dialog('destroy');
						}
					},
					{
						text: 'No',
						click: function() { 
							Data.options.use_locale = false;
							$J(this).dialog('destroy');
						}
					}
				]
			});
		}
		
		// Set the default locale use
		if ( Data.options.use_locale === undefined || Data.options.use_locale === '' ) {
			Data.options.use_locale = false;
		} else if ( Data.options.use_locale === true ) {
			setLanguage(LOCALE);
		}
		
		// Set Debug Mode from localStorage
		// This changed with the hotkey is Ctrl + Alt + Shift + D)
		if ( Data.options.debug_mode )
		{
			DEBUG_MODE = DEBUG_MARCHES = Data.options.debug_mode;
		}
		
		
		/**  Check basic initialization
		***************************************/
		function stepStarting ( current_step, retry )
		{

			var retry = retry || 0;
			var wait_time = 1000;
			var error_msg;
			var message;
			
			clearTimeout( STARTUP_TIMER );
			
			function onSuccess( r ) {
				verboseLog ( message );
				console.log ( message );
				StepTimeBar.update ( current_step );
				STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step + 1  );
			}
			
			function onFailure( r ) {
				// Bandwidth Limit Exceeded
				if ( r.status === 509 )
				{
					wait_time = ERROR_509_DELAY;
					$startUpBox.append('<br><b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') +'! -  ' + translate('Retry in') + ' :' + timeFormat(wait_time/1000));
					verboseLog('<b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') +'! -  ' + translate('Retry in') + ' :' + timeFormat(wait_time/1000));
					STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step + 1  );
					return;
				}
				console.log('stepStarting:: Step: ' + current_step + ' Error:' + r.errmsg + ' retry ' + retry);
				StepTimeBar.delay += wait_time;
				STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step, ++retry);
			}
			
			switch ( current_step ) 
			{
			/**  Translation Initialization
			***************************************/
			case 1:
				$startUpBox.find('span').html(translate('Checking Your') + ' ' + translate('Language') + '...');
				message = 'Translation Matrix Successfully initialised';
				Translation.init ({
					onSuccess : onSuccess,
					onFailure : onFailure,
					delay  : 250,
					caller : 'scriptStartUp'
				});
				break;
			
			/**  Manifest Initialization
			***************************************/
			case 2:
				$startUpBox.find('span').html(translate('Checking Your') + ' ' + translate('Information') + '...');
				message = 'Manifest Successfully initialised';
				Manifest.init ({
					onSuccess : onSuccess,
					onFailure : onFailure,
					delay  : 250,
					caller : 'scriptStartUp'
				});
				break;
			
			/**  Seed Initialization
			***************************************/
			case 3:
				$startUpBox.find('span').html(translate('Checking') + ' ' + translate('Your Player') + '...');
				message = 'Seed Successfully initialised';
				Seed.init({
					onSuccess : onSuccess,
					onFailure : onFailure,
					delay  : 250,
					caller : 'scriptStartUp'
				});
				break;
			
			/**  Seed Check Capital City
			***************************************/
			case 4:
				
				var city_id = null;
				var city_idx=0
				// We make sure to first start the capital
				for ( var i=0; i < Seed.city_init.length; i++ )
				{
					if ( Seed.city_init[i].type == 'capital' )
					{
						city_id = Seed.city_init[i].id;
						city_idx = i;
					}
				}
				
				$startUpBox.find('span').html(translate('Checking') + ' ' + translate(Seed.city_init[city_idx].name) + '...');
				
				// Fix progress bar steps & time to initialize the cities
				StepTimeBar.steps += Seed.city_init.length;
				StepTimeBar.delay = Seed.city_init.length * 5000;
				
				Seed.fetchCity ({
					city_id  : city_id,
					from_init: true,
					onSuccess : function ( r ) {

						wait_time = Math.randRange(3000,5000);
						
						StepTimeBar.update ( current_step );
			
						// Waiting time increases three times to prevent detection of the server
						STARTUP_TIMER = setTimeout(  stepStarting, wait_time, current_step  + 1);
						
						// Init Resources tick
						Resources.init();
						
					},
					onFailure : onFailure,
					delay  : 250,
					caller : 'scriptStartUp'
				});
				break;
				
			/**  Seed Check Outpost Cities
			***************************************/
			case 5:
			
				for ( var i=0; i < Seed.city_init.length; i++ )
				{
					if ( Seed.city_init[i].loaded || Seed.city_init[i].type == 'capital' ) {
						continue;
					}
					
					if ( Seed.city_init[i].timer ) {
						clearTimeout( Seed.city_init[i].timer );
					}
					
					var current_index = i;
					
					$startUpBox.find('span').html(translate('Checking') + ' ' + translate(Seed.city_init[i].name) + '...');
					
					var city_id = Seed.city_init[i].id;
					
					// Fix progress bar total time to initialize the cities
					StepTimeBar.delay = 3000;
							
					Seed.fetchCity ({
						city_id  : city_id,
						from_init: true,
						onSuccess : function ( r ) {
							wait_time = Math.randRange(3000,5000);
						
							if ( current_index == Seed.city_init.length - 1 ){
								wait_time = 1500;
							}

							StepTimeBar.update ( current_step );
							
							// Waiting time increases three times to prevent detection of the server
							STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step);
						},
						onFailure : onFailure,
						delay  : 250,
						caller : 'scriptStartUp'
					});
					
					return;
				}
				
				StepTimeBar.stop();
				startPowerTools();
				return;
				break;
			}
			
			// Retries Limit
			if ( retry > 20 )
			{
				$startUpBox.title( FATAL_SEED_TITLE );
				$startUpBox.html( FATAL_SEED_MSG + '<br><br>' + error_msg );
				return;
			}

		}
		
		stepStarting( 1 );
		
		
		
		
		/**  startPowerTools
		***************************************/
		function startPowerTools()
		{
			$startUpBox.destroy ();
			
			TIME_FORMAT_DHMS = [translate('d'),translate('h'),translate('m'),translate('s')];
			
			// Initialization
			AutoCollect.init ();
			AutoRefresh.init();
			Map.init ();
			Marches.init ();
			Messages.init ();
		
			// Create a new popup DIV for the main script window
			var width = Math.randRange(495, 500);
			if ( Data.options.main_box.x < 1 ) 
			{
				Data.options.main_box.x = parseInt( document.body.offsetWidth - ( document.body.offsetWidth - 760 ) / 2 - width / 2) ;
			}
			
			var $main_box = dialogBox({
				id			: setUID('dialog-main-box'),
				dialogClass	: UID['main-box'],
				position	: [Data.options.main_box.x, Data.options.main_box.y],
				width		: width,
				height		: Math.randRange(830, 835),
				draggable	: Data.options.main_box.draggable,
				title		: 'v' + SCRIPT_VERSION,
				buttons		: {},
				close		: function (){
								TabsManager.hideTab();
							},
				dragStop	: function ( event, ui ) {
								var offset = $J( event.target ).offset();
								//Data.options.main_box.x = document.body.offsetWidth - offset.left - $J(event.target).outerWidth();
								Data.options.main_box.x = offset.left;
								Data.options.main_box.y = offset.top-24;
							}
			});
			
			// Create all the tabs and insert them into the main Popup
			TabsManager.init( $main_box );
			TabsManager.showTab();
			
			
			function utcTime()
			{
				var now = new Date();  
				now.setTime( now.getTime() + ( now.getTimezoneOffset() * 60000 ) );
				$J( this ).html( now.toTimeString().substring (0,8) +' UTC' );
			}
			
			
			$J('#ui-dialog-title-' + UID['dialog-main-box']).
			attr('title',translate('Doble-Click to collapse'));
			
			
			setTimeout (function(){
				$J('<span />').
				css({
					'position'	   : 'absolute',
					'display'	   : 'block',
					'right'		   : '35px',
					'text-align'   : 'right',
					'color'        : '#CCC !important'
				}).
				everyTime( '1s', utcTime ).
				appendTo( '#ui-dialog-title-' + UID['dialog-main-box'] );
			},3000);




			// Start event listeners to look for an unload event from Data Storage			
			window.addEventListener( 'unload', Data.onUnload, false );
			
			
			// HotKeys
			// Debug Mode (Ctrl + Alt + Shift + D)
			shortcut.add('Ctrl+Alt+Shift+D', function(event){
				Data.options.debug_mode = !Data.options.debug_mode;
				DEBUG_MODE = DEBUG_MARCHES = Data.options.debug_mode;
				$J('#'+UID['Tabs.Logs.title']).parent().toggle();
				$J('#'+UID['Tabs.Logs']).parent().toggle();
				//Tabs.Logs.$container.toggle();
				$J.msg({ 
					content : '<center>'
							+'Debug Mode :' 
							+ ( Data.options.debug_mode ? 'ENABLED' : 'DISABLED' )
							+ '<br><br>'
							+ 'You need to restart the script <br> to display the Debug tab'
							+ '</center>',
					timeOut	: 'words', /* Words per minute*/
					target	: $main_box
				});
			});

			actionLog ( SCRIPT_VERSION + ' ' +translate('Loaded') );
			verboseLog( SCRIPT_VERSION + ' Loaded' );
		
		}
	} catch (e) {
		$startUpBox.title( 'ERROR!' );
		$startUpBox.html( INIT_ERROR +'<br><br>' + e + ' line: '+ e.lineNumber );
		debugLog( inspect (e, 8, 1) );
	}  
}




MyAjax = {
	/*
		options 
		{
			url:
			method:
			params:
			
			callback:
			   or
			onSuccess:
			onFailure:
			
			delay:
			timeout:
			next_delay:
		}
	*/
	RequestDOA : function ( options )
	{
		if ( !options.params ) {
			options.params = {};
		}
		
		// Commons params (don't add in case of xml locale )
		if ( !options.params['_swf_session_id'] ) {
			options.params['user_id']		= USER_ID;
			options.params['_session_id']	= SESSION_ID;
			options.params['version']		= API_VERSION;
			options.params['dragon_heart']	= DRAGON_HEART;
			options.params['timestamp']		= parseInt( serverTime() );
		}
		
		Queue.add({
			fn	 : MyAjax.Request,
			args : [{
				url          : API_SERVER + '/' + options.url,
				useSignature : (options.method.toUpperCase() === 'POST'),
				method		 : options.method.toUpperCase(),
				params		 : options.params,
				timeoutSecs	 : 45,
				
				onSuccess	 : function( r )
				{
					if ( r.status === 200 && r.responseText )
					{
						if ( options.url.indexOf('.xml') !== -1 )
						{
							if ( options.onSuccess ) {
								options.onSuccess ( r.responseText );
							}
							else if ( options.callback ) {
								options.callback({
									ok  : true, 
									dat : r.responseText
								});
							}
						} 
						else {
							var data;
							try {
								data = JSON.parse( r.responseText );
							} catch (e) { console.log ('ERROR: MyAjax.RequestDOA.onSuccess JSON.parse: ' + e) }
							
							if ( options.onSuccess ) {
								options.onSuccess ( data );
							}
							else if ( options.callback ) {
								options.callback({
									ok  : true, 
									dat : data
								});
							}
						}
					} 
					else {
						if ( options.onFailure ) {
								options.onFailure ({
									errmsg:'The request was successful but no data was returned'
								});
						}
						else if ( options.callback ) {
							options.callback({
								ok     : false, 
								errmsg : 'The request was successful but no data was returned'
							});
						}
					}
				},
			
				onFailure	 : function( r )
				{
					var res = {
						ok		: false,
						status	: r.status,
						errmsg	: r.statusText,
					};
					
					if ( r.responseText ) {
						res.dat = r.responseText;
					}
					else if ( !r.status ) {
						res.errmsg = 'This browser is not compatible at this time';
					}
					
					if ( options.onFailure ) {
						options.onFailure( res );
					}
					else if ( options.callback ) {
						options.callback ( res );
					}
				},
				
				on403 : function(r) 
				{
					dialogError('<b>' + FATAL_SEED_TITLE + '</b>'
						+'<br><br>'
						+'<font color="#C00"><b> ' + r.statusText + '</b></font>'
						+'<br><br>'
						+'<b>Previous Requirements</b><br>'
						+'<b>FIREFOX</b>'
						+'<ul>'
						+'<li>Download and install <a href="https://addons.mozilla.org/es-ES/firefox/addon/refcontrol/">RefControl</a></li>'
						+'<li>Once installed click Tools - RefControlOptions</li>'
						+'<li>Click Add Site and type in wonderhill.com</li>'
						+'<li>Check the Block - Send no referer radio box</li>'
						+'<li>Click OK and then OK again</li>'
						+'</ul>'
						+'<br>'
						+'<b>CHROME</b>'
						+'<ul>'
						+'<li>Right click on your "Chrome" icon (either on your Desktop or your Taskbar)</li>'
						+'<li>Choose properties</li>'
						+'<li>At the end of your target line, place these parameters: --no-referrers</li>'
						+'<li>Click OK</li>'
						+'</ul>'
						+'<br><br>'
						+'<a id="' + UID['support_link'] + '" href="http://wackoscripts.com/index.php?/forum/3-report-problems/" target="_blank">Bugs and Known Issues</a><br>'
						+'<br>');
				},
				
				on509 : function( r )
				{
				/*
					dialogError('<b>ERROR 509</b><br><br>\
						<div style="text-align:center;">\
						<span style="color:#C00;font-size:12pt;"><b>Bandwidth Limit Exceeded</b></span><br><br>\
						<b>This account maybe has been blocked momentarily.<br>\
						<br>TRY AGAIN LATER</b>\
						</div>');
				*/
				}

			}],
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller  || '.unknow')
		});
	},
	
	/*
		options:
		{
			url:
			method:
			params:
			useSignature:
			timeoutSecs:
			onSuccess:
			onFailure:
			
		}
	*/
	Request : function ( options )
	{
		var request, params, headers = {}, timeout, h;
		
		request = new XMLHttpRequest();
		
		request.onreadystatechange = function () {
			if ( request.readyState === 4 )
			{
				clearTimeout( timeout );
				var response = {
					responseText	: request.responseText,
					status			: request.status,
					statusText		: request.statusText,
					request			: request
				}
				if ( ( request.status >= 200 && request.status < 300 ) || request.status === 304 )
				{
					if ( options.onSuccess ) {
						options.onSuccess( response );
					}
				} 
				else {
					if ( options.onFailure ) {
						options.onFailure( response );
					}
					if ( options['on' + request.status] ) {
						options['on' + request.status]( response );
					}
				}
			} 
		} 
		
		
		// Parse request parameters
		params = typeof options.params === 'string' ? options.params : Object.toQueryString( shuffleProperties( options.params ) ).replace(/\_/g,'%5F').replace(/\(/g,'%28').replace(/\)/g,'%29');
			
		// Change Accept request header based on browser
		headers['Accept'] =  IS_CHROME ? '*/*' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
		
		// Add request header specific to POST request only
		if ( options.useSignature )
		{
			// The browser does not allow this action, but it would be able to do it,
			// because the game send this Origin Header
			
			// headers['Origin'] = S3_SERVER;
			
			headers['content-type'] = 'application/x-www-form-urlencoded';
			headers['X-S3-AWS'] = SHA1( 'Dracunculiasis' + params + 'LandCrocodile' + options.url  + 'Bevar-Asp' );
		} 
		
		// Merge headers with option.headers
		//$J.extend(headers, options.headers || { });
		
		// Open Request
		if ( options.method === 'GET' ) {
			options.url += ( options.url.include('?') ? '&' : '?' ) + params;
		}
		request.open( options.method, options.url, true );
		
		// Add request headers to ajax request
		for ( h in headers ) {
			request.setRequestHeader( h, headers[h] );
		}
		
		// Start timeout check before request is sent
		if ( options.timeoutSecs )
		{
			timeout = setTimeout( function() {
				request.abort();
				// CHECK: 599 is custom error code. See if better option exists.
				if ( options.onFailure )
				{
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
		request.send( options.method === 'POST' ? params : null );
	},
	
	
		/*
		options
		{
			city_id:
			x:
			y:
			callback:
		}
	*/
	abandon : function ( options )
	{
		var p = {};
		p['_method']	= 'delete';
		p['x']			= options.x;
		p['y']			= options.y;
		
		var url 	= 'cities/'+ options.city_id +'/wildernesses/abandon.json';
		var method	= 'POST';
		
		Data.requests.abandon.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.abandon.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				Seed.updateCity ( r.result.city );
				
				Map.tileAt ({
					x         : options.x,
					y         : options.y,
					onSuccess : function(){},
					onFailure : function(){},
					caller    : 'MyAjax.abandon'
				});
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.abandon.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.abandon'
		});
	},
	
	
	
	// Use a json to wrap the building upgrade job
	/*
		options
		{
			city_id:
			building_id:	( for upgrades case )
			building_type:	( for init build case )
			slot:			( for init build case )
			callback:
		}
	*/
	buildings : function ( options )
	{
		var url, p = {};
		
		if ( options.building_id ) 
		{
			p['_method']	= 'put';
			
			url	= 'cities/' + options.city_id + '/buildings/' + options.building_id + '.json';
		}
		else {
			p['city_building[building_type]']	= options.building_type;
			p['city_building[slot]']			= options.slot;
			
			url	= 'cities/' + options.city_id + '/buildings.json';
		}
		
		var method	= 'POST';
		
		Data.requests.building.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			onSuccess : function( r ) {
				if ( r.result && r.result.success ) {
					
					Seed.checkAddJob ( r.result.job );
					
					if ( options.onSuccess ){
						options.onSuccess( r.result );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
				}
				else {
					Data.requests.building.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ){
						options.onFailure( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
				}
			},
			onFailure : function( r ){
				Data.requests.building.errors++;
				if ( options.onFailure ){
					options.onFailure( r.errmsg );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.buildings'
		});
	},
	
	/*
		options
		{
			quest_name :
			callback   :
		}
	*/
	claim : function ( options )
	{
		var t = MyAjax;
		
		var p = {};
		p['_method']	  = 'put';
		p['quest_name']	  = options.quest_name;
		
		var url 	= 'player_quests/claim.json';
		var method	= 'POST';
		
		Data.requests.claim.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.claim.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				if (r.quests.claimed) { 
					Seed.player.quests.claimed = r.quests.claimed.cloneProps();
				}
				if (r.result.items) {
					Seed.player.items = r.result.items.cloneProps();
				}
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.claim.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.claim'
		});
	},
	
	/*
		options
		{
			city_id:
			defended:
			callback:
		}
	*/
	defendedCity : function ( options )
	{
		var p = {};
		p['_method']	= 'put';
		p['defended']	= options.defended ? '1' : '0';
		p['callback']	= 'function Function() {}';

		var url 	= 'cities/'+ options.city_id +'.json';
		var method	= 'POST';
		
		Data.requests.defended.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			onSuccess : function( r ) {
				if ( r.errors ) {
					Data.requests.defended.errors++;
					r.errmsg = r.errors;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}

				Seed.updateCity ( r.city );

				if ( options.onSuccess ) {
					options.onSuccess ( );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			onFailure : function ( r ) {
				Data.requests.defended.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.defendedCity'
		});
	},
	
	/*
		options
		{
			item_type :
			job_id    :
			callback  :
		}
	*/
	items : function ( options )
	{
		var p = {}
		p['_method']	= 'delete';
		p['job_id']		= options.job_id;
	
		var url 	= 'player_items/'+ options.item_type + '.json';
		var method	= 'POST';
		
		Data.requests.items.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.items.errors++;
					if ( options.onFailure ) {
						options.onFailure ( null );
					}
					else if ( options.callback ) {
						options.callback ( null );
					}
					return;
				}
				
				if (r.result.items) {
					Seed.player.items = r.result.items.cloneProps();
				}
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.items.errors++;
				if ( options.onFailure ) {
					options.onFailure ( null );
				}
				else if ( options.callback ) {
					options.callback ( null );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.items'
		});
	},
	
	/*
		options
		{
			city_id:
			x:
			y:
			general_id:  (only used for Attack)
			units:
			resources:   (only used for TransportMarch)
			owner_id:
			callback:
		}
	*/
	// now includes the ability to be used to send spies or resources
	marches : function ( options )
	{
		var t = MyAjax;

		if ( !(options.x || options.y) ) {
			debugLog('Missing some option when call MyAjax.march' + inspect(options,4,0));
			return;
		}
		
		// We remove the units with zero troops, 
		// if we don't do this, the script sends the request of that unit with value zero,
		// and that is wrong.
		function removeEmpty ( obj ) {
			for ( var key in obj )
			{
				if ( obj[key] == 0 ){
					delete obj[key];
				}
			}
			return obj;
		}
		if ( options.resources ) {
			options.resources = removeEmpty(options.resources);
		}
		if ( options.units ) {
			options.units = removeEmpty(options.units);
		}
		
		
		// Detects and configures the type of march based on the options
		var march_type;
		// if we set a resources is a transport march
		if ( options.resources ) {
			march_type = 'TransportMarch';
		} 
		// if we set a general_id and units is an attack march
		else if ( options.general_id && options.units ) {
			march_type = 'attack';
		}
		// if we set a units.spy is an spy march
		else if ( options.units  && options.units.spy ) {
			march_type = 'spy';
		}
		// ok, something is wrong
		else {
			debugLog( 'ERROR: MyAjax.marches : ' + JSON.stringify(options) );
			if ( options.onFailure ){
				options.onFailure( { errmsg : 'Failed to send March: need to set some value' } );
			}
			return;
		}

		
		// Initialise POST data
		var p = {};
		p['_method']			= 'post';
		p['march[march_type]']	= march_type;
		p['march[x]']			= options.x;
		p['march[y]']			= options.y;
		
		if ( options.resources ) {
			p['march[resources]']	= JSON.stringify( options.resources );
		}
		if ( options.units ) {
			p['march[units]']		= JSON.stringify( removeEmpty(options.units) );
		}
		if ( options.general_id ) {
			p['march[general_id]']	= options.general_id;
		}
		
		var url 	= 'cities/'+ options.city_id +'/marches.json';
		var method	= 'POST';
		
		Data.requests.marches.total++;
		
		// Send request
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			
			onSuccess : function( r ) {

				if ( r.errors || !r.result.success ) 
				{
					Data.requests.marches.errors++;
					r.errmsg = r.errors || r.result.reason;
					
					if ( options.onFailure ){
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				try {
					Seed.updateCity( r.result.city );
					Seed.marches[r.result.job.march_id].owner_id = options.owner_id;
				} catch (e) {
					console.log ('MyAjax.marches.RequestDOA.onSuccess : ' + e);
					debugLog ('***********'+ e);
				}
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
				
			},
			
			onFailure: function( r ) {
				
				Data.requests.marches.errors++;
				
				if ( options.onFailure ){
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.marches'
		});
	},

	/*
		options
		{
			city_id:
			march_id:
			callback:
		}
	*/
	marchesRecall : function ( options ) {
		var t = MyAjax;
		
		if ( !Seed.marches[options.march_id] ) return;
		
		var p = {};
		p['_method'] = 'delete';
		
		var url 	= 'cities/'+ options.city_id +'/marches/'+ options.march_id +'.json';
		var method	= 'POST';
		
		Data.requests.recalls.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			onSuccess : function( r ) {
				
				if ( r.errors || !r.result.success ) 
				{
					Data.requests.recalls.errors++;
					r.errmsg = r.errors || r.result.reason;
					
					if ( options.onFailure ){
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				Seed.updateCity( r.result.city );
				
				if ( options.onSuccess ){
					options.onSuccess( r.result.city );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function( r ) {
				Data.requests.recalls.errors++;
				if ( options.onFailure ){
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.marchesRecall'
		});
	},
	
	/*
		options
		{
			city_id:
			callback:
		}
	*/
	moveResources : function ( options )
	{
		var p = {};

		var url 	= 'cities/'+ options.city_id +'/move_resources.json';
		var method	= 'POST';
		
		Data.requests.collect.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess: function( r ) {
				if ( r.errors ) {
					verboseLog('<b>Auto-Collect</b> Error: ' + r.msg);
					Data.requests.building.errors++;
					r.errmsg = r.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				Seed.updateCity ( r.city );
				
				if ( options.onSuccess ) {
					options.onSuccess ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure: function( r ) {
				Data.requests.building.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.moveResources'
		});
	},
	
	/*
		options
		{
			category:
			callback:
		}
	*/
	reports : function ( options )
	{
		var p = {}
		p['category']	= options.category || 'all';
		p['page']		= 1;
		p['count']		= 12;
		
		var url 	= 'reports.json';
		var method	= 'GET';
		
		Data.requests.reports.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.reports.errors++;
					if ( options.onFailure ) {
						options.onFailure ( null );
					}
					else if ( options.callback ) {
						options.callback ( null );
					}
					return;
				}
				if ( options.onSuccess ){
					options.onSuccess( r.result.report_notifications );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.reports.errors++;
				if ( options.onFailure ) {
					options.onFailure ( null );
				}
				else if ( options.callback ) {
					options.callback ( null );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.messsageList'
		});
	},
	
	/*
		options
		{
			ids:
			callback:
		}
	*/
	reportsDelete : function ( options )
	{
		var p = {}
		p['_method']		= 'delete';
		p['ids']			= options.ids.join('|');
		
		var url 	= 'reports/bulk_delete.json';
		var method	= 'POST';
		
		Data.requests.reports_del.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.reports_del.errors++;
					if ( options.onFailure ) {
						options.onFailure ( null );
					}
					else if ( options.callback ) {
						options.callback ( null );
					}
					return;
				} 
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.reports_del.errors++;
				if ( options.onFailure ) {
					options.onFailure ( null );
				}
				else if ( options.callback ) {
					options.callback ( null );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.reportsDelete'
		});
	},

	/*
		options
		{
			report_id:
			callback:
		}
	*/
	reportsRead : function ( options )
	{
		var p = {}
		
		var url 	= 'reports/'+ options.report_id +'.json';
		var method	= 'GET';
		
		Data.requests.reports_read.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.reports_read.errors++;
					if ( options.onFailure ) {
						options.onFailure ( null );
					}
					else if ( options.callback ) {
						options.callback ( null );
					}
					return;
				}
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.reports_read.errors++;
				if ( options.onFailure ) {
					options.onFailure ( null );
				}
				else if ( options.callback ) {
					options.callback ( null );
				}
			},
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.reportsRead'
		});
	},
	

	/*
		options
		{
			city_id:
			research_type:
			callback:
		}
	*/
	researches : function ( options )
	{
		var t = MyAjax;

		var p = {};
		p['_method']				 = 'post';
		p['research[research_type]'] = options.research_type;
		
		var url 	= 'cities/'+ options.city_id +'/researches.json';
		var method	= 'POST';
		
		Data.requests.research.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.research.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				Seed.checkAddJob ( r.result.job );
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.research.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.researches'
		});
	},
	
		/*
		options
		{
			city_id   :
			unit_type :
			quantity  :
			callback  :
		}
	*/
	resurrect : function ( options )
	{
		var t = MyAjax;

		var p = {};
		p['_method']		  = 'post';
		p['units[unit_type]'] = options.unit_type;
		p['units[quantity]']  = options.quantity;
		
		var url 	= 'cities/'+ options.city_id +'/units/resurrect.json';
		var method	= 'POST';
		
		Data.requests.resurrect.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.resurrect.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				Seed.checkAddJob ( r.result.job );
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.resurrect.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.resurrect'
		});
	},
	
	
	/*
		options
		{
			city_id:
			unit_type:
			unit_quantity:
			callback:
		}
	*/
	units : function ( options )
	{
		var p = {};
		p['_method']		  = 'post';
		p['units[quantity]']  = options.unit_quantity;
		p['units[unit_type]'] = options.unit_type;
		
		var url 	= 'cities/'+ options.city_id +'/units.json';
		var method	= 'POST';
		
		Data.requests.training.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				
				if ( r.result.errors || !r.result.success ) {
					Data.requests.training.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				Seed.checkAddJob ( r.result.job );
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.training.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.units'
		});
	},



	
}; // END MyAjax


// Added the autocollection interval from the select menu
AutoCollect = {

	init : function () 
	{
		var t = AutoCollect;
		t.setEnable ( Data.options.auto_collect.enabled );
	},
	
	setEnable : function ( on_off ) 
	{
		var t = AutoCollect;
		clearTimeout (t.timer);
		Data.options.auto_collect.enabled = on_off;
		if ( on_off )
		{
			var time = (Data.options.auto_collect.delay * Data.options.auto_collect.unit) - serverTime() + Data.options.auto_collect.last_time;
			if ( time <= 0 ) {
				t.doit ();
			} 
			else {
				t.timer = setTimeout ( t.doit, time * 1000 );
			}
		}
	},
	
	doit : function ()
	{
		var t = AutoCollect;
		Data.options.auto_collect.last_time = serverTime();
		
		function collect ( city_idx, delay )
		{
			setTimeout (function(){
				MyAjax.moveResources ({
					city_id   : Seed.cities[city_idx].id,
					onSuccess : function(){
						actionLog (translate('Auto-Collection of Resources') + ' ' + translate('Outpost') + ' #' + city_idx);
					},
					onFailure : function( r ){
						actionLog (translate('Auto-Collection of Resources') + ' ' + translate('Outpost') + ' #' + city_idx + ' Failure');
					},
					caller : 'AutoCollect.doit'
				});
				
			}, delay);
		}

		for ( var city_idx = 1; city_idx < Seed.cities.length; city_idx++ )
		{
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			// also, skip Spectral Dragon Outpost
			if ( !Seed.cities[city_idx] || city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] )
			{
				continue;
			}
			
			collect ( city_idx, city_idx * 30000 );
		}
		
		var delay_time = ((Data.options.auto_collect.delay * Data.options.auto_collect.unit) + (Math.random()*120))*1000;
		
		t.timer = setTimeout (t.doit, delay_time);

	}
}; // END Auto Collect

AutoRefresh = {
	timer   : null,
	current_mouse : [0,0],
	last_mouse : [0,0],
	last_time : 0,
	
	init : function () 
	{
		var t = AutoRefresh;
		
		// fix old value settings
		if ( Data.options.auto_refresh.delay < 30 ) {
			Data.options.auto_refresh.delay = Data.options.auto_refresh.delay * 60;
		}
		
		t.setEnable ( Data.options.auto_refresh.enabled );
	},
	
	setEnable : function ( on_off ) 
	{
		var t = AutoRefresh;
		Data.options.auto_refresh.enabled = on_off;
		if ( Data.options.auto_refresh.enabled )
		{
			t.last_time = parseInt( serverTime() );
			window.addEventListener('mousemove', t.onMouseMove, false);
			t.onTimeout();
		} 
		else {
			window.removeEventListener('mousemove', t.onMouseMove, false);
		}
	},
	
	setDelay : function ( minutes ) 
	{
		var t = AutoRefresh;
		Data.options.auto_refresh.delay = minutes * 60;
	},
	
	onMouseMove : function ( event )
	{
		AutoRefresh.current_mouse = [event.clientX, event.clientY];
	},
	
	onTimeout : function ()
	{
		var t = AutoRefresh;
		clearTimeout( t.timer );
		
		if ( t.current_mouse.join() !== t.last_mouse.join() ) 
		{
			t.last_time = parseInt( serverTime() );
			t.last_mouse = [].concat( t.current_mouse );
		}
		
	
		if ( parseInt(serverTime()) - t.last_time > Data.options.auto_refresh.delay)
		{
			t.last_time = parseInt( serverTime() );
			$J('#container').toggle().toggle();
		}
		
		
		if ( Data.options.auto_refresh.enabled )
		{
			t.timer = setTimeout( t.onTimeout, 30000 );
		}
	}
};// END AutoRefresh


Buildings = {
	// now includes check_cap (optional)
	getList : function ( city_idx, build_type, check_cap )
	{
		var ret = [];
		var build_cap = Data.options.building.level_cap[city_idx];
		for (var i=0; i < Seed.cities[ city_idx ].buildings.length; i++)
		{
			if ( Seed.cities[ city_idx ].buildings[i].type === build_type &&
			     ( !check_cap || ( check_cap && Seed.cities[ city_idx ].buildings[i].level < (build_cap[ build_type ] || 99) ) )
			 ){
				ret.push ( Seed.cities[ city_idx ].buildings[i] );
			}
		}
		return ret;
	},
	// Given the city index number and the building type, returns the
	// lowest and higher level building of the specified type or 
	// zero if the building is not found (may not have been built)
	// Return an object with min and max levels
	getLevel : function ( city_idx, build_type )
	{
		var build_list = Buildings.getList( city_idx, build_type );
		if ( build_list.length < 1 ){
			return { min:0, max:0 };
		}
		build_list.sort( function(a,b){return a.level - b.level;} );
		return { min: build_list[0].level, max: build_list[build_list.length-1].level };
	},
	
	getById : function ( city_idx, build_id )
	{
		for (var i=0; i < Seed.cities[ city_idx ].buildings.length; i++)
		{
			if ( Seed.cities[ city_idx ].buildings[i].id === build_id ) {
				return ( Seed.cities[ city_idx ].buildings[i] );
			}
		}
		return null;
	},
	
	setLevel : function ( city_id, build_id, level )
	{
		var city_idx = Seed.city_idx[ city_id ];
		for (var i=0; i < Seed.cities[ city_idx ].buildings.length; i++)
		{
			if ( Seed.cities[ city_idx ].buildings[i].id === build_id ) {
				Seed.cities[ city_idx ].buildings[i].level = level;
			}
		}
		return null;
	},
}; // END Building



Data = {
	logs		: [ [], [], [] ],
	defaults	: {},
	
	init : function ( obj )
	{
		try {
		
			//Saves defaults properties
			Data.defaults.mergeWith( obj || {} );
			
			for ( var name in obj )
			{
				// Checks if the object is already defined in the Data Object
				if ( typeof( Data[name] ) == 'undefined' ) {
					//  Assign default object properties, if defined, otherwise an empty object
					Data[name] = typeof( obj[name] ) != 'undefined' ? obj[name].cloneProps() : {};
				}
				
				// Load the data stored, of the current item from localStorage
				var stored = Data.getObject( name );
				
				// Clean removed values from stored object ( max depth 2 )
				if ( stored != null && typeof ( stored ) == 'object' ) {
					debugLog ( 'Clean Removed Vars from : [ ' + name + ' ]' );
					stored.cleanRemoved ( Data [name], 1 );
				}
				
				// Check if the default object is really an object
				if ( Data[name] != null && typeof( Data[name] ) == 'object' )
				{
					// Assign the properties of stored objeto into the default object, overwriting the values
					Data[name].mergeWith( stored );
				}
				//else if ( stored !== '' ) {
				else {
					Data[name] = stored;
				}
			}
		} catch (e) {
			alert ('This browser does not support LocalStorage\n\n'+e);
			return false;
		}
	},
	

	clearStorage : function( names )
	{
		var pattern = names ? new RegExp ( '(' + names.join('|') + ')' ) : false;

		var keys = getKeys ( Data.defaults );
		for ( var i=0; i < keys.length; i++ )
		{
			if ( !names || ( names && pattern.test ( keys[i] ) ) ) {
				Data[ keys[i] ] = Data.defaults[ keys[i] ].cloneProps();
			}
		}
		actionLog('localStorage Deleted!');
	},
	
	getObject : function ( name )
	{
		var item = localStorage.getItem( [SCRIPT_ID, SERVER_ID, USER_ID, name].join('_') );
		return ( item || '' ).charAt(0) === '{' ? JSON.parse( item || '{}' ) : eval( item );
	},
	

	setObject : function( name, value )
	{
		try {
			localStorage.setItem( [SCRIPT_ID, SERVER_ID, USER_ID, name].join('_'), JSON.stringify( value ) );
		} catch(e){
			if ( e === QUOTA_EXCEEDED_ERR )
			{
				alert ( translate('LocalStorage') + ' ' + translate('Quota exceeded') + '!\n\n' + translate('Please, delete the cache and persistent data in your browser'));
			}
		}
	},

	onUnload : function ()
	{
		debugLog('Save Data in localStorage');
		verboseLog('Save Data in localStorage');
		var keys = getKeys ( Data.defaults );
		for ( var i=0; i < keys.length; i++ )
		{
			var name = keys[i];
			Data.setObject ( name, Data[name] );
		}
	}
	
	
}; //END Data


/*

 DoA PTT - Queue Center v 0.4

Based on Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * objects are added to the end of the queue and removed from the front.
 */
Queue = {
  // initialise the queue and offset
  queue			: [],
  offset		: 0,	 
  running		: false,
	
  delay			: 2000,  // default delay for every function
  timeout		: 5000,  // default time out for run a function
  
  timer			: 0,     // timer id for the next run
  
  caller        : '',   // save the current caller string ( for debug )

  /* Returns the length of the queue.
   */
  getLength : function()
  {
	var t = Queue;
    // return the length of the queue
    return ( t.queue.length - t.offset );

  },
  
  /* Returns true if the queue is empty, and false otherwise.
   */
  isEmpty : function()
  {
	var t = Queue;
    // return whether the queue is empty
    return ( t.queue.length === 0 );

  },
  
  /* Enqueues the specified obj. The parameter is:
   *
   * The obj to enqueue
   * obj = {
   *		fn        : function to run
   *		args       : arguments of the function
   *		delay      : delay in ms to run the function (optional)
   *		callback   : the callback function (optional)
   *		onSuccess  : onSuccess callback function (optional but recommended)
   *		onFailure  : onFailure callback function (optional but recommended)
   *		timeout    : timeout in ms to go to the next queue if the callback dont do it (optional)
   *		delay_next : delay in ms to run the next queue (optional)
   * }
   */
  add : function( obj )
  {
	var t = Queue;
	
	// set the id of the object
	obj.id = setUID();
	
    // enqueue the object
    t.queue.push( obj );
	if ( Data.options.debug_mode ){
		console.log( 'queue (' + t.queue.length + ') add: ' + (obj.caller||'unknow') );
		if (!obj.caller || /unknow/.test(obj.caller) ){
			console.log(obj);
		}
	}
	
	// if it's the first to be added to the queue, run it
	if ( !t.running && t.queue.length == 1 ) {
		t.next();
	}
	
	// return the id of this queue obj
	return obj.id;

  },
  
   /* Dequeues an obj and returns true. If the queue is empty then undefined is
   * returned.
   */
  remove : function( id ) {
	var t = Queue;

	// if the queue is empty, return undefined
    if ( t.queue.length == 0 ) return undefined;

	// if request to delete a specific queue ID
	if ( id ) {
		// look for the queue id
		for ( var i in t.queue )
		{
			// We find it and remove it
			if ( t.queue[i].id === id ) {
				t.queue.splice( i, 1 );
				break;
			}
		}
	} 
	// increment the offset and remove the free space if necessary
	else if ( ++t.offset * 2 >= t.queue.length ) 
	{
		id = t.queue[t.offset].id;
		t.queue  = t.queue.slice(t.offset);
		t.offset = 0;
    }
	
	// remove the current uid
	if ( UIDN[id] ) {
		delete ( UIDN[id] );
	}
	
    // return true
    return true;

  },

  /* Dequeues an obj and returns it. If the queue is empty then undefined is
   * returned.
   */
  getNext : function() {
	var t = Queue;
    // if the queue is empty, return undefined
    if ( t.queue.length === 0 ) return undefined;

    // store the obj at the front of the queue
    var obj = t.queue[t.offset];

    // increment the offset and remove the free space if necessary
    if ( ++t.offset * 2 >= t.queue.length ){
      t.queue  = t.queue.slice( t.offset );
      t.offset = 0;
    }
	
	// remove the current uid
	if ( UIDN[obj.id] ) {
		delete ( UIDN[obj.id] );
	}
	
	if ( Data.options.debug_mode ) {
		console.log( 'running : ' + (obj.caller||'unknow') );
	}
	
    // return the dequeued obj
    return obj;

  },
  
  /* Run the obj at the front of the queue & dequeuing it. 
   */
  next : function(){
	var t = Queue;
	
	t.running = true;
	
	// take the fist obj in the queue & dequeuing it
	var obj = t.getNext();
	
	// if the obj is undefined, return false
    if ( !obj ) {
		t.running = false;
		return false;
	}
	
	// save the current caller (for debug)
	t.caller = obj.caller || 'unknow';
	
	// run the obj function in a timeout function
	t.timer = setTimeout( 
		function( self, fn, args, callback, timeout, delay_next ) {
			
			// take the possible callback of the args obj and 
			// insert the order to the next queue & the callback
			var callback_added = false;
			
			// First, Check if the first argument is an object
			if ( args && typeof args[0] === 'object' )
			{
				// check if we have a callback function
				if ( args[0].callback && args[0].callback instanceof Function )
				{
					// store the callback function 
					var obj_callback = args[0].callback;
					// replace the callback function incorporating the stored callback
					args[0].callback = function( r )
					{
						// call the stored callback
						try {
							obj_callback( r );
						} catch(e){
							console.log ('ERROR: Queue: ' + self.caller + ' - obj_callback: '+ e)
						}
						// call the callback of the queue obj ( if there )
						try {
							if ( callback ) callback( r );
						} catch(e){
							console.log ('ERROR: Queue: ' + self.caller + ' - callback: '+ e)
						}
						
						self.running = false;
						// call the next task in the queue
						setTimeout ( self.next, delay_next );
					}
					callback_added = true;
				}
				
				// Check onSuccess and onFailure callbacks
				else {
					// check if we have a onSuccess callback function
					if ( args[0].onSuccess && args[0].onSuccess instanceof Function )
					{
						// store the callback function 
						var success_callback = args[0].onSuccess;
						// replace the callback function incorporating the stored callback
						args[0].onSuccess = function( r )
						{
							// call the stored callback
							try {
								success_callback( r );
							} catch(e){
								console.log ('ERROR: Queue: ' + self.caller + ' - onSuccess: '+ e)
							}
							// call the callback of the queue obj ( if there )
							try {
								if ( callback ) callback( r );
							} catch(e){
								console.log ('ERROR: Queue: ' + self.caller + ' - callback: '+ e)
							}
							
							self.running = false;
							// call the next task in the queue
							setTimeout ( self.next, delay_next );
						}
						callback_added = true;
					}
					
					// check if we have a onFailure callback function
					if ( args[0].onFailure && args[0].onFailure instanceof Function )
					{
						// store the callback function 
						var failure_callback = args[0].onFailure;
						// replace the callback function incorporating the stored callback
						args[0].onFailure = function( r )
						{
							// call the stored callback
							try {
								failure_callback( r );
							} catch(e){
								console.log ('ERROR: Queue: ' + self.caller + ' - onFailure: '+ e)
							}
							// call the callback of the queue obj ( if there )
							try {
								if ( callback ) callback( r );
							} catch(e){
								console.log ('ERROR: Queue: ' + self.caller + ' - callback: '+ e)
							}
							
							self.running = false;
							// call the next task in the queue
							setTimeout ( self.next, delay_next );
						}
						callback_added = true;
					}
				}
			}
			
			// if not modified callback_added, the first argument was not an object, and therefore,
			// we assume that perhaps the callback is in the arguments array
			if ( !callback_added ) {
				// seek some function in the arguments back to forth, 
				// if we find any, we assume that is a callback
				for (var i = args.length; i >= 0; i--) 
				{
					// ok, we find a function
					if ( args[i] instanceof Function ) 
					{
						// store the callback function 
						var fn_callback = args[i];
						// replace function incorporating the stored callback
						args[i] = function( r )
						{
							// call the stored callback
							try {
								fn_callback( r );
							} catch(e) {
								console.log ('ERROR: Queue: ' + self.caller + ' - fn_callback: '+ e)
							}
							// call the callback of the queue obj ( if there )
							try {
								if ( callback ) callback( r );
							} catch(e){
								console.log ('ERROR: Queue: ' + self.caller + ' - callback: '+ e)
							}
							
							self.running = false;
							// call the next task in the queue
							setTimeout ( self.next, delay_next );
						}
						callback_added = true;
						break;
					}
				}
			}
			
			// performs the function of the current queue and 
			// send the arguments and the possible new callback
			fn.apply( this, args );
			
			// finally if no callback was modified, it is because none existed and therefore, 
			// we call the next task in the queue with a timeout
			if ( !callback_added ) {
				self.running = false;
				setTimeout ( self.next, timeout );
				// and call the queue obj callback
				try {
					if( callback ) callback();
				} catch(e){
					console.log ('ERROR: Queue: ' + self.caller + ' - timeout callback: '+ e)
				}
			}
			
		}, 
		obj.delay || t.delay, 
		Queue, 
		obj.fn, 
		obj.args, 
		obj.callback, 
		obj.timeout || t.timeout,
		obj.delay_next || 1
	);
	
  },

  /* Returns the obj at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  peek : function(){
	var t = Queue;
    // return the item at the front of the queue
    return ( t.queue.length > 0 ? t.queue[t.offset] : undefined );

  }
  
}; // End Queue


Manifest = {

	data : {},
	
	init : function ( options )
	{
		Manifest.fetchManifest({
			onSuccess : function ( r ) {
				verboseLog('Manifest was Successfully requested from the server');
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
			},
			onFailure : function ( r ) {
				if ( options.onFailure ){
					options.onFailure ( r );
				}
			},
			caller : 'Manifest.init'
		});
	},
	
	/*
		options
		{
			callback:
		}
	*/
	fetchManifest : function ( options )
	{
		var now = new Date().getTime() / 1000;
		var p = {};
		
		var url 	= 'manifest.json';
		var method	= 'GET';
		
		Data.requests.manifest.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			
			onSuccess : function( r ) {
				if ( r.errors ) {
					r.errmsg = r.errors;
					Data.requests.manifest.errors++;
					if ( options.Failure ) {
						options.Failure ( r );
					}
					return;
				}
				
				// This holds the entire Manifest JSON data parsed as an object 
				Manifest.data = r;
				try {
					Manifest.updateManifest();
				} catch (e) {
					Data.requests.manifest.errors++;
					console.log('ERROR: updating Manifest: ' + e);
					if ( options.Failure ) {
						r.errmsg = '<b>fetchManifest</b> when calling updateManifest returned this error: ' + e;
						options.Failure ( r );
					}
					return;
				}
				
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
			},
			
			onFailure : function( r ) {
				Data.requests.manifest.errors++;
				if ( options.Failure ) {
					options.Failure ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + '.fetchManifest'
		});
	},
	
	buildings : {
		byCityType : function ( city_type, buildable, order ) 
		{
			var buildings = Manifest.data.buildings;
			var i, j, res = [];
			if ( !buildable ) {
				buildable = 'all';
			}
			if ( !city_type ) {
				city_type = 'all';
			}
			if ( buildings.length > 0 ) 
			{
				for ( i = 0; i < buildings.length; i = i + 1 ) 
				{
					if ( buildings[i].buildable === buildable || buildable.toLowerCase() === 'all' ) 
					{
						if ( buildings[i].city_type.length > 0 ) 
						{
							for ( j = 0; j < buildings[i].city_type.length; j = j + 1 ) 
							{
								if (buildings[i].city_type[j] === city_type.toLowerCase() || city_type.toLowerCase() === 'all') 
								{
									res[res.length] = buildings[i];
									break;
								}
							}
						}
					}
				}
			}
			if ( order ) {
				res = Manifest.buildings.sortBy(res, order);
			}
			return res;
		},
		
		byLocation : function ( location, buildable, order ) 
		{
			var buildings = Manifest.data.buildings;
			var i, res = [];
			if ( !buildable ) {
				buildable = 'all';
			}
			if ( !location ) {
				city_type = 'all';
			}
			if ( buildings.length > 0 ) 
			{
				for ( i = 0; i < buildings.length; i = i + 1 ) 
				{
					if ( buildings[i].buildable === buildable || buildable.toLowerCase() === 'all' ) 
					{
						if ( buildings[i].location === location.toLowerCase() || 
							 location.toLowerCase() === 'all' ) 
						{
							res[res.length] = buildings[i];
						}
					}
				}
			}
			if ( order ) {
				res = Manifest.buildings.sortBy( res, order );
			}
			return res;
		},
		
		sortBy : function ( data, order )
		{
			var orderBy;
			if ( !order ) {
				order = {alphabetical: 'asc'};
			}
			for ( orderBy in order ) 
			{
				switch ( orderBy )
				{
				case 'alphabetical' :
					orderAlphabetical( order[orderBy] );
					break;
				case 'buildable' :
					orderBuildable( order[orderBy] );
					break;
				case 'location' :
					orderLocation( order[orderBy] );
					break;
				}
			}
			return data;
			
			function orderAlphabetical( order ) 
			{
				if (order.toLowerCase() === 'asc') 
				{
					data.sort(function (a, b) {
						var type_a = a.type.toLowerCase(), type_b = b.type.toLowerCase();
						if (type_a < type_b) {return -1}
						if (type_a > type_b) {return 1}
						return 0;
					});
				} 
				else if (order.toLowerCase() === 'desc') 
				{
					data.sort(function (a, b) {
						var type_a = a.type.toLowerCase(), type_b = b.type.toLowerCase();
						if (type_a > type_b) {return -1}
						if (type_a < type_b) {return 1}
						return 0;
					});
				}
			}
		
			function orderBuildable( order ) 
			{
				if (order === true) 
				{
					data.sort(function (a, b) {
						var buildable_a = a.buildable, buildable_b = b.buildable;
						if (buildable_a < buildable_b) {return -1}
						if (buildable_a > buildable_b) {return 1}
						return 0;
					});
				} 
				else if (order === false) 
				{
					data.sort(function (a, b) {
						var buildable_a = a.buildable, buildable_b = b.buildable;
						if (buildable_a > buildable_b) {return -1}
						if (buildable_a < buildable_b) {return 1}
						return 0;
					});
				}
			}

			
			function orderLocation( order )
			{
				if (order.toLowerCase() === 'city') 
				{
					data.sort(function (a, b) {
						var location_a = a.location.toLowerCase(), location_b = b.location.toLowerCase();
						if (location_a < location_b) {return -1}
						if (location_a > location_b) {return 1}
						return 0;
					});
				} 
				else if (order.toLowerCase() === 'field') 
				{
					data.sort(function (a, b) {
						var location_a = a.location.toLowerCase(), location_b = b.location.toLowerCase();
						if (location_a > location_b) {return -1}
						if (location_a < location_b) {return 1}
						return 0;
					});
				}
			}
		},
	},
	
	building : function ( type ) 
	{
		console.log('Manifest.building');
		var b;
		
		if ( type ) {
			for (b = 0; b < Manifest.data.buildings.length; b = b + 1) {
			
			}
		} else {
			// Return an error message because no type was specificed
		}
	},
	
	updateManifest : function () 
	{
		var data, i, j;
		
		// Initialise levels for each building & Save requirements and Stats
		data = Manifest.data.buildings;
		
		for ( i = 0; i < data.length; i++ ) 
		{
			if ( !Seed.requirements.building[ data[i].type ] )
			{
				Seed.requirements.building[ data[i].type ] = {};
			}
			
			if ( !Seed.requirements.building[ data[i].type ].level )
			{
				Seed.requirements.building[ data[i].type ].level = [];
			}
			
			if ( !Seed.stats.building[ data[i].type ] ) 
			{
				Seed.stats.building[ data[i].type ] = {};
			}
			
			if ( !Seed.stats.building[ data[i].type ].level )
			{
				Seed.stats.building[ data[i].type ].level = [];
			}
			
			for ( j=0; j < data[i].levels.length; j++ )
			{
				Seed.requirements.building[ data[i].type ].level[ data[i].levels[j].level ] = data[i].levels[j].requirements;
				// add time to stats
				Seed.stats.building[ data[i].type ].level[data[i].levels[j].level] = { time : data[i].levels[j].time };
			}
		}

		// Initialise levels for each research & Save requirements and Stats
		data = Manifest.data.research;
		
		for ( i = 0; i < data.length; i++ ) 
		{
			if ( !Seed.requirements.research[ data[i].type ] )
			{
				Seed.requirements.research[ data[i].type ] = {};
			}
			
			if ( !Seed.requirements.research[ data[i].type ].level )
			{
				Seed.requirements.research[ data[i].type ].level = [];
			}
			
			if ( !Seed.stats.research[ data[i].type ] ) {
				Seed.stats.research[ data[i].type ] = {};
			}
			
			if ( !Seed.stats.research[ data[i].type ].level )
			{
				Seed.stats.research[ data[i].type ].level = [];
			}
			
			for ( j=0; j < data[i].levels.length; j++ )
			{
				Seed.requirements.research[ data[i].type ].level[ data[i].levels[j].level ] = data[i].levels[j].requirements;
				// add time to stats
				Seed.stats.research[ data[i].type ].level[data[i].levels[j].level] = { time : data[i].levels[j].time };
			}
		}
		
		// Initialise units & Save requirements and Stats ( by Jawz )
		data = Manifest.data.city.capital.units;
		
		for ( i = 0; i < data.length; i++ )
		{
			if ( !Seed.requirements.unit[ data[i].type ] )
			{
				Seed.requirements.unit[ data[i].type ] = [];
			}
			Seed.requirements.unit[ data[i].type ] = data[i].requirements;
			
			if ( !Seed.stats.unit[data[i].type] )
			{
				Seed.stats.unit[data[i].type] = {};
			}
			
			Seed.stats.unit[data[i].type] = data[i].stats;
			// add time & upkeep to stats
			Seed.stats.unit[data[i].type].time = data[i].time;
			Seed.stats.unit[data[i].type].upkeep = data[i].upkeep;
		}
		
		
		// Jawz
		// Initialise troops resurrection requirements and Stats
		data = Manifest.data.city.spectral.units;
		
		for ( i = 0; i < data.length; i++ )
		{
			if ( !Seed.requirements.resurrect[ data[i].type]  ) {
				Seed.requirements.resurrect[ data[i].type ] = [];
			}
			
			Seed.requirements.resurrect[ data[i].type ] = data[i].requirements;
			
			if ( !Seed.stats.resurrect[data[i].type] )
			{
				Seed.stats.resurrect[data[i].type] = {};
			}
			
			Seed.stats.resurrect[data[i].type] = data[i].stats;
			// add time & upkeep to stats
			Seed.stats.resurrect[data[i].type].time = data[i].time;
			Seed.stats.resurrect[data[i].type].upkeep = data[i].upkeep;
		}

		// Save quests manifest
		data = Manifest.data.quests;
	
		for ( i = 0; i < data.length; i++ )
		{
			if ( !Seed.quests.category[i] ) {
				Seed.quests.category[i] = [];
			}
			Seed.quests.category[i] = data[i][0];
			
			for ( j = 0; j < data[i][1].length; j++ )
			{
				if ( !Seed.quests.list[ data[i][0] ] ) {
					Seed.quests.list[ data[i][0] ] = [];
				}
				var rec = {
					name		: data[i][1][j].name,
					recommended	: data[i][1][j].recommended,
					reward		: data[i][1][j].reward
				};
				Seed.quests.list[ data[i][0] ].push( rec );
			}
		}

		// Save Great Dragons statistics levels
		for ( var i = 0; i < DRAGON_OBJ_ID.length; i++)
		{
			var obj_name = DRAGON_OBJ_ID[ i ].toLowerCase();
			if ( obj_name == '' || !Manifest.data[ obj_name + '_levels' ] ) continue;
			Seed.stats[ obj_name ] = Manifest.data[ obj_name + '_levels' ];
		}

		// End Jawz
	}

};



Map = {
	map_bin      : null,
	x			 : 0,
	y			 : 0,
	last_request : 0,
	requests	 : 0,
	names : {
		race : {
			1	: 'amazon',
			2	: 'primus',
			3	: 'solarian',
			4	: 'zolmec',
			'amazon'	: 1,
			'primus'	: 2,
			'solarian'	: 3,
			'zolmec'	: 4,
		},
		type : {
			0  : 'Bog',
			1  : 'Plain',
			2  : 'Mountain',
			3  : 'Forest',
			4  : 'Hill',
			5  : 'Grassland',
			6  : 'Lake',
			7  : 'City',
			8  : 'AnthropusCamp',
			9  : 'Clouds',
			'Bog'			:0,
			'Plain'			:1,
			'Mountain'		:2,
			'Forest'		:3,
			'Hill'			:4,
			'Grassland'		:5,
			'Lake'			:6,
			'City'			:7,
			'AnthropusCamp' :8,
			'Clouds'		:9,
		},
		cities :{
			0	: 'City',
			1	: 'Water',
			2	: 'Stone',
			3	: 'Fire',
			4	: 'Wind',
			5	: 'Ice',
			6	: 'Sunken',
			7	: 'gaea',
			8	: 'Desert',
			10	: 'Spectral',
			'City'			:0,
			'Water'			:1,
			'Stone'			:2,
			'Fire'			:3,
			'Wind'			:4,
			'Ice'			:5,
			'Sunken'		:6,
			'gaea'			:7,
			'Desert'		:8,
			'Spectral'		:10,
		}
	},
	
	targets : {
		AnthropusCamp:[],
		Forest		 :[],
		Grassland	 :[],
		Hill		 :[],
		Lake		 :[],
		Mountain	 :[],
		Plain		 :[],
		City		 :[],
		// Outpost		 :[],
		// Wildernesses :[]
	},
	
	states : {},
	
	
	init : function ()
	{
		var t = Map;
		
		// Load the binary data map into mem
		t.map_bin = new Base64Reader( DATA_MAP );
		t.map_bin.fillBuffer();
		
		// Save our coords
		t.x = Seed.cities[0].x || 0;
		t.y = Seed.cities[0].y || 0;
		
		Data.init({
			map	: {
				terrain : {},
				players : {},
				alliance: {}
			},
		});
		
		// Check Our Coords
		t.checkOurCoords();
		
		// set Ourselves Data Map
		t.setOurselves();
	},
	
	setOurselves : function ()
	{
		var t = Map;
		
		for ( var i = 0; i < Seed.player.player_wildernesses.length; i++ )
		{
			var wilderness = Seed.player.player_wildernesses[ i ];
			var xy = wilderness.x + ',' + wilderness.y;
			Data.map.terrain[ xy ] = [
				Seed.player.id,
				Seed.player.name,
				wilderness.type,
				wilderness.level,
				0
			];
			t.states[ xy ] = {
				attackable  : false,
				last_attack : 0,
			};
		}
		
		var alliance_id = Seed.player.alliance && Seed.player.alliance.id ? Seed.player.alliance.id : 0;
		
		Data.map.players[ Seed.player.id ] = [
			Seed.player.name,
			Seed.player.race,
			Seed.player.level,
			Seed.player.might,
			alliance_id,
			1
		];
		
		if ( alliance_id ) {
			Data.map.alliance[ alliance_id ] = Seed.player.alliance.name;
		}
	},
	
	getDistance : function ( x_ini, y_ini, x_end, y_end )
	{
		// Pythagorean theorum for the hypotenuse of a right triangle
		function abs(n){ return n < 0 ? -n : n; }
		var x = abs( x_end - x_ini );
		if (x > 375) x = 750 - x;
		var y = abs( y_end - y_ini );
		if (y > 375) y = 750 - y;
		return Math.round( 100 * Math.sqrt(x * x + y * y) ) / 100;
	},
	
	normalize : function( n )
	{
		if (n > 749){
			return n - 750;
		}
		if (n < 0){
			return n + 750;
		}
		return n;
	},
	
	getTargets : function ( options )
	{
		var t = Map;
		
		var terrains = {
			AnthropusCamp:[],
			Forest		 :[],
			Grassland	 :[],
			Hill		 :[],
			Lake		 :[],
			Mountain	 :[],
			Plain		 :[],
			City		 :[],
			// Outpost		 :[],
			// Wildernesses :[]
		};
		
		var radius = options.radius || 14;
		var pos_x = options.x || t.x;
		var pos_y = options.y || t.y;
		
		// Terrains
		for ( var x = pos_x - radius; x < pos_x + radius; x++)
		{
			for ( var y = pos_y - radius; y < pos_y + radius; y++)
			{
				
				var coord_x = t.normalize (x);
				var coord_y = t.normalize (y);
				
				var tile = t.map_bin.buffer[ coord_y + (coord_x * 749) ];
				if (!tile) continue;

				var type  = (tile >> 4) &0x0f;
				var level = tile &0x0f;
				
				// Skip Clouds
				if (  !type || type == 9 ){
					continue;
				}
				
				var xy = coord_x + ',' +coord_y;
				
				if ( ! t.states[ xy ] ) {
					t.states[ xy ] = {
						attackable  : true,
						last_attack : 0,
					};
				}

				var obj = {
					x	  : coord_x,
					y	  : coord_y,
					type  : type,
					level : level,
					attackable  : t.states[ xy ].attackable
				};
				
				var terrain = Data.map.terrain[ xy ];
				
				if ( terrain )
				{
					obj.player_id = terrain[0] ? terrain[0] : false;
					obj.city_name = terrain[1];
					obj.city_type = Map.names.cities[ terrain[2] ];
					obj.level     = ( terrain[3] || obj.level );
					obj.healing   = terrain[4];
					
					if ( obj.player_id )
					{
						var player = Data.map.players[ obj.player_id ];
						if ( player )
						{
							obj.player_name	   = player[0];
							obj.race	       = player[1];
							obj.player_level   = player[2];
							obj.might          = player[3];
							obj.alliance       = Data.map.alliance[ player[4] ] || player[4];
							obj.is_friend      = player[5];
							
							obj.attackable = t.states[ xy ].attackable = obj.alliance ? false : true;
						}
					}
				} 
				else 
				{
					if ( type == 7 ) {
						obj.level = 1;
					} 
				}
				
				obj.dist = t.getDistance ( t.x, t.y, coord_x, coord_y );
				
				terrains[ t.names.type[type] ].push( obj );
				
			}
		}
		
		Map.targets = terrains;
		
		return terrains;
	},
	
	
	tileAt : function( options )
	{
		var t = Map;
		
		var x = t.normalize ( options.x || t.x );
		var y = t.normalize ( options.y || t.y );
		
		var tile = t.map_bin.buffer[ y + (x * 749) ];
		if (!tile) return (null);
		
		var type  = (tile >> 4) &0x0f;
		var level = tile &0x0f;
		
		
		var xy = x + ',' + y;
				
		if ( ! t.states[ xy ] ) {
			t.states[ xy ] = {
				attackable  : true,
				last_attack : 0,
			};
		}
		
		var target = {
			x	  : x,
			y	  : y,
			type  : type,
			level : level,
			attackable  : t.states[ xy ].attackable
		};
		
		
		// No need to request more data for AnthropusCamp
		if ( type == 8 ) {
			if ( options.onSuccess ){
				options.onSuccess ( target );
			}
			return;
		}
		
		
		// We make sure we have the necessary data in our database
		if ( Data.map.terrain[ xy ]  && Data.map.terrain[ xy ][ 0 ] ) 
		{
			target.player_id = Data.map.terrain[ xy ][ 0 ];
			target.city_name = Data.map.terrain[ xy ][ 1 ];
			target.city_type = Data.map.terrain[ xy ][ 2 ];
			target.level     = Data.map.terrain[ xy ][ 3 ];
			target.healing   = Data.map.terrain[ xy ][ 4 ];
			
			if ( Data.map.players[ target.player_id ] && Data.map.players[ target.player_id ][ 0 ] )
			{
					target.player_name   = Data.map.players[ target.player_id ][ 0 ];
					target.race	         = Data.map.players[ target.player_id ][ 1 ];
					target.player_level  = Data.map.players[ target.player_id ][ 2 ];
					target.might	     = Data.map.players[ target.player_id ][ 3 ];
					var alliance         = Data.map.players[ target.player_id ][ 4 ];
					target.alliance      = Data.map.alliance[ alliance ] || alliance;
					target.is_friend     = Data.map.players[ target.player_id ][ 5 ];
					
					if ( options.onSuccess ){
						options.onSuccess ( target );
					}
					return;
			}
			
		}
		
		// No need to request more data if we have player_name
		if ( target.player_name && !options.force_request ) {
			if ( options.onSuccess ){
				options.onSuccess ( target );
			}
			return;
		}
		
		var p = {};
		p['x']	= x;
		p['y']	= y;
		
		new MyAjax.RequestDOA ({
			url		  : 'map/tile_at.json',
			method	  : 'POST',
			params	  : p,
			onSuccess : function( r ){
				
				if ( r.map_player && r.map_player != null && r.map_player.id )
				{

					var alliance = 0;
					var is_friend = 0;
					
					var xy = r.map_terrain.x + ',' + r.map_terrain.y;
					
					if ( r.map_player.alliance ) 
					{
						alliance = r.map_player.alliance.id;
						
						Data.map.alliance[ r.map_player.alliance.id ] = r.map_player.alliance.name;
						
						target.attackable = Map.states[ xy ].attackable = false;
						
						if ( Seed.player.alliance && r.map_player.alliance.id === Seed.player.alliance.id ) {
							is_friend = 1;
						}
					}
				
					Data.map.players[ r.map_player.id ] = [
						r.map_player.name,
						r.map_player.race,
						r.map_player.level,
						r.map_player.might,
						alliance,
						is_friend
					];
					
					target.player_name   = r.map_player.name;
					target.race	         = r.map_player.race;
					target.player_level  = r.map_player.level;
					target.might	     = r.map_player.might;
					target.alliance      = Data.map.alliance[ alliance ] || alliance;
					target.is_friend     = is_friend;
					
					var city_type = r.map_terrain.type ? Map.names.cities[r.map_terrain.type] : 0;
					
					var city_name = Data.map.terrain[ xy ] ? Data.map.terrain[ xy ][ 1 ] : 0;
					
					Data.map.terrain[ xy ] = [
						r.map_terrain.map_player_id, 
						city_name,
						city_type, 
						(r.map_terrain.level || target.level), 
						(r.map_terrain.healing || 0)
					];
					
					target.player_id = r.map_terrain.map_player_id;
					target.city_name = city_name;
					target.city_type = city_type;
					target.level     = Data.map.terrain[ xy ][ 3 ];
					target.healing   = Data.map.terrain[ xy ][ 4 ];
				}
			
			
				if ( options.onSuccess ){
					options.onSuccess ( target );
				}
			
			},
			onFailure : function( r ){
				Data.requests.map.errors++;
				if ( options.onFailure ){
					options.onFailure ( null );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || 'unknow') + ', Map.tileAt'
		});
	},
	
	
	scanMap : function ( options )
	{
		var t = Map;
		
		t.radius     = (!options.radius || options.radius < 7) ? 7 : options.radius;
		t.pos_x      = t.normalize ( options.x - t.radius + 7 );
		t.pos_y      = t.normalize ( options.y - t.radius + 7 );
		t.step_x     = t.step_y = 0;
		t.steps_side = Math.ceil( (t.radius*2) / 14 );
				
		t.forwards	 = true;
		
		t.steps      = parseInt( t.steps_side * t.steps_side );
		t.step       = 1;
		
		t.percent    = parseInt( t.step * 100 / t.steps );
		
		t.options   = options;
		
		if ( t.options.onStart ) {
			t.options.onStart( { steps: t.steps } );
		}
	
		var p = {};
		p['x']	= t.pos_x;
		p['y']	= t.pos_y;

		Data.requests.map.total++;
		
		
		t.founds = 0;
		
		new MyAjax.RequestDOA ({
			url		  : 'map.json',
			method	  : 'POST',
			params	  : p,
			onSuccess : t.gotMapCities,
			onFailure : function(){
				Data.requests.map.errors++;
				if ( t.options.onFailure ){
					t.options.onFailure ( null );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || 'unknow') + ', Map.scanMap'
		});
	},  

	
	
	gotMapCities : function ( r )
	{
		var t = Map;
	
		t.founds += r.map_cities.length;
		
		//Cities & Outpost
		for ( var i=0; i < r.map_cities.length; i++ )
		{
			var target = r.map_cities[i];
			
			if ( target.might < 1 ) continue;

			var alliance = 0;
			var is_friend = 0;
			
			if ( target.alliance_name ) {
				alliance = target.alliance_name;
				if ( Seed.player.alliance && target.alliance_name === Seed.player.alliance.name ) {
					is_friend = 1;
				}
			}
			
			if ( !Data.map.players[ target.map_player_id ] ) 
			{
				// [Player Name, Race Id, Level, Might, Alliance, isFriend ]
				Data.map.players[ target.map_player_id ] = [
					0, 
					t.names.race[target.race],
					0,
					target.might,
					alliance,
					is_friend
				];
			} else {
				Data.map.players[ target.map_player_id ][ 1 ] = t.names.race[target.race];
				if ( !Data.map.players[ target.map_player_id ][ 4 ] ) {
					Data.map.players[ target.map_player_id ][ 4 ] = alliance;
				}
			}
			
			var xy = target.x + ',' +target.y;
			// [ player_id, city_name, city_type, level, healing]
			Data.map.terrain[xy] = [ 
				target.map_player_id,
				(target.name || 0 ),
				t.names.cities[target.type], 
				(target.level || 0), 
				(target.healing || 0),
			];
			
			
			if ( ! t.states[ xy ] ) {
				t.states[ xy ] = {
					attackable  : true,
					last_attack : 0,
				};
			}
			
			t.states[ xy ].attackable =  alliance ? false : true;
			
		}
		
		
		// This performs a scan in zig-zag
		// (To simulate a little more the way a human would)
		if ( t.forwards ) {
			++t.step_x;
			if ( t.step_x >= t.steps_side ) {
				++t.step_y;
				t.forwards = false;
				--t.step_x;
			}
		}
		else {
			--t.step_x;
			if ( t.step_x < 0 ) {
				++t.step_y;
				t.forwards = true;
				++t.step_x;
			}
		}
		
		if ( t.step_y >= t.steps_side )
		{
			if ( t.options.onSuccess )
			{
				t.options.onSuccess ({
					founds: t.founds
				});
			} else if ( t.options.callback ) {
				t.options.callback ({
					founds: t.founds
				});
			}
			return;
		}
			
		t.step = t.step + 1;
		t.percent = parseInt( t.step * 100 / t.steps );
		
		if ( t.options.onProgress ){
			t.options.onProgress( { step : t.step } );
		}
		
		var delay = parseInt( Data.options.map.radius * 10 );

		Data.requests.map.total++;
		
		
		var now = serverTime();
		if ( t.requests && t.requests > 35 ) 
		{
			if ( t.last_request + 600 > now ) {
				t.last_request = 0;
				t.requests = 0;
			} 
			else {
				if ( t.options.onFailure ){
					t.options.onFailure ( { error : translate('Too Many Requests') } );
				}
				return;
			}
		}
		
		t.last_request = now;
		t.requests++;
		
		
		//setTimeout (function(){
		var p = {};
		p['x']	= t.normalize( t.pos_x + (t.step_x*14) );
		p['y']	= t.normalize( t.pos_y + (t.step_y*14) );
		
		new MyAjax.RequestDOA ({
			url		 : 'map.json',
			method	 : 'POST',
			params	 : p,
			onSuccess : t.gotMapCities,
			onFailure : function(){
				Data.requests.map.errors++;
				if ( t.options.onFailure ){
					t.options.onFailure ( null );
				}
			},
			
			delay      : Math.randRange(delay, delay*2),
			timeout    : t.options.timeout || 10000,
			delay_next : t.options.delay_next || 1,
			caller     : (t.options.caller || 'unknow') + ', Map.gotMapCities',
		});
	},
		
	
	
	checkOurCoords : function()
	{
		var t = Map;
		if ( Data.options.map.x !== Seed.cities[0].x || Data.options.map.y !== Seed.cities[0].y )
		{
			Data.options.map.x = Seed.cities[0].x;
			Data.options.map.y = Seed.cities[0].y;
		}
	},
	
	
	
	
}; // End Map



Marches = {

	table_output : {
		attacks: {},
		waves  : {}
	},
	
	init : function () 
	{
		var t = Marches;
	
		Data.init ({
			marches	: {
				start_at	: 0,
				attacks		: {},
				waves		: {},
			}
		});
		
	},
	
	add : function ( march_id, type )
	{
		var t = Marches;

		var march = Seed.marches[march_id];
		if ( march === null )
		{
			if ( DEBUG_MARCHES ) {
				debugLog ('***** ERRROR March missing from seed: ' + march_id);
			}
		} 
		else {
			
			( Data.marches[type] )[march_id] = march.cloneProps();
			
			if ( DEBUG_MARCHES ) {
				debugLog ('Marches.add: ID=' + march.id + '  (' + march.x + ',' + march.y + ')');
			}
		}
	},

	remove : function ( march_id, type )
	{   
		var t = Marches;
		if ( march_id )
		{
			if ( Seed.marches[march_id] )
			{
				try {
					delete ( Seed.marches[march_id] );
				} catch (e){
					console.log('ERROR deleting march: ' + march_id + ' from Seed.marches');
				}

				if ( Seed.total.marches ) {
					Seed.total.marches--;
				}

			}
			
			if ( type && ( Data.marches[type] )[march_id] )
			{
				try {
					delete ( ( Data.marches[type] )[march_id] );
				} catch(e){
					console.log('ERROR deleting march: ' + march_id + ' from Data.marches.' + type );
				}
			}
		}
	},

	checkTimer : null,
	
	check : function ()
	{
		var t = Marches;
		var now = parseInt( serverTime() );
		clearTimeout( t.checkTimer );
		
		for ( var type in Data.marches )
		{
			if ( !(/(attacks|waves)/.test( type )) ){
				continue;
			}
			
			var marches = Data.marches[type];
			for ( var id in marches )
			{
				if ( marches[id].run_at < ( now - 60 )  && !( marches[id].has_report ) )
				{
					// Will force at least 5 minute wait for the report to come in before it gives up on it. (fixed by Lord Mimir)
					if ( marches[id].retry && marches[id].run_at < ( now - 300 ) )
					{
						++Data.options.messages.missing;
						
						if (DEBUG_MARCHES){
							debugLog ('March report never received! (now=' + now + ')\n'+ inspect (marches[id], 6, 1));    
						}
						
						marches[id].has_report = true;
						
					}
					else {
						marches[id].retry = true;
						Messages.checkMessages({
							category :'reports'
						});
					}
				}
			}
		}
		t.checkTimer = setTimeout ( t.check, Math.randRange(60000, 90000) );
	},
	
	updateTable : function( table, type )
	{
		var t = Marches;
		var now = parseInt( serverTime() );
		
		// shortcut for current table_output
		var table_output = t.table_output[type];
		
	
		/* 
		* NOTE: We use a dual system, the first one to create the rows and
		the another to update it. We do it in this way because we don't want 
		to lose the event listeners of the buttons.
		*/
		for ( var id in Seed.marches )
		{
			// shortcut of current march
			var march = Seed.marches[id];
			
			// Delete expired retreating marches or change status in expire marching


	if ( march ){
		if (march.run_at === undefined || now > march.run_at + 2 ) {
			switch( march.status )
				{
	case 'marching':
		march.run_at = now - 2 + march.duration !== undefined ? march.duration : delay_min;
		march.status = 'retreating';
		break;
	case 'retreating':
		Marches.remove( id, type );
		continue;
		break;
			}
		}
	}

			
			// Add the current march if it's not in the Data.marches
			if ( Data.marches.attacks[id] === undefined && 
				 Data.marches.waves[id] === undefined
			  ){
				if ( ( Seed.marches[id].x === Data.options.waves.target.x ) && 
					 ( Seed.marches[id].y === Data.options.waves.target.y )
				  ){
						t.add(id, 'waves');
				}
				else {
						t.add(id,'attacks');
				}
			}
			
			
			if ( ( Data.marches.attacks[id] === undefined && type == 'attacks' ) || 
				 ( Data.marches.waves[id]   === undefined && type == 'waves' )
			   ){
					//Only allow attacks on correct table.
					continue;
			}

			var retreating = ( march.status === 'retreating' );
			
			var time_left = march.run_at - now;
			var time_format;
			if ( time_left < 0 )
			{
				time_format = '...';
			} 
			else if ( isNaN( time_left ) ){
				time_format = '';
			}
			else {
				time_format = timeFormat( time_left, true );
			}
			
			// Set units for march details or title of the row
			var units_title = '';
			var units_detail = '';
			var units_types = getKeys( march.units );
			for ( var i = 0; i < units_types.length; i++ )
			{
				var current_type = units_types[i];
				
				units_title   += translate( current_type ) + ': ' + march.units[ current_type ];
				
				units_detail  += '<span class="' + UID['doa-icons'] + ' i-' + current_type + '"></span>'
							  +'<span class=jewel style="display:inline-block;clear:left;height:17px;margin-top:-8px;">' 
							  + ( march.units[ current_type ] == 1 ? '' : march.units[ current_type ] )
							  +'</span>  ';

				if ( i !== units_types.length-1 ) {
					units_title  += ' \n';
				}
			}

			
			var iRow, iCell;
			
			/* Inserting Row
			/*******************/
			if ( table_output[id] === undefined && (time_left || march.status==='encamped') ) {
				
				// Insert a new row
				iRow = table.insertRow( -1 );
				
				// associates the current row number to the id of the march
				table_output[id] = {row:table.rows.length-1};
				
				iRow.setAttribute( 'ref', id );
				
				iRow.title = [
							'(' + (march.general && march.general.name ? march.general.name : '----') + ')'
							,translate( march.target_type )
							,march.terrain_level
							,'[' + march.x + '/' + march.y + ']\n'
							,units_title
					].join(' ');
				
				// Retreating case
				if ( retreating )
				{
					table_output[id].row_status = 2; // Retreating mode
				
					// march Status
					iCell = iRow.insertCell( -1 );
					iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.status + '">';
					iCell.title = translate(march.status);
					
					// march Units
					iCell = iRow.insertCell( -1 );
					iCell.className = 'wrap';
					iCell.style.textAlign = 'left';
					iCell.style.width = '70%';
					iCell.innerHTML =  units_detail;
					
					// march Target
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					
					// march time_left
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					iCell.innerHTML = '&nbsp;';
					// march Recall Button
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					iCell.innerHTML = time_format;
				}
				
				// Marching case
				else {
				
					table_output[id].row_status = 1; // Marching mode
				
					// march Status
					iCell = iRow.insertCell( -1 );
					iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.status + '">';
					iCell.title = translate(march.status);
					
					// added Transport march case by Didi
					if ( march.march_type === 'TransportMarch' ) {
						iCell.innerHTML +=  '<span class="' + UID['doa-icons'] + ' i-ArmoredTransport">';
						iCell.title += ' ' + translate('Transport');
					}
					
					// march Units
					iCell = iRow.insertCell( -1 );
					iCell.className = 'wrap';
					iCell.style.textAlign = 'left';
					iCell.style.width = '70%';
					iCell.innerHTML = units_detail;
					
					// march Target
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.target_type + '"></span>'
									+ march.terrain_level
									+ '<span class="jewel font7"> [' + march.x +'/'+ march.y +']</span>&nbsp;';
					
					// march time_left
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					iCell.innerHTML =  time_format;

					// march Recall Button
					iCell = iRow.insertCell( -1 );
					
					var button = document.createElement('input');
					button.type = 'button';

					// Save the current March id in the attibute "ref" of the button
					button.setAttribute( 'ref', id );

					if (march.status === 'encamped')
					{
						button.className = 'thin';
						button.value = translate('Recall');
					}
					else {
						button.className = UID['bnt_red'] + ' thin';
						button.value = translate('Cancel');
					}

					$J(button).click ( function( event ){
						var self = event.target;
						
						self.disabled = true;
						self.style.display = 'none';
						
						// Take the march id from the "ref" attribute
						var march_id = self.getAttribute( 'ref' );
						
						// Verify that the march really exists in Seed.marches
						if ( Seed.marches[march_id] )
						{
							var city_id = Seed.marches[march_id].city_id;
							
							MyAjax.marchesRecall({
								city_id   : city_id,
								march_id  : march_id,
								
								onSuccess : function ( r ) {
									Seed.marches[march_id].status = 'retreating';
									( Data.marches[type] )[march_id].status = 'retreating';
								},
								
								onFailure : function ( r ) {
								},
								caller    : 'Marches.updateTable'
							});
						}
					});

					iCell.appendChild( button );
				
				}
				
			}
			
			/* Upgrade Row
			/*******************/
			else {
			
				if( table_output[id] === undefined ) continue;
			
				iRow = table.rows[ table_output[id].row ];
				
				if( iRow === undefined )
				{
					delete table_output[id];
					continue;
				}

				// Row Status cases
				switch ( table_output[id].row_status )
				{
				// Finish state
				case 0:
					if( retreating && time_left > 0 ) // added a check to prevent hidding of marches before they finish retreating.
					{
						table_output[id].row_status =2;
						// march Recall Button
						iRow.cells[4].innerHTML = '';
						continue;
					}
					iRow.style.display = 'none';
					table_output[id].row_status = -1;
					continue;
					break;
					
				// Marching state (Waiting for retreating)
				case 1:
				case 2:
					if ( retreating )
					{
						table_output[id].row_status = 3; // Change to retreating state
						
						// march Status
						iRow.cells[0].innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.status + '">';
						iRow.cells[0].title = translate(march.status);
						if ( march.march_type === 'TransportMarch' ) {
							iRow.cells[0].innerHTML +=  '<span class="' + UID['doa-icons'] + ' i-ArmoredTransport">';
							iRow.cells[0].title += ' ' + translate('transport');
						}
						
						// march Units
						iRow.cells[1].innerHTML = units_detail;
						
						// march Target
						/*
						iRow.cells[2].innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.target_type + '"></span>'
												+ march.terrain_level
												+ '<span class=jewel> [' + march.x +'/'+ march.y +']</span>&nbsp;';
						*/
						
						// march Recall Button
						iRow.cells[4].innerHTML = '';
					}
					else if ( ( isNaN( time_left ) || time_left < 0 ) &&  table_output[id].row_status === 1 ) {
						  
						if ( march.terrain_type && !( /(Anthropus|City|Outpost|Bog)/.test(march.terrain_type) ) ) {
							
							if ( march.status === 'marching' ) {
								table_output[id].row_status = 2; // Change to Waiting for retreating (Action Taken)
							
								// Auto Abandon Wilderness or Auto Recall Units
								// Only when we are not have all wildernesses controlled
								if (Seed.player.player_wildernesses.length != Seed.player.max_wildernesses)
								{
									// Abadon Wildernesses
									if ( Data.options.attacks.abandon_wildernesses ) {
										var march_id   = march.id;
										var march_type = type;
										MyAjax.abandon({
											city_id   : march.city_id,
											x         : march.x,
											y         : march.y,
											onSuccess : function (  ) {
												Seed.marches[march_id].status = 'retreating';
												( Data.marches[march_type] )[march_id].status = 'retreating';
											},
											onFailure : function (  ) {
											},
											delay  : Math.randRange(4000, 7000),
											caller : 'Marches.updateTable'
										});
									}

									// Recall Units from Encamped Wildernesses
									else if ( Data.options.attacks.recall_encamped  ) 
									{
										var march_id   = march.id;
										var march_type = type;
										MyAjax.marchesRecall({
											city_id   : march.city_id,
											march_id  : march.id,
											onSuccess : function (  ) {
												Seed.marches[march_id].status = 'retreating';
												( Data.marches[march_type] )[march_id].status = 'retreating';
											},
											onFailure : function (  ) {
											},
											delay  : Math.randRange(4000, 7000),
											caller : 'Marches.updateTable'
										});
									}
								}
							}
							else if ( march.status === 'encamped' ) {
								// Change to encamped
								table_output[id].row_status = 4;
								
								// Change button to  show recall
								// first clear old button. 
								iRow.cells[4].innerHTML = '';
								
								//now create button
								var button = document.createElement( 'input' );
								// Save the current March id in the attibute "ref" of the button
								button.setAttribute( 'ref', id );
								button.type = 'button';
								button.className = 'thin';
								button.value = translate('Recall');
								
								$J( button )
								.click ( function(event){
									var self = event.target;
									self.disabled = true;
									self.style.display = 'none';
									
									// Take the march id from the "ref" attribute
									var march_id = self.getAttribute( 'ref' );
	
									 // Verify that the march really exists in Seed.marches
									if ( Seed.marches[march_id] )
									{
										var city_id = Seed.marches[march_id].city_id;
									   
										var march_type = type;
										MyAjax.marchesRecall({
											city_id   : city_id,
											march_id  : march_id,
											onSuccess : function (  ) {
												Seed.marches[march_id].status = 'retreating';
												( Data.marches[march_type] )[march_id].status = 'retreating';
											},
											onFailure : function (  ) {
											},
											delay  : Math.randRange(4000, 7000),
											caller : 'Marches.updateTable'
										});

									}
								});
								iRow.appendChild( button );
							}
						}
					}
					
					break;
					
				// retreating state (Waiting for finish)
				case 3:
					if( isNaN(time_left) || time_left < 0 )
					{
						table_output[id].row_status = 0; // Change to Finish state
					}
					break;
					
				//units encamped;
				case 4:
					if ( retreating )
					{
						table_output[id].row_status = 3; // Change to retreating state
						
						// march Status
						iRow.cells[0].innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.status + '">';
						iRow.cells[0].title = translate(march.status);
						if ( march.march_type === 'TransportMarch' ) {
							iRow.cells[0].innerHTML +=  '<span class="' + UID['doa-icons'] + ' i-ArmoredTransport">';
							iRow.cells[0].title += ' ' + translate('transport');
						}
						
						// march Units
						iRow.cells[1].innerHTML = units_detail;
						
						// march Target
						
						// march Recall Button
						iRow.cells[4].innerHTML = '';
					}
					break;
				}
				
				// march time_left
				iRow.cells[3].innerHTML = time_format;
			}
		}
		
		
		
		// loop to clear the attack if both no longer active and report has been recieved 
		for ( var id in Data.marches[type] )
		{
			if ( ( Seed && Seed.marches[id] === undefined ) && ( Data.marches[type] )[id].has_report ){
				  Marches.remove( id, type );
			}
		}
		
		
		// Clear table of old data  (by Lord Mimir)
		var cleared=0;  
		for ( var row = 0; row < table.rows.length; row++ )
		{  
			var id = table.rows[row].getAttribute('ref');  
			if ( Seed.marches[id] === undefined )  
			{  
				cleared++;  
				table.deleteRow( row );
				delete table_output[id];
				/*
				move back marker to cause it to check 
				the new value at location as old one was deleted.
				*/
				row--;  
				continue;  
			}  
			else if( cleared > 0 )  
			{  
				table_output[id].row -= cleared;   
			}  
		}
		
		
	}
}; // End Marches object


// TODO: reduce n/w traffic - cache up requests
Messages = {
	read_list : [],
	fetch_timer : null,
	last_queued : 0,
	battle_report_listeners : [],
	check_busy : false,
	delete_queue : [],

	init : function ()
	{
		Messages.checkMessages( { wait : 1000 } );
		window.addEventListener ('unload', Messages.onUnload, false);
	},

	marchAtTarget : function ()
	{
		var t = Messages;
		t.checkMessages( {category:'reports'} );
	},

	// Fixed by Lord Mimir
	deleteMessage : function ( msgId )
	{
		var t = Messages;
		
		t.delete_queue.push ( msgId );
		
		// Wham - only 12 messages may be deleted at once in the SWF
		// Delete when there are between 5 to 12 messages in queued (by Didi)
		// (Randomness is so that the server can not find recurrent actions)
		//if ( t.delete_queue.length >= Math.randRange( 5, 12 ) ){
		//	doit();
		//}
		
		RequestQueue.add('deleteMessage', doit, Math.randRange(30000,60000));

		function doit ()
		{
			var t = Messages;
			//debugLog ('DELETE MESSAGES:\n'+ inspect (t.delete_queue, 5, 1));
			MyAjax.reportsDelete ({
				ids       : t.delete_queue,
				onSuccess : function ( r ) {
					var t = Messages;
					t.delete_queue = [];
				},
				onFailure : function ( r ){
				},
				caller    : 'Messages.deleteMessage'
			});
		}
	},

	onUnload : function ()
	{
		var t = Messages;
		if (t.delete_queue.length > 0) {
			MyAjax.reportsDelete ({
				ids : t.delete_queue,
				onSuccess : function (){},
				onFailure : function (){},
				caller    : 'Messages.onUnload'
			});
		}
	},

	// Check for battle reports
	/*
		options
		{
			category:
			wait:
		}
	*/
	checkMessages : function ( options )
	{
		var t = Messages;
		
		if ( t.battle_report_listeners.length === 0 ){
			return;
		}
		
		var category = ( options.category || 'all' ).toLowerCase(); // based on Didi idea (thanks)
		var waitTime = options.wait || 30000;
		
		RequestQueue.add ( 'checkMessages', function(){ doit(category); }, Math.randRange(waitTime, waitTime*1.5) );
		
		function doit ( category )
		{
			MyAjax.reports ({
				category  : category,
				onSuccess : function ( r ){
					var t = Messages;
					
					//debugLog ('reports:\n' + inspect (r, 7, 1));        
					for ( var i = r.length-1; i >= 0; i-- )
					{
						if ( r[i].report_type === 'BattleReport' && !r[i].read_at )
						{
							if ( t.read_list.indexOf( r[i].id ) < 0 ){
								t.read_list.push( r[i].id );
							}
						}
					}
					
					clearTimeout ( t.fetch_timer );
					
					if ( t.read_list.length > 0 ) {
						t.fetch_timer = setTimeout ( t.fetchNext, Math.randRange(3000,5000) );
					}
				},
				
				onFailure : function ( r ) {
				},
				
				caller    : 'Messages.checkMessages'
			});
		}
	},  

	fetchNext : function ()
	{
		var t = Messages;
		var id = t.read_list[0];
		if ( !id ){
			debugLog ('t.read_list BAD MESSAGE ID:\n'+ inspect (t.read_list, 8, 1));
			return;
		}
		
		clearTimeout ( t.fetch_timer );
		
		MyAjax.reportsRead ({
			report_id : id,
			onSuccess : function ( r ){
				var t = Messages;

				t.read_list.shift();
				
				t.gotBattleReport ( r );

				if ( t.read_list.length > 0 ){
					t.fetch_timer = setTimeout ( t.fetchNext, Math.randRange(3000,5000) );
				}
			},
			onFailure  : function () {
			},
			caller     : 'Messages.fetchNext'
		});
	},

	gotBattleReport : function ( r )
	{
		var t = Messages;
		
		if ( !r.report ) return;
		
		if ( DEBUG_MARCHES ){
			debugLog ('Read Message: '+ r.report.location.terrain +' , '+ r.report.location.x +','+  r.report.location.y );    
		}
		for ( var i=0; i < t.battle_report_listeners.length; i++ ){
			t.battle_report_listeners[i]( r );
		}
	},

	addBattleReportListener : function ( notify )
	{
		var t = Messages;
		t.battle_report_listeners.push( notify );
	},

	removeBattleReportListener : function ( notify )
	{
		var t = Messages;
		var i = t.battle_report_listeners.indexOf( notify );
		if ( i >= 0 ){
			t.battle_report_listeners.splice( i, 1 );
		}
	}

}; // END Messages


RequestQueue = {
	que : {},
	add : function ( id, func, max_wait_ms )
	{
		var t = RequestQueue;
		var now = serverTime();
		var max_wait = max_wait_ms / 1000;
		
		if ( isNaN( max_wait_ms ) ){
			max_wait = 1;
		}
		
		if ( t.que[id] ){
			if ( now + max_wait_ms >= t.que[id][2] ) {
				return;
			}
			clearTimeout( t.que[id][1] );  
		} 
		
		var timer = setTimeout ( myFunc, max_wait*1000, id );
		t.que[id] = [func, timer, now+max_wait];
		
		//dispQ ('RequestQueue.add id='+ id);  
		function myFunc ( id )
		{
			var t = RequestQueue;
			var func = t.que[id][0];
			delete t.que[id];
			//dispQ ('RequestQueue.doit id='+ id);  
			func();
		}
		
		// Translation
		function dispQ (str)
		{
			var now = serverTime();
			var msg = str + ' (now='+ now +'):\n';
			for ( var p in RequestQueue.que )
			{
				msg += p +' : '+ RequestQueue.que[p][1] +' : '+ RequestQueue.que[p][2] +' ('+ ( RequestQueue.que[p][2] - now ) +')\n';
			}
			debugLog ( msg );
		}   
	}, 

	isPending : function ( id )
	{
		var t = RequestQueue;
		return t.que[id] ? true : false;
	}
}; //END RequestQueue



Resources = {

	timer          : null,
	
	resources_type : [ 'gold', 'food', 'wood', 'ore', 'stone','blue_energy' ],
	
	rates          : { },
	
	last_refresh   : 0,
	
	updating      : false,
	
	init : function ( )
	{
		var t = Resources;
		
		t.rates = Seed.cities[ 0 ].figures.resource_rates;
	
		t.start ( );
	},
	
	start : function ( )
	{
		var t = Resources;
		t.timer = setInterval ( t.tick, 1000 );
	},
	
	stop : function ( )
	{
		var t = Resources;
		clearTimeout ( t.timer );
	},
	
	onUpdateCity : function ( )
	{
		var t = Resources;
		t.last_refresh = serverTime ( );
	},
	
	// this is used when performing an action involving a resource update
	// the resources argument is an object with every resource and what is added
	// ex: { gold: 50, food: 300, wood: 130, ore: 100, stone: 300, blue_energy: 0 }
	set : function ( resources )
	{
		var t = Resources;
		
		t.updating = true;
		
		for ( var type in resources )
		{
			Seed.cities[ 0 ].resources[ type ] = resources[ type ];
		}
		
		t.updating = false;
		
	},
	
	// this is used when performing an action involving a resource added
	// the resources argument is an object with every resource and what is added
	// ex: { gold: 50, food: 300, wood: 130, ore: 100, stone: 300, blue_energy: 0 }
	add : function ( resources )
	{
		var t = Resources;
		
		for ( var type in resources )
		{
			Seed.cities[ 0 ].resources[ type ] += resources[ type ];
		}
		
	},
	
	// this is used when performing an action involving a resource consumption
	// the resources argument is an object with every resource and what is consumed
	// ex: { gold: 50, food: 300, wood: 130, ore: 100, stone: 300, blue_energy: 0 }
	remove : function ( resources )
	{
		var t = Resources;
		
		for ( var type in resources )
		{
			Seed.cities[ 0 ].resources[ type ] -= resources[ type ];
		}
	},
	
	tick : function ( options )
	{
		var t = Resources;
		
		if ( t.updating ) return;
		
		var now = serverTime ( );

		for ( var idx = 0; idx < t.resources_type.length; idx++ )
		{
			var type = t.resources_type[ idx ];
			
			var production = t.rates[ type ];
			
			// if we don't have blue_energy yet
			if ( !production.rate ) continue;
			
			var value = Seed.cities[ 0 ].resources[ type ];
			
			if ( ( value < production.capacity && production.rate > 0 ) ||
				 ( value > 0 && production.rate < 0 )
			    ){
				
				if ( t.last_refresh )
				{
					// Case when a delay is to take into account when city data has just been updated
					value +=   ( ( production.rate / 3600 ) * ( now - t.last_refresh ) );
					t.last_refresh = 0;
				}
				else {
					value += ( production.rate / 3600 );
				}
				
				// in case of unit consumption (for food)
				if ( production.unit_consumption ) {
					value -= ( production.unit_consumption / 3600 );
				}
				
				// in case of general_salaries (for gold)
				if ( production.general_salaries ) {
					value -= ( production.general_salaries / 3600 );
				}
				
				if ( value > production.capactity ) {
					value = production.capacity;
				}
				
				// Case of food with negative production rate
				if ( value < 0 ) value = 0;
				
				Seed.cities[ 0 ].resources[ type ] = value;
			}
		}
	},

};// END Resourses

/*
 The Seed object contains a wealth of information including alliance membership, 
number of people in the alliance, facebook ids of each member, the ol's information 
(in alliances and alliance_membership), the s object contains all the buildings for 
the cities, whether or not the city is on defense, the list of generals, 
what and where the dragon is, a list of jobs 
(e.g. research, building, units training and pending training, current marches)
The marches alone say where the units are, whether or not they are retreating or 
attacking, general assigned, etc. 
*/

Seed = {
	cities			: [],	// cities
	city_idx		: {},   // 'indicies'
	city_time		: {},   // timestamps of last update
	city_init		: [],
	dragons			: {},
	generals		: {},
	jobs			: {},   // by city
	marches			: {},
	player			: {},
	quests			: {
		category		: [], 
		list			: [] 
	},
	requirements	: {
		building		: [],
		research		: [],
		resurrect		: [],
		unit			: []
	},
	stats			: {
		building		: {},
		dragons			: {},
		research		: {},
		resurrect		: {},
		unit			: {}
	},
	wildernesses    : {},   // by id
	// Save the totals for each job queue because because the responses of the requests are not real-time
	total			:{
		generals		: 0,
		marches			: 0,
		training		: {},
	},
	serverTimeOffset: 0,
	tickTimer		: 0,
	
	init : function ( options ) 
	{
		var t = Seed;
	
		t.fetchPlayer ({
			noCities : true,
			onSuccess: function ( r ) {
				verboseLog('Player data was Successfully requested from the server');
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			onFailure: function ( r ) {
				if ( options.onFailure ){
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			caller  : ( options.caller || '' ) + ', Seed.init'
		});
		
		clearInterval ( t.tickTimer );
		t.tickTimer = setInterval ( t.jobsTick, 1000 );
	},
	
	/*
		options
		{
			city_id:
			callback:
		}
	*/
	fetchCity : function ( options ) 
	{
		if ( !options.city_id ) return;
		
		var t = Seed;
		
		verboseLog('Attempting fetchCity ' + options.city_id);
		
		var p = {};
		
		var url 	= 'cities/'+ options.city_id +'.json';
		var method	= 'POST';
		
		Data.requests.cities.total++;
		
		new MyAjax.RequestDOA ({
			url		  : url,
			method	  : method,
			params	  : p,
			onSuccess : function( r ) {
				if ( r.errors ) 
				{
					Data.requests.cities.errors++;
					r.errmsg = r.errors;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				if ( r.timestamp ) {
					t.serverTimeOffset = parseInt( r.timestamp - (new Date().getTime() / 1000) );
				}
					
				try {
					t.updateCity( r.city, options.from_init );
					verboseLog('Updated coords for ' + r.city.name + ' are ' + r.city.x + '/' + r.city.y);
				} catch (e) {
					Data.requests.cities.errors++;
					r.errmsg = e.toString();
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
				}
				
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			onFailure : function ( r ) {
				Data.requests.cities.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || 'unknow') + ', Seed.fetchCity'
		});
	},

	/*
		options
		{
			city_id:
			callback:
		}
	*/
	fetchGenerals : function ( options )
	{
		if ( !options.city_id ) return;
		
		var p = {}
		
		var url 	= 'cities/'+ options.city_id +'/generals.json';
		var method	= 'GET';
		
		Data.requests.generals.total++;
		
		new MyAjax.RequestDOA ({
			url		  : url,
			method	  : method,
			params	  : p,
			onSuccess : function( r ) {
				if ( r.generals ) 
				{
					if ( options.onSuccess ){
						options.onSuccess ( r.generals );
					}
					else if ( options.callback ) {
						options.callback ( r.generals );
					}
				} 
				else {
					Data.requests.generals.errors++;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
				}
			},
			onFailure : function( r ) {
				Data.requests.generals.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', Seed.fetchGenerals'
		});
	},
	
	/*
		options
		{
			noPlayer:
			noCities:
			cities:
			callback:
		}
	*/
	fetchPlayer : function ( options ) 
	{
		var t = Seed;
		
		var city;
		
		if (!options) options = {};
		
		if ( options.noPlayer )
		{
			// options.cities (array)
			// only fetch the cities id in the array
			if ( options.cities && options.cities.length ) 
			{
				var last_city = options.cities.length-1;
				for ( var i = 0; i <= last_city;  i++ )
				{
					// First, check if exist the city_id (by Lord Mimir)
					if ( t.city_idx[options.cities[i]] !== undefined ) {
						t.fetchCity({
							city_id   : options.cities[i],
							onSuccess : ( i === last_city ) ? options.onSuccess : function(){},
							onFailure : ( i === last_city ) ? options.onFailure : function(){},
							callback  : ( i === last_city ) ? options.callback : function(){},
							delay     : Math.randRange(i*1000, i*3000),
							timeout   : 1000,
							caller    : (options.caller || '.unknow') + ', Seed.fetchCity'
						});
					}
				}
				return;
			}
		}
		
		var p = {};
		
		var url 	= 'player.json';
		var method	= 'GET';
		
		Data.requests.player.total++;
		
		new MyAjax.RequestDOA ({
			url	      : url,
			method	  : method,
			params	  : p,
			onSuccess : function( r ) {
				if ( r.errors ) 
				{
					Data.requests.player.errors++;
					r.errmsg = r.errors;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				if ( r.timestamp ) {
					t.serverTimeOffset = parseInt( r.timestamp - (new Date().getTime() / 1000) );
				}
					
				// set Seed.player
				t.player = r;
				
				// set Seed.wildernesses
				for ( var i = 0; i < r.player_wildernessed; i++) 
				{
					var wild = r.player_wildernessed[i];
					t.wildernessed[ wild.id ] = {
						level : wild.level,
						type  : wild.type,
						x     : wild.x,
						y     : wild.y,
					};
				}
					
				// options.cities (array)
				// only fetch the cities id in the array
				if ( options.cities && options.cities.length ) 
				{
					var last_city = options.cities.length-1;
					for ( var i = 0; i <= last_city;  i++ )
					{
						// First, check if exist the city_id (by Lord Mimir)
						if ( t.city_idx[options.cities[i]] !== undefined ) {
							t.fetchCity({
								city_id   : options.cities[i],
								onSuccess : ( i === last_city ) ? options.onSuccess : function(){},
								onFailure : ( i === last_city ) ? options.onFailure : function(){},
								callback  : ( i === last_city ) ? options.callback : function(){},
								delay     : Math.randRange(i*1000, i*3000),
								timeout   : 1000,
								caller    : (options.caller || '.unknow') + ', Seed.fetchCity'
							});
						}
					}
					return;
				}
				
				// Fill the city_init array 
				// (used here & in the StartUp process so it must be before to verified options.noCities)
				var i = 0;
				for ( city in r.cities ) 
				{
					if ( t.city_init[i] === undefined ) {
						t.city_init[i] = {};
					}
					t.city_init[i].id = r.cities[city].id;
					t.city_init[i].name = r.cities[city].name;
					t.city_init[i].type = city;
					i++;
				}
				
				// option.noCities (boolean)
				// Don't fetch Cities if we are from StartUp, because we do from there
				if ( options.noCities ) 
				{
					if ( options.onSuccess ) {
						options.onSuccess ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				
				// OK, fetch all cities

				try {
					var last_city = t.city_init.length - 1;
					for ( var i=0; i <= last_city; i++ )
					{
						if ( t.city_init[i].timer ){
							clearTimeout ( t.city_init[i].timer );
						}
						
						t.fetchCity({
							city_id   : t.city_init[i].id,
							onSuccess : ( i === last_city ) ? options.onSuccess : function(){},
							onFailure : ( i === last_city ) ? options.onFailure : function(){},
							callback  : ( i === last_city ) ? options.callback : function(){},
							delay     : Math.randRange(i*1000, i*3000),
							timeout   : 1000,
							caller    : (options.caller || '.unknow') + ', Seed.fetchCity'
						});
					}
				} catch (e) {
					Data.requests.player.errors++;
					r.errmsg = e.toString();
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
				}
				/*
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
				*/
			},
			
			onFailure  : function ( r ) {
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', Seed.fetchPlayer'
		});
	},
	
	/* Jobs Tick
	* Called once per second - to check for job completion (Fixed by Lord Mimir)
	*/
	jobsTick : function () 
	{ 
		var t = Seed;
		var now = parseInt( serverTime() );
		
		var refresh_cities = [];

		// Check for job completion
		
		/* Cities */
		for ( var city_id in t.jobs )
		{
			/* Jobs */
			for ( var job_id in t.jobs[ city_id ] ) 
			{
				var job = t.jobs[ city_id ][ job_id ];
				
				if ( job.done ) 
				{
					if ( now > job.run_at - 2 )
					{
					
						switch ( job.queue ) {
						case 'building':
							Buildings.setLevel ( city_id, job.city_building_id, job.level );
							break;
						case 'march':
							var march = t.marches[ job.march_id ];
							if ( !march ) break;
							switch ( march.status ) {
							case 'marching':

								Messages.marchAtTarget();
								
								break;
								
							case 'retreating':
								var city = t.cities[ t.city_idx[march.city_id] ];
								
								// Update General
								// Check if we have a general in the march, because Transports dont have generals (by Didi)
								if ( march.general_id ) {
									t.generals[ march.general_id ].victories = march.general.victories;
									t.generals[ march.general_id ].rank = march.general.rank;
									t.generals[ march.general_id ].x = march.x;
									t.generals[ march.general_id ].y = march.y;
									t.generals[ march.general_id ].status = march.status;
									t.generals[ march.general_id ].busy = false;
									t.total.generals += 1;
								}
								
								// Update Units and Dragons
								for( var unit_type in march.units )
								{
									if( DRAGONS_REGEXP.test( unit_type ) )
									{
											t.dragons[ unit_type ].is_in_city = true;
											// Refresh city when dragon in march (based in Didi idea)
											for (var idx = 0; idx < DRAGONS_NAMES.length; idx++)
											{
												if ( DRAGONS_NAMES[ idx ] === unit_type ) {
													t.fetchCity ({
														city_id   : idx,
														onSuccess : function(){},
														onFailure : function(){},
														caller    : 'Seed.tick'
													});
												}
											}
									}
									else {
										city.units[ unit_type ] += march.units[ unit_type ];
									}
								}
								
								break;
							}
							break;
						case 'research':
							t.player.research[ job.research_type ] = job.level;
							break;
						case 'units':
							t.cities[0].units[ job.unit_type ] += job.quantity;
							t.total.training[ city_id ]--;
							break;
						default:
							t.fetchCity ({
								city_id   : city_id,
								callback : function( r ){},
								caller    : 'Seed.tick'
							});
						}

						// Delete the Job
						delete ( t.jobs[ city_id ][ job_id ] );
					}
				}
				
				else {
					if ( now > ( job.run_at - 5 ) )	{
					
						job.done = true;
						
						if ( job.march_id ) 
						{
							var march = t.marches[ job.march_id ];
							if ( march && march.status === 'marching' )
							{
								t.fetchCity ({
									city_id   : city_id,
									callback : function( r ){},
									caller    : 'Seed.tick'
								});
								
								// Update Data Map in case of wilderness
								if ( /(Anthropus|Bog)/.test(march.terrain_type) == false )
								{
									Map.tileAt ({
										x         : march.x,
										y         : march.y,
										onSuccess : function(){},
										onFailure : function(){},
										caller    : 'Seed.tick'
									});
								}
							}
						}
					}
				}
			}
		}
	},
	
	updateCity : function ( city, from_init ) 
	{
		var t = Seed;
		
		if ( !city ) return;
		
		verboseLog('Updating City values: ' + city.name);
		
		var now = serverTime(); 
		
		// Fixed by Lord Mimir (thanks you very much!)
		var city_idx;    
		if ( typeof t.city_idx[city.id] !== 'undefined' && t.city_idx[city.id] !== null )
		{
			city_idx = t.city_idx[city.id];
		}
		else if ( city.type === 'Capital' ) 
		{
			city_idx = 0;
		} 
		else {
			city_idx = OUTPOST_TYPE_INDEX[ city.outpost_type ] || t.cities.length;
			
			if ( city_idx === 0 ) city_idx = 1; // I think that can never be zero here (La Larva)

			if ( typeof t.cities[city_idx] !== 'undefined' && t.cities[city_idx] !== null )
			{
				t.city_idx[t.cities[city_idx].id] = t.cities.length;
				t.cities[t.cities.length] = t.cities[city_idx];
			}
		}
		
		t.cities[city_idx] = city;
		
		t.city_idx[city.id] = city_idx;
		
		t.city_time[city.id] = now;  
		
		
		// add Dragons object (by Didi)
		// Check each city - Wham & Larvitus
		for (var i=0; i < t.cities.length; i++)
		{
			// skip undefined cities
			if ( !t.cities[ i ] ) continue;
		
			var dragon_city = t.cities[ i ];
		
			var dragon_name = DRAGONS_NAMES[ i ];    // city_idx
		
			var dragon = dragon_city[ DRAGON_OBJ_ID[ i ].toLowerCase() ];  // city_idx
			
			if ( dragon )
			{
				var aerial_combat_level = (t.player.research['AerialCombat']) ? t.player.research['AerialCombat'] : 0; 
				
				dragon.index      = i;  // city_idx
				dragon.name       = dragon_name;
				dragon.armors     = t.checkDragonArmors( dragon_name );
				dragon.city_id    = dragon_city.id;
				dragon.can_attack = ( dragon.level >= 8 && dragon.armors === 4 && aerial_combat_level > 0 );
				dragon.cure_at    = now;
			
				if ( dragon.can_attack && dragon.life !== dragon.maximum_life ) 
				{
						dragon.cure_at += ( ( dragon.maximum_life - dragon.life ) / dragon.recovery_rate) * 3600;
				}
				
				t.dragons[ dragon_name ] = dragon;
			}
		}
		
		
		// Only Capital City
		if ( city_idx === 0 ) 
		{
			// update Resources.last_refresh time
			Resources.onUpdateCity();

			// update Seed.generals
			for ( var i=0; i < city.generals.length; i++ )
			{
				t.generals[ city.generals[i].id ] = city.generals[i];
			}
			t.total.generals = city.generals.length;
			
			// update Seed.marches
			t.total.marches = 0;
			for ( var i=0; i < city.marches.length; i++ )
			{
				var march = city.marches[i];
				
				t.marches[ march.id ] = march.cloneProps();
				
				if ( march.general_id ){

				t.total.marches++;
					
					// Do not know why, but some generals are not defined at times ( La Larva )
					if ( !t.generals[ march.general_id ] ) {
						t.generals[ march.general_id ] = {};
						console.log('ERROR in updateCity() : could not be found General Id: ' + march.general_id + ' in Seed.generals. Creating an entry to fix the problem.');
					}
					
					t.generals[ march.general_id ].busy = true;
					t.generals[ march.general_id ].x = march.x;
					t.generals[ march.general_id ].y = march.y;
					t.generals[ march.general_id ].status = march.status;
				}
				
				// check if some dragon is in the march units and update his state in Seed.dragons
				for( var unit_type in march.units )
				{
					if( DRAGONS_REGEXP.test( unit_type ) )
				
					{
						if ( t.dragons[unit_type] && t.dragons[unit_type].is_in_city !== undefined ) // by Didi
						{
							t.dragons[unit_type].is_in_city = false;
						}
					}
				}
			
				
				t.marches[march.id].target_type = march.destination_name  ?  'City' : march.terrain_type;
			}
		}

		
		// Check and Add Jobs
		if ( !t.jobs[ city.id ] ) {
			t.jobs[ city.id ] = {};
		}
		
		t.total.training[ city.id ] = 0;
		
		for ( var i=0; i < city.jobs.length; i++ )
		{
			var job = city.jobs[i];
			t.checkAddJob ( job );
			switch (job.queue )
			{
			case 'units':
				t.total.training[ city.id ]++;
				break;
			}
		}
		
	
		// Calculate speed_multiplier for the trainings
		// based on training camps of all cities and
		// stores the value in capital city figures object
		var speed_multiplier = 0;

		for (var i = 0; i < t.cities.length; i++)
		{
			if ( !t.cities[ i ] || i === OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] ) continue;

			var build_type = ( i == 0 ? 'Garrison' : 'TrainingCamp' );
			
			for (var j = 0; j < t.cities[ i ].buildings.length; j++)
			{
				if ( t.cities[ i ].buildings[ j ].type === build_type )
				{
					speed_multiplier += t.cities[ i ].buildings[ j ].level;
				}
			}
		}
		speed_multiplier /= 10;
		if ( !t.cities[ 0 ].figures.unit ) {
			t.cities[ 0 ].figures.unit = {};
		}
		t.cities[ 0 ].figures.unit.speed_multiplier = speed_multiplier;
		
		
		
		if ( from_init ) {
			for ( var i=0; i < t.city_init.length; i++ ){
				if ( t.city_init[i].id === city.id && !t.city_init[i].loaded) {
					t.city_init[i].loaded = true;
					var message = 'City ' + city.id + ' Successfully initialised';
					verboseLog(message);
					console.log(message);
				}
			}
		} else {
			verboseLog('City ' + city.id + ' Successfully updated');
		}

	},
	
	// Function to count number of piece armor (by Didi)
	checkDragonArmors : function ( dragon_type )
	{
		var t = Seed;
		var armors = ['BodyArmor','ClawGuards','TailGuard','Helmet'];
		var total = 0;
		
		for ( var i = 0; i < armors.length; i++ )
		{
			if ( t.getItem( dragon_type + armors[i] ) !== 0 ) {
				total++;
			}
		}
		return total;
	},

	// Returns the quantity of the specified item type or zero if the item type is not found
	getItem : function ( type ) 
	{
		var t = Seed;
		return t.player.items[type] || 0;
	},

	checkAddJob : function ( job )
	{
		var t = Seed;
		var city_id = job.city_id;
		
		if ( !job.run_at )
		{
			debugLog ('checkAddJob job.run_at is null:\n'+ inspect (job, 5, 1));
			return;
		}    
		
		if ( job.queue === 'march' )
		{
			if ( t.marches[job.march_id] ) 
			{
				t.marches[job.march_id].run_at   = job.run_at;
				t.marches[job.march_id].duration = job.duration;
				t.marches[job.march_id].job_id   = job.id;
				
				var march = t.marches[job.march_id];
				// Check if we have a general in the march, because Transports dont have generals (by Didi)
				if ( march.general_id ) {
					t.generals[ march.general_id ].busy = true;
					t.generals[ march.general_id ].x = t.marches[job.march_id].x;
					t.generals[ march.general_id ].y = t.marches[job.march_id].y;
					t.generals[ march.general_id ].status = t.marches[job.march_id].status;
				}
			}
		} 

		t.jobs[ city_id ][ job.id ] = job; //.cloneProps ();
	},

}; // END Seed




Translation = {
	loaded : false,
	
	data	: {},

	available_langs : {
		 da : true 
		,de : true
		,en : true
		,es : true
		,fr : true 
		,gr : false
		,id : false
		,it : true
		,nl : true
		,pl : true
		,pt : false
		,ru : false
		,sv : true
		,tr : true
	},
	
	/* WARNING: DON'T CHANGE THIS ORDER */
	_section : [
		 'items'
		,'common'
		,'buildings'
		,'messages'
		,'dialogs'
		,'troops'
		,'map'
		,'alliances'
		,'research'
		,'quests'
		,'levels'
		,'confirmations'
	],
	
	// used by the translate function to check for missing translations
	missing:{}, 
	
	init : function ( options ) 
	{
		var t = Translation;
		t.fetchLocale({
			onSuccess : function ( r ) {
				verboseLog('Locale data was Successfully requested from the sever');
				t.loaded = true;
				t.fixResults();
				if ( options.onSuccess ) {
					options.onSuccess ( r );
				}
				//This is only for programming purposes
				/*
				var str = '"var_name";"translation"<br>';
				for (var i=0; i < Translation._section.length; i++){
					for (var_name in Translation.data[Translation._section[i]]){
						str +=  '"' + var_name + '";"' +Translation[Translation._section[i]]( var_name ) + '"<br>' ;
					}
				}
				debugLog ( str );
				*/
			},
			onFailure : function ( r ) {
				if ( options.onFailure ){
					options.onFailure ( r );
				}
			},
			caller : (options.caller || '.unknow') + ', Translation.init'
		});
	},

	fetchLocale : function ( options ) 
	{
		var t = Translation;
		
		var p = {};
		p['_swf_session_id'] = SESSION_ID;
		
		new MyAjax.RequestDOA ({
			url		: 'locales/' + ( t.available_langs[LANG_CODE] ? LANG_CODE : 'en') + '.xml',
			method	: 'GET',
			params	: p,
			onSuccess : function ( r ) {
				try {
					t.parseXML( r );
					
				} catch (e) {
					if ( options.onFailure ) {
						r.errmsg = e.toString();
						options.onFailure ( r );
					}
					return;
				}
				if ( options.onSuccess ) {
					options.onSuccess ( r );
				}
			},
			onFailure : function ( r ) {
				if ( r.errmsg.indexOf('404') !== -1 ) {
					var p = {};
					p['_swf_session_id'] = SESSION_ID;
					new MyAjax.RequestDOA ({
						url		: 'locales/en.xml',
						method	: 'GET',
						params	: p,
						onSuccess : function( r ) {
							try {
								t.parseXML(r);
							} catch (e) {
								if ( options.onFailure ) {
									r.errmsg = e.toString();
									options.onFailure ( r );
								}
							}
						},
						onFailure : function( r ) {
							if ( options.onFailure ) {
								options.onFailure ( r );
							}
						},
						caller  : (options.caller || '.unknow') + '.fetchLocale'
					});
				}
				else if ( options.onFailure ) {
					options.onFailure ( r );
				}
			},
			caller  : (options.caller || '.unknow') + '.fetchLocale'
		});
	},
	
	parseXML : function( xml_string )
	{
		var t = Translation;
		var fragment = [];
	
		fragment.push( '<?xml version="1.0" encoding="UTF-8"?>' );
		fragment.push( '<translations>' );
		
		// sections to remove
		var remove_sections = ['dragons','errors'];
		for ( var i=0; i < remove_sections.length; i++ )
		{
			var start = xml_string.indexOf('<'+remove_sections[i]+'>');
			var end = xml_string.indexOf('</'+remove_sections[i]+'>') + remove_sections[i].length + 3;
			xml_string = xml_string.substring(1, start) + xml_string.substring(end);
		}
		
		// sections to add
		for ( i = 0; i < t._section.length; i++ )
		{
			var start = xml_string.indexOf( '<' + t._section[i] + '>' );
			var end = xml_string.indexOf( '</' + t._section[i] + '>') + t._section[i].length + 3;
			fragment.push( xml_string.substring( start, end ) );
			xml_string = xml_string.substring( 1, start ) + xml_string.substring( end) ;
		}
		
		fragment.push( '</translations>' );

		var xml_obj = new XML.ObjTree();
		t.data = xml_obj.parseXML( fragment.join('').replace(/\n/g,'') );

		if ( t.data.translations ) {
			t.data = t.data.translations;
		} else {
			verboseLog('<b>ERROR</b> in the XML file structure: <b><translations></b> element not found!');
		}
	},
	
	fixResults : function()
	{
		var t = Translation.data;
		
		// Convert Objects in flat Object
		// ex: 
		//     root-key : { title: '', content-1: { name: '', desc: ''} }
		//
		// become
		//
		//     root-key-title: '' & root-key-content-1-name : '' & root-key-content-1-desc : ''
		// 
		function objectToFlat ( obj )
		{
			var r = {};
			for ( var key in obj )
			{
				if ( typeof obj[key] === 'object' )
				{
					for ( var subkey in obj[key] )
					{
						if ( typeof ( obj[key] )[subkey] === 'object' )
						{
							for ( var subsubkey in ( obj[key] )[subkey] )
							{
								if ( subsubkey === 'title' || subsubkey === 'name' )
								{
									r[key+'-'+subkey] = ( ( obj[key] )[subkey] )[subsubkey];
								} 
								else {
									r[key+'-'+subkey+'-'+subsubkey] = ( ( obj[key] )[subkey] )[subsubkey];
								}
							}
						} 
						else {
							if ( subkey === 'title' || subkey === 'name' )
							{
								r[key] = ( obj[key] )[subkey];
							} 
							else {
								r[key+'-'+subkey] = ( obj[key] )[subkey];
							}
						}
					}
				} else {
					r[key] = obj[key];
				}
			}
			return r;
		}
		
		var section = ['confirmations','quests','dialogs','messages']; 
		
		for ( var i=0; i < section.length; i++ )
		{
			t[section[i]] = objectToFlat( t[section[i]] );
		}
			
		// Jawz
		/*
		var quests = {};
		for(var key in t.quests){
			if(typeof t.quests[key] == 'object'){
				for (var subkey in t.quests[key]){
					switch (subkey) {
					case 'title' :
						quests[key] = (t.quests[key])[subkey];
						break;
					case 'objectives' :
						quests[key+'-'+subkey] = (t.quests[key])[subkey];
						break;
					default : break;
					}
				}
			} else {
				quests[key] = t.quests[key];
			}
		}
		t['quests'] = quests.cloneProps();
		*/
		// End Jawz
		
		t.common.information = t.common.info;
		t.common.omit = t.common.skip;
		t.common['spy-on'] = t.common.spy;
		t.dialogs.researching = t.dialogs.research;
		
		t.common['enter-coords'] = t.dialogs['attack-screen-enter-coords'];
		t.common['your-player'] = t.dialogs['change-realm-your-player'];
		t.common['battle-report'] = t.messages['battle-report-title'];
		t.common['auto-collection-of-resources'] = t.dialogs['boost-collect-day'].replace(/:/,'');
		
		t.common.levels = findSimilarWord( t.common.level, t.messages['spy-tip-prefix'] );
		
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
	
	_normalize : function ( str )
	{
		return ( str||'' ).toLowerCase().replace(/ /g,'-');
	},
	
	getContent : function( section, key, subkey )
	{
		var t = Translation;
		key = t._normalize(key);
		if ( t.data[section] !== undefined ) 
		{
			if ( ( t.data[section] )[key] !== undefined ) 
			{
				return subkey ? ( ( t.data[section] )[key] )[subkey] : ( t.data[section] )[key];
			}
		}
		return false;
	},
	
	buildings : function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'buildings', key, subkey );
	},
	
	common : function( key )
	{
		return Translation.getContent( 'common', key );
	},
	
	items : function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'items', key, subkey );
	},
	
	dialogs : function( key )
	{
		return Translation.getContent( 'dialogs', key );
	},
	
	levels : function( key )
	{
		return Translation.getContent( 'levels', key, 'title' );
	},
	
	map : function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'map', key, subkey );
	},
	
	messages : function( key )
	{
		return Translation.getContent( 'messages', key );
	},
	
	troops :  function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'troops', key, subkey );
	},
	
	research :  function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'research', key, subkey );
	},
	
	quests :  function( key, subkey ){
		//subkey = subkey != undefined ? subkey : 'title';
		return Translation.getContent( 'quests', key, subkey );
	},
	
	confirmations :  function( key, subkey ){
		//subkey = subkey != undefined ? subkey : 'title';
		return Translation.getContent( 'confirmations', key, subkey );
	},
	
	alliances :  function( key, subkey ){
		subkey = subkey != undefined ? subkey : 'title';
		return Translation.getContent( 'alliances', key, subkey );
	},
	
	errors : function( key, subkey )
	{
		//subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'activerecord', key, subkey );
	},
	
}; // END Translation

// Provide language translation services
translate = function( text ) 
{
	//if (text===undefined) return;
	
	if ( LANG_OBJECT[text] !== undefined ) {
		return LANG_OBJECT[text];
	}
	else if ( Translation.loaded ){
		var new_text;
		for ( var i = 0; i < Translation._section.length; i++ )
		{
			new_text = Translation[Translation._section[i]]( text );
			if ( new_text ){
				return new_text;
			}
		}
		
		if ( IS_NOT_NATIVE_LANG && Translation.missing[text] === undefined ) {
			Translation.missing[text] = 1;
			if ( Tabs.Logs ) {
				debugLog( '( Translate ) -> ' + text );
			}
		}
	}
	
	return text;
};


//****************
// Functions
//****************

//Didi modif
function miles( num ) {
  var n = '';
  var m = String( num );
  var sign = '';
  if ( m.substr( 0, 1 ) === '-' || m.substr(0,1) === '+' ) {
  	sign = m.substr( 0, 1 );
  	m = m.substr( 1 );
  }
  while ( m.length > 3 ) {
    n = ',' + m.substr( m.length - 3 ) + n;
    m = m.substr( 0, m.length - 3 );
  }
  return sign + m + n;
}

function objAddTo ( o, name, val )
{
	if ( !o[name] )
	{
		o[name] = val;
	} 
	else {
		o[name] += val;
	}
}

function getGeneralsList ( city_idx )
{
	var ret = {};
	var generals = Seed.cities[city_idx].generals;
	for (var i=0; i < generals.length; i++)
	{
		ret[generals[i].id] = generals[i].name +' ('+ generals[i].rank +')';
	}
	return ret;
}

function getUnitNumbers ( city_idx, unit_type ) 
{
	var city = ( typeof city_idx === 'number' ) ? Seed.cities[city_idx] : city_idx;
	var incity = city.units[unit_type] ? city.units[unit_type] : 0;
	var marches = 0;
	for ( var id in Seed.marches )
	{
		for ( var name in Seed.marches[id].units )
		{
			if ( unit_type === name ) {
				marches += Seed.marches[id].units[name];
			}
		}
	}
	return { incity: incity, marches: marches, total: incity+marches };
}

function checkAvailableUnits ( city_idx, level )
{
	var units = Data.options.attacks.units[level];
	var total = 0;
	for ( var unit_type in units )
	{
		if ( units[unit_type] > 0 )
		{
			total += units[unit_type];
			if ( Seed.cities[city_idx].units[unit_type] < units[unit_type] )
			{
				return translate('Not enough') +' '+ translate(unit_type);
			}
		}
	}
	if ( total <= 0 ){
		return translate('No Troops Defined');
	}
	return null;
}


function getAvailableDragon () {
	var dragon;
	var found = false;
	for ( var dragon_type in Seed.dragons )
	{
		dragon = Seed.dragons[dragon_type];
		var isInCity	= dragon.is_in_city;
		var canAttack	= dragon.can_attack;
		if ( dragon.can_attack && 
			 dragon.is_in_city &&
			((dragon.life / dragon.maximum_life) >= 0.75)
		   ){
				found = true;
				break;
		}
	}
	if (found)
		return dragon.name;
	else
		return null;
}

function getAvailableGeneral ( by_rank )
{
	var keys = getKeys (Seed.generals);
	
	// We chose the option "by_rank" to sort the generals by rank of lower to higher 
	// for cases where the objective is level 1 and we need to find a general with 
	// less than 5 ranks.. if not.. we make a random sort of the generals list to
	// take a random general.
	if ( by_rank ) {
		keys.sort( function(a,b){return Seed.generals[a].rank - Seed.generals[b].rank;} );
	} else {
		// Remove generals with ranks lower that 5 stars from the list
		for ( var i=0; i < keys.length; i++ )
		{
			if ( Seed.generals[ keys[i] ].rank < 5 ) {
				keys.splice( i , 1 );
			}
		}
		keys.shuffle();
	}
	
	for ( var i=0; i < keys.length; i++ )
	{
		var general = Seed.generals[ keys[i] ];
		if ( !general.busy )
		{
			return general;
		}
	}
	return null;
}


function getJobs ( queue_type, city_idx )
{
	// in case the city is not been defined in Seed.updateCity return empty array. (by Lord Mimir)
	if ( !Seed.cities[city_idx || 0] ) return [];

	var city_id = Seed.cities[ (city_idx || 0) ].id;
	var jobs = Seed.jobs[city_id];
	var queue = [];
	
	var jobs_id = getKeys ( jobs );
	for ( var i = 0; i < jobs_id.length; i++ )
	{
		var id = jobs_id[ i ];
		if ( jobs[ id ].queue == queue_type ) {
			queue.push( jobs[ id ] );
		}
	}

	return queue;
}
function getMarchTime (x, y, units) {
	var dist = getDistance(Map.x, Map.y, x, y);
	var speed = 99999;
	var units_names = getKeys( units );
	for ( var i = 0; i < units_names.length; i++ )
	{
		var name = units_names[i];
		if ( units[ name ] > 0 )
		{
			if ( Seed.stats.unit[ name ] ) {
				if ( Seed.stats.unit[ name ].speed < speed ) speed = Seed.stats.unit[ name ].speed;
			}
			else {
				speed = 100;
			}
		}
	}
	var time = dist / ((Seed.cities[0].figures.marches.speed_multiplier * speed) /6000) + 30;
	return time;
}

//******************************** Info Tab *****************************
Tabs.Info = {
	tab_order	: INFO_TAB_ORDER,
	tab_label	: 'Info',
	tab_disabled: !INFO_TAB_ENABLE,
	
	$container	: null,
	timer		: null,
	show_flash  : true,
	show_fulscreen  : false,
	
	units_type	: ['Porter','Conscript','Spy','Halberdsman','Minotaur','Longbowman','SwiftStrikeDragon','BattleDragon','ArmoredTransport','Giant','FireMirror','PackDragon','AquaTroop','StoneTroop','FireTroop','WindTroop','IceTroop', 'FrostGiant', 'SwampTroop', 'ForestTroop', 'DesertTroop'],
	
	resources_type  : [ 'gold', 'food', 'wood', 'ore', 'stone','blue_energy' ],
	
	items_arsenal   : [ 'AquaTroopRespirator', 'StoneTroopItem', 'FireTroopItem', 'WindTroopItem', 'IceTroopItem', 'SwampTroopItem', 'FrostGiantItem', 'ForestTroopItem', 'AnthropusTalisman' ],

	init : function ( div )
	{
		var t = Tabs.Info;
		t.$container = $J( div );
		
		var html = 
		 '<ul class=tabs>'
		+'	<li class="tab first">'
		+'		<a id=' + setUID('Tabs.Info.tabSummary')  + '>' 
		+'		<span class="' + UID['doa-icons'] + ' i-Summary"></span>'
		+ 			translate('Summary')  
		+'		</a>'
		+'	</li>'
		+'	<li class=tab>'
		+'		<a id='         + setUID('Tabs.Info.tabLogs')    + '>'
		+'		<span class="' + UID['doa-icons'] + ' i-Logs"></span>'
		+ 			translate('Logs')
		+'		</a>'
		+'	</li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Info.title') + ' class=' + UID['title'] + '></div>'
		+'<table id=' + setUID('Tabs.Info.toolbar') + ' width="100%">'
		+'	<tr>'
		+'	</tr>'
		+'</table>'
		+'<div id=' + setUID('Tabs.Info.header') + '>'
		+'</div>'
		+'<div id=' + setUID('Tabs.Info.content') + '>'
		+'	<div id=' + setUID('Tabs.Info.tabSummary.content') + '>'
		+'	</div>'
		+'	<div id=' + setUID('Tabs.Info.tabLogs.content') + '>'
		+'		<table id=' + setUID('Tabs.Info.tabLogs.table') + ' class=' + UID['table_console'] + ' cellspacing=1>'
		+'		<tr>'
		+'			<td class=' + UID['underline'] + '></td>'
		+'			<td class=' + UID['underline'] + ' width=95%></td>'
		+'		<tr>'
		+'		</table>'
		+'	</div>'
		+'</div>';
		
		t.$container.html( html );
		
		
		Tabs.Logs.content.push( $id(UID['Tabs.Info.tabLogs.table']) );
		
		
		// Event Listeners
		$J( '#'+UID['Tabs.Info.tabSummary']  ).click ( {current_tab:0}, t.showSubTab );
		$J( '#'+UID['Tabs.Info.tabLogs']    ).click ( {current_tab:1}, t.showSubTab );
		
		//  Styles
		$J( '#'+UID['Tabs.Info.tabSummary.content']  )
		.attr({
			class		: 'no-overflow'
		})
		.css({
			'position'	: 'absolute',
			'display'	: 'none',
			'height'	: '675px',
			'max-height': '675px'
		});
		
		$J( '#'+UID['Tabs.Info.tabLogs.content']  )
		.attr({
			class		: 'overflow-y'
		})
		.css({
			'position'	: 'absolute',
			'display'	: 'none',
			'height'	: '675px',
			'max-height': '675px'
		});
		
	},
	
	show : function (){
		var t = Tabs.Info;
		
		t.showSubTab ( {data:{ current_tab: Data.options.info.current_tab }} );
		
		t.timer = setInterval ( t.showStuff, 1000 );
	},
	
	hide : function (){
		var t = Tabs.Info;
		clearInterval ( t.timer );
	},
	
	showSubTab : function( event )
	{
		var t = Tabs.Info;
		
		var current_tab = event.data.current_tab;
		
		Data.options.info.current_tab = current_tab;
		
		t.current_tab = current_tab;

		var tab_name, title;
		switch ( current_tab )
		{
		case 0: tab_name = 'tabSummary'  ; title = translate('Summary'); break;
		case 1: tab_name = 'tabLogs'     ; title = translate('Actions'); break;
		}
		
		$J('#'+UID['Tabs.Info.' + t.last_tab_name])
		.css('z-index', '0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Info.' + tab_name])
		.css('z-index', '1')
		.addClass('selected');
		
		$J('#'+UID['Tabs.Info.' + t.last_tab_name + '.content']).hide();
		$J('#'+UID['Tabs.Info.' + tab_name + '.content']).show();
		
		t.last_tab_name = tab_name;
		
		$J('#'+UID['Tabs.Info.title'])
		.html( title );
		
		t[tab_name] ();
	},
	
	tabSummary : function ( )
	{
		var t = Tabs.Info;
		
		var city = Seed.cities[0];
		
		$J( '#'+UID['Tabs.Info.toolbar'] ).
		html( '' ).
		append(	$J('<tr />').
			append( $J('<td />').
				append( $J('<input />').
					attr({
						type		: 'button',
						value		: translate('Refresh')
					}).
					click ( refresh )
				).
				append( $J('<input />').
					attr({
						type		: 'button',
						value		: translate('Toggle Flash'),
						class      : UID[t.show_flash ? 'btn_on' : 'btn_off']
					}).
					css({ 
						marginLeft : '5px',
					}).
					click ( toggleFlash )
				).
				append( $J('<input />').
					attr({
						type		: 'button',
						value		: translate('Fullscreen Map'),
						class      : UID[t.show_fulscreen ? 'btn_on' : 'btn_off']
					}).
					css({ 
						marginLeft : '5px',
					}).
					click ( toggleFulscreen )
				)
			)
		);
		

		function refresh ()
		{
			var t = Tabs.Info;
			
			debugLog('fetchPlayer from Tabs.Info refresh');
			
			var msg = $J.msg({ 
				content 	 : translate('Refresh') + '...',
				target		 : t.$container,
				clickUnblock : false,
				timeOut 	 : 6000
				
			});
			
			Seed.fetchPlayer ({
				cities    : [Seed.cities[0].id],
				callback  : function() {
					Tabs.Info.showStuff();
				},
				delay     : 250,
				caller    : 'Tabs.Info.refresh'
			});
		}
		function toggleFulscreen ( event )
		{
			t.show_fulscreen = !t.show_fulscreen;
			event.target.className = UID[ t.show_fulscreen ? 'btn_on' : 'btn_off'];
			swf_width = t.show_fulscreen ? '100%':'760px';
			document.getElementById('container').style.width= swf_width ;
			document.getElementById('castlemania_swf').style.width= swf_width ;
			document.getElementById('castlemania_swf_container').style.width= swf_width ;
		}
		
		function toggleFlash ( event )
		{
			t.show_flash = !t.show_flash;
			event.target.className = UID[ t.show_flash ? 'btn_on' : 'btn_off'];
			$J('#container').toggle();
		}
		
		
		$J( '#'+UID['Tabs.Info.header'] ).
		html( '' ).
		append( $J('<div />').
			attr({
				class	: UID['subtitle']
			}).
			append ($J('<table />').
				width('100%').
				append(	$J('<tr />').
					append( $J('<td />').
						css({ 
							textAlign   : 'left',
							paddingLeft : '5px'
						}).
						html ( ( Seed.player.alliance ) ? Seed.player.alliance.name : '' )
					).
					append( $J('<td />').
						css({ 
							textAlign : 'center',
							width	  : '50%'
						}).
						html('<font color=yellow>' + city.name + '</font>')
					).
					append( $J('<td />').
						css({ 
							textAlign    : 'right',
							paddingRight : '5px'
						}).
						append( $J('<input />').
							attr({
								type	: 'button',
								class   : UID[ (Seed.cities[0].defended ? 'btn_off' : 'btn_on') ],
								value	: translate(Seed.cities[0].defended?'Defend':'Hiding').toUpperCase()
							}).
							click ( changeWall )
						)
					)
				)
			)
		);
		
		function changeWall (event)
		{
			var button = event.target;
			new MyAjax.defendedCity({
				city_id   : Seed.cities[0].id,
				defended  : !Seed.cities[0].defended,
				onSuccess : function (){
					// Change again when recibe the real state from cityUpdate
					button.className = UID[ (Seed.cities[0].defended ? 'btn_off' : 'btn_on') ];
					button.value = translate( Seed.cities[0].defended ? 'Defend' : 'Hiding' ).toUpperCase();
				},
				onFailure : function() { },
				delay     : 500,
				caller    : 'Tabs.Info.changeWall'
			});
			//This is just for a quick visual change, real change occurs in onSuccess event
			var state = !Seed.cities[0].defended;
			button.className = UID[ (state ? 'btn_off' : 'btn_on') ];
			button.value = translate( state ? 'Defend' : 'Hiding' ).toUpperCase();
		}
		
		
		t.showStuff();
	},

	showStuff : function (){
	
		if ( Data.options.info.current_tab != 0 ) return;
	
		var t = Tabs.Info;
		
		var city = Seed.cities[0];
		
		var html = '';

		 
		 // Polulation
		html += 
		 '<table class="' + UID['table'] + ' zebra" style="margin-top:3px" width=100%>'
		+'	<tr>'
		+'		<th>' + translate('Population') + '</th>'
		+'		<th>' + translate('Laborers') + '</th>'
		+'		<th>' + translate('Army') + '</th>'
		+'		<th>' + translate('IdlePopulation').replace( translate('Population'), '' ) + '</th>'
		+'		<th>' + translate('Capacity') + '</th>'
		+'	</tr>'
		+'	<tr valign=top>'
		+'		<td>'
		+'			<span class="' + UID['doa-icons'] + ' i-population" style="position:absolute;"></span>'
		+' 			<span class="jewel" style="display:inline-block;width:99%;text-align:right;">' 
		+ 				parseInt ( city.figures.population.current ).intToCommas() 
		+'			</span>'
		+'		</td>'
		+'		<td align=right class=jewel>'
		+ 			parseInt ( city.figures.population.laborers ).intToCommas()
		+'		</td>'
		+'		<td align=right class=jewel>'
		+ 			parseInt ( city.figures.population.armed_forces ).intToCommas()
		+'		</td>'
		+'		<td align=right class=jewel style="color:#333 !important">'
		+ 			parseInt ( city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces ).intToCommas()
		+'		</td>'
		+'		<td align=right class=jewel>'
		+ 			parseInt ( city.figures.population.limit ).intToCommas()
		+'		</td>'
		+'	</tr>'
		+'</table>';
		
		
		
		// Resources
		html += 
		 '<table class="' + UID['table'] + ' zebra" style="margin-top:3px" width=100%>'
		+'	<tr>'
		+'		<th>' + translate('Type') + '</th>'
		+'		<th>' + translate('Reserves') + '</th>'
		+'		<th>' + translate('Per Hour') + '</th>'
		+'		<th>' + translate('Consumption') + '</th>'
		+'		<th>' + translate('Capacity') + '</th>'
		+'	</tr>';
		
		for ( var idx=0; idx < t.resources_type.length; idx++ )
		{
			var type = t.resources_type[idx];
			var production = Resources.rates[ type ];
			
			// if we don't have blue_energy yet
			if ( !production.rate ) continue;
			
			html += 
			 '	<tr valign=top>'
			+'		<td>'
			+'			<span class="' + UID['doa-icons'] + ' i-' + type + '" ></span>'
			+			 translate ( type.replace(/_/,' ') )
			+'		</td>'
			+'		<td align=right class=jewel style="color:#333 !important">'
			+ 			parseInt ( city.resources[type] ).intToCommas()
			+'		</td>'
			+'		<td align=right class=jewel>'
			+ 			production.rate.intToCommas()
			+'		</td>'
			+'		<td align=right class=jewel>'
			+ 			(production.unit_consumption || production.general_salaries || 0).intToCommas()
			+'		</td>'
			+'		<td align=right class=jewel>'
			+ 			( production.capacity === 1E+18 ? translate('Unlimited') : production.capacity.intToCommas() )
			+'		</td>'
			+'	</tr>';
		}
		
		html +=
		 '</table>';
		
		
		// Armed Forces & Generals
		html += 
		 '<table class=' + UID['table'] + ' style="width:100%;margin-top:3px;">'
		+'	<tr>'
		+'		<th>' + translate('Army  ') + '<span class="' + UID['doa-icons'] + ' i-armys" ></span></th>'
		+'		<th>' + translate('My Generals  ') + '<span class="' + UID['doa-icons'] + ' i-gens" ></span></th>'
		+'	</tr>'
		+'	<tr valign=top align=left>'
		+'		<td width=50% style="border-right: 1px solid;">';
		
		// Units
		html += '<table class="' + UID['table'] + ' zebra" style="width:100%;">';
		
		for ( var i=0; i < t.units_type.length; i++ )
		{
			var num_units = getUnitNumbers( city, t.units_type[i] );
			
			html +=
			 '	<tr>'
			+'		<td align=left>' 
			+'			<span class="' + UID['doa-icons'] + ' i-' + t.units_type[i] + '" ></span>'
			+			translate(t.units_type[i])
			+ '		</td>'
			+'		<td align=right class=jewel>' + num_units.incity + '</td>'
			+'		<td align=right class=jewel>' + (num_units.marches ? '&nbsp;+&nbsp;<b>(' + num_units.marches + ')</b>' : '') + '</td>'
			+'	</tr>';
		}
		
		html +=
		 '			</table>'
		+'		</td>'
		+'		<td width=50% align=center style="padding-left:7px">';
		
		html +=
		 '			<table class=' + UID['table'] + ' style="width:100%;">'
		+'			<tr>'
		+'				<td align=right>' + translate('Marching') + ': </td>'
		+'				<td>' + Seed.total.marches + '</td>'
		+'			</tr>'
		+'			</table>';
		
		// Generals
		html += 
		 '			<table class="' + UID['table'] + ' zebra" style="width:100%;">'
		+'				<tr>'
		+'					<th style="text-align:right !important;">' 
		+ 						translate('Name')
		+'						<span style="font-family:Wingdings;">&nbsp;«</span>'
		+'					</th>'
		+'					<th>' + translate('Victory') + '</th>'
		+'					<th>' + translate('Coordinates').substring(0,5) + '</th>'
		+'				</tr>';
		
		
		
		for ( var i=0; i < city.generals.length; i++ )
		{
			var general_xy;
			var x = (Seed.generals[ city.generals[i].id ].x || 0);
			var y = (Seed.generals[ city.generals[i].id ].y || 0);
			
			if ( !city.generals[i].status || city.generals[i].status === 'marching' ) {
				general_xy = x + '/' + y;
			} else {
				general_xy = translate('Capital').toLowerCase();
			}
			
			
			html +=
			 '	<tr>'
			+'		<td align=right>'
			+'			<span>' + city.generals[i].name + '</span>'
			//+'			<span>Name ' + i + '</span>'
			+' 			<span class=jewel>(' + city.generals[i].rank + ')</span>'
			+'		</td>'
			+'		<td align=right>'
			+'			<span class=jewel style="color:#000;">' + city.generals[i].victories + '</span>'
			+'		</td>'
			+'		<td>' + (city.generals[i].busy ? '<span class=jewel>'+ ( general_xy != 'capital' ? ' &gt; <span style="color:#666666"> [' + general_xy + ']</span>' : ' &lt; ' + general_xy )+ '</span>' :'') + '</td>'
			+'	</tr>';
		}
		// Wham 
		// Show Outpost Items
		html +=
		'<table class="' + UID['table'] + ' zebra" style="margin-top:3px" width=100%>'
		+'	<tr>'
		+'		<th colspan=2>' + translate('Arsenal') + '</th>'
		+'	</tr>';

		for ( var i = 0; i < t.items_arsenal.length; i++)
		{
			html +=
			 '<tr>'
			+'	<td>'
			+'    <span class="' + UID[ 'doa-icons' ] + ' i-' + t.items_arsenal[i] + '"></span>'
			+	 translate( t.items_arsenal[i] )
			+'	</td>'
			+'	<td align=right class=jewel>' + Seed.getItem(t.items_arsenal[i]) +'</td>'
			+'</tr>';
		}
		
		html += '</table>';
		html +=
		 '			</table>'
		+'		</td>'
		+'		</tr>'
		+'</table>';
		
		
		
		
		// Marches, building, research, training
		$J('#'+UID['Tabs.Info.tabSummary.content']).html( html );
	
	},
	
	tabLogs : function ( )
	{
		var t = Tabs.Info;
		$J( '#'+UID['Tabs.Info.header'] ).html( '' );
		$J( '#'+UID['Tabs.Info.toolbar'] ).html( '' );
	},

	
} // END Tabs.Info


//******************************** Waves Tab *****************************
Tabs.Waves = {
	tab_order		: WAVE_TAB_ORDER,
	tab_label		: 'Wave',
	tab_disabled	: !WAVE_TAB_ENABLE,
	
	last_tab_id		: 'tabTargets',
	
	$container		: null,
	$content		: null,
	
	units_type		: ['Conscript','Spy','Halberdsman','Minotaur','Longbowman','SwiftStrikeDragon','BattleDragon','ArmoredTransport','Giant','FireMirror','PackDragon','AquaTroop','StoneTroop','FireTroop','WindTroop','IceTroop', 'FrostGiant', 'SwampTroop', 'ForestTroop', 'DesertTroop'],

	timer			: { 
		 attack			: null
		,marches		: null 
	},

	running			: {
		 start_at		: 0
		,attacks		: 1
		,errors			: 0
	},

	init : function (div)
	{
		var t = Tabs.Waves;
	
		t.$container = $J(div);
		
		var html = 
		 '<div id=' + setUID('Tabs.Waves.title') + ' class=' + UID['title'] + '>' + translate('Wave') + ' </div>'
		+'<div id='+ setUID('Tabs.Waves.status') + ' class=' + UID['status_ticker'] + ' style="margin-bottom:5px !important">'
		+'	<center>'
		+'		<input type=button value="OnOff" id=' + setUID('Tabs.Waves.enabled') + ' />'
		+'	</center>'
		+'	<div class=' + UID['status_report'] + ' style="height:140px;max-height:140px;">'
		+'		<table id=' + setUID('Tabs.Waves.marches') + ' class="' + UID['table'] + ' zebra" style="width:474px;max-width:474px;">'
		+'		</table>'
		+'	</div>'
		+'	<div id=' + setUID('Tabs.Waves.feedback') + ' class=' + UID['status_feedback'] + '></div>'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Waves.tabTargets')     + '>'  + translate('Targets')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Waves.tabStats')       + '>'  + translate('Statistics') + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Waves.tabOptions')     + '>'  + translate('Options')    + '</a></li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Waves.content') + ' style="padding-top:1px; height:455px;"></div>';
		
		t.$container.html( html );
		
		t.$content = $J('#'+UID['Tabs.Waves.content']);
		
		// Add the event listeners
		$J('#'+UID['Tabs.Waves.enabled']).click (function (){
			t.setWaveEnable( !Data.options.waves.enabled );
		});
		
		$J( '#'+UID['Tabs.Waves.tabTargets'] ).click ( {current_tab:0}, t.showSubTab );
		$J( '#'+UID['Tabs.Waves.tabStats']   ).click ( {current_tab:1}, t.showSubTab );
		$J( '#'+UID['Tabs.Waves.tabOptions'] ).click ( {current_tab:2}, t.showSubTab );
		
		if ( !Data.stats.waves.start_at ) {
			Data.stats.waves.start_at = serverTime();
		}
		
		Messages.addBattleReportListener(t.gotBattleReport);

		t.timer.marches = setTimeout ( t.marchesTick, 1000 );

		if ( Data.options.waves.target.type != '' && !(/(City|Outpost)/.test(Data.options.waves.target.type)) ) {
			t.setWaveEnable (Data.options.waves.enabled);
		} else {
			t.setWaveEnable (Data.options.waves.enabled);
		}
		
		window.addEventListener('unload', t.onUnload, false);
	},
	
	show : function ()
	{
		var t = Tabs.Waves;

		t.showSubTab ( {data:{ current_tab: Data.options.waves.current_tab }} );
	},
	
	hide : function ()
	{
		var t = Tabs.Waves;
		//clearTimeout ( t.timer.tick );
	},
	
	onUnload : function ()
	{
		var t = Tabs.Waves;
		if ( Data.options.waves.enabled ){
			Data.stats.waves.run_time += ( serverTime() - t.running.start_at );
		}
	},
	
	showSubTab : function( event )
	{
		var t = Tabs.Waves;
		
		var current_tab = event.data.current_tab;
		
		Data.options.waves.current_tab = current_tab;

		var tab_name;
		switch ( current_tab )
		{
		case 0: tab_name = 'tabTargets'; break;
		case 1: tab_name = 'tabStats'  ; break;
		case 2: tab_name = 'tabOptions'; break;
		}
		
		$J('#'+UID[t.last_tab_id])
		.css('z-index', '0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Waves.' + tab_name])
		.css('z-index', '1')
		.addClass('selected');
		
		t.last_tab_id = 'Tabs.Waves.' + tab_name;
		
		t[tab_name] ();
	},
	
	tabTargets : function ()
	{
		var t = Tabs.Waves;
		
		var html = 
		 '<div id=' + setUID('Tabs.Waves.tabTargets.title') +' class="' + UID['title'] + '">' + translate('Wave') + '&nbsp;' + translate('Targets') + '</div>';
		 
		html += 
		 '	<div>'
		+'		<center>'
		+'		<h4>'+ translate('Enter Coords') +':&nbsp;</h4><br>'
		+'		<h4>X:</h4> <input id=' + setUID('Tabs.Waves.tabTargets.coord_x') + ' size=3 maxlength=3 type=text value="' + Data.options.waves.target.x + '" /> '
		+'		<h4>Y:</h4> <input id=' + setUID('Tabs.Waves.tabTargets.coord_y') + ' size=3 maxlength=3 type=text value="' + Data.options.waves.target.y + '" /> '
		+'		&nbsp <h4>'+ translate('Distance') + ':</h4> <span id=' + setUID('Tabs.Waves.tabTargets.distance') + '></span><BR>'
		+'		<div class=' + UID['status_ticker'] + ' style="height:auto !important;margin:5px 10px !important;">'
		+'			<center><span id=' + setUID('Tabs.Waves.tabTargets.target') + '></span></center>'
		+'		</div>'
		+'		</center>'
		+'	</div>'
		+'  <div>'
		+'  <center>'
		+'	<table id=' + setUID('Tabs.Waves.tabTargets.units') + ' class=' + UID['table'] + '>'
		+'		<tr>'
		+'			<th colspan=8><h4>' + translate('Troops for Wave Attack') + '</h4></th>'
		+'		</tr>'
		+'	</table>'
		+'  </center>'
		+'	</div>'
		+'	<br>'
		+'  <div>'
		+'  <center>'
		+'	<table id=' + setUID('Tabs.Waves.tabTargets.dragons') + ' class=' + UID['table'] + '>'
		+'		<tr>'
		+'			<th colspan=8><h4>' + translate('Send Dragon every certain number of waves') + '</h4></th>'
		+'		</tr>'
		+'	</table>'
		+'  </center>'
		+'	</div>';
		
		t.$content.html ( html );
		
		
function setUnitsTable ( table ) {
 var t = Tabs.Waves;
 var lableRow;
 var inputRow;
 var val, c=0;
 for (var i=0; i < t.units_type.length; i++)
 {
  /*
  if (getUnitNumbers(Seed.cities[0], t.units_type[i]).total < 1) {
continue;
  }
  */
  if (i%7 === 0) {
labelRow = table.insertRow(-1);
inputRow = table.insertRow(-1);
c = 0;
  }
  var label = labelRow.insertCell(c);
  //label.innerHTML = translate('~'+t.units_type[i]);
  label.innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + t.units_type[i] + '" style="margin-left:10px"></span>';
  label.style.width  = '45px';
  label.style.height = '20px';
  label.title = translate( t.units_type[i] );
  
  var input = document.createElement ('input');
  input.type = 'text';
  input.size = '1';
  input.style.width = '40px';
  input.title = translate(t.units_type[i]);
  
  if (i < 2) {
input.style.border = '1px solid black';
  } else if (i < 9) {
input.style.border = '1px solid green';
  } else {
input.style.border = '1px solid blue';
  }
  
  input.maxlength = '6'; // Allow 100,000 units to be sent
  
  
  if (Data.options.waves.units[t.units_type[i]] === undefined){
Data.options.waves.units[t.units_type[i]] = 0;
  }
  val = Data.options.waves.units[t.units_type[i]];
  
  if (!val){ val = 0; }
  
  input.value = val;
  input.setAttribute( 'ref', i );
  
  $J(input).change ( function ( event, ui ){
var idx = $J(this).attr('ref');
var unit_type = t.units_type[idx];
Data.options.waves.units[unit_type] = event.target.value;
  } );
  
  inputRow.insertCell(c).appendChild (input);
  
  c = c + 1;
  
 }
}		
	
		function setDragonsTable (table) {
			var t = Tabs.Waves;
			var row = table.insertRow(-1);

			var dragons = Data.options.waves.dragons;
			
			for (var dragon_idx = 0; dragon_idx < DRAGONS_NAMES.length; dragon_idx++)
			{
				
				var dragon_type = DRAGONS_NAMES[dragon_idx];
				
				if ( dragon_type == '' || dragon_type == 'SpectralDragon' || !Seed.dragons[ dragon_type ] ) continue;
				if ( dragon_type == '' || dragon_type == 'ForestDragon' || !Seed.dragons[ dragon_type ] ) continue;
				
				if ( dragon_idx == 5 ) {
					row = table.insertRow(-1);
				}
				
				var cell = row.insertCell( -1 );
				cell.style.verticalAlign = 'middle';
				cell.style.paddingRight = '5px';
				
				$J('<span />').
				attr({
					class : UID['doa-icons'] + ' i-' + dragon_type,
					title : translate(dragon_type).replace(/\./,'')
				}).
				css( {
					display		: 'inline-block',
					position	: 'relative !important',
					marginTop	: '3px',
					marginRight	: '2px'
				} ).
				appendTo(cell);
				
				var $select = $J('<select />').
				attr ( {
					name	: dragon_idx,
					title	: translate(dragon_type)
				} ).
				css  ( {
					fontSize	: '11px',
					textAlign	: 'center'
				}).
				focus ( function(event){
					var selected_waves = [];
					for ( var dragon_name in Data.options.waves.dragons )
					{
						if ( Data.options.waves.dragons[dragon_name] !== 0 ) {
							selected_waves[Data.options.waves.dragons[dragon_name]] = true;
						}
					}
					for (var num = 1; num < 16; num++){
						$J(this).
						find('option[value="' + num +'"]').
						attr('disabled',( selected_waves[num] ? true : false ));
					}
				}).
				change ( function(event){
					var t = Tabs.Waves;
					var dragon_type = DRAGONS_NAMES[ $J(this).attr('name') ];
					Data.options.waves.dragons[dragon_type] = parseInt( $J(this).val() );
				}).
				appendTo(cell);
				
				if (dragons[dragon_type] === undefined){
					dragons[dragon_type] = 0;
				}
				var current_wave = dragons[dragon_type];
				
				if (!current_wave){ current_wave = 0;	}
				
				$J('<option />').
				attr( {value : 0} ).
				text('-').
				appendTo($select);
					
				var selected = false;
				for (var num = 1; num < 10; num++) {
					selected = (current_wave === num);
					var disabled = false;
					
					for ( var dragon_name in dragons ){
						if ( num === dragons[dragon_name] && dragon_name !== dragon_type){
							disabled = true;
						}
					}
					
					$J('<option />').
					attr( {
						value	: num,
						selected: selected,
						disabled: disabled
					} ).
					text(num + 'º').
					appendTo($select);
				}
		
			}
		}
	
		// Event Listeners
		$J('#'+UID['Tabs.Waves.tabTargets.coord_x']).change( t.onChangeCoords );
		$J('#'+UID['Tabs.Waves.tabTargets.coord_y']).change( t.onChangeCoords );
		
		// Add Units table
		setUnitsTable ( $id(UID['Tabs.Waves.tabTargets.units']) );

		// Add Dragon table
		setDragonsTable ( $id(UID['Tabs.Waves.tabTargets.dragons']) );
		
		t.onChangeCoords();
		
	},
		
	tabStats : function ()
	{
		var t = Tabs.Waves;
		
		var html = 
		 '<div id=' + setUID('Tabs.Waves.tabStats.title') +' class="' + UID['title'] + '">' + translate('Wave') + '&nbsp;' + translate('Statistics') + '</div>';
		 
		html +=
		 '<div class=' + UID['content'] + ' style="margin-top:10px !important">'
		+'	<div id=' + setUID('Tabs.Waves.tabStats.content') + '  style="height:100px; max-height:100px; overflow-y:auto"></div>'
		+'	<hr class=thin>'
		+'	<div id=' + setUID('Tabs.Waves.tabStats.spoils') + '> &nbsp; </div>'
		+'	<center>'
		+'		<input id=' + setUID('Tabs.Waves.tabStats.clearStats') + ' type=button value="' + translate('Delete') + ' ' + translate('Statistics') + '" />'
		+'	</center>'
		+'</div>';
		
		t.$content.html ( html );

		function showStats (){
			var run_time = Data.stats.waves.run_time;
			
			if ( Data.options.waves.enabled ){
				run_time += ( serverTime() - Data.stats.waves.start_at );
			}
			
			var html = 
			 '<table class=' + UID['table'] + ' width=100%>'
			+'	<tr>'
			+'		<td>' + translate('Run Time') + ': </td>'
			+'		<td width=90%>' + timeFormat(run_time, true) + '</td>'
			+'	</tr><tr>'
			+'		<td>' + translate('Attacks') + ': </td>'
			+'		<td>' + Data.stats.waves.total + '</td>'
			+'	</tr><tr>'
			+'		<td colspan=2>'
			+'			<hr class=thin>'
			+'		</td>'
			+'	</tr>';
			
			
			for (var item in Data.stats.waves.spoils)
			{
				var num = Data.stats.waves.spoils[item];
				var per_hour = num / (run_time/3600);
				html +=
				  '<tr>'
				+ '		<td>' + translate(item) + ':</td>'
				+ '		<td>' + num + ' (' + per_hour.toFixed(2) + '&nbsp;' + translate('per hour') + ')</td>'
				+ '</tr>';
			}
			
			html += '</table>';
			
			$J('#'+UID['Tabs.Waves.tabStats.content']).html( html );
		}
		
		function clearStats (){
			var now = serverTime();

			Data.stats.waves = {
				 start_at	: now
				,run_time	: 0
				,total		: 0
				,spoils		: {}
			
			}
			
			showStats();
		}
		
		// Event Listeners
		$J('#'+UID['Tabs.Waves.tabStats.clearStats']).click ( clearStats );
		
		showStats();
	},
		
	tabOptions : function ()
	{
		var t = Tabs.Waves;
		
		var html = 
		 '<div id=' + setUID('Tabs.Waves.tabOptions.title') +' class="' + UID['title'] + '">' + translate('Wave') + '&nbsp;' + translate('Options') + '</div>';
		 
		html +=
		 '	<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<td>'+ translate('Maximum requests per hour') +':&nbsp;</td>'
		+'		<td>'
		+			Data.options.marches.requests.max_per_hour
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>' + translate('Delay Between Attacks') + ':&nbsp;</td>'
		+'		<td>'
		+'			<input id=' + setUID('Tabs.Waves.tabOptions.delayMin') + ' type=text size=1 maxlength=4 value="' + Data.options.waves.delay_min + '" />&nbsp;-&nbsp;'
		+'			 <span id=' + setUID('Tabs.Waves.tabOptions.delayMax') + '>' + Data.options.waves.delay_max + '</span>&nbsp;' + translate('Seconds')
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td> ' + translate('Delete') + ' ' + translate('Battle Report') + ':&nbsp;</td>'
		+'		<td><input id=' + setUID('Tabs.Waves.tabOptions.deleteReports') + ' type=checkbox ' + (Data.options.waves.delete_reports?'CHECKED':'') + ' /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>' + translate('Stop if any troops lost') + ':&nbsp;</td>'
		+'		<td><input id=' + setUID('Tabs.Waves.tabOptions.stopOnLoss') + ' type=checkbox ' + (Data.options.waves.stop_on_loss?'CHECKED':'') + ' /></td>'
		+'	</tr>'
		+'	</table>';
		
		t.$content.html ( html );
		
		function onChangeDelay (event){
			
		}
		
		// Event Listeners
		$J('#'+UID['Tabs.Waves.tabOptions.deleteReports']).click (function( event ) {
			Data.options.waves.delete_reports = event.target.checked;
		});
		$J('#'+UID['Tabs.Waves.tabOptions.stopOnLoss']).click ( function( event ) {
			Data.options.waves.stop_on_loss = event.target.checked;
		});

		$J('#'+UID['Tabs.Waves.tabOptions.delayMin']).change ( function ( event ) {
			/*
			* WARNING: Changing this values cause Too many requests to the server 
			*          that are monitored. Thats gives them reason to increase the security 
			*          on the servers and, sooner or later, make this scripts unusable.
			*            
			*      PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
			*
			*                   ( We will end up losing everyone )
			*/
			var min = parseIntZero( event.target.value );
			if (min < 5 || min > 3600){
				min = ( min < 5 ) ? 5 : 3600;
				$J(this).val ( min );
			}
			var max = parseInt ( min + 5 );

			$J('#'+UID['Tabs.Waves.tabOptions.delayMax']).html( max );
			
			Data.options.waves.delay_min = min;
			Data.options.waves.delay_max = max;
		});
	},
		

	
	gotBattleReport : function ( r ){
		var t = Tabs.Waves;
		
		if (r.report.location.x === Data.options.waves.target.x && 
			r.report.location.y === Data.options.waves.target.y
			){
				++Data.stats.waves.total;
				
				var march_id = null;
				for (var id in Data.marches.waves )
				{
					var march = Data.marches.waves[id];
					
					if (march.x === r.report.location.x && 
						march.y === r.report.location.y &&
						march.general && march.general.id === r.report.attacker.general.id
						){  // TODO: time and units check here
							march_id = id;
							break;
					}
				}
				
				if (march_id) {
					Data.marches.waves[march_id].has_report = true;
				}
				
				for (var i=0; i < r.report.spoils.items.length; i++){
					if ( !Data.stats.waves.spoils[r.report.spoils.items[i]] )
					{
						Data.stats.waves.spoils[r.report.spoils.items[i]] = 1;
					}
					else {
						++Data.stats.waves.spoils[r.report.spoils.items[i]];
					}
				}
				
				if (Data.options.waves.stop_on_loss)
				{
					for (var p in r.report.attacker.units)
					{
						if (r.report.attacker.units[p][0] !== r.report.attacker.units[p][1])
						{
							var ts = new Date(r.report_notification.created_at * 1000).myString();
							t.setWaveEnable (false);
							t.dispFeedback (translate('Troops lost') + '! (' + ts +')');
							actionLog (translate('Wave')+': '+translate('Troops lost')+'! ('+ ts +')');
							return;
						}
					}
				}
				if (Data.options.waves.delete_reports && r.report.attacker.name === Seed.player.name){
					Messages.deleteMessage(r.report_notification.id);
				}
		}
	},


	dispFeedback : function ( msg ){
		if ( msg && msg !== '') {
			msg = new Date().toTimeString().substring (0,8) +' '+ msg;
		}
		$J('#'+UID['Tabs.Waves.feedback']).html( msg );
	},

	setWaveEnable : function (on_off){
		var t = Tabs.Waves;
		var but = $id(UID['Tabs.Waves.enabled']);
		
		clearTimeout (t.timer.attack);
		Data.options.waves.enabled = on_off;
		
		if ( on_off ) {
		
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
			
			but.value = translate('Attacking').toUpperCase();
			but.className = UID['btn_on'];
			
			t.running.start_at = serverTime();
			t.running.attacks = 1;
			
			// Yes, check here if attacks are enabled
			if (!Data.options.attacks.enabled){
				Data.options.marches.requests.counter = 1;
				Data.options.marches.requests.start_at = serverTime();
			}
			
			t.attackTick();
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
			
			if ( t.running.start_at !== 0 ){
				Data.stats.waves.run_time += ( serverTime() - t.running.start_at );
			}
		}
	},


	attackTick : function (){
		var t = Tabs.Waves;
		var now = serverTime();
		var target_msg='', retry_delay, available_general, marching = 0, total_marches=0;

		
		clearTimeout (t.timer.attack);
		
		// Don't do anything if wave attacks are not enabled
		if (!Data.options.waves.enabled){
			return;
		}    
		
		
		var min_time = 700000;
		var max_time = 0;
		for (id in Seed.marches){
			++total_marches;
			if (Seed.marches[id].status === 'marching'){
				++marching;
			}
			// Fixed by Jawz74
			var left_time = ( Seed.marches[id].run_at - parseInt(serverTime()) ) + (Seed.marches[id].status=='marching' ? Seed.marches[id].duration : 0);
			
			//fixed by Didi
			if (left_time > 0) {
				min_time = min_time < left_time ? min_time : left_time;
				max_time = max_time > left_time ? max_time : left_time;
			}
		}
		
		//fixed by Didi
		if ( min_time === 700000 || max_time === 0 ) {
			min_time = 3;
		}
		
		retry_delay = (min_time * 1000) + Math.randRange(2000,5000);

		
		target_msg =  'a level ' + Data.options.waves.target.level + ' ' + Data.options.waves.target.type + ' at ' + Data.options.waves.target.x +'/'+ Data.options.waves.target.y;
		
		
		if ( marching >= Data.options.marches.maximum )
		{
			verboseLog('<b>Wave<b> attack to ' + target_msg + ' delayed due to <b>march limit</b> reached: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback(translate('March limit reached') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			return;
		}
		
		if ( Seed.cities[0].figures.marches.maximum - Seed.total.marches <= 0 ) {
			verboseLog('<b>Wave</b> attack to ' + target_msg + ' delayed due to <b>insufficent march slots</b>: retry in ' + timeFormat(retry_delay/1000));
			t.dispFeedback(translate('Muster Point') +' '+ translate('Full') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.attackTick, retry_delay);
			return;
		}
		
		available_general = getAvailableGeneral( Data.options.waves.target.level === 1 );
		
		if (available_general === null) {
			verboseLog('<b>Wave</b> attack to ' + target_msg + ' delayed due to <b>insufficent generals</b>: retry in ' + timeFormat(retry_delay/1000));
			t.dispFeedback(translate('Generals') + ' ' + translate('Unavailable') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.attackTick, retry_delay);
			return;
		}

		// returns null if ok, else error message
		function checkUnits (city_idx, units) {
			var total_units = 0;
			for (var p in units){
				if (units[p] > 0){
					total_units += units[p];
					if (Seed.cities[city_idx].units[p] < units[p]){
						return (translate('Not enough') + ' ' + translate(p));
					}
				}
			}
			if (total_units <= 0){
				return (translate('No Troops Defined'));
			}
			return null;
		}
	
		var check_units = checkUnits(0, Data.options.waves.units);
		if (check_units !== null) {
			verboseLog('<b>Wave</b> attack to ' + target_msg + ' delayed due to <b>' + check_units +' units</b>: retry in ' + timeFormat(retry_delay/1000));
			t.dispFeedback(check_units + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.attackTick, retry_delay);
			return;
		}
		
		var units = Data.options.waves.units.cloneProps(); // Object.clone( Data.options.waves.units );
		
		// Check Dragon Wave (fixed by Lord Mimir)
		var dragons_waves=[];
		for ( var dragon_type in Data.options.waves.dragons )
		{
			if ( parseInt( Data.options.waves.dragons[dragon_type] ) )
			{
				dragons_waves[Data.options.waves.dragons[dragon_type]-1] = dragon_type;
			}
		}

		
		var current_wave = ( t.running.attacks - 1 ) % ( dragons_waves.length );
		
		var current_dragon = Seed.dragons[dragons_waves[current_wave]];
		
		if ( typeof dragons_waves[current_wave] !== 'undefined' && 
			 dragons_waves[current_wave] !== null &&
			 current_dragon.is_in_city && 
			 current_dragon.can_attack && 
			 (current_dragon.life / current_dragon.maximum_life  >= 0.75 ) 
			) {
				units[current_dragon.name] = 1;
		}
		
		// All prerequisite checks are done so march request can be sent
		verboseLog('Wave attack to ' + target_msg + ' Attempted');
		
		
		target_msg = '#.'+ t.running.attacks + ' ' + target_msg;
		// Add Units to target_msg
		target_msg += '<br>' + translate('Sending') + ': ';
		var unitsMsg = [];
		for (var name in units){
			if(units[name] > 0){
				unitsMsg.push(translate(name) + '(' + units[name] + ')');
			}
		}
		target_msg += unitsMsg.join(' + ');
		
		new MyAjax.marches ({
			city_id    : Seed.cities[0].id,
			x          : Data.options.waves.target.x,
			y          : Data.options.waves.target.y,
			general_id : available_general.id,
			units      : units,
			owner_id   : 'waves',
			delay      : 3000,
			
			onSuccess  : function ( r ) {
				var t = Tabs.Waves, delay;
				
				Marches.add(r.job.march_id, 'waves');
					
				Data.options.marches.requests.counter++;
				
				t.running.attacks++;
			
				t.running.errors = 0;
				
				if ( Data.options.marches.requests.counter >= Data.options.marches.requests.max_per_hour )
				{
					if ( parseInt(serverTime() - Data.options.marches.requests.start_at) < 3600 ) {
						delay = parseInt( (3600 - (serverTime() - Data.options.marches.requests.start_at)) * 1000 );
						setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(delay/1000))}, Data.options.waves.delay_min*500 );
					} else {
						Data.options.marches.requests.start_at = serverTime();
						Data.options.marches.requests.counter = 1;
					}
				}
				else if ((Data.options.marches.requests.counter % 15) === 0)
				{
					delay = 45 * total_marches * 1000;
					setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(delay/1000))}, Data.options.waves.delay_min*500 );
				}
				else {
					delay = Math.randRange(Data.options.waves.delay_min*1000, Data.options.waves.delay_max*1000);
					
					verboseLog('Wave attack to: ' + target_msg + ' Successfully');
				
					actionLog(translate('Wave attack to') + ': ' + target_msg);
					
					t.dispFeedback (translate('Wave attack to')+ ': ' + target_msg);
				}

				t.timer.attack = setTimeout (t.attackTick, delay);
				
				// Erase feedback message
				setTimeout( function(){ t.dispFeedback(''); },  parseInt( delay/2 ) );
			},
			
			onFailure   : function ( r ) {
				var t = Tabs.Waves, delay;

				++t.running.errors;
				delay = 60000 * (t.running.errors * t.running.errors);
				
				verboseLog('<b>Wave<b> attack to: ' + target_msg + ' <b>failed</b> and returned error' + ': ' + r.errmsg + ' - retrying in ' + timeFormat(delay/1000));
				
				actionLog(translate('Wave attack to')+ ' ' + target_msg + ' ' + translate('failed'));

				t.dispFeedback(translate('Wave attack to')+ ' ' + target_msg + ' failed');
				
				if (r.status && r.status === 509){
					/*
					if ( Data.options.marches.requests.counter > 30 ) {
						Data.options.marches.requests.max_per_hour = Data.options.marches.requests.counter;
					}
					*/
					delay = ERROR_509_DELAY;
					verboseLog('<b>Attack</b> to ' + target_msg + ' failed - <b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat(delay/1000));
				
					t.dispFeedback(translate('Attack to') + ' ' + target_msg + ' ' + translate('failed')+' - ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') +' '+ timeFormat(delay/1000));
				}
				
				t.timer.attack = setTimeout(t.attackTick, delay);

				// Erase feedback message
				setTimeout( function(){ t.dispFeedback(''); }, parseInt( delay/2 ) );
			},
			
			caller  : 'Tabs.Waves.attackTick'
		});
	},

	marchesTick : function (){
		var t = Tabs.Waves;
		clearTimeout ( t.timer.marches );
		Marches.updateTable ( $id(UID['Tabs.Waves.marches']), 'waves' );
		t.timer.marches = setTimeout (t.marchesTick, 1000);
	},
	
	onChangeCoords : function (event){
		var ex = $id(UID['Tabs.Waves.tabTargets.coord_x']);
		var ey = $id(UID['Tabs.Waves.tabTargets.coord_y']);
		var x = parseIntZero (ex.value);
		var y = parseIntZero (ey.value);
		ex.value = x;
		ey.value = y;
		
		$J('#'+UID['Tabs.Waves.tabTargets.distance']).html( Map.getDistance(Data.options.map.x, Data.options.map.y, x, y) );
		
		$J('#'+UID['Tabs.Waves.tabTargets.target']).html('&nbsp;');
		
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
			ex.style.backgroundColor = '#faa';
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
			ey.style.backgroundColor = '#faa';
			return;
		}
		
		Data.options.waves.target.x = x;
		Data.options.waves.target.y = y;
		
		ey.style.backgroundColor = '';
		ex.style.backgroundColor = '';
		Map.tileAt({
			x         : x,
			y         : y,
			onSuccess : function( target ){
				if ( target ){
					var type = target.city_type ? Map.names.cities[ target.city_type ] : Map.names.type[ target.type ];
					Data.options.waves.target.type = type;
					Data.options.waves.target.level = target.level;
					
					var attColor = target.attackable ? '#000' : '#C22';
					
					var html = 
					 '<font color=' + attColor + '>'
					+'	<b>' + translate(type) + '&nbsp;' + translate('Level') + '&nbsp;' + target.level + '</b>'
					+'</font>';
					if ( target.city_name ) {
						html +=
						  '<br>' + translate('City') + ': <b>' + target.city_name + '</b> - '
						+ translate('Alliance') + ': <b>' + (target.alliance ? target.alliance : '----') + '</b>'
						+ '<br>' + translate('Name') + ': <b>' + target.player_name  + '</b> - '
						+ translate('Level') + ': <b>' + target.player_level + '</b> - '
						+ translate('Power') + ': <b>' + target.might + '</b>';
					}
					
					$id(UID['Tabs.Waves.tabTargets.target']).innerHTML = html;
				}
			},
			onFailure : function ( r ) {
			},
			caller  : 'Tabs.Waves.onChangeCoords'
		});
	},


}; // END Tabs.Waves



//******************************** Attacks Tab *****************************
// References to camp and camps changed to mapObject to make sure that other data does not overwrite the camps
Tabs.Attacks = {
	tab_order		: ATTACK_TAB_ORDER,
	tab_label		: 'Attacks',
	tab_disabled	: !ATTACK_TAB_ENABLE,
	
	last_tab_id		: 'tabLevels',
	
	container		: null,
	
	units_type 		: ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'PackDragon', 'Giant', 'FireMirror', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop','IceTroop', 'FrostGiant', 'SwampTroop', 'ForestTroop', 'DesertTroop'],
	dragons_type	: ['GreatDragon','WaterDragon','StoneDragon','FireDragon','WindDragon','IceDragon', 'SwampDragon', 'ForestDragon', 'DesertDragon', 'SpectralDragon'],

	timer			: {
		 attack			:null
		,marches		:null
		,targets		:null
	},
	
	running			: {
		 start_at		: 0
		,attacks		: 1
		,errors			: 0
	},
	
	
	last_attack		: 0,
	
	check_map_busy	: false,
	
	filter_targets	: '',
	
	targets : [],
	
	init : function (div)
	{
		var t = Tabs.Attacks;
		t.container = div;
		
		// This is where we store the units type and quantity from the Levels sub-tab
		// TBD: To save different configurations for wildernesses, ant camps, and cities/outposts
		// I will use a multidimensional array. The first index is the row, the second is the column
		// For our purposes the row is the map type selector, and the column is the unit type and quantity data {}
		//
		// [wilderness][0(null)][1][2][3][4][5][6][7][8][9][10][11]
		// [antcamps][0(null)][1][2][3][4][5][6][7][8][9][10][11]
		// [city][0(null)][1][2][3][4][5][6][7][8][9][10][11]
		//
		for ( var x=1; x < 12; x++ )
		{
			if ( !Data.options.attacks.units[x] )
			{
				Data.options.attacks.units[x] = {};
			}
		}
		
		var html = 
		 '<div id=' + setUID('Tabs.Attacks.title') + ' class=' + UID['title'] + '>' + translate('Attack') + ' ' + translate(Data.options.map.selected) + ' </div>'
		+'<div class=' + UID['status_ticker'] + ' id='+ setUID('Tabs.Attacks.status') + ' style="margin-bottom:5px !important">'
		+'	<center>'
		+'		<input type=button value="OnOff" id=' + setUID('Tabs.Attacks.enabled') + ' />'
		+'	</center>'
		+'	<div class=' + UID['status_report'] + ' style="height:140px; max-height:140px;">'
		+'		<table id=' + setUID('Tabs.Attacks.marches') + ' class="' + UID['table'] + ' zebra"  style="width:474px;max-width:474px;">'
		+'		</table>'
		+'	</div>'
		+'	<div id=' + setUID('Tabs.Attacks.feedback') + ' class=' + UID['status_feedback'] + '></div>'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Attacks.tabLevels')  + '>' + translate('Levels')     + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Attacks.tabTargets') + '>' + translate('Targets')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Attacks.tabStats')   + '>' + translate('Statistics') + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Attacks.tabMaps')    + '>' + translate('Map')        + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Attacks.tabOptions') + '>' + translate('Options')    + '</a></li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Attacks.content') + ' style="padding-top:1px; height:460px;"></div>';
		
		$J( t.container ).html( html );
		

		// Add the event listeners
		$J('#'+UID['Tabs.Attacks.enabled']).click (function (){
			t.setAttackEnable ( !Data.options.attacks.enabled );
		});
		
		$J( '#'+UID['Tabs.Attacks.tabLevels']  ).click ( {current_tab:0}, t.showSubTab );
		$J( '#'+UID['Tabs.Attacks.tabTargets'] ).click ( {current_tab:1}, t.showSubTab );
		$J( '#'+UID['Tabs.Attacks.tabStats']   ).click ( {current_tab:2}, t.showSubTab );
		$J( '#'+UID['Tabs.Attacks.tabMaps']    ).click ( {current_tab:3}, t.showSubTab );
		$J( '#'+UID['Tabs.Attacks.tabOptions'] ).click ( {current_tab:4}, t.showSubTab );
		if ( !Data.options.marches.maximum || 
			 Data.options.marches.maximum === 0 || 
			 Data.options.marches.maximum > Seed.cities[0].figures.marches.maximum
			) {
		Data.options.marches.maximum = Seed.cities[0].figures.marches.maximum;
		}
		if ( !Data.stats.attacks.start_at ) {
			Data.stats.attacks.start_at = serverTime();
		}
		
		Messages.addBattleReportListener(t.gotBattleReport);
		
		setTimeout (Marches.check, 60000);
		
		setTimeout (t.marchesTick, 1000);  // modify by Didi
		
		t.tabLevels();
		
		window.addEventListener ( 'unload', t.onUnload, false );
		
		t.setAttackEnable ( Data.options.attacks.enabled );
		
	},

	show : function ()
	{
		var t = Tabs.Attacks;

		t.showSubTab ( {data:{ current_tab: Data.options.attacks.current_tab }} );
	},
	
	hide : function ()
	{
		var t = Tabs.Attacks;
		//clearTimeout (t.timer.marches);
		if ( t.map_viewer ){
			t.map_viewer.close();
		}
		t.clearTimerTicks();
	},

	onUnload : function ()
	{
		var t = Tabs.Attacks;
		if ( Data.options.attacks.enabled )
		{
			Data.stats.attacks.run_time += ( serverTime() - t.running.start_at );
		}
	},
	
	showSubTab : function(event)
	{
		var t = Tabs.Attacks;
		
		var current_tab = event.data.current_tab;
		
		Data.options.attacks.current_tab = current_tab;

		t.clearTimerTicks();
		
		var tab_name;
		switch ( current_tab )
		{
		case 0: tab_name='tabLevels'  ; break;
		case 1: tab_name='tabTargets' ; break;
		case 2: tab_name='tabStats'   ; break;
		case 3: tab_name='tabMaps'    ; break;
		case 4: tab_name='tabOptions' ; break;
		}
		
		$J('#'+UID[t.last_tab_id])
		.css('z-index', '0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Attacks.' + tab_name])
		.css('z-index', '1')
		.addClass('selected');
		
		t.last_tab_id = 'Tabs.Attacks.' + tab_name;
		
		if ( current_tab !== 3 && t.map_viewer ) {
			t.map_viewer.close();
		}
		
		t[tab_name] ();
	},
	
	clearTimerTicks : function()
	{
		var t = Tabs.Attacks;
		// clear all Timer Ticks
		clearTimeout ( t.timer.targets );

	},
	
	gotBattleReport : function ( r )
	{
		var t = Tabs.Attacks;
		debugLog ('Tabs.Attacks.gotBattleReport'); 
		// tie report to march id ...
		var march_id = null;
		for (var id in Data.marches.attacks )
		{
			var march = Data.marches.attacks[id];
			
			if (march.x === r.report.location.x && 
				march.y === r.report.location.y &&
				march.general && march.general.id === r.report.attacker.general.id
				){  // TODO: time and units check here
					march_id = id;
					break;
			}
		}

		if (march_id) {
			t.trackStats (march_id, r);
		}
		
		//fetchPlayer when new item (Didi modif)
		var items = r.report.spoils.items;
		if ( items.length !== 0 ) {
			// Don't fetch Cities, only player.json
			Seed.fetchPlayer ({
				noCities  : true,
				onSuccess : function(){},
				onFailure : function(){},
			});
		}
		
		if ( !Data.options.attacks.delete_reports && !Data.options.attacks.stop_on_loss ){
			return;
		}
		//debugLog (inspect (r, 8, 1));
		if ( Data.options.attacks.stop_on_loss )
		{
			for (var p in r.report.attacker.units)
			{
				if ( r.report.attacker.units[p][0] !== r.report.attacker.units[p][1] )
				{
					var ts = new Date(r.report_notification.created_at * 1000).myString();
					t.abort (translate('Troops lost') +'! ('+ ts +')');
					return;
				}
			}
		}
		if (Data.options.attacks.delete_reports && r.report.attacker.name === Seed.player.name){
			Messages.deleteMessage (r.report_notification.id);
		}
	},

	setAttackEnable : function ( on_off )
	{
		var t = Tabs.Attacks;
		clearTimeout (t.timer.attack);
		
		var but = $id(UID['Tabs.Attacks.enabled']);
		Data.options.attacks.enabled = on_off;
		
		if ( on_off ) {
		
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
		
			but.value = translate('Attacking').toUpperCase();
			but.className = UID['btn_on'];
			
			t.running.start_at = serverTime();
			t.running.attacks = 1;
			
			// Yes, check here if waves are enabled
			if ( !Data.options.waves.enabled ){
				Data.options.marches.requests.counter = 1;
				Data.options.marches.requests.start_at = serverTime();
			}
			
			t.autoCheckTargets();
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
			t.dispFeedback ('');
			
			if ( t.running.start_at !== 0 ) {
				Data.stats.attacks.run_time += ( serverTime() - t.running.start_at );
			}
		}
	},

	abort : function ( msg )
	{
		var t = Tabs.Attacks;
		t.setAttackEnable ( false );
		t.dispFeedback ( msg );
		actionLog ( msg );
	},

	marchesTick : function ()
	{
		var t = Tabs.Attacks;
		clearTimeout ( t.timer.marches );
		Marches.updateTable( $id(UID['Tabs.Attacks.marches']), 'attacks' );
		t.timer.marches = setTimeout ( t.marchesTick, 1000 );
	},

	dispFeedback : function (msg)
	{
		if ( msg && msg !== '' ){
			msg = new Date().toTimeString().substring (0,8) + '&nbsp;' + msg;
		}
		$J('#'+UID['Tabs.Attacks.feedback']).html ( msg );
	},

	autoCheckTargets : function ()
	{
		var t = Tabs.Attacks;
		var now = serverTime();
		var city_idx = 0;
		var target_msg='', retry_delay, available_general, marching = 0, total_marches=0, id;
		
		clearTimeout ( t.timer.attack );
		
		// Don't do anything if attacks are not enabled
		if ( !Data.options.attacks.enabled ){
			return;
		}
		
		
		var min_time = 700000;
		var max_time = 0;
		for (id in Seed.marches)
		{
			++total_marches;
			if (Seed.marches[id].status === 'marching'){
				++marching;
			}
			
			// Fixed by Jawz74
			var left_time = ( Seed.marches[id].run_at - parseInt(serverTime()) ) + (Seed.marches[id].status=='marching' ? Seed.marches[id].duration : 0);
			
			//fixed by Didi
			if (left_time > 0) {
				min_time = min_time < left_time ? min_time : left_time;
				max_time = max_time > left_time ? max_time : left_time;
			}
		}
		
		//fixed by Didi
		if ( min_time === 700000 || max_time === 0 ) {
			min_time = 3;
		}
		
		retry_delay = (min_time * 1000) + Math.randRange(2000,5000);

		if ( marching >= Data.options.marches.maximum )
		{
			verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>march limit</b> reached: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback(translate('March limit reached') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			return;
		}
		
		if ( Seed.cities[0].figures.marches.maximum - Seed.total.marches <= 0 )
		{
			verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to </b>insufficent march</b> slots: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback (translate('Muster Point') +' '+ translate('Full') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			return;
		}

		// Get the next target, make sure we have sufficient units
		t.getNextAttackTarget ({
			onSuccess : function ( target )
			{
				if ( !target.attackable ) {
					return;
				}
			
				available_general = getAvailableGeneral( target.level === 1 );

				if ( available_general === null )
				{
					verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>insufficent generals</b>: retry in ' + timeFormat(retry_delay/1000));

					t.dispFeedback(translate('Generals') + ' ' + translate('Unavailable') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
					t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
					return;
				}
			
				// Check & Set Available Dragon
				var dragon_name;
				if ( Data.options.attacks.dragons_enable[target.level] )
				{
					dragon_name = getAvailableDragon();
					if ( dragon_name === null) {
						verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>not available dragon</b>: retry in ' + timeFormat(retry_delay/1000));
						t.dispFeedback( translate('Dragon') + ' ' + translate('Unavailable') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
						t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
						return;
					} 
				}
				
				if ( checkAvailableUnits (0, target.level ) === null )
				{
					target_msg = target.x + '/' + target.y;
					
					t.sendAttack ({
						city_idx  : 0,
						target    : target,
						general   : available_general,
						dragon    : dragon_name,
						
						onSuccess : function ( r ){
							var t = Tabs.Attacks, delay;
						
							var delay_min = Data.options.attacks.delay_min;
							var delay_max = Data.options.attacks.delay_max;

							if ( Data.options.marches.requests.counter >= Data.options.marches.requests.max_per_hour )
							{
								if ( parseInt(serverTime() - Data.options.marches.requests.start_at) < 3600 )
								{
									delay = parseInt( (3600 - (serverTime() - Data.options.marches.requests.start_at)) * 1000);
									setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(delay/1000))}, delay_min*500 );
								}
								else {
									Data.options.marches.requests.start_at = serverTime();
									Data.options.marches.requests.counter = 1;
								}
							}
							else if ((Data.options.marches.requests.counter % 15) === 0)
							{
								delay = 45 * total_marches * 1000;
								setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(delay/1000))}, delay_min*500 );
							}
							else {
								delay = Math.randRange(delay_min*1000, delay_max*1000);
								setTimeout(function(){t.dispFeedback('')}, parseInt(delay/2) );
							}
							
							t.timer.attack = setTimeout(t.autoCheckTargets, delay);
							
						},
						
						onFailure : function ( r ){
							var t = Tabs.Attacks, delay;
							delay = 30000 * (t.running.errors > 0 ? t.running.errors * t.running.errors : 1);
							
							if ( r.status && r.status === 509 )
							{
								delay = ERROR_509_DELAY;
								verboseLog('<b>Attack</b> to ' + target_msg + ' failed - <b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat(delay/1000));
							
								t.dispFeedback(translate('Attack to') + ' ' + target_msg + ' ' + translate('failed')+' - ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') +' '+ timeFormat(delay/1000));
							}
							else if ( r.errmsg ) {
								verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to </b>' + r.errmsg + '</b>: retry in ' + timeFormat(delay/1000));

								t.dispFeedback ( r.errmsg + ': ' + translate('Retry in') + ' ' + timeFormat(delay/1000) );
							}
							
							t.timer.attack = setTimeout(t.autoCheckTargets, delay);
						}
					}); // End sendAttack
					return;                
				}
				else {
					verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>insufficient troops</b>: retry in ' + timeFormat(retry_delay/1000));

					t.dispFeedback(translate('Not enough') + ' ' + translate('Troops') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
					t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
				}
			
			},
			
			onFailure : function () {
				verboseLog('<b>Attack</b> to ' + target_msg + '<b>Requirements Unmet</b>: Retry in' + timeFormat(retry_delay/1000));

				t.dispFeedback(translate('Requirements Unmet') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
				t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			}
		});
	},

	// notifies with true for success, false if error
	/*
		options
		{
			city_idx:
			target:
			general:
			onSuccess:
			onFailure:
		}
	*/
	sendAttack : function ( options )
	{
		var t = Tabs.Attacks;
		var now = serverTime();
		
		/*
		if ( t.attack_busy ){
			t.dispFeedback (translate('Error')+ ': ' +translate('sendAttack is busy, no response from server?'));
			return;
		}
		*/
		
		var city_idx = options.city_idx;
		var target   = options.target;
		var general  = options.general;
		
		
		var attack_msg =  translate('Attack sent to') + ': ' + translate(Data.options.map.selected) + ' ' + translate('Level') + ' ' + target.level + ' ' + translate('at') + ' ' + target.x + '/'+ target.y;
		
		var attack_msg_log =  'Attack sent to: ' + Data.options.map.selected + ' Level ' + target.level + ' at ' + target.x + '/'+ target.y;
		

		// Clone the units to include the dragon available
		var units = Data.options.attacks.units[target.level].cloneProps(); 
		
		// Verify if a dragon is available (by Didi)
		var dragons_selected = false;
		var dragon_added = false;
		for ( var dragon_idx = 0; dragon_idx < DRAGONS_NAMES.length; dragon_idx++)
		{
			var dragon_type = DRAGONS_NAMES[ dragon_idx ];
			
			if ( dragon_type == '' ) continue;
			
			var num =  units[dragon_type];
			if ( num > 0 ) { 
				dragons_selected = true;
				var dragon = Seed.dragons[dragon_type];
				if ( dragon_added ||
					 !dragon.is_in_city || 
					 !dragon.can_attack || 
					 (dragon.life / dragon.maximum_life   <= 0.75 )
					) {
					units[dragon_type] = 0;
				} else {
					dragon_added = true;
				}
			}
		}

		// If there is some dragon selected, but none are available to send, cancel the request
		if ( dragons_selected && !dragon_added )
		{
			if ( options.onFailure )
			{
				// We return the notice to the function sendAttack to delay the next attempt
				options.onFailure ( { errmsg: translate('Dragon') + ' ' + translate('Unavailable') } );
			}
			return;
		}
		
		verboseLog ( attack_msg_log +' Attempted' );
		debugLog('units :\n'+inspect(units,4,1));
		
		//t.attack_busy = true;
		t.last_attack = now;
		
		new MyAjax.marches ({
			city_id    : Seed.cities[city_idx].id,
			x          : target.x,
			y          : target.y,
			general_id : general.id,
			units      : units,
			owner_id   : 'attacks',
			delay      : 3000,
			
			onSuccess  : function ( r ) {
			
				//t.attack_busy = false;

				Marches.add(r.job.march_id, 'attacks');
				
				Data.options.marches.requests.counter++;
				
				var xy = target.x + ',' + target.y;
				if ( !Map.states[ xy ] ) {
					Map.states[ xy ] = {};
				}
				Map.states[ xy ].last_attack = now;
				
				t.running.errors = 0;
				
				verboseLog(attack_msg_log +' Successfully');
				
				t.dispFeedback(attack_msg);
				
				if ( Data.options.attacks.log_attacks ) {
					actionLog(attack_msg);
				}

				if ( options.onSuccess ) 
				{
					options.onSuccess ( r );
				}
			},
			
			onFailure  : function ( r ) {
			
				if (r.status && r.status === 509)
				{
				/*
					if ( Data.options.marches.requests.counter > 30 ) {
						Data.options.marches.requests.max_per_hour = Data.options.marches.requests.counter;
					}
				*/
				}

				++t.running.errors;

				verboseLog(attack_msg_log + ' <b>failed and returned error</b>: ' + r.errmsg);
					
				actionLog(attack_msg + ' ' + translate('failed'));
					
				t.dispFeedback(attack_msg + ' failed');
					
				if ( options.onFailure ) 
				{
					options.onFailure ( r );
				}
			},
			
			caller   : 'Tabs.Attacks.sendAttack'
		});
	},

	/* New getNextAttackTarget enhanced by Lord Mimir [2011-11-04]
	*  Return the next target that is next to be attacked, 
	*  if we are at the last object in the last, return the first object
	*/
	getNextAttackTarget : function ( options )
	{
		var t = Tabs.Attacks;
		
		var last_attack = 0;
		var next_target = null;
		var target = null;
		
		var map_type = options.map_type || Data.options.map.selected;
		
		//Clone the level_enable so does not effect original values
		var level_enable =  Data.options.attacks.level_enable.cloneProps(); 
		for (var i=0; i < level_enable.length; i++)
		{
			if(  level_enable[i]  && checkAvailableUnits (0, i ) !== null )
			{
				 level_enable[i]=false;
			}
		}

		// Look through all the targets
		for (var i=0; i < t.targets.length; i++)
		{
			var target = t.targets[i];
			
			// Skip a target if the units set for that level are not available ( by Lord Mimir )
			if ( !level_enable[ target.level ] ){
				continue;
			}
			
			var target_states = Map.states[ target.x + ',' + target.y ];
			
			// Is this target attackable?
			if ( target_states && target_states.attackable )
			{

				// Has the target never been attacked?
				if ( !target_states.last_attack || target_states.last_attack === 0 ) 
				{
					next_target = target;
					break;
				}
				
				else if ( last_attack === 0 )
				{
					// Yes, this target is next (so far)
					last_attack = target_states.last_attack;
					next_target = target;
				}
				
				// Was the previous target attacked before this target?
				else if (last_attack > target_states.last_attack) 
				{
					// Yes, this target is next (so far)
					last_attack = target_states.last_attack;
					next_target = target;
					break;
				}
			}
		}


		// No target reaches the specified requirements
		if ( next_target === null )	{
			options.onFailure ( null );
			return;
		}
		// Return the next target
		Map.tileAt ({
			x         : next_target.x,
			y         : next_target.y,
			onSuccess : function( target ) {
				options.onSuccess ( target );
			},
			onFailure : function( ) {
				options.onFailure ( null );
			},
			caller    : 'Tabs.Attacks.getNextAttackTarget'
		});
		//return next_target;
	},

	// return array of targets that satisfy config (max distance, level enables)
	getActiveObjectList : function ( map_type, level_enable )
	{
		var t = Tabs.Attacks;
		
		level_enable= (level_enable !== undefined) ? level_enable : Data.options.attacks.level_enable;
		map_type = ( map_type !== undefined ? map_type : Data.options.map.selected );
		
		var filter_targets = t.filter_targets.strip();
		var do_filter = ( /(City|Outpost|Wildernesses)/.test( map_type ) && filter_targets.length > 0 );
		var filter_pattern = new RegExp( RegExp.escape( filter_targets ), 'i' );
		
		var radius = 0;
		for ( var i = 0; i < Data.options.attacks.level_dist.length; i++ )
		{
			if ( Data.options.attacks.level_dist[ i ] > radius ) {
				radius = Data.options.attacks.level_dist[ i ];
			}
		}
		
		var terrains = Map.getTargets( { radius: radius } );
		
		var targets = [];
		
		if ( terrains[map_type] )
		{
			for (var i=0; i < terrains[map_type].length; i++)
			{
				var target = ( terrains[map_type] )[i];
				// Very complex conditional syntax ;)
				if ( /* check if target terrain exist in the map */
					 target 
					 && 
					 /* check if the target level is the right */
					 level_enable[target.level]
					 &&
					 /* check if the target distance is the right */
					 (
					  Data.options.attacks.level_dist[ target.level ] === 0 || 
					  Data.options.attacks.level_dist[ target.level ] >= Map.getDistance( Map.x, Map.y, target.x, target.y )
					 )
					 &&
					 /* check if we need to filter it */
					 (
					   /* no filter */
					   !do_filter
					   ||
					   /* filter */
					   ( do_filter
					     && 
					     (
					       /* check if the target have a City Name and verifies its filtering */
					       ( target.city_name && filter_pattern.test( target.city_name ) )
						   ||
						   /* check if the target have a Player Name and verifies its filtering */
						   ( target.player_name && filter_pattern.test( target.player_name ) )
						   ||
						   /* check if the target have a Alliance Name and verifies its filtering */
						   ( target.alliance && filter_pattern.test( target.alliance ) )
					     )
					   )
					 )
				  ){
						targets.push (target);
				}
			}
		}
		
		// Sort targets list by distance
		targets.sort( function(a,b){return a.dist - b.dist;} );
		
		t.targets = targets;
		
		return targets;
	},

	checkAttack : function ( target, callback )
	{
		var t = Tabs.Attacks;
		
		var city_id = Seed.cities[0].id;
		var city_idx = 0;
		var available_general;
		
		// check units
		var units = Data.options.attacks.units[target.level].cloneProps();
		
		var total_units = 0;
		for (var unit_type in units)
		{
			if ( units[unit_type] > 0 )
			{
				total_units += units[unit_type];
				if ( Seed.cities[city_idx].units[unit_type] < units[unit_type] )
				{
					callback (translate('Not enough') +' '+ translate(unit_type));
					return;
				}
			}
		}
		
		if ( total_units <= 0 ){
			callback (translate('No Troops Defined'));
			return;
		}
		
		if ( total_units > Seed.cities[0].figures.marches.maximum_troops ) {
			callback (translate('Too many troops for muster point level'));
			return;
		}

		if ( Seed.cities[0].figures.marches.maximum - Seed.total.marches <= 0 ){
			callback (translate('Muster Point') +' '+ translate('Full'));
			return;
		}
		
		// Check & Set Available General
		available_general = getAvailableGeneral ( target.level === 1 );
		if ( available_general === null ){
			callback ( translate('Generals') + ' ' + translate('Unavailable') );
			return;
		}
		
		// Verify if a dragon is available (by Didi)
		var dragons_selected = false;
		var dragon_added = false;
		for ( var dragon_idx = 0; dragon_idx < DRAGONS_NAMES.length; dragon_idx++)
		{
			var dragon_type = DRAGONS_NAMES[ dragon_idx ];
			
			if ( dragon_type == '' ) continue;
			
			var num =  units[dragon_type];
			if ( num > 0 ) { 
				dragons_selected = true;
				var dragon = Seed.dragons[dragon_type];
				
				if ( dragon_added       ||
					 !dragon.is_in_city || 
					 !dragon.can_attack || 
					 (dragon.life / dragon.maximum_life   <= 0.75 )
					) {
					units[dragon_type] = 0;
				} else {
					dragon_added = true;
				}
			}
		}

		// If there is some dragon selected, but none are available to send, cancel the request
		if ( dragons_selected && !dragon_added )
		{
			if ( options.onFailure )
			{
				// We return the notice to the function sendAttack to delay the next attempt
				options.onFailure ( { errmsg: translate('Dragon') + ' ' + translate('Unavailable') } );
			}
			return;
		}
		
		
		var attack_msg =  translate('Manual attack sent to') + ': ' + translate(Data.options.map.selected) + ' ' + translate('Level') + ' ' + target.level + ' ' +  translate('at') + ' ' + target.x +'/'+ target.y;
		
		var attack_msg_log =  'Manual attack sent to: ' + Data.options.map.selected + ' Level ' + target.level + ' at ' + target.x +'/'+ target.y;
		
		verboseLog(attack_msg_log +' Attempted');
		
		new MyAjax.marches ({
			city_id    : city_id,
			x          : target.x,
			y          : target.y,
			general_id : available_general.id,
			units      : units,
			owner_id   : 'attacks',
			delay      : 3000,
			
			onSuccess  : function ( r ) {
				
				Marches.add(r.job.march_id, 'attacks');
				
				Data.options.marches.requests.counter++;
				
				var xy = target.x + ',' + target.y;
				if ( !Map.states[ xy ] ) {
					Map.states[ xy ] = {};
				}
				Map.states[ xy ].last_attack = serverTime();
				
				verboseLog(attack_msg_log +' Successfully');
				t.dispFeedback(attack_msg);
				
				if ( Data.options.attacks.log_attacks ) {
					actionLog(attack_msg);
				}
				
				callback(null);
			},
			
			onFailure  : function ( r ) {
			
				if (r.status && r.status === 509)
				{
				/*
					if ( Data.options.marches.requests.counter > 30 ) {
						Data.options.marches.requests.max_per_hour = Data.options.marches.requests.counter;
					}
				*/
				}

				verboseLog(attack_msg_log +' <b>failed and returned</b> error: '+ r.errmsg);

				t.dispFeedback (translate('Error') + ': ' + r.errmsg);

				callback(null);
			},
			caller : 'Tabs.Attacks.checkAttack'
		});
	},
	

	
	//*** Attacks Tab - Levels Sub-Tab ***
	//----------------------------------------------------------------------------
	tabLevels : function ()
	{
		var t = Tabs.Attacks;
		
		var city = Seed.cities[0];
		
		if ( ! t.targets.length ) {
			t.getActiveObjectList();
		}

		// New content area here
		var html = 
		 '<div id=' + setUID('Tabs.Attacks.tabLevels.title') +' class="' + UID['title'] + '">' + translate('Attacks') + '&nbsp;' + translate(Data.options.map.selected) + '</div>';
		 
		// MapChoice Selector
		setUID('Tabs.Attacks.tabLevels.selectMap');
		html += '<table>'
		+ '<tr>'
		+ '	<td align=right>&nbsp;'
		+ '		<b>' + translate('Choose') + '</b>'
		+ '	</td>'
		+ '	<td>&nbsp;:'
		+ '		<select id=' + UID['Tabs.Attacks.tabLevels.selectMap'] + '>';
		
		for (var type in Map.targets)
		{
			if ( type === 'City' ) {
				html += '<option disabled="disabled">-----------------------</option>';
			}
			html += 
			  '<option value="' + type + '" ' + (type===Data.options.map.selected ? 'selected' : '') + '>'
			+ translate(type) 
			+ '</option>';
		}
		
		html += 
		+ '		</select>'
		+ '	</td>'
		+ '	<td>'
		+ '	<span class=jewel>'
		+ '	<div id=' + setUID('Tabs.Attacks.tabLevels.targetsInfo') + ' style="padding-left:5px;">' + translate('Targets') + ':&nbsp;<b>' + t.targets.length + '</b>&nbsp;' + translate('of') + '&nbsp;<b>' + Map.targets[ Data.options.map.selected ].length +'</b></div>'
		+ '	</span>'
		+ '	</td>'
		+ '</tr>'
		+ '</table>';
		
		html +=
		 '<div style="height:380px; overflow-y:auto">'
		+'	<table class="' + UID['compact_table'] + ' ' + UID['hide_inputbox'] +'">'
		+'		<tr class=' + UID['row_top_headers'] + '>'
		+'			<td style="background:none !important;"></td>'
		+'			<td align=center colspan=11>&nbsp;' + translate('Levels') + '&nbsp;</td>'
		+'		</tr>'
		+'		<tr>'
		+'			<td></td>'
		+'			<th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th>'
		+'		</tr>'
		+'		<tr align=center>'
		+'			<td align=right>' + translate('Enable') + ' </td>';
		
		for (var x=1; x < 12; x++){
			html += 
			 '		<td>'
			+'		<label style="display:block;' + (Data.options.attacks.level_enable[x] ? ' background:#2A7' : '') +'">'
			+'		<input type=checkbox id=' + setUID('Tabs.Attacks.tabLevels.level_enable_' + x) + ' ref=' + x + ' ' + (Data.options.attacks.level_enable[x] ? ' checked' : '') + ' />'
			+'		</label>'
			+'		</td>';
		}
		
		html +=
		 '		</tr>'
		+'		<tr align=center>'
		+'			<td align=right>' + translate('Max') + ' ' + translate('Distance').truncate(4,'') + ' </td>';
		
		for (var x=1; x < 12; x++){
			html +=
			  '		<td>'
			 +'		<input type=text id=' + setUID('Tabs.Attacks.tabLevels.level_dist_' + x) + ' ref=' + x + ' size=2 style="width:25px;" value="' + Data.options.attacks.level_dist[x] + '"/>'
			+'		</td>';
		}
		
		html +=
		 '		</tr><tr>'
		+'				<td><div class=short></div></td>'
		+'			</tr>';
		
		var current_units = [];
		for (i=0; i < t.units_type.length; i++)
		{
			if ( getUnitNumbers(city, t.units_type[i]).total )
			{
				var color = 'rgba(255,255,255,0.8)';
				if ( i < 5 ) color = 'rgba(210,210,210,0.8)';
				else if ( i < 8 ) color = 'rgba(190,240,190,0.8)';
				else if ( i < 10 ) color = 'rgba(240,240,190,0.8)';
				else if ( i < 12 ) color = 'rgba(190,190,240,0.8)';
				else if ( i < 16 ) color = 'rgba(200,190,250,0.8)';
				else color = 'rgba(240,190,190,0.8)';
				
				html +=
				 '	<tr style="background-color:' + color + ';">'
				+'		<td class=jewel title="' + translate(t.units_type[i]) + '" align=right valign=middle>'
				+ 			translate('~' + t.units_type[i]).substring(0,5)
				+'			<span class="' + UID['doa-icons'] + ' i-' + t.units_type[i] + '"></span>'
				+'		</td>';
				
				for (var x=1; x < 12; x++)
				{
					var num = Data.options.attacks.units[x][t.units_type[i]];
										
					if ( !num ) { num = 0; }
					
					html += 				
					 '<td>'
					+'<input type=text id=' + setUID('Tabs.Attacks.tabLevels.level_units_' + x + '_' + i) + ' ref=' + (x + '_' + i) + ' maxlength=6 size=2 style="width:36px;' + (num ? '' : 'color:#888;') + '" value="' + num + '" title="' + translate('Total') + ': ' + getTotalUnits(x) + '" />'
					+'</td>';
				}
				html += '</tr>';
				current_units.push(i);
			}
		}
		
		// Add Dragons (by Didi)
		
		// Check if some dragon have requirements ready to attack
		var show_dragons = false;
		for ( var dragon_type in Seed.dragons )
		{
			if ( Seed.dragons[dragon_type] &&  Seed.dragons[dragon_type].can_attack ){
				show_dragons = true;
				break
			}
		}
		
		var current_dragons = [];
		if ( show_dragons ) 
		{
			html += 
			  '<tr><td colspan=12 style="background:none !important;">&nbsp;</td></tr>'
			+ '<tr>'
			+ '  <td>&nbsp;</td>'
			+ '  <th colspan=11 align=center>' + translate('Send') + ' ' + translate('Dragon') + ' ' + translate('Available') + '</th>'
			+ '</tr>'
			
			for ( var dragon_type in Seed.dragons )
			{
				if ( Seed.dragons[dragon_type] &&  Seed.dragons[dragon_type].can_attack )
				{
					//var dragon_idx = Seed.dragons[dragon_type].index;
					html +=
					 '<tr align=center style="background:rgba(240,190,190,0.8);">'
					+'	<td class=jewel align=right valign=middle title="'+ translate( dragon_type ) + '">'
					+	 	translate( '~' + dragon_type ).substring(0,5)
					+'		<span class="' + UID['doa-icons'] + ' i-' + dragon_type + '"></span>'
					+'	</td>';
					
					for (var x=1; x < 12; x++){
						
						var num = Data.options.attacks.units[x][dragon_type];
						if (!num){ num = 0;	}
    	
						html += 
						 '	<td>'
						+'	<label style="display:block;">'
						+'	<input type=checkbox id=' + setUID('Tabs.Attacks.tabLevels.dragon_enable_' + x + '_' + dragon_type) + ' ref=' + (x + '_' + dragon_type) + ' ' +( num !== 0 ?' checked' : '' ) +' />'
						+'	</label>'
						+'	</td>';
					
					}
					html += '</tr>';
					current_dragons.push(dragon_type);
				}
			}
		} 

		html += '</table></div>';

		
		$J('#'+UID['Tabs.Attacks.content']).html( html );

		// add event listeners ...
		
		$J('#'+UID['Tabs.Attacks.tabLevels.selectMap']).change( onMapChoice );
		
		for (var x=1; x < 12; x++)
		{
			$J('#'+UID['Tabs.Attacks.tabLevels.level_enable_' + x]).change( onChangeLevelEnable );
			$J('#'+UID['Tabs.Attacks.tabLevels.level_dist_' + x]).change( onChangeDistance );
		}
		
		for ( i=0; i < current_units.length; i++ )
		{
			for ( var x=1; x < 12; x++ )
			{
				$J('#'+UID['Tabs.Attacks.tabLevels.level_units_'+ x +'_'+ current_units[i]]).change( onChangeUnits );
			}
		}
		
		//Dragon select (by Didi)
		if ( show_dragons ) {
			for ( i=0; i < current_dragons.length; i++ )
			{
				for ( var x=1; x < 12; x++ )
				{
					$J('#'+UID['Tabs.Attacks.tabLevels.dragon_enable_'+ x +'_'+ current_dragons[i]]).change( onChangeDragons );
				}
			}
		}
		

		function onChangeDistance ( event )
		{
			var x = parseIntZero($J(event.target).val());
			var n = $J(event.target).attr('ref');
			
			if ( isNaN(x) || x < 0 || x > 375 ){
				$J.msg({ 
					content : '<center>'
							+ translate('Distance must be between') + '<br>'
							+ ' 0 ' + translate('and') +' 375' + translate('miles')
							+ '</center>',
					timeOut	: 'words', /* Words per minute*/
					target	: t.container
				});
				
				x = Data.options.attacks.level_dist[n];
			} 
			Data.options.attacks.level_dist[n] = x;
			onChangeConfig();
		}
		
		function onMapChoice ( event )
		{
			var t = Tabs.Attacks;
			
			if (Data.options.attacks.enabled) 
			{
				/* It would be very bad to leave attack on when switching targets. 
					Imagine sending the units for a wilderness to a city or an ant camp...*/
				clearTimeout ( t.timer.attack );
				t.setAttackEnable ( false );
				t.dispFeedback (translate('Safe Mode') +': '+ translate('Attacks') +' '+ translate('Disabled'));
			}
			
			var element = event.target;
			
			Data.options.map.selected = element.options[element.selectedIndex].value;
			
			onChangeConfig();
		}
		
		function onChangeLevelEnable ( event )
		{
			var level = parseInt( event.target.getAttribute('ref') );
			Data.options.attacks.level_enable[level] = event.target.checked;
			event.target.parentNode.style.background = ( event.target.checked ? '#2A7' : 'none');
			onChangeConfig();
		}
		
		function getTotalUnits ( level )
		{
			var total=0;
			for ( var unit_type in Data.options.attacks.units[ level ] )
			{
				total += Data.options.attacks.units[ level ][unit_type];
			}
			return total;
		}
		
		function onChangeUnits ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			var level = args[0];
			var unit_type = t.units_type[ args[1] ];
			var units = parseIntZero(event.target.value);
			var total_units = getTotalUnits(level);
			
			if ( isNaN(units) || units < 0 )
			{
				event.target.style.backgroundColor = '#faa';
				dialogError (translate('Invalid number of troops',t.container));
			}
			else {
				event.target.value = units;
				Data.options.attacks.units[ level ][ unit_type ] = units;
				event.target.style.backgroundColor = '';
				if ( parseInt(event.target.value) > 0 )
				{
					event.target.style.color = '#000';
				}
				
				if ( total_units > Seed.cities[0].figures.marches.maximum_troops ) {
					event.target.style.backgroundColor = '#faa';
					dialogError (translate('Attack Maximum Troops', t.container));
				}
				
				t.tabLevels();
			}
		}
		
		// onChangeDragons (by Didi)
		function onChangeDragons ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			var level = args[0];
			var dragon_name = args[1]
			Data.options.attacks.units[ level ][ dragon_name ] = (event.target.checked ? 1 : 0);
		}

		// onChangeConfig (by Didi)
		function onChangeConfig()
		{
			var t = Tabs.Attacks;
			t.getActiveObjectList(); 
			$J('#'+UID['Tabs.Attacks.title']).html( translate('Attack') + ' ' + translate(Data.options.map.selected) );
			$J('#'+UID['Tabs.Attacks.tabLevels.title']).html( translate('Attacks') + '&nbsp;' + translate(Data.options.map.selected) );
			$J('#'+UID['Tabs.Attacks.tabLevels.targetsInfo']).html( translate('Targets') + ':&nbsp;<b>' + t.targets.length + '</b>&nbsp;' + translate('of') + '&nbsp;<b>' + Map.targets[ Data.options.map.selected ].length +'</b>' );
		}
	},


	//*** Attacks Tab - Targets Sub-Tab ***
	//----------------------------------------------------------------------------
	
	tabTargets : function ()
	{
		var t = Tabs.Attacks;

		if ( ! t.targets.length ) {
			t.getActiveObjectList();
		}
		
		if ( t.targets.length === 0 ){
			t.dispFeedback ( translate('Use the Levels Tab to select attack areas') );
		}
		
		$J('#'+UID['Tabs.Attacks.title']).html( translate('Attack') + ' ' + translate(Data.options.map.selected) );
		$J('#'+UID['Tabs.Attacks.content']).html( '<div id=' + setUID('Tabs.Attacks.tabTargets.content') + '></div>' );
	
		var html = '<div class=' + UID['title'] + '>'
			+ translate('Attacks') + '&nbsp;' + translate(Data.options.map.selected)
			+ '</div>';
		
		// MapChoice Selector
		setUID('Tabs.Attacks.tabTargets.selectMap');
		html += '<table>'
		+ '<tr>'
		+ '	<td align=right>&nbsp;'
		+ '		<b>' + translate('Choose') + '</b>'
		+ '	</td>'
		+ '	<td>&nbsp;:'
		+ '		<select id=' + UID['Tabs.Attacks.tabTargets.selectMap'] + '>';
		
		for (var type in Map.targets)
		{
			if ( type === 'City' ) {
				html += '<option disabled="disabled">---------------------</option>';
			}
			html += '<option value="' + type + '" ' + (type === Data.options.map.selected ? 'selected' : '') + '>'
			+ translate(type) 
			+ '</option>';
		}
		
		var level_dist = [];
		for (var i=1; i < Data.options.attacks.level_dist.length; i++)
		{
			if ( Data.options.attacks.level_enable[i] )
			{
				level_dist.push(Data.options.attacks.level_dist[i]);
			}
		}
		level_dist.sort( function(a,b){return a-b;} );
		var distance_range = (level_dist.first() !== level_dist.last()) ? level_dist.first() + ' - ' + level_dist.last() : level_dist[0];
		
		var map_type = Data.options.map.selected;
		var filter_enable = ( /(City|Outpost|Wildernesses)/.test( map_type ) );
		var show_type = ( map_type === 'Wildernesses' );
		
		html += '		</select>&nbsp;'
		+ '	</td>';
		
		if ( filter_enable ){
			html += 
			  '	<td>' + translate('Filter') + ':&nbsp;</td>'
			+ '	<td>'
			+ '	<input type=text size=22 id=' + setUID('Tabs.Attacks.tabTargets.filter') + ' value="' + t.filter_targets + '" />'
			+ '	</td>';
		}
		
		html += 
		  '	</tr>'
		+ '	<tr>'
		+ '	<td colspan=2>'
		+ '		<span class=jewel>' + t.targets.length + ' ' + translate('of') + ' ' + Map.targets[ map_type ].length + ' (' + translate('Distance') + ' ' + translate('Max') + ': ' + distance_range + ')</span>'
		+ '	</td>'
		+ '	</tr>'
		+ '</table>'
		+ '<div style="width:490px;height:400px;">'
		+ '	<table id='+ setUID('Tabs.Attacks.tabTargets.table') +' class="' + UID['table'] + ' font8 zebra" style="width:490px;">'
		+ '   <thead class=fixed>'
		+ '		<tr>'
		+ '			<th style="width:30px;">'      + translate('Distance').substring(0,4)    + '</th>'
		+ '			<th style="width:40px;">'      + translate('Coordinates').substring(0,5) + '</th>'
		+ ( show_type ? '<th style="width:25px;">' + translate('Type') + '</th>' : '' )
		+ '			<th style="width:20px;">'      + translate('Level').substring(0,3)       + '</th>'
		+ '			<th style="width:45px;">'      + translate('Last Attack').split(' ').join('<br/>') +'</th>'
		+ '			<td style="width:70px;"></td>';
		
		//if ( filter_enable ) {
			html += 
			'		<th style="width:50px;">' + translate('Power') + '</th>'
			+ '		<th style="width:80px;">' + translate('City') + '</th>'
			+ '		<th style="width:100px;">' + translate('Alliance') + '</th>';
		/*
		}
		else {
			html += 
			  '		<th style="width:90px;"></th>'
			+ '		<th style="width:100px;"></th>';
		}
		*/
		
		html += 
		'		</tr>'
		+ '   </thead>'
		+ '   <tbody class=scrollable style="height:370px;width:490px;">';
		
		for (var i=0; i < t.targets.length; i++)
		{
			var type = t.targets[i].city_type ? Map.names.cities[ t.targets[i].city_type ] : Map.names.type[ t.targets[i].type ];
		
			html +=	'<tr ' + (t.targets[i].attackable ? '' : 'class=' + UID['no-attackable'] + ' ');
			
			if ( t.targets[i].city_name )
			{
				html +=	'  title="'
				+ translate('City') + ': ' + t.targets[i].city_name +' \n'
				+ translate('Name') + ': ' + (t.targets[i].player_name || '???') + ' \n'
				+ translate('Power') + ': ' + t.targets[i].might +' \n'
				+ translate('Alliance') + ': ' + (t.targets[i].alliance || '---')
				+ '"';
			}
						
			
			html += '>'
			+'<td style="width:30px;">' 
			+ 	t.targets[i].dist
			+'</td>'
			+'<td style="width:40px;" align=center>' 
			+ 	t.targets[i].x + '/' + t.targets[i].y 
			+'</td>'
			+ (show_type ? '<td style="width:25px;"><span class="' + UID['doa-icons'] + ' i-' + type + '"></span></td>' : '') 
			+'<td style="width:20px;" align=center>' 
			+	 t.targets[i].level
			+'</td>'
			+'<td style="width:45px;" align=right>'
			+'	<span id=' + setUID('Tabs.Attacks.tabTargets.last_attack_'+i) + '> --- </span>'
			+'</td>'
			+'<td style="width:75px;">'
			+ 	(t.targets[i].is_friend ? '' : '<input id=' + setUID('Tabs.Attacks.tabTargets.attack_btn_'+i) + ' ref=' + i + ' class=thin type=button value=" ' + translate('Attack') + '! " />' );
			
			// Add checkbox for enable/disable attack button on cities and outposts
			if ( t.targets[i].city_name )
			{
				if ( !t.targets[i].is_friend ){
					html += 
					'&nbsp;<input id=' + setUID('Tabs.Attacks.tabTargets.toggle_btn_'+i) + ' ref=' + i + ' type=checkbox ' + (t.targets[i].attackable ? 'checked' : '') +' />';
				}
				html += 
				 '</td>'
				+'<td style="width:50px;" align=right>'
				+ (t.targets[i].might > 1000 ? parseInt(t.targets[i].might/1000).intToCommas() + ' K' : t.targets[i].might.intToCommas())
				+'</td>'
				+'<td style="width:80px;">'
				+ (t.targets[i].city_name || '').truncate(10).replace('...','..')
				+'</td>'
				+'<td style="width:100px;">' 
				+ (t.targets[i].alliance || '-----').toString().truncate(13).replace('...','..');
			}
			else {
				html += 
				  '</td>'
				 +'<td style="width:50px;"></td>'
				 +'<td style="width:80px;"></td>'
				 +'<td style="width:100px;"></td>';
			}
			
			html += '</td></tr>';

		}
		
		html +=
		 '   </tbody>'
		+'	</table>'
		+'</div>';

		var $content = $J('#'+UID['Tabs.Attacks.tabTargets.content']);
		
		$content.html( html );
		$content.css('height', ($content.parent().outerHeight() - 5) + 'px');
		
	
		// Add the event listeners
		$J('#'+UID['Tabs.Attacks.tabTargets.selectMap']).change( onMapChoice );
		
		$J('#'+UID['Tabs.Attacks.tabTargets.filter']).change(function(event) {
			
			//if ( event.which === 13 ) 
			//{
				if ( Data.options.attacks.enabled ) 
				{
					/* It would be very bad to leave attack on when switching targets. 
					Imagine sending the units for a wilderness to a city or an ant camp...*/
					clearTimeout ( t.timer.attack );
					t.setAttackEnable ( false );
					t.dispFeedback ( translate('Safe Mode') +': '+ translate('Attacks') +' '+ translate('Disabled') );
				}
				
				t.filter_targets = $J(this).val();
				t.getActiveObjectList();
				t.tabTargets();
			//}
		});
		
		for (var i=0; i < t.targets.length; i++) 
		{
			var but_attack = $id(UID['Tabs.Attacks.tabTargets.attack_btn_'+ i]);
			if ( !but_attack ) continue;
			
			$J(but_attack).click ( butAttackNow );
			
			if ( $J('#'+UID['Tabs.Attacks.tabTargets.toggle_btn_'+ i]) )
			{
				$J('#'+UID['Tabs.Attacks.tabTargets.toggle_btn_'+ i]).click ( toggleAttackable );
			}
			setButtonStyle ( but_attack, t.targets[i].attackable );
		}
		
		function setButtonStyle (element, enabled) 
		{
			if ( enabled ) {
				element.disabled = false;
				$J(element).removeClass(UID['bnt_red']);
				$J(element).addClass(UID['bnt_green']);
			}
			else {
				element.disabled = true;
				$J(element).removeClass(UID['bnt_green']);
				$J(element).addClass(UID['bnt_red']);
			}
		}
		
	
		function onMapChoice (event)
		{
			var t = Tabs.Attacks;
			
			if (Data.options.attacks.enabled) 
			{
				/* It would be very bad to leave attack on when switching targets. 
					Imagine sending the units for a wilderness to a city or an ant camp...*/
				clearTimeout ( t.timer.attack );
				t.setAttackEnable ( false );
				t.dispFeedback (translate('Safe Mode') +': '+ translate('Attacks') +' '+ translate('Disabled'));
			}
			
			var element = event.target;
			
			Data.options.map.selected =  element.options[element.selectedIndex].value;
			
			t.getActiveObjectList();
			
			t.tabTargets();
		}

		function butAttackNow ( event )
		{
			var n = parseInt(event.target.getAttribute('ref'));
			
			$J.msg({ 
				content : translate('Attacking') + '...',
				target	: t.container,
				timeOut : 5000
			});

			t.checkAttack (t.targets[n], notify);
			function notify (r){
				if (r!==null){

				}
			}
		}
		
		function toggleAttackable ( event )
		{
			var n = parseInt(event.target.getAttribute('ref'));
			
			var xy = t.targets[n].x + ',' + t.targets[n].y;
			
			t.targets[n].attackable = Map.states[ xy ].attackable = event.target.checked;
			
			setButtonStyle ($id(UID['Tabs.Attacks.tabTargets.attack_btn_'+n]), t.targets[n].attackable);     
			event.target.parentNode.parentNode.className = ( t.targets[n].attackable ? '' : UID['no-attackable'] );
		}
		
		function targetsTick ()
		{
			var now = serverTime();
			for (var i=0; i < t.targets.length; i++)
			{
				var target_states = Map.states[ t.targets[i].x + ',' + t.targets[i].y ];
				if ( target_states && target_states.last_attack )
				{
					var time = now - target_states.last_attack;
					var time_format = timeFormat (time, false);
					if ( time > 3600 ) {
						time_format = '<font color=#550000><b>'+ time_format +'</b></font>';
					}
					$J('#'+UID['Tabs.Attacks.tabTargets.last_attack_'+i]).html( time_format );
				}
			}
		}
		
		if ( t.targets.length ){
			var delay;
			if ( t.targets.length < 50 ){
				delay = 1000;
			} else {
				delay = parseInt(t.targets.length/50*1000);
			}
			clearTimeout ( t.timer.targets );
			t.timer.targets = setInterval (targetsTick, delay);
		}
		
	},

	
	//*** Attacks Tab - Stats Sub-tab ***
	//----------------------------------------------------------------------------
	tabStats : function ()
	{
		var t = Tabs.Attacks;

		var html = 
		 '<div class=' + UID['title'] + '>' + translate('Statistics') + '</div>'
		+'<div id='+ setUID('Tabs.Attacks.tabStats.content') + ' class=' + UID['content'] + '></div>'
		+'<center><input id=' + setUID('Tabs.Attacks.tabStats.clear') + ' type=button value="' + translate('Delete') + ' ' + translate('Statistics') +'" /></center>';
		
		$J('#'+UID['Tabs.Attacks.content']).html( html );
		
		$J('#'+UID['Tabs.Attacks.tabStats.content']).css({
			height : $J('#'+UID['Tabs.Attacks.content']).innerHeight()-55 + 'px',
			marginBottom : '4px'
		});
		
		$J('#'+UID['Tabs.Attacks.tabStats.clear']).click(function(){
			t.clearStats();
			t.showStats();
		});

		t.showStats();
	},

	// byLevel.resources
	clearStats : function ()
	{
		var t = Tabs.Attacks;
		var now = serverTime();
		Data.stats.attacks = {
			 start_at	: now
			,run_time	: 0
			,total	: 0
			,levels:[
				'' /* the index zero is not used because the levels are from 1 to 11 */
				,{total:0, items:{}, resources:{}}
				,{total:0, items:{}, resources:{}}
				,{total:0, items:{}, resources:{}}
				,{total:0, items:{}, resources:{}}
				,{total:0, items:{}, resources:{}}
				,{total:0, items:{}, resources:{}}
				,{total:0, items:{}, resources:{}}
				,{total:0, items:{}, resources:{}}
				,{total:0, items:{}, resources:{}}
				,{total:0, items:{}, resources:{}}
				,{total:0, items:{}, resources:{}}
			]
		};
		
		Data.stats.items = {
			 resources : {}
			,speedups  : {}
			,production: {}
			,general   : {}
			,chest     : {}
			,arsenal   : {}
			,armors    : {}
		}
		
		t.running.start_at = now;

		t.showStats(); 
	},
	
	// called when battle report received
	trackStats : function (march_id, r)
	{
		var t = Tabs.Attacks;
		if ( DEBUG_MARCHES ) {
			debugLog ('Tabs.Attacks.trackStats: '+ march_id);
		}
		var level = r.report.location.level;
		
		if (level < 1 || level > 12) {
			level = 0;
		}
		
		++Data.stats.attacks.total;
		++Data.stats.attacks.levels[level].total;
		
		var resources =  r.report.spoils.resources;
		for (var type in resources)
		{
			objAddTo ( Data.stats.items.resources, type, parseInt(resources[type]) );
			objAddTo ( Data.stats.attacks.levels[level].resources, type, parseInt(resources[type]) );
		}  
		
		// add the talismans to the Arsenal gathered.
		// Wham 1120a - these should now go into spoils items
		var kill_items =  r.report.spoils.kill_items;
		for (var type in kill_items)
		{
			objAddTo ( Data.stats.items.arsenal, type, parseInt(kill_items[type]) );
			objAddTo ( Data.stats.attacks.levels[level].resources, type, parseInt(kill_items[type]) );
		}
		
		// Wham 1120a
		// Add items to the stats categories
		var items_res = r.report.spoils.items;
		for (var i=0; i < items_res.length; i++)
		{
			var item = translate( items_res[i] );
			var quantity = parseInt( item );
			quantity = (isNaN(quantity)) ? 1 : quantity;
			var name = (item.replace(/\d/g,'')).strip();
			
			if ( /(Blink|Hop|Skip|Leap|Bounce|Bore|Bolt|Blast)/.test(name) )  {
				objAddTo (Data.stats.items.speedups, name, quantity);
			} 
			else if ( /(Respirators|Volcanic|Mandrakes|Banshee|Reaper|Scale|Glacial|Titan|DragonEgg)/.test(name) ) {
				objAddTo (Data.stats.items.arsenal, name, quantity);
			} 
			else if ( /(Helmet|ClawGuards|BodyArmor|TailGuard)/.test(name) ) {
				objAddTo (Data.stats.items.armors, name, quantity); 
			}
			else {
				objAddTo (Data.stats.items.general, name, quantity); 
			}


			objAddTo (Data.stats.attacks.levels[level].resources, name, quantity);			
			objAddTo (Data.stats.attacks.levels[level].items, items_res[i], 1);
		}

		
		Data.marches.attacks[march_id].has_report = true;
		
		t.showStats();
	},

	showStats : function ()
	{
		var t = Tabs.Attacks;
		
		var run_time = Data.stats.attacks.run_time;
		if ( Data.options.attacks.enabled ) {
			run_time += ( serverTime() - t.running.start_at );
		}
		
		var run_time_fixed = (run_time > 0) ? (run_time/3600) : 1;
		
		// Wham 1119c - add scrollable table
		var html = 
		 '<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<th style="width:155px">' + translate('Start Date') + '</th>'
		+'		<th style="width:155px">' + translate('Run Time') + '</th>'
		+'		<th style="width:155px">' + translate('Attacks') + '</th>'
		+'  </tr>'
		+'  <tr style="border-bottom: 1px solid gray">'
		+'		<td style="text-align:center"><b>' + new Date(Data.stats.attacks.start_at * 1000).myString() + '</b></td>'
		+'		<td style="text-align:center"><b>' + timeFormat(run_time, true) + '</b></td>'
		+'		<td style="text-align:center"><b>' + Data.stats.attacks.total + '</b></td>'
		+'	</tr>'
		+'</table>'
		+'<table class=' + UID['table'] + '>'
        +'  <tr valign=top>'
		+'		<td style="width:50px">' + translate('Armor') + ': </td>'
		+'		<td style="width:415px">'
		+'      <div style="overflow-y:auto;width:410px">'
		+'			  <table class="' + UID['table'] + ' zebra">';
		
		// Dragon Armor
		for (var name in Data.stats.items.armors)
		{
			var per_hour = Data.stats.items.armors[name] / run_time_fixed;
			html += 
			    '	  <tr align=right>'
			   +'			<td style="width:155px">' 
			   +'				<span>' + translate(name) + '</span>'
			   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
			   +'			</td>'
			   +'			<td style="width:100px">' + Data.stats.items.armors[name].intToCommas() + '</td>'
			   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			   +'		</tr>';
		}
		html +=
		 '		  </table>'
		+'    </div>'
		+'		</td>'
		+'  </tr>'
		+'  <tr valign=top>'
		+'    <td style="width:50px">' + translate('Speedup') +': </td>'
		+'    <td>'
		+'      <table class="' +UID['table'] + ' zebra">';
		
		// Speedups - hops, skips
		for (var name in Data.stats.items.speedups)
		{
			var per_hour = Data.stats.items.speedups[name] / run_time_fixed;
			html += 
			    '	  <tr align=right>'
			   +'			<td style="width:155px">' 
			   +'				<span>' + translate(name) + '</span>'
			   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
			   +'			</td>'
			   +'			<td style="width:100px">' + Data.stats.items.speedups[name].intToCommas() + '</td>'
			   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			   +'		</tr>';
		}
		
		html +=
		 '		  </table>'
		+'		</td>'
		+'  </tr>'
		+'  <tr valign=top>'
		+'    <td style="width:50px">' + translate('Arsenal') +': </td>'
		+'    <td>'
		+'      <table class="' +UID['table'] + ' zebra">';
		
		// Arsenal - mandrakes, talons, respirators, talismans, runes
		for (var name in Data.stats.items.arsenal)
		{
			var per_hour = Data.stats.items.arsenal[name] / run_time_fixed;
			html += 
			    '	  <tr align=right>'
			   +'			<td style="width:155px">' 
			   +'				<span>' + translate(name) + '</span>'
			   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
			   +'			</td>'
			   +'			<td style="width:100px">' + Data.stats.items.arsenal[name].intToCommas() + '</td>'
			   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			   +'		</tr>';
		}

		html +=
		 '		  </table>'
		+'		</td>'
		+'  </tr>'
		+'  <tr valign=top>'
		+'		<td style="width:50px">' + translate('Resources') + ': </td>'
		+'		<td>'
		+'			<table class="' + UID['table'] + ' zebra">';
		
		// Resources - food, ore, stone, wood
		for (var name in Data.stats.items.resources)
		{
			var per_hour = Data.stats.items.resources[name] / run_time_fixed;
			html += 
			 '	<tr align=right>'
			+'			<td style="width:155px">'
			+'				<span>' + translate(name) + '</span>'
			+'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
			+'			</td>'
			+'			<td style="width:100px">' + Data.stats.items.resources[name].intToCommas() + '</td>'
			+'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			+'		</tr>';
		}
		
		html +=
		 '		</table>'
		+'		</td>'
		+'</tr></table>';
		
		html +=
		 '<br><div class=' + UID['subtitle'] + '>'+ translate('Statistics') +'&nbsp;'+ translate('of') +'&nbsp;'+ translate('Attacks') +' '+ translate('and') +' '+ translate('Items') +'</div>'
		+'<div style="overflow-y:auto;height:156px">'
		+'	<table class="' + UID['table'] + ' zebra">'
		+'		<tr class=' + UID['row_top_headers'] + ' align=center>'
		+'			<td style="background:none !important;"></td>'
		+'			<td align=right colspan=12>'+ translate('Levels') +'</td>'
		+'		</tr>'
		+'		<tr>'
		+'			<td></td>';
		
		for ( i=1; i < 12; i++ ) 
		{
			html += '<th width=45>' + i + '</th>';
		}
		
		html +=
		 '		</tr>'
		+'		<tr>'
		+'			<td colspan=12><HR class=thin></td>'
		+'		</tr>'
		+'		<tr align=right>'
		+'			<td># ' + translate('Attacks') + ':</td>';
		
		for ( i=1; i < 12; i++ )
		{
			html += '<td>' + Data.stats.attacks.levels[i].total + '</td>';
		}
		
		html +=
		'		</tr>'
		+'		<tr>'
		+'			<td colspan=12><HR class=thin></td>'
		+'		</tr>';
		
		var items =  flipStats ('items');     
		for (var p in items)
		{
			html +=
			'<tr align=right>'
			+'		<td>' + translate(p) + ':</td>';
			
			for ( i=1; i < 12; i++ )
			{
				html += '<td>' + items[p][i] + '</td>';
			}
		}
		
		html += '</tr>'
		+'	</table>'
		+'</div>';
		
		$J('#'+UID['Tabs.Attacks.tabStats.content']).html( html );
		
		function flipStats ( name )
		{
			var o = {};
			for ( var i=1; i < 12; i++ )
			{
				for ( var p in Data.stats.attacks.levels[i][name] )
				{
					if (!o[p])
					{
						o[p] = [];
						for ( var x=1; x < 12; x++ )
						{
							o[p][x] = 0;
						}
					}
					o[p][i] += Data.stats.attacks.levels[i][name][p];
				}
			}
			return o;
		}
	},
	

	
	//*** Attacks Tab - Maps Sub-tab ***
	//----------------------------------------------------------------------------
	map_viewer 		 : null,
	map_viewer_dragger : null,
	map_viewer_terrains:{
		AnthropusCamp:{ enabled:false, color:['0x90','0xB0','0x80'] },
		Bog			 :{ enabled:false, color:['0xC0','0x70','0xB0'] },
		Forest		 :{ enabled:false, color:['0x50','0xA0','0x50'] },
		Grassland	 :{ enabled:false, color:['0x80','0xC0','0x50'] },
		Hill		 :{ enabled:false, color:['0x30','0xB0','0x90'] },
		Lake		 :{ enabled:false, color:['0x50','0x50','0xD0'] },
		Mountain	 :{ enabled:false, color:['0x60','0xB0','0xB0'] },
		Plain		 :{ enabled:false, color:['0xB0','0xB0','0x60'] },
	/*  Fog			 :{ enabled:false, color:['0x30','0x30','0x30'] }, */
		City		 :{ enabled:true,  color:['0xDA','0xD0','0xD0'] },
		Water		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Stone		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Fire		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Wind		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Ice			 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Swamp		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Desert		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Spectral	 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Wildernesses :{ enabled:false, color:['0xC0','0x70','0x70'] },
	},
	
	tabMaps : function()
	{
		var t = Tabs.Attacks;

		var html = 
		 '<div class=' + UID['subtitle'] + '>' + translate('Search') + ' ' + translate('Cities') + '</div>'
		+'<div style="width:100%">'
		+'	<center>'
		+'	<br>'
		+'	<table>'
		+'		<tr>'
		+'			<td style="min-width:100px">'
		+'				<b>'+ translate('Coordinates') +':&nbsp;</b>&nbsp;'
		+'			</td>'
		+'			<td>'
		+'				<b>X:</b> '
		+'				<input id=' + setUID('Tabs.Attacks.tabMaps.coord_x') + ' size=3 maxlength=3 type=text value="' + Data.options.map.x + '" /> '
		+'				<b>Y:</b> '
		+'				<input id=' + setUID('Tabs.Attacks.tabMaps.coord_y') + ' size=3 maxlength=3 type=text value="' + Data.options.map.y + '" /> '
		+'			</td>'
		+'			<td>&nbsp;'
		+'				<input id=' + setUID('Tabs.Attacks.tabMaps.viewMap') + ' type=button value="' + translate('View Map') + '" />'
		+'			</td>'
		+'		</tr>'
		+'		<tr>'
		+'			<td colspan=3>&nbsp;</td>'
		+'		</tr>'
		+'		<tr>'
		+'			<td>'
		+'				<b>' + translate('Search Radius') + ':</b>&nbsp;'
		+'			</td>'
		+'			<td>&nbsp;&nbsp;'
		+'				<select id=' + setUID('Tabs.Attacks.tabMaps.radius') + '>';
		
		for ( var i=7; i <= 35; i+=7 )
		{
			html +=
			'			<option value="' + i + '" ' + (Data.options.map.radius === i ? 'selected' : '') + '>' + i + '</option>';
		}
		
		html += 
		 '				<select> '
		+ translate('miles') + '.&nbsp;&nbsp;'
		+'			</td>'
		+'			<td>&nbsp;'
		+'				<input id=' + setUID('Tabs.Attacks.tabMaps.search') + ' type=button value="' + translate('Search') + ' ' + translate('Cities') + '" />'
		+'			</td>'
		+'		</tr>'
		+'	</table>'
		+'	<br>'
		+'	<br>'
		+'	<table class="' + UID['table'] + ' zebra">'
		+'		<tr>'
		//+'			<th>' + translate('view')  + '</th>'
		+'			<th>' + translate('type')  + '</th>'
		+'			<th>' + translate('total') + '</th>'
		+'		</tr>';
		
		// Add Search Report
		
		for ( var map_type in Map.targets )
		{
			html += 
			 '<tr>'
			//+'	<td>'
			//+'	<input type=checkbox id=' + setUID('Tabs.Attacks.tabMaps.show_' + map_type) + ' ref=' + Map.names.type[ map_type ] + ' ' + (t.map_viewer_terrains[ map_type ].enabled ? 'CHECKED' : '') + '/>'
			//+'	</td>'
			+'	<td>' 
			+'		<span class="' + UID['doa-icons'] + ' i-' + map_type + '"></span>'
			+ 		translate( map_type )
			+'	</td>'
			+'	<td align=right>'
			+'		<span class=jewel>' + Map.targets[ map_type ].length + '</span>'
			+'	</td>'
			+'</tr>';
		}
		

		html +=
		 '</table>'
		+'<center>'
		+'</div>';
		
		// Display the inputs
		$J('#'+UID['Tabs.Attacks.content']).html ( html );

		// add event listeners
		$J('#'+UID['Tabs.Attacks.tabMaps.search']).click ( startScanMap );
		
		$J('#'+UID['Tabs.Attacks.tabMaps.viewMap']).click ( setMapViewer );
		
		$J('#'+UID['Tabs.Attacks.tabMaps.radius']).change (function ( event ) {
			
			var element = event.target;
			Data.options.map.radius = parseInt(element.options[element.selectedIndex].value);
			
			if ( t.map_viewer_dragger ) 
			{
				var r = Data.options.map.radius;
				var size = r * 2;
		
				t.map_viewer_dragger.width ( (size - 1) + 'px' );
				t.map_viewer_dragger.height( (size - 1) + 'px' );
				
				var x = parseInt ( $J('#'+UID['Tabs.Attacks.tabMaps.coord_x']).val() ) - r;
				var y = parseInt ( $J('#'+UID['Tabs.Attacks.tabMaps.coord_y']).val() ) - r;
				t.map_viewer_dragger.css({
					left		 : x + 'px',
					top			 : y + 'px',
				});
				
				var $coords_box = $J('#' + UID['map-viewer-dragger-box'] + ' > div');
				if ( y < 100 ) {
					$coords_box.css('margin-top', (r*2+10)+'px');
				} 
				if ( x > 600 ) {
					$coords_box.css('margin-left', '-'+(r*2+30)+'px');
				}
				
			}
		});
		
		
		// search the map for the selected type
		function startScanMap ( event )
		{
			// Disable the search button to avoid creating multiple processes
			var $button = $J(this);
			$button.attr('disabled', true);
		
			verboseLog('<b>scanMap</b>: Begin...');

			var t = Tabs.Attacks;

			var dialogbox = dialogBox({
				id		 : setUID('dialog-scanmap'),
				minWidth : 400,
				centerTo : t.container,
				buttons  : [],
				overlay  : true,
				title	 : translate('Search') + ' ' + translate('Cities'),
				html	 : '<center>' + translate('Scanning Map').replace('$NUM$', Data.options.map.radius) + '<br><br><div class=progressbar></div></center>'
			});
			
			var x = $J('#'+UID['Tabs.Attacks.tabMaps.coord_x']).val() || Data.options.map.x;
			var y = $J('#'+UID['Tabs.Attacks.tabMaps.coord_y']).val() || Data.options.map.y;
			var radius = Data.options.map.radius;
			
			Map.scanMap ({
				x         : x,
				y         : y,
				radius    : radius,
				
				onStart   : function ( r ) {
					StepTimeBar.start ({
						target : $J('#'+UID['dialog-scanmap']+' .progressbar'),
						steps  : r.steps
					});
				},
				
				onProgress: function ( r ) {
					StepTimeBar.update ( r.step );
				},
				
				onSuccess : function( r ) {
					// Re-enable the search button for the next request
					$button.attr('disabled', false);
				
					verboseLog('scanMap: complete!');

					Tabs.Attacks.check_map_busy = false;
					
					var html = 
					 '<center>'
					+'<br>' 
					+ translate('complete') + '!'
					+'<br><br>'
					+ translate('total') + ' ' + r.founds;
					
					dialogbox.html(html);
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Accept'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
					dialogbox.timeOut('15s');
					
					// Refresh the Tab Content
					t.tabMaps();
					
					// Refresh the MapView if is Open
					if ( t.map_viewer && t.map_viewer.isOpen() ) {
						setMapViewer();
					}
				},
				
				onFailure : function( r ) {
					// Re-enable the search button for the next request
					$button.attr('disabled', false);
				
					verboseLog('<b>scanMap</b>: there was an <b>error</b> while scanning the map');
					
					if ( r !== null && r.error ) {
						dialogbox.html( r.error );
					} else {
						dialogbox.html('<B>' + translate('Bummer, there was an error while scanning the map') + '.</B>');
					}
					
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Accept'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
					Tabs.Attacks.check_map_busy = false;
				},
				
				caller : 'Tabs.Attacks.tabMaps.startScanMap'
				
			});
			
		}
		
		// View
		function setMapViewer ( event )
		{

			// Make Container Window
			if ( t.map_viewer === null )
			{
				t.map_viewer = dialogBox({
					id			: UID['map-viewer-box'],
					dialogClass : UID['map-viewer-box'],
					buttons		: {},
					notdestroy	: true,
					position 	: [0,0],
					width		: 752,
					height		: 774,
					title		: translate('View') + ' ' + translate('Map'),
					html		: '<div style="height:750px;width:750px;" id=' + setUID('map-viewer-image') + '></div>'
				});
				t.map_viewer.option( 'show', null );
				t.map_viewer.option( 'hide', null );
				
				t.map_viewer.wheelDelta=0;
				t.map_viewer.mousewheel(function(event, delta) {
				  if (delta > 0) {
					t.map_viewer.wheelDelta += 1;
				} else if (delta < 0) {
					 t.map_viewer.wheelDelta -= 1;
				}
				
				return false; // prevent default
				});
			}
			
			t.map_viewer.open();
			
			// Make PNG Map
			var image = new PNGlib(750, 750, 256); // construcor takes height, weight and color-depth
			var bgcolor = image.color('0x40', '0x50', '0x40'); // set the background
			var fgcolor = image.color('0x70', '0x80', '0x70'); // set the background
			
			var friend = ['0x40','0xF0','0x40'];
			var enemy  = ['0xD0','0x00','0x00'];

			for ( var y=0; y < 750; y++ )
			{
				for ( var x=0; x < 750; x++ )
				{
					var ref = Data.map.terrain[ x + ',' + y ];
					var pixel = image.index(x, y);
					if (ref)
					{
						var map_type = Map.names.cities[ ref[2] ];
						var terrain = t.map_viewer_terrains[ map_type ];
						if ( !terrain ) continue;
						var c = Data.map.players[ ref[0] ].is_friend ? friend : enemy;
						image.buffer[pixel] = terrain.enabled ? image.color(c[0], c[1], c[2]) : fgcolor;
					}
					else {
						image.buffer[pixel] = bgcolor;
					}
				}
			}
			
			$J('#'+UID['map-viewer-image']).
			css('background-image', 'url(data:image/png;base64,' + image.getBase64() + ')');
			
			// Dragger Coords Fixer
			function fixCoords ( x, y )
			{
				var x = x + Data.options.map.radius + 3 - 7;
				switch ( Data.options.map.radius )
				{
				case 7:
					y = y - 14;
					break;
				case 14:
					y = y - 7;
					break;
				case 21:
					y = y + 0;
					break;
				case 28:
					y = y + 7;
					break;
				case 35:
					y = y + 14;
					break;
				}
				
				y = y - 1 - 7;
				return { x:x, y:y };
			}
			
			// Make Dragger box
			if ( t.map_viewer_dragger === null ) 
			{
				t.map_viewer_dragger = $J('<div><div class=jewel></div></div>').
				attr({
					id		: setUID('map-viewer-dragger-box'),
					class	: UID['map-viewer-dragger']
				}).
				appendTo( $J('#'+UID['map-viewer-box']) );
				
				t.map_viewer_dragger.draggable({
					grid : [7,7],
					
					drag : function( event, ui )
					{
						var offset = $J(event.target).offset();
						var r = Data.options.map.radius;
						var coords = fixCoords(offset.left, offset.top);
						
						var x_ini = Map.normalize (coords.x - r);
						var y_ini = Map.normalize (coords.y - r);
						var x_end = Map.normalize (coords.x + r);
						var y_end = Map.normalize (coords.y + r);
						
						t.map_viewer_dragger.html('<div class=jewel>' + x_ini + '/' + y_ini + '&nbsp;-&nbsp;' + x_end + '/' + y_end + '</div>');
						
						var $coords_box = $J('#'+UID['map-viewer-dragger-box']+' > div');
						
						if ( offset.top < 100 ) {
							$coords_box.css('margin-top', (r*2+10)+'px');
						} 
						if ( offset.left > 600 ) {
							$coords_box.css('margin-left', '-'+(r*2+30)+'px');
						}
					},
					
					stop : function( event, ui )
					{
						var offset = $J(event.target).offset();
						var coords = fixCoords(offset.left, offset.top);
						var x = Map.normalize (coords.x);
						var y = Map.normalize (coords.y);
						
						$J('#'+UID['Tabs.Attacks.tabMaps.coord_x']).val(x);
						$J('#'+UID['Tabs.Attacks.tabMaps.coord_y']).val(y);
						
					}
				});
				
			}

			// Set Size & Position of Dragger box
			var r = Data.options.map.radius;
			var x = parseInt ($J('#'+UID['Tabs.Attacks.tabMaps.coord_x']).val() ) - r;
			var y = parseInt ($J('#'+UID['Tabs.Attacks.tabMaps.coord_y']).val() ) - r;
			
			var x_ini = Map.normalize ( x - r );
			var y_ini = Map.normalize ( y - r );
			var x_end = Map.normalize ( x + r );
			var y_end = Map.normalize ( y + r );
			
			var size = r * 2;
			
			t.map_viewer_dragger.
			width  ( ( size - 1 ) + 'px' ).
			height ( ( size - 1 ) + 'px' ).
			css ({
				left		 : x + 'px',
				top			 : y + 'px',
			});
						
			var $coords_box = $J('#' + UID['map-viewer-dragger-box'] + ' > div');
			
			$coords_box.html ( x_ini + '/' + y_ini + '&nbsp;-&nbsp;' + x_end + '/' + y_end );
			
			if ( y < 100 ) {
				$coords_box.css('margin-top', (r*2+10)+'px');
			} 
			if ( x > 600 ) {
				$coords_box.css('margin-left', '-'+(r*2+30)+'px');
			}
			
			
		}
		
	},
	
		//*** Attacks Tab - Config Sub-Tab ***
	//----------------------------------------------------------------------------
	tabOptions : function ()
	{
		var t = Tabs.Attacks;
		
		var html = 
		 '<div class=' + UID['title'] + '>'+ translate('Attacks Configuration') + '</div>'
		+'<div>'
		+'	<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<td>'+ translate('Maximum requests per hour') +':&nbsp;</td>'
		+'		<td>'
		+			Data.options.marches.requests.max_per_hour
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Delay Between Attacks') +':&nbsp;</td>'
		+'		<td>'
		+'		<input id='+ setUID('Tabs.Attacks.tabOptions.delay_min') +' size=3 maxlength=4 type=text value="'+ Data.options.attacks.delay_min +'" />&nbsp;-&nbsp;'
		+'		<input id='+ setUID('Tabs.Attacks.tabOptions.delay_max') +' size=3 maxlength=4 type=text value="'+ Data.options.attacks.delay_max +'" />&nbsp;'+ translate('Seconds').toLowerCase() 
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Delete') +' '+ translate('Battle Report') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.delete_reports') +' '+ (Data.options.attacks.delete_reports?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td>'+ translate('Stop if any troops lost') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.stop_on_loss') +' '+ (Data.options.attacks.stop_on_loss?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Maximum simultaneous marches') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.maximum') +' size=2 maxlength=2 type=text value="'+ Data.options.marches.maximum +'" /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Enable') +' '+ translate('Attacks Logs') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.log_attacks') +' '+ (Data.options.attacks.log_attacks?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td colspan=2><hr></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Dont flag Wildernesses') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.abandon_wildernesses') +' '+ (Data.options.attacks.abandon_wildernesses?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Withdraw troops if they are encamped') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.recall_encamped') +' '+ (Data.options.attacks.recall_encamped?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td colspan=2><hr></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Clear last attack on current map') +'&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.clear_last') +'  type=button value="'+translate('Delete')+'" /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Clear last attack on all maps') +'&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.clear_all') +' '+ (Data.options.attacks.clear_all_targets?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'</table>';
		
		$J('#'+UID['Tabs.Attacks.content']).html( html );
		
		// Add event listeners
		$J('#'+UID['Tabs.Attacks.tabOptions.delete_reports']).change(function ( event ) {
			Data.options.attacks.delete_reports = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions.stop_on_loss']).change(function ( event ) {
			Data.options.attacks.stop_on_loss = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions.log_attacks']).change(function ( event ) {
			Data.options.attacks.log_attacks = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions.abandon_wildernesses']).change(function ( event ) {
			Data.options.attacks.abandon_wildernesses = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions.recall_encamped']).change(function ( event ) {
			Data.options.attacks.recall_encamped = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions._clear_all']).change(function ( event ) {
			Data.options.attacks.clear_all_targets = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions.delay_min']).change( onChangeDelay );
		$J('#'+UID['Tabs.Attacks.tabOptions.delay_max']).change( onChangeDelay );
		$J('#'+UID['Tabs.Attacks.tabOptions.maximum']).change( onChangeMaximum );
		
		$J('#'+UID['Tabs.Attacks.tabOptions.clear_last']).click( clearLast );
		
		function onChangeDelay ( event )
		{
			var min = parseIntNan($id(UID['Tabs.Attacks.tabOptions.delay_min']).value);
			var max = parseIntNan($id(UID['Tabs.Attacks.tabOptions.delay_max']).value);
			if (min < ATTACK_MIN_DELAY || min > 3600 || (max-min) < 25)
			{
				$J.msg({ 
					content : '<center>'
							+ '<h3><b>' + translate('Invalid delays') + '</b></h3><br>'
							+ translate('First value must be between') + '<br>' 
							+ ATTACK_MIN_DELAY + ' ' + translate('and') + ' 3600 ' + translate('Seconds') + ' <br>'
							+ translate('Second value must be at least') + '<br>'
							+ ' 25 ' + translate('above the first value')
							+ '</center>',
					timeOut	: 'words', /* Words per minute*/
					target	: t.container
				});
				
				
				/*
				* WARNING: Changing this values cause Too many requests to the server 
				*          that are monitored. Thats gives them reason to increase the security 
				*          on the servers and, sooner or later, make this scripts unusable.
				*            
				*      PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
				*
				*                   ( We will end up losing everyone )
				*/
				
				if ( min < ATTACK_MIN_DELAY ){
					if( max > min + 25 ) {
						min = max - 25;
					} 
					else {
						min = ATTACK_MIN_DELAY;
						max = min + 25;
					}
				} 
				else if ( min > 3600 ) {
					min = 3600;
					max = min + 25;
				} 
				else {
					max = min + 25;
				}
				$id(UID['Tabs.Attacks.tabOptions.delay_min']).value = min;
				$id(UID['Tabs.Attacks.tabOptions.delay_max']).value = max;
			}
			
			Data.options.attacks.delay_min = min;
			Data.options.attacks.delay_max = max;
		}
		
		function onChangeMaximum ( event )
		{
			var maximum = parseIntNan($J(this).val());
			// Max marches is determined by the muster point level (Wham)
			if ( maximum < 1 || maximum > Seed.cities[0].figures.marches.maximum )
			{
				maximum = Seed.cities[0].figures.marches.maximum;
				$J(this).val(maximum);
			}
			Data.options.marches.maximum = maximum;
		} 
		
		// Clear the information about when the target was last attacked
		// This is useful because attacks always start with the oldest target or, 
		// if no target has been attacked (last === 0), the first target in the list
		function clearLast ( event )
		{
			if ( Data.options.attacks.clear_all_targets ) 
			{
				// Make sure the user has scanned the map
				for (var type in Map.targets) 
				{
					var targets = Map.targets[ type ];
					for (var i=0; i < targets.length; i++) 
					{
						var target_states = Map.states[ targets[i].x + ',' + targets[i].y ];
						target_states.last_attack = 0;
					}
				}
			}
			else {
				// Clear the last attacked field of the currently selected target
				var targets = Map.targets[ Data.options.map.selected ];
				for (var i=0; i < targets.length; i++)
				{
					var target_states = Map.states[ targets[i].x + ',' + targets[i].y ];
					target_states.last_attack = 0;
				}
			}
		}
	}
	
};
//******************************** End Attacks *************************



/***********************************   Jobs Tab   **********************************/
Tabs.Jobs = {
	tab_order		: JOBS_TAB_ORDER,
	tab_label		: 'Tasks',
	tab_disabled	: !JOBS_TAB_ENABLE,
	
	container		: null,
	current_tab		: 0, // 0 = summary, 1 = train, 2 = build, 3 = research
	last_tab_id		: 'tabSummary',
	
	summary			: {
		timer	: {
			stat	: null,
		},
	},
	
	training		: {
		timer	: {
			tick	: null,
			stat	: null,
		},
		errors		: 0,
		error_delay : 60000,
		current_city: 0,
	},
	
	building	: {
		timer	: {
			tick	: null,
			stat	: null,
		},
		errors		: 0,
		error_delay : 60000,
		current_city:0,
	},
	
	research		: {
		timer	: {
			tick	: null,
			stat	: null,
		},
		errors		: 0,
		error_delay : 60000,
	},
	

	research_index	: {Agriculture:0, Woodcraft:1, Masonry:2, Mining:3, Clairvoyance:4, RapidDeployment:5, Ballistics:6, Metallurgy:7, Medicine:8, Dragonry:9, Levitation:10, Mercantilism:11, AerialCombat:12},
	
	research_type	: ['Agriculture', 'Woodcraft', 'Masonry', 'Mining', 'Clairvoyance', 'RapidDeployment', 'Ballistics', 'Metallurgy', 'Medicine', 'Dragonry', 'Levitation', 'Mercantilism', 'AerialCombat'],
	
	building_capital: ['Home', 'Garrison', 'ScienceCenter', 'Metalsmith', 'OfficerQuarter', 'MusterPoint', 'Rookery', 'StorageVault', 'Theater', 'Sentinel', 'Factory', 'Fortress', 'DragonKeep', 'Wall'],
	
	building_outpost: ['TrainingCamp', 'Home', 'Silo', 'MusterPoint', 'DragonKeep', 'Wall'],
	
	building_field	: ['Mine', 'Farm', 'Lumbermill', 'Quarry'],
	
	building_outpost_spectral: ['Mausoleum', 'DarkPortal','SpectralDragonKeep'],
	
	building_field_spectral: ['EnergyCollector'],
	
	
	init : function (div)
	{
		var t = Tabs.Jobs;
		
		// Variables Initializations
		if ( Seed.cities[10] )
		{
			t.research_index += {EnergyCollection:13,  WarriorRevival:14, GuardianRevival:15};
			t.research_type = t.research_type.concat(['EnergyCollection','WarriorRevival','GuardianRevival']);
		}
		
		
		// Tab initialization
		t.container = div;
		var html = 
		 '<ul class=tabs>'
		+'	<li class="tab first">'
		+'		<a id=' + setUID('Tabs.Jobs.tabSummary')  + '>' 
		+'		<span class="' + UID['doa-icons'] + ' i-Summary"></span>'
		+ 			translate('Summary')  
		+'		</a>'
		+'	</li>'
		+'	<li class=tab>'
		+'		<a id='         + setUID('Tabs.Jobs.tabTrain')    + '>'
		+'		<span class="' + UID['doa-icons'] + ' i-Training"></span>'
		+ 			translate('Train')
		+'</a>'
		+'	</li>'
		+'	<li class=tab>'
		+'		<a id='         + setUID('Tabs.Jobs.tabBuild')    + '>'
		+'		<span class="' + UID['doa-icons'] + ' i-Building"></span>'
		+ 			translate('Build')
		+'	</a>'
		+'	</li>'
		+'	<li class=tab>'
		+'		<a id='         + setUID('Tabs.Jobs.tabResearch') + '>'
		+'		<span class="' + UID['doa-icons'] + ' i-Research"></span>'
		+ 			translate('Research')
		+'	</a>'
		+'	</li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Jobs.header') + '></div>'
		+'<div id=' + setUID('Tabs.Jobs.content') + '></div>';
		
		$J( t.container ).html( html );
		
		// Styles & Sets
		$J('#'+UID['Tabs.Jobs.header'])
		.css({
			 height			: '225px'
			,marginBottom	: '2px'
		});
		
		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			  height		: '450px'
			 ,marginTop		: '9px'
		})
		.addClass(UID['content'])
		.addClass('no-overflow');
		
		// Event Listeners
		$J( '#'+UID['Tabs.Jobs.tabSummary']  ).click ( {current_tab:0}, t.showSubTab );
		$J( '#'+UID['Tabs.Jobs.tabTrain']    ).click ( {current_tab:1}, t.showSubTab );
		$J( '#'+UID['Tabs.Jobs.tabBuild']    ).click ( {current_tab:2}, t.showSubTab );
		$J( '#'+UID['Tabs.Jobs.tabResearch'] ).click ( {current_tab:3}, t.showSubTab );
		
		// Enable the jobs
		t.setTrainEnable ( Data.options.training.enabled );
		
		t.setBuildEnable ( Data.options.building.enabled );
		
		t.setResearchEnable ( Data.options.research.enabled );
		
		// Add the unload event listener
		window.addEventListener('unload', t.onUnload, false);
		
	},

	show : function ()
	{
		var t = Tabs.Jobs;
		t.showSubTab ( {data:{ current_tab: Data.options.jobs.current_tab }} );
	},
	
	hide : function ()
	{
		var t = Tabs.Jobs;
		t.clearStatTimers();
	},
	
	onUnload : function () 
	{
		var t = Tabs.Jobs;
	},
	
	showSubTab : function( event )
	{
		var t = Tabs.Jobs;
		
		var current_tab = event.data.current_tab;
		
		Data.options.jobs.current_tab = current_tab;
		
		t.current_tab = current_tab;

		var tab_name;
		switch ( current_tab )
		{
		case 0: tab_name = 'tabSummary'  ; break;
		case 1: tab_name = 'tabTrain'    ; break;
		case 2: tab_name = 'tabBuild'    ; break;
		case 3: tab_name = 'tabResearch' ; break;
		}
		
		$J('#'+UID[t.last_tab_id])
		.css('z-index', '0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Jobs.' + tab_name])
		.css('z-index', '1')
		.addClass('selected');
		
		t.last_tab_id = 'Tabs.Jobs.' + tab_name;
		
		t.clearStatTimers();
		
		t[tab_name] ();
	},

	clearStatTimers : function ()
	{
		var t = Tabs.Jobs;
		clearTimeout (t.summary.timer.stat);
		clearTimeout (t.training.timer.stat);
		clearTimeout (t.building.timer.stat);
		clearTimeout (t.research.timer.stat);
	},
	
	// ** Tab: Jobs - SubTab:  Info
	//--------------------------------------------------------------------
	tabSummary : function ()
	{
		var t = Tabs.Jobs;
		
		var city = Seed.cities[0];
		
		$J( '#'+UID['Tabs.Jobs.header'] )
		.css({
			'height'		: '12pt',
			'margin-bottom'	: '2px'
		})
		.html( '<div>' + translate('Info') + '</div>' );
		
		$J( '#'+UID['Tabs.Jobs.header'] + ' > div' ).addClass(UID['title']);

		$J( '#'+UID['Tabs.Jobs.content'] )
		.css ( {
			'height'		: '670px',
			'margin-top'	: '9px',
			'overflow'      : 'hidden'
		})
		.html('<div><div id="' + setUID('Tabs.Jobs.tabSummary.content') + '"></div></div>'); 

		var $content = $J( '#'+UID['Tabs.Jobs.tabSummary.content'] );
		
		function jobsStatTick ()
		{
			var html = '';
			
			// Capital & Outposts ...
			for ( var city_idx=0; city_idx < Seed.cities.length; city_idx++ ) {
				
				// in case the city is not been defined in Seed.updateCity skip to next in array.
				if ( !Seed.cities[city_idx] ) continue;
				
				html += 
				  cityTitle(city_idx) 
				+'<table class="' + UID['table'] + ' zebra" style="width:100%;">'
				+'<tr style="height:1px;">'
				+'	<td></td>'
				+'	<td width=80%></td>'
				+'	<td></td>'
				+'</tr>'
				+ 		dispBuildingJob(city_idx);

				if ( city_idx === 0 ) 
				{
					html += dispResearchJob(0);
				}
				
				html +=  dispTrainingJobs(city_idx) + '</table>';
			}
			
			$content.html( html );
			// Fix Scroll bug (La Larva)
			$content.css('height' , $content.outerHeight() + 'px');
			$content.parent().css('height' , $J('#'+UID['Tabs.Jobs.content']).innerHeight()-10 + 'px');
			$content.parent().addClass( UID['scrollable'] );
			
		}
		
		
		// Display build queue
		function dispBuildingJob (city_idx)
		{
			var html =
			  '<tr>'
			+ '	<td align=left><b>'+ translate('Building') +':</b> </td>';
			
			var jobs = getJobs ('building', city_idx);
			
			// TODO: very rare occurance: Error: job.building is null
			if ( jobs.length === 0 )
			{
				html +=
				 '	<td align=left>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td width="99%"></td>'
				+'</tr>';
			}
			else {
				var job = jobs[0];
				if( job.run_at > serverTime() )
				{
					var fixed_city_idx = ( /Science|Metal|Officer|Rookery|Storage|Theater|Sentinel|Factory|Fortress/.test(job.city_building_type) ? '0' : city_idx);
					
					html +=
					 '	<td align=left>' 
					+'		<span class="' + UID['doa-icons'] + ' i-' + job.city_building_type + '-' + fixed_city_idx +'"></span>'
					+		translate(job.city_building_type) + ' (' + job.level + ')'
					+'	</td>'
					+'	<td align=right>' 
					+		timeFormat(job.run_at - serverTime(), true)
					+'	</td>'
					+'</tr>';
				}
			}
			return html;
		}
		
		// Display research queue
		function dispResearchJob ( city_idx )
		{
			var html = 
			 '<tr>'
			+'	<td align=left><b>'+ translate('Researching') +': </b></td>';
				
			var jobs = getJobs ('research', city_idx);
			if ( jobs.length === 0 )
			{
				html +=
				 '	<td align=left>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td width="99%"></td>'
				+'</tr>';
			} 
			else {
				var job = jobs [0];
				if( job.run_at > serverTime() )
				{
					html +=
					 '	<td align=left>'
					+'		<span class="' + UID['doa-icons'] + ' i-' + job.research_type + '"></span>'
					+		translate(job.research_type) + ' (' + job.level + ')'
					+'	</td>'
					+'	<td align=right>'
					+		timeFormat(job.run_at - serverTime(), true)
					+ '</td>'
					+'</tr>';
				}
			}
			return html;
		}
		
		// Display training queues
		function dispTrainingJobs ( city_idx )
		{
		if ( !Seed.cities[city_idx] || city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] )
			{
				return '';
			}
			
			var html = 
			 '<tr>'
			+'	<td align=left><b>'+ translate('Training') +': </b></td>';
			
			var jobs = getJobs ('units', city_idx);
			
			if ( jobs.length === 0 )
			{
				html +=
				 '	<td align=left>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td width="99%"></td>'
				+'</tr>';
			}
			else {
				var last_time = serverTime();
			
				jobs.sort( function(a,b){return a.run_at - b.run_at} );
			
				html += 
				 '	<td align=left>'
				+'		<span class="' + UID['doa-icons'] + ' i-' + jobs[0].unit_type + '"></span>'
				+ 		jobs[0].quantity + '&nbsp;' + translate(jobs[0].unit_type)
				+'	</td>'
				+'	<td align=right>'
				+		timeFormat(jobs[0].run_at - last_time, true) 
				+'	</td>'
				+'</tr>';
				
				last_time = jobs[0].run_at;
				
				for ( var i=1; i < jobs.length; i++ )
				{
					var left_time = (jobs[i].run_at - last_time > 0) ? jobs[i].run_at - last_time : 0;
					html +=
					 '<tr>'
					+'	<td>&nbsp;</td>'
					+'	<td align=left>'
					+'		<span class="' + UID['doa-icons'] + ' i-' + jobs[i].unit_type + '"></span>'
					+		jobs[i].quantity + '&nbsp;' + translate(jobs[i].unit_type) 
					+'	</td>'
					+'	<td align=right>'
					+		timeFormat( left_time, true ) 
					+'	</td>'
					+'</tr>';
					
					if ( i > 1 && i === jobs.length - 1 )
					{
						var total_time = (jobs[i].run_at - serverTime() > 0) ? jobs[i].run_at - serverTime() : 0;
						html +=
						 '<tr>'
						+'	<td colspan=3 align=right>'
						+		translate('Total') + ': '
						+'		<b>'
						+		 timeFormat( total_time, true ) 
						+'		</b>'
						+'	</td>'
						+'</tr>';
					}
					
					last_time = jobs[i].run_at;
				}
			}
			
			return html;
		}
		
		function cityTitle ( city_idx )
		{
			var city = Seed.cities[city_idx];
			// Outposts are always defending (until further notice)
			var wallStatus = '';
			
			if (city_idx === 0)
			{
				if ( Seed.cities[city_idx].defended )
				{
					wallStatus = '<font class=' + UID['defending'] + '>' + translate('Defend').toUpperCase() + '</font>';
				}
				else {
					wallStatus = '<font class=' + UID['hiding']    + '>' + translate('Hiding').toUpperCase() + '</font>';
				}
			}
			else {
				wallStatus = '<font class=' + UID['defending'] + '>' + translate('Defend').toUpperCase() + '</font>';
			}
			var html =
			 '<div class=' + UID['subtitle'] + '>'
			+'	<table class=' + UID['table'] + ' style="width:100%;">'
			+'	<tr>'
			+'		<td align=left>' + translate(city.name) + '</td>'
			+'		<td align=right>' + wallStatus + '</td>'
			+'	</tr>'
			+'	</table>'
			+'</div>';
			
			return html;
		}
		
		// First run of jobsStatTick
		jobsStatTick();
		
		t.summary.timer.stat = setInterval (jobsStatTick, 1000);
	},

	
	//----------------------------------------------------------------------------
	//*** Jobs Tab - Train Sub-tab ***
	//----------------------------------------------------------------------------
	tabTrain : function (){
		var t = Tabs.Jobs;
		
		// Create status ticker
		var header = 
		 '<div class=' + UID['title'] + '>' + translate('Training Progress') + '</div>'
		+'<div class=' + UID['status_ticker'] + ' style="margin-bottom: 5px !important">'
		+'	<center>'
		+'		<input id=' + setUID('Tabs.Jobs.tabTrain.enabled') + ' type=button />'
		+'	</center>'
		+'	<div id=' + setUID('Tabs.Jobs.tabTrain.report') + ' class='+ UID['status_report'] + '></div>'
		+'	<br>'
		+'	<div id='+ setUID('Tabs.Jobs.tabTrain.feedback') +' class='+ UID['status_feedback'] + '></div>'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Jobs.tabTrain.tabSets')    + '>' + translate('Train')  + '</a></li>'
		+'	<li class="tab"><a id='       + setUID('Tabs.Jobs.tabTrain.tabOptions') + '>' + translate('Options') + '</a></li>'
		+'</ul>';
		
		// Styles & Sets
		$J('#'+UID['Tabs.Jobs.header'])
		.css({
			 height			: '225px'
			,marginBottom	: '2px'
		})
		.html( header );
		
		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			 height			: '450px'
			,marginTop		: '19px'
		})
		.html( '<div id=' + setUID('Tabs.Jobs.tabTrain.content') + '>' );
		
		$J('#'+UID['Tabs.Jobs.tabTrain.content'])
		.css({
			height		: ($J('#'+UID['Tabs.Jobs.content']).innerHeight()-10) + 'px' 
		})
		.addClass( UID['scrollable'] );
		
		// Add event listener for Enabled/off button
		$J('#'+UID['Tabs.Jobs.tabTrain.enabled']).click (function (){
			var t=Tabs.Jobs;
			t.setTrainEnable (!Data.options.training.enabled);
		});
		
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets']).click ( t.tabTrainSets );
		
		$J('#'+UID['Tabs.Jobs.tabTrain.tabOptions']).click ( t.tabTrainOptions );
		
		t.refreshTrainButton ( Data.options.training.enabled );
		
		switch ( Data.options.training.current_tab )
		{
		case 0: t.tabTrainSets(); break;
		case 1: t.tabTrainOptions(); break;
		}
		
		//First Run of trainStatTick
		t.trainStatTick();
		
		// Timers
		t.training.timer.stat = setInterval(t.trainStatTick, 1000);
	},

	
	//*** Jobs Tab - Train Sub-tab  - Train Sub-Sub-tab ***
	//----------------------------------------------------------------------------
	tabTrainSets : function()
	{
		var t = Tabs.Jobs;
		// Hilite the sub-tabs correctly
		$J('#'+UID['Tabs.Jobs.tabTrain.tabOptions']).removeClass('selected');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabOptions']).css('z-index', '0');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets']).addClass('selected');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets']).css('z-index', '1');
		Data.options.training.current_tab = 0;
		
		// Create unit table for each city
		var elements_id = [];
		
		var html = '<div id=' + setUID('Tabs.Jobs.tabTrain.tabSets.content') + '>';
		
		for (var city_idx=0; city_idx < Seed.cities.length; city_idx++)
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city || city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] ) continue;
			
			html +=
			 '<h4 ref=' + city_idx + ' class=' + UID['subtitle'] + '>'+ translate(city.name) +'</h4>'
			+'<div class="no-overflow-x" style="min-height:380px;">'
			+'<table class="' + UID['table'] + ' zebra" style="width:475px;max-width:475px">'
			+'	<tr>'
			+'		<th>' + translate('Total') + '</th>'
			+'		<th></th>'
			+'		<th>' + translate('Quantity') + '</th>'
			+'		<th></th>'
			+'	</tr>';
			
			// we get the Keys list from Data.defaults for to respect the order
			var units_type = getKeys( Data.defaults.options.training.city[ city_idx ].units );
			for ( i=0; i < units_type.length; i++ )
			{
				var unit_type = units_type[i];
				
				var unit_quantity = Data.options.training.city[ city_idx ].units[ unit_type ];
				
				if ( !unit_quantity || isNaN(unit_quantity) ){
					unit_quantity = 0;
				}
				
				html +=
				 '	<tr>'
				+'		<td align=right class=jewel>'
				+'		' + getUnitNumbers(Seed.cities[0], unit_type).total 
				+'		</td>'
				+'		<td title="' + translate(unit_type) + '">' 
				+'			<span class="' + UID['doa-icons'] + ' i-' + unit_type + '"></span>'
				+'		</td>'
				+'		<td>'
				+'		<input type=text id=' + setUID('Tabs.Jobs.tabTrain.units_' + city_idx + '_' + i) + ' ref=' + city_idx + '_' + unit_type +' maxlength=6 size=6 value="' + unit_quantity + '" style="text-align:right;" />'
				+'		</td>'
				+'		<td style="font-size:8pt;">'
				+ 			translate(unit_type) 
				+'		</td>'
				+'		<td id=' + setUID('Tabs.Jobs.tabTrain.feedback_' + city_idx + '_' + unit_type) + ' style="width:50%;white-space:normal;font-size:8pt;">'
				+'		</td>'
				+'	</tr>';
			
				elements_id.push( UID['Tabs.Jobs.tabTrain.units_'+ city_idx + '_' + i] );
			
			}
			
			html += 
			 '	</tr>'
			+'</table>'
			+'</div>';
		}    
		
		html += '</div>';
		
		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			'padding-left'  : '0',
			'padding-right' : '0',
			'overflow'      : 'hidden'
		});
		
		$J('#'+UID['Tabs.Jobs.tabTrain.content'])
		.html( html );
		
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets.content'])
		.accordion({
			 collapsible	: true
			 ,active		: Data.options.training.accordion
			,changestart	: function( event, ui ) {
				if ( !ui || !ui.newHeader || ui.newHeader.length < 1 ) return;
				var city_idx = $J( ui.newHeader[0] ).attr('ref');
				if ( city_idx ) {
					Data.options.training.accordion = parseInt( city_idx );
				}
			}
		});

		// Update units on change
		function onChangeUnits ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			var unit_quantity = parseIntZero(event.target.value);
			var city_idx = args[0];
			var unit_type = args[1];
			var reqs = t.checkTrainReqs( unit_type, unit_quantity, city_idx );
			
			if ( isNaN(unit_quantity) || unit_quantity < 0 ){
				event.target.style.backgroundColor = '#faa';
				dialogError ( translate('Invalid number of troops', t.container) );
			}
			else if (unit_quantity != Data.options.training.city[ city_idx ].units[ unit_type ]) {
				event.target.value = unit_quantity;
				Data.options.training.city[ city_idx ].units[ unit_type ] = unit_quantity;
				event.target.style.backgroundColor = '';
			}
		}
		
		// Add event listeners for unit quantities 
		for ( var i=0; i < elements_id.length; i++ ) 
		{
			$J('#'+elements_id[i]).change( onChangeUnits );
			$J('#'+elements_id[i]).click( onChangeUnits );
		}
		
	}, 
	
	// config sub tab
	tabTrainOptions : function()
	{
		var t = Tabs.Jobs;
		
		// Hilite the sub-tabs correctly
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets']).removeClass('selected');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets']).css('z-index', '0');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabOptions']).addClass('selected');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabOptions']).css('z-index', '1');
		Data.options.training.current_tab = 1;
		
		var html = 
		 '<div class=' + UID['subtitle'] + '>' + translate('Training Configuration') + '</div>'
		+'	<div>'
		+'		<table class=' + UID['table'] + '>'
		+'		<tr>'
		+'			<tdcolspan=2></td>'
		+'		</tr>';
		
		// Add the radio buttons 
		setUID('Tabs.Jobs.tabTrain.train_mode');
		html +=
		 '	<tr>'
		+'		<td>'
		+'		<label>'
		+'		<input type=radio name=' + UID['Tabs.Jobs.tabTrain.train_mode'] + ' value="population" />' + translate('Depending on available population') 
		+'		</label>'
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'
		+'		<label>'
		+'		<input type=radio name=' + UID['Tabs.Jobs.tabTrain.train_mode'] + ' value="resources" />'+ translate('Depending on available resources')
		+'		</label>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'; 
		
		// Create an all unit table
		var elements_id = [];

		html +=
		'<div class=' + UID['subtitle'] + '>' + translate('Maximum Troops (0 = no max)') + '</div>'
		+'	<table class="' + UID['table'] + ' zebra">'
		+'		<tr valign=top>'
		+'			<td width=150>'
		+'			<table class=' + UID['table'] + '>';
		
		var units_type = getKeys ( Data.options.training.units_cap );
		for ( var i=0; i < units_type.length; i++ )
		{
			var unit_type = units_type[i];
			var value = Data.options.training.units_cap[ unit_type ];
			if ( !value || isNaN(value) ){
				value = 0;
			}
			
			html +=
			 '		<tr>'
			+'		<td>'
			+'			<span class="' + UID['doa-icons'] + ' i-' + unit_type + '"></span>'
			+'		</td>'
			+'		<td>'
			+'		<input type=text id=' + setUID('Tabs.Jobs.tabTrain.cap_' + unit_type) + ' ref=' + unit_type + ' maxlength=6 size=6 value="' + value + '" style="text-align:right;" />'
			+'		</td>'
			+'		<td>'
			+ 		translate(unit_type) 
			+'		</td>'
			+'		</tr>';

			elements_id.push(UID['Tabs.Jobs.tabTrain.cap_'+ unit_type]);
		}
		
		html +=
		 '			</table>'
		+'			</td>'
		+'		</tr>'
		+'	</table>'
		+'</div>';
		
		// Display the page
		$J('#'+UID['Tabs.Jobs.tabTrain.content']).html( html );

		// add event listeners for the radio buttons
		var r = document.getElementsByName(UID['Tabs.Jobs.tabTrain.train_mode']);
		for ( var i=0; i < r.length; i++ )
		{
			$J(r[i]).change( onChangeMode );
			// Select the radio button that was last selected
			r[i].checked = (r[i].value === Data.options.training.mode);
		}

		// Add event listeners for unit quantities 
		for  ( var i=0; i < elements_id.length; i++) {
			$J('#'+elements_id[i]).change( onChangeUnitsCap );
		}

		// radio buttons are weird    
		function onChangeMode ( event )
		{
			var t = Tabs.Jobs;
			
			if ( Data.options.training.enabled )
			{
				// It would be very bad to leave training on when switching queue types. 
				t.setTrainEnable( false );
				
				if ( t.current_tab === 1 ) {
					t.dispFeedback (translate('Safe Mode') +' '+ translate('Training') +' '+ translate('Disabled'));
				}
			}
			
			Data.options.training.mode = event.target.value;
		}
		
		// Update units on change
		function onChangeUnitsCap ( event )
		{
			var unit_type = event.target.getAttribute('ref');
			var value = parseIntZero(event.target.value);
			
			// The upper limit is not important because we are looking at a maximum number of units
			if ( isNaN(value) || value < 0 )
			{
				event.target.style.backgroundColor = '#faa';
				dialogError (translate('Invalid number of troops',t.container));
			} 
			else {
				event.target.value = value;
				Data.options.training.units_cap[ unit_type ] = value;
				event.target.style.backgroundColor = '';
			}
		}
	},
	
	//----------------------------------------------------------------------------
	//*** Jobs Tab - Build Sub-tab ***
	//----------------------------------------------------------------------------
	tabBuild : function ()
	{
		var t = Tabs.Jobs;
		
		var header =
		 '<div class=' + UID['title'] + '>' + translate('Construction Progress') + '</div>'
		+'<div class=' + UID['status_ticker'] + '>'
		+'	<center>'
		+'		<input id=' + setUID('Tabs.Jobs.tabBuild.enabled') + ' type=button />'
		+'	</center>'
		+'	<div id=' + setUID('Tabs.Jobs.tabBuild.report')   + ' class=' + UID['status_report']   + '></div>'
		+'	<br>'
		+'	<div id=' + setUID('Tabs.Jobs.tabBuild.feedback') + ' class=' + UID['status_feedback'] + '></div>'
		+'</div>';
		
		$J('#'+UID['Tabs.Jobs.header'])
		.css({
			'height'        : '205px',
			'margin-bottom'	: '2px'
		})
		.html( header );

		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			'height'        : '475px',
			'margin-top'    : '15px',
			'overflow'      : 'hidden'
		})
		.html( '<div id=' + setUID('Tabs.Jobs.tabBuild.content') + '>' );
		
		
		html = '';
		
		var build_list  = [],
			checkbox_id = [],
			select_id   = [];

		for (var city_idx=0; city_idx < Seed.cities.length; city_idx++)
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city ) continue;
			
			var spectral_idx = null;
			
			if (city_idx === 0){
				build_list = t.building_field.concat([false],t.building_capital);
			} 
			else if ( city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] )
			{
				build_list = t.building_field_spectral.concat([false],t.building_outpost_spectral);
				spectral_idx = city_idx;
			} 
			else {
				build_list = t.building_field.concat([false],t.building_outpost);
			}
			
			html +=
			 '<h4 ref=' + city_idx + ' class=' + UID['subtitle'] + '>' + translate(city.name) + '</h4>'
			+'<div style="overflow:hidden;">'
			+'<table class="' + UID['table'] + ' zebra" style="width:475px;max-width:475px">';
			
			for ( var i=0; i < build_list.length; i++ )
			{
				var build_type = build_list[i];
				
				if ( build_type ) {
				
					var build_level = Buildings.getLevel( city_idx, build_type );
					var ref = city_idx + '_' + build_type;
					
					if ( !Data.options.building.level_cap[city_idx][build_type] )
					{
						Data.options.building.level_cap[city_idx][build_type] = build_level.min;
					}
					
					var level_cap = Data.options.building.level_cap[city_idx][build_type];

					
					if ( build_level.min < (Seed.stats.building[ build_type ].level.length || 12) - 1  )
					{
						html +=
						 '<tr>'
						+'	<td>'
						+'	<label>'
						+'		<input type=checkbox '
						+'			id=' + setUID('Tabs.Jobs.tabBuild.level_enable_' + ref) 
						+'			ref=' + ref
						+ 			( Data.options.building.level_enable[city_idx][build_type] ? ' checked' : '' ) 
						+'		/>'
						+'		<span class="' + UID['doa-icons'] + ' i-' + build_type + '-' + city_idx + '"></span>'
						+ 		translate(build_type)
						+'	</label>'
						+'	</td>'
						+'	<td>'
						+'		<span class=jewel>'
						+'			(' + build_level.min + ( build_level.min !== build_level.max ? '-' + build_level.max : '' ) + ')'
						+'		</span>'
						+'	</td>'
						+'	<td>'
						+'	<select id=' + setUID( 'Tabs.Jobs.tabBuild.level_cap_' + ref ) + ' ref=' + ref + '>';
						
						for ( var lvl = 0; lvl < (Seed.stats.building[ build_type ].level.length || 12); lvl++)
						{
							html +=
							 '<option value=' + lvl + ( build_level.min > lvl ?' style="display:none;"' : '') + (lvl==level_cap ? ' selected' : '' ) + '>' 
							+	 lvl 
							+'</option>';
						}
						
						html += '</select>';
						
						checkbox_id.push( UID['Tabs.Jobs.tabBuild.level_enable_'+ ref] );
						select_id.push( UID['Tabs.Jobs.tabBuild.level_cap_'+ ref] );
					} 
					else {
						html +=
						 '<tr>'
						+'	<td>'
						+'		<span style="margin-left:17px" class="' + UID['doa-icons'] + ' i-' + build_type + '-' + city_idx + '"></span>'
						+'		<i>'
						+ 		translate(build_type)
						+'		</i>'
						+'	</td>'
						+'	<td>'
						+'		<span class=jewel>'
						+'			(' + build_level.min + ( build_level.min !== build_level.max ? '-' + build_level.max : '' ) + ')'
						+'		</span>'
						+'	</td>'
						+'	<td style="color:#004">'
						+		translate ('Max');
					}
					
					html +=
					 '	</td>'
					+'	<td id=' + setUID( 'Tabs.Jobs.tabBuild.feedback_' + ref ) 
					+' 		class=jewel valign=top style="width:50%;white-space:normal;">'
					+'	</td>'
					+'</tr>';
					
				}
				else {
					html +=
					 '<tr>'
					+'	<td colspan=5><hr></td>'
					+'</tr>';
				}
			}
			
			html += 
			 '</table>'
			+'</div>';
		}  

		
		var $container = $J('#'+UID['Tabs.Jobs.tabBuild.content']);
		
		$container
		.css ({
			'height'     : ($J('#'+UID['Tabs.Jobs.content']).innerHeight()-10) + 'px',
			'overflow'   : 'hidden'
		})
		.addClass ( UID['scrollable'] )
		.html ( html )
		.accordion ({
			collapsible	: true
			,active		: Data.options.building.accordion
			,changestart	: function( event, ui ) {
				if ( !ui || !ui.newHeader || ui.newHeader.length < 1 ) return;
				var city_idx = $J( ui.newHeader[0] ).attr('ref');
				if ( city_idx ) {
					Data.options.building.accordion = parseInt( city_idx );
				}
			}
		});
		
		
		function onLevelEnable ( event )
		{
			var ref = $J(this).attr('ref').split('_');
			
			var city_idx = ref[0];
			var build_type = ref[1];
			
			var city_id = Seed.cities[ city_idx ].id;
			
			Data.options.building.level_enable[ city_idx ] [ build_type ] = event.target.checked;
			
			if (event.target.checked) {
				// Auto set Next Level available
				var build_level = Buildings.getLevel( city_idx, build_type );
				var level_cap = Data.options.building.level_cap[ city_idx ][ build_type ];
				var level_max = Seed.stats.building[ build_type ].level.length - 1;
				
				if ( build_level.min <= level_cap && build_level.min < level_max )
				{
					function setLevel ( level ){
						$J('#'+UID['Tabs.Jobs.tabBuild.level_cap_' + city_idx + '_' + build_type]).
						css('color', '#000').
						val( level );
						Data.options.building.level_cap[ city_idx ][ build_type ] = level;
					}
					var next_level = build_level.min + 1;
					if ( next_level > 9 )
					{
						dialogBox({
						id		  : setUID('dialog-confirm'),
						centerTo  : $container,
						title	  : translate('Next Level'),
						html	  : '<br>' + translate('Are you sure you want to') + '<br><br>' + translate('Build') +' '+ translate('Level') + '<b> ' + next_level + '</b>?',
						buttons   : [
							{
								text: translate('Confirm'),
								click: function() { 
									setLevel( next_level );
									t.checkBuildReqs( city_idx, build_type );
									$J(this).dialog('destroy');
								}
							},
							{
								text: translate('Cancel'),
								click: function() { 
									$J(this).dialog('destroy');
								}
							}
						]
						});
					} else {
						setLevel( next_level );
					}
					
				}
			}
			
			t.checkBuildReqs( city_idx, build_type );
			
			if ( Data.options.building.enabled && event.target.checked ) {
				t.buildTick();
			}
		}

		function onChangeBuildCap ( event ) 
		{
			var ref = $J(this).attr('ref').split('_');
			
			var city_idx = ref[0];
			var build_type = ref[1];

			Data.options.building.level_cap[ city_idx ] [ build_type ] = event.target[event.target.selectedIndex].value;
		
			event.target.style.backgroundColor = '';
			event.target.style.color = '#000';
			
			t.checkBuildReqs( city_idx, build_type );
			
			if ( Data.options.building.enabled ) {
				t.buildTick();
			}
		}
		
		// Add the event listeners for each city's building types
		// and for each city's building type caps
		for ( var i=0; i < checkbox_id.length; i++ ) 
		{
			$J('#'+checkbox_id[i]).click ( onLevelEnable );
			$J('#'+select_id[i]).change( onChangeBuildCap );
			
			var ref = $J('#'+checkbox_id[i]).attr('ref').split('_');
			t.checkBuildReqs( ref[0], ref[1] );
		}
		
		// Add the event listeners for the auto-build button and scrollbar
		$J('#'+UID['Tabs.Jobs.tabBuild.enabled']).click (function (){
			var t=Tabs.Jobs;
			t.setBuildEnable (!Data.options.building.enabled);
		});
		
		t.refreshBuildButton ( Data.options.building.enabled );
		
		// First Run of buildStatTick
		t.buildStatTick();
		
		// start the build statistics timer
		t.building.timer.stat = setInterval ( t.buildStatTick, 1000 );
	},

	
	//----------------------------------------------------------------------------
	//*** Jobs Tab - Research Sub-tab ***
	//----------------------------------------------------------------------------
	tabResearch : function ()
	{
		var t = Tabs.Jobs;

		var header =
		 '<div class=' + UID['title'] + '>' + translate('Research Progress') + '</div>'
		+'<div class=' + UID['status_ticker'] + '>'
		+'	<center>'
		+'		<input id=' + setUID('Tabs.Jobs.tabResearch.enabled') + ' type=button />'
		+'	</center>'
		+'	<div id=' + setUID('Tabs.Jobs.tabResearch.report')   + ' class=' + UID['status_report']   + '></div>'
		+'	<br>'
		+'	<div id=' + setUID('Tabs.Jobs.tabResearch.feedback') + ' class=' + UID['status_feedback'] + '></div>'
		+'</div>';
		
		$J('#'+UID['Tabs.Jobs.header'])
		.css({
			'height'		 : '205px',
			'margin-bottom'	 : '2px'
		})
		.html( header );
		
		var html = 
		'<div style="overflow:hidden;">';
		
		var city = Seed.cities[0];
		
		html +=
		 '<div class=' + UID['subtitle'] + '>' + translate(city.name) +'</div>'
		+'<table class="' + UID['table'] + ' zebra" style="width:475px;max-width:475px">';
		
		var checkbox_id = [];
		for ( var i=0; i < t.research_type.length; i++ )
		{
			var research_type = t.research_type[i];
			var research_level = Seed.player.research[research_type] || 0;
			
			if ( !Data.options.research.level_cap[research_type] )
			{
				Data.options.research.level_cap[research_type] = research_level;
			}
			
			var level_cap = Data.options.research.level_cap[research_type];
			

			if ( research_level < (Seed.stats.research[ research_type ].level.length || 11) - 1 )
			{
				html +=
				 '<tr>'
				+'	<td>'
				+'	<label>'
				+'		<input type=checkbox id=' + setUID('Tabs.Jobs.tabResearch.level_enable_' + research_type) + ' ' + (Data.options.research.level_enable[research_type] ? 'checked' : '') + ' ref=' + i + ' /> ' 
				+'		<span class="' + UID['doa-icons'] + ' i-' + research_type + '"></span>'
				+ 		translate(research_type) 
				+'	</label>'
				+'	<td>'
				+'		<span class=jewel>' + research_level + '</span>'
				+'	</td>'
				+'	</td>'
				+'	<td>'
				+'	<select id=' + setUID('Tabs.Jobs.tabResearch.level_cap_' + research_type) + ' ref=' + i + '>';
				
				for ( var lvl = 0; lvl < (Seed.stats.research[ research_type ].level.length || 11); lvl++)
				{
					html +=
					 '<option value=' + lvl + ( research_level > lvl ?' style="display:none;"' : '') + (lvl==level_cap ? ' selected' : '' ) + '>' 
					+	 lvl 
					+'</option>';
				}
				
				html += '</select>';
				
				checkbox_id.push(UID['Tabs.Jobs.tabResearch.level_enable_'+research_type]);
			}
			else {
				html += 
				 '<tr>'
				+'	<td>'
				+'		<span style="margin-left:17px" class="' + UID['doa-icons'] + ' i-' + research_type + '"></span>'
				+'		<i>'
				+ 		translate(research_type) 
				+'		</i>'
				+'	<td>'
				+'		<span class=jewel>' + research_level + '</span>'
				+'	</td>'
				+'	</td>'
				+'	<td style="color:#004">'
				+		translate ('Max');
			}
			
			
			html +=
			 '	</td>'
			+'	<td id=' + setUID('Tabs.Jobs.tabResearch.feedback_' + research_type) + ' class=jewel valign=top style="width:50%;white-space:normal;"></td>'
			+'</tr>';

		}
		
		html += '</table></div>';
		
		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			'height'     : '475px',
			'margin-top' : '15px',
			'overflow'   : 'hidden'
		})
		.html( html );
		
		
		// Add the event listeners for the research types
		for ( var i=0; i < checkbox_id.length; i++ )
		{
			$J('#'+checkbox_id[i]).click( onClickResearch );
		}
		
		// Add the event listeners for the research caps
		// And restore the persistent data since it has to be done in the same loop
		for ( var i=0; i < t.research_type.length; i++ ) 
		{
			var research_type = t.research_type[i];
			$J('#'+UID['Tabs.Jobs.tabResearch.level_cap_' + research_type]).change( onChangeResearchCap );
			
			t.checkResearchReqs( research_type );
		}
		
		$J('#'+UID['Tabs.Jobs.tabResearch.enabled']).click (function (){
			var t=Tabs.Jobs;
			t.setResearchEnable ( !Data.options.research.enabled );
		});
		
		t.refreshResearchButton ( Data.options.research.enabled );
		
		function onClickResearch ( event )
		{
			var t = Tabs.Jobs;
			var n = parseInt(event.target.getAttribute('ref'));
			var research_type = t.research_type[n];
			
			Data.options.research.level_enable[ research_type ] = event.target.checked;
			
			// Auto set Next Level available
			var research_level = Seed.player.research[ research_type ] || 0;
			var level_cap = Data.options.research.level_cap[ research_type ];
			var level_max = Seed.stats.research[ research_type ].level.length - 1;
			
			if ( research_level <= level_cap && research_level < level_max )
			{
				$J('#'+UID['Tabs.Jobs.tabResearch.level_cap_' + research_type]).
				css('color', '#000').
				val( research_level + 1 );
				
				Data.options.research.level_cap[ research_type ] = research_level + 1;
			} 
			
			t.checkResearchReqs( research_type );
			
			if ( Data.options.research.enabled ) {
				t.researchTick();
			}
			
		}


		// Add to persistent storage
		function onChangeResearchCap ( event )
		{
			var t = Tabs.Jobs;
			var n = parseInt(event.target.getAttribute('ref'));
			var research_type = t.research_type[n];
			
			Data.options.research.level_cap[ research_type ] = event.target[event.target.selectedIndex].value;
			
			event.target.style.backgroundColor = ''; 
			event.target.style.color = '#000';
			
			t.checkResearchReqs( research_type );
			
			if ( Data.options.research.enabled ) {
				t.researchTick();
			}
		}
		
		// First Run of researchStatTick
		t.researchStatTick();
		
		
		// start the research statistics timer
		t.research.timer.stat = setInterval ( t.researchStatTick, 1000 );
	},

	setTrainEnable : function ( on_off )
	{
		var t = Tabs.Jobs;
		t.refreshTrainButton( on_off );
		Data.options.training.enabled = on_off;

		// Stop all Trainings
		clearTimeout ( t.training.timer.tick );
		
		if ( on_off )
		{
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
			t.training.timer.tick= setTimeout( t.trainTick, 3000, 0 );
		} 
		else {
			// Erase previous feedback
			t.dispFeedback('');
		}
	},
	
	setBuildEnable : function ( on_off )
	{
		var t = Tabs.Jobs;
		t.refreshBuildButton( on_off );
		Data.options.building.enabled = on_off;
		
		if ( on_off ){
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
			t.building.error_delay = 20000;
			t.building.timer.tick = setTimeout ( t.buildTick, 3000 );
		} 
		else {
			clearTimeout ( t.building.timer.tick );
		}
	},

	setResearchEnable : function ( on_off )
	{
		var t = Tabs.Jobs;
		t.refreshResearchButton( on_off );
		Data.options.research.enabled = on_off;
		
		if ( on_off ){
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
			t.research.error_delay = 20000;
			t.research.timer.tick = setTimeout( t.researchTick, 5000 );
		} 
		else {
			clearTimeout ( t.research.timer.tick );
		}
	},
	
	refreshTrainButton : function ( on_off )
	{
		var t = Tabs.Jobs;
		var but = $id(UID['Tabs.Jobs.tabTrain.enabled']);
		
		if ( !but ) return;
		
		if ( on_off ) {
			but.value = translate('Training').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
	},

	refreshBuildButton : function ( on_off )
	{
		var t = Tabs.Jobs;
		var but = $id(UID['Tabs.Jobs.tabBuild.enabled']);
		
		if ( !but ) return;
		
		if ( on_off ) {
			but.value = translate('Building').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
	},

	refreshResearchButton : function ( on_off )
	{
		var t = Tabs.Jobs;
		var but = $id(UID['Tabs.Jobs.tabResearch.enabled']);
	
		if ( !but ) return;
		
		if ( on_off ) {
			but.value = translate('Researching').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
	},

	trainStatTick : function ()
	{
		var t = Tabs.Jobs;
	
		var html = '<table class="' + UID['table'] + ' zebra" style="width:100%">';
		
		for ( var city_idx = 0; city_idx < Seed.cities.length; city_idx++ )
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city || city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] ) continue;
			
			var jobs = getJobs ( 'units', city_idx );
			
			if ( jobs.length === 0) {
				html += 
				'<tr>'
				+'	<td>'
				+'	<b>' + translate( city.name ) + ':</b>&nbsp;'
				+'	</td>'
				+'	<td>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td width="99%"></td>'
				+'</tr>';
			}
			else {
				
				var last_time = serverTime();
			
				jobs.sort( function(a,b){ return a.run_at - b.run_at; } );
				
				for ( var i = 0; i < jobs.length; i++ )
				{
					var city_name='', total_time='', left_time = 0;
					if ( i === 0 )
					{
						city_name = '<b>' + translate(city.name) +'</b>:'; 
					}
					else if ( i === jobs.length - 1 ) {
						left_time = ( jobs[i].run_at - serverTime() > 0 ) ? jobs[i].run_at - serverTime() : 0;
						total_time = '&nbsp;<b>('+ timeFormat( left_time ) +')</b>';
					}
					
					left_time = ( jobs[i].run_at - last_time > 0 ) ? jobs[i].run_at - last_time : 0;
					
					html += 
					  '<tr>'
					+'	<td>'
					+		city_name + '&nbsp;'
					+'	</td>'
					+'	<td width="70%">'
					+'		<span class="' + UID['doa-icons'] + ' i-' + jobs[i].unit_type + '"></span>'
					+ 		jobs[i].quantity + '&nbsp;&nbsp;' + translate(jobs[i].unit_type)
					+'	</td>'
					+'	<td align=right>'
					+		timeFormat( left_time, true ) + total_time
					+'	</td>'
					+ '</tr>';
					
					last_time = jobs[i].run_at;
				}
			}
			 
		}
		html + '</table>';
		
		$J('#'+UID['Tabs.Jobs.tabTrain.report']).html( html );
	},
	
	// Build statistics - timer set to fire every 1 seconds
	refreshBuildTab : false,
	buildStatTick : function ()
	{
		var t = Tabs.Jobs;
		var html = '<table class="' + UID['table'] + ' zebra" style="width:100%">';
		
		for ( var city_idx=0; city_idx < Seed.cities.length; city_idx++ )
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city ) continue;
			
			html += 
			 '<tr>'
			+'	<td>'
			+' 		<b>' + translate(city.name) +'</b>:&nbsp;'
			+'	</td>'
			+'	<td>';
			
			var jobs = getJobs ( 'building', city_idx );
			
			if ( jobs.length === 0 ){
				html += translate('Off') 
				+'	</td>'
				+'	<td width="99%"></td>'
				+'</tr>';
			}
			else {
				var job = jobs[0];
			
				var left_time = ((job.run_at - serverTime()) > 0) ? (job.run_at - serverTime()) : 0;
				
				if ( left_time )
				{
					
					var fixed_city_idx = ( /Science|Metal|Officer|Rookery|Storage|Theater|Sentinel|Factory|Fortress/.test(job.city_building_type) ? '0' : city_idx);
					
					html += 
					 '		<span class="' + UID['doa-icons'] + ' i-' + job.city_building_type + '-' + fixed_city_idx +'"></span>'
					+		translate(job.city_building_type) + '  ('+ job.level +') '
					+'	</td>'
					+'	<td align=right>'
					+		timeFormat( left_time, true )
					+'	</td>'
					+'</tr>';
					
					try {
						$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx + '_' + job.city_building_type]).html( '<font color=#000>' + translate('Building') + ': ' + translate(job.city_building_type) + ' ' + translate('Level').toLowerCase() + ' ' + job.level + '</font>' );
					} catch(e){}
					
					// Refresh the current Tab in 10 secs if remaining 10 secs to finish the job ;)
					if ( left_time < 10 && !t.refreshBuildTab ) {
						t.refreshBuildTab = true;
						setTimeout(function(){
							t.refreshBuildTab = false;
							// If the user is on building tab 
							if ( t.current_tab === 2 ) {
								// Refresh the Tab
								t.tabBuild ( );
							}
						}, 10000);
					}
				}
			}
		}
		
		html += '</table>';
		
		$J('#'+UID['Tabs.Jobs.tabBuild.report']).html( html );
	},

	// Build statistics - timer set to fire every 1 seconds
	refreshResearchTab: false,
	researchStatTick : function ()
	{
		var t = Tabs.Jobs;
		var city = Seed.cities[0];
		
		var html = '<table class="' + UID['table'] + ' zebra" style="width:100%">';
		
		html += 
		 '<tr>'
		+'	<td>'
		+'		<b>' + translate(city.name) +'</b>: '
		+'	</td>'
		+'	<td>';
		
		var jobs = getJobs ( 'research' );

		if ( jobs.length === 0 ){
			html += translate('Off') 
			+'	</td>'
			+'	<td width="99%"></td>'
			+'</tr>';
		}
		else {
			var job = jobs[0];
			
			var left_time = ((job.run_at - serverTime()) > 0) ? timeFormat(job.run_at - serverTime()) : 0;
			
			if ( left_time )
			{
				html += 
				 '		<span class="' + UID['doa-icons'] + ' i-' + job.research_type + '"></span>'
				+		translate(job.research_type) +' ('+ job.level +') '
				+'	</td>'
				+'	<td align=right>'
				+		left_time
				+'	</td>'
				+'</tr>';
				
				try {
					$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+job.research_type]).html( '<font color=#000>' + translate('Researching') + '&nbsp;' + translate('Level').toLowerCase() + '&nbsp;' + job.level + '</font>' );
				}catch(e){}
				
				
				// Refresh the current Tab in 10 secs if remaining 10 secs to finish the job ;)
				if ( left_time < 10 && !t.refreshResearchTab ) {
					t.refreshResearchTab = true;
					setTimeout(function(){
						t.refreshResearchTab = false;
						// If the user is on building tab 
						if ( t.current_tab === 3 ) {
							// Refresh the Tab
							t.tabResearch ( );
						}
					}, 10000);
				}
			} 
		}

		html += '</table>';
		
		$J('#'+UID['Tabs.Jobs.tabResearch.report']).html( html );
	},

	// Modified to work with jobs
	dispFeedback : function ( msg )
	{
		var t = Tabs.Jobs;
		var elementId = '';   

		switch ( t.current_tab ) 
		{
		case 0: break;
		case 1: elementId = 'Tabs.Jobs.tabTrain.feedback'; break;
		case 2: elementId = 'Tabs.Jobs.tabBuild.feedback'; break;
		case 3: elementId = 'Tabs.Jobs.tabResearch.feedback'; break;
		} 
		
		var $element = $J('#'+UID[elementId]);
		
		if ( $element.length )
		{
			if ( msg === '' ){
				$element.html ( msg );
			} 
			else {
				$element.html ( new Date().toTimeString().substring (0,8) +'&nbsp;'+  msg );
			}
		}
	},


	// Return the total number units of the specified type adding in the quantity about to 
	// be produced. If this number is less than the cap, return zero     
	getUnitCap : function( unit_type, quantity )
	{
		var t = Tabs.Jobs;
		var max_cap = 0;
		var training = 0;
		
		// Get the cap set for this unit type
		max_cap = Data.options.training.units_cap[unit_type];
		
		// If there is no cap, we are done
		if (max_cap === 0){
			return max_cap;
		}

		// Find units in training jobs
		for (var city_idx=0; city_idx < Seed.cities.length; city_idx++) {
			var jobs = getJobs( 'units', city_idx );
			for ( var i = 0; i < jobs.length; i++ )
			{
				if ( unit_type === jobs[i].unit_type ){
					training += jobs[i].quantity;
				}
			}
		}
		
		return ( (training + quantity) > max_cap ) ? ( training + quantity ) : 0;
	},
	
	// Training - Get the remainin queue length (Fixed by Lord Mimir)
	getRemainingQueue : function ( city_idx, queue_type )  
	{  
		var city = Seed.cities[city_idx];  
		
		// queue_length (fixed by LES..)
		var queue_length = ( city.figures.queue_lengths[queue_type] ? city.figures.queue_lengths[queue_type] : Seed.cities[0].figures.queue_lengths[queue_type] || 0 );
		
		//Check if queue_length is a number and not 0
		if ( !queue_length )
		{  
			return 0;
		}
		
		// Count the number of jobs in the queue
		var jobs = getJobs( queue_type, city_idx );

		return queue_length - jobs.length;
	},
	
	/*
		options:{
			reqs_type     : the type of requirements to check
			city_idx      : the city index ( if omitted, use the capital, city_idx = 0 )
			unit_type | building_type | research_type : (only one of them)
			unit_quantity : this is just for when we check requirements for units (training) 
			                should be omitted for buildings and research
			level         :
			
		}
	*/
	checkRequirements : function ( options )
	{
		var reqs = {};

		// options.unit_type and options_training_type are the same,
		// we can use either interchangeably
		var element_type =  options.unit_type     || 
							options.training_type || 
							options.building_type || 
							options.research_type;
		
		var requirements = Seed.requirements[ options.reqs_type ][ element_type ];
		var stats = Seed.stats[ options.reqs_type ][ element_type ];
		
		// in case of level
		if ( typeof (options.level) !== 'undefined' ) {
			requirements = requirements.level[ options.level ];
			stats = stats.level[ options.level ];
		}
		
		// if omitted options.city_idx, use the capital, city_idx = 0
		// this value is only used by requirements.buildings case
		var city_idx = options.city_idx || 0;
		
		//always use the capital data to verify the resources and the population
		var city = Seed.cities[ 0 ];
		
		// If we are verifying unit requirements, initialize the variable max_units
		if ( options.unit_type || options.reqs_type == 'units' ) {
			reqs.max_units = 999999999;
		}
		
		// set Speed Multiplier for every case
		var speed_multiplier = 1;
		switch ( options.reqs_type ) {
		case 'unit':
			// This value is calculated by Seed.updateCity
			speed_multiplier = city.figures.unit.speed_multiplier;
			break;
		case 'building':
			speed_multiplier = city.figures.building.speed_multiplier;
			break;
		}
		
		
		// Set time needed for this task
		reqs.time = parseInt( stats.time / speed_multiplier );
		
		// when omitted options.unit_quantity, sets unit_quantity to 1 to check 
		// the requirements of the buildings and research.
		var unit_quantity = options.unit_quantity || 1;
		
		// Check Buildings requirements
		if ( requirements.buildings )
		{
			for ( var type in requirements.buildings )
			{
				var fixed_type = type;
				
				// we change the type of build Garrison to TrainingCamp in case of outpost city
				if ( type == 'Garrison' && city_idx != 0 ) {
					fixed_type = 'TrainingCamp';
				}
				
				var fixed_city_idx = ( /Science|Metal|Officer|Rookery|Storage|Theater|Sentinel|Factory|Fortress/.test(fixed_type) ? '0' : city_idx);
				
				var level = Buildings.getLevel( fixed_city_idx, fixed_type );
				
				if ( level.max < requirements.buildings[ type ] )
				{
					if ( !reqs.buildings ) reqs.buildings = {};
					reqs.buildings[ fixed_type ] = requirements.buildings[ type ];
					reqs.msg = (reqs.msg||'') + translate(fixed_type) + '(' + reqs.buildings[ fixed_type ] + ')' + ' + ';
					reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-' + fixed_type + '-' + fixed_city_idx + '"></span>' + '(' + reqs.buildings[ fixed_type ] + ')' + ' + ';
				}
			}
		}
		
		// Check Items requirements ( Fixed by Jawz )
		if (requirements.items) {
			for (var type in requirements.items) {
				var need = requirements.items[ type ] * unit_quantity;
				var have = parseInt(Seed.player.items[ type ] || 0);
				if ( have < need ) {
					if ( !reqs.items ) reqs.items = {};
					reqs.items[ type ] = need - have;
					reqs.msg = (reqs.msg||'') + translate(type) + '(' + reqs.items[ type ] + ')' + ' + ';
					reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-' + type + '"></span>' + ' ' + reqs.items[ type ] + ' + ';
				}
				// If we are verifying unit requirements, calculate the maximum units
				if ( reqs.max_units ) {
					var current_max = parseInt( have / requirements.items[type] );
					if ( reqs.max_units > current_max ) {
						reqs.max_units = current_max;
					}
				}
			}
		}
		
		// Check Population requirements
		if ( requirements.population && requirements.population.idle )
		{
			var need = requirements.population.idle * unit_quantity;
			var have = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
			have = (have > 0) ? have : 0;
			if ( have < need ) {
				reqs.population =  need - have;
				reqs.msg = (reqs.msg||'') + translate('Population') + ':' + reqs.population.intToCommas() + ' + ';
				reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-population"></span>' + ' ' + reqs.population.intToCommas() + ' + ';
			}
			
			// If we are verifying unit requirements, calculate the maximum units
			if ( reqs.max_units ) {
				var current_max = parseInt( (have+1) / requirements.population.idle );
				if ( reqs.max_units > current_max ) {
					reqs.max_units = current_max;
				}
			}
		}
		
		// Check Research requirements
		if ( requirements.research )
		{
			for ( var type in requirements.research )
			{
				if ( Seed.player.research[ type ] < requirements.research[ type ] )
				{
					if ( !reqs.research ) reqs.research = {};
					reqs.research[ type ] = requirements.research[ type ];
					reqs.msg = (reqs.msg||'') + translate(type) + '(' + reqs.research[ type ] + ')' + ' + ';
					reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-' + type + '"></span>' + '(' + reqs.research[ type ] + ')' + ' + ';
				}
			}
		}
		
		// Check Resources requirements
		if ( requirements.resources )
		{
			for ( var type in requirements.resources )
			{
				if ( requirements.resources[ type ] == 0 ){
					continue;
				}
				var need = requirements.resources[ type ] * unit_quantity;
				var have = parseInt(city.resources[ type ] || 0);

				if ( have < need )
				{
					if ( !reqs.resources ) reqs.resources = {};
					reqs.resources[ type ] = need - have;
					reqs.msg = (reqs.msg||'') + translate(type) + ':' + reqs.resources[ type ].intToCommas() + ' + ';
					reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-' + type + '"></span>' + ' ' + reqs.resources[ type ].intToCommas() + ' + ';
				}
				
				// If we are verifying unit requirements, calculate the maximum units
				if ( reqs.max_units ) {
					var current_max = parseInt( (have+1) / requirements.resources[ type ] );
					if ( reqs.max_units > current_max ) {
						reqs.max_units = current_max;
					}
				}
			}
		}
		
		// Set time needed for this units task based in quantity
		if ( reqs.max_units ) {
			reqs.time = parseInt( (options.unit_quantity || 0) * stats.time / speed_multiplier );
		}
		
		if ( reqs.msg ){
			reqs.msg = reqs.msg.substring(0,reqs.msg.length-3);
			reqs.imsg = reqs.imsg.substring(0,reqs.imsg.length-3);
		}
		
		return reqs;
		
	},
	
	checkTrainReqs : function( unit_type, unit_quantity, city_idx ) {
		var t = Tabs.Jobs;
		
		var reqs = t.checkRequirements ({
			reqs_type     : 'unit', 
			city_idx      : city_idx, 
			unit_type     : unit_type, 
			unit_quantity : unit_quantity
		});
		
		// Check Remaining Queue
		if ( t.getRemainingQueue(city_idx, 'units') == 0 ) {
			reqs.queue = true;
			reqs.msg = (reqs.msg||'') + translate('Training Queue Full') + ' + ';
		}
		
		// Check Units Cap
		var capped = t.getUnitCap(unit_type, unit_quantity);
		if ( capped ) {
			reqs.capped = capped;
			reqs.msg = (reqs.msg||'') + translate('Production Limit') + ' + ';
		}

		if (t.current_tab === 1) {
			if ( reqs.msg )
			{
				$J('#'+UID['Tabs.Jobs.tabTrain.feedback_' + city_idx + '_' + unit_type])
				.html( '<span style="color:#a00 !important">' + reqs.imsg + '</span>' );
				$J('#'+UID['Tabs.Jobs.tabTrain.feedback_' + city_idx +'_'+ unit_type])
				.attr ( 'title', translate(unit_type) + ' \n' + reqs.msg.replace(/\+/g,' \n') );
			} 
			else {
				$J('#'+UID['Tabs.Jobs.tabTrain.feedback_' + city_idx + '_' + unit_type])
				.html(  timeFormat( reqs.time, true ) + ' (' + translate('Max') + ': ' + reqs.max_units.intToCommas() + ')' );
			}
		}
		
		return reqs;

	},
	
	// Check building requirements
	checkBuildReqs : function( city_idx, building_type ){
		var t = Tabs.Jobs;

		var level = ( Buildings.getLevel(city_idx, building_type) ).min + 1;
		var cap = Data.options.building.level_cap[city_idx][building_type] || 0;
		
		if ( level <= cap ) {
			
			var reqs = t.checkRequirements ({
				reqs_type     : 'building', 
				city_idx      : city_idx, 
				building_type : building_type,
				level         : level
			});
			
			if (t.current_tab === 2){
				if ( reqs.msg ) 
				{
					$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type])
					.html ( '<font color="#a00">'+ reqs.imsg +'</font>' );
							
					$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type])
					.attr ( 'title', translate(building_type) + ' \n' + reqs.msg.replace(/\+/g,' \n') );
							
					$J('#'+UID['Tabs.Jobs.tabBuild.level_cap_' + city_idx +'_'+ building_type])
					.css ( 'color', '#a00' );
				}
				else {
					var fb_text = '(' + translate('Level').charAt(0) + '.' + level + ') : ' + timeFormat( reqs.time, true );

					$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type])
					.html( fb_text );

					$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type])
					.attr ( 'title', translate(building_type) + ' \n' + fb_text.stripTags() );
				}
			}

			return reqs;
			
		} else {
			if (t.current_tab === 2){

				$J('#'+UID['Tabs.Jobs.tabBuild.feedback_'+ city_idx +'_'+ building_type])
				.html ( '<span class="' + UID['doa-icons'] + ' i-done"></span>' );

				$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type])
				.attr ( 'title', translate(building_type) + ' \n' + translate('Task Completed') );

				$J('#'+UID['Tabs.Jobs.tabBuild.level_cap_' + city_idx +'_'+ building_type])
				.css ( 'color', '#060' );
			}
		}
		return ({ capped:true, msg:translate('Maximum') + ' ' + translate('Current Level') });
	},
	
	
	checkResearchReqs : function ( research_type )
	{
		var t = Tabs.Jobs;

		var level =  (Seed.player.research[research_type] || 0) + 1;
		var cap = Data.options.research.level_cap[research_type] || 0;
		
		if ( level <= cap ) 
		{
			
			var reqs = t.checkRequirements ({
				reqs_type     : 'research', 
				research_type : research_type,
				level         : level
			});

			if ( t.current_tab === 3 )
			{
				if ( reqs.msg ) 
				{
					$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type])
					.html ( '<font color=#a00>' + reqs.imsg + '</font>' );
			
					$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type])
					.attr ( 'title', translate(research_type) + ' \n' + reqs.msg.replace(/\+/g,' \n') );
					
					$J('#'+UID['Tabs.Jobs.tabResearch.level_cap_' + research_type])
					.css ( 'color', '#a00' );
				} 
				else {
					var fb_text = '(' + translate('Level').charAt(0) + '.' + level + ') : ' + timeFormat( reqs.time, true );
	
					$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type])
					.html ( fb_text );
					
					$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type])
					.attr ( 'title', translate(research_type) + ' \n' + fb_text.stripTags() );
				}
			}
			
			
			return reqs;
			
		}
		else {
			if ( t.current_tab === 3 )
			{

				$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type])
				.html ( '<span class="' + UID['doa-icons'] + ' i-done"></span>' );

				$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type]).
				attr ( 'title', translate(research_type) + ' \n' + translate('Task Completed') );

				$J('#'+UID['Tabs.Jobs.tabResearch.level_cap_' + research_type])
				.css ( 'color', '#060' );
			}
		}
		return ({ capped:true, msg:translate('Maximum')+' '+translate('Current Level') });

	},
	
	
	setNextTrainCity : function ( ) {
		var t = Tabs.Jobs;
		
		++t.training.current_city;
		
		var city_idx = t.training.current_city;
		
		if ( !Seed.cities[ city_idx ] || 
			 city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] || 
			 city_idx >= Seed.cities.length 
			){
				t.training.current_city = 0;
        } 
		
		return t.training.current_city;
	},
	
	// The training heartbeat
	// Parameters:
	//      city_idx - the city number (0 = capitol, 1 = outpost 1, 2 = outpost 2
	//
	trainTick : function ( city_idx )
	{
		var t = Tabs.Jobs;
		var delay = 30000;

		clearTimeout ( t.training.timer.tick );
		
		if ( !Data.options.training.enabled ){
			return;
		}
		
		if ( city_idx ) {
			t.training.current_city = city_idx;
		} else {
			city_idx = t.training.current_city;
		}
		
		var by_queue = Data.options.training.mode === 'resources';
		var queue_length = ( Seed.cities[ city_idx ].figures.queue_lengths[ 'units' ] || 0 );
		var total_jobs = Seed.total.training[ Seed.cities[ city_idx ].id ];
		
		var jobs =  getJobs( 'units' , city_idx );
		
		if ( jobs.length === 0 || ( by_queue && total_jobs < queue_length ) )
		{
			var job_list = Data.options.training.city[ city_idx ].units;
			
			var units_type = getKeys ( job_list );
			var len = units_type.length;
			for ( i=0; i < len; i++) 
			{
				var unit_type = units_type[ i ];
				var unit_quantity = job_list[ unit_type ];
				
				if ( unit_quantity < 1) {
					continue;
				}
				
				var reqs = t.checkTrainReqs( unit_type, unit_quantity, city_idx );

				if ( !reqs.msg ) {
				
					if ( Seed.total.training[ Seed.cities[ city_idx ].id ] >= queue_length ) {
						break;
					}
				
					t.doTrain( unit_type, unit_quantity, city_idx );
					
					Seed.total.training[ Seed.cities[ city_idx ].id ]++;
					
					if ( by_queue )
					{
						// move to the end
						delete ( job_list[ unit_type ] );
						job_list[ unit_type ] = unit_quantity;
						
						delay = Math.randRange( 5000, 7500 );
						
						t.training.timer.tick = setTimeout ( t.trainTick, delay);
						
						return;
					}
				}
				else {
					if ( reqs.queue ) {
					
						city_idx = t.setNextTrainCity();
						
						verboseLog('trainTick next_city' + ( city_idx ) );
						
						delay = Math.randRange( 5000, 10000 );

						t.training.timer.tick = setTimeout ( t.trainTick, delay );
						
						if ( t.current_tab === 1 ) {
							t.dispFeedback ( translate( Seed.cities[ city_idx ].type || Seed.cities[ city_idx ].outpost_type) + ' ' + translate('Starting Soon') + '... ' + timeFormat( delay/1000 )  );
						}
						
						return;
					}
				}
			}
		}
		
		
		city_idx = t.setNextTrainCity();
			
		delay = Math.randRange( 5000, 10000 );
		
		if ( t.current_tab === 1 ) {
			t.dispFeedback ( translate( Seed.cities[ city_idx ].type || Seed.cities[ city_idx ].outpost_type) + ' ' + translate('Starting Soon') + '... ' + timeFormat( delay/1000 )  );
		}
		
		verboseLog('trainTick City' + ( city_idx ) );

		t.training.timer.tick = setTimeout ( t.trainTick, delay );
		
	},

	// Queue the training job
	// Parameters:
	//      unit_type - Porter, Conscript, etc.
	//      unit_quantity - number of units to train
	//      city_idx - city index (0=capitol, 1=outpost 1, 2 = outpost 2)
	doTrain : function ( unit_type, unit_quantity, city_idx )
	{
		var t = Tabs.Jobs;
		var city = Seed.cities[city_idx];
		var msg = ' (' + translate(Seed.cities[city_idx].name) + ') ' + translate('Training') + ' ' + unit_quantity + ' ' + translate(unit_type);
		//t.dispFeedback (msg);

		MyAjax.units ({
			city_id       : city.id,
			unit_type     : unit_type,
			unit_quantity : unit_quantity,
			
			onSuccess     : function ( r ) {

				t.training.errors = 0;
				
				actionLog (msg);
				
				if ( t.current_tab === 1 ) {
					t.dispFeedback ( msg );
				}

				// Remove resources used
				// cloned in order to not modify the original
				try {
					var resources = Seed.requirements.unit[ r.job.unit_type ].resources.cloneProps();
					// values ??calculated based on the number of troops
					for ( var type in resources ) {
						if ( resources.hasOwnProperty( type ) ) {
							resources[type] *= r.job.quantity;
						}
					}
					Resources.remove( resources );
				} catch (e) {
					debugLog('ERROR in doTrain: ' + e);
				}
				
				// By Lord Mimir
				/** Get the units being built so the will be displayed
				*  The units.json has the city the training happen at as part of the response
				*  so no need to call it just use the info sent
				*/
				Seed.updateCity ( r.city );  

			},
			
			onFailure     : function ( r ) {

				if ( r.status && r.status === 509 )	{
					var delay = ERROR_509_DELAY;
					if ( t.current_tab === 1 ) {
						t.dispFeedback ( '<b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
					}
					clearTimeout ( t.training.timer.tick );
					t.training.timer.tick = setTimeout( t.trainTick, delay );
				} 
				else {
					verboseLog ('Error: Training: ' + unit_type + ' ' + r.errmsg);
					
					actionLog (translate('Error') + ' ' + translate('Training') + ': ' + unit_type + ' ' + r.errmsg);

					// The queue is frequently full, but we could be getting server errors (500) too
					// Wait a couple of minutes
					if ( ++t.training.errors > 10 )
					{
						if ( t.current_tab === 1 ) {
							t.dispFeedback (translate('Too many errors, disabling auto training'));
						}
						t.setTrainEnable ( false );
						t.training.errors = 0;
					}
					else {
						if ( t.current_tab === 1 ) {
							t.dispFeedback (translate('Error') + ' ' + translate('Training') + ': ' + unit_type + ' ' +  r.errmsg);
						}
						
						// Increases the waiting time for next retry errors
						t.training.error_delay *= 1.5;
						
						clearTimeout ( t.training.timer.tick );
						t.training.timer.tick = setTimeout( t.trainTick, t.training.error_delay );
					}
				}
			},
			
			delay        : Math.randRange(3000, 6000),
			caller       : 'doTrain'
		});
	},

	// New approach 07072011b
	// Calculate the completion time by examining the job record for any job running
	// While auto-build is enabled, this function is called on a 4 second timer
	// It resets the timer to 20 seconds if doBuild() has an error and fetches the Seed
	// to get updated information
	// It will turn off auto-build if the error count exceeds three
	buildTick : function ( city_idx )
	{
		var t = Tabs.Jobs;
		
		clearTimeout ( t.building.timer.tick );
		
		if ( !Data.options.building.enabled ) {
			return;
		}
		
		if ( city_idx ) {
			t.building.current_city = city_idx;
		} else {
			city_idx = t.building.current_city;
		}
		
		// Fix city_idx in case of wrong number, undefined or overflow
        if ( isNaN( city_idx ) || city_idx < 0 || city_idx >= Seed.cities.length ){
            city_idx = 0;
        }  
        
        // in case the city is not been defined in Seed.updateCity skip to next in array.
		if ( !Seed.cities[city_idx] )
		{
			t.buildTick( city_idx + 1 );
			return;
		}
		
		var jobs = getJobs ( 'building', city_idx );
		
		// city not currently building
		if ( jobs.length === 0 )
		{
			// Make the job list
			var job_list = []; // Concatenated array of buildings
			var build_list = [];
			for ( var name in Data.options.building.level_enable[city_idx] )
			{
				// Is this building type enabled for autobuild?
				if ( Data.options.building.level_enable[city_idx][name] )
				{
					// get the current list of buildings to upgrade taking into account the cap limit ( this is do it with the last boolean argument)
					build_list = Buildings.getList ( city_idx, name, true );
					build_list.sort ( function(a,b){return a.level-b.level} );
					job_list = job_list.concat ( build_list );
				}
			}
			
			job_list.sort ( function(a,b){return a.level-b.level} );
			
			for ( var i=0; i < job_list.length; i++ )
			{
				var job = job_list[i];
				// Check the requirements
				var reqs = t.checkBuildReqs( city_idx, job.type, job.level );
				
				// If the requirements are met, we began job
				if ( !reqs.msg )
				{
					// Initiates the request to the server
					MyAjax.buildings ({
						city_id     : Seed.cities[city_idx].id,
						
						building_id : job_list[i].id,
						
						onSuccess   : function ( r ){
							t.building.errors = 0;
							
							// Remove resources used
							Resources.remove( Seed.requirements.building[ r.job.city_building_type ].level[ r.job.level ].resources );
							
							var msg = translate('Building')+ ': ' + translate(r.job.city_building_type) + ' (' + r.job.level +') '+ translate('at') + ' ' + translate(Seed.cities[city_idx].name);
							
							actionLog (msg);
		
							if ( t.current_tab === 2 ) {
								t.dispFeedback ( msg );
							}
						},
						
						onFailure   : function ( r ){
						
							clearTimeout ( t.building.timer.tick );
							
							if ( r.status && r.status === 509 )	{
								var delay = ERROR_509_DELAY;
								if ( t.current_tab === 2 ) {
									t.dispFeedback ( '<b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
								}
								// Wait and try again
								t.building.timer.tick = setTimeout( t.buildTick, delay );
							}
							else {
							
								actionLog (job.type + ': ' + r.errmsg);
								
								if ( ++t.building.errors > 5 )
								{
									if ( t.current_tab === 2 ) {
										t.dispFeedback (translate('Too many errors, disabling auto-build'));
									}
									t.setBuildEnable ( false );
									t.building.errors = 0;
									return;
								}

								// Increases the waiting time for next retry errors
								t.building.error_delay *= 1.5;
								
								t.building.timer.tick = setTimeout ( t.buildTick, t.building.error_delay );
								
								if ( t.current_tab === 2 ) {
									t.dispFeedback (translate(job.type) + ': ' + r.errmsg + ' ' + translate('Retry in') + ': '+ timeFormat(t.building.error_delay/1000) );
								}
								
							}
						},
						
						caller      : 'buildTick'
					});
					
					// go to next city
					break;
				}
				// The requirements were not met
				else {
					// If the user is on building tab shows the requirements
					if ( t.current_tab === 2 ){
						t.dispFeedback ( translate(job_list[i].type) +': '+ reqs.msg );
					}
				}
			}
		}

		var delay = Math.randRange( 5000, 10000)
		
		if ( t.current_tab === 2 ) {
			t.dispFeedback ( translate('Next City') + ' ' + translate('Starting Soon') + '...' + timeFormat(delay/1000) );
		}
		
		t.building.timer.tick = setTimeout ( t.buildTick, delay, city_idx + 1 );
	},

	// Research heartbeat
	researchTick : function ()
	{
		var t = Tabs.Jobs;
		var reqs;
		
		clearTimeout ( t.research.timer.tick );
		
		if ( !Data.options.research.enabled ){
			return;
		}
		
		var city = Seed.cities[0];
		
		var jobs = getJobs ( 'research' );
		
		// no research being done yet
		if ( jobs.length === 0 )
		{
			// Make the job list
			// Because a 0 level research is not in Seed.player.research (by Didi)
			// and also Spectral Outpost research
			var job_list = [];
			
			for ( var i=0; i < t.research_type.length; i++ )
			{
				var type  = t.research_type[i];
				
				var level = ( Seed.player.research[ type ] ? parseInt( Seed.player.research[ type ] ) : 0 );
				
				if ( Data.options.research.level_enable[ type ] && Data.options.research.level_cap[ type ] > level ) {
					job_list.push( { type:type, level:level } );
				}
			}
			
			// Sort the list by level
			job_list.sort ( function(a,b){return a.level - b.level} );
			
			for ( var i=0; i < job_list.length; i++ )
			{
				var job = job_list[i];
				// Check the requirements
				reqs = t.checkResearchReqs ( job.type );

				// If the requirements are met, we began job
				if ( !reqs.msg )
				{
					// Initiates the request to the server
					MyAjax.researches ({
					
						city_id       : city.id,
						
						research_type : job_list[i].type,
						
						onSuccess     : function ( r ) {
							t.research.errors = 0;
							
							// Remove resources used
							Resources.remove( Seed.requirements.research[ r.job.research_type ].level[ r.job.level ].resources );

							var msg = '<b>' + translate('Researching') +': </b> '+ translate(r.job.research_type) + ' ('+ r.job.level +') ';
					
							actionLog(msg);
					
							if ( t.current_tab === 3 ) {
								t.dispFeedback ( msg );
							}
							
							// Run the researchTick after the job finishes
							t.research.timer.tick = setTimeout ( t.researchTick, (r.job.duration + 15) * 1000 );
						},
						onFailure     : function ( r ) {
							
							clearTimeout ( t.research.timer.tick );
							
							if ( r.status && r.status === 509 )	{
								var delay = ERROR_509_DELAY;
								if ( t.current_tab === 3 ) {
									t.dispFeedback ( '<b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
								}
								// Wait and try again
								t.research.timer.tick = setTimeout( t.researchTick, delay );
							} 
							else {
							
								actionLog ('ERROR: '+ job.type + ' ' + r.errmsg);
								
								if ( ++t.research.errors > 10 )
								{
									if ( t.current_tab === 3 ) {
										t.dispFeedback (translate('Too many errors, disabling auto-research'));
									}
									t.setResearchEnable ( false );
									t.research.errors = 0;
									return;
								}
								
								if ( t.current_tab === 3 ) {
									t.dispFeedback ( translate( job.type ) + ': ' + r.errmsg);
								}
								
								// Run the researchTick after the job finishes
								t.research.timer.tick = setTimeout ( t.researchTick, t.research.error_delay );
							}
						}
					});

					break;
				}
				// The requirements were not met
				else {

					// If the user is on research tab shows the requirements
					if ( t.current_tab === 3 ) {
						t.dispFeedback ( translate(job_list[i].type) +' '+ reqs.msg);
					}
				}
			}
		}
		
		var delay = Math.randRange( 15000, 30000);
		
		if ( t.current_tab === 3 ) {
			t.dispFeedback ( translate('Waiting') + '...' );
		}
		
		t.research.timer.tick = setTimeout ( t.researchTick, delay );
	}
}

/***********************************   End Jobs  ***********************************/

/********************************************************************************
* Options Tab                                                                  *
* - Enable window drag                                                         *
* - Enable collection of resources from Outposts every 1-99 seconds, minutes,  *
*   hours or days                                                              *
* - Verbose logging                                                            *
********************************************************************************/
Tabs.Options = {
	tab_order	: OPTIONS_TAB_ORDER,
	tab_label	: 'Options',
	tab_disabled: !OPTIONS_TAB_ENABLE,
	
	$container	: null,
	
	section : 0,

	init : function ( div ) 
	{
		var t = Tabs.Options;
		t.$container = $J(div);

		var sel_Unit = ['','',''], sel_auto_refresh = ['','','',''];
		
		switch ( Data.options.auto_collect.unit )
		{
		case 60:    sel_Unit[0] = 'selected';  break;
		case 3600:  sel_Unit[1] = 'selected';  break;
		case 86400: sel_Unit[2] = 'selected';  break;
		default:    sel_Unit[1] = 'selected';
		}

		switch ( parseInt( Data.options.auto_refresh.delay ) )
		{
		case 10: sel_auto_refresh[0] = 'selected'; break
		case 15: sel_auto_refresh[1] = 'selected'; break;
		case 20: sel_auto_refresh[2] = 'selected'; break;
		case 25: sel_auto_refresh[3] = 'selected'; break;
		default: sel_auto_refresh[0] = 'selected';
		}

    
		html = '<div class=' + UID['title'] + '>'+ translate('Options') +'</div>'
		+'<div id=' + setUID('Tabs.Options') + '>'
		+'<h4 style="display:block;width:100%;margin-top:3px;" ref="0" class=' + UID['subtitle'] + '>'+ translate('Game Options') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr valign=top>'
		+'		<td>'
		+'			<label>'
		+'				<input id=' + setUID('Tabs.Options.collect') + ' type=checkbox /> ' 
		+ 				translate('Auto-Collection of Resources')
		+'			</label> '
		+'			<input id=' + setUID('Tabs.Options.collect_delay') + ' size=1 maxlength=2 type=text value="' 
		+ 				Data.options.auto_collect.delay + '">'
		+'			</input>'
		+'			<select id=' + setUID('Tabs.Options.collect_unit') + ' size=1>'
		+'				<option value=60 ' + sel_Unit[0] + '>' + translate('Minutes') + '</option>'
		+'				<option value=3600 ' + sel_Unit[1] + '>' + translate('Hours') + '</option>'
		+'				<option value=86400 ' + sel_Unit[2] + '>' + translate('Days') + '</option>'
		+'			</select>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'<h4  style="display:block;width:100%;margin-top:3px;" ref="1" class=' + UID['subtitle'] + '>'+ translate('Script Options') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr valign=top>'
		+'		<td>'
		+'		<label>'
		+'			<input id=' + setUID('Tabs.Options.auto_refresh') + ' type=checkbox /> ' 
		+ 			translate('Enable') +' '+ translate('Auto Refresh every') 
		+'		</label>'
		+'		<select id=' + setUID('Tabs.Options.auto_refresh_delay') + ' size=1>'
		+'			<option value=10 ' + sel_auto_refresh[0] + '>10</option>'
		+'			<option value=15 ' + sel_auto_refresh[1] + '>15</option>'
		+'			<option value=20 ' + sel_auto_refresh[2] + '>20</option>'
		+'			<option value=25 ' + sel_auto_refresh[3] + '>25</option>'
		+'		</select> ' + translate('Minutes') + ' ' + translate('of inactivity')
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'<h4 style="display:block;width:100%;margin-top:3px;" ref="2" class=' + UID['subtitle'] + '>'+ translate('Permanent Data') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr>'
		+'		<td>'
		+'		<center>'
		+'		<input id=' + setUID('Tabs.Options.storage.backup')  + ' type=button value="' 
		+ 			translate('Backup') + '">'
		+'		</input>&nbsp;'
		+'		<input id=' + setUID('Tabs.Options.storage.backup_map')  + ' type=button value="' 
		+ 			translate('Backup') + ' ' + translate('Map') +'">'
		+'		</input>&nbsp;'
		+'		<input id=' + setUID('Tabs.Options.storage.restore') + ' type=button value="' 
		+ 			translate('Restore') + '">'
		+'		</input>'
		+'		<br><br>'
		+'		<select id=' + setUID('Tabs.Options.storage.delete_type') + '>'
		+'			<option value="All">' + translate('All') + '</option>'
		+'			<option value="Options">' + translate('Options') + '</option>'
		+'			<option value="Map">' + translate('Map') + '</option>'
		+'		</select> '
		+'		<input id=' + setUID('Tabs.Options.storage.delete')  + ' type=button value="'
		+ 			translate('Delete') + '">'
		+'		</input>'
		+'		<input id=' + setUID('Tabs.Options.storage.file')    + ' type="file" multiple style="opacity:0;position:absolute;z-index:-1"/>'
		+'		</center>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'<h4 style="display:block;width:100%;margin-top:3px;" ref="3" class=' + UID['subtitle'] + '>'+ translate('Server Files') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr>'
		+'		<td>'
		+'		<center>'
		+'		<input id=' + setUID('Tabs.Options.refresh') + ' type=button value="' 
		+			translate('Refresh') + '">'
		+'		</input>'
		+'		</center>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'<BR />'
		+'<BR />'
		+'</div>'
		+'<h4 style="display:block;width:100%;margin-top:3px;" ref="3" class=' + UID['subtitle'] + '>'+ translate('Helpful Links') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr>'
		+'		<td>'
		+'		<center>'
		+'<b><h2>Feel free to join the forum for support on the script!</h2></b><br>'
		+'<a href="http://wackoscripts.com" target="_blank">Forum Home</a><br>'
		+'<a href="http://wackoscripts.com/index.php?app=ccs" target="_blank">Script Instructions</a><br>'
		+'<a href="http://wackoscripts.com/index.php?/forum/3-report-problems/" target="_blank">Report Problems</a><br>'
		+'<a href="http://wackoscripts.com/index.php?/forum/16-features-suggestions/" target="_blank">Features & Suggestions</a><br>'
		+'<a href="http://wackoscripts.com/index.php?/forum/24-general-discussion/" target="_blank">General Discussion</a><br>'			
		+'<br><br><b>  If you would like to help with the development of the script or would like to donate<br>  to keep it going you will find a donate on the right side of the forum index!<br><br>'
		+'Thanks For Your Support!!<br></b>'
		+'</center>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'</div>';
		
		t.$container
		.css({
			height		: '690px'
		})
		.html( html );

		/*
		$J('#'+UID['Tabs.Options'])
		.css({
			'overflow-x'  : 'hidden',
			height		  : '680px'
		})
		.accordion({
			 collapsible	: true
			,active			: t.section
			,changestart	: function( event, ui ) {
				if ( !ui || !ui.newHeader || ui.newHeader.length < 1 ) return;
				var section = $J( ui.newHeader[0] ).attr('ref');
				if ( section ) {
					t.section = parseInt( section );
				}
			}
		});
		
		*/
		
		t.checkboxChange(UID['Tabs.Options.collect'], Data.options.auto_collect.enabled, AutoCollect.setEnable);
		
		$J('#'+UID['Tabs.Options.collect_delay']).change ( onChangeTime );
		$J('#'+UID['Tabs.Options.collect_unit']).change ( onChangeUnit );
		
		t.checkboxChange( UID['Tabs.Options.auto_refresh'], Data.options.auto_refresh.enabled, AutoRefresh.setEnable );
		
		$J('#'+UID['Tabs.Options.auto_refresh_delay']).change ( onChangeRefreshDelay );
		
	

		$J('#'+UID['Tabs.Options.storage.backup']).click ( onClickBackup );
		
		$J('#'+UID['Tabs.Options.storage.backup_map']).click ( onClickBackupMap );
		
		$J('#'+UID['Tabs.Options.storage.file']).change ( onChangeRestoreFile );
		
		$J('#'+UID['Tabs.Options.storage.restore']).click ( function(){
			console.log($id(UID['Tabs.Options.storage.file']));
			$J('#'+UID['Tabs.Options.storage.file']).click();
		});
		
		$J('#'+UID['Tabs.Options.storage.delete']).click ( onClickClearStorage );
		
		
		$J('#'+UID['Tabs.Options.refresh']).click ( onClickRefreshData );

	
		
		function onChangeTime ( event )
		{
			var time = parseIntZero( $J(this).val() );
			if ( Data.options.auto_collect.unit == 60 && time < 10 ) {
				time = 10;
				$J(this).val( time );
			}
			Data.options.auto_collect.delay = time;
		}

		function onChangeUnit ( event )
		{
			Data.options.auto_collect.unit = parseIntZero( $J(this).val() );
		}
		
		function onChangeRefreshDelay ( event )
		{
			AutoRefresh.setDelay( $J(this).val() );
		}
		
		function onClickClearStorage () 
		{
			var type = $J('#'+UID['Tabs.Options.storage.delete_type']).val();
			var section = false;
			switch ( type )
			{
			case 'Options':
				section = ['options'];
				break;
			case 'Map':
				section = ['map'];
				break;
			}
			dialogBox({
				id		  : setUID('dialog-confirm'),
				centerTo  : t.$container,
				title	  : translate('Delete') + ' ' + translate(type) + ' ' + translate('Permanent Data'),
				html	  : '<br>' + translate('Are you sure you want to') +' '+ translate('delete') +'<br><b>'+ translate(type) + '</b> ' + translate('Permanent Data') + '?',
				buttons   : [
					{
						text: translate('Confirm'),
						click: function() { 
							Data.clearStorage( section ); 
							$J(this).dialog('destroy');
						}
					},
					{
						text: translate('Cancel'),
						click: function() { $J(this).dialog('destroy'); }
					}
				]
			});

		}
		
		function onClickRefreshData () 
		{
			var t = Tabs.Options;
			var msg = $J.msg({ 
				content 	 : translate('Refresh') + '...',
				target		 : t.$container,
				clickUnblock : false
				
			});
			Seed.fetchPlayer({
				callback  : function() {
				},
				caller    : 'Tabs.Options.refresh'
			});  
		}
		
		function onClickBackup ()
		{
			var t = Tabs.Options;
			var msg = $J.msg({ 
				content 	 : translate('Generating File') + '<br>' + translate('Please, wait') + '...',
				target		 : t.$container,
			});
			setTimeout ( function () {
				var keys = getKeys ( Data.defaults );
				for ( var i=0; i < keys.length; i++ )
				{
					if ( /(marches|requests)/i.test( keys[i] ) ) {
						keys.splice( i , 1 );
					};
				}
				
				var json_data = '{';
				for ( var i = 0; i < keys.length ; i++ )
				{
					var name = keys[i];
					
					try {
						json_data += '"' + name + '":' + JSON.stringify( Data[name] );
					} catch(e){
						console.log(e);
					}
					
					if ( i < keys.length-1 ){
						json_data += ','
					}
				}
				json_data += '}';
				window.open('data:application/text;base64,' + Base64.encode( json_data ),'Backup','width=300,height=200,toolbar=0,resizable=0');
			}, 1000);
		}
		
		function onClickBackupMap ()
		{
			var t = Tabs.Options;
			var msg = $J.msg({ 
				content 	 : translate('Generating Map File') + '<br>' + translate('Please, wait') + '...',
				target		 : t.$container,
			});
			setTimeout ( function () {
				var json_data = '{"map":'+ JSON.stringify( Data.map ) + '}';
				window.open('data:application/text;base64,' + Base64.encode( json_data ),'Backup Map','width=300,height=200,toolbar=0,resizable=0');
			}, 1000);
		}
		
		function onChangeRestoreFile ()
		{
			var t = Tabs.Options;

			var files = $id(UID['Tabs.Options.storage.file']).files;

			if ( !files.length ) {
			  return;
			}
			
			var reader = new FileReader();
			reader.onload = function( event ) {
				try {
					if ( event.target.result ) {
						Data.mergeWith (  JSON.parse( event.target.result ) );
						var msg = $J.msg({ 
							content 	 : translate('Restore') + ' ' + translate('Successfully'),
							target		 : t.$container,
						});
					}
				} catch (e) {
					var msg = $J.msg({ 
						content 	 : translate('Restore') + ' ' + translate('Error') + '<br><br>' + e ,
						target		 : t.$container,
					});
				}
				// Clear the file container for the next change
				$id(UID['Tabs.Options.storage.file']).files = [];
				$id(UID['Tabs.Options.storage.file']).value = '';
			};
			
			reader.onerror = function( event ) {
				var error = event.target.error.name;
				console.log( error );
				if(error == "NOT_READABLE_ERR") {
				
				}
				// Clear the file container for the next change
				$id(UID['Tabs.Options.storage.file']).files = [];
				$id(UID['Tabs.Options.storage.file']).value = '';
			};
			
			for (var i = 0, file; file = files[i]; i++) {
				// Read file into memory as UTF-8
				reader.readAsText( file, 'UTF-8' );
			}

		}
	}, 

	hide : function () {
	},

	show : function () {
		
	},
	
	checkboxChange : function ( checkboxId, optionVar, callEnable, callIsAvailable )
	{
		var t = Tabs.Options;
		var checkbox = $id( checkboxId );

		if ( callIsAvailable && callIsAvailable() === false )
		{
			checkbox.disabled = true;
			return;
		}
		
		if ( optionVar ){
			checkbox.checked = true;
		}
		
		$J(checkbox).change ( new eventToggle(checkboxId, optionVar, callEnable).handler );
		
		function eventToggle( checkboxId, optionVar, callOnChange )
		{
			this.handler = handler;
			var optVar   = optionVar;
			var callback = callOnChange;
			
			function handler( event )
			{
				optVar = this.checked;
				if ( callback !== null ) {
					callback( this.checked );
				}
			}
		}
	},
	
	
}


//*********************************** Log Tab ***********************************
Tabs.Logs = {
	tab_order	: LOG_TAB_ORDER,
	tab_label	: 'Logs',
	tab_disabled: !LOG_TAB_ENABLE,
	last_subtab	: 'tabActions',
	
	$container	: null,
	content		: [],
	title		: null,
	max_entries	: 1000,
	stats_timer	: 0, // (by Didi)
	state		: 0,
	
	init : function ( div )
	{
		var t = Tabs.Logs;
		t.$container = $J( div );

		// (Added Debug & Stats by Didi)
		var html = ''
		+'<ul class=tabs>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabVerbose') + '>' + translate('Verbose')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabDebug')   + '>' + translate('DebugLog')   + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabStats')   + '>' + translate('Statistics') + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabDebugger')   + '>' + translate('Debuger') + '</a></li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Logs.title') + ' class=' + UID['title'] + '>' + translate('Verbose') + '</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto; display:none;">'
		+'	<table id=' + setUID('Tabs.Logs.verbose') + ' class=' + UID['table_console'] + ' cellspacing=1>'
		+'	<tr>'
		+'		<td class=' + UID['underline'] + '></td>'
		+'		<td class=' + UID['underline'] + ' width=95%></td>'
		+'	<tr>'
		+'	</table>'
		+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto; display:none;">'
		+'	<table id=' + setUID('Tabs.Logs.debug') + ' class=' + UID['table_console'] + ' cellspacing=1>'
		+'	<tr>'
		+'		<td class=' + UID['underline'] + '></td>'
		+'		<td class=' + UID['underline'] + ' width=95%></td>'
		+'	<tr>'
		+'	</table>'
		+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto; display:none;">'
		+'	<center>'
		+'	<table id=' + setUID('Tabs.Logs.stats') + ' class="' + UID['table'] + ' ' + UID['table_console'] + '" border=1 cellspacing=1 width=97%>'
		+'	</table>'
		+'	</center>'
		+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto; display:none;">'
		+'	<div id=' + setUID('Tabs.Logs.debugger') + '>'
		+'	</div>'
		+'</div>';
		
		t.$container.html( html );
		
		t.content.push( $id(UID['Tabs.Logs.verbose']) );
		$J('#'+UID['Tabs.Logs.tabVerbose']).click ( t.tabVerbose );
		
		t.content.push( $id(UID['Tabs.Logs.debug']) );
		$J('#'+UID['Tabs.Logs.tabDebug']).click ( t.tabDebug );

		t.content.push( $id(UID['Tabs.Logs.stats']) );
		$J('#'+UID['Tabs.Logs.tabStats']).click ( t.tabStats );
		
		t.content.push( $id(UID['Tabs.Logs.debugger']) );
		$J('#'+UID['Tabs.Logs.tabDebugger']).click ( t.tabDebugger );
		
		t.title = $id( UID['Tabs.Logs.title'] );
		
		t.state = 1;
		
		for ( var i=0; i < Data.logs.length; i++ )
		{
			var log = Data.logs[i];
			for ( var j=0; j < log.length; j++ )
			{
				t._addRow( log[j].msg, log[j].ts, i );
			}
		}
		
		if ( !Data.requests.start_at ) {
			Data.requests.start_at = serverTime();
		}

		if ( DEBUG_MODE === false ) 
		{ 
			$J('#'+UID['Tabs.Logs.title']).parent().hide();
			$J('#'+UID['Tabs.Logs']).parent().hide();
		}
	},

	tabVerbose : function ()
	{
		var t = Tabs.Logs;
		
		$J('#'+UID[t.last_subtab])
		.css('z-index','0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Logs.tabVerbose'])
		.css('z-index','1')
		.addClass('selected');

		t.last_subtab = 'Tabs.Logs.tabVerbose';
		
		$J(t.content[1]).parent().show();
		$J(t.content[2]).parent().hide();
		$J(t.content[3]).parent().hide();
		$J(t.content[4]).parent().hide();
		
		clearTimeout(t.stats_timer);
		
		t.title.innerHTML = translate('Verbose Log');
	},
	
	// Debug log (by Didi)
	tabDebug : function (){
		var t = Tabs.Logs;
		
		$J('#'+UID[t.last_subtab])
		.css('z-index','0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Logs.tabDebug'])
		.css('z-index','1')
		.addClass('selected');
		
		t.last_subtab = 'Tabs.Logs.tabDebug';

		$J(t.content[1]).parent().hide();
		$J(t.content[2]).parent().show();
		$J(t.content[3]).parent().hide();
		$J(t.content[4]).parent().hide();
		
		clearTimeout(t.stats_timer);
		
		t.title.innerHTML = translate('Debug');
	},

	//didi moif : add stats of request
	tabStats : function (){
		var t = Tabs.Logs;
		var html = '';
				
		$J('#'+UID[t.last_subtab])
		.css('z-index','0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Logs.tabStats'])
		.css('z-index','1')
		.addClass('selected');
		
		t.last_subtab = 'Tabs.Logs.tabStats';
		
		$J(t.content[1]).parent().hide();
		$J(t.content[2]).parent().hide();
		$J(t.content[3]).parent().show();
		$J(t.content[4]).parent().hide();
		
		clearTimeout(t.stats_timer);
		
		t.title.innerHTML = translate('Statistics');
		
		var total_requests = 0;
		var total_errors = 0;
		
		// Make the Totals
		for ( var type in Data.requests ){
			if ( Data.requests.hasOwnProperty( type ) && typeof Data.requests[type].total !== 'undefined') {
					total_requests += Data.requests[type].total;
					total_errors   += Data.requests[type].errors;
			}
		}

		Data.requests.run_time = serverTime() - Data.requests.start_at;
		var run_time = (Data.requests.run_time > 0) ? (Data.requests.run_time/3600) : 1;

		html += ''
			 + '<TR>'
			 + '	<TH width=35%>'+translate('Request')+ '</TH>'
			 + '	<TH>'+translate('Total') +'</TH>'
			 + '	<TH>'+translate('Rate') +'</TH>'
			 + '	<TH>'+translate('Errors') +'</TH>'
			 + '</TR>';
			 
		
		
		// Manifest
		var perHour = Data.requests.manifest.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Manifest')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.manifest.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.manifest.errors + '</TD>'
			 + '</TR>';

		// Player
		var perHour = Data.requests.player.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Player')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.player.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.player.errors + '</TD>'
			 + '</TR>';

		// Cities
		var perHour = Data.requests.cities.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('City')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.cities.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.cities.errors + '</TD>'
			 + '</TR>';
			 
		// Generals
		var perHour = Data.requests.generals.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Generals')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.generals.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.generals.errors + '</TD>'
			 + '</TR>';
		
		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';
			 
		// Map
		var perHour = Data.requests.map.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Map')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.map.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.map.errors + '</TD>'
			 + '</TR>';

		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';

		// Marches
		var perHour = Data.requests.marches.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Marches')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.marches.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.marches.errors + '</TD>'
			 + '</TR>';

		// Recalls
		var perHour = Data.requests.recalls.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>' + translate('Recall') + ' : </TD>'
			 + '	<TD align=right>'+Data.requests.recalls.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.recalls.errors + '</TD>'
			 + '</TR>';
			 
		// Abandon Wilderness
		var perHour = Data.requests.abandon.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Wilderness') + ' ' + translate('Leave')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.abandon.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.abandon.errors + '</TD>'
			 + '</TR>';
		
		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';
			 
		// Reports
		var perHour = Data.requests.reports.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Reports')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.reports.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.reports.errors + '</TD>'
			 + '</TR>';
			 
		// Reports Read
		var perHour = Data.requests.reports_read.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Read Report')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.reports_read.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.reports_read.errors + '</TD>'
			 + '</TR>';
			 
		// Reports Delete
		var perHour = Data.requests.reports_del.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Delete')+' '+translate('Reports')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.reports_del.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.reports_del.errors + '</TD>'
			 + '</TR>';
		
		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';
			 
		// Training
		var perHour = Data.requests.training.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Training')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.training.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.training.errors + '</TD>'
			 + '</TR>';

		// Research
		var perHour = Data.requests.research.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Research')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.research.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.research.errors + '</TD>'
			 + '</TR>';
		
		// Building
		var perHour = Data.requests.building.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Building')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.building.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.building.errors + '</TD>'
			 + '</TR>';
		
		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';
			 
		// Auto-Collect
		var perHour = Data.requests.collect.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Auto-Collect')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.collect.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.collect.errors + '</TD>'
			 + '</TR>';	 
		
		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';
			 
		// Totals
		var perHour = total_requests / run_time;
		html += '<TR>'
			 + '	<TD align=right><b>'+translate('Total')+' : </b></TD>'
			 + '	<TD align=right><b>'+total_requests + '</b></TD>'
			 + '	<TD align=right><b>'+perHour.intToCommas() + '/' + translate('h') +'</b></TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '><b>'+total_errors + '</b></TD>'
			 + '</TR>';

		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';

		html += '<TR>'
		   + '	<td align=right>'+ translate('Start Date') +' : </td>'
		   + '	<TD colspan=3>'+ new Date(Data.requests.start_at * 1000).myString() + '</TD>'
		   + '</TR>'
		   + '<TR>'
		   + '	<td align=right>'+ translate('Run Time') +' : </td>'
		   + '	<TD colspan=3>'+ timeFormat( Data.requests.run_time, true ) + '</TD>'
		   + '</TR>';
		
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';

		html +='<TR>'
			+ '	<td colspan=4 align=center>'
			+ '		<input id='+ setUID('Tabs.Logs.tabStats.clear') +' type=button value="'+ translate('Delete') +' '+ translate('Statistics') +'" /></center>'
			+ '	</td>'
			+ '</TR>';

		$J(t.content[3]).html( html );
		
		$J('#'+UID['Tabs.Logs.tabStats.clear']).click( t.clearStats );
		
		t.stats_timer = setTimeout(t.tabStats, 1000);
	
	},

	//didi modif
	clearStats : function () {
		Data.requests.start_at = serverTime();
		
		for ( var type in Data.requests ){
			if ( Data.requests.hasOwnProperty( type ) && typeof Data.requests[type].total !== 'undefined') {
					Data.requests[type].total  = 0;
					Data.requests[type].errors = 0;
			}
		}
	},
	
	
	tabDebugger : function (){
		var t = Tabs.Logs;
		
		$J('#'+UID[t.last_subtab])
		.css('z-index','0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Logs.tabDebugger'])
		.css('z-index','1')
		.addClass('selected');
		
		t.last_subtab = 'Tabs.Logs.tabDebugger';

		$J(t.content[1]).parent().hide();
		$J(t.content[2]).parent().hide();
		$J(t.content[3]).parent().hide();
		$J(t.content[4]).parent().show();
		
		clearTimeout(t.stats_timer);
		
		t.title.innerHTML = translate('Debugger');
		
		
		var html = ''
			+ '<textarea id="'+setUID('tabsDebug_TA_Unescape')+'" row=3 cols=50></textarea>'
			+ '<input type=button value="unescape" id="'+setUID('tabsDebug_BTN_Unescape')+'" />'
			+ '<br><br>'
			+ '<input type=button value="Seed.Player" id="'+setUID('tabsDebug_BTN_SeedPlayer')+'" /> <br><br>'
			+ '<input type=button value="Seed.Cities" id="'+setUID('tabsDebug_BTN_SeedCities')+'" /> <br><br>'
			+ '<input type=button value="Seed.Jobs.city" id="'+setUID('tabsDebug_BTN_SeedJobCity')+'" /><br><br>'
			+ '<input type=button value="Seed.Marches" id="'+setUID('tabsDebug_BTN_SeedMarches')+'" /><br><br>'
			+ '<input type=button value="Seed.Buildings" id="'+setUID('tabsDebug_BTN_SeedBuildings')+'" /><br><br>'
			+ '<input type=button value="Clear MAP data" id="'+setUID('tabsDebug_BTN_ClearMap')+'" /><br><br>'
			+ '<input type=button value="Check reports" id="'+setUID('tabsDebug_BTN_Reports')+'" /><br><br>'
			+ '<input type=button value="Persistant Data" id="'+setUID('tabsDebug_BTN_Data')+'" /><br><br>'
			+ '<input type=button value="Scripts" id="'+setUID('tabsDebug_BTN_Scripts')+'" /><br><br>'
			+ '<br>Missing Reports:<span id="'+setUID('tabsDebug_MissRep')+'"></span> &nbsp; <input id="'+setUID('tabsDebug_BTN_Reset')+'" type=button value="RESET" />';
		
		$J( t.content[4] ).html( html );
		
		$J('#'+UID['tabsDebug_BTN_Unescape']).click (unescape);
		$J('#'+UID['tabsDebug_BTN_SeedPlayer']).click (seedPlayer);
		$J('#'+UID['tabsDebug_BTN_SeedCities']).click (seedCities);
		$J('#'+UID['tabsDebug_BTN_SeedJobCity']).click (seedJobsCity);
		$J('#'+UID['tabsDebug_BTN_SeedMarches']).click (seedMarches);
		$J('#'+UID['tabsDebug_BTN_SeedBuildings']).click (seedBuildings);
		$J('#'+UID['tabsDebug_BTN_ClearMap']).click (clearMap);
		$J('#'+UID['tabsDebug_BTN_Reports']).click (readReports);
		$J('#'+UID['tabsDebug_BTN_Scripts']).click (dispScripts);
		$J('#'+UID['tabsDebug_BTN_Data']).click (dispData);
		$J('#'+UID['tabsDebug_BTN_Reset']).click (function(){
			Data.options.messages.missing=0; 
			showMissingReports()
		});

			
		function unescape(div){
			var esc = $id(UID['tabsDebug_TA_Unescape']);
			esc.value = unescape (esc.value);
		}
		
		function seedBuildings(){
			dispBuildings ('Seed.cities.capital.buildings', Seed.cities[0].buildings);
			for ( var city_idx = 1; city_idx < Seed.cities.length; city_idx++ )
			{
				// in case the city is not been defined in Seed.updateCity skip to next in array.
				if ( !Seed.cities[city_idx] ) continue;
			
				dispBuildings ('Seed.cities.outpost.buildings', Seed.cities[city_idx].buildings);
			}
		}

		function dispScripts(){
			
			var dialogbox = dialogBox({
				id		: setUID('dialog-debug'),
				width	: 900,
				height	: 700,
				centerTo: t.$container,
				title	: 'Debug - List Scripts',
				html	: translate('Scanning Map').replace('$NUM$',Data.options.map.radius),
			});
			
			var scripts = document.getElementsByTagName('script');
			var html = '<DIV class=' + UID['content'] + ' style="height:560px; max-height:560px; overflow:auto">';
			for (var i=0; i<scripts.length; i++){
				var code = scripts[i].innerHTML;
				if (code === undefined)
				html += 'no code<BR>';
				else
				html += 'Source: '+ scripts[i].src +'<BR>Length: '+ code.length +'<BR>'+ code.substr(0,1000).escapeHTML() +'<BR><HR>';
			}
			dialogbox.html(html);
		}
		
		function dispBuildings(msg, buildings){
			var b = [];
			for (var i=0; i<buildings.length; i++)
			b.push (buildings[i]);
			b.sort (function (a,b){
				if (a.location !== b.location){
					if (a.location === 'city')
					return -1;
					return 1;
				}
				return a.slot - b.slot;
			});
			var html = msg + ':\n';
			for (var i=0; i<b.length; i++)
				html += b[i].location +' slot #'+ b[i].slot +' : Level '+ b[i].level +' '+ b[i].type +'\n';
			debugLog (html);
		}

		function showMissingReports(){
			$id(UID['tabsDebug_MissRep']).innerHTML = Data.options.messages.missing;
			setTimeout (showMissingReports, 2000);
		}

		function readReports(){
			Messages.checkMessages({category:'reports'});
		}
		
		function seedPlayer(){
			debugLog (inspect (Seed.player, 8, 1));
		}
		
		function seedCities(){
			debugLog (inspect (Seed.cities, 8, 1));
		}
		
		function seedJobsCity(){
			var now = parseInt(serverTime());
			for (var c in Seed.jobs)
				debugLog ('Seed.jobs['+ c +'] (city #'+ Seed.city_idx[c] +') now='+ now +':\n'+ inspect (Seed.jobs[c], 8, 1));
		}
		
		function seedMarches(){
			var now = parseInt(serverTime());
			var msg = '***** Seed.marches: *****  (now='+ parseInt(serverTime())+')\n';
			for (var id in Seed.marches){
				var march = Seed.marches[id];

				msg += 'OWNER: '+  march.owner_id +' ID: '+ march.id +' '+ march.status +' '+ march.x +','+ march.y +' '+ march.run_at +'('+ (march.run_at-now)  +') '+ march.duration +'\n';
			}
			debugLog (msg);
		}

		function dispData(){
			if ( Data.itemList === undefined ) {
				Data.itemList = ['marches'];
			}

			var html = '';
			for (var name in Data.itemsList){
				html += '***** Data.'+ Data.itemsList[name] +':\n'+ inspect (Data[Data.itemsList[name]], 12, 1);
			}
			debugLog (html);
		}
		
		function clearMap(){
			Data.map = {};
		}
		
		showMissingReports ();
		
	},

	hide : function () {
		var t = Tabs.Logs;
		clearTimeout(t.stats_timer);
	},

	show : function () {
		if ( DEBUG_MODE === false ) 
		{ 
			$J('#'+UID['Tabs.Logs.title']).parent().hide();
			$J('#'+UID['Tabs.Logs']).parent().hide();
		}
	},

	_addRow : function ( msg, ts, to )
	{
		var t = Tabs.Logs;
		var n = to ? to : 0;
		
		if ( t.state !== 1 ) {
			return;
		}
		
		if ( t.content[n].rows.length > t.max_entries )
		{
			t.content[n].deleteRow( t.content[n].rows.length - 1 );
		}
		
		var row = t.content[n].insertRow ( 0 );
		// row.vAlign = 'top';
		var ts_cell = row.insertCell ( 0 );
		var msg_cell = row.insertCell ( 1 );
		
		ts_cell.className = 'jewel';
		ts_cell.innerHTML = '(&nbsp;'+ ts +'&nbsp;)&nbsp;';
		
		msg_cell.innerHTML = msg;
		msg_cell.style.whiteSpace = 'normal';
	}, 

	addMsg : function ( msg, to )
	{
	/*
		if ( Tabs.Logs.tab_disabled ) {
			return;
		}
*/
		var t = Tabs.Logs;
		var n = to ? to : 0;
		var ts = new Date().toTimeString().substring (0,8);
		
		//if ( DEBUG_MODE ) {
			t._addRow ( msg, ts, to );
		//}

		while ( Data.logs[n].length > t.max_entries )
		{
			Data.logs[n].shift();
		}
		
		Data.logs[n].push ( {msg:msg, ts:ts} );

	}
}

function actionLog ( msg ) 
{
	Tabs.Logs.addMsg( msg, 0 );
}

function debugLog(msg) {
	if ( DEBUG_MODE ) {
		Tabs.Logs.addMsg(msg.replace(/\n/g, '<br/>'), 2);
	}
}

function verboseLog ( msg ) 
{
	if ( DEBUG_MODE ) {
		Tabs.Logs.addMsg( msg, 1 );
	}
}
// END Tabs.Logs




/************************
**   Dialogs
*************************/
function dialogBox (options){
	var id = options.id||'dialog-box';
	var box = $J('<div id=' + id + '></div>').html(options.html||'');
	box.dialog({
		// options
		autoOpen	: options.autoOpen||true,
		buttons		: options.buttons||[
			{
				text: translate('Accept'),
				click: function() {
					if(box._overlay) box._overlay.remove();
					box.dialog('destroy');
				}
			}
		],
		closeText	: options.closeText||translate('Close'),
		dialogClass	: options.dialogClass||'',
		draggable	: options.draggable||true,
		height		: options.height||'auto',
		hide		: options.hide||'fade',
		minHeight	: options.minHeight||70,
		position	: options.position||'center',
		resizable	: options.resizable||false,
		show		: options.show||'fade',
		title		: options.title||'',
		width		: options.width||'auto',
		minWidth	: options.minWidth||300,
		maxWidth	: options.maxWidth||(options.centerTo ? $J(options.centerTo).innerWidth()-50 : false),
		zIndex		: options.zIndex||1001,
		// events
		close		: function(event, ui){ 
			if(options.close instanceof Function) options.close(event, ui);
			if(box._overlay) box._overlay.remove();
			if(box._timeOut) box.stopTime();
			if(!box._notdestroy) box.dialog('destroy');
		},
		create		: options.create||null,
		drag		: options.drag||null,
		dragStart	: function(event, ui){ 
			if(options.dragStart instanceof Function) options.dragStart(event, ui);
			box.parent().css('opacity','0.7');
		},
		dragStop	: function(event, ui){ 
			if(options.dragStop instanceof Function) options.dragStop(event, ui);
			box.parent().css('opacity','1');
		},
		focus		: options.focus||null,
		open		: function(event, ui){ 
			if(options.open instanceof Function) options.open(event, ui);
			if(box._timeOut) {
				box.oneTime(box._timeOut, function(){
					box.close();
				});
			}
		}
	})
	.dialogExtend({
        "maximize" : false,
        "minimize" : false,
        "dblclick" : "collapse",
        "icons" : {
          "maximize" : "ui-icon-circle-plus",
          "minimize" : "ui-icon-circle-minus",
          "restore"  : "ui-icon-bullet"
        }
	});
	
	box._notdestroy = options.notdestroy;
	
	box._timeOut = options.timeOut;
	
	box.centerTo = function(centerTo){
		box._centerTo = centerTo||box._centerTo;
		var offset = $J(box._centerTo).offset();
		var x = parseInt($J(box._centerTo).outerWidth()-$J('#'+id).outerWidth())/2 + offset.left;
		var y = parseInt($J(box._centerTo).outerHeight()-$J('#'+id).outerHeight())/2 + offset.top;
		box.dialog( 'option' , 'position' , [x, y] );
	};
	
	if (options.centerTo) {
		box.centerTo(options.centerTo);
	}
	
	if (options.overlay) {
		var container = $J(options.centerTo || document.body);
		var overlay = $J('<div id=' + id + '-overlay></div>').appendTo(container.parent() || document.body);
		overlay.css('position','absolute');
		overlay.css('display','block');
		overlay.css('background-color','#000');
		overlay.css('opacity','0.5');
		overlay.css('top','0');
		overlay.css('width',(container.outerWidth()+4)+'px');
		overlay.css('height',(container.outerHeight()+4)+'px');
		overlay.css('z-index','1000');
		overlay.css('box-shadow','rgba(0,0,0,0.5) 0 0 10px');
		overlay.css('-khtml-box-shadow','rgba(0,0,0,0.5) 0 0 10px');
		overlay.css('-moz-box-shadow','rgba(0,0,0,0.5) 0 0 10px');
		overlay.css('-webkit-box-shadow','rgba(0,0,0,0.5) 0 0 10px');
		box._overlay = overlay;
	}
	
	box.close = function(){
		box.dialog('close');
		if(box._overlay) box._overlay.css('display','none');
	};
	box.open = function(){
		box.dialog('open');
		if(box._overlay) box._overlay.css('display','block');
	};
	box.isOpen = function(){
		return box.dialog('isOpen');
	};
	box.destroy = function(){
		if(box._overlay) box._overlay.remove();
		box.dialog('destroy');
	};
	box.option = function(option, value){
		box.dialog('option', option, value);
	};
	box.title = function(value){
		box.dialog('option', 'title', value);
	};
	box.buttons = function(value){
		box.dialog('option', 'buttons', value);
	};
	box.draggable = function(value){
		box.dialog('option', 'draggable', value);
	};
	box.position = function(value){
		box.dialog('option', 'position', value);
	};
	box.timeOut = function(value){
		box._timeOut = value;
		box.open();
	};
	return box;
}

function dialogError (html, centerTo){
	dialogBox({
		id		  : setUID('dialog-error'),
		minWidth  : 300,
		minHeight : 150,
		centerTo  : centerTo||document.body,
		title	  : translate('Error'),
		html	  : '<br>'+html
	});
}

/************************
**   TimeBar
*************************/
var StepTimeBar = {
	steps	: 0,
	step	: 0,
	delay	: 10000,
	
	currentTime : 0,
	totalTime	: 0,
	timer		: 0,
	
	start : function(options){
		var t = StepTimeBar;
		
		t.steps = options.steps;
		t.delay = options.delay||t.delay;
		
		t.totalTime = t.steps * t.delay;
		
		t.step = 0;
		t.currentTime = 0;

		t.$stepbar = $J('<div id=' + setUID(options.id||'time-bar') + '></div>').appendTo(options.target||document.body);
		
		clearInterval(t.timer);
		t.timer = setInterval(t._progress, 250);
	},
	
	stop : function(){
		var t = StepTimeBar;
		t.delay = 10000;
		clearInterval(t.timer);
		t.$stepbar.remove();
	},
	
	update : function(step){
		var t = StepTimeBar;
		t.step = step;
		t.delay = parseInt((t.delay+t.currentTime)/step);
		t.totalTime = t.delay * t.steps;
	},
	
	_progress : function(){
		var t = StepTimeBar;
		t.currentTime += 250;
		var perc = parseInt(t.currentTime*100/t.totalTime);
		t.$stepbar.progressbar({ value: perc });
		if (perc >= 100) {
			t.stop();
		}
	}
	
}




function logit (msg) {
	var now = new Date();
	console.log(SERVER_ID+ ' @ ' + now.toTimeString().substring (0,8) + '.' + now.getMilliseconds() + ': ' +  msg);
	//if (Data && Data.logs) verboseLog(msg.replace(/\n/g, '<br/>'));
}


var TabsManager = {
	tabList     : {},           // {name, obj, div}
	current_tab : null,
	mainbox     : null,

	init : function ( mainbox ){
		var t = TabsManager;
		
		t.mainbox = mainbox;
		
		var sorter = [];
		for (k in Tabs){
			Tabs.mainbox = mainbox;
			if (!Tabs[k].tab_disabled){
				t.tabList[k] = {};
				t.tabList[k].name = k;
				t.tabList[k].uid = setUID('Tabs.' + k);
				t.tabList[k].obj = Tabs[k];
				if (Tabs[k].tab_label !== null)
					t.tabList[k].label = translate(Tabs[k].tab_label);
				else
					t.tabList[k].label = k;
				if (Tabs[k].tab_order !== null)
					sorter.push([Tabs[k].tab_order, t.tabList[k]]);
				else
					sorter.push([1000, t.tabList[k]]);
				t.tabList[k].div = document.createElement('div');
			}
		}

		sorter.sort (function (a,b){return a[0]-b[0]});
		
		var html = '<ul class=tabs>';
		html += '<li class="tab first">'
			 +'	<a id='+ sorter[0][1].uid +'>'
			 +'	<span class="' + UID['doa-icons'] + ' i-' + sorter[0][1].name  + '"></span>'
			 + 		sorter[0][1].label 
			 +'	</a>'
			 +'</li>';
		for (var i=1; i<sorter.length; i++)
			html += '<li class=tab>'
			+'	<a id='+ sorter[i][1].uid +'>'
			+'	<span class="' + UID['doa-icons'] + ' i-' + sorter[i][1].name  + '"></span>'
			+ 		sorter[i][1].label 
			+'	</a>'
			+'</li>';
		html += '</ul>';

		t.mainbox.html(html);
		
		t.current_tab = null;
		for (k in t.tabList) {
			if (t.tabList[k].name === Data.options.current_tab)
				t.current_tab = t.tabList[k] ;
				
			$J('#' + t.tabList[k].uid).click(this.e_clickedTab);

			var div = t.tabList[k].div;
			div.className = 'container';
			div.style.display = 'none';
			t.mainbox.append(div);
			try {
				t.tabList[k].obj.init(div);
			} catch (e){
				//didi modif :  add line number err
				div.innerHTML += 'INIT ERROR: '+ e + ' at line:'+ e.lineNumber;
			}
		}
		if (t.current_tab === null)
			t.current_tab = sorter[0][1];    
		t.setTabStyle ($id (t.current_tab.uid), true);
		t.current_tab.div.style.display = 'block';
	},

	hideTab : function (){
		var t = TabsManager;
		t.current_tab.obj.hide();
	},

	showTab : function (){
		var t = TabsManager;
		t.current_tab.obj.show();
	},
		
	setTabStyle : function (element, selected){
		if (selected){
			element.style.zIndex = 1;
			element.className = 'tab selected';
		} 
		else {
			element.style.zIndex = 0;
			element.className = 'tab';
		}
	},
	
	e_clickedTab : function (event){
		var t = TabsManager;
		
		var target = event.target;
		
		if ( !target.id ) {
			target = target.parentNode;
		}
		
		if ( !target.id ) {
			target = target.parentNode;
		}
		
		for (k in t.tabList) {
			if (t.tabList[k].uid === target.id) {
				var newTab = t.tabList[k];
				break;
			}
		}
		
		if (t.current_tab.name !== newTab.name){
			t.setTabStyle ($id(newTab.uid), true);
			t.setTabStyle ($id(t.current_tab.uid), false);
			t.current_tab.obj.hide ();
			t.current_tab.div.style.display = 'none';
			t.current_tab = newTab;
			newTab.div.style.display = 'block';
			Data.options.current_tab = newTab.name;      
		}
		newTab.obj.show();
	}
}


var width  = Math.randRange(300,320);
$startUpBox = dialogBox({
	id		: setUID('startup-box'),
	buttons : {},
	position: [parseInt(document.body.offsetWidth-(document.body.offsetWidth-760)/2-width/2), Math.randRange(0,20)],
	width	: width,
	height	: Math.randRange(150,160),
	title	: translate('Loading -') + ' v'+ (SCRIPT_VERSION.match(/\d+?\.\d+?[a-k]/)[0]||'') + ' ...',
	html	: '<br><div id='+setUID('startup-progressbar')+'></div><br><span>' + translate('Loading Script Please Wait') + '...</span>',
	close	: function(event, ui){
		clearTimeout(STARTUP_TIMER);
	}
});

StepTimeBar.start({ target:$J('#'+UID['startup-progressbar']), steps:4, delay:SCRIPT_STARTUP_DELAY*3 });

setTimeout ( scriptStartUp, SCRIPT_STARTUP_DELAY );






DATA_MAP = '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\
ehNpQSNSGUg5KHp6iIR6iXlaKkFyVhGBh0oTOVRZKWokN3ZBGIEkNXZ2ZnNYc4SKIUKBSBohOEZ5\
J2GDQThUUmRaaGMVMml3SicndnFUc3VyOkYnVyFyNmNUNHYpcVkzc2R4NIooNTY0UzJjSjVid3dV\
aXY6hlEaIoNEGIV3ckNDIyGKRoiDMYhHVBd0SidIISVaWhlmdzdneFpVSkVKYkl6aic6SFM1emd6\
OFJadUgYMyUpVWpiFREqI2YmiHNZRHgmV4oScYR5iVMXWRIYVlQ2IxhTZHUpJEkiSip0I0U6RFUU\
KiNnhnQqNkdSGnVJMRpVR0YzdicmZyURiCJFaikyFRoUhxiGKRlqUVVxchWFVzpXEUcmhkdaMSZa\
YVchcTVnGCYYVoY2Myc1WFVIeSQ2KGF2ckVlUXM6KUh0hjNIJlKEY1OCaHd6ZHVkWRE3JokpY2pk\
ZXR4YTaDIXdyIUcqEyRGQUIRhTV3J2dRRChTIWQyijN1gllCZ1daIhJ0aGhqQiNSJmgkRSRJZ1Q5\
dRUTdUZaJVp6QmcnNxKGh0ElNYcqYSF2cXmIhRh2KXUmKXhzNzJFdyFkQoY1YYYWSnVjikITc4I3\
SVZYN3IocVViMmdFGSEYQXZZNjZ5doInFxl1VlZRFXdkQkISQzlhY2VhhFpZcnYoiCQqJFJleVpK\
JFRCWDlTUjiBOnNXhkVTajoUY1N3R4lZYoJESBgxdVWHExmFUXcSWGMxcxRHI2VIR1NjEhUjhTpR\
SSpaNFZHalE2REUpKDVBaYcRE0hRNWGFV1Y3REdiR2iFZzgldIUXQTIzRyc1GWo2OTkVKXqCFXNU\
JnUhISRZenQmhnGIMUlYRSFJMXFhgRGBiodlM2kaRXchRCc2d1EjGlciSRmGiBNJdWJkhUEZiooW\
FSNSanoVNmlGNYpTJzJ1FRc2hoKJZYFaOCpoR2F5YopiYlmHYoYzdBN6ZSg0IXo0GCIaRlNmKBg6\
gmYnERlpNnRlc1cTh3JJRhk5JRknOSRocxSBR4gyJyozKCpUgWY3KHIWFyRJM2d4aYQWKoFKMmdT\
VDNGioQSQjl2EVaHJDcVc1KBgXp0OmFBEnEzKDITc3YhVUV5U1oxEzFhYYJ2FVJnYkk1aRZmOVhx\
ZXhJZ3pKWoeDSVRCiSRqFiaIVyg2aRmENVKKI3aIZyRFGVUyaSiDJooidSplVxlSKnhYNnJ0Ykgy\
ahImGGc1EyF4KncqgmI2cig5WXozElVoInU3WVg0cRllVEknM3SENhdqglhHMYdEJjUhMxRSF1VS\
aDIZVXRlaFd6EmmGZHR1WUlTRzRjaWEjE2ZhGSVTiGZhc4SKhEYSJVKBV2hhKmE4MYSBIVohc0GI\
MViCSISKNFk5Q2Z3ZkJ5cxERehiFYlJxZEgiZyUhWEVDaFd6VDiDJxZTVTU5dYVyZIh1eoeFimJo\
h1lDQzQ3N3RlWhSJaWMjUWQVYTRVgTl6FSpiY3Vyhic1QmokJhNaZklHdhJ3WEdSc2FlOVGEVWg0\
Vyd4hjZoVVQkM2E2h4JKQ0hDeXaBhzNyNYMRI0cThFkzQWhlJVdHOHJnIYeEI0F3aocqR1VERzdD\
dHOBcmg5OihqWiYkQ2MUJ3ZBVDYzSHg1V1cYiChoGDlqUheFJXJRKiJTgYYmZjJZgxZkdGOISDiC\
QkIaZjiKend6J0pxF3omiVk2FWSDGmYaN3hXQ4MZIiM1UmdHgxM3KSVJWGl0V1M4ehVhKBRDJRoW\
RVFnUmdqc2ITNhJXE3phZDaCY3Zydic1FWhYVUFHQjk2NjY4IRdIQodqUSFIUhFYQYUiJYMhcUJz\
gXdHMWOEN2Z2c4OEFTJ5GWY2Qyo1MVRWFYZpdzZUSCR1JHpiE4YkJCRYaFYzeUKFY3JYRDpIdSEj\
IyJ4VUMyehklZXUpIVqKMUo0WVlKRnqKdxiCRDF0GYF2KBdhWnhUhmpHhYd0NTIoiFU1F3Z4Q4Qp\
hihoWCdxVxZIhhElRkghaShzQ4VkNTFiNxREdzpZVxURIyqEiFIiMXWFdFpkOBITWHJXeEVCFFhW\
hGpCIiIyKUJyMopBc2paRUdiYkVIZ2aHZ2RagjYqiIQ1YXNhdSQoNhg6SBFCMmhGZoEkVDYkaGoa\
I2MxdxdRKlY5iSWBSGJFFYUXKId3NDRKIYNTVRJUSFczJ3Z4KIJBdYZ1Koh2QTp1ExhTcTc3M0do\
FlJ3RSQpF0MZFXp3dSQhSiOERRZ0ERGIhRYzRnYmghMncmcoZlQ1RDcoQnpTJBlDZ4dxETSEYSGH\
GFNXd1UkNUlDc0iKGHUTR1hZR0ozdmZXOYQzQXE4EjJFaINXQTEqWSJaVjp4U3ISdyY5NClJFGZi\
RylmhSNhEYV1gWF0hDZ2d1Y1cWKJKSFnURqHVTNqRHo5GBhiNIYVRXFiVoIjKSWDdShJUnd5iohE\
Z1h4V0oagRhmgXMlRhR5NopHdEdGV4qDVVZ4Q2RlZYZFJYOJVDcVVjJhRYdZaENhdXpoKBUpiDJC\
VTF3ODJyWkdpYSI1QyZiI1ZGWmIxWiUVUlkaYVOBclkzMngTZ0SJc1V6YUZTNXKGVocohjlxiVdZ\
NiMxcSJqRzo1FzNEJ2WHGCVaiFSHGlIVQ2QyGIYaR0IWV0IaJjg0WUlSdBJoZnIqh3FzWTKDeHp2\
WohDEXUlWnR5GDkoiYRyE0V4VkhDhRkXRCEiRIonWBoaSSEyV4d6MTgycUlWhWRoIkklZieDd2ly\
KXg3JHMYUYJVhjpCGDNkGhFldxmFeWkqd2V3YXViEnc3hRFiUWUxghcmI4p0WoZHGBdEODERhUMZ\
Z2JZVGl6iEhVVRgUNWMSSjlUiVZBKRETKniGgUMygXEShYgZWmcmiBgYYmUmijZSiDdoMSZJWXUx\
aEQoIyknSVmKNoFyGYcadnhFGHM0WWVGWBY4KGFXKUlEMUEqSlJGOSpqVTp4YlZZIzlYeSIyZyGC\
VBcYeIaKVSkaRRQ6M1R6WGVFeTEjY1NDOnkqMReBNRkoihFZOINFRkUzWESBVBhRYjEpakd2Mmc1\
cRVKZWWFURgnOHMhcUUnQSNRaidEKIQzGBNIVRoSaRVHeBGDMoFSFxhXaBIZUXJZgio0RFc1KjWD\
M4JxiDJUI2mJZDJkMjZ3NRV1OoJFFiUiVBd4YWc1d2ljKFIkFlZGRyFTh0Z2ZEiHUVJWhGd1hlQz\
I1phITUSZmgqZzYyWRZHGkU3ZTk3OHVlhzNjgXhBWIGBIxFXU1k1GWZah1NXVSgTKjIpFyeBV2QY\
SFOCgzR2VREydBU1g3SENIZFQVZJJGSEKGGCUxVnFkhJhzgSMogzdVFEM2F1UkqGNohIiGZyGSRU\
hyRnIlJmEmEmYjlGhTFIeVOBhnM3dEJThWKDJHElSTNWNVNoY0MZgWUlOUkydxl0JBgmiSMhOkp0\
eoJiaCExKFl4ZVgnJRSFYVoaMjo4E2gUZolDGnMnIzF4WRkjYVlCdBMTI3OHiUlYVBg3E4YlcTh4\
GkVKN1FDdxonaIojVFhEhlNCczFhUyY4RymBdDRUZxhBFlcxJnJlGFaBdkg5ZDiJRUUZaEqJWGlZ\
FyZKFzQXZROChGRDUWR3hkoUWoSJdjJ4EVIoWFUhFhp2JBJZYnNlihQjgXgYd3gzWml6gRFDEioZ\
R0FRVVkxZ2QYUjElRViEcXQ5OURCJRFBKlJkhxomEnIRREdpc0RmI1JjUWiHKiJ4R4F0hFZTVIVq\
SDVWODcRNkJnOkRYJhJKOUqIN4JRMlUlURUXUzVkclF4Fmc6JHhUFWclVioXKkpBYyVyV1FDM1gy\
JWOCahJ5gRZWdYRjWSo1gRMTaXMlF1ZhVnMZFURDRIongUUYRlNaUXFVE3oqSGSIISp1I1pGWkM1\
ITkYGCc0glgRIiRpI1ZESBSBZhk5NSIickF1ElozaSOBQVZZVRJqZYdKcyIiiWV1KWEyaloXeYUm\
MxQ4IzYjJxF5eoFyWXRnIxFoJ0ZqNWWJR1UTiUhVenQWJCJlNjQaZ1NhgjUjhEglSIcpIiVjGXUa\
EVgqMml5gSg6OHiGOogmRnZhEyITFhoWM2gmSkc3MloREiU5OBqHSWVJhmNRWiGCWicqNHkjEjRK\
GnkYGSJlRnF4GDdGNDdJVRMqeWNEgidSinYUcoExE1JUKoSHZFZBOIVZcmRzQxNoYyU5ETgzWFlm\
KhmCNTIkMUU1VHSKFFlmR0GGhBVxF1o1eYOEZDKKEyJHQTIqZkE4alZqNxQXSHFaFXV3OHeIRlUl\
GSSFJ2Z4JRIUOHVyNWh1OBeGRkGHgxoSgzQ5ZWZnRhQUJUFiRRYVdjNDQxIhcVGCSoSGgWpVNoZW\
V1hTVUdFeXl5dSMyOYpEQoQTYhVVdVqGZmk0ORNYGWlDWHdmNClKFSaHgzg3QWoYF3eCJGIVY4eD\
dGQ5inJ2VGpEehZENWY5RRN4dVk4GWFngYgRYiUoSTdGgimKeXUjdmRZN1V3WCVjhyZIGidzE4WE\
diZUNVE2cjU4V0lzeDkTJ2d5imk3KHmEWTVoamNBGkJFchdKGEh4eTZ3Z0cVaYYVNHZGQVgmVzIm\
aldSdYJFWFMyGoMpNCGDKkZUEjQVaVdiiSRBcYQnSGc3Y0NaaUWJYnQVJIIRWllIiUhWdVR1cohS\
JIQlYYJFSBiDJyNaGEFBI3gUUzhyUXJnMRkmNBYlM2VmhRYWURNiF3ooiFIWJzOIKWU4ehNHRBol\
GTIySVQ0FFoqFGo1R2ZKFGIzI3Mqgig4OiQzdBQoFjZHFiZjKWaCQyVqRRQpVWMRZipxhXpqhiV5\
hIpGV4RhcRhGKkglOVR5KXMoiGUicVZEU0onKiRnWSQYRmVjKWIxd0ZYFyE2GSV6aIh0V4ZaaVUZ\
dUKChGqHOYGGSnEqJ4YzSWeJWRUSR1IxFHEpcVo6dDhRGWc0hSU0Q1ZRiheEMhoRSkc2QlNxGXlE\
dlRUajkYeDpaQlmGaTNzFlNWWIcigxgnWRJmGYNZiBMUE1Y1hUeIaIKBFRiEY1eJVmWGIyNUOTeD\
MyODITMxeSczcTREWCEyiTdRhSQ1UhdFckk6iFpTVBVyEySHWYlxWGopSkeBQVo3ORM0VoRhIVVX\
R4cjRIhxQ4KFEScZg4dUWkpyJmWKWhhEISU4NFoYZ2liZzhKV1OHRBcYdlNRFYUoE3Q2ZHFTOFpa\
FEWFgUd2GkUkMTKIdWVVKDg4hGl6aiRnSYJRdCc2Ilh3d1kVNypFZYY6dhMkFWoqhGNDQ3GCKTlq\
ijZ2MVhDdTNHSmZ0aEExGIE6ioFiiBFIYzgjanE4iRY2NnmJJTRzNyQZYoo4ZmF1NXI6UnomF3Iz\
FlKHWDMWU3hJGEcZRWIyejcZOCkSc3pmc3ISRDUyJScpaYglJkEjd2NSN4QjhySHIUFCSFFqM4dq\
RxIRNSkRgxhWMiRXdkWGdmdBVhkYSGmJNDgaQ0p1VUpndTEVF1E4cYZhaVcqQlNZZBeIQyKJGHoh\
RBZoYSQVUUaHZ1VzgWJzR3I5GTqBEioiGWQiOYUzanNIQyYhc2VZdCZUYWQaF0SEgXQaiRooUydq\
J0Q4FBNRERYVQik4KEghMno0eRZCWmI6JDpyEUNiOnpYZVJyNUUzKEaGSGhEdIcXZYFRV0IVOiJo\
F0FiSFaagYUoSDmFE4RDOHVVRYUVc1VDQVM2QnYYEXlGGTFaJoExiGMZGUSEVoRCaSJ0NnlpN4pV\
MVNXKjF5FEhBFUd2YYaCMYlzOodhYndRKBVUZRNnU1FiaFcSQ1ZzKWFjFISJFDdhZGUxMUJHdWEV\
YYE3ZGOFiXFKeWcnR0U2QUcohHNUMjlaKohFeCIjgyhahmQahoNYKiRGdXGDRlUYiTY1IVElZIQp\
GYYkGXF1hih1dVM4Q3F5eWFZOGd0eYlKGSKBF0l6KTUXSXNGemNBNhJxWEg5UxlIEnZ1U2pFhHga\
KCESJnIaiDVDVBVHNidVUYMxKVRFSXdnRTgkY0KJJGGKIXZpMhmCdIF2elNkaheKZEoUWFhFMRJZ\
IjJVFxFpMYMngXMlckaCg2QlQkZJdBplZjdmKYhJZ3g5VIYjeBiCFTEqg4kTFHFqOBlUF0dndhgU\
GiSBhoUxKGZ6MyYWFXZJNWhiM4dxMncadikVNkdqRBZzgTl2JylSKnpqGmFiSBMaFTkpdhdkKWNi\
h1M1J4aCcSlJcnRZQyiJUmlUgxkZEjJlgySEIWGIWmdHYlp6g4ZRV1UaQTlWV1ZRVUJDRVI0Q0d1\
gUJmcxcnZVRSZVQVNUVIGjlGJIhRFYhEiSVxgRQTV4oWRldqZSRUYxEodjNUNBKBQ2NTJ0pnUmIn\
ZzlHdBpoEXUxI0cRcVZjFBd1Y1d1RoQqQ0Y2KmMZZIEYUYmEISmKElqDhRlXZImKQzEXcipSaYdU\
KVJ2EXpjYjQWeoYUeBNBWRRTSGokd4RhE0ZTJllXQjZER2EyQYVkNocVWnE0emlaQiR6WCRJWRN6\
gkFJKHMkEmiIRycxF1YlRDMXKhJZGhk4hTM6gXJ6RYdnVEFidlY5NkdoYXVTcRdBRTeEQVUyWXE0\
WUIoOjYieIZaM3ExGVYYdCQZMzc5dFUodSGKZlKKE3MkM1R6FFRkElc4GTqGdDcqaShhRhUmanJF\
iRQpOjg1YSUSFCRjQYRUFDUpMnFZQlUVg4NUOEp4EiNlOBIpNEIyEVhEZ2JSJoZySImIiFgqIWGH\
WBgyZXIjNSoVQjhpanKFhXgVMTcYekkpNoMUKllKIVo3J2JTWBGGVHoWZUNIWGGBOYY6FRmGGXVZ\
FGNKQ4NjJYhjiXQ3FzRFOhgVNyh2JxRKiINYWHZUKkhnKDQzKWdRSYeHYiEUJBo4KXoaZEpEOBlF\
cRU1VmdIWYV6h0eDY3JlaTpUIkR3h0RIVYNXMVRKdzQVE1ESYzaCFBomiRk4g4VXFRkUajVZhhEm\
WhESWSVlcioWNjJHc1V0NhlYJSJVamRnhSQmSIQmcnUxRmSFUhKKVGQxNDqHUycqaUF0Iok5ZxEm\
SFYaSlcqZzN1MTdCYzl4MmeCemQhMhplNTqFcVlUR4hHgmNTRngkd2ZZESZkh3RaglkqJBYxEmR6\
ZFRTaEI2cUhXJ4SDUiVng4RRcTNGQmNxJIhYNTURGXOJKRKCaXJVKio5U2o0UjdhiXV4enhnYzYy\
R2mGeUFCYmR1NSUjSoOFJjmCRXOIeDRGNBQVN2MpJHJ6QkiJKRlTKXIodIo5F4V3QWRhaTcqaicX\
EUgWEzJFZxKBUUGCcoERFmI4FiOGFlJZIlg4QzZqgjJ1YoZGekJBM1o6Ulc0VTEoYUqDWhqGN1gx\
FyMpaDSIWmGBhWNkWChyWnNzFYYyJDFHGYMzgRUqRxEVVYMjQ0eCWlqDOYJneIpUE3dWd0Q3I1ol\
M0kViXU6FGRVd3ZpRSlqRIlYelgmYUISFWF2YRUpM0hBUhJDYTVCJIJJdXE1OFdXhSRkd1Z1GTdo\
MjGJGldqE0omKmN2SWd5IWWEd1pSaGRkMyOFhxZ3F0hDRxl5h1QXhGpmZ1ZKOCURRCdDFTREY2lp\
NEl5VhEiRBcZdHZ4OXNUREEmiHWKdVgkKVlWeBM1aUg2h4F6hGFZI4h1KolzKVNHE4KHSCohGmoU\
eic2YSQYIkNnVyY5RTkUQlKKRHOEV0olhoY5FTUnEXQ1NUY2Q1YxGFlDMVV2eXFkalU3RCYpNRly\
YiQmc2RmKiZxJBiIYxWFRCFqaFJpMSYyNCoyF1h0Q2KIciolEkkxeWZ1aVU2SDc5Z3JGVzpEeSJl\
OIqIKnIUg1RzWDZoQooziVOCODgXR3WFUUkZWUR2KjckYxExN4eGGENDMjZHGlZUSVJWWUg4gjJj\
FUF5JlczWYciVoE4QWlXNUh4WSd1OIFEGCZJURg0UTMqZHclgWExYVllZkVXNmZohCY5cmOGWGVU\
RUl5hCpWdDkqFXYRaUMlFyckFDRiQ1ohRyFJQRFFGVlKEkc4goZFIWEUIXgnGVVJOhMjWnI2I1OD\
SmN1h4hjhWRKaCE3ZIhFKXkjQWo0IVQaSGVkFyFWaiFIKDl2eml6VGFhendhGnFSKoGKgzIkORY0\
glgiRhEjSHlWWVmEgxI5g3EUZol0GjEliokmEYQ4FXFnV2RESEZ3ikUjaoF4FGMVQ0gnd2RYSTI6\
FWhHamooghNIhkl0d1Q3eRFEZBiDGXNBJHVBShiDRxIYUUlIOFlRdGNoGRISQjc6FXkkeVGEImNK\
eiMneEM3ITVHNkIXWEhHhRNBJ2oRE0onVkkaIXchhRIjKiJ5GSh3I4ZaJ2N6OVMpGilkJSJBUyJx\
NzMjiYlyQjSIcTonR1eIUyiKdCp0dUJXRIY0d0pFOlkoNjM3g2hCehQYhjGHekVEOWFKeEV0ZDJZ\
ellDNCgYhhQ4VyKKInQRYlkZeWVzNIOCKBQpU4FVJhVEEhQkFFd0GWWBFzNWURUpUkFSYThDWSM6\
Z0Y5SSWIdjF3FGd2UkZyejY2hjOEYhQ6dmhCholjaFaJGkkYglhXKnmGWREhIWhyGIOFallWZ2l0\
E1QTYUUaM2NzREp4ZIoUiEkYhHhDZlRyeXQmdWJIRiZ0KEIZMWI3J1mCFheFYkYmUoo0hhFZJHmB\
SnNIMzIkQzMXhSIVYmSIOBgZMkiHV0Ijg0JKM0FDgXYVZ0I1GBIlOWcmV3dxKRg6FUVXd1ljKRZ3\
dXEoVXhTMmFmORFBckd2UoiFM0k3JmQmOIZiFhhhiWZzOhRFKmp6RElEhiRCeGVCQxRIN3oiFhR3\
FWR4RzglKooXM3ozWDiBFxUSRlYYOhlzNzMiGlZpYoEmQhZjQTMYN3pVQ3eCeHooGngZQVISNHZU\
EzIjKomESUpKEzN5GHZkQnd1iCKDImWBSCeHWRVmNXqCKUqDZ2KEUXg2NyJBh2NBFipDEkc0FxY3\
JEFjgYNaSIYmE2aBempRSEl3ZHcXWFYYShh3Q4cacXo3WWmBWDlHdCNlMjhBI0JYIiRyNIk2IyEx\
dHRBeloxdBk5GGU5VnhIEkU2ITgVRjd2UmFTGCg6YicjgkppKCE5OWNahDSJGFJoE1NXikJBcRM2\
N0VJZFhCUyISQzlEJnMVGDc5WWkRd2Z6IjRWJklkKYFoVGUZKTohFHYqgxIzU2ZWNRE6NFdYEllH\
JXNZd2EiaHdWRyVhWHExYnNIWCZFaoJmFVVSdEgqVHgnE0UjZyNBKHUTSYFRYnVXiRJ6UlQ5VneH\
WGklNRSHZ4V5aTQUVkZFZidRdUVYMkiHMmExSYNoIod5JTQ5F1J1Q4ZRNGoqSBQ0eINxKCYhUkMo\
E2M2RjdqQXN1WYcTZhMheWRJY4QXETZCM2NSE4lZSTcqVDlVWkNYSFk3mnk5RVgxRSkzEihpdWlx\
JXd0SmoYJjZzMRU4YYmEFDJUIliDV2VTKWhxVnkqNoQ3ZYFmZCJHYmcZExYhYkMYRleBOnM0GGZJ\
ZigTFTQUFRQVZER0ZFkUVSiDhjgmFXUkWkRxYxKFdxFURigVVYckOBhjOIRxFiNxKVk5WVWENXmF\
KCKBaHM1KXUWhxUpd2N2gjdTVBKFZEdkWnh2WDJ6QiUTQWpBdTQXKWiCahkVNEQmNxEzISIVchiE\
U2g5I3FaJSgliRciF3ZiI2VxVFMjgWaCWGeEFEg6iDdxMoqFh0koU2V1ZkoVVDmEWGl2EnRJVjmD\
KHV3NHh2ahlFaEEVERGFRYpJSkFmFXYnZSQqJIkyWIRhhoEmYmQlJ0c6SYJFUVRFeiVhhSN0SkVh\
gmdDGHM4WhR3FFYlaXZZeVlCN2k2GYVqhhhjOIqIdkk2h2FhGmWJRUNnSjMUKIl5WmWCilpReXNl\
OURSeGRVaoGDV1EYYYRndIUxU3goUkUXRDl3EVMjM3M3R4lnZihiFypaIyQRR4ZGKCZjGilGFjmG\
SYUmNRkpaXhxV1ZTOCQRSBpTIWoadBF1NRhYIYUiN2GFKXVzdSgXg1NIN3ZTY2k2I1QUdBMUI4iF\
RViBN4F3F4FzSkd6g4oqYTcaiIV3FGgqZzM1UjOEQ3ESOlQxeIJDJzUXWjMkc1QqZFlBNSEXgRR1\
ZRooKTSEdUpxE4EoR1WKI3NaNSokETpTZUYYFCgRKllTdjZqNREmJDZXVSKCSYpnKIZREXpoOScx\
Z2eBOTRTJWQVdYVCGhNSQXUnESlUOjIqN4E0iXQ2OHZxY2dKZyMWSGcYVxolaIdhOGGEeHJheUUR\
EiVDdyYZNXpJF4UiJVgUEkUleClqhmZRQ1eDWoNSaTUiiXRWeRM1NVQoGoQnShiGdUh4KVh1ZYdq\
ESNUOXdZaGlDJxE4USU5MkGBWkI4RTmBRIOHF3E0eBZiJCM0VShDMiUlczhhIxdZQjpJMRmCWodJ\
IzpnUiQaVhoWGFlhRVESdVWHOmlYaCNaEiQ4cRFGJBImVCg3goNDYVSHVxQ1andDhhlVeYoSYoR6\
ZRVDgWJxJkiDNBl6hVWDR2pyV2Y6KlJKiUFqcxchOWpHY2mCVTiDeGeDSFo1M1ZFakJ3N0EjZzoU\
YSNoakEyJUFYRhJpiIhkY0okiUWFUoYxaUdpIRZjaIYahjJqRSE1M2EjY0oxhTOERBqCE3IjVkI6\
N2FnWSVZESaKKUp6YzNxFlEjhyk4SBk0FmQndWYSclcpUjdnM0I1E3aCNFZpRDMTaEM6FWmGZXJY\
akZIU3ZCNjKEhkSChIGEGmknUWdlZ4h2ZIWHhVQpgWE3FmqBR4N5KmNYdRKCM3Img2Z6IUJ3RDlU\
RGSBdUISKUNHgjNHiDGESCJ0M2VWiVZxIlYhGneDSWlpMmpRWRkaGGolQWgROTk3FmRjOoeCQUKH\
EVdjVBNxiiknKnIXdUpHZyZ6EUkRM4oliElEKoF4OjIndISDFnp2UjUSGmQpZ0cZhToSeBpmRWJV\
RkYVM2QTRWlDKBRVSkJIUlZHYTg5cyVHVyZHGEgZeYaKKGdIglg2I2U6F2kVI2FHIoJ0V1kohYZH\
WHgVJWYyRlY6JhdlV3g0Yxh1hDE1QiloI2VoRilzgnFxJSQyJ1UoKBOJORo6GEkkVWQjNCJURUFa\
RxZkIlpodTF6dyZ3SCR6JmgUQ2QzhzRGFTZzYlk4RUNnRjVVWClTElcnKGZ5FHoWJWFGKDKCUmpy\
U0FYREdXFGE0UYdVVHcyFzh4YUcaEjVYWDKHZYV0R0oYQWM3eXVGcSI2eTNWUTdCaURSFlpmWhRI\
I4ZBImNjMSQzGnFmNCplKDVhZzaKGYFVI3FShDJiVXI4cmQWRGpaRVIoeoFlIoR5iUlFWHk4Ryh1\
clo5GGZ0gyNzFjlCVDdWiDkYNXNxUyoRZlmHJDpaEymKVWhJJzdHFydXhjdzZ4J5YRMlI1IhFlVz\
ZDIqF3oXh1pYNlgXglZpQoEYZzOKdBdzRXRaR4YZQYkWMhJnhoUpVSdIJBkzQil2UkpIMlQ6FYo2\
Q2giNhloMYKFgiM0MoIYg2aHd2lFFnUkNGQkakmGVyliKBkzKUZFFHqKGEM4OnlmOWVDKDhFSUUx\
h1l3FGpXRCkYOHoXJjmCI4M0EXQjKWJ2eHYXYWdjKhRJKGFGeEeBaBREMVQqKWN0dGd1hjQoJBZD\
ZEGJdoqFgWQjSTg3elURFRhIdTVJUWE6Vjklh0FHUYFFNEkURShXehYqElJ3MSJaOocWZmVWZCZZ\
aCYVeDh2V2pHZTeJR0JSYip5Y1gVcYoWSXlxRlY2VlmKR2FoZnUpiHpCWGUnJmQShIJJZDFBgXhq\
RFUTFjpiOoIiKId1WXgkFSlzZCIyUiZiYVZzQjk2cYQhhSqGOHQpZCIyhVgzakF2V2lJgyIkSCMi\
UTRUWTQZYxhHN3ViOHOEEko1GEkXJVhXdXFJFoNTYhVVSiIRE2cpOFV1KiNKaoUREzNiWVMpQSKF\
gVl3Uig4aElXdBJEFXg1dIYnhVVJFXNmZ1F5NyqEg4NIJXkTJBhSUXVJKEU0OWQzSBcjVWkTZkhD\
eRoRRRJhSjlXYjiCFSo3d0VzV2YWIjNZaWE3GWY6YRVHZhE1SBJJQzM0WGQZJiMhRldWFSMnRShV\
gkFGOUmFN3IhcmpZQmFBiYkUiTZCMWdZYnIiSTSIOkRkeRESJXJkREVnaIkXdiVWSYYUhilkKYdJ\
WSp1I4NjUWUWOSlUUhlCF3iDY4NDGnMaI3UnE0diNmpFiCkTRxiBR2gjKBIRFCeEORYXJSZCEoc4\
dWRCdDlkdyNjU1EndkMpJhMVMRI3hCqBYRIqUxlCKiQSY3QTFWUoQ0liNyiCNXU1N2NiSHZSF2JS\
VXkaJVYkVRVCYYpGaYdkYUpKUhaGg4dCMhUnanF3VilIZkUUR0oiYmplQySIJzcaVolhMRZEVzZ2\
WVNFIjMWQhqEYXlYOHZ1JEQRclFCU3eKZGQpF3aKEnURU4M3ZXk6JRJaGUJicjYXJlRUMRUlUUU0\
Vhd0GDoSJBYqUSRkY1lCaFdCJyYqRiFoJolkNXR0ISOGaTFEZHYjKSEpJSiCMlhYMxcXSCl2ZIZp\
EklBEoNHaDmDiGg6hFZodTOKQVU2FEYniIgkNiVERigaeSSBZxQ1ZDJHZ4kVI0QjRVKIchJERooj\
aBgTOEoqUShGMVp5MRppZopqURcXFBdFRkJnE1pxQodzGTcyKDIaQjN5RlNZV4FjOCFHJYhWI3QR\
FFojF2p6dHQqWBMnNGQjandjI1oYhSeIOHRqJFVHZTF2VkdGOoFjeleHiUiCYnZTVylCWldHOnYn\
aRRieRgxUkQ1ZTNyGBdiQWEpNoZHNBJjMUk4gSVWGhZkWRFUd1aEUyVaSXZhQUJjMRdicnRXGDER\
JogVKSF0MUiBcolESTRUQmKGIWQmclImIyOCgmYYh1ZBiYhmRBY1dzhFRnOERkUxQjhqOGlTdToY\
dFJWQyo3cmKCYhJJM4QjhEUohzZKUkRERmYyilRpKTeJihoXd0gjJIlWRmWBJ1NyIioXGilhRjRy\
JIgYiTiFehIUGGOEEiRFQkhBURllJxNnZ3hUJIJRNno2Yxd5IUqGhkNKRlmBMjIkhDYzeRpmY2hZ\
Q1NEd3ZhGleEY2lEERYyUURRU2lhORklQ0RENWd3iDUyhjhUaWYoJnNBKYpnOTFqdlZiGomHZChS\
FRFlWHpUOWpkakY4MjEyUTRzRSonVRp3FBVCUydkaWlKeWU4WHNYKIE2hSpDRUmDGYlXiDdTRidq\
g4caMoFnU3pSRDNEalN5gyeFEXJhaUkaZHlBWVJkRGUxSBI3QYSEWVGBiXN2RnFTRxhGKWg2JTmI\
YxQzUXgSSHV5VEgiJWMXc4lHaSF4c4VUOUN6dUU3NDYjSoohMkhCgTYVQ2IjQ4ITFiZRdkljExqB\
GHcYEnERQoIlJSlJNlI1hSIhJFeKWkY1ehV3h1hRFnYlKko0F2EzU0YnKiM4Myo2Vygog3gmgXFC\
VYkmWCV2dYNmeGWJNSI3c1YSdhciSTgSUjNyYyV5cUGDYjNlhYcydUUqeGpnhmZZFHgVR3dZUkcY\
aRIhhhd0IUoUOmFhY2OFJoQ3M1ElSoiIQxI0anN2KnoaMTZ1UWEnKWFJUklzUoJpeVI0NXmKiCMV\
KUJkdEM0KDdyGShVJnhXFGRGSmhycldTORcYRDYaGSREIhcoYXd1YhQREliHFHQhYUZnKIQoMhln\
hXk6eHRHYkVyJGWCRxloZygxIhpyMWKHIlkxNoMZYYeKEWk5YlMqhIlHMSllWoozhooneEFDWnlD\
REY6J4cRRHclihVGGilFaUdpKYF0WUEYiRZnKiGCNmOBFkQoeGVxFXd2hWdkRyInUmF0YylVN3UZ\
UUJhSBclMRGHiRR5FhohMoYmM4kYISpoSUokQzhFgkcmaThFUVoaNFFiOmkhajFJFYlCc0EhIko2\
VHozaGkoVGaIh1NUgzJpVUlDcVUYMko3UYgVeolyaloYimE3KFoSImNihzVnJBh4JEGKKYJ2STkm\
NDkieBqGEmd6Q0pKeVJDWDZGZlFZgROBFESCeCczY3EyEWU6FzFiWkFGSjokcSlyWRpGFnloZnh4\
MjhnVxVHVihhNmRFhzJTVXooEUgUeSREOTMXanQaQhMWKTlFQWFoUnSHc3IoZ1RnJXdTdHKCFnqC\
hYiGGmJqiDWDJVdnJnqEUhMoaTGJOFQ2hyFmSCN0hmd2UkdxVYN5N3l5clZVZFJHgiiKiGo4SEKD\
aTE4MVc6RDeCdDRJgYQ1KnWEdHUiJ1MYanFXFiQaiSdac3lzJ0lqZSdyGEI4ERkzaGNHdIVxNidW\
gzRTc4kjEkVyaIUmQjSKNRdyV2aJY4KCKYEXNCkhhSQnd4p1hkVnilpnJmGFKEcYGBMnZEEzRTeI\
hzc6OSdBJhJzYzEWc4ZqYxh5iGN5J3qJU4QXaBFyZXY3OWUyJ2c1M3F6ZiJxOWhaRGVaN0ckZHRE\
EkM0eFQpNmFDcRV1eBIngUZkWTMTNTkkh4FFihEWZ3VVGIk6WGJiQkWBNBpRKRQ4KDV6MWZYUipl\
KShCFxSBNSaEEWElYUM3h3kRhhRnEyVVRxgiQyoxhxl0RSMoGTYUdnllWDYyZ2OBUXVnRhqJWlMZ\
U1VXM2VhFBRZJ4VCWBJ1FSNWiUk2RjhVNTYqE2IxRkpEdXFDZoVxcYRVWkMXU2QmIRRziXUiFCpD\
SoYaWoGFFYVIZBkxEipYJEkXUnZnMXgXRkhSWjaDhVODI4R5ZlqKSjF0ZhgROGRhJGlFUWUnIYZ2\
YzFVE1ESVjljhRd3U4R2RokjUzZyQTEmJkgVF0k3Mzp1aIZCKmhhI4kqhhmKEVEaFhRFhWc3E0F5\
WUJqeiZVNoETMmmFiCoRaRkVEnkShUFTRnQ5YSSKgnhZZyZxYUF2hVgWUyZ2J1ViiSpThDGKh4gS\
E3YpQWSKFEZCUjQYMlqFRxFlVXZ6eWEjZ0pRSRFGFDcyhxQzZ3RYU3ohcnUlYkghaFZJilVTY3NG\
RCl4Z4IWZkd2VhqKdGRZhjmCMVFSGmcieVg2GmiKOWgmMYdiZyURJnh2WIGFhBZoOhppgUJEiDpB\
SkqDUjlRYyY1QWRGJRRDclOEhiNRRRWCVxFxcYVJFog1NUpIcVoaFyEhQmUzFDpVihojMRNqhXJ4\
iWkiFWiDQUhJSFd3FlFqVTUXEhMWdnc6Q3SHiXg4QYckg1VZdmKHhnZ4M4h1MkFKSlc4EidXOiUS\
eVpHYzchWUmChSeEgypIKCkoZSU3hoJHZlgYWYJqJkJycjZjZEqKaoEkRmiERxcSJ4SKgWZnhjJo\
EyVFI0lnVHUkMzo2hSKKWFgxZBgSREIhETdVZxZyVzpxcjeEc3Eqh0hVYkZlQxYyRWdqQRESGTY5\
FGUqVWhmGVlEFhFxQTY6dUh0ZIeCZClpOEgaFTYTiGQSNjSIElRaNHQhFUoleGpFeGFxRlExc3Y4\
KDc3FTJEV2YxKYVEE2KJKhgSNEhHKidHdmkSMnhpJkolIxERJkg6coYVUmp0cSiIRIIjFnNyVYdE\
RSlZEmNlQShZEiaHGidiJ2ZIhoESJElREniJFBIjZmYnRHlacnlahhJKYlZoFHF2FWFTaIQXZ1pi\
KiImMWQzVTeHFxISSCpVUYdKaliDKDg6aWc0UxV0N4YaN1R4JDcTIWhqZzNjgyYzSFghhylzRhYl\
N4c0h1ZpRHUpdnpBUSkUhYiCN3UWOYmJhWF4eUQoZlJ2QWkVRoeKdXRCZUZpU2hEOVaERmJXU1NJ\
RyVhKFNZGYR4VCp3Zml0eWp3OIZFioeKghRKVTg3Nlc1FIFDQ0piNno6SnZWR2OKUzE6iHMiNBln\
dzRyhCoSOIQ2GlZUhnF1MVOHJmZDF1okUVJlZUF3ShkYEhoVclIjgSooeVJlh1dUc1daRGpDFIFZ\
WmSFQ2JWERKFKigTcTVXcohkJ2hlhCdiSoNhF4InKIZ3ZTZpaDomeopohVETVzRoKUZUdCkyElUy\
MilpFGNKiTZpaTGIFkplKBM6hSpRN2eBN2oxIxIXdhZDgVkXE3QkaRo2SnRkcoYkJXqHRCR6dWKK\
Gnk1ESclSmdqUTJlUoIVVRJ2WUlGRUQianUjNzZJQzoUelhKNFJBGTMkZkNHGlMThUpzaSVBElWJ\
SHYiSEiBRhEkNViEcmFoR0NSSCgXKUoYgjRTZWg3WDhjEUhhVRmHOSNyhHRSNTRaR2MoIocSelhk\
EmITYhgnilQ2KlllKip1QlEzFBUleFF6hCMlJnkXGhRagUZhF0mHKIgXVSWJRkV0WjFpJWpBdzFT\
NnpohIpWWjYnJWk0U0I0EXUiaCRIckqKZXiKI3dpFhMoFTRCOSYoViUTGhURdBIXWRmDSVkqgUF4\
IYNxZ0gRSooSJBglWhFnZShUilN6R1pTEUZHShqBZjaCeHRVVFFjURmIKGKHiBRFNEZyF1pxKjRq\
hmgSZjpKR0N1dWZqM3d6KUIkhVc0NVgzSBRkMVg6FGWEVUeCIyiFilhhFxMWE1d0FnKKWYY4QVMT\
RWZmZSlGNjgohGo4F4piRWKGSUFXaFcZQYU2eEE1YocjVISBSFVFcoRVhENkSlgpYzk4JFaHgVqG\
ZRVqVXN2Z2hCORc2KlgnNIphSEWJdnNTYiN5dXN5VjEzSDUoFDIqh1hFR1JXKRJDhVKDJBIkiXRy\
QophREpIGnUhamppOWOKdUlhJ4R1NRp2STNaJEchRTgTaGFBJXYiJxhpgYUaMihlcVlpiCY0ZRE6\
N1KDShpFaCUyhDRVVYZkeRImgWlBVIYScSF0Qlc2dGoVVlRoQWE3RXRpWGYjRUV6KnYZaDo1cldx\
FViJFilRM4d1imY5ViJnehN6Q3h5RXFFShMRZkkSeTFEKVVXR1ZDM2V3RISHEUQzhRMThmJ6ZRpZ\
cXJBcih4djV4OHUhJzZyclQnEmJxR3lKhhJ3ZiEyNWqGgSdWcjaKREhxeIUiVWhiRBZzKHZpFolW\
OlhIWCNKhTFBOYZnNxpDFHciIykoJhl1FTp6Mzc0cTpRMmQyGmohQYhygjcnRzdFd0FDJThDikl2\
NCEUSCgVREMUaRSFKDlRM1WFE4N1QVQjMoMaeRI3ZUEWZ2KCFHMiR2VJZhpURoRnJRJVhFKIcjEy\
aGdiGiERQYFIVXkzaId4JHUSEyh3dngxiYVBOIQjYkR6ViY0VBgzVmWGNypHdikVZSiJczhDiDhk\
EikkSRUiMVcjhUglM2JRSlpYOCQ3SHZyFhphJFNiOBdhY2qFdxR1hCg0IlNmZTpkZmU1OFhGFnMj\
gleEUxlViWE5ZEJKNRZxc4UpNEkRI4ZidmMxWFVzGCNpJGlTiDJoKhkoURFhaCZ1aYM2M1NINjRD\
MzYkJ1YngjaGIVhTGWdXhlNmFSiDJ0VRc4JYd4FhUVZqWIJyFnEzQYU6c0M2YXhxJ3JxV3JhaIdp\
R4YxiDhZdBMzhkgVejdUVhKFU2MadmokEnMhcnFpURQYcnQ0VkI5Z3FJJkFBWBUyEzI0EVNScVZp\
RImIaBUhWYFJdiMkRxgjdyiBJ0h6hihyikGBhYojSRQ3J2QyeUdFSHhxcmESRmYSFohUZoViRiVi\
WHhBWoc6QllWeTMxdohIOCpohSVhSlpXJUEXU4aHFzoiWHgZcWJjVxqDWnV1hRqJSTOJJxSKgWlS\
hkFSgSp0U0pRg1VWhWIqREJZGSk1EYZ2InMRRSUWURl0I3V1QhiJEoo3KWpSGkgZdSk0YYQ4Oidj\
aSiCgYZxGnlWeHppajRXJ1VzJoWBhBEahzkYahgyJoNoUiIXJVV3Q0pmQSERZhYZghpEUjIpYxUl\
h1ODFEMVMWU4ZnZ2QjMXWCR2ghNYEniHghOHOWeGFDVhRkcpVioUQ3g2JjhZKkcVhGiGFTRliBUp\
ioiFWkFzUWhHglcWhkMhUSiBRlJRQYKIQiNRRyRzFjEahlRIGnpmFXMiQSEUY3ZEYmGDZyNFhBZp\
aDRhJVEZZWRRQWiDN4dYiScWIzM3OWNJVXlIcUVkMSN4URZGh0dxYXI2iHNDWRIXWIcWVISHVUky\
MndkF0lTNhhIhlN4NyWEYhZiaiZKKiQ3eFJVVEQaVYVIZho5eiRmcRVhahEXeSJ0FnNlRDk4FREq\
YngYSUIqGjFqJ1p6MXoZFzKHE2UjRzMUdBMnRmEnellkJGMpiFZ0MzdWhWcpcVliJTpyaVUqGIVJ\
hBhoNmpKIXkWYXQUdnE5FlcieigocYFIV1dXaGYmQUQ6h4goQThIZRJFVXQzZ1mHN1VJiTRVIYp3\
EjInZRKJdkNzeYQ1ITVjNxJ6hykRVDQpGhVUioJKUzMpIzlnVUVTSoYRSWZ3E3lRY0gqKVRTFBp0\
iBgUEyFxV4ZGF4EnVip2FUqEgTYqV2iGGFQYFyJzEiphZmkyhxc2KjKDgoSIRYI3YyVxYjpEExRC\
M0d2eUhYNiaIiRgxF3h0aoEzOoEZcTgiFjSHNYRYGhlGMRMTVyOFEhNXMXMzKWeEanlCRkJGdXoT\
giFUdiUThWIYgngaiBNJRilyiXcqgoUzFkpCJXNpUmY3EmZoZBkSGih4YkiKEnR3dTlngRpEgmdI\
aDSIgUGHakKDczd2RhkSR4NqSTomNhGEEiR5Fhd6aYkaZSFyNWgZaGQjJiIjghQaaWNZVRMSaGFI\
KBJUiBRiQ2JydmpBZEp6imaGJlQ4eiFVRRlWJzIUEnMXOGOHGWQnekhJSkVidBGBJIYpiRhjKjp4\
F0Q0hRhXYhKaE3GIRFZkhmiJaRdyEVZhShIkgoM0ZkWCahEmJzMoVIcmKnllFyhSQymIJzQWiCZo\
SVQSEXJ2RnckFCJqMxE0RBFKaCcYRRchNnkZR1NjejZCGEIhI4gxSVmFUUgTYTJ3UTVBiFJ6cjo2\
GSY0NjGHRmkoc0ExhhMRU3oYR3kTVylWgmJWKUpGh2UiFVVJg0VKiVNVVGmKJBokMliKSiEpVklU\
GUkZeGhRQxMTWjYqOWJiFimBRlMmQip0chJ6GRUpZVZZeTeIgiJ4JDImYyVyJGSKETh5GRMxI3kZ\
ZHJCeBlIVUdhiHQWNYhqM3SEUXFZM0iHNDExF2F2MicWJjE6OWkmcillRhF0cxmKYzkqgSpDMXU6\
R4FDgml2MhIoJVFRYWYkOVNBVlEZKnVFSkJYN0goaoJ0WYpkVzFJh1RBeWklcxRCJiNnQhlVI1WE\
dGM5dkF6ikZ3EllqUyJyKopnQnQRdUiGEYRaiDl0N3FpSYYyI1NRgiV1RIqFSkOIE0KIWWlJOnkS\
KENISEM1SmaDMSpyZ0RqNzFiWUmEEiZ4KYg3MVVFImkjWUkxWUh0hTEmdBclWVoWZ1OEU0FmSGgl\
WYQlSGhGM0ZqczN1hUEhWjkkVEcVVBRyFEiJhXQjRCNqdzFUUkITcWohKRIkQjRCOUY6eRQohEQm\
hUJnZGNBOVhBgmF1YSZ3eINzRERFMUQVKHSFQyomGjUjhUeGIiIaMmJZaEhjZDkjVBYhJSokKRFx\
ekgxSBMiIRQaZTllJ3MSaWJyNSoWNzFTYyNqEUFqiohDU3QnFYkTKHNXGWN2hypSJ0EUh0NCdYhG\
U1M6FjJGZDhmSlJIemhaVhd2NVdIcSMlIYeHhEN2FlGFJzMxVCYaGlRyZBRRd0NmdxFGNGKKEypF\
hoE6VHYlVxhEJ3EWVxhnUodYeUZjaYJ2JjImRkKBRIdKGmojdHYXaRhSUllDghl5IVkRJWUiYSJi\
UmF6YjQ0OolWeTmGKHOCcXJEiiclQhODJWgyZEU2ZiE0doN2E0RIGRNkRBYjcVM6ZIhZMUlGdUJZ\
OEqJEzYWNWeDI3oUN3Vliok2NUiEcTl6ZxM2SFIiUodxQoN4aTpjhyZJckIWVzkagUIjVzWJdlVa\
MxkYJCkYNzUxeVUpI3h2OhkhWnMiQldCOSRCaDJnUXohJHlpGkqBSGc5R4UZc0oReWmCF1FTU1qE\
YooTKRcnclYjMUQaITFJJWeHimI0SBN1Y4hEJ1o2dlVGFkdCQjpIhRpoZVUleRREUUNzMSp4hlGG\
EhJFOTRRczkhMoJkhDgaJ4qIV0FIiBI2QnEkZFdHWXGJgxY2UnR1UVc1VkpyaUI2JngWaVE6NWFk\
U4cRhnKIISJVFWNxFDMZRFiIeViBWIODMhQmWXkadxSESERBN0iDgSI5aoUVIyFiZCFSY0h1M1hl\
aTmJFyN5RGl1dlR6NGOHIYpTiBRnhFcUEXFVGUJqaDQxKEQTR1eDKSMoZRkZhGMmY3MXemd1GlVk\
FYJoeUI3hRIWIShDghVJNxY1JVlpaVEmZkdCMXh3RkqBFGRyKnc2KShzI1oxUXVoFXYaIkpaimI2\
cTI1JDVCWigjYUN6VTJEQxOIdSMTNWUXEUdYNDUWJlNxI2oWZhoxhRl2JDNkZmpYc0cSSoF0OTV4\
KTN0c3JUYmNmOVKDJjF0Zxp0VhNXZEVhghZ0SIOBKDFjY1RHImgWh4dkglpqVyp2V3I0VzVWZGpI\
FhpJSTEZNUJqQnZqMhJhSSY6iDpaJWdZaGU2MzY1g2hUhSqBVViKdRJKN4GCaHERJodFF2oWghNW\
YmWESHhkRYFHV1YohRkmNyN2hFZVSSqJFlR6U1dWcYSKaDcZNUZWYjJDY0F5VyJnRlNmNCYSRomF\
GiN5QzMYcyg3KoZVFEFaFjUUUVJKKGIYV2lnRzU2gjJ0J2WJQkFINBdxNUiGhGRZEXF2hlMqYnZJ\
MzgWgzJJEjY6NSJnGkNkaSRGQjJZcVhxilpaWGE5VGNpKHJVIWRlakFxGDRxEzU0F0c4KlR2R0FZ\
GEZpFWcWRBkyRVE6GmFFZnlqKjSDgSJVZVpDE0U3UWY4NnZBFSl2IzZ4emQjJoVqWHQxMyZWGhmB\
ESM3ikIYU3J2GSEWQhlYMyZWOoR0iBh6Jzg6dygTGCZKRIZFY3lIh1J1cnVpVRZFJ2FIhXdThElH\
c0ckcTkkgXc1RyYVhykihkcoYXVogiNmU0ZZN4SHdyZEaXiEE1lDeXQ3clM3EyVaNmGIMkFxIydF\
Q3SJEjQhZUN4dVVkU3ZXKhNIFmUWSTeHUnUVUyFFM0eGZzlYQVFHNHGEWYZhIhEYgzcXKYEnF2RW\
EhZHODclMkGCVYR2MYlyUyhmJGVVR3lFijk6EhQiOXpDSUaDJWl4ZYJiUSoZKkJIihQzdUJHU1iG\
MYVKFEpnM0FieRFGhFdxQ0WGNUJnVlVkJCl6OBSKY3JTJFqJgYp1eEqEeWVzZScadUhHJmY2Shgi\
E4ZDFSkaV0VpFmUzN0VBEjFlYjJ6FCVYiVoxhUQlR4Imh0kYMioxFnR6SFcXalcjFxUSakMSiVMy\
KVMmGSc2hmZqNSgxh2hTioJJRSY6ZCNaIoEnZxdjeXYoeUVWRUYkNzQ6EnlYg0Zjh0E6akRUZjR2\
QWcTcReDWEk1M3UZFjdlRmlSWSkkaUEmh3FjUiE2WScRdlJZNXJWSkRqdmJ6EolWOBRWQ2GCUjZq\
GlZqYnmBaiMihEd3KmFZN0RoESMxVkFJWTcySWkTeUohZTYSJxFliEWKZHoVMzh4d0VTRCZXRnJZ\
hEZhFGkWYmeDdSZ3Mhc4YyQmiiZFgRSDFjmKUlhpVlN5coFqOikTcngSUYJyFTKCNGhmKkoXhnUq\
FYczImEoFnM2U1pZRydjRiOCaRE5EjqBiRpmiTkSQ0Z5WEJjglNBcRIqdyMpNnIoSjJiGBEpEmY6\
WSIYRFpJITVxUUWHJVhkUoRFVToVWnkqOYdKN1MZKYVpNGFqNndnYYYZR2eBJGpiJXo2dGiBg1lj\
FXpIeooRZVVDdYkWWXU0GYd0F1pBEYF5RFYZN0JKdmcyR4eJYYFSSTJkRVNXhmdqgRh3IhgUJGdX\
Uyd3SScXEjiFhyVXeiZkQkEhelRIghdjijMaclRhOYp0QiFWQydBhYZVR3FEZTNiYomBRBlXdGJ5\
YzdmFjKDhDmFQYiGhIESQXhlEldIhyEoFIg6IWRTJidhWjVDaXGEVmFyiXlGGXURcohIN0JiVxQm\
iTc0GoUTdTVmaSQViIJKgTMSgnRiJ2g4OXJ4dDFhU3N2WhcoOmVRFYURVyNlUWJHF2MXU2MWQjeG\
FkWBiEJqVzgUYXg0ZXMXFYI4ckI6Y0cXRzZ4cUcnd4hKh1EoOmE3h1ZKJCQYQmZKiiOCelVzKWUz\
ExpCg4IUYXM0Q2l6V1EmeEg2GTFEJFQzEiJnY0hISid1RVR2EnGKQUYSVkE1IiNoISQXU0EpURKI\
dioxJhg4WXFoNnoRI0ozhSFUISoUWhWDFIoRI0pEVHhoY0M2aDcnEjIpUWZnITFjcmNZIimDNBEY\
OHFThjQzYSFkImI5g2kmJUYzWGeBYYQmKmE1NhRjhUVqdTI5EygSSXeCdmFlczlWhImDKEgViDE6\
ZBZHGVGEc3OIWXGIaUgRQWNUSTQSeTJahXkodUU6ZEJqSVJXQiGIRzMyYVFpFoJnQ4Q4c1ZZhBFl\
hXeFMRF5FDYSeoURZYgoZzFlhWEqQjIXWBpZWFUqVjJEgjFjESYyGHdnSjNkdYloNCSIcUUnISQY\
cXEUYnMUQ4pHSUd2g2Z3aDllFTZEQUlmQ1g6eFNKEzhXOnJzOTpHNkITaBaBhUcpRFQXEiM5FxmG\
FVMXZBJFaWcjOXF2OCKCgiRYiDVKZ3gRIXVmNXoSaSeEEYRjU4OIckFhd3g2iScnRSNTWEQjZoFZ\
amh0ZipyRRZUWGRoEYI2gTlYZ0WDWIJSR4JHWRVkWhF2ZWeCaYQkg4pXU2RGNjoyNjUxSjSFQhhU\
Q4NFGXVnVCVaRmqEeVY4WoJVZDUnI2ZhIzh4SIQ4JYpBJ1qHFmlZejR3EiOFiWdlcSZlJElTZ1oU\
E1gXFnNIRWoaQmU6dXNjhVeHQYE0czaGJlOFYRZaaHlhh2koRDpqc0aGiIkhY2QWOWooMjhjFBhH\
IxdiVRJ3Y3J4WhaHZFUjgUmKUUF2QkMhaYmEOjVxg2Q4Kko1ZHVVOjl1JmaIYVpTNWQ6UWdyV1JT\
JYZUWoIXdjclQ4WKUiODF0RHUTUYOYcoKSFJhRk3WFhJJBImWiIniCk5iXp6JhFHc2GGEShSKTly\
WXmKKhdCYzhEhUVqUUdhQYFEaVN2RYFnOWZzaDgjQWNygVlkdkpaQjVZV4dFdkgzOmomN4VzVUaK\
Y2o3dRdxRGUxaUQpRIkXVVpTU0FJVFRVekKHaTM0EWlCVFNUV3VBOhNRZjdJiHOIQnh0dBE0N2F0\
Q1JZVTeBKDlEJIU0gmFzZUaBejo0hDNkNEVDVUYyRhdkZSZGJGYldHZBF3VyQjV2SWd1FTGCVUhE\
hlhxVFkUdzNqGRkoU5piVTVkhBVBNYqCMWR1F3kpeopJZGgzgjdjiBOEFEFKeTREehIpalmKWWeG\
RilyYVmBU4MoVCZHijaHOiExNGoqVClFcWhFaneGFXcTIzR6ehFyOhOEUndDVEpxdkaKMVRmEmI4\
RxeFZVhmKXc0RmQphllGd4EzR0h6N0iChHZFRBQ2KYRaGUYnQWJ4OUU0E3QmJShoQRVTVER6GHNG\
JmV6URRVZGo2SUlDU0k3KWo0YkIWeiQxKCk0Khl4RlY3UYdBEyVVVVEViniJiVmFKjh4E2RVKllm\
eCQjSkg1JVaCaIYoJlgoZ2JFZyQSFzR6MiFXIol6dilDZVY1VUUmGGoZcRZoZnIpRGMXNjUWRVlJ\
OHRCiiMkJDNSWFF4URg4SSkaKFZVdnchFUhVURYXamJ5VBZ2JIWDEyp5KEgyIYmKZTgaRVRYJVg4\
iid6ilWCWHJ5UnImUTImUzN2gUZoc4oXVzGIFSiDiHqGZ0J5eTM2YkZkShNnWEM2aXQhFjN4dIoZ\
c3ERVHdxSnElERgzFjWBGCcSZolyVTInVzWFVxmDYiIqV4Y6QTN2U0goMklEiogXIVohRBFUhEQh\
JDQaRlhIIheCM4VKZHIYUYlxNWZiQyZXgWEVZTViVYU1GhIhMlhCGFhZWiE6gkGEdYMjRhRHJmco\
ZhE5dGdINWVKemoohTETFHMSQzRUWSSFNjqFVVlTE4KDilUzEUFTV3ljJ3N2M4pXGTFpZic3NTQS\
hnchE4MWdSQkZklhVzooN4p1VHopg3FIVEWEWCVJR2kaRYgkiUgoOINGMYREUkpnejM5WhVCNkqI\
cSeKZndYhzQmhUl6RENWOiljZjcncURGZVZ3h1NyIhVEJDl1VzJSVWEWI4hmZSF6KSEmd0MmR2Ei\
Z1hGGXlGSmkTQ2NRiUc4IWGDNhdDdjRaZTgzKncRGiJoYjRpY0NYIiqCGIRjIkp4UTGBehEWdDgn\
UmR6VBRqiEohQ3g3MiIyMoZWQoUVgkKIaWZlNkpFMjpaNSYpFYhTVSNzOHYXdRkmI0pVIYooilpR\
OCJydkaCZkQpVVRjRENxFHgiKYInYxQ2ZykYZINiQRKEQVd2RXYzeYgpgShJR0hEcYpkVil2cyJG\
coRhd4GFNXkUiomGNVmJRGhHViQmRFUjQYkjRYNoUomKZjESc3cVZSM3enqBOoM5dIE6KlpUWkQl\
aSImIiRHESUneGFREYVVEVmHGlgSajE0UmEzdDY5Z1RxiHZ0gWVXdoFjgxWKd3JTFWMpSTGGOlEo\
cXl1E1JhcmF6UmUzUhUpFVZRJVIZUxdWaio2OkknhVkTZCo2eBFRckhGYVZBYxaCUWeHJRZ3g4Ul\
KRmKNSlCUkJGh2VhiDozeYFCh0YxF3IhRHhJMlNxQSI4c2EpESZ1YxNSZiZYJ2mDiENyIoKEIidi\
UlRqWCYxOHU4SiKEGBFIVygaeYUmURkkYShiUiVJRySEFRkYSRQoFllXKBFmEjcUKFN2JWl5QzdY\
M4kRamNndlp3IWSGhxdGg4JCc0ETeGlHemUVExcpGYeCd0IiQmEoOIYxeWVjcllROnmKR4WJWYEk\
F4gaOkU5KDp5OFFKgiMlh4QpSDNCFGZqOBQyVlF0aoSGQYRDVEo1ZzdjhkdkeDQidBNBNHkZhVQ1\
V0gadhYmVxQqYjVYhxQkYlMhE1kXMmFRh1lENicaGVg1dnUqg3RXKCRoVhkoM2pCMyITinQoincm\
N4qKgxhnV3RlSWllRUKDhWMydjYmgxpmWigmIlSBOVhiJYeDU4aBNFIYU4RqRyRpY0hHEUl5glll\
QlkxghYVVWZjWDVncUkSeDJIKUE1hXZCVyZXcYhVGFJyNRdRRjVTZYgzNydpQiFoKhNqdCSHJSg2\
GXJxhHQhQ4NSZiMTYkFZNXhGGYdodFoaI0cSSnQ2RzaIIxElZYEZeSZGI0ohQzRiSRRKOkVaQUVZ\
RTIqWFKFFkJSSHVSE2M6FWFZRVQ6gUllYyR0YxZEEnqBMUJYOBRKeDVYGUR6dRdxZVRjc3Zkc1kT\
Q1FIJoZ5RRMqY1MUaRMxShUyREZ1YyFoGmpFhBJjinhRVGZiZzhFFEU6hoMxhEhXYnczengWJFJy\
KkZJUnc6d0EhFxGDQmknM4cSFYpoMiQoFhdDYSEVGGRCaCWJFoKKI0lERCE1d2IRURd0NTEiVod2\
MxRkgoiFaVp1hmgSgXdCSVN0YicoakRYGnpVhHFkMyNyGRGHiRlaKHeDiHEVOFUVF2UTGDEqaYMq\
UTFqcxRUVRkkYUGKInMxgnYlEXWDOnhXamZBGiVkF2hDczpSg3MmMXYjFDFhZTNYNBoycmgZEVcT\
JipmiHUngSJJZCoyhxcShIE3FBdiOGkqOhM2OYchFxiISoQpJCp4UndpYVh6M2JFOlRZgVJGWicT\
ShlVgUVJc3E2ZlQYKBQaSWQoaEFJMlFSKWdkdDM0R1oTESRoUYJFh4NnhzkVSVlDhFp1gUY0YkYY\
OUJkgRpjZoIUVlRkGVdhaFY2FHZaE4kxgUNhRCZKEUdYIYpGVWFFhWNVVopyKoYnFFJmWiZygjmC\
QXeJF1pHaYJidWJBUiREE2FKFDUYFCJnYYRKNhN0U4hHODkkJCIzeYdyQSd0Shc2IkMahGhZenly\
E0QRSFQxJFMYN1NxZxMyQRNFYXmDU4pEFImHRiVJMYE1MiZGQSR1WiYZORZ2chRYhUcpVnQyehp1\
gTFiR0dyijQUSCc3FiQXRjIYWlNoGkklcoY5J2gUREJlWCUyUliChDEielVFihMlGGmCVjZzJkOE\
eipKGGJpSIdIhHN1IxM6YoNSJDNZNzIXhCJleXRzdzRFFllXEmiHhFpYaShaR1FahnRBh3pBg3EZ\
N2MkRFpyJkgSYoqKQSoWM4caJnSKiHFKdjNGE1MjdiRiQjlHUzg6dBFzaVZiiIkqImYVeCOJGDmB\
ZVFnZUmFEogphUdUGGFDgkQ3SXpmRBNDEkJ3ZjEWGXFxhmQSc0lFUjoqGXJxM3eHKiNUSldjQiYz\
NYpGEUI0NENXIoNyShVYZSVRKEVFERpVJRlzYmdHeTUjgoVnNlcocYoZOIZXajdphhZSZBdyFmlG\
QSVmZlqHKBUYhyUiJXg0MzRKUxE1ZIhqMWg6h4UhQmM6Jjp5NoN6OEWHZ3l2aEYXVDISElVKdiFo\
h0l1Mlk1ZUOEhWNkNiY0hGYkiWkziYZmiocodBmDGTaFOVJpUkWHWhQRgiN2hBpFIUZqRxR3dGU4\
YSgSdCQ1F4QocWJnM0EXVxI1iCGKWDVyYzg3hhohgiiBJlhKJlMZR1MWJIZqhjWDKSNmF4pIWjlR\
NXISFXl1GEllgUoRV3Y3FjlxWnKEeDRIgUcoOIZ0SRKFSUNzczM5hIdmYnljYXQzeCZZGXdoR1ZR\
MzZDeVM4Jjp3cWpzSXFJUxGDhhF0WoiDeIppSBpEeFcWNXQXN1YWVRmEWGoWRBJEQmE6iWkWQSRH\
WCNHUTdKSREmOFR2RVgYRnopZFOFZxQWGYdyF0Z5GGlVGBlniYViQjWCOYJkVWdjdYI3R2YReFRF\
REpianl0JGM6KDeDgXlGgkMnNxUzdlpzMoM5V0FUiIqIOVqFcWYnaYQVQXZZFlVkNihkRINRiCJK\
iipaM2dHEmRTcWRSUiJlMnh3eBhYORZFiSokVBI5ZyQlFFh5dWM2ihmIhUc5KhMpgSZ6UShINGoa\
hFN2MjhHJ3lmRhlYGBZFaXU1QSJCdlojGjc4NxZzJ4ghSEaEJkKHGTM4EWkRg3EZQjWKeXpEMoMU\
JWFnWidxRTU6iSRDMmJyg0IZiHdyQVFzZEpoWFpIEVg1I3mEMUZDgogmJxUleSiHSRVZVGMjcVdm\
Mkh4chQYJnlFWXMYdhlUamIRNBiEdmdlFFSCRnkoIyh2WCQhGTeBWXVTNSklRIeDaSM5RWJ4YSka\
OhhhRic2IiN0WSoaRTEpFWopQkFTeGWGE4IkhmZVMxU4IkQVOhEUU4ZlRCRWGoGIF2JUFIhiakcX\
eXJ5aWZZJUopV3mIcVVIYXglZWEygWlaRSqCF0hyGYNzNXFJEkF6YSZYSnqCMhWKIXRGEzYhhFcR\
eSU5ikUaYTlmRFJpQXNhQTZjVWQnR3ZpdXFzV1NVZiRzZxFKdjIpZnqFJBQnNDUqQXVYQxVVSDmC\
MhNkFWciKTRSV2ZxWWlkSkhYI3ZCU3cVNGVmgohzUnhkJWV5amEaVlNSUhpnMXEZamFzEjiFJBoS\
RkZlKlEWaYEicxRkM4F3VWMZUicVhiNIhBJROlgRJSdxSiUnN3V5NmFEM0dDZGUXZoiEgXR4FTqE\
gVRHh4VaJSd6Fyh2ZIkTRUk2akFaiVURY2knUog1d1JGhIWDQoQjIXE0Z2d0Wkd1JIlhNFk4VSNp\
JFp0UxNXOXEZKIGHh0MoGoRKGWiHR1EWYhoSJHc2WVlZIWVnYkR5OGZ2cSI2WIcidXg4Y4VDZXkX\
SUgTVGJmRlllQihaSFQpVVMldxEkGndRZUQYQRd4eiNoinZHKjRVU2MiFUopNmmKYxlRKYiIgoaG\
SIEiVkNTVUdURGR1RHZHiGZkV3aEc4MaIodDehl4YionZURFZHpUNkYRdBcVIxkWKCRXdVdWeBMU\
MiQlg0VXYhmCUXNSVhdzeVk2NGcyeGZ1SDE0MVUYenZRNoc0MlljhGJxFSlmVTZEdCZjNWEpWWRk\
OhJ3QSd6gUc4VlVFiBWBJXMyeIcVM3pRg0ETM3EpY2ZUWhRFUzOGaSODM3hJNEiHMjMhdXGBIzYk\
KEUUV1FIZ3GJUWNKZXZlcypaFGURRkRSRWE4aVQlgSQjSTQjIRkxchU4RCppFmpSUVl6UTUVeBZ5\
JUcjZhFRRXaHc4NjYYmKaUOKYUlVSlIThzgZKBJ6WocSNDIxRoMlJCiEKYo5Y0ZFURIpOkIxGVFY\
gTdBZ1R4hkhaRoE4GYNzYSJIiEo1WCkyJEFXUTg1aIWJKIKBN3SFJzpiKSZ0gkV2GGYiOHcYQoon\
eHhHKXkignUzeEqDI3NVJmd1dldHGHSFYmInIWc1MWdpVylKRXpFZBolMzYZMYpSNjqDRFcUgxkh\
FWpGZTFihWRFYRhhWUkzWiNGZEF1goiKclUaIVV4Nhh1WGh6eBE4GBQhKUIWeilZFiM2eEpjZnI4\
FlJCh2FBQilEQYoXWSQqdnNRSiURUlZkU1ZBURdEZSYXETZ1EipGaBERYhkpRBGEIhZ1eoNDJGgq\
VIcYWBVYZlVjaBEoinmKVXEiGjVzhHRaWHl4QxFqYSFRKhYSIodjNWGEUiUqQikxaBF3WYdmGRh2\
JlJSSjF1GkJTNVJVN0WHREKCRlqDYzkXGjg3V0JqGCl2KTYyFEonSokqUTNReIGCeVRhQmI1GoJE\
NGpDQoKBMRNCZWQ6VVolcoqIEYEyZSiKQiJjUoc1EnWHQ3MjEmR2IxWGhFFDGIUTRRM6hiY6FCKD\
IoJSVzFjSipHclY3KoYxZ0dRZjQXR1RHJ4pqVjknZFZDJkRFVRWJE2YXgkF1h4GHdVRBEjpSGYYn\
QlpJamJSZBaFQShUSTNiFYojRBpkeoJ3Y0YkhDRahCIzSnojalMpVVRHJ1RKh3NhITEhJyc6iiQ6\
FigVcVdaWWQSiWg1UTpHFXhaMmhSRRMjQhFZdWpHNSYxh4KJgxVxaUZ4ajk1UnRyWiVHSGZkSmR1\
VzlzSEV2IUgRemZCR0RIOIpGaTeDiSVWREJRg2gWgRpRI1l5KjaGcipSc3ZKYWEWJ4p4iYlTFomB\
ZURaZEqCMxNjhCojgYRzIylkQXpEOSk6FmkSSoMyikKFGhklJHJ4NFoiNRcZNCoZY4dyOCQpNEpp\
VxRVIVpyYoeJOTZ1MmRDNoZiVFF6ZGF1cYNINliJFEVWZFUVZ1lkZkVhSnkYaSgUR3WGeCNXQTRF\
aYZIWDgZg3JEWBVHFFgUIWEWWkk0hTkRNUNSeBhjYzN3FoVXcxhhRilxZISIQ1eCQRYVeIZxMVFz\
h4FjdEFoVUIXIhNnhxpxNIGGYRVZZhaGOEZmhFaDKkVVhDERehlXE2g2I0REWiWHcUdYZ4oYITKG\
iEI2eURadVVHWDojdImEQhN1ZXQaGkc2KoEkVThGVYlnN4d0d0FiZHeEglJ2iTk5goqBGROEKDpj\
WGJ2iFN3U2dGKVo4cRNqQjpGEoh3Z2RaaCZlNTlCg4QWWIpaVGcYeiOJUnYmhIgSNDVJGCZ1OFRp\
I1dYEzgUOGqBNVYndmVoFBqCShZnEzWIQSViJCZyOFZIGiF4hSZmQlU4OXpDhnl1UnFCeXgjI2kh\
ZyE6QhM3ZSZRYnQXElOFZyaJJTp2aIFiWTYyFDMadGQTiDUodDNlJXNmMmRnVzmCRWGIc2ZheWOI\
YiR3Q2IWYVYyIjZmKFdHiERUUSpUSjZ6ehoWSFVyaRVyU1JCE4RlOGODJIJDcShYhlhDJkVBVjmH\
IjOBhIQzZTFmI0k1hYJ2cVp0UlcYaGpDYTeCNkZ1NFF0ZUNRSVFRhhE5FVYTNWoqhjOBihc2VFoV\
aScmKDqENSM2KDZ3ijSCR3VDVGVnWDl4Ukp6EodWGioXVid2RYoiaXY1dVNWY3pFNjiGEjYidxRq\
FUOCGBNpMTE1eYRZh4UpNDZ4F2GJFYlpOUdkFoKEYTUhMSY6OWMZIWR3SnNBiEY2iISJYyqEZXhn\
GmGJJSZlZ1YlKBRkURlKZWhkilGGeCWBaVlHN2WEKopHYicyFxlhilpGEUR0JxF6N1OCU1kzhXkY\
aTZndXcnJoYzhohoSlJDSjkpWYOHZGUiholZGURzglcjeDInRjFmYUljRVQmhho1iIMqd2U0eno2\
J4paFSRiaUhlGndIg0MWJiYSN1KGGjl2akdSOClnIzRoE4VDE0FVQhpxczOKQVgTZmdRNUlkOBFV\
gSlYKnd0aTlHMVgZFilKNnomVRZacmMxdhKDZXRxakdzRBREZ4hFdWUlaEVjUhU3GSdYYYUaIRkY\
R1h2iBRUgoFEI1phdWZBdnQxNmiCQhpUVFgoSIGKUlllcxo2dUmBOIYaRXpYSUJagxg1alM0cVY0\
c1ZGFmQnZih4KTpZahJIQ1hYWFJliDFFRWISKhYzSHpYNBNHNkIUKkd6WBNGI3F6hnhEFoRiJUc3\
ZipBKVFIN1FJYiN5IylmFjNEJ3YyVlYYcjgkMUOCalYpWRMRRGRTJWiFURFldHJkVhEyiTRGQWhW\
iTeBWGRWQSg3EmN0hyFYSSMRJVhTYlpHVRMWWng3FjoYOTZ6WUqJRmRmiCNENTZ0OXcSglkWdnOG\
ekYkMYgaKRJFdzpXelZKJVWKKjlFcWNHMThEhzkiMTI4GBaFg0oliokRMXdHKVZRY1FSdBYZd1cY\
RYlxiiJKcUMZNCdzMmkZdIQ6Q3kadhQhdSh4KGd2cylxFVhFhIVhcRF4VmaGcUdWJCp3RjVHRTUo\
JCdVWmhyFBg4UkiHJIcygWQzOnI2aCJpQmcnJFInExIpYUpSdlp1NkIiF2dHaRUhcidIZiWCOjiG\
ZIE6UmhpKmJ1iChShIF4FmUkY3ohdxRyUhhXhFYScSWHWkdVgiMaSIiHYhc3ETNGdDMpE4l1EXho\
giYiQVIVgyIoGWhKREhUemdodFEqWHoWGUV1UnVIgWR2hVaBcliHSXF0hmdRKBokcxd3NDR6N2h1\
WHZ6NGUagSExeSNKiTFpYxGDckZ5KRcld0lpIiF1iXo5JUk4JDJXQWlZGCNJYhFjVjNkUTJkaUd0\
SBJKRlJTERp1SkqFKGojZxMWR0ZyQ2JSVYVRQ0VTRmeBExRjKEeDSleGF4NCMTlBZUFCGSNyIVYz\
iBg5cjFWEoIneBEyVYURIkeHRVqBQ4opJzQzM1Q1E4h6KDiCEnp1UREhgxJlY2JVM1QyKjVTJCZB\
aSRDiklxFSphZnVScjQjeDEXZkQoJlNziSEpJTMyd0c5dSd2WRpEMigndoNUiIhXESknJheHOTIY\
hkpWJSh4MkIXiDN4OmZSWiJ4IygnSRpXJTMnU1JEJIk5d0k6ITZlYVF4eRFEdWJ4VzY3MnISKnMR\
WCNoKBk3hDFYE3EmWjYShHpnMRkUd3OFIYoiEionIRMaiEhhORc1EyE3cRNJRWGHRXp5EkeCgUIj\
OUNIczhVM2l3GkcqJhEocXY5FVkXJzNpKFYjViYaQkUkZxdROTpadmkoJnOGZ2lYZSpVElY1MXpl\
GRMoRIo2QWUZOjMWdSaKYiRDcVUhSClyJGgjcipyQURyOTQmGiI5amQXQxpCVEFXWSEySWZ2JkUS\
UTlpKGN5FhNnGRGEckRicUdjhhknaEF4ZGRaVjg5YidhGmVGFBgXhIknaXN2QiM1STkxQjQqVRSF\
aDIUZUU2YXlId0gaOUEXNVI6E0UjinIiRmIxYjKDeEhEGUZUSCUSGmMVSVoTUykqZ1iCNYeCFEg4\
ZFGEaHp1gnUneCIYWWZ3SESGV2lTJyczYmJKgkFZJBOEgYdpiWIaNhWIdIWBFGI6VoOIIYIhGHI5\
EVoXMmMpahSEFElJaTMjRWZ6EzeFUndJViYocjRiVUN3eHWCZHh0ZUQkiGFGaoiFgYpkdXWCaYkl\
ZkkYRkFnc0GEMYdqOmlDQXVZahdxiXchUhhBMWUVNTNFQkRyg0EUM1VnFXZSJRgoRxllRmpjYmlI\
dVaKQSVUFEVzIhdxNnGKR0mIRRl6WVlkiRR2GYkhKiFKh4kxSGRVZRkTYSkaQYISGDgmZiJoNkhU\
KkeJMoZRKkNFaVUjhRNagkFDciKIQihjdHMlVzUWNjZFVWcygyOEdVk0SidoQiQUcoZFg0YmZDqI\
KYpoFyNVZkQoRRp5Z3J4eGl3eERpUyQRKTlIVhYUeCZqV3FqZ3kjOTpWioZJOUFHYVozg2c2U4Qz\
ajYVJ0kpFXFxVHJ1NnMlZEI1ejF4MXM3ZkkzWnRYhGUmZoMzVXlUdnGDehlVOhdGgjYVWkdEOkha\
VEhBRSd0hDVCZxoiOBqGSBkmJiRHSDKDOYNoVUQ0YiQnVTpoRmUYhylzdFdpiERoMmV4JzRhg0Qa\
dXZoN4ZoYYc4hEQhEoEoaCkhGlNyalUUFmkTIliKVTZqaUODJSl4NidHRjdGVWY6YloTGWmIKBaB\
aihKSnl4RVgnUnIVUhMnVXkYViJEKFozgSYZM4KKh2VpFykxNnWBQydzSSgjKHERR4dXOChWJTSJ\
h0U0ExYacld1VxpiOBkXUYYyZ1cjGhdaGWEScYcpM1YodlIadYWBE0lqEWJnhGo3eWRFOGRlE4c6\
hGiIhyqBZ4kYRkkhM0RxakaEJ4aEQ4hpOTFnJjKCNzdkJSMkN2ModyiJVxWCUoFiGTJnZnRyWmNa\
dzdUSDlZSmRad4RlJnh0elMYZhY0KWIhdTJJFidpdWR3hHVpN2h3NlRWaChEelMVaURhchFmKGaC\
ElUVUmMlZhpHKYMiMWdGRDqJMzUlGGZHJodmiYJ4SDVqQWchOWRyd0MWZmcnimqHYnknY1h0QUmK\
Y4oyFkJYR2dKRzpXGBaEM3qChnknMleEUnqGFjZnOhkTd4okNkMUZVmGOFhjJmc1STcxYnFoJXE0\
UlNaN1o0J3dWcYU2elRqUTRUNRhBZTRXRTqFIzl0QjEhZ4NCWBSChjModlOCJ2SGd4kkgWhIKVMV\
VmYnWIZIclcaURoyYXFzRFeDWkMWd0ckOjl6hCpJiDYReURFd4c6JRU5MROBUXgXJUZ4Y0KBRCcZ\
KHdhJEFEJmN6hhMTQVkRUzV2V2l0UYoTR2QUdDERZ0R0GHo1MlJlFGMkR1aGExJqY4ZGhmM5ZiR6\
QzGKaVIkimcVSmdnR1dTdXQxZYYUQ1MZRTkkE0ppYXVmV0QWViEWSoYRQmNTJ4VYFoYURBqIdjN0\
GikmZIQRQnU0MzNkaIdjGDYRhzF1hRqCaCV1SDNDRGpBiGlHNEZEYlZkM3VnQ2NjKoY3E1YjZYaD\
YoJlGDcxQnpaFiVqiocVRCRSIYqBJCVFg1MaF2NHGTpUZyQSd2NFQxhVdRh6MyFkEUNDglpnSkdV\
dFYXNVVniUImMjg2OIRKMViGdDk4M1VKJ1pWdBh4JhMkUxRFhUqGOCWGQohHhEFIMUJEETMmGXYa\
dUVSeTloOCY4ESJkdxWHhnh0QWpEh1lzFREZdHNodEaKV3kkgnmKeSo3gSRFRHSFiFZKgxRJORpC\
NRlHWTo5EkmBMkZBcyUXVoVjNoc0UidHGVJiYTmHRhJmhDlRRnYyKYJZdoOGgYUlZUoneHdZdoRy\
VUYaE1Q3WYZpNiYyWVcmZnpmQRWJMhVWUmdhgmVyJ2VjYicxWDoiaGQ3GmVYdzhXVnYiYlYyZzkz\
SmpHdGM0OIdpJUglVxd6SjZFg2FhZyOKKnpaQnYTJYV4FVpSMoFZRFNjZiFRZoYkZhF2coRpJRZY\
FzhDFxMXE0cXUWE0ETdGdnpxMWqCYXNUaYgYUzgxN1GHchdDNTQVeDQ6FXgiZyEzFxd3GDonMXYU\
VoZEdhcjNUNCVoI3SjpkJDdkOIZIajFyeIUXgUgnencUhSMoUmElQ0dWQXJ4ZIYWKVQiRCWGRDch\
hERZVjMTWBWJGYQ4MSGFcSIVdyJTFERhg2USI2YXcRoYdhI5N0VGQmYZdENKYWgVMRqGVIo5hjkz\
hydCIUM6UxJ4KVlzNSZEFxRScxgTaEVmOjEzhDgmd4I2ERYpKVlERnUzNCQVdSlBVmUldWEUSYgy\
GYQzNzg4KII0eENWiEQ4SmJ1QnNpFyQ1aGJXajlYNTlSQxJiWjGHOCohhVeHVUWBdGhkSWgnhIMW\
WHYhShkVEogjSTlHGTIXhEcmN4mIiUZhh4aBZigjhGcSGCJxWEl0UWY4JnE6RzVSNmJyImFqgkUX\
USdyOEIpFhNDUyElGIE0hEdBc2pBdkQlVlVoMUl5ijaDI3VENHZDgnGIMohmeCE6ISZxh2ZmEVh1\
EyRnhHE3EkhZQyJWhzNhhWknaVmFNVR5NSp2R4mFJnSJE1k3YVpjc4RjIzZ6ancxFVMoZBpqVDhJ\
RRUaiiIWRRNUQYgVeDREiilnh0RTRypnKESCZXoVUUokanF3VGF6QXQaJVY6FBOJiCE3MlIWRBdm\
eVESWDRoRSlzGil4hRFIITkxiFOHVSlXNlFzGHZxGkk4YxMVKIIaEXIoKjVVRUgUESRHgmVGg4MR\
ZIk1dmRmEjN5UYhqhIg4ZHkYQWVkNkEnFBF0SiopdypSY1MyUkFIYiMWcSYUaGdFJnFHeIYxeHJ6\
EzEhGiEhNkZEhmRBeEJoIhmIMkUqWoQ4OWoxh1aFJIk4aRqDhGZUJ3RGRhY6I3UUN1l0GYKFFCcm\
ZXiBiIcROoZyVDJEKjk4hGlRcxEYIXhaUnk2hkh1GjZZEkWIcxM3YmYxcWcZODkxh2U6N3cqdzVk\
WFhXQSNEGTIZFmhlJUZYF4cVNWpUETcyVIRoI1I4EiSIExk0ZVZCEhkaJBpiaDiFWSF4ZDYnFXEU\
WnpjRIdheWg0iDREdjFHeDVqhiISGoM6OWFhiYNxGmN4FihJGVaHd1pEhmQUhIN0goJ4c1aBGXWK\
c0IVYRUaERZqeXlVZ3UoR3k5ZGpHJoJnQ1MUI0eGOHokVRhEdjphIlYzYVdGhCN6Y1lCWlUyiWV2\
YUo5SDdTgml2U1h4SXpHGTIYZol3SSNWF0KHSCMjWjglUjgzQVWCEWkVIyNGh4RWRkIigVNHMjhj\
M3aCUnZVaDg0R2cSR0FBIyWBaBhBV3JCeSgSilSJIyd4NzQac1R2hXJ6KRoZIjqDKElSIoJaKDZS\
FFkpNIYkRjQpGkNDgUlxRRNEFCN5IYQTGHUiYlhChTWKhBWGN2ElenUYKjhoglZYQnhigxVaIxpp\
VYpJZCaFZ1RZgSpHhVdlNUcaIhM6MxRyJ3qHSTmBFDKBI3ERGGYRchWDMyhycjQ1EmEVVYqDEiMW\
I0l0JYRhckFnEzMSgRZWc4VkcXI0U3YYJmJ3aCRWJYhIMRQ2FBcSZnI3cxVqdXEWWDYyOoNCaihy\
FnkjExlnJBp4iWUVQ2Q0WlEnM0OIY2eHRCoTMkRiF4c3SBJThoFUKHRmQ1ZEKhUpgmNEgnV0EUMR\
eDRyFnmGFXMYeSciFxo3UyU4NkoSWFomRlEziHGCalhHZkVTYVhmJlojUYhTKCNDJ4hVUYIzIRQq\
aUUzeiIjNnFXNiYxFoOCImiEJkRSQYFKKhM0RnlRJRQUOnFHhmM5WmJDJkcjMUpCeIdXFSqKdlqD\
ExdGSBdGIVMmRoOCEhQVYXF1WRVRV0omh3NmGFdGRmpYRlZBZ3Q5ZlYkFlqKZyExJWJpEzdpgmlT\
ikOIV3J5OohWIYGEM2Z1Uyp5I4dkQ0YaYYM5FBpnR1WHd0JBM2gXgXqGIzUmh3VDRiFDMkJWhxGH\
JYFqUWJKE4gnGVV2FFcqVEhjMlhqhyhTUypadIGKY4lJKUNaFTJEeHOGg0VREUqFVBdSNGlBZ1hy\
VmoxZBN2FVIahGaFIkpiU0SCJmQ0M0YzV1gpaROBcneERkc4d2VTZSOIaEcRFBNXYnVKeWM2UjWH\
OVdVh3d4cmYmWiF4YWhKQlYxU4oWM0VZUWN5ZDcqJWlYSClpIYlCV1RyWXp5KlRCelUlcxpkc4U2\
ZkIWEjdYJIQxMzlYJjh1GSljMRdWcSYaYlE3RlUlIhVaF0pyEyFjNXh0KHIqJhcVKolqQ4GEgYM5\
VHlmFDoydzJnFChzQUgVMXGDdGOIQnEqSSqEQ1UyZEFzE3oSdUWEcSUVZ0FkVDmFdFdRcoVJKoVj\
NjJCgmNyNjJJJSKDU0JlMooRWkohYSWFEyZJZWeIUmQoIWM0NnloJxQ4R3gpiWElY0QROYlDh4o0\
WnZlZoFoKHpjNTNZETVZKDpaVlKCeGo5VhVGNil6Z0F5h1V5RmonElV6JmZ2QlkhWIqJOldFRFp2\
hWJhKGQWIUJ1NllTV3UlWUJ0Z2NWdUJkSIqFhBl5MkolGUeBdhoxd1M2gidFhylhZmgnOVpCGIE5\
SIeDQiEZQ2NogTZhUYgRISY2aGEhKRGHiCVRIxgWFnkzhTdSh1JGdXiKKhZSWoQmRzKCI0IYMzJj\
MkpzZWZpdnJZYYZ2Z0IkRXVqQzU4QlE1VSU6JWQliGGIhYJYZIoigYM5M2YUGWckekppUhpBQUGD\
cXKDWjpzZjV4dWM3OCklRyKKEzJXgVqJUnc3aRY4hSkSYnE6SXciN3JBEjYTUlqGUjgZZXUxQjUT\
RxcWimJENFE4OhNHgRUiQ1UmKFVEZTpJFYhDOFpoJEN1RzN4JDNXikR2amQyIxo2RmlEhoKKdFdZ\
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\
UWZIckJXgkImSmZWRDc3NIhaSGFYZmZZemciMyRFOiJHQzkaV1k6KCNhUVJ1Q3UpJjIxVzlqFFdm\
SBc6KRVBOYNWdHZZhFU4glITFkRBZnYREmc6NlMxMTh5aGdlJ3dSeYliRBOBGTJFQhoqNYp0hnV3\
IUQyd0VWdlZiGUcyNiIXaTRyR3kzgWNKaGJZUiIYMyOIikZoNEFkI1UxQWE5ITWCKRohYnlXGYUn\
IjRhNigVd2URdTMaZyEiFTE4hydRVCEUZEhqODRaGHMWREI2KCNnFRV6NjMiMyRUcUdHhVU6eVpF\
NyRDRmoWiEJlNCMUSSglITJmKXV0FiYSVhcpJ4g3WlJHYhYhdTRBZTJnKSVqgocRJzN1Eyd3KRdE\
RRR4elIXMiaKKYo1OHFTWjoYR4dVF1YlIVqJZoM5KUlDFiUpZRdnSCc2OhkXSmqKZGhhNRkVihkX\
iGR0Q3SFNYWDGRJXg1VGOiRhdloWIWRWNUSGKGkkeGkzVBQ3RmJhQ0N3KEU6JFlGYiInIYIiY1SB\
U2ckJoJlWVo0WYZaIjNKczp5I3lSZXpJRmcahxpoJGc4IYooEnGFemc6EVOJJGdmiClTFFVjNUMW\
EiFZiYNYJyiDgXKFhnaDFTpxajZKElFZdzJlOWVzWSlmGWdGOmlBehJRGiQ3hUZZMYl6dSKKhEFE\
SFkliFcYUmgWKogVZyclWVE6VyGFFCFnh1aJGlkzJWMlFxNjgkiJJ1kVaYlWJhVSUkqKQlQiQRaK\
RlOJNBOFJipxMUMkKlpig2UiF0ExdigmZ0gyREGCeiZTRToUdomGOjFhgTcREWchWTgpRmmIY3Vz\
ejQValUSUjqGdxMkSidIUkVnQ1kSVTQiWDZXOHJHNhlFKmpKWnIzFWKJikVmOjJ4SjMqhVoVilRx\
dCg0FnZYihkSYVMjRzJkR2dIZxhpZBoSNRaFWhcTNGZkUidih4coeCRBdxiJaDZzYxVoOGcXMjN6\
IjVpEYlmNXc5hoZ2hVoqNUQySCkxKEEnNXgkF3NjQmMjalVSRUqIMVaEdUNjZnRWh2E1GWUxJ2kV\
GYKIR3JSgmIoFSkURCiFQnIxeiR6NhViWUIldBdnGXUVZWMUWUFUGYI4I1FjOTGCIRo5NzQ2RIhZ\
YlKFIzUkaEY3ZoEjMXEkQjY2KFNkhBhIiXqKExJFRDEVJzFTN1JRWEYmSYJlGUMTN3dZWmMjF4WF\
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\
WBhjKFlpQXgngRhFhWkTM1EXEXhVilOHMWGGRFmHVCZTMTRYOSUXQTQphyQ4JBl0eWgTc5oliVY2\
I3N6VRUaJnJEElI1hTM2GjdnNCY5dRgZWHF5eDFnRYpRaRYWOINmZ0V5KUGGcRJHNjmKI1FThzlJ\
dzVlI3ODRShig4KEgkkTehZmVBV6Q4IWgnaEgVQnQ3QUN1cVRGh1VTpxSTM6EoEiMniKFFOIYXFK\
JCFJFyEzGFmJU0RBNXonQ0QTOGpmeENxiDYlSFY0inWKWFl5MydUYnhWRVNaamoiWXEaSlFTckNY\
VnZHNjoYZFNxFBlRFVd2VRWERSKEKUFyI0haNHg1JHdocnlKUiWHgWl0OTJ1clM4GYQyE1EZF3lZ\
KjQYJThWZUlGFDEVNUJnQ3Z6GkZIikg2clZWWlISYmFpahoVJ2I3OHR6ZnYlRoFVRDNxeYh3OHeK\
hjMZaWJ1QxZTREcVKjqCUUojilVCEkVoIygnUYOHZSFEciGFRCc5FBkXY3dkRnhphIhoFoIVGnUY\
Y3pjVzh2Z1pGOjiHEmNXNjNURVkahUgyN0Q5NXQzdyIhOjFTR3cmMkZ3FlRRNkQWY3QWZ1NHhSZa\
J0c1JCFYMkEaahkidGEihjKJNToaaTZHYjVoeEWJWBoSaSNJdlYhd1d5gzpxeFV2KVE5IxQxEyop\
ORERehM0VmeIQxcYhRl4WBI6RWVUMiY1Y2oUJjoTGCeKNYRJeXEpWkphVjiFYlmBiFpxgziDQRlD\
emF4RklmGYaIeVNSWYRJKEl3hYNiJYojRBEXNUgZEzk1Ood6VoY1eHqFciIqJnR3GBZTUVhJdTR0\
iiYXWjpqRjFUFFmCODRoUXE2dnd0gxl1KjU1gWRpUUJFEVN4UWJ2MUMZZSFYZyqHIxhCN3N3Q2Ep\
NhKDKSESdmNIMypygiFGRlcXMlZ1RIZ5ShpXM3WFZUF1dUcRNFNiaSJ6FBRaMiUUSkZaUjMSeWkz\
FUF2GolydipoKhMqdiaKYjopEiVWglQXOFZxdyeHioppQSNWZWU3iUoiaGOKGiIaWCGBQipSERMx\
I3M4iElCGmFXSlMSZWkockExIhFBUyk0OGVSgWcYF4N6iUI4JXY2Qzpkg2hzSSeDUnkiIipRdxpi\
V3hlWHM1hBoYU4YxSYqINnp3ZIklUzZVhDEhGVp2dloiFVpleBgpWHFBghZySWhHFoIzYjNBSjGG\
gzqEF4Z4Q0klRTVFF0ozRkJyVkSHNomCSBIZZ0VoSooUeFckUzNyGTYzdzpYJXo3ZFJEhjdqVGYa\
hydxZkJhVBY6QnJSdllyaIlIUzVJaXgWNkEkJGZUgzGKKHQRYzQqdiITNEZaFhM5KGMoJXNCcUpT\
diQ4GhQnETUzYxQ4cjI3Z2pGhGdXRRE3FWpKFokXhjYaMjk0JCd5cWV6E4gYSHoiIilIclYlWWoS\
dSJRQxZlWHNaJmJmFoYVOTdJc0USc4FJinEmFYNUSCM5ZzhChTkjEohFgYNaJhJIeYYjVhQ5RWIx\
JmKKQxYhZxVUFCJpNThKGTJyWIImgzUyOopzhhQkFYpkOIl4KDgpRlIkQ2UlSBMWaDcxJ1RaElM5\
gTKDM0I1clIjhHY3OXhaVDNpKjg4V3o3NzQ5QSFxd2diSGlDU0NRGFFBSDYnIjd0RGVaeDIWh1cp\
iWZiU0UjVVJnFheGNzlDYTlJJ2hhEncxelJ4ZWMqIROKIyJGEXY5SDlkJVozcleCKBqDihaFdSZ5\
WRR1akhjKCpkQUdFNhJCV2kkR3EoGoFlGXJxI1hVUogiRFhKhnpkZjMpFopUEookJSNqUVR6QmVm\
iEJmF2p5ETJjM0KDRBgyMlNaeSV3FBEyN1hSKoZBZGEjE3lJQ4cxgkSEUyJTildRMyoYYmlTdoVo\
IkNUY3cZdkoXKjk4F1RCE1Z5JyEnOnWJQURShkQoNUQoOEU5F2IoVSZDQlJxcmOJiSI1UlJROoQp\
GWkXSlqEMkNmIjpmJhgXVoYUNUEziVoVdHQYVRQShXphhzU3WhRZGGgnY2oWJXRlRoZXYiF0VDpx\
OicpFRpJg3kpGmJFGlRGOVdZJVUpikllh0kYGRZBaXiJSUMyRGJjGlcmaCYjEmpxZhoWJ4p3eXp0\
dIgRKVo6GDYjYzIVcimDIUYpeEcadEZ5aEU3IyRlIkRjUhNIEUdkE1pYGGYkhEcXdnJKeCcpVCqJ\
chOBeVkqeWN1cYNqJmF6YjZhJTFiFUFkGTk3gXdDFleDUyQpcoYZdnGDSUUoR1GKZjMaYUdIFhpp\
N4gzRkloV1ZRJnNzESJiWioyaYNVRxUTFkQYMkp1RHGFdlQUiIEng2ZHiFk6dYh3VGpjgRZkY2p4\
MUpaKTRDGRd0RkU6iCNDaGVneBJnFXo0VGJ6RFRzVFeEcndEiFmEaTVhgXdJUkiJJGRUaHWBiRiF\
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\
UXdXR2ZRhmd1IigSJ0E1NyFRZoNBhSFZJHRJgzo0aThpJXIjKUcyKiFXY2cTEjFyQVg0JCFBWlZT\
iEV2JTl4NyNSWCiEGVU6KjJGaXdqIXVaRUF1OHYnIWkydxdZVzp5ZYaFRopihVQ6KlpaZxpIZ3NF\
JDWDOmF4VxRTIUh0ikUxd4kxRUQmNVJ2F2MyY0eGOlJkcig2MWI0GCJpIYVSZ2hXM3NncnVJGYiG\
RyOJeTkmETITJGZkZYI0Fop4ahSDhWRigmJqKlhGRliEWVJzg1RXQzE1JHc3hjqFIzg3hHd4YRlJ\
cmchGIcqSjQzIUV3SHh4hBmCY4EqQTZoEhYSaUkmVIRYR2hJVmaEJUqHZ0USFmQ1UYGKGEpBN3OC\
hiVoMVVBgTModROHg4ZjIUMZRiiDSTSFGIN2NkYVYnMnODRRV0MWiIczMWJKIShxIoMXJyoRKTJn\
WCkhOmRJZCVlanlKR1WFMTFYUkRSYkkicWZDgyGKQ1NXRTZaeRWIaFRjZ3Q2ikZEcmNXU1JBV4oW\
OhE4iVgyYSF2GGiJehgjQRSEMWJCUUFBFGJShXiDEjRmIzpZVCdDYRl3ERcWQxZaRSp5KXp5QlFX\
J1V3OYQVcVJqJjd0iGUlIXpERkNoiFoxUjQ2dHZYWjo5GSJlEkdHJRYUQWh4hGGKKVMTdVdlFEhZ\
OIp6Q2iEJTYxOIlRJjYpaoaIgUZWKVcqekkmI2ljZYo1UlYZEoE2IUZmR0OBRCVHR2k6VokiZRYp\
YUlhMkZEZRI0FWSGgUIzdjKIIzR0Uxk5IhiJGnFxdmhRd4M0SEoXd3SJhxdJRCN0hlcYd0WIE1l5\
ijEyJmV2GIqDVoN3Y1hJKlZSJYpFNhpncUR0GUg0cjQ4SCkjUohmdicWSjNoakVUaiQihYhXNhZ1\
QnJViBN0eSMkRFIoRXEmR4cmF3E6d0loJVZnSRU5aHWJd0pnN0cVMiFBV1M3SngWQ3k1OiQpIjd6\
NlGHMyV0aRkmE4klMxckRRlnMnF3F1RieHU6aiNRUVIheoMhRXKDaIlmgnplZhSIgikkUUF4V4Va\
NmYYVzRFenF4VWZKIRpIdlYjYUZXKVZyMThVGjhKancoUlk6N2c1VGaIJyRKNFZYRHNSenZZYSU1\
OXJDd4dTJyk2Rxg3GGdZQ0MqaXlmchdkdEoyZGEkRDVxWWRlIWQYNhFnVjFYNBmDEicVISEZZjlK\
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\
EUVHJoEXdIoqI0VIYjcUGFNnFxdhIUNlejNxaUlWN4FmVjIZhEJTNEp2ajI0EoUSIyRJMzNjYYM4\
SRlEVFhEeVQpMRolSoSDIhdUhHVWhkdKKEhHiSmFaEaIgXFZInFzejpFEnFqNzMWg1khQ4NHNTk3\
VRE1eYGCckhCSSk3QTpRVnFjN1hShDMXF1JyZjmGNlZUMRZDFmIqWDmFaEoSFhg6RSVVU1EXdjdz\
KkOHIoKKaWKGRFJSVmYjNWhSRVZoFXJ6Q0paKYgWGYSIEmkhZRQxMiZZWnQ4QjdRZGJVJhZ6SnZI\
WFZ4RCJ6IYpHESVyNYJUM3h0UkZ0KFYZZGNWakIYKSJYeDpIM3F1VYWFdzZRFxlUiCgkgRpXOENk\
ZjQ5YjUkOYl6OVJkYoQ4Uodzd1VFKoZFdyViJ0ZYaVRXGoMUFXiCEnkVdGZHQhUSVEIoE3lqZ3RV\
YVGJgRGHVFlEihg3SERYIjliODI0QSOFeiZ5ZWc3aINVQ3UZclZoQloWKIgyeSRYUXNWZEhRWkdW\
ikF0eXRxJzNGY2p3RTdZYiUZQkSFaWiDWnoSYzEjeYV0gVKIZxJhVhphc0Fyh4NJclZBg0MnMzRn\
ZnMaF0MhilNlRVqEKiFxh4MZaXMWemlmJURleXQoimd3U2VTdVRjOGloiERTJGQlWDEniWiHWhdj\
VHEjiYJEhioSE0QziIJ1Z1oWc4hTNXo1J0mHVjaBKHEXaRd4EVaBdWJ2QhRTUldyFnFjNIE4RUSK\
gxF5dHJnKTkTdxNWdUZaehkjKndhJVcqRygYhlqFZxZBJjSFVGgXNlSGgRRHOJpDcWlmJDRidkdo\
KBEVd1hDGnU5eThneIp5SmkTQ2gjEnJKY3lWIXWHZ1F6emd0RmRKE2dJFiliISk2ZYJlNIIhOWJR\
ZlVWNlUyF4NDYlpZZFZHGBJhYkVSiWFDMlJWUVEaZTV3ZYY1WGeKaDQxE0dYWkRJGYhoRnFoZ4eC\
QilCIyoYMUk0NyYRiBoxEYNmElEVYTcVV2M2QyIYdERJMoYUIYETdTdVgSgmKRo5eigzUkdJKil3\
hmNyiERyhDiIJnmHYYGJNkZyUjljOiYXYlMkQxVxEXY5VRNiEVUlUSdDKTM1endKEjdkInIpNIgm\
FURJRol1QjVRSmNnMSREahgpckc5WhcTWGEkgWRSEjlpWIFFJDdRITI6h4mIJlMVRzWIIWpoVRFx\
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_MIN_DELAY