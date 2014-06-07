0 Unread MessagesxjasminexLogout
Userscripts.org
Scripts
Tags
Forums
People
Blog
Groups
Guides

DoA Power by AdeRkCaH
By AdeRkCaH — Last update Dec 30, 2011 — Installed 316 times.
About
Source Code
Reviews 0
Discussions 0
Fans 0
Issues
Share
the source is over 100KB, syntax highlighting in the browser is too slow

﻿// ==UserScript==
// @name          DoA Power Tools Teamwork
// @namespace     http://www.mmogwiki.com/scripts/dragonsofatlantis
// @description   Power Tools for Dragons of Atlantis
// @include       *://apps.facebook.com/dragonsofatlantis/*
// @include       *://*.castle.wonderhill.com/platforms/*/game
// @match         *://apps.facebook.com/dragonsofatlantis/*
// @match         *://*.castle.wonderhill.com/platforms/*/game
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
// @version       2011.1223b
// @icon          http://www.mmogwiki.com/scripts/dragonsofatlantis/powertools/logo.png
// @changelog     <ul><li><b>Fixed</b> Loading issue<li><b>Fixed</b> attack in order of distance<li><b>Fixed</b> other bugs by Lord Mimir</ul>
// ==/UserScript==

/********************************************************************************
 * INFORMATION                                                                  *
 *                                                                              *
 * Name: DoA Power Tools Teamwork                                               *
 * Version: 2011.1223b                                                          *
 * Last Modified: 23 Dicember 2011 22:00  GMT+3                                 *
 * Original Authors: G.Jetson, Runey & Wham                                     *
 * Current  Authors: La Larva, Runey, Lord Mimir, Wham, Didi & Jawz             *
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
 * DoA Power Tools Teamwork by Runey, Wham, La Larva & Lord Mimir               *
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

// jQuery Alias
var $J; 

var SCRIPT_NAME		= 'DoA Power Tools Teamwork';

// Script Version: Year, Month, Day, Revision, Maturity (e.g. YYYY.MMDDa_BETA)
var SCRIPT_VERSION	= '2011.1223b';

// For Script Mod Authors  ex: (AuthorName Mod)
var SCRIPT_MOD_BY	= 'XMAS';

// DoA API Version
var API_VERSION		= '20111215';

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
				break;
            }
			
			XMAS_SNOW = new SnowStorm();
			
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
	 UIDN = {},
	 VerboseLog;
 
// Global Functions
var translate = actionLog = debugLog = verboseLog = function(){};

// Global Elements
var $startUpBox;


var LANG_OBJECT = {},
 
 
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
var DEBUG_MARCHES		= false;
var ALERT_ON_BAD_DATA	= false;
var SCRIPT_STARTUP_DELAY= Math.randRange(5000, 7000);
var ERROR_509_DELAY     = 900000;


var LANG_CODE = navigator.language.substring(0, 2).toLowerCase();
var IS_NOT_NATIVE_LANG = ( LANG_CODE !== 'en' );

var IS_CHROME = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

// Error messages
var FATAL_SEED_TITLE	= 'ERROR WHILST FETCHING DATA FROM SERVER';
var FATAL_SEED_MSG	= 'Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again.';
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
	'',
	'',
	'',
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
	'Depending on available population':'Abhängig von verfügbaren Bür-gern',
	'Depending on available resources':'Abhängig von verfügbaren Res-sourcen',
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
	'ice_dragon outpost':'Ice-Außenposten',
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
	'Summary':'Uebersicht',
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
	/*******************************************************************************
	Nederlands (by Tweakit/Modified by RaBeRa/Corrected by Soho)
	*******************************************************************************/
