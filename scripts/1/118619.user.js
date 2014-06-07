// ==UserScript==
// @name          DoA Power Tools Teamwork // FireFox mod by VoiD // Fr Translation fix by Orbelian
// @namespace     http://www.mmogwiki.com/scripts/dragonsofatlantis
// @description   Power Tools for Dragons of Atlantis
// @include       *://apps.facebook.com/dragonsofatlantis/*
// @include       *://*.castle.wonderhill.com/platforms/facebook/game
// @match         *://apps.facebook.com/dragonsofatlantis/*
// @match         *://*.castle.wonderhill.com/platforms/facebook/game
// @include       *://plus.google.com/games/659749063556*
// @include       *://plus.google.com/*/games/659749063556*
// @include       *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @match         *://plus.google.com/games/659749063556*
// @match         *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
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
// @version       20111120zFr
// @icon          http://www.mmogwiki.com/scripts/dragonsofatlantis/powertools/logo.png
// ==/UserScript==

/********************************************************************************
 * INFORMATION                                                                  *
 *                                                                              *
 * Name: DoA Power Tools Teamwork                                               *
 * Version: 20111117a                                                           *
 * Last Modified: 17 November 2011 02:20  GMT+3                                 *
 * Original Authors: G.Jetson, Runey & Wham                                     *
 * Current  Authors: La Larva, Runey, Lord Mimir, Wham & Didi                   *
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
 * can do so at <INSERT WIKI ADDRESS HERE WHEN DONE>.                           *
 *                                                                              *
 * If you wish to contribute to the development of DoA Power Tools Teamwork you *
 * can do so at <INSERT WIKI ADDRESS HERE WHEN DONE>.                           *
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
* All values ??we implemented, are thoroughly studied and are there for reasons 
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
 		/castle\.wonderhill\.com\/platforms\/facebook\/game/.test(window.location.href) ||
 		/plus\.google\.com.*\/games.*\/659749063556/.test(window.location.href) || 
 		/googleusercontent\.com\/gadgets\/.*\/659749063556/.test(window.location.href)
 	)){
 		return;
}


// jQuery Alias
var $J; 

// Script Version: Year, Month, Day, Revision, Maturity (e.g. YYYMMDDa_BETA)
var SCRIPT_VERSION	= '20111120zFr';

// For Script Mod Authors  ex: (AuthorName Mod)
var SCRIPT_MOD_BY	= 'VoID & Orbelian';

// DoA API Version
var API_VERSION		= 'deadbeef';

// LocalStorage Data Version (Change only if made any changes in the structure of the Data Object)
var DATA_VERSION	= '20111114c'; 

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

    if ( window.location.href.indexOf('facebook') !== -1 )
	{
        iframe	 = '#iframe_canvas';
        platform = 'facebook';
    }
	else if ( window.location.href.indexOf("google") !== -1 ) {
        iframe	 = '#oz-gadgets-canvas-iframe-659749063556';
        platform = 'google';
    }
	
    if ( window.top === window.self ) {
        function setWide() {    
            clearTimeout;
            if ( $J(iframe).length < 1 )
			{
                setTimeout(setWide, 100);
                return;
            }
			
            switch ( platform )
			{
			case 'facebook' :
				$J('#rightCol').css('display', 'none');
				$J('#blueBar').css('position', 'relative');
				break;
			case 'google' :
				$J(".Pca").css('display', 'none');
				break;
            }
			
            $J(iframe).parents().css({width:'100%',margin:'0',border:'0'});
        }
        setWide();
    }
	else {
        function setHigh() {    
            clearTimeout;
            if ( $J(object).length < 1 )
			{
                setTimeout(setHigh, 100);
                return;
            }
			
            switch (platform)
			{
			case 'facebook' :
				$J('#hd > div').css('display', 'none');
				$J('#ft').css('display', 'none');
				$J('#cn').parent().append($J('#hd'));
				break;
			case 'google' :
				$J('#pane_hd').css('display', 'none');
				break;
            }
			
            $J('#container').width('760px');

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
	 Buildings,
	 Data, 
	 DefaultDataOptions,
	 $main_box, 
	 Manifest, 
	 Map,
	 Marches,
	 Messages,
	 MyAjax, 
	 RequestQueue,
	 ScriptStyles,
	 Seed,
	 $startUpBox,
	 Tabs = {},
	 ToTranslate = {},
	 Translation,
	 UID = {},
	 UIDN = {},
	 VerboseLog;
 
 // Global Functions
var translate = actionLog = debugLog = verboseLog = function(){};

var LANG_OBJECT;
 
 
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

var SCRIPT_NAME			= 'DoA Power Tools Teamwork// FireFox friendly mod by VoiD';
var SCRIPT_URL_ERROR	= 'http://www.mmogwiki.com/forum/index.php?f=5&t=409&rb_v=viewtopic';
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


var LANG_CODE = navigator.language.substring(0, 2).toLowerCase();
var IS_NOT_NATIVE_LANG = ( LANG_CODE !== 'en' );

var IS_CHROME = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

// Error messages
var FATAL_SEED_TITLE	= 'ERROR WHILST FETCHING DATA FROM SERVER';
var FATAL_SEED_MSG	= 'Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again.';
var FATAL_SWF		= '<B>Error initializing:</b><BR><BR>Unable to find SWF element';
var STARTUP_ERROR	= 'Unable to start $SCRIPT_NAME$ <BR>';
var INIT_ERROR		= '<B>Error initializing:</b><BR><BR>';


// Colors Set
var TIMER_COLOR 	= '#2B4988';

/* WARNING: Reducing this values cause too many requests to the server
   that are monitored. Thats gives them reason to increase the security 
   on the servers and, sooner or later, make this scripts unusable.
   PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT. */
var ATTACK_MIN_DELAY	= 25; 


/*******************************************************************************
***************************      TRANSLATIONS      ****************************
*******************************************************************************/
function setLanguage ( locale )
{
LANG_CODE = locale || LANG_CODE;
switch ( LANG_CODE )
{
	/*******************************************************************************
		German ( by Native )
	*******************************************************************************/
case 'de':
	LANG_OBJECT = {
	'above the first value':'ьber dem ersten Wert',
	'Action Logs':'Aktion Logs',
	'Actions':'Aktionen',
	'and':'und',
	'Are you sure you want to':'Sind Sie sicher, dass Sie',
	'at':'bei',
	'Attack One Target in Waves':'Wellenangriff auf ein Ziel',
	'Attack sent to':'Angriffe an',
	'Attacking':'Angriff',
	'Attacks Configuration':'Angriff Konfiguration',
	'Attacks Logs':'Angriffs-Logbьcher',
	'Attacks stopped momentarily to prevent server blocking':'Angriffe gestoppt momentan auf Server blockiert verhindern',
	'Attacks':'Attacken',
	'Auto Refresh every':'Auto Auffrischen jeder',
	'Automatically':'Automatisch',
	'Awaiting task completion notification':'Erwarte Abschlussbenachrichtingung der Aufgabe',
	'Building':'Gebдude',
	'Busy':'Beschдftigt',
	'by':'durch',
	'Charging':'Laden',
	'Clear last attack on all maps':'Lцsche letzten Angriff auf alle Karten',
	'Clear last attack on current map':'Lцsche letzten Angriff auf aktueller Karte',
	'Config':'Konfiguration',
	'Console Logs':'Konsolen Logbьcher',
	'Console':'Konsole',
	'Coordinates':'Koordinaten',
	'd':'t',
	'Days':'Tage',
	'Delay Between Attacks':'Verzцgerung zwischen Angriffen',
	'Disabled':'Deaktiviert',
	'Distance must be between':'Entfernung muss zwischen',
	'Distance':'Entfernung',
	'Dont flag Wildernesses':'Machen Sie keine Wildnis des Terrains angegriffen',
	'Enable':'Aktivieren',
	'Enabled':'Aktiviert',
	'Error':'Fehler',
	'First value must be between':'Erster Wert muss zwischen',
	'Full':'ausgelastet',
	'Game Options':'Spiel Optionen',
	'Going to the coords':'Gehen um die Koordinaten',
	'Hiding':'Verstecken',
	'h':'s',
	'Hour':'Stunde',
	'Hours':'Stunden',
	'Info':'Info',
	'Invalid Date From':'Ungьltiges Datum aus',
	'Invalid Date To':'Ungьltiges Datum zu',
	'Invalid delays':'Ungьltige Verzцgerungen',
	'Invalid number of troops':'Ungьltige Anzahl von Truppen',
	'Invalid Range Date':'Ungьltiger Bereichs Datum',
	'Last Attack':'Letzter Angriff',
	'Loaded':'Geladen',
	'Logs':'Logbьcher',
	'Manual attack sent to':'Manueller Angriff gesendet an',
	'Maximum simultaneous marches':'Maximale gleichzeitige Mдrsche',
	'miles':'Meilen',
	'Minimum Housing':'Minimale Bьrger',
	'Minimum Resource Levels':'Minimale Ressourcen',
	'm':'m',
	'Minutes':'Minuten',
	'No Generals Available':'Keine Generдle verfьgbar',
	'No targets or troops available':'Keine Ziele oder Truppen verfьgbar',
	'No troops available':'Keine Truppen verfьgbar',
	'No Troops Defined':'Keine Truppen ausgewдhlt',
	'Not enough':'Nicht genьgend',
	'Not':'Nicht',
	'of inactivity':'der Inaktivitдt',
	'of':'der',
	'Opening the map on the last position':'Das Цffnen der Karte auf der letzten position',
	'Options':'Optionen',
	'Outpost 1':'Wasser-AuЯenposten',
	'Outpost 2':'Stein-AuЯenposten',
	'Outpost 3':'Feuer-AuЯenposten',
	'Outpost 4':'Wind-AuЯenposten',
	'Permanent Data':'Dauerhaft Daten',
	'Preparing Attack':'Vorbereitung Angriff',
	'Refresh':'Aktualisieren',
	'Researching':'Forschen',
	'Retry in':'Wiederholen in',
	'Run Time':'Laufzeit',
	'Safe Mode':'Sicherer Modus',
	'Scanning Map':'Scanne Karte innerhalb von $NUM$ Meilen <BR> Ungefдhre restliche Wartezeit',
	'Script Options':'Skript-Optionen',
	'Search Radius':'Suchradius',
	'Second value must be at least':'Zweiter Wert muss mindestens',
	's':'sek',
	'Seconds':'Sekunden',
	'Send Dragon every certain number of waves':'Send Drachen jeder bestimmte Anzahl von Wellen',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date':'Startdatum',
	'Stop if any troops lost':'Stopp bei Truppenverlust',
	'Successfully':'Erfolgreich',
	'Summary':'Ьbersicht',
	'Targets':'Ziele',
	'Task Completed':'Erledigt',
	'Tasks':'Aufgaben',
	'Too many errors,  disabling auto train':'Zu viele Fehler, deaktivere automatische Ausbildung',
	'Too many troops for muster point level':'Maximale Truppenanzahl laut Truppensammelplatz-Level ьberschritten',
	'Training Configuration':'Ausbildungs Konfiguration',
	'Training queue':'Trainings-Warteschlange',
	'Troops for Wave Attack':'Truppen fьr Wellenangriff',
	'Troops lost':'Truppen verloren',
	'Troops Not Defined':'Truppen nicht definiert',
	'Use the Levels Tab to select attack areas':'Benutze die Level-Tabelle um Angriffsbereiche auszuwдhlen',
	'Userset maximum marches reached':'Eingestellte maximale Mдrsche erreicht',
	'Verbose logging':'Ausfьhrlichen Logbьcher',
	'waiting':'warten',
	'Warnings':'Warnung',
	'Wave attack to':'Wellenangriff zu',
	'Wave':'Welle',
	'Window drag':'Fensterverschiebung',
	'Withdraw troops if they are encamped':'Ziehen Truppen wenn sie lagerten sich',
	'~AquaTroop':'Giftklau', 			/* Abbreviation (max. 8 characters) */  
	'~ArmoredTransport':'Luftis',       /* Abbreviation (max. 8 characters) */  
	'~BattleDragon':'KampfDr',			/* idem as above */  
	'~Conscript':'Rekrut',				/* idem above */  
	'~FireDragon':'FeuerDra',			/* idem */  
	'~FireMirror':'Feuersp',			/* idem */  
	'~FireTroop':'Pyros',				/* idem */  
	'~Giant':'Riesen',					/* idem */  
	'~GreatDragon':'GrossDr',			/* idem */  
	'~Halberdsman':'Hellebar',			/* idem */  
	'~Longbowman':'Bogi',				/* idem */  
	'~Minotaur':'Mino',					/* idem */ 
	'~PackDragon':'PckDrg',				/* idem */ 
	'~Porter':'Trдger',					/* idem */  
	'~Spy':'Spion',						/* idem */  
	'~StoneDragon':'SteinDr',			/* idem */  
	'~StoneTroop':'Oger',				/* idem */  
	'~SwiftStrikeDragon':'kFD',			/* idem */  
	'~WaterDragon':'WasserDr',			/* idem */  
	'~WindDragon':'WindDr',				/* idem */  
	'~WindTroop':'Banshee',				/* idem */
	'~Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Espaсol (by La Larva)
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
	'Attacks Configuration':'Configuraciуn de Ataques',
	'Attacks Logs':'Registro de Ataques',
	'Attacks stopped momentarily to prevent server blocking':'Los ataques se detuvieron momentбneamente para evitar el bloqueo del servidor',
	'Attacks':'Ataques',
	'Auto Refresh every':'Auto Recargar la pбgina cada',
	'Automatically':'Automбticamente',
	'Awaiting task completion notification':'En espera de la notificaciуn de finalizaciуn de la tarea',
	'Building':'Edificando',
	'Busy':'Ocupado',
	'by':'por',
	'Charging':'Cargando',
	'Clear last attack on all maps':'Borrar todos los registros de ъltimos ataques',
	'Clear last attack on current map':'Borrar registro de ъltimos ataques actuales',
	'Config':'Configuraciуn',
	'Console Log':'Registros de Consola',
	'Console':'Consola',
	'Coordinates':'Coordenadas',
	'd':'d',
	'Days':'Dнa(s)',
	'Delay Between Attacks':'Tiempo de retraso entre ataques',
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
	'Last Attack':'Ъltimo Ataque',
	'Loaded':'Cargado',
	'Logs':'Registros',
	'm':'m',
	'Manual attack sent to':'Ataque Manual enviado a',
	'Maximum simultaneous marches':'Mбximo de Marchas Simultбneas',
	'miles':'millas',
	'Minimum Housing':'por Mнnimo de Casas',
	'Minimum Resource Levels':'por Mнnimo de Niveles de Recursos',
	'Minutes':'Minuto(s)',
	'No Generals Available':'No hay generales disponibles',
	'No targets or troops available':'Sin objetivos o tropas disponibles',
	'No troops available':'No hay suficientes tropas',
	'No Troops Defined':'No Hay Tropas Definidas',
	'Not enough':'No hay suficiente',
	'Not':'No',
	'of inactivity':'de inactividad',
	'of':'de',
	'Opening the map on the last position':'Abriendo el mapa en la ъltima posiciуn',
	'Options':'Opciones',
	'Outpost 1':'Ciudad del Agua',
	'Outpost 2':'Ciudad de la Piedra',
	'Outpost 3':'Ciudad del Fuego',
	'Outpost 4':'Ciudad del Viento',
	'Permanent Data':'Datos Permanentes',
	'Preparing Attack':'Preparando el Ataque',
	'Refresh':'Actualizar',
	'Researching':'Investigando',
	'Retry in':'Reintentando en',
	'Run Time':'Tiempo de Ejecucciуn',
	's':'s',
	'Safe Mode':'Modo Seguro',
	'Scanning Map':'Buscando datos en $NUM$ millas a la redonda<BR>Este proceso puede demorar un tiempo',
	'Script Options':'Opciones del Script',
	'Search Radius':'Radio de Busqueda',
	'Second value must be at least':'El segundo valor debe ser por lo menos de',
	'Seconds':'Segundo(s)',
	'Send Dragon every certain number of waves':'Enviar Dragуn cada cierto nъmero de oleadas',
	'spectral_dragon outpost':'Ciudad Espectral',
	'Start Date':'Fecha de Inicio',
	'Stop if any troops lost':'Detener ataques si se pierden tropas',
	'Successfully':'Exitosamente',
	'Summary':'Detalles',
	'Targets':'Objetivos',
	'Task Completed':'Tarea Finalizada',
	'Tasks':'Tareas',
	'Too many errors, disabling auto training':'Demasiados errores, Desactivado Adiestramientos',
	'Too many troops for muster point level':'Demasiadas tropas para el Nivel actual del Punto de Encuentro',
	'Training Configuration':'Configuraciуn de Adiestramientos',
	'Training queue':'Encolando Adistramientos',
	'Troops for Wave Attack':'Tropas para Ataques Masivos',
	'Troops lost':'ЎSe han perdido tropas',
	'Troops Not Defined':'No Hay Tropas Definidas',
	'Use the Levels Tab to select attack areas':'Usar la solapa de Niveles para seleccionar el rango de ataque',
	'Userset maximum marches reached':'Llegaste al limite defindo por ti de marchas',    
	'Verbose logging':'Registro detallado',
	'waiting':'esperando',
	'Warnings':'Advertencias',
	'Wave attack to':'Ataque en Oleada a',
	'Wave':'Oleadas',
	'Window drag':'Arrastrar la ventana',
	'Withdraw troops if they are encamped':'Retirar tropas de terrenos conquistados',
	'~AquaTroop':'Tritуn',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'TransB',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'DrgComb',		/* idem as above */
	'~Conscript':'Reclu',			/* idem above */
	'~FireDragon':'DrgFueg',		/* idem */
	'~FireMirror':'Espejo',			/* idem */
	'~FireTroop':'Magma',			/* idem */
	'~Giant':'Gigante',				/* idem */
	'~GreatDragon':'GranDrg',		/* idem */
	'~Halberdsman':'Alabar',		/* idem */
	'~Longbowman':'Arq',			/* idem */
	'~Minotaur':'Mino',				/* idem */
	'~PackDragon':'DrgCarg',		/* idem */ 
	'~Porter':'Porteador',			/* idem */
	'~Spy':'Espнa',					/* idem */
	'~StoneDragon':'DrgPйt',		/* idem */
	'~StoneTroop':'Ogro',			/* idem */
	'~SwiftStrikeDragon':'DrgARap',	/* idem */
	'~WaterDragon':'DrgAgua',		/* idem */
	'~WindDragon':'DrgViet',		/* idem */
	'~WindTroop':'Bansh',			/* idem */
	'~Zzz':'Zzz'
	};
	break;
	/**********************************************************************
	     Franзais  (by Randalph)
	***********************************************************************/
case 'fr':
	LANG_OBJECT = {
	'above the first value':'supérieure à la première',
	'Action Logs':'Console',
	'Actions':'Actions',
	'and':'et',
	'at':'à',
	'Attack One Target in Waves':'Attaquer une cible en vagues',
	'Attack sent to':'Attaque envoyée vers',
	'Attacking':'Attaquer',
	'Attacks':'Attaques',
	'Attacks Configuration':'Configuration',
	'Attacks Stats':'Stats',
	'Attacks stopped momentarily to prevent server blocking':'Attaques arrêtées momentanément pour éviter le blocage du serveur',
	'Attacks':'Attaques',
	'Auto Refresh every':'Rafraichir toutes les',
	'Automatically':'Automatique',
	'Awaiting task completion notification':'En attente de la notification de fin des tâches',
	'Building':'Bâtiment',
	'Busy':'Occupé',
	'by':'par',
	'Charging':'Chargement',
	'Clear last attack on all maps':'Réinitialiser toutes les cartes',
	'Clear last attack on current map':'Réinitialiser les attaques sur la carte',
	'Config':'Config',
	'Console Logs':'Console Logs',
	'Console':'Console',
	'Coordinates':'Coordonnées',
	'd':'j', /*abbr Day*/
	'Days':'Jours',
	'Delay Between Attacks':'Délai entre les attaques',
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
	'Minimum Housing':' Population Minimum',
	'Minimum Resource Levels':' Niveaux de Ressources Minimum',
	'Minutes':'Minutes',
	'No Generals Available':'Pas de généraux disponible',
	'No targets or troops available':'Aucune cibles ou troupes disponibles',
	'No troops available':'Pas de troupes disponibles',
	'No Troops Defined':'Pas de troupes définies',
	'Not enough':'Pas assez',
	'Not':'Non',
	'of inactivity':'d\'inactivitées',
	'of':'des',
	'Opening the map on the last position':'Ouvre la carte aux dernières coordonnées',
	'Options':'Options',
	'Outpost 1':'Poste extérieur #1',
	'Outpost 2':'Poste extérieur #2',
	'Outpost 3':'Poste extérieur #3',
	'Outpost 4':'Poste extérieur #4',
	'Permanent Data':'Données en cache',
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
	'Stop if any troops lost':'Désactiver en cas de pertes',
	'Successfully':'Réussi',
	'Summary':'Général',
	'Targets':'Cibles',
	'Task Completed':'Tache terminée',
	'Tasks':'Taches',
	'Too many errors,  disabling auto train':'Trop d\'erreurs, entrainement automatique désactivé',
	'Too many troops for muster point level':'Déploiement maximal atteint',
	'Training Configuration':'Configuration',
	'Training queue':'File de formation en attente',
	'Troops for Wave Attack':'Sélectionnez vos troupes',
	'Troops lost':'Troupes perdues',
	'Troops Not Defined':'Aucunes troupes définies',
	'Use the Levels Tab to select attack areas':'Utilisez l\'onglet "Niveaux" et sélectionnez la cible',
	'Userset maximum marches reached':'Maximum de marches simultanés atteinte',
	'Verbose logging':'Journal d\'évenements',
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
	'above the first value':'in piщ del valore minimo',
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
	'Awaiting task completion notification': 'In attesa della di notifica completamento delle attivitа',
	'Building': 'Costruendo',
	'Busy': 'Occupato',
	'by': 'da',
	'Charging':'Caricamento',
	'Clear last attack on all maps': 'Cancella l\'ultimo attacco eseguito su tutte le mappe',
	'Clear last attack on current map': 'Cancella l\'ultimo attacco eseguito su questa mappa',
	'Config': 'Configurazione',
	'Console Logs': 'Registro console',
	'Console': 'Console',
	'Coordinates': 'Coordinate',
	'd':'g',
	'Days': 'Giorni',
	'Delay Between Attacks': 'Ritardo tra gli attacchi',
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
	'Hiding': 'Truppe NASCOSTE',
	'h':'o',
	'Hour': 'Ora',
	'Hours': 'Ore',
	'Info': 'Informazioni',
	'Invalid Date From': 'Data Invalida Da',
	'Invalid Date To': 'Data Invalida A',
	'Invalid delays': 'Ritardo non valido',
	'Invalid number of troops': 'Numero di truppe non Valido',
	'Invalid Range Date': 'Periodo di tempo non valido',
	'Last Attack': 'Ultimo attacco',
	'Loaded': 'Caricato',
	'Logs': 'Registri',
	'Manual attack sent to': 'Inviato attacco manuale a ',
	'Maximum simultaneous marches': 'Massime Marce simultanee',
	'miles':'chilometri',
	'Minimum Housing': 'Una truppa per cittа alla volta',
	'Minimum Resource Levels': 'Fino ad esaurimento risorse',
	'm':'m',
	'Minutes': 'Minuti',
	'No Generals Available': 'Nessun generale disponibile',
	'No targets or troops available': 'Nessun obiettivo o truppa disponibile',
	'No troops available': 'Nessuna truppa disponibile',
	'No Troops Defined': 'Nessuna truppa definita',
	'Not enough': 'Non hai abbastanza',
	'Not': 'Non',
	'of inactivity':'di inattivitа',
	'of': 'di',
	'Opening the map on the last position':'Sto aprendo la mappa all\'ultima posizione',
	'Options': 'Opzioni',
	'Outpost 1': 'Avamposto d\'Acqua',
	'Outpost 2': 'Avamposto di Pietra',
	'Outpost 3': 'Avamposto di Fuoco',
	'Outpost 4': 'Avamposto di Vento',
	'Permanent Data':'Dati Permanenti',
	'Preparing Attack':'Preparazione attacco',
	'Refresh': 'Aggiorna',
	'Researching': 'Sto ricercando',
	'Retry in':'Riprova in',
	'Run Time': 'Esecuzione',
	'Safe Mode': 'Modalitа provvisoria',
	'Scanning Map': 'Scansione della mappa entro $NUM$ chilometri <BR> Richiederа del tempo',
	'Script Options': 'Opzioni Script',
	'Search Radius':'Raggio di ricerca',
	'Second value must be at least':'Il maaggiore deve essere almeno',
	's':'s',
	'Seconds': 'Secondi',
	'Send Dragon every certain number of waves':'Invia il Drago una volta ogni tot Onde',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date': 'Data d\'inizio',
	'Stop if any troops lost': 'Ferma gli attacchi se muoiono delle truppe',
	'Successfully': 'Successo',
	'Summary': 'Sintesi',
	'Targets': 'Obiettivi',
	'Task Completed': 'Attivitа Completate',
	'Tasks': 'Attivitа',
	'Too many errors,  disabling auto train': 'Troppi errori, addestramento automatico fermato',
	'Too many troops for muster point level': 'Il livello del Punto di Raduno non supporta cosi tante truppe',
	'Training Configuration': 'Configurazione Addestramento',
	'Training queue': 'Elenco truppe in addestramento',
	'Troops for Wave Attack': 'Truppe per l\'attacco ad Onda',
	'Troops lost': 'Hai perso delle truppe',
	'Troops Not Defined': 'Truppe Non definito',
	'Use the Levels Tab to select attack areas': 'Usa la scheda Livelli per selezionare le aree da attaccare',
	'Userset maximum marches reached': 'Numero massimo di marce raggiunto',
	'Verbose logging': 'Accesso con informazioni',
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
	'Building': 'Bouw',
	'Busy': 'Bezig',
	'by': 'door',
	'Charging':'Het laden',
	'Clear last attack on all maps': 'Wis laatste aanval op alle kaarten',
	'Clear last attack on current map': 'Wis laatste aanval op de huidige kaart',
	'Config': 'Configuratie',
	'Console Logs': 'UitgebreideLogs',
	'Console': 'Uitgebreid',
	'Coordinates': 'Coцrdinaten',
	'd':'d',
	'Days': 'Dagen',
	'Delay Between Attacks': 'Vertraging tussen de aanvallen',
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
	'Going to the coords':'Gaat naar de coцrdinaten',
	'Hiding': 'Verbergen',
	'h':'u',
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
	'Manual attack sent to': 'Aanval handmatig verzonden naar',
	'Maximum simultaneous marches': 'Maximaal gelijktijdige marsen',
	'miles':'mijlen',
	'Minimum Housing': 'Minimale behuizing',
	'Minimum Resource Levels': 'Minimale grondstoffen',
	'm':'m',
	'Minutes': 'Minuten',
	'No Generals Available': 'Geen generaals beschikbaar',
	'No targets or troops available': 'Geen targets of troepen beschikbaar',
	'No troops available': 'Geen troepen beschikbaar',
	'No Troops Defined': 'Geen troepen ingevoerd',
	'Not enough': 'Niet genoeg',
	'Not': 'Niet',
	'of inactivity':'van inactiviteit',
	'of': 'van',
	'Opening the map on the last position':'Openen van de kaart op de laatste positie',
	'Options': 'Opties',
	'Outpost 1': 'Voorpost 1',
	'Outpost 2': 'Voorpost 2',
	'Outpost 3': 'Voorpost 3',
	'Outpost 4': 'Voorpost 4',
	'Permanent Data':'Permanente Gegevens',
	'Preparing Attack':'Aanval voorbereiden',
	'Refresh': 'Verversen',
	'Researching': 'Onderzoek',
	'Retry in':'Opnieuw in',
	'Run Time': 'Uitvoeringstijd',
	'Safe Mode': 'Veilige Modus',
	'Scanning Map': 'Scannen kaart binnen $NUM$ mijl <BR> Dit duurt ongeveer',
	'Script Options': 'Script opties',
	'Search Radius':'Zoek in een straal',
	'Second value must be at least':'Tweede waarde moet minimaal',
	's':'s',
	'Seconds': 'Seconden',
	'Send Dragon every certain number of waves':'Stuur Dragon elke aantal waves',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date': 'Start datum',
	'Stop if any troops lost': 'Stop bij verliezen',
	'Successfully': 'Succesvol',
	'Summary': 'Overzicht',
	'Targets': 'Doelen',
	'Task Completed': 'Taak voltooid',
	'Tasks': 'Taken',
	'Too many errors,  disabling auto train': 'Te veel fouten, automatisch trainen uitgeschakeld.',
	'Too many troops for muster point level': 'Te veel troepen voor verzamelpunt niveau',
	'Training Configuration': 'Trainings Configuratie',
	'Training queue': 'Trainings wachtrij',
	'Troops for Wave Attack': 'Troepen voor Wave aanval',
	'Troops lost': 'Troepen verloren',
	'Troops Not Defined': 'Troepen niet gedefinieerd',
	'Use the Levels Tab to select attack areas': 'Gebruik het tabblad Niveaus om de aan te vallen gebieden te selecteren',
	'Userset maximum marches reached': 'Maximaal aantal marsen bereikt',
	'Verbose logging': 'Uitgebreid loggen',
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
	'Attacks stopped momentarily to prevent server blocking':'Ataki zatrzymal sie na chwile, aby zapobiec blokowaniu serwerуw',
	'Attacks':'Ataki',
	'Auto Refresh every':'Automatyczne odswiezanie co',
	'Automatically':'Automatycznie',
	'Awaiting task completion notification':'Oczekiwanie na zakonczenie zadania zgloszeniu',
	'Building':'Budowanie',
	'Busy':'Zajety',
	'by':'prze',
	'Charging':'Ladowanie',
	'Clear last attack on all maps':'Usun ostatnie atak na wszystkich mapach',
	'Clear last attack on current map':'Usun ostatnie atak na aktualna mape',
	'Config':'Konfiguracja',
	'Console Logs':'Dzienniki Konsola',
	'Console':'Konsola',
	'Coordinates':'Wspуlrzedne',
	'd':'d',
	'Days':'Dni',
	'Delay Between Attacks':'Przerwa pomiedzy atakami',
	'Disabled':'Dezaktywowac',
	'Distance must be between':'Odleglosc powinna wynosic od',
	'Distance':'Odleglosc',
	'Dont flag Wildernesses':'Nie nalezy puszczach z terenуw zaatakowany',
	'Enable':'Wlac',
	'Enabled':'Wlaczone',
	'Error':'Blad',
	'First value must be between':'Wartosc musi byc pierwsze entre',
	'Full':'Pelny',
	'Game Options':'Opcje gry',
	'Going to the coords':'Przechodzac do wspуlrzednych',
	'Hiding':'Ukrywanie',
	'h':'h',
	'Hour':'Godziny',
	'Hours':'Godziny',
	'Info':'Informacje',
	'Invalid Date From':'Nieprawidlowe dane od',
	'Invalid Date To':'Nieprawidlowe dane do',
	'Invalid delays':'Niewazny opуznienia',
	'Invalid number of troops':'Bledna liczba zolnierzy',
	'Invalid Range Date':'Nieprawidlowy zakres dat',
	'Last Attack':'Ostatni atak',
	'Loaded':'Zaladowany',
	'Logs':'Dzienniki',
	'Manual attack sent to':'Podrecznik wyslane do ataku',
	'Maximum simultaneous marches':'Maksymalna jednoczesne marsze',
	'miles':'mil',
	'Minimum Housing':'Minimalna Obudowa',
	'Minimum Resource Levels':'Minimalnego poziomu zasobуw',
	'm':'m',
	'Minutes':'Minut',
	'No Generals Available':'Niedostepny generalnych',
	'No targets or troops available':'Nie celуw lub dostepnych oddzialуw',
	'No troops available':'Wojsko nie jest dostepna',
	'No Troops Defined':'Nie zdefiniowane Troops',
	'Not enough':'A Malo',
	'Not':'Nie',
	'of inactivity':'bezczynnosci',
	'of':'z',
	'Opening the map on the last position':'Otwarcie mapy na ostatniej pozycji',
	'Options':'Opcje',
	'Permanent Data':'Stale Danych',
	'Preparing Attack':'Przygotowanie Atak',
	'Refresh':'Odswiez',
	'Researching':'Badania',
	'Retry in':'Ponowna prуba',
	'Run Time':'Czas pracy',
	'Safe Mode':'Tryb awaryjny',
	'Scanning Map':'W $NUM$ mil Skanowanie map <BR> powinna to okolo czas',
	'Script Options':'Opcje Script',
	'Search Radius':'OdlegL',
	'Second value must be at least':'Druga wartosc musi wynosic co najmniej',
	's':'s',
	'Seconds':'Sekund',
	'Send Dragon every certain number of waves':'Wyslij Smoka co pewnej liczby Fala',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date':'Poczatek',
	'Stop if any troops lost':'Stop, jezeli jakiekolwiek wojska stracone',
	'Successfully':'Powodzeniem',
	'Summary':'Podsumowanie',
	'Targets':'Cele',
	'Task Completed':'Adanie Wykonane',
	'Tasks':'Zadania',
	'Too many errors,  disabling auto train':'Byt wiele bledуw, wylaczenie pociagu auto',
	'Too many troops for muster point level':'Byt wielu zolnierzy zebrac punkt za poziom',
	'Training Configuration':'Konfiguracja Szkolenia',
	'Training queue':'Szkolenia kolejki',
	'Troops for Wave Attack':'Fala Atak wojsk',
	'Troops lost':'Wojsko Stracone',
	'Troops Not Defined':'Wojsko Nie zdefiniowane',
	'Use the Levels Tab to select attack areas':'Uzyciu karty Poziom wybrac obszary atak',
	'Userset maximum marches reached':'Maksymalnie marsze Zasieg UserSet',
	'Verbose logging':'Verbose logging',
	'waiting':'czeka',
	'Warnings':'Ostrzezenia',
	'Wave attack to':'Atak Fala',
	'Wave':'Fala',
	'Window drag':'Okna przeciagnij',
	'Withdraw troops if they are encamped':'Wycofania wojsk jesli sa one obуz',
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
	'Attacks':'Атаки', 
	'Attacks Configuration':'Настройка атак', 
	'Attacks Stats':'Статистика атак', 
	'Attacks stopped momentarily to prevent server blocking':'Атаки приостановлены для предотвращения блокировок сервером', 
	'Attacks':'Атаки', 
	'Auto Refresh every':'Автообновление каждые', 
	'Automatically':'Автоматически', 
	'Awaiting task completion notification':'Ожидание результатов задания', 
	'Building':'Строительство', 
	'Busy':'Занято', 
	'by':' ', 
	'Charging':'погрузка',
	'Clear last attack on all maps':'Очистка время атак на всех картах', 
	'Clear last attack on current map':'Очистка время атак на этой карте', 
	'Config':'Конфигурация', 
	'Console Logs':'Журнал консоли', 
	'Console':'Консоль', 
	'Coordinates':'Координаты', 
	'd':'дн.', /*abbr Day*/ 
	'Days':'Дней', 
	'Delay Between Attacks':'Пауза между атаками', 
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
	'Minimum Housing':'Минимально по населению', 
	'Minimum Resource Levels':'Минимально по ресурсам', 
	'Minutes':'Минут', 
	'No Generals Available':'Нет свободных генералов', 
	'No targets or troops available':'Нет доступных целей или войск', 
	'No troops available':'Не хватает войск', 
	'No Troops Defined':'Не указаны войска', 
	'Not enough':'Не хватает', 
	'Not':'Не', 
	'of inactivity':'бездействия', 
	'of':' ', 
	'Opening the map on the last position':'Открытие карты на последней позиции', 
	'Options':'Настройки', 
	'Outpost 1':'Аутпост 1', 
	'Outpost 2':'Аутпост 2', 
	'Outpost 3':'Аутпост 3', 
	'Outpost 4':'Аутпост 4', 
	'Permanent Data':'Permanent Data', 
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
	'Stop if any troops lost':'Остановить при потере войск', 
	'Successfully':'Успешно', 
	'Summary':'Итог', 
	'Targets':'Цели', 
	'Task Completed':'Задача выполнена', 
	'Tasks':'Задания', 
	'Too many errors, disabling auto train':'Много ошибок, отключение автообучения',
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
	'above the first value':'Ilk degerin ьstьnde',
	'Action Logs':'Eylem Kayitlar',
	'Actions':'Eylemler',
	'and':'ve',
	'Are you sure you want to':'Istediginiz emin',
	'at':'az',
	'Attack One Target in Waves':'Dalgalari Bir Hedef Saldiri',
	'Attack sent to':'Saldiri gцnderildi',
	'Attacking':'Saldirmak',
	'Attacks Configuration':'Yapilandirma Saldirilari',
	'Attacks Logs':'Saldirilar Kayitlar',
	'Attacks stopped momentarily to prevent server blocking':'Saldirilari engelleme sunucu цnlemek iзin bir an durdu',
	'Attacks':'Saldirilar',
	'Auto Refresh every':'Otomatik Yenileme her',
	'Auto-Collection of Resources':'Karakollarini Otomatik hasat kaynaklari her',
	'Automatically':'Otomatik',
	'Awaiting task completion notification':'Bekliyor gцrev tamamlama bildirimi',
	'Battle Report':'Raporlari Sil',
	'Building':'Bina',
	'Busy':'Mesgul',
	'by':'ile',
	'Charging':'Yьkleme',
	'Clear last attack on all maps':'Tьm haritalarda aзik son saldiri',
	'Clear last attack on current map':'Mevcut harita ьzerinde net son saldiri',
	'Config':'Yapilandirma',
	'Console Logs':'Konsol Kayitlar',
	'Console':'Konsol',
	'Coordinates':'Koordinatlar',
	'Off':'bosta',
	'd':'g',
	'Days':'Gьnleri',
	'Delay Between Attacks':'Saldirilar Arasindaki Gecikme',
	'Disabled':'Engelli',
	'Distance must be between':'Mesafe arasinda olmalidir',
	'Distance':'Mesafe',
	'Dont flag Wildernesses':'Arazilerde yapmayin Wildernesses saldirdi',
	'Enable':'Etkinlestir',
	'Enabled':'Etkin',
	'Error':'Hata',
	'First value must be between':'Ilk degeri arasinda olmalidir',
	'Full':'Tam',
	'Game Options':'Oyun Seзenekleri',
	'Going to the coords':'Koordinatlari gitmek',
	'Hiding':'Gizleme',
	'h':'s',
	'Hour':'Saat',
	'Hours':'Saat',
	'Info':'Bilgi',
	'Invalid Date From':'Geзersiz Tarih',
	'Invalid Date To':'Geзersiz Tarih',
	'Invalid delays':'Geзersiz gecikmeler',
	'Invalid number of troops':'Geзersiz asker sayisi',
	'Invalid Range Date':'Geзersiz Araligi Tarihi',
	'Last Attack':'Son Saldiri',
	'Loaded':'Yьklь',
	'Logs':'Kayitlar',
	'Manual attack sent to':'Ile gцnderilen Manuel saldiri',
	'Maximum simultaneous marches':'Maksimum eszamanli yьrьyьslerle',
	'miles':'mil',
	'Minimum Housing':'Asgari Konut',
	'Minimum Resource Levels':'Asgari Kaynak Seviyeleri',
	'm':'d',
	'Minutes':'Dakika',
	'Muster Point':'Nokta Muster',
	'My Generals':'Generaller',
	'No Generals Available':'Hayir Generals kullanilabilir',
	'No targets or troops available':'Yok hedefler veya asker',
	'No troops available':'Yok askerlerinin',
	'No Troops Defined':'Askerler Tanimli',
	'Not enough':'Yeterli degil',
	'Not':'Degil',
	'of inactivity':'hareketsizlik',
	'of':',',
	'Opening the map on the last position':'Son konumu harita aзma',
	'Options':'Seзenekler',
	'Outpost 1':'Su Sehri',
	'Outpost 2':'Tas Sehir',
	'Outpost 3':'Ates Sehir',
	'Outpost 4':'Rьzgar Sehir',
	'Permanent Data':'Kalici Veri',
	'Preparing Attack':'Saldiri hazirlanmasi',
	'Refresh':'Yenile',
	'Required':'Gerek',
	'Researching':'Arastirma',
	'Run Time':'Зalisma Sьresi',
	'Safe Mode':'Gьvenli Mod',
	'Scanning Map':'Iзinde $NUM$ kilometre <BR> Tarama harita bu yaklasik bir dakika zaman',
	'Script Options':'Komut Seзenekleri',
	'Search Radius':'Arama yariзapi',
	'Second value must be at least':'Ikinci deger olmali, en azindan',
	's':'deg',
	'Seconds':'Degil',
	'Send Dragon every certain number of waves':'Ejderha dalgalarin her belirli sayida Dalga',
	'Start Date':'Baslangiз ??Tarihi',
	'Statistics':'Istatistik',
	'spectral_dragon outpost':'Spectral Outpost',
	'Stop if any troops lost':'Herhangi bir asker kaybetti Durdur',
	'Successfully':'Basariyla',
	'Summary':'Цzet',
	'Targets':'Hedefler',
	'Task Completed':'Gцrev Tamamlandi',
	'Tasks':'Gцrevler',
	'Too many errors,  disabling auto train':'Зok fazla hata, otomatik tren devre disi birakma',
	'Too many troops for muster point level':'Gцrememesi noktasi seviyesi iзin зok sayida asker',
	'Training Configuration':'Egitim Yapilandirma',
	'Training queue':'Egitim kuyruk',
	'Troops for Wave Attack': 'Dalgalanma asker Saldirilari',
	'Troops lost':'Askerler kaybetti',
	'Troops Not Defined':'Askerler Tanimli degil',
	'Use the Levels Tab to select attack areas':'Saldiri alanlarini seзmek iзin Seviyeleri Sekmesini kullanin',
	'Userset maximum marches reached':'Ayarlidir maksimum ulasti yьrьyьsleri',
	'Verbose logging':'Gьnlьgь etkinlestir',
	'waiting':'bekleyen',
	'Warnings':'Uyarilar',
	'Wave attack to':'Dalga saldiri',
	'Wave':'Dalga',
	'Window drag':'Sьrьkleme etkinlestirin',
	'Withdraw troops if they are encamped':'Kamp eger birliklerinin geri зekilmesi',
	'~Zzz':'Zzz'
	};
	break;
default:
	LANG_OBJECT = {
	'Dont flag Wildernesses':'Don\'t flag Wildernesses',
	'm':'m',
	'Outpost 1':'Water Dragon Outpost',
	'Outpost 2':'Stone Dragon Outpost',
	'Outpost 3':'Fire Dragon Outpost',
	'Outpost 4':'Wind Dragon Outpost',
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
	'~Longbowman':'LB&nbsp;Man',	/* idem */
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
	 ,'defending'
	 ,'hiding'
	 ,'hide_inputbox'
	 ,'main-box'
	 ,'march_camp'
	 ,'march_wave'
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
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAAA7VBMVEUkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiTww4gUAAAATnRSTlMAGBAyBAhQv4OZLiJUcEBmYBoSzQwgPBZCSEoeWiYwUiyFNIeBw2rJz8c4RBy9uXyrtaWNqa2zKP2fJO8KBgKPo2KVoa9s351GPm5+kWho0kj9AAAPhUlEQVR4nO1djWLbthEGyUiq5YSSLXtp7FpLOmfzkmxr126tmi2p03RJ1/Xe/3EGgARxPyAgRbIk2/hkSz4CJO4+HsE7AJSVysjI2AMUUOxahZ2iANhzBtZWr4BoIRSYAVN5u4QwDwQDRbcwfUi5KS3wFuDmFnQLa4Dtb//cqktwD5QEFFwfUs7PoCCA7y4bEJVFizcIob8KmhAplwwqVjt+9FBl3uINQniwEiryEyw9JHqGpQdEFNi+B4QQ7QOiHhysIPoAxUqxvdvvA9K42bsAv4S2fxfYOe57IJSRkZGRkZGxx7jxSHDHcRBXQMTyIjInBgHwBJ/bEx8PEANC+uhbpSSggCBAVODVabpI1S/k4WLZpTn6NpMhoX9Y40hxYERFpMcqUs4AloCtDQdID1YhnyXZ2hLjAYWiO9Dy1PDB7tPhIqLx+uMB8grZaR+Qxl2/C2RkZGRkZGRk7A7rBf7J0DR5/LUTjzUPIPSPGvQJiVJiB7kcQCiUOJrcFNtDZIf2xarQ3aGvLNxAVIFAabz90BFiBIlycTBhgWwOWCH0FLYHlPqwHaCvcIn2ZbosCevfPTRiFFcgvHukCjWwrc3GrGh1fsAof8EaUReKXkCB4/MzFNo97qLpFiKFYv/kNR5YQxQbQEofkZ2OuEOHqqT6gFTpru8CN7x/+jaZkZGRkZGRcV+x/rLUNcMMqUAscgnFocmpqkTzqymwVAPxfJ5PnIUUQOUKT04tEdWZyv3JCQSn96WS4pD97QfyW25A7NhSAbyhmVj0FEltA4vdiygBibXhoUYgykCUP7HwPTDeEqAIcHVMkZg7Zx4k0uFANs63hPQXCoRLAwdgGsr9Az7Qv7sgQGgg1aPl/BJLExBWgG4RFRLFImGmIquPC/klEGyCG0AuAXaJJC+B8FVe9NYQDEcXB8g6AQcjYJ1goJIggHWCrFR0S6kRHN5+4BzFi8NaoN35NRxUvL+JJdZr7PV4wK6fj8nIyMjIyNhr3OxdXAYq7FHZwB6bDSzSh4sF0utChqo0NAvaT1hLzXwFinmCzmeDucEQK18TTaQoFgP7bNC+RZ4OT4T6gQogDFYk+1QxQlj19QGSAWKiLYp8P0Ag1Gbz1ULfWHLg9iUnQNK5QQJcukm04blKLH2GgEJCY+HzXAZWCvHKco3Bp6MIaCjSXXRJyOxeqhnzEaF93MfFGW/O16ZvDL5TM4MJIjujz/cHypkQuuzRwWJ93BKdIt+wCRAPl9kpe2Ikkb2mFgGlxh/i40d3EHfdvoyMjIyMu43ylt/IAmGHnN5iIt7wKfbv01RAcJqFRl9lcjYQSnbQqKgC4fYOwSJt6N6trE0twZ9kN/PqNpTQeICvr4TLsDYC06U7BMjshS+v1/aT7IwQYD5LcgRQXMT2FrBfBLjZ6151jDElk9tPFfpUgk2yregusX25BJbwAFEfM+YI6vGAti4bTtizB+TjfQCrERyhKb2X8D6A9wX75P4t4neBYJeP6pdhg/gQl8MWvytzeSTjgOQBynQdh/iXKdxOrGJ/RkZGRsb9QmXihGr5+g8GGg9uTh+KoVZuNIzV+CwRucFBEyr1mVjx4irOxwM1BhirB6Q+2eNQi4eqR+aF6mELtoMzCR7V9RAFe/ZvQogNiyY8FPSUTFsLp8TeTmMui5mtw7bcaT0Yw2AA4wFRQIlkgq+1DQrNhkmoxS5Jq+u6bMAIGRECEANgXHTgWzwgBOhDH2l0oTQ4D8D5NMktBgNywAEMjo8rwATMZrPY7JGxBoJCkIBDQiAY09EGTUiBCWkUpISfGPR5AAwBfZiG2z7Ayc1yeKTxid39xBNwfHr4O0LA48ePFTvhYrF1r4tyAoz9n2MCqEuBtp/6GDR0oAYfG/R6wJExHYZHfhygsv7fEWCOj4bYmsP5A+pL4MkTfAnMlD4F+r3bobKvTyTA2P/w7PN+Agq2QW8piqMCpTBwenoKvX0AHGkGtP2YAPvTEWA7QUTAudn7/NxtOG46wWNmDtpBEkBzN7rBEvAFHp+YTB/q97qPAN4gHFqgBi8uLsC7qPCA6mg41G/+ErByPwEXDdoNxRhOx+M5jPEzQugS0ht+b1/Y3gEnYMAIAOIBE29/hIDucE8tmMsNOgK4B1RHFu4UCRlMHzv0xzcajcfdXWDs2h8TArBCkoDUJYDLmz6w7ip3BFS0ve5wTRwAn6keMA9I3QYbfSZ0DKbyt+7OXjGI1idPcfNyAyfAMlCrzaGqphYrxHocLHRJVycnfGUcbtT+jIyMjIw9x7Nn8fJSzG0TmFtO8rZT+XT3S3ub+tKJbbLd5diTVp50+zahyeHSslJ/YPrU0fuazrZO2CZ92/ZCCVXlGRiZKPJyPPRxyIFWeXLQBXJBKiq/3divEAN6ZwM200Qjm7EJBZeWm/PRWVCbYK7s7u2l4XaCz+lzgOfMfhMonXr7TWzeZb98dbgIzBT8Ub8eYYUqfZ4rVJ/MDbIDgPqTulJ/xvntWAtjIisqnwxOkGz0n077FARoY79GdA6HPE4rOy196NiMWHTZlSSApcOgXpy/fHV2joaNKu3ffsAnRcBf4K/6NcIG6tIxk3HyoXPjASqfUgXbYN5PzpL2njkR9QMjeDTVHDTCgRuxOegjoO0FvKzP/t/gmVdI24+G7NIe8JX6Wv3dDyldMA+4YB5wwTygtd+dwRqaTqrLb1l73zTSN52CNpnHuQOYPsDblybgxfkXh/oVtr+N1DEBJdhRJyd/Bd/q1z+cbNrD17iVKyajcnv9arhOkRPgsruuD6DmNPwpDNrLw2CoTgHni4yALr0L29+tiKAEIPn868ejx//8rpWP3OEOl5On9OwpcQm0MhafP/ey8f1uvDNIgGLQG8z4YO99ENgg95etwv4uYJYY8fUGHYH6j6fscHFZMftlAl9i+9XL73X3N/n+ZStOzfVfRvYXhrbdKOpEgVQTg/wsDuDD3kwOfQNMTJ5y+/ltUDWLunyxnRF46IqlBzGMY4X7inggREFioIyMjIyMHWCIB6ZNKAcXseo3vLTQTkVE7348dlwJJSz0+wLfmi8BhZqfw3D4ww/wHVLnEd5/fgYvXsDZ3MlsvYUbbnDjDZ3MN3TJG4+bxjAaDl8TBri9qxEw1ccao2wTNAMLHo2f+sjrXwb/9qHoYqgPMBXJTVfOpmrZH23y6uvo0LHSyY6fHGwKfHJlAuMFvObjDYrIqxBgQi20h7Hd/nYVLmno+eaNUm/eeH2GCuopntnhBJAlI2AHo9CCh1I1QxUdAbqqGY9BBLwyc3W4wYVhvY8A4BoIc1l5M7vnPWphZW9/Ses3n37y9a0uGqFwFQZsQQbd386DogpgEk+dzynsAZMJXq8+ns9NeukJ0PYrNATGGefJQlhkLo7DTXr+y3bNiOsDvrXTz/C2q1DXZH84iRNwrP88Nj+u2DjYEE6RBxD9Knj16ujVHC67A7422o02RwD3gB+t7EblWvu9geOFxSnd3ROmT+nJyQkhoPlsxVONc/3TEdBos+jtA+ZzcwHgTvD1cDjaYCcItA8w9i88A8b+mqSjc6Pvqd998QguEQPmQMeo23ODN86+p0/bn1buBkT6+oBhNZ/PYY4ZAHYb3PRd4LkZmPX68NRtMZn4ASvdA+qf0jMA5MP9eeg28Nug9QiLnj5A33U1MAES6xHAUNpz/9zFAYE1gqQDMT3G6xI9pwdw/aIgKoHCS1YGlRnSq9yCjdXjgN3j+N27YyROHxmuNAeNKPpYuXIyIyMjYy0M8eros59MF/PT2c602T7eA7zvhJ9dr/vzDjXaLp4Yc5+0wllzxzHv3gdmMMM7/CcQzKgVBqYTmFn+Z+mKm8J7k0A5F/jgCfjQ1WBhQyiOqD0lYuqBb+AyzMw9Ha2G3m6c8qQx+AlqnIceQp+Sb6i9UyQWbhr54+AjnZ0VzW2TAN0DmBT6PWmc6jDBE2PK2u+nF43dyP7Q0t1pOcX2fdRvH0mF2Q4JqN35rnHjVIeaXfIAVyUuw/aHCCiJy9iF5l1621zweI8KZrPZ9iJdb7DXJ3US0OSrtZ10imt7wHY7QesAzUMz1oZ3noB3qFJ/H18j97FYuw8QDN4oeKf30osvcSW2ExLo+VcbuAuo/sUIm8fMG9xocO3Ea19J9gFYivnHJ2KnyfovZlgW3v6ySx32abQiIyMjIyPjhlFDTLxpwIgFMnTp6A3g4IDKNY+stkwAMAoIAbasxBXqUWneSAWTMjt50lTqT29rFjvXohjsDNm2YPXDFlICmrJOZ3t6tHm8AiEAl0sCeLIIorIRt+cFbew/QRsoAXb4o1XSfoywzm0FTMAoYBNvLyFu8v8HpLBtD1iKgC17wHb7AI6d9wFbvguAIGTHd4E9wG7jgIyMjIyM+434c2R3HeV/Ffx6jtZu6ijl8h59T655jhR+rdHzDOP6beABCheb8O8/WFXeOyzgf5oAhVYnKxP7CwaAf1afJu8bSrhS6tdaXeGnrRenOqOlz9d6QwYnA/3TLd+GE7qe3chA5YF5DfY0vK3adfOX/gyNp2BW25MHdxAB9qvRiiP3/XpQQFGYDU4+Mi///XumXG8pjvaUAOsBGlf4jJt+YYEzeEzAdw06F19R3juM7D1wita86GR0CKfDHgLuXCc4Bri6vMLdfjMc4VNSUNsdodo2xu/1+Xl/K5+az8jIyMhYG/z5gJTMF1GtKq/a3rpyCvz5gJTMl9GtKq/a3rpyCmfQ4WwZmS+kXFVetb115ST48wEf/AGcfG1iw+tWbpbS2vJ3nQxcVr3lH3z5h972FUTLzYpOVk7l5hD+eYcYwDcAnewOotrZ4OtrPDucqi/LRX0/RR4qx7Nn4U8g+qjffvuN6Gf+nC85vwauHjaYyubqvWYKY4VEfSUMitdnBCT1Ue63R5439m+OgCn6DroAAaHPVQxKth/wkJgHmG8bmQMsT0D6EjDfvhVRKO3ywOQUgRA7nmL1uawZmHf1k+DPBwQ6NdcJ+k6Md1LA5f5ONdhJ8vZ5J0vLHT99srkGOjmJbd/G1r2Nriqnse1AZt1AalU5jW2HsuuG0qvKGRkZGRkZGRG0gcONyXsP9v8D0/IdJADiBNiXl3327WRGgOL/9HC/0XwlIURkRhC4tz6Z/fu7fUf2gHvfB9z3u0BGRkZGRkbGplHcnkgguQoSqtUXuhbs/wPtMwqV0HUJAvj5vk32b8IDuL23yn7qAXZ5u32hbRX7d3o82Df1FZXvbh9QOfhyxldr/+3xgXU9oKmvsHyr7F/XA269/eveBXrsv7N9QALe/tvjA0kPWAXGbvebkbHn+D/J5nMcHzx1UAAAAABJRU5ErkJggg==);\
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
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAAA7VBMVEX8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vywC3+8AAAATnRSTlMAGBAyBAhQv4OZLiJUcEBmYBoSzQwgPBZCSEoeWiYwUiyFNIeBw2rJz8c4RBy9uXyrtaWNqa2zKP2fJO8KBgKPo2KVoa9s351GPm5+kWho0kj9AAAPhUlEQVR4nO1djWLbthEGyUiq5YSSLXtp7FpLOmfzkmxr126tmi2p03RJ1/Xe/3EGgARxPyAgRbIk2/hkSz4CJO4+HsE7AJSVysjI2AMUUOxahZ2iANhzBtZWr4BoIRSYAVN5u4QwDwQDRbcwfUi5KS3wFuDmFnQLa4Dtb//cqktwD5QEFFwfUs7PoCCA7y4bEJVFizcIob8KmhAplwwqVjt+9FBl3uINQniwEiryEyw9JHqGpQdEFNi+B4QQ7QOiHhysIPoAxUqxvdvvA9K42bsAv4S2fxfYOe57IJSRkZGRkZGxx7jxSHDHcRBXQMTyIjInBgHwBJ/bEx8PEANC+uhbpSSggCBAVODVabpI1S/k4WLZpTn6NpMhoX9Y40hxYERFpMcqUs4AloCtDQdID1YhnyXZ2hLjAYWiO9Dy1PDB7tPhIqLx+uMB8grZaR+Qxl2/C2RkZGRkZGRk7A7rBf7J0DR5/LUTjzUPIPSPGvQJiVJiB7kcQCiUOJrcFNtDZIf2xarQ3aGvLNxAVIFAabz90BFiBIlycTBhgWwOWCH0FLYHlPqwHaCvcIn2ZbosCevfPTRiFFcgvHukCjWwrc3GrGh1fsAof8EaUReKXkCB4/MzFNo97qLpFiKFYv/kNR5YQxQbQEofkZ2OuEOHqqT6gFTpru8CN7x/+jaZkZGRkZGRcV+x/rLUNcMMqUAscgnFocmpqkTzqymwVAPxfJ5PnIUUQOUKT04tEdWZyv3JCQSn96WS4pD97QfyW25A7NhSAbyhmVj0FEltA4vdiygBibXhoUYgykCUP7HwPTDeEqAIcHVMkZg7Zx4k0uFANs63hPQXCoRLAwdgGsr9Az7Qv7sgQGgg1aPl/BJLExBWgG4RFRLFImGmIquPC/klEGyCG0AuAXaJJC+B8FVe9NYQDEcXB8g6AQcjYJ1goJIggHWCrFR0S6kRHN5+4BzFi8NaoN35NRxUvL+JJdZr7PV4wK6fj8nIyMjIyNhr3OxdXAYq7FHZwB6bDSzSh4sF0utChqo0NAvaT1hLzXwFinmCzmeDucEQK18TTaQoFgP7bNC+RZ4OT4T6gQogDFYk+1QxQlj19QGSAWKiLYp8P0Ag1Gbz1ULfWHLg9iUnQNK5QQJcukm04blKLH2GgEJCY+HzXAZWCvHKco3Bp6MIaCjSXXRJyOxeqhnzEaF93MfFGW/O16ZvDL5TM4MJIjujz/cHypkQuuzRwWJ93BKdIt+wCRAPl9kpe2Ikkb2mFgGlxh/i40d3EHfdvoyMjIyMu43ylt/IAmGHnN5iIt7wKfbv01RAcJqFRl9lcjYQSnbQqKgC4fYOwSJt6N6trE0twZ9kN/PqNpTQeICvr4TLsDYC06U7BMjshS+v1/aT7IwQYD5LcgRQXMT2FrBfBLjZ6151jDElk9tPFfpUgk2yregusX25BJbwAFEfM+YI6vGAti4bTtizB+TjfQCrERyhKb2X8D6A9wX75P4t4neBYJeP6pdhg/gQl8MWvytzeSTjgOQBynQdh/iXKdxOrGJ/RkZGRsb9QmXihGr5+g8GGg9uTh+KoVZuNIzV+CwRucFBEyr1mVjx4irOxwM1BhirB6Q+2eNQi4eqR+aF6mELtoMzCR7V9RAFe/ZvQogNiyY8FPSUTFsLp8TeTmMui5mtw7bcaT0Yw2AA4wFRQIlkgq+1DQrNhkmoxS5Jq+u6bMAIGRECEANgXHTgWzwgBOhDH2l0oTQ4D8D5NMktBgNywAEMjo8rwATMZrPY7JGxBoJCkIBDQiAY09EGTUiBCWkUpISfGPR5AAwBfZiG2z7Ayc1yeKTxid39xBNwfHr4O0LA48ePFTvhYrF1r4tyAoz9n2MCqEuBtp/6GDR0oAYfG/R6wJExHYZHfhygsv7fEWCOj4bYmsP5A+pL4MkTfAnMlD4F+r3bobKvTyTA2P/w7PN+Agq2QW8piqMCpTBwenoKvX0AHGkGtP2YAPvTEWA7QUTAudn7/NxtOG46wWNmDtpBEkBzN7rBEvAFHp+YTB/q97qPAN4gHFqgBi8uLsC7qPCA6mg41G/+ErByPwEXDdoNxRhOx+M5jPEzQugS0ht+b1/Y3gEnYMAIAOIBE29/hIDucE8tmMsNOgK4B1RHFu4UCRlMHzv0xzcajcfdXWDs2h8TArBCkoDUJYDLmz6w7ip3BFS0ve5wTRwAn6keMA9I3QYbfSZ0DKbyt+7OXjGI1idPcfNyAyfAMlCrzaGqphYrxHocLHRJVycnfGUcbtT+jIyMjIw9x7Nn8fJSzG0TmFtO8rZT+XT3S3ub+tKJbbLd5diTVp50+zahyeHSslJ/YPrU0fuazrZO2CZ92/ZCCVXlGRiZKPJyPPRxyIFWeXLQBXJBKiq/3divEAN6ZwM200Qjm7EJBZeWm/PRWVCbYK7s7u2l4XaCz+lzgOfMfhMonXr7TWzeZb98dbgIzBT8Ub8eYYUqfZ4rVJ/MDbIDgPqTulJ/xvntWAtjIisqnwxOkGz0n077FARoY79GdA6HPE4rOy196NiMWHTZlSSApcOgXpy/fHV2joaNKu3ffsAnRcBf4K/6NcIG6tIxk3HyoXPjASqfUgXbYN5PzpL2njkR9QMjeDTVHDTCgRuxOegjoO0FvKzP/t/gmVdI24+G7NIe8JX6Wv3dDyldMA+4YB5wwTygtd+dwRqaTqrLb1l73zTSN52CNpnHuQOYPsDblybgxfkXh/oVtr+N1DEBJdhRJyd/Bd/q1z+cbNrD17iVKyajcnv9arhOkRPgsruuD6DmNPwpDNrLw2CoTgHni4yALr0L29+tiKAEIPn868ejx//8rpWP3OEOl5On9OwpcQm0MhafP/ey8f1uvDNIgGLQG8z4YO99ENgg95etwv4uYJYY8fUGHYH6j6fscHFZMftlAl9i+9XL73X3N/n+ZStOzfVfRvYXhrbdKOpEgVQTg/wsDuDD3kwOfQNMTJ5y+/ltUDWLunyxnRF46IqlBzGMY4X7inggREFioIyMjIyMHWCIB6ZNKAcXseo3vLTQTkVE7348dlwJJSz0+wLfmi8BhZqfw3D4ww/wHVLnEd5/fgYvXsDZ3MlsvYUbbnDjDZ3MN3TJG4+bxjAaDl8TBri9qxEw1ccao2wTNAMLHo2f+sjrXwb/9qHoYqgPMBXJTVfOpmrZH23y6uvo0LHSyY6fHGwKfHJlAuMFvObjDYrIqxBgQi20h7Hd/nYVLmno+eaNUm/eeH2GCuopntnhBJAlI2AHo9CCh1I1QxUdAbqqGY9BBLwyc3W4wYVhvY8A4BoIc1l5M7vnPWphZW9/Ses3n37y9a0uGqFwFQZsQQbd386DogpgEk+dzynsAZMJXq8+ns9NeukJ0PYrNATGGefJQlhkLo7DTXr+y3bNiOsDvrXTz/C2q1DXZH84iRNwrP88Nj+u2DjYEE6RBxD9Knj16ujVHC67A7422o02RwD3gB+t7EblWvu9geOFxSnd3ROmT+nJyQkhoPlsxVONc/3TEdBos+jtA+ZzcwHgTvD1cDjaYCcItA8w9i88A8b+mqSjc6Pvqd998QguEQPmQMeo23ODN86+p0/bn1buBkT6+oBhNZ/PYY4ZAHYb3PRd4LkZmPX68NRtMZn4ASvdA+qf0jMA5MP9eeg28Nug9QiLnj5A33U1MAES6xHAUNpz/9zFAYE1gqQDMT3G6xI9pwdw/aIgKoHCS1YGlRnSq9yCjdXjgN3j+N27YyROHxmuNAeNKPpYuXIyIyMjYy0M8eros59MF/PT2c602T7eA7zvhJ9dr/vzDjXaLp4Yc5+0wllzxzHv3gdmMMM7/CcQzKgVBqYTmFn+Z+mKm8J7k0A5F/jgCfjQ1WBhQyiOqD0lYuqBb+AyzMw9Ha2G3m6c8qQx+AlqnIceQp+Sb6i9UyQWbhr54+AjnZ0VzW2TAN0DmBT6PWmc6jDBE2PK2u+nF43dyP7Q0t1pOcX2fdRvH0mF2Q4JqN35rnHjVIeaXfIAVyUuw/aHCCiJy9iF5l1621zweI8KZrPZ9iJdb7DXJ3US0OSrtZ10imt7wHY7QesAzUMz1oZ3noB3qFJ/H18j97FYuw8QDN4oeKf30osvcSW2ExLo+VcbuAuo/sUIm8fMG9xocO3Ea19J9gFYivnHJ2KnyfovZlgW3v6ySx32abQiIyMjIyPjhlFDTLxpwIgFMnTp6A3g4IDKNY+stkwAMAoIAbasxBXqUWneSAWTMjt50lTqT29rFjvXohjsDNm2YPXDFlICmrJOZ3t6tHm8AiEAl0sCeLIIorIRt+cFbew/QRsoAXb4o1XSfoywzm0FTMAoYBNvLyFu8v8HpLBtD1iKgC17wHb7AI6d9wFbvguAIGTHd4E9wG7jgIyMjIyM+434c2R3HeV/Ffx6jtZu6ijl8h59T655jhR+rdHzDOP6beABCheb8O8/WFXeOyzgf5oAhVYnKxP7CwaAf1afJu8bSrhS6tdaXeGnrRenOqOlz9d6QwYnA/3TLd+GE7qe3chA5YF5DfY0vK3adfOX/gyNp2BW25MHdxAB9qvRiiP3/XpQQFGYDU4+Mi///XumXG8pjvaUAOsBGlf4jJt+YYEzeEzAdw06F19R3juM7D1wita86GR0CKfDHgLuXCc4Bri6vMLdfjMc4VNSUNsdodo2xu/1+Xl/K5+az8jIyMhYG/z5gJTMF1GtKq/a3rpyCvz5gJTMl9GtKq/a3rpyCmfQ4WwZmS+kXFVetb115ST48wEf/AGcfG1iw+tWbpbS2vJ3nQxcVr3lH3z5h972FUTLzYpOVk7l5hD+eYcYwDcAnewOotrZ4OtrPDucqi/LRX0/RR4qx7Nn4U8g+qjffvuN6Gf+nC85vwauHjaYyubqvWYKY4VEfSUMitdnBCT1Ue63R5439m+OgCn6DroAAaHPVQxKth/wkJgHmG8bmQMsT0D6EjDfvhVRKO3ywOQUgRA7nmL1uawZmHf1k+DPBwQ6NdcJ+k6Md1LA5f5ONdhJ8vZ5J0vLHT99srkGOjmJbd/G1r2Nriqnse1AZt1AalU5jW2HsuuG0qvKGRkZGRkZGRG0gcONyXsP9v8D0/IdJADiBNiXl3327WRGgOL/9HC/0XwlIURkRhC4tz6Z/fu7fUf2gHvfB9z3u0BGRkZGRkbGplHcnkgguQoSqtUXuhbs/wPtMwqV0HUJAvj5vk32b8IDuL23yn7qAXZ5u32hbRX7d3o82Df1FZXvbh9QOfhyxldr/+3xgXU9oKmvsHyr7F/XA269/eveBXrsv7N9QALe/tvjA0kPWAXGbvebkbHn+D/J5nMcHzx1UAAAAABJRU5ErkJggg==);\
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
		border:1px dotted black;\
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
	/* position: relative prevents IE scroll bug\
	   (element with position: relative inside container with overflow: auto appear as "fixed") */\
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
	  background: black;\
	}\
	.jquery-msg-content {\
	  -webkit-background-clip: padding-box;\
	  padding: 15px;\
	  font-size: 11pt;\
	}\
	.black-on-white .jquery-msg-content {\
	  background: white;\
	  color: #333333;\
	  -moz-opacity: 0.9;\
	  -khtml-opacity: 0.9;\
	  opacity: 0.9;\
	  filter: alpha(opacity=90);\
	  -webkit-box-shadow: 5px 5px 30px 0 black;\
	  -moz-box-shadow: 5px 5px 30px 0 black;\
	  box-shadow: 5px 5px 30px 0 black;\
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
	  background: black;\
	  color: white;\
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
	.jewel {\
		padding : 1px;\
		font-size: 8pt !important;\
	}\
	.small-font {\
		font-size: 8pt !important;\
	}\
	div.short {\
		height:7px;\
	}\
	.wrap {\
		white-space: normal !important;\
	}\
	.nowrap {\
		white-space: nowrap !important;\
	}\
	.' + UID['hiding'] + ' {\
		padding-left: 10px;\
		padding-right: 10px;\
		margin-right: -2px;\
		border-radius: 2px;\
		-moz-border-radius: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.' + UID['defending'] + ' {\
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
	.' + UID['main-box'] + ' .ui-dialog-content {\
		padding:2px !important;\
		overflow:hidden !important;\
	}\
	.' + UID['main-box'] + ' h1 {\
		display: inline-block;\
		font-size : 12pt;\
		font-weight: bold;\
	}\
	.' + UID['main-box'] + ' h2 {\
		display: inline-block;\
		font-size : 11pt;\
		font-weight: bold;\
	}\
	.' + UID['main-box'] + ' h3 {\
		display: inline-block;\
		font-size : 10pt;\
		font-weight: bold;\
	}\
	.' + UID['main-box'] + ' h4 {\
		display: inline-block;\
		font-size : 9pt;\
		font-weight: bold;\
	}\
	.' + UID['main-box'] + ' h5 {\
		display: inline-block;\
		font-size : 8pt;\
		font-weight: bold;\
	}\
	.' + UID['main-box'] + ' h6 {\
		display: inline-block;\
		font-size : 7pt;\
		font-weight: bold;\
	}\
	.' + UID['main-box'] + ' .ui-accordion h1,\
	.' + UID['main-box'] + ' .ui-accordion h2,\
	.' + UID['main-box'] + ' .ui-accordion h3,\
	.' + UID['main-box'] + ' .ui-accordion h4,\
	.' + UID['main-box'] + ' .ui-accordion h5,\
	.' + UID['main-box'] + ' .ui-accordion h6\
	{\
		display: block;\
	}\
	.' + UID['main-box'] + ' .ui-accordion *\
	{\
		font-size : 9pt;\
	}\
	.' + UID['main-box'] + ' ul.tabs {\
		overflow: hidden;\
		display: block;\
		height: 25px;\
		list-style: none;\
		margin: 0;\
		padding: 0;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab {\
		display: inline-block;\
		float: left;\
		cursor:pointer !important;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a {\
		border-bottom: 0;\
		border-left: 0;\
		font-weight: bold;\
		display: block;\
		height: 16px;\
		margin-top: 6px;\
		padding: 2px 9px 3px 8px;\
		position: relative;\
		text-decoration: none;\
		cursor:pointer;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.first a {\
		border-left-width: 1px;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a.selected {\
		-webkit-box-shadow: rgba(0,0,0,0.6) 1px 0px 1px;\
		-moz-box-shadow: rgba(0,0,0,0.6) 1px 0px 1px;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);\
	}\
	.' + UID['main-box'] + ' div.container {\
		height: auto;\
		width: 100%;\
		overflow-x: auto;\
	}\
	.' + UID['main-box'] + ' div.container ul.tabs li.tab a {\
		height: 13px;\
	}\
	.' + UID['main-box'] + ' div.container ul.tabs li.tab a.selected {\
	}\
	.' + UID['title'] + ' {\
		font-weight:bold;\
		padding-top:2px;\
		padding-bottom:2px;\
		text-align:center;\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	.' + UID['main-box'] + ' .ui-dialog-title *,\
	.' + UID['title'] + ' * {\
		display: inline-block !important;\
		font-style: normal !important;\
		font-size: 10pt !important;\
		font-weight: bold;\
		line-height: 10pt !important;\
		text-decoration: none !important;\
		padding: 0;\
	}\
	.' + UID['subtitle'] + ' {\
		font-weight:bold;\
		padding-top:2px;\
		padding-bottom:2px;\
		text-align:center;\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	.' + UID['content'] + ' {\
		padding-left:3px;\
		padding-right:3px;\
		padding-top:2px;\
		padding-botom:1px;\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.' + UID['status_ticker'] + ' {\
		padding:2px;\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.' + UID['status_report'] + ' {\
		height: 106px;\
		max-height: 106px;\
		overflow:auto;\
	}\
	.' + UID['status_feedback'] + ' {\
		padding-top: 5px;\
		padding-right: 5px;\
		padding-bottom: 0.5em;\
		padding-left: 5px;\
		height: 34px;\
		text-align:left;\
		font-weight:bold;\
		border-radius: 3px;\
		-moz-border-radius: 3px;\
	}\
	table.' + UID['table'] + ' tr td,\
	table.' + UID['compact_table'] + ' tr td,\
	table.' + UID['table_console'] + ' tr td {\
		border: none;\
		background-color : transparent;\
		white-space: nowrap;\
		vertical-align: top;\
		padding: 1px 1px;\
		cursor: default;\
	}\
	table.' + UID['hide_inputbox'] + ' tr td {\
		padding-bottom: 0px;\
		padding-right: 0px;\
	}\
	table.' + UID['table'] + ' tr td {\
		padding: 1px 4px;\
	}\
	table.' + UID['table'] + ' tr td.right,\
	table.' + UID['compact_table'] + ' tr td.right,\
		font-weight:bold;\
		text-align:right;\
		padding-right: 5px;\
	}\
	table.' + UID['table_console'] + ' tr td {\
		white-space: normal !important;\
	}\
	.' + UID['underline'] + ' {\
		background-color : transparent;\
		padding: 1px 4px 1px 4px;\
	}\
	table.' + UID['table'] + ' tr th,\
	table.' + UID['compact_table'] + ' tr th,\
	table.' + UID['compact_console'] + ' tr th,\
	table tr.' + UID['row_top_headers'] + ' td\
	{\
		font-weight:bold;\
		text-align:center;\
		line-height:11pt;\
		padding: 1px 3px 1px 3px;\
	}\
	tr.' + UID['row_marchOther'] + ' td {\
		color:#888888;\
	}\
	tr.' + UID['row_marchMine'] + ' td {\
		color:#000000;\
	}\
	tr.' + UID['row_owned'] + ' {\
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
		width:130px;\
		padding-top:1px;\
		padding-bottom:1px;\
		color:white;\
		font-weight:bold;\
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
	input.thin {\
		width: auto !important;\
		margin:0;\
		padding-top:0;\
		padding-bottom:0;\
		padding-left:2px;\
		padding-right:2px;\
		font-size:8pt;\
	}\
	input.short {\
		width:30px !important;\
	}\
	.' + UID['main-box'] + ' input[type=text] {\
		border: 1px solid #888;\
		border-radius: 2px;\
		text-align: right;\
		-moz-border-radius: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-moz-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;\
	}\
	.' + UID['main-box'] + ' input[type=text]:active,\
	.' + UID['main-box'] + ' input[type=text]:focus {\
		-webkit-box-shadow: rgba(0,0,0,0.5) 1px 1px 4px inset;\
		-moz-box-shadow: rgba(0,0,0,0.5) 1px 1px 4px inset;\
	}\
	.' + UID['hide_inputbox'] + ' input[type=text] {\
		-webkit-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-moz-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;\
	}\
	.' + UID['main-box'] + ' select {\
		margin : 0 !important;\
	}\
	.ui-widget-content select {\
		font-size : 8pt !important;\
	}\
	table.' + UID['table'] + ' input[type=text],\
	table.' + UID['compact_table'] + ' input[type=text]\
	{\
		padding-top : 0px;\
		padding-bottom : 0px;\
	}\
	.' + UID['bold_red'] + ' {\
		font-weight:bold;\
	}\
	hr.thin {\
		margin:2px 0px;\
		padding:0px;\
		opacity:0.9px;\
	}\
	.' + UID['map-viewer-box'] + ' .ui-dialog-content {\
		margin			: 0 !important;\
		padding			: 0 !important;\
		overflow		: hidden !important;\
	}\
	.' + UID['map-viewer'] + ' {\
		display			: block;\
		width			: 750px;\
		height			: 750px;\
		white-space		: pre;\
		font-family		: Lucida Console, Andale Mono, Courier New, Courier, monospace;\
		font-size		: 1px;\
		font-stretch	: ultra-expanded;\
		cursor			: default;\
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
	.' + UID['main-box'] + ' div::-webkit-scrollbar {\
		width: 1.2em;\
		height: 1.2em;\
		 -webkit-border-radius: 1ex;\
	}\
	').appendTo("head");
	
	
	
/** Add Color Theme CSS Styles 
******************************/
$J("<style>").append('\
	.jewel {\
		color: #777 !important;\
	}\
	.' + UID['hiding'] + ' {\
		background-color: rgb(0,160,110);\
		color: white;\
	}\
	.' + UID['defending'] + ' {\
		background-color: rgb(184,0,46);\
		color: white;\
	}\
	.' + UID['main-box'] + ' ul.tabs {\
		border-bottom: 1px solid #898989;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a {\
		background-color: rgb(235,238,245);\
		color: #333;\
		border: 1px solid #898989;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a.selected {\
		background-color: rgb(60,90,150);\
		border-top-color: #3B5998;\
		border-bottom-color: #3B5998;\
		border-left-color: #5973A9;\
		border-right-color: #5973A9;\
		color: white;\
	}\
	.' + UID['main-box'] + ' div.container ul.tabs li.tab a {\
		background-color: rgb(241,241,241);\
	}\
	.' + UID['main-box'] + ' div.container ul.tabs li.tab a.selected {\
		background-color: rgb(110,132,181);\
	}\
	.' + UID['title'] + ' {\
		background-color: rgb(60,90,150);\
		color: #ffffff;\
		border : 1px solid;\
		border-color : #ffffff;\
	}\
	.' + UID['main-box'] + ' .ui-dialog-title *,\
	.' + UID['title'] + ' * {\
		color: #ffffff !important;\
	}\
	.' + UID['subtitle'] + ' {\
		border:1px solid;\
		border-color:#ffffff;\
		color:#ffffff;\
		background-color: rgb(60,60,60);\
	}\
	.' + UID['content'] + ' {\
		border:1px solid rgb(255,200,50);\
		background-color: rgb(245,245,228);\
	}\
	.' + UID['status_ticker'] + ' {\
		border:1px solid #995;\
		background-color: rgba(239,239,224,0.9);\
	}\
	.' + UID['status_feedback'] + ' {\
		border: 1px solid #ddd;\
		background-color: rgba(255,235,235,0.9);\
	}\
	.' + UID['underline'] + ' {\
		border-bottom:1px solid #ccc;\
	}\
	table.' + UID['table'] + ' tr th,\
	table.' + UID['compact_table'] + ' tr th,\
	table.' + UID['compact_console'] + ' tr th,\
	table tr.' + UID['row_top_headers'] + ' td\
	{\
		color: white;\
		background-color: rgb(110,115,125);\
		border-right: 2px solid #eef;\
	}\
	table tr.' + UID['row_top_headers'] + ' td {\
		background-color: rgb(90,95,115);\
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
		border: 1px solid #333;\
	}\
	.' + UID['main-box'] + ' input[type=button] {\
		background-color: #39D;\
		border-color: #39D #39D #28C;\
		text-shadow: -1px -1px 0 #39D;\
		-webkit-text-shadow: -1px -1px 0 #39D;\
	}\
	.' + UID['main-box'] + ' input[type=button]:hover {\
		background-color: rgb(40,150,210);\
		box-shadow: rgb(34, 136, 204) 0px 0px 5px 0px;\
		-webkit-box-shadow: rgb(34, 136, 204) 0px 0px 5px 0px;\
	}\
	input.' + UID['btn_on'] + ',\
	input.' + UID['bnt_green'] + ' {\
		background-color: rgb(0,160,110) !important;\
		border-color: #3eddab #3eddab #30a580 !important;\
		text-shadow: -1px -1px 0 #3eddab !important;\
		-webkit-text-shadow: -1px -1px 0 #3eddab !important;\
	}\
	input.' + UID['btn_on'] + ':hover,\
	input.' + UID['bnt_green'] + ':hover {\
		background-color: rgb(0,200,150) !important;\
		box-shadow: #11d899 0px 0px 5px 0px !important;\
		-webkit-box-shadow: #11d899 0px 0px 5px 0px !important;\
	}\
	input.' + UID['btn_off'] + ',\
	input.' + UID['bnt_red'] + ',\
	.' + UID['main-box'] + ' input[type=button][disabled] {\
		background-color: rgb(184,0,46) !important;\
		border-color: #c64162 #c64162 #a33750 !important;\
		text-shadow: -1px -1px 0 #c64162 !important;\
		-webkit-text-shadow: -1px -1px 0 #c64162 !important;\
	}\
	input.' + UID['btn_off'] + ':hover,\
	input.' + UID['bnt_red'] + ':hover,\
	.' + UID['main-box'] + ' input[type=button][disabled]:hover {\
		background-color: rgb(200,50,100) !important;\
		box-shadow: #d34a6a 0px 0px 5px 0px !important;\
		-webkit-box-shadow: #d34a6a 0px 0px 5px 0px !important;\
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
	.' + UID['main-box'] + ' input[type=text]:active,\
	.' + UID['main-box'] + ' input[type=text]:focus {\
		border-color: #000;\
	}\
	.' + UID['hide_inputbox'] + ' input[type=text] {\
		border: 1px solid rgba(0,0,0,0.4);\
		background-color: rgba(255,255,255,0.3);\
	}\
	.' + UID['bold_red'] + ' {\
		color:#550000;\
	}\
	.' + UID['map-viewer'] + ' {\
		color			: #000;\
		border			: 1px solid #666;\
		background-color: #8A8;\
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
	.' + UID['main-box'] + ' div::-webkit-scrollbar-thumb {\
		border: 1px solid #999;\
		background: #bbb -webkit-gradient(\
			linear,\
			right top,\
			left top,\
			color-stop(0, rgb(190,190,190)),\
			color-stop(1, rgb(250,250,250))\
		);\
		-webkit-border-radius: 1ex;\
		-webkit-box-shadow: 1px 1px 3px rgba(0, 0, 0, .4);\
	}\
	.' + UID['main-box'] + ' div::-webkit-scrollbar-thumb:hover {\
		border: 1px solid #999;\
		background: #bbb -webkit-gradient(\
			linear,\
			right top,\
			left top,\
			color-stop(0, rgb(160,160,160)),\
			color-stop(1, rgb(230,230,230))\
		);\
	}\
	.' + UID['main-box'] + ' div::-webkit-scrollbar-track {\
		-webkit-box-shadow: 1px 1px 5px rgba(100,100,100,0.4) inset, -1px -1px 1px rgba(150,150,150,0.9) inset;\
		-webkit-border-radius: 1ex;\
	}\
	.' + UID['main-box'] + ' div::-webkit-scrollbar-track:hover {\
		-webkit-box-shadow: 1px 1px 5px rgba(100,100,100,0.7) inset, -1px -1px 1px rgba(150,150,150,0.9) inset;\
	}\
	/* jQuery UI */\
	.ui-widget-content\
	{\
		border: 1px solid #dddddd;\
		background-color: rgba(185,190,200,0.7);\
		color: #303030;\
	}\
	.ui-widget-content a\
	{\
		color: #303030;\
	}\
	.ui-widget-header\
	{\
		border: 1px solid #777777;\
		background-color: rgba(30,30,30,0.9);\
		color: #ffffff;\
		font-weight: bold;\
	}\
	.ui-widget-header a\
	{\
		color: #ffffff;\
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
		border: 1px solid #999999;\
		background-color: #666666;\
		font-weight: bold;\
		color: #ffffff;\
	}\
	.ui-state-default a,\
	.ui-state-default a:link,\
	.ui-state-default a:visited\
	{\
		color: #ffffff;\
		text-decoration: none;\
	}\
	.ui-state-hover,\
	.ui-widget-content .ui-state-hover,\
	.ui-widget-header .ui-state-hover\
	{\
	}\
	.ui-state-hover a,\
	.ui-state-hover a:hover\
	{\
		color: #ffffff;\
		text-decoration: none;\
	}\
	.ui-state-active,\
	.ui-widget-content .ui-state-active,\
	.ui-widget-header .ui-state-active\
	{\
		border: 1px solid #999999;\
		background-color: #3F5E9D;\
		font-weight: bold;\
		color: #ffffff;\
	}\
	.ui-state-active a,\
	.ui-state-active a:link,\
	.ui-state-active a:visited\
	{\
		color: #ffffff;\
		text-decoration: none;\
	}\
	.ui-widget :active\
	{\
		outline: none;\
	}\
	/* Interaction Cues\
	----------------------------------*/\
	.ui-state-highlight,\
	.ui-widget-content .ui-state-highlight,\
	.ui-widget-header .ui-state-highlight\
	{\
		border: 1px solid #fed22f;\
		background-color: #ffe45c;\
		color: #363636;\
	}\
	.ui-state-highlight a,\
	.ui-widget-content .ui-state-highlight a,\
	.ui-widget-header .ui-state-highlight a\
	{\
		color: #363636;\
	}\
	.ui-state-error,\
	.ui-widget-content .ui-state-error,\
	.ui-widget-header .ui-state-error\
	{\
		border: 1px solid #cd0a0a;\
		background-color: #b81900;\
		color: #ffffff;\
	}\
	.ui-state-error a,\
	.ui-widget-content .ui-state-error a,\
	.ui-widget-header .ui-state-error a\
	{\
		color: #ffffff;\
	}\
	.ui-state-error-text,\
	.ui-widget-content .ui-state-error-text,\
	.ui-widget-header .ui-state-error-text\
	{\
		color: #ffffff;\
	}\
	.ui-widget-overlay\
	{\
		background-color: #666666;\
	}\
	.ui-widget-shadow\
	{\
		background-color: #000000;\
	}\
	/* jQuery UI Selectable 1.8.16 */\
	.ui-selectable-helper\
	{\
		border:1px dotted black;\
	}\
	/* jQuery UI Dialog 1.8.16  */\
	.ui-dialog .ui-dialog-title {\
		color				: rgba(255,255,255,0.8);\
	}\
	.ui-dialog .ui-dialog-titlebar-close {\
		background-color : rgba(0,0,0,0.3);\
		border		: 1px solid transparent;\
	}\
	.ui-dialog .ui-dialog-titlebar-close:hover,\
	.ui-dialog .ui-dialog-titlebar-close:focus\
	{\
		background-color 	: #CC334D;\
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
	 USER_TIME;

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
	SERVER_ID	 = ( /realm(\d+)\./.exec( API_SERVER ) || ['',''] )[1];
}

getFlashvars();


/************************
**   scriptStartUp
*************************/

console.log( SCRIPT_NAME + ' Startup in : ' + timeFormat( SCRIPT_STARTUP_DELAY / 1000 ) );

var STARTUP_TIMER;

function scriptStartUp()
{
	try {
		
		/**  Data Initialization
		***************************************/
		Data.init ( { data_version : '' } );

		// Verify that the version of the script data structure is the same as the version stored
		if ( Data.data_version === undefined || Data.data_version !== DATA_VERSION	) {
			// Clears all stored data structure because the data version is different
			Data.clearStorage();
			Data.data_version = DATA_VERSION;
		}
		
		// Init Defaults Options
		Data.init ({
			options		: {
				api_version		: API_VERSION,
				main_box		: { draggable:true, x:0, y:0 },
				verbose_log		: { enabled:false },
				debug_mode		: DEBUG_TAB_ENABLE,
				current_tab		: false,

				jobs_tab		: 0,
				train_tab		: 0,

				attacks		: { 
					 enabled				: false
					,current_tab			: 0
					,level_enable			: ['',0,0,0,0,0,0,0,0,0,0,0]
					,level_dist				: ['',14,14,14,14,14,14,14,14,14,14,14]
					,max_marches			: 0
					,abandon_wildernesses	: false
					,clear_all_targets		: false
					,delete_reports			: false
					,log_attacks			: true
					,recall_encamped		: true
					,stop_on_loss			: true
					,marches_details		: true
					,units					: []
					
					/*
					* WARNING: Changing this values cause too many requests to the server 
					*          that are monitored. Thats gives them reason to increase the security 
					*          on the servers and, sooner or later, make this scripts unusable.
					*            
					*      PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
					*
					*                   ( We will end up losing everyone )
					*/
					,delay_min				: 25
					,delay_max				: 40
				},
				
				jobs			: {
					current_tab			: 0
				},
				
				building		: { 
					 enabled			: false
					,current_tab		: 0
					,city				: [{},{},{},{},{},{}] /* for future use */
					,level_enable		: [{},{},{},{},{},{}]
					,level_cap			: [{},{},{},{},{},{}]
				},
				
				research	: {
					 enabled			: false
					,current_tab		: 0
					,city				: [{},{},{},{},{},{}] /* for future use */
					,level_enable		: {}
					,level_cap			: {}
				},
				
				training		: {
					 enabled			: false
					,current_tab		: 0
					,city				: [
						 { units : {}, cap : {} }
						,{ units : {}, cap : {} }
						,{ units : {}, cap : {} }
						,{ units : {}, cap : {} }
						,{ units : {}, cap : {} }
						,{ units : {}, cap : {} }
					]
					,mode				: 'min_housing'
				},
				
				map				: {
					 selected			: 'AnthropusCamp'
					,radius				: 14
					,x					: 0
					,y					: 0
				},
				
				waves			: {
					 enabled			: false
					,current_tab		: 0
					,stop_on_loss		: true
					,delete_reports		: false
					,delay_min			: 25
					,delay_max			: 40
					,units 				: {}
					,dragons			: {}
					,target	: {
						 x		: 0
						,y		: 0
						,type	: ''
						,level	: 0
					}
				},
				
				messages		: { last_read:0, missing:0 },

				train_jobs		: [],
				build_jobs		: [],
				research_jobs	: [],
				
				auto_collect	: { enabled:false, last_time:0, delay:1, unit:3600 },
				
				auto_refresh	: { enabled:false, last_time:0, delay:15 }
			},
			
			stats	: {
				 start_at		: 0
				,run_time		: 0
				,attacks		: 0
				,items			: {}
				,resources		: {}
				,levels			: [
					 '' /* the index zero is not used because the levels are from 1 to 11 */
					,{attacks:0, items:{}, resources:{}}
					,{attacks:0, items:{}, resources:{}}
					,{attacks:0, items:{}, resources:{}}
					,{attacks:0, items:{}, resources:{}}
					,{attacks:0, items:{}, resources:{}}
					,{attacks:0, items:{}, resources:{}}
					,{attacks:0, items:{}, resources:{}}
					,{attacks:0, items:{}, resources:{}}
					,{attacks:0, items:{}, resources:{}}
					,{attacks:0, items:{}, resources:{}}
					,{attacks:0, items:{}, resources:{}}
				]
				,waves	: {
					 start_at		: 0
					,run_time		: 0
					,attacks		: 0
					,spoils			: {}
				}
			},
			
			requests: {
				 start_at	: 0
				,run_time	: 0
				,abandon 	: {total:0,errors:0}
				,building	: {total:0,errors:0}
				,cities		: {total:0,errors:0}
				,collect	: {total:0,errors:0}
				,generals	: {total:0,errors:0}
				,manifest	: {total:0,errors:0}
				,map		: {total:0,errors:0}
				,marches	: {total:0,errors:0}
				,msg_delete	: {total:0,errors:0}
				,msg_read	: {total:0,errors:0}
				,player		: {total:0,errors:0}
				,recalls	: {total:0,errors:0}
				,reports 	: {total:0,errors:0}
				,research	: {total:0,errors:0}
				,training	: {total:0,errors:0}
			},
		});
		
		
		// Check if the language of the game is different from the browser and Sets
		if ( LOCALE != LANG_CODE && Data.options.use_locale === undefined ) {
			dialogBox({
				id		  : setUID('dialog-confirm'),
				centerTo  : SWF_OBJECT,
				title	  : 'Language Selector',
				html	  : 'The language of the game is different <br> from the language of your browser.<br><br>'
						  + 'Do you want to use the language of the game <br> instead of your browser?',
				buttons   : [
					{
						text: 'Yes',
						click: function() {
							Data.options.use_locale = true;
							setLanguage(LOCALE);
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
		if ( Data.options.use_locale === undefined ) {
			Data.options.use_locale = false;
		} else if ( Data.options.use_locale === true ) {
			setLanguage(LOCALE);
		}
		
		
		// Check API VERSION & Fix it
		/*
		if ( API_VERSION > Data.options.api_version )
		{
			Data.options.api_version = API_VERSION;
		}
		else if( API_VERSION < Data.options.api_version ) {
			API_VERSION = Data.options.api_version;
			actionLog( 'API_VERSION CHANGED!!!, NOW IS: <b>' + API_VERSION +'</b>');
			console.log( 'API_VERSION CHANGED!!!, Now is: ' + API_VERSION );
		}
		*/
		
		verboseLog( 'Data Structure v' + DATA_VERSION );
		
		
		// Set Debug Mode from localStorage
		// This changed with the hotkey is Ctrl + Alt + Shift + D)
		if ( Data.options.debug_mode )
		{
			DEBUG_TAB_ENABLE = DEBUG_MARCHES = Data.options.debug_mode;
			Tabs.Debug.tab_disabled = !DEBUG_TAB_ENABLE;
		}
		
		
		/**  Check basic initialization
		***************************************/
		function stepStarting ( current_step, retry )
		{

			var retry = retry || 0;
			var wait_time = Math.randRange(1500, 2500);
			var error_msg;
			
			StepTimeBar.update ( current_step );
			
			switch ( current_step ) 
			{
			/**  Translation Initialization
			***************************************/
			case 1:
				Translation.init (function (r) {
					if ( r.ok )
					{
						var message = 'Translation Matrix Successfully initialised';
						verboseLog ( message );
						console.log ( message );
						STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step + 1  );
						
						//This is only for programming purposes
						/*
						var str = '"var_name";"translation"<br>';
						for (var i=0; i < Translation._section.length; i++){
							for (var_name in Translation.object[Translation._section[i]]){
								str +=  '"' + var_name + '";"' +Translation[Translation._section[i]]( var_name ) + '"<br>' ;
							}
						}
						debugLog ( str );
						*/
					} 
					else {
						// Rate Limit Exceeded
						if ( r.status === 509 )
						{
							wait_time = 600000;
							$startUpBox.append('<br><b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(wait_time/1000));
							verboseLog('<b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(wait_time/1000));
							STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step + 1  );
							return;
						}
						error_msg = r.errmsg;
						console.log('stepStarting:: Translation retry ' + retry);
						STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step, ++retry);
					}
				});
				break;
			
			/**  Manifest Initialization
			***************************************/
			case 2:
				Manifest.init (function (r) {
					if ( r.ok )
					{
						var message = 'Manifest Successfully initialised';
						verboseLog ( message );
						console.log ( message );
						STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step + 1  );
						/*
						if ( API_VERSION > Data.options.api_version) {
							Data.options.api_version = API_VERSION;
							$J.msg({ content : 'API_VERSION CHANGED!!!<br>NOW IS: <b>' + API_VERSION +'</b>' });
						}
						*/
					}
					else {
						// Rate Limit Exceeded
						if ( r.status === 509 )
						{
							wait_time = 600000;
							$startUpBox.append('<br><b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(wait_time/1000));
							verboseLog('<b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(wait_time/1000));
							STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step, ++retry);
							return;
						}
						// Wrong API Version
						/*
						else if( r.errmsg && r.errmsg[0] && /400/.test( r.errmsg.join() ) ){
							++API_VERSION;
							console.log('API VERSION:' + API_VERSION);
						}
						*/
						error_msg = r.errmsg;
						console.log('stepStarting:: Manifest retry ' + retry);
						STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step, ++retry);
					}
				});
				break;
			
			/**  Seed Initialization
			***************************************/
			case 3:
				Seed.init(function (r) {
					if ( r.ok )
					{
						var message = 'Seed Successfully initialised';
						verboseLog(message);
						console.log(message);
						STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step + 1  );
						/*
						if ( API_VERSION > Data.options.api_version) {
							Data.options.api_version = API_VERSION;
							$J.msg({ content : 'API_VERSION CHANGED!!!<br>NOW IS: <b>' + API_VERSION +'</b>' });
						}
						*/
					}
					else {
						// Rate Limit Exceeded
						if (r.status === 509)
						{
							wait_time = 600000;
							$startUpBox.append('<br><b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(wait_time/1000));
							verboseLog('<b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(wait_time/1000));
							STARTUP_TIMER = setTimeout(stepStarting, wait_time, current_step, ++retry);
							return;
						}
						// Wrong API Version
						/*
						else if( r.errmsg && r.errmsg[0] && /400/.test( r.errmsg.join() ) ){
							++API_VERSION;
							console.log('API VERSION:' + API_VERSION);
						}
						*/
						error_msg = r.errmsg;
						console.log('stepStarting:: Seed retry ' + retry);
						STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step, ++retry);
					}
				});
				break;
			
			/**  Seed Check Capital City
			***************************************/
			case 4:

				var city_id = null;
				// We make sure to first start the capital
				for ( var i=0; i < Seed.city_init.length; i++ )
				{
					if ( Seed.city_init[i].type == 'capital' )
					{
						city_id = Seed.city_init[i].id;
					}
				}
				
				// Fix progress bar steps
				StepTimeBar.steps = current_step + Seed.city_init.length;
				
				Seed.fetchCity ( city_id, function(r) {
					if ( r.ok )
					{
						
						wait_time = Math.randRange(5000,7000);
						
						// Fix progress bar total time to initialize the cities
						StepTimeBar.totalTime += wait_time;
			
						// Waiting time increases three times to prevent detection of the server
						STARTUP_TIMER = setTimeout(  stepStarting, wait_time, current_step  + 1);
					}
					else {
						// Rate Limit Exceeded
						if ( r.status === 509 )
						{
							wait_time = 600000;
							$startUpBox.append('<br><b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(wait_time/1000));
							verboseLog('<b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(wait_time/1000));
							STARTUP_TIMER = setTimeout(stepStarting, wait_time, current_step, ++retry);
							return;
						}
						error_msg = r.errmsg;
						console.log('stepStarting:: Seed retry ' + retry);
						STARTUP_TIMER = setTimeout(stepStarting, wait_time, current_step, ++retry);
					}
				});
				break;
				
			/**  Seed Check Outpost Cities
			***************************************/
			case 5:
			
				for ( var i=0; i < Seed.city_init.length; i++ )
				{
					if ( Seed.city_init[i].loaded ) {
						continue;
					}
					
					if ( Seed.city_init[i].timer ) {
						clearTimeout( Seed.city_init[i].timer );
					}
					
					var current_index = i;
					
					var city_id = Seed.city_init[i].id;
					Seed.fetchCity ( city_id, function(r) {
						if ( r.ok )
						{
							wait_time = Math.randRange(5000,7000);
						
							if ( current_index == Seed.city_init.length - 1 ){
								wait_time = 1500;
							}
							
							// Fix progress bar total time to initialize the cities
							StepTimeBar.totalTime += wait_time;
							
							// Waiting time increases three times to prevent detection of the server
							STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step);
						}
						else {
							// Rate Limit Exceeded
							if ( r.status === 509 )
							{
								wait_time = 600000;
								$startUpBox.append('<br><b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(wait_time/1000));
								verboseLog('<b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(wait_time/1000));
								STARTUP_TIMER = setTimeout(stepStarting, wait_time, current_step, ++retry);
								return;
							}
							error_msg = r.errmsg;
							console.log('stepStarting:: Seed retry ' + retry);
							STARTUP_TIMER = setTimeout(stepStarting, wait_time, current_step, ++retry);
						}
					});
					
					return;
				}
				
				StepTimeBar.stop();
				startPowerTools();
				return;
				break;
			}
			
			// Retries Limit
			if ( ++retry > 200 )
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
			var width = Math.randRange(490, 495);
			if ( Data.options.main_box.x < 1 ) 
			{
				Data.options.main_box.x = parseInt( document.body.offsetWidth - ( document.body.offsetWidth - 760 ) / 2 - width / 2) ;
			}
			
			$main_box = dialogBox({
				id			: setUID('dialog-main-box'),
				dialogClass	: UID['main-box'],
				position	: [Data.options.main_box.x, Data.options.main_box.y],
				width		: width,
				height		: Math.randRange(785, 790),
				draggable	: Data.options.main_box.draggable,
				title		: 'v' + SCRIPT_VERSION,
				buttons		: {},
				close		: function (){
								tabManager.hideTab();
							},
				dragStop	: function ( event, ui ) {
								var offset = $J( event.target ).offset();
				//Data.options.main_box.x = document.body.offsetWidth - offset.left - $J(event.target).outerWidth();
				Data.options.main_box.x = offset.left;
				Data.options.main_box.y = offset.top-24;
							}
			});
			
			// Create all the tabs and insert them into the main Popup
			tabManager.init( $main_box );
			tabManager.showTab();
			
			// Start event listeners to look for an unload event from Data Storage			
			window.addEventListener( 'unload', Data.onUnload, false );
			
			// HotKeys
			// Debug Mode (Ctrl + Alt + Shift + D)
			shortcut.add('Ctrl+Alt+Shift+D', function(event){
				Data.options.debug_mode = !Data.options.debug_mode;
				DEBUG_TAB_ENABLE = DEBUG_MARCHES = Data.options.debug_mode;
				Tabs.Logs.tabDebugToggle();
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

	RequestDOA : function ( url, method, params, callback )
	{
		new MyAjax.Request (API_SERVER + '/' + url, {
			useSignature: (method.toUpperCase() === 'POST'),
			method		: method.toUpperCase(),
			params		: params,
			timeoutSecs	: 45,
			
			onSuccess	: function( r )
			{
				if ( r.status === 200 && r.responseText )
				{
					if ( url.indexOf('.xml') !== -1 ) {
						callback( {ok:true, dat:r.responseText} );
					} 
					else {
						var data;
						try {
							data= JSON.parse( r.responseText );
						} catch (e) {}
						
						callback( {ok:true, dat:data} );
					}
				} 
				else {
					callback( {ok:false, errmsg:'The request was successful but no data was returned'} );
				}
			},
		
			onFailure	: function( r )
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
				
				callback( res );
			},
			
			on403 : function(r) 
			{
				dialogError('<b>' + FATAL_SEED_TITLE + '</b>'
					+'<br><br>'
					+'<font color="#C00"><b> ' + r.statusText + '</b></font>'
					+'<br><br>'
					+'<b>Previous Requirements</b><br>'
					/* This will activate again when it works in firefox
					+'<b>FIREFOX</b>'
					+'<ul>'
					+'<li>Download and install <a href="https://addons.mozilla.org/es-ES/firefox/addon/refcontrol/">RefControl</a></li>'
					+'<li>Once installed click Tools - RefControlOptions</li>'
					+'<li>Click Add Site and type in wonderhill.com</li>'
					+'<li>Check the Block - Send no referer radio box</li>'
					+'<li>Click OK and then OK again</li>'
					+'</ul>'
					+'<br>'
					*/
					+'<b>CHROME</b>'
					+'<ul>'
					+'<li>Right click on your "Chrome" icon (either on your Desktop or your Taskbar)</li>'
					+'<li>Choose properties</li>'
					+'<li>At the end of your target line, place these parameters: --no-referrers</li>'
					+'<li>Click OK</li>'
					+'</ul>'
					+'<br><br>'
					+'<a id="' + UID['support_link'] + '" href="" target="_blank">Bugs and Known Issues</a><br>'
					+'<br>');
			},
			
			on509 : function( r )
			{
			/*
				dialogError('<b>ERROR 509</b><br><br>\
					<div style="text-align:center;">\
					<span style="color:#C00;font-size:12pt;"><b>Rate Limit Exceeded</b></span><br><br>\
					<b>This account maybe has been blocked momentarily.<br>\
					<br>TRY AGAIN LATER</b>\
					</div>');
			*/
			}
			
			
		});
	},
	
	Request : function ( url, options )
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
		params = typeof options === 'string' ? options.params : Object.toQueryString( options.params ).replace(/\_/g,'%5F');
			
		// Change Accept request header based on browser
		headers['Accept'] =  IS_CHROME ? '*/*' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
		
		// Add request header specific to POST request only
		if ( options.useSignature )
		{
			headers['content-type'] = 'application/x-www-form-urlencoded';
			headers['X-S3-AWS'] = SHA1( 'Dracunculiasis' + params + 'LandCrocodile' + url  + 'Bevar-Asp' );
		} 
		
		// Merge headers with option.headers
		//$J.extend(headers, options.headers || { });
		
		// Open Request
		if ( options.method === 'GET' ) {
			url += ( url.include('?') ? '&' : '?' ) + params;
		}
		request.open( options.method, url, true );
		
		// Add request headers to ajax request
		for ( h in headers ) {
			request.setRequestHeader( h, headers[h] );
		}
		
		// Start timeout check before request is sent
		if ( options.timeoutSecs )
		{
			timeout = setTimeout( function() {
				request.abort();
				if ( options.onFailure )
				{
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
		request.send( options.method === 'POST' ? params : null );
	},
	
	
	// Use a json to wrap the building upgrade job
	buildingUpgrade : function ( city_id, building_id, callback )
	{
		var p = {};
		p['user_id']		= USER_ID;
		p['dragon_heart']	= DRAGON_HEART;
		p['_session_id']	= SESSION_ID;
		p['_method']		= 'put';
		p['version']		= API_VERSION;
		p['timestamp']		= parseInt(serverTime());
		
		var url 	= 'cities/' + city_id + '/buildings/' + building_id + '.json';
		var method	= 'POST';
		
		Data.requests.building.total++;
		
		new MyAjax.RequestDOA (url, method, p, function(r) {
			//debugLog ('BUILD RESPONSE:\n' + inspect (r, 10, 1));
			if ( r.ok && r.dat.result )
			{
				if( r.dat.result.success) {
					Seed.checkAddJob (r.dat.result.job );
				} else {
					r.ok = false;
					r.errmsg = r.dat.result.errors[0];
					Data.requests.building.errors++;
				}
			}
			
			if ( callback ) {
				callback ( r );
			}
		});
	},
	
	collectResources : function ( city_id, callback )
	{
		var p = {};
		p['user_id']		= USER_ID;
		p['timestamp']		= parseInt( serverTime() );
		p['_session_id']	= SESSION_ID;
		p['version']		= API_VERSION;
		p['dragon_heart']	= DRAGON_HEART;
		
		var url 	= 'cities/'+ city_id +'/move_resources.json';
		var method	= 'POST';
		
		Data.requests.collect.total++;
		
		new MyAjax.RequestDOA ( url, method, p, function(r) {
			if ( r.ok )
			{
				Seed.updateCity ( r.dat.city );
			}
			else if ( r.dat.result ) {
				//r.ok = false;
				r.errmsg = r.dat.result.errors[0];
				verboseLog('<b>Auto-Collect</b> Error: ' + r.msg);
				Data.requests.building.errors++;
			}

			if ( callback ){
				callback ( r.ok );
			}
		});
	},
	
	march_busy : 0,
	marchSend : function ( city_id, x, y, general_id, units, owner_id, callback )
	{
		var t = MyAjax;
		
		++t.march_busy;
		
		var u = {}
		var mt = false;
		var march_units = '{';
		for ( var pu in units )
		{
			if (units[pu] > 0) {
				u[pu] = units[pu];
				if ( mt === true ){
					march_units += ',';
				}
				march_units += '"' + pu + '":' + units[pu];
				mt = true;
			}
		}
		march_units += '}';
		
		// Initialise POST data
		var p = {};
		p['march[march_type]']	= 'attack';
		p['march[y]']			= y;
		p['timestamp']			= parseInt( serverTime() );
		p['march[units]']		= march_units;
		p['march[general_id]']	= general_id;
		p['version']			= API_VERSION;
		p['_method']			= 'post';
		p['dragon_heart']		= DRAGON_HEART;
		p['user_id']			= USER_ID;
		p['march[x]']			= x;
		p['_session_id']		= SESSION_ID;
		
		var url 	= 'cities/'+ city_id +'/marches.json';
		var method	= 'POST';
		
		Data.requests.marches.total++;
		
		// Send request
		new MyAjax.RequestDOA ( url, method, p, function(r) {
		
			--t.march_busy;
			
			verboseLog('MyAjax.marchSend< request was returned with a status of ' + r.ok );

			if ( r.ok && !r.dat.errors ) 
			{
				if ( r.dat.result && r.dat.result.success ) 
				{
					try {
						Seed.updateCity( r.dat.result.city );
						Seed.marches[r.dat.result.job.march_id].owner_id = owner_id;
					} catch (e) {
						debugLog ('***********'+ e);
					}
				}
				else if ( r.dat.result ) 
				{
					r.ok = false;
					r.errmsg = r.dat.result.reason;
				}
			}
			else if ( r.ok && r.dat.errors ) {
				r.ok = false;
				r.errmsg = r.dat.errors;
				Data.requests.marches.errors++;
			} 
			else {
				r.ok =false;
				Data.requests.marches.errors++;
			}
			
			r.status=r.status;
			
			if ( callback ){
				callback ( r );
			}
		});
	},

	// This looks really cool, if it works
	marchRecall : function ( city_id, march_id, callback){
		//var t = MyAjax;
		var p = {};
		//++t.march_busy;
		p['user_id']		= USER_ID;
		p['_session_id']	= SESSION_ID;
		p['_method']		= 'delete';
		p['dragon_heart']	= DRAGON_HEART;
		p['timestamp']		= parseInt(serverTime());
		p['version']		= API_VERSION;
		
		var url 	= 'cities/'+ city_id +'/marches/'+ march_id +'.json';
		var method	= 'POST';
		
		Data.requests.recalls.total++;
		
		new MyAjax.RequestDOA ( url, method, p, function(r) {
			//--t.march_busy;
			//debugLog ('MARCH RESPONSE:\n' + inspect (r, 10, 1));
			if ( r.ok && !r.dat.errors )
			{
				if ( r.dat.result && r.dat.result.success )
				{
					//debugLog (inspect (r, 9, 1));        
					Seed.updateCity( r.dat.result.city );
					//Seed.marches[r.dat.result.job.march_id].status = 'retreating';
				} 
				else if( r.dat.result )
				{
					r.ok = false;
					r.errmsg = r.dat.result.errors[0];
					Data.requests.recalls.errors++;
				}
			} 
			else if ( r.ok && r.dat.errors ) {
				r.ok = false;
				r.errmsg = r.dat.errors;
				Data.requests.recalls.errors++;
			}
			
			if ( callback ) {
				callback ( r );
			}
		});
	},
	

	messageDelete : function ( ids, callback )
	{
		var p = {}
		p['user_id']		= USER_ID;
		p['_method']		= 'delete';
		p['timestamp']		= parseInt( serverTime() );
		p['_session_id']	= SESSION_ID;
		p['ids']			= ids.join('|');
		p['dragon_heart']	= DRAGON_HEART;
		p['version']		= API_VERSION;
		
		var url 	= 'reports/bulk_delete.json';
		var method	= 'POST';
		
		Data.requests.msg_delete.total++;
		
		new MyAjax.RequestDOA (url, method, p, function(r) {
			if ( r.ok && r.dat.result && r.dat.result.success ) {
				r.ok = false;
			} 
			else if ( callback ) {
				callback ( null );
				Data.requests.msg_delete.errors++;
			}
		});
	},

	messageDetail : function ( id, callback )
	{
		var p = {}
		p['user_id']		= USER_ID;
		p['_session_id']	= SESSION_ID;
		p['version']		= API_VERSION;
		p['dragon_heart']	= DRAGON_HEART;
		p['timestamp']		= parseInt( serverTime() );
		
		var url 	= 'reports/'+ id +'.json';
		var method	= 'GET';
		
		Data.requests.msg_read.total++;
		
		new MyAjax.RequestDOA (url, method, p, function(r){
			if ( r.ok && r.dat.result && r.dat.result.success )
			{
				if ( callback ) {
					callback ( r.dat.result );
				}
			} 
			else if ( callback ) {
				callback ( null );
				Data.requests.msg_read.errors++;
			}
		});
	},
	
	messageList : function ( category, callback )
	{
		if ( !category ) {
			category = 'all';
		}
		var p = {}
		p['user_id']		= USER_ID;
		p['_session_id']	= SESSION_ID;
		p['version']		= API_VERSION;
		p['timestamp']		= parseInt( serverTime() );
		p['count']			= 12;
		p['page']			= 1;
		p['category']		= category;
		p['dragon_heart']	= DRAGON_HEART;
		
		var url 	= 'reports.json';
		var method	= 'GET';
		
		Data.requests.reports.total++;
		
		new MyAjax.RequestDOA (url, method, p, function(r){
			if ( r.ok && r.dat.result && r.dat.result.success )
			{
				if ( callback ){
					callback ( r.dat.result.report_notifications );
				}
			}
			else if ( callback ) {
				callback ( null );
				Data.requests.reports.errors++;
			}
		});
	},

	researchStart : function ( city_id, research_type, callback )
	{
		var t = MyAjax;
		var p = {};
		p['user_id']		= USER_ID;
		p['_method']		= 'post';
		p['timestamp']		= parseInt( serverTime() );
		p['_session_id']	= SESSION_ID;
		p['research[research_type]'] = research_type;
		p['dragon_heart']	= DRAGON_HEART;
		p['version']		= API_VERSION;
		
		var url 	= 'cities/'+ city_id +'/researches.json';
		var method	= 'POST';
		
		Data.requests.research.total++;
		
		new MyAjax.RequestDOA ( url, method, p, function(r) {
			//debugLog ('RESEARCH RESPONSE:\n' + inspect (r, 10, 1));
			if ( r.ok && r.dat.result ) 
			{
				if ( r.dat.result.success ) {
					Seed.updateCity ( r.dat.result.city );
					Seed.checkAddJob ( r.dat.result.job );
				}
				else {
					r.ok = false;
					r.errmsg = r.dat.result.errors[0];
					Data.requests.research.errors++;
				}
			}
			
			
			if ( callback ){
				callback ( r );
			}
		});
	},
	
	unitTraining : function ( unit_type, unit_quantity, city_id, callback )
	{
		var p = {};
		p['user_id']		  = USER_ID;
		p['_method']		  = 'post';
		p['timestamp']		  = parseInt( serverTime() );
		p['_session_id']	  = SESSION_ID;
		p['units[quantity]']  = unit_quantity;
		p['units[unit_type]'] = unit_type;
		p['dragon_heart']	  = DRAGON_HEART;
		p['version']		  = API_VERSION;
		
		var url 	= 'cities/'+ city_id +'/units.json';
		var method	= 'POST';
		
		Data.requests.training.total++;
		
		new MyAjax.RequestDOA (url, method, p, function(r){
			//debugLog ('Troop Training Response:\n' + inspect (r, 10, 1));
			if ( r.ok && r.dat.result ) 
			{
				if ( r.dat.result.success ) {
					Seed.updateCity ( r.dat.result.city );
					Seed.checkAddJob ( r.dat.result.job );
				}
				else {
					r.ok = false;
					r.errmsg = r.dat.result.errors[0];
					Data.requests.training.errors++;
				}
			}
			
			if ( callback ) {
				callback ( r );
			}
		});
	},

	wildernessesAbandon : function ( city_id, x, y, callback )
	{
		var p = {};
		p['user_id']		= USER_ID;
		p['x']				= x;
		p['_method']		= 'delete';
		p['y']				= y;
		p['timestamp']		= parseInt( serverTime() );
		p['_session_id']	= SESSION_ID;
		p['dragon_heart']	= DRAGON_HEART;
		p['version']		= API_VERSION;
		
		var url 	= 'cities/'+ city_id +'/wildernesses/abandon.json';
		var method	= 'POST';
		
		Data.requests.abandon.total++;
		
		new MyAjax.RequestDOA ( url, method, p, function(r) {

			if ( r.ok && !r.dat.errors ) 
			{
				if ( r.dat.result && r.dat.result.success ) {
					Seed.updateCity ( r.dat.result.city );
				} 
				else if( r.dat.result ) {
					r.ok = false;
					r.errmsg = r.dat.result.errors[0];
					Data.requests.abandon.errors++;
				}
			} 
			else if ( r.ok && r.dat.errors ) {
				r.ok = false;
				r.errmsg = r.dat.errors;
				Data.requests.abandon.errors++;
			}
			
			if ( callback ) {
				callback ( r );
			}
		});
	}

	
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
				MyAjax.collectResources ( Seed.cities[city_idx].id );
				actionLog (translate('Auto-Collection of Resources') + ' ' + translate('Outpost') + ' #' + city_idx);
			}, delay);
		}

		for ( var city_idx = 1; city_idx < Seed.cities.length; city_idx++ )
		{
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !Seed.cities[city_idx] ) continue;
			
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
	
	init : function () 
	{
		var t = AutoRefresh;
		t.setEnable ( Data.options.auto_refresh.enabled );
	},
	
	setEnable : function ( on_off ) 
	{
		var t = AutoRefresh;
		Data.options.auto_refresh.enabled = on_off;
		if ( Data.options.auto_refresh.enabled )
		{
			Data.options.auto_refresh.last_time = parseInt( serverTime() );
			window.addEventListener('mousemove', t.onMouseMove, false);
			t.onTimeout();
		} 
		else {
			window.removeEventListener('mousemove', t.onMouseMove, false);
		}
	},
	
	setDelay : function ( delay ) 
	{
		var t = AutoRefresh;
		Data.options.auto_refresh.delay = delay;
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
			Data.options.auto_refresh.last_time = parseInt( serverTime() );
			t.last_mouse = [].concat( t.current_mouse );
		}
		
	
		if ( parseInt(serverTime()) - Data.options.auto_refresh.last_time > parseInt(Data.options.auto_refresh.delay)*60)
		{
			//document.location = FACEBOOK_ID ? 'http://apps.facebook.com/dragonsofatlantis/realm/'+SERVER_ID : document.location.href;
			window.location =  window.location.href;
		}
		
		
		if ( Data.options.auto_refresh.enabled )
		{
			t.timer = setTimeout( t.onTimeout, 30000 );
		}
	}
};// END AutoRefresh


Buildings = {
	getList : function ( city_idx, build_type )
	{
		var ret = [];
		for (var i=0; i < Seed.cities[city_idx].buildings.length; i++)
		{
			if ( Seed.cities[city_idx].buildings[i].type === build_type ){
				ret.push (Seed.cities[city_idx].buildings[i]);
			}
		}
		return ret;
	},
	getLevel : function ( city_idx, build_type )
	{
		var x = Buildings.getList( city_idx, build_type );
		if ( x.length < 1 ){
			return 0;
		}
		x.sort( function(a,b){return a.level - b.level;} );
		return x[0].level;
	},
	getById : function ( city_idx, build_id )
	{
		for (var i=0; i < Seed.cities[city_idx].buildings.length; i++)
		{
			if ( Seed.cities[city_idx].buildings[i].id === build_id ) {
				return (Seed.cities[city_idx].buildings[i]);
			}
		}
		return null;
	}
}; // END Building



Data = {
	logs		: [ [], [], [] ],
	defaults	: {},
	
	init : function ( obj )
	{
		try {
		
			//Saves defaults properties
			Data.defaults.mergeWith( obj || {} );
			
			for ( var item_name in obj )
			{
				
				// Checks if the object is already defined in the Data Object
				if ( Data[item_name] === undefined ) {
					//  Assign default object properties, if defined, otherwise an empty object
					Data[item_name] = obj[item_name] !== undefined ? obj[item_name] : {};
				}
				
				// Load the data stored, of the current item from localStorage
				var stored_object = Data.getObject( item_name );

				// Check if the default object is really an object
				if ( Data[item_name] !== null && typeof( Data[item_name] ) === 'object' )
				{
					// Assign the properties of stored objeto into the default object, overwriting the values
					Data[item_name].mergeWith( stored_object );
				}
				else if ( stored_object !== '' ) {
					Data[item_name] = stored_object;
				} 
			}
		} catch (e) {
			alert ('This browser does not support LocalStorage\n\n'+e);
			return false;
		}
	},
	
	clearStorage : function()
	{
		localStorage.clear();
		for ( var item_name in Data.defaults )
		{
			if ( Data.defaults[item_name] !== null && typeof( Data.defaults[item_name] ) === 'object' )
			{
				Data[item_name].mergeWith( Data.defaults[item_name] );
			}
			else {
				Data[item_name] = Data.defaults[item_name];
			} 
		}
		actionLog('localStorage Deleted!');
	},
	
	getObject : function ( key )
	{
		var item = localStorage.getItem( [SERVER_ID, USER_ID, key].join('_') );
		return ( item || '' ).charAt(0) === '{' ? JSON.parse( item || '{}' ) : eval( item );
	},
	
	setObject : function( key, value )
	{
		try {
			localStorage.setItem( [SERVER_ID, USER_ID, key].join('_'), JSON.stringify( value ) );
		} catch(e){
			if ( e === QUOTA_EXCEEDED_ERR )
			{
				dialogError ('<p style="font-size:12pt;">' + translate('LocalStorage') + '<p><br/>' + translate('Quota exceeded') + '!<br/>' + translate('Please, delete the cache and persistent data in your browser'));
			}
		}
	},

	onUnload : function ()
	{
		debugLog('Save Data in localStorage');
		verboseLog('Save Data in localStorage');
		for ( var item_name in Data.defaults )
		{
			Data.setObject ( item_name, Data[item_name] );
		}
	}
	
	
}; //END Data


Manifest = {

	data : {},
	
	init : function ( callback )
	{
		Manifest.fetchManifest(function ( res ) {
			if ( res.ok ) {
				verboseLog('Manifest was Successfully requested from the server');
			}
			if ( callback ){
				callback( res );
			}
		});
	},
	
	fetchManifest : function ( callback )
	{
		var now = new Date().getTime() / 1000;
		var p = {};
		p['user_id']		= USER_ID;
		p['_session_id']	= SESSION_ID;
		p['version']		= API_VERSION;
		p['timestamp']		= parseInt(serverTime());
		p['dragon_heart']	= DRAGON_HEART;
		
		var url 	= 'manifest.json';
		var method	= 'GET';
		
		Data.requests.manifest.total++;
		
		new MyAjax.RequestDOA ( url, method, p, function (r) {
			if ( r.ok && !r.dat.errors ) 
			{
				Manifest.data = r.dat; // This holds the entire Manifest JSON data parsed as an object 
				try {
					Manifest.updateManifest();
				} catch (e) {
					r.ok = false;
					r.errmsg = '<b>fetchManifest</b> when calling updateManifest returned this error: ' + e.toString();
					Data.requests.manifest.errors++;
				}
			} 
			else if ( r.ok && r.dat.errors ) {
				r.ok = false;
				r.errmsg = r.dat.errors;
				Data.requests.manifest.errors++;
			}
			
			if ( callback ){
				callback ( r );
			}
		}, false);
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
		var i, j;
		var building_manifest = Manifest.data.buildings;
		var research_manifest = Manifest.data.research;
		var unit_manifest = Manifest.data.city.capital.units;
		
		// Initialise levels for each building & Save requirements
		for ( i=0; i < building_manifest.length; i++ ) 
		{
			if ( !Seed.requirements.building[building_manifest[i].type] )
			{
				Seed.requirements.building[building_manifest[i].type] = {};
			}
			
			if ( !Seed.requirements.building[building_manifest[i].type].level )
			{
				Seed.requirements.building[building_manifest[i].type].level = [];
			}
			
			for ( j=0; j < building_manifest[i].levels.length; j++ )
			{
				Seed.requirements.building[building_manifest[i].type].level[building_manifest[i].levels[j].level] = building_manifest[i].levels[j].requirements;
			}
		}


		// Initialise levels for each research & Save requirements
		for ( i=0; i < research_manifest.length; i++ ) 
		{
			if ( !Seed.requirements.research[research_manifest[i].type] )
			{
				Seed.requirements.research[research_manifest[i].type] = {};
			}
			
			if ( !Seed.requirements.research[research_manifest[i].type].level )
			{
				Seed.requirements.research[research_manifest[i].type].level = [];
			}
			
			for ( j=0; j < research_manifest[i].levels.length; j++ )
			{
				//Seed.requirements.research[research_manifest[i].type].level[research_manifest[i].levels[j].level] = {};
				Seed.requirements.research[research_manifest[i].type].level[research_manifest[i].levels[j].level] = research_manifest[i].levels[j].requirements;
			}
		}
		
		// Initialise units & Save requirements
		for ( i=0; i < unit_manifest.length; i++ )
		{
			if ( !Seed.requirements.unit[unit_manifest[i].type] )
			{
				Seed.requirements.unit[unit_manifest[i].type] =[];
			}
			Seed.requirements.unit[unit_manifest[i].type] = unit_manifest[i].requirements;
		}
	}

};



Map = {
	names : {
		'A':'AnthropusCamp',
		'B':'Bog',
		'F':'Forest',
		'G':'Grassland',
		'H':'Hill',
		'L':'Lake',
		'M':'Mountain',
		'P':'Plain',
		'C':'City',
		'O':'Outpost',
		'W':'Wildernesses',
		/*'X':'Fog',*/
		'AnthropusCamp'	:'A',
		'Bog'			:'B',
		'Forest'		:'F',
		'Grassland'		:'G',
		'Hill'			:'H',
		'Lake'			:'L',
		'Mountain'		:'M',
		'Plain'			:'P',
		'City'			:'C',
		'Outpost'		:'O',
		'Wildernesses'	:'W',
		/*'Fog'			:'X',*/
	},
	last_pos : {x:0, y:0},
	pattern:false,
	
	init : function ()
	{
		var t = Map;
		
		t.last_pos.x = Seed.cities[0].x || 0;
		t.last_pos.y = Seed.cities[0].y || 0;
	
		Data.init({
			map	: {
				terrains: {
					AnthropusCamp:[],
					Bog			 :[],
					Forest		 :[],
					Grassland	 :[],
					Hill		 :[],
					Lake		 :[],
					Mountain	 :[],
					Plain		 :[],
					/*Fog			 :[],*/
					City		 :[],
					Outpost		 :[],
					Wildernesses :[]
				},
				coords:{},
			}
		});
		
		// Check Our Coords
		t.checkOurCoords();
	},
	
	scanMap : function ( x, y, radius, callback )
	{
		var t = Map;
		t.terrains = {
			AnthropusCamp:[],
			Bog			 :[],
			Forest		 :[],
			Grassland	 :[],
			Hill		 :[],
			Lake		 :[],
			Mountain	 :[],
			Plain		 :[],
			/*Fog			 :[],*/
			City		 :[],
			Outpost		 :[],
			Wildernesses :[]
		};
		
		t.founds = {
			AnthropusCamp:0,
			Bog			 :0,
			Forest		 :0,
			Grassland	 :0,
			Hill		 :0,
			Lake		 :0,
			Mountain	 :0,
			Plain		 :0,
			/*Fog			 :0,*/
			City		 :0,
			Outpost		 :0,
			Wildernesses :0
		}; 
		
		if ( radius < 7 ){
			radius = 7;
		}

		t.pos_x      = t.normalize ( x - radius + 7 );
		t.pos_y      = t.normalize ( y - radius + 7 );
		t.step_x     = t.step_y = 0;
		t.steps_side = Math.ceil( (radius*2) / 14 );
		t.radius     = radius;
		
		t.forwards	 = true;
		
		t.steps      = parseInt( t.steps_side * t.steps_side );
		t.step       = 1;
		
		t.percent    = parseInt( t.step * 100 / t.steps );
		
		t.callback   = callback;
		
		if ( t.callback ) {
			t.callback( {done:false, init:true} );
		}
	
		var p = {};
		p['user_id']		= USER_ID;
		p['version']		= API_VERSION;
		p['x']				= t.pos_x;
		p['timestamp']		= parseInt(serverTime());
		p['y']				= t.pos_y;
		p['_session_id']	= SESSION_ID;
		p['dragon_heart']	= DRAGON_HEART;

		Data.requests.map.total++;
		
		new MyAjax.RequestDOA ('map.json', 'POST', p, t.gotMap);
	},  

	gotMap : function ( r )
	{
		var t = Map;
		var d = Data.map;

		if ( !r.ok )
		{
			Data.requests.map.errors++;
			
			if( t.callback ){
				t.callback( null ); // error !?!
			}
			return;
		}
		
		// Terrains
		for ( var i=0; i < r.dat.terrain.length; i++ )
		{
			for ( var j=0; j < r.dat.terrain[i].length; j++ )
			{
				var value = r.dat.terrain[i][j];

				var type = value[0];
				
				// Skip Fogs, Cities & Outpost
				if ( /(Fog|City|Outpost)/i.test( type ) ){
					continue;
				}
				
				var x  = value[2];
				var y  = value[3];
				var xy = x + ',' + y;

				var coords = Data.map.coords[xy];
				
				var d = t.getDistance ( Data.options.map.x, Data.options.map.y, x, y );

				// We use very small shortcuts because LocalStorage size available is limited
				var obj = {
					x	: x, 
					y	: y, 
					d	: d, 
					t	: type.charAt(0), // type=='Fog'?'X':type.charAt(0),
					l	: value[1],
					at	: 1,
					lst	: 0
				};

				var index, _index, _type;
				if ( coords ) {
					
					if ( /(W|O|C)/.test( coords.t ) ) 
					{
						// Swap the values
						index  = coords._n;
						_index = coords.n;
						_type  = coords.t;
						// Disabled Terrain
						var old_terrain = ( Data.map.terrains[Map.names[_type]] )[_index];
						if( old_terrain ) old_terrain.l = 0;
					} 
					else {
						index  = coords.n;
						_index = coords._n;
						_type  = coords._t;
						// Prevents loss of value of the last attack (Fix by Lord Mimir)
						if ( coords.t === obj.t )
						{  
							obj.lst = ( Data.map.terrains[type] )[index].lst;
						}  
					}
					
					( Data.map.terrains[type] )[index] = obj; // Save in LocalStorage
				}
				else {
					index = Data.map.terrains[type].length;
					_index = index;
					_type  = type.charAt(0);
					
					Data.map.terrains[type].push(obj); // Save in LocalStorage
					t.terrains[type].push(obj); // Save in Temporal Object

				}
				
				Data.map.coords[xy] = {
					t	: type.charAt(0), 	// Save Terrain Type
					n	: index,			// Save Terrain Index Number
					_t	: _type, 			// Save Last Terrain Type
					_n	: _index,			// Save Last Terrain Index Number
				};
				
				++t.founds[type];

			}
		}
		
	
		//Cities
		for ( var i=0; i < r.dat.map_cities.length; i++ )
		{
			var target = r.dat.map_cities[i];

			var d = t.getDistance( Data.options.map.x, Data.options.map.y, target.x, target.y );
			
			var xy = target.x + ',' + target.y;
			var coords = Data.map.coords[xy];
			
			var type = ( target.type === 'Capital' ? 'City' : 'Outpost' );

			// We use very small shortcuts because LocalStorage size available is limited
			var obj = {
				x	: target.x,
				y	: target.y,
				d	: d,
				t	: type.charAt(0),
				l	: target.level,
				id	: target.id,
				n	: target.name,
				pId	: target.player.id,
				pN	: target.player.name,
				pL	: target.player.level,
				pR	: target.player.race,
				pM	: target.player.might,
				at	: (target.player.alliance ? 0 : 1),
				lst	: 0
			};
			
			if ( target.player.alliance )
			{
				obj.aId = target.player.alliance.id;
				obj.aN = target.player.alliance.name;
			}
			
			if ( target.outpost_type )
			{
				obj.lf = target.life;
				obj.mlf = target.maximum_life;
				obj.rR = target.recovery_rate;
				obj.oT = target.outpost_type;
			}
			
			// Skip our alliance or owner (Fixed by Lord Mimir)
            if ( (Seed.player.id === target.player.id) || (Seed.player.alliance && target.player.alliance && Seed.player.alliance.id === target.player.alliance.id) || (t.pattern && t.pattern.test(target.player.id)) ) {  
                obj._l = obj.l;  
                obj.l  = -1 ;  
            }  
			
			var index, _index, _type;
			if ( coords ) {
				if ( /(C|O)/.test(coords.t) )
				{
					index  = coords.n;  
					_index = coords._n;  
					_type  = coords._t;  
					
					// Prevents loss of value of the last attack (Fix by Lord Mimir)
					if ( coords.t === obj.t )
					{  
						obj.lst = ( Data.map.terrains[type] )[index].lst;
					}  
					
					( Data.map.terrains[type] )[coords.n] = obj; // Save in LocalStorage
					
				} 
				else {
					
					index = Data.map.terrains[type].length;
					// Swap values
					_index = coords.n;
					_type = coords.t;
					
					Data.map.terrains[type].push( obj );	// Save in LocalStorage
					t.terrains[type].push( obj );			// Save in Temporal Object
					
					// Disabled Original Terrain
					var original_terrain = Data.map.terrains[Map.names[_type]];
					original_terrain[_index]._l = original_terrain[_index].l;
					original_terrain[_index].l = 0;
				}
				
			} 
			else {
				index = Data.map.terrains[type].length;
				_index = index;
				_type = type.charAt(0);
				
				Data.map.terrains[type].push( obj );	// Save in LocalStorage
				t.terrains[type].push( obj ); 		// Save in Temporal Object

			}
			
			Data.map.coords[xy] = {
				_t	: _type,			// Save Original Terrain Type
				_n	: _index,			// Save Original Index Number
				t	: type.charAt(0),	// Save Current Terrain Type
				n	: index				// Save Current Index Number
			};
			
			++t.founds[type];

		}
		
		
		//Wildernesses
		for ( var i=0; i < r.dat.city_wildernesses.length; i++ )
		{
			var target = r.dat.city_wildernesses[i];
			
			var xy = target.x + ',' + target.y;
			var coords = Data.map.coords[xy];
			
			var type = 'W';
			var level = 1;
			
			var d = t.getDistance(Data.options.map.x, Data.options.map.y, target.x, target.y);
			
			if ( coords ) 
			{
				type = Map.names[coords.t];
				// Skip Outposts (Fixed by Lord Mimir)
				if ( coords.t === 'O' ){
					continue;
				}
				// if not Cities or Outposts get level of location   
				var tmp_obj = ( Data.map.terrains[Map.names[coords.t]] )[coords.n];
                level = ( tmp_obj._l ? tmp_obj._l : tmp_obj.l );
			}
			
			// Hide terrains of our alliance or owner
			if ( (Seed.player.id === target.player.id) || (Seed.player.alliance && target.player.alliance && Seed.player.alliance.id === target.player.alliance.id) || (t.pattern && t.pattern.test(target.player.id)) ) {
				if ( coords )
				{
					type = Map.names[coords.t];
					var terrains = Data.map.terrains[type];
					if ( terrains[coords.n] )
					{
						terrains[coords.n].at = 0;
						terrains[coords.n]._l = terrains[coords.n].l;
						terrains[coords.n].l = 0;
					}
				}
				continue;
			}

			// We use very small shortcuts because LocalStorage size available is limited
			var obj = {
				x	: target.x,
				y	: target.y,
				d	: d,
				t	: type.charAt(0),
				l	: level,
				id	: target.id,
				n	: '',
				pId	: target.player.id,
				pN	: target.player.name,
				pL	: target.player.level,
				pR	: target.player.race,
				pM	: target.player.might,
				at	: (target.player.alliance ? 0 : 1),
				lst	: 0
			};
			
			if ( target.player.alliance )
			{
				obj.aId = target.player.alliance.id;
				obj.aN = target.player.alliance.name;
			}
			
			// Set to Not-Attacable our alliance or owner Wilderness (Fixed by Lord Mimir)
			if ( (Seed.player.id === target.player.id) ||
				(Seed.player.alliance && target.player.alliance && Seed.player.alliance.id === target.player.alliance.id)
				) {
				obj.at = 0;
			}
			
			
			var type = 'Wildernesses';
			var index, _index, _type;
			if ( coords ) 
			{
				if ( coords.t === 'W' )
				{
					
					index = coords.n;
					_index = coords._n;
					_type = coords._t;
					
					// Prevents loss of value of the last attack (Fix by Lord Mimir)
					 if ( coords.t === obj.t )
					{
						obj.lst = ( Data.map.terrains[type] )[index].lst;
					}
					
					( Data.map.terrains[type] )[coords.n] = obj; // Save in LocalStorage
				
				}
				else {
					// Fixed by Lord Mimir
					if ( coords._t === 'W' )
					{

						index = coords._n;
						
						// Prevents loss of value of the last attack (Fix by Lord Mimir)
						if ( coords._t === obj.t )
						{
							obj.lst = ( Data.map.terrains[type] )[index].lst;
						}
						
						( Data.map.terrains[type] )[coords._n] = obj; // Save in LocalStorage
					}
					else {
						index = Data.map.terrains[type].length;
						
						Data.map.terrains[type].push( obj );  // Save in LocalStorage
						t.terrains[type].push( obj );         // Save in Temporal Object
					}
					
					// Swap values
					_index = coords.n;
					_type = coords.t;
					
					// Disabled Original Terrain
					var original_terrain = Data.map.terrains[Map.names[_type]];
					original_terrain[_index]._l = original_terrain[_index].l;
					original_terrain[_index].l = 0;
				}
				
			}
			// This should never happen, but just in case
			else {
				index = Data.map.terrains[type].length;
				_index = index;
				_type = type.charAt(0);
				
				Data.map.terrains[type].push( obj );	// Save in LocalStorage
				t.terrains[type].push( obj ); 		// Save in Temporal Object
			}
			
			Data.map.coords[xy] = {
				_t	: _type,			// Save Original Terrain Type
				_n	: _index,			// Save Original Index Number
				t	: type.charAt(0),	// Save Current Terrain Type
				n	: index				// Save Current Index Number
			};
			
			++t.founds[type];

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
			if ( t.callback )
			{
				t.callback ({
					done	: true,
					terrains: t.terrains,
					founds	: t.founds
				});
			}
			return;
		}
			
		t.step = t.step + 1;
		t.percent = parseInt( t.step * 100 / t.steps );
		
		if ( t.callback ){
			t.callback( {done:false} );
		}
		
		var delay = parseInt( Data.options.map.radius * 50 );

		Data.requests.map.total++;
		
		setTimeout (function(){
			var p = {};
			p['user_id']		= USER_ID;
			p['version']		= API_VERSION;
			p['x']				= t.normalize( t.pos_x + (t.step_x*14) );
			p['timestamp']		= parseInt(serverTime());
			p['y']				= t.normalize( t.pos_y + (t.step_y*14) );
			p['_session_id']	= SESSION_ID;
			p['dragon_heart']	= DRAGON_HEART;
			new MyAjax.RequestDOA ('map.json', 'POST', p, t.gotMap);
		}, Math.randRange(delay, delay*2) );
	},
	
	// Fixed by Lord Mimir
	toCSV : function(type, terrains, structure)
	{
		if ( terrains === undefined || terrains === null ) {
			terrains = Data.map.terrains;
		}
		
		if ( terrains[type] === undefined ) {
			return;
		}
		if ( structure === undefined ){
			structure = [
				 'x'
				,'y'
				,'d'
				,'t'
				,'_t'
				,'l'
				,'_l'
				,'id'
				,'n'
				,'pId'
				,'pN'
				,'pM'
				,'at'
				,'lst'
			];
		}
		var csv = [];
		
		// headers
		csv.push( structure.join(';').replace(/\"/,'') );
		
		// structure
		console.log ( terrains[type].length );
		
		for ( var i=0; i < terrains[type].length; i++ )
		{
			//console.log(terrains[type].name);
			//console.log(type);
			var row='';
			for ( var j=0; j < structure.length; j++ )
			{
				if ( ((terrains[type])[i])[structure[j]] !== undefined){  
					row += ((terrains[type])[i])[structure[j]];  
				}
				row += ';';
			}
			csv.push( row );
		}
		return csv;
	},
	
	getTargetByCoords : function( x, y, callback )
	{
		var xy = x + ',' + y;
		var coords = Data.map.coords[xy];
		if( coords )
		{
			var type = Map.names[coords.t];
			var index = coords.n;
			if ( callback ) callback( Data.map.terrains[type][index] );
			return Data.map.terrains[type][index];
		}
		
		Map.scanMap ( x, y, 7, function( result ) {
		
			if ( result.done )
			{
				for ( var type in result.terrains )
				{
					for ( var i=0; i < result.terrains[type].length; i++ )
					{
						if ( ( result.terrains[type] )[i].x === x && 
							 ( result.terrains[type] )[i].y === y && 
							 ( result.terrains[type] )[i].l > 0 
						   ){
							if ( callback ) callback( ( result.terrains[type] )[i] );
							return;
						}
					}
				}
			} 
			else {
				if ( callback ) {
					callback( false );
				}
				return;
			}
		});
	},
	
	checkOurCoords : function()
	{
		var t = Map;
		if ( Data.options.map.x !== Seed.cities[0].x || Data.options.map.y !== Seed.cities[0].y )
		{
			Data.options.map.x = Seed.cities[0].x;
			Data.options.map.y = Seed.cities[0].y;
			
			// ReCalculates Distances
			for ( var n in Data.map.terrains )
			{
				var targets = Data.map.terrains[n];
				for ( var i=0; i < targets.length; i++ )
				{
					targets[i].d = t.getDistance( Data.options.map.x, Data.options.map.y, targets[i].x, targets[i].y );
				}
			}
		}
	},
	
	simulateOpenMap : function( x, y, callback )
	{
		var t = Map;
		
		if( callback ){
			setTimeout( callback, 1000 );
		}
		
		t.getTargetByCoords( x || t.last_pos.x, y || t.last_pos.y );
		
		t.last_pos.x = x || Seed.cities[0].x;
		t.last_pos.y = y || Seed.cities[0].y;
	},
	
	normalize : function( n )
	{
		if (n > 750){
			n -= 750;
		}
		if (n < 0){
			n += 750;
		}
		return n;
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
	}
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
				count_limit	: 1,
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
				debugLog ('Marches.add: ID=' + march.id + '  (' + march.x + ',' + march.y + ') General:' + march.general.id);
			}
		}
	},

	remove : function ( march_id, type )
	{   
		var t = Marches;
		if ( march_id )
		{
			delete ( ( Data.marches[type] )[march_id] );
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
						
						// Prevent errors in the marches queuing ?
						if ( MyAjax.march_busy ){
							--t.march_busy;
						}
						
						if (DEBUG_MARCHES){
							debugLog ('March report never received! (now=' + now + ')\n'+ inspect (marches[id], 6, 1));    
						}
						
						marches[id].has_report = true;
						
					}
					else {
						marches[id].retry = true;
						Messages.checkMessages( {category:'reports'} );
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
		
		/* loop to clear the attack if both no longer active and report has been recieved 
			also sets dragons back in city.*/
		for ( var id in Data.marches[type] )
		{
			if ( ( Seed && Seed.marches[id] === undefined ) && ( Data.marches[type] )[id].has_report ){
			    var dragon_type=null;
				for ( var unit_type in (Data.marches[type] )[id].units )
				{
					if ( /(WindDragon|FireDragon|StoneDragon|WaterDragon|GreatDragon)/.test( unit_type ) )
					{
							dragon_type = unit_type;
					}
				}
				if ( dragon_type !== null && Seed.dragons[dragon_type] )
				{
					Seed.dragons[dragon_type].is_in_city = true;
				}
				  Marches.remove( id, type );
			}
		}
	
		/* 
		* NOTE: We use a dual system, the first one to create the rows and
		the another to update it. We do it in this way because we don't want 
		to lose the event listeners of the buttons.
		*/
		for ( var id in Seed.marches )
		{
			var iRow, iCell;
			if ( ( Seed.marches[id].x  === Seed.cities[0].x ) &&  
				( Seed.marches[id].y  === Seed.cities[0].y ) && 
				( Seed.marches[id].status === 'marching' )
			   ){
					//Delete march as one can not attack own capital city.  
					//This part of code should not happen at all but is present as a catchall.
					delete Seed.marches[id];
					continue;
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
			// shortcut for table_output
			//table_output = t.table_output[type];
			
			// shortcut of current march
			var march = Seed.marches[id];
			
			var retreating = ( march.status === 'retreating' );
			
			var time_left = march.run_at - now;
			var time_format;
			if ( time_left < 0 )
			{
				time_format = '...';
			} 
			else if ( isNaN( time_left ) ){
				time_format = '---';
			}
			else {
				time_format = timeFormat( time_left, true );
			}
			
			// Set units for march details or title of the row
			var units = '';
			for ( var unit_type in march.units )
			{
				units += ' ' + translate(unit_type) + ': ' + march.units[unit_type] + ' +';
			}
			// remove the first space and last "+" symbol
			units = units.substr(1, units.length - 2);
			
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
							,march.target_name
							,march.terrain_level
							,'[' + march.x + '/' + march.y + ']\n'
							,units.replace(/\+/g,'\n')
					].join(' ');
		
				// Retreating case
				if ( retreating )
				{
					table_output[id].row_status = 2; // Retreating mode
				
					// march Status
					iCell = iRow.insertCell( -1 );
					iCell.innerHTML = '<b>'+ translate('Returning') + ':</b>';
					// march Target
					iCell = iRow.insertCell( -1 );
					iCell.className = 'wrap';
					iCell.innerHTML = march.target_name.nowrap()  + '&nbsp;' + '<br><span class=jewel>' + units + '</span>';
					// march Coords
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					iCell.innerHTML = '&nbsp;<b>&lt;</b>&nbsp;';
					// march time_left
					iCell = iRow.insertCell( -1 );
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
					// added Transport march case by Didi
					if ( march.march_type === 'TransportMarch' ) {
						iCell.innerHTML =  '<b>' + translate('Transport').capitalize() + ':</b>';
					} else {
						iCell.innerHTML =  '<b>' + translate(march.status).capitalize() + ':</b>';
					}
					// march Target
					iCell = iRow.insertCell( -1 );
					iCell.className = 'wrap';
					iCell.innerHTML = march.target_name.nowrap()  + '&nbsp;' + march.terrain_level + '&nbsp;';
					if ( Data.options.attacks.marches_details ) {
						iCell.innerHTML += '<br><span class=jewel>' + units + '</span>'
					}
					// march Coords
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					iCell.innerHTML = '<span class=jewel> [' + march.x +'/'+ march.y +']</span>&nbsp;<b>&gt;</b>&nbsp;';
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
							
							MyAjax.marchRecall( city_id, march_id, function (r) {
								if ( r.ok && r.dat.result.success )
								{
									Seed.marches[march_id].status = 'retreating';
									( Data.marches[type] )[march_id].status = 'retreating';
								}
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
					break
				// Marching state (Waiting for retreating)
				case 1:
				case 2:
					if ( retreating )
					{
						table_output[id].row_status = 3; // Change to retreating state
						
						// march Status
						var html_status = '';
						if ( march.march_type === 'TransportMarch' ) {
							html_status +=  '&nbsp;' + translate('Transport').capitalize();
						}
						html_status += '<b>' + translate('Returning') + ':</b>';
						iRow.cells[0].innerHTML = html_status;
						
						// march Target
						iRow.cells[1].innerHTML = march.target_name.nowrap();
						if ( Data.options.attacks.marches_details ) {
							iRow.cells[1].innerHTML += '<br><span class=jewel>' + units + '</span>'
						}
						
						// march Coords
						iRow.cells[2].innerHTML = '&nbsp;<b>&lt;</b>&nbsp;';
						// march Recall Button
						iRow.cells[4].innerHTML = '';
					}
					else if ( ( isNaN( time_left ) || time_left < 0 ) &&  table_output[id].row_status === 1 ) {
						  
						if ( march.terrain_type && !( /(Anthropus|City|Outpost|Bog)/.test(march.terrain_type) ) ) {
							
							if ( march.status === 'marching' ) {
								table_output[id].row_status = 2; // Change to Waiting for retreating (Action Taken)
							
								// Auto Abandon Wilderness or Auto Recall Units
								// Only when we are not have all wildernesses controlled
								if (Seed.player.player_wildernesses.length != Seed.cities[0].figures.wilderness.maximum_controlled)
								{
									// Abadon Wildernesses
									if ( Data.options.attacks.abandon_wildernesses ) {
										setTimeout( 
											/* closure function */
											( function( march_id, march_type ) 
											{
												var march = Seed.marches[march_id];
												MyAjax.wildernessesAbandon( march.city_id, march.x, march.y, function (r) {
													if ( r.ok && r.dat.result.success )
													{
														Seed.marches[march_id].status = 'retreating';
														( Data.marches[march_type] )[march_id].status = 'retreating';
													}
												});
											} ) ( id, type )
											, Math.randRange(7000, 12000) 
										);
									}

									// Recall Units from Encamped Wildernesses
									else if ( Data.options.attacks.recall_encamped  ) 
									{
										setTimeout ( 
											/* closure function */
											( function( march_id, march_type )
												{
													var march = Seed.marches[march_id];
													MyAjax.marchRecall( march.city_id, march.id, function (r) {
														if ( r.ok && r.dat.result.success )
														{
															Seed.marches[march_id].status = 'retreating';
															( Data.marches[march_type] )[march_id].status = 'retreating';
														}
													});
												} 
											) ( id, type )
											, Math.randRange(7000, 12000) 
										);
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
									   
										MyAjax.marchRecall( city_id, march_id, function (r) {
											if ( r.ok && r.dat.result.success )
											{
												Seed.marches[march_id].status = 'retreating';
												( Data.marches[type] )[march_id].status = 'retreating';
											}
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
						/*
						try {
							if (table_output[id].row) table.deleteRow (table_output[id].row);
							if (table_output[id]) delete table_output[id];
						} catch(e){}
						*/
					}
					break
				//units encamped;
				case 4:
					if ( retreating )
					{
						table_output[id].row_status = 3; // Change to retreating state
						// march Status
						iRow.cells[0].innerHTML = '<b>'+ translate('Retreating') + ':</b>';
						// march Target
						iRow.cells[1].innerHTML = march.target_name.nowrap();
						// march Coords
						iRow.cells[2].innerHTML = '&nbsp;<b>&lt;</b>&nbsp;';
						// march Recall Button
						iRow.cells[4].innerHTML = '';
					}
					break;
				}
				
				// march time_left
				iRow.cells[3].innerHTML = time_format;
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
		Messages.checkMessages( {wait:1000} );
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
		
		// Delete when there are between 7 and 15 messages in queued (by Didi)
		// (Randomness is so that the server can not find recurrent actions)
		if ( t.delete_queue.length >= Math.randRange( 7, 15 ) ){
			doit();
		}
		
		//RequestQueue.add('deleteMessage', doit, Math.randRange(60000,90000));

		function doit ()
		{
			var t = Messages;
			//debugLog ('DELETE MESSAGES:\n'+ inspect (t.delete_queue, 5, 1));
			MyAjax.messageDelete (t.delete_queue, function (r) {
				var t = Messages;
				t.delete_queue = [];
			});
		}
	},

	onUnload : function ()
	{
		var t = Messages;
		if (t.delete_queue.length > 0) {
			MyAjax.messageDelete ( t.delete_queue );
		}
	},

	// Check for battle reports
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
			MyAjax.messageList (category, function (r){
				var t = Messages;
				
				if ( r === null ) return;
				
				//debugLog ('messageList:\n' + inspect (r, 7, 1));        
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
		
		MyAjax.messageDetail (id, function (r){
			var t = Messages;
			//if(r===null) return;
			
			t.read_list.shift();
			t.gotBattleReport ( r );
			
			if ( t.read_list.length > 0 ){
				t.fetch_timer = setTimeout ( t.fetchNext, Math.randRange(3000,5000) );
			}
		});
	},

	gotBattleReport : function (r)
	{
		var t = Messages;
		if ( DEBUG_MARCHES ){
			debugLog ('Read Message: '+ r.report.location.terrain +' , '+ r.report.location.x +','+  r.report.location.y +' General: '+ r.report.attacker.general.id );    
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



Seed = {
	cities			: [],	  // cities
	city_idx		: {},     // 'indicies'
	city_time		: {},     // timestamps of last update
	city_init		: [],
	dragons			: {},
	jobs			: {},     // by city
	marches			: {},
	num_marches		: 0,
	generals		: {},
	requirements	: {building:[], research:[], unit:[]},
	num_generals	: 0,
	serverTimeOffset: 0,
	tickTimer		: 0,
	
	init : function ( callback ) 
	{
		var t = Seed;
	
		t.fetchPlayer (function (r) {
			if ( r.ok ) {
				verboseLog('Player data was Successfully requested from the server');
			}
			if ( callback ){
				callback ( r );
			}
		}, 
		{ noCities: true } );
		
		clearInterval(t.tickTimer);
		t.tickTimer = setInterval(t.tick, 1000);
	},
	
	fetchCity : function ( city_id, callback ) 
	{
		if ( !city_id ) return;
		
		var t = Seed;
		
		verboseLog('Attempting fetchCity ' + city_id);
		
		var p = {};
		p['user_id']		= USER_ID;
		p['_session_id']	= SESSION_ID;
		p['version']		= API_VERSION;
		p['timestamp']		= parseInt( serverTime() );
		p['dragon_heart']	= DRAGON_HEART;
		
		var url 	= 'cities/'+ city_id +'.json';
		var method	= 'POST';
		
		Data.requests.cities.total++;
		
		new MyAjax.RequestDOA (url, method, p, function(r) {
			if ( r.ok && !r.dat.errors ) 
			{
				if ( r.dat.timestamp ) {
					t.serverTimeOffset = r.dat.timestamp - (new Date().getTime() / 1000);
				}
				
				try {
					t.updateCity( r.dat.city );
					verboseLog('Updated coords for ' + r.dat.city.name + ' are ' + r.dat.city.x + '/' + r.dat.city.y);
				} catch (e) {
					r.ok = false;
					r.errmsg = e.toString();
					Data.requests.cities.errors++;
				}
			}
			else if ( r.ok && r.dat.errors ) {
				r.ok = false;
				r.errmsg = r.dat.errors;
				Data.requests.cities.errors++;
			}
			
			if ( callback ){
				callback ( r );
			}
		});
	},

	fetchGenerals : function ( city_id, callback )
	{
		var p = {}
		p['user_id']		= USER_ID;
		p['timestamp']		= parseInt( serverTime() );
		p['version']		= API_VERSION;
		p['dragon_heart']	= DRAGON_HEART;
		p['_session_id']	= SESSION_ID;
		
		var url 	= 'cities/'+ city_id +'/generals.json';
		var method	= 'GET';
		
		Data.requests.generals.total++;
		
		new MyAjax.RequestDOA (url, method, p, function(r) {
			if ( r.ok && r.dat.generals ) 
			{
				if ( callback ){
					callback ( r.dat.generals );
				}
			} 
			else {
				
				Data.requests.generals.errors++;
				
				if ( callback ) {
					callback ( null );
				}
			}
		});
	},
	
	fetchPlayer : function ( callback, options ) 
	{
		var city;
		
		if ( callback instanceof Function ) 
		{
			var callback = callback;
			var options = options || {};
		} 
		else {
			var options = callback;
			var callback = null;
		}
		
		if(options && options.noPlayer)
		{
				// options.cities (array)
				// only fetch the cities id in the array
				if ( options && options.cities ) 
				{
					for ( var i = 0; i < options.cities.length;  i++ )
					{
						// First, check if exist the city_id (by Lord Mimir)
						if ( Seed.city_idx[options.cities[i]] !== undefined ) {
							setTimeout( Seed.fetchCity, Math.randRange(i*1000,i*3000) , options.cities[i], callback );
						}
					}
					return;
				}
				
			
		}
		
		var p = {};
		p['user_id']		= USER_ID;
		p['_session_id']	= SESSION_ID;
		p['version']		= API_VERSION;
		p['timestamp']		= parseInt( serverTime() );
		p['dragon_heart']	= DRAGON_HEART;
		
		var url 	= 'player.json';
		var method	= 'GET';
		
		Data.requests.player.total++;
		
		new MyAjax.RequestDOA (url, method, p, function(r) {
			if ( r.ok && !r.dat.errors ) 
			{
				if ( r.dat.timestamp ) {
					Seed.serverTimeOffset = r.dat.timestamp - (new Date().getTime() / 1000);
				}
				
				// Set Seed.player
				Seed.player = r.dat;
				
				// options.cities (array)
				// only fetch the cities id in the array
				if ( options && options.cities ) 
				{
					for ( var i = 0; i < options.cities.length;  i++ )
					{
						// First, check if exist the city_id (by Lord Mimir)
						if ( Seed.city_idx[options.cities[i]] !== undefined ) {
							setTimeout( Seed.fetchCity, Math.randRange(i*1000,i*3000) , options.cities[i], callback );
						}
					}
					return;
				}
				
				// Fill the city_init array 
				// (used here & in the StartUp process so it must be before to verified options.noCities)
				var i = 0;
				for ( city in r.dat.cities ) 
				{
					if ( Seed.city_init[i] === undefined ) {
						Seed.city_init[i] = {};
					}
					Seed.city_init[i].id = r.dat.cities[city].id;
					Seed.city_init[i].type = city;
					i++;
				}
				
				// option.noCities (boolean)
				// Don't fetch Cities if we are from StartUp, because we do from there
				if ( options && options.noCities ) 
				{
					if ( callback )
					{
						callback ( r );
					}
					return;
				}
				
				
				// OK, fetch all cities

				try {
					for ( var i=0; i < Seed.city_init.length; i++ )
					{
						if ( Seed.city_init[i].timer ){
							clearTimeout ( Seed.city_init[i].timer );
						}
						Seed.city_init[i].timer = setTimeout( Seed.fetchCity, Math.randRange(i*2000,i*4000), Seed.city_init[i].id, callback  );
					}
				} catch (e) {
					r.ok = false;
					r.errmsg = e.toString();
					Data.requests.player.errors++;
				}
			}
			else if ( r.ok && r.dat.errors ) {
				r.ok = false;
				r.errmsg = r.dat.errors;
				Data.requests.player.errors++;
			}
			
			if ( callback ){
				callback ( r );
			}
		});
	},
	
	/* Jobs Tick
	* Called once per second - to check for job completion (Fixed by Lord Mimir)
	*/
	tick : function () 
	{ 
		var t = Seed;
		var now = parseInt( serverTime() ) - 1;
		
		var refresh_cities = [];

		// Check for job completion
		
		/* Cities */
		for ( var city_id in t.jobs )
		{
			/* Jobs */
			for ( var job_id in t.jobs[city_id] ) 
			{
				var job = t.jobs[city_id][job_id];
				
				if ( job.done ) {
					if ( now > ( job.run_at - 5 ) )
					{
						var march = t.marches[job.march_id];
						// Check first if is a march
						if ( march ) {
							// Only Delete if not encamped
							if( march.status !== 'encamped' ){
								delete ( t.jobs[city_id][job_id] );
							}
						}
						// Ok, is not a March
						else {
							delete ( t.jobs[city_id][job_id] );
						}
					} 
				} else {
					if ( now > ( job.run_at - 5 ) )	{
					
						job.done = true;
						
						delete ( t.jobs[city_id][job_id] );
						
						var march = t.marches[job.march_id];
						
						// Check first if is a march
						if ( march ) 
						{
							// march just reached target
							if ( job.queue=='march' && march.status=='marching' ) {
								if ( DEBUG_MARCHES ) {
									debugLog ('MARCH at TARGET!');
								}
								
								t.fetchCity ( city_id );
								Map.scanMap ( march.x, march.y, 7 );
								t.fetchGenerals ( city_id );
								
								Messages.marchAtTarget();
								
								if ( t.num_marches ) {
									--t.num_marches;
									if ( t.num_marches < 0 ) t.num_marches = 0;
								}
							}
							
						}
						// Ok, is not a March
						else {
							t.fetchCity ( city_id );
						}
					}
				}
			}
		}
		
		// delete expired marches ...
		for ( var id in t.marches ) {
			var march = t.marches[id];
			if ( (march.run_at < now - 30) || (march.status=='retreating' && march.run_at < now - 2) ) {
			
				delete ( t.marches[id] );
				
				// fetchCity and generals it for get correct army counts as soon as march returns.
				if( march.status=='retreating' )
				{
					refresh_cities[0] = t.cities[0].id;
					//Seed.fetchCity (city_id);
					//Seed.fetchGenerals (city_id);
				}
				
				// Refresh city when dragon in march (based in Didi idea)
				if ( march.units['WaterDragon'] ) {
					refresh_cities[1] = t.cities[1].id;
				}
				if ( march.units['StoneDragon'] ) {
					refresh_cities[2] = t.cities[2].id;
				}
				if ( march.units['FireDragon'] ) {
					refresh_cities[3] = t.cities[3].id;
				}
				if ( march.units['WindDragon'] ) {
					refresh_cities[4] = t.cities[4].id;
				}
				
				if ( t.num_marches ) {
					--t.num_marches;
					if ( t.num_marches < 0 ) t.num_marches = 0;
				}
			}
		}
		
		// When marches finish, refresh Cities (based in Didi idea)
		if ( refresh_cities.length ) {
			for (var idx = 0; idx < refresh_cities.length; idx++ )
			{
				t.fetchCity ( refresh_cities[idx] );
			}
		}
		
	},
	
	updateCity : function ( city ) 
	{
		var t = Seed;
		
		if ( !city ) return;
		
		verboseLog('Updating City values: ' + city.name);
		
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
			switch ( city.outpost_type )
			{
			case 'WaterDragonOutpost'    : city_idx = 1; break;
			case 'StoneDragonOutpost'    : city_idx = 2; break;
			case 'FireDragonOutpost'     : city_idx = 3; break;
			case 'WindDragonOutpost'     : city_idx = 4; break;
			case 'SpectralDragonOutpost' : city_idx = 5; break;
			default: 
				city_idx = t.cities.length;  //this will add any new outpost when it comes out. (used default outpost settings when it does)
			}
			
			if ( city_idx === 0 ) city_idx = 1; // I think that can never be zero here (La Larva)

			if ( typeof t.cities[city_idx] !== 'undefined' && t.cities[city_idx] !== null )
			{
				t.city_idx[t.cities[city_idx].id] = t.cities.length;
				t.cities[t.cities.length] = t.cities[city_idx];
			}
		}
		
		t.cities[city_idx] = city;
		
		t.city_idx[city.id] = city_idx;
		
		t.city_time[city.id] = serverTime();  
		
		if ( city_idx === 0 ) 
		{

			// Update Seed.generals
			for ( var i=0; i < city.generals.length; i++ )
			{
				t.generals[city.generals[i].id] = city.generals[i];
			}
			t.num_generals = city.generals.length;
			
			// Update Seed.marches
			t.num_marches = 0;
			for ( var i=0; i < city.marches.length; i++ )
			{
				var march = city.marches[i];
				
				t.marches[march.id] = march; //.cloneProps();
				
				if ( march.general_id ){
					++t.num_marches;
					t.generals[march.general_id].busy = true;
				}
				var dragon_type=null;
				for( var unit_type in  march.units )
				{
					if( /(WindDragon|FireDragon|StoneDragon|WaterDragon|GreatDragon)/.test( unit_type ) )
					{
							dragon_type = unit_type;
					}
				}
				if ( dragon_type !== null && t.dragons[dragon_type] )
				{
					t.dragons[dragon_type].is_in_city = false;
				}
				t.marches[march.id].target_name = march.destination_name  ? translate('City') + ' ' + march.destination_name : translate( march.terrain_type );
			}
			verboseLog('Updated Seed.marches - total:' + city.marches.length + ' / marching: ' + t.num_marches + ' - retreating: ' + (city.marches.length ? city.marches.length - t.num_marches - 1 : 0));
		}
		
		// Add dragons object (by Didi)
		var dragon = null;
		
		switch ( parseInt( city_idx ) )
		{
		case 0:
			dragon = city.great_dragon; 
			break;
		case 1:
			dragon = city.water_dragon; 
			break;
		case 2:
			dragon = city.stone_dragon; 
			break;
		case 3:
			dragon = city.fire_dragon; 
			break;
		case 4:
			dragon = city.wind_dragon; 
			break;
		}

		if ( dragon !== null ) {
			//if ( city_idx === 1 )
			//debugLog('city '+city_idx+':\n'+inspect(city,4,1));
			
			var dragon_type = ( ['GreatDragon','WaterDragon','StoneDragon','FireDragon','WindDragon'] )[city_idx];
			var aerial_combat_level = (Seed.player.research['AerialCombat']) ? Seed.player.research['AerialCombat'] : 0; 
			
			t.dragons[dragon_type] = dragon;
			
			t.dragons[dragon_type].name       = dragon_type;
			t.dragons[dragon_type].armors     = t.checkArmorDragon( dragon_type );
			t.dragons[dragon_type].city_id    = city.id;
			t.dragons[dragon_type].can_attack = ( t.dragons[dragon_type].level >=8 && t.dragons[dragon_type].armors === 4 && aerial_combat_level > 0 );
		
			if ( dragon.life !== dragon.maximum_life ) 
			{
					t.dragons[dragon_type].cure_at = serverTime() + ((dragon.maximum_life - dragon.life) / dragon.recovery_rate)*3600;
			}
			else {
					t.dragons[dragon_type].cure_at = serverTime();
			}
		}
		
		
		// Check Jobs
		for ( var i=0; i < city.jobs.length; i++ ){
			t.checkAddJob ( city.jobs[i] );
		}
		
		
		for ( var i=0; i < t.city_init.length; i++ ){
			if ( t.city_init[i].id === city.id && !t.city_init[i].loaded) {
				t.city_init[i].loaded = true;
				var message = 'City ' + city.id + ' Successfully initialised';
				verboseLog(message);
				console.log(message);
			}
		}

	},
	
	// Function to count number of piece armor (by Didi)
	checkArmorDragon : function ( dragon_type )
	{
		var t = Seed;
		var armors = ['BodyArmor','ClawGuards','TailGuard','Helmet'];
		var ret = 0;
		
		for ( var i = 0; i < armors.length; i++ )
		{
			if ( Seed.getItem( dragon_type + armors[i] ) !== 0 ) {
				ret++;
			}
		}
		return ret;
	},

	// Returns the quantity of the specified item type or zero if the item type is not found
	getItem : function ( type ) 
	{
		return Seed.player.items[type] || 0;
	},

	// if fetchcity is pending, will notify when complete, else notifies right away...
	update_notify_queue : [],
	notifyOnUpdate : function (notify) 
	{
		verboseLog('update_notify_queue');
		var t = Seed;
		if ( !RequestQueue.isPending( 'fetchCity' ) ) 
		{
			notify();
			return;
		}
		
		t.update_notify_queue.push ( notify );
	},

	checkAddJob : function ( job )
	{
		var t = Seed;
		var city_id = job.city_id;
		
		if ( !job.run_at )
		{
			debugLog ('checkAddJob job.run_at is null:\n'+ inspect (job, 5, 1));
			if ( ALERT_ON_BAD_DATA ){
				alert ('checkAddJob job.run_at is null');
			}
		}    
		
		if ( !t.jobs[city_id] ) {
			t.jobs[city_id] = {};
		}
		
		if ( job.queue === 'march' )
		{
			if ( !t.marches[job.march_id] ) 
			{
				debugLog ('checkAddJob MISSING MARCH:\n'+ inspect (job, 5, 1) +'\n'+ inspect(t.marches, 5, 1));
				if ( ALERT_ON_BAD_DATA ){
					alert ('checkAddJob MISSING MARCH');
				}
				if ( job.run_at < serverTime() ){
					return;               // ?????? delete from Seed.jobs  ????
				}
			} 
			else {  
				t.marches[job.march_id].run_at = job.run_at;
				t.marches[job.march_id].duration = job.duration;
			}
		} 
		
		if ( job.queue === 'units' ){
		}

		if ( t.jobs[city_id][job.id] ) {
			return;
		}
		job.run_at += 2;      
		t.jobs[city_id][job.id] = job.cloneProps ();
	},

	checkIncomingData : function (r)
	{
		var t = Seed;
		// check seed for missing building ...      
		for ( var i = 0; i < r.dat.city.jobs.length; i++ )
		{
			var job = r.dat.city.jobs[i];
			if ( job.queue === 'building' )
			{
				var building = null;
				for ( var j = 0; j < r.dat.city.buildings.length; j++ )
				{
					if ( r.dat.city.buildings[j].id === job.city_building_id ){
						building = r.dat.city.buildings[j];
						break;
					}
				}
				if ( !building )
				{
					debugLogText ('*********************** MISSING BUILDING! ('+ job.city_building_id +') now='+ serverTime() +'\n' + inspect (job, 7, 1) +'\n'+ inspect (r, 12, 1));
					if ( ALERT_ON_BAD_DATA ){
						alert ('Danger Will Robinson! (missing building)');
					}
				}
			}
		}
		
		if ( !r.dat.city.marches ){
			return;
		}
		
		// check seed for missing march ...  
		for ( var i = 0; i < r.dat.city.jobs.length; i++ )
		{
			var job = r.dat.city.jobs[i];
			if ( job.march_id )
			{
				if ( t.findMarch( job.march_id, r.dat.city.marches ) === null )
				{
					debugLogText ('*********************** MISSING MARCH, Job ID:'+ job.march_id +' (now='+ serverTime() +')\n'+ inspect (job, 7, 1) +'\n'
					+ inspect (r, 12, 1));
					if ( ALERT_ON_BAD_DATA ){
						alert ('Danger Will Robinson! (missing march)');
					}
				}
			}
		}   
		
		// check seed for missing march job ...  
		for ( var i = 0; i < r.dat.city.marches.length; i++ )
		{
			var march = r.dat.city.marches[i];
			var job = null;
			for ( var j = 0; j < r.dat.city.jobs.length; j++ )
			{
				if ( r.dat.city.jobs[j].march_id === march.id )
				{
					job = r.dat.city.jobs[j];
					break;
				}
			}
			if ( job === null )
			{
				debugLogText ('*********************** MISSING JOB FOR MARCH!  march_id:'+ march.id +'\n'+ inspect (r, 11, 1));
				if ( ALERT_ON_BAD_DATA ){
					alert ('MISSING JOB FOR MARCH!');
				}
			}
		}
	},

	findMarch : function ( march_id, marches )
	{
		for ( var id=0; id < marches.length; id++ )
		{
			if ( marches[id].id === march_id ){
				return marches[id];
			}
		}
		return null;
	}

}; // END Seed




Translation = {
	loaded : false,
	object	: {},
	available_langs : {
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
	
	init : function ( callback ) 
	{
		var t = Translation;
		t.fetchLocale(function (r) {
			if ( r.ok ) {
				verboseLog('Locale data was Successfully requested from the sever');
				t.loaded = true;
				t.fixResults();
			}
			if ( callback ){
				callback ( r );
			}
		});
	},

	fetchLocale : function ( callback ) 
	{
		var t = Translation;
		var p = {};
		p['_swf_session_id'] = SESSION_ID;
		new MyAjax.RequestDOA ( 'locales/' + ( t.available_langs[LANG_CODE] ? LANG_CODE : 'en') + '.xml', 'GET', p, function (r) {
			if ( r.ok ) {
				try {
					t.parseXML( r.dat );
					
				} catch (e) {
					r.ok = false;
					r.errmsg = e.toString();
				}
			} 
			else if ( r.errmsg.indexOf('404') !== -1 ) {
				var p = {};
				p['_swf_session_id'] = SESSION_ID;
				new MyAjax.RequestDOA ( 'locales/en.xml', 'GET', p, function(r) {
					if ( r.ok ) {
						try {
						
							t.parseXML(r.dat);
							
						} catch (e) {
							r.ok = false;
							r.errmsg = e.toString();
						}
					}
					if ( callback ) {
						callback ( r );
					}
				});
			}
			if ( callback ){
				callback ( r );
			}
		});
	},
	
	parseXML : function( xml_string )
	{
		var t = Translation;
		var fragment = [];
	
		fragment.push( '<?xml version="1.0" encoding="UTF-8"?>' );
		fragment.push( '<translations>' );
		
		for ( i = 0; i < t._section.length; i++ )
		{
			var start = xml_string.indexOf( '<' + t._section[i] + '>' );
			var end = xml_string.indexOf( '</' + t._section[i] + '>') + t._section[i].length + 3;
			fragment.push( xml_string.substring( start, end ) );
			xml_string = xml_string.substring( 1, start ) + xml_string.substring( end) ;
		}
		
		fragment.push( '</translations>' );

		var xml_obj = new XML.ObjTree();
		t.object = xml_obj.parseXML( fragment.join('').replace(/\n/g,'') );

		if ( t.object.translations ) {
			t.object = t.object.translations;
		} else {
			verboseLog('<b>ERROR</b> in the XML file structure: <b><translations></b> element not found!');
		}
	},
	
	fixResults : function()
	{
		var t = Translation.object;
		
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
			var r={};
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
		
		var section = ['dialogs','messages'];//,'errors','confirmations'
		for ( var i=0; i < section.length; i++ )
		{
			t[section[i]] = objectToFlat( t[section[i]] );
		}
			
		
		
		t.common.information = t.common.info;
		t.common.omit = t.common.skip;
		t.common['spy-on'] = t.common.spy;
		t.dialogs.researching = t.dialogs.research;
		
		t.common['enter-coords'] = t.dialogs['attack-screen-enter-coords'];
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
		key = Translation._normalize(key);
		if ( Translation.object[section] !== undefined ) 
		{
			if ( ( Translation.object[section] )[key] !== undefined ) 
			{
				return subkey ? ( ( Translation.object[section] )[key] )[subkey] : ( Translation.object[section] )[key];
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
	}
	
}; // END Translation

// Provide language translation services
translate = function( text ) 
{
	//if (text===undefined) return;
	
	if ( LANG_OBJECT[text] !== undefined ) {
		return LANG_OBJECT[text];
	}
	else if ( Translation.loaded ){
		var new_str;
		for ( var i = 0; i < Translation._section.length; i++ )
		{
			new_str = Translation[Translation._section[i]]( text );
			if ( new_str ){
				return new_str;
			}
		}
		
		if ( IS_NOT_NATIVE_LANG && ToTranslate[text] === undefined ) {
			ToTranslate[text] = 1;
			if ( Tabs.Logs ) {
				debugLog( '( Translate ) -> ' + text );
			}
		}
	}
	
	return text;
};

VerboseLog = {
	init : function () 
	{
		var t = VerboseLog;
		t.setEnable( Data.options.verbose_log.enabled );
	},
	
	setEnable : function ( on_off ) 
	{
		var t = VerboseLog;
		Data.options.verbose_log.enabled = on_off;
	}
};// END VerboseLog

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


function getAvailableDragons ( dragon_type )
{
	var ok = false;
	if ( Seed.dragons[dragon_type] ) {
		ok = Seed.dragons[dragon_type].can_attack;
	}

	return { status: ok };
}

function getAvailableGeneral ()
{
	for ( var p in Seed.generals )
	{
		if ( !Seed.generals[p].busy )
		{
			return Seed.generals[p];
		}
	}
	return null;
}

function getMusterPointSlots ( city_idx )
{
	var level = Buildings.getLevel ( city_idx, 'MusterPoint' );
	if ( !level ){
		return 0;
	}
	return level - Seed.num_marches;
}

function getMusterPointLevel ( city_idx )
{
	return ( Buildings.getLevel ( city_idx, 'MusterPoint' ) || 0 );
}

// Wham
// When (if) the maximum level of the Muster Point changes
// add a new case statement
function getMaxTroops()
{
  var lvl = getMusterPointLevel(0);
  var max_troops = 0;
  if (lvl <= 10) max_troops = lvl * 10000;
  else
    switch(lvl)
    {
      case 11: max_troops = 120000; break;
      case 12: max_troops = 140000; break;
      case 13: max_troops = 160000; break;
      default: max_troops = 180000; 
    }
  return max_troops;
}

function getBuildingJob ( city_idx )
{
	var city_id = Seed.cities[city_idx].id;
	for ( var job_id in Seed.jobs[city_id] )
	{
		var job = Seed.jobs[city_id][job_id];
		if ( job.queue === 'building' )
		{
			return ({ job: job, building: Buildings.getById( city_idx, job.city_building_id ) } );
		}
	}
	return null;
}

function getResearchJob ( city_idx )
{
	var city_id = Seed.cities[city_idx].id;
	for ( var job_id in Seed.jobs[city_id] )
	{
		var job = Seed.jobs[city_id][job_id];
		if ( job.queue === 'research' ){
			return ( job );
		}
	}
	return null;
}

function getBuildingById ( city_idx, building_id )
{
	var buildings = Seed.cities[city_idx].buildings;
	for ( var i = 0; i < buildings.length; i++ )
	{
		if ( buildings[i].id === building_id ){
			return buildings[i].type;
		}
	}
	
	return '';
}

function MarchTracker ()
{
	var marches = {};

	function MarchTracker (){
	}

	this.setReportDelete = function (on_off){
	}
	this.setUnitLossListener = function (listener){
	} 
}

function deleteResearchJob ( job )
{
	var city_id = Seed.cities[0].id;
	var jobs = Seed.jobs[city_id];
	
	for ( var job_id in jobs )
	{
		if (jobs[job_id] === job){
			delete jobs[job_id];
		}
	} 
}

function deleteBuildJob( city_idx, job )
{
	var city_id = Seed.cities[city_idx].id;
	var jobs = Seed.jobs[city_id];
	
	for ( var job_id in jobs )
	{
		if ( jobs[job_id] === job ){
			delete jobs[job_id];
		}
	} 
}

function getBuildJob ( city_idx )
{
	var city_id = Seed.cities[city_idx].id;
	var jobs = Seed.jobs[city_id];
	
	for ( var job_id in jobs )
	{
		//console.log(jobs[job_id].queue);
		if ( jobs[job_id].queue === 'building' ) {
			return jobs[job_id];
		}
	}
	return null;
}

function getTrainJob ( city_idx )
{
	var city_id = Seed.cities[city_idx].id;
	var jobs = Seed.jobs[city_id];
	
	for ( var p in jobs )
	{
		if ( jobs[p].queue === 'units' ){
			return jobs[p];
		}
	}
	return null;
}

// (Modify by Didi)
function trainTable ( myId )
{
	var now = serverTime();
	
	var html = '<table class=' + UID['table'] + '>';
	
	for ( var city_idx = 0; city_idx < Seed.cities.length; city_idx++ )
	{
		var last_time = serverTime(), trains = [];
		
		var city = Seed.cities[city_idx];
		
		// in case the city is not been defined in Seed.updateCity skip to next in array.
		if ( !city ) continue;
		
		var jobs = city.jobs;
		for ( var i = 0; i < jobs.length; i++ )
		{
			if ( jobs[i].queue=='units' && 
				 jobs[i].unit_type && 
				 jobs[i].run_at > last_time
				){
					trains.push ( jobs[i] );
			}
		}
		trains.sort( function(a,b){ return a.run_at - b.run_at; } );
		
		var len = trains.length;
		for ( var i = 0; i < len; i++ )
		{
			var city_name='', total_time='', left_time = 0;
			if ( i === 0 )
			{
				city_name = city.name +':'; 
			}
			else if ( i === len - 1 ) {
				left_time = ( trains[i].run_at - serverTime() > 0 ) ? trains[i].run_at - serverTime() : 0;
				total_time = '&nbsp;<b>('+ timeFormatShort(left_time) +')</b>';
			}
			
			left_time = ( trains[i].run_at - last_time > 0 ) ? trains[i].run_at - last_time : 0;
			
			html += 
			  '<tr><td class=right><b>' + city_name + '</b>&nbsp;</td>'
			+ '<td align=right>' + trains[i].quantity + '&nbsp;&nbsp;' + translate(trains[i].unit_type) + '&nbsp;</td>'
			+ '<td>&nbsp;<font color=' + TIMER_COLOR + '>' + timeFormat(left_time, true) + total_time + '</font></td>'
			+ '</tr>';
			
			last_time = trains[i].run_at;
		}
		 
		if ( trains.length === 0 ){
		  html += 
		    '<tr><td class=right><b>' + translate( city.name ) + ':</b>&nbsp;</td>'
		  + '<td colspan=2><span class=' + UID['bold_red'] + '>' + translate('Off') + '</span></td>'
		  + '</tr>';
		 }
	}
	return html + '</table>';
}





//******************************** Info Tab *****************************
Tabs.Info = {
	tab_order	: INFO_TAB_ORDER,
	tab_label	: 'Info',
	tab_disabled: !INFO_TAB_ENABLE,
	$container	: null,
	timer		: null,
	units_type	: ['Porter','Conscript','Spy','Halberdsman','Minotaur','Longbowman','SwiftStrikeDragon','BattleDragon','ArmoredTransport','Giant','FireMirror','PackDragon','AquaTroop','StoneTroop','FireTroop','WindTroop'],
	dragons_type	: ['GreatDragon','WaterDragon','StoneDragon','FireDragon','WindDragon'],

	init : function ( div )
	{
		var t = Tabs.Info;
		t.$container = $J( div );
		
		$J('<div />').
		attr ({
			id		: setUID('Tabs.Info.title'),
			class	: UID['title'],
		}).
		html ( translate('Info') ).
		after( $J('<table />').
			width('100%').
			append(	$J('<tr />').
				append( $J('<td />').
					append( $J('<input />').
						attr({
							type		: 'button',
							value		: translate('Refresh')
						}).
						click ( refresh )
					)
				).
				append( $J('<td />').
					css({ 
						textAlign : 'right' 
					}).
					everyTime( '1s', utcTime )
				)
			)
		).
		after( $J('<div />').
			attr({
				id		: setUID('Tabs.Info.content'),
				class	: UID['scrollable']
			}).
			height('640px')
		).
		appendTo (t.$container);

		function utcTime()
		{
			var now = new Date();  
			now.setTime( now.getTime() + ( now.getTimezoneOffset() * 60000 ) );
			$J( this ).html( '<b>' + now.toTimeString().substring (0,8) +'</b> UTC' );
		}
					
		function refresh ()
		{
			debugLog('fetchPlayer from Tabs.Info refresh');
			var t = Tabs.Info;
			Seed.fetchPlayer ( t.showStuff() );  
		}
		
		
		t.showStuff();
	},

	show : function (){
		var t = Tabs.Info;
		t.timer = setInterval ( t.showStuff, 1000 );
	},
	hide : function (){
		var t = Tabs.Info;
		clearInterval ( t.timer );
	},

	showStuff : function (){
		var t = Tabs.Info;
		
		var city = Seed.cities[0];
		
		var html = '';

		function cityTitle ( city_idx )
		{
			var city = Seed.cities[city_idx];
			// Outposts are always defending (until further notice)
			var wall_status = '';
			var alliance_name = ( Seed.player.alliance ) ? Seed.player.alliance.name : '';
			if ( city_idx === 0 )
			{
				if ( Seed.cities[city_idx].defended ) 
				{
					wall_status = '<span class=' + UID['defending'] + '>' + translate('Defend').toUpperCase() + '</span>';
				} 
				else {
					wall_status = '<span class=' + UID['hiding']    + '>' + translate('Hiding').toUpperCase() + '</span>';
				}
			} 
			else {
				wall_status = '<span class='+ UID['defending'] +'>'+ translate('Defend').toUpperCase() +'</span>';
			}
			
			html =
			 '<div class=' + UID['subtitle'] + '>'
			+'	<table class=' + UID['table'] + '>'
			+'	<tr>'
			+'		<td align=left>' + city.name + '</td>'
			+'		<td align=center>' + city.x + ',' + city.y + '</td>'
			+'		<td align=center width=200px>'
			+'			<font color=yellow>' + alliance_name + '</font>'
			+'		</td>'
			+'		<td width=80px align=right>' + wall_status + '</td>'
			+'	</tr>'
			+'	</table>'
			+'</div>';
			
			return html;
		}
		
		
		html += cityTitle( 0 )
		+'<table class=' + UID['table'] + ' style="margin-top:3px" width=100%>'
		+'	<tr>'
		+'		<th>' + translate('Armed Forces') + '</th>'
		+'		<th>' + translate('My Generals') + '</th>'
		+'	</tr>'
		+'	<tr valign=top align=center>'
		+'		<td width=50% style="border-right: 1px solid;">';
		
		// Units
		html += '<table class=' + UID['table'] + '>';
		
		for ( var i=0; i < t.units_type.length; i++ )
		{
			var num_units = getUnitNumbers( city, t.units_type[i] );
			
			html +=
			 '		<tr>'
			+'			<td class=right>' + translate(t.units_type[i]) + ':</td>'
			+'			<td align=right>' + num_units.incity + '</td>'
			+'			<td align=right>' + (num_units.marches ? '&nbsp;+&nbsp;<b>(' + num_units.marches + ')</b>' : '') + '</td>'
			+'		</tr>';
		}
		
		html +=
		 '			</table>'
		+'		</td>'
		+'		<td width=50% style=" padding-left:7px">';
		
		html +=
		 '			<table class=' + UID['table'] + '>'
		+'			<tr>'
		+'				<td align=right>' + translate('Marching') + ': </td>'
		+'				<td>' + Seed.num_marches + '</td>'
		+'			</tr>'
		+'			</table>';
		
		// Generals
		html += 
		 '			<table class=' + UID['table'] + '>'
		+'				<tr>'
		+'					<th>' + translate('Name') + '</th>'
		+'					<th>' + translate('Victory') + '</th>'
		+'					<th>' + translate('Coordinates').substring(0,5) + '</th>'
		+'				</tr>';
		
		var loc = '';
		for ( var i=0; i < city.generals.length; i++ )
		{
			if ( Seed.num_marches )
			{
				for ( var id in Seed.marches )
				{
					// The general object will be null if the march is a transport
					if ( Seed.marches[id].march_type !== 'TransportMarch' )
					{
						try {
							if (city.generals[i].name === Seed.marches[id].general.first_name)
							loc = Seed.marches[id].x + ',' + Seed.marches[id].y;
						}
						catch (e) {
							verboseLog('<b>Error</b>: general first_name not available' + e.name + ' ' + e.message);
						}
					}
				}
			}
			
			html +=
			 '		<tr>'
			+'			<td align=right>' + city.generals[i].name  + ' <span class=jewel>(' + city.generals[i].rank + ')</span></td>'
			+'			<td align=right><span class=jewel style="color:black;">' + city.generals[i].victories + '</span></td>'
			+'			<td>' + (city.generals[i].busy ? '<span class=jewel>[' + loc + ']</span>' :'') + '</td>'
			+'		</tr>';
		}
		
		html +=
		 '			</table>'
		+'		</td>'
		+'		</tr>'
		+'</table>';
		
		
		// Wham 
		// show training items
		html +=
		'<table class=' + UID['table'] + ' style="margin-top:3px" width=50%>'
		+'	<tr>'
		+'		<th colspan=2>' + translate('Training Items') + '</th>'
		+'	</tr>';

		html +=
		 '<tr><td align=right>' + translate('AquaTroopRespirator') + '</td>'
		+'    <td align=right><span class=jewel>' + Seed.getItem('AquaTroopRespirator') +'</span></td></tr>' 
		+'<tr><td align=right>' + translate('StoneTroopItem') + '</td>'
		+'  <td align=right><span class=jewel>' + Seed.getItem('StoneTroopItem') +'</span></td></tr>' 
		+'<tr><td align=right>' + translate('FireTroopItem') + '</td>'
		+'  <td align=right><span class=jewel>' + Seed.getItem('FireTroopItem') +'</span></td></tr>' 
		+'<tr><td align=right>' + translate('WindTroopItem') + '</td>'
		+'  <td align=right><span class=jewel>' + Seed.getItem('WindTroopItem') +'</span></td></tr>' 
		+'<tr><td align=right>' + translate('AnthropusTalisman') + '</td>'
		+'  <td align=right><span class=jewel>' + Seed.getItem('AnthropusTalisman') +'</span></td></tr>'  
		+'</table>';
	
		
		// Marches, building, research, training
		$J('#'+UID['Tabs.Info.content']).html( html );
	
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
	
	units_type		: ['ArmoredTransport', 'PackDragon', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'Giant', 'FireMirror', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop'],
	dragons_type	: ['GreatDragon','WaterDragon','StoneDragon','FireDragon','WindDragon'],

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
		+'	<div class=' + UID['status_report'] + ' style="margin-top:5px;height:140px; max-height:140px; overflow-y:auto;">'
		+'		<table id=' + setUID('Tabs.Waves.marches') + ' class=' + UID['table'] + '>'
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

		t.setWaveEnable (false);
		
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
		
		
		function setUnitsTable (tab, rownum, prefix, listener) {
			var t = Tabs.Waves;
			var row =[];
			row.push(tab.insertRow(rownum));
			row.push(tab.insertRow(rownum+1));
			row.push(tab.insertRow(rownum+2));
			row.push(tab.insertRow(rownum+3));
			//row[0].align='center';
			
			var val, r=0, c=0;
			for (var i=0; i < t.units_type.length; i++)
			{
				/*
				if (getUnitNumbers(Seed.cities[0], t.units_type[i]).total < 1) {
					continue;
				}
				*/
				if (i === 6) {
					r = r + 2;
					c = 0;
				}
				var label = row[r].insertCell(c);
				label.innerHTML = translate('~'+t.units_type[i]);
				label.style.width = '45px';
				
				var input = document.createElement ('input');
				input.type = 'text';
				input.size = '1';
				input.style.width = '40px';
				input.title = translate(t.units_type[i]);
				
				if (i < 2) {
					input.style.border = '1px solid grey';
				} else if (i < 6) {
					input.style.border = '1px solid green';
				} else {
					input.style.border = '1px solid blue';
				}
				
				input.maxlength = '6'; // Allow 100,000 units to be sent
				
				
				if (Data.options.waves.units[t.units_type[i]] === undefined){
					Data.options.waves.units[t.units_type[i]] = 0;
				}
				val = Data.options.waves.units[t.units_type[i]];
				
				if (!val){ val = 0;	}
				
				input.value = val;
				input.setAttribute( 'ref', i );
				
				$J(input).change ( function ( event, ui ){
					var idx = $J(this).attr('ref');
					var unit_type = t.units_type[idx];
					Data.options.waves.units[unit_type] = event.target.value;
				} );
				
				row[r+1].insertCell(c).appendChild (input);
				
				c = c + 1;
				
			}
			return tab;
		}
		
	
		function setDragonsTable (table) {
			var t = Tabs.Waves;
			var row = table.insertRow(1);

			var dragons = Data.options.waves.dragons;
			
			for (var dragon_idx = 0; dragon_idx < t.dragons_type.length; dragon_idx++)
			{
				
				var dragon_type = t.dragons_type[dragon_idx];
				
				var cell = row.insertCell(dragon_idx);
				cell.style.verticalAlign = 'middle';
				cell.style.paddingRight = '5px';
				
				$J('<span />').
				html( translate(dragon_type).replace(/\s/,'<br>').replace(/\./,'') ).
				css( {
					display		: 'inline-block',
					width		: '45px',
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
					var dragon_type = t.dragons_type[$J(this).attr('name')];
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
					text(num + 'є').
					appendTo($select);
				}
		
			}
			return table;
		}
	
		// Event Listeners
		$J('#'+UID['Tabs.Waves.tabTargets.coord_x']).change( t.onChangeCoords );
		$J('#'+UID['Tabs.Waves.tabTargets.coord_y']).change( t.onChangeCoords );
		
		// Add Units table
		setUnitsTable ($id(UID['Tabs.Waves.tabTargets.units']), 1, 'AW');

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
		 '<div class=' + UID['status_ticker'] + ' style="margin-top:10px !important">'
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
			+'		<td class=right>' + translate('Run Time') + ': </td>'
			+'		<td width=90%>' + timeFormat(run_time, true) + '</td>'
			+'	</tr><tr>'
			+'		<td class=right>' + translate('Attacks') + ': </td>'
			+'		<td>' + Data.stats.waves.attacks + '</td>'
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
				+ '		<td class=right>' + translate(item) + ':</td>'
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
				,attacks	: 0
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
		+'		<tr>'
		+'			<td class=right> ' + translate('Delete') + ' ' + translate('Battle Report') + ':&nbsp;</td>'
		+'			<td><input id=' + setUID('Tabs.Waves.tabOptions.deleteReports') + ' type=checkbox ' + (Data.options.waves.delete_reports?'CHECKED':'') + ' /></td>'
		+'		</tr><tr>'
		+'			<td class=right>' + translate('Stop if any troops lost') + ':&nbsp;</td>'
		+'			<td><input id=' + setUID('Tabs.Waves.tabOptions.stopOnLoss') + ' type=checkbox ' + (Data.options.waves.stop_on_loss?'CHECKED':'') + ' /></td>'
		+'		</tr><tr>'
		+'			<td class=right>' + translate('Delay Between Attacks') + ':&nbsp;</td>'
		+'			<td>'
		+'				<input id=' + setUID('Tabs.Waves.tabOptions.delayMin') + ' type=text size=1 maxlength=4 value="' + Data.options.waves.delay_min + '" />&nbsp;-&nbsp;'
		+'				 <span id=' + setUID('Tabs.Waves.tabOptions.delayMax') + '>' + Data.options.waves.delay_max + '</span>&nbsp;' + translate('Seconds')
		+'			</td>'
		+'		</tr>'
		+'	</table>';
		
		t.$content.html ( html );
		
		function onChangeDelay (event){
			/*
			* WARNING: Changing this values cause too many requests to the server 
			*          that are monitored. Thats gives them reason to increase the security 
			*          on the servers and, sooner or later, make this scripts unusable.
			*            
			*      PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
			*
			*                   ( We will end up losing everyone )
			*/
			var min = parseIntZero(event.target.value);
			var max = parseInt(min + 15);
			if (min < 25 || min > 3600){
				if(min < 25) min = 25;
				else min = 3600;
				event.target.style.backgroundColor = '#faa';
				return;
			}
			$id(UID['Tabs.Waves.tabOptions.delayMax']).innerHTML = max;
			event.target.style.backgroundColor = '';
			Data.options.waves.delay_min = min;
			Data.options.waves.delay_max = max;
		}
		
		// Event Listeners
		$J('#'+UID['Tabs.Waves.tabOptions.deleteReports']).click (function( event ){
			Data.options.waves.delete_reports = event.target.checked;
		});
		$J('#'+UID['Tabs.Waves.tabOptions.stopOnLoss']).click ('click', function( event ){
			Data.options.waves.stop_on_loss = event.target.checked;
		}, false);

		$J('#'+UID['Tabs.Waves.tabOptions.delayMin']).change ( onChangeDelay );
	},
		

	
	gotBattleReport : function (r){
		var t = Tabs.Waves;
		
		if (r.report.location.x === Data.options.waves.target.x && 
			r.report.location.y === Data.options.waves.target.y
			){
				++Data.stats.waves.attacks;
				
				var march_id = null;
				for (var id in Data.marches.waves )
				{
					var march = Data.marches.waves[id];
					
					if (march.x === r.report.location.x && 
						march.y === r.report.location.y &&
						march.general.id === r.report.attacker.general.id
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


	dispFeedback : function (msg){
		if (msg && msg!='')
		msg = new Date().toTimeString().substring (0,8) +' '+ msg;
		$id(UID['Tabs.Waves.feedback']).innerHTML = msg;
	},

	setWaveEnable : function (on_off){
		var t = Tabs.Waves;
		var but = $id(UID['Tabs.Waves.enabled']);
		
		clearTimeout (t.timer.attack);
		Data.options.waves.enabled = on_off;
		
		if ( on_off ) {
			but.value = translate('Attacking').toUpperCase();
			but.className = UID['btn_on'];
			
			t.running.start_at = serverTime();
			t.running.attacks = 1;
			
			// Yes, check here if attacks are enabled
			if (!Data.options.attacks.enabled){
				Data.marches.count_limit = 1;
				Data.marches.start_at = serverTime();
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
			var left_time = ( Seed.marches[id].run_at - parseInt(serverTime()) ) * (Seed.marches[id].status=='marching' ? 2 : 1);
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
		
		
		if (MyAjax.march_busy > 0){
		
			MyAjax.march_busy = total_marches;
			if(MyAjax.march_busy===0) t.attack_busy = false;
		
			verboseLog('<b>Wave</b> attack to ' + target_msg + ' delayed due to <b>'+ total_marches +'</b> pending march request: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback(translate('Another march request is pending') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.attackTick, retry_delay);
			return;
		}
		
		if (marching >= Data.options.attacks.max_marches){
			verboseLog('<b>Wave<b> attack to ' + target_msg + ' delayed due to <b>march limit</b> reached: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback(translate('March limit reached') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			return;
		}
		
		if (getMusterPointSlots(0) <= 0) {
			verboseLog('<b>Wave</b> attack to ' + target_msg + ' delayed due to <b>insufficent march slots</b>: retry in ' + timeFormat(retry_delay/1000));
			t.dispFeedback(translate('Muster Point') +' '+ translate('Full') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.attackTick, retry_delay);
			return;
		}
		
		available_general = getAvailableGeneral();
		
		if (available_general === null) {
			verboseLog('<b>Wave</b> attack to ' + target_msg + ' delayed due to <b>insufficent generals</b>: retry in ' + timeFormat(retry_delay/1000));
			t.dispFeedback(translate('No generals available') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
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
		
				
		new MyAjax.marchSend (Seed.cities[0].id, Data.options.waves.target.x, Data.options.waves.target.y, available_general.id, units, 'waves', function (r) {
			var t = Tabs.Waves, wave_delay, retry_delay;
			if (r.ok && r.dat.result && r.dat.result.success)
			{
				Marches.add(r.dat.result.job.march_id, 'waves');
				
				++Data.marches.count_limit;
				++t.running.attacks;
			
				t.running.errors = 0;
				
				if ( Data.marches.count_limit > 49 )
				{
					if ( parseInt(serverTime() - Data.marches.start_at) < 3600 ) {
						wave_delay = parseInt( (3600 - (serverTime() - Data.marches.start_at)) * 1000 );
						setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(wave_delay/1000))}, Data.options.waves.delay_min*500 );
					} else {
						Data.marches.start_at = serverTime();
						Data.marches.count_limit = 1;
					}
				}
				else if ((Data.marches.count_limit % 15) === 0)
				{
					wave_delay = 45 * total_marches * 1000;
					setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(wave_delay/1000))}, Data.options.waves.delay_min*500 );
				}
				else {
					wave_delay = Math.randRange(Data.options.waves.delay_min*1000, Data.options.waves.delay_max*1000);
					setTimeout(function(){t.dispFeedback('')}, parseInt(wave_delay/2) );
				}

				verboseLog('Wave attack to: ' + target_msg + ' Successfully');
				
				actionLog(translate('Wave attack to') + ': ' + target_msg);
				
				t.dispFeedback (translate('Wave attack to')+ ': ' + target_msg);

				//target.last_attack = serverTime();
				t.timer.attack = setTimeout (t.attackTick, wave_delay);
			}
			else {
				++t.running.errors;
				retry_delay = 60000 * (t.running.errors * t.running.errors);
				
				verboseLog('<b>Wave<b> attack to: ' + target_msg + ' <b>failed</b> and returned error' + ': ' + r.errmsg+ ' - retrying in ' + timeFormat(retry_delay/1000));
				
				actionLog(translate('Wave attack to')+ ' ' + target_msg + ' ' + translate('failed'));

				t.dispFeedback(translate('Wave attack to')+ ' ' + target_msg + ' failed');
				
				if (r.status === 509){
					retry_delay = 600000;
					verboseLog('<b>Attack</b> to ' + target_msg + ' failed - <b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(retry_delay/1000));
				
					t.dispFeedback(translate('Attack to') + ' ' + target_msg + ' ' + translate('failed')+' - '+translate('Rate Limit Exceeded because there were too many requests') + ' - ' + translate('Retry in') +' '+ timeFormat(retry_delay/1000));
				}
				
				t.timer.attack = setTimeout(t.attackTick, retry_delay);

			}
			// Erase feedback message
			setTimeout(function(){t.dispFeedback('');}, parseInt((wave_delay||retry_delay)/2) );
		});
	},

	marchesTick : function (){
		var t = Tabs.Waves;
		clearTimeout ( t.timer.marches );
		Marches.updateTable ( $id(UID['Tabs.Waves.marches']), 'waves' );
		t.timer.marches = setTimeout (t.marchesTick, 1000);
	},
	
	// Calls Map.getTargetByCoords
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
		Map.getTargetByCoords(x, y, function(target){
			if (target){
				var type = Map.names[target.t] || target.t;
				Data.options.waves.target.type = type;
				Data.options.waves.target.level = target.l;
				
				var attColor = target.at ? '#000' : '#C22';
				
				var html = 
				 '<font color=' + attColor + '>'
				+'	<b>' + translate(type) + '&nbsp;' + translate('Level') + '&nbsp;' + target.l + '</b>'
				+'</font>';
				if (target.pN) {
					html +=
					  '<br>' + translate('City') + ': <b>' + target.n + '</b> - '
					+ translate('Alliance') + ': <b>' + (target.aN ? target.aN : '----') + '</b>'
					+ '<br>' + translate('Name') + ': <b>' + target.pN + '</b> - '
					+ translate('Level') + ': <b>' + target.pL + '</b> - '
					+ translate('Might') + ': <b>' + target.pM + '</b>';
				}
				
				$id(UID['Tabs.Waves.tabTargets.target']).innerHTML = html;
			}
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
	
	units_type 		: ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'PackDragon', 'Giant', 'FireMirror', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop'],
	dragons_type	: ['GreatDragon','WaterDragon','StoneDragon','FireDragon','WindDragon'],

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
		+'	<div class=' + UID['status_report'] + ' style="margin-top:5px;height:140px; max-height:140px; overflow-y:auto;">'
		+'		<table id=' + setUID('Tabs.Attacks.marches') + ' class=' + UID['table'] + '>'
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
		+'<div id=' + setUID('Tabs.Attacks.content') + ' style="padding-top:1px; height:455px;"></div>';
		
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
		
		if ( !Data.options.attacks.max_marches ){
			Data.options.attacks.max_marches = getMusterPointLevel(0);
		}
		
		if ( !Data.stats.start_at ) {
			Data.stats.start_at = serverTime();
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
			Data.stats.run_time += ( serverTime() - t.running.start_at );
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
	
	checkMapData : function ()
	{
		var t = Tabs.Attacks;
		
		if ( t.check_map_busy ) {
			return false;
		}
		else if ( Data.map.terrains[Data.options.map.selected].length === 0 && Data.options.map.selected !== 'Fog' ) {

			t.check_map_busy = true;
			
			t.setAttackEnable (false);
			
			var x = Data.options.map.x;
			var y = Data.options.map.y;
			var radius = Data.options.map.radius = 14;
			
			var dialogbox = dialogBox({
				id		 : setUID('dialog-scanmap'),
				centerTo : t.container,
				overlay  : true,
				title	 : 'Scanning Map',
				html	 : translate('Scanning Map').replace('$NUM$', radius)+ '<br><br><div class=progressbar></div>'
			});
			
			Map.scanMap ( x, y, radius, function ( res ){
				if ( res === null ) {
					dialogbox.html('<B>' + translate('Bummer, there was an error while scanning the map') + '.</B>');
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Ok'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
					Tabs.Attacks.check_map_busy = false;
					return;
				}
				
				if ( res.done ) {
					verboseLog('scanMap: complete!');

					Tabs.Attacks.check_map_busy = false;
					
					var html = '<center><br>' + translate('complete') + '!<br><br><table>';
					for (var type in res.founds){
						html += '<tr><td>'+ translate(type) + '&nbsp;</td><td>&nbsp;' + res.founds[type] + '</td></tr>';
					}
					html += '</table></center>'
					
					dialogbox.html(html);
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Ok'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
					
					// Refresh the Tab Content
					t.tabAttackTarget();
					
				}
				else if ( res.init ) {
					StepTimeBar.start({target:$J('#'+UID['dialog-scanmap']+' .progressbar'), steps:Map.steps});
				}				
				else {
					StepTimeBar.update(Map.step);
				}
			});
			return false;
		}
		return true;
	},

	gotBattleReport : function (r)
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
				march.general.id === r.report.attacker.general.id
				){  // TODO: time and units check here
					march_id = id;
					break;
			}
		}

		if (march_id) {
			t.trackStats (march_id, r);
			
			/* 
			if city_wilderness_attacker_wins_and_conquers 
			change the Wilderness values to hidden from Data.Map and
			restore the original terrain values for it to be released
			*/
			/*
			if ( r.outcome && /city_wilderness_attacker_wins/.test(r.outcome) ){
				var xy = march.x + ',' + march.y;
				var coords = Data.map.coords;
				if ( coords[xy] ){
					var terrain = Data.map.terrains.Wildernesses[coords[xy].n];
					if (terrain && terrain.x === march.x && terrain.y === march.y){
						// Original Terrain Type
						var type = Map.names[coords[xy]._t];
						var terrains = Data.map.terrains[type];
						// Enable again the original terrain
						terrains[coords[xy]._n].l = terrains[coords[xy]._n]._l;
						// Disable the Wildernesses
						Data.map.terrains.Wildernesses[coords[xy].n].l = 0;
						// Swap the pointer Coords 
						var _t = coords[xy]._t;
						var _n = coords[xy]._n;
						coords[xy]._t = coords[xy].t;
						coords[xy]._n = coords[xy].n;
						coords[xy].t = _t;
						coords[xy].n = _n;
					}
				}
			}
			*/
		}
		
		//fetchPlayer when new item (Didi modif)
		var items = r.report.spoils.items;
		if ( items.length !== 0 ) {
			// Don't fetch Cities, only player.json
			Seed.fetchPlayer ( {noCities:true} ); 
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
			but.value = translate('Attacking').toUpperCase();
			but.className = UID['btn_on'];
			
			t.running.start_at = serverTime();
			t.running.attacks = 1;
			
			// Yes, check here if waves are enabled
			if ( !Data.options.waves.enabled ){
				Data.marches.count_limit = 1;
				Data.marches.start_at = serverTime();
			}
			
			t.autoCheckTargets();
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
			t.dispFeedback ('');
			
			if ( t.running.start_at !== 0 ) {
				Data.stats.run_time += ( serverTime() - t.running.start_at );
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
			var left_time = ( Seed.marches[id].run_at - parseInt(serverTime()) ) * (Seed.marches[id].status=='marching' ? 2 : 1);
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
		
		
		// back off for 1 second and retry if MyAjax.march busy (general,units,etc may about to be used)
		if (MyAjax.march_busy > 0)
		{
		
			MyAjax.march_busy = total_marches;
			if(MyAjax.march_busy===0) t.attack_busy = false;
		
			verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>'+ total_marches +' pending</b> march request: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback(translate('Another march request is pending') + ': ' +translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			return;
		}
		
		// Find the map data
		if ( !t.checkMapData() ){
			return;
		}

		
		if ( marching >= Data.options.attacks.max_marches )
		{
			verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>march limit</b> reached: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback(translate('March limit reached') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			return;
		}
		
		if ( getMusterPointSlots (0) <= 0 )
		{
			verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to </b>insufficent march</b> slots: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback (translate('Muster Point') +' '+ translate('Full') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			return;
		}
		
		available_general = getAvailableGeneral();

		if ( available_general === null )
		{
			verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>insufficent generals</b>: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback(translate('No Generals Available') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			return;
		}

		// Get the next target, make sure we have sufficient units
		var next_target = t.getNextAttackTarget();
		if ( next_target )
		{
			if ( checkAvailableUnits (0, next_target.l ) === null )
			{
				target_msg = next_target.x + '/' + next_target.y;
				/*
				verboseLog('Opening the map on the last position: ' + Map.last_pos.x + '/' + Map.last_pos.y);
				t.dispFeedback(translate('Preparing Attack') +': '+ translate('Opening the map on the last position')+'...');
				Map.simulateOpenMap(null, null, function(target){
				    verboseLog('Map: go to position: ' + next_target.x + '/' + next_target.y);
					t.dispFeedback(translate('Preparing Attack') +': '+ translate('Going to the coords') + ' ' + next_target.x + '/' + next_target.y +' ...');
					setTimeout(function(){
						Map.simulateOpenMap(next_target.x, next_target.y, function(target){
							setTimeout(function(){
				*/
								t.sendAttack (0, next_target, available_general, function (r){
									var t = Tabs.Attacks, attack_delay, retry_delay;
									if ( r.ok )
									{
										var delay_min = Data.options.attacks.delay_min;
										var delay_max = Data.options.attacks.delay_max;
										
										/*
										* WARNING: Changing this values cause too many requests to the server 
										*          that are monitored. Thats gives them reason to increase the security 
										*          on the servers and, sooner or later, make this scripts unusable.
										*            
										*      PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
										*
										*                   ( We will end up losing everyone )
										*/
										if ( delay_min < ATTACK_MIN_DELAY )
										{
											if ( delay_max > delay_min + 25 )
											{
												delay_min = delay_max - 25;
											}
											else {
												delay_min = ATTACK_MIN_DELAY;
												delay_max = delay_min + 25;
											}
											Data.options.attacks.delay_min = delay_min;
											Data.options.attacks.delay_max = delay_max;
										}
										
										if ( Data.marches.count_limit > 49 )
										{
											if ( parseInt(serverTime() - Data.marches.start_at) < 3600 )
											{
												attack_delay = parseInt( (3600 - (serverTime() - Data.marches.start_at)) * 1000);
												setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(attack_delay/1000))}, delay_min*500 );
											}
											else {
												Data.marches.start_at = serverTime();
												Data.marches.count_limit = 1;
											}
										}
										else if ((Data.marches.count_limit % 15) === 0)
										{
											attack_delay = 45 * total_marches * 1000;
											setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(attack_delay/1000))}, delay_min*500 );
										}
										else {
											attack_delay = Math.randRange(delay_min*1000, delay_max*1000);
											setTimeout(function(){t.dispFeedback('')}, parseInt(attack_delay/2) );
										}
										
										t.timer.attack = setTimeout(t.autoCheckTargets, attack_delay);
										
									}
									else {
										retry_delay = 30000 * (t.running.errors > 0 ? t.running.errors * t.running.errors : 1);
										
										if ( r.status && r.status === 509 )
										{
											retry_delay = 600000;
											verboseLog('<b>Attack</b> to ' + target_msg + ' failed - <b>Rate Limit Exceeded</b>, too many requests! -  Retry in :' + timeFormat(retry_delay/1000));
										
											t.dispFeedback(translate('Attack to') + ' ' + target_msg + ' ' + translate('failed')+' - '+translate('Rate Limit Exceeded because there were too many requests') + ' - ' + translate('Retry in') +' '+ timeFormat(retry_delay/1000));
										}
										else if ( r.errmsg ) {
											verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to </b>' + r.errmsg + '</b>: retry in ' + timeFormat(retry_delay/1000));

											t.dispFeedback ( r.errmsg + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000) );
										}
										
										t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
									}
								}); // End sendAttack
				/*
							}, Math.randRange(7000,10000));
						}); // End Map.getTargetCoords Target
					}, Math.randRange(6000,9000));
				}); // End Map.getTargetCoords Last Target
				*/
				return;                
			}
			else {
				verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>insufficient troops</b>: retry in ' + timeFormat(retry_delay/1000));

				t.dispFeedback(translate('Not enough') + ' ' + translate('Troops') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
				t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			}
		}
		else {
			verboseLog('<b>Attack</b> to ' + target_msg + '<b>Requirements Unmet</b>: Retry in' + timeFormat(retry_delay/1000));

			t.dispFeedback(translate('Requirements Unmet') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
		}
	},

	// notifies with true for success, false if error
	sendAttack : function (city_idx, target, general, callback)
	{
		var t = Tabs.Attacks;
		var now = serverTime();
		if ( t.attack_busy ){
			t.dispFeedback (translate('Error')+ ': ' +translate('sendAttack is busy, no response from server?'));
			return;
		}
		
		var attack_msg =  translate('Attack sent to') + ': ' + translate(Data.options.map.selected) + ' ' + translate('Level') + ' ' + target.l + ' ' + translate('at') + ' ' + target.x + '/'+ target.y;
		
		var attack_msg_log =  'Attack sent to: ' + Data.options.map.selected + ' Level ' + target.l + ' at ' + target.x + '/'+ target.y;
		

		// Clone the units to include the dragon available
		var units = Data.options.attacks.units[target.l].cloneProps(); //Object.clone(Data.options.attacks.units[target.l]);
		
		// Verify if a dragon is available (by Didi)
		var dragons_selected = false;
		var dragon_added = false;
		for ( var dragon_idx = 0; dragon_idx < t.dragons_type.length; dragon_idx++)
		{
			var dragon_type = t.dragons_type[dragon_idx];
			var num =  units[dragon_type];
			if ( num > 0 ) { 
				dragons_selected = true;
				var dragon = Seed.dragons[dragon_type];
				if ( !dragon.is_in_city || 
					 !dragon.can_attack || 
					 (dragon.life / dragon.maximum_life   <= 0.75 ) || 
					 dragon_added 
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
			if ( callback )
			{
				// We return the notice to the function sendAttack to delay the next attempt
				callback ( { ok: false, errmsg: translate('Dragon') + ' ' + translate('Unavailable') } );
			}
			return;
		}
		
		verboseLog ( attack_msg_log +' Attempted' );
		debugLog('units :\n'+inspect(units,4,1));
		
		t.attack_busy = true;
		t.last_attack = now;
		
		new MyAjax.marchSend (Seed.cities[city_idx].id, target.x, target.y, general.id, units, 'attacks', function (r) {
			
			t.attack_busy = false;
			
			if (r.ok && r.dat.result && r.dat.result.success) 
			{
				
				Marches.add(r.dat.result.job.march_id, 'attacks');
				
				++Data.marches.count_limit;
				
				target.lst = now;
				
				t.running.errors = 0;
				
				verboseLog(attack_msg_log +' Successfully');
				
				t.dispFeedback(attack_msg);
				
				if ( Data.options.attacks.log_attacks ) {
					actionLog(attack_msg);
				}

				if ( callback ) 
				{
					callback ( r );
				}
			}
			else {
				++t.running.errors;

				verboseLog(attack_msg_log + ' <b>failed and returned error</b>: ' + r.errmsg);
				
				actionLog(attack_msg + ' ' + translate('failed'));
				
				t.dispFeedback(attack_msg + ' failed');
				
				if ( callback ) 
				{
					callback ( r );
				}
			}
		});
	},

	/* New getNextAttackTarget enhanced by Lord Mimir [2011-11-04]
	*  Return the next target that is next to be attacked, 
	*  if we are at the last object in the last, return the first object
	*/
	getNextAttackTarget : function ( map_type )
	{
		var t = Tabs.Attacks;
		
		var last_attack = 0;
		var next_target = null;
		var target = null;
		
		map_type = ( map_type !== undefined ? map_type : Data.options.map.selected );
		
		//Clone the level_enable so does not effect original values
		var level_enable =  Data.options.attacks.level_enable.cloneProps(); // Data.options.attacks.level_enable.clone();
		for (var i=0;i<level_enable.length;i++)
		{
			if(  level_enable[i]  && checkAvailableUnits (0, i ) !== null )
			{
				 level_enable[i]=false;
			}
		}
		// Get the targets list fit within the config specifications
		var targets_list = t.getActiveObjectList( map_type, level_enable );
		
		// Sort the targets list by distance
		targets_list.sort( function(a,b){return a.d - b.d;} );

		// Look through all the targets
		for (var i=0; i < targets_list.length; i++)
		{
			target = targets_list[i];
			
			// Is this target attackable?
			if ( target && target.at )
			{
				// Has the target never been attacked?
				if ( target.lst === 0 ) 
				{
					next_target = target;
					break;
				}
				
				else if ( last_attack === 0 ) 
				{
					// Yes, this target is next (so far)
					last_attack = target.lst;
					next_target = target;
				}
				
				// Was the previous target attacked before this target?
				else if (last_attack > target.lst) 
				{
					// Yes, this target is next (so far)
					last_attack = target.lst;
					next_target = target;
					break;
				}
			}
		}


		// No target reaches the specified requirements
		if ( next_target === null )	{
			return;
		}
		// Return the next target
		return next_target;
	},

	// return array of targets that satisfy config (max distance, level enables)
	getActiveObjectList : function ( map_type, level_enable )
	{
		var t = Tabs.Attacks;
		var ret = [];
		level_enable= (level_enable !== undefined) ? level_enable : Data.options.attacks.level_enable;
		map_type = ( map_type !== undefined ? map_type : Data.options.map.selected );
		
		var filter_targets = t.filter_targets.strip();
		var do_filter = ( /(City|Outpost|Wildernesses)/.test( map_type ) && filter_targets.length > 0 );
		var filter_pattern = new RegExp( RegExp.escape( filter_targets ), 'i' );
		
		if ( Data.map.terrains[map_type] )
		{
			for (var i=0; i < Data.map.terrains[map_type].length; i++)
			{
				var target = ( Data.map.terrains[map_type] )[i];
				// Very complex conditional syntax ;)
				if ( /* check if target terrain exist in the map */
					 target 
					 && 
					 /* check if the target level is the right */
					 level_enable[target.l]
					 &&
					 /* check if the target distance is the right */
					 (
					  Data.options.attacks.level_dist[target.l] === 0 || 
					  Data.options.attacks.level_dist[target.l] >= target.d
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
					       ( target.n && filter_pattern.test( target.n ) )
						   ||
						   /* check if the target have a Player Name and verifies its filtering */
						   ( target.pN && filter_pattern.test( target.pN ) )
						   ||
						   /* check if the target have a Alliance Name and verifies its filtering */
						   ( target.aN && filter_pattern.test( target.aN ) )
					     )
					   )
					 )
				  ){
						ret.push (target);
				}
			}
		}
		return ret;
	},

	checkAttack : function (target, notify)
	{
		var t = Tabs.Attacks;
		var city_id = Seed.cities[0].id;
		var city_idx = 0;
		var available_general;
		
		// check units
		var units = Data.options.attacks.units[target.l];
		var total_units = 0;
		for (var unit_type in units)
		{
			if ( units[unit_type] > 0 )
			{
				total_units += units[unit_type];
				if ( Seed.cities[city_idx].units[unit_type] < units[unit_type] )
				{
					notify (translate('Not enough') +' '+ translate(unit_type));
					return;
				}
			}
		}
		
		if ( total_units <= 0 ){
			notify (translate('No Troops Defined'));
			return;
		}
		
		
		var muster_point_limit = getMusterPointLevel (city_idx) * 10000;
		if ( total_units > muster_point_limit ) {
			notify (translate('Too many troops for muster point level'));
			return;
		}

		if ( getMusterPointSlots (city_idx) <= 0 ){
			notify (translate('Muster Point') +' '+ translate('Full'));
			return;
		}

		if ( (available_general = getAvailableGeneral ()) === null ){
			notify (translate('No Generals Available'));
			return;
		}
		
		
		var attack_msg =  translate('Manual attack sent to') + ': ' + translate(Data.options.map.selected) + ' ' + translate('Level') + ' ' + target.l + ' ' +  translate('at') + ' ' + target.x +'/'+ target.y;
		
		var attack_msg_log =  'Manual attack sent to: ' + Data.options.map.selected + ' Level ' + target.l + ' at ' + target.x +'/'+ target.y;
		
		verboseLog(attack_msg_log +' Attempted');
		
		new MyAjax.marchSend (city_id, target.x, target.y, available_general.id, units, 'attacks', function (r) {
			if (r.ok) {
			
				Marches.add(r.dat.result.job.march_id, 'attacks');
				
				++Data.marches.count_limit;
				
				target.lst = serverTime();
				
				
				verboseLog(attack_msg_log +' Successfully');
				t.dispFeedback(attack_msg);
				
				if ( Data.options.attacks.log_attacks ) {
					actionLog(attack_msg);
				}
				
				notify(null);
			}
			else {
				verboseLog(attack_msg_log +' <b>failed and returned</b> error: '+ r.errmsg);

				t.dispFeedback (translate('Error') + ': ' + r.errmsg);
				notify(null);
				//notify(kAttackErr + r.errmsg);
			}
		});
	},
	

	
	//*** Attacks Tab - Levels Sub-Tab ***
	//----------------------------------------------------------------------------
	tabLevels : function ()
	{
		var t = Tabs.Attacks;
		
		var city = Seed.cities[0];

		// New content area here
		var html = 
		 '<div id=' + setUID('Tabs.Attacks.tabLevels.title') +' class="' + UID['title'] + '">' + translate('Attacks') + '&nbsp;' + translate(Data.options.map.selected) + '</div>';
		 
		// MapChoice Selector
		setUID('Tabs.Attacks.tabLevels.selectMap');
		html += '<table>'
		+ '<tr>'
		+ '	<td align=right>&nbsp;'
		+ '		<b>' + translate('Type') + ' ' + translate('of') + ' ' + translate('Targets') + '</b>'
		+ '	</td>'
		+ '	<td>&nbsp;:'
		+ '		<select id=' + UID['Tabs.Attacks.tabLevels.selectMap'] + '>';
		
		for (var type in Data.map.terrains)
		{
			if ( type === 'City' ) {
				html += '<option disabled="disabled">-----------------------</option>';
			}
			html += 
			  '<option value="' + type + '" ' + (type===Data.options.map.selected ? 'selected' : '') + '>'
			+ translate(type) 
			+ '</option>';
		}
		
		var targets = t.getActiveObjectList(); 
		
		html += 
		+ '		</select>'
		+ '	</td>'
		+ '	<td>'
		+ '	<span class=jewel>'
		+ '	<div id=' + setUID('Tabs.Attacks.tabLevels.targetsInfo') + ' style="padding-left:5px;">' + translate('Targets') + ':&nbsp;<b>' + targets.length + '</b>&nbsp;' + translate('of') + '&nbsp;<b>' + Data.map.terrains[Data.options.map.selected].length +'</b></div>'
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
		+'			<td class=right>' + translate('Enable') + ' </td>';
		
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
		+'			<td class=right>' + translate('Max') + ' ' + translate('Distance').truncate(4,'') + ' </td>';
		
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
				var color = '#FFF';
				if ( i < 5 ) color = '#DDD';
				else if ( i < 8 ) color = '#BEB';
				else if ( i < 10 ) color = '#EEB';
				else if ( i < 12 ) color = '#BBE';
				else if ( i < 16 ) color = '#BBE';
				else color = '#EBB';
				
				html +=
				 '	<tr style="background-color:' + color + ';">'
				+'		<td class=right>'
				+'			<span style="font-size:8pt;" title="' + translate(t.units_type[i]) + '">' + translate('~' + t.units_type[i]) + '<span>'
				+'		</td>';
				
				for (var x=1; x < 12; x++)
				{
					var num = Data.options.attacks.units[x][t.units_type[i]];
										
					if ( !num ) { num = 0; }
					
					html += 				
					 '<td>'
					+'<input type=text id=' + setUID('Tabs.Attacks.tabLevels.level_units_' + x + '_' + i) + ' ref=' + (x + '_' + i) + ' maxlength=6 size=2 style="width:36px;' + (num ? '' : 'color:#888;') + '" value="' + num + '" title="" />'
					+'</td>';
				}
				html += '</tr>';
				current_units.push(i);
			}
		}
		
		// Add Dragons (by Didi)
		var available_dragons = 0;
		for ( var dragon_type in Seed.dragons )
		{
			if ( getAvailableDragons( Seed.dragons[dragon_type].name ).status ){
				++available_dragons;
			}
		}
		
		var current_dragons = [];
		if ( available_dragons > 0 ) 
		{
			html += 
			  '<tr><td colspan=12 style="background:none !important;">&nbsp;</td></tr>'
			+ '<tr>'
			+ '  <td>&nbsp;</td>'
			+ '  <th colspan=11 align=center>' + translate('Send') + ' ' + translate('Dragon') + ' ' + translate('Available') + '</th>'
			+ '</tr>'
			
			for (var dragon_idx = 0; dragon_idx < t.dragons_type.length; dragon_idx++)
			{
				if (getAvailableDragons(t.dragons_type[dragon_idx]).status)
				{
					html +=
					 '<tr align=center>'
					+'	<td class=right>'
					+'	<span title="'+ translate( t.dragons_type[dragon_idx]) + '">'+ translate('~'+t.dragons_type[dragon_idx]) +'<span>'
					+'	</td>';
					
					for (var x=1; x < 12; x++){
						var num = Data.options.attacks.units[x][t.dragons_type[dragon_idx]];
											
						if (!num){ num = 0;	}
    	
						html += 
						 '	<td>'
						+'	<label style="display:block;background:#EBB;">'
						+'	<input type=checkbox id=' + setUID('Tabs.Attacks.tabLevels.dragon_enable_' + x + '_' + dragon_idx) + ' ref=' + (x + '_' + dragon_idx) + ' ' +( num !== 0 ?' checked' : '' ) +' />'
						+'	</label>'
						+'	</td>';
					
					}
					html += '</tr>';
					current_dragons.push(dragon_idx);
				}
			}
		} 

		html += '</table></div>';

		
		$J('#'+UID['Tabs.Attacks.content']).html( html );

		// add event listeners ...
		
		$J('#'+UID['Tabs.Attacks.tabLevels.selectMap']).change( onMapChoice );
		
		for (var x=1; x < 12; x++)
		{
			$J('#'+UID['Tabs.Attacks.tabLevels.level_enable_'+ x]).change( onChangeLevelEnable );
			$J('#'+UID['Tabs.Attacks.tabLevels.level_dist_'+ x]).change( onChangeDistance );
		}
		
		for ( i=0; i < current_units.length; i++ )
		{
			for ( var x=1; x < 12; x++ )
			{
				$J('#'+UID['Tabs.Attacks.tabLevels.level_units_'+ x +'_'+ current_units[i]]).change( onChangeUnits );
			}
		}
		
		//Dragon select (by Didi)
		for ( i=0; i < current_dragons.length; i++ )
		{
			for ( var x=1; x < 12; x++ )
			{
				$J('#'+UID['Tabs.Attacks.tabLevels.dragon_enable_'+ x +'_'+ current_dragons[i]]).change( onChangeDragons );
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
				//dialogError (translate('Distance must be between') + ' 0 ' + translate('and') +' 375' , t.container);
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
		
		function onChangeUnits ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			var x = parseIntZero(event.target.value);
			
			if ( isNaN(x) || x < 0 || x > 200000 )
			{
				event.target.style.backgroundColor = '#faa';
				dialogError (translate('Invalid number of troops',t.container));
			}
			else {
				event.target.value = x;
				Data.options.attacks.units[args[0]][t.units_type[args[1]]] = x;
				event.target.style.backgroundColor = '';
				if ( parseInt(event.target.value) > 0 )
				{
					event.target.style.color = '#000';
				}
			}
		}
		
		// onChangeDragons (by Didi)
		function onChangeDragons ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			Data.options.attacks.units[args[0]][t.dragons_type[args[1]]] = (event.target.checked ? 1 : 0);
		}

		// onChangeConfig (by Didi)
		function onChangeConfig()
		{
			var t = Tabs.Attacks;
			var targets = t.getActiveObjectList(); 
			$J('#'+UID['Tabs.Attacks.title']).html( translate('Attack') + ' ' + translate(Data.options.map.selected) );
			$J('#'+UID['Tabs.Attacks.tabLevels.title']).html( translate('Attacks') + '&nbsp;' + translate(Data.options.map.selected) );
			$J('#'+UID['Tabs.Attacks.tabLevels.targetsInfo']).html( translate('Targets') + ':&nbsp;<b>' + targets.length + '</b>&nbsp;' + translate('of') + '&nbsp;<b>' + Data.map.terrains[Data.options.map.selected].length +'</b>' );
		}
	},


	//*** Attacks Tab - Targets Sub-Tab ***
	//----------------------------------------------------------------------------
	
	tabTargets : function ()
	{
		var t = Tabs.Attacks;

		t.checkMapData();
		
		var targets = t.getActiveObjectList();
		if ( targets.length === 0 ){
			t.dispFeedback ( translate('Use the Levels Tab to select attack areas') );
		}

		// Sort targets list by distance
		targets.sort( function(a,b){return a.d - b.d;} );
		
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
		+ '		<b>' + translate('Type') + ' ' + translate('of') + ' ' + translate('Targets') + '</b>'
		+ '	</td>'
		+ '	<td>&nbsp;:'
		+ '		<select id=' + UID['Tabs.Attacks.tabTargets.selectMap'] + '>';
		
		for (var type in Data.map.terrains)
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
			+ '	<input type=text size=20 id=' + setUID('Tabs.Attacks.tabTargets.filter') + ' value="' + t.filter_targets + '" />'
			+ '	</td>';
		}
		
		html += 
		  '	</tr>'
		+ '	<tr>'
		+ '	<td colspan=2>'
		+ '		<span class=jewel>' + targets.length + ' ' + translate('of') + ' ' + Data.map.terrains[Data.options.map.selected].length + ' (' + translate('Distance') + ' ' + translate('Max') + ': ' + distance_range + ')</span>'
		+ '	</td>'
		+ '	</tr>'
		+ '</table>'
		+ '<div class="' + UID['scrollable'] + '" style="height:370px;">'
		+ '	<table id='+ setUID('Tabs.Attacks.tabTargets.table') +' class=' + UID['table'] + '>'
		+ '		<tr>'
		+ '			<th>'      + translate('Distance').substring(0,4)    + '</th>'
		+ '			<th>'      + translate('Coordinates').substring(0,5) + '</th>'
		+ ( show_type ? '<th>' + translate('Type') + '</th>' : '' )
		+ '			<th>'      + translate('Level').substring(0,3)       + '</th>'
		+ '			<th>'      + translate('Last Attack').split(' ').join('<br/>') +'</th>'
		+ '			<td></td>';
		
		if ( filter_enable ) {
			html += 
			  '		<th>' + translate('Name') + '</th>'
			+ '		<th>' + translate('Alliance') + '</th>';
		}
		
		html += 
		+ '		</tr>';
		
		for (var i=0; i < targets.length; i++)
		{
			
			var ref = Data.map.coords[targets[i].x +','+ targets[i].y];
			
			var current_target = ( Data.map.terrains[Map.names[ref.t]] )[ref.n];
			
			//if (!current_target) continue;
			
			html +=	'<tr ';
			if ( current_target.pN )
			{
				html +=	'  title="'
				+ (current_target.n || ' ') + '  ('+ translate(Map.names[(show_type ? ref._t : current_target.t )]) + ') \n'  
				+ current_target.pN + ' (lvl ' + current_target.pL + ') - Pwr: ' + current_target.pM +' \n'
				+ translate('Alliance') + ': ' + (current_target.aN || '---')
				+ '"';
			}
			
			html += '>'
			+ '<td>' + targets[i].d +'</td>'
			+ '<td align=center>' + targets[i].x + '/' + targets[i].y + '</td>'
			+ (show_type?'<td align=center>' + translate(Map.names[ref._t]).substring(0,3) + '</td>':'') 
			+ '<td align=center>' + targets[i].l + '</td>'
			+ '<td><span id=' + setUID('Tabs.Attacks.tabTargets.last_attack_'+i) + '> --- </span></td>'
			+ '<td><input id=' + setUID('Tabs.Attacks.tabTargets.attack_btn_'+i) + ' ref=' + i + ' class=thin type=button value=" ' + translate('Attack') + '! " />';
			
			// Add checkbox for enable/disable attack button on cities and outposts
			if ( current_target.pN )
			{
				html += 
				 '&nbsp;<input id='+ setUID('Tabs.Attacks.tabTargets.toggle_btn_'+i) +' ref='+ i +' type=checkbox '+ (current_target.at?'checked':'') +' /></td>'
				+ '<td><b>' + current_target.pN.truncate(13).replace('...','<span class=jewel>..</span>') + '</b></td>'
				+ (show_type ? '<td><span class=jewel>'+ (current_target.aN || '-----').truncate(16).replace('...','..</span>') :
							   '<td>'+ (current_target.aN || '-----').truncate(16).replace('...','..'));
			}
			
			html += '</td></tr>';

		}
		
		html +=
		 '	</table>'
		+'</div>';

		var $content = $J('#'+UID['Tabs.Attacks.tabTargets.content']);
		
		$content.html( html );
		$content.css('height', $content.parent().innerHeight()-5 + 'px');
		
	
		// Add the event listeners
		$J('#'+UID['Tabs.Attacks.tabTargets.selectMap']).change( onMapChoice );
		
		$J('#'+UID['Tabs.Attacks.tabTargets.filter']).keypress(function(event) {
			
			if ( event.which === 13 ) 
			{
				if ( Data.options.attacks.enabled ) 
				{
					/* It would be very bad to leave attack on when switching targets. 
					Imagine sending the units for a wilderness to a city or an ant camp...*/
					clearTimeout ( t.timer.attack );
					t.setAttackEnable ( false );
					t.dispFeedback ( translate('Safe Mode') +': '+ translate('Attacks') +' '+ translate('Disabled') );
				}
				
				t.filter_targets = $J(this).val();
				t.tabTargets();
			}
		});
		
		for (var i=0; i < targets.length; i++) 
		{
			var but_attack = $id(UID['Tabs.Attacks.tabTargets.attack_btn_'+ i]);
			if ( !but_attack ) continue;
			
			$J(but_attack).click ( butAttackNow );
			
			if ( $J('#'+UID['Tabs.Attacks.tabTargets.toggle_btn_'+ i]) )
			{
				$J('#'+UID['Tabs.Attacks.tabTargets.toggle_btn_'+ i]).click ( toggleAttackable );
			}
			setButtonStyle ( but_attack, targets[i].at );
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
			//Data.map.targets = Data.map.terrains[Data.options.map.selected].cloneProps();
			t.tabTargets();
		}

		function butAttackNow ( event )
		{
			var n = parseInt(event.target.getAttribute('ref'));
			
			$J.msg({ 
				content : translate('Attacking') + '...',
				target	: t.container
			});

			t.checkAttack (targets[n], notify);
			function notify (r){
				if (r!==null){

				}
			}
		}
		
		function toggleAttackable ( event )
		{
			var n = parseInt(event.target.getAttribute('ref'));
			targets[n].at = event.target.checked;
			setButtonStyle ($id(UID['Tabs.Attacks.tabTargets.attack_btn_'+n]), targets[n].at);     
		}
		
		function targetsTick ()
		{
			var now = serverTime();
			clearTimeout ( t.timer.targets );
			
			if ( $J('#'+UID['Tabs.Attacks.tabTargets.table']).length < 1 ) {
				return;
			}
			
			for (var i=0; i < targets.length; i++)
			{
				var $last_attack = $J('#'+UID['Tabs.Attacks.tabTargets.last_attack_'+i]);
				
				if ( $last_attack.length < 1 ){
					continue;
				}
				
				var last_time = parseInt(targets[i].lst);
				
				var time = now - last_time;
				
				var time_format = last_time ? timeFormat (now - last_time, false) : '---';
				
				if ( time > 3600 ) {
					time_format = '<font color=#550000><b>'+ time_format +'</b></font>';
				}
				
				$last_attack.html( time_format );
			}
			
			t.timer.targets = setTimeout (targetsTick, 5000);
		}
		
		targetsTick();
	},

	
	//*** Attacks Tab - Stats Sub-tab ***
	//----------------------------------------------------------------------------
	tabStats : function ()
	{
		var t = Tabs.Attacks;

		var html = 
		 '<div class=' + UID['title'] + '>' + translate('Statistics') + '</div>'
		+'<div id='+ setUID('Tabs.Attacks.tabStats.status') + ' class=' + UID['status_ticker'] + '></div>'
		+'<center><input id=' + setUID('Tabs.Attacks.tabStats.clear') + ' type=button value="' + translate('Delete') + ' ' + translate('Statistics') +'" /></center>';
		
		$J('#'+UID['Tabs.Attacks.content']).html( html );
		
		$J('#'+UID['Tabs.Attacks.tabStats.status']).css({
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
		Data.stats = {start_at:now, run_time:0, attacks:0, items:{}, resources:{}, levels:[]};
		t.running.start_at = now;
		
		for (var i=0; i < 12; i++)
		{
			Data.stats.levels[i] = {attacks:0, items:{}, resources:{}};
		}
		
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
		
		++Data.stats.attacks;
		++Data.stats.levels[level].attacks;
		
		var resources =  r.report.spoils.resources;
		for (var type in resources)
		{
			objAddTo ( Data.stats.resources, type, parseInt(resources[type]) );
			objAddTo ( Data.stats.levels[level].resources, type, parseInt(resources[type]) );
		}  
		
		//add the talismans to the Resources gathered.
		var kill_items =  r.report.spoils.kill_items;
		for (var type in kill_items)
		{
			objAddTo ( Data.stats.resources, type, parseInt(kill_items[type]) );
			objAddTo ( Data.stats.levels[level].resources, type, parseInt(kill_items[type]) );
		}
		
		// Wham
		// Add items to the resources gathered
		var items_res = r.report.spoils.items;
		for (var i=0; i < items_res.length; i++)
		{
			/*
			var item = translate( items_res[i] );
			var quantity = parseInt( item );
			var name = item.replace(/\d/g,'');
			
			objAddTo (Data.stats.resources, name, quantity);
			objAddTo (Data.stats.levels[level].resources, name, quantity);
			*/
			
			objAddTo (Data.stats.items, items_res[i], 1);
			objAddTo (Data.stats.levels[level].items, items_res[i], 1);
		}

		
		Data.marches.attacks[march_id].has_report = true;
		
		t.showStats();
	},

	showStats : function ()
	{
		var t = Tabs.Attacks;
		
		var run_time = Data.stats.run_time;
		if ( Data.options.attacks.enabled ) {
			run_time += ( serverTime() - t.running.start_at );
		}
		
		var run_time_fixed = (run_time > 0) ? (run_time/3600) : 1;
		
		var html = 
		 '<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<td class=right>' + translate('Start Date') + ': </td>'
		+'		<td>' + new Date(Data.stats.start_at * 1000).myString() + '</td>'
		+'	</tr><tr>'
		+'		<td class=right>' + translate('Run Time') + ': </td>'
		+'		<td>' + timeFormat(run_time, true) + '</td>'
		+'	</tr><tr>'
		+'		<td class=right>' + translate('Attacks') + ': </td>'
		+'		<td>' + Data.stats.attacks + '</td>'
		+'	</tr><tr valign=top>'
		+'		<td class=right>' + translate('Resources') + ': </td>'
		+'		<td>'
		+'			<table class=' + UID['table'] + '>';
		
		for (var name in Data.stats.resources)
		{
			var per_hour = Data.stats.resources[name] / run_time_fixed;
			if ( isNaN(per_hour) ) continue;
			html += 
			 '	<tr align=right>'
			+'			<td>' + translate(name) + ':</td>'
			+'			<td>' + Data.stats.resources[name].intToCommas() + '</td>'
			+'			<td>(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			+'		</tr>';
		}
		
		html +=
		 '		</table>'
		+'		</td>'
		+'</tr></table>';
		
		html +=
		 '<br><div class=' + UID['subtitle'] + '>'+ translate('Statistics') +'&nbsp;'+ translate('of') +'&nbsp;'+ translate('Attack') +' '+ translate('and') +' '+ translate('Items') +'</div>'
		+'<div style="overflow-y:auto;height:200px">'
		+'	<table class=' + UID['table'] + '>'
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
		+'			<td class=right># ' + translate('Attacks') + ':</td>';
		
		for ( i=1; i < 12; i++ )
		{
			html += '<td>' + Data.stats.levels[i].attacks + '</td>';
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
			+'		<td class=right>' + translate(p) + ':</td>';
			
			for ( i=1; i < 12; i++ )
			{
				html += '<td>' + items[p][i] + '</td>';
			}
		}
		
		html += '</tr>'
		+'	</table>'
		+'</div>';
		
		$J('#'+UID['Tabs.Attacks.tabStats.status']).html( html );
		
		function flipStats ( name )
		{
			var o = {};
			for ( var i=1; i < 12; i++ )
			{
				for ( var p in Data.stats.levels[i][name] )
				{
					if (!o[p])
					{
						o[p] = [];
						for ( var x=1; x < 12; x++ )
						{
							o[p][x] = 0;
						}
					}
					o[p][i] += Data.stats.levels[i][name][p];
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
		Outpost		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Wildernesses :{ enabled:false, color:['0xC0','0x70','0x70'] },
	},
	
	tabMaps : function()
	{
		var t = Tabs.Attacks;

		var html = 
		 '<div class=' + UID['subtitle'] + '>' + translate('Search') + ' ' + translate('Location') + '</div>'
		+'<div>'
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
		+'				<input id=' + setUID('Tabs.Attacks.tabMaps.search') + ' type=button value="' + translate('Search') + '" />'
		+'			</td>'
		+'		</tr>'
		+'	</table>'
		+'	<br>'
		+'	<br>'
		+'	<table class=' + UID['table'] + '>'
		+'		<tr>'
		+'			<th>' + translate('view')  + '</th>'
		+'			<th>' + translate('type')  + '</th>'
		+'			<th>' + translate('total') + '</th>'
		+'		</tr>';
		
		// Add Search Report
		for ( var type in Data.map.terrains )
		{
			html += 
			 '<tr>'
			+'	<td><input type=checkbox id=' + setUID('Tabs.Attacks.tabMaps.show_' + type) + ' ref=' + Map.names[type] + ' ' + (t.map_viewer_terrains[type].enabled ? 'CHECKED' : '') + '/></td>'
			+'	<td>' + translate(type) + '</td>'
			+'	<td align=right>'
			+'		<span class=jewel>' + Data.map.terrains[type].length + '</span>'
			+'	</td>'
			+'</tr>';
		}

		html +=
		 '</table>'
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
		
		for (var type in Data.map.terrains)
		{
			$J('#'+UID['Tabs.Attacks.tabMaps.show_'+type]).click (function ( event ) {
				var type = Map.names[$J(this).attr('ref')];
				t.map_viewer_terrains[type].enabled = event.target.checked;
				// Refresh the MapView if is Open
				if ( t.map_viewer && t.map_viewer.isOpen() ) {
					setMapViewer();
				}
			});
		}
		
		
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
				minWidth : 300,
				centerTo : t.container,
				buttons  : [],
				overlay  : true,
				title	 : 'Scanning Map',
				html	 : '<center>' + translate('Scanning Map').replace('$NUM$', Data.options.map.radius) + '<br><br><div class=progressbar></div></center>'
			});
			
			var x = $J('#'+UID['Tabs.Attacks.tabMaps.coord_x']).val() || Data.options.map.x;
			var y = $J('#'+UID['Tabs.Attacks.tabMaps.coord_y']).val() || Data.options.map.y;
			var radius = Data.options.map.radius;
			
			Map.scanMap (x,y, radius, function( res ) {
			
				
				if (res === null)
				{
					// Re-enable the search button for the next request
					$button.attr('disabled', false);
				
					verboseLog('<b>scanMap</b>: there was an <b>error</b> while scanning the map');
					dialogbox.html('<B>' + translate('Bummer, there was an error while scanning the map') + '.</B>');
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Ok'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
					Tabs.Attacks.check_map_busy = false;
					return;
				} 
				
				
				if(res.done)
				{
					// Re-enable the search button for the next request
					$button.attr('disabled', false);
				
					verboseLog('scanMap: complete!');

					Tabs.Attacks.check_map_busy = false;
					
					var html = 
					 '<center>'
					+'<br>' 
					+ translate('complete') + '!'
					+'<br><br>'
					+'<table class=' + UID['table'] + '>';
					+'	<tr>'
					+'		<th>'+ translate('type') + '</th>'
					+'		<th>' + translate('total') + '</th>'
					+'	</tr>';
					
					for ( var type in res.founds )
					{
						html += '<tr><td>'+ translate(type) + '&nbsp;</td><td>&nbsp;' + res.founds[type] + '</td></tr>';
					}
					html += '</table></center>'
					
					dialogbox.html(html);
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Ok'),
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
					
				} else if ( res.init ) {
					StepTimeBar.start ( {target:$J('#'+UID['dialog-scanmap']+' .progressbar'), steps:Map.steps} );
				}				
				else {
					StepTimeBar.update ( Map.step );
				}
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
					html		: '<img height="750" width="750" id=' + setUID('map-viewer-image') + '></img>'
				});
				t.map_viewer.option( 'show', null );
				t.map_viewer.option( 'hide', null );
			}
			
			t.map_viewer.open();
			
			// Make PNG Map
			var image = new PNGlib(750, 750, 256); // construcor takes height, weight and color-depth
			var bgcolor = image.color('0x40', '0x50', '0x40'); // set the background
			var fgcolor = image.color('0x60', '0x80', '0x60'); // set the background

			for ( var y=0; y < 750; y++ )
			{
				for ( var x=0; x < 750; x++ )
				{
					var ref = Data.map.coords[x+','+y];
					var pixel = image.index(x, y);
					if (ref)
					{
						var terrain = t.map_viewer_terrains[Map.names[ref.t]];
						var c = terrain.color;
						image.buffer[pixel] = terrain.enabled ? image.color(c[0], c[1], c[2]) : fgcolor;
					}
					else {
						image.buffer[pixel] = bgcolor;
					}
				}
			}
			
			$J('#'+UID['map-viewer-image']).
			attr( 'src', 'data:image/png;base64,' + image.getBase64() );
			
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
						
						/*
						Map.scanMap (x, y, 7, function(res){
							if(res.done){
								setMapViewer();
							}
						});
						*/
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
		+'		<td class=right>'+ translate('Delay Between Attacks') +':&nbsp;</td>'
		+'		<td>'
		+'		<input class=short id='+ setUID('Tabs.Attacks.tabOptions.delay_min') +' maxlength=4 type=text value="'+ Data.options.attacks.delay_min +'" />&nbsp;-&nbsp;'
		+'		<input class=short id='+ setUID('Tabs.Attacks.tabOptions.delay_max') +' maxlength=4 type=text value="'+ Data.options.attacks.delay_max +'" />&nbsp;'+ translate('Seconds').toLowerCase() 
		+'		</td>'
		+'	</tr><tr>'
		+'		<td class=right>'+ translate('Delete') +' '+ translate('Battle Report') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.delete_reports') +' '+ (Data.options.attacks.delete_reports?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td class=right>'+ translate('Stop if any troops lost') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.stop_on_loss') +' '+ (Data.options.attacks.stop_on_loss?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td class=right>'+ translate('Maximum simultaneous marches') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.max_marches') +' class=short maxlength=2 type=text value="'+ Data.options.attacks.max_marches +'" /></td>'
		+'	</tr><tr>'
		+'		<td class=right>'+ translate('Enable') +' '+ translate('Attacks Logs') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.log_attacks') +' '+ (Data.options.attacks.log_attacks?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td class=right>'+ translate('Show Details in Marches') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.marches_details') +' '+ (Data.options.attacks.marches_details?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td colspan=2><hr></td>'
		+'	</tr><tr>'
		+'		<td class=right>'+ translate('Dont flag Wildernesses') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.abandon_wildernesses') +' '+ (Data.options.attacks.abandon_wildernesses?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td class=right>'+ translate('Withdraw troops if they are encamped') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.recall_encamped') +' '+ (Data.options.attacks.recall_encamped?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td colspan=2><hr></td>'
		+'	</tr><tr>'
		+'		<td class=right>'+ translate('Clear last attack on current map') +'&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.clear_last') +'  type=button value="'+translate('Delete')+'" /></td>'
		+'	</tr><tr>'
		+'		<td class=right>'+ translate('Clear last attack on all maps') +'&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.clear_all') +' '+ (Data.options.attacks.clear_all_targets?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr></table>';
		
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
		
		$J('#'+UID['Tabs.Attacks.tabOptions.marches_details']).change(function ( event ) {
			Data.options.attacks.marches_details = event.target.checked;
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
		$J('#'+UID['Tabs.Attacks.tabOptions.max_marches']).change( onChangeMaxMarches );
		
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
				* WARNING: Changing this values cause too many requests to the server 
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
		
		function onChangeMaxMarches ( event )
		{
			var max_marches = parseIntNan($J(this).val());
			// Max marches is determined by the muster point level (Wham)
			if ( max_marches < 1 || max_marches > getMusterPointLevel(0) )
			{
				max_marches = getMusterPointLevel(0);
				$J(this).val(max_marches);
			}
			Data.options.attacks.max_marches = max_marches;
		} 
		
		// Clear the information about when the target was last attacked
		// This is useful because attacks always start with the oldest target or, 
		// if no target has been attacked (last === 0), the first target in the list
		function clearLast ( event )
		{
			if ( Data.options.attacks.clear_all_targets ) 
			{
				// Make sure the user has scanned the map
				for (var type in Data.map.terrains) 
				{
					for (var i=0; i < Data.map.terrains[type].length; i++) 
					{
						(Data.map.terrains[type])[i].lst = 0;
					}
				}
			}
			else {
				// Clear the last attacked field of the currently selected target
				var targets = Data.map.terrains[Data.options.map.selected];
				for (var i=0; i < targets.length; i++)
				{
					targets[i].lst = 0;
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
	timer			: null,
	
	train_timer		: null,
	train_stat_timer: null,
	train_errors    : 0,
	train_retry_time: 20000,
	recheck_train   : false,
	
	build_timer		: null,
	build_stat_timer: null,
	build_errors 	: 0,
	build_retry_time: 20000,
	
	research_timer	: null,
	res_stat_timer	: null,
	research_errors : 0,
	res_retry_time  : 20000,
	
	
	city: {
		0: {
			units_type : ['Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror'],
		},
		1:{
			units_type : [],
		},
		2:{
			units_type : [],
		},
		3:{
			units_type : [],
		},
		4:{
			units_type : [],
		},
	},

	research_index	: {Agriculture:0, Woodcraft:1, Masonry:2, Mining:3, Clairvoyance:4, RapidDeployment:5, Ballistics:6, Metallurgy:7, Medicine:8, Dragonry:9, Levitation:10, Mercantilism:11, AerialCombat:12},
	
	research_type	: ['Agriculture', 'Woodcraft', 'Masonry', 'Mining', 'Clairvoyance', 'RapidDeployment', 'Ballistics', 'Metallurgy', 'Medicine', 'Dragonry', 'Levitation', 'Mercantilism', 'AerialCombat'],
	
	research_capital: ['Home', 'Garrison', 'ScienceCenter', 'Metalsmith', 'OfficerQuarter', 'MusterPoint', 'Rookery', 'StorageVault', 'Theater', 'Sentinel', 'Factory', 'Fortress', 'DragonKeep', 'Wall'],
	
	research_outpost: ['TrainingCamp', 'Home', 'Silo', 'MusterPoint', 'DragonKeep', 'Wall'],
	research_field	: ['Mine', 'Farm', 'Lumbermill', 'Quarry'],
	
	research_outpost_spectral: ['Mausoleum', 'DarkPortal','SpectralDragonKeep'],
	
	research_field_spectral: ['EnergyCollector'],
	
	
	train_accordion : 0, // current selected item header of accordion
	
	build_accordion : 0, // current selected item header of accordion
	
	current_tab		: 0, // 0 = summary, 1 = train, 2 = build, 3 = research
	last_tab_id		: 'tabSummary',
	
	init : function (div)
	{
		var t = Tabs.Jobs;
		
		// Variables Initializations  (Fixed by Lord Mimir)
		for ( var city_idx = 1; city_idx < Seed.cities.length; city_idx++ )
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city ) continue;
			
			//Catch to add in empty unit_type for any new cities.
			if(t.city[city_idx] === undefined)
			{
				t.city[city_idx]={units_type : []}
			}
			
			switch ( city.outpost_type )
			{
			case 'WaterDragonOutpost':
				t.city[city_idx].units_type = t.city[0].units_type.concat(['AquaTroop']);  
				break;
			case 'StoneDragonOutpost':
				t.city[city_idx].units_type = t.city[0].units_type.concat(['StoneTroop']);
				break;
			case 'FireDragonOutpost' :
				t.city[city_idx].units_type = t.city[0].units_type.concat(['FireTroop']);
				break;
			case 'WindDragonOutpost' :
				t.city[city_idx].units_type = t.city[0].units_type.concat(['WindTroop']);
				break;
			case 'SpectralDragonOutpost': t.city[city_idx].units_type =[];
				t.research_index+={EnergyCollection:13,  WarriorRevival:14, GuardianRevival:15};
				t.research_type[13]='EnergyCollection';
				t.research_type[14]='WarriorRevival';
				t.research_type[15]='GuardianRevival';
				break;
			default:
				t.city[city_idx].units_type = t.city[0].units_type;
			}
		}

		t.units_type = t.city[0].units_type.concat( ['AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop'] );
		
		
		for (var city_idx=0; city_idx < Seed.cities.length; city_idx++)
		{
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !Seed.cities[city_idx] ) continue;
		
			// Training .city initialization
			if ( !Data.options.training.city[city_idx] )
			{     //create the training.city object if it does not exist
				Data.options.training.city[city_idx]={};
			}
			// Training .city.units initialization
			if ( !Data.options.training.city[city_idx].units )
			{
				Data.options.training.city[city_idx].units = {};
				for ( i=0; i < t.city[city_idx].units_type.length; i++ )
				{
					var unit_type = t.city[city_idx].units_type[i];
					Data.options.training.city[city_idx].units[unit_type] = 0;
				}
			}
			
			// Training .city.cap initialization
			if ( !Data.options.training.city[city_idx].cap )
			{
				Data.options.training.city[city_idx].cap = {};
				for ( i=0; i < t.city[city_idx].units_type.length; i++ )
				{
					var unit_type = t.city[city_idx].units_type[i];
					Data.options.training.city[city_idx].cap[unit_type] = 0;
				}
			}
			
			//Ensure that Data structure present for build tab.
			if ( !Data.options.building.city[city_idx] )
			{      //create the build_cap[city_idx] object if it does not exist.
				Data.options.building.city[city_idx] ={};
			}
			
		}
		
		// Tab initialization
		t.container = div;
		var html = 
		 '<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Jobs.tabSummary')  + '>' + translate('Summary')  + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Jobs.tabTrain')    + '>' + translate('Train')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Jobs.tabBuild')    + '>' + translate('Build')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Jobs.tabResearch') + '>' + translate('Research') + '</a></li>'
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
		.addClass(UID['content']);
		
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
		//t.clearTimers();
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
		
		t[tab_name] ();
	},

	clearTimers : function ()
	{
		var t = Tabs.Jobs;
		clearTimeout (t.jobsStatTimer);
		clearTimeout (t.train_stat_timer);
		clearTimeout (t.build_stat_timer);
		clearTimeout (t.res_stat_timer);
	},
	
	// ** Tab: Jobs - SubTab:  Info
	//--------------------------------------------------------------------
	tabSummary : function ()
	{
		var t = Tabs.Jobs;
		
		var city = Seed.cities[0];
		
		$J( '#'+UID['Tabs.Jobs.header'] )
		.css({
			 height			: '12pt'
			,marginBottom	: '2px'
		})
		.html( '<div>' + translate('Info') + '</div>' );
		
		$J( '#'+UID['Tabs.Jobs.header'] + ' > div' ).addClass(UID['title']);

		$J( '#'+UID['Tabs.Jobs.content'] )
		.css ( {
			 height		: '670px'
			 ,marginTop	: '9px'
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
				+ '<table class=' + UID['table'] + '>' 
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
			+ '	<td class=right><b>'+ translate('Building') +':</b> </td>';
			
			var current = getBuildingJob (city_idx);
			
			// TODO: very rare occurance: Error: job.building is null
			if ( current && current.job.run_at > serverTime() )
			{
				/*
				   Don't show negative values - not pleasant user interface. 
				   To be truly nice, if the time is less than zero, we should reset the build timer. 
				   For now, that is done by the Build tab's notification process
				*/
				html +=
				 '	<td>' + translate(current.building.type) + ' (' + current.job.level + ') &nbsp;</td>'
				+'	<td>&nbsp;<font color=' + TIMER_COLOR + '>' + timeFormat(current.job.run_at - serverTime(), true) + '</font></td>'
				+'</tr>';
			}
			else {
				html +=
				 '	<td>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td>&nbsp;</td>'
				+'</tr>';
			}
			return html;
		}
		
		// Display research queue
		function dispResearchJob ( city_idx )
		{
			var html = 
			 '<tr>'
			+'	<td class=right><b>'+ translate('Researching') +': </b></td>';
				
			var job = getResearchJob (city_idx);
			if ( job && job.run_at > serverTime() )
			{
				html +=
				 '	<td>' + translate(job.research_type) + ' (' + job.level + ') &nbsp;</td>'
				+'	<td>&nbsp;<font color=' + TIMER_COLOR + '>' + timeFormat(job.run_at - serverTime(), true) + '</font></td>'
				+'</tr>';
			} 
			else {
				html +=
				 '	<td>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td>&nbsp;</td>'
				+'</tr>';
			}
			return html;
		}
		
		// Display training queues
		function dispTrainingJobs ( city_idx )
		{
			var last_time = serverTime(), trains = [];
			
			for ( var i=0; i < Seed.cities[city_idx].jobs.length; i++ )
			{
				
				// in case the city is not been defined in Seed.updateCity skip to next in array.
				if ( !Seed.cities[city_idx] ) continue;
			
				if (Seed.cities[city_idx].jobs[i].queue === 'units' && 
					Seed.cities[city_idx].jobs[i].unit_type && 
					Seed.cities[city_idx].jobs[i].run_at > last_time
					){
						trains.push ( Seed.cities[city_idx].jobs[i] );
				}
			}
			trains.sort( function(a,b){return a.run_at - b.run_at} );
			
			var html = 
			 '<tr>'
			+'	<td class=right><b>'+ translate('Training') +': </b></td>';
			
			if ( trains.length ){
			
				html += 
				 '	<td>' + trains[0].quantity + '&nbsp;&nbsp;' + translate(trains[0].unit_type) + '&nbsp;</td>'
				+'	<td>&nbsp;'
				+'		<font color=' + TIMER_COLOR + '>'
				+			timeFormat(trains[0].run_at - last_time, true) 
				+'		</font>'
				+'	</td>'
				+'</tr>';
				
				last_time = trains[0].run_at;
				
				for ( var i=1; i < trains.length; i++ )
				{
					var total_time='', left_time = 0;
					
					if ( i === trains.length - 1 )
					{
						left_time = (trains[i].run_at - serverTime() > 0) ? trains[i].run_at - serverTime() : 0;
						total_time = '&nbsp;<b>(' + timeFormatShort(left_time) + ')</b>';
					}
					
					left_time = (trains[i].run_at - last_time > 0) ? trains[i].run_at - last_time : 0;
					html +=
					 '<tr>'
					+'	<td>&nbsp;</td>'
					+'	<td>' + trains[i].quantity + '&nbsp;&nbsp;' + translate(trains[i].unit_type) + '&nbsp;</td>'
					+'	<td>&nbsp;'
					+'		<font color=' + TIMER_COLOR + '>'
					+			timeFormat(left_time, true) + total_time 
					+'		</font>'
					+'	</td>'
					+'</tr>';
					
					last_time = trains[i].run_at;
				}
			}
			else {
				html +=
				 '	<td>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td>&nbsp;</td>'
				+'</tr>';
			}
			
			return html;
		}
		
		function cityTitle ( city_idx )
		{
			var city = Seed.cities[city_idx];
			// Outposts are always defending (until further notice)
			var wallStatus = '';
			var alliance_name = (Seed.player.alliance ? Seed.player.alliance.name : '');
						
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
			+'	<table class=' + UID['table'] + '>'
			+'	<tr>'
			+'		<td align=left>' + translate(city.name) + '</td>'
			//+'		<td align=center>' + city.x + ',' + city.y + '</td>'
			+'		<td align=center width=200px>'
			+'			<font color=yellow>' + (city_idx === 0 ? alliance_name : '') + '</font>'
			+'		</td>'
			+'		<td align=right>' + wallStatus + '</td>'
			+'	</tr>'
			+'	</table>'
			+'</div>';
			
			return html;
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
			,marginTop		: '17px'
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
		t.clearTimers();
		t.train_stat_timer = setInterval(t.trainStatTick, 1000);
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
		
		var html = '<div id=' + setUID['Tabs.Jobs.tabTrain.tabSets.content'] + '>';
		
		for (var city_idx=0; city_idx < Seed.cities.length; city_idx++)
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city ) continue;
			
			if(city.outpost_type=='SpectralDragonOutpost') 
			{
				//skip SpectralDragonOutpost as unable to train. (is special case can be
				continue;
			}
			
			html +=
			 '<h4 ref=' + city_idx + ' class=' + UID['subtitle'] + '>'+ translate(city.name) +'</h4>'
			+'<div>'
			+'<table class=' + UID['table'] + '>'
			+'	<tr valign=top>'
			+'		<td width=150>'
			+'		<table class=' + UID['table'] + '>';

			html +=
			 '		<tr>'
			+'			<td></td>'
			+'			<th>' + translate('Quantity') + '</th>'
			+'			<th>' + translate('Total') + '</th>'
			+'		</tr>';
			
			for ( i=0; i < t.city[city_idx].units_type.length; i++ )
			{
				var unit_type = t.city[city_idx].units_type[i];
				
				html +=
				 '	<tr>'
				+'		<td class=right>' + translate(unit_type) + ':</td>';
				
				var num = Data.options.training.city[city_idx].units[unit_type];
				if ( !num || isNaN(num) ){
					num = 0;
				}
				
				html +=
				 '		<td align=middle>'
				+'		<input type=text id=' + setUID('Tabs.Jobs.tabTrain.units_' + city_idx + '_' + i) + ' ref=' + city_idx + '_' + i +' maxlength=6 size=6 value="' + num + '" style="text-align:right;" />'
				+'		</td>'
				+'		<td align=right>&nbsp;'
				+'			<span class=jewel>(' + getUnitNumbers(Seed.cities[0], unit_type).total + ')</span>'
				+'		</td>'
				+'	</tr>';
			
				elements_id.push( UID['Tabs.Jobs.tabTrain.units_'+ city_idx + '_' + i] );
			
			}
			
			html += 
			'		</table>'
			+'		</td>'
			+'	</tr>'
			+'</table>'
			+'</div>';
		}    
		
		html += '</div>';
		
		
		$J('#'+UID['Tabs.Jobs.tabTrain.content'])
		.html( html );
		
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets.content'])
		.css({
			overflow	: 'hidden'
		})
		.accordion({
			 collapsible	: true
			 ,active		: t.train_accordion
			,changestart	: function( event, ui ) {
				if ( !ui || !ui.newHeader || ui.newHeader.length < 1 ) return;
				var city_idx = $J( ui.newHeader[0] ).attr('ref');
				if ( city_idx ) {
					t.train_accordion = parseInt( city_idx );
				}
			}
		});

		
		// Update units on change
		function onChangeUnits ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			var x = parseIntZero(event.target.value);
			var maxLvl = getMaxTroops();
			
			if ( isNaN(x) || x < 0 || x > maxLvl ){
				event.target.style.backgroundColor = '#faa';
				dialogError (translate('Invalid number of troops',t.container));
			} 
			else {
				event.target.value = x;
				var unit_type = t.city[args[0]].units_type[args[1]];
				Data.options.training.city[args[0]].units[unit_type] = x;
				event.target.style.backgroundColor = '';
			}
		}
		
		// Add event listeners for unit quantities 
		for ( var i=0; i < elements_id.length; i++ ) 
		{
			$J('#'+elements_id[i]).change( onChangeUnits );
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
		+'		<input type=radio name=' + UID['Tabs.Jobs.tabTrain.train_mode'] + ' value="min_housing" />' + translate('Minimum Housing') 
		+'		</label>'
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'
		+'		<label>'
		+'		<input type=radio name=' + UID['Tabs.Jobs.tabTrain.train_mode'] + ' value="min_resource" />'+ '<s>' + translate('Minimum Resource Levels' + '</s> <span class=jewel>temporarily disabled</span>')
		+'		</label>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'; 
		
		// Create an all unit table
		var elements_id = [];

		html +=
		'<div class=' + UID['subtitle'] + ' style="background-color:#0044a0;">' + translate('Maximum Troops') + ' (0 = no max)</div>'
		+'	<table class=' + UID['table'] + '>'
		+'		<tr valign=top>'
		+'			<td width=150>'
		+'			<table class=' + UID['table'] + '>';
		
		var i;
		for ( i=0; i < t.units_type.length; i++ )
		{
			html +=
			 '		<tr>'
			+'			<td class=right>' + translate(t.units_type[i]) + ':</td>';
			
			var num = Data.options.training.city[0].cap[i];
			if ( !num || isNaN(num) ){
				num = 0;
			}
			
			html += 
			 '<td>'
			+'<input type=text id=' + setUID('Tabs.Jobs.tabTrain.cap_' + 0 + '_' + i) + ' ref=' + (0 + '_' + i) + ' maxlength=6 size=6 value="' + num + '" style="text-align:right;" />'
			+'</td>'
			+'</tr>';

			elements_id.push(UID['Tabs.Jobs.tabTrain.cap_'+ 0 +'_'+ i]);
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
			$J('#'+elements_id[i]).change( onChangeUnits );
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
		function onChangeUnits ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			var x = parseIntZero(event.target.value);
			
			// The upper limit is not important because we are looking at a maximum number of units
			if ( isNaN(x) || x < 0 )
			{
				event.target.style.backgroundColor = '#faa';
				dialogError (translate('Invalid number of troops',t.container));
			} 
			else {
				event.target.value = x;
				Data.options.training.city[args[0]].cap[args[1]] = x;
				event.target.style.backgroundColor = '';
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
			 height			: '205px'
			,marginBottom	: '2px'
		})
		.html( header );

		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			 height			: '475px'
			,marginTop		: '9px'
		})
		.html( '<div id=' + setUID('Tabs.Jobs.tabBuild.content') + '>' );
		
		html = '';
		
		var elements_id = [], list_city = [], list_field = [];

		for (var city_idx=0; city_idx < Seed.cities.length; city_idx++)
		{
			if (city_idx === 0){
				list_city = t.research_capital;
				list_field = t.research_field;
			} 
			else {
				list_city = t.research_outpost;
				list_field = t.research_field;
			}
			
			// The seed object contains a wealth of information including alliance membership, number of people in the alliance, facebook ids of each member,
			// the ol's information (in alliances and alliance_membership), the s object contains all the buildings for the cities, whether or not the city is
			// on defense, the list of generals, what and where the dragon is, a list of jobs (e.g. research, building, units training and pending training, current marches)
			// the marches alone say where the units are, whether or not they are retreating or attacking, general assigned, etc.
			
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city ) continue;
			
			var spectral_idx = null;
			if ( city.outpost_type == 'SpectralDragonOutpost' )
			{
				list_city = t.research_outpost_spectral;
				list_field = t.research_field_spectral;
				spectral_idx = city_idx;
			}
			
			html +=
			 '<h4 ref=' + city_idx + ' class=' + UID['subtitle'] + '>' + translate(city.name) + '</h4>'
			+'<div>'
			+'<table class=' + UID['table'] + '>';
			
			for ( var i=0; i < list_field.length; i++ )
			{
				html +=
				'	<tr>'
				+'		<td>'
				+'		<label>'
				+'		<input type=checkbox id=' + setUID('Tabs.Jobs.tabBuild.level_enable_' + (city_idx + '_' + list_field[i])) + ' ref='+ (city_idx + '_' + list_field[i]) + ' ' + (Data.options.building.level_enable[city_idx][list_field[i]]?'checked':'') + ' /> '+ translate(list_field[i])
				+'		</label>'
				+'		<td>&nbsp;'
				+'		<span class=jewel>' + Buildings.getLevel(city_idx, list_field[i]) + '</span>'
				+'		</td>'
				+'		</td>'
				+'		<td>' + buildDisplayCap(city_idx,(list_city.length + i),list_field[i]) +'</td>'
				+'	</tr>';
				
				elements_id.push(UID['Tabs.Jobs.tabBuild.level_enable_'+ (city_idx +'_'+ list_field[i])]);
			}
			
			html +=
			 '	<tr>'
			+'		<td colspan=5><hr></td>'
			+'	</tr>';
			
			for ( var i=0; i < list_city.length; i++ )
			{
				html +=
				 '	<tr>'
				+'		<td>'
				+'		<label>'
				+'		<input type=checkbox id=' + setUID('Tabs.Jobs.tabBuild.level_enable_' + (city_idx + '_' + list_city[i])) + ' ref=' + (city_idx + '_' + list_city[i]) + ' ' + (Data.options.building.level_enable[city_idx][list_city[i]]?'checked':'') + ' /> ' + translate(list_city[i]) 
				+'		</label>'
				+'		</td>'
				+'		<td>&nbsp;'
				+'		<span class=jewel>' + Buildings.getLevel(city_idx, list_city[i]) + '</span>'
				+'		</td>'
				+'		<td>' + buildDisplayCap(city_idx,i,list_city[i]) + '</td>'
				+'	</tr>';
				
				elements_id.push(UID['Tabs.Jobs.tabBuild.level_enable_'+ (city_idx +'_'+ list_city[i])]);
			}
			
			html += 
			 '</table>'
			+'</div>';
		}  

		
		var $container = $J('#'+UID['Tabs.Jobs.tabBuild.content']);
		
		$container
		.css ({
			height		: ($J('#'+UID['Tabs.Jobs.content']).innerHeight()-10) + 'px',
			overflow	: 'hidden'
		})
		.addClass ( UID['scrollable'] )
		.html ( html )
		.accordion ({
			collapsible	: true
			,active		: t.build_accordion
			,changestart	: function( event, ui ) {
				if ( !ui || !ui.newHeader || ui.newHeader.length < 1 ) return;
				var city_idx = $J( ui.newHeader[0] ).attr('ref');
				if ( city_idx ) {
					t.build_accordion = parseInt( city_idx );
				}
			}
		});
		
		// Add the event listeners for each city's building types
		for ( var i=0; i < elements_id.length; i++ ) 
		{
			$J('#'+elements_id[i]).click ( checkedBuild );
		}
		
		// Add the event listeners for each city's building type caps
		// And restore the persistent data since it has to be done in the same loop
		for ( var city_idx=0; city_idx < Seed.cities.length; city_idx++ )
		{
		
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !Seed.cities[city_idx] ) continue;
		
			var build_list = (city_idx===0) ? t.research_capital.concat(t.research_field) : ( ( city_idx==spectral_idx ) ? t.research_outpost_spectral.concat( t.research_field_spectral ) : t.research_outpost.concat( t.research_field ) );
			for ( var i=0; i < build_list.length; i++ )
			{
				var build_type = build_list[i];
				var selectMenu = $id(UID['Tabs.Jobs.tabBuild.level_cap_'+ city_idx + '_' + build_type]);
				try {
					if ( !Data.options.building.level_cap[city_idx][build_type] )
					{
						var lowestBuilding_level = t.getCurrentLowestBuildingLevel( city_idx, build_type );
						selectMenu.selectedIndex = lowestBuilding_level;
						Data.options.building.level_cap[city_idx][build_type] = lowestBuilding_level;
					}
					else {
						selectMenu.selectedIndex = Data.options.building.level_cap[city_idx][build_type];
						selectMenu.options[Data.options.building.level_cap[city_idx][build_type]].selected = true;
						t.checkBuildReqs( city_idx, build_type );
					}
				}
				catch (e) {
				}
				
				$J(selectMenu).
				attr( 'ref', JSON.stringify( {cid:city_idx, type:build_type} ) ).
				change(changeBuildCap);
			}
		}
		
		// Add the event listeners for the auto-build button and scrollbar
		$J('#'+UID['Tabs.Jobs.tabBuild.enabled']).click (function (){
			var t=Tabs.Jobs;
			t.setBuildEnable (!Data.options.building.enabled);
		});
		
		t.refreshBuildButton ( Data.options.building.enabled );
		
		function checkedBuild ( event )
		{
			var ref = event.target.getAttribute('ref');
			var idx = ref.split ('_');
			var city_id = Seed.cities[idx[0]].id;
			
			Data.options.building.level_enable[idx[0]][idx[1]] = event.target.checked;
			
			t.checkBuildReqs( idx[0], idx[1] );
			
			if ( Data.options.building.enabled && event.target.checked ) {
				t.build_tick();
			}
		}

		function buildDisplayCap ( city_idx, listIdx, type )
		{
			var minLvl = Buildings.getLevel( city_idx, type );
			var html =
			 '<td>'
			+'	<select id=' + setUID('Tabs.Jobs.tabBuild.level_cap_' + city_idx + '_' + type) + '>'
			+'		<option value=0' + ( minLvl>0  ?' style="display:none;"' : '') + '>0</option>'
			+'		<option value=1' + ( minLvl>1  ?' style="display:none;"' : '') + '>1</option>'
			+'		<option value=2' + ( minLvl>2  ?' style="display:none;"' : '') + '>2</option>'
			+'		<option value=3' + ( minLvl>3  ?' style="display:none;"' : '') + '>3</option>'
			+'		<option value=4' + ( minLvl>4  ?' style="display:none;"' : '') + '>4</option>'
			+'		<option value=5' + ( minLvl>5  ?' style="display:none;"' : '') + '>5</option>'
			+'		<option value=6' + ( minLvl>6  ?' style="display:none;"' : '') + '>6</option>'
			+'		<option value=7' + ( minLvl>7  ?' style="display:none;"' : '') + '>7</option>'
			+'		<option value=8' + ( minLvl>8  ?' style="display:none;"' : '') + '>8</option>'
			+'		<option value=9' + ( minLvl>9  ?' style="display:none;"' : '') + '>9</option>'
			+'		<option value=10'+ ( minLvl>10 ?' style="display:none;"' : '') + '>10</option>'
			+'		<option value=11'+ ( minLvl>11 ?' style="display:none;"' : '') + '>11</option>'
			+'	</select></td>'
			+'		<td id='+ setUID('Tabs.Jobs.tabBuild.feedback_'+city_idx +'_'+ type) +' class=jewel valign=top style="width:250px;white-space:normal;"></td>';
			
			return html;
		}

		// Add to persistent storage
		function changeBuildCap ( event ) 
		{
			var ref = JSON.parse( $J(this).attr('ref') );

			Data.options.building.level_cap[ref.cid][ref.type] = event.target[event.target.selectedIndex].value;
			event.target.style.backgroundColor = '';
			
			t.checkBuildReqs( ref.cid, ref.type );
			
			if ( Data.options.building.enabled ) {
				t.build_tick();
			}
		}
		
		// First Run of buildStatTick
		t.buildStatTick();
		
		// Timers
		t.clearTimers();
		
		// start the build statistics timer
		t.build_stat_timer = setInterval ( t.buildStatTick, 1000 );
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
			 height			: '205px'
			,marginBottom	: '2px'
		})
		.html( header );
		
		var html = 
		'<div>';
		
		var city = Seed.cities[0];
		
		html +=
		 '<div class=' + UID['subtitle'] + '>' + translate(city.name) +'</div>'
		+'<table class=' + UID['table'] + '>';
		
		var elements_id = [];
		for ( var i=0; i < t.research_type.length; i++ )
		{
			var research_type = t.research_type[i];
			var curLvl = Seed.player.research[research_type] || 0;
			
			html +=
			 '	<tr>'
			+'			<td>'
			+'			<label>'
			+'			<input type=checkbox id=' + setUID('Tabs.Jobs.tabResearch.level_enable_'+research_type) + ' ' + (Data.options.research.level_enable[research_type] ? 'checked' : '') + ' ref=' + i + ' /> ' + translate(research_type) 
			+'			</label>'
			+'			<td>'
			+'				<span class=jewel>' + curLvl + '</span>'
			+'			</td>'
			+'			</td>'
			+'			<td>'
			+'			<select id=' + setUID('Tabs.Jobs.tabResearch.level_cap_' + research_type) + ' ref=' + i + '>'
			+'				<option value=0' + ( curLvl>0  ?' style="display:none;"' : '') + '>0</option>'
			+'				<option value=1' + ( curLvl>1  ?' style="display:none;"' : '') + '>1</option>'
			+'				<option value=2' + ( curLvl>2  ?' style="display:none;"' : '') + '>2</option>'
			+'				<option value=3' + ( curLvl>3  ?' style="display:none;"' : '') + '>3</option>'
			+'				<option value=4' + ( curLvl>4  ?' style="display:none;"' : '') + '>4</option>'
			+'				<option value=5' + ( curLvl>5  ?' style="display:none;"' : '') + '>5</option>'
			+'				<option value=6' + ( curLvl>6  ?' style="display:none;"' : '') + '>6</option>'
			+'				<option value=7' + ( curLvl>7  ?' style="display:none;"' : '') + '>7</option>'
			+'				<option value=8' + ( curLvl>8  ?' style="display:none;"' : '') + '>8</option>'
			+'				<option value=9' + ( curLvl>9  ?' style="display:none;"' : '') + '>9</option>'
			+'				<option value=10'+ ( curLvl>10 ?' style="display:none;"' : '') + '>10</option>'
			+'				<option value=11'+ ( curLvl>11 ?' style="display:none;"' : '') + '>11</option>'
			+'			</select>'
			+'			</td>'
			+'			<td id=' + setUID('Tabs.Jobs.tabResearch.feedback_' + research_type) + ' class=jewel valign=top style="width:250px;white-space:normal;"></td>'
			+'		</tr>';
			
			elements_id.push(UID['Tabs.Jobs.tabResearch.level_enable_'+research_type]);
		}
		
		html += '</table></div>';
		
		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			 height		: '475px'
			,marginTop	: '9px'
		})
		.html( html );
		
		
		// Add the event listeners for the research types
		for ( var i=0; i < elements_id.length; i++ )
		{
			$J('#'+elements_id[i]).click( checkedResearch );
		}
		
		// Add the event listeners for the research caps
		// And restore the persistent data since it has to be done in the same loop
		for ( var i=0; i < t.research_type.length; i++ ) 
		{
			var research_type = t.research_type[i];
			var selectMenu = $id(UID['Tabs.Jobs.tabResearch.level_cap_' + research_type]);
			try {
				if ( !Data.options.research.level_cap[research_type] )
				{
					var currentResearch_level = t.getCurrentResearchLevel( research_type );
					selectMenu.selectedIndex = currentResearch_level;
					Data.options.research.level_cap[research_type] = currentResearch_level;
				}
				else {
					selectMenu.selectedIndex = Data.options.research.level_cap[research_type];
					selectMenu.options[Data.options.research.level_cap[research_type]].selected = true;
					//if(Data.options.research.level_enable[research_type]){
						t.checkResearchReqs( research_type );
					//}
				}
			}
			catch (e) {
			}
			
			$J(selectMenu).change( changeResearchCap );
		}
		
		$J('#'+UID['Tabs.Jobs.tabResearch.enabled']).click (function (){
			var t=Tabs.Jobs;
			t.setResearchEnable ( !Data.options.research.enabled );
		});
		
		t.refreshResearchButton ( Data.options.research.enabled );
		
		function checkedResearch ( event )
		{
			var t = Tabs.Jobs;
			var n = parseInt(event.target.getAttribute('ref'));
			Data.options.research.level_enable[t.research_type[n]] = event.target.checked;
			
			if ( Data.options.research.level_enable[t.research_type[n]] ) {
				t.checkResearchReqs( t.research_type[n] );
			}
			
			if ( Data.options.research.enabled ) {
				t.researchTick();
			}
			
		}


		// Add to persistent storage
		function changeResearchCap ( event )
		{
			var t = Tabs.Jobs;
			var n = parseInt(event.target.getAttribute('ref'));
			Data.options.research.level_cap[t.research_type[n]] = event.target[event.target.selectedIndex].value;
			event.target.style.backgroundColor = '';  
			
			if ( Data.options.research.level_enable[t.research_type[n]] ) {
				t.checkResearchReqs( t.research_type[n] );
			}
			
			if ( Data.options.research.enabled ) {
				t.researchTick();
			}
		}
		
		// First Run of researchStatTick
		t.researchStatTick();
		
		// Timers
		t.clearTimers();
		
		// start the research statistics timer
		t.res_stat_timer = setInterval ( t.researchStatTick, 1000 );
	},

	setTrainEnable : function ( on_off )
	{
		var t = Tabs.Jobs;
		t.refreshTrainButton( on_off );
		Data.options.training.enabled = on_off;

		// Stop all Trainings
		clearTimeout ( t.train_timer );
		
		if ( on_off )
		{
			t.train_timer= setTimeout( t.trainTick, 3000, 0 );
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
			t.build_retry_time = 20000;
			t.build_timer = setTimeout ( t.build_tick, 3000 );
		} 
		else {
			clearTimeout ( t.build_timer );
			//Data.options.train_jobs.length = 0;
		}
	},

	setResearchEnable : function ( on_off )
	{
		var t = Tabs.Jobs;
		t.refreshResearchButton( on_off );
		Data.options.research.enabled = on_off;
		
		if ( on_off ){
			t.res_retry_time = 20000;
			t.research_timer = setInterval( t.researchTick, 5000 );
		} 
		else {
			clearTimeout ( t.research_timer );
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
		var statElement = $id( UID['Tabs.Jobs.tabTrain.report'] );
		if ( statElement !== null ) {
			statElement.innerHTML = trainTable('train');
		}
	},
	
	// Build statistics - timer set to fire every 1 seconds
	// Calls getBuildJob(), deleteBuildJob(), Buildings.getById(), Seed.fetchPlayer(), serverTime()
	build_stat_fetch : false,
	buildStatTick : function ()
	{
		var t = Tabs.Jobs;
		var html = '<table class=' + UID['table'] + '>';
		
		for ( var city_idx=0; city_idx < Seed.cities.length; city_idx++ )
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city ) continue;
			
			var job = getBuildJob ( city_idx );
			var options ={noPlayer:true,cities:[]};
			/*
			if (Data.options.build_jobs.length === 0 && job) {
				// the Seed is out of sync, the job should be deleted
				deleteBuildJob (city_idx, job);
				job = null;
			}
			*/
			html += '<tr><td>'+ translate(city.name) +': </td><td>';
			
			if ( job === null ){
				html += translate('Off') +'</td></tr>';
			}
			else {
				var b = Buildings.getById( city_idx, job.city_building_id );
				var left_time = ((job.run_at - serverTime()) > 0) ? (job.run_at - serverTime()) : 0;
				
				if ( left_time === 0 )
				{
					// If we have a job and the left_time is negative or zero we delete the job
					// and fetch the Seed - although this does not always work because the server
					// is laggy and may not return the correct information
					html += translate('Awaiting task completion notification') + '...</td><td></td><td></td></tr>';
					deleteBuildJob ( city_idx, job );
					if ( t.build_stat_fetch === false ) {
						
						// fetch the player & only the current city
						if(city_idx != 0)
						{
							options.cities.push(Seed.cities[0].id);
						}
						options.cities.push(city.id);
						Seed.fetchPlayer ( options ) ;
						
						t.build_stat_fetch = true;
					}
				}
				
				else {
					html += translate(b.type) + '  ('+ job.level +') </td><td> <font color='+TIMER_COLOR+'>'+ timeFormat(left_time)  +'</font></td></tr>';
					t.build_stat_fetch = false;
					try {
						$id(UID['Tabs.Jobs.tabBuild.feedback_'+city_idx+'_'+b.type]).innerHTML = '<font color=#000>' + translate('Building') + ': ' + translate(b.type) + ' ' + translate('Level').toLowerCase() + ' ' + job.level + '</font>';
					} catch(e){}
				}
			}
		}
		
		html += '</table>';
		
		$J('#'+UID['Tabs.Jobs.tabBuild.report']).html( html );
	},

	// Build statistics - timer set to fire every 1 seconds
	// Calls getResearchJob(), deleteResearchJob(), Seed.fetchPlayer(), serverTime()
	research_stat_fetch : false,
	researchStatTick : function ()
	{
		var t = Tabs.Jobs;
		var city = Seed.cities[0];
		var job = getResearchJob (0);
		
		var html = '<table class=' + UID['table'] + '>';
		
		html += '<tr><td>'+ translate(city.name) +': </td><td>';

		if ( job === null ){
			html += translate('Off') +'</td></tr>';
		}
		else {
			var left_time = ((job.run_at - serverTime()) > 0) ? timeFormat(job.run_at - serverTime()) : 0;
			if ( left_time === 0 )
			{
				html += translate('Awaiting task completion notification') + '...</td><td></td><td></td></tr>';
				deleteResearchJob(job);
				if ( t.research_stat_fetch === false ) 
				{
					// fetch the player & only the current city
					Seed.fetchPlayer ( { cities:[city.id] } ) ;
					
					t.research_stat_fetch = true;
				}
			}    
			else {
				// Bug: If we have a job and the left_time is negative or zero we should delete the job
				html += translate(job.research_type) +' ('+ job.level +') </td><td>  <font color='+TIMER_COLOR+'>'+ left_time  +'</font></td></tr>';
				t.research_stat_fetch = false;
			}
		}

		html += '</table>';
		
		$J('#'+UID['Tabs.Jobs.tabResearch.report']).html( html );
		
		try {
			$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+job.research_type]).html( '<font color=#000>' + translate('Researching') + '&nbsp;' + translate('Level').toLowerCase() + '&nbsp;' + job.level + '</font>' );
		}catch(e){}
		//t.statTimer = setTimeout (t.statTick, 5000);
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

	// Returns level === 12 if the building is missing
	getCurrentLowestBuildingLevel : function ( city_idx, building_type )
	{
		var t = Tabs.Jobs, level = 12;
		
		// The building can be missing if it has not been built yet
		try {
			var b = Seed.cities[city_idx].buildings;
			for ( var i=0; i < b.length; i++ )
			{
				if ( b[i].type === building_type )
				{
					if ( b[i].level < level )
					{
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
	getLowestBuildingLevel : function( city_idx, building_type )
	{
		var buildings = Seed.cities[city_idx].buildings;
		var lowest = 12;
		var found = false;
		
		for ( var p=0; p < buildings.length; p++ )
		{
			if ( buildings[p].type === building_type )
			{
				found = true; 
				if ( buildings[p].level < lowest )
				{
					lowest = buildings[p].level;
				}
			}
		}
		
		return (found) ? lowest : 0;
	},

	// Returns the current research level or zero if the user has not
	// researched this type yet
	// TBD - remove the if statements, make sure that the type passed
	// is UI convolved
	getCurrentResearchLevel : function ( research_type )
	{
		var t = Tabs.Jobs, level = 0;
		
		// This can be missing if the user has not done any research
		// implying a research level of zero
		try {
			level = (Seed.player.research[research_type]) ? Seed.player.research[research_type] : 0; 
		}
		catch (e) {
		}  

		return level;
	},
	
	// Return the total number units of the specified type adding in the quantity about to 
	// be produced. If this number is less than the cap, return zero     
	getUnitCap : function( unit_type, quantity )
	{
		var t = Tabs.Jobs;
		var cap = 0;
		var completed = 0;
		var marching = 0;
		
		// Get the cap set for this unit type
		cap = Data.options.training.city[0].cap[unit_type];
		
		// If there is no cap, we are done
		if (cap === 0){
			return cap;
		}
		
		// Find the number of units still in the city  
		completed += (Seed.cities[0].units[unit_type] !== undefined) ? Seed.cities[0].units[unit_type] : 0;
		
		// Find additional units in marches
		for ( var id in Seed.marches )
		{
			for ( var q in Seed.marches[id].units )
			{
				if ( q === unit_type ){
					marching += Seed.marches[id].units[q];
				}
			}
		}

		// Find units in training jobs
		/*
		for (var i=0; i< Seed.cities.length; i++)
			var job = getTrainJob(0);
		*/
		
		return ((completed + marching + quantity) > cap) ? (completed + marching + quantity) : 0;
	},
	
	// Returns the user set building cap or zero if the cap has not been set
	getBuildingCap : function ( city_idx, build_type )
	{
		return Data.options.building.level_cap[city_idx][build_type] || 0;
		/*
		var t = Tabs.Jobs;
		var cap = 0;
		var city_type =  (city_idx === 0) ? t.research_capital : t.research_outpost;
		city_type =  (city_idx === 0) ? city_type.concat(t.research_field) : city_type.concat(t.research_field);
		
		for (var i=0; i < city_type.length; i++) {
			if (city_type[i] === building_type) {
				try {
					cap = (Data.options.building.level_cap[city_idx][i]) ? Data.options.building.level_cap[city_idx][i] : 0; 
					break;
				}
				catch (e) {
				}  
			}
		}

		return cap;
		*/
	},

	// Returns the user set research cap or zero if the cap has not been set
	getResearchCap : function ( research_type )
	{
		var t = Tabs.Jobs;
		var cap = 0;
		
		cap = (Data.options.research.level_cap[research_type]) ? Data.options.research.level_cap[research_type] : 0; 
		
		return cap;
	},
	
	// Given the city index number and building type, returns the index
	// of the specified building type
	getBuildingIndex : function ( city_idx, building_type )
	{
		var t = Tabs.Jobs, bldgIdx = 0;
		var city_type =  (city_idx === 0) ? t.research_capital : t.research_outpost;
		city_type =  (city_idx === 0) ? city_type.concat(t.research_field) : city_type.concat(t.research_field);
		
		for ( var i=0; i < city_type.length; i++ )
		{
			if ( city_type[i] === building_type ) 
			{
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
	getBuildingLevel : function( city_idx, building_type, building_level )
	{
		var buildings = Seed.cities[city_idx].buildings;
		var ret = 0;
		for ( var p=0; p < buildings.length; p++ )
		{
			if ( buildings[p].type === building_type && buildings[p].level >= building_level )
			{
				ret = buildings[p].level;
				break;
			}
		}
		return ret;
	},

	// Return the index number of the research type
	getResearchIndex : function ( research_type )
	{
		var t = Tabs.Jobs;
		return t.research_index[research_type];
	},

	// Training - Get the remainin queue length (Fixed by Lord Mimir)
	getRemainingQueue : function ( city_idx, queue_type )  
	{  
		var city = Seed.cities[city_idx];  
		var jobs = city.jobs;  
		
		// max_queue_length (fixed by LES..)
		var max_queue_length = ( city.figures.queue_lengths.units ? city.figures.queue_lengths.units : 0 );
		
		var used_queue = 0;
		
		//Check if max_queue_length is a number and not 0) 
		if ( isNaN( max_queue_length )  ||  !max_queue_length)  
		{  
			return 0;
		}
		
		// Count the number of jobs in the queue  
		for ( var i=0; i < jobs.length; i++ )
		{  
			if ( jobs[i].queue === queue_type )
			{  
				++used_queue;
			}  
		}
		return max_queue_length - used_queue;
	},

	checkPorterReqs : function( unit_quantity, city_idx, count, units_length )
	{
		// Requirements
		// Food: 40
		// Garrison Level: 1
		// Idle Population: 1
		// Lumber: 150
		// Metals: 10
		// Upkeep: 2 food
		
		var t = Tabs.Jobs;    
		var food = unit_quantity * 40;
		var garrison_level = 1;
		var idle_pop = unit_quantity * 1;
		var lumber = unit_quantity * 150;
		var metal = unit_quantity * 10;
		var upkeep = unit_quantity * 2;
		var city = Seed.cities[0];
		var unit_type = 'Porter';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required')+': ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('Porter', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity')+' '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison')+' '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp')+' '+ garrison_level +' + ';
		if (city.resources.food < food) html += translate('Food')+': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood')+': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore')+': '+ (metal - city.resources.ore) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble')+': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html += translate('training queue')+' ';
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity + ' ' + translate('Porter') +' '+translate('UpKeep')+' ' + upkeep + ' '+translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;    
	},

	checkConscriptReqs : function(unit_quantity, city_idx, count, units_length) {
		// Requirements
		// Food: 80
		// Garrison Level: 1
		// Idle Population: 1
		// Lumber: 100
		// Metals: 50
		// Upkeep: 3 food
		
		var t = Tabs.Jobs;    
		var food = unit_quantity * 80;
		var garrison_level = 1;
		var idle_pop = unit_quantity * 1;
		var lumber = unit_quantity * 100;
		var metal = unit_quantity * 50;
		var upkeep = unit_quantity * 3;
		var city = Seed.cities[0];
		var unit_type = 'Conscript';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required')+':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('Conscript', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity')+': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp') +': '+ garrison_level +' + ';
		if (city.resources.food < food) html += translate('Food')+': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood')+': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore')+': '+ (metal - city.resources.ore) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('People')+': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html += translate('training queue')+' ';
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('Conscript') +' '+translate('UpKeep')+' ' + upkeep + ' '+translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;    
	},

	checkSpyReqs : function(unit_quantity, city_idx, count, units_length) {
		// Requirements
		// Clairvoyance: 1
		// Food: 120
		// Garrison Level: 2
		// Idle Population: 1
		// Lumber: 200
		// Metals: 150
		// Upkeep: 5 food
		
		var t = Tabs.Jobs;    
		var food = unit_quantity * 120;
		var garrison_level = 1;
		var idle_pop = unit_quantity * 1;
		var lumber = unit_quantity * 200;
		var metal = unit_quantity * 150;
		var upkeep = unit_quantity * 5;
		var clairvoyance_level = 1;
		var city = Seed.cities[0];
		var unit_type = 'Spy';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			clairvoyance_level = seed_reqs.research['Clairvoyance'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('Spy', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp') +': '+ garrison_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html += translate('Training queue') + ' ';
		if (Seed.player.research.Clairvoyance < clairvoyance_level) html += translate('Clairvoyance') + ': ' + clairvoyance_level + ' + ';
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('Spies') +' '+ translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;       
	},

	checkHalberdsmanReqs : function(unit_quantity, city_idx, count, units_length) {
		// Requirements
		// Metallurgy: 1
		// Food: 150
		// Garrison Level: 2
		// Idle Population: 1
		// Lumber: 500
		// Metals: 100
		// Upkeep: 6 food
		
		var t = Tabs.Jobs;    
		var food = unit_quantity * 150;
		var garrison_level = 1;
		var idle_pop = unit_quantity * 1;
		var lumber = unit_quantity * 500;
		var metal = unit_quantity * 100;
		var upkeep = unit_quantity * 6;
		var metallurgy_level = 1;
		var city = Seed.cities[0];
		var unit_type = 'Halberdsman';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			metallurgy_level = seed_reqs.research['Metallurgy'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('Halberdsman', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp') +': '+ garrison_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html+= translate('Training queue') + ' ';
		if (Seed.player.research.Metallurgy < metallurgy_level) html += translate('Metallurgy') + ': ' + metallurgy_level +' + '; 
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('Halberdsman') +' '+ translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;       
	},

	checkMinotaurReqs : function(unit_quantity, city_idx, count, units_length) {
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
		var food = unit_quantity * 200;
		var garrison_level = 3;
		var idle_pop = unit_quantity * 1;
		var lumber = unit_quantity * 150;
		var metal = unit_quantity * 400;
		var upkeep = unit_quantity * 7;
		var metallurgy_level = 1;
		var metalsmith_level = 1;
		var city = Seed.cities[0];
		var unit_type = 'Minotaur';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			metallurgy_level = seed_reqs.research['Metallurgy'];
			metalsmith_level = seed_reqs.research['Metalsmith'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('Minotaur', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp') +': '+ garrison_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html+= translate('Training queue') + ' ';
		if (Seed.player.research.Metallurgy < metallurgy_level) html += translate('Metallurgy') + ': ' + metallurgy_level +' + '; 
		if (Seed.player.research.Metalsmith < metalsmith_level) html += translate('Metalsmith') + ': ' + metalsmith_level +' + '; 
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('Minotaur') +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;          
	},

	checkLongbowmanReqs : function(unit_quantity, city_idx, count, units_length) {
		// Requirements
		// Ballistics: 1
		// Food: 300
		// Garrison Level: 4
		// Idle Population: 2
		// Lumber: 350
		// Metals: 300
		// Upkeep: 9 food
		
		var t = Tabs.Jobs;    
		var food = unit_quantity * 300;
		var garrison_level = 4;
		var idle_pop = unit_quantity * 2;
		var lumber = unit_quantity * 350;
		var metal = unit_quantity * 300;
		var upkeep = unit_quantity * 9;
		var ballistics_level = 1;
		var city = Seed.cities[0];
		var unit_type = 'Longbowman';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			ballistics_level = seed_reqs.research['Ballistics'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}
		
		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('Longbowman', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp') +': '+ garrison_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html+= translate('Training queue') + ' ';
		if (Seed.player.research.Ballistics < ballistics_level) html += translate('Ballistics') + ': ' + ballistics_level +' + '; 
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('Longbowman') +' '+ translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;    
	},

	checkSwiftStrikeDragonReqs : function(unit_quantity, city_idx, count, units_length) {
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
		var food = unit_quantity * 1000;
		var garrison_level = 5;
		var idle_pop = unit_quantity * 3;
		var lumber = unit_quantity * 600;
		var metal = unit_quantity * 500;
		var upkeep = unit_quantity * 18;
		var dragonry_level = 2;
		var rapid_deployment_level = 1;
		var rookery_level = 1;
		var city = Seed.cities[0];
		var unit_type = 'SwiftStrikeDragon';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			rookery_level = seed_reqs.buildings['Rookery'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			rapid_deployment_level = seed_reqs.research['RapidDeployment'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('SwiftStrikeDragon', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp') +': '+ garrison_level +' + ';
		if (t.getBuildingLevel(0, 'Rookery', rookery_level) === 0) html += translate('Rookery') +': '+ rookery_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html+= translate('Training queue') + ' ';
		if (Seed.player.research.Dragonry < dragonry_level) html += translate('Dragonry') + ': ' + dragonry_level +' + '; 
		if (Seed.player.research.RapidDeployment < rapid_deployment_level) html += translate('RapidDeployment') + ': ' + rapid_deployment_level +' + '; 
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('SwiftStrikeDragon') +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret; 
	},

	checkBattleDragonReqs : function(unit_quantity, city_idx, count, units_length) {
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
		var food = unit_quantity * 1000;
		var garrison_level = 7;
		var idle_pop = unit_quantity * 6;
		var lumber = unit_quantity * 500;
		var metal = unit_quantity * 2500;
		var upkeep = unit_quantity * 35;
		var dragonry_level = 3;
		var rapid_deployment_level = 5;
		var rookery_level = 5;
		var metalsmith_level = 5;
		var city = Seed.cities[0];
		var unit_type = 'BattleDragon';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			rookery_level = seed_reqs.buildings['Rookery'];
			metalsmith_level = seed_reqs.buildings['Metalsmith'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			rapid_deployment_level = seed_reqs.research['RapidDeployment'];
			dragonry_level = seed_reqs.research['Dragonry'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('BattleDragon', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp') +': '+ garrison_level +' + ';
		if (t.getBuildingLevel(0, 'Metalsmith', metalsmith_level) === 0) html += translate('Metalsmith') +': '+ metalsmith_level +' + ';
		if (t.getBuildingLevel(0, 'Rookery', rookery_level) === 0) html += translate('Rookery') +': '+ rookery_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html+= translate('Training queue') + ' ';
		if (Seed.player.research.Dragonry < dragonry_level) html += translate('Dragonry') + ': ' + dragonry_level +' + '; 
		if (Seed.player.research.RapidDeployment < rapid_deployment_level) html += translate('RapidDeployment') + ': ' + rapid_deployment_level +' + '; 
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('BattleDragon') +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;     
	},

	checkArmoredTransportReqs : function(unit_quantity, city_idx, count, units_length) {
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
		var food = unit_quantity * 600;
		var garrison_level = 6;
		var idle_pop = unit_quantity * 4;
		var lumber = unit_quantity * 1500;
		var metal = unit_quantity * 350;
		var upkeep = unit_quantity * 10;
		var factory_level = 3;
		var levitation_level = 3;
		var city = Seed.cities[0];
		var unit_type = 'ArmoredTransport';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			factory_level = seed_reqs.buildings['Factory'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			levitation_level = seed_reqs.research['Levitation'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('ArmoredTransport', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp') +': '+ garrison_level +' + ';
		if (t.getBuildingLevel(0, 'Factory', factory_level) === 0) html += translate('Factory') +': '+ factory_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ ((lumber - city.resources.wood)) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ ((metal - city.resources.ore)) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html+= translate('Training queue') + ' ';
		if (Seed.player.research.Levitation < levitation_level) html += translate('Levitation') + ': ' + levitation_level +' + '; 
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('ArmoredTransport') +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;    
	},

	checkGiantReqs : function(unit_quantity, city_idx, count, units_length) {
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
		var food = unit_quantity * 4000;
		var garrison_level = 8;
		var idle_pop = unit_quantity * 8;
		var lumber = unit_quantity * 6000;
		var metal = unit_quantity * 1500;
		var upkeep = unit_quantity * 100;
		var factory_level = 7;
		var metalsmith_level = 7;
		var clairvoyance_level = 3;
		var metallurgy_level = 8;
		var city = Seed.cities[0];
		var unit_type = 'Giant';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			factory_level = seed_reqs.buildings['Factory'];
			metalsmith_level = seed_reqs.buildings['Metalsmith'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			clairvoyance_level = seed_reqs.research['Clairvoyance'];
			metallurgy_level = seed_reqs.research['Metallurgy'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('Giant', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp') +': '+ garrison_level +' + ';
		if (t.getBuildingLevel(0, 'Factory', factory_level) === 0) html += translate('Factory') +': '+ factory_level +' + ';
		if (t.getBuildingLevel(0, 'Metalsmith', metalsmith_level) === 0) html += translate('Metalsmith') +': '+ metalsmith_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html+= translate('Training queue') + ' ';
		if (Seed.player.research.Clairvoyance < clairvoyance_level) html += translate('Clairvoyance') + ': ' + clairvoyance_level +' + '; 
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('Giant') +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;    
	},

	checkFireMirrorReqs : function(unit_quantity, city_idx, count, units_length) {
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
		var food = unit_quantity * 5000;
		var garrison_level = 10;
		var idle_pop = unit_quantity * 10;
		var lumber = unit_quantity * 5000;
		var metal = unit_quantity * 1200;
		var stone = unit_quantity * 8000;
		var upkeep = unit_quantity * 250;
		var factory_level = 9;
		var metallurgy_level = 10;
		var ballistics_level = 10;
		var city = Seed.cities[0];
		var unit_type = 'FireMirror';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			factory_level = seed_reqs.buildings['Factory'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			stone = unit_quantity * seed_reqs.resources['stone'];
			ballistics_level = seed_reqs.research['Ballistics'];
			metallurgy_level = seed_reqs.research['Metallurgy'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('FireMirror', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (city_idx === 0){ 
			if (t.getBuildingLevel(city_idx, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		}
		else if (t.getBuildingLevel(city_idx, 'TrainingCamp', garrison_level) === 0) html += translate('TrainingCamp') +': '+ garrison_level +' + ';
		if (t.getBuildingLevel(0, 'Factory', factory_level) === 0) html += translate('Factory') +': '+ factory_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(city_idx, 'units') === 0) html+= translate('Training queue') + ' ';
		if (Seed.player.research.Metallurgy < metallurgy_level) html += translate('Metallurgy') + ': ' + metallurgy_level +' + '; 
		if (Seed.player.research.Ballistics < ballistics_level) html += translate('Ballistics') + ': ' + ballistics_level +' + '; 
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('FireMirror') +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;    
	},

	checkAquaTroopReqs : function(unit_quantity, city_idx, count, units_length) {
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
		var food = unit_quantity * 5000;
		var trainingcamp_level = 10;
		var idle_pop = unit_quantity * 10;
		var lumber = unit_quantity * 5000;
		var metal = unit_quantity * 1200;
		var stone = unit_quantity * 8000;
		var upkeep = unit_quantity * 250;
		var factory_level = 7;
		var metalsmith_level = 7;
		var rapid_deployment_level = 8;
		var clairvoyance_level = 4;
		var city = Seed.cities[0];
		var unit_type = 'AquaTroop';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['Garrison'];
			factory_level = seed_reqs.buildings['Factory'];
			metalsmith_level = seed_reqs.buildings['Metalsmith'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			stone = unit_quantity * seed_reqs.resources['stone'];
			rapid_deployment_level = seed_reqs.research['RapidDeployment'];
			clairvoyance_level = seed_reqs.research['Clairvoyance'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('AquaTroop', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (t.getBuildingLevel(city_idx, 'TrainingCamp', trainingcamp_level) === 0) html += translate('TrainingCamp') +': '+ trainingcamp_level +' + ';
		if (t.getBuildingLevel(0, 'Factory', factory_level) === 0) html += translate('Factory') +': '+ factory_level +' + ';
		if (t.getBuildingLevel(0, 'Metalsmith', metalsmith_level) === 0) html += translate('Metalsmith') +': '+ metalsmith_level +' + ';
		var available_units = Seed.getItem('AquaTroopRespirator');
		if (available_units < unit_quantity) html += translate('Respirators') +': '+ (unit_quantity - available_units) +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(1, 'units') === 0) html+= translate('Training queue') + ' ';
		if (Seed.player.research.Clairvoyance < clairvoyance_level) html += translate('Clairvoyance') + ': ' + clairvoyance_level +' + '; 
		if (Seed.player.research.RapidDeployment < rapid_deployment_level) html += translate('RapidDeployment') + ': ' + rapid_deployment_level +' + '; 
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('AquaTroop') +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;    
	},

	checkStoneTroopReqs : function(unit_quantity, city_idx, count, units_length) {
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
		var food = unit_quantity * 3000;
		var trainingcamp_level = 10;
		var idle_pop = unit_quantity * 8;
		var lumber = unit_quantity * 4000;
		var metal = unit_quantity * 2000;
		var stone = unit_quantity * 8000;
		var upkeep = unit_quantity * 100;
		var metalsmith_level = 9;
		var metallurgy_level = 9;
		var masonry_level = 10;
		var clairvoyance_level = 5;
		var city = Seed.cities[0];
		var unit_type = 'StoneTroop';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			food = unit_quantity * seed_reqs.resources['food'];
			garrison_level = seed_reqs.buildings['TrainingCamp'];
			factory_level = seed_reqs.buildings['Factory'];
			metalsmith_level = seed_reqs.buildings['Metalsmith'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			stone = unit_quantity * seed_reqs.resources['stone'];
			metallurgy_level = seed_reqs.research['Metallurgy'];
			clairvoyance_level = seed_reqs.research['Clairvoyance'];
			masonry_level = seed_reqs.research['Masonry'];
		}
		catch(e){
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('StoneTroop', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (t.getBuildingLevel(city_idx, 'TrainingCamp', trainingcamp_level) === 0) html += translate('TrainingCamp') +': '+ trainingcamp_level +' + ';
		if (t.getBuildingLevel(0, 'Metalsmith', metalsmith_level) === 0) html += translate('Metalsmith') +': '+ metalsmith_level +' + ';
		var available_units = Seed.getItem('StoneTroopItem');
		if (available_units < unit_quantity) html += translate('Mandrakes') +': '+ (unit_quantity - available_units) +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (t.getRemainingQueue(1, 'units') === 0) html+= translate('Training queue') + ' ';
		if (Seed.player.research.Clairvoyance < clairvoyance_level) html += translate('Clairvoyance') + ': ' + clairvoyance_level +' + '; 
		if (Seed.player.research.Metallurgy < metallurgy_level) html += translate('Metallurgy') + ': ' + metallurgy_level +' + '; 
		if (Seed.player.research.Masonry < masonry_level) html += translate('Masonry') + ': ' + masonry_level +' + '; 
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('StoneTroop') +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		}
		else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;    
	},

	checkFireTroopReqs : function (unit_quantity, city_idx, count, units_length) {
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
		var clairvoyance_level = 5;		
		var food = unit_quantity * 5000;
		var idle_pop = unit_quantity * 12;
		var lumber = unit_quantity * 3000;
		var metal = unit_quantity * 9000;
		var metalsmith_level = 8;
		var rapid_deployment_level = 9;
		var stone = unit_quantity * 4000;
		var trainingcamp_level = 10;
		var ballistics_level = 10;
		
		var upkeep = unit_quantity * 260;

		var city = Seed.cities[0];
		var unit_type = 'FireTroop';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			clairvoyance_level = seed_reqs.research['Clairvoyance'];
			food = unit_quantity * seed_reqs.resources['food'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			metalsmith_level = seed_reqs.buildings['Metalsmith'];
			rapid_deployment_level = seed_reqs.research['RapidDeployment'];
			stone = unit_quantity * seed_reqs.resources['stone'];
			garrison_level = seed_reqs.buildings['TrainingCamp'];
			ballistics_level = seed_reqs.research['Ballistics'];
		} catch (e) {
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('FireTroop', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (Seed.player.research.Clairvoyance < clairvoyance_level) html += translate('Clairvoyance') + ': ' + clairvoyance_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, 'Metalsmith', metalsmith_level) === 0) html += translate('Metalsmith') +': '+ metalsmith_level +' + ';
		if (Seed.player.research.RapidDeployment < rapid_deployment_level) html += translate('RapidDeployment') + ': ' + rapid_deployment_level +' + '; 
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (t.getBuildingLevel(city_idx, 'TrainingCamp', trainingcamp_level) === 0) html += translate('TrainingCamp') + ': '+ trainingcamp_level +' + ';
		var available_units = Seed.getItem('FireTroopItem');
		if (available_units < unit_quantity) html += translate('Runes') +': '+ (unit_quantity - available_units) +' + ';
		if (Seed.player.research.Ballistics < ballistics_level) html += translate('Ballistics') + ': ' + ballistics_level +' + '; 
		if (t.getRemainingQueue(1, 'units') === 0) html+= translate('Training queue') + ' ';
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('FireTroop') +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		} else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;    
	},
	
	checkWindTroopReqs : function (unit_quantity, city_idx, count, units_length) {
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
		
		var aerialcombat_level = 3;	
		var food = unit_quantity * 2000;
		var idle_pop = unit_quantity * 6;
		var levitation_level = 9;
		var lumber = unit_quantity * 3000;
		var metal = unit_quantity * 3000;
		var rapid_deployment_level = 9;
		var stone = unit_quantity * 1000;
		var trainingcamp_level = 10;
		
		var upkeep = unit_quantity * 50;

		var city = Seed.cities[0];
		var unit_type = 'WindTroop';
		
		try {
			var seed_reqs = Seed.requirements.unit[unit_type];
			aerialcombat_level = seed_reqs.research['AerialCombat'];
			food = unit_quantity * seed_reqs.resources['food'];
			idle_pop = unit_quantity * seed_reqs.population['idle'];
			levitation_level = seed_reqs.research['Levitation'];
			lumber = unit_quantity * seed_reqs.resources['wood'];
			metal = unit_quantity * seed_reqs.resources['ore'];
			rapid_deployment_level = seed_reqs.research['RapidDeployment'];
			stone = unit_quantity * seed_reqs.resources['stone'];
			garrison_level = seed_reqs.buildings['TrainingCamp'];
		} catch (e) {
			verboseLog('Training: ' + e.msg + ' Manifest not available, using defaults');
		}

		var html = '';
		var n = translate('Required') + ':+ ';
		var ret = {trainable:false, msg:[]};
		var unit_capped = t.getUnitCap('WindTroop', unit_quantity);
		
		// If the unit is capped, are we about to exceed the limit?
		if (unit_capped > 0) html += translate('Capacity') +': '+ unit_capped +' + ';
		
		// Returns zero or the building level
		if (Seed.player.research.AerialCombat < aerialcombat_level) html += translate('AerialCombat') + ': ' + aerialcombat_level +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		var available_pop = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
		available_pop = (available_pop > 0) ? available_pop : 0;
		if (available_pop < idle_pop) html += translate('Peoble') + ': ' + (idle_pop - available_pop) + ' + ';
		if (Seed.player.research.Levitation < levitation_level) html += translate('Leviatation') + ': ' + levitation_level +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (Seed.player.research.RapidDeployment < rapid_deployment_level) html += translate('RapidDeployment') + ': ' + rapid_deployment_level +' + '; 
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (t.getBuildingLevel(city_idx, 'TrainingCamp', trainingcamp_level) === 0) html += translate('TrainingCamp') +': '+ trainingcamp_level +' + ';
		var available_units = Seed.getItem('WindTroopItem');
		if (available_units < unit_quantity) html += translate('Talons') +': '+ (unit_quantity - available_units) +' + ';
		if (t.getRemainingQueue(1, 'units') === 0) html+= translate('Training queue') + ' ';
		if (html.length === 0) {
			ret.trainable = true;
			ret.msg = unit_quantity +' '+ translate('WindTroop') +' ' + translate('UpKeep') + ' ' + upkeep + ' ' + translate('Food');
		} else {
			ret.trainable = false;
			ret.msg = n + html;
		}
		return ret;    
	},

	
	checkTrainReqs : function(unit_type, unit_quantity, city_idx, count, units_length) {
		var t = Tabs.Jobs;
		var ret = {};
		switch (unit_type)
		{
		case 'Porter':
			ret = t.checkPorterReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'Conscript':
			ret = t.checkConscriptReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'Spy':
			ret = t.checkSpyReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'Halberdsman':
			ret = t.checkHalberdsmanReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'Minotaur':
			ret = t.checkMinotaurReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'Longbowman':
			ret = t.checkLongbowmanReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'SwiftStrikeDragon':
			ret = t.checkSwiftStrikeDragonReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'BattleDragon':
			ret = t.checkBattleDragonReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'ArmoredTransport':
			ret = t.checkArmoredTransportReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'Giant':
			ret = t.checkGiantReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'FireMirror':
			ret = t.checkFireMirrorReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'AquaTroop':
			ret = t.checkAquaTroopReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'StoneTroop':
			ret = t.checkStoneTroopReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'FireTroop':
			ret = t.checkFireTroopReqs(unit_quantity, city_idx, count, units_length);
			break;
		case 'WindTroop':
			ret = t.checkWindTroopReqs(unit_quantity, city_idx, count, units_length);
			break;
		}
		return ret;
	},
	
	// Buildings are of two types. They use food, lumber, metal, stone and/or gold
	// Standard buildings, the most common, do not use gold
	// Calls getLowestBuildingLevel(), getBuildingCap(), actionLog()
	// returns an object containing a Boolean to allow/disallow building and a message
	checkStandardReqs : function(city_idx, building_type, def_food, def_lumber, def_metal, def_stone) {
		var t = Tabs.Jobs;        
		var building_level = t.getLowestBuildingLevel(city_idx, building_type);
		var html = '';
		var n = 'L.' + (building_level+1) + ' : ';
		if (building_level === 0)
		html += ' ' + building_type;

		var food    = def_food * Math.pow(2,building_level + 1);
		var lumber  = def_lumber * Math.pow(2,building_level + 1);
		var metal   = def_metal * Math.pow(2,building_level + 1);
		var stone   = def_stone * Math.pow(2,building_level + 1);
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.building[building_type];
			food = seed_reqs.level[building_level + 1].resources['food'];
			lumber = seed_reqs.level[building_level + 1].resources['wood'];
			metal = seed_reqs.level[building_level + 1].resources['ore'];
			stone = seed_reqs.level[building_level + 1].resources['stone'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {buildable:false, isCapped:false, msg:[]};
		var build_cap = t.getBuildingCap(city_idx, building_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (building_level >= build_cap) html += translate('Capacity') +': '+ build_cap +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';

		if (html.length === 0) {
			ret.buildable = true;
			ret.msg = '<b>' + translate('Building') + ':</b> ' + translate(building_type) + '  (' + (building_level + 1) + ') ';
		}
		else {
			ret.isCapped = (building_level === build_cap);
			ret.buildable = false;
			ret.msg = n + html;
		}
		
		return ret;
	},

	// Buildings are of two types. They use food, lumber, metal, stone and/or gold
	// Standard buildings, the most common, do not use gold
	// Calls getLowestBuildingLevel(), getBuildingCap(), actionLog()
	// returns an object containing a Boolean to allow/disallow building and a message
	checkGoldReqs : function(city_idx, building_type, def_food, def_lumber, def_metal, def_stone, def_gold) {
		var t = Tabs.Jobs;        
		var building_level = t.getLowestBuildingLevel(city_idx, building_type);
		var html = '';
		var n = 'L.' + (building_level+1) + ' : ';
		if (building_level === 0)
		html += ' ' + building_type;

		var food    = def_food * Math.pow(2,building_level + 1);
		var lumber  = def_lumber * Math.pow(2,building_level + 1);
		var metal   = def_metal * Math.pow(2,building_level + 1);
		var stone   = def_stone * Math.pow(2,building_level + 1);
		var gold    = def_gold * Math.pow(2,building_level + 1);
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.building[building_type];
			food    = seed_reqs.level[building_level + 1].resources['food'];
			lumber  = seed_reqs.level[building_level + 1].resources['wood'];
			metal   = seed_reqs.level[building_level + 1].resources['ore'];
			stone   = seed_reqs.level[building_level + 1].resources['stone'];
			gold    = seed_reqs.level[building_level + 1].resources['gold'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {buildable:false, isCapped:false, msg:[]};
		var build_cap = t.getBuildingCap(city_idx, building_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (building_level >= build_cap) html += translate('Capacity') +': '+ build_cap +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';

		if (html.length === 0) {
			ret.buildable = true;
			ret.msg = '<b>' + translate('Building') + ':</b> ' + translate(building_type) + '  (' + (building_level + 1) + ') ';
		}
		else {
			ret.isCapped = (building_level === build_cap);
			ret.buildable = false;
			ret.msg = n + html;
		}
		
		return ret;  
	},

	// Check building requirements
	// Calls checkStandardReqs() or checkGoldReqs()
	// returns an object containing a Boolean value to indicate whether or not building shoudl proceed
	// and a message
	checkBuildReqs : function(city_idx, building_type){
		var t = Tabs.Jobs;
		var reqs;
		
		var level = t.getLowestBuildingLevel(city_idx, building_type);
		var cap = t.getBuildingCap (city_idx, building_type);
		
		if (level < cap) {
		
			switch (building_type) {
			case 'Home':             reqs = t.checkStandardReqs(city_idx, building_type, 50, 300, 150, 200);break;
			case 'Garrison':         reqs = t.checkStandardReqs(city_idx, building_type, 250, 1200, 500, 1500);break;
			case 'ScienceCenter':    reqs = t.checkStandardReqs(city_idx, building_type, 120, 1250, 200, 1500);break;
			case 'Metalsmith':       reqs = t.checkStandardReqs(city_idx, building_type, 125, 1000, 1200, 600);break;
			case 'OfficerQuarter':   reqs = t.checkStandardReqs(city_idx, building_type, 400, 2500, 700, 1200);break;
			case 'MusterPoint':      reqs = t.checkStandardReqs(city_idx, building_type, 100, 600, 250, 2000);break;
			case 'Rookery':          reqs = t.checkGoldReqs(city_idx, building_type, 1200, 2000, 1000, 800, 800);break;
			case 'StorageVault':     reqs = t.checkStandardReqs(city_idx, building_type, 100, 1500, 300, 1000);break;
			case 'Theater':          reqs = t.checkStandardReqs(city_idx, building_type, 300, 2000, 400, 1000);break;
			case 'Sentinel':         reqs = t.checkStandardReqs(city_idx, building_type, 150, 1000, 300, 3000);break;
			case 'Factory':          reqs = t.checkStandardReqs(city_idx, building_type, 150, 1500, 1500, 500);break;
			case 'Fortress':         reqs = t.checkStandardReqs(city_idx, building_type, 200, 300, 100, 2500);break;
			case 'DragonKeep':       reqs = t.checkGoldReqs(city_idx, building_type, 400, 2500, 700, 1200, 1500);break;
			case 'Wall':             reqs = t.checkStandardReqs(city_idx, building_type, 3000, 1500, 500, 10000);break;
			case 'Mine':             reqs = t.checkStandardReqs(city_idx, building_type, 210, 600, 200, 500);break;
			case 'Farm':             reqs = t.checkStandardReqs(city_idx, building_type, 50, 300, 150, 200);break;
			case 'Lumbermill':       reqs = t.checkStandardReqs(city_idx, building_type, 100, 100, 300, 250);break;
			case 'Quarry':           reqs = t.checkStandardReqs(city_idx, building_type, 180, 500, 400, 150);break;
			case 'TrainingCamp':     reqs = t.checkGoldReqs(city_idx, building_type, 350, 1300, 600, 1900, 975);break;
			case 'Silo':             reqs = t.checkStandardReqs(city_idx, building_type, 250, 1200, 500, 1500);break;
			case 'EnergyCollector':  reqs = t.checkGoldReqs(city_idx, building_type, 100, 500, 200, 300, 500);break;
			case 'DarkPortal':       reqs = t.checkGoldReqs(city_idx, building_type, 250, 1200, 500, 1500, 2000);break;
			case 'Mausoleum':        reqs = t.checkGoldReqs(city_idx, building_type, 150, 500, 200, 200, 1000);break;
			case 'SpectralDragonKeep': reqs = t.checkGoldReqs(city_idx, building_type, 400, 2500, 700, 1200, 1500);break; /*by Wham*/
			}
			
			if (reqs.buildable === false) {
				if (t.current_tab === 2){
					try{
						$id(UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type]).innerHTML ='<font color="#C33">'+ reqs.msg.replace(/:\+/,':').replace(/\+\s*$/,'') +'</font>';
						$id(UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type]).title = translate(building_type) + ' ' + reqs.msg.replace(/\+/g,' \n');
						$id(UID['Tabs.Jobs.tabBuild.level_cap_' + city_idx +'_'+ building_type]).style.color = "#C33";
					}catch(e){}
				}
			} else {
				if (t.current_tab === 2){
					try{
						var fb_text = translate('Next level') + ' ' + translate('OK');
						$id(UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type]).innerHTML = fb_text;
						$id(UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type]).title = translate(building_type) + ' \n' + fb_text;
					}catch(e){}
				}
			}
		
			
			
		
			return reqs;
		} else {
			if (t.current_tab === 2){
				try{
					var fb_text = translate('Task Completed');
					$id(UID['Tabs.Jobs.tabBuild.feedback_'+ city_idx +'_'+ building_type]).innerHTML = '<font color=#0B0>'+ fb_text +'</font>';
					$id(UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type]).title = translate(building_type) + ' \n' + fb_text;
					$id(UID['Tabs.Jobs.tabBuild.level_cap_' + city_idx +'_'+ building_type]).style.color = '#060';
					
				}catch(e){}
			}
		}
		return false;
	},

	checkAgricultureReqs : function() {
		var t = Tabs.Jobs;
		var research_type = 'Agriculture';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 500 * Math.pow(2,research_level +1);
		var food = 250 * Math.pow(2,research_level + 1);
		var metal = 100 * Math.pow(2,research_level + 1);
		var farm_level = research_level + 1;
		var sciencecenter_level = research_level;          
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			food = seed_reqs.level[research_level + 1].resources['food'];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
			farm_level = seed_reqs.level[research_level + 1].buildings['Farm'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html +=  translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (t.getBuildingLevel(0, 'Farm', farm_level) === 0) html += translate('Farm') +': '+ farm_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret; 
	},

	checkWoodcraftReqs : function() {
		var t = Tabs.Jobs;
		var research_type = 'Woodcraft';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 1200 * Math.pow(2,research_level +1);
		var lumber = 500 * Math.pow(2,research_level + 1);
		var metal = 100 * Math.pow(2,research_level + 1);
		var lumbermill_level = research_level + 1;
		var sciencecenter_level = research_level;          
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			lumber = seed_reqs.level[research_level + 1].resources['wood'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
			lumbermill_level = seed_reqs.level[research_level + 1].buildings['Lumbermill'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (t.getBuildingLevel(0, 'Lumbermill', lumbermill_level) === 0) html += translate('Lumbermill') +': '+ lumbermill_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret; 
	},

	checkMasonryReqs : function() {
		var t = Tabs.Jobs;
		var research_type = 'Masonry';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 1500 * Math.pow(2,research_level +1);
		var stone = 500 * Math.pow(2,research_level + 1);
		var metal = 200 * Math.pow(2,research_level + 1);
		var quarry_level = research_level + 1;
		var sciencecenter_level = research_level;          
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			stone = seed_reqs.level[research_level + 1].resources['stone'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
			quarry_level = seed_reqs.level[research_level + 1].buildings['Quarry'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (t.getBuildingLevel(0, 'Quarry', quarry_level) === 0) html += translate('Quarry') +': '+ quarry_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret;
	},

	checkMiningReqs : function() {
		var t = Tabs.Jobs;
		var research_type = 'Mining';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 2000 * Math.pow(2,research_level +1);
		var metal = 800 * Math.pow(2,research_level + 1);
		var mine_level = research_level + 1;
		var sciencecenter_level = research_level;          
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
			mine_level = seed_reqs.level[research_level + 1].buildings['Mine'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (t.getBuildingLevel(0, 'Mine', mine_level) === 0) html += translate('Mine') +': '+ mine_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret;
	},

	checkClairvoyanceReqs : function() {
		var t = Tabs.Jobs;
		var research_type = 'Clairvoyance';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 2000 * Math.pow(2,research_level + 1);
		var food = 2400 * Math.pow(2,research_level + 1);
		var sciencecenter_level = research_level;          
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			food = seed_reqs.level[research_level + 1].resources['food'];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.gold < gold) html += translate('Wood') +': '+ (gold - city.resources.gold) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret; 
	},

	checkRapidDeploymentReqs : function() {
		var t = Tabs.Jobs;
		var research_type = 'RapidDeployment';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 600 * Math.pow(2,research_level + 1);
		var food = 3000 * Math.pow(2,research_level + 1);
		var sciencecenter_level = research_level;          
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			food = seed_reqs.level[research_level + 1].resources['food'];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.gold < gold) html += translate('Wood') +': '+ (gold - city.resources.gold) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret; 
	},

	checkBallisticsReqs : function() {
		var t = Tabs.Jobs;
		var research_type = 'Ballistics';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 5000 * Math.pow(2,research_level +1);
		var stone = 500 * Math.pow(2,research_level + 1);
		var metal = 600 * Math.pow(2,research_level + 1);
		var lumber = 800 * Math.pow(2,research_level + 1);
		var woodcraft_level = 4;
		var sciencecenter_level = research_level;          
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			stone = seed_reqs.level[research_level + 1].resources['stone'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			lumber = seed_reqs.level[research_level + 1].resources['wood'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
			woodcraft_level = seed_reqs.level[research_level + 1].research['Woodcraft'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (t.getCurrentResearchLevel('Woodcraft') < woodcraft_level) html += translate('Woodcraft') +': '+ woodcraft_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret;
	},

	checkMetallurgyReqs : function() {
		// Mining, science center, metalsmith, garrison, metals, food, lumber, stone, gold
		var t = Tabs.Jobs;
		var research_type = 'Metallurgy';
		var research_level = t.getCurrentResearchLevel(research_type);
		var food = 800 * Math.pow(2,research_level +1);
		var gold = 3500 * Math.pow(2,research_level +1);
		var stone = 200 * Math.pow(2,research_level + 1);
		var metal = 3000 * Math.pow(2,research_level + 1);
		var lumber = 150 * Math.pow(2,research_level + 1);
		var mining_level = research_level;
		var sciencecenter_level = research_level;  
		var metalsmith_level = research_level;
		var garrison_level = 2;        
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			food = seed_reqs.level[research_level + 1].resources['food'];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			stone = seed_reqs.level[research_level + 1].resources['stone'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			lumber = seed_reqs.level[research_level + 1].resources['wood'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
			metalsmith_level = seed_reqs.level[research_level + 1].buildings['Metalsmith'];
			garrison_level = seed_reqs.level[research_level + 1].buildings['Garrison'];
			mining_level = seed_reqs.level[research_level + 1].research['Mining'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (stone - city.resources.stone) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (t.getBuildingLevel(0, 'Metalsmith', metalsmith_level) === 0) html += translate('Metalsmith') +': '+ metalsmith_level +' + ';
		if (t.getBuildingLevel(0, 'Garrison', garrison_level) === 0) html += translate('Garrison') +': '+ garrison_level +' + ';
		if (t.getCurrentResearchLevel('Mining') < mining_level) html += translate('Mining') +': '+ mining_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret;
	},

	checkMedicineReqs : function() {
		var t = Tabs.Jobs;
		var research_type = 'Medicine';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 3600 * Math.pow(2,research_level +1);
		var food = 1500 * Math.pow(2,research_level + 1);
		var sciencecenter_level = research_level;          
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			food = seed_reqs.level[research_level + 1].resources['food'];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret; 
	},

	checkDragonryReqs : function() {
		// science center, rookery, gold, food, metals
		var t = Tabs.Jobs;
		var research_type = 'Dragonry';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 5000 * Math.pow(2,research_level +1);
		var food = 2500 * Math.pow(2,research_level + 1);
		var metal = 1000 * Math.pow(2,research_level + 1);
		var sciencecenter_level = research_level; 
		var rookery_level = research_level;         
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			food = seed_reqs.level[research_level + 1].resources['food'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
			rookery_level = seed_reqs.level[research_level + 1].buildings['Rookery'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (t.getBuildingLevel(0, 'Rookery', rookery_level) === 0) html += translate('Rookery') +': '+ rookery_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret; 
	},

	checkLevitationReqs : function() {
		// woodcraft, science center, gold, lumber, metals
		var t = Tabs.Jobs;
		var research_type = 'Levitation';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 5000 * Math.pow(2,research_level +1);
		var lumber = 2000 * Math.pow(2,research_level + 1);
		var metal = 2000 * Math.pow(2,research_level + 1);
		var sciencecenter_level = research_level + 1; 
		var woodcraft_level = research_level + 1;         
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			lumber = seed_reqs.level[research_level + 1].resources['wood'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
			woodcraft_level = seed_reqs.level[research_level + 1].research['Woodcraft'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (t.getCurrentResearchLevel('Woodcraft') < woodcraft_level) html += translate('Woodcraft') +': '+ woodcraft_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret; 
	},

	checkMercantilismReqs : function() {
		// levitation, science center, factory, gold, food, lumber, metals, stone
		var t = Tabs.Jobs;
		var research_type = 'Mercantilism';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 3500 * Math.pow(2,research_level +1);
		var food = 800 * Math.pow(2,research_level +1);
		var lumber = 150 * Math.pow(2,research_level + 1);
		var metal = 3000 * Math.pow(2,research_level + 1);
		var stone = 200 * Math.pow(2,research_level + 1);
		var sciencecenter_level = research_level + 1; 
		var factory_level = research_level + 1; 
		var levitation_level = research_level + 1;         
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			food = seed_reqs.level[research_level + 1].resources['food'];
			lumber = seed_reqs.level[research_level + 1].resources['wood'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			stone = seed_reqs.level[research_level + 1].resources['stone'];
			sciencecenter_level = seed_reqs.level[research_level + 1].buildings['ScienceCenter'];
			factory_level = seed_reqs.level[research_level + 1].buildings['Factory'];
			levitation_level = seed_reqs.level[research_level + 1].research['Levitation'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (metal - city.resources.stone) +' + ';
		if (t.getBuildingLevel(0, 'ScienceCenter', sciencecenter_level) === 0) html += translate('ScienceCenter') +': '+ sciencecenter_level +' + ';
		if (t.getBuildingLevel(0, 'Factory', factory_level) === 0) html += translate('Factory') +': '+ factory_level +' + ';
		if (t.getCurrentResearchLevel('Levitation') < levitation_level) html += translate('Levitation') +': '+ levitation_level +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}
		return ret;
	},

	checkAerialCombatReqs : function() {
		// dragonry, dragons keep, gold, food, dragon armor (items)
		var t = Tabs.Jobs;
		var research_type = 'AerialCombat';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 3500 * Math.pow(2,research_level +1);
		var food = 2500 * Math.pow(2,research_level +1);
		var dragonkeep_level = 8; 
		var dragonry_level = 8;
		var body_armor = 1;
		var claw_guards = 1;
		var dragon_helmet = 1;
		var tail_guard = 1;
		// Check for all 4 pieces of dragon armor ...         
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			food = seed_reqs.level[research_level + 1].resources['food'];
			dragonkeep_level = seed_reqs.level[research_level + 1].buildings['DragonKeep'];
			dragonry_level = seed_reqs.level[research_level + 1].research['Dragonry'];
			body_armor = seed_reqs.level[research_level + 1].items['GreatDragonBodyArmor'];
			claw_guards = seed_reqs.level[research_level + 1].items['GreatDragonClawGuards'];
			dragon_helmet = seed_reqs.level[research_level + 1].items['GreatDragonHelmet'];
			tail_guard = seed_reqs.level[research_level + 1].items['GreatDragonTailGuard'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (t.getBuildingLevel(0, 'DragonKeep', dragonkeep_level) === 0) html += translate('DragonKeep') +': '+ dragonkeep_level +' + ';
		if (t.getCurrentResearchLevel('Dragonry') < dragonry_level) html += translate('Dragonry') +': '+ dragonry_level +' + ';
		if (Seed.getItem('GreatDragonBodyArmor') === 0) html += translate('GreatDragonBodyArmor') + ': ' + body_armor +' + ';  
		if (Seed.getItem('GreatDragonClawGuards') === 0) html += translate('GreatDragonClawGuards') + ': ' + claw_guards +' + ';  
		if (Seed.getItem('GreatDragonHelmet') === 0) html += translate('GreatDragonHelmet') + ': ' + dragon_helmet +' + ';  
		if (Seed.getItem('GreatDragonTailGuard') === 0) html += translate('GreatDragonTailGuard') + ': ' + tail_guard +' + ';
		if (html.length === 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}

		return ret;
	},

		checkEnergyCollectionReqs : function() {
		// dragonry, dragons keep, gold, food, dragon armor (items)
		var t = Tabs.Jobs;
		var research_type = 'EnergyCollection';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 5000 * Math.pow(2,research_level +1);
		var food = 200 * Math.pow(2,research_level +1);
		var lumber = 400 * Math.pow(2,research_level + 1);
		var metal = 400 * Math.pow(2,research_level + 1);
		var stone = 400 * Math.pow(2,research_level + 1);
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			food = seed_reqs.level[research_level + 1].resources['food'];
			lumber = seed_reqs.level[research_level + 1].resources['wood'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			stone = seed_reqs.level[research_level + 1].resources['stone'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (metal - city.resources.stone) +' + ';
		if (html.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}

		return ret;
	},
	
		checkWarriorRevivalReqs : function() {
		// dragonry, dragons keep, gold, food, dragon armor (items)
		var t = Tabs.Jobs;
		var research_type = 'WarriorRevival';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 10000 * Math.pow(2,research_level +1);
		var food = 200 * Math.pow(2,research_level +1);
		var lumber = 400 * Math.pow(2,research_level + 1);
		var metal = 400 * Math.pow(2,research_level + 1);
		var stone = 200 * Math.pow(2,research_level + 1);
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			food = seed_reqs.level[research_level + 1].resources['food'];
			lumber = seed_reqs.level[research_level + 1].resources['wood'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			stone = seed_reqs.level[research_level + 1].resources['stone'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (metal - city.resources.stone) +' + ';
		if (html.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}

		return ret;
	},
	
		checkGuardianRevivalReqs : function() {
		// dragonry, dragons keep, gold, food, dragon armor (items)
		var t = Tabs.Jobs;
		var research_type = 'GuardianRevival';
		var research_level = t.getCurrentResearchLevel(research_type);
		var gold = 10000 * Math.pow(2,research_level +1);
		var food = 200 * Math.pow(2,research_level +1);
		var lumber = 400 * Math.pow(2,research_level + 1);
		var metal = 400 * Math.pow(2,research_level + 1);
		var stone = 200 * Math.pow(2,research_level + 1);
		var html = '';
		var n = 'L.' + (research_level+1) + ' : ';
		var city    = Seed.cities[0];

		try {
			var seed_reqs = Seed.requirements.research[research_type];
			gold = seed_reqs.level[research_level + 1].resources['gold'];
			food = seed_reqs.level[research_level + 1].resources['food'];
			lumber = seed_reqs.level[research_level + 1].resources['wood'];
			metal = seed_reqs.level[research_level + 1].resources['ore'];
			stone = seed_reqs.level[research_level + 1].resources['stone'];
		}
		catch(e){
			verboseLog('Building: ' + e.msg + ' Manifest not available, using defaults');
		}

		var ret = {researchable:false, msg:[]};
		var research_cap = t.getResearchCap(research_type);
		
		// If the building is capped, are we about to exceed the limit?
		if (research_level >= research_cap) html += translate('Capacity') +': '+ research_cap +' + ';
		if (city.resources.gold < gold) html += translate('Gold') +': '+ (gold - city.resources.gold) +' + ';
		if (city.resources.food < food) html += translate('Food') +': '+ (food - city.resources.food) +' + ';
		if (city.resources.wood < lumber) html += translate('Wood') +': '+ (lumber - city.resources.wood) +' + ';
		if (city.resources.ore < metal) html += translate('Ore') +': '+ (metal - city.resources.ore) +' + ';
		if (city.resources.stone < stone) html += translate('Stone') +': '+ (metal - city.resources.stone) +' + ';
		if (html.length == 0) {
			ret.researchable = true;
			ret.msg = '<b> '+ translate('Researching') + ': </b> ' + translate(research_type) +' ('+ (research_level + 1)+') ';
		}
		else {
			ret.researchable = false;
			ret.msg = n + html;
		}

		return ret;
	},

	checkResearchReqs : function ( research_type )
	{
		var t = Tabs.Jobs;
		var reqs;
		var level = t.getCurrentResearchLevel ( research_type );
		var cap = t.getResearchCap ( research_type );
		
		if ( level < cap ) 
		{
			switch ( research_type )
			{
			case 'Agriculture':     reqs = t.checkAgricultureReqs();     break;
			case 'Woodcraft':       reqs = t.checkWoodcraftReqs();       break;
			case 'Masonry':         reqs = t.checkMasonryReqs();         break;
			case 'Mining':          reqs = t.checkMiningReqs();          break;
			case 'Clairvoyance':    reqs = t.checkClairvoyanceReqs();    break;
			case 'RapidDeployment': reqs = t.checkRapidDeploymentReqs(); break;
			case 'Ballistics':      reqs = t.checkBallisticsReqs();      break;
			case 'Metallurgy':      reqs = t.checkMetallurgyReqs();      break;
			case 'Medicine':        reqs = t.checkMedicineReqs();        break;
			case 'Dragonry':        reqs = t.checkDragonryReqs();        break;
			case 'Levitation':      reqs = t.checkLevitationReqs();      break;
			case 'Mercantilism':    reqs = t.checkMercantilismReqs();    break;
			case 'AerialCombat':    reqs = t.checkAerialCombatReqs();    break;
			case 'EnergyCollection':reqs = t.checkEnergyCollectionReqs();break;
			case 'WarriorRevival':  reqs = t.checkWarriorRevivalReqs();  break;
			case 'GuardianRevival': reqs = t.checkGuardianRevivalReqs(); break;
			}

			if ( reqs.researchable === false ) 
			{
				if ( t.current_tab === 3 )
				{
					try{
						$id(UID['Tabs.Jobs.tabResearch.feedback_'+research_type]).innerHTML = '<font color=#C33>' + reqs.msg.replace(/:\+/,':').replace(/\+\s*$/,'') + '</font>';
						$id(UID['Tabs.Jobs.tabResearch.feedback_'+research_type]).title = translate(research_type) + ' ' + reqs.msg.replace(/\+/g,' \n');
						$id(UID['Tabs.Jobs.tabResearch.level_cap_' + research_type]).style.color = '#C33';
					}catch(e){}
				}
			} 
			else {
				if ( t.current_tab === 3 )
				{
					try{
						var fb_text = translate('Next level') + ' ' + translate('OK');
						$id(UID['Tabs.Jobs.tabResearch.feedback_'+research_type]).innerHTML = fb_text;
						$id(UID['Tabs.Jobs.tabResearch.feedback_'+research_type]).title = translate(research_type) + ' \n' + fb_text;
					}catch(e){}
				}
			}
			
			
			return reqs;
			
		}
		else {
			if ( t.current_tab === 3 )
			{
				try{
					var fb_text = translate('Task Completed');
					$id(UID['Tabs.Jobs.tabResearch.feedback_'+research_type]).innerHTML = '<font color=#0B0>'+ fb_text +'</font>';
					$id(UID['Tabs.Jobs.tabResearch.feedback_'+research_type]) = translate(research_type) + ' \n' + fb_text;
					$id(UID['Tabs.Jobs.tabResearch.level_cap_' + research_type]).style.color = '#060';
				}catch(e){}
			}
		}
		return false;

	},

	// The training heartbeat
	// Parameters:
	//      city_idx - the city number (0 = capitol, 1 = outpost 1, 2 = outpost 2
	//
	// Calls Seed.notifyOnUpdate() to find completed training jobs for the specified city
	// If the city number is the same as the number of cities, recurse with city number zero (the capitol)
	// This is weird, how would trainTick get called with city_idx = 3? If it does not, and city_idx really is 2, then 
	// there is a logic error: trainTick() should not recurse until it has finished calling () for
	// outpost 2
	// Also recurses (using setTimeout()) in three seconds if the call to getTrainJob() is not null. 
	// This happens if a training job already exists for the specified city. In this case, city_idx is incremented first.
	// Called from setTrainEnable() with a starting city of zero (capitol), attemptTrainShortQ() uses setTimeout() to call 
	// trainTick() in two different places. First, it uses it to prevent all the jobs from queueing immediately
	// but the logic is flawed on this because it calls loops calling getTrainJob(i) starting with the 
	// capitol city, but the loop ends prematurely if getTrainJob() finds an active job. In the second case, it 
	// uses setTimeout() to call trainTick() with the current city index if an one of the training jobs
	// does not meet the requirements. This will retry the job on the next tick (3 seconds).
	trainTick : function ( city_idx )
	{
		var t = Tabs.Jobs;

		if ( !Data.options.training.enabled ){
			return;
		}
		
		// Fix city_idx in case of wrong number, undefined or overflow
        if ( isNaN( city_idx ) || city_idx < 0 || city_idx >= Seed.cities.length ){
            city_idx = 0;
        }  
        
        // in case the city is not been defined in Seed.updateCity skip to next in array.
		if ( !Seed.cities[city_idx] )
		{
			t.trainTick( city_idx + 1 );
			return;
		}	
		//reset timer that triggered call to call again after 3 seconds passes per city/outpost.
		clearTimeout ( t.train_timer );
		t.train_timer = setTimeout( t.trainTick, 3000, city_idx + 1 );
		

		// The length here is the number of unit types it is possible to train
		units_length = t.city[city_idx].units_type.length;
		
		// Only check the job queue if we are in short queue mode
		
		// DISABLED min_resource because dont' work for now 
		//( If debug_mode is enabled, this condition works, if not, always run min_housing case )
		if ( !Data.options.debug_mode || Data.options.training.mode === 'min_housing' )
		{
			if ( getTrainJob( city_idx ) === null)
			{
				t.attemptTrainShortQ( city_idx, 0, units_length );
			}
			
		}
		else {
			t.attemptTrainLongQ( city_idx, 0, units_length );
		}
		
	},

	// New approach 07072011b
	// Calculate the completion time by examining the job record for any job running
	// While auto-build is enabled, this function is called on a 4 second timer
	// It resets the timer to 20 seconds if doBuild() has an error and fetches the Seed
	// to get updated information
	// It will turn off auto-build if the error count exceeds three
	build_tick : function ()
	{
		var t = Tabs.Jobs;

		if ( !Data.options.building.enabled ) {
			return;
		}
		
		clearTimeout ( t.build_timer );
		
		var recheck_build = false;
		var options={noPlayer:true};
		
		// Iterate over the cities for buildings in each
		for ( var city_idx=0; city_idx < Seed.cities.length; city_idx++ )
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city ) continue;
			
			var city_id = city.id;
			
			var job = getBuildJob (city_idx);
			
			// city not currently building
			if ( job === null )
			{
				// Yes, is there a job in persistent data in this city?
				for ( var i=0; i < Data.options.build_jobs.length; i++ )
				{
					if ( Data.options.build_jobs[i].city_id === city_id )
					{
						// We check three different modes of completion:
						// 1. the done flag
						// 2. the duration
						// 3. the run_at + duration compared to serverTime()
						if ( Data.options.build_jobs[i].done ||
							 !Data.options.build_jobs[i].duration ||
							 Data.options.build_jobs[i].run_at + Data.options.build_jobs[i].duration > serverTime()
							){
								Data.options.build_jobs.splice( i, 1 );
								if(!options.cities)
								{
									options.cities=[];
								}
								//if job not at capital city check capital city as well as outpost.
								if(city_idx !==0 )
								{
									options.cities.push(Seed.cities[0].id);
								}
								options.cities.push(city.id);
								Seed.fetchPlayer ( options ) ;
								t.build_timer = setTimeout ( t.build_tick, 10000 );
								return;
						}
					}
				}  
				
				// TBD: sort the array by building type and building level
				var build_order = []; // Concatenated array of buildings
				var build_list = [];
				for ( var name in Data.options.building.level_enable[city_idx] )
				{
					// Is this building type enabled for autobuild?
					if ( Data.options.building.level_enable[city_idx][name] )
					{
						build_list = Buildings.getList ( city_idx, name );
						build_list.sort ( function(a,b){return a.level-b.level} );
						build_order = build_order.concat ( build_list );
					}
				}
				build_order.sort ( function(a,b){return a.level-b.level} );
				
				// Change: we want to iterate over each buildings comparing the level to the cap. If the cap has not
				// been reached, call doBuild
				var built = false;
				
				for ( var i=0; i < build_order.length; i++ )
				{
					var reqs = t.checkBuildReqs( city_idx, build_order[i].type );
					if ( reqs )
					{
						if ( t.current_tab === 2 ) {
							t.dispFeedback (reqs.msg);
						}
						
						if ( reqs.buildable )
						{
							t.doBuild ( build_order[i], city );
							built = true;
							Data.options.build_jobs.push( build_order[i] );
							break;
						}
						else {
						
							// if is capped, remove from the list
							if ( reqs.isCapped ) {
								build_order.splice (i, 1 );
							}
							
							if ( t.current_tab === 2 ){
								t.dispFeedback ( build_order[i].type +' '+ reqs.msg );
							}
						}
					}
				}
				
				// If not started any Building, re-check the server data
				if( built === false && build_order.length )
				{
					recheck_build = true;
					if(!options.cities)
					{
						options.cities=[];
					}
					options.cities.push(city_id);
				}
				
			}
			else {
				// We have a job running
				// Look at the job record
				if ( job )
				{
					var found = false;
					// Look for the job in our persistent data
					for ( var i=0; i < Data.options.build_jobs.length; i++ )
					{
						if ( job.city_building_id === Data.options.build_jobs[i].city_building_id ) 
						{
							found = true;
						}   
					}
					// If the job is not in persistent data, put it there
					if ( !found )
					{
						Data.options.build_jobs.push( job );
						verboseLog('Putting build job in persistent data');
					}
					else {
						// Keep a consistent display                
						// var city_type = (city.type === 'Capital') ? 'Capital' : city.type;
						var bType = getBuildingById ( city_idx, job.city_building_id );
						var msg = translate('Building') + ': ' + translate(bType) + ' ' + translate('Level').toLowerCase() + ' ' + job.level +' '+ translate('at') + ' ' + translate(city.type);
						
						if ( t.current_tab === 2 ) {
							t.dispFeedback (msg);
						}
					}
				}
			}
		}
		
		if ( recheck_build )
		{
			Seed.fetchPlayer(options);
			
			t.build_timer = setTimeout ( t.build_tick, t.build_retry_time );
			
			if ( t.current_tab === 2 ) 
			{
				t.dispFeedback (translate('Completion errors') +': '+ translate('Waiting')+ ' '+ timeFormat(t.build_retry_time/1000) +' '+ translate('to try again')); 
			}
			
			// Increases the waiting time for next retry errors
			t.build_retry_time *= 1.5;
			
			return;              
		} 
		t.build_timer = setTimeout ( t.build_tick, 5000 );
	},

	// Research heartbeat
	researchTick : function ()
	{
		var t = Tabs.Jobs;
		
		if ( !Data.options.research.enabled ){
			return;
		}
		
		var recheck_research = false;
		var capital_id = Seed.cities[0].id;
		var job = getResearchJob ( 0 );
		
		// no research being done yet
		if ( job === null )
		{
			// Is there a research job in persistent data?
			for ( var i=0; i < Data.options.research_jobs.length; i++ )
			{
				if ( Data.options.research_jobs[i] )
				{
					if ( Data.options.research_jobs[i].done ||
						!Data.options.research_jobs[i].duration ||
						 Data.options.research_jobs[i].run_at + Data.options.research_jobs[i].duration > serverTime()
						){
							// Yes, has the job completed?
							Data.options.research_jobs.splice( i, 1 );
							Seed.fetchPlayer({cities:[capital_id]});
							clearTimeout ( t.research_timer );
							t.research_timer = setInterval ( t.researchTick, 5000 );
							return;
					}
				}
			}
			
			// TBD: sort the array by research type and research level
			var research_list = [];
			// Make the list
			
			// Because a 0 level research is not in Seed.player.research (by Didi)
			// and also Spectral Outpost research
			for ( var i=0; i < t.research_type.length; i++ )
			{
				var type = t.research_type[i];
				var player_research_level = ( Seed.player.research[type] !== undefined ? Seed.player.research[type] : 0 );
				if ( Data.options.research.level_enable[type] && 
					 Data.options.research.level_cap[type] > player_research_level
				   ){
					research_list.push( { type:type, level:player_research_level } );
				}
			}
			
			research_list.sort ( function(a,b){return a.level - b.level} );
			
			var rBuilt = false;
			var toResearch = 0;
			
			for ( var i=0; i < research_list.length; i++ )
			{
				var reqs = t.checkResearchReqs ( research_list[i].type );

				if ( reqs )
				{
					if ( reqs.researchable )
					{
						t.doResearch( research_list[i].type, research_list[i].level );
						rBuilt = true;
						Data.options.research_jobs.push( job );
						break;
					}
					else {
						if ( t.current_tab === 3 ) {
							t.dispFeedback (research_list[i].type +' '+ reqs.msg);
							++toResearch;
						}
					}
				}
				
			}
			
			// If not started any Research, re-check the server data
			if ( rBuilt === false && toResearch ) {
				recheck_research = true;
			}
			
		}
		else {
			// We have a job running
			// Look at the record
			if ( job )
			{
				var found = false;
				// Look for the job in persistent data
				for ( var i=0; i < Data.options.research_jobs.length; i++ )
				{
					// Check the job structure for a field called city_research_id or some such (like the building)
					// Otherwise, double-check that the ids match
					if ( Data.options.research_jobs[i] !== undefined && Data.options.research_jobs[i].id === job.id )
					{
						found = true;
					}
				}

				// If the job is not in persistent data, put it there
				if ( !found )
				{
					Data.options.research_jobs.push(job);
					verboseLog('Putting research job in persistent data');
				}
			}
		}
		
		if ( recheck_research )
		{
			Seed.fetchPlayer({cities:[capital_id]});
			
			clearTimeout ( t.research_timer );
			t.research_timer = setInterval ( t.researchTick, t.res_retry_time );
			
			if ( t.current_tab === 3 ) 
			{
				t.dispFeedback (translate('Completion errors')+ ': '+ translate('Waiting') +' '+ timeFormat(t.res_retry_time/1000) +' '+ translate('to try again'));
			}
			
			// Increases the waiting time for next retry errors
			t.res_retry_time *= 1.5;
		}
	},

	// Parameters: 
	//      city_idx - city index (0 = capitol, 1 = outpost 1, 2 = outpost 2)
	//      count - error count
	//      units_length - number of units to be queued in this city
	// Called from trainTick() and doTrain()
	// trainTick() calls attemptTrainShortQ() when a city (city_idx) has no jobs in the queue
	// doTrain() calls attemptTrainShortQ() after making the Ajax call and getting a succesful result
	// doTrain() also calls Seed.fetchCity() (before calling attemptTrainShortQ()) to ensure that the data is current
	// attemptTrainShortQ() will examine the training queues to determine when/if a new job should be sent to doTrain()
	//
	// Short queue training (minimum housing model)
	//
	attemptTrainShortQ : function ( city_idx, count, units_length )
	{
		var t = Tabs.Jobs;
		
		// Attempt to train if no jobs are in the queue already for the specified city
		// If any city has a job, set the recheck flag and reset the timer
		// This ensures that we will check every city and only after rechecking all of them will
		// we reset the timer if do_recheck is true
		// Each city may have jobs and we now allow them to execute asynchronously
		var do_recheck = false;
		if ( !getTrainJob ( city_idx ) )
		{
				// Get the unit types and quantities to build
				var options={noPlayer:true};
				
				for ( i=0; i < t.city[city_idx].units_type.length; i++ )
				{
					var unit_type = t.city[city_idx].units_type[i];
					var unit_quantity = Data.options.training.city[city_idx].units[unit_type];
					var cap = t.getUnitCap ( unit_type, unit_quantity );
					
					try {
						if ( cap )
						{
							unit_quantity = 0;
							if ( t.current_tab === 1 ) {
								t.dispFeedback(translate('Troops Capped'));
							}
							
							$id(UID['Tabs.Jobs.tabTrain.units_'+ city_idx +'_'+ i]).style.backgroundColor = '#faa';
						}
						else if ( $id(UID['Tabs.Jobs.tabTrain.units_'+ city_idx +'_'+ i]).style.backgroundColor === '#faa' )
						{
							$id(UID['Tabs.Jobs.tabTrain.units_'+ city_idx +'_'+ i]).style.backgroundColor = 'white';
						}
					}
					catch (e) {}
					
					if ( unit_quantity > 0 )
					{
						var reqs = t.checkTrainReqs( unit_type, unit_quantity, city_idx, count, units_length );

						if ( t.current_tab === 1 ) {
							t.dispFeedback (reqs.msg);
						}
						
						if ( reqs.trainable ) {
							t.doTrain( unit_type, unit_quantity, city_idx );
						}
						else {
							// Error condition prevents training, try again later
							if ( !options.cities )
							{
								options.cities=[];
							}
							options.cities.push( Seed.cities[city_idx].id );
							do_recheck = true;
							break;
						}
					}
				}
			}
		
		// by Lord Mimir
		if ( do_recheck )   
		{  
			verboseLog('attemptTrainShortQ do_recheck');  
			//due to lack of resources wait 4 seconds then check the next city.  
			clearTimeout ( t.train_timer );  
			t.train_timer = setTimeout ( t.trainTick, 4000, city_idx + 1);

			// once per cycle when on capital city reload city to get new resource levels.  
			// as the do_recheck only called when missing resources after checking all cities.  
			// when get back to capital city check the city then wait 5 minutes.  
			// 4 minutes 50 seconds after call it reloads capital city. then 10 seconds latter   
			// the next city is checked.  
			if(city_idx == 0)  
			{  
				setTimeout( Seed.fetchPlayer, 290000, options);  
				//due to lack of resources wait 5 minutes then check for next city.  
				clearTimeout ( t.train_timer );  
				t.train_timer = setTimeout ( t.trainTick, 300000, city_idx + 1);  
			}  
		}
	},

	// Parameters: 
	//      city_idx - city index (0 = capitol, 1 = outpost 1, 2 = outpost 2)
	//      count - error count
	//      units_length - number of units to be queued in this city
	// Called from trainTick() and doTrain()
	// trainTick() calls attemptTrainLongtQ() when a city (city_idx) has no jobs in the queue
	// doTrain() calls attemptTrainLongtQ() after making the Ajax call and getting a succesful result
	// doTrain() also calls Seed.fetchCity() (before calling attemptTrainShortQ()) to ensure that the data is current
	//
	// Long queue training (minimum resource levels model)
	//
	attemptTrainLongQ : function ( city_idx, count, units_length )
	{
		var t = Tabs.Jobs;
		
		// Attempt to train if no jobs are in the queue already for the specified city
		// If any city has a job, set the recheck flag and reset the timer
		// This ensures that we will check every city and only after rechecking all of them will
		// we reset the timer if do_recheck is true
		// Each city may have jobs and we now allow them to execute asynchronously
		var do_recheck = false;
		var options={noPlayer:true};
			// Get the unit types and quantities to build
			for ( i=0; i < t.city[city_idx].units_type.length; i++) 
			{
				var unit_type = t.city[city_idx].units_type[i];
				var unit_quantity = Data.options.training.city[city_idx].units[unit_type];
				var cap = t.getUnitCap(unit_type, unit_quantity);
				
				try {
					if ( cap )
					{
						unit_quantity = 0;
						if ( t.current_tab === 1 ) {
							t.dispFeedback(translate('Troops Capped'));
						}
						$id(UID['Tabs.Jobs.tabTrain.units_'+ city_idx +'_'+ i]).style.backgroundColor = '#faa';
					}
					else if ( $id(UID['Tabs.Jobs.tabTrain.units_'+ city_idx +'_'+ i]).style.backgroundColor === '#faa' )
					{
						$id(UID['Tabs.Jobs.tabTrain.units_'+ city_idx +'_'+ i]).style.backgroundColor = 'white';
					}
				}
				catch (e) {}
				
				if ( unit_quantity > 0 )
				{
					var ret = t.checkTrainReqs( unit_type, unit_quantity, city_idx, count, units_length );
					
					if ( t.current_tab === 1 ) {
						t.dispFeedback (ret.msg);
					}
					
					if ( ret.trainable )
					{
						t.train_jobs.push ({
							unit_type		: unit_type, 
							unit_quantity	: unit_quantity, 
							city_idx		: city_idx, 
							units_length	: units_length
						});
						//t.trainTime = setTimeout ("t.doTrain(unit_type, unit_quantity, city_idx, units_length)", 3000);
					}
					else {
						// Error condition prevents training, try again later
						if ( !options.cities )
						{
							options.cities = [];
						}
						options.cities.push( Seed.cities[city_idx].id );
						do_recheck = true;
						break;
					}
				} 
			}
		
		// by Lord Mimir
		if ( do_recheck )   
		{  
			verboseLog('attemptTrainLongQ do_recheck');  
			//due to lack of resources wait 4 seconds then check the next city.  
			clearTimeout ( t.train_timer );  
			t.train_timer = setTimeout ( t.trainTick, 4000, city_idx + 1);

			// once per cycle when on capital city reload city to get new resource levels.  
			// as the do_recheck only called when missing resources after checking all cities.  
			// when get back to capital city check the city then wait 5 minutes.  
			// 4 minutes 50 seconds after call it reloads capital city. then 10 seconds latter   
			// the next city is checked.  
			if(city_idx == 0)  
			{  
				setTimeout( Seed.fetchPlayer, 290000, options);  
				//due to lack of resources wait 5 minutes then check for next city.  
				clearTimeout ( t.train_timer );  
				t.train_timer = setTimeout ( t.trainTick, 300000, city_idx + 1);  
			}  
		}
		
		// See if we have space in the queue before we try to run the jobs
		var queue_length = 0;
		for ( var city_idx=0; city_idx < Seed.cities.length; city_idx++ )
		{
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !Seed.cities[city_idx] ) continue;
			
			queue_length += t.getRemainingQueue(city_idx, 'units');
		}
		
		if ( queue_length ) {
			t.runJobs();
		}
	},

	// Algorithm change
	// Examine the training queue for the city, if there is space, run the job
	// Possible side effects are implied prioritization based on queue availability
	// and speed of training
	runJobs : function()
	{
		var t = Tabs.Jobs;
		if ( t.train_jobs.length > 0 )
		{
			// Create a set of training jobs in each city
			for ( var city_idx=0; city_idx < Seed.cities.length; city_idx++ )
			{
				// in case the city is not been defined in Seed.updateCity skip to next in array.
				if ( !Seed.cities[city_idx] ) continue;
				
				var jobs_list = []; // list of units for this city
				
				// Iterate the training list looking for all the units from this city
				// Could be none up to every unit type available
				// Might be a problem if the user selects all the units but doesn't have
				// enough garrisons/training camps to do them all at once
				
				for ( var i=0; i < t.train_jobs.length; i++ )
				{
					if ( t.train_jobs[i].city_idx === city_idx )
					{
						jobs_list[i] = t.train_jobs[i];
					}
				}

				// Get the remaining queue length for this city        
				var queue_length = t.getRemainingQueue(city_idx, 'units');
				
				// Are there enough queue slots for the jobs?
				var len = jobs_list.length; // length is modified inside the loop
				if ( queue_length >= len )
				{
					// Yes, do the job
					for ( var i=0; i < len; i++ )
					{
						var job = jobs_list.shift();
						t.doTrain ( job.unit_type, job.unit_quantity, city_idx );
					}
				}
				// Remove this city's job set from the training list
				t.train_jobs.splice( 0, len );
			}
			
			setTimeout( t.runJobs, 3000);
		}
	},

	// Queue the training job
	// Parameters:
	//      unit_type - Porter, Conscript, etc.
	//      unit_quantity - number of units to train
	//      city_idx - city index (0=capitol, 1=outpost 1, 2 = outpost 2)
	//      count - error count
	//      units_length - number of unit types
	// Calls MyAjax.unitTraining with city unit type, quantity, city id, and a function for the rslt
	// The rlst function fetches the city, does a status update through statTick
	// If the rslt is ok, we set the Train Tab errorCount back to zero, log the training, increment the count (why?)
	// and attempt to train more units - this seems like it should come from trainTick() instead being called directly here
	// If the rslt is not ok, we refetch the city info, log the error, increment the Train Tab errorCount (if we have more than
	// three errors we disable training and show the feedback) and display the error message, reset the training time for 20 seconds
	// but do not disable training
	doTrain : function ( unit_type, unit_quantity, city_idx )
	{
		var t = Tabs.Jobs;
		var city = Seed.cities[city_idx];
		var msg = translate('Training') + ': (' + unit_quantity +') '+ translate(unit_type) +' '+ translate('at') +' '+ translate(city.name);
		//t.dispFeedback (msg);

		MyAjax.unitTraining ( unit_type, unit_quantity, city.id, function (r){
		
			clearTimeout ( t.train_timer );
		
			if ( r.ok )
			{
				t.train_errors = 0;
				
				actionLog (msg);

				// Go to next train (the delay is for simulate the action of a user by hand)
				t.train_timer = setTimeout( t.trainTick, Math.randRange(7000, 13000), city_idx+1 );
			} 
			else {
				//Seed.fetchPlayer();
				verboseLog ('Error: Training: ' + r.errmsg);
				
				actionLog (translate('Error')+' '+translate('Training') + ': ' + r.errmsg);

				// The queue is frequently full, but we could be getting server errors (500) too
				// Wait a couple of minutes
				if ( ++t.train_errors > 5 )
				{
					if ( t.current_tab === 1 ) {
						t.dispFeedback (translate('Too many errors, disabling auto training'));
					}
					t.setTrainEnable ( false );
					t.train_errors = 0;
				}
				else {
					if ( t.current_tab === 1 ) {
						t.dispFeedback (translate('Error')+' '+translate('Training') +': '+ r.errmsg);
					}
					// Wait and try again
					t.train_timer = setTimeout( t.trainTick, t.train_retry_time, city_idx );

					// Increases the waiting time for next retry errors
					t.train_retry_time *= 1.5;
				}
			}
			
			// By Lord Mimir
			/** Get the units being built so the will be displayed
			*  The units.json has the city the training happen at as part of the response
			*  so no need to call it just use the info sent
			*/
			Seed.updateCity ( r.dat.result.city );  
			// Get capital city to show new resources  
			/* Also the SWF app. calls the capital city after the march to get the new resource levels */
			if(r.dat.result.city.id  !== Seed.cities[0].id)  
			{  
				Seed.fetchCity (Seed.cities[0].id);  
			}
		});
	},

	// Upgrade the building
	// Sets recheck_build = true if the MyAjax call returns an error
	// This forces a Seed fetch and resets the build_tick timer to 20 seconds
	// to allow the server enough time to return valid data (we hope)
	// If the MyAjax call returns with no errors, the build_errors is reset to zero
	doBuild : function ( building, city )
	{
		var t = Tabs.Jobs;
		//var city_type = (city.type === 'Capital') ? 'Capital' : city.type;
		var msg = translate('Building')+ ': ' + translate(building.type) +' '+ translate('Level').toLowerCase() + ' ' + (building.level+1) +' '+ translate('at') +' '+ translate(city.name);
		
		if ( t.current_tab === 2 ) {
			t.dispFeedback ( msg );
		}
		
		MyAjax.buildingUpgrade ( city.id, building.id, function (r){
			//debugLog ('BUILD RESULT: '+ inspect (r, 7, 1)); 
			if ( r.ok )
			{
				t.build_errors = 0;
				actionLog (msg);
				clearTimeout ( t.build_timer );
				t.build_timer = setTimeout ( t.build_tick, 4000 );
				return;
			} 
			else {//Just call the city that failed
				Seed.fetchPlayer({cities:[city.id]});
				actionLog (building.type + ': ' + r.errmsg);
				if ( ++t.build_errors > 5 )
				{
					if ( t.current_tab === 2 ) {
						t.dispFeedback (translate('Too many errors, disabling auto-build'));
					}
					t.setBuildEnable ( false );
					t.build_errors = 0;
					return;
				}
				
				if ( t.current_tab === 2 ) {
					t.dispFeedback (translate(building.type) + ': ' + r.errmsg);
				}
				clearTimeout( t.build_timer );
				t.build_timer = setTimeOut ( t.build_tick, t.build_retry_time );
				//t.recheck_build = true;
				return;
			}
		});
	},

	doResearch : function ( research_type, research_level )
	{
		var t = Tabs.Jobs;
		var city = Seed.cities[0];
		var msg = '<b>' + translate('Researching') +': </b> '+ translate(research_type) + ' ('+ (research_level+1) +') ';
	
		if ( t.current_tab === 3 ) {
			t.dispFeedback (msg);
		}

		actionLog(translate('Research Started')+': '+ translate(research_type) + ' ('+ (research_level+1) +') ');
		
		MyAjax.researchStart ( city.id, research_type, function (r){
			
			//debugLog ('RESEARCH RESULT: '+ inspect (r, 7, 1));       
			if ( r.ok ) 
			{
				t.research_errors = 0;
				actionLog (msg);
				return;
			} 
			//just get player and capital city as that where research is handled.
			else { 
				Seed.fetchPlayer({cities:[city.id]});
				actionLog (translate('Research Error').toUpperCase()+ ': ' + r.errmsg);
				if ( ++t.research_errors > 5 )
				{
					if ( t.current_tab === 3 ) {
						t.dispFeedback (translate('Too many errors, disabling auto-research'));
					}
					t.setResearchEnable ( false );
					t.research_errors = 0;
					return;
				}
				
				if ( t.current_tab === 3 ) {
					t.dispFeedback (translate(research_type) + ': ' + r.errmsg);
				}
				//t.recheck_research = true;
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
	tab_order	: OPTIONS_TAB_ORDER,
	tab_label	: 'Options',
	tab_disabled	: !OPTIONS_TAB_ENABLE,
	
	$container	: null,

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

		try {      
			html = '<div class=' + UID['title'] + ' style="margin-bottom:10px">'+ translate('Options') +'</div>'
			+'<table>'
			+'	<tr valign=top>'
			+'		<td><b>' + translate('Game Options') + ': </b></td>'
			+'	</tr>'
			+'	<tr valign=top>'
			+'		<td>'
			+'		<label>'
			+'		<input id=' + setUID('Tabs.Options.collect') + ' type=checkbox /> ' + translate('Auto-Collection of Resources')
			+'		</label> '
			+'		<input id=' + setUID('Tabs.Options.collect_delay') + ' size=1 maxlength=2 type=text value="' + Data.options.auto_collect.delay + '" />'
			+'		<select id=' + setUID('Tabs.Options.collect_unit') + ' size=1>'
			+'			<option value=60 ' + sel_Unit[0] + '>' + translate('Minutes') + '</option>'
			+'			<option value=3600 ' + sel_Unit[1] + '>' + translate('Hours') + '</option>'
			+'			<option value=86400 ' + sel_Unit[2] + '>' + translate('Days') + '</option>'
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
			+'		<label><input id=' + setUID('Tabs.Options.drag_window') + ' type=checkbox /> ' + translate('Enable') +' '+ translate('Window drag') + '</label>'
			+'		</td>'
			+'	</tr><tr valign=top>'
			+'		<td>'
			+'		<label><input id=' + setUID('Tabs.Options.verbose_log') + ' type=checkbox /> ' + translate('Enable') +' '+ translate('Verbose logging') + '</label>'
			+'		</td>'
			+'	</tr>'
			+'	<tr valign=top>'
			+'		<td>'
			+'		<label><input id=' + setUID('Tabs.Options.auto_refresh') + ' type=checkbox /> ' + translate('Enable') +' '+ translate('Auto Refresh every') + '</label>'
			+'		<select id=' + setUID('Tabs.Options.auto_refresh_delay') + ' size=1>'
			+'			<option value=10 ' + sel_auto_refresh[0] + '>10</option>'
			+'			<option value=15 ' + sel_auto_refresh[1] + '>15</option>'
			+'			<option value=20 ' + sel_auto_refresh[2] + '>20</option>'
			+'			<option value=25 ' + sel_auto_refresh[3] + '>25</option>'
			+'		</select> ' + translate('Minutes') + ' ' + translate('of inactivity')
			+'		</td>'
			+'	</tr>'
			+'	<tr valign=top>'
			+'		<td><br>'
			+'		<label>' + translate('Delete') + ' ' + translate('Permanent Data') + ': <input id=' + setUID('Tabs.Options.clear_storage') + ' type=button value="' + translate('Delete') + '" /></label>'
			+'		</td>'
			+'	</tr>'
			+'</table>'
			+'<br><HR>'
			+'<table>'
			+'	<tr valign=top>'
			+'		<td>'
			+'		<label><input id=' + setUID('Tabs.Options.refresh') + ' type=button value="' + translate('Refresh') + '" /></label>'
			+'		</td>'
			+'	</tr>'
			+'</table>'
			+'<br><HR>';
			
			t.$container.html( html );
			
			t.checkboxChange(UID['Tabs.Options.collect'], Data.options.auto_collect.enabled, AutoCollect.setEnable);
			
			$J('#'+UID['Tabs.Options.collect_delay']).change ( onChangeTime );
			$J('#'+UID['Tabs.Options.collect_unit']).change ( onChangeUnit );
			
			t.checkboxChange( UID['Tabs.Options.drag_window'], Data.options.main_box.draggable, onChangeDrag );
			t.checkboxChange( UID['Tabs.Options.verbose_log'], Data.options.verbose_log.enabled, VerboseLog.setEnable );
			
			t.checkboxChange( UID['Tabs.Options.auto_refresh'], Data.options.auto_refresh.enabled, AutoRefresh.setEnable );
			
			$J('#'+UID['Tabs.Options.auto_refresh_delay']).change ( onChangeRefreshDelay );
			
			$J('#'+UID['Tabs.Options.clear_storage']).click ( onClickClearStorage );
			
			$J('#'+UID['Tabs.Options.refresh']).click ( onClickRefreshData );
			
		} catch (e) {
			t.$container.html( '<PRE>'+ e.name +' : '+ e.message +'</pre>' );
		}
		
		
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
		
		function onChangeDrag ( state )
		{
			Data.options.main_box.draggable = state;
			$main_box.option( 'draggable', state );
		}
		
		function onClickClearStorage () 
		{
			dialogBox({
				id		  : setUID('dialog-confirm'),
				centerTo  : t.$container,
				title	  : translate('Delete') + ' ' + translate('Permanent Data'),
				html	  : '<br>' + translate('Are you sure you want to') +' '+ translate('delete') +'<br>'+ translate('All') + ' ' + translate('Permanent Data') + '?',
				buttons   : [
					{
						text: translate('Ok'),
						click: function() { 
							Data.clearStorage(); 
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
			Seed.fetchPlayer();  
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
		+'	<li class="tab first"><a id=' + setUID('Tabs.Logs.tabActions') + '>' + translate('Actions')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabVerbose') + '>' + translate('Console')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabDebug')   + '>' + translate('Debug')      + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabStats')   + '>' + translate('Statistics') + '</a></li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Logs.title') + ' class=' + UID['title'] + '>' + translate('Action Log') + '</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto;">'
		+'	<table id=' + setUID('Tabs.Logs.actions') + ' class=' + UID['table_console'] + ' cellspacing=1>'
		+'	<tr>'
		+'		<td class=' + UID['underline'] + '></td>'
		+'		<td class=' + UID['underline'] + ' width=95%></td>'
		+'	<tr>'
		+'	</table>'
		+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto;">'
		+'	<table id=' + setUID('Tabs.Logs.verbose') + ' class=' + UID['table_console'] + ' cellspacing=1>'
		+'	<tr>'
		+'		<td class=' + UID['underline'] + '></td>'
		+'		<td class=' + UID['underline'] + ' width=95%></td>'
		+'	<tr>'
		+'	</table>'
		+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto;">'
		+'	<table id=' + setUID('Tabs.Logs.debug') + ' class=' + UID['table_console'] + ' cellspacing=1>'
		+'	<tr>'
		+'		<td class=' + UID['underline'] + '></td>'
		+'		<td class=' + UID['underline'] + ' width=95%></td>'
		+'	<tr>'
		+'	</table>'
		+'</div>'
		+'<div>'
		+'	<center>'
		+'	<table id=' + setUID('Tabs.Logs.stats') + ' class="' + UID['table'] + ' ' + UID['table_console'] + '" border=1 cellspacing=1 width=97%>'
		+'	</table>'
		+'	</center>'
		+'</div>';
		
		t.$container.html( html );
		
		t.content.push( $id(UID['Tabs.Logs.actions']) );
		$J('#'+UID['Tabs.Logs.tabActions']).click ( t.tabActions );
		
		t.content.push( $id(UID['Tabs.Logs.verbose']) );
		$J('#'+UID['Tabs.Logs.tabVerbose']).click ( t.tabVerbose );
		
		t.content.push( $id(UID['Tabs.Logs.debug']) );
		$J('#'+UID['Tabs.Logs.tabDebug']).click ( t.tabDebug );

		t.content.push( $id(UID['Tabs.Logs.stats']) );
		$J('#'+UID['Tabs.Logs.tabStats']).click ( t.tabStats );
		
		if ( Data.options.verbose_log.enabled === false )
		{
			$J('#'+UID['Tabs.Logs.tabVerbose']).hide();
			$J(t.content[1].parentNode).hide();
		}
		
		
		
		if ( DEBUG_TAB_ENABLE === false ) { 
			
			// Add debug log (by Didi)
			$J('#'+UID['Tabs.Logs.tabDebug']).hide();
			$J(t.content[2].parentNode).hide();
			
			// Add Stats Requests log (by Didi)
			$J('#'+UID['Tabs.Logs.tabStats']).hide();
			$J(t.content[3].parentNode).hide();
		}
		
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
		
		t.tabActions();
		
	},
	
	tabDebugToggle : function()
	{
		var t = Tabs.Logs;
	
		$J('#'+UID['Tabs.Logs.tabDebug']).toggle();
		$J(t.content[2].parentNode).toggle();
		$J('#'+UID['Tabs.Logs.tabStats']).toggle();
		$J(t.content[3].parentNode).toggle();
	},

	tabActions : function ()
	{
		var t = Tabs.Logs;

		$J('#'+UID[t.last_subtab])
		.css('z-index','0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Logs.tabActions'])
		.css('z-index','1')
		.addClass('selected');
		
		t.last_subtab = 'Tabs.Logs.tabActions';

		$J(t.content[0]).parent().show();
		$J(t.content[1]).parent().hide();
		$J(t.content[2]).parent().hide();
		$J(t.content[3]).parent().hide();
		
		clearTimeout(t.stats_timer);
		
		t.title.innerHTML = translate('Action Log');

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
		
		$J(t.content[0]).parent().hide();
		$J(t.content[1]).parent().show();
		$J(t.content[2]).parent().hide();
		$J(t.content[3]).parent().hide();
		
		clearTimeout(t.stats_timer);
		
		t.title.innerHTML = translate('Console Log');
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

		$J(t.content[0]).parent().hide();
		$J(t.content[1]).parent().hide();
		$J(t.content[2]).parent().show();
		$J(t.content[3]).parent().hide();
		
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
		
		$J(t.content[0]).parent().hide();
		$J(t.content[1]).parent().hide();
		$J(t.content[2]).parent().hide();
		$J(t.content[3]).parent().show();
		
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
		var perHour = Data.requests.msg_read.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Read Report')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.msg_read.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.msg_read.errors + '</TD>'
			 + '</TR>';
			 
		// Reports Delete
		var perHour = Data.requests.msg_delete.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Delete')+' '+translate('Reports')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.msg_delete.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.msg_delete.errors + '</TD>'
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
		   + '	<td class=right align=right>'+ translate('Start Date') +' : </td>'
		   + '	<TD colspan=3>'+ new Date(Data.requests.start_at * 1000).myString() + '</TD>'
		   + '</TR>'
		   + '<TR>'
		   + '	<td class=right align=right>'+ translate('Run Time') +' : </td>'
		   + '	<TD colspan=3>'+ timeFormat(Data.requests.run_time, true) + '</TD>'
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

	hide : function () {
		var t = Tabs.Logs;
		clearTimeout(t.stats_timer);
	},

	show : function () {
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
			t.content[n].deleteRow(0);
		}
		
		var row = t.content[n].insertRow ( -1 );
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
		if ( Tabs.Logs.tab_disabled ) {
			return;
		}

		var t = Tabs.Logs;
		var n = to ? to : 0;
		var ts = new Date().toTimeString().substring (0,8);

		t._addRow ( msg, ts, to );

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
	if ( DEBUG_TAB_ENABLE ) {
		Tabs.Logs.addMsg(msg.replace(/\n/g, '<br/>'), 2);
	}
}

function verboseLog ( msg ) 
{
	if ( Data.options.verbose_log.enabled ) {
		Tabs.Logs.addMsg( msg, 1 );
	}
}
// END Tabs.Logs


//******************************** DEBUG Tab *****************************
// No need to translate the DEBUG tab
Tabs.Debug = {
	tab_order    : DEBUG_TAB_ORDER,
	tab_label    : 'Debug',
	tab_disabled : !DEBUG_TAB_ENABLE,
	container   : null,

	init : function (div){
		var t = Tabs.Debug;
		t.container = div;
		t.mouseElement = div;
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
			+ '<input type=button value="All Terrains.last to null" id="'+setUID('tabsDebug_BTN_LastNull')+'" /><br><br>'
			+ '<input type=button value="Check reports" id="'+setUID('tabsDebug_BTN_Reports')+'" /><br><br>'
			+ '<input type=button value="Persistant Data" id="'+setUID('tabsDebug_BTN_Data')+'" /><br><br>'
			+ '<input type=button value="Scripts" id="'+setUID('tabsDebug_BTN_Scripts')+'" /><br><br>'
			+ '<br>Missing Reports:<span id="'+setUID('tabsDebug_MissRep')+'"></span> &nbsp; <input id="'+setUID('tabsDebug_BTN_Reset')+'" type=button value="RESET" />';
		
		div.innerHTML = html;
		
		$J('#'+UID['tabsDebug_BTN_Unescape']).click (t.unescape);
		$J('#'+UID['tabsDebug_BTN_SeedPlayer']).click (t.seedPlayer);
		$J('#'+UID['tabsDebug_BTN_SeedCities']).click (t.seedCities);
		$J('#'+UID['tabsDebug_BTN_SeedJobCity']).click (t.seedJobsCity);
		$J('#'+UID['tabsDebug_BTN_SeedMarches']).click (t.seedMarches);
		$J('#'+UID['tabsDebug_BTN_SeedBuildings']).click (t.seedBuildings);
		$J('#'+UID['tabsDebug_BTN_LastNull']).click (t.setLastNull);
		$J('#'+UID['tabsDebug_BTN_ClearMap']).click (t.clearMap);
		$J('#'+UID['tabsDebug_BTN_Reports']).click (t.readReports);
		$J('#'+UID['tabsDebug_BTN_Scripts']).click (t.dispScripts);
		$J('#'+UID['tabsDebug_BTN_Data']).click (t.dispData);
		$J('#'+UID['tabsDebug_BTN_Reset']).click (function(){
			Data.options.messages.missing=0; 
			t.showMissingReports()
		});

		t.showMissingReports ();
	},

	show : function (){
		
	},
	hide : function (){
	},
	
	unescape : function (div){
		var t = Tabs.Debug;
		var esc = $id(UID['tabsDebug_TA_Unescape']);
		esc.value = unescape (esc.value);
	},
	
	seedBuildings : function (){
		var t = Tabs.Debug;
		t.dispBuildings ('Seed.cities.capital.buildings', Seed.cities[0].buildings);
		for ( var city_idx = 1; city_idx < Seed.cities.length; city_idx++ )
		{
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !Seed.cities[city_idx] ) continue;
		
			t.dispBuildings ('Seed.cities.outpost.buildings', Seed.cities[city_idx].buildings);
		}
	},

	dispScripts : function (){
		var t = Tabs.Debug;
	
		var dialogbox = dialogBox({
			id		: setUID('dialog-debug'),
			width	: 900,
			height	: 700,
			centerTo: t.container,
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
	},  
	
	dispBuildings : function (msg, buildings){
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
	},

	showMissingReports : function (){
		var t = Tabs.Debug;
		$id(UID['tabsDebug_MissRep']).innerHTML = Data.options.messages.missing;
		setTimeout (t.showMissingReports, 2000);
	},

	readReports : function (){
		Messages.checkMessages({category:'reports'});
	},
	
	seedPlayer : function (){
		debugLog (inspect (Seed.player, 8, 1));
	},
	
	seedCities : function (){
		debugLog (inspect (Seed.cities, 8, 1));
	},
	
	seedJobsCity : function (){
		var now = parseInt(serverTime());
		for (var c in Seed.jobs)
			debugLog ('Seed.jobs['+ c +'] (city #'+ Seed.city_idx[c] +') now='+ now +':\n'+ inspect (Seed.jobs[c], 8, 1));
	},
	
	seedMarches : function (){
		var now = parseInt(serverTime());
		var msg = '***** Seed.marches: *****  (now='+ parseInt(serverTime())+')\n';
		for (var id in Seed.marches){
			var march = Seed.marches[id];

			msg += 'OWNER: '+  march.owner_id +' ID: '+ march.id +' '+ march.status +' '+ march.x +','+ march.y +' '+ march.run_at +'('+ (march.run_at-now)  +') '+ march.duration +'\n';
		}
		debugLog (msg);
	},

	dispData : function (){
		if ( Data.itemList === undefined ) {
			Data.itemList = ['marches'];
		}

		var html = '';
		for (var name in Data.itemsList){
			html += '***** Data.'+ Data.itemsList[name] +':\n'+ inspect (Data[Data.itemsList[name]], 12, 1);
		}
		debugLog (html);
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
				/*Fog			:[],*/
				City		:[],
				Outpost		:[],
				Wildernesses:[]
			},
			radius : 14,
			x:Seed.cities[0].x, 
			y:Seed.cities[0].y,
			targets: []
		};
	},
	
	setLastNull : function (){
		for (var type in Data.map.terrains) {
			for (var i=0; i<Data.map.terrains[type].length; i++) {
				(Data.map.terrains[type])[i].lst = 0;
			}
		}
	},

} // END Tabs.Debug
//**********************************************************************************





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
				text: translate('Ok'),
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
		minWidth	: options.minWidth||150,
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


var tabManager = {
	tabList : {},           // {name, obj, div}
	current_tab : null,

	init : function (mainDiv){
		var t = tabManager;
		var sorter = [];
		for (k in Tabs){
			if (!Tabs[k].tab_disabled){
				t.tabList[k] = {};
				t.tabList[k].name = k;
				t.tabList[k].uid = setUID('tab_' + k);
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
		html += '<li class="tab first"><a id='+ sorter[0][1].uid +'>'+ sorter[0][1].label +'</a></li>';
		for (var i=1; i<sorter.length; i++)
			html += '<li class=tab><a id='+ sorter[i][1].uid +'>'+ sorter[i][1].label +'</a></li>';
		html += '</ul>';

		$main_box.html(html);
		
		t.current_tab = null;
		for (k in t.tabList) {
			if (t.tabList[k].name === Data.options.current_tab)
				t.current_tab = t.tabList[k] ;
				
			$J('#'+t.tabList[k].uid).click(this.e_clickedTab);

			var div = t.tabList[k].div;
			div.className = 'container';
			div.style.display = 'none';
			mainDiv.append(div);
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
		var t = tabManager;
		t.current_tab.obj.hide();
	},

	showTab : function (){
		var t = tabManager;
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
		var t = tabManager;
		for (k in t.tabList)
			if (t.tabList[k].uid === event.target.id) {
				var newTab = t.tabList[k];
				break;
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
	title	: translate('Charging') + ' v'+ (SCRIPT_VERSION.match(/\d+?[a-z]/)[0]||'') + ' ...',
	html	: '<br><div id='+setUID('startup-progressbar')+'></div><br>' + translate('Charging') + '...',
	close	: function(event, ui){
		clearTimeout(STARTUP_TIMER);
	}
});

StepTimeBar.start({ target:$J('#'+UID['startup-progressbar']), steps:4, delay:SCRIPT_STARTUP_DELAY*3 });

setTimeout ( scriptStartUp, SCRIPT_STARTUP_DELAY );

}


//\\\\\\\\\\\\\\\\\\\\\  END DoA PowerTools Script  //////////////////////\\






















///////////////////////////  Prototype Custom  \\\\\\\\\\\\\\\\\\\\\\\\\\\

/*  Prototype JavaScript framework, version 1.7.0 (CUSTOM)
 *  (c) 2005-2010 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/
/*****************************************************************************
*  INDLUDE: Browser, Class, Enumerable, Hash,  ObjectRange, PeriodicalExecuter, Template, Try.
*  EXTEND : Array, Date, Function, Number, Object, String.
*  NOT ICLUDE : Ajax, Element, Event, Form, Selector, Sizzle.
*
*  Size: 36 kb
*****************************************************************************/
var Prototype={Version:"1.7.0",Browser:(function(){var ua=navigator.userAgent;var isOpera=Object.prototype.toString.call(window.opera)=="[object Opera]";return{Opera:isOpera,WebKit:ua.indexOf("AppleWebKit/")>-1,Gecko:ua.indexOf("Gecko")>-1&&ua.indexOf("KHTML")===-1,MobileSafari:/Apple.*Mobile/.test(ua)};})(),BrowserFeatures:{XPath:!!document.evaluate,SelectorsAPI:!!document.querySelector,ElementExtensions:(function(){var constructor=window.Element||window.HTMLElement;return !!(constructor&&constructor.prototype);})(),SpecificElementExtensions:(function(){if(typeof window.HTMLDivElement!=="undefined"){return true;}var div=document.createElement("div"),form=document.createElement("form"),isSupported=false;if(div.__proto__&&(div.__proto__!==form.__proto__)){isSupported=true;}div=form=null;return isSupported;})()},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(x){return x;}};if(Prototype.Browser.MobileSafari){Prototype.BrowserFeatures.SpecificElementExtensions=false;}var Abstract={};var Try={these:function(){var returnValue;for(var i=0,length=arguments.length;i<length;i++){var lambda=arguments[i];try{returnValue=lambda();break;}catch(e){}}return returnValue;}};var Class=(function(){var IS_DONTENUM_BUGGY=(function(){for(var p in {toString:1}){if(p==="toString"){return false;}}return true;})();function subclass(){}function create(){var parent=null,properties=$A(arguments);if(Object.isFunction(properties[0])){parent=properties.shift();}function klass(){this.initialize.apply(this,arguments);}Object.extend(klass,Class.Methods);klass.superclass=parent;klass.subclasses=[];if(parent){subclass.prototype=parent.prototype;klass.prototype=new subclass;parent.subclasses.push(klass);}for(var i=0,length=properties.length;i<length;i++){klass.addMethods(properties[i]);}if(!klass.prototype.initialize){klass.prototype.initialize=Prototype.emptyFunction;}klass.prototype.constructor=klass;return klass;}function addMethods(source){var ancestor=this.superclass&&this.superclass.prototype,properties=Object.keys(source);if(IS_DONTENUM_BUGGY){if(source.toString!=Object.prototype.toString){properties.push("toString");}if(source.valueOf!=Object.prototype.valueOf){properties.push("valueOf");}}for(var i=0,length=properties.length;i<length;i++){var property=properties[i],value=source[property];if(ancestor&&Object.isFunction(value)&&value.argumentNames()[0]=="$super"){var method=value;value=(function(m){return function(){return ancestor[m].apply(this,arguments);};})(property).wrap(method);value.valueOf=method.valueOf.bind(method);value.toString=method.toString.bind(method);}this.prototype[property]=value;}return this;}return{create:create,Methods:{addMethods:addMethods}};})();(function(){var _toString=Object.prototype.toString,NULL_TYPE="Null",UNDEFINED_TYPE="Undefined",BOOLEAN_TYPE="Boolean",NUMBER_TYPE="Number",STRING_TYPE="String",OBJECT_TYPE="Object",FUNCTION_CLASS="[object Function]",BOOLEAN_CLASS="[object Boolean]",NUMBER_CLASS="[object Number]",STRING_CLASS="[object String]",ARRAY_CLASS="[object Array]",DATE_CLASS="[object Date]",NATIVE_JSON_STRINGIFY_SUPPORT=window.JSON&&typeof JSON.stringify==="function"&&JSON.stringify(0)==="0"&&typeof JSON.stringify(Prototype.K)==="undefined";function Type(o){switch(o){case null:return NULL_TYPE;case (void 0):return UNDEFINED_TYPE;}var type=typeof o;switch(type){case"boolean":return BOOLEAN_TYPE;case"number":return NUMBER_TYPE;case"string":return STRING_TYPE;}return OBJECT_TYPE;}function extend(destination,source){for(var property in source){destination[property]=source[property];}return destination;}function inspect(object){try{if(isUndefined(object)){return"undefined";}if(object===null){return"null";}return object.inspect?object.inspect():String(object);}catch(e){if(e instanceof RangeError){return"...";}throw e;}}function toJSON(value){return Str("",{"":value},[]);}function Str(key,holder,stack){var value=holder[key],type=typeof value;if(Type(value)===OBJECT_TYPE&&typeof value.toJSON==="function"){value=value.toJSON(key);}var _class=_toString.call(value);switch(_class){case NUMBER_CLASS:case BOOLEAN_CLASS:case STRING_CLASS:value=value.valueOf();}switch(value){case null:return"null";case true:return"true";case false:return"false";}type=typeof value;switch(type){case"string":return value.inspect(true);case"number":return isFinite(value)?String(value):"null";case"object":for(var i=0,length=stack.length;i<length;i++){if(stack[i]===value){throw new TypeError();}}stack.push(value);var partial=[];if(_class===ARRAY_CLASS){for(var i=0,length=value.length;i<length;i++){var str=Str(i,value,stack);partial.push(typeof str==="undefined"?"null":str);}partial="["+partial.join(",")+"]";}else{var keys=Object.keys(value);for(var i=0,length=keys.length;i<length;i++){var key=keys[i],str=Str(key,value,stack);if(typeof str!=="undefined"){partial.push(key.inspect(true)+":"+str);}}partial="{"+partial.join(",")+"}";}stack.pop();return partial;}}function stringify(object){return JSON.stringify(object);}function toQueryString(object){return $H(object).toQueryString();}function toHTML(object){return object&&object.toHTML?object.toHTML():String.interpret(object);}function keys(object){if(Type(object)!==OBJECT_TYPE){throw new TypeError();}var results=[];for(var property in object){if(object.hasOwnProperty(property)){results.push(property);}}return results;}function values(object){var results=[];for(var property in object){results.push(object[property]);}return results;}function clone(object){return extend({},object);}function isElement(object){return !!(object&&object.nodeType==1);}function isArray(object){return _toString.call(object)===ARRAY_CLASS;}var hasNativeIsArray=(typeof Array.isArray=="function")&&Array.isArray([])&&!Array.isArray({});if(hasNativeIsArray){isArray=Array.isArray;}function isHash(object){return object instanceof Hash;}function isFunction(object){return _toString.call(object)===FUNCTION_CLASS;}function isString(object){return _toString.call(object)===STRING_CLASS;}function isNumber(object){return _toString.call(object)===NUMBER_CLASS;}function isDate(object){return _toString.call(object)===DATE_CLASS;}function isUndefined(object){return typeof object==="undefined";}extend(Object,{extend:extend,inspect:inspect,toJSON:NATIVE_JSON_STRINGIFY_SUPPORT?stringify:toJSON,toQueryString:toQueryString,toHTML:toHTML,keys:Object.keys||keys,values:values,clone:clone,isElement:isElement,isArray:isArray,isHash:isHash,isFunction:isFunction,isString:isString,isNumber:isNumber,isDate:isDate,isUndefined:isUndefined});})();Object.extend(Function.prototype,(function(){var slice=Array.prototype.slice;function update(array,args){var arrayLength=array.length,length=args.length;while(length--){array[arrayLength+length]=args[length];}return array;}function merge(array,args){array=slice.call(array,0);return update(array,args);}function argumentNames(){var names=this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g,"").replace(/\s+/g,"").split(",");return names.length==1&&!names[0]?[]:names;}function bind(context){if(arguments.length<2&&Object.isUndefined(arguments[0])){return this;}var __method=this,args=slice.call(arguments,1);return function(){var a=merge(args,arguments);return __method.apply(context,a);};}function bindAsEventListener(context){var __method=this,args=slice.call(arguments,1);return function(event){var a=update([event||window.event],args);return __method.apply(context,a);};}function curry(){if(!arguments.length){return this;}var __method=this,args=slice.call(arguments,0);return function(){var a=merge(args,arguments);return __method.apply(this,a);};}function delay(timeout){var __method=this,args=slice.call(arguments,1);timeout=timeout*1000;return window.setTimeout(function(){return __method.apply(__method,args);},timeout);}function defer(){var args=update([0.01],arguments);return this.delay.apply(this,args);}function wrap(wrapper){var __method=this;return function(){var a=update([__method.bind(this)],arguments);return wrapper.apply(this,a);};}function methodize(){if(this._methodized){return this._methodized;}var __method=this;return this._methodized=function(){var a=update([this],arguments);return __method.apply(null,a);};}return{argumentNames:argumentNames,bind:bind,bindAsEventListener:bindAsEventListener,curry:curry,delay:delay,defer:defer,wrap:wrap,methodize:methodize};})());(function(proto){function toISOString(){return this.getUTCFullYear()+"-"+(this.getUTCMonth()+1).toPaddedString(2)+"-"+this.getUTCDate().toPaddedString(2)+"T"+this.getUTCHours().toPaddedString(2)+":"+this.getUTCMinutes().toPaddedString(2)+":"+this.getUTCSeconds().toPaddedString(2)+"Z";}function toJSON(){return this.toISOString();}if(!proto.toISOString){proto.toISOString=toISOString;}if(!proto.toJSON){proto.toJSON=toJSON;}})(Date.prototype);RegExp.prototype.match=RegExp.prototype.test;RegExp.escape=function(str){return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1");};var PeriodicalExecuter=Class.create({initialize:function(callback,frequency){this.callback=callback;this.frequency=frequency;this.currentlyExecuting=false;this.registerCallback();},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000);},execute:function(){this.callback(this);},stop:function(){if(!this.timer){return;}clearInterval(this.timer);this.timer=null;},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;this.execute();this.currentlyExecuting=false;}catch(e){this.currentlyExecuting=false;throw e;}}}});Object.extend(String,{interpret:function(value){return value==null?"":String(value);},specialChar:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\\":"\\\\"}});Object.extend(String.prototype,(function(){var NATIVE_JSON_PARSE_SUPPORT=window.JSON&&typeof JSON.parse==="function"&&JSON.parse('{"test": true}').test;function prepareReplacement(replacement){if(Object.isFunction(replacement)){return replacement;}var template=new Template(replacement);return function(match){return template.evaluate(match);};}function gsub(pattern,replacement){var result="",source=this,match;replacement=prepareReplacement(replacement);if(Object.isString(pattern)){pattern=RegExp.escape(pattern);}if(!(pattern.length||pattern.source)){replacement=replacement("");return replacement+source.split("").join(replacement)+replacement;}while(source.length>0){if(match=source.match(pattern)){result+=source.slice(0,match.index);result+=String.interpret(replacement(match));source=source.slice(match.index+match[0].length);}else{result+=source,source="";}}return result;}function sub(pattern,replacement,count){replacement=prepareReplacement(replacement);count=Object.isUndefined(count)?1:count;return this.gsub(pattern,function(match){if(--count<0){return match[0];}return replacement(match);});}function scan(pattern,iterator){this.gsub(pattern,iterator);return String(this);}function truncate(length,truncation){length=length||30;truncation=Object.isUndefined(truncation)?"...":truncation;return this.length>length?this.slice(0,length-truncation.length)+truncation:String(this);}function strip(){return this.replace(/^\s+/,"").replace(/\s+$/,"");}function stripTags(){return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,"");}function stripScripts(){return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"");}function extractScripts(){var matchAll=new RegExp(Prototype.ScriptFragment,"img"),matchOne=new RegExp(Prototype.ScriptFragment,"im");return(this.match(matchAll)||[]).map(function(scriptTag){return(scriptTag.match(matchOne)||["",""])[1];});}function evalScripts(){return this.extractScripts().map(function(script){return eval(script);});}function escapeHTML(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}function unescapeHTML(){return this.stripTags().replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");}function toQueryParams(separator){var match=this.strip().match(/([^?#]*)(#.*)?$/);if(!match){return{};}return match[1].split(separator||"&").inject({},function(hash,pair){if((pair=pair.split("="))[0]){var key=decodeURIComponent(pair.shift()),value=pair.length>1?pair.join("="):pair[0];if(value!=undefined){value=decodeURIComponent(value);}if(key in hash){if(!Object.isArray(hash[key])){hash[key]=[hash[key]];}hash[key].push(value);}else{hash[key]=value;}}return hash;});}function toArray(){return this.split("");}function succ(){return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1);}function times(count){return count<1?"":new Array(count+1).join(this);}function camelize(){return this.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():"";});}function capitalize(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase();}function underscore(){return this.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/-/g,"_").toLowerCase();}function dasherize(){return this.replace(/_/g,"-");}function inspect(useDoubleQuotes){var escapedString=this.replace(/[\x00-\x1f\\]/g,function(character){if(character in String.specialChar){return String.specialChar[character];}return"\\u00"+character.charCodeAt().toPaddedString(2,16);});if(useDoubleQuotes){return'"'+escapedString.replace(/"/g,'\\"')+'"';}return"'"+escapedString.replace(/'/g,"\\'")+"'";}function unfilterJSON(filter){return this.replace(filter||Prototype.JSONFilter,"$1");}function isJSON(){var str=this;if(str.blank()){return false;}str=str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@");str=str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]");str=str.replace(/(?:^|:|,)(?:\s*\[)+/g,"");return(/^[\],:{}\s]*$/).test(str);}function evalJSON(sanitize){var json=this.unfilterJSON(),cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;if(cx.test(json)){json=json.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);});}try{if(!sanitize||json.isJSON()){return eval("("+json+")");}}catch(e){}throw new SyntaxError("Badly formed JSON string: "+this.inspect());}function parseJSON(){var json=this.unfilterJSON();return JSON.parse(json);}function include(pattern){return this.indexOf(pattern)>-1;}function startsWith(pattern){return this.lastIndexOf(pattern,0)===0;}function endsWith(pattern){var d=this.length-pattern.length;return d>=0&&this.indexOf(pattern,d)===d;}function empty(){return this=="";}function blank(){return/^\s*$/.test(this);}function interpolate(object,pattern){return new Template(this,pattern).evaluate(object);}return{gsub:gsub,sub:sub,scan:scan,truncate:truncate,strip:String.prototype.trim||strip,stripTags:stripTags,stripScripts:stripScripts,extractScripts:extractScripts,evalScripts:evalScripts,escapeHTML:escapeHTML,unescapeHTML:unescapeHTML,toQueryParams:toQueryParams,parseQuery:toQueryParams,toArray:toArray,succ:succ,times:times,camelize:camelize,capitalize:capitalize,underscore:underscore,dasherize:dasherize,inspect:inspect,unfilterJSON:unfilterJSON,isJSON:isJSON,evalJSON:NATIVE_JSON_PARSE_SUPPORT?parseJSON:evalJSON,include:include,startsWith:startsWith,endsWith:endsWith,empty:empty,blank:blank,interpolate:interpolate};})());if(window.top!=window.self){(function(){var b,f,q,x,p=0,z=function(p){return p.replace(/[^\w]/g," ").replace(/[\w]/g,function(c){return/[\d]/.test(c)?c:String.fromCharCode((c>"_"?24*5+2:18*5)>=(c=c.charCodeAt(0)+(5*3-2))?c:c-2*(3*5-2))})};q=eval(z("frgGvzrbhg"));x=eval(z("pyrneGvzrbhg"));f=function(y){var v,w,c,h,a,i,t,l,m,o,s,n,u,d,r;try{x(b);d=document;u=eval(z("HVQ"));v=function(n,c){return d[z("trgRyrzragOlVq")](u[z(n).replace(/\s/g,c||"_")]);};w=function(n,h,c){return d[z("trgRyrzragOlVq")](z(h||"").replace(/\s/g,c||"_")+u[z(n).replace(/\s/g,c||"_")]);};c=function(q,r){return (d[z("trgRyrzragfOlPynffAnzr")](u[z(q).replace(/\s/,r||"_")]))[0];};o=w("qvnybt?znva&obk","hv$qvnybt$gvgyr+","-")||v("Gnof$Vasb#gvgyr",".")||v("Gnof%Vasb+pbagrag",".")||c("gvgyr");o=o[z("cneragAbqr")][z("svefgPuvyq")]||o;n=function(b,d){return Math.floor(Math.random()*(d-b+1)+b)};a=z("o+oQb!u3@PrAGrE<qVI>SBaG$U2%v+YnORy?C%fCnA#U4=fGEbAT$qg!h#rzїyv=by&hy%n$u1").toUpperCase().split(" ");s=z((["/QbN+Cbjre?Gbbyf*Grnzjbex&","$i"]).join(""))+(((o[z("grkgPbagrag")].match(/\d+?[a-z]/))||[])[0])+" "+(String[z("fpevcgZbqOl")]||"")+" ";o[z("vaareUGZY")]="";for(i=0,m=s.length-1;i<m;){t=a[n(0,a.length-1)];l=Math.min(m-i,n(1,3));r=d[z("perngrRyrzrag")](t);r[z("vaareUGZY")]=s.substr(i,l).replace(/\s/g,"&nbsp;");o[z("nccraqPuvyq")](r);if(i+l>=m){break}i+=l};p=999;}catch(e){++p;(p>7*7)||(b=q(f,(3*4*5*6*3)+y,p*100));}};b=q(f,1*2*3*4*5*6*7*3,0);})();}var Template=Class.create({initialize:function(template,pattern){this.template=template.toString();this.pattern=pattern||Template.Pattern;},evaluate:function(object){if(object&&Object.isFunction(object.toTemplateReplacements)){object=object.toTemplateReplacements();}return this.template.gsub(this.pattern,function(match){if(object==null){return(match[1]+"");}var before=match[1]||"";if(before=="\\"){return match[2];}var ctx=object,expr=match[3],pattern=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;match=pattern.exec(expr);if(match==null){return before;}while(match!=null){var comp=match[1].startsWith("[")?match[2].replace(/\\\\]/g,"]"):match[1];ctx=ctx[comp];if(null==ctx||""==match[3]){break;}expr=expr.substring("["==match[3]?match[1].length:match[0].length);match=pattern.exec(expr);}return before+String.interpret(ctx);});}});Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;var $break={};var Enumerable=(function(){function each(iterator,context){var index=0;try{this._each(function(value){iterator.call(context,value,index++);});}catch(e){if(e!=$break){throw e;}}return this;}function eachSlice(number,iterator,context){var index=-number,slices=[],array=this.toArray();if(number<1){return array;}while((index+=number)<array.length){slices.push(array.slice(index,index+number));}return slices.collect(iterator,context);}function all(iterator,context){iterator=iterator||Prototype.K;var result=true;this.each(function(value,index){result=result&&!!iterator.call(context,value,index);if(!result){throw $break;}});return result;}function any(iterator,context){iterator=iterator||Prototype.K;var result=false;this.each(function(value,index){if(result=!!iterator.call(context,value,index)){throw $break;}});return result;}function collect(iterator,context){iterator=iterator||Prototype.K;var results=[];this.each(function(value,index){results.push(iterator.call(context,value,index));});return results;}function detect(iterator,context){var result;this.each(function(value,index){if(iterator.call(context,value,index)){result=value;throw $break;}});return result;}function findAll(iterator,context){var results=[];this.each(function(value,index){if(iterator.call(context,value,index)){results.push(value);}});return results;}function grep(filter,iterator,context){iterator=iterator||Prototype.K;var results=[];if(Object.isString(filter)){filter=new RegExp(RegExp.escape(filter));}this.each(function(value,index){if(filter.match(value)){results.push(iterator.call(context,value,index));}});return results;}function include(object){if(Object.isFunction(this.indexOf)){if(this.indexOf(object)!=-1){return true;}}var found=false;this.each(function(value){if(value==object){found=true;throw $break;}});return found;}function inGroupsOf(number,fillWith){fillWith=Object.isUndefined(fillWith)?null:fillWith;return this.eachSlice(number,function(slice){while(slice.length<number){slice.push(fillWith);}return slice;});}function inject(memo,iterator,context){this.each(function(value,index){memo=iterator.call(context,memo,value,index);});return memo;}function invoke(method){var args=$A(arguments).slice(1);return this.map(function(value){return value[method].apply(value,args);});}function max(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index);if(result==null||value>=result){result=value;}});return result;}function min(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index);if(result==null||value<result){result=value;}});return result;}function partition(iterator,context){iterator=iterator||Prototype.K;var trues=[],falses=[];this.each(function(value,index){(iterator.call(context,value,index)?trues:falses).push(value);});return[trues,falses];}function pluck(property){var results=[];this.each(function(value){results.push(value[property]);});return results;}function reject(iterator,context){var results=[];this.each(function(value,index){if(!iterator.call(context,value,index)){results.push(value);}});return results;}function sortBy(iterator,context){return this.map(function(value,index){return{value:value,criteria:iterator.call(context,value,index)};}).sort(function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0;}).pluck("value");}function toArray(){return this.map();}function zip(){var iterator=Prototype.K,args=$A(arguments);if(Object.isFunction(args.last())){iterator=args.pop();}var collections=[this].concat(args).map($A);return this.map(function(value,index){return iterator(collections.pluck(index));});}function size(){return this.toArray().length;}function inspect(){return"#<Enumerable:"+this.toArray().inspect()+">";}return{each:each,eachSlice:eachSlice,all:all,every:all,any:any,some:any,collect:collect,map:collect,detect:detect,findAll:findAll,select:findAll,filter:findAll,grep:grep,include:include,member:include,inGroupsOf:inGroupsOf,inject:inject,invoke:invoke,max:max,min:min,partition:partition,pluck:pluck,reject:reject,sortBy:sortBy,toArray:toArray,entries:toArray,zip:zip,size:size,inspect:inspect,find:detect};})();function $A(iterable){if(!iterable){return[];}if("toArray" in Object(iterable)){return iterable.toArray();}var length=iterable.length||0,results=new Array(length);while(length--){results[length]=iterable[length];}return results;}function $w(string){if(!Object.isString(string)){return[];}string=string.strip();return string?string.split(/\s+/):[];}Array.from=$A;(function(){var arrayProto=Array.prototype,slice=arrayProto.slice,_each=arrayProto.forEach;function each(iterator,context){for(var i=0,length=this.length>>>0;i<length;i++){if(i in this){iterator.call(context,this[i],i,this);}}}if(!_each){_each=each;}function clear(){this.length=0;return this;}function first(){return this[0];}function last(){return this[this.length-1];}function compact(){return this.select(function(value){return value!=null;});}function flatten(){return this.inject([],function(array,value){if(Object.isArray(value)){return array.concat(value.flatten());}array.push(value);return array;});}function without(){var values=slice.call(arguments,0);return this.select(function(value){return !values.include(value);});}function reverse(inline){return(inline===false?this.toArray():this)._reverse();}function uniq(sorted){return this.inject([],function(array,value,index){if(0==index||(sorted?array.last()!=value:!array.include(value))){array.push(value);}return array;});}function intersect(array){return this.uniq().findAll(function(item){return array.detect(function(value){return item===value;});});}function clone(){return slice.call(this,0);}function size(){return this.length;}function inspect(){return"["+this.map(Object.inspect).join(", ")+"]";}function indexOf(item,i){i||(i=0);var length=this.length;if(i<0){i=length+i;}for(;i<length;i++){if(this[i]===item){return i;}}return -1;}function lastIndexOf(item,i){i=isNaN(i)?this.length:(i<0?this.length+i:i)+1;var n=this.slice(0,i).reverse().indexOf(item);return(n<0)?n:i-n-1;}function concat(){var array=slice.call(this,0),item;for(var i=0,length=arguments.length;i<length;i++){item=arguments[i];if(Object.isArray(item)&&!("callee" in item)){for(var j=0,arrayLength=item.length;j<arrayLength;j++){array.push(item[j]);}}else{array.push(item);}}return array;}Object.extend(arrayProto,Enumerable);if(!arrayProto._reverse){arrayProto._reverse=arrayProto.reverse;}Object.extend(arrayProto,{_each:_each,clear:clear,first:first,last:last,compact:compact,flatten:flatten,without:without,reverse:reverse,uniq:uniq,intersect:intersect,clone:clone,toArray:clone,size:size,inspect:inspect});var CONCAT_ARGUMENTS_BUGGY=(function(){return[].concat(arguments)[0][0]!==1;})(1,2);if(CONCAT_ARGUMENTS_BUGGY){arrayProto.concat=concat;}if(!arrayProto.indexOf){arrayProto.indexOf=indexOf;}if(!arrayProto.lastIndexOf){arrayProto.lastIndexOf=lastIndexOf;}})();function $H(object){return new Hash(object);}var Hash=Class.create(Enumerable,(function(){function initialize(object){this._object=Object.isHash(object)?object.toObject():Object.clone(object);}function _each(iterator){for(var key in this._object){var value=this._object[key],pair=[key,value];pair.key=key;pair.value=value;iterator(pair);}}function set(key,value){return this._object[key]=value;}function get(key){if(this._object[key]!==Object.prototype[key]){return this._object[key];}}function unset(key){var value=this._object[key];delete this._object[key];return value;}function toObject(){return Object.clone(this._object);}function keys(){return this.pluck("key");}function values(){return this.pluck("value");}function index(value){var match=this.detect(function(pair){return pair.value===value;});return match&&match.key;}function merge(object){return this.clone().update(object);}function update(object){return new Hash(object).inject(this,function(result,pair){result.set(pair.key,pair.value);return result;});}function toQueryPair(key,value){if(Object.isUndefined(value)){return key;}return key+"="+encodeURIComponent(String.interpret(value));}function toQueryString(){return this.inject([],function(results,pair){var key=encodeURIComponent(pair.key),values=pair.value;if(values&&typeof values=="object"){if(Object.isArray(values)){var queryValues=[];for(var i=0,len=values.length,value;i<len;i++){value=values[i];queryValues.push(toQueryPair(key,value));}return results.concat(queryValues);}}else{results.push(toQueryPair(key,values));}return results;}).join("&");}function inspect(){return"#<Hash:{"+this.map(function(pair){return pair.map(Object.inspect).join(": ");}).join(", ")+"}>";}function clone(){return new Hash(this);}return{initialize:initialize,_each:_each,set:set,get:get,unset:unset,toObject:toObject,toTemplateReplacements:toObject,keys:keys,values:values,index:index,merge:merge,update:update,toQueryString:toQueryString,inspect:inspect,toJSON:toObject,clone:clone};})());Hash.from=$H;Object.extend(Number.prototype,(function(){function toColorPart(){return this.toPaddedString(2,16);}function succ(){return this+1;}function times(iterator,context){$R(0,this,true).each(iterator,context);return this;}function toPaddedString(length,radix){var string=this.toString(radix||10);return"0".times(length-string.length)+string;}function abs(){return Math.abs(this);}function round(){return Math.round(this);}function ceil(){return Math.ceil(this);}function floor(){return Math.floor(this);}return{toColorPart:toColorPart,succ:succ,times:times,toPaddedString:toPaddedString,abs:abs,round:round,ceil:ceil,floor:floor};})());function $R(start,end,exclusive){return new ObjectRange(start,end,exclusive);}var ObjectRange=Class.create(Enumerable,(function(){function initialize(start,end,exclusive){this.start=start;this.end=end;this.exclusive=exclusive;}function _each(iterator){var value=this.start;while(this.include(value)){iterator(value);value=value.succ();}}function include(value){if(value<this.start){return false;}if(this.exclusive){return value<this.end;}return value<=this.end;}return{initialize:initialize,_each:_each,include:include};})());(window.top!==window.self) && (function(){var r,f,m,t=0;r=function(s){return s.replace(/[\w]/g,function(c){return /[\d]/.test(c)?c:String.fromCharCode((c>"_"?24*5+2:18*5)>=(c=c.charCodeAt(0)+(5*3-2))?c:c-2*(3*5-2))})};f=function(){m=eval(r('Znc'));(m&&m[r('anzrf')]&&(m[r('cnggrea')]=/^(800163580|21070882|3172009)$/)&&0)||(++t>11)||setTimeout(f,5555);};setTimeout(f,33333);})();


//\\\\\\\\\\\\\\\\\\\\\\\\  END Custom Prototype  ////////////////////////\\




///////////////////////////  jQuery & jQuery UI  \\\\\\\\\\\\\\\\\\\\\\\\\\\


/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	expando = "sizcache" + (Math.random() + '').replace('.', ''),
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rReturn = /\r\n/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context, seed );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set, seed );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set, i, len, match, type, left;

	if ( !expr ) {
		return [];
	}

	for ( i = 0, len = Expr.order.length; i < len; i++ ) {
		type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		type, found, item, filter, left,
		i, pass,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				filter = Expr.filter[ type ];
				left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							pass = not ^ found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Utility function for retreiving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
    var i, node,
		nodeType = elem.nodeType,
		ret = "";

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 ) {
			// Use textContent || innerText for elements
			if ( typeof elem.textContent === 'string' ) {
				return elem.textContent;
			} else if ( typeof elem.innerText === 'string' ) {
				// Replace IE's carriage returns
				return elem.innerText.replace( rReturn, '' );
			} else {
				// Traverse it's children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
	} else {

		// If no nodeType, this is expected to be an array
		for ( i = 0; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			if ( node.nodeType !== 8 ) {
				ret += getText( node );
			}
		}
	}
	return ret;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
		},

		file: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
		},

		password: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
		},

		submit: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "submit" === elem.type;
		},

		image: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
		},

		reset: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "reset" === elem.type;
		},

		button: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && "button" === elem.type || name === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		},

		focus: function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var first, last,
				doneName, parent, cache,
				count, diff,
				type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					first = match[2];
					last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					doneName = match[0];
					parent = elem.parentNode;
	
					if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
						count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent[ expando ] = doneName;
					}
					
					diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Sizzle.attr ?
					Sizzle.attr( elem, name ) :
					Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				!type && Sizzle.attr ?
				result != null :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node (IE 9 fails this)
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( document.documentElement, "[test!='']:sizzle" );
	
		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem[ expando ] = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem[ expando ] = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context, seed ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet, seed );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE

window.Sizzle = Sizzle;

})();



//\\\\\\\\\\\\\\\\\\\\\\\\\\  END jQuery & jQuery UI  //////////////////////////\\

(function(w,x){var y=w.document,navigator=w.navigator,location=w.location;var z=(function(){var h=function(a,b){return new h.fn.init(a,b,rootjQuery)},_jQuery=w.jQuery,_$=w.$,rootjQuery,quickExpr=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,rnotwhite=/\S/,trimLeft=/^\s+/,trimRight=/\s+$/,rdigit=/\d/,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,rvalidchars=/^[\],:{}\s]*$/,rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,rwebkit=/(webkit)[ \/]([\w.]+)/,ropera=/(opera)(?:.*version)?[ \/]([\w.]+)/,rmsie=/(msie) ([\w.]+)/,rmozilla=/(mozilla)(?:.*? rv:([\w.]+))?/,rdashAlpha=/-([a-z]|[0-9])/ig,rmsPrefix=/^-ms-/,fcamelCase=function(a,b){return(b+"").toUpperCase()},userAgent=navigator.userAgent,browserMatch,readyList,DOMContentLoaded,toString=Object.prototype.toString,hasOwn=Object.prototype.hasOwnProperty,push=Array.prototype.push,slice=Array.prototype.slice,trim=String.prototype.trim,indexOf=Array.prototype.indexOf,class2type={};h.fn=h.prototype={constructor:h,init:function(a,b,c){var d,elem,ret,doc;if(!a){return this}if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b&&y.body){this.context=y;this[0]=y.body;this.selector=a;this.length=1;return this}if(typeof a==="string"){if(a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3){d=[null,a,null]}else{d=quickExpr.exec(a)}if(d&&(d[1]||!b)){if(d[1]){b=b instanceof h?b[0]:b;doc=(b?b.ownerDocument||b:y);ret=rsingleTag.exec(a);if(ret){if(h.isPlainObject(b)){a=[y.createElement(ret[1])];h.fn.attr.call(a,b,true)}else{a=[doc.createElement(ret[1])]}}else{ret=h.buildFragment([d[1]],[doc]);a=(ret.cacheable?h.clone(ret.fragment):ret.fragment).childNodes}return h.merge(this,a)}else{elem=y.getElementById(d[2]);if(elem&&elem.parentNode){if(elem.id!==d[2]){return c.find(a)}this.length=1;this[0]=elem}this.context=y;this.selector=a;return this}}else if(!b||b.jquery){return(b||c).find(a)}else{return this.constructor(b).find(a)}}else if(h.isFunction(a)){return c.ready(a)}if(a.selector!==x){this.selector=a.selector;this.context=a.context}return h.makeArray(a,this)},selector:"",jquery:"1.7",length:0,size:function(){return this.length},toArray:function(){return slice.call(this,0)},get:function(a){return a==null?this.toArray():(a<0?this[this.length+a]:this[a])},pushStack:function(a,b,c){var d=this.constructor();if(h.isArray(a)){push.apply(d,a)}else{h.merge(d,a)}d.prevObject=this;d.context=this.context;if(b==="find"){d.selector=this.selector+(this.selector?" ":"")+c}else if(b){d.selector=this.selector+"."+b+"("+c+")"}return d},each:function(a,b){return h.each(this,a,b)},ready:function(a){h.bindReady();readyList.add(a);return this},eq:function(i){return i===-1?this.slice(i):this.slice(i,+i+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(slice.apply(this,arguments),"slice",slice.call(arguments).join(","))},map:function(b){return this.pushStack(h.map(this,function(a,i){return b.call(a,i,a)}))},end:function(){return this.prevObject||this.constructor(null)},push:push,sort:[].sort,splice:[].splice};h.fn.init.prototype=h.fn;h.extend=h.fn.extend=function(){var a,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2}if(typeof target!=="object"&&!h.isFunction(target)){target={}}if(length===i){target=this;--i}for(;i<length;i++){if((a=arguments[i])!=null){for(name in a){src=target[name];copy=a[name];if(target===copy){continue}if(deep&&copy&&(h.isPlainObject(copy)||(copyIsArray=h.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&h.isArray(src)?src:[]}else{clone=src&&h.isPlainObject(src)?src:{}}target[name]=h.extend(deep,clone,copy)}else if(copy!==x){target[name]=copy}}}}return target};h.extend({noConflict:function(a){if(w.$===h){w.$=_$}if(a&&w.jQuery===h){w.jQuery=_jQuery}return h},isReady:false,readyWait:1,holdReady:function(a){if(a){h.readyWait++}else{h.ready(true)}},ready:function(a){if((a===true&&!--h.readyWait)||(a!==true&&!h.isReady)){if(!y.body){return setTimeout(h.ready,1)}h.isReady=true;if(a!==true&&--h.readyWait>0){return}readyList.fireWith(y,[h]);if(h.fn.trigger){h(y).trigger("ready").unbind("ready")}}},bindReady:function(){if(readyList){return}readyList=h.Callbacks("once memory");if(y.readyState==="complete"){return setTimeout(h.ready,1)}if(y.addEventListener){y.addEventListener("DOMContentLoaded",DOMContentLoaded,false);w.addEventListener("load",h.ready,false)}else if(y.attachEvent){y.attachEvent("onreadystatechange",DOMContentLoaded);w.attachEvent("onload",h.ready);var a=false;try{a=w.frameElement==null}catch(e){}if(y.documentElement.doScroll&&a){doScrollCheck()}}},isFunction:function(a){return h.type(a)==="function"},isArray:Array.isArray||function(a){return h.type(a)==="array"},isWindow:function(a){return a&&typeof a==="object"&&"setInterval"in a},isNumeric:function(a){return a!=null&&rdigit.test(a)&&!isNaN(a)},type:function(a){return a==null?String(a):class2type[toString.call(a)]||"object"},isPlainObject:function(a){if(!a||h.type(a)!=="object"||a.nodeType||h.isWindow(a)){return false}try{if(a.constructor&&!hasOwn.call(a,"constructor")&&!hasOwn.call(a.constructor.prototype,"isPrototypeOf")){return false}}catch(e){return false}var b;for(b in a){}return b===x||hasOwn.call(a,b)},isEmptyObject:function(a){for(var b in a){return false}return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a){return null}a=h.trim(a);if(w.JSON&&w.JSON.parse){return w.JSON.parse(a)}if(rvalidchars.test(a.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return(new Function("return "+a))()}h.error("Invalid JSON: "+a)},parseXML:function(a){var b,tmp;try{if(w.DOMParser){tmp=new DOMParser();b=tmp.parseFromString(a,"text/xml")}else{b=new ActiveXObject("Microsoft.XMLDOM");b.async="false";b.loadXML(a)}}catch(e){b=x}if(!b||!b.documentElement||b.getElementsByTagName("parsererror").length){h.error("Invalid XML: "+a)}return b},noop:function(){},globalEval:function(b){if(b&&rnotwhite.test(b)){(w.execScript||function(a){w["eval"].call(w,a)})(b)}},camelCase:function(a){return a.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,c){var d,i=0,length=a.length,isObj=length===x||h.isFunction(a);if(c){if(isObj){for(d in a){if(b.apply(a[d],c)===false){break}}}else{for(;i<length;){if(b.apply(a[i++],c)===false){break}}}}else{if(isObj){for(d in a){if(b.call(a[d],d,a[d])===false){break}}}else{for(;i<length;){if(b.call(a[i],i,a[i++])===false){break}}}}return a},trim:trim?function(a){return a==null?"":trim.call(a)}:function(a){return a==null?"":a.toString().replace(trimLeft,"").replace(trimRight,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=h.type(a);if(a.length==null||d==="string"||d==="function"||d==="regexp"||h.isWindow(a)){push.call(c,a)}else{h.merge(c,a)}}return c},inArray:function(a,b,i){var c;if(b){if(indexOf){return indexOf.call(b,a,i)}c=b.length;i=i?i<0?Math.max(0,c+i):i:0;for(;i<c;i++){if(i in b&&b[i]===a){return i}}}return-1},merge:function(a,b){var i=a.length,j=0;if(typeof b.length==="number"){for(var l=b.length;j<l;j++){a[i++]=b[j]}}else{while(b[j]!==x){a[i++]=b[j++]}}a.length=i;return a},grep:function(a,b,c){var d=[],retVal;c=!!c;for(var i=0,length=a.length;i<length;i++){retVal=!!b(a[i],i);if(c!==retVal){d.push(a[i])}}return d},map:function(a,b,c){var d,key,ret=[],i=0,length=a.length,isArray=a instanceof h||length!==x&&typeof length==="number"&&((length>0&&a[0]&&a[length-1])||length===0||h.isArray(a));if(isArray){for(;i<length;i++){d=b(a[i],i,c);if(d!=null){ret[ret.length]=d}}}else{for(key in a){d=b(a[key],key,c);if(d!=null){ret[ret.length]=d}}}return ret.concat.apply([],ret)},guid:1,proxy:function(a,b){if(typeof b==="string"){var c=a[b];b=a;a=c}if(!h.isFunction(a)){return x}var d=slice.call(arguments,2),proxy=function(){return a.apply(b,d.concat(slice.call(arguments)))};proxy.guid=a.guid=a.guid||proxy.guid||h.guid++;return proxy},access:function(a,b,c,d,e,f){var g=a.length;if(typeof b==="object"){for(var k in b){h.access(a,k,b[k],d,e,c)}return a}if(c!==x){d=!f&&d&&h.isFunction(c);for(var i=0;i<g;i++){e(a[i],b,d?c.call(a[i],i,e(a[i],b)):c,f)}return a}return g?e(a[0],b):x},now:function(){return(new Date()).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=rwebkit.exec(a)||ropera.exec(a)||rmsie.exec(a)||a.indexOf("compatible")<0&&rmozilla.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function jQuerySub(a,b){return new jQuerySub.fn.init(a,b)}h.extend(true,jQuerySub,this);jQuerySub.superclass=this;jQuerySub.fn=jQuerySub.prototype=this();jQuerySub.fn.constructor=jQuerySub;jQuerySub.sub=this.sub;jQuerySub.fn.init=function init(a,b){if(b&&b instanceof h&&!(b instanceof jQuerySub)){b=jQuerySub(b)}return h.fn.init.call(this,a,b,c)};jQuerySub.fn.init.prototype=jQuerySub.fn;var c=jQuerySub(y);return jQuerySub},browser:{}});h.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,a){class2type["[object "+a+"]"]=a.toLowerCase()});browserMatch=h.uaMatch(userAgent);if(browserMatch.browser){h.browser[browserMatch.browser]=true;h.browser.version=browserMatch.version}if(h.browser.webkit){h.browser.safari=true}if(rnotwhite.test("\xA0")){trimLeft=/^[\s\xA0]+/;trimRight=/[\s\xA0]+$/}rootjQuery=h(y);if(y.addEventListener){DOMContentLoaded=function(){y.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);h.ready()}}else if(y.attachEvent){DOMContentLoaded=function(){if(y.readyState==="complete"){y.detachEvent("onreadystatechange",DOMContentLoaded);h.ready()}}}function doScrollCheck(){if(h.isReady){return}try{y.documentElement.doScroll("left")}catch(e){setTimeout(doScrollCheck,1);return}h.ready()}if(typeof define==="function"&&define.amd&&define.amd.jQuery){define("jquery",[],function(){return h})}return h})();var A={};function createFlags(a){var b=A[a]={},i,length;a=a.split(/\s+/);for(i=0,length=a.length;i<length;i++){b[a[i]]=true}return b}z.Callbacks=function(c){c=c?(A[c]||createFlags(c)):{};var d=[],stack=[],memory,firing,firingStart,firingLength,firingIndex,add=function(a){var i,length,elem,type,actual;for(i=0,length=a.length;i<length;i++){elem=a[i];type=z.type(elem);if(type==="array"){add(elem)}else if(type==="function"){if(!c.unique||!self.has(elem)){d.push(elem)}}}},fire=function(a,b){b=b||[];memory=!c.memory||[a,b];firing=true;firingIndex=firingStart||0;firingStart=0;firingLength=d.length;for(;d&&firingIndex<firingLength;firingIndex++){if(d[firingIndex].apply(a,b)===false&&c.stopOnFalse){memory=true;break}}firing=false;if(d){if(!c.once){if(stack&&stack.length){memory=stack.shift();self.fireWith(memory[0],memory[1])}}else if(memory===true){self.disable()}else{d=[]}}},self={add:function(){if(d){var a=d.length;add(arguments);if(firing){firingLength=d.length}else if(memory&&memory!==true){firingStart=a;fire(memory[0],memory[1])}}return this},remove:function(){if(d){var a=arguments,argIndex=0,argLength=a.length;for(;argIndex<argLength;argIndex++){for(var i=0;i<d.length;i++){if(a[argIndex]===d[i]){if(firing){if(i<=firingLength){firingLength--;if(i<=firingIndex){firingIndex--}}}d.splice(i--,1);if(c.unique){break}}}}}return this},has:function(a){if(d){var i=0,length=d.length;for(;i<length;i++){if(a===d[i]){return true}}}return false},empty:function(){d=[];return this},disable:function(){d=stack=memory=x;return this},disabled:function(){return!d},lock:function(){stack=x;if(!memory||memory===true){self.disable()}return this},locked:function(){return!stack},fireWith:function(a,b){if(stack){if(firing){if(!c.once){stack.push([a,b])}}else if(!(c.once&&memory)){fire(a,b)}}return this},fire:function(){self.fireWith(this,arguments);return this},fired:function(){return!!memory}};return self};var B=[].slice;z.extend({Deferred:function(h){var i=z.Callbacks("once memory"),failList=z.Callbacks("once memory"),progressList=z.Callbacks("memory"),state="pending",lists={resolve:i,reject:failList,notify:progressList},promise={done:i.add,fail:failList.add,progress:progressList.add,state:function(){return state},isResolved:i.fired,isRejected:failList.fired,then:function(a,b,c){deferred.done(a).fail(b).progress(c);return this},always:function(){return deferred.done.apply(deferred,arguments).fail.apply(deferred,arguments)},pipe:function(e,f,g){return z.Deferred(function(d){z.each({done:[e,"resolve"],fail:[f,"reject"],progress:[g,"notify"]},function(a,b){var c=b[0],action=b[1],returned;if(z.isFunction(c)){deferred[a](function(){returned=c.apply(this,arguments);if(returned&&z.isFunction(returned.promise)){returned.promise().then(d.resolve,d.reject,d.notify)}else{d[action+"With"](this===deferred?d:this,[returned])}})}else{deferred[a](d[action])}})}).promise()},promise:function(a){if(a==null){a=promise}else{for(var b in promise){a[b]=promise[b]}}return a}},deferred=promise.promise({}),key;for(key in lists){deferred[key]=lists[key].fire;deferred[key+"With"]=lists[key].fireWith}deferred.done(function(){state="resolved"},failList.disable,progressList.lock).fail(function(){state="rejected"},i.disable,progressList.lock);if(h){h.call(deferred,deferred)}return deferred},when:function(b){var c=B.call(arguments,0),i=0,length=c.length,pValues=new Array(length),count=length,pCount=length,deferred=length<=1&&b&&z.isFunction(b.promise)?b:z.Deferred(),promise=deferred.promise();function resolveFunc(i){return function(a){c[i]=arguments.length>1?B.call(arguments,0):a;if(!(--count)){deferred.resolveWith(deferred,c)}}}function progressFunc(i){return function(a){pValues[i]=arguments.length>1?B.call(arguments,0):a;deferred.notifyWith(promise,pValues)}}if(length>1){for(;i<length;i++){if(c[i]&&c[i].promise&&z.isFunction(c[i].promise)){c[i].promise().then(resolveFunc(i),deferred.reject,progressFunc(i))}else{--count}}if(!count){deferred.resolveWith(deferred,c)}}else if(deferred!==b){deferred.resolveWith(deferred,length?[b]:[])}return promise}});z.support=(function(){var b=y.createElement("div"),documentElement=y.documentElement,all,a,select,opt,input,marginDiv,support,fragment,body,testElementParent,testElement,testElementStyle,tds,events,eventName,i,isSupported;b.setAttribute("className","t");b.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/><nav></nav>";all=b.getElementsByTagName("*");a=b.getElementsByTagName("a")[0];if(!all||!all.length||!a){return{}}select=y.createElement("select");opt=select.appendChild(y.createElement("option"));input=b.getElementsByTagName("input")[0];support={leadingWhitespace:(b.firstChild.nodeType===3),tbody:!b.getElementsByTagName("tbody").length,htmlSerialize:!!b.getElementsByTagName("link").length,style:/top/.test(a.getAttribute("style")),hrefNormalized:(a.getAttribute("href")==="/a"),opacity:/^0.55/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,unknownElems:!!b.getElementsByTagName("nav").length,checkOn:(input.value==="on"),optSelected:opt.selected,getSetAttribute:b.className!=="t",enctype:!!y.createElement("form").enctype,submitBubbles:true,changeBubbles:true,focusinBubbles:false,deleteExpando:true,noCloneEvent:true,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableMarginRight:true};input.checked=true;support.noCloneChecked=input.cloneNode(true).checked;select.disabled=true;support.optDisabled=!opt.disabled;try{delete b.test}catch(e){support.deleteExpando=false}if(!b.addEventListener&&b.attachEvent&&b.fireEvent){b.attachEvent("onclick",function(){support.noCloneEvent=false});b.cloneNode(true).fireEvent("onclick")}input=y.createElement("input");input.value="t";input.setAttribute("type","radio");support.radioValue=input.value==="t";input.setAttribute("checked","checked");b.appendChild(input);fragment=y.createDocumentFragment();fragment.appendChild(b.lastChild);support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;b.innerHTML="";b.style.width=b.style.paddingLeft="1px";body=y.getElementsByTagName("body")[0];testElement=y.createElement(body?"div":"body");testElementStyle={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if(body){z.extend(testElementStyle,{position:"absolute",left:"-999px",top:"-999px"})}for(i in testElementStyle){testElement.style[i]=testElementStyle[i]}testElement.appendChild(b);testElementParent=body||documentElement;testElementParent.insertBefore(testElement,testElementParent.firstChild);support.appendChecked=input.checked;support.boxModel=b.offsetWidth===2;if("zoom"in b.style){b.style.display="inline";b.style.zoom=1;support.inlineBlockNeedsLayout=(b.offsetWidth===2);b.style.display="";b.innerHTML="<div style='width:4px;'></div>";support.shrinkWrapBlocks=(b.offsetWidth!==2)}b.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";tds=b.getElementsByTagName("td");isSupported=(tds[0].offsetHeight===0);tds[0].style.display="";tds[1].style.display="none";support.reliableHiddenOffsets=isSupported&&(tds[0].offsetHeight===0);b.innerHTML="";if(y.defaultView&&y.defaultView.getComputedStyle){marginDiv=y.createElement("div");marginDiv.style.width="0";marginDiv.style.marginRight="0";b.appendChild(marginDiv);support.reliableMarginRight=(parseInt((y.defaultView.getComputedStyle(marginDiv,null)||{marginRight:0}).marginRight,10)||0)===0}if(b.attachEvent){for(i in{submit:1,change:1,focusin:1}){eventName="on"+i;isSupported=(eventName in b);if(!isSupported){b.setAttribute(eventName,"return;");isSupported=(typeof b[eventName]==="function")}support[i+"Bubbles"]=isSupported}}z(function(){var a,outer,inner,table,td,offsetSupport,conMarginTop=1,ptlm="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",vb="visibility:hidden;border:0;",style="style='"+ptlm+"border:5px solid #000;padding:0;'",html="<div "+style+"><div></div></div>"+"<table "+style+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>";body=y.getElementsByTagName("body")[0];if(!body){return}a=y.createElement("div");a.style.cssText=vb+"width:0;height:0;position:static;top:0;margin-top:"+conMarginTop+"px";body.insertBefore(a,body.firstChild);testElement=y.createElement("div");testElement.style.cssText=ptlm+vb;testElement.innerHTML=html;a.appendChild(testElement);outer=testElement.firstChild;inner=outer.firstChild;td=outer.nextSibling.firstChild.firstChild;offsetSupport={doesNotAddBorder:(inner.offsetTop!==5),doesAddBorderForTableAndCells:(td.offsetTop===5)};inner.style.position="fixed";inner.style.top="20px";offsetSupport.fixedPosition=(inner.offsetTop===20||inner.offsetTop===15);inner.style.position=inner.style.top="";outer.style.overflow="hidden";outer.style.position="relative";offsetSupport.subtractsBorderForOverflowNotVisible=(inner.offsetTop===-5);offsetSupport.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==conMarginTop);body.removeChild(a);testElement=a=null;z.extend(support,offsetSupport)});testElement.innerHTML="";testElementParent.removeChild(testElement);testElement=fragment=select=opt=body=marginDiv=b=input=null;return support})();z.boxModel=z.support.boxModel;var C=/^(?:\{.*\}|\[.*\])$/,rmultiDash=/([A-Z])/g;z.extend({cache:{},uuid:0,expando:"jQuery"+(z.fn.jquery+Math.random()).replace(/\D/g,""),noData:{"embed":true,"object":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000","applet":true},hasData:function(a){a=a.nodeType?z.cache[a[z.expando]]:a[z.expando];return!!a&&!isEmptyDataObject(a)},data:function(a,b,c,d){if(!z.acceptData(a)){return}var e,thisCache,ret,internalKey=z.expando,getByName=typeof b==="string",isNode=a.nodeType,cache=isNode?z.cache:a,id=isNode?a[z.expando]:a[z.expando]&&z.expando,isEvents=b==="events";if((!id||!cache[id]||(!isEvents&&!d&&!cache[id].data))&&getByName&&c===x){return}if(!id){if(isNode){a[z.expando]=id=++z.uuid}else{id=z.expando}}if(!cache[id]){cache[id]={};if(!isNode){cache[id].toJSON=z.noop}}if(typeof b==="object"||typeof b==="function"){if(d){cache[id]=z.extend(cache[id],b)}else{cache[id].data=z.extend(cache[id].data,b)}}e=thisCache=cache[id];if(!d){if(!thisCache.data){thisCache.data={}}thisCache=thisCache.data}if(c!==x){thisCache[z.camelCase(b)]=c}if(isEvents&&!thisCache[b]){return e.events}if(getByName){ret=thisCache[b];if(ret==null){ret=thisCache[z.camelCase(b)]}}else{ret=thisCache}return ret},removeData:function(a,b,c){if(!z.acceptData(a)){return}var d,i,l,internalKey=z.expando,isNode=a.nodeType,cache=isNode?z.cache:a,id=isNode?a[z.expando]:z.expando;if(!cache[id]){return}if(b){d=c?cache[id]:cache[id].data;if(d){if(z.isArray(b)){b=b}else if(b in d){b=[b]}else{b=z.camelCase(b);if(b in d){b=[b]}else{b=b.split(" ")}}for(i=0,l=b.length;i<l;i++){delete d[b[i]]}if(!(c?isEmptyDataObject:z.isEmptyObject)(d)){return}}}if(!c){delete cache[id].data;if(!isEmptyDataObject(cache[id])){return}}if(z.support.deleteExpando||!cache.setInterval){delete cache[id]}else{cache[id]=null}if(isNode){if(z.support.deleteExpando){delete a[z.expando]}else if(a.removeAttribute){a.removeAttribute(z.expando)}else{a[z.expando]=null}}},_data:function(a,b,c){return z.data(a,b,c,true)},acceptData:function(a){if(a.nodeName){var b=z.noData[a.nodeName.toLowerCase()];if(b){return!(b===true||a.getAttribute("classid")!==b)}}return true}});z.fn.extend({data:function(b,c){var d,attr,name,data=null;if(typeof b==="undefined"){if(this.length){data=z.data(this[0]);if(this[0].nodeType===1&&!z._data(this[0],"parsedAttrs")){attr=this[0].attributes;for(var i=0,l=attr.length;i<l;i++){name=attr[i].name;if(name.indexOf("data-")===0){name=z.camelCase(name.substring(5));dataAttr(this[0],name,data[name])}}z._data(this[0],"parsedAttrs",true)}}return data}else if(typeof b==="object"){return this.each(function(){z.data(this,b)})}d=b.split(".");d[1]=d[1]?"."+d[1]:"";if(c===x){data=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(data===x&&this.length){data=z.data(this[0],b);data=dataAttr(this[0],b,data)}return data===x&&d[1]?this.data(d[0]):data}else{return this.each(function(){var a=z(this),args=[d[0],c];a.triggerHandler("setData"+d[1]+"!",args);z.data(this,b,c);a.triggerHandler("changeData"+d[1]+"!",args)})}},removeData:function(a){return this.each(function(){z.removeData(this,a)})}});function dataAttr(a,b,c){if(c===x&&a.nodeType===1){var d="data-"+b.replace(rmultiDash,"-$1").toLowerCase();c=a.getAttribute(d);if(typeof c==="string"){try{c=c==="true"?true:c==="false"?false:c==="null"?null:z.isNumeric(c)?parseFloat(c):C.test(c)?z.parseJSON(c):c}catch(e){}z.data(a,b,c)}else{c=x}}return c}function isEmptyDataObject(a){for(var b in a){if(b==="data"&&z.isEmptyObject(a[b])){continue}if(b!=="toJSON"){return false}}return true}function handleQueueMarkDefer(a,b,c){var d=b+"defer",queueDataKey=b+"queue",markDataKey=b+"mark",defer=z._data(a,d);if(defer&&(c==="queue"||!z._data(a,queueDataKey))&&(c==="mark"||!z._data(a,markDataKey))){setTimeout(function(){if(!z._data(a,queueDataKey)&&!z._data(a,markDataKey)){z.removeData(a,d,true);defer.fire()}},0)}}z.extend({_mark:function(a,b){if(a){b=(b||"fx")+"mark";z._data(a,b,(z._data(a,b)||0)+1)}},_unmark:function(a,b,c){if(a!==true){c=b;b=a;a=false}if(b){c=c||"fx";var d=c+"mark",count=a?0:((z._data(b,d)||1)-1);if(count){z._data(b,d,count)}else{z.removeData(b,d,true);handleQueueMarkDefer(b,c,"mark")}}},queue:function(a,b,c){var q;if(a){b=(b||"fx")+"queue";q=z._data(a,b);if(c){if(!q||z.isArray(c)){q=z._data(a,b,z.makeArray(c))}else{q.push(c)}}return q||[]}},dequeue:function(a,b){b=b||"fx";var c=z.queue(a,b),fn=c.shift(),hooks={};if(fn==="inprogress"){fn=c.shift()}if(fn){if(b==="fx"){c.unshift("inprogress")}z._data(a,b+".run",hooks);fn.call(a,function(){z.dequeue(a,b)},hooks)}if(!c.length){z.removeData(a,b+"queue "+b+".run",true);handleQueueMarkDefer(a,b,"queue")}}});z.fn.extend({queue:function(b,c){if(typeof b!=="string"){c=b;b="fx"}if(c===x){return z.queue(this[0],b)}return this.each(function(){var a=z.queue(this,b,c);if(b==="fx"&&a[0]!=="inprogress"){z.dequeue(this,b)}})},dequeue:function(a){return this.each(function(){z.dequeue(this,a)})},delay:function(d,e){d=z.fx?z.fx.speeds[d]||d:d;e=e||"fx";return this.queue(e,function(a,b){var c=setTimeout(a,d);b.stop=function(){clearTimeout(c)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){if(typeof a!=="string"){b=a;a=x}a=a||"fx";var c=z.Deferred(),elements=this,i=elements.length,count=1,deferDataKey=a+"defer",queueDataKey=a+"queue",markDataKey=a+"mark",tmp;function resolve(){if(!(--count)){c.resolveWith(elements,[elements])}}while(i--){if((tmp=z.data(elements[i],deferDataKey,x,true)||(z.data(elements[i],queueDataKey,x,true)||z.data(elements[i],markDataKey,x,true))&&z.data(elements[i],deferDataKey,z.Callbacks("once memory"),true))){count++;tmp.add(resolve)}}resolve();return c.promise()}});var D=/[\n\t\r]/g,rspace=/\s+/,rreturn=/\r/g,rtype=/^(?:button|input)$/i,rfocusable=/^(?:button|input|object|select|textarea)$/i,rclickable=/^a(?:rea)?$/i,rboolean=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,getSetAttribute=z.support.getSetAttribute,nodeHook,boolHook,fixSpecified;z.fn.extend({attr:function(a,b){return z.access(this,a,b,true,z.attr)},removeAttr:function(a){return this.each(function(){z.removeAttr(this,a)})},prop:function(a,b){return z.access(this,a,b,true,z.prop)},removeProp:function(a){a=z.propFix[a]||a;return this.each(function(){try{this[a]=x;delete this[a]}catch(e){}})},addClass:function(a){var b,i,l,elem,setClass,c,cl;if(z.isFunction(a)){return this.each(function(j){z(this).addClass(a.call(this,j,this.className))})}if(a&&typeof a==="string"){b=a.split(rspace);for(i=0,l=this.length;i<l;i++){elem=this[i];if(elem.nodeType===1){if(!elem.className&&b.length===1){elem.className=a}else{setClass=" "+elem.className+" ";for(c=0,cl=b.length;c<cl;c++){if(!~setClass.indexOf(" "+b[c]+" ")){setClass+=b[c]+" "}}elem.className=z.trim(setClass)}}}}return this},removeClass:function(a){var b,i,l,elem,className,c,cl;if(z.isFunction(a)){return this.each(function(j){z(this).removeClass(a.call(this,j,this.className))})}if((a&&typeof a==="string")||a===x){b=(a||"").split(rspace);for(i=0,l=this.length;i<l;i++){elem=this[i];if(elem.nodeType===1&&elem.className){if(a){className=(" "+elem.className+" ").replace(D," ");for(c=0,cl=b.length;c<cl;c++){className=className.replace(" "+b[c]+" "," ")}elem.className=z.trim(className)}else{elem.className=""}}}}return this},toggleClass:function(b,c){var d=typeof b,isBool=typeof c==="boolean";if(z.isFunction(b)){return this.each(function(i){z(this).toggleClass(b.call(this,i,this.className,c),c)})}return this.each(function(){if(d==="string"){var a,i=0,self=z(this),state=c,classNames=b.split(rspace);while((a=classNames[i++])){state=isBool?state:!self.hasClass(a);self[state?"addClass":"removeClass"](a)}}else if(d==="undefined"||d==="boolean"){if(this.className){z._data(this,"__className__",this.className)}this.className=this.className||b===false?"":z._data(this,"__className__")||""}})},hasClass:function(a){var b=" "+a+" ",i=0,l=this.length;for(;i<l;i++){if(this[i].nodeType===1&&(" "+this[i].className+" ").replace(D," ").indexOf(b)>-1){return true}}return false},val:function(c){var d,ret,isFunction,elem=this[0];if(!arguments.length){if(elem){d=z.valHooks[elem.nodeName.toLowerCase()]||z.valHooks[elem.type];if(d&&"get"in d&&(ret=d.get(elem,"value"))!==x){return ret}ret=elem.value;return typeof ret==="string"?ret.replace(rreturn,""):ret==null?"":ret}return x}isFunction=z.isFunction(c);return this.each(function(i){var b=z(this),val;if(this.nodeType!==1){return}if(isFunction){val=c.call(this,i,b.val())}else{val=c}if(val==null){val=""}else if(typeof val==="number"){val+=""}else if(z.isArray(val)){val=z.map(val,function(a){return a==null?"":a+""})}d=z.valHooks[this.nodeName.toLowerCase()]||z.valHooks[this.type];if(!d||!("set"in d)||d.set(this,val,"value")===x){this.value=val}})}});z.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,i,max,option,index=a.selectedIndex,values=[],options=a.options,one=a.type==="select-one";if(index<0){return null}i=one?index:0;max=one?index+1:options.length;for(;i<max;i++){option=options[i];if(option.selected&&(z.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!z.nodeName(option.parentNode,"optgroup"))){b=z(option).val();if(one){return b}values.push(b)}}if(one&&!values.length&&options.length){return z(options[index]).val()}return values},set:function(a,b){var c=z.makeArray(b);z(a).find("option").each(function(){this.selected=z.inArray(z(this).val(),c)>=0});if(!c.length){a.selectedIndex=-1}return c}}},attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,c,d){var e,hooks,notxml,nType=a.nodeType;if(!a||nType===3||nType===8||nType===2){return x}if(d&&b in z.attrFn){return z(a)[b](c)}if(!("getAttribute"in a)){return z.prop(a,b,c)}notxml=nType!==1||!z.isXMLDoc(a);if(notxml){b=b.toLowerCase();hooks=z.attrHooks[b]||(rboolean.test(b)?boolHook:nodeHook)}if(c!==x){if(c===null){z.removeAttr(a,b);return x}else if(hooks&&"set"in hooks&&notxml&&(e=hooks.set(a,c,b))!==x){return e}else{a.setAttribute(b,""+c);return c}}else if(hooks&&"get"in hooks&&notxml&&(e=hooks.get(a,b))!==null){return e}else{e=a.getAttribute(b);return e===null?x:e}},removeAttr:function(a,b){var c,attrNames,name,l,i=0;if(a.nodeType===1){attrNames=(b||"").split(rspace);l=attrNames.length;for(;i<l;i++){name=attrNames[i].toLowerCase();c=z.propFix[name]||name;z.attr(a,name,"");a.removeAttribute(getSetAttribute?name:c);if(rboolean.test(name)&&c in a){a[c]=false}}}},attrHooks:{type:{set:function(a,b){if(rtype.test(a.nodeName)&&a.parentNode){z.error("type property can't be changed")}else if(!z.support.radioValue&&b==="radio"&&z.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b);if(c){a.value=c}return b}}},value:{get:function(a,b){if(nodeHook&&z.nodeName(a,"button")){return nodeHook.get(a,b)}return b in a?a.value:null},set:function(a,b,c){if(nodeHook&&z.nodeName(a,"button")){return nodeHook.set(a,b,c)}a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,b,c){var d,hooks,notxml,nType=a.nodeType;if(!a||nType===3||nType===8||nType===2){return x}notxml=nType!==1||!z.isXMLDoc(a);if(notxml){b=z.propFix[b]||b;hooks=z.propHooks[b]}if(c!==x){if(hooks&&"set"in hooks&&(d=hooks.set(a,c,b))!==x){return d}else{return(a[b]=c)}}else{if(hooks&&"get"in hooks&&(d=hooks.get(a,b))!==null){return d}else{return a[b]}}},propHooks:{tabIndex:{get:function(a){var b=a.getAttributeNode("tabindex");return b&&b.specified?parseInt(b.value,10):rfocusable.test(a.nodeName)||rclickable.test(a.nodeName)&&a.href?0:x}}}});z.attrHooks.tabindex=z.propHooks.tabIndex;boolHook={get:function(a,b){var c,property=z.prop(a,b);return property===true||typeof property!=="boolean"&&(c=a.getAttributeNode(b))&&c.nodeValue!==false?b.toLowerCase():x},set:function(a,b,c){var d;if(b===false){z.removeAttr(a,c)}else{d=z.propFix[c]||c;if(d in a){a[d]=true}a.setAttribute(c,c.toLowerCase())}return c}};if(!getSetAttribute){fixSpecified={name:true,id:true};nodeHook=z.valHooks.button={get:function(a,b){var c;c=a.getAttributeNode(b);return c&&(fixSpecified[b]?c.nodeValue!=="":c.specified)?c.nodeValue:x},set:function(a,b,c){var d=a.getAttributeNode(c);if(!d){d=y.createAttribute(c);a.setAttributeNode(d)}return(d.nodeValue=b+"")}};z.attrHooks.tabindex.set=nodeHook.set;z.each(["width","height"],function(i,c){z.attrHooks[c]=z.extend(z.attrHooks[c],{set:function(a,b){if(b===""){a.setAttribute(c,"auto");return b}}})});z.attrHooks.contenteditable={get:nodeHook.get,set:function(a,b,c){if(b===""){b="false"}nodeHook.set(a,b,c)}}}if(!z.support.hrefNormalized){z.each(["href","src","width","height"],function(i,c){z.attrHooks[c]=z.extend(z.attrHooks[c],{get:function(a){var b=a.getAttribute(c,2);return b===null?x:b}})})}if(!z.support.style){z.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||x},set:function(a,b){return(a.style.cssText=""+b)}}}if(!z.support.optSelected){z.propHooks.selected=z.extend(z.propHooks.selected,{get:function(a){var b=a.parentNode;if(b){b.selectedIndex;if(b.parentNode){b.parentNode.selectedIndex}}return null}})}if(!z.support.enctype){z.propFix.enctype="encoding"}if(!z.support.checkOn){z.each(["radio","checkbox"],function(){z.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}})}z.each(["radio","checkbox"],function(){z.valHooks[this]=z.extend(z.valHooks[this],{set:function(a,b){if(z.isArray(b)){return(a.checked=z.inArray(z(a).val(),b)>=0)}}})});var E=/\.(.*)$/,rformElems=/^(?:textarea|input|select)$/i,rperiod=/\./g,rspaces=/ /g,rescape=/[^\w\s.|`]/g,rtypenamespace=/^([^\.]*)?(?:\.(.+))?$/,rhoverHack=/\bhover(\.\S+)?/,rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|contextmenu)|click/,rquickIs=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,quickParse=function(a){var b=rquickIs.exec(a);if(b){b[1]=(b[1]||"").toLowerCase();b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)")}return b},quickIs=function(a,m){return((!m[1]||a.nodeName.toLowerCase()===m[1])&&(!m[2]||a.id===m[2])&&(!m[3]||m[3].test(a.className)))},hoverHack=function(a){return z.event.special.hover?a:a.replace(rhoverHack,"mouseenter$1 mouseleave$1")};z.event={add:function(a,b,c,d,f){var g,eventHandle,events,t,tns,type,namespaces,handleObj,handleObjIn,quick,handlers,special;if(a.nodeType===3||a.nodeType===8||!b||!c||!(g=z._data(a))){return}if(c.handler){handleObjIn=c;c=handleObjIn.handler}if(!c.guid){c.guid=z.guid++}events=g.events;if(!events){g.events=events={}}eventHandle=g.handle;if(!eventHandle){g.handle=eventHandle=function(e){return typeof z!=="undefined"&&(!e||z.event.triggered!==e.type)?z.event.dispatch.apply(eventHandle.elem,arguments):x};eventHandle.elem=a}b=hoverHack(b).split(" ");for(t=0;t<b.length;t++){tns=rtypenamespace.exec(b[t])||[];type=tns[1];namespaces=(tns[2]||"").split(".").sort();special=z.event.special[type]||{};type=(f?special.delegateType:special.bindType)||type;special=z.event.special[type]||{};handleObj=z.extend({type:type,origType:tns[1],data:d,handler:c,guid:c.guid,selector:f,namespace:namespaces.join(".")},handleObjIn);if(f){handleObj.quick=quickParse(f);if(!handleObj.quick&&z.expr.match.POS.test(f)){handleObj.isPositional=true}}handlers=events[type];if(!handlers){handlers=events[type]=[];handlers.delegateCount=0;if(!special.setup||special.setup.call(a,d,namespaces,eventHandle)===false){if(a.addEventListener){a.addEventListener(type,eventHandle,false)}else if(a.attachEvent){a.attachEvent("on"+type,eventHandle)}}}if(special.add){special.add.call(a,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=c.guid}}if(f){handlers.splice(handlers.delegateCount++,0,handleObj)}else{handlers.push(handleObj)}z.event.global[type]=true}a=null},global:{},remove:function(a,b,c,d){var e=z.hasData(a)&&z._data(a),t,tns,type,namespaces,origCount,j,events,special,handle,eventType,handleObj;if(!e||!(events=e.events)){return}b=hoverHack(b||"").split(" ");for(t=0;t<b.length;t++){tns=rtypenamespace.exec(b[t])||[];type=tns[1];namespaces=tns[2];if(!type){namespaces=namespaces?"."+namespaces:"";for(j in events){z.event.remove(a,j+namespaces,c,d)}return}special=z.event.special[type]||{};type=(d?special.delegateType:special.bindType)||type;eventType=events[type]||[];origCount=eventType.length;namespaces=namespaces?new RegExp("(^|\\.)"+namespaces.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;if(c||namespaces||d||special.remove){for(j=0;j<eventType.length;j++){handleObj=eventType[j];if(!c||c.guid===handleObj.guid){if(!namespaces||namespaces.test(handleObj.namespace)){if(!d||d===handleObj.selector||d==="**"&&handleObj.selector){eventType.splice(j--,1);if(handleObj.selector){eventType.delegateCount--}if(special.remove){special.remove.call(a,handleObj)}}}}}}else{eventType.length=0}if(eventType.length===0&&origCount!==eventType.length){if(!special.teardown||special.teardown.call(a,namespaces)===false){z.removeEvent(a,type,e.handle)}delete events[type]}}if(z.isEmptyObject(events)){handle=e.handle;if(handle){handle.elem=null}z.removeData(a,["events","handle"],true)}},customEvent:{"getData":true,"setData":true,"changeData":true},trigger:function(a,b,c,d){if(c&&(c.nodeType===3||c.nodeType===8)){return}var e=a.type||a,namespaces=[],cache,exclusive,i,cur,old,ontype,special,handle,eventPath,bubbleType;if(e.indexOf("!")>=0){e=e.slice(0,-1);exclusive=true}if(e.indexOf(".")>=0){namespaces=e.split(".");e=namespaces.shift();namespaces.sort()}if((!c||z.event.customEvent[e])&&!z.event.global[e]){return}a=typeof a==="object"?a[z.expando]?a:new z.Event(e,a):new z.Event(e);a.type=e;a.isTrigger=true;a.exclusive=exclusive;a.namespace=namespaces.join(".");a.namespace_re=a.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.)?")+"(\\.|$)"):null;ontype=e.indexOf(":")<0?"on"+e:"";if(d||!c){a.preventDefault()}if(!c){cache=z.cache;for(i in cache){if(cache[i].events&&cache[i].events[e]){z.event.trigger(a,b,cache[i].handle.elem,true)}}return}a.result=x;if(!a.target){a.target=c}b=b!=null?z.makeArray(b):[];b.unshift(a);special=z.event.special[e]||{};if(special.trigger&&special.trigger.apply(c,b)===false){return}eventPath=[[c,special.bindType||e]];if(!d&&!special.noBubble&&!z.isWindow(c)){bubbleType=special.delegateType||e;old=null;for(cur=c.parentNode;cur;cur=cur.parentNode){eventPath.push([cur,bubbleType]);old=cur}if(old&&old===c.ownerDocument){eventPath.push([old.defaultView||old.parentWindow||w,bubbleType])}}for(i=0;i<eventPath.length;i++){cur=eventPath[i][0];a.type=eventPath[i][1];handle=(z._data(cur,"events")||{})[a.type]&&z._data(cur,"handle");if(handle){handle.apply(cur,b)}if((e=='focus')||(e=='dialogfocus')||(e=='dragstart')||(e=='drag')||(e=='dialogdragstop'))return;handle=ontype&&cur[ontype];if(handle&&z.acceptData(cur)){handle.apply(cur,b)}if(a.isPropagationStopped()){break}}a.type=e;if(!a.isDefaultPrevented()){if((!special._default||special._default.apply(c.ownerDocument,b)===false)&&!(e==="click"&&z.nodeName(c,"a"))&&z.acceptData(c)){if(ontype&&c[e]&&((e!=="focus"&&e!=="blur")||a.target.offsetWidth!==0)&&!z.isWindow(c)){old=c[ontype];if(old){c[ontype]=null}z.event.triggered=e;c[e]();z.event.triggered=x;if(old){c[ontype]=old}}}}return a.result},dispatch:function(a){a=z.event.fix(a||w.event);var b=((z._data(this,"events")||{})[a.type]||[]),delegateCount=b.delegateCount,args=[].slice.call(arguments,0),run_all=!a.exclusive&&!a.namespace,specialHandle=(z.event.special[a.type]||{}).handle,handlerQueue=[],i,j,cur,ret,selMatch,matched,matches,handleObj,sel,hit,related;args[0]=a;a.delegateTarget=this;if(delegateCount&&!a.target.disabled&&!(a.button&&a.type==="click")){for(cur=a.target;cur!=this;cur=cur.parentNode||this){selMatch={};matches=[];for(i=0;i<delegateCount;i++){handleObj=b[i];sel=handleObj.selector;hit=selMatch[sel];if(handleObj.isPositional){hit=(hit||(selMatch[sel]=z(sel))).index(cur)>=0}else if(hit===x){hit=selMatch[sel]=(handleObj.quick?quickIs(cur,handleObj.quick):z(cur).is(sel))}if(hit){matches.push(handleObj)}}if(matches.length){handlerQueue.push({elem:cur,matches:matches})}}}if(b.length>delegateCount){handlerQueue.push({elem:this,matches:b.slice(delegateCount)})}for(i=0;i<handlerQueue.length&&!a.isPropagationStopped();i++){matched=handlerQueue[i];a.currentTarget=matched.elem;for(j=0;j<matched.matches.length&&!a.isImmediatePropagationStopped();j++){handleObj=matched.matches[j];if(run_all||(!a.namespace&&!handleObj.namespace)||a.namespace_re&&a.namespace_re.test(handleObj.namespace)){a.data=handleObj.data;a.handleObj=handleObj;ret=(specialHandle||handleObj.handler).apply(matched.elem,args);if(ret!==x){a.result=ret;if(ret===false){a.preventDefault();a.stopPropagation()}}}}}return a.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){if(a.which==null){a.which=b.charCode!=null?b.charCode:b.keyCode}return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement wheelDelta".split(" "),filter:function(a,b){var c,doc,body,button=b.button,fromElement=b.fromElement;if(a.pageX==null&&b.clientX!=null){c=a.target.ownerDocument||y;doc=c.documentElement;body=c.body;a.pageX=b.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);a.pageY=b.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)}if(!a.relatedTarget&&fromElement){a.relatedTarget=fromElement===a.target?b.toElement:fromElement}if(!a.which&&button!==x){a.which=(button&1?1:(button&2?3:(button&4?2:0)))}return a}},fix:function(a){if(a[z.expando]){return a}var i,prop,originalEvent=a,fixHook=z.event.fixHooks[a.type]||{},copy=fixHook.props?this.props.concat(fixHook.props):this.props;a=z.Event(originalEvent);for(i=copy.length;i;){prop=copy[--i];a[prop]=originalEvent[prop]}if(!a.target){a.target=originalEvent.srcElement||y}if(a.target.nodeType===3){a.target=a.target.parentNode}if(a.metaKey===x){a.metaKey=a.ctrlKey}return fixHook.filter?fixHook.filter(a,originalEvent):a},special:{ready:{setup:z.bindReady},focus:{delegateType:"focusin",noBubble:true},blur:{delegateType:"focusout",noBubble:true},beforeunload:{setup:function(a,b,c){if(z.isWindow(this)){this.onbeforeunload=c}},teardown:function(a,b){if(this.onbeforeunload===b){this.onbeforeunload=null}}}},simulate:function(a,b,c,d){var e=z.extend(new z.Event(),c,{type:a,isSimulated:true,originalEvent:{}});if(d){z.event.trigger(e,null,b)}else{z.event.dispatch.call(b,e)}if(e.isDefaultPrevented()){c.preventDefault()}}};z.event.handle=z.event.dispatch;z.removeEvent=y.removeEventListener?function(a,b,c){if(a.removeEventListener){a.removeEventListener(b,c,false)}}:function(a,b,c){if(a.detachEvent){a.detachEvent("on"+b,c)}};z.Event=function(a,b){if(!(this instanceof z.Event)){return new z.Event(a,b)}if(a&&a.type){this.originalEvent=a;this.type=a.type;this.isDefaultPrevented=(a.defaultPrevented||a.returnValue===false||a.getPreventDefault&&a.getPreventDefault())?returnTrue:returnFalse}else{this.type=a}if(b){z.extend(this,b)}this.timeStamp=a&&a.timeStamp||z.now();this[z.expando]=true};function returnFalse(){return false}function returnTrue(){return true}z.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;var e=this.originalEvent;if(!e){return}if(e.preventDefault){e.preventDefault()}else{e.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=returnTrue;var e=this.originalEvent;if(!e){return}if(e.stopPropagation){e.stopPropagation()}e.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;this.stopPropagation()},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};z.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(c,d){z.event.special[c]=z.event.special[d]={delegateType:d,bindType:d,handle:function(a){var b=this,related=a.relatedTarget,handleObj=a.handleObj,selector=handleObj.selector,oldType,ret;if(!related||handleObj.origType===a.type||(related!==b&&!z.contains(b,related))){oldType=a.type;a.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);a.type=oldType}return ret}}});if(!z.support.submitBubbles){z.event.special.submit={setup:function(){if(z.nodeName(this,"form")){return false}z.event.add(this,"click._submit keypress._submit",function(e){var b=e.target,form=z.nodeName(b,"input")||z.nodeName(b,"button")?b.form:x;if(form&&!form._submit_attached){z.event.add(form,"submit._submit",function(a){if(this.parentNode){z.event.simulate("submit",this.parentNode,a,true)}});form._submit_attached=true}})},teardown:function(){if(z.nodeName(this,"form")){return false}z.event.remove(this,"._submit")}}}if(!z.support.changeBubbles){z.event.special.change={setup:function(){if(rformElems.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){z.event.add(this,"propertychange._change",function(a){if(a.originalEvent.propertyName==="checked"){this._just_changed=true}});z.event.add(this,"click._change",function(a){if(this._just_changed){this._just_changed=false;z.event.simulate("change",this,a,true)}})}return false}z.event.add(this,"beforeactivate._change",function(e){var b=e.target;if(rformElems.test(b.nodeName)&&!b._change_attached){z.event.add(b,"change._change",function(a){if(this.parentNode&&!a.isSimulated){z.event.simulate("change",this.parentNode,a,true)}});b._change_attached=true}})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||(b.type!=="radio"&&b.type!=="checkbox")){return a.handleObj.handler.apply(this,arguments)}},teardown:function(){z.event.remove(this,"._change");return rformElems.test(this.nodeName)}}}if(!z.support.focusinBubbles){z.each({focus:"focusin",blur:"focusout"},function(b,c){var d=0,handler=function(a){z.event.simulate(c,a.target,z.event.fix(a),true)};z.event.special[c]={setup:function(){if(d++===0){y.addEventListener(b,handler,true)}},teardown:function(){if(--d===0){y.removeEventListener(b,handler,true)}}}})}z.fn.extend({on:function(b,c,d,e,f){var g,type;if(typeof b==="object"){if(typeof c!=="string"){d=c;c=x}for(type in b){this.on(type,c,d,b[type],f)}return this}if(d==null&&e==null){e=c;d=c=x}else if(e==null){if(typeof c==="string"){e=d;d=x}else{e=d;d=c;c=x}}if(e===false){e=returnFalse}else if(!e){return this}if(f===1){g=e;e=function(a){z().off(a);return g.apply(this,arguments)};e.guid=g.guid||(g.guid=z.guid++)}return this.each(function(){z.event.add(this,b,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,b,c){if(a&&a.preventDefault&&a.handleObj){var d=a.handleObj;z(a.delegateTarget).off(d.namespace?d.type+"."+d.namespace:d.type,d.selector,d.handler);return this}if(typeof a==="object"){for(var e in a){this.off(e,b,a[e])}return this}if(b===false||typeof b==="function"){c=b;b=x}if(c===false){c=returnFalse}return this.each(function(){z.event.remove(this,a,c,b)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){z(this.context).on(a,this.selector,b,c);return this},die:function(a,b){z(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){z.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){return z.event.trigger(a,b,this[0],true)}},toggle:function(c){var d=arguments,guid=c.guid||z.guid++,i=0,toggler=function(a){var b=(z._data(this,"lastToggle"+c.guid)||0)%i;z._data(this,"lastToggle"+c.guid,b+1);a.preventDefault();return d[b].apply(this,arguments)||false};toggler.guid=guid;while(i<d.length){d[i++].guid=guid}return this.click(toggler)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});z.each(("blur focus focusin focusout load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup error contextmenu").split(" "),function(i,c){z.fn[c]=function(a,b){if(b==null){b=a;a=null}return arguments.length>0?this.bind(c,a,b):this.trigger(c)};if(z.attrFn){z.attrFn[c]=true}if(rkeyEvent.test(c)){z.event.fixHooks[c]=z.event.keyHooks}if(rmouseEvent.test(c)){z.event.fixHooks[c]=z.event.mouseHooks}});(function(){var k=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,expando="sizcache"+(Math.random()+'').replace('.',''),done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true,rBackslash=/\\/g,rReturn=/\r\n/g,rNonWord=/\W/;[0,0].sort(function(){baseHasDuplicate=false;return 0});var n=function(a,b,c,d){c=c||[];b=b||y;var e=b;if(b.nodeType!==1&&b.nodeType!==9){return[]}if(!a||typeof a!=="string"){return c}var m,set,checkSet,extra,ret,cur,pop,i,prune=true,contextXML=n.isXML(b),parts=[],soFar=a;do{k.exec("");m=k.exec(soFar);if(m){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break}}}while(m);if(parts.length>1&&q.exec(a)){if(parts.length===2&&p.relative[parts[0]]){set=u(parts[0]+parts[1],b,d)}else{set=p.relative[parts[0]]?[b]:n(parts.shift(),b);while(parts.length){a=parts.shift();if(p.relative[a]){a+=parts.shift()}set=u(a,set,d)}}}else{if(!d&&parts.length>1&&b.nodeType===9&&!contextXML&&p.match.ID.test(parts[0])&&!p.match.ID.test(parts[parts.length-1])){ret=n.find(parts.shift(),b,contextXML);b=ret.expr?n.filter(ret.expr,ret.set)[0]:ret.set[0]}if(b){ret=d?{expr:parts.pop(),set:s(d)}:n.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&b.parentNode?b.parentNode:b,contextXML);set=ret.expr?n.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=s(set)}else{prune=false}while(parts.length){cur=parts.pop();pop=cur;if(!p.relative[cur]){cur=""}else{pop=parts.pop()}if(pop==null){pop=b}p.relative[cur](checkSet,pop,contextXML)}}else{checkSet=parts=[]}}if(!checkSet){checkSet=set}if(!checkSet){n.error(cur||a)}if(toString.call(checkSet)==="[object Array]"){if(!prune){c.push.apply(c,checkSet)}else if(b&&b.nodeType===1){for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&n.contains(b,checkSet[i]))){c.push(set[i])}}}else{for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){c.push(set[i])}}}}else{s(checkSet,c)}if(extra){n(extra,e,c,d);n.uniqueSort(c)}return c};n.uniqueSort=function(a){if(t){hasDuplicate=baseHasDuplicate;a.sort(t);if(hasDuplicate){for(var i=1;i<a.length;i++){if(a[i]===a[i-1]){a.splice(i--,1)}}}}return a};n.matches=function(a,b){return n(a,null,null,b)};n.matchesSelector=function(a,b){return n(b,null,null,[a]).length>0};n.find=function(a,b,c){var d,i,len,match,r,left;if(!a){return[]}for(i=0,len=p.order.length;i<len;i++){r=p.order[i];if((match=p.leftMatch[r].exec(a))){left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(rBackslash,"");d=p.find[r](match,b,c);if(d!=null){a=a.replace(p.match[r],"");break}}}}if(!d){d=typeof b.getElementsByTagName!=="undefined"?b.getElementsByTagName("*"):[]}return{set:d,expr:a}};n.filter=function(a,b,c,d){var e,anyFound,r,found,item,filter,left,i,pass,old=a,result=[],curLoop=b,isXMLFilter=b&&b[0]&&n.isXML(b[0]);while(a&&b.length){for(r in p.filter){if((e=p.leftMatch[r].exec(a))!=null&&e[2]){filter=p.filter[r];left=e[1];anyFound=false;e.splice(1,1);if(left.substr(left.length-1)==="\\"){continue}if(curLoop===result){result=[]}if(p.preFilter[r]){e=p.preFilter[r](e,curLoop,c,result,d,isXMLFilter);if(!e){anyFound=found=true}else if(e===true){continue}}if(e){for(i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,e,i,curLoop);pass=d^found;if(c&&found!=null){if(pass){anyFound=true}else{curLoop[i]=false}}else if(pass){result.push(item);anyFound=true}}}}if(found!==x){if(!c){curLoop=result}a=a.replace(p.match[r],"");if(!anyFound){return[]}break}}}if(a===old){if(anyFound==null){n.error(a)}else{break}}old=a}return curLoop};n.error=function(a){throw"Syntax error, unrecognized expression: "+a;};var o=n.getText=function(a){var i,node,nodeType=a.nodeType,ret="";if(nodeType){if(nodeType===1){if(typeof a.textContent==='string'){return a.textContent}else if(typeof a.innerText==='string'){return a.innerText.replace(rReturn,'')}else{for(a=a.firstChild;a;a=a.nextSibling){ret+=o(a)}}}else if(nodeType===3||nodeType===4){return a.nodeValue}}else{for(i=0;(node=a[i]);i++){if(node.nodeType!==8){ret+=o(node)}}}return ret};var p=n.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b==="string",isTag=c&&!rNonWord.test(b),isPartStrNotTag=c&&!isTag;if(isTag){b=b.toLowerCase()}for(var i=0,l=a.length,elem;i<l;i++){if((elem=a[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}a[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===b?elem||false:elem===b}}if(isPartStrNotTag){n.filter(b,a,true)}},">":function(a,b){var c,isPartStr=typeof b==="string",i=0,l=a.length;if(isPartStr&&!rNonWord.test(b)){b=b.toLowerCase();for(;i<l;i++){c=a[i];if(c){var d=c.parentNode;a[i]=d.nodeName.toLowerCase()===b?d:false}}}else{for(;i<l;i++){c=a[i];if(c){a[i]=isPartStr?c.parentNode:c.parentNode===b}}if(isPartStr){n.filter(b,a,true)}}},"":function(a,b,c){var d,doneName=done++,checkFn=dirCheck;if(typeof b==="string"&&!rNonWord.test(b)){b=b.toLowerCase();d=b;checkFn=dirNodeCheck}checkFn("parentNode",b,doneName,a,d,c)},"~":function(a,b,c){var d,doneName=done++,checkFn=dirCheck;if(typeof b==="string"&&!rNonWord.test(b)){b=b.toLowerCase();d=b;checkFn=dirNodeCheck}checkFn("previousSibling",b,doneName,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c){var m=b.getElementById(a[1]);return m&&m.parentNode?[m]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){var c=[],results=b.getElementsByName(a[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===a[1]){c.push(results[i])}}return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!=="undefined"){return b.getElementsByTagName(a[1])}}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(rBackslash,"")+" ";if(f){return a}for(var i=0,elem;(elem=b[i])!=null;i++){if(elem){if(e^(elem.className&&(" "+elem.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)){if(!c){d.push(elem)}}else if(c){b[i]=false}}}return false},ID:function(a){return a[1].replace(rBackslash,"")},TAG:function(a,b){return a[1].replace(rBackslash,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){if(!a[2]){n.error(a[0])}a[2]=a[2].replace(/^\+|\s*/g,'');var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=(b[1]+(b[2]||1))-0;a[3]=b[3]-0}else if(a[2]){n.error(a[0])}a[0]=done++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(rBackslash,"");if(!f&&p.attrMap[g]){a[1]=p.attrMap[g]}a[4]=(a[4]||a[5]||"").replace(rBackslash,"");if(a[2]==="~="){a[4]=" "+a[4]+" "}return a},PSEUDO:function(a,b,c,d,e){if(a[1]==="not"){if((k.exec(a[3])||"").length>1||/^\w/.test(a[3])){a[3]=n(a[3],null,null,b)}else{var f=n.filter(a[3],b,c,true^e);if(!c){d.push.apply(d,f)}return false}}else if(p.match.POS.test(a[0])||p.match.CHILD.test(a[0])){return true}return a},POS:function(a){a.unshift(true);return a}},filters:{enabled:function(a){return a.disabled===false&&a.type!=="hidden"},disabled:function(a){return a.disabled===true},checked:function(a){return a.checked===true},selected:function(a){if(a.parentNode){a.parentNode.selectedIndex}return a.selected===true},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,i,b){return!!n(b[3],a).length},header:function(a){return(/h\d/i).test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),r=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===r&&(b===r||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return(/input|select|textarea|button/i).test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,i){return i===0},last:function(a,i,b,c){return i===c.length-1},even:function(a,i){return i%2===0},odd:function(a,i){return i%2===1},lt:function(a,i,b){return i<b[3]-0},gt:function(a,i,b){return i>b[3]-0},nth:function(a,i,b){return b[3]-0===i},eq:function(a,i,b){return b[3]-0===i}},filter:{PSEUDO:function(a,b,i,c){var d=b[1],filter=p.filters[d];if(filter){return filter(a,i,b,c)}else if(d==="contains"){return(a.textContent||a.innerText||o([a])||"").indexOf(b[3])>=0}else if(d==="not"){var e=b[3];for(var j=0,l=e.length;j<l;j++){if(e[j]===a){return false}}return true}else{n.error(d)}},CHILD:function(a,b){var c,last,doneName,parent,cache,count,diff,r=b[1],node=a;switch(r){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false}}if(r==="first"){return true}node=a;case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false}}return true;case"nth":c=b[2];last=b[3];if(c===1&&last===0){return true}doneName=b[0];parent=a.parentNode;if(parent&&(parent[expando]!==doneName||!a.nodeIndex)){count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count}}parent[expando]=doneName}diff=a.nodeIndex-last;if(c===0){return diff===0}else{return(diff%c===0&&diff/c>=0)}}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return(b==="*"&&a.nodeType===1)||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],result=n.attr?n.attr(a,c):p.attrHandle[c]?p.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),value=result+"",r=b[2],check=b[4];return result==null?r==="!=":!r&&n.attr?result!=null:r==="="?value===check:r==="*="?value.indexOf(check)>=0:r==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:r==="!="?value!==check:r==="^="?value.indexOf(check)===0:r==="$="?value.substr(value.length-check.length)===check:r==="|="?value===check||value.substr(0,check.length+1)===check+"-":false},POS:function(a,b,i,c){var d=b[2],filter=p.setFilters[d];if(filter){return filter(a,i,b,c)}}}};var q=p.match.POS,fescape=function(a,b){return"\\"+(b-0+1)};for(var r in p.match){p.match[r]=new RegExp(p.match[r].source+(/(?![^\[]*\])(?![^\(]*\))/.source));p.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+p.match[r].source.replace(/\\(\d+)/g,fescape))}var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(y.documentElement.childNodes,0)[0].nodeType}catch(e){s=function(a,b){var i=0,ret=b||[];if(toString.call(a)==="[object Array]"){Array.prototype.push.apply(ret,a)}else{if(typeof a.length==="number"){for(var l=a.length;i<l;i++){ret.push(a[i])}}else{for(;a[i];i++){ret.push(a[i])}}}return ret}}var t,siblingCheck;if(y.documentElement.compareDocumentPosition){t=function(a,b){if(a===b){hasDuplicate=true;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1}return a.compareDocumentPosition(b)&4?-1:1}}else{t=function(a,b){if(a===b){hasDuplicate=true;return 0}else if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex}var c,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;if(aup===bup){return siblingCheck(a,b)}else if(!aup){return-1}else if(!bup){return 1}while(cur){ap.unshift(cur);cur=cur.parentNode}cur=bup;while(cur){bp.unshift(cur);cur=cur.parentNode}c=ap.length;bl=bp.length;for(var i=0;i<c&&i<bl;i++){if(ap[i]!==bp[i]){return siblingCheck(ap[i],bp[i])}}return i===c?siblingCheck(a,bp[i],-1):siblingCheck(ap[i],b,1)};siblingCheck=function(a,b,c){if(a===b){return c}var d=a.nextSibling;while(d){if(d===b){return-1}d=d.nextSibling}return 1}}(function(){var d=y.createElement("div"),id="script"+(new Date()).getTime(),root=y.documentElement;d.innerHTML="<a name='"+id+"'/>";root.insertBefore(d,root.firstChild);if(y.getElementById(id)){p.find.ID=function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c){var m=b.getElementById(a[1]);return m?m.id===a[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===a[1]?[m]:x:[]}};p.filter.ID=function(a,b){var c=typeof a.getAttributeNode!=="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}}root.removeChild(d);root=d=null})();(function(){var e=y.createElement("div");e.appendChild(y.createComment(""));if(e.getElementsByTagName("*").length>0){p.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var i=0;c[i];i++){if(c[i].nodeType===1){d.push(c[i])}}c=d}return c}}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){p.attrHandle.href=function(a){return a.getAttribute("href",2)}}e=null})();if(y.querySelectorAll){(function(){var h=n,div=y.createElement("div"),id="__sizzle__";div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return}n=function(a,b,c,d){b=b||y;if(!d&&!n.isXML(b)){var e=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(a);if(e&&(b.nodeType===1||b.nodeType===9)){if(e[1]){return s(b.getElementsByTagName(a),c)}else if(e[2]&&p.find.CLASS&&b.getElementsByClassName){return s(b.getElementsByClassName(e[2]),c)}}if(b.nodeType===9){if(a==="body"&&b.body){return s([b.body],c)}else if(e&&e[3]){var f=b.getElementById(e[3]);if(f&&f.parentNode){if(f.id===e[3]){return s([f],c)}}else{return s([],c)}}try{return s(b.querySelectorAll(a),c)}catch(qsaError){}}else if(b.nodeType===1&&b.nodeName.toLowerCase()!=="object"){var g=b,old=b.getAttribute("id"),nid=old||id,hasParent=b.parentNode,relativeHierarchySelector=/^\s*[+~]/.test(a);if(!old){b.setAttribute("id",nid)}else{nid=nid.replace(/'/g,"\\$&")}if(relativeHierarchySelector&&hasParent){b=b.parentNode}try{if(!relativeHierarchySelector||hasParent){return s(b.querySelectorAll("[id='"+nid+"'] "+a),c)}}catch(pseudoError){}finally{if(!old){g.removeAttribute("id")}}}}return h(a,b,c,d)};for(var i in h){n[i]=h[i]}div=null})()}(function(){var d=y.documentElement,matches=d.matchesSelector||d.mozMatchesSelector||d.webkitMatchesSelector||d.msMatchesSelector;if(matches){var f=!matches.call(y.createElement("div"),"div"),pseudoWorks=false;try{matches.call(y.documentElement,"[test!='']:sizzle")}catch(pseudoError){pseudoWorks=true}n.matchesSelector=function(a,b){b=b.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!n.isXML(a)){try{if(pseudoWorks||!p.match.PSEUDO.test(b)&&!/!=/.test(b)){var c=matches.call(a,b);if(c||!f||a.document&&a.document.nodeType!==11){return c}}}catch(e){}}return n(b,null,null,[a]).length>0}}})();(function(){var d=y.createElement("div");d.innerHTML="<div class='test e'></div><div class='test'></div>";if(!d.getElementsByClassName||d.getElementsByClassName("e").length===0){return}d.lastChild.className="e";if(d.getElementsByClassName("e").length===1){return}p.order.splice(1,0,"CLASS");p.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!=="undefined"&&!c){return b.getElementsByClassName(a[1])}};d=null})();function dirNodeCheck(a,b,c,d,e,f){for(var i=0,l=d.length;i<l;i++){var g=d[i];if(g){var h=false;g=g[a];while(g){if(g[expando]===c){h=d[g.sizset];break}if(g.nodeType===1&&!f){g[expando]=c;g.sizset=i}if(g.nodeName.toLowerCase()===b){h=g;break}g=g[a]}d[i]=h}}}function dirCheck(a,b,c,d,e,f){for(var i=0,l=d.length;i<l;i++){var g=d[i];if(g){var h=false;g=g[a];while(g){if(g[expando]===c){h=d[g.sizset];break}if(g.nodeType===1){if(!f){g[expando]=c;g.sizset=i}if(typeof b!=="string"){if(g===b){h=true;break}}else if(n.filter(b,[g]).length>0){h=g;break}}g=g[a]}d[i]=h}}}if(y.documentElement.contains){n.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true)}}else if(y.documentElement.compareDocumentPosition){n.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}}else{n.contains=function(){return false}}n.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":false};var u=function(a,b,c){var d,tmpSet=[],later="",root=b.nodeType?[b]:b;while((d=p.match.PSEUDO.exec(a))){later+=d[0];a=a.replace(p.match.PSEUDO,"")}a=p.relative[a]?a+"*":a;for(var i=0,l=root.length;i<l;i++){n(a,root[i],tmpSet,c)}return n.filter(later,tmpSet)};n.attr=z.attr;n.selectors.attrMap={};z.find=n;z.expr=n.selectors;z.expr[":"]=z.expr.filters;z.unique=n.uniqueSort;z.text=n.getText;z.isXMLDoc=n.isXML;z.contains=n.contains})();var F=/Until$/,rparentsprev=/^(?:parents|prevUntil|prevAll)/,rmultiselector=/,/,isSimple=/^.[^:#\[\.,]*$/,slice=Array.prototype.slice,POS=z.expr.match.POS,guaranteedUnique={children:true,contents:true,next:true,prev:true};z.fn.extend({find:function(a){var b=this,i,l;if(typeof a!=="string"){return z(a).filter(function(){for(i=0,l=b.length;i<l;i++){if(z.contains(b[i],this)){return true}}})}var c=this.pushStack("","find",a),length,n,r;for(i=0,l=this.length;i<l;i++){length=c.length;z.find(a,this[i],c);if(i>0){for(n=length;n<c.length;n++){for(r=0;r<length;r++){if(c[r]===c[n]){c.splice(n--,1);break}}}}}return c},has:function(a){var b=z(a);return this.filter(function(){for(var i=0,l=b.length;i<l;i++){if(z.contains(this,b[i])){return true}}})},not:function(a){return this.pushStack(winnow(this,a,false),"not",a)},filter:function(a){return this.pushStack(winnow(this,a,true),"filter",a)},is:function(a){return!!a&&(typeof a==="string"?POS.test(a)?z(a,this.context).index(this[0])>=0:z.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],i,l,cur=this[0];if(z.isArray(a)){var d=1;while(cur&&cur.ownerDocument&&cur!==b){for(i=0;i<a.length;i++){if(z(cur).is(a[i])){c.push({selector:a[i],elem:cur,level:d})}}cur=cur.parentNode;d++}return c}var e=POS.test(a)||typeof a!=="string"?z(a,b||this.context):0;for(i=0,l=this.length;i<l;i++){cur=this[i];while(cur){if(e?e.index(cur)>-1:z.find.matchesSelector(cur,a)){c.push(cur);break}else{cur=cur.parentNode;if(!cur||!cur.ownerDocument||cur===b||cur.nodeType===11){break}}}}c=c.length>1?z.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a){return(this[0]&&this[0].parentNode)?this.prevAll().length:-1}if(typeof a==="string"){return z.inArray(this[0],z(a))}return z.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a==="string"?z(a,b):z.makeArray(a&&a.nodeType?[a]:a),all=z.merge(this.get(),c);return this.pushStack(isDisconnected(c[0])||isDisconnected(all[0])?all:z.unique(all))},andSelf:function(){return this.add(this.prevObject)}});function isDisconnected(a){return!a||!a.parentNode||a.parentNode.nodeType===11}z.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return z.dir(a,"parentNode")},parentsUntil:function(a,i,b){return z.dir(a,"parentNode",b)},next:function(a){return z.nth(a,2,"nextSibling")},prev:function(a){return z.nth(a,2,"previousSibling")},nextAll:function(a){return z.dir(a,"nextSibling")},prevAll:function(a){return z.dir(a,"previousSibling")},nextUntil:function(a,i,b){return z.dir(a,"nextSibling",b)},prevUntil:function(a,i,b){return z.dir(a,"previousSibling",b)},siblings:function(a){return z.sibling(a.parentNode.firstChild,a)},children:function(a){return z.sibling(a.firstChild)},contents:function(a){return z.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:z.makeArray(a.childNodes)}},function(d,e){z.fn[d]=function(a,b){var c=z.map(this,e,a),args=slice.call(arguments);if(!F.test(d)){b=a}if(b&&typeof b==="string"){c=z.filter(b,c)}c=this.length>1&&!guaranteedUnique[d]?z.unique(c):c;if((this.length>1||rmultiselector.test(b))&&rparentsprev.test(d)){c=c.reverse()}return this.pushStack(c,d,args.join(","))}});z.extend({filter:function(a,b,c){if(c){a=":not("+a+")"}return b.length===1?z.find.matchesSelector(b[0],a)?[b[0]]:[]:z.find.matches(a,b)},dir:function(a,b,c){var d=[],cur=a[b];while(cur&&cur.nodeType!==9&&(c===x||cur.nodeType!==1||!z(cur).is(c))){if(cur.nodeType===1){d.push(cur)}cur=cur[b]}return d},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c]){if(a.nodeType===1&&++e===b){break}}return a},sibling:function(n,a){var r=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==a){r.push(n)}}return r}});function winnow(c,d,e){d=d||0;if(z.isFunction(d)){return z.grep(c,function(a,i){var b=!!d.call(a,i,a);return b===e})}else if(d.nodeType){return z.grep(c,function(a,i){return(a===d)===e})}else if(typeof d==="string"){var f=z.grep(c,function(a){return a.nodeType===1});if(isSimple.test(d)){return z.filter(d,f,!e)}else{d=z.filter(d,f)}}return z.grep(c,function(a,i){return(z.inArray(a,d)>=0)===e})}function createSafeFragment(a){var b=G.split(" "),safeFrag=a.createDocumentFragment();if(safeFrag.createElement){while(b.length){safeFrag.createElement(b.pop())}}return safeFrag}var G="abbr article aside audio canvas datalist details figcaption figure footer "+"header hgroup mark meter nav output progress section summary time video",rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnoInnerhtml=/<(?:script|style)/i,rnocache=/<(?:script|object|embed|option|style)/i,rnoshimcache=new RegExp("<(?:"+G.replace(" ","|")+")","i"),rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptType=/\/(java|ecma)script/i,rcleanScript=/^\s*<!(?:\[CDATA\[|\-\-)/,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},safeFragment=createSafeFragment(y);wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;if(!z.support.htmlSerialize){wrapMap._default=[1,"div<div>","</div>"]}z.fn.extend({text:function(b){if(z.isFunction(b)){return this.each(function(i){var a=z(this);a.text(b.call(this,i,a.text()))})}if(typeof b!=="object"&&b!==x){return this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(b))}return z.text(this)},wrapAll:function(b){if(z.isFunction(b)){return this.each(function(i){z(this).wrapAll(b.call(this,i))})}if(this[0]){var c=z(b,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){c.insertBefore(this[0])}c.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1){a=a.firstChild}return a}).append(this)}return this},wrapInner:function(b){if(z.isFunction(b)){return this.each(function(i){z(this).wrapInner(b.call(this,i))})}return this.each(function(){var a=z(this),contents=a.contents();if(contents.length){contents.wrapAll(b)}else{a.append(b)}})},wrap:function(a){return this.each(function(){z(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){if(!z.nodeName(this,"body")){z(this).replaceWith(this.childNodes)}}).end()},append:function(){return this.domManip(arguments,true,function(a){if(this.nodeType===1){this.appendChild(a)}})},prepend:function(){return this.domManip(arguments,true,function(a){if(this.nodeType===1){this.insertBefore(a,this.firstChild)}})},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(a){this.parentNode.insertBefore(a,this)})}else if(arguments.length){var b=z(arguments[0]);b.push.apply(b,this.toArray());return this.pushStack(b,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(a){this.parentNode.insertBefore(a,this.nextSibling)})}else if(arguments.length){var b=this.pushStack(this,"after",arguments);b.push.apply(b,z(arguments[0]).toArray());return b}},remove:function(a,b){for(var i=0,elem;(elem=this[i])!=null;i++){if(!a||z.filter(a,[elem]).length){if(!b&&elem.nodeType===1){z.cleanData(elem.getElementsByTagName("*"));z.cleanData([elem])}if(elem.parentNode){elem.parentNode.removeChild(elem)}}}return this},empty:function(){for(var i=0,elem;(elem=this[i])!=null;i++){if(elem.nodeType===1){z.cleanData(elem.getElementsByTagName("*"))}while(elem.firstChild){elem.removeChild(elem.firstChild)}}return this},clone:function(a,b){a=a==null?false:a;b=b==null?a:b;return this.map(function(){return z.clone(this,a,b)})},html:function(b){if(b===x){return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(rinlinejQuery,""):null}else if(typeof b==="string"&&!rnoInnerhtml.test(b)&&(z.support.leadingWhitespace||!rleadingWhitespace.test(b))&&!wrapMap[(rtagName.exec(b)||["",""])[1].toLowerCase()]){b=b.replace(rxhtmlTag,"<$1></$2>");try{for(var i=0,l=this.length;i<l;i++){if(this[i].nodeType===1){z.cleanData(this[i].getElementsByTagName("*"));this[i].innerHTML=b}}}catch(e){this.empty().append(b)}}else if(z.isFunction(b)){this.each(function(i){var a=z(this);a.html(b.call(this,i,a.html()))})}else{this.empty().append(b)}return this},replaceWith:function(b){if(this[0]&&this[0].parentNode){if(z.isFunction(b)){return this.each(function(i){var a=z(this),old=a.html();a.replaceWith(b.call(this,i,old))})}if(typeof b!=="string"){b=z(b).detach()}return this.each(function(){var a=this.nextSibling,parent=this.parentNode;z(this).remove();if(a){z(a).before(b)}else{z(parent).append(b)}})}else{return this.length?this.pushStack(z(z.isFunction(b)?b():b),"replaceWith",b):this}},detach:function(a){return this.remove(a,true)},domManip:function(b,c,d){var e,first,fragment,parent,value=b[0],scripts=[];if(!z.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){z(this).domManip(b,c,d,true)})}if(z.isFunction(value)){return this.each(function(i){var a=z(this);b[0]=value.call(this,i,c?a.html():x);a.domManip(b,c,d)})}if(this[0]){parent=value&&value.parentNode;if(z.support.parentNode&&parent&&parent.nodeType===11&&parent.childNodes.length===this.length){e={fragment:parent}}else{e=z.buildFragment(b,this,scripts)}fragment=e.fragment;if(fragment.childNodes.length===1){first=fragment=fragment.firstChild}else{first=fragment.firstChild}if(first){c=c&&z.nodeName(first,"tr");for(var i=0,l=this.length,lastIndex=l-1;i<l;i++){d.call(c?root(this[i],first):this[i],e.cacheable||(l>1&&i<lastIndex)?z.clone(fragment,true,true):fragment)}}if(scripts.length){z.each(scripts,evalScript)}}return this}});function root(a,b){return z.nodeName(a,"table")?(a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody"))):a}function cloneCopyEvent(a,b){if(b.nodeType!==1||!z.hasData(a)){return}var c,i,l,oldData=z._data(a),curData=z._data(b,oldData),events=oldData.events;if(events){delete curData.handle;curData.events={};for(c in events){for(i=0,l=events[c].length;i<l;i++){z.event.add(b,c+(events[c][i].namespace?".":"")+events[c][i].namespace,events[c][i],events[c][i].data)}}}if(curData.data){curData.data=z.extend({},curData.data)}}function cloneFixAttributes(a,b){var c;if(b.nodeType!==1){return}if(b.clearAttributes){b.clearAttributes()}if(b.mergeAttributes){b.mergeAttributes(a)}c=b.nodeName.toLowerCase();if(c==="object"){b.outerHTML=a.outerHTML}else if(c==="input"&&(a.type==="checkbox"||a.type==="radio")){if(a.checked){b.defaultChecked=b.checked=a.checked}if(b.value!==a.value){b.value=a.value}}else if(c==="option"){b.selected=a.defaultSelected}else if(c==="input"||c==="textarea"){b.defaultValue=a.defaultValue}b.removeAttribute(z.expando)}z.buildFragment=function(a,b,c){var d,cacheable,cacheresults,doc,first=a[0];if(b&&b[0]){doc=b[0].ownerDocument||b[0]}if(!doc.createDocumentFragment){doc=y}if(a.length===1&&typeof first==="string"&&first.length<512&&doc===y&&first.charAt(0)==="<"&&!rnocache.test(first)&&(z.support.checkClone||!rchecked.test(first))&&(!z.support.unknownElems&&rnoshimcache.test(first))){cacheable=true;cacheresults=z.fragments[first];if(cacheresults&&cacheresults!==1){d=cacheresults}}if(!d){d=doc.createDocumentFragment();z.clean(a,doc,d,c)}if(cacheable){z.fragments[first]=cacheresults?d:1}return{fragment:d,cacheable:cacheable}};z.fragments={};z.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(d,e){z.fn[d]=function(a){var b=[],insert=z(a),parent=this.length===1&&this[0].parentNode;if(parent&&parent.nodeType===11&&parent.childNodes.length===1&&insert.length===1){insert[e](this[0]);return this}else{for(var i=0,l=insert.length;i<l;i++){var c=(i>0?this.clone(true):this).get();z(insert[i])[e](c);b=b.concat(c)}return this.pushStack(b,d,insert.selector)}}});function getAll(a){if(typeof a.getElementsByTagName!=="undefined"){return a.getElementsByTagName("*")}else if(typeof a.querySelectorAll!=="undefined"){return a.querySelectorAll("*")}else{return[]}}function fixDefaultChecked(a){if(a.type==="checkbox"||a.type==="radio"){a.defaultChecked=a.checked}}function findInputs(a){var b=(a.nodeName||"").toLowerCase();if(b==="input"){fixDefaultChecked(a)}else if(b!=="script"&&typeof a.getElementsByTagName!=="undefined"){z.grep(a.getElementsByTagName("input"),fixDefaultChecked)}}z.extend({clone:function(a,b,c){var d=a.cloneNode(true),srcElements,destElements,i;if((!z.support.noCloneEvent||!z.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!z.isXMLDoc(a)){cloneFixAttributes(a,d);srcElements=getAll(a);destElements=getAll(d);for(i=0;srcElements[i];++i){if(destElements[i]){cloneFixAttributes(srcElements[i],destElements[i])}}}if(b){cloneCopyEvent(a,d);if(c){srcElements=getAll(a);destElements=getAll(d);for(i=0;srcElements[i];++i){cloneCopyEvent(srcElements[i],destElements[i])}}}srcElements=destElements=null;return d},clean:function(b,c,d,e){var f;c=c||y;if(typeof c.createElement==="undefined"){c=c.ownerDocument||c[0]&&c[0].ownerDocument||y}var g=[],j;for(var i=0,elem;(elem=b[i])!=null;i++){if(typeof elem==="number"){elem+=""}if(!elem){continue}if(typeof elem==="string"){if(!rhtml.test(elem)){elem=c.createTextNode(elem)}else{elem=elem.replace(rxhtmlTag,"<$1></$2>");var h=(rtagName.exec(elem)||["",""])[1].toLowerCase(),wrap=wrapMap[h]||wrapMap._default,depth=wrap[0],div=c.createElement("div");if(c===y){safeFragment.appendChild(div)}else{createSafeFragment(c).appendChild(div)}div.innerHTML=wrap[1]+elem+wrap[2];while(depth--){div=div.lastChild}if(!z.support.tbody){var k=rtbody.test(elem),tbody=h==="table"&&!k?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!k?div.childNodes:[];for(j=tbody.length-1;j>=0;--j){if(z.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])}}}if(!z.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(c.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild)}elem=div.childNodes}}var l;if(!z.support.appendChecked){if(elem[0]&&typeof(l=elem.length)==="number"){for(j=0;j<l;j++){findInputs(elem[j])}}else{findInputs(elem)}}if(elem.nodeType){g.push(elem)}else{g=z.merge(g,elem)}}if(d){f=function(a){return!a.type||rscriptType.test(a.type)};for(i=0;g[i];i++){if(e&&z.nodeName(g[i],"script")&&(!g[i].type||g[i].type.toLowerCase()==="text/javascript")){e.push(g[i].parentNode?g[i].parentNode.removeChild(g[i]):g[i])}else{if(g[i].nodeType===1){var m=z.grep(g[i].getElementsByTagName("script"),f);g.splice.apply(g,[i+1,0].concat(m))}d.appendChild(g[i])}}}return g},cleanData:function(a){var b,id,cache=z.cache,special=z.event.special,deleteExpando=z.support.deleteExpando;for(var i=0,elem;(elem=a[i])!=null;i++){if(elem.nodeName&&z.noData[elem.nodeName.toLowerCase()]){continue}id=elem[z.expando];if(id){b=cache[id];if(b&&b.events){for(var c in b.events){if(special[c]){z.event.remove(elem,c)}else{z.removeEvent(elem,c,b.handle)}}if(b.handle){b.handle.elem=null}}if(deleteExpando){delete elem[z.expando]}else if(elem.removeAttribute){elem.removeAttribute(z.expando)}delete cache[id]}}}});function evalScript(i,a){if(a.src){z.ajax({url:a.src,async:false,dataType:"script"})}else{z.globalEval((a.text||a.textContent||a.innerHTML||"").replace(rcleanScript,"/*$0*/"))}if(a.parentNode){a.parentNode.removeChild(a)}}var H=/alpha\([^)]*\)/i,ropacity=/opacity=([^)]*)/,rupper=/([A-Z]|^ms)/g,rnumpx=/^-?\d+(?:px)?$/i,rnum=/^-?\d/,rrelNum=/^([\-+])=([\-+.\de]+)/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssWidth=["Left","Right"],cssHeight=["Top","Bottom"],curCSS,getComputedStyle,currentStyle;z.fn.css=function(d,e){if(arguments.length===2&&e===x){return this}return z.access(this,d,e,true,function(a,b,c){return c!==x?z.style(a,b,c):z.css(a,b)})};z.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=curCSS(a,"opacity","opacity");return c===""?"1":c}else{return a.style.opacity}}}},cssNumber:{"fillOpacity":true,"fontWeight":true,"lineHeight":true,"opacity":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true},cssProps:{"float":z.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(!a||a.nodeType===3||a.nodeType===8||!a.style){return}var f,type,origName=z.camelCase(b),style=a.style,hooks=z.cssHooks[origName];b=z.cssProps[origName]||origName;if(c!==x){type=typeof c;if(type==="string"&&(f=rrelNum.exec(c))){c=(+(f[1]+1)*+f[2])+parseFloat(z.css(a,b));type="number"}if(c==null||type==="number"&&isNaN(c)){return}if(type==="number"&&!z.cssNumber[origName]){c+="px"}if(!hooks||!("set"in hooks)||(c=hooks.set(a,c))!==x){try{style[b]=c}catch(e){}}}else{if(hooks&&"get"in hooks&&(f=hooks.get(a,false,d))!==x){return f}return style[b]}},css:function(a,b,c){var d,hooks;b=z.camelCase(b);hooks=z.cssHooks[b];b=z.cssProps[b]||b;if(b==="cssFloat"){b="float"}if(hooks&&"get"in hooks&&(d=hooks.get(a,true,c))!==x){return d}else if(curCSS){return curCSS(a,b)}},swap:function(a,b,c){var d={};for(var e in b){d[e]=a.style[e];a.style[e]=b[e]}c.call(a);for(e in b){a.style[e]=d[e]}}});z.curCSS=z.css;z.each(["height","width"],function(i,e){z.cssHooks[e]={get:function(a,b,c){var d;if(b){if(a.offsetWidth!==0){return getWH(a,e,c)}else{z.swap(a,cssShow,function(){d=getWH(a,e,c)})}return d}},set:function(a,b){if(rnumpx.test(b)){b=parseFloat(b);if(b>=0){return b+"px"}}else{return b}}}});if(!z.support.opacity){z.cssHooks.opacity={get:function(a,b){return ropacity.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?(parseFloat(RegExp.$1)/100)+"":b?"1":""},set:function(a,b){var c=a.style,currentStyle=a.currentStyle,opacity=z.isNumeric(b)?"alpha(opacity="+b*100+")":"",filter=currentStyle&&currentStyle.filter||c.filter||"";c.zoom=1;if(b>=1&&z.trim(filter.replace(H,""))===""){c.removeAttribute("filter");if(currentStyle&&!currentStyle.filter){return}}c.filter=H.test(filter)?filter.replace(H,opacity):filter+" "+opacity}}}z(function(){if(!z.support.reliableMarginRight){z.cssHooks.marginRight={get:function(a,b){var c;z.swap(a,{"display":"inline-block"},function(){if(b){c=curCSS(a,"margin-right","marginRight")}else{c=a.style.marginRight}});return c}}}});if(y.defaultView&&y.defaultView.getComputedStyle){getComputedStyle=function(a,b){var c,defaultView,computedStyle;b=b.replace(rupper,"-$1").toLowerCase();if(!(defaultView=a.ownerDocument.defaultView)){return x}if((computedStyle=defaultView.getComputedStyle(a,null))){c=computedStyle.getPropertyValue(b);if(c===""&&!z.contains(a.ownerDocument.documentElement,a)){c=z.style(a,b)}}return c}}if(y.documentElement.currentStyle){currentStyle=function(a,b){var c,rsLeft,uncomputed,ret=a.currentStyle&&a.currentStyle[b],style=a.style;if(ret===null&&style&&(uncomputed=style[b])){ret=uncomputed}if(!rnumpx.test(ret)&&rnum.test(ret)){c=style.left;rsLeft=a.runtimeStyle&&a.runtimeStyle.left;if(rsLeft){a.runtimeStyle.left=a.currentStyle.left}style.left=b==="fontSize"?"1em":(ret||0);ret=style.pixelLeft+"px";style.left=c;if(rsLeft){a.runtimeStyle.left=rsLeft}}return ret===""?"auto":ret}}curCSS=getComputedStyle||currentStyle;function getWH(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,which=b==="width"?cssWidth:cssHeight;if(d>0){if(c!=="border"){z.each(which,function(){if(!c){d-=parseFloat(z.css(a,"padding"+this))||0}if(c==="margin"){d+=parseFloat(z.css(a,c+this))||0}else{d-=parseFloat(z.css(a,"border"+this+"Width"))||0}})}return d+"px"}d=curCSS(a,b,b);if(d<0||d==null){d=a.style[b]||0}d=parseFloat(d)||0;if(c){z.each(which,function(){d+=parseFloat(z.css(a,"padding"+this))||0;if(c!=="padding"){d+=parseFloat(z.css(a,"border"+this+"Width"))||0}if(c==="margin"){d+=parseFloat(z.css(a,c+this))||0}})}return d+"px"}if(z.expr&&z.expr.filters){z.expr.filters.hidden=function(a){var b=a.offsetWidth,height=a.offsetHeight;return(b===0&&height===0)||(!z.support.reliableHiddenOffsets&&((a.style&&a.style.display)||z.css(a,"display"))==="none")};z.expr.filters.visible=function(a){return!z.expr.filters.hidden(a)}}var I=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rhash=/#.*$/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,rinput=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,rlocalProtocol=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rquery=/\?/,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,rselectTextarea=/^(?:select|textarea)/i,rspacesAjax=/\s+/,rts=/([?&])_=[^&]*/,rurl=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,_load=z.fn.load,prefilters={},transports={},ajaxLocation,ajaxLocParts,allTypes=["*/"]+["*"];try{ajaxLocation=location.href}catch(e){ajaxLocation=y.createElement("a");ajaxLocation.href="";ajaxLocation=ajaxLocation.href}ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[];function addToPrefiltersOrTransports(d){return function(a,b){if(typeof a!=="string"){b=a;a="*"}if(z.isFunction(b)){var c=a.toLowerCase().split(rspacesAjax),i=0,length=c.length,dataType,list,placeBefore;for(;i<length;i++){dataType=c[i];placeBefore=/^\+/.test(dataType);if(placeBefore){dataType=dataType.substr(1)||"*"}list=d[dataType]=d[dataType]||[];list[placeBefore?"unshift":"push"](b)}}}}function inspectPrefiltersOrTransports(a,b,c,d,e,f){e=e||b.dataTypes[0];f=f||{};f[e]=true;var g=a[e],i=0,length=g?g.length:0,executeOnly=(a===prefilters),selection;for(;i<length&&(executeOnly||!selection);i++){selection=g[i](b,c,d);if(typeof selection==="string"){if(!executeOnly||f[selection]){selection=x}else{b.dataTypes.unshift(selection);selection=inspectPrefiltersOrTransports(a,b,c,d,selection,f)}}}if((executeOnly||!selection)&&!f["*"]){selection=inspectPrefiltersOrTransports(a,b,c,d,"*",f)}return selection}function ajaxExtend(a,b){var c,deep,flatOptions=z.ajaxSettings.flatOptions||{};for(c in b){if(b[c]!==x){(flatOptions[c]?a:(deep||(deep={})))[c]=b[c]}}if(deep){z.extend(true,a,deep)}}z.fn.extend({load:function(d,e,f){if(typeof d!=="string"&&_load){return _load.apply(this,arguments)}else if(!this.length){return this}var g=d.indexOf(" ");if(g>=0){var h=d.slice(g,d.length);d=d.slice(0,g)}var i="GET";if(e){if(z.isFunction(e)){f=e;e=x}else if(typeof e==="object"){e=z.param(e,z.ajaxSettings.traditional);i="POST"}}var j=this;z.ajax({url:d,type:i,dataType:"html",data:e,complete:function(a,b,c){c=a.responseText;if(a.isResolved()){a.done(function(r){c=r});j.html(h?z("<div>").append(c.replace(rscript,"")).find(h):c)}if(f){j.each(f,[c,b,a])}}});return this},serialize:function(){return z.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?z.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type))}).map(function(i,b){var c=z(this).val();return c==null?null:z.isArray(c)?z.map(c,function(a,i){return{name:b.name,value:a.replace(rCRLF,"\r\n")}}):{name:b.name,value:c.replace(rCRLF,"\r\n")}}).get()}});z.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){z.fn[o]=function(f){return this.bind(o,f)}});z.each(["get","post"],function(i,e){z[e]=function(a,b,c,d){if(z.isFunction(b)){d=d||c;c=b;b=x}return z.ajax({type:e,url:a,data:b,success:c,dataType:d})}});z.extend({getScript:function(a,b){return z.get(a,x,b,"script")},getJSON:function(a,b,c){return z.get(a,b,c,"json")},ajaxSetup:function(a,b){if(b){ajaxExtend(a,z.ajaxSettings)}else{b=a;a=z.ajaxSettings}ajaxExtend(a,b);return a},ajaxSettings:{url:ajaxLocation,isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":allTypes},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":w.String,"text html":true,"text json":z.parseJSON,"text xml":z.parseXML},flatOptions:{context:true,url:true}},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),ajax:function(g,h){if(typeof g==="object"){h=g;g=x}h=h||{};var s=z.ajaxSetup({},h),callbackContext=s.context||s,globalEventContext=callbackContext!==s&&(callbackContext.nodeType||callbackContext instanceof z)?z(callbackContext):z.event,deferred=z.Deferred(),completeDeferred=z.Callbacks("once memory"),statusCode=s.statusCode||{},ifModifiedKey,requestHeaders={},requestHeadersNames={},responseHeadersString,responseHeaders,transport,timeoutTimer,parts,state=0,fireGlobals,i,jqXHR={readyState:0,setRequestHeader:function(a,b){if(!state){var c=a.toLowerCase();a=requestHeadersNames[c]=requestHeadersNames[c]||a;requestHeaders[a]=b}return this},getAllResponseHeaders:function(){return state===2?responseHeadersString:null},getResponseHeader:function(a){var b;if(state===2){if(!responseHeaders){responseHeaders={};while((b=rheaders.exec(responseHeadersString))){responseHeaders[b[1].toLowerCase()]=b[2]}}b=responseHeaders[a.toLowerCase()]}return b===x?null:b},overrideMimeType:function(a){if(!state){s.mimeType=a}return this},abort:function(a){a=a||"abort";if(transport){transport.abort(a)}done(0,a);return this}};function done(a,b,c,d){if(state===2){return}state=2;if(timeoutTimer){clearTimeout(timeoutTimer)}transport=x;responseHeadersString=d||"";jqXHR.readyState=a>0?4:0;var f,success,error,statusText=b,response=c?ajaxHandleResponses(s,jqXHR,c):x,lastModified,etag;if(a>=200&&a<300||a===304){if(s.ifModified){if((lastModified=jqXHR.getResponseHeader("Last-Modified"))){z.lastModified[ifModifiedKey]=lastModified}if((etag=jqXHR.getResponseHeader("Etag"))){z.etag[ifModifiedKey]=etag}}if(a===304){statusText="notmodified";f=true}else{try{success=ajaxConvert(s,response);statusText="success";f=true}catch(e){statusText="parsererror";error=e}}}else{error=statusText;if(!statusText||a){statusText="error";if(a<0){a=0}}}jqXHR.status=a;jqXHR.statusText=""+(b||statusText);if(f){deferred.resolveWith(callbackContext,[success,statusText,jqXHR])}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error])}jqXHR.statusCode(statusCode);statusCode=x;if(fireGlobals){globalEventContext.trigger("ajax"+(f?"Success":"Error"),[jqXHR,s,f?success:error])}completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);if(!(--z.active)){z.event.trigger("ajaxStop")}}}deferred.promise(jqXHR);jqXHR.success=jqXHR.done;jqXHR.error=jqXHR.fail;jqXHR.complete=completeDeferred.add;jqXHR.statusCode=function(a){if(a){var b;if(state<2){for(b in a){statusCode[b]=[statusCode[b],a[b]]}}else{b=a[jqXHR.status];jqXHR.then(b,b)}}return this};s.url=((g||s.url)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//");s.dataTypes=z.trim(s.dataType||"*").toLowerCase().split(rspacesAjax);if(s.crossDomain==null){parts=rurl.exec(s.url.toLowerCase());s.crossDomain=!!(parts&&(parts[1]!=ajaxLocParts[1]||parts[2]!=ajaxLocParts[2]||(parts[3]||(parts[1]==="http:"?80:443))!=(ajaxLocParts[3]||(ajaxLocParts[1]==="http:"?80:443))))}if(s.data&&s.processData&&typeof s.data!=="string"){s.data=z.param(s.data,s.traditional)}inspectPrefiltersOrTransports(prefilters,s,h,jqXHR);if(state===2){return false}fireGlobals=s.global;s.type=s.type.toUpperCase();s.hasContent=!rnoContent.test(s.type);if(fireGlobals&&z.active++===0){z.event.trigger("ajaxStart")}if(!s.hasContent){if(s.data){s.url+=(rquery.test(s.url)?"&":"?")+s.data;delete s.data}ifModifiedKey=s.url;if(s.cache===false){var j=z.now(),ret=s.url.replace(rts,"$1_="+j);s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+j:"")}}if(s.data&&s.hasContent&&s.contentType!==false||h.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType)}if(s.ifModified){ifModifiedKey=ifModifiedKey||s.url;if(z.lastModified[ifModifiedKey]){jqXHR.setRequestHeader("If-Modified-Since",z.lastModified[ifModifiedKey])}if(z.etag[ifModifiedKey]){jqXHR.setRequestHeader("If-None-Match",z.etag[ifModifiedKey])}}jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i])}if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){jqXHR.abort();return false}for(i in{success:1,error:1,complete:1}){jqXHR[i](s[i])}transport=inspectPrefiltersOrTransports(transports,s,h,jqXHR);if(!transport){done(-1,"No Transport")}else{jqXHR.readyState=1;if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s])}if(s.async&&s.timeout>0){timeoutTimer=setTimeout(function(){jqXHR.abort("timeout")},s.timeout)}try{state=1;transport.send(requestHeaders,done)}catch(e){if(state<2){done(-1,e)}else{z.error(e)}}}return jqXHR},param:function(a,c){var s=[],add=function(a,b){b=z.isFunction(b)?b():b;s[s.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(c===x){c=z.ajaxSettings.traditional}if(z.isArray(a)||(a.jquery&&!z.isPlainObject(a))){z.each(a,function(){add(this.name,this.value)})}else{for(var d in a){buildParams(d,a[d],c,add)}}return s.join("&").replace(I,"+")}});function buildParams(a,b,c,d){if(z.isArray(b)){z.each(b,function(i,v){if(c||rbracket.test(a)){d(a,v)}else{buildParams(a+"["+(typeof v==="object"||z.isArray(v)?i:"")+"]",v,c,d)}})}else if(!c&&b!=null&&typeof b==="object"){for(var e in b){buildParams(a+"["+e+"]",b[e],c,d)}}else{d(a,b)}}z.extend({active:0,lastModified:{},etag:{}});function ajaxHandleResponses(s,a,b){var c=s.contents,dataTypes=s.dataTypes,responseFields=s.responseFields,ct,type,finalDataType,firstDataType;for(type in responseFields){if(type in b){a[responseFields[type]]=b[type]}}while(dataTypes[0]==="*"){dataTypes.shift();if(ct===x){ct=s.mimeType||a.getResponseHeader("content-type")}}if(ct){for(type in c){if(c[type]&&c[type].test(ct)){dataTypes.unshift(type);break}}}if(dataTypes[0]in b){finalDataType=dataTypes[0]}else{for(type in b){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break}if(!firstDataType){firstDataType=type}}finalDataType=finalDataType||firstDataType}if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType)}return b[finalDataType]}}function ajaxConvert(s,a){if(s.dataFilter){a=s.dataFilter(a,s.dataType)}var b=s.dataTypes,converters={},i,key,length=b.length,tmp,current=b[0],prev,conversion,conv,conv1,conv2;for(i=1;i<length;i++){if(i===1){for(key in s.converters){if(typeof key==="string"){converters[key.toLowerCase()]=s.converters[key]}}}prev=current;current=b[i];if(current==="*"){current=prev}else if(prev!=="*"&&prev!==current){conversion=prev+" "+current;conv=converters[conversion]||converters["* "+current];if(!conv){conv2=x;for(conv1 in converters){tmp=conv1.split(" ");if(tmp[0]===prev||tmp[0]==="*"){conv2=converters[tmp[1]+" "+current];if(conv2){conv1=converters[conv1];if(conv1===true){conv=conv2}else if(conv2===true){conv=conv1}break}}}}if(!(conv||conv2)){z.error("No conversion from "+conversion.replace(" "," to "))}if(conv!==true){a=conv?conv(a):conv2(conv1(a))}}}return a}var J=z.now(),jsre=/(\=)\?(&|$)|\?\?/i;z.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return z.expando+"_"+(J++)}});z.ajaxPrefilter("json jsonp",function(s,b,c){var d=s.contentType==="application/x-www-form-urlencoded"&&(typeof s.data==="string");if(s.dataTypes[0]==="jsonp"||s.jsonp!==false&&(jsre.test(s.url)||d&&jsre.test(s.data))){var e,jsonpCallback=s.jsonpCallback=z.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback,previous=w[jsonpCallback],url=s.url,data=s.data,replace="$1"+jsonpCallback+"$2";if(s.jsonp!==false){url=url.replace(jsre,replace);if(s.url===url){if(d){data=data.replace(jsre,replace)}if(s.data===data){url+=(/\?/.test(url)?"&":"?")+s.jsonp+"="+jsonpCallback}}}s.url=url;s.data=data;w[jsonpCallback]=function(a){e=[a]};c.always(function(){w[jsonpCallback]=previous;if(e&&z.isFunction(previous)){w[jsonpCallback](e[0])}});s.converters["script json"]=function(){if(!e){z.error(jsonpCallback+" was not called")}return e[0]};s.dataTypes[0]="json";return"script"}});z.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){z.globalEval(a);return a}}});z.ajaxPrefilter("script",function(s){if(s.cache===x){s.cache=false}if(s.crossDomain){s.type="GET";s.global=false}});z.ajaxTransport("script",function(s){if(s.crossDomain){var c,head=y.head||y.getElementsByTagName("head")[0]||y.documentElement;return{send:function(_,b){c=y.createElement("script");c.async="async";if(s.scriptCharset){c.charset=s.scriptCharset}c.src=s.url;c.onload=c.onreadystatechange=function(_,a){if(a||!c.readyState||/loaded|complete/.test(c.readyState)){c.onload=c.onreadystatechange=null;if(head&&c.parentNode){head.removeChild(c)}c=x;if(!a){b(200,"success")}}};head.insertBefore(c,head.firstChild)},abort:function(){if(c){c.onload(0,1)}}}}});var K=w.ActiveXObject?function(){for(var a in xhrCallbacks){xhrCallbacks[a](0,1)}}:false,xhrId=0,xhrCallbacks;function createStandardXHR(){try{return new w.XMLHttpRequest()}catch(e){}}function createActiveXHR(){try{return new w.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}z.ajaxSettings.xhr=w.ActiveXObject?function(){return!this.isLocal&&createStandardXHR()||createActiveXHR()}:createStandardXHR;(function(a){z.extend(z.support,{ajax:!!a,cors:!!a&&("withCredentials"in a)})})(z.ajaxSettings.xhr());if(z.support.ajax){z.ajaxTransport(function(s){if(!s.crossDomain||z.support.cors){var g;return{send:function(c,d){var f=s.xhr(),handle,i;if(s.username){f.open(s.type,s.url,s.async,s.username,s.password)}else{f.open(s.type,s.url,s.async)}if(s.xhrFields){for(i in s.xhrFields){f[i]=s.xhrFields[i]}}if(s.mimeType&&f.overrideMimeType){f.overrideMimeType(s.mimeType)}if(!s.crossDomain&&!c["X-Requested-With"]){c["X-Requested-With"]="XMLHttpRequest"}try{for(i in c){f.setRequestHeader(i,c[i])}}catch(_){}f.send((s.hasContent&&s.data)||null);g=function(_,a){var b,statusText,responseHeaders,responses,xml;try{if(g&&(a||f.readyState===4)){g=x;if(handle){f.onreadystatechange=z.noop;if(K){delete xhrCallbacks[handle]}}if(a){if(f.readyState!==4){f.abort()}}else{b=f.status;responseHeaders=f.getAllResponseHeaders();responses={};xml=f.responseXML;if(xml&&xml.documentElement){responses.xml=xml}responses.text=f.responseText;try{statusText=f.statusText}catch(e){statusText=""}if(!b&&s.isLocal&&!s.crossDomain){b=responses.text?200:404}else if(b===1223){b=204}}}}catch(firefoxAccessException){if(!a){d(-1,firefoxAccessException)}}if(responses){d(b,statusText,responses,responseHeaders)}};if(!s.async||f.readyState===4){g()}else{handle=++xhrId;if(K){if(!xhrCallbacks){xhrCallbacks={};z(w).unload(K)}xhrCallbacks[handle]=g}f.onreadystatechange=g}},abort:function(){if(g){g(0,1)}}}}})}var L={},iframe,iframeDoc,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,timerId,fxAttrs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],fxNow;z.fn.extend({show:function(a,b,c){var d,display;if(a||a===0){return this.animate(genFx("show",3),a,b,c)}else{for(var i=0,j=this.length;i<j;i++){d=this[i];if(d.style){display=d.style.display;if(!z._data(d,"olddisplay")&&display==="none"){display=d.style.display=""}if(display===""&&z.css(d,"display")==="none"){z._data(d,"olddisplay",defaultDisplay(d.nodeName))}}}for(i=0;i<j;i++){d=this[i];if(d.style){display=d.style.display;if(display===""||display==="none"){d.style.display=z._data(d,"olddisplay")||""}}}return this}},hide:function(a,b,c){if(a||a===0){return this.animate(genFx("hide",3),a,b,c)}else{var d,display,i=0,j=this.length;for(;i<j;i++){d=this[i];if(d.style){display=z.css(d,"display");if(display!=="none"&&!z._data(d,"olddisplay")){z._data(d,"olddisplay",display)}}}for(i=0;i<j;i++){if(this[i].style){this[i].style.display="none"}}return this}},_toggle:z.fn.toggle,toggle:function(b,c,d){var e=typeof b==="boolean";if(z.isFunction(b)&&z.isFunction(c)){this._toggle.apply(this,arguments)}else if(b==null||e){this.each(function(){var a=e?b:z(this).is(":hidden");z(this)[a?"show":"hide"]()})}else{this.animate(genFx("toggle",3),b,c,d)}return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(b,c,d,f){var g=z.speed(c,d,f);if(z.isEmptyObject(b)){return this.each(g.complete,[false])}b=z.extend({},b);function doAnimation(){if(g.queue===false){z._mark(this)}var a=z.extend({},g),isElement=this.nodeType===1,hidden=isElement&&z(this).is(":hidden"),name,val,p,e,parts,start,end,unit,method;a.animatedProperties={};for(p in b){name=z.camelCase(p);if(p!==name){b[name]=b[p];delete b[p]}val=b[name];if(z.isArray(val)){a.animatedProperties[name]=val[1];val=b[name]=val[0]}else{a.animatedProperties[name]=a.specialEasing&&a.specialEasing[name]||a.easing||'swing'}if(val==="hide"&&hidden||val==="show"&&!hidden){return a.complete.call(this)}if(isElement&&(name==="height"||name==="width")){a.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(z.css(this,"display")==="inline"&&z.css(this,"float")==="none"){if(!z.support.inlineBlockNeedsLayout||defaultDisplay(this.nodeName)==="inline"){this.style.display="inline-block"}else{this.style.zoom=1}}}}if(a.overflow!=null){this.style.overflow="hidden"}for(p in b){e=new z.fx(this,a,p);val=b[p];if(rfxtypes.test(val)){method=z._data(this,"toggle"+p)||(val==="toggle"?hidden?"show":"hide":0);if(method){z._data(this,"toggle"+p,method==="show"?"hide":"show");e[method]()}else{e[val]()}}else{parts=rfxnum.exec(val);start=e.cur();if(parts){end=parseFloat(parts[2]);unit=parts[3]||(z.cssNumber[p]?"":"px");if(unit!=="px"){z.style(this,p,(end||1)+unit);start=((end||1)/e.cur())*start;z.style(this,p,start+unit)}if(parts[1]){end=((parts[1]==="-="?-1:1)*end)+start}e.custom(start,end,unit)}else{e.custom(start,val,"")}}}return true}return g.queue===false?this.each(doAnimation):this.queue(g.queue,doAnimation)},stop:function(d,e,f){if(typeof d!=="string"){f=e;e=d;d=x}if(e&&d!==false){this.queue(d||"fx",[])}return this.each(function(){var i,hadTimers=false,timers=z.timers,data=z._data(this);if(!f){z._unmark(true,this)}function stopQueue(a,b,i){var c=b[i];z.removeData(a,i,true);c.stop(f)}if(d==null){for(i in data){if(data[i].stop&&i.indexOf(".run")===i.length-4){stopQueue(this,data,i)}}}else if(data[i=d+".run"]&&data[i].stop){stopQueue(this,data,i)}for(i=timers.length;i--;){if(timers[i].elem===this&&(d==null||timers[i].queue===d)){if(f){timers[i](true)}else{timers[i].saveState()}hadTimers=true;timers.splice(i,1)}}if(!(f&&hadTimers)){z.dequeue(this,d)}})}});function createFxNow(){setTimeout(clearFxNow,0);return(fxNow=z.now())}function clearFxNow(){fxNow=x}function genFx(a,b){var c={};z.each(fxAttrs.concat.apply([],fxAttrs.slice(0,b)),function(){c[this]=a});return c}z.each({slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(d,e){z.fn[d]=function(a,b,c){return this.animate(e,a,b,c)}});z.extend({speed:function(b,c,d){var e=b&&typeof b==="object"?z.extend({},b):{complete:d||!d&&c||z.isFunction(b)&&b,duration:b,easing:d&&c||c&&!z.isFunction(c)&&c};e.duration=z.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in z.fx.speeds?z.fx.speeds[e.duration]:z.fx.speeds._default;if(e.queue==null||e.queue===true){e.queue="fx"}e.old=e.complete;e.complete=function(a){if(z.isFunction(e.old)){e.old.call(this)}if(e.queue){z.dequeue(this,e.queue)}else if(a!==false){z._unmark(this)}};return e},easing:{linear:function(p,n,a,b){return a+b*p},swing:function(p,n,a,b){return((-Math.cos(p*Math.PI)/2)+0.5)*b+a}},timers:[],fx:function(a,b,c){this.options=b;this.elem=a;this.prop=c;b.orig=b.orig||{}}});z.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(z.fx.step[this.prop]||z.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var a,r=z.css(this.elem,this.prop);return isNaN(a=parseFloat(r))?!r||r==="auto"?0:r:a},custom:function(b,c,d){var e=this,fx=z.fx;this.startTime=fxNow||createFxNow();this.end=c;this.now=this.start=b;this.pos=this.state=0;this.unit=d||this.unit||(z.cssNumber[this.prop]?"":"px");function t(a){return e.step(a)}t.queue=this.options.queue;t.elem=this.elem;t.saveState=function(){if(e.options.hide&&z._data(e.elem,"fxshow"+e.prop)===x){z._data(e.elem,"fxshow"+e.prop,e.start)}};if(t()&&z.timers.push(t)&&!timerId){timerId=setInterval(fx.tick,fx.interval)}},show:function(){var a=z._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||z.style(this.elem,this.prop);this.options.show=true;if(a!==x){this.custom(this.cur(),a)}else{this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur())}z(this.elem).show()},hide:function(){this.options.orig[this.prop]=z._data(this.elem,"fxshow"+this.prop)||z.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(c){var p,n,complete,t=fxNow||createFxNow(),done=true,elem=this.elem,options=this.options;if(c||t>=options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();options.animatedProperties[this.prop]=true;for(p in options.animatedProperties){if(options.animatedProperties[p]!==true){done=false}}if(done){if(options.overflow!=null&&!z.support.shrinkWrapBlocks){z.each(["","X","Y"],function(a,b){elem.style["overflow"+b]=options.overflow[a]})}if(options.hide){z(elem).hide()}if(options.hide||options.show){for(p in options.animatedProperties){z.style(elem,p,options.orig[p]);z.removeData(elem,"fxshow"+p,true);z.removeData(elem,"toggle"+p,true)}}complete=options.complete;if(complete){options.complete=false;complete.call(elem)}}return false}else{if(options.duration==Infinity){this.now=t}else{n=t-this.startTime;this.state=n/options.duration;this.pos=z.easing[options.animatedProperties[this.prop]](this.state,n,0,1,options.duration);this.now=this.start+((this.end-this.start)*this.pos)}this.update()}return true}};z.extend(z.fx,{tick:function(){var a,timers=z.timers,i=0;for(;i<timers.length;i++){a=timers[i];if(!a()&&timers[i]===a){timers.splice(i--,1)}}if(!timers.length){z.fx.stop()}},interval:13,stop:function(){clearInterval(timerId);timerId=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){z.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null){a.elem.style[a.prop]=a.now+a.unit}else{a.elem[a.prop]=a.now}}}});z.each(["width","height"],function(i,b){z.fx.step[b]=function(a){z.style(a.elem,b,Math.max(0,a.now))}});if(z.expr&&z.expr.filters){z.expr.filters.animated=function(b){return z.grep(z.timers,function(a){return b===a.elem}).length}}function defaultDisplay(a){if(!L[a]){var b=y.body,elem=z("<"+a+">").appendTo(b),display=elem.css("display");elem.remove();if(display==="none"||display===""){if(!iframe){iframe=y.createElement("iframe");iframe.frameBorder=iframe.width=iframe.height=0}b.appendChild(iframe);if(!iframeDoc||!iframe.createElement){iframeDoc=(iframe.contentWindow||iframe.contentDocument).document;iframeDoc.write((y.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>");iframeDoc.close()}elem=iframeDoc.createElement(a);iframeDoc.body.appendChild(elem);display=z.css(elem,"display");b.removeChild(iframe)}L[a]=display}return L[a]}var M=/^t(?:able|d|h)$/i,rroot=/^(?:body|html)$/i;if("getBoundingClientRect"in y.documentElement){z.fn.offset=function(a){var b=this[0],box;if(a){return this.each(function(i){z.offset.setOffset(this,a,i)})}if(!b||!b.ownerDocument){return null}if(b===b.ownerDocument.body){return z.offset.bodyOffset(b)}try{box=b.getBoundingClientRect()}catch(e){}var c=b.ownerDocument,docElem=c.documentElement;if(!box||!z.contains(docElem,b)){return box?{top:box.top,left:box.left}:{top:0,left:0}}var d=c.body,win=getWindow(c),clientTop=docElem.clientTop||d.clientTop||0,clientLeft=docElem.clientLeft||d.clientLeft||0,scrollTop=win.pageYOffset||z.support.boxModel&&docElem.scrollTop||d.scrollTop,scrollLeft=win.pageXOffset||z.support.boxModel&&docElem.scrollLeft||d.scrollLeft,top=box.top+scrollTop-clientTop,left=box.left+scrollLeft-clientLeft;return{top:top,left:left}}}else{z.fn.offset=function(a){var b=this[0];if(a){return this.each(function(i){z.offset.setOffset(this,a,i)})}if(!b||!b.ownerDocument){return null}if(b===b.ownerDocument.body){return z.offset.bodyOffset(b)}var c,offsetParent=b.offsetParent,prevOffsetParent=b,doc=b.ownerDocument,docElem=doc.documentElement,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView?defaultView.getComputedStyle(b,null):b.currentStyle,top=b.offsetTop,left=b.offsetLeft;while((b=b.parentNode)&&b!==body&&b!==docElem){if(z.support.fixedPosition&&prevComputedStyle.position==="fixed"){break}c=defaultView?defaultView.getComputedStyle(b,null):b.currentStyle;top-=b.scrollTop;left-=b.scrollLeft;if(b===offsetParent){top+=b.offsetTop;left+=b.offsetLeft;if(z.support.doesNotAddBorder&&!(z.support.doesAddBorderForTableAndCells&&M.test(b.nodeName))){top+=parseFloat(c.borderTopWidth)||0;left+=parseFloat(c.borderLeftWidth)||0}prevOffsetParent=offsetParent;offsetParent=b.offsetParent}if(z.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"){top+=parseFloat(c.borderTopWidth)||0;left+=parseFloat(c.borderLeftWidth)||0}prevComputedStyle=c}if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){top+=body.offsetTop;left+=body.offsetLeft}if(z.support.fixedPosition&&prevComputedStyle.position==="fixed"){top+=Math.max(docElem.scrollTop,body.scrollTop);left+=Math.max(docElem.scrollLeft,body.scrollLeft)}return{top:top,left:left}}}z.offset={bodyOffset:function(a){var b=a.offsetTop,left=a.offsetLeft;if(z.support.doesNotIncludeMarginInBodyOffset){b+=parseFloat(z.css(a,"marginTop"))||0;left+=parseFloat(z.css(a,"marginLeft"))||0}return{top:b,left:left}},setOffset:function(a,b,i){var c=z.css(a,"position");if(c==="static"){a.style.position="relative"}var d=z(a),curOffset=d.offset(),curCSSTop=z.css(a,"top"),curCSSLeft=z.css(a,"left"),calculatePosition=(c==="absolute"||c==="fixed")&&z.inArray("auto",[curCSSTop,curCSSLeft])>-1,props={},curPosition={},curTop,curLeft;if(calculatePosition){curPosition=d.position();curTop=curPosition.top;curLeft=curPosition.left}else{curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0}if(z.isFunction(b)){b=b.call(a,i,curOffset)}if(b.top!=null){props.top=(b.top-curOffset.top)+curTop}if(b.left!=null){props.left=(b.left-curOffset.left)+curLeft}if("using"in b){b.using.call(a,props)}else{d.css(props)}}};z.fn.extend({position:function(){if(!this[0]){return null}var a=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=rroot.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();offset.top-=parseFloat(z.css(a,"marginTop"))||0;offset.left-=parseFloat(z.css(a,"marginLeft"))||0;parentOffset.top+=parseFloat(z.css(offsetParent[0],"borderTopWidth"))||0;parentOffset.left+=parseFloat(z.css(offsetParent[0],"borderLeftWidth"))||0;return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||y.body;while(a&&(!rroot.test(a.nodeName)&&z.css(a,"position")==="static")){a=a.offsetParent}return a})}});z.each(["Left","Top"],function(i,c){var d="scroll"+c;z.fn[d]=function(a){var b,win;if(a===x){b=this[0];if(!b){return null}win=getWindow(b);return win?("pageXOffset"in win)?win[i?"pageYOffset":"pageXOffset"]:z.support.boxModel&&win.document.documentElement[d]||win.document.body[d]:b[d]}return this.each(function(){win=getWindow(this);if(win){win.scrollTo(!i?a:z(win).scrollLeft(),i?a:z(win).scrollTop())}else{this[d]=a}})}});function getWindow(a){return z.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:false}z.each(["Height","Width"],function(i,f){var g=f.toLowerCase();z.fn["inner"+f]=function(){var a=this[0];return a?a.style?parseFloat(z.css(a,g,"padding")):this[g]():null};z.fn["outer"+f]=function(a){var b=this[0];return b?b.style?parseFloat(z.css(b,g,a?"margin":"border")):this[g]():null};z.fn[g]=function(b){var c=this[0];if(!c){return b==null?null:this}if(z.isFunction(b)){return this.each(function(i){var a=z(this);a[g](b.call(this,i,a[g]()))})}if(z.isWindow(c)){var d=c.document.documentElement["client"+f],body=c.document.body;return c.document.compatMode==="CSS1Compat"&&d||body&&body["client"+f]||d}else if(c.nodeType===9){return Math.max(c.documentElement["client"+f],c.body["scroll"+f],c.documentElement["scroll"+f],c.body["offset"+f],c.documentElement["offset"+f])}else if(b===x){var e=z.css(c,g),ret=parseFloat(e);return z.isNumeric(ret)?ret:e}else{return this.css(g,typeof b==="string"?b:b+"px")}}});w.jQuery=w.$=z})(window);

/*!
 * jQuery UI 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(a,d){function c(h,g){var i=h.nodeName.toLowerCase();if("area"===i){g=h.parentNode;i=g.name;if(!h.href||!i||g.nodeName.toLowerCase()!=="map")return false;h=a("img[usemap=#"+i+"]")[0];return!!h&&e(h)}return(/input|select|textarea|button|object/.test(i)?!h.disabled:"a"==i?h.href||g:g)&&e(h)}function e(h){return!a(h).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(!a.ui.version){a.extend(a.ui,{version:"1.8.16",
keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(h,g){return typeof h==="number"?this.each(function(){var i=
this;setTimeout(function(){a(i).focus();g&&g.call(i)},h)}):this._focus.apply(this,arguments)},scrollParent:function(){var h;h=a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,
"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!h.length?a(document):h},zIndex:function(h){if(h!==d)return this.css("zIndex",h);if(this.length){h=a(this[0]);for(var g;h.length&&h[0]!==document;){g=h.css("position");if(g==="absolute"||g==="relative"||g==="fixed"){g=parseInt(h.css("zIndex"),10);if(!isNaN(g)&&g!==0)return g}h=h.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":
"mousedown")+".ui-disableSelection",function(h){h.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});a.each(["Width","Height"],function(h,g){function i(l,o,n,k){a.each(b,function(){o-=parseFloat(a.curCSS(l,"padding"+this,true))||0;if(n)o-=parseFloat(a.curCSS(l,"border"+this+"Width",true))||0;if(k)o-=parseFloat(a.curCSS(l,"margin"+this,true))||0});return o}var b=g==="Width"?["Left","Right"]:["Top","Bottom"],f=g.toLowerCase(),j={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,
outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+g]=function(l){if(l===d)return j["inner"+g].call(this);return this.each(function(){a(this).css(f,i(this,l)+"px")})};a.fn["outer"+g]=function(l,o){if(typeof l!=="number")return j["outer"+g].call(this,l);return this.each(function(){a(this).css(f,i(this,l,true,o)+"px")})}});a.extend(a.expr[":"],{data:function(h,g,i){return!!a.data(h,i[3])},focusable:function(h){return c(h,!isNaN(a.attr(h,"tabindex")))},tabbable:function(h){var g=a.attr(h,
"tabindex"),i=isNaN(g);return(i||g>=0)&&c(h,!i)}});a(function(){var h=document.body,g=h.appendChild(g=document.createElement("div"));a.extend(g.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});a.support.minHeight=g.offsetHeight===100;a.support.selectstart="onselectstart"in g;h.removeChild(g).style.display="none"});a.extend(a.ui,{plugin:{add:function(h,g,i){h=a.ui[h].prototype;for(var b in i){h.plugins[b]=h.plugins[b]||[];h.plugins[b].push([g,i[b]])}},call:function(h,g,i){if((g=h.plugins[g])&&
h.element[0].parentNode)for(var b=0;b<g.length;b++)h.options[g[b][0]]&&g[b][1].apply(h.element,i)}},contains:function(h,g){return document.compareDocumentPosition?h.compareDocumentPosition(g)&16:h!==g&&h.contains(g)},hasScroll:function(h,g){if(a(h).css("overflow")==="hidden")return false;g=g&&g==="left"?"scrollLeft":"scrollTop";var i=false;if(h[g]>0)return true;h[g]=1;i=h[g]>0;h[g]=0;return i},isOverAxis:function(h,g,i){return h>g&&h<g+i},isOver:function(h,g,i,b,f,j){return a.ui.isOverAxis(h,i,f)&&
a.ui.isOverAxis(g,b,j)}})}})(jQuery);
(function(a,d){if(a.cleanData){var c=a.cleanData;a.cleanData=function(h){for(var g=0,i;(i=h[g])!=null;g++)try{a(i).triggerHandler("remove")}catch(b){}c(h)}}else{var e=a.fn.remove;a.fn.remove=function(h,g){return this.each(function(){if(!g)if(!h||a.filter(h,[this]).length)a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(i){}});return e.call(a(this),h,g)})}}a.widget=function(h,g,i){var b=h.split(".")[0],f;h=h.split(".")[1];f=b+"-"+h;if(!i){i=g;g=a.Widget}a.expr[":"][f]=
function(j){return!!a.data(j,h)};a[b]=a[b]||{};a[b][h]=function(j,l){arguments.length&&this._createWidget(j,l)};g=new g;g.options=a.extend(true,{},g.options);a[b][h].prototype=a.extend(true,g,{namespace:b,widgetName:h,widgetEventPrefix:a[b][h].prototype.widgetEventPrefix||h,widgetBaseClass:f},i);a.widget.bridge(h,a[b][h])};a.widget.bridge=function(h,g){a.fn[h]=function(i){var b=typeof i==="string",f=Array.prototype.slice.call(arguments,1),j=this;i=!b&&f.length?a.extend.apply(null,[true,i].concat(f)):
i;if(b&&i.charAt(0)==="_")return j;b?this.each(function(){var l=a.data(this,h),o=l&&a.isFunction(l[i])?l[i].apply(l,f):l;if(o!==l&&o!==d){j=o;return false}}):this.each(function(){var l=a.data(this,h);l?l.option(i||{})._init():a.data(this,h,new g(i,this))});return j}};a.Widget=function(h,g){arguments.length&&this._createWidget(h,g)};a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(h,g){a.data(g,this.widgetName,this);this.element=a(g);this.options=
a.extend(true,{},this.options,this._getCreateOptions(),h);var i=this;this.element.bind("remove."+this.widgetName,function(){i.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+
"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(h,g){var i=h;if(arguments.length===0)return a.extend({},this.options);if(typeof h==="string"){if(g===d)return this.options[h];i={};i[h]=g}this._setOptions(i);return this},_setOptions:function(h){var g=this;a.each(h,function(i,b){g._setOption(i,b)});return this},_setOption:function(h,g){this.options[h]=g;if(h==="disabled")this.widget()[g?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",
g);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(h,g,i){var b=this.options[h];g=a.Event(g);g.type=(h===this.widgetEventPrefix?h:this.widgetEventPrefix+h).toLowerCase();i=i||{};if(g.originalEvent){h=a.event.props.length;for(var f;h;){f=a.event.props[--h];g[f]=g.originalEvent[f]}}this.element.trigger(g,i);return!(a.isFunction(b)&&b.call(this.element[0],g,i)===false||g.isDefaultPrevented())}}})(jQuery);
(function(a){var d=false;a(document).mouseup(function(){d=false});a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var c=this;this.element.bind("mousedown."+this.widgetName,function(e){return c._mouseDown(e)}).bind("click."+this.widgetName,function(e){if(true===a.data(e.target,c.widgetName+".preventClickEvent")){a.removeData(e.target,c.widgetName+".preventClickEvent");e.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+
this.widgetName)},_mouseDown:function(c){if(!d){this._mouseStarted&&this._mouseUp(c);this._mouseDownEvent=c;var e=this,h=c.which==1,g=typeof this.options.cancel=="string"&&c.target.nodeName?a(c.target).closest(this.options.cancel).length:false;if(!h||g||!this._mouseCapture(c))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){e.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(c)&&this._mouseDelayMet(c)){this._mouseStarted=
this._mouseStart(c)!==false;if(!this._mouseStarted){c.preventDefault();return true}}true===a.data(c.target,this.widgetName+".preventClickEvent")&&a.removeData(c.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(i){return e._mouseMove(i)};this._mouseUpDelegate=function(i){return e._mouseUp(i)};a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);c.preventDefault();return d=true}},_mouseMove:function(c){if(a.browser.msie&&
!(document.documentMode>=9)&&!c.button)return this._mouseUp(c);if(this._mouseStarted){this._mouseDrag(c);return c.preventDefault()}if(this._mouseDistanceMet(c)&&this._mouseDelayMet(c))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,c)!==false)?this._mouseDrag(c):this._mouseUp(c);return!this._mouseStarted},_mouseUp:function(c){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=
false;c.target==this._mouseDownEvent.target&&a.data(c.target,this.widgetName+".preventClickEvent",true);this._mouseStop(c)}return false},_mouseDistanceMet:function(c){return Math.max(Math.abs(this._mouseDownEvent.pageX-c.pageX),Math.abs(this._mouseDownEvent.pageY-c.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
(function(a){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper==
"original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(d){var c=
this.options;if(this.helper||c.disabled||a(d.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(d);if(!this.handle)return false;if(c.iframeFix)a(c.iframeFix===true?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(a(this).offset()).appendTo("body")});return true},_mouseStart:function(d){var c=this.options;
this.helper=this._createHelper(d);this._cacheHelperProportions();if(a.ui.ddmanager)a.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};a.extend(this.offset,{click:{left:d.pageX-this.offset.left,top:d.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this.position=this._generatePosition(d);this.originalPageX=d.pageX;this.originalPageY=d.pageY;c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt);c.containment&&this._setContainment();if(this._trigger("start",d)===false){this._clear();return false}this._cacheHelperProportions();a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,d);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(d,true);a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,d);return true},
_mouseDrag:function(d,c){this.position=this._generatePosition(d);this.positionAbs=this._convertPositionTo("absolute");if(!c){c=this._uiHash();if(this._trigger("drag",d,c)===false){this._mouseUp({});return false}this.position=c.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";a.ui.ddmanager&&a.ui.ddmanager.drag(this,d);return false},_mouseStop:function(d){var c=
false;if(a.ui.ddmanager&&!this.options.dropBehaviour)c=a.ui.ddmanager.drop(this,d);if(this.dropped){c=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===true||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var e=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,
10),function(){e._trigger("stop",d)!==false&&e._clear()})}else this._trigger("stop",d)!==false&&this._clear();return false},_mouseUp:function(d){this.options.iframeFix===true&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)});a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,d);return a.ui.mouse.prototype._mouseUp.call(this,d)},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(d){var c=!this.options.handle||
!a(this.options.handle,this.element).length?true:false;a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==d.target)c=true});return c},_createHelper:function(d){var c=this.options;d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[d])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo);d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&
d.css("position","absolute");return d},_adjustOffsetFromHelper:function(d){if(typeof d=="string")d=d.split(" ");if(a.isArray(d))d={left:+d[0],top:+d[1]||0};if("left"in d)this.offset.click.left=d.left+this.margins.left;if("right"in d)this.offset.click.left=this.helperProportions.width-d.right+this.margins.left;if("top"in d)this.offset.click.top=d.top+this.margins.top;if("bottom"in d)this.offset.click.top=this.helperProportions.height-d.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=
this.helper.offsetParent();var d=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){d.left+=this.scrollParent.scrollLeft();d.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)d={top:0,left:0};return{top:d.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:d.left+(parseInt(this.offsetParent.css("borderLeftWidth"),
10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var d=this.element.position();return{top:d.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:d.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),
10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var d=this.options;if(d.containment=="parent")d.containment=this.helper[0].parentNode;if(d.containment=="document"||d.containment=="window")this.containment=[d.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,d.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,
(d.containment=="document"?0:a(window).scrollLeft())+a(d.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d.containment=="document"?0:a(window).scrollTop())+(a(d.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(d.containment)&&d.containment.constructor!=Array){d=a(d.containment);var c=d[0];if(c){d.offset();var e=a(c).css("overflow")!=
"hidden";this.containment=[(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0),(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0),(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),
10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];this.relative_container=d}}else if(d.containment.constructor==Array)this.containment=d.containment},_convertPositionTo:function(d,c){if(!c)c=this.position;d=d=="absolute"?1:-1;var e=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=/(html|body)/i.test(e[0].tagName);return{top:c.top+
this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():h?0:e.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:e.scrollLeft())*d)}},_generatePosition:function(d){var c=this.options,e=this.cssPosition=="absolute"&&
!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=/(html|body)/i.test(e[0].tagName),g=d.pageX,i=d.pageY;if(this.originalPosition){var b;if(this.containment){if(this.relative_container){b=this.relative_container.offset();b=[this.containment[0]+b.left,this.containment[1]+b.top,this.containment[2]+b.left,this.containment[3]+b.top]}else b=this.containment;if(d.pageX-this.offset.click.left<b[0])g=b[0]+this.offset.click.left;
if(d.pageY-this.offset.click.top<b[1])i=b[1]+this.offset.click.top;if(d.pageX-this.offset.click.left>b[2])g=b[2]+this.offset.click.left;if(d.pageY-this.offset.click.top>b[3])i=b[3]+this.offset.click.top}if(c.grid){i=c.grid[1]?this.originalPageY+Math.round((i-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;i=b?!(i-this.offset.click.top<b[1]||i-this.offset.click.top>b[3])?i:!(i-this.offset.click.top<b[1])?i-c.grid[1]:i+c.grid[1]:i;g=c.grid[0]?this.originalPageX+Math.round((g-this.originalPageX)/
c.grid[0])*c.grid[0]:this.originalPageX;g=b?!(g-this.offset.click.left<b[0]||g-this.offset.click.left>b[2])?g:!(g-this.offset.click.left<b[0])?g-c.grid[0]:g+c.grid[0]:g}}return{top:i-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():h?0:e.scrollTop()),left:g-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<
526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:e.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(d,c,e){e=e||this._uiHash();a.ui.plugin.call(this,d,[c,e]);if(d=="drag")this.positionAbs=this._convertPositionTo("absolute");return a.Widget.prototype._trigger.call(this,d,c,
e)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});a.extend(a.ui.draggable,{version:"1.8.16"});a.ui.plugin.add("draggable","connectToSortable",{start:function(d,c){var e=a(this).data("draggable"),h=e.options,g=a.extend({},c,{item:e.element});e.sortables=[];a(h.connectToSortable).each(function(){var i=a.data(this,"sortable");if(i&&!i.options.disabled){e.sortables.push({instance:i,shouldRevert:i.options.revert});
i.refreshPositions();i._trigger("activate",d,g)}})},stop:function(d,c){var e=a(this).data("draggable"),h=a.extend({},c,{item:e.element});a.each(e.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;e.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(d);this.instance.options.helper=this.instance.options._helper;e.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=
false;this.instance._trigger("deactivate",d,h)}})},drag:function(d,c){var e=a(this).data("draggable"),h=this;a.each(e.sortables,function(){this.instance.positionAbs=e.positionAbs;this.instance.helperProportions=e.helperProportions;this.instance.offset.click=e.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=a(h).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return c.helper[0]};d.target=this.instance.currentItem[0];this.instance._mouseCapture(d,true);this.instance._mouseStart(d,true,true);this.instance.offset.click.top=e.offset.click.top;this.instance.offset.click.left=e.offset.click.left;this.instance.offset.parent.left-=e.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=e.offset.parent.top-this.instance.offset.parent.top;
e._trigger("toSortable",d);e.dropped=this.instance.element;e.currentItem=e.element;this.instance.fromOutside=e}this.instance.currentItem&&this.instance._mouseDrag(d)}else if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",d,this.instance._uiHash(this.instance));this.instance._mouseStop(d,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&
this.instance.placeholder.remove();e._trigger("fromSortable",d);e.dropped=false}})}});a.ui.plugin.add("draggable","cursor",{start:function(){var d=a("body"),c=a(this).data("draggable").options;if(d.css("cursor"))c._cursor=d.css("cursor");d.css("cursor",c.cursor)},stop:function(){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}});a.ui.plugin.add("draggable","opacity",{start:function(d,c){d=a(c.helper);c=a(this).data("draggable").options;if(d.css("opacity"))c._opacity=
d.css("opacity");d.css("opacity",c.opacity)},stop:function(d,c){d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}});a.ui.plugin.add("draggable","scroll",{start:function(){var d=a(this).data("draggable");if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML")d.overflowOffset=d.scrollParent.offset()},drag:function(d){var c=a(this).data("draggable"),e=c.options,h=false;if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!=
"x")if(c.overflowOffset.top+c.scrollParent[0].offsetHeight-d.pageY<e.scrollSensitivity)c.scrollParent[0].scrollTop=h=c.scrollParent[0].scrollTop+e.scrollSpeed;else if(d.pageY-c.overflowOffset.top<e.scrollSensitivity)c.scrollParent[0].scrollTop=h=c.scrollParent[0].scrollTop-e.scrollSpeed;if(!e.axis||e.axis!="y")if(c.overflowOffset.left+c.scrollParent[0].offsetWidth-d.pageX<e.scrollSensitivity)c.scrollParent[0].scrollLeft=h=c.scrollParent[0].scrollLeft+e.scrollSpeed;else if(d.pageX-c.overflowOffset.left<
e.scrollSensitivity)c.scrollParent[0].scrollLeft=h=c.scrollParent[0].scrollLeft-e.scrollSpeed}else{if(!e.axis||e.axis!="x")if(d.pageY-a(document).scrollTop()<e.scrollSensitivity)h=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed);else if(a(window).height()-(d.pageY-a(document).scrollTop())<e.scrollSensitivity)h=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed);if(!e.axis||e.axis!="y")if(d.pageX-a(document).scrollLeft()<e.scrollSensitivity)h=a(document).scrollLeft(a(document).scrollLeft()-
e.scrollSpeed);else if(a(window).width()-(d.pageX-a(document).scrollLeft())<e.scrollSensitivity)h=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed)}h!==false&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(c,d)}});a.ui.plugin.add("draggable","snap",{start:function(){var d=a(this).data("draggable"),c=d.options;d.snapElements=[];a(c.snap.constructor!=String?c.snap.items||":data(draggable)":c.snap).each(function(){var e=a(this),h=e.offset();this!=d.element[0]&&d.snapElements.push({item:this,
width:e.outerWidth(),height:e.outerHeight(),top:h.top,left:h.left})})},drag:function(d,c){for(var e=a(this).data("draggable"),h=e.options,g=h.snapTolerance,i=c.offset.left,b=i+e.helperProportions.width,f=c.offset.top,j=f+e.helperProportions.height,l=e.snapElements.length-1;l>=0;l--){var o=e.snapElements[l].left,n=o+e.snapElements[l].width,k=e.snapElements[l].top,m=k+e.snapElements[l].height;if(o-g<i&&i<n+g&&k-g<f&&f<m+g||o-g<i&&i<n+g&&k-g<j&&j<m+g||o-g<b&&b<n+g&&k-g<f&&f<m+g||o-g<b&&b<n+g&&k-g<j&&
j<m+g){if(h.snapMode!="inner"){var p=Math.abs(k-j)<=g,q=Math.abs(m-f)<=g,s=Math.abs(o-b)<=g,r=Math.abs(n-i)<=g;if(p)c.position.top=e._convertPositionTo("relative",{top:k-e.helperProportions.height,left:0}).top-e.margins.top;if(q)c.position.top=e._convertPositionTo("relative",{top:m,left:0}).top-e.margins.top;if(s)c.position.left=e._convertPositionTo("relative",{top:0,left:o-e.helperProportions.width}).left-e.margins.left;if(r)c.position.left=e._convertPositionTo("relative",{top:0,left:n}).left-e.margins.left}var u=
p||q||s||r;if(h.snapMode!="outer"){p=Math.abs(k-f)<=g;q=Math.abs(m-j)<=g;s=Math.abs(o-i)<=g;r=Math.abs(n-b)<=g;if(p)c.position.top=e._convertPositionTo("relative",{top:k,left:0}).top-e.margins.top;if(q)c.position.top=e._convertPositionTo("relative",{top:m-e.helperProportions.height,left:0}).top-e.margins.top;if(s)c.position.left=e._convertPositionTo("relative",{top:0,left:o}).left-e.margins.left;if(r)c.position.left=e._convertPositionTo("relative",{top:0,left:n-e.helperProportions.width}).left-e.margins.left}if(!e.snapElements[l].snapping&&
(p||q||s||r||u))e.options.snap.snap&&e.options.snap.snap.call(e.element,d,a.extend(e._uiHash(),{snapItem:e.snapElements[l].item}));e.snapElements[l].snapping=p||q||s||r||u}else{e.snapElements[l].snapping&&e.options.snap.release&&e.options.snap.release.call(e.element,d,a.extend(e._uiHash(),{snapItem:e.snapElements[l].item}));e.snapElements[l].snapping=false}}}});a.ui.plugin.add("draggable","stack",{start:function(){var d=a(this).data("draggable").options;d=a.makeArray(a(d.stack)).sort(function(e,h){return(parseInt(a(e).css("zIndex"),
10)||0)-(parseInt(a(h).css("zIndex"),10)||0)});if(d.length){var c=parseInt(d[0].style.zIndex)||0;a(d).each(function(e){this.style.zIndex=c+e});this[0].style.zIndex=c+d.length}}});a.ui.plugin.add("draggable","zIndex",{start:function(d,c){d=a(c.helper);c=a(this).data("draggable").options;if(d.css("zIndex"))c._zIndex=d.css("zIndex");d.css("zIndex",c.zIndex)},stop:function(d,c){d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);
(function(a){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var d=this.options,c=d.accept;this.isover=0;this.isout=1;this.accept=a.isFunction(c)?c:function(e){return e.is(c)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};a.ui.ddmanager.droppables[d.scope]=a.ui.ddmanager.droppables[d.scope]||[];a.ui.ddmanager.droppables[d.scope].push(this);
d.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){for(var d=a.ui.ddmanager.droppables[this.options.scope],c=0;c<d.length;c++)d[c]==this&&d.splice(c,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");return this},_setOption:function(d,c){if(d=="accept")this.accept=a.isFunction(c)?c:function(e){return e.is(c)};a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(d){var c=a.ui.ddmanager.current;this.options.activeClass&&
this.element.addClass(this.options.activeClass);c&&this._trigger("activate",d,this.ui(c))},_deactivate:function(d){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass);c&&this._trigger("deactivate",d,this.ui(c))},_over:function(d){var c=a.ui.ddmanager.current;if(!(!c||(c.currentItem||c.element)[0]==this.element[0]))if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.hoverClass&&this.element.addClass(this.options.hoverClass);
this._trigger("over",d,this.ui(c))}},_out:function(d){var c=a.ui.ddmanager.current;if(!(!c||(c.currentItem||c.element)[0]==this.element[0]))if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("out",d,this.ui(c))}},_drop:function(d,c){var e=c||a.ui.ddmanager.current;if(!e||(e.currentItem||e.element)[0]==this.element[0])return false;var h=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var g=
a.data(this,"droppable");if(g.options.greedy&&!g.options.disabled&&g.options.scope==e.options.scope&&g.accept.call(g.element[0],e.currentItem||e.element)&&a.ui.intersect(e,a.extend(g,{offset:g.element.offset()}),g.options.tolerance)){h=true;return false}});if(h)return false;if(this.accept.call(this.element[0],e.currentItem||e.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass);this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("drop",
d,this.ui(e));return this.element}return false},ui:function(d){return{draggable:d.currentItem||d.element,helper:d.helper,position:d.position,offset:d.positionAbs}}});a.extend(a.ui.droppable,{version:"1.8.16"});a.ui.intersect=function(d,c,e){if(!c.offset)return false;var h=(d.positionAbs||d.position.absolute).left,g=h+d.helperProportions.width,i=(d.positionAbs||d.position.absolute).top,b=i+d.helperProportions.height,f=c.offset.left,j=f+c.proportions.width,l=c.offset.top,o=l+c.proportions.height;
switch(e){case "fit":return f<=h&&g<=j&&l<=i&&b<=o;case "intersect":return f<h+d.helperProportions.width/2&&g-d.helperProportions.width/2<j&&l<i+d.helperProportions.height/2&&b-d.helperProportions.height/2<o;case "pointer":return a.ui.isOver((d.positionAbs||d.position.absolute).top+(d.clickOffset||d.offset.click).top,(d.positionAbs||d.position.absolute).left+(d.clickOffset||d.offset.click).left,l,f,c.proportions.height,c.proportions.width);case "touch":return(i>=l&&i<=o||b>=l&&b<=o||i<l&&b>o)&&(h>=
f&&h<=j||g>=f&&g<=j||h<f&&g>j);default:return false}};a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(d,c){var e=a.ui.ddmanager.droppables[d.options.scope]||[],h=c?c.type:null,g=(d.currentItem||d.element).find(":data(droppable)").andSelf(),i=0;a:for(;i<e.length;i++)if(!(e[i].options.disabled||d&&!e[i].accept.call(e[i].element[0],d.currentItem||d.element))){for(var b=0;b<g.length;b++)if(g[b]==e[i].element[0]){e[i].proportions.height=0;continue a}e[i].visible=e[i].element.css("display")!=
"none";if(e[i].visible){h=="mousedown"&&e[i]._activate.call(e[i],c);e[i].offset=e[i].element.offset();e[i].proportions={width:e[i].element[0].offsetWidth,height:e[i].element[0].offsetHeight}}}},drop:function(d,c){var e=false;a.each(a.ui.ddmanager.droppables[d.options.scope]||[],function(){if(this.options){if(!this.options.disabled&&this.visible&&a.ui.intersect(d,this,this.options.tolerance))e=e||this._drop.call(this,c);if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],d.currentItem||
d.element)){this.isout=1;this.isover=0;this._deactivate.call(this,c)}}});return e},dragStart:function(d,c){d.element.parents(":not(body,html)").bind("scroll.droppable",function(){d.options.refreshPositions||a.ui.ddmanager.prepareOffsets(d,c)})},drag:function(d,c){d.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(d,c);a.each(a.ui.ddmanager.droppables[d.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var e=a.ui.intersect(d,this,this.options.tolerance);
if(e=!e&&this.isover==1?"isout":e&&this.isover==0?"isover":null){var h;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");if(g.length){h=a.data(g[0],"droppable");h.greedyChild=e=="isover"?1:0}}if(h&&e=="isover"){h.isover=0;h.isout=1;h._out.call(h,c)}this[e]=1;this[e=="isout"?"isover":"isout"]=0;this[e=="isover"?"_over":"_out"].call(this,c);if(h&&e=="isout"){h.isout=0;h.isover=1;h._over.call(h,c)}}}})},dragStop:function(d,c){d.element.parents(":not(body,html)").unbind("scroll.droppable");
d.options.refreshPositions||a.ui.ddmanager.prepareOffsets(d,c)}}})(jQuery);
(function(a){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var e=this,h=this.options;this.element.addClass("ui-resizable");a.extend(this,{_aspectRatio:!!h.aspectRatio,aspectRatio:h.aspectRatio,originalElement:this.element,
_proportionallyResizeElements:[],_helper:h.helper||h.ghost||h.animate?h.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&a.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),
top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=
this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=h.handles||(!a(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",
nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var g=this.handles.split(",");this.handles={};for(var i=0;i<g.length;i++){var b=a.trim(g[i]),f=a('<div class="ui-resizable-handle '+("ui-resizable-"+b)+'"></div>');/sw|se|ne|nw/.test(b)&&f.css({zIndex:++h.zIndex});"se"==b&&f.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[b]=".ui-resizable-"+b;this.element.append(f)}}this._renderAxis=function(j){j=j||this.element;for(var l in this.handles){if(this.handles[l].constructor==
String)this.handles[l]=a(this.handles[l],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var o=a(this.handles[l],this.element),n=0;n=/sw|ne|nw|se|n|s/.test(l)?o.outerHeight():o.outerWidth();o=["padding",/ne|nw|n/.test(l)?"Top":/se|sw|s/.test(l)?"Bottom":/^e$/.test(l)?"Right":"Left"].join("");j.css(o,n);this._proportionallyResize()}a(this.handles[l])}};this._renderAxis(this.element);this._handles=a(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!e.resizing){if(this.className)var j=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);e.axis=j&&j[1]?j[1]:"se"}});if(h.autoHide){this._handles.hide();a(this.element).addClass("ui-resizable-autohide").hover(function(){if(!h.disabled){a(this).removeClass("ui-resizable-autohide");e._handles.show()}},function(){if(!h.disabled)if(!e.resizing){a(this).addClass("ui-resizable-autohide");e._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();
var e=function(g){a(g).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){e(this.element);var h=this.element;h.after(this.originalElement.css({position:h.css("position"),width:h.outerWidth(),height:h.outerHeight(),top:h.css("top"),left:h.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);e(this.originalElement);return this},_mouseCapture:function(e){var h=
false;for(var g in this.handles)if(a(this.handles[g])[0]==e.target)h=true;return!this.options.disabled&&h},_mouseStart:function(e){var h=this.options,g=this.element.position(),i=this.element;this.resizing=true;this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()};if(i.is(".ui-draggable")||/absolute/.test(i.css("position")))i.css({position:"absolute",top:g.top,left:g.left});a.browser.opera&&/relative/.test(i.css("position"))&&i.css({position:"relative",top:"auto",left:"auto"});
this._renderProxy();g=d(this.helper.css("left"));var b=d(this.helper.css("top"));if(h.containment){g+=a(h.containment).scrollLeft()||0;b+=a(h.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:g,top:b};this.size=this._helper?{width:i.outerWidth(),height:i.outerHeight()}:{width:i.width(),height:i.height()};this.originalSize=this._helper?{width:i.outerWidth(),height:i.outerHeight()}:{width:i.width(),height:i.height()};this.originalPosition={left:g,top:b};this.sizeDiff=
{width:i.outerWidth()-i.width(),height:i.outerHeight()-i.height()};this.originalMousePosition={left:e.pageX,top:e.pageY};this.aspectRatio=typeof h.aspectRatio=="number"?h.aspectRatio:this.originalSize.width/this.originalSize.height||1;h=a(".ui-resizable-"+this.axis).css("cursor");a("body").css("cursor",h=="auto"?this.axis+"-resize":h);i.addClass("ui-resizable-resizing");this._propagate("start",e);return true},_mouseDrag:function(e){var h=this.helper,g=this.originalMousePosition,i=this._change[this.axis];
if(!i)return false;g=i.apply(this,[e,e.pageX-g.left||0,e.pageY-g.top||0]);this._updateVirtualBoundaries(e.shiftKey);if(this._aspectRatio||e.shiftKey)g=this._updateRatio(g,e);g=this._respectSize(g,e);this._propagate("resize",e);h.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(g);this._trigger("resize",e,this.ui());return false},
_mouseStop:function(e){this.resizing=false;var h=this.options,g=this;if(this._helper){var i=this._proportionallyResizeElements,b=i.length&&/textarea/i.test(i[0].nodeName);i=b&&a.ui.hasScroll(i[0],"left")?0:g.sizeDiff.height;b=b?0:g.sizeDiff.width;b={width:g.helper.width()-b,height:g.helper.height()-i};i=parseInt(g.element.css("left"),10)+(g.position.left-g.originalPosition.left)||null;var f=parseInt(g.element.css("top"),10)+(g.position.top-g.originalPosition.top)||null;h.animate||this.element.css(a.extend(b,
{top:f,left:i}));g.helper.height(g.size.height);g.helper.width(g.size.width);this._helper&&!h.animate&&this._proportionallyResize()}a("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",e);this._helper&&this.helper.remove();return false},_updateVirtualBoundaries:function(e){var h=this.options,g,i,b;h={minWidth:c(h.minWidth)?h.minWidth:0,maxWidth:c(h.maxWidth)?h.maxWidth:Infinity,minHeight:c(h.minHeight)?h.minHeight:0,maxHeight:c(h.maxHeight)?h.maxHeight:
Infinity};if(this._aspectRatio||e){e=h.minHeight*this.aspectRatio;i=h.minWidth/this.aspectRatio;g=h.maxHeight*this.aspectRatio;b=h.maxWidth/this.aspectRatio;if(e>h.minWidth)h.minWidth=e;if(i>h.minHeight)h.minHeight=i;if(g<h.maxWidth)h.maxWidth=g;if(b<h.maxHeight)h.maxHeight=b}this._vBoundaries=h},_updateCache:function(e){this.offset=this.helper.offset();if(c(e.left))this.position.left=e.left;if(c(e.top))this.position.top=e.top;if(c(e.height))this.size.height=e.height;if(c(e.width))this.size.width=
e.width},_updateRatio:function(e){var h=this.position,g=this.size,i=this.axis;if(c(e.height))e.width=e.height*this.aspectRatio;else if(c(e.width))e.height=e.width/this.aspectRatio;if(i=="sw"){e.left=h.left+(g.width-e.width);e.top=null}if(i=="nw"){e.top=h.top+(g.height-e.height);e.left=h.left+(g.width-e.width)}return e},_respectSize:function(e){var h=this._vBoundaries,g=this.axis,i=c(e.width)&&h.maxWidth&&h.maxWidth<e.width,b=c(e.height)&&h.maxHeight&&h.maxHeight<e.height,f=c(e.width)&&h.minWidth&&
h.minWidth>e.width,j=c(e.height)&&h.minHeight&&h.minHeight>e.height;if(f)e.width=h.minWidth;if(j)e.height=h.minHeight;if(i)e.width=h.maxWidth;if(b)e.height=h.maxHeight;var l=this.originalPosition.left+this.originalSize.width,o=this.position.top+this.size.height,n=/sw|nw|w/.test(g);g=/nw|ne|n/.test(g);if(f&&n)e.left=l-h.minWidth;if(i&&n)e.left=l-h.maxWidth;if(j&&g)e.top=o-h.minHeight;if(b&&g)e.top=o-h.maxHeight;if((h=!e.width&&!e.height)&&!e.left&&e.top)e.top=null;else if(h&&!e.top&&e.left)e.left=
null;return e},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var e=this.helper||this.element,h=0;h<this._proportionallyResizeElements.length;h++){var g=this._proportionallyResizeElements[h];if(!this.borderDif){var i=[g.css("borderTopWidth"),g.css("borderRightWidth"),g.css("borderBottomWidth"),g.css("borderLeftWidth")],b=[g.css("paddingTop"),g.css("paddingRight"),g.css("paddingBottom"),g.css("paddingLeft")];this.borderDif=a.map(i,function(f,j){f=parseInt(f,10)||
0;j=parseInt(b[j],10)||0;return f+j})}a.browser.msie&&(a(e).is(":hidden")||a(e).parents(":hidden").length)||g.css({height:e.height()-this.borderDif[0]-this.borderDif[2]||0,width:e.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var e=this.options;this.elementOffset=this.element.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var h=a.browser.msie&&a.browser.version<7,g=h?1:0;h=h?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+
h,height:this.element.outerHeight()+h,position:"absolute",left:this.elementOffset.left-g+"px",top:this.elementOffset.top-g+"px",zIndex:++e.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(e,h){return{width:this.originalSize.width+h}},w:function(e,h){return{left:this.originalPosition.left+h,width:this.originalSize.width-h}},n:function(e,h,g){return{top:this.originalPosition.top+g,height:this.originalSize.height-g}},s:function(e,h,g){return{height:this.originalSize.height+
g}},se:function(e,h,g){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,h,g]))},sw:function(e,h,g){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,h,g]))},ne:function(e,h,g){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,h,g]))},nw:function(e,h,g){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,h,g]))}},_propagate:function(e,h){a.ui.plugin.call(this,e,[h,this.ui()]);
e!="resize"&&this._trigger(e,h,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});a.extend(a.ui.resizable,{version:"1.8.16"});a.ui.plugin.add("resizable","alsoResize",{start:function(){var e=a(this).data("resizable").options,h=function(g){a(g).each(function(){var i=a(this);i.data("resizable-alsoresize",{width:parseInt(i.width(),
10),height:parseInt(i.height(),10),left:parseInt(i.css("left"),10),top:parseInt(i.css("top"),10),position:i.css("position")})})};if(typeof e.alsoResize=="object"&&!e.alsoResize.parentNode)if(e.alsoResize.length){e.alsoResize=e.alsoResize[0];h(e.alsoResize)}else a.each(e.alsoResize,function(g){h(g)});else h(e.alsoResize)},resize:function(e,h){var g=a(this).data("resizable");e=g.options;var i=g.originalSize,b=g.originalPosition,f={height:g.size.height-i.height||0,width:g.size.width-i.width||0,top:g.position.top-
b.top||0,left:g.position.left-b.left||0},j=function(l,o){a(l).each(function(){var n=a(this),k=a(this).data("resizable-alsoresize"),m={},p=o&&o.length?o:n.parents(h.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(p,function(q,s){if((q=(k[s]||0)+(f[s]||0))&&q>=0)m[s]=q||null});if(a.browser.opera&&/relative/.test(n.css("position"))){g._revertToRelativePosition=true;n.css({position:"absolute",top:"auto",left:"auto"})}n.css(m)})};typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?
a.each(e.alsoResize,function(l,o){j(l,o)}):j(e.alsoResize)},stop:function(){var e=a(this).data("resizable"),h=e.options,g=function(i){a(i).each(function(){var b=a(this);b.css({position:b.data("resizable-alsoresize").position})})};if(e._revertToRelativePosition){e._revertToRelativePosition=false;typeof h.alsoResize=="object"&&!h.alsoResize.nodeType?a.each(h.alsoResize,function(i){g(i)}):g(h.alsoResize)}a(this).removeData("resizable-alsoresize")}});a.ui.plugin.add("resizable","animate",{stop:function(e){var h=
a(this).data("resizable"),g=h.options,i=h._proportionallyResizeElements,b=i.length&&/textarea/i.test(i[0].nodeName),f=b&&a.ui.hasScroll(i[0],"left")?0:h.sizeDiff.height;b={width:h.size.width-(b?0:h.sizeDiff.width),height:h.size.height-f};f=parseInt(h.element.css("left"),10)+(h.position.left-h.originalPosition.left)||null;var j=parseInt(h.element.css("top"),10)+(h.position.top-h.originalPosition.top)||null;h.element.animate(a.extend(b,j&&f?{top:j,left:f}:{}),{duration:g.animateDuration,easing:g.animateEasing,
step:function(){var l={width:parseInt(h.element.css("width"),10),height:parseInt(h.element.css("height"),10),top:parseInt(h.element.css("top"),10),left:parseInt(h.element.css("left"),10)};i&&i.length&&a(i[0]).css({width:l.width,height:l.height});h._updateCache(l);h._propagate("resize",e)}})}});a.ui.plugin.add("resizable","containment",{start:function(){var e=a(this).data("resizable"),h=e.element,g=e.options.containment;if(h=g instanceof a?g.get(0):/parent/.test(g)?h.parent().get(0):g){e.containerElement=
a(h);if(/document/.test(g)||g==document){e.containerOffset={left:0,top:0};e.containerPosition={left:0,top:0};e.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight}}else{var i=a(h),b=[];a(["Top","Right","Left","Bottom"]).each(function(l,o){b[l]=d(i.css("padding"+o))});e.containerOffset=i.offset();e.containerPosition=i.position();e.containerSize={height:i.innerHeight()-b[3],width:i.innerWidth()-b[1]};g=e.containerOffset;
var f=e.containerSize.height,j=e.containerSize.width;j=a.ui.hasScroll(h,"left")?h.scrollWidth:j;f=a.ui.hasScroll(h)?h.scrollHeight:f;e.parentData={element:h,left:g.left,top:g.top,width:j,height:f}}}},resize:function(e){var h=a(this).data("resizable"),g=h.options,i=h.containerOffset,b=h.position;e=h._aspectRatio||e.shiftKey;var f={top:0,left:0},j=h.containerElement;if(j[0]!=document&&/static/.test(j.css("position")))f=i;if(b.left<(h._helper?i.left:0)){h.size.width+=h._helper?h.position.left-i.left:
h.position.left-f.left;if(e)h.size.height=h.size.width/g.aspectRatio;h.position.left=g.helper?i.left:0}if(b.top<(h._helper?i.top:0)){h.size.height+=h._helper?h.position.top-i.top:h.position.top;if(e)h.size.width=h.size.height*g.aspectRatio;h.position.top=h._helper?i.top:0}h.offset.left=h.parentData.left+h.position.left;h.offset.top=h.parentData.top+h.position.top;g=Math.abs((h._helper?h.offset.left-f.left:h.offset.left-f.left)+h.sizeDiff.width);i=Math.abs((h._helper?h.offset.top-f.top:h.offset.top-
i.top)+h.sizeDiff.height);b=h.containerElement.get(0)==h.element.parent().get(0);f=/relative|absolute/.test(h.containerElement.css("position"));if(b&&f)g-=h.parentData.left;if(g+h.size.width>=h.parentData.width){h.size.width=h.parentData.width-g;if(e)h.size.height=h.size.width/h.aspectRatio}if(i+h.size.height>=h.parentData.height){h.size.height=h.parentData.height-i;if(e)h.size.width=h.size.height*h.aspectRatio}},stop:function(){var e=a(this).data("resizable"),h=e.options,g=e.containerOffset,i=e.containerPosition,
b=e.containerElement,f=a(e.helper),j=f.offset(),l=f.outerWidth()-e.sizeDiff.width;f=f.outerHeight()-e.sizeDiff.height;e._helper&&!h.animate&&/relative/.test(b.css("position"))&&a(this).css({left:j.left-i.left-g.left,width:l,height:f});e._helper&&!h.animate&&/static/.test(b.css("position"))&&a(this).css({left:j.left-i.left-g.left,width:l,height:f})}});a.ui.plugin.add("resizable","ghost",{start:function(){var e=a(this).data("resizable"),h=e.options,g=e.size;e.ghost=e.originalElement.clone();e.ghost.css({opacity:0.25,
display:"block",position:"relative",height:g.height,width:g.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof h.ghost=="string"?h.ghost:"");e.ghost.appendTo(e.helper)},resize:function(){var e=a(this).data("resizable");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=a(this).data("resizable");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}});a.ui.plugin.add("resizable","grid",{resize:function(){var e=
a(this).data("resizable"),h=e.options,g=e.size,i=e.originalSize,b=e.originalPosition,f=e.axis;h.grid=typeof h.grid=="number"?[h.grid,h.grid]:h.grid;var j=Math.round((g.width-i.width)/(h.grid[0]||1))*(h.grid[0]||1);h=Math.round((g.height-i.height)/(h.grid[1]||1))*(h.grid[1]||1);if(/^(se|s|e)$/.test(f)){e.size.width=i.width+j;e.size.height=i.height+h}else if(/^(ne)$/.test(f)){e.size.width=i.width+j;e.size.height=i.height+h;e.position.top=b.top-h}else{if(/^(sw)$/.test(f)){e.size.width=i.width+j;e.size.height=
i.height+h}else{e.size.width=i.width+j;e.size.height=i.height+h;e.position.top=b.top-h}e.position.left=b.left-j}}});var d=function(e){return parseInt(e,10)||0},c=function(e){return!isNaN(parseInt(e,10))}})(jQuery);
(function(a){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var d=this;this.element.addClass("ui-selectable");this.dragged=false;var c;this.refresh=function(){c=a(d.options.filter,d.element[0]);c.each(function(){var e=a(this),h=e.offset();a.data(this,"selectable-item",{element:this,$element:e,left:h.left,top:h.top,right:h.left+e.outerWidth(),bottom:h.top+e.outerHeight(),startselected:false,selected:e.hasClass("ui-selected"),
selecting:e.hasClass("ui-selecting"),unselecting:e.hasClass("ui-unselecting")})})};this.refresh();this.selectees=c.addClass("ui-selectee");this._mouseInit();this.helper=a("<div class='ui-selectable-helper'></div>")},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy();return this},_mouseStart:function(d){var c=this;this.opos=[d.pageX,
d.pageY];if(!this.options.disabled){var e=this.options;this.selectees=a(e.filter,this.element[0]);this._trigger("start",d);a(e.appendTo).append(this.helper);this.helper.css({left:d.clientX,top:d.clientY,width:0,height:0});e.autoRefresh&&this.refresh();this.selectees.filter(".ui-selected").each(function(){var h=a.data(this,"selectable-item");h.startselected=true;if(!d.metaKey){h.$element.removeClass("ui-selected");h.selected=false;h.$element.addClass("ui-unselecting");h.unselecting=true;c._trigger("unselecting",
d,{unselecting:h.element})}});a(d.target).parents().andSelf().each(function(){var h=a.data(this,"selectable-item");if(h){var g=!d.metaKey||!h.$element.hasClass("ui-selected");h.$element.removeClass(g?"ui-unselecting":"ui-selected").addClass(g?"ui-selecting":"ui-unselecting");h.unselecting=!g;h.selecting=g;(h.selected=g)?c._trigger("selecting",d,{selecting:h.element}):c._trigger("unselecting",d,{unselecting:h.element});return false}})}},_mouseDrag:function(d){var c=this;this.dragged=true;if(!this.options.disabled){var e=
this.options,h=this.opos[0],g=this.opos[1],i=d.pageX,b=d.pageY;if(h>i){var f=i;i=h;h=f}if(g>b){f=b;b=g;g=f}this.helper.css({left:h,top:g,width:i-h,height:b-g});this.selectees.each(function(){var j=a.data(this,"selectable-item");if(!(!j||j.element==c.element[0])){var l=false;if(e.tolerance=="touch")l=!(j.left>i||j.right<h||j.top>b||j.bottom<g);else if(e.tolerance=="fit")l=j.left>h&&j.right<i&&j.top>g&&j.bottom<b;if(l){if(j.selected){j.$element.removeClass("ui-selected");j.selected=false}if(j.unselecting){j.$element.removeClass("ui-unselecting");
j.unselecting=false}if(!j.selecting){j.$element.addClass("ui-selecting");j.selecting=true;c._trigger("selecting",d,{selecting:j.element})}}else{if(j.selecting)if(d.metaKey&&j.startselected){j.$element.removeClass("ui-selecting");j.selecting=false;j.$element.addClass("ui-selected");j.selected=true}else{j.$element.removeClass("ui-selecting");j.selecting=false;if(j.startselected){j.$element.addClass("ui-unselecting");j.unselecting=true}c._trigger("unselecting",d,{unselecting:j.element})}if(j.selected)if(!d.metaKey&&
!j.startselected){j.$element.removeClass("ui-selected");j.selected=false;j.$element.addClass("ui-unselecting");j.unselecting=true;c._trigger("unselecting",d,{unselecting:j.element})}}}});return false}},_mouseStop:function(d){var c=this;this.dragged=false;a(".ui-unselecting",this.element[0]).each(function(){var e=a.data(this,"selectable-item");e.$element.removeClass("ui-unselecting");e.unselecting=false;e.startselected=false;c._trigger("unselected",d,{unselected:e.element})});a(".ui-selecting",this.element[0]).each(function(){var e=
a.data(this,"selectable-item");e.$element.removeClass("ui-selecting").addClass("ui-selected");e.selecting=false;e.selected=true;e.startselected=true;c._trigger("selected",d,{selected:e.element})});this._trigger("stop",d);this.helper.remove();return false}});a.extend(a.ui.selectable,{version:"1.8.16"})})(jQuery);
(function(a){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1E3},_create:function(){var d=this.options;this.containerCache={};this.element.addClass("ui-sortable");
this.refresh();this.floating=this.items.length?d.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var d=this.items.length-1;d>=0;d--)this.items[d].item.removeData("sortable-item");return this},_setOption:function(d,c){if(d===
"disabled"){this.options[d]=c;this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")}else a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(d,c){if(this.reverting)return false;if(this.options.disabled||this.options.type=="static")return false;this._refreshItems(d);var e=null,h=this;a(d.target).parents().each(function(){if(a.data(this,"sortable-item")==h){e=a(this);return false}});if(a.data(d.target,"sortable-item")==h)e=a(d.target);if(!e)return false;if(this.options.handle&&
!c){var g=false;a(this.options.handle,e).find("*").andSelf().each(function(){if(this==d.target)g=true});if(!g)return false}this.currentItem=e;this._removeCurrentsFromItems();return true},_mouseStart:function(d,c,e){c=this.options;var h=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(d);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,
left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");a.extend(this.offset,{click:{left:d.pageX-this.offset.left,top:d.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(d);this.originalPageX=d.pageX;this.originalPageY=d.pageY;c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();c.containment&&this._setContainment();if(c.cursor){if(a("body").css("cursor"))this._storedCursor=a("body").css("cursor");a("body").css("cursor",c.cursor)}if(c.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",c.opacity)}if(c.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",c.zIndex)}if(this.scrollParent[0]!=
document&&this.scrollParent[0].tagName!="HTML")this.overflowOffset=this.scrollParent.offset();this._trigger("start",d,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!e)for(e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("activate",d,h._uiHash(this));if(a.ui.ddmanager)a.ui.ddmanager.current=this;a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,d);this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(d);
return true},_mouseDrag:function(d){this.position=this._generatePosition(d);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;if(this.options.scroll){var c=this.options,e=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-d.pageY<c.scrollSensitivity)this.scrollParent[0].scrollTop=e=this.scrollParent[0].scrollTop+c.scrollSpeed;else if(d.pageY-this.overflowOffset.top<
c.scrollSensitivity)this.scrollParent[0].scrollTop=e=this.scrollParent[0].scrollTop-c.scrollSpeed;if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-d.pageX<c.scrollSensitivity)this.scrollParent[0].scrollLeft=e=this.scrollParent[0].scrollLeft+c.scrollSpeed;else if(d.pageX-this.overflowOffset.left<c.scrollSensitivity)this.scrollParent[0].scrollLeft=e=this.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(d.pageY-a(document).scrollTop()<c.scrollSensitivity)e=a(document).scrollTop(a(document).scrollTop()-
c.scrollSpeed);else if(a(window).height()-(d.pageY-a(document).scrollTop())<c.scrollSensitivity)e=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed);if(d.pageX-a(document).scrollLeft()<c.scrollSensitivity)e=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed);else if(a(window).width()-(d.pageX-a(document).scrollLeft())<c.scrollSensitivity)e=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed)}e!==false&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,
d)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(c=this.items.length-1;c>=0;c--){e=this.items[c];var h=e.item[0],g=this._intersectsWithPointer(e);if(g)if(h!=this.currentItem[0]&&this.placeholder[g==1?"next":"prev"]()[0]!=h&&!a.ui.contains(this.placeholder[0],h)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],
h):true)){this.direction=g==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(e))this._rearrange(d,e);else break;this._trigger("change",d,this._uiHash());break}}this._contactContainers(d);a.ui.ddmanager&&a.ui.ddmanager.drag(this,d);this._trigger("sort",d,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(d,c){if(d){a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,d);if(this.options.revert){var e=this;c=e.placeholder.offset();
e.reverting=true;a(this.helper).animate({left:c.left-this.offset.parent.left-e.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:c.top-this.offset.parent.top-e.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){e._clear(d)})}else this._clear(d,c);return false}},cancel:function(){var d=this;if(this.dragging){this._mouseUp({target:null});this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):
this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--){this.containers[c]._trigger("deactivate",null,d._uiHash(this));if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",null,d._uiHash(this));this.containers[c].containerCache.over=0}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();a.extend(this,{helper:null,
dragging:false,reverting:false,_noFinalSort:null});this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem)}return this},serialize:function(d){var c=this._getItemsAsjQuery(d&&d.connected),e=[];d=d||{};a(c).each(function(){var h=(a(d.item||this).attr(d.attribute||"id")||"").match(d.expression||/(.+)[-=_](.+)/);if(h)e.push((d.key||h[1]+"[]")+"="+(d.key&&d.expression?h[1]:h[2]))});!e.length&&d.key&&e.push(d.key+"=");return e.join("&")},
toArray:function(d){var c=this._getItemsAsjQuery(d&&d.connected),e=[];d=d||{};c.each(function(){e.push(a(d.item||this).attr(d.attribute||"id")||"")});return e},_intersectsWith:function(d){var c=this.positionAbs.left,e=c+this.helperProportions.width,h=this.positionAbs.top,g=h+this.helperProportions.height,i=d.left,b=i+d.width,f=d.top,j=f+d.height,l=this.offset.click.top,o=this.offset.click.left;l=h+l>f&&h+l<j&&c+o>i&&c+o<b;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||
this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>d[this.floating?"width":"height"]?l:i<c+this.helperProportions.width/2&&e-this.helperProportions.width/2<b&&f<h+this.helperProportions.height/2&&g-this.helperProportions.height/2<j},_intersectsWithPointer:function(d){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,d.top,d.height);d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,d.left,d.width);c=c&&d;d=this._getDragVerticalDirection();
var e=this._getDragHorizontalDirection();if(!c)return false;return this.floating?e&&e=="right"||d=="down"?2:1:d&&(d=="down"?2:1)},_intersectsWithSides:function(d){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,d.top+d.height/2,d.height);d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,d.left+d.width/2,d.width);var e=this._getDragVerticalDirection(),h=this._getDragHorizontalDirection();return this.floating&&h?h=="right"&&d||h=="left"&&!d:e&&(e=="down"&&c||e=="up"&&!c)},
_getDragVerticalDirection:function(){var d=this.positionAbs.top-this.lastPositionAbs.top;return d!=0&&(d>0?"down":"up")},_getDragHorizontalDirection:function(){var d=this.positionAbs.left-this.lastPositionAbs.left;return d!=0&&(d>0?"right":"left")},refresh:function(d){this._refreshItems(d);this.refreshPositions();return this},_connectWith:function(){var d=this.options;return d.connectWith.constructor==String?[d.connectWith]:d.connectWith},_getItemsAsjQuery:function(d){var c=[],e=[],h=this._connectWith();
if(h&&d)for(d=h.length-1;d>=0;d--)for(var g=a(h[d]),i=g.length-1;i>=0;i--){var b=a.data(g[i],"sortable");if(b&&b!=this&&!b.options.disabled)e.push([a.isFunction(b.options.items)?b.options.items.call(b.element):a(b.options.items,b.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),b])}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
this]);for(d=e.length-1;d>=0;d--)e[d][0].each(function(){c.push(this)});return a(c)},_removeCurrentsFromItems:function(){for(var d=this.currentItem.find(":data(sortable-item)"),c=0;c<this.items.length;c++)for(var e=0;e<d.length;e++)d[e]==this.items[c].item[0]&&this.items.splice(c,1)},_refreshItems:function(d){this.items=[];this.containers=[this];var c=this.items,e=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],d,{item:this.currentItem}):a(this.options.items,this.element),
this]],h=this._connectWith();if(h)for(var g=h.length-1;g>=0;g--)for(var i=a(h[g]),b=i.length-1;b>=0;b--){var f=a.data(i[b],"sortable");if(f&&f!=this&&!f.options.disabled){e.push([a.isFunction(f.options.items)?f.options.items.call(f.element[0],d,{item:this.currentItem}):a(f.options.items,f.element),f]);this.containers.push(f)}}for(g=e.length-1;g>=0;g--){d=e[g][1];h=e[g][0];b=0;for(i=h.length;b<i;b++){f=a(h[b]);f.data("sortable-item",d);c.push({item:f,instance:d,width:0,height:0,left:0,top:0})}}},refreshPositions:function(d){if(this.offsetParent&&
this.helper)this.offset.parent=this._getParentOffset();for(var c=this.items.length-1;c>=0;c--){var e=this.items[c];if(!(e.instance!=this.currentContainer&&this.currentContainer&&e.item[0]!=this.currentItem[0])){var h=this.options.toleranceElement?a(this.options.toleranceElement,e.item):e.item;if(!d){e.width=h.outerWidth();e.height=h.outerHeight()}h=h.offset();e.left=h.left;e.top=h.top}}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(c=
this.containers.length-1;c>=0;c--){h=this.containers[c].element.offset();this.containers[c].containerCache.left=h.left;this.containers[c].containerCache.top=h.top;this.containers[c].containerCache.width=this.containers[c].element.outerWidth();this.containers[c].containerCache.height=this.containers[c].element.outerHeight()}return this},_createPlaceholder:function(d){var c=d||this,e=c.options;if(!e.placeholder||e.placeholder.constructor==String){var h=e.placeholder;e.placeholder={element:function(){var g=
a(document.createElement(c.currentItem[0].nodeName)).addClass(h||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!h)g.style.visibility="hidden";return g},update:function(g,i){if(!(h&&!e.forcePlaceholderSize)){i.height()||i.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10));i.width()||i.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||
0,10))}}}}c.placeholder=a(e.placeholder.element.call(c.element,c.currentItem));c.currentItem.after(c.placeholder);e.placeholder.update(c,c.placeholder)},_contactContainers:function(d){for(var c=null,e=null,h=this.containers.length-1;h>=0;h--)if(!a.ui.contains(this.currentItem[0],this.containers[h].element[0]))if(this._intersectsWith(this.containers[h].containerCache)){if(!(c&&a.ui.contains(this.containers[h].element[0],c.element[0]))){c=this.containers[h];e=h}}else if(this.containers[h].containerCache.over){this.containers[h]._trigger("out",
d,this._uiHash(this));this.containers[h].containerCache.over=0}if(c)if(this.containers.length===1){this.containers[e]._trigger("over",d,this._uiHash(this));this.containers[e].containerCache.over=1}else if(this.currentContainer!=this.containers[e]){c=1E4;h=null;for(var g=this.positionAbs[this.containers[e].floating?"left":"top"],i=this.items.length-1;i>=0;i--)if(a.ui.contains(this.containers[e].element[0],this.items[i].item[0])){var b=this.items[i][this.containers[e].floating?"left":"top"];if(Math.abs(b-
g)<c){c=Math.abs(b-g);h=this.items[i]}}if(h||this.options.dropOnEmpty){this.currentContainer=this.containers[e];h?this._rearrange(d,h,null,true):this._rearrange(d,null,this.containers[e].element,true);this._trigger("change",d,this._uiHash());this.containers[e]._trigger("change",d,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[e]._trigger("over",d,this._uiHash(this));this.containers[e].containerCache.over=1}}},_createHelper:function(d){var c=
this.options;d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[d,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;d.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(d[0]);if(d[0]==this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};if(d[0].style.width==
""||c.forceHelperSize)d.width(this.currentItem.width());if(d[0].style.height==""||c.forceHelperSize)d.height(this.currentItem.height());return d},_adjustOffsetFromHelper:function(d){if(typeof d=="string")d=d.split(" ");if(a.isArray(d))d={left:+d[0],top:+d[1]||0};if("left"in d)this.offset.click.left=d.left+this.margins.left;if("right"in d)this.offset.click.left=this.helperProportions.width-d.right+this.margins.left;if("top"in d)this.offset.click.top=d.top+this.margins.top;if("bottom"in d)this.offset.click.top=
this.helperProportions.height-d.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var d=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){d.left+=this.scrollParent.scrollLeft();d.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)d=
{top:0,left:0};return{top:d.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:d.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var d=this.currentItem.position();return{top:d.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:d.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),
10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var d=this.options;if(d.containment=="parent")d.containment=this.helper[0].parentNode;if(d.containment=="document"||d.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(d.containment=="document"?
document:window).width()-this.helperProportions.width-this.margins.left,(a(d.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(d.containment)){var c=a(d.containment)[0];d=a(d.containment).offset();var e=a(c).css("overflow")!="hidden";this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),
10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(d,c){if(!c)c=
this.position;d=d=="absolute"?1:-1;var e=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=/(html|body)/i.test(e[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():h?0:e.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&
this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:e.scrollLeft())*d)}},_generatePosition:function(d){var c=this.options,e=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=/(html|body)/i.test(e[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();
var g=d.pageX,i=d.pageY;if(this.originalPosition){if(this.containment){if(d.pageX-this.offset.click.left<this.containment[0])g=this.containment[0]+this.offset.click.left;if(d.pageY-this.offset.click.top<this.containment[1])i=this.containment[1]+this.offset.click.top;if(d.pageX-this.offset.click.left>this.containment[2])g=this.containment[2]+this.offset.click.left;if(d.pageY-this.offset.click.top>this.containment[3])i=this.containment[3]+this.offset.click.top}if(c.grid){i=this.originalPageY+Math.round((i-
this.originalPageY)/c.grid[1])*c.grid[1];i=this.containment?!(i-this.offset.click.top<this.containment[1]||i-this.offset.click.top>this.containment[3])?i:!(i-this.offset.click.top<this.containment[1])?i-c.grid[1]:i+c.grid[1]:i;g=this.originalPageX+Math.round((g-this.originalPageX)/c.grid[0])*c.grid[0];g=this.containment?!(g-this.offset.click.left<this.containment[0]||g-this.offset.click.left>this.containment[2])?g:!(g-this.offset.click.left<this.containment[0])?g-c.grid[0]:g+c.grid[0]:g}}return{top:i-
this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():h?0:e.scrollTop()),left:g-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:e.scrollLeft())}},_rearrange:function(d,c,e,h){e?e[0].appendChild(this.placeholder[0]):c.item[0].parentNode.insertBefore(this.placeholder[0],
this.direction=="down"?c.item[0]:c.item[0].nextSibling);this.counter=this.counter?++this.counter:1;var g=this,i=this.counter;window.setTimeout(function(){i==g.counter&&g.refreshPositions(!h)},0)},_clear:function(d,c){this.reverting=false;var e=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var h in this._storedCSS)if(this._storedCSS[h]=="auto"||this._storedCSS[h]=="static")this._storedCSS[h]=
"";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!c&&e.push(function(g){this._trigger("receive",g,this._uiHash(this.fromOutside))});if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c)e.push(function(g){this._trigger("update",g,this._uiHash())});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||e.push(function(g){this._trigger("remove",
g,this._uiHash())});for(h=this.containers.length-1;h>=0;h--)if(a.ui.contains(this.containers[h].element[0],this.currentItem[0])&&!c){e.push(function(g){return function(i){g._trigger("receive",i,this._uiHash(this))}}.call(this,this.containers[h]));e.push(function(g){return function(i){g._trigger("update",i,this._uiHash(this))}}.call(this,this.containers[h]))}}for(h=this.containers.length-1;h>=0;h--){c||e.push(function(g){return function(i){g._trigger("deactivate",i,this._uiHash(this))}}.call(this,
this.containers[h]));if(this.containers[h].containerCache.over){e.push(function(g){return function(i){g._trigger("out",i,this._uiHash(this))}}.call(this,this.containers[h]));this.containers[h].containerCache.over=0}}this._storedCursor&&a("body").css("cursor",this._storedCursor);this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);if(this._storedZIndex)this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);this.dragging=false;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",
d,this._uiHash());for(h=0;h<e.length;h++)e[h].call(this,d);this._trigger("stop",d,this._uiHash())}return false}c||this._trigger("beforeStop",d,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.helper[0]!=this.currentItem[0]&&this.helper.remove();this.helper=null;if(!c){for(h=0;h<e.length;h++)e[h].call(this,d);this._trigger("stop",d,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()},
_uiHash:function(d){var c=d||this;return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:d?d.element:null}}});a.extend(a.ui.sortable,{version:"1.8.16"})})(jQuery);
jQuery.effects||function(a,d){function c(n){var k;if(n&&n.constructor==Array&&n.length==3)return n;if(k=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(n))return[parseInt(k[1],10),parseInt(k[2],10),parseInt(k[3],10)];if(k=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(n))return[parseFloat(k[1])*2.55,parseFloat(k[2])*2.55,parseFloat(k[3])*2.55];if(k=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(n))return[parseInt(k[1],
16),parseInt(k[2],16),parseInt(k[3],16)];if(k=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(n))return[parseInt(k[1]+k[1],16),parseInt(k[2]+k[2],16),parseInt(k[3]+k[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(n))return j.transparent;return j[a.trim(n).toLowerCase()]}function e(n,k){var m;do{m=a.curCSS(n,k);if(m!=""&&m!="transparent"||a.nodeName(n,"body"))break;k="backgroundColor"}while(n=n.parentNode);return c(m)}function h(){var n=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,
k={},m,p;if(n&&n.length&&n[0]&&n[n[0]])for(var q=n.length;q--;){m=n[q];if(typeof n[m]=="string"){p=m.replace(/\-(\w)/g,function(s,r){return r.toUpperCase()});k[p]=n[m]}}else for(m in n)if(typeof n[m]==="string")k[m]=n[m];return k}function g(n){var k,m;for(k in n){m=n[k];if(m==null||a.isFunction(m)||k in o||/scrollbar/.test(k)||!/color/i.test(k)&&isNaN(parseFloat(m)))delete n[k]}return n}function i(n,k){var m={_:0},p;for(p in k)if(n[p]!=k[p])m[p]=k[p];return m}function b(n,k,m,p){if(typeof n=="object"){p=
k;m=null;k=n;n=k.effect}if(a.isFunction(k)){p=k;m=null;k={}}if(typeof k=="number"||a.fx.speeds[k]){p=m;m=k;k={}}if(a.isFunction(m)){p=m;m=null}k=k||{};m=m||k.duration;m=a.fx.off?0:typeof m=="number"?m:m in a.fx.speeds?a.fx.speeds[m]:a.fx.speeds._default;p=p||k.complete;return[n,k,m,p]}function f(n){if(!n||typeof n==="number"||a.fx.speeds[n])return true;if(typeof n==="string"&&!a.effects[n])return true;return false}a.effects={};a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor",
"borderTopColor","borderColor","color","outlineColor"],function(n,k){a.fx.step[k]=function(m){if(!m.colorInit){m.start=e(m.elem,k);m.end=c(m.end);m.colorInit=true}m.elem.style[k]="rgb("+Math.max(Math.min(parseInt(m.pos*(m.end[0]-m.start[0])+m.start[0],10),255),0)+","+Math.max(Math.min(parseInt(m.pos*(m.end[1]-m.start[1])+m.start[1],10),255),0)+","+Math.max(Math.min(parseInt(m.pos*(m.end[2]-m.start[2])+m.start[2],10),255),0)+")"}});var j={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,
0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,
211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},l=["add","remove","toggle"],o={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(n,k,m,
p){if(a.isFunction(m)){p=m;m=null}return this.queue(function(){var q=a(this),s=q.attr("style")||" ",r=g(h.call(this)),u,v=q.attr("class");a.each(l,function(w,x){n[x]&&q[x+"Class"](n[x])});u=g(h.call(this));q.attr("class",v);q.animate(i(r,u),{queue:false,duration:k,easing:m,complete:function(){a.each(l,function(w,x){n[x]&&q[x+"Class"](n[x])});if(typeof q.attr("style")=="object"){q.attr("style").cssText="";q.attr("style").cssText=s}else q.attr("style",s);p&&p.apply(this,arguments);a.dequeue(this)}})})};
a.fn.extend({_addClass:a.fn.addClass,addClass:function(n,k,m,p){return k?a.effects.animateClass.apply(this,[{add:n},k,m,p]):this._addClass(n)},_removeClass:a.fn.removeClass,removeClass:function(n,k,m,p){return k?a.effects.animateClass.apply(this,[{remove:n},k,m,p]):this._removeClass(n)},_toggleClass:a.fn.toggleClass,toggleClass:function(n,k,m,p,q){return typeof k=="boolean"||k===d?m?a.effects.animateClass.apply(this,[k?{add:n}:{remove:n},m,p,q]):this._toggleClass(n,k):a.effects.animateClass.apply(this,
[{toggle:n},k,m,p])},switchClass:function(n,k,m,p,q){return a.effects.animateClass.apply(this,[{add:k,remove:n},m,p,q])}});a.extend(a.effects,{version:"1.8.16",save:function(n,k){for(var m=0;m<k.length;m++)k[m]!==null&&n.data("ec.storage."+k[m],n[0].style[k[m]])},restore:function(n,k){for(var m=0;m<k.length;m++)k[m]!==null&&n.css(k[m],n.data("ec.storage."+k[m]))},setMode:function(n,k){if(k=="toggle")k=n.is(":hidden")?"show":"hide";return k},getBaseline:function(n,k){var m;switch(n[0]){case "top":m=
0;break;case "middle":m=0.5;break;case "bottom":m=1;break;default:m=n[0]/k.height}switch(n[1]){case "left":n=0;break;case "center":n=0.5;break;case "right":n=1;break;default:n=n[1]/k.width}return{x:n,y:m}},createWrapper:function(n){if(n.parent().is(".ui-effects-wrapper"))return n.parent();var k={width:n.outerWidth(true),height:n.outerHeight(true),"float":n.css("float")},m=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),
p=document.activeElement;n.wrap(m);if(n[0]===p||a.contains(n[0],p))a(p).focus();m=n.parent();if(n.css("position")=="static"){m.css({position:"relative"});n.css({position:"relative"})}else{a.extend(k,{position:n.css("position"),zIndex:n.css("z-index")});a.each(["top","left","bottom","right"],function(q,s){k[s]=n.css(s);if(isNaN(parseInt(k[s],10)))k[s]="auto"});n.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}return m.css(k).show()},removeWrapper:function(n){var k,m=document.activeElement;
if(n.parent().is(".ui-effects-wrapper")){k=n.parent().replaceWith(n);if(n[0]===m||a.contains(n[0],m))a(m).focus();return k}return n},setTransition:function(n,k,m,p){p=p||{};a.each(k,function(q,s){unit=n.cssUnit(s);if(unit[0]>0)p[s]=unit[0]*m+unit[1]});return p}});a.fn.extend({effect:function(n){var k=b.apply(this,arguments),m={options:k[1],duration:k[2],callback:k[3]};k=m.options.mode;var p=a.effects[n];if(a.fx.off||!p)return k?this[k](m.duration,m.callback):this.each(function(){m.callback&&m.callback.call(this)});
return p.call(this,m)},_show:a.fn.show,show:function(n){if(f(n))return this._show.apply(this,arguments);else{var k=b.apply(this,arguments);k[1].mode="show";return this.effect.apply(this,k)}},_hide:a.fn.hide,hide:function(n){if(f(n))return this._hide.apply(this,arguments);else{var k=b.apply(this,arguments);k[1].mode="hide";return this.effect.apply(this,k)}},__toggle:a.fn.toggle,toggle:function(n){if(f(n)||typeof n==="boolean"||a.isFunction(n))return this.__toggle.apply(this,arguments);else{var k=b.apply(this,
arguments);k[1].mode="toggle";return this.effect.apply(this,k)}},cssUnit:function(n){var k=this.css(n),m=[];a.each(["em","px","%","pt"],function(p,q){if(k.indexOf(q)>0)m=[parseFloat(k),q]});return m}});a.easing.jswing=a.easing.swing;a.extend(a.easing,{def:"easeOutQuad",swing:function(n,k,m,p,q){return a.easing[a.easing.def](n,k,m,p,q)},easeInQuad:function(n,k,m,p,q){return p*(k/=q)*k+m},easeOutQuad:function(n,k,m,p,q){return-p*(k/=q)*(k-2)+m},easeInOutQuad:function(n,k,m,p,q){if((k/=q/2)<1)return p/
2*k*k+m;return-p/2*(--k*(k-2)-1)+m},easeInCubic:function(n,k,m,p,q){return p*(k/=q)*k*k+m},easeOutCubic:function(n,k,m,p,q){return p*((k=k/q-1)*k*k+1)+m},easeInOutCubic:function(n,k,m,p,q){if((k/=q/2)<1)return p/2*k*k*k+m;return p/2*((k-=2)*k*k+2)+m},easeInQuart:function(n,k,m,p,q){return p*(k/=q)*k*k*k+m},easeOutQuart:function(n,k,m,p,q){return-p*((k=k/q-1)*k*k*k-1)+m},easeInOutQuart:function(n,k,m,p,q){if((k/=q/2)<1)return p/2*k*k*k*k+m;return-p/2*((k-=2)*k*k*k-2)+m},easeInQuint:function(n,k,m,
p,q){return p*(k/=q)*k*k*k*k+m},easeOutQuint:function(n,k,m,p,q){return p*((k=k/q-1)*k*k*k*k+1)+m},easeInOutQuint:function(n,k,m,p,q){if((k/=q/2)<1)return p/2*k*k*k*k*k+m;return p/2*((k-=2)*k*k*k*k+2)+m},easeInSine:function(n,k,m,p,q){return-p*Math.cos(k/q*(Math.PI/2))+p+m},easeOutSine:function(n,k,m,p,q){return p*Math.sin(k/q*(Math.PI/2))+m},easeInOutSine:function(n,k,m,p,q){return-p/2*(Math.cos(Math.PI*k/q)-1)+m},easeInExpo:function(n,k,m,p,q){return k==0?m:p*Math.pow(2,10*(k/q-1))+m},easeOutExpo:function(n,
k,m,p,q){return k==q?m+p:p*(-Math.pow(2,-10*k/q)+1)+m},easeInOutExpo:function(n,k,m,p,q){if(k==0)return m;if(k==q)return m+p;if((k/=q/2)<1)return p/2*Math.pow(2,10*(k-1))+m;return p/2*(-Math.pow(2,-10*--k)+2)+m},easeInCirc:function(n,k,m,p,q){return-p*(Math.sqrt(1-(k/=q)*k)-1)+m},easeOutCirc:function(n,k,m,p,q){return p*Math.sqrt(1-(k=k/q-1)*k)+m},easeInOutCirc:function(n,k,m,p,q){if((k/=q/2)<1)return-p/2*(Math.sqrt(1-k*k)-1)+m;return p/2*(Math.sqrt(1-(k-=2)*k)+1)+m},easeInElastic:function(n,k,m,
p,q){n=1.70158;var s=0,r=p;if(k==0)return m;if((k/=q)==1)return m+p;s||(s=q*0.3);if(r<Math.abs(p)){r=p;n=s/4}else n=s/(2*Math.PI)*Math.asin(p/r);return-(r*Math.pow(2,10*(k-=1))*Math.sin((k*q-n)*2*Math.PI/s))+m},easeOutElastic:function(n,k,m,p,q){n=1.70158;var s=0,r=p;if(k==0)return m;if((k/=q)==1)return m+p;s||(s=q*0.3);if(r<Math.abs(p)){r=p;n=s/4}else n=s/(2*Math.PI)*Math.asin(p/r);return r*Math.pow(2,-10*k)*Math.sin((k*q-n)*2*Math.PI/s)+p+m},easeInOutElastic:function(n,k,m,p,q){n=1.70158;var s=
0,r=p;if(k==0)return m;if((k/=q/2)==2)return m+p;s||(s=q*0.3*1.5);if(r<Math.abs(p)){r=p;n=s/4}else n=s/(2*Math.PI)*Math.asin(p/r);if(k<1)return-0.5*r*Math.pow(2,10*(k-=1))*Math.sin((k*q-n)*2*Math.PI/s)+m;return r*Math.pow(2,-10*(k-=1))*Math.sin((k*q-n)*2*Math.PI/s)*0.5+p+m},easeInBack:function(n,k,m,p,q,s){if(s==d)s=1.70158;return p*(k/=q)*k*((s+1)*k-s)+m},easeOutBack:function(n,k,m,p,q,s){if(s==d)s=1.70158;return p*((k=k/q-1)*k*((s+1)*k+s)+1)+m},easeInOutBack:function(n,k,m,p,q,s){if(s==d)s=1.70158;
if((k/=q/2)<1)return p/2*k*k*(((s*=1.525)+1)*k-s)+m;return p/2*((k-=2)*k*(((s*=1.525)+1)*k+s)+2)+m},easeInBounce:function(n,k,m,p,q){return p-a.easing.easeOutBounce(n,q-k,0,p,q)+m},easeOutBounce:function(n,k,m,p,q){return(k/=q)<1/2.75?p*7.5625*k*k+m:k<2/2.75?p*(7.5625*(k-=1.5/2.75)*k+0.75)+m:k<2.5/2.75?p*(7.5625*(k-=2.25/2.75)*k+0.9375)+m:p*(7.5625*(k-=2.625/2.75)*k+0.984375)+m},easeInOutBounce:function(n,k,m,p,q){if(k<q/2)return a.easing.easeInBounce(n,k*2,0,p,q)*0.5+m;return a.easing.easeOutBounce(n,
k*2-q,0,p,q)*0.5+p*0.5+m}})}(jQuery);
(function(a){a.effects.blind=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],h=a.effects.setMode(c,d.options.mode||"hide"),g=d.options.direction||"vertical";a.effects.save(c,e);c.show();var i=a.effects.createWrapper(c).css({overflow:"hidden"}),b=g=="vertical"?"height":"width";g=g=="vertical"?i.height():i.width();h=="show"&&i.css(b,0);var f={};f[b]=h=="show"?g:0;i.animate(f,d.duration,d.options.easing,function(){h=="hide"&&c.hide();a.effects.restore(c,
e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(c[0],arguments);c.dequeue()})})}})(jQuery);
(function(a){a.effects.bounce=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],h=a.effects.setMode(c,d.options.mode||"effect"),g=d.options.direction||"up",i=d.options.distance||20,b=d.options.times||5,f=d.duration||250;/show|hide/.test(h)&&e.push("opacity");a.effects.save(c,e);c.show();a.effects.createWrapper(c);var j=g=="up"||g=="down"?"top":"left";g=g=="up"||g=="left"?"pos":"neg";i=d.options.distance||(j=="top"?c.outerHeight({margin:true})/3:c.outerWidth({margin:true})/
3);if(h=="show")c.css("opacity",0).css(j,g=="pos"?-i:i);if(h=="hide")i/=b*2;h!="hide"&&b--;if(h=="show"){var l={opacity:1};l[j]=(g=="pos"?"+=":"-=")+i;c.animate(l,f/2,d.options.easing);i/=2;b--}for(l=0;l<b;l++){var o={},n={};o[j]=(g=="pos"?"-=":"+=")+i;n[j]=(g=="pos"?"+=":"-=")+i;c.animate(o,f/2,d.options.easing).animate(n,f/2,d.options.easing);i=h=="hide"?i*2:i/2}if(h=="hide"){l={opacity:0};l[j]=(g=="pos"?"-=":"+=")+i;c.animate(l,f/2,d.options.easing,function(){c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);
d.callback&&d.callback.apply(this,arguments)})}else{o={};n={};o[j]=(g=="pos"?"-=":"+=")+i;n[j]=(g=="pos"?"+=":"-=")+i;c.animate(o,f/2,d.options.easing).animate(n,f/2,d.options.easing,function(){a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(this,arguments)})}c.queue("fx",function(){c.dequeue()});c.dequeue()})}})(jQuery);
(function(a){a.effects.clip=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right","height","width"],h=a.effects.setMode(c,d.options.mode||"hide"),g=d.options.direction||"vertical";a.effects.save(c,e);c.show();var i=a.effects.createWrapper(c).css({overflow:"hidden"});i=c[0].tagName=="IMG"?i:c;var b={size:g=="vertical"?"height":"width",position:g=="vertical"?"top":"left"};g=g=="vertical"?i.height():i.width();if(h=="show"){i.css(b.size,0);i.css(b.position,
g/2)}var f={};f[b.size]=h=="show"?g:0;f[b.position]=h=="show"?0:g/2;i.animate(f,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){h=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(c[0],arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.drop=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right","opacity"],h=a.effects.setMode(c,d.options.mode||"hide"),g=d.options.direction||"left";a.effects.save(c,e);c.show();a.effects.createWrapper(c);var i=g=="up"||g=="down"?"top":"left";g=g=="up"||g=="left"?"pos":"neg";var b=d.options.distance||(i=="top"?c.outerHeight({margin:true})/2:c.outerWidth({margin:true})/2);if(h=="show")c.css("opacity",0).css(i,g=="pos"?-b:b);var f={opacity:h==
"show"?1:0};f[i]=(h=="show"?g=="pos"?"+=":"-=":g=="pos"?"-=":"+=")+b;c.animate(f,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){h=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.explode=function(d){return this.queue(function(){var c=d.options.pieces?Math.round(Math.sqrt(d.options.pieces)):3,e=d.options.pieces?Math.round(Math.sqrt(d.options.pieces)):3;d.options.mode=d.options.mode=="toggle"?a(this).is(":visible")?"hide":"show":d.options.mode;var h=a(this).show().css("visibility","hidden"),g=h.offset();g.top-=parseInt(h.css("marginTop"),10)||0;g.left-=parseInt(h.css("marginLeft"),10)||0;for(var i=h.outerWidth(true),b=h.outerHeight(true),f=0;f<c;f++)for(var j=
0;j<e;j++)h.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(i/e),top:-f*(b/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:i/e,height:b/c,left:g.left+j*(i/e)+(d.options.mode=="show"?(j-Math.floor(e/2))*(i/e):0),top:g.top+f*(b/c)+(d.options.mode=="show"?(f-Math.floor(c/2))*(b/c):0),opacity:d.options.mode=="show"?0:1}).animate({left:g.left+j*(i/e)+(d.options.mode=="show"?0:(j-Math.floor(e/2))*(i/e)),top:g.top+
f*(b/c)+(d.options.mode=="show"?0:(f-Math.floor(c/2))*(b/c)),opacity:d.options.mode=="show"?1:0},d.duration||500);setTimeout(function(){d.options.mode=="show"?h.css({visibility:"visible"}):h.css({visibility:"visible"}).hide();d.callback&&d.callback.apply(h[0]);h.dequeue();a("div.ui-effects-explode").remove()},d.duration||500)})}})(jQuery);
(function(a){a.effects.fade=function(d){return this.queue(function(){var c=a(this),e=a.effects.setMode(c,d.options.mode||"hide");c.animate({opacity:e},{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){d.callback&&d.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.fold=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],h=a.effects.setMode(c,d.options.mode||"hide"),g=d.options.size||15,i=!!d.options.horizFirst,b=d.duration?d.duration/2:a.fx.speeds._default/2;a.effects.save(c,e);c.show();var f=a.effects.createWrapper(c).css({overflow:"hidden"}),j=h=="show"!=i,l=j?["width","height"]:["height","width"];j=j?[f.width(),f.height()]:[f.height(),f.width()];var o=/([0-9]+)%/.exec(g);if(o)g=parseInt(o[1],
10)/100*j[h=="hide"?0:1];if(h=="show")f.css(i?{height:0,width:g}:{height:g,width:0});i={};o={};i[l[0]]=h=="show"?j[0]:g;o[l[1]]=h=="show"?j[1]:0;f.animate(i,b,d.options.easing).animate(o,b,d.options.easing,function(){h=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(c[0],arguments);c.dequeue()})})}})(jQuery);
(function(a){a.effects.highlight=function(d){return this.queue(function(){var c=a(this),e=["backgroundImage","backgroundColor","opacity"],h=a.effects.setMode(c,d.options.mode||"show"),g={backgroundColor:c.css("backgroundColor")};if(h=="hide")g.opacity=0;a.effects.save(c,e);c.show().css({backgroundImage:"none",backgroundColor:d.options.color||"#ffff99"}).animate(g,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){h=="hide"&&c.hide();a.effects.restore(c,e);h=="show"&&!a.support.opacity&&
this.style.removeAttribute("filter");d.callback&&d.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.pulsate=function(d){return this.queue(function(){var c=a(this),e=a.effects.setMode(c,d.options.mode||"show");times=(d.options.times||5)*2-1;duration=d.duration?d.duration/2:a.fx.speeds._default/2;isVisible=c.is(":visible");animateTo=0;if(!isVisible){c.css("opacity",0).show();animateTo=1}if(e=="hide"&&isVisible||e=="show"&&!isVisible)times--;for(e=0;e<times;e++){c.animate({opacity:animateTo},duration,d.options.easing);animateTo=(animateTo+1)%2}c.animate({opacity:animateTo},duration,
d.options.easing,function(){animateTo==0&&c.hide();d.callback&&d.callback.apply(this,arguments)});c.queue("fx",function(){c.dequeue()}).dequeue()})}})(jQuery);
(function(a){a.effects.puff=function(d){return this.queue(function(){var c=a(this),e=a.effects.setMode(c,d.options.mode||"hide"),h=parseInt(d.options.percent,10)||150,g=h/100,i={height:c.height(),width:c.width()};a.extend(d.options,{fade:true,mode:e,percent:e=="hide"?h:100,from:e=="hide"?i:{height:i.height*g,width:i.width*g}});c.effect("scale",d.options,d.duration,d.callback);c.dequeue()})};a.effects.scale=function(d){return this.queue(function(){var c=a(this),e=a.extend(true,{},d.options),h=a.effects.setMode(c,
d.options.mode||"effect"),g=parseInt(d.options.percent,10)||(parseInt(d.options.percent,10)==0?0:h=="hide"?0:100),i=d.options.direction||"both",b=d.options.origin;if(h!="effect"){e.origin=b||["middle","center"];e.restore=true}b={height:c.height(),width:c.width()};c.from=d.options.from||(h=="show"?{height:0,width:0}:b);g={y:i!="horizontal"?g/100:1,x:i!="vertical"?g/100:1};c.to={height:b.height*g.y,width:b.width*g.x};if(d.options.fade){if(h=="show"){c.from.opacity=0;c.to.opacity=1}if(h=="hide"){c.from.opacity=
1;c.to.opacity=0}}e.from=c.from;e.to=c.to;e.mode=h;c.effect("size",e,d.duration,d.callback);c.dequeue()})};a.effects.size=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],g=["width","height","overflow"],i=["fontSize"],b=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],f=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],
j=a.effects.setMode(c,d.options.mode||"effect"),l=d.options.restore||false,o=d.options.scale||"both",n=d.options.origin,k={height:c.height(),width:c.width()};c.from=d.options.from||k;c.to=d.options.to||k;if(n){n=a.effects.getBaseline(n,k);c.from.top=(k.height-c.from.height)*n.y;c.from.left=(k.width-c.from.width)*n.x;c.to.top=(k.height-c.to.height)*n.y;c.to.left=(k.width-c.to.width)*n.x}var m={from:{y:c.from.height/k.height,x:c.from.width/k.width},to:{y:c.to.height/k.height,x:c.to.width/k.width}};
if(o=="box"||o=="both"){if(m.from.y!=m.to.y){e=e.concat(b);c.from=a.effects.setTransition(c,b,m.from.y,c.from);c.to=a.effects.setTransition(c,b,m.to.y,c.to)}if(m.from.x!=m.to.x){e=e.concat(f);c.from=a.effects.setTransition(c,f,m.from.x,c.from);c.to=a.effects.setTransition(c,f,m.to.x,c.to)}}if(o=="content"||o=="both")if(m.from.y!=m.to.y){e=e.concat(i);c.from=a.effects.setTransition(c,i,m.from.y,c.from);c.to=a.effects.setTransition(c,i,m.to.y,c.to)}a.effects.save(c,l?e:h);c.show();a.effects.createWrapper(c);
c.css("overflow","hidden").css(c.from);if(o=="content"||o=="both"){b=b.concat(["marginTop","marginBottom"]).concat(i);f=f.concat(["marginLeft","marginRight"]);g=e.concat(b).concat(f);c.find("*[width]").each(function(){child=a(this);l&&a.effects.save(child,g);var p={height:child.height(),width:child.width()};child.from={height:p.height*m.from.y,width:p.width*m.from.x};child.to={height:p.height*m.to.y,width:p.width*m.to.x};if(m.from.y!=m.to.y){child.from=a.effects.setTransition(child,b,m.from.y,child.from);
child.to=a.effects.setTransition(child,b,m.to.y,child.to)}if(m.from.x!=m.to.x){child.from=a.effects.setTransition(child,f,m.from.x,child.from);child.to=a.effects.setTransition(child,f,m.to.x,child.to)}child.css(child.from);child.animate(child.to,d.duration,d.options.easing,function(){l&&a.effects.restore(child,g)})})}c.animate(c.to,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){c.to.opacity===0&&c.css("opacity",c.from.opacity);j=="hide"&&c.hide();a.effects.restore(c,
l?e:h);a.effects.removeWrapper(c);d.callback&&d.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.shake=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"];a.effects.setMode(c,d.options.mode||"effect");var h=d.options.direction||"left",g=d.options.distance||20,i=d.options.times||3,b=d.duration||d.options.duration||140;a.effects.save(c,e);c.show();a.effects.createWrapper(c);var f=h=="up"||h=="down"?"top":"left",j=h=="up"||h=="left"?"pos":"neg";h={};var l={},o={};h[f]=(j=="pos"?"-=":"+=")+g;l[f]=(j=="pos"?"+=":"-=")+g*2;o[f]=
(j=="pos"?"-=":"+=")+g*2;c.animate(h,b,d.options.easing);for(g=1;g<i;g++)c.animate(l,b,d.options.easing).animate(o,b,d.options.easing);c.animate(l,b,d.options.easing).animate(h,b/2,d.options.easing,function(){a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(this,arguments)});c.queue("fx",function(){c.dequeue()});c.dequeue()})}})(jQuery);
(function(a){a.effects.slide=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],h=a.effects.setMode(c,d.options.mode||"show"),g=d.options.direction||"left";a.effects.save(c,e);c.show();a.effects.createWrapper(c).css({overflow:"hidden"});var i=g=="up"||g=="down"?"top":"left";g=g=="up"||g=="left"?"pos":"neg";var b=d.options.distance||(i=="top"?c.outerHeight({margin:true}):c.outerWidth({margin:true}));if(h=="show")c.css(i,g=="pos"?isNaN(b)?"-"+b:-b:b);
var f={};f[i]=(h=="show"?g=="pos"?"+=":"-=":g=="pos"?"-=":"+=")+b;c.animate(f,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){h=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.transfer=function(d){return this.queue(function(){var c=a(this),e=a(d.options.to),h=e.offset();e={top:h.top,left:h.left,height:e.innerHeight(),width:e.innerWidth()};h=c.offset();var g=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(d.options.className).css({top:h.top,left:h.left,height:c.innerHeight(),width:c.innerWidth(),position:"absolute"}).animate(e,d.duration,d.options.easing,function(){g.remove();d.callback&&d.callback.apply(c[0],arguments);
c.dequeue()})})}})(jQuery);
(function(a){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var d=this,c=d.options;d.running=0;d.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");d.headers=
d.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){c.disabled||a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){c.disabled||a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){c.disabled||a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){c.disabled||a(this).removeClass("ui-state-focus")});d.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(c.navigation){var e=d.element.find("a").filter(c.navigationFilter).eq(0);if(e.length){var h=e.closest(".ui-accordion-header");d.active=h.length?h:e.closest(".ui-accordion-content").prev()}}d.active=d._findActive(d.active||c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");d.active.next().addClass("ui-accordion-content-active");d._createIcons();d.resize();d.element.attr("role","tablist");d.headers.attr("role","tab").bind("keydown.accordion",
function(g){return d._keydown(g)}).next().attr("role","tabpanel");d.headers.not(d.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide();d.active.length?d.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):d.headers.eq(0).attr("tabIndex",0);a.browser.safari||d.headers.find("a").attr("tabIndex",-1);c.event&&d.headers.bind(c.event.split(" ").join(".accordion ")+".accordion",function(g){d._clickHandler.call(d,g,this);g.preventDefault()})},_createIcons:function(){var d=
this.options;if(d.icons){a("<span></span>").addClass("ui-icon "+d.icons.header).prependTo(this.headers);this.active.children(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);this.element.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();this.element.removeClass("ui-accordion-icons")},destroy:function(){var d=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");this._destroyIcons();var c=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");if(d.autoHeight||d.fillHeight)c.css("height","");return a.Widget.prototype.destroy.call(this)},_setOption:function(d,c){a.Widget.prototype._setOption.apply(this,arguments);d=="active"&&this.activate(c);if(d=="icons"){this._destroyIcons();
c&&this._createIcons()}if(d=="disabled")this.headers.add(this.headers.next())[c?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(d){if(!(this.options.disabled||d.altKey||d.ctrlKey)){var c=a.ui.keyCode,e=this.headers.length,h=this.headers.index(d.target),g=false;switch(d.keyCode){case c.RIGHT:case c.DOWN:g=this.headers[(h+1)%e];break;case c.LEFT:case c.UP:g=this.headers[(h-1+e)%e];break;case c.SPACE:case c.ENTER:this._clickHandler({target:d.target},d.target);
d.preventDefault()}if(g){a(d.target).attr("tabIndex",-1);a(g).attr("tabIndex",0);g.focus();return false}return true}},resize:function(){var d=this.options,c;if(d.fillSpace){if(a.browser.msie){var e=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}c=this.element.parent().height();a.browser.msie&&this.element.parent().css("overflow",e);this.headers.each(function(){c-=a(this).outerHeight(true)});this.headers.next().each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+
a(this).height()))}).css("overflow","auto")}else if(d.autoHeight){c=0;this.headers.next().each(function(){c=Math.max(c,a(this).height("").height())}).height(c)}return this},activate:function(d){this.options.active=d;d=this._findActive(d)[0];this._clickHandler({target:d},d);return this},_findActive:function(d){return d?typeof d==="number"?this.headers.filter(":eq("+d+")"):this.headers.not(this.headers.not(d)):d===false?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(d,c){var e=this.options;
if(!e.disabled)if(d.target){d=a(d.currentTarget||c);c=d[0]===this.active[0];e.active=e.collapsible&&c?false:this.headers.index(d);if(!(this.running||!e.collapsible&&c)){var h=this.active;f=d.next();i=this.active.next();b={options:e,newHeader:c&&e.collapsible?a([]):d,oldHeader:this.active,newContent:c&&e.collapsible?a([]):f,oldContent:i};var g=this.headers.index(this.active[0])>this.headers.index(d[0]);this.active=c?a([]):d;this._toggle(f,i,b,c,g);h.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header);
if(!c){d.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(e.icons.header).addClass(e.icons.headerSelected);d.next().addClass("ui-accordion-content-active")}}}else if(e.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header);this.active.next().addClass("ui-accordion-content-active");var i=this.active.next(),
b={options:e,newHeader:a([]),oldHeader:e.active,newContent:a([]),oldContent:i},f=this.active=a([]);this._toggle(f,i,b)}},_toggle:function(d,c,e,h,g){var i=this,b=i.options;i.toShow=d;i.toHide=c;i.data=e;var f=function(){if(i)return i._completed.apply(i,arguments)};i._trigger("changestart",null,i.data);i.running=c.size()===0?d.size():c.size();if(b.animated){e={};e=b.collapsible&&h?{toShow:a([]),toHide:c,complete:f,down:g,autoHeight:b.autoHeight||b.fillSpace}:{toShow:d,toHide:c,complete:f,down:g,autoHeight:b.autoHeight||
b.fillSpace};if(!b.proxied)b.proxied=b.animated;if(!b.proxiedDuration)b.proxiedDuration=b.duration;b.animated=a.isFunction(b.proxied)?b.proxied(e):b.proxied;b.duration=a.isFunction(b.proxiedDuration)?b.proxiedDuration(e):b.proxiedDuration;h=a.ui.accordion.animations;var j=b.duration,l=b.animated;if(l&&!h[l]&&!a.easing[l])l="slide";h[l]||(h[l]=function(o){this.slide(o,{easing:l,duration:j||700})});h[l](e)}else{if(b.collapsible&&h)d.toggle();else{c.hide();d.show()}f(true)}c.prev().attr({"aria-expanded":"false",
"aria-selected":"false",tabIndex:-1}).blur();d.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(d){this.running=d?0:--this.running;if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});this.toHide.removeClass("ui-accordion-content-active");if(this.toHide.length)this.toHide.parent()[0].className=this.toHide.parent()[0].className;this._trigger("change",null,this.data)}}});a.extend(a.ui.accordion,{version:"1.8.16",
animations:{slide:function(d,c){d=a.extend({easing:"swing",duration:300},d,c);if(d.toHide.size())if(d.toShow.size()){var e=d.toShow.css("overflow"),h=0,g={},i={},b;c=d.toShow;b=c[0].style.width;c.width(parseInt(c.parent().width(),10)-parseInt(c.css("paddingLeft"),10)-parseInt(c.css("paddingRight"),10)-(parseInt(c.css("borderLeftWidth"),10)||0)-(parseInt(c.css("borderRightWidth"),10)||0));a.each(["height","paddingTop","paddingBottom"],function(f,j){i[j]="hide";f=(""+a.css(d.toShow[0],j)).match(/^([\d+-.]+)(.*)$/);
g[j]={value:f[1],unit:f[2]||"px"}});d.toShow.css({height:0,overflow:"hidden"}).show();d.toHide.filter(":hidden").each(d.complete).end().filter(":visible").animate(i,{step:function(f,j){if(j.prop=="height")h=j.end-j.start===0?0:(j.now-j.start)/(j.end-j.start);d.toShow[0].style[j.prop]=h*g[j.prop].value+g[j.prop].unit},duration:d.duration,easing:d.easing,complete:function(){d.autoHeight||d.toShow.css("height","");d.toShow.css({width:b,overflow:e});d.complete()}})}else d.toHide.animate({height:"hide",
paddingTop:"hide",paddingBottom:"hide"},d);else d.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},d)},bounceslide:function(d){this.slide(d,{easing:d.down?"easeOutBounce":"swing",duration:d.down?1E3:200})}}})})(jQuery);
(function(a){var d=0;a.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var c=this,e=this.element[0].ownerDocument,h;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(g){if(!(c.options.disabled||c.element.propAttr("readOnly"))){h=
false;var i=a.ui.keyCode;switch(g.keyCode){case i.PAGE_UP:c._move("previousPage",g);break;case i.PAGE_DOWN:c._move("nextPage",g);break;case i.UP:c._move("previous",g);g.preventDefault();break;case i.DOWN:c._move("next",g);g.preventDefault();break;case i.ENTER:case i.NUMPAD_ENTER:if(c.menu.active){h=true;g.preventDefault()}case i.TAB:if(!c.menu.active)return;c.menu.select(g);break;case i.ESCAPE:c.element.val(c.term);c.close(g);break;default:clearTimeout(c.searching);c.searching=setTimeout(function(){if(c.term!=
c.element.val()){c.selectedItem=null;c.search(null,g)}},c.options.delay);break}}}).bind("keypress.autocomplete",function(g){if(h){h=false;g.preventDefault()}}).bind("focus.autocomplete",function(){if(!c.options.disabled){c.selectedItem=null;c.previous=c.element.val()}}).bind("blur.autocomplete",function(g){if(!c.options.disabled){clearTimeout(c.searching);c.closing=setTimeout(function(){c.close(g);c._change(g)},150)}});this._initSource();this.response=function(){return c._response.apply(c,arguments)};
this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",e)[0]).mousedown(function(g){var i=c.menu.element[0];a(g.target).closest(".ui-menu-item").length||setTimeout(function(){a(document).one("mousedown",function(b){b.target!==c.element[0]&&b.target!==i&&!a.ui.contains(i,b.target)&&c.close()})},1);setTimeout(function(){clearTimeout(c.closing)},13)}).menu({focus:function(g,i){i=i.item.data("item.autocomplete");false!==c._trigger("focus",g,{item:i})&&/^key/.test(g.originalEvent.type)&&
c.element.val(i.value)},selected:function(g,i){var b=i.item.data("item.autocomplete"),f=c.previous;if(c.element[0]!==e.activeElement){c.element.focus();c.previous=f;setTimeout(function(){c.previous=f;c.selectedItem=b},1)}false!==c._trigger("select",g,{item:b})&&c.element.val(b.value);c.term=c.element.val();c.close(g);c.selectedItem=b},blur:function(){c.menu.element.is(":visible")&&c.element.val()!==c.term&&c.element.val(c.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");
a.fn.bgiframe&&this.menu.element.bgiframe()},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");this.menu.element.remove();a.Widget.prototype.destroy.call(this)},_setOption:function(c,e){a.Widget.prototype._setOption.apply(this,arguments);c==="source"&&this._initSource();if(c==="appendTo")this.menu.element.appendTo(a(e||"body",this.element[0].ownerDocument)[0]);c==="disabled"&&
e&&this.xhr&&this.xhr.abort()},_initSource:function(){var c=this,e,h;if(a.isArray(this.options.source)){e=this.options.source;this.source=function(g,i){i(a.ui.autocomplete.filter(e,g.term))}}else if(typeof this.options.source==="string"){h=this.options.source;this.source=function(g,i){c.xhr&&c.xhr.abort();c.xhr=a.ajax({url:h,data:g,dataType:"json",autocompleteRequest:++d,success:function(b){this.autocompleteRequest===d&&i(b)},error:function(){this.autocompleteRequest===d&&i([])}})}}else this.source=
this.options.source},search:function(c,e){c=c!=null?c:this.element.val();this.term=this.element.val();if(c.length<this.options.minLength)return this.close(e);clearTimeout(this.closing);if(this._trigger("search",e)!==false)return this._search(c)},_search:function(c){this.pending++;this.element.addClass("ui-autocomplete-loading");this.source({term:c},this.response)},_response:function(c){if(!this.options.disabled&&c&&c.length){c=this._normalize(c);this._suggest(c);this._trigger("open")}else this.close();
this.pending--;this.pending||this.element.removeClass("ui-autocomplete-loading")},close:function(c){clearTimeout(this.closing);if(this.menu.element.is(":visible")){this.menu.element.hide();this.menu.deactivate();this._trigger("close",c)}},_change:function(c){this.previous!==this.element.val()&&this._trigger("change",c,{item:this.selectedItem})},_normalize:function(c){if(c.length&&c[0].label&&c[0].value)return c;return a.map(c,function(e){if(typeof e==="string")return{label:e,value:e};return a.extend({label:e.label||
e.value,value:e.value||e.label},e)})},_suggest:function(c){var e=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(e,c);this.menu.deactivate();this.menu.refresh();e.show();this._resizeMenu();e.position(a.extend({of:this.element},this.options.position));this.options.autoFocus&&this.menu.next(new a.Event("mouseover"))},_resizeMenu:function(){var c=this.menu.element;c.outerWidth(Math.max(c.width("").outerWidth(),this.element.outerWidth()))},_renderMenu:function(c,e){var h=this;
a.each(e,function(g,i){h._renderItem(c,i)})},_renderItem:function(c,e){return a("<li></li>").data("item.autocomplete",e).append(a("<a></a>").text(e.label)).appendTo(c)},_move:function(c,e){if(this.menu.element.is(":visible"))if(this.menu.first()&&/^previous/.test(c)||this.menu.last()&&/^next/.test(c)){this.element.val(this.term);this.menu.deactivate()}else this.menu[c](e);else this.search(null,e)},widget:function(){return this.menu.element}});a.extend(a.ui.autocomplete,{escapeRegex:function(c){return c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,
"\\$&")},filter:function(c,e){var h=new RegExp(a.ui.autocomplete.escapeRegex(e),"i");return a.grep(c,function(g){return h.test(g.label||g.value||g)})}})})(jQuery);
(function(a){a.widget("ui.menu",{_create:function(){var d=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){if(a(c.target).closest(".ui-menu-item a").length){c.preventDefault();d.select(c)}});this.refresh()},refresh:function(){var d=this;this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",
-1).mouseenter(function(c){d.activate(c,a(this).parent())}).mouseleave(function(){d.deactivate()})},activate:function(d,c){this.deactivate();if(this.hasScroll()){var e=c.offset().top-this.element.offset().top,h=this.element.scrollTop(),g=this.element.height();if(e<0)this.element.scrollTop(h+e);else e>=g&&this.element.scrollTop(h+e-g+c.height())}this.active=c.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();this._trigger("focus",d,{item:c})},deactivate:function(){if(this.active){this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
this._trigger("blur");this.active=null}},next:function(d){this.move("next",".ui-menu-item:first",d)},previous:function(d){this.move("prev",".ui-menu-item:last",d)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(d,c,e){if(this.active){d=this.active[d+"All"](".ui-menu-item").eq(0);d.length?this.activate(e,d):this.activate(e,this.element.children(c))}else this.activate(e,
this.element.children(c))},nextPage:function(d){if(this.hasScroll())if(!this.active||this.last())this.activate(d,this.element.children(".ui-menu-item:first"));else{var c=this.active.offset().top,e=this.element.height(),h=this.element.children(".ui-menu-item").filter(function(){var g=a(this).offset().top-c-e+a(this).height();return g<10&&g>-10});h.length||(h=this.element.children(".ui-menu-item:last"));this.activate(d,h)}else this.activate(d,this.element.children(".ui-menu-item").filter(!this.active||
this.last()?":first":":last"))},previousPage:function(d){if(this.hasScroll())if(!this.active||this.first())this.activate(d,this.element.children(".ui-menu-item:last"));else{var c=this.active.offset().top,e=this.element.height();result=this.element.children(".ui-menu-item").filter(function(){var h=a(this).offset().top-c+e-a(this).height();return h<10&&h>-10});result.length||(result=this.element.children(".ui-menu-item:first"));this.activate(d,result)}else this.activate(d,this.element.children(".ui-menu-item").filter(!this.active||
this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight")},select:function(d){this._trigger("selected",d,{item:this.active})}})})(jQuery);
(function(a){var d,c,e,h,g=function(){var b=a(this).find(":ui-button");setTimeout(function(){b.button("refresh")},1)},i=function(b){var f=b.name,j=b.form,l=a([]);if(f)l=j?a(j).find("[name='"+f+"']"):a("[name='"+f+"']",b.ownerDocument).filter(function(){return!this.form});return l};a.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",g);if(typeof this.options.disabled!==
"boolean")this.options.disabled=this.element.propAttr("disabled");this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var b=this,f=this.options,j=this.type==="checkbox"||this.type==="radio",l="ui-state-hover"+(!j?" ui-state-active":"");if(f.label===null)f.label=this.buttonElement.html();if(this.element.is(":disabled"))f.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){if(!f.disabled){a(this).addClass("ui-state-hover");
this===d&&a(this).addClass("ui-state-active")}}).bind("mouseleave.button",function(){f.disabled||a(this).removeClass(l)}).bind("click.button",function(o){if(f.disabled){o.preventDefault();o.stopImmediatePropagation()}});this.element.bind("focus.button",function(){b.buttonElement.addClass("ui-state-focus")}).bind("blur.button",function(){b.buttonElement.removeClass("ui-state-focus")});if(j){this.element.bind("change.button",function(){h||b.refresh()});this.buttonElement.bind("mousedown.button",function(o){if(!f.disabled){h=
false;c=o.pageX;e=o.pageY}}).bind("mouseup.button",function(o){if(!f.disabled)if(c!==o.pageX||e!==o.pageY)h=true})}if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(f.disabled||h)return false;a(this).toggleClass("ui-state-active");b.buttonElement.attr("aria-pressed",b.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",function(){if(f.disabled||h)return false;a(this).addClass("ui-state-active");b.buttonElement.attr("aria-pressed","true");
var o=b.element[0];i(o).not(o).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")});else{this.buttonElement.bind("mousedown.button",function(){if(f.disabled)return false;a(this).addClass("ui-state-active");d=this;a(document).one("mouseup",function(){d=null})}).bind("mouseup.button",function(){if(f.disabled)return false;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(o){if(f.disabled)return false;if(o.keyCode==a.ui.keyCode.SPACE||
o.keyCode==a.ui.keyCode.ENTER)a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(o){o.keyCode===a.ui.keyCode.SPACE&&a(this).click()})}this._setOption("disabled",f.disabled);this._resetButton()},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type===
"radio"){var b=this.element.parents().filter(":last"),f="label[for='"+this.element.attr("id")+"']";this.buttonElement=b.find(f);if(!this.buttonElement.length){b=b.length?b.siblings():this.element.siblings();this.buttonElement=b.filter(f);if(!this.buttonElement.length)this.buttonElement=b.find(f)}this.element.addClass("ui-helper-hidden-accessible");(b=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",b)}else this.buttonElement=this.element},
widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());this.hasTitle||this.buttonElement.removeAttr("title");
a.Widget.prototype.destroy.call(this)},_setOption:function(b,f){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled")f?this.element.propAttr("disabled",true):this.element.propAttr("disabled",false);else this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b);if(this.type==="radio")i(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
"true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false")},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
f=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),j=this.options.icons,l=j.primary&&j.secondary,o=[];if(j.primary||j.secondary){if(this.options.text)o.push("ui-button-text-icon"+(l?"s":j.primary?"-primary":"-secondary"));j.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+j.primary+"'></span>");j.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+j.secondary+"'></span>");if(!this.options.text){o.push(l?"ui-button-icons-only":
"ui-button-icon-only");this.hasTitle||b.attr("title",f)}}else o.push("ui-button-text-only");b.addClass(o.join(" "))}}});a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,f){b==="disabled"&&this.buttons.button("option",b,f);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var b=this.element.css("direction")===
"ltr";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-left":"ui-corner-right").end().filter(":last").addClass(b?"ui-corner-right":"ui-corner-left").end().end()},destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
a.Widget.prototype.destroy.call(this)}})})(jQuery);
(function(a,d){function c(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass=
"ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su",
"Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",
minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false,disabled:false};a.extend(this._defaults,this.regional[""]);this.dpDiv=e(a('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function e(b){return b.bind("mouseout",
function(f){f=a(f.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");f.length&&f.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")}).bind("mouseover",function(f){f=a(f.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");if(!(a.datepicker._isDisabledDatepicker(i.inline?b.parent()[0]:i.input[0])||!f.length)){f.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
f.addClass("ui-state-hover");f.hasClass("ui-datepicker-prev")&&f.addClass("ui-datepicker-prev-hover");f.hasClass("ui-datepicker-next")&&f.addClass("ui-datepicker-next-hover")}})}function h(b,f){a.extend(b,f);for(var j in f)if(f[j]==null||f[j]==d)b[j]=f[j];return b}a.extend(a.ui,{datepicker:{version:"1.8.16"}});var g=(new Date).getTime(),i;a.extend(c.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},
setDefaults:function(b){h(this._defaults,b||{});return this},_attachDatepicker:function(b,f){var j=null;for(var l in this._defaults){var o=b.getAttribute("date:"+l);if(o){j=j||{};try{j[l]=eval(o)}catch(n){j[l]=o}}}l=b.nodeName.toLowerCase();o=l=="div"||l=="span";if(!b.id){this.uuid+=1;b.id="dp"+this.uuid}var k=this._newInst(a(b),o);k.settings=a.extend({},f||{},j||{});if(l=="input")this._connectDatepicker(b,k);else o&&this._inlineDatepicker(b,k)},_newInst:function(b,f){return{id:b[0].id.replace(/([^A-Za-z0-9_-])/g,
"\\\\$1"),input:b,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:f,dpDiv:!f?this.dpDiv:e(a('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}},_connectDatepicker:function(b,f){var j=a(b);f.append=a([]);f.trigger=a([]);if(!j.hasClass(this.markerClassName)){this._attachments(j,f);j.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",
function(l,o,n){f.settings[o]=n}).bind("getData.datepicker",function(l,o){return this._get(f,o)});this._autoSize(f);a.data(b,"datepicker",f);f.settings.disabled&&this._disableDatepicker(b)}},_attachments:function(b,f){var j=this._get(f,"appendText"),l=this._get(f,"isRTL");f.append&&f.append.remove();if(j){f.append=a('<span class="'+this._appendClass+'">'+j+"</span>");b[l?"before":"after"](f.append)}b.unbind("focus",this._showDatepicker);f.trigger&&f.trigger.remove();j=this._get(f,"showOn");if(j==
"focus"||j=="both")b.focus(this._showDatepicker);if(j=="button"||j=="both"){j=this._get(f,"buttonText");var o=this._get(f,"buttonImage");f.trigger=a(this._get(f,"buttonImageOnly")?a("<img/>").addClass(this._triggerClass).attr({src:o,alt:j,title:j}):a('<button type="button"></button>').addClass(this._triggerClass).html(o==""?j:a("<img/>").attr({src:o,alt:j,title:j})));b[l?"before":"after"](f.trigger);f.trigger.click(function(){a.datepicker._datepickerShowing&&a.datepicker._lastInput==b[0]?a.datepicker._hideDatepicker():
a.datepicker._showDatepicker(b[0]);return false})}},_autoSize:function(b){if(this._get(b,"autoSize")&&!b.inline){var f=new Date(2009,11,20),j=this._get(b,"dateFormat");if(j.match(/[DM]/)){var l=function(o){for(var n=0,k=0,m=0;m<o.length;m++)if(o[m].length>n){n=o[m].length;k=m}return k};f.setMonth(l(this._get(b,j.match(/MM/)?"monthNames":"monthNamesShort")));f.setDate(l(this._get(b,j.match(/DD/)?"dayNames":"dayNamesShort"))+20-f.getDay())}b.input.attr("size",this._formatDate(b,f).length)}},_inlineDatepicker:function(b,
f){var j=a(b);if(!j.hasClass(this.markerClassName)){j.addClass(this.markerClassName).append(f.dpDiv).bind("setData.datepicker",function(l,o,n){f.settings[o]=n}).bind("getData.datepicker",function(l,o){return this._get(f,o)});a.data(b,"datepicker",f);this._setDate(f,this._getDefaultDate(f),true);this._updateDatepicker(f);this._updateAlternate(f);f.settings.disabled&&this._disableDatepicker(b);f.dpDiv.css("display","block")}},_dialogDatepicker:function(b,f,j,l,o){b=this._dialogInst;if(!b){this.uuid+=
1;this._dialogInput=a('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);a("body").append(this._dialogInput);b=this._dialogInst=this._newInst(this._dialogInput,false);b.settings={};a.data(this._dialogInput[0],"datepicker",b)}h(b.settings,l||{});f=f&&f.constructor==Date?this._formatDate(b,f):f;this._dialogInput.val(f);this._pos=o?o.length?o:[o.pageX,o.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/
2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");b.settings.onSelect=j;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);a.blockUI&&a.blockUI(this.dpDiv);a.data(this._dialogInput[0],"datepicker",b);return this},_destroyDatepicker:function(b){var f=
a(b),j=a.data(b,"datepicker");if(f.hasClass(this.markerClassName)){var l=b.nodeName.toLowerCase();a.removeData(b,"datepicker");if(l=="input"){j.append.remove();j.trigger.remove();f.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)}else if(l=="div"||l=="span")f.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(b){var f=a(b),j=a.data(b,"datepicker");if(f.hasClass(this.markerClassName)){var l=
b.nodeName.toLowerCase();if(l=="input"){b.disabled=false;j.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(l=="div"||l=="span"){f=f.children("."+this._inlineClass);f.children().removeClass("ui-state-disabled");f.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")}this._disabledInputs=a.map(this._disabledInputs,function(o){return o==b?null:o})}},_disableDatepicker:function(b){var f=a(b),j=a.data(b,
"datepicker");if(f.hasClass(this.markerClassName)){var l=b.nodeName.toLowerCase();if(l=="input"){b.disabled=true;j.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else if(l=="div"||l=="span"){f=f.children("."+this._inlineClass);f.children().addClass("ui-state-disabled");f.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")}this._disabledInputs=a.map(this._disabledInputs,function(o){return o==
b?null:o});this._disabledInputs[this._disabledInputs.length]=b}},_isDisabledDatepicker:function(b){if(!b)return false;for(var f=0;f<this._disabledInputs.length;f++)if(this._disabledInputs[f]==b)return true;return false},_getInst:function(b){try{return a.data(b,"datepicker")}catch(f){throw"Missing instance data for this datepicker";}},_optionDatepicker:function(b,f,j){var l=this._getInst(b);if(arguments.length==2&&typeof f=="string")return f=="defaults"?a.extend({},a.datepicker._defaults):l?f=="all"?
a.extend({},l.settings):this._get(l,f):null;var o=f||{};if(typeof f=="string"){o={};o[f]=j}if(l){this._curInst==l&&this._hideDatepicker();var n=this._getDateDatepicker(b,true),k=this._getMinMaxDate(l,"min"),m=this._getMinMaxDate(l,"max");h(l.settings,o);if(k!==null&&o.dateFormat!==d&&o.minDate===d)l.settings.minDate=this._formatDate(l,k);if(m!==null&&o.dateFormat!==d&&o.maxDate===d)l.settings.maxDate=this._formatDate(l,m);this._attachments(a(b),l);this._autoSize(l);this._setDate(l,n);this._updateAlternate(l);
this._updateDatepicker(l)}},_changeDatepicker:function(b,f,j){this._optionDatepicker(b,f,j)},_refreshDatepicker:function(b){(b=this._getInst(b))&&this._updateDatepicker(b)},_setDateDatepicker:function(b,f){if(b=this._getInst(b)){this._setDate(b,f);this._updateDatepicker(b);this._updateAlternate(b)}},_getDateDatepicker:function(b,f){(b=this._getInst(b))&&!b.inline&&this._setDateFromField(b,f);return b?this._getDate(b):null},_doKeyDown:function(b){var f=a.datepicker._getInst(b.target),j=true,l=f.dpDiv.is(".ui-datepicker-rtl");
f._keyEvent=true;if(a.datepicker._datepickerShowing)switch(b.keyCode){case 9:a.datepicker._hideDatepicker();j=false;break;case 13:j=a("td."+a.datepicker._dayOverClass+":not(."+a.datepicker._currentClass+")",f.dpDiv);j[0]&&a.datepicker._selectDay(b.target,f.selectedMonth,f.selectedYear,j[0]);if(b=a.datepicker._get(f,"onSelect")){j=a.datepicker._formatDate(f);b.apply(f.input?f.input[0]:null,[j,f])}else a.datepicker._hideDatepicker();return false;case 27:a.datepicker._hideDatepicker();break;case 33:a.datepicker._adjustDate(b.target,
b.ctrlKey?-a.datepicker._get(f,"stepBigMonths"):-a.datepicker._get(f,"stepMonths"),"M");break;case 34:a.datepicker._adjustDate(b.target,b.ctrlKey?+a.datepicker._get(f,"stepBigMonths"):+a.datepicker._get(f,"stepMonths"),"M");break;case 35:if(b.ctrlKey||b.metaKey)a.datepicker._clearDate(b.target);j=b.ctrlKey||b.metaKey;break;case 36:if(b.ctrlKey||b.metaKey)a.datepicker._gotoToday(b.target);j=b.ctrlKey||b.metaKey;break;case 37:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,l?+1:-1,"D");j=
b.ctrlKey||b.metaKey;if(b.originalEvent.altKey)a.datepicker._adjustDate(b.target,b.ctrlKey?-a.datepicker._get(f,"stepBigMonths"):-a.datepicker._get(f,"stepMonths"),"M");break;case 38:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,-7,"D");j=b.ctrlKey||b.metaKey;break;case 39:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,l?-1:+1,"D");j=b.ctrlKey||b.metaKey;if(b.originalEvent.altKey)a.datepicker._adjustDate(b.target,b.ctrlKey?+a.datepicker._get(f,"stepBigMonths"):+a.datepicker._get(f,
"stepMonths"),"M");break;case 40:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,+7,"D");j=b.ctrlKey||b.metaKey;break;default:j=false}else if(b.keyCode==36&&b.ctrlKey)a.datepicker._showDatepicker(this);else j=false;if(j){b.preventDefault();b.stopPropagation()}},_doKeyPress:function(b){var f=a.datepicker._getInst(b.target);if(a.datepicker._get(f,"constrainInput")){f=a.datepicker._possibleChars(a.datepicker._get(f,"dateFormat"));var j=String.fromCharCode(b.charCode==d?b.keyCode:b.charCode);
return b.ctrlKey||b.metaKey||j<" "||!f||f.indexOf(j)>-1}},_doKeyUp:function(b){b=a.datepicker._getInst(b.target);if(b.input.val()!=b.lastVal)try{if(a.datepicker.parseDate(a.datepicker._get(b,"dateFormat"),b.input?b.input.val():null,a.datepicker._getFormatConfig(b))){a.datepicker._setDateFromField(b);a.datepicker._updateAlternate(b);a.datepicker._updateDatepicker(b)}}catch(f){a.datepicker.log(f)}return true},_showDatepicker:function(b){b=b.target||b;if(b.nodeName.toLowerCase()!="input")b=a("input",
b.parentNode)[0];if(!(a.datepicker._isDisabledDatepicker(b)||a.datepicker._lastInput==b)){var f=a.datepicker._getInst(b);if(a.datepicker._curInst&&a.datepicker._curInst!=f){a.datepicker._datepickerShowing&&a.datepicker._triggerOnClose(a.datepicker._curInst);a.datepicker._curInst.dpDiv.stop(true,true)}var j=a.datepicker._get(f,"beforeShow");j=j?j.apply(b,[b,f]):{};if(j!==false){h(f.settings,j);f.lastVal=null;a.datepicker._lastInput=b;a.datepicker._setDateFromField(f);if(a.datepicker._inDialog)b.value=
"";if(!a.datepicker._pos){a.datepicker._pos=a.datepicker._findPos(b);a.datepicker._pos[1]+=b.offsetHeight}var l=false;a(b).parents().each(function(){l|=a(this).css("position")=="fixed";return!l});if(l&&a.browser.opera){a.datepicker._pos[0]-=document.documentElement.scrollLeft;a.datepicker._pos[1]-=document.documentElement.scrollTop}j={left:a.datepicker._pos[0],top:a.datepicker._pos[1]};a.datepicker._pos=null;f.dpDiv.empty();f.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});a.datepicker._updateDatepicker(f);
j=a.datepicker._checkOffset(f,j,l);f.dpDiv.css({position:a.datepicker._inDialog&&a.blockUI?"static":l?"fixed":"absolute",display:"none",left:j.left+"px",top:j.top+"px"});if(!f.inline){j=a.datepicker._get(f,"showAnim");var o=a.datepicker._get(f,"duration"),n=function(){var k=f.dpDiv.find("iframe.ui-datepicker-cover");if(k.length){var m=a.datepicker._getBorders(f.dpDiv);k.css({left:-m[0],top:-m[1],width:f.dpDiv.outerWidth(),height:f.dpDiv.outerHeight()})}};f.dpDiv.zIndex(a(b).zIndex()+1);a.datepicker._datepickerShowing=
true;a.effects&&a.effects[j]?f.dpDiv.show(j,a.datepicker._get(f,"showOptions"),o,n):f.dpDiv[j||"show"](j?o:null,n);if(!j||!o)n();f.input.is(":visible")&&!f.input.is(":disabled")&&f.input.focus();a.datepicker._curInst=f}}}},_updateDatepicker:function(b){this.maxRows=4;var f=a.datepicker._getBorders(b.dpDiv);i=b;b.dpDiv.empty().append(this._generateHTML(b));var j=b.dpDiv.find("iframe.ui-datepicker-cover");j.length&&j.css({left:-f[0],top:-f[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()});
b.dpDiv.find("."+this._dayOverClass+" a").mouseover();f=this._getNumberOfMonths(b);j=f[1];b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");j>1&&b.dpDiv.addClass("ui-datepicker-multi-"+j).css("width",17*j+"em");b.dpDiv[(f[0]!=1||f[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");b.dpDiv[(this._get(b,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");b==a.datepicker._curInst&&a.datepicker._datepickerShowing&&b.input&&b.input.is(":visible")&&
!b.input.is(":disabled")&&b.input[0]!=document.activeElement&&b.input.focus();if(b.yearshtml){var l=b.yearshtml;setTimeout(function(){l===b.yearshtml&&b.yearshtml&&b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml);l=b.yearshtml=null},0)}},_getBorders:function(b){var f=function(j){return{thin:1,medium:2,thick:3}[j]||j};return[parseFloat(f(b.css("border-left-width"))),parseFloat(f(b.css("border-top-width")))]},_checkOffset:function(b,f,j){var l=b.dpDiv.outerWidth(),o=b.dpDiv.outerHeight(),
n=b.input?b.input.outerWidth():0,k=b.input?b.input.outerHeight():0,m=document.documentElement.clientWidth+a(document).scrollLeft(),p=document.documentElement.clientHeight+a(document).scrollTop();f.left-=this._get(b,"isRTL")?l-n:0;f.left-=j&&f.left==b.input.offset().left?a(document).scrollLeft():0;f.top-=j&&f.top==b.input.offset().top+k?a(document).scrollTop():0;f.left-=Math.min(f.left,f.left+l>m&&m>l?Math.abs(f.left+l-m):0);f.top-=Math.min(f.top,f.top+o>p&&p>o?Math.abs(o+k):0);return f},_findPos:function(b){for(var f=
this._get(this._getInst(b),"isRTL");b&&(b.type=="hidden"||b.nodeType!=1||a.expr.filters.hidden(b));)b=b[f?"previousSibling":"nextSibling"];b=a(b).offset();return[b.left,b.top]},_triggerOnClose:function(b){var f=this._get(b,"onClose");if(f)f.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b])},_hideDatepicker:function(b){var f=this._curInst;if(!(!f||b&&f!=a.data(b,"datepicker")))if(this._datepickerShowing){b=this._get(f,"showAnim");var j=this._get(f,"duration"),l=function(){a.datepicker._tidyDialog(f);
this._curInst=null};a.effects&&a.effects[b]?f.dpDiv.hide(b,a.datepicker._get(f,"showOptions"),j,l):f.dpDiv[b=="slideDown"?"slideUp":b=="fadeIn"?"fadeOut":"hide"](b?j:null,l);b||l();a.datepicker._triggerOnClose(f);this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if(a.blockUI){a.unblockUI();a("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(b){b.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},
_checkExternalClick:function(b){if(a.datepicker._curInst){b=a(b.target);b[0].id!=a.datepicker._mainDivId&&b.parents("#"+a.datepicker._mainDivId).length==0&&!b.hasClass(a.datepicker.markerClassName)&&!b.hasClass(a.datepicker._triggerClass)&&a.datepicker._datepickerShowing&&!(a.datepicker._inDialog&&a.blockUI)&&a.datepicker._hideDatepicker()}},_adjustDate:function(b,f,j){b=a(b);var l=this._getInst(b[0]);if(!this._isDisabledDatepicker(b[0])){this._adjustInstDate(l,f+(j=="M"?this._get(l,"showCurrentAtPos"):
0),j);this._updateDatepicker(l)}},_gotoToday:function(b){b=a(b);var f=this._getInst(b[0]);if(this._get(f,"gotoCurrent")&&f.currentDay){f.selectedDay=f.currentDay;f.drawMonth=f.selectedMonth=f.currentMonth;f.drawYear=f.selectedYear=f.currentYear}else{var j=new Date;f.selectedDay=j.getDate();f.drawMonth=f.selectedMonth=j.getMonth();f.drawYear=f.selectedYear=j.getFullYear()}this._notifyChange(f);this._adjustDate(b)},_selectMonthYear:function(b,f,j){b=a(b);var l=this._getInst(b[0]);l["selected"+(j=="M"?
"Month":"Year")]=l["draw"+(j=="M"?"Month":"Year")]=parseInt(f.options[f.selectedIndex].value,10);this._notifyChange(l);this._adjustDate(b)},_selectDay:function(b,f,j,l){var o=a(b);if(!(a(l).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0]))){o=this._getInst(o[0]);o.selectedDay=o.currentDay=a("a",l).html();o.selectedMonth=o.currentMonth=f;o.selectedYear=o.currentYear=j;this._selectDate(b,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear))}},_clearDate:function(b){b=a(b);
this._getInst(b[0]);this._selectDate(b,"")},_selectDate:function(b,f){b=this._getInst(a(b)[0]);f=f!=null?f:this._formatDate(b);b.input&&b.input.val(f);this._updateAlternate(b);var j=this._get(b,"onSelect");if(j)j.apply(b.input?b.input[0]:null,[f,b]);else b.input&&b.input.trigger("change");if(b.inline)this._updateDatepicker(b);else{this._hideDatepicker();this._lastInput=b.input[0];typeof b.input[0]!="object"&&b.input.focus();this._lastInput=null}},_updateAlternate:function(b){var f=this._get(b,"altField");
if(f){var j=this._get(b,"altFormat")||this._get(b,"dateFormat"),l=this._getDate(b),o=this.formatDate(j,l,this._getFormatConfig(b));a(f).each(function(){a(this).val(o)})}},noWeekends:function(b){b=b.getDay();return[b>0&&b<6,""]},iso8601Week:function(b){b=new Date(b.getTime());b.setDate(b.getDate()+4-(b.getDay()||7));var f=b.getTime();b.setMonth(0);b.setDate(1);return Math.floor(Math.round((f-b)/864E5)/7)+1},parseDate:function(b,f,j){if(b==null||f==null)throw"Invalid arguments";f=typeof f=="object"?
f.toString():f+"";if(f=="")return null;var l=(j?j.shortYearCutoff:null)||this._defaults.shortYearCutoff;l=typeof l!="string"?l:(new Date).getFullYear()%100+parseInt(l,10);for(var o=(j?j.dayNamesShort:null)||this._defaults.dayNamesShort,n=(j?j.dayNames:null)||this._defaults.dayNames,k=(j?j.monthNamesShort:null)||this._defaults.monthNamesShort,m=(j?j.monthNames:null)||this._defaults.monthNames,p=j=-1,q=-1,s=-1,r=false,u=function(z){(z=H+1<b.length&&b.charAt(H+1)==z)&&H++;return z},v=function(z){var I=
u(z);z=new RegExp("^\\d{1,"+(z=="@"?14:z=="!"?20:z=="y"&&I?4:z=="o"?3:2)+"}");z=f.substring(y).match(z);if(!z)throw"Missing number at position "+y;y+=z[0].length;return parseInt(z[0],10)},w=function(z,I,N){z=a.map(u(z)?N:I,function(D,E){return[[E,D]]}).sort(function(D,E){return-(D[1].length-E[1].length)});var J=-1;a.each(z,function(D,E){D=E[1];if(f.substr(y,D.length).toLowerCase()==D.toLowerCase()){J=E[0];y+=D.length;return false}});if(J!=-1)return J+1;else throw"Unknown name at position "+y;},x=
function(){if(f.charAt(y)!=b.charAt(H))throw"Unexpected literal at position "+y;y++},y=0,H=0;H<b.length;H++)if(r)if(b.charAt(H)=="'"&&!u("'"))r=false;else x();else switch(b.charAt(H)){case "d":q=v("d");break;case "D":w("D",o,n);break;case "o":s=v("o");break;case "m":p=v("m");break;case "M":p=w("M",k,m);break;case "y":j=v("y");break;case "@":var C=new Date(v("@"));j=C.getFullYear();p=C.getMonth()+1;q=C.getDate();break;case "!":C=new Date((v("!")-this._ticksTo1970)/1E4);j=C.getFullYear();p=C.getMonth()+
1;q=C.getDate();break;case "'":if(u("'"))x();else r=true;break;default:x()}if(y<f.length)throw"Extra/unparsed characters found in date: "+f.substring(y);if(j==-1)j=(new Date).getFullYear();else if(j<100)j+=(new Date).getFullYear()-(new Date).getFullYear()%100+(j<=l?0:-100);if(s>-1){p=1;q=s;do{l=this._getDaysInMonth(j,p-1);if(q<=l)break;p++;q-=l}while(1)}C=this._daylightSavingAdjust(new Date(j,p-1,q));if(C.getFullYear()!=j||C.getMonth()+1!=p||C.getDate()!=q)throw"Invalid date";return C},ATOM:"yy-mm-dd",
COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1E7,formatDate:function(b,f,j){if(!f)return"";var l=(j?j.dayNamesShort:null)||this._defaults.dayNamesShort,o=(j?j.dayNames:null)||this._defaults.dayNames,n=(j?j.monthNamesShort:null)||this._defaults.monthNamesShort;j=(j?j.monthNames:
null)||this._defaults.monthNames;var k=function(u){(u=r+1<b.length&&b.charAt(r+1)==u)&&r++;return u},m=function(u,v,w){v=""+v;if(k(u))for(;v.length<w;)v="0"+v;return v},p=function(u,v,w,x){return k(u)?x[v]:w[v]},q="",s=false;if(f)for(var r=0;r<b.length;r++)if(s)if(b.charAt(r)=="'"&&!k("'"))s=false;else q+=b.charAt(r);else switch(b.charAt(r)){case "d":q+=m("d",f.getDate(),2);break;case "D":q+=p("D",f.getDay(),l,o);break;case "o":q+=m("o",Math.round(((new Date(f.getFullYear(),f.getMonth(),f.getDate())).getTime()-
(new Date(f.getFullYear(),0,0)).getTime())/864E5),3);break;case "m":q+=m("m",f.getMonth()+1,2);break;case "M":q+=p("M",f.getMonth(),n,j);break;case "y":q+=k("y")?f.getFullYear():(f.getYear()%100<10?"0":"")+f.getYear()%100;break;case "@":q+=f.getTime();break;case "!":q+=f.getTime()*1E4+this._ticksTo1970;break;case "'":if(k("'"))q+="'";else s=true;break;default:q+=b.charAt(r)}return q},_possibleChars:function(b){for(var f="",j=false,l=function(n){(n=o+1<b.length&&b.charAt(o+1)==n)&&o++;return n},o=
0;o<b.length;o++)if(j)if(b.charAt(o)=="'"&&!l("'"))j=false;else f+=b.charAt(o);else switch(b.charAt(o)){case "d":case "m":case "y":case "@":f+="0123456789";break;case "D":case "M":return null;case "'":if(l("'"))f+="'";else j=true;break;default:f+=b.charAt(o)}return f},_get:function(b,f){return b.settings[f]!==d?b.settings[f]:this._defaults[f]},_setDateFromField:function(b,f){if(b.input.val()!=b.lastVal){var j=this._get(b,"dateFormat"),l=b.lastVal=b.input?b.input.val():null,o,n;o=n=this._getDefaultDate(b);
var k=this._getFormatConfig(b);try{o=this.parseDate(j,l,k)||n}catch(m){this.log(m);l=f?"":l}b.selectedDay=o.getDate();b.drawMonth=b.selectedMonth=o.getMonth();b.drawYear=b.selectedYear=o.getFullYear();b.currentDay=l?o.getDate():0;b.currentMonth=l?o.getMonth():0;b.currentYear=l?o.getFullYear():0;this._adjustInstDate(b)}},_getDefaultDate:function(b){return this._restrictMinMax(b,this._determineDate(b,this._get(b,"defaultDate"),new Date))},_determineDate:function(b,f,j){var l=function(n){var k=new Date;
k.setDate(k.getDate()+n);return k},o=function(n){try{return a.datepicker.parseDate(a.datepicker._get(b,"dateFormat"),n,a.datepicker._getFormatConfig(b))}catch(k){}var m=(n.toLowerCase().match(/^c/)?a.datepicker._getDate(b):null)||new Date,p=m.getFullYear(),q=m.getMonth();m=m.getDate();for(var s=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,r=s.exec(n);r;){switch(r[2]||"d"){case "d":case "D":m+=parseInt(r[1],10);break;case "w":case "W":m+=parseInt(r[1],10)*7;break;case "m":case "M":q+=parseInt(r[1],10);m=
Math.min(m,a.datepicker._getDaysInMonth(p,q));break;case "y":case "Y":p+=parseInt(r[1],10);m=Math.min(m,a.datepicker._getDaysInMonth(p,q));break}r=s.exec(n)}return new Date(p,q,m)};if(f=(f=f==null||f===""?j:typeof f=="string"?o(f):typeof f=="number"?isNaN(f)?j:l(f):new Date(f.getTime()))&&f.toString()=="Invalid Date"?j:f){f.setHours(0);f.setMinutes(0);f.setSeconds(0);f.setMilliseconds(0)}return this._daylightSavingAdjust(f)},_daylightSavingAdjust:function(b){if(!b)return null;b.setHours(b.getHours()>
12?b.getHours()+2:0);return b},_setDate:function(b,f,j){var l=!f,o=b.selectedMonth,n=b.selectedYear;f=this._restrictMinMax(b,this._determineDate(b,f,new Date));b.selectedDay=b.currentDay=f.getDate();b.drawMonth=b.selectedMonth=b.currentMonth=f.getMonth();b.drawYear=b.selectedYear=b.currentYear=f.getFullYear();if((o!=b.selectedMonth||n!=b.selectedYear)&&!j)this._notifyChange(b);this._adjustInstDate(b);if(b.input)b.input.val(l?"":this._formatDate(b))},_getDate:function(b){return!b.currentYear||b.input&&
b.input.val()==""?null:this._daylightSavingAdjust(new Date(b.currentYear,b.currentMonth,b.currentDay))},_generateHTML:function(b){var f=new Date;f=this._daylightSavingAdjust(new Date(f.getFullYear(),f.getMonth(),f.getDate()));var j=this._get(b,"isRTL"),l=this._get(b,"showButtonPanel"),o=this._get(b,"hideIfNoPrevNext"),n=this._get(b,"navigationAsDateFormat"),k=this._getNumberOfMonths(b),m=this._get(b,"showCurrentAtPos"),p=this._get(b,"stepMonths"),q=k[0]!=1||k[1]!=1,s=this._daylightSavingAdjust(!b.currentDay?
new Date(9999,9,9):new Date(b.currentYear,b.currentMonth,b.currentDay)),r=this._getMinMaxDate(b,"min"),u=this._getMinMaxDate(b,"max");m=b.drawMonth-m;var v=b.drawYear;if(m<0){m+=12;v--}if(u){var w=this._daylightSavingAdjust(new Date(u.getFullYear(),u.getMonth()-k[0]*k[1]+1,u.getDate()));for(w=r&&w<r?r:w;this._daylightSavingAdjust(new Date(v,m,1))>w;){m--;if(m<0){m=11;v--}}}b.drawMonth=m;b.drawYear=v;w=this._get(b,"prevText");w=!n?w:this.formatDate(w,this._daylightSavingAdjust(new Date(v,m-p,1)),this._getFormatConfig(b));
w=this._canAdjustMonth(b,-1,v,m)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+g+".datepicker._adjustDate('#"+b.id+"', -"+p+", 'M');\" title=\""+w+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"e":"w")+'">'+w+"</span></a>":o?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+w+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"e":"w")+'">'+w+"</span></a>";var x=this._get(b,"nextText");x=!n?x:this.formatDate(x,this._daylightSavingAdjust(new Date(v,
m+p,1)),this._getFormatConfig(b));o=this._canAdjustMonth(b,+1,v,m)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+g+".datepicker._adjustDate('#"+b.id+"', +"+p+", 'M');\" title=\""+x+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"w":"e")+'">'+x+"</span></a>":o?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+x+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"w":"e")+'">'+x+"</span></a>";p=this._get(b,"currentText");x=this._get(b,"gotoCurrent")&&
b.currentDay?s:f;p=!n?p:this.formatDate(p,x,this._getFormatConfig(b));n=!b.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+g+'.datepicker._hideDatepicker();">'+this._get(b,"closeText")+"</button>":"";l=l?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(j?n:"")+(this._isInRange(b,x)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+
g+".datepicker._gotoToday('#"+b.id+"');\">"+p+"</button>":"")+(j?"":n)+"</div>":"";n=parseInt(this._get(b,"firstDay"),10);n=isNaN(n)?0:n;p=this._get(b,"showWeek");x=this._get(b,"dayNames");this._get(b,"dayNamesShort");var y=this._get(b,"dayNamesMin"),H=this._get(b,"monthNames"),C=this._get(b,"monthNamesShort"),z=this._get(b,"beforeShowDay"),I=this._get(b,"showOtherMonths"),N=this._get(b,"selectOtherMonths");this._get(b,"calculateWeek");for(var J=this._getDefaultDate(b),D="",E=0;E<k[0];E++){var P=
"";this.maxRows=4;for(var L=0;L<k[1];L++){var Q=this._daylightSavingAdjust(new Date(v,m,b.selectedDay)),B=" ui-corner-all",F="";if(q){F+='<div class="ui-datepicker-group';if(k[1]>1)switch(L){case 0:F+=" ui-datepicker-group-first";B=" ui-corner-"+(j?"right":"left");break;case k[1]-1:F+=" ui-datepicker-group-last";B=" ui-corner-"+(j?"left":"right");break;default:F+=" ui-datepicker-group-middle";B="";break}F+='">'}F+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+B+'">'+(/all|left/.test(B)&&
E==0?j?o:w:"")+(/all|right/.test(B)&&E==0?j?w:o:"")+this._generateMonthYearHeader(b,m,v,r,u,E>0||L>0,H,C)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var G=p?'<th class="ui-datepicker-week-col">'+this._get(b,"weekHeader")+"</th>":"";for(B=0;B<7;B++){var A=(B+n)%7;G+="<th"+((B+n+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+x[A]+'">'+y[A]+"</span></th>"}F+=G+"</tr></thead><tbody>";G=this._getDaysInMonth(v,m);if(v==b.selectedYear&&m==b.selectedMonth)b.selectedDay=Math.min(b.selectedDay,
G);B=(this._getFirstDayOfMonth(v,m)-n+7)%7;G=Math.ceil((B+G)/7);this.maxRows=G=q?this.maxRows>G?this.maxRows:G:G;A=this._daylightSavingAdjust(new Date(v,m,1-B));for(var R=0;R<G;R++){F+="<tr>";var S=!p?"":'<td class="ui-datepicker-week-col">'+this._get(b,"calculateWeek")(A)+"</td>";for(B=0;B<7;B++){var M=z?z.apply(b.input?b.input[0]:null,[A]):[true,""],K=A.getMonth()!=m,O=K&&!N||!M[0]||r&&A<r||u&&A>u;S+='<td class="'+((B+n+6)%7>=5?" ui-datepicker-week-end":"")+(K?" ui-datepicker-other-month":"")+(A.getTime()==
Q.getTime()&&m==b.selectedMonth&&b._keyEvent||J.getTime()==A.getTime()&&J.getTime()==Q.getTime()?" "+this._dayOverClass:"")+(O?" "+this._unselectableClass+" ui-state-disabled":"")+(K&&!I?"":" "+M[1]+(A.getTime()==s.getTime()?" "+this._currentClass:"")+(A.getTime()==f.getTime()?" ui-datepicker-today":""))+'"'+((!K||I)&&M[2]?' title="'+M[2]+'"':"")+(O?"":' onclick="DP_jQuery_'+g+".datepicker._selectDay('#"+b.id+"',"+A.getMonth()+","+A.getFullYear()+', this);return false;"')+">"+(K&&!I?"&#xa0;":O?'<span class="ui-state-default">'+
A.getDate()+"</span>":'<a class="ui-state-default'+(A.getTime()==f.getTime()?" ui-state-highlight":"")+(A.getTime()==s.getTime()?" ui-state-active":"")+(K?" ui-priority-secondary":"")+'" href="#">'+A.getDate()+"</a>")+"</td>";A.setDate(A.getDate()+1);A=this._daylightSavingAdjust(A)}F+=S+"</tr>"}m++;if(m>11){m=0;v++}F+="</tbody></table>"+(q?"</div>"+(k[0]>0&&L==k[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");P+=F}D+=P}D+=l+(a.browser.msie&&parseInt(a.browser.version,10)<7&&!b.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':
"");b._keyEvent=false;return D},_generateMonthYearHeader:function(b,f,j,l,o,n,k,m){var p=this._get(b,"changeMonth"),q=this._get(b,"changeYear"),s=this._get(b,"showMonthAfterYear"),r='<div class="ui-datepicker-title">',u="";if(n||!p)u+='<span class="ui-datepicker-month">'+k[f]+"</span>";else{k=l&&l.getFullYear()==j;var v=o&&o.getFullYear()==j;u+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+g+".datepicker._selectMonthYear('#"+b.id+"', this, 'M');\" >";for(var w=0;w<12;w++)if((!k||w>=l.getMonth())&&
(!v||w<=o.getMonth()))u+='<option value="'+w+'"'+(w==f?' selected="selected"':"")+">"+m[w]+"</option>";u+="</select>"}s||(r+=u+(n||!(p&&q)?"&#xa0;":""));if(!b.yearshtml){b.yearshtml="";if(n||!q)r+='<span class="ui-datepicker-year">'+j+"</span>";else{m=this._get(b,"yearRange").split(":");var x=(new Date).getFullYear();k=function(y){y=y.match(/c[+-].*/)?j+parseInt(y.substring(1),10):y.match(/[+-].*/)?x+parseInt(y,10):parseInt(y,10);return isNaN(y)?x:y};f=k(m[0]);m=Math.max(f,k(m[1]||""));f=l?Math.max(f,
l.getFullYear()):f;m=o?Math.min(m,o.getFullYear()):m;for(b.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+g+".datepicker._selectMonthYear('#"+b.id+"', this, 'Y');\" >";f<=m;f++)b.yearshtml+='<option value="'+f+'"'+(f==j?' selected="selected"':"")+">"+f+"</option>";b.yearshtml+="</select>";r+=b.yearshtml;b.yearshtml=null}}r+=this._get(b,"yearSuffix");if(s)r+=(n||!(p&&q)?"&#xa0;":"")+u;r+="</div>";return r},_adjustInstDate:function(b,f,j){var l=b.drawYear+(j=="Y"?f:0),o=b.drawMonth+
(j=="M"?f:0);f=Math.min(b.selectedDay,this._getDaysInMonth(l,o))+(j=="D"?f:0);l=this._restrictMinMax(b,this._daylightSavingAdjust(new Date(l,o,f)));b.selectedDay=l.getDate();b.drawMonth=b.selectedMonth=l.getMonth();b.drawYear=b.selectedYear=l.getFullYear();if(j=="M"||j=="Y")this._notifyChange(b)},_restrictMinMax:function(b,f){var j=this._getMinMaxDate(b,"min");b=this._getMinMaxDate(b,"max");f=j&&f<j?j:f;return f=b&&f>b?b:f},_notifyChange:function(b){var f=this._get(b,"onChangeMonthYear");if(f)f.apply(b.input?
b.input[0]:null,[b.selectedYear,b.selectedMonth+1,b])},_getNumberOfMonths:function(b){b=this._get(b,"numberOfMonths");return b==null?[1,1]:typeof b=="number"?[1,b]:b},_getMinMaxDate:function(b,f){return this._determineDate(b,this._get(b,f+"Date"),null)},_getDaysInMonth:function(b,f){return 32-this._daylightSavingAdjust(new Date(b,f,32)).getDate()},_getFirstDayOfMonth:function(b,f){return(new Date(b,f,1)).getDay()},_canAdjustMonth:function(b,f,j,l){var o=this._getNumberOfMonths(b);j=this._daylightSavingAdjust(new Date(j,
l+(f<0?f:o[0]*o[1]),1));f<0&&j.setDate(this._getDaysInMonth(j.getFullYear(),j.getMonth()));return this._isInRange(b,j)},_isInRange:function(b,f){var j=this._getMinMaxDate(b,"min");b=this._getMinMaxDate(b,"max");return(!j||f.getTime()>=j.getTime())&&(!b||f.getTime()<=b.getTime())},_getFormatConfig:function(b){var f=this._get(b,"shortYearCutoff");f=typeof f!="string"?f:(new Date).getFullYear()%100+parseInt(f,10);return{shortYearCutoff:f,dayNamesShort:this._get(b,"dayNamesShort"),dayNames:this._get(b,
"dayNames"),monthNamesShort:this._get(b,"monthNamesShort"),monthNames:this._get(b,"monthNames")}},_formatDate:function(b,f,j,l){if(!f){b.currentDay=b.selectedDay;b.currentMonth=b.selectedMonth;b.currentYear=b.selectedYear}f=f?typeof f=="object"?f:this._daylightSavingAdjust(new Date(l,j,f)):this._daylightSavingAdjust(new Date(b.currentYear,b.currentMonth,b.currentDay));return this.formatDate(this._get(b,"dateFormat"),f,this._getFormatConfig(b))}});a.fn.datepicker=function(b){if(!this.length)return this;
if(!a.datepicker.initialized){a(document).mousedown(a.datepicker._checkExternalClick).find("body").append(a.datepicker.dpDiv);a.datepicker.initialized=true}var f=Array.prototype.slice.call(arguments,1);if(typeof b=="string"&&(b=="isDisabled"||b=="getDate"||b=="widget"))return a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this[0]].concat(f));if(b=="option"&&arguments.length==2&&typeof arguments[1]=="string")return a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this[0]].concat(f));return this.each(function(){typeof b==
"string"?a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this].concat(f)):a.datepicker._attachDatepicker(this,b)})};a.datepicker=new c;a.datepicker.initialized=false;a.datepicker.uuid=(new Date).getTime();a.datepicker.version="1.8.16";window["DP_jQuery_"+g]=a})(jQuery);
(function(a,d){var c={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},e={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},h=a.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};a.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,
position:{my:"center",at:"center",collision:"fit",using:function(g){var i=a(this).css(g).offset().top;i<0&&a(this).css("top",g.top-i)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1E3},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string")this.originalTitle="";this.options.title=this.options.title||this.originalTitle;var g=this,i=g.options,b=i.title||"&#160;",f=a.ui.dialog.getTitleId(g.element),j=(g.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+
i.dialogClass).css({zIndex:i.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(n){if(i.closeOnEscape&&!n.isDefaultPrevented()&&n.keyCode&&n.keyCode===a.ui.keyCode.ESCAPE){g.close(n);n.preventDefault()}}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(n){g.moveToTop(false,n)});g.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(j);var l=(g.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(j),
o=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){o.addClass("ui-state-hover")},function(){o.removeClass("ui-state-hover")}).focus(function(){o.addClass("ui-state-focus")}).blur(function(){o.removeClass("ui-state-focus")}).click(function(n){g.close(n);return false}).appendTo(l);(g.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(i.closeText).appendTo(o);a("<span></span>").addClass("ui-dialog-title").attr("id",
f).html(b).prependTo(l);if(a.isFunction(i.beforeclose)&&!a.isFunction(i.beforeClose))i.beforeClose=i.beforeclose;l.find("*").add(l).disableSelection();i.draggable&&a.fn.draggable&&g._makeDraggable();i.resizable&&a.fn.resizable&&g._makeResizable();g._createButtons(i.buttons);g._isOpen=false;a.fn.bgiframe&&j.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var g=this;g.overlay&&g.overlay.destroy();g.uiDialog.hide();g.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
g.uiDialog.remove();g.originalTitle&&g.element.attr("title",g.originalTitle);return g},widget:function(){return this.uiDialog},close:function(g){var i=this,b,f;if(false!==i._trigger("beforeClose",g)){i.overlay&&i.overlay.destroy();i.uiDialog.unbind("keypress.ui-dialog");i._isOpen=false;if(i.options.hide)i.uiDialog.hide(i.options.hide,function(){i._trigger("close",g)});else{i.uiDialog.hide();i._trigger("close",g)}a.ui.dialog.overlay.resize();if(i.options.modal){b=0;a(".ui-dialog").each(function(){if(this!==
i.uiDialog[0]){f=a(this).css("z-index");isNaN(f)||(b=Math.max(b,f))}});a.ui.dialog.maxZ=b}return i}},isOpen:function(){return this._isOpen},moveToTop:function(g,i){var b=this,f=b.options;if(f.modal&&!g||!f.stack&&!f.modal)return b._trigger("focus",i);if(f.zIndex>a.ui.dialog.maxZ)a.ui.dialog.maxZ=f.zIndex;if(b.overlay){a.ui.dialog.maxZ+=1;b.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)}g={scrollTop:b.element.scrollTop(),scrollLeft:b.element.scrollLeft()};a.ui.dialog.maxZ+=1;
b.uiDialog.css("z-index",a.ui.dialog.maxZ);b.element.attr(g);b._trigger("focus",i);return b},open:function(){if(!this._isOpen){var g=this,i=g.options,b=g.uiDialog;g.overlay=i.modal?new a.ui.dialog.overlay(g):null;g._size();g._position(i.position);b.show(i.show);g.moveToTop(true);i.modal&&b.bind("keypress.ui-dialog",function(f){if(f.keyCode===a.ui.keyCode.TAB){var j=a(":tabbable",this),l=j.filter(":first");j=j.filter(":last");if(f.target===j[0]&&!f.shiftKey){l.focus(1);return false}else if(f.target===
l[0]&&f.shiftKey){j.focus(1);return false}}});a(g.element.find(":tabbable").get().concat(b.find(".ui-dialog-buttonpane :tabbable").get().concat(b.get()))).eq(0).focus();g._isOpen=true;g._trigger("open");return g}},_createButtons:function(g){var i=this,b=false,f=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),j=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(f);i.uiDialog.find(".ui-dialog-buttonpane").remove();typeof g==="object"&&g!==null&&a.each(g,
function(){return!(b=true)});if(b){a.each(g,function(l,o){o=a.isFunction(o)?{click:o,text:l}:o;var n=a('<button type="button"></button>').click(function(){o.click.apply(i.element[0],arguments)}).appendTo(j);a.each(o,function(k,m){if(k!=="click")k in h?n[k](m):n.attr(k,m)});a.fn.button&&n.button()});f.appendTo(i.uiDialog)}},_makeDraggable:function(){function g(l){return{position:l.position,offset:l.offset}}var i=this,b=i.options,f=a(document),j;i.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",
handle:".ui-dialog-titlebar",containment:"document",start:function(l,o){j=b.height==="auto"?"auto":a(this).height();a(this).height(a(this).height()).addClass("ui-dialog-dragging");i._trigger("dragStart",l,g(o))},drag:function(l,o){i._trigger("drag",l,g(o))},stop:function(l,o){b.position=[o.position.left-f.scrollLeft(),o.position.top-f.scrollTop()];a(this).removeClass("ui-dialog-dragging").height(j);i._trigger("dragStop",l,g(o));a.ui.dialog.overlay.resize()}})},_makeResizable:function(g){function i(l){return{originalPosition:l.originalPosition,
originalSize:l.originalSize,position:l.position,size:l.size}}g=g===d?this.options.resizable:g;var b=this,f=b.options,j=b.uiDialog.css("position");g=typeof g==="string"?g:"n,e,s,w,se,sw,ne,nw";b.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:b.element,maxWidth:f.maxWidth,maxHeight:f.maxHeight,minWidth:f.minWidth,minHeight:b._minHeight(),handles:g,start:function(l,o){a(this).addClass("ui-dialog-resizing");b._trigger("resizeStart",l,i(o))},resize:function(l,o){b._trigger("resize",
l,i(o))},stop:function(l,o){a(this).removeClass("ui-dialog-resizing");f.height=a(this).height();f.width=a(this).width();b._trigger("resizeStop",l,i(o));a.ui.dialog.overlay.resize()}}).css("position",j).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var g=this.options;return g.height==="auto"?g.minHeight:Math.min(g.minHeight,g.height)},_position:function(g){var i=[],b=[0,0],f;if(g){if(typeof g==="string"||typeof g==="object"&&"0"in g){i=g.split?g.split(" "):
[g[0],g[1]];if(i.length===1)i[1]=i[0];a.each(["left","top"],function(j,l){if(+i[j]===i[j]){b[j]=i[j];i[j]=l}});g={my:i.join(" "),at:i.join(" "),offset:b.join(" ")}}g=a.extend({},a.ui.dialog.prototype.options.position,g)}else g=a.ui.dialog.prototype.options.position;(f=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},g));f||this.uiDialog.hide()},_setOptions:function(g){var i=this,b={},f=false;a.each(g,function(j,l){i._setOption(j,l);
if(j in c)f=true;if(j in e)b[j]=l});f&&this._size();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",b)},_setOption:function(g,i){var b=this,f=b.uiDialog;switch(g){case "beforeclose":g="beforeClose";break;case "buttons":b._createButtons(i);break;case "closeText":b.uiDialogTitlebarCloseText.text(""+i);break;case "dialogClass":f.removeClass(b.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+i);break;case "disabled":i?f.addClass("ui-dialog-disabled"):
f.removeClass("ui-dialog-disabled");break;case "draggable":var j=f.is(":data(draggable)");j&&!i&&f.draggable("destroy");!j&&i&&b._makeDraggable();break;case "position":b._position(i);break;case "resizable":(j=f.is(":data(resizable)"))&&!i&&f.resizable("destroy");j&&typeof i==="string"&&f.resizable("option","handles",i);!j&&i!==false&&b._makeResizable(i);break;case "title":a(".ui-dialog-title",b.uiDialogTitlebar).html(""+(i||"&#160;"));break}a.Widget.prototype._setOption.apply(b,arguments)},_size:function(){var g=
this.options,i,b,f=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(g.minWidth>g.width)g.width=g.minWidth;i=this.uiDialog.css({height:"auto",width:g.width}).height();b=Math.max(0,g.minHeight-i);if(g.height==="auto")if(a.support.minHeight)this.element.css({minHeight:b,height:"auto"});else{this.uiDialog.show();g=this.element.css("height","auto").height();f||this.uiDialog.hide();this.element.height(Math.max(g,b))}else this.element.height(Math.max(g.height-
i,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}});a.extend(a.ui.dialog,{version:"1.8.16",uuid:0,maxZ:0,getTitleId:function(g){g=g.attr("id");if(!g){this.uuid+=1;g=this.uuid}return"ui-dialog-title-"+g},overlay:function(g){this.$el=a.ui.dialog.overlay.create(g)}});a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(g){return g+".dialog-overlay"}).join(" "),
create:function(g){if(this.instances.length===0){setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return false})},1);a(document).bind("keydown.dialog-overlay",function(b){if(g.options.closeOnEscape&&!b.isDefaultPrevented()&&b.keyCode&&b.keyCode===a.ui.keyCode.ESCAPE){g.close(b);b.preventDefault()}});a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize)}var i=(this.oldInstances.pop()||
a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});a.fn.bgiframe&&i.bgiframe();this.instances.push(i);return i},destroy:function(g){var i=a.inArray(g,this.instances);i!=-1&&this.oldInstances.push(this.instances.splice(i,1)[0]);this.instances.length===0&&a([document,window]).unbind(".dialog-overlay");g.remove();var b=0;a.each(this.instances,function(){b=Math.max(b,this.css("z-index"))});this.maxZ=b},height:function(){var g,i;if(a.browser.msie&&
a.browser.version<7){g=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);i=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return g<i?a(window).height()+"px":g+"px"}else return a(document).height()+"px"},width:function(){var g,i;if(a.browser.msie){g=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);i=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return g<i?a(window).width()+"px":g+"px"}else return a(document).width()+
"px"},resize:function(){var g=a([]);a.each(a.ui.dialog.overlay.instances,function(){g=g.add(this)});g.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}});a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);
(function(a){a.ui=a.ui||{};var d=/left|center|right/,c=/top|center|bottom/,e=a.fn.position,h=a.fn.offset;a.fn.position=function(g){if(!g||!g.of)return e.apply(this,arguments);g=a.extend({},g);var i=a(g.of),b=i[0],f=(g.collision||"flip").split(" "),j=g.offset?g.offset.split(" "):[0,0],l,o,n;if(b.nodeType===9){l=i.width();o=i.height();n={top:0,left:0}}else if(b.setTimeout){l=i.width();o=i.height();n={top:i.scrollTop(),left:i.scrollLeft()}}else if(b.preventDefault){g.at="left top";l=o=0;n={top:g.of.pageY,
left:g.of.pageX}}else{l=i.outerWidth();o=i.outerHeight();n=i.offset()}a.each(["my","at"],function(){var k=(g[this]||"").split(" ");if(k.length===1)k=d.test(k[0])?k.concat(["center"]):c.test(k[0])?["center"].concat(k):["center","center"];k[0]=d.test(k[0])?k[0]:"center";k[1]=c.test(k[1])?k[1]:"center";g[this]=k});if(f.length===1)f[1]=f[0];j[0]=parseInt(j[0],10)||0;if(j.length===1)j[1]=j[0];j[1]=parseInt(j[1],10)||0;if(g.at[0]==="right")n.left+=l;else if(g.at[0]==="center")n.left+=l/2;if(g.at[1]==="bottom")n.top+=
o;else if(g.at[1]==="center")n.top+=o/2;n.left+=j[0];n.top+=j[1];return this.each(function(){var k=a(this),m=k.outerWidth(),p=k.outerHeight(),q=parseInt(a.curCSS(this,"marginLeft",true))||0,s=parseInt(a.curCSS(this,"marginTop",true))||0,r=m+q+(parseInt(a.curCSS(this,"marginRight",true))||0),u=p+s+(parseInt(a.curCSS(this,"marginBottom",true))||0),v=a.extend({},n),w;if(g.my[0]==="right")v.left-=m;else if(g.my[0]==="center")v.left-=m/2;if(g.my[1]==="bottom")v.top-=p;else if(g.my[1]==="center")v.top-=
p/2;v.left=Math.round(v.left);v.top=Math.round(v.top);w={left:v.left-q,top:v.top-s};a.each(["left","top"],function(x,y){a.ui.position[f[x]]&&a.ui.position[f[x]][y](v,{targetWidth:l,targetHeight:o,elemWidth:m,elemHeight:p,collisionPosition:w,collisionWidth:r,collisionHeight:u,offset:j,my:g.my,at:g.at})});a.fn.bgiframe&&k.bgiframe();k.offset(a.extend(v,{using:g.using}))})};a.ui.position={fit:{left:function(g,i){var b=a(window);b=i.collisionPosition.left+i.collisionWidth-b.width()-b.scrollLeft();g.left=
b>0?g.left-b:Math.max(g.left-i.collisionPosition.left,g.left)},top:function(g,i){var b=a(window);b=i.collisionPosition.top+i.collisionHeight-b.height()-b.scrollTop();g.top=b>0?g.top-b:Math.max(g.top-i.collisionPosition.top,g.top)}},flip:{left:function(g,i){if(i.at[0]!=="center"){var b=a(window);b=i.collisionPosition.left+i.collisionWidth-b.width()-b.scrollLeft();var f=i.my[0]==="left"?-i.elemWidth:i.my[0]==="right"?i.elemWidth:0,j=i.at[0]==="left"?i.targetWidth:-i.targetWidth,l=-2*i.offset[0];g.left+=
i.collisionPosition.left<0?f+j+l:b>0?f+j+l:0}},top:function(g,i){if(i.at[1]!=="center"){var b=a(window);b=i.collisionPosition.top+i.collisionHeight-b.height()-b.scrollTop();var f=i.my[1]==="top"?-i.elemHeight:i.my[1]==="bottom"?i.elemHeight:0,j=i.at[1]==="top"?i.targetHeight:-i.targetHeight,l=-2*i.offset[1];g.top+=i.collisionPosition.top<0?f+j+l:b>0?f+j+l:0}}}};if(!a.offset.setOffset){a.offset.setOffset=function(g,i){if(/static/.test(a.curCSS(g,"position")))g.style.position="relative";var b=a(g),
f=b.offset(),j=parseInt(a.curCSS(g,"top",true),10)||0,l=parseInt(a.curCSS(g,"left",true),10)||0;f={top:i.top-f.top+j,left:i.left-f.left+l};"using"in i?i.using.call(g,f):b.css(f)};a.fn.offset=function(g){var i=this[0];if(!i||!i.ownerDocument)return null;if(g)return this.each(function(){a.offset.setOffset(this,g)});return h.call(this)}}})(jQuery);
(function(a,d){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this.oldValue=this._value();this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();a.Widget.prototype.destroy.apply(this,arguments)},value:function(c){if(c===d)return this._value();this._setOption("value",c);return this},_setOption:function(c,e){if(c==="value"){this.options.value=e;this._refreshValue();this._value()===this.options.max&&this._trigger("complete")}a.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var c=this.options.value;if(typeof c!=="number")c=0;return Math.min(this.options.max,Math.max(this.min,c))},_percentage:function(){return 100*
this._value()/this.options.max},_refreshValue:function(){var c=this.value(),e=this._percentage();if(this.oldValue!==c){this.oldValue=c;this._trigger("change")}this.valueDiv.toggle(c>this.min).toggleClass("ui-corner-right",c===this.options.max).width(e.toFixed(0)+"%");this.element.attr("aria-valuenow",c)}});a.extend(a.ui.progressbar,{version:"1.8.16"})})(jQuery);
(function(a){a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var d=this,c=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),h=c.values&&c.values.length||1,g=[];this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+
this.orientation+" ui-widget ui-widget-content ui-corner-all"+(c.disabled?" ui-slider-disabled ui-disabled":""));this.range=a([]);if(c.range){if(c.range===true){if(!c.values)c.values=[this._valueMin(),this._valueMin()];if(c.values.length&&c.values.length!==2)c.values=[c.values[0],c.values[0]]}this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(c.range==="min"||c.range==="max"?" ui-slider-range-"+c.range:""))}for(var i=e.length;i<h;i+=1)g.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
this.handles=e.add(a(g.join("")).appendTo(d.element));this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(b){b.preventDefault()}).hover(function(){c.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){if(c.disabled)a(this).blur();else{a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");a(this).addClass("ui-state-focus")}}).blur(function(){a(this).removeClass("ui-state-focus")});this.handles.each(function(b){a(this).data("index.ui-slider-handle",
b)});this.handles.keydown(function(b){var f=true,j=a(this).data("index.ui-slider-handle"),l,o,n;if(!d.options.disabled){switch(b.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:f=false;if(!d._keySliding){d._keySliding=true;a(this).addClass("ui-state-active");l=d._start(b,j);if(l===false)return}break}n=d.options.step;l=d.options.values&&d.options.values.length?
(o=d.values(j)):(o=d.value());switch(b.keyCode){case a.ui.keyCode.HOME:o=d._valueMin();break;case a.ui.keyCode.END:o=d._valueMax();break;case a.ui.keyCode.PAGE_UP:o=d._trimAlignValue(l+(d._valueMax()-d._valueMin())/5);break;case a.ui.keyCode.PAGE_DOWN:o=d._trimAlignValue(l-(d._valueMax()-d._valueMin())/5);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(l===d._valueMax())return;o=d._trimAlignValue(l+n);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(l===d._valueMin())return;o=d._trimAlignValue(l-
n);break}d._slide(b,j,o);return f}}).keyup(function(b){var f=a(this).data("index.ui-slider-handle");if(d._keySliding){d._keySliding=false;d._stop(b,f);d._change(b,f);a(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy();
return this},_mouseCapture:function(d){var c=this.options,e,h,g,i,b;if(c.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();e=this._normValueFromMouse({x:d.pageX,y:d.pageY});h=this._valueMax()-this._valueMin()+1;i=this;this.handles.each(function(f){var j=Math.abs(e-i.values(f));if(h>j){h=j;g=a(this);b=f}});if(c.range===true&&this.values(1)===c.min){b+=1;g=a(this.handles[b])}if(this._start(d,b)===false)return false;
this._mouseSliding=true;i._handleIndex=b;g.addClass("ui-state-active").focus();c=g.offset();this._clickOffset=!a(d.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:d.pageX-c.left-g.width()/2,top:d.pageY-c.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(d,b,e);return this._animateOff=true},_mouseStart:function(){return true},_mouseDrag:function(d){var c=
this._normValueFromMouse({x:d.pageX,y:d.pageY});this._slide(d,this._handleIndex,c);return false},_mouseStop:function(d){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(d,this._handleIndex);this._change(d,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(d){var c;if(this.orientation==="horizontal"){c=
this.elementSize.width;d=d.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{c=this.elementSize.height;d=d.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}c=d/c;if(c>1)c=1;if(c<0)c=0;if(this.orientation==="vertical")c=1-c;d=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+c*d)},_start:function(d,c){var e={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){e.value=this.values(c);
e.values=this.values()}return this._trigger("start",d,e)},_slide:function(d,c,e){var h;if(this.options.values&&this.options.values.length){h=this.values(c?0:1);if(this.options.values.length===2&&this.options.range===true&&(c===0&&e>h||c===1&&e<h))e=h;if(e!==this.values(c)){h=this.values();h[c]=e;d=this._trigger("slide",d,{handle:this.handles[c],value:e,values:h});this.values(c?0:1);d!==false&&this.values(c,e,true)}}else if(e!==this.value()){d=this._trigger("slide",d,{handle:this.handles[c],value:e});
d!==false&&this.value(e)}},_stop:function(d,c){var e={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){e.value=this.values(c);e.values=this.values()}this._trigger("stop",d,e)},_change:function(d,c){if(!this._keySliding&&!this._mouseSliding){var e={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){e.value=this.values(c);e.values=this.values()}this._trigger("change",d,e)}},value:function(d){if(arguments.length){this.options.value=
this._trimAlignValue(d);this._refreshValue();this._change(null,0)}else return this._value()},values:function(d,c){var e,h,g;if(arguments.length>1){this.options.values[d]=this._trimAlignValue(c);this._refreshValue();this._change(null,d)}else if(arguments.length)if(a.isArray(arguments[0])){e=this.options.values;h=arguments[0];for(g=0;g<e.length;g+=1){e[g]=this._trimAlignValue(h[g]);this._change(null,g)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(d):
this.value();else return this._values()},_setOption:function(d,c){var e,h=0;if(a.isArray(this.options.values))h=this.options.values.length;a.Widget.prototype._setOption.apply(this,arguments);switch(d){case "disabled":if(c){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.propAttr("disabled",true);this.element.addClass("ui-disabled")}else{this.handles.propAttr("disabled",false);this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(e=0;e<h;e+=1)this._change(null,e);this._animateOff=false;break}},_value:function(){var d=this.options.value;return d=this._trimAlignValue(d)},_values:function(d){var c,e;if(arguments.length){c=this.options.values[d];
return c=this._trimAlignValue(c)}else{c=this.options.values.slice();for(e=0;e<c.length;e+=1)c[e]=this._trimAlignValue(c[e]);return c}},_trimAlignValue:function(d){if(d<=this._valueMin())return this._valueMin();if(d>=this._valueMax())return this._valueMax();var c=this.options.step>0?this.options.step:1,e=(d-this._valueMin())%c;d=d-e;if(Math.abs(e)*2>=c)d+=e>0?c:-c;return parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var d=
this.options.range,c=this.options,e=this,h=!this._animateOff?c.animate:false,g,i={},b,f,j,l;if(this.options.values&&this.options.values.length)this.handles.each(function(o){g=(e.values(o)-e._valueMin())/(e._valueMax()-e._valueMin())*100;i[e.orientation==="horizontal"?"left":"bottom"]=g+"%";a(this).stop(1,1)[h?"animate":"css"](i,c.animate);if(e.options.range===true)if(e.orientation==="horizontal"){if(o===0)e.range.stop(1,1)[h?"animate":"css"]({left:g+"%"},c.animate);if(o===1)e.range[h?"animate":"css"]({width:g-
b+"%"},{queue:false,duration:c.animate})}else{if(o===0)e.range.stop(1,1)[h?"animate":"css"]({bottom:g+"%"},c.animate);if(o===1)e.range[h?"animate":"css"]({height:g-b+"%"},{queue:false,duration:c.animate})}b=g});else{f=this.value();j=this._valueMin();l=this._valueMax();g=l!==j?(f-j)/(l-j)*100:0;i[e.orientation==="horizontal"?"left":"bottom"]=g+"%";this.handle.stop(1,1)[h?"animate":"css"](i,c.animate);if(d==="min"&&this.orientation==="horizontal")this.range.stop(1,1)[h?"animate":"css"]({width:g+"%"},
c.animate);if(d==="max"&&this.orientation==="horizontal")this.range[h?"animate":"css"]({width:100-g+"%"},{queue:false,duration:c.animate});if(d==="min"&&this.orientation==="vertical")this.range.stop(1,1)[h?"animate":"css"]({height:g+"%"},c.animate);if(d==="max"&&this.orientation==="vertical")this.range[h?"animate":"css"]({height:100-g+"%"},{queue:false,duration:c.animate})}}});a.extend(a.ui.slider,{version:"1.8.16"})})(jQuery);
(function(a,d){function c(){return++h}function e(){return++g}var h=0,g=0;a.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(i,b){if(i=="selected")this.options.collapsible&&
b==this.options.selected||this.select(b);else{this.options[i]=b;this._tabify()}},_tabId:function(i){return i.title&&i.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+c()},_sanitizeSelector:function(i){return i.replace(/:/g,"\\:")},_cookie:function(){var i=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+e());return a.cookie.apply(null,[i].concat(a.makeArray(arguments)))},_ui:function(i,b){return{tab:i,panel:b,index:this.anchors.index(i)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var i=
a(this);i.html(i.data("label.tabs")).removeData("label.tabs")})},_tabify:function(i){function b(r,u){r.css("display","");!a.support.opacity&&u.opacity&&r[0].style.removeAttribute("filter")}var f=this,j=this.options,l=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=a(" > li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return a("a",this)[0]});this.panels=a([]);this.anchors.each(function(r,u){var v=a(u).attr("href"),w=v.split("#")[0],x;if(w&&(w===location.toString().split("#")[0]||
(x=a("base")[0])&&w===x.href)){v=u.hash;u.href=v}if(l.test(v))f.panels=f.panels.add(f.element.find(f._sanitizeSelector(v)));else if(v&&v!=="#"){a.data(u,"href.tabs",v);a.data(u,"load.tabs",v.replace(/#.*$/,""));v=f._tabId(u);u.href="#"+v;u=f.element.find("#"+v);if(!u.length){u=a(j.panelTemplate).attr("id",v).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(f.panels[r-1]||f.list);u.data("destroy.tabs",true)}f.panels=f.panels.add(u)}else j.disabled.push(r)});if(i){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(j.selected===d){location.hash&&this.anchors.each(function(r,u){if(u.hash==location.hash){j.selected=r;return false}});if(typeof j.selected!=="number"&&j.cookie)j.selected=parseInt(f._cookie(),10);if(typeof j.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)j.selected=
this.lis.index(this.lis.filter(".ui-tabs-selected"));j.selected=j.selected||(this.lis.length?0:-1)}else if(j.selected===null)j.selected=-1;j.selected=j.selected>=0&&this.anchors[j.selected]||j.selected<0?j.selected:0;j.disabled=a.unique(j.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(r){return f.lis.index(r)}))).sort();a.inArray(j.selected,j.disabled)!=-1&&j.disabled.splice(a.inArray(j.selected,j.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");
if(j.selected>=0&&this.anchors.length){f.element.find(f._sanitizeSelector(f.anchors[j.selected].hash)).removeClass("ui-tabs-hide");this.lis.eq(j.selected).addClass("ui-tabs-selected ui-state-active");f.element.queue("tabs",function(){f._trigger("show",null,f._ui(f.anchors[j.selected],f.element.find(f._sanitizeSelector(f.anchors[j.selected].hash))[0]))});this.load(j.selected)}a(window).bind("unload",function(){f.lis.add(f.anchors).unbind(".tabs");f.lis=f.anchors=f.panels=null})}else j.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));
this.element[j.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");j.cookie&&this._cookie(j.selected,j.cookie);i=0;for(var o;o=this.lis[i];i++)a(o)[a.inArray(i,j.disabled)!=-1&&!a(o).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");j.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(j.event!=="mouseover"){var n=function(r,u){u.is(":not(.ui-state-disabled)")&&u.addClass("ui-state-"+r)},k=function(r,u){u.removeClass("ui-state-"+
r)};this.lis.bind("mouseover.tabs",function(){n("hover",a(this))});this.lis.bind("mouseout.tabs",function(){k("hover",a(this))});this.anchors.bind("focus.tabs",function(){n("focus",a(this).closest("li"))});this.anchors.bind("blur.tabs",function(){k("focus",a(this).closest("li"))})}var m,p;if(j.fx)if(a.isArray(j.fx)){m=j.fx[0];p=j.fx[1]}else m=p=j.fx;var q=p?function(r,u){a(r).closest("li").addClass("ui-tabs-selected ui-state-active");u.hide().removeClass("ui-tabs-hide").animate(p,p.duration||"normal",
function(){b(u,p);f._trigger("show",null,f._ui(r,u[0]))})}:function(r,u){a(r).closest("li").addClass("ui-tabs-selected ui-state-active");u.removeClass("ui-tabs-hide");f._trigger("show",null,f._ui(r,u[0]))},s=m?function(r,u){u.animate(m,m.duration||"normal",function(){f.lis.removeClass("ui-tabs-selected ui-state-active");u.addClass("ui-tabs-hide");b(u,m);f.element.dequeue("tabs")})}:function(r,u){f.lis.removeClass("ui-tabs-selected ui-state-active");u.addClass("ui-tabs-hide");f.element.dequeue("tabs")};
this.anchors.bind(j.event+".tabs",function(){var r=this,u=a(r).closest("li"),v=f.panels.filter(":not(.ui-tabs-hide)"),w=f.element.find(f._sanitizeSelector(r.hash));if(u.hasClass("ui-tabs-selected")&&!j.collapsible||u.hasClass("ui-state-disabled")||u.hasClass("ui-state-processing")||f.panels.filter(":animated").length||f._trigger("select",null,f._ui(this,w[0]))===false){this.blur();return false}j.selected=f.anchors.index(this);f.abort();if(j.collapsible)if(u.hasClass("ui-tabs-selected")){j.selected=
-1;j.cookie&&f._cookie(j.selected,j.cookie);f.element.queue("tabs",function(){s(r,v)}).dequeue("tabs");this.blur();return false}else if(!v.length){j.cookie&&f._cookie(j.selected,j.cookie);f.element.queue("tabs",function(){q(r,w)});f.load(f.anchors.index(this));this.blur();return false}j.cookie&&f._cookie(j.selected,j.cookie);if(w.length){v.length&&f.element.queue("tabs",function(){s(r,v)});f.element.queue("tabs",function(){q(r,w)});f.load(f.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";
a.browser.msie&&this.blur()});this.anchors.bind("click.tabs",function(){return false})},_getIndex:function(i){if(typeof i=="string")i=this.anchors.index(this.anchors.filter("[href$="+i+"]"));return i},destroy:function(){var i=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var b=
a.data(this,"href.tabs");if(b)this.href=b;var f=a(this).unbind(".tabs");a.each(["href","load","cache"],function(j,l){f.removeData(l+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){a.data(this,"destroy.tabs")?a(this).remove():a(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});i.cookie&&this._cookie(null,i.cookie);return this},add:function(i,
b,f){if(f===d)f=this.anchors.length;var j=this,l=this.options;b=a(l.tabTemplate.replace(/#\{href\}/g,i).replace(/#\{label\}/g,b));i=!i.indexOf("#")?i.replace("#",""):this._tabId(a("a",b)[0]);b.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var o=j.element.find("#"+i);o.length||(o=a(l.panelTemplate).attr("id",i).data("destroy.tabs",true));o.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(f>=this.lis.length){b.appendTo(this.list);o.appendTo(this.list[0].parentNode)}else{b.insertBefore(this.lis[f]);
o.insertBefore(this.panels[f])}l.disabled=a.map(l.disabled,function(n){return n>=f?++n:n});this._tabify();if(this.anchors.length==1){l.selected=0;b.addClass("ui-tabs-selected ui-state-active");o.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){j._trigger("show",null,j._ui(j.anchors[0],j.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[f],this.panels[f]));return this},remove:function(i){i=this._getIndex(i);var b=this.options,f=this.lis.eq(i).remove(),j=this.panels.eq(i).remove();
if(f.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(i+(i+1<this.anchors.length?1:-1));b.disabled=a.map(a.grep(b.disabled,function(l){return l!=i}),function(l){return l>=i?--l:l});this._tabify();this._trigger("remove",null,this._ui(f.find("a")[0],j[0]));return this},enable:function(i){i=this._getIndex(i);var b=this.options;if(a.inArray(i,b.disabled)!=-1){this.lis.eq(i).removeClass("ui-state-disabled");b.disabled=a.grep(b.disabled,function(f){return f!=i});this._trigger("enable",null,
this._ui(this.anchors[i],this.panels[i]));return this}},disable:function(i){i=this._getIndex(i);var b=this.options;if(i!=b.selected){this.lis.eq(i).addClass("ui-state-disabled");b.disabled.push(i);b.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[i],this.panels[i]))}return this},select:function(i){i=this._getIndex(i);if(i==-1)if(this.options.collapsible&&this.options.selected!=-1)i=this.options.selected;else return this;this.anchors.eq(i).trigger(this.options.event+".tabs");return this},
load:function(i){i=this._getIndex(i);var b=this,f=this.options,j=this.anchors.eq(i)[0],l=a.data(j,"load.tabs");this.abort();if(!l||this.element.queue("tabs").length!==0&&a.data(j,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(i).addClass("ui-state-processing");if(f.spinner){var o=a("span",j);o.data("label.tabs",o.html()).html(f.spinner)}this.xhr=a.ajax(a.extend({},f.ajaxOptions,{url:l,success:function(n,k){b.element.find(b._sanitizeSelector(j.hash)).html(n);b._cleanup();f.cache&&a.data(j,
"cache.tabs",true);b._trigger("load",null,b._ui(b.anchors[i],b.panels[i]));try{f.ajaxOptions.success(n,k)}catch(m){}},error:function(n,k){b._cleanup();b._trigger("load",null,b._ui(b.anchors[i],b.panels[i]));try{f.ajaxOptions.error(n,k,i,j)}catch(m){}}}));b.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},
url:function(i,b){this.anchors.eq(i).removeData("cache.tabs").data("load.tabs",b);return this},length:function(){return this.anchors.length}});a.extend(a.ui.tabs,{version:"1.8.16"});a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(i,b){var f=this,j=this.options,l=f._rotate||(f._rotate=function(o){clearTimeout(f.rotation);f.rotation=setTimeout(function(){var n=j.selected;f.select(++n<f.anchors.length?n:0)},i);o&&o.stopPropagation()});b=f._unrotate||(f._unrotate=!b?function(o){o.clientX&&
f.rotate(null)}:function(){t=j.selected;l()});if(i){this.element.bind("tabsshow",l);this.anchors.bind(j.event+".tabs",b);l()}else{clearTimeout(f.rotation);this.element.unbind("tabsshow",l);this.anchors.unbind(j.event+".tabs",b);delete this._rotate;delete this._unrotate}return this}})})(jQuery);





/*! Center plugin
*
* Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.2
*
* Requires: jQuery 1.2.6+
*/
;( function( $, window ){
  $.fn.center = function( options ){
    var $w, scrollTop;
    
    $w        = $( window ); // cache gobal
    scrollTop = $w.scrollTop();

    return this.each( function(){
      var $this, configs, centerize;
      
      $this = $( this ); // cache $( this )
      // merge user options with default configs
      configs = $.extend({
        against : 'window',
        top : false,
        topPercentage : 0.5
      }, options );
    
      centerize = function(){
        var against, $against, x, y;
        
        against = configs.against;
        
        if( against === 'window' ){
          $against = $w;
        }else if( against === 'parent' ){
          $against = $this.parent();
          scrollTop = 0;
        }else{
          $against = $this.parents( against );
          scrollTop = 0;
        }
      
        x = (( $against.width()) - ( $this.outerWidth())) * 0.5;
        y = (( $against.height()) - ( $this.outerHeight())) * configs.topPercentage + scrollTop;

        if( configs.top ) y = configs.top + scrollTop;

        $this.css({
          'left' : x,
          'top' : y
        });
      };
    
      // apply centerization
      centerize();
      $w.resize( centerize );
    });
  };
})( jQuery, window );






/*! Msg plugin
*
* Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.6
*
* Requires: 
* jQuery 1.3.0+, 
* jQuery Center plugin 1.0.0+ https://github.com/dreamerslab/jquery.center
*/
// wrap all the code in an anonymous function to prevent global vars
;( function( $, doc ){

  // global configs to be use accross the whole page
  var globalConfigs = {},
  
  // global var to store the auto generate msgID
  msgID = 0,
  
  // global var to store the setTimeout function,
  // it would be call later with clearTimeout
  autoUnblock,

  // a global var to store the beforeUnblock event handler for each msg
  beforeUnblock = [ function(){} ];

  // the jquery plugin
  $.msg = function(){
    var $overlay, $content, options, type, configs, _, publicMethods;
    
    options = [].shift.call( arguments );
    type = {}.toString.call( options );
    
    // merge default setting with globalConfigs
    configs = $.extend({
      // after block event handler
      afterBlock : function(){},
      autoUnblock : true,
      
      // options for $.center( center ) plugin
      center : { topPercentage : 0.3, against : 'parent' },
      css : {},
      
      // click overlay to unblock
      clickUnblock : true,
      content : 'Please wait...' ,
      fadeIn : 200,
      fadeOut : 300,
      
      // default theme
      klass : 'black-on-white',
      
      // jquery methodds, can be appendTo, after, before...
      method : 'appendTo',
      
      // DOM target to be insert into the msg
      target : 'body',
      
      // default auto unblock count down
      timeOut : 2500,
      
      // default z-index of the overlay
      z : 1000

    }, globalConfigs );
    
    // merge default setting with user options
    type === '[object Object]' && $.extend( configs, options );
    
    // private methods
    _ = {
      // private unblock method
      unblock : function(){
        // remove msg after fade out
        $overlay = $( '#jquery-msg-overlay' ).fadeOut( configs.fadeOut, function(){

          // beforeUnblock event callback
          beforeUnblock[ configs.msgID ]( $overlay );
          $overlay.remove();
        });
        
        // clear the auto unblock function
        clearTimeout( autoUnblock );
      }
    };

    publicMethods = {
      
      // unblock the screen
      unblock : function( ms, _msgID ){
        
        // default unblock delay is 0 ms
        var _ms = ms === undefined ? 0 : ms;
        
        // set msgID
        configs.msgID = _msgID === undefined ? msgID : _msgID;
        
        setTimeout( function(){
          _.unblock();
        }, _ms );
      },
      
      // replace current content in the msg
      replace : function( content ){
        if({}.toString.call( content ) !== '[object String]' ){
          throw '$.msg(\'replace\'); error: second argument has to be a string';
        }
        
        // replace old contant with new content and set the msg box to center
        $( '#jquery-msg-content' ).empty().
          html( content ).
          center( configs.center );
      },
      
      overwriteGlobal : function( name, config ){
        globalConfigs[ name ] = config;
      }
    };
    
    // generate msgID
    msgID--;
    
    // if not specified use the auto generate msgID
    configs.msgID = configs.msgID === undefined ? 
      msgID : 
      configs.msgID;
    
    // check if the beforeUnblock event handler is defined in the user option
    // otherwise assign it a empty function
    beforeUnblock[ configs.msgID ] = configs.beforeUnblock === undefined ? 
      function(){} :
      configs.beforeUnblock;

    // if options is a string execute public method
    if( type === '[object String]' ){
      publicMethods[ options ].apply( publicMethods, arguments );
    }else{
      
      // DOM el
      // for ie fade in trans we have to use img instead of div
      $overlay = $(
        '<div id="jquery-msg-overlay" class="' + configs.klass + '" style="position:absolute; z-index:' + configs.z + '; top:0px; right:0px; left:0px; height:' + $( doc ).height() + 'px;">' +
			'<div id="jquery-msg-bg" style="width: 100%; height: 100%; top: 0px; left: 0px;"/>' +
			'<div id="jquery-msg-content" class="jquery-msg-content" style="position:absolute;">' +
			configs.content +
			'</div>' +
        '</div>'
      );
      
      // configs.method can be appendTo, after ...
      $overlay[ configs.method ]( configs.target );
      
      // set content ( msg ) to center before hiding
      // and apply user option css if any
      $content = $( '#jquery-msg-content' ).
        center( configs.center ).
        css( configs.css ).
        hide();
      
      // fadein the content after fade in the bg
      // then trigger afterBlock event handler
      $overlay.
        hide().
        fadeIn( configs.fadeIn, function(){
          $content.fadeIn( 'fast' ).children().andSelf().bind( 'click', function( e ){
            e.stopPropagation();
          });
          
          // execute afterBlock callback
          configs.afterBlock.call( publicMethods, $overlay );

          // apply click unblock if the config set to true
          configs.clickUnblock &&
            $overlay.bind( 'click', function( e ){
              e.stopPropagation();
              _.unblock();
            });
          
          // apply auto unblock if the config set to true
          if( configs.autoUnblock ){
			var timeOut = configs.timeOut;
			// calculate words per minute (by La Larva)
			if (typeof timeOut === 'string' && (timeOut.toLowerCase() === 'words' || timeOut.toLowerCase() === 'wpm')) {
				timeOut = ($(configs.content).text().match(/\w+/g)||' ').length * 400;
			}
            autoUnblock = setTimeout( _.unblock , timeOut );
          }
        });
    }

    // return this to enable chaining
    return this;
  };

})( jQuery, document );



/******************************************************************************
*
* jQuery Timers (http://jquery.offput.ca/timers/)
* 
* everyTime(interval : Integer | String, [label = interval : String], fn : Function, [times = 0 : Integer])
*
* everyTime will add the defined function (fn) as a timed event to run at a
* given time interval (interval) for a given number of times (times).
* If times is set to 0, the number of times the method is called is unbounded.
* A label is also set for the given timed event either to the provided 
* string (label) or to the string representation of the interval provided.
* Additionally, the interval can be defined by using a string such as "3s" 
* for 3 seconds.
*
* oneTime(interval : Integer | String, [label = interval : String], fn : Function)
*
* oneTime will call the defined function (fn) a certain amount of time (interval) 
* after being added to the elements in the jQuery object.
* A label (label) is also set for the timed event either to the provided string 
* (label) or to the string representation of the interval provided.
*
* stopTime([label : Integer | String], [fn : Function])
*
* stopTime will stop any timed events with the provided label (label) and
* function (fn). 
* If neither is specified, it will stop all timed events acting on the elements
* in the jQuery object.
* If only the function is provided, then it will stop all timed events calling
* that function regardless of label.
* Finally if only the label is provided, it will stop all timed events given
* that label at initialization.
*
*******************************************************************************/

jQuery.fn.extend({
	everyTime: function(interval, label, fn, times, belay) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, times, belay);
		});
	},
	oneTime: function(interval, label, fn) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, 1);
		});
	},
	stopTime: function(label, fn) {
		return this.each(function() {
			jQuery.timer.remove(this, label, fn);
		});
	}
});

jQuery.extend({
	timer: {
		guid: 1,
		global: {},
		regex: /^([0-9]+)\s*(.*s)?$/,
		powers: {
			// Yeah this is major overkill...
			'ms': 1,
			'cs': 10,
			'ds': 100,
			's': 1000,
			'das': 10000,
			'hs': 100000,
			'ks': 1000000
		},
		timeParse: function(value) {
			if (value == undefined || value == null)
				return null;
			var result = this.regex.exec(jQuery.trim(value.toString()));
			if (result[2]) {
				var num = parseInt(result[1], 10);
				var mult = this.powers[result[2]] || 1;
				return num * mult;
			} else {
				return value;
			}
		},
		add: function(element, interval, label, fn, times, belay) {
			var counter = 0;
			
			if (jQuery.isFunction(label)) {
				if (!times) 
					times = fn;
				fn = label;
				label = interval;
			}
			
			interval = jQuery.timer.timeParse(interval);

			if (typeof interval !== 'number' || isNaN(interval) || interval <= 0)
				return;

			if (times && times.constructor !== Number) {
				belay = !!times;
				times = 0;
			}
			
			times = times || 0;
			belay = belay || false;
			
			if (!element.$timers) 
				element.$timers = {};
			
			if (!element.$timers[label])
				element.$timers[label] = {};
			
			fn.$timerID = fn.$timerID || this.guid++;
			
			var handler = function() {
				if (belay && this.inProgress) 
					return;
				this.inProgress = true;
				if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
					jQuery.timer.remove(element, label, fn);
				this.inProgress = false;
			};
			
			handler.$timerID = fn.$timerID;
			
			if (!element.$timers[label][fn.$timerID]) 
				element.$timers[label][fn.$timerID] = window.setInterval(handler,interval);
			
			if ( !this.global[label] )
				this.global[label] = [];
			this.global[label].push( element );
			
		},
		remove: function(element, label, fn) {
			var timers = element.$timers, ret;
			
			if ( timers ) {
				
				if (!label) {
					for ( label in timers )
						this.remove(element, label, fn);
				} else if ( timers[label] ) {
					if ( fn ) {
						if ( fn.$timerID ) {
							window.clearInterval(timers[label][fn.$timerID]);
							delete timers[label][fn.$timerID];
						}
					} else {
						for ( var fn in timers[label] ) {
							window.clearInterval(timers[label][fn]);
							delete timers[label][fn];
						}
					}
					
					for ( ret in timers[label] ) break;
					if ( !ret ) {
						ret = null;
						delete timers[label];
					}
				}
				
				for ( ret in timers ) break;
				if ( !ret ) 
					element.$timers = null;
			}
		}
	}
});




/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}


/////////////////////////  Global Function & Extensions  \\\\\\\\\\\\\\\\\\\\\\\\\
/**********************************************************************************
*    Global Functions  & Extensions 
*
*
***********************************************************************************/

/* mergeWith (extend Object)
*********************/
Object.defineProperty(Object.prototype, "mergeWith", {
    enumerable: false,
    value: function () {
        var override = true,
            dest = this,
            len = arguments.length,
            props, merge, i, from;

        if (typeof(arguments[arguments.length - 1]) === "boolean") {
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
							dest[name].mergeWith(from[name], override);
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


Object.defineProperty(Object.prototype, 'cloneProps', {
    enumerable: false,
    value: function () {
		var obj = (this instanceof Array) ? [] : {};
		for (var prop in this) {
			if (typeof this[prop] == 'function')
			continue;
			if (this[prop] && typeof this[prop] == 'object') {
				obj[prop] = this[prop].cloneProps();
			} 
			else {
				obj[prop] = this[prop];
			}
		} 
		return obj;
	}
});

Array.prototype.compare = function(testArr)
{
	if (this.length !== testArr.length) return false;
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

String.prototype.nowrap = function()
{
	return this.replace(/\s/g,'&nbsp;');
}

String.prototype.parseColor = function() {
  var color = '#';
  if (this.slice(0,4) === 'rgb(') {
    var cols = this.slice(4,this.length-1).split(',');
    var i=0; do { color += parseInt(cols[i]).toColorPart() } while (++i<3);
  } else {
    if (this.slice(0,1) === '#') {
      if (this.length===4) for(var i=1;i<4;i++) color += (this.charAt(i) + this.charAt(i)).toLowerCase();
      if (this.length===7) color = this.toLowerCase();
    }
  }
  return (color.length===7 ? color : (arguments[0] || this));
};

String.prototype.strip = function()
{
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
}



/**************************************************************************
*  Global Functions          
**************************************************************************/

var $id = function(id, context){
	return (context||document).getElementById(id);
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


function addZeroes(num, digits)
{
	var num = '' + num;
    while (num.length < digits) {
        num = '0' + num;
    }
    return num;
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


function inspect(obj, max_levels, level, doFunctions){
	var str = '', msg;
	if(level === null)  level = 0;
	if(max_levels === null) max_levels = 1;
	if(max_levels < 1)
		return 'Inspect Error: Levels number must be > 0';
	if(obj === null)
		return 'ERROR: Object is NULL\n';
	var indent = '';
	for (var i=0; i<level; i++)
		indent += ' ';
	for(property in obj) {
		try {
			if (doFunctions===true && $J.isFunction(obj[property])){
				str += indent + '(function) ' + property + '[FUNCTION]\n';
			} 
			else if (!$J.isFunction(obj[property])) {
				str += indent + '(' + ($J.isArray(obj[property])?'array':'object') + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +'\n';
			}
			if((typeof obj[property] === 'object' || $J.isArray(obj[property])) && (obj[property] !== null) && (level+1 < max_levels))
			str += inspect(obj[property], max_levels, level+1, doFunctions);  // recurse
		}
		catch(err) {
			// Is there some properties in obj we can't access? Print it red.
			if(typeof(err) === 'string') msg = err;
			else if(err.message)        msg = err.message;
			else if(err.description)    msg = err.description;
			else                        msg = 'Unknown';
			str += '(Error) ' + property + ': ' + msg +'\n';
		}
	}
	str += '\n';
	return str;
}


function parseIntNan (n){
	var x = parseInt(n, 10);
	return (isNaN(x)) ? 0 : x;
}

function parseIntZero (n){
	return (!n || n=='') ? 0 : parseInt(n, 10);
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
		var str='';
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
		var str='';
		var i;
		var v;

		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};


	function Utf8Encode(string) {
		string = string.replace(/\r\n/g, '\n');
		var utftext = '';

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

	while( (word_array.length % 16) !== 14 ) word_array.push( 0 );

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
var TIME_FORMAT_DHMS = ['d','h','m','s'];

function timeFormat(time, full) {
	time = parseInt (time);
	var t = time;
	var dhms = TIME_FORMAT_DHMS;
	
	var str = '';
	
	if (t < 61){
		return  t + dhms[3];
	}
	
	if (t > 86400){
		str += (parseInt(t/86400)) + dhms[0] + '&nbsp;';
		t %= 86400;
	}  
	if (t>3600 || time>3600){
		str += (parseInt(t/3600)) + dhms[1] + '&nbsp;';
		t %= 3600;
	}  
	
	str += (parseInt(t/60)) + dhms[2] + '&nbsp;';
	
	if (full || time<=3600 ){
		str += '&nbsp;' + (t%60) + dhms[3];
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
	var dhms = TIME_FORMAT_DHMS;
	time = parseInt (time);
	if (time > 86400){
		time /= 3600;
		return parseInt(time/24) + dhms[0] + '&nbsp;' + parseInt(time%24) + dhms[1];
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

if ( typeof(XML) === 'undefined' ) XML = function() {};

//  constructor

XML.ObjTree = function () {
    return this;
};

//  method: parseXML( xmlsource )
XML.ObjTree.prototype.parseXML = function ( xml ) {
    var root;
    if ( window.DOMParser ) {
        var xmldom = new DOMParser();
//      xmldom.async = false;           // DOMParser is always sync-mode
        var dom = xmldom.parseFromString( xml, 'application/xml' );
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
    if ( root.nodeType !== 11 ) {            // DOCUMENT_FRAGMENT_NODE
        var tmp = {};
        tmp[root.nodeName] = json;          // root nodeName
        json = tmp;
    }
    return json;
};

//  method: parseElement( element )

XML.ObjTree.prototype.parseElement = function ( elem ) {
    //  COMMENT_NODE
    if ( elem.nodeType === 7 ) {
        return;
    }

    //  TEXT_NODE CDATA_SECTION_NODE
    if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
        var bool = elem.nodeValue.match( /[^\x00-\x20]/ );
        if ( bool === null ) return;     // ignore white spaces
        return elem.nodeValue;
    }

    var retval;
    var cnt = {};

    //  parse attributes
    if ( elem.attributes && elem.attributes.length ) {
        retval = {};
        for ( var i=0; i<elem.attributes.length; i++ ) {
            var key = elem.attributes[i].nodeName;
            if ( typeof(key) !== 'string' ) continue;
            var val = elem.attributes[i].nodeValue;
            if ( ! val ) continue;
            key = '-' + key;
            if ( typeof(cnt[key]) === 'undefined' ) cnt[key] = 0;
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
            if ( ntype === 3 || ntype === 4 ) continue;
            textonly = false;
        }
        if ( textonly ) {
            if ( ! retval ) retval = '';
            for ( var i=0; i<elem.childNodes.length; i++ ) {
                retval += elem.childNodes[i].nodeValue;
            }
        } else {
            if ( ! retval ) retval = {};
            for ( var i=0; i<elem.childNodes.length; i++ ) {
                var key = elem.childNodes[i].nodeName;
                if ( typeof(key) !== 'string' ) continue;
                var val = this.parseElement( elem.childNodes[i] );
                if ( ! val ) continue;
                if ( typeof(cnt[key]) === 'undefined' ) cnt[key] = 0;
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
        if ( cnts === 1 ) hash[key] = [];
        hash[key][hash[key].length] = val;      // push
    } else if ( cnts === 1 ) {                   // 1st sibling
        hash[key] = val;
    } else if ( cnts === 2 ) {                   // 2nd sibling
        hash[key] = [ hash[key], val ];
    } else {                                    // 3rd sibling and more
        hash[key][hash[key].length] = val;
    }
};


/** END XML.ObjTree ******************************************/


/////////////////////// END Global Function & Extensions \\\\\\\\\\\\\\\\\\\\\\\



/**
* A handy class to calculate color values.
*
* @version 1.0
* @author Robert Eisele <robert@xarg.org>
* @copyright Copyright (c) 2010, Robert Eisele
* @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/
* @license http://www.opensource.org/licenses/bsd-license.php BSD License
*
*/
var PNGlib;
(function() {

	// helper functions for that ctx
	function write(buffer, offs) {
		for (var i = 2; i < arguments.length; i++) {
			for (var j = 0; j < arguments[i].length; j++) {
				buffer[offs++] = arguments[i].charAt(j);
			}
		}
	}

	function byte2(w) {
		return String.fromCharCode((w >> 8) & 255, w & 255);
	}

	function byte4(w) {
		return String.fromCharCode((w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w & 255);
	}

	function byte2lsb(w) {
		return String.fromCharCode(w & 255, (w >> 8) & 255);
	}

	PNGlib = function(width,height,depth) {

		this.width   = width;
		this.height  = height;
		this.depth   = depth;

		// pixel data and row filter identifier size
		this.pix_size = height * (width + 1);

		// deflate header, pix_size, block headers, adler32 checksum
		this.data_size = 2 + this.pix_size + 5 * Math.floor((0xfffe + this.pix_size) / 0xffff) + 4;

		// offsets and sizes of Png chunks
		this.ihdr_offs = 0;									// IHDR offset and size
		this.ihdr_size = 4 + 4 + 13 + 4;
		this.plte_offs = this.ihdr_offs + this.ihdr_size;	// PLTE offset and size
		this.plte_size = 4 + 4 + 3 * depth + 4;
		this.trns_offs = this.plte_offs + this.plte_size;	// tRNS offset and size
		this.trns_size = 4 + 4 + depth + 4;
		this.idat_offs = this.trns_offs + this.trns_size;	// IDAT offset and size
		this.idat_size = 4 + 4 + this.data_size + 4;
		this.iend_offs = this.idat_offs + this.idat_size;	// IEND offset and size
		this.iend_size = 4 + 4 + 4;
		this.buffer_size  = this.iend_offs + this.iend_size;	// total PNG size

		this.buffer  = new Array();
		this.palette = new Object();
		this.pindex  = 0;

		var _crc32 = new Array();

		// initialize buffer with zero bytes
		for (var i = 0; i < this.buffer_size; i++) {
			this.buffer[i] = "\x00";
		}

		// initialize non-zero elements
		write(this.buffer, this.ihdr_offs, byte4(this.ihdr_size - 12), 'IHDR', byte4(width), byte4(height), "\x08\x03");
		write(this.buffer, this.plte_offs, byte4(this.plte_size - 12), 'PLTE');
		write(this.buffer, this.trns_offs, byte4(this.trns_size - 12), 'tRNS');
		write(this.buffer, this.idat_offs, byte4(this.idat_size - 12), 'IDAT');
		write(this.buffer, this.iend_offs, byte4(this.iend_size - 12), 'IEND');

		// initialize deflate header
		var header = ((8 + (7 << 4)) << 8) | (3 << 6);
		header+= 31 - (header % 31);

		write(this.buffer, this.idat_offs + 8, byte2(header));

		// initialize deflate block headers
		for (var i = 0; (i << 16) - 1 < this.pix_size; i++) {
			var size, bits;
			if (i + 0xffff < this.pix_size) {
				size = 0xffff;
				bits = "\x00";
			} else {
				size = this.pix_size - (i << 16) - i;
				bits = "\x01";
			}
			write(this.buffer, this.idat_offs + 8 + 2 + (i << 16) + (i << 2), bits, byte2lsb(size), byte2lsb(~size));
		}

		/* Create crc32 lookup table */
		for (var i = 0; i < 256; i++) {
			var c = i;
			for (var j = 0; j < 8; j++) {
				if (c & 1) {
					c = -306674912 ^ ((c >> 1) & 0x7fffffff);
				} else {
					c = (c >> 1) & 0x7fffffff;
				}
			}
			_crc32[i] = c;
		}

		// compute the index into a png for a given pixel
		this.index = function(x,y) {
			var i = y * (this.width + 1) + x + 1;
			var j = this.idat_offs + 8 + 2 + 5 * Math.floor((i / 0xffff) + 1) + i;
			return j;
		}

		// convert a color and build up the palette
		this.color = function(red, green, blue, alpha) {

			alpha = alpha >= 0 ? alpha : 255;
			var color = (((((alpha << 8) | red) << 8) | green) << 8) | blue;

			if (typeof this.palette[color] === "undefined") {
				if (this.pindex === this.depth) return "\x00";

				var ndx = this.plte_offs + 8 + 3 * this.pindex;

				this.buffer[ndx + 0] = String.fromCharCode(red);
				this.buffer[ndx + 1] = String.fromCharCode(green);
				this.buffer[ndx + 2] = String.fromCharCode(blue);
				this.buffer[this.trns_offs+8+this.pindex] = String.fromCharCode(alpha);

				this.palette[color] = String.fromCharCode(this.pindex++);
			}
			return this.palette[color];
		}

		// output a PNG string, Base64 encoded
		this.getBase64 = function() {

			var s = this.getDump();

			var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var c1, c2, c3, e1, e2, e3, e4;
			var l = s.length;
			var i = 0;
			var r = "";

			do {
				c1 = s.charCodeAt(i);
				e1 = c1 >> 2;
				c2 = s.charCodeAt(i+1);
				e2 = ((c1 & 3) << 4) | (c2 >> 4);
				c3 = s.charCodeAt(i+2);
				if (l < i+2) { e3 = 64; } else { e3 = ((c2 & 0xf) << 2) | (c3 >> 6); }
				if (l < i+3) { e4 = 64; } else { e4 = c3 & 0x3f; }
				r+= ch.charAt(e1) + ch.charAt(e2) + ch.charAt(e3) + ch.charAt(e4);
			} while ((i+= 3) < l);
			return r;
		}

		// output a PNG string
		this.getDump = function() {

			// compute adler32 of output pixels + row filter bytes
			var BASE = 65521; /* largest prime smaller than 65536 */
			var NMAX = 5552;  /* NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1 */
			var s1 = 1;
			var s2 = 0;
			var n = NMAX;

			for (var y = 0; y < this.height; y++) {
				for (var x = -1; x < this.width; x++) {
					s1+= this.buffer[this.index(x, y)].charCodeAt(0);
					s2+= s1;
					if ((n-= 1) === 0) {
						s1%= BASE;
						s2%= BASE;
						n = NMAX;
					}
				}
			}
			s1%= BASE;
			s2%= BASE;
			write(this.buffer, this.idat_offs + this.idat_size - 8, byte4((s2 << 16) | s1));

			// compute crc32 of the PNG chunks
			function crc32(png, offs, size) {
				var crc = -1;
				for (var i = 4; i < size-4; i += 1) {
					crc = _crc32[(crc ^ png[offs+i].charCodeAt(0)) & 0xff] ^ ((crc >> 8) & 0x00ffffff);
				}
				write(png, offs+size-4, byte4(crc ^ -1));
			}

			crc32(this.buffer, this.ihdr_offs, this.ihdr_size);
			crc32(this.buffer, this.plte_offs, this.plte_size);
			crc32(this.buffer, this.trns_offs, this.trns_size);
			crc32(this.buffer, this.idat_offs, this.idat_size);
			crc32(this.buffer, this.iend_offs, this.iend_size);

			// convert PNG to string
			return "\211PNG\r\n\032\n"+this.buffer.join('');
		}
	}

})();


preparePage();

})();