case 'nl':
	LANG_OBJECT = {
	'above the first value':'boven de eerste waarde',
	'Action Logs': 'Actie Logs',
	'Actions': 'Acties',
	'and': 'en',
	'Are you sure you want to':'Weet je zeker dat je',
	'at': 'bij',
	'Attack One Target in Waves': 'Val 1 doel aan in waves',
	'Attack sent to': 'Aanval verzonden naar',
	'Attacking': 'Aanvallen',
	'Attacks Configuration': 'Aanval Configuratie',
	'Attacks Logs': 'Aanvallen Logs',
	'Attacks stopped momentarily to prevent server blocking':'Aanvallen stopte even naar de server blokkeren te voorkomen',
	'Attacks': 'Aanvallen',
	'Auto Refresh every':'Auto Vernieuwen om de',
	'Automatically': 'Automatisch',
	'Awaiting task completion notification': 'In afwachting van voltooiing van de taak melding',
	'Bandwidth Limit Exceeded':'Bandbreedte limiet overschreden',
	'Building': 'Bouw',
	'Busy': 'Bezig',
	'by': 'door',
	'Charging':'Het laden',
	'Cities': 'Steden',
	'Clear last attack on all maps': 'Wis laatste aanval op alle kaarten',
	'Clear last attack on current map': 'Wis laatste aanval op de huidige kaart',
	'Config': 'Configuratie',
	'Coordinates': 'Coördinaten',
	'd':'d',
	'Days': 'Dagen',
	'Delay Between Attacks': 'Vertraging tussen de aanvallen',
	'Depending on available population': 'Minimale behuizing',
	'Depending on available resources': 'Minimale grondstoffen',
	'Disabled': 'Deactiveren',
	'Distance must be between': 'Afstand moet tussen',
	'Distance': 'Afstand',
	'Dont flag Wildernesses':'Neem geen wildernissen over',
	'Enable': 'Inschakelen',
	'Enabled': 'Ingeschakeld',
	'Error': 'Error',
	'First value must be between': 'Eerste waarde moet liggen tussen',
	'Full': 'Vol',
	'Game Options': 'Spel opties',
	'Going to the coords':'Gaat naar de coördinaten',
	'h':'u',
	'Hiding': 'Verbergen',
	'Hour': 'Uur',
	'Hours': 'Uren',
	'Info': 'Info',
	'Invalid Date From': 'Ongeldige Datum Vanuit',
	'Invalid Date To': 'Ongeldige Datum To',
	'Invalid delays': 'Ongeldige vertragingen',
	'Invalid number of troops': 'Ongeldig aantal troepen',
	'Invalid Range Date': 'Ongeldige Range datum',
	'Last Attack': 'Laatste Aanval',
	'Loaded': 'Geladen',
	'Logs': 'Logs',
	'm':'m',
	'Manual attack sent to': 'Aanval handmatig verzonden naar',
	'Maximum simultaneous marches': 'Maximaal gelijktijdige marsen',
	'miles':'mijlen',
	'Minutes': 'Minuten',
	'No targets or troops available': 'Geen targets of troepen beschikbaar',
	'No troops available': 'Geen troepen beschikbaar',
	'No Troops Defined': 'Geen troepen ingevoerd',
	'Not enough': 'Niet genoeg',
	'Not': 'Niet',
	'of inactivity':'van inactiviteit',
	'of': 'van',
	'Opening the map on the last position':'Openen van de kaart op de laatste positie',
	'Options': 'Opties',
	'water_dragon outpost': 'Voorpost 1',
	'stone_dragon outpost': 'Voorpost 2',
	'fire_dragon outpost': 'Voorpost 3',
	'wind_dragon outpost': 'Voorpost 4',
	'ice_dragon outpost': 'Voorpost 5',
	'spectral_dragon outpost': 'Spectral Outpost',
	'Permanent Data':'Permanente Gegevens',
	'Please wait':'Even geduld aub',
	'Preparing Attack':'Aanval voorbereiden',
	'Refresh': 'Verversen',
	'Researching': 'Onderzoek',
	'Retry in':'Opnieuw in',
	'Run Time': 'Uitvoeringstijd',
	's':'s',
	'Safe Mode': 'Veilige Modus',
	'Scanning Map': 'Scannen kaart binnen $NUM$ mijl <BR> Dit duurt ongeveer',
	'Script Options': 'Script opties',
	'Search Radius':'Zoek in een straal',
	'Second value must be at least':'Tweede waarde moet minimaal',
	'Seconds': 'Seconden',
	'Send Dragon every certain number of waves':'Stuur Dragon elke aantal waves',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date': 'Start datum',
	'Starting soon':'Start binnenkort',
	'Stop if any troops lost': 'Stop bij verliezen',
	'Successfully': 'Succesvol',
	'Summary': 'Overzicht',
	'Targets': 'Doelen',
	'Task Completed': 'Taak voltooid',
	'Tasks': 'Taken',
	'Too many errors,  disabling auto train': 'Te veel fouten, automatisch trainen uitgeschakeld.',
	'Too many requests':'Te veel verzoeken',
	'Too many troops for muster point level': 'Te veel troepen voor verzamelpunt niveau',
	'Training Configuration': 'Trainings Configuratie',
	'Training queue': 'Trainings wachtrij',
	'Troops for Wave Attack': 'Troepen voor Wave aanval',
	'Troops lost': 'Troepen verloren',
	'Troops Not Defined': 'Troepen niet gedefinieerd',
	'Use the Levels Tab to select attack areas': 'Gebruik het tabblad Niveaus om de aan te vallen gebieden te selecteren',
	'Userset maximum marches reached': 'Maximaal aantal marsen bereikt',
	'Verbose logging': 'Uitgebreid loggen',
	'Verbose Logs': 'BreedsprakigLogs',
	'Verbose': 'Breedsprakig',
	'waiting': 'wachten',
	'Warnings': 'Waarschuwingen',
	'Wave attack to': 'Aanval op',
	'Wave': 'Wave',
	'Window drag': 'Venster slepen',
	'Withdraw troops if they are encamped':'Troepen terug trekken als deze versterken.',
	'~AquaTroop':'Visjes',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'AT\'s',    /* Abbreviation (max. 8 characters) */
	'~BattleDragon':'BD',			/* idem as above */
	'~Conscript':'Rekruut',			/* idem above */
	'~FireDragon':'VuurDraak',		/* idem */
	'~FireMirror':'Spiegels',		/* idem */
	'~FireTroop':'Pyro',			/* idem */
	'~Giant':'Reus',				/* idem */
	'~GreatDragon':'GroteDraak',	/* idem */
	'~Halberdsman':'Helbaar',		/* idem */
	'~IceDragon':'IceDrg',			/* idem */
	'~Longbowman':'LBM',			/* idem */
	'~Minotaur':'Mino',				/* idem */
	'~PackDragon':'TSDraak',		/* idem */
	'~Porter':'Drager',				/* idem */
	'~Spy':'Spion',					/* idem */
	'~StoneDragon':'SteenDraak',	/* idem */
	'~StoneTroop':'Oger',			/* idem */
	'~SwiftStrikeDragon':'SSD',		/* idem */
	'~WaterDragon':'WaterDraak',	/* idem */
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
	'~WaterDragon':'WatDrg',	/* idem */ 
	'~WindDragon':'WndDrg',		/* idem */ 
	'~WindTroop':'Banshee',		/* idem */ 
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
	'wind_dragon outpost':'Wind Outpost',
	'ice_dragon outpost':'Ice Outpost',
	'spectral_dragon outpost':'Spectral Outpost',
	'Scanning Map':'Scanning map within $NUM$ miles<BR>This should take about a minute',
	'~AquaTroop':'Fang',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'ArmTrans',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'BatDrg',		/* idem as above */
	'~Conscript':'Conscr',			/* idem above */
	'~FireDragon':'FireDrg',		/* idem */
	'~FireMirror':'FireMir',		/* idem */
	'~FireTroop':'LavaJaws',		/* idem */
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
	'~WaterDragon':'WatDrg',		/* idem */
	'~WindDragon':'WndDrg',			/* idem */
	'~WindTroop':'Banshee',			/* idem */
	'~Zzz':'Zzz'
	};
}

LANG_OBJECT['WaterDragonOutpost'] = LANG_OBJECT['Outpost 1'] = LANG_OBJECT['water_dragon outpost']
LANG_OBJECT['StoneDragonOutpost'] = LANG_OBJECT['Outpost 2'] = LANG_OBJECT['stone_dragon outpost']
LANG_OBJECT['FireDragonOutpost'] = LANG_OBJECT['Outpost 3'] = LANG_OBJECT['fire_dragon outpost']
LANG_OBJECT['WindDragonOutpost'] = LANG_OBJECT['Outpost 4'] = LANG_OBJECT['wind_dragon outpost']
LANG_OBJECT['IceDragonOutpost'] = LANG_OBJECT['Outpost 5'] = LANG_OBJECT['ice_dragon outpost']

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
		background-image: url(data:image/png;base64,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);\
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
		background-image: url(data:image/png;base64,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